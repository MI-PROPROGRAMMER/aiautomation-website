import { Shield, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterMarker, MarqueeRow } from "@/components/ui/editorial";
import { BrandLogo } from "@/components/ui/BrandLogo";

const TOOLS: Array<{ name: Parameters<typeof BrandLogo>[0]["name"]; label: string }> = [
  { name: "openai", label: "OpenAI" },
  { name: "anthropic", label: "Anthropic" },
  { name: "zapier", label: "Zapier" },
  { name: "n8n", label: "n8n" },
  { name: "supabase", label: "Supabase" },
  { name: "vercel", label: "Vercel" },
  { name: "python", label: "Python" },
  { name: "nodedotjs", label: "Node.js" },
  { name: "postgresql", label: "PostgreSQL" },
  { name: "github", label: "GitHub" },
  { name: "slack", label: "Slack" },
  { name: "hubspot", label: "HubSpot" },
  { name: "notion", label: "Notion" },
  { name: "airtable", label: "Airtable" },
  { name: "stripe", label: "Stripe" },
  { name: "amazonaws", label: "AWS" },
];

export const ToolsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Enterprise-grade security",
      description: "Bank-level encryption and compliance built in from day one.",
    },
    {
      icon: TrendingUp,
      title: "Built to scale",
      description: "Architecture that grows with your business — no rebuilds at year two.",
    },
    {
      icon: Clock,
      title: "Always on",
      description: "Proactive monitoring, alerting, and instant resolution. Always.",
    },
  ];

  return (
    <section className="py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-16 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <ChapterMarker number="06" label="Toolkit" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Tool-agnostic.
                <span className="block text-3xl font-normal text-primary-foreground/85 md:text-5xl">
                  Expert in <span className="text-gradient">the best.</span>
                </span>
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                We pick the right tool for the problem — never the other way around. From enterprise SaaS
                connectors to bespoke Python pipelines, we work in the stack that fits.
              </p>
            </div>
          </div>

          {/* Marquee row of real brand SVGs */}
          <div className="my-16">
            <div className="hairline-soft mb-10" aria-hidden="true" />
            <MarqueeRow ariaLabel="Tools and platforms we work with">
              {TOOLS.map((tool) => (
                <div
                  key={tool.label}
                  className="group flex items-center gap-3 text-primary-foreground/55 transition-colors hover:text-accent"
                  title={tool.label}
                >
                  <BrandLogo name={tool.name} size={32} title={tool.label} />
                  <span className="tech-label text-[0.7rem]">
                    {tool.label}
                  </span>
                </div>
              ))}
            </MarqueeRow>
            <div className="hairline-soft mt-10" aria-hidden="true" />
          </div>

          {/* Benefits — typographic, NOT boxes */}
          <div className="mt-24 grid gap-12 md:grid-cols-3 md:gap-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="border-t border-accent/40 pt-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <benefit.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-6 text-2xl font-bold text-primary-foreground md:text-3xl">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
