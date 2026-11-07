import { useEffect, useRef, type ReactNode } from "react";
import "./tangle-hero.css";

/**
 * TangleHero: the opening of the home page, told as a scroll story.
 * A tangle of threads (your operations today) is analysed, then resolves into
 * one clean line across the middle. The screen then splits along that line and
 * the two halves slide apart, revealing the content passed in as children.
 *
 * Canvas only, one requestAnimationFrame loop that runs only while the hero is
 * on screen. The first phase is server-rendered visible, so the prerendered
 * HTML is never blank. Reduced motion shows the resolved line and skips the loop.
 */

const PHASES = [
  { from: 0, to: 0.09, title: "Your operations, right now.", body: "Spreadsheets, inboxes, copy and paste, and follow-ups nobody owns.", lead: true },
  { from: 0.09, to: 0.33, title: "Analyze.", body: "We find where the hours and the money leak out of your week." },
  { from: 0.33, to: 0.56, title: "Automate.", body: "Agents and workflows take the repetitive work. Your team approves what matters." },
  { from: 0.56, to: 1.01, title: "Apexify.", body: "One system your team trusts, built around how you already work." },
];

/** Where time leaks out: marked on the tangle while "Analyze." is on screen. */
const LEAKS = [
  { x: 17, y: 27, label: "Copy and paste, 6 h a week" },
  { x: 44, y: 18, label: "Follow-up nobody owns" },
  { x: 58, y: 46, label: "Approval stuck in an inbox" },
  { x: 81, y: 24, label: "Same data in three sheets", left: true },
  { x: 76, y: 66, label: "Lead lost after hours", left: true },
  { x: 33, y: 44, label: "Stock checked by phone" },
];

const SPLIT_FROM = 0.78, SPLIT_LEN = 0.17; // the screen splits open over this part of the scroll

/** Small seeded random, so the tangle is identical on every load and every resize. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Strand = {
  amp: number; off: number; f1: number; f2: number; ph1: number; ph2: number;
  s1: number; s2: number; loop: number; f3: number; ph3: number; delay: number; a: number;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const TangleHero = ({ children }: { children?: ReactNode }) => {
  const stageRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const leaksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current, cv = canvasRef.current;
    if (!wrap || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, strands: Strand[] = [], visible = true, raf = 0;
    let pc: number | null = null;
    const t0 = performance.now();

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = W < 720 ? 22 : 46;
      const r = seeded(2021);
      const rand = (a: number, b: number) => a + r() * (b - a);
      strands = Array.from({ length: n }, () => ({
        amp: rand(0.08, 0.42) * H, off: rand(-0.32, 0.32) * H,
        f1: rand(1.2, 4.2), f2: rand(3, 9), ph1: rand(0, 6.28), ph2: rand(0, 6.28),
        s1: rand(0.15, 0.5), s2: rand(0.1, 0.4), loop: rand(20, 120), f3: rand(2, 6), ph3: rand(0, 6.28),
        delay: r(), a: rand(0.14, 0.34),
      }));
    };

    const draw = (now: number, q: number) => {
      const t = RM ? 0 : (now - t0) / 1000;
      const cy = H * 0.5, M = W < 720 ? 60 : 110; // the clean line lands on the seam the screen splits along
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (const s of strands) {
        const k = ease(clamp((q * 1.7 - s.delay * 0.7) / 0.9));
        if (k > 0.995) continue; // resolved strands sit under the clean line
        const chaos = 1 - k;
        ctx.beginPath();
        for (let i = 0; i <= M; i++) {
          const u = i / M, x = -0.05 * W + u * 1.1 * W;
          const yN = cy + s.off + s.amp * (Math.sin(u * s.f1 * 6.28 + s.ph1 + t * s.s1) * 0.62 + Math.sin(u * s.f2 * 6.28 + s.ph2 - t * s.s2) * 0.38);
          const xN = x + s.loop * Math.sin(u * s.f3 * 6.28 + s.ph3 + t * 0.3);
          const xx = xN * chaos + x * k, yy = yN * chaos + cy * k;
          if (i) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy);
        }
        ctx.strokeStyle = `rgba(214,232,245,${s.a * 0.8 * (1 - k * 0.7)})`;
        ctx.stroke();
      }
      // The clean line, then its drop out of the hero.
      const g = clamp((q - 0.45) / 0.4);
      if (g > 0) {
        ctx.save();
        ctx.shadowColor = "rgba(0,181,226,0.9)";
        ctx.shadowBlur = 22 * g;
        ctx.strokeStyle = `rgba(0,181,226,${0.4 + 0.6 * g})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(W * g, cy);
        ctx.stroke();
        ctx.restore();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const span = wrap.offsetHeight - window.innerHeight;
      const top = wrap.getBoundingClientRect().top;
      const p = RM ? 1 : clamp(-top / Math.max(1, span));
      let cur = pc == null ? p : pc + (p - pc) * 0.12;
      if (Math.abs(p - cur) < 1e-4) cur = p;
      pc = cur;
      const q = clamp((cur - 0.22) / 0.48); // the tangle holds while it is analysed, then resolves
      const split = ease(clamp((cur - SPLIT_FROM) / SPLIT_LEN));
      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--split", split.toFixed(4));
        stage.classList.toggle("is-splitting", split > 0.001);
        stage.classList.toggle("is-open", split > 0.98);
      }
      if (split < 0.001) draw(now, q);
      hintRef.current?.classList.toggle("is-gone", cur > 0.04);
      const analyzing = cur >= PHASES[1].from && cur < PHASES[1].to;
      leaksRef.current?.classList.toggle("is-on", analyzing);
      PHASES.forEach((ph, i) => {
        const el = phaseRefs.current[i];
        const on = cur >= ph.from && cur < ph.to;
        if (el && on !== el.classList.contains("is-on")) el.classList.toggle("is-on", on);
        barRefs.current[i]?.classList.toggle("is-on", cur >= ph.from);
      });
    };

    setup();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(setup, 150); };
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="tangle-hero" ref={wrapRef}>
      <section className="tangle-hero__stage" ref={stageRef} aria-label="From messy operations to one system">
        {/* What the split reveals */}
        <div className="tangle-hero__reveal">{children}</div>

        <div className="tangle-hero__cover">
        <canvas ref={canvasRef} className="tangle-hero__canvas" aria-hidden="true" />
        <div className="tangle-hero__leaks" ref={leaksRef} aria-hidden="true">
          {LEAKS.map((l, i) => (
            <span
              key={l.label}
              className={`tangle-hero__leak${l.left ? " is-left" : ""}`}
              style={{ left: `${l.x}%`, top: `${l.y}%`, ["--i" as string]: i }}
            >
              <i className="tangle-hero__ring" />
              <i className="tangle-hero__ring is-late" />
              <i className="tangle-hero__dot" />
              <em>{l.label}</em>
            </span>
          ))}
        </div>
        {PHASES.map((ph, i) => (
          <div
            key={ph.title}
            className={`tangle-hero__phase${i === 0 ? " is-on" : ""}${ph.lead ? " is-lead" : ""}${i === PHASES.length - 1 ? " is-final" : ""}`}
            ref={(el) => { phaseRefs.current[i] = el; }}
          >
            <p className="tangle-hero__title">{ph.title}</p>
            <p className="tangle-hero__body">{ph.body}</p>
          </div>
        ))}
        <div className="tangle-hero__bar" aria-hidden="true">
          {PHASES.map((ph, i) => <i key={ph.title} ref={(el) => { barRefs.current[i] = el; }} />)}
        </div>
        <p className="tangle-hero__hint tech-label" ref={hintRef}>Scroll to untangle</p>
        </div>

        {/* The two halves that slide apart along the line */}
        <div className="tangle-hero__half is-top" aria-hidden="true" />
        <div className="tangle-hero__half is-bottom" aria-hidden="true">
          <div className="tangle-hero__phase is-on is-final">
            <p className="tangle-hero__title">{PHASES[PHASES.length - 1].title}</p>
            <p className="tangle-hero__body">{PHASES[PHASES.length - 1].body}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
