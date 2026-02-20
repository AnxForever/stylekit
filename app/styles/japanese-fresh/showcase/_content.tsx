"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline useInView hook
// ---------------------------------------------------------------------------
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ---------------------------------------------------------------------------
// Inline RevealBlock component
// ---------------------------------------------------------------------------
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Botanical SVG accents — reusable inline components
// ---------------------------------------------------------------------------
function BotanicalBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 200"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.8"
      className={`pointer-events-none opacity-[0.12] ${className}`}
    >
      <path d="M50 198 C50 165, 53 130, 56 95 C58 70, 54 45, 57 18" />
      <path d="M56 95 C68 88, 78 78, 83 68 C74 78, 64 87, 56 95" />
      <path d="M55 62 C43 54, 33 42, 27 32 C35 43, 45 54, 55 62" />
      <path d="M57 125 C69 118, 78 109, 84 99 C76 110, 67 119, 57 125" />
      <path d="M54 148 C42 142, 33 132, 27 122 C33 133, 42 143, 54 148" />
    </svg>
  );
}

function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 130"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.7"
      className={`pointer-events-none opacity-[0.12] ${className}`}
    >
      <path d="M40 128 C40 100, 42 72, 44 44 C45 30, 43 14, 44 2" />
      <path d="M44 55 C55 50, 63 42, 67 34 C61 42, 53 50, 44 55" />
      <path d="M43 82 C32 77, 24 68, 20 59 C26 68, 33 77, 43 82" />
      <path d="M44 30 C52 25, 58 18, 62 10 C57 18, 51 25, 44 30" />
    </svg>
  );
}

function BotanicalLeaf({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.7"
      className={`pointer-events-none opacity-[0.10] ${className}`}
    >
      <path d="M30 78 C30 55, 20 35, 10 18 C20 10, 38 8, 50 18 C60 28, 55 50, 30 78 Z" />
      <path d="M30 78 C30 55, 30 35, 30 18" />
      <path d="M20 45 C25 40, 30 38, 35 40" />
      <path d="M16 32 C22 28, 28 27, 33 28" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tab types
// ---------------------------------------------------------------------------
type DemoTab = "button" | "card" | "input";

// ---------------------------------------------------------------------------
// Main showcase component
// ---------------------------------------------------------------------------
export default function JapaneseFreshShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<DemoTab>("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs: { id: DemoTab; label: string; labelJa: string }[] = [
    { id: "button", label: "Button", labelJa: "ボタン" },
    { id: "card", label: "Card", labelJa: "カード" },
    { id: "input", label: "Input", labelJa: "入力" },
  ];

  const palette = [
    { name: "Sky", nameJa: "空", hex: "#64b5f6", bg: "#64b5f6" },
    { name: "Rice", nameJa: "米", hex: "#fafaf8", bg: "#fafaf8", border: true },
    { name: "Mint", nameJa: "薄荷", hex: "#98d8c8", bg: "#98d8c8" },
    { name: "Petal", nameJa: "花びら", hex: "#ffb7c5", bg: "#ffb7c5" },
    { name: "Powder", nameJa: "粉末", hex: "#b8d4e3", bg: "#b8d4e3" },
    { name: "Stone", nameJa: "石", hex: "#4a5568", bg: "#4a5568" },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#4a5568]">
      <style>{`
        .jf-underline {
          position: relative;
          display: inline-block;
        }
        .jf-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #64b5f6;
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .jf-underline:hover::after {
          transform: scaleX(1);
          transform-origin: left center;
        }
        @keyframes jf-breathe {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.18; }
        }
        .jf-breathe {
          animation: jf-breathe 6s ease-in-out infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. Fixed Navigation                                               */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/90 backdrop-blur-sm border-b border-[#d4d4cf]/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/styles"
              className="font-light text-sm text-[#b0b8c4] tracking-widest jf-underline"
            >
              StyleKit →
            </Link>

            <span className="font-extralight text-base text-[#4a5568] tracking-widest">
              日系清新風
            </span>

            <Link
              href="/styles/japanese-fresh"
              className="font-light text-xs text-[#b0b8c4] tracking-widest jf-underline"
            >
              docs
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero — full-screen, Ma-based whitespace                        */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-16 overflow-hidden">
        {/* Botanical SVG — absolute left/bottom */}
        <div className="absolute left-6 md:left-16 bottom-16 w-20 h-44 jf-breathe">
          <BotanicalBranch className="w-full h-full" />
        </div>

        {/* Botanical SVG — absolute right/top */}
        <div
          className="absolute right-8 md:right-20 top-32 w-14 h-28 jf-breathe"
          style={{ animationDelay: "3s" }}
        >
          <BotanicalSprig className="w-full h-full" />
        </div>

        {/* Hero content */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Japanese subtitle — appears first */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0s",
            }}
          >
            <p className="font-light text-xs text-[#b0b8c4] tracking-[0.4em] mb-8">
              間 · ma · the beauty of empty space
            </p>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <h1 className="font-extralight text-5xl md:text-7xl text-[#4a5568] tracking-wide leading-tight mb-4">
              Japanese Fresh
            </h1>
          </div>

          {/* English subtitle */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <p className="font-light text-base text-[#b0b8c4] tracking-widest mb-16 leading-loose">
              wabi-sabi · hairline borders · meditative slowness
            </p>
          </div>

          {/* Hero buttons */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                className="px-10 py-3 bg-transparent font-light tracking-widest text-sm text-[#b0b8c4] rounded-lg border border-[#d4d4cf]/40 hover:-translate-y-0.5 hover:bg-[#64b5f6]/5 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500"
              >
                explore gently
              </button>
              <button
                type="button"
                className="px-10 py-3 bg-[#64b5f6]/90 font-light tracking-widest text-sm text-white rounded-lg border border-[#64b5f6]/30 hover:-translate-y-0.5 hover:bg-[#64b5f6] transition-all duration-500"
              >
                begin
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            opacity: heroRevealed ? 0.4 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1s",
          }}
        >
          <span className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4]">
            scroll
          </span>
          <div className="w-px h-10 bg-[#d4d4cf]/50" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. Component Demo — Tab switcher                                  */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              コンポーネント
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-16">
              component demo
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex items-end gap-0 border-b border-[#d4d4cf]/30 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-6 py-3 font-light text-sm tracking-widest transition-all duration-500"
                  style={{
                    color:
                      activeTab === tab.id ? "#4a5568" : "#b0b8c4",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    className="ml-2 font-light text-[10px] tracking-wider"
                    style={{ color: activeTab === tab.id ? "#b0b8c4" : "#d4d4cf" }}
                  >
                    {tab.labelJa}
                  </span>
                  {/* Active indicator */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#64b5f6] transition-all duration-500"
                    style={{ opacity: activeTab === tab.id ? 1 : 0 }}
                  />
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <RevealBlock delay={0.2}>
            {/* Button tab */}
            {activeTab === "button" && (
              <div className="p-10 md:p-12 bg-white rounded-lg border border-[#d4d4cf]/30 transition-all duration-500">
                <p className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4] mb-8">
                  whisper variants
                </p>
                <div className="flex flex-wrap gap-5">
                  <button
                    type="button"
                    className="px-10 py-3 bg-transparent font-light tracking-widest text-sm text-[#b0b8c4] rounded-lg border border-[#d4d4cf]/40 hover:-translate-y-0.5 hover:bg-[#64b5f6]/5 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500"
                  >
                    whisper
                  </button>
                  <button
                    type="button"
                    className="px-10 py-3 bg-[#64b5f6]/90 font-light tracking-widest text-sm text-white rounded-lg border border-[#64b5f6]/30 hover:-translate-y-0.5 hover:bg-[#64b5f6] transition-all duration-500"
                  >
                    sky blue
                  </button>
                  <button
                    type="button"
                    className="px-10 py-3 bg-transparent font-light tracking-widest text-sm text-[#98d8c8] rounded-lg border border-[#98d8c8]/40 hover:-translate-y-0.5 hover:bg-[#98d8c8]/5 hover:border-[#98d8c8]/60 transition-all duration-500"
                  >
                    mint
                  </button>
                  <button
                    type="button"
                    className="px-10 py-3 bg-transparent font-light tracking-widest text-sm text-[#ffb7c5] rounded-lg border border-[#ffb7c5]/40 hover:-translate-y-0.5 hover:bg-[#ffb7c5]/5 hover:border-[#ffb7c5]/60 transition-all duration-500"
                  >
                    petal
                  </button>
                </div>
                <div className="mt-10 pt-10 border-t border-[#d4d4cf]/20">
                  <p className="font-light text-xs text-[#b0b8c4] tracking-widest">
                    pattern — px-10 py-3, font-light tracking-widest, border border-[#d4d4cf]/40, duration-500
                  </p>
                </div>
              </div>
            )}

            {/* Card tab */}
            {activeTab === "card" && (
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "空気 — air",
                    desc: "Design that breathes. Every element exists with intention, surrounded by generous space that gives it meaning and rest.",
                    accent: "#64b5f6",
                    borderColor: "#d4d4cf",
                  },
                  {
                    title: "静寂 — silence",
                    desc: "The absence of noise is itself a sound. Whitespace speaks where words cannot reach.",
                    accent: "#98d8c8",
                    borderColor: "#98d8c8",
                  },
                  {
                    title: "儚さ — transience",
                    desc: "Like cherry blossoms, beauty is heightened by its fragility. Impermanence makes each moment precious.",
                    accent: "#ffb7c5",
                    borderColor: "#ffb7c5",
                  },
                  {
                    title: "間 — interval",
                    desc: "The pause between notes is the music. Ma teaches us that space is not empty — it holds everything.",
                    accent: "#b8d4e3",
                    borderColor: "#b8d4e3",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group p-10 md:p-12 bg-white rounded-lg border border-[#d4d4cf]/30 hover:-translate-y-0.5 hover:bg-[#64b5f6]/[0.02] hover:border-[#d4d4cf]/50 transition-all duration-500 cursor-pointer"
                    style={
                      i % 2 !== 0
                        ? { marginTop: "1.5rem" }
                        : {}
                    }
                  >
                    <h3
                      className="font-extralight text-lg tracking-wide mb-4 transition-all duration-500"
                      style={{ color: "#4a5568" }}
                    >
                      <span className="group-hover:text-[#64b5f6] transition-colors duration-500">
                        {card.title}
                      </span>
                    </h3>
                    <p className="font-light text-sm text-[#b0b8c4] leading-relaxed">
                      {card.desc}
                    </p>
                    <div
                      className="mt-6 h-px transition-all duration-500"
                      style={{
                        backgroundColor: card.borderColor,
                        opacity: 0.2,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Input tab */}
            {activeTab === "input" && (
              <div className="p-10 md:p-12 bg-white rounded-lg border border-[#d4d4cf]/30">
                <p className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4] mb-10">
                  bottom-line inputs · floating labels
                </p>
                <div className="max-w-sm space-y-10">
                  <div className="relative pt-5">
                    <input
                      type="text"
                      id="demo-name"
                      placeholder=" "
                      className="w-full pb-3 pt-0 bg-transparent border-0 border-b border-[#d4d4cf]/60 text-[#4a5568] font-light focus:border-[#64b5f6] focus:outline-none transition-all duration-500 peer"
                    />
                    <label
                      htmlFor="demo-name"
                      className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-widest peer-focus:text-[#64b5f6] peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all duration-500"
                    >
                      your name
                    </label>
                  </div>

                  <div className="relative pt-5">
                    <input
                      type="email"
                      id="demo-email"
                      placeholder=" "
                      className="w-full pb-3 pt-0 bg-transparent border-0 border-b border-[#d4d4cf]/60 text-[#4a5568] font-light focus:border-[#98d8c8] focus:outline-none transition-all duration-500 peer"
                    />
                    <label
                      htmlFor="demo-email"
                      className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-widest peer-focus:text-[#98d8c8] peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all duration-500"
                    >
                      your email
                    </label>
                  </div>

                  <div className="relative pt-5">
                    <textarea
                      id="demo-note"
                      placeholder=" "
                      rows={3}
                      className="w-full pb-3 pt-0 bg-transparent border-0 border-b border-[#d4d4cf]/60 text-[#4a5568] font-light focus:border-[#ffb7c5] focus:outline-none transition-all duration-500 peer resize-none"
                    />
                    <label
                      htmlFor="demo-note"
                      className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-widest peer-focus:text-[#ffb7c5] peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all duration-500"
                    >
                      a quiet thought
                    </label>
                  </div>

                  <button
                    type="button"
                    className="px-10 py-3 bg-transparent font-light tracking-widest text-sm text-[#b0b8c4] rounded-lg border border-[#d4d4cf]/40 hover:-translate-y-0.5 hover:bg-[#64b5f6]/5 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500"
                  >
                    send gently
                  </button>
                </div>
              </div>
            )}
          </RevealBlock>
        </div>
      </section>

      {/* Hairline divider with botanical */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 flex items-center gap-8">
        <div className="flex-1 h-px bg-[#d4d4cf]/25" />
        <BotanicalLeaf className="w-8 h-10 flex-shrink-0" />
        <div className="flex-1 h-px bg-[#d4d4cf]/25" />
      </div>

      {/* ================================================================ */}
      {/* 4. Color Palette                                                  */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Asymmetric botanical accent — right */}
        <div className="absolute right-4 md:right-12 top-20 w-16 h-36 jf-breathe">
          <BotanicalSprig className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              カラーパレット
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-6">
              color palette
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide mb-16 max-w-xs">
              tones drawn from dawn light, rice paper, and spring botanicals
            </p>
          </RevealBlock>

          {/* Asymmetric palette grid — wabi-sabi offset layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            {palette.map((color, i) => (
              <RevealBlock
                key={color.hex}
                delay={i * 0.07}
                className={i === 1 || i === 4 ? "md:mt-8" : ""}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex-shrink-0 transition-all duration-500 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: color.bg,
                      border: color.border
                        ? "1px solid #d4d4cf"
                        : "none",
                    }}
                  />
                  <div className="pt-1">
                    <p className="font-light text-sm text-[#4a5568] tracking-wide">
                      {color.name}
                    </p>
                    <p className="font-light text-xs text-[#b0b8c4] tracking-widest mt-0.5">
                      {color.nameJa}
                    </p>
                    <p className="font-light text-[10px] text-[#b0b8c4] tracking-wider mt-1 font-mono">
                      {color.hex}
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-px bg-[#d4d4cf]/20" />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#d4d4cf]/20" />
      </div>

      {/* ================================================================ */}
      {/* 5. Design Rules — Ma (do) vs 禁 (don't)                          */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Botanical accent — left */}
        <div className="absolute left-4 md:left-10 bottom-20 w-18 h-40 jf-breathe" style={{ animationDelay: "2s" }}>
          <BotanicalBranch className="w-16 h-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              デザイン哲学
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-16">
              design philosophy
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Ma — do column */}
            <RevealBlock delay={0.1}>
              <div className="border border-[#64b5f6]/20 rounded-lg p-10 md:p-12">
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="font-extralight text-3xl text-[#64b5f6] tracking-wide">間</span>
                  <span className="font-light text-xs text-[#b0b8c4] tracking-[0.4em]">ma · embrace</span>
                </div>
                <ul className="space-y-5">
                  {[
                    "extreme whitespace — py-32 or more",
                    "hairline borders only — border/30",
                    "font-extralight or font-light",
                    "botanical svg accents, inline",
                    "slow transitions — duration-500",
                    "asymmetric, wabi-sabi placement",
                    "bottom-line inputs with floating labels",
                    "rounded corners — rounded-lg minimum",
                    "meditative scroll animations",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-px h-3 bg-[#64b5f6]/40 flex-shrink-0" />
                      <span className="font-light text-sm text-[#4a5568]/80 tracking-wide leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* 禁 — don't column */}
            <RevealBlock delay={0.2} className="md:mt-12">
              <div className="border border-[#d4d4cf]/30 rounded-lg p-10 md:p-12">
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="font-extralight text-3xl text-[#b0b8c4] tracking-wide">禁</span>
                  <span className="font-light text-xs text-[#b0b8c4] tracking-[0.4em]">kin · avoid</span>
                </div>
                <ul className="space-y-5">
                  {[
                    "font-bold or font-semibold — ever",
                    "uppercase text — breaks the calm",
                    "border-2 or thicker — too heavy",
                    "visible shadows — breaks flatness",
                    "dark backgrounds — light only",
                    "rounded-none or sharp corners",
                    "transitions under 200ms — too fast",
                    "saturated or high-contrast colors",
                    "dense information — breathe more",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-px bg-[#d4d4cf]/50 flex-shrink-0" />
                      <span className="font-light text-sm text-[#b0b8c4] tracking-wide leading-relaxed line-through decoration-[#d4d4cf]/50">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#d4d4cf]/20" />
      </div>

      {/* ================================================================ */}
      {/* 6. Wabi-sabi Feature Cards                                        */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Asymmetric botanical accent — far right */}
        <div className="absolute right-0 top-32 w-12 h-28 jf-breathe" style={{ animationDelay: "4s" }}>
          <BotanicalLeaf className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              特徴
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              core attributes
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide mb-16 max-w-sm leading-loose">
              three principles that give japanese-fresh its meditative character
            </p>
          </RevealBlock>

          {/* Asymmetric feature cards */}
          <div className="grid md:grid-cols-12 gap-6">
            <RevealBlock delay={0.05} className="md:col-span-7">
              <div className="group p-10 md:p-12 bg-white rounded-lg border border-[#d4d4cf]/30 hover:-translate-y-0.5 hover:bg-[#64b5f6]/[0.02] hover:border-[#d4d4cf]/50 transition-all duration-500 h-full">
                <div className="w-10 h-10 rounded-lg border border-[#64b5f6]/20 flex items-center justify-center mb-8">
                  <span className="font-extralight text-xs text-[#64b5f6] tracking-widest">間</span>
                </div>
                <h3 className="font-extralight text-xl text-[#4a5568] tracking-wide mb-4 group-hover:text-[#64b5f6] transition-colors duration-500">
                  ma — negative space
                </h3>
                <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                  In Japanese aesthetics, Ma (間) refers to the intentional pause — the emptiness between things that gives them definition and breath. Whitespace is not waste; it is the primary design material.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.12} className="md:col-span-5 md:mt-8">
              <div className="group p-10 bg-white rounded-lg border border-[#98d8c8]/25 hover:-translate-y-0.5 hover:bg-[#98d8c8]/[0.02] hover:border-[#98d8c8]/40 transition-all duration-500 h-full">
                <div className="w-10 h-10 rounded-lg border border-[#98d8c8]/30 flex items-center justify-center mb-8">
                  <span className="font-extralight text-xs text-[#98d8c8] tracking-widest">侘</span>
                </div>
                <h3 className="font-extralight text-xl text-[#4a5568] tracking-wide mb-4 group-hover:text-[#98d8c8] transition-colors duration-500">
                  wabi — simplicity
                </h3>
                <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                  Finding beauty in imperfection. Asymmetric placement, slight irregularities — these are features, not flaws.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18} className="md:col-span-5">
              <div className="group p-10 bg-white rounded-lg border border-[#ffb7c5]/25 hover:-translate-y-0.5 hover:bg-[#ffb7c5]/[0.02] hover:border-[#ffb7c5]/40 transition-all duration-500 h-full">
                <div className="w-10 h-10 rounded-lg border border-[#ffb7c5]/30 flex items-center justify-center mb-8">
                  <span className="font-extralight text-xs text-[#ffb7c5] tracking-widest">寂</span>
                </div>
                <h3 className="font-extralight text-xl text-[#4a5568] tracking-wide mb-4 group-hover:text-[#ffb7c5] transition-colors duration-500">
                  sabi — quiet beauty
                </h3>
                <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                  The beauty that comes with time and restraint. Slow transitions, gentle colors, hairline borders — nothing forced.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.24} className="md:col-span-7 md:mt-8">
              <div className="group p-10 md:p-12 bg-white rounded-lg border border-[#b8d4e3]/25 hover:-translate-y-0.5 hover:bg-[#b8d4e3]/[0.02] hover:border-[#b8d4e3]/40 transition-all duration-500 h-full">
                <div className="w-10 h-10 rounded-lg border border-[#b8d4e3]/30 flex items-center justify-center mb-8">
                  <span className="font-extralight text-xs text-[#b8d4e3] tracking-widest">清</span>
                </div>
                <h3 className="font-extralight text-xl text-[#4a5568] tracking-wide mb-4 group-hover:text-[#b8d4e3] transition-colors duration-500">
                  sei — purity
                </h3>
                <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                  Like morning light through shoji screens — clean, cool, unhurried. Every element earns its place. Nothing decorates for the sake of decoration alone; each mark carries intention and quietude.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Hairline divider with botanical center accent */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 flex items-center gap-6">
        <div className="flex-1 h-px bg-[#d4d4cf]/20" />
        <div className="w-1 h-1 rounded-full bg-[#d4d4cf]/40 flex-shrink-0" />
        <div className="flex-1 h-px bg-[#d4d4cf]/20" />
      </div>

      {/* ================================================================ */}
      {/* 7. Footer                                                         */}
      {/* ================================================================ */}
      <footer className="py-20 md:py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Small botanical center accent */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-10 h-20 jf-breathe opacity-[0.08]" style={{ animationDelay: "1s" }}>
          <BotanicalSprig className="w-full h-full opacity-100" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="h-px bg-[#d4d4cf]/20 mb-16" />

          <RevealBlock>
            <p className="font-extralight text-[10px] tracking-[0.6em] text-[#d4d4cf] mb-8">
              日系清新風
            </p>

            <Link
              href="/styles"
              className="font-light text-sm text-[#b0b8c4] tracking-[0.3em] jf-underline hover:text-[#64b5f6] transition-colors duration-500"
            >
              StyleKit
            </Link>

            <p className="font-light text-xs text-[#d4d4cf] tracking-widest mt-8">
              japanese fresh · 間 · wabi-sabi
            </p>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
