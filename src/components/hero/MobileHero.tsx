import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";

/**
 * MobileHero — static, vertical, premium hero for mobile/tablet under 768px.
 * No scroll-jacking, no fixed-width SVG. Pure responsive HTML.
 *
 * Same brand language as the desktop hero — animated mesh backdrop, big
 * serif headline split across a hairline, eyebrow, subtitle, stats, CTAs.
 */
export const MobileHero = () => {
  return (
    <section className="relative overflow-hidden bg-primary pt-28 pb-20">
      <HeroBackdrop />

      <div className="container relative z-10 mx-auto px-5">
        <div className="mx-auto max-w-xl">
          {/* Eyebrow */}
          <motion.div
            className="mb-8 flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <span className="tech-label text-[0.65rem] text-primary-foreground/85">
              AI Automation · since 2021
            </span>
          </motion.div>

          {/* Top headline */}
          <motion.h1
            className="font-display font-bold leading-[0.9] tracking-[-0.04em] text-primary-foreground"
            style={{ fontSize: "clamp(3.25rem, 14vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Automate
          </motion.h1>

          {/* Hairline + pulse */}
          <motion.div
            className="relative my-4 h-3"
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          >
            <div
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--accent) / 0.7) 0%, hsl(var(--accent) / 0.35) 60%, transparent 100%)",
              }}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2">
              <span className="relative block h-1.5 w-1.5">
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </span>
          </motion.div>

          {/* Bottom headline */}
          <motion.h1
            className="font-display font-bold italic leading-[0.9] tracking-[-0.04em] text-primary-foreground"
            style={{ fontSize: "clamp(3.25rem, 14vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            the grind.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-8 text-base leading-relaxed text-primary-foreground/80 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Custom AI automation that hands your team back{" "}
            <span className="font-semibold text-accent">40% of their week</span> — so they can focus on
            growth, strategy, and the work only humans can do.
          </motion.p>

          {/* CTAs — stacked, full width, big touch targets */}
          <motion.div
            className="mt-10 flex flex-col gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="gradient-accent hover-lift glow-accent sheen-card w-full py-7 text-base"
              asChild
            >
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Book a free automation audit
                <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-accent/40 py-7 text-base text-primary-foreground hover:bg-accent/10 hover:text-accent"
              asChild
            >
              <Link to="/#case-studies">See real outcomes</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-14 grid grid-cols-3 gap-x-4 gap-y-3 border-t border-accent/20 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Stat label="years" value="4+" />
            <Stat label="clients" value="50+" />
            <Stat label="hrs automated" value="10K+" />
          </motion.div>

          {/* Scroll affordance */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="tech-label text-[0.6rem] text-primary-foreground/55">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-accent" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="tech-numeral text-2xl font-semibold text-primary-foreground sm:text-3xl">
      {value}
    </div>
    <div className="tech-label text-[0.6rem] text-primary-foreground/55">{label}</div>
  </div>
);
