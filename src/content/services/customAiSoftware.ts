import type { ServicePageContent } from "./types";

/**
 * Copy for /services/custom-ai-software.
 *
 * Wording is fixed by the spec: "custom AI software", never the "AI customer
 * software" variant, which reads as a typo and is not a query anyone has shown
 * us data for. scripts/validate-seo.ts fails the build if that phrase appears
 * in any rendered page.
 */
export const customAiSoftware: ServicePageContent = {
  path: "/services/custom-ai-software",
  breadcrumbName: "Custom AI Software",
  eyebrow: "Bespoke AI Systems",

  headline: {
    lead: "Custom AI software",
    emphasis: "for the work nothing off-the-shelf fits.",
  },

  meta: {
    title: "Custom AI Software Development | ApexifyLabs",
    description:
      "Custom AI software development for teams past the limits of SaaS and low-code: AI agents, retrieval systems, integrations, and internal tools you own outright.",
    ogTitle: "Custom AI Software Development — ApexifyLabs",
    ogDescription:
      "Bespoke AI systems built around your data and your business logic — agents, retrieval, integrations, and internal tools, deployed and handed over with the source.",
  },

  schema: {
    name: "Custom AI software development",
    description:
      "Design and development of bespoke AI software: AI agents, retrieval and knowledge systems, data workflows, system integrations, and internal tools built around a client's own business logic, deployed to their environment and handed over with the source code.",
    serviceType: [
      "Custom AI software development",
      "AI agent development",
      "Systems integration",
      "Internal tools development",
    ],
  },

  answer:
    "Custom AI software development is building a system around your own data, rules, and workflow instead of bending your process to fit a product. It is for teams who have outgrown SaaS and low-code on one specific problem. The outcome is software you own, that encodes how your business actually runs, and that keeps working as it changes.",

  intro:
    "Most operational problems do not need custom software, and we say so regularly. The ones that do have a common signature: the logic is specific enough that no vendor models it, the data lives in systems that were never meant to talk, and the workaround has already grown into a spreadsheet nobody is allowed to break.",

  problems: {
    heading: "The point where products stop fitting.",
    intro:
      "These are the symptoms that reliably show up just before a team decides to build rather than buy.",
    items: [
      {
        title: "The workaround has become the system",
        body:
          "A spreadsheet, a shared inbox, and a person who knows the rules now sit between two pieces of software. It works, it is undocumented, and it fails whenever that person is on leave.",
      },
      {
        title: "Your logic does not exist in any product",
        body:
          "Pricing, eligibility, routing, or exception rules that are specific to your business cannot be expressed in a vendor's configuration screen — so they end up applied by hand, inconsistently.",
      },
      {
        title: "Low-code hit its ceiling",
        body:
          "The automation started on a visual builder and grew into forty steps, nested branches, and a step nobody dares touch. Debugging now costs more than rewriting it properly would.",
      },
      {
        title: "The data is right in five places and different in each",
        body:
          "Inventory, customer records, or job costs disagree across systems because each one is a partial truth synced on a different schedule. Every downstream decision inherits the drift.",
      },
      {
        title: "The knowledge exists but cannot be reached",
        body:
          "Contracts, specifications, historical tickets, and internal documentation hold the answer to questions people ask daily, but nothing indexes them in a way a system can query.",
      },
      {
        title: "Per-seat pricing outgrew the value",
        body:
          "A tool priced per user is being paid for by an entire department to serve one workflow, and the cost curve now runs ahead of the benefit.",
      },
    ],
  },

  useCases: {
    heading: "What we build.",
    intro:
      "Different problems, one common property: the business logic is yours, and it is the reason the system is worth building.",
    items: [
      {
        title: "AI agents for operational workflows",
        body:
          "Systems that take a goal, gather what they need from your tools, act within defined limits, and escalate when the situation leaves those limits — with every step logged and reversible.",
      },
      {
        title: "Retrieval and knowledge systems",
        body:
          "An index over your documents, records, and history that answers questions with citations to the source, so the answer can be checked rather than trusted.",
      },
      {
        title: "Integration layers",
        body:
          "The connective tissue between systems that were never designed to meet: identity reconciliation, timing, retries, and a single defensible version of the truth.",
      },
      {
        title: "Internal tools",
        body:
          "The screen your operations team actually needs — built around the decision they make, not assembled from six tabs and a spreadsheet.",
      },
      {
        title: "Data pipelines and reporting",
        body:
          "Scheduled ingestion, validation, and reconciliation, so the numbers people act on are produced by a system rather than rebuilt by hand every Monday.",
      },
      {
        title: "Business-logic services",
        body:
          "Pricing, scoring, eligibility, or routing encoded once, versioned, tested, and called by everything that needs it — instead of re-implemented in three places.",
      },
    ],
  },

  deliverables: {
    heading: "What you get.",
    intro:
      "Custom software is only worth owning if you can actually maintain it. That constraint shapes what we hand over as much as what we build.",
    items: [
      {
        title: "A system in your environment",
        body:
          "Deployed to infrastructure you control, running against your production data, with the access model and secrets handling agreed before launch.",
      },
      {
        title: "Your logic, written down as code",
        body:
          "The rules that were living in someone's head become versioned, reviewable, and testable — which is often the largest single benefit of the project.",
      },
      {
        title: "Integrations that fail safely",
        body:
          "Retries, idempotency, and error handling on every external call, so a downstream outage produces an alert instead of corrupted records.",
      },
      {
        title: "Tests and evaluation",
        body:
          "Automated checks on the logic, and — where the system uses a model — an evaluation set so changes can be judged rather than hoped about.",
      },
      {
        title: "Monitoring and alerting",
        body:
          "Instrumentation on the paths that matter and alerts that reach a person, with a written definition of what healthy looks like.",
      },
      {
        title: "Full handover",
        body:
          "Source in your repository under your licence, credentials in your accounts, a written runbook and walkthrough, and a 30-day defect warranty.",
      },
    ],
  },

  process: {
    heading: "How a build runs.",
    intro:
      "The same five stages we use for every engagement, with an explicit early gate: the cheapest custom software project is the one we talk you out of.",
    steps: [
      {
        name: "Discover",
        meta: "Week 1",
        body:
          "Map the workflow, read the real records, and find where the leverage is. This stage regularly ends with a recommendation to configure an existing product instead of building one.",
      },
      {
        name: "Design",
        meta: "Week 2",
        body:
          "Architecture, data model, integration points, failure behaviour, and acceptance criteria — written down before any code, and reviewed against the data seen in discovery.",
      },
      {
        name: "Plan",
        meta: "Week 3",
        body:
          "A sequence with a first slice that is useful on its own, named owners on your side, and an explicit decision point after that slice ships.",
      },
      {
        name: "Build",
        meta: "Weeks 4–5",
        body:
          "Code in your repository from the first commit, weekly demos against acceptance criteria, and hardening in a controlled environment before production data is involved.",
      },
      {
        name: "Ship",
        meta: "Ongoing",
        body:
          "Launch with monitoring and alerting, then a maintenance cadence. Systems that encode business logic need to change when the business does — that is a feature of the model, not a defect.",
      },
    ],
  },

  capabilities: {
    heading: "What we build with.",
    intro:
      "The stack we already work in day to day. Architecture decisions follow from your constraints, not from a house preference.",
    groups: [
      {
        name: "Application and services",
        items: ["Python", "TypeScript", "Node.js", "PostgreSQL", "Supabase"],
      },
      {
        name: "AI and retrieval",
        items: ["OpenAI", "Anthropic", "Retrieval over your own content", "Evaluation and regression sets"],
      },
      {
        name: "Deploy and integrate",
        items: ["AWS", "Vercel", "GitHub", "Stripe", "HubSpot", "Slack", "Airtable", "Notion"],
      },
    ],
    note:
      "Low-code platforms — Zapier, Make, n8n — stay in the toolkit deliberately. Plenty of systems are best built as a small custom core with commodity glue around it, and pretending otherwise makes projects more expensive than they need to be.",
  },

  comparison: {
    heading: "Custom, SaaS, or low-code?",
    intro:
      "Three genuine options. The mistake is choosing on preference rather than on where the business logic lives.",
    columns: ["", "Custom AI software", "SaaS product", "Low-code automation"],
    rows: [
      [
        "Fits unusual business logic",
        "Exactly, because you specify it",
        "Only within the vendor's configuration",
        "Up to a point, then it gets brittle",
      ],
      [
        "Time to first value",
        "Weeks",
        "Days, if the fit is close",
        "Days",
      ],
      [
        "Cost shape",
        "Higher up front, no per-seat growth",
        "Ongoing subscription, scales with seats",
        "Low licence cost, rising maintenance effort",
      ],
      [
        "Who can change it",
        "Any competent engineer, with the source",
        "Only the vendor",
        "Whoever understands the flow that grew",
      ],
      [
        "Ceiling",
        "Your architecture and budget",
        "The product roadmap",
        "Step count, branching, and debuggability",
      ],
      [
        "Choose it when",
        "The logic is yours and the workaround is now load-bearing",
        "A product already models your process well",
        "The workflow is simple, stable, and low-volume",
      ],
    ],
    note:
      "Most healthy stacks are a mix. We regularly recommend buying the product and building only the connective piece — that is a cheaper, more maintainable answer than rebuilding what someone already sells.",
  },

  fit: {
    heading: "When to build — and when to buy.",
    intro:
      "Custom software is a long-term commitment. These are the conditions that make it the right one.",
    goodHeading: "A good fit when",
    good: [
      "The business logic is genuinely specific and no product models it without heavy compromise.",
      "The workaround has become load-bearing and is now an operational risk.",
      "Several systems have to be reconciled and none of them is willing to be the source of truth.",
      "The value is tied to your own data — its scale, its history, or its structure.",
      "You intend to own and maintain the result rather than rent it indefinitely.",
    ],
    badHeading: "Not a good fit when",
    bad: [
      "An existing product covers most of it and the gap is a preference rather than a constraint.",
      "The process is still changing weekly and nobody can say what the rules are yet.",
      "There is no one on your side who will own the system after handover.",
      "The volume is low enough that a person doing it by hand is genuinely cheaper.",
      "The real problem is that a process is undefined — software will only make that faster to get wrong.",
    ],
  },

  engagement: {
    heading: "How engagement and pricing work.",
    intro:
      "We scope after discovery. A number quoted before anyone has looked at your data is a guess, and quoting one would be the first thing we got wrong.",
    body: [
      "The first conversation is free and includes the build-versus-buy question. If an existing product covers your case, saying so costs us a project and saves you a system to maintain.",
      "The bands we publish for our automation work apply here too: focused builds start around $2,000, and comprehensive systems range from $10,000 to $50,000 depending on scope and integration surface. Every engagement gets a written cost-benefit analysis before work begins.",
      "Most projects ship in two to six weeks; systems touching several enterprise platforms can run two to three months. The first slice is always designed to be useful on its own, so the decision to continue is made against something real.",
    ],
    points: [
      {
        title: "Build-versus-buy is part of scoping",
        body: "Discovery is allowed to conclude that you should configure a product instead, and sometimes it does.",
      },
      {
        title: "Written acceptance criteria",
        body: "What 'done' means is agreed before the build, so completion is a check rather than an opinion.",
      },
      {
        title: "Incremental commitment",
        body: "A first shippable slice and an explicit decision point, rather than one long run at a large scope.",
      },
      {
        title: "Ownership on day one",
        body: "Code in your repository from the first commit, credentials in your accounts, and a 30-day defect warranty.",
      },
    ],
  },

  faqs: [
    {
      question: "How do we know whether to build custom AI software or buy a product?",
      answer:
        "Look at where the business logic lives. If a product models your process and the gap is cosmetic, buy it. If the rules that make your process work cannot be expressed in anyone's configuration screen, and the workaround has become load-bearing, that is the case for building. We treat that question as part of discovery rather than as a foregone conclusion.",
    },
    {
      question: "How long does a custom AI software project take?",
      answer:
        "Most of our projects ship in two to six weeks. Simple systems can be live in days, and builds that span several enterprise platforms may take two to three months. We scope the timeline after discovery and design the first slice to be useful on its own, so you can judge progress against something running.",
    },
    {
      question: "What does it cost?",
      answer:
        "Cost tracks complexity and integration surface, so we price after discovery. The bands we publish for automation work apply: focused builds start around $2,000, and comprehensive systems range from $10,000 to $50,000. You receive a written cost-benefit analysis before any work begins.",
    },
    {
      question: "Can you build AI agents that take actions in our systems?",
      answer:
        "Yes, within limits that are defined before anything is built: what the agent may do, what requires confirmation, what is logged, and what is reversible. An agent with unbounded write access to production systems is a liability, so the boundary is designed first and enforced in code.",
    },
    {
      question: "Will it integrate with the software we already run?",
      answer:
        "If a system exposes an API or a webhook surface, it is a candidate. We already build against platforms including HubSpot, Slack, Stripe, Airtable, Notion, PostgreSQL, and Supabase, and we deploy on AWS and Vercel. Anything outside that set is a compatibility assessment during discovery rather than a promise made in advance.",
    },
    {
      question: "Who owns the code and the data?",
      answer:
        "You do. Source code lands in your repository under your licence, all credentials and integrations are transferred to your accounts, and you receive a written runbook and a walkthrough so your team can extend the system. A 30-day defect warranty covers the handover period.",
    },
    {
      question: "What happens when the business rules change?",
      answer:
        "That is the expected case, which is why the rules are written as versioned, tested code rather than buried in a workflow builder. Changes are a normal development task, and because you hold the source, they do not have to be made by us.",
    },
  ],

  articles: {
    heading: "Reading that sits behind this work.",
    intro:
      "Case notes on systems where the leverage came from custom logic, live data, or an agent doing the legwork — rather than from another subscription.",
    items: [
      {
        slug: "spot-load-carrier-sourcing-agentic-ai",
        title: "Spot Load Carrier Sourcing: Before and After Agentic AI",
        blurb:
          "An agent working a sourcing loop end to end, and the boundary decisions — what it may do alone, what it escalates — that make that safe to run.",
      },
      {
        slug: "ai-pricing-engines-freight-broker-quote-desks",
        title: "How AI Pricing Engines Change Freight Broker Quote Desks",
        blurb:
          "Business logic as software: what changes when pricing rules stop living in a person's judgement and become a system that can be versioned and measured.",
      },
      {
        slug: "freight-bill-audit-sampled-vs-ai-line-item-review",
        title: "Freight Bill Audit: Sampled vs AI Line-Item Review",
        blurb:
          "The argument for custom data processing over sampling, in a workflow where the value is precisely the volume a person cannot review.",
      },
      {
        slug: "multi-channel-inventory-drift-dtc",
        title: "Multi-Channel Inventory Drift on a $10M DTC Brand",
        blurb:
          "What happens when several systems each hold a partial truth, and why reconciliation is an integration problem rather than a reporting one.",
      },
      {
        slug: "hidden-cost-manual-submittal-tracking-gcs",
        title: "The Hidden Cost of Manual Submittal Tracking on a GC's Desk",
        blurb:
          "A textbook internal-tools case: a critical process running on a spreadsheet, an inbox, and one person's memory.",
      },
    ],
  },

  cta: {
    heading: "Bring the spreadsheet nobody is allowed to break.",
    body:
      "That file is usually the clearest specification a business has. Book a free consultation and we will work out together whether it points at custom software, a product you should configure, or a smaller change than either.",
  },
};
