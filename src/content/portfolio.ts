/**
 * The published Selected Work set — the only project proof this site claims.
 *
 * It lives here rather than inside PortfolioSection because the specialist
 * service pages cite the same projects. Two copies would drift, and a proof
 * section that has drifted from the work it points at is worse than none: the
 * homepage would show one description and a service page another for the same
 * build.
 *
 * Nothing here may be edited to add a client name, a metric, or an outcome that
 * the demo itself does not show. These are descriptions of assets in
 * `public/resources`, not case-study results.
 */

export type PortfolioMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string; alt: string; duration: string };

export type PortfolioItem = {
  /** Stable key used by the service pages to cite a project. */
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  media: PortfolioMedia;
};

const ASSET_BASE_CHATBOT = "/resources/Chatbot (whatsapp)";
const ASSET_BASE_N8N = "/resources/n8n-portfolio";

export const PORTFOLIO_ITEMS = [
  {
    id: "gym-membership-chatbot",
    eyebrow: "Conversational AI · Hospitality",
    title: "A live chatbot booking gym memberships, end to end.",
    body: "A six-minute walkthrough of an automation that handles the full conversation — discovery, FAQ, booking — without a human in the loop.",
    media: {
      kind: "video",
      src: encodeURI(`${ASSET_BASE_CHATBOT}/Automating Customer Interaction_ A Chatbot Solution for Gyms.mp4`),
      alt: "Live demo of a customer-interaction chatbot for a gym chain",
      duration: "6:56",
    },
  },
  {
    id: "omnichannel-messaging-engine",
    eyebrow: "Multi-channel Messaging · SaaS",
    title: "One conversational engine, three platforms.",
    body: "Customers reach out wherever they live — WhatsApp, Instagram, Messenger — and the brand answers in one voice from a unified workflow.",
    media: {
      kind: "image",
      src: encodeURI(`${ASSET_BASE_N8N}/Chatbot for whatsapp, instagram, messenger.png`),
      alt: "n8n workflow graph for an omnichannel chatbot across WhatsApp, Instagram and Messenger",
    },
  },
  {
    id: "fleet-supervisor-copilot",
    eyebrow: "Operations AI · Logistics",
    title: "AI co-pilot for fleet supervisors.",
    body: "Field supervisors ask in plain language — Where's truck 17? Who's on the Khobar route? — and get answers in seconds, not screens.",
    media: {
      kind: "image",
      src: encodeURI(`${ASSET_BASE_CHATBOT}/fleet-managment-ai-for-a-trucking-and-contruction-company.png`),
      alt: "Fleet management AI assistant chat interface for a trucking and construction company",
    },
  },
  {
    id: "after-hours-retail-support",
    eyebrow: "Customer Service · Retail",
    title: "After-hours support that resolves before morning.",
    body: "Customers message at midnight, get help, and the resolved thread is waiting in the morning. The bot is the first responder, not the bottleneck.",
    media: {
      kind: "image",
      src: encodeURI(`${ASSET_BASE_CHATBOT}/whatsapp conversation between chatbot and human screenshot.png`),
      alt: "WhatsApp conversation between a customer and an AI support chatbot",
    },
  },
  {
    id: "internal-automation-graph",
    eyebrow: "Workflow Engineering · Internal Ops",
    title: "An automation graph that runs without humans.",
    body: "A multi-step n8n workflow orchestrating Discord and Telegram conversations on schedule — every five minutes, every day, no operator required.",
    media: {
      kind: "image",
      src: encodeURI(`${ASSET_BASE_N8N}/Dicord and Telegram Automation Khawar.png`),
      alt: "Complex n8n workflow for Discord and Telegram automation",
    },
  },
  {
    id: "content-operations-pipeline",
    eyebrow: "Content Operations · Marketing",
    title: "Content pipeline from idea to publish.",
    body: "From source to drafted post to scheduled distribution — content that ships itself once the editorial brief is set; operators stay in approval mode.",
    media: {
      kind: "image",
      src: encodeURI(`${ASSET_BASE_N8N}/Discord and Telegram Posting Automation.png`),
      alt: "Content automation workflow handling drafting and scheduled publishing across channels",
    },
  },
] as const satisfies readonly PortfolioItem[];

/** Ids of the published projects, so a service page cannot cite one that does not exist. */
export type PortfolioItemId = (typeof PORTFOLIO_ITEMS)[number]["id"];

export const getPortfolioItem = (id: PortfolioItemId): PortfolioItem =>
  PORTFOLIO_ITEMS.find((item) => item.id === id) as PortfolioItem;
