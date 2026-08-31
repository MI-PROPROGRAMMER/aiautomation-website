import type { ServiceKey, Vertical } from "@/lib/blog-taxonomy";

/**
 * Typed content model for the industry pages.
 *
 * Same reasoning as `src/content/services/types.ts`: copy is data, SEO plumbing
 * lives in one layout, and the visible FAQ list and the `FAQPage` JSON-LD are
 * rendered from a single `faqs` array so structured data cannot describe an
 * answer the page does not show.
 *
 * The model is deliberately smaller than `ServicePageContent`. These pages
 * answer "what does automation do for my industry" and hand off to a service
 * page for the engagement detail, so they carry no process, capabilities or
 * engagement sections.
 */

/**
 * A cited third-party benchmark. Every field is required, including the URL:
 * an uncited number must not reach a page.
 *
 * These state the scale of the industry's problem, never an ApexifyLabs result.
 * That distinction is the point — the site can stand behind a sourced industry
 * statistic without claiming an outcome it would have to defend, and a cited
 * figure is what makes a passage worth quoting.
 */
export type IndustryStat = {
  /** Headline figure, e.g. "19.3%". */
  value: string;
  /** What the figure measures, e.g. "of online orders are returned". */
  label: string;
  /** Publisher, e.g. "NRF, 2025 Retail Returns Landscape". */
  source: string;
  sourceUrl: string;
  /** Year the figure describes. Renders as a visible freshness signal. */
  asOf: string;
};

/** How one of the three services applies to this industry. */
export type ServiceAngle = {
  service: Exclude<ServiceKey, "overview">;
  heading: string;
  body: string;
  /** Concrete efficiency gains. Industry-specific, never generic. */
  outcomes: string[];
};

export type IndustryProblem = {
  title: string;
  body: string;
};

export type IndustryFaq = {
  question: string;
  answer: string;
};

export type IndustryPageContent = {
  /** Public route, e.g. "/industries/logistics". */
  path: string;
  /** Trailing breadcrumb label and homepage card title. */
  name: string;
  /** lucide-react icon name, used by the homepage card. */
  icon: string;
  eyebrow: string;

  /**
   * Set when the blog covers this industry. The layout lists every post whose
   * taxonomy vertical matches, so the page and `src/lib/blog-taxonomy.ts` can
   * never disagree about which posts belong to a vertical. Left undefined for
   * industries with no published posts yet.
   */
  vertical?: Vertical;

  /** Bold lead line and lighter emphasis line, matching every other h1. */
  headline: { lead: string; emphasis: string };

  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };

  schema: {
    name: string;
    description: string;
    serviceType: string[];
    /** schema.org audience for this page. */
    audience: string;
  };

  /** 40–60 words. Leads the page so the direct answer is extractable. */
  answer: string;

  /** Headline card shown beside the answer. */
  stat: IndustryStat;

  /**
   * One-line sourced figure for the homepage card. Short enough for a table
   * row, where `stat.label` is not. Carries its attribution inline so the
   * homepage cannot show an unsourced number while the page shows a sourced
   * one — which is what it did before these pages existed.
   */
  cardStat: string;

  problems: { heading: string; intro: string; items: IndustryProblem[] };

  /** The three services, applied to this industry. */
  angles: { heading: string; intro: string; items: ServiceAngle[] };

  /** Named workflows automated for this industry. */
  workflows: { heading: string; intro: string; items: string[] };

  /** Manual desk versus automated. Comparison tables cite well. */
  comparison: {
    heading: string;
    intro: string;
    columns: [string, string, string];
    rows: [string, string, string][];
  };

  faqs: IndustryFaq[];

  cta: { heading: string; body: string; service: Exclude<ServiceKey, "overview"> };
};
