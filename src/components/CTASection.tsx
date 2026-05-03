import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";
import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 gradient-hero">
      {/* Subtle accent rings */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-accent-glow/10 blur-[120px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Hairline marker */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="hairline h-px w-20" aria-hidden="true" />
            <span className="eyebrow">The next move</span>
            <span className="hairline h-px w-20" aria-hidden="true" />
          </div>

          <motion.h2
            className="text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Give your team
            <span className="block font-normal text-gradient">their time back.</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Book a free automation audit. We'll map your highest-leverage opportunities and quantify the
            time and money on the table — in 30 minutes, no commitment.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Button size="lg" className="gradient-accent hover-lift glow-accent text-base px-12 py-7 sheen-card" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Book your free audit
                <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators on a hairline */}
          <div className="mt-20">
            <div className="hairline-soft mx-auto mb-8 max-w-md" aria-hidden="true" />
            <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="smallcaps text-xs">No commitment required</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="smallcaps text-xs">30-minute consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="smallcaps text-xs">Custom recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
