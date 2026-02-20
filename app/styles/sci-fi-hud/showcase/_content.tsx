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
/*  Global keyframes injected once                                      */
/* ------------------------------------------------------------------ */

function GlobalStyles() {
  return (
    <style>{`
      @keyframes hud-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes hud-ping {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.95); }
      }
      @keyframes hud-scan {
        0% { top: 0%; }
        100% { top: 100%; }
      }
      @keyframes hud-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
      }
      @keyframes hud-glow-pulse {
        0%, 100% { box-shadow: 0 0 8px rgba(6,182,212,0.3); }
        50% { box-shadow: 0 0 24px rgba(6,182,212,0.7); }
      }
      @keyframes hud-sweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .hud-spin { animation: hud-spin 3s linear infinite; }
      .hud-spin-slow { animation: hud-spin 8s linear infinite; }
      .hud-spin-paused { animation-play-state: paused; }
      .hud-blink { animation: hud-blink 1.2s ease-in-out infinite; }
      .hud-glow { animation: hud-glow-pulse 2s ease-in-out infinite; }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const BLIPS = [
  { cx: 130, cy: 72, r: 3, id: 0, label: "ALPHA-7", dist: "142 km", bearing: "047°", threat: "LOW" },
  { cx: 62, cy: 118, r: 2.5, id: 1, label: "BRAVO-2", dist: "089 km", bearing: "213°", threat: "NEUTRAL" },
  { cx: 152, cy: 138, r: 2, id: 2, label: "CHARLIE-9", dist: "178 km", bearing: "305°", threat: "HIGH" },
  { cx: 88, cy: 58, r: 2, id: 3, label: "DELTA-1", dist: "061 km", bearing: "128°", threat: "LOW" },
  { cx: 158, cy: 90, r: 2.5, id: 4, label: "ECHO-5", dist: "193 km", bearing: "018°", threat: "NEUTRAL" },
];

const SYSTEMS = [
  { id: 0, label: "SHIELD INTEGRITY", value: 87, color: "#22C55E", unit: "%", detail: ["FORE: 91%", "AFT: 84%", "PORT: 88%", "STARBOARD: 85%"] },
  { id: 1, label: "POWER OUTPUT", value: 74, color: "#06B6D4", unit: "%", detail: ["MAIN REACTOR: 94%", "AUX POWER: 62%", "WEAPONS: 78%", "SHIELDS: 66%"] },
  { id: 2, label: "THREAT LEVEL", value: 42, color: "#F59E0B", unit: "%", detail: ["PROXIMITY: HIGH", "INTERCEPT ETA: 8MIN", "TARGETS: 3", "MISSILES LOCKED: 1"] },
  { id: 3, label: "COMM SIGNAL", value: 96, color: "#0EA5E9", unit: "%", detail: ["UPLINK: NOMINAL", "ENCRYPTION: AES-512", "LATENCY: 12ms", "CHANNELS: 4 ACTIVE"] },
];

const COLORS = [
  { name: "DEEP SPACE", hex: "#020617", label: "PRIMARY BG", glow: false },
  { name: "PRIMARY CYAN", hex: "#06B6D4", label: "BORDER / ACCENT", glow: true },
  { name: "SKY BLUE", hex: "#0EA5E9", label: "SECONDARY ACCENT", glow: true },
  { name: "LIGHT CYAN", hex: "#22D3EE", label: "TEXT / HIGHLIGHT", glow: true },
  { name: "STATUS GREEN", hex: "#22C55E", label: "NOMINAL / OK", glow: true },
];

const DO_RULES = [
  "Use bg-[#020617] as the base — pure deep space darkness",
  "Glass panels: bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20",
  "L-corner locks on every panel — they animate outward on hover",
  "Monospace font everywhere — font-mono uppercase tracking-widest",
  "Radar sweep animation for the command center feel",
  "Pulsing status dots — animate-pulse on green/cyan indicators",
  "Cyan glow shadows — shadow-[0_0_20px_rgba(6,182,212,0.5)]",
  "Semi-transparent panels stacked on the dark background",
  "Scan line texture overlay on panels for CRT authenticity",
];

const DONT_RULES = [
  "No white backgrounds — ever. This is deep space, not a day spa",
  "No rounded corners larger than rounded-sm — HUDs are angular",
  "No decorative gradients unrelated to glow effects",
  "No serif fonts — monospace is the only acceptable typeface here",
  "No bright warm colors as primary — cyan/green/blue only",
  "No solid opaque panels — always use backdrop-blur + opacity",
  "No slow transitions over 300ms — tactical UIs must be instant",
  "No drop shadows without cyan color — no gray shadows allowed",
];

/* ------------------------------------------------------------------ */
/*  L-corner decoration component                                       */
/* ------------------------------------------------------------------ */

function LCorners({ active = false }: { active?: boolean }) {
  const base = "absolute w-4 h-4 transition-all duration-150";
  const color = active ? "border-cyan-300" : "border-cyan-500";
  return (
    <>
      <div
        className={`${base} top-0 left-0 border-t-2 border-l-2 ${color} ${active ? "-translate-x-1 -translate-y-1" : ""}`}
      />
      <div
        className={`${base} top-0 right-0 border-t-2 border-r-2 ${color} ${active ? "translate-x-1 -translate-y-1" : ""}`}
      />
      <div
        className={`${base} bottom-0 left-0 border-b-2 border-l-2 ${color} ${active ? "-translate-x-1 translate-y-1" : ""}`}
      />
      <div
        className={`${base} bottom-0 right-0 border-b-2 border-r-2 ${color} ${active ? "translate-x-1 translate-y-1" : ""}`}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HUD Panel wrapper                                                   */
/* ------------------------------------------------------------------ */

function HudPanel({
  children,
  className = "",
  label,
  hoverable = false,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  hoverable?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-sm overflow-visible
        ${hoverable ? "cursor-pointer hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-200" : ""}
        ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scan line texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(6,182,212,0.03)_1px,rgba(6,182,212,0.03)_2px)] pointer-events-none rounded-sm" />
      {/* L-corners */}
      <LCorners active={hoverable && hovered} />
      {/* Label tab */}
      {label && (
        <div className="absolute -top-3 left-6 bg-[#020617] px-3 py-0.5 border border-cyan-500/30 rounded-sm">
          <span className="text-[#22D3EE] font-mono text-[9px] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <div className="relative p-6">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Radar SVG component                                                 */
/* ------------------------------------------------------------------ */

function RadarDisplay({
  active,
  lockedTarget,
  onLock,
}: {
  active: boolean;
  lockedTarget: number | null;
  onLock: (id: number | null) => void;
}) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className="absolute w-72 h-72 rounded-full border border-cyan-500/10"
        style={{ boxShadow: "0 0 40px rgba(6,182,212,0.1) inset" }}
      />
      <svg viewBox="0 0 200 200" className="w-64 h-64">
        {/* Concentric rings */}
        {[20, 40, 60, 80].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth="0.5"
          />
        ))}

        {/* Cross range markers */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="1" />

        {/* Crosshair */}
        <line x1="100" y1="12" x2="100" y2="188" stroke="rgba(6,182,212,0.12)" strokeWidth="0.5" />
        <line x1="12" y1="100" x2="188" y2="100" stroke="rgba(6,182,212,0.12)" strokeWidth="0.5" />

        {/* Diagonal guides */}
        <line x1="43" y1="43" x2="157" y2="157" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5" />
        <line x1="157" y1="43" x2="43" y2="157" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5" />

        {/* Sweep conic gradient fill — fading pie behind sweep arm */}
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#radarGlow)" />

        {/* Sweep arm — rotates around center */}
        <g
          style={{
            transformOrigin: "100px 100px",
            animation: active ? "hud-sweep 3s linear infinite" : "none",
          }}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="20"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Sweep fade wedge effect via thin lines */}
          <line x1="100" y1="100" x2="108" y2="21" stroke="#06B6D4" strokeWidth="0.5" opacity="0.5" />
          <line x1="100" y1="100" x2="115" y2="25" stroke="#06B6D4" strokeWidth="0.5" opacity="0.25" />
          <line x1="100" y1="100" x2="120" y2="32" stroke="#06B6D4" strokeWidth="0.5" opacity="0.1" />
        </g>

        {/* Range tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 100 + 78 * Math.sin(rad);
          const y1 = 100 - 78 * Math.cos(rad);
          const x2 = 100 + 82 * Math.sin(rad);
          const y2 = 100 - 82 * Math.cos(rad);
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(6,182,212,0.4)"
              strokeWidth="1"
            />
          );
        })}

        {/* Blips */}
        {BLIPS.map((blip) => (
          <g key={blip.id} onClick={() => onLock(lockedTarget === blip.id ? null : blip.id)} style={{ cursor: "pointer" }}>
            {/* Lock ring when targeted */}
            {lockedTarget === blip.id && (
              <>
                <circle
                  cx={blip.cx}
                  cy={blip.cy}
                  r={blip.r + 6}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="0.75"
                  strokeDasharray="3 2"
                />
                <circle
                  cx={blip.cx}
                  cy={blip.cy}
                  r={blip.r + 10}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
              </>
            )}
            {/* Blip core */}
            <circle
              cx={blip.cx}
              cy={blip.cy}
              r={blip.r}
              fill={lockedTarget === blip.id ? "#22D3EE" : "#22C55E"}
            />
            {/* Blip glow */}
            <circle
              cx={blip.cx}
              cy={blip.cy}
              r={blip.r + 2}
              fill="none"
              stroke={lockedTarget === blip.id ? "#22D3EE" : "#22C55E"}
              strokeWidth="0.5"
              opacity="0.4"
            />
          </g>
        ))}

        {/* Center dot */}
        <circle cx="100" cy="100" r="2" fill="#06B6D4" />
        <circle cx="100" cy="100" r="4" fill="none" stroke="#06B6D4" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar component                                              */
/* ------------------------------------------------------------------ */

function HudBar({
  value,
  color,
  label,
  unit = "%",
  active = false,
}: {
  value: number;
  color: string;
  label: string;
  unit?: string;
  active?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${active ? "opacity-100" : "opacity-70"} transition-opacity duration-200`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#22D3EE]/70">{label}</span>
        <span className="font-mono text-sm tracking-wider" style={{ color }}>
          {value}
          {unit}
        </span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-sm overflow-hidden border border-cyan-900/30">
        <div
          className="h-full rounded-sm transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  /* Hero mount animation */
  const [heroRevealed, setHeroRevealed] = useState(false);
  /* Radar active / paused */
  const [radarActive, setRadarActive] = useState(true);
  /* Locked radar blip */
  const [lockTarget, setLockTarget] = useState<number | null>(null);
  /* Active system status panel */
  const [activeSystem, setActiveSystem] = useState<number>(0);
  /* HUD input focus state */
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const lockedBlip = lockTarget !== null ? BLIPS.find((b) => b.id === lockTarget) : null;

  return (
    <div className="min-h-screen bg-[#020617] text-[#22D3EE]">
      <GlobalStyles />

      {/* ============================================================ */}
      {/* SECTION 1 — Fixed Navigation                                  */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/95 backdrop-blur-xl border-b border-cyan-500/20">
        {/* Top scan line bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            {/* System label */}
            <div className="flex items-center gap-3">
              {/* Status indicator */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE]">
                STYLEKIT HUD <span className="text-cyan-500/50">v2.1</span>
              </span>
              <span className="hidden md:inline font-mono text-[10px] text-cyan-500/30 tracking-widest">
                // TACTICAL COMMAND INTERFACE
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-1">
              <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-cyan-500/40 uppercase tracking-widest mr-3">
                <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
                SYS:NOMINAL
                <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
              </span>
              <Link
                href="/styles"
                className="flex items-center gap-1.5 px-4 py-1.5 border border-cyan-500/30 rounded-sm font-mono text-[11px] uppercase tracking-widest text-[#22D3EE]/70 hover:text-[#22D3EE] hover:border-cyan-400/60 hover:bg-cyan-500/5 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-150"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                StyleKit
              </Link>
            </nav>
          </div>
        </div>
        {/* Bottom scan line bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </header>

      {/* ============================================================ */}
      {/* SECTION 2 — Hero Command Bridge                               */}
      {/* ============================================================ */}
      <section className="relative pt-14 min-h-screen flex flex-col overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Full-width hero content */}
        <div className="relative flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 pb-12">
          {/* Coordinate readout top */}
          <div
            className="flex items-center gap-6 mb-8 font-mono text-[10px] uppercase tracking-widest text-cyan-500/40"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.6s ease 0.1s",
            }}
          >
            <span>LAT: 48.8566N</span>
            <span className="text-cyan-500/20">|</span>
            <span>LON: 002.3522E</span>
            <span className="text-cyan-500/20">|</span>
            <span>ALT: 412 KM</span>
            <span className="text-cyan-500/20 hidden md:inline">|</span>
            <span className="hidden md:inline">
              CYCLE:{" "}
              <span className="text-cyan-400/60 hud-blink">
                {new Date().toISOString().slice(0, 19).replace("T", " ")}Z
              </span>
            </span>
          </div>

          {/* Main title block */}
          <div className="relative mb-12">
            {/* L-frame decoration around title */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />

            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-500/50 mb-3">
                // TACTICAL INTERFACE — COMMAND BRIDGE
              </div>
              <h1
                className="font-mono font-black uppercase leading-none tracking-tight"
                style={{
                  fontSize: "clamp(48px, 10vw, 120px)",
                  color: "#22D3EE",
                  textShadow: "0 0 40px rgba(34,211,238,0.4), 0 0 80px rgba(6,182,212,0.2)",
                }}
              >
                SCI-FI
              </h1>
              <h1
                className="font-mono font-black uppercase leading-none tracking-tight"
                style={{
                  fontSize: "clamp(48px, 10vw, 120px)",
                  color: "#06B6D4",
                  textShadow: "0 0 40px rgba(6,182,212,0.5), 0 0 80px rgba(6,182,212,0.2)",
                  marginTop: "-0.1em",
                }}
              >
                HUD.
              </h1>
            </div>

            <div
              className="mt-6 max-w-lg"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              <p className="font-mono text-sm text-cyan-500/60 leading-relaxed uppercase tracking-wider">
                STARSHIP COCKPIT / TACTICAL COMMAND CENTER INTERFACE. DEEP SPACE BACKDROP.
                HOLOGRAPHIC GLASS PANELS. RADAR SCANNING. CYAN GLOW BORDERS.
              </p>
            </div>
          </div>

          {/* Hero status row */}
          <div
            className="flex flex-wrap items-center gap-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            {[
              { label: "SHIELDS", value: "87%", color: "#22C55E" },
              { label: "POWER", value: "74%", color: "#06B6D4" },
              { label: "COMM", value: "96%", color: "#0EA5E9" },
              { label: "THREAT", value: "MED", color: "#F59E0B" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: stat.color }} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/40">
                  {stat.label}:
                </span>
                <span className="font-mono text-xs font-bold tracking-wider" style={{ color: stat.color }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative bottom divider */}
          <div className="mt-12 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30">
              SCROLL TO EXPLORE
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-cyan-500/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Radar / HUD Panel                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-px bg-cyan-500/50" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                SECTION 03
              </span>
            </div>
            <h2
              className="font-mono text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.3)" }}
            >
              TACTICAL RADAR
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-500/50 mt-2">
              // PROXIMITY SCAN — ACTIVE SWEEP — CLICK BLIP TO ACQUIRE TARGET LOCK
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Radar display */}
            <RevealBlock className="lg:col-span-1">
              <HudPanel label="RADAR SYS">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/60">
                      SWEEP STATUS
                    </span>
                    <button
                      type="button"
                      onClick={() => setRadarActive((v) => !v)}
                      className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest border rounded-sm transition-all duration-150 ${
                        radarActive
                          ? "border-green-500/50 text-green-400 hover:bg-green-500/10"
                          : "border-red-500/50 text-red-400 hover:bg-red-500/10"
                      }`}
                    >
                      {radarActive ? "ACTIVE" : "PAUSED"}
                    </button>
                  </div>

                  <RadarDisplay
                    active={radarActive}
                    lockedTarget={lockTarget}
                    onLock={setLockTarget}
                  />

                  {/* Range readout */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-500/10">
                    {[
                      { label: "RANGE", value: "250 KM" },
                      { label: "BEARING", value: "047°" },
                      { label: "CONTACTS", value: `${BLIPS.length}` },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/40">
                          {item.label}
                        </div>
                        <div className="font-mono text-sm text-[#22D3EE] mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </HudPanel>
            </RevealBlock>

            {/* Blip list + target data */}
            <RevealBlock className="lg:col-span-2" delay={0.1}>
              <div className="space-y-4 h-full">
                {/* Contact list */}
                <HudPanel label="CONTACTS">
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 pb-2 border-b border-cyan-500/10">
                      {["CALLSIGN", "DIST", "BEARING", "THREAT"].map((h) => (
                        <span key={h} className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/30">
                          {h}
                        </span>
                      ))}
                    </div>
                    {BLIPS.map((blip) => {
                      const isLocked = lockTarget === blip.id;
                      const threatColor =
                        blip.threat === "HIGH"
                          ? "#EF4444"
                          : blip.threat === "LOW"
                          ? "#22C55E"
                          : "#F59E0B";
                      return (
                        <button
                          key={blip.id}
                          type="button"
                          onClick={() => setLockTarget(isLocked ? null : blip.id)}
                          className={`w-full grid grid-cols-4 gap-2 py-2 px-1 rounded-sm transition-all duration-150 text-left ${
                            isLocked
                              ? "bg-cyan-500/10 border border-cyan-500/30"
                              : "hover:bg-cyan-500/5 border border-transparent"
                          }`}
                        >
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#22D3EE]">
                            {blip.label}
                          </span>
                          <span className="font-mono text-[10px] text-cyan-500/70">{blip.dist}</span>
                          <span className="font-mono text-[10px] text-cyan-500/70">{blip.bearing}</span>
                          <span className="font-mono text-[10px] font-bold" style={{ color: threatColor }}>
                            {blip.threat}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </HudPanel>

                {/* Target lock readout */}
                <HudPanel label="TARGET DATA">
                  {lockedBlip ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE]">
                          TARGET ACQUIRED: {lockedBlip.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-cyan-500/10">
                        {[
                          { label: "DISTANCE", value: lockedBlip.dist },
                          { label: "BEARING", value: lockedBlip.bearing },
                          { label: "THREAT LVL", value: lockedBlip.threat },
                          { label: "LOCK STATUS", value: "CONFIRMED" },
                        ].map((item) => (
                          <div key={item.label} className="space-y-0.5">
                            <div className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/30">
                              {item.label}
                            </div>
                            <div className="font-mono text-sm text-[#22D3EE]">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-2 h-2 rounded-full border border-cyan-500/30 hud-blink" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/30">
                        NO TARGET LOCKED — CLICK A CONTACT TO ACQUIRE
                      </span>
                    </div>
                  )}
                </HudPanel>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Component Showcase                               */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-px bg-cyan-500/50" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                SECTION 04
              </span>
            </div>
            <h2
              className="font-mono text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.3)" }}
            >
              HUD COMPONENTS
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-500/50 mt-2">
              // BUTTONS / INPUTS / PANELS — TACTICAL ELEMENT LIBRARY
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Button variants */}
            <RevealBlock delay={0}>
              <HudPanel label="BTN VARIANTS">
                <div className="space-y-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30 mb-4">
                    INTERACTION STATES
                  </p>

                  {/* Initialize — primary */}
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 font-mono text-xs uppercase tracking-widest text-[#020617] bg-[#06B6D4] border border-cyan-400 rounded-sm hover:bg-[#22D3EE] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] active:scale-[0.97] transition-all duration-150"
                    style={{ boxShadow: "0 0 10px rgba(6,182,212,0.3)" }}
                  >
                    INITIALIZE SEQUENCE
                  </button>

                  {/* Active — ghost */}
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 font-mono text-xs uppercase tracking-widest text-[#22D3EE] bg-cyan-500/10 border border-cyan-500/40 rounded-sm hover:bg-cyan-500/20 hover:border-cyan-400/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-[0.97] transition-all duration-150"
                  >
                    ACTIVE SYSTEM
                  </button>

                  {/* Override — danger */}
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 font-mono text-xs uppercase tracking-widest text-red-400 bg-red-500/5 border border-red-500/40 rounded-sm hover:bg-red-500/15 hover:border-red-400/70 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-[0.97] transition-all duration-150"
                  >
                    OVERRIDE PROTOCOL
                  </button>

                  {/* Disabled */}
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 px-4 font-mono text-xs uppercase tracking-widest text-cyan-500/20 bg-transparent border border-cyan-500/10 rounded-sm cursor-not-allowed"
                  >
                    SYSTEM OFFLINE
                  </button>
                </div>
              </HudPanel>
            </RevealBlock>

            {/* Input field */}
            <RevealBlock delay={0.05}>
              <HudPanel label="INPUT FIELD">
                <div className="space-y-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30 mb-4">
                    DATA ENTRY TERMINAL
                  </p>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/40">
                      DESTINATION COORDINATES
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="48.8566N 002.3522E"
                        className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-sm px-3 py-2.5 font-mono text-sm text-[#22D3EE] placeholder-cyan-500/20 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-150"
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                      />
                      {/* Scan line on focus */}
                      {inputFocused && (
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/40">
                      AUTHORIZATION CODE
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-sm px-3 py-2.5 font-mono text-sm text-[#22D3EE] placeholder-cyan-500/20 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-150"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/40">
                      MISSION OBJECTIVE
                    </label>
                    <textarea
                      rows={2}
                      placeholder="ENTER TACTICAL OBJECTIVE..."
                      className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-sm px-3 py-2.5 font-mono text-xs text-[#22D3EE] placeholder-cyan-500/20 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-150 resize-none"
                    />
                  </div>
                </div>
              </HudPanel>
            </RevealBlock>

            {/* Interactive HUD card */}
            <RevealBlock delay={0.1}>
              <div
                className="group relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-sm h-full hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-200 cursor-pointer"
              >
                {/* Scan line */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(6,182,212,0.03)_1px,rgba(6,182,212,0.03)_2px)] pointer-events-none rounded-sm" />
                {/* Animated L-corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
                {/* Label */}
                <div className="absolute -top-3 left-6 bg-[#020617] px-3 py-0.5 border border-cyan-500/30 rounded-sm">
                  <span className="text-[#22D3EE] font-mono text-[9px] uppercase tracking-widest">PANEL CARD</span>
                </div>

                <div className="relative p-6 space-y-4">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30">
                    HOVER TO ANIMATE CORNERS
                  </p>

                  {/* Mini metric cards */}
                  {[
                    { label: "REACTOR CORE", value: "NOMINAL", color: "#22C55E" },
                    { label: "NAVIGATION", value: "ACTIVE", color: "#06B6D4" },
                    { label: "WEAPONS", value: "STANDBY", color: "#F59E0B" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2 border-b border-cyan-500/10 last:border-0"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/50">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                        <span className="font-mono text-[10px] font-bold" style={{ color: item.color }}>
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <div className="h-px bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent" />
                    <p className="font-mono text-[9px] text-cyan-500/20 uppercase tracking-widest mt-2">
                      ALL SYSTEMS OPERATIONAL
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Color System                                     */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-px bg-cyan-500/50" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                SECTION 05
              </span>
            </div>
            <h2
              className="font-mono text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.3)" }}
            >
              COLOR SYSTEM
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-500/50 mt-2">
              // HUD PALETTE — 5 TACTICAL COLOR TOKENS
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COLORS.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.05}>
                <div className="group relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-sm overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-200 cursor-pointer">
                  {/* L-corners */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-150" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-150" />

                  {/* Color swatch */}
                  <div
                    className="h-24 flex items-end p-3"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: color.glow ? `inset 0 -4px 20px ${color.hex}40` : undefined,
                    }}
                  >
                    {color.glow && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 30px ${color.hex}30` }}
                      />
                    )}
                    <span className="font-mono text-[9px] tracking-widest" style={{ color: color.hex === "#020617" ? "#22D3EE" : "#020617" }}>
                      {color.hex}
                    </span>
                  </div>

                  {/* Color info */}
                  <div className="p-3 border-t border-cyan-500/10">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#22D3EE]">
                      {color.name}
                    </div>
                    <div className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/40 mt-0.5">
                      {color.label}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — System Status Dashboard                          */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-px bg-cyan-500/50" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                SECTION 06
              </span>
            </div>
            <h2
              className="font-mono text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.3)" }}
            >
              SYSTEM STATUS
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-500/50 mt-2">
              // REAL-TIME DIAGNOSTIC DASHBOARD — CLICK PANEL TO EXPAND
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYSTEMS.map((sys, i) => {
              const isActive = activeSystem === sys.id;
              return (
                <RevealBlock key={sys.id} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => setActiveSystem(sys.id)}
                    className={`w-full text-left relative bg-slate-900/80 backdrop-blur-xl border rounded-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                        : "border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    }`}
                  >
                    {/* Scan line */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(6,182,212,0.03)_1px,rgba(6,182,212,0.03)_2px)] pointer-events-none rounded-sm" />
                    {/* L-corners */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-150 ${isActive ? "border-cyan-300 -translate-x-0.5 -translate-y-0.5" : "border-cyan-500"}`} />
                    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-all duration-150 ${isActive ? "border-cyan-300 translate-x-0.5 -translate-y-0.5" : "border-cyan-500"}`} />
                    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-all duration-150 ${isActive ? "border-cyan-300 -translate-x-0.5 translate-y-0.5" : "border-cyan-500"}`} />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-150 ${isActive ? "border-cyan-300 translate-x-0.5 translate-y-0.5" : "border-cyan-500"}`} />

                    <div className="relative p-6 space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="relative flex h-2.5 w-2.5"
                          >
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ backgroundColor: sys.color }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2.5 w-2.5"
                              style={{ backgroundColor: sys.color }}
                            />
                          </span>
                          <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE]">
                            {sys.label}
                          </span>
                        </div>
                        <span className="font-mono text-xl font-bold" style={{ color: sys.color }}>
                          {sys.value}
                          {sys.unit}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-2 bg-slate-800 rounded-sm overflow-hidden border border-cyan-900/30">
                        <div
                          className="h-full rounded-sm transition-all duration-500"
                          style={{
                            width: `${sys.value}%`,
                            backgroundColor: sys.color,
                            boxShadow: `0 0 10px ${sys.color}80`,
                          }}
                        />
                      </div>

                      {/* Detail breakdown — expanded when active */}
                      {isActive && (
                        <div className="pt-2 border-t border-cyan-500/10 grid grid-cols-2 gap-2">
                          {sys.detail.map((d) => (
                            <div key={d} className="flex items-center gap-2">
                              <div
                                className="w-1 h-1 rounded-full shrink-0"
                                style={{ backgroundColor: sys.color }}
                              />
                              <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-500/60">
                                {d}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${sys.color}40)` }} />
                        <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: `${sys.color}60` }}>
                          {isActive ? "EXPANDED VIEW" : "CLICK TO EXPAND"}
                        </span>
                      </div>
                    </div>
                  </button>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — Tactical Rules (Do / Don't)                      */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-6 h-px bg-cyan-500/50" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/50">
                SECTION 07
              </span>
            </div>
            <h2
              className="font-mono text-3xl md:text-5xl font-black uppercase tracking-tight"
              style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.3)" }}
            >
              TACTICAL RULES
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-500/50 mt-2">
              // DESIGN DIRECTIVES — ENGAGEMENT PROTOCOL
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO panel */}
            <RevealBlock delay={0}>
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-sm h-full">
                {/* Scan line */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(6,182,212,0.03)_1px,rgba(6,182,212,0.03)_2px)] pointer-events-none rounded-sm" />
                {/* L-corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/60" />
                {/* Label */}
                <div className="absolute -top-3 left-6 bg-[#020617] px-3 py-0.5 border border-green-500/30 rounded-sm">
                  <span className="text-green-400 font-mono text-[9px] uppercase tracking-widest">DIRECTIVE: DO</span>
                </div>

                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <h3 className="font-mono text-sm uppercase tracking-widest text-green-400">
                      AUTHORIZED PROTOCOLS
                    </h3>
                  </div>

                  <ul className="space-y-0">
                    {DO_RULES.map((rule, i) => (
                      <li
                        key={i}
                        className="group flex items-start gap-3 py-2.5 border-b border-cyan-500/10 last:border-0 hover:bg-green-500/5 transition-colors duration-150 px-1 rounded-sm"
                      >
                        <span className="font-mono text-[9px] text-green-500/60 group-hover:text-green-400 shrink-0 mt-0.5 transition-colors duration-150">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/70 group-hover:text-[#22D3EE] transition-colors duration-150 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.1}>
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-red-500/20 rounded-sm h-full">
                {/* Scan line */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(239,68,68,0.03)_1px,rgba(239,68,68,0.03)_2px)] pointer-events-none rounded-sm" />
                {/* L-corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/60" />
                {/* Label */}
                <div className="absolute -top-3 left-6 bg-[#020617] px-3 py-0.5 border border-red-500/30 rounded-sm">
                  <span className="text-red-400 font-mono text-[9px] uppercase tracking-widest">DIRECTIVE: PROHIBIT</span>
                </div>

                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <h3 className="font-mono text-sm uppercase tracking-widest text-red-400">
                      PROHIBITED ACTIONS
                    </h3>
                  </div>

                  <ul className="space-y-0">
                    {DONT_RULES.map((rule, i) => (
                      <li
                        key={i}
                        className="group flex items-start gap-3 py-2.5 border-b border-red-500/10 last:border-0 hover:bg-red-500/5 transition-colors duration-150 px-1 rounded-sm"
                      >
                        <span className="font-mono text-[9px] text-red-500/60 group-hover:text-red-400 shrink-0 mt-0.5 transition-colors duration-150">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-red-500/50 group-hover:text-red-300 transition-colors duration-150 leading-relaxed">
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
      {/* SECTION 8 — Footer                                           */}
      {/* ============================================================ */}
      <footer className="border-t border-cyan-500/20 bg-[#020617]">
        {/* Top glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Status row */}
          <RevealBlock>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-green-400">
                SYSTEM NOMINAL
              </span>
              <span className="text-cyan-500/20 font-mono">—</span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#22D3EE]/60">
                ALL STATIONS ONLINE
              </span>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <RevealBlock delay={0.05}>
              <div className="space-y-3">
                <div
                  className="font-mono font-black uppercase text-2xl tracking-tight"
                  style={{ color: "#22D3EE", textShadow: "0 0 20px rgba(34,211,238,0.4)" }}
                >
                  SCI-FI HUD
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/40 leading-relaxed">
                  STARSHIP COMMAND INTERFACE<br />
                  TACTICAL VISUALIZATION SYSTEM<br />
                  STYLEKIT DESIGN LIBRARY
                </p>
              </div>
            </RevealBlock>

            {/* Coordinates */}
            <RevealBlock delay={0.1}>
              <div className="space-y-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30 mb-2">
                  STATION COORDINATES
                </div>
                {[
                  { label: "LAT", value: "48.8566 N" },
                  { label: "LON", value: "002.3522 E" },
                  { label: "ALT", value: "412.00 KM" },
                  { label: "SECTOR", value: "ALPHA-SEVEN" },
                ].map((coord) => (
                  <div key={coord.label} className="flex items-center gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30 w-10">
                      {coord.label}
                    </span>
                    <div className="flex-1 h-px bg-cyan-500/10" />
                    <span className="font-mono text-[10px] text-[#22D3EE]/70">{coord.value}</span>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Links + copyright */}
            <RevealBlock delay={0.15}>
              <div className="space-y-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/30 mb-2">
                  NAVIGATION LINKS
                </div>
                <nav className="space-y-2">
                  <Link
                    href="/styles/sci-fi-hud"
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-500/50 hover:text-[#22D3EE] transition-colors duration-150"
                  >
                    <span className="text-cyan-500/30">→</span>
                    DOCUMENTATION
                  </Link>
                  <Link
                    href="/styles"
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-500/50 hover:text-[#22D3EE] transition-colors duration-150"
                  >
                    <span className="text-cyan-500/30">→</span>
                    ALL STYLES
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-500/50 hover:text-[#22D3EE] transition-colors duration-150"
                  >
                    <span className="text-cyan-500/30">→</span>
                    COMMAND HOME
                  </Link>
                </nav>

                <div className="pt-4 border-t border-cyan-500/10">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-500/25">
                    &copy; 2025 STYLEKIT COMMAND<br />
                    ALL SYSTEMS OPERATIONAL
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Bottom divider + system tag */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 pt-6 border-t border-cyan-500/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {["SHIELD:87%", "POWER:74%", "COMM:96%", "THREAT:MED"].map((tag, i) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/25"
                  >
                    {i > 0 && <span className="mr-4 text-cyan-500/10">|</span>}
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-500/20">
                HUD v2.1 // STYLEKIT
              </span>
            </div>
          </RevealBlock>
        </div>

        {/* Bottom scan line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </footer>
    </div>
  );
}
