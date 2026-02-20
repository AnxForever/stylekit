"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView hook                                                      */
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

/* ------------------------------------------------------------------ */
/*  RevealBlock                                                         */
/* ------------------------------------------------------------------ */

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
/*  SVG motifs                                                          */
/* ------------------------------------------------------------------ */

function SovietStar({ size = 40, color = "#cc0000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon
        points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
        fill={color}
      />
    </svg>
  );
}

function ArrowRight({ size = 32, color = "#cc0000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <polygon points="0,20 60,20 60,0 100,50 60,100 60,80 0,80" />
    </svg>
  );
}

function DiagonalStripe({ color = "#cc0000" }: { color?: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <polygon points="0,0 45,0 100,100 55,100" fill={color} />
    </svg>
  );
}

function GeometricAccent() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect x="0" y="0" width="80" height="80" fill="#cc0000" />
      <rect x="40" y="40" width="80" height="80" fill="#1a1a1a" opacity="0.9" />
      <rect x="20" y="20" width="40" height="40" fill="#d4a843" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const colorPalette = [
  { name: "SOVIET RED", hex: "#cc0000", light: false },
  { name: "AGED PAPER", hex: "#f2e8d5", light: true },
  { name: "INK BLACK", hex: "#1a1a1a", light: false },
  { name: "PROP. GOLD", hex: "#d4a843", light: false },
  { name: "IRON BROWN", hex: "#8b4513", light: false },
];

const principles = {
  do: [
    "Red-black high contrast on aged paper backgrounds",
    "Diagonal bands and tilted elements for dynamism",
    "Ultra-bold font-black uppercase headers at 6xl+",
    "Sharp rectangular corners — geometric hard edges only",
    "Hard offset shadows like woodblock stamp prints",
    "Thick red borders — 4px minimum for authority",
    "Star and arrow SVG motifs as structural elements",
    "Stark asymmetric layouts: red column vs paper column",
    "Letter-spacing extremes for typographic aggression",
    "Stacked geometric blocks with deliberate misalignment",
  ],
  dont: [
    "Soft gradients or rounded corners — this is not bauhaus",
    "Pastel or muted colors — everything shouts its purpose",
    "Centered symmetric layouts — diagonal energy only",
    "Decorative or script fonts — type is a weapon",
    "Drop shadows with blur — only hard offsets allowed",
    "Subtle hover effects — make interactions obvious",
    "Whitespace-only composition — fill the field with form",
    "Complementary harmonies — red vs black is the palette",
  ],
};

const typeScales = [
  { label: "MANIFESTO TITLE", size: "text-7xl", weight: "font-black", tracking: "tracking-tight", sample: "FORWARD" },
  { label: "SECTION HEADER", size: "text-4xl", weight: "font-black", tracking: "tracking-wide", sample: "WORKERS UNITE" },
  { label: "SUBHEADING", size: "text-xl", weight: "font-bold", tracking: "tracking-widest", sample: "REVOLUTIONARY ART" },
  { label: "BODY UPPERCASE", size: "text-base", weight: "font-semibold", tracking: "tracking-wider", sample: "ART SERVES SOCIETY" },
  { label: "CAPTION", size: "text-xs", weight: "font-medium", tracking: "tracking-[0.3em]", sample: "AVANT GARDE 1920" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [componentTab, setComponentTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f2e8d5] text-[#1a1a1a] overflow-x-hidden">

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                  */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b-4 border-[#cc0000]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center">
                <SovietStar size={28} color="#cc0000" />
              </div>
              <span className="font-black text-sm uppercase tracking-[0.25em] text-[#f2e8d5]">
                Constructivism
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <span className="hidden md:block text-xs uppercase tracking-widest text-[#cc0000] font-bold">
                Russian Avant-Garde 1920s
              </span>
              <Link
                href="/"
                className="text-xs font-black uppercase tracking-widest text-[#f2e8d5] hover:text-[#cc0000] transition-colors duration-150 flex items-center gap-2"
              >
                StyleKit
                <ArrowRight size={12} color="currentColor" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO — Propaganda poster layout                            */}
      {/* ============================================================ */}
      <section className="pt-14 min-h-screen relative overflow-hidden">
        {/* Background structure */}
        <div className="absolute inset-0 bg-[#f2e8d5]" />

        {/* Full-height split: aged paper left / red right via diagonal */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#cc0000]" />
          {/* Diagonal cut */}
          <div
            className="absolute top-0 h-full"
            style={{
              left: "35%",
              width: "20%",
              background: "linear-gradient(105deg, #f2e8d5 50%, #cc0000 50%)",
            }}
          />
        </div>

        {/* Diagonal red band overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div
            className="absolute bg-[#1a1a1a]"
            style={{
              top: "55%",
              left: "-10%",
              width: "120%",
              height: "8px",
              transform: "rotate(-6deg)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[80vh]">

            {/* Left: Typography + manifesto */}
            <div className="relative pr-0 md:pr-16">
              {/* Star decoration */}
              <div
                className="mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "rotate(0deg) scale(1)" : "rotate(-30deg) scale(0.5)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <SovietStar size={52} color="#cc0000" />
              </div>

              {/* Massive headline */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateX(0) skewX(0deg)" : "translateX(-60px) skewX(-3deg)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                <h1 className="font-black uppercase leading-none text-[#1a1a1a]">
                  <span className="block text-7xl md:text-9xl tracking-tight">
                    构成
                  </span>
                  <span
                    className="block text-5xl md:text-7xl tracking-widest mt-1"
                    style={{ color: "#cc0000" }}
                  >
                    CONSTRUCTIVISM
                  </span>
                </h1>
              </div>

              {/* Divider bar */}
              <div
                className="my-6 h-2 bg-[#1a1a1a]"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "opacity 0.5s 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                  width: "80%",
                }}
              />

              {/* Tagline */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s 0.45s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s",
                }}
              >
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#1a1a1a] max-w-sm leading-relaxed">
                  Russian avant-garde 1920s. Art serves society. Bold geometric propaganda posters. Every element shouts its purpose.
                </p>
              </div>

              {/* Arrow motif row */}
              <div
                className="flex items-center gap-3 mt-8"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transition: "opacity 0.6s 0.6s",
                }}
              >
                <ArrowRight size={28} color="#cc0000" />
                <ArrowRight size={20} color="#1a1a1a" />
                <ArrowRight size={14} color="#d4a843" />
                <span className="font-black uppercase tracking-widest text-xs text-[#8b4513] ml-2">
                  Forward to the future
                </span>
              </div>
            </div>

            {/* Right: Propaganda poster card */}
            <div
              className="relative flex justify-center md:justify-end mt-12 md:mt-0"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "rotate(0deg)" : "rotate(8deg) scale(0.9)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              {/* Poster frame */}
              <div
                className="relative bg-[#cc0000] border-4 border-[#1a1a1a]"
                style={{
                  width: 280,
                  height: 380,
                  boxShadow: "8px 8px 0 #1a1a1a",
                  transform: "rotate(-2deg)",
                }}
              >
                {/* Poster content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Top stars row */}
                  <div className="flex items-center gap-2">
                    <SovietStar size={20} color="#f2e8d5" />
                    <div className="flex-1 h-0.5 bg-[#f2e8d5] opacity-60" />
                    <SovietStar size={20} color="#d4a843" />
                  </div>

                  {/* Big typography */}
                  <div className="text-center">
                    <div className="font-black text-6xl uppercase text-[#f2e8d5] leading-none tracking-tight mb-2">
                      АРТ
                    </div>
                    <div className="h-1 bg-[#f2e8d5] mb-2" />
                    <div className="font-black text-2xl uppercase text-[#d4a843] tracking-widest">
                      SERVES
                    </div>
                    <div className="font-black text-4xl uppercase text-[#f2e8d5] leading-none mt-1 tracking-tight">
                      SOCIETY
                    </div>
                  </div>

                  {/* Geometric block */}
                  <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-30" style={{ transform: "skewX(-8deg) translateX(-10px)" }} />
                    <div className="relative px-3 py-2 border-2 border-[#f2e8d5]">
                      <div className="text-center">
                        <span className="font-black text-xs uppercase tracking-[0.3em] text-[#f2e8d5]">
                          1920 — AVANT GARDE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom arrow */}
                  <div className="flex items-center justify-center">
                    <ArrowRight size={36} color="#f2e8d5" />
                  </div>
                </div>
              </div>

              {/* Shadow stack effect */}
              <div
                className="absolute bg-[#8b4513] border-4 border-[#1a1a1a]"
                style={{
                  width: 280,
                  height: 380,
                  top: 12,
                  left: 12,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom geometric bar */}
        <div className="relative z-10 h-4 bg-[#1a1a1a]" />
        <div className="relative z-10 h-2 bg-[#cc0000]" />
        <div className="relative z-10 h-1 bg-[#d4a843]" />
      </section>

      {/* ============================================================ */}
      {/* 3. COMPONENT DEMOS — Tab switcher                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2e8d5]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <SovietStar size={36} color="#cc0000" />
                <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a]">
                  Components
                </h2>
              </div>
              <div className="h-1 bg-[#cc0000] w-48" />
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.05}>
            <div className="flex items-stretch gap-0 mb-12 border-4 border-[#1a1a1a] w-fit" style={{ boxShadow: "4px 4px 0 #1a1a1a" }}>
              {(["Buttons", "Cards", "Inputs"] as const).map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setComponentTab(tab)}
                  className={`px-6 py-3 font-black uppercase tracking-widest text-sm transition-all duration-150 ${
                    i > 0 ? "border-l-4 border-[#1a1a1a]" : ""
                  } ${
                    componentTab === tab
                      ? "bg-[#cc0000] text-[#f2e8d5]"
                      : "bg-[#f2e8d5] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f2e8d5]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons panel */}
          {componentTab === "Buttons" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary red fill */}
                <div className="border-4 border-[#1a1a1a] bg-[#f2e8d5] p-8" style={{ boxShadow: "6px 6px 0 #1a1a1a" }}>
                  <div className="text-xs font-black uppercase tracking-widest text-[#8b4513] mb-6">
                    Primary — Soviet Red Fill
                  </div>
                  <div className="space-y-4">
                    <button
                      type="button"
                      className="group w-full font-black uppercase tracking-widest text-sm text-[#f2e8d5] bg-[#cc0000] border-4 border-[#1a1a1a] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #1a1a1a";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #1a1a1a";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                      }}
                    >
                      <span className="flex items-center justify-center gap-3">
                        <ArrowRight size={16} color="#f2e8d5" />
                        Forward March
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#f2e8d5] bg-[#1a1a1a] border-4 border-[#cc0000] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #cc0000" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #cc0000";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #cc0000";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                      }}
                    >
                      <span className="flex items-center justify-center gap-3">
                        <SovietStar size={16} color="#cc0000" />
                        Agitate Now
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#1a1a1a] bg-[#d4a843] border-4 border-[#1a1a1a] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #8b4513" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #8b4513";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #8b4513";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                      }}
                    >
                      Propaganda Gold
                    </button>
                  </div>
                </div>

                {/* Outline variants */}
                <div className="border-4 border-[#cc0000] bg-[#1a1a1a] p-8" style={{ boxShadow: "6px 6px 0 #cc0000" }}>
                  <div className="text-xs font-black uppercase tracking-widest text-[#d4a843] mb-6">
                    Outline — Black Paper Variant
                  </div>
                  <div className="space-y-4">
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#cc0000] bg-transparent border-4 border-[#cc0000] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #cc0000" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#cc0000";
                        (e.currentTarget as HTMLButtonElement).style.color = "#f2e8d5";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #cc0000";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#cc0000";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #cc0000";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                      }}
                    >
                      Red Outline
                    </button>
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#f2e8d5] bg-transparent border-4 border-[#f2e8d5] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #f2e8d5" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f2e8d5";
                        (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #f2e8d5";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#f2e8d5";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #f2e8d5";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                      }}
                    >
                      Paper Outline
                    </button>
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#d4a843] bg-transparent border-4 border-[#d4a843] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #d4a843" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4a843";
                        (e.currentTarget as HTMLButtonElement).style.color = "#1a1a1a";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #d4a843";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#d4a843";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #d4a843";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                      }}
                    >
                      Gold Outline
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards panel */}
          {componentTab === "Cards" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Red card */}
                <div
                  className="group relative bg-[#cc0000] border-4 border-[#1a1a1a] p-6 transition-all duration-150 cursor-pointer"
                  style={{ boxShadow: "6px 6px 0 #1a1a1a" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #1a1a1a";
                    (e.currentTarget as HTMLDivElement).style.transform = "translate(3px, 3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #1a1a1a";
                    (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0)";
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <SovietStar size={32} color="#f2e8d5" />
                    <div className="text-right">
                      <div className="font-black text-xs uppercase tracking-widest text-[#f2e8d5] opacity-70">
                        Sector
                      </div>
                      <div className="font-black text-2xl text-[#f2e8d5]">01</div>
                    </div>
                  </div>
                  <div className="h-0.5 bg-[#f2e8d5] opacity-40 mb-4" />
                  <h3 className="font-black text-xl uppercase tracking-wide text-[#f2e8d5] mb-2">
                    Workers Unite
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#f2e8d5] opacity-70 leading-relaxed">
                    The collective strength of organized labor shapes the future of all society.
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <ArrowRight size={16} color="#f2e8d5" />
                    <span className="font-black text-xs uppercase tracking-widest text-[#f2e8d5]">
                      Read Manifesto
                    </span>
                  </div>
                </div>

                {/* Black/rotated border card */}
                <div
                  className="group relative bg-[#f2e8d5] border-4 border-[#1a1a1a] p-6 transition-all duration-150 cursor-pointer"
                  style={{
                    boxShadow: "6px 6px 0 #cc0000",
                    transform: "rotate(0deg)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #cc0000";
                    (e.currentTarget as HTMLDivElement).style.transform = "rotate(-1deg) translate(3px, 3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #cc0000";
                    (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translate(0, 0)";
                  }}
                >
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-[#cc0000] border-2 border-[#1a1a1a]" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#8b4513] mb-4">
                    Industrial Progress
                  </div>
                  <h3 className="font-black text-3xl uppercase tracking-tight text-[#1a1a1a] leading-none mb-3">
                    BUILD<br />THE<br />FUTURE
                  </h3>
                  <div className="h-1 bg-[#cc0000] w-3/4 mb-4" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] opacity-70 leading-relaxed">
                    Geometric precision in service of the collective mission.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 bg-[#1a1a1a] px-3 py-2">
                    <span className="font-black text-xs uppercase tracking-widest text-[#f2e8d5]">
                      Engage
                    </span>
                    <ArrowRight size={12} color="#f2e8d5" />
                  </div>
                </div>

                {/* Gold accent card */}
                <div
                  className="group relative bg-[#1a1a1a] border-4 border-[#d4a843] p-6 transition-all duration-150 cursor-pointer"
                  style={{ boxShadow: "6px 6px 0 #d4a843" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #d4a843";
                    (e.currentTarget as HTMLDivElement).style.transform = "translate(3px, 3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #d4a843";
                    (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0)";
                  }}
                >
                  <div className="mb-4 overflow-hidden">
                    <GeometricAccent />
                  </div>
                  <h3 className="font-black text-xl uppercase tracking-wide text-[#d4a843] mb-2">
                    Avant Garde
                  </h3>
                  <div className="h-0.5 bg-[#d4a843] opacity-40 mb-3" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#f2e8d5] opacity-60 leading-relaxed">
                    Art is not decoration. Art is construction.
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <SovietStar size={16} color="#d4a843" />
                    <span className="font-black text-xs uppercase tracking-widest text-[#d4a843]">
                      1920
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Inputs panel */}
          {componentTab === "Inputs" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs on paper */}
                <div className="border-4 border-[#1a1a1a] bg-[#f2e8d5] p-8" style={{ boxShadow: "6px 6px 0 #1a1a1a" }}>
                  <div className="text-xs font-black uppercase tracking-widest text-[#8b4513] mb-6">
                    Inputs — Aged Paper Ground
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block font-black text-xs uppercase tracking-widest text-[#1a1a1a] mb-2">
                        Name of Worker
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full bg-[#f2e8d5] border-4 border-[#1a1a1a] px-4 py-3 font-bold text-sm uppercase tracking-wider text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 rounded-none outline-none focus:border-[#cc0000] transition-colors duration-150"
                        style={{ boxShadow: "3px 3px 0 #1a1a1a" }}
                      />
                    </div>
                    <div>
                      <label className="block font-black text-xs uppercase tracking-widest text-[#1a1a1a] mb-2">
                        Factory Sector
                      </label>
                      <input
                        type="text"
                        placeholder="Sector designation"
                        className="w-full bg-[#f2e8d5] border-4 border-[#cc0000] px-4 py-3 font-bold text-sm uppercase tracking-wider text-[#1a1a1a] placeholder:text-[#cc0000]/30 rounded-none outline-none focus:border-[#1a1a1a] transition-colors duration-150"
                        style={{ boxShadow: "3px 3px 0 #cc0000" }}
                      />
                    </div>
                    <div>
                      <label className="block font-black text-xs uppercase tracking-widest text-[#1a1a1a] mb-2">
                        Message to the Collective
                      </label>
                      <textarea
                        placeholder="State your manifesto..."
                        rows={3}
                        className="w-full bg-[#f2e8d5] border-4 border-[#1a1a1a] px-4 py-3 font-bold text-sm uppercase tracking-wider text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 rounded-none outline-none focus:border-[#cc0000] transition-colors duration-150 resize-none"
                        style={{ boxShadow: "3px 3px 0 #1a1a1a" }}
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#f2e8d5] bg-[#cc0000] border-4 border-[#1a1a1a] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
                    >
                      Submit Report
                    </button>
                  </div>
                </div>

                {/* Inputs on black */}
                <div className="border-4 border-[#cc0000] bg-[#1a1a1a] p-8" style={{ boxShadow: "6px 6px 0 #cc0000" }}>
                  <div className="text-xs font-black uppercase tracking-widest text-[#d4a843] mb-6">
                    Inputs — Ink Black Ground
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block font-black text-xs uppercase tracking-widest text-[#f2e8d5] mb-2">
                        Identification
                      </label>
                      <input
                        type="text"
                        placeholder="Worker ID"
                        className="w-full bg-[#1a1a1a] border-4 border-[#f2e8d5] px-4 py-3 font-bold text-sm uppercase tracking-wider text-[#f2e8d5] placeholder:text-[#f2e8d5]/30 rounded-none outline-none focus:border-[#cc0000] transition-colors duration-150"
                        style={{ boxShadow: "3px 3px 0 #f2e8d5" }}
                      />
                    </div>
                    <div>
                      <label className="block font-black text-xs uppercase tracking-widest text-[#f2e8d5] mb-2">
                        Division
                      </label>
                      <input
                        type="text"
                        placeholder="Collective division"
                        className="w-full bg-[#1a1a1a] border-4 border-[#cc0000] px-4 py-3 font-bold text-sm uppercase tracking-wider text-[#f2e8d5] placeholder:text-[#cc0000]/40 rounded-none outline-none focus:border-[#d4a843] transition-colors duration-150"
                        style={{ boxShadow: "3px 3px 0 #cc0000" }}
                      />
                    </div>
                    <div>
                      <label className="block font-black text-xs uppercase tracking-widest text-[#f2e8d5] mb-2">
                        Directive
                      </label>
                      <textarea
                        placeholder="Issue directive..."
                        rows={3}
                        className="w-full bg-[#1a1a1a] border-4 border-[#d4a843] px-4 py-3 font-bold text-sm uppercase tracking-wider text-[#f2e8d5] placeholder:text-[#d4a843]/30 rounded-none outline-none focus:border-[#cc0000] transition-colors duration-150 resize-none"
                        style={{ boxShadow: "3px 3px 0 #d4a843" }}
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full font-black uppercase tracking-widest text-sm text-[#1a1a1a] bg-[#d4a843] border-4 border-[#d4a843] px-6 py-4 rounded-none transition-all duration-150"
                      style={{ boxShadow: "4px 4px 0 #d4a843" }}
                    >
                      Transmit
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COLOR PALETTE                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-2 bg-[#cc0000]" />
                <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#f2e8d5]">
                  Color Palette
                </h2>
              </div>
              <p className="font-bold uppercase tracking-widest text-xs text-[#f2e8d5] opacity-40 ml-6">
                Five tokens. No compromise. No pastels.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 border-4 border-[#f2e8d5]" style={{ boxShadow: "6px 6px 0 #cc0000" }}>
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div
                  className="group relative flex flex-col justify-end cursor-pointer transition-all duration-150"
                  style={{
                    backgroundColor: color.hex,
                    height: 200,
                    borderRight: i < colorPalette.length - 1 ? "4px solid #1a1a1a" : undefined,
                  }}
                >
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-150 bg-white"
                  />
                  {/* Geometric accent on hover */}
                  <div
                    className="absolute top-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-150 border-2"
                    style={{
                      borderColor: color.light ? "#1a1a1a" : "#f2e8d5",
                    }}
                  />
                  {/* Content */}
                  <div
                    className="p-4 border-t-4"
                    style={{
                      borderColor: color.light ? "#1a1a1a" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="font-black text-[10px] uppercase tracking-widest mb-1"
                      style={{ color: color.light ? "#1a1a1a" : "#f2e8d5" }}
                    >
                      {color.name}
                    </div>
                    <div
                      className="font-mono text-xs font-bold"
                      style={{ color: color.light ? "#1a1a1a80" : "#f2e8d580" }}
                    >
                      {color.hex}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage grid */}
          <RevealBlock delay={0.15}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { role: "Primary Action", color: "#cc0000", name: "Soviet Red", usage: "Buttons, stars, borders, emphasis" },
                { role: "Primary Surface", color: "#f2e8d5", name: "Aged Paper", usage: "Background, paper ground, light text areas" },
                { role: "Typography", color: "#1a1a1a", name: "Ink Black", usage: "All body text, outlines, hard shadows" },
              ].map((item) => (
                <div
                  key={item.role}
                  className="border-4 border-[#f2e8d5] p-4 flex items-start gap-4"
                  style={{ boxShadow: "4px 4px 0 #cc0000" }}
                >
                  <div className="w-12 h-12 border-4 border-[#f2e8d5] shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-black text-xs uppercase tracking-widest text-[#d4a843] mb-1">{item.role}</div>
                    <div className="font-black text-sm uppercase text-[#f2e8d5] mb-1">{item.name}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#f2e8d5] opacity-50">{item.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TYPOGRAPHY                                                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2e8d5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <SovietStar size={36} color="#1a1a1a" />
                <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a]">
                  Typography
                </h2>
              </div>
              <div className="h-1 bg-[#1a1a1a] w-48 ml-12" />
            </div>
          </RevealBlock>

          {/* Type scale showcase */}
          <div className="space-y-0 border-4 border-[#1a1a1a] overflow-hidden" style={{ boxShadow: "6px 6px 0 #cc0000" }}>
            {typeScales.map((scale, i) => (
              <RevealBlock key={scale.label} delay={i * 0.07}>
                <div
                  className={`group flex items-center gap-6 px-6 py-5 transition-all duration-150 cursor-default ${
                    i % 2 === 0 ? "bg-[#f2e8d5]" : "bg-[#1a1a1a]"
                  } ${i > 0 ? "border-t-4 border-[#1a1a1a]" : ""}`}
                >
                  {/* Label */}
                  <div className="w-36 shrink-0">
                    <div
                      className={`font-black text-[10px] uppercase tracking-widest ${
                        i % 2 === 0 ? "text-[#8b4513]" : "text-[#d4a843]"
                      }`}
                    >
                      {scale.label}
                    </div>
                    <div
                      className={`font-mono text-[9px] ${
                        i % 2 === 0 ? "text-[#1a1a1a]/40" : "text-[#f2e8d5]/40"
                      }`}
                    >
                      {scale.size} / {scale.weight}
                    </div>
                  </div>
                  {/* Sample text */}
                  <div
                    className={`${scale.size} ${scale.weight} ${scale.tracking} leading-none transition-colors duration-150 ${
                      i % 2 === 0
                        ? "text-[#1a1a1a] group-hover:text-[#cc0000]"
                        : "text-[#f2e8d5] group-hover:text-[#cc0000]"
                    }`}
                  >
                    {scale.sample}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Letter spacing extremes */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tight tracking */}
              <div className="border-4 border-[#cc0000] bg-[#cc0000] p-6" style={{ boxShadow: "6px 6px 0 #1a1a1a" }}>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-[#f2e8d5] opacity-60 mb-3">
                  Tight — Tracking Tight
                </div>
                <div className="font-black text-5xl md:text-6xl uppercase tracking-tight text-[#f2e8d5] leading-none">
                  MANIFESTO
                </div>
                <div className="mt-3 text-xs font-mono text-[#f2e8d5] opacity-50">
                  tracking-tight / -0.025em
                </div>
              </div>
              {/* Wide tracking */}
              <div className="border-4 border-[#1a1a1a] bg-[#f2e8d5] p-6" style={{ boxShadow: "6px 6px 0 #cc0000" }}>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-[#8b4513] mb-3">
                  Wide — Tracking Widest
                </div>
                <div className="font-black text-2xl md:text-3xl uppercase tracking-[0.3em] text-[#1a1a1a] leading-tight">
                  REVOLUTION
                </div>
                <div className="mt-3 text-xs font-mono text-[#1a1a1a] opacity-40">
                  tracking-[0.3em] / extreme wide
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Diagonal headline demonstration */}
          <RevealBlock delay={0.25}>
            <div className="mt-10 border-4 border-[#1a1a1a] bg-[#1a1a1a] p-8 relative overflow-hidden" style={{ boxShadow: "6px 6px 0 #cc0000", minHeight: 160 }}>
              <div className="text-xs font-black uppercase tracking-widest text-[#d4a843] mb-4">
                Diagonal Energy — Rotate & Skew
              </div>
              <div
                className="font-black text-4xl md:text-5xl uppercase text-[#cc0000] leading-none"
                style={{ transform: "rotate(-3deg) skewX(-2deg)", display: "inline-block" }}
              >
                ART SERVES
              </div>
              <div
                className="font-black text-4xl md:text-5xl uppercase text-[#f2e8d5] leading-none ml-8"
                style={{ transform: "rotate(2deg) skewX(1deg)", display: "inline-block" }}
              >
                SOCIETY
              </div>
              {/* Background geometric shapes */}
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <GeometricAccent />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. DESIGN PRINCIPLES — Do / Don't propaganda panels           */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#cc0000]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1">
                  <SovietStar size={28} color="#f2e8d5" />
                  <SovietStar size={28} color="#d4a843" />
                  <SovietStar size={28} color="#f2e8d5" />
                </div>
                <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#f2e8d5]">
                  Principles
                </h2>
              </div>
              <div className="h-1 bg-[#1a1a1a] w-56 ml-24" />
              <p className="font-bold uppercase tracking-[0.2em] text-xs text-[#f2e8d5] opacity-60 mt-3 ml-24">
                Constructivist discipline enforced. No exceptions.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO panel */}
            <RevealBlock>
              <div className="border-4 border-[#f2e8d5] bg-[#f2e8d5] overflow-hidden" style={{ boxShadow: "8px 8px 0 #1a1a1a" }}>
                {/* Header */}
                <div className="bg-[#1a1a1a] px-6 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#f2e8d5] border-4 border-[#f2e8d5] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="square">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-widest text-[#f2e8d5]">
                    DO
                  </h3>
                  <div className="ml-auto">
                    <ArrowRight size={24} color="#cc0000" />
                  </div>
                </div>
                {/* Rules */}
                <div className="p-6 space-y-0">
                  {principles.do.map((rule, i) => (
                    <div
                      key={rule}
                      className={`flex items-start gap-4 py-3 ${
                        i < principles.do.length - 1 ? "border-b-2 border-[#1a1a1a]/10" : ""
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        <SovietStar size={14} color="#cc0000" />
                      </div>
                      <span className="font-bold text-sm uppercase tracking-wider text-[#1a1a1a] leading-tight">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.1}>
              <div className="border-4 border-[#1a1a1a] bg-[#1a1a1a] overflow-hidden" style={{ boxShadow: "8px 8px 0 #f2e8d5" }}>
                {/* Header */}
                <div className="bg-[#cc0000] px-6 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#1a1a1a] border-4 border-[#1a1a1a] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="3" strokeLinecap="square">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-widest text-[#f2e8d5]">
                    DON&apos;T
                  </h3>
                  <div className="ml-auto opacity-60">
                    <ArrowRight size={24} color="#1a1a1a" />
                  </div>
                </div>
                {/* Rules */}
                <div className="p-6 space-y-0">
                  {principles.dont.map((rule, i) => (
                    <div
                      key={rule}
                      className={`flex items-start gap-4 py-3 ${
                        i < principles.dont.length - 1 ? "border-b-2 border-[#f2e8d5]/10" : ""
                      }`}
                    >
                      <div className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                        <div className="w-3 h-0.5 bg-[#cc0000]" />
                      </div>
                      <span className="font-bold text-sm uppercase tracking-wider text-[#f2e8d5] opacity-80 leading-tight">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Central manifesto block */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 border-4 border-[#1a1a1a] bg-[#1a1a1a] p-8 relative overflow-hidden" style={{ boxShadow: "8px 8px 0 #f2e8d5" }}>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="flex-1 h-0.5 bg-[#f2e8d5] opacity-20" />
                  <SovietStar size={40} color="#cc0000" />
                  <div className="flex-1 h-0.5 bg-[#f2e8d5] opacity-20" />
                </div>
                <p className="font-black text-lg md:text-2xl uppercase tracking-wider text-[#f2e8d5] leading-tight max-w-2xl mx-auto">
                  &ldquo;Art is not a mirror held up to reality but a hammer with which to shape it.&rdquo;
                </p>
                <div className="mt-4 font-bold text-xs uppercase tracking-[0.3em] text-[#d4a843]">
                  Constructivist Principle — 1920
                </div>
              </div>
              {/* Background shapes */}
              <div className="absolute -left-8 -top-8 opacity-10 rotate-12">
                <GeometricAccent />
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10 -rotate-12">
                <GeometricAccent />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. VISUAL COMPOSITIONS — Diagonal & geometric demonstrations  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2e8d5]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-[#cc0000] border-4 border-[#1a1a1a]" />
                <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a]">
                  Compositions
                </h2>
              </div>
              <div className="h-1 bg-[#cc0000] w-40 ml-12" />
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Diagonal band composition */}
            <RevealBlock>
              <div
                className="relative border-4 border-[#1a1a1a] overflow-hidden"
                style={{ height: 300, boxShadow: "6px 6px 0 #1a1a1a" }}
              >
                <div className="absolute inset-0 bg-[#f2e8d5]" />
                {/* Diagonal red band */}
                <div
                  className="absolute bg-[#cc0000]"
                  style={{
                    top: -30,
                    left: -30,
                    width: "140%",
                    height: "45%",
                    transform: "rotate(-12deg)",
                    transformOrigin: "top left",
                  }}
                />
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="text-white">
                    <SovietStar size={28} color="#f2e8d5" />
                  </div>
                  <div>
                    <div className="font-black text-3xl uppercase tracking-tight text-[#1a1a1a] leading-none">
                      DIAGONAL
                    </div>
                    <div className="font-black text-xl uppercase tracking-widest text-[#cc0000] mt-1">
                      DYNAMISM
                    </div>
                    <div className="mt-2 h-0.5 bg-[#1a1a1a] w-2/3" />
                    <div className="mt-2 text-xs font-bold uppercase tracking-widest text-[#8b4513]">
                      rotate-[-12deg] band
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Geometric collision */}
            <RevealBlock delay={0.07}>
              <div
                className="relative border-4 border-[#1a1a1a] bg-[#1a1a1a] overflow-hidden"
                style={{ height: 300, boxShadow: "6px 6px 0 #cc0000" }}
              >
                {/* Overlapping rectangles */}
                <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-[#cc0000]" />
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[#d4a843]" />
                <div
                  className="absolute"
                  style={{
                    top: "25%",
                    left: "25%",
                    width: "50%",
                    height: "50%",
                    backgroundColor: "#1a1a1a",
                    border: "4px solid #f2e8d5",
                  }}
                />
                {/* Text overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-black text-2xl uppercase tracking-wider text-[#f2e8d5] leading-tight" style={{ textShadow: "2px 2px 0 #1a1a1a" }}>
                      GEOMETRIC
                    </div>
                    <div className="font-black text-lg uppercase tracking-widest text-[#f2e8d5]">
                      COLLISION
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Hard shadow stack */}
            <RevealBlock delay={0.14}>
              <div
                className="relative border-4 border-[#1a1a1a] bg-[#cc0000] overflow-visible"
                style={{ height: 300, boxShadow: "none", margin: "8px" }}
              >
                {/* Shadow layers */}
                <div
                  className="absolute bg-[#8b4513] border-4 border-[#1a1a1a]"
                  style={{
                    inset: 0,
                    transform: "translate(12px, 12px)",
                    zIndex: -2,
                  }}
                />
                <div
                  className="absolute bg-[#d4a843] border-4 border-[#1a1a1a]"
                  style={{
                    inset: 0,
                    transform: "translate(6px, 6px)",
                    zIndex: -1,
                  }}
                />
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-2">
                    <ArrowRight size={20} color="#f2e8d5" />
                    <ArrowRight size={20} color="#f2e8d5" />
                  </div>
                  <div>
                    <div className="font-black text-3xl uppercase tracking-tight text-[#f2e8d5] leading-none">
                      HARD
                    </div>
                    <div className="font-black text-3xl uppercase tracking-tight text-[#f2e8d5] leading-none">
                      OFFSET
                    </div>
                    <div className="font-black text-xl uppercase tracking-wider text-[#f2e8d5] mt-1">
                      SHADOWS
                    </div>
                    <div className="mt-3 text-xs font-bold uppercase tracking-widest text-[#f2e8d5] opacity-60">
                      Woodblock print energy
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Full-width diagonal split banner */}
          <RevealBlock delay={0.15}>
            <div
              className="mt-8 border-4 border-[#1a1a1a] relative overflow-hidden"
              style={{ height: 140, boxShadow: "6px 6px 0 #cc0000" }}
            >
              {/* Left half */}
              <div className="absolute inset-0 bg-[#1a1a1a]" />
              {/* Right half via diagonal */}
              <div
                className="absolute top-0 right-0 h-full bg-[#cc0000]"
                style={{ width: "55%", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-between px-10">
                <div className="flex items-center gap-4">
                  <SovietStar size={32} color="#cc0000" />
                  <div>
                    <div className="font-black text-lg uppercase tracking-widest text-[#f2e8d5] leading-none">
                      Full Width
                    </div>
                    <div className="font-black text-xs uppercase tracking-[0.3em] text-[#d4a843]">
                      Diagonal Split Layout
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-lg uppercase tracking-widest text-[#f2e8d5] leading-none">
                    Red vs Black
                  </div>
                  <div className="font-black text-xs uppercase tracking-[0.3em] text-[#f2e8d5] opacity-60">
                    No gradient. Hard edge.
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Tilted cards row */}
          <RevealBlock delay={0.2}>
            <div className="mt-10">
              <div className="text-xs font-black uppercase tracking-widest text-[#8b4513] mb-6">
                Tilted / Rotated Elements
              </div>
              <div className="flex flex-wrap gap-6 items-end justify-start">
                {[
                  { label: "Skew -3", transform: "skewX(-3deg)", bg: "#cc0000", text: "#f2e8d5" },
                  { label: "Rotate 2", transform: "rotate(2deg)", bg: "#1a1a1a", text: "#f2e8d5" },
                  { label: "Skew 3", transform: "skewX(3deg)", bg: "#d4a843", text: "#1a1a1a" },
                  { label: "Rotate -3", transform: "rotate(-3deg)", bg: "#8b4513", text: "#f2e8d5" },
                  { label: "Skew -6", transform: "skewX(-6deg)", bg: "#cc0000", text: "#f2e8d5" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="border-4 border-[#1a1a1a] px-5 py-4 font-black uppercase tracking-widest text-sm"
                    style={{
                      backgroundColor: item.bg,
                      color: item.text,
                      transform: item.transform,
                      boxShadow: "4px 4px 0 #1a1a1a",
                      zIndex: i,
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. STATS / PROPAGANDA NUMBERS                                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#1a1a1a] relative overflow-hidden">
        {/* Background diagonals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute bg-[#cc0000]"
              style={{
                top: `${i * 25}%`,
                left: "-10%",
                width: "120%",
                height: "4px",
                transform: `rotate(-8deg) translateY(${i * 20}px)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <RevealBlock>
            <div className="mb-12 text-center">
              <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#f2e8d5]">
                The Collective
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-0.5 w-16 bg-[#cc0000]" />
                <SovietStar size={20} color="#cc0000" />
                <div className="h-0.5 w-16 bg-[#cc0000]" />
              </div>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-[#f2e8d5]" style={{ boxShadow: "8px 8px 0 #cc0000" }}>
            {[
              { stat: "1920", label: "Year Founded", sub: "Russian Avant-Garde" },
              { stat: "5", label: "Core Colors", sub: "Red, Black, Gold, Paper, Brown" },
              { stat: "0°", label: "Rounded Corners", sub: "Sharp geometry only" },
              { stat: "4px", label: "Min Border Width", sub: "Authority demands weight" },
            ].map((item, i) => (
              <RevealBlock key={item.stat} delay={i * 0.07}>
                <div
                  className={`group p-6 md:p-8 text-center border-[#f2e8d5] transition-all duration-150 cursor-default ${
                    i > 0 ? "border-l-4" : ""
                  } ${i % 2 === 0 ? "bg-[#1a1a1a] hover:bg-[#cc0000]" : "bg-[#cc0000] hover:bg-[#1a1a1a]"}`}
                >
                  <div className="font-black text-4xl md:text-5xl uppercase text-[#f2e8d5] leading-none mb-2 transition-colors duration-150">
                    {item.stat}
                  </div>
                  <div className="font-black text-xs uppercase tracking-widest text-[#d4a843] mb-1">
                    {item.label}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#f2e8d5] opacity-50 group-hover:opacity-80 transition-opacity duration-150">
                    {item.sub}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. INTERACTIVE PROPAGANDA POSTER BUILDER                      */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#f2e8d5]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock>
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <ArrowRight size={36} color="#cc0000" />
                <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a]">
                  Poster Gallery
                </h2>
              </div>
              <div className="h-1 bg-[#1a1a1a] w-48 ml-12" />
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Poster 1 — Classic red */}
            <RevealBlock>
              <div
                className="group relative border-4 border-[#1a1a1a] bg-[#cc0000] overflow-hidden transition-all duration-150 cursor-pointer"
                style={{ height: 360, boxShadow: "6px 6px 0 #1a1a1a" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #1a1a1a";
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(3px, 3px) rotate(-1deg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #1a1a1a";
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0) rotate(0deg)";
                }}
              >
                {/* Diagonal black band */}
                <div
                  className="absolute bg-[#1a1a1a]"
                  style={{
                    top: "40%",
                    left: "-10%",
                    width: "120%",
                    height: "6px",
                    transform: "rotate(-8deg)",
                  }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <SovietStar size={32} color="#f2e8d5" />
                    <span className="font-black text-xs uppercase tracking-[0.3em] text-[#f2e8d5] opacity-60">
                      No.01
                    </span>
                  </div>
                  <div>
                    <div className="font-black text-5xl uppercase text-[#f2e8d5] leading-none tracking-tight">
                      WORKERS
                    </div>
                    <div className="font-black text-5xl uppercase text-[#1a1a1a] leading-none tracking-tight">
                      OF THE
                    </div>
                    <div className="font-black text-5xl uppercase text-[#f2e8d5] leading-none tracking-tight">
                      WORLD
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t-2 border-[#f2e8d5] pt-3">
                    <ArrowRight size={20} color="#f2e8d5" />
                    <span className="font-black text-xs uppercase tracking-widest text-[#f2e8d5]">Unite!</span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Poster 2 — Black with gold */}
            <RevealBlock delay={0.07}>
              <div
                className="group relative border-4 border-[#d4a843] bg-[#1a1a1a] overflow-hidden transition-all duration-150 cursor-pointer"
                style={{ height: 360, boxShadow: "6px 6px 0 #d4a843" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #d4a843";
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(3px, 3px) rotate(1deg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #d4a843";
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0) rotate(0deg)";
                }}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <SovietStar key={i} size={16} color="#d4a843" />
                      ))}
                    </div>
                    <div className="font-black text-5xl uppercase text-[#d4a843] leading-none tracking-tight">
                      BUILD
                    </div>
                    <div className="font-black text-5xl uppercase text-[#cc0000] leading-none tracking-tight">
                      THE
                    </div>
                    <div className="font-black text-5xl uppercase text-[#f2e8d5] leading-none tracking-tight">
                      FUTURE
                    </div>
                  </div>
                  <div>
                    <div className="h-1 bg-[#d4a843] mb-3" />
                    <span className="font-black text-xs uppercase tracking-[0.3em] text-[#d4a843]">
                      Avant-Garde 1920 — Moscow
                    </span>
                  </div>
                </div>
                {/* Geometric background shapes */}
                <div className="absolute -right-6 top-4 opacity-20">
                  <div className="w-24 h-24 border-4 border-[#d4a843]" style={{ transform: "rotate(30deg)" }} />
                </div>
              </div>
            </RevealBlock>

            {/* Poster 3 — Paper with red diagonal */}
            <RevealBlock delay={0.14}>
              <div
                className="group relative border-4 border-[#1a1a1a] bg-[#f2e8d5] overflow-hidden transition-all duration-150 cursor-pointer"
                style={{ height: 360, boxShadow: "6px 6px 0 #cc0000" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0 #cc0000";
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(3px, 3px) rotate(-0.5deg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #cc0000";
                  (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0) rotate(0deg)";
                }}
              >
                {/* Red diagonal block */}
                <div
                  className="absolute bg-[#cc0000]"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: "55%",
                    height: "65%",
                    clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div className="border-4 border-[#1a1a1a] inline-block px-3 py-1 bg-[#1a1a1a]">
                      <span className="font-black text-xs uppercase tracking-[0.3em] text-[#f2e8d5]">Manifesto</span>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="font-black text-4xl uppercase text-[#1a1a1a] leading-none tracking-tight">
                      ART
                    </div>
                    <div className="font-black text-4xl uppercase text-[#f2e8d5] leading-none tracking-tight">
                      SERVES
                    </div>
                    <div className="font-black text-4xl uppercase text-[#f2e8d5] leading-none tracking-tight">
                      SOCIETY
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <ArrowRight size={18} color="#f2e8d5" />
                      <span className="font-black text-[10px] uppercase tracking-[0.3em] text-[#f2e8d5]">
                        Rodchenko, 1923
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FOOTER                                                     */}
      {/* ============================================================ */}
      <footer className="bg-[#1a1a1a] border-t-8 border-[#cc0000]">
        {/* Top bar */}
        <div className="bg-[#cc0000] py-2 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <SovietStar key={i} size={14} color="#f2e8d5" />
              ))}
            </div>
            <span className="font-black text-[10px] uppercase tracking-[0.3em] text-[#f2e8d5] opacity-70">
              Art Serves the Collective
            </span>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <SovietStar key={i} size={14} color="#f2e8d5" />
              ))}
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SovietStar size={32} color="#cc0000" />
                <div>
                  <div className="font-black text-lg uppercase tracking-widest text-[#f2e8d5]">
                    Constructivism
                  </div>
                  <div className="font-bold text-[10px] uppercase tracking-[0.3em] text-[#d4a843]">
                    StyleKit Design System
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-[#cc0000] w-full mb-4" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#f2e8d5] opacity-50 leading-relaxed">
                Russian Avant-Garde design principles. Bold geometry. Red-black contrast. Every element declares its purpose.
              </p>
            </div>

            {/* Style tokens */}
            <div>
              <div className="font-black text-xs uppercase tracking-widest text-[#d4a843] mb-4">
                Core Tokens
              </div>
              {[
                { token: "Primary", value: "#cc0000 Soviet Red" },
                { token: "Surface", value: "#f2e8d5 Aged Paper" },
                { token: "Ink", value: "#1a1a1a Black" },
                { token: "Gold", value: "#d4a843 Propaganda" },
                { token: "Brown", value: "#8b4513 Iron" },
              ].map((item) => (
                <div key={item.token} className="flex items-center justify-between py-1.5 border-b border-[#f2e8d5]/10">
                  <span className="font-black text-xs uppercase tracking-wider text-[#f2e8d5] opacity-60">
                    {item.token}
                  </span>
                  <span className="font-mono text-xs text-[#d4a843]">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div>
              <div className="font-black text-xs uppercase tracking-widest text-[#d4a843] mb-4">
                Navigate
              </div>
              <div className="space-y-2">
                {[
                  { label: "All Styles", href: "/" },
                  { label: "Constructivism Docs", href: "/styles/constructivism" },
                  { label: "StyleKit Home", href: "/" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 group py-2 border-b border-[#f2e8d5]/10 transition-colors duration-150 hover:border-[#cc0000]"
                  >
                    <ArrowRight size={12} color="#cc0000" />
                    <span className="font-black text-xs uppercase tracking-widest text-[#f2e8d5] opacity-60 group-hover:opacity-100 transition-opacity duration-150">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t-4 border-[#cc0000] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <SovietStar size={20} color="#cc0000" />
              <span className="font-black text-xs uppercase tracking-widest text-[#f2e8d5] opacity-40">
                StyleKit &middot; Constructivism Style &middot; 1920 — Present
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#cc0000] border-2 border-[#cc0000]" />
              <div className="w-4 h-4 bg-[#f2e8d5] border-2 border-[#f2e8d5]" />
              <div className="w-4 h-4 bg-[#d4a843] border-2 border-[#d4a843]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
