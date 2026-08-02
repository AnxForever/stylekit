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
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cubism color tokens                                                 */
/* ------------------------------------------------------------------ */

const CB = {
  sienna: "#5c4033",
  canvas: "#e8dcc8",
  khaki: "#8b7355",
  steel: "#3d5c6e",
  terra: "#9b3d25",
} as const;

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Burnt Sienna", hex: CB.sienna, role: "Primary" },
  { name: "Canvas", hex: CB.canvas, role: "Background" },
  { name: "Khaki", hex: CB.khaki, role: "Accent 1" },
  { name: "Steel Blue", hex: CB.steel, role: "Accent 2" },
  { name: "Terracotta", hex: CB.terra, role: "Accent 3" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1: Earth-tone mode switcher — toggle between earth tones
  const [earthMode, setEarthMode] = useState<"sienna" | "steel" | "terra">("sienna");

  // aiRule 2: Hard shadow depth demo — choose shadow size
  const [shadowDepth, setShadowDepth] = useState<4 | 6 | 8>(6);

  // aiRule 3: Geometric fragmentation demo — toggle fragment layers
  const [fragmentLayer, setFragmentLayer] = useState(1);
  const [fragmentHovered, setFragmentHovered] = useState(false);

  // aiRule 4: Animation timing demo — compare 150ms vs 400ms
  const [timingMode, setTimingMode] = useState<"cubism" | "slow">("cubism");
  const [animTriggered, setAnimTriggered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const earthModeConfig = {
    sienna: { bg: CB.sienna, text: CB.canvas, label: "Burnt Sienna", shadow: CB.khaki },
    steel: { bg: CB.steel, text: CB.canvas, label: "Steel Blue", shadow: CB.sienna },
    terra: { bg: CB.terra, text: CB.canvas, label: "Terracotta", shadow: CB.khaki },
  };

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: CB.canvas, color: CB.sienna }}
    >
      <style>{`
        @keyframes cb-slice {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(420%) skewX(-12deg); }
        }
        .cb-slice-anim {
          animation: cb-slice 0.3s ease-in forwards;
        }
        @keyframes cb-stamp {
          0% { transform: scale(1.08) rotate(-1deg); }
          40% { transform: scale(0.97) rotate(0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .cb-stamp-in {
          animation: cb-stamp 0.2s ease-out forwards;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                      */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b-2"
        style={{
          backgroundColor: `${CB.canvas}f0`,
          borderColor: CB.sienna,
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Logo — skewed badge */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 border-2 rounded-sm"
            style={{
              backgroundColor: CB.sienna,
              borderColor: CB.khaki,
              transform: "skewX(-4deg)",
              boxShadow: `3px 3px 0px ${CB.khaki}`,
            }}
          >
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: CB.canvas, transform: "skewX(4deg)", display: "inline-block" }}
            >
              Cubism
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Interactions", "Gallery", "Rules"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-sm font-bold uppercase tracking-wider cursor-pointer rounded-sm border-2 border-transparent transition-all duration-150"
                style={{ color: CB.sienna }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = CB.sienna;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.sienna}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/cubism"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm border-2 transition-[transform,box-shadow] duration-150"
            style={{
              backgroundColor: CB.terra,
              color: CB.canvas,
              borderColor: CB.khaki,
              boxShadow: `4px 4px 0px ${CB.khaki}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.khaki}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.khaki}`;
            }}
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                           */}
      {/* ================================================================ */}
      <section
        className="relative pt-28 md:pt-40 pb-24 px-5 md:px-10 overflow-hidden min-h-screen flex items-center"
        style={{ backgroundColor: CB.canvas }}
      >
        {/* Geometric background fragments */}
        <div
          className="absolute top-8 right-8 w-72 h-72 pointer-events-none"
          style={{
            backgroundColor: `${CB.steel}18`,
            transform: "rotate(18deg) skewX(-8deg)",
            border: `2px solid ${CB.steel}30`,
          }}
        />
        <div
          className="absolute bottom-16 left-12 w-56 h-56 pointer-events-none"
          style={{
            backgroundColor: `${CB.terra}12`,
            transform: "rotate(-10deg) skewY(4deg)",
            border: `2px solid ${CB.terra}25`,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 pointer-events-none"
          style={{
            backgroundColor: `${CB.khaki}15`,
            transform: "rotate(45deg)",
            border: `2px solid ${CB.khaki}30`,
          }}
        />
        <div
          className="absolute top-16 left-1/3 w-20 h-40 pointer-events-none"
          style={{
            backgroundColor: `${CB.sienna}08`,
            transform: "rotate(-25deg) skewX(12deg)",
            borderLeft: `3px solid ${CB.sienna}20`,
          }}
        />
        <div
          className="absolute bottom-10 right-1/3 w-48 h-20 pointer-events-none"
          style={{
            backgroundColor: `${CB.steel}10`,
            transform: "rotate(8deg) skewX(-6deg)",
            borderBottom: `2px solid ${CB.steel}25`,
          }}
        />

        {/* Hero content */}
        <div className="max-w-6xl mx-auto relative w-full">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            {/* Eyebrow line */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-20 h-0.5"
                style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: CB.terra }}
              >
                立体主义 / Cubism
              </span>
            </div>
          </div>

          <h1
            className="text-6xl md:text-9xl font-bold uppercase tracking-tight leading-none mb-4"
            style={{
              color: CB.sienna,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Cubism
          </h1>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            {/* Geometric accent strip */}
            <div className="flex gap-1 mb-6">
              {[CB.sienna, CB.khaki, CB.steel, CB.terra, CB.sienna].map((c, i) => (
                <div
                  key={i}
                  className="h-2"
                  style={{
                    backgroundColor: c,
                    width: i === 0 ? "80px" : i === 2 ? "48px" : "32px",
                    transform: `skewX(${i % 2 === 0 ? -12 : -8}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          <p
            className="text-lg md:text-xl font-bold uppercase tracking-widest max-w-lg mb-10"
            style={{
              color: `${CB.sienna}80`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Multiple perspectives. Fragmented form. Geometric truth.
          </p>

          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            <button
              className="group relative px-10 py-4 overflow-hidden font-bold uppercase tracking-widest text-sm rounded-sm border-2 transition-[transform,box-shadow] duration-150"
              style={{
                backgroundColor: CB.sienna,
                color: CB.canvas,
                borderColor: CB.khaki,
                boxShadow: `6px 6px 0px ${CB.khaki}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px) rotate(-0.5deg)";
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.steel}`;
                (e.currentTarget as HTMLElement).style.borderColor = CB.steel;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${CB.khaki}`;
                (e.currentTarget as HTMLElement).style.borderColor = CB.khaki;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px) rotate(0deg)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px) rotate(-0.5deg)";
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.steel}`;
              }}
            >
              <span className="relative z-10">Deconstruct</span>
              <span
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] transition-transform duration-150 group-hover:translate-x-[420%]"
                style={{ backgroundColor: `${CB.terra}30` }}
              />
            </button>

            <button
              className="px-8 py-4 font-bold uppercase tracking-widest text-sm rounded-sm border-2 transition-[transform,box-shadow,background-color] duration-150"
              style={{
                backgroundColor: "transparent",
                color: CB.sienna,
                borderColor: CB.sienna,
                boxShadow: `4px 4px 0px ${CB.sienna}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = `${CB.sienna}12`;
                (e.currentTarget as HTMLElement).style.transform = "translate(1px,1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${CB.sienna}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.sienna}`;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Explore
            </button>
          </div>

          {/* Hero stats — skewed */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "1907", label: "Founded", accent: CB.terra },
              { value: "3+", label: "Perspectives", accent: CB.steel },
              { value: "∞", label: "Fragments", accent: CB.khaki },
              { value: "0°", label: "Symmetry", accent: CB.terra },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="group border-2 p-5 rounded-sm cursor-default transition-[transform,box-shadow] duration-150"
                style={{
                  backgroundColor: CB.canvas,
                  borderColor: CB.sienna,
                  boxShadow: `4px 4px 0px ${CB.sienna}`,
                  transform: `skewX(${i % 2 === 0 ? -2 : 2}deg)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = `skewX(${i % 2 === 0 ? -2 : 2}deg) translate(-1px,-1px)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${stat.accent}`;
                  (e.currentTarget as HTMLElement).style.borderColor = stat.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = `skewX(${i % 2 === 0 ? -2 : 2}deg)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.sienna}`;
                  (e.currentTarget as HTMLElement).style.borderColor = CB.sienna;
                }}
              >
                <div className="text-3xl font-bold mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: `${CB.sienna}80` }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: CB.sienna }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase block mb-3"
              style={{ color: CB.terra }}
            >
              Color System
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none"
              style={{ color: CB.canvas }}
            >
              Earth Tone Palette
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <div className="flex items-center gap-4 mt-3">
              <div
                className="w-12 h-0.5"
                style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }}
              />
              <p
                className="font-bold uppercase tracking-widest text-sm"
                style={{ color: `${CB.canvas}80` }}
              >
                Inspired by the analytical Cubism period — restrained, earthy, deliberate.
              </p>
            </div>
          </RevealBlock>

          {/* Palette swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-6 mb-12">
              {palette.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="w-28 h-28 rounded-sm border-2 transition-[transform,box-shadow] duration-150"
                    style={{
                      backgroundColor: swatch.hex,
                      borderColor: CB.canvas,
                      boxShadow:
                        hoveredSwatch === i
                          ? `6px 6px 0px ${CB.canvas}`
                          : `3px 3px 0px ${CB.canvas}60`,
                      transform:
                        hoveredSwatch === i
                          ? "translate(-2px,-2px) rotate(-1deg)"
                          : `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                    }}
                  />
                  <div>
                    <div
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: CB.canvas }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className="font-mono text-xs mt-0.5"
                      style={{ color: `${CB.canvas}70` }}
                    >
                      {swatch.hex}
                    </div>
                    <span
                      className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm border"
                      style={{ color: CB.sienna, backgroundColor: CB.canvas, borderColor: CB.khaki }}
                    >
                      {swatch.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color usage example */}
          <RevealBlock delay={0.15}>
            <div
              className="border-2 rounded-sm p-8 grid grid-cols-1 md:grid-cols-3 gap-6"
              style={{ borderColor: `${CB.canvas}40` }}
            >
              <div className="md:col-span-1">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: `${CB.canvas}60` }}
                >
                  Usage examples
                </p>
                <div className="space-y-3">
                  {[
                    { role: "Primary text", bg: CB.sienna, text: CB.canvas },
                    { role: "Surface", bg: CB.canvas, text: CB.sienna },
                    { role: "Accent border", bg: CB.terra, text: CB.canvas },
                    { role: "Secondary", bg: CB.steel, text: CB.canvas },
                    { role: "Neutral", bg: CB.khaki, text: CB.canvas },
                  ].map((ex) => (
                    <div
                      key={ex.role}
                      className="flex items-center gap-3 px-4 py-2 border-2 rounded-sm"
                      style={{
                        backgroundColor: ex.bg,
                        borderColor: `${CB.canvas}40`,
                      }}
                    >
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: ex.text }}
                      >
                        {ex.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 relative overflow-hidden rounded-sm border-2" style={{ borderColor: `${CB.canvas}40`, minHeight: "200px" }}>
                <div className="absolute inset-0" style={{ backgroundColor: CB.canvas }}>
                  {/* Mini cubism composition */}
                  <div className="absolute top-4 right-4 w-24 h-24" style={{ backgroundColor: `${CB.steel}20`, transform: "rotate(12deg) skewX(-6deg)", border: `2px solid ${CB.steel}40` }} />
                  <div className="absolute bottom-4 left-4 w-20 h-20" style={{ backgroundColor: `${CB.terra}15`, transform: "rotate(-8deg) skewY(4deg)", border: `2px solid ${CB.terra}30` }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20" style={{ backgroundColor: `${CB.khaki}18`, transform: "rotate(3deg) skewX(-10deg)", border: `2px solid ${CB.khaki}35` }} />
                  <div className="absolute bottom-0 right-8 w-0 h-0" style={{ borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderBottom: `40px solid ${CB.terra}30` }} />
                  <div className="relative z-10 p-8">
                    <div className="w-16 h-0.5 mb-4" style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }} />
                    <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ color: CB.sienna }}>
                      Analytical
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: `${CB.sienna}60` }}>
                      Cubism palette in context
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: CB.canvas }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase block mb-3"
              style={{ color: CB.terra }}
            >
              Components
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none"
              style={{ color: CB.sienna }}
            >
              Geometric Building Blocks
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <div className="flex items-center gap-4 mt-3">
              <div className="w-12 h-0.5" style={{ backgroundColor: CB.khaki, transform: "skewX(-12deg)" }} />
              <p className="font-bold uppercase tracking-widest text-sm" style={{ color: `${CB.sienna}70` }}>
                Every element obeys hard edges, thick borders, and displaced shadows.
              </p>
            </div>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 rounded-sm border-2 text-sm font-bold uppercase tracking-widest transition-[transform,box-shadow,background-color,color] duration-150"
                  style={
                    activeTab === tab
                      ? {
                          backgroundColor: CB.sienna,
                          color: CB.canvas,
                          borderColor: CB.khaki,
                          boxShadow: `3px 3px 0px ${CB.khaki}`,
                          transform: "translate(-1px,-1px)",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: CB.sienna,
                          borderColor: CB.sienna,
                          boxShadow: "none",
                        }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="border-2 p-8 md:p-12 rounded-sm"
              style={{
                borderColor: CB.sienna,
                backgroundColor: CB.canvas,
                boxShadow: `8px 8px 0px ${CB.sienna}`,
              }}
            >
              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: `${CB.sienna}70` }}>
                      Primary — hard shadow + geometric slide
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {/* Primary */}
                      <button
                        className="group relative px-8 py-3 overflow-hidden rounded-sm border-2 font-bold uppercase tracking-widest text-sm transition-[transform,box-shadow,border-color] duration-150"
                        style={{
                          backgroundColor: CB.sienna,
                          color: CB.canvas,
                          borderColor: CB.khaki,
                          boxShadow: `4px 4px 0px ${CB.khaki}`,
                          transform: "skewX(-3deg)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "skewX(-3deg) translate(2px,2px) rotate(-1deg)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.steel}`;
                          (e.currentTarget as HTMLElement).style.borderColor = CB.steel;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "skewX(-3deg)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.khaki}`;
                          (e.currentTarget as HTMLElement).style.borderColor = CB.khaki;
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "skewX(-3deg) translate(4px,4px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "skewX(-3deg) translate(2px,2px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `1px 1px 0px ${CB.khaki}`;
                        }}
                      >
                        <span className="relative z-10" style={{ display: "inline-block", transform: "skewX(3deg)" }}>Explore</span>
                        <span
                          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 transition-transform duration-150 group-hover:translate-x-[420%]"
                          style={{
                            backgroundColor: `${CB.terra}25`,
                            transform: "skewX(-18deg)",
                          }}
                        />
                      </button>

                      {/* Steel variant */}
                      <button
                        className="px-8 py-3 rounded-sm border-2 font-bold uppercase tracking-widest text-sm transition-[transform,box-shadow] duration-150"
                        style={{
                          backgroundColor: CB.steel,
                          color: CB.canvas,
                          borderColor: CB.sienna,
                          boxShadow: `4px 4px 0px ${CB.sienna}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.sienna}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.sienna}`;
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      >
                        Analyse
                      </button>

                      {/* Terra ghost */}
                      <button
                        className="px-8 py-3 rounded-sm border-2 font-bold uppercase tracking-widest text-sm transition-[transform,box-shadow,background-color] duration-150"
                        style={{
                          backgroundColor: "transparent",
                          color: CB.terra,
                          borderColor: CB.terra,
                          boxShadow: `4px 4px 0px ${CB.terra}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = `${CB.terra}10`;
                          (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px) rotate(1deg)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.terra}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.terra}`;
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      >
                        Deconstruct
                      </button>
                    </div>
                  </div>

                  {/* Size variants */}
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: `${CB.sienna}70` }}>
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-5 items-end">
                      {[
                        { label: "SM", px: "px-4 py-2 text-xs", shadow: 3 },
                        { label: "MD", px: "px-6 py-3 text-sm", shadow: 4 },
                        { label: "LG", px: "px-10 py-4 text-base", shadow: 6 },
                      ].map(({ label, px, shadow }) => (
                        <button
                          key={label}
                          className={`${px} rounded-sm border-2 font-bold uppercase tracking-widest transition-[transform,box-shadow] duration-150`}
                          style={{
                            backgroundColor: CB.sienna,
                            color: CB.canvas,
                            borderColor: CB.khaki,
                            boxShadow: `${shadow}px ${shadow}px 0px ${CB.khaki}`,
                          }}
                          onMouseEnter={(e) => {
                            const half = Math.ceil(shadow / 2);
                            (e.currentTarget as HTMLElement).style.transform = `translate(${half}px,${half}px)`;
                            (e.currentTarget as HTMLElement).style.boxShadow = `${half}px ${half}px 0px ${CB.khaki}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `${shadow}px ${shadow}px 0px ${CB.khaki}`;
                          }}
                          onMouseDown={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = `translate(${shadow}px,${shadow}px)`;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          {label}
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
                      title: "Analytical Phase",
                      desc: "Deconstructing form into geometric planes, revealing multiple perspectives simultaneously.",
                      accent: CB.steel,
                      skew: "skewX(-2deg)",
                    },
                    {
                      title: "Synthetic Phase",
                      desc: "Reassembling fragments into a new visual vocabulary — bold, flat, abstracted.",
                      accent: CB.terra,
                      skew: "skewX(2deg)",
                    },
                    {
                      title: "Faceted Form",
                      desc: "Shattered planes interlock at sharp angles. No single viewpoint dominates.",
                      accent: CB.khaki,
                      skew: "skewX(-1deg)",
                    },
                    {
                      title: "Planar Depth",
                      desc: "Overlapping geometric layers substitute for traditional perspective and shading.",
                      accent: CB.sienna,
                      skew: "skewX(3deg)",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative border-2 p-6 rounded-sm cursor-pointer transition-[transform,box-shadow,border-color] duration-150"
                      style={{
                        backgroundColor: CB.canvas,
                        borderColor: CB.sienna,
                        boxShadow: `6px 6px 0px ${CB.sienna}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${card.accent}`;
                        (e.currentTarget as HTMLElement).style.borderColor = card.accent;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${CB.sienna}`;
                        (e.currentTarget as HTMLElement).style.borderColor = CB.sienna;
                      }}
                      onMouseDown={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${card.accent}`;
                      }}
                    >
                      {/* Geometric corner accent */}
                      <div
                        className="absolute top-0 right-0 w-16 h-16 transition-transform duration-150 group-hover:-translate-x-1 group-hover:translate-y-1"
                        style={{
                          backgroundColor: `${card.accent}20`,
                          transform: "skewX(-12deg)",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-12 h-12 transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{
                          backgroundColor: `${card.accent}12`,
                          transform: "skewY(6deg)",
                        }}
                      />
                      <div className="relative z-10">
                        <h3
                          className="text-xl font-bold uppercase tracking-wider mb-2"
                          style={{ color: CB.sienna }}
                        >
                          {card.title}
                        </h3>
                        <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: card.accent, transform: "skewX(-12deg)" }} />
                        <p className="text-sm leading-relaxed font-bold" style={{ color: `${CB.sienna}70` }}>
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
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${CB.sienna}80` }}>
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Fragment label..."
                        className="w-full px-4 py-3 rounded-sm border-2 font-bold text-sm uppercase tracking-wider focus:outline-none transition-[border-color,box-shadow] duration-150"
                        style={{
                          backgroundColor: CB.canvas,
                          color: CB.sienna,
                          borderColor: `${CB.sienna}50`,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = CB.terra;
                          (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${CB.terra}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${CB.sienna}50`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${CB.sienna}80` }}>
                        Medium
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-sm border-2 font-bold text-sm uppercase tracking-wider focus:outline-none transition-[border-color,box-shadow] duration-150"
                        style={{
                          backgroundColor: CB.canvas,
                          color: CB.sienna,
                          borderColor: `${CB.sienna}50`,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = CB.steel;
                          (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${CB.steel}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${CB.sienna}50`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      >
                        <option>Oil on canvas</option>
                        <option>Collage</option>
                        <option>Charcoal</option>
                        <option>Ink</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${CB.sienna}80` }}>
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the geometric composition..."
                        className="w-full px-4 py-3 rounded-sm border-2 font-bold text-sm uppercase tracking-wider focus:outline-none transition-[border-color,box-shadow] duration-150 resize-none"
                        style={{
                          backgroundColor: CB.canvas,
                          color: CB.sienna,
                          borderColor: `${CB.sienna}50`,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = CB.terra;
                          (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${CB.terra}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${CB.sienna}50`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <button
                      className="w-full py-3.5 rounded-sm border-2 font-bold uppercase tracking-widest text-sm transition-[transform,box-shadow] duration-150"
                      style={{
                        backgroundColor: CB.sienna,
                        color: CB.canvas,
                        borderColor: CB.khaki,
                        boxShadow: `4px 4px 0px ${CB.khaki}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.khaki}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.khaki}`;
                      }}
                      onMouseDown={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      Submit Fragment
                    </button>
                  </div>

                  <div className="space-y-5">
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: `${CB.sienna}70` }}>
                      Checkbox states
                    </p>
                    {[
                      { label: "Geometric fragmentation", checked: true },
                      { label: "Multi-perspective overlap", checked: true },
                      { label: "Earth tone palette", checked: false },
                      { label: "Hard-edge borders", checked: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: item.checked ? CB.sienna : "transparent",
                            borderColor: CB.sienna,
                          }}
                        >
                          {item.checked && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={CB.canvas} strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <label className="text-sm font-bold uppercase tracking-wider" style={{ color: CB.sienna }}>
                          {item.label}
                        </label>
                      </div>
                    ))}

                    <div className="mt-8 border-2 p-5 rounded-sm" style={{ borderColor: `${CB.sienna}40` }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: `${CB.sienna}60` }}>
                        Search fragment
                      </p>
                      <input
                        type="text"
                        placeholder="Search fragments..."
                        className="w-full px-4 py-3 rounded-sm border-2 font-bold text-sm uppercase tracking-wider focus:outline-none transition-[border-color,box-shadow] duration-150"
                        style={{
                          backgroundColor: CB.canvas,
                          color: CB.sienna,
                          borderColor: `${CB.sienna}40`,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = CB.terra;
                          (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${CB.terra}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${CB.sienna}40`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: `${CB.sienna}70` }}>
                      Geometric tags
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Cubism", bg: CB.sienna, text: CB.canvas, accent: CB.khaki },
                        { label: "Picasso", bg: CB.terra, text: CB.canvas, accent: CB.sienna },
                        { label: "Braque", bg: CB.steel, text: CB.canvas, accent: CB.sienna },
                        { label: "Geometric", bg: CB.khaki, text: CB.canvas, accent: CB.sienna },
                        { label: "Fragment", bg: CB.canvas, text: CB.sienna, accent: CB.sienna },
                        { label: "Analytical", bg: CB.sienna, text: CB.canvas, accent: CB.terra },
                        { label: "Synthetic", bg: CB.terra, text: CB.canvas, accent: CB.khaki },
                        { label: "Planar", bg: CB.steel, text: CB.canvas, accent: CB.khaki },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded-sm border-2 text-xs font-bold uppercase tracking-widest transition-[transform,box-shadow] duration-150 cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            borderColor: b.accent,
                            boxShadow: `2px 2px 0px ${b.accent}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px) rotate(-1deg)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${b.accent}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${b.accent}`;
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: `${CB.sienna}70` }}>
                      Status badges
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "Exhibited", icon: "check", bg: CB.steel, text: CB.canvas },
                        { label: "In Progress", icon: "dash", bg: CB.terra, text: CB.canvas },
                        { label: "Archived", icon: "box", bg: CB.khaki, text: CB.canvas },
                        { label: "Draft", icon: "dot", bg: CB.canvas, text: CB.sienna },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border-2 text-xs font-bold uppercase tracking-widest"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            borderColor: b.text === CB.canvas ? `${CB.canvas}40` : CB.sienna,
                          }}
                        >
                          {b.icon === "check" && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {b.icon === "dash" && <span className="w-3 h-0.5 inline-block" style={{ backgroundColor: b.text }} />}
                          {b.icon === "box" && <span className="w-2.5 h-2.5 border-2 inline-block rounded-sm" style={{ borderColor: b.text }} />}
                          {b.icon === "dot" && <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: CB.sienna }} />}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: `${CB.sienna}70` }}>
                      Numeric counters
                    </p>
                    <div className="flex flex-wrap gap-8 items-center">
                      {[
                        { label: "Fragments", count: 12, color: CB.steel },
                        { label: "Perspectives", count: 4, color: CB.terra },
                        { label: "Layers", count: 7, color: CB.khaki },
                        { label: "Planes", count: 23, color: CB.sienna },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: CB.sienna }}>{b.label}</span>
                          <span
                            className="w-8 h-8 rounded-sm border-2 flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: b.color,
                              color: CB.canvas,
                              borderColor: CB.sienna,
                              boxShadow: `2px 2px 0px ${CB.sienna}`,
                            }}
                          >
                            {b.count}
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
      {/* 5. AIRULES INTERACTIVE DEMOS                                      */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: `${CB.sienna}10` }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase block mb-3"
              style={{ color: CB.terra }}
            >
              AI Design Rules
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none"
              style={{ color: CB.sienna }}
            >
              Interaction Principles
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <div className="flex items-center gap-4 mt-3">
              <div className="w-12 h-0.5" style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }} />
              <p className="font-bold uppercase tracking-widest text-sm" style={{ color: `${CB.sienna}70` }}>
                Four named rules — each with an interactive demo. Click, hover, and observe.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ---- aiRule 1: Earth Tone Mandate ---- */}
            <RevealBlock delay={0.08}>
              <div
                className="border-2 p-8 rounded-sm h-full"
                style={{
                  backgroundColor: CB.canvas,
                  borderColor: CB.sienna,
                  boxShadow: `6px 6px 0px ${CB.sienna}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-sm border-2 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: CB.sienna, color: CB.canvas, borderColor: CB.khaki }}
                  >
                    Rule 1
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: CB.sienna }}>
                    Earth Tone Mandate
                  </span>
                </div>
                <p
                  className="font-mono text-xs mb-6 leading-relaxed"
                  style={{ color: `${CB.sienna}70` }}
                >
                  #5c4033 / #e8dcc8 / #8b7355 / #3d5c6e / #9b3d25
                  <br />
                  No neon. No pure white. No corporate blue.
                </p>

                {/* Interactive: Switch earth tone modes */}
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${CB.sienna}60` }}>
                    Click a tone to apply it as primary
                  </p>
                  <div className="flex gap-3">
                    {(["sienna", "steel", "terra"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setEarthMode(mode)}
                        className="flex-1 py-3 rounded-sm border-2 text-xs font-bold uppercase tracking-wider transition-[transform,box-shadow] duration-150"
                        style={{
                          backgroundColor: earthModeConfig[mode].bg,
                          color: earthModeConfig[mode].text,
                          borderColor: earthModeConfig[mode].shadow,
                          boxShadow:
                            earthMode === mode
                              ? `4px 4px 0px ${earthModeConfig[mode].shadow}`
                              : `2px 2px 0px ${earthModeConfig[mode].shadow}`,
                          transform: earthMode === mode ? "translate(-2px,-2px)" : "translate(0,0)",
                        }}
                      >
                        {earthModeConfig[mode].label}
                      </button>
                    ))}
                  </div>

                  {/* Live preview card */}
                  <div
                    className="mt-4 p-5 border-2 rounded-sm transition-[background-color,border-color,box-shadow] duration-200"
                    style={{
                      backgroundColor: earthModeConfig[earthMode].bg,
                      borderColor: earthModeConfig[earthMode].shadow,
                      boxShadow: `4px 4px 0px ${earthModeConfig[earthMode].shadow}`,
                    }}
                  >
                    <div
                      className="w-10 h-0.5 mb-3"
                      style={{
                        backgroundColor: earthModeConfig[earthMode].text,
                        transform: "skewX(-12deg)",
                      }}
                    />
                    <h4
                      className="font-bold uppercase tracking-wider text-sm mb-1 transition-colors duration-200"
                      style={{ color: earthModeConfig[earthMode].text }}
                    >
                      {earthModeConfig[earthMode].label} Mode
                    </h4>
                    <p
                      className="text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                      style={{ color: `${earthModeConfig[earthMode].text}80` }}
                    >
                      Earth tone — no softening gradients
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 2: Hard Shadow System ---- */}
            <RevealBlock delay={0.12}>
              <div
                className="border-2 p-8 rounded-sm h-full"
                style={{
                  backgroundColor: CB.canvas,
                  borderColor: CB.sienna,
                  boxShadow: `6px 6px 0px ${CB.sienna}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-sm border-2 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: CB.steel, color: CB.canvas, borderColor: CB.sienna }}
                  >
                    Rule 2
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: CB.sienna }}>
                    Hard Shadow System
                  </span>
                </div>
                <p
                  className="font-mono text-xs mb-6 leading-relaxed"
                  style={{ color: `${CB.sienna}70` }}
                >
                  shadow-[Npx_Npx_0px_color]
                  <br />
                  Zero blur. Geometric offset only.
                </p>

                {/* Interactive: Drag shadow depth */}
                <div className="space-y-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${CB.sienna}60` }}>
                    Choose shadow depth
                  </p>
                  <div className="flex gap-3">
                    {([4, 6, 8] as const).map((depth) => (
                      <button
                        key={depth}
                        onClick={() => setShadowDepth(depth)}
                        className="flex-1 py-2.5 rounded-sm border-2 text-xs font-bold uppercase tracking-wider transition-[transform,box-shadow] duration-150"
                        style={{
                          backgroundColor: shadowDepth === depth ? CB.steel : "transparent",
                          color: shadowDepth === depth ? CB.canvas : CB.sienna,
                          borderColor: CB.steel,
                        }}
                      >
                        {depth}px
                      </button>
                    ))}
                  </div>

                  {/* Live preview with chosen shadow */}
                  <div className="flex items-center justify-center py-6">
                    <div
                      className="px-8 py-4 border-2 rounded-sm transition-[box-shadow] duration-150"
                      style={{
                        backgroundColor: CB.sienna,
                        color: CB.canvas,
                        borderColor: CB.khaki,
                        boxShadow: `${shadowDepth}px ${shadowDepth}px 0px ${CB.khaki}`,
                      }}
                    >
                      <span className="font-bold uppercase tracking-widest text-sm">
                        {shadowDepth}px Hard Shadow
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-xs font-bold uppercase tracking-widest text-center"
                    style={{ color: `${CB.sienna}60` }}
                  >
                    box-shadow: {shadowDepth}px {shadowDepth}px 0px {CB.khaki}
                  </p>

                  {/* Hover to see press effect */}
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: `${CB.sienna}60` }}>
                    Hover &amp; press the card below
                  </p>
                  <div
                    className="p-5 border-2 rounded-sm cursor-pointer transition-[transform,box-shadow] duration-150"
                    style={{
                      backgroundColor: CB.canvas,
                      borderColor: CB.terra,
                      boxShadow: `${shadowDepth}px ${shadowDepth}px 0px ${CB.terra}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = `translate(-2px,-2px)`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `${shadowDepth + 2}px ${shadowDepth + 2}px 0px ${CB.terra}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `${shadowDepth}px ${shadowDepth}px 0px ${CB.terra}`;
                    }}
                    onMouseDown={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = `translate(${shadowDepth}px,${shadowDepth}px)`;
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                    onMouseUp={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.terra}`;
                    }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: CB.sienna }}>
                      Hover: shadow lifts. Press: shadow collapses. This is the "stamp" effect.
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 3: Geometric Fragmentation ---- */}
            <RevealBlock delay={0.16}>
              <div
                className="border-2 p-8 rounded-sm h-full"
                style={{
                  backgroundColor: CB.canvas,
                  borderColor: CB.sienna,
                  boxShadow: `6px 6px 0px ${CB.sienna}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-sm border-2 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: CB.terra, color: CB.canvas, borderColor: CB.sienna }}
                  >
                    Rule 3
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: CB.sienna }}>
                    Geometric Fragmentation
                  </span>
                </div>
                <p
                  className="font-mono text-xs mb-6 leading-relaxed"
                  style={{ color: `${CB.sienna}70` }}
                >
                  skew() / rotate() / clip-path / z-index overlap
                  <br />
                  Multiple planes. Multiple angles. One surface.
                </p>

                {/* Interactive: toggle fragment layers */}
                <div className="space-y-5">
                  <div className="flex gap-3 mb-4">
                    {[1, 2, 3].map((layer) => (
                      <button
                        key={layer}
                        onClick={() => setFragmentLayer(layer)}
                        className="flex-1 py-2.5 rounded-sm border-2 text-xs font-bold uppercase tracking-wider transition-[background-color,color] duration-150"
                        style={{
                          backgroundColor: fragmentLayer >= layer ? CB.terra : "transparent",
                          color: fragmentLayer >= layer ? CB.canvas : CB.terra,
                          borderColor: CB.terra,
                        }}
                      >
                        {layer === 1 ? "Base" : layer === 2 ? "+ Overlay" : "+ Accent"}
                      </button>
                    ))}
                  </div>

                  {/* Fragment canvas */}
                  <div
                    className="relative border-2 rounded-sm overflow-hidden cursor-pointer transition-[box-shadow] duration-150"
                    style={{
                      backgroundColor: CB.canvas,
                      borderColor: CB.sienna,
                      height: "180px",
                    }}
                    onMouseEnter={() => setFragmentHovered(true)}
                    onMouseLeave={() => setFragmentHovered(false)}
                  >
                    {/* Layer 1: Base geometric plane */}
                    <div
                      className="absolute transition-transform duration-200"
                      style={{
                        top: "10%",
                        left: "5%",
                        width: "60%",
                        height: "65%",
                        backgroundColor: `${CB.sienna}18`,
                        border: `2px solid ${CB.sienna}40`,
                        transform: `rotate(-4deg) skewX(-8deg) ${fragmentHovered ? "translate(-3px,-3px)" : ""}`,
                      }}
                    />

                    {/* Layer 2: Overlay plane */}
                    {fragmentLayer >= 2 && (
                      <div
                        className="absolute transition-transform duration-200"
                        style={{
                          top: "20%",
                          left: "30%",
                          width: "55%",
                          height: "60%",
                          backgroundColor: `${CB.steel}18`,
                          border: `2px solid ${CB.steel}50`,
                          transform: `rotate(6deg) skewX(5deg) ${fragmentHovered ? "translate(3px,-2px)" : ""}`,
                        }}
                      />
                    )}

                    {/* Layer 3: Accent plane */}
                    {fragmentLayer >= 3 && (
                      <div
                        className="absolute transition-transform duration-200"
                        style={{
                          bottom: "8%",
                          left: "20%",
                          width: "45%",
                          height: "45%",
                          backgroundColor: `${CB.terra}15`,
                          border: `2px solid ${CB.terra}50`,
                          transform: `rotate(-2deg) skewY(4deg) ${fragmentHovered ? "translate(-1px,3px)" : ""}`,
                        }}
                      />
                    )}

                    {/* Center label */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm border"
                        style={{
                          backgroundColor: `${CB.canvas}cc`,
                          color: CB.sienna,
                          borderColor: CB.sienna,
                        }}
                      >
                        {fragmentLayer === 1 ? "1 plane" : fragmentLayer === 2 ? "2 overlapping planes" : "3-plane cubist fragment"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: `${CB.sienna}60` }}>
                    Hover fragment to see planes shift independently
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 4: Strict Animation Timing ---- */}
            <RevealBlock delay={0.2}>
              <div
                className="border-2 p-8 rounded-sm h-full"
                style={{
                  backgroundColor: CB.canvas,
                  borderColor: CB.sienna,
                  boxShadow: `6px 6px 0px ${CB.sienna}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-sm border-2 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: CB.khaki, color: CB.canvas, borderColor: CB.sienna }}
                  >
                    Rule 4
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: CB.sienna }}>
                    Animation Timing
                  </span>
                </div>
                <p
                  className="font-mono text-xs mb-6 leading-relaxed"
                  style={{ color: `${CB.sienna}70` }}
                >
                  duration: 100–200ms only.
                  <br />
                  No spring bounce. No slow fade. Hard stop.
                </p>

                {/* Toggle timing mode */}
                <div className="space-y-5">
                  <div className="flex gap-3">
                    {(["cubism", "slow"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setTimingMode(mode)}
                        className="flex-1 py-2.5 rounded-sm border-2 text-xs font-bold uppercase tracking-wider transition-[background-color,color] duration-150"
                        style={{
                          backgroundColor: timingMode === mode ? CB.khaki : "transparent",
                          color: timingMode === mode ? CB.canvas : CB.khaki,
                          borderColor: CB.khaki,
                        }}
                      >
                        {mode === "cubism" ? "Cubism (150ms)" : "Too Slow (500ms)"}
                      </button>
                    ))}
                  </div>

                  {/* Animation demo target */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${CB.sienna}60` }}>
                      Hover the element below
                    </p>
                    <div
                      className="border-2 rounded-sm p-5 cursor-pointer"
                      style={{
                        borderColor: CB.khaki,
                        backgroundColor: CB.canvas,
                        transition: `transform ${timingMode === "cubism" ? "150ms" : "500ms"} ease-out, box-shadow ${timingMode === "cubism" ? "150ms" : "500ms"} ease-out, border-color ${timingMode === "cubism" ? "150ms" : "500ms"} ease-out`,
                        boxShadow: `4px 4px 0px ${CB.khaki}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px) rotate(-1deg)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${CB.terra}`;
                        (e.currentTarget as HTMLElement).style.borderColor = CB.terra;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.khaki}`;
                        (e.currentTarget as HTMLElement).style.borderColor = CB.khaki;
                      }}
                    >
                      <p className="text-sm font-bold uppercase tracking-widest" style={{ color: CB.sienna }}>
                        {timingMode === "cubism" ? "Cubism response: crisp 150ms" : "Slow response: 500ms — feels wrong for cubism"}
                      </p>
                    </div>
                  </div>

                  {/* Slide bar comparison */}
                  <div className="space-y-4 mt-2">
                    {[
                      { label: "Cubism (correct)", ms: 150, color: CB.sienna },
                      { label: "Slow fade (forbidden)", ms: 500, color: `${CB.sienna}40` },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: CB.sienna }}>
                            {row.label}
                          </span>
                          <button
                            className="text-xs px-3 py-1 rounded-sm border font-bold uppercase tracking-wider transition-[background-color] duration-150"
                            style={{ borderColor: row.color, color: row.color }}
                            onClick={() => {
                              setAnimTriggered((p) => !p);
                            }}
                          >
                            Go
                          </button>
                        </div>
                        <div
                          className="relative h-8 rounded-sm border-2 overflow-hidden"
                          style={{ borderColor: `${CB.sienna}30` }}
                        >
                          <div
                            className="absolute top-1 bottom-1 left-1 w-7 rounded-sm border-2"
                            style={{
                              backgroundColor: row.color,
                              borderColor: CB.sienna,
                              transform: animTriggered ? "translateX(200px)" : "translateX(0)",
                              transition: animTriggered
                                ? `transform ${row.ms}ms ease-out`
                                : `transform ${row.ms}ms ease-out`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: `${CB.sienna}50` }}>
                      Click Go on both rows to compare timing feel
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. GALLERY — Art pieces in cubism grid                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: CB.sienna }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-3" style={{ color: CB.terra }}>
              Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none" style={{ color: CB.canvas }}>
              Asymmetric Exhibition
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <div className="flex items-center gap-4 mt-3">
              <div className="w-12 h-0.5" style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }} />
              <p className="font-bold uppercase tracking-widest text-sm" style={{ color: `${CB.canvas}70` }}>
                Asymmetric layout. Overlapping frames. Multiple perspectives coexisting.
              </p>
            </div>
          </RevealBlock>

          {/* Gallery grid — deliberately asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large feature piece */}
            <RevealBlock delay={0.08} className="md:col-span-2">
              <div
                className="group relative border-2 rounded-sm overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-150"
                style={{
                  borderColor: CB.canvas,
                  boxShadow: `8px 8px 0px ${CB.canvas}40`,
                  aspectRatio: "16/9",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px) rotate(-0.5deg)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `11px 11px 0px ${CB.khaki}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${CB.canvas}40`;
                }}
              >
                {/* Abstract cubist composition */}
                <div className="absolute inset-0" style={{ backgroundColor: CB.canvas }}>
                  <div className="absolute top-0 left-0 w-1/2 h-full" style={{ backgroundColor: `${CB.steel}15`, borderRight: `2px solid ${CB.steel}30` }} />
                  <div className="absolute top-0 right-0 w-2/5 h-3/5" style={{ backgroundColor: `${CB.terra}12`, transform: "skewY(-6deg)", borderLeft: `2px solid ${CB.terra}30` }} />
                  <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2" style={{ backgroundColor: `${CB.khaki}15`, transform: "rotate(-3deg) skewX(-8deg)", border: `2px solid ${CB.khaki}25` }} />
                  <div className="absolute top-1/3 left-1/4 w-2/5 h-1/3" style={{ backgroundColor: `${CB.sienna}08`, transform: "rotate(5deg)", border: `2px solid ${CB.sienna}20` }} />
                  {/* Diagonal slice */}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, transparent 48%, ${CB.sienna}06 48%, ${CB.sienna}06 52%, transparent 52%)` }} />
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end p-6"
                  style={{ backgroundColor: `${CB.sienna}cc` }}
                >
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-1" style={{ color: CB.canvas }}>
                      Les Demoiselles Fragment
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: `${CB.canvas}80` }}>
                      Oil on canvas, 1907 — Analytical phase
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Small stacked pieces */}
            <RevealBlock delay={0.12} className="flex flex-col gap-6">
              {[
                { title: "Cubist Still Life", year: "1912", accent: CB.terra },
                { title: "Fragmented Form", year: "1914", accent: CB.steel },
              ].map((piece) => (
                <div
                  key={piece.title}
                  className="group relative border-2 rounded-sm overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-150 flex-1"
                  style={{
                    borderColor: CB.canvas,
                    boxShadow: `6px 6px 0px ${CB.canvas}40`,
                    minHeight: "140px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px) rotate(0.5deg)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${piece.accent}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${CB.canvas}40`;
                  }}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: CB.canvas }}>
                    <div className="absolute top-0 right-0 w-3/5 h-full" style={{ backgroundColor: `${piece.accent}15`, transform: "skewX(-12deg)", borderLeft: `2px solid ${piece.accent}30` }} />
                    <div className="absolute bottom-2 left-2 w-1/3 h-2/3" style={{ backgroundColor: `${CB.khaki}12`, transform: "rotate(-6deg)", border: `1px solid ${CB.khaki}25` }} />
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end p-4"
                    style={{ backgroundColor: `${CB.sienna}dd` }}
                  >
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider" style={{ color: CB.canvas }}>{piece.title}</p>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: `${CB.canvas}70` }}>{piece.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RevealBlock>

            {/* Bottom row — 3 smaller pieces */}
            {[
              { title: "Angular Portrait", accent: CB.khaki, skew: "-3" },
              { title: "Planar Landscape", accent: CB.steel, skew: "2" },
              { title: "Synthetic Collage", accent: CB.terra, skew: "-2" },
            ].map((piece, i) => (
              <RevealBlock key={piece.title} delay={0.16 + i * 0.05}>
                <div
                  className="group relative border-2 rounded-sm overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-150"
                  style={{
                    borderColor: CB.canvas,
                    boxShadow: `5px 5px 0px ${CB.canvas}40`,
                    height: "120px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = `translate(-2px,-2px) rotate(${piece.skew}deg)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `7px 7px 0px ${piece.accent}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0) rotate(0deg)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0px ${CB.canvas}40`;
                  }}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: CB.canvas }}>
                    <div className="absolute inset-0" style={{ backgroundColor: `${piece.accent}12`, transform: `skewX(${piece.skew}deg)`, borderRight: `2px solid ${piece.accent}30` }} />
                    <div className="absolute top-2 left-2 w-8 h-8" style={{ backgroundColor: `${CB.sienna}15`, transform: "rotate(45deg)", border: `1px solid ${CB.sienna}20` }} />
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center"
                    style={{ backgroundColor: `${CB.sienna}ee` }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-center px-3" style={{ color: CB.canvas }}>{piece.title}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: CB.canvas }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-3" style={{ color: CB.terra }}>
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none" style={{ color: CB.sienna }}>
              Cubist Code of Practice
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <div className="flex items-center gap-4 mt-3">
              <div className="w-12 h-0.5" style={{ backgroundColor: CB.sienna, transform: "skewX(-12deg)" }} />
              <p className="font-bold uppercase tracking-widest text-sm" style={{ color: `${CB.sienna}70` }}>
                The philosophy distilled. Break these and you break cubism.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* Do list */}
            <RevealBlock delay={0.1}>
              <div
                className="border-2 p-8 rounded-sm h-full"
                style={{
                  borderColor: CB.steel,
                  boxShadow: `6px 6px 0px ${CB.steel}`,
                  backgroundColor: CB.canvas,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-sm border-2 flex items-center justify-center"
                    style={{ backgroundColor: CB.steel, borderColor: CB.sienna }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={CB.canvas} strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest" style={{ color: CB.steel }}>
                    Do
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use skew and rotate transforms on elements",
                    "Primary: #5c4033 and #e8dcc8 earth tones",
                    "border-2 with deep color — no thin borders",
                    "rounded-sm or rounded only — keep edges angular",
                    "Asymmetric, off-center layouts",
                    "z-index overlapping for multi-perspective depth",
                    "font-bold uppercase tracking-widest",
                    "clip-path or transform for fragmented visuals",
                    "Hover/active as 1-4px translate + shadow shift (150-200ms)",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-1.5 w-2 h-2 shrink-0 border"
                        style={{
                          backgroundColor: CB.steel,
                          borderColor: CB.sienna,
                          transform: "rotate(45deg)",
                        }}
                      />
                      <span className="font-bold" style={{ color: CB.sienna }}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.15}>
              <div
                className="border-2 p-8 rounded-sm h-full"
                style={{
                  borderColor: CB.terra,
                  boxShadow: `6px 6px 0px ${CB.terra}`,
                  backgroundColor: CB.canvas,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-sm border-2 flex items-center justify-center"
                    style={{ backgroundColor: CB.terra, borderColor: CB.sienna }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={CB.canvas} strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest" style={{ color: CB.terra }}>
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "rounded-2xl, rounded-full — kills the angular feel",
                    "Soft gradients or blur effects",
                    "Neon colors or fluorescent accents",
                    "Symmetric centered traditional layouts",
                    "Circular or organic curve shapes",
                    "Thin borders (border without -2 or heavier)",
                    "Soft box-shadows with blur radius",
                    "Spring bounce, floating loops, hover:scale-110",
                    "Slow fade animations over 200ms",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-1.5 w-2 h-2 shrink-0"
                        style={{
                          backgroundColor: CB.terra,
                          transform: "rotate(45deg)",
                        }}
                      />
                      <span className="font-bold" style={{ color: CB.sienna }}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy quote block */}
          <RevealBlock delay={0.2}>
            <div
              className="border-2 p-8 md:p-12 rounded-sm relative overflow-hidden"
              style={{
                borderColor: CB.sienna,
                backgroundColor: CB.sienna,
                boxShadow: `8px 8px 0px ${CB.khaki}`,
              }}
            >
              {/* Background geometry */}
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ backgroundColor: `${CB.canvas}06`, transform: "rotate(20deg) skewX(-10deg)" }} />
              <div className="absolute bottom-0 left-0 w-36 h-36 pointer-events-none" style={{ backgroundColor: `${CB.terra}15`, transform: "rotate(-15deg) skewY(5deg)" }} />

              <div className="relative z-10">
                <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }} />
                <p
                  className="text-lg md:text-xl font-bold uppercase tracking-wider leading-relaxed mb-6 max-w-3xl"
                  style={{ color: CB.canvas }}
                >
                  &ldquo;Cubism is not a reality you can take in your hand. It&apos;s more like a perfume — in front of you, behind you, to the sides. The scent is everywhere but you don&apos;t quite know where it comes from.&rdquo;
                </p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: CB.terra }}>
                  Pablo Picasso
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                         */}
      {/* ================================================================ */}
      <footer
        className="relative border-t-2 overflow-hidden"
        style={{
          backgroundColor: CB.sienna,
          borderColor: CB.khaki,
        }}
      >
        {/* Geometric decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none" style={{ backgroundColor: `${CB.canvas}04`, transform: "rotate(15deg) skewX(-8deg)", borderRight: `2px solid ${CB.canvas}10` }} />
        <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none" style={{ backgroundColor: `${CB.terra}15`, transform: "rotate(-12deg) skewY(5deg)" }} />
        <div className="absolute top-12 right-1/4 w-20 h-40 pointer-events-none" style={{ backgroundColor: `${CB.steel}10`, transform: "rotate(30deg) skewX(6deg)", border: `1px solid ${CB.canvas}08` }} />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3">
                <div
                  className="px-4 py-2 border-2 rounded-sm"
                  style={{
                    backgroundColor: CB.terra,
                    borderColor: CB.khaki,
                    transform: "skewX(-4deg)",
                    boxShadow: `3px 3px 0px ${CB.khaki}`,
                  }}
                >
                  <span
                    className="font-bold uppercase tracking-widest text-sm"
                    style={{ color: CB.canvas, display: "inline-block", transform: "skewX(4deg)" }}
                  >
                    Cubism
                  </span>
                </div>
                <span className="text-xl font-bold uppercase tracking-tight" style={{ color: CB.canvas }}>
                  立体主义
                </span>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider leading-relaxed" style={{ color: `${CB.canvas}70` }}>
                Revolutionary visual language. Geometric fragmentation. Multiple perspectives. Earth tones.
              </p>
              {/* Color chips */}
              <div className="flex gap-2">
                {Object.values(CB).map((hex, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-sm border-2 transition-[transform,box-shadow] duration-150 cursor-default"
                    style={{
                      backgroundColor: hex,
                      borderColor: `${CB.canvas}40`,
                      transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) scale(1.2)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.canvas}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = `rotate(${i % 2 === 0 ? -3 : 3}deg)`;
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: `${CB.canvas}60` }}>
                  Style
                </span>
                <Link href="/styles/cubism" className="font-bold uppercase tracking-wider transition-colors duration-150" style={{ color: `${CB.canvas}80` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = CB.canvas; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${CB.canvas}80`; }}
                >
                  Documentation
                </Link>
                <Link href="/styles/cubism/showcase" className="font-bold uppercase tracking-wider transition-colors duration-150" style={{ color: `${CB.canvas}80` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = CB.canvas; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${CB.canvas}80`; }}
                >
                  Showcase
                </Link>
                <Link href="/styles/cubism/cover" className="font-bold uppercase tracking-wider transition-colors duration-150" style={{ color: `${CB.canvas}80` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = CB.canvas; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${CB.canvas}80`; }}
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: `${CB.canvas}60` }}>
                  StyleKit
                </span>
                <Link href="/" className="font-bold uppercase tracking-wider transition-colors duration-150" style={{ color: `${CB.canvas}80` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = CB.canvas; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${CB.canvas}80`; }}
                >
                  Home
                </Link>
                <Link href="/styles" className="font-bold uppercase tracking-wider transition-colors duration-150" style={{ color: `${CB.canvas}80` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = CB.canvas; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${CB.canvas}80`; }}
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: `${CB.canvas}60` }}>
                  Palette
                </span>
                {palette.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs" style={{ color: `${CB.canvas}80` }}>
                    <span
                      className="w-4 h-4 rounded-sm border inline-block"
                      style={{
                        backgroundColor: s.hex,
                        borderColor: `${CB.canvas}40`,
                        transform: "rotate(-3deg)",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-0.5 mb-8" style={{ backgroundColor: `${CB.canvas}20` }} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider" style={{ color: `${CB.canvas}60` }}>
              <span>Built for StyleKit</span>
              <div className="w-8 h-0.5" style={{ backgroundColor: CB.terra, transform: "skewX(-12deg)" }} />
              <span>Cubism Design System</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-sm border-2 font-bold uppercase tracking-widest text-sm transition-[transform,box-shadow] duration-150"
              style={{
                backgroundColor: CB.terra,
                color: CB.canvas,
                borderColor: CB.khaki,
                boxShadow: `4px 4px 0px ${CB.khaki}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px ${CB.khaki}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${CB.khaki}`;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(4px,4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
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
