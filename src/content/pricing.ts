/**
 * Pricing, as data.
 *
 * This is the single source for both published pricing surfaces: the /pricing
 * page and `public/pricing.md`, the machine-readable file AI agents read when
 * comparing vendors. Two hand-maintained copies of a price is the drift
 * `src/content/portfolio.ts` warns about, with the worst possible symptom — an
 * agent quoting one figure to a buyer while the page shows another — so
 * `scripts/generate-pricing-md.ts` regenerates the markdown from this module
 * rather than anyone editing it directly.
 *
 * Figures here match what pricing.md has published since 2026-05-05. Changing
 * a number means changing it once, here.
 */

export type PricingTier = {
  name: string;
  /** Headline price as displayed. Not parsed — see `schema` for structure. */
  price: string;
  /** One line under the price. */
  summary: string;
  scope: string;
  timeline: string;
  includes: string[];
  bestFor: string;
  /** The one tier rendered as the recommended path. */
  featured?: boolean;
  /** Structured figures for Offer schema. Omitted where price is bespoke. */
  schema?: { minPrice: number; maxPrice?: number };
};

export const PRICING_INTRO =
  "Every engagement is scoped from a free 30-minute consultation, and a written cost-benefit analysis is delivered before any work begins. All figures are starting points in USD — final cost depends on scope, integrations and timeline.";

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Focused Automation",
    price: "From $2,000",
    summary: "One workflow, scoped and shipped.",
    scope:
      "A single workflow — lead enrichment, ticket routing, report generation, CRM hygiene.",
    timeline: "Live in days to 2 weeks",
    includes: [
      "Discovery and scoping",
      "Build and deployment",
      "Written runbook",
      "30-day defect warranty",
    ],
    bestFor: "Teams that already know which workflow they want automated.",
    schema: { minPrice: 2000 },
  },
  {
    name: "Comprehensive Automation Systems",
    price: "$10,000 – $50,000",
    summary: "Multi-system automation, built to be owned.",
    scope:
      "Automation across sales, operations or customer support; agentic AI pilots; custom interfaces.",
    timeline: "2 – 6 weeks",
    includes: [
      "Discovery audit",
      "Written acceptance criteria before any code",
      "Source-code delivery into your repository",
      "Weekly demos",
      "Monitoring and alerting setup",
      "Runbook plus recorded walkthrough",
      "30-day defect warranty",
    ],
    bestFor:
      "Companies replacing manual processes that span multiple tools or teams.",
    featured: true,
    schema: { minPrice: 10000, maxPrice: 50000 },
  },
  {
    name: "Enterprise / Strategic Partnership",
    price: "Custom",
    summary: "A roadmap, not a project.",
    scope:
      "A portfolio of automations, a dedicated automation roadmap, embedded engineering, and complex compliance or data-residency requirements.",
    timeline: "2 – 3 months for the first wave, ongoing thereafter",
    includes: [
      "Everything in Comprehensive",
      "Dedicated point of contact",
      "Quarterly roadmap reviews",
      "SLA-backed monitoring",
    ],
    bestFor:
      "Organisations of 50+ people standardising automation across the business.",
  },
];

/** Applies to every engagement regardless of tier. */
export const PRICING_INCLUDED = [
  "Free 30-minute discovery consultation",
  "Written acceptance criteria before any code is written",
  "Source code delivered to your repository under your licence",
  "All credentials and integrations transferred to your accounts",
  "Written runbook plus video walkthrough so your team can extend the work",
  "30-day defect warranty, no questions asked",
];

export const PRICING_PAYMENT = [
  "Payment terms are outlined in each proposal",
  "Late payments may pause work until balances are resolved, per the Terms of Service",
  "Intellectual property of custom automation assets transfers to you on full payment",
];

export const PRICING_FAQS = [
  {
    question: "How much does AI automation cost?",
    answer:
      "Focused automation projects start at $2,000. Comprehensive multi-system builds run $10,000 to $50,000. Enterprise engagements are scoped individually. Final cost depends on how many systems are involved, how much of the data is unstructured, and how much integration work sits between them.",
  },
  {
    question: "What determines where a project lands in that range?",
    answer:
      "Three things, in order: how many systems the automation has to touch, whether the inputs are structured or arrive as documents and email, and whether the workflow needs a human checkpoint. A single-system workflow with clean inputs is the low end; a multi-system agentic build with compliance requirements is the high end.",
  },
  {
    question: "Do you charge a retainer or a project fee?",
    answer:
      "Focused and Comprehensive engagements are priced per project, with terms set in the proposal. Enterprise partnerships are structured around an ongoing roadmap rather than a fixed deliverable.",
  },
  {
    question: "What is the return on an automation project?",
    answer:
      "Most clients see payback within three to six months, and a written cost-benefit analysis is delivered before any work begins so the projection is agreed rather than assumed. If the arithmetic does not work, that is a reason not to build it.",
  },
  {
    question: "Do we own what you build?",
    answer:
      "Yes. Source code is delivered into your repository under your licence, credentials and integrations are transferred to your accounts, and intellectual property in the custom assets transfers to you on full payment. You are not renting access to something we host.",
  },
  {
    question: "What happens if it breaks after delivery?",
    answer:
      "Every engagement carries a 30-day defect warranty, and Comprehensive builds ship with monitoring and alerting configured. Ongoing support beyond the warranty is arranged separately rather than assumed into the project price.",
  },
];

/** Shown on the page and written into pricing.md so both state the same date. */
export const PRICING_UPDATED = "2026-05-05";
