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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PALETTE = [
  { name: "Bauhaus Red", hex: "#ff0000", label: "Primary", textOnColor: "#ffffff" },
  { name: "Bauhaus Yellow", hex: "#ffcc00", label: "Secondary", textOnColor: "#000000" },
  { name: "Bauhaus Blue", hex: "#0000ff", label: "Tertiary", textOnColor: "#ffffff" },
  { name: "Black", hex: "#000000", label: "Structure", textOnColor: "#ffffff" },
  { name: "White", hex: "#ffffff", label: "Space", textOnColor: "#000000" },
];

const DO_LIST = [
  "Use primary colors: red #ff0000, yellow #ffcc00, blue #0000ff plus black and white",
  "Use basic geometric shapes — circle, square, triangle — as structural UI elements",
  "Apply border-4 border-black on all interactive elements",
  "Use font-black or font-bold uppercase for all headings",
  "Use duration-150 or duration-200 — short, sharp, mechanical",
  "Use ease-out only — never ease-in-out",
  "Use pseudo-elements for color-block slide animations (translate-x rail mechanism)",
  "Scale or rotate geometric decorators on hover — mechanical feel",
  "Hard primary color switches on interaction — no transparency fade",
  "Emphasize grid and strict alignment",
];

const DONT_LIST = [
  "Never use complex gradients — Bauhaus forbids blended color",
  "Never use decorative ornamental elements",
  "Never use serif typefaces — sans-serif geometric only",
  "Never use non-primary complex color palettes",
  "Never use duration-500 or above — no slow fades",
  "Never use ease-in-out — banned by Bauhaus motion rules",
  "Never use rounded-lg or rounded-xl — only rounded-full for pure circles",
  "Never use opacity fades for color interaction — use hard cuts",
  "Never use organic or irregular shapes — pure geometry only",
  "Never use decorative shadows or glows — borders define structure",
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");

  // Color palette hover
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // Input focus states for component demo
  const [inputFocused1, setInputFocused1] = useState(false);
  const [inputFocused2, setInputFocused2] = useState(false);

  /* ---- aiRule 1: Structural Shifts ---- */
  const [structuralActive, setStructuralActive] = useState<number>(0);

  /* ---- aiRule 2: Mechanical Precision ---- */
  const [mechanicalClicked, setMechanicalClicked] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(62);

  /* ---- aiRule 3: Primary Color Swaps ---- */
  const [colorSwapIndex, setColorSwapIndex] = useState<number>(0);

  /* ---- aiRule 4: Geometric Reveals ---- */
  const [revealHovered, setRevealHovered] = useState<number | null>(null);

  /* ---- aiRule 5: Geometric Animation ---- */
  const [shapeHovered, setShapeHovered] = useState<string | null>(null);

  /* ---- Notification ---- */
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function showNotification(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 1800);
  }

  const colorSwapOptions = [
    { bg: "#000000", text: "#ffffff", label: "BLACK" },
    { bg: "#ff0000", text: "#ffffff", label: "RED" },
    { bg: "#ffcc00", text: "#000000", label: "YELLOW" },
    { bg: "#0000ff", text: "#ffffff", label: "BLUE" },
    { bg: "#ffffff", text: "#000000", label: "WHITE" },
  ];
  const currentSwap = colorSwapOptions[colorSwapIndex];

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes bauhaus-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes bauhaus-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bauhaus-march {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo — three primary color blocks */}
          <div className="flex items-center gap-0">
            <div className="w-8 h-8 bg-red-600 border-2 border-black" />
            <div className="w-8 h-8 bg-yellow-400 border-2 border-black border-l-0" />
            <div className="w-8 h-8 bg-blue-600 border-2 border-black border-l-0" />
            <span className="ml-3 text-sm font-black uppercase tracking-widest text-black">
              Bauhaus
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-0">
            {["Palette", "Components", "AI Rules", "Philosophy", "App"].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative px-4 py-2 text-xs font-black uppercase tracking-widest text-black border-l-2 border-black hover:bg-black hover:text-white transition-colors duration-150"
                style={{ borderLeftColor: i === 0 ? "transparent" : "#000000" }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back to StyleKit — slide reveal */}
          <Link
            href="/"
            className="group relative px-6 py-2 bg-black text-white font-black uppercase tracking-widest text-xs border-4 border-black overflow-hidden hover:text-black transition-colors duration-150"
          >
            <span className="relative z-10">StyleKit</span>
            <div className="absolute inset-0 bg-yellow-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
          </Link>
        </div>
      </header>

      {/* Notification toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 px-6 py-3 bg-black text-yellow-400 font-black uppercase tracking-widest text-xs border-4 border-yellow-400">
          {notification}
        </div>
      )}

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-16 min-h-screen flex items-center bg-white overflow-hidden">
        {/* Structural vertical stripe */}
        <div className="absolute top-16 left-0 w-3 h-full bg-black" />
        <div className="absolute top-16 left-3 w-6 h-full bg-red-600" />

        {/* Geometric background decorators */}
        <div
          className="absolute top-24 right-16 w-56 h-56 bg-yellow-400 rounded-full border-4 border-black"
          style={{ animation: "bauhaus-pulse 4s ease-out infinite" }}
        />
        <div className="absolute bottom-28 right-44 w-40 h-40 bg-blue-600 border-4 border-black" />
        {/* Triangle */}
        <div
          className="absolute top-52 right-72 w-0 h-0 pointer-events-none"
          style={{
            borderLeft: "60px solid transparent",
            borderRight: "60px solid transparent",
            borderBottom: "104px solid #ff0000",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 px-12 md:px-24 max-w-5xl">
          {/* Eyebrow tag */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s",
            }}
          >
            <span className="inline-block px-5 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] mb-7 border-4 border-black">
              Das Staatliche Bauhaus / 1919
            </span>
          </div>

          {/* Main title */}
          <h1
            className="text-7xl md:text-[112px] font-black text-black uppercase leading-none tracking-tighter mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s",
            }}
          >
            FORM
            <br />
            <span className="text-red-600">FOLLOWS</span>
            <br />
            FUNCTION.
          </h1>

          {/* Subtitle */}
          <p
            className="text-base font-bold text-black max-w-md mb-10 uppercase tracking-wider leading-snug border-l-4 border-yellow-400 pl-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s",
            }}
          >
            Germany 1919. Primary colors. Geometric form.
            Functional beauty. Zero ornament. Every element earns its place.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s ease-out 0.3s, transform 0.4s ease-out 0.3s",
            }}
          >
            {/* Slide-reveal CTA */}
            <button
              className="group relative px-10 py-4 bg-red-600 text-white font-black uppercase tracking-wider text-sm border-4 border-black overflow-hidden hover:text-black active:translate-y-1 transition-all duration-150"
              onClick={() => showNotification("Exploring Bauhaus system")}
            >
              <span className="relative z-10">Explore Style</span>
              <div className="absolute inset-0 bg-yellow-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
            </button>
            <button
              className="group relative px-10 py-4 bg-white text-black font-black uppercase tracking-wider text-sm border-4 border-black overflow-hidden hover:text-white active:translate-y-1 transition-all duration-150"
              onClick={() => showNotification("Loading documentation")}
            >
              <span className="relative z-10">View Docs</span>
              <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-0 max-w-lg"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s",
            }}
          >
            {[
              { value: "1919", label: "Founded", bg: "#ff0000" },
              { value: "3", label: "Primary Colors", bg: "#ffcc00" },
              { value: "0", label: "Decorations", bg: "#0000ff" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 border-4 border-black text-center hover:-translate-y-1 transition-transform duration-150 ease-out cursor-default"
                style={{ backgroundColor: stat.bg }}
              >
                <div
                  className="text-3xl font-black"
                  style={{ color: i === 1 ? "#000000" : "#ffffff" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-black uppercase tracking-widest mt-1"
                  style={{ color: i === 1 ? "#00000099" : "#ffffffaa" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-10 bg-black border-t-4 border-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-yellow-400 block mb-4">
              — Color System / Farbsystem
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase leading-none">
              Primary<br />
              <span className="text-red-600">Colors Only</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white font-bold text-base max-w-lg uppercase tracking-wide leading-snug mt-6 opacity-80">
              Red, yellow, blue plus black and white. No gradients. No pastels. No mixing.
              Pure pigment — the Bauhaus palette.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-col md:flex-row gap-0 border-4 border-white">
              {PALETTE.map((color, i) => (
                <div
                  key={color.name}
                  className="flex-1 min-h-52 p-8 flex flex-col justify-between cursor-pointer border-r-2 border-white last:border-r-0"
                  style={{
                    backgroundColor: color.hex,
                    transform: hoveredSwatch === i ? "translateY(-8px)" : "translateY(0)",
                    transition: "transform 0.2s ease-out",
                  }}
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  {/* Geometric shape indicator */}
                  <div className="mb-6">
                    {i === 0 && (
                      <div
                        className="w-10 h-10 rounded-full border-4"
                        style={{ borderColor: color.textOnColor }}
                      />
                    )}
                    {i === 1 && (
                      <div
                        className="w-10 h-10 border-4"
                        style={{ borderColor: color.textOnColor }}
                      />
                    )}
                    {i === 2 && (
                      <div
                        className="w-0 h-0"
                        style={{
                          borderLeft: "20px solid transparent",
                          borderRight: "20px solid transparent",
                          borderBottom: `34px solid ${color.textOnColor}`,
                        }}
                      />
                    )}
                    {i === 3 && (
                      <div className="w-10 h-10 rounded-full border-4 border-white" />
                    )}
                    {i === 4 && (
                      <div className="w-10 h-10 border-4 border-black" />
                    )}
                  </div>
                  <div>
                    <div
                      className="text-sm font-black uppercase tracking-widest mb-1"
                      style={{ color: color.textOnColor }}
                    >
                      {color.label}
                    </div>
                    <div
                      className="text-xs font-bold font-mono"
                      style={{ color: color.textOnColor, opacity: 0.6 }}
                    >
                      {color.hex}
                    </div>
                    <div
                      className="text-xl font-black uppercase mt-3"
                      style={{ color: color.textOnColor }}
                    >
                      {color.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Geometric composition */}
          <RevealBlock delay={0.2} className="mt-14">
            <div className="bg-white border-4 border-white p-10">
              <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-8">
                The Three Pure Forms — Geometric Composition
              </p>
              <div className="flex items-end gap-12 flex-wrap">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-28 h-28 bg-yellow-400 rounded-full border-4 border-black cursor-pointer"
                    style={{
                      transform: shapeHovered === "pal-circle" ? "scale(1.25)" : "scale(1)",
                      transition: "transform 0.2s ease-out",
                    }}
                    onMouseEnter={() => setShapeHovered("pal-circle")}
                    onMouseLeave={() => setShapeHovered(null)}
                  />
                  <div className="text-center">
                    <div className="text-xs font-black uppercase tracking-widest">Circle</div>
                    <div className="text-[10px] font-bold uppercase opacity-50 mt-1">scale-125 on hover</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-28 h-28 bg-blue-600 border-4 border-black cursor-pointer"
                    style={{
                      transform: shapeHovered === "pal-square" ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease-out",
                    }}
                    onMouseEnter={() => setShapeHovered("pal-square")}
                    onMouseLeave={() => setShapeHovered(null)}
                  />
                  <div className="text-center mt-4">
                    <div className="text-xs font-black uppercase tracking-widest">Square</div>
                    <div className="text-[10px] font-bold uppercase opacity-50 mt-1">rotate-45 on hover</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-0 h-0 cursor-pointer"
                    style={{
                      borderLeft: "56px solid transparent",
                      borderRight: "56px solid transparent",
                      borderBottom: "97px solid #ff0000",
                      transform: shapeHovered === "pal-triangle" ? "scale(1.15) rotate(180deg)" : "scale(1) rotate(0deg)",
                      transition: "transform 0.2s ease-out",
                    }}
                    onMouseEnter={() => setShapeHovered("pal-triangle")}
                    onMouseLeave={() => setShapeHovered(null)}
                  />
                  <div className="text-center mt-8">
                    <div className="text-xs font-black uppercase tracking-widest">Triangle</div>
                    <div className="text-[10px] font-bold uppercase opacity-50 mt-1">scale + rotate-180</div>
                  </div>
                </div>
                <div className="flex-1 min-w-40">
                  <div className="bg-black border-4 border-black p-5 text-white font-mono text-xs leading-relaxed">
                    {`/* Bauhaus Form Language */\ncircle  → warmth, movement\nsquare  → order, stability\ntriangle → energy, direction\n\nhover:scale-125\nhover:rotate-45\nduration-200 ease-out`}
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section id="components" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-10 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-red-600 block mb-4">
              — Components / Komponenten
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-black uppercase leading-none">
              Structural<br />
              <span className="text-blue-600">Building Blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-black font-bold text-base max-w-lg uppercase tracking-wide leading-snug mt-6 opacity-70">
              Every component stripped of ornament. Heavy borders. Primary colors.
              Short mechanical transitions. No decoration without function.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-0 border-4 border-black">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-colors duration-150"
                  style={{
                    backgroundColor: activeTab === tab ? "#000000" : "#ffffff",
                    color: activeTab === tab ? "#ffcc00" : "#000000",
                    borderRight: i < 3 ? "2px solid #000" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-white border-4 border-black p-10 md:p-14">

              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-6 border-b-2 border-black pb-2">
                      Primary — Color Block Slide Reveal (Geometric Reveal Rule)
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "ACTION", bg: "#ff0000", reveal: "#ffcc00", textAfter: "#000000" },
                        { label: "EXPLORE", bg: "#0000ff", reveal: "#ff0000", textAfter: "#ffffff" },
                        { label: "SUBMIT", bg: "#000000", reveal: "#0000ff", textAfter: "#ffffff" },
                        { label: "CONFIRM", bg: "#ffcc00", textColor: "#000000", reveal: "#000000", textAfter: "#ffffff" },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          className="group relative px-8 py-4 font-black uppercase tracking-wider text-sm border-4 border-black overflow-hidden active:translate-y-1 transition-all duration-150"
                          style={{ backgroundColor: btn.bg, color: btn.textColor ?? "#ffffff" }}
                          onClick={() => showNotification(`${btn.label} clicked`)}
                        >
                          <span
                            className="relative z-10 transition-colors duration-150"
                            style={{ color: btn.textColor ?? "#ffffff" }}
                          >
                            {btn.label}
                          </span>
                          <div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out"
                            style={{ backgroundColor: btn.reveal }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-6 border-b-2 border-black pb-2">
                      Outline — Hard Border Invert
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider text-sm border-4 border-black hover:bg-black hover:text-white transition-colors duration-150 active:translate-y-1"
                        onClick={() => showNotification("Outline clicked")}
                      >
                        OUTLINED
                      </button>
                      <button
                        className="px-8 py-4 bg-white text-red-600 font-black uppercase tracking-wider text-sm border-4 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-150 active:translate-y-1"
                        onClick={() => showNotification("Danger clicked")}
                      >
                        DANGER
                      </button>
                      <button
                        className="px-8 py-4 bg-white text-blue-600 font-black uppercase tracking-wider text-sm border-4 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-150 active:translate-y-1"
                        onClick={() => showNotification("Info clicked")}
                      >
                        INFO
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-6 border-b-2 border-black pb-2">
                      Size Variants — Bauhaus Grid Proportions
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "SM", cls: "px-4 py-2 text-xs" },
                        { size: "MD", cls: "px-7 py-3 text-sm" },
                        { size: "LG", cls: "px-10 py-5 text-base" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`group relative bg-yellow-400 text-black font-black uppercase tracking-widest border-4 border-black overflow-hidden hover:text-white active:translate-y-1 transition-all duration-150 ${cls}`}
                          onClick={() => showNotification(`${size} button`)}
                        >
                          <span className="relative z-10">{size}</span>
                          <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Form", sub: "Follows Function", desc: "Every design decision justified by purpose. No ornament without utility. Structure is beauty.", circleColor: "#ffcc00", squareColor: "#0000ff" },
                    { title: "Craft", sub: "Meets Industry", desc: "Bauhaus united fine arts with industrial production. Machine-age beauty through manufacturing.", circleColor: "#ff0000", squareColor: "#ffcc00" },
                    { title: "Grid", sub: "Structures All", desc: "The invisible 12-column grid underpins all composition. Alignment is not optional — it is law.", circleColor: "#0000ff", squareColor: "#ff0000" },
                    { title: "Type", sub: "Is Architecture", desc: "Sans-serif letterforms. No decorative strokes. Typography as pure geometric structure.", circleColor: "#ffcc00", squareColor: "#000000" },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative p-8 bg-white border-4 border-black cursor-pointer hover:-translate-y-2 transition-all duration-200 ease-out"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `8px 8px 0px ${card.circleColor}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Circle decorator — scales on hover */}
                      <div
                        className="absolute -top-5 -left-5 w-10 h-10 rounded-full border-4 border-black group-hover:scale-125 transition-transform duration-200 ease-out"
                        style={{ backgroundColor: card.circleColor }}
                      />
                      {/* Square decorator — rotates on hover */}
                      <div
                        className="absolute -bottom-4 -right-4 w-8 h-8 border-4 border-black group-hover:rotate-45 transition-transform duration-200 ease-out"
                        style={{ backgroundColor: card.squareColor }}
                      />
                      <h3 className="text-3xl font-black text-black uppercase tracking-wider mb-1 group-hover:text-red-600 transition-colors duration-150">
                        {card.title}
                      </h3>
                      <p className="text-xs font-black uppercase tracking-widest text-black mb-4 opacity-40">
                        {card.sub}
                      </p>
                      <p className="text-black font-bold text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="ENTER TEXT"
                        className="w-full px-6 py-4 bg-white border-4 text-black font-bold placeholder-gray-300 focus:outline-none transition-colors duration-150"
                        style={{ borderColor: inputFocused1 ? "#ff0000" : "#000000" }}
                        onFocus={() => setInputFocused1(true)}
                        onBlur={() => setInputFocused1(false)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="YOU@BAUHAUS.DE"
                        className="w-full px-6 py-4 bg-white border-4 text-black font-bold placeholder-gray-300 focus:outline-none transition-colors duration-150"
                        style={{ borderColor: inputFocused2 ? "#0000ff" : "#000000" }}
                        onFocus={() => setInputFocused2(true)}
                        onBlur={() => setInputFocused2(false)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">Message</label>
                      <textarea
                        rows={4}
                        placeholder="WRITE SOMETHING FUNCTIONAL..."
                        className="w-full px-6 py-4 bg-white border-4 border-black text-black font-bold placeholder-gray-300 focus:border-yellow-400 focus:outline-none transition-colors duration-150 resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-black mb-2">Category</label>
                      <select className="w-full px-6 py-4 bg-white border-4 border-black text-black font-bold focus:border-red-600 focus:outline-none transition-colors duration-150">
                        <option>Architecture</option>
                        <option>Design</option>
                        <option>Craft</option>
                        <option>Typography</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-4 border-black bg-red-600 flex items-center justify-center cursor-pointer hover:bg-yellow-400 transition-colors duration-150">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm font-black uppercase tracking-wider cursor-pointer">
                        Functional design only
                      </label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-4 border-black cursor-pointer hover:bg-blue-600 transition-colors duration-150" />
                      <label className="text-sm font-black uppercase tracking-wider cursor-pointer">
                        No ornamental elements
                      </label>
                    </div>
                    <button
                      className="group relative w-full py-4 bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-black overflow-hidden hover:text-black active:translate-y-1 transition-all duration-150"
                      onClick={() => showNotification("Form submitted")}
                    >
                      <span className="relative z-10">Submit Form</span>
                      <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES ---- */}
              {activeTab === "badges" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-6 border-b-2 border-black pb-2">
                      Status Badges — Hard Color Blocks
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Functional", bg: "#000000", text: "#ffffff" },
                        { label: "Geometric", bg: "#ff0000", text: "#ffffff" },
                        { label: "Minimal", bg: "#ffcc00", text: "#000000" },
                        { label: "Structural", bg: "#0000ff", text: "#ffffff" },
                        { label: "Primary", bg: "#000000", text: "#ff0000" },
                        { label: "Modern", bg: "#ff0000", text: "#ffcc00" },
                        { label: "Precise", bg: "#0000ff", text: "#ffcc00" },
                        { label: "Pure", bg: "#ffcc00", text: "#0000ff" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-2 text-xs font-black uppercase tracking-widest border-2 border-black hover:-translate-y-1 transition-transform duration-150 cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-6 border-b-2 border-black pb-2">
                      Indicator Badges — with Geometric Markers
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "Active", icon: "circle", bg: "#ff0000", text: "#ffffff" },
                        { label: "Pending", icon: "square", bg: "#ffcc00", text: "#000000" },
                        { label: "Stable", icon: "triangle", bg: "#0000ff", text: "#ffffff" },
                        { label: "Complete", icon: "circle", bg: "#000000", text: "#ffcc00" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest border-4 border-black hover:-translate-y-1 transition-transform duration-150 cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.icon === "circle" && (
                            <span className="w-3 h-3 rounded-full border-2 shrink-0" style={{ borderColor: b.text }} />
                          )}
                          {b.icon === "square" && (
                            <span className="w-3 h-3 border-2 shrink-0" style={{ borderColor: b.text }} />
                          )}
                          {b.icon === "triangle" && (
                            <span
                              className="w-0 h-0 shrink-0"
                              style={{
                                borderLeft: "5px solid transparent",
                                borderRight: "5px solid transparent",
                                borderBottom: `8px solid ${b.text}`,
                              }}
                            />
                          )}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.25em] uppercase text-black mb-6 border-b-2 border-black pb-2">
                      Count Badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "Shapes", count: 3, bg: "#ff0000", text: "#fff" },
                        { label: "Colors", count: 5, bg: "#ffcc00", text: "#000" },
                        { label: "Principles", count: 7, bg: "#0000ff", text: "#fff" },
                        { label: "Rules", count: 12, bg: "#000000", text: "#ffcc00" },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm text-black font-black uppercase tracking-wider">{b.label}</span>
                          <span
                            className="w-8 h-8 flex items-center justify-center text-sm font-black border-2 border-black hover:scale-110 transition-transform duration-150 cursor-default"
                            style={{ backgroundColor: b.bg, color: b.text }}
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
      {/* 5. AI RULES — INTERACTIVE DEMOS (all 5 named rules)             */}
      {/* ================================================================ */}
      <section id="ai-rules" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-10 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-600 block mb-4">
              — Interaction Rules / AI Rules Demo
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-black uppercase leading-none">
              Named<br />
              <span className="text-yellow-400" style={{ WebkitTextStroke: "3px #000" }}>AI Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-16">
            <p className="text-black font-bold text-base max-w-xl uppercase tracking-wide leading-snug mt-6 opacity-70">
              Five named interaction patterns from the Bauhaus aiRules specification.
              Click, hover, and interact with each demo to experience the rule in action.
            </p>
          </RevealBlock>

          {/* ---- Rule 1: Structural Shifts ---- */}
          <RevealBlock delay={0.08} className="mb-12">
            <div className="border-4 border-black">
              {/* Rule header */}
              <div className="bg-red-600 border-b-4 border-black p-6 flex items-center gap-4">
                <div className="w-8 h-8 bg-white border-2 border-black shrink-0 flex items-center justify-center">
                  <span className="font-black text-red-600 text-xs">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white">
                    Structural Shifts
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-white opacity-70 mt-0.5">
                    Animation shows "structure" — hard displacement and large solid color blocks sliding to cover each other
                  </p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-black mb-6 opacity-50">
                  Click each discipline block to shift the active structural section:
                </p>

                {/* Interactive structural blocks */}
                <div className="flex flex-col md:flex-row gap-0 border-4 border-black overflow-hidden mb-6">
                  {[
                    { label: "Architecture", color: "#ff0000", textColor: "#ffffff" },
                    { label: "Craft", color: "#ffcc00", textColor: "#000000" },
                    { label: "Fine Arts", color: "#0000ff", textColor: "#ffffff" },
                    { label: "Technology", color: "#000000", textColor: "#ffffff" },
                  ].map((block, i) => (
                    <div
                      key={block.label}
                      className="flex-1 relative overflow-hidden cursor-pointer border-r-2 border-black last:border-r-0"
                      onClick={() => setStructuralActive(i)}
                      style={{ minHeight: "120px" }}
                    >
                      {/* Base (inactive) */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        <span className="text-xs font-black uppercase tracking-widest text-black opacity-30">
                          {block.label}
                        </span>
                      </div>
                      {/* Active color block slides in */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundColor: block.color,
                          transform: structuralActive === i ? "translateX(0)" : "translateX(-100%)",
                          transition: "transform 0.2s ease-out",
                        }}
                      >
                        <span
                          className="text-sm font-black uppercase tracking-widest"
                          style={{ color: block.textColor }}
                        >
                          {block.label}
                        </span>
                      </div>
                      {/* Click hint */}
                      <div className="absolute inset-0 pointer-events-none border-2 border-transparent" />
                    </div>
                  ))}
                </div>

                <div className="bg-black p-4">
                  <code className="text-yellow-400 text-xs font-mono">
                    {`/* Structural Shifts — hard displacement */\n/* Active block: "${["Architecture", "Craft", "Fine Arts", "Technology"][structuralActive]}" */\ntransform: translateX(-100%) → translateX(0);\ntransition: transform 0.2s ease-out;\n/* Large solid color block covers previous — no fade */`}
                  </code>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Rule 2: Mechanical Precision ---- */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="border-4 border-black">
              <div className="bg-yellow-400 border-b-4 border-black p-6 flex items-center gap-4">
                <div className="w-8 h-8 bg-black border-2 border-black shrink-0 flex items-center justify-center">
                  <span className="font-black text-yellow-400 text-xs">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-black">
                    Mechanical Precision
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-black opacity-60 mt-0.5">
                    Transitions are short, sharp, powerful — duration-150 or duration-200, always ease-out, never ease-in-out
                  </p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-black mb-6 opacity-50">
                  Click each button — feel the snap difference between allowed and forbidden timing:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "150ms ease-out", ms: 150, easing: "ease-out", bg: "#ff0000", text: "#fff", allowed: true },
                    { label: "200ms ease-out", ms: 200, easing: "ease-out", bg: "#ffcc00", text: "#000", allowed: true },
                    { label: "300ms ease-out", ms: 300, easing: "ease-out", bg: "#0000ff", text: "#fff", allowed: false },
                    { label: "500ms ease-in-out", ms: 500, easing: "ease-in-out", bg: "#666", text: "#fff", allowed: false },
                  ].map((btn, i) => (
                    <div key={btn.label} className="flex flex-col gap-2">
                      <button
                        className="py-4 font-black uppercase tracking-wider text-xs border-4 border-black active:translate-y-1"
                        style={{
                          backgroundColor: mechanicalClicked === i ? btn.bg : "#ffffff",
                          color: mechanicalClicked === i ? btn.text : "#000000",
                          transition: `background-color ${btn.ms}ms ${btn.easing}, color ${btn.ms}ms ${btn.easing}`,
                        }}
                        onClick={() => {
                          setMechanicalClicked(i);
                          setTimeout(() => setMechanicalClicked(null), btn.ms + 50);
                        }}
                      >
                        Click
                      </button>
                      <div className="text-center">
                        <span
                          className="text-[10px] font-black uppercase tracking-wider block"
                          style={{ color: btn.allowed ? "#000" : "#666" }}
                        >
                          {btn.label}
                        </span>
                        {!btn.allowed && (
                          <span className="text-[9px] font-black uppercase text-red-500 block mt-0.5">
                            BANNED
                          </span>
                        )}
                        {btn.allowed && (
                          <span className="text-[9px] font-black uppercase text-green-600 block mt-0.5">
                            ALLOWED
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar demo with mechanical timing */}
                <div className="border-4 border-black p-6 mb-4">
                  <p className="text-xs font-black uppercase tracking-widest text-black mb-4 opacity-50">
                    Progress Bar — Mechanical step controls (duration-200 ease-out):
                  </p>
                  <div className="h-8 bg-white border-4 border-black mb-4 overflow-hidden">
                    <div
                      className="h-full bg-red-600"
                      style={{ width: `${progressValue}%`, transition: "width 0.2s ease-out" }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="px-5 py-2 bg-white text-black font-black uppercase tracking-wider text-xs border-4 border-black hover:bg-black hover:text-white transition-colors duration-150 active:translate-y-0.5"
                      onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                    >
                      −10
                    </button>
                    <span className="font-black text-2xl tabular-nums">{progressValue}%</span>
                    <button
                      className="px-5 py-2 bg-red-600 text-white font-black uppercase tracking-wider text-xs border-4 border-black hover:bg-black transition-colors duration-150 active:translate-y-0.5"
                      onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                    >
                      +10
                    </button>
                    <button
                      className="px-5 py-2 bg-black text-yellow-400 font-black uppercase tracking-wider text-xs border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors duration-150 active:translate-y-0.5"
                      onClick={() => setProgressValue(62)}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="bg-black p-4">
                  <code className="text-yellow-400 text-xs font-mono">
                    {`/* Mechanical Precision Rule */\ntransition-duration: 150ms | 200ms  ← ALLOWED\ntransition-duration: 300ms | 500ms  ← BANNED\ntransition-timing: ease-out          ← REQUIRED\ntransition-timing: ease-in-out       ← BANNED`}
                  </code>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Rule 3: Primary Color Swaps ---- */}
          <RevealBlock delay={0.12} className="mb-12">
            <div className="border-4 border-black">
              <div className="bg-blue-600 border-b-4 border-black p-6 flex items-center gap-4">
                <div className="w-8 h-8 bg-white border-2 border-black shrink-0 flex items-center justify-center">
                  <span className="font-black text-blue-600 text-xs">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white">
                    Primary Color Swaps
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-white opacity-70 mt-0.5">
                    On interaction, colors hard-switch between Red, Yellow, Blue, Black, White — zero transparency fade, zero gradient
                  </p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-black mb-6 opacity-50">
                  Click the main block or the color selectors to cycle — hard cut, no gradient:
                </p>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Main color swap block */}
                  <div
                    className="flex-1 min-h-52 border-4 border-black flex flex-col items-center justify-center cursor-pointer select-none"
                    style={{
                      backgroundColor: currentSwap.bg,
                      transition: "background-color 0.15s ease-out",
                    }}
                    onClick={() => setColorSwapIndex((s) => (s + 1) % colorSwapOptions.length)}
                  >
                    <div
                      className="text-5xl font-black uppercase tracking-widest mb-2"
                      style={{ color: currentSwap.text, transition: "color 0.15s ease-out" }}
                    >
                      {currentSwap.label}
                    </div>
                    <div
                      className="text-xs font-black uppercase tracking-widest opacity-50"
                      style={{ color: currentSwap.text }}
                    >
                      Click to swap color
                    </div>
                  </div>

                  {/* Color selector buttons */}
                  <div className="flex md:flex-col gap-2">
                    {colorSwapOptions.map((c, i) => (
                      <button
                        key={c.label}
                        onClick={() => setColorSwapIndex(i)}
                        className="w-12 h-12 border-4 border-black hover:scale-110 transition-transform duration-150 ease-out"
                        style={{
                          backgroundColor: c.bg,
                          outline: colorSwapIndex === i ? "3px solid #ff0000" : "none",
                          outlineOffset: "2px",
                        }}
                        title={c.label}
                      />
                    ))}
                  </div>

                  {/* Code panel */}
                  <div className="md:w-64 space-y-3">
                    <div className="bg-black p-4">
                      <code className="text-yellow-400 text-xs font-mono">
                        {`/* Primary Color Swap */\nbg: ${currentSwap.bg}\ncolor: ${currentSwap.text}\ntransition: 150ms ease-out\n\n/* NO opacity fade */\n/* NO gradient blend */\n/* HARD switch only */`}
                      </code>
                    </div>
                    <div className="border-4 border-black p-4">
                      <p className="text-xs font-black uppercase text-black leading-relaxed">
                        Red → Yellow → Blue → Black → White.
                        No intermediate states. No rgba(). Pure color identity switching.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Rule 4: Geometric Reveals ---- */}
          <RevealBlock delay={0.14} className="mb-12">
            <div className="border-4 border-black">
              <div className="bg-black border-b-4 border-black p-6 flex items-center gap-4">
                <div className="w-8 h-8 bg-yellow-400 border-2 border-yellow-400 shrink-0 rounded-full flex items-center justify-center">
                  <span className="font-black text-black text-xs">04</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white">
                    Geometric Reveals
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-white opacity-60 mt-0.5">
                    Pseudo-element color blocks slide in like rail mechanisms — translateX(-100%) to translateX(0), covering the original
                  </p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-black mb-8 opacity-50">
                  Hover each card to watch the color block slide in from the left like a rail:
                </p>

                {/* Three reveal panels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black overflow-hidden mb-6">
                  {[
                    { label: "Red Slide", baseBg: "#ff0000", revealBg: "#ffcc00", baseText: "#ffffff", revealText: "#000000" },
                    { label: "Blue Slide", baseBg: "#0000ff", revealBg: "#ff0000", baseText: "#ffffff", revealText: "#ffffff" },
                    { label: "Yellow Slide", baseBg: "#ffcc00", revealBg: "#0000ff", baseText: "#000000", revealText: "#ffffff" },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="relative overflow-hidden cursor-pointer border-r-2 border-black last:border-r-0 min-h-40 flex items-center justify-center"
                      style={{ backgroundColor: item.baseBg }}
                      onMouseEnter={() => setRevealHovered(i)}
                      onMouseLeave={() => setRevealHovered(null)}
                    >
                      {/* Base text */}
                      <span
                        className="relative z-10 text-sm font-black uppercase tracking-widest transition-colors duration-100"
                        style={{ color: revealHovered === i ? item.revealText : item.baseText }}
                      >
                        {revealHovered === i ? "Revealed!" : item.label}
                      </span>
                      {/* Sliding color overlay */}
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundColor: item.revealBg,
                          transform: revealHovered === i ? "translateX(0)" : "translateX(-100%)",
                          transition: "transform 0.2s ease-out",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Button reveal demos */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <button className="group relative px-8 py-4 bg-red-600 text-white font-black uppercase tracking-wider text-sm border-4 border-black overflow-hidden hover:text-black active:translate-y-1 transition-colors duration-150">
                    <span className="relative z-10">Hover Me</span>
                    <div className="absolute inset-0 bg-yellow-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                  </button>
                  <button className="group relative px-8 py-4 bg-black text-white font-black uppercase tracking-wider text-sm border-4 border-black overflow-hidden hover:text-black active:translate-y-1 transition-colors duration-150">
                    <span className="relative z-10">Slide Reveal</span>
                    <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                  </button>
                  <button className="group relative px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-wider text-sm border-4 border-black overflow-hidden hover:text-black active:translate-y-1 transition-colors duration-150">
                    <span className="relative z-10">Rail Effect</span>
                    <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                  </button>
                </div>

                <div className="bg-black p-4">
                  <code className="text-yellow-400 text-xs font-mono">
                    {`/* Geometric Reveal — Rail Mechanism */\n.slide-reveal { position: relative; overflow: hidden; }\n\n/* Color overlay */\n.overlay { position: absolute; inset: 0; }\n.overlay { transform: translateX(-100%); }\n.overlay { transition: transform 0.2s ease-out; } /* REQUIRED */\n\n.parent:hover .overlay { transform: translateX(0); }`}
                  </code>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Rule 5: Geometric Animation ---- */}
          <RevealBlock delay={0.16}>
            <div className="border-4 border-black">
              <div className="bg-yellow-400 border-b-4 border-black p-6 flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-600 border-2 border-black shrink-0 flex items-center justify-center">
                  <span className="font-black text-yellow-400 text-xs">05</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider text-black">
                    Geometric Animation
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-black opacity-60 mt-0.5">
                    Geometric decorators scale-125 or rotate-45 on hover — mechanical rotation and growth, machine-age precision
                  </p>
                </div>
              </div>

              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-widest text-black mb-8 opacity-50">
                  Hover each shape to see mechanical animation — scale-125 or rotate-45:
                </p>

                <div className="flex flex-wrap gap-14 items-end justify-center mb-10">
                  {/* Circle — scale-125 */}
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="w-24 h-24 bg-yellow-400 rounded-full border-4 border-black cursor-pointer"
                      style={{
                        transform: shapeHovered === "ga-circle" ? "scale(1.25)" : "scale(1)",
                        transition: "transform 0.2s ease-out",
                      }}
                      onMouseEnter={() => setShapeHovered("ga-circle")}
                      onMouseLeave={() => setShapeHovered(null)}
                    />
                    <div className="text-center">
                      <div className="text-xs font-black uppercase tracking-widest">Circle</div>
                      <div className="text-[10px] font-bold uppercase opacity-50 mt-1">scale-125</div>
                    </div>
                  </div>

                  {/* Square — rotate-45 */}
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="w-24 h-24 bg-blue-600 border-4 border-black cursor-pointer"
                      style={{
                        transform: shapeHovered === "ga-square" ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease-out",
                      }}
                      onMouseEnter={() => setShapeHovered("ga-square")}
                      onMouseLeave={() => setShapeHovered(null)}
                    />
                    <div className="text-center">
                      <div className="text-xs font-black uppercase tracking-widest">Square</div>
                      <div className="text-[10px] font-bold uppercase opacity-50 mt-1">rotate-45</div>
                    </div>
                  </div>

                  {/* Triangle — scale + rotate */}
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="cursor-pointer"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "48px solid transparent",
                        borderRight: "48px solid transparent",
                        borderBottom: "83px solid #ff0000",
                        transform: shapeHovered === "ga-triangle" ? "scale(1.25) rotate(180deg)" : "scale(1) rotate(0deg)",
                        transition: "transform 0.2s ease-out",
                      }}
                      onMouseEnter={() => setShapeHovered("ga-triangle")}
                      onMouseLeave={() => setShapeHovered(null)}
                    />
                    <div className="text-center mt-6">
                      <div className="text-xs font-black uppercase tracking-widest">Triangle</div>
                      <div className="text-[10px] font-bold uppercase opacity-50 mt-1">scale + rotate-180</div>
                    </div>
                  </div>

                  {/* Composite card — all decorators animate together */}
                  <div
                    className="group relative p-8 bg-white border-4 border-black cursor-pointer hover:-translate-y-2 transition-transform duration-200 ease-out"
                    style={{ minWidth: "200px" }}
                    onMouseEnter={() => setShapeHovered("ga-card")}
                    onMouseLeave={() => setShapeHovered(null)}
                  >
                    {/* Yellow circle */}
                    <div
                      className="absolute -top-5 -left-5 w-10 h-10 bg-yellow-400 rounded-full border-4 border-black"
                      style={{
                        transform: shapeHovered === "ga-card" ? "scale(1.3)" : "scale(1)",
                        transition: "transform 0.2s ease-out",
                      }}
                    />
                    {/* Blue square */}
                    <div
                      className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600 border-4 border-black"
                      style={{
                        transform: shapeHovered === "ga-card" ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease-out",
                      }}
                    />
                    <h4
                      className="text-xl font-black uppercase tracking-wider mt-4"
                      style={{
                        color: shapeHovered === "ga-card" ? "#ff0000" : "#000000",
                        transition: "color 0.15s ease-out",
                      }}
                    >
                      Composite
                    </h4>
                    <p className="text-xs font-bold uppercase text-black opacity-50 mt-1">
                      Both decorators animate together
                    </p>
                  </div>
                </div>

                <div className="bg-black p-4">
                  <code className="text-yellow-400 text-xs font-mono">
                    {`/* Geometric Animation Rule */\n/* Circle:   */ group-hover:scale-125\n/* Square:   */ group-hover:rotate-45\n/* Both:     */ transition-transform duration-200 ease-out\n/* Card:     */ hover:-translate-y-2 (lift)\n/* Color:    */ group-hover:text-red-600 duration-150`}
                  </code>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. APP DEMO — Design Studio Dashboard                           */}
      {/* ================================================================ */}
      <section id="app" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-10 bg-black border-t-4 border-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-red-600 block mb-4">
              — App Demo / Anwendung
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase leading-none">
              Bauhaus<br />
              <span className="text-yellow-400">Studio</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white font-bold text-base max-w-lg uppercase tracking-wide leading-snug mt-6 opacity-70">
              A design school project management interface — showing the complete
              Bauhaus design system applied to a functional UI context.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-white">
            {/* Sidebar */}
            <RevealBlock delay={0.1} className="border-r-4 border-white">
              <div className="bg-black p-8 h-full">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-4 border-white">
                  <div className="w-6 h-6 bg-red-600 border-2 border-white" />
                  <span className="text-white font-black uppercase tracking-widest text-sm">Bauhaus Studio</span>
                </div>

                {[
                  { label: "Architecture", count: 12, color: "#ff0000", active: true },
                  { label: "Typography", count: 8, color: "#ffcc00", active: false },
                  { label: "Graphic Arts", count: 15, color: "#0000ff", active: false },
                  { label: "Industrial", count: 6, color: "#ffffff", active: false },
                  { label: "Photography", count: 9, color: "#ff0000", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center justify-between py-3 border-b-2 border-white border-opacity-20 cursor-pointer hover:px-2 transition-all duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 border-2 border-white"
                        style={{ backgroundColor: item.active ? item.color : "transparent" }}
                      />
                      <span className="text-white font-bold uppercase tracking-wider text-sm">{item.label}</span>
                    </div>
                    <span className="text-white text-xs font-black w-6 h-6 flex items-center justify-center border-2 border-white opacity-60">
                      {item.count}
                    </span>
                  </div>
                ))}

                <button
                  className="group relative w-full mt-8 py-3 bg-red-600 text-white font-black uppercase tracking-widest text-sm border-4 border-white overflow-hidden hover:text-black transition-colors duration-150"
                  onClick={() => showNotification("New project created")}
                >
                  <span className="relative z-10">New Project</span>
                  <div className="absolute inset-0 bg-yellow-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
                </button>
              </div>
            </RevealBlock>

            {/* Main content */}
            <RevealBlock delay={0.14} className="md:col-span-2">
              <div className="bg-white p-8 h-full">
                <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
                  <h3 className="text-2xl font-black uppercase tracking-wider text-black">
                    Active Projects
                  </h3>
                  <div className="flex gap-0">
                    <button className="px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black">
                      Grid
                    </button>
                    <button className="px-4 py-2 bg-white text-black text-xs font-black uppercase tracking-widest border-2 border-black border-l-0 hover:bg-black hover:text-white transition-colors duration-150">
                      List
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: "Workshop Chair", phase: "Production", pct: 75, phaseColor: "#ff0000" },
                    { title: "Typography Poster", phase: "Design", pct: 40, phaseColor: "#ffcc00" },
                    { title: "Steel Lamp", phase: "Prototype", pct: 90, phaseColor: "#0000ff" },
                    { title: "Weaving Pattern", phase: "Research", pct: 25, phaseColor: "#000000" },
                  ].map((proj) => (
                    <div
                      key={proj.title}
                      className="group relative border-4 border-black p-5 cursor-pointer hover:-translate-y-1 transition-transform duration-150 overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-base font-black uppercase tracking-wide text-black group-hover:text-red-600 transition-colors duration-150">
                            {proj.title}
                          </h4>
                          <span
                            className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 mt-1 inline-block border-2 border-black"
                            style={{
                              backgroundColor: proj.phaseColor,
                              color: proj.phaseColor === "#ffcc00" ? "#000" : "#fff",
                            }}
                          >
                            {proj.phase}
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 border-2 border-black"
                          style={{ backgroundColor: proj.phaseColor }}
                        />
                      </div>
                      <div className="h-2 bg-gray-100 border-2 border-black overflow-hidden">
                        <div
                          className="h-full transition-all duration-200"
                          style={{ width: `${proj.pct}%`, backgroundColor: proj.phaseColor }}
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs font-black uppercase text-black opacity-40">Progress</span>
                        <span className="text-xs font-black uppercase" style={{ color: proj.phaseColor }}>
                          {proj.pct}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-0 border-4 border-black">
                  {[
                    { label: "Active", value: "4", bg: "#ff0000", text: "#fff" },
                    { label: "Complete", value: "12", bg: "#0000ff", text: "#fff" },
                    { label: "Members", value: "8", bg: "#ffcc00", text: "#000" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="p-5 text-center border-r-2 border-black last:border-r-0 hover:-translate-y-1 transition-transform duration-150 cursor-default"
                      style={{ backgroundColor: stat.bg }}
                    >
                      <div className="text-3xl font-black" style={{ color: stat.text }}>
                        {stat.value}
                      </div>
                      <div
                        className="text-xs font-black uppercase tracking-widest mt-1"
                        style={{ color: stat.text, opacity: 0.7 }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T — Design Philosophy                               */}
      {/* ================================================================ */}
      <section id="philosophy" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-10 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-black block mb-4">
              — Design Rules / Gestaltungsregeln
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-black uppercase leading-none">
              Bauhaus<br />
              <span className="text-red-600">Law</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-black font-bold text-base max-w-xl uppercase tracking-wide leading-snug mt-6 opacity-70">
              The Bauhaus was strict about what belonged in design and what did not.
              Form follows function. These rules are non-negotiable.
            </p>
          </RevealBlock>

          {/* Principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black mb-14">
            {[
              {
                icon: "circle",
                iconColor: "#ffcc00",
                title: "Functionalism",
                tagline: "Design serves purpose",
                desc: "Every element must justify its existence through function. Remove anything serving only decoration. Shape arises from purpose.",
                items: ["Geometric sans-serif type", "Grid-based layouts", "Primary color hierarchy"],
                bg: "#ff0000",
                text: "#ffffff",
              },
              {
                icon: "square",
                iconColor: "#ff0000",
                title: "Geometry",
                tagline: "Pure form language",
                desc: "Circle, square, triangle — the three primary forms from which all design emerges. No organic curves. Only structure.",
                items: ["Circle — completeness", "Square — stability", "Triangle — direction"],
                bg: "#ffcc00",
                text: "#000000",
              },
              {
                icon: "triangle",
                iconColor: "#0000ff",
                title: "Unity",
                tagline: "Art meets industry",
                desc: "Bauhaus unified fine arts with industrial craft. Machine production is not the enemy of beauty — it is its modern medium.",
                items: ["Craft + industry", "Art + technology", "Individual + collective"],
                bg: "#0000ff",
                text: "#ffffff",
              },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.08}>
                <div
                  className="group p-10 border-r-2 border-black last:border-r-0 h-full cursor-default"
                  style={{ backgroundColor: card.bg }}
                >
                  <div className="mb-8">
                    {card.icon === "circle" && (
                      <div
                        className="w-16 h-16 rounded-full border-4 border-black group-hover:scale-125 transition-transform duration-200 ease-out"
                        style={{ backgroundColor: card.iconColor }}
                      />
                    )}
                    {card.icon === "square" && (
                      <div
                        className="w-16 h-16 border-4 border-black group-hover:rotate-45 transition-transform duration-200 ease-out"
                        style={{ backgroundColor: card.iconColor }}
                      />
                    )}
                    {card.icon === "triangle" && (
                      <div
                        className="w-0 h-0 group-hover:scale-125 transition-transform duration-200 ease-out"
                        style={{
                          borderLeft: "32px solid transparent",
                          borderRight: "32px solid transparent",
                          borderBottom: `55px solid ${card.iconColor}`,
                        }}
                      />
                    )}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-1" style={{ color: card.text }}>
                    {card.title}
                  </h3>
                  <p className="text-xs font-black uppercase tracking-widest mb-6 opacity-60" style={{ color: card.text }}>
                    {card.tagline}
                  </p>
                  <p className="font-bold text-sm leading-relaxed mb-6" style={{ color: card.text, opacity: 0.85 }}>
                    {card.desc}
                  </p>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider" style={{ color: card.text }}>
                        <span className="w-2 h-2 border-2 shrink-0" style={{ borderColor: card.text, backgroundColor: card.text }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
            <RevealBlock delay={0.1}>
              <div className="bg-black p-10 border-r-2 border-white h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 bg-yellow-400 border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider text-white">Bauhaus Mandates</h3>
                </div>
                <ul className="space-y-4">
                  {DO_LIST.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm font-bold text-white leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 bg-yellow-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div className="bg-red-600 p-10 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 bg-white border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider text-white">Strictly Forbidden</h3>
                </div>
                <ul className="space-y-4">
                  {DONT_LIST.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm font-bold text-white leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 bg-white shrink-0" />
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
      {/* 8. FEATURE HIGHLIGHTS                                            */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-10 bg-yellow-400 border-t-4 border-black border-b-4">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-black block mb-4">
              — Key Principles
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-black uppercase leading-none">
              What Makes<br />
              Bauhaus
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border-4 border-black">
            {[
              { shape: "circle", shapeColor: "#ff0000", title: "Primary Colors", desc: "Red, yellow, blue — the three pigments of all color theory. Plus black and white. Nothing else permitted.", bg: "#ffffff", textWhite: false },
              { shape: "square", shapeColor: "#0000ff", title: "No Ornament", desc: "Adolf Loos: Ornament is crime. Every element earns its place through function. Beauty is structural clarity.", bg: "#000000", textWhite: true },
              { shape: "triangle", shapeColor: "#ffcc00", title: "Grid First", desc: "The invisible 12-column grid governs all composition. Nothing floats. Everything aligns.", bg: "#ffffff", textWhite: false },
              { shape: "circle", shapeColor: "#ffcc00", title: "Mechanical Motion", desc: "Interactions snap like precision instruments. duration-150, ease-out. Machine age UI form.", bg: "#0000ff", textWhite: true },
              { shape: "square", shapeColor: "#ff0000", title: "Type As Structure", desc: "Letters are architecture. Sans-serif, bold, uppercase. Typography communicates form before meaning.", bg: "#ffffff", textWhite: false },
              { shape: "triangle", shapeColor: "#0000ff", title: "Art + Industry", desc: "Bauhaus unified the workshop with the studio. Design is both handcraft and machine production.", bg: "#ff0000", textWhite: true },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div
                  className="group p-8 border-r-2 border-b-2 border-black h-full cursor-default hover:-translate-y-1 transition-transform duration-150"
                  style={{ backgroundColor: feature.bg }}
                >
                  <div className="mb-6">
                    {feature.shape === "circle" && (
                      <div
                        className="w-14 h-14 rounded-full border-4 border-black group-hover:scale-125 transition-transform duration-200 ease-out"
                        style={{ backgroundColor: feature.shapeColor }}
                      />
                    )}
                    {feature.shape === "square" && (
                      <div
                        className="w-14 h-14 border-4 border-black group-hover:rotate-45 transition-transform duration-200 ease-out"
                        style={{ backgroundColor: feature.shapeColor }}
                      />
                    )}
                    {feature.shape === "triangle" && (
                      <div
                        className="w-0 h-0 group-hover:scale-110 transition-transform duration-200 ease-out"
                        style={{
                          borderLeft: "28px solid transparent",
                          borderRight: "28px solid transparent",
                          borderBottom: `48px solid ${feature.shapeColor}`,
                        }}
                      />
                    )}
                  </div>
                  <h4
                    className="text-xl font-black uppercase tracking-wider mb-3"
                    style={{ color: feature.textWhite ? "#ffffff" : "#000000" }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className="text-sm font-bold leading-relaxed"
                    style={{ color: feature.textWhite ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}
                  >
                    {feature.desc}
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
      <footer className="bg-black border-t-4 border-white">
        {/* Top color bar */}
        <div className="flex h-2">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-blue-600" />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-4 border-white mb-12">
            {/* Brand */}
            <div className="md:col-span-2 p-10 border-r-2 border-white">
              <div className="flex items-center gap-0 mb-6">
                <div className="w-8 h-8 bg-red-600 border-2 border-white" />
                <div className="w-8 h-8 bg-yellow-400 border-2 border-white border-l-0" />
                <div className="w-8 h-8 bg-blue-600 border-2 border-white border-l-0" />
                <span className="ml-4 text-xl font-black uppercase tracking-widest text-white">Bauhaus</span>
              </div>
              <p className="text-white font-bold text-sm uppercase tracking-wide leading-relaxed max-w-xs mb-6 opacity-70">
                The Bauhaus school 1919–1933, Germany.
                Primary colors. Geometric precision. Form follows function.
                Its principles continue to define modern design.
              </p>
              <div className="flex gap-0">
                {PALETTE.map((c) => (
                  <div
                    key={c.hex}
                    className="w-8 h-8 border-2 border-white hover:scale-110 transition-transform duration-150 cursor-default"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Style links */}
            <div className="p-10 border-r-2 border-white">
              <span className="text-xs font-black tracking-[0.25em] uppercase text-yellow-400 block mb-6">
                Style
              </span>
              <div className="flex flex-col gap-3">
                <Link
                  href="/styles/bauhaus"
                  className="text-white text-sm font-black uppercase tracking-wider hover:text-yellow-400 transition-colors duration-150"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/bauhaus/showcase"
                  className="text-white text-sm font-black uppercase tracking-wider hover:text-red-600 transition-colors duration-150"
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/bauhaus/cover"
                  className="text-white text-sm font-black uppercase tracking-wider hover:text-blue-400 transition-colors duration-150"
                >
                  Cover
                </Link>
              </div>
            </div>

            {/* StyleKit links */}
            <div className="p-10">
              <span className="text-xs font-black tracking-[0.25em] uppercase text-red-600 block mb-6">
                StyleKit
              </span>
              <div className="flex flex-col gap-3 mb-8">
                <Link
                  href="/"
                  className="text-white text-sm font-black uppercase tracking-wider hover:text-yellow-400 transition-colors duration-150"
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="text-white text-sm font-black uppercase tracking-wider hover:text-red-600 transition-colors duration-150"
                >
                  All Styles
                </Link>
              </div>
              <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-400 block mb-4">
                Palette
              </span>
              {PALETTE.map((c) => (
                <div key={c.name} className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 border border-white" style={{ backgroundColor: c.hex }} />
                  <span className="text-white text-xs font-bold uppercase tracking-wider opacity-60">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex h-1 mb-8">
            <div className="flex-1 bg-red-600 opacity-60" />
            <div className="flex-1 bg-yellow-400 opacity-60" />
            <div className="flex-1 bg-blue-600 opacity-60" />
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-white text-sm font-black uppercase tracking-wider">
              <div className="w-4 h-4 bg-red-600 border border-white" />
              <span>Bauhaus — Form Follows Function — 1919</span>
            </div>
            <Link
              href="/"
              className="group relative px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-sm border-4 border-white overflow-hidden hover:text-white transition-colors duration-150"
            >
              <span className="relative z-10">Back to StyleKit</span>
              <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
