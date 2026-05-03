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
export default defineConfig(() => {
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
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "scheduler"],
            router: ["react-router-dom"],
            icons: ["lucide-react"],
            radix: ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-toast"],
            maps: ["react-simple-maps"],
            charts: ["recharts"],
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
