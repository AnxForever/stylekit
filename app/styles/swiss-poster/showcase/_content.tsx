"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const posterWorks = [
  { id: 1, year: "2024", title: "HELVETICA", subtitle: "Grid-aligned typographic content", cols: "col-span-12 md:col-span-8" },
  { id: 2, year: "1957", title: "AKZIDENZ", subtitle: "Rational form and function", cols: "col-span-12 md:col-span-4" },
  { id: 3, year: "1961", title: "UNIVERS", subtitle: "Mathematical precision in every stroke", cols: "col-span-12 md:col-span-4" },
  { id: 4, year: "1972", title: "MULLER", subtitle: "The grid is the message", cols: "col-span-12 md:col-span-8" },
  { id: 5, year: "2019", title: "BROCKMANN", subtitle: "Structure defines communication", cols: "col-span-12 md:col-span-6" },
  { id: 6, year: "1968", title: "RUDER", subtitle: "Typography as architecture", cols: "col-span-12 md:col-span-6" },
];

const doRules = [
  "Absolute Objectivity: zero translate, scale, or shadow on any element",
  "Snap Transitions: all interactions use transition-none — hard cuts like ink stamps",
  "Color Block Invasion: hover replaces bg with solid black, text inverts to white",
  "Typographic Highlighting: year/label switches to red on hover, transition-none",
  "12-column grid with asymmetric splits (3/9, 8/4, never 6/6)",
  "gap-0 with border-2 border-[#000000] as structural dividers",
  "font-sans font-black for all headings — no decorative typefaces",
  "uppercase tracking-widest for all labels and UI text",
];

const dontRules = [
  "Never use translate, scale, or rotate animations on interactive elements",
  "Never use any transition duration (must be transition-none, always)",
  "Never use shadows of any kind — zero shadow-sm or above",
  "Never use rounded corners — rounded-none everywhere, no exceptions",
  "Never use gradients or blur effects of any kind",
  "Never hover only text color without background flip (Color Block Invasion required)",
  "Never use gap-4 or any spacing — use gap-0 with border dividers",
  "Never use dashed or dotted borders — only solid border-2",
];

const typescaleSteps = [
  { size: "160px", label: "POSTER HEADLINE", tracking: "tracking-tighter", sampleText: "SWISS" },
  { size: "120px", label: "MAJOR HEAD", tracking: "tracking-tighter", sampleText: "GRID" },
  { size: "80px", label: "SECTION TITLE", tracking: "tracking-tighter", sampleText: "TYPE" },
  { size: "48px", label: "DISPLAY", tracking: "tracking-tight", sampleText: "FORM" },
  { size: "24px", label: "SUBHEAD", tracking: "tracking-tight", sampleText: "FUNCTION" },
  { size: "16px", label: "BODY", tracking: "tracking-wide", sampleText: "INTERNATIONAL TYPOGRAPHIC STYLE" },
  { size: "10px", label: "CAPTION / YEAR LABEL", tracking: "tracking-[0.5em]", sampleText: "1957 — MULLER-BROCKMANN — ZURICH" },
];

const gridSplitExamples = [
  {
    label: "8 / 4 SPLIT",
    left: { span: "col-span-8", bg: "bg-[#000000]", text: "text-[#ffffff]", label: "8" },
    right: { span: "col-span-4", bg: "bg-[#ff0000]", text: "text-[#ffffff]", label: "4" },
  },
  {
    label: "3 / 9 SPLIT",
    left: { span: "col-span-3", bg: "bg-[#0057b8]", text: "text-[#ffffff]", label: "3" },
    right: { span: "col-span-9", bg: "bg-[#ffffff]", text: "text-[#000000]", label: "9", border: true },
  },
  {
    label: "5 / 7 SPLIT",
    left: { span: "col-span-5", bg: "bg-[#ffcc00]", text: "text-[#000000]", label: "5" },
    right: { span: "col-span-7", bg: "bg-[#000000]", text: "text-[#ffffff]", label: "7" },
  },
];

const manifestoPrinciples = [
  {
    number: "01",
    title: "TYPOGRAPHY IS THE DESIGN",
    body: "The typeface is not decoration — it is architecture. Every letterform carries structural weight equal to any grid line or color block.",
    accent: "#ff0000",
  },
  {
    number: "02",
    title: "THE GRID IS ABSOLUTE",
    body: "12 columns. Asymmetric splits. Every element snaps to the grid with mathematical precision. Deviation is not a design choice — it is an error.",
    accent: "#0057b8",
  },
  {
    number: "03",
    title: "COLOR AS SIGNAL",
    body: "Red, blue, yellow. These are not decorations. They are signals. A red block means urgency. A black block means authority. Never use color arbitrarily.",
    accent: "#ffcc00",
  },
  {
    number: "04",
    title: "ZERO ORNAMENT",
    body: "No shadows. No gradients. No rounded corners. No blur. If it cannot be explained functionally, it does not exist in Swiss Poster design.",
    accent: "#000000",
  },
];

const colorBlocks = [
  { hex: "#ff0000", name: "RED", role: "ACCENT — HOVER STATES", textColor: "text-[#ffffff]", mutedColor: "text-[#ffffff]/60", labelColor: "text-[#ffffff]/70", subColor: "text-[#ffffff]/40", bg: "bg-[#ff0000]" },
  { hex: "#0057b8", name: "BLUE", role: "ACCENT — COLOR BLOCKS", textColor: "text-[#ffffff]", mutedColor: "text-[#ffffff]/60", labelColor: "text-[#ffffff]/70", subColor: "text-[#ffffff]/40", bg: "bg-[#0057b8]" },
  { hex: "#ffcc00", name: "YELLOW", role: "ACCENT — COLOR BLOCKS", textColor: "text-[#000000]", mutedColor: "text-[#000000]/50", labelColor: "text-[#000000]/60", subColor: "text-[#000000]/40", bg: "bg-[#ffcc00]" },
];

/* ------------------------------------------------------------------ */
/*  Inline Hooks                                                       */
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
/*  RevealBlock — no style prop allowed                                */
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PosterCard({ item }: { item: (typeof posterWorks)[0] }) {
  return (
    <div
      className={`group ${item.cols} p-8 bg-[#ffffff] border-2 border-[#000000] rounded-none hover:bg-[#000000] transition-none cursor-pointer`}
    >
      <span className="text-[10px] font-sans font-black text-[#000000]/40 group-hover:text-[#ff0000] uppercase tracking-[0.4em] transition-none block mb-2">
        {item.year}
      </span>
      <h3 className="text-3xl md:text-4xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-3 mt-1 transition-none leading-none">
        {item.title}
      </h3>
      <div className="h-[2px] bg-[#000000] group-hover:bg-[#ff0000] transition-none mb-4" />
      <p className="text-sm font-sans text-[#000000]/60 group-hover:text-[#ffffff]/70 transition-none leading-snug">
        {item.subtitle}
      </p>
    </div>
  );
}

function PosterButton({
  children,
  variant = "primary",
  color,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  color?: string;
}) {
  if (variant === "secondary") {
    return (
      <button className="px-8 py-3 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] border-l-0 hover:bg-[#000000] hover:text-[#ffffff] active:bg-[#ffffff] active:text-[#000000] transition-none text-sm">
        {children}
      </button>
    );
  }
  if (variant === "accent" && color) {
    return (
      <button
        className="px-8 py-3 font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] active:bg-[#ffffff] active:text-[#000000] transition-none text-sm"
        style={{ backgroundColor: color, color: color === "#ffcc00" ? "#000000" : "#ffffff" }}
      >
        {children}
      </button>
    );
  }
  return (
    <button className="px-8 py-3 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] active:bg-[#ffffff] active:text-[#000000] active:border-[#000000] transition-none text-sm">
      {children}
    </button>
  );
}

function PosterInput() {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-[10px] font-sans font-black text-[#000000]/50 uppercase tracking-[0.4em] mb-3">
          Name
        </label>
        <input
          type="text"
          placeholder="TYPE HERE"
          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/20 font-sans font-bold text-lg focus:border-[#ff0000] focus:outline-none transition-none"
        />
      </div>
      <div>
        <label className="block text-[10px] font-sans font-black text-[#000000]/50 uppercase tracking-[0.4em] mb-3">
          Email
        </label>
        <input
          type="email"
          placeholder="YOUR@EMAIL.COM"
          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/20 font-sans font-bold text-lg focus:border-[#0057b8] focus:outline-none transition-none"
        />
      </div>
      <div>
        <label className="block text-[10px] font-sans font-black text-[#000000]/50 uppercase tracking-[0.4em] mb-3">
          Message
        </label>
        <textarea
          placeholder="YOUR MESSAGE"
          rows={3}
          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/20 font-sans font-bold text-base focus:border-[#ff0000] focus:outline-none transition-none resize-none"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function SwissPosterShowcase() {
  const { ref: heroRef, inView: _heroInView } = useInView();
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"BUTTONS" | "CARDS" | "INPUTS">("BUTTONS");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000]">

      {/* ================================================================
          NAV — fixed, strict 12-col grid, red/black/white
      ================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b-2 border-[#000000]">
        <div className="grid grid-cols-12 gap-0">
          {/* Brand — 3 cols */}
          <div className="col-span-4 md:col-span-3 px-4 md:px-8 py-4 border-r-2 border-[#000000] flex items-center">
            <span className="font-sans font-black text-xs uppercase tracking-[0.3em] leading-none">
              SWISS POSTER
            </span>
          </div>

          {/* Center year label — 6 cols */}
          <div className="hidden md:flex col-span-6 px-8 py-4 items-center gap-6">
            <span className="text-[10px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.5em]">
              1957
            </span>
            <div className="h-[1px] flex-1 bg-[#000000]/10" />
            <span className="text-[10px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.5em]">
              ZURICH
            </span>
          </div>

          {/* Nav items — 3 cols */}
          <div className="col-span-8 md:col-span-3 px-0 py-0 flex items-stretch justify-end gap-0">
            <Link
              href="/styles/swiss-poster"
              className="px-4 py-4 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#000000]/50 hover:bg-[#000000] hover:text-[#ffffff] transition-none border-l-2 border-[#000000] flex items-center"
            >
              &larr; STYLEKIT
            </Link>
            <Link
              href="/styles"
              className="px-4 py-4 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#000000]/50 hover:bg-[#ff0000] hover:text-[#ffffff] transition-none border-l-2 border-[#000000] flex items-center"
            >
              ALL STYLES
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================
          HERO — poster-scale typography, 8/4 asymmetric, red block right
      ================================================================= */}
      <section className="pt-[57px] border-b-2 border-[#000000]">
        <div className="grid grid-cols-12 gap-0">

          {/* Left 8 cols — enormous type */}
          <div className="col-span-12 md:col-span-8 px-6 md:px-12 pt-10 pb-14 md:border-r-2 border-[#000000]">
            <div ref={heroRef}>
              <h1
                className="font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter"
                style={{
                  fontSize: "clamp(72px, 12vw, 160px)",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                SWISS
              </h1>
              <h2
                className="font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter -mt-1"
                style={{
                  fontSize: "clamp(48px, 8vw, 100px)",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                POSTER
              </h2>
            </div>

            {/* Divider line */}
            <div
              className="h-[2px] bg-[#000000] mt-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />

            <p
              className="text-xs font-sans text-[#000000]/50 leading-relaxed uppercase tracking-widest mt-6 max-w-sm"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              Bold typography. Mathematical grid system. Asymmetric composition. Zero decoration.
            </p>

            {/* Joined button group — gap-0, border-l-0 */}
            <div
              className="flex gap-0 mt-10"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              <PosterButton>EXPLORE</PosterButton>
              <PosterButton variant="secondary">LEARN</PosterButton>
            </div>

            {/* Bottom stats row */}
            <div
              className="grid grid-cols-3 gap-0 mt-12 border-t-2 border-[#000000]"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s",
              }}
            >
              <div className="pt-4 border-r-2 border-[#000000] pr-4">
                <span className="block font-sans font-black text-2xl md:text-4xl text-[#000000] uppercase tracking-tighter leading-none">12</span>
                <span className="block text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.3em] mt-1">COLUMNS</span>
              </div>
              <div className="pt-4 border-r-2 border-[#000000] px-4">
                <span className="block font-sans font-black text-2xl md:text-4xl text-[#000000] uppercase tracking-tighter leading-none">0</span>
                <span className="block text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.3em] mt-1">DECORATION</span>
              </div>
              <div className="pt-4 pl-4">
                <span className="block font-sans font-black text-2xl md:text-4xl text-[#000000] uppercase tracking-tighter leading-none">1957</span>
                <span className="block text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.3em] mt-1">ORIGIN</span>
              </div>
            </div>
          </div>

          {/* Right 4 cols — solid red block with vertical text */}
          <div className="hidden md:flex col-span-4 bg-[#ff0000] items-center justify-center min-h-[480px] relative">
            <span
              className="font-sans font-black text-[#ffffff] text-sm uppercase tracking-[0.5em]"
              style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
            >
              INTERNATIONAL STYLE
            </span>
            {/* Bottom year stamp */}
            <span
              className="absolute bottom-6 left-0 right-0 text-center text-[9px] font-sans font-black text-[#ffffff]/40 uppercase tracking-[0.4em]"
            >
              MULLER-BROCKMANN
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          GRID SYSTEM DEMO — column markers + asymmetric splits
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        {/* Section header */}
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-9 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Structure
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  GRID SYSTEM
                </h2>
              </RevealBlock>
            </div>
            <div className="col-span-3 border-l-2 border-[#000000] flex items-end justify-end px-6 py-6">
              <span className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.3em] text-right">
                12 COL
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 py-8">
          {/* Column index row */}
          <RevealBlock>
            <div className="grid grid-cols-12 gap-0 border-2 border-[#000000]">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className={`py-3 flex flex-col items-center justify-center ${
                    i < 11 ? "border-r-2 border-[#000000]" : ""
                  } ${i % 2 === 0 ? "bg-[#000000]" : "bg-[#ffffff]"}`}
                >
                  <span
                    className={`text-[9px] font-sans font-black uppercase tracking-widest ${
                      i % 2 === 0 ? "text-[#ffffff]" : "text-[#000000]"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Grid split examples */}
          {gridSplitExamples.map((example, idx) => (
            <RevealBlock key={example.label} delay={0.05 * (idx + 1)}>
              <div className="border-x-2 border-b-2 border-[#000000]">
                <div className="border-b border-[#000000]/10 px-4 py-2">
                  <span className="text-[9px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em]">
                    {example.label}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-0">
                  <div className={`${example.left.span} ${example.left.bg} px-6 py-6 flex items-center justify-between`}>
                    <span className={`text-3xl md:text-5xl font-sans font-black ${example.left.text} uppercase tracking-tight leading-none`}>
                      {example.left.label}
                    </span>
                    <span className={`text-[9px] font-sans font-black ${example.left.text} uppercase tracking-[0.3em] opacity-60`}>
                      COLS
                    </span>
                  </div>
                  <div
                    className={`${example.right.span} ${example.right.bg} px-6 py-6 flex items-center justify-between ${
                      example.right.border ? "border-l-2 border-[#000000]" : ""
                    }`}
                  >
                    <span className={`text-3xl md:text-5xl font-sans font-black ${example.right.text} uppercase tracking-tight leading-none`}>
                      {example.right.label}
                    </span>
                    <span className={`text-[9px] font-sans font-black ${example.right.text} uppercase tracking-[0.3em] opacity-60`}>
                      COLS
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================
          TYPOGRAPHY SCALE — 160px → 10px extreme contrast
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Scale
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  TYPE SCALE
                </h2>
              </RevealBlock>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 py-6">
          {typescaleSteps.map((step, i) => (
            <RevealBlock key={step.size} delay={i * 0.04}>
              <div className="grid grid-cols-12 gap-0 border-b border-[#000000]/10 py-3 items-baseline hover:bg-[#000000] group transition-none cursor-default">
                <div className="col-span-2 flex items-baseline">
                  <span className="text-[9px] font-sans font-black text-[#000000]/30 group-hover:text-[#ff0000] uppercase tracking-[0.3em] transition-none">
                    {step.size}
                  </span>
                </div>
                <div className="col-span-7 overflow-hidden">
                  <span
                    className={`font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase ${step.tracking} transition-none leading-none block`}
                    style={{ fontSize: step.size }}
                  >
                    {step.sampleText}
                  </span>
                </div>
                <div className="col-span-3 flex items-baseline justify-end">
                  <span className="text-[9px] font-sans font-black text-[#000000]/30 group-hover:text-[#ffffff]/40 uppercase tracking-[0.2em] transition-none text-right">
                    {step.label}
                  </span>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================
          COMPONENT SHOWCASE — tab switcher: BUTTONS / CARDS / INPUTS
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        {/* Section header */}
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Components
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  ELEMENTS
                </h2>
              </RevealBlock>
            </div>
          </div>
        </div>

        {/* Tab bar — gap-0 joined tabs */}
        <div className="grid grid-cols-12 gap-0 border-b-2 border-[#000000]">
          {(["BUTTONS", "CARDS", "INPUTS"] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`col-span-4 py-4 font-sans font-black text-xs uppercase tracking-[0.3em] transition-none ${
                i > 0 ? "border-l-2 border-[#000000]" : ""
              } ${
                activeTab === tab
                  ? "bg-[#000000] text-[#ffffff]"
                  : "bg-[#ffffff] text-[#000000]/40 hover:bg-[#000000] hover:text-[#ffffff]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="px-6 md:px-12 py-12">
          {activeTab === "BUTTONS" && (
            <RevealBlock>
              <div className="space-y-10">
                <div>
                  <p className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.4em] mb-4">
                    PRIMARY / SECONDARY GROUP (gap-0, border-l-0)
                  </p>
                  <div className="flex gap-0">
                    <PosterButton>EXPLORE</PosterButton>
                    <PosterButton variant="secondary">LEARN</PosterButton>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.4em] mb-4">
                    COLOR BLOCK BUTTONS — hover inverts to black + white
                  </p>
                  <div className="flex gap-0">
                    <PosterButton variant="accent" color="#ff0000">RED</PosterButton>
                    <PosterButton variant="accent" color="#0057b8">BLUE</PosterButton>
                    <PosterButton variant="accent" color="#ffcc00">YELLOW</PosterButton>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.4em] mb-4">
                    STANDALONE PRIMARY
                  </p>
                  <PosterButton>ENTER</PosterButton>
                </div>

                <p className="text-[9px] font-sans text-[#000000]/30 uppercase tracking-[0.3em]">
                  Color Block Invasion: hover flips entire bg. Snap transition-none. Active inverts to white bg.
                </p>
              </div>
            </RevealBlock>
          )}

          {activeTab === "CARDS" && (
            <RevealBlock>
              <div className="space-y-8">
                <p className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.4em]">
                  HOVER TO SEE COLOR BLOCK INVASION + TYPOGRAPHIC HIGHLIGHTING
                </p>
                <div className="grid grid-cols-12 gap-0">
                  {posterWorks.slice(0, 4).map((item, i) => (
                    <RevealBlock key={item.id} delay={i * 0.04} className={item.cols}>
                      <PosterCard item={item} />
                    </RevealBlock>
                  ))}
                </div>
                <p className="text-[9px] font-sans text-[#000000]/30 uppercase tracking-[0.3em]">
                  Entire bg flips to black. Year label turns red (Typographic Highlighting). transition-none — instant hard cut.
                </p>
              </div>
            </RevealBlock>
          )}

          {activeTab === "INPUTS" && (
            <RevealBlock>
              <div className="max-w-lg space-y-8">
                <p className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.4em]">
                  BOTTOM BORDER ONLY — TRANSPARENT BG — FOCUS ACTIVATES RED / BLUE ACCENT
                </p>
                <PosterInput />
                <p className="text-[9px] font-sans text-[#000000]/30 uppercase tracking-[0.3em]">
                  No rounded corners. No background fill. Pure structural bottom border.
                </p>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ================================================================
          COLOR BLOCK SYSTEM — primary + 3 accent blocks
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Palette
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  COLOR BLOCKS
                </h2>
              </RevealBlock>
            </div>
          </div>
        </div>

        {/* Three large accent color blocks */}
        <div className="grid grid-cols-3 gap-0">
          {colorBlocks.map((block, idx) => (
            <RevealBlock
              key={block.hex}
              className={idx < 2 ? "border-r-2 border-[#000000]" : ""}
              delay={idx * 0.05}
            >
              <div className={`${block.bg} flex flex-col items-start justify-between px-6 md:px-10 py-12 min-h-[280px] md:min-h-[360px]`}>
                <span className={`text-[10px] font-sans font-black ${block.mutedColor} uppercase tracking-[0.4em]`}>
                  2024
                </span>
                <div>
                  <span className={`block font-sans font-black ${block.textColor} uppercase text-2xl md:text-4xl tracking-tighter leading-none mb-2`}>
                    {block.name}
                  </span>
                  <span className={`block text-[10px] font-sans font-black ${block.labelColor} uppercase tracking-[0.3em]`}>
                    {block.hex.toUpperCase()}
                  </span>
                </div>
                <span className={`text-[9px] font-sans font-black ${block.subColor} uppercase tracking-[0.3em]`}>
                  {block.role}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Black + White primary pair */}
        <div className="grid grid-cols-2 gap-0 border-t-2 border-[#000000]">
          <RevealBlock className="border-r-2 border-[#000000]" delay={0.05}>
            <div className="bg-[#000000] flex flex-col items-start justify-between px-6 md:px-10 py-8 min-h-[160px]">
              <span className="text-[10px] font-sans font-black text-[#ffffff]/40 uppercase tracking-[0.4em]">PRIMARY</span>
              <div className="flex items-end justify-between w-full">
                <span className="font-sans font-black text-[#ffffff] uppercase text-xl md:text-3xl tracking-tighter leading-none">BLACK</span>
                <span className="text-[10px] font-sans font-black text-[#ffffff]/50 uppercase tracking-[0.3em]">#000000</span>
              </div>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="bg-[#ffffff] flex flex-col items-start justify-between px-6 md:px-10 py-8 min-h-[160px]">
              <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em]">SECONDARY</span>
              <div className="flex items-end justify-between w-full">
                <span className="font-sans font-black text-[#000000] uppercase text-xl md:text-3xl tracking-tighter leading-none">WHITE</span>
                <span className="text-[10px] font-sans font-black text-[#000000]/50 uppercase tracking-[0.3em]">#FFFFFF</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          POSTER WORKS GALLERY
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-9 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Gallery
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  WORKS
                </h2>
              </RevealBlock>
            </div>
            <div className="col-span-3 border-l-2 border-[#000000] px-6 py-6 flex items-end justify-end">
              <span className="text-[9px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.3em]">
                {posterWorks.length} ITEMS
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {posterWorks.map((item, i) => (
            <RevealBlock key={item.id} delay={i * 0.05} className={item.cols}>
              <PosterCard item={item} />
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================
          MANIFESTO — 4 principles, 9/3 asymmetric split
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Philosophy
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  PRINCIPLES
                </h2>
              </RevealBlock>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Large red number block — 3 cols */}
          <div className="hidden md:flex col-span-3 bg-[#ff0000] items-center justify-center min-h-full border-r-2 border-[#000000]">
            <span
              className="font-sans font-black text-[#ffffff]/30 uppercase"
              style={{ fontSize: "clamp(60px, 10vw, 140px)", writingMode: "vertical-lr" }}
            >
              04
            </span>
          </div>

          {/* Principles list — 9 cols */}
          <div className="col-span-12 md:col-span-9">
            {manifestoPrinciples.map((p, i) => (
              <RevealBlock key={p.number} delay={i * 0.06}>
                <div className="group p-6 md:p-10 border-b-2 border-[#000000] hover:bg-[#000000] transition-none cursor-default">
                  <div className="grid grid-cols-9 gap-0 items-start">
                    <div className="col-span-2">
                      <span className="font-sans font-black text-4xl md:text-6xl text-[#000000]/10 group-hover:text-[#ff0000] uppercase tracking-tighter leading-none transition-none">
                        {p.number}
                      </span>
                    </div>
                    <div className="col-span-7">
                      <h3 className="font-sans font-black text-sm md:text-base uppercase tracking-widest text-[#000000] group-hover:text-[#ffffff] transition-none mb-2 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs font-sans text-[#000000]/50 group-hover:text-[#ffffff]/60 leading-relaxed transition-none">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          DESIGN RULES — DO / DON'T in Swiss grid
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        <div className="border-b-2 border-[#000000]">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 px-6 md:px-12 py-6">
              <RevealBlock>
                <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.4em] block mb-1">
                  Rules
                </span>
                <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter leading-none">
                  MANIFESTO
                </h2>
              </RevealBlock>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* DO column */}
          <RevealBlock delay={0.05} className="col-span-12 md:col-span-6 md:border-r-2 border-[#000000]">
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#000000] rounded-none" />
                <h3 className="font-sans font-black text-xs uppercase tracking-[0.4em]">DO</h3>
              </div>
              <ul className="space-y-0">
                {doRules.map((rule, i) => (
                  <li
                    key={i}
                    className="group py-3 border-b border-[#000000]/10 hover:bg-[#000000] hover:border-transparent transition-none cursor-default"
                  >
                    <div className="flex items-start gap-4 px-2">
                      <span className="text-[9px] font-sans font-black text-[#000000]/30 group-hover:text-[#ff0000] transition-none mt-0.5 shrink-0 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-sans text-[#000000]/70 group-hover:text-[#ffffff] transition-none leading-relaxed">
                        {rule}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* DON'T column */}
          <RevealBlock delay={0.1} className="col-span-12 md:col-span-6 border-t-2 md:border-t-0 border-[#000000]">
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#ff0000] rounded-none" />
                <h3 className="font-sans font-black text-xs uppercase tracking-[0.4em] text-[#ff0000]">DON&apos;T</h3>
              </div>
              <ul className="space-y-0">
                {dontRules.map((rule, i) => (
                  <li
                    key={i}
                    className="group py-3 border-b border-[#000000]/10 hover:bg-[#000000] transition-none cursor-default mb-2 last:mb-0"
                  >
                    <div className="flex items-start gap-4 px-2">
                      <span className="text-[9px] font-sans font-black text-[#ff0000]/50 group-hover:text-[#ff0000] transition-none mt-0.5 shrink-0 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-sans text-[#000000]/70 group-hover:text-[#ffffff] transition-none leading-relaxed">
                        {rule}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          FULL-WIDTH POSTER STATEMENT — large red block
      ================================================================= */}
      <section className="border-b-2 border-[#000000]">
        <RevealBlock>
          <div className="bg-[#ff0000] px-6 md:px-12 py-16 md:py-24 grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-8">
              <span className="text-[10px] font-sans font-black text-[#ffffff]/50 uppercase tracking-[0.5em] block mb-6">
                ZURICH — 1957 — INTERNATIONAL TYPOGRAPHIC STYLE
              </span>
              <h2
                className="font-sans font-black text-[#ffffff] uppercase leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
              >
                TYPOGRAPHY IS NOT DECORATION.
              </h2>
              <h2
                className="font-sans font-black text-[#ffffff]/40 uppercase leading-[0.85] tracking-tighter mt-2"
                style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
              >
                IT IS STRUCTURE.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col justify-end items-end pt-8 md:pt-0">
              <span className="text-[9px] font-sans font-black text-[#ffffff]/30 uppercase tracking-[0.4em] text-right max-w-[160px] leading-relaxed">
                JOSEF MULLER-BROCKMANN — GRID SYSTEMS IN GRAPHIC DESIGN
              </span>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          FOOTER — bg-[#000000], white text, grid layout
      ================================================================= */}
      <footer className="bg-[#000000]">
        <div className="grid grid-cols-12 gap-0">
          {/* Left: brand + year — 8 cols */}
          <div className="col-span-12 md:col-span-8 px-6 md:px-12 pt-12 pb-10 md:border-r-2 border-[#ffffff]/20">
            <span
              className="font-sans font-black text-[#ffffff] uppercase tracking-tighter leading-none block"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              SWISS POSTER
            </span>
            <p className="text-[10px] font-sans font-black text-[#ffffff]/40 uppercase tracking-[0.4em] mt-4">
              INTERNATIONAL TYPOGRAPHIC STYLE — ZURICH 1957
            </p>

            {/* Color accent strip */}
            <div className="flex gap-0 mt-8">
              <div className="h-[3px] flex-1 bg-[#ff0000]" />
              <div className="h-[3px] flex-1 bg-[#0057b8]" />
              <div className="h-[3px] flex-1 bg-[#ffcc00]" />
              <div className="h-[3px] flex-1 bg-[#ffffff]" />
            </div>

            <p className="text-[9px] font-sans text-[#ffffff]/20 uppercase tracking-[0.3em] mt-8">
              &copy;2024 STYLEKIT — ZERO DECORATION, PURE FUNCTION
            </p>
          </div>

          {/* Right: links — 4 cols */}
          <div className="col-span-12 md:col-span-4 px-6 md:px-10 py-10 flex flex-col justify-between border-t-2 md:border-t-0 border-[#ffffff]/20">
            <div className="space-y-0">
              <Link
                href="/styles/swiss-poster"
                className="flex items-center justify-between px-0 py-4 font-sans font-black text-[10px] uppercase tracking-[0.4em] text-[#ffffff]/50 hover:text-[#ffffff] hover:bg-[#ff0000] hover:px-4 transition-none border-b border-[#ffffff]/10"
              >
                DOCS
                <span className="text-[#ffffff]/20">&#8594;</span>
              </Link>
              <Link
                href="/styles"
                className="flex items-center justify-between px-0 py-4 font-sans font-black text-[10px] uppercase tracking-[0.4em] text-[#ffffff]/50 hover:text-[#ffffff] hover:bg-[#0057b8] hover:px-4 transition-none border-b border-[#ffffff]/10"
              >
                ALL STYLES
                <span className="text-[#ffffff]/20">&#8594;</span>
              </Link>
              <Link
                href="/"
                className="flex items-center justify-between px-0 py-4 font-sans font-black text-[10px] uppercase tracking-[0.4em] text-[#ffffff]/50 hover:text-[#000000] hover:bg-[#ffcc00] hover:px-4 transition-none"
              >
                HOME
                <span className="text-[#ffffff]/20">&#8594;</span>
              </Link>
            </div>

            {/* Color dot markers */}
            <div className="flex gap-0 mt-8">
              <div className="w-4 h-4 bg-[#ff0000] rounded-none" />
              <div className="w-4 h-4 bg-[#0057b8] rounded-none" />
              <div className="w-4 h-4 bg-[#ffcc00] rounded-none" />
              <div className="w-4 h-4 bg-[#ffffff] rounded-none" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
