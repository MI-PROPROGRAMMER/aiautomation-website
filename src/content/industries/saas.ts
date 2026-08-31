import type { IndustryPageContent } from "./types";

export const saas: IndustryPageContent = {
  path: "/industries/saas",
  name: "SaaS & software",
  icon: "Cloud",
  eyebrow: "Industry",

  headline: {
    lead: "AI automation for SaaS teams",
    emphasis: "across the revenue and support motion.",
  },

  meta: {
    title: "AI Automation for SaaS & Software Companies",
    description:
      "AI automation for SaaS teams: lead qualification and routing, CRM hygiene, onboarding sequences, support deflection and churn signal detection — built on the go-to-market stack you already run.",
    ogTitle: "AI Automation for SaaS & Software Companies",
    ogDescription:
      "Responding to a lead within an hour makes qualifying it about seven times more likely. Where SaaS revenue operations leak time.",
  },

  schema: {
    name: "AI automation for SaaS and software companies",
    description:
      "Custom AI automation for SaaS companies, covering lead qualification and routing, CRM data hygiene, customer onboarding, support deflection and churn signal detection.",
    serviceType: [
      "Revenue operations automation",
      "SaaS support automation",
      "Lead qualification automation",
    ],
    audience: "SaaS and software companies",
  },

  answer:
    "AI automation for SaaS teams runs the repetitive parts of the revenue and support motion — enriching and routing inbound leads, keeping CRM data honest, handling tier-one support, surfacing churn signals — so sales and success teams work the accounts where a human actually changes the outcome.",

  stat: {
    value: "~7×",
    label:
      "more likely to qualify a lead when contacted within an hour — across 2,241 firms audited, the average response was 42 hours and 23% never responded at all",
    source: "Oldroyd, McElheran & Elkington, Harvard Business Review, March 2011",
    sourceUrl: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    asOf: "2011",
  },

  cardStat: "Average lead response is 42 hours; 23% never reply (HBR)",

  problems: {
    heading: "The motion leaks where nobody owns it.",
    intro:
      "SaaS teams instrument acquisition heavily and the handoffs between systems barely at all. The gaps are where pipeline quietly disappears.",
    items: [
      {
        title: "Inbound leads wait for a human to look",
        body: "Enrichment, scoring and routing usually depend on someone opening a queue. A demo request that sits overnight has already lost most of its value, and the research on response time has been consistent about that for over a decade.",
      },
      {
        title: "CRM data decays faster than anyone maintains it",
        body: "Duplicates, stale ownership, missing firmographics and unlogged activity accumulate until reporting is directionally wrong. Sales teams then work from instinct, and forecasting becomes negotiation.",
      },
      {
        title: "Tier-one support absorbs the team that should be onboarding",
        body: "Setup questions, billing enquiries and known issues are high-volume and answerable from documentation and account state. They consume the capacity that determines whether new accounts activate.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro: "Support and qualification are conversations. Routing and hygiene are data problems.",
    items: [
      {
        service: "chatbot",
        heading: "Conversational AI for support and qualification",
        body: "An agent wired to account state and documentation resolves tier-one support outright and qualifies inbound the moment it arrives, rather than deflecting into a queue.",
        outcomes: [
          "Tier-one support resolved from docs and account state",
          "Inbound qualification and meeting booking on arrival",
          "In-product onboarding guidance",
          "Handoff to a human with full context",
        ],
      },
      {
        service: "custom",
        heading: "Custom systems for routing, hygiene and signals",
        body: "Enrichment, deduplication, routing and churn detection are data problems across the CRM, product telemetry and billing. This is the layer that keeps them consistent and surfaces what matters.",
        outcomes: [
          "Lead enrichment, scoring and routing on arrival",
          "CRM deduplication and ownership hygiene",
          "Churn and expansion signals from product usage",
          "Attribution and reporting assembled from source systems",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for the GTM stack",
        body: "Revenue operations stacks are assembled over years and understood by few. An engineer inside the team builds against the stack as it is rather than as documented.",
        outcomes: [
          "Integration across CRM, product telemetry and billing",
          "Tooling built against your actual pipeline stages",
          "Instrumentation for response time and conversion",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate in a SaaS operation.",
    intro: "Revenue and support operations — not product engineering.",
    items: [
      "Lead enrichment, scoring and routing",
      "Inbound qualification and meeting booking",
      "CRM hygiene and deduplication",
      "Tier-one support deflection",
      "Onboarding and activation sequences",
      "Churn and expansion signal detection",
    ],
  },

  comparison: {
    heading: "The revenue motion, before and after.",
    intro: "Same pipeline, different time-to-first-touch.",
    columns: ["Workflow", "Manual process", "With automation"],
    rows: [
      ["Inbound lead", "Enriched and routed when someone opens the queue", "Enriched, scored and routed on arrival"],
      ["First response", "Hours to days", "Minutes, at any hour"],
      ["CRM data", "Cleaned in periodic projects", "Deduplicated and maintained continuously"],
      ["Tier-one support", "Handled by the success team", "Resolved from docs and account state; team handles real issues"],
      ["Churn signals", "Noticed at renewal", "Surfaced from usage while there is time to act"],
    ],
  },

  faqs: [
    {
      question: "What does AI automation do for a SaaS company?",
      answer:
        "It runs the repetitive parts of the revenue and support motion — enrichment, routing, CRM hygiene, tier-one support, churn signal detection — as systems. Selling, customer relationships and product decisions stay with your team.",
    },
    {
      question: "How is this different from the automation in our CRM?",
      answer:
        "CRM automation handles rules well and unstructured input poorly. The gap is everything requiring interpretation — reading a form submission, reconciling a duplicate, judging whether a usage pattern is churn risk — which is what these builds cover.",
    },
    {
      question: "Should we build this in-house?",
      answer:
        "Often yes, if you have the engineering capacity and it is close enough to your product to be worth the context switch. It is usually worth outsourcing when the work is integration-heavy, not differentiating, and competing against roadmap. We have written about that trade-off directly.",
    },
    {
      question: "How quickly does this ship?",
      answer:
        "Most single-workflow builds ship in two to six weeks with written acceptance criteria agreed first. Lead routing and tier-one support deflection are common starting points because both have measurable volume from day one.",
    },
  ],

  cta: {
    heading: "Start where the volume is highest.",
    body: "We scope one revenue or support workflow, agree written acceptance criteria, and ship it in two to six weeks.",
    service: "custom",
  },
};
