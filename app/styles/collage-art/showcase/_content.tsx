"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline Hook                                                         */
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
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const clippings = [
  {
    id: 1,
    category: "TYPOGRAPHY",
    headline: "Mixed Fonts Collide",
    body: "When serif meets sans-serif at full force, tension becomes beauty. No apologies.",
    date: "1968",
    accent: "#e74c3c",
    rotation: "rotate-[-3deg]",
    border: "border-4 border-[#2d2d2d]",
    tapeColor: "bg-yellow-200/70",
  },
  {
    id: 2,
    category: "GRAPHICS",
    headline: "Cut and Paste",
    body: "The physical act of cutting transforms the page into raw material. Reassemble at will.",
    date: "1972",
    accent: "#3498db",
    rotation: "rotate-[2deg]",
    border: "border-2 border-dashed border-[#3498db]",
    tapeColor: "bg-blue-200/60",
  },
  {
    id: 3,
    category: "DADA",
    headline: "Anti-Rational Design",
    body: "Logic is the enemy of art. The Dadaists knew this. Do your interfaces know this?",
    date: "1916",
    accent: "#9b59b6",
    rotation: "rotate-[4deg]",
    border: "border-[3px] border-double border-[#9b59b6]",
    tapeColor: "bg-purple-200/60",
  },
  {
    id: 4,
    category: "POP ART",
    headline: "Mass Media as Medium",
    body: "Newspaper fragments, magazine headlines, advertising slogans — all valid material.",
    date: "1960",
    accent: "#f39c12",
    rotation: "rotate-[-2deg]",
    border: "border-4 border-[#f39c12]",
    tapeColor: "bg-yellow-300/70",
  },
  {
    id: 5,
    category: "TEXTURE",
    headline: "Paper Speaks",
    body: "The grain, the tooth, the yellowing edges — every surface holds memory and character.",
    date: "1954",
    accent: "#e74c3c",
    rotation: "rotate-[1deg]",
    border: "border-2 border-[#2d2d2d] border-t-4",
    tapeColor: "bg-red-200/60",
  },
  {
    id: 6,
    category: "MANIFESTO",
    headline: "Rules Are Clippings",
    body: "Even design rules can be cut, rearranged, and pasted onto new surfaces. Nothing is fixed.",
    date: "2024",
    accent: "#3498db",
    rotation: "rotate-[-1deg]",
    border: "border-2 border-[#3498db]",
    tapeColor: "bg-blue-100/70",
  },
];

const manifestoStatements = [
  { text: "DESTROY THE GRID", font: "font-serif", size: "text-4xl md:text-5xl", color: "#e74c3c", rotation: "rotate-[-2deg]" },
  { text: "paste. cut. repeat.", font: "font-mono", size: "text-xl md:text-2xl", color: "#f5f0e8", rotation: "rotate-[1deg]" },
  { text: "CHAOS IS ORDER", font: "font-sans", size: "text-3xl md:text-4xl font-black", color: "#f39c12", rotation: "rotate-[3deg]" },
  { text: "mix your media", font: "font-serif", size: "text-2xl md:text-3xl italic", color: "#9b59b6", rotation: "rotate-[-3deg]" },
  { text: "NO CLEAN LINES", font: "font-mono", size: "text-2xl md:text-3xl font-bold", color: "#3498db", rotation: "rotate-[2deg]" },
  { text: "FOUND OBJECTS SPEAK", font: "font-sans font-black", size: "text-xl md:text-2xl uppercase tracking-widest", color: "#f5f0e8", rotation: "rotate-[-1deg]" },
  { text: "Texture Over Perfection", font: "font-serif", size: "text-3xl md:text-4xl", color: "#e74c3c", rotation: "rotate-[4deg]" },
  { text: "DADA DADA DADA", font: "font-mono", size: "text-xl md:text-2xl tracking-[0.3em]", color: "#f39c12", rotation: "rotate-[-4deg]" },
];

const colorSwatches = [
  { name: "Dark Charcoal", hex: "#2d2d2d", label: "Primary", rotation: "rotate-[-2deg]", tapeColor: "bg-yellow-200/70" },
  { name: "Cut Red", hex: "#e74c3c", label: "Accent Red", rotation: "rotate-[3deg]", tapeColor: "bg-red-200/60" },
  { name: "Magazine Blue", hex: "#3498db", label: "Accent Blue", rotation: "rotate-[-1deg]", tapeColor: "bg-blue-200/60" },
  { name: "Paste Yellow", hex: "#f39c12", label: "Accent Yellow", rotation: "rotate-[2deg]", tapeColor: "bg-yellow-300/70" },
  { name: "Scrap Purple", hex: "#9b59b6", label: "Accent Purple", rotation: "rotate-[-3deg]", tapeColor: "bg-purple-200/60" },
];

const typographyStyles = [
  {
    label: "Serif Bold",
    font: "font-serif",
    weight: "font-bold",
    size: "text-4xl",
    tracking: "tracking-tight",
    style: "",
    rotation: "rotate-[-2deg]",
    accent: "#e74c3c",
    note: "Classical authority. Newspaper headlines. Timeless cut.",
  },
  {
    label: "Sans Condensed",
    font: "font-sans",
    weight: "font-black",
    size: "text-4xl",
    tracking: "tracking-widest",
    style: "uppercase",
    rotation: "rotate-[2deg]",
    accent: "#3498db",
    note: "Modernist efficiency. Posters, labels, magazine covers.",
  },
  {
    label: "Monospace",
    font: "font-mono",
    weight: "font-normal",
    size: "text-3xl",
    tracking: "tracking-tight",
    style: "",
    rotation: "rotate-[-1deg]",
    accent: "#f39c12",
    note: "Machine-age precision. Typewriter, code, telegrams.",
  },
  {
    label: "Italic Serif",
    font: "font-serif",
    weight: "font-medium",
    size: "text-3xl",
    tracking: "tracking-normal",
    style: "italic",
    rotation: "rotate-[3deg]",
    accent: "#9b59b6",
    note: "Handwritten spirit. Found in letters, annotations, captions.",
  },
];

const doRules = [
  "Layer elements at conflicting angles — collision is the aesthetic",
  "Mix serif, sans, and mono fonts in a single composition",
  "Treat borders as decorative artifacts: torn, dashed, double, bold",
  "Use warm cream #f5f0e8 as the base paper surface",
  "Add tape-strip decorations to suggest physical assembly",
  "Scatter typographic fragments — dates, numbers, small text ghosts",
  "Embrace intentional asymmetry and visual tension",
];

const dontRules = [
  "Never use uniform, consistent spacing across all elements",
  "Never constrain all text to one font family or weight",
  "Never round all corners to the same radius — vary wildly",
  "Never use clean, aligned grid layouts without any rotation",
  "Never leave surfaces without texture cues — paper needs grain",
  "Never use flat, monochrome color schemes — collage demands contrast",
  "Never make hover states the same as resting states",
];

/* ------------------------------------------------------------------ */
/*  Torn Edge SVG                                                       */
/* ------------------------------------------------------------------ */

function TornEdgeTop({ fill = "#f5f0e8" }: { fill?: string }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className="w-full h-8 md:h-10 block"
      aria-hidden="true"
    >
      <path
        d="M0,20 C30,8 60,32 90,18 C120,5 150,28 180,15 C210,3 240,25 270,12 C300,0 330,22 360,10 C390,0 420,24 450,14 C480,4 510,26 540,16 C570,6 600,28 630,18 C660,8 690,30 720,20 C750,10 780,32 810,22 C840,12 870,34 900,24 C930,14 960,36 990,26 C1020,16 1050,38 1080,28 C1110,18 1140,40 1170,30 L1200,40 L0,40 Z"
        fill={fill}
      />
    </svg>
  );
}

function TornEdgeBottom({ fill = "#2d2d2d" }: { fill?: string }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className="w-full h-8 md:h-10 block"
      aria-hidden="true"
    >
      <path
        d="M0,0 L1200,0 L1200,15 C1170,28 1140,5 1110,18 C1080,30 1050,8 1020,22 C990,35 960,12 930,25 C900,38 870,15 840,28 C810,40 780,18 750,30 C720,40 690,20 660,32 C630,40 600,22 570,35 C540,40 510,25 480,38 C450,40 420,28 390,40 C360,40 330,30 300,40 C270,40 240,32 210,40 C180,40 150,35 120,40 C90,40 60,38 30,40 L0,40 Z"
        fill={fill}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeStyle, setActiveStyle] = useState(0);
  const [pinnedItems, setPinnedItems] = useState<number[]>([]);
  const [collageMode, setCollageMode] = useState<"scatter" | "grid" | "overlap">("scatter");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  void heroInView;

  function togglePin(id: number) {
    setPinnedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const clippingRotations: Record<string, string> = {
    scatter: "",
    grid: "rotate-[0deg]",
    overlap: "",
  };

  void clippingRotations;

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div
      className="min-h-screen bg-[#f5f0e8] text-[#2d2d2d] overflow-x-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)",
      }}
    >

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                      */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e8]/95 backdrop-blur-sm border-b-2 border-[#2d2d2d]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.025) 28px,rgba(0,0,0,0.025) 29px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Back link — cut-paste label style */}
            <Link
              href="/styles"
              className="inline-flex items-center gap-2 group"
            >
              <span
                className="inline-block border border-[#2d2d2d] px-2 py-0.5 text-xs rotate-[-1deg] font-mono text-[#2d2d2d] group-hover:bg-[#2d2d2d] group-hover:text-[#f5f0e8] transition-colors duration-150"
              >
                StyleKit
              </span>
              <span className="font-serif text-sm text-[#e74c3c] rotate-[1deg] inline-block group-hover:translate-x-1 transition-transform duration-150">
                →
              </span>
            </Link>

            {/* Logo — mixed font styles */}
            <div className="flex items-center gap-1">
              <span className="font-serif font-bold text-lg text-[#2d2d2d] rotate-[-1deg] inline-block">
                Collage
              </span>
              <span className="font-sans font-black text-lg text-[#e74c3c] rotate-[2deg] inline-block tracking-wider uppercase">
                ART
              </span>
            </div>

            {/* Nav links — mixed fonts */}
            <nav className="hidden md:flex items-center gap-5">
              <a
                href="#gallery"
                className="font-mono text-xs text-[#2d2d2d]/60 hover:text-[#e74c3c] transition-colors duration-150 rotate-[-1deg] inline-block"
              >
                gallery
              </a>
              <a
                href="#components"
                className="font-serif text-sm font-bold text-[#2d2d2d]/60 hover:text-[#3498db] transition-colors duration-150 rotate-[1deg] inline-block"
              >
                Components
              </a>
              <a
                href="#manifesto"
                className="font-sans text-xs uppercase tracking-widest font-black text-[#2d2d2d]/60 hover:text-[#9b59b6] transition-colors duration-150"
              >
                MANIFESTO
              </a>
              <a
                href="#rules"
                className="font-mono text-xs text-[#2d2d2d]/60 hover:text-[#f39c12] transition-colors duration-150 rotate-[-2deg] inline-block"
              >
                rules
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — Collage Board                                          */}
      {/* ================================================================ */}
      <section
        ref={heroRef}
        className="relative pt-28 md:pt-36 pb-0 px-6 md:px-12 overflow-hidden min-h-screen flex items-center"
      >
        {/* Background blue geometric shape */}
        <div
          className="absolute top-16 right-8 md:right-24 w-48 h-48 md:w-72 md:h-72 bg-[#3498db]/15 rotate-[8deg]"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        />
        {/* Secondary geometric shape */}
        <div
          className="absolute bottom-24 left-8 md:left-16 w-32 h-32 md:w-48 md:h-48 bg-[#e74c3c]/10 rotate-[-5deg]"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s",
          }}
        />
        {/* Small scattered fragments */}
        <span
          className="absolute top-32 right-4 md:right-12 font-mono text-xs text-[#2d2d2d]/20 rotate-[90deg]"
          style={{ opacity: heroRevealed ? 1 : 0, transition: "opacity 1s ease 0.8s" }}
        >
          1916 / 1968 / 2024
        </span>
        <span
          className="absolute bottom-32 right-16 md:right-32 font-serif text-xs italic text-[#9b59b6]/30 rotate-[-15deg]"
          style={{ opacity: heroRevealed ? 1 : 0, transition: "opacity 1s ease 1s" }}
        >
          cut · paste · repeat
        </span>
        <span
          className="absolute top-48 left-4 md:left-8 font-mono text-xs text-[#f39c12]/40 rotate-[5deg]"
          style={{ opacity: heroRevealed ? 1 : 0, transition: "opacity 1s ease 0.9s" }}
        >
          001 / DADA / POP
        </span>

        <div className="relative z-10 max-w-5xl mx-auto w-full pb-24">
          {/* Label tag */}
          <div
            className="mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0) rotate(-1deg)" : "translateY(20px) rotate(-1deg)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="inline-block border border-[#2d2d2d] px-3 py-1 text-xs font-mono rotate-[-1deg] bg-[#f5f0e8]">
              Mixed-Media / Assemblage / Found Objects / 1916—
            </span>
          </div>

          {/* Hero headline — overlapping at angles */}
          <div className="relative">
            {/* Large COLLAGE — serif, angled */}
            <h1
              className="font-serif font-black text-[#2d2d2d] leading-none rotate-[-2deg] inline-block"
              style={{
                fontSize: "clamp(4rem, 13vw, 11rem)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0) rotate(-2deg)" : "translateY(48px) rotate(-2deg)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
                letterSpacing: "-0.02em",
              }}
            >
              COLLAGE
            </h1>

            {/* ART — bold sans, red, different angle */}
            <div
              className="mt-[-1rem] md:mt-[-2rem]"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s",
              }}
            >
              <span
                className="font-sans font-black text-[#e74c3c] leading-none rotate-[3deg] inline-block ml-8 md:ml-16"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
                  letterSpacing: "0.05em",
                }}
              >
                ART
              </span>
            </div>
          </div>

          {/* Subtext */}
          <p
            className="font-serif text-lg md:text-xl text-[#2d2d2d]/55 mt-6 max-w-xl leading-relaxed rotate-[-1deg]"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s",
            }}
          >
            Dada tradition meets Pop Art energy. Fonts collide, elements overlap,
            textures accumulate. Design that knows it is made of pieces.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-wrap gap-4 mt-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s",
            }}
          >
            <button className="relative inline-block px-7 py-3 bg-[#2d2d2d] text-[#f5f0e8] font-sans font-black uppercase tracking-widest text-sm rotate-[-1deg] hover:bg-[#e74c3c] transition-colors duration-200 border-2 border-[#2d2d2d]">
              Explore the Board
            </button>
            <button className="relative inline-block px-7 py-3 bg-transparent text-[#2d2d2d] font-mono text-sm rotate-[1deg] border-2 border-dashed border-[#3498db] text-[#3498db] hover:bg-[#3498db]/10 transition-colors duration-200">
              read. cut. paste.
            </button>
          </div>

          {/* Scattered numbers row */}
          <div
            className="flex gap-8 mt-14 items-end"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease 0.7s",
            }}
          >
            {["01", "02", "03", "04"].map((num, i) => (
              <span
                key={num}
                className="font-mono text-xs text-[#2d2d2d]/20"
                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i + 1)}deg)` }}
              >
                {num}
              </span>
            ))}
            <span className="font-serif text-xs italic text-[#2d2d2d]/20 ml-2">
              — assembled by StyleKit
            </span>
          </div>
        </div>

        {/* Torn bottom edge into the next section */}
        <div className="absolute bottom-0 left-0 right-0">
          <TornEdgeBottom fill="#2d2d2d" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. TEXTURE GALLERY — Clippings board                             */}
      {/* ================================================================ */}
      <section
        id="gallery"
        className="relative bg-[#2d2d2d] py-24 md:py-32 px-6 md:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,0.02) 28px,rgba(255,255,255,0.02) 29px)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <RevealBlock className="mb-6">
            <div className="flex items-end gap-4 flex-wrap">
              <h2 className="font-serif font-black text-[#f5f0e8] text-4xl md:text-5xl rotate-[-1deg] inline-block">
                The Board
              </h2>
              <span className="font-mono text-xs text-[#f39c12] rotate-[2deg] inline-block mb-1">
                / clippings /
              </span>
            </div>
            <p className="font-serif text-[#f5f0e8]/50 mt-2 max-w-lg">
              Six fragments, each a different source. Torn edges, tape marks, mismatched borders.
            </p>
          </RevealBlock>

          {/* Layout mode switcher */}
          <RevealBlock delay={0.08} className="flex items-center gap-3 mb-12 flex-wrap">
            <span className="font-mono text-xs text-[#f5f0e8]/40 mr-1">layout:</span>
            {(["scatter", "grid", "overlap"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setCollageMode(mode)}
                className={`px-4 py-1.5 font-mono text-xs border transition-all duration-200 ${
                  collageMode === mode
                    ? "bg-[#f5f0e8] text-[#2d2d2d] border-[#f5f0e8]"
                    : "bg-transparent text-[#f5f0e8]/50 border-[#f5f0e8]/25 hover:border-[#f5f0e8]/60 hover:text-[#f5f0e8]"
                }`}
              >
                {mode}
              </button>
            ))}
          </RevealBlock>

          {/* Gallery grid */}
          <div
            className={`${
              collageMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                : collageMode === "overlap"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            } transition-all duration-500`}
          >
            {clippings.map((clip, i) => (
              <RevealBlock key={clip.id} delay={i * 0.07}>
                <div
                  className={`relative bg-[#f5f0e8] p-6 cursor-default group transition-all duration-300 ${clip.border} ${
                    collageMode === "scatter" ? clip.rotation : collageMode === "overlap" && i % 2 === 1 ? "rotate-[1deg]" : "rotate-[0deg]"
                  } hover:z-10`}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)",
                    marginTop: collageMode === "overlap" && i > 2 ? "-2rem" : "0",
                  }}
                >
                  {/* Tape strip decoration */}
                  <div
                    className={`absolute -top-2 -right-3 h-4 w-16 ${clip.tapeColor} rotate-[45deg] z-10 opacity-80`}
                  />

                  {/* Category label */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-[10px] tracking-widest font-bold"
                      style={{ color: clip.accent }}
                    >
                      {clip.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#2d2d2d]/30">{clip.date}</span>
                  </div>

                  {/* Headline — serif bold */}
                  <h3 className="font-serif font-bold text-[#2d2d2d] text-xl leading-tight mb-3 group-hover:text-[#e74c3c] transition-colors duration-200">
                    {clip.headline}
                  </h3>

                  {/* Body — mix of readable and suggestion */}
                  <p className="font-sans text-sm text-[#2d2d2d]/60 leading-relaxed">
                    {clip.body}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className="mt-4 h-0.5 w-12 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: clip.accent }}
                  />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Torn top edge */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <TornEdgeTop fill="#2d2d2d" />
        </div>

        {/* Torn bottom edge back to cream */}
        <div className="absolute bottom-0 left-0 right-0">
          <TornEdgeTop fill="#f5f0e8" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT SHOWCASE                                            */}
      {/* ================================================================ */}
      <section
        id="components"
        className="relative bg-[#f5f0e8] py-24 md:py-32 px-6 md:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="inline-block border border-[#2d2d2d] px-2 py-0.5 text-xs font-mono rotate-[-1deg] mb-4">
              04 / Components
            </span>
            <h2 className="font-serif font-black text-[#2d2d2d] text-4xl md:text-5xl rotate-[1deg] inline-block">
              Cut-Paste
              <span className="font-sans font-black text-[#e74c3c] ml-3">UI</span>
            </h2>
            <p className="font-serif text-[#2d2d2d]/50 mt-3 max-w-md">
              Every component carries the marks of assembly — mismatched borders, colliding type, tape traces.
            </p>
          </RevealBlock>

          <div className="space-y-20">

            {/* --- Buttons --- */}
            <RevealBlock delay={0.06}>
              <div className="relative">
                {/* Section tape */}
                <div className="absolute -top-3 left-6 h-5 w-20 bg-yellow-200/70 rotate-[-3deg] z-10" />
                <div className="border-2 border-[#2d2d2d] p-8 rotate-[-1deg] bg-[#f5f0e8]"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)" }}
                >
                  <p className="font-mono text-xs text-[#2d2d2d]/40 mb-6 tracking-widest uppercase">Collage Buttons</p>
                  <div className="flex flex-wrap gap-4 items-start">
                    {/* Primary — mismatched border */}
                    <button className="relative px-6 py-3 bg-[#2d2d2d] text-[#f5f0e8] font-serif font-bold text-base border-t-4 border-t-[#e74c3c] border-b-2 border-b-[#2d2d2d] border-l-4 border-l-[#2d2d2d] border-r-2 border-r-[#9b59b6] hover:bg-[#e74c3c] hover:border-t-[#2d2d2d] transition-colors duration-200 rotate-[-1deg]">
                      CUT THIS
                    </button>
                    {/* Secondary — dashed blue */}
                    <button className="px-6 py-3 bg-transparent text-[#3498db] font-mono text-sm border-2 border-dashed border-[#3498db] hover:bg-[#3498db] hover:text-[#f5f0e8] transition-colors duration-200 rotate-[2deg]">
                      paste here
                    </button>
                    {/* Ghost — hand label */}
                    <button className="relative px-5 py-3 bg-transparent text-[#2d2d2d] font-serif italic text-base border border-[#2d2d2d] hover:border-[#f39c12] hover:text-[#f39c12] transition-colors duration-200 rotate-[-2deg]">
                      <span className="absolute -top-2.5 left-2 text-[10px] font-mono bg-[#f5f0e8] px-1 text-[#f39c12]">label</span>
                      Assemble
                    </button>
                    {/* Stamp style */}
                    <button className="px-6 py-3 bg-[#e74c3c] text-[#f5f0e8] font-sans font-black uppercase tracking-[0.2em] text-xs border-4 border-double border-[#c0392b] hover:bg-[#c0392b] transition-colors duration-200 rotate-[1deg]">
                      STAMP
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* --- Card --- */}
            <RevealBlock delay={0.1}>
              <div className="relative">
                <div className="absolute -top-3 right-8 h-5 w-20 bg-blue-200/60 rotate-[4deg] z-10" />
                <p className="font-mono text-xs text-[#2d2d2d]/40 mb-4 tracking-widest uppercase ml-1">Collage Card</p>
                <div className="relative bg-[#f5f0e8] border-4 border-[#2d2d2d] border-t-[#e74c3c] p-8 rotate-[1deg] max-w-sm group hover:rotate-[0deg] transition-transform duration-300"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)" }}
                >
                  {/* Inner tape */}
                  <div className="absolute -top-2 -left-2 h-4 w-14 bg-yellow-300/70 rotate-[-30deg]" />

                  {/* Layered type elements */}
                  <div className="mb-4">
                    <span className="font-mono text-[10px] tracking-widest text-[#e74c3c] block">FRAGMENT NO. 07</span>
                    <span className="font-serif italic text-xs text-[#2d2d2d]/30 block">— from the archive</span>
                  </div>
                  <h3 className="font-serif font-black text-[#2d2d2d] text-2xl leading-tight mb-2 group-hover:text-[#e74c3c] transition-colors duration-200">
                    Assembled Fragment
                  </h3>
                  <p className="font-sans text-sm text-[#2d2d2d]/55 leading-relaxed mb-5">
                    A card that knows it is a clipping. Layered paper, mismatched borders,
                    the physical memory of scissors and paste.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="h-0.5 w-16 bg-[#e74c3c]" />
                    <span className="font-mono text-[10px] text-[#2d2d2d]/30 rotate-[1deg] inline-block">1968</span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* --- Input --- */}
            <RevealBlock delay={0.14}>
              <div className="relative max-w-md">
                <div className="absolute -top-3 left-12 h-5 w-16 bg-purple-200/60 rotate-[5deg] z-10" />
                <p className="font-mono text-xs text-[#2d2d2d]/40 mb-4 tracking-widest uppercase ml-1">Typewriter Input</p>
                <div className="space-y-5 rotate-[-1deg]">
                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#2d2d2d]/50 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="type here..."
                      className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-[#2d2d2d] text-[#2d2d2d] placeholder-[#2d2d2d]/25 font-mono text-base focus:outline-none focus:border-[#e74c3c] transition-colors duration-150"
                    />
                    <div className="absolute right-0 bottom-3 font-mono text-[10px] text-[#2d2d2d]/20">_</div>
                  </div>
                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#2d2d2d]/50 mb-1">
                      Your Message
                    </label>
                    <textarea
                      placeholder="begin cutting here..."
                      rows={3}
                      className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-[#2d2d2d] text-[#2d2d2d] placeholder-[#2d2d2d]/25 font-mono text-base focus:outline-none focus:border-[#e74c3c] transition-colors duration-150 resize-none"
                    />
                  </div>
                  <button className="px-6 py-2.5 bg-[#2d2d2d] text-[#f5f0e8] font-mono text-xs uppercase tracking-widest border-t-2 border-t-[#e74c3c] hover:bg-[#e74c3c] transition-colors duration-150 rotate-[1deg] inline-block">
                    SUBMIT
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. MIXED TYPOGRAPHY DEMO                                         */}
      {/* ================================================================ */}
      <section
        className="relative bg-[#2d2d2d] py-24 md:py-32 px-6 md:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,0.02) 28px,rgba(255,255,255,0.02) 29px)",
        }}
      >
        {/* Torn top */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <TornEdgeTop fill="#2d2d2d" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="inline-block border border-[#f5f0e8]/30 px-2 py-0.5 text-xs font-mono rotate-[-1deg] text-[#f5f0e8]/60 mb-4">
              05 / Typography
            </span>
            <h2 className="font-serif font-black text-[#f5f0e8] text-4xl md:text-5xl">
              Four Voices,
              <span className="font-mono font-normal text-[#f39c12] ml-3 rotate-[2deg] inline-block">One Text</span>
            </h2>
            <p className="font-serif text-[#f5f0e8]/40 mt-3 max-w-lg">
              The same phrase rendered four ways. Click each style to see the philosophy in action.
            </p>
          </RevealBlock>

          {/* Style selector tabs */}
          <RevealBlock delay={0.08} className="flex flex-wrap gap-3 mb-10">
            {typographyStyles.map((style, i) => (
              <button
                key={style.label}
                onClick={() => setActiveStyle(i)}
                className={`px-4 py-2 font-mono text-xs border transition-all duration-200 ${
                  activeStyle === i
                    ? "bg-[#f5f0e8] text-[#2d2d2d] border-[#f5f0e8]"
                    : "bg-transparent text-[#f5f0e8]/50 border-[#f5f0e8]/20 hover:border-[#f5f0e8]/60 hover:text-[#f5f0e8]"
                }`}
                style={{ rotate: `${(i % 2 === 0 ? -1 : 1)}deg` }}
              >
                {style.label}
              </button>
            ))}
          </RevealBlock>

          {/* Demo area — 4 overlapping versions */}
          <RevealBlock delay={0.12}>
            <div className="relative min-h-[360px] md:min-h-[440px] flex items-center justify-center">
              {typographyStyles.map((style, i) => (
                <div
                  key={style.label}
                  className={`absolute transition-all duration-500 ${style.rotation}`}
                  style={{
                    opacity: activeStyle === i ? 1 : 0.08,
                    transform: `scale(${activeStyle === i ? 1 : 0.85}) rotate(${
                      style.rotation.replace("rotate-[", "").replace("]", "")
                    })`,
                    zIndex: activeStyle === i ? 10 : 1,
                    top: `${10 + i * 5}%`,
                    left: `${5 + i * 3}%`,
                  }}
                >
                  <p
                    className={`${style.font} ${style.weight} ${style.size} ${style.tracking} ${style.style} leading-tight`}
                    style={{ color: activeStyle === i ? style.accent : "#f5f0e8" }}
                  >
                    Design is Collage
                  </p>
                  {activeStyle === i && (
                    <p className="font-mono text-xs text-[#f5f0e8]/40 mt-2">
                      {style.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* All four shown simultaneously at bottom */}
          <RevealBlock delay={0.2} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {typographyStyles.map((style, i) => (
              <button
                key={style.label}
                onClick={() => setActiveStyle(i)}
                className={`relative p-4 border text-left transition-all duration-200 ${
                  activeStyle === i
                    ? "border-[#f5f0e8]/60 bg-[#f5f0e8]/5"
                    : "border-[#f5f0e8]/15 hover:border-[#f5f0e8]/35"
                } ${style.rotation}`}
              >
                <span className="font-mono text-[10px] text-[#f5f0e8]/30 block mb-1 tracking-widest uppercase">
                  {style.label}
                </span>
                <span
                  className={`${style.font} ${style.weight} text-xl ${style.style}`}
                  style={{ color: style.accent }}
                >
                  Design is Collage
                </span>
              </button>
            ))}
          </RevealBlock>
        </div>

        {/* Torn bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <TornEdgeTop fill="#f5f0e8" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. COLOR SYSTEM — Paint chips                                    */}
      {/* ================================================================ */}
      <section
        className="relative bg-[#f5f0e8] py-24 md:py-32 px-6 md:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="inline-block border border-[#2d2d2d] px-2 py-0.5 text-xs font-mono rotate-[1deg] mb-4">
              06 / Color
            </span>
            <h2 className="font-serif font-black text-[#2d2d2d] text-4xl md:text-5xl rotate-[-1deg] inline-block">
              Paint Chips
            </h2>
            <p className="font-serif text-[#2d2d2d]/50 mt-3 max-w-md">
              Swatches cut from different sources — each one carrying its own angle and history.
            </p>
          </RevealBlock>

          {/* Paint chip display */}
          <div className="flex flex-wrap gap-6 md:gap-10 items-start justify-center md:justify-start">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.07}>
                <div className={`relative group cursor-default ${swatch.rotation} hover:rotate-[0deg] transition-transform duration-300`}>
                  {/* Tape corner */}
                  <div
                    className={`absolute -top-2 -right-2 h-4 w-14 ${swatch.tapeColor} rotate-[45deg] z-10`}
                  />

                  {/* Paint chip card */}
                  <div className="border-2 border-[#2d2d2d] overflow-hidden w-36"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)" }}
                  >
                    {/* Color block */}
                    <div
                      className="w-full h-24 group-hover:h-28 transition-all duration-300"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    {/* Info strip */}
                    <div className="p-3 bg-[#f5f0e8]">
                      <p className="font-sans font-black text-[10px] uppercase tracking-widest text-[#2d2d2d] leading-tight">
                        {swatch.name}
                      </p>
                      <p className="font-mono text-[10px] text-[#2d2d2d]/50 mt-0.5">{swatch.hex}</p>
                      <p className="font-serif italic text-[10px] text-[#2d2d2d]/40 mt-0.5">{swatch.label}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage note */}
          <RevealBlock delay={0.4} className="mt-14">
            <div className="relative border-l-4 border-[#e74c3c] pl-6 max-w-xl rotate-[-1deg]">
              <div className="absolute -top-2 left-4 h-4 w-12 bg-yellow-200/70 rotate-[45deg]" />
              <p className="font-serif italic text-[#2d2d2d]/60 text-base leading-relaxed">
                &ldquo;Color in collage is not chosen — it is found. The red that bleeds from a magazine advertisement
                carries more truth than any Pantone swatch.&rdquo;
              </p>
              <span className="font-mono text-xs text-[#2d2d2d]/30 block mt-2">— Studio Note, 1968</span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. MANIFESTO WALL                                                */}
      {/* ================================================================ */}
      <section
        id="manifesto"
        className="relative bg-[#2d2d2d] py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,0.015) 28px,rgba(255,255,255,0.015) 29px)",
        }}
      >
        {/* Torn top */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <TornEdgeTop fill="#2d2d2d" />
        </div>

        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="inline-block border border-[#e74c3c]/50 px-2 py-0.5 text-xs font-mono rotate-[1deg] text-[#e74c3c] mb-4">
              07 / Manifesto
            </span>
            <h2 className="font-serif font-black text-[#f5f0e8] text-4xl md:text-5xl rotate-[-1deg] inline-block">
              The Wall
            </h2>
            <p className="font-sans text-[#f5f0e8]/40 text-sm mt-2 font-normal">
              Click any statement to pin it. Collect what matters to you.
            </p>
          </RevealBlock>

          {/* Manifesto statements wall */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div className="flex flex-wrap gap-6 md:gap-8 items-start">
              {manifestoStatements.map((stmt, i) => {
                const isPinned = pinnedItems.includes(i);
                return (
                  <RevealBlock key={i} delay={i * 0.06}>
                    <button
                      onClick={() => togglePin(i)}
                      className={`relative group cursor-pointer text-left transition-all duration-300 ${stmt.rotation} hover:scale-105`}
                    >
                      {/* Pin indicator */}
                      {isPinned && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#e74c3c] z-10 ring-2 ring-[#f5f0e8]" />
                      )}
                      <span
                        className={`${stmt.font} ${stmt.size} leading-tight block`}
                        style={{
                          color: isPinned ? "#f5f0e8" : stmt.color,
                          textShadow: isPinned ? `0 0 30px ${stmt.color}` : "none",
                          transition: "color 0.3s, text-shadow 0.3s",
                        }}
                      >
                        {stmt.text}
                      </span>
                      {isPinned && (
                        <div
                          className="h-0.5 mt-1 w-full transition-all duration-300"
                          style={{ backgroundColor: stmt.color }}
                        />
                      )}
                    </button>
                  </RevealBlock>
                );
              })}
            </div>

            {/* Scattered background text fragments */}
            <div className="absolute bottom-0 right-0 opacity-[0.04] pointer-events-none select-none">
              <p className="font-mono text-[120px] font-black text-[#f5f0e8] leading-none">
                CUT
              </p>
            </div>
          </div>

          {/* Pin count display */}
          {pinnedItems.length > 0 && (
            <div className="mt-8 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[#e74c3c]" />
              <span className="font-mono text-xs text-[#f5f0e8]/50">
                {pinnedItems.length} statement{pinnedItems.length !== 1 ? "s" : ""} pinned to your board
              </span>
            </div>
          )}
        </div>

        {/* Torn bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <TornEdgeTop fill="#f5f0e8" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. DO / DON'T RULES — Pinned flyers                             */}
      {/* ================================================================ */}
      <section
        id="rules"
        className="relative bg-[#f5f0e8] py-24 md:py-32 px-6 md:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="inline-block border border-[#2d2d2d] px-2 py-0.5 text-xs font-mono rotate-[-2deg] mb-4">
              08 / Guidelines
            </span>
            <h2 className="font-serif font-black text-[#2d2d2d] text-4xl md:text-5xl rotate-[1deg] inline-block">
              Pinned Flyers
            </h2>
            <p className="font-serif text-[#2d2d2d]/50 mt-3 max-w-md">
              Two flyers, torn from different sources, pinned side by side. Read both.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* DO flyer */}
            <RevealBlock delay={0.06}>
              <div className="relative rotate-[-2deg] hover:rotate-[-1deg] transition-transform duration-300">
                {/* Pin */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#e74c3c] z-20 ring-2 ring-[#2d2d2d]" />

                {/* Tape strips */}
                <div className="absolute -top-2 left-8 h-4 w-16 bg-yellow-200/70 rotate-[-5deg] z-10" />
                <div className="absolute -top-2 right-8 h-4 w-14 bg-yellow-300/60 rotate-[6deg] z-10" />

                <div
                  className="border-4 border-[#2d2d2d] border-t-[#e74c3c] bg-[#f5f0e8] p-8"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)" }}
                >
                  {/* Rubber stamp header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 border-4 border-[#e74c3c] rotate-[-8deg]">
                      <span className="font-sans font-black text-[#e74c3c] text-sm tracking-widest">DO</span>
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-[#2d2d2d] text-2xl leading-tight">
                        Embrace These
                      </h3>
                      <span className="font-mono text-[10px] text-[#e74c3c] tracking-widest">APPROVED / 1968</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {doRules.map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start group">
                        <span className="font-mono text-[10px] text-[#e74c3c] flex-shrink-0 mt-1 tracking-widest">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-sm text-[#2d2d2d]/70 leading-relaxed group-hover:text-[#2d2d2d] transition-colors duration-150">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom accent */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-0.5 flex-1 bg-[#e74c3c]" />
                    <span className="font-mono text-[10px] text-[#e74c3c] tracking-widest">COLLAGE ART</span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T flyer */}
            <RevealBlock delay={0.12}>
              <div className="relative rotate-[2deg] hover:rotate-[1deg] transition-transform duration-300 md:mt-8">
                {/* Pin */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#3498db] z-20 ring-2 ring-[#2d2d2d]" />

                {/* Tape strips */}
                <div className="absolute -top-2 left-10 h-4 w-14 bg-blue-200/60 rotate-[4deg] z-10" />
                <div className="absolute -top-2 right-10 h-4 w-16 bg-blue-100/70 rotate-[-6deg] z-10" />

                <div
                  className="border-4 border-[#2d2d2d] border-t-[#3498db] bg-[#f5f0e8] p-8"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)" }}
                >
                  {/* Cross-out header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative inline-flex items-center justify-center w-12 h-12 border-4 border-[#3498db] rotate-[5deg]">
                      <span className="font-sans font-black text-[#3498db] text-xs tracking-widest">NO</span>
                      {/* X mark */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg viewBox="0 0 48 48" className="w-full h-full" stroke="#e74c3c" strokeWidth="3">
                          <line x1="8" y1="8" x2="40" y2="40" />
                          <line x1="40" y1="8" x2="8" y2="40" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-[#2d2d2d] text-2xl leading-tight">
                        Avoid These
                      </h3>
                      <span className="font-mono text-[10px] text-[#3498db] tracking-widest">PROHIBITED / ALWAYS</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="font-mono text-[10px] text-[#2d2d2d]/25 flex-shrink-0 mt-1 tracking-widest line-through">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-sm text-[#2d2d2d]/50 leading-relaxed line-through decoration-[#e74c3c]/60">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom accent */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-0.5 flex-1 bg-[#3498db]" />
                    <span className="font-mono text-[10px] text-[#3498db] tracking-widest">STYLEKIT</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FOOTER                                                         */}
      {/* ================================================================ */}
      <footer
        className="relative bg-[#f5f0e8] pt-0 pb-16 px-6 md:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.03) 28px,rgba(0,0,0,0.03) 29px)",
        }}
      >
        {/* Torn paper top edge from dark section */}
        <div className="w-full mb-12">
          <TornEdgeTop fill="#f5f0e8" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-12">

            {/* Assembled by credit */}
            <div>
              <div className="relative inline-block rotate-[-1deg] mb-4">
                <div className="absolute -top-2 left-3 h-4 w-12 bg-yellow-200/70 rotate-[30deg]" />
                <div className="border-2 border-[#2d2d2d] px-5 py-3 bg-[#f5f0e8]">
                  <p className="font-sans font-black text-xl uppercase tracking-[0.15em] text-[#2d2d2d]">
                    ASSEMBLED BY
                  </p>
                  <p className="font-serif italic text-3xl text-[#e74c3c]">StyleKit</p>
                </div>
              </div>
              <p className="font-mono text-xs text-[#2d2d2d]/40 rotate-[1deg] inline-block ml-2">
                — collage-art / 2024
              </p>
            </div>

            {/* Color strip */}
            <div className="flex items-end gap-1 rotate-[1deg]">
              {["#2d2d2d", "#e74c3c", "#3498db", "#f39c12", "#9b59b6", "#f5f0e8"].map((c, i) => (
                <div
                  key={c}
                  className="border border-[#2d2d2d]"
                  style={{
                    backgroundColor: c,
                    width: "28px",
                    height: `${28 + i * 6}px`,
                  }}
                />
              ))}
            </div>

            {/* Footer nav */}
            <nav className="flex flex-col gap-2 rotate-[-1deg]">
              <Link
                href="/styles/collage-art"
                className="font-mono text-xs text-[#2d2d2d]/50 hover:text-[#e74c3c] transition-colors duration-150 inline-flex items-center gap-1"
              >
                <span className="text-[#e74c3c]">→</span> Docs
              </Link>
              <Link
                href="/styles"
                className="font-mono text-xs text-[#2d2d2d]/50 hover:text-[#3498db] transition-colors duration-150 inline-flex items-center gap-1"
              >
                <span className="text-[#3498db]">→</span> All Styles
              </Link>
              <Link
                href="/"
                className="font-mono text-xs text-[#2d2d2d]/50 hover:text-[#9b59b6] transition-colors duration-150 inline-flex items-center gap-1"
              >
                <span className="text-[#9b59b6]">→</span> Home
              </Link>
            </nav>
          </div>

          {/* Bottom rule row */}
          <div className="border-t-2 border-[#2d2d2d] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-mono text-[10px] text-[#2d2d2d]/30 tracking-widest uppercase">
                Dada / 1916
              </span>
              <span className="w-1 h-1 rounded-full bg-[#2d2d2d]/20 inline-block" />
              <span className="font-serif italic text-[10px] text-[#2d2d2d]/30">
                Pop Art / 1960
              </span>
              <span className="w-1 h-1 rounded-full bg-[#2d2d2d]/20 inline-block" />
              <span className="font-sans font-black text-[10px] text-[#2d2d2d]/30 tracking-widest uppercase">
                Collage / Always
              </span>
            </div>
            <div className="flex items-center gap-2 rotate-[-1deg]">
              <div className="w-3 h-3 bg-[#e74c3c]" />
              <span className="font-mono text-[10px] text-[#2d2d2d]/40 tracking-widest">
                StyleKit Component System
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
