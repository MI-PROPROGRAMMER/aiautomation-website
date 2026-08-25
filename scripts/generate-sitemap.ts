import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SITE_ORIGIN, getIndexableRoutes, type SeoRoute } from "./seo-routes";

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });

// No changefreq or priority: Google ignores both, and stale values are worse
// than none.
const renderUrl = (route: SeoRoute) => {
  const lines = [`    <loc>${escapeXml(`${SITE_ORIGIN}${route.path}`)}</loc>`];

  if (route.lastModified !== undefined) {
    lines.push(`    <lastmod>${escapeXml(route.lastModified)}</lastmod>`);
  }

  return `  <url>\n${lines.join("\n")}\n  </url>`;
};

export async function generateSitemap(projectRoot = process.cwd()): Promise<number> {
  const routes = await getIndexableRoutes(projectRoot);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(renderUrl),
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(path.resolve(projectRoot, "public/sitemap.xml"), xml, "utf-8");

  return routes.length;
}

const isDirectRun =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  const count = await generateSitemap();
  console.log(`public/sitemap.xml written with ${count} indexable URLs.`);
}
