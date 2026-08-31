import type { IndustryPageContent } from "./types";

export const logistics: IndustryPageContent = {
  path: "/industries/logistics",
  name: "Logistics & freight",
  icon: "Truck",
  eyebrow: "Industry",
  vertical: "logistics",

  headline: {
    lead: "AI automation for freight brokers",
    emphasis: "and the desks that carry the paperwork.",
  },

  meta: {
    title: "AI Automation for Freight Brokers & Logistics",
    description:
      "AI automation for freight brokerages and 3PLs: check calls, detention and accessorial capture, carrier vetting, document reconciliation, and invoice audit — built into the systems you already run.",
    ogTitle: "AI Automation for Freight Brokers & Logistics",
    ogDescription:
      "Where broker margin actually leaks — detention billed below cost, accessorials never captured, documents reconciled by hand — and what automation changes.",
  },

  schema: {
    name: "AI automation for logistics and freight brokerage",
    description:
      "Custom AI automation and agentic systems for freight brokerages, 3PLs and carriers, covering check calls, detention and accessorial billing, carrier vetting, claims documentation and freight bill audit.",
    serviceType: [
      "Freight brokerage automation",
      "Logistics workflow automation",
      "AI agents for transportation",
    ],
    audience: "Freight brokerages, 3PLs and carriers",
  },

  answer:
    "AI automation for freight brokers replaces the manual desk work that sits between a load and its invoice — check calls, document chasing, detention and accessorial capture, carrier vetting — with systems that read the same sources a coordinator does and act on them, so margin stops leaking on paperwork nobody had time to finish.",

  stat: {
    value: "$15.1B",
    label:
      "lost to driver detention each year — and brokers bill it at $63.71/hr against a $66.65/hr operating cost, below what it costs to sit",
    source: "American Transportation Research Institute (ATRI)",
    sourceUrl: "https://truckingresearch.org/2024/09/new-research-documents-substantial-financial-and-safety-impacts-from-truck-driver-detention/",
    asOf: "2024",
  },

  cardStat: "Detention costs the industry $15.1B a year (ATRI, 2024)",

  problems: {
    heading: "Where the margin actually goes.",
    intro:
      "Brokerage margin rarely disappears in the rate. It disappears in the hours between covering a load and collecting on it, across systems that were never designed to talk.",
    items: [
      {
        title: "Accessorials that are earned but never billed",
        body: "Detention, layover, reconsignment and TONU are earned in the field and captured — if at all — in a coordinator's memory or an email thread. What never reaches the invoice was still paid to the carrier. ATRI's finding that the industry bills detention below its own hourly operating cost describes a desk that is losing money on every delayed load it fails to document.",
      },
      {
        title: "Check calls that consume the coverage desk",
        body: "Tracking a load means calling a driver, updating a TMS, and notifying a shipper — three systems, one human, repeated for every load on the board. The work is entirely predictable, which is exactly why it should not be occupying the people who could be covering freight.",
      },
      {
        title: "Documents that arrive in every format except the one you need",
        body: "Rate confirmations, BOLs, PODs, reefer downloads and lumper receipts arrive as PDFs, photos, portal downloads and faxes. Reconciling them into a billable file is manual reading, and the delay lands directly in DSO.",
      },
      {
        title: "Carrier vetting that is rechecked far less often than it changes",
        body: "Insurance lapses, revoked authority and stale W9s do not announce themselves. A carrier vetted at onboarding and never rechecked is a capacity number that may not be real — and, in the double-brokering case, a fraud exposure.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Which one fits depends on whether the problem is a conversation, a data-reconciliation job, or an operating change your team needs help landing.",
    items: [
      {
        service: "chatbot",
        heading: "Conversational AI for check calls and carrier comms",
        body: "The status conversation is the highest-volume, lowest-judgment work on the desk. An agent that calls or messages the driver, parses the reply, updates the TMS and notifies the shipper removes it without removing the human from exceptions.",
        outcomes: [
          "Automated check calls with TMS write-back",
          "Shipper status notifications without a coordinator in the loop",
          "Carrier onboarding and document collection by conversation",
          "Escalation to a human the moment a load goes off-plan",
        ],
      },
      {
        service: "custom",
        heading: "Custom systems for documents, billing and audit",
        body: "Most brokerage leakage is a reconciliation problem: the evidence exists, but across four systems in four formats. This is retrieval, extraction and matching against the rate con and the contract — built into your stack, with the source code delivered to you.",
        outcomes: [
          "Detention and accessorial capture from telematics and gate events",
          "BOL, POD and lumper receipt extraction into billable files",
          "Line-item freight bill audit against the rate confirmation",
          "Continuous carrier authority, insurance and W9 monitoring",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for the agentic build",
        body: "Carrier sourcing and spot coverage are decision loops, not single tasks — they need iteration against live freight, not a fixed spec. An engineer inside your team scopes and ships against what the desk actually does.",
        outcomes: [
          "Agentic carrier sourcing across load boards and your own network",
          "Coverage-desk tooling built against live lanes",
          "Guardrails, logging and human checkpoints on every automated action",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate on a brokerage desk.",
    intro: "Each of these exists on most desks today as a person and a spreadsheet.",
    items: [
      "Check calls, tracking updates and shipper notifications",
      "Detention, layover and accessorial capture and billing",
      "Rate confirmation, BOL and POD extraction and matching",
      "Carrier vetting, authority and insurance monitoring",
      "Freight bill audit and invoice reconciliation",
      "Claims documentation assembly for cargo and cold chain",
    ],
  },

  comparison: {
    heading: "The desk, before and after.",
    intro:
      "The comparison that matters is not headcount. It is which work a coordinator spends the day on.",
    columns: ["Workflow", "Manual desk", "With automation"],
    rows: [
      ["Load status", "Coordinator calls driver, updates TMS, emails shipper", "Agent collects status, writes to TMS, notifies shipper; human handles exceptions"],
      ["Detention", "Captured from memory or an email, often missed entirely", "Gate and telematics events timestamped and attached to the invoice automatically"],
      ["Carrier vetting", "Checked at onboarding, rechecked rarely", "Authority, insurance and W9 monitored continuously, flagged on change"],
      ["Freight bill audit", "Sampled — a fraction of invoices reviewed", "Every invoice read line by line against the rate confirmation"],
      ["Claim file", "Evidence assembled by hand across three systems over weeks", "Documents gathered and matched as they arrive; clerk negotiates rather than collates"],
    ],
  },

  faqs: [
    {
      question: "What does AI automation actually do for a freight brokerage?",
      answer:
        "It takes the predictable, repeatable work between covering a load and collecting on it — check calls, document extraction, accessorial capture, carrier monitoring, invoice audit — and runs it as a system rather than a person. The judgment work, negotiation and exception handling stay with your team.",
    },
    {
      question: "Will this replace my coverage or claims staff?",
      answer:
        "No. The work being removed is data assembly, not decision-making. On a claims desk, for example, the clerk stops spending days gathering reefer downloads and BOL exceptions and spends that time on recovery and negotiation instead — which is the part that actually returns money.",
    },
    {
      question: "Does it work with our existing TMS?",
      answer:
        "Yes. These systems are built around the TMS, load boards and portals you already run, connecting through APIs or, where a portal has none, through the same interface a human uses. Replacing your TMS is not part of the engagement.",
    },
    {
      question: "How long before a brokerage automation is live?",
      answer:
        "Most single-workflow builds ship in two to six weeks with written acceptance criteria agreed before any code is written. A first build is usually check calls or accessorial capture, because both are high-volume, easy to measure, and pay back quickly.",
    },
    {
      question: "How do you handle carrier fraud and double brokering?",
      answer:
        "By monitoring rather than sampling. Authority status, insurance validity, W9s and identity signals are rechecked continuously instead of once at onboarding, and changes are flagged before a load is tendered rather than after a claim is filed.",
    },
  ],

  cta: {
    heading: "Start with the workflow that is costing you most.",
    body: "We scope one brokerage workflow, agree what success looks like in writing, and ship it into your stack in two to six weeks.",
    service: "custom",
  },
};
