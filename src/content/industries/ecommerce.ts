import type { IndustryPageContent } from "./types";

export const ecommerce: IndustryPageContent = {
  path: "/industries/ecommerce",
  name: "E-commerce & DTC",
  icon: "ShoppingCart",
  eyebrow: "Industry",
  vertical: "ecommerce",

  headline: {
    lead: "AI automation for DTC brands",
    emphasis: "and the order ops behind them.",
  },

  meta: {
    title: "AI Automation for E-commerce & DTC Brands",
    description:
      "AI automation for DTC and e-commerce operations: WISMO deflection, returns and refund workflows, order exception handling, chargeback evidence, and inventory reconciliation across every channel you sell on.",
    ogTitle: "AI Automation for E-commerce & DTC Brands",
    ogDescription:
      "Returns run 19.3% of online sales. Where DTC margin leaks after the sale — and what automation changes about it.",
  },

  schema: {
    name: "AI automation for e-commerce and DTC operations",
    description:
      "Custom AI automation for direct-to-consumer and e-commerce brands, covering order exception handling, returns and refunds, customer support deflection, chargeback evidence and multi-channel inventory reconciliation.",
    serviceType: [
      "E-commerce automation",
      "DTC order operations automation",
      "Customer support AI",
    ],
    audience: "DTC brands, e-commerce retailers and their 3PL partners",
  },

  answer:
    "AI automation for DTC brands handles the work that happens after checkout — order exceptions, WISMO tickets, returns and refunds, chargeback evidence, inventory drift across channels — with systems that read your order data directly, so margin earned at the sale is not given back in support and reverse logistics.",

  stat: {
    value: "19.3%",
    label:
      "of online sales are returned, inside $849.9B of total US retail returns — and 9% of those returns are fraudulent",
    source: "National Retail Federation, 2025 Retail Returns Landscape",
    sourceUrl: "https://nrf.com/research/2025-retail-returns-landscape",
    asOf: "2025",
  },

  cardStat: "19.3% of online sales are returned (NRF, 2025)",

  problems: {
    heading: "The margin you lose after the sale.",
    intro:
      "DTC economics are decided after checkout. Acquisition is measured obsessively; the operational cost of servicing the order usually is not.",
    items: [
      {
        title: "Returns cost more than the refund",
        body: "The refund is the visible number. The landed cost includes return shipping, inspection, disposition, restocking and the inventory held while a unit sits undecided. With returns at nearly a fifth of online sales, disposition delay is a working-capital problem, not a customer-service one.",
      },
      {
        title: "WISMO absorbs the support queue",
        body: "\"Where is my order\" is the highest-volume ticket in DTC and almost never requires judgment — the answer is already in the carrier scan and the order record. It occupies support capacity that should be handling the tickets that actually need a person.",
      },
      {
        title: "Order exceptions surface too late to fix cheaply",
        body: "Address errors, split shipments, backorders and card-on-file declines are all cheapest to fix before dispatch. Caught after, each becomes a reship, a refund, or a churned subscriber — and the cost multiplies at every step.",
      },
      {
        title: "Inventory drifts across every channel you added",
        body: "Site, marketplaces, wholesale and retail each hold a version of the truth. Drift shows up as oversells, suppressions and cancellations, and the reconciliation is usually a person in a spreadsheet at the end of the week.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Post-purchase problems split cleanly: some are conversations with the customer, some are reconciliation across systems, some are an operating change.",
    items: [
      {
        service: "chatbot",
        heading: "Conversational AI wired into order data",
        body: "A support agent that can actually see the order, the carrier scan and the returns policy answers WISMO, return and exchange questions outright instead of deflecting into a queue — and hands off cleanly when it should.",
        outcomes: [
          "WISMO answered from live order and tracking data",
          "Return and exchange flows that steer toward exchange over refund",
          "Proactive delivery-exception and restock messaging",
          "Human handoff with full context, not a fresh ticket",
        ],
      },
      {
        service: "custom",
        heading: "Custom systems for order ops and reconciliation",
        body: "Exception handling, chargeback evidence and inventory truth are matching problems across your OMS, 3PL, carriers and channels. This is the integration and agent layer that reconciles them, built on your data and delivered as source you own.",
        outcomes: [
          "Pre-dispatch address, payment and stock exception detection",
          "Return disposition and restock decisions triggered on receipt",
          "Chargeback and claims evidence assembled automatically",
          "Multi-channel inventory reconciliation and oversell prevention",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for peak and launch",
        body: "Launches, pre-orders and peak season change the operating model faster than a fixed scope can follow. An engineer embedded in the ops team builds against what is actually breaking that week.",
        outcomes: [
          "Pre-order and launch backlog tooling built against live demand",
          "Peak-season exception handling stood up before the season",
          "Instrumentation so the next peak starts from data",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate in DTC operations.",
    intro: "Each of these is a queue or a spreadsheet on most brands today.",
    items: [
      "WISMO and delivery-exception support",
      "Returns, refunds, exchanges and disposition",
      "Order exception detection before dispatch",
      "Chargeback and delivered-not-received evidence",
      "Multi-channel inventory and catalog reconciliation",
      "3PL and parcel invoice audit",
    ],
  },

  comparison: {
    heading: "Post-purchase ops, before and after.",
    intro: "The change is where the work happens: after the problem, or before it.",
    columns: ["Workflow", "Manual operation", "With automation"],
    rows: [
      ["WISMO", "Agent looks up order, reads tracking, replies", "Answered from live order data; agent sees only real exceptions"],
      ["Returns", "Refund issued, unit sits pending disposition", "Disposition decided on receipt; restock or liquidation triggered"],
      ["Address errors", "Caught by the carrier after dispatch, reshipped", "Validated and corrected before the label prints"],
      ["Chargebacks", "Evidence assembled by hand, often after the deadline", "Evidence packet built on dispute, filed inside the window"],
      ["Inventory", "Reconciled weekly in a spreadsheet", "Reconciled continuously; oversells blocked at source"],
    ],
  },

  faqs: [
    {
      question: "What does AI automation do for a DTC brand?",
      answer:
        "It runs the post-purchase operation — support, returns, exceptions, reconciliation — as systems rather than queues. The work removed is lookup and data assembly; merchandising, brand and genuine customer judgment stay with your team.",
    },
    {
      question: "Is an AI chatbot going to frustrate our customers?",
      answer:
        "It does if it cannot see anything. A bot wired only to a help-centre article deflects; one wired to the live order, carrier scan and returns policy resolves. The build that matters is the data access, not the conversation layer, and every flow keeps a clean path to a human.",
    },
    {
      question: "Can this reduce our return rate, or only the cost of returns?",
      answer:
        "Both, but by different means. Cost falls through faster disposition, restocking and fraud detection. Rate falls through better pre-purchase information and steering returns toward exchange or store credit, which also retains the revenue.",
    },
    {
      question: "Does it work with Shopify and our 3PL?",
      answer:
        "Yes. These builds sit on top of the OMS, 3PL, carrier and marketplace systems you already run, connecting through their APIs. Replatforming is not part of the engagement.",
    },
    {
      question: "How quickly does a DTC automation pay back?",
      answer:
        "Most single-workflow builds ship in two to six weeks. WISMO deflection and return disposition are common first builds because both have high volume and a directly measurable cost per ticket or per unit, so payback is arithmetic rather than argument.",
    },
  ],

  cta: {
    heading: "Start where the volume is.",
    body: "We scope one post-purchase workflow, agree written acceptance criteria, and ship it into your stack in two to six weeks.",
    service: "chatbot",
  },
};
