import type { IndustryPageContent } from "./types";

export const realEstate: IndustryPageContent = {
  path: "/industries/real-estate",
  name: "Real estate",
  icon: "Home",
  eyebrow: "Industry",

  headline: {
    lead: "AI automation for real estate teams",
    emphasis: "and the leads that go cold waiting.",
  },

  meta: {
    title: "AI Automation for Real Estate Teams",
    description:
      "AI automation for real estate: lead qualification and instant response, listing and property data workflows, client communication sequences, and contract and document management.",
    ogTitle: "AI Automation for Real Estate Teams",
    ogDescription:
      "Responding to a lead within an hour makes qualifying it about seven times more likely. Most teams average 42 hours.",
  },

  schema: {
    name: "AI automation for real estate operations",
    description:
      "Custom AI automation for real estate teams and brokerages, covering lead qualification and response, property listing workflows, client communication sequences and contract document management.",
    serviceType: [
      "Real estate lead automation",
      "Property listing automation",
      "Client communication automation",
    ],
    audience: "Real estate brokerages, agents and property managers",
  },

  answer:
    "AI automation for real estate teams closes the gap between an enquiry arriving and someone responding to it — qualifying leads, booking viewings, keeping listing data current and moving contract documents — so agents spend their time with buyers who are ready rather than on follow-up that arrived too late to matter.",

  stat: {
    value: "~7×",
    label:
      "more likely to qualify a lead when contacted within an hour — yet across 2,241 firms audited, the average response time was 42 hours",
    source: "Oldroyd, McElheran & Elkington, Harvard Business Review, March 2011",
    sourceUrl: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    asOf: "2011",
  },

  cardStat: "Responding within an hour makes qualifying ~7x likelier (HBR)",

  problems: {
    heading: "Speed decides who wins the enquiry.",
    intro:
      "The research on lead response is old, consistent and largely ignored: the firm that answers first usually wins, and most firms are not close to first.",
    items: [
      {
        title: "Enquiries arrive outside the hours anyone is answering",
        body: "Portal and website enquiries arrive in the evening and at weekends, when the agent who could qualify them is not working. By Monday the buyer has spoken to three other firms.",
      },
      {
        title: "Qualification is repetitive until the moment it is not",
        body: "Budget, timeline, financing status and area preference are the same four questions every time. They are worth asking immediately and worth an agent's attention only once the answers make the lead real.",
      },
      {
        title: "Listing and contract data drifts across systems",
        body: "Property details, availability and document status live in the CRM, the portal and a folder of PDFs. Keeping them consistent is manual, and the inconsistency is what a client notices.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Response speed is a conversation problem. Listing and contract consistency is a data problem.",
    items: [
      {
        service: "chatbot",
        heading: "Conversational AI for instant lead response",
        body: "An agent that answers an enquiry the minute it lands, asks the qualifying questions, books a viewing and writes to the CRM converts the hour that matters most into an actual conversation.",
        outcomes: [
          "Immediate response to enquiries at any hour",
          "Qualification against budget, timeline and financing",
          "Viewing and tour booking against real availability",
          "Handoff to an agent once a lead qualifies",
        ],
      },
      {
        service: "custom",
        heading: "Custom systems for listings and contracts",
        body: "Listing consistency and document flow are reconciliation problems across the CRM, portals and contract files. This is the layer that keeps them aligned and moves documents without a person watching the folder.",
        outcomes: [
          "Property listing syndication and consistency checks",
          "Contract and disclosure document routing",
          "Client communication sequences from CRM state",
          "Document completeness checks before submission",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for brokerage operations",
        body: "Brokerage processes vary by market and firm. An engineer inside the team builds against how your agents actually work rather than a generic pipeline.",
        outcomes: [
          "Pipeline tooling built to your process",
          "Integration with the CRM and portals you use",
          "Reporting on response time and conversion",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate for a real estate team.",
    intro: "Response, coordination and document work — never advice or negotiation.",
    items: [
      "Lead qualification and instant response",
      "Viewing and tour scheduling",
      "Property listing syndication and updates",
      "Client communication and nurture sequences",
      "Contract and disclosure document routing",
      "Follow-up on stalled enquiries",
    ],
  },

  comparison: {
    heading: "The enquiry, before and after.",
    intro: "Same lead, different first hour.",
    columns: ["Stage", "Manual process", "With automation"],
    rows: [
      ["First response", "Next business day, on average much later", "Within minutes, at any hour"],
      ["Qualification", "Agent asks the same four questions by phone", "Captured in the first conversation, written to CRM"],
      ["Booking", "Coordinated over several messages", "Booked against live availability in the same conversation"],
      ["Listings", "Updated per portal by hand", "Syndicated and checked for consistency automatically"],
      ["Stalled leads", "Followed up when someone remembers", "Sequenced automatically until they respond or close out"],
    ],
  },

  faqs: [
    {
      question: "Will buyers know they are talking to an AI agent?",
      answer:
        "They should — and it works better that way. The value is an immediate, useful response at 9pm rather than a pretence of a human. The conversation qualifies and books, then hands to an agent, which is what the buyer wanted from the enquiry anyway.",
    },
    {
      question: "Does this replace agents?",
      answer:
        "No. It removes the first-hour response problem and the repetitive qualification, so agents spend time with buyers who are ready. Advice, negotiation and the relationship remain entirely human.",
    },
    {
      question: "Is the Harvard Business Review lead response finding still relevant?",
      answer:
        "The study is from 2011 and its exact figures should be read as directional now. The underlying pattern has been repeatedly reproduced since: response speed dominates lead conversion, and most firms respond far slower than they believe they do. Measuring your own median response time is the useful first step.",
    },
    {
      question: "Does it work with our CRM?",
      answer:
        "Yes. These builds sit on top of the CRM and portals already in use, reading and writing through their APIs. Changing CRM is not part of the engagement.",
    },
  ],

  cta: {
    heading: "Start by measuring your response time.",
    body: "We scope lead response or listing consistency, agree written acceptance criteria, and ship it in two to six weeks.",
    service: "chatbot",
  },
};
