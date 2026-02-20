"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Inline IntersectionObserver hook ────────────────────────────────────────
function useInView(options = {}) {
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
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
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
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Rising bubble decoration ─────────────────────────────────────────────────
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

// ─── Reusable frosted glass card ──────────────────────────────────────────────
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
      {/* Aurora orb — green, top-right */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-green-400/20 blur-3xl pointer-events-none group-hover:scale-150 group-hover:bg-green-300/30 transition-all duration-500" />
      {/* Aurora orb — sky-blue, bottom-left */}
      <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-sky-400/20 blur-3xl pointer-events-none group-hover:scale-150 group-hover:bg-sky-300/30 transition-all duration-500" />
      {/* Glossy top-half reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-3xl pointer-events-none group-hover:from-white/80 group-hover:to-white/20 transition-colors duration-300" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Color swatches ───────────────────────────────────────────────────────────
const colorSwatches = [
  { name: "Sky Light",    hex: "#87CEEB",               tw: "bg-[#87CEEB]",    label: "Primary" },
  { name: "Sky Deep",     hex: "#5FB3CC",               tw: "bg-[#5FB3CC]",    label: "Secondary" },
  { name: "Glass White",  hex: "rgba(255,255,255,0.40)", tw: "bg-white/40",     label: "Glass Base" },
  { name: "Ice Blue",     hex: "#E0F2FE",               tw: "bg-sky-100",      label: "Tint" },
  { name: "Aurora Green", hex: "#34D399",               tw: "bg-emerald-400",  label: "Nature Accent" },
  { name: "Aqua Glow",    hex: "#7DD3FC",               tw: "bg-sky-300",      label: "Water Accent" },
  { name: "Sky Gradient", hex: "#0EA5E9",               tw: "bg-sky-500",      label: "Gradient End" },
  { name: "White Pearl",  hex: "#F0F9FF",               tw: "bg-sky-50",       label: "Highlight" },
];

// ─── Glass Effects data ───────────────────────────────────────────────────────
const glassLevels = [
  {
    label: "Subtle",
    tw: "bg-white/20 backdrop-blur-sm",
    code: "bg-white/20 backdrop-blur-sm",
    desc: "Barely-there frosting, for layered depth",
  },
  {
    label: "Standard",
    tw: "bg-white/35 backdrop-blur-md",
    code: "bg-white/35 backdrop-blur-md",
    desc: "Default panel glass — most UI surfaces",
  },
  {
    label: "Deep",
    tw: "bg-white/55 backdrop-blur-xl",
    code: "bg-white/55 backdrop-blur-xl",
    desc: "Hero cards and modal overlays",
  },
  {
    label: "Opaque",
    tw: "bg-white/75 backdrop-blur-2xl",
    code: "bg-white/75 backdrop-blur-2xl",
    desc: "Navigation bars and prominent callouts",
  },
];

// ─── Feature cards data ───────────────────────────────────────────────────────
const featureCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-600">
        <path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Translucency",
    desc: "Semi-transparent white panels layered over sky gradients create depth without darkness.",
    tag: "Glass",
    tagColor: "bg-sky-200/60 text-sky-800",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-600">
        <path d="M3 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Aurora Orbs",
    desc: "Blur-3xl rounded orbs in green and sky-blue expand on hover to simulate an ethereal glow.",
    tag: "Nature",
    tagColor: "bg-emerald-200/60 text-emerald-800",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-500">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Glossy Highlights",
    desc: "An absolute h-1/2 gradient overlay on every button and card simulates light on glass.",
    tag: "Optics",
    tagColor: "bg-white/60 text-sky-800",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-600">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="2.5" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    ),
    title: "Jelly Bounce",
    desc: "active:scale-95 gives every button a satisfying 5% squish that bounces back on release.",
    tag: "Physics",
    tagColor: "bg-sky-100/60 text-sky-800",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-500">
        <path d="M12 22V12M12 12C12 12 8 8 4 8M12 12C12 12 16 8 20 8" />
        <circle cx="12" cy="5" r="3" />
      </svg>
    ),
    title: "Nature Fusion",
    desc: "Organic shapes, bubbles, and leaves blend digital UI with the natural world.",
    tag: "Organic",
    tagColor: "bg-emerald-100/60 text-emerald-800",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-600">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Vista Legacy",
    desc: "Faithful to the Windows Vista DWM compositor era — the original desktop glass experience.",
    tag: "Retro",
    tagColor: "bg-sky-200/60 text-sky-800",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function FrutigerAeroShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"primary" | "glass" | "input">("primary");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // useInView with aliased destructure for hero stats
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500 text-sky-900">
      {/* ── Keyframe definitions ──────────────────────────────────────────── */}
      <style>{`
        @keyframes aero-bubble {
          0%   { transform: translateY(0) scale(0.6); opacity: 0; }
          20%  { opacity: 0.45; }
          100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
        }
        @keyframes aero-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes aero-orb-spin {
          from { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.06); }
          to   { transform: rotate(360deg) scale(1); }
        }
        @keyframes aero-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes aero-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════
          1. FIXED NAV — glass aero effect, sky blue
          ════════════════════════════════════════════════════════════════════ */}
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

          {/* Nav links — md+ only */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Components", href: "#components" },
              { label: "Glass Effects", href: "#glass" },
              { label: "Colors", href: "#colors" },
              { label: "Rules", href: "#rules" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA pill — glossy */}
          <Link
            href="/styles"
            className="group relative px-5 py-2 rounded-full bg-white/50 border border-white/60 text-sky-800 text-sm font-semibold shadow-sm hover:bg-white/70 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 overflow-hidden"
          >
            <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/90 transition-colors duration-200" />
            <span className="relative">StyleKit &rarr;</span>
          </Link>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          2. HERO — sky/nature background with glass panels floating above
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        {/* Background aurora blobs */}
        <div
          className="absolute top-10 right-10 w-80 h-80 rounded-full bg-emerald-300/25 blur-3xl pointer-events-none"
          style={{ animation: "aero-orb-spin 22s linear infinite" }}
        />
        <div
          className="absolute bottom-16 left-8 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none"
          style={{ animation: "aero-orb-spin 30s linear infinite reverse" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />
        <div
          className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none"
          style={{ animation: "aero-pulse 6s ease-in-out infinite" }}
        />

        {/* Rising bubbles */}
        <Bubble size={24} left="8%"  delay="0s" />
        <Bubble size={16} left="18%" delay="2.5s" />
        <Bubble size={32} left="38%" delay="1s" />
        <Bubble size={14} left="52%" delay="4s" />
        <Bubble size={20} left="64%" delay="3.5s" />
        <Bubble size={12} left="79%" delay="0.8s" />
        <Bubble size={28} left="90%" delay="4.2s" />

        {/* Hero text */}
        <div className="text-center mb-10 relative z-10">
          <h1 className="font-bold leading-tight mb-4">
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 10vw, 7rem)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                color: "#ffffff",
                textShadow: "0 4px 24px rgba(2,132,199,0.4)",
              }}
            >
              Frutiger Aero
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(1.4rem, 4.5vw, 3rem)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s",
                color: "rgba(255,255,255,0.82)",
              }}
            >
              Nature Meets Technology
            </span>
          </h1>

          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.26s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.26s",
            }}
            className="max-w-xl mx-auto text-white/80 text-lg leading-relaxed"
          >
            Windows Vista&rsquo;s glass aesthetic reborn &mdash; sky-blue gradients,
            frosted panels, aurora orbs, and glossy top-half reflections from the
            early 2010s.
          </p>
        </div>

        {/* Central floating glass hero card */}
        <div
          className="relative z-10 w-full max-w-lg"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed
              ? "translateY(0) scale(1)"
              : "translateY(32px) scale(0.96)",
            transition:
              "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s",
            animation: heroRevealed
              ? "aero-float 6s ease-in-out 1s infinite"
              : "none",
          }}
        >
          <AeroCard className="p-8 text-center">
            {/* Icon row */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[
                { bg: "bg-white/50", icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-600">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="2.5" />
                      <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="2.5" />
                    </svg>
                  ),
                },
                { bg: "bg-emerald-100/50", icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-600">
                      <path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  ),
                },
                { bg: "bg-sky-100/50", icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-sky-500">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-2xl ${item.bg} border border-white/60 flex items-center justify-center shadow-md`}
                >
                  {item.icon}
                </div>
              ))}
            </div>

            <p className="text-sky-800 text-base leading-relaxed mb-8">
              A design language blending organic nature with translucent digital
              surfaces. Every element breathes clean air and refracts soft light.
            </p>

            {/* Hero CTA */}
            <button
              type="button"
              className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-b from-white/80 to-white/50 border border-white/60 text-sky-700 font-semibold text-base shadow-lg hover:from-white/95 hover:to-white/70 hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)] active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
            >
              <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 group-hover:to-white/20 transition-colors duration-200" />
              <span className="relative">Explore the Aesthetic</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </AeroCard>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{
            opacity: heroRevealed ? 0.6 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
          <p className="text-white/50 text-xs tracking-widest uppercase">Scroll</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. COMPONENT DEMOS — gel buttons, glass cards, aero inputs
          ════════════════════════════════════════════════════════════════════ */}
      <section id="components" className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Section aurora */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-12">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Components
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Component Showcase
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Every component demonstrates core Aero techniques: glossy overlays,
              aurora orbs, and jelly bounce physics.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08} className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 gap-1">
              {(["primary", "glass", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 ${
                    activeTab === tab
                      ? "bg-white/70 text-sky-800 shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {activeTab === tab && (
                    <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none" />
                  )}
                  <span className="relative">
                    {tab === "primary"
                      ? "Primary Button"
                      : tab === "glass"
                      ? "Glass Card"
                      : "Input Field"}
                  </span>
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <RevealBlock delay={0.16}>
            <AeroCard className="p-8 md:p-12">
              {/* ── Primary Button tab ── */}
              {activeTab === "primary" && (
                <div className="flex flex-col md:flex-row items-start gap-10">
                  <div className="flex-1 flex items-center justify-center py-8">
                    <button
                      type="button"
                      className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-b from-white/80 to-white/50 border border-white/60 text-sky-700 font-bold text-lg shadow-lg hover:from-white/95 hover:to-white/70 hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)] active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 group-hover:to-white/20 transition-colors duration-200" />
                      <span className="relative">Aero Button</span>
                    </button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-sky-900 mb-3">
                      Aero Button Anatomy
                    </h3>
                    {[
                      {
                        dot: "bg-white border border-white/60",
                        label: "Glossy top-half",
                        desc: "from-white/60 to-white/10 h-1/2 rounded-t-full — brightens on hover",
                      },
                      {
                        dot: "bg-sky-400",
                        label: "Luminous glow",
                        desc: "0_8px_20px rgba(2,132,199,0.6) + 0_0_30px rgba(125,211,252,0.3)",
                      },
                      {
                        dot: "bg-emerald-400",
                        label: "Jelly bounce",
                        desc: "active:scale-95 — squish on press, never scale-[0.98]",
                      },
                      {
                        dot: "bg-sky-200",
                        label: "Focus ring",
                        desc: "ring-sky-300 + ring-offset-sky-500 for sky-background accessibility",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 border border-white/30"
                      >
                        <div
                          className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${item.dot}`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-sky-700/70 font-mono">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Glass Card tab ── */}
              {activeTab === "glass" && (
                <div className="flex flex-col md:flex-row items-start gap-10">
                  <div className="flex-1 flex items-center justify-center py-4">
                    <div className="group relative overflow-hidden w-56 rounded-3xl border border-white/50 bg-white/40 backdrop-blur-xl shadow-xl p-6 text-center hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(14,165,233,0.3)] transition-all duration-300">
                      {/* Aurora orbs */}
                      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-400/25 blur-3xl pointer-events-none group-hover:scale-150 group-hover:bg-green-300/35 transition-all duration-500" />
                      <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-sky-400/25 blur-3xl pointer-events-none group-hover:scale-150 group-hover:bg-sky-300/35 transition-all duration-500" />
                      {/* Glossy top */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-3xl pointer-events-none group-hover:from-white/80 transition-colors duration-300" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white/60 flex items-center justify-center mx-auto mb-4 shadow-md">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="text-sky-600"
                          >
                            <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                        <p className="font-bold text-sky-900 text-base mb-1">
                          Glass Card
                        </p>
                        <p className="text-sky-700/70 text-xs">
                          Hover to see aurora orbs expand
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-sky-900 mb-3">
                      Glass Card Anatomy
                    </h3>
                    {[
                      {
                        dot: "bg-green-400",
                        label: "Aurora orb (green)",
                        desc: "-top-16 -right-16 w-40 h-40 — group-hover:scale-150 duration-500",
                      },
                      {
                        dot: "bg-sky-300",
                        label: "Aurora orb (sky)",
                        desc: "-bottom-16 -left-16 w-40 h-40 — mirrors green on opposite corner",
                      },
                      {
                        dot: "bg-white border border-white/60",
                        label: "Glossy top-half",
                        desc: "h-1/2 from-white/60 to-white/10 applied on rounded-t-3xl",
                      },
                      {
                        dot: "bg-sky-200/60",
                        label: "Frosted glass base",
                        desc: "bg-white/30 backdrop-blur-xl border border-white/40",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 border border-white/30"
                      >
                        <div
                          className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${item.dot}`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-sky-700/70 font-mono">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Input Field tab ── */}
              {activeTab === "input" && (
                <div className="flex flex-col md:flex-row items-start gap-10">
                  <div className="flex-1 space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-5 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-sky-900 placeholder:text-sky-400/60 hover:border-white/70 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 focus:bg-white/50 focus:border-white/80 transition-all duration-200 ease-out"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="hello@aero.com"
                        className="w-full px-5 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-sky-900 placeholder:text-sky-400/60 hover:border-white/70 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 focus:bg-white/50 focus:border-white/80 transition-all duration-200 ease-out"
                      />
                    </div>
                    <button
                      type="button"
                      className="group relative w-full py-3 rounded-full bg-gradient-to-b from-white/80 to-white/50 border border-white/60 text-sky-700 font-semibold hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)] active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 transition-colors duration-200" />
                      <span className="relative">Submit</span>
                    </button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-sky-900 mb-3">
                      Input Field Rules
                    </h3>
                    {[
                      {
                        dot: "bg-white/60 border border-white/50",
                        label: "Glass base",
                        desc: "bg-white/30 backdrop-blur-md — soft frosted surface",
                      },
                      {
                        dot: "bg-sky-300",
                        label: "Focus ring",
                        desc: "ring-2 ring-sky-300 ring-offset-2 ring-offset-sky-500",
                      },
                      {
                        dot: "bg-sky-100",
                        label: "Focus brighten",
                        desc: "focus:bg-white/50 — brightens on focus, never dark",
                      },
                      {
                        dot: "bg-sky-400/40",
                        label: "Large radius",
                        desc: "rounded-2xl — no sharp corners anywhere in Aero",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 border border-white/30"
                      >
                        <div
                          className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${item.dot}`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-sky-700/70 font-mono">
                            {item.desc}
                          </p>
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

      {/* ════════════════════════════════════════════════════════════════════
          4. FEATURE GRID — core principles
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Bubble size={18} left="5%"  delay="1s" />
          <Bubble size={12} left="28%" delay="3s" />
          <Bubble size={26} left="53%" delay="0.5s" />
          <Bubble size={15} left="74%" delay="2.2s" />
          <Bubble size={22} left="91%" delay="4s" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Principles
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Six Core Pillars
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              What defines Aero&rsquo;s visual DNA and separates it from every other glass aesthetic.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.07}>
                <AeroCard className="p-6 h-full hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(14,165,233,0.25)]">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/50 border border-white/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                      {card.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-sky-900">{card.title}</h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${card.tagColor}`}
                        >
                          {card.tag}
                        </span>
                      </div>
                      <p className="text-sm text-sky-700/80 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </AeroCard>
              </RevealBlock>
            ))}
          </div>

          {/* Stats callout */}
          <RevealBlock delay={0.3} className="mt-10">
            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  stat: "Vista",
                  label: "Era Inspiration",
                  note: "Windows Vista DWM compositor, 2006–2009",
                },
                {
                  stat: "blur-xl",
                  label: "Minimum Glass Blur",
                  note: "backdrop-blur-xl — authentic frosted panel minimum",
                },
                {
                  stat: "scale-150",
                  label: "Aurora Hover Scale",
                  note: "group-hover:scale-150 brings orbs alive on interaction",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  }}
                >
                  <AeroCard className="p-6 text-center">
                    <p className="text-3xl font-bold text-sky-900 mb-1 font-mono">
                      {item.stat}
                    </p>
                    <p className="text-sm font-semibold text-sky-700 mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-sky-600/70">{item.note}</p>
                  </AeroCard>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. GLASS EFFECTS / TRANSPARENCY SHOWCASE
          ════════════════════════════════════════════════════════════════════ */}
      <section id="glass" className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-16 right-8 w-64 h-64 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-12 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Transparency
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Glass Effect Spectrum
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Four levels of frosted glass — from barely-there to near-opaque.
              Each serves a distinct hierarchy role.
            </p>
          </RevealBlock>

          {/* Glass levels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {glassLevels.map((level, i) => (
              <RevealBlock key={level.label} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Swatch area */}
                  <div className={`${level.tw} border-b border-white/20 p-8 flex items-center justify-between`}>
                    {/* Aurora orbs small */}
                    <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-green-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                    <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-sky-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-white/05 rounded-t-3xl pointer-events-none" />
                    <p className="relative z-10 font-bold text-sky-900 text-xl">
                      {level.label}
                    </p>
                    <div className="relative z-10 flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="w-8 h-8 rounded-full bg-white/50 border border-white/60 shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                  {/* Info area */}
                  <div className="bg-white/20 backdrop-blur-md p-5">
                    <p className="text-xs font-mono text-sky-700 mb-1">{level.code}</p>
                    <p className="text-sm text-sky-800/80">{level.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Water droplet visual */}
          <RevealBlock delay={0.25}>
            <AeroCard className="p-8 md:p-10">
              <p className="text-sm font-bold text-sky-800 uppercase tracking-widest mb-6">
                Glass Surface Properties
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Backdrop Blur",
                    code: "backdrop-blur-xl",
                    visual: "bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl",
                    note: "Blurs content beneath the panel",
                  },
                  {
                    title: "White Tint",
                    code: "bg-white/30–70",
                    visual: "bg-white/50",
                    note: "Controls opacity of the frosted overlay",
                  },
                  {
                    title: "Glass Border",
                    code: "border border-white/40",
                    visual: "border-2 border-white/60",
                    note: "Subtle white edge catches ambient light",
                  },
                ].map((prop) => (
                  <div
                    key={prop.title}
                    className="group relative overflow-hidden rounded-2xl bg-white/20 border border-white/30 p-5 hover:bg-white/30 transition-all duration-300"
                  >
                    <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full bg-green-400/20 blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                    <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full bg-sky-400/20 blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className={`w-full h-12 rounded-xl mb-4 ${prop.visual}`} />
                      <p className="font-semibold text-sky-900 text-sm mb-1">
                        {prop.title}
                      </p>
                      <p className="text-xs font-mono text-sky-700/70 mb-2">
                        {prop.code}
                      </p>
                      <p className="text-xs text-sky-700/60">{prop.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AeroCard>
          </RevealBlock>

          {/* Button variant row */}
          <RevealBlock delay={0.35} className="mt-8">
            <AeroCard className="p-8">
              <p className="text-sm font-bold text-sky-800 uppercase tracking-widest mb-6">
                Button Variants
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {/* Glass primary */}
                <button
                  type="button"
                  className="group relative px-8 py-3.5 rounded-full bg-gradient-to-b from-white/80 to-white/50 border border-white/60 text-sky-700 font-bold text-sm shadow-lg hover:from-white/95 hover:to-white/70 hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/80 transition-colors duration-200" />
                  <span className="relative">Glass Primary</span>
                </button>

                {/* Sky solid */}
                <button
                  type="button"
                  className="group relative px-8 py-3.5 rounded-full bg-gradient-to-b from-sky-400 to-sky-600 border border-sky-300/40 text-white font-bold text-sm shadow-lg hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/70 transition-colors duration-200" />
                  <span className="relative">Sky Solid</span>
                </button>

                {/* Nature emerald */}
                <button
                  type="button"
                  className="group relative px-8 py-3.5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 border border-emerald-300/40 text-white font-bold text-sm shadow-lg hover:shadow-[0_8px_20px_rgba(52,211,153,0.6),0_0_30px_rgba(110,231,183,0.3)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/60 transition-colors duration-200" />
                  <span className="relative">Nature Aurora</span>
                </button>

                {/* Ghost */}
                <button
                  type="button"
                  className="group relative px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/50 text-white font-bold text-sm hover:bg-white/25 hover:shadow-[0_8px_20px_rgba(2,132,199,0.4)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-white/05 rounded-t-full pointer-events-none group-hover:from-white/50 transition-colors duration-200" />
                  <span className="relative">Ghost Glass</span>
                </button>
              </div>
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. COLOR PALETTE — sky blues, whites, nature greens
          ════════════════════════════════════════════════════════════════════ */}
      <section id="colors" className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-20 h-20 rounded-full bg-white/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-16 right-1/3 w-32 h-32 rounded-full bg-white/15 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Palette
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Color System
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Sky gradients, glass tints, and aurora accents &mdash; the full Aero palette story.
            </p>
          </RevealBlock>

          {/* Swatch grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/25 backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-out cursor-default">
                  {/* Aurora orbs */}
                  <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-green-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                  <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-sky-400/20 blur-3xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
                  {/* Glossy top */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-white/10 rounded-t-3xl pointer-events-none group-hover:from-white/70 transition-colors duration-300" />

                  <div className="relative z-10 p-4">
                    <div className={`w-full h-16 rounded-2xl mb-4 shadow-inner ${swatch.tw}`} />
                    <p className="font-bold text-sm text-sky-900">{swatch.name}</p>
                    <p className="text-xs text-sky-700/60 font-mono mt-0.5">
                      {swatch.hex}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/40 border border-white/50 text-sky-700 text-xs font-semibold">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient showcase */}
          <RevealBlock delay={0.3}>
            <AeroCard className="p-8">
              <p className="text-sm font-bold text-sky-800 uppercase tracking-widest mb-5">
                Signature Gradients
              </p>
              {/* Main gradient bar */}
              <div className="w-full h-14 rounded-2xl bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500 shadow-inner mb-2" />
              <p className="text-xs text-sky-700/70 font-mono mb-6">
                from-sky-300 via-sky-400 to-sky-500 — the Aero sky
              </p>
              {/* Secondary gradients */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { gradient: "bg-gradient-to-r from-sky-300 to-emerald-300", label: "sky → emerald (nature aurora)" },
                  { gradient: "bg-gradient-to-r from-white/80 to-sky-200/60", label: "glass tint (panel base)" },
                  { gradient: "bg-gradient-to-r from-sky-400 to-sky-600", label: "depth range (button fill)" },
                ].map((g) => (
                  <div key={g.label}>
                    <div className={`h-10 rounded-2xl ${g.gradient} mb-2`} />
                    <p className="text-xs text-sky-700/60 font-mono">{g.label}</p>
                  </div>
                ))}
              </div>
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. DESIGN RULES — Do vs Avoid
          ════════════════════════════════════════════════════════════════════ */}
      <section id="rules" className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-16 left-8 w-64 h-64 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-72 h-72 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Philosophy
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Design Rules
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              The Aero aesthetic is built on a strict visual grammar &mdash; know
              what to reach for and what to avoid.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Do panel */}
            <RevealBlock delay={0.08}>
              <AeroCard className="h-full p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/40 border border-emerald-400/50 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-emerald-700"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-sky-900">
                    Do: Aero Principles
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Glass surfaces — bg-white/30 to /50 with backdrop-blur-xl",
                    "Aurora orbs — absolute blur-3xl, group-hover:scale-150",
                    "Glossy top-half — h-1/2 gradient from-white/60 on every card/button",
                    "Sky blue gradients — from-sky-300 via-sky-400 to-sky-500",
                    "Organic shapes — rounded-2xl / rounded-3xl / rounded-full",
                    "Nature accents — emerald-300/400 for green aurora touches",
                    "Jelly bounce — active:scale-95, not scale-[0.98]",
                    "Focus ring offset — always pair ring with ring-offset-sky-500",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-300/40 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-emerald-700"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="text-sm text-sky-800 leading-snug">{text}</p>
                    </li>
                  ))}
                </ul>
              </AeroCard>
            </RevealBlock>

            {/* Avoid panel */}
            <RevealBlock delay={0.16}>
              <AeroCard className="h-full p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-rose-300/40 border border-rose-400/50 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-rose-700"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-sky-900">
                    Avoid: Anti-Aero
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Dark backgrounds — Aero is always sky-lit and bright",
                    "Sharp corners — rounded-none or rounded-sm break the organic feel",
                    "Monospace fonts — clean sans-serif only, no code-style type",
                    "Neon or harsh colors — no hot pink, no saturated reds",
                    "Flat matte surfaces — every panel must carry a glass effect",
                    "active:scale-[0.98] — too subtle; use active:scale-95 for jelly",
                    "focus:ring without ring-offset-sky-500 — ring becomes invisible",
                    "Angular or geometric rigidity — Aero breathes and curves",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-rose-200/40 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-rose-600"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-sm text-sky-800 leading-snug">{text}</p>
                    </li>
                  ))}
                </ul>
              </AeroCard>
            </RevealBlock>
          </div>

          {/* Philosophy quote card */}
          <RevealBlock delay={0.24}>
            <AeroCard className="p-8 md:p-10">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/50 border border-white/60 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-sky-600"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <blockquote className="text-sky-800 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4 italic">
                  &ldquo;Frutiger Aero is what happened when designers believed the digital world
                  could feel like morning air &mdash; clean, light-filled, and alive with nature.&rdquo;
                </blockquote>
                <p className="text-sky-600/70 text-sm">
                  Windows Vista Aero, 2006 &mdash; the glass that defined an era
                </p>
              </div>
            </AeroCard>
          </RevealBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer className="relative py-14 px-6 bg-white/20 backdrop-blur-xl border-t border-white/30 overflow-hidden">
        {/* Glossy top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
        {/* Bubble decorations */}
        <div className="absolute bottom-4 left-12 w-10 h-10 rounded-full bg-white/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-8 right-24 w-16 h-16 rounded-full bg-sky-200/20 blur-2xl pointer-events-none" />
        <div className="absolute top-6 left-1/2 w-8 h-8 rounded-full bg-emerald-200/20 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/40 border border-white/50 flex items-center justify-center shadow-sm">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-sky-700"
                >
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

            {/* Docs link */}
            <Link
              href="/styles/frutiger-aero"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 border border-white/50 text-sky-800 text-sm font-semibold hover:bg-white/60 hover:shadow-[0_4px_12px_rgba(2,132,199,0.4)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 transition-all duration-200 ease-out overflow-hidden"
            >
              <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-white/10 rounded-t-full pointer-events-none group-hover:from-white/70 transition-colors duration-200" />
              <span className="relative">View Docs</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
