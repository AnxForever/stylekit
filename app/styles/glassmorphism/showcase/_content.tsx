"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
/* ------------------------------------------------------------------ */

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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 9l10 13L22 9z" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function BlurIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <circle cx="12" cy="12" r="6" opacity="0.4" />
      <circle cx="12" cy="12" r="3" opacity="0.8" />
    </svg>
  );
}

function GlintIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l1.2 7.8L21 12l-7.8 1.2L12 21l-1.2-7.8L3 12l7.8-1.2z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Glass White", hex: "rgba(255,255,255,0.25)", display: "#FFFFFF40", label: "Primary glass layer" },
  { name: "Subtle Glass", hex: "rgba(255,255,255,0.18)", display: "#FFFFFF2E", label: "Secondary glass layer" },
  { name: "Violet Depth", hex: "#667eea", display: "#667eea", label: "Accent gradient start" },
  { name: "Royal Purple", hex: "#764ba2", display: "#764ba2", label: "Accent gradient mid" },
  { name: "Pink Mist", hex: "#f093fb", display: "#f093fb", label: "Accent gradient end" },
  { name: "Crimson Glow", hex: "#f5576c", display: "#f5576c", label: "Highlight accent" },
];

const gradientPresets = [
  { name: "Purple Pink", from: "#667eea", via: "#764ba2", to: "#f093fb" },
  { name: "Blue Purple", from: "#4facfe", via: "#6a85f5", to: "#764ba2" },
  { name: "Cyan Blue", from: "#43e97b", via: "#38f9d7", to: "#667eea" },
  { name: "Sunset", from: "#f5576c", via: "#f093fb", to: "#f5576c" },
];

const layerData = [
  {
    id: 0,
    label: "Background Gradient",
    description: "Rich multi-stop gradient forms the colorful foundation. Without this layer, there is nothing for the blur to sample — the glass effect collapses.",
    code: "bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]",
  },
  {
    id: 1,
    label: "Blur Layer",
    description: "backdrop-blur-xl creates the frosted snapshot of the gradient beneath the panel surface. This is the defining characteristic — without it, you have tint, not glass.",
    code: "backdrop-blur-xl backdrop-saturate-150",
  },
  {
    id: 2,
    label: "Glass Panel",
    description: "Semi-transparent white fill (bg-white/20) with a luminous border at 30% opacity creates the glass surface. The border simulates the bright edge of a pane of glass.",
    code: "bg-white/20 border border-white/30 rounded-2xl",
  },
  {
    id: 3,
    label: "Content Layer",
    description: "White and near-white text with varying opacity levels creates visual hierarchy. High contrast ensures legibility on the blurred frosted surface.",
    code: "text-white / text-white/80 / text-white/60",
  },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "nav";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeBg, setActiveBg] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  // aiRule 1: Optical Glint — trigger sweep manually
  const [glintActive, setGlintActive] = useState(false);
  const [glintTriggered, setGlintTriggered] = useState(false);

  // aiRule 2: Floating Depth — compare cards with float toggle
  const [floatEnabled, setFloatEnabled] = useState(true);
  const [hoveredFloat, setHoveredFloat] = useState<number | null>(null);

  // aiRule 3: Edge Illumination — toggle border brightness levels
  const [edgeLevel, setEdgeLevel] = useState<"low" | "mid" | "high">("low");

  // aiRule 4: Smooth Translucency — live opacity slider
  const [glassOpacity, setGlassOpacity] = useState(20);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function triggerGlint() {
    if (glintActive) return;
    setGlintActive(true);
    setGlintTriggered(true);
    setTimeout(() => setGlintActive(false), 900);
  }

  const edgeBorderOpacity = { low: "rgba(255,255,255,0.2)", mid: "rgba(255,255,255,0.45)", high: "rgba(255,255,255,0.72)" };
  const edgeGlowShadow = { low: "none", mid: "0 0 12px 1px rgba(255,255,255,0.22)", high: "0 0 28px 5px rgba(255,255,255,0.42)" };

  const currentGradient = gradientPresets[activeBg];

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}
    >
      <style>{`
        @keyframes glass-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes glass-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 10px) scale(0.97); }
        }
        @keyframes glass-pulse-glow {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.85; }
        }
        @keyframes glass-shimmer {
          0% { transform: translateX(-160%) skewX(-24deg); }
          100% { transform: translateX(160%) skewX(-24deg); }
        }
        .glass-shimmer-anim {
          animation: glass-shimmer 0.82s ease-out forwards;
        }
        .glass-float-anim {
          animation: glass-float 6s ease-in-out infinite;
        }
        .glass-orb-anim { animation: glass-orb-drift 8s ease-in-out infinite; }
        .glass-orb-anim-2 { animation: glass-orb-drift 11s ease-in-out infinite 2s; }
        .glass-orb-anim-3 { animation: glass-orb-drift 9s ease-in-out infinite 4s; }
        .glass-pulse-anim { animation: glass-pulse-glow 3s ease-in-out infinite; }
        .glass-transition { transition: all 0.3s ease-out; }
      `}</style>

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/25">
            <DiamondIcon className="w-4 h-4 text-white/90" />
            <span className="text-sm font-semibold text-white tracking-tight">
              Glass<span className="text-white/65">morphism</span>
            </span>
          </div>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "AI Rules", "Do / Don't", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm text-white/65 hover:text-white hover:bg-white/10 cursor-pointer glass-transition"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back to StyleKit */}
          <Link
            href="/"
            className="group relative flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 text-white text-sm font-medium overflow-hidden hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] glass-transition"
          >
            <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
            <span className="relative z-10">← StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative pt-28 md:pt-36 pb-28 px-5 md:px-10 overflow-hidden">
        {/* Background orbs */}
        <div
          className="absolute top-10 right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none glass-orb-anim"
          style={{ background: "radial-gradient(circle, rgba(240,147,251,0.35) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[200px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none glass-orb-anim-2"
          style={{ background: "radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-10 right-1/3 w-[350px] h-[350px] rounded-full pointer-events-none glass-orb-anim-3"
          style={{ background: "radial-gradient(circle, rgba(245,87,108,0.28) 0%, transparent 70%)" }}
        />

        {/* Floating glass decoration panels */}
        <div
          className="absolute top-24 right-16 w-28 h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pointer-events-none hidden md:block glass-float-anim"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-52 left-8 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pointer-events-none hidden md:block glass-float-anim"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-32 right-8 w-16 h-16 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl pointer-events-none hidden md:block glass-float-anim"
          style={{ animationDelay: "2.8s" }}
        />

        <div className="max-w-6xl mx-auto text-center relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/90 text-xs font-semibold tracking-[0.16em] uppercase mb-8">
              <DiamondIcon className="w-3 h-3" />
              玻璃拟态 — Glassmorphism
              <DiamondIcon className="w-3 h-3" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.0] tracking-tight mb-6 text-white"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            See Through.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Layers Deep.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Half-transparent panels, backdrop blur, and luminous edges create a modern
            depth that feels like frosted glass catching light.
          </p>

          {/* CTA buttons with glint */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/25 hover:border-white/45 hover:shadow-[0_10px_26px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 active:scale-[0.98] glass-transition overflow-hidden">
              <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
              <DiamondIcon className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Explore Glass</span>
            </button>
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white/80 font-medium hover:bg-white/15 hover:text-white hover:-translate-y-0.5 glass-transition overflow-hidden">
              <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
              <LayersIcon className="relative z-10 w-4 h-4" />
              <span className="relative z-10">View Layers</span>
            </button>
          </div>

          {/* Stats / property cards */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "backdrop-blur", label: "Core Effect" },
              { value: "bg-white/20", label: "Glass Base" },
              { value: "border/25", label: "Edge Glow" },
              { value: "shadow-xl", label: "Depth Layer" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center overflow-hidden hover:bg-white/15 hover:border-white/35 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] glass-transition cursor-default"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                <div className="relative text-sm font-bold mb-1 font-mono text-white">{stat.value}</div>
                <div className="relative text-xs text-white/55 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. BACKGROUND GRADIENT SWITCHER                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Gradient <span className="text-white/65">backgrounds</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Glassmorphism requires a rich gradient background. The glass effect only emerges
              when there is something vibrant behind it to blur and refract.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {gradientPresets.map((bg, i) => (
                <button
                  key={bg.name}
                  onClick={() => setActiveBg(i)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium glass-transition border ${
                    activeBg === i
                      ? "bg-white/25 border-white/45 text-white"
                      : "bg-white/10 border-white/20 text-white/65 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden p-10 md:p-16 min-h-[320px] flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentGradient.from} 0%, ${currentGradient.via} 50%, ${currentGradient.to} 100%)`,
                transition: "background 0.8s ease-out",
              }}
            >
              {/* Orb decorations inside */}
              <div
                className="absolute top-8 right-12 w-32 h-32 rounded-full glass-pulse-anim"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
              />
              <div
                className="absolute bottom-6 left-8 w-24 h-24 rounded-full glass-pulse-anim"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)", animationDelay: "1.5s" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                {["Small Panel", "Main Content", "Side Panel"].map((label, i) => (
                  <div
                    key={label}
                    className="group relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-6 overflow-hidden hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 glass-transition"
                  >
                    <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                    <div className="relative text-white font-semibold text-sm mb-2">{label}</div>
                    <div className="relative text-white/55 text-xs">Glass panel {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COLOR PALETTE                                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              Palette
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Glass <span className="text-white/65">color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Two transparent glass layers and four gradient accent colors compose the entire
              palette. With glassmorphism, the transparency is the color.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="group relative cursor-default"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="h-24 rounded-2xl mb-3 border border-white/20 overflow-hidden relative"
                    style={{
                      backgroundColor: swatch.hex,
                      transform: hoveredSwatch === i ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                      boxShadow: hoveredSwatch === i ? "0 16px 32px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.12)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
                    }}
                  >
                    {/* Shimmer sweep on hover */}
                    {hoveredSwatch === i && (
                      <div
                        className="absolute inset-0 glass-shimmer-anim"
                        style={{
                          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                          transform: "skewX(-24deg)",
                        }}
                      />
                    )}
                    {/* Checkerboard for transparent swatches */}
                    {swatch.name.includes("Glass") && (
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage: "repeating-conic-gradient(#aaa 0% 25%, #fff 0% 50%)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white">{swatch.name}</div>
                  <div className="text-xs text-white/45 font-mono mt-0.5">{swatch.display}</div>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/65 bg-white/10 border border-white/15">
                    {swatch.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient combinations */}
          <RevealBlock delay={0.2}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-6">
                Recommended gradient combinations
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Purple Pink", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" },
                  { name: "Blue Purple", gradient: "linear-gradient(135deg, #4facfe 0%, #6a85f5 50%, #764ba2 100%)" },
                  { name: "Sunset Rose", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
                ].map((g) => (
                  <div key={g.name} className="group cursor-default">
                    <div
                      className="h-16 rounded-xl mb-2 border border-white/10 group-hover:-translate-y-1 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] glass-transition"
                      style={{ background: g.gradient }}
                    />
                    <div className="text-xs text-white/55 text-center">{g.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPONENT GALLERY                                         */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Glass <span className="text-white/65">building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Every component is a glass panel. Half-transparent, blurred, bordered with
              luminous edges. Hover triggers an optical glint sweep across the surface.
            </p>
          </RevealBlock>

          {/* Tab pills */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "nav"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize glass-transition border ${
                    activeTab === tab
                      ? "bg-white/25 border-white/45 text-white shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
                      : "bg-white/10 border-white/20 text-white/65 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12">

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-5">
                      Primary — Glass button with optical glint
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="group relative px-6 py-3 bg-white/20 backdrop-blur-md border border-white/25 rounded-xl text-white font-medium shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/25 hover:border-white/45 hover:shadow-[0_10px_26px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 active:scale-[0.98] glass-transition overflow-hidden">
                        <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2"><DiamondIcon className="w-4 h-4" />Primary Glass</span>
                      </button>
                      <button className="group relative px-6 py-3 bg-white/10 backdrop-blur-md border border-white/18 rounded-xl text-white/80 font-medium hover:bg-white/15 hover:border-white/30 hover:text-white hover:-translate-y-0.5 glass-transition overflow-hidden">
                        <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2"><LayersIcon className="w-4 h-4" />Subtle Glass</span>
                      </button>
                      <button className="group relative px-6 py-3 rounded-xl text-white font-medium overflow-hidden hover:-translate-y-0.5 glass-transition" style={{ background: "linear-gradient(135deg, rgba(102,126,234,0.7), rgba(240,147,251,0.7))", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                        <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2"><GlintIcon className="w-4 h-4" />Gradient Glass</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-5">Size variants</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", cls: "px-4 py-2 text-xs rounded-lg" },
                        { size: "md", cls: "px-6 py-3 text-sm rounded-xl" },
                        { size: "lg", cls: "px-9 py-4 text-base rounded-xl" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`group relative bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 glass-transition overflow-hidden ${cls}`}
                        >
                          <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                          <span className="relative z-10">{size.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-5">State variants</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="group relative px-6 py-3 bg-white/20 backdrop-blur-md border border-white/25 rounded-xl text-white font-medium glass-transition overflow-hidden">
                        <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10">Default</span>
                      </button>
                      <button className="px-6 py-3 bg-white/28 backdrop-blur-md border border-white/48 rounded-xl text-white font-medium shadow-[0_10px_26px_rgba(0,0,0,0.16)]" style={{ transform: "translateY(-2px)" }}>
                        Hovered
                      </button>
                      <button className="px-6 py-3 bg-white/8 backdrop-blur-md border border-white/12 rounded-xl text-white/38 font-medium cursor-not-allowed">
                        Disabled
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { title: "Weather Widget", desc: "Current weather with glassmorphic panels layered over a vibrant sky gradient.", icon: <BlurIcon className="w-6 h-6" />, accent: "#667eea" },
                    { title: "Music Player", desc: "Album art as background, controls floated in frosted glass overlays.", icon: <DiamondIcon className="w-6 h-6" />, accent: "#f093fb" },
                    { title: "Auth Card", desc: "Login form floating transparently over a gradient mesh background.", icon: <LayersIcon className="w-6 h-6" />, accent: "#764ba2" },
                    { title: "Dashboard", desc: "Stats and metrics in glass panels arranged with visible depth layers.", icon: <GlintIcon className="w-6 h-6" />, accent: "#f5576c" },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-7 overflow-hidden cursor-default hover:bg-white/20 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.2)] glass-transition"
                    >
                      <span className="absolute inset-0 -translate-x-[150%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />
                      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/15 border border-white/20" style={{ color: card.accent }}>{card.icon}</div>
                      <h4 className="relative text-white text-lg font-semibold mb-2">{card.title}</h4>
                      <p className="relative text-white/60 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/75 mb-2">Username</label>
                      <input type="text" placeholder="Enter username..." className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/38 focus:outline-none focus:border-white/40 focus:bg-white/15 glass-transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/75 mb-2">Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/38 focus:outline-none focus:border-white/40 focus:bg-white/15 glass-transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/75 mb-2">Message</label>
                      <textarea rows={3} placeholder="Write something..." className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/38 focus:outline-none focus:border-white/40 focus:bg-white/15 glass-transition resize-none" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/75 mb-2">Select theme</label>
                      <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 glass-transition">
                        <option className="text-gray-800">Purple Pink</option>
                        <option className="text-gray-800">Blue Purple</option>
                        <option className="text-gray-800">Cyan Blue</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-white/20 border border-white/30 flex items-center justify-center cursor-pointer">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <label className="text-sm text-white/65">Enable backdrop blur</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-white/10 border border-white/20 cursor-pointer" />
                      <label className="text-sm text-white/65">Reduce glass opacity</label>
                    </div>
                    <button className="group relative w-full py-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium hover:bg-white/25 hover:border-white/40 glass-transition overflow-hidden">
                      <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                      <span className="relative z-10">Submit</span>
                    </button>
                  </div>
                </div>
              )}

              {/* NAV TAB */}
              {activeTab === "nav" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-5">Fixed navigation bar</p>
                    <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)" }}>
                      <div className="px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DiamondIcon className="w-4 h-4 text-white" />
                          <span className="text-white font-bold text-base">Logo</span>
                        </div>
                        <div className="hidden sm:flex gap-5">
                          {["Home", "About", "Work"].map((item) => (
                            <span key={item} className="text-white/75 hover:text-white cursor-pointer glass-transition text-sm">{item}</span>
                          ))}
                        </div>
                        <button className="group relative px-4 py-2 bg-white/20 backdrop-blur-md border border-white/25 rounded-lg text-white text-sm font-medium overflow-hidden hover:bg-white/25 hover:border-white/40 glass-transition">
                          <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                          <span className="relative z-10">Get Started</span>
                        </button>
                      </div>
                      <div className="p-12 flex items-center justify-center text-white/40 text-sm">Page content appears here</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-5">Breadcrumb navigation</p>
                    <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-fit">
                      {["Home", "Styles", "Glassmorphism"].map((crumb, i) => (
                        <div key={crumb} className="flex items-center gap-2">
                          {i > 0 && <span className="text-white/28">/</span>}
                          <span className={`text-sm ${i === 2 ? "text-white font-medium" : "text-white/55 hover:text-white cursor-pointer glass-transition"}`}>{crumb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. AI RULES INTERACTIVE DEMOS — ALL 4 RULES                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              AI Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Interaction <span className="text-white/65">rules demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Four named interaction rules define how glassmorphism elements behave.
              Interact with each demo to feel the optical physics in action.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* ---- RULE 1: Optical Glint ---- */}
            <RevealBlock delay={0.08}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/22 text-white/90 text-xs font-semibold mb-3">
                    Rule 1: Optical Glint
                  </span>
                  <p className="text-xs text-white/48 leading-relaxed mb-2">
                    A tilted gradient highlight sweeps once across the glass surface, simulating
                    light refraction through a real pane of glass. Never loops — single pass only.
                  </p>
                  <code className="block text-[10px] font-mono text-white/35 leading-relaxed">
                    -translate-x-[140%] skew-x-[-24deg]<br />
                    group-hover:translate-x-[140%] duration-700
                  </code>
                </div>
                <div className="flex flex-col items-center gap-4 mt-6">
                  <button
                    onClick={triggerGlint}
                    className="relative px-8 py-4 bg-white/20 backdrop-blur-md border border-white/25 rounded-xl text-white font-medium shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 glass-transition overflow-hidden"
                  >
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent ${glintActive ? "glass-shimmer-anim" : ""}`}
                      style={{
                        transform: glintActive ? undefined : "translateX(-160%) skewX(-24deg)",
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <GlintIcon className="w-4 h-4" />
                      {glintTriggered ? "Click again!" : "Click to trigger glint"}
                    </span>
                  </button>
                  <p className="text-xs text-white/38 text-center">
                    {glintActive
                      ? "Glint sweeping — single pass, no loop"
                      : "Click the button to see the Optical Glint animation"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 2: Floating Depth ---- */}
            <RevealBlock delay={0.12}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/22 text-white/90 text-xs font-semibold mb-3">
                    Rule 2: Floating Depth
                  </span>
                  <p className="text-xs text-white/48 leading-relaxed mb-2">
                    Hover lifts the element with a slight translateY and expands the shadow,
                    simulating the panel floating closer to the viewer through the glass layers.
                  </p>
                  <code className="block text-[10px] font-mono text-white/35 leading-relaxed">
                    hover:-translate-y-0.5 to hover:-translate-y-2<br />
                    shadow expands proportionally with lift
                  </code>
                </div>
                <div className="flex items-center gap-3 mt-4 mb-4">
                  <button
                    onClick={() => setFloatEnabled((p) => !p)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium glass-transition border ${
                      floatEnabled
                        ? "bg-white/25 border-white/40 text-white"
                        : "bg-white/10 border-white/20 text-white/55"
                    }`}
                  >
                    Float: {floatEnabled ? "ON" : "OFF"}
                  </button>
                  <span className="text-xs text-white/38">Toggle to compare</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center overflow-hidden"
                      style={{
                        transform: floatEnabled && hoveredFloat === i ? `translateY(-${(i + 1) * 2}px)` : "translateY(0)",
                        boxShadow: floatEnabled && hoveredFloat === i ? `0 ${(i + 1) * 8}px ${(i + 1) * 16}px rgba(0,0,0,${0.15 + i * 0.05})` : "none",
                        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                        cursor: floatEnabled ? "pointer" : "default",
                      }}
                      onMouseEnter={() => floatEnabled && setHoveredFloat(i)}
                      onMouseLeave={() => setHoveredFloat(null)}
                    >
                      {floatEnabled && hoveredFloat === i && (
                        <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/20 to-transparent glass-shimmer-anim" />
                      )}
                      <div className="relative text-white text-xs font-medium">Panel {i + 1}</div>
                      <div className="relative text-white/45 text-[10px] mt-1">-{(i + 1) * 2}px lift</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/35 text-center mt-3">
                  {floatEnabled ? "Hover each panel to see depth lift" : "Enable float to see the effect"}
                </p>
              </div>
            </RevealBlock>

            {/* ---- RULE 3: Edge Illumination ---- */}
            <RevealBlock delay={0.16}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/22 text-white/90 text-xs font-semibold mb-3">
                    Rule 3: Edge Illumination
                  </span>
                  <p className="text-xs text-white/48 leading-relaxed mb-2">
                    Border opacity increases from white/20 to white/70+ on interaction, simulating
                    a glass edge catching direct light. Paired with a white glow shadow.
                  </p>
                  <code className="block text-[10px] font-mono text-white/35 leading-relaxed">
                    border-white/20 → border-white/45 → white/72<br />
                    box-shadow glow expands with border brightness
                  </code>
                </div>
                <div className="flex gap-2 mt-5 mb-5">
                  {(["low", "mid", "high"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setEdgeLevel(level)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium glass-transition border capitalize ${
                        edgeLevel === level
                          ? "bg-white/25 border-white/45 text-white"
                          : "bg-white/10 border-white/20 text-white/55 hover:bg-white/15"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div
                  className="relative bg-white/15 backdrop-blur-xl rounded-xl p-6 text-center"
                  style={{
                    border: `1px solid ${edgeBorderOpacity[edgeLevel]}`,
                    boxShadow: edgeGlowShadow[edgeLevel],
                    transition: "border-color 0.4s ease-out, box-shadow 0.4s ease-out",
                  }}
                >
                  <div className="text-white font-semibold mb-1">Glass Panel</div>
                  <div className="text-white/55 text-xs">
                    Border opacity: {edgeLevel === "low" ? "20%" : edgeLevel === "mid" ? "45%" : "72%"}
                  </div>
                  <div className="text-white/38 text-xs mt-1">
                    Glow: {edgeLevel === "low" ? "none" : edgeLevel === "mid" ? "subtle" : "strong"}
                  </div>
                </div>
                <p className="text-xs text-white/35 text-center mt-3">
                  Switch levels to see border brightness change
                </p>
              </div>
            </RevealBlock>

            {/* ---- RULE 4: Smooth Translucency ---- */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/22 text-white/90 text-xs font-semibold mb-3">
                    Rule 4: Smooth Translucency
                  </span>
                  <p className="text-xs text-white/48 leading-relaxed mb-2">
                    All transitions use duration-300 with ease-out for silky optical changes.
                    Opacity shifts feel like light passing through — never abrupt.
                  </p>
                  <code className="block text-[10px] font-mono text-white/35 leading-relaxed">
                    transition-all duration-300 ease-out<br />
                    bg-white/{"{opacity}"} — drag slider to see live
                  </code>
                </div>
                <div className="mt-5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/55">Glass opacity</span>
                    <span className="text-xs text-white font-mono">{glassOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={45}
                    value={glassOpacity}
                    onChange={(e) => setGlassOpacity(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: "rgba(255,255,255,0.7)" }}
                  />
                  <div className="flex justify-between text-[10px] text-white/28 mt-1">
                    <span>5% (too thin)</span>
                    <span>20% (ideal)</span>
                    <span>45% (opaque)</span>
                  </div>
                </div>
                <div
                  className="relative rounded-xl p-5 border border-white/20 text-center backdrop-blur-xl"
                  style={{
                    backgroundColor: `rgba(255,255,255,${glassOpacity / 100})`,
                    transition: "background-color 0.3s ease-out",
                  }}
                >
                  <div className="text-white font-semibold mb-1">Live Glass Preview</div>
                  <div className="text-white/65 text-xs">
                    {glassOpacity < 12
                      ? "Too transparent — content hard to read"
                      : glassOpacity > 35
                      ? "Too opaque — losing the glass effect"
                      : "Ideal range — balanced depth and readability"}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. LAYER DEPTH INTERACTIVE DEMO                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Layer <span className="text-white/65">depth system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Glassmorphism is built from four stacked layers. Click each tab to see
              what each layer contributes to the final frosted glass effect.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {layerData.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium glass-transition border ${
                    activeLayer === layer.id
                      ? "bg-white/25 border-white/45 text-white"
                      : "bg-white/10 border-white/20 text-white/65 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {layer.id + 1}. {layer.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Visual preview */}
              <div className="relative h-72 rounded-2xl overflow-hidden border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]" />
                {activeLayer === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg drop-shadow-lg">Gradient Background</p>
                      <p className="text-white/65 text-sm mt-1">The colorful foundation</p>
                    </div>
                  </div>
                )}
                {activeLayer >= 1 && <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />}
                {activeLayer === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">+ Blur Layer</p>
                      <p className="text-white/65 text-sm mt-1">backdrop-blur-xl applied</p>
                    </div>
                  </div>
                )}
                {activeLayer >= 2 && <div className="absolute inset-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl" />}
                {activeLayer === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">+ Glass Panel</p>
                      <p className="text-white/65 text-sm mt-1">bg-white/20 border-white/30</p>
                    </div>
                  </div>
                )}
                {activeLayer >= 3 && (
                  <div className="absolute inset-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col items-center justify-center gap-3 p-5">
                    <p className="text-white font-bold text-base">Content Layer</p>
                    <p className="text-white/65 text-xs text-center">White text reads clearly on frosted glass</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 text-xs bg-white/20 border border-white/25 rounded-full text-white">Badge</span>
                      <span className="px-3 py-1 text-xs bg-white/20 border border-white/25 rounded-full text-white">Tag</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description panel */}
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-sm">
                    {activeLayer + 1}
                  </div>
                  <h3 className="text-white font-semibold text-lg">{layerData[activeLayer].label}</h3>
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-5">{layerData[activeLayer].description}</p>
                <div className="bg-black/20 rounded-xl p-3 border border-white/10">
                  <code className="text-xs text-white/65 font-mono leading-relaxed break-all">{layerData[activeLayer].code}</code>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. REAL-WORLD APP DEMO                                       */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Glass <span className="text-white/65">in the wild</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Three real-world patterns showing glassmorphism applied to login,
              weather, and analytics UI. All panels use backdrop-blur over the gradient.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Login Card */}
            <RevealBlock delay={0.1}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-white/38 mb-5">Login</div>
                <div className="text-xl font-bold text-white mb-1">Welcome back</div>
                <div className="text-white/55 text-sm mb-6">Sign into your account</div>
                <div className="space-y-3 mb-5">
                  <input type="email" placeholder="Email address" readOnly className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white/85 placeholder-white/35 text-sm focus:outline-none" />
                  <input type="password" placeholder="Password" readOnly className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white/85 placeholder-white/35 text-sm focus:outline-none" />
                </div>
                <button className="group relative w-full py-3 bg-white/20 backdrop-blur-md border border-white/25 rounded-xl text-white font-medium hover:bg-white/25 hover:border-white/40 glass-transition overflow-hidden">
                  <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
                  <span className="relative z-10">Sign In</span>
                </button>
                <div className="text-center mt-4 text-xs text-white/35">
                  No account? <span className="text-white/65 cursor-pointer hover:text-white glass-transition">Register</span>
                </div>
              </div>
            </RevealBlock>

            {/* Weather Widget */}
            <RevealBlock delay={0.15}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-white/38 mb-5">Weather</div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-5xl font-bold text-white">24°</div>
                    <div className="text-white/65 text-sm mt-1">Partly Cloudy</div>
                    <div className="text-white/45 text-xs mt-0.5">San Francisco, CA</div>
                  </div>
                  <div className="w-16 h-16 bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center">
                    <BlurIcon className="w-8 h-8 text-white/75" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Mon", "Tue", "Wed"].map((day, i) => (
                    <div key={day} className="bg-white/10 border border-white/15 rounded-xl p-3 text-center">
                      <div className="text-white/45 text-xs mb-1">{day}</div>
                      <div className="text-white text-sm font-semibold">{19 + i * 2}°</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  {[{ label: "Humidity", val: "68%" }, { label: "Wind", val: "12km/h" }].map((stat) => (
                    <div key={stat.label} className="flex-1 bg-white/10 border border-white/15 rounded-xl p-3 text-center">
                      <div className="text-white/45 text-xs">{stat.label}</div>
                      <div className="text-white text-sm font-semibold mt-0.5">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Dashboard Analytics */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-white/38 mb-5">Analytics</div>
                <div className="text-xl font-bold text-white mb-1">Dashboard</div>
                <div className="text-white/55 text-sm mb-6">Last 30 days</div>
                <div className="space-y-4">
                  {[
                    { label: "Total Users", val: "12,840", pct: 75, color: "#667eea" },
                    { label: "Revenue", val: "$48,200", pct: 60, color: "#f093fb" },
                    { label: "Conversions", val: "3.8%", pct: 38, color: "#764ba2" },
                    { label: "Retention", val: "91%", pct: 91, color: "#f5576c" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-white/65 text-xs">{metric.label}</span>
                        <span className="text-white text-xs font-semibold">{metric.val}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${metric.pct}%`, backgroundColor: metric.color, opacity: 0.9 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. DO / DON'T RULES                                          */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Do <span className="text-white/65">&amp; Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Glassmorphism has strict requirements. Breaking these rules destroys the
              illusion — the effect collapses into muddy, unreadable transparency.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Do</h3>
                  <DiamondIcon className="w-4 h-4 text-white/28 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Use semi-transparent backgrounds bg-white/10 to bg-white/30",
                    "Always add backdrop-blur-md or backdrop-blur-xl",
                    "Use subtle borders border border-white/20",
                    "Add soft diffuse shadows shadow-lg or shadow-xl",
                    "Use gradient backgrounds as the base layer bg-gradient-to-br",
                    "Use moderate rounded corners rounded-xl or rounded-2xl",
                    "Ensure high contrast text for readability on frosted surfaces",
                    "Add optical glint sweep on interaction — single pass, no loop",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-white/40 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-white/70" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Don&apos;t</h3>
                  <LayersIcon className="w-4 h-4 text-white/18 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Never use glass on pure white or solid color backgrounds",
                    "Never omit backdrop-blur — it is the core effect",
                    "Never make panels so transparent content becomes unreadable",
                    "Never use hard-edge shadows shadow-[Xpx_Xpx_0px]",
                    "Never use opaque backgrounds bg-white or bg-black",
                    "Never use sharp corners rounded-none",
                    "Never use low-contrast text on low-contrast glass",
                    "Never loop the glint animation — single sweep only, no flicker",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-white/22 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. DESIGN PHILOSOPHY                                        */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Design <span className="text-white/65">principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Four core principles from iOS and macOS design language define how glassmorphism
              creates spatial depth without physical weight.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
            {[
              {
                icon: <LayersIcon className="w-7 h-7" />,
                title: "Hierarchy through transparency",
                tagline: "Depth without opacity",
                desc: "Layers are distinguished by their transparency level. Front panels use bg-white/20, back panels bg-white/10. The closer a panel is to the viewer, the more defined its glass properties.",
                code: "bg-white/10 → bg-white/20 → bg-white/30",
                accent: "#667eea",
              },
              {
                icon: <BlurIcon className="w-7 h-7" />,
                title: "Modern high-tech atmosphere",
                tagline: "Blur creates premium",
                desc: "backdrop-blur-md and backdrop-blur-xl signal quality and modernity. The blurred background beneath each panel implies depth and the sense that you are floating above rich content.",
                code: "backdrop-blur-md, backdrop-blur-xl",
                accent: "#764ba2",
              },
              {
                icon: <DiamondIcon className="w-7 h-7" />,
                title: "Visual lightness",
                tagline: "Transparency reduces weight",
                desc: "Semi-transparent elements feel lighter than their opaque counterparts. The eye perceives them as floating rather than sitting — creating an airy, modern interface feel.",
                code: "shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
                accent: "#f093fb",
              },
              {
                icon: <GlintIcon className="w-7 h-7" />,
                title: "Spatial depth",
                tagline: "Soft shadows add dimension",
                desc: "Soft diffuse shadows without hard edges create the final dimension. The shadow tells the eye that the panel exists above the background — it is floating in three-dimensional space.",
                code: "shadow-lg, shadow-xl, shadow-2xl",
                accent: "#f5576c",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.08}>
                <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full overflow-hidden hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 glass-transition cursor-default">
                  <span className="absolute inset-0 -translate-x-[150%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />
                  <div
                    className="relative w-14 h-14 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-5"
                    style={{ color: principle.accent }}
                  >
                    {principle.icon}
                  </div>
                  <h3 className="relative text-xl font-bold text-white mb-1">{principle.title}</h3>
                  <p className="relative text-sm font-medium mb-4 text-white/55">{principle.tagline}</p>
                  <p className="relative text-white/52 text-sm leading-relaxed mb-5">{principle.desc}</p>
                  <code className="relative block text-xs font-mono text-white/38 bg-black/15 border border-white/10 rounded-lg px-3 py-2">
                    {principle.code}
                  </code>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Layer structure diagram */}
          <RevealBlock delay={0.25}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/45 mb-6">
                Layer architecture — required stacking order
              </p>
              <div className="space-y-3">
                {[
                  { layer: "1. Bottom", desc: "Gradient or image background (required — glass needs something rich to blur)", code: "bg-gradient-to-br", depth: 100 },
                  { layer: "2. Middle", desc: "Glass container — backdrop-blur + bg-white/10 to /30 + border-white/20", code: "backdrop-blur-xl", depth: 70 },
                  { layer: "3. Top", desc: "Content elements — text-white, icons, inputs, buttons", code: "text-white", depth: 45 },
                ].map((l) => (
                  <div key={l.layer} className="flex items-center gap-4 p-4 bg-white/8 border border-white/10 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-white shrink-0" style={{ opacity: l.depth / 100 }} />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{l.layer}</div>
                      <div className="text-white/45 text-xs mt-0.5">{l.desc}</div>
                    </div>
                    <code className="text-xs font-mono text-white/35 hidden sm:block">{l.code}</code>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="relative border-t border-white/10 overflow-hidden">
        {/* Orb decoration */}
        <div
          className="absolute top-0 right-1/4 w-64 h-64 rounded-full pointer-events-none opacity-28"
          style={{ background: "radial-gradient(circle, rgba(240,147,251,0.5) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center">
                  <DiamondIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Glass<span className="text-white/55">morphism</span>
                </span>
              </div>
              <p className="text-sm text-white/45 leading-relaxed">
                Half-transparent frosted glass panels, backdrop blur, and luminous
                borders creating modern depth inspired by iOS and macOS design.
              </p>
              <div className="flex gap-2 items-center">
                {["rgba(255,255,255,0.25)", "#667eea", "#764ba2", "#f093fb", "#f5576c"].map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-white/20 hover:scale-125 glass-transition cursor-default"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/38">Style</span>
                <Link href="/styles/glassmorphism" className="text-white/55 hover:text-white glass-transition">Documentation</Link>
                <Link href="/styles/glassmorphism/showcase" className="text-white/55 hover:text-white glass-transition">Showcase</Link>
                <Link href="/styles/glassmorphism/cover" className="text-white/55 hover:text-white glass-transition">Cover</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/38">StyleKit</span>
                <Link href="/" className="text-white/55 hover:text-white glass-transition">Home</Link>
                <Link href="/styles" className="text-white/55 hover:text-white glass-transition">All Styles</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/38">Core Values</span>
                {["backdrop-blur", "bg-white/20", "border-white/25", "shadow-xl"].map((v) => (
                  <span key={v} className="text-white/35 text-xs font-mono">{v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 rounded-full" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/38">
              <DiamondIcon className="w-3 h-3 text-white/38" />
              <span>Glassmorphism showcase for StyleKit</span>
            </div>
            <Link
              href="/"
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white/75 text-sm font-medium overflow-hidden hover:bg-white/20 hover:text-white hover:border-white/35 hover:-translate-y-0.5 glass-transition"
            >
              <span className="absolute inset-0 -translate-x-[140%] skew-x-[-24deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[140%] transition-transform duration-700 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                <ArrowRightIcon className="w-3 h-3 rotate-180" />
                Back to StyleKit
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
