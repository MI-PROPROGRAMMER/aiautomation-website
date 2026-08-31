import type { IndustryPageContent } from "./types";

export const education: IndustryPageContent = {
  path: "/industries/education",
  name: "Education",
  icon: "GraduationCap",
  eyebrow: "Industry",

  headline: {
    lead: "AI automation for education teams",
    emphasis: "and the admin load behind enrollment.",
  },

  meta: {
    title: "AI Automation for Education & Admissions Teams",
    description:
      "AI automation for schools and higher education: enrollment and admissions processing, applicant communication, records and grade administration, and scheduling — built on the student systems you already run.",
    ogTitle: "AI Automation for Education & Admissions Teams",
    ogDescription:
      "95% of admissions offices report a staffing challenge. Where the administrative load sits, and what automation changes.",
  },

  schema: {
    name: "AI automation for education administration",
    description:
      "Custom AI automation for schools and higher education institutions, covering enrollment and admissions processing, applicant communication, student records administration and course scheduling.",
    serviceType: [
      "Admissions workflow automation",
      "Student records automation",
      "Education administrative automation",
    ],
    audience: "Schools, colleges and higher education institutions",
  },

  answer:
    "AI automation for education teams takes the administrative processing that surrounds enrollment — application intake, document chasing, applicant communication, records handling and scheduling — and runs it as a system, so admissions and registrar staff spend their time on evaluation and student contact rather than transcription.",

  stat: {
    value: "95%",
    label:
      "of admissions offices report at least one staffing challenge, over half citing burnout — while 91% of financial aid offices say the resources needed per application have risen over five years",
    source: "AACRAO 2025 staffing survey; NASFAA",
    sourceUrl: "https://www.aacrao.org/",
    asOf: "2025",
  },

  cardStat: "95% of admissions offices report a staffing challenge (AACRAO, 2025)",

  problems: {
    heading: "The load grew; the office did not.",
    intro:
      "Admissions and student services absorbed more compliance, more documentation and more applicant touchpoints without proportionate staffing. The result is capacity spent on processing rather than decisions.",
    items: [
      {
        title: "Applications arrive incomplete and stay that way",
        body: "Missing transcripts, references and financial documents turn every application into a chase. The chasing is identical each time and consumes the staff who should be evaluating the completed files.",
      },
      {
        title: "Applicant communication is high-volume and time-critical",
        body: "Status questions, deadline reminders and next-step guidance arrive constantly during peak cycles. Slow answers cost yield, and answering them quickly at volume is not something a small office can staff for.",
      },
      {
        title: "Records and scheduling work is repetitive and unforgiving",
        body: "Enrollment records, grade administration and course scheduling are rule-bound, repeated at cycle boundaries, and expensive to get wrong. That combination is exactly what should not depend on manual entry.",
      },
    ],
  },

  angles: {
    heading: "Three ways this gets built.",
    intro:
      "Applicant contact is a conversation problem. Document handling and records are reconciliation problems.",
    items: [
      {
        service: "chatbot",
        heading: "Conversational AI for applicants and students",
        body: "An agent that can see application status answers the questions that flood an office during peak cycle, and chases missing documents without a staff member writing the same email again.",
        outcomes: [
          "Application status answered from live records",
          "Missing document chasing and deadline reminders",
          "Enrollment and course question handling at volume",
          "Escalation to staff for anything requiring judgment",
        ],
      },
      {
        service: "custom",
        heading: "Custom systems for application and records processing",
        body: "Intake, document validation, records updates and scheduling are matching problems across the student information system, uploads and correspondence. This is the layer that runs them and surfaces exceptions.",
        outcomes: [
          "Application intake and completeness checking",
          "Transcript and document validation",
          "Student record updates and grade administration",
          "Course scheduling and capacity reconciliation",
        ],
      },
      {
        service: "fde",
        heading: "An embedded engineer for the cycle",
        body: "Admissions processes are institution-specific and peak hard at fixed points in the year. An engineer embedded with the office builds against the real cycle and is there when it runs.",
        outcomes: [
          "Workflow built against a live admissions cycle",
          "Integration with the student information system in place",
          "Audit trails and human checkpoints on decisions",
          "Source code and runbooks in your repository",
        ],
      },
    ],
  },

  workflows: {
    heading: "What we automate in an education office.",
    intro: "Administrative processing only — never admission or academic decisions.",
    items: [
      "Application intake and completeness checking",
      "Applicant communication and status enquiries",
      "Transcript and supporting document validation",
      "Enrollment records and grade administration",
      "Course scheduling and capacity management",
      "Deadline reminders and document chasing",
    ],
  },

  comparison: {
    heading: "The admissions office, before and after.",
    intro: "Same cycle, different allocation of staff time.",
    columns: ["Workflow", "Manual process", "With automation"],
    rows: [
      ["Incomplete files", "Staff email applicants individually", "Chased automatically until complete or withdrawn"],
      ["Status questions", "Answered one by one during peak", "Answered from live records; staff see only exceptions"],
      ["Document validation", "Checked by hand on receipt", "Validated on upload, flagged if failing"],
      ["Records updates", "Entered manually at cycle boundaries", "Updated from source with an audit trail"],
      ["Staff time", "Majority on processing", "Majority on evaluation and applicant contact"],
    ],
  },

  faqs: [
    {
      question: "Does this make admissions decisions?",
      answer:
        "No. Everything here is administrative processing — intake, validation, communication, records. Admission and academic decisions stay entirely with staff, and any workflow adjacent to a decision keeps a human checkpoint and an audit trail.",
    },
    {
      question: "How does this handle student data privacy?",
      answer:
        "It has to be designed around it. Access controls, minimum necessary data handling, audit logging and the institution's own data policies are part of the written acceptance criteria before any build starts, not reviewed afterwards.",
    },
    {
      question: "Will it integrate with our student information system?",
      answer:
        "Yes, through its APIs or interfaces. These builds sit on top of the SIS already in place. Replacing a student information system is not part of the engagement.",
    },
    {
      question: "When in the year should we build this?",
      answer:
        "Outside peak, and against last cycle's real data. Building during peak means testing on the cycle you cannot afford to disrupt; building before it means the system is proven when volume arrives.",
    },
  ],

  cta: {
    heading: "Start before the next cycle, not during it.",
    body: "We scope one administrative workflow, agree written acceptance criteria including data handling, and ship it in two to six weeks.",
    service: "chatbot",
  },
};
