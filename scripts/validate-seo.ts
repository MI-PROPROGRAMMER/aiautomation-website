import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ORIGIN = "https://apexifylabs.com";

const REQUIRED_HOME_TEXT = [
  "Case Studies",
  "What We Build",
  "Our Process",
  "Selected Work",
  "Frequently Asked",
];

const CORE_ROUTES = [
  "/",
  "/services",
  "/about",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
];

const HEAD_RE = /<head[^>]*>([\s\S]*?)<\/head>/i;
const TITLE_RE = /<title[^>]*>([\s\S]*?)<\/title>/gi;
const DESCRIPTION_RE = /<meta[^>]*\bname="description"[^>]*>/gi;
const CANONICAL_RE = /<link[^>]*\brel="canonical"[^>]*>/gi;
const H1_RE = /<h1[\s>]/gi;
const CONTENT_ATTR_RE = /\bcontent="([^"]*)"/i;
const HREF_ATTR_RE = /\bhref="([^"]*)"/i;
const LOC_RE = /<loc>([\s\S]*?)<\/loc>/gi;

const failures: string[] = [];

/**
 * Runs one assertion group and records its failure instead of aborting, so a
 * single run reports every broken invariant rather than only the first.
 */
function check(scope: string, assertions: () => void) {
  try {
    assertions();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${scope}: ${message.split("\n")[0]}`);
  }
}

function countMatches(haystack: string, pattern: RegExp) {
  return haystack.match(new RegExp(pattern.source, pattern.flags))?.length ?? 0;
}

function distPathForRoute(distDir: string, route: string) {
  return route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.replace(/^\//, ""), "index.html");
}

async function readFileOrNull(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Parses `export const frontmatter = { ... }` with field-level regexes. The
 * validator must stay dependency-free, so it never imports the MDX modules.
 */
async function readBlogRoutes(projectRoot: string) {
  const blogDir = path.resolve(projectRoot, "src/content/blog");
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const slugs: string[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;

    const source = await fs.readFile(path.join(blogDir, entry.name), "utf-8");
    if (/\bdraft:\s*true\b/.test(source)) continue;

    const explicitSlug = source.match(/\bslug:\s*"([^"]+)"/)?.[1];
    slugs.push(explicitSlug ?? entry.name.replace(/\.mdx$/, ""));
  }

  return slugs.sort().map((slug) => `/blog/${slug}`);
}

function validateRouteDocument(route: string, html: string) {
  const head = html.match(HEAD_RE)?.[1] ?? "";

  check(`${route} <title>`, () => {
    const titles = [...head.matchAll(TITLE_RE)];
    assert.equal(titles.length, 1, `expected 1 <title> in <head>, found ${titles.length}`);
    assert.notEqual(titles[0][1].trim(), "", "<title> is empty");
  });

  check(`${route} meta description`, () => {
    const tags = head.match(DESCRIPTION_RE) ?? [];
    assert.equal(tags.length, 1, `expected 1 meta description, found ${tags.length}`);
    const content = tags[0].match(CONTENT_ATTR_RE)?.[1] ?? "";
    assert.notEqual(content.trim(), "", "meta description is empty");
  });

  check(`${route} canonical`, () => {
    const tags = head.match(CANONICAL_RE) ?? [];
    assert.equal(tags.length, 1, `expected 1 canonical link, found ${tags.length}`);
    const href = tags[0].match(HREF_ATTR_RE)?.[1] ?? "";
    assert.equal(href, `${SITE_ORIGIN}${route}`);
  });

  check(`${route} <h1>`, () => {
    const count = countMatches(html, H1_RE);
    assert.ok(count >= 1, "no <h1> found");
    assert.equal(count, 1, `expected exactly 1 <h1>, found ${count}`);
  });
}

export async function validateSeoBuild(projectRoot = process.cwd()): Promise<void> {
  failures.length = 0;

  const distDir = path.resolve(projectRoot, "dist");
  const blogRoutes = await readBlogRoutes(projectRoot);
  const indexableRoutes = [...CORE_ROUTES, ...blogRoutes];

  for (const route of indexableRoutes) {
    const html = await readFileOrNull(distPathForRoute(distDir, route));

    if (html === null) {
      failures.push(`${route}: missing ${path.relative(projectRoot, distPathForRoute(distDir, route))}`);
      continue;
    }

    validateRouteDocument(route, html);
  }

  const homeHtml = await readFileOrNull(path.join(distDir, "index.html"));

  if (homeHtml !== null) {
    for (const marker of REQUIRED_HOME_TEXT) {
      check("homepage content", () => {
        assert.ok(homeHtml.includes(marker), `dist/index.html is missing "${marker}"`);
      });
    }

    check("homepage structured data", () => {
      assert.ok(
        !homeHtml.includes("aggregateRating"),
        "dist/index.html declares an aggregateRating that visible content does not substantiate",
      );
    });
  }

  const notFoundHtml = await readFileOrNull(path.join(distDir, "404.html"));

  check("dist/404.html", () => {
    assert.ok(notFoundHtml !== null, "missing dist/404.html");
    assert.ok(notFoundHtml.includes("noindex"), "dist/404.html does not declare noindex");
  });

  const sitemap = await readFileOrNull(path.resolve(projectRoot, "public/sitemap.xml"));

  check("sitemap", () => {
    assert.ok(sitemap !== null, "missing public/sitemap.xml");

    const actual = [...sitemap.matchAll(LOC_RE)].map(([, loc]) => loc.trim());
    const expected = indexableRoutes.map((route) => `${SITE_ORIGIN}${route}`);

    assert.deepEqual(
      [...actual].sort(),
      [...expected].sort(),
      `sitemap does not exactly cover ${expected.length} indexable routes (found ${actual.length})`,
    );
    assert.ok(!sitemap.includes("/invoice-converter"), "sitemap includes the noindex invoice-converter utility");
  });

  if (failures.length > 0) {
    const error = new Error(
      `SEO validation failed with ${failures.length} problem(s):\n${failures.map((line) => `  - ${line}`).join("\n")}`,
    );
    error.name = "SeoValidationError";
    throw error;
  }

  console.log(`SEO validation passed for ${indexableRoutes.length} indexable routes.`);
}

const isDirectRun =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  try {
    await validateSeoBuild();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
