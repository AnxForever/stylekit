"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  InView hook + RevealBlock primitive                                */
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
/*  Marble vein SVG pattern (inline)                                   */
/* ------------------------------------------------------------------ */

function MarbleVeinPattern({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="marble-blur">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.04" numOctaves="5" seed="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feComposite in="grey" in2="SourceGraphic" operator="in" />
        </filter>
        <linearGradient id="vein1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a7968" stopOpacity="0" />
          <stop offset="40%" stopColor="#8a7968" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8a7968" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vein2" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
          <stop offset="50%" stopColor="#c9a96e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vein3" x1="80%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor="#8a7968" stopOpacity="0" />
          <stop offset="60%" stopColor="#8a7968" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8a7968" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main diagonal veins */}
      <path
        d="M-100 200 Q 150 80 300 250 Q 480 420 700 180 Q 900 -20 1100 150 Q 1300 320 1500 100"
        fill="none"
        stroke="url(#vein1)"
        strokeWidth="1.5"
        opacity={opacity * 12}
      />
      <path
        d="M-50 350 Q 200 200 420 380 Q 600 540 820 320 Q 980 140 1200 300 Q 1380 440 1600 200"
        fill="none"
        stroke="url(#vein1)"
        strokeWidth="0.8"
        opacity={opacity * 8}
      />
      <path
        d="M100 -50 Q 200 200 350 150 Q 500 100 600 350 Q 700 580 900 420 Q 1060 280 1200 500"
        fill="none"
        stroke="url(#vein2)"
        strokeWidth="1"
        opacity={opacity * 6}
      />
      <path
        d="M0 500 Q 250 350 500 480 Q 700 600 900 400 Q 1100 220 1400 400"
        fill="none"
        stroke="url(#vein3)"
        strokeWidth="0.6"
        opacity={opacity * 7}
      />
      <path
        d="M200 0 Q 280 300 450 200 Q 600 100 750 400 Q 880 650 1100 450 Q 1300 280 1500 500"
        fill="none"
        stroke="url(#vein1)"
        strokeWidth="0.4"
        opacity={opacity * 5}
      />
      {/* Hairline accent veins */}
      <path
        d="M-200 100 Q 100 280 350 100 Q 560 -60 800 200 Q 1000 420 1300 160 Q 1500 0 1700 200"
        fill="none"
        stroke="#8a7968"
        strokeWidth="0.3"
        opacity={opacity * 4}
      />
      <path
        d="M300 600 Q 500 400 750 550 Q 950 680 1200 500 Q 1400 340 1600 600"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="0.4"
        opacity={opacity * 3}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Thin gold divider                                                  */
/* ------------------------------------------------------------------ */

function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`h-[1px] bg-[#c9a96e] ${className}`} />;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Onyx Black", hex: "#1a1a1a", label: "Primary text, nav", light: false },
  { name: "Marble White", hex: "#f8f6f3", label: "Main background", light: true },
  { name: "Antique Gold", hex: "#c9a96e", label: "Accents, borders", light: false },
  { name: "Warm Grey", hex: "#8a7968", label: "Secondary text", light: false },
  { name: "Light Marble", hex: "#e8e0d6", label: "Surfaces, cards", light: true },
];

const typographyRows = [
  {
    label: "Display",
    sample: "Permanence",
    className: "font-serif text-5xl font-light tracking-tight text-[#1a1a1a]",
    spec: "font-serif / 5xl / light / tracking-tight",
  },
  {
    label: "Heading",
    sample: "Crafted in Silence",
    className: "font-serif text-3xl font-normal tracking-wide text-[#1a1a1a]",
    spec: "font-serif / 3xl / normal / tracking-wide",
  },
  {
    label: "Subheading",
    sample: "The Weight of Stone",
    className: "font-serif text-xl font-normal tracking-widest text-[#8a7968]",
    spec: "font-serif / xl / normal / tracking-widest",
  },
  {
    label: "Body",
    sample: "Marble endures where lesser materials dissolve into memory.",
    className: "font-serif text-base font-light leading-relaxed text-[#1a1a1a]",
    spec: "font-serif / base / light / leading-relaxed",
  },
  {
    label: "Caption",
    sample: "Rome, 80 AD — The Colosseum",
    className: "font-serif text-sm font-light tracking-widest uppercase text-[#8a7968]",
    spec: "font-serif / sm / light / tracking-widest / uppercase",
  },
];

const principles = [
  {
    type: "do" as const,
    rules: [
      "Main background: bg-[#f8f6f3] — warm marble white, never pure white",
      "Serif typeface, font-light or font-normal only — restraint is wealth",
      "Gold dividers: h-[1px] bg-[#c9a96e] — drawn, not sprayed",
      "Generous negative space: py-24 or py-32 for all major sections",
      "Hover transitions: color shift to gold only — no scale, no bounce",
      "Borders: border-[#c9a96e] at 1px — a suggestion, not a wall",
      "Card surfaces: bg-[#e8e0d6] or bg-[#f8f6f3] with minimal shadow",
      "Text color: text-[#1a1a1a] deep black — absolute legibility",
      "Inline SVG marble vein patterns overlaid at low opacity",
    ],
  },
  {
    type: "dont" as const,
    rules: [
      "No font-bold or font-semibold — weight is noise in this language",
      "No saturated colors — green, blue, red are vulgar intrusions",
      "No rounded-xl or pill shapes — prefer rounded-none or rounded-sm",
      "No playful keyframe animations — motion must be minimal and slow",
      "No drop shadows with large blur — a surface should know its place",
      "No gradient backgrounds on primary surfaces — marble is solid",
      "No tight letter-spacing — luxury breathes at tracking-wide or wider",
      "No multiple font families — one serif, one silence",
    ],
  },
];

const products = [
  {
    name: "Carrara Collection",
    origin: "Tuscany, Italy",
    desc: "White-grey marble quarried since antiquity. Michelangelo's preferred medium.",
    year: "Est. 1497",
  },
  {
    name: "Nero Marquina",
    origin: "Markina, Spain",
    desc: "Absolute black ground with brilliant white veining. Uncompromising contrast.",
    year: "Est. 1832",
  },
  {
    name: "Calacatta Gold",
    origin: "Apuan Alps, Italy",
    desc: "Bold gold veining on luminous white. The rarest of the Italian marbles.",
    year: "Est. 1610",
  },
];

const componentTabs = ["Button", "Card", "Input"] as const;
type ComponentTab = (typeof componentTabs)[number];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentTab>("Button");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#1a1a1a] relative overflow-x-hidden">
      {/* ============================================================= */}
      {/* 1. Fixed Navigation                                            */}
      {/* ============================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f6f3]/95 backdrop-blur-sm border-b border-[#c9a96e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="h-5 w-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-sm font-normal tracking-[0.25em] uppercase text-[#1a1a1a]">
                Marble Luxury
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-10">
              {["Collection", "Philosophy", "Typography", "Palette"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-serif text-xs tracking-[0.2em] uppercase text-[#8a7968] hover:text-[#c9a96e] transition-colors duration-500"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Back link */}
            <Link
              href="/"
              className="font-serif text-xs tracking-[0.2em] uppercase text-[#8a7968] hover:text-[#c9a96e] transition-colors duration-500 flex items-center gap-2"
            >
              <span className="text-[#c9a96e]">&#8592;</span>
              StyleKit
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================= */}
      {/* 2. Hero Section                                                */}
      {/* ============================================================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Marble vein background */}
        <div className="absolute inset-0 bg-[#f8f6f3]">
          <MarbleVeinPattern opacity={0.05} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-32 w-full">
          <div className="max-w-4xl">
            {/* Overline */}
            <div
              className="flex items-center gap-6 mb-16"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <div className="w-12 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">
                大理石奢华 — Marble Luxury
              </span>
            </div>

            {/* Main title */}
            <h1
              className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-light leading-none tracking-tight text-[#1a1a1a] mb-12"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
            >
              Silence
              <br />
              <span className="text-[#8a7968]">in Stone.</span>
            </h1>

            {/* Gold rule */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              <GoldDivider className="w-full max-w-sm mb-12" />
            </div>

            {/* Subtitle */}
            <p
              className="font-serif text-lg font-light leading-relaxed text-[#8a7968] max-w-xl"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s",
              }}
            >
              Ancient Rome's power material. Marble's grey veins on warm white, paired with antique gold.
              Maximum luxury through minimum decoration.
            </p>

            {/* CTA */}
            <div
              className="mt-16 flex items-center gap-8"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s",
              }}
            >
              <a
                href="#collection"
                className="group font-serif text-xs tracking-[0.3em] uppercase border border-[#c9a96e] text-[#1a1a1a] px-10 py-4 hover:bg-[#c9a96e] hover:text-[#f8f6f3] transition-colors duration-500"
              >
                View Collection
              </a>
              <a
                href="#philosophy"
                className="font-serif text-xs tracking-[0.3em] uppercase text-[#8a7968] hover:text-[#c9a96e] transition-colors duration-500"
              >
                Our Philosophy
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 1.2s",
          }}
        >
          <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968]">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#c9a96e] to-transparent" />
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3. Component Demos                                             */}
      {/* ============================================================= */}
      <section id="collection" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">Components</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight mb-6">
              The Vocabulary of Restraint
            </h2>
            <GoldDivider className="w-24 mb-8" />
            <p className="font-serif text-base font-light leading-relaxed text-[#8a7968] max-w-xl">
              Every element speaks in the same measured tone. Gold accents, marble surfaces, and absolute silence between elements.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock className="mb-16">
            <div className="flex items-center border-b border-[#e8e0d6]">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveComponentTab(tab)}
                  className={`font-serif text-xs tracking-[0.25em] uppercase px-8 py-4 border-b-[1px] transition-colors duration-500 ${
                    activeComponentTab === tab
                      ? "border-[#c9a96e] text-[#1a1a1a]"
                      : "border-transparent text-[#8a7968] hover:text-[#c9a96e]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <RevealBlock>
            {/* --- BUTTON tab --- */}
            {activeComponentTab === "Button" && (
              <div className="space-y-16">
                {/* Primary button */}
                <div>
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#8a7968] mb-8">Primary Action</p>
                  <div className="flex flex-wrap items-start gap-8">
                    <button
                      type="button"
                      className="group font-serif text-xs tracking-[0.3em] uppercase border border-[#c9a96e] text-[#1a1a1a] px-12 py-4 hover:bg-[#c9a96e] hover:text-[#f8f6f3] transition-colors duration-500"
                    >
                      Reserve Now
                    </button>
                    <button
                      type="button"
                      className="group font-serif text-xs tracking-[0.3em] uppercase border border-[#1a1a1a] text-[#1a1a1a] px-12 py-4 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-500"
                    >
                      Inquire
                    </button>
                    <button
                      type="button"
                      className="group font-serif text-xs tracking-[0.3em] uppercase bg-[#1a1a1a] text-[#f8f6f3] px-12 py-4 hover:bg-[#c9a96e] transition-colors duration-500"
                    >
                      Acquire
                    </button>
                  </div>
                </div>

                {/* Ghost / minimal */}
                <div>
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#8a7968] mb-8">Minimal Variants</p>
                  <div className="flex flex-wrap items-start gap-8">
                    <button
                      type="button"
                      className="group font-serif text-xs tracking-[0.3em] uppercase text-[#8a7968] hover:text-[#c9a96e] transition-colors duration-500 flex items-center gap-3"
                    >
                      Discover more
                      <span className="block w-8 h-[1px] bg-[#c9a96e] group-hover:w-12 transition-all duration-500" />
                    </button>
                    <button
                      type="button"
                      className="group font-serif text-xs tracking-[0.3em] uppercase text-[#1a1a1a] hover:text-[#c9a96e] transition-colors duration-500 underline underline-offset-4 decoration-[#e8e0d6] hover:decoration-[#c9a96e]"
                    >
                      View catalogue
                    </button>
                  </div>
                </div>

                {/* Size scale */}
                <div>
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#8a7968] mb-8">Scale</p>
                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      type="button"
                      className="font-serif text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e] text-[#1a1a1a] px-6 py-2.5 hover:bg-[#c9a96e] hover:text-[#f8f6f3] transition-colors duration-500"
                    >
                      Small
                    </button>
                    <button
                      type="button"
                      className="font-serif text-xs tracking-[0.3em] uppercase border border-[#c9a96e] text-[#1a1a1a] px-10 py-4 hover:bg-[#c9a96e] hover:text-[#f8f6f3] transition-colors duration-500"
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      className="font-serif text-sm tracking-[0.3em] uppercase border border-[#c9a96e] text-[#1a1a1a] px-14 py-5 hover:bg-[#c9a96e] hover:text-[#f8f6f3] transition-colors duration-500"
                    >
                      Large
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- CARD tab --- */}
            {activeComponentTab === "Card" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product, i) => (
                  <div
                    key={product.name}
                    className="group bg-[#e8e0d6] relative overflow-hidden"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Marble texture overlay */}
                    <div className="relative h-52 bg-[#e8e0d6] overflow-hidden">
                      <MarbleVeinPattern opacity={0.08} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-serif text-4xl font-light text-[#8a7968] mb-2">M</div>
                          <div className="w-8 h-[1px] bg-[#c9a96e] mx-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-8 border-t border-[#c9a96e]">
                      <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] mb-3">
                        {product.year}
                      </p>
                      <h3 className="font-serif text-xl font-normal text-[#1a1a1a] mb-2 group-hover:text-[#c9a96e] transition-colors duration-500">
                        {product.name}
                      </h3>
                      <p className="font-serif text-xs tracking-[0.2em] uppercase text-[#8a7968] mb-4">
                        {product.origin}
                      </p>
                      <p className="font-serif text-sm font-light leading-relaxed text-[#8a7968]">
                        {product.desc}
                      </p>
                      <div className="mt-8 flex items-center gap-3">
                        <div className="w-6 h-[1px] bg-[#c9a96e]" />
                        <span className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#c9a96e] group-hover:tracking-[0.35em] transition-all duration-500">
                          Explore
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- INPUT tab --- */}
            {activeComponentTab === "Input" && (
              <div className="max-w-xl space-y-10">
                {/* Standard input */}
                <div>
                  <label className="block font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] mb-4">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-[#c9a96e] pb-3 font-serif text-sm font-light text-[#1a1a1a] placeholder-[#8a7968]/50 focus:outline-none focus:border-[#1a1a1a] transition-colors duration-500"
                  />
                </div>

                {/* Email input */}
                <div>
                  <label className="block font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] mb-4">
                    Correspondence
                  </label>
                  <input
                    type="email"
                    placeholder="your@address.com"
                    className="w-full bg-transparent border-b border-[#c9a96e] pb-3 font-serif text-sm font-light text-[#1a1a1a] placeholder-[#8a7968]/50 focus:outline-none focus:border-[#1a1a1a] transition-colors duration-500"
                  />
                </div>

                {/* Select */}
                <div>
                  <label className="block font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] mb-4">
                    Collection
                  </label>
                  <select className="w-full bg-transparent border-b border-[#c9a96e] pb-3 font-serif text-sm font-light text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors duration-500 appearance-none">
                    <option>Carrara White</option>
                    <option>Nero Marquina</option>
                    <option>Calacatta Gold</option>
                    <option>Statuario</option>
                  </select>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] mb-4">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your commission..."
                    className="w-full bg-transparent border border-[#c9a96e] p-4 font-serif text-sm font-light text-[#1a1a1a] placeholder-[#8a7968]/50 focus:outline-none focus:border-[#1a1a1a] transition-colors duration-500 resize-none"
                  />
                </div>

                <button
                  type="button"
                  className="w-full font-serif text-xs tracking-[0.3em] uppercase border border-[#c9a96e] text-[#1a1a1a] py-4 hover:bg-[#c9a96e] hover:text-[#f8f6f3] transition-colors duration-500"
                >
                  Submit Enquiry
                </button>
              </div>
            )}
          </RevealBlock>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 4. Color Palette                                               */}
      {/* ============================================================= */}
      <section id="palette" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">Palette</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight mb-6">
              Five Colours of Stone
            </h2>
            <GoldDivider className="w-24 mb-8" />
            <p className="font-serif text-base font-light leading-relaxed text-[#8a7968] max-w-xl">
              The palette was quarried, not invented. Each tone exists in nature — the black of obsidian,
              the warm white of Carrara, the gold of mineral deposit.
            </p>
          </RevealBlock>

          {/* Color swatches */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-[#c9a96e]">
            {palette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div
                  className="group relative overflow-hidden cursor-default"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Swatch body */}
                  <div className="relative h-48 md:h-64 flex items-end p-6 border-r border-[#c9a96e] last:border-r-0">
                    <MarbleVeinPattern opacity={color.light ? 0.05 : 0.03} />
                    <div className="relative z-10">
                      <p
                        className="font-serif text-[10px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: color.light ? "#8a7968" : "#c9a96e" }}
                      >
                        {color.hex}
                      </p>
                    </div>
                  </div>
                  {/* Label */}
                  <div
                    className="p-6 border-t border-r border-[#c9a96e] last:border-r-0"
                    style={{
                      backgroundColor: color.light ? "#f8f6f3" : "#1a1a1a",
                    }}
                  >
                    <p
                      className="font-serif text-sm font-normal mb-1"
                      style={{ color: color.light ? "#1a1a1a" : "#f8f6f3" }}
                    >
                      {color.name}
                    </p>
                    <p
                      className="font-serif text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: color.light ? "#8a7968" : "#8a7968" }}
                    >
                      {color.label}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 5. Typography                                                  */}
      {/* ============================================================= */}
      <section id="typography" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">Typography</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight mb-6">
              The Sermon of the Serif
            </h2>
            <GoldDivider className="w-24 mb-8" />
            <p className="font-serif text-base font-light leading-relaxed text-[#8a7968] max-w-xl">
              A single serif family in three weights: light, normal, and silence. Letter-spacing replaces hierarchy.
              Whitespace does the work that colour refuses.
            </p>
          </RevealBlock>

          {/* Typography rows */}
          <div className="space-y-0 border-t border-[#c9a96e]">
            {typographyRows.map((row, i) => (
              <RevealBlock key={row.label} delay={i * 0.06}>
                <div className="group py-10 border-b border-[#c9a96e] grid grid-cols-1 md:grid-cols-[120px_1fr_240px] gap-6 items-center hover:bg-[#e8e0d6]/30 transition-colors duration-500 px-4">
                  <div>
                    <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] group-hover:text-[#c9a96e] transition-colors duration-500">
                      {row.label}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className={row.className}>{row.sample}</p>
                  </div>
                  <div className="hidden md:block">
                    <code className="font-mono text-[10px] text-[#8a7968] leading-relaxed block">
                      {row.spec}
                    </code>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Letter-spacing demonstration */}
          <RevealBlock delay={0.1} className="mt-24">
            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] mb-12">
              Letter-Spacing Scale
            </p>
            <div className="space-y-8">
              {[
                { label: "tracking-tight", cls: "tracking-tight", text: "Permanence in stone and memory" },
                { label: "tracking-normal", cls: "tracking-normal", text: "Permanence in stone and memory" },
                { label: "tracking-wide", cls: "tracking-wide", text: "Permanence in stone and memory" },
                { label: "tracking-wider", cls: "tracking-wider", text: "Permanence in stone" },
                { label: "tracking-widest", cls: "tracking-widest", text: "Permanence in stone" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-8">
                  <code className="font-mono text-[10px] text-[#8a7968] w-36 shrink-0">{item.label}</code>
                  <p className={`font-serif text-xl font-light text-[#1a1a1a] ${item.cls}`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 6. Design Principles                                           */}
      {/* ============================================================= */}
      <section id="philosophy" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">
                Design Principles
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight mb-6">
              Laws of the Material
            </h2>
            <GoldDivider className="w-24 mb-8" />
            <p className="font-serif text-base font-light leading-relaxed text-[#8a7968] max-w-xl">
              Marble luxury is a philosophy of omission. Each rule below is a subtraction —
              a stone carver's discipline applied to the screen.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#c9a96e]">
            {/* Do panel */}
            <RevealBlock delay={0}>
              <div className="p-12 border-r border-[#c9a96e] h-full bg-[#f8f6f3] relative overflow-hidden">
                <MarbleVeinPattern opacity={0.03} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-6 h-[1px] bg-[#c9a96e]" />
                    <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
                      The Canon
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-10">Observe</h3>
                  <ul className="space-y-6">
                    {principles[0].rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-2 w-4 h-[1px] bg-[#c9a96e] shrink-0" />
                        <p className="font-serif text-sm font-light leading-relaxed text-[#8a7968]">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* Don't panel */}
            <RevealBlock delay={0.1}>
              <div className="p-12 h-full bg-[#1a1a1a] relative overflow-hidden">
                <MarbleVeinPattern opacity={0.04} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-6 h-[1px] bg-[#c9a96e]" />
                    <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
                      The Prohibition
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#f8f6f3] mb-10">Forbid</h3>
                  <ul className="space-y-6">
                    {principles[1].rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-2 w-4 h-[1px] bg-[#8a7968] shrink-0" />
                        <p className="font-serif text-sm font-light leading-relaxed text-[#8a7968]">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 7. Quote / Manifesto interlude                                 */}
      {/* ============================================================= */}
      <section className="py-32 px-8 md:px-16 relative overflow-hidden bg-[#1a1a1a]">
        <MarbleVeinPattern opacity={0.05} />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <RevealBlock>
            <div className="w-8 h-[1px] bg-[#c9a96e] mx-auto mb-16" />
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-[#f8f6f3] tracking-tight max-w-4xl mx-auto mb-16">
              "The marble not yet carved can hold the form of every thought the greatest artist has."
            </blockquote>
            <GoldDivider className="w-24 mx-auto mb-10" />
            <cite className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968] not-italic">
              Michelangelo Buonarroti — 1505
            </cite>
          </RevealBlock>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 8. Feature grid / Brand pillars                               */}
      {/* ============================================================= */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">Essence</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight mb-6">
              Three Pillars
            </h2>
            <GoldDivider className="w-24" />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#c9a96e]">
            {[
              {
                number: "I",
                title: "Permanence",
                body:
                  "Marble does not age as other materials age. It deepens. Each year of contact with air and light reveals new complexity within the stone's layers. Design should aspire to this quality.",
              },
              {
                number: "II",
                title: "Restraint",
                body:
                  "The Roman sculptor knew that every strike of the chisel was irrevocable. This knowledge produces a natural economy. Remove until nothing remains that is not essential.",
              },
              {
                number: "III",
                title: "Silence",
                body:
                  "Luxury announces itself in the space between elements. Whitespace is not empty — it is the held breath before the aria, the pause that makes the word meaningful.",
              },
            ].map((pillar, i) => (
              <RevealBlock key={pillar.number} delay={i * 0.08}>
                <div className="group p-12 border-r border-[#c9a96e] last:border-r-0 h-full relative overflow-hidden hover:bg-[#e8e0d6]/40 transition-colors duration-700">
                  <MarbleVeinPattern opacity={0.025} />
                  <div className="relative z-10">
                    <p className="font-serif text-6xl font-light text-[#e8e0d6] mb-8 group-hover:text-[#c9a96e]/30 transition-colors duration-500">
                      {pillar.number}
                    </p>
                    <div className="w-8 h-[1px] bg-[#c9a96e] mb-8" />
                    <h3 className="font-serif text-xl font-normal text-[#1a1a1a] mb-6 tracking-wide group-hover:text-[#c9a96e] transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="font-serif text-sm font-light leading-relaxed text-[#8a7968]">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 9. Token reference table                                       */}
      {/* ============================================================= */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">Tokens</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight mb-6">
              The Technical Canon
            </h2>
            <GoldDivider className="w-24 mb-8" />
            <p className="font-serif text-base font-light leading-relaxed text-[#8a7968] max-w-xl">
              Every decision codified. These tokens are the grammar of the marble-luxury language.
            </p>
          </RevealBlock>

          <RevealBlock>
            <div className="border border-[#c9a96e] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#c9a96e] bg-[#e8e0d6]">
                    <th className="px-8 py-5 text-left font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] font-normal">
                      Token
                    </th>
                    <th className="px-8 py-5 text-left font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] font-normal hidden md:table-cell">
                      Value
                    </th>
                    <th className="px-8 py-5 text-left font-serif text-[10px] tracking-[0.3em] uppercase text-[#8a7968] font-normal hidden lg:table-cell">
                      Usage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: "Background", value: "bg-[#f8f6f3]", usage: "All primary surfaces, hero, cards" },
                    { token: "Primary text", value: "text-[#1a1a1a]", usage: "Body copy, headings, nav" },
                    { token: "Gold accent", value: "border-[#c9a96e]", usage: "Dividers, borders, hover states" },
                    { token: "Secondary text", value: "text-[#8a7968]", usage: "Captions, labels, metadata" },
                    { token: "Card surface", value: "bg-[#e8e0d6]", usage: "Component backgrounds" },
                    { token: "Font family", value: "font-serif", usage: "All text — no exceptions" },
                    { token: "Font weight", value: "font-light / font-normal", usage: "Light for body, normal for heads" },
                    { token: "Section spacing", value: "py-32", usage: "Major section padding" },
                    { token: "Container padding", value: "px-8 md:px-16", usage: "All page sections" },
                    { token: "Divider", value: "h-[1px] bg-[#c9a96e]", usage: "All horizontal rules" },
                    { token: "Hover transition", value: "transition-colors duration-500", usage: "All interactive elements" },
                    { token: "Letter-spacing", value: "tracking-[0.3em] uppercase", usage: "All labels and overlines" },
                    { token: "Border radius", value: "rounded-none or rounded-sm", usage: "No pill shapes" },
                  ].map((row, i) => (
                    <tr
                      key={row.token}
                      className={`border-b border-[#c9a96e] last:border-b-0 hover:bg-[#e8e0d6]/30 transition-colors duration-500 ${
                        i % 2 === 0 ? "bg-[#f8f6f3]" : "bg-[#faf8f5]"
                      }`}
                    >
                      <td className="px-8 py-5 font-serif text-sm font-normal text-[#1a1a1a]">{row.token}</td>
                      <td className="px-8 py-5 hidden md:table-cell">
                        <code className="font-mono text-xs text-[#8a7968] bg-[#e8e0d6] px-3 py-1">
                          {row.value}
                        </code>
                      </td>
                      <td className="px-8 py-5 font-serif text-sm font-light text-[#8a7968] hidden lg:table-cell">
                        {row.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Full-width gold divider */}
      <GoldDivider />

      {/* ============================================================= */}
      {/* 10. Footer                                                     */}
      {/* ============================================================= */}
      <footer className="bg-[#f8f6f3] relative overflow-hidden">
        <MarbleVeinPattern opacity={0.035} />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#c9a96e]" />
                <span className="font-serif text-xs tracking-[0.35em] uppercase text-[#8a7968]">
                  StyleKit
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-4">Marble Luxury</h3>
              <p className="font-serif text-sm font-light leading-relaxed text-[#8a7968]">
                A design system built on the philosophy of ancient Rome's most enduring material.
                Silence, permanence, and absolute restraint.
              </p>
            </div>

            {/* Navigation column */}
            <div>
              <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#8a7968] mb-8">Navigation</p>
              <ul className="space-y-5">
                {[
                  { label: "Collection", href: "#collection" },
                  { label: "Philosophy", href: "#philosophy" },
                  { label: "Typography", href: "#typography" },
                  { label: "Palette", href: "#palette" },
                  { label: "All Styles", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-serif text-sm font-light text-[#8a7968] hover:text-[#c9a96e] transition-colors duration-500 flex items-center gap-3"
                    >
                      <span className="w-4 h-[1px] bg-[#c9a96e]" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Philosophy column */}
            <div>
              <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#8a7968] mb-8">
                The Three Laws
              </p>
              <ul className="space-y-5">
                {["Permanence over trend", "Restraint over ornament", "Silence over noise"].map((law) => (
                  <li key={law} className="flex items-start gap-4">
                    <div className="mt-2 w-4 h-[1px] bg-[#c9a96e] shrink-0" />
                    <p className="font-serif text-sm font-light text-[#8a7968]">{law}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom rule */}
          <GoldDivider className="mb-10" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="font-serif text-xs font-light tracking-[0.15em] text-[#8a7968]">
              StyleKit &mdash; Marble Luxury &mdash; 大理石奢华
            </p>
            <Link
              href="/"
              className="font-serif text-xs tracking-[0.25em] uppercase text-[#8a7968] hover:text-[#c9a96e] transition-colors duration-500 flex items-center gap-3"
            >
              <span className="text-[#c9a96e]">&#8592;</span>
              Return to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
