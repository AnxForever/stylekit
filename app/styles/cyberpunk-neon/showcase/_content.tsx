"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
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
/*  Blinking cursor                                                     */
/* ------------------------------------------------------------------ */

function BlinkCursor({ color = "#00ffff" }: { color?: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        color,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.1s",
        fontFamily: "monospace",
      }}
    >
      _
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Blinking status dot                                                 */
/* ------------------------------------------------------------------ */

function BlinkDot({ color = "#00ffff" }: { color?: string }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: on ? `0 0 8px ${color}, 0 0 16px ${color}` : "none",
        opacity: on ? 1 : 0.25,
        transition: "opacity 0.3s, box-shadow 0.3s",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  HUD corner frame                                                   */
/* ------------------------------------------------------------------ */

function HudFrame({
  children,
  color = "#00ffff",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* corners */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 14,
          height: 14,
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 14,
          height: 14,
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 14,
          height: 14,
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />
      <div
        style={{
          border: `1px solid ${color}33`,
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scan-line overlay (reusable)                                       */
/* ------------------------------------------------------------------ */

function ScanLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 3px)",
        zIndex: 1,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const neonThemes = [
  { label: "CYAN", color: "#00ffff", bg: "rgba(0,255,255,0.08)", border: "rgba(0,255,255,0.5)" },
  { label: "MAGENTA", color: "#ff00ff", bg: "rgba(255,0,255,0.08)", border: "rgba(255,0,255,0.5)" },
  { label: "YELLOW", color: "#ffff00", bg: "rgba(255,255,0,0.08)", border: "rgba(255,255,0,0.5)" },
  { label: "GREEN", color: "#00ff00", bg: "rgba(0,255,0,0.08)", border: "rgba(0,255,0,0.5)" },
];

const colorSwatches = [
  { name: "VOID", hex: "#0a0a0f", glow: "none" },
  { name: "CYAN", hex: "#00ffff", glow: "0 0 20px rgba(0,255,255,0.8),0 0 40px rgba(0,255,255,0.4)" },
  { name: "MAGENTA", hex: "#ff00ff", glow: "0 0 20px rgba(255,0,255,0.8),0 0 40px rgba(255,0,255,0.4)" },
  { name: "YELLOW", hex: "#ffff00", glow: "0 0 20px rgba(255,255,0,0.8),0 0 40px rgba(255,255,0,0.4)" },
  { name: "GREEN", hex: "#00ff00", glow: "0 0 20px rgba(0,255,0,0.8),0 0 40px rgba(0,255,0,0.4)" },
];

const hudStats = [
  { label: "LINES_OF_CODE", value: "148,293", unit: "LOC", color: "#00ffff" },
  { label: "COMPONENTS", value: "372", unit: "CMP", color: "#ff00ff" },
  { label: "ANIMATIONS", value: "64", unit: "ANM", color: "#ffff00" },
  { label: "BUILDS", value: "1,024", unit: "BLD", color: "#00ff00" },
];

const doRules = [
  "Dark base (#0a0a0f) — no bright backgrounds",
  "Neon glow on all interactive elements",
  "Monospace font — font-mono everywhere",
  "Uppercase text with wide tracking",
  "Scan-line overlays on panels and cards",
  "HUD corner decorations on data frames",
  "Chromatic aberration on hero headings",
  "Snappy 100ms hover transitions",
];

const dontRules = [
  "Never use white or light backgrounds",
  "Never use proportional (serif/sans) fonts",
  "Never use rounded corners beyond 2px",
  "Never use box shadows without neon color",
  "Never use pastel or desaturated colors",
  "Never omit scan-line texture on cards",
  "Never use slow (>300ms) transitions",
  "Never use solid fills without glow",
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeNeon, setActiveNeon] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> SYSTEM BOOT SEQUENCE INITIATED",
    "> LOADING KERNEL MODULES...",
    "> STYLEKIT CORE v3.1.4 READY",
  ]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [inputFocused, setInputFocused] = useState(false);

  const currentTheme = neonThemes[activeNeon];

  function handleGlitchToggle() {
    setGlitchActive((v) => !v);
  }

  function handleTerminalRun() {
    const cmds = [
      "> SCANNING NEURAL NETWORK...",
      "> INJECTING NEON PROTOCOLS...",
      `> SECTOR_${Math.floor(Math.random() * 99)}: COMPROMISED`,
      "> FIREWALL OVERRIDE: SUCCESS",
      "> ACCESS GRANTED — WELCOME, RUNNER",
    ];
    const next = cmds[terminalLines.length % cmds.length];
    setTerminalLines((prev) => [...prev.slice(-7), next]);
  }

  /* ---- glitch keyframe injected via <style> tag (no JSX) ---------- */
  const glitchKeyframes = `
    @keyframes glitch-skew {
      0%,100% { transform: skewX(0deg); }
      10% { transform: skewX(-3deg); }
      20% { transform: skewX(3deg); }
      30% { transform: skewX(-1deg); }
      40% { transform: skewX(1deg); }
      50% { transform: skewX(-2deg); }
    }
    @keyframes glitch-slice-top {
      0%,100% { clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%); transform: translate(-3px,0); }
      25% { clip-path: polygon(0 5%, 100% 5%, 100% 28%, 0 28%); transform: translate(3px,0); }
      50% { clip-path: polygon(0 2%, 100% 2%, 100% 32%, 0 32%); transform: translate(-2px,0); }
      75% { clip-path: polygon(0 8%, 100% 8%, 100% 26%, 0 26%); transform: translate(2px,0); }
    }
    @keyframes glitch-slice-bot {
      0%,100% { clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%); transform: translate(3px,0); }
      25% { clip-path: polygon(0 65%, 100% 65%, 100% 95%, 0 95%); transform: translate(-3px,0); }
      50% { clip-path: polygon(0 72%, 100% 72%, 100% 98%, 0 98%); transform: translate(2px,0); }
      75% { clip-path: polygon(0 68%, 100% 68%, 100% 92%, 0 92%); transform: translate(-2px,0); }
    }
    @keyframes neon-pulse {
      0%,100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes scan-drift {
      0% { background-position: 0 0; }
      100% { background-position: 0 100px; }
    }
  `;

  return (
    <div
      className="min-h-screen font-mono"
      style={{ backgroundColor: "#0a0a0f", color: "#e0e0e0", position: "relative" }}
    >
      {/* Global keyframes */}
      <style>{glitchKeyframes}</style>

      {/* Fixed global scan-line overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg,rgba(0,0,0,0.14) 0px,rgba(0,0,0,0.14) 1px,transparent 1px,transparent 3px)",
          zIndex: 100,
        }}
      />

      {/* Fixed global grid background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* ============================================================ */}
      {/* SECTION 1 — FIXED NAV                                        */}
      {/* ============================================================ */}
      <nav
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3"
        style={{
          backgroundColor: "rgba(10,10,15,0.95)",
          boxShadow: "0 1px 0 rgba(0,255,255,0.3)",
          backdropFilter: "blur(8px)",
          zIndex: 50,
          borderBottom: "1px solid rgba(0,255,255,0.15)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              color: "#00ffff",
              textShadow: "0 0 10px #00ffff, 0 0 20px rgba(0,255,255,0.5)",
            }}
          >
            &gt;_
          </span>
          <span
            className="text-sm tracking-[0.25em] uppercase font-bold"
            style={{
              color: "#00ffff",
              textShadow: "0 0 8px rgba(0,255,255,0.6)",
            }}
          >
            StyleKit
          </span>
          <span
            className="text-xs"
            style={{ color: "#ff00ff", textShadow: "0 0 8px rgba(255,0,255,0.5)" }}
          >
            →
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {["FEATURES", "PRICING", "ABOUT", "DOCS"].map((item) => (
            <span
              key={item}
              className="text-xs tracking-[0.2em] uppercase cursor-pointer transition-all duration-100"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLSpanElement).style.color = "#00ffff";
                (e.currentTarget as HTMLSpanElement).style.textShadow =
                  "0 0 8px rgba(0,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.45)";
                (e.currentTarget as HTMLSpanElement).style.textShadow = "none";
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <span
            className="hidden md:inline text-xs tracking-[0.2em] uppercase cursor-pointer"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            LOG_IN
          </span>
          <button
            className="text-xs tracking-[0.18em] uppercase px-4 py-2 transition-all duration-100"
            style={{
              border: "1px solid #00ffff",
              color: "#00ffff",
              backgroundColor: "rgba(0,255,255,0.05)",
              boxShadow: "0 0 10px rgba(0,255,255,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,255,255,0.12)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 20px rgba(0,255,255,0.4), inset 0 0 10px rgba(0,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 10px rgba(0,255,255,0.2)";
            }}
          >
            INIT_SYS
          </button>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* SECTION 2 — HERO                                             */}
      {/* ============================================================ */}
      <section
        className="relative pt-32 pb-24 px-6 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Hero scan-line texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(transparent 50%,rgba(0,255,255,0.025) 50%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* City grid SVG decoration */}
        <svg
          className="pointer-events-none absolute right-0 top-0 opacity-[0.07]"
          width="520"
          height="520"
          viewBox="0 0 520 520"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 40}
              x2="520"
              y2={i * 40}
              stroke="#00ffff"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 40}
              y1="0"
              x2={i * 40}
              y2="520"
              stroke="#00ffff"
              strokeWidth="0.5"
            />
          ))}
          {/* Buildings */}
          {[
            { x: 60, y: 260, w: 40, h: 260 },
            { x: 120, y: 200, w: 50, h: 320 },
            { x: 190, y: 300, w: 35, h: 220 },
            { x: 245, y: 180, w: 60, h: 340 },
            { x: 325, y: 240, w: 45, h: 280 },
            { x: 390, y: 160, w: 55, h: 360 },
            { x: 460, y: 290, w: 40, h: 230 },
          ].map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill="none"
              stroke="#00ffff"
              strokeWidth="1"
            />
          ))}
        </svg>

        <div className="max-w-6xl mx-auto relative">
          {/* Status line */}
          <RevealBlock delay={0}>
            <div
              className="flex items-center gap-3 mb-8 text-xs tracking-[0.25em] uppercase"
              style={{ color: "rgba(0,255,255,0.6)" }}
            >
              <BlinkDot color="#00ffff" />
              <span>SYSTEM_STATUS: ONLINE</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>VER 3.1.4</span>
            </div>
          </RevealBlock>

          {/* Main headline with glitch */}
          <RevealBlock delay={0.1}>
            <div className="mb-6">
              <h1
                className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-[0.05em] uppercase select-none cursor-pointer"
                style={{
                  color: glitchActive ? "transparent" : "#e0e0e0",
                  textShadow: glitchActive
                    ? "2px 0 #ff00ff, -2px 0 #00ffff"
                    : "0 0 40px rgba(0,255,255,0.15)",
                  animation: glitchActive ? "glitch-skew 0.4s infinite" : "none",
                  letterSpacing: "0.08em",
                  transition: "color 0.1s",
                  position: "relative",
                }}
                onClick={handleGlitchToggle}
                title="Click to toggle glitch"
              >
                CYBERPUNK
                {glitchActive && (
                  <>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "#ff00ff",
                        animation: "glitch-slice-top 0.3s infinite",
                        userSelect: "none",
                      }}
                    >
                      CYBERPUNK
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "#00ffff",
                        animation: "glitch-slice-bot 0.3s infinite",
                        userSelect: "none",
                      }}
                    >
                      CYBERPUNK
                    </span>
                  </>
                )}
              </h1>

              <div
                className="text-[clamp(1.5rem,4vw,3.5rem)] font-black tracking-[0.18em] uppercase"
                style={{
                  color: "#00ffff",
                  textShadow: "0 0 20px rgba(0,255,255,0.7), 0 0 60px rgba(0,255,255,0.3)",
                }}
              >
                NEON
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <p
              className="text-sm tracking-[0.15em] uppercase max-w-xl mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              &gt; Futurism distilled into design — neon glow on pitch-dark
              substrates. High contrast, scan-line texture, chromatic
              aberration. The future looks like this.
              <BlinkCursor color="#ff00ff" />
            </p>
          </RevealBlock>

          <RevealBlock delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <button
                className="text-xs tracking-[0.2em] uppercase px-6 py-3 font-bold transition-all duration-100 active:translate-x-[2px] active:-translate-y-[1px]"
                style={{
                  backgroundColor: "#00ffff",
                  color: "#0a0a0f",
                  boxShadow: "0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(0,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)";
                }}
              >
                JACK_IN
              </button>
              <button
                className="text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-100"
                style={{
                  border: "1px solid rgba(255,0,255,0.5)",
                  color: "#ff00ff",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "rgba(255,0,255,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 20px rgba(255,0,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                VIEW_DEMO
              </button>
            </div>
          </RevealBlock>

          {/* Click hint */}
          <RevealBlock delay={0.45}>
            <p
              className="mt-6 text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(0,255,255,0.35)" }}
            >
              &gt; CLICK TITLE TO TOGGLE GLITCH EFFECT
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — GLITCH EFFECT DEMO                               */}
      {/* ============================================================ */}
      <section className="relative py-20 px-6" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div
              className="text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: "rgba(0,255,255,0.5)" }}
            >
              // SECTION_03
            </div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-[0.18em] uppercase mb-12"
              style={{
                color: "#e0e0e0",
                textShadow: "0 0 20px rgba(0,255,255,0.2)",
              }}
            >
              GLITCH EFFECT DEMO
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: glitch text panel */}
            <RevealBlock delay={0.1}>
              <div
                className="relative p-8"
                style={{
                  backgroundColor: "#0d0d18",
                  border: "1px solid rgba(0,255,255,0.2)",
                }}
              >
                <ScanLines />
                <div
                  className="relative text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "rgba(0,255,255,0.45)", zIndex: 2 }}
                >
                  CHROMATIC ABERRATION
                </div>
                <div
                  className="relative text-4xl md:text-5xl font-black uppercase tracking-[0.1em] mb-6 cursor-pointer select-none"
                  style={{
                    color: glitchActive ? "transparent" : "#e0e0e0",
                    textShadow: glitchActive
                      ? "3px 0 #ff00ff, -3px 0 #00ffff"
                      : "none",
                    animation: glitchActive ? "glitch-skew 0.5s infinite" : "none",
                    zIndex: 2,
                    position: "relative",
                  }}
                  onClick={handleGlitchToggle}
                >
                  NEURAL
                  {glitchActive && (
                    <>
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#ff00ff",
                          animation: "glitch-slice-top 0.28s infinite",
                        }}
                      >
                        NEURAL
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "#00ffff",
                          animation: "glitch-slice-bot 0.28s infinite",
                        }}
                      >
                        NEURAL
                      </span>
                    </>
                  )}
                </div>
                <button
                  className="relative text-xs tracking-[0.2em] uppercase px-5 py-2 transition-all duration-100"
                  style={{
                    border: `1px solid ${glitchActive ? "#ff00ff" : "#00ffff"}`,
                    color: glitchActive ? "#ff00ff" : "#00ffff",
                    backgroundColor: glitchActive
                      ? "rgba(255,0,255,0.08)"
                      : "rgba(0,255,255,0.08)",
                    zIndex: 2,
                  }}
                  onClick={handleGlitchToggle}
                >
                  {glitchActive ? "DISABLE GLITCH" : "ENABLE GLITCH"}
                </button>
              </div>
            </RevealBlock>

            {/* Right: neon border cards */}
            <RevealBlock delay={0.2}>
              <div className="grid gap-4">
                {[
                  { label: "CYAN_NODE", status: "ACTIVE", color: "#00ffff" },
                  { label: "MAGENTA_NODE", status: "SYNCING", color: "#ff00ff" },
                  { label: "YELLOW_NODE", status: "STANDBY", color: "#ffff00" },
                ].map((node, idx) => (
                  <div
                    key={idx}
                    className="relative px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-100"
                    style={{
                      backgroundColor: "#0d0d18",
                      border: `1px solid ${
                        hoveredCard === idx
                          ? (idx === 0 ? "#ff00ff" : idx === 1 ? "#00ffff" : "#ff00ff")
                          : node.color + "44"
                      }`,
                      boxShadow:
                        hoveredCard === idx
                          ? `0 0 20px ${
                              idx === 0 ? "rgba(255,0,255,0.4)" : "rgba(0,255,255,0.4)"
                            }`
                          : "none",
                    }}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <ScanLines />
                    <div className="relative flex items-center gap-3" style={{ zIndex: 2 }}>
                      <BlinkDot
                        color={
                          hoveredCard === idx
                            ? idx === 0
                              ? "#ff00ff"
                              : "#00ffff"
                            : node.color
                        }
                      />
                      <span
                        className="text-xs tracking-[0.2em] uppercase font-bold"
                        style={{
                          color:
                            hoveredCard === idx
                              ? idx === 0
                                ? "#ff00ff"
                                : "#00ffff"
                              : node.color,
                          textShadow: `0 0 8px currentColor`,
                        }}
                      >
                        {node.label}
                      </span>
                    </div>
                    <span
                      className="relative text-xs tracking-[0.15em] uppercase"
                      style={{ color: "rgba(255,255,255,0.35)", zIndex: 2 }}
                    >
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — COMPONENT SHOWCASE                               */}
      {/* ============================================================ */}
      <section className="relative py-20 px-6" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div
              className="text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: "rgba(255,0,255,0.5)" }}
            >
              // SECTION_04
            </div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-[0.18em] uppercase mb-4"
              style={{
                color: "#e0e0e0",
                textShadow: "0 0 20px rgba(255,0,255,0.2)",
              }}
            >
              COMPONENT SHOWCASE
            </h2>
          </RevealBlock>

          {/* Theme selector */}
          <RevealBlock delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-10">
              {neonThemes.map((t, i) => (
                <button
                  key={i}
                  className="text-xs tracking-[0.2em] uppercase px-4 py-2 transition-all duration-100"
                  style={{
                    border: `1px solid ${t.color}`,
                    color: activeNeon === i ? "#0a0a0f" : t.color,
                    backgroundColor: activeNeon === i ? t.color : "transparent",
                    boxShadow: activeNeon === i ? `0 0 16px ${t.color}88` : "none",
                  }}
                  onClick={() => setActiveNeon(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <RevealBlock delay={0.1}>
              <div
                className="relative p-6"
                style={{
                  backgroundColor: "#0d0d18",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <ScanLines />
                <div
                  className="relative text-xs tracking-[0.2em] uppercase mb-5"
                  style={{ color: "rgba(255,255,255,0.35)", zIndex: 2 }}
                >
                  BUTTONS
                </div>
                <div className="relative flex flex-wrap gap-3" style={{ zIndex: 2 }}>
                  {/* Cyan neon */}
                  <button
                    className="text-xs tracking-[0.2em] uppercase px-5 py-2.5 font-bold transition-all duration-100 active:translate-x-[2px] active:-translate-y-[1px]"
                    style={{
                      backgroundColor: "#00ffff",
                      color: "#0a0a0f",
                      boxShadow:
                        "0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)",
                    }}
                  >
                    CYAN_PRIMARY
                  </button>
                  {/* Magenta neon */}
                  <button
                    className="text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-100 active:translate-x-[2px] active:-translate-y-[1px] active:border-fuchsia-500"
                    style={{
                      border: "1px solid #ff00ff",
                      color: "#ff00ff",
                      backgroundColor: "rgba(255,0,255,0.08)",
                      boxShadow: "0 0 20px rgba(255,0,255,0.3)",
                    }}
                  >
                    MAGENTA_GHOST
                  </button>
                  {/* Yellow ghost */}
                  <button
                    className="text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-100"
                    style={{
                      border: "1px solid #ffff00",
                      color: "#ffff00",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 16px rgba(255,255,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                  >
                    YELLOW_GHOST
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Input */}
            <RevealBlock delay={0.15}>
              <div
                className="relative p-6"
                style={{
                  backgroundColor: "#0d0d18",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <ScanLines />
                <div
                  className="relative text-xs tracking-[0.2em] uppercase mb-5"
                  style={{ color: "rgba(255,255,255,0.35)", zIndex: 2 }}
                >
                  INPUT FIELDS
                </div>
                <div className="relative space-y-3" style={{ zIndex: 2 }}>
                  <div>
                    <label
                      className="block text-xs tracking-[0.18em] uppercase mb-2"
                      style={{ color: "rgba(0,255,255,0.6)" }}
                    >
                      ACCESS_CODE
                    </label>
                    <input
                      type="text"
                      placeholder="ENTER_CODE..."
                      className="w-full text-xs tracking-[0.15em] uppercase px-4 py-3 outline-none transition-all duration-100"
                      style={{
                        backgroundColor: "#0a0a0f",
                        border: inputFocused
                          ? "1px solid #00ffff"
                          : "1px solid rgba(0,255,255,0.25)",
                        color: "#00ffff",
                        boxShadow: inputFocused
                          ? "0 0 20px rgba(0,255,255,0.3), inset 0 0 10px rgba(0,255,255,0.05)"
                          : "none",
                      }}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.18em] uppercase mb-2"
                      style={{ color: "rgba(255,0,255,0.6)" }}
                    >
                      NEURAL_KEY
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••"
                      className="w-full text-xs tracking-[0.15em] px-4 py-3 outline-none"
                      style={{
                        backgroundColor: "#0a0a0f",
                        border: "1px solid rgba(255,0,255,0.25)",
                        color: "#ff00ff",
                      }}
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Card with scan line + corner blink dot */}
            <RevealBlock delay={0.2} className="md:col-span-2">
              <div className="relative p-6" style={{ backgroundColor: "#0d0d18" }}>
                <ScanLines />
                {/* Corner blink dots */}
                <div className="absolute top-3 left-3" style={{ zIndex: 2 }}>
                  <BlinkDot color={currentTheme.color} />
                </div>
                <div className="absolute top-3 right-3" style={{ zIndex: 2 }}>
                  <BlinkDot color="#ff00ff" />
                </div>
                <div className="absolute bottom-3 left-3" style={{ zIndex: 2 }}>
                  <BlinkDot color="#ffff00" />
                </div>
                <div className="absolute bottom-3 right-3" style={{ zIndex: 2 }}>
                  <BlinkDot color="#00ff00" />
                </div>

                <div className="relative px-6 py-4" style={{ zIndex: 2 }}>
                  <div
                    className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    DATA_CARD // ACTIVE THEME:{" "}
                    <span style={{ color: currentTheme.color }}>{currentTheme.label}</span>
                  </div>
                  <div
                    className="text-xl font-black tracking-[0.15em] uppercase"
                    style={{
                      color: currentTheme.color,
                      textShadow: `0 0 16px ${currentTheme.color}`,
                    }}
                  >
                    NEON_PROTOCOL_ACTIVE
                  </div>
                  <div
                    className="mt-2 text-xs tracking-[0.12em]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Cyclic neon theme system — click theme buttons above to shift
                    the active color channel
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — COLOR SYSTEM                                     */}
      {/* ============================================================ */}
      <section className="relative py-20 px-6" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div
              className="text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: "rgba(255,255,0,0.5)" }}
            >
              // SECTION_05
            </div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-[0.18em] uppercase mb-12"
              style={{ color: "#e0e0e0" }}
            >
              COLOR SYSTEM
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <div
                  className="relative p-5 flex flex-col items-center gap-4"
                  style={{
                    backgroundColor: "#0d0d18",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <ScanLines />
                  {/* Swatch */}
                  <div
                    className="relative w-14 h-14"
                    style={{
                      backgroundColor: swatch.hex,
                      boxShadow: swatch.glow,
                      border:
                        swatch.name === "VOID"
                          ? "1px solid rgba(255,255,255,0.15)"
                          : "none",
                      zIndex: 2,
                    }}
                  />
                  <div className="relative text-center" style={{ zIndex: 2 }}>
                    <div
                      className="text-xs font-bold tracking-[0.2em] uppercase mb-1"
                      style={{
                        color: swatch.name === "VOID" ? "rgba(255,255,255,0.5)" : swatch.hex,
                        textShadow:
                          swatch.name === "VOID" ? "none" : `0 0 8px ${swatch.hex}`,
                      }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className="text-xs tracking-[0.1em] uppercase"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {swatch.hex}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient bar */}
          <RevealBlock delay={0.4}>
            <div className="mt-8 h-2 w-full" style={{ position: "relative" }}>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, #0a0a0f 0%, #00ffff 25%, #ff00ff 50%, #ffff00 75%, #00ff00 100%)",
                  boxShadow:
                    "0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(255,0,255,0.3)",
                }}
              />
            </div>
            <div
              className="mt-3 text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              NEON SPECTRUM — CYBERPUNK COLOR RAMP
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — HUD-STYLE STATS PANEL                            */}
      {/* ============================================================ */}
      <section
        className="relative py-20 px-6"
        style={{
          zIndex: 10,
          borderTop: "1px solid rgba(0,255,255,0.1)",
          borderBottom: "1px solid rgba(0,255,255,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div
              className="text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: "rgba(0,255,0,0.5)" }}
            >
              // SECTION_06
            </div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-[0.18em] uppercase mb-12"
              style={{ color: "#e0e0e0" }}
            >
              HUD METRICS
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hudStats.map((stat, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <HudFrame color={stat.color}>
                  <ScanLines />
                  <div className="relative" style={{ zIndex: 2 }}>
                    {/* Status indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <BlinkDot color={stat.color} />
                      <span
                        className="text-xs tracking-[0.15em] uppercase"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        LIVE
                      </span>
                    </div>

                    {/* Value */}
                    <div
                      className="text-3xl md:text-4xl font-black tracking-tight mb-1"
                      style={{
                        color: stat.color,
                        textShadow: `0 0 20px ${stat.color}, 0 0 40px ${stat.color}44`,
                        animation: "neon-pulse 2s ease-in-out infinite",
                      }}
                    >
                      {stat.value}
                    </div>

                    {/* Unit */}
                    <div
                      className="text-xs tracking-[0.2em] uppercase mb-2"
                      style={{ color: `${stat.color}88` }}
                    >
                      {stat.unit}
                    </div>

                    {/* Label */}
                    <div
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </HudFrame>
              </RevealBlock>
            ))}
          </div>

          {/* Progress bars */}
          <RevealBlock delay={0.35}>
            <div
              className="mt-10 p-6 relative"
              style={{
                backgroundColor: "#0d0d18",
                border: "1px solid rgba(0,255,255,0.12)",
              }}
            >
              <ScanLines />
              <div className="relative" style={{ zIndex: 2 }}>
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-5"
                  style={{ color: "rgba(0,255,255,0.5)" }}
                >
                  SYSTEM LOAD
                </div>
                {[
                  { label: "CPU", val: 87, color: "#00ffff" },
                  { label: "RAM", val: 62, color: "#ff00ff" },
                  { label: "NET", val: 44, color: "#ffff00" },
                  { label: "DISK", val: 31, color: "#00ff00" },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-4 mb-3">
                    <span
                      className="text-xs tracking-[0.2em] uppercase w-10 flex-shrink-0"
                      style={{ color: bar.color }}
                    >
                      {bar.label}
                    </span>
                    <div
                      className="flex-1 h-1.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div
                        style={{
                          width: `${bar.val}%`,
                          height: "100%",
                          backgroundColor: bar.color,
                          boxShadow: `0 0 8px ${bar.color}`,
                        }}
                      />
                    </div>
                    <span
                      className="text-xs w-10 text-right flex-shrink-0"
                      style={{ color: bar.color }}
                    >
                      {bar.val}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — DO / DON'T RULES                                 */}
      {/* ============================================================ */}
      <section className="relative py-20 px-6" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div
              className="text-xs tracking-[0.35em] uppercase mb-2"
              style={{ color: "rgba(0,255,255,0.5)" }}
            >
              // SECTION_07
            </div>
            <h2
              className="text-2xl md:text-3xl font-black tracking-[0.18em] uppercase mb-12"
              style={{ color: "#e0e0e0" }}
            >
              DESIGN PROTOCOL
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div
                className="relative p-6 h-full"
                style={{
                  backgroundColor: "#0d0d18",
                  border: "1px solid rgba(0,255,255,0.25)",
                }}
              >
                <ScanLines />
                {/* Corner accents */}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 16,
                    height: 16,
                    borderTop: "2px solid #00ffff",
                    borderLeft: "2px solid #00ffff",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderTop: "2px solid #00ffff",
                    borderRight: "2px solid #00ffff",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 16,
                    height: 16,
                    borderBottom: "2px solid #00ffff",
                    borderLeft: "2px solid #00ffff",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderBottom: "2px solid #00ffff",
                    borderRight: "2px solid #00ffff",
                  }}
                />

                <div className="relative" style={{ zIndex: 2 }}>
                  <div
                    className="flex items-center gap-3 mb-6"
                    style={{ borderBottom: "1px solid rgba(0,255,255,0.15)", paddingBottom: "1rem" }}
                  >
                    <span
                      className="text-lg font-black tracking-[0.2em] uppercase"
                      style={{
                        color: "#00ffff",
                        textShadow: "0 0 12px rgba(0,255,255,0.7)",
                      }}
                    >
                      DO
                    </span>
                    <span
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "rgba(0,255,255,0.4)" }}
                    >
                      APPROVED PROTOCOLS
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {doRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="text-xs flex-shrink-0 mt-0.5"
                          style={{ color: "#00ffff" }}
                        >
                          &gt;
                        </span>
                        <span
                          className="text-xs tracking-[0.08em] leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.2}>
              <div
                className="relative p-6 h-full"
                style={{
                  backgroundColor: "#0d0d18",
                  border: "1px solid rgba(255,0,255,0.25)",
                }}
              >
                <ScanLines />
                {/* Corner accents */}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 16,
                    height: 16,
                    borderTop: "2px solid #ff00ff",
                    borderLeft: "2px solid #ff00ff",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderTop: "2px solid #ff00ff",
                    borderRight: "2px solid #ff00ff",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 16,
                    height: 16,
                    borderBottom: "2px solid #ff00ff",
                    borderLeft: "2px solid #ff00ff",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderBottom: "2px solid #ff00ff",
                    borderRight: "2px solid #ff00ff",
                  }}
                />

                <div className="relative" style={{ zIndex: 2 }}>
                  <div
                    className="flex items-center gap-3 mb-6"
                    style={{
                      borderBottom: "1px solid rgba(255,0,255,0.15)",
                      paddingBottom: "1rem",
                    }}
                  >
                    <span
                      className="text-lg font-black tracking-[0.2em] uppercase"
                      style={{
                        color: "#ff00ff",
                        textShadow: "0 0 12px rgba(255,0,255,0.7)",
                      }}
                    >
                      DON'T
                    </span>
                    <span
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "rgba(255,0,255,0.4)" }}
                    >
                      FORBIDDEN PATTERNS
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="text-xs flex-shrink-0 mt-0.5"
                          style={{ color: "#ff00ff" }}
                        >
                          X
                        </span>
                        <span
                          className="text-xs tracking-[0.08em] leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — TERMINAL FOOTER                                  */}
      {/* ============================================================ */}
      <footer
        className="relative py-16 px-6"
        style={{
          zIndex: 10,
          borderTop: "1px solid rgba(0,255,255,0.2)",
          backgroundColor: "#080810",
        }}
      >
        {/* Neon divider glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            boxShadow: "0 0 20px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.2)",
          }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Terminal output window */}
          <RevealBlock>
            <div
              className="relative p-6 mb-10"
              style={{
                backgroundColor: "#060609",
                border: "1px solid rgba(0,255,0,0.2)",
              }}
            >
              <ScanLines />
              <div className="relative" style={{ zIndex: 2 }}>
                {/* Terminal header */}
                <div
                  className="flex items-center justify-between mb-4 pb-3"
                  style={{ borderBottom: "1px solid rgba(0,255,0,0.12)" }}
                >
                  <div className="flex items-center gap-2">
                    <BlinkDot color="#00ff00" />
                    <span
                      className="text-xs tracking-[0.2em] uppercase"
                      style={{ color: "rgba(0,255,0,0.6)" }}
                    >
                      TERMINAL v2.4.1
                    </span>
                  </div>
                  <span
                    className="text-xs tracking-[0.15em]"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    SYS/STYLEKIT/RUNNER
                  </span>
                </div>

                {/* Terminal lines */}
                <div className="space-y-1.5 mb-4 min-h-[100px]">
                  {terminalLines.map((line, i) => (
                    <div
                      key={i}
                      className="text-xs tracking-[0.12em]"
                      style={{
                        color:
                          i === terminalLines.length - 1
                            ? "#00ff00"
                            : "rgba(0,255,0,0.45)",
                        fontFamily: "monospace",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                  <div
                    className="text-xs tracking-[0.12em]"
                    style={{ color: "#00ff00", fontFamily: "monospace" }}
                  >
                    &gt; <BlinkCursor color="#00ff00" />
                  </div>
                </div>

                {/* Run button */}
                <button
                  className="text-xs tracking-[0.2em] uppercase px-5 py-2 transition-all duration-100"
                  style={{
                    border: "1px solid rgba(0,255,0,0.4)",
                    color: "#00ff00",
                    backgroundColor: "rgba(0,255,0,0.06)",
                  }}
                  onClick={handleTerminalRun}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(0,255,0,0.12)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 16px rgba(0,255,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(0,255,0,0.06)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  RUN_COMMAND
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Footer meta row */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div
                  className="text-sm font-black tracking-[0.25em] uppercase mb-1"
                  style={{
                    color: "#00ffff",
                    textShadow: "0 0 8px rgba(0,255,255,0.5)",
                  }}
                >
                  &gt; SYSTEM ONLINE
                  <BlinkCursor color="#00ffff" />
                </div>
                <div
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  &copy; 2025 STYLEKIT CORP — ALL RIGHTS RESERVED
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <BlinkDot color="#00ff00" />
                  <span
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: "rgba(0,255,0,0.6)" }}
                  >
                    ALL_SYSTEMS_GO
                  </span>
                </div>
                <Link
                  href="/styles/cyberpunk-neon"
                  className="text-xs tracking-[0.2em] uppercase transition-all duration-100"
                  style={{ color: "rgba(0,255,255,0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#00ffff";
                    (e.currentTarget as HTMLAnchorElement).style.textShadow =
                      "0 0 8px rgba(0,255,255,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(0,255,255,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                  }}
                >
                  BACK_TO_DOCS →
                </Link>
                <Link
                  href="/styles"
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  ALL_STYLES
                </Link>
              </div>
            </div>
          </RevealBlock>

          {/* Bottom neon stripe */}
          <RevealBlock delay={0.2}>
            <div
              className="mt-10 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg,transparent,#00ffff 20%,#ff00ff 50%,#ffff00 80%,transparent)",
                boxShadow:
                  "0 0 10px rgba(0,255,255,0.4), 0 0 20px rgba(255,0,255,0.3)",
              }}
            />
            <div
              className="mt-3 text-center text-xs tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.1)" }}
            >
              CYBERPUNK NEON — STYLEKIT DESIGN SYSTEM
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
