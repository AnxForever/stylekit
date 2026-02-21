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
/*  SVG Patterns — Raked Sand                                          */
/* ------------------------------------------------------------------ */

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
      {Array.from({ length: 44 }, (_, i) => {
        const y = i * 14 + 4;
        const amp = 1.2 + (i % 6) * 0.25;
        return (
          <path
            key={i}
            d={`M 0 ${y} Q 300 ${y - amp} 600 ${y + amp} Q 900 ${y - amp} 1200 ${y}`}
            stroke="#c4bba8"
            strokeWidth="0.5"
            opacity="0.16"
            fill="none"
          />
        );
      })}
    </svg>
  );
}

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
          opacity="0.35"
        />
      ))}
      {[18, 32, 48, 64, 80].map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={r}
          stroke="#8a9a7b"
          strokeWidth="0.8"
          opacity={0.65 - i * 0.09}
          fill="none"
        />
      ))}
      <ellipse cx="100" cy="100" rx="13" ry="10" fill="#7a7062" opacity="0.65" />
      <ellipse cx="100" cy="100" rx="8" ry="6" fill="#4a5548" opacity="0.45" />
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
            opacity={0.32 + (i % 3) * 0.05}
            fill="none"
          />
        );
      })}
      <ellipse cx="60" cy="110" rx="8" ry="6" fill="#7a7062" opacity="0.55" />
      <ellipse cx="75" cy="106" rx="5" ry="4" fill="#4a5548" opacity="0.45" />
      <ellipse cx="68" cy="116" rx="4" ry="3" fill="#c4bba8" opacity="0.45" />
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
            opacity={0.38 + (i % 4) * 0.06}
            fill="none"
          />
        );
      })}
      <ellipse cx="130" cy="80" rx="12" ry="9" fill="#4a5548" opacity="0.5" />
      <ellipse cx="130" cy="80" rx="7" ry="5" fill="#7a7062" opacity="0.35" />
    </svg>
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
    role: "Primary Text",
    bg: "#4a5548",
    textOnSwatch: "#f5f3ee",
    border: false,
  },
  {
    japaneseName: "砂白",
    englishName: "Sand White",
    hex: "#f5f3ee",
    role: "Background",
    bg: "#f5f3ee",
    textOnSwatch: "#4a5548",
    border: true,
  },
  {
    japaneseName: "苔緑",
    englishName: "Moss Green",
    hex: "#8a9a7b",
    role: "Accent",
    bg: "#8a9a7b",
    textOnSwatch: "#f5f3ee",
    border: false,
  },
  {
    japaneseName: "砂岩",
    englishName: "Sand Stone",
    hex: "#c4bba8",
    role: "Muted / Border",
    bg: "#c4bba8",
    textOnSwatch: "#4a5548",
    border: false,
  },
  {
    japaneseName: "石色",
    englishName: "Stone",
    hex: "#7a7062",
    role: "Secondary Text",
    bg: "#7a7062",
    textOnSwatch: "#f5f3ee",
    border: false,
  },
];

const philosophyStones = [
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

const spacingScale = [
  { label: "py-8", size: 32, desc: "inline elements, tight groupings" },
  { label: "py-16", size: 64, desc: "related sections, same thought" },
  { label: "py-24", size: 96, desc: "section breathing room" },
  { label: "py-32", size: 128, desc: "thematic separation" },
  { label: "py-40", size: 160, desc: "major transitions" },
  { label: "py-48", size: 192, desc: "hero and meditative sections" },
];

type ComponentTab = "Buttons" | "Cards" | "Forms";

/* ------------------------------------------------------------------ */
/*  Main showcase export                                               */
/* ------------------------------------------------------------------ */

export default function ZenGardenShowcase() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("Buttons");
  const [tabVisible, setTabVisible] = useState(true);

  /* Animation & Interaction rule demo state */
  const [meditativeHovered, setMeditativeHovered] = useState(false);
  const [zeroHovered, setZeroHovered] = useState(false);
  const [ephemeralHovered, setEphemeralHovered] = useState(false);
  const [quietFocusHovered, setQuietFocusHovered] = useState(false);
  const [quietFocusActive, setQuietFocusActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleTabChange(tab: ComponentTab) {
    if (tab === activeTab) return;
    setTabVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setTabVisible(true);
    }, 300);
  }

  return (
    <div
      className="min-h-screen font-serif"
      style={{ backgroundColor: "#f5f3ee", color: "#4a5548" }}
    >
      {/* ================================================================ */}
      {/* 1. NAVIGATION                                                    */}
      {/* ================================================================ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 md:px-14 py-5 border-b border-[#c4bba8]/20"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <span
          className="font-serif font-light tracking-widest text-sm text-[#4a5548]/80"
          style={{ letterSpacing: "0.2em" }}
        >
          枯山水 / Zen Garden
        </span>

        <div className="hidden md:flex items-center gap-10">
          <a
            href="#palette"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/60 hover:text-[#4a5548]/80 transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            palette
          </a>
          <a
            href="#philosophy"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/60 hover:text-[#4a5548]/80 transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            philosophy
          </a>
          <a
            href="#patterns"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/60 hover:text-[#4a5548]/80 transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            patterns
          </a>
          <a
            href="#components"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/60 hover:text-[#4a5548]/80 transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            components
          </a>
          <a
            href="#animations"
            className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/60 hover:text-[#4a5548]/80 transition-colors duration-1000"
            style={{ letterSpacing: "0.15em" }}
          >
            interactions
          </a>
        </div>

        <Link
          href="/"
          className="font-serif font-light text-xs tracking-widest text-[#4a5548]/50 hover:text-[#4a5548]/80 transition-colors duration-1000 border-b border-[#8a9a7b]/30 pb-px"
          style={{ letterSpacing: "0.15em" }}
        >
          StyleKit →
        </Link>
      </nav>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section
        className="relative flex flex-col items-center justify-center py-48 md:py-60 overflow-hidden"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RakedSandTextureSVG />

        {/* Ghost character background */}
        <div
          className="absolute select-none pointer-events-none font-serif font-light text-[200px] md:text-[280px] text-[#4a5548]/[0.045] leading-none"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          静
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <p
              className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/50 mb-10 uppercase"
              style={{ letterSpacing: "0.35em" }}
            >
              karesansui · 枯山水
            </p>
          </div>

          {/* Main heading */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <h1
              className="font-serif font-extralight text-5xl md:text-7xl text-[#4a5548]/50 tracking-widest mb-0"
              style={{ letterSpacing: "0.35em" }}
            >
              stillness
            </h1>
          </div>

          {/* Divider */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <div className="h-px w-10 bg-[#8a9a7b]/35 mx-auto my-14" />
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s",
            }}
          >
            <p
              className="font-serif font-light text-sm text-[#7a7062]/50 tracking-widest mb-20 max-w-sm mx-auto leading-loose"
              style={{ letterSpacing: "0.2em" }}
            >
              the art of considered absence — a digital karesansui
            </p>
          </div>

          {/* CTA */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.9s",
            }}
          >
            <button
              className="font-serif font-light text-xs tracking-widest text-[#4a5548]/60 bg-transparent border border-transparent px-12 py-3.5 hover:border-[#8a9a7b]/30 hover:text-[#4a5548]/90 hover:bg-[#8a9a7b]/[0.04] transition-all duration-1000"
              style={{ letterSpacing: "0.22em" }}
            >
              enter quietude
            </button>
          </div>
        </div>

        {/* Floating vertical label — right side */}
        <div
          className="absolute right-8 top-1/2 hidden md:flex items-center gap-3"
          style={{
            transform: "translateY(-50%) rotate(90deg)",
            opacity: heroVisible ? 0.35 : 0,
            transition: "opacity 1.5s cubic-bezier(0.16,1,0.3,1) 1s",
          }}
          aria-hidden="true"
        >
          <div className="w-8 h-px bg-[#c4bba8]/50" />
          <span
            className="font-serif font-light text-[9px] tracking-widest text-[#c4bba8]"
            style={{ letterSpacing: "0.3em" }}
          >
            scroll
          </span>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section
        id="palette"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              palette
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Five Tones of the Garden
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-6" />
            <p
              className="font-serif font-light text-xs text-[#7a7062]/45 leading-relaxed tracking-wide max-w-md mb-20"
              style={{ letterSpacing: "0.06em" }}
            >
              No primary, no secondary. Five natural tones that hold the garden
              together the way earth holds stone: #4a5548 moss, #f5f3ee sand,
              #8a9a7b living green, #c4bba8 worn stone, #7a7062 deep shadow.
            </p>
          </RevealBlock>

          <div className="space-y-5">
            {palette.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10 group">
                  {/* Elongated swatch */}
                  <div
                    className="flex-shrink-0 transition-opacity duration-1000 group-hover:opacity-75"
                    style={{
                      width: "200px",
                      height: "52px",
                      backgroundColor: swatch.bg,
                      border: swatch.border ? "1px solid #c4bba8" : undefined,
                    }}
                  />
                  {/* Labels row */}
                  <div className="flex flex-wrap items-baseline gap-6 md:gap-10">
                    <span
                      className="font-serif font-light text-2xl text-[#4a5548]/25 group-hover:text-[#4a5548]/55 transition-colors duration-1000"
                      style={{ minWidth: "52px" }}
                    >
                      {swatch.japaneseName}
                    </span>
                    <span
                      className="font-serif font-light text-sm text-[#7a7062]/45 group-hover:text-[#7a7062]/75 transition-colors duration-1000 tracking-widest"
                      style={{ letterSpacing: "0.1em", minWidth: "130px" }}
                    >
                      {swatch.englishName}
                    </span>
                    <span className="font-mono font-light text-xs text-[#c4bba8]/80 group-hover:text-[#7a7062]/55 transition-colors duration-1000 tracking-wider">
                      {swatch.hex}
                    </span>
                    <span
                      className="font-serif font-light text-[10px] text-[#c4bba8]/60 group-hover:text-[#8a9a7b]/50 transition-colors duration-1000 tracking-widest"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      {swatch.role}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage note */}
          <RevealBlock delay={0.6} className="mt-24">
            <div className="border-l border-[#8a9a7b]/20 pl-8 py-2">
              <p
                className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/40 mb-3 uppercase"
                style={{ letterSpacing: "0.25em" }}
              >
                constraint as freedom
              </p>
              <p className="font-serif font-light text-xs text-[#7a7062]/40 leading-relaxed max-w-lg">
                These five tones are the entire palette. No exceptions. Adding a
                sixth color would be like placing a red stone in a kare-sansui —
                it would immediately become the only thing anyone sees.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. DESIGN PHILOSOPHY — The Three Stones                         */}
      {/* ================================================================ */}
      <section
        id="philosophy"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              philosophy
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              The Three Stones
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-24" />
          </RevealBlock>

          {/* Asymmetric stone placement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-14 gap-y-20">
            {philosophyStones.map((stone, i) => (
              <RevealBlock
                key={stone.character}
                delay={i * 0.2}
                className={i === 1 ? "md:mt-20" : i === 2 ? "md:mt-10" : ""}
              >
                <div className="border-l border-[#8a9a7b]/25 pl-7 group hover:border-[#8a9a7b]/55 transition-all duration-1000">
                  <div className="mb-7">
                    <span
                      className="font-serif font-light text-5xl text-[#4a5548]/18 group-hover:text-[#4a5548]/38 transition-colors duration-1000 leading-none block mb-1"
                      aria-hidden="true"
                      style={{ opacity: 0.18 }}
                    >
                      {stone.character}
                    </span>
                    <span
                      className="font-serif font-light text-[9px] tracking-widest text-[#8a9a7b]/38 group-hover:text-[#8a9a7b]/65 transition-colors duration-1000"
                      style={{ letterSpacing: "0.28em" }}
                    >
                      {stone.reading}
                    </span>
                  </div>

                  <h3 className="font-serif font-light text-lg text-[#4a5548]/45 group-hover:text-[#4a5548]/75 transition-colors duration-1000 mb-5 tracking-wide">
                    {stone.title}
                  </h3>

                  <p className="font-serif font-light text-xs text-[#7a7062]/38 group-hover:text-[#7a7062]/62 transition-colors duration-1000 leading-relaxed mb-7">
                    {stone.description}
                  </p>

                  <p
                    className="font-serif font-light text-[10px] text-[#8a9a7b]/32 group-hover:text-[#8a9a7b]/58 transition-colors duration-1000 leading-relaxed tracking-wider border-t border-[#c4bba8]/18 pt-5"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {stone.principle}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Full-width contemplation quote */}
          <RevealBlock delay={0.55} className="mt-32">
            <div className="text-center py-16">
              <blockquote className="font-serif font-light text-lg md:text-xl text-[#4a5548]/30 italic leading-loose tracking-wide max-w-xl mx-auto mb-10">
                &ldquo;The garden does not ask to be seen. It exists whether or
                not there is a gardener, whether or not there is a viewer. This
                is its teaching.&rdquo;
              </blockquote>
              <div className="h-px w-6 bg-[#c4bba8]/30 mx-auto mb-6" />
              <cite
                className="font-serif font-light text-[10px] text-[#c4bba8]/55 not-italic tracking-widest"
                style={{ letterSpacing: "0.22em" }}
              >
                on the nature of karesansui
              </cite>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. RAKED SAND PATTERNS                                           */}
      {/* ================================================================ */}
      <section
        id="patterns"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              patterns
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Raked Sand
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-6" />
            <p
              className="font-serif font-light text-xs text-[#7a7062]/42 leading-relaxed max-w-md mb-24"
              style={{ letterSpacing: "0.05em" }}
            >
              Each sand pattern is a visual metaphor for interaction rhythm —
              concentric ripples of hover response, parallel cadence of repeated
              elements, flowing transitions between states.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Concentric */}
            <RevealBlock delay={0}>
              <div className="group">
                <div
                  className="w-full mb-10 opacity-55 group-hover:opacity-85 transition-opacity duration-1000"
                  style={{ height: "200px" }}
                >
                  <ConcentricCirclesSVG />
                </div>
                <div className="border-l border-[#8a9a7b]/22 pl-5">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    同心円 / doshinen
                  </p>
                  <h4 className="font-serif font-light text-sm text-[#4a5548]/45 group-hover:text-[#4a5548]/72 transition-colors duration-1000 mb-3">
                    Concentric Circles
                  </h4>
                  <p className="font-serif font-light text-[11px] text-[#7a7062]/38 group-hover:text-[#7a7062]/62 transition-colors duration-1000 leading-relaxed">
                    Radiating from each stone, rings represent the ripples a
                    single presence creates in still water. Distance diminishes;
                    influence does not.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Parallel */}
            <RevealBlock delay={0.18}>
              <div className="group">
                <div
                  className="w-full mb-10 opacity-55 group-hover:opacity-85 transition-opacity duration-1000"
                  style={{ height: "200px" }}
                >
                  <ParallelLinesSVG />
                </div>
                <div className="border-l border-[#8a9a7b]/22 pl-5">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    平行線 / heikousen
                  </p>
                  <h4 className="font-serif font-light text-sm text-[#4a5548]/45 group-hover:text-[#4a5548]/72 transition-colors duration-1000 mb-3">
                    Parallel Lines
                  </h4>
                  <p className="font-serif font-light text-[11px] text-[#7a7062]/38 group-hover:text-[#7a7062]/62 transition-colors duration-1000 leading-relaxed">
                    Calm water made solid. Parallel lines suggest the mirror
                    surface of a lake — infinite depth without motion, stillness
                    as the highest state.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Flowing */}
            <RevealBlock delay={0.36}>
              <div className="group">
                <div
                  className="w-full mb-10 opacity-55 group-hover:opacity-85 transition-opacity duration-1000"
                  style={{ height: "200px" }}
                >
                  <FlowingCurvesSVG />
                </div>
                <div className="border-l border-[#8a9a7b]/22 pl-5">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    流れ / nagare
                  </p>
                  <h4 className="font-serif font-light text-sm text-[#4a5548]/45 group-hover:text-[#4a5548]/72 transition-colors duration-1000 mb-3">
                    Flowing Curves
                  </h4>
                  <p className="font-serif font-light text-[11px] text-[#7a7062]/38 group-hover:text-[#7a7062]/62 transition-colors duration-1000 leading-relaxed">
                    Wind made visible. Gentle undulation shows that even mineral
                    stillness contains memory of movement — past and present held
                    in one surface.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section
        id="components"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              components
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Interface Elements
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-16" />
          </RevealBlock>

          {/* Tab selector */}
          <RevealBlock delay={0.08} className="mb-16">
            <div className="flex gap-0 border-b border-[#c4bba8]/18">
              {(["Buttons", "Cards", "Forms"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className="font-serif font-light text-xs tracking-widest px-8 py-4 transition-all duration-1000"
                  style={{
                    letterSpacing: "0.15em",
                    color:
                      activeTab === tab
                        ? "#4a5548"
                        : "rgba(74, 85, 72, 0.35)",
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
          </RevealBlock>

          {/* Tab content */}
          <div
            style={{
              opacity: tabVisible ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* ---- BUTTONS ---- */}
            {activeTab === "Buttons" && (
              <div className="space-y-12">
                <p
                  className="font-serif font-light text-xs tracking-widest text-[#7a7062]/45"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Stillness in interaction — buttons clarify without
                  announcement.
                </p>

                <div className="flex flex-wrap gap-10 items-end">
                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border border-[#4a5548]/28 text-[#4a5548]/55 hover:text-[#4a5548]/85 hover:border-[#4a5548]/55 hover:bg-[#4a5548]/[0.03] transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      primary
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8]/80 tracking-widest">
                      moss border — hover reveals
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border-b border-[#8a9a7b]/28 text-[#7a7062]/45 hover:text-[#4a5548]/80 hover:border-[#8a9a7b]/65 bg-transparent transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      secondary
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8]/80 tracking-widest">
                      bottom border only
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 text-[#4a5548]/28 hover:text-[#4a5548]/65 bg-transparent border border-transparent transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      ghost
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8]/80 tracking-widest">
                      no border at rest
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 bg-[#4a5548]/75 text-[#f5f3ee] hover:bg-[#4a5548] transition-all duration-1000"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      filled
                    </button>
                    <span className="text-[10px] font-serif font-light text-[#c4bba8]/80 tracking-widest">
                      dark moss fill
                    </span>
                  </div>
                </div>

                {/* Disabled states */}
                <div className="pt-10 border-t border-[#c4bba8]/12">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/70 mb-7"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    disabled states — the unavailable stone
                  </p>
                  <div className="flex flex-wrap gap-8">
                    <button
                      disabled
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border border-[#c4bba8]/18 text-[#c4bba8]/38 cursor-not-allowed"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      unavailable
                    </button>
                    <button
                      disabled
                      className="font-serif font-light text-xs tracking-widest px-10 py-3.5 bg-[#c4bba8]/18 text-[#7a7062]/28 cursor-not-allowed"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      suspended
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- CARDS ---- */}
            {activeTab === "Cards" && (
              <div className="space-y-10">
                <p
                  className="font-serif font-light text-xs tracking-widest text-[#7a7062]/45"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Each card is a stone — placed with intention, weighted in
                  silence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      label: "observation",
                      title: "The space between",
                      body: "Negative space defines form as much as form defines space. In stillness, relationship emerges.",
                    },
                    {
                      label: "principle",
                      title: "One stone, three views",
                      body: "A single element placed with care reveals itself differently from every approach. Position is meaning.",
                    },
                    {
                      label: "practice",
                      title: "Patience as method",
                      body: "Slow transitions teach the eye to rest. The destination arrives without announcement.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="border-l border-[#8a9a7b]/28 pl-6 py-6 group cursor-default transition-all duration-1000 hover:border-[#8a9a7b]/58"
                    >
                      <p
                        className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 group-hover:text-[#8a9a7b]/75 transition-colors duration-1000 mb-4"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {card.label}
                      </p>
                      <h3 className="font-serif font-light text-lg text-[#4a5548]/45 group-hover:text-[#4a5548]/78 transition-colors duration-1000 mb-4 leading-snug">
                        {card.title}
                      </h3>
                      <p className="font-serif font-light text-xs text-[#7a7062]/38 group-hover:text-[#7a7062]/65 transition-colors duration-1000 leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Wide featured card */}
                <div className="border-l border-[#c4bba8]/35 pl-8 py-8 mt-6 group cursor-default transition-all duration-1000 hover:border-[#8a9a7b]/38">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/38 group-hover:text-[#8a9a7b]/68 transition-colors duration-1000 mb-3"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        featured
                      </p>
                      <h3 className="font-serif font-light text-2xl text-[#4a5548]/38 group-hover:text-[#4a5548]/68 transition-colors duration-1000 mb-3">
                        The garden as mirror
                      </h3>
                      <p className="font-serif font-light text-xs text-[#7a7062]/32 group-hover:text-[#7a7062]/58 transition-colors duration-1000 leading-relaxed max-w-md">
                        What we remove reveals what remains. The karesansui
                        gardener removes until only truth persists.
                      </p>
                    </div>
                    <span
                      className="font-serif font-light text-5xl text-[#4a5548]/[0.08] group-hover:text-[#4a5548]/[0.18] transition-colors duration-1000 leading-none select-none ml-8"
                      aria-hidden="true"
                    >
                      禅
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ---- FORMS ---- */}
            {activeTab === "Forms" && (
              <div className="space-y-10 max-w-md">
                <p
                  className="font-serif font-light text-xs tracking-widest text-[#7a7062]/45"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Minimal input — only what is necessary remains.
                </p>

                <div className="space-y-9">
                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-3 group-focus-within:text-[#8a9a7b]/80 transition-colors duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      your name
                    </label>
                    <input
                      type="text"
                      placeholder="enter quietly"
                      className="w-full bg-transparent border-0 border-b border-[#c4bba8]/28 focus:border-[#8a9a7b]/50 pb-3 font-serif font-light text-sm text-[#4a5548]/55 placeholder:text-[#c4bba8]/55 outline-none transition-all duration-1000"
                    />
                  </div>

                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-3 group-focus-within:text-[#8a9a7b]/80 transition-colors duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      correspondence
                    </label>
                    <input
                      type="email"
                      placeholder="address"
                      className="w-full bg-transparent border-0 border-b border-[#c4bba8]/28 focus:border-[#8a9a7b]/50 pb-3 font-serif font-light text-sm text-[#4a5548]/55 placeholder:text-[#c4bba8]/55 outline-none transition-all duration-1000"
                    />
                  </div>

                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-3 group-focus-within:text-[#8a9a7b]/80 transition-colors duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      reflection
                    </label>
                    <textarea
                      placeholder="what remains unsaid"
                      rows={4}
                      className="w-full bg-transparent border-b border-[#c4bba8]/28 focus:border-[#8a9a7b]/50 pb-3 font-serif font-light text-sm text-[#4a5548]/55 placeholder:text-[#c4bba8]/55 outline-none resize-none transition-all duration-1000"
                    />
                  </div>

                  <div className="group">
                    <label
                      className="block font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/45 mb-3"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      intention
                    </label>
                    <select className="w-full bg-transparent border-b border-[#c4bba8]/28 pb-3 font-serif font-light text-sm text-[#4a5548]/55 outline-none appearance-none cursor-pointer transition-all duration-1000 hover:border-[#8a9a7b]/40">
                      <option value="">choose a path</option>
                      <option value="stillness">stillness</option>
                      <option value="observation">observation</option>
                      <option value="practice">practice</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      className="font-serif font-light text-xs tracking-widest px-12 py-3.5 border border-[#4a5548]/18 text-[#4a5548]/45 hover:text-[#4a5548]/75 hover:border-[#4a5548]/38 hover:bg-[#4a5548]/[0.025] transition-all duration-1000"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      submit in silence
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. ANIMATION & INTERACTION RULES — All 4 aiRules as demos       */}
      {/* ================================================================ */}
      <section
        id="animations"
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              interactions
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Animation &amp; Interaction Rules
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-6" />
            <p
              className="font-serif font-light text-xs text-[#7a7062]/42 leading-relaxed max-w-lg mb-24"
              style={{ letterSpacing: "0.05em" }}
            >
              Four named rules govern every interactive moment in this style.
              Hover or interact with each demo below to feel the principle in
              action — no spring, no bounce, only meditative restraint.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* -------------------------------------------------------- */}
            {/* Rule 1: Meditative Slowness                              */}
            {/* -------------------------------------------------------- */}
            <RevealBlock delay={0.08}>
              <div className="border-l border-[#8a9a7b]/22 pl-8 pb-10 group">
                <p
                  className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2 uppercase"
                  style={{ letterSpacing: "0.28em" }}
                >
                  rule 01
                </p>
                <h3 className="font-serif font-light text-xl text-[#4a5548]/65 mb-4 tracking-wide">
                  Meditative Slowness
                </h3>
                <p className="font-serif font-light text-xs text-[#7a7062]/42 leading-relaxed mb-3">
                  交互必须缓慢克制，使用{" "}
                  <code className="font-mono text-[#8a9a7b]/60">
                    duration-700
                  </code>{" "}
                  到{" "}
                  <code className="font-mono text-[#8a9a7b]/60">
                    duration-1000
                  </code>{" "}
                  与{" "}
                  <code className="font-mono text-[#8a9a7b]/60">
                    ease-in-out
                  </code>
                  。
                </p>
                <p
                  className="font-serif font-light text-[10px] text-[#c4bba8]/65 mb-10 font-mono"
                  style={{ letterSpacing: "0.08em" }}
                >
                  transition-all duration-[900ms] ease-in-out
                </p>

                {/* Demo area */}
                <div className="bg-[#ede9e1]/40 px-8 py-10 flex flex-col items-start gap-6">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/60"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    hover the button — count the time
                  </p>
                  <button
                    onMouseEnter={() => setMeditativeHovered(true)}
                    onMouseLeave={() => setMeditativeHovered(false)}
                    className="font-serif font-light text-xs tracking-widest px-10 py-3.5 border border-transparent text-[#4a5548]/38 hover:border-[#8a9a7b]/35 hover:text-[#4a5548]/80 hover:bg-[#8a9a7b]/[0.05] transition-all"
                    style={{
                      letterSpacing: "0.2em",
                      transitionDuration: "900ms",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    {meditativeHovered ? "becoming clear..." : "in stillness"}
                  </button>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8]/55 leading-relaxed"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {meditativeHovered
                      ? "900ms ease-in-out — unhurried, deliberate"
                      : "Resting at low opacity. Clarity arrives slowly."}
                  </p>
                </div>

                {/* Contrast: fast vs slow */}
                <div className="mt-8">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/55 mb-5"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    contrast — 150ms vs 900ms
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="font-serif font-light text-[10px] text-[#c4bba8]/55 w-16" style={{ letterSpacing: "0.1em" }}>
                        fast
                      </span>
                      <div
                        className="flex-1 h-1 bg-[#8a9a7b]/18 overflow-hidden relative"
                      >
                        <div
                          className="absolute top-0 left-0 h-full bg-[#7a7062]/35"
                          style={{
                            width: meditativeHovered ? "100%" : "0%",
                            transition: "width 150ms linear",
                          }}
                        />
                      </div>
                      <span className="font-mono text-[9px] text-[#c4bba8]/45 w-10">150ms</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif font-light text-[10px] text-[#8a9a7b]/55 w-16" style={{ letterSpacing: "0.1em" }}>
                        zen
                      </span>
                      <div
                        className="flex-1 h-1 bg-[#8a9a7b]/18 overflow-hidden relative"
                      >
                        <div
                          className="absolute top-0 left-0 h-full bg-[#8a9a7b]/55"
                          style={{
                            width: meditativeHovered ? "100%" : "0%",
                            transition: "width 900ms ease-in-out",
                          }}
                        />
                      </div>
                      <span className="font-mono text-[9px] text-[#8a9a7b]/45 w-10">900ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* -------------------------------------------------------- */}
            {/* Rule 2: Zero Displacement                                */}
            {/* -------------------------------------------------------- */}
            <RevealBlock delay={0.16}>
              <div className="border-l border-[#8a9a7b]/22 pl-8 pb-10 group">
                <p
                  className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2 uppercase"
                  style={{ letterSpacing: "0.28em" }}
                >
                  rule 02
                </p>
                <h3 className="font-serif font-light text-xl text-[#4a5548]/65 mb-4 tracking-wide">
                  Zero Displacement
                </h3>
                <p className="font-serif font-light text-xs text-[#7a7062]/42 leading-relaxed mb-3">
                  禁止使用{" "}
                  <code className="font-mono text-[#8a9a7b]/60">translate</code>
                  、
                  <code className="font-mono text-[#8a9a7b]/60">rotate</code>
                  ，避免任何物理位移动效；焦点应通过显隐与色阶变化表达。
                </p>
                <p
                  className="font-serif font-light text-[10px] text-[#c4bba8]/65 mb-10 font-mono"
                  style={{ letterSpacing: "0.08em" }}
                >
                  opacity change + color deepening — no movement
                </p>

                {/* Demo */}
                <div className="bg-[#ede9e1]/40 px-8 py-10 flex flex-col items-start gap-6">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/60"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    hover — the stone does not move
                  </p>
                  <div
                    className="w-full border-l pl-6 py-4 group/card cursor-default transition-all"
                    onMouseEnter={() => setZeroHovered(true)}
                    onMouseLeave={() => setZeroHovered(false)}
                    style={{
                      borderColor: zeroHovered
                        ? "rgba(138,154,123,0.55)"
                        : "rgba(138,154,123,0.22)",
                      transitionDuration: "800ms",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    <p
                      className="font-serif font-light text-[10px] tracking-widest mb-2"
                      style={{
                        letterSpacing: "0.2em",
                        color: zeroHovered
                          ? "rgba(138,154,123,0.75)"
                          : "rgba(138,154,123,0.38)",
                        transition: "color 800ms ease-in-out",
                      }}
                    >
                      a placed stone
                    </p>
                    <h4
                      className="font-serif font-light text-base leading-snug mb-3"
                      style={{
                        color: zeroHovered
                          ? "rgba(74,85,72,0.80)"
                          : "rgba(74,85,72,0.38)",
                        transition: "color 800ms ease-in-out 80ms",
                      }}
                    >
                      stillness is the movement
                    </h4>
                    <p
                      className="font-serif font-light text-[11px] leading-relaxed"
                      style={{
                        color: zeroHovered
                          ? "rgba(122,112,98,0.65)"
                          : "rgba(122,112,98,0.30)",
                        transition: "color 800ms ease-in-out 160ms",
                      }}
                    >
                      This card does not lift, translate, or rotate. It
                      clarifies — gradually, peacefully.
                    </p>
                  </div>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8]/55 leading-relaxed"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {zeroHovered
                      ? "Opacity deepening — the stone reveals itself"
                      : "The stone rests at 38% opacity. No translate. No scale."}
                  </p>
                </div>

                {/* What is forbidden */}
                <div className="mt-8 space-y-3">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/55 mb-4"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    forbidden in this style
                  </p>
                  {[
                    "hover:-translate-y-2",
                    "hover:rotate-[0.5deg]",
                    "hover:scale-[1.04]",
                    "active:translate-y-[4px]",
                  ].map((cls) => (
                    <div key={cls} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#c4bba8]/40 flex-shrink-0" />
                      <code
                        className="font-mono text-[10px] text-[#c4bba8]/55 line-through"
                      >
                        {cls}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* -------------------------------------------------------- */}
            {/* Rule 3: Ephemeral Fades                                  */}
            {/* -------------------------------------------------------- */}
            <RevealBlock delay={0.24}>
              <div className="border-l border-[#8a9a7b]/22 pl-8 pb-10">
                <p
                  className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2 uppercase"
                  style={{ letterSpacing: "0.28em" }}
                >
                  rule 03
                </p>
                <h3 className="font-serif font-light text-xl text-[#4a5548]/65 mb-4 tracking-wide">
                  Ephemeral Fades
                </h3>
                <p className="font-serif font-light text-xs text-[#7a7062]/42 leading-relaxed mb-3">
                  仅使用低对比度的颜色加深、透明度浮现、或极淡阴影淡入淡出，不做弹跳与高对比闪烁。
                </p>
                <p
                  className="font-serif font-light text-[10px] text-[#c4bba8]/65 mb-10 font-mono"
                  style={{ letterSpacing: "0.08em" }}
                >
                  low-contrast fade — shadow whispers — no bounce
                </p>

                {/* Demo */}
                <div className="bg-[#ede9e1]/40 px-8 py-10 flex flex-col gap-6">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/60"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    hover each element — watch it surface
                  </p>

                  {/* Fade demo items */}
                  {[
                    { label: "opacity fade", base: 0.22, hover: 0.75 },
                    { label: "shadow whisper", shadow: true },
                    { label: "color deepening", color: true },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="group/fade"
                      onMouseEnter={() => setEphemeralHovered(true)}
                      onMouseLeave={() => setEphemeralHovered(false)}
                    >
                      <div
                        className="border-l pl-5 py-3 cursor-default transition-all"
                        style={{
                          borderColor: ephemeralHovered
                            ? "rgba(138,154,123,0.45)"
                            : "rgba(138,154,123,0.18)",
                          transitionDuration: `${700 + i * 100}ms`,
                          transitionTimingFunction: "ease-in-out",
                          boxShadow: item.shadow
                            ? ephemeralHovered
                              ? "inset 3px 0 0 rgba(138,154,123,0.12), 4px 0 12px rgba(138,154,123,0.06)"
                              : "none"
                            : undefined,
                        }}
                      >
                        <span
                          className="font-serif font-light text-[10px] tracking-widest block mb-1"
                          style={{
                            letterSpacing: "0.18em",
                            color: item.color
                              ? ephemeralHovered
                                ? "rgba(138,154,123,0.72)"
                                : "rgba(196,187,168,0.55)"
                              : ephemeralHovered
                              ? `rgba(74,85,72,${item.hover ?? 0.7})`
                              : `rgba(74,85,72,${item.base ?? 0.28})`,
                            transition: `color ${700 + i * 100}ms ease-in-out`,
                          }}
                        >
                          {item.label}
                        </span>
                        <div
                          className="h-px"
                          style={{
                            backgroundColor: ephemeralHovered
                              ? "rgba(138,154,123,0.28)"
                              : "rgba(196,187,168,0.15)",
                            transition: `background-color ${800 + i * 100}ms ease-in-out`,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8]/55 leading-relaxed mt-2"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {ephemeralHovered
                      ? "Surfacing — low contrast, unhurried, no flash"
                      : "Resting in near-invisibility. Hover to surface."}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* -------------------------------------------------------- */}
            {/* Rule 4: Quiet Focus                                      */}
            {/* -------------------------------------------------------- */}
            <RevealBlock delay={0.32}>
              <div className="border-l border-[#8a9a7b]/22 pl-8 pb-10">
                <p
                  className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-2 uppercase"
                  style={{ letterSpacing: "0.28em" }}
                >
                  rule 04
                </p>
                <h3 className="font-serif font-light text-xl text-[#4a5548]/65 mb-4 tracking-wide">
                  Quiet Focus
                </h3>
                <p className="font-serif font-light text-xs text-[#7a7062]/42 leading-relaxed mb-3">
                  文本可默认半透明（如{" "}
                  <code className="font-mono text-[#8a9a7b]/60">
                    text-[#4a5548]/70
                  </code>
                  ），hover/focus 时缓慢趋于清晰，保持冥想式节奏。
                </p>
                <p
                  className="font-serif font-light text-[10px] text-[#c4bba8]/65 mb-10 font-mono"
                  style={{ letterSpacing: "0.08em" }}
                >
                  default semi-transparent → hover → full opacity
                </p>

                {/* Interactive text demo */}
                <div className="bg-[#ede9e1]/40 px-8 py-10">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/60 mb-6"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    hover paragraphs — each arrives at its own pace
                  </p>

                  <div
                    className="space-y-6 cursor-default"
                    onMouseEnter={() => setQuietFocusHovered(true)}
                    onMouseLeave={() => {
                      setQuietFocusHovered(false);
                      setQuietFocusActive(false);
                    }}
                    onClick={() => setQuietFocusActive((v) => !v)}
                  >
                    <p
                      className="font-serif font-light text-base leading-relaxed"
                      style={{
                        color:
                          quietFocusHovered || quietFocusActive
                            ? "rgba(74,85,72,0.88)"
                            : "rgba(74,85,72,0.42)",
                        transition: "color 700ms ease-in-out",
                      }}
                    >
                      The art of quiet focus begins with restraint.
                    </p>
                    <p
                      className="font-serif font-light text-sm leading-relaxed"
                      style={{
                        color:
                          quietFocusHovered || quietFocusActive
                            ? "rgba(74,85,72,0.72)"
                            : "rgba(74,85,72,0.30)",
                        transition: "color 850ms ease-in-out 80ms",
                      }}
                    >
                      Secondary text remains quieter — not absent, but waiting
                      for the eye to arrive at its own moment.
                    </p>
                    <p
                      className="font-serif font-light text-xs leading-relaxed"
                      style={{
                        color:
                          quietFocusHovered || quietFocusActive
                            ? "rgba(122,112,98,0.65)"
                            : "rgba(122,112,98,0.22)",
                        transition: "color 1000ms ease-in-out 160ms",
                      }}
                    >
                      Caption text surfaces last. Each tier has its own
                      transition delay — a meditative stagger.
                    </p>
                    <div
                      className="border-t pt-4"
                      style={{
                        borderColor:
                          quietFocusHovered || quietFocusActive
                            ? "rgba(196,187,168,0.35)"
                            : "rgba(196,187,168,0.15)",
                        transition: "border-color 900ms ease-in-out",
                      }}
                    >
                      <p
                        className="font-serif font-light text-[10px] tracking-widest"
                        style={{
                          letterSpacing: "0.15em",
                          color:
                            quietFocusHovered || quietFocusActive
                              ? "rgba(138,154,123,0.60)"
                              : "rgba(138,154,123,0.28)",
                          transition: "color 1100ms ease-in-out 240ms",
                        }}
                      >
                        {quietFocusActive
                          ? "click again to dim — full rhythm"
                          : quietFocusHovered
                          ? "staggered reveal — each text tier delays"
                          : "hover or click to see quiet focus in motion"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* State ladder */}
                <div className="mt-8 space-y-3">
                  <p
                    className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/55 mb-4"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    opacity ladder — text states
                  </p>
                  {[
                    { role: "at rest", opacity: "/40 — semi-invisible", active: false },
                    { role: "hover", opacity: "/70 — beginning to clarify", active: quietFocusHovered && !quietFocusActive },
                    { role: "focus / active", opacity: "/90 — clear presence", active: quietFocusActive },
                  ].map((step) => (
                    <div key={step.role} className="flex items-center gap-4">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: step.active
                            ? "rgba(138,154,123,0.7)"
                            : "rgba(196,187,168,0.35)",
                        }}
                      />
                      <span
                        className="font-serif font-light text-[10px] w-24 flex-shrink-0"
                        style={{
                          color: step.active
                            ? "rgba(74,85,72,0.65)"
                            : "rgba(74,85,72,0.30)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {step.role}
                      </span>
                      <span
                        className="font-mono text-[10px]"
                        style={{
                          color: step.active
                            ? "rgba(138,154,123,0.65)"
                            : "rgba(196,187,168,0.50)",
                        }}
                      >
                        {step.opacity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Summary table */}
          <RevealBlock delay={0.5} className="mt-24">
            <div className="border-t border-[#c4bba8]/15 pt-16">
              <p
                className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/42 mb-10 uppercase"
                style={{ letterSpacing: "0.28em" }}
              >
                all four rules at a glance
              </p>
              <div className="space-y-5">
                {[
                  {
                    number: "01",
                    name: "Meditative Slowness",
                    rule: "duration-700 to duration-1000, ease-in-out",
                  },
                  {
                    number: "02",
                    name: "Zero Displacement",
                    rule: "No translate, rotate, or scale — color change only",
                  },
                  {
                    number: "03",
                    name: "Ephemeral Fades",
                    rule: "Low-contrast opacity fade, subtle shadow — no bounce",
                  },
                  {
                    number: "04",
                    name: "Quiet Focus",
                    rule: "Text at /40 rest → /70 hover → /90 focus, staggered",
                  },
                ].map((rule) => (
                  <div
                    key={rule.number}
                    className="flex items-baseline gap-6 group border-b border-[#c4bba8]/10 pb-5 hover:border-[#c4bba8]/25 transition-all duration-1000"
                  >
                    <span className="font-mono font-light text-[10px] text-[#c4bba8]/45 flex-shrink-0">
                      {rule.number}
                    </span>
                    <span
                      className="font-serif font-light text-sm text-[#4a5548]/42 group-hover:text-[#4a5548]/68 transition-colors duration-1000 w-52 flex-shrink-0"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      {rule.name}
                    </span>
                    <span
                      className="font-mono text-[10px] text-[#7a7062]/32 group-hover:text-[#7a7062]/55 transition-colors duration-1000"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      {rule.rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. TYPOGRAPHY SHOWCASE                                           */}
      {/* ================================================================ */}
      <section
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              typography
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Weights of Silence
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-20" />
          </RevealBlock>

          <div className="space-y-14">
            <RevealBlock delay={0}>
              <div className="flex items-baseline gap-10 border-b border-[#c4bba8]/12 pb-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/65 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.12em" }}
                >
                  display
                </span>
                <div>
                  <p className="font-serif font-extralight text-5xl text-[#4a5548]/38 leading-tight mb-2">
                    Still water
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    font-extralight / 48px
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div className="flex items-baseline gap-10 border-b border-[#c4bba8]/12 pb-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/65 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.12em" }}
                >
                  heading
                </span>
                <div>
                  <p
                    className="font-serif font-light text-3xl text-[#4a5548]/48 leading-tight mb-2 tracking-widest"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    The space between stones
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    font-light / 30px / tracking-widest
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="flex items-baseline gap-10 border-b border-[#c4bba8]/12 pb-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/65 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.12em" }}
                >
                  body
                </span>
                <div>
                  <p className="font-serif font-light text-sm text-[#7a7062]/55 leading-relaxed mb-2 max-w-md">
                    In the karesansui tradition, each placement is irrevocable.
                    The monk rakes with intention, knowing that tomorrow the wind
                    may disturb the pattern — and that is also correct.
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    font-light / 14px / leading-relaxed
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.3}>
              <div className="flex items-baseline gap-10">
                <span
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/65 flex-shrink-0 w-24"
                  style={{ letterSpacing: "0.12em" }}
                >
                  caption
                </span>
                <div>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8]/75 tracking-widest mb-2"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    ryoanji — kyoto, japan — 15th century
                  </p>
                  <p
                    className="font-serif font-light text-[10px] text-[#c4bba8] tracking-widest"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    font-light / 10px / tracking-widest
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. SPACING RHYTHM & DO / DON'T                                   */}
      {/* ================================================================ */}
      <section
        className="py-40 px-6 md:px-16 border-t border-[#c4bba8]/15"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p
              className="font-serif font-light text-xs text-[#8a9a7b]/60 tracking-widest uppercase mb-4"
              style={{ letterSpacing: "0.25em" }}
            >
              discipline
            </p>
            <h2
              className="font-serif font-light text-3xl text-[#4a5548]/65 tracking-wider mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              The Gardener&apos;s Code
            </h2>
            <div className="h-px w-8 bg-[#8a9a7b]/30 mt-6 mb-24" />
          </RevealBlock>

          {/* Spacing scale */}
          <RevealBlock delay={0.05} className="mb-24">
            <p
              className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/48 mb-10 uppercase"
              style={{ letterSpacing: "0.25em" }}
            >
              spatial cadence
            </p>
            <div className="space-y-6">
              {spacingScale.map((item, i) => (
                <RevealBlock key={item.label} delay={0.05 + i * 0.06}>
                  <div className="flex items-center gap-8 group">
                    <span className="font-mono font-light text-xs text-[#8a9a7b]/38 group-hover:text-[#8a9a7b]/68 transition-colors duration-1000 w-20 flex-shrink-0">
                      {item.label}
                    </span>
                    <div
                      className="bg-[#8a9a7b]/10 group-hover:bg-[#8a9a7b]/20 transition-all duration-1000 flex-shrink-0"
                      style={{ width: `${item.size * 1.1}px`, height: "8px" }}
                    />
                    <span
                      className="font-serif font-light text-[10px] text-[#c4bba8]/62 group-hover:text-[#7a7062]/48 transition-colors duration-1000 tracking-widest"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {item.size}px — {item.desc}
                    </span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </RevealBlock>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <p
                className="font-serif font-light text-[10px] tracking-widest text-[#8a9a7b]/55 mb-10"
                style={{ letterSpacing: "0.3em" }}
              >
                OBSERVE — what to cultivate
              </p>
              <div className="space-y-5">
                {doRules.map((rule, i) => (
                  <RevealBlock key={i} delay={i * 0.06}>
                    <div className="border-l border-[#8a9a7b]/32 pl-5 py-1 group hover:border-[#8a9a7b]/65 transition-all duration-1000">
                      <p className="font-serif font-light text-xs text-[#4a5548]/40 group-hover:text-[#4a5548]/68 transition-colors duration-1000 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            <div>
              <p
                className="font-serif font-light text-[10px] tracking-widest text-[#7a7062]/48 mb-10"
                style={{ letterSpacing: "0.3em" }}
              >
                RELEASE — what to remove
              </p>
              <div className="space-y-5">
                {dontRules.map((rule, i) => (
                  <RevealBlock key={i} delay={i * 0.06 + 0.1}>
                    <div className="border-l border-[#7a7062]/25 pl-5 py-1 group hover:border-[#7a7062]/48 transition-all duration-1000">
                      <p className="font-serif font-light text-xs text-[#4a5548]/32 group-hover:text-[#4a5548]/58 transition-colors duration-1000 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 10. MEDITATIVE CLOSING                                           */}
      {/* ================================================================ */}
      <section
        className="py-48 border-t border-[#c4bba8]/12"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <RevealBlock className="flex flex-col items-center text-center px-6">
          <div className="py-16">
            {/* Large mu character */}
            <span
              className="font-serif font-light text-[130px] text-[#4a5548]/[0.038] leading-none select-none block mb-[-2rem]"
              aria-hidden="true"
            >
              無
            </span>
            <div className="relative z-10">
              <p
                className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/45 mb-7"
                style={{ letterSpacing: "0.32em" }}
              >
                mu — nothingness
              </p>
              <p className="font-serif font-light text-sm text-[#7a7062]/38 leading-relaxed max-w-sm mx-auto mb-16">
                In Zen, mu represents the state before distinctions arise. The
                empty garden is the fullest.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="h-px w-8 bg-[#c4bba8]/25 mx-auto" />
                <p
                  className="font-serif font-light text-[10px] tracking-widest text-[#c4bba8]/48"
                  style={{ letterSpacing: "0.25em" }}
                >
                  zen garden — stylekit design system
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer
        className="border-t border-[#c4bba8]/18 py-10 px-8 md:px-14"
        style={{ backgroundColor: "#f5f3ee" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-serif font-light text-xs text-[#7a7062]/55 tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            StyleKit · Zen Garden · 枯山水
          </p>

          <div className="flex items-center gap-8">
            <Link
              href="/styles/zen-garden"
              className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/45 hover:text-[#4a5548]/65 transition-colors duration-1000"
              style={{ letterSpacing: "0.15em" }}
            >
              documentation
            </Link>
            <Link
              href="/styles"
              className="font-serif font-light text-xs tracking-widest text-[#8a9a7b]/45 hover:text-[#4a5548]/65 transition-colors duration-1000"
              style={{ letterSpacing: "0.15em" }}
            >
              all styles
            </Link>
            <Link
              href="/"
              className="font-serif font-light text-xs tracking-widest text-[#4a5548]/45 hover:text-[#4a5548]/75 transition-colors duration-1000 border-b border-[#8a9a7b]/25 pb-px"
              style={{ letterSpacing: "0.15em" }}
            >
              StyleKit →
            </Link>
          </div>

          <p
            className="font-serif font-light text-xs text-[#c4bba8]/45 tracking-widest"
            style={{ letterSpacing: "0.15em" }}
          >
            karesansui
          </p>
        </div>
      </footer>
    </div>
  );
}
