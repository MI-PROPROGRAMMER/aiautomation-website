export const SITE_URL = "https://apexifylabs.com";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "How long does an automation project typically take?",
    answer:
      "Most automation projects ship in 2–6 weeks, depending on complexity. Simple workflows can be live in days; enterprise-level systems may take 2–3 months. We provide detailed timelines and acceptance criteria during the initial consultation.",
  },
  {
    question: "What if something breaks or stops working?",
    answer:
      "We provide ongoing monitoring and support for all automations. Our team receives instant alerts on any failure and typically resolves issues within hours. All clients have direct access to our support team and a regular maintenance cadence.",
  },
  {
    question: "Do I need technical knowledge to use the automations?",
    answer:
      "Not at all. We design automations to be invisible — they run in the background. Where interaction is needed, we build clean interfaces and provide hands-on training for your team.",
  },
  {
    question: "How much does automation cost?",
    answer:
      "Cost varies with complexity and scope. Focused automations start around $2,000; comprehensive systems range from $10,000–$50,000. Most clients see ROI within 3–6 months — we provide a written cost-benefit analysis before any work begins.",
  },
  {
    question: "Can you integrate with our existing software?",
    answer:
      "Yes. We work with 1,000+ business applications including CRMs, ERPs, project management tools, and custom internal software. If your stack has an API or webhook surface, we can connect to it. Compatibility is assessed during discovery.",
  },
  {
    question: "What happens if we want to make changes later?",
    answer:
      "Every automation we build is designed to be modified, expanded, and optimised as your business evolves. Many clients begin with one automation and expand to a portfolio over the following 12 months.",
  },
];

export const PROCESS_STEPS: Array<{ name: string; text: string; meta: string }> = [
  {
    name: "Discover",
    meta: "Week 1",
    text: "We map your current workflows and identify the highest-leverage automation opportunities.",
  },
  {
    name: "Design",
    meta: "Week 2",
    text: "Architecture, integrations, and acceptance criteria — written down before any code is.",
  },
  {
    name: "Plan",
    meta: "Week 3",
    text: "Custom roadmap with sprints, ROI targets, and named owners aligned with your objectives.",
  },
  {
    name: "Build",
    meta: "Weeks 4–5",
    text: "We code, test, and harden the automation in a controlled environment before production.",
  },
  {
    name: "Ship",
    meta: "Ongoing",
    text: "Launch with monitoring, alerting, and a continuous-improvement loop — never a hand-off.",
  },
];

type SchemaObject = Record<string, unknown>;

export const buildFAQPage = (
  items: Array<{ question: string; answer: string }> = FAQ_ITEMS,
): SchemaObject => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const buildBreadcrumbs = (
  trail: Array<{ name: string; url: string }>,
): SchemaObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    item: entry.url,
  })),
});

export const buildHowTo = (
  steps: Array<{ name: string; text: string }> = PROCESS_STEPS,
): SchemaObject => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How ApexifyLabs delivers automation projects",
  description:
    "A repeatable five-stage process for scoping, designing, building, and shipping custom AI automation that pays back inside 3–6 months.",
  totalTime: "P6W",
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});

export const ORG_REF = { "@id": ORG_ID };
