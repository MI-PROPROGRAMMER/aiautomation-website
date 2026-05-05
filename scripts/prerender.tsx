import React from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import Beasties from "beasties";
import { AppProviders } from "../src/App";
import { AppRoutesStatic } from "../src/AppStatic";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");
const template = await fs.readFile(templatePath, "utf-8");

const staticRoutes = ["/", "/services", "/about", "/contact", "/privacy-policy", "/terms-of-service"];
const blogRoutes = await collectBlogRoutes();
const routes = [...staticRoutes, "/blog", ...blogRoutes];

await Promise.all(routes.map(async (route) => writePrerenderedPage(route, renderRoute(route))));

console.log(`Pre-rendered routes: ${routes.join(", ")}`);

// Inline critical CSS into each prerendered HTML and async-load the rest.
// This eliminates the render-blocking <link rel="stylesheet"> from the
// critical path — Lighthouse was measuring ~300 ms of render-blocking on
// the main CSS file. Beasties parses the rendered HTML, walks the CSS
// rules, keeps only those whose selectors match elements actually present
// in the prerendered DOM, inlines those in a <style> tag, and rewrites
// the original <link> to load asynchronously.
const beasties = new Beasties({
  path: distDir,
  publicPath: "/",
  logLevel: "silent",
  // Replace the blocking <link rel="stylesheet"> with the standards-blessed
  // async-load swap pattern: rel="preload" as="style" + onload re-set to
  // rel="stylesheet". The full CSS still loads (and overrides any visual
  // gaps in the inlined critical subset) but does not block first paint.
  preload: "swap-high",
  // Don't strip used rules out of the linked CSS file — keeping it
  // self-sufficient means hydration / route changes find every rule they
  // need without race conditions.
  pruneSource: false,
  // We already preload our self-hosted fonts via the Vite plugin in
  // vite.config.ts, so beasties does not need to inline @font-face rules.
  inlineFonts: false,
});

for (const route of routes) {
  const outputPath = pathForRoute(route);
  const html = await fs.readFile(outputPath, "utf-8");
  const processed = await beasties.process(html);
  await fs.writeFile(outputPath, processed, "utf-8");
}

console.log(`Inlined critical CSS into ${routes.length} routes`);

function renderRoute(route: string) {
  const appHtml = renderToString(
    <AppProviders>
      <StaticRouter location={route}>
        <AppRoutesStatic />
      </StaticRouter>
    </AppProviders>,
  );

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

async function collectBlogRoutes() {
  try {
    const blogDir = path.resolve(__dirname, "../src/content/blog");
    const entries = await fs.readdir(blogDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => `/blog/${entry.name.replace(/\.mdx$/, "")}`);
  } catch (error) {
    console.warn("Skipping blog prerendering because posts could not be read.", error);
    return [];
  }
}
