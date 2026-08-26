import fs from "node:fs/promises";
import path from "node:path";

export type SeoRoute = {
  path: string;
  lastModified?: string;
};

export const SITE_ORIGIN = "https://apexifylabs.com";

/**
 * Specialist service pages, each owning one commercial search intent. They are
 * listed separately so routing, prerendering, sitemap generation, and the SEO
 * validator all read the same set instead of three hand-kept copies.
 */
export const COMMERCIAL_SERVICE_ROUTES = [
  "/services/ai-chatbot-development",
  "/services/forward-deployed-engineer",
  "/services/custom-ai-software",
];

/**
 * Indexable routes that are not derived from content. `/blog` is the post
 * index; `public/invoice-converter/index.html` is a noindex utility and is
 * deliberately absent.
 */
export const CORE_ROUTES = [
  "/",
  "/services",
  ...COMMERCIAL_SERVICE_ROUTES,
  "/about",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
];

// Posts export a real JS object rather than YAML frontmatter, so the fields are
// read out of that object's source text. Node-side tooling cannot import the
// MDX modules themselves — that needs Vite's MDX plugin.
const FRONTMATTER_BLOCK_RE = /export const frontmatter\s*=\s*\{([\s\S]*?)^\};/m;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const readString = (block: string, field: string) =>
  block.match(new RegExp(`^\\s*${field}:\\s*"([^"]*)"`, "m"))?.[1];

const readBoolean = (block: string, field: string) =>
  block.match(new RegExp(`^\\s*${field}:\\s*(true|false)\\b`, "m"))?.[1] === "true";

const byNewestThenSlug = (a: SeoRoute, b: SeoRoute) =>
  (b.lastModified ?? "").localeCompare(a.lastModified ?? "") || a.path.localeCompare(b.path);

export async function discoverPublishedBlogRoutes(projectRoot: string): Promise<SeoRoute[]> {
  const blogDir = path.resolve(projectRoot, "src/content/blog");
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const routes: SeoRoute[] = [];
  const slugOwners = new Map<string, string>();

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;

    const source = await fs.readFile(path.join(blogDir, entry.name), "utf-8");
    const block = source.match(FRONTMATTER_BLOCK_RE)?.[1];

    if (block === undefined) {
      throw new Error(`${entry.name}: no "export const frontmatter" object found.`);
    }

    if (readBoolean(block, "draft")) continue;

    const slug = readString(block, "slug") ?? entry.name.replace(/\.mdx$/, "");
    const owner = slugOwners.get(slug);

    if (owner !== undefined) {
      throw new Error(`${entry.name}: slug "${slug}" is already published by ${owner}.`);
    }
    slugOwners.set(slug, entry.name);

    const date = readString(block, "date");
    if (date === undefined || !ISO_DATE_RE.test(date)) {
      throw new Error(`${entry.name}: frontmatter "date" must be YYYY-MM-DD (found ${date ?? "nothing"}).`);
    }

    const updated = readString(block, "updated");
    if (updated !== undefined && !ISO_DATE_RE.test(updated)) {
      throw new Error(`${entry.name}: frontmatter "updated" must be YYYY-MM-DD (found ${updated}).`);
    }

    routes.push({ path: `/blog/${slug}`, lastModified: updated ?? date });
  }

  return routes.sort(byNewestThenSlug);
}

export async function getIndexableRoutes(projectRoot: string): Promise<SeoRoute[]> {
  const blogRoutes = await discoverPublishedBlogRoutes(projectRoot);

  return [...CORE_ROUTES.map((routePath) => ({ path: routePath })), ...blogRoutes];
}
