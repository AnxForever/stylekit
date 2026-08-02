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
/*  Inline SVG ornaments                                               */
/* ------------------------------------------------------------------ */

function StarOrnament({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12,0 15,8 24,8 17,13 19,22 12,17 5,22 7,13 0,8 9,8" />
    </svg>
  );
}

function EightPointStar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <polygon points="50,5 61,35 94,35 68,55 79,87 50,68 21,87 32,55 6,35 39,35" opacity="0.5" />
      <polygon points="50,15 58,38 83,38 63,52 71,76 50,62 29,76 37,52 17,38 42,38" />
    </svg>
  );
}

function GeometricHexagon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" />
      <polygon points="50,20 80,36 80,64 50,80 20,64 20,36" />
      <line x1="50" y1="5" x2="50" y2="20" />
      <line x1="93" y1="27.5" x2="80" y2="36" />
      <line x1="93" y1="72.5" x2="80" y2="64" />
      <line x1="50" y1="95" x2="50" y2="80" />
      <line x1="7" y1="72.5" x2="20" y2="64" />
      <line x1="7" y1="27.5" x2="20" y2="36" />
    </svg>
  );
}

function DiamondIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L22 12L12 22L2 12Z" />
    </svg>
  );
}

function ArchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 70" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5,70 L5,30 Q5,5 30,5 Q55,5 55,30 L55,70" />
      <line x1="5" y1="50" x2="55" y2="50" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner frame component                                             */
/* ------------------------------------------------------------------ */

function CornerFrame({
  expanded = false,
  color = "#c9a74e",
  size = 24,
}: {
  expanded?: boolean;
  color?: string;
  size?: number;
}) {
  const offset = expanded ? -4 : 0;
  return (
    <>
      <span
        style={{
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          borderColor: color,
          width: size,
          height: size,
          position: "absolute",
          top: 8,
          left: 8,
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          transform: `translate(${offset}px, ${offset}px)`,
        }}
      />
      <span
        style={{
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          borderColor: color,
          width: size,
          height: size,
          position: "absolute",
          top: 8,
          right: 8,
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          transform: `translate(${-offset}px, ${offset}px)`,
        }}
      />
      <span
        style={{
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          borderColor: color,
          width: size,
          height: size,
          position: "absolute",
          bottom: 8,
          left: 8,
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
          transform: `translate(${offset}px, ${-offset}px)`,
        }}
      />
      <span
        style={{
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          borderColor: color,
          width: size,
          height: size,
          position: "absolute",
          bottom: 8,
          right: 8,
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
          transform: `translate(${-offset}px, ${-offset}px)`,
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Gold divider                                                       */
/* ------------------------------------------------------------------ */

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, #c9a74e, transparent)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Lapis Lazuli", hex: "#1a3a5c", label: "Primary" },
  { name: "Ivory Parchment", hex: "#f5ecd7", label: "Background" },
  { name: "Gilded Gold", hex: "#c9a74e", label: "Accent" },
  { name: "Persian Emerald", hex: "#2d7d46", label: "Accent 2" },
  { name: "Burgundy Rose", hex: "#8b2332", label: "Accent 3" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Tessellation pattern background CSS                                */
/* ------------------------------------------------------------------ */

const tessellationStyle: React.CSSProperties = {
  backgroundImage: `repeating-conic-gradient(
    from 0deg at 50% 50%,
    transparent 0deg 60deg,
    rgba(201,167,78,0.08) 60deg 62deg,
    transparent 62deg
  )`,
  backgroundSize: "60px 60px",
};

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1: Sacred Symmetry — corner expansion demo
  const [symmetryHovered, setSymmetryHovered] = useState(false);
  const [symmetryActiveCard, setSymmetryActiveCard] = useState<number | null>(null);

  // aiRule 2: Divine Illumination — glow intensity
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [glowActive, setGlowActive] = useState(false);

  // aiRule 3: Tessellation Reveal — layer visibility
  const [tessRevealLevel, setTessRevealLevel] = useState(1);
  const [tessHovered, setTessHovered] = useState(false);

  // aiRule 4: Elegant Easing — easing comparison
  const [easingDemo, setEasingDemo] = useState<"ease-out" | "linear" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!glowActive) {
      setGlowIntensity(0);
      return;
    }
    let frame = 0;
    const interval = setInterval(() => {
      frame = Math.min(frame + 2, 100);
      setGlowIntensity(frame);
      if (frame >= 100) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [glowActive]);

  return (
    <div className="min-h-screen bg-[#f5ecd7] font-sans text-[#1a3a5c] overflow-x-hidden">
      <style>{`
        @keyframes ig-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes ig-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ig-pulse-gold {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .ig-float { animation: ig-float 6s ease-in-out infinite; }
        .ig-spin-slow { animation: ig-spin-slow 20s linear infinite; }
        .ig-pulse-gold { animation: ig-pulse-gold 3s ease-in-out infinite; }
        .ig-transition { transition: all 0.5s ease-out; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a5c]/95 backdrop-blur-md border-b border-[#c9a74e]/20 shadow-[0_2px_16px_rgba(26,58,92,0.4)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="relative flex items-center px-5 py-1.5 overflow-hidden">
            <CornerFrame size={14} color="#c9a74e" />
            <span className="text-sm font-semibold tracking-widest text-[#c9a74e] uppercase">
              Islamic<span className="text-[#f5ecd7] mx-1">|</span>Geometric
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Interactions", "App Demo", "Philosophy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1.5 text-sm text-[#f5ecd7]/60 hover:text-[#c9a74e] ig-transition tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/islamic-geometric"
            data-back-navigation="true"
            className="relative flex items-center gap-2 px-5 py-2 border border-[#c9a74e]/50 text-[#c9a74e] text-sm font-medium tracking-wider hover:border-[#c9a74e] hover:shadow-[0_0_12px_rgba(201,167,78,0.25)] ig-transition rounded-lg overflow-hidden"
          >
            <CornerFrame size={8} color="#c9a74e" />
            <span>&#8592; StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section
        className="relative pt-16 min-h-screen flex items-center justify-center overflow-hidden bg-[#1a3a5c]"
      >
        {/* Tessellation background */}
        <div className="absolute inset-0" style={tessellationStyle} />

        {/* Decorative nested frames */}
        <div className="absolute inset-8 md:inset-16 border border-[#c9a74e]/15 rounded-xl pointer-events-none" />
        <div className="absolute inset-12 md:inset-24 border border-[#c9a74e]/08 rounded-xl pointer-events-none" />

        {/* Floating ornaments */}
        <div className="absolute top-24 left-8 text-[#c9a74e]/20 pointer-events-none hidden md:block ig-float">
          <EightPointStar className="w-20 h-20" />
        </div>
        <div className="absolute bottom-24 right-8 text-[#c9a74e]/20 pointer-events-none hidden md:block ig-spin-slow">
          <EightPointStar className="w-16 h-16" />
        </div>
        <div className="absolute top-1/3 right-16 text-[#c9a74e]/15 pointer-events-none hidden md:block ig-float" style={{ animationDelay: "2s" }}>
          <GeometricHexagon className="w-24 h-24" />
        </div>
        <div className="absolute bottom-1/3 left-16 text-[#c9a74e]/15 pointer-events-none hidden md:block">
          <GeometricHexagon className="w-20 h-20" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Top ornament */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex justify-center mb-4">
              <StarOrnament className="w-10 h-10 text-[#c9a74e] ig-pulse-gold" />
            </div>
            <GoldDivider className="max-w-xs mx-auto mb-8" />
          </div>

          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.08s",
            }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#c9a74e] mb-6">
              Unity in Multiplicity
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[90px] font-semibold leading-tight tracking-wide text-[#f5ecd7] mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            ISLAMIC
            <br />
            <span className="text-[#c9a74e]">GEOMETRIC</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#f5ecd7]/70 text-lg md:text-xl tracking-wider mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.23s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.23s",
            }}
          >
            Precision tessellation. Gilded ornament. The infinite emerging
            from the simple &mdash; a thousand years of sacred geometry.
          </p>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <GoldDivider className="max-w-xs mx-auto mb-10" />

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <button className="group relative px-12 py-4 bg-[#c9a74e] text-[#1a3a5c] font-semibold tracking-widest text-sm rounded-lg overflow-hidden hover:bg-[#d4b560] hover:shadow-[0_8px_25px_rgba(201,167,78,0.35)] ig-transition">
                <CornerFrame size={10} color="#1a3a5c" />
                <span className="relative z-10">Discover</span>
              </button>
              <button className="group relative px-12 py-4 bg-transparent text-[#c9a74e] font-semibold tracking-widest text-sm rounded-lg border border-[#c9a74e]/50 overflow-hidden hover:border-[#c9a74e] hover:shadow-[0_0_20px_rgba(201,167,78,0.2)] ig-transition">
                <CornerFrame size={10} color="#c9a74e" />
                <span className="relative z-10">Gallery</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "1,200+", label: "Years of tradition", accent: "#c9a74e" },
                { value: "8-fold", label: "Symmetry axes", accent: "#2d7d46" },
                { value: "\u221E", label: "Pattern repetitions", accent: "#c9a74e" },
                { value: "3", label: "Core color pillars", accent: "#8b2332" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="group relative border border-[#c9a74e]/20 rounded-xl p-5 text-center hover:border-[#c9a74e]/50 hover:shadow-[0_4px_20px_rgba(201,167,78,0.15)] ig-transition overflow-hidden"
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <CornerFrame size={10} color="#c9a74e" />
                  <div className="text-2xl font-semibold mb-1" style={{ color: stat.accent }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#f5ecd7]/50 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 bg-[#f5ecd7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4 text-center">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c9a74e] block mb-3">
              Color System
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a3a5c] leading-tight tracking-wide">
              The Classical Palette
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-4 text-center">
            <GoldDivider className="max-w-xs mx-auto" />
          </RevealBlock>

          <RevealBlock delay={0.08} className="mb-14 text-center">
            <p className="text-[#1a3a5c]/60 text-lg max-w-2xl mx-auto leading-relaxed tracking-wide mt-6">
              Deep lapis blue, gilded gold, and ivory parchment &mdash; the timeless triad of
              Persian-Arabic illuminated manuscripts. Emerald and burgundy add depth selectively.
            </p>
          </RevealBlock>

          {/* Interactive swatches */}
          <RevealBlock delay={0.12}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-16">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i ? "translateY(-8px) scale(1.06)" : "translateY(0) scale(1)",
                      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                      position: "relative",
                    }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-xl border-2 flex items-center justify-center"
                      style={{
                        backgroundColor: swatch.hex,
                        borderColor: hoveredSwatch === i ? "#c9a74e" : "rgba(201,167,78,0.25)",
                        boxShadow: hoveredSwatch === i
                          ? `0 16px 40px rgba(201,167,78,0.25), 0 4px 12px ${swatch.hex}66`
                          : `0 4px 16px ${swatch.hex}33`,
                        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
                      }}
                    >
                      {hoveredSwatch === i && (
                        <StarOrnament className="w-8 h-8 text-white/60" />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-[#1a3a5c] tracking-wide">{swatch.name}</div>
                    <div className="text-xs text-[#1a3a5c]/40 font-mono mt-0.5">{swatch.hex}</div>
                    <span className="inline-block mt-1.5 px-3 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase text-[#1a3a5c]/50 border border-[#1a3a5c]/10">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color combinations */}
          <RevealBlock delay={0.2}>
            <div className="relative border-2 border-[#c9a74e]/30 rounded-xl p-8 overflow-hidden">
              <CornerFrame size={20} color="#c9a74e" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1a3a5c]/40 mb-6 text-center">
                Color Combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { bg: "#1a3a5c", fg: "#c9a74e", label: "Navy + Gold" },
                  { bg: "#c9a74e", fg: "#1a3a5c", label: "Gold + Navy" },
                  { bg: "#1a3a5c", fg: "#f5ecd7", label: "Navy + Ivory" },
                  { bg: "#2d7d46", fg: "#c9a74e", label: "Emerald + Gold" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-20 rounded-lg mb-2 flex items-center justify-center ig-transition group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(201,167,78,0.2)]"
                      style={{ backgroundColor: g.bg }}
                    >
                      <span className="text-xs font-semibold tracking-widest" style={{ color: g.fg }}>
                        {g.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 bg-[#1a3a5c]" style={tessellationStyle}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4 text-center">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c9a74e] block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#f5ecd7] leading-tight tracking-wide">
              Gilded Building Blocks
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.04}>
            <GoldDivider className="max-w-xs mx-auto mb-12" />
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.08} className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 text-sm font-semibold tracking-wider capitalize rounded-lg ig-transition overflow-hidden ${
                    activeTab === tab
                      ? "bg-[#c9a74e] text-[#1a3a5c] shadow-[0_4px_20px_rgba(201,167,78,0.35)]"
                      : "bg-transparent border border-[#c9a74e]/30 text-[#c9a74e]/70 hover:border-[#c9a74e] hover:text-[#c9a74e]"
                  }`}
                >
                  {activeTab === tab && <CornerFrame size={8} color="#1a3a5c" />}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.14}>
            <div className="relative border-2 border-[#c9a74e]/30 rounded-xl p-8 md:p-12 bg-[#1a3a5c] overflow-hidden">
              <CornerFrame size={24} color="#c9a74e" />

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-6">
                      Primary &mdash; Gold fill with corner ornaments
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="group relative px-10 py-4 bg-[#c9a74e] text-[#1a3a5c] font-semibold tracking-widest text-sm rounded-lg hover:bg-[#d4b560] hover:shadow-[0_8px_28px_rgba(201,167,78,0.4)] ig-transition overflow-hidden">
                        <CornerFrame size={10} color="#1a3a5c" />
                        <span className="relative z-10">Discover</span>
                      </button>
                      <button className="group relative px-10 py-4 bg-[#2d7d46] text-[#f5ecd7] font-semibold tracking-widest text-sm rounded-lg hover:shadow-[0_8px_28px_rgba(45,125,70,0.35)] ig-transition overflow-hidden">
                        <CornerFrame size={10} color="#c9a74e" />
                        <span className="relative z-10">Explore</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <GoldDivider className="mb-8" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-6">
                      Outlined &mdash; Gilded border with glow
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="group relative px-10 py-4 bg-transparent text-[#c9a74e] font-semibold tracking-widest text-sm rounded-lg border border-[#c9a74e]/50 hover:border-[#c9a74e] hover:shadow-[0_0_20px_rgba(201,167,78,0.25)] ig-transition overflow-hidden">
                        <CornerFrame size={10} color="#c9a74e" />
                        <span className="relative z-10">Gallery</span>
                      </button>
                      <button className="group relative px-10 py-4 bg-transparent text-[#f5ecd7] font-semibold tracking-widest text-sm rounded-lg border border-[#f5ecd7]/20 hover:border-[#f5ecd7]/50 hover:shadow-[0_0_16px_rgba(245,236,215,0.1)] ig-transition overflow-hidden">
                        <CornerFrame size={10} color="#f5ecd7" />
                        <span className="relative z-10">Archive</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <GoldDivider className="mb-8" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-6">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", cls: "px-5 py-2 text-xs" },
                        { size: "md", cls: "px-8 py-3 text-sm" },
                        { size: "lg", cls: "px-12 py-4 text-base" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`group relative bg-[#c9a74e] text-[#1a3a5c] font-semibold tracking-widest rounded-lg hover:shadow-[0_6px_20px_rgba(201,167,78,0.35)] ig-transition overflow-hidden ${cls}`}
                        >
                          <CornerFrame size={8} color="#1a3a5c" />
                          <span className="relative z-10">{size.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Tessellation",
                      tagline: "Pattern as prayer",
                      desc: "Infinite geometric repetition emerging from a single seed tile.",
                      accent: "#c9a74e",
                      icon: <EightPointStar className="w-8 h-8" />,
                    },
                    {
                      title: "Arabesque",
                      tagline: "Infinite scroll of form",
                      desc: "Organic vine patterns woven into geometric lattice structures.",
                      accent: "#2d7d46",
                      icon: <DiamondIcon className="w-8 h-8" />,
                    },
                    {
                      title: "Muqarnas",
                      tagline: "Stalactite vaulting",
                      desc: "Three-dimensional honeycomb niches that crown the mihrab.",
                      accent: "#c9a74e",
                      icon: <ArchIcon className="w-8 h-8" />,
                    },
                    {
                      title: "Calligraphy",
                      tagline: "Script as geometry",
                      desc: "Arabic letterforms transformed into architectural decoration.",
                      accent: "#8b2332",
                      icon: <GeometricHexagon className="w-8 h-8" />,
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative p-8 rounded-xl border border-[#c9a74e]/25 hover:border-[#c9a74e]/60 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,167,78,0.15)] ig-transition cursor-pointer overflow-hidden"
                    >
                      <CornerFrame size={16} color="#c9a74e" />
                      <div className="flex justify-center mb-4" style={{ color: card.accent }}>
                        <div className="group-hover:rotate-12 ig-transition">
                          {card.icon}
                        </div>
                      </div>
                      <GoldDivider className="mb-4 opacity-50 group-hover:opacity-100" />
                      <h3 className="text-lg font-semibold text-[#f5ecd7] text-center mb-1 tracking-wider group-hover:text-[#c9a74e] ig-transition">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#c9a74e]/70 text-center tracking-widest uppercase mb-3">
                        {card.tagline}
                      </p>
                      <p className="text-[#f5ecd7]/50 text-center text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name..."
                        className="w-full px-5 py-3.5 bg-[#f5ecd7]/8 border border-[#c9a74e]/25 rounded-lg text-[#f5ecd7] placeholder-[#f5ecd7]/25 font-sans tracking-wide focus:border-[#c9a74e] focus:shadow-[0_0_0_3px_rgba(201,167,78,0.12)] focus:outline-none ig-transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="contact@example.com"
                        className="w-full px-5 py-3.5 bg-[#f5ecd7]/8 border border-[#c9a74e]/25 rounded-lg text-[#f5ecd7] placeholder-[#f5ecd7]/25 font-sans tracking-wide focus:border-[#c9a74e] focus:shadow-[0_0_0_3px_rgba(201,167,78,0.12)] focus:outline-none ig-transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Share your inquiry..."
                        className="w-full px-5 py-3.5 bg-[#f5ecd7]/8 border border-[#c9a74e]/25 rounded-lg text-[#f5ecd7] placeholder-[#f5ecd7]/25 font-sans tracking-wide focus:border-[#c9a74e] focus:shadow-[0_0_0_3px_rgba(201,167,78,0.12)] focus:outline-none ig-transition resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-2">
                        Style Era
                      </label>
                      <select className="w-full px-5 py-3.5 bg-[#f5ecd7]/8 border border-[#c9a74e]/25 rounded-lg text-[#f5ecd7] font-sans tracking-wide focus:border-[#c9a74e] focus:outline-none ig-transition">
                        <option className="bg-[#1a3a5c]">Umayyad (661&ndash;750 CE)</option>
                        <option className="bg-[#1a3a5c]">Abbasid (750&ndash;1258 CE)</option>
                        <option className="bg-[#1a3a5c]">Mamluk (1250&ndash;1517 CE)</option>
                        <option className="bg-[#1a3a5c]">Ottoman (1299&ndash;1922 CE)</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-[#c9a74e]/50 flex items-center justify-center bg-[#c9a74e] cursor-pointer">
                        <svg className="w-3 h-3 text-[#1a3a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm text-[#f5ecd7]/60 tracking-wide cursor-pointer">
                        Subscribe to exhibition updates
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-[#c9a74e]/25 cursor-pointer" />
                      <label className="text-sm text-[#f5ecd7]/60 tracking-wide cursor-pointer">
                        Request private viewing
                      </label>
                    </div>
                    <button className="w-full py-3.5 bg-[#c9a74e] text-[#1a3a5c] font-semibold tracking-widest text-sm rounded-lg hover:bg-[#d4b560] hover:shadow-[0_6px_20px_rgba(201,167,78,0.35)] ig-transition">
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              )}

              {/* BADGES TAB */}
              {activeTab === "badges" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-6">
                      Classification badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Geometric", bg: "#c9a74e", text: "#1a3a5c" },
                        { label: "Arabesque", bg: "#2d7d46", text: "#f5ecd7" },
                        { label: "Calligraphic", bg: "#8b2332", text: "#f5ecd7" },
                        { label: "Muqarnas", bg: "#1a3a5c", text: "#c9a74e" },
                        { label: "Tilework", bg: "rgba(201,167,78,0.15)", text: "#c9a74e" },
                        { label: "Mashrabiya", bg: "rgba(45,125,70,0.2)", text: "#2d7d46" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded text-xs font-semibold tracking-widest uppercase border border-[#c9a74e]/20 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(201,167,78,0.2)] ig-transition cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <GoldDivider className="mb-8" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60 mb-6">
                      Star-rated exhibit labels
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "Masterpiece", stars: 5, accent: "#c9a74e" },
                        { label: "Notable", stars: 4, accent: "#c9a74e" },
                        { label: "Collection", stars: 3, accent: "#2d7d46" },
                      ].map((b) => (
                        <div
                          key={b.label}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#c9a74e]/20 hover:border-[#c9a74e]/50 ig-transition cursor-default"
                        >
                          <span className="text-sm font-semibold text-[#f5ecd7] tracking-wide">{b.label}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, si) => (
                              <StarOrnament
                                key={si}
                                className="w-3 h-3"
                                style={{ color: si < b.stars ? b.accent : "rgba(201,167,78,0.2)" }}
                              />
                            ))}
                          </div>
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
      {/* 5. AI RULES INTERACTIVE DEMOS                                    */}
      {/* ================================================================ */}
      <section id="interactions" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 bg-[#f5ecd7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4 text-center">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c9a74e] block mb-3">
              Interaction Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a3a5c] leading-tight tracking-wide">
              The Four Sacred Rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.04}>
            <GoldDivider className="max-w-xs mx-auto mb-6" />
          </RevealBlock>

          <RevealBlock delay={0.08} className="mb-16 text-center">
            <p className="text-[#1a3a5c]/60 text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
              Each aiRule governs how the Islamic Geometric style moves and responds.
              Interact with each demo to experience the principle in action.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* aiRule 1: Sacred Symmetry */}
            <RevealBlock delay={0.1}>
              <div className="relative border-2 border-[#1a3a5c]/20 rounded-xl p-8 bg-white/60 overflow-hidden h-full">
                <CornerFrame size={20} color="#c9a74e" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded bg-[#1a3a5c] text-[#c9a74e] text-xs font-semibold tracking-widest uppercase">
                    Rule 1
                  </span>
                  <span className="text-sm font-semibold text-[#1a3a5c] tracking-wide">Sacred Symmetry</span>
                </div>
                <p className="text-xs text-[#1a3a5c]/50 mb-6 leading-relaxed font-mono">
                  Interactions maintain strict symmetry &mdash; corner ornaments expand outward in unison on hover.
                </p>

                {/* Interactive symmetry demo */}
                <div className="mb-6">
                  <p className="text-xs text-[#1a3a5c]/40 tracking-widest uppercase mb-4">
                    Hover any tile to see symmetrical corner expansion:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg border cursor-pointer flex items-center justify-center ig-transition"
                        style={{
                          borderColor: symmetryActiveCard === idx ? "#c9a74e" : "rgba(26,58,92,0.15)",
                          background: symmetryActiveCard === idx ? "rgba(201,167,78,0.08)" : "transparent",
                          boxShadow: symmetryActiveCard === idx ? "0 4px 20px rgba(201,167,78,0.15)" : "none",
                        }}
                        onMouseEnter={() => setSymmetryActiveCard(idx)}
                        onMouseLeave={() => setSymmetryActiveCard(null)}
                      >
                        <CornerFrame size={12} color="#c9a74e" expanded={symmetryActiveCard === idx} />
                        <EightPointStar
                          className="w-8 h-8 ig-transition"
                          style={{ color: symmetryActiveCard === idx ? "#c9a74e" : "rgba(26,58,92,0.2)" } as React.CSSProperties}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="relative p-5 rounded-lg text-center border ig-transition overflow-hidden"
                  style={{
                    borderColor: symmetryHovered ? "#c9a74e" : "rgba(26,58,92,0.15)",
                    background: symmetryHovered ? "rgba(201,167,78,0.05)" : "transparent",
                  }}
                  onMouseEnter={() => setSymmetryHovered(true)}
                  onMouseLeave={() => setSymmetryHovered(false)}
                >
                  <CornerFrame size={16} color="#c9a74e" expanded={symmetryHovered} />
                  <p className="text-sm text-[#1a3a5c]/70 relative z-10 tracking-wide">
                    {symmetryHovered
                      ? "All four corners expanding in perfect unison"
                      : "Hover to see Sacred Symmetry in action"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 2: Divine Illumination */}
            <RevealBlock delay={0.14}>
              <div className="relative border-2 border-[#1a3a5c]/20 rounded-xl p-8 bg-white/60 overflow-hidden h-full">
                <CornerFrame size={20} color="#c9a74e" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded bg-[#1a3a5c] text-[#c9a74e] text-xs font-semibold tracking-widest uppercase">
                    Rule 2
                  </span>
                  <span className="text-sm font-semibold text-[#1a3a5c] tracking-wide">Divine Illumination</span>
                </div>
                <p className="text-xs text-[#1a3a5c]/50 mb-6 leading-relaxed font-mono">
                  Gold borders and dividers slowly intensify their glow &mdash; no abrupt flash, a gradual revelation.
                </p>

                {/* Glow demo */}
                <div className="mb-6">
                  <p className="text-xs text-[#1a3a5c]/40 tracking-widest uppercase mb-4">
                    Intensity: {glowIntensity}%
                  </p>
                  <div
                    className="relative rounded-xl p-8 flex flex-col items-center gap-4 mb-4 ig-transition"
                    style={{
                      border: `2px solid rgba(201,167,78,${0.2 + glowIntensity * 0.006})`,
                      boxShadow: glowIntensity > 0
                        ? `0 0 ${glowIntensity * 0.4}px rgba(201,167,78,${glowIntensity * 0.004}), inset 0 0 ${glowIntensity * 0.2}px rgba(201,167,78,${glowIntensity * 0.002})`
                        : "none",
                      background: glowIntensity > 0 ? `rgba(201,167,78,${glowIntensity * 0.001})` : "transparent",
                    }}
                  >
                    <StarOrnament
                      className="w-12 h-12 ig-transition"
                      style={{ color: `rgba(201,167,78,${0.3 + glowIntensity * 0.007})` }}
                    />
                    <div
                      className="w-24 h-px ig-transition"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(201,167,78,${0.3 + glowIntensity * 0.007}), transparent)`,
                      }}
                    />
                    <p className="text-xs text-[#1a3a5c]/60 tracking-widest uppercase text-center">
                      {glowIntensity === 0 ? "Dormant" : glowIntensity < 50 ? "Awakening..." : "Illuminated"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setGlowActive((prev) => !prev)}
                  className="w-full py-3 rounded-lg text-sm font-semibold tracking-widest border ig-transition"
                  style={{
                    borderColor: glowActive ? "#c9a74e" : "rgba(26,58,92,0.2)",
                    color: glowActive ? "#c9a74e" : "rgba(26,58,92,0.5)",
                    background: glowActive ? "rgba(201,167,78,0.08)" : "transparent",
                  }}
                >
                  {glowActive ? "Extinguish the light" : "Ignite Divine Illumination"}
                </button>
              </div>
            </RevealBlock>

            {/* aiRule 3: Tessellation Reveal */}
            <RevealBlock delay={0.18}>
              <div className="relative border-2 border-[#1a3a5c]/20 rounded-xl p-8 bg-white/60 overflow-hidden h-full">
                <CornerFrame size={20} color="#c9a74e" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded bg-[#1a3a5c] text-[#c9a74e] text-xs font-semibold tracking-widest uppercase">
                    Rule 3
                  </span>
                  <span className="text-sm font-semibold text-[#1a3a5c] tracking-wide">Tessellation Reveal</span>
                </div>
                <p className="text-xs text-[#1a3a5c]/50 mb-6 leading-relaxed font-mono">
                  Geometric patterns increase in visibility on hover/focus &mdash; order unveiled layer by layer.
                </p>

                {/* Tessellation visibility demo */}
                <div className="mb-4">
                  <p className="text-xs text-[#1a3a5c]/40 tracking-widest uppercase mb-4">
                    Layers visible: {tessRevealLevel} / 3 &mdash; click to add layers:
                  </p>
                  <div
                    className="relative h-40 rounded-xl border border-[#1a3a5c]/10 flex items-center justify-center cursor-pointer overflow-hidden ig-transition"
                    style={{
                      background: "#1a3a5c",
                      boxShadow: tessHovered ? "0 4px 20px rgba(26,58,92,0.2)" : "none",
                    }}
                    onMouseEnter={() => setTessHovered(true)}
                    onMouseLeave={() => setTessHovered(false)}
                    onClick={() => setTessRevealLevel((prev) => (prev % 3) + 1)}
                  >
                    {/* Layer 1: conic tessellation */}
                    <div
                      className="absolute inset-0 ig-transition"
                      style={{
                        ...tessellationStyle,
                        opacity: tessRevealLevel >= 1 ? (tessHovered ? 0.25 : 0.12) : 0,
                      }}
                    />
                    {/* Layer 2: radial dots */}
                    <div
                      className="absolute inset-0 ig-transition"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201,167,78,0.4) 1px, transparent 1px),
                          radial-gradient(circle at 0% 0%, rgba(201,167,78,0.25) 1px, transparent 1px),
                          radial-gradient(circle at 100% 100%, rgba(201,167,78,0.25) 1px, transparent 1px)`,
                        backgroundSize: "30px 30px",
                        opacity: tessRevealLevel >= 2 ? (tessHovered ? 0.9 : 0.5) : 0,
                      }}
                    />
                    {/* Layer 3: diagonal grid */}
                    <div
                      className="absolute inset-0 ig-transition"
                      style={{
                        backgroundImage: `linear-gradient(45deg, rgba(201,167,78,0.15) 1px, transparent 1px),
                          linear-gradient(-45deg, rgba(201,167,78,0.15) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                        opacity: tessRevealLevel >= 3 ? (tessHovered ? 0.8 : 0.4) : 0,
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <EightPointStar className="w-10 h-10 text-[#c9a74e] mx-auto mb-2" />
                      <p className="text-[#f5ecd7]/70 text-xs tracking-widest uppercase">
                        Layer {tessRevealLevel} &mdash; click to reveal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  {[1, 2, 3].map((l) => (
                    <button
                      key={l}
                      onClick={() => setTessRevealLevel(l)}
                      className="flex-1 py-2 rounded text-xs font-semibold tracking-wider ig-transition border"
                      style={{
                        background: tessRevealLevel >= l ? "#1a3a5c" : "transparent",
                        color: tessRevealLevel >= l ? "#c9a74e" : "rgba(26,58,92,0.4)",
                        borderColor: tessRevealLevel >= l ? "#1a3a5c" : "rgba(26,58,92,0.15)",
                      }}
                    >
                      Layer {l}
                    </button>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 4: Elegant Easing */}
            <RevealBlock delay={0.22}>
              <div className="relative border-2 border-[#1a3a5c]/20 rounded-xl p-8 bg-white/60 overflow-hidden h-full">
                <CornerFrame size={20} color="#c9a74e" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded bg-[#1a3a5c] text-[#c9a74e] text-xs font-semibold tracking-widest uppercase">
                    Rule 4
                  </span>
                  <span className="text-sm font-semibold text-[#1a3a5c] tracking-wide">Elegant Easing</span>
                </div>
                <p className="text-xs text-[#1a3a5c]/50 mb-6 leading-relaxed font-mono">
                  duration-500 + ease-out: dignified and graceful &mdash; never bouncy, never rigid.
                </p>

                <div className="space-y-6">
                  {/* ease-out demo */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#c9a74e] tracking-widest uppercase">
                        Elegant ease-out
                      </span>
                      <button
                        className="text-xs px-3 py-1 rounded bg-[#1a3a5c] text-[#c9a74e] hover:bg-[#1a3a5c]/80 ig-transition tracking-wider"
                        onClick={() => setEasingDemo(easingDemo === "ease-out" ? null : "ease-out")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-12 rounded-lg overflow-hidden border border-[#1a3a5c]/10" style={{ background: "rgba(26,58,92,0.06)" }}>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 rounded border-2 border-[#c9a74e] flex items-center justify-center"
                        style={{
                          transform: `translateY(-50%) translateX(${easingDemo === "ease-out" ? "160px" : "0"})`,
                          transition: easingDemo === "ease-out" ? "transform 0.6s ease-out" : "none",
                          background: "#1a3a5c",
                        }}
                      >
                        <StarOrnament className="w-3 h-3 text-[#c9a74e]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-[#1a3a5c]/40 mt-1 font-mono">
                      transition: all 0.5s ease-out &mdash; decelerates gracefully
                    </p>
                  </div>

                  <GoldDivider className="opacity-40" />

                  {/* linear demo */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#1a3a5c]/40 tracking-widest uppercase">
                        Rigid linear (forbidden)
                      </span>
                      <button
                        className="text-xs px-3 py-1 rounded border border-[#1a3a5c]/10 text-[#1a3a5c]/40 hover:border-[#1a3a5c]/20 ig-transition tracking-wider"
                        onClick={() => setEasingDemo(easingDemo === "linear" ? null : "linear")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-12 rounded-lg overflow-hidden border border-[#1a3a5c]/6" style={{ background: "rgba(26,58,92,0.04)" }}>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 rounded border-2 border-[#1a3a5c]/30 flex items-center justify-center"
                        style={{
                          transform: `translateY(-50%) translateX(${easingDemo === "linear" ? "160px" : "0"})`,
                          transition: easingDemo === "linear" ? "transform 0.6s linear" : "none",
                          background: "rgba(26,58,92,0.08)",
                        }}
                      >
                        <DiamondIcon className="w-3 h-3 text-[#1a3a5c]/25" />
                      </div>
                    </div>
                    <p className="text-[10px] text-[#1a3a5c]/30 mt-1 font-mono">
                      transition: all 0.6s linear &mdash; mechanical, inelegant
                    </p>
                  </div>

                  <div className="relative border border-[#c9a74e]/20 rounded-lg p-4 text-center overflow-hidden" style={{ background: "rgba(201,167,78,0.04)" }}>
                    <CornerFrame size={10} color="#c9a74e" />
                    <p className="text-xs text-[#1a3a5c]/60 tracking-wide relative z-10">
                      ease-out decelerates naturally, like water settling into stillness.
                      Linear is mechanical &mdash; unworthy of the style.
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. APP DEMO — Exhibition Hall                                    */}
      {/* ================================================================ */}
      <section id="app-demo" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 bg-[#1a3a5c]" style={tessellationStyle}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4 text-center">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c9a74e] block mb-3">
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#f5ecd7] leading-tight tracking-wide">
              Exhibition Hall
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.04}>
            <GoldDivider className="max-w-xs mx-auto mb-12" />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main feature card */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div className="group relative border-2 border-[#c9a74e]/30 rounded-xl p-10 hover:border-[#c9a74e]/60 hover:shadow-[0_16px_48px_rgba(201,167,78,0.12)] ig-transition overflow-hidden h-full">
                <CornerFrame size={24} color="#c9a74e" />

                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <EightPointStar className="w-14 h-14 text-[#c9a74e] group-hover:rotate-45 ig-transition" />
                  </div>
                  <GoldDivider className="max-w-32 mx-auto mb-6" />
                  <h3 className="text-3xl font-semibold text-[#f5ecd7] text-center tracking-wider mb-3 group-hover:text-[#c9a74e] ig-transition">
                    Alhambra Collection
                  </h3>
                  <p className="text-[#f5ecd7]/50 text-center leading-relaxed mb-8 max-w-md mx-auto">
                    The Nasrid Palace geometric panels &mdash; 14th century gilded stucco
                    tessellation from Granada. Eight-pointed star matrix, infinite repeat.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "Region", value: "Al-Andalus" },
                      { label: "Period", value: "1350 CE" },
                      { label: "Material", value: "Gilded stucco" },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="text-xs text-[#c9a74e]/60 tracking-widest uppercase mb-1">{item.label}</div>
                        <div className="text-sm font-semibold text-[#f5ecd7] tracking-wide">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button className="relative px-10 py-3.5 bg-transparent text-[#c9a74e] font-semibold tracking-widest text-sm rounded-lg border border-[#c9a74e]/40 hover:border-[#c9a74e] hover:shadow-[0_0_20px_rgba(201,167,78,0.2)] ig-transition overflow-hidden">
                      <CornerFrame size={10} color="#c9a74e" />
                      <span className="relative z-10">View Collection</span>
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Sidebar cards */}
            <RevealBlock delay={0.18}>
              <div className="space-y-5 h-full">
                {[
                  {
                    title: "Iznik Tiles",
                    subtitle: "Ottoman, 16th c.",
                    desc: "Cobalt-and-white floral tessellation from Suleiman's mosque.",
                    accent: "#2d7d46",
                    icon: <DiamondIcon className="w-5 h-5" />,
                  },
                  {
                    title: "Nasrid Arch",
                    subtitle: "Granada, 1380",
                    desc: "Interlaced horseshoe arches forming the court of the Lions.",
                    accent: "#c9a74e",
                    icon: <ArchIcon className="w-5 h-5" />,
                  },
                  {
                    title: "Mamluk Star",
                    subtitle: "Cairo, 13th c.",
                    desc: "Six-pointed polygon matrix in polychrome marble mosaic.",
                    accent: "#8b2332",
                    icon: <StarOrnament className="w-5 h-5" />,
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group relative border border-[#c9a74e]/20 rounded-xl p-6 hover:border-[#c9a74e]/50 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,167,78,0.1)] ig-transition cursor-pointer overflow-hidden"
                  >
                    <CornerFrame size={12} color="#c9a74e" />
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 group-hover:rotate-12 ig-transition shrink-0"
                        style={{ color: card.accent }}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#f5ecd7] tracking-wide group-hover:text-[#c9a74e] ig-transition">
                          {card.title}
                        </div>
                        <div className="text-xs text-[#c9a74e]/50 tracking-wider mb-2">{card.subtitle}</div>
                        <p className="text-xs text-[#f5ecd7]/40 leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ================================================================ */}
      <section id="philosophy" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 bg-[#f5ecd7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4 text-center">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c9a74e] block mb-3">
              Design Principles
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1a3a5c] leading-tight tracking-wide">
              Laws of the Craft
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.04}>
            <GoldDivider className="max-w-xs mx-auto mb-6" />
          </RevealBlock>

          <RevealBlock delay={0.08} className="mb-16 text-center">
            <p className="text-[#1a3a5c]/60 text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
              The Islamic Geometric style demands precision. These rules preserve the dignity and
              mathematical integrity of thousand-year-old artistic tradition.
            </p>
          </RevealBlock>

          {/* Philosophy excerpt */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="relative border-2 border-[#c9a74e]/30 rounded-xl p-8 md:p-12 overflow-hidden">
              <CornerFrame size={24} color="#c9a74e" />
              <div className="absolute top-8 right-8">
                <EightPointStar className="w-16 h-16 text-[#c9a74e]/10" />
              </div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#c9a74e] block mb-6">
                Philosophy
              </span>
              <blockquote className="text-[#1a3a5c]/80 text-lg md:text-xl leading-relaxed font-semibold tracking-wide max-w-3xl">
                &ldquo;Core philosophy: Unity in Multiplicity. Simple geometric elements
                through rotation, symmetry and repetition, generating breathtaking complexity.
                This &lsquo;simple to complex&rsquo; process is meditated as the beauty of creation.&rdquo;
              </blockquote>
              <GoldDivider className="max-w-24 mt-6" />
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do list */}
            <RevealBlock delay={0.12}>
              <div className="relative border-2 border-[#2d7d46]/30 rounded-xl p-8 h-full overflow-hidden">
                <CornerFrame size={20} color="#2d7d46" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-[#2d7d46] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#2d7d46] tracking-wider">Do</h3>
                  <StarOrnament className="w-4 h-4 text-[#2d7d46]/40 ml-auto" />
                </div>
                <ul className="space-y-4">
                  {[
                    "Use deep blue bg-[#1a3a5c] with gold text-[#c9a74e] and ivory bg-[#f5ecd7]",
                    "Use geometric tessellation patterns as borders and decorative elements",
                    "Use symmetric centered layouts with text-center items-center",
                    "Use elegant border decoration border-2 border-[#c9a74e]",
                    "Maintain dignified typography font-sans font-semibold tracking-wide",
                    "Use subtle gold shadows shadow-[0_4px_12px_rgba(201,167,78,0.2)]",
                    "Use rounded-lg or rounded-xl for an arched sensibility",
                    "Preserve generous breathing room around geometric ornaments",
                    "Interactions: symmetric expansion and gold radiance on hover",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#1a3a5c]/70 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-sm bg-[#2d7d46] shrink-0 rotate-45" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.18}>
              <div className="relative border-2 border-[#8b2332]/20 rounded-xl p-8 h-full overflow-hidden">
                <CornerFrame size={20} color="#8b2332" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-[#8b2332] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#8b2332] tracking-wider">Don&apos;t</h3>
                  <DiamondIcon className="w-4 h-4 text-[#8b2332]/30 ml-auto" />
                </div>
                <ul className="space-y-4">
                  {[
                    "No fluorescent or neon colors bg-pink-500 text-cyan-400",
                    "No asymmetric chaotic layouts &mdash; symmetry is sacred",
                    "No pure black backgrounds bg-black &mdash; use deep blue bg-[#1a3a5c]",
                    "No handwritten or cartoon typefaces",
                    "No bare minimalism without ornament &mdash; decoration is the core",
                    "No heavy shadows shadow-2xl that destroy the refined feeling",
                    "No dense stacked content lacking structural separation",
                    "No bouncy spring animations &mdash; maintain dignified stability",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#1a3a5c]/70 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-sm bg-[#8b2332] shrink-0 rotate-45" />
                      <span dangerouslySetInnerHTML={{ __html: rule }} />
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: <EightPointStar className="w-7 h-7" />,
                title: "Mathematical Precision",
                desc: "Every pattern emerges from strict geometric axioms. Rotation, reflection, translation.",
                accent: "#c9a74e",
              },
              {
                icon: <GeometricHexagon className="w-7 h-7" />,
                title: "Frame Consciousness",
                desc: "Beautiful geometric borders frame content like mosque dome mosaics frame the central space.",
                accent: "#2d7d46",
              },
              {
                icon: <DiamondIcon className="w-7 h-7" />,
                title: "Dignified Motion",
                desc: "ease-out at duration-500. No bouncing, no springing &mdash; only graceful deceleration.",
                accent: "#8b2332",
              },
              {
                icon: <StarOrnament className="w-7 h-7" />,
                title: "Gilded Hierarchy",
                desc: "Gold serves as the primary accent on the navy ground. Ivory provides breathing space.",
                accent: "#c9a74e",
              },
              {
                icon: <ArchIcon className="w-7 h-7" />,
                title: "Arch Sensibility",
                desc: "Containers recall the horseshoe arch. rounded-xl evokes the curves of the mihrab.",
                accent: "#2d7d46",
              },
              {
                icon: <GeometricHexagon className="w-7 h-7" />,
                title: "Unity in Pattern",
                desc: "Simple tiles repeat to create infinite complexity &mdash; the hallmark of tessellation art.",
                accent: "#8b2332",
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div className="group relative border border-[#1a3a5c]/10 rounded-xl p-6 bg-white/40 hover:border-[#c9a74e]/30 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(201,167,78,0.1)] ig-transition cursor-default h-full overflow-hidden">
                  <CornerFrame size={12} color="#c9a74e" />
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 shrink-0 group-hover:rotate-12 ig-transition"
                      style={{ color: feature.accent }}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1a3a5c] tracking-wide mb-1.5 group-hover:text-[#c9a74e] ig-transition">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-[#1a3a5c]/50 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="relative bg-[#1a3a5c] border-t border-[#c9a74e]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={tessellationStyle} />

        {/* Decorative frame */}
        <div className="absolute inset-4 border border-[#c9a74e]/8 rounded-xl pointer-events-none" />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 text-[#c9a74e]/15 pointer-events-none ig-float">
          <EightPointStar className="w-20 h-20" />
        </div>
        <div className="absolute bottom-8 right-8 text-[#c9a74e]/15 pointer-events-none ig-spin-slow">
          <GeometricHexagon className="w-16 h-16" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative z-10">
          {/* Top ornament */}
          <div className="flex justify-center mb-6">
            <StarOrnament className="w-8 h-8 text-[#c9a74e] ig-pulse-gold" />
          </div>
          <GoldDivider className="max-w-xs mx-auto mb-12" />

          {/* Main footer content */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="relative inline-flex items-center gap-3 px-5 py-2.5 border border-[#c9a74e]/30 rounded-lg overflow-hidden">
                <CornerFrame size={10} color="#c9a74e" />
                <StarOrnament className="w-5 h-5 text-[#c9a74e]" />
                <span className="text-base font-semibold tracking-widest text-[#f5ecd7] uppercase">
                  Islamic Geometric
                </span>
              </div>
              <p className="text-sm text-[#f5ecd7]/40 leading-relaxed tracking-wide">
                Precision tessellation. Gilded ornament. Sacred symmetry
                translated into the modern interface &mdash; a thousand years of
                geometric art, alive in every interaction.
              </p>
              <div className="flex gap-2">
                {["#1a3a5c", "#c9a74e", "#f5ecd7", "#2d7d46", "#8b2332"].map((hex, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded border border-[#c9a74e]/20 hover:scale-110 hover:border-[#c9a74e]/50 ig-transition cursor-default"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60">Style</span>
                <Link href="/styles/islamic-geometric" className="text-[#f5ecd7]/50 hover:text-[#c9a74e] ig-transition tracking-wide">
                  Documentation
                </Link>
                <Link href="/styles/islamic-geometric/showcase" className="text-[#f5ecd7]/50 hover:text-[#c9a74e] ig-transition tracking-wide">
                  Showcase
                </Link>
                <Link href="/styles/islamic-geometric/cover" className="text-[#f5ecd7]/50 hover:text-[#c9a74e] ig-transition tracking-wide">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60">StyleKit</span>
                <Link href="/" className="text-[#f5ecd7]/50 hover:text-[#c9a74e] ig-transition tracking-wide">
                  Home
                </Link>
                <Link href="/styles" className="text-[#f5ecd7]/50 hover:text-[#c9a74e] ig-transition tracking-wide">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a74e]/60">Palette</span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-[#f5ecd7]/40 text-xs">
                    <span className="w-3 h-3 rounded-sm inline-block border border-[#c9a74e]/20" style={{ backgroundColor: s.hex }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Gold divider */}
          <GoldDivider className="mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-[#f5ecd7]/30 tracking-wide">
              <StarOrnament className="w-3 h-3 text-[#c9a74e]/50" />
              <span>Islamic Geometric &mdash; StyleKit Design System</span>
            </div>
            <Link
              href="/"
              className="relative flex items-center gap-2 px-6 py-2.5 border border-[#c9a74e]/30 text-[#c9a74e] text-sm font-semibold tracking-widest hover:border-[#c9a74e] hover:shadow-[0_0_16px_rgba(201,167,78,0.2)] ig-transition rounded-lg overflow-hidden"
            >
              <CornerFrame size={8} color="#c9a74e" />
              <span className="relative z-10">Back to StyleKit &#8594;</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
