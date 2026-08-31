import { blogPosts, type BlogPost } from "@/content/blog/posts";

/**
 * Maps the free-form `tags` already present on every post onto two axes:
 *
 *   vertical — which industry the reader works in, which drives CTA wording
 *   service  — which engagement actually solves the problem, which drives the link
 *
 * These are deliberately separate. A WISMO post and a submittal-tracking post
 * are both "operations", but one is a customer-facing conversation problem and
 * the other is a document-reconciliation problem, so they belong to different
 * services. Mapping vertical straight to service would send both to the same
 * page and waste the intent the reader arrived with.
 *
 * The tag vocabulary is messy by nature (147 distinct tags across 104 posts,
 * with "GC" / "GCs" / "GC Operations" / "General Contractor" all meaning the
 * same thing), so every lookup normalises before matching and nothing here
 * assumes a tag was spelled a particular way.
 */

export type Vertical = "ecommerce" | "logistics" | "construction" | "general";

export type ServiceKey = "chatbot" | "custom" | "fde" | "overview";

const normalize = (tag: string) => tag.trim().toLowerCase();

/** Anchor tags that identify a post's industry. Order matters only for ties. */
const VERTICAL_TAGS: Record<Exclude<Vertical, "general">, string[]> = {
  ecommerce: [
    "dtc",
    "e-commerce",
    "ecommerce",
    "order ops",
    "returns",
    "returns ops",
    "reverse logistics",
    "fulfillment",
    "wholesale operations",
    "retail compliance",
    "marketplaces",
    "subscriptions",
    "subscription retention",
    "apparel",
    "parcel ops",
    "catalog operations",
    "pim",
    "chargebacks",
    "pre-orders",
    "promotions",
    "allowance tracking",
  ],
  logistics: [
    "logistics",
    "freight brokerage",
    "freight broker",
    "freight brokers",
    "freight broker margin",
    "brokerage operations",
    "3pl",
    "3pl operations",
    "ltl",
    "drayage",
    "carrier management",
    "carrier sourcing",
    "carrier settlement",
    "carrier onboarding",
    "carrier operations",
    "carrier vetting",
    "carrier payments",
    "accessorials",
    "accessorial billing",
    "cold chain",
    "cargo claims",
    "freight audit",
    "freight sales",
    "load boards",
    "spot market",
    "lane rfp",
    "rate confirmation",
    "rate quoting",
    "bill of lading",
    "track and trace",
    "routing guide",
    "receiver appointments",
    "fuel surcharge",
    "coverage desk",
    "inbound logistics",
    "cross-border",
    "otif",
    "supply chain",
  ],
  construction: [
    "construction",
    "gc",
    "gcs",
    "gc operations",
    "gc preconstruction",
    "general contractor",
    "general contractors",
    "preconstruction",
    "closeout",
    "project closeout",
    "submittal tracking",
    "rfis",
    "change orders",
    "pay applications",
    "punch list",
    "as-built drawings",
    "backcharges",
    "retainage",
    "subcontractor compliance",
    "certified payroll",
    "davis-bacon",
    "bid leveling",
    "bid response",
    "estimating",
    "job cost",
    "cost coding",
    "t&m billing",
    "daily reports",
    "field operations",
    "materials management",
    "equipment rental",
    "permitting",
    "ofci",
    "buyout",
    "safety documentation",
    "warranty",
    "weather delays",
    "project accounting",
    "project documentation",
  ],
};

/**
 * Ordered intent rules. The first rule with a matching tag wins, so the most
 * specific intents are listed first and the broad transformation bucket last.
 */
const SERVICE_INTENTS: Array<{ service: ServiceKey; tags: string[] }> = [
  {
    // Anything where the unsolved problem is a conversation with a customer.
    // Deliberately narrow. Broad commercial tags like "Conversion" or "Revenue
    // Retention" appear on posts about inventory and marketplace monitoring,
    // which are not conversation problems, so they are not triggers here.
    service: "chatbot",
    tags: [
      "chatbots",
      "conversational ai",
      "customer support",
      "customer service",
      "cx",
      "retention",
      "subscription retention",
      "subscriptions",
      "lead conversion",
      "ai follow-up",
      "track and trace",
    ],
  },
  {
    // Engagement-scale problems: strategy, adoption, build-vs-buy, staffing.
    // Generic operational tags ("Project Management", "Risk Management",
    // "Productivity") are excluded — they sit on ordinary document-workflow
    // posts and would route them to the wrong engagement.
    service: "fde",
    tags: [
      "agentic ai",
      "automation strategy",
      "automation roi",
      "ai adoption",
      "build vs buy",
      "forward deployed engineering",
      "ai delivery",
      "hiring",
    ],
  },
  {
    // Document, data and reconciliation work across systems — the default for
    // the operational long tail, which is most of the archive.
    service: "custom",
    tags: [
      "invoice audit",
      "ap automation",
      "freight audit",
      "cargo claims",
      "chargebacks",
      "compliance",
      "procurement",
      "inventory",
      "margin",
      "margin recovery",
      "margin protection",
      "revenue recovery",
      "cash flow",
      "working capital",
      "ar aging",
      "credit",
      "payments",
      "carrier settlement",
      "job cost",
      "project accounting",
      "cost control",
      "pay applications",
      "certified payroll",
      "submittal tracking",
      "as-built drawings",
      "project documentation",
      "safety documentation",
      "catalog operations",
      "pim",
      "order ops",
      "fulfillment",
      "returns",
      "returns ops",
      "reverse logistics",
      "retail compliance",
      "wholesale operations",
    ],
  },
];

export const SERVICES: Record<
  ServiceKey,
  { path: string; name: string; anchor: string }
> = {
  chatbot: {
    path: "/services/ai-chatbot-development",
    name: "AI chatbot development",
    anchor: "AI chatbot development",
  },
  custom: {
    path: "/services/custom-ai-software",
    name: "Custom AI software",
    anchor: "custom AI software",
  },
  fde: {
    path: "/services/forward-deployed-engineer",
    name: "Forward deployed engineer",
    anchor: "an embedded engineer",
  },
  overview: {
    path: "/services",
    name: "AI automation services",
    anchor: "our AI automation services",
  },
};

/** Reader-facing noun for each vertical, used in CTA copy. */
const VERTICAL_NOUN: Record<Vertical, string> = {
  ecommerce: "DTC and ecommerce teams",
  logistics: "freight brokers and 3PLs",
  construction: "general contractors",
  general: "operations teams",
};

export const getVertical = (tags: string[] = []): Vertical => {
  const set = new Set(tags.map(normalize));
  let best: Vertical = "general";
  let bestScore = 0;

  for (const [vertical, anchors] of Object.entries(VERTICAL_TAGS)) {
    const score = anchors.reduce((total, anchor) => total + (set.has(anchor) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = vertical as Vertical;
    }
  }

  return best;
};

export const getService = (tags: string[] = []): ServiceKey => {
  const set = new Set(tags.map(normalize));

  for (const rule of SERVICE_INTENTS) {
    if (rule.tags.some((tag) => set.has(tag))) {
      return rule.service;
    }
  }

  // No intent signal at all: the operational archive is overwhelmingly
  // integration work, so custom is a better default than the overview page.
  return tags.length > 0 ? "custom" : "overview";
};

/**
 * Inverse document frequency over the tag vocabulary. Two posts sharing
 * "Detention" are far more related than two sharing "Logistics", which 33
 * posts carry, so rarity has to outweigh raw overlap count.
 */
const tagFrequency = (() => {
  const counts = new Map<string, number>();
  for (const post of blogPosts) {
    for (const tag of post.frontmatter.tags ?? []) {
      const key = normalize(tag);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return counts;
})();

const tagWeight = (tag: string) => {
  const df = tagFrequency.get(normalize(tag)) ?? 1;
  return Math.log(blogPosts.length / df) + 0.1;
};

/**
 * Related posts, scored by the summed IDF weight of shared tags and tie-broken
 * by recency. Falls back to same-vertical recent posts so a post with an
 * entirely unique tag set still links somewhere useful rather than nowhere.
 */
export const getRelatedPosts = (current: BlogPost, limit = 4): BlogPost[] => {
  const currentTags = current.frontmatter.tags ?? [];
  const currentVertical = getVertical(currentTags);
  const currentSet = new Set(currentTags.map(normalize));

  const scored = blogPosts
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      const shared = (post.frontmatter.tags ?? []).filter((tag) =>
        currentSet.has(normalize(tag)),
      );
      const score = shared.reduce((total, tag) => total + tagWeight(tag), 0);
      return { post, score };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.frontmatter.date).getTime() -
          new Date(a.post.frontmatter.date).getTime(),
    )
    .map((entry) => entry.post);

  if (scored.length >= limit) {
    return scored.slice(0, limit);
  }

  const chosen = new Set(scored.map((post) => post.slug));
  const backfill = blogPosts.filter(
    (post) =>
      post.slug !== current.slug &&
      !chosen.has(post.slug) &&
      getVertical(post.frontmatter.tags) === currentVertical,
  );

  return [...scored, ...backfill].slice(0, limit);
};

/** CTA copy: vertical supplies the language, service supplies the destination. */
export const getServiceCta = (tags: string[] = []) => {
  const vertical = getVertical(tags);
  const serviceKey = getService(tags);
  const service = SERVICES[serviceKey];

  const headings: Record<ServiceKey, string> = {
    chatbot: `Answering this at scale, for ${VERTICAL_NOUN[vertical]}`,
    custom: `Solving this across your systems, for ${VERTICAL_NOUN[vertical]}`,
    fde: `Running this as an engagement, for ${VERTICAL_NOUN[vertical]}`,
    overview: `How we work with ${VERTICAL_NOUN[vertical]}`,
  };

  const bodies: Record<ServiceKey, string> = {
    chatbot:
      "We build conversational AI wired into your own order data, knowledge base, and CRM — with a clean handoff to a human the moment it is needed.",
    custom:
      "We build the retrieval, integration, and agent layer that reconciles this across the systems that already hold your data — and you own the source code.",
    fde:
      "We embed an engineer in your team to scope, build, and ship this in production, rather than handing over a deck and an invoice.",
    overview:
      "We scope the problem, agree written acceptance criteria, and ship working automation in two to six weeks.",
  };

  return {
    vertical,
    serviceKey,
    service,
    heading: headings[serviceKey],
    body: bodies[serviceKey],
  };
};
