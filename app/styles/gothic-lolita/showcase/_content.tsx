"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* --- Inline SVG Decorations --- */

function CrossOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect x="10" y="2" width="4" height="20" fill="currentColor" />
      <rect x="2" y="10" width="20" height="4" fill="currentColor" />
      <rect x="9" y="1" width="6" height="2" fill="currentColor" />
      <rect x="9" y="21" width="6" height="2" fill="currentColor" />
      <rect x="1" y="9" width="2" height="6" fill="currentColor" />
      <rect x="21" y="9" width="2" height="6" fill="currentColor" />
    </svg>
  );
}

function RoseOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={className}
    >
      <circle cx="40" cy="40" r="12" stroke="currentColor" strokeWidth="1" />
      <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.3" />
      <path
        d="M40 10 C45 20, 55 25, 40 40 C25 25, 35 20, 40 10Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M70 40 C60 45, 55 55, 40 40 C55 25, 60 35, 70 40Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M40 70 C35 60, 25 55, 40 40 C55 55, 45 60, 40 70Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M10 40 C20 35, 25 25, 40 40 C25 55, 20 45, 10 40Z"
        fill="currentColor"
        opacity="0.25"
      />
      <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function LaceDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4a1a4a]/40 to-transparent" />
      <CrossOrnament className="text-[#8b1a2a]/50 w-4 h-4" />
      <div className="w-2 h-2 rotate-45 border border-[#4a1a4a]/40" />
      <CrossOrnament className="text-[#8b1a2a]/50 w-4 h-4" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4a1a4a]/40 to-transparent" />
    </div>
  );
}

function CornerBrackets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#e5e5e5]/20" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-[#e5e5e5]/20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-[#e5e5e5]/20" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[#e5e5e5]/20" />
      {children}
    </div>
  );
}

/* --- Color data --- */

const colorPalette = [
  { name: "Midnight Black", hex: "#0a0a0a", role: "Background", textColor: "#e5e5e5" },
  { name: "Dark Plum", hex: "#4a1a4a", role: "Primary / Borders", textColor: "#e5e5e5" },
  { name: "Blood Rose", hex: "#8b1a2a", role: "Secondary / Accents", textColor: "#e5e5e5" },
  { name: "Antique Silver", hex: "#e5e5e5", role: "Text / Light Elements", textColor: "#0a0a0a" },
  { name: "Deep Velvet", hex: "#1a0a1a", role: "Card Gradients", textColor: "#e5e5e5" },
  { name: "Plum Mist", hex: "#6b2d5b", role: "Accent Variant", textColor: "#e5e5e5" },
];

/* --- Do / Don't rules --- */

const doRules = [
  "Use black and deep dark backgrounds as primary canvas",
  "Pair deep plum #4a1a4a with blood rose #8b1a2a accents",
  "Use decorative serif typefaces throughout",
  "Add lace, ribbon, and ornate border decorations",
  "Employ gothic symmetric patterns and cross motifs",
  "Maintain a refined, elegant atmosphere overall",
];

const dontRules = [
  "Never use bright, vivid, or saturated colors",
  "Avoid cute cartoon-style elements",
  "Do not apply modern minimalist aesthetics",
  "Avoid overly rounded shapes and pill buttons",
];

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-serif">
      <style>{`
        @keyframes gl-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gl-lace-float {
          0%, 100% { opacity: 0.15; transform: translateY(0); }
          50% { opacity: 0.25; transform: translateY(-8px); }
        }
        .gl-hover-underline {
          position: relative;
        }
        .gl-hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #4a1a4a, #8b1a2a);
          transform-origin: bottom right;
          transition: transform 0.6s ease-in-out;
        }
        .gl-hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#4a1a4a]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles/gothic-lolita/showcase"
              className="flex items-center gap-3 text-[#e5e5e5] tracking-[0.3em] uppercase text-sm"
            >
              <CrossOrnament className="text-[#8b1a2a] w-4 h-4" />
              Gothic Lolita
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link
                href="/styles/gothic-lolita"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 gl-hover-underline pb-1"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 gl-hover-underline pb-1"
              >
                StyleKit
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero Section ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a]" />

        {/* Double border frame */}
        <div className="absolute inset-4 md:inset-8 border border-[#4a1a4a]/25 pointer-events-none" />
        <div className="absolute inset-8 md:inset-16 border border-[#8b1a2a]/15 pointer-events-none" />

        {/* Rotating rose SVG */}
        <div
          className="absolute top-20 right-8 md:right-20 pointer-events-none text-[#8b1a2a]/30"
          style={{ animation: "gl-rotate 30s linear infinite" }}
        >
          <RoseOrnament className="w-20 h-20 md:w-28 md:h-28" />
        </div>

        {/* Corner crosses */}
        <CrossOrnament className="absolute top-12 left-12 text-[#4a1a4a]/30 w-5 h-5 hidden md:block" />
        <CrossOrnament className="absolute bottom-12 right-12 text-[#4a1a4a]/30 w-5 h-5 hidden md:block" />

        {/* Lace float decorations */}
        <div
          className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-[#4a1a4a]/30 to-transparent hidden md:block"
          style={{ animation: "gl-lace-float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 right-10 w-px h-24 bg-gradient-to-b from-transparent via-[#8b1a2a]/25 to-transparent hidden md:block"
          style={{ animation: "gl-lace-float 8s ease-in-out infinite 2s" }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Silver ornament line */}
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, #8b1a2a, transparent)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.2s",
            }}
          />

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-wider mb-6">
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                display: "inline-block",
              }}
            >
              Dark
            </span>
            <br />
            <span
              className="italic text-[#e5e5e5]/50"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
                display: "inline-block",
              }}
            >
              Elegance.
            </span>
          </h1>

          <p
            className="text-sm md:text-base tracking-[0.15em] text-[#e5e5e5]/40 max-w-md mx-auto mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            Victorian lace, velvet shadows, and the quiet beauty of ornamental darkness woven into digital interfaces.
          </p>

          {/* Silver ornament line */}
          <div
            className="w-16 h-px mx-auto"
            style={{
              background: "linear-gradient(90deg, transparent, #8b1a2a, transparent)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.6s",
            }}
          />

          {/* Decorative cross below */}
          <div
            className="mt-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.8s",
            }}
          >
            <CrossOrnament className="text-[#8b1a2a]/40 w-6 h-6 mx-auto" />
          </div>
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-4">
            Component <span className="italic text-[#e5e5e5]/50">Gallery</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-[0.15em] mb-12">
            Interactive elements dressed in dark Victorian splendor
          </p>
        </RevealBlock>

        {/* Tab Switcher */}
        <RevealBlock delay={0.1} className="mb-12">
          <div className="flex justify-center gap-0 border border-[#4a1a4a]/40">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 px-6 py-4 text-xs tracking-[0.25em] uppercase
                  transition-all duration-500 ease-in-out
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-b from-[#4a1a4a]/40 to-[#1a0a1a] text-[#e5e5e5] border-b-2 border-[#8b1a2a]"
                      : "bg-[#0a0a0a] text-[#e5e5e5]/40 hover:text-[#e5e5e5]/70 hover:bg-[#1a0a1a]/50"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Demo panels */}
        <RevealBlock delay={0.2}>
          <CornerBrackets className="p-8 md:p-12 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#4a1a4a]/30 min-h-[280px]">
            {/* Button demo */}
            {activeTab === "button" && (
              <div className="flex flex-col items-center gap-8">
                <p className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/30 mb-4">
                  Velvet Depth Interaction -- hover to reveal shadow bloom
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {/* Primary button */}
                  <button
                    className="
                      px-8 py-4 bg-[#0a0a0a]
                      border border-[#4a1a4a] text-[#e5e5e5] tracking-[0.2em]
                      shadow-[inset_0_0_10px_rgba(74,26,74,0.3)]
                      hover:bg-[#1a0a1a] hover:border-[#8b1a2a] hover:text-white
                      hover:shadow-[0_8px_24px_rgba(139,26,42,0.35),inset_0_0_12px_rgba(139,26,42,0.2)]
                      active:scale-[0.98] active:shadow-[inset_0_0_24px_rgba(0,0,0,0.8)]
                      transition-all duration-500 ease-in-out
                    "
                  >
                    Unlock Secret
                  </button>
                  {/* Secondary button */}
                  <button
                    className="
                      px-8 py-4
                      bg-gradient-to-b from-[#4a1a4a]/30 to-[#0a0a0a]
                      border border-[#8b1a2a]/50 text-[#e5e5e5]/80 tracking-[0.2em]
                      hover:border-[#8b1a2a] hover:text-[#e5e5e5]
                      hover:shadow-[0_6px_20px_rgba(74,26,74,0.4)]
                      active:scale-[0.98]
                      transition-all duration-500 ease-in-out
                    "
                  >
                    Dark Whisper
                  </button>
                  {/* Ghost button */}
                  <button
                    className="
                      px-8 py-4
                      bg-transparent
                      border border-[#e5e5e5]/20 text-[#e5e5e5]/50 tracking-[0.2em]
                      hover:border-[#4a1a4a] hover:text-[#e5e5e5]/80
                      hover:shadow-[0_0_16px_rgba(74,26,74,0.2)]
                      active:scale-[0.98]
                      transition-all duration-[600ms] ease-in-out
                    "
                  >
                    Shadow Veil
                  </button>
                </div>
              </div>
            )}

            {/* Card demo */}
            {activeTab === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Midnight Rose",
                    desc: "A whisper of lace and shadow, wrapped in velvet moonlight.",
                    tag: "I",
                  },
                  {
                    title: "Crimson Veil",
                    desc: "Blood-red ribbons cascade through Victorian corridors of dark elegance.",
                    tag: "II",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="
                      group relative p-8
                      bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a]
                      border border-[#4a1a4a]/50
                      shadow-[0_4px_16px_rgba(74,26,74,0.35)]
                      hover:border-[#8b1a2a]/70
                      hover:shadow-[0_10px_30px_rgba(139,26,42,0.25)]
                      transition-all duration-700 ease-in-out
                      overflow-hidden cursor-pointer
                    "
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
                    <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
                    <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />

                    {/* Cross ornament */}
                    <div className="mb-4 flex justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <CrossOrnament className="text-[#8b1a2a] w-4 h-4" />
                    </div>

                    <span className="block text-xs tracking-[0.3em] text-[#4a1a4a] mb-2 text-center uppercase">
                      Chapter {card.tag}
                    </span>
                    <h3
                      className="text-xl text-center tracking-widest mb-3 transition-all duration-500"
                      style={{
                        textShadow:
                          hoveredCard === i
                            ? "0 0 8px rgba(229,229,229,0.25)"
                            : "none",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[#e5e5e5]/50 text-center text-sm group-hover:text-[#e5e5e5]/75 transition-colors duration-500">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Input demo */}
            {activeTab === "input" && (
              <div className="max-w-md mx-auto space-y-8">
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-[#4a1a4a] mb-3">
                    Dark Inscription
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your secret..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#4a1a4a]/50
                      text-[#e5e5e5] placeholder-[#4a1a4a]/60
                      font-serif
                      focus:border-[#8b1a2a]
                      focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]
                      focus:outline-none
                      transition-all duration-500 ease-in-out
                    "
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-[#4a1a4a] mb-3">
                    Velvet Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write upon the parchment..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#4a1a4a]/50
                      text-[#e5e5e5] placeholder-[#4a1a4a]/60
                      font-serif
                      focus:border-[#8b1a2a]
                      focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]
                      focus:outline-none
                      transition-all duration-500 ease-in-out
                      resize-none
                    "
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 border border-[#4a1a4a]/50 flex items-center justify-center cursor-pointer hover:border-[#8b1a2a] transition-colors duration-500">
                    <div className="w-2.5 h-2.5 bg-[#8b1a2a]" />
                  </div>
                  <span className="text-sm text-[#e5e5e5]/50 tracking-wider">
                    Seal this covenant in shadow
                  </span>
                </div>
              </div>
            )}
          </CornerBrackets>
        </RevealBlock>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-4">
            Colour <span className="italic text-[#e5e5e5]/50">Palette</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-[0.15em] mb-16">
            Shades drawn from moonlit cathedrals and velvet curtains
          </p>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={0.1 + i * 0.05}>
                <div className="group cursor-pointer">
                  <div
                    className="
                      w-full aspect-[4/3] mb-4 border border-[#4a1a4a]/30
                      group-hover:border-[#8b1a2a]/60
                      group-hover:shadow-[0_8px_24px_rgba(139,26,42,0.2)]
                      transition-all duration-500 ease-in-out
                      flex items-end p-4
                    "
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <h4 className="text-sm tracking-wider mb-1">{color.name}</h4>
                  <p className="text-xs text-[#e5e5e5]/40 tracking-wider">{color.role}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ===== 5. Design Rules (Do / Don't) ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-4">
            Design <span className="italic text-[#e5e5e5]/50">Doctrine</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-[0.15em] mb-16">
            The sacred commandments of dark Victorian craft
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Do list */}
          <RevealBlock delay={0.1}>
            <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#4a1a4a]/30">
              <div className="flex items-center gap-3 mb-8">
                <CrossOrnament className="text-[#4a1a4a] w-4 h-4" />
                <h3 className="text-lg tracking-[0.25em] uppercase text-[#4a1a4a]">
                  Embrace
                </h3>
              </div>
              <ul className="space-y-5">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 rotate-45 bg-[#4a1a4a] shrink-0" />
                    <span className="text-sm text-[#e5e5e5]/70 leading-relaxed tracking-wider">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </CornerBrackets>
          </RevealBlock>

          {/* Don't list */}
          <RevealBlock delay={0.2}>
            <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#8b1a2a]/30">
              <div className="flex items-center gap-3 mb-8">
                <CrossOrnament className="text-[#8b1a2a] w-4 h-4" />
                <h3 className="text-lg tracking-[0.25em] uppercase text-[#8b1a2a]">
                  Forbid
                </h3>
              </div>
              <ul className="space-y-5">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 rotate-45 bg-[#8b1a2a] shrink-0" />
                    <span className="text-sm text-[#e5e5e5]/70 leading-relaxed tracking-wider">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </CornerBrackets>
          </RevealBlock>
        </div>

        {/* Interaction rules panel */}
        <RevealBlock delay={0.3} className="mt-12">
          <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#4a1a4a]/20">
            <div className="flex items-center gap-3 mb-8">
              <CrossOrnament className="text-[#6b2d5b] w-4 h-4" />
              <h3 className="text-lg tracking-[0.25em] uppercase text-[#6b2d5b]">
                Interaction Rites
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Velvet Depth",
                  desc: "Hover shadows bloom slowly in deep plum and blood rose, evoking silk-like richness. No bouncy or playful motion.",
                },
                {
                  name: "Lace Elegance",
                  desc: "Transitions run 500-700ms with ease-in-out, preserving the delicate restraint of ornamental craft.",
                },
                {
                  name: "Corset Press",
                  desc: "Active states use subtle scale(0.98) with inner shadow, mimicking the constrained feedback of a corset clasp.",
                },
                {
                  name: "Silver Whisper",
                  desc: "Borders and text reveal faint silver luminance on hover, adding layers of dark opulence.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rotate-45 border border-[#6b2d5b] shrink-0" />
                  <div>
                    <span className="text-sm text-[#e5e5e5]/80 tracking-wider font-bold">
                      {item.name}:
                    </span>{" "}
                    <span className="text-sm text-[#e5e5e5]/50 tracking-wider leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CornerBrackets>
        </RevealBlock>
      </section>

      {/* ===== 6. Footer ===== */}
      <footer className="border-t border-[#4a1a4a]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <LaceDivider />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-3">
              <CrossOrnament className="text-[#8b1a2a]/50 w-3 h-3" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/30">
                StyleKit &middot; Gothic Lolita Showcase
              </p>
            </div>
            <Link
              href="/styles/gothic-lolita"
              className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/40 gl-hover-underline pb-1 hover:text-[#e5e5e5]/70 transition-colors duration-500"
            >
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
