"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const neonColors = [
  { name: "ACID GREEN", hex: "#39ff14", label: "PRIMARY", code: "39FF14", voltage: "12kV" },
  { name: "ELECTRIC YELLOW", hex: "#e6ff00", label: "ACCENT", code: "E6FF00", voltage: "9kV" },
  { name: "ELECTRIC PURPLE", hex: "#a020f0", label: "ACCENT", code: "A020F0", voltage: "15kV" },
  { name: "CYBER PINK", hex: "#ff6ec7", label: "ACCENT", code: "FF6EC7", voltage: "11kV" },
  { name: "CYAN", hex: "#00ffff", label: "ACCENT", code: "00FFFF", voltage: "8kV" },
];

const doRules = [
  "FLUORESCENT COLORS ON BLACK ONLY — maximum contrast, maximum assault",
  "ALL CAPS ALWAYS — lowercase is for the mainstream",
  "NEON GLOW EFFECTS — box-shadow and text-shadow in matching neon color",
  "EXPERIMENTAL TYPOGRAPHY — stretch, compress, rotate, collide",
  "BLACK BACKGROUND EVERYWHERE — #0a0a0a is the only valid base",
  "STROKE TEXT — -webkit-text-stroke for deconstructed hollow letterforms",
];

const dontRules = [
  "NEVER USE WHITE BACKGROUNDS — acid lives in the dark",
  "NEVER USE SOFT COLORS — pastels are for the weak",
  "NEVER USE SERIF FONTS — clean sans only, destroyed at will",
  "NEVER CENTER CONSERVATIVELY — collide everything",
  "NEVER USE ROUNDED CORNERS — sharp edges define the aesthetic",
  "NEVER USE LOW OPACITY ON TEXT — readability is a non-negotiable",
];

const typeExperimentTabs = ["DISTORTED", "STACKED", "COLLISION"] as const;
type TypeTab = typeof typeExperimentTabs[number];

const componentTabs = ["BUTTONS", "CARDS", "INPUTS"] as const;
type ComponentTab = typeof componentTabs[number];

const raveLineup = [
  { name: "PLASTIKMAN", time: "02:00 — 04:00", color: "#39ff14" },
  { name: "SURGEON", time: "00:00 — 02:00", color: "#e6ff00" },
  { name: "BLAWAN", time: "22:00 — 00:00", color: "#ff6ec7" },
  { name: "OBJEKT", time: "20:00 — 22:00", color: "#00ffff" },
  { name: "KARENN", time: "18:00 — 20:00", color: "#a020f0" },
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
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
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function NeonLabel({
  children,
  color = "#39ff14",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="text-[10px] font-black tracking-[0.4em] uppercase block mb-3"
      style={{ color, textShadow: `0 0 6px ${color}` }}
    >
      {children}
    </span>
  );
}

function GlitchDot({
  color,
  size = 6,
  top,
  left,
  right,
  bottom,
}: {
  color: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
        top,
        left,
        right,
        bottom,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeColor, setActiveColor] = useState<number>(0);
  const [posterPlaying, setPosterPlaying] = useState(false);
  const [activeType, setActiveType] = useState<number>(0);
  const [activeComponent, setActiveComponent] = useState<ComponentTab>("BUTTONS");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Suppress unused variable warning — heroInView is used implicitly via heroRef
  void heroInView;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#39ff14] font-sans overflow-x-hidden">

      {/* ===== Keyframe Animations ===== */}
      <style>{`
        @keyframes marquee-acid {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-acid {
          display: flex;
          width: max-content;
          animation: marquee-acid 18s linear infinite;
        }
        @keyframes pulse-border-acid {
          0%,  100% { border-color: #39ff14; box-shadow: 0 0 20px #39ff14; }
          33%        { border-color: #e6ff00; box-shadow: 0 0 20px #e6ff00; }
          66%        { border-color: #ff6ec7; box-shadow: 0 0 20px #ff6ec7; }
        }
        .pulse-neon-border {
          animation: pulse-border-acid 1.8s ease-in-out infinite;
        }
        @keyframes acid-flicker {
          0%, 94%, 100% { opacity: 1; }
          95%            { opacity: 0.65; }
          96%            { opacity: 1; }
          97%            { opacity: 0.45; }
          98%            { opacity: 1; }
        }
        .acid-flicker {
          animation: acid-flicker 4.5s ease-in-out infinite;
        }
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .spin-cw  { animation: spin-cw  12s linear infinite; }
        .spin-ccw { animation: spin-ccw 18s linear infinite; }
      `}</style>

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-2 border-[#39ff14]"
        style={{ boxShadow: "0 2px 20px rgba(57,255,20,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Back link */}
            <Link
              href="/styles/acid-graphics"
              className="group flex items-center gap-2"
              style={{ textDecoration: "none" }}
            >
              <span
                className="text-lg group-hover:-translate-x-1 transition-transform duration-200 inline-block"
                style={{ color: "#39ff14", textShadow: "0 0 8px #39ff14" }}
              >
                &#8592;
              </span>
              <span
                className="text-xs font-black tracking-[0.3em] uppercase"
                style={{ color: "#39ff14", textShadow: "0 0 8px #39ff14" }}
              >
                BACK TO DOCS
              </span>
            </Link>

            {/* Nav links — each a different neon color */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "TYPE", color: "#e6ff00" },
                { label: "COMPONENTS", color: "#a020f0" },
                { label: "PALETTE", color: "#ff6ec7" },
                { label: "POSTER", color: "#00ffff" },
                { label: "RULES", color: "#39ff14" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`#${item.label.toLowerCase()}`}
                  className="text-[10px] font-black tracking-[0.3em] uppercase transition-opacity duration-150 hover:opacity-60"
                  style={{ color: item.color, textShadow: `0 0 6px ${item.color}` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Return */}
            <Link
              href="/styles"
              className="text-[10px] font-black tracking-[0.25em] uppercase transition-opacity duration-200 hover:opacity-60"
              style={{ color: "#e6ff00", textShadow: "0 0 8px #e6ff00" }}
            >
              StyleKit →
            </Link>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section
        id="hero"
        ref={heroRef}
        className="relative pt-32 md:pt-40 pb-24 px-6 md:px-12 min-h-screen flex items-center overflow-hidden"
      >
        {/* Scattered neon dots */}
        <GlitchDot color="#39ff14" size={8}  top="15%"  left="8%"   />
        <GlitchDot color="#e6ff00" size={5}  top="25%"  right="12%" />
        <GlitchDot color="#a020f0" size={10} top="60%"  left="5%"   />
        <GlitchDot color="#ff6ec7" size={6}  top="72%"  right="8%"  />
        <GlitchDot color="#00ffff" size={7}  top="45%"  right="20%" />
        <GlitchDot color="#39ff14" size={4}  top="85%"  left="18%"  />
        <GlitchDot color="#e6ff00" size={9}  bottom="15%" right="25%" />
        <GlitchDot color="#ff6ec7" size={5}  top="30%"  left="30%"  />
        <GlitchDot color="#00ffff" size={6}  bottom="30%" left="12%" />

        {/* Rotating ring decoration */}
        <div className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <div className="relative w-64 h-64">
            <svg className="absolute inset-0 spin-cw" viewBox="0 0 200 200" fill="none">
              <circle
                cx="100" cy="100" r="90"
                stroke="#39ff14" strokeWidth="1.5" strokeDasharray="8 6"
                style={{ filter: "drop-shadow(0 0 6px #39ff14)" }}
              />
              <circle
                cx="100" cy="100" r="72"
                stroke="#e6ff00" strokeWidth="1" strokeDasharray="4 8"
                style={{ filter: "drop-shadow(0 0 4px #e6ff00)" }}
              />
            </svg>
            <svg className="absolute inset-0 spin-ccw" viewBox="0 0 200 200" fill="none">
              <circle
                cx="100" cy="100" r="54"
                stroke="#a020f0" strokeWidth="1.5" strokeDasharray="3 5"
                style={{ filter: "drop-shadow(0 0 5px #a020f0)" }}
              />
            </svg>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{ backgroundColor: "#ff6ec7", boxShadow: "0 0 12px #ff6ec7, 0 0 24px #ff6ec7" }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Overline */}
          <p
            className="text-[11px] font-black tracking-[0.6em] uppercase mb-6"
            style={{
              color: "#ff6ec7",
              textShadow: "0 0 8px #ff6ec7",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            90s RAVE CULTURE — UNDERGROUND AESTHETIC — MAXIMUM SENSORY ASSAULT
          </p>

          {/* ACID — filled acid green with multi-color shadow */}
          <h1
            className="font-black leading-none uppercase"
            style={{
              fontSize: "clamp(5.5rem, 20vw, 17rem)",
              color: "#39ff14",
              textShadow: "4px 4px 0 #e6ff00, 8px 8px 0 #a020f0",
              letterSpacing: "-0.02em",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            ACID
          </h1>

          {/* GRAPHICS — stroke-only text in cyan */}
          <h2
            className="font-black leading-none uppercase"
            style={{
              fontSize: "clamp(2.8rem, 10vw, 8.5rem)",
              WebkitTextStroke: "2px #00ffff",
              color: "transparent",
              letterSpacing: "0.04em",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            GRAPHICS
          </h2>

          {/* Subline + CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <p
              className="text-base font-bold max-w-sm leading-relaxed tracking-wide"
              style={{ color: "#39ff14", opacity: 0.82 }}
            >
              Fluorescent colors on black. Experimental typography. Distorted shapes. Maximum sensory assault.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                className="px-6 py-3 font-black text-xs tracking-[0.4em] uppercase border-2 transition-all duration-150"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "#39ff14",
                  borderColor: "#39ff14",
                  boxShadow: "0 0 15px #39ff14",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = "#39ff14";
                  btn.style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = "#0a0a0a";
                  btn.style.color = "#39ff14";
                }}
              >
                ENTER THE RAVE
              </button>
              <button
                className="px-6 py-3 font-black text-xs tracking-[0.4em] uppercase border-2 transition-all duration-150"
                style={{
                  backgroundColor: "transparent",
                  color: "#e6ff00",
                  borderColor: "#e6ff00",
                  boxShadow: "0 0 12px #e6ff00",
                }}
              >
                STAY UNDERGROUND
              </button>
            </div>
          </div>

          {/* Acid-style tagline row */}
          <div
            className="mt-10 flex gap-8 flex-wrap"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            {[
              { label: "BPM", value: "174", color: "#ff6ec7" },
              { label: "VOLTAGE", value: "12kV", color: "#e6ff00" },
              { label: "YEAR", value: "1993", color: "#00ffff" },
              { label: "DEPTH", value: "MAX", color: "#a020f0" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-black text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: stat.color, opacity: 0.5 }}
                >
                  {stat.label}
                </p>
                <p
                  className="font-black text-xl uppercase"
                  style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}` }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Type Experiments ===== */}
      <section
        id="type"
        className="relative py-24 md:py-32 px-6 md:px-12 border-t-2 border-[#39ff14] overflow-hidden"
      >
        {/* Corner accent lines */}
        <div
          className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
          style={{ borderRight: "1px solid #a020f0", borderBottom: "1px solid #a020f0", opacity: 0.35 }}
        />
        <div
          className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
          style={{ borderLeft: "1px solid #ff6ec7", borderTop: "1px solid #ff6ec7", opacity: 0.35 }}
        />

        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <NeonLabel color="#e6ff00">TYPE EXPERIMENTS</NeonLabel>
            <h2
              className="font-black uppercase leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                color: "#39ff14",
                textShadow: "3px 3px 0 #e6ff00",
              }}
            >
              DESTROY THE TYPE.
              <br />
              <span style={{ WebkitTextStroke: "2px #a020f0", color: "transparent" }}>
                REBUILD IT.
              </span>
            </h2>
          </RevealBlock>

          {/* Experiment tab selector */}
          <RevealBlock delay={0.08} className="mb-12">
            <div className="flex gap-0 w-fit border-2 border-[#39ff14]">
              {typeExperimentTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveType(i)}
                  className="px-6 py-3 font-black text-xs tracking-[0.3em] uppercase transition-all duration-150"
                  style={{
                    backgroundColor: activeType === i ? "#39ff14" : "transparent",
                    color: activeType === i ? "#0a0a0a" : "#39ff14",
                    borderRight: i < typeExperimentTabs.length - 1 ? "2px solid #39ff14" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Experiment: DISTORTED */}
          {activeType === 0 && (
            <RevealBlock delay={0.05}>
              <div className="relative h-80 overflow-hidden border border-[#39ff14]/20">
                {/* Stretched horizontal text */}
                <div
                  className="absolute top-4 left-0 font-black uppercase text-[#39ff14] pointer-events-none select-none"
                  style={{
                    fontSize: "clamp(4rem, 14vw, 11rem)",
                    transform: "scaleY(0.38) scaleX(1.35)",
                    transformOrigin: "top left",
                    letterSpacing: "-0.05em",
                    textShadow: "0 0 20px #39ff14",
                  }}
                >
                  WARPED
                </div>
                {/* Compressed vertical text */}
                <div
                  className="absolute bottom-0 right-8 font-black uppercase pointer-events-none select-none"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 7rem)",
                    transform: "scaleX(0.32) scaleY(1.7)",
                    transformOrigin: "bottom right",
                    color: "#ff6ec7",
                    textShadow: "2px 2px 0 #a020f0",
                    letterSpacing: "0.05em",
                  }}
                >
                  SIGNAL
                </div>
                {/* Tilted center text */}
                <div
                  className="absolute top-1/2 left-1/2 font-black uppercase pointer-events-none select-none"
                  style={{
                    fontSize: "clamp(1rem, 4vw, 3rem)",
                    transform: "translate(-50%, -50%) rotate(-12deg)",
                    color: "#e6ff00",
                    textShadow: "3px 3px 0 #a020f0",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.2em",
                  }}
                >
                  DISTORT EVERYTHING
                </div>
                {/* Vertical writing-mode accent */}
                <div
                  className="absolute top-8 right-4 font-black uppercase pointer-events-none select-none"
                  style={{
                    fontSize: "0.6rem",
                    color: "#00ffff",
                    letterSpacing: "0.5em",
                    textShadow: "0 0 8px #00ffff",
                    writingMode: "vertical-rl",
                  }}
                >
                  ACID 001 / SYSTEM OVERLOAD
                </div>
              </div>
              <p
                className="mt-4 text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: "#39ff14", opacity: 0.45 }}
              >
                TECHNIQUE: SCALE TRANSFORM — scaleX(1.35) / scaleY(0.38) — ROTATE(-12deg) — WRITING-MODE VERTICAL
              </p>
            </RevealBlock>
          )}

          {/* Experiment: STACKED */}
          {activeType === 1 && (
            <RevealBlock delay={0.05}>
              <div className="relative border border-[#a020f0]/30 p-8 overflow-hidden">
                {/* Ghost background layer */}
                <div
                  className="absolute inset-0 flex flex-col justify-center pl-6 pointer-events-none select-none"
                  style={{ opacity: 0.05 }}
                >
                  {["ACID", "ACID", "ACID"].map((t, i) => (
                    <div
                      key={i}
                      className="font-black uppercase leading-none"
                      style={{ fontSize: "clamp(5rem, 18vw, 16rem)", color: "#39ff14" }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                {/* Foreground stacked type */}
                <div className="relative z-10 space-y-0">
                  <div
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(3rem, 10vw, 8rem)",
                      color: "#39ff14",
                      textShadow: "0 0 30px #39ff14",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    STACK
                  </div>
                  <div
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(2.5rem, 8vw, 6rem)",
                      WebkitTextStroke: "2px #e6ff00",
                      color: "transparent",
                      letterSpacing: "0.08em",
                      marginTop: "-0.08em",
                    }}
                  >
                    EVERYTHING
                  </div>
                  <div
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(1.5rem, 5vw, 4rem)",
                      color: "#a020f0",
                      textShadow: "2px 2px 0 #ff6ec7",
                      letterSpacing: "0.28em",
                      marginTop: "0.06em",
                    }}
                  >
                    UNTIL IT BREAKS
                  </div>
                  <div
                    className="font-black uppercase"
                    style={{
                      fontSize: "clamp(0.55rem, 1.8vw, 1.1rem)",
                      color: "#00ffff",
                      letterSpacing: "0.6em",
                      textShadow: "0 0 8px #00ffff",
                      marginTop: "0.6rem",
                    }}
                  >
                    ACID GRAPHICS / UNDERGROUND / 1993
                  </div>
                </div>
              </div>
              <p
                className="mt-4 text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: "#39ff14", opacity: 0.45 }}
              >
                TECHNIQUE: LAYERED SIZE PROGRESSION — MIXED FILL / STROKE — TRACKING EXTREMES
              </p>
            </RevealBlock>
          )}

          {/* Experiment: COLLISION */}
          {activeType === 2 && (
            <RevealBlock delay={0.05}>
              <div className="relative h-80 overflow-hidden border border-[#ff6ec7]/20">
                {/* Left collision half */}
                <div
                  className="absolute top-0 left-0 font-black uppercase leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(5rem, 17vw, 15rem)",
                    color: "#39ff14",
                    textShadow: "0 0 40px #39ff14",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.85,
                  }}
                >
                  COL
                </div>
                {/* Right collision half */}
                <div
                  className="absolute bottom-0 right-0 font-black uppercase leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(5rem, 17vw, 15rem)",
                    WebkitTextStroke: "3px #ff6ec7",
                    color: "transparent",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.85,
                  }}
                >
                  LIDE
                </div>
                {/* Impact zone label */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black uppercase text-center"
                  style={{
                    fontSize: "clamp(0.55rem, 1.8vw, 0.9rem)",
                    color: "#e6ff00",
                    letterSpacing: "0.5em",
                    textShadow: "0 0 10px #e6ff00",
                    whiteSpace: "nowrap",
                    backgroundColor: "#0a0a0a",
                    padding: "4px 12px",
                  }}
                >
                  x IMPACT ZONE x
                </div>
                {/* Vertical axis line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px pointer-events-none"
                  style={{ backgroundColor: "#a020f0", boxShadow: "0 0 8px #a020f0", opacity: 0.55 }}
                />
              </div>
              <p
                className="mt-4 text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: "#39ff14", opacity: 0.45 }}
              >
                TECHNIQUE: ABSOLUTE POSITIONING — OVERLAPPING Z-LAYERS — FILL vs STROKE CONTRAST
              </p>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== 4. Component Showcase ===== */}
      <section
        id="components"
        className="relative py-24 md:py-32 px-6 md:px-12 border-t border-[#a020f0]/40 overflow-hidden"
      >
        <GlitchDot color="#a020f0" size={8}  top="10%"    right="5%" />
        <GlitchDot color="#00ffff" size={5}  bottom="20%" left="3%"  />

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-12">
            <NeonLabel color="#a020f0">COMPONENTS</NeonLabel>
            <h2
              className="font-black uppercase leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                color: "#39ff14",
                textShadow: "2px 2px 0 #e6ff00",
              }}
            >
              ACID UI SYSTEM
            </h2>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.06} className="mb-12">
            <div className="flex gap-0 w-fit">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponent(tab)}
                  className="px-6 py-3 font-black text-xs tracking-[0.3em] uppercase border-2 transition-all duration-150"
                  style={{
                    borderColor: activeComponent === tab ? "#e6ff00" : "#39ff14",
                    backgroundColor: activeComponent === tab ? "#e6ff00" : "transparent",
                    color: activeComponent === tab ? "#0a0a0a" : "#39ff14",
                    boxShadow: activeComponent === tab ? "0 0 12px #e6ff00" : "none",
                    marginRight: "-2px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons */}
          {activeComponent === "BUTTONS" && (
            <RevealBlock>
              <div className="space-y-10">
                {/* Primary — black bg, green border, hover shifts yellow */}
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.35em] uppercase mb-4"
                    style={{ color: "#39ff14", opacity: 0.5 }}
                  >
                    PRIMARY — BLACK BG, GREEN BORDER, HOVER SHIFTS TO YELLOW FILL
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {["ENGAGE SYSTEM", "ENTER RAVE", "ACTIVATE"].map((label) => (
                      <button
                        key={label}
                        className="px-7 py-3 font-black text-xs tracking-[0.4em] uppercase border-2 transition-all duration-150"
                        style={{
                          backgroundColor: "#0a0a0a",
                          color: "#39ff14",
                          borderColor: "#39ff14",
                          boxShadow: "0 0 15px #39ff14",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.color = "#0a0a0a";
                          el.style.backgroundColor = "#e6ff00";
                          el.style.borderColor = "#e6ff00";
                          el.style.boxShadow = "0 0 20px #e6ff00";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.color = "#39ff14";
                          el.style.backgroundColor = "#0a0a0a";
                          el.style.borderColor = "#39ff14";
                          el.style.boxShadow = "0 0 15px #39ff14";
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Neon stroke variants */}
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.35em] uppercase mb-4"
                    style={{ color: "#39ff14", opacity: 0.5 }}
                  >
                    STROKE VARIANTS — EACH BORDER IN A DIFFERENT NEON FREQUENCY
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: "PINK SIGNAL", color: "#ff6ec7" },
                      { label: "CYAN PULSE",  color: "#00ffff" },
                      { label: "PURPLE WAVE", color: "#a020f0" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="px-7 py-3 font-black text-xs tracking-[0.4em] uppercase border-2"
                        style={{
                          backgroundColor: "transparent",
                          color: item.color,
                          borderColor: item.color,
                          boxShadow: `0 0 12px ${item.color}`,
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Solid fill */}
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.35em] uppercase mb-4"
                    style={{ color: "#39ff14", opacity: 0.5 }}
                  >
                    SOLID FILL — MAXIMUM AGGRESSION
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="px-8 py-4 font-black text-sm tracking-[0.4em] uppercase"
                      style={{
                        backgroundColor: "#39ff14",
                        color: "#0a0a0a",
                        boxShadow: "0 0 20px #39ff14, 0 0 40px #39ff14",
                      }}
                    >
                      FULL POWER
                    </button>
                    <button
                      className="px-8 py-4 font-black text-sm tracking-[0.4em] uppercase"
                      style={{
                        backgroundColor: "#a020f0",
                        color: "#ffffff",
                        boxShadow: "0 0 20px #a020f0, 0 0 40px #a020f0",
                      }}
                    >
                      OVERLOAD
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards */}
          {activeComponent === "CARDS" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Acid green neon card */}
                <div
                  className="relative p-6 border-2 cursor-default"
                  style={{
                    backgroundColor: "#0a0a0a",
                    borderColor: "#39ff14",
                    boxShadow: "0 0 15px #39ff14, inset 0 0 20px rgba(57,255,20,0.03)",
                  }}
                >
                  <div
                    className="text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#39ff14", opacity: 0.55 }}
                  >
                    SIGNAL / 001
                  </div>
                  <h3
                    className="text-2xl font-black uppercase mb-3 leading-tight"
                    style={{ color: "#39ff14", textShadow: "0 0 12px #39ff14" }}
                  >
                    ACID CORE
                  </h3>
                  <p
                    className="text-sm font-bold leading-relaxed"
                    style={{ color: "#39ff14", opacity: 0.7 }}
                  >
                    The foundational aesthetic of underground culture. No compromise. No pastels. Pure neon energy.
                  </p>
                  <div
                    className="mt-4 text-[10px] font-black tracking-[0.4em] uppercase"
                    style={{ color: "#e6ff00", textShadow: "0 0 6px #e6ff00" }}
                  >
                    ENTER →
                  </div>
                </div>

                {/* Cyber pink — stroke title */}
                <div
                  className="relative p-6 border-2 cursor-default"
                  style={{
                    backgroundColor: "#0a0a0a",
                    borderColor: "#ff6ec7",
                    boxShadow: "0 0 15px #ff6ec7, inset 0 0 20px rgba(255,110,199,0.03)",
                  }}
                >
                  <div
                    className="text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#ff6ec7", opacity: 0.55 }}
                  >
                    CYBER / 002
                  </div>
                  <h3
                    className="text-2xl font-black uppercase mb-3 leading-tight"
                    style={{
                      WebkitTextStroke: "1.5px #ff6ec7",
                      color: "transparent",
                    }}
                  >
                    NEON GHOST
                  </h3>
                  <p
                    className="text-sm font-bold leading-relaxed"
                    style={{ color: "#ff6ec7", opacity: 0.7 }}
                  >
                    Stroke-only headlines for that hollow, deconstructed typographic effect. Maximum drama.
                  </p>
                  <div
                    className="mt-4 text-[10px] font-black tracking-[0.4em] uppercase"
                    style={{ color: "#a020f0", textShadow: "0 0 6px #a020f0" }}
                  >
                    ENTER →
                  </div>
                </div>

                {/* Purple/cyan multi-color shadow */}
                <div
                  className="relative p-6 border-2 cursor-default"
                  style={{
                    backgroundColor: "#0a0a0a",
                    borderColor: "#a020f0",
                    boxShadow: "0 0 15px #a020f0, inset 0 0 20px rgba(160,32,240,0.03)",
                  }}
                >
                  <div
                    className="text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#a020f0", opacity: 0.55 }}
                  >
                    VOID / 003
                  </div>
                  <h3
                    className="text-2xl font-black uppercase mb-3 leading-tight"
                    style={{
                      color: "#00ffff",
                      textShadow: "2px 2px 0 #a020f0, 4px 4px 0 #ff6ec7, 0 0 20px #00ffff",
                    }}
                  >
                    DEEP VOID
                  </h3>
                  <p
                    className="text-sm font-bold leading-relaxed"
                    style={{ color: "#00ffff", opacity: 0.7 }}
                  >
                    Multi-color drop shadow stacking — cyan text with purple and pink offsets creates depth without gradients.
                  </p>
                  <div
                    className="mt-4 text-[10px] font-black tracking-[0.4em] uppercase"
                    style={{ color: "#00ffff", textShadow: "0 0 6px #00ffff" }}
                  >
                    ENTER →
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Inputs */}
          {activeComponent === "INPUTS" && (
            <RevealBlock>
              <div className="max-w-md space-y-8">
                {/* Skewed green input */}
                <div>
                  <label
                    className="block text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#39ff14" }}
                  >
                    CALLSIGN
                  </label>
                  <input
                    type="text"
                    placeholder="ENTER_HANDLE_"
                    className="w-full px-4 py-3 font-black text-sm tracking-[0.2em] uppercase focus:outline-none transition-all duration-150"
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#39ff14",
                      border: "2px solid #39ff14",
                      boxShadow: "0 0 10px #39ff14",
                      transform: "skewX(-2deg)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#e6ff00";
                      e.target.style.boxShadow = "0 0 20px #e6ff00";
                      e.target.style.color = "#e6ff00";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#39ff14";
                      e.target.style.boxShadow = "0 0 10px #39ff14";
                      e.target.style.color = "#39ff14";
                    }}
                  />
                </div>

                {/* Cyan frequency input */}
                <div>
                  <label
                    className="block text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#00ffff" }}
                  >
                    FREQUENCY
                  </label>
                  <input
                    type="text"
                    placeholder="000.000 MHZ"
                    className="w-full px-4 py-3 font-black text-sm tracking-[0.2em] uppercase focus:outline-none transition-all duration-150"
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#00ffff",
                      border: "2px solid #00ffff",
                      boxShadow: "0 0 10px #00ffff",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = "0 0 25px #00ffff, 0 0 50px rgba(0,255,255,0.18)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "0 0 10px #00ffff";
                    }}
                  />
                </div>

                {/* Pink textarea — skewed, distorted */}
                <div>
                  <label
                    className="block text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#ff6ec7" }}
                  >
                    TRANSMISSION
                  </label>
                  <textarea
                    rows={3}
                    placeholder="BROADCAST YOUR SIGNAL TO THE UNDERGROUND..."
                    className="w-full px-4 py-3 font-bold text-sm tracking-wide uppercase resize-none focus:outline-none transition-all duration-150"
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#ff6ec7",
                      border: "2px solid #ff6ec7",
                      boxShadow: "0 0 10px #ff6ec7",
                      transform: "skewX(-1deg)",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = "0 0 20px #ff6ec7, 0 0 40px rgba(255,110,199,0.18)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = "0 0 10px #ff6ec7";
                    }}
                  />
                </div>

                <p
                  className="text-[10px] font-bold tracking-[0.3em] uppercase"
                  style={{ color: "#39ff14", opacity: 0.4 }}
                >
                  SKEWED BORDERS / NEON FOCUS GLOW / ALL CAPS EVERYWHERE
                </p>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== 5. Neon Color Palette ===== */}
      <section
        id="palette"
        className="relative py-24 md:py-32 px-6 md:px-12 border-t-2 border-[#e6ff00] overflow-hidden"
        style={{ boxShadow: "inset 0 2px 20px rgba(230,255,0,0.05)" }}
      >
        <GlitchDot color="#39ff14" size={10} top="5%"    left="2%"  />
        <GlitchDot color="#ff6ec7" size={6}  bottom="8%" right="3%" />

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-4">
            <NeonLabel color="#e6ff00">HIGH VOLTAGE PALETTE</NeonLabel>
            <h2
              className="font-black uppercase leading-tight mb-2"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                color: "#e6ff00",
                textShadow: "2px 2px 0 #39ff14",
              }}
            >
              NEON COLOR PALETTE
            </h2>
            <p
              className="font-black text-sm tracking-[0.5em] uppercase"
              style={{ color: "#ff6ec7", textShadow: "0 0 8px #ff6ec7" }}
            >
              CAUTION: HIGH VOLTAGE — 5 LIVE FREQUENCIES
            </p>
          </RevealBlock>

          {/* Swatches grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
            {neonColors.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <button
                  onClick={() => setActiveColor(i)}
                  className="w-full text-left transition-all duration-200 focus:outline-none"
                  aria-label={`Activate ${color.name}`}
                >
                  {/* Swatch */}
                  <div
                    className="relative h-40 w-full mb-4 flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow:
                        activeColor === i
                          ? `0 0 30px ${color.hex}, 0 0 60px ${color.hex}, 0 0 90px ${color.hex}40`
                          : `0 0 20px ${color.hex}, 0 0 40px ${color.hex}`,
                      transform: activeColor === i ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <span
                      className="font-black text-lg tracking-widest select-none"
                      style={{ color: "#0a0a0a", opacity: 0.35 }}
                    >
                      {color.voltage}
                    </span>
                    {activeColor === i && (
                      <div
                        className="absolute top-2 right-2 font-black text-[9px] tracking-widest uppercase px-1.5 py-0.5"
                        style={{ backgroundColor: "#0a0a0a", color: color.hex }}
                      >
                        ACTIVE
                      </div>
                    )}
                  </div>
                  {/* Color info */}
                  <p
                    className="font-black text-xs tracking-[0.3em] uppercase leading-tight"
                    style={{ color: color.hex, textShadow: `0 0 8px ${color.hex}` }}
                  >
                    {color.name}
                  </p>
                  <p
                    className="font-black text-[10px] tracking-[0.2em] uppercase mt-1"
                    style={{ color: color.hex, opacity: 0.5 }}
                  >
                    #{color.code}
                  </p>
                  <p
                    className="font-bold text-[9px] tracking-[0.35em] uppercase mt-1"
                    style={{ color: color.hex, opacity: 0.38 }}
                  >
                    {color.label}
                  </p>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Active color large display */}
          <RevealBlock delay={0.4} className="mt-16">
            <div
              className="p-8 border-2 flex flex-col md:flex-row items-start md:items-center gap-8 transition-all duration-300"
              style={{
                borderColor: neonColors[activeColor].hex,
                boxShadow: `0 0 30px ${neonColors[activeColor].hex}`,
              }}
            >
              <div
                className="w-20 h-20 flex-shrink-0"
                style={{
                  backgroundColor: neonColors[activeColor].hex,
                  boxShadow: `0 0 30px ${neonColors[activeColor].hex}, 0 0 60px ${neonColors[activeColor].hex}`,
                }}
              />
              <div>
                <p
                  className="font-black uppercase tracking-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 3rem)",
                    color: neonColors[activeColor].hex,
                    textShadow: `0 0 20px ${neonColors[activeColor].hex}`,
                  }}
                >
                  {neonColors[activeColor].name}
                </p>
                <p
                  className="font-black text-sm tracking-[0.5em] uppercase mt-2"
                  style={{ color: neonColors[activeColor].hex, opacity: 0.5 }}
                >
                  #{neonColors[activeColor].code} — {neonColors[activeColor].voltage} — {neonColors[activeColor].label}
                </p>
              </div>
              <div className="md:ml-auto">
                <p
                  className="font-black text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: neonColors[activeColor].hex, opacity: 0.45 }}
                >
                  CLICK ANY SWATCH TO ACTIVATE
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Rave Poster ===== */}
      <section
        id="poster"
        className="relative py-24 md:py-32 px-6 md:px-12 border-t border-[#ff6ec7]/35 overflow-hidden"
      >
        <GlitchDot color="#39ff14" size={12} top="3%"   right="8%" />
        <GlitchDot color="#e6ff00" size={7}  bottom="5%" left="6%" />
        <GlitchDot color="#00ffff" size={9}  top="50%"  left="2%"  />

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-12">
            <NeonLabel color="#ff6ec7">MOCK RAVE POSTER</NeonLabel>
            <h2
              className="font-black uppercase leading-tight"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                color: "#39ff14",
                textShadow: "2px 2px 0 #e6ff00",
              }}
            >
              FULL ACID AESTHETIC
            </h2>
          </RevealBlock>

          {/* Live mode toggle */}
          <RevealBlock delay={0.06} className="mb-10">
            <button
              onClick={() => setPosterPlaying(!posterPlaying)}
              className="px-8 py-4 font-black text-sm tracking-[0.4em] uppercase border-2 transition-all duration-200"
              style={{
                backgroundColor: posterPlaying ? "#39ff14" : "#0a0a0a",
                color: posterPlaying ? "#0a0a0a" : "#39ff14",
                borderColor: "#39ff14",
                boxShadow: posterPlaying
                  ? "0 0 30px #39ff14, 0 0 60px #39ff14"
                  : "0 0 15px #39ff14",
              }}
            >
              {posterPlaying ? "RAVE IS LIVE — ALL SYSTEMS GO" : "ACTIVATE RAVE MODE"}
            </button>
          </RevealBlock>

          {/* Poster layout */}
          <RevealBlock delay={0.1}>
            <div
              className={`relative p-8 md:p-14 border-2 overflow-hidden ${posterPlaying ? "pulse-neon-border" : ""}`}
              style={{
                backgroundColor: "#0a0a0a",
                borderColor: "#39ff14",
                boxShadow: posterPlaying
                  ? "0 0 30px #39ff14, 0 0 60px #39ff14"
                  : "0 0 20px #39ff14",
              }}
            >
              {/* Geometric decorations */}
              <div
                className="absolute top-6 right-6 w-24 h-24 rounded-full pointer-events-none transition-all duration-300"
                style={{
                  border: `2px solid ${posterPlaying ? "#ff6ec7" : "#a020f0"}`,
                  boxShadow: posterPlaying ? "0 0 15px #ff6ec7" : "0 0 10px #a020f0",
                }}
              />
              <div
                className="absolute top-12 right-12 w-12 h-12 pointer-events-none transition-all duration-300"
                style={{
                  border: `1px solid ${posterPlaying ? "#e6ff00" : "#00ffff"}`,
                  boxShadow: posterPlaying ? "0 0 10px #e6ff00" : "0 0 6px #00ffff",
                }}
              />
              <div
                className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none transition-all duration-300"
                style={{
                  border: `2px solid ${posterPlaying ? "#00ffff" : "#e6ff00"}`,
                  transform: "rotate(45deg)",
                  boxShadow: posterPlaying ? "0 0 12px #00ffff" : "0 0 8px #e6ff00",
                }}
              />

              <div className="relative z-10">
                {/* Event name — massive type */}
                <div
                  className="font-black uppercase leading-none mb-4"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    color: "#39ff14",
                    textShadow: posterPlaying
                      ? "4px 4px 0 #e6ff00, 8px 8px 0 #a020f0, 0 0 40px #39ff14"
                      : "4px 4px 0 #e6ff00, 8px 8px 0 #a020f0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  SYSTEM
                  <br />
                  <span
                    style={{
                      WebkitTextStroke: "3px #ff6ec7",
                      color: "transparent",
                      textShadow: posterPlaying ? "0 0 30px #ff6ec7" : "none",
                    }}
                  >
                    BREACH
                  </span>
                </div>

                {/* Date — huge type + city */}
                <div className="flex items-baseline gap-4 mb-8 flex-wrap">
                  <span
                    className="font-black uppercase"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 5rem)",
                      color: "#e6ff00",
                      textShadow: posterPlaying ? "0 0 20px #e6ff00" : "2px 2px 0 #39ff14",
                      letterSpacing: "0.05em",
                    }}
                  >
                    03.06.1993
                  </span>
                  <span
                    className="font-black text-xl md:text-2xl uppercase tracking-[0.4em]"
                    style={{ color: "#00ffff", textShadow: "0 0 10px #00ffff" }}
                  >
                    BERLIN
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-8"
                  style={{ backgroundColor: "#a020f0", boxShadow: "0 0 8px #a020f0" }}
                />

                {/* Lineup list */}
                <div className="mb-8">
                  <p
                    className="font-black text-[10px] tracking-[0.6em] uppercase mb-5"
                    style={{ color: "#ff6ec7", textShadow: "0 0 6px #ff6ec7" }}
                  >
                    LINEUP
                  </p>
                  <div className="space-y-3">
                    {raveLineup.map((act, i) => (
                      <div
                        key={act.name}
                        className="flex items-center justify-between"
                      >
                        <span
                          className="font-black uppercase"
                          style={{
                            fontSize: i === 0
                              ? "clamp(1.5rem, 4vw, 2.5rem)"
                              : "clamp(1rem, 2.5vw, 1.5rem)",
                            color: act.color,
                            textShadow: posterPlaying
                              ? `0 0 15px ${act.color}`
                              : "none",
                            letterSpacing: i === 0 ? "0.02em" : "0.1em",
                          }}
                        >
                          {act.name}
                        </span>
                        <span
                          className="font-black text-xs tracking-[0.3em] uppercase"
                          style={{ color: "#a020f0", opacity: 0.8 }}
                        >
                          {act.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-6"
                  style={{ backgroundColor: "#e6ff00", boxShadow: "0 0 6px #e6ff00" }}
                />

                {/* Venue row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p
                      className="font-black text-base md:text-xl uppercase tracking-widest"
                      style={{ color: "#00ffff", textShadow: "0 0 10px #00ffff" }}
                    >
                      TRESOR — MITTE
                    </p>
                    <p
                      className="font-bold text-xs tracking-[0.4em] uppercase mt-1"
                      style={{ color: "#39ff14", opacity: 0.45 }}
                    >
                      DOORS 18:00 — 18+ — UNDERGROUND ONLY
                    </p>
                  </div>
                  <div
                    className="font-black text-sm tracking-[0.3em] uppercase px-4 py-2 border"
                    style={{
                      borderColor: "#ff6ec7",
                      color: "#ff6ec7",
                      boxShadow: posterPlaying ? "0 0 15px #ff6ec7" : "0 0 8px #ff6ec7",
                    }}
                  >
                    NO CAMERAS / NO COMPROMISE
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. Do / Don't Rules ===== */}
      <section
        id="rules"
        className="relative py-24 md:py-32 px-6 md:px-12 border-t border-[#00ffff]/28 overflow-hidden"
      >
        <GlitchDot color="#e6ff00" size={8} top="8%"    left="4%"  />
        <GlitchDot color="#a020f0" size={6} bottom="8%" right="5%" />

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-16">
            <NeonLabel color="#00ffff">MANIFESTO</NeonLabel>
            <h2
              className="font-black uppercase leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "#39ff14",
                textShadow: "2px 2px 0 #e6ff00",
              }}
            >
              ACID LAWS
            </h2>
            <p
              className="mt-3 font-black text-sm tracking-[0.4em] uppercase"
              style={{ color: "#ff6ec7", opacity: 0.65 }}
            >
              FOLLOW THEM OR GO BACK TO THE MAINSTREAM
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock delay={0.05}>
              <div
                className="h-full p-8 border-2"
                style={{
                  borderColor: "#39ff14",
                  boxShadow: "0 0 20px rgba(57,255,20,0.12)",
                  backgroundColor: "#0a0a0a",
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-8 h-8 flex items-center justify-center font-black text-lg flex-shrink-0"
                    style={{ backgroundColor: "#39ff14", color: "#0a0a0a" }}
                  >
                    DO
                  </div>
                  <h3
                    className="text-lg font-black uppercase tracking-[0.4em]"
                    style={{ color: "#39ff14", textShadow: "0 0 10px #39ff14" }}
                  >
                    DO THIS
                  </h3>
                </div>
                <ul className="space-y-5">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span
                        className="font-black text-[10px] tracking-[0.3em] flex-shrink-0 mt-0.5"
                        style={{ color: "#e6ff00", textShadow: "0 0 6px #e6ff00" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-sm font-bold leading-relaxed uppercase tracking-wide"
                        style={{ color: "#39ff14", opacity: 0.85 }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.1}>
              <div
                className="h-full p-8 border-2"
                style={{
                  borderColor: "#ff6ec7",
                  boxShadow: "0 0 20px rgba(255,110,199,0.12)",
                  backgroundColor: "#0a0a0a",
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-8 h-8 flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ backgroundColor: "#ff6ec7", color: "#0a0a0a" }}
                  >
                    NO
                  </div>
                  <h3
                    className="text-lg font-black uppercase tracking-[0.4em] line-through"
                    style={{ color: "#ff6ec7", textShadow: "0 0 10px #ff6ec7" }}
                  >
                    DON&apos;T
                  </h3>
                </div>
                <ul className="space-y-5">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span
                        className="font-black text-[10px] tracking-[0.3em] flex-shrink-0 mt-0.5 line-through"
                        style={{ color: "#ff6ec7", opacity: 0.65 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-sm font-bold leading-relaxed uppercase tracking-wide line-through"
                        style={{ color: "#ff6ec7", opacity: 0.65 }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy banner */}
          <RevealBlock delay={0.2} className="mt-12">
            <div
              className="relative p-8 overflow-hidden border"
              style={{ borderColor: "#a020f0", boxShadow: "0 0 20px rgba(160,32,240,0.18)" }}
            >
              <div className="relative z-10 text-center">
                <p
                  className="font-black uppercase leading-tight"
                  style={{
                    fontSize: "clamp(1.1rem, 4vw, 2.2rem)",
                    color: "#a020f0",
                    textShadow: "2px 2px 0 #ff6ec7",
                    letterSpacing: "0.04em",
                  }}
                >
                  THE UNDERGROUND NEVER ASKS FOR PERMISSION.
                </p>
                <p
                  className="mt-3 font-black text-xs tracking-[0.6em] uppercase"
                  style={{ color: "#39ff14", opacity: 0.45 }}
                >
                  ACID GRAPHICS — BORN IN THE DARK — 1988
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Footer ===== */}
      <footer className="relative border-t-2 border-[#39ff14] overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
        {/* Static noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />

        {/* Scrolling marquee */}
        <div
          className="py-4 overflow-hidden border-b border-[#39ff14]/25"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          <div className="marquee-acid">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-black uppercase text-sm tracking-[0.5em] px-8 flex-shrink-0"
                style={{ color: "#39ff14", textShadow: "0 0 10px #39ff14" }}
              >
                STAY UNDERGROUND&nbsp;&nbsp;*&nbsp;&nbsp;ACID GRAPHICS&nbsp;&nbsp;*&nbsp;&nbsp;NO COMPROMISE&nbsp;&nbsp;*&nbsp;&nbsp;MAXIMUM ASSAULT&nbsp;&nbsp;*
              </span>
            ))}
          </div>
        </div>

        {/* Footer body */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <p
                className="font-black text-xl tracking-[0.5em] uppercase mb-3 acid-flicker"
                style={{ color: "#39ff14", textShadow: "0 0 15px #39ff14" }}
              >
                ACID GRAPHICS
              </p>
              <p
                className="font-bold text-xs tracking-[0.3em] uppercase leading-relaxed"
                style={{ color: "#39ff14", opacity: 0.4 }}
              >
                90s RAVE CULTURE — UNDERGROUND CLUB SCENE — FLUORESCENT ON BLACK — EXPERIMENTAL TYPOGRAPHY
              </p>
            </div>

            {/* Nav links */}
            <div>
              <p
                className="font-black text-[10px] tracking-[0.5em] uppercase mb-4"
                style={{ color: "#e6ff00", textShadow: "0 0 6px #e6ff00" }}
              >
                FREQUENCIES
              </p>
              <ul className="space-y-3">
                {[
                  { label: "ALL STYLES",    href: "/styles" },
                  { label: "DOCUMENTATION", href: "/styles/acid-graphics" },
                  { label: "STYLEKIT HOME", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-black text-xs tracking-[0.3em] uppercase transition-opacity duration-150 hover:opacity-60"
                      style={{ color: "#39ff14" }}
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color swatches */}
            <div>
              <p
                className="font-black text-[10px] tracking-[0.5em] uppercase mb-4"
                style={{ color: "#ff6ec7", textShadow: "0 0 6px #ff6ec7" }}
              >
                ACTIVE SIGNALS
              </p>
              <div className="flex gap-3 mb-6">
                {["#39ff14", "#e6ff00", "#a020f0", "#ff6ec7", "#00ffff"].map((c) => (
                  <div
                    key={c}
                    className="w-8 h-8"
                    style={{
                      backgroundColor: c,
                      boxShadow: `0 0 12px ${c}, 0 0 24px ${c}55`,
                    }}
                  />
                ))}
              </div>
              <p
                className="font-bold text-[9px] tracking-[0.4em] uppercase"
                style={{ color: "#39ff14", opacity: 0.35 }}
              >
                ALL CHANNELS LIVE
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#39ff14]/25"
          >
            <p
              className="font-black text-[9px] tracking-[0.5em] uppercase"
              style={{ color: "#39ff14", opacity: 0.55 }}
            >
              ACID GRAPHICS — STYLEKIT — UNDERGROUND SINCE 1988
            </p>
            <p
              className="font-black text-[9px] tracking-[0.4em] uppercase"
              style={{ color: "#e6ff00", opacity: 0.4 }}
            >
              NO MAINSTREAM / NO PASTEL / NO COMPROMISE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
