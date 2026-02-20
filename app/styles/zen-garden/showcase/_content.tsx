"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
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
      { threshold: 0.15, ...options },
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
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const palette = [
  {
    japaneseName: "苔色",
    englishName: "Dark Moss",
    hex: "#4a5548",
    bg: "bg-[#4a5548]",
    textOnSwatch: "text-[#f5f3ee]",
    border: false,
  },
  {
    japaneseName: "砂白",
    englishName: "Sand White",
    hex: "#f5f3ee",
    bg: "bg-[#f5f3ee]",
    textOnSwatch: "text-[#4a5548]",
    border: true,
  },
  {
    japaneseName: "苔緑",
    englishName: "Moss Green",
    hex: "#8a9a7b",
    bg: "bg-[#8a9a7b]",
    textOnSwatch: "text-[#f5f3ee]",
    border: false,
  },
  {
    japaneseName: "砂岩",
    englishName: "Sand Stone",
    hex: "#c4bba8",
    bg: "bg-[#c4bba8]",
    textOnSwatch: "text-[#4a5548]",
    border: false,
  },
  {
    japaneseName: "石色",
    englishName: "Stone",
    hex: "#7a7062",
    bg: "bg-[#7a7062]",
    textOnSwatch: "text-[#f5f3ee]",
    border: false,
  },
];

const stones = [
  {
    character: "間",
    reading: "Ma",
    title: "Negative Space",
    description:
      "In karesansui, emptiness is not absence — it is presence. The void between stones carries as much weight as the stones themselves. White space breathes, holds tension, and directs the eye without demanding it.",
    principle:
      "Never fill space for the sake of filling. Let silence be a design element.",
  },
  {
    character: "石",
    reading: "Ishi",
    title: "Stone Placement",
    description:
      "Each stone is chosen and placed with deliberate intention. The relationship between stones — their proximity, orientation, and visual weight — creates narrative without words. Three stones become conversation.",
    principle:
      "Every element earns its position through considered relationship with others.",
  },
  {
    character: "砂",
    reading: "Suna",
    title: "Sand Patterns",
    description:
      "Raked sand represents water in motion — ripples, currents, waves frozen in mineral stillness. The pattern emanates outward from each stone, revealing invisible forces made tangible.",
    principle:
      "Subtle visual rhythm guides attention more powerfully than bold contrast.",
  },
];

const doRules = [
  "Generous whitespace — let sections breathe with py-32 or more",
  "Serif typography with font-light or font-extralight weight",
  "Borders at /20 to /40 opacity — whisper, never shout",
  "Transitions of 700ms to 1000ms — nothing abrupt",
  "Text that clarifies on hover — semi-transparent at rest",
  "Left-border accent cards over full-border containers",
  "Monochromatic sand and moss palette exclusively",
  "Asymmetric layouts that feel considered, not centered by default",
];

const dontRules = [
  "Never use translate, scale, or rotate on interactive elements",
  "Never use transitions under 700ms — pace is philosophy",
  "Never use saturated or bright accent colors",
  "Never fill empty space with decorative elements",
  "Never use box-shadow with heavy blur or offset",
  "Never use font-bold — weight implies aggression",
  "Never use rounded-full on non-circular elements",
  "Never animate with bounce or spring easing",
];

/* ------------------------------------------------------------------ */
/*  SVG Raked Sand Patterns                                            */
/* ------------------------------------------------------------------ */

function ConcentricCirclesSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <line
          key={i}
          x1="0"
          y1={i * 10 + 5}
          x2="200"
          y2={i * 10 + 5}
          stroke="#c4bba8"
          strokeWidth="0.5"
          opacity="0.4"
        />
      ))}
      {[20, 36, 52, 68, 84].map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          stroke="#8a9a7b"
          strokeWidth="0.8"
          opacity={0.6 - i * 0.08}
          fill="none"
        />
      ))}
      <ellipse cx="100" cy="100" rx="14" ry="11" fill="#7a7062" opacity="0.7" />
      <ellipse cx="100" cy="100" rx="10" ry="8" fill="#4a5548" opacity="0.5" />
    </svg>
  );
}

function ParallelLinesSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 18 }, (_, i) => {
        const y = i * 11 + 6;
        const wave = Math.sin(i * 0.4) * 3;
        return (
          <path
            key={i}
            d={`M 0 ${y + wave} Q 50 ${y - wave} 100 ${y + wave} Q 150 ${y - wave} 200 ${y + wave}`}
            stroke="#8a9a7b"
            strokeWidth="0.7"
            opacity={0.35 + (i % 3) * 0.05}
            fill="none"
          />
        );
      })}
      <ellipse cx="60" cy="110" rx="8" ry="6" fill="#7a7062" opacity="0.6" />
      <ellipse cx="75" cy="106" rx="5" ry="4" fill="#4a5548" opacity="0.5" />
      <ellipse cx="68" cy="116" rx="4" ry="3" fill="#c4bba8" opacity="0.5" />
    </svg>
  );
}

function FlowingCurvesSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 16 }, (_, i) => {
        const t = i / 16;
        const yBase = i * 12 + 4;
        const cp1x = 50 + Math.sin(t * Math.PI * 2) * 20;
        const cp2x = 150 + Math.cos(t * Math.PI * 2) * 20;
        return (
          <path
            key={i}
            d={`M 0 ${yBase} C ${cp1x} ${yBase - 8}, ${cp2x} ${yBase + 8}, 200 ${yBase}`}
            stroke="#c4bba8"
            strokeWidth="0.8"
            opacity={0.4 + (i % 4) * 0.06}
            fill="none"
          />
        );
      })}
      <ellipse cx="130" cy="80" rx="12" ry="9" fill="#4a5548" opacity="0.55" />
      <ellipse cx="130" cy="80" rx="7" ry="5" fill="#7a7062" opacity="0.4" />
    </svg>
  );
}

function RakedSandTextureSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 40 }, (_, i) => {
        const y = i * 15 + 5;
        const amp = 1.5 + (i % 5) * 0.3;
        return (
          <path
            key={i}
            d={`M 0 ${y} Q 300 ${y - amp} 600 ${y + amp} Q 900 ${y - amp} 1200 ${y}`}
            stroke="#c4bba8"
            strokeWidth="0.6"
            opacity="0.18"
            fill="none"
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main showcase component                                            */
/* ------------------------------------------------------------------ */

export default function ZenGardenShowcase() {
  const [activeTab, setActiveTab] = useState<"Buttons" | "Cards" | "Forms">(
    "Buttons",
  );
  const [tabVisible, setTabVisible] = useState(true);

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: subtitleRef, inView: subtitleInView } = useInView();

  function handleTabChange(tab: "Buttons" | "Cards" | "Forms") {
    if (tab === activeTab) return;
    setTabVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setTabVisible(true);
    }, 200);
  }

  return (
    <div
      className="min-h-screen font-serif"
      style={{ backgroundColor: "#f5f3ee", color: "#4a5548" }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Nav                                                              */}
      {/* ---------------------------------------------------------------- */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-10 py-5 border-b border-[#c4bba8]/20"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <span
          className="font-serif font-light tracking-widest text-sm text-[#4a5548]"
          style={{ letterSpacing: "0.2em" }}
        >
          枯山水 / Zen Garden
        </span>
        <div className="flex items-center gap-10">
          <a
            href="#principles"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/70 hover:text-[#4a5548] transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            principles
          </a>
          <a
            href="#patterns"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/70 hover:text-[#4a5548] transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            patterns
          </a>
          <a
            href="#components"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/70 hover:text-[#4a5548] transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            components
          </a>
          <Link
            href="/"
            className="font-serif font-light text-xs tracking-widest text-[#4a5548]/60 hover:text-[#4a5548] transition-colors duration-1000 border-b border-[#8a9a7b]/30 pb-px"
            style={{ letterSpacing: "0.15em" }}
          >
            StyleKit →
          </Link>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative flex flex-col items-center justify-center py-48 overflow-hidden"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RakedSandTextureSVG />

        {/* Background character */}
        <div
          className="absolute select-none pointer-events-none font-serif font-light text-[180px] text-[#4a5548]/[0.06] leading-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          静
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Main title */}
          <div
            ref={heroRef}
            style={{
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1
              className="font-serif font-light text-4xl md:text-6xl text-[#4a5548]/60 tracking-widest mb-0"
              style={{ letterSpacing: "0.3em" }}
            >
              karesansui
            </h1>
          </div>

          {/* Divider and subtitle */}
          <div
            ref={subtitleRef}
            className="flex flex-col items-center"
            style={{
              opacity: subtitleInView ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <div className="h-px w-12 bg-[#8a9a7b]/40 mx-auto my-12" />

            <p
              className="font-serif font-light text-base text-[#7a7062]/60 tracking-widest mb-16"
              style={{ letterSpacing: "0.2em" }}
            >
              the art of absence
            </p>

            <button
              className="font-serif font-light text-xs tracking-widest text-[#4a5548]/70 bg-transparent border border-transparent px-10 py-3 hover:border-[#8a9a7b]/30 hover:text-[#4a5548] hover:bg-[#8a9a7b]/5 transition-all duration-1000"
              style={{ letterSpacing: "0.2em" }}
            >
              enter stillness
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Components Demo                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="components"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-4xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            components
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            Interface Elements
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-16" />

          {/* Tab selector */}
          <div className="flex gap-0 mb-16 border-b border-[#c4bba8]/20">
            {(["Buttons", "Cards", "Forms"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="font-serif font-light text-xs tracking-widest px-8 py-4 transition-all duration-1000"
                style={{
                  letterSpacing: "0.15em",
                  color:
                    activeTab === tab ? "#4a5548" : "rgba(74, 85, 72, 0.4)",
                  borderBottom:
                    activeTab === tab
                      ? "1px solid #8a9a7b"
                      : "1px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            style={{
              opacity: tabVisible ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Buttons panel */}
            {activeTab === "Buttons" && (
              <div className="space-y-10">
                <p
                  className="font-serif font-light text-xs tracking-widest text-[#7a7062]/50 mb-12"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Stillness in interaction — buttons clarify without
                  announcement.
                </p>
                <div className="flex flex-wrap gap-8 items-end">
                  {/* Primary */}
                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border border-[#4a5548]/30 text-[#4a5548]/60 hover:text-[#4a5548] hover:border-[#4a5548]/60 hover:bg-[#4a5548]/5 transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      primary
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8] tracking-widest">
                      moss border
                    </span>
                  </div>

                  {/* Secondary */}
                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border-b border-[#8a9a7b]/30 text-[#7a7062]/50 hover:text-[#4a5548] hover:border-[#8a9a7b]/70 bg-transparent transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      secondary
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8] tracking-widest">
                      bottom border only
                    </span>
                  </div>

                  {/* Ghost */}
                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 text-[#4a5548]/30 hover:text-[#4a5548]/70 bg-transparent border border-transparent transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      ghost
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8] tracking-widest">
                      no border at rest
                    </span>
                  </div>

                  {/* Filled */}
                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 bg-[#4a5548]/80 text-[#f5f3ee] hover:bg-[#4a5548] transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      filled
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8] tracking-widest">
                      dark moss fill
                    </span>
                  </div>
                </div>

                {/* Disabled state */}
                <div className="pt-8 border-t border-[#c4bba8]/15">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/80 mb-6"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    disabled states
                  </p>
                  <div className="flex gap-8">
                    <button
                      disabled
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border border-[#c4bba8]/20 text-[#c4bba8]/40 cursor-not-allowed"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      unavailable
                    </button>
                    <button
                      disabled
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 bg-[#c4bba8]/20 text-[#7a7062]/30 cursor-not-allowed"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      suspended
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cards panel */}
            {activeTab === "Cards" && (
              <div className="space-y-8">
                <p
                  className="font-serif font-light text-xs tracking-widest text-[#7a7062]/50 mb-12"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Each card is a stone — placed with intention, weighted in
                  silence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="border-l border-[#8a9a7b]/30 pl-6 py-6 group cursor-default transition-all duration-1000 hover:border-[#8a9a7b]/60">
                    <p
                      className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 group-hover:text-[#8a9a7b]/80 transition-colors duration-1000 mb-4"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      observation
                    </p>
                    <h3 className="font-serif font-light text-lg text-[#4a5548]/50 group-hover:text-[#4a5548]/80 transition-colors duration-1000 mb-4 leading-snug">
                      The space between
                    </h3>
                    <p className="font-serif font-light text-xs text-[#7a7062]/40 group-hover:text-[#7a7062]/70 transition-colors duration-1000 leading-relaxed">
                      Negative space defines form as much as form defines space.
                      In stillness, relationship emerges.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="border-l border-[#8a9a7b]/30 pl-6 py-6 group cursor-default transition-all duration-1000 hover:border-[#8a9a7b]/60">
                    <p
                      className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 group-hover:text-[#8a9a7b]/80 transition-colors duration-1000 mb-4"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      principle
                    </p>
                    <h3 className="font-serif font-light text-lg text-[#4a5548]/50 group-hover:text-[#4a5548]/80 transition-colors duration-1000 mb-4 leading-snug">
                      One stone, three views
                    </h3>
                    <p className="font-serif font-light text-xs text-[#7a7062]/40 group-hover:text-[#7a7062]/70 transition-colors duration-1000 leading-relaxed">
                      A single element placed with care reveals itself
                      differently from every approach. Position is meaning.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="border-l border-[#8a9a7b]/30 pl-6 py-6 group cursor-default transition-all duration-1000 hover:border-[#8a9a7b]/60">
                    <p
                      className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 group-hover:text-[#8a9a7b]/80 transition-colors duration-1000 mb-4"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      practice
                    </p>
                    <h3 className="font-serif font-light text-lg text-[#4a5548]/50 group-hover:text-[#4a5548]/80 transition-colors duration-1000 mb-4 leading-snug">
                      Patience as method
                    </h3>
                    <p className="font-serif font-light text-xs text-[#7a7062]/40 group-hover:text-[#7a7062]/70 transition-colors duration-1000 leading-relaxed">
                      Slow transitions teach the eye to rest. The destination
                      arrives without announcement.
                    </p>
                  </div>
                </div>

                {/* Wide card */}
                <div className="border-l border-[#c4bba8]/40 pl-8 py-8 mt-8 group cursor-default transition-all duration-1000 hover:border-[#8a9a7b]/40">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/40 group-hover:text-[#8a9a7b]/70 transition-colors duration-1000 mb-3"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        featured
                      </p>
                      <h3 className="font-serif font-light text-2xl text-[#4a5548]/40 group-hover:text-[#4a5548]/70 transition-colors duration-1000 mb-3">
                        The garden as mirror
                      </h3>
                      <p className="font-serif font-light text-xs text-[#7a7062]/35 group-hover:text-[#7a7062]/60 transition-colors duration-1000 leading-relaxed max-w-md">
                        What we remove reveals what remains. The kare-sansui
                        gardener removes until only truth persists.
                      </p>
                    </div>
                    <span
                      className="font-serif font-light text-5xl text-[#4a5548]/10 group-hover:text-[#4a5548]/20 transition-colors duration-1000 leading-none select-none ml-8"
                      aria-hidden="true"
                    >
                      禅
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Forms panel */}
            {activeTab === "Forms" && (
              <div className="space-y-10 max-w-md">
                <p
                  className="font-serif font-light text-xs tracking-widest text-[#7a7062]/50 mb-12"
                  style={{ letterSpacing: "0.15em" }}
                >
                  Minimal input — only what is necessary remains.
                </p>

                <div className="space-y-8">
                  {/* Text input */}
                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 mb-3 group-focus-within:text-[#8a9a7b]/80 transition-colors duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      your name
                    </label>
                    <input
                      type="text"
                      placeholder="enter quietly"
                      className="w-full bg-transparent border-0 border-b border-[#c4bba8]/30 focus:border-[#8a9a7b]/50 pb-3 font-serif font-light text-sm text-[#4a5548]/60 placeholder:text-[#c4bba8]/60 outline-none transition-all duration-1000"
                    />
                  </div>

                  {/* Email input */}
                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 mb-3 group-focus-within:text-[#8a9a7b]/80 transition-colors duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      correspondence
                    </label>
                    <input
                      type="email"
                      placeholder="address"
                      className="w-full bg-transparent border-0 border-b border-[#c4bba8]/30 focus:border-[#8a9a7b]/50 pb-3 font-serif font-light text-sm text-[#4a5548]/60 placeholder:text-[#c4bba8]/60 outline-none transition-all duration-1000"
                    />
                  </div>

                  {/* Textarea */}
                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 mb-3 group-focus-within:text-[#8a9a7b]/80 transition-colors duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      reflection
                    </label>
                    <textarea
                      placeholder="what remains unsaid"
                      rows={4}
                      className="w-full bg-transparent border-b border-[#c4bba8]/30 focus:border-[#8a9a7b]/50 pb-3 font-serif font-light text-sm text-[#4a5548]/60 placeholder:text-[#c4bba8]/60 outline-none resize-none transition-all duration-1000"
                    />
                  </div>

                  {/* Select */}
                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 mb-3"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      intention
                    </label>
                    <select className="w-full bg-transparent border-b border-[#c4bba8]/30 pb-3 font-serif font-light text-sm text-[#4a5548]/60 outline-none appearance-none cursor-pointer transition-all duration-1000 hover:border-[#8a9a7b]/40">
                      <option value="">choose a path</option>
                      <option value="stillness">stillness</option>
                      <option value="observation">observation</option>
                      <option value="practice">practice</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-12 py-3.5 border border-[#4a5548]/20 text-[#4a5548]/50 hover:text-[#4a5548]/80 hover:border-[#4a5548]/40 hover:bg-[#4a5548]/[0.03] transition-all duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      submit in silence
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Color System                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-4xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            palette
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            Five Tones of the Garden
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-20" />

          <div className="space-y-6">
            {palette.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.12}>
                <div className="flex items-center gap-8 group">
                  {/* Elongated swatch */}
                  <div
                    className={`${swatch.bg} flex-shrink-0 transition-all duration-1000 group-hover:opacity-80`}
                    style={{
                      width: "180px",
                      height: "48px",
                      border: swatch.border ? "1px solid #c4bba8" : undefined,
                    }}
                  />
                  {/* Labels */}
                  <div className="flex items-baseline gap-8">
                    <span
                      className="font-serif font-light text-2xl text-[#4a5548]/30 group-hover:text-[#4a5548]/60 transition-colors duration-1000"
                      style={{ minWidth: "48px" }}
                    >
                      {swatch.japaneseName}
                    </span>
                    <span
                      className="font-serif font-light text-sm text-[#7a7062]/50 group-hover:text-[#7a7062]/80 transition-colors duration-1000 tracking-widest"
                      style={{ letterSpacing: "0.12em", minWidth: "120px" }}
                    >
                      {swatch.englishName}
                    </span>
                    <span className="font-mono font-light text-xs text-[#c4bba8] group-hover:text-[#7a7062]/60 transition-colors duration-1000 tracking-wider">
                      {swatch.hex}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The Three Stones — Design Principles                             */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="principles"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            philosophy
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            The Three Stones
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-24" />

          {/* Asymmetric placement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {stones.map((stone, i) => (
              <RevealBlock
                key={stone.character}
                delay={i * 0.18}
                className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-8" : ""}
              >
                <div className="border-l border-[#8a9a7b]/30 pl-7 group hover:border-[#8a9a7b]/60 transition-all duration-1000">
                  {/* Character */}
                  <div className="mb-6">
                    <span
                      className="font-serif font-light text-5xl text-[#4a5548]/20 group-hover:text-[#4a5548]/40 transition-colors duration-1000 leading-none block"
                      aria-hidden="true"
                    >
                      {stone.character}
                    </span>
                    <span
                      className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/40 group-hover:text-[#8a9a7b]/70 transition-colors duration-1000"
                      style={{ letterSpacing: "0.25em" }}
                    >
                      {stone.reading}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-light text-lg text-[#4a5548]/50 group-hover:text-[#4a5548]/80 transition-colors duration-1000 mb-5 tracking-wide">
                    {stone.title}
                  </h3>

                  {/* Description */}
                  <p className="font-serif font-light text-xs text-[#7a7062]/40 group-hover:text-[#7a7062]/65 transition-colors duration-1000 leading-relaxed mb-6">
                    {stone.description}
                  </p>

                  {/* Principle */}
                  <p
                    className="font-serif font-light text-[10px] text-[#8a9a7b]/35 group-hover:text-[#8a9a7b]/60 transition-colors duration-1000 leading-relaxed tracking-wider border-t border-[#c4bba8]/20 pt-5"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {stone.principle}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Raked Sand Patterns Demo                                         */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="patterns"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            patterns
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            Raked Sand
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-24" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Concentric */}
            <RevealBlock delay={0}>
              <div className="group">
                <div
                  className="w-full mb-10 opacity-60 group-hover:opacity-90 transition-opacity duration-1000"
                  style={{ height: "200px" }}
                >
                  <ConcentricCirclesSVG />
                </div>
                <div className="border-l border-[#8a9a7b]/25 pl-5">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    同心円 / doshinen
                  </p>
                  <h4 className="font-serif font-light text-sm text-[#4a5548]/50 group-hover:text-[#4a5548]/75 transition-colors duration-1000 mb-3">
                    Concentric Circles
                  </h4>
                  <p className="font-serif font-light text-[11px] text-[#7a7062]/40 group-hover:text-[#7a7062]/65 transition-colors duration-1000 leading-relaxed">
                    Radiating from each stone, concentric rings represent the
                    ripples that a single presence creates in still water.
                    Distance diminishes; influence does not.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Parallel */}
            <RevealBlock delay={0.15}>
              <div className="group">
                <div
                  className="w-full mb-10 opacity-60 group-hover:opacity-90 transition-opacity duration-1000"
                  style={{ height: "200px" }}
                >
                  <ParallelLinesSVG />
                </div>
                <div className="border-l border-[#8a9a7b]/25 pl-5">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    平行線 / heikousen
                  </p>
                  <h4 className="font-serif font-light text-sm text-[#4a5548]/50 group-hover:text-[#4a5548]/75 transition-colors duration-1000 mb-3">
                    Parallel Lines
                  </h4>
                  <p className="font-serif font-light text-[11px] text-[#7a7062]/40 group-hover:text-[#7a7062]/65 transition-colors duration-1000 leading-relaxed">
                    Calm water made solid. Parallel lines suggest the mirror
                    surface of a lake — infinite depth without motion, stillness
                    as the highest state.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Flowing */}
            <RevealBlock delay={0.3}>
              <div className="group">
                <div
                  className="w-full mb-10 opacity-60 group-hover:opacity-90 transition-opacity duration-1000"
                  style={{ height: "200px" }}
                >
                  <FlowingCurvesSVG />
                </div>
                <div className="border-l border-[#8a9a7b]/25 pl-5">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    流れ / nagare
                  </p>
                  <h4 className="font-serif font-light text-sm text-[#4a5548]/50 group-hover:text-[#4a5548]/75 transition-colors duration-1000 mb-3">
                    Flowing Curves
                  </h4>
                  <p className="font-serif font-light text-[11px] text-[#7a7062]/40 group-hover:text-[#7a7062]/65 transition-colors duration-1000 leading-relaxed">
                    Wind made visible. Gentle undulation shows that even mineral
                    stillness contains memory of movement — past and present held
                    in one surface.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DO / DON'T Principles                                            */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            discipline
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            The Gardener&apos;s Code
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-24" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* DO */}
            <div>
              <p
                className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/60 mb-10"
                style={{ letterSpacing: "0.3em" }}
              >
                OBSERVE — what to cultivate
              </p>
              <div className="space-y-6">
                {doRules.map((rule, i) => (
                  <RevealBlock key={i} delay={i * 0.07}>
                    <div className="border-l border-[#8a9a7b]/40 pl-5 py-1 group hover:border-[#8a9a7b]/70 transition-all duration-1000">
                      <p className="font-serif font-light text-xs text-[#4a5548]/45 group-hover:text-[#4a5548]/70 transition-colors duration-1000 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* DON'T */}
            <div>
              <p
                className="font-serif font-light text-[10px] tracking-widest text-[#7a7062]/50 mb-10"
                style={{ letterSpacing: "0.3em" }}
              >
                RELEASE — what to remove
              </p>
              <div className="space-y-6">
                {dontRules.map((rule, i) => (
                  <RevealBlock key={i} delay={i * 0.07 + 0.1}>
                    <div className="border-l border-[#7a7062]/30 pl-5 py-1 group hover:border-[#7a7062]/50 transition-all duration-1000">
                      <p className="font-serif font-light text-xs text-[#4a5548]/35 group-hover:text-[#4a5548]/60 transition-colors duration-1000 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Typography Showcase                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-4xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            typography
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            Weights of Silence
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-20" />

          <div className="space-y-14">
            {/* Display */}
            <RevealBlock delay={0}>
              <div className="flex items-baseline gap-12 border-b border-[#c4bba8]/15 pb-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/70 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.15em" }}
                >
                  display
                </span>
                <div>
                  <p className="font-serif font-extralight text-5xl text-[#4a5548]/40 leading-tight mb-2">
                    Still water
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    font-extralight / 48px / tracking-normal
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Heading */}
            <RevealBlock delay={0.1}>
              <div className="flex items-baseline gap-12 border-b border-[#c4bba8]/15 pb-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/70 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.15em" }}
                >
                  heading
                </span>
                <div>
                  <p
                    className="font-serif font-light text-3xl text-[#4a5548]/50 leading-tight mb-2 tracking-widest"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    The space between stones
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    font-light / 30px / tracking-widest
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Body */}
            <RevealBlock delay={0.2}>
              <div className="flex items-baseline gap-12 border-b border-[#c4bba8]/15 pb-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/70 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.15em" }}
                >
                  body
                </span>
                <div>
                  <p className="font-serif font-light text-sm text-[#7a7062]/60 leading-relaxed mb-2 max-w-md">
                    In the karesansui tradition, each placement is irrevocable.
                    The monk rakes with intention, knowing that tomorrow the wind
                    may disturb the pattern — and that is also correct.
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    font-light / 14px / leading-relaxed
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Caption */}
            <RevealBlock delay={0.3}>
              <div className="flex items-baseline gap-12">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/70 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.15em" }}
                >
                  caption
                </span>
                <div>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8]/80 tracking-widest mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    ryoanji — kyoto, japan — 15th century
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    font-light / 10px / tracking-widest
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Spacing & Rhythm                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-4xl mx-auto">
          <p
            className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
            style={{ letterSpacing: "0.25em" }}
          >
            rhythm
          </p>
          <h2
            className="font-serif font-light text-3xl text-[#4a5548]/70 tracking-wider mb-2"
            style={{ letterSpacing: "0.15em" }}
          >
            Spatial Cadence
          </h2>
          <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-20" />

          <div className="space-y-8">
            {[
              {
                label: "py-8",
                size: "32px",
                desc: "inline elements, tight groupings",
              },
              {
                label: "py-16",
                size: "64px",
                desc: "related sections, same thought",
              },
              {
                label: "py-24",
                size: "96px",
                desc: "section breathing room",
              },
              {
                label: "py-32",
                size: "128px",
                desc: "thematic separation",
              },
              {
                label: "py-40",
                size: "160px",
                desc: "major transitions",
              },
              {
                label: "py-48",
                size: "192px",
                desc: "hero and meditative sections",
              },
            ].map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.08}>
                <div className="flex items-center gap-8 group">
                  <span className="font-mono font-light text-xs text-[#8a9a7b]/40 group-hover:text-[#8a9a7b]/70 transition-colors duration-1000 w-20 flex-shrink-0">
                    {item.label}
                  </span>
                  <div
                    className="bg-[#8a9a7b]/10 group-hover:bg-[#8a9a7b]/20 transition-all duration-1000 flex-shrink-0"
                    style={{
                      width: `${parseInt(item.size) * 1.2}px`,
                      height: "8px",
                    }}
                  />
                  <span
                    className="font-serif font-light text-[10px] text-[#c4bba8]/70 group-hover:text-[#7a7062]/50 transition-colors duration-1000 tracking-widest"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {item.size} — {item.desc}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Meditative Space                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-40 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="flex flex-col items-center text-center px-6">
          <div className="py-20">
            <blockquote className="font-serif font-light text-xl md:text-2xl text-[#4a5548]/35 italic leading-loose tracking-wide max-w-lg mx-auto mb-12">
              &ldquo;The garden does not ask to be seen. It exists whether or
              not there is a gardener, whether or not there is a viewer. This is
              its teaching.&rdquo;
            </blockquote>
            <div className="h-px w-6 bg-[#c4bba8]/30 mx-auto mb-8" />
            <cite
              className="font-serif font-light text-[10px] text-[#c4bba8]/60 not-italic tracking-widest"
              style={{ letterSpacing: "0.2em" }}
            >
              on the nature of karesansui
            </cite>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final contemplation section                                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-48 px-6 border-t border-[#c4bba8]/10"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="max-w-3xl mx-auto">
          <div className="relative flex flex-col items-center text-center">
            {/* Large background character */}
            <span
              className="font-serif font-light text-[120px] text-[#4a5548]/[0.04] leading-none select-none block"
              aria-hidden="true"
            >
              無
            </span>
            <div className="mt-[-3rem] relative z-10">
              <p
                className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/50 mb-8"
                style={{ letterSpacing: "0.3em" }}
              >
                mu — nothingness
              </p>
              <p className="font-serif font-light text-base text-[#7a7062]/40 leading-relaxed max-w-sm mx-auto mb-16">
                In Zen, mu represents the state before distinctions arise. The
                empty garden is fullest.
              </p>

              <div className="flex flex-col items-center gap-4">
                <div className="h-px w-20 bg-[#c4bba8]/25" />
                <p
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/50"
                  style={{ letterSpacing: "0.25em" }}
                >
                  zen garden — stylekit design system
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                           */}
      {/* ---------------------------------------------------------------- */}
      <footer
        className="border-t border-[#c4bba8]/20 py-10 px-10"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="flex items-center justify-between">
          <p
            className="font-serif font-light text-xs text-[#7a7062]/60 tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            StyleKit · Zen Garden · 2025
          </p>
          <p
            className="font-serif font-light text-xs text-[#c4bba8]/50 tracking-widest"
            style={{ letterSpacing: "0.15em" }}
          >
            karesansui
          </p>
        </div>
      </footer>
    </div>
  );
}
