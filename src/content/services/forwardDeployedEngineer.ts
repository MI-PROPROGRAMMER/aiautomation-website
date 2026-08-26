import type { ServicePageContent } from "./types";

/**
 * Copy for /services/forward-deployed-engineer.
 *
 * The acronym rule matters here and is enforced by scripts/validate-seo.ts: the
 * first time "FDE" appears in the rendered body it must be inside the phrase
 * "forward deployed engineer (FDE)". Keep the expansion in the opening answer;
 * everything above it in the DOM (breadcrumb, eyebrow, H1) stays acronym-free.
 */
export const forwardDeployedEngineer: ServicePageContent = {
  path: "/services/forward-deployed-engineer",
  breadcrumbName: "Forward Deployed Engineer",
  eyebrow: "Embedded Technical Delivery",

  headline: {
    lead: "A forward deployed engineer",
    emphasis: "inside your team.",
  },

  meta: {
    title: "Forward Deployed Engineer (FDE) Services | ApexifyLabs",
    description:
      "What a forward deployed engineer does, how the embedded delivery model differs from staff augmentation and consulting, and when it is the wrong engagement.",
    ogTitle: "Forward Deployed Engineer (FDE) Services — ApexifyLabs",
    ogDescription:
      "Embedded technical delivery: one engineer inside your workflow, owning discovery through deployment and iteration — not a report, not a rented seat.",
  },

  schema: {
    name: "Forward deployed engineer services",
    description:
      "Embedded technical delivery in which a senior engineer works inside a client's own workflows and systems, owning discovery, implementation, integration, deployment, and post-launch iteration for AI and automation projects.",
    serviceType: [
      "Forward deployed engineering",
      "Embedded technical delivery",
      "AI implementation",
      "Automation consulting",
    ],
  },

  answer:
    "A forward deployed engineer (FDE) is a senior engineer who works inside your business rather than at arm's length from it — sitting with the team that has the problem, building against your real systems, and staying through deployment and iteration. It suits organisations whose blocker is implementation, not advice. The outcome is working software in production, owned by you.",

  intro:
    "The model exists because the expensive part of an AI or automation project is almost never the idea. It is the fifty small decisions that only surface once someone is looking at the actual data, the actual exceptions, and the actual people doing the work. An embedded engineer makes those decisions in hours instead of routing them through a statement of work.",

  problems: {
    heading: "The gap this model closes.",
    intro:
      "Every one of these is a delivery failure rather than a strategy failure, which is why another workshop rarely fixes it.",
    items: [
      {
        title: "The recommendation was right and nothing shipped",
        body:
          "A consulting engagement produces a roadmap, a vendor shortlist, and a business case. Six months later the roadmap is still a roadmap, because nobody with the ability to build it was ever inside the building.",
      },
      {
        title: "The requirements were wrong in a way only the data shows",
        body:
          "Written requirements describe the process people believe they run. The exceptions, the manual workarounds, and the spreadsheet that quietly holds everything together only appear when an engineer sits with the work.",
      },
      {
        title: "Integration turns out to be the whole project",
        body:
          "The model or the workflow is the easy half. Authentication, rate limits, undocumented fields, stale records, and the one system that has no API are where the timeline actually goes.",
      },
      {
        title: "A pilot succeeds and never reaches production",
        body:
          "Demos run on clean data with a human steering. Production has volume, edge cases, and no one watching at 2am. Without someone accountable for that transition, promising pilots die between the demo and the rollout.",
      },
      {
        title: "Handover leaves nobody able to change it",
        body:
          "Work delivered as a black box becomes untouchable the moment the contract ends. The team inherits something they cannot safely modify, so it ossifies and then gets replaced.",
      },
      {
        title: "Nobody owns the first month after launch",
        body:
          "The period where a system meets reality is exactly when it needs the person who built it. If the engagement ends at go-live, the first serious failure becomes an internal emergency.",
      },
    ],
  },

  useCases: {
    heading: "Where embedded delivery earns its cost.",
    intro:
      "These are the project shapes where being inside the workflow changes the outcome, not just the reporting line.",
    items: [
      {
        title: "Taking an AI pilot to production",
        body:
          "A promising prototype exists and the gap to production is throughput, exceptions, monitoring, and the approval of whoever owns the system it has to write into. That gap is delivery work, done in place.",
      },
      {
        title: "Automating a process nobody has documented",
        body:
          "The process runs on institutional memory and a spreadsheet. Discovery has to happen by observation and instrumentation rather than interview, which is only possible from inside.",
      },
      {
        title: "Integrating systems that were never meant to meet",
        body:
          "An ERP, a legacy internal tool, a vendor portal, and a modern SaaS product. The work is reconciling identity, timing, and truth across all four, and it needs someone who can iterate against live data.",
      },
      {
        title: "Building the first internal tool",
        body:
          "Teams that have never shipped internal software need more than code — they need the deployment path, the access model, and the maintenance habits established alongside the tool.",
      },
      {
        title: "Rescuing a stalled implementation",
        body:
          "Something was started, partly works, and nobody is sure what state it is in. The first job is an honest assessment; the second is either finishing it or saying plainly that it should be replaced.",
      },
      {
        title: "Standing up an evaluation loop",
        body:
          "AI systems need a way to tell whether they are getting better. Building that measurement into the client's own workflow is the difference between iteration and guesswork.",
      },
    ],
  },

  deliverables: {
    heading: "What the engagement produces.",
    intro:
      "The deliverable is a working system in your environment, plus the ability for your team to keep changing it after we leave.",
    items: [
      {
        title: "An honest scoping assessment",
        body:
          "What the process actually does today, where the leverage is, and which parts should not be automated. Written down, including the parts you may not want to hear.",
      },
      {
        title: "Working software in production",
        body:
          "Deployed in your environment, against your real data, handling your real exception rate — not a demo branch that works on a sample file.",
      },
      {
        title: "The integrations, properly",
        body:
          "Authentication, error handling, retries, and idempotency across every system the workflow touches, so a failed run does not become a data-integrity incident.",
      },
      {
        title: "Monitoring and alerting",
        body:
          "Instrumentation on the paths that matter, alerting that reaches a human, and a definition of what 'working' means that someone other than the engineer can check.",
      },
      {
        title: "Documentation your team can act on",
        body:
          "A written runbook and a walkthrough covering how it works, how to change it, and what to do when it breaks at an inconvenient hour.",
      },
      {
        title: "A clean handover",
        body:
          "Source in your repository under your licence, credentials in your accounts, and a 30-day defect warranty on what we shipped.",
      },
    ],
  },

  process: {
    heading: "How an embedded engagement runs.",
    intro:
      "Same five stages as the rest of our work — the difference is that they happen next to the team that owns the process, so the loop between a question and an answer is hours rather than a change request.",
    steps: [
      {
        name: "Discover in place",
        meta: "Week 1",
        body:
          "Sit with the work. Watch the process run, read the real records, and find the exceptions. Most scoping surprises surface here, which is exactly where they are cheapest.",
      },
      {
        name: "Design against reality",
        meta: "Week 2",
        body:
          "Architecture, integration points, failure behaviour, and acceptance criteria — written down before code, and validated against the data seen in discovery rather than the process description.",
      },
      {
        name: "Plan the sequence",
        meta: "Week 3",
        body:
          "A roadmap with named owners on your side, sprint boundaries, and an explicit first slice that can be shipped and judged on its own.",
      },
      {
        name: "Build in the open",
        meta: "Weeks 4–5",
        body:
          "Weekly demos against the acceptance criteria, code in your repository from the first commit, and hardening in a controlled environment before anything touches production.",
      },
      {
        name: "Ship and stay",
        meta: "Ongoing",
        body:
          "Launch with monitoring and alerting, then remain through the period where reality tests the assumptions. The engagement ends on a handover, not on a go-live date.",
      },
    ],
  },

  capabilities: {
    heading: "What an embedded engineer brings.",
    intro:
      "The stack we build in, and the surfaces an embedded engagement usually has to touch.",
    groups: [
      {
        name: "Build",
        items: ["Python", "TypeScript", "Node.js", "OpenAI", "Anthropic", "PostgreSQL", "Supabase"],
      },
      {
        name: "Deploy and operate",
        items: ["AWS", "Vercel", "GitHub", "Monitoring and alerting", "Runbooks and handover"],
      },
      {
        name: "Connect",
        items: ["HubSpot", "Slack", "Stripe", "Airtable", "Notion", "Zapier", "Make", "n8n"],
      },
    ],
    note:
      "An embedded engagement usually meets at least one system that is not on any list — an internal tool, a vendor portal, a legacy database. Assessing what it takes to work with it is part of discovery, not a promise made beforehand.",
  },

  comparison: {
    heading: "How this differs from the alternatives.",
    intro:
      "Embedded delivery, staff augmentation, consulting, and solutions engineering all put a technical person near your problem. They differ in who owns the outcome.",
    columns: ["", "Forward deployed engineer", "Staff augmentation", "Traditional consulting", "Solutions engineer"],
    rows: [
      [
        "Who defines the problem",
        "The engineer, from inside the workflow",
        "You do, in a ticket",
        "The engagement scope, agreed up front",
        "The customer, during a sales cycle",
      ],
      [
        "What is delivered",
        "A working system in production",
        "Capacity against your backlog",
        "Analysis, roadmap, recommendations",
        "A proof that a product can fit",
      ],
      [
        "Where the work happens",
        "Inside your systems and your process",
        "Inside your team, under your management",
        "Alongside, in workshops and documents",
        "Around a vendor's own product",
      ],
      [
        "Measured by",
        "Whether the process changed in production",
        "Throughput of assigned tasks",
        "Quality of the recommendation",
        "Whether the deal or the pilot advances",
      ],
      [
        "Ends when",
        "The system runs and your team can change it",
        "The contract or the backlog does",
        "The report is delivered",
        "The product is bought or rejected",
      ],
      [
        "Typical failure mode",
        "Scope creeps without a written boundary",
        "Nobody owns the design, only the tickets",
        "The recommendation is right and unbuilt",
        "The fit is proven only on demo data",
      ],
    ],
    note:
      "None of these are inferior models — they answer different questions. If you already know exactly what to build and need hands, staff augmentation is cheaper. If the question is strategic rather than technical, consulting is the right instrument.",
  },

  fit: {
    heading: "When to embed an engineer — and when not to.",
    intro:
      "This is the more expensive way to buy engineering time per hour. It is worth it only under specific conditions.",
    goodHeading: "A good fit when",
    good: [
      "You have a real operational problem and no clear picture of what should be built.",
      "The process is documented mainly in the heads of the people who run it.",
      "Previous analysis produced a recommendation that never became working software.",
      "The work has to touch systems that are messy, legacy, or poorly documented.",
      "You want the resulting system owned and maintained by your own team afterwards.",
    ],
    badHeading: "Not a good fit when",
    bad: [
      "You already have a precise specification and simply need more hands to execute it.",
      "The decision you need is commercial or organisational rather than technical.",
      "No one internally can give an engineer access to systems, data, and the people doing the work.",
      "The scope is a single well-defined integration that a fixed-price build would cover.",
      "You need a permanent role filled — an embedded engagement is not a substitute for hiring.",
    ],
  },

  engagement: {
    heading: "How engagement and pricing work.",
    intro:
      "We price embedded work after a scoping conversation, because the honest number depends on how much of the process is undocumented and how many systems the work has to reach.",
    body: [
      "The first conversation is free and is genuinely diagnostic: we are trying to establish whether this is an implementation problem at all. If it is a strategy question or a hiring question, we will say so.",
      "Engagements are scoped as a written statement of what will exist at the end, with acceptance criteria and named owners on both sides. The published bands for our automation work apply here as well — focused engagements start around $2,000, and comprehensive programmes run from $10,000 to $50,000 depending on scope. You get a written cost-benefit analysis before any work begins.",
      "Most projects run two to six weeks; work that spans several enterprise systems can extend to two or three months. We do not quote a duration before discovery, because a number given before anyone has read your data is a guess wearing a suit.",
    ],
    points: [
      {
        title: "Diagnostic first",
        body: "A free consultation that is allowed to conclude you do not need this engagement.",
      },
      {
        title: "Written boundary",
        body: "Scope, acceptance criteria, and exclusions agreed before the engagement starts — the main defence against creep.",
      },
      {
        title: "Weekly demos",
        body: "Progress is shown against acceptance criteria every week, so a wrong turn costs days rather than months.",
      },
      {
        title: "Handover, not lock-in",
        body: "Source, credentials, and a runbook transfer to you, with a 30-day defect warranty after launch.",
      },
    ],
  },

  faqs: [
    {
      question: "What does a forward deployed engineer actually do?",
      answer:
        "They embed with the team that owns a process, work out what the process really does by observing it, then design, build, integrate, deploy, and iterate on the system that changes it. The distinguishing feature is accountability for the outcome in production rather than for a document or a ticket queue.",
    },
    {
      question: "What does FDE stand for?",
      answer:
        "Forward deployed engineer. The term comes from software teams who send engineers to work inside a customer's environment instead of building at a distance and shipping a release. We always write it out on first use, because the acronym on its own is ambiguous in most industries.",
    },
    {
      question: "How is this different from hiring a contractor?",
      answer:
        "A contractor typically executes a specification you have already written and is managed inside your team. An embedded engineer is engaged when the specification is the hard part: discovery, design, integration, and deployment are all in scope, and the engagement is measured by whether the process changed in production.",
    },
    {
      question: "How is it different from a consulting engagement?",
      answer:
        "Consulting answers a question and delivers analysis. Embedded delivery answers the question by building the thing, then leaves it running in your environment with your team able to maintain it. If your blocker is genuinely a decision rather than an implementation, consulting is the better instrument and we will say so.",
    },
    {
      question: "How long does an embedded engagement last?",
      answer:
        "Most of our projects run two to six weeks, and work spanning several enterprise systems can take two to three months. We scope the duration after discovery rather than before it, and the first slice is deliberately shippable on its own so you can stop early if the value is not there.",
    },
    {
      question: "What does it cost?",
      answer:
        "Scope and engagement are set after discovery. The bands we publish for automation work apply here: focused engagements start around $2,000, and comprehensive programmes range from $10,000 to $50,000 depending on complexity and integration surface. A written cost-benefit analysis comes before any work begins.",
    },
    {
      question: "What do we own at the end?",
      answer:
        "Everything. Source code in your repository under your licence, all credentials and integrations in your accounts, a written runbook and a walkthrough so your team can extend the system, and a 30-day defect warranty on what we delivered.",
    },
    {
      question: "Can an embedded engineer work with our existing development team?",
      answer:
        "Yes, and that is often the better arrangement. Your engineers know the systems and the constraints; the embedded engineer brings the discovery and the AI or automation delivery pattern. We agree the split of responsibilities in writing at the start so nobody is guessing who owns which surface.",
    },
  ],

  articles: {
    heading: "Reading that sits behind this work.",
    intro:
      "Field notes on implementation: what discovery turns up, how a manual process compares with an AI-assisted one, and what it takes to get from a pilot to a running system.",
    items: [
      {
        slug: "agentic-ai-blueprint",
        title: "Agentic AI Blueprint: Launch High-Impact Automation Pilots in 30 Days",
        blurb:
          "The sequencing we use to get from a vague ambition to a pilot that is allowed to fail cheaply — the closest thing to a written description of how an embedded engagement opens.",
      },
      {
        slug: "manual-vs-ai-order-exception-handling",
        title: "Manual vs AI-Augmented Order Exception Handling",
        blurb:
          "A side-by-side of the same process before and after implementation, including the exceptions that only became visible once someone instrumented the workflow.",
      },
      {
        slug: "carrier-vetting-manual-vs-ai-assisted-scoring",
        title: "Carrier Vetting: Manual Reviews vs AI-Assisted Scoring",
        blurb:
          "What changes when a judgement-heavy review process is rebuilt around scoring — and which parts of it deliberately stay with a person.",
      },
      {
        slug: "subcontractor-bid-leveling-ai-assisted",
        title: "Subcontractor Bid Leveling: Manual vs AI-Assisted Review",
        blurb:
          "An implementation study in a document-heavy workflow, where the hard part is normalising inconsistent inputs rather than the analysis itself.",
      },
      {
        slug: "daily-reports-gc-jobs-forms-to-ai-summaries",
        title: "Daily Reports on GC Jobs: From Forms to AI Summaries",
        blurb:
          "Moving a field process from paper forms to generated summaries, including the adoption problem that decides whether the deployment survives its first month.",
      },
    ],
  },

  cta: {
    heading: "Describe the process that keeps stalling.",
    body:
      "Bring the workflow that has resisted two attempts already. A free consultation is enough for us to tell you whether this is an implementation problem worth embedding for — or something you should solve a different way.",
  },
};
