"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
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

const colorSwatches = [
  { name: "Sumi", label: "Ink", hex: "#3a3a3a", note: "Primary text" },
  { name: "Washi", label: "Rice Paper", hex: "#f2ede4", note: "Warm background", border: true },
  { name: "Matcha", label: "Sage", hex: "#8a9a7b", note: "Accent green" },
  { name: "Cha", label: "Warm Beige", hex: "#b5a78c", note: "Muted accent" },
  { name: "Tsuchi", label: "Earth Brown", hex: "#8b6f4e", note: "Deep earth" },
];

const doRules = [
  "Warm paper background — let the surface breathe",
  "Extreme whitespace — emptiness is not void, it is space",
  "Thin ink brushstroke dividers at low opacity",
  "Serif font-light — no heaviness, no insistence",
  "Asymmetric layouts — intentionally off-center",
  "Duration-1000 slow transitions — unhurried, like seasons",
  "Natural motifs: water, stone, bamboo, moss",
];

const dontRules = [
  "No bright colors or high saturation",
  "No busy patterns or competing elements",
  "No tech or digital visual effects",
  "No perfectly symmetric layouts",
  "No bold or heavy typography weights",
  "No drop shadows or glows",
];

const philosophyItems = [
  {
    japanese: "不完全",
    romaji: "Fukanzen",
    meaning: "Imperfect",
    desc: "The cracked glaze on a tea bowl is not a flaw. It is where the firing left its mark. Every imperfection is an autobiography.",
  },
  {
    japanese: "無常",
    romaji: "Mujo",
    meaning: "Impermanent",
    desc: "The cherry blossoms fall in three days. Their beauty is inseparable from their brevity. Design that acknowledges change lives longer.",
  },
  {
    japanese: "不完成",
    romaji: "Fukansei",
    meaning: "Incomplete",
    desc: "The unfinished line invites the eye to complete it. Leave space for the viewer to participate. Incompleteness is an open hand.",
  },
];

const haiku = [
  { line1: "old pond —", line2: "a frog jumps in,", line3: "sound of water" },
  { line1: "over the wintry", line2: "forest, winds howl in rage", line3: "with no leaves to blow" },
  { line1: "the first cold shower", line2: "even the monkey seems to want", line3: "a little coat of straw" },
];

/* ------------------------------------------------------------------ */
/*  Inline SVG Motifs                                                   */
/* ------------------------------------------------------------------ */

function WaterRippleSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric imperfect circles — water ripple after a stone */}
      <ellipse cx="100" cy="102" rx="12" ry="8" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="99" cy="101" rx="28" ry="19" stroke="#3a3a3a" strokeWidth="0.6" opacity="0.27" />
      <ellipse cx="101" cy="103" rx="48" ry="33" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.20" />
      <ellipse cx="98" cy="100" rx="70" ry="49" stroke="#3a3a3a" strokeWidth="0.4" opacity="0.14" />
      <ellipse cx="102" cy="104" rx="92" ry="64" stroke="#3a3a3a" strokeWidth="0.35" opacity="0.09" />
      {/* Stone drop point */}
      <circle cx="100" cy="102" r="2.5" fill="#3a3a3a" opacity="0.22" />
    </svg>
  );
}

function BambooSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stalk — slightly bent, asymmetric */}
      <path
        d="M38 275 C37 240, 36 200, 39 165 C41 130, 40 95, 37 60 C35 30, 38 10, 40 5"
        stroke="#8a9a7b"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Nodes */}
      <rect x="34" y="60" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <rect x="33" y="120" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <rect x="35" y="180" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <rect x="34" y="235" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      {/* Leaves — asymmetric, imperfect placement */}
      <path
        d="M40 55 C55 45, 70 38, 68 28 C60 35, 48 40, 40 55Z"
        fill="#8a9a7b"
        opacity="0.28"
      />
      <path
        d="M38 115 C20 105, 8 95, 12 84 C22 92, 32 102, 38 115Z"
        fill="#8a9a7b"
        opacity="0.22"
      />
      <path
        d="M40 175 C58 162, 72 155, 70 143 C60 150, 48 162, 40 175Z"
        fill="#8a9a7b"
        opacity="0.25"
      />
      <path
        d="M37 230 C18 218, 6 208, 10 197 C20 205, 30 218, 37 230Z"
        fill="#8a9a7b"
        opacity="0.20"
      />
    </svg>
  );
}

function StoneTextureSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Irregular stone silhouette */}
      <path
        d="M20 80 C15 65, 18 45, 30 32 C42 20, 58 18, 75 22 C90 26, 105 20, 118 30 C132 40, 140 58, 138 74 C136 90, 125 102, 108 106 C90 110, 70 108, 55 106 C38 104, 24 96, 20 80Z"
        fill="#b5a78c"
        opacity="0.12"
      />
      <path
        d="M20 80 C15 65, 18 45, 30 32 C42 20, 58 18, 75 22 C90 26, 105 20, 118 30 C132 40, 140 58, 138 74 C136 90, 125 102, 108 106 C90 110, 70 108, 55 106 C38 104, 24 96, 20 80Z"
        stroke="#8b6f4e"
        strokeWidth="0.8"
        opacity="0.20"
      />
      {/* Moss patches */}
      <ellipse cx="52" cy="68" rx="14" ry="9" fill="#8a9a7b" opacity="0.18" />
      <ellipse cx="96" cy="55" rx="10" ry="7" fill="#8a9a7b" opacity="0.14" />
      <ellipse cx="72" cy="88" rx="12" ry="6" fill="#8a9a7b" opacity="0.12" />
      {/* Fracture lines */}
      <path d="M60 40 C65 55, 70 68, 68 85" stroke="#8b6f4e" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
      <path d="M90 35 C88 48, 92 62, 95 75" stroke="#8b6f4e" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />
    </svg>
  );
}

function InkBrushDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Irregular ink brushstroke — thicker in middle, feathers at ends */}
      <path
        d="M0 4 C20 3.5, 60 2.5, 120 3.8 C180 5, 220 5.2, 280 4 C330 3, 370 3.5, 400 4"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.18"
      />
    </svg>
  );
}

function MoonSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Waning crescent — imperfect circle, slightly asymmetric */}
      <circle cx="62" cy="60" r="38" fill="#b5a78c" opacity="0.10" />
      <circle cx="62" cy="60" r="38" stroke="#3a3a3a" strokeWidth="0.7" opacity="0.15" />
      {/* Cloud shadow masking — inner ellipse suggesting phase */}
      <ellipse cx="78" cy="56" rx="32" ry="36" fill="#f2ede4" opacity="0.85" />
      {/* Subtle halo ring */}
      <circle cx="62" cy="60" r="50" stroke="#3a3a3a" strokeWidth="0.4" opacity="0.07" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function InkDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <InkBrushDivider className="w-full h-2" />
    </div>
  );
}

function SectionKana({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-serif tracking-[0.4em] text-[#3a3a3a]/35 uppercase mb-4 block">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");
  const [haikuIndex, setHaikuIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#3a3a3a] font-serif overflow-x-hidden">

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f3ec]/94 backdrop-blur-sm border-b border-[#3a3a3a]/10">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Back link */}
            <Link
              href="/"
              className="font-serif text-xs text-[#3a3a3a]/40 tracking-[0.2em] hover:text-[#3a3a3a]/75 transition-colors duration-1000 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              StyleKit
            </Link>

            {/* Center wordmark */}
            <span className="font-serif font-light text-sm text-[#3a3a3a]/55 tracking-[0.35em]">
              侘寂
            </span>

            {/* Right nav */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/wabi-sabi"
                className="font-serif text-xs text-[#3a3a3a]/30 tracking-[0.15em] hover:text-[#3a3a3a]/60 transition-colors duration-1000"
              >
                docs
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs text-[#3a3a3a]/30 tracking-[0.15em] hover:text-[#3a3a3a]/60 transition-colors duration-1000"
              >
                styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section
        ref={heroRef}
        className="relative pt-40 md:pt-56 pb-40 md:pb-52 px-8 md:px-16 overflow-hidden min-h-screen flex items-start"
      >
        {/* Asymmetric bamboo motif — floats right, deliberately off-grid */}
        <div
          className="absolute right-[6%] top-[10%] pointer-events-none"
          style={{
            opacity: heroRevealed ? 0.9 : 0,
            transition: "opacity 2s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }}
        >
          <BambooSVG className="w-16 h-64 md:w-20 md:h-80" />
        </div>

        {/* Water ripple — behind title, upper-left quadrant */}
        <div
          className="absolute left-[3%] top-[28%] pointer-events-none"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 2.5s cubic-bezier(0.16,1,0.3,1) 1.2s",
          }}
        >
          <WaterRippleSVG className="w-48 h-48 md:w-64 md:h-64 opacity-40" />
        </div>

        {/* Moon — lower right, large, very faint */}
        <div
          className="absolute right-[18%] bottom-[12%] pointer-events-none"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 3s cubic-bezier(0.16,1,0.3,1) 1.5s",
          }}
        >
          <MoonSVG className="w-40 h-40 md:w-56 md:h-56" />
        </div>

        {/* Hero content — intentionally left-biased, not centered */}
        <div className="relative z-10 max-w-2xl ml-0 md:ml-8">
          {/* Eyebrow label */}
          <p
            className="text-xs font-serif tracking-[0.5em] text-[#3a3a3a]/35 mb-10 uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            imperfect &middot; impermanent &middot; incomplete
          </p>

          {/* Main title — light serif, breathing */}
          <h1
            className="font-serif font-light leading-none mb-6"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              letterSpacing: "-0.02em",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Wabi-Sabi
          </h1>

          {/* Japanese characters — secondary, muted */}
          <h2
            className="font-serif font-light text-[#3a3a3a]/35 mb-12"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              letterSpacing: "0.1em",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            侘寂風
          </h2>

          {/* Haiku-style description — three short lines */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <p className="font-serif font-light text-lg text-[#3a3a3a]/45 leading-loose mb-1 italic">
              the cracked tea bowl —
            </p>
            <p className="font-serif font-light text-lg text-[#3a3a3a]/45 leading-loose mb-1 italic">
              where the gold seam runs, we see
            </p>
            <p className="font-serif font-light text-lg text-[#3a3a3a]/45 leading-loose italic">
              what was broken, made whole
            </p>
          </div>

          {/* Thin ink separator */}
          <div
            className="mt-14"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1.5s cubic-bezier(0.16,1,0.3,1) 0.7s",
            }}
          >
            <div className="h-[1px] bg-[#3a3a3a]/15 w-32" />
          </div>

          {/* Scroll prompt — very minimal */}
          <p
            className="mt-6 text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1.5s cubic-bezier(0.16,1,0.3,1) 0.9s",
            }}
          >
            scroll &darr;
          </p>
        </div>
      </section>

      {/* ===== 3. Philosophy ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">
          {/* Section header — offset left */}
          <RevealBlock className="mb-20 ml-0 md:ml-4">
            <SectionKana>Philosophy</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Three principles
            </h2>
          </RevealBlock>

          {/* Philosophy items — staggered, intentionally off-grid */}
          <div className="space-y-20 md:space-y-24">
            {philosophyItems.map((item, i) => (
              <RevealBlock key={item.romaji} delay={i * 0.12}>
                {/* Alternating alignment: odd items shift right */}
                <div
                  className={`flex flex-col md:flex-row gap-8 md:gap-16 ${
                    i % 2 === 1 ? "md:ml-24" : "md:ml-0"
                  }`}
                >
                  {/* Left: Japanese character + romaji */}
                  <div className="flex-shrink-0 md:w-36">
                    <p
                      className="font-serif font-light text-[#3a3a3a]/15 leading-none mb-1"
                      style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
                    >
                      {item.japanese}
                    </p>
                    <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/30 uppercase">
                      {item.romaji}
                    </p>
                  </div>

                  {/* Right: meaning + description */}
                  <div className="flex-1 border-l border-[#3a3a3a]/10 pl-8 md:pl-12">
                    <h3 className="font-serif font-light text-[#3a3a3a] text-2xl mb-4 leading-tight">
                      {item.meaning}
                    </h3>
                    <p className="font-serif font-light text-[#3a3a3a]/50 text-base leading-[1.9]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Ink brushstroke divider */}
      <div className="px-8 md:px-16 py-4">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===== 4. Component Demos ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="mb-16">
            <SectionKana>Components</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Elements
            </h2>
            <p className="font-serif font-light text-[#3a3a3a]/40 mt-4 leading-relaxed max-w-md">
              Each element carries the quietness of ink on paper. No excess. Nothing performed.
            </p>
          </RevealBlock>

          {/* Tab switcher — minimal underline tabs */}
          <RevealBlock delay={0.08} className="mb-12">
            <div className="flex gap-8 border-b border-[#3a3a3a]/10">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setComponentTab(tab)}
                  className={`pb-3 text-xs font-serif tracking-[0.25em] uppercase transition-all duration-1000 border-b-[1px] -mb-px ${
                    componentTab === tab
                      ? "text-[#3a3a3a] border-[#3a3a3a]"
                      : "text-[#3a3a3a]/30 border-transparent hover:text-[#3a3a3a]/55"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo area — generous whitespace, rice paper feel */}
          <RevealBlock delay={0.14}>
            <div className="min-h-[320px] bg-[#f2ede4] border border-[#3a3a3a]/08 p-10 md:p-14">

              {componentTab === "button" && (
                <div className="flex flex-col gap-12">
                  {/* Primary button — paper bg, ink border */}
                  <div>
                    <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/30 uppercase mb-6">
                      Primary
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="px-8 py-3 bg-[#3a3a3a] text-[#f2ede4] text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:bg-[#8a9a7b]">
                        continue
                      </button>
                      <button className="px-8 py-3 border border-[#3a3a3a]/40 text-[#3a3a3a] text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:border-[#3a3a3a] hover:text-[#3a3a3a]">
                        observe
                      </button>
                      <button className="px-8 py-3 text-[#3a3a3a]/40 text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:text-[#3a3a3a]/70">
                        rest
                      </button>
                    </div>
                  </div>

                  {/* Sage variant */}
                  <div>
                    <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/30 uppercase mb-6">
                      Earth tones
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="px-8 py-3 bg-[#8a9a7b] text-[#f7f3ec] text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:bg-[#3a3a3a]">
                        matcha
                      </button>
                      <button className="px-8 py-3 border border-[#8b6f4e]/40 text-[#8b6f4e] text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:border-[#8b6f4e] hover:text-[#8b6f4e]">
                        earth
                      </button>
                      <button className="px-8 py-3 border border-[#b5a78c]/40 text-[#b5a78c] text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:border-[#b5a78c]/80 hover:text-[#b5a78c]/80">
                        beige
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-serif text-[#3a3a3a]/25 italic leading-relaxed max-w-sm">
                    Ink color darkens on hover. No scale transform. No shadow. Just the weight of ink deepening on paper.
                  </p>
                </div>
              )}

              {componentTab === "card" && (
                <div className="flex flex-col gap-8">
                  <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/30 uppercase mb-2">
                    Specimen
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Card 1 — minimal ink border, slight skew on decorative element */}
                    <div className="group p-8 bg-[#f7f3ec] border border-[#3a3a3a]/10 transition-colors duration-1000 hover:border-[#3a3a3a]/22 relative overflow-hidden">
                      {/* Decorative stone motif — slightly skewed */}
                      <div
                        className="absolute -right-4 -bottom-4 opacity-40 pointer-events-none"
                        style={{ transform: "rotate(8deg)" }}
                      >
                        <StoneTextureSVG className="w-28 h-20" />
                      </div>
                      <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/30 uppercase mb-4">
                        Moss on stone
                      </p>
                      <h3 className="font-serif font-light text-[#3a3a3a] text-xl mb-3 leading-snug">
                        The worn path holds wisdom
                      </h3>
                      <p className="font-serif font-light text-[#3a3a3a]/45 text-sm leading-[1.8]">
                        Age reveals what youth conceals. A stone smoothed by centuries of rain does not lament its former sharpness.
                      </p>
                    </div>

                    {/* Card 2 — earth tones, asymmetric border accent */}
                    <div className="group p-8 bg-[#f7f3ec] border-l-[1px] border-t-[1px] border-r-0 border-b-0 border-[#8a9a7b]/35 transition-all duration-1000 hover:border-[#8a9a7b]/55 relative overflow-hidden">
                      <div
                        className="absolute top-4 right-8 opacity-30 pointer-events-none"
                        style={{ transform: "rotate(-5deg)" }}
                      >
                        <WaterRippleSVG className="w-20 h-20" />
                      </div>
                      <p className="text-xs font-serif tracking-[0.3em] text-[#8a9a7b]/50 uppercase mb-4">
                        Water remembers
                      </p>
                      <h3 className="font-serif font-light text-[#3a3a3a] text-xl mb-3 leading-snug">
                        Still pond, moving light
                      </h3>
                      <p className="font-serif font-light text-[#3a3a3a]/45 text-sm leading-[1.8]">
                        What appears still is always in motion. The surface mirrors sky, depths hold silence, between them: life.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#3a3a3a]/25 italic leading-relaxed max-w-md">
                    Minimal ink border. Imperfect slight rotation on decorative elements. No hover scale — border opacity deepens.
                  </p>
                </div>
              )}

              {componentTab === "input" && (
                <div className="max-w-sm flex flex-col gap-10">
                  <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/30 uppercase">
                    Correspondence
                  </p>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/35 uppercase mb-3">
                        name
                      </label>
                      <input
                        type="text"
                        placeholder="your name..."
                        className="w-full py-3 bg-transparent border-b border-[#3a3a3a]/20 text-[#3a3a3a] placeholder-[#3a3a3a]/20 font-serif font-light text-base focus:outline-none focus:border-[#3a3a3a]/50 transition-colors duration-1000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/35 uppercase mb-3">
                        a thought
                      </label>
                      <textarea
                        placeholder="let the words rest here..."
                        rows={3}
                        className="w-full py-3 bg-transparent border-b border-[#3a3a3a]/20 text-[#3a3a3a] placeholder-[#3a3a3a]/20 font-serif font-light text-base focus:outline-none focus:border-[#3a3a3a]/50 transition-colors duration-1000 resize-none leading-relaxed"
                      />
                    </div>
                    <button className="px-8 py-3 bg-[#3a3a3a] text-[#f2ede4] text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-1000 hover:bg-[#8a9a7b]">
                      send
                    </button>
                  </div>
                  <p className="text-xs font-serif text-[#3a3a3a]/25 italic leading-relaxed">
                    Bottom border only. No rounded corners. Focus deepens ink weight. Serif light for handwritten feel.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Ink brushstroke divider */}
      <div className="px-8 md:px-16 py-2">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===== 5. Color Palette ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-20">
            <SectionKana>Palette</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Earth & silence
            </h2>
            <p className="font-serif font-light text-[#3a3a3a]/40 mt-4 leading-relaxed max-w-sm">
              Five colours drawn from the forest floor, the tea garden, the autumn hillside.
            </p>
          </RevealBlock>

          {/* Organic swatch layout — deliberately not a grid */}
          <div className="relative">
            {/* Stone decoration — asymmetric, behind swatches */}
            <div className="absolute right-0 top-[-20px] pointer-events-none opacity-50">
              <StoneTextureSVG className="w-48 h-36" />
            </div>

            <div className="flex flex-col gap-0">
              {colorSwatches.map((swatch, i) => (
                <RevealBlock key={swatch.name} delay={i * 0.09}>
                  {/* Each row shifts slightly — imperfect, irregular rhythm */}
                  <div
                    className="flex items-center gap-8 py-6 border-b border-[#3a3a3a]/08 last:border-b-0"
                    style={{
                      paddingLeft: `${[0, 32, 12, 48, 8][i]}px`,
                    }}
                  >
                    {/* Swatch blob — organic, slightly irregular shape */}
                    <div
                      className="flex-shrink-0 transition-all duration-1000"
                      style={{
                        width: `${[56, 48, 60, 44, 52][i]}px`,
                        height: `${[56, 48, 60, 44, 52][i]}px`,
                        backgroundColor: swatch.hex,
                        borderRadius: `${["45% 55% 50% 50%", "50% 45% 55% 50%", "55% 45% 50% 50%", "48% 52% 48% 52%", "50% 50% 45% 55%"][i]}`,
                        border: swatch.border ? "1px solid #3a3a3a20" : "none",
                      }}
                    />

                    {/* Name + note */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                        <p className="font-serif font-light text-[#3a3a3a] text-base">{swatch.name}</p>
                        <p className="font-serif text-xs text-[#3a3a3a]/30 tracking-[0.15em]">{swatch.label}</p>
                      </div>
                      <p className="font-serif text-xs text-[#3a3a3a]/25 mt-1">{swatch.note}</p>
                    </div>

                    {/* Hex value */}
                    <p
                      className="font-serif text-xs tracking-[0.15em] hidden md:block"
                      style={{ color: swatch.hex === "#f2ede4" ? "#a0998c" : swatch.hex, opacity: 0.7 }}
                    >
                      {swatch.hex}
                    </p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. Typography ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-20 md:ml-12">
            <SectionKana>Typography</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Type as silence
            </h2>
          </RevealBlock>

          <div className="space-y-20">
            {/* Display — extreme letter spacing, light weight */}
            <RevealBlock>
              <div className="border-b border-[#3a3a3a]/08 pb-12">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-4">Display — font-light, wide tracking</p>
                <p
                  className="font-serif font-light text-[#3a3a3a]/80 leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "0.08em" }}
                >
                  stillness
                </p>
              </div>
            </RevealBlock>

            {/* Heading — normal weight, tight */}
            <RevealBlock delay={0.06}>
              <div className="border-b border-[#3a3a3a]/08 pb-12 md:ml-8">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-4">Heading — font-light, natural</p>
                <p
                  className="font-serif font-light text-[#3a3a3a] leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                >
                  The beauty of things impermanent
                </p>
              </div>
            </RevealBlock>

            {/* Subheading — italic, sage green */}
            <RevealBlock delay={0.10}>
              <div className="border-b border-[#3a3a3a]/08 pb-12">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-4">Subheading — italic, accent color</p>
                <p
                  className="font-serif font-light italic text-[#8a9a7b] leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
                >
                  Where light falls unevenly, the eye rests
                </p>
              </div>
            </RevealBlock>

            {/* Body — generous leading */}
            <RevealBlock delay={0.14}>
              <div className="border-b border-[#3a3a3a]/08 pb-12 md:ml-16">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-4">Body — font-light, generous leading</p>
                <p className="font-serif font-light text-[#3a3a3a]/55 text-base leading-[2] max-w-lg">
                  The worn wooden floor holds decades of footsteps. Each scratch is a story. Each dent, a memory. We do not sand them away — we wax them to a gentle shine and call the house our own.
                </p>
              </div>
            </RevealBlock>

            {/* Caption — extreme tracking, very small */}
            <RevealBlock delay={0.18}>
              <div className="md:ml-4">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-4">Caption — extreme tracking</p>
                <p
                  className="font-serif font-light text-[#3a3a3a]/30 uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.5em" }}
                >
                  a small thing, briefly noticed
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Ink brushstroke divider */}
      <div className="px-8 md:px-16 py-2">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===== 7. Design Principles — Do / Don't ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-20">
            <SectionKana>Principles</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              The way of wabi
            </h2>
            <p className="font-serif font-light text-[#3a3a3a]/40 mt-4 leading-relaxed max-w-md">
              Not rules but a practice. Not constraints but a clearing away.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Do — contemplative ink-wash panel */}
            <RevealBlock delay={0.06}>
              <div className="relative p-10 md:p-12 border border-[#8a9a7b]/20 bg-[#f2ede4] overflow-hidden">
                {/* Bamboo watermark */}
                <div className="absolute right-2 top-0 bottom-0 pointer-events-none opacity-30">
                  <BambooSVG className="w-10 h-full" />
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-4 h-[1px] bg-[#8a9a7b]/60" />
                  <h3 className="font-serif font-light text-[#8a9a7b] text-sm tracking-[0.3em] uppercase">
                    Embrace
                  </h3>
                </div>

                <ul className="space-y-5 relative z-10">
                  {doRules.map((rule, i) => (
                    <li
                      key={i}
                      className="font-serif font-light text-[#3a3a3a]/55 text-sm leading-relaxed pl-5 border-l border-[#8a9a7b]/20"
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't — ink wash panel, earth tones */}
            <RevealBlock delay={0.12}>
              <div
                className="relative p-10 md:p-12 border border-[#8b6f4e]/15 bg-[#f2ede4] overflow-hidden"
                style={{ marginTop: "24px" }}
              >
                {/* Stone decoration */}
                <div className="absolute -right-6 -bottom-4 pointer-events-none opacity-40">
                  <StoneTextureSVG className="w-40 h-28" />
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-4 h-[1px] bg-[#8b6f4e]/40" />
                  <h3 className="font-serif font-light text-[#8b6f4e] text-sm tracking-[0.3em] uppercase">
                    Release
                  </h3>
                </div>

                <ul className="space-y-5 relative z-10">
                  {dontRules.map((rule, i) => (
                    <li
                      key={i}
                      className="font-serif font-light text-[#3a3a3a]/45 text-sm leading-relaxed pl-5 border-l border-[#8b6f4e]/15"
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 8. Haiku interlude ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-16 md:ml-20">
            <SectionKana>Haiku</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Three breaths
            </h2>
          </RevealBlock>

          {/* Haiku display — asymmetric, interactive */}
          <RevealBlock delay={0.06}>
            <div className="relative">
              {/* Water ripple behind haiku */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 pointer-events-none">
                <WaterRippleSVG className="w-56 h-56 opacity-25" />
              </div>

              {/* Haiku text — centered but with intentional margin offset */}
              <div className="relative z-10 md:ml-32 max-w-lg">
                <div className="mb-12">
                  <p className="font-serif font-light italic text-[#3a3a3a]/70 text-2xl md:text-3xl leading-[1.8] mb-1">
                    {haiku[haikuIndex].line1}
                  </p>
                  <p className="font-serif font-light italic text-[#3a3a3a]/70 text-2xl md:text-3xl leading-[1.8] mb-1">
                    {haiku[haikuIndex].line2}
                  </p>
                  <p className="font-serif font-light italic text-[#3a3a3a]/70 text-2xl md:text-3xl leading-[1.8]">
                    {haiku[haikuIndex].line3}
                  </p>
                </div>

                {/* Attribution / selector */}
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-12 bg-[#3a3a3a]/15" />
                  <div className="flex gap-4">
                    {haiku.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHaikuIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
                          haikuIndex === i
                            ? "bg-[#3a3a3a]/50"
                            : "bg-[#3a3a3a]/15 hover:bg-[#3a3a3a]/30"
                        }`}
                        aria-label={`Haiku ${i + 1}`}
                      />
                    ))}
                  </div>
                  <p className="font-serif text-xs text-[#3a3a3a]/25 tracking-[0.2em]">
                    {haikuIndex + 1} / {haiku.length}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Ink brushstroke divider */}
      <div className="px-8 md:px-16 py-2">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===== 9. Natural Motifs Showcase ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-20">
            <SectionKana>Motifs</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Drawn from nature
            </h2>
            <p className="font-serif font-light text-[#3a3a3a]/40 mt-4 leading-relaxed max-w-md">
              Inline SVG motifs — water, stone, bamboo. No photography. No illustration stock. Just the mark.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-10 md:gap-0">
            {/* Water */}
            <RevealBlock delay={0.05}>
              <div className="p-8 md:p-10 flex flex-col items-start gap-6">
                <WaterRippleSVG className="w-32 h-32 opacity-70" />
                <div>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-lg mb-3">Water</h3>
                  <p className="font-serif font-light text-[#3a3a3a]/45 text-sm leading-[1.9]">
                    Concentric imperfect ellipses. Each ring slightly off-center, slightly different in weight — as if drawn by a trembling brush after meditation.
                  </p>
                </div>
                <p className="font-serif text-xs text-[#3a3a3a]/25 italic">mizu — 水</p>
              </div>
            </RevealBlock>

            {/* Bamboo */}
            <RevealBlock delay={0.10}>
              <div
                className="p-8 md:p-10 flex flex-col items-start gap-6 md:mt-16"
                style={{ borderLeft: "1px solid #3a3a3a0d" }}
              >
                <BambooSVG className="w-10 h-36 opacity-80" />
                <div>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-lg mb-3">Bamboo</h3>
                  <p className="font-serif font-light text-[#3a3a3a]/45 text-sm leading-[1.9]">
                    A single stalk, gently curved. Nodes mark the joints. Leaves fall asymmetrically. The sage color keeps it quiet — present but unimposing.
                  </p>
                </div>
                <p className="font-serif text-xs text-[#3a3a3a]/25 italic">take — 竹</p>
              </div>
            </RevealBlock>

            {/* Stone */}
            <RevealBlock delay={0.15}>
              <div
                className="p-8 md:p-10 flex flex-col items-start gap-6"
                style={{ borderLeft: "1px solid #3a3a3a0d" }}
              >
                <StoneTextureSVG className="w-36 h-24 opacity-70" />
                <div>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-lg mb-3">Stone</h3>
                  <p className="font-serif font-light text-[#3a3a3a]/45 text-sm leading-[1.9]">
                    An irregular silhouette, moss patches, hairline fractures. The stone does not apologize for its asymmetry — it simply is, as it has always been.
                  </p>
                </div>
                <p className="font-serif text-xs text-[#3a3a3a]/25 italic">ishi — 石</p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 10. Kintsugi Quote ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            {/* Asymmetric: quote lives right-of-center */}
            <div className="md:ml-24 max-w-2xl">
              <div className="h-[1px] bg-[#3a3a3a]/10 w-20 mb-12" />

              <blockquote className="font-serif font-light text-[#3a3a3a]/60 leading-[1.9] italic"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}
              >
                &ldquo;In Japan, broken objects are often repaired with gold. The breakage and repair are part of the history of the object, rather than something to be concealed. The cracks are gilded — and the vessel is more beautiful for having been broken.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 mt-10">
                <div className="h-[1px] bg-[#3a3a3a]/15 w-8" />
                <p className="font-serif text-xs text-[#3a3a3a]/30 tracking-[0.25em]">
                  Kintsugi &mdash; 金継ぎ
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Ink brushstroke divider */}
      <div className="px-8 md:px-16 py-2">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===== 11. Texture & Space ===== */}
      <section className="py-32 md:py-40 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-20">
            <SectionKana>Ma</SectionKana>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              The space between
            </h2>
            <p className="font-serif font-light text-[#3a3a3a]/40 mt-4 leading-relaxed max-w-md">
              Ma (間) — the pause, the interval, the emptiness that gives form its meaning.
            </p>
          </RevealBlock>

          {/* Three panels — different proportions, deliberate asymmetry */}
          <div className="flex flex-col md:flex-row gap-0">
            {/* Narrow column — very deep vertical breathing */}
            <RevealBlock delay={0.06} className="flex-shrink-0 md:w-24">
              <div className="h-64 md:h-auto md:min-h-[400px] bg-[#3a3a3a]/04 flex items-end justify-center pb-8">
                <p
                  className="font-serif font-light text-[#3a3a3a]/20 text-xs tracking-[0.4em]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  emptiness
                </p>
              </div>
            </RevealBlock>

            {/* Wide center — primary content */}
            <RevealBlock delay={0.10} className="flex-1">
              <div className="p-10 md:p-14 bg-[#f2ede4] border-x border-[#3a3a3a]/06 md:min-h-[400px] flex flex-col justify-between">
                <div>
                  <p className="font-serif font-light text-[#3a3a3a]/30 text-xs tracking-[0.3em] uppercase mb-8">Center presence</p>
                  <p className="font-serif font-light text-[#3a3a3a] text-xl leading-[1.9] max-w-sm">
                    A room needs walls to hold the silence. A page needs margins to hold the words. The empty space is not nothing — it is the container.
                  </p>
                </div>

                {/* Small water ripple in the corner */}
                <div className="flex justify-end mt-10">
                  <WaterRippleSVG className="w-24 h-24 opacity-30" />
                </div>
              </div>
            </RevealBlock>

            {/* Narrow right — mirror of left, different text */}
            <RevealBlock delay={0.14} className="flex-shrink-0 md:w-20">
              <div className="h-32 md:h-auto md:min-h-[400px] bg-[#3a3a3a]/03 flex items-center justify-center">
                <p
                  className="font-serif font-light text-[#3a3a3a]/15 text-xs tracking-[0.35em]"
                  style={{ writingMode: "vertical-rl" }}
                >
                  間
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-28 md:py-40 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">
          {/* Single thin ink line */}
          <InkDivider className="mb-20" />

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 md:gap-0">
            {/* Left — wabi-sabi identity */}
            <div>
              <p
                className="font-serif font-light text-[#3a3a3a] mb-3 leading-none"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.01em" }}
              >
                侘寂風
              </p>
              <p className="font-serif font-light text-[#3a3a3a]/30 text-xs tracking-[0.25em] uppercase">
                Wabi-Sabi &mdash; StyleKit
              </p>
            </div>

            {/* Center — small color dots as earth palette reference */}
            <div className="flex items-center gap-3">
              {colorSwatches.map((s) => (
                <div
                  key={s.hex}
                  className="rounded-full transition-all duration-1000"
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: s.hex,
                    border: s.border ? "1px solid #3a3a3a20" : "none",
                  }}
                />
              ))}
            </div>

            {/* Right — minimal links */}
            <nav className="flex flex-col gap-3 items-start md:items-end">
              <Link
                href="/styles"
                className="font-serif font-light text-xs text-[#3a3a3a]/30 tracking-[0.2em] hover:text-[#3a3a3a]/60 transition-colors duration-1000 uppercase"
              >
                All Styles
              </Link>
              <Link
                href="/styles/wabi-sabi"
                className="font-serif font-light text-xs text-[#3a3a3a]/30 tracking-[0.2em] hover:text-[#3a3a3a]/60 transition-colors duration-1000 uppercase"
              >
                Docs
              </Link>
              <Link
                href="/"
                className="font-serif font-light text-xs text-[#3a3a3a]/30 tracking-[0.2em] hover:text-[#3a3a3a]/60 transition-colors duration-1000 uppercase"
              >
                Home
              </Link>
            </nav>
          </div>

          {/* Very bottom — single line, barely visible */}
          <div className="mt-20 pt-8 border-t border-[#3a3a3a]/06">
            <p className="font-serif font-light text-[#3a3a3a]/18 text-xs tracking-[0.3em] uppercase">
              nothing lasts &middot; nothing is finished &middot; nothing is perfect
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
