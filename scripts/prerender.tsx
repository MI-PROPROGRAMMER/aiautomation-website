import React from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import { LazyMotion, domAnimation } from "framer-motion";
import Beasties from "beasties";
// AppRoutesStatic is bundled in via Vite SSR build (see package.json
// `prerender` script). The Vite SSR build is what lets MDX imports and
// import.meta.glob resolve — running this file directly via tsx leaves
// `import.meta.glob` undefined and blog routes silently render <Navigate />.
import { AppRoutesStatic } from "../src/AppStatic";
import { getIndexableRoutes } from "./seo-routes";
import { getPostBySlug } from "../src/content/blog/posts";
import { buildFAQPage } from "../src/lib/seo";

// __dirname differs between dev (tsx → scripts/) and prod (Vite SSR build →
// dist/_ssr/). process.cwd() is the project root in both flows because
// `npm run prerender` is always executed from there.
const projectRoot = process.cwd();
const distDir = path.resolve(projectRoot, "dist");
const templatePath = path.join(distDir, "index.html");

const RENDER_TIMEOUT_MS = 30_000;

// Synthetic location used to render the catch-all route into dist/404.html.
// It is not an indexable URL, so it never enters the route list, the sitemap,
// or the prerendered-routes log.
const NOT_FOUND_ROUTE = "/__not-found__";

// Vite's SSR chunks import their shared bindings (React, framer-motion, …)
// back from this entry module, so a top-level `await` would leave the entry
// mid-evaluation and deadlock every dynamic import() behind a React.lazy()
// section. All async work therefore runs inside main().
let template = "";

async function main() {
  template = await fs.readFile(templatePath, "utf-8");

  // Same discovery the sitemap uses, so prerendered pages and sitemap URLs
  // cannot drift apart.
  const routes = (await getIndexableRoutes(projectRoot)).map((route) => route.path);

  // Routes are rendered one at a time on purpose. react-helmet collects the
  // <Helmet> tags of every mounted instance in module-global state that
  // Helmet.renderStatic() drains, so overlapping renders leak each other's
  // titles, descriptions, canonicals, and JSON-LD. Streaming SSR makes renders
  // genuinely concurrent, which under Promise.all left dist/index.html with an
  // empty <title> and no canonical.
  for (const route of routes) {
    const html = await renderRoute(route);
    await writePrerenderedPage(route, html);
  }

  console.log(`Pre-rendered routes: ${routes.join(", ")}`);

  // Vercel serves dist/404.html for any request that matches no static file, so
  // the not-found document has to be built like any other page — otherwise an
  // unknown path falls back to a generic host error page with no navigation and
  // no noindex directive.
  const notFoundPath = path.join(distDir, "404.html");
  await fs.writeFile(notFoundPath, await renderRoute(NOT_FOUND_ROUTE), "utf-8");

  const documentPaths = [...routes.map(pathForRoute), notFoundPath];

  // Inline the full CSS bundle into each prerendered HTML so every route
  // ships fully-styled markup with zero render-blocking stylesheet requests.
  //
  // We deliberately do NOT use beasties' critical-CSS extraction. Most
  // sections on the homepage are React.lazy()-loaded behind Suspense, and
  // during SSR those suspend and render as their fallback (often `null`).
  // Their utility classes (md:col-span-5, md:order-2, hover:bg-accent, …)
  // therefore never appear in the rendered HTML, so beasties' selector
  // matcher prunes them as "unused" — silently breaking the grid layout
  // in every below-the-fold section once the client hydrates.
  //
  // Setting inlineThreshold above the bundle size makes beasties dump the
  // entire stylesheet into a <style> block without per-rule pruning, while
  // still removing the render-blocking <link rel="stylesheet">.
  const cssLinkRe = /<link[^>]+href="(\/assets\/index-[^"]+\.css)"/;
  const sampleHtml = await fs.readFile(pathForRoute("/"), "utf-8");
  const cssLinkMatch = sampleHtml.match(cssLinkRe);
  const orphanedCssPath = cssLinkMatch
    ? path.join(distDir, cssLinkMatch[1])
    : null;

  for (const outputPath of documentPaths) {
    const beasties = new Beasties({
      path: distDir,
      publicPath: "/",
      logLevel: "silent",
      // Inline any external stylesheet smaller than ~10 MB verbatim. Our
      // single Tailwind bundle is ~75 KB, so this captures it whole.
      inlineThreshold: 10_000_000,
      // Fonts are preloaded by the preloadLatinFonts Vite plugin.
      inlineFonts: false,
    });
    const html = await fs.readFile(outputPath, "utf-8");
    const processed = await beasties.process(html);
    await fs.writeFile(outputPath, processed, "utf-8");
  }

  // The external CSS file is no longer referenced from any prerendered HTML
  // (beasties stripped the <link> on every route). Drop it from the build
  // output so we don't upload ~75 KB of bytes nothing will ever fetch.
  if (orphanedCssPath) {
    await fs.unlink(orphanedCssPath).catch(() => {});
  }

  console.log(`Inlined full CSS into ${documentPaths.length} documents (${routes.length} routes + dist/404.html)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Streaming SSR is what makes the commercial homepage crawlable.
// renderToString gives up at the first Suspense boundary, so every
// React.lazy() section on Index.tsx (case studies, services, process,
// portfolio, FAQ, …) rendered as its `null` fallback and never reached the
// static HTML. renderToPipeableStream's onAllReady waits for those lazy
// imports to resolve, so the generated markup contains the full page while
// the client bundle keeps its per-section code splitting.
function renderAppToHtml(route: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let recoverableError: unknown = null;
    let settled = false;

    const settle = (finish: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      finish();
    };
    const fail = (error: unknown) => settle(() => reject(toRenderError(route, error)));
    const succeed = (html: string) => settle(() => resolve(html));

    // We deliberately bypass AppProviders here. It mounts lazy-loaded
    // <Toaster />, <Sonner />, and <ChatbotWidget />, which are purely
    // client-side and hydrate after JS loads, so the prerender does not need
    // them. LazyMotion is kept because pages render framer-motion's <m.*>
    // primitives, which require its context.
    const { pipe, abort } = renderToPipeableStream(
      <LazyMotion features={domAnimation} strict>
        <StaticRouter location={route}>
          <AppRoutesStatic />
        </StaticRouter>
      </LazyMotion>,
      {
        onAllReady() {
          const stream = new PassThrough();
          stream.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
          stream.on("error", fail);
          stream.on("end", () => {
            // A lazy import that fails still streams (the Suspense fallback
            // takes over), so surface it here instead of shipping a page with
            // a silently missing section.
            if (recoverableError !== null) {
              fail(recoverableError);
              return;
            }
            succeed(Buffer.concat(chunks).toString("utf-8"));
          });
          pipe(stream);
        },
        onShellError: fail,
        onError(error) {
          recoverableError ??= error;
        },
      },
    );

    const timeout = setTimeout(() => {
      abort();
      fail(new Error(`Prerender timed out for ${route}`));
    }, RENDER_TIMEOUT_MS);
  });
}

function toRenderError(route: string, error: unknown) {
  if (error instanceof Error) {
    error.message = error.message.startsWith("Prerender")
      ? error.message
      : `Prerender failed for ${route}: ${error.message}`;
    return error;
  }

  return new Error(`Prerender failed for ${route}: ${String(error)}`);
}

/**
 * FAQPage markup for a blog route, emitted without react-helmet.
 *
 * main.tsx mounts with createRoot, not hydrateRoot, so the client re-renders
 * from scratch and helmet removes every tag it manages that the client no
 * longer declares. The post's `faq` export exists only in the SSR graph (see
 * scripts/mdx-blog-faq.ts), so a helmet-rendered FAQPage survived in the file
 * and was then deleted in the browser — invisible to anything that renders the
 * page, Googlebot included. Emitting it in <body> after #root keeps it outside
 * both owners: helmet clears the head, React replaces #root, neither touches
 * this. JSON-LD is valid anywhere in the document.
 */
function faqTag(route: string): string {
  if (!route.startsWith("/blog/")) return "";
  const faq = getPostBySlug(route.slice("/blog/".length))?.faq ?? [];
  if (faq.length === 0) return "";
  return `<script type="application/ld+json">${JSON.stringify(buildFAQPage(faq))}</script>`;
}

async function renderRoute(route: string): Promise<string> {
  const appHtml = await renderAppToHtml(route);

  const helmet = Helmet.renderStatic();

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Strip the static-fallback <title>, <meta name=description>, og:* / twitter:* meta,
  // and rel=canonical from the template — Helmet emits per-route equivalents and
  // browsers honour whichever appears first, which would otherwise be the fallback.
  const fallbackTagsToRemove: RegExp[] = [
    /<title>[^<]*<\/title>\s*/i,
    /<meta\s+name="description"[^>]*>\s*/i,
    /<meta\s+property="og:title"[^>]*>\s*/gi,
    /<meta\s+property="og:description"[^>]*>\s*/gi,
    /<meta\s+property="og:url"[^>]*>\s*/gi,
    /<meta\s+property="og:image"[^>]*>\s*/gi,
    /<meta\s+property="og:image:alt"[^>]*>\s*/gi,
    /<meta\s+property="og:type"[^>]*>\s*/gi,
    /<meta\s+name="twitter:title"[^>]*>\s*/gi,
    /<meta\s+name="twitter:description"[^>]*>\s*/gi,
    /<meta\s+name="twitter:image"[^>]*>\s*/gi,
    /<link\s+rel="canonical"[^>]*>\s*/gi,
  ];
  for (const pattern of fallbackTagsToRemove) {
    html = html.replace(pattern, "");
  }

  const headTags = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}`;
  html = html.replace("<!-- SSR_HEAD_OUTLET -->", headTags);

  // Placed after </div id=root> rather than in <head>: react-helmet clears
  // JSON-LD from the head on client render, and React only owns #root.
  html = html.replace("</body>", `${faqTag(route)}</body>`);

  return html;
}

function pathForRoute(route: string) {
  return route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.replace(/^\//, ""), "index.html");
}

async function writePrerenderedPage(route: string, html: string) {
  const outputPath = pathForRoute(route);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf-8");
}
