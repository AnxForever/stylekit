"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tarotCards = [
  {
    id: "moon",
    numeral: "XVIII",
    title: "The Moon",
    subtitle: "Illusion & Intuition",
    desc: "Hidden truths lurk beneath silver light. The unconscious mind speaks in symbols the waking eye cannot read. Trust what stirs beneath the surface.",
    color: "#7b68ae",
    glow: "rgba(123,104,174,0.3)",
  },
  {
    id: "star",
    numeral: "XVII",
    title: "The Star",
    subtitle: "Hope & Renewal",
    desc: "After the tower falls, a single flame endures. Celestial grace pours freely from the vessel of the sky. The cosmos conspires in your favour.",
    color: "#c9a74e",
    glow: "rgba(201,167,78,0.3)",
  },
  {
    id: "tower",
    numeral: "XVI",
    title: "The Tower",
    subtitle: "Revelation & Change",
    desc: "What is built on false foundations must fall. Destruction clears space for deeper truth. Liberation arrives as lightning, sudden and complete.",
    color: "#3d8b6e",
    glow: "rgba(61,139,110,0.3)",
  },
];

const colorPalette = [
  {
    name: "Mystic Purple",
    hex: "#4a1942",
    role: "Primary",
    description: "The deep heart of every ritual",
  },
  {
    name: "Midnight Black",
    hex: "#0d0b14",
    role: "Secondary",
    description: "Void where all magic originates",
  },
  {
    name: "Ritual Gold",
    hex: "#c9a74e",
    role: "Accent",
    description: "Runes, borders, and sacred text",
  },
  {
    name: "Amethyst",
    hex: "#7b68ae",
    role: "Tertiary",
    description: "Connecting the earthly and divine",
  },
  {
    name: "Herb Green",
    hex: "#3d8b6e",
    role: "Natural",
    description: "The green world of hedge witchcraft",
  },
];

const doRules = [
  "Deep purple-to-black gradients as all background layers",
  "Gold rune text with subtle text-shadow glow at 40% opacity",
  "Semi-transparent gold borders at 30% — 60% on hover",
  "Card backgrounds using midnight black at 80% with backdrop-blur-sm",
  "Radial stardust gradients scattered throughout hero and section backgrounds",
  "Font-serif italic for all mystical headings and display text",
  "Moon, star, pentagram, and eye SVG motifs as ambient decoration",
  "Slow transitions at duration-700 for ceremonial, weighty interactions",
];

const dontRules = [
  "Never use light or white backgrounds — the ritual demands darkness",
  "Never use Comic Sans, Papyrus, or any playful decorative fonts",
  "Never use candy colors: no pink, orange, lime, or bright hues",
  "Never use fast animations or bouncing transitions (duration under 400ms)",
  "Never use hard edges or flat shadows without glow",
  "Never center-align body text in long-form content blocks",
];

const grimoire = [
  {
    chapter: "I",
    title: "The Opening Rite",
    excerpt:
      "Begin every interface with darkness. The void is not empty — it is the canvas upon which all sacred light becomes visible. Light text on dark surfaces is not a style choice; it is a cosmological truth.",
  },
  {
    chapter: "II",
    title: "The Law of Gold",
    excerpt:
      "Ritual gold #c9a74e shall appear where the eye must rest and the hand must reach. Borders, headings, and interactive elements carry this sacred hue. Its glow is never garish — always restrained, as candlelight in a stone chamber.",
  },
  {
    chapter: "III",
    title: "The Doctrine of Slowness",
    excerpt:
      "Ceremony cannot be rushed. All transitions shall span no less than five hundred milliseconds. Seven hundred is preferred. The user must feel the weight of each interaction — as one feels the turning of a page in an ancient manuscript.",
  },
  {
    chapter: "IV",
    title: "The Amethyst Bridge",
    excerpt:
      "Amethyst #7b68ae connects the earthly interface with the mystical. It appears in secondary elements, supporting text, and decorative accents. It softens where gold commands, whispers where gold speaks.",
  },
];

const typographyExamples = [
  {
    label: "Ritual Invocation",
    className: "font-serif italic",
    size: "text-5xl md:text-6xl",
    color: "text-[#c9a74e]",
    shadow: "0 0 20px rgba(201,167,78,0.4)",
    sample: "The Veil Grows Thin",
    note: "Display — 60px, serif italic, gold glow",
  },
  {
    label: "Chapter Heading",
    className: "font-serif italic",
    size: "text-3xl md:text-4xl",
    color: "text-[#c9a74e]",
    shadow: "0 0 12px rgba(201,167,78,0.3)",
    sample: "Speak, Ancient Names",
    note: "H2 — 36px, serif italic, medium glow",
  },
  {
    label: "Section Label",
    className: "font-serif",
    size: "text-xl",
    color: "text-[#7b68ae]",
    shadow: "0 0 8px rgba(123,104,174,0.3)",
    sample: "Mystical Provenance",
    note: "H3 — 20px, serif, amethyst glow",
  },
  {
    label: "Body Inscription",
    className: "font-serif",
    size: "text-base",
    color: "text-[#c9a74e]/70",
    shadow: "none",
    sample:
      "The words are written in gold upon the page of night. Each letter a small flame held against the dark.",
    note: "Body — 16px, serif, gold at 70% opacity",
  },
  {
    label: "Sacred Caption",
    className: "font-serif tracking-[0.25em] uppercase",
    size: "text-xs",
    color: "text-[#7b68ae]/60",
    shadow: "none",
    sample: "Arcane Provenance — Chapter IV",
    note: "Caption — 12px, tracked uppercase, amethyst",
  },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
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
/*  SVG Motifs                                                         */
/* ------------------------------------------------------------------ */

function MoonSVG({ size = 48, opacity = 0.25 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M36 24c0 8.837-7.163 16-16 16A16 16 0 0 1 8 24C8 15.163 15.163 8 20 8a12 12 0 0 0 0 32A16 16 0 0 0 36 24z"
        fill="#c9a74e"
      />
    </svg>
  );
}

function StarSVG({ size = 32, opacity = 0.3 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <polygon
        points="16,2 19.5,12.5 31,12.5 21.5,19.5 25,30 16,23 7,30 10.5,19.5 1,12.5 12.5,12.5"
        fill="#c9a74e"
      />
    </svg>
  );
}

function PentagramSVG({ size = 48, opacity = 0.15 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <polygon
        points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35"
        stroke="#c9a74e"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="50" cy="50" r="44" stroke="#c9a74e" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

function EyeSVG({ size = 48, opacity = 0.2 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 40"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M3 20C3 20 13 5 30 5C47 5 57 20 57 20C57 20 47 35 30 35C13 35 3 20 3 20Z"
        stroke="#c9a74e"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="30" cy="20" r="8" stroke="#c9a74e" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="20" r="3" fill="#c9a74e" />
    </svg>
  );
}

function RuneDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-4" aria-hidden="true">
      <div className="w-16 h-px bg-[#c9a74e]/30" />
      <div style={{ opacity: 0.6 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polygon
            points="8,1 10,6 15.5,6 11,9.5 13,15 8,11.5 3,15 5,9.5 0.5,6 6,6"
            fill="#c9a74e"
          />
        </svg>
      </div>
      <div className="w-16 h-px bg-[#c9a74e]/30" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4a1942] to-[#0d0b14] text-[#c9a74e]/80 font-serif overflow-x-hidden">

      {/* Stardust background — fixed radial scatter */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(1px 1px at 8% 14%, rgba(201,167,78,0.35) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 23% 72%, rgba(123,104,174,0.25) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 41% 31%, rgba(201,167,78,0.20) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 58% 88%, rgba(61,139,110,0.20) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 77% 19%, rgba(201,167,78,0.30) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 91% 63%, rgba(123,104,174,0.22) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 15% 45%, rgba(201,167,78,0.18) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 66% 52%, rgba(201,167,78,0.25) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 35% 93%, rgba(123,104,174,0.18) 0%, transparent 100%), " +
            "radial-gradient(2px 2px at 50% 5%, rgba(201,167,78,0.40) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 82% 78%, rgba(201,167,78,0.22) 0%, transparent 100%), " +
            "radial-gradient(1px 1px at 6% 96%, rgba(61,139,110,0.18) 0%, transparent 100%)",
        }}
      />

      {/* ===== 1. Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0b14]/90 backdrop-blur-md border-b border-[#c9a74e]/25">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div style={{ opacity: 0.8 }}>
                <MoonSVG size={22} opacity={1} />
              </div>
              <span
                className="font-serif italic text-lg text-[#c9a74e] tracking-widest"
                style={{ textShadow: "0 0 10px rgba(201,167,78,0.35)" }}
              >
                Witchcore
              </span>
            </div>

            {/* Nav links — hidden on mobile */}
            <nav className="hidden md:flex items-center gap-8">
              {["Ritual", "Palette", "Typography", "Grimoire"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-serif text-xs text-[#7b68ae]/60 tracking-[0.15em] uppercase hover:text-[#c9a74e] transition-colors duration-700"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* StyleKit link */}
            <Link
              href="/"
              className="font-serif text-sm text-[#c9a74e]/70 tracking-widest border border-[#c9a74e]/30 px-4 py-1.5 hover:border-[#c9a74e]/60 hover:text-[#c9a74e] hover:shadow-[0_0_14px_rgba(201,167,78,0.2)] transition-all duration-700"
            >
              StyleKit →
            </Link>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section
        id="ritual"
        className="relative min-h-screen flex items-center justify-center pt-20 pb-28 px-6 md:px-12 overflow-hidden"
      >
        {/* Deep radial glow behind hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(74,25,66,0.7) 0%, transparent 70%), " +
              "radial-gradient(ellipse 45% 35% at 20% 80%, rgba(123,104,174,0.15) 0%, transparent 60%), " +
              "radial-gradient(ellipse 40% 30% at 80% 15%, rgba(201,167,78,0.08) 0%, transparent 55%)",
          }}
        />

        {/* Floating occult decorations */}
        <div className="absolute top-24 left-8 md:left-16 pointer-events-none">
          <MoonSVG size={64} opacity={0.18} />
        </div>
        <div className="absolute top-32 right-10 md:right-20 pointer-events-none">
          <PentagramSVG size={80} opacity={0.12} />
        </div>
        <div className="absolute bottom-28 left-12 md:left-28 pointer-events-none">
          <StarSVG size={28} opacity={0.22} />
        </div>
        <div className="absolute bottom-40 right-8 md:right-16 pointer-events-none">
          <EyeSVG size={56} opacity={0.14} />
        </div>
        <div className="absolute top-1/2 left-4 pointer-events-none" style={{ transform: "translateY(-50%)" }}>
          <StarSVG size={16} opacity={0.3} />
        </div>
        <div className="absolute top-1/3 right-6 pointer-events-none">
          <StarSVG size={20} opacity={0.25} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          {/* Rune divider above */}
          <div
            className="flex items-center justify-center gap-5 mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="w-20 h-px bg-[#c9a74e]/25" />
            <span className="font-serif text-xs text-[#7b68ae]/60 tracking-[0.3em] uppercase">
              巫术核心
            </span>
            <div className="w-20 h-px bg-[#c9a74e]/25" />
          </div>

          {/* Main title */}
          <h1
            className="font-serif italic leading-tight mb-4"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              color: "#c9a74e",
              textShadow: "0 0 40px rgba(201,167,78,0.4), 0 0 80px rgba(201,167,78,0.15)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Witchcore
          </h1>

          {/* Subtitle */}
          <h2
            className="font-serif italic"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              color: "#7b68ae",
              textShadow: "0 0 20px rgba(123,104,174,0.5)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            The Ritual Interface
          </h2>

          {/* Divider */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <RuneDivider />
          </div>

          {/* Description */}
          <p
            className="font-serif text-lg md:text-xl text-[#7b68ae]/65 max-w-2xl mx-auto leading-relaxed mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            Ancient runes whisper in gold. Stardust settles on midnight surfaces. Every element is
            a ceremony — every interaction, a sacred rite drawn from tarot, alchemy, and natural
            magic.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.58s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.58s",
            }}
          >
            <button
              className="group px-10 py-4 bg-[#4a1942] border border-[#c9a74e]/50 text-[#c9a74e] font-serif italic tracking-widest hover:border-[#c9a74e] hover:shadow-[0_0_28px_rgba(201,167,78,0.35)] transition-all duration-700"
              style={{ textShadow: "0 0 8px rgba(201,167,78,0.4)" }}
            >
              Enter the Circle
            </button>
            <button className="group px-10 py-4 bg-transparent border border-[#7b68ae]/40 text-[#7b68ae] font-serif italic tracking-widest hover:border-[#7b68ae]/70 hover:text-[#7b68ae] hover:shadow-[0_0_20px_rgba(123,104,174,0.25)] transition-all duration-700">
              View the Grimoire
            </button>
          </div>

          {/* Arcane stats row */}
          <div
            className="grid grid-cols-3 gap-6 mt-20 max-w-xl mx-auto"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.72s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.72s",
            }}
          >
            {[
              { value: "XXII", label: "Major Arcana" },
              { value: "5", label: "Sacred Colors" },
              { value: "VII", label: "Design Laws" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-serif italic text-2xl text-[#c9a74e] mb-1"
                  style={{ textShadow: "0 0 10px rgba(201,167,78,0.35)" }}
                >
                  {stat.value}
                </p>
                <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section id="components" className="relative py-24 md:py-32 px-6 md:px-12">
        {/* Section ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(74,25,66,0.4) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.3em] uppercase mb-3">
              Sacred Elements
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl text-[#c9a74e] mb-4"
              style={{ textShadow: "0 0 20px rgba(201,167,78,0.3)" }}
            >
              Component Ritual
            </h2>
            <p className="font-serif text-[#7b68ae]/55 max-w-lg mx-auto leading-relaxed">
              Each element is forged in the same dark fire. Buttons invoke. Cards reveal. Inputs
              inscribe.
            </p>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1} className="flex justify-center gap-3 mb-10">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className={`px-7 py-2.5 font-serif text-sm tracking-[0.12em] uppercase border transition-all duration-700 ${
                  componentTab === tab
                    ? "bg-[#4a1942] border-[#c9a74e]/60 text-[#c9a74e] shadow-[0_0_18px_rgba(201,167,78,0.2)]"
                    : "bg-transparent border-[#c9a74e]/20 text-[#7b68ae]/50 hover:border-[#c9a74e]/40 hover:text-[#c9a74e]/70"
                }`}
                style={componentTab === tab ? { textShadow: "0 0 8px rgba(201,167,78,0.35)" } : {}}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </RevealBlock>

          {/* Demo Area */}
          <RevealBlock delay={0.18}>
            <div className="relative p-10 md:p-14 bg-[#0d0b14]/80 backdrop-blur-sm border border-[#c9a74e]/25 overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 pointer-events-none" style={{ opacity: 0.3 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 20 L0 0 L20 0" stroke="#c9a74e" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div
                className="absolute top-3 right-3 pointer-events-none"
                style={{ opacity: 0.3, transform: "scaleX(-1)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 20 L0 0 L20 0" stroke="#c9a74e" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div
                className="absolute bottom-3 left-3 pointer-events-none"
                style={{ opacity: 0.3, transform: "scaleY(-1)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 20 L0 0 L20 0" stroke="#c9a74e" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div
                className="absolute bottom-3 right-3 pointer-events-none"
                style={{ opacity: 0.3, transform: "scale(-1,-1)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 20 L0 0 L20 0" stroke="#c9a74e" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              {/* Button demos */}
              {componentTab === "button" && (
                <div className="flex flex-col items-center gap-10">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5 flex-wrap">
                    {/* Primary invoke */}
                    <button
                      className="group px-9 py-3.5 bg-[#4a1942] border border-[#c9a74e]/50 text-[#c9a74e] font-serif italic tracking-widest hover:border-[#c9a74e] hover:shadow-[0_0_24px_rgba(201,167,78,0.35)] transition-all duration-700"
                      style={{ textShadow: "0 0 8px rgba(201,167,78,0.4)" }}
                    >
                      Invoke
                    </button>
                    {/* Solid gold */}
                    <button className="group px-9 py-3.5 bg-[#c9a74e] text-[#0d0b14] font-serif italic font-semibold tracking-widest hover:shadow-[0_0_30px_rgba(201,167,78,0.5)] transition-all duration-700">
                      Activate Rune
                    </button>
                    {/* Amethyst outline */}
                    <button className="group px-9 py-3.5 bg-transparent border border-[#7b68ae]/45 text-[#7b68ae] font-serif italic tracking-widest hover:border-[#7b68ae]/80 hover:shadow-[0_0_18px_rgba(123,104,174,0.3)] transition-all duration-700">
                      Divine
                    </button>
                    {/* Herb green */}
                    <button className="group px-9 py-3.5 bg-transparent border border-[#3d8b6e]/45 text-[#3d8b6e] font-serif italic tracking-widest hover:border-[#3d8b6e]/80 hover:shadow-[0_0_18px_rgba(61,139,110,0.3)] transition-all duration-700">
                      Enchant
                    </button>
                    {/* Disabled/sealed */}
                    <button
                      disabled
                      className="px-9 py-3.5 bg-[#0d0b14] border border-[#c9a74e]/12 text-[#c9a74e]/25 font-serif italic tracking-widest cursor-not-allowed"
                    >
                      Sealed
                    </button>
                  </div>
                  <p className="font-serif text-xs text-[#7b68ae]/40 text-center max-w-xs leading-relaxed tracking-wide">
                    Borders at 50% opacity — hover transitions to full gold glow. duration-700 for
                    ceremonial weight.
                  </p>
                </div>
              )}

              {/* Card demo */}
              {componentTab === "card" && (
                <div className="flex flex-col items-center gap-8">
                  <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                    {/* Standard dark glass card */}
                    <div className="group relative p-7 bg-[#0d0b14]/80 backdrop-blur-sm border border-[#c9a74e]/25 hover:border-[#c9a74e]/55 hover:shadow-[0_0_28px_rgba(201,167,78,0.12)] transition-all duration-700 cursor-pointer overflow-hidden">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 25% 25%, rgba(201,167,78,0.04) 0%, transparent 55%)",
                        }}
                      />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a74e] shadow-[0_0_6px_rgba(201,167,78,0.6)]" />
                          <span className="font-serif text-xs text-[#7b68ae]/55 tracking-[0.2em] uppercase">
                            Arcana I
                          </span>
                        </div>
                        <div className="mb-3" style={{ opacity: 0.7 }}>
                          <MoonSVG size={28} opacity={1} />
                        </div>
                        <h3
                          className="font-serif italic text-lg text-[#c9a74e] mb-2 tracking-wide group-hover:text-[#d4b86a] transition-colors duration-700"
                          style={{ textShadow: "0 0 10px rgba(201,167,78,0.3)" }}
                        >
                          The Moon Card
                        </h3>
                        <p className="font-serif text-sm text-[#7b68ae]/55 leading-relaxed">
                          Hidden truths beneath silver light. Trust what stirs beneath the surface.
                        </p>
                      </div>
                    </div>

                    {/* Amethyst variant */}
                    <div className="group relative p-7 bg-[#0d0b14]/80 backdrop-blur-sm border border-[#7b68ae]/25 hover:border-[#7b68ae]/55 hover:shadow-[0_0_28px_rgba(123,104,174,0.15)] transition-all duration-700 cursor-pointer overflow-hidden">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 75% 75%, rgba(123,104,174,0.06) 0%, transparent 55%)",
                        }}
                      />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7b68ae] shadow-[0_0_6px_rgba(123,104,174,0.6)]" />
                          <span className="font-serif text-xs text-[#7b68ae]/55 tracking-[0.2em] uppercase">
                            Arcana XVII
                          </span>
                        </div>
                        <div className="mb-3" style={{ opacity: 0.7 }}>
                          <StarSVG size={28} opacity={1} />
                        </div>
                        <h3 className="font-serif italic text-lg text-[#7b68ae] mb-2 tracking-wide group-hover:text-[#9580c8] transition-colors duration-700">
                          The Star Card
                        </h3>
                        <p className="font-serif text-sm text-[#7b68ae]/55 leading-relaxed">
                          Hope renewed under cosmic radiance — a guide through the darkest passages.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="font-serif text-xs text-[#7b68ae]/40 text-center max-w-xs leading-relaxed tracking-wide">
                    bg-[#0d0b14]/80 with backdrop-blur-sm. Border at 25% — hover lifts to 55% with
                    outer glow.
                  </p>
                </div>
              )}

              {/* Input demo */}
              {componentTab === "input" && (
                <div className="flex flex-col items-center gap-8 w-full">
                  <div className="w-full max-w-md space-y-5">
                    <div>
                      <label className="block font-serif text-xs text-[#c9a74e]/60 tracking-[0.2em] uppercase mb-2">
                        True Name
                      </label>
                      <input
                        type="text"
                        placeholder="Reveal yourself..."
                        className="w-full px-5 py-3.5 bg-[#0d0b14]/70 border border-[#c9a74e]/25 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/65 focus:shadow-[0_0_18px_rgba(201,167,78,0.15)] transition-all duration-700"
                      />
                    </div>
                    <div>
                      <label className="block font-serif text-xs text-[#c9a74e]/60 tracking-[0.2em] uppercase mb-2">
                        Astral Correspondence
                      </label>
                      <input
                        type="email"
                        placeholder="your@realm.arcane"
                        className="w-full px-5 py-3.5 bg-[#0d0b14]/70 border border-[#c9a74e]/25 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/65 focus:shadow-[0_0_18px_rgba(201,167,78,0.15)] transition-all duration-700"
                      />
                    </div>
                    <div>
                      <label className="block font-serif text-xs text-[#c9a74e]/60 tracking-[0.2em] uppercase mb-2">
                        Prophecy
                      </label>
                      <textarea
                        placeholder="Write your inscription..."
                        rows={3}
                        className="w-full px-5 py-3.5 bg-[#0d0b14]/70 border border-[#c9a74e]/25 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/65 focus:shadow-[0_0_18px_rgba(201,167,78,0.15)] transition-all duration-700 resize-none"
                      />
                    </div>
                  </div>
                  <p className="font-serif text-xs text-[#7b68ae]/40 text-center max-w-xs leading-relaxed tracking-wide">
                    Gold border at 25% base. Focus state: 65% opacity + outer glow. duration-700
                    throughout.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section id="palette" className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(13,11,20,0.6) 0%, transparent 80%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.3em] uppercase mb-3">
              Mystical Hues
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl text-[#c9a74e] mb-4"
              style={{ textShadow: "0 0 20px rgba(201,167,78,0.3)" }}
            >
              The Sacred Palette
            </h2>
            <p className="font-serif text-[#7b68ae]/55 max-w-md mx-auto leading-relaxed">
              Five colors drawn from the astral plane — each with a role in the ritual hierarchy.
            </p>
          </RevealBlock>

          {/* Ritual circles layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08} className="">
                <div className="group flex flex-col items-center text-center gap-4 cursor-default">
                  {/* Ritual circle */}
                  <div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${color.hex}dd, ${color.hex}88 60%, ${color.hex}44 85%, transparent 100%)`,
                      boxShadow: `0 0 0 1px ${color.hex}40, 0 0 20px ${color.hex}30, inset 0 0 20px ${color.hex}20`,
                    }}
                  >
                    {/* Inner highlight */}
                    <div
                      className="absolute top-3 left-4 w-4 h-4 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${color.hex}cc, transparent 70%)`,
                        opacity: 0.4,
                      }}
                    />
                    {/* Role label inside circle */}
                    <span className="font-serif text-[10px] tracking-[0.15em] uppercase text-white/70 relative z-10">
                      {color.role}
                    </span>
                  </div>

                  <div>
                    <p
                      className="font-serif italic text-base mb-0.5 transition-all duration-700"
                      style={{ color: color.hex, textShadow: `0 0 8px ${color.hex}40` }}
                    >
                      {color.name}
                    </p>
                    <p
                      className="font-serif text-xs tracking-[0.1em] mb-1"
                      style={{ color: `${color.hex}70` }}
                    >
                      {color.hex}
                    </p>
                    <p className="font-serif text-xs text-[#7b68ae]/45 leading-relaxed max-w-[120px] mx-auto">
                      {color.description}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient strip */}
          <RevealBlock delay={0.5} className="mt-14">
            <div className="w-full h-12 rounded-none overflow-hidden border border-[#c9a74e]/20">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(to right, #0d0b14 0%, #4a1942 25%, #7b68ae 50%, #c9a74e 75%, #3d8b6e 100%)",
                }}
              />
            </div>
            <p className="font-serif text-xs text-center text-[#7b68ae]/40 mt-3 tracking-[0.15em] uppercase">
              The full spectrum of the ritual
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Typography ===== */}
      <section id="typography" className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(74,25,66,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.3em] uppercase mb-3">
              Sacred Script
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl text-[#c9a74e] mb-4"
              style={{ textShadow: "0 0 20px rgba(201,167,78,0.3)" }}
            >
              Typography System
            </h2>
            <p className="font-serif text-[#7b68ae]/55 max-w-lg mx-auto leading-relaxed">
              Serif italic for display and ceremony. Tracked uppercase for labels. Every weight
              choice is deliberate and reverent.
            </p>
          </RevealBlock>

          <div className="space-y-4">
            {typographyExamples.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.07}>
                <div className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 bg-[#0d0b14]/60 backdrop-blur-sm border border-[#c9a74e]/15 hover:border-[#c9a74e]/35 transition-all duration-700">
                  {/* Label */}
                  <div className="md:w-44 flex-shrink-0">
                    <span className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                  </div>

                  {/* Sample text */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p
                      className={`${item.size} ${item.className} ${item.color} leading-tight truncate`}
                      style={{ textShadow: item.shadow !== "none" ? item.shadow : undefined }}
                    >
                      {item.sample}
                    </p>
                  </div>

                  {/* Note */}
                  <div className="md:w-52 flex-shrink-0">
                    <p className="font-serif text-xs text-[#7b68ae]/40 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Letter-spacing showcase */}
          <RevealBlock delay={0.4} className="mt-10">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="p-8 bg-[#0d0b14]/60 backdrop-blur-sm border border-[#c9a74e]/15">
                <p className="font-serif text-xs text-[#7b68ae]/45 tracking-[0.2em] uppercase mb-5">
                  Tight display tracking
                </p>
                <p
                  className="font-serif italic text-3xl text-[#c9a74e] tracking-tight"
                  style={{ textShadow: "0 0 14px rgba(201,167,78,0.35)" }}
                >
                  The Veil Grows Thin
                </p>
                <p className="font-serif text-xs text-[#7b68ae]/35 mt-3">
                  tracking-tight — authority and presence at large display size
                </p>
              </div>
              <div className="p-8 bg-[#0d0b14]/60 backdrop-blur-sm border border-[#c9a74e]/15">
                <p className="font-serif text-xs text-[#7b68ae]/45 tracking-[0.2em] uppercase mb-5">
                  Wide rune tracking
                </p>
                <p
                  className="font-serif text-sm text-[#c9a74e] tracking-[0.35em] uppercase"
                  style={{ textShadow: "0 0 8px rgba(201,167,78,0.3)" }}
                >
                  Sacred Provenance — Chapter IV
                </p>
                <p className="font-serif text-xs text-[#7b68ae]/35 mt-3">
                  tracking-[0.35em] — creates ceremonial rhythm in labels
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Tarot Cards (extended content section) ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Background pentagram watermark */}
        <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: "translate(-50%, -50%)" }}>
          <PentagramSVG size={400} opacity={0.04} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.3em] uppercase mb-3">
              The Major Arcana
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl text-[#c9a74e] mb-4"
              style={{ textShadow: "0 0 20px rgba(201,167,78,0.3)" }}
            >
              Tarot Arcana
            </h2>
            <p className="font-serif text-[#7b68ae]/55 max-w-lg mx-auto leading-relaxed">
              Cards as design elements — dark glass surfaces bearing symbols of fate, each
              interaction felt as a turn of the deck.
            </p>
          </RevealBlock>

          {/* Card selector */}
          <RevealBlock delay={0.1} className="flex justify-center gap-4 mb-10">
            {tarotCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => setActiveCardIndex(i)}
                className={`font-serif text-xs tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-700 ${
                  activeCardIndex === i
                    ? "border-[#c9a74e]/60 text-[#c9a74e] shadow-[0_0_14px_rgba(201,167,78,0.2)]"
                    : "border-[#c9a74e]/15 text-[#7b68ae]/45 hover:border-[#c9a74e]/35 hover:text-[#c9a74e]/70"
                }`}
              >
                {card.title}
              </button>
            ))}
          </RevealBlock>

          {/* Active tarot card display */}
          <RevealBlock delay={0.18}>
            <div className="relative overflow-hidden bg-[#0d0b14]/80 backdrop-blur-sm border border-[#c9a74e]/25 p-10 md:p-14">
              {/* Ambient radial for active card color */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 15% 30%, ${tarotCards[activeCardIndex].glow.replace("0.3", "0.07")} 0%, transparent 65%)`,
                }}
              />

              <div className="relative grid md:grid-cols-5 gap-10 items-center">
                {/* Card visual — left 2 cols */}
                <div className="md:col-span-2 flex justify-center">
                  <div
                    className="relative w-48 h-72 border flex flex-col items-center justify-between py-8 px-6"
                    style={{
                      borderColor: `${tarotCards[activeCardIndex].color}50`,
                      background: `linear-gradient(160deg, #0d0b14 0%, #16121f 50%, #0d0b14 100%)`,
                      boxShadow: `0 0 40px ${tarotCards[activeCardIndex].glow}, inset 0 0 30px ${tarotCards[activeCardIndex].glow.replace("0.3", "0.04")}`,
                    }}
                  >
                    {/* Card numeral */}
                    <p
                      className="font-serif tracking-[0.3em] text-sm"
                      style={{ color: tarotCards[activeCardIndex].color, opacity: 0.7 }}
                    >
                      {tarotCards[activeCardIndex].numeral}
                    </p>

                    {/* Card symbol — inline SVG */}
                    <div className="flex items-center justify-center">
                      {activeCardIndex === 0 && (
                        <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M36 24c0 8.837-7.163 16-16 16A16 16 0 0 1 8 24C8 15.163 15.163 8 20 8a12 12 0 0 0 0 32A16 16 0 0 0 36 24z"
                            fill="#7b68ae"
                            opacity="0.8"
                          />
                          {/* Stars around the moon */}
                          <circle cx="36" cy="12" r="2" fill="#c9a74e" opacity="0.6" />
                          <circle cx="40" cy="22" r="1.5" fill="#c9a74e" opacity="0.5" />
                          <circle cx="34" cy="36" r="1" fill="#c9a74e" opacity="0.4" />
                        </svg>
                      )}
                      {activeCardIndex === 1 && (
                        <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
                          <polygon
                            points="16,2 19.5,12.5 31,12.5 21.5,19.5 25,30 16,23 7,30 10.5,19.5 1,12.5 12.5,12.5"
                            fill="#c9a74e"
                            opacity="0.85"
                          />
                        </svg>
                      )}
                      {activeCardIndex === 2 && (
                        <svg width="72" height="72" viewBox="0 0 60 60" fill="none">
                          <polygon
                            points="30,5 35,22 53,22 39,32.5 44,50 30,39.5 16,50 21,32.5 7,22 25,22"
                            stroke="#3d8b6e"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.8"
                          />
                          <circle cx="30" cy="30" r="26" stroke="#3d8b6e" strokeWidth="1" fill="none" opacity="0.4" />
                        </svg>
                      )}
                    </div>

                    {/* Card title */}
                    <div className="text-center">
                      <p
                        className="font-serif italic text-base tracking-wider"
                        style={{ color: tarotCards[activeCardIndex].color, textShadow: `0 0 10px ${tarotCards[activeCardIndex].glow}` }}
                      >
                        {tarotCards[activeCardIndex].title}
                      </p>
                      <p className="font-serif text-xs tracking-[0.15em] uppercase text-[#7b68ae]/45 mt-1">
                        {tarotCards[activeCardIndex].subtitle}
                      </p>
                    </div>

                    {/* Corner rune marks */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l border-t" style={{ borderColor: `${tarotCards[activeCardIndex].color}40` }} />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r border-t" style={{ borderColor: `${tarotCards[activeCardIndex].color}40` }} />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b" style={{ borderColor: `${tarotCards[activeCardIndex].color}40` }} />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b" style={{ borderColor: `${tarotCards[activeCardIndex].color}40` }} />
                  </div>
                </div>

                {/* Card content — right 3 cols */}
                <div className="md:col-span-3">
                  <p
                    className="font-serif text-xs tracking-[0.3em] uppercase mb-3"
                    style={{ color: `${tarotCards[activeCardIndex].color}70` }}
                  >
                    {tarotCards[activeCardIndex].numeral} — Major Arcana
                  </p>
                  <h3
                    className="font-serif italic text-3xl md:text-4xl mb-2"
                    style={{
                      color: tarotCards[activeCardIndex].color,
                      textShadow: `0 0 16px ${tarotCards[activeCardIndex].glow}`,
                    }}
                  >
                    {tarotCards[activeCardIndex].title}
                  </h3>
                  <p
                    className="font-serif italic text-lg mb-6"
                    style={{ color: `${tarotCards[activeCardIndex].color}70` }}
                  >
                    {tarotCards[activeCardIndex].subtitle}
                  </p>
                  <div className="w-12 h-px mb-6" style={{ background: `${tarotCards[activeCardIndex].color}40` }} />
                  <p className="font-serif text-[#7b68ae]/60 leading-relaxed text-base">
                    {tarotCards[activeCardIndex].desc}
                  </p>

                  <div className="mt-8">
                    <button
                      className="font-serif italic text-sm tracking-widest px-7 py-3 border transition-all duration-700 hover:shadow-[0_0_18px_rgba(201,167,78,0.2)]"
                      style={{
                        color: tarotCards[activeCardIndex].color,
                        borderColor: `${tarotCards[activeCardIndex].color}45`,
                      }}
                    >
                      Reveal Reading
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. Design Principles (Do / Don't — Tarot card style) ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(74,25,66,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.3em] uppercase mb-3">
              The Sacred Laws
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl text-[#c9a74e] mb-4"
              style={{ textShadow: "0 0 20px rgba(201,167,78,0.3)" }}
            >
              Design Principles
            </h2>
            <p className="font-serif text-[#7b68ae]/55 max-w-lg mx-auto leading-relaxed">
              Laws carved into the foundation of the craft. Follow them with reverence — deviation
              breaks the ritual.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-7">
            {/* DO panel — tarot card style */}
            <RevealBlock delay={0.06}>
              <div className="relative p-8 md:p-10 bg-[#0d0b14]/80 backdrop-blur-sm border border-[#3d8b6e]/30 overflow-hidden h-full">
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(61,139,110,0.06) 0%, transparent 70%)",
                  }}
                />
                {/* Eye symbol watermark */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <EyeSVG size={40} opacity={0.1} />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-7 h-7 rounded-full bg-[#3d8b6e]/20 border border-[#3d8b6e]/40 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#3d8b6e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3
                      className="font-serif italic text-xl text-[#3d8b6e] tracking-wide"
                      style={{ textShadow: "0 0 10px rgba(61,139,110,0.35)" }}
                    >
                      Embrace
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {doRules.map((rule, i) => (
                      <li
                        key={i}
                        className="flex gap-4 border-l border-[#3d8b6e]/25 pl-4"
                      >
                        <span className="font-serif text-xs text-[#3d8b6e]/40 tracking-wider flex-shrink-0 mt-0.5 italic">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-sm italic text-[#7b68ae]/55 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.12}>
              <div className="relative p-8 md:p-10 bg-[#0d0b14]/80 backdrop-blur-sm border border-[#8b3a3a]/30 overflow-hidden h-full">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,58,58,0.05) 0%, transparent 70%)",
                  }}
                />
                {/* Moon watermark */}
                <div className="absolute top-4 right-4 pointer-events-none" style={{ opacity: 0.1 }}>
                  <MoonSVG size={40} opacity={1} />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-7 h-7 rounded-full bg-[#8b3a3a]/20 border border-[#8b3a3a]/40 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3L9 9M9 3L3 9" stroke="#c97a7a" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3
                      className="font-serif italic text-xl text-[#c97a7a] tracking-wide"
                      style={{ textShadow: "0 0 10px rgba(201,122,122,0.35)" }}
                    >
                      Avoid
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {dontRules.map((rule, i) => (
                      <li
                        key={i}
                        className="flex gap-4 border-l border-[#8b3a3a]/25 pl-4"
                      >
                        <span className="font-serif text-xs text-[#c97a7a]/35 tracking-wider flex-shrink-0 mt-0.5 italic">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-sm italic text-[#7b68ae]/50 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy quote card */}
          <RevealBlock delay={0.22} className="mt-8">
            <div className="relative p-10 bg-[#0d0b14]/70 backdrop-blur-sm border border-[#c9a74e]/20 text-center overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,167,78,0.03) 0%, transparent 70%)",
                }}
              />
              <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: "translate(-50%, -50%)" }}>
                <PentagramSVG size={200} opacity={0.04} />
              </div>
              <div className="relative">
                <div className="flex justify-center mb-6" style={{ opacity: 0.4 }}>
                  <StarSVG size={20} opacity={1} />
                </div>
                <p
                  className="font-serif italic text-xl md:text-2xl text-[#c9a74e]/65 leading-relaxed max-w-2xl mx-auto"
                  style={{ textShadow: "0 0 10px rgba(201,167,78,0.15)" }}
                >
                  &ldquo;Darkness is not the absence of light — it is the presence of depth. Every
                  interface built in night becomes a mirror for what the user carries within.&rdquo;
                </p>
                <p className="font-serif text-xs text-[#7b68ae]/40 tracking-[0.25em] uppercase mt-6">
                  — The Witchcore Grimoire, Chapter I
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. The Grimoire (extended reading section) ===== */}
      <section id="grimoire" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Large eye watermark in background */}
        <div className="absolute top-1/2 right-4 pointer-events-none" style={{ transform: "translateY(-50%)" }}>
          <EyeSVG size={280} opacity={0.04} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="font-serif text-xs text-[#7b68ae]/50 tracking-[0.3em] uppercase mb-3">
              Ancient Manuscript
            </p>
            <h2
              className="font-serif italic text-4xl md:text-5xl text-[#c9a74e] mb-4"
              style={{ textShadow: "0 0 20px rgba(201,167,78,0.3)" }}
            >
              The Design Grimoire
            </h2>
            <p className="font-serif text-[#7b68ae]/55 max-w-lg mx-auto leading-relaxed">
              Four chapters of foundational law — the written record of every principle that
              governs this system of mystical interface design.
            </p>
          </RevealBlock>

          <div className="space-y-5">
            {grimoire.map((entry, i) => (
              <RevealBlock key={entry.chapter} delay={i * 0.09}>
                <div className="group relative p-8 md:p-10 bg-[#0d0b14]/70 backdrop-blur-sm border border-[#c9a74e]/18 hover:border-[#c9a74e]/40 hover:shadow-[0_0_24px_rgba(201,167,78,0.08)] transition-all duration-700 overflow-hidden">
                  {/* Chapter number — large watermark */}
                  <div
                    className="absolute right-6 top-1/2 pointer-events-none font-serif italic"
                    style={{
                      transform: "translateY(-50%)",
                      fontSize: "5rem",
                      color: "#c9a74e",
                      opacity: 0.04,
                      lineHeight: 1,
                    }}
                  >
                    {entry.chapter}
                  </div>

                  <div className="relative grid md:grid-cols-5 gap-6 items-start">
                    {/* Chapter numeral */}
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-8 bg-[#c9a74e]/30 group-hover:bg-[#c9a74e]/60 transition-colors duration-700" />
                        <div>
                          <p className="font-serif text-xs text-[#7b68ae]/40 tracking-[0.2em] uppercase leading-none mb-0.5">
                            Chapter
                          </p>
                          <p
                            className="font-serif italic text-2xl text-[#c9a74e]/50 group-hover:text-[#c9a74e]/80 transition-colors duration-700 leading-none"
                            style={{ textShadow: "0 0 8px rgba(201,167,78,0.2)" }}
                          >
                            {entry.chapter}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chapter content */}
                    <div className="md:col-span-4">
                      <h3
                        className="font-serif italic text-xl text-[#c9a74e] mb-3 tracking-wide group-hover:text-[#d4b86a] transition-colors duration-700"
                        style={{ textShadow: "0 0 10px rgba(201,167,78,0.25)" }}
                      >
                        {entry.title}
                      </h3>
                      <p className="font-serif text-sm text-[#7b68ae]/55 leading-relaxed">
                        {entry.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. Footer ===== */}
      <footer className="relative py-16 px-6 md:px-12 border-t border-[#c9a74e]/20 overflow-hidden">
        {/* Footer ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(74,25,66,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Floating occult symbols in footer */}
        <div className="absolute bottom-6 left-10 pointer-events-none">
          <MoonSVG size={36} opacity={0.1} />
        </div>
        <div className="absolute top-6 right-16 pointer-events-none">
          <StarSVG size={20} opacity={0.14} />
        </div>
        <div className="absolute bottom-10 right-10 pointer-events-none">
          <PentagramSVG size={50} opacity={0.07} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <MoonSVG size={20} opacity={0.9} />
                <span
                  className="font-serif italic text-xl text-[#c9a74e]"
                  style={{ textShadow: "0 0 12px rgba(201,167,78,0.4)" }}
                >
                  Witchcore
                </span>
              </div>
              <p className="font-serif text-xs text-[#7b68ae]/40 tracking-[0.12em] italic">
                巫术核心 — Mystical Interface Design
              </p>
              <p className="font-serif text-xs text-[#7b68ae]/30 tracking-wide mt-1">
                Part of StyleKit — a living collection of design systems
              </p>
            </div>

            {/* Ritual color dots */}
            <div className="flex items-center gap-4">
              {colorPalette.map((c) => (
                <div
                  key={c.hex}
                  className="w-4 h-4 rounded-full transition-all duration-700 hover:scale-125"
                  style={{
                    background: c.hex,
                    boxShadow: `0 0 8px ${c.hex}60`,
                  }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-7">
              <Link
                href="/styles/witchcore"
                className="font-serif text-xs text-[#7b68ae]/40 tracking-[0.15em] uppercase hover:text-[#c9a74e] transition-colors duration-700"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs text-[#7b68ae]/40 tracking-[0.15em] uppercase hover:text-[#c9a74e] transition-colors duration-700"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="font-serif text-xs text-[#7b68ae]/40 tracking-[0.15em] uppercase hover:text-[#c9a74e] transition-colors duration-700"
              >
                Home
              </Link>
            </nav>
          </div>

          {/* Divider + closing rune line */}
          <div className="mt-12 pt-8 border-t border-[#c9a74e]/12 flex flex-col md:flex-row items-center justify-between gap-4">
            <RuneDivider />
            <p className="font-serif text-xs text-[#7b68ae]/25 tracking-[0.2em] text-center italic">
              &ldquo;Every ending is a new circle cast.&rdquo;
            </p>
            <RuneDivider />
          </div>
        </div>
      </footer>
    </div>
  );
}
