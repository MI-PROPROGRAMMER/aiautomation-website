import type { IndustryPageContent } from "./types";

export const finance: IndustryPageContent = {
  path: "/industries/finance",
  name: "Finance & accounting",
  icon: "DollarSign",
  eyebrow: "Industry",

  headline: {
    lead: "AI automation for finance teams",
    emphasis: "and the invoices stacked behind them.",
  },

  meta: {
    title: "AI Automation for Finance & Accounting Teams",
    description:
      "AI automation for finance operations: invoice processing and three-way matching, payment reconciliation, AR follow-up, financial reporting and compliance documentation — built into the ERP you already run.",
    ogTitle: "AI Automation for Finance & Accounting Teams",
    ogDescription:
      "The average invoice costs $9.40 to process; best-in-class teams pay $2.78. Where the gap comes from, and what closes it.",
  },

  schema: {
    name: "AI automation for finance and accounting operations",
    description:
      "Custom AI automation for finance teams, covering invoice processing, three-way matching, payment reconciliation, accounts receivable follow-up, financial reporting and compliance documentation.",
    serviceType: [
      "Accounts payable automation",
      "Financial reporting automation",
      "Reconciliation workflow automation",
    ],
    audience: "Finance and accounting teams",
  },

  answer:
    "AI automation for finance teams handles the transaction work that scales with volume rather than complexity — invoice capture and matching, payment reconciliation, receivables follow-up and reporting assembly — so accountants spend their time on exceptions, controls and analysis instead of data entry.",

  stat: {
    value: "$9.40",
    label:
      "is the average cost to process a single invoice, against $2.78 for best-in-class teams — 9.2 days versus 3.1, at a 22% exception rate versus 9%",
    source: "Ardent Partners, Accounts Payable Metrics That Matter 2025",
    sourceUrl: "https://www.medius.com/resources/guides-reports/ardent-partners-accounts-payable-metrics-that-matter/",
    asOf: "2025",
  },

  cardStat: "$9.40 average cost per invoice vs $2.78 best-in-class (Ardent Partners, 2025)",

  problems: {
    heading: "The gap between average and best-in-class.",
    intro:
      "Ardent Partners' benchmark shows a threefold difference in cost per invoice between average and top-performing AP teams. The gap is not talent. It is how much of the process runs without a person.",
    items: [
      {
        title: "Invoices arrive in every format except structured data",
        body: "PDFs, email bodies, scans and portal downloads all have to become line items before anything else can happen. That transcription step is where most of the $9.40 sits, and it is also where the exceptions are introduced.",
      },
      {
        title: "Exception rates compound downstream",
        body: "A 22% exception rate against a best-in-class 9% means more than twice the invoices requiring human intervention. Each one lengthens the cycle, risks a missed discount, and pushes the close later.",
      },
      {
        title: "Reconciliation and reporting are rebuilt every period",
        body: "Payment matching and reporting assembly are usually a sequence of exports and spreadsheets repeated on a cycle. The work is identical each time, which is precisely why it should not be manual.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Most finance automation is reconciliation. Some is chasing people, and some needs building against your own chart of accounts.",
    items: [
      {
        service: "custom",
        heading: "Custom systems for invoice processing and matching",
        body: "Extraction, three-way matching and reconciliation against your ERP are the core build. Documents become line items, line items are matched against the PO and receipt, and only genuine exceptions reach a person.",
        outcomes: [
          "Invoice extraction into structured line items",
          "Three-way matching against purchase orders and receipts",
          "Payment and bank reconciliation",
          "Reporting packs assembled from source systems",
        ],
      },
      {
        service: "chatbot",
        heading: "Conversational AI for AR and supplier queries",
        body: "Collections follow-up and supplier payment enquiries are repetitive conversations with a clear script. An agent runs them consistently and escalates the accounts that need a relationship.",
        outcomes: [
          "Receivables follow-up on an aging schedule",
          "Supplier payment status enquiries answered from the ledger",
          "Missing document and remittance chasing",
          "Escalation to the controller for disputes",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for controls and close",
        body: "Close processes and control requirements are specific to the business and rarely written down completely. An engineer inside the team builds against the real process rather than a documented approximation of it.",
        outcomes: [
          "Close checklist automation against your actual cycle",
          "Control evidence and audit trail capture",
          "ERP integration built to your chart of accounts",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate in a finance function.",
    intro: "Transaction and assembly work, not judgment or approval.",
    items: [
      "Invoice capture, coding and three-way matching",
      "Payment and bank reconciliation",
      "Accounts receivable follow-up and collections",
      "Financial reporting pack assembly",
      "Compliance and audit documentation",
      "Expense and purchase order processing",
    ],
  },

  comparison: {
    heading: "The AP desk, before and after.",
    intro: "Benchmarked against Ardent Partners' average and best-in-class figures.",
    columns: ["Metric", "Average team", "Best-in-class / automated"],
    rows: [
      ["Cost per invoice", "$9.40", "$2.78"],
      ["Processing time", "9.2 days", "3.1 days"],
      ["Exception rate", "22%", "9%"],
      ["Straight-through processing", "Low", "Around 49%"],
      ["Where staff time goes", "Transcription and chasing", "Exceptions, controls and analysis"],
    ],
  },

  faqs: [
    {
      question: "What does AI automation do for a finance team?",
      answer:
        "It removes transaction handling — invoice transcription, matching, reconciliation, routine follow-up and reporting assembly — so the team works exceptions and controls instead. Approval authority and judgment stay with the people who hold them today.",
    },
    {
      question: "How is this different from the automation already in our ERP?",
      answer:
        "ERP automation generally handles clean, structured input well and unstructured input poorly. The gap is everything arriving as a PDF, an email or a portal download, and every exception that falls out of a rules engine. That gap is what these builds cover.",
    },
    {
      question: "Is the cost-per-invoice benchmark realistic for us?",
      answer:
        "Ardent Partners' figures describe a wide population, so treat $9.40 and $2.78 as the range rather than a promise. The useful step is measuring your own cost per invoice first — it is usually higher than teams expect, which is what makes the business case.",
    },
    {
      question: "What about audit and controls?",
      answer:
        "Automated steps need to be more auditable than manual ones, not less. Every action is logged, approval checkpoints stay where policy requires them, and control evidence is captured as a by-product of the workflow rather than reconstructed at audit.",
    },
  ],

  cta: {
    heading: "Start by measuring your cost per invoice.",
    body: "We scope one finance workflow, agree written acceptance criteria including control requirements, and ship it in two to six weeks.",
    service: "custom",
  },
};
