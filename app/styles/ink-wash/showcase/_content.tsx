"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView hook                                                      */
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
/*  RevealBlock                                                         */
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

const inkShades = [
  {
    char: "焦",
    pinyin: "jiāo",
    english: "Scorched",
    hex: "#1a1a1a",
    desc: "The deepest, richest stroke. Applied dry on an almost empty brush — used for outlines, rock textures, and the oldest tree bark.",
    textLight: true,
  },
  {
    char: "浓",
    pinyin: "nóng",
    english: "Thick",
    hex: "#2c2c2c",
    desc: "Dense ink, full brush. The workhorse of ink painting — leaves, near mountains, foreground elements that anchor the composition.",
    textLight: true,
  },
  {
    char: "重",
    pinyin: "zhòng",
    english: "Heavy",
    hex: "#5a5a5a",
    desc: "Mid-dark tone. Used for mid-ground elements, shadows beneath foliage, and the weight of distant ridges at dusk.",
    textLight: true,
  },
  {
    char: "淡",
    pinyin: "dàn",
    english: "Light",
    hex: "#a8a8a8",
    desc: "Diluted wash. Misty mountains, morning haze, the suggestion of water. What you feel more than see.",
    textLight: false,
  },
  {
    char: "清",
    pinyin: "qīng",
    english: "Clear",
    hex: "#e8e4de",
    desc: "Almost-water. The barest ghost of ink on xuan paper — distant peaks vanishing into sky, breath on cold glass.",
    textLight: false,
  },
];

const landscapes = [
  {
    title: "远山",
    titleEn: "Distant Mountains",
    poem: "青山横北郭，白水绕东城。",
    poemEn: "Green hills lie across the northern walls, white water winds around the eastern city.",
    svgContent: (
      <svg viewBox="0 0 300 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Sky wash */}
        <rect width="300" height="180" fill="#f8f5f0" />
        {/* Far mountain — very faint */}
        <path d="M0,140 Q60,60 120,90 Q180,50 240,80 Q270,65 300,90 L300,180 L0,180 Z" fill="#e0dbd3" />
        {/* Mid mountain */}
        <path d="M0,160 Q40,100 90,120 Q140,80 180,110 Q220,90 260,115 L300,160 L300,180 L0,180 Z" fill="#c4b9a8" />
        {/* Near slope */}
        <path d="M0,175 Q80,150 160,165 Q220,155 300,170 L300,180 L0,180 Z" fill="#a89279" opacity="0.4" />
        {/* Pine tree suggestion */}
        <line x1="60" y1="165" x2="60" y2="140" stroke="#2c2c2c" strokeWidth="1.2" />
        <path d="M55,145 L60,130 L65,145 Z" fill="#2c2c2c" opacity="0.7" />
        <path d="M54,152 L60,138 L66,152 Z" fill="#2c2c2c" opacity="0.5" />
        {/* Water reflection line */}
        <line x1="30" y1="172" x2="100" y2="172" stroke="#2c2c2c" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="175" x2="90" y2="175" stroke="#2c2c2c" strokeWidth="0.3" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: "竹石",
    titleEn: "Bamboo and Stone",
    poem: "咬定青山不放松，立根原在破岩中。",
    poemEn: "Biting into the green mountain, not letting go — roots planted deep inside cracked rock.",
    svgContent: (
      <svg viewBox="0 0 300 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="180" fill="#f8f5f0" />
        {/* Stone — dry brush texture suggestion */}
        <ellipse cx="80" cy="150" rx="55" ry="32" fill="#d5cfc6" />
        <ellipse cx="80" cy="148" rx="50" ry="28" fill="#c4b9a8" opacity="0.6" />
        <path d="M50,138 Q70,125 95,135 Q80,140 50,138 Z" fill="#2c2c2c" opacity="0.08" />
        {/* Bamboo stalks */}
        <line x1="160" y1="10" x2="158" y2="180" stroke="#2c2c2c" strokeWidth="2.5" opacity="0.7" />
        <line x1="185" y1="20" x2="183" y2="180" stroke="#2c2c2c" strokeWidth="2" opacity="0.5" />
        <line x1="210" y1="35" x2="208" y2="180" stroke="#2c2c2c" strokeWidth="1.5" opacity="0.35" />
        {/* Bamboo joints */}
        {[40, 70, 100, 130, 160].map((y) => (
          <line key={y} x1="157" y1={y} x2="161" y2={y} stroke="#2c2c2c" strokeWidth="1" opacity="0.6" />
        ))}
        {[55, 85, 115, 145].map((y) => (
          <line key={y} x1="182" y1={y} x2="186" y2={y} stroke="#2c2c2c" strokeWidth="0.8" opacity="0.45" />
        ))}
        {/* Leaves */}
        <path d="M158,45 Q140,30 125,38" stroke="#2c2c2c" strokeWidth="1.2" fill="none" opacity="0.7" />
        <path d="M158,55 Q175,38 190,45" stroke="#2c2c2c" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M183,70 Q165,55 148,62" stroke="#2c2c2c" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M183,80 Q200,65 215,72" stroke="#2c2c2c" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M208,90 Q225,75 240,82" stroke="#2c2c2c" strokeWidth="0.8" fill="none" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "水月",
    titleEn: "Water and Moon",
    poem: "举杯邀明月，对影成三人。",
    poemEn: "I raise my cup to invite the bright moon — we are three, counting shadow and reflection.",
    svgContent: (
      <svg viewBox="0 0 300 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="180" fill="#f8f5f0" />
        {/* Moon */}
        <circle cx="150" cy="60" r="38" fill="#f8f5f0" stroke="#2c2c2c" strokeWidth="0.8" opacity="0.5" />
        <circle cx="150" cy="60" r="34" fill="#e8e4de" opacity="0.7" />
        {/* Cloud wisps */}
        <path d="M90,55 Q110,48 130,55" stroke="#2c2c2c" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M170,50 Q190,44 210,52" stroke="#2c2c2c" strokeWidth="0.6" fill="none" opacity="0.2" />
        {/* Water surface */}
        <rect x="0" y="120" width="300" height="60" fill="#e8e4de" opacity="0.4" />
        {/* Water lines */}
        {[126, 133, 140, 148, 156, 165].map((y, i) => (
          <line
            key={y}
            x1={30 + i * 3}
            y1={y}
            x2={270 - i * 3}
            y2={y}
            stroke="#2c2c2c"
            strokeWidth="0.4"
            opacity={0.15 - i * 0.015}
          />
        ))}
        {/* Moon reflection in water */}
        <ellipse cx="150" cy="148" rx="24" ry="8" fill="#2c2c2c" opacity="0.06" />
        {/* Reeds */}
        <line x1="25" y1="180" x2="30" y2="110" stroke="#2c2c2c" strokeWidth="1" opacity="0.4" />
        <line x1="35" y1="180" x2="38" y2="115" stroke="#2c2c2c" strokeWidth="0.8" opacity="0.3" />
        <ellipse cx="30" cy="108" rx="3" ry="7" fill="#a89279" opacity="0.5" />
        <ellipse cx="38" cy="113" rx="2.5" ry="6" fill="#a89279" opacity="0.4" />
      </svg>
    ),
  },
];

const doRules = [
  {
    title: "计白当黑",
    subtitle: "Count emptiness as form",
    desc: "Leave generous white space. Every gap breathes meaning into what surrounds it.",
  },
  {
    title: "墨分五色",
    subtitle: "Let ink yield five tones",
    desc: "Build depth through tonal variation — from scorched black to the lightest wash.",
  },
  {
    title: "笔断意连",
    subtitle: "Stroke ends, meaning continues",
    desc: "Allow visual pauses. The suggestion of a line is more powerful than its completion.",
  },
  {
    title: "气韵生动",
    subtitle: "Spirit resonance, living movement",
    desc: "Transitions must flow — slow, deliberate, like ink spreading through wet paper fibers.",
  },
];

const dontRules = [
  {
    title: "忌满忌堵",
    subtitle: "Avoid fullness and blockage",
    desc: "Never fill every space. Crowded composition suffocates the viewer's eye and spirit.",
  },
  {
    title: "忌浮忌飘",
    subtitle: "Avoid floating, avoid drifting",
    desc: "No jarring shadows, no neon glows. Elements must feel grounded on xuan paper.",
  },
  {
    title: "忌板忌刻",
    subtitle: "Avoid rigidity and carving",
    desc: "Never use geometric perfection or mechanical repetition — ink is never perfectly even.",
  },
  {
    title: "忌俗忌媚",
    subtitle: "Avoid vulgarity and flattery",
    desc: "Resist bright saturated color. Ink wash palette is monochromatic with warm undertone only.",
  },
];

const componentTabs = ["Brush Strokes", "Vessels", "Scroll"] as const;
type ComponentTab = (typeof componentTabs)[number];

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function InkWashShowcase() {
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentTab>("Brush Strokes");
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaFocused, setTextareaFocused] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div
      className="min-h-screen font-serif"
      style={{ backgroundColor: "#f8f5f0", color: "#2c2c2c" }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* 1. Navigation                                                     */}
      {/* ---------------------------------------------------------------- */}
      <nav
        style={{
          backgroundColor: "#f8f5f0",
          borderBottom: "1px solid rgba(44,44,44,0.1)",
        }}
        className="px-8 py-5 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-serif font-light tracking-widest text-lg"
            style={{ color: "#2c2c2c" }}
          >
            水墨 / Ink Wash
          </Link>
          <div className="flex items-center gap-10">
            <a
              href="#shades"
              className="font-serif font-light text-sm tracking-wider"
              style={{
                color: "#6b7b6e",
                transition: "color 0.7s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2c2c2c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7b6e")}
            >
              墨色
            </a>
            <a
              href="#landscape"
              className="font-serif font-light text-sm tracking-wider"
              style={{
                color: "#6b7b6e",
                transition: "color 0.7s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2c2c2c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7b6e")}
            >
              山水
            </a>
            <a
              href="#typography"
              className="font-serif font-light text-sm tracking-wider"
              style={{
                color: "#6b7b6e",
                transition: "color 0.7s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2c2c2c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7b6e")}
            >
              书法
            </a>
            <Link
              href="/"
              className="font-serif font-light text-sm tracking-wider"
              style={{
                color: "#2c2c2c",
                borderBottom: "1px solid rgba(44,44,44,0.3)",
                paddingBottom: "2px",
                transition: "border-color 0.7s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderBottomColor = "rgba(44,44,44,0.9)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderBottomColor = "rgba(44,44,44,0.3)")
              }
            >
              StyleKit →
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Hero                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-40 px-8 relative overflow-hidden">
        {/* Background character */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-serif font-light"
            style={{
              fontSize: "320px",
              color: "rgba(44,44,44,0.04)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            墨
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div ref={heroRef}>
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(32px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0s",
              }}
            >
              <h1
                className="font-serif font-light tracking-widest"
                style={{
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  color: "rgba(44,44,44,0.82)",
                  lineHeight: 1.1,
                }}
              >
                Ink Wash
              </h1>
            </div>

            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <div
                className="mx-auto my-10"
                style={{
                  height: "1px",
                  width: "64px",
                  backgroundColor: "rgba(44,44,44,0.2)",
                }}
              />
            </div>

            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              <p
                className="font-serif italic text-lg tracking-wider"
                style={{ color: "#a89279" }}
              >
                计白当黑 · emptiness is form
              </p>
            </div>

            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s",
              }}
              className="mt-16"
            >
              <p
                className="font-serif font-light text-base leading-loose max-w-xl mx-auto"
                style={{ color: "rgba(44,44,44,0.6)" }}
              >
                Chinese ink painting spans over a thousand years. Its principles —
                generous emptiness, tonal breath, the living brushstroke — translate
                into a design language unlike any other.
              </p>
            </div>

            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s",
              }}
              className="mt-12"
            >
              <button
                className="font-serif font-light tracking-widest text-sm px-8 py-3"
                style={{
                  backgroundColor: "transparent",
                  color: "#2c2c2c",
                  border: "none",
                  borderBottom: "1px solid rgba(44,44,44,0.3)",
                  transition: "all 1000ms ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(44,44,44,0.9)";
                  e.currentTarget.style.backgroundColor = "rgba(44,44,44,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(44,44,44,0.3)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(44,44,44,0.1)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 2px 4px rgba(44,44,44,0.1)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(44,44,44,0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                探索 · Explore the Practice
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Components Demo                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 px-8" style={{ backgroundColor: "#f3efe8" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="font-serif font-light text-xs tracking-widest uppercase mb-3" style={{ color: "#a89279" }}>
              Components
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              The Instruments of Ink
            </h2>
            <p className="font-serif font-light text-sm mt-3 tracking-wider" style={{ color: "#a89279" }}>
              笔、墨、纸、砚 — Brush, Ink, Paper, Stone
            </p>
          </RevealBlock>

          {/* Tab row */}
          <RevealBlock className="flex justify-center gap-0 mb-16">
            {componentTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveComponentTab(tab)}
                className="font-serif font-light text-sm tracking-wider px-8 py-3"
                style={{
                  backgroundColor: "transparent",
                  color:
                    activeComponentTab === tab
                      ? "#2c2c2c"
                      : "rgba(44,44,44,0.45)",
                  borderBottom:
                    activeComponentTab === tab
                      ? "1px solid #2c2c2c"
                      : "1px solid rgba(44,44,44,0.15)",
                  transition: "all 700ms ease-in-out",
                }}
              >
                {tab}
              </button>
            ))}
          </RevealBlock>

          {/* Brush Strokes — Buttons */}
          {activeComponentTab === "Brush Strokes" && (
            <RevealBlock className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <p className="font-serif font-light text-xs tracking-widest" style={{ color: "#a89279" }}>
                    Primary Stroke
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button
                      className="font-serif font-light tracking-widest text-sm px-8 py-3"
                      style={{
                        backgroundColor: "#2c2c2c",
                        color: "#f8f5f0",
                        border: "none",
                        transition: "all 800ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1a1a1a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#2c2c2c";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow =
                          "inset 0 2px 4px rgba(44,44,44,0.3)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      落墨 · Apply Ink
                    </button>
                    <button
                      className="font-serif font-light tracking-widest text-sm px-8 py-3"
                      style={{
                        backgroundColor: "#6b7b6e",
                        color: "#f8f5f0",
                        border: "none",
                        transition: "all 800ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#5a6a5d";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#6b7b6e";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow =
                          "inset 0 2px 4px rgba(44,44,44,0.2)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      青苔 · Moss
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <p className="font-serif font-light text-xs tracking-widest" style={{ color: "#a89279" }}>
                    Ghost Stroke — ink-bleed border
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button
                      className="font-serif font-light tracking-widest text-sm px-8 py-3"
                      style={{
                        backgroundColor: "transparent",
                        color: "#2c2c2c",
                        borderBottom: "1px solid rgba(44,44,44,0.35)",
                        transition: "all 900ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor =
                          "rgba(44,44,44,0.9)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(44,44,44,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor =
                          "rgba(44,44,44,0.35)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow =
                          "inset 0 2px 4px rgba(44,44,44,0.1)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      观察 · Observe
                    </button>
                    <button
                      className="font-serif font-light tracking-widest text-sm px-8 py-3"
                      style={{
                        backgroundColor: "transparent",
                        color: "#a89279",
                        borderBottom: "1px solid rgba(168,146,121,0.4)",
                        transition: "all 900ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor =
                          "rgba(168,146,121,0.9)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(168,146,121,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor =
                          "rgba(168,146,121,0.4)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow =
                          "inset 0 2px 4px rgba(44,44,44,0.1)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      茶色 · Tea
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-serif font-light text-xs tracking-widest mb-6" style={{ color: "#a89279" }}>
                  Disabled State — spent brush
                </p>
                <div className="flex gap-6 flex-wrap">
                  <button
                    disabled
                    className="font-serif font-light tracking-widest text-sm px-8 py-3 cursor-not-allowed"
                    style={{
                      backgroundColor: "rgba(44,44,44,0.05)",
                      color: "rgba(44,44,44,0.3)",
                      border: "none",
                    }}
                  >
                    耗尽 · Exhausted
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Vessels — Cards */}
          {activeComponentTab === "Vessels" && (
            <RevealBlock className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  zh: "松",
                  en: "Pine",
                  body: "The pine endures winter alone. Standing past the snow-line where no other tree survives, it keeps its color when all else fades.",
                  tag: "Resilience",
                },
                {
                  zh: "竹",
                  en: "Bamboo",
                  body: "Hollow at the center, straight in bearing. The gentleman of the plant world — flexible yet unbending, present without vanity.",
                  tag: "Character",
                },
                {
                  zh: "梅",
                  en: "Plum Blossom",
                  body: "She blooms in the coldest month before spring arrives. Beauty that asks nothing of warmth — finding joy in the severe.",
                  tag: "Solitude",
                },
              ].map((card, i) => (
                <div
                  key={card.zh}
                  className="p-8 cursor-pointer"
                  style={{
                    backgroundColor: "#f8f5f0",
                    borderLeft: "1px solid rgba(44,44,44,0.1)",
                    transition: "all 800ms ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor = "rgba(44,44,44,0.45)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(44,44,44,0.025)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor =
                      "rgba(44,44,44,0.1)";
                    e.currentTarget.style.backgroundColor = "#f8f5f0";
                  }}
                >
                  <div className="mb-6">
                    <span
                      className="font-serif font-light"
                      style={{
                        fontSize: "3.5rem",
                        color: "rgba(44,44,44,0.12)",
                        lineHeight: 1,
                      }}
                    >
                      {card.zh}
                    </span>
                  </div>
                  <h3
                    className="font-serif font-light tracking-widest text-lg mb-4"
                    style={{ color: "rgba(44,44,44,0.85)" }}
                  >
                    {card.en}
                  </h3>
                  <p
                    className="font-serif font-light text-sm leading-loose"
                    style={{ color: "rgba(44,44,44,0.65)" }}
                  >
                    {card.body}
                  </p>
                  <div className="mt-6">
                    <span
                      className="font-serif font-light text-xs tracking-widest"
                      style={{ color: "#a89279" }}
                    >
                      {card.tag}
                    </span>
                  </div>
                </div>
              ))}
            </RevealBlock>
          )}

          {/* Scroll — Inputs */}
          {activeComponentTab === "Scroll" && (
            <RevealBlock className="max-w-xl mx-auto space-y-12">
              <div>
                <label
                  className="font-serif font-light text-xs tracking-widest block mb-4"
                  style={{ color: "#a89279" }}
                >
                  题名 · Title
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Enter a title..."
                  className="w-full font-serif font-light text-base bg-transparent outline-none py-3"
                  style={{
                    borderBottom: `1px solid ${inputFocused ? "#6b7b6e" : "rgba(196,185,168,0.5)"}`,
                    color: "#2c2c2c",
                    transition: "border-color 700ms ease-in-out",
                    caretColor: "#6b7b6e",
                  }}
                />
              </div>

              <div>
                <label
                  className="font-serif font-light text-xs tracking-widest block mb-4"
                  style={{ color: "#a89279" }}
                >
                  题跋 · Colophon
                </label>
                <textarea
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  onFocus={() => setTextareaFocused(true)}
                  onBlur={() => setTextareaFocused(false)}
                  placeholder="Write your inscription..."
                  rows={4}
                  className="w-full font-serif font-light text-base bg-transparent outline-none py-3 resize-none"
                  style={{
                    borderBottom: `1px solid ${textareaFocused ? "#6b7b6e" : "rgba(196,185,168,0.5)"}`,
                    color: "#2c2c2c",
                    transition: "border-color 700ms ease-in-out",
                    caretColor: "#6b7b6e",
                  }}
                />
              </div>

              <div>
                <label
                  className="font-serif font-light text-xs tracking-widest block mb-4"
                  style={{ color: "#a89279" }}
                >
                  选择 · Select Medium
                </label>
                <select
                  className="w-full font-serif font-light text-base bg-transparent outline-none py-3 appearance-none cursor-pointer"
                  style={{
                    borderBottom: "1px solid rgba(196,185,168,0.5)",
                    color: "#2c2c2c",
                    transition: "border-color 700ms ease-in-out",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderBottomColor = "#6b7b6e";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderBottomColor =
                      "rgba(196,185,168,0.5)";
                  }}
                >
                  <option value="">Select a medium...</option>
                  <option value="xuan">宣纸 · Xuan Paper</option>
                  <option value="silk">绢本 · Silk</option>
                  <option value="bamboo">竹简 · Bamboo Slip</option>
                </select>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Five Shades of Ink                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="shades" className="py-32 px-8" style={{ backgroundColor: "#f8f5f0" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-20">
            <p
              className="font-serif font-light text-xs tracking-widest uppercase mb-3"
              style={{ color: "#a89279" }}
            >
              Palette
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              墨分五色
            </h2>
            <p
              className="font-serif italic text-base mt-3"
              style={{ color: "#a89279" }}
            >
              Ink has five shades
            </p>
            <div
              className="mx-auto mt-8"
              style={{
                height: "1px",
                width: "48px",
                backgroundColor: "rgba(44,44,44,0.15)",
              }}
            />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {inkShades.map((shade, i) => (
              <RevealBlock key={shade.char} delay={i * 0.08}>
                <div
                  className="p-8 h-full min-h-64 flex flex-col justify-between cursor-default"
                  style={{
                    backgroundColor: shade.hex,
                    transition: "all 900ms ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.92";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <div>
                    <div
                      className="font-serif font-light"
                      style={{
                        fontSize: "3rem",
                        color: shade.textLight
                          ? "rgba(248,245,240,0.6)"
                          : "rgba(44,44,44,0.3)",
                        lineHeight: 1,
                      }}
                    >
                      {shade.char}
                    </div>
                    <div
                      className="font-serif font-light text-xs tracking-widest mt-3"
                      style={{
                        color: shade.textLight
                          ? "rgba(248,245,240,0.5)"
                          : "rgba(44,44,44,0.4)",
                      }}
                    >
                      {shade.pinyin}
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-serif text-base tracking-wider mb-3"
                      style={{
                        color: shade.textLight
                          ? "rgba(248,245,240,0.85)"
                          : "rgba(44,44,44,0.75)",
                      }}
                    >
                      {shade.english}
                    </div>
                    <div
                      className="font-serif font-light text-xs leading-relaxed"
                      style={{
                        color: shade.textLight
                          ? "rgba(248,245,240,0.5)"
                          : "rgba(44,44,44,0.5)",
                      }}
                    >
                      {shade.desc}
                    </div>
                    <div
                      className="font-serif font-light text-xs mt-4 tracking-widest"
                      style={{
                        color: shade.textLight
                          ? "rgba(248,245,240,0.35)"
                          : "rgba(44,44,44,0.3)",
                      }}
                    >
                      {shade.hex}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Landscape Demo (山水图)                                        */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="landscape"
        className="py-32 px-8"
        style={{ backgroundColor: "#f3efe8" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-20">
            <p
              className="font-serif font-light text-xs tracking-widest uppercase mb-3"
              style={{ color: "#a89279" }}
            >
              山水图 · Landscape Paintings
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              Three Studies
            </h2>
            <p
              className="font-serif font-light text-sm mt-3"
              style={{ color: "rgba(44,44,44,0.45)" }}
            >
              Ink on xuan paper · 墨于宣纸
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {landscapes.map((painting, i) => (
              <RevealBlock key={painting.title} delay={i * 0.12}>
                <div
                  className="overflow-hidden"
                  style={{
                    borderLeft: "1px solid rgba(44,44,44,0.1)",
                    backgroundColor: "#f8f5f0",
                    transition: "all 900ms ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor =
                      "rgba(44,44,44,0.35)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(44,44,44,0.015)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor =
                      "rgba(44,44,44,0.1)";
                    e.currentTarget.style.backgroundColor = "#f8f5f0";
                  }}
                >
                  {/* SVG painting area */}
                  <div
                    className="w-full overflow-hidden"
                    style={{ height: "200px" }}
                  >
                    {painting.svgContent}
                  </div>

                  {/* Caption */}
                  <div className="px-6 py-6">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span
                        className="font-serif font-light"
                        style={{
                          fontSize: "1.5rem",
                          color: "rgba(44,44,44,0.8)",
                        }}
                      >
                        {painting.title}
                      </span>
                      <span
                        className="font-serif font-light text-xs tracking-widest"
                        style={{ color: "#a89279" }}
                      >
                        {painting.titleEn}
                      </span>
                    </div>
                    <p
                      className="font-serif italic text-sm leading-loose"
                      style={{ color: "rgba(44,44,44,0.5)" }}
                    >
                      {painting.poem}
                    </p>
                    <p
                      className="font-serif font-light text-xs leading-loose mt-2"
                      style={{ color: "rgba(44,44,44,0.35)" }}
                    >
                      {painting.poemEn}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Typography Showcase                                           */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="typography"
        className="py-32 px-8"
        style={{ backgroundColor: "#f8f5f0" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-20">
            <p
              className="font-serif font-light text-xs tracking-widest uppercase mb-3"
              style={{ color: "#a89279" }}
            >
              Typography
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              书体 · The Written Form
            </h2>
          </RevealBlock>

          <div className="space-y-20">
            {/* Title */}
            <RevealBlock>
              <div
                className="grid grid-cols-12 items-start gap-8 pb-12"
                style={{ borderBottom: "1px solid rgba(44,44,44,0.08)" }}
              >
                <div className="col-span-3">
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ color: "#a89279" }}
                  >
                    标题 / Title
                  </span>
                </div>
                <div className="col-span-9">
                  <p
                    className="font-serif font-light tracking-widest"
                    style={{
                      fontSize: "2.5rem",
                      color: "#2c2c2c",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Mountains Hold the Mist
                  </p>
                  <p
                    className="font-serif font-light text-xs mt-3 tracking-widest"
                    style={{ color: "rgba(44,44,44,0.35)" }}
                  >
                    font-serif · font-light · text-4xl · tracking-widest
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Subtitle */}
            <RevealBlock>
              <div
                className="grid grid-cols-12 items-start gap-8 pb-12"
                style={{ borderBottom: "1px solid rgba(44,44,44,0.08)" }}
              >
                <div className="col-span-3">
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ color: "#a89279" }}
                  >
                    副标题 / Subtitle
                  </span>
                </div>
                <div className="col-span-9">
                  <p
                    className="font-serif italic text-xl tracking-wider"
                    style={{ color: "#a89279" }}
                  >
                    On the principle of formless form
                  </p>
                  <p
                    className="font-serif font-light text-xs mt-3 tracking-widest"
                    style={{ color: "rgba(44,44,44,0.35)" }}
                  >
                    font-serif · italic · text-xl · color: tea brown
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Body */}
            <RevealBlock>
              <div
                className="grid grid-cols-12 items-start gap-8 pb-12"
                style={{ borderBottom: "1px solid rgba(44,44,44,0.08)" }}
              >
                <div className="col-span-3">
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ color: "#a89279" }}
                  >
                    正文 / Body
                  </span>
                </div>
                <div className="col-span-9">
                  <p
                    className="font-serif font-light text-base leading-loose"
                    style={{ color: "rgba(44,44,44,0.8)" }}
                  >
                    The master's brush does not hesitate. Each stroke placed once,
                    with conviction — for ink cannot be recalled once it touches
                    paper. This irreversibility is not a limitation but a teaching.
                    Presence without revision. Action without second-guessing.
                  </p>
                  <p
                    className="font-serif font-light text-xs mt-3 tracking-widest"
                    style={{ color: "rgba(44,44,44,0.35)" }}
                  >
                    font-serif · font-light · leading-loose · opacity 80%
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Caption */}
            <RevealBlock>
              <div className="grid grid-cols-12 items-start gap-8">
                <div className="col-span-3">
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ color: "#a89279" }}
                  >
                    注释 / Caption
                  </span>
                </div>
                <div className="col-span-9">
                  <p
                    className="font-serif font-light text-sm"
                    style={{ color: "#c4b9a8" }}
                  >
                    Detail from an anonymous Song dynasty hanging scroll, ink on
                    silk, circa 11th century CE. Palace Museum collection.
                  </p>
                  <p
                    className="font-serif font-light text-xs mt-3 tracking-widest"
                    style={{ color: "rgba(44,44,44,0.35)" }}
                  >
                    font-serif · font-light · text-sm · color: sand
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. DO / DON'T (墨法)                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 px-8" style={{ backgroundColor: "#f3efe8" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-20">
            <p
              className="font-serif font-light text-xs tracking-widest uppercase mb-3"
              style={{ color: "#a89279" }}
            >
              墨法 · The Laws of Ink
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              Rules and Taboos
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* DO column */}
            <div>
              <RevealBlock className="mb-10">
                <div className="flex items-baseline gap-4">
                  <h3
                    className="font-serif font-light text-xl tracking-widest"
                    style={{ color: "rgba(44,44,44,0.85)" }}
                  >
                    笔法
                  </h3>
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ color: "#6b7b6e" }}
                  >
                    Proper Brushwork
                  </span>
                </div>
                <div
                  className="mt-3"
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(107,123,110,0.3)",
                  }}
                />
              </RevealBlock>

              <div className="space-y-6">
                {doRules.map((rule, i) => (
                  <RevealBlock key={rule.title} delay={i * 0.08}>
                    <div
                      className="p-6"
                      style={{
                        borderLeft: "2px solid rgba(107,123,110,0.3)",
                        backgroundColor: "#f8f5f0",
                        transition: "all 800ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor =
                          "rgba(107,123,110,0.8)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(107,123,110,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor =
                          "rgba(107,123,110,0.3)";
                        e.currentTarget.style.backgroundColor = "#f8f5f0";
                      }}
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <span
                          className="font-serif font-light text-base tracking-wider"
                          style={{ color: "#2c2c2c" }}
                        >
                          {rule.title}
                        </span>
                        <span
                          className="font-serif italic text-xs"
                          style={{ color: "#6b7b6e" }}
                        >
                          {rule.subtitle}
                        </span>
                      </div>
                      <p
                        className="font-serif font-light text-sm leading-loose"
                        style={{ color: "rgba(44,44,44,0.6)" }}
                      >
                        {rule.desc}
                      </p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* DON'T column */}
            <div>
              <RevealBlock className="mb-10">
                <div className="flex items-baseline gap-4">
                  <h3
                    className="font-serif font-light text-xl tracking-widest"
                    style={{ color: "rgba(44,44,44,0.85)" }}
                  >
                    忌讳
                  </h3>
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ color: "#a89279" }}
                  >
                    Taboos
                  </span>
                </div>
                <div
                  className="mt-3"
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(168,146,121,0.3)",
                  }}
                />
              </RevealBlock>

              <div className="space-y-6">
                {dontRules.map((rule, i) => (
                  <RevealBlock key={rule.title} delay={i * 0.08}>
                    <div
                      className="p-6 relative"
                      style={{
                        borderLeft: "2px solid rgba(168,146,121,0.3)",
                        backgroundColor: "#f8f5f0",
                        transition: "all 800ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor =
                          "rgba(168,146,121,0.7)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(168,146,121,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor =
                          "rgba(168,146,121,0.3)";
                        e.currentTarget.style.backgroundColor = "#f8f5f0";
                      }}
                    >
                      {/* Strikethrough line across the title */}
                      <div className="relative mb-2">
                        <div className="flex items-baseline gap-3">
                          <span
                            className="font-serif font-light text-base tracking-wider relative"
                            style={{
                              color: "rgba(44,44,44,0.4)",
                              textDecoration: "line-through",
                              textDecorationColor: "rgba(168,146,121,0.6)",
                            }}
                          >
                            {rule.title}
                          </span>
                          <span
                            className="font-serif italic text-xs"
                            style={{ color: "rgba(168,146,121,0.7)" }}
                          >
                            {rule.subtitle}
                          </span>
                        </div>
                      </div>
                      <p
                        className="font-serif font-light text-sm leading-loose"
                        style={{ color: "rgba(44,44,44,0.5)" }}
                      >
                        {rule.desc}
                      </p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. Empty Space Section (留白)                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-48 px-24"
        style={{ backgroundColor: "#f8f5f0" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <div
              className="mx-auto mb-16"
              style={{
                height: "1px",
                width: "32px",
                backgroundColor: "rgba(44,44,44,0.12)",
              }}
            />

            <p
              className="font-serif font-light text-xs tracking-widest mb-16"
              style={{ color: "rgba(44,44,44,0.25)" }}
            >
              留白 · The Principle of Emptiness
            </p>

            <blockquote>
              <p
                className="font-serif italic leading-loose"
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(44,44,44,0.55)",
                  letterSpacing: "0.02em",
                }}
              >
                &ldquo;知其白，守其黑&rdquo;
              </p>
              <p
                className="font-serif font-light text-base leading-loose mt-6"
                style={{ color: "rgba(44,44,44,0.4)" }}
              >
                Know the white, keep the black.
              </p>
              <p
                className="font-serif font-light text-sm mt-2"
                style={{ color: "rgba(44,44,44,0.28)" }}
              >
                — Laozi, Tao Te Ching, Chapter 28
              </p>
            </blockquote>

            <div
              className="mx-auto mt-16"
              style={{
                height: "1px",
                width: "32px",
                backgroundColor: "rgba(44,44,44,0.12)",
              }}
            />

            <p
              className="font-serif font-light text-xs tracking-widest mt-10 leading-loose"
              style={{ color: "rgba(44,44,44,0.3)" }}
            >
              This space is not empty.<br />
              It breathes. It waits. It means.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Additional: Color Palette Reference                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 px-8" style={{ backgroundColor: "#f3efe8" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p
              className="font-serif font-light text-xs tracking-widest uppercase mb-3"
              style={{ color: "#a89279" }}
            >
              色彩 · Color System
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              The Palette
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Xuan Paper", zh: "宣纸", hex: "#f8f5f0", textDark: true },
              { name: "Sand", zh: "沙", hex: "#c4b9a8", textDark: true },
              { name: "Tea Brown", zh: "茶", hex: "#a89279", textDark: false },
              { name: "Moss Green", zh: "苔", hex: "#6b7b6e", textDark: false },
              { name: "Clear Ink", zh: "清", hex: "#e8e4de", textDark: true },
              { name: "Light Ink", zh: "淡", hex: "#a8a8a8", textDark: false },
              { name: "Heavy Ink", zh: "重", hex: "#5a5a5a", textDark: false },
              { name: "Scorched", zh: "焦", hex: "#1a1a1a", textDark: false },
            ].map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.06}>
                <div
                  className="p-6 aspect-square flex flex-col justify-between"
                  style={{
                    backgroundColor: color.hex,
                    border: color.hex === "#f8f5f0" || color.hex === "#e8e4de"
                      ? "1px solid rgba(44,44,44,0.1)"
                      : "none",
                    transition: "opacity 800ms ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.88";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <span
                    className="font-serif font-light text-2xl"
                    style={{
                      color: color.textDark
                        ? "rgba(44,44,44,0.3)"
                        : "rgba(248,245,240,0.3)",
                    }}
                  >
                    {color.zh}
                  </span>
                  <div>
                    <div
                      className="font-serif font-light text-sm tracking-wider mb-1"
                      style={{
                        color: color.textDark
                          ? "rgba(44,44,44,0.75)"
                          : "rgba(248,245,240,0.75)",
                      }}
                    >
                      {color.name}
                    </div>
                    <div
                      className="font-serif font-light text-xs tracking-widest"
                      style={{
                        color: color.textDark
                          ? "rgba(44,44,44,0.4)"
                          : "rgba(248,245,240,0.4)",
                      }}
                    >
                      {color.hex}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Additional: Interaction States                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 px-8" style={{ backgroundColor: "#f8f5f0" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p
              className="font-serif font-light text-xs tracking-widest uppercase mb-3"
              style={{ color: "#a89279" }}
            >
              Interaction
            </p>
            <h2
              className="font-serif font-light tracking-widest"
              style={{ fontSize: "2.2rem", color: "rgba(44,44,44,0.85)" }}
            >
              The Ink Bleed Effect
            </h2>
            <p
              className="font-serif font-light text-sm mt-4 max-w-lg mx-auto leading-loose"
              style={{ color: "rgba(44,44,44,0.5)" }}
            >
              All interactions use slow ink-bleed transitions — 700ms to 1000ms.
              Color and opacity shift, but elements never translate or rotate on hover.
            </p>
          </RevealBlock>

          <RevealBlock className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hover demo 1 */}
            <div className="text-center space-y-4">
              <p
                className="font-serif font-light text-xs tracking-widest"
                style={{ color: "#a89279" }}
              >
                Background Bleed
              </p>
              <div
                className="p-8 cursor-pointer"
                style={{
                  backgroundColor: "#f8f5f0",
                  border: "1px solid rgba(44,44,44,0.1)",
                  transition: "all 900ms ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(44,44,44,0.06)";
                  e.currentTarget.style.borderColor = "rgba(44,44,44,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f5f0";
                  e.currentTarget.style.borderColor = "rgba(44,44,44,0.1)";
                }}
              >
                <p
                  className="font-serif font-light text-sm tracking-wider"
                  style={{ color: "rgba(44,44,44,0.7)" }}
                >
                  Hover to see ink bleed inward
                </p>
              </div>
            </div>

            {/* Hover demo 2 */}
            <div className="text-center space-y-4">
              <p
                className="font-serif font-light text-xs tracking-widest"
                style={{ color: "#a89279" }}
              >
                Opacity Shift
              </p>
              <div
                className="p-8 cursor-pointer"
                style={{
                  backgroundColor: "#2c2c2c",
                  transition: "opacity 900ms ease-in-out",
                  opacity: 0.7,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                }}
              >
                <p
                  className="font-serif font-light text-sm tracking-wider"
                  style={{ color: "rgba(248,245,240,0.7)" }}
                >
                  Ink deepens on hover
                </p>
              </div>
            </div>

            {/* Hover demo 3 */}
            <div className="text-center space-y-4">
              <p
                className="font-serif font-light text-xs tracking-widest"
                style={{ color: "#a89279" }}
              >
                Border Reveal
              </p>
              <div
                className="p-8 cursor-pointer"
                style={{
                  backgroundColor: "#f8f5f0",
                  borderLeft: "2px solid rgba(107,123,110,0.15)",
                  transition: "all 900ms ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor =
                    "rgba(107,123,110,0.9)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(107,123,110,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor =
                    "rgba(107,123,110,0.15)";
                  e.currentTarget.style.backgroundColor = "#f8f5f0";
                }}
              >
                <p
                  className="font-serif font-light text-sm tracking-wider"
                  style={{ color: "rgba(44,44,44,0.7)" }}
                >
                  Moss border emerges slowly
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 9. Footer                                                        */}
      {/* ---------------------------------------------------------------- */}
      <footer
        className="py-16 px-8"
        style={{
          backgroundColor: "#f8f5f0",
          borderTop: "1px solid rgba(44,44,44,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span
              className="font-serif font-light tracking-widest text-xs"
              style={{ color: "#a89279" }}
            >
              水墨 · Ink Wash
            </span>
            <span
              className="font-serif font-light text-xs ml-6 tracking-widest"
              style={{ color: "rgba(44,44,44,0.25)" }}
            >
              StyleKit · {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <span
              className="font-serif font-light text-xs tracking-widest"
              style={{ color: "rgba(44,44,44,0.25)" }}
            >
              墨分五色 · 计白当黑
            </span>
            <Link
              href="/"
              className="font-serif font-light text-xs tracking-widest"
              style={{
                color: "rgba(44,44,44,0.4)",
                borderBottom: "1px solid rgba(44,44,44,0.15)",
                paddingBottom: "1px",
                transition: "all 700ms ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(44,44,44,0.8)";
                e.currentTarget.style.borderBottomColor =
                  "rgba(44,44,44,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(44,44,44,0.4)";
                e.currentTarget.style.borderBottomColor =
                  "rgba(44,44,44,0.15)";
              }}
            >
              All Styles →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
