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
/*  Geometric SVG helpers                                              */
/* ------------------------------------------------------------------ */

function TriangleSVG({
  size = 40,
  fill = "#ffff00",
  stroke = "#000000",
  strokeWidth = 4,
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const h = Math.round(size * 0.866);
  return (
    <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} fill="none" aria-hidden="true">
      <polygon
        points={`${size / 2},${strokeWidth} ${size - strokeWidth},${h - strokeWidth} ${strokeWidth},${h - strokeWidth}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Black", hex: "#000000", label: "Primary", darkText: false },
  { name: "White", hex: "#ffffff", label: "Background", darkText: true },
  { name: "Red", hex: "#ff0000", label: "Accent 1", darkText: false },
  { name: "Blue", hex: "#0000ff", label: "Accent 2", darkText: false },
  { name: "Yellow", hex: "#ffff00", label: "Accent 3", darkText: true },
];

const DO_RULES = [
  "Solid color blocks: bg-black, bg-white, bg-red-500, bg-blue-600",
  "Regular geometric shapes: circles, squares, triangles",
  "Oversized typography: text-6xl, text-8xl, text-[10rem]",
  "Absolute positioning for overlapping elements",
  "rounded-none OR rounded-full only — never in-between",
  "Rotation for dynamics: rotate-12, rotate-45, rotate-90",
  "Limited palette: black, white + 1-2 accent colors",
  "font-black uppercase for all headings",
];

const DONT_RULES = [
  "No gradients — ever",
  "No soft or low-contrast colors",
  "No rounded-lg or medium border-radius values",
  "No box shadows or blur effects",
  "No more than 3-4 colors per design",
  "No symmetric or conventional layouts",
  "No ease-in-out, spring, or cubic-bezier overshoot",
  "No opacity fades for interaction states",
];

const projectRows = [
  { num: "01", title: "FORM FOLLOWS FORCE", category: "Installation", color: "#ff0000" },
  { num: "02", title: "BLUE MANIFESTO", category: "Typography", color: "#0000ff" },
  { num: "03", title: "YELLOW TENSION", category: "Brand Identity", color: "#ffff00" },
  { num: "04", title: "HARD EDGE", category: "Poster Design", color: "#ffffff" },
  { num: "05", title: "CIRCLE MANIFOLD", category: "Motion", color: "#ff0000" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  // Animation rule 1: Blocky Impact
  const [blockImpactHovered, setBlockImpactHovered] = useState(false);
  const [blockImpactPressed, setBlockImpactPressed] = useState(false);

  // Animation rule 2: Shape Snapping
  const [snappedShapeIndex, setSnappedShapeIndex] = useState<number | null>(null);

  // Animation rule 3: Heavy Press
  const [heavyPressActive, setHeavyPressActive] = useState(false);

  // Animation rule 4: Linear & Fast
  const [linearBallActive, setLinearBallActive] = useState(false);
  const [springBallActive, setSpringBallActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const isPressed = (id: string) => pressedBtn === id;

  function handleBtnDown(id: string) {
    setPressedBtn(id);
  }

  function handleBtnUp() {
    setPressedBtn(null);
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <style>{`
        @keyframes geo-rotate-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes geo-rotate-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes geo-march {
          0%   { transform: translateX(0); }
          100% { transform: translateX(8px); }
        }
        .geo-rotate-cw  { animation: geo-rotate-cw  10s linear infinite; }
        .geo-rotate-ccw { animation: geo-rotate-ccw 14s linear infinite; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-red-500 border-2 border-white" />
            <span className="text-white text-sm font-black uppercase tracking-widest">
              Geo<span className="text-red-500">Bold</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center">
            {["Palette", "Components", "Animations", "Projects", "Rules"].map((item) => (
              <span
                key={item}
                className="px-4 py-3 text-xs font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-100 ease-linear"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-xs font-black uppercase tracking-widest border-4 border-white hover:bg-white hover:text-black transition-colors duration-100 ease-linear"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>

        {/* Accent color bar */}
        <div className="flex h-1">
          <div className="flex-1 bg-red-500" />
          <div className="w-20 bg-blue-600" />
          <div className="w-12 bg-yellow-300" />
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-14 min-h-screen bg-black overflow-hidden flex flex-col justify-center">
        {/* Background geometric decorations */}
        <div className="absolute top-16 right-0 w-72 h-72 bg-blue-600 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-red-500 pointer-events-none" />
        <div className="absolute top-1/2 right-20 w-40 h-40 border-8 border-yellow-300 pointer-events-none geo-rotate-cw" style={{ marginTop: "-80px" }} />
        <div className="absolute top-20 left-1/3 w-20 h-20 bg-yellow-300 rotate-45 pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-white pointer-events-none" />
        <div className="absolute bottom-28 left-12 w-28 h-28 border-4 border-red-500 rounded-full pointer-events-none geo-rotate-ccw" />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-24">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-3 bg-red-500 text-white text-xs font-black uppercase tracking-[0.3em] px-4 py-2 mb-8">
              <div className="w-2.5 h-2.5 bg-white" />
              几何大胆风 — Geometric Bold
              <div className="w-2.5 h-2.5 bg-white" />
            </span>
          </div>

          {/* Title — massive, offset, asymmetric */}
          <div className="relative mb-12">
            <h1
              className="text-[80px] md:text-[120px] lg:text-[160px] font-black uppercase leading-none tracking-tight text-white"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              GEO
            </h1>
            <h1
              className="text-[80px] md:text-[120px] lg:text-[160px] font-black uppercase leading-none tracking-tight text-red-500 ml-8 md:ml-20"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              METRIC
            </h1>
            <h1
              className="text-[80px] md:text-[120px] lg:text-[160px] font-black uppercase leading-none tracking-tight text-blue-500 ml-4 md:ml-10"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              BOLD
            </h1>
            <div
              className="absolute top-1/2 right-0 w-4 h-48 bg-yellow-300 pointer-events-none hidden md:block"
              style={{
                opacity: heroVisible ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            />
          </div>

          {/* Sub + CTA */}
          <div
            className="flex flex-col md:flex-row items-start gap-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              包豪斯与构成主义的影响。强烈的几何形状，极端的色块对比，没有渐变，没有阴影。
              纯粹的视觉冲击力。
            </p>
            <div className="flex gap-4 shrink-0">
              <button
                className="group relative px-8 py-4 bg-black text-white border-4 border-white font-black uppercase tracking-widest text-sm transition-all duration-100 ease-linear hover:bg-red-500 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1"
                style={{
                  transform: isPressed("hero-explore") ? "translate(2px,2px)" : "",
                }}
                onMouseDown={() => handleBtnDown("hero-explore")}
                onMouseUp={handleBtnUp}
                onMouseLeave={handleBtnUp}
              >
                <span className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-blue-600 transition-transform duration-100 ease-linear group-hover:translate-x-3 group-hover:translate-y-3" />
                <span className="relative">Explore</span>
              </button>
              <button className="px-8 py-4 bg-transparent text-white border-4 border-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-100 ease-linear">
                View Work
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-20 border-t-4 border-white/20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "3", label: "Accent Colors", color: "#ff0000" },
              { value: "0", label: "Gradients Used", color: "#0000ff" },
              { value: "100%", label: "Hard Edges", color: "#ffff00" },
              { value: "4", label: "Animation Rules", color: "#ff0000" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-r-4 border-white/20 last:border-r-0 pt-6 pr-6 cursor-default"
              >
                <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-red-500 block mb-4">
              — Palette
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-black">
              5 COLORS.<br />
              <span className="text-blue-600">NO MORE.</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-black/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-red-500 pl-6">
              Black and white form the foundation. Red, blue, yellow are the only permitted
              accent colors. Maximum 3-4 per design. Zero gradients, zero shadows.
            </p>
          </RevealBlock>

          {/* Full-bleed palette blocks */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-col md:flex-row gap-0 border-4 border-black mb-8">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex-1 relative cursor-pointer overflow-hidden"
                  style={{ minHeight: "200px" }}
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-100 ease-linear"
                    style={{
                      backgroundColor: swatch.hex,
                      transform: hoveredSwatch === i ? "scale(1.04)" : "scale(1)",
                      border: swatch.hex === "#ffffff" ? "none" : "none",
                    }}
                  />
                  {swatch.hex === "#ffffff" && (
                    <div className="absolute inset-0 border-2 border-black/20 pointer-events-none" />
                  )}
                  <div
                    className="relative z-10 p-6 flex flex-col justify-end"
                    style={{ minHeight: "200px" }}
                  >
                    <div
                      className="text-xs font-black uppercase tracking-[0.2em] mb-1"
                      style={{ color: swatch.darkText ? "#000" : "#fff" }}
                    >
                      {swatch.label}
                    </div>
                    <div
                      className="text-base font-black uppercase"
                      style={{ color: swatch.darkText ? "#000" : "#fff" }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className="text-xs font-mono mt-1"
                      style={{ color: swatch.darkText ? "#00000070" : "#ffffff70" }}
                    >
                      {swatch.hex}
                    </div>
                    {hoveredSwatch === i && (
                      <div
                        className="absolute top-4 right-4 w-8 h-8 border-2 transition-transform duration-100 ease-linear rotate-45"
                        style={{ borderColor: swatch.darkText ? "#000" : "#fff" }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color combos */}
          <RevealBlock delay={0.18}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { bg: "#000000", fg: "#ff0000", label: "Black + Red" },
                { bg: "#0000ff", fg: "#ffff00", label: "Blue + Yellow" },
                { bg: "#ffffff", fg: "#000000", label: "White + Black" },
              ].map((combo) => (
                <div
                  key={combo.label}
                  className="p-6 border-4 border-black flex items-center justify-between cursor-default hover:-translate-x-1 hover:-translate-y-1 transition-transform duration-100 ease-linear"
                  style={{ backgroundColor: combo.bg }}
                >
                  <span className="text-lg font-black uppercase tracking-wider" style={{ color: combo.fg }}>
                    {combo.label}
                  </span>
                  <div className="w-10 h-10" style={{ backgroundColor: combo.fg }} />
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-yellow-300 block mb-4">
              — Components
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-white">
              HARD<br />
              <span className="text-red-500">BLOCKS</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-yellow-300 pl-6">
              Every component uses solid color blocks, hard edges, and linear-fast transitions.
              No rounded-lg. No shadows. No gradients.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-0 border-4 border-white w-fit">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-3 text-sm font-black uppercase tracking-wider transition-colors duration-100 ease-linear"
                  style={{
                    backgroundColor: activeTab === tab ? "#ff0000" : "transparent",
                    color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.5)",
                    borderRight: "2px solid white",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-white border-4 border-white p-8 md:p-12">

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
                      Primary — Offset Shadow Block + Heavy Press
                    </p>
                    <div className="flex flex-wrap gap-8 items-center">
                      {[
                        { id: "btn-a", label: "Explore", bg: "#000", fg: "#fff", shadow: "#0000ff" },
                        { id: "btn-b", label: "Submit", bg: "#ff0000", fg: "#fff", shadow: "#ffff00" },
                        { id: "btn-c", label: "Action", bg: "#0000ff", fg: "#fff", shadow: "#ff0000" },
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          className="group relative px-8 py-4 border-4 border-black font-black uppercase tracking-widest text-sm select-none"
                          style={{
                            backgroundColor: btn.bg,
                            color: btn.fg,
                            transform: isPressed(btn.id) ? "translate(4px,4px)" : "translate(0,0)",
                            transition: "transform 100ms ease-linear",
                          }}
                          onMouseDown={() => handleBtnDown(btn.id)}
                          onMouseUp={handleBtnUp}
                          onMouseLeave={handleBtnUp}
                        >
                          <span
                            className="absolute inset-0 -z-10 transition-transform duration-100 ease-linear"
                            style={{
                              backgroundColor: btn.shadow,
                              transform: isPressed(btn.id) ? "translate(0,0)" : "translate(4px,4px)",
                            }}
                          />
                          <span className="relative">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
                      Circle — rounded-full only
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { id: "circ-a", label: "GO", bg: "#0000ff", fg: "#fff" },
                        { id: "circ-b", label: "DO", bg: "#ff0000", fg: "#fff" },
                        { id: "circ-c", label: "+", bg: "#000", fg: "#ffff00" },
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          className="w-24 h-24 rounded-full border-4 border-black font-black uppercase text-sm tracking-widest transition-all duration-100 ease-linear"
                          style={{
                            backgroundColor: btn.bg,
                            color: btn.fg,
                            transform: isPressed(btn.id) ? "scale(0.88)" : "scale(1)",
                          }}
                          onMouseDown={() => handleBtnDown(btn.id)}
                          onMouseUp={handleBtnUp}
                          onMouseLeave={handleBtnUp}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
                      Outlined — hard color swap on hover (Blocky Impact rule)
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <button className="px-8 py-4 bg-white text-black border-4 border-black font-black uppercase tracking-widest text-sm transition-colors duration-100 ease-linear hover:bg-black hover:text-white">
                        View Work
                      </button>
                      <button className="px-8 py-4 bg-white text-red-500 border-4 border-red-500 font-black uppercase tracking-widest text-sm transition-colors duration-100 ease-linear hover:bg-red-500 hover:text-white">
                        Read More
                      </button>
                      <button className="px-8 py-4 bg-white text-blue-600 border-4 border-blue-600 font-black uppercase tracking-widest text-sm transition-colors duration-100 ease-linear hover:bg-blue-600 hover:text-white">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { num: "01", title: "Project Name", desc: "Bold geometric design with hard color cuts and shape-driven motion.", accent: "#ff0000", decoBg: "#0000ff" },
                    { num: "02", title: "Brand Identity", desc: "Structural composition. Every element earns its position on the grid.", accent: "#0000ff", decoBg: "#ffff00" },
                    { num: "03", title: "Type System", desc: "Font-black, uppercase, tracking-tight. Typography is the architecture.", accent: "#ffff00", decoBg: "#ff0000" },
                    { num: "04", title: "Grid Machine", desc: "Asymmetric tension through absolute positioning and rotation.", accent: "#000000", decoBg: "#ff0000" },
                  ].map((card) => (
                    <div
                      key={card.num}
                      className="group relative bg-white border-4 border-black p-8 transition-all duration-100 ease-linear hover:bg-yellow-300 hover:-translate-x-2 hover:-translate-y-2 cursor-pointer"
                    >
                      <div
                        className="absolute -top-6 -right-6 w-12 h-12 border-4 border-black rotate-45 transition-all duration-100 ease-linear group-hover:scale-150 group-hover:rotate-90"
                        style={{ backgroundColor: card.decoBg }}
                      />
                      <span
                        className="inline-block text-xs font-black uppercase tracking-[0.3em] px-2 py-1 mb-3 transition-colors duration-100 ease-linear"
                        style={{
                          backgroundColor: card.accent,
                          color: card.accent === "#ffff00" || card.accent === "#ffffff" ? "#000" : "#fff",
                        }}
                      >
                        {card.num}
                      </span>
                      <h3 className="text-3xl font-black uppercase leading-none mb-4">{card.title}</h3>
                      <p className="text-black/70 leading-relaxed text-sm">{card.desc}</p>
                      <div
                        className="absolute bottom-0 left-0 h-2 transition-all duration-100 ease-linear group-hover:w-full"
                        style={{ backgroundColor: card.accent, width: "25%" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-[0.3em]">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 bg-white border-4 border-black text-black font-bold placeholder:text-gray-300 focus:outline-none focus:bg-yellow-300 transition-colors duration-100 ease-linear"
                        placeholder="YOUR NAME"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-[0.3em]">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-4 bg-white border-4 border-black text-black font-bold placeholder:text-gray-300 focus:outline-none focus:bg-yellow-300 transition-colors duration-100 ease-linear"
                        placeholder="YOUR@EMAIL.COM"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-[0.3em]">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-4 bg-white border-4 border-black text-black font-bold placeholder:text-gray-300 focus:outline-none focus:bg-yellow-300 transition-colors duration-100 ease-linear resize-none"
                        placeholder="YOUR MESSAGE"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-[0.3em]">Category</label>
                      <select className="w-full px-4 py-4 bg-white border-4 border-black text-black font-bold focus:outline-none focus:bg-yellow-300 transition-colors duration-100 ease-linear appearance-none">
                        <option>Design</option>
                        <option>Architecture</option>
                        <option>Motion</option>
                        <option>Brand</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-4 border-black cursor-pointer hover:bg-black transition-colors duration-100 ease-linear" />
                      <label className="text-sm font-black uppercase tracking-wider cursor-pointer">Bold Mode On</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-4 border-black bg-red-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-100 ease-linear">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm font-black uppercase tracking-wider cursor-pointer">No Shadows</label>
                    </div>
                    <button className="w-full py-4 bg-black text-white border-4 border-black font-black uppercase tracking-widest hover:bg-red-500 transition-colors duration-100 ease-linear">
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
                      Solid block badges — no radius
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Bold", bg: "#000000", text: "#ffffff" },
                        { label: "Hard", bg: "#ff0000", text: "#ffffff" },
                        { label: "Sharp", bg: "#0000ff", text: "#ffffff" },
                        { label: "Strong", bg: "#ffff00", text: "#000000" },
                        { label: "Pure", bg: "#000000", text: "#ff0000" },
                        { label: "Raw", bg: "#ff0000", text: "#ffff00" },
                        { label: "Edge", bg: "#ffffff", text: "#000000" },
                        { label: "Grid", bg: "#0000ff", text: "#ffff00" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-2 text-sm font-black uppercase tracking-wider border-2 border-black cursor-default hover:-translate-y-1 hover:-translate-x-0.5 transition-transform duration-100 ease-linear"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
                      Circle badges — rounded-full only
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "01", bg: "#ff0000" },
                        { label: "02", bg: "#0000ff" },
                        { label: "03", bg: "#ffff00" },
                        { label: "04", bg: "#000000" },
                      ].map((b) => (
                        <div
                          key={b.label}
                          className="w-14 h-14 rounded-full border-4 border-black flex items-center justify-center cursor-default hover:scale-110 transition-transform duration-100 ease-linear"
                          style={{ backgroundColor: b.bg }}
                        >
                          <span
                            className="text-sm font-black"
                            style={{ color: b.bg === "#ffff00" ? "#000" : "#fff" }}
                          >
                            {b.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 mb-6">
                      Status indicators — hard color semantics
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "Active", bg: "#000000", text: "#ffff00" },
                        { label: "Pending", bg: "#ff0000", text: "#ffffff" },
                        { label: "Done", bg: "#0000ff", text: "#ffffff" },
                        { label: "Archived", bg: "#ffffff", text: "#000000" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="flex items-center gap-2 px-5 py-2.5 border-4 border-black text-sm font-black uppercase tracking-wider cursor-default hover:scale-105 transition-transform duration-100 ease-linear"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.text }} />
                          {b.label}
                        </span>
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
      {/* 5. ANIMATION & INTERACTION RULES — all 4 named aiRules          */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-600 block mb-4">
              — Animation &amp; Interaction Rules
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-black">
              4 RULES.<br />
              <span className="text-red-500">ZERO SOFTNESS.</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-black/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-blue-600 pl-6">
              Every interaction in Geometric Bold follows exactly four named rules from the aiRules spec.
              Hover or click each demo card to feel the physics.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">

            {/* ---- Rule 1: Blocky Impact ---- */}
            <RevealBlock delay={0.08} className="border-b-4 border-r-0 md:border-r-4 border-black">
              <div className="p-8 md:p-10 bg-white h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-black text-yellow-300 text-xs font-black px-3 py-1.5 uppercase tracking-[0.2em] shrink-0">
                    Rule 01
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Blocky Impact</h3>
                    <p className="text-xs text-black/40 font-mono mt-1">
                      交互使用纯色硬切与短位移反馈，避免柔和透明度过渡。
                    </p>
                  </div>
                </div>
                <p className="text-sm text-black/60 leading-relaxed mb-8 border-l-4 border-yellow-300 pl-4">
                  Hard solid-color switch on hover. No opacity fade, no blur transition.
                  Immediate color snap + 1-2px translate offset. The difference between
                  this and a soft fade is total — structurally honest.
                </p>

                {/* Interactive demo */}
                <div className="flex items-center gap-8">
                  <button
                    className="relative px-8 py-4 border-4 border-black font-black uppercase tracking-widest text-sm select-none"
                    style={{
                      backgroundColor: blockImpactHovered ? "#ff0000" : "#000000",
                      color: "#ffffff",
                      transform: blockImpactPressed
                        ? "translate(2px,2px)"
                        : blockImpactHovered
                          ? "translate(-1px,-1px)"
                          : "translate(0,0)",
                      transition: "background-color 100ms ease-linear, transform 100ms ease-linear",
                    }}
                    onMouseEnter={() => setBlockImpactHovered(true)}
                    onMouseLeave={() => { setBlockImpactHovered(false); setBlockImpactPressed(false); }}
                    onMouseDown={() => setBlockImpactPressed(true)}
                    onMouseUp={() => setBlockImpactPressed(false)}
                  >
                    Hover Me
                  </button>
                  <div className="text-xs font-mono text-black/40 leading-relaxed">
                    <div>bg: #000 &#8594; #ff0000</div>
                    <div>offset: -1px,-1px &#8594; +2px,+2px</div>
                    <div>duration: 100ms ease-linear</div>
                  </div>
                </div>
                <div className="mt-4 text-xs font-black uppercase tracking-wider text-black/30">
                  {blockImpactPressed
                    ? "IMPACT — snapped to press position"
                    : blockImpactHovered
                      ? "HOVER — color hard-cut to red"
                      : "Waiting for hover interaction"}
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 2: Shape Snapping ---- */}
            <RevealBlock delay={0.12} className="border-b-4 border-black">
              <div className="p-8 md:p-10 bg-white h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-[0.2em] shrink-0">
                    Rule 02
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Shape Snapping</h3>
                    <p className="text-xs text-black/40 font-mono mt-1">
                      几何装饰在 hover 时可瞬时旋转/放大，形成结构突变感。
                    </p>
                  </div>
                </div>
                <p className="text-sm text-black/60 leading-relaxed mb-8 border-l-4 border-red-500 pl-4">
                  Geometric decorations snap to a new rotation or scale on hover.
                  Not a smooth animation — a structural jump. The shape mutates its form,
                  creating the sensation of mechanical engagement.
                </p>

                {/* 3 snapping shapes */}
                <div className="flex items-center gap-8">
                  {[
                    { label: "Sq", shape: "square", bg: "#ff0000" },
                    { label: "Ci", shape: "circle", bg: "#0000ff" },
                    { label: "Di", shape: "diamond", bg: "#ffff00" },
                  ].map((s, i) => (
                    <div
                      key={s.shape}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                      onMouseEnter={() => setSnappedShapeIndex(i)}
                      onMouseLeave={() => setSnappedShapeIndex(null)}
                    >
                      <div
                        className="w-14 h-14 border-4 border-black flex items-center justify-center transition-all duration-100 ease-linear"
                        style={{
                          backgroundColor: s.bg,
                          borderRadius: s.shape === "circle" ? "9999px" : "0",
                          transform:
                            snappedShapeIndex === i
                              ? s.shape === "diamond"
                                ? "rotate(135deg) scale(1.4)"
                                : "rotate(90deg) scale(1.4)"
                              : s.shape === "diamond"
                                ? "rotate(45deg)"
                                : "rotate(0deg)",
                        }}
                      >
                        <span
                          className="text-xs font-black"
                          style={{ color: s.bg === "#ffff00" ? "#000" : "#fff" }}
                        >
                          {s.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-black/40">{s.shape}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs font-black uppercase tracking-wider text-black/30">
                  {snappedShapeIndex !== null ? "SNAPPED — structural mutation on hover" : "Hover a shape above"}
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 3: Heavy Press ---- */}
            <RevealBlock delay={0.16} className="border-r-0 md:border-r-4 border-b-4 md:border-b-0 border-black">
              <div className="p-8 md:p-10 bg-white h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-blue-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-[0.2em] shrink-0">
                    Rule 03
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Heavy Press</h3>
                    <p className="text-xs text-black/40 font-mono mt-1">
                      active 状态优先用位移与层级回弹表达按压，不依赖柔和缩放。
                    </p>
                  </div>
                </div>
                <p className="text-sm text-black/60 leading-relaxed mb-8 border-l-4 border-blue-600 pl-4">
                  On active/click, the element shifts +4px down-right as the offset shadow
                  collapses to zero. Not a soft scale — a displacement press. The shadow block
                  disappears and the element lands hard on the surface.
                </p>

                {/* Interactive heavy press demo */}
                <div className="flex items-start gap-6">
                  <button
                    className="group relative px-8 py-4 border-4 border-black font-black uppercase tracking-widest text-sm select-none"
                    style={{
                      backgroundColor: heavyPressActive ? "#0000ff" : "#000000",
                      color: "#ffffff",
                      transform: heavyPressActive ? "translate(4px,4px)" : "translate(0,0)",
                      transition: "transform 100ms ease-linear, background-color 100ms ease-linear",
                    }}
                    onMouseDown={() => setHeavyPressActive(true)}
                    onMouseUp={() => setHeavyPressActive(false)}
                    onMouseLeave={() => setHeavyPressActive(false)}
                    onTouchStart={() => setHeavyPressActive(true)}
                    onTouchEnd={() => setHeavyPressActive(false)}
                  >
                    <span
                      className="absolute inset-0 -z-10 bg-red-500"
                      style={{
                        transform: heavyPressActive ? "translate(0,0)" : "translate(4px,4px)",
                        transition: "transform 100ms ease-linear",
                      }}
                    />
                    <span className="relative">Press &amp; Hold</span>
                  </button>
                  <div className="text-xs font-mono text-black/40 leading-relaxed pt-1">
                    <div>shadow block: offset 4px &#8594; 0</div>
                    <div>button: translate 0 &#8594; 4px,4px</div>
                    <div className="mt-1 font-black uppercase" style={{ color: heavyPressActive ? "#0000ff" : "#000" }}>
                      {heavyPressActive ? "PRESSED" : "idle"}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 4: Linear & Fast ---- */}
            <RevealBlock delay={0.2} className="border-black">
              <div className="p-8 md:p-10 bg-white h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-yellow-300 text-black text-xs font-black px-3 py-1.5 uppercase tracking-[0.2em] shrink-0">
                    Rule 04
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Linear &amp; Fast</h3>
                    <p className="text-xs text-black/40 font-mono mt-1">
                      统一使用 duration-100 + ease-linear，拒绝弹簧感和慢速拖尾。
                    </p>
                  </div>
                </div>
                <p className="text-sm text-black/60 leading-relaxed mb-8 border-l-4 border-yellow-300 pl-4">
                  No spring, no cubic-bezier overshoot, no ease-in-out tail.
                  duration-100ms + ease-linear on everything. The comparison below
                  shows linear (correct for this style) vs spring (wrong).
                </p>

                {/* Side-by-side timing comparison */}
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                        <span className="w-3 h-3 bg-black inline-block" />
                        100ms ease-linear — CORRECT
                      </span>
                      <button
                        className="text-xs px-3 py-1.5 bg-black text-white font-black uppercase tracking-wider hover:bg-yellow-300 hover:text-black transition-colors duration-100 ease-linear"
                        onClick={() => {
                          setLinearBallActive(false);
                          setTimeout(() => setLinearBallActive(true), 50);
                          setTimeout(() => setLinearBallActive(false), 800);
                        }}
                      >
                        Play
                      </button>
                    </div>
                    <div className="relative h-10 bg-black/10 overflow-hidden border-2 border-black">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 bg-black"
                        style={{
                          transform: `translateY(-50%) translateX(${linearBallActive ? "180px" : "0"})`,
                          transition: linearBallActive ? "transform 0.5s linear" : "none",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-red-500 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                        Spring cubic-bezier — WRONG
                      </span>
                      <button
                        className="text-xs px-3 py-1.5 bg-red-500 text-white font-black uppercase tracking-wider hover:bg-black transition-colors duration-100 ease-linear"
                        onClick={() => {
                          setSpringBallActive(false);
                          setTimeout(() => setSpringBallActive(true), 50);
                          setTimeout(() => setSpringBallActive(false), 1400);
                        }}
                      >
                        Compare
                      </button>
                    </div>
                    <div className="relative h-10 bg-red-50 overflow-hidden border-2 border-red-500">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 rounded-full bg-red-500"
                        style={{
                          transform: `translateY(-50%) translateX(${springBallActive ? "180px" : "0"})`,
                          transition: springBallActive ? "transform 1.2s cubic-bezier(0.34,1.56,0.64,1)" : "none",
                        }}
                      />
                    </div>
                    <p className="text-xs text-red-400 mt-1.5 font-mono">
                      Overshoot bounce = banned in Geometric Bold
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. PROJECT GRID                                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-red-500 block mb-4">
              — Work
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-white">
              PROJECT<br />
              <span className="text-yellow-300">GRID</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-red-500 pl-6">
              Each row uses a different accent. Hover to see Blocky Impact and Shape Snapping
              in tandem — the row background snaps immediately.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border-4 border-white">
              {projectRows.map((row, i) => (
                <div
                  key={row.num}
                  className="flex items-center justify-between px-6 py-6 border-b-4 border-white/30 last:border-b-0 cursor-pointer transition-colors duration-100 ease-linear"
                  style={{ backgroundColor: hoveredProject === i ? row.color : "transparent" }}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="text-xs font-mono transition-colors duration-100 ease-linear w-8 shrink-0"
                      style={{ color: hoveredProject === i ? (row.color === "#ffff00" || row.color === "#ffffff" ? "#000" : "#fff") : "rgba(255,255,255,0.3)" }}
                    >
                      {row.num}
                    </span>
                    <span
                      className="font-black uppercase text-xl md:text-2xl tracking-tight transition-colors duration-100 ease-linear"
                      style={{ color: hoveredProject === i ? (row.color === "#ffff00" || row.color === "#ffffff" ? "#000" : "#fff") : "#fff" }}
                    >
                      {row.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="px-3 py-1 text-xs font-black uppercase tracking-wider border-2 transition-colors duration-100 ease-linear hidden md:block"
                      style={{
                        backgroundColor: hoveredProject === i ? (row.color === "#ffff00" || row.color === "#ffffff" ? "#000" : "#fff") : "transparent",
                        color: hoveredProject === i ? row.color : "rgba(255,255,255,0.4)",
                        borderColor: hoveredProject === i ? "transparent" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {row.category}
                    </span>
                    <span
                      className="font-black transition-colors duration-100 ease-linear"
                      style={{ color: hoveredProject === i ? (row.color === "#ffff00" || row.color === "#ffffff" ? "#000" : "#fff") : "rgba(255,255,255,0.3)" }}
                    >
                      &#8594;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Project showcase cards */}
          <RevealBlock delay={0.18}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-white mt-8">
              {[
                { title: "STRUCTURE", num: "01", bg: "#ff0000", fg: "#fff", deco: "#0000ff" },
                { title: "CONTRAST", num: "02", bg: "#ffffff", fg: "#000", deco: "#ff0000" },
                { title: "DYNAMICS", num: "03", bg: "#0000ff", fg: "#fff", deco: "#ffff00" },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="group relative p-8 border-r-4 border-white last:border-r-0 cursor-pointer transition-colors duration-100 ease-linear hover:bg-yellow-300"
                  style={{ backgroundColor: card.bg }}
                >
                  <div
                    className="absolute top-0 right-0 w-10 h-10 transition-all duration-100 ease-linear group-hover:rotate-90"
                    style={{ backgroundColor: card.deco, transformOrigin: "top right" }}
                  />
                  <span className="text-xs font-black uppercase tracking-[0.35em] block mb-3" style={{ color: card.fg }}>
                    {card.num}
                  </span>
                  <h3 className="font-black uppercase tracking-tight text-2xl mb-3 transition-colors duration-100 ease-linear group-hover:text-black" style={{ color: card.fg }}>
                    {card.title}
                  </h3>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-colors duration-100 ease-linear"
                    style={{ backgroundColor: card.deco }}
                  />
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. TYPOGRAPHY SYSTEM                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-yellow-500 block mb-4">
              — Typography
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-black">
              TYPE IS<br />
              <span className="text-blue-600">STRUCTURE</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-black/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-yellow-400 pl-6">
              font-black + uppercase everywhere. Numbers serve as design elements.
              tracking-widest on labels. tracking-tight on display text.
            </p>
          </RevealBlock>

          {/* Type scale */}
          <RevealBlock delay={0.1}>
            <div className="border-4 border-black mb-10 overflow-hidden">
              {[
                { size: "text-[10rem]", label: "10rem", sample: "BIG", color: "#ff0000" },
                { size: "text-8xl", label: "8xl", sample: "BOLDER", color: "#0000ff" },
                { size: "text-6xl", label: "6xl", sample: "DISPLAY", color: "#000000" },
                { size: "text-4xl", label: "4xl", sample: "HEADING", color: "#ff0000" },
                { size: "text-2xl", label: "2xl", sample: "SUBHEADING", color: "#000000" },
                { size: "text-xs", label: "xs", sample: "LABEL — TRACKING [0.3em] — UPPERCASE ONLY", color: "#000000" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline gap-6 px-6 py-4 border-b-2 border-black last:border-b-0 hover:bg-black/5 transition-colors duration-100 ease-linear cursor-default"
                >
                  <span className="text-xs font-mono text-black/30 w-16 shrink-0">{row.label}</span>
                  <span className={`font-black uppercase leading-none ${row.size}`} style={{ color: row.color }}>
                    {row.sample}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Number as design element */}
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black p-10 relative overflow-hidden">
                <div className="text-[180px] font-black text-red-500 leading-none select-none absolute -right-4 -bottom-4 opacity-20">
                  01
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40 block mb-3">Numbers as Art</span>
                <h3 className="text-4xl font-black uppercase text-white leading-tight relative z-10">
                  Large numbers anchor<br />the visual hierarchy
                </h3>
              </div>
              <div className="border-4 border-black p-10 relative overflow-hidden">
                <div className="text-[180px] font-black text-blue-600 leading-none select-none absolute -right-4 -bottom-4 opacity-10">
                  02
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-black/40 block mb-3">Tracking Labels</span>
                <h3 className="text-4xl font-black uppercase text-black leading-tight relative z-10">
                  tracking-[0.3em]<br />on all labels
                </h3>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. GEOMETRIC SHAPES SHOWCASE                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-500 block mb-4">
              — Shapes
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-white">
              THE SHAPE<br />
              <span className="text-blue-500">VOCABULARY</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-blue-500 pl-6">
              Circles (rounded-full), squares (rounded-none), and triangles (SVG polygon).
              Combine them to build every composition.
            </p>
          </RevealBlock>

          {/* Large geometric composition */}
          <RevealBlock delay={0.1}>
            <div className="relative min-h-[400px] border-4 border-white overflow-hidden flex items-center justify-center mb-8">
              <div className="absolute top-0 left-0 w-64 h-64 bg-red-500" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600" />
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-yellow-300 geo-rotate-cw" />
              <div className="absolute bottom-8 left-16 w-24 h-24 border-8 border-white rotate-12 geo-rotate-ccw" />
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="w-20 h-20 bg-white border-4 border-black" />
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-black" />
                  <TriangleSVG size={80} fill="#ffffff" stroke="#000000" strokeWidth={4} />
                </div>
                <p className="text-white/60 text-sm font-black uppercase tracking-[0.2em]">
                  Square + Circle + Triangle
                </p>
              </div>
              <div className="absolute top-4 left-6 text-white/20 text-6xl font-black select-none">01</div>
              <div className="absolute bottom-4 right-6 text-white/20 text-6xl font-black select-none">02</div>
            </div>
          </RevealBlock>

          {/* Shape grid */}
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-white">
              {[
                { label: "Square", desc: "rounded-none", bg: "#ff0000", darkText: false, element: <div className="w-12 h-12 bg-white border-2 border-white" /> },
                { label: "Circle", desc: "rounded-full", bg: "#ffffff", darkText: true, element: <div className="w-12 h-12 rounded-full bg-black border-2 border-black" /> },
                { label: "Triangle", desc: "SVG polygon", bg: "#0000ff", darkText: false, element: <TriangleSVG size={48} fill="#ffffff" stroke="#ffffff" strokeWidth={3} /> },
                { label: "Diamond", desc: "rotate-45", bg: "#ffff00", darkText: true, element: <div className="w-12 h-12 bg-black rotate-45 border-2 border-black" /> },
              ].map((shape, i) => (
                <div
                  key={shape.label}
                  className="p-8 flex flex-col items-center gap-4 border-r-4 border-white last:border-r-0 cursor-default hover:-translate-y-1 transition-transform duration-100 ease-linear"
                  style={{ backgroundColor: shape.bg }}
                >
                  {shape.element}
                  <div className="text-center">
                    <div className="font-black uppercase text-sm" style={{ color: shape.darkText ? "#000" : "#fff" }}>
                      {shape.label}
                    </div>
                    <div className="text-xs font-mono mt-1 opacity-60" style={{ color: shape.darkText ? "#000" : "#fff" }}>
                      {shape.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. DESIGN RULES — DO &amp; DON'T                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-red-500">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-white/60 block mb-4">
              — Philosophy
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-white">
              DO &amp;<br />
              <span className="text-black">DON&apos;T</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/70 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-white pl-6">
              Geometric Bold is a strict discipline. The rules define what this style is.
              Breaking them breaks the aesthetic.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
            {/* Do */}
            <RevealBlock delay={0.1} className="border-r-0 md:border-r-4 border-black">
              <div className="bg-black p-8 md:p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-yellow-300 flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white tracking-wider">DO</h3>
                </div>
                <ul className="space-y-4">
                  {DO_RULES.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1.5 w-2.5 h-2.5 bg-yellow-300 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.16}>
              <div className="bg-white p-8 md:p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-black tracking-wider">DON&apos;T</h3>
                </div>
                <ul className="space-y-4">
                  {DONT_RULES.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-black/60 leading-relaxed">
                      <span className="mt-1.5 w-2.5 h-2.5 bg-red-500 shrink-0" />
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
      {/* 10. AGENCY PORTFOLIO DEMO                                        */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-red-500 block mb-4">
              — App Demo
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-black">
              AGENCY<br />
              <span className="text-red-500">PORTFOLIO</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-black/50 text-lg max-w-md leading-relaxed mt-6 border-l-4 border-red-500 pl-6">
              A design agency portfolio section rendered in full Geometric Bold style.
              Offset grid, number anchors, hard color contrast throughout.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border-4 border-black overflow-hidden">
              {/* Mock nav bar */}
              <div className="bg-black flex items-center justify-between px-6 py-3 border-b-4 border-white">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500" />
                  <span className="text-white text-xs font-black uppercase tracking-[0.3em]">STUDIO XX</span>
                </div>
                <div className="hidden md:flex gap-6">
                  {["Work", "About", "Contact"].map((n) => (
                    <span key={n} className="text-white/40 text-xs font-black uppercase tracking-wider hover:text-white cursor-pointer transition-colors duration-100 ease-linear">
                      {n}
                    </span>
                  ))}
                </div>
                <div className="w-6 h-6 rounded-full bg-yellow-300 border-2 border-white" />
              </div>

              {/* Hero panel split */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
                <div className="bg-black p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500" />
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40 block mb-3">
                      Selected Work 2024
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black uppercase text-white leading-none">
                      WE BUILD<br />
                      <span className="text-yellow-300">BOLD</span><br />
                      THINGS
                    </h2>
                  </div>
                  <button className="group relative w-fit px-7 py-3 bg-black text-white border-4 border-white font-black uppercase tracking-widest text-sm transition-all duration-100 ease-linear hover:bg-red-500 hover:-translate-x-0.5 hover:-translate-y-0.5">
                    <span className="absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform duration-100 ease-linear group-hover:translate-x-2 group-hover:translate-y-2" />
                    <span className="relative">See Work</span>
                  </button>
                </div>
                <div className="bg-red-500 p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-8 border-white opacity-30 geo-rotate-cw" />
                  <div className="text-[120px] font-black text-white/10 leading-none select-none absolute right-4 bottom-0">
                    XX
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    {[
                      { num: "24", label: "Projects" },
                      { num: "12", label: "Awards" },
                      { num: "8", label: "Years" },
                      { num: "3", label: "Offices" },
                    ].map((s) => (
                      <div key={s.label} className="border-2 border-white/40 p-4">
                        <div className="text-3xl font-black text-white leading-none">{s.num}</div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project list rows */}
              <div className="border-t-4 border-black">
                {["Bauhaus Revival", "Grid System Study", "Constructivist Poster"].map((proj, i) => (
                  <div
                    key={proj}
                    className="flex items-center justify-between px-6 py-5 border-b-2 border-black/10 last:border-b-0 hover:bg-black hover:text-white transition-colors duration-100 ease-linear cursor-pointer group"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-xs font-mono text-black/30 group-hover:text-white/30 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-black uppercase text-lg tracking-tight group-hover:text-white">
                        {proj}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="px-3 py-1 text-xs font-black uppercase tracking-wider"
                        style={{
                          backgroundColor: [["#ff0000", "#fff"], ["#0000ff", "#fff"], ["#ffff00", "#000"]][i][0],
                          color: [["#ff0000", "#fff"], ["#0000ff", "#fff"], ["#ffff00", "#000"]][i][1],
                        }}
                      >
                        {["Install", "Print", "Brand"][i]}
                      </span>
                      <span className="font-black text-black/30 group-hover:text-white/40 transition-colors duration-100 ease-linear">
                        &#8594;
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
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="relative bg-black border-t-4 border-white overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 pointer-events-none opacity-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 pointer-events-none opacity-10" />
        <div className="absolute top-8 right-24 w-20 h-20 border-4 border-yellow-300 rotate-45 pointer-events-none opacity-20 geo-rotate-cw" />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative z-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 border-2 border-white" />
                <span className="text-xl font-black uppercase tracking-widest text-white">
                  Geometric<span className="text-red-500">Bold</span>
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-mono">
                Bauhaus and Constructivism influence. Strong geometric
                shapes, intense color contrast. No gradients, no shadows.
                Pure visual impact.
              </p>
              <div className="flex gap-0">
                {paletteSwatches.map((s) => (
                  <div
                    key={s.name}
                    className="w-8 h-8 border-2 border-black hover:scale-110 transition-transform duration-100 ease-linear cursor-default"
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/30">Style</span>
                <Link href="/styles/geometric-bold" className="text-white/50 hover:text-white hover:translate-x-1 transition-all duration-100 ease-linear font-bold uppercase tracking-wider text-xs">
                  Documentation
                </Link>
                <Link href="/styles/geometric-bold/showcase" className="text-white/50 hover:text-white hover:translate-x-1 transition-all duration-100 ease-linear font-bold uppercase tracking-wider text-xs">
                  Showcase
                </Link>
                <Link href="/styles/geometric-bold/cover" className="text-white/50 hover:text-white hover:translate-x-1 transition-all duration-100 ease-linear font-bold uppercase tracking-wider text-xs">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/30">StyleKit</span>
                <Link href="/" className="text-white/50 hover:text-white hover:translate-x-1 transition-all duration-100 ease-linear font-bold uppercase tracking-wider text-xs">
                  Home
                </Link>
                <Link href="/styles" className="text-white/50 hover:text-white hover:translate-x-1 transition-all duration-100 ease-linear font-bold uppercase tracking-wider text-xs">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/30">Rules</span>
                {["No Gradients", "No Shadows", "Max 4 Colors", "100ms Linear"].map((r) => (
                  <span key={r} className="flex items-center gap-2 text-white/40 text-xs font-mono">
                    <span className="w-2 h-2 bg-red-500 inline-block" />
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hard divider */}
          <div className="h-1 bg-white mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-white/30 font-mono">
              <div className="w-3 h-3 bg-red-500" />
              <span>Built for StyleKit — Geometric Bold</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-black uppercase tracking-widest border-4 border-white hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors duration-100 ease-linear"
            >
              <span>&#8592;</span>
              Back to StyleKit
            </Link>
          </div>
        </div>

        {/* Final color band */}
        <div className="flex border-t-4 border-white">
          <div className="h-4 flex-1 bg-red-500" />
          <div className="h-4 w-16 bg-blue-600" />
          <div className="h-4 w-10 bg-yellow-300" />
          <div className="h-4 w-6 bg-black border-l-4 border-white" />
        </div>
      </footer>
    </div>
  );
}
