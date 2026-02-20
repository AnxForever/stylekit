"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook (inline, mandatory)                      */
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
/*  RevealBlock (inline, mandatory)                                     */
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
/*  Constants & Data                                                    */
/* ------------------------------------------------------------------ */

type AccentKey = "red" | "blue" | "yellow";

const ACCENTS: Record<AccentKey, { hex: string; bg: string; text: string; border: string; label: string }> = {
  red: { hex: "#ff0000", bg: "bg-[#ff0000]", text: "text-white", border: "border-[#ff0000]", label: "RED" },
  blue: { hex: "#0000ff", bg: "bg-[#0000ff]", text: "text-white", border: "border-[#0000ff]", label: "BLUE" },
  yellow: { hex: "#ffff00", bg: "bg-[#ffff00]", text: "text-black", border: "border-[#ffff00]", label: "YELLOW" },
};

const COLOR_SWATCHES = [
  { name: "BLACK", hex: "#000000", bg: "bg-black", text: "text-white", role: "STRUCTURE / GROUND", shape: "square" },
  { name: "WHITE", hex: "#ffffff", bg: "bg-white", text: "text-black", role: "SPACE / VOID", shape: "circle", extraBorder: true },
  { name: "RED", hex: "#ff0000", bg: "bg-[#ff0000]", text: "text-white", role: "ACTION / ENERGY", shape: "circle" },
  { name: "BLUE", hex: "#0000ff", bg: "bg-[#0000ff]", text: "text-white", role: "DEPTH / LOGIC", shape: "triangle" },
  { name: "YELLOW", hex: "#ffff00", bg: "bg-[#ffff00]", text: "text-black", role: "CAUTION / ACCENT", shape: "square" },
];

const SHAPE_DEMOS = [
  {
    name: "CIRCLE",
    color: "#ff0000",
    desc: "Perfect symmetry. No beginning, no end. Unity and dynamic force. Pure tension at every point on the boundary.",
    cssClass: "rounded-full",
    hoverLabel: "ROTATE + SCALE",
  },
  {
    name: "SQUARE",
    color: "#0000ff",
    desc: "Four equal sides. Rational order. Stability, containment, and democratic balance. The grid unit made visible.",
    cssClass: "rounded-none",
    hoverLabel: "SNAP + FLIP",
  },
  {
    name: "TRIANGLE",
    color: "#ffff00",
    desc: "Three points of tension. Directional force and conflict held in equilibrium. The most dynamic primary form.",
    cssClass: "rounded-none",
    hoverLabel: "STRIKE + INVERT",
  },
];

const TYPOGRAPHY_SCALE = [
  {
    label: "DISPLAY",
    sizeClass: "text-7xl md:text-8xl",
    weight: "font-black",
    tracking: "tracking-tight",
    sample: "BOLD",
  },
  {
    label: "H1",
    sizeClass: "text-5xl md:text-6xl",
    weight: "font-black",
    tracking: "tracking-tighter",
    sample: "GEOMETRIC",
  },
  {
    label: "H2",
    sizeClass: "text-3xl md:text-4xl",
    weight: "font-black",
    tracking: "tracking-tight",
    sample: "CONSTRUCTIVISM",
  },
  {
    label: "H3",
    sizeClass: "text-2xl",
    weight: "font-black",
    tracking: "tracking-widest",
    sample: "PRIMARY COLORS",
  },
  {
    label: "BODY",
    sizeClass: "text-base",
    weight: "font-normal",
    tracking: "tracking-normal",
    sample: "Strong geometric shapes define every composition. Structure is everything.",
  },
  {
    label: "LABEL",
    sizeClass: "text-xs",
    weight: "font-black",
    tracking: "tracking-[0.4em]",
    sample: "FUNCTIONAL / UPPERCASE / MONO",
  },
];

const DO_RULES = [
  "Solid color blocks — bg-black, bg-white, bg-[#ff0000], bg-[#0000ff], bg-[#ffff00]",
  "Regular geometric shapes — circle (rounded-full), square (rounded-none), triangle (SVG polygon)",
  "Oversized typography — text-6xl or larger for all hero-level headings",
  "Absolute positioning for geometric overlaps and asymmetric compositions",
  "rounded-none for squares OR rounded-full for circles — never in-between",
  "Rotation for visual dynamics — rotate-12, rotate-45, rotate-90 as snap states",
  "Maximum 3 accent colors per layout, always from the primary set",
  "font-black uppercase for all headings — weight carries the entire hierarchy",
];

const DONT_RULES = [
  "No gradients — flat solid color blocks only, always",
  "No soft or low-contrast colors — pastels contradict the system entirely",
  "No medium border-radius (rounded-lg, rounded-md) — pure squares or pure circles",
  "No shadows or blur effects — surfaces are flat and structurally honest",
  "No more than 3-4 colors in a single composition",
  "No symmetric or conventional layouts — asymmetry creates visual energy",
  "No decorative typefaces — geometric sans-serif only",
  "No gradual transitions — use hard-cut color switches (duration-100 ease-linear)",
];

const NAV_LINKS = ["HERO", "SHAPES", "COMPONENTS", "COLORS", "TYPOGRAPHY", "RULES"];

/* ------------------------------------------------------------------ */
/*  Triangle SVG helper                                                 */
/* ------------------------------------------------------------------ */

function TriangleSVG({
  size = 120,
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
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  /* --- Hero accent theme switcher --- */
  const [accentKey, setAccentKey] = useState<AccentKey>("red");
  const accent = ACCENTS[accentKey];

  /* --- Shape section hover states --- */
  const [hoveredShape, setHoveredShape] = useState<number | null>(null);

  /* --- Button active state (heavy press feedback) --- */
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  /* --- Color section active swatch --- */
  const [activeSwatch, setActiveSwatch] = useState<number | null>(null);

  /* --- Design rules filter (do/dont) --- */
  const [rulesView, setRulesView] = useState<"do" | "dont">("do");

  /* --- Component demo tab --- */
  const [componentTab, setComponentTab] = useState<"buttons" | "cards" | "inputs">("buttons");

  /* --- Notification toast --- */
  const [toast, setToast] = useState<string | null>(null);

  /* --- Input demo state --- */
  const [inputVal, setInputVal] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  /* --- useInView for hero section --- */
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: shapesRef, inView: shapesInView } = useInView();
  const { ref: footerRef, inView: footerInView } = useInView();

  function fireToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  function handleBtnPress(id: string) {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 120);
    fireToast(`${id} ACTIVATED`);
  }

  const isPressed = (id: string) => pressedBtn === id;

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ================================================================
          SECTION 1 — FIXED NAVIGATION
      ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo — geometric square mark + wordmark */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex-shrink-0">
                <div className="absolute inset-0 bg-black" />
                <div
                  className="absolute w-4 h-4 rounded-full top-0 left-0"
                  style={{ backgroundColor: accent.hex }}
                />
              </div>
              <span className="font-black uppercase tracking-[0.25em] text-sm text-black select-none">
                GEO<span style={{ color: accent.hex }}>BOLD</span>
              </span>
            </div>

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-black border-r-2 border-black last:border-r-0 hover:bg-black hover:text-white transition-colors duration-100 ease-linear"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Back link */}
            <Link
              href="/styles"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-[#ff0000] transition-colors duration-100 ease-linear"
            >
              <span>&#8592;</span>
              <span>STYLEKIT</span>
            </Link>
          </div>
        </div>

        {/* Accent bar — color theme indicator */}
        <div className="h-1 flex">
          <div
            className="transition-all duration-100 ease-linear"
            style={{ width: accentKey === "red" ? "100%" : "0%", backgroundColor: "#ff0000" }}
          />
          <div
            className="transition-all duration-100 ease-linear"
            style={{ width: accentKey === "blue" ? "100%" : "0%", backgroundColor: "#0000ff" }}
          />
          <div
            className="transition-all duration-100 ease-linear"
            style={{ width: accentKey === "yellow" ? "100%" : "0%", backgroundColor: "#ffff00" }}
          />
        </div>
      </header>

      {/* Toast notification */}
      {toast && (
        <div
          className="fixed top-20 right-4 z-50 px-6 py-3 bg-black text-white font-black uppercase tracking-[0.2em] text-xs border-4 border-black"
          style={{ borderColor: accent.hex }}
        >
          {toast}
        </div>
      )}

      {/* ================================================================
          SECTION 2 — HERO
      ================================================================ */}
      <section id="hero" className="pt-14 min-h-screen bg-white border-b-4 border-black relative overflow-hidden">

        {/* Absolutely positioned geometric decoration shapes */}
        <div
          className="absolute rounded-full transition-colors duration-100 ease-linear"
          style={{
            width: 360,
            height: 360,
            top: -80,
            right: -60,
            backgroundColor: accent.hex,
            opacity: 0.95,
          }}
        />
        <div
          className="absolute transition-colors duration-100 ease-linear"
          style={{
            width: 220,
            height: 220,
            bottom: 60,
            left: -40,
            backgroundColor: "#000000",
          }}
        />
        <div
          className="absolute transition-all duration-100 ease-linear"
          style={{
            width: 140,
            height: 140,
            bottom: 180,
            right: 120,
            backgroundColor: accentKey === "yellow" ? "#ff0000" : "#ffff00",
          }}
        />
        {/* Small accent dot */}
        <div
          className="absolute rounded-full bg-black"
          style={{ width: 48, height: 48, top: 220, right: 280 }}
        />

        {/* Hero content */}
        <div
          ref={heroRef}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[calc(100vh-56px)]"
        >
          {/* Left — massive typography */}
          <div
            className="md:col-span-7"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(48px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <p
              className="text-xs font-black uppercase tracking-[0.4em] mb-6 transition-colors duration-100 ease-linear"
              style={{ color: accent.hex }}
            >
              BAUHAUS / CONSTRUCTIVISM / 2024
            </p>

            <h1 className="font-black uppercase leading-none tracking-tight mb-8">
              <span
                className="block text-[clamp(4rem,12vw,9rem)] text-black"
              >
                GEO
              </span>
              <span
                className="block text-[clamp(4rem,12vw,9rem)] transition-colors duration-100 ease-linear"
                style={{ color: accent.hex }}
              >
                METRIC
              </span>
              <span
                className="block text-[clamp(4rem,12vw,9rem)] text-black"
              >
                BOLD.
              </span>
            </h1>

            <p className="text-sm md:text-base font-medium text-black max-w-md leading-relaxed border-l-4 border-black pl-4 mb-10">
              Inspired by Bauhaus and Constructivism. Strong geometric shapes,
              bold color blocks, dynamic asymmetric composition.
              Each page is a work of art.
            </p>

            {/* CTA with hard shadow — accent switchable */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="relative px-8 py-4 font-black uppercase tracking-[0.2em] text-sm transition-all duration-100 ease-linear select-none border-4 border-black"
                style={{
                  backgroundColor: accent.hex,
                  color: accentKey === "yellow" ? "#000000" : "#ffffff",
                  boxShadow: isPressed("cta-explore") ? "none" : "6px 6px 0 #000000",
                  transform: isPressed("cta-explore") ? "translate(6px, 6px)" : "translate(0, 0)",
                }}
                onClick={() => handleBtnPress("cta-explore")}
              >
                EXPLORE SYSTEM
              </button>
              <button
                className="px-8 py-4 font-black uppercase tracking-[0.2em] text-sm border-4 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-100 ease-linear select-none"
                style={{
                  boxShadow: isPressed("cta-learn") ? "none" : "6px 6px 0 #000000",
                  transform: isPressed("cta-learn") ? "translate(6px, 6px)" : "translate(0, 0)",
                  transition: "box-shadow 0.1s linear, transform 0.1s linear, background-color 0.1s linear, color 0.1s linear",
                }}
                onClick={() => handleBtnPress("cta-learn")}
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right — accent theme switcher panel */}
          <div
            className="md:col-span-5 flex flex-col gap-0 border-4 border-black"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(48px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <div className="bg-black px-6 py-3 border-b-4 border-black">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white">
                ACCENT COLOR SWITCHER
              </p>
            </div>
            {(["red", "blue", "yellow"] as AccentKey[]).map((key) => {
              const a = ACCENTS[key];
              const isActive = accentKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setAccentKey(key)}
                  className="group flex items-center gap-6 px-6 py-5 border-b-4 border-black last:border-b-0 transition-colors duration-100 ease-linear"
                  style={{
                    backgroundColor: isActive ? a.hex : "#ffffff",
                    color: isActive ? (key === "yellow" ? "#000000" : "#ffffff") : "#000000",
                  }}
                >
                  <div
                    className="w-8 h-8 flex-shrink-0 border-4 border-black transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: isActive ? (key === "yellow" ? "#000000" : "#ffffff") : a.hex,
                      borderRadius: key === "red" ? "50%" : "0",
                    }}
                  />
                  <div className="text-left">
                    <p className="font-black uppercase tracking-[0.25em] text-sm">{a.label}</p>
                    <p
                      className="font-mono text-xs tracking-widest mt-0.5 transition-colors duration-100 ease-linear"
                      style={{ color: isActive ? (key === "yellow" ? "#00000099" : "#ffffff99") : "#00000066" }}
                    >
                      {a.hex}
                    </p>
                  </div>
                  {isActive && (
                    <div
                      className="ml-auto w-4 h-4 border-4 border-black"
                      style={{ backgroundColor: key === "yellow" ? "#000000" : "#ffffff" }}
                    />
                  )}
                </button>
              );
            })}

            {/* Geometric composition preview */}
            <div
              className="border-t-4 border-black p-6 bg-white flex items-center justify-center"
              style={{ minHeight: 120 }}
            >
              <div className="relative w-24 h-24">
                <div
                  className="absolute inset-0 border-4 border-black transition-colors duration-100 ease-linear"
                  style={{ backgroundColor: accent.hex }}
                />
                <div
                  className="absolute rounded-full border-4 border-black bg-white"
                  style={{ width: 40, height: 40, top: -12, left: -12 }}
                />
                <div
                  className="absolute bg-black"
                  style={{ width: 28, height: 28, bottom: -8, right: -8 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom structural band */}
        <div className="absolute bottom-0 left-0 right-0 flex border-t-4 border-black">
          <div className="flex-1 h-3 bg-black" />
          <div className="h-3 w-16" style={{ backgroundColor: accent.hex }} />
          <div className="h-3 w-8 bg-black" />
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — SHAPE SYSTEM
      ================================================================ */}
      <section id="shapes" className="py-24 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="flex items-end gap-6 border-b-4 border-black pb-6">
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-black">
                SHAPE SYSTEM
              </h2>
              <div className="flex gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-[#ff0000] border-2 border-black" />
                <div className="w-6 h-6 bg-[#0000ff] border-2 border-black" />
                <TriangleSVG size={28} fill="#ffff00" strokeWidth={2} />
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-black mt-4">
              HOVER TO TRIGGER SHAPE MUTATION — INSTANT GEOMETRIC SNAP
            </p>
          </RevealBlock>

          {/* Three shape primitives */}
          <div
            ref={shapesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black mb-12"
          >
            {SHAPE_DEMOS.map((shape, i) => {
              const hovered = hoveredShape === i;
              return (
                <div
                  key={shape.name}
                  className="border-r-4 border-black last:border-r-0 p-10 md:p-12 cursor-pointer select-none group"
                  style={{
                    opacity: shapesInView ? 1 : 0,
                    transform: shapesInView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                    backgroundColor: hovered ? shape.color : "#ffffff",
                  }}
                  onMouseEnter={() => setHoveredShape(i)}
                  onMouseLeave={() => setHoveredShape(null)}
                >
                  {/* Shape display */}
                  <div className="flex justify-center mb-8 h-40 items-center">
                    {shape.name === "CIRCLE" && (
                      <div
                        className="w-36 h-36 rounded-full border-4 border-black transition-all duration-100 ease-linear"
                        style={{
                          backgroundColor: hovered ? "#ffffff" : shape.color,
                          transform: hovered ? "rotate(180deg) scale(1.1)" : "rotate(0deg) scale(1)",
                        }}
                      />
                    )}
                    {shape.name === "SQUARE" && (
                      <div
                        className="w-36 h-36 border-4 border-black transition-all duration-100 ease-linear"
                        style={{
                          backgroundColor: hovered ? "#ffffff" : shape.color,
                          transform: hovered ? "rotate(45deg) scale(0.85)" : "rotate(0deg) scale(1)",
                        }}
                      />
                    )}
                    {shape.name === "TRIANGLE" && (
                      <div
                        className="transition-all duration-100 ease-linear"
                        style={{
                          transform: hovered ? "rotate(180deg) scale(1.15)" : "rotate(0deg) scale(1)",
                        }}
                      >
                        <TriangleSVG
                          size={160}
                          fill={hovered ? "#ffffff" : shape.color}
                          stroke="#000000"
                          strokeWidth={4}
                        />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <h3
                    className="font-black uppercase tracking-[0.2em] text-xl mb-3 transition-colors duration-100 ease-linear"
                    style={{ color: hovered ? "#ffffff" : "#000000" }}
                  >
                    {shape.name}
                  </h3>
                  <p
                    className="text-xs leading-relaxed transition-colors duration-100 ease-linear"
                    style={{ color: hovered ? "#ffffffcc" : "#000000bb" }}
                  >
                    {shape.desc}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className="w-3 h-3 flex-shrink-0 transition-all duration-100 ease-linear"
                      style={{
                        backgroundColor: hovered ? "#ffffff" : shape.color,
                        borderRadius: shape.name === "CIRCLE" ? "50%" : "0",
                        transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    />
                    <span
                      className="text-xs font-black uppercase tracking-[0.2em] transition-colors duration-100 ease-linear"
                      style={{ color: hovered ? "#ffffff" : "#00000066" }}
                    >
                      {hovered ? shape.hoverLabel : "HOVER TO MUTATE"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Combination compositions */}
          <RevealBlock>
            <div className="border-4 border-black p-8">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-black mb-8 border-l-4 border-black pl-3">
                SHAPE COMBINATIONS — ASYMMETRIC CONSTRUCTIVIST COMPOSITION
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-4 border-black">

                {/* Composition A */}
                <div className="border-r-4 border-black p-8 flex flex-col items-center gap-6">
                  <div className="relative w-56 h-56 border-4 border-black bg-white flex-shrink-0">
                    <div className="absolute rounded-full bg-[#ff0000]" style={{ width: 100, height: 100, top: -20, left: -20 }} />
                    <div className="absolute bg-[#0000ff]" style={{ width: 80, height: 80, bottom: -16, right: -16 }} />
                    <div className="absolute inset-0 flex items-end justify-center pb-6">
                      <TriangleSVG size={100} fill="#ffff00" strokeWidth={3} />
                    </div>
                    <div className="absolute bg-black" style={{ width: 20, height: 20, top: 10, right: 10 }} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black text-center">
                    RED CIRCLE + BLUE SQUARE + YELLOW TRIANGLE
                  </p>
                </div>

                {/* Composition B */}
                <div className="border-r-4 border-black p-8 flex flex-col items-center gap-6">
                  <div className="relative w-56 h-56 bg-black flex-shrink-0">
                    <div className="absolute rounded-full border-4 border-white" style={{ width: 120, height: 120, top: 10, left: 10, borderColor: "#ff0000" }} />
                    <div className="absolute border-4 border-white bg-transparent" style={{ width: 80, height: 80, bottom: 10, right: 10, borderColor: "#ffff00" }} />
                    <div className="absolute bg-[#0000ff]" style={{ width: 40, height: 40, top: 10, right: 10 }} />
                    <div className="absolute rounded-full bg-white" style={{ width: 24, height: 24, bottom: 15, left: 15 }} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black text-center">
                    BLACK FIELD — OUTLINED GEOMETRY
                  </p>
                </div>

                {/* Composition C — dynamic rotation */}
                <div className="p-8 flex flex-col items-center gap-6">
                  <div className="relative w-56 h-56 border-4 border-black bg-[#ffff00] flex-shrink-0 overflow-hidden">
                    <div
                      className="absolute bg-black"
                      style={{ width: 100, height: 100, top: -20, right: -20, transform: "rotate(45deg)" }}
                    />
                    <div
                      className="absolute rounded-full bg-[#ff0000]"
                      style={{ width: 80, height: 80, bottom: 10, left: 10 }}
                    />
                    <div
                      className="absolute bg-[#0000ff]"
                      style={{ width: 60, height: 4, top: "50%", left: 0, right: 0, transform: "rotate(-30deg)" }}
                    />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black text-center">
                    YELLOW FIELD — ROTATED DIAGONAL ENERGY
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — COMPONENT DEMOS
      ================================================================ */}
      <section id="components" className="py-24 px-4 md:px-8 bg-black border-b-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-12">
            <div className="border-b-4 border-white pb-6">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#ff0000] mb-3">
                COMPONENT SYSTEM
              </p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
                COMPONENTS
              </h2>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.05} className="mb-10">
            <div className="flex border-4 border-white">
              {(["buttons", "cards", "inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setComponentTab(tab)}
                  className="flex-1 py-4 font-black uppercase tracking-[0.2em] text-xs border-r-4 border-white last:border-r-0 transition-colors duration-100 ease-linear"
                  style={{
                    backgroundColor: componentTab === tab ? "#ffffff" : "transparent",
                    color: componentTab === tab ? "#000000" : "#ffffff",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* BUTTONS tab */}
          {componentTab === "buttons" && (
            <RevealBlock>
              <div className="space-y-8">
                {/* Square buttons with 3D hard-shadow */}
                <div className="border-4 border-white p-8">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff0000] mb-6 border-l-4 border-[#ff0000] pl-3">
                    SQUARE BUTTONS — 3D HARD OFFSET + HEAVY PRESS
                  </p>
                  <div className="flex flex-wrap gap-6">
                    {[
                      { id: "btn-red", label: "RED PRIMARY", bg: "#ff0000", fg: "#ffffff", shadow: "#ffffff" },
                      { id: "btn-blue", label: "BLUE ACTION", bg: "#0000ff", fg: "#ffffff", shadow: "#ffffff" },
                      { id: "btn-yellow", label: "YELLOW SIGNAL", bg: "#ffff00", fg: "#000000", shadow: "#ffffff" },
                      { id: "btn-white", label: "WHITE GHOST", bg: "#ffffff", fg: "#000000", shadow: "#ff0000" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        className="px-7 py-4 font-black uppercase tracking-[0.2em] text-xs border-4 border-white transition-all duration-100 ease-linear select-none"
                        style={{
                          backgroundColor: btn.bg,
                          color: btn.fg,
                          boxShadow: isPressed(btn.id) ? "none" : `6px 6px 0 ${btn.shadow}`,
                          transform: isPressed(btn.id) ? "translate(6px, 6px)" : "translate(0, 0)",
                        }}
                        onClick={() => handleBtnPress(btn.id)}
                        onMouseDown={() => setPressedBtn(btn.id)}
                        onMouseUp={() => setPressedBtn(null)}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Circle buttons */}
                <div className="border-4 border-white p-8">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0000ff] mb-6 border-l-4 border-[#0000ff] pl-3">
                    CIRCLE BUTTONS — PURE ROUNDED-FULL
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    {[
                      { id: "circ-red", bg: "#ff0000", fg: "#ffffff", label: "GO" },
                      { id: "circ-blue", bg: "#0000ff", fg: "#ffffff", label: "DO" },
                      { id: "circ-yellow", bg: "#ffff00", fg: "#000000", label: "+" },
                      { id: "circ-black", bg: "#ffffff", fg: "#000000", label: "X", border: "4px solid #000000" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        className="flex items-center justify-center rounded-full font-black uppercase tracking-widest transition-all duration-100 ease-linear border-4 border-white select-none"
                        style={{
                          width: 80,
                          height: 80,
                          backgroundColor: btn.bg,
                          color: btn.fg,
                          border: btn.border || "4px solid #ffffff",
                          transform: isPressed(btn.id) ? "scale(0.88)" : "scale(1)",
                        }}
                        onClick={() => handleBtnPress(btn.id)}
                        onMouseDown={() => setPressedBtn(btn.id)}
                        onMouseUp={() => setPressedBtn(null)}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outlined buttons */}
                <div className="border-4 border-white p-8">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ffff00] mb-6 border-l-4 border-[#ffff00] pl-3">
                    OUTLINED — HARD BLACK BORDER
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { id: "out-white", label: "OUTLINE WHITE", border: "#ffffff", fg: "#ffffff", hoverBg: "#ffffff", hoverFg: "#000000" },
                      { id: "out-red", label: "OUTLINE RED", border: "#ff0000", fg: "#ff0000", hoverBg: "#ff0000", hoverFg: "#ffffff" },
                      { id: "out-yellow", label: "OUTLINE YELLOW", border: "#ffff00", fg: "#ffff00", hoverBg: "#ffff00", hoverFg: "#000000" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        className="group px-7 py-4 font-black uppercase tracking-[0.2em] text-xs transition-all duration-100 ease-linear select-none"
                        style={{
                          backgroundColor: "transparent",
                          color: btn.fg,
                          border: `4px solid ${btn.border}`,
                        }}
                        onClick={() => handleBtnPress(btn.id)}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* CARDS tab */}
          {componentTab === "cards" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-white">
                {[
                  {
                    num: "01",
                    title: "STRUCTURE",
                    desc: "Clean geometric forms define the visual hierarchy. No ornamentation — every element earns its presence through structural necessity.",
                    accent: "#ff0000",
                    cornerShape: "square",
                  },
                  {
                    num: "02",
                    title: "CONTRAST",
                    desc: "Maximum contrast between black and white. Color serves as structural signal, not decoration. Bold typography creates visual gravity.",
                    accent: "#0000ff",
                    cornerShape: "circle",
                  },
                  {
                    num: "03",
                    title: "DYNAMICS",
                    desc: "Rotation and offset inject kinetic energy into static layouts. Asymmetric composition creates visual tension and directional force.",
                    accent: "#ffff00",
                    cornerShape: "square",
                  },
                ].map((card) => (
                  <div
                    key={card.num}
                    className="group relative p-8 border-r-4 border-white last:border-r-0 bg-white cursor-pointer transition-colors duration-100 ease-linear hover:bg-[#ffff00]"
                  >
                    {/* Rotating corner decoration */}
                    <div
                      className="absolute top-0 right-0 w-10 h-10 transition-all duration-100 ease-linear group-hover:rotate-90"
                      style={{
                        backgroundColor: card.accent,
                        borderRadius: card.cornerShape === "circle" ? "50%" : "0",
                        transformOrigin: "top right",
                      }}
                    />

                    <span className="text-xs font-black uppercase tracking-[0.35em] text-black">{card.num}</span>
                    <h3 className="font-black uppercase tracking-tight text-2xl mt-3 mb-4 text-black">
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-black">
                      {card.desc}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-100 ease-linear"
                      style={{ backgroundColor: card.accent }}
                    />
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* INPUTS tab */}
          {componentTab === "inputs" && (
            <RevealBlock>
              <div className="max-w-2xl space-y-6">
                {/* Hard black border input with yellow focus */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.3em] text-white mb-2">
                    TEXT INPUT — HARD BORDER + YELLOW FOCUS
                  </label>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="TYPE SOMETHING..."
                    className="w-full px-4 py-4 bg-white text-black font-black uppercase tracking-widest placeholder-gray-400 focus:outline-none transition-all duration-100 ease-linear"
                    style={{
                      border: inputFocused ? "4px solid #ffff00" : "4px solid #000000",
                      boxShadow: inputFocused ? "6px 6px 0 #ffff00" : "none",
                    }}
                  />
                </div>

                {/* Email with blue focus */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.3em] text-white mb-2">
                    EMAIL — BLUE FOCUS STATE
                  </label>
                  <input
                    type="email"
                    placeholder="YOUR@ADDRESS.COM"
                    className="w-full px-4 py-4 bg-white border-4 border-black text-black font-black uppercase tracking-widest placeholder-gray-400 focus:outline-none focus:border-[#0000ff] transition-all duration-100 ease-linear"
                    style={{}}
                  />
                </div>

                {/* Textarea with red focus */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.3em] text-white mb-2">
                    MESSAGE — RED FOCUS STATE
                  </label>
                  <textarea
                    rows={4}
                    placeholder="TYPE YOUR MESSAGE..."
                    className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium tracking-wide placeholder-gray-400 focus:outline-none focus:border-[#ff0000] resize-none transition-all duration-100 ease-linear"
                  />
                </div>

                <button
                  className="w-full py-4 bg-[#ff0000] text-white font-black uppercase tracking-[0.2em] text-sm border-4 border-white hover:bg-white hover:text-black transition-colors duration-100 ease-linear"
                  onClick={() => fireToast("FORM SUBMITTED")}
                >
                  SUBMIT
                </button>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — COLOR SYSTEM
      ================================================================ */}
      <section id="colors" className="py-24 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#0000ff] mb-3">
                PRIMARY COLOR SYSTEM
              </p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-black">
                COLOR BLOCKS
              </h2>
            </div>
          </RevealBlock>

          {/* Five color swatches — Bauhaus/Constructivist style */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-4 border-black mb-12">
            {COLOR_SWATCHES.map((swatch, i) => {
              const isActive = activeSwatch === i;
              return (
                <RevealBlock key={swatch.name} delay={i * 0.07}>
                  <div
                    className="relative cursor-pointer border-r-4 border-black last:border-r-0 transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: swatch.hex,
                      border: swatch.extraBorder ? "none" : undefined,
                      outline: isActive ? `8px solid ${swatch.hex === "#000000" ? "#ff0000" : "#000000"}` : "none",
                      outlineOffset: isActive ? "-8px" : "0",
                    }}
                    onClick={() => setActiveSwatch(isActive ? null : i)}
                  >
                    {/* Extra border for white swatch */}
                    {swatch.extraBorder && (
                      <div className="absolute inset-0 border-4 border-black pointer-events-none" />
                    )}

                    {/* Geometric shape indicator */}
                    <div className="p-6 pb-0 flex justify-center" style={{ height: 140, alignItems: "center" }}>
                      {swatch.shape === "circle" && (
                        <div
                          className="w-20 h-20 rounded-full border-4 transition-all duration-100 ease-linear"
                          style={{
                            borderColor: swatch.text === "text-white" ? "#ffffff" : "#000000",
                            backgroundColor: "transparent",
                            transform: isActive ? "scale(1.2)" : "scale(1)",
                          }}
                        />
                      )}
                      {swatch.shape === "square" && (
                        <div
                          className="w-20 h-20 border-4 transition-all duration-100 ease-linear"
                          style={{
                            borderColor: swatch.text === "text-white" ? "#ffffff" : "#000000",
                            backgroundColor: "transparent",
                            transform: isActive ? "rotate(45deg) scale(1.1)" : "rotate(0deg) scale(1)",
                          }}
                        />
                      )}
                      {swatch.shape === "triangle" && (
                        <div
                          className="transition-all duration-100 ease-linear"
                          style={{ transform: isActive ? "scale(1.15)" : "scale(1)" }}
                        >
                          <TriangleSVG
                            size={80}
                            fill="transparent"
                            stroke={swatch.text === "text-white" ? "#ffffff" : "#000000"}
                            strokeWidth={4}
                          />
                        </div>
                      )}
                    </div>

                    {/* Labels */}
                    <div className="p-6 pt-4">
                      <p
                        className="font-black uppercase tracking-[0.2em] text-sm mb-1"
                        style={{ color: swatch.text === "text-white" ? "#ffffff" : "#000000" }}
                      >
                        {swatch.name}
                      </p>
                      <p
                        className="font-mono text-xs tracking-widest mb-3"
                        style={{ color: swatch.text === "text-white" ? "#ffffff99" : "#00000066" }}
                      >
                        {swatch.hex}
                      </p>
                      <p
                        className="font-black text-xs uppercase tracking-widest"
                        style={{ color: swatch.text === "text-white" ? "#ffffff88" : "#00000077" }}
                      >
                        {swatch.role}
                      </p>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div
                        className="absolute top-3 right-3 w-4 h-4 bg-black"
                        style={{
                          backgroundColor: swatch.name === "BLACK" ? "#ff0000" : "#000000",
                        }}
                      />
                    )}
                  </div>
                </RevealBlock>
              );
            })}
          </div>

          {/* Color rule panel */}
          <RevealBlock delay={0.35}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
              {/* Bauhaus color rule */}
              <div className="border-r-4 border-black p-8">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff0000] mb-4 border-l-4 border-[#ff0000] pl-3">
                  THE RULE
                </p>
                <p className="font-black uppercase text-xl md:text-2xl tracking-tight text-black mb-4 leading-tight">
                  FIVE VALUES ONLY. NO TINTS. NO MIXING. NO GRADIENTS.
                </p>
                <p className="text-xs text-black leading-relaxed">
                  Color must function as structural signal — not decoration.
                  Each hue carries a specific communicative weight.
                  Deviate and the system collapses.
                </p>
              </div>

              {/* Color meaning */}
              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0000ff] mb-4 border-l-4 border-[#0000ff] pl-3">
                  SEMANTIC MEANING
                </p>
                <div className="space-y-3">
                  {[
                    { color: "#ff0000", label: "RED", meaning: "ACTION / URGENCY / ENERGY" },
                    { color: "#0000ff", label: "BLUE", meaning: "LOGIC / DEPTH / INFORMATION" },
                    { color: "#ffff00", label: "YELLOW", meaning: "CAUTION / ACCENT / SECONDARY" },
                    { color: "#000000", label: "BLACK", meaning: "STRUCTURE / AUTHORITY / GROUND" },
                    { color: "#ffffff", label: "WHITE", meaning: "SPACE / CLARITY / VOID", border: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div
                        className="w-6 h-6 flex-shrink-0 border-2 border-black"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-black text-xs uppercase tracking-[0.2em] text-black w-16 flex-shrink-0">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-black">{item.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — TYPOGRAPHY SHOWCASE
      ================================================================ */}
      <section id="typography" className="py-24 px-4 md:px-8 bg-[#ffff00] border-b-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-black mb-3">
                TYPE SYSTEM / SCHRIFT
              </p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-black">
                TYPOGRAPHY
              </h2>
            </div>
          </RevealBlock>

          {/* Scale table */}
          <div className="border-4 border-black bg-white mb-10">
            {TYPOGRAPHY_SCALE.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.06}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 px-8 py-6 border-b-4 border-black last:border-b-0 hover:bg-black transition-colors duration-100 ease-linear cursor-default">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-black group-hover:text-[#ffff00] transition-colors duration-100 ease-linear">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p
                      className={`${item.sizeClass} ${item.weight} ${item.tracking} text-black group-hover:text-white leading-tight truncate transition-colors duration-100 ease-linear uppercase`}
                    >
                      {item.sample}
                    </p>
                  </div>
                  <div className="w-40 flex-shrink-0 hidden md:block">
                    <p className="text-xs font-mono text-black group-hover:text-[#ffffff88] opacity-60 transition-colors duration-100 ease-linear">
                      {item.weight} / {item.tracking}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Text as geometry demonstration */}
          <RevealBlock delay={0.3}>
            <div className="border-4 border-black bg-black p-10">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#ffff00] mb-8 border-l-4 border-[#ffff00] pl-3">
                TEXT IS GEOMETRY — LETTERFORMS AS VISUAL ELEMENTS
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff0000] mb-2">WEIGHT AS HIERARCHY</p>
                  <p className="font-black text-5xl uppercase text-white leading-none">BOLD</p>
                  <p className="font-semibold text-3xl uppercase text-white opacity-60 leading-none">MEDIUM</p>
                  <p className="font-normal text-3xl uppercase text-white opacity-30 leading-none">LIGHT</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0000ff] mb-2">TRACKING AS STRUCTURE</p>
                  <p className="font-black text-xl uppercase text-white tracking-tighter leading-none">TIGHT MASS</p>
                  <p className="font-black text-xl uppercase text-white tracking-normal leading-none">NORMAL</p>
                  <p className="font-black text-sm uppercase text-white tracking-[0.5em] leading-none">WIDE OPEN</p>
                  <p className="font-black text-xs uppercase text-[#ffff00] tracking-[0.7em] leading-none">MAXIMUM OPEN</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ffff00] mb-2">UPPERCASE ONLY</p>
                  <p className="font-black text-3xl uppercase text-white leading-none">THE RULE</p>
                  <p className="text-xs font-mono text-white opacity-60 leading-relaxed mt-2">
                    All headings must be uppercase.
                    Lowercase is a formal affectation.
                    Capital letters are structurally
                    honest — full height, no descenders.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — DESIGN RULES (DO / DONT)
      ================================================================ */}
      <section id="rules" className="py-24 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-12">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#ff0000] mb-3">
                GESTALTUNGSREGELN / DESIGN RULES
              </p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-black">
                DO / DON&apos;T
              </h2>
            </div>
          </RevealBlock>

          {/* Filter toggle */}
          <RevealBlock delay={0.05} className="mb-10">
            <div className="flex border-4 border-black w-fit">
              <button
                onClick={() => setRulesView("do")}
                className="px-8 py-4 font-black uppercase tracking-[0.25em] text-xs transition-colors duration-100 ease-linear border-r-4 border-black"
                style={{
                  backgroundColor: rulesView === "do" ? "#000000" : "#ffffff",
                  color: rulesView === "do" ? "#ff0000" : "#000000",
                }}
              >
                DO
              </button>
              <button
                onClick={() => setRulesView("dont")}
                className="px-8 py-4 font-black uppercase tracking-[0.25em] text-xs transition-colors duration-100 ease-linear"
                style={{
                  backgroundColor: rulesView === "dont" ? "#ff0000" : "#ffffff",
                  color: rulesView === "dont" ? "#ffffff" : "#000000",
                }}
              >
                DON&apos;T
              </button>
            </div>
          </RevealBlock>

          {/* Visual DO/DONT comparison layout (always shown) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black mb-10">

            {/* DO panel */}
            <RevealBlock delay={0.1}>
              <div className="border-r-4 border-black">
                <div
                  className="px-6 py-4 border-b-4 border-black flex items-center gap-4 bg-black"
                >
                  <div className="w-6 h-6 rounded-full bg-[#ff0000]" />
                  <p className="font-black uppercase tracking-[0.3em] text-sm text-white">DO</p>
                </div>

                {/* Geometric composition showing correct style */}
                <div className="p-8 bg-white border-b-4 border-black">
                  <div className="relative h-48 border-4 border-black overflow-hidden bg-white">
                    <div className="absolute bg-black" style={{ width: "40%", height: "100%", left: 0, top: 0 }} />
                    <div className="absolute rounded-full bg-[#ff0000]" style={{ width: 100, height: 100, top: -20, left: "30%", transform: "translateX(-50%)" }} />
                    <div className="absolute bg-[#ffff00]" style={{ width: 80, height: 80, bottom: 0, right: 20 }} />
                    <div className="absolute flex items-center justify-center" style={{ right: 40, top: 20 }}>
                      <span className="font-black text-2xl uppercase tracking-tight text-black">BOLD</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <TriangleSVG size={48} fill="#0000ff" strokeWidth={2} />
                    </div>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-black mt-3">
                    CORRECT — HARD GEOMETRY, PRIMARY COLORS, ASYMMETRY
                  </p>
                </div>

                {/* Rules list */}
                <ul className="divide-y-4 divide-black">
                  {DO_RULES.map((rule, i) => (
                    <li
                      key={i}
                      className="flex gap-4 px-6 py-4 hover:bg-[#ff0000] hover:text-white group transition-colors duration-100 ease-linear cursor-default"
                    >
                      <span className="font-black text-xs text-[#ff0000] group-hover:text-white flex-shrink-0 mt-0.5 transition-colors duration-100 ease-linear w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-black group-hover:text-white leading-relaxed transition-colors duration-100 ease-linear">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DONT panel */}
            <RevealBlock delay={0.15}>
              <div>
                <div className="px-6 py-4 border-b-4 border-black flex items-center gap-4 bg-white">
                  <div className="w-6 h-6 bg-gray-300" />
                  <p className="font-black uppercase tracking-[0.3em] text-sm text-gray-400">DON&apos;T</p>
                </div>

                {/* Composition showing wrong style — washed out, symmetric, gradients described */}
                <div className="p-8 bg-gray-50 border-b-4 border-black">
                  <div
                    className="relative h-48 border-4 border-gray-300 overflow-hidden flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #e0e0e0, #f5f5f5)" }}
                  >
                    <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-gray-200 rounded-lg flex items-center justify-center">
                      <span className="font-medium text-gray-400 text-lg">Soft, Symmetric, Padded</span>
                    </div>
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-gray-300 opacity-50" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mt-3">
                    WRONG — GRADIENT, SOFT RADIUS, MUTED COLORS, CENTERED
                  </p>
                </div>

                {/* Rules list — struck through */}
                <ul className="divide-y-4 divide-black">
                  {DONT_RULES.map((rule, i) => (
                    <li key={i} className="flex gap-4 px-6 py-4 cursor-default">
                      <span className="font-black text-xs text-gray-300 flex-shrink-0 mt-0.5 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-gray-400 leading-relaxed line-through decoration-gray-300">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Animation rules callout */}
          <RevealBlock delay={0.2}>
            <div className="border-4 border-black bg-black p-8">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#ffff00] mb-6 border-l-4 border-[#ffff00] pl-3">
                ANIMATION RULES — BLOCKY IMPACT SYSTEM
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t-4 border-white">
                {[
                  {
                    name: "BLOCKY IMPACT",
                    desc: "Pure solid hard-cut color switches. No fade, no dissolve. Instant state change.",
                    color: "#ff0000",
                  },
                  {
                    name: "SHAPE SNAPPING",
                    desc: "Geometric decorations instantly rotate or scale on hover. Structural mutation, not animation.",
                    color: "#0000ff",
                  },
                  {
                    name: "HEAVY PRESS",
                    desc: "Active state uses displacement + layer rebound. Translate rather than scale. Hard feedback.",
                    color: "#ffff00",
                  },
                  {
                    name: "LINEAR & FAST",
                    desc: "duration-100 + ease-linear throughout. No spring physics, no easing curves. Direct and mechanical.",
                    color: "#ffffff",
                  },
                ].map((rule) => (
                  <div
                    key={rule.name}
                    className="border-r-4 border-white last:border-r-0 p-6"
                  >
                    <div
                      className="w-6 h-1 mb-4"
                      style={{ backgroundColor: rule.color }}
                    />
                    <p className="font-black uppercase tracking-[0.2em] text-xs mb-3" style={{ color: rule.color }}>
                      {rule.name}
                    </p>
                    <p className="text-xs text-white opacity-70 leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 — FOOTER
      ================================================================ */}
      <footer className="bg-white border-t-0">

        {/* Bold geometric accent bar */}
        <div className="flex border-b-4 border-black">
          <div className="flex-1 h-6 bg-[#ff0000]" />
          <div className="w-24 h-6 bg-[#0000ff]" />
          <div className="w-16 h-6 bg-[#ffff00]" />
          <div className="w-10 h-6 bg-black" />
        </div>

        <div
          ref={footerRef}
          className="max-w-7xl mx-auto px-4 md:px-8 py-16"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-0 border-4 border-black mb-12"
            style={{
              opacity: footerInView ? 1 : 0,
              transform: footerInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            {/* Brand block — black background */}
            <div className="md:col-span-5 bg-black p-10 border-b-4 md:border-b-0 md:border-r-4 border-black">
              {/* Geometric logo mark */}
              <div className="relative w-20 h-20 mb-8">
                <div className="absolute inset-0 bg-white" />
                <div className="absolute rounded-full bg-[#ff0000]" style={{ width: 48, height: 48, top: -10, left: -10 }} />
                <div className="absolute bg-[#0000ff]" style={{ width: 36, height: 36, bottom: -8, right: -8 }} />
                <div className="absolute" style={{ bottom: 4, left: 4 }}>
                  <TriangleSVG size={28} fill="#ffff00" strokeWidth={2} stroke="#000000" />
                </div>
              </div>

              <p className="font-black uppercase tracking-[0.3em] text-2xl text-white mb-2">
                GEOMETRIC<br />BOLD
              </p>
              <p className="font-mono text-xs text-[#ff0000] uppercase tracking-widest mb-6">
                BAUHAUS / CONSTRUCTIVISM
              </p>
              <p className="font-mono text-xs text-white opacity-60 leading-relaxed max-w-xs">
                Strong geometric shapes. Bold color blocks. Dynamic asymmetric composition.
                Inspired by the masters — Moholy-Nagy, Rodchenko, El Lissitzky.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 p-10 border-b-4 md:border-b-0 md:border-r-4 border-black">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff0000] mb-6">
                SECTIONS
              </p>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-black hover:text-[#ff0000] transition-colors duration-100 ease-linear group"
                    >
                      <span
                        className="w-3 h-3 bg-black group-hover:bg-[#ff0000] transition-colors duration-100 ease-linear flex-shrink-0"
                      />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* StyleKit links + geometry */}
            <div className="md:col-span-4 p-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0000ff] mb-6">
                STYLEKIT
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { label: "ALL STYLES", href: "/styles" },
                  { label: "BAUHAUS", href: "/styles/bauhaus" },
                  { label: "CONSTRUCTIVISM", href: "/styles/constructivism" },
                  { label: "NEO BRUTALIST", href: "/styles/neo-brutalist-playful" },
                  { label: "HOME", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-black hover:text-[#0000ff] transition-colors duration-100 ease-linear group"
                    >
                      <span
                        className="w-3 h-3 rounded-full bg-black group-hover:bg-[#0000ff] transition-colors duration-100 ease-linear flex-shrink-0"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Shape strip */}
              <div className="flex gap-3 items-center pt-6 border-t-4 border-black">
                <div className="w-8 h-8 rounded-full bg-[#ff0000] border-2 border-black" />
                <div className="w-8 h-8 bg-[#0000ff] border-2 border-black" />
                <TriangleSVG size={32} fill="#ffff00" stroke="#000000" strokeWidth={2} />
                <div className="w-8 h-8 bg-black" />
                <div className="w-8 h-8 rounded-full bg-white border-2 border-black" />
              </div>
            </div>
          </div>

          {/* Footer bottom bar */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t-4 border-black pt-6"
            style={{
              opacity: footerInView ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-black">
              GEOMETRIC BOLD — STYLEKIT COMPONENT SYSTEM
            </p>
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-black opacity-50">
                GEOMETRY IS EVERYTHING
              </span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-[#ff0000]" />
                <div className="w-3 h-3 bg-[#0000ff]" />
                <div className="w-3 h-3 bg-[#ffff00]" />
                <div className="w-3 h-3 bg-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Final bottom band */}
        <div className="flex border-t-4 border-black">
          <div className="h-4 w-4 bg-[#ff0000]" />
          <div className="h-4 w-4 bg-[#0000ff]" />
          <div className="h-4 w-4 bg-[#ffff00]" />
          <div className="h-4 flex-1 bg-black" />
        </div>
      </footer>

    </div>
  );
}
