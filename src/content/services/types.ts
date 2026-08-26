/**
 * Typed content model for the specialist commercial service pages.
 *
 * The three pages share SEO plumbing (canonical, Open Graph, `Service` schema,
 * breadcrumbs, FAQ structured data) but not a word of their copy. Keeping the
 * copy as data and the plumbing in one layout means a page cannot ship with a
 * stale canonical, and — the failure mode that matters most — the visible FAQ
 * list and the `FAQPage` JSON-LD are rendered from the same `faqs` array, so
 * they cannot drift apart.
 */

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  title: string;
  body: string;
};

export type ServiceArticleLink = {
  /** Slug of a published post in src/content/blog. Validated at build time. */
  slug: string;
  title: string;
  blurb: string;
};

export type ServicePageContent = {
  /** Public route, e.g. "/services/ai-chatbot-development". */
  path: string;
  /** Trailing breadcrumb label, also used as the visible breadcrumb text. */
  breadcrumbName: string;
  eyebrow: string;

  /**
   * The single <h1>, split the way every other page heading on the site is:
   * a bold lead line and a lighter gradient emphasis line.
   */
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
  };

  /** 40–60 words: what the service is, who it is for, the business outcome. */
  answer: string;
  /** One supporting paragraph that sets up the rest of the page. */
  intro: string;

  problems: { heading: string; intro: string; items: ServiceDetail[] };
  useCases: { heading: string; intro: string; items: ServiceDetail[] };
  deliverables: { heading: string; intro: string; items: ServiceDetail[] };
  process: {
    heading: string;
    intro: string;
    steps: { name: string; meta: string; body: string }[];
  };
  capabilities: {
    heading: string;
    intro: string;
    groups: { name: string; items: string[] }[];
    note: string;
  };
  comparison: {
    heading: string;
    intro: string;
    columns: string[];
    rows: string[][];
    note: string;
  };
  fit: {
    heading: string;
    intro: string;
    goodHeading: string;
    good: string[];
    badHeading: string;
    bad: string[];
  };
  engagement: { heading: string; intro: string; body: string[]; points: ServiceDetail[] };
  faqs: ServiceFaq[];
  articles: { heading: string; intro: string; items: ServiceArticleLink[] };
  cta: { heading: string; body: string };
};
