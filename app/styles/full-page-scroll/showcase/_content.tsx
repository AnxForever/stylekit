"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const miniScreens = [
  {
    id: 0,
    eyebrow: "Scene 01 / Brand",
    heading: "Make Every Frame Count",
    body: "Full-page scroll turns each viewport into a deliberate scene. Nothing is accidental — every pixel earns its place.",
    bg: "radial-gradient(ellipse at 60% 40%, #6366f1 0%, #000000 70%)",
    accent: "#6366f1",
  },
  {
    id: 1,
    eyebrow: "Scene 02 / Emotion",
    heading: "Scroll Is the Narrative",
    body: "Each snap transition is a page turn. Guide the reader from tension to resolution through motion alone.",
    bg: "radial-gradient(ellipse at 40% 60%, #ec4899 0%, #000000 70%)",
    accent: "#ec4899",
  },
  {
    id: 2,
    eyebrow: "Scene 03 / Resolution",
    heading: "Stillness Between Scenes",
    body: "The moment before the next snap is pure breath. Hold that stillness — then cut sharp.",
    bg: "radial-gradient(ellipse at 50% 30%, #14b8a6 0%, #000000 70%)",
    accent: "#14b8a6",
  },
];

const accentColors = [
  { name: "Indigo", hex: "#6366f1", use: "Brand & Identity", desc: "Primary brand color. Use for hero sections and primary CTAs." },
  { name: "Pink", hex: "#ec4899", use: "Emotion & Energy", desc: "High-emotion scenes. Draws the eye to moments of peak drama." },
  { name: "Teal", hex: "#14b8a6", use: "Nature & Calm", desc: "Resolution and closing scenes. Brings the narrative to rest." },
  { name: "Amber", hex: "#f59e0b", use: "Energy & Action", desc: "Transitional moments and action prompts. Urgency without aggression." },
];

const parallaxLayers = [
  {
    label: "Layer 1 — Eyebrow",
    delay: "delay-0",
    ms: "0ms",
    css: "group-hover:-translate-y-2 transition-transform duration-700 ease-out delay-0",
    role: "Category label or scene number. Leads the motion — exits stage first.",
    color: "#6366f1",
  },
  {
    label: "Layer 2 — Heading",
    delay: "delay-75",
    ms: "75ms",
    css: "group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 ease-out delay-75",
    role: "Primary message. Slight scale-up creates depth and cinematic weight.",
    color: "#ec4899",
  },
  {
    label: "Layer 3 — Body",
    delay: "delay-150",
    ms: "150ms",
    css: "group-hover:-translate-y-1 transition-transform duration-700 ease-out delay-150",
    role: "Supporting copy. Last to move, settling into place. Subtle — just 4px.",
    color: "#14b8a6",
  },
];

const doRules = [
  "Set scroll-snap-type: y mandatory on the outer container",
  "Each section gets scroll-snap-align: start for crisp snapping",
  "Use 100dvh for section height — dvh handles mobile browser chrome",
  "Stagger content layers with delay-0 / delay-75 / delay-150",
  "Keep the radial-gradient background breathing with group-hover:scale-110",
  "Use capsule nav dots to show position at a glance",
  "One strong visual statement per screen — no visual noise",
];

const dontRules = [
  "Never use overflow-y: scroll without snap — drift kills pacing",
  "Never cram two ideas into one screen — commit to one thought",
  "Never use horizontal scrolling inside vertical snap containers",
  "Never skip the scroll indicator on screen one — users need a hint",
  "Never rely on scroll-snap alone for mobile — test touch behavior",
];

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini Demo Component                                                */
/* ------------------------------------------------------------------ */

function MiniScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollTop / height);
      setActive(Math.max(0, Math.min(miniScreens.length - 1, index)));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * container.clientHeight, behavior: "smooth" });
  }, []);

  return (
    <div className="relative flex gap-4 items-center">
      {/* Demo Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden bg-black"
        style={{
          height: "480px",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
        }}
      >
        <style>{`
          .mini-scroll-container::-webkit-scrollbar { display: none; }
        `}</style>
        {miniScreens.map((screen) => (
          <div
            key={screen.id}
            className="group relative flex flex-col items-center justify-center text-white text-center px-8"
            style={{
              height: "480px",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            {/* Breathing background */}
            <div
              className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
              style={{ background: screen.bg }}
            />
            {/* Noise overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
            {/* Content layers */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* Layer 1: eyebrow — delay-0 */}
              <span
                className="text-xs tracking-[0.3em] uppercase font-mono transition-transform duration-700 ease-out group-hover:-translate-y-2"
                style={{ color: screen.accent, transitionDelay: "0ms" }}
              >
                {screen.eyebrow}
              </span>
              {/* Layer 2: heading — delay-75 */}
              <h3
                className="text-2xl md:text-3xl font-bold leading-tight max-w-xs transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                style={{ transitionDelay: "75ms" }}
              >
                {screen.heading}
              </h3>
              {/* Layer 3: body — delay-150 */}
              <p
                className="text-sm text-white/70 max-w-xs leading-relaxed transition-transform duration-700 ease-out group-hover:-translate-y-1"
                style={{ transitionDelay: "150ms" }}
              >
                {screen.body}
              </p>
            </div>
            {/* Scroll indicator on first screen */}
            {screen.id === 0 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Capsule Nav Dots */}
      <div className="flex flex-col items-center gap-2">
        {miniScreens.map((screen, i) => (
          <button
            key={screen.id}
            onClick={() => scrollTo(i)}
            aria-label={`Go to scene ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: "12px",
              height: active === i ? "40px" : "12px",
              borderRadius: "9999px",
              backgroundColor: active === i ? "#ffffff" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export default function FullPageScrollShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [sectionCount] = useState(7);
  const [activeNavSection, setActiveNavSection] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.section);
            setActiveNavSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <style>{`
        @keyframes fps-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fps-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fps-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .fps-hover-line {
          position: relative;
        }
        .fps-hover-line::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fps-hover-line:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Fixed Navigation                                                  */}
      {/* ---------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/styles/full-page-scroll/showcase"
              className="text-sm font-bold tracking-[0.2em] uppercase text-white"
            >
              Full Page Scroll
            </Link>
            <div className="flex items-center gap-6">
              {/* Section counter */}
              <span className="text-xs text-white/40 font-mono hidden md:block">
                {String(activeNavSection + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(sectionCount).padStart(2, "0")}
              </span>
              <Link
                href="/styles/full-page-scroll"
                className="fps-hover-line pb-0.5 text-xs tracking-[0.2em] uppercase text-white/60"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-[0.15em] uppercase text-white font-semibold border border-white/20 px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                StyleKit &rarr;
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Section 0 — Hero                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section
        data-section="0"
        className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden pt-16"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #000000 70%)" }}
      >
        {/* Animated grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Spinning ring decoration */}
        <div
          className="absolute top-24 right-12 md:right-24 w-24 h-24 hidden md:block pointer-events-none"
          style={{ animation: "fps-spin 20s linear infinite" }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white/10">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />
          </svg>
        </div>

        {/* Pulse ring */}
        <div className="absolute left-12 bottom-32 hidden lg:block pointer-events-none">
          <div className="relative w-4 h-4">
            <div
              className="absolute inset-0 rounded-full bg-indigo-500/40"
              style={{ animation: "fps-pulse-ring 2s cubic-bezier(0.16,1,0.3,1) infinite" }}
            />
            <div className="w-4 h-4 rounded-full bg-indigo-500" />
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-5xl px-6">
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(-12px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
            className="inline-block text-xs font-mono tracking-[0.4em] uppercase text-indigo-400 mb-6 border border-indigo-500/30 px-4 py-1.5 rounded-full"
          >
            Layout Style &mdash; Full Page Scroll
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                display: "block",
              }}
            >
              Cinematic
            </span>
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
                display: "block",
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                color: "transparent",
              }}
            >
              Scroll
            </span>
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
                display: "block",
              }}
            >
              Pacing.
            </span>
          </h1>

          <p
            className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            Each screen is a complete visual scene. Scroll is scene transition.
            No drift — only decisive cuts between fully-composed frames.
          </p>

          <div
            className="flex items-center justify-center gap-4 mt-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s",
            }}
          >
            <div className="h-px w-12 bg-white/20" />
            <span className="text-xs text-white/30 font-mono tracking-[0.3em] uppercase">scroll to explore</span>
            <div className="h-px w-12 bg-white/20" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 1 — Live Demo Panel                                      */}
      {/* ---------------------------------------------------------------- */}
      <section data-section="1" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-4">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-indigo-400">
            01 / Live Demo
          </span>
        </RevealBlock>
        <RevealBlock delay={0.05} className="mb-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Try It Now
          </h2>
        </RevealBlock>
        <RevealBlock delay={0.1} className="mb-12">
          <p className="text-white/50 text-base max-w-xl leading-relaxed">
            Hover over each screen to see the three-layer parallax in action.
            Use the capsule dots or scroll inside the demo container to advance scenes.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <MiniScrollDemo />
        </RevealBlock>

        {/* Feature callouts under the demo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {[
            { label: "scroll-snap-type: y mandatory", desc: "Hard snap — no drift between scenes", color: "#6366f1" },
            { label: "group-hover stagger", desc: "3 content layers, each with a different delay", color: "#ec4899" },
            { label: "Capsule nav dots", desc: "Pill shape for active, circle for inactive", color: "#14b8a6" },
          ].map((f) => (
            <RevealBlock key={f.label} delay={0.2}>
              <div className="border border-white/10 rounded-xl p-5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300">
                <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: f.color }} />
                <p className="text-xs font-mono text-white/80 mb-1">{f.label}</p>
                <p className="text-xs text-white/40">{f.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Marquee divider                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="w-full overflow-hidden border-y border-white/10 py-5 bg-black">
        <div className="flex" style={{ animation: "fps-marquee 20s linear infinite", width: "200%" }}>
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 flex items-center justify-around text-xs font-mono tracking-[0.3em] uppercase text-white/30">
              <span>Scroll Snap</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Full Page</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Cinematic</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Scene Transition</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Parallax Layers</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Section 2 — Parallax Interaction Rules                           */}
      {/* ---------------------------------------------------------------- */}
      <section data-section="2" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-4">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-pink-400">
            02 / Interaction
          </span>
        </RevealBlock>
        <RevealBlock delay={0.05} className="mb-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Three-Layer Parallax
          </h2>
        </RevealBlock>
        <RevealBlock delay={0.1} className="mb-16">
          <p className="text-white/50 text-base max-w-xl leading-relaxed">
            On hover, each content layer moves at a different time offset,
            creating the illusion of depth without any 3D transforms.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {parallaxLayers.map((layer, i) => (
            <RevealBlock key={layer.label} delay={i * 0.08}>
              <div
                className="group relative rounded-2xl overflow-hidden border border-white/10 p-6 bg-black hover:border-white/30 transition-all duration-500 cursor-default"
                style={{ minHeight: "280px" }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${layer.color}, transparent 70%)` }}
                />

                {/* Layer badge */}
                <div
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full border mb-6"
                  style={{ color: layer.color, borderColor: `${layer.color}40`, backgroundColor: `${layer.color}10` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                  {layer.delay} / {layer.ms}
                </div>

                <h3 className="text-lg font-bold mb-3 relative z-10">{layer.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 relative z-10">{layer.role}</p>

                {/* CSS snippet */}
                <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                  <code className="text-xs text-white/60 font-mono break-all leading-relaxed">{layer.css}</code>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Visual stagger diagram */}
        <RevealBlock delay={0.2}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-8">Timing Diagram</p>
            <div className="space-y-5">
              {parallaxLayers.map((layer, i) => (
                <div key={layer.label} className="flex items-center gap-4">
                  <span className="text-xs text-white/40 font-mono w-20 shrink-0">{layer.ms} delay</span>
                  <div className="flex-1 relative h-6 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end pr-3"
                      style={{
                        width: `${30 + i * 22}%`,
                        backgroundColor: layer.color,
                        opacity: 0.8,
                      }}
                    >
                      <span className="text-[10px] font-mono text-black font-bold">{layer.delay}</span>
                    </div>
                  </div>
                  <span className="text-xs text-white/40 font-mono w-20 shrink-0 text-right">700ms dur.</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/30 mt-6 leading-relaxed">
              All three transitions share the same 700ms duration and{" "}
              <code className="text-white/50">cubic-bezier(0.16, 1, 0.3, 1)</code> easing.
              Only the delay staggers — creating the cascade without changing speed.
            </p>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 3 — Color System                                         */}
      {/* ---------------------------------------------------------------- */}
      <section data-section="3" className="py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-teal-400">
              03 / Color System
            </span>
          </RevealBlock>
          <RevealBlock delay={0.05} className="mb-4">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Scene Palette
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <p className="text-white/50 text-base max-w-xl leading-relaxed">
              Each accent color owns a narrative purpose. Assign one per scene.
              Never mix two accents in the same screen — contrast is earned through separation.
            </p>
          </RevealBlock>
        </div>

        {/* Full-width color bands */}
        <div className="flex flex-col gap-0">
          {accentColors.map((color, i) => (
            <RevealBlock key={color.name} delay={i * 0.07}>
              <div
                className="group relative w-full py-10 md:py-14 px-6 md:px-12 overflow-hidden cursor-default"
                style={{ backgroundColor: color.hex }}
              >
                {/* Hover scale background */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-black/50 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-2xl md:text-4xl font-black text-black leading-none">{color.name}</h3>
                  </div>
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className="text-sm md:text-base font-medium text-black/70">{color.use}</span>
                    <code className="text-xs font-mono text-black/50 border border-black/20 px-3 py-1 rounded-full">{color.hex}</code>
                  </div>
                </div>
                {/* Desc on hover */}
                <div className="relative z-10 max-w-7xl mx-auto mt-3 overflow-hidden">
                  <p
                    className="text-sm text-black/60 max-w-lg transition-all duration-500"
                    style={{
                      maxHeight: "0",
                      opacity: 0,
                    }}
                  >
                    {color.desc}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Black and White base row */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 grid grid-cols-2 gap-4">
          {[
            { name: "Black", hex: "#000000", role: "Background — the void between scenes", textColor: "text-white/60" },
            { name: "White", hex: "#ffffff", role: "Typography — maximum contrast on dark", textColor: "text-black/60" },
          ].map((base) => (
            <RevealBlock key={base.name} delay={0.1}>
              <div
                className="rounded-xl py-8 px-6 flex items-center justify-between"
                style={{ backgroundColor: base.hex }}
              >
                <span className={`font-bold text-xl ${base.textColor.replace("/60", "")}`}>{base.name}</span>
                <div className="text-right">
                  <code className={`text-xs font-mono ${base.textColor}`}>{base.hex}</code>
                  <p className={`text-xs mt-1 ${base.textColor}`}>{base.role}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 4 — Nav Dot Anatomy                                       */}
      {/* ---------------------------------------------------------------- */}
      <section data-section="4" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-4">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400">
            04 / Navigation
          </span>
        </RevealBlock>
        <RevealBlock delay={0.05} className="mb-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Capsule Dot Nav
          </h2>
        </RevealBlock>
        <RevealBlock delay={0.1} className="mb-16">
          <p className="text-white/50 text-base max-w-xl leading-relaxed">
            A fixed sidebar of dots gives spatial context without crowding the scene.
            Active dot stretches into a capsule — position communicated through shape, not color alone.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dot States */}
          <RevealBlock delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-8">Dot States</p>
              <div className="space-y-8">
                {/* Inactive */}
                <div className="flex items-center gap-6">
                  <div className="w-8 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-1">Inactive</p>
                    <code className="text-xs font-mono text-white/40">w-3 h-3 rounded-full bg-white/30</code>
                  </div>
                </div>
                {/* Hover */}
                <div className="flex items-center gap-6">
                  <div className="w-8 flex justify-center">
                    <div className="w-3 h-6 rounded-full bg-white/80" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-1">Hover</p>
                    <code className="text-xs font-mono text-white/40">w-3 h-6 rounded-full bg-white/80</code>
                  </div>
                </div>
                {/* Active */}
                <div className="flex items-center gap-6">
                  <div className="w-8 flex justify-center">
                    <div className="w-3 h-10 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-1">Active</p>
                    <code className="text-xs font-mono text-white/40">w-3 h-10 rounded-full bg-white</code>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Transition code */}
          <RevealBlock delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 h-full">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-8">CSS Pattern</p>
              <div className="space-y-3">
                {[
                  "/* Container */",
                  "display: flex;",
                  "flex-direction: column;",
                  "align-items: center;",
                  "gap: 8px;",
                  "",
                  "/* Each dot */",
                  "width: 12px;",
                  "border-radius: 9999px;",
                  "transition: all 300ms;",
                  "",
                  "/* Inactive */",
                  "height: 12px;",
                  "background: rgba(255,255,255,0.3);",
                  "",
                  "/* Active */",
                  "height: 40px;",
                  "background: #ffffff;",
                ].map((line, i) => (
                  <div key={i}>
                    {line === "" ? (
                      <div className="h-3" />
                    ) : (
                      <code
                        className={`text-xs font-mono block leading-relaxed ${
                          line.startsWith("/*") ? "text-white/30" : line.includes(":") ? "text-white/70" : "text-amber-400/80"
                        }`}
                      >
                        {line}
                      </code>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 5 — Design Rules (Do / Don't)                            */}
      {/* ---------------------------------------------------------------- */}
      <section data-section="5" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-4">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-indigo-400">
            05 / Design Rules
          </span>
        </RevealBlock>
        <RevealBlock delay={0.05} className="mb-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Do &amp; Don&apos;t
          </h2>
        </RevealBlock>
        <RevealBlock delay={0.1} className="mb-16">
          <p className="text-white/50 text-base max-w-xl leading-relaxed">
            Full-page scroll is unforgiving. One wrong decision breaks the pacing for the entire experience.
            These rules protect the cinematic flow.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
          <RevealBlock delay={0.1}>
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-teal-400 tracking-[0.2em] uppercase">Do</span>
              </div>
              <ul className="space-y-4">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-teal-500/60 font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-white/70 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Don't */}
          <RevealBlock delay={0.15}>
            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/5 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-pink-400 tracking-[0.2em] uppercase">Don&apos;t</span>
              </div>
              <ul className="space-y-4">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-pink-500/60 font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-white/70 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>

              {/* Callout */}
              <div className="mt-8 rounded-xl bg-pink-500/10 border border-pink-500/20 p-4">
                <p className="text-xs text-pink-300/80 leading-relaxed">
                  <span className="font-bold text-pink-300">Critical: </span>
                  Always test on real touch devices. iOS Safari&apos;s momentum scrolling
                  can fight scroll-snap. Add <code className="text-pink-200">overscroll-behavior: none</code> to the container.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Implementation snippet */}
        <RevealBlock delay={0.2} className="mt-8">
          <div className="rounded-2xl border border-white/10 bg-black p-8">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-6">Minimal Implementation</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-white/30 font-mono mb-3">Container</p>
                <div className="space-y-1.5">
                  {[
                    "height: 100dvh;",
                    "overflow-y: auto;",
                    "scroll-snap-type: y mandatory;",
                    "overscroll-behavior: none;",
                  ].map((line) => (
                    <code key={line} className="text-xs font-mono text-white/60 block">{line}</code>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-white/30 font-mono mb-3">Each Section</p>
                <div className="space-y-1.5">
                  {[
                    "height: 100dvh;",
                    "scroll-snap-align: start;",
                    "scroll-snap-stop: always;",
                    "overflow: hidden;",
                  ].map((line) => (
                    <code key={line} className="text-xs font-mono text-white/60 block">{line}</code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 6 — Footer                                               */}
      {/* ---------------------------------------------------------------- */}
      <footer
        data-section="6"
        className="border-t border-white/10 bg-black"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="md:col-span-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Full Page Scroll
                </h2>
                <p className="text-white/40 text-sm leading-relaxed max-w-md">
                  A layout style for experiences where pacing matters.
                  Build with intention — each screen, a scene.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-2">Links</p>
                <Link href="/styles/full-page-scroll" className="fps-hover-line pb-0.5 text-sm text-white/60 w-fit">
                  Documentation
                </Link>
                <Link href="/styles" className="fps-hover-line pb-0.5 text-sm text-white/60 w-fit">
                  All Styles
                </Link>
                <Link href="/" className="fps-hover-line pb-0.5 text-sm text-white/60 w-fit">
                  StyleKit Home
                </Link>
              </div>
            </div>
          </RevealBlock>

          {/* Color accent row */}
          <RevealBlock delay={0.1}>
            <div className="flex gap-2 mb-12">
              {["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#ffffff"].map((c) => (
                <div
                  key={c}
                  className="h-1 flex-1 rounded-full"
                  style={{ backgroundColor: c, opacity: c === "#ffffff" ? 0.2 : 0.7 }}
                />
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10">
              <p className="text-xs text-white/30 font-mono">
                StyleKit &middot; Full Page Scroll Showcase
              </p>
              <Link
                href="/styles/full-page-scroll"
                className="text-xs tracking-[0.15em] uppercase text-white/60 border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                View Full Docs &rarr;
              </Link>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
