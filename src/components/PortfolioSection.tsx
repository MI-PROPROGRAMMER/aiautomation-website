import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { ChapterMarker } from "@/components/ui/editorial";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type PortfolioMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string; alt: string; duration: string };

type PortfolioItem = {
  eyebrow: string;
  title: string;
  body: string;
  media: PortfolioMedia;
};

const ASSET_BASE_CHATBOT = "/resources/Chatbot (whatsapp)";
const ASSET_BASE_N8N = "/resources/n8n-portfolio";

const portfolioItems: PortfolioItem[] = [
  {
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
    eyebrow: "Content Operations · Marketing",
    title: "Content pipeline from idea to publish.",
    body: "From source to drafted post to scheduled distribution — content that ships itself once the editorial brief is set; operators stay in approval mode.",
    media: {
      kind: "image",
      src: encodeURI(`${ASSET_BASE_N8N}/Discord and Telegram Posting Automation.png`),
      alt: "Content automation workflow handling drafting and scheduled publishing across channels",
    },
  },
];

const MediaFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-accent/40 ${className}`}
  >
    {children}
  </div>
);

const VideoMedia = ({ media }: { media: Extract<PortfolioMedia, { kind: "video" }> }) => {
  const [open, setOpen] = useState(false);
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const fullRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = fullRef.current;
    if (!el) return;
    if (open) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-pointer"
        aria-label={`Play demo: ${media.alt} (${media.duration})`}
      >
        <MediaFrame className="aspect-[16/10]">
          <video
            ref={previewRef}
            src={media.src}
            poster={media.poster}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-accent/60 group-hover:bg-accent/20">
              <Play className="h-6 w-6 translate-x-[1px] text-white" fill="currentColor" />
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="tech-label rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.6rem] text-white/85 backdrop-blur-md">
              ▶ Watch demo · {media.duration}
            </span>
          </div>
        </MediaFrame>
      </button>

      <DialogContent className="max-w-5xl border-white/10 bg-[#050b14] p-0">
        <DialogTitle className="sr-only">{media.alt}</DialogTitle>
        <video
          ref={fullRef}
          src={media.src}
          controls
          playsInline
          className="aspect-video w-full rounded-lg bg-black"
        />
      </DialogContent>
    </Dialog>
  );
};

const ImageMedia = ({ media }: { media: Extract<PortfolioMedia, { kind: "image" }> }) => (
  <MediaFrame className="aspect-[16/10]">
    <img
      src={media.src}
      alt={media.alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.015] md:p-4"
    />
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden="true"
    />
  </MediaFrame>
);

export const PortfolioSection = () => {
  return (
    <section id="selected-work" className="py-20 md:py-32 bg-[hsl(var(--section-base))]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-20 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <ChapterMarker number="07" label="Selected Work" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Selected work,
                <span className="block font-normal text-gradient">in production.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                A small set of automations from the past year — chatbots that book customers, fleet assistants
                that answer in plain language, n8n graphs that quietly run a business in the background.
              </p>
            </div>
          </div>

          {/* Editorial spreads — alternating media side */}
          <div className="space-y-24 md:space-y-32">
            {portfolioItems.map((item, index) => {
              const isReversed = index % 2 === 1;
              return (
                <motion.article
                  key={item.title}
                  className="grid gap-10 md:grid-cols-12 md:gap-16 md:items-center"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Caption column — numeral + eyebrow + title + body */}
                  <div className={`md:col-span-5 ${isReversed ? "md:order-2" : ""}`}>
                    <div className="num-display text-6xl text-accent sm:text-7xl md:text-8xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="hairline mt-6 mb-6" aria-hidden="true" />
                    <span className="eyebrow">{item.eyebrow}</span>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-primary-foreground md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="display-italic mt-5 text-lg italic leading-relaxed text-primary-foreground/80 md:text-xl">
                      {item.body}
                    </p>
                  </div>

                  {/* Media column */}
                  <div className={`md:col-span-7 ${isReversed ? "md:order-1" : ""}`}>
                    {item.media.kind === "video" ? (
                      <VideoMedia media={item.media} />
                    ) : (
                      <ImageMedia media={item.media} />
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-24 flex justify-center">
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="group text-primary-foreground/85 hover:bg-transparent hover:text-accent"
            >
              <Link to="/contact">
                <span className="border-b border-primary-foreground/30 pb-1 transition-colors group-hover:border-accent">
                  Discuss a build like one of these
                </span>
                <ArrowUpRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
