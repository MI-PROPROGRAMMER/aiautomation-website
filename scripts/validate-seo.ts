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

/**
 * Specialist commercial pages. Each owns one buying intent, so they get the
 * strictest checks: unique metadata, indexable robots, a canonical that matches
 * og:url, substantive prose, FAQ structured data that mirrors the visible FAQs,
 * and hub/article links that actually resolve.
 */
const COMMERCIAL_ROUTES = [
  "/services/ai-chatbot-development",
  "/services/forward-deployed-engineer",
  "/services/custom-ai-software",
];

/**
 * Industry landing pages. Kept as a literal here, like COMMERCIAL_ROUTES: this
 * validator deliberately re-derives the route list rather than importing
 * scripts/seo-routes.ts, so that a route added in one place and forgotten in
 * the other is caught rather than mirrored.
 */
const INDUSTRY_ROUTES = [
  "/industries/ecommerce",
  "/industries/logistics",
  "/industries/construction",
  "/industries/healthcare",
  "/industries/finance",
  "/industries/manufacturing",
  "/industries/real-estate",
  "/industries/education",
  "/industries/saas",
];

const CORE_ROUTES = [
  "/",
  "/services",
  ...COMMERCIAL_ROUTES,
  ...INDUSTRY_ROUTES,
  "/pricing",
  "/about",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
];

/**
 * Every page an article is allowed to name as its commercial parent. `/` is in
 * the set even though no article is currently assigned to it: leaving it out
 * would let a post link to the homepage as a second parent without the
 * one-parent rule noticing.
 */
const COMMERCIAL_PARENTS = ["/", "/services", ...COMMERCIAL_ROUTES];

/**
 * The 18 articles selected in docs/seo/commercial-content-cluster-map.md, keyed
 * by source filename, with the single commercial page each supports. That
 * document is the editorial authority; this map is its build-time enforcement,
 * so the two have to be changed together.
 *
 * A file absent from this map is an unselected article. It carries no cluster
 * obligation — its links still have to resolve, and it still may not argue for
 * two commercial parents at once, but it is not required to have one.
 */
const CLUSTER_ASSIGNMENTS: Record<string, string> = {
  "ai-wismo-tickets-dtc-brand.mdx": "/services/ai-chatbot-development",
  "dtc-refund-reflex-delivered-not-received-claims.mdx": "/services/ai-chatbot-development",
  "freight-check-calls-before-after-ai.mdx": "/services/ai-chatbot-development",
  "follow-up-gap-freight-leads.mdx": "/services/ai-chatbot-development",
  "cancellation-reason-capture-dtc-winback-blind-spot.mdx": "/services/ai-chatbot-development",

  "agentic-ai-blueprint.mdx": "/services/forward-deployed-engineer",
  "manual-vs-ai-order-exception-handling.mdx": "/services/forward-deployed-engineer",
  "carrier-vetting-manual-vs-ai-assisted-scoring.mdx": "/services/forward-deployed-engineer",
  "subcontractor-bid-leveling-ai-assisted.mdx": "/services/forward-deployed-engineer",
  "daily-reports-gc-jobs-forms-to-ai-summaries.mdx": "/services/forward-deployed-engineer",

  "spot-load-carrier-sourcing-agentic-ai.mdx": "/services/custom-ai-software",
  "ai-pricing-engines-freight-broker-quote-desks.mdx": "/services/custom-ai-software",
  "freight-bill-audit-sampled-vs-ai-line-item-review.mdx": "/services/custom-ai-software",
  "multi-channel-inventory-drift-dtc.mdx": "/services/custom-ai-software",
  "hidden-cost-manual-submittal-tracking-gcs.mdx": "/services/custom-ai-software",

  "automation-roi-playbook.mdx": "/services",
  "hidden-cost-manual-freight-sales-desk.mdx": "/services",
  "manual-tender-acceptance-brokerage-routing-guide.mdx": "/services",
};

/** Related-article links a selected post carries: enough to be a cluster, few enough to stay readable. */
const MIN_RELATED_ARTICLES = 2;
const MAX_RELATED_ARTICLES = 3;

/** Every commercial page must route buyers back into the hub and to a human. */
const REQUIRED_COMMERCIAL_LINKS = ["/services", "/about", "/contact"];

/**
 * Supporting articles per commercial page. Three is the floor the spec sets for
 * a real topic cluster; a page that cannot reach it is a content gap to publish
 * against, not a link to manufacture.
 */
const MIN_SUPPORTING_ARTICLES = 3;

/**
 * Floor for visible prose on a commercial page, in characters of body text with
 * markup, scripts, and styles removed. Header plus footer alone clear ~900, so
 * this only passes for a page that actually answers the buyer's questions.
 */
const MIN_COMMERCIAL_BODY_CHARS = 6000;

/**
 * Real static files that are legitimate link targets but deliberately absent
 * from the sitemap. `public/invoice-converter/` is a `noindex, nofollow`
 * utility page.
 */
const NON_INDEXABLE_LINK_TARGETS = ["/invoice-converter"];

/**
 * Search engines truncate the document title in the result snippet at roughly
 * this width, and Bing Webmaster Tools reports anything longer as "Title too
 * long". Measured on the decoded title, so `&amp;` counts as the one character
 * a reader sees rather than five.
 */
const MAX_TITLE_CHARS = 70;

/** Typo variant the spec rules out; `custom AI software` is the approved wording. */
const BANNED_PHRASE = "AI customer software";

/** The acronym must never appear before the phrase it stands for. */
const FDE_ROUTE = "/services/forward-deployed-engineer";
const FDE_INTRODUCTION = "forward deployed engineer (FDE)";

const HEAD_RE = /<head[^>]*>([\s\S]*?)<\/head>/i;
const BODY_RE = /<body[^>]*>([\s\S]*?)<\/body>/i;
const TITLE_RE = /<title[^>]*>([\s\S]*?)<\/title>/gi;
const DESCRIPTION_RE = /<meta[^>]*\bname="description"[^>]*>/gi;
const CANONICAL_RE = /<link[^>]*\brel="canonical"[^>]*>/gi;
const OG_URL_RE = /<meta[^>]*\bproperty="og:url"[^>]*>/i;
const ROBOTS_RE = /<meta[^>]*\bname="robots"[^>]*>/gi;
const H1_RE = /<h1[\s>]/gi;
const CONTENT_ATTR_RE = /\bcontent="([^"]*)"/i;
const HREF_ATTR_RE = /\bhref="([^"]*)"/i;
const ANCHOR_HREF_RE = /<a\b[^>]*\bhref="([^"]*)"/gi;
const JSON_LD_RE = /<script[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
const SCRIPT_OR_STYLE_RE = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const TAG_RE = /<[^>]+>/g;
const LOC_RE = /<loc>([\s\S]*?)<\/loc>/gi;
const MARKDOWN_LINK_RE = /\]\(([^)\s]+)\)/g;
const FRONTMATTER_BLOCK_RE = /export const frontmatter\s*=\s*\{([\s\S]*?)^\};/m;

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
 * Reverses the five characters React escapes in text nodes, so a visible FAQ
 * answer can be compared against the same sentence inside JSON-LD. `&amp;` is
 * decoded last or `&amp;lt;` would collapse into `<`.
 */
function decodeEntities(value: string) {
  return value
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** Visible text of an HTML fragment: no scripts, no styles, no markup. */
function toVisibleText(html: string) {
  return decodeEntities(html.replace(SCRIPT_OR_STYLE_RE, " ").replace(TAG_RE, " "))
    .replace(/\s+/g, " ")
    .trim();
}

type PublishedPost = {
  file: string;
  route: string;
  source: string;
};

type RouteDocument = {
  html: string;
  head: string;
  body: string;
  text: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
};

function parseRouteDocument(html: string): RouteDocument {
  const head = html.match(HEAD_RE)?.[1] ?? "";
  const body = html.match(BODY_RE)?.[1] ?? "";
  const titleMatch = [...head.matchAll(TITLE_RE)][0];
  const descriptionMatch = (head.match(DESCRIPTION_RE) ?? [])[0];
  const canonicalMatch = (head.match(CANONICAL_RE) ?? [])[0];

  return {
    html,
    head,
    body,
    text: toVisibleText(body),
    title: titleMatch ? decodeEntities(titleMatch[1]).trim() : null,
    description: descriptionMatch
      ? decodeEntities(descriptionMatch.match(CONTENT_ATTR_RE)?.[1] ?? "").trim()
      : null,
    canonical: canonicalMatch ? canonicalMatch.match(HREF_ATTR_RE)?.[1] ?? null : null,
  };
}

/**
 * Parses `export const frontmatter = { ... }` with field-level regexes. The
 * validator must stay dependency-free, so it never imports the MDX modules and
 * deliberately re-derives the route list instead of reusing scripts/seo-routes.ts
 * — it has to be able to disagree with the generator.
 *
 * Fields are read only from inside the exported frontmatter object. Scanning the
 * whole file would let article prose or a fenced code sample containing
 * `draft: true` or `slug: "..."` silently drop or rename a published route, so
 * the validator would then check a different route set than the sitemap.
 */
async function readPublishedPosts(projectRoot: string): Promise<PublishedPost[]> {
  const blogDir = path.resolve(projectRoot, "src/content/blog");
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const posts: PublishedPost[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;

    const source = await fs.readFile(path.join(blogDir, entry.name), "utf-8");
    const block = source.match(FRONTMATTER_BLOCK_RE)?.[1];

    if (block === undefined) {
      failures.push(`${entry.name}: no "export const frontmatter" object found`);
      continue;
    }

    if (/^\s*draft:\s*true\b/m.test(block)) continue;

    const explicitSlug = block.match(/^\s*slug:\s*"([^"]+)"/m)?.[1];
    posts.push({
      file: entry.name,
      route: `/blog/${explicitSlug ?? entry.name.replace(/\.mdx$/, "")}`,
      source,
    });
  }

  return posts.sort((a, b) => a.route.localeCompare(b.route));
}

/**
 * Checks the links an article carries, reading the MDX source rather than the
 * built page. The rendered document also contains the header and footer, which
 * link to all three specialist pages — scoping to the source is the only way to
 * see what the *article* claims.
 *
 * For a selected article the cluster is an invariant, not a preference: exactly
 * one link to its assigned parent, no link to any other commercial page, and
 * two or three related articles that all resolve. A post pointing at two
 * commercial pages argues for two buying intents and turns its own cluster into
 * cannibalisation; a post with none is in the cluster map but not in the
 * cluster.
 */
function validateArticleLinks(post: PublishedPost, resolvable: Set<string>, blogRoutes: Set<string>) {
  const targets = [
    ...[...post.source.matchAll(MARKDOWN_LINK_RE)].map(([, href]) => href),
    ...[...post.source.matchAll(ANCHOR_HREF_RE)].map(([, href]) => href),
  ].filter((href) => href.startsWith("/"));

  const expected = CLUSTER_ASSIGNMENTS[post.file];
  const broken = new Set<string>();
  const parents = new Set<string>();
  const related = new Set<string>();
  let parentLinks = 0;

  for (const href of targets) {
    const target = href.split(/[?#]/)[0];
    if (target === "") continue;

    const normalized = target.length > 1 ? target.replace(/\/+$/, "") : target;

    // Images and other static assets carry an extension. A post's hero lives at
    // /blog/<slug>/hero.jpg, so without this the hero would be counted as a
    // related article and would be expected to resolve to a route.
    const isAsset = /\.[a-z0-9]{2,5}$/i.test(normalized);
    if (isAsset) continue;

    if (COMMERCIAL_PARENTS.includes(normalized)) {
      parents.add(normalized);
      if (normalized === expected) parentLinks += 1;
    }
    if (normalized.startsWith("/blog/") && normalized !== post.route) related.add(normalized);
    if (!resolvable.has(normalized)) broken.add(href);
  }

  check(`${post.file} links`, () => {
    assert.deepEqual([...broken], [], `unresolvable internal link(s): ${[...broken].join(", ")}`);
  });

  if (expected === undefined) {
    check(`${post.file} cluster`, () => {
      assert.ok(
        parents.size <= 1,
        `unselected article links to ${parents.size} commercial pages (${[...parents].join(", ")})`,
      );
    });
    return;
  }

  check(`${post.file} cluster`, () => {
    assert.equal(parentLinks, 1, `expected exactly 1 link to its parent ${expected}, found ${parentLinks}`);
    assert.deepEqual(
      [...parents],
      [expected],
      `expected ${expected} as the only commercial parent, found ${parents.size === 0 ? "none" : [...parents].join(", ")}`,
    );
    assert.ok(
      related.size >= MIN_RELATED_ARTICLES && related.size <= MAX_RELATED_ARTICLES,
      `expected ${MIN_RELATED_ARTICLES}–${MAX_RELATED_ARTICLES} related articles, found ${related.size}`,
    );
    for (const href of related) {
      assert.ok(blogRoutes.has(href), `related article ${href} is not a published post`);
    }
  });
}

function validateRouteDocument(route: string, doc: RouteDocument) {
  check(`${route} <title>`, () => {
    const titles = [...doc.head.matchAll(TITLE_RE)];
    assert.equal(titles.length, 1, `expected 1 <title> in <head>, found ${titles.length}`);
    assert.notEqual(doc.title, "", "<title> is empty");
    assert.ok(
      (doc.title?.length ?? 0) <= MAX_TITLE_CHARS,
      `title is ${doc.title?.length} characters, over the ${MAX_TITLE_CHARS}-character limit: "${doc.title}"`,
    );
  });

  check(`${route} meta description`, () => {
    const tags = doc.head.match(DESCRIPTION_RE) ?? [];
    assert.equal(tags.length, 1, `expected 1 meta description, found ${tags.length}`);
    assert.notEqual(doc.description, "", "meta description is empty");
  });

  check(`${route} canonical`, () => {
    const tags = doc.head.match(CANONICAL_RE) ?? [];
    assert.equal(tags.length, 1, `expected 1 canonical link, found ${tags.length}`);
    assert.equal(doc.canonical, `${SITE_ORIGIN}${route}`);
  });

  check(`${route} <h1>`, () => {
    const count = countMatches(doc.html, H1_RE);
    assert.ok(count >= 1, "no <h1> found");
    assert.equal(count, 1, `expected exactly 1 <h1>, found ${count}`);
  });
}

/** Every JSON-LD block on the page, parsed. Unparseable blocks are a failure. */
function readJsonLd(route: string, doc: RouteDocument): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [];

  for (const [, raw] of doc.html.matchAll(JSON_LD_RE)) {
    try {
      blocks.push(JSON.parse(raw) as Record<string, unknown>);
    } catch (error) {
      failures.push(
        `${route} JSON-LD: block does not parse (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }

  return blocks;
}

function validateCommercialPage(route: string, doc: RouteDocument, blogSlugs: Set<string>) {
  check(`${route} robots`, () => {
    const robots = (doc.head.match(ROBOTS_RE) ?? [])
      .map((tag) => tag.match(CONTENT_ATTR_RE)?.[1] ?? "")
      .join(" ");
    assert.ok(!/noindex/i.test(robots), `commercial page declares noindex ("${robots}")`);
  });

  check(`${route} og:url`, () => {
    const tag = doc.head.match(OG_URL_RE);
    assert.ok(tag !== null, "missing og:url");
    assert.equal(tag[0].match(CONTENT_ATTR_RE)?.[1], `${SITE_ORIGIN}${route}`);
  });

  check(`${route} body content`, () => {
    assert.ok(
      doc.text.length >= MIN_COMMERCIAL_BODY_CHARS,
      `rendered body text is ${doc.text.length} chars, below the ${MIN_COMMERCIAL_BODY_CHARS} floor`,
    );
  });

  check(`${route} not-found leakage`, () => {
    assert.ok(
      !/page not found/i.test(doc.text) && !/page not found/i.test(doc.title ?? ""),
      "renders NotFound content — the route is falling through to the catch-all",
    );
  });

  check(`${route} structured data`, () => {
    assert.ok(!doc.html.includes("aggregateRating"), "declares an aggregateRating");
    assert.ok(!/"@type"\s*:\s*"Review"/.test(doc.html), "declares Review schema without visible reviews");
    assert.ok(!doc.html.includes('"priceSpecification"'), "declares a price the page does not publish");
  });

  const jsonLd = readJsonLd(route, doc);

  check(`${route} Service schema`, () => {
    const service = jsonLd.find((block) => block["@type"] === "Service");
    assert.ok(service !== undefined, "no Service schema");
    assert.equal(service.url, `${SITE_ORIGIN}${route}`, "Service url is not the page URL");
    assert.deepEqual(service.provider, { "@id": `${SITE_ORIGIN}/#organization` }, "provider is not the ApexifyLabs organization");
    assert.ok(typeof service.name === "string" && service.name.length > 0, "Service name is empty");
    assert.ok(
      typeof service.description === "string" && service.description.length > 0,
      "Service description is empty",
    );
  });

  check(`${route} BreadcrumbList`, () => {
    const crumbs = jsonLd.find((block) => block["@type"] === "BreadcrumbList");
    assert.ok(crumbs !== undefined, "no BreadcrumbList schema");
    const trail = crumbs.itemListElement as Array<{ item?: string }> | undefined;
    assert.ok(Array.isArray(trail) && trail.length >= 3, "breadcrumb trail is shorter than Home › Services › page");
    assert.equal(trail[trail.length - 1]?.item, `${SITE_ORIGIN}${route}`, "breadcrumb does not end on this page");
  });

  check(`${route} FAQ parity`, () => {
    const faq = jsonLd.find((block) => block["@type"] === "FAQPage");
    assert.ok(faq !== undefined, "no FAQPage schema");

    const questions = (faq.mainEntity ?? []) as Array<{
      name?: string;
      acceptedAnswer?: { text?: string };
    }>;
    assert.ok(questions.length >= 5 && questions.length <= 8, `expected 5–8 FAQs, found ${questions.length}`);

    for (const entry of questions) {
      assert.ok(
        entry.name !== undefined && doc.text.includes(entry.name),
        `FAQ question is not visible on the page: "${entry.name ?? ""}"`,
      );
      const answer = entry.acceptedAnswer?.text;
      assert.ok(
        answer !== undefined && doc.text.includes(answer),
        `FAQ answer is not visible on the page: "${(answer ?? "").slice(0, 60)}…"`,
      );
    }
  });

  const hrefs = [...doc.body.matchAll(ANCHOR_HREF_RE)].map(([, href]) => href);

  check(`${route} hub links`, () => {
    for (const target of REQUIRED_COMMERCIAL_LINKS) {
      assert.ok(hrefs.includes(target), `no link to ${target}`);
    }
  });

  check(`${route} supporting articles`, () => {
    const articles = new Set(hrefs.filter((href) => href.startsWith("/blog/")));
    assert.ok(
      articles.size >= MIN_SUPPORTING_ARTICLES,
      `links to ${articles.size} supporting article(s), below the ${MIN_SUPPORTING_ARTICLES} floor`,
    );
    for (const href of articles) {
      assert.ok(blogSlugs.has(href), `supporting article ${href} is not a published post`);
    }
  });

  if (route === FDE_ROUTE) {
    check(`${route} acronym introduction`, () => {
      const introducedAt = doc.text.toLowerCase().indexOf(FDE_INTRODUCTION.toLowerCase());
      assert.notEqual(introducedAt, -1, `page never writes "${FDE_INTRODUCTION}"`);

      const firstAcronymAt = doc.text.indexOf("FDE");
      assert.equal(
        firstAcronymAt,
        introducedAt + FDE_INTRODUCTION.length - 4,
        'the acronym "FDE" appears before "forward deployed engineer (FDE)" introduces it',
      );
    });
  }
}

/**
 * Resolves every internal anchor in a built document. An href that points at no
 * indexable route (and at no known static file) is a link that 404s in
 * production — the exact failure the real-404 work made visible.
 */
function validateInternalLinks(route: string, doc: RouteDocument, resolvable: Set<string>) {
  const broken = new Set<string>();

  for (const [, rawHref] of doc.html.matchAll(ANCHOR_HREF_RE)) {
    const href = decodeEntities(rawHref);

    if (href === "" || /^(https?:|mailto:|tel:|javascript:|data:)/i.test(href) || href.startsWith("#")) {
      continue;
    }

    const target = href.split(/[?#]/)[0];
    if (target === "") continue;

    const normalized = target.length > 1 ? target.replace(/\/+$/, "") : target;
    if (!resolvable.has(normalized)) broken.add(href);
  }

  check(`${route} internal links`, () => {
    assert.deepEqual([...broken], [], `unresolvable internal link(s): ${[...broken].join(", ")}`);
  });
}

export async function validateSeoBuild(projectRoot = process.cwd()): Promise<void> {
  failures.length = 0;

  const distDir = path.resolve(projectRoot, "dist");
  const posts = await readPublishedPosts(projectRoot);
  const blogRoutes = posts.map((post) => post.route);
  const indexableRoutes = [...CORE_ROUTES, ...blogRoutes];
  const resolvableLinks = new Set([...indexableRoutes, ...NON_INDEXABLE_LINK_TARGETS]);
  const blogSlugs = new Set(blogRoutes);

  for (const post of posts) {
    validateArticleLinks(post, resolvableLinks, blogSlugs);
  }

  check("cluster map coverage", () => {
    const files = new Set(posts.map((post) => post.file));
    const missing = Object.keys(CLUSTER_ASSIGNMENTS).filter((file) => !files.has(file));
    assert.deepEqual(missing, [], `cluster map names unpublished article(s): ${missing.join(", ")}`);
  });

  const documents = new Map<string, RouteDocument>();

  for (const route of indexableRoutes) {
    const html = await readFileOrNull(distPathForRoute(distDir, route));

    if (html === null) {
      failures.push(`${route}: missing ${path.relative(projectRoot, distPathForRoute(distDir, route))}`);
      continue;
    }

    const doc = parseRouteDocument(html);
    documents.set(route, doc);

    validateRouteDocument(route, doc);
    validateInternalLinks(route, doc, resolvableLinks);

    check(`${route} approved wording`, () => {
      assert.ok(
        !doc.text.toLowerCase().includes(BANNED_PHRASE.toLowerCase()),
        `page uses "${BANNED_PHRASE}" — the approved wording is "custom AI software"`,
      );
    });
  }

  for (const route of COMMERCIAL_ROUTES) {
    const doc = documents.get(route);

    if (doc === undefined) continue;

    validateCommercialPage(route, doc, blogSlugs);
  }

  // Two indexable pages sharing a title are two pages competing for the same
  // result. Checked across every route, not just the commercial ones, because
  // the risk is highest among the 95 articles.
  check("title uniqueness", () => {
    const seen = new Map<string, string>();

    for (const [route, doc] of documents) {
      if (doc.title === null) continue;

      const owner = seen.get(doc.title);
      assert.equal(owner, undefined, `${route} shares its title with ${owner}: "${doc.title}"`);
      seen.set(doc.title, route);
    }
  });

  // Commercial intent is one-page-one-query: the hub and its three specialist
  // pages must never present search engines with the same title or the same
  // canonical.
  check("commercial page uniqueness", () => {
    const scope = ["/", "/services", ...COMMERCIAL_ROUTES].filter((route) => documents.has(route));

    for (const field of ["title", "description", "canonical"] as const) {
      const seen = new Map<string, string>();

      for (const route of scope) {
        const value = documents.get(route)?.[field];
        if (value === null || value === undefined) continue;

        const owner = seen.get(value);
        assert.equal(owner, undefined, `${route} shares its ${field} with ${owner}`);
        seen.set(value, route);
      }
    }
  });

  const homeDoc = documents.get("/");

  if (homeDoc !== undefined) {
    for (const marker of REQUIRED_HOME_TEXT) {
      check("homepage content", () => {
        assert.ok(homeDoc.html.includes(marker), `dist/index.html is missing "${marker}"`);
      });
    }

    check("homepage structured data", () => {
      assert.ok(
        !homeDoc.html.includes("aggregateRating"),
        "dist/index.html declares an aggregateRating that visible content does not substantiate",
      );
    });

    check("homepage specialist links", () => {
      const hrefs = [...homeDoc.body.matchAll(ANCHOR_HREF_RE)].map(([, href]) => href);
      for (const target of ["/services", ...COMMERCIAL_ROUTES]) {
        assert.ok(hrefs.includes(target), `homepage does not link to ${target}`);
      }
    });
  }

  const servicesDoc = documents.get("/services");

  if (servicesDoc !== undefined) {
    check("services hub links", () => {
      const hrefs = [...servicesDoc.body.matchAll(ANCHOR_HREF_RE)].map(([, href]) => href);
      for (const target of COMMERCIAL_ROUTES) {
        assert.ok(hrefs.includes(target), `/services does not link to ${target}`);
      }
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
