"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      options,
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Components                                                     */
/* ------------------------------------------------------------------ */

function HexagramSVG({
  size = 200,
  goldOpacity = 0.9,
  className = "",
}: {
  size?: number;
  goldOpacity?: number;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  // Two equilateral triangles forming a hexagram
  const tri1 = Array.from({ length: 3 }, (_, i) => {
    const angle = (i * 120 - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  const tri2 = Array.from({ length: 3 }, (_, i) => {
    const angle = (i * 120 + 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer concentric circles */}
      <circle cx={cx} cy={cy} r={size * 0.47} stroke="#fbbf24" strokeWidth="0.8" strokeOpacity={goldOpacity * 0.5} fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.42} stroke="#fbbf24" strokeWidth="0.4" strokeOpacity={goldOpacity * 0.3} fill="none" strokeDasharray="4 3" />
      <circle cx={cx} cy={cy} r={size * 0.38} stroke="#fbbf24" strokeWidth="1" strokeOpacity={goldOpacity * 0.6} fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.22} stroke="#818cf8" strokeWidth="0.8" strokeOpacity={0.6} fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.12} stroke="#fbbf24" strokeWidth="1.2" strokeOpacity={goldOpacity * 0.8} fill="none" />

      {/* Hexagram triangles */}
      <polygon points={tri1} stroke="#fbbf24" strokeWidth="1.2" strokeOpacity={goldOpacity} fill="#fbbf24" fillOpacity="0.05" />
      <polygon points={tri2} stroke="#818cf8" strokeWidth="1.2" strokeOpacity={0.7} fill="#818cf8" fillOpacity="0.04" />

      {/* Cardinal tick marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const r1 = size * 0.44;
        const r2 = size * (i % 3 === 0 ? 0.40 : 0.42);
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(angle)}
            y1={cy + r1 * Math.sin(angle)}
            x2={cx + r2 * Math.cos(angle)}
            y2={cy + r2 * Math.sin(angle)}
            stroke="#fbbf24"
            strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
            strokeOpacity={goldOpacity * 0.7}
          />
        );
      })}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.025} fill="#fbbf24" fillOpacity={goldOpacity} />
    </svg>
  );
}

function PentagramSVG({ size = 180 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  // Draw pentagram lines: connect every other vertex
  const starPaths = [0, 2, 4, 1, 3, 0].map((i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <circle cx={cx} cy={cy} r={size * 0.46} stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.5" fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.38} stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.3" fill="none" strokeDasharray="3 3" />
      <circle cx={cx} cy={cy} r={size * 0.18} stroke="#818cf8" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />

      <polyline
        points={starPaths.join(" ")}
        stroke="#fbbf24"
        strokeWidth="1.2"
        strokeOpacity="0.85"
        fill="#fbbf24"
        fillOpacity="0.06"
        strokeLinejoin="miter"
      />

      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r={size * 0.02} fill="#fbbf24" fillOpacity="0.7" />;
      })}
    </svg>
  );
}

function BindingRingsSVG({ size = 180 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const offset = size * 0.12;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      {/* Three overlapping rings */}
      <circle cx={cx - offset} cy={cy} r={size * 0.3} stroke="#fbbf24" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
      <circle cx={cx + offset} cy={cy} r={size * 0.3} stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
      <circle cx={cx} cy={cy - offset * 0.6} r={size * 0.3} stroke="#e2e8f0" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

      {/* Central connection point */}
      <circle cx={cx} cy={cy} r={size * 0.08} stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.6" fill="#fbbf24" fillOpacity="0.08" />
      <circle cx={cx} cy={cy} r={size * 0.025} fill="#fbbf24" fillOpacity="0.9" />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={size * 0.46} stroke="#fbbf24" strokeWidth="0.6" strokeOpacity="0.25" fill="none" strokeDasharray="6 4" />
    </svg>
  );
}

function WardingStarSVG({ size = 180 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.38;
  const innerR = size * 0.18;

  // 8-point star
  const starPoints = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 - 90) * (Math.PI / 180);
    const r = i % 2 === 0 ? outerR : innerR;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <circle cx={cx} cy={cy} r={size * 0.46} stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.45" fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.42} stroke="#fbbf24" strokeWidth="0.4" strokeOpacity="0.25" fill="none" strokeDasharray="4 4" />

      <polygon
        points={starPoints}
        stroke="#fbbf24"
        strokeWidth="1.2"
        strokeOpacity="0.85"
        fill="#fbbf24"
        fillOpacity="0.06"
        strokeLinejoin="round"
      />

      {/* Inner circle */}
      <circle cx={cx} cy={cy} r={size * 0.12} stroke="#818cf8" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.025} fill="#818cf8" fillOpacity="0.9" />

      {/* Rune tick marks at 8 outer points */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180);
        const x = cx + outerR * Math.cos(angle);
        const y = cy + outerR * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r={size * 0.018} fill="#fbbf24" fillOpacity="0.6" />;
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const PALETTE = [
  { name: "Deep Indigo", hex: "#1e1b4b", glow: "rgba(30,27,75,0.9)" },
  { name: "Void Black", hex: "#0a0920", glow: "rgba(10,9,32,0.9)" },
  { name: "Arcane Gold", hex: "#fbbf24", glow: "rgba(251,191,36,0.6)" },
  { name: "Silver Light", hex: "#e2e8f0", glow: "rgba(226,232,240,0.5)" },
  { name: "Soft Indigo", hex: "#818cf8", glow: "rgba(129,140,248,0.6)" },
];

const SIGIL_TABS = ["Summoning", "Binding", "Warding"] as const;
type SigilTab = (typeof SIGIL_TABS)[number];

const ARCANA_RULES = [
  {
    label: "DO",
    title: "INVOKE CONCENTRIC GEOMETRY",
    body: "Layer circles within circles. Every ring carries meaning — each radius calibrated to the golden ratio. Precision geometry is the language of power.",
    good: true,
  },
  {
    label: "DO",
    title: "GLOW FROM WITHIN",
    body: "Gold light should emanate outward from every element. Use layered box-shadows to simulate arcane luminescence — bright at center, fading at edge.",
    good: true,
  },
  {
    label: "DO NOT",
    title: "USE FLAT OR COLORLESS BORDERS",
    body: "Plain gray borders shatter the illusion. Every boundary must carry light. Use gold or indigo borders with at least 15% opacity glow.",
    good: false,
  },
  {
    label: "DO NOT",
    title: "CROWD THE VOID",
    body: "Dark negative space is sacred. It is not emptiness — it is potential. Leave the void intact so geometry can breathe and glow can radiate.",
    good: false,
  },
];

const SPACING_SCALES = [
  { label: "TRACKING-WIDEST", value: "0.3em", example: "ARCANE INSCRIPTION" },
  { label: "TRACKING-WIDE", value: "0.15em", example: "SUMMONING GLYPH" },
  { label: "TRACKING-NORMAL", value: "0em", example: "BODY INCANTATION" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const [activeTab, setActiveTab] = useState<SigilTab>("Summoning");
  const [casting, setCasting] = useState(false);

  function handleCast() {
    setCasting(true);
    setTimeout(() => setCasting(false), 2500);
  }

  return (
    <div className="min-h-screen bg-[#0a0920] relative overflow-x-hidden">
      {/* Fixed ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,191,36,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(129,140,248,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(129,140,248,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Fixed background concentric rings (decorative) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[900px] h-[900px]">
        <div
          className="absolute inset-0 border border-[#fbbf24]/[0.03] rounded-full animate-spin"
          style={{ animationDuration: "60s" }}
        />
        <div
          className="absolute inset-[80px] border border-dashed border-[#818cf8]/[0.025] rounded-full animate-spin"
          style={{ animationDuration: "80s", animationDirection: "reverse" }}
        />
        <div
          className="absolute inset-[180px] border border-[#fbbf24]/[0.02] rounded-full animate-spin"
          style={{ animationDuration: "100s" }}
        />
        <div className="absolute inset-[300px] border border-dotted border-[#e2e8f0]/[0.015] rounded-full" />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 1. NAVIGATION                                                     */}
      {/* ---------------------------------------------------------------- */}
      <nav className="relative z-20 border-b border-[#fbbf24]/20 bg-[#0a0920]/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/styles/magic-circle"
            className="group flex items-center gap-2 text-[#e2e8f0]/60 hover:text-[#fbbf24] transition-colors text-sm font-mono tracking-wide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Docs
          </Link>

          <span
            className="font-mono font-bold text-lg tracking-[0.25em] uppercase"
            style={{
              color: "#fbbf24",
              textShadow: "0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.2)",
            }}
          >
            MAGIC CIRCLE
          </span>

          <div className="flex items-center gap-1">
            {/* Small decorative hexagram in nav */}
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="#fbbf24" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
              <polygon
                points="10,2.5 16.5,14 3.5,14"
                stroke="#fbbf24"
                strokeWidth="0.8"
                strokeOpacity="0.5"
                fill="none"
              />
              <polygon
                points="10,17.5 3.5,6 16.5,6"
                stroke="#818cf8"
                strokeWidth="0.8"
                strokeOpacity="0.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. HERO                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        {/* Animated magic circle */}
        <div className="relative mb-16 flex items-center justify-center">
          {/* Counter-rotating outer ring */}
          <div
            className="absolute w-[380px] h-[380px] animate-spin"
            style={{ animationDuration: "25s", animationDirection: "reverse" }}
          >
            <svg width="380" height="380" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="190"
                cy="190"
                r="186"
                stroke="#fbbf24"
                strokeWidth="1"
                strokeOpacity="0.35"
                fill="none"
                strokeDasharray="8 6"
              />
              {/* Outer rune placeholders */}
              {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 15) * (Math.PI / 180);
                const x = 190 + 180 * Math.cos(angle);
                const y = 190 + 180 * Math.sin(angle);
                const chars = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ"];
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fill="#fbbf24"
                    fillOpacity="0.45"
                    transform={`rotate(${i * 15}, ${x}, ${y})`}
                  >
                    {chars[i]}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Rotating inner ring */}
          <div
            className="absolute w-[300px] h-[300px] animate-spin"
            style={{ animationDuration: "20s" }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="150"
                cy="150"
                r="146"
                stroke="#818cf8"
                strokeWidth="0.8"
                strokeOpacity="0.4"
                fill="none"
                strokeDasharray="3 5"
              />
              {/* Inner rune marks */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const x = 150 + 140 * Math.cos(angle);
                const y = 150 + 140 * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 3 === 0 ? 3 : 1.5}
                    fill="#818cf8"
                    fillOpacity={i % 3 === 0 ? 0.6 : 0.35}
                  />
                );
              })}
            </svg>
          </div>

          {/* Static central hexagram */}
          <div className="relative z-10">
            <HexagramSVG size={220} goldOpacity={0.9} />
          </div>

          {/* Central glow pulse */}
          <div
            className="absolute w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Hero text */}
        <div
          ref={heroRef}
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
          className="text-center"
        >
          <h1
            className="font-mono font-bold tracking-[0.3em] uppercase mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#fbbf24",
              textShadow:
                "0 0 30px rgba(251,191,36,0.6), 0 0 60px rgba(251,191,36,0.3), 0 0 100px rgba(251,191,36,0.15)",
            }}
          >
            MAGIC CIRCLE
          </h1>
          <p
            className="font-mono tracking-[0.15em] uppercase mb-2 text-sm"
            style={{ color: "#818cf8", textShadow: "0 0 10px rgba(129,140,248,0.4)" }}
          >
            魔法阵风 / Arcane Precision Geometry
          </p>
          <p className="text-[#e2e8f0]/40 font-mono text-xs tracking-widest mb-10">
            ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCast}
              disabled={casting}
              className="relative flex items-center gap-3 px-8 py-3 border font-mono text-sm tracking-widest uppercase transition-all duration-500 disabled:cursor-not-allowed"
              style={{
                background: casting
                  ? "rgba(251,191,36,0.1)"
                  : "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)",
                borderColor: "rgba(251,191,36,0.5)",
                color: "#fbbf24",
                boxShadow: casting
                  ? "0 0 40px rgba(251,191,36,0.4), inset 0 0 20px rgba(251,191,36,0.1)"
                  : "0 0 20px rgba(251,191,36,0.2)",
              }}
            >
              {casting ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="animate-spin"
                    style={{ animationDuration: "1s" }}
                  >
                    <circle cx="8" cy="8" r="6" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                    <path d="M8 2 A6 6 0 0 1 14 8" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                  CASTING...
                </>
              ) : (
                "INVOKE RITUAL"
              )}
            </button>
            <button
              className="px-8 py-3 border font-mono text-sm tracking-widest uppercase transition-all duration-500"
              style={{
                borderColor: "rgba(129,140,248,0.35)",
                color: "#818cf8",
                boxShadow: "0 0 12px rgba(129,140,248,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 25px rgba(129,140,248,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px rgba(129,140,248,0.15)";
              }}
            >
              OBSERVE SIGIL
            </button>
          </div>
        </div>
      </section>

      {/* Runic divider */}
      <div className="relative z-10 max-w-4xl mx-auto flex items-center gap-6 px-6 py-2">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.2))" }} />
        <span className="text-[#fbbf24]/20 font-mono text-[9px] tracking-[6px]">ᚠ ᚢ ᚦ ᚨ ᚱ</span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(251,191,36,0.2))" }} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. SIGIL GALLERY — Tab Switcher                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[8px] uppercase text-[#fbbf24]/40 mb-3">ARCANUM II</p>
            <h2
              className="font-mono font-bold text-3xl md:text-4xl tracking-[0.2em] uppercase"
              style={{ color: "#e2e8f0", textShadow: "0 0 20px rgba(226,232,240,0.1)" }}
            >
              SIGIL GALLERY
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex justify-center gap-0 mb-10 border border-[#fbbf24]/20">
              {SIGIL_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
                  style={{
                    background:
                      activeTab === tab
                        ? "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))"
                        : "transparent",
                    color: activeTab === tab ? "#fbbf24" : "rgba(226,232,240,0.4)",
                    borderRight: tab !== "Warding" ? "1px solid rgba(251,191,36,0.2)" : "none",
                    boxShadow: activeTab === tab ? "inset 0 0 20px rgba(251,191,36,0.08)" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Sigil cards */}
          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Summoning card */}
              <div
                className="p-8 flex flex-col items-center gap-6 border transition-all duration-500"
                style={{
                  background: "#0f0e1a",
                  borderColor:
                    activeTab === "Summoning"
                      ? "rgba(251,191,36,0.45)"
                      : "rgba(251,191,36,0.12)",
                  boxShadow:
                    activeTab === "Summoning"
                      ? "0 0 40px rgba(251,191,36,0.15), inset 0 0 30px rgba(251,191,36,0.04)"
                      : "0 0 10px rgba(251,191,36,0.05)",
                }}
              >
                <div className="relative">
                  <PentagramSVG size={150} />
                  {activeTab === "Summoning" && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.08) 0%, transparent 70%)",
                      }}
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-sm tracking-[0.2em] uppercase mb-2" style={{ color: "#fbbf24" }}>
                    SUMMONING
                  </p>
                  <p className="font-mono text-xs text-[#e2e8f0]/40 leading-relaxed">
                    Five-pointed star anchors the entity within the circle of calling
                  </p>
                </div>
              </div>

              {/* Binding card */}
              <div
                className="p-8 flex flex-col items-center gap-6 border transition-all duration-500"
                style={{
                  background: "#0f0e1a",
                  borderColor:
                    activeTab === "Binding"
                      ? "rgba(129,140,248,0.55)"
                      : "rgba(251,191,36,0.12)",
                  boxShadow:
                    activeTab === "Binding"
                      ? "0 0 40px rgba(129,140,248,0.2), inset 0 0 30px rgba(129,140,248,0.05)"
                      : "0 0 10px rgba(251,191,36,0.05)",
                }}
              >
                <div className="relative">
                  <BindingRingsSVG size={150} />
                  {activeTab === "Binding" && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(129,140,248,0.1) 0%, transparent 70%)",
                      }}
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-sm tracking-[0.2em] uppercase mb-2" style={{ color: "#818cf8" }}>
                    BINDING
                  </p>
                  <p className="font-mono text-xs text-[#e2e8f0]/40 leading-relaxed">
                    Interlocked rings chain the summoned will to the caster's intent
                  </p>
                </div>
              </div>

              {/* Warding card */}
              <div
                className="p-8 flex flex-col items-center gap-6 border transition-all duration-500"
                style={{
                  background: "#0f0e1a",
                  borderColor:
                    activeTab === "Warding"
                      ? "rgba(226,232,240,0.35)"
                      : "rgba(251,191,36,0.12)",
                  boxShadow:
                    activeTab === "Warding"
                      ? "0 0 40px rgba(226,232,240,0.1), inset 0 0 30px rgba(226,232,240,0.03)"
                      : "0 0 10px rgba(251,191,36,0.05)",
                }}
              >
                <div className="relative">
                  <WardingStarSVG size={150} />
                  {activeTab === "Warding" && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(226,232,240,0.06) 0%, transparent 70%)",
                      }}
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-sm tracking-[0.2em] uppercase mb-2" style={{ color: "#e2e8f0" }}>
                    WARDING
                  </p>
                  <p className="font-mono text-xs text-[#e2e8f0]/40 leading-relaxed">
                    Eight-pointed star deflects hostile forces from the protected domain
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Runic divider */}
      <div className="relative z-10 max-w-4xl mx-auto flex items-center gap-6 px-6 py-2">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(129,140,248,0.2))" }} />
        <HexagramSVG size={20} goldOpacity={0.4} />
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(129,140,248,0.2))" }} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. COLOR SYSTEM — glowing orbs                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[8px] uppercase text-[#fbbf24]/40 mb-3">ARCANUM III</p>
            <h2
              className="font-mono font-bold text-3xl md:text-4xl tracking-[0.2em] uppercase"
              style={{ color: "#e2e8f0", textShadow: "0 0 20px rgba(226,232,240,0.1)" }}
            >
              ELEMENTAL PALETTE
            </h2>
          </RevealBlock>

          <div className="flex flex-wrap justify-center gap-8">
            {PALETTE.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08} className="flex flex-col items-center gap-4">
                {/* Glowing orb */}
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${color.hex}ee, ${color.hex}88)`,
                    boxShadow: `0 0 30px ${color.glow}, 0 0 60px ${color.glow.replace("0.9", "0.25")}, inset 0 0 20px rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Inner highlight */}
                  <div
                    className="absolute w-8 h-8 rounded-full top-3 left-4 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
                    }}
                  />
                  <span className="font-mono text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                    ◆
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs font-bold tracking-wide uppercase mb-1" style={{ color: "#e2e8f0" }}>
                    {color.name}
                  </p>
                  <p className="font-mono text-[10px]" style={{ color: "#fbbf24", opacity: 0.7 }}>
                    {color.hex}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. COMPONENT SHOWCASE                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[8px] uppercase text-[#fbbf24]/40 mb-3">ARCANUM IV</p>
            <h2
              className="font-mono font-bold text-3xl md:text-4xl tracking-[0.2em] uppercase"
              style={{ color: "#e2e8f0" }}
            >
              COMPONENTS
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <RevealBlock>
              <div
                className="p-8 border"
                style={{
                  background: "#0f0e1a",
                  borderColor: "rgba(251,191,36,0.2)",
                  boxShadow: "0 0 20px rgba(251,191,36,0.05)",
                }}
              >
                <p className="font-mono text-[10px] tracking-[6px] uppercase text-[#fbbf24]/50 mb-6">
                  INVOCATION VARIANTS
                </p>

                <div className="flex flex-col gap-4">
                  {/* Primary */}
                  <button
                    className="w-full px-6 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-400"
                    style={{
                      background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.08))",
                      border: "1px solid rgba(251,191,36,0.55)",
                      color: "#fbbf24",
                      boxShadow: "0 0 25px rgba(251,191,36,0.25), inset 0 0 15px rgba(251,191,36,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 40px rgba(251,191,36,0.45), inset 0 0 20px rgba(251,191,36,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 25px rgba(251,191,36,0.25), inset 0 0 15px rgba(251,191,36,0.05)";
                    }}
                  >
                    PRIMARY — GOLD GLOW
                  </button>

                  {/* Secondary */}
                  <button
                    className="w-full px-6 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-400"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(226,232,240,0.3)",
                      color: "#e2e8f0",
                      boxShadow: "0 0 12px rgba(226,232,240,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 20px rgba(226,232,240,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 12px rgba(226,232,240,0.05)";
                    }}
                  >
                    SECONDARY — SILVER OUTLINE
                  </button>

                  {/* Danger */}
                  <button
                    className="w-full px-6 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-400"
                    style={{
                      background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.06))",
                      border: "1px solid rgba(239,68,68,0.45)",
                      color: "#ef4444",
                      boxShadow: "0 0 20px rgba(239,68,68,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 35px rgba(239,68,68,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 20px rgba(239,68,68,0.2)";
                    }}
                  >
                    DANGER — BLOOD SEAL
                  </button>

                  {/* Casting state */}
                  <button
                    disabled
                    className="w-full px-6 py-3 font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-3"
                    style={{
                      background: "rgba(129,140,248,0.08)",
                      border: "1px solid rgba(129,140,248,0.35)",
                      color: "#818cf8",
                      boxShadow: "0 0 20px rgba(129,140,248,0.15)",
                      opacity: 0.8,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="animate-spin"
                      style={{ animationDuration: "1.2s" }}
                    >
                      <circle cx="7" cy="7" r="5.5" stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                      <path d="M7 1.5 A5.5 5.5 0 0 1 12.5 7" stroke="#818cf8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                    CASTING...
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Card + Input */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 border relative overflow-hidden"
                style={{
                  background: "#0f0e1a",
                  borderColor: "rgba(251,191,36,0.2)",
                  boxShadow: "0 0 20px rgba(251,191,36,0.05)",
                }}
              >
                {/* Inner geometric decoration */}
                <div className="absolute top-4 right-4 opacity-20">
                  <HexagramSVG size={60} goldOpacity={0.6} />
                </div>

                <p className="font-mono text-[10px] tracking-[6px] uppercase text-[#fbbf24]/50 mb-6">
                  ARCANE CARD + INPUT
                </p>

                {/* Sample card */}
                <div
                  className="p-5 border mb-6 relative"
                  style={{
                    background: "rgba(30,27,75,0.4)",
                    borderColor: "rgba(251,191,36,0.2)",
                    boxShadow: "inset 0 0 30px rgba(251,191,36,0.03)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: "rgba(251,191,36,0.3)",
                        background: "rgba(251,191,36,0.06)",
                      }}
                    >
                      <span style={{ color: "#fbbf24", fontSize: "14px" }}>✦</span>
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#fbbf24" }}>
                        ARCANE ARTIFACT
                      </p>
                      <p className="font-mono text-[11px] text-[#e2e8f0]/50 leading-relaxed">
                        An item imbued with residual magic from ancient circles, radiating gold light.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="space-y-3">
                  <label className="font-mono text-[10px] tracking-[5px] uppercase block" style={{ color: "rgba(251,191,36,0.5)" }}>
                    SPEAK THE INCANTATION
                  </label>
                  <input
                    type="text"
                    placeholder="Enter arcane phrase..."
                    className="w-full px-4 py-3 font-mono text-sm outline-none transition-all duration-300"
                    style={{
                      background: "rgba(10,9,32,0.8)",
                      border: "1px solid rgba(251,191,36,0.2)",
                      color: "#e2e8f0",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(251,191,36,0.6)";
                      (e.currentTarget as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(251,191,36,0.12), 0 0 20px rgba(251,191,36,0.15)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(251,191,36,0.2)";
                      (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. INSCRIPTION / TYPOGRAPHY                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[8px] uppercase text-[#fbbf24]/40 mb-3">ARCANUM V</p>
            <h2
              className="font-mono font-bold text-3xl md:text-4xl tracking-[0.2em] uppercase"
              style={{ color: "#e2e8f0" }}
            >
              INSCRIPTION SCALES
            </h2>
          </RevealBlock>

          <div className="space-y-6">
            {/* Display heading */}
            <RevealBlock>
              <div
                className="p-8 border"
                style={{
                  background: "#0f0e1a",
                  borderColor: "rgba(251,191,36,0.15)",
                }}
              >
                <p className="font-mono text-[9px] tracking-[6px] uppercase text-[#fbbf24]/35 mb-4">
                  DISPLAY — font-mono tracking-[0.3em] uppercase
                </p>
                <p
                  className="font-mono uppercase leading-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                    letterSpacing: "0.3em",
                    color: "#fbbf24",
                    textShadow: "0 0 25px rgba(251,191,36,0.4), 0 0 50px rgba(251,191,36,0.15)",
                  }}
                >
                  ARCANE INSCRIPTION
                </p>
              </div>
            </RevealBlock>

            {/* Spacing scale samples */}
            {SPACING_SCALES.map((scale, i) => (
              <RevealBlock key={scale.label} delay={i * 0.08}>
                <div
                  className="p-6 border flex flex-col md:flex-row md:items-center gap-4"
                  style={{
                    background: "#0f0e1a",
                    borderColor: "rgba(251,191,36,0.1)",
                  }}
                >
                  <div className="w-full md:w-48 flex-shrink-0">
                    <p className="font-mono text-[9px] tracking-[4px] uppercase" style={{ color: "rgba(251,191,36,0.4)" }}>
                      {scale.label}
                    </p>
                    <p className="font-mono text-[9px]" style={{ color: "rgba(129,140,248,0.6)" }}>
                      {scale.value}
                    </p>
                  </div>
                  <p
                    className="font-mono text-base uppercase"
                    style={{
                      letterSpacing: scale.value,
                      color: "#e2e8f0",
                    }}
                  >
                    {scale.example}
                  </p>
                </div>
              </RevealBlock>
            ))}

            {/* Body text example */}
            <RevealBlock delay={0.3}>
              <div
                className="p-8 border"
                style={{
                  background: "#0f0e1a",
                  borderColor: "rgba(129,140,248,0.15)",
                }}
              >
                <p className="font-mono text-[9px] tracking-[6px] uppercase mb-4" style={{ color: "rgba(129,140,248,0.4)" }}>
                  BODY — readable silver for extended content
                </p>
                <p className="font-mono text-sm leading-7" style={{ color: "rgba(226,232,240,0.55)" }}>
                  The circle is not merely a shape — it is the boundary between the known and the unknown, between the summoner and the summoned. Within its perfect geometry lies the capacity to channel forces beyond ordinary comprehension. Each inscribed rune serves as a node of intent, and together they form a lattice of will made manifest.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. DESIGN ARCANA — Do / Don't spell scrolls                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-mono text-[10px] tracking-[8px] uppercase text-[#fbbf24]/40 mb-3">ARCANUM VI</p>
            <h2
              className="font-mono font-bold text-3xl md:text-4xl tracking-[0.2em] uppercase"
              style={{ color: "#e2e8f0" }}
            >
              DESIGN ARCANA
            </h2>
            <p className="font-mono text-xs text-[#e2e8f0]/30 mt-3 tracking-wide">
              Sacred laws of the magic circle aesthetic
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {ARCANA_RULES.map((rule, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div
                  className="relative border overflow-hidden"
                  style={{
                    background: "#0f0e1a",
                    borderColor: rule.good
                      ? "rgba(251,191,36,0.25)"
                      : "rgba(239,68,68,0.25)",
                    boxShadow: rule.good
                      ? "0 0 20px rgba(251,191,36,0.06)"
                      : "0 0 20px rgba(239,68,68,0.06)",
                  }}
                >
                  {/* Ornate SVG top border decoration */}
                  <div className="w-full h-1" style={{ background: rule.good ? "linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)" : "linear-gradient(to right, transparent, rgba(239,68,68,0.4), transparent)" }} />

                  {/* Scroll content */}
                  <div className="p-7">
                    {/* Label badge */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="px-3 py-1 font-mono text-[9px] tracking-[4px] uppercase"
                        style={{
                          background: rule.good
                            ? "rgba(251,191,36,0.1)"
                            : "rgba(239,68,68,0.1)",
                          border: `1px solid ${rule.good ? "rgba(251,191,36,0.3)" : "rgba(239,68,68,0.3)"}`,
                          color: rule.good ? "#fbbf24" : "#ef4444",
                        }}
                      >
                        {rule.label}
                      </div>
                      {/* Corner hex */}
                      <svg width="14" height="14" viewBox="0 0 14 14" style={{ opacity: 0.4 }}>
                        <polygon
                          points="7,1 13,4 13,10 7,13 1,10 1,4"
                          stroke={rule.good ? "#fbbf24" : "#ef4444"}
                          strokeWidth="1"
                          fill="none"
                        />
                      </svg>
                    </div>

                    <h3
                      className="font-mono font-bold text-sm tracking-[0.15em] uppercase mb-3"
                      style={{ color: rule.good ? "#fbbf24" : "#ef4444" }}
                    >
                      {rule.title}
                    </h3>

                    <p className="font-mono text-xs text-[#e2e8f0]/50 leading-relaxed">
                      {rule.body}
                    </p>
                  </div>

                  {/* Bottom ornate border */}
                  <div className="w-full h-px" style={{ background: rule.good ? "linear-gradient(to right, transparent, rgba(251,191,36,0.2), transparent)" : "linear-gradient(to right, transparent, rgba(239,68,68,0.2), transparent)" }} />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. FOOTER                                                        */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative z-10 py-16 px-6 border-t border-[#fbbf24]/10">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
          {/* Small magic circle */}
          <div className="relative">
            <HexagramSVG size={80} goldOpacity={0.5} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.1) 0%, transparent 60%)",
              }}
            />
          </div>

          <div className="text-center">
            <p
              className="font-mono text-xs tracking-[0.4em] uppercase mb-3"
              style={{
                color: "#fbbf24",
                textShadow: "0 0 15px rgba(251,191,36,0.3)",
              }}
            >
              MAGIC CIRCLE SYSTEM
            </p>
            <p className="font-mono text-[10px] text-[#e2e8f0]/25 tracking-widest">
              PART OF{" "}
              <Link
                href="/styles"
                className="transition-colors"
                style={{ color: "rgba(251,191,36,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fbbf24";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 10px rgba(251,191,36,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(251,191,36,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                STYLEKIT
              </Link>
            </p>
          </div>

          {/* Rune row */}
          <p className="font-mono text-[10px] tracking-[8px]" style={{ color: "rgba(251,191,36,0.12)" }}>
            ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ
          </p>
        </div>
      </footer>
    </div>
  );
}
