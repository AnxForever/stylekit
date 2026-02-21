"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const vhsPalette = [
  { name: "MAGENTA", hex: "#ff00ff", label: "Primary", glow: "rgba(255,0,255,0.5)" },
  { name: "BLACK", hex: "#000000", label: "Secondary", glow: "rgba(255,0,255,0.2)" },
  { name: "CYAN", hex: "#00ffff", label: "Accent", glow: "rgba(0,255,255,0.5)" },
  { name: "YELLOW", hex: "#ffff00", label: "Timestamp", glow: "rgba(255,255,0,0.5)" },
  { name: "GREEN", hex: "#00ff00", label: "Signal", glow: "rgba(0,255,0,0.5)" },
  { name: "DEEP PURPLE", hex: "#1a0a2e", label: "Surface", glow: "rgba(26,10,46,0.8)" },
];

const tapeCollection = [
  {
    title: "MIDNIGHT.AVI",
    genre: "NIGHT DRIVE",
    year: "1989",
    duration: "02:14:33",
    color: "#ff00ff",
    glow: "rgba(255,0,255,0.4)",
    side: "A",
  },
  {
    title: "SUMMER_88.MOV",
    genre: "HOME VIDEO",
    year: "1988",
    duration: "01:47:12",
    color: "#00ffff",
    glow: "rgba(0,255,255,0.4)",
    side: "B",
  },
  {
    title: "ARCADE_NITE.VHS",
    genre: "ENTERTAINMENT",
    year: "1987",
    duration: "00:58:45",
    color: "#ffff00",
    glow: "rgba(255,255,0,0.4)",
    side: "A",
  },
  {
    title: "NEON_RAIN.AVI",
    genre: "ATMOSPHERE",
    year: "1991",
    duration: "01:22:08",
    color: "#00ff00",
    glow: "rgba(0,255,0,0.4)",
    side: "B",
  },
  {
    title: "CITY_LIGHTS.VHS",
    genre: "URBAN CAPTURE",
    year: "1993",
    duration: "03:05:19",
    color: "#ff00ff",
    glow: "rgba(255,0,255,0.4)",
    side: "A",
  },
  {
    title: "NEW_YEAR_90.MOV",
    genre: "SPECIAL EVENT",
    year: "1990",
    duration: "01:58:00",
    color: "#00ffff",
    glow: "rgba(0,255,255,0.4)",
    side: "B",
  },
];

const doRules = [
  "Use monospace fonts exclusively — font-mono for ALL text elements",
  "Apply scanline overlay via repeating-linear-gradient on all dark surfaces",
  "Chromatic aberration: textShadow with -2px magenta + 2px cyan offset",
  "Blinking REC indicator using animate-pulse on a red dot element",
  "Glow effects: box-shadow and text-shadow with neon colors at 40-60% opacity",
  "Dark-only backgrounds: #000000 or #1a0a2e — never light or white",
  "Uppercase everything: tracking-widest for labels, tracking-wider for headings",
  "Neon borders at 20-40% opacity, full neon on hover with chroma split pull",
];

const dontRules = [
  "Never use rounded corners larger than 2px — VHS is sharp geometry only",
  "Never use serif or sans-serif fonts — monospace is the only typeface",
  "Never use white or light backgrounds — all surfaces must be black or deep purple",
  "Never use soft drop shadows — only neon glow box-shadow effects",
  "Never use smooth easing on hover — use duration-75 ease-linear for tape jitter",
  "Never use border-radius on cards or containers — hard edges define the style",
  "Never use animations that feel modern — glitch/tracking distortion only",
  "Never omit the scanline overlay on featured content areas",
];

const vhsEffects = [
  {
    name: "SCANLINE OVERLAY",
    code: `background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0,255,255,0.05) 2px,
  rgba(0,255,255,0.05) 4px
)`,
    desc: "Horizontal scan lines simulating CRT phosphor rows. Apply as an absolute overlay on any dark surface. Opacity 60% rest, 100% hover.",
    color: "#ff00ff",
  },
  {
    name: "CHROMATIC ABERRATION",
    code: `text-shadow:
  -2px 0 #ff00ff,
   2px 0 #00ffff`,
    desc: "RGB channel split where magenta bleeds left and cyan bleeds right. The defining VHS text effect. Pull apart further on hover.",
    color: "#00ffff",
  },
  {
    name: "TRACKING JITTER",
    code: `@keyframes vhs-tracking {
  0%  { transform: skewX(0deg); }
  10% { transform: skewX(-2deg); }
  20% { transform: skewX(1deg); }
  30% { transform: skewX(0deg); }
}`,
    desc: "Abrupt horizontal skew that simulates tape head misalignment. Use duration-75 ease-linear — never smooth transitions.",
    color: "#ffff00",
  },
  {
    name: "CHROMA SPLIT GLOW",
    code: `/* Rest state */
box-shadow: 2px 0 #00ffff, -2px 0 #ff00ff;
/* Hover state — pull apart */
box-shadow: 4px 0 #00ffff, -4px 0 #ff00ff;`,
    desc: "Magenta and cyan shadows pull apart on hover creating the VHS chroma split effect. Combined with skew-x-2 on hover.",
    color: "#00ff00",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function RecIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"
        style={{ boxShadow: "0 0 8px #ef4444" }}
      />
      <span className="font-mono text-xs text-red-500 uppercase tracking-widest">
        REC
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#ff00ff" }}>
      {"// "}{children}
    </p>
  );
}

function SectionHeading({
  children,
  aberration = false,
}: {
  children: React.ReactNode;
  aberration?: boolean;
}) {
  return (
    <h2
      className="text-3xl md:text-4xl font-mono font-bold uppercase tracking-widest mb-4"
      style={
        aberration
          ? { textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff", color: "#ffffff" }
          : { color: "#ff00ff", textShadow: "0 0 20px rgba(255,0,255,0.5)" }
      }
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [hoveredTape, setHoveredTape] = useState<number | null>(null);

  const { ref: heroRef, inView: heroInView } = useInView();

  /* Live timestamp counter */
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCounter((c) => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCounter = (n: number) => {
    const h = String(Math.floor(n / 3600)).padStart(2, "0");
    const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0");
    const s = String(n % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const tabs = [
    { id: "button" as const, label: "BUTTON" },
    { id: "card" as const, label: "CARD" },
    { id: "input" as const, label: "INPUT" },
  ];

  return (
    <div
      className="min-h-screen font-mono"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      <style>{`
        @keyframes vhs-tracking {
          0%   { transform: skewX(0deg) translateX(0); }
          10%  { transform: skewX(-2deg) translateX(-2px); }
          20%  { transform: skewX(1deg) translateX(3px); }
          30%  { transform: skewX(-0.5deg) translateX(-1px); }
          40%  { transform: skewX(0deg) translateX(0); }
          100% { transform: skewX(0deg) translateX(0); }
        }
        @keyframes vhs-blink {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes vhs-aberration-shift {
          0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          33%      { text-shadow: -4px 0 #ff00ff, 2px 0 #00ffff; }
          66%      { text-shadow: -2px 0 #ff00ff, 4px 0 #00ffff; }
        }
        @keyframes vhs-counter-flicker {
          0%, 94%, 100% { opacity: 1; }
          95%  { opacity: 0.3; }
          96%  { opacity: 1; }
          98%  { opacity: 0.5; }
          99%  { opacity: 1; }
        }
        .vhs-title-anim {
          animation: vhs-aberration-shift 4s ease-in-out infinite;
        }
        .vhs-blink {
          animation: vhs-blink 1s step-end infinite;
        }
        .vhs-counter {
          animation: vhs-counter-flicker 8s ease-in-out infinite;
        }
        .vhs-scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,0,255,0.025) 2px,
            rgba(255,0,255,0.025) 4px
          );
        }
      `}</style>

      {/* Global scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 vhs-scanlines"
        style={{ mixBlendMode: "screen" }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1. NAV                                                           */}
      {/* ---------------------------------------------------------------- */}
      <nav
        className="sticky top-0 z-50 px-6 md:px-10 py-3 flex justify-between items-center border-b"
        style={{
          backgroundColor: "#000000",
          borderBottomColor: "rgba(255,0,255,0.2)",
        }}
      >
        {/* Left: brand + REC */}
        <div className="flex items-center gap-4">
          <RecIndicator />
          <div className="hidden sm:block w-px h-4 bg-[#ff00ff]/20" />
          <span
            className="hidden sm:block font-mono text-xs uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            VHS-AESTHETIC
          </span>
        </div>

        {/* Center: live VHS timestamp in #ffff00 */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span
            className="font-mono text-xs tracking-[0.2em] uppercase vhs-counter"
            style={{ color: "#ffff00" }}
          >
            1989.08.24 PM {formatCounter(counter)}
          </span>
        </div>

        {/* Right: StyleKit link */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest transition-all duration-200 hover:opacity-70"
          style={{ color: "#00ffff" }}
        >
          StyleKit →
        </Link>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. HERO — Full-screen black, scanline overlay, RGB aberration h1 */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Scanline overlay on hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.04) 2px,rgba(255,0,255,0.04) 4px)",
          }}
        />

        {/* Ambient purple glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26,10,46,0.7) 0%, transparent 100%)",
          }}
        />

        {/* Corner badges */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#ffff00]/30 bg-black/60"
            style={{ color: "#ffff00" }}
          >
            CH-03
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#ffff00]/30 bg-black/60"
            style={{ color: "#ffff00" }}
          >
            SP MODE
          </span>
        </div>
        <div className="absolute top-8 right-8">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#ffff00]/30 bg-black/60 vhs-counter"
            style={{ color: "#ffff00" }}
          >
            {formatCounter(counter)}
          </span>
        </div>

        {/* Hero content */}
        <div
          ref={heroRef}
          className="relative z-10 text-center max-w-5xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Play status */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span
              className="font-mono text-xs uppercase tracking-[0.4em]"
              style={{ color: "#00ff00" }}
            >
              &#9654; PLAY
            </span>
            <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              |
            </span>
            <span
              className="font-mono text-xs uppercase tracking-[0.3em] vhs-counter"
              style={{ color: "#ffff00" }}
            >
              {formatCounter(counter)}
            </span>
          </div>

          {/* Main h1 — RGB chromatic aberration via textShadow inline style */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-bold uppercase tracking-widest leading-none mb-6 vhs-title-anim"
            style={{ color: "#ffffff", textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
          >
            VHS
            <br />
            AESTHETIC
          </h1>

          {/* Subtitle */}
          <p
            className="font-mono text-lg md:text-xl uppercase tracking-[0.4em] mb-10"
            style={{ color: "rgba(255,0,255,0.7)" }}
          >
            &#9664; REWIND TO THE FUTURE &#9654;
          </p>

          {/* Tape counter */}
          <div className="flex justify-center mb-10">
            <div
              className="border px-6 py-3 font-mono text-xs tracking-[0.3em] uppercase vhs-counter"
              style={{
                borderColor: "rgba(255,255,0,0.3)",
                color: "#ffff00",
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            >
              COUNTER: {String(counter).padStart(7, "0")} — TAPE A SIDE 1
            </div>
          </div>

          {/* Tracking distortion lines */}
          <div
            className="w-full h-px mb-1"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(255,0,255,0.5),transparent)",
            }}
          />
          <div
            className="w-full h-px mb-10"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(0,255,255,0.3),transparent)",
            }}
          />

          {/* Hero CTA — PRESS PLAY to start (exact spec button pattern) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="group relative px-8 py-3 bg-[#ff00ff]/20 text-[#ff00ff] font-mono font-bold uppercase tracking-widest border-2 border-[#ff00ff] shadow-[2px_0_#00ffff,-2px_0_#ff00ff] hover:bg-[#ff00ff]/40 hover:text-white hover:shadow-[4px_0_#00ffff,-4px_0_#ff00ff] hover:skew-x-2 active:skew-x-0 active:scale-95 active:shadow-none transition-all duration-75 ease-linear overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)] opacity-50 group-hover:opacity-100 transition-opacity duration-75" />
              <span className="relative z-10">&#9654; PRESS PLAY</span>
            </button>
            <button
              className="px-8 py-3 font-mono text-sm uppercase tracking-widest border-2 transition-all duration-75 ease-linear hover:skew-x-2 active:skew-x-0 active:scale-95"
              style={{
                color: "#00ffff",
                borderColor: "rgba(0,255,255,0.4)",
                backgroundColor: "transparent",
                boxShadow: "2px 0 #ff00ff, -2px 0 #00ffff",
              }}
            >
              &#9664;&#9664; REWIND
            </button>
          </div>
        </div>

        {/* Bottom tape info */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,0,255,0.3)" }}
          >
            VHS-C FORMAT
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(0,255,255,0.3)" }}
          >
            T-120 / 6HRS EP
          </span>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. COMPONENT DEMO — Tab switcher: button / card / input          */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Components</SectionLabel>
            <SectionHeading>COMPONENT DEMO</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Interactive VHS UI components. Select a tab to preview Button, Card, and Input in full
              tape aesthetic with chroma split and scanline distortion.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08}>
            <div className="flex gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-75 ease-linear"
                  style={{
                    color: activeTab === tab.id ? "#ff00ff" : "rgba(255,255,255,0.3)",
                    borderColor:
                      activeTab === tab.id ? "#ff00ff" : "rgba(255,255,255,0.1)",
                    backgroundColor:
                      activeTab === tab.id
                        ? "rgba(255,0,255,0.12)"
                        : "transparent",
                    boxShadow:
                      activeTab === tab.id
                        ? "0 0 12px rgba(255,0,255,0.3)"
                        : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content panel */}
          <RevealBlock delay={0.14}>
            <div
              className="relative border-2 p-8 overflow-hidden"
              style={{
                borderColor: "rgba(255,0,255,0.3)",
                backgroundColor: "#1a0a2e",
                boxShadow: "0 0 20px rgba(255,0,255,0.1)",
              }}
            >
              {/* Scanline overlay on panel */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.05) 2px,rgba(0,255,255,0.05) 4px)",
                }}
              />
              <div className="relative z-10">

                {/* ---- BUTTON TAB ---- */}
                {activeTab === "button" && (
                  <div className="space-y-6">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6"
                      style={{ color: "rgba(255,0,255,0.5)" }}
                    >
                      // BUTTON — tape jitter on hover, chroma split glow
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {/* Gold standard button — exact spec */}
                      <button className="group relative px-8 py-3 bg-[#ff00ff]/20 text-[#ff00ff] font-mono font-bold uppercase tracking-widest border-2 border-[#ff00ff] shadow-[2px_0_#00ffff,-2px_0_#ff00ff] hover:bg-[#ff00ff]/40 hover:text-white hover:shadow-[4px_0_#00ffff,-4px_0_#ff00ff] hover:skew-x-2 active:skew-x-0 active:scale-95 active:shadow-none transition-all duration-75 ease-linear overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)] opacity-50 group-hover:opacity-100 transition-opacity duration-75" />
                        <span className="relative z-10">PLAY_TAPE</span>
                      </button>

                      {/* Cyan variant */}
                      <button className="group relative px-8 py-3 bg-[#00ffff]/10 text-[#00ffff] font-mono font-bold uppercase tracking-widest border-2 border-[#00ffff]/60 shadow-[2px_0_#ff00ff,-2px_0_#00ffff] hover:bg-[#00ffff]/25 hover:text-white hover:shadow-[4px_0_#ff00ff,-4px_0_#00ffff] hover:skew-x-2 active:skew-x-0 active:scale-95 active:shadow-none transition-all duration-75 ease-linear overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)] opacity-50 group-hover:opacity-100 transition-opacity duration-75" />
                        <span className="relative z-10">&#9664;&#9664; REWIND</span>
                      </button>

                      {/* Stop / danger variant */}
                      <button className="group relative px-8 py-3 bg-red-500/10 text-red-500 font-mono font-bold uppercase tracking-widest border-2 border-red-500/60 shadow-[2px_0_#ff00ff,-2px_0_#ef4444] hover:bg-red-500/25 hover:text-white hover:shadow-[4px_0_#ff00ff,-4px_0_#ef4444] hover:skew-x-2 active:skew-x-0 active:scale-95 active:shadow-none transition-all duration-75 ease-linear overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.06)_2px,rgba(255,255,255,0.06)_4px)] opacity-50 group-hover:opacity-100 transition-opacity duration-75" />
                        <span className="relative z-10">■ STOP</span>
                      </button>
                    </div>

                    <div
                      className="border-t pt-4 mt-4"
                      style={{ borderTopColor: "rgba(255,0,255,0.15)" }}
                    >
                      <p
                        className="font-mono text-[10px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        RULE: hover triggers <span style={{ color: "#ff00ff" }}>skew-x-2</span> + chroma split pulls to{" "}
                        <span style={{ color: "#00ffff" }}>4px</span>. Active state collapses to{" "}
                        <span style={{ color: "#ffff00" }}>scale-95</span> + no shadow. Duration 75ms — no smooth ease.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---- CARD TAB ---- */}
                {activeTab === "card" && (
                  <div className="space-y-6">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6"
                      style={{ color: "rgba(255,0,255,0.5)" }}
                    >
                      // CARD — scanline distortion + tracking aberration on hover
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Gold standard card — exact spec */}
                      <div className="group relative bg-[#1a0a2e]/90 border-2 border-[#ff00ff]/40 p-8 shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:border-[#00ffff] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-100 ease-linear cursor-crosshair">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.05)_2px,rgba(0,255,255,0.05)_4px)] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-100" />
                        <div className="absolute top-1/4 left-0 w-full h-2 bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full group-hover:animate-pulse shadow-[0_0_8px_#ef4444]" />
                            <span className="text-red-500 font-mono text-xs uppercase tracking-widest">REC</span>
                          </div>
                          <h3
                            className="text-white text-3xl font-mono font-bold uppercase mb-2 group-hover:-skew-x-3 transition-transform duration-75"
                            style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
                          >
                            NIGHT_DRIVE.AVI
                          </h3>
                          <p className="text-[#00ffff]/70 font-mono text-sm group-hover:text-white transition-colors duration-100">
                            &gt; Playback tracking adjusted.
                          </p>
                        </div>
                      </div>

                      {/* Variant card */}
                      <div className="group relative bg-[#1a0a2e]/90 border-2 border-[#00ffff]/40 p-8 shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:border-[#ff00ff] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)] transition-all duration-100 ease-linear cursor-crosshair">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.05)_2px,rgba(0,255,255,0.05)_4px)] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-100" />
                        <div className="absolute top-1/3 left-0 w-full h-1 bg-white/8 opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "#ffff00" }}>
                              SIDE B — 1988
                            </span>
                          </div>
                          <h3
                            className="text-white text-2xl font-mono font-bold uppercase mb-2 group-hover:-skew-x-3 transition-transform duration-75"
                            style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
                          >
                            SUMMER_MEMORIES
                          </h3>
                          <p className="text-[#ff00ff]/60 font-mono text-sm group-hover:text-white transition-colors duration-100">
                            &gt; Signal quality optimal.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="border-t pt-4"
                      style={{ borderTopColor: "rgba(255,0,255,0.15)" }}
                    >
                      <p
                        className="font-mono text-[10px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        RULE: scanline overlay opacity <span style={{ color: "#ff00ff" }}>60%</span> → <span style={{ color: "#00ffff" }}>100%</span> on hover instantly.
                        Heading gets <span style={{ color: "#ffff00" }}>-skew-x-3</span> via duration-75 — hard snap, not smooth.
                      </p>
                    </div>
                  </div>
                )}

                {/* ---- INPUT TAB ---- */}
                {activeTab === "input" && (
                  <div className="space-y-6">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6"
                      style={{ color: "rgba(255,0,255,0.5)" }}
                    >
                      // INPUT — terminal cursor blink, neon focus glow
                    </p>
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label
                          className="block font-mono text-[10px] uppercase tracking-[0.25em]"
                          style={{ color: "#00ffff" }}
                        >
                          TAPE LABEL
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 font-mono text-sm transition-all duration-75 focus:outline-none"
                          placeholder="ENTER TITLE..."
                          style={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(0,255,255,0.3)",
                            color: "#00ffff",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#00ffff";
                            e.currentTarget.style.boxShadow =
                              "0 0 12px rgba(0,255,255,0.4), 2px 0 #ff00ff, -2px 0 #00ffff";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="block font-mono text-[10px] uppercase tracking-[0.25em]"
                          style={{ color: "#ff00ff" }}
                        >
                          SEARCH ARCHIVE
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 font-mono text-sm transition-all duration-75 focus:outline-none"
                          placeholder="SEARCH TAPES..."
                          style={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,0,255,0.3)",
                            color: "#ff00ff",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#ff00ff";
                            e.currentTarget.style.boxShadow =
                              "0 0 12px rgba(255,0,255,0.4), 2px 0 #00ffff, -2px 0 #ff00ff";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,0,255,0.3)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="block font-mono text-[10px] uppercase tracking-[0.25em]"
                          style={{ color: "#ffff00" }}
                        >
                          TIMECODE ENTRY
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 font-mono text-sm transition-all duration-75 focus:outline-none"
                          placeholder="00:00:00"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,0,0.3)",
                            color: "#ffff00",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#ffff00";
                            e.currentTarget.style.boxShadow =
                              "0 0 12px rgba(255,255,0,0.3)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,0,0.3)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="border-t pt-4"
                      style={{ borderTopColor: "rgba(255,0,255,0.15)" }}
                    >
                      <p
                        className="font-mono text-[10px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        RULE: focus triggers neon border glow + chroma split box-shadow. No rounded corners.
                        All placeholder text uppercase. Color semantics: <span style={{ color: "#00ffff" }}>cyan</span> = data,{" "}
                        <span style={{ color: "#ff00ff" }}>magenta</span> = search,{" "}
                        <span style={{ color: "#ffff00" }}>yellow</span> = timestamp.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. COLOR PALETTE — Swatches with glitch-border effect            */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#0a0015" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Color System</SectionLabel>
            <SectionHeading>VHS PALETTE</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Six signal colors drawn from the phosphor bands of the CRT era.
              Each swatch has a glitch-border effect on hover — chroma split glow pulls apart.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vhsPalette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div
                  className="relative border-2 p-6 overflow-hidden transition-all duration-75 ease-linear cursor-crosshair"
                  style={{
                    borderColor: `${color.hex}35`,
                    backgroundColor: "rgba(26,10,46,0.6)",
                    boxShadow: `2px 0 ${color.hex}40, -2px 0 ${color.hex}20`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = color.hex;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 0 #00ffff, -4px 0 #ff00ff, 0 0 20px ${color.glow}`;
                    (e.currentTarget as HTMLDivElement).style.transform = "skewX(0.5deg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color.hex}35`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `2px 0 ${color.hex}40, -2px 0 ${color.hex}20`;
                    (e.currentTarget as HTMLDivElement).style.transform = "skewX(0)";
                  }}
                >
                  {/* Scanline overlay on card */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.03) 2px,rgba(255,0,255,0.03) 4px)",
                    }}
                  />
                  {/* Color swatch */}
                  <div
                    className="w-full h-16 mb-4"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: `0 0 20px ${color.glow}`,
                    }}
                  />
                  {/* Info */}
                  <div className="relative">
                    <p
                      className="font-mono text-sm font-bold uppercase tracking-widest mb-1"
                      style={{
                        color: color.hex === "#000000" ? "#ffffff" : color.hex,
                        textShadow: `0 0 10px ${color.glow}`,
                      }}
                    >
                      {color.name}
                    </p>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {color.label}
                    </p>
                    <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {color.hex}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. VHS TAPE COLLECTION — Tape cards with hoveredTape state      */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Tape Collection</SectionLabel>
            <SectionHeading aberration>THE ARCHIVE</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              VHS case cards representing the tape library. Each card uses the gold-standard card
              component pattern with tracking jitter, chroma split, and scanline distortion.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tapeCollection.map((tape, i) => (
              <RevealBlock key={tape.title} delay={i * 0.07}>
                {/* Exact spec card pattern with hoveredTape state */}
                <div
                  className="group relative bg-[#1a0a2e]/90 border-2 p-8 shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all duration-100 ease-linear cursor-crosshair"
                  style={{
                    borderColor:
                      hoveredTape === i ? tape.color : `${tape.color}40`,
                    boxShadow:
                      hoveredTape === i
                        ? `0 0 25px ${tape.glow}, 4px 0 #00ffff, -4px 0 #ff00ff`
                        : `0 0 15px rgba(255,0,255,0.15), 2px 0 #00ffff, -2px 0 #ff00ff`,
                    transform: hoveredTape === i ? "skewX(-0.5deg)" : "skewX(0)",
                  }}
                  onMouseEnter={() => setHoveredTape(i)}
                  onMouseLeave={() => setHoveredTape(null)}
                >
                  {/* Scanline overlay — opacity changes instantly on hover */}
                  <div
                    className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.05)_2px,rgba(0,255,255,0.05)_4px)] pointer-events-none"
                    style={{ opacity: hoveredTape === i ? 1 : 0.6 }}
                  />

                  {/* Tape tracking glitch line on hover */}
                  <div
                    className="absolute top-1/4 left-0 w-full h-2 bg-white/10"
                    style={{ opacity: hoveredTape === i ? 1 : 0 }}
                  />

                  {/* Top color band */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{
                      backgroundColor: tape.color,
                      boxShadow: `0 0 10px ${tape.glow}`,
                    }}
                  />

                  <div className="relative z-10 pt-2">
                    {/* REC indicator row */}
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"
                        style={{
                          animation: hoveredTape === i ? "pulse 1s ease-in-out infinite" : "none",
                        }}
                      />
                      <span className="text-red-500 font-mono text-xs uppercase tracking-widest">
                        REC
                      </span>
                      <span
                        className="ml-auto font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: "#ffff00" }}
                      >
                        {tape.year}
                      </span>
                    </div>

                    {/* Title with aberration on hover */}
                    <h3
                      className="text-white font-mono font-bold uppercase mb-2 transition-transform duration-75"
                      style={{
                        fontSize: "1.2rem",
                        textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff",
                        transform: hoveredTape === i ? "skewX(-3deg)" : "skewX(0)",
                      }}
                    >
                      {tape.title}
                    </h3>

                    {/* Genre */}
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] mb-5 transition-colors duration-100"
                      style={{
                        color: hoveredTape === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {tape.genre}
                    </p>

                    {/* Status line */}
                    <p
                      className="font-mono text-sm transition-colors duration-100"
                      style={{
                        color: hoveredTape === i ? "#00ffff" : `${tape.color}70`,
                      }}
                    >
                      &gt; {hoveredTape === i ? "Playback tracking adjusted." : "Tape loaded. Press play."}
                    </p>

                    {/* Footer */}
                    <div
                      className="flex justify-between items-center border-t pt-3 mt-4"
                      style={{ borderTopColor: `${tape.color}20` }}
                    >
                      <span
                        className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border"
                        style={{
                          color: tape.color,
                          borderColor: `${tape.color}40`,
                          backgroundColor: `${tape.color}10`,
                        }}
                      >
                        SIDE {tape.side}
                      </span>
                      <span
                        className="font-mono text-sm vhs-counter"
                        style={{ color: "#ffff00" }}
                      >
                        {tape.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. DESIGN RULES — Do/Don't as VHS terminal output               */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#0a0015" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Rules</SectionLabel>
            <SectionHeading>DO / DON&apos;T</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Hard constraints that maintain authentic VHS signal integrity.
              Styled as VHS terminal output — DO in cyan, DON&apos;T in magenta/red.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO column — #00ffff */}
            <RevealBlock delay={0.1}>
              <div
                className="border p-6 h-full"
                style={{
                  borderColor: "rgba(0,255,255,0.2)",
                  backgroundColor: "rgba(0,255,255,0.03)",
                }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00ffff" }} />
                  </div>
                  <span
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: "#00ffff", textShadow: "0 0 8px rgba(0,255,255,0.6)" }}
                  >
                    &#10003; DO — RECOMMENDED SIGNAL
                  </span>
                </div>

                <div className="space-y-2">
                  {doRules.map((rule, i) => (
                    <div
                      key={i}
                      className="flex gap-3 border-l-2 pl-3 py-1.5"
                      style={{ borderLeftColor: "#00ffff" }}
                    >
                      <span
                        className="font-mono text-[10px] shrink-0 mt-0.5"
                        style={{ color: "rgba(0,255,255,0.5)" }}
                      >
                        {String(i + 1).padStart(2, "0")}&gt;
                      </span>
                      <p
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T column — #ff00ff / red */}
            <RevealBlock delay={0.15}>
              <div
                className="border p-6 h-full"
                style={{
                  borderColor: "rgba(255,0,255,0.2)",
                  backgroundColor: "rgba(255,0,255,0.03)",
                }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff0000" }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  </div>
                  <span
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: "rgb(239,68,68)", textShadow: "0 0 8px rgba(255,0,0,0.4)" }}
                  >
                    &#10007; DON&apos;T — SIGNAL CORRUPTION
                  </span>
                </div>

                <div className="space-y-2">
                  {dontRules.map((rule, i) => (
                    <div
                      key={i}
                      className="flex gap-3 border-l-2 pl-3 py-1.5"
                      style={{ borderLeftColor: "rgba(239,68,68,0.5)" }}
                    >
                      <span
                        className="font-mono text-[10px] shrink-0 mt-0.5"
                        style={{ color: "rgba(255,0,0,0.4)" }}
                      >
                        {String(i + 1).padStart(2, "0")}&gt;
                      </span>
                      <p
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. VHS EFFECTS REFERENCE                                        */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Effects</SectionLabel>
            <SectionHeading aberration>VHS TECHNIQUES</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              The CSS techniques that define the VHS aesthetic. Each effect
              replicates a specific artefact of analog magnetic recording.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {vhsEffects.map((effect, i) => (
              <RevealBlock key={effect.name} delay={i * 0.08}>
                <div
                  className="border p-6 h-full transition-all duration-75 ease-linear"
                  style={{
                    borderColor: `${effect.color}25`,
                    backgroundColor: "rgba(26,10,46,0.5)",
                    boxShadow: "2px 0 rgba(0,255,255,0.1), -2px 0 rgba(255,0,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${effect.color}70`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 0 #00ffff, -4px 0 #ff00ff, 0 0 15px ${effect.color}20`;
                    (e.currentTarget as HTMLDivElement).style.transform = "skewX(0.3deg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${effect.color}25`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "2px 0 rgba(0,255,255,0.1), -2px 0 rgba(255,0,255,0.1)";
                    (e.currentTarget as HTMLDivElement).style.transform = "skewX(0)";
                  }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-[0.25em] mb-4"
                    style={{ color: effect.color, textShadow: `0 0 8px ${effect.color}60` }}
                  >
                    {effect.name}
                  </p>
                  <pre
                    className="font-mono text-[11px] leading-relaxed p-3 mb-4 overflow-x-auto"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      color: "rgba(255,255,255,0.8)",
                      borderLeft: `2px solid ${effect.color}50`,
                    }}
                  >
                    {effect.code}
                  </pre>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {effect.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Live effect demonstrations */}
          <RevealBlock delay={0.2}>
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              — LIVE DEMONSTRATIONS —
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Scanline demo */}
              <div
                className="relative border p-6"
                style={{
                  borderColor: "rgba(255,0,255,0.2)",
                  backgroundColor: "#1a0a2e",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.06) 2px,rgba(255,0,255,0.06) 4px)",
                  }}
                />
                <p
                  className="relative font-mono text-[10px] uppercase tracking-widest mb-3"
                  style={{ color: "rgba(255,0,255,0.5)" }}
                >
                  SCANLINES
                </p>
                <p className="relative font-mono text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Horizontal bands at 4px interval. Opacity 60% rest → 100% hover.
                </p>
              </div>

              {/* Chromatic aberration live */}
              <div
                className="border p-6"
                style={{ borderColor: "rgba(0,255,255,0.2)", backgroundColor: "#1a0a2e" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-widest mb-3"
                  style={{ color: "rgba(0,255,255,0.5)" }}
                >
                  ABERRATION
                </p>
                <p
                  className="font-mono text-2xl font-bold uppercase tracking-wider"
                  style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff", color: "#ffffff" }}
                >
                  SIGNAL
                </p>
                <p className="font-mono text-[10px] mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  -2px magenta + 2px cyan offset
                </p>
              </div>

              {/* REC + blink demo */}
              <div
                className="border p-6"
                style={{ borderColor: "rgba(255,0,0,0.2)", backgroundColor: "#1a0a2e" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-widest mb-3"
                  style={{ color: "rgba(255,0,0,0.5)" }}
                >
                  REC INDICATOR
                </p>
                <RecIndicator />
                <p
                  className="font-mono text-xs mt-4 vhs-blink"
                  style={{ color: "#ffff00" }}
                >
                  &#9654; PLAY — TAPE A
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER — VHS style, scanlines, "VHS Aesthetic // StyleKit // STOP" */}
      {/* ---------------------------------------------------------------- */}
      <footer
        className="relative border-t px-6 md:px-10 py-12 overflow-hidden"
        style={{
          backgroundColor: "#000000",
          borderTopColor: "rgba(255,0,255,0.2)",
        }}
      >
        {/* Footer scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.02) 2px,rgba(255,0,255,0.02) 4px)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Footer brand row */}
          <div className="flex flex-wrap justify-between items-start gap-8 mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3 flex-wrap">
                <span
                  className="font-mono text-lg font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  ■ STOP
                </span>
                <div className="w-px h-5" style={{ backgroundColor: "rgba(255,0,255,0.3)" }} />
                <span
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{ color: "#ff00ff", textShadow: "0 0 10px rgba(255,0,255,0.4)" }}
                >
                  VHS AESTHETIC
                </span>
                <div className="w-px h-5" style={{ backgroundColor: "rgba(0,255,255,0.3)" }} />
                <span
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{ color: "#00ffff", textShadow: "0 0 10px rgba(0,255,255,0.4)" }}
                >
                  StyleKit
                </span>
              </div>
              <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                A StyleKit design language — magnetic tape era, digitized.
              </p>
            </div>

            {/* Cassette stats */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {[
                { label: "FORMAT", value: "T-120 VHS" },
                { label: "SPEED", value: "SP / EP" },
                { label: "SIGNAL", value: "NTSC" },
                { label: "COLOR", value: "FULL NEON" },
                { label: "HEADS", value: "4-HEAD HI-FI" },
                { label: "VERSION", value: "v1.0.0" },
              ].map((stat) => (
                <div key={stat.label} className="flex gap-3">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: "rgba(255,255,0,0.4)" }}
                  >
                    {stat.label}:
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div
            className="w-full h-px mb-6"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(255,0,255,0.4),rgba(0,255,255,0.4),transparent)",
            }}
          />

          {/* Bottom bar */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              &copy; 1989–{new Date().getFullYear()} STYLEKIT — VHS AESTHETIC DESIGN SYSTEM
            </p>

            <div className="flex gap-6">
              <Link
                href="/styles/vhs-aesthetic"
                className="font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-75 ease-linear"
                style={{ color: "rgba(255,0,255,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ff00ff";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 8px rgba(255,0,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,0,255,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-75 ease-linear"
                style={{ color: "rgba(0,255,255,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00ffff";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 8px rgba(0,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,255,255,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
