"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
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
/*  HUD Corner decoration                                              */
/* ------------------------------------------------------------------ */

function HudCorners({
  color = "#7c3aed",
  size = "w-5 h-5",
}: {
  color?: string;
  size?: string;
}) {
  const borderStyle = `2px solid ${color}`;
  return (
    <>
      <span
        className={`absolute top-0 left-0 ${size} pointer-events-none`}
        style={{ borderTop: borderStyle, borderLeft: borderStyle }}
      />
      <span
        className={`absolute top-0 right-0 ${size} pointer-events-none`}
        style={{ borderTop: borderStyle, borderRight: borderStyle }}
      />
      <span
        className={`absolute bottom-0 left-0 ${size} pointer-events-none`}
        style={{ borderBottom: borderStyle, borderLeft: borderStyle }}
      />
      <span
        className={`absolute bottom-0 right-0 ${size} pointer-events-none`}
        style={{ borderBottom: borderStyle, borderRight: borderStyle }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const mechaCards = [
  {
    id: "SYS-01",
    title: "ANIMATION ENGINE",
    subtitle: "Fluid Motion Core",
    desc: "Every frame is a calculated masterpiece. The animation pipeline processes 60 keyframes per second, interpolating between states with the precision of a mecha targeting system.",
    stat1: { label: "FRAME RATE", value: "60 FPS" },
    stat2: { label: "LATENCY", value: "< 2ms" },
    accent: "#06d6a0",
    tag: "MOTION",
  },
  {
    id: "SYS-02",
    title: "MANGA RENDER",
    subtitle: "Cel Shader Protocol",
    desc: "Traditional manga aesthetics fused with real-time rendering. Ink lines traced at subpixel precision, halftone patterns generated procedurally across each surface.",
    stat1: { label: "LINE WIDTH", value: "0.5px" },
    stat2: { label: "TONE DEPTH", value: "256bit" },
    accent: "#7c3aed",
    tag: "RENDER",
  },
  {
    id: "SYS-03",
    title: "NEURAL SYNC",
    subtitle: "Pilot Interface Link",
    desc: "Bidirectional data stream between the human operator and the mechanical frame. Emotional state translated into control vectors in real-time. Synchronization rate critical.",
    stat1: { label: "SYNC RATE", value: "98.7%" },
    stat2: { label: "SIGNAL", value: "STRONG" },
    accent: "#ff006e",
    tag: "NEURAL",
  },
];

const episodes = [
  {
    num: "EP.01",
    title: "AWAKENING PROTOCOL",
    genre: ["ACTION", "MECHA"],
    runtime: "24:00",
    status: "COMPLETE",
    gradFrom: "#7c3aed",
    gradTo: "#0f0f2e",
    desc: "The pilot synchronizes with Unit-01 for the first time. A new era of warfare begins in Neo-Tokyo.",
  },
  {
    num: "EP.02",
    title: "GHOST IN THE GRID",
    genre: ["DRAMA", "SCI-FI"],
    runtime: "24:00",
    status: "COMPLETE",
    gradFrom: "#06d6a0",
    gradTo: "#0f1f1a",
    desc: "Data phantoms haunt the city neural network. Detective Akira dives into the digital underworld.",
  },
  {
    num: "EP.03",
    title: "NEON REQUIEM",
    genre: ["ACTION", "TRAGEDY"],
    runtime: "24:00",
    status: "COMPLETE",
    gradFrom: "#ff006e",
    gradTo: "#1f0010",
    desc: "A beloved comrade falls in the battle over the Shibuya district. The cost of war becomes real.",
  },
  {
    num: "EP.04",
    title: "HOLLOW SIGNAL",
    genre: ["MYSTERY", "THRILLER"],
    runtime: "24:00",
    status: "COMPLETE",
    gradFrom: "#38bdf8",
    gradTo: "#0a1520",
    desc: "Encrypted transmissions from an unknown source lead the team into a government black site.",
  },
  {
    num: "EP.05",
    title: "SYNCHRONIZE",
    genre: ["DRAMA", "MECHA"],
    runtime: "24:00",
    status: "AIRING",
    gradFrom: "#7c3aed",
    gradTo: "#38bdf8",
    desc: "Yuki and Ren achieve 100% synchronization. The mecha evolves beyond its original programming.",
  },
  {
    num: "EP.06",
    title: "OMEGA THRESHOLD",
    genre: ["ACTION", "FINALE"],
    runtime: "48:00",
    status: "UPCOMING",
    gradFrom: "#ff006e",
    gradTo: "#7c3aed",
    desc: "The final confrontation approaches. All systems nominal. Initiating last stand sequence now.",
  },
];

const colorSwatches = [
  {
    name: "DEEP NIGHT",
    hex: "#0f0f1a",
    label: "// DEEP NIGHT",
    code: "#0f0f1a",
    glow: "rgba(15,15,26,0.8)",
    displayColor: "#7c3aed",
  },
  {
    name: "VIOLET",
    hex: "#7c3aed",
    label: "// VIOLET",
    code: "#7c3aed",
    glow: "rgba(124,58,237,0.6)",
    displayColor: "#7c3aed",
  },
  {
    name: "CYAN GREEN",
    hex: "#06d6a0",
    label: "// CYAN GREEN",
    code: "#06d6a0",
    glow: "rgba(6,214,160,0.6)",
    displayColor: "#06d6a0",
  },
  {
    name: "HOT PINK",
    hex: "#ff006e",
    label: "// HOT PINK",
    code: "#ff006e",
    glow: "rgba(255,0,110,0.6)",
    displayColor: "#ff006e",
  },
  {
    name: "SKY BLUE",
    hex: "#38bdf8",
    label: "// SKY BLUE",
    code: "#38bdf8",
    glow: "rgba(56,189,248,0.6)",
    displayColor: "#38bdf8",
  },
];

const doRules = [
  "Use angled HUD bracket corners on every interactive panel",
  "Apply scan line overlays at 4px intervals to create depth",
  "Layer violet glow on primary actions and focused states",
  "Use monospace font for all data readouts and status labels",
  "Animate with pulse effects on active/online indicators",
  "Maintain deep night (#0f0f1a) as the base canvas always",
  "Use cyan-green for success and online system states",
  "Hot pink exclusively for warnings, alerts, and critical data",
];

const dontRules = [
  "Never use white backgrounds — this aesthetic lives in the dark",
  "Never mix sans-serif into HUD label and readout text",
  "Never omit corner brackets from card and panel elements",
  "Never use soft rounded corners on mecha-frame components",
  "Never animate at speeds slower than 150ms — lag feels broken",
  "Never use yellow or warm tones — the palette is cool and electric",
  "Never skip the scan line overlay on hero and primary sections",
  "Never use flat solid borders without a matching glow shadow",
];

const typeRows = [
  {
    scale: "DISPLAY XL",
    size: "text-7xl",
    sample: "NEURAL",
    color: "#7c3aed",
    delay: 0,
  },
  {
    scale: "DISPLAY LG",
    size: "text-5xl",
    sample: "SYNCHRONIZE",
    color: "#ffffff",
    delay: 0.06,
  },
  {
    scale: "HEADING",
    size: "text-3xl",
    sample: "MECHA INTERFACE",
    color: "#06d6a0",
    delay: 0.12,
  },
  {
    scale: "SUBHEADING",
    size: "text-xl",
    sample: "UNIT-01 PILOT SYNCHRONIZATION COMPLETE",
    color: "#38bdf8",
    delay: 0.18,
  },
  {
    scale: "BODY MONO",
    size: "text-sm",
    sample:
      "Data streams flow across the neural link at 400 terabytes per second. The mecha responds instantly.",
    color: "rgba(255,255,255,0.7)",
    delay: 0.24,
  },
  {
    scale: "HUD LABEL",
    size: "text-xs",
    sample:
      "// STATUS: ONLINE // SYNC: 98.7% // ALT: 3,600m // VECTOR: 045N //",
    color: "#ff006e",
    delay: 0.3,
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type SystemStatus = "online" | "scanning" | "offline";
type ActiveComponent = "button" | "card" | "input";

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function CyberAnimeShowcase() {
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>("online");
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>("button");
  const [inputValue, setInputValue] = useState("");
  const [buttonHovered, setButtonHovered] = useState(false);

  function cycleStatus() {
    setSystemStatus((prev) => {
      if (prev === "online") return "scanning";
      if (prev === "scanning") return "offline";
      return "online";
    });
  }

  const statusColor: Record<SystemStatus, string> = {
    online: "#06d6a0",
    scanning: "#38bdf8",
    offline: "#ff006e",
  };

  const statusLabel: Record<SystemStatus, string> = {
    online: "[ ONLINE ]",
    scanning: "[ SCANNING ]",
    offline: "[ OFFLINE ]",
  };

  const scanlineStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(transparent 50%, rgba(124,58,237,0.05) 50%)",
    backgroundSize: "100% 4px",
  };

  /* ---------------------------------------------------------------- */
  /* SECTION 1 — Fixed Nav                                             */
  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#7c3aed]/30"
        style={{
          background: "rgba(15,15,26,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 1px 0 rgba(124,58,237,0.4), 0 4px 24px rgba(124,58,237,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Back to Docs */}
          <div className="flex items-center gap-4">
          <Link
            href="/styles/cyber-anime"
            className="group flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-[#7c3aed] transition-colors duration-150 tracking-widest"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-150 inline-block text-[#7c3aed]">&larr;</span>
            <span className="uppercase">Back to Docs</span>
          </Link>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-[#7c3aed] font-bold tracking-widest">
              STYLEKIT
            </span>
            <span className="font-mono text-[#7c3aed]/50 text-sm">{" // "}</span>
            <span className="font-mono text-[#7c3aed]/80 text-xs tracking-widest uppercase">
              CYBER ANIME
            </span>
          </div>
          </div>

          {/* Center — status badge, click to cycle */}
          <button
            onClick={cycleStatus}
            className="font-mono text-xs px-2 py-0.5 border transition-all duration-150 cursor-pointer"
            style={{
              color: statusColor[systemStatus],
              borderColor: `${statusColor[systemStatus]}40`,
              boxShadow: `0 0 8px ${statusColor[systemStatus]}30`,
            }}
          >
            {statusLabel[systemStatus]}
          </button>

          {/* Return */}
          <Link
            href="/"
            className="font-mono text-xs text-white/50 hover:text-[#7c3aed] transition-colors duration-150 tracking-widest"
          >
            StyleKit{" "}
            <span className="text-[#7c3aed]">→</span>
          </Link>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 2 — Hero (HUD Display)                                   */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden"
        style={scanlineStyle}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial glow center */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />

        {/* HUD Frame */}
        <div className="relative max-w-5xl w-full mx-6">
          <div
            className="relative border border-[#7c3aed]/40 p-8 md:p-16"
            style={{
              boxShadow:
                "0 0 40px rgba(124,58,237,0.2), inset 0 0 40px rgba(124,58,237,0.05)",
            }}
          >
            <HudCorners color="#7c3aed" size="w-8 h-8" />

            {/* Top status bar */}
            <div className="flex items-center justify-between mb-10">
              <div className="font-mono text-xs text-[#06d6a0]/70 tracking-widest">
                SYS // UNIT-01 ONLINE
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-sm"
                    style={{
                      width: `${i * 6 + 8}px`,
                      background: i <= 4 ? "#06d6a0" : "rgba(6,214,160,0.2)",
                      boxShadow:
                        i <= 4 ? "0 0 4px rgba(6,214,160,0.6)" : "none",
                    }}
                  />
                ))}
                <span className="font-mono text-xs text-[#06d6a0] ml-1">
                  SIGNAL
                </span>
              </div>
            </div>

            {/* Main title */}
            <div className="text-center mb-10">
              <div className="font-mono text-xs text-[#7c3aed]/60 tracking-[0.4em] mb-4 uppercase">
                {"// STYLE DESIGNATION //"}
              </div>
              <h1
                className="font-mono font-black tracking-tighter leading-none text-white mb-1"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  textShadow:
                    "0 0 30px rgba(124,58,237,0.8), 0 0 60px rgba(124,58,237,0.4)",
                }}
              >
                CYBER
              </h1>
              <h1
                className="font-mono font-black tracking-tighter leading-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  color: "#7c3aed",
                  textShadow:
                    "0 0 30px rgba(124,58,237,0.9), 0 0 60px rgba(124,58,237,0.5)",
                }}
              >
                ANIME
              </h1>
              <div className="font-mono text-xs text-[#06d6a0]/70 tracking-[0.3em] mt-4">
                赛博动漫风 / CYBERPUNK HUD AESTHETIC
              </div>
            </div>

            {/* Data readouts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "COORD X", value: "139.6917E" },
                { label: "COORD Y", value: "35.6895N" },
                { label: "ALT", value: "3,600 m" },
                { label: "DATE", value: "2077.03.15" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative border border-[#7c3aed]/20 p-3"
                  style={{ background: "rgba(124,58,237,0.05)" }}
                >
                  <HudCorners color="#7c3aed" size="w-3 h-3" />
                  <div className="font-mono text-[10px] text-[#7c3aed]/60 tracking-widest mb-1">
                    {item.label}
                  </div>
                  <div className="font-mono text-sm text-[#06d6a0]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Animated pulse */}
            <div className="flex items-center justify-center mt-10 gap-3">
              <div className="relative">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "#06d6a0",
                    boxShadow: "0 0 12px rgba(6,214,160,0.8)",
                    animation: "ca-pulse 2s infinite",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "1px solid rgba(6,214,160,0.6)",
                    animation: "ca-ping 2s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
              </div>
              <span className="font-mono text-xs text-[#06d6a0] tracking-widest">
                SYSTEM NOMINAL
              </span>
            </div>
          </div>

          {/* Bottom HUD info bar */}
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="font-mono text-[10px] text-[#7c3aed]/40 tracking-widest">
              {"// STYLEKIT CYBER-ANIME v2.077"}
            </span>
            <span className="font-mono text-[10px] text-[#06d6a0]/40 tracking-widest">
              {"RENDER OK //"}
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 3 — Mecha Frame Cards                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <RevealBlock>
          <div className="mb-4">
            <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
              {"// SUBSYSTEM MANIFEST //"}
            </span>
          </div>
          <h2
            className="font-mono font-bold text-4xl md:text-5xl text-white mb-2"
            style={{ textShadow: "0 0 20px rgba(124,58,237,0.4)" }}
          >
            MECHA SYSTEMS
          </h2>
          <div className="font-mono text-sm text-white/40 tracking-widest mb-14">
            Core modules powering the aesthetic engine
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mechaCards.map((card, i) => (
            <RevealBlock key={card.id} delay={i * 0.12}>
              <div
                className="relative border border-[#7c3aed]/30 p-6 h-full"
                style={{
                  background: "rgba(15,15,26,0.9)",
                  backgroundImage:
                    "linear-gradient(transparent 50%, rgba(124,58,237,0.03) 50%)",
                  backgroundSize: "100% 4px",
                }}
              >
                <HudCorners color={card.accent} size="w-5 h-5" />

                {/* Hot pink accent dot */}
                <div
                  className="absolute top-3 right-8 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#ff006e",
                    boxShadow: "0 0 8px rgba(255,0,110,0.8)",
                  }}
                />

                {/* Card header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[10px] tracking-widest px-2 py-0.5 border"
                      style={{
                        color: card.accent,
                        borderColor: `${card.accent}40`,
                        boxShadow: `0 0 8px ${card.accent}20`,
                      }}
                    >
                      {card.tag}
                    </span>
                    <span className="font-mono text-[10px] text-white/30">
                      {card.id}
                    </span>
                  </div>
                  <h3
                    className="font-mono font-bold text-xl text-white mt-3"
                    style={{
                      textShadow: `0 0 12px ${card.accent}40`,
                    }}
                  >
                    {card.title}
                  </h3>
                  <div className="font-mono text-xs text-white/40 mt-1">
                    {card.subtitle}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full mb-4"
                  style={{
                    background: `linear-gradient(90deg, ${card.accent}60, transparent)`,
                  }}
                />

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {[card.stat1, card.stat2].map((stat) => (
                    <div
                      key={stat.label}
                      className="relative border border-[#7c3aed]/15 p-2"
                      style={{ background: "rgba(124,58,237,0.04)" }}
                    >
                      <HudCorners color="#7c3aed" size="w-2 h-2" />
                      <div className="font-mono text-[9px] text-white/30 tracking-widest mb-0.5">
                        {stat.label}
                      </div>
                      <div
                        className="font-mono text-sm font-bold"
                        style={{ color: card.accent }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 4 — Component Showcase                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #0f0f1a 0%, #100a1f 50%, #0f0f1a 100%)",
          ...scanlineStyle,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-4">
              <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
                {"// COMPONENT LIBRARY //"}
              </span>
            </div>
            <h2
              className="font-mono font-bold text-4xl md:text-5xl text-white mb-2"
              style={{ textShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              UI COMPONENTS
            </h2>
            <div className="font-mono text-sm text-white/40 tracking-widest mb-10">
              Holographic elements from the interface toolkit
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex gap-2 mb-10">
              {(["button", "card", "input"] as ActiveComponent[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponent(tab)}
                  className="font-mono text-xs px-4 py-2 border transition-all duration-150 tracking-widest uppercase"
                  style={
                    activeComponent === tab
                      ? {
                          background: "rgba(124,58,237,0.2)",
                          borderColor: "#7c3aed",
                          color: "#7c3aed",
                          boxShadow: "0 0 16px rgba(124,58,237,0.4)",
                        }
                      : {
                          background: "transparent",
                          borderColor: "rgba(124,58,237,0.2)",
                          color: "rgba(255,255,255,0.4)",
                        }
                  }
                >
                  {"// "}
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Component display panel */}
          <RevealBlock delay={0.2}>
            <div
              className="relative border border-[#7c3aed]/30 p-8 md:p-14"
              style={{
                background: "rgba(15,15,26,0.95)",
                boxShadow: "0 0 40px rgba(124,58,237,0.1)",
              }}
            >
              <HudCorners color="#7c3aed" size="w-6 h-6" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-10">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#06d6a0",
                    boxShadow: "0 0 8px rgba(6,214,160,0.8)",
                  }}
                />
                <span className="font-mono text-xs text-[#06d6a0] tracking-widest">
                  COMPONENT // {activeComponent.toUpperCase()} MODULE
                </span>
              </div>

              {/* BUTTON */}
              {activeComponent === "button" && (
                <div className="flex flex-col items-center gap-8">
                  <div className="font-mono text-xs text-white/30 tracking-widest mb-2">
                    HOLOGRAPHIC BUTTON — PRIMARY ACTION
                  </div>
                  <button
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                    className="relative px-10 py-4 font-mono text-sm tracking-widest uppercase overflow-hidden transition-all duration-150"
                    style={{
                      background: buttonHovered
                        ? "rgba(124,58,237,0.3)"
                        : "rgba(124,58,237,0.1)",
                      border: "1px solid #7c3aed",
                      color: buttonHovered ? "#ffffff" : "#7c3aed",
                      boxShadow: buttonHovered
                        ? "0 0 30px rgba(124,58,237,0.6), inset 0 0 30px rgba(124,58,237,0.1)"
                        : "0 0 16px rgba(124,58,237,0.3)",
                    }}
                  >
                    <HudCorners color="#7c3aed" size="w-3 h-3" />
                    <span
                      className="absolute inset-0 transition-all duration-150"
                      style={{
                        background: buttonHovered
                          ? "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)"
                          : "transparent",
                      }}
                    />
                    <span className="relative z-10">INITIATE SEQUENCE</span>
                  </button>
                  <div className="font-mono text-[10px] text-white/20 tracking-widest text-center">
                    HOVER TO ACTIVATE HOLOGRAPHIC SWEEP EFFECT
                  </div>
                </div>
              )}

              {/* CARD */}
              {activeComponent === "card" && (
                <div className="flex justify-center">
                  <div
                    className="relative border border-[#7c3aed]/40 p-6 max-w-sm w-full"
                    style={{
                      background: "rgba(124,58,237,0.06)",
                      boxShadow:
                        "0 0 30px rgba(124,58,237,0.2), inset 0 0 30px rgba(124,58,237,0.04)",
                      backgroundImage:
                        "linear-gradient(transparent 50%, rgba(124,58,237,0.05) 50%)",
                      backgroundSize: "100% 4px",
                    }}
                  >
                    <HudCorners color="#06d6a0" size="w-5 h-5" />
                    <div
                      className="absolute top-2 right-6 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#ff006e",
                        boxShadow: "0 0 8px rgba(255,0,110,0.8)",
                      }}
                    />
                    <div className="font-mono text-[10px] text-[#06d6a0] tracking-widest mb-3">
                      HUD PANEL // UNIT STATUS
                    </div>
                    <h3 className="font-mono font-bold text-2xl text-white mb-1">
                      EVANGELION
                    </h3>
                    <div className="font-mono text-xs text-white/40 mb-4">
                      Unit-01 / Berserk Mode
                    </div>
                    <div
                      className="h-px w-full mb-4"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(6,214,160,0.4), transparent)",
                      }}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { l: "SYNC", v: "400%", c: "#ff006e" },
                        { l: "POWER", v: "INFINITE", c: "#06d6a0" },
                        { l: "PILOT", v: "SHINJI", c: "#38bdf8" },
                        { l: "STATUS", v: "BERSERK", c: "#ff006e" },
                      ].map((row) => (
                        <div
                          key={row.l}
                          className="relative border border-[#7c3aed]/15 p-2"
                          style={{ background: "rgba(124,58,237,0.04)" }}
                        >
                          <HudCorners color="#7c3aed" size="w-1.5 h-1.5" />
                          <div className="font-mono text-[9px] text-white/30 mb-0.5">
                            {row.l}
                          </div>
                          <div
                            className="font-mono text-xs font-bold"
                            style={{ color: row.c }}
                          >
                            {row.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* INPUT */}
              {activeComponent === "input" && (
                <div className="flex flex-col items-center gap-6 max-w-md mx-auto w-full">
                  <div className="font-mono text-xs text-white/30 tracking-widest">
                    TERMINAL INPUT — DATA ENTRY INTERFACE
                  </div>
                  <div className="w-full relative">
                    <HudCorners color="#06d6a0" size="w-4 h-4" />
                    <div className="font-mono text-[10px] text-[#06d6a0]/60 tracking-widest mb-2 pl-1">
                      {">"} ENTER COMMAND
                    </div>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="type your command here_"
                      className="w-full font-mono text-sm px-4 py-3 outline-none transition-all duration-150"
                      style={{
                        background: "rgba(6,214,160,0.05)",
                        border: "1px solid rgba(6,214,160,0.4)",
                        color: "#06d6a0",
                        caretColor: "#06d6a0",
                        boxShadow: inputValue
                          ? "0 0 16px rgba(6,214,160,0.2), inset 0 0 16px rgba(6,214,160,0.04)"
                          : "none",
                      }}
                    />
                    {inputValue && (
                      <div className="font-mono text-[10px] text-[#06d6a0]/50 tracking-widest mt-2 pl-1">
                        {">"} INPUT RECEIVED: {inputValue.length} CHARS
                      </div>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-white/20 tracking-widest text-center">
                    MONOSPACE FONT — CYAN-GREEN BORDER — DARK BACKGROUND
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 5 — Color System                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <RevealBlock>
          <div className="mb-4">
            <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
              {"// PALETTE MATRIX //"}
            </span>
          </div>
          <h2
            className="font-mono font-bold text-4xl md:text-5xl text-white mb-2"
            style={{ textShadow: "0 0 20px rgba(124,58,237,0.4)" }}
          >
            COLOR SYSTEM
          </h2>
          <div className="font-mono text-sm text-white/40 tracking-widest mb-14">
            Five frequencies that define the spectrum
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {colorSwatches.map((swatch, i) => (
            <RevealBlock key={swatch.name} delay={i * 0.08}>
              <div
                className="relative border border-[#7c3aed]/20 overflow-hidden transition-all duration-150 hover:border-[#7c3aed]/50"
                style={{ background: "rgba(15,15,26,0.9)" }}
              >
                <HudCorners color="#7c3aed" size="w-4 h-4" />

                {/* Color block */}
                <div
                  className="h-28 w-full"
                  style={{
                    background: swatch.hex,
                    boxShadow: `inset 0 -8px 24px ${swatch.glow}`,
                  }}
                />

                {/* Info */}
                <div className="p-4">
                  <div
                    className="font-mono text-[10px] tracking-widest mb-1"
                    style={{ color: swatch.displayColor }}
                  >
                    {swatch.label}
                  </div>
                  <div className="font-mono text-lg font-bold text-white mb-1">
                    {swatch.name}
                  </div>
                  <div
                    className="font-mono text-sm"
                    style={{
                      color: swatch.displayColor,
                      textShadow: `0 0 8px ${swatch.glow}`,
                    }}
                  >
                    {swatch.code}
                  </div>
                </div>

                {/* Bottom glow line */}
                <div
                  className="h-0.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${swatch.hex}60, ${swatch.hex}, ${swatch.hex}60)`,
                    boxShadow: `0 0 8px ${swatch.glow}`,
                  }}
                />
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 6 — Anime Episode Grid                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #0f0f1a 0%, #0a0718 50%, #0f0f1a 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-4">
              <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
                {"// EPISODE ARCHIVE //"}
              </span>
            </div>
            <h2
              className="font-mono font-bold text-4xl md:text-5xl text-white mb-2"
              style={{ textShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              BROADCAST GRID
            </h2>
            <div className="font-mono text-sm text-white/40 tracking-widest mb-14">
              Series: NEON PROTOCOL — Season 01
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {episodes.map((ep, i) => {
              const isActive = activeEpisode === i;
              return (
                <RevealBlock key={ep.num} delay={i * 0.08}>
                  <button
                    onClick={() => setActiveEpisode(isActive ? null : i)}
                    className="w-full text-left relative border transition-all duration-150"
                    style={{
                      borderColor: isActive
                        ? "#7c3aed"
                        : "rgba(124,58,237,0.25)",
                      background: "rgba(15,15,26,0.95)",
                      boxShadow: isActive
                        ? "0 0 24px rgba(124,58,237,0.4)"
                        : "none",
                    }}
                  >
                    <HudCorners color="#7c3aed" size="w-4 h-4" />

                    {/* Thumbnail placeholder */}
                    <div
                      className="relative h-36 w-full overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${ep.gradFrom} 0%, ${ep.gradTo} 100%)`,
                      }}
                    >
                      {/* Scan line on thumbnail */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(transparent 50%, rgba(0,0,0,0.2) 50%)",
                          backgroundSize: "100% 4px",
                        }}
                      />

                      {/* Episode number */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="font-mono text-xs px-2 py-0.5 border border-white/30"
                          style={{ background: "rgba(0,0,0,0.6)" }}
                        >
                          {ep.num}
                        </span>
                      </div>

                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className="font-mono text-[9px] px-2 py-0.5 border tracking-widest"
                          style={
                            ep.status === "COMPLETE"
                              ? {
                                  color: "#06d6a0",
                                  borderColor: "rgba(6,214,160,0.5)",
                                  background: "rgba(6,214,160,0.1)",
                                }
                              : ep.status === "AIRING"
                                ? {
                                    color: "#38bdf8",
                                    borderColor: "rgba(56,189,248,0.5)",
                                    background: "rgba(56,189,248,0.1)",
                                  }
                                : {
                                    color: "#ff006e",
                                    borderColor: "rgba(255,0,110,0.5)",
                                    background: "rgba(255,0,110,0.1)",
                                  }
                          }
                        >
                          {ep.status}
                        </span>
                      </div>

                      {/* Play button on active */}
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
                        style={{ opacity: isActive ? 1 : 0 }}
                      >
                        <div
                          className="w-12 h-12 border-2 border-white/80 flex items-center justify-center"
                          style={{
                            background: "rgba(124,58,237,0.6)",
                            boxShadow: "0 0 20px rgba(124,58,237,0.6)",
                          }}
                        >
                          <span className="text-white text-lg ml-1">&#9654;</span>
                        </div>
                      </div>

                      {/* Runtime bar */}
                      <div
                        className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex justify-between items-center"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <div className="flex gap-2">
                          {ep.genre.map((g) => (
                            <span
                              key={g}
                              className="font-mono text-[9px] tracking-widest text-white/60"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                        <span className="font-mono text-[9px] text-white/40">
                          {ep.runtime}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <h3 className="font-mono font-bold text-sm text-white mb-1 tracking-wide">
                        {ep.title}
                      </h3>

                      {/* Expanded info */}
                      <div
                        className="overflow-hidden transition-all duration-150"
                        style={{
                          maxHeight: isActive ? "80px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <div
                          className="h-px w-full mb-2 mt-1"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)",
                          }}
                        />
                        <p className="text-xs text-white/50 leading-relaxed font-mono">
                          {ep.desc}
                        </p>
                      </div>

                      {!isActive && (
                        <div className="font-mono text-[10px] text-[#7c3aed]/50 tracking-widest mt-1">
                          {"CLICK TO EXPAND //"}
                        </div>
                      )}
                    </div>
                  </button>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 7 — Do / Don't Rules                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <RevealBlock>
          <div className="mb-4">
            <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
              {"// DESIGN PROTOCOL //"}
            </span>
          </div>
          <h2
            className="font-mono font-bold text-4xl md:text-5xl text-white mb-2"
            style={{ textShadow: "0 0 20px rgba(124,58,237,0.4)" }}
          >
            DIRECTIVES
          </h2>
          <div className="font-mono text-sm text-white/40 tracking-widest mb-14">
            Operational rules for the cyber anime aesthetic
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO panel */}
          <RevealBlock delay={0.1}>
            <div
              className="relative border border-[#06d6a0]/30 p-8 h-full"
              style={{
                background: "rgba(6,214,160,0.03)",
                boxShadow: "0 0 30px rgba(6,214,160,0.08)",
              }}
            >
              <HudCorners color="#06d6a0" size="w-5 h-5" />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#06d6a0",
                    boxShadow: "0 0 8px rgba(6,214,160,0.8)",
                  }}
                />
                <span className="font-mono text-xs text-[#06d6a0] tracking-widest">
                  {"// EXECUTE"}
                </span>
              </div>

              <h3
                className="font-mono font-bold text-2xl mb-6"
                style={{
                  color: "#06d6a0",
                  textShadow: "0 0 16px rgba(6,214,160,0.5)",
                }}
              >
                DO
              </h3>

              <ul className="space-y-3">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono text-[#06d6a0] mt-0.5 shrink-0"
                      style={{ textShadow: "0 0 6px rgba(6,214,160,0.6)" }}
                    >
                      &#9658;
                    </span>
                    <span className="text-sm text-white/70 leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="h-px w-full mt-8"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(6,214,160,0.6), transparent)",
                }}
              />
              <div className="font-mono text-[10px] text-[#06d6a0]/40 tracking-widest mt-2">
                DIRECTIVES LOADED // {doRules.length} RULES
              </div>
            </div>
          </RevealBlock>

          {/* DON'T panel */}
          <RevealBlock delay={0.2}>
            <div
              className="relative border border-[#ff006e]/30 p-8 h-full"
              style={{
                background: "rgba(255,0,110,0.03)",
                boxShadow: "0 0 30px rgba(255,0,110,0.08)",
              }}
            >
              <HudCorners color="#ff006e" size="w-5 h-5" />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#ff006e",
                    boxShadow: "0 0 8px rgba(255,0,110,0.8)",
                  }}
                />
                <span className="font-mono text-xs text-[#ff006e] tracking-widest">
                  {"// PROHIBITED"}
                </span>
              </div>

              <h3
                className="font-mono font-bold text-2xl mb-6"
                style={{
                  color: "#ff006e",
                  textShadow: "0 0 16px rgba(255,0,110,0.5)",
                }}
              >
                {"DON'T"}
              </h3>

              <ul className="space-y-3">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono text-[#ff006e] mt-0.5 shrink-0"
                      style={{ textShadow: "0 0 6px rgba(255,0,110,0.6)" }}
                    >
                      &#10005;
                    </span>
                    <span className="text-sm text-white/70 leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="h-px w-full mt-8"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,0,110,0.6), transparent)",
                }}
              />
              <div className="font-mono text-[10px] text-[#ff006e]/40 tracking-widest mt-2">
                RESTRICTIONS ACTIVE // {dontRules.length} RULES
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 8 — Typography Scale                                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #0f0f1a 0%, #0d0a1a 50%, #0f0f1a 100%)",
          ...scanlineStyle,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-4">
              <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
                {"// TYPOGRAPHIC MATRIX //"}
              </span>
            </div>
            <h2
              className="font-mono font-bold text-4xl md:text-5xl text-white mb-2"
              style={{ textShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              TYPE SYSTEM
            </h2>
            <div className="font-mono text-sm text-white/40 tracking-widest mb-14">
              Monospace HUD labels. Display headers. System readouts.
            </div>
          </RevealBlock>

          <div className="space-y-4">
            {typeRows.map((row) => (
              <RevealBlock key={row.scale} delay={row.delay}>
                <div
                  className="relative border border-[#7c3aed]/15 p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-150 hover:border-[#7c3aed]/30"
                  style={{ background: "rgba(124,58,237,0.03)" }}
                >
                  <HudCorners color="#7c3aed" size="w-3 h-3" />
                  <div className="font-mono text-[9px] text-[#7c3aed]/50 tracking-widest w-28 shrink-0">
                    {row.scale}
                  </div>
                  <div
                    className={`${row.size} font-mono font-bold leading-tight truncate`}
                    style={{
                      color: row.color,
                      textShadow:
                        row.color !== "rgba(255,255,255,0.7)"
                          ? `0 0 16px ${row.color}50`
                          : "none",
                    }}
                  >
                    {row.sample}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 9 — Footer                                               */}
      {/* ---------------------------------------------------------------- */}
      <footer
        className="relative border-t border-[#7c3aed]/20 overflow-hidden"
        style={{
          background: "#0f0f1a",
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(124,58,237,0.04) 50%)",
          backgroundSize: "100% 4px",
        }}
      >
        {/* Top glow line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.6) 50%, transparent)",
            boxShadow: "0 0 12px rgba(124,58,237,0.4)",
          }}
        />

        {/* HUD status bar */}
        <div
          className="border-b border-[#7c3aed]/15 px-6 py-2"
          style={{ background: "rgba(124,58,237,0.04)" }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              {[
                { l: "SYS", v: "NOMINAL", c: "#06d6a0" },
                { l: "PWR", v: "100%", c: "#06d6a0" },
                { l: "NET", v: "SECURE", c: "#38bdf8" },
                { l: "THR", v: "MINIMAL", c: "#7c3aed" },
              ].map((item) => (
                <div key={item.l} className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-white/30 tracking-widest">
                    {item.l}:
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: item.c }}
                  >
                    {item.v}
                  </span>
                </div>
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#ff006e]/60 tracking-widest">
              NEO-TOKYO // 2077
            </span>
          </div>
        </div>

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="font-mono font-black text-3xl text-white mb-1">
                STYLEKIT
              </div>
              <div className="font-mono text-sm mb-4" style={{ color: "#7c3aed" }}>
                {"// CYBER ANIME EDITION"}
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Design systems for the future. Cyberpunk HUD interfaces fused
                with anime expression. Every component a data terminal.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <div className="font-mono text-xs text-[#7c3aed]/60 tracking-widest mb-4">
                {"// NAV MATRIX"}
              </div>
              <ul className="space-y-2">
                {["All Styles", "Documentation", "Components", "Guidelines"].map(
                  (item) => (
                    <li key={item}>
                      <span className="font-mono text-sm text-white/40 hover:text-[#7c3aed] transition-colors duration-150 cursor-pointer tracking-wide">
                        {">"} {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Signal status block */}
            <div>
              <div className="font-mono text-xs text-[#7c3aed]/60 tracking-widest mb-4">
                {"// SIGNAL STATUS"}
              </div>
              <div
                className="relative border border-[#7c3aed]/25 p-4"
                style={{ background: "rgba(124,58,237,0.05)" }}
              >
                <HudCorners color="#7c3aed" size="w-3 h-3" />
                <div className="space-y-2">
                  {[
                    "CARRIER LOCKED",
                    "ENCRYPTION ACTIVE",
                    "BANDWIDTH FULL",
                  ].map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "#06d6a0",
                          boxShadow: "0 0 6px rgba(6,214,160,0.8)",
                        }}
                      />
                      <span className="font-mono text-[10px] text-[#06d6a0] tracking-widest">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* End transmission line */}
          <div className="border-t border-[#7c3aed]/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-sm text-white/30 tracking-widest">
              {"// END TRANSMISSION"}
              <span
                className="ml-1 text-[#7c3aed]"
                style={{ animation: "ca-blink 1s step-end infinite" }}
              >
                _
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#7c3aed",
                  boxShadow: "0 0 12px rgba(124,58,237,0.9)",
                  animation: "ca-pulse 2s infinite",
                }}
              />
              <span className="font-mono text-xs text-[#7c3aed]/60 tracking-widest">
                STYLEKIT CYBER-ANIME // 2077
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global keyframes */}
      <style>{`
        @keyframes ca-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes ca-ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        @keyframes ca-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
