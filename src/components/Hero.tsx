import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { HeroFrameSVG } from "@/components/hero/HeroFrameSVG";
import { HeroCoverOverlay } from "@/components/hero/HeroCoverOverlay";

/**
 * Hero — the cinematic scroll-expansion experience on every viewport.
 * Cover overlay splits on scroll → reveals the 5-stage workflow timeline.
 */
export const Hero = () => {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaContent={(progress) => <HeroFrameSVG progress={progress} />}
      bgContent={<HeroBackdrop />}
      overlayContent={(progress) => <HeroCoverOverlay progress={progress} />}
    >
      <div className="mx-auto max-w-5xl space-y-8 text-center">
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="tech-label text-primary-foreground/85">
            AI Automation · since 2021
          </span>
        </motion.div>

        <motion.p
          className="mx-auto max-w-3xl text-xl leading-relaxed text-primary-foreground/90 md:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Custom AI automation that hands your team back
          <span className="text-accent"> 40% of their week</span> — so they can focus on growth, strategy, and the work only humans can do.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        >
          <Button size="lg" className="gradient-accent px-10 py-6 text-base hover-lift glow-accent sheen-card" asChild>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              Book a free automation audit
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="group px-6 py-6 text-base text-primary-foreground/85 hover:bg-transparent hover:text-accent"
            asChild
          >
            <Link to="/#case-studies">
              <span className="border-b border-primary-foreground/20 pb-1 transition-colors group-hover:border-accent">
                See real outcomes
              </span>
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-md grid-cols-3 gap-x-6 gap-y-3 border-t border-accent/20 pt-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroStat label="years" value="4+" />
          <HeroStat label="clients" value="50+" />
          <HeroStat label="hrs automated" value="10K+" />
        </motion.div>
      </div>
    </ScrollExpandMedia>
  );
};

const HeroStat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="tech-numeral text-2xl font-semibold text-primary-foreground md:text-3xl">{value}</div>
    <div className="tech-label text-[0.6rem] text-primary-foreground/55">{label}</div>
  </div>
);
