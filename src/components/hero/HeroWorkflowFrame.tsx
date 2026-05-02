import { motion } from "framer-motion";
import { Inbox, Database, Sparkles, Send, type LucideIcon } from "lucide-react";

/**
 * HeroWorkflowFrame — the foreground "automation canvas" in the hero.
 * A stylised but realistic-looking workflow with named nodes:
 *   Lead Captured → Enrich (Clearbit) → Score (GPT-4) → Slack Notify
 * One node is "live" (pulsing) and an animated edge highlight travels through.
 *
 * This is the single most important visual on the site — it tells a buyer
 * "this is what we build" within the first scroll.
 */

interface Node {
  id: string;
  label: string;
  meta: string;
  icon: LucideIcon;
  active?: boolean;
}

const NODES: Node[] = [
  { id: "n1", label: "Lead Captured", meta: "trigger · webhook", icon: Inbox },
  { id: "n2", label: "Enrich", meta: "Clearbit API", icon: Database },
  { id: "n3", label: "Score", meta: "GPT-4 · prompt", icon: Sparkles, active: true },
  { id: "n4", label: "Slack Notify", meta: "#sales-pipeline", icon: Send },
];

export const HeroWorkflowFrame = () => {
  return (
    <div className="relative w-full">
      {/* Outer schematic frame */}
      <div className="lux-panel-feature relative overflow-hidden rounded-2xl border border-accent/30 p-5 md:p-7">
        {/* readout-bar header */}
        <div className="mb-5 flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="tech-label text-[0.65rem] text-primary-foreground/85">
              workflow · lead-routing-v3
            </span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="tech-label text-[0.6rem] text-primary-foreground/55">
              status
            </span>
            <span className="tech-label text-[0.6rem] text-accent">live</span>
          </div>
        </div>

        {/* Nodes row */}
        <div className="relative">
          {/* Background connecting line */}
          <div
            className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.45) 8%, hsl(var(--accent) / 0.45) 92%, transparent 100%)",
            }}
          />
          {/* Animated traveling pulse on the connector */}
          <motion.div
            className="absolute top-1/2 h-1 w-12 -translate-y-1/2 rounded-full"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--accent)) 50%, transparent 100%)",
              filter: "blur(1px)",
            }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />

          <ol className="relative grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-3">
            {NODES.map((node, i) => (
              <motion.li
                key={node.id}
                className="relative"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <NodeCard node={node} index={i} />
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Bottom readout strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-accent/10 pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <KeyValue k="runs · 24h" v="1,284" />
            <KeyValue k="avg latency" v="412ms" />
            <KeyValue k="error rate" v="0.04%" accent />
          </div>
          <span className="tech-label text-[0.6rem] text-primary-foreground/45">
            apexify · runtime
          </span>
        </div>
      </div>

      {/* "annotation" labels for marketing flavor */}
      <div className="pointer-events-none absolute -right-2 -top-3 hidden md:block">
        <span className="rounded-md border border-accent/40 bg-primary/85 px-2 py-1 backdrop-blur tech-label text-[0.6rem] text-accent">
          live preview
        </span>
      </div>
    </div>
  );
};

const NodeCard = ({ node, index }: { node: Node; index: number }) => {
  const Icon = node.icon;
  return (
    <div
      className={`relative rounded-xl border p-3 backdrop-blur transition md:p-4 ${
        node.active
          ? "border-accent/60 bg-accent/10 shadow-[0_0_24px_hsl(var(--accent)/0.35)]"
          : "border-accent/20 bg-primary/60"
      }`}
    >
      {/* Node id badge */}
      <div className="flex items-center justify-between">
        <span className="tech-label text-[0.55rem] text-primary-foreground/45">
          n{String(index + 1).padStart(2, "0")}
        </span>
        {node.active && (
          <span className="tech-label inline-flex items-center gap-1 text-[0.55rem] text-accent">
            <span className="inline-block h-1 w-1 rounded-full bg-accent animate-pulse" />
            running
          </span>
        )}
      </div>

      {/* Icon */}
      <div className="mt-2 flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${node.active ? "text-accent" : "text-primary-foreground/70"}`}
        />
        <span className="text-sm font-semibold text-primary-foreground md:text-base">
          {node.label}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-1 mono text-[0.65rem] text-primary-foreground/55">
        {node.meta}
      </div>
    </div>
  );
};

const KeyValue = ({ k, v, accent }: { k: string; v: string; accent?: boolean }) => (
  <span className="flex items-baseline gap-1.5">
    <span className="tech-label text-[0.55rem] text-primary-foreground/45">{k}</span>
    <span
      className={`tech-numeral text-[0.7rem] font-medium ${accent ? "text-accent" : "text-primary-foreground/85"}`}
    >
      {v}
    </span>
  </span>
);
