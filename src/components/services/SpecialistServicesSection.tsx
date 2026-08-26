import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { BentoTile, ChapterMarker } from "@/components/ui/editorial";

/**
 * Entry point into the three specialist service pages, rendered on both the
 * homepage and the `/services` hub.
 *
 * Each card leads with who the engagement is for, because the useful question
 * at this point in the page is "is this me?" rather than "what is this called".
 * Keeping the set here means the hub and the homepage cannot drift apart, and
 * the specialist pages get a real contextual link from both.
 */
const SPECIALIST_SERVICES = [
  {
    to: "/services/ai-chatbot-development",
    name: "AI chatbot development",
    linkLabel: "Read the AI chatbot development page",
    audience: "For support and sales teams whose inbox is mostly repeat questions.",
    body:
      "Custom conversational AI wired into your own order data, help centre, and CRM — answering the routine majority in context and handing the rest to a human with the transcript attached.",
  },
  {
    to: "/services/forward-deployed-engineer",
    name: "Forward deployed engineer",
    linkLabel: "Read the forward deployed engineer page",
    audience: "For organisations whose blocker is implementation, not advice.",
    body:
      "A senior engineer embedded in your workflow, owning discovery through deployment and iteration. For the project that has already survived one roadmap and never shipped.",
  },
  {
    to: "/services/custom-ai-software",
    name: "Custom AI software",
    linkLabel: "Read the custom AI software page",
    audience: "For teams who have outgrown SaaS and low-code on one specific problem.",
    body:
      "AI agents, retrieval systems, integrations, and internal tools built around your own business logic — deployed to your environment and handed over with the source.",
  },
];

/**
 * `showHubLink` is off on /services itself, where the closing link would be a
 * self-link. Everywhere else it is the in-content route into the hub.
 */
export const SpecialistServicesSection = ({ showHubLink = true }: { showHubLink?: boolean }) => (
  <section className="py-20 md:py-28 bg-primary">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <ChapterMarker number="" label="Specialist Services" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
              Three engagements,
              <span className="block font-normal text-gradient">three different problems.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:pt-14">
            <p className="text-lg leading-relaxed text-primary-foreground/75">
              Most work starts as a general automation conversation. These are the three shapes it usually
              turns into — each with its own page covering scope, fit, process, and the cases where we would
              tell you to do something else.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {SPECIALIST_SERVICES.map((service, index) => (
            <BentoTile
              key={service.to}
              tone={index === 0 ? "feature" : index === 1 ? "flat" : "recessed"}
              rounded="xl"
              className="flex flex-col p-7 md:p-9"
            >
              <h3 className="text-xl font-bold text-primary-foreground md:text-2xl">
                <Link
                  to={service.to}
                  className="cursor-pointer transition-colors duration-200 hover:text-accent"
                >
                  {service.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-accent">{service.audience}</p>
              <div className="hairline-soft my-6" aria-hidden="true" />
              <p className="text-base leading-relaxed text-primary-foreground/75">{service.body}</p>
              <Link
                to={service.to}
                className="mt-8 inline-flex cursor-pointer items-center gap-2 text-sm text-primary-foreground/80 transition-colors duration-200 hover:text-accent"
              >
                <span className="border-b border-primary-foreground/25 pb-0.5">{service.linkLabel}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </BentoTile>
          ))}
        </div>

        {showHubLink && (
          <p className="mt-12 text-base text-primary-foreground/70">
            Not sure which one fits? Start with the full{" "}
            <Link
              to="/services"
              className="cursor-pointer text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              AI automation services overview
            </Link>{" "}
            — it covers how we scope, build, and hand over every engagement.
          </p>
        )}
      </div>
    </div>
  </section>
);
