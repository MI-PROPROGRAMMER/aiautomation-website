import { defineConfig, type Plugin } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";

const readDotEnv = (dir: string): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const file of [".env", ".env.local"]) {
    const full = path.join(dir, file);
    if (!fs.existsSync(full)) continue;
    for (const line of fs.readFileSync(full, "utf-8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
      if (!match) continue;
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (value) out[match[1]] = value;
    }
  }
  return out;
};

/**
 * Injects <link rel="preload"> tags for the Latin-subset woff2 files of our
 * self-hosted fonts. Browsers honour `unicode-range` and only fetch the
 * Latin subsets for English content, so preloading them lets the browser
 * start the request in parallel with the main CSS download instead of
 * waiting for CSS parse — saves ~150–300 ms of LCP on cold mobile loads.
 */
const preloadLatinFonts = (): Plugin => ({
  name: "preload-latin-fonts",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler(html, ctx) {
      if (!ctx.bundle) return html;
      const latinFontFiles = Object.keys(ctx.bundle).filter(
        (name) =>
          name.endsWith(".woff2") &&
          /-latin-wght-normal-/.test(name) &&
          !/italic/i.test(name),
      );
      if (latinFontFiles.length === 0) return html;
      const preloadTags = latinFontFiles
        .map(
          (name) =>
            `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${name}">`,
        )
        .join("\n    ");
      return html.replace("</head>", `    ${preloadTags}\n  </head>`);
    },
  },
});

const devChatbotApi = (apiKey: string | undefined): Plugin => ({
  name: "dev-chatbot-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end("Method not allowed");
        return;
      }

      if (!apiKey) {
        res.statusCode = 500;
        res.setHeader("content-type", "application/json");
        res.end(
          JSON.stringify({
            error: "ANTHROPIC_API_KEY missing — add a non-empty value to .env and restart the dev server.",
          })
        );
        return;
      }

      let raw = "";
      try {
        for await (const chunk of req) raw += typeof chunk === "string" ? chunk : chunk.toString("utf-8");
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Failed to read request body" }));
        return;
      }

      let body: { messages?: unknown };
      try {
        body = JSON.parse(raw);
      } catch {
        res.statusCode = 400;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
        return;
      }

      const { sanitizeMessages, streamChatResponse } = await server.ssrLoadModule(
        "/src/lib/chatbot/streamChat.ts"
      );
      const messages = sanitizeMessages(body.messages);
      if (messages.length === 0) {
        res.statusCode = 400;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ error: "messages array is required" }));
        return;
      }

      res.statusCode = 200;
      res.setHeader("content-type", "text/plain; charset=utf-8");
      res.setHeader("cache-control", "no-cache, no-transform");

      const stream: ReadableStream<Uint8Array> = streamChatResponse(messages, apiKey);
      const reader = stream.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) res.write(Buffer.from(value));
        }
      } catch (err) {
        console.error("[dev-chatbot-api] streaming failed:", err);
      } finally {
        res.end();
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => {
  const dotenv = readDotEnv(__dirname);
  const apiKey = dotenv.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || undefined;
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      mdx({
        extension: /\.mdx?$/,
      }),
      react(),
      devChatbotApi(apiKey),
      preloadLatinFonts(),
    ],
    build: {
      // The SSR bundle runs on Node, which has top-level await. The default
      // browser target (es2020) does not, so we widen it for SSR.
      target: isSsrBuild ? "node18" : undefined,
      rollupOptions: {
        output: {
          // manualChunks only applies to the client build. SSR builds resolve
          // react/react-dom/etc. as Node externals, and Rollup errors if you
          // try to manualChunk an external module.
          manualChunks: isSsrBuild ? undefined : {
            // Eager vendor chunks — these are needed on first paint, so giving
            // them stable, dedicated bundles helps long-term caching.
            react: ["react", "react-dom", "scheduler"],
            router: ["react-router-dom"],
            icons: ["lucide-react"],
            // Radix is intentionally NOT in manualChunks now. Tooltip was
            // removed entirely (the only consumer was a dead sidebar.tsx).
            // Accordion (FAQ — lazy below-fold), Dialog (chatbot — lazy
            // client-only), and Toast (Toaster + Sonner — also lazy now)
            // each auto-bundle with their lazy consumers, so no radix code
            // lands in the eager first-paint bundle at all.
            // framer-motion is a 100+ KB lib used by Hero, sections, and
            // animated UI. Pin it to its own chunk so it caches separately
            // and is preloaded once instead of being merged into the entry.
            "framer-motion": ["framer-motion"],
            // recharts (ROI calculator) and react-simple-maps (About page map)
            // are intentionally NOT pinned to a manual chunk. The object form
            // of manualChunks emits a <link rel="modulepreload"> for the chunk
            // on every page that touches the entry graph, which made the
            // homepage eagerly download ~106 KiB of recharts even though only
            // the below-the-fold ROI calculator uses it. Letting Vite auto-
            // split keeps these libs inside their lazy consumers
            // (ROICalculatorSection, GlobalReachMap) so they only ship when
            // those components actually render.
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
