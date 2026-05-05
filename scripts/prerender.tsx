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
// critical path.
//
// Important pipeline detail: pruneSource: true makes beasties rewrite the
// shared CSS file in place after every .process() call, removing whatever
// it inlined. With multiple routes sharing one CSS file, the second /
// third / Nth route would see an already-eviscerated file and be unable
// to inline its own critical rules — leaving later-processed pages with
// nothing inlined and broken visuals.
//
// Workaround: snapshot the original CSS once, reset the file before
// processing each route so beasties always sees the full ruleset, then
// after the loop write the original CSS back so the async-loaded
// stylesheet on every route contains the complete ruleset (each route's
// critical subset is already inlined in its own <style> block).
const cssLinkRe = /<link[^>]+href="(\/assets\/index-[^"]+\.css)"/;
const sampleHtml = await fs.readFile(pathForRoute("/"), "utf-8");
const cssLinkMatch = sampleHtml.match(cssLinkRe);
const cssRelativePath = cssLinkMatch ? cssLinkMatch[1] : null;
const cssAbsolutePath = cssRelativePath ? path.join(distDir, cssRelativePath) : null;
const originalCss = cssAbsolutePath ? await fs.readFile(cssAbsolutePath, "utf-8") : null;

for (const route of routes) {
  // Reset the CSS file so this iteration of beasties sees the full
  // ruleset rather than what previous iterations have already pruned.
  if (cssAbsolutePath && originalCss !== null) {
    await fs.writeFile(cssAbsolutePath, originalCss, "utf-8");
  }
  const beasties = new Beasties({
    path: distDir,
    publicPath: "/",
    logLevel: "silent",
    // media="print" + onload="this.media='all'" swap. No "preload"
    // keyword so Lighthouse does not mark the stylesheet as critical.
    preload: "media",
    pruneSource: true,
    // Fonts are preloaded by the preloadLatinFonts Vite plugin.
    inlineFonts: false,
  });
  const outputPath = pathForRoute(route);
  const html = await fs.readFile(outputPath, "utf-8");
  const processed = await beasties.process(html);
  await fs.writeFile(outputPath, processed, "utf-8");
}

// Final restore: each route's critical subset is already inlined, so the
// async-loaded CSS on whichever page the user lands needs to be the full
// original file (for hydration, route changes, lazy sections, etc.).
if (cssAbsolutePath && originalCss !== null) {
  await fs.writeFile(cssAbsolutePath, originalCss, "utf-8");
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
