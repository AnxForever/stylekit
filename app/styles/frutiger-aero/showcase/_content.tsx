"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Inline IntersectionObserver hook ───────────────────────────────────────
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

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────────
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Floating bubble decoration ─────────────────────────────────────────────
function Bubble({
  size,
  left,
  delay,
  bottom = "-10%",
}: {
  size: number;
  left: string;
  delay: string;
  bottom?: string;
}) {
  return (
    <div
      className="absolute rounded-full bg-white/20 pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        bottom,
        animation: `aero-bubble 9s ${delay} infinite ease-in-out`,
      }}
    />
  );
}

// ─── Aero glossy card ────────────────────────────────────────────────────────
// All cards use aurora orbs + glossy top-half reflection as mandated
function AeroCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Aurora orb — green top-right */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-green-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
      {/* Aurora orb — sky-blue bottom-left */}
      <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-sky-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
      {/* Glossy top-half reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-3xl pointer-events-none group-hover:from-white/80 transition-all duration-300" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Color swatch data ───────────────────────────────────────────────────────
const colorSwatches = [
  { name: "Sky Light", hex: "#87CEEB", tw: "bg-[#87CEEB]", label: "Primary" },
  { name: "Sky Deep", hex: "#5FB3CC", tw: "bg-[#5FB3CC]", label: "Secondary" },
  { name: "Glass White", hex: "rgba(255,255,255,0.40)", tw: "bg-white/40", label: "Glass Base" },
  { name: "Ice Blue", hex: "#E0F2FE", tw: "bg-sky-100", label: "Tint" },
  { name: "Aurora Green", hex: "#34D399", tw: "bg-emerald-400", label: "Nature Accent" },
  { name: "Aqua Glow", hex: "#7DD3FC", tw: "bg-sky-300", label: "Water Accent" },
  { name: "Sky 500 Grad", hex: "#0EA5E9", tw: "bg-sky-500", label: "Gradient End" },
  { name: "White Pearl", hex: "#F0F9FF", tw: "bg-sky-50", label: "Highlight" },
];

export default function FrutigerAeroShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"primary" | "glass" | "input">("primary");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500 text-sky-900">
      {/* ── Keyframe definitions ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes aero-bubble {
          0%   { transform: translateY(0) scale(0.6); opacity: 0; }
          20%  { opacity: 0.45; }
          100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
        }
        @keyframes aero-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes aero-orb-spin {
          from { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.05); }
          to   { transform: rotate(360deg) scale(1); }
        }
        @keyframes aero-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════════
          1. FIXED NAV
          ════════════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/30">
        {/* Glossy top stripe */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-white/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/styles/frutiger-aero/showcase"
            className="font-bold text-lg text-sky-900 tracking-tight select-none"
          >
            Frutiger Aero
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/styles/frutiger-aero"
              className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors duration-200"
            >
              All Styles
            </Link>
          </nav>

          {/* CTA pill */}
          <Link
            href="/styles"
            className="relative px-5 py-2 rounded-full bg-white/50 border border-white/60 text-sky-800 text-sm font-semibold shadow-sm hover:bg-white/70 hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500"
          >
            <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 to-white/10 rounded-t-full pointer-events-none" />
            StyleKit &rarr;
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════════
          2. HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        {/* Background aurora blobs */}
        <div
          className="absolute top-12 right-12 w-80 h-80 rounded-full bg-emerald-300/25 blur-3xl pointer-events-none"
          style={{ animation: "aero-orb-spin 20s linear infinite" }}
        />
        <div
          className="absolute bottom-20 left-8 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none"
          style={{ animation: "aero-orb-spin 28s linear infinite reverse" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />

        {/* Rising bubbles */}
        <Bubble size={24} left="8%"  delay="0s" />
        <Bubble size={16} left="22%" delay="2.5s" />
        <Bubble size={32} left="40%" delay="1s" />
        <Bubble size={20} left="62%" delay="3.5s" />
        <Bubble size={14} left="78%" delay="0.8s" />
        <Bubble size={28} left="91%" delay="4.2s" />

        {/* Hero title */}
        <div className="text-center mb-10 relative z-10">
          <h1 className="font-bold leading-tight mb-4">
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 10vw, 7rem)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                color: "#ffffff",
                textShadow: "0 4px 24px rgba(2,132,199,0.4)",
              }}
            >
              Frutiger Aero
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(1.5rem, 5vw, 3rem)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              Nature Meets Technology
            </span>
          </h1>

          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s",
            }}
            className="max-w-xl mx-auto text-white/80 text-lg leading-relaxed"
          >
            Windows Vista&rsquo;s glass aesthetic reborn &mdash; sky-blue gradients, frosted panels,
            aurora orbs, and glossy top-half reflections.
          </p>
        </div>

        {/* Central glass hero card */}
        <div
          className="relative z-10 w-full max-w-lg"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s",
            animation: heroRevealed ? "aero-float 6s ease-in-out 1s infinite" : "none",
          }}
        >
          <AeroCard className="p-8 text-center">
            {/* Icon row */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/50 border border-white/60 flex items-center justify-center shadow-md">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 12s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="2.5" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/50 border border-white/60 flex items-center justify-center shadow-md">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-600">
                  <path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100/50 border border-white/60 flex items-center justify-center shadow-md">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-500">
                  <path d="M3 12h18M12 3l9 9-9 9" />
                </svg>
              </div>
            </div>

            <p className="text-sky-800 text-base leading-relaxed mb-8">
              A design language blending organic nature with translucent digital surfaces.
              Every element breathes clean air and refracts soft light.
            </p>

            {/* Hero CTA — glossy capsule with all Aero effects */}
            <button
              type="button"
              className="
                group relative inline-flex items-center gap-2 px-10 py-4 rounded-full
                bg-gradient-to-b from-white/80 to-white/50
                border border-white/60
                text-sky-700 font-semibold text-base
                shadow-lg
                hover:from-white/95 hover:to-white/70
                hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)]
                active:scale-95 active:translate-y-0
                focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                transition-all duration-200 ease-out
              "
            >
              {/* Glossy top-half overlay */}
              <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 transition-all duration-200" />
              <span className="relative">Explore the Aesthetic</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative group-hover:translate-x-1 transition-transform duration-200">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </AeroCard>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          3. COMPONENT SHOWCASE  (tab switcher)
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Section aurora */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-12">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Components</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Component Showcase
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Every component demonstrates core Aero techniques: glossy overlays, aurora orbs, jelly bounce.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 gap-1">
              {(["primary", "glass", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ease-out
                    focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                    ${activeTab === tab
                      ? "bg-white/70 text-sky-800 shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/15"
                    }
                  `}
                >
                  {activeTab === tab && (
                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none" />
                  )}
                  <span className="relative">
                    {tab === "primary" ? "Primary Button" : tab === "glass" ? "Glass Card" : "Input Field"}
                  </span>
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <RevealBlock delay={0.2}>
            <AeroCard className="p-8 md:p-12">
              {activeTab === "primary" && (
                <div className="flex flex-col md:flex-row items-start gap-10">
                  {/* Live button demo */}
                  <div className="flex-1 flex items-center justify-center py-8">
                    <button
                      type="button"
                      className="
                        group relative inline-flex items-center gap-3 px-12 py-5 rounded-full
                        bg-gradient-to-b from-white/80 to-white/50
                        border border-white/60 text-sky-700 font-bold text-lg
                        shadow-lg
                        hover:from-white/95 hover:to-white/70
                        hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)]
                        active:scale-95 active:translate-y-0
                        focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                        transition-all duration-200 ease-out
                      "
                    >
                      <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 transition-all duration-200" />
                      <span className="relative">Aero Button</span>
                    </button>
                  </div>
                  {/* Annotations */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-sky-900 mb-2">Aero Button Anatomy</h3>
                    {[
                      { dot: "bg-white", label: "Glossy top-half", desc: "from-white/60 to-white/10 rounded-t-full — brightens on hover" },
                      { dot: "bg-sky-400", label: "Luminous glow", desc: "0_8px_20px rgba(2,132,199,0.6) + 0_0_30px rgba(125,211,252,0.3)" },
                      { dot: "bg-emerald-400", label: "Jelly bounce", desc: "active:scale-95 — squish on press, not scale-[0.98]" },
                      { dot: "bg-sky-200", label: "Focus ring", desc: "focus:ring-sky-300 + ring-offset-sky-500 for accessibility" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 border border-white/30">
                        <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${item.dot}`} />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">{item.label}</p>
                          <p className="text-xs text-sky-700/70 font-mono">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "glass" && (
                <div className="flex flex-col md:flex-row items-start gap-10">
                  {/* Live card demo (nested inside the section card) */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <div className="group relative overflow-hidden w-56 rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-xl p-6 text-center">
                      {/* Aurora orbs */}
                      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-400/25 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                      <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-sky-400/25 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                      {/* Glossy top */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-3xl pointer-events-none group-hover:from-white/80 transition-all duration-300" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white/60 flex items-center justify-center mx-auto mb-4 shadow-md">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-600">
                            <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                        <p className="font-bold text-sky-900 text-base mb-1">Glass Card</p>
                        <p className="text-sky-700/70 text-xs">Hover to see aurora orbs expand</p>
                      </div>
                    </div>
                  </div>
                  {/* Annotations */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-sky-900 mb-2">Glass Card Anatomy</h3>
                    {[
                      { dot: "bg-green-400", label: "Aurora orb (green)", desc: "-top-16 -right-16 w-40 h-40 — group-hover:scale-150 duration-500" },
                      { dot: "bg-sky-300", label: "Aurora orb (sky)", desc: "-bottom-16 -left-16 w-40 h-40 — mirrors green on opposite corner" },
                      { dot: "bg-white", label: "Glossy top-half", desc: "h-1/2 from-white/60 to-white/10 — applied on rounded-t-3xl" },
                      { dot: "bg-sky-200/60", label: "Frosted glass base", desc: "bg-white/30 backdrop-blur-xl border border-white/40" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 border border-white/30">
                        <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${item.dot}`} />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">{item.label}</p>
                          <p className="text-xs text-sky-700/70 font-mono">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "input" && (
                <div className="flex flex-col md:flex-row items-start gap-10">
                  {/* Live input demo */}
                  <div className="flex-1 space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-5 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-sky-900 placeholder:text-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 focus:bg-white/50 transition-all duration-200 ease-out"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="hello@aero.com"
                        className="w-full px-5 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-sky-900 placeholder:text-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 focus:bg-white/50 transition-all duration-200 ease-out"
                      />
                    </div>
                    <button
                      type="button"
                      className="
                        group relative w-full py-3 rounded-full
                        bg-gradient-to-b from-white/80 to-white/50
                        border border-white/60 text-sky-700 font-semibold
                        hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)]
                        active:scale-95 active:translate-y-0
                        focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                        transition-all duration-200 ease-out
                      "
                    >
                      <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 transition-all duration-200" />
                      <span className="relative">Submit</span>
                    </button>
                  </div>
                  {/* Annotations */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-sky-900 mb-2">Input Field Rules</h3>
                    {[
                      { dot: "bg-white/60", label: "Glass base", desc: "bg-white/30 backdrop-blur-md — soft frosted surface" },
                      { dot: "bg-sky-300", label: "Focus ring", desc: "ring-2 ring-sky-300 ring-offset-2 ring-offset-sky-500" },
                      { dot: "bg-sky-100", label: "Focus brighten", desc: "focus:bg-white/50 — brightens on focus, never dark" },
                      { dot: "bg-sky-400/40", label: "Large radius", desc: "rounded-2xl — no sharp corners anywhere in Aero" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 border border-white/30">
                        <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 border border-white/50 ${item.dot}`} />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">{item.label}</p>
                          <p className="text-xs text-sky-700/70 font-mono">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          4. COLOR SYSTEM
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Bubble decorations */}
        <div className="absolute top-12 left-1/4 w-20 h-20 rounded-full bg-white/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-16 right-1/3 w-32 h-32 rounded-full bg-white/15 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-16 h-16 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Palette</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Color System
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Sky gradients, glass tints, and aurora accents — the full Aero palette story.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/25 backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-out cursor-default">
                  {/* Aurora orb — green */}
                  <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-green-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                  {/* Aurora orb — sky */}
                  <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-sky-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                  {/* Glossy top */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-white/10 rounded-t-3xl pointer-events-none group-hover:from-white/70 transition-all duration-300" />

                  <div className="relative z-10 p-4">
                    {/* Swatch */}
                    <div className={`w-full h-16 rounded-2xl mb-4 shadow-inner ${swatch.tw}`} />
                    {/* Labels */}
                    <p className="font-bold text-sm text-sky-900">{swatch.name}</p>
                    <p className="text-xs text-sky-700/60 font-mono mt-0.5">{swatch.hex}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/40 border border-white/50 text-sky-700 text-xs font-semibold">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient bar showcase */}
          <RevealBlock delay={0.3} className="mt-10">
            <AeroCard className="p-8">
              <p className="text-sm font-bold text-sky-800 uppercase tracking-widest mb-5">Signature Gradient</p>
              <div className="w-full h-14 rounded-2xl bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500 shadow-inner mb-4" />
              <p className="text-xs text-sky-700/70 font-mono">from-sky-300 via-sky-400 to-sky-500</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div>
                  <div className="h-10 rounded-2xl bg-gradient-to-r from-sky-300 to-emerald-300 mb-2" />
                  <p className="text-xs text-sky-700/60 font-mono">sky → emerald</p>
                </div>
                <div>
                  <div className="h-10 rounded-2xl bg-gradient-to-r from-white/80 to-sky-200/60 mb-2" />
                  <p className="text-xs text-sky-700/60 font-mono">glass tint</p>
                </div>
                <div>
                  <div className="h-10 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-600 mb-2" />
                  <p className="text-xs text-sky-700/60 font-mono">depth range</p>
                </div>
              </div>
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          5. DESIGN PHILOSOPHY  (Do vs Avoid)
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-16 left-8 w-64 h-64 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-72 h-72 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Nature Meets Technology
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              The Aero aesthetic is built on a strict set of visual rules — know what to reach for and what to avoid.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do panel */}
            <RevealBlock delay={0.1}>
              <AeroCard className="h-full p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/40 border border-emerald-400/50 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-700">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-sky-900">Do: Aero Principles</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { icon: "○", text: "Glass surfaces — bg-white/30 to /50 with backdrop-blur-xl" },
                    { icon: "○", text: "Aurora orbs — absolute blur-3xl rounded-full, group-hover:scale-150" },
                    { icon: "○", text: "Glossy top-half — h-1/2 gradient from-white/60 on every card/button" },
                    { icon: "○", text: "Sky blue gradients — from-sky-300 via-sky-400 to-sky-500" },
                    { icon: "○", text: "Organic shapes — rounded-2xl / rounded-3xl / rounded-full everywhere" },
                    { icon: "○", text: "Nature accents — emerald-300/400 for green aurora touches" },
                    { icon: "○", text: "Jelly bounce — active:scale-95 (never scale-[0.98])" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-300/40 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-700">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="text-sm text-sky-800 leading-snug">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </AeroCard>
            </RevealBlock>

            {/* Avoid panel */}
            <RevealBlock delay={0.2}>
              <AeroCard className="h-full p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-rose-300/40 border border-rose-400/50 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-rose-700">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-sky-900">Avoid: Anti-Aero</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { text: "Dark backgrounds — Aero is always sky-lit and bright" },
                    { text: "Sharp corners — rounded-none or rounded-sm break the organic feel" },
                    { text: "Monospace fonts — clean sans-serif only, no code-style text faces" },
                    { text: "Neon/harsh colors — no #ff00ff, no saturated reds, no hot pink" },
                    { text: "Flat matte surfaces — every panel must have glass effect" },
                    { text: "active:scale-[0.98] — too subtle; use active:scale-95 for jelly" },
                    { text: "focus:ring without ring-offset-sky-500 — always pair them" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-rose-200/40 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-rose-600">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-sm text-sky-800 leading-snug">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </AeroCard>
            </RevealBlock>
          </div>

          {/* Vista-era tech callout */}
          <RevealBlock delay={0.3} className="mt-8">
            <AeroCard className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { stat: "Vista", label: "Era Inspiration", note: "Windows Vista DWM compositor, 2006-2009" },
                  { stat: "blur-xl", label: "Glass Blur Level", note: "backdrop-blur-xl is the minimum for authentic panels" },
                  { stat: "scale-150", label: "Aurora Scale on Hover", note: "group-hover:scale-150 brings orbs alive on interaction" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-2xl bg-white/20 border border-white/30">
                    <p className="text-3xl font-bold text-sky-900 mb-1 font-mono">{item.stat}</p>
                    <p className="text-sm font-semibold text-sky-700 mb-1">{item.label}</p>
                    <p className="text-xs text-sky-600/70">{item.note}</p>
                  </div>
                ))}
              </div>
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          6. BUTTON VARIANT GALLERY  (bonus section)
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Bubble size={18} left="5%"  delay="1s" />
          <Bubble size={12} left="30%" delay="3s" />
          <Bubble size={26} left="55%" delay="0.5s" />
          <Bubble size={15} left="75%" delay="2s" />
          <Bubble size={22} left="92%" delay="4s" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Interactions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Button Variants
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Every button variant carries the same Aero DNA: glossy highlight, jelly bounce, luminous glow.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <AeroCard className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary glass capsule */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    className="
                      group relative px-10 py-4 rounded-full
                      bg-gradient-to-b from-white/80 to-white/50
                      border border-white/60 text-sky-700 font-bold text-base
                      shadow-lg
                      hover:from-white/95 hover:to-white/70
                      hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)]
                      active:scale-95 active:translate-y-0
                      focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 transition-all duration-200" />
                    <span className="relative">Glass Primary</span>
                  </button>
                  <p className="text-xs text-white/60 font-mono text-center">from-white/80 to-white/50 &bull; rounded-full</p>
                </div>

                {/* Sky gradient solid */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    className="
                      group relative px-10 py-4 rounded-full
                      bg-gradient-to-r from-sky-400 to-sky-500
                      border border-sky-300/40 text-white font-bold text-base
                      shadow-lg
                      hover:from-sky-350 hover:to-sky-450
                      hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)]
                      active:scale-95 active:translate-y-0
                      focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/60 transition-all duration-200" />
                    <span className="relative">Sky Gradient</span>
                  </button>
                  <p className="text-xs text-white/60 font-mono text-center">from-sky-400 to-sky-500 &bull; glossy overlay</p>
                </div>

                {/* Nature / emerald */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    className="
                      group relative px-10 py-4 rounded-full
                      bg-gradient-to-r from-emerald-400 to-emerald-500
                      border border-emerald-300/40 text-white font-bold text-base
                      shadow-lg
                      hover:shadow-[0_8px_20px_rgba(52,211,153,0.6),0_0_30px_rgba(110,231,183,0.3)]
                      active:scale-95 active:translate-y-0
                      focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/60 transition-all duration-200" />
                    <span className="relative">Nature Aurora</span>
                  </button>
                  <p className="text-xs text-white/60 font-mono text-center">from-emerald-400 to-emerald-500 &bull; nature accent</p>
                </div>

                {/* Ghost / outline */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    className="
                      group relative px-10 py-4 rounded-full
                      bg-white/10 backdrop-blur-md
                      border border-white/50 text-white font-bold text-base
                      hover:bg-white/25
                      hover:shadow-[0_8px_20px_rgba(2,132,199,0.4),0_0_20px_rgba(125,211,252,0.2)]
                      active:scale-95 active:translate-y-0
                      focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-white/05 rounded-t-full pointer-events-none group-hover:from-white/50 transition-all duration-200" />
                    <span className="relative">Ghost Glass</span>
                  </button>
                  <p className="text-xs text-white/60 font-mono text-center">bg-white/10 backdrop-blur-md &bull; ghost variant</p>
                </div>
              </div>
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════════ */}
      <footer className="relative py-12 px-6 bg-white/20 backdrop-blur-xl border-t border-white/30 overflow-hidden">
        {/* Glossy top stripe */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
        {/* Small bubble decorations */}
        <div className="absolute bottom-4 left-12 w-10 h-10 rounded-full bg-white/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-8 right-24 w-16 h-16 rounded-full bg-sky-200/20 blur-2xl pointer-events-none" />
        <div className="absolute top-6 left-1/2 w-8 h-8 rounded-full bg-emerald-200/20 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/40 border border-white/50 flex items-center justify-center shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-700">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <p className="text-sky-800 text-sm font-semibold">
                StyleKit &middot; Frutiger Aero Showcase
              </p>
            </div>

            {/* Center note */}
            <p className="text-white/50 text-xs text-center">
              Windows Vista glass aesthetic &bull; Sky-blue gradients &bull; Nature meets technology
            </p>

            {/* Right link */}
            <Link
              href="/styles/frutiger-aero"
              className="
                group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-white/40 border border-white/50 text-sky-800 text-sm font-semibold
                hover:bg-white/60
                hover:shadow-[0_4px_12px_rgba(2,132,199,0.4)]
                active:scale-95
                focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
                transition-all duration-200 ease-out
              "
            >
              <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/70 transition-all duration-200" />
              <span className="relative">View Docs</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
