import type { IndustryPageContent } from "./types";

export const manufacturing: IndustryPageContent = {
  path: "/industries/manufacturing",
  name: "Manufacturing",
  icon: "Factory",
  eyebrow: "Industry",

  headline: {
    lead: "AI automation for manufacturers",
    emphasis: "and the exceptions nobody caught in time.",
  },

  meta: {
    title: "AI Automation for Manufacturing Operations",
    description:
      "AI automation for manufacturers: supply chain exception detection, quality documentation, production scheduling support, supplier communication and inventory reconciliation — built on the systems your plant already runs.",
    ogTitle: "AI Automation for Manufacturing Operations",
    ogDescription:
      "Unplanned downtime costs the world's largest firms 11% of revenue. Where manufacturing exceptions go unnoticed, and what automation changes.",
  },

  schema: {
    name: "AI automation for manufacturing operations",
    description:
      "Custom AI automation for manufacturers, covering supply chain exception detection, quality control documentation, production scheduling support, supplier communication and inventory reconciliation.",
    serviceType: [
      "Manufacturing workflow automation",
      "Supply chain exception detection",
      "Quality documentation automation",
    ],
    audience: "Manufacturers and industrial operations teams",
  },

  answer:
    "AI automation for manufacturers watches the operational signals a plant already produces — supplier confirmations, quality records, inventory movements, schedule changes — and surfaces the exceptions early, so problems are handled while they are still cheap rather than after they have stopped a line.",

  stat: {
    value: "11%",
    label:
      "of revenue is lost to unplanned downtime at the world's 500 largest firms — around $1.4T a year, up from 8% in 2019, with two-thirds of plants affected monthly",
    source: "Siemens / Senseye, The True Cost of Downtime",
    sourceUrl: "https://assets.new.siemens.com/siemens/assets/api/uuid:3d606495-dbe0-43e4-80b1-d04e27ada920/dics-b10153-00-7600truecostofdowntime2022-144.pdf",
    asOf: "2024",
  },

  cardStat: "Unplanned downtime costs 11% of revenue (Siemens)",

  problems: {
    heading: "Exceptions found late are the expensive ones.",
    intro:
      "Most manufacturing loss is not a failure nobody could predict. It is a signal that existed but was not read in time by anyone with the authority to act.",
    items: [
      {
        title: "Supplier signals arrive faster than anyone reads them",
        body: "Confirmations, ASNs, delay notices and short-ship alerts arrive continuously by email and portal. A missed supplier confirmation becomes a line stoppage days later, when the options are expedite freight or idle time.",
      },
      {
        title: "Quality documentation is assembled after the fact",
        body: "Certificates, inspection records and non-conformance reports are collected when a customer or auditor asks. Reconstructing a record weeks later costs far more than capturing it as it happened, and gaps are found at the worst moment.",
      },
      {
        title: "Inventory truth diverges from the system of record",
        body: "Physical stock, ERP quantities and supplier commitments drift apart between counts. Planning against a number that is wrong produces either idle inventory or a shortage nobody saw coming.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Detection and reconciliation carry most of the value here; supplier communication and embedded delivery carry the rest.",
    items: [
      {
        service: "custom",
        heading: "Custom systems for exception detection and reconciliation",
        body: "Reading supplier correspondence, ERP state and quality records together is a matching problem. This is the layer that watches all three continuously and raises the exception while it is still cheap to handle.",
        outcomes: [
          "Supply chain exception detection from supplier correspondence",
          "Quality record and certificate capture at the point of production",
          "Inventory reconciliation between physical, ERP and supplier commitments",
          "Production schedule impact analysis when an input slips",
        ],
      },
      {
        service: "chatbot",
        heading: "Conversational AI for supplier communication",
        body: "Confirmation chasing and delivery follow-up are repetitive supplier conversations. An agent runs them on schedule and escalates only where a commitment has actually moved.",
        outcomes: [
          "Purchase order confirmation chasing",
          "Delivery date follow-up and change capture",
          "Supplier document and certificate collection",
          "Escalation to procurement on a missed commitment",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for plant systems",
        body: "Plant systems are heterogeneous and rarely documented end to end. An engineer working on site builds against the actual integration surface rather than the one on the architecture diagram.",
        outcomes: [
          "Integration across ERP, MES and supplier portals",
          "Tooling built against one line, then extended",
          "Human checkpoints on anything touching production",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate in a plant operation.",
    intro: "Information and coordination work, not machine control.",
    items: [
      "Supply chain exception detection and escalation",
      "Purchase order confirmation and delivery follow-up",
      "Quality control documentation and certificate capture",
      "Inventory reconciliation across systems",
      "Production scheduling impact analysis",
      "Supplier onboarding and compliance documentation",
    ],
  },

  comparison: {
    heading: "Operations, before and after.",
    intro: "The signal existed either way. The difference is when someone acts on it.",
    columns: ["Workflow", "Manual process", "With automation"],
    rows: [
      ["Supplier delay", "Noticed when the material does not arrive", "Detected on the notice; schedule impact raised same day"],
      ["PO confirmation", "Chased when someone remembers", "Chased on schedule, unconfirmed orders escalated"],
      ["Quality records", "Assembled when an auditor asks", "Captured at production, complete by default"],
      ["Inventory", "Trusted until the next count", "Reconciled continuously across ERP, physical and supplier data"],
      ["Schedule changes", "Reworked manually when an input slips", "Impact modelled as soon as the input moves"],
    ],
  },

  faqs: [
    {
      question: "Does this control machinery or production equipment?",
      answer:
        "No. These systems work on information — supplier correspondence, ERP records, quality documentation, scheduling data. Machine and process control stays with the control systems and the engineers who own them.",
    },
    {
      question: "How does automation reduce downtime?",
      answer:
        "Mostly by shortening the gap between a signal and a response. A large share of disruption traces to inputs that slipped and were noticed late. Detecting a missed supplier confirmation on the day it happens, rather than at the point of consumption, converts a stoppage into a rescheduling decision.",
    },
    {
      question: "Will it integrate with our ERP and MES?",
      answer:
        "Yes, through their APIs or interfaces. These builds sit on top of the systems already running the plant. Replacing an ERP or MES is not part of the engagement.",
    },
    {
      question: "Where do most manufacturers start?",
      answer:
        "Usually supplier exception detection, because the input data already exists in email and portals and the cost of a late catch is easy to quantify against expedite freight or idle line time.",
    },
  ],

  cta: {
    heading: "Start with the exception that costs most when it is late.",
    body: "We scope one operational workflow, agree written acceptance criteria, and ship it in two to six weeks.",
    service: "custom",
  },
};
