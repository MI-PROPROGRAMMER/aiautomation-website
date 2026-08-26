import type { ServicePageContent } from "./types";

/**
 * Copy for /services/ai-chatbot-development.
 *
 * Every capability, price band, and timeline here already appears elsewhere on
 * this site (the /services FAQ, the /about handover promise, the tools list).
 * Nothing on this page names a client, quotes a result we have not published,
 * or promises an integration that is not already part of how we build.
 */
export const aiChatbotDevelopment: ServicePageContent = {
  path: "/services/ai-chatbot-development",
  breadcrumbName: "AI Chatbot Development",
  eyebrow: "Conversational AI",

  headline: {
    lead: "AI chatbot development",
    emphasis: "that answers, not deflects.",
  },

  meta: {
    title: "AI Chatbot Development Services | ApexifyLabs",
    description:
      "AI chatbot development services for support and sales teams: custom conversational AI wired into your own order data, knowledge base, CRM, and human handoff.",
    ogTitle: "AI Chatbot Development Services — ApexifyLabs",
    ogDescription:
      "Custom AI chatbots that read your own systems, answer in context, and hand off cleanly to a human. Built, monitored, and handed over with the source.",
  },

  schema: {
    name: "AI chatbot development",
    description:
      "Design and build of custom AI chatbots and conversational AI assistants for customer support, order status, internal knowledge, and lead qualification — including retrieval over a client's own content, workflow and CRM integration, human handoff, monitoring, and ongoing iteration.",
    serviceType: [
      "AI chatbot development",
      "Conversational AI development",
      "Customer support automation",
      "Knowledge retrieval",
    ],
  },

  answer:
    "AI chatbot development is the design and build of a conversational assistant that reads your own systems and answers customer or staff questions in context. It suits teams whose support or sales inbox is dominated by repeatable lookups. The outcome is faster first responses, and human attention reserved for the exceptions that actually need judgement.",

  intro:
    "We have spent four years building automation for teams across five continents, and support inboxes are where the same pattern shows up most often: a large share of messages have a correct answer sitting in a system nobody has time to open. A chatbot is worth building when that is true — and worth refusing when it is not. This page covers both cases.",

  problems: {
    heading: "What a chatbot is actually solving.",
    intro:
      "None of these problems are about headcount being lazy. They are about answers being scattered, repetitive, and time-sensitive at the same time.",
    items: [
      {
        title: "Repeatable questions crowd out revenue work",
        body:
          "Order status, delivery windows, policy checks, and password-style lookups are individually trivial and collectively enormous. They arrive in bursts, they are urgent to the person asking, and they push the tickets that affect retention to the back of the queue.",
      },
      {
        title: "The answer lives in five systems",
        body:
          "A single reply can require the storefront, the order system, a warehouse or ops tool, a carrier or supplier feed, and a help-centre article. Every agent tabs between them on every ticket, and the tab-switching is most of the handle time.",
      },
      {
        title: "Rule-based bots break on phrasing",
        body:
          "Decision-tree bots only recognise the questions someone anticipated. Customers who phrase things differently hit a dead end, then re-ask a human — so the bot adds a step without removing work.",
      },
      {
        title: "Escalation is a dead end, not a handoff",
        body:
          "Most bots escalate by dumping the customer into a form and losing everything already said. The customer repeats themselves, the agent starts cold, and the interaction now costs more than if the bot had never run.",
      },
      {
        title: "Nobody can see what the bot got wrong",
        body:
          "Without transcript review, confidence signals, and a record of which answers were refused, a chatbot is unfalsifiable. It looks like it is working right up until the week you discover it has been confidently wrong about a return policy.",
      },
      {
        title: "Knowledge goes stale the day it ships",
        body:
          "Policies change, SKUs change, carriers change. A chatbot whose knowledge was pasted in at launch starts drifting immediately unless it reads the live source instead of a copy.",
      },
    ],
  },

  useCases: {
    heading: "Where we build them.",
    intro:
      "These are the chatbot shapes we design most often. Each one is a different retrieval problem underneath, which is why they are scoped separately rather than sold as one product.",
    items: [
      {
        title: "Customer support deflection",
        body:
          "The assistant answers the recurring share of the inbox — policy, status, eligibility, how-to — directly in the help widget or the ticketing tool, and escalates the rest with the full conversation attached.",
      },
      {
        title: "Order and delivery status",
        body:
          "Live lookups against the order system and the carrier feed, so the answer reflects the actual scan history rather than the confirmation email. Exceptions can trigger a proactive message instead of waiting for the customer to ask.",
      },
      {
        title: "Internal knowledge assistant",
        body:
          "A staff-facing assistant over runbooks, policies, contracts, and past tickets. It shortens onboarding and stops the same five people from being the only ones who know how a process works.",
      },
      {
        title: "Lead qualification and routing",
        body:
          "Inbound enquiries get an immediate, useful reply, a few qualifying questions, and a routed record in the CRM — instead of sitting unanswered until someone opens the shared inbox.",
      },
      {
        title: "Booking and scheduling",
        body:
          "Conversational scheduling that checks real availability, confirms, reschedules, and writes the result back into the calendar and CRM rather than producing a task for someone to action later.",
      },
      {
        title: "Document and catalogue Q&A",
        body:
          "Retrieval over specifications, manuals, price lists, or a product catalogue, so a question about one line item does not require a person to open a 200-page PDF.",
      },
    ],
  },

  deliverables: {
    heading: "What you get.",
    intro:
      "A chatbot engagement is not a prompt. It is a scoped conversational surface, the retrieval layer behind it, the integrations either side, and the instrumentation that lets you tell whether it is working.",
    items: [
      {
        title: "Scoped question set",
        body:
          "A written inventory of what the assistant will answer, what it will refuse, and what it escalates — derived from your real message history, not from guesswork.",
      },
      {
        title: "Retrieval layer over your content",
        body:
          "The assistant reads your live sources rather than a pasted snapshot, so an updated policy or a changed price is reflected without a rebuild.",
      },
      {
        title: "System integrations",
        body:
          "Read paths into the systems that hold the answer and write paths into the ones that need the record — order data, CRM, ticketing, calendar, or internal tools.",
      },
      {
        title: "Human handoff that carries context",
        body:
          "Escalation passes the full transcript, the retrieved sources, and the reason for the handoff to the agent who picks it up.",
      },
      {
        title: "Monitoring and transcript review",
        body:
          "Dashboards and alerting for volume, deflection, refusals, and failures, plus a review loop so wrong answers become corrections rather than folklore.",
      },
      {
        title: "Runbook and handover",
        body:
          "Source code in your repository, credentials in your accounts, a written runbook, and a walkthrough so your team can change the assistant without us.",
      },
    ],
  },

  process: {
    heading: "How the build runs.",
    intro:
      "The sequence exists to answer one question as early and cheaply as possible: is a chatbot the right instrument here at all?",
    steps: [
      {
        name: "Read the inbox",
        meta: "Discovery",
        body:
          "We sample real conversations and classify them: answerable from a system, answerable from a document, needs a policy decision, needs a human. That split decides the scope, and sometimes it decides against building a chatbot.",
      },
      {
        name: "Design the answer path",
        meta: "Design",
        body:
          "For every question in scope we agree where the answer comes from, what the assistant says when the source is missing, and what triggers escalation. Refusal behaviour is designed first, not patched on later.",
      },
      {
        name: "Build and evaluate",
        meta: "Build",
        body:
          "We wire the retrieval and the integrations, then test against the real historical conversations from discovery — so accuracy is measured against questions people actually asked.",
      },
      {
        name: "Pilot on live traffic",
        meta: "Pilot",
        body:
          "The assistant goes live on a narrow slice with a human reviewing the transcripts. Scope widens only where the evidence says it should.",
      },
      {
        name: "Monitor and iterate",
        meta: "Ongoing",
        body:
          "Alerting on failures, a standing review of refusals and escalations, and a maintenance cadence — because the source content and the question mix both keep moving.",
      },
    ],
  },

  capabilities: {
    heading: "What we build on.",
    intro:
      "These are the platforms already in our working set. The right combination depends on where your answers live and what your security constraints are.",
    groups: [
      {
        name: "Models and services",
        items: ["OpenAI", "Anthropic", "Python", "TypeScript", "Node.js", "AWS", "Vercel"],
      },
      {
        name: "Content and data sources",
        items: ["PostgreSQL", "Supabase", "Notion", "Airtable", "GitHub"],
      },
      {
        name: "Workflow and business systems",
        items: ["HubSpot", "Slack", "Stripe", "Zapier", "Make", "n8n"],
      },
    ],
    note:
      "If a system you depend on is not listed, that is not a no. Anything with an API or a webhook surface is a compatibility question we answer during discovery rather than a promise we make in advance.",
  },

  comparison: {
    heading: "AI chatbot, rule-based bot, or more people?",
    intro:
      "A chatbot is one of three ways to absorb repetitive volume. The honest comparison is against the other two, not against doing nothing.",
    columns: ["", "Rule-based chatbot", "AI chatbot", "More support headcount"],
    rows: [
      [
        "Unfamiliar phrasing",
        "Fails to a menu or a dead end",
        "Interprets intent and asks a clarifying question",
        "Handled naturally",
      ],
      [
        "Where the answer comes from",
        "Hard-coded replies maintained by hand",
        "Live retrieval from your systems and content",
        "Whatever the agent can find, tab by tab",
      ],
      [
        "Effort to stand up",
        "Low for a narrow tree, high to keep current",
        "Higher up front — scoping, retrieval, evaluation",
        "Recruiting and training lead time",
      ],
      [
        "Cost as volume grows",
        "Flat, but coverage stops where the tree stops",
        "Grows slowly with usage",
        "Grows in step with volume",
      ],
      [
        "Typical failure mode",
        "Customer loops, gives up, messages a human",
        "Confidently wrong if refusal behaviour was never designed",
        "Queue depth and slower senior-agent response",
      ],
      [
        "Best at",
        "A short, stable, well-known set of questions",
        "High-volume questions with answers in live systems",
        "Judgement, negotiation, and genuine exceptions",
      ],
    ],
    note:
      "Most desks end up with a mix. The point of the split is to send the mechanical lookups somewhere cheap so the people you already employ are free for the conversations that need them.",
  },

  fit: {
    heading: "When to build one — and when not to.",
    intro:
      "We would rather tell you the answer is somewhere else than sell a build that will quietly underperform.",
    goodHeading: "A good fit when",
    good: [
      "A large, repeating share of your messages ask for information a system already holds.",
      "Those answers can be reached programmatically through an API, a database, or a documented source.",
      "Your policies are written down somewhere a person could point to.",
      "There is a human team ready to take escalations, not a bot expected to replace them.",
      "You want to measure deflection and accuracy rather than take them on faith.",
    ],
    badHeading: "Not a good fit when",
    bad: [
      "The answers are not written down anywhere, and nobody has time to write them down first.",
      "Volume is low enough that the review effort would exceed the time saved.",
      "Almost every question requires a commercial or policy decision a person has to own.",
      "A regulatory or contractual obligation requires a named human on every response.",
      "The goal is to remove the support team rather than to change what they spend the day on.",
    ],
  },

  engagement: {
    heading: "How engagement and pricing work.",
    intro:
      "We do not publish a per-chatbot price, because the honest number depends on how many systems have to be read and how strict the refusal behaviour has to be.",
    body: [
      "Scope is set after discovery, not before it. We read a real sample of your conversations, classify what is answerable, and write down what the assistant will and will not do. That document is what gets priced.",
      "The bands we publish for automation work apply here too: focused builds start around $2,000, and comprehensive systems run from $10,000 to $50,000 depending on scope and integration surface. You get a written cost-benefit analysis before any work begins.",
      "Timelines follow the same shape as our other work — most projects ship in two to six weeks, narrow ones faster, and builds that touch several enterprise systems can run longer. The pilot is deliberately early so you can stop before the expensive half.",
    ],
    points: [
      {
        title: "Discovery first",
        body: "A free consultation, then a paid discovery only if the problem is bigger than one conversation can size.",
      },
      {
        title: "Written scope",
        body: "Acceptance criteria and refusal behaviour agreed in writing before the build starts.",
      },
      {
        title: "You own it",
        body: "Source, credentials, and runbook transfer to you, with a 30-day defect warranty after launch.",
      },
      {
        title: "Support after launch",
        body: "Monitoring, alerting, and a maintenance cadence, because a chatbot is a system that keeps needing attention.",
      },
    ],
  },

  faqs: [
    {
      question: "How long does an AI chatbot build take?",
      answer:
        "Most of our automation projects ship in two to six weeks, and chatbots follow the same shape. A narrow assistant over one well-documented source can be live in days; one that reads several enterprise systems and needs a careful evaluation pass takes longer. We give a timeline and written acceptance criteria during the initial consultation.",
    },
    {
      question: "What does AI chatbot development cost?",
      answer:
        "Cost varies with complexity and scope, so we price after discovery rather than from a rate card. The bands we publish for automation work apply: focused builds start around $2,000, and comprehensive systems range from $10,000 to $50,000. You receive a written cost-benefit analysis before any work begins.",
    },
    {
      question: "Can the chatbot use our own help centre and order data?",
      answer:
        "Yes — that is the point of building one rather than buying a generic widget. We wire the assistant to read your live sources so an updated policy or a changed order status is reflected immediately, instead of answering from a snapshot that was accurate on launch day.",
    },
    {
      question: "What happens when the chatbot does not know the answer?",
      answer:
        "It says so and escalates, carrying the full transcript, the sources it consulted, and the reason for the handoff to the person who picks it up. Refusal behaviour is designed at the start of the project, not added after the first bad answer, because a bot that guesses is worse than no bot.",
    },
    {
      question: "Which model providers do you build on?",
      answer:
        "We work with OpenAI and Anthropic models, and we build the surrounding services in Python, TypeScript, and Node.js. The provider is a scoping decision rather than a fixed part of the offer, so if your organisation has a constraint on where inference runs, raise it during discovery.",
    },
    {
      question: "How do you stop the chatbot from making things up?",
      answer:
        "Three things together: the assistant answers from retrieved sources rather than memory, refusal and escalation paths are designed before the build, and accuracy is evaluated against real historical conversations before launch. After launch, transcript review and alerting turn wrong answers into corrections instead of folklore.",
    },
    {
      question: "Do we own the chatbot after launch?",
      answer:
        "Yes. Source code lands in your repository under your licence, all credentials and integrations are transferred to your accounts, and you get a written runbook plus a walkthrough so your team can extend it. A 30-day defect warranty covers the handover period.",
    },
  ],

  work: {
    heading: "Chatbots already running.",
    intro:
      "Three of the builds on our selected-work page are conversational systems. They are demos and workflow graphs rather than case studies — no client names, no result claims, just the systems themselves.",
    items: [
      {
        id: "gym-membership-chatbot",
        relevance:
          "The fullest public example of a conversation handled end to end: discovery, FAQ, and booking, with no human in the loop on the routine path.",
      },
      {
        id: "omnichannel-messaging-engine",
        relevance:
          "One reply layer serving WhatsApp, Instagram, and Messenger from a single workflow — the integration shape behind most support-chatbot briefs.",
      },
      {
        id: "after-hours-retail-support",
        relevance:
          "A real transcript of the assistant acting as first responder, which is the behaviour the fit section above is describing.",
      },
    ],
  },

  articles: {
    heading: "Reading that sits behind this work.",
    intro:
      "Write-ups from the desks where conversational automation earns its keep — support inboxes, status enquiries, and inbound follow-up.",
    items: [
      {
        slug: "ai-wismo-tickets-dtc-brand",
        title: "How AI Clears the WISMO Ticket Backlog at a $10M DTC Brand",
        blurb:
          "Order-status questions are the archetypal chatbot workload. This is what the backlog costs, and what changes in the shape of the desk when the lookups stop reaching a human first.",
      },
      {
        slug: "freight-check-calls-before-after-ai",
        title: "Freight Check Calls, Before and After AI",
        blurb:
          "The same pattern outside e-commerce: a high-frequency status conversation that a system can answer, and a coverage desk that gets its afternoon back when it does.",
      },
      {
        slug: "dtc-refund-reflex-delivered-not-received-claims",
        title: "The DTC Refund Reflex on Delivered-Not-Received Claims",
        blurb:
          "A worked example of the line between deflection and judgement — where an assistant should gather evidence and where a person still has to decide.",
      },
      {
        slug: "follow-up-gap-freight-leads",
        title: "The Follow-Up Gap: Where 80% of Freight Leads Die",
        blurb:
          "Inbound enquiries decay fast. This covers what an immediate, useful first reply is actually worth before a human joins the thread.",
      },
      {
        slug: "cancellation-reason-capture-dtc-winback-blind-spot",
        title: "Cancellation Reason Capture and the DTC Winback Blind Spot",
        blurb:
          "Conversational surfaces are also collection surfaces. This is the case for capturing structured reasons at the moment a customer is already talking to you.",
      },
    ],
  },

  cta: {
    heading: "Bring us a week of your inbox.",
    body:
      "The fastest way to find out whether a chatbot is the right instrument is to look at what people are actually asking. Book a free consultation and we will read a real sample with you, and tell you plainly if the answer is something other than a chatbot.",
  },
};
