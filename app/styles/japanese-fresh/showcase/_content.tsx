"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline useInView hook
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// RevealBlock — scroll-triggered fade+lift
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Botanical SVG accents — inline, zero imports
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

function SakuraPetal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="#ffb7c5"
      strokeWidth="0.6"
      className={`pointer-events-none opacity-[0.18] ${className}`}
    >
      <path d="M20 2 C24 8, 26 14, 20 20 C14 14, 16 8, 20 2 Z" />
      <path d="M38 20 C32 24, 26 26, 20 20 C26 14, 32 16, 38 20 Z" />
      <path d="M20 38 C16 32, 14 26, 20 20 C26 26, 24 32, 20 38 Z" />
      <path d="M2 20 C8 16, 14 14, 20 20 C14 26, 8 24, 2 20 Z" />
      <circle cx="20" cy="20" r="1.5" fill="#ffb7c5" opacity="0.4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------
type DemoTab = "button" | "card" | "input";

// ---------------------------------------------------------------------------
// Main showcase component
// ---------------------------------------------------------------------------
export default function JapaneseFreshShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<DemoTab>("button");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    { name: "Sky", nameJa: "空", hex: "#64b5f6", bg: "#64b5f6", season: "summer" },
    { name: "Rice", nameJa: "米", hex: "#fafaf8", bg: "#fafaf8", border: true, season: "all year" },
    { name: "Mint", nameJa: "薄荷", hex: "#98d8c8", bg: "#98d8c8", season: "spring" },
    { name: "Petal", nameJa: "花びら", hex: "#ffb7c5", bg: "#ffb7c5", season: "spring" },
    { name: "Powder", nameJa: "粉末", hex: "#b8d4e3", bg: "#b8d4e3", season: "winter" },
    { name: "Stone", nameJa: "石", hex: "#4a5568", bg: "#4a5568", season: "autumn" },
    { name: "Warm Mist", nameJa: "霞", hex: "#b0b8c4", bg: "#b0b8c4", season: "spring" },
    { name: "Hairline", nameJa: "縁", hex: "#d4d4cf", bg: "#d4d4cf", season: "all year" },
  ];

  const typographySamples = [
    { size: "text-6xl md:text-7xl", weight: "font-extralight", label: "Display — extralight", sample: "日系清新", tracking: "tracking-wide" },
    { size: "text-4xl md:text-5xl", weight: "font-extralight", label: "Heading 1 — extralight", sample: "Morning Light", tracking: "tracking-wide" },
    { size: "text-2xl md:text-3xl", weight: "font-light", label: "Heading 2 — light", sample: "桜の季節", tracking: "tracking-widest" },
    { size: "text-lg md:text-xl", weight: "font-light", label: "Heading 3 — light", sample: "Wabi-sabi aesthetics", tracking: "tracking-wide" },
    { size: "text-base", weight: "font-light", label: "Body — light", sample: "Design is not about what you add, but what you allow to breathe. Ma (間) — the space between things — is the primary material.", tracking: "tracking-wide" },
    { size: "text-sm", weight: "font-light", label: "Caption — light", sample: "hairline borders · botanical accents · meditative slowness", tracking: "tracking-widest" },
  ];

  const featureCards = [
    {
      kanji: "間",
      title: "ma — negative space",
      desc: "In Japanese aesthetics, Ma (間) refers to the intentional pause — the emptiness between things that gives them definition and breath. Whitespace is not waste; it is the primary design material.",
      accentColor: "#64b5f6",
      borderColor: "#64b5f6",
      colSpan: "md:col-span-7",
      offset: "",
    },
    {
      kanji: "侘",
      title: "wabi — simplicity",
      desc: "Finding beauty in imperfection. Asymmetric placement, slight irregularities — these are features, not flaws.",
      accentColor: "#98d8c8",
      borderColor: "#98d8c8",
      colSpan: "md:col-span-5",
      offset: "md:mt-8",
    },
    {
      kanji: "寂",
      title: "sabi — quiet beauty",
      desc: "The beauty that comes with time and restraint. Slow transitions, gentle colors, hairline borders — nothing forced.",
      accentColor: "#ffb7c5",
      borderColor: "#ffb7c5",
      colSpan: "md:col-span-5",
      offset: "",
    },
    {
      kanji: "清",
      title: "sei — purity",
      desc: "Like morning light through shoji screens — clean, cool, unhurried. Every element earns its place. Nothing decorates for decoration's sake; each mark carries intention and quietude.",
      accentColor: "#b8d4e3",
      borderColor: "#b8d4e3",
      colSpan: "md:col-span-7",
      offset: "md:mt-8",
    },
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
          50% { opacity: 0.20; }
        }
        .jf-breathe {
          animation: jf-breathe 6s ease-in-out infinite;
        }
        @keyframes jf-petal-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.18; }
          80% { opacity: 0.14; }
          100% { transform: translateY(60px) rotate(180deg); opacity: 0; }
        }
        .jf-petal-fall {
          animation: jf-petal-fall 8s ease-in-out infinite;
        }
        @keyframes jf-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .jf-float {
          animation: jf-float 5s ease-in-out infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. Navigation                                                      */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf8]/90 backdrop-blur-sm border-b border-[#d4d4cf]/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/styles"
              className="font-light text-sm text-[#b0b8c4] tracking-widest jf-underline"
            >
              StyleKit
            </Link>

            <div className="flex items-center gap-3">
              <span className="font-extralight text-base text-[#4a5568] tracking-widest">
                日系清新風
              </span>
              <span className="hidden md:inline font-light text-xs text-[#d4d4cf] tracking-widest">
                · japanese fresh
              </span>
            </div>

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
      {/* 2. Hero — full-screen Ma whitespace                               */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-16 overflow-hidden">
        {/* Botanical — absolute left/bottom */}
        <div className="absolute left-6 md:left-16 bottom-16 w-20 h-44 jf-breathe">
          <BotanicalBranch className="w-full h-full" />
        </div>

        {/* Botanical — absolute right/upper */}
        <div
          className="absolute right-8 md:right-20 top-32 w-14 h-28 jf-breathe"
          style={{ animationDelay: "3s" }}
        >
          <BotanicalSprig className="w-full h-full" />
        </div>

        {/* Sakura petals — decorative floaters */}
        <div
          className="absolute left-1/4 top-24 w-10 h-10 jf-petal-fall"
          style={{ animationDelay: "0s" }}
        >
          <SakuraPetal className="w-full h-full" />
        </div>
        <div
          className="absolute right-1/3 top-16 w-8 h-8 jf-petal-fall"
          style={{ animationDelay: "3s" }}
        >
          <SakuraPetal className="w-full h-full" />
        </div>
        <div
          className="absolute left-2/3 top-36 w-6 h-6 jf-petal-fall"
          style={{ animationDelay: "5.5s" }}
        >
          <SakuraPetal className="w-full h-full" />
        </div>

        {/* Hero content */}
        <div className="text-center max-w-2xl mx-auto relative z-10">
          {/* Japanese label */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.0s cubic-bezier(0.16,1,0.3,1) 0s, transform 1.0s cubic-bezier(0.16,1,0.3,1) 0s",
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
              transition: "opacity 1.0s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1.0s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <h1 className="font-extralight text-5xl md:text-7xl text-[#4a5568] tracking-wide leading-tight mb-4">
              Japanese Fresh
            </h1>
          </div>

          {/* Kanji row */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.0s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 1.0s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <div className="flex items-center justify-center gap-6 mb-6">
              {["侘", "寂", "間", "清"].map((k, i) => (
                <span
                  key={i}
                  className="font-extralight text-2xl jf-float"
                  style={{
                    color: ["#64b5f6", "#98d8c8", "#ffb7c5", "#b8d4e3"][i],
                    animationDelay: `${i * 0.8}s`,
                    opacity: 0.6,
                  }}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.0s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 1.0s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <p className="font-light text-sm text-[#b0b8c4] tracking-widest mb-16 leading-loose">
              wabi-sabi · hairline borders · meditative slowness
            </p>
          </div>

          {/* CTA buttons */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.0s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1.0s cubic-bezier(0.16,1,0.3,1) 0.5s",
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

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            opacity: heroRevealed ? 0.4 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 1s",
          }}
        >
          <span className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4]">
            scroll
          </span>
          <div className="w-px h-10 bg-[#d4d4cf]/50" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. Component Demos — tab switcher                                 */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              コンポーネント
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-6">
              component demo
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide mb-16 max-w-xs leading-loose">
              each component breathes with ma-based spacing and weightless interactions
            </p>
          </RevealBlock>

          {/* Tab row */}
          <RevealBlock delay={0.1}>
            <div className="flex items-end gap-0 border-b border-[#d4d4cf]/30 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-6 py-3 font-light text-sm tracking-widest transition-all duration-500"
                  style={{ color: activeTab === tab.id ? "#4a5568" : "#b0b8c4" }}
                >
                  <span>{tab.label}</span>
                  <span
                    className="ml-2 font-light text-[10px] tracking-wider"
                    style={{ color: activeTab === tab.id ? "#b0b8c4" : "#d4d4cf" }}
                  >
                    {tab.labelJa}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#64b5f6] transition-all duration-500"
                    style={{ opacity: activeTab === tab.id ? 1 : 0 }}
                  />
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab panel */}
          <RevealBlock delay={0.2}>
            {/* Button demos */}
            {activeTab === "button" && (
              <div className="p-10 md:p-12 bg-white rounded-lg border border-[#d4d4cf]/30 transition-all duration-500">
                <p className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4] mb-8">
                  whisper button variants
                </p>
                <div className="flex flex-wrap gap-5 mb-10">
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
                  <button
                    type="button"
                    className="px-10 py-3 bg-transparent font-light tracking-widest text-sm text-[#b8d4e3] rounded-lg border border-[#b8d4e3]/40 hover:-translate-y-0.5 hover:bg-[#b8d4e3]/5 hover:border-[#b8d4e3]/60 transition-all duration-500"
                  >
                    powder
                  </button>
                </div>
                <div className="pt-8 border-t border-[#d4d4cf]/20">
                  <p className="font-light text-xs text-[#b0b8c4] tracking-widest leading-relaxed">
                    pattern — px-10 py-3 · font-light tracking-widest · border border-[#d4d4cf]/40 · duration-500 · hover:-translate-y-0.5
                  </p>
                </div>
              </div>
            )}

            {/* Card demos */}
            {activeTab === "card" && (
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "空気 — air",
                    desc: "Design that breathes. Every element exists with intention, surrounded by generous space that gives it meaning and rest.",
                    accent: "#64b5f6",
                  },
                  {
                    title: "静寂 — silence",
                    desc: "The absence of noise is itself a sound. Whitespace speaks where words cannot reach.",
                    accent: "#98d8c8",
                  },
                  {
                    title: "儚さ — transience",
                    desc: "Like cherry blossoms, beauty is heightened by its fragility. Impermanence makes each moment precious.",
                    accent: "#ffb7c5",
                  },
                  {
                    title: "間 — interval",
                    desc: "The pause between notes is the music. Ma teaches us that space is not empty — it holds everything.",
                    accent: "#b8d4e3",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group p-10 md:p-12 bg-white rounded-lg border border-[#d4d4cf]/30 hover:-translate-y-0.5 hover:bg-[#64b5f6]/[0.02] hover:border-[#d4d4cf]/50 transition-all duration-500 cursor-pointer"
                    style={i % 2 !== 0 ? { marginTop: "1.5rem" } : {}}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <h3
                      className="font-extralight text-lg tracking-wide mb-4 transition-colors duration-500"
                      style={{ color: hoveredCard === i ? card.accent : "#4a5568" }}
                    >
                      {card.title}
                    </h3>
                    <p className="font-light text-sm text-[#b0b8c4] leading-relaxed">
                      {card.desc}
                    </p>
                    <div
                      className="mt-6 h-px transition-all duration-500"
                      style={{ backgroundColor: card.accent, opacity: hoveredCard === i ? 0.3 : 0.15 }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Input demos */}
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

      {/* Botanical divider */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 flex items-center gap-8">
        <div className="flex-1 h-px bg-[#d4d4cf]/25" />
        <BotanicalLeaf className="w-8 h-10 flex-shrink-0" />
        <div className="flex-1 h-px bg-[#d4d4cf]/25" />
      </div>

      {/* ================================================================ */}
      {/* 4. Color Palette — seasonal inspiration                           */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Botanical accent — right */}
        <div className="absolute right-4 md:right-12 top-20 w-16 h-36 jf-breathe" style={{ animationDelay: "1.5s" }}>
          <BotanicalSprig className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              カラーパレット
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              color palette
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide mb-16 max-w-xs leading-loose">
              tones drawn from dawn light, rice paper, cherry blossoms, and spring botanicals
            </p>
          </RevealBlock>

          {/* Wabi-sabi offset palette grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {palette.map((color, i) => (
              <RevealBlock
                key={color.hex}
                delay={i * 0.06}
                className={i % 3 === 1 ? "md:mt-6" : ""}
              >
                <div className="group flex flex-col gap-3">
                  <div
                    className="w-full aspect-square rounded-lg transition-all duration-500 group-hover:-translate-y-0.5"
                    style={{
                      backgroundColor: color.bg,
                      border: color.border ? "1px solid #d4d4cf" : "none",
                    }}
                  />
                  <div>
                    <p className="font-light text-sm text-[#4a5568] tracking-wide">
                      {color.name}
                    </p>
                    <p className="font-light text-xs text-[#b0b8c4] tracking-widest mt-0.5">
                      {color.nameJa}
                    </p>
                    <p className="font-light text-[10px] text-[#b0b8c4] tracking-wider mt-1 font-mono">
                      {color.hex}
                    </p>
                    <p className="font-light text-[9px] text-[#d4d4cf] tracking-wider mt-0.5">
                      {color.season}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Seasonal gradient strip */}
          <RevealBlock delay={0.3} className="mt-20">
            <p className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4] mb-6">
              seasonal gradient · 四季のグラデーション
            </p>
            <div className="h-2 rounded-full" style={{
              background: "linear-gradient(to right, #ffb7c5, #98d8c8, #64b5f6, #b8d4e3, #d4d4cf)",
            }} />
            <div className="flex justify-between mt-3">
              {["spring 春", "summer 夏", "autumn 秋", "winter 冬"].map((season) => (
                <span key={season} className="font-light text-[9px] text-[#d4d4cf] tracking-wider">
                  {season}
                </span>
              ))}
            </div>
          </RevealBlock>
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
        {/* Botanical accent — left bottom */}
        <div
          className="absolute left-4 md:left-10 bottom-20 w-16 h-40 jf-breathe"
          style={{ animationDelay: "2s" }}
        >
          <BotanicalBranch className="w-full h-full" />
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
            {/* Ma — do */}
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

            {/* 禁 — don't */}
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
      {/* 6. Typography                                                     */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Botanical accent — right */}
        <div
          className="absolute right-6 md:right-16 bottom-24 w-14 h-32 jf-breathe"
          style={{ animationDelay: "3.5s" }}
        >
          <BotanicalLeaf className="w-full h-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-4">
              タイポグラフィ
            </p>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-6">
              typography
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide mb-16 max-w-xs leading-loose">
              only extralight and light weights — heavier weights break the meditative calm
            </p>
          </RevealBlock>

          {/* Type scale */}
          <div className="space-y-14">
            {typographySamples.map((sample, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-8 border-b border-[#d4d4cf]/20 hover:border-[#64b5f6]/20 transition-all duration-500">
                  <div className="md:w-40 flex-shrink-0">
                    <p className="font-light text-[10px] text-[#b0b8c4] tracking-widest leading-loose">
                      {sample.label}
                    </p>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p
                      className={`${sample.size} ${sample.weight} ${sample.tracking} text-[#4a5568] leading-tight group-hover:text-[#64b5f6] transition-colors duration-500`}
                    >
                      {sample.sample}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Japanese character specimens */}
          <RevealBlock delay={0.5} className="mt-20">
            <p className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4] mb-10">
              character specimens · 文字見本
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {[
                { char: "桜", label: "sakura", color: "#ffb7c5" },
                { char: "風", label: "wind", color: "#64b5f6" },
                { char: "水", label: "water", color: "#98d8c8" },
                { char: "月", label: "moon", color: "#b8d4e3" },
                { char: "花", label: "flower", color: "#ffb7c5" },
                { char: "山", label: "mountain", color: "#b0b8c4" },
              ].map((item, i) => (
                <RevealBlock key={i} delay={0.5 + i * 0.06}>
                  <div className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-[#d4d4cf]/20 hover:border-[#d4d4cf]/40 hover:-translate-y-0.5 transition-all duration-500">
                    <span
                      className="font-extralight text-4xl tracking-wide transition-colors duration-500"
                      style={{ color: item.color, opacity: 0.7 }}
                    >
                      {item.char}
                    </span>
                    <span className="font-light text-[9px] text-[#d4d4cf] tracking-[0.3em]">
                      {item.label}
                    </span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </RevealBlock>

          {/* Hiragana strip */}
          <RevealBlock delay={0.7} className="mt-14">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="font-light text-[10px] text-[#d4d4cf] tracking-widest mr-4">
                hiragana ·
              </span>
              {["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す"].map((h, i) => (
                <span
                  key={i}
                  className="font-extralight text-lg text-[#d4d4cf]/60 hover:text-[#64b5f6]/50 transition-colors duration-500"
                >
                  {h}
                </span>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Hairline divider with dot */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 flex items-center gap-6">
        <div className="flex-1 h-px bg-[#d4d4cf]/20" />
        <div className="w-1 h-1 rounded-full bg-[#d4d4cf]/40 flex-shrink-0" />
        <div className="flex-1 h-px bg-[#d4d4cf]/20" />
      </div>

      {/* ================================================================ */}
      {/* 7. Wabi-sabi Feature Cards                                        */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden">
        <div
          className="absolute right-0 top-32 w-12 h-28 jf-breathe"
          style={{ animationDelay: "4s" }}
        >
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
              four principles that give japanese-fresh its meditative, airy character
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-12 gap-6">
            {featureCards.map((card, i) => (
              <RevealBlock
                key={i}
                delay={0.05 + i * 0.07}
                className={`${card.colSpan} ${card.offset}`}
              >
                <div
                  className="group p-10 md:p-12 bg-white rounded-lg border hover:-translate-y-0.5 transition-all duration-500 h-full"
                  style={{
                    borderColor: `${card.borderColor}25`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg border flex items-center justify-center mb-8"
                    style={{ borderColor: `${card.accentColor}30` }}
                  >
                    <span
                      className="font-extralight text-xs tracking-widest"
                      style={{ color: card.accentColor }}
                    >
                      {card.kanji}
                    </span>
                  </div>
                  <h3
                    className="font-extralight text-xl tracking-wide mb-4 transition-colors duration-500"
                    style={{ color: "#4a5568" }}
                  >
                    <span className={`group-hover:text-[${card.accentColor}] transition-colors duration-500`} style={{ color: "inherit" }}>
                      {card.title}
                    </span>
                  </h3>
                  <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                    {card.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Sakura showcase strip                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-white/60 border-y border-[#d4d4cf]/20 relative overflow-hidden">
        {/* Sakura petals — decorative */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: "10%", top: "20%", delay: "0s", size: "w-6 h-6" },
            { left: "25%", top: "60%", delay: "1.5s", size: "w-8 h-8" },
            { left: "50%", top: "30%", delay: "3s", size: "w-5 h-5" },
            { left: "70%", top: "70%", delay: "0.7s", size: "w-7 h-7" },
            { left: "88%", top: "25%", delay: "2.2s", size: "w-6 h-6" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute jf-petal-fall ${p.size}`}
              style={{ left: p.left, top: p.top, animationDelay: p.delay }}
            >
              <SakuraPetal className="w-full h-full" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealBlock>
            <p className="font-light text-[10px] tracking-[0.5em] text-[#b0b8c4] mb-6">
              桜 · sakura
            </p>
            <p className="font-extralight text-2xl md:text-3xl text-[#4a5568] tracking-wide leading-loose mb-6">
              cherry blossoms fall gently
            </p>
            <p className="font-light text-sm text-[#b0b8c4] tracking-widest leading-loose max-w-sm mx-auto">
              the most beautiful things in life are also the most fleeting.
              ma teaches us to be present with what is.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.2} className="mt-12">
            <div className="flex items-center justify-center gap-6">
              {["#ffb7c5", "#64b5f6", "#98d8c8", "#b8d4e3", "#ffb7c5"].map((c, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full jf-breathe"
                  style={{ backgroundColor: c, animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Hairline divider with botanical center */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 flex items-center gap-8 py-2">
        <div className="flex-1 h-px bg-[#d4d4cf]/20" />
        <BotanicalLeaf className="w-8 h-10 flex-shrink-0" />
        <div className="flex-1 h-px bg-[#d4d4cf]/20" />
      </div>

      {/* ================================================================ */}
      {/* 8. Footer                                                         */}
      {/* ================================================================ */}
      <footer className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden">
        {/* Small botanical center accent */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-4 w-10 h-20 jf-breathe"
          style={{ animationDelay: "1s", opacity: 0.08 }}
        >
          <BotanicalSprig className="w-full h-full opacity-100" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-[#d4d4cf]/20 mb-16" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-20 mb-20">
            <RevealBlock delay={0}>
              <p className="font-light text-[10px] tracking-[0.4em] text-[#d4d4cf] mb-6">
                philosophy
              </p>
              <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                japanese fresh embodies Ma and wabi-sabi. design is not about what you add, but what you allow to breathe.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <p className="font-light text-[10px] tracking-[0.4em] text-[#d4d4cf] mb-6">
                principles
              </p>
              <ul className="space-y-3">
                {["間 — ma", "侘 — wabi", "寂 — sabi", "清 — sei"].map((p, i) => (
                  <li key={i} className="font-light text-sm text-[#b0b8c4] tracking-wide">
                    {p}
                  </li>
                ))}
              </ul>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <p className="font-light text-[10px] tracking-[0.4em] text-[#d4d4cf] mb-6">
                stylekit
              </p>
              <Link
                href="/styles"
                className="font-light text-sm text-[#b0b8c4] tracking-widest jf-underline hover:text-[#64b5f6] transition-colors duration-500 block mb-3"
              >
                all styles
              </Link>
              <Link
                href="/styles/japanese-fresh"
                className="font-light text-sm text-[#b0b8c4] tracking-widest jf-underline hover:text-[#64b5f6] transition-colors duration-500 block"
              >
                documentation
              </Link>
            </RevealBlock>
          </div>

          <RevealBlock delay={0.3}>
            <div className="h-px bg-[#d4d4cf]/15 mb-10" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="font-extralight text-[10px] tracking-[0.6em] text-[#d4d4cf]">
                日系清新風 · japanese fresh
              </p>
              <div className="flex items-center gap-4">
                {["#ffb7c5", "#98d8c8", "#64b5f6", "#b8d4e3"].map((c, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full jf-breathe"
                    style={{ backgroundColor: c, opacity: 0.5, animationDelay: `${i * 0.5}s` }}
                  />
                ))}
              </div>
              <p className="font-light text-xs text-[#d4d4cf] tracking-widest">
                間 · wabi-sabi · 桜
              </p>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
