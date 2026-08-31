import type { IndustryPageContent } from "./types";

export const construction: IndustryPageContent = {
  path: "/industries/construction",
  name: "Construction & GC",
  icon: "HardHat",
  eyebrow: "Industry",
  vertical: "construction",

  headline: {
    lead: "AI automation for general contractors",
    emphasis: "and the paperwork that runs the job.",
  },

  meta: {
    title: "AI Automation for Construction & General Contractors",
    description:
      "AI automation for general contractors: submittal and RFI tracking, pay applications, lien waivers and COI collection, change-order documentation, closeout and as-built reconciliation — built on the systems your jobs already run.",
    ogTitle: "AI Automation for Construction & General Contractors",
    ogDescription:
      "Rework runs about 5% of project cost, and most of it traces to missing or late information. What automation changes on a GC's desk.",
  },

  schema: {
    name: "AI automation for construction and general contracting",
    description:
      "Custom AI automation for general contractors and construction firms, covering submittals and RFIs, pay applications, compliance document collection, change orders, job costing and project closeout.",
    serviceType: [
      "Construction workflow automation",
      "General contractor document automation",
      "AI agents for project controls",
    ],
    audience: "General contractors and construction firms",
  },

  answer:
    "AI automation for general contractors handles the document and coordination work that decides whether a job stays profitable — submittals, RFIs, pay applications, lien waivers, change orders and closeout — by reading the same drawings, contracts and emails a project engineer does and keeping the record current without a person retyping it.",

  stat: {
    value: "~5%",
    label:
      "of total project cost goes to field rework on average, ranging 2–20% — and over $31B of US rework traces to poor communication and missing project information",
    source: "Construction Industry Institute; FMI/PlanGrid survey of ~600 professionals",
    sourceUrl: "https://www.construction-institute.org/",
    asOf: "2018–2024",
  },

  cardStat: "Rework runs about 5% of project cost (CII)",

  problems: {
    heading: "The job is won on price and lost on paperwork.",
    intro:
      "Margin on a GC job is rarely lost in the estimate. It is lost in the weeks where a decision waited on a document, and in the closeout nobody priced.",
    items: [
      {
        title: "Submittals and RFIs stall on a desk, not on a decision",
        body: "A submittal log is a queue of items waiting for someone to notice, route and chase. The delay is administrative, but the consequence is schedule — and when the information arrives late or wrong, it becomes the rework that CII measures at roughly 5% of project cost.",
      },
      {
        title: "Compliance documents expire quietly",
        body: "COIs, lien waivers, certified payroll and subcontractor prequal are collected once and assumed. An insurance lapse on an active job is not discovered by a system; it is discovered by an incident, or by a bid list you no longer appear on.",
      },
      {
        title: "Verbal directives never become change orders",
        body: "An owner asks for something in a walk. The work gets done. Whether it gets papered — priced, signed, billed — depends on whether a busy PM wrote it down that day. Absorbed directives are margin given away without a decision.",
      },
      {
        title: "Closeout is scoped as an afterthought and paid for as one",
        body: "Punch lists, as-built reconciliation, warranty documentation and O&M manuals arrive at the end, when the team has moved on. The drag is real, it delays retainage release, and it was almost never priced into the job.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Most GC problems are document reconciliation. A few are coordination, and a few need someone building alongside the project team.",
    items: [
      {
        service: "custom",
        heading: "Custom systems for project documents and controls",
        body: "Submittals, pay applications, change orders and closeout are all matching problems across drawings, contracts, email and the project management system. This is the retrieval and extraction layer that keeps the record current — built on your stack, source delivered to you.",
        outcomes: [
          "Submittal and RFI logs maintained from correspondence automatically",
          "Pay application assembly and backup document matching",
          "COI, lien waiver and certified payroll monitoring with expiry alerts",
          "As-built and closeout package reconciliation through the job, not after",
        ],
      },
      {
        service: "chatbot",
        heading: "Conversational AI for field and subcontractor comms",
        body: "Collecting documents and daily information from subs is a chase, repeated weekly. An agent that requests, receives, validates and files removes the chase without removing the relationship.",
        outcomes: [
          "Subcontractor document collection by conversation",
          "Daily report capture from the field without a form",
          "Automated follow-up on outstanding submittals and waivers",
          "Escalation to the PM when a response is genuinely needed",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for project controls",
        body: "Job costing and controls differ by contractor more than any vendor admits. An engineer working inside your team builds against your cost codes and your actual process rather than a generic model of one.",
        outcomes: [
          "Cost coding and T&M ticket capture built to your structure",
          "Preconstruction and bid-leveling tooling against real bid sets",
          "Integration with the PM system you already run",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate on a GC's desk.",
    intro: "Each of these is a log, a binder or a chase today.",
    items: [
      "Submittal and RFI tracking and follow-up",
      "Pay application assembly and backup matching",
      "COI, lien waiver and certified payroll collection",
      "Change order and verbal directive documentation",
      "Daily reports, T&M tickets and field cost capture",
      "Punch list, as-built and closeout package reconciliation",
    ],
  },

  comparison: {
    heading: "The project desk, before and after.",
    intro: "The difference is whether the record is maintained or reconstructed.",
    columns: ["Workflow", "Manual process", "With automation"],
    rows: [
      ["Submittals", "PE maintains a log by hand, chases by email", "Log maintained from correspondence; only stalled items escalate"],
      ["COIs and waivers", "Collected at onboarding, expiry noticed late", "Monitored continuously, flagged before lapse on an active job"],
      ["Change orders", "Papered if the PM had time that day", "Directive captured when it occurs and routed for pricing"],
      ["Pay applications", "Backup assembled manually each cycle", "Backup matched to the schedule of values as it accrues"],
      ["Closeout", "As-builts reconciled at the end, from memory", "Reconciled continuously through the job; retainage releases sooner"],
    ],
  },

  faqs: [
    {
      question: "What does AI automation do for a general contractor?",
      answer:
        "It keeps the project record current without a person retyping it — submittal and RFI logs, compliance documents, change-order backup, pay application support and closeout packages — by reading the correspondence, drawings and contracts the job already produces.",
    },
    {
      question: "Does this replace Procore or our project management system?",
      answer:
        "No. These builds sit on top of the PM system you already run and write back into it. The gap being filled is between what the system can store and what someone currently has to read, route and enter by hand.",
    },
    {
      question: "How does automation reduce rework?",
      answer:
        "Indirectly but measurably. Research from CII and FMI attributes a large share of rework to poor communication and missing or late information. Most of that delay is administrative — an item waiting to be routed or a document not yet collected — which is exactly the work these systems remove.",
    },
    {
      question: "Is this worth it for a mid-size contractor?",
      answer:
        "Usually more so than for a large one, because mid-size GCs carry the same document burden with far fewer administrative staff. First builds are typically submittal tracking or compliance monitoring, both of which have a directly measurable cost in PM hours.",
    },
    {
      question: "How long does a construction automation take to build?",
      answer:
        "Most single-workflow builds ship in two to six weeks with acceptance criteria agreed in writing first. Work is scoped against one job's actual documents so the system is tested on real submittals and real contracts rather than samples.",
    },
  ],

  cta: {
    heading: "Start with the log that is eating PM hours.",
    body: "We scope one project workflow against a live job, agree what success looks like, and ship it in two to six weeks.",
    service: "custom",
  },
};
