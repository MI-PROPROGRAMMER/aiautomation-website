import type { BlogPost } from "@/content/blog/posts";
import type { Vertical } from "@/lib/blog-taxonomy";

/**
 * Topic clusters inside each vertical, used to give the further-reading network
 * a middle layer between the industry and its ~33 articles.
 *
 * The clusters are defined here rather than derived from `tags` because the tag
 * vocabulary is too long-tail to group on its own: across a vertical's 33 posts
 * most secondary tags appear exactly once, so clustering on tag frequency
 * produces themes like "Credit" and "Productivity" sitting beside "Order Ops".
 *
 * Matching runs against the slug and the tags together, so a new post lands in
 * the right cluster without anyone editing this file — and anything unmatched
 * falls into the vertical's catch-all rather than disappearing from the page.
 */

export type Cluster = {
  /** Short label for the cluster node. Kept to 2–3 words so it fits. */
  name: string;
  /** Substrings tested against `${slug} ${tags}`, lowercased. */
  match: string[];
};

type ClusterSet = { clusters: Cluster[]; fallback: string };

const CLUSTERS: Record<Exclude<Vertical, "general">, ClusterSet> = {
  logistics: {
    clusters: [
      {
        name: "Accessorials & fees",
        match: [
          "accessorial", "detention", "reweigh", "reclass", "fuel-surcharge",
          "demurrage", "otif", "chargeback",
        ],
      },
      {
        name: "Carrier network",
        match: [
          "carrier", "double-brokering", "fraud", "no-show", "vetting",
          "onboarding", "expired",
        ],
      },
      {
        name: "Cash & billing",
        match: [
          "pay", "pod-lag", "dso", "factoring", "invoice", "audit", "credit",
          "ar-aging", "cash", "damage-claims", "working capital",
        ],
      },
      {
        name: "Coverage desk",
        match: [
          "load-board", "spot", "off-hours", "tender", "lane-rfp", "appointment",
          "coverage", "routing-guide",
        ],
      },
      {
        name: "Quoting & sales",
        match: ["pricing", "quote", "follow-up", "sales-desk", "rate-confirmation", "lead"],
      },
      {
        name: "Documents & claims",
        match: ["bill-of-lading", "cold-chain", "cross-border", "paperwork", "check-calls", "track"],
      },
    ],
    fallback: "Brokerage operations",
  },

  ecommerce: {
    clusters: [
      {
        name: "Returns & refunds",
        match: ["return", "refund", "disposition", "bracketed", "store-credit", "exchange", "reverse"],
      },
      {
        name: "Order exceptions",
        match: [
          "address", "split-shipment", "backorder", "mispick", "exception",
          "unconfirmed", "delivery-promise", "pre-order",
        ],
      },
      {
        name: "Support & CX",
        match: ["wismo", "support", "cancellation", "restock", "waitlist", "delivered-not-received"],
      },
      {
        name: "Inventory & catalog",
        match: ["inventory", "stock", "catalog", "product-data", "pim", "marketplace", "map-violation"],
      },
      {
        name: "Payments & fraud",
        match: ["decline", "card-on-file", "fraud", "chargeback", "dispute", "promo-code"],
      },
      {
        name: "Wholesale & 3PL",
        match: ["wholesale", "3pl", "asn", "vendor", "parcel", "ddp", "retail-compliance"],
      },
    ],
    fallback: "DTC operations",
  },

  construction: {
    clusters: [
      {
        name: "Submittals & RFIs",
        match: ["submittal", "rfi", "long-lead", "procurement", "material", "ofci"],
      },
      {
        name: "Compliance docs",
        match: [
          "coi", "insurance", "lien-waiver", "certified-payroll", "safety",
          "prequal", "inspection", "permit",
        ],
      },
      {
        name: "Change orders & cost",
        match: [
          "change-order", "directive", "allowance", "buyout", "backcharge",
          "field-purchase", "cost-overrun", "job-margin",
        ],
      },
      {
        name: "Cash flow & pay apps",
        match: ["pay-app", "retainage", "billable", "t-m", "tm-ticket", "cash-flow", "truck-ticket"],
      },
      {
        name: "Closeout & warranty",
        match: ["closeout", "punch", "as-built", "warranty", "turnover", "handover"],
      },
      {
        name: "Preconstruction",
        match: ["estimating", "bid", "preconstruction", "schedule", "weather", "oac", "daily-report"],
      },
    ],
    fallback: "Project operations",
  },
};

export type ClusteredPosts = { name: string; posts: BlogPost[] };

/**
 * Groups a vertical's posts into its clusters, newest first inside each.
 * Empty clusters are dropped, so a vertical with thin coverage renders fewer
 * branches rather than empty ones.
 */
export const clusterPosts = (
  vertical: Vertical,
  posts: BlogPost[],
): ClusteredPosts[] => {
  const set = CLUSTERS[vertical as Exclude<Vertical, "general">];
  if (!set) {
    return posts.length > 0 ? [{ name: "Articles", posts }] : [];
  }

  const buckets = new Map<string, BlogPost[]>(set.clusters.map((c) => [c.name, []]));
  buckets.set(set.fallback, []);

  for (const post of posts) {
    const haystack = `${post.slug} ${(post.frontmatter.tags ?? []).join(" ")}`.toLowerCase();
    const hit = set.clusters.find((cluster) =>
      cluster.match.some((needle) => haystack.includes(needle)),
    );
    buckets.get(hit?.name ?? set.fallback)!.push(post);
  }

  return [...buckets.entries()]
    .filter(([, list]) => list.length > 0)
    .map(([name, list]) => ({ name, posts: list }));
};
