import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export const PremiumBackground = () => {
  const isMobile = useIsMobile();

  // On mobile we render static orbs with a smaller blur radius — the animated
  // blur filters were the dominant cost in mobile profiling.
  if (isMobile) {
    return (
      <div
        className="premium-background pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-accent/15 blur-[60px]" />
        <div className="absolute -right-20 top-[30%] h-64 w-64 rounded-full bg-cyan-300/10 blur-[70px]" />
        <div className="absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-foreground/10 blur-[70px]" />
        <div className="premium-vignette absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="premium-background pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-accent/20 blur-[100px]"
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8rem] top-[28%] h-96 w-96 rounded-full bg-cyan-300/15 blur-[120px]"
        animate={{ x: [0, -40, 15, 0], y: [0, 30, -10, 0], scale: [1, 0.95, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-[-7rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary-foreground/10 blur-[140px]"
        animate={{ y: [0, -18, 12, 0], opacity: [0.45, 0.55, 0.4, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <div className="premium-noise absolute inset-0 opacity-[0.12]" />
      <div className="premium-vignette absolute inset-0" />
    </div>
  );
};
