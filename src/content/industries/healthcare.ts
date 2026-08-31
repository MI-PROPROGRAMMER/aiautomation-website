import type { IndustryPageContent } from "./types";

export const healthcare: IndustryPageContent = {
  path: "/industries/healthcare",
  name: "Healthcare",
  icon: "Heart",
  eyebrow: "Industry",

  headline: {
    lead: "AI automation for healthcare operations",
    emphasis: "and the admin that crowds out care.",
  },

  meta: {
    title: "AI Automation for Healthcare Operations",
    description:
      "AI automation for healthcare providers: patient scheduling, insurance verification, prior authorization, records handling and compliance reporting — built to reduce administrative load without touching clinical judgment.",
    ogTitle: "AI Automation for Healthcare Operations",
    ogDescription:
      "A manual prior authorization costs a provider $10.97 against $5.79 fully electronic. Where healthcare admin load actually sits, and what automation changes.",
  },

  schema: {
    name: "AI automation for healthcare operations",
    description:
      "Custom AI automation for healthcare providers and multi-site practices, covering patient scheduling, insurance verification, prior authorization workflows, medical records handling and compliance reporting.",
    serviceType: [
      "Healthcare administrative automation",
      "Patient scheduling automation",
      "Revenue cycle workflow automation",
    ],
    audience: "Healthcare providers, clinics and multi-site practices",
  },

  answer:
    "AI automation for healthcare operations targets administrative work rather than clinical decisions — scheduling, insurance verification, prior authorization follow-up, records requests and compliance reporting — so front-desk and billing staff spend less of the day on transactions that a system can complete end to end.",

  stat: {
    value: "$10.97",
    label:
      "is what a manual prior authorization costs a provider, against $5.79 fully electronic — and fully automated workflows save an average of 70 minutes per patient visit",
    source: "CAQH Index 2025, covering 600+ organisations and 63% of insured lives",
    sourceUrl: "https://www.caqh.org/blog/2025-caqh-index-shows-u.s.-healthcare-avoided-258-billion-and-accelerated-automation-interoperability-and-ai-adoption",
    asOf: "2025",
  },

  cardStat: "Manual prior auth costs $10.97 vs $5.79 electronic (CAQH, 2025)",

  problems: {
    heading: "Where the administrative hours go.",
    intro:
      "Healthcare administration is not complex work. It is high-volume, rule-bound transaction work, and the CAQH Index shows most of it is still not fully electronic.",
    items: [
      {
        title: "Prior authorization remains stubbornly manual",
        body: "Only a minority of medical prior authorizations run fully electronically. The rest move by phone, fax and portal, at roughly twice the per-transaction cost and with staff time measured in tens of minutes per authorization.",
      },
      {
        title: "Scheduling absorbs the front desk",
        body: "Booking, rescheduling, reminders and cancellation backfill are predictable conversations that arrive by phone at the least convenient moment. The capacity cost is not the call itself but the patients who could not get through while it happened.",
      },
      {
        title: "Verification and records requests block the visit",
        body: "Eligibility checks and records retrieval sit on the critical path to seeing a patient. When they run slowly, the delay is absorbed either by the schedule or by the staff working past the end of the day.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Patient-facing conversations, back-office reconciliation, and the builds that need someone embedded in your operation.",
    items: [
      {
        service: "chatbot",
        heading: "Conversational AI for patient scheduling and intake",
        body: "Booking, rescheduling, reminders and intake are structured conversations. An agent that holds them across phone and message frees the front desk for the patients standing in front of it.",
        outcomes: [
          "Booking, rescheduling and cancellation backfill without a call queue",
          "Automated reminders and no-show follow-up",
          "Intake and pre-visit information collection",
          "Clean handoff to staff for anything clinical or unclear",
        ],
      },
      {
        service: "custom",
        heading: "Custom systems for verification, authorization and records",
        body: "Eligibility, prior authorization and records handling are matching problems across payer portals, the practice system and documents. This is the integration layer that runs them and escalates only exceptions.",
        outcomes: [
          "Insurance eligibility verification ahead of the visit",
          "Prior authorization submission and status follow-up",
          "Medical records request handling and routing",
          "Compliance and quality reporting assembled from source data",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for multi-site rollout",
        body: "Multi-site operations differ site to site in ways a fixed scope will not survive. An engineer inside your team builds against the real variation and handles the rollout.",
        outcomes: [
          "Workflow built against one site, then generalised across sites",
          "Integration with the practice management system in place",
          "Access controls, audit logging and human checkpoints throughout",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate in a practice.",
    intro: "Administrative workflows only — nothing here touches clinical decision-making.",
    items: [
      "Patient appointment scheduling and reminders",
      "Insurance eligibility verification",
      "Prior authorization submission and follow-up",
      "Medical records requests and routing",
      "Compliance and quality reporting",
      "Patient billing enquiries and payment follow-up",
    ],
  },

  comparison: {
    heading: "The front and back office, before and after.",
    intro: "The transaction is the same. What changes is who executes it.",
    columns: ["Workflow", "Manual process", "With automation"],
    rows: [
      ["Scheduling", "Phone queue, staff book and rebook manually", "Booked and rebooked by agent; staff handle exceptions"],
      ["Eligibility", "Checked per patient, often on the day", "Verified ahead of the visit in batch, flagged if failing"],
      ["Prior authorization", "Phone, fax or portal, tens of minutes each", "Submitted and chased automatically; staff work only rejections"],
      ["Records requests", "Manually located, packaged and sent", "Located and routed automatically with an audit trail"],
      ["Reporting", "Assembled from exports at period end", "Assembled continuously from source systems"],
    ],
  },

  faqs: [
    {
      question: "Does AI automation touch clinical decisions?",
      answer:
        "No. Everything described here is administrative — scheduling, verification, authorization follow-up, records handling and reporting. Clinical judgment stays entirely with clinicians, and any workflow that touches a clinical decision keeps a human checkpoint.",
    },
    {
      question: "How does this affect HIPAA compliance?",
      answer:
        "It has to be designed for it. That means access controls, audit logging, minimum necessary data handling, and a business associate agreement where one applies. Compliance requirements are part of the written acceptance criteria before any build starts, not a review afterwards.",
    },
    {
      question: "What is the clearest place to start?",
      answer:
        "Usually prior authorization or eligibility verification, because both have a documented per-transaction cost. The CAQH Index puts manual prior authorization at $10.97 against $5.79 fully electronic, which makes the payback arithmetic rather than argument.",
    },
    {
      question: "Will this work with our practice management system?",
      answer:
        "These builds sit on top of the practice management and EHR systems already in place, connecting through their APIs or interfaces. Replacing clinical systems is not part of the engagement.",
    },
  ],

  cta: {
    heading: "Start with the transaction you run most.",
    body: "We scope one administrative workflow, agree written acceptance criteria including compliance requirements, and ship it in two to six weeks.",
    service: "custom",
  },
};
