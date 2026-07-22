"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const BASE = "#0E1116";
const SURFACE = "#1C2530";
const PAPER = "#F7F5F0";
const SIGNAL = "#2F6FED";
const ALERT = "#E8503A";
const EASE = "cubic-bezier(0.22,1,0.36,1)";

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------ */
/*  useStepObserver — the signature: IntersectionObserver flips the    */
/*  sticky canvas between discrete states as steps cross center.       */
/* ------------------------------------------------------------------ */

function useStepObserver(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [count]);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el;
  };

  return { active, setRef };
}

/* ------------------------------------------------------------------ */
/*  CountUp — animates to value, but the real number lives in the DOM  */
/*  (aria-label) so screen readers and SEO always get the truth.       */
/* ------------------------------------------------------------------ */

function CountUp({ to, className = "", format = (n: number) => n.toLocaleString() }: { to: number; className?: string; format?: (n: number) => string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      if (prefersReduced()) {
        setDisplay(to);
        return;
      }
      const dur = 1100;
      let t0 = 0;
      const tick = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className} aria-label={format(to)}>
      <span aria-hidden="true">{format(display)}</span>
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ${EASE} ${delay}s, transform 0.6s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll progress rule                                               */
/* ------------------------------------------------------------------ */

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/* ------------------------------------------------------------------ */
/*  Story data — a small unemployment-vs-openings crossover narrative  */
/* ------------------------------------------------------------------ */

const CHART_W = 520;
const CHART_H = 320;
const seriesA = [72, 60, 64, 48, 40, 30, 22, 18]; // "line 1"
const seriesB = [20, 26, 30, 42, 46, 55, 66, 78]; // "line 2"
const years = ["17", "18", "19", "20", "21", "22", "23", "24"];

function pointsFor(data: number[]) {
  const n = data.length;
  return data.map((v, i) => {
    const x = (i / (n - 1)) * (CHART_W - 40) + 20;
    const y = CHART_H - 30 - (v / 100) * (CHART_H - 60);
    return [x, y] as const;
  });
}

const ptsA = pointsFor(seriesA);
const ptsB = pointsFor(seriesB);
const crossIdx = 3; // where they meet-ish

const steps = [
  { title: "One line, falling", body: "We start with a single series — a rate sliding downward across eight years. Nothing else on the canvas yet." },
  { title: "A second line appears", body: "Now a counter-series fades in and climbs. Two trends, moving in opposite directions." },
  { title: "They cross", body: "Around 2020 the lines meet and swap order. This crossover is the whole point of the story." },
  { title: "The gap widens", body: "After the crossover the distance between them grows fast — the reversal isn't a blip, it's a trend." },
  { title: "Where it lands", body: "By 2024 the reversal is complete. The number that started at the top now sits at the bottom." },
];

const paletteSwatches = [
  { name: "Base", value: BASE, label: "Feature stage", text: PAPER },
  { name: "Surface", value: SURFACE, label: "Panels & inputs", text: PAPER },
  { name: "Paper", value: PAPER, label: "Text & data ink", text: BASE },
  { name: "Signal", value: SIGNAL, label: "Current focus", text: PAPER },
  { name: "Alert", value: ALERT, label: "Contrast moment", text: PAPER },
];

/* ------------------------------------------------------------------ */
/*  The sticky canvas — discrete states 0..4                           */
/* ------------------------------------------------------------------ */

function StoryCanvas({ active }: { active: number }) {
  const lineA = `M ${ptsA.map((p) => p.join(",")).join(" L ")}`;
  const lineB = `M ${ptsB.map((p) => p.join(",")).join(" L ")}`;
  const cross = ptsA[crossIdx];

  return (
    <div className="relative w-full max-w-xl aspect-[520/320]">
      <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-full" role="img" aria-label="Two series crossing over eight years; the falling line ends lowest.">
        {/* grid baseline */}
        <line x1="20" y1={CHART_H - 30} x2={CHART_W - 20} y2={CHART_H - 30} stroke={PAPER} strokeOpacity="0.15" />
        {years.map((yr, i) => (
          <text key={yr} x={(i / (years.length - 1)) * (CHART_W - 40) + 20} y={CHART_H - 12} fill={PAPER} fillOpacity="0.4" fontSize="11" textAnchor="middle" fontFamily="ui-monospace, monospace">
            &rsquo;{yr}
          </text>
        ))}

        {/* Line A — always present from step 0 */}
        <path
          d={lineA}
          fill="none"
          stroke={active >= 2 ? PAPER : SIGNAL}
          strokeOpacity={active >= 2 ? 0.5 : 1}
          strokeWidth="3"
          className="st-path"
          style={{ transition: `stroke 0.6s ${EASE}, stroke-opacity 0.6s ${EASE}` }}
        />

        {/* Line B — appears at step 1 */}
        <path
          d={lineB}
          fill="none"
          stroke={SIGNAL}
          strokeWidth="3"
          style={{
            opacity: active >= 1 ? 1 : 0,
            transition: `opacity 0.6s ${EASE}`,
          }}
        />

        {/* Crossover marker — step 2 */}
        <g style={{ opacity: active >= 2 ? 1 : 0, transition: `opacity 0.5s ${EASE}` }}>
          <line x1={cross[0]} y1="20" x2={cross[0]} y2={CHART_H - 30} stroke={ALERT} strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
          <circle cx={cross[0]} cy={cross[1]} r="7" fill={ALERT} />
          <text x={cross[0] + 12} y="34" fill={ALERT} fontSize="12" fontFamily="ui-monospace, monospace">crossover</text>
        </g>

        {/* Widening gap band — step 3 */}
        <path
          d={`M ${ptsA.slice(crossIdx).map((p) => p.join(",")).join(" L ")} L ${ptsB.slice(crossIdx).reverse().map((p) => p.join(",")).join(" L ")} Z`}
          fill={ALERT}
          style={{ opacity: active >= 3 ? 0.12 : 0, transition: `opacity 0.6s ${EASE}` }}
        />

        {/* End dots — step 4 */}
        <g style={{ opacity: active >= 4 ? 1 : 0, transition: `opacity 0.5s ${EASE}` }}>
          <circle cx={ptsA[ptsA.length - 1][0]} cy={ptsA[ptsA.length - 1][1]} r="6" fill={PAPER} />
          <circle cx={ptsB[ptsB.length - 1][0]} cy={ptsB[ptsB.length - 1][1]} r="6" fill={SIGNAL} />
        </g>
      </svg>

      {/* step indicator */}
      <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-2">
        <span className="font-mono text-[11px] text-[#2F6FED] tabular-nums">STEP 0{active + 1} / 05</span>
        <div className="flex gap-1.5 flex-1">
          {steps.map((_, i) => (
            <span key={i} className="h-1 flex-1 rounded-full" style={{ backgroundColor: i === active ? SIGNAL : "rgba(247,245,240,0.15)", transition: `background-color 0.4s ${EASE}` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section head                                                       */
/* ------------------------------------------------------------------ */

function SectionHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-sm text-[#2F6FED] tabular-nums">{no}</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F7F5F0]/45">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F5F0] tracking-tight leading-[1.05] max-w-2xl">{title}</h2>
        {sub && <p className="mt-4 md:mt-0 text-[#F7F5F0]/55 text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </Reveal>
  );
}

type ComponentTab = "buttons" | "cards" | "inputs";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { active, setRef } = useStepObserver(steps.length);
  const [tab, setTab] = useState<ComponentTab>("buttons");
  const progress = useScrollProgress();

  return (
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: BASE, color: PAPER }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .st-path, [style*="transition"] { transition: none !important; }
        }
      `}</style>

      {/* progress rule */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full origin-left" style={{ backgroundColor: SIGNAL, transform: `scaleX(${progress})` }} />
      </div>

      {/* ============================================================ */}
      {/* NAV                                                          */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0E1116]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/styles/scrollytelling" className="group flex items-center gap-1.5 text-[#F7F5F0]/60 hover:text-[#F7F5F0] text-sm transition-colors duration-300">
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <span className="hidden sm:block text-white/15">/</span>
            <span className="hidden sm:block font-bold text-[#F7F5F0] tracking-tight">The Feature</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#F7F5F0]/60">
            {[
              { label: "Story", href: "#story" },
              { label: "Anatomy", href: "#anatomy" },
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#F7F5F0] transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/" className="text-sm text-[#F7F5F0]/70 hover:text-[#2F6FED] font-semibold transition-colors duration-300">
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#2F6FED] mb-6 block">Data Feature</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#F7F5F0] max-w-4xl leading-[1.03] tracking-tight">
            Scroll to watch the<br />numbers <span className="text-[#2F6FED]">move</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-[#F7F5F0]/60 max-w-xl mx-auto">
            A sticky canvas, stepped narration, one focus at a time &mdash; the grammar of a scroll-driven data story.
          </p>
          <a href="#story" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#2F6FED] text-white font-semibold hover:bg-[#2560d4] transition-colors duration-200">
            Start the story <span aria-hidden>&darr;</span>
          </a>
        </Reveal>
        <span className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-[#F7F5F0]/40 animate-bounce">Scroll</span>
      </section>

      {/* ============================================================ */}
      {/* STORY — the sticky-canvas scrolly                            */}
      {/* ============================================================ */}
      <section id="story" className="scroll-mt-14 relative px-5 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Sticky canvas */}
          <div className="md:sticky md:top-0 md:h-screen flex items-center justify-center py-10 md:py-0 z-10">
            <div className="w-full bg-[#141A22] border border-white/10 rounded-lg p-6 md:p-8">
              <StoryCanvas active={active} />
            </div>
          </div>

          {/* Steps */}
          <div>
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={setRef(i)}
                data-step={i}
                className="min-h-[80vh] flex items-center"
              >
                <div
                  className="relative pl-6 border-l-2 py-4 transition-colors duration-500"
                  style={{ borderColor: active === i ? SIGNAL : "rgba(247,245,240,0.15)" }}
                >
                  <span
                    className="absolute -left-[9px] top-6 w-4 h-4 rounded-full ring-4 ring-[#0E1116] transition-colors duration-500"
                    style={{ backgroundColor: active === i ? SIGNAL : "rgba(247,245,240,0.25)" }}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#2F6FED]">Step 0{i + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F7F5F0] mt-2 mb-3">{step.title}</h3>
                  <p className="text-[#F7F5F0]/70 leading-relaxed max-w-[40ch]">{step.body}</p>
                  {i === 4 && (
                    <p className="mt-5 text-5xl font-bold text-[#F7F5F0]">
                      <CountUp to={1240} className="text-[#E8503A]" /> <span className="text-2xl font-normal text-[#F7F5F0]/50">cross the line</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ANATOMY                                                      */}
      {/* ============================================================ */}
      <section id="anatomy" className="scroll-mt-14 py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="A"
            kicker="Anatomy"
            title="How the scrolly is wired"
            sub="No continuous scrub, no layout thrash. A sticky canvas plus IntersectionObserver-triggered discrete states — readable, maintainable, accessible."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { n: "01", t: "Sticky canvas", d: "position: sticky; top: 0; height: 100vh pins the visualization while the text column scrolls beside it." },
              { n: "02", t: "IntersectionObserver steps", d: "Each step block is observed with rootMargin -45% 0px -45%, so the canvas flips state only when a step is centered." },
              { n: "03", t: "Discrete states", d: "The canvas moves between a handful of explicit states (0-4) with transform/opacity — never a per-pixel scroll scrub." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08}>
                <div className="border-t border-white/12 pt-5">
                  <span className="font-mono text-xs text-[#2F6FED]">{item.n}</span>
                  <h3 className="text-xl font-bold text-[#F7F5F0] mt-2 mb-2">{item.t}</h3>
                  <p className="text-[#F7F5F0]/60 text-sm leading-relaxed">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12">
            <div className="bg-[#141A22] border border-white/10 rounded-lg p-6 overflow-x-auto">
              <pre className="font-mono text-[12px] leading-relaxed text-[#F7F5F0]/80"><code>{`const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) setState(Number(e.target.dataset.step));
  });
}, { rootMargin: "-45% 0px -45% 0px" });   `}<span style={{ color: "#6b7684" }}>{`// fire when centered`}</span>{`
steps.forEach((s) => io.observe(s));`}</code></pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE                                                      */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-14 py-24 md:py-32 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="B"
            kicker="Palette"
            title="Dark stage, one signal, one alert"
            sub="A deep feature base, a signal blue that marks the current focus, and a vermilion reserved for the single contrast moment."
          />
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paletteSwatches.map((s) => (
                <div key={s.name} className="group">
                  <div className="h-28 rounded-lg border border-white/10 flex items-end p-3 transition-transform duration-500 group-hover:-translate-y-1" style={{ backgroundColor: s.value }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: s.text, opacity: 0.75 }}>{s.value}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#F7F5F0]">{s.name}</div>
                  <div className="text-xs text-[#F7F5F0]/50">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS                                                   */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-14 py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="C"
            kicker="Components"
            title="Built for reading data"
            sub="Clear focus rings, step rails, dark form fields — the controls of an interactive feature, not a marketing page."
          />
          <Reveal className="mb-10">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs"] as ComponentTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-md text-sm font-semibold capitalize transition-colors duration-200 ${
                    tab === t ? "bg-[#2F6FED] text-white" : "bg-[#1C2530] text-[#F7F5F0]/60 hover:text-[#F7F5F0]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="bg-[#141A22] border border-white/10 rounded-lg p-8 md:p-12 min-h-[240px]">
              {tab === "buttons" && (
                <div className="flex flex-wrap items-center gap-5">
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#2F6FED] text-white font-semibold text-sm hover:bg-[#2560d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141A22] transition-all duration-200">
                    Next chapter <span aria-hidden>&darr;</span>
                  </button>
                  <button className="px-5 py-2.5 rounded-md bg-[#E8503A] text-white font-semibold text-sm hover:bg-[#d4402c] transition-colors duration-200">
                    Alert state
                  </button>
                  <button className="px-5 py-2.5 rounded-md bg-transparent border border-white/15 text-[#F7F5F0]/70 font-semibold text-sm hover:text-[#F7F5F0] hover:border-white/30 transition-colors duration-200">
                    Ghost
                  </button>
                </div>
              )}

              {tab === "cards" && (
                <div className="space-y-6 max-w-lg">
                  {[
                    { n: "01", t: "Active step", active: true, b: "The current step lights its rail and dot in signal blue." },
                    { n: "02", t: "Idle step", active: false, b: "Steps not in focus keep a muted rail so the reader tracks position." },
                  ].map((c) => (
                    <div key={c.n} className="relative pl-6 border-l-2 py-4" style={{ borderColor: c.active ? SIGNAL : "rgba(247,245,240,0.15)" }}>
                      <span className="absolute -left-[9px] top-5 w-4 h-4 rounded-full ring-4 ring-[#141A22]" style={{ backgroundColor: c.active ? SIGNAL : "rgba(247,245,240,0.25)" }} />
                      <span className="font-mono text-xs uppercase tracking-widest text-[#2F6FED]">Step {c.n}</span>
                      <h4 className="text-xl font-bold text-[#F7F5F0] mt-1.5 mb-1">{c.t}</h4>
                      <p className="text-sm text-[#F7F5F0]/65 leading-relaxed">{c.b}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === "inputs" && (
                <div className="max-w-sm space-y-6">
                  <label className="block">
                    <span className="block text-sm text-[#F7F5F0]/60 mb-1.5">Jump to year</span>
                    <input type="number" placeholder="2024" className="w-full px-4 py-2.5 rounded-md bg-[#1C2530] border border-white/10 text-[#F7F5F0] placeholder-[#F7F5F0]/30 focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/30 transition-all duration-200" />
                  </label>
                  <label className="block">
                    <span className="block text-sm text-[#F7F5F0]/60 mb-1.5">Search the dataset</span>
                    <input type="text" placeholder="e.g. openings" className="w-full px-4 py-2.5 rounded-md bg-[#1C2530] border border-white/10 text-[#F7F5F0] placeholder-[#F7F5F0]/30 focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/30 transition-all duration-200" />
                  </label>
                  <button className="w-full px-5 py-2.5 rounded-md bg-[#2F6FED] text-white font-semibold text-sm hover:bg-[#2560d4] transition-colors duration-200">
                    Update chart
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <SectionHead no="D" kicker="Guidelines" title="Do / Don't" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#2F6FED] pt-6">
                <h3 className="text-2xl font-bold text-[#F7F5F0] mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Pin a sticky canvas; scroll text steps over it",
                    "Trigger discrete states with IntersectionObserver",
                    "Reveal one focus per step",
                    "Keep real numbers in the DOM (aria-label) beside count-ups",
                    "Transition canvas states with transform/opacity only",
                    "Make transitions instant under prefers-reduced-motion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F7F5F0]/75 leading-relaxed">
                      <span className="text-[#2F6FED] font-mono shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-white/25 pt-6">
                <h3 className="text-2xl font-bold text-[#F7F5F0]/60 mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Read offsetTop in a scroll handler for continuous scrub",
                    "Cram multiple new facts into one step",
                    "Animate layout props (top/width/height) on states",
                    "Let a count-up be the only source of a number",
                    "Let the canvas crowd out text on mobile",
                    "Use more than one signal and one alert color",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F7F5F0]/55 leading-relaxed">
                      <span className="text-[#F7F5F0]/35 font-mono shrink-0">&times;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="py-16 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="text-[#F7F5F0]/45 text-sm">Scrollytelling &mdash; scrolling is playback.</p>
          <Link href="/styles" className="group inline-flex items-center gap-2 text-sm text-[#F7F5F0]/60 hover:text-[#F7F5F0] transition-colors duration-300">
            <span aria-hidden className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
