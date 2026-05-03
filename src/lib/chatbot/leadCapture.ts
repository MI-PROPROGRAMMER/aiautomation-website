import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, CONTACT_EMAIL } from "@/config/constants";

export type ChatRole = "user" | "assistant";
export interface ChatTurn {
  role: ChatRole;
  content: string;
  at: number;
}

export interface LeadSnapshot {
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
}

const EMAIL_RE = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i;
const PHONE_RE = /(?:\+?\d[\d\s().-]{7,}\d)/;
const NAME_HINT_RE = /\b(?:i'?m|i am|my name is|this is|name:?)\s+([A-Z][a-zA-Z'-]+(?:\s+[A-Z][a-zA-Z'-]+)?)/;
const COMPANY_HINT_RE = /\b(?:from|at|with|work\s+at|company\s*[:\-]?)\s+([A-Z][\w&.\s-]{1,40})/;

const STOP_WORDS = new Set([
  "Hello",
  "Hi",
  "Hey",
  "Thanks",
  "Thank",
  "Yes",
  "No",
  "Okay",
  "Sure",
  "Maybe",
  "Apexifylabs",
  "ApexifyLabs",
]);

const cleanCapture = (raw: string | undefined): string | undefined => {
  if (!raw) return undefined;
  const trimmed = raw.trim().replace(/[.,!?;:]+$/, "");
  if (!trimmed) return undefined;
  if (STOP_WORDS.has(trimmed.split(/\s+/)[0])) return undefined;
  if (trimmed.length > 80) return undefined;
  return trimmed;
};

export const extractLeadInfo = (turns: ChatTurn[]): LeadSnapshot => {
  const userText = turns
    .filter((t) => t.role === "user")
    .map((t) => t.content)
    .join("\n");

  const email = userText.match(EMAIL_RE)?.[0];
  const phone = userText.match(PHONE_RE)?.[0]?.trim();
  const name = cleanCapture(userText.match(NAME_HINT_RE)?.[1]);
  const company = cleanCapture(userText.match(COMPANY_HINT_RE)?.[1]);

  return { email, phone, name, company };
};

const formatTranscript = (turns: ChatTurn[]): string =>
  turns
    .map((t) => {
      const who = t.role === "user" ? "Visitor" : "Aria";
      const ts = new Date(t.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return `[${ts}] ${who}: ${t.content}`;
    })
    .join("\n\n");

const buildContext = (): { pageUrl: string; userAgent: string; referrer: string; locale: string } => {
  if (typeof window === "undefined") {
    return { pageUrl: "", userAgent: "", referrer: "", locale: "" };
  }
  return {
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    referrer: document.referrer || "(direct)",
    locale: navigator.language || "",
  };
};

export type LeadEventReason = "first_message" | "lead_captured" | "session_ended";

export interface SendLeadOptions {
  reason: LeadEventReason;
  turns: ChatTurn[];
  lead: LeadSnapshot;
  sessionId: string;
}

const reasonLabel: Record<LeadEventReason, string> = {
  first_message: "New chatbot conversation started",
  lead_captured: "Lead info captured in chatbot",
  session_ended: "Chatbot conversation summary",
};

export const sendLeadNotification = async ({ reason, turns, lead, sessionId }: SendLeadOptions): Promise<void> => {
  const { pageUrl, userAgent, referrer, locale } = buildContext();
  const transcript = formatTranscript(turns);
  const userTurns = turns.filter((t) => t.role === "user").length;

  const summaryLines = [
    `Reason: ${reasonLabel[reason]}`,
    `Session ID: ${sessionId}`,
    `Page: ${pageUrl}`,
    `Referrer: ${referrer}`,
    `Locale: ${locale}`,
    `User agent: ${userAgent}`,
    `Visitor messages: ${userTurns}`,
    `Captured name: ${lead.name ?? "—"}`,
    `Captured email: ${lead.email ?? "—"}`,
    `Captured phone: ${lead.phone ?? "—"}`,
    `Captured company: ${lead.company ?? "—"}`,
  ];

  const messageBody = `${summaryLines.join("\n")}\n\n--- Transcript ---\n\n${transcript}`;

  const fromName = lead.name?.trim() || (lead.email ? lead.email.split("@")[0] : "Website visitor");
  const fromEmail = lead.email || "no-reply@apexifylabs.com";

  const templateParams = {
    from_name: fromName,
    from_email: fromEmail,
    company: lead.company || "Not provided",
    message: messageBody,
    to_email: CONTACT_EMAIL,
    subject: `[Chatbot] ${reasonLabel[reason]}${lead.email ? ` — ${lead.email}` : ""}`,
  };

  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams);
};

export const newSessionId = (): string => {
  const rand = Math.random().toString(36).slice(2, 10);
  const t = Date.now().toString(36);
  return `cb-${t}-${rand}`;
};
