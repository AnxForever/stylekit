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
/*  Inline SVG decorations                                             */
/* ------------------------------------------------------------------ */

function DiamondIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2L2 9l10 13L22 9 12 2z" />
    </svg>
  );
}

function OrnamentIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="20,2 22,18 38,20 22,22 20,38 18,22 2,20 18,18" />
    </svg>
  );
}

function CornerAccent({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const posClass =
    position === "tl"
      ? "top-0 left-0 border-t-2 border-l-2"
      : position === "tr"
      ? "top-0 right-0 border-t-2 border-r-2"
      : position === "bl"
      ? "bottom-0 left-0 border-b-2 border-l-2"
      : "bottom-0 right-0 border-b-2 border-r-2";
  return (
    <div
      className={`absolute w-6 h-6 border-yellow-500/60 ${posClass} pointer-events-none`}
    />
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-600/60" />
      <DiamondIcon className="w-2.5 h-2.5 text-yellow-500" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-600/60" />
    </div>
  );
}

function RadialLines({ count = 12, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent origin-left"
          style={{ transform: `rotate(${i * (180 / count)}deg) translateY(-50%)` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                 */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Deco Gold", hex: "#d4af37", label: "Primary" },
  { name: "Midnight Navy", hex: "#1a1a2e", label: "Background" },
  { name: "Deep Slate", hex: "#2d2d44", label: "Secondary" },
  { name: "Antique Gold", hex: "#c9a227", label: "Accent" },
  { name: "Ivory Cream", hex: "#f5f5dc", label: "Surface" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // Animation & Interaction demo states
  const [elegantHovered, setElegantHovered] = useState(false);
  const [shimmerHovered, setShimmerHovered] = useState(false);
  const [symmetryHovered, setSymmetryHovered] = useState(false);
  const [liftHovered, setLiftHovered] = useState(false);

  // App demo state
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [reservationStep, setReservationStep] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen font-serif text-yellow-100 overflow-x-hidden"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <style>{`
        @keyframes deco-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes deco-radiate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes deco-pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
          50% { box-shadow: 0 0 20px 4px rgba(212,175,55,0.3); }
        }
        @keyframes deco-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes deco-line-grow {
          from { width: 0; }
          to   { width: 100%; }
        }
        .deco-shimmer-text {
          background: linear-gradient(
            90deg,
            #c9a227 0%,
            #f5d67a 20%,
            #d4af37 40%,
            #fef9c3 60%,
            #d4af37 80%,
            #c9a227 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: deco-shimmer 4s linear infinite;
        }
        .deco-gold-border {
          border: 1px solid #d4af37;
          position: relative;
        }
        .deco-slow-transition {
          transition: all 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .deco-medium-transition {
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .deco-fast-transition {
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .deco-gradient-gold {
          background: linear-gradient(135deg, #d4af37 0%, #f5d67a 50%, #d4af37 100%);
          background-size: 200% auto;
        }
        .deco-gradient-gold:hover {
          background-position: right center;
        }
        .sunburst-bg {
          background-image: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 14deg,
            rgba(212,175,55,0.06) 14deg 15deg
          );
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-600/20"
        style={{
          backgroundColor: "rgba(26,26,46,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <DiamondIcon className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-serif tracking-[0.3em] uppercase text-yellow-400">
              Art<span className="text-yellow-200">Deco</span>
            </span>
            <DiamondIcon className="w-4 h-4 text-yellow-500" />
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Animations", "Gallery", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-4 py-2 text-sm text-yellow-400/70 hover:text-yellow-300 hover:bg-yellow-500/10 cursor-pointer tracking-wider deco-medium-transition"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back to StyleKit */}
          <Link
            href="/styles/art-deco"
            data-back-navigation="true"
            className="flex items-center gap-2 px-5 py-2 border border-yellow-600/60 text-yellow-400 text-sm tracking-[0.15em] uppercase hover:border-yellow-400 hover:text-yellow-200 hover:bg-yellow-500/10 deco-medium-transition"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
        {/* Gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center px-5 md:px-10 overflow-hidden sunburst-bg"
      >
        {/* Radial decoration — top-center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10 pointer-events-none">
          <RadialLines count={24} className="w-full h-full relative" />
        </div>

        {/* Outer ring decoration */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-500/10 rounded-full pointer-events-none"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-yellow-500/08 rounded-full pointer-events-none"
        />

        {/* Floating ornament accents */}
        <div
          className="absolute top-32 left-16 text-yellow-600/30 pointer-events-none hidden md:block"
          style={{ animation: "deco-radiate 20s linear infinite" }}
        >
          <OrnamentIcon className="w-12 h-12" />
        </div>
        <div
          className="absolute bottom-40 right-20 text-yellow-600/20 pointer-events-none hidden md:block"
          style={{ animation: "deco-radiate 30s linear infinite reverse" }}
        >
          <OrnamentIcon className="w-16 h-16" />
        </div>
        <div
          className="absolute top-1/2 right-12 text-yellow-600/15 pointer-events-none hidden md:block"
          style={{ animation: "deco-radiate 25s linear infinite" }}
        >
          <OrnamentIcon className="w-8 h-8" />
        </div>
        <div
          className="absolute top-1/3 left-8 text-yellow-600/15 pointer-events-none hidden md:block"
          style={{ animation: "deco-radiate 18s linear infinite reverse" }}
        >
          <OrnamentIcon className="w-6 h-6" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto pt-24 pb-16">
          {/* Top decorative line */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-yellow-500/80" />
              <DiamondIcon className="w-3 h-3 text-yellow-500" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-yellow-500/80" />
            </div>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s",
            }}
          >
            <span className="text-xs tracking-[0.4em] uppercase text-yellow-500/70 mb-6 block">
              1920 &mdash; 1939 &mdash; The Golden Era
            </span>
          </div>

          {/* Main title */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-[0.08em] uppercase mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="deco-shimmer-text">Art</span>
            <br />
            <span className="text-yellow-100/90">Deco</span>
          </h1>

          {/* Subtitle rule */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <GoldDivider />
          </div>

          {/* Tagline */}
          <p
            className="text-yellow-100/60 text-lg md:text-xl leading-relaxed tracking-[0.12em] max-w-xl mx-auto my-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Geometric symmetry, golden ornament, and high-contrast luxury.
            The design language of the Machine Age — timeless and precise.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.33s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.33s",
            }}
          >
            <button className="px-10 py-4 deco-gradient-gold text-slate-900 font-serif font-bold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:translate-y-0 deco-slow-transition">
              Explore
            </button>
            <button className="px-10 py-4 border border-yellow-500/60 text-yellow-400 font-serif uppercase tracking-[0.3em] hover:border-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-200 deco-medium-transition">
              Learn More
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            {[
              { value: "1920s", label: "Originated", accent: "#d4af37" },
              { value: "45+", label: "Pattern Types", accent: "#c9a227" },
              { value: "Gold", label: "Primary Palette", accent: "#f5d67a" },
              { value: "Serif", label: "Typography", accent: "#d4af37" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="relative border border-yellow-600/25 p-5 text-center hover:border-yellow-500/60 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,175,55,0.15)] deco-slow-transition cursor-default"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="text-2xl font-serif font-bold mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-yellow-500/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-10" style={{ backgroundColor: "#1a1a2e" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              Color System
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              The Golden Palette
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-14 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              Five tones drawn from Chryselephantine sculpture and lacquered
              brass. Every shade earns its place through restraint and contrast.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.15}>
            <div className="flex flex-wrap gap-10 md:gap-16 justify-center mb-16">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-4 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform:
                        hoveredSwatch === i
                          ? "translateY(-8px) scale(1.06)"
                          : "translateY(0) scale(1)",
                      transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28"
                      style={{
                        backgroundColor: swatch.hex,
                        border:
                          swatch.hex === "#f5f5dc" || swatch.hex === "#1a1a2e"
                            ? "1px solid rgba(212,175,55,0.4)"
                            : "none",
                        boxShadow:
                          hoveredSwatch === i
                            ? `0 16px 36px rgba(212,175,55,0.3), 0 4px 12px ${swatch.hex}66`
                            : `0 4px 16px ${swatch.hex}44`,
                        transition: "box-shadow 0.5s ease",
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-serif text-yellow-200 tracking-wider">{swatch.name}</div>
                    <div className="text-xs text-yellow-500/50 font-mono mt-1">{swatch.hex}</div>
                    <span className="inline-block mt-2 px-3 py-0.5 border border-yellow-500/30 text-[10px] tracking-[0.2em] uppercase text-yellow-500/60">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient combinations */}
          <RevealBlock delay={0.22}>
            <div
              className="relative border border-yellow-600/25 p-8"
              style={{ backgroundColor: "#2d2d44" }}
            >
              <CornerAccent position="tl" />
              <CornerAccent position="tr" />
              <CornerAccent position="bl" />
              <CornerAccent position="br" />
              <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                Gradient combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#d4af37", to: "#1a1a2e", label: "Gold to Night" },
                  { from: "#1a1a2e", to: "#d4af37", label: "Night to Gold" },
                  { from: "#c9a227", to: "#2d2d44", label: "Antique to Slate" },
                  { from: "#f5f5dc", to: "#d4af37", label: "Cream to Gold" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-16 mb-2 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(212,175,55,0.2)] deco-medium-transition"
                      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                    />
                    <div className="text-xs tracking-wider text-yellow-500/50 text-center">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (tabs)                                      */}
      {/* ================================================================ */}
      <section
        className="py-24 md:py-32 px-5 md:px-10 sunburst-bg"
        style={{ backgroundColor: "#1d1d35" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              Building Blocks
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-10 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              Every element is governed by symmetry, serif type, and gold
              as the sole accent. No component escapes the geometric grid.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.15} className="mb-8">
            <div className="flex flex-wrap gap-1 border-b border-yellow-600/20">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-serif uppercase tracking-[0.25em] deco-medium-transition ${
                    activeTab === tab
                      ? "border-b-2 border-yellow-500 text-yellow-400 -mb-px bg-yellow-500/5"
                      : "text-yellow-500/40 hover:text-yellow-400/70 hover:bg-yellow-500/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.18}>
            <div
              className="relative border border-yellow-600/20 p-8 md:p-12"
              style={{ backgroundColor: "#2d2d44" }}
            >
              <CornerAccent position="tl" />
              <CornerAccent position="tr" />
              <CornerAccent position="bl" />
              <CornerAccent position="br" />

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  {/* Primary — Golden Shimmer */}
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                      Primary &mdash; Golden Shimmer gradient sweep
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="px-10 py-4 deco-gradient-gold text-slate-900 font-serif font-bold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 active:translate-y-0 deco-slow-transition">
                        Discover
                      </button>
                      <button className="px-10 py-4 border border-yellow-500 text-yellow-400 font-serif uppercase tracking-[0.3em] hover:bg-yellow-500 hover:text-slate-900 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] deco-slow-transition">
                        Enter
                      </button>
                    </div>
                  </div>

                  {/* Subtle + Ghost */}
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                      Ghost &amp; Outline variants
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="px-8 py-3 border border-yellow-600/40 text-yellow-500/70 font-serif uppercase tracking-[0.25em] text-sm hover:border-yellow-500 hover:text-yellow-300 deco-medium-transition">
                        Reserve
                      </button>
                      <button className="px-8 py-3 text-yellow-500/60 font-serif uppercase tracking-[0.25em] text-sm hover:text-yellow-300 hover:bg-yellow-500/10 deco-medium-transition">
                        Learn
                      </button>
                      <button className="inline-flex items-center gap-3 px-8 py-3 border-2 border-yellow-500/80 text-yellow-400 font-serif uppercase tracking-[0.25em] text-sm hover:border-yellow-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] deco-slow-transition">
                        <DiamondIcon className="w-3 h-3" />
                        Membership
                      </button>
                    </div>
                  </div>

                  {/* Size variants */}
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { size: "sm", cls: "px-5 py-2 text-xs tracking-[0.2em]" },
                        { size: "md", cls: "px-8 py-3 text-sm tracking-[0.25em]" },
                        { size: "lg", cls: "px-12 py-4 text-base tracking-[0.3em]" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`deco-gradient-gold text-slate-900 font-serif font-bold uppercase shadow-[0_0_16px_rgba(212,175,55,0.2)] hover:shadow-[0_0_28px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 deco-slow-transition ${cls}`}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Grand Palace",
                      subtitle: "Suite Collection",
                      desc: "Elegance preserved from the 1924 season. Gold-leaf ceiling, French silk drapery.",
                      accent: "#d4af37",
                    },
                    {
                      title: "The Savoy",
                      subtitle: "Dining Experience",
                      desc: "Geometric marquetry floors and crystal chandeliers set the stage for culinary excellence.",
                      accent: "#c9a227",
                    },
                    {
                      title: "Empire Lounge",
                      subtitle: "Evening Reception",
                      desc: "Bronze bas-relief panels and bevelled mirrors define the pre-war aesthetic.",
                      accent: "#d4af37",
                    },
                    {
                      title: "Chrysler Atrium",
                      subtitle: "Event Venue",
                      desc: "Stainless steel sunburst radiates from the central dome in perfect symmetry.",
                      accent: "#c9a227",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative border border-yellow-600/25 p-8 hover:border-yellow-500/60 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(212,175,55,0.15)] deco-slow-transition cursor-default overflow-hidden"
                      style={{ backgroundColor: "#1a1a2e" }}
                    >
                      <CornerAccent position="tl" />
                      <CornerAccent position="tr" />
                      <CornerAccent position="bl" />
                      <CornerAccent position="br" />
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <h3
                          className="text-2xl font-serif tracking-[0.2em] mb-2"
                          style={{ color: card.accent }}
                        >
                          {card.title}
                        </h3>
                        <div className="w-8 h-px bg-yellow-500/50 mb-3 group-hover:w-16 deco-slow-transition" />
                        <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-4">
                          {card.subtitle}
                        </p>
                        <p className="text-yellow-100/50 text-sm leading-relaxed tracking-wider">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs tracking-[0.25em] uppercase text-yellow-500/60 mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name..."
                        className="w-full px-5 py-4 font-serif tracking-wider text-yellow-100 placeholder-yellow-600/30 border border-yellow-600/40 focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none deco-medium-transition"
                        style={{ backgroundColor: "#1a1a2e" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.25em] uppercase text-yellow-500/60 mb-3">
                        Correspondence
                      </label>
                      <input
                        type="email"
                        placeholder="your@address.com"
                        className="w-full px-5 py-4 font-serif tracking-wider text-yellow-100 placeholder-yellow-600/30 border border-yellow-600/40 focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none deco-medium-transition"
                        style={{ backgroundColor: "#1a1a2e" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.25em] uppercase text-yellow-500/60 mb-3">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Your inquiry..."
                        className="w-full px-5 py-4 font-serif tracking-wider text-yellow-100 placeholder-yellow-600/30 border border-yellow-600/40 focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none deco-medium-transition resize-none"
                        style={{ backgroundColor: "#1a1a2e" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs tracking-[0.25em] uppercase text-yellow-500/60 mb-3">
                        Suite Preference
                      </label>
                      <select
                        className="w-full px-5 py-4 font-serif tracking-wider text-yellow-400 border border-yellow-600/40 focus:border-yellow-500 focus:outline-none deco-medium-transition"
                        style={{ backgroundColor: "#1a1a2e" }}
                      >
                        <option>Grand Suite</option>
                        <option>Royal Chamber</option>
                        <option>Penthouse</option>
                        <option>Standard</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 border border-yellow-600/50 deco-fast-transition cursor-pointer hover:border-yellow-400 hover:shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
                      <label className="text-sm tracking-wider text-yellow-100/50 cursor-pointer">
                        Receive newsletter
                      </label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-5 h-5 border border-yellow-500 flex items-center justify-center cursor-pointer deco-fast-transition hover:shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                        style={{ backgroundColor: "rgba(212,175,55,0.2)" }}
                      >
                        <svg className="w-3 h-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm tracking-wider text-yellow-100/50 cursor-pointer">
                        Agree to terms of service
                      </label>
                    </div>
                    <button className="w-full py-4 deco-gradient-gold text-slate-900 font-serif font-bold uppercase tracking-[0.3em] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 deco-slow-transition">
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-10">
                  {/* Gold-bordered labels */}
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                      Geometric label badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Exclusive",
                        "Premium",
                        "Limited",
                        "Prestige",
                        "Heritage",
                        "Signature",
                        "Reserve",
                        "Grand",
                      ].map((label) => (
                        <span
                          key={label}
                          className="px-4 py-1.5 border border-yellow-500/50 text-yellow-400 text-xs font-serif tracking-[0.2em] uppercase hover:border-yellow-400 hover:text-yellow-200 hover:bg-yellow-500/10 hover:-translate-y-0.5 deco-medium-transition cursor-default"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status badges with diamond icons */}
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                      Status badges with ornament
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Available", color: "#d4af37", bg: "rgba(212,175,55,0.1)" },
                        { label: "Reserved", color: "#c9a227", bg: "rgba(201,162,39,0.1)" },
                        { label: "Exclusive", color: "#f5d67a", bg: "rgba(245,214,122,0.1)" },
                        { label: "Sold Out", color: "rgba(212,175,55,0.4)", bg: "rgba(212,175,55,0.05)" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-5 py-2.5 border text-xs font-serif tracking-[0.2em] uppercase hover:-translate-y-0.5 deco-medium-transition cursor-default"
                          style={{
                            borderColor: b.color,
                            color: b.color,
                            backgroundColor: b.bg,
                          }}
                        >
                          <DiamondIcon className="w-2.5 h-2.5" />
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Membership tier badges */}
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-6">
                      Membership tiers
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { tier: "Bronze", num: "I", shade: "#cd7f32" },
                        { tier: "Silver", num: "II", shade: "#c0c0c0" },
                        { tier: "Gold", num: "III", shade: "#d4af37" },
                        { tier: "Platinum", num: "IV", shade: "#e5e4e2" },
                      ].map((t) => (
                        <div
                          key={t.tier}
                          className="flex items-center gap-2 hover:-translate-y-0.5 deco-medium-transition cursor-default"
                        >
                          <div
                            className="w-8 h-8 flex items-center justify-center border text-xs font-serif font-bold"
                            style={{ borderColor: t.shade, color: t.shade }}
                          >
                            {t.num}
                          </div>
                          <span className="text-sm font-serif tracking-wider" style={{ color: t.shade }}>
                            {t.tier}
                          </span>
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

      {/* ================================================================ */}
      {/* 5. ANIMATION & INTERACTION RULES — All 4 named aiRules           */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-10" style={{ backgroundColor: "#1a1a2e" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              Interaction Design
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              Animation &amp; Interaction Rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-14 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              Four named axioms govern every transition in Art Deco. Hover or
              interact with each demo below to feel the difference.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Rule 1: Elegant & Slow */}
            <RevealBlock delay={0.1}>
              <div
                className="relative border border-yellow-600/25 p-8 h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="px-3 py-1 border border-yellow-500/50 text-yellow-400 text-xs font-serif tracking-[0.2em] uppercase"
                    style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
                  >
                    Elegant &amp; Slow
                  </span>
                </div>
                <p className="text-xs text-yellow-500/40 mb-6 leading-relaxed font-mono mt-3">
                  duration-500 / duration-700<br />
                  cubic-bezier(0.16,1,0.3,1)<br />
                  No abrupt bounces — noble pacing
                </p>
                <div className="flex items-center justify-center py-6">
                  <button
                    className="px-8 py-4 deco-gradient-gold text-slate-900 font-serif font-bold uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-0.5"
                    style={{
                      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={() => setElegantHovered(true)}
                    onMouseLeave={() => setElegantHovered(false)}
                  >
                    Hover Me
                  </button>
                </div>
                <p className="text-xs text-yellow-500/40 text-center mt-2 font-serif tracking-wider">
                  {elegantHovered
                    ? "700ms duration — unhurried, aristocratic ease"
                    : "Hover to feel the slow, considered lift"}
                </p>
              </div>
            </RevealBlock>

            {/* Rule 2: Golden Shimmer */}
            <RevealBlock delay={0.14}>
              <div
                className="relative border border-yellow-600/25 p-8 h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="px-3 py-1 border border-yellow-500/50 text-yellow-400 text-xs font-serif tracking-[0.2em] uppercase"
                    style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
                  >
                    Golden Shimmer
                  </span>
                </div>
                <p className="text-xs text-yellow-500/40 mb-6 leading-relaxed font-mono mt-3">
                  bg-[length:200%_auto]<br />
                  hover:bg-right — gradient slides<br />
                  Simulates metallic light sweep
                </p>
                <div className="flex items-center justify-center py-6">
                  <button
                    onMouseEnter={() => setShimmerHovered(true)}
                    onMouseLeave={() => setShimmerHovered(false)}
                    style={{
                      background:
                        "linear-gradient(90deg, #c9a227 0%, #f5d67a 30%, #d4af37 50%, #fef9c3 70%, #c9a227 100%)",
                      backgroundSize: "200% auto",
                      backgroundPosition: shimmerHovered ? "right center" : "left center",
                      transition: "background-position 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease",
                      boxShadow: shimmerHovered
                        ? "0 0 28px rgba(212,175,55,0.5)"
                        : "0 0 12px rgba(212,175,55,0.2)",
                    }}
                    className="px-8 py-4 text-slate-900 font-serif font-bold uppercase tracking-[0.3em]"
                  >
                    Shimmer
                  </button>
                </div>
                <p className="text-xs text-yellow-500/40 text-center mt-2 font-serif tracking-wider">
                  {shimmerHovered
                    ? "Gradient sweeps right — gold catching light"
                    : "Hover to trigger the metallic sweep"}
                </p>
              </div>
            </RevealBlock>

            {/* Rule 3: Symmetrical Expansion */}
            <RevealBlock delay={0.18}>
              <div
                className="relative border border-yellow-600/25 p-8 h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="px-3 py-1 border border-yellow-500/50 text-yellow-400 text-xs font-serif tracking-[0.2em] uppercase"
                    style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
                  >
                    Symmetrical Expansion
                  </span>
                </div>
                <p className="text-xs text-yellow-500/40 mb-6 leading-relaxed font-mono mt-3">
                  group-hover:&#123;-translate-x, -translate-y&#125;<br />
                  group-hover:&#123;translate-x, translate-y&#125;<br />
                  Corners expand symmetrically outward
                </p>
                <div className="flex items-center justify-center py-6">
                  <div
                    className="group relative border border-yellow-600/40 p-10 cursor-pointer hover:border-yellow-500/70 deco-slow-transition"
                    onMouseEnter={() => setSymmetryHovered(true)}
                    onMouseLeave={() => setSymmetryHovered(false)}
                    style={{ backgroundColor: "#1a1a2e" }}
                  >
                    {/* Symmetrically expanding corner accents */}
                    <div
                      className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60 deco-slow-transition"
                      style={{
                        transform: symmetryHovered
                          ? "translate(-4px,-4px)"
                          : "translate(0,0)",
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60 deco-slow-transition"
                      style={{
                        transform: symmetryHovered
                          ? "translate(4px,-4px)"
                          : "translate(0,0)",
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60 deco-slow-transition"
                      style={{
                        transform: symmetryHovered
                          ? "translate(-4px,4px)"
                          : "translate(0,0)",
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60 deco-slow-transition"
                      style={{
                        transform: symmetryHovered
                          ? "translate(4px,4px)"
                          : "translate(0,0)",
                      }}
                    />
                    <span className="text-yellow-400 font-serif tracking-[0.3em] uppercase text-sm">
                      ELEGANCE
                    </span>
                  </div>
                </div>
                <p className="text-xs text-yellow-500/40 text-center mt-2 font-serif tracking-wider">
                  {symmetryHovered
                    ? "All four corners expand equally outward"
                    : "Hover the card to see symmetric expansion"}
                </p>
              </div>
            </RevealBlock>

            {/* Rule 4: Subtle Lift */}
            <RevealBlock delay={0.22}>
              <div
                className="relative border border-yellow-600/25 p-8 h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="px-3 py-1 border border-yellow-500/50 text-yellow-400 text-xs font-serif tracking-[0.2em] uppercase"
                    style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
                  >
                    Subtle Lift
                  </span>
                </div>
                <p className="text-xs text-yellow-500/40 mb-6 leading-relaxed font-mono mt-3">
                  hover:-translate-y-0.5<br />
                  hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]<br />
                  Gold halo expands on hover
                </p>
                <div className="flex items-center justify-center py-6">
                  <div
                    className="relative border border-yellow-600/40 p-8 cursor-pointer deco-slow-transition"
                    onMouseEnter={() => setLiftHovered(true)}
                    onMouseLeave={() => setLiftHovered(false)}
                    style={{
                      backgroundColor: "#1a1a2e",
                      transform: liftHovered ? "translateY(-6px)" : "translateY(0)",
                      boxShadow: liftHovered
                        ? "0 0 32px rgba(212,175,55,0.4), 0 12px 24px rgba(0,0,0,0.4)"
                        : "0 0 0 rgba(212,175,55,0)",
                      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <CornerAccent position="tl" />
                    <CornerAccent position="tr" />
                    <CornerAccent position="bl" />
                    <CornerAccent position="br" />
                    <OrnamentIcon className="w-10 h-10 text-yellow-500" />
                  </div>
                </div>
                <p className="text-xs text-yellow-500/40 text-center mt-2 font-serif tracking-wider">
                  {liftHovered
                    ? "Floating 6px up — gold aura radiates outward"
                    : "Hover to see the subtle lift with gold halo"}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. APP DEMO — Luxury Hotel Reservation UI                        */}
      {/* ================================================================ */}
      <section
        className="py-24 md:py-32 px-5 md:px-10 sunburst-bg"
        style={{ backgroundColor: "#1d1d35" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              The Grand Hotel
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-14 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              A luxury hotel reservation interface rendered in full Art Deco
              discipline. Symmetric layout, gold accents, and serif type throughout.
            </p>
          </RevealBlock>

          {/* Step indicator */}
          <RevealBlock delay={0.15} className="mb-8">
            <div className="flex items-center justify-center gap-0">
              {["Suite Selection", "Guest Details", "Confirmation"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => setReservationStep(i + 1)}
                    className="flex items-center gap-2 px-5 py-2.5 deco-medium-transition"
                    style={{
                      color: reservationStep === i + 1 ? "#d4af37" : "rgba(212,175,55,0.35)",
                      borderBottom: reservationStep === i + 1 ? "2px solid #d4af37" : "2px solid transparent",
                    }}
                  >
                    <span className="text-sm font-serif tracking-[0.2em] uppercase">
                      {i + 1}. {step}
                    </span>
                  </button>
                  {i < 2 && (
                    <div className="w-6 h-px bg-yellow-600/25" />
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Step 1: Suite selection */}
          {reservationStep === 1 && (
            <RevealBlock delay={0.18}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: "Standard Chamber",
                    price: "420",
                    size: "45 m\u00B2",
                    features: ["King Bed", "City View", "Minibar"],
                    idx: 0,
                  },
                  {
                    name: "Deluxe Suite",
                    price: "890",
                    size: "85 m\u00B2",
                    features: ["King Bed", "Terrace", "Butler", "Lounge"],
                    idx: 1,
                  },
                  {
                    name: "Grand Penthouse",
                    price: "2400",
                    size: "240 m\u00B2",
                    features: ["Master Suite", "Panorama", "Private Pool", "Chef"],
                    idx: 2,
                  },
                ].map((suite) => (
                  <div
                    key={suite.name}
                    onClick={() => setSelectedItem(selectedItem === suite.idx ? null : suite.idx)}
                    className="relative border p-7 cursor-pointer deco-slow-transition overflow-hidden"
                    style={{
                      backgroundColor:
                        selectedItem === suite.idx ? "rgba(212,175,55,0.08)" : "#2d2d44",
                      borderColor:
                        selectedItem === suite.idx
                          ? "rgba(212,175,55,0.8)"
                          : "rgba(212,175,55,0.2)",
                      transform: selectedItem === suite.idx ? "translateY(-4px)" : "translateY(0)",
                      boxShadow:
                        selectedItem === suite.idx
                          ? "0 12px 32px rgba(212,175,55,0.2)"
                          : "none",
                    }}
                  >
                    <CornerAccent position="tl" />
                    <CornerAccent position="br" />

                    <div className="text-center">
                      <h3
                        className="text-lg font-serif tracking-[0.2em] uppercase mb-1"
                        style={{ color: selectedItem === suite.idx ? "#d4af37" : "#f5d67a" }}
                      >
                        {suite.name}
                      </h3>
                      <p className="text-xs tracking-[0.2em] text-yellow-500/50 mb-4">
                        {suite.size}
                      </p>
                      <div
                        className="w-12 h-px mx-auto mb-4"
                        style={{
                          background: selectedItem === suite.idx
                            ? "linear-gradient(90deg, transparent, #d4af37, transparent)"
                            : "rgba(212,175,55,0.3)",
                        }}
                      />
                      <div className="text-3xl font-serif text-yellow-400 mb-1">
                        ${suite.price}
                      </div>
                      <div className="text-xs text-yellow-500/40 tracking-wider mb-6">per night</div>
                      <ul className="space-y-2 text-left">
                        {suite.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-yellow-100/50 tracking-wider">
                            <DiamondIcon className="w-2 h-2 text-yellow-600/60 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setReservationStep(2)}
                  disabled={selectedItem === null}
                  className="px-12 py-4 deco-gradient-gold text-slate-900 font-serif font-bold uppercase tracking-[0.3em] deco-slow-transition disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_28px_rgba(212,175,55,0.5)] hover:-translate-y-0.5"
                >
                  Continue
                </button>
              </div>
            </RevealBlock>
          )}

          {/* Step 2: Guest details */}
          {reservationStep === 2 && (
            <RevealBlock delay={0.18}>
              <div
                className="relative border border-yellow-600/25 p-10 max-w-2xl mx-auto"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="tr" />
                <CornerAccent position="bl" />
                <CornerAccent position="br" />
                <h3 className="text-xl font-serif text-yellow-400 tracking-[0.25em] uppercase text-center mb-2">
                  Guest Information
                </h3>
                <GoldDivider />
                <div className="space-y-5 mt-6">
                  {[
                    { label: "Title", placeholder: "Mr / Mrs / Dr", type: "text" },
                    { label: "Full Name", placeholder: "Your full name", type: "text" },
                    { label: "Correspondence", placeholder: "your@address.com", type: "email" },
                    { label: "Arrival Date", placeholder: "DD / MM / YYYY", type: "text" },
                    { label: "Nights", placeholder: "Number of nights", type: "number" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs tracking-[0.25em] uppercase text-yellow-500/55 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-5 py-3.5 font-serif tracking-wider text-yellow-100 placeholder-yellow-600/30 border border-yellow-600/35 focus:border-yellow-500 focus:shadow-[0_0_14px_rgba(212,175,55,0.2)] focus:outline-none deco-medium-transition"
                        style={{ backgroundColor: "#1a1a2e" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setReservationStep(1)}
                    className="flex-1 py-4 border border-yellow-600/40 text-yellow-400 font-serif uppercase tracking-[0.25em] hover:border-yellow-500 deco-medium-transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setReservationStep(3)}
                    className="flex-1 py-4 deco-gradient-gold text-slate-900 font-serif font-bold uppercase tracking-[0.3em] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] deco-slow-transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Step 3: Confirmation */}
          {reservationStep === 3 && (
            <RevealBlock delay={0.18}>
              <div
                className="relative border border-yellow-500/60 p-12 max-w-xl mx-auto text-center"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="tr" />
                <CornerAccent position="bl" />
                <CornerAccent position="br" />
                <OrnamentIcon className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-2xl font-serif text-yellow-300 tracking-[0.3em] uppercase mb-2">
                  Reservation Confirmed
                </h3>
                <GoldDivider />
                <p className="text-yellow-100/50 tracking-wider leading-relaxed mt-4 mb-8">
                  Your suite has been reserved. A confirmation has been dispatched
                  via correspondence. We anticipate your arrival with great pleasure.
                </p>
                <div className="font-serif text-yellow-500/60 text-xs tracking-[0.3em] uppercase mb-6">
                  Reservation Reference: GH-1924-VII
                </div>
                <button
                  onClick={() => { setReservationStep(1); setSelectedItem(null); }}
                  className="px-10 py-3.5 border border-yellow-500/60 text-yellow-400 font-serif uppercase tracking-[0.25em] hover:border-yellow-400 hover:bg-yellow-500/10 deco-medium-transition"
                >
                  New Reservation
                </button>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. GEOMETRIC ORNAMENT SHOWCASE                                   */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-10" style={{ backgroundColor: "#1a1a2e" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              Decorative System
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              Geometric Ornament
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-14 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              Sunburst radials, corner brackets, gradient dividers, and
              diamond separators form the decorative vocabulary of Art Deco.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sunburst pattern */}
            <RevealBlock delay={0.12}>
              <div
                className="relative border border-yellow-600/25 p-8 text-center h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="relative w-32 h-32 mx-auto mb-6">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-full h-px origin-left"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
                        transform: `rotate(${i * (180 / 16)}deg) translateY(-50%)`,
                      }}
                    />
                  ))}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6"
                    style={{ color: "#d4af37" }}
                  >
                    <OrnamentIcon className="w-6 h-6" />
                  </div>
                </div>
                <h4 className="text-yellow-400 font-serif tracking-[0.25em] uppercase text-sm mb-2">
                  Sunburst Radial
                </h4>
                <p className="text-yellow-100/40 text-xs tracking-wider leading-relaxed">
                  Rotating gradient lines from a central ornament.
                  Used as hero backgrounds and section dividers.
                </p>
              </div>
            </RevealBlock>

            {/* Corner brackets */}
            <RevealBlock delay={0.18}>
              <div
                className="relative border border-yellow-600/25 p-8 text-center h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="relative border border-yellow-600/30 p-10 mx-auto w-40 h-40 flex items-center justify-center mb-6 group hover:border-yellow-500/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] deco-slow-transition">
                  {/* Animated corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/60 group-hover:border-yellow-400 group-hover:-translate-x-1 group-hover:-translate-y-1 deco-slow-transition" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500/60 group-hover:border-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 deco-slow-transition" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500/60 group-hover:border-yellow-400 group-hover:-translate-x-1 group-hover:translate-y-1 deco-slow-transition" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/60 group-hover:border-yellow-400 group-hover:translate-x-1 group-hover:translate-y-1 deco-slow-transition" />
                  <span className="text-yellow-500/60 font-serif tracking-[0.3em] uppercase text-xs">Hover</span>
                </div>
                <h4 className="text-yellow-400 font-serif tracking-[0.25em] uppercase text-sm mb-2">
                  Corner Brackets
                </h4>
                <p className="text-yellow-100/40 text-xs tracking-wider leading-relaxed">
                  Four-corner accent lines that expand symmetrically.
                  Hover the box above to see the Symmetrical Expansion rule.
                </p>
              </div>
            </RevealBlock>

            {/* Gradient dividers */}
            <RevealBlock delay={0.24}>
              <div
                className="relative border border-yellow-600/25 p-8 text-center h-full hover:border-yellow-500/50 deco-slow-transition"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="space-y-5 mb-6 mt-2">
                  {[0.6, 0.4, 0.25, 0.15].map((opacity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="h-px flex-1"
                        style={{
                          background: `linear-gradient(90deg, transparent, rgba(212,175,55,${opacity}), transparent)`,
                        }}
                      />
                      {i % 2 === 0 && (
                        <DiamondIcon
                          className="w-2 h-2 shrink-0"
                          style={{ color: `rgba(212,175,55,${opacity})` }}
                        />
                      )}
                      {i % 2 === 0 && (
                        <div
                          className="h-px flex-1"
                          style={{
                            background: `linear-gradient(90deg, rgba(212,175,55,${opacity}), transparent)`,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <h4 className="text-yellow-400 font-serif tracking-[0.25em] uppercase text-sm mb-2">
                  Gold Dividers
                </h4>
                <p className="text-yellow-100/40 text-xs tracking-wider leading-relaxed">
                  Gradient lines fading to transparent, with optional
                  diamond separators for section breaks.
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Typography specimen */}
          <RevealBlock delay={0.28} className="mt-6">
            <div
              className="relative border border-yellow-600/20 p-10"
              style={{ backgroundColor: "#2d2d44" }}
            >
              <CornerAccent position="tl" />
              <CornerAccent position="tr" />
              <CornerAccent position="bl" />
              <CornerAccent position="br" />
              <p className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 mb-8 text-center">
                Typography Specimen
              </p>
              <div className="text-center space-y-4">
                <div className="text-6xl md:text-7xl font-serif text-yellow-500/80 tracking-[0.15em] leading-none">
                  Aa
                </div>
                <div className="text-xl font-serif text-yellow-200 tracking-[0.3em] uppercase">
                  Playfair Display — Primary Serif
                </div>
                <GoldDivider />
                <div className="text-sm text-yellow-100/50 tracking-[0.2em] font-serif leading-relaxed max-w-lg mx-auto">
                  Geometry and ornament are not mutually exclusive — the greatest Art Deco
                  architects proved that mathematical precision could coexist with decorative
                  luxury. Every letterform is chosen for its dignity and weight.
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs tracking-[0.3em] uppercase">
                  {[
                    { label: "tracking-[0.15em]", sample: "DISPLAY" },
                    { label: "tracking-[0.3em]", sample: "HEADING" },
                    { label: "tracking-wider", sample: "BODY" },
                  ].map((t) => (
                    <div key={t.label} className="text-center">
                      <div className="text-yellow-400 font-serif mb-1">{t.sample}</div>
                      <div className="text-yellow-500/40 font-mono text-[10px]">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. DESIGN PHILOSOPHY — Do / Don't + Principles                   */}
      {/* ================================================================ */}
      <section
        className="py-24 md:py-32 px-5 md:px-10 sunburst-bg"
        style={{ backgroundColor: "#1d1d35" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              Design Principles
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-14 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              Three governing axioms. Adherence to all three is mandatory.
              Deviation produces pastiche, not Art Deco.
            </p>
          </RevealBlock>

          {/* 3 Principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: "I",
                title: "Geometric Symmetry",
                tagline: "Balance is non-negotiable",
                desc: "Every layout element has a mirror. Radial patterns, paired columns, centered typography. Asymmetry is an error, not a choice.",
                rules: ["Centered text on hero/section headers", "Paired column grids", "Radial and reflective decorations"],
                accent: "#d4af37",
              },
              {
                num: "II",
                title: "Gold & Dark Contrast",
                tagline: "High contrast, high luxury",
                desc: "Deep navy or slate backgrounds only. Gold (#d4af37) as the sole accent. Cream (#f5f5dc) for surface-level text contrast.",
                rules: ["bg-slate-900, bg-slate-800 mandatory", "text-yellow-500 border-yellow-500 for accents", "No bright or saturated hues"],
                accent: "#c9a227",
              },
              {
                num: "III",
                title: "Elegant Motion",
                tagline: "Unhurried, noble, precise",
                desc: "Transitions take 500-700ms. cubic-bezier(0.16,1,0.3,1) — a controlled deceleration. No spring overshoots, no bounces.",
                rules: ["duration-500 or duration-700 only", "cubic-bezier(0.16,1,0.3,1) everywhere", "hover:-translate-y-0.5 max lift"],
                accent: "#f5d67a",
              },
            ].map((p, i) => (
              <RevealBlock key={p.title} delay={i * 0.1}>
                <div
                  className="relative border border-yellow-600/25 p-8 h-full group hover:border-yellow-500/60 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(212,175,55,0.12)] deco-slow-transition cursor-default"
                  style={{ backgroundColor: "#2d2d44" }}
                >
                  <CornerAccent position="tl" />
                  <CornerAccent position="br" />
                  <div
                    className="text-5xl font-serif mb-4 leading-none"
                    style={{ color: p.accent }}
                  >
                    {p.num}
                  </div>
                  <div className="h-px bg-gradient-to-r from-yellow-600/40 to-transparent mb-4" />
                  <h3 className="text-xl font-serif text-yellow-200 tracking-[0.2em] uppercase mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: p.accent }}>
                    {p.tagline}
                  </p>
                  <p className="text-yellow-100/45 text-sm leading-relaxed tracking-wider mb-6">
                    {p.desc}
                  </p>
                  <ul className="space-y-2">
                    {p.rules.map((rule) => (
                      <li key={rule} className="flex items-start gap-2 text-xs text-yellow-100/40 font-mono">
                        <DiamondIcon className="w-2 h-2 shrink-0 mt-0.5" style={{ color: p.accent }} />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.15}>
              <div
                className="relative border border-yellow-600/30 p-8 h-full"
                style={{ backgroundColor: "rgba(212,175,55,0.04)" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="border border-yellow-500/60 w-8 h-8 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-serif tracking-[0.3em] uppercase text-yellow-400">
                    Do
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Gold (#d4af37) as the only accent color",
                    "Deep navy/slate as the background base",
                    "Serif typefaces — font-serif, tracking-wider",
                    "Symmetric, centered layouts",
                    "Corner bracket decorations on containers",
                    "Gradient dividers fading to transparent",
                    "duration-700 with cubic-bezier(0.16,1,0.3,1)",
                    "hover:-translate-y-0.5 for the Subtle Lift",
                    "Geometric patterns: sunburst, chevron, diamond",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-yellow-100/50 tracking-wider leading-relaxed">
                      <DiamondIcon className="w-2 h-2 text-yellow-600/60 shrink-0 mt-1" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.22}>
              <div
                className="relative border border-yellow-600/20 p-8 h-full"
                style={{ backgroundColor: "#2d2d44" }}
              >
                <CornerAccent position="tl" />
                <CornerAccent position="br" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="border border-yellow-600/30 w-8 h-8 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-yellow-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-base font-serif tracking-[0.3em] uppercase text-yellow-600/60">
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "No vivid neon or saturated modern colors",
                    "No asymmetric or chaotic layouts",
                    "No sans-serif fonts as primary typefaces",
                    "No rounded corners — geometry is angular",
                    "No spring bounce (cubic-bezier(0.34,1.56,...))",
                    "No omission of decorative border elements",
                    "No short transition durations under 300ms",
                    "No full-color flat fills without gold involvement",
                    "No light backgrounds — this style is nocturnal",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-yellow-100/35 tracking-wider leading-relaxed">
                      <DiamondIcon className="w-2 h-2 text-yellow-700/40 shrink-0 mt-1" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FEATURE HIGHLIGHTS                                            */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-10" style={{ backgroundColor: "#1a1a2e" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-500/60 block mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-200 leading-tight tracking-wider">
              Crafted With Precision
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-14 mt-4">
            <p className="text-yellow-100/50 text-lg tracking-wider leading-relaxed max-w-xl">
              Six defining characteristics that ensure every page rendered in
              Art Deco speaks the same disciplined visual language.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Gold as Singular Accent",
                desc: "One accent color. #d4af37 and its warm derivatives. Nothing competes with gold.",
              },
              {
                num: "02",
                title: "Nocturnal Palette",
                desc: "Deep navy and slate backgrounds. Darkness amplifies the luminosity of gold.",
              },
              {
                num: "03",
                title: "Geometric Discipline",
                desc: "Every shape is rectangular, trapezoidal, or radially symmetrical. Organics are forbidden.",
              },
              {
                num: "04",
                title: "Serif Typography",
                desc: "Font-serif throughout. Wide letter-spacing (tracking-[0.3em]) for a monumental scale.",
              },
              {
                num: "05",
                title: "Deliberate Motion",
                desc: "Long durations (500-700ms), controlled easing. Elegance is measured by restraint.",
              },
              {
                num: "06",
                title: "Ornamental Detail",
                desc: "Corner brackets, radial lines, gradient dividers. Every container is decorated at its edges.",
              },
            ].map((f, i) => (
              <RevealBlock key={f.num} delay={i * 0.06}>
                <div
                  className="relative border border-yellow-600/20 p-7 h-full group hover:border-yellow-500/50 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,175,55,0.12)] deco-slow-transition cursor-default"
                  style={{ backgroundColor: "#2d2d44" }}
                >
                  <CornerAccent position="tl" />
                  <CornerAccent position="br" />
                  <div className="text-3xl font-serif text-yellow-600/40 mb-4 tracking-[0.1em]">
                    {f.num}
                  </div>
                  <div className="h-px bg-gradient-to-r from-yellow-600/40 to-transparent mb-4" />
                  <h4 className="text-yellow-300 font-serif text-base tracking-[0.2em] uppercase mb-3">
                    {f.title}
                  </h4>
                  <p className="text-yellow-100/40 text-sm leading-relaxed tracking-wider">
                    {f.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer
        className="relative border-t border-yellow-600/15 overflow-hidden"
        style={{ backgroundColor: "#15152a" }}
      >
        {/* Top gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

        {/* Background sunburst */}
        <div className="absolute inset-0 sunburst-bg opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-14 pb-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3">
                <DiamondIcon className="w-4 h-4 text-yellow-500" />
                <span className="text-xl font-serif tracking-[0.3em] uppercase text-yellow-400">
                  Art Deco
                </span>
                <DiamondIcon className="w-4 h-4 text-yellow-500" />
              </div>
              <GoldDivider />
              <p className="text-sm text-yellow-100/40 tracking-wider leading-relaxed font-serif">
                The design language of the Machine Age — geometric, symmetrical, and
                uncompromisingly luxurious. 1920-1939.
              </p>
              <div className="flex gap-2">
                {paletteSwatches.map((s) => (
                  <div
                    key={s.hex}
                    className="w-5 h-5 deco-fast-transition hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(212,175,55,0.3)]"
                    style={{
                      backgroundColor: s.hex,
                      border: "1px solid rgba(212,175,55,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 font-serif">Style</span>
                <Link href="/styles/art-deco" className="text-yellow-100/40 hover:text-yellow-300 tracking-wider font-serif deco-fast-transition">
                  Documentation
                </Link>
                <Link href="/styles/art-deco/showcase" className="text-yellow-100/40 hover:text-yellow-300 tracking-wider font-serif deco-fast-transition">
                  Showcase
                </Link>
                <Link href="/styles/art-deco/cover" className="text-yellow-100/40 hover:text-yellow-300 tracking-wider font-serif deco-fast-transition">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 font-serif">StyleKit</span>
                <Link href="/" className="text-yellow-100/40 hover:text-yellow-300 tracking-wider font-serif deco-fast-transition">
                  Home
                </Link>
                <Link href="/styles" className="text-yellow-100/40 hover:text-yellow-300 tracking-wider font-serif deco-fast-transition">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-[0.25em] uppercase text-yellow-500/50 font-serif">Palette</span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-yellow-100/40 text-xs tracking-wider font-serif">
                    <span
                      className="w-2.5 h-2.5 inline-block"
                      style={{ backgroundColor: s.hex, border: "1px solid rgba(212,175,55,0.3)" }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/25 to-transparent mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-yellow-100/30 tracking-wider font-serif">
              <DiamondIcon className="w-2 h-2 text-yellow-600/40" />
              <span>Crafted for StyleKit</span>
              <DiamondIcon className="w-2 h-2 text-yellow-600/40" />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 border border-yellow-600/35 text-yellow-400/70 text-sm font-serif tracking-[0.2em] uppercase hover:border-yellow-500 hover:text-yellow-300 hover:bg-yellow-500/8 deco-medium-transition"
            >
              <span>&#8592;</span>
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
