"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Hooks ───────────────────────────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TABS = [
  { label: "DRIVE", key: "button" },
  { label: "RACE", key: "card" },
  { label: "SIGNAL", key: "input" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const COLOR_STRIPS = [
  {
    name: "MAGENTA",
    hex: "#ff006e",
    use: "Primary — CTA, borders, glow",
    glow: "rgba(255,0,110,0.7)",
  },
  {
    name: "PURPLE",
    hex: "#a020f0",
    use: "Secondary — gradients, accents",
    glow: "rgba(160,32,240,0.7)",
  },
  {
    name: "CYAN",
    hex: "#00d4ff",
    use: "Accent — text, links, scan",
    glow: "rgba(0,212,255,0.7)",
  },
  {
    name: "SUNSET",
    hex: "#ff6b35",
    use: "Warmth — sun orb, horizon",
    glow: "rgba(255,107,53,0.7)",
  },
  {
    name: "VOID",
    hex: "#0a0a0a",
    use: "Background — deep black canvas",
    glow: "rgba(100,50,150,0.3)",
  },
];

const DO_LIST = [
  "Use magenta + cyan dual neon glow on every interactive element",
  "Animate the perspective grid on hover — speed illusion is mandatory",
  "Gradient-clip chrome typography from warm to cool hues",
  "Keep backgrounds pure black or very dark purple gradients",
  "Pair scanline overlays on all dark panels for CRT authenticity",
  "Use active:scale-95 + active:bg-[#ff006e]/20 for CRT jitter feedback",
];

const DONT_LIST = [
  "White or light-mode backgrounds — void is the canvas",
  "Single-color glow — always combine magenta AND cyan",
  "Muted or low-saturation colors — full neon saturation only",
  "Static grid backgrounds — motion and speed are required",
  "Modern minimal aesthetics — maximalism is the rule",
  "Soft gradients without neon punch — chrome or nothing",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function OutrunShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("button");
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <style>{`
        @keyframes outrun-scanline-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 0 120px; }
        }
        @keyframes outrun-sun-pulse {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          50%       { opacity: 0.85; transform: scaleX(1.015); }
        }
        @keyframes outrun-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes outrun-grid-rush {
          0%   { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
        @keyframes outrun-flicker {
          0%, 100% { opacity: 1; }
          92%       { opacity: 1; }
          93%       { opacity: 0.7; }
          94%       { opacity: 1; }
          96%       { opacity: 0.85; }
          97%       { opacity: 1; }
        }
        .outrun-scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.15) 0px,
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        .outrun-scanlines-animate {
          animation: outrun-scanline-drift 4s linear infinite;
        }
        .outrun-grid-floor {
          background-image:
            linear-gradient(90deg, rgba(255,0,110,0.35) 1px, transparent 1px),
            linear-gradient(rgba(255,0,110,0.35) 1px, transparent 1px);
          background-size: 60px 30px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
        }
        .outrun-grid-rush-anim {
          animation: outrun-grid-rush 0.6s linear infinite;
        }
        .outrun-neon-text {
          text-shadow:
            0 0 7px #ff006e,
            0 0 14px #ff006e,
            0 0 28px rgba(255,0,110,0.6);
        }
        .outrun-cyan-text {
          text-shadow:
            0 0 7px #00d4ff,
            0 0 14px #00d4ff,
            0 0 28px rgba(0,212,255,0.6);
        }
        .outrun-sun-pulse {
          animation: outrun-sun-pulse 3s ease-in-out infinite;
        }
        .outrun-flicker {
          animation: outrun-flicker 6s step-end infinite;
        }
        .group:hover .outrun-grid-hover {
          animation: outrun-grid-rush 0.4s linear infinite;
        }
        .outrun-marquee-track {
          animation: outrun-marquee 18s linear infinite;
        }
        .outrun-btn-scanline {
          background-image: repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 3px,
            rgba(0,212,255,0.07) 3px,
            rgba(0,212,255,0.07) 4px
          );
          background-size: 100% 4px;
          transition: background-position 0.3s ease;
        }
        .group:hover .outrun-btn-scanline {
          background-position: 0 8px;
        }
      `}</style>

      {/* ── 1. FIXED NAV ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#ff006e]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
          {/* Logo */}
          <span
            className="text-[#00d4ff] font-black text-lg tracking-[0.25em] uppercase outrun-flicker"
            style={{ fontFamily: "monospace" }}
          >
            STYLEKIT
          </span>

          {/* Nav links */}
          <nav className="flex items-center gap-6 md:gap-8">
            <Link
              href="/styles/outrun"
              className="text-xs tracking-[0.2em] uppercase text-[#ff006e]/70 hover:text-[#ff006e] transition-colors duration-300 outrun-neon-text"
              style={{ fontFamily: "monospace" }}
            >
              DOCS
            </Link>
            <Link
              href="/styles"
              className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-[#00d4ff] transition-colors duration-300"
              style={{ fontFamily: "monospace" }}
            >
              STYLES
            </Link>
            <Link
              href="/styles"
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 border border-[#ff006e]/60 text-[#ff006e] text-xs font-black tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_14px_rgba(0,212,255,0.5),inset_0_0_8px_rgba(255,0,110,0.2)] active:scale-95"
              style={{ fontFamily: "monospace" }}
            >
              STYLEKIT <span className="text-[#00d4ff]">&#8594;</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── 2. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
        {/* Deep background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/20" />

        {/* Horizon sun */}
        <div className="absolute bottom-[46%] left-1/2 -translate-x-1/2 w-80 md:w-[420px] h-40 md:h-52 overflow-hidden outrun-sun-pulse pointer-events-none">
          {/* Horizontal scan bands across sun */}
          <div
            className="absolute inset-0 rounded-t-full bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0]"
            style={{ borderRadius: "100% 100% 0 0 / 100% 100% 0 0" }}
          />
          {/* Sun stripes */}
          {[0.2, 0.38, 0.55, 0.7, 0.83].map((pos, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 bg-[#0a0a0a]"
              style={{ top: `${pos * 100}%`, height: "3px", opacity: 0.5 }}
            />
          ))}
        </div>

        {/* Perspective grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[48%] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 outrun-grid-floor outrun-grid-hover" />
          {/* Fade at horizon */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d0a4e]/80 via-transparent to-[#0a0a0a]/60" />
        </div>

        {/* Scanlines overlay */}
        <div className="absolute inset-0 outrun-scanlines outrun-scanlines-animate pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
          {/* Eyebrow */}
          <div
            className="text-[#00d4ff] text-xs tracking-[0.4em] uppercase outrun-cyan-text"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              fontFamily: "monospace",
            }}
          >
            80S SUNSET AESTHETIC
          </div>

          {/* Giant title */}
          <h1
            className="text-[14vw] md:text-[10rem] font-black leading-none tracking-[0.05em] uppercase select-none"
            style={{
              backgroundImage: "linear-gradient(180deg, #ff006e 0%, #a020f0 60%, #0a0a0a 120%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0) scaleY(1)" : "translateY(32px) scaleY(0.9)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
              fontFamily: "Impact, 'Arial Narrow', sans-serif",
              textShadow: "0 0 60px rgba(255,0,110,0.4), 0 0 120px rgba(160,32,240,0.3)",
            }}
          >
            OUTRUN
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#00d4ff] text-sm md:text-base tracking-[0.25em] max-w-xl outrun-cyan-text uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
              fontFamily: "monospace",
            }}
          >
            Palm silhouettes. Neon speed. Chrome typography. The infinite horizon.
          </p>

          {/* CTA button */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s",
            }}
          >
            <button
              className="group relative mt-4 px-10 py-4 font-black uppercase tracking-[0.25em] text-white transition-all duration-300 active:scale-95 active:bg-[#ff006e]/20"
              style={{
                fontFamily: "monospace",
                background: "linear-gradient(180deg, #1a0033 0%, #0a0a0a 100%)",
                border: "1px solid #ff006e",
                boxShadow: "0 0 15px rgba(255,0,110,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 25px rgba(0,212,255,0.8), inset 0 0 15px rgba(255,0,110,0.4)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#00d4ff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 15px rgba(255,0,110,0.4)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff006e";
              }}
            >
              {/* Scanline overlay inside button */}
              <span className="absolute inset-0 outrun-btn-scanline pointer-events-none" aria-hidden="true" />
              <span className="relative z-10 text-[#00d4ff] group-hover:text-white transition-colors duration-300">
                ENGAGE DRIVE MODE
              </span>
            </button>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* ── Marquee strip ────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-y border-[#ff006e]/30 py-4"
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="outrun-marquee-track flex gap-0 whitespace-nowrap"
          aria-hidden="true"
        >
          {[0, 1].map((dupe) => (
            <div key={dupe} className="flex items-center gap-0 shrink-0">
              {[
                "DRIVE INTO THE SUNSET",
                "NEON GRID HORIZON",
                "CHROME TYPOGRAPHY",
                "MAGENTA SPEED",
                "OUTRUN AESTHETIC",
                "PALM SILHOUETTES",
                "CYBER WAVE",
                "RETRO FUTURE",
              ].map((word, i) => (
                <span key={i} className="flex items-center gap-0">
                  <span
                    className="text-xs font-black tracking-[0.3em] uppercase px-6"
                    style={{
                      fontFamily: "monospace",
                      color: i % 2 === 0 ? "#ff006e" : "#00d4ff",
                      textShadow: i % 2 === 0
                        ? "0 0 8px rgba(255,0,110,0.6)"
                        : "0 0 8px rgba(0,212,255,0.6)",
                    }}
                  >
                    {word}
                  </span>
                  <span className="text-[#a020f0] mx-2 text-xs">&#9670;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. COMPONENT SHOWCASE ────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 max-w-6xl mx-auto">
        <RevealBlock>
          <div className="text-center mb-16">
            <p
              className="text-[#ff006e]/60 text-xs tracking-[0.4em] uppercase mb-3 outrun-neon-text"
              style={{ fontFamily: "monospace" }}
            >
              COMPONENT LAB
            </p>
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-wider"
              style={{
                fontFamily: "Impact, 'Arial Narrow', sans-serif",
                backgroundImage: "linear-gradient(90deg, #ff006e 0%, #a020f0 50%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SYSTEM COMPONENTS
            </h2>
          </div>
        </RevealBlock>

        {/* Tab bar — neon dashboard indicators */}
        <RevealBlock delay={0.1} className="mb-10">
          <div
            className="flex border border-[#ff006e]/30 overflow-hidden"
            style={{ background: "#0d0d0d" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative flex-1 py-4 text-xs font-black tracking-[0.3em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "monospace",
                  color: activeTab === tab.key ? "#0a0a0a" : "#ff006e",
                  background: activeTab === tab.key
                    ? "linear-gradient(180deg, #ff006e, #a020f0)"
                    : "transparent",
                  boxShadow: activeTab === tab.key
                    ? "0 0 20px rgba(255,0,110,0.5), inset 0 0 10px rgba(160,32,240,0.3)"
                    : "none",
                }}
              >
                {/* Active indicator dot */}
                {activeTab === tab.key && (
                  <span
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                    style={{ boxShadow: "0 0 6px #00d4ff" }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Tab panels */}
        <RevealBlock delay={0.2}>
          <div
            className="border border-[#ff006e]/20 p-8 md:p-12 relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(180deg, #0d0020 0%, #0a0a0a 100%)",
              boxShadow: "inset 0 0 40px rgba(160,32,240,0.1)",
            }}
          >
            {/* Scanlines on panel */}
            <div className="absolute inset-0 outrun-scanlines pointer-events-none" />

            {/* DRIVE — Button */}
            {activeTab === "button" && (
              <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md">
                <p
                  className="text-[#00d4ff]/60 text-xs tracking-[0.3em] uppercase text-center"
                  style={{ fontFamily: "monospace" }}
                >
                  BUTTON / DRIVE CONTROL
                </p>
                {/* Primary button with Perspective Drive */}
                <button
                  className="group relative w-full py-5 font-black uppercase tracking-[0.3em] text-white transition-all duration-300 active:scale-95 active:bg-[#ff006e]/20"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                    border: "1px solid #ff006e",
                    background: "linear-gradient(180deg, #1a0033 0%, #0a0a0a 100%)",
                    boxShadow: "0 0 15px rgba(255,0,110,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 25px rgba(0,212,255,0.8), inset 0 0 15px rgba(255,0,110,0.4)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#00d4ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 15px rgba(255,0,110,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff006e";
                  }}
                >
                  {/* Perspective Drive scanline overlay */}
                  <span
                    className="absolute inset-0 outrun-btn-scanline pointer-events-none transition-all duration-300"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 outrun-neon-text">ACCELERATE</span>
                </button>

                {/* Secondary ghost button */}
                <button
                  className="group relative w-full py-4 font-black uppercase tracking-[0.3em] transition-all duration-300 active:scale-95"
                  style={{
                    fontFamily: "monospace",
                    color: "#00d4ff",
                    border: "1px solid #00d4ff",
                    background: "transparent",
                    boxShadow: "0 0 10px rgba(0,212,255,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 20px rgba(0,212,255,0.6), inset 0 0 12px rgba(255,0,110,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(0,212,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 10px rgba(0,212,255,0.2)";
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <span className="outrun-cyan-text">CRUISE CONTROL</span>
                </button>

                <p
                  className="text-white/30 text-xs text-center tracking-wider"
                  style={{ fontFamily: "monospace" }}
                >
                  Hover for dual-neon chromatic aberration glow. Active for CRT jitter.
                </p>
              </div>
            )}

            {/* RACE — Card with horizon grid + sunset orb */}
            {activeTab === "card" && (
              <div className="relative z-10 w-full max-w-sm">
                <p
                  className="text-[#00d4ff]/60 text-xs tracking-[0.3em] uppercase text-center mb-6"
                  style={{ fontFamily: "monospace" }}
                >
                  CARD / RACE PANEL
                </p>
                <div
                  className="relative overflow-hidden border border-[#ff006e]/40"
                  style={{
                    background: "linear-gradient(180deg, #150028 0%, #0a0a0a 100%)",
                    boxShadow: "0 0 30px rgba(255,0,110,0.15), inset 0 1px 0 rgba(255,0,110,0.3)",
                  }}
                >
                  {/* Card top — sunset orb scene */}
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2d0a4e] to-[#0a0a0a]" />
                    {/* Mini sun */}
                    <div
                      className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-20 h-10 rounded-t-full"
                      style={{
                        background: "linear-gradient(to top, #ff6b35, #ff006e, #a020f0)",
                        borderRadius: "100% 100% 0 0 / 100% 100% 0 0",
                        boxShadow: "0 0 30px rgba(255,107,53,0.5), 0 0 60px rgba(255,0,110,0.3)",
                      }}
                    />
                    {/* Mini grid */}
                    <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden">
                      <div className="absolute inset-0 outrun-grid-floor" style={{ backgroundSize: "30px 15px" }} />
                    </div>
                    {/* Scanlines on card scene */}
                    <div className="absolute inset-0 outrun-scanlines pointer-events-none" />
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h3
                      className="text-[#ff006e] text-lg font-black uppercase tracking-widest mb-2 outrun-neon-text"
                      style={{ fontFamily: "Impact, sans-serif" }}
                    >
                      SUNSET BOULEVARD
                    </h3>
                    <p
                      className="text-white/40 text-xs leading-relaxed tracking-wide"
                      style={{ fontFamily: "monospace" }}
                    >
                      The grid stretches beyond the horizon. Every line converges at the same point — the eternal vanishing point of tomorrow.
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="text-[#00d4ff] text-xs uppercase tracking-widest outrun-cyan-text"
                        style={{ fontFamily: "monospace" }}
                      >
                        DRIVE ON
                      </span>
                      <span className="text-[#ff006e] text-lg">&#8594;</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SIGNAL — Input with purple border glow */}
            {activeTab === "input" && (
              <div className="relative z-10 w-full max-w-sm flex flex-col gap-6">
                <p
                  className="text-[#00d4ff]/60 text-xs tracking-[0.3em] uppercase text-center"
                  style={{ fontFamily: "monospace" }}
                >
                  INPUT / SIGNAL TERMINAL
                </p>

                {/* Primary input */}
                <div className="relative">
                  <label
                    className="block text-[#ff006e] text-xs tracking-[0.3em] uppercase mb-2 outrun-neon-text"
                    style={{ fontFamily: "monospace" }}
                  >
                    DESTINATION
                  </label>
                  <div
                    className="relative"
                    style={{
                      boxShadow: inputFocused
                        ? "0 0 0 1px #a020f0, 0 0 20px rgba(160,32,240,0.5), inset 0 0 10px rgba(255,0,110,0.1)"
                        : "0 0 0 1px rgba(160,32,240,0.3)",
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder="Enter coordinates..."
                      className="w-full py-3 px-4 bg-[#0d0020] text-[#00d4ff] placeholder-[#a020f0]/40 text-sm outline-none tracking-wider"
                      style={{ fontFamily: "monospace" }}
                    />
                    {/* Cursor blink indicator */}
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a020f0] text-xs"
                      style={{ fontFamily: "monospace" }}
                    >
                      {inputFocused ? "_" : ""}
                    </span>
                  </div>
                </div>

                {/* Secondary input */}
                <div className="relative">
                  <label
                    className="block text-[#00d4ff] text-xs tracking-[0.3em] uppercase mb-2 outrun-cyan-text"
                    style={{ fontFamily: "monospace" }}
                  >
                    FREQUENCY
                  </label>
                  <div
                    style={{
                      boxShadow: "0 0 0 1px rgba(0,212,255,0.3)",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="88.5 FM..."
                      className="w-full py-3 px-4 bg-[#001a1a] text-white/70 placeholder-[#00d4ff]/30 text-sm outline-none tracking-wider focus:placeholder-[#00d4ff]/20"
                      style={{
                        fontFamily: "monospace",
                        transition: "box-shadow 0.3s ease",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget.parentElement as HTMLElement).style.boxShadow =
                          "0 0 0 1px #00d4ff, 0 0 18px rgba(0,212,255,0.45), inset 0 0 8px rgba(0,212,255,0.1)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget.parentElement as HTMLElement).style.boxShadow =
                          "0 0 0 1px rgba(0,212,255,0.3)";
                      }}
                    />
                  </div>
                </div>

                <p
                  className="text-white/25 text-xs text-center tracking-wider"
                  style={{ fontFamily: "monospace" }}
                >
                  Purple glow on primary focus. Cyan glow on secondary. CRT terminal aesthetic.
                </p>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ── 4. COLOR SYSTEM — Neon Light Strips ─────────────────────────── */}
      <section
        className="py-24 md:py-36 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0020 50%, #0a0a0a 100%)" }}
      >
        {/* Perspective grid background */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none opacity-25">
          <div className="absolute inset-0 outrun-grid-floor" style={{ backgroundSize: "80px 40px" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <p
                className="text-[#a020f0]/70 text-xs tracking-[0.4em] uppercase mb-3"
                style={{ fontFamily: "monospace" }}
              >
                NEON SPECTRUM
              </p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-wider"
                style={{
                  fontFamily: "Impact, 'Arial Narrow', sans-serif",
                  color: "#fff",
                  textShadow: "0 0 30px rgba(255,0,110,0.3)",
                }}
              >
                COLOR SYSTEM
              </h2>
            </div>
          </RevealBlock>

          <div className="flex flex-col gap-5">
            {COLOR_STRIPS.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.07}>
                <div
                  className="relative flex items-center gap-6 border border-white/5 overflow-hidden transition-all duration-300 group cursor-default"
                  style={{ background: "#0d0d0d" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color.glow}, inset 0 0 15px ${color.glow.replace("0.7", "0.15")}`;
                    (e.currentTarget as HTMLElement).style.borderColor = color.hex + "60";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Neon bar */}
                  <div
                    className="w-2 shrink-0 self-stretch"
                    style={{
                      background: color.hex,
                      boxShadow: `0 0 12px ${color.glow}, 0 0 24px ${color.glow.replace("0.7", "0.4")}`,
                    }}
                  />

                  {/* Color swatch */}
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 shrink-0 border border-white/10"
                    style={{
                      background: color.hex,
                      boxShadow: `0 0 15px ${color.glow}`,
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 py-5 pr-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <span
                      className="font-black text-sm md:text-base tracking-[0.2em] uppercase"
                      style={{ fontFamily: "monospace", color: color.hex, textShadow: `0 0 10px ${color.glow}` }}
                    >
                      {color.name}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase text-white/40"
                      style={{ fontFamily: "monospace" }}
                    >
                      {color.hex}
                    </span>
                    <span
                      className="text-xs text-white/30 md:ml-auto tracking-wide"
                      style={{ fontFamily: "monospace" }}
                    >
                      {color.use}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SPEED RULES — ENGAGE vs BRAKE ────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        {/* Scanlines */}
        <div className="absolute inset-0 outrun-scanlines pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <p
                className="text-[#00d4ff]/60 text-xs tracking-[0.4em] uppercase mb-3 outrun-cyan-text"
                style={{ fontFamily: "monospace" }}
              >
                DASHBOARD PROTOCOL
              </p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-wider"
                style={{
                  fontFamily: "Impact, 'Arial Narrow', sans-serif",
                  backgroundImage: "linear-gradient(90deg, #00d4ff, #a020f0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SPEED RULES
              </h2>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ENGAGE — do list */}
            <RevealBlock delay={0.05}>
              <div
                className="relative border overflow-hidden"
                style={{
                  borderColor: "#ff006e40",
                  background: "linear-gradient(180deg, #0d001a 0%, #0a0a0a 100%)",
                  boxShadow: "inset 0 0 30px rgba(255,0,110,0.05)",
                }}
              >
                {/* Header bar */}
                <div
                  className="flex items-center gap-3 px-6 py-4 border-b"
                  style={{
                    borderColor: "#ff006e30",
                    background: "linear-gradient(90deg, #ff006e15, transparent)",
                  }}
                >
                  {/* Indicator LED */}
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#ff006e]"
                    style={{ boxShadow: "0 0 8px #ff006e, 0 0 16px rgba(255,0,110,0.5)" }}
                  />
                  <h3
                    className="font-black text-sm tracking-[0.35em] uppercase text-[#ff006e] outrun-neon-text"
                    style={{ fontFamily: "monospace" }}
                  >
                    ENGAGE
                  </h3>
                  <span
                    className="ml-auto text-xs text-[#ff006e]/40 tracking-wider"
                    style={{ fontFamily: "monospace" }}
                  >
                    DRIVE &#9650;
                  </span>
                </div>

                {/* Scanlines on header */}
                <div className="absolute top-0 left-0 right-0 h-16 outrun-scanlines pointer-events-none" />

                {/* Items */}
                <ul className="p-6 space-y-4">
                  {DO_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center text-[#ff006e] text-sm font-black outrun-neon-text"
                        style={{ fontFamily: "monospace" }}
                      >
                        &#10003;
                      </span>
                      <span
                        className="text-white/70 text-xs leading-relaxed tracking-wide"
                        style={{ fontFamily: "monospace" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* BRAKE — don't list */}
            <RevealBlock delay={0.15}>
              <div
                className="relative border overflow-hidden"
                style={{
                  borderColor: "#00d4ff20",
                  background: "linear-gradient(180deg, #001a1a 0%, #0a0a0a 100%)",
                  boxShadow: "inset 0 0 30px rgba(0,212,255,0.03)",
                }}
              >
                {/* Header bar */}
                <div
                  className="flex items-center gap-3 px-6 py-4 border-b"
                  style={{
                    borderColor: "#00d4ff20",
                    background: "linear-gradient(90deg, #00d4ff0d, transparent)",
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#00d4ff]"
                    style={{ boxShadow: "0 0 8px #00d4ff, 0 0 16px rgba(0,212,255,0.5)" }}
                  />
                  <h3
                    className="font-black text-sm tracking-[0.35em] uppercase text-[#00d4ff] outrun-cyan-text"
                    style={{ fontFamily: "monospace" }}
                  >
                    BRAKE
                  </h3>
                  <span
                    className="ml-auto text-xs text-[#00d4ff]/40 tracking-wider"
                    style={{ fontFamily: "monospace" }}
                  >
                    STOP &#9660;
                  </span>
                </div>

                <div className="absolute top-0 left-0 right-0 h-16 outrun-scanlines pointer-events-none" />

                <ul className="p-6 space-y-4">
                  {DONT_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center text-red-500 text-sm font-black"
                        style={{ fontFamily: "monospace", textShadow: "0 0 8px rgba(239,68,68,0.7)" }}
                      >
                        &#10007;
                      </span>
                      <span
                        className="text-white/50 text-xs leading-relaxed tracking-wide line-through decoration-red-500/40"
                        style={{ fontFamily: "monospace" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Bottom warning strip */}
          <RevealBlock delay={0.25} className="mt-6">
            <div
              className="flex items-center gap-4 px-6 py-4 border border-[#a020f0]/30"
              style={{
                background: "linear-gradient(90deg, #1a0033, #0d0020, #1a0033)",
                boxShadow: "0 0 20px rgba(160,32,240,0.1)",
              }}
            >
              <span
                className="text-[#a020f0] text-lg"
                style={{ textShadow: "0 0 10px rgba(160,32,240,0.8)" }}
              >
                &#9888;
              </span>
              <p
                className="text-[#a020f0]/70 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "monospace" }}
              >
                WARNING: Violation of speed rules degrades the Outrun field coherence. Maintain protocol at all times.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 6. TYPOGRAPHY SHOWCASE ───────────────────────────────────────── */}
      <section
        className="py-24 md:py-36 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #150028 50%, #0a0a0a 100%)" }}
      >
        <div className="absolute inset-0 outrun-scanlines pointer-events-none opacity-40" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <p
              className="text-[#ff006e]/60 text-xs tracking-[0.4em] uppercase mb-3 text-center outrun-neon-text"
              style={{ fontFamily: "monospace" }}
            >
              CHROME LETTERING
            </p>
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-wider text-center mb-16"
              style={{
                fontFamily: "Impact, 'Arial Narrow', sans-serif",
                color: "#fff",
              }}
            >
              TYPOGRAPHY
            </h2>
          </RevealBlock>

          <div
            className="border border-[#ff006e]/20 p-8 md:p-12 space-y-10 relative overflow-hidden"
            style={{
              background: "#0d0020",
              boxShadow: "inset 0 0 60px rgba(160,32,240,0.08)",
            }}
          >
            <div className="absolute inset-0 outrun-scanlines pointer-events-none" />

            {/* Display */}
            <RevealBlock delay={0.05}>
              <div>
                <span
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 block"
                  style={{ fontFamily: "monospace" }}
                >
                  DISPLAY / CHROME HERO
                </span>
                <p
                  className="text-6xl md:text-8xl font-black uppercase leading-none tracking-[0.05em]"
                  style={{
                    fontFamily: "Impact, 'Arial Narrow', sans-serif",
                    backgroundImage: "linear-gradient(180deg, #ffffff 0%, #ff006e 40%, #a020f0 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 20px rgba(255,0,110,0.4))",
                  }}
                >
                  ENDLESS
                </p>
              </div>
            </RevealBlock>

            {/* Heading */}
            <RevealBlock delay={0.1}>
              <div>
                <span
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 block"
                  style={{ fontFamily: "monospace" }}
                >
                  HEADING / NEON TITLE
                </span>
                <p
                  className="text-3xl md:text-4xl font-black uppercase tracking-widest outrun-neon-text text-[#ff006e]"
                  style={{ fontFamily: "monospace" }}
                >
                  DRIVE INTO THE FUTURE
                </p>
              </div>
            </RevealBlock>

            {/* Subheading */}
            <RevealBlock delay={0.15}>
              <div>
                <span
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 block"
                  style={{ fontFamily: "monospace" }}
                >
                  SUBHEADING / CYAN SIGNAL
                </span>
                <p
                  className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] outrun-cyan-text text-[#00d4ff]"
                  style={{ fontFamily: "monospace" }}
                >
                  WHERE NEON DREAMS NEVER FADE
                </p>
              </div>
            </RevealBlock>

            {/* Body */}
            <RevealBlock delay={0.2}>
              <div>
                <span
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 block"
                  style={{ fontFamily: "monospace" }}
                >
                  BODY / TERMINAL PROSE
                </span>
                <p
                  className="text-sm leading-relaxed text-white/50 max-w-2xl tracking-wide"
                  style={{ fontFamily: "monospace" }}
                >
                  Outrun typography is bold, chrome-plated, and larger than life. Gradient fills mimic the setting sun, while geometric sans-serifs echo the digital precision of the 80s future that never was. Every letter carries the weight of a thousand neon sunsets.
                </p>
              </div>
            </RevealBlock>

            {/* Label/mono */}
            <RevealBlock delay={0.25}>
              <div className="flex flex-wrap gap-4">
                {["MAGENTA", "PURPLE", "CYAN", "OUTRUN", "88MPH"].map((label, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-xs font-black tracking-[0.3em] uppercase border"
                    style={{
                      fontFamily: "monospace",
                      borderColor: i % 2 === 0 ? "#ff006e40" : "#00d4ff40",
                      color: i % 2 === 0 ? "#ff006e" : "#00d4ff",
                      background: i % 2 === 0 ? "rgba(255,0,110,0.05)" : "rgba(0,212,255,0.05)",
                      textShadow: i % 2 === 0
                        ? "0 0 8px rgba(255,0,110,0.5)"
                        : "0 0 8px rgba(0,212,255,0.5)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER ────────────────────────────────────────────────────── */}
      <footer
        className="relative overflow-hidden border-t border-[#ff006e]/20"
        style={{ background: "#0a0a0a" }}
      >
        {/* Mini perspective grid in footer */}
        <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden pointer-events-none opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,0,110,0.4) 1px, transparent 1px), linear-gradient(rgba(255,0,110,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 20px",
              transform: "perspective(400px) rotateX(55deg)",
              transformOrigin: "bottom",
            }}
          />
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 outrun-scanlines pointer-events-none opacity-50" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: system label */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <span
                className="text-xs tracking-[0.5em] uppercase text-[#00d4ff] outrun-cyan-text outrun-flicker"
                style={{ fontFamily: "monospace" }}
              >
                [STYLEKIT: OUTRUN SHOWCASE]
              </span>
              <span
                className="text-xs tracking-[0.3em] text-[#00d4ff]/40 uppercase"
                style={{ fontFamily: "monospace" }}
              >
                SYSTEM: NOMINAL / GRID: ACTIVE / NEON: ENGAGED
              </span>
            </div>

            {/* Center: style name */}
            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-black tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "Impact, 'Arial Narrow', sans-serif",
                  backgroundImage: "linear-gradient(180deg, #ff006e, #a020f0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 10px rgba(255,0,110,0.4))",
                }}
              >
                OUTRUN
              </div>
            </div>

            {/* Right: copyright */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "monospace", color: "rgba(255,0,110,0.35)" }}
              >
                &copy; {new Date().getFullYear()} STYLEKIT
              </span>
              <Link
                href="/styles/outrun"
                className="text-xs tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#ff006e]"
                style={{ fontFamily: "monospace", color: "rgba(255,0,110,0.35)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "0 0 8px rgba(255,0,110,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "none";
                }}
              >
                VIEW DOCS &#8594;
              </Link>
            </div>
          </div>

          {/* Bottom separator line with glow */}
          <div
            className="mt-10 h-px w-full"
            style={{
              background: "linear-gradient(90deg, transparent, #ff006e, #a020f0, #00d4ff, transparent)",
              boxShadow: "0 0 12px rgba(255,0,110,0.4)",
            }}
          />
          <p
            className="mt-6 text-center text-xs tracking-[0.4em] uppercase"
            style={{ fontFamily: "monospace", color: "rgba(160,32,240,0.4)" }}
          >
            CHASE THE SUNSET FOREVER &mdash; THE HORIZON NEVER ENDS
          </p>
        </div>
      </footer>
    </div>
  );
}
