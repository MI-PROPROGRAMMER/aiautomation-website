import { BrandLogo } from "@/components/ui/BrandLogo";
import { MarqueeRow } from "@/components/ui/editorial";

/**
 * LogoWall — sits directly under the Hero. Two roles:
 *   1. Display client logos when supplied (drop SVGs in `public/logos/clients/`
 *      and add to CLIENT_LOGOS below).
 *   2. Until then, fall back to "Built on" tool/integration brand SVGs so the
 *      space still earns its keep.
 *
 * TODO: replace BUILT_ON brand wall with real client logo SVGs as they become
 * available. Anonymise (industry/region badges) where NDAs prevent named usage.
 */

const CLIENT_LOGOS: Array<{ src: string; alt: string }> = [
  // Drop SVGs in `/public/logos/clients/` and reference here:
  // { src: "/logos/clients/acme.svg", alt: "Acme Corp" },
];

const BUILT_ON: Array<{ name: Parameters<typeof BrandLogo>[0]["name"]; label: string }> = [
  { name: "openai", label: "OpenAI" },
  { name: "anthropic", label: "Anthropic" },
  { name: "zapier", label: "Zapier" },
  { name: "n8n", label: "n8n" },
  { name: "supabase", label: "Supabase" },
  { name: "vercel", label: "Vercel" },
  { name: "python", label: "Python" },
  { name: "nodedotjs", label: "Node.js" },
  { name: "slack", label: "Slack" },
  { name: "stripe", label: "Stripe" },
  { name: "github", label: "GitHub" },
  { name: "hubspot", label: "HubSpot" },
];

export const LogoWall = () => {
  const hasClientLogos = CLIENT_LOGOS.length > 0;

  return (
    <section className="relative bg-primary py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-3">
              <span className="hairline-soft h-px w-10" aria-hidden="true" />
              <span className="tech-label text-[0.65rem] text-primary-foreground/60">
                {hasClientLogos ? "Trusted by teams at" : "Built on the platforms your stack already runs"}
              </span>
              <span className="hairline-soft h-px w-10" aria-hidden="true" />
            </div>

            {hasClientLogos ? (
              <MarqueeRow ariaLabel="Client logos">
                {CLIENT_LOGOS.map((logo) => (
                  <img
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto opacity-60 grayscale transition hover:opacity-90 hover:grayscale-0 md:h-9"
                  />
                ))}
              </MarqueeRow>
            ) : (
              <MarqueeRow ariaLabel="Tools and platforms we work with">
                {BUILT_ON.map((tool) => (
                  <div
                    key={tool.label}
                    className="group flex items-center gap-3 text-primary-foreground/55 transition-colors hover:text-accent"
                    title={tool.label}
                  >
                    <BrandLogo name={tool.name} size={28} title={tool.label} />
                    <span className="tech-label text-[0.7rem]">{tool.label}</span>
                  </div>
                ))}
              </MarqueeRow>
            )}
          </div>
        </div>
      </div>
      <div className="hairline-soft absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2" aria-hidden="true" />
    </section>
  );
};
