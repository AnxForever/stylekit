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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const vhsPalette = [
  { name: "MAGENTA", hex: "#ff00ff", label: "Primary", glow: "rgba(255,0,255,0.5)" },
  { name: "CYAN", hex: "#00ffff", label: "Secondary", glow: "rgba(0,255,255,0.5)" },
  { name: "YELLOW", hex: "#ffff00", label: "Timestamp", glow: "rgba(255,255,0,0.5)" },
  { name: "GREEN", hex: "#00ff00", label: "Signal", glow: "rgba(0,255,0,0.5)" },
  { name: "DEEP PURPLE", hex: "#1a0a2e", label: "Surface", glow: "rgba(26,10,46,0.8)" },
  { name: "BLACK", hex: "#000000", label: "Background", glow: "rgba(255,0,255,0.2)" },
];

const tapeCollection = [
  { title: "SUMMER MEMORIES", genre: "HOME VIDEO", year: "1989", duration: "02:14:33", color: "#ff00ff", glow: "rgba(255,0,255,0.4)", side: "A" },
  { title: "FAMILY VACATION", genre: "TRAVEL", year: "1992", duration: "01:47:12", color: "#00ffff", glow: "rgba(0,255,255,0.4)", side: "B" },
  { title: "BIRTHDAY PARTY", genre: "CELEBRATION", year: "1994", duration: "00:58:45", color: "#ffff00", glow: "rgba(255,255,0,0.4)", side: "A" },
  { title: "SCHOOL FESTIVAL", genre: "EVENTS", year: "1991", duration: "01:22:08", color: "#00ff00", glow: "rgba(0,255,0,0.4)", side: "B" },
  { title: "ARCADE NIGHTS", genre: "ENTERTAINMENT", year: "1987", duration: "03:05:19", color: "#ff00ff", glow: "rgba(255,0,255,0.4)", side: "A" },
  { title: "NEW YEAR COUNTDOWN", genre: "SPECIAL EVENT", year: "1990", duration: "01:58:00", color: "#00ffff", glow: "rgba(0,255,255,0.4)", side: "B" },
];

const doRules = [
  "Use monospace fonts exclusively — font-mono for ALL text",
  "Apply scanline overlay via repeating-linear-gradient on cards and sections",
  "Chromatic aberration: textShadow with -3px magenta + 3px cyan offset",
  "Blinking REC indicator using animate-pulse or custom blink keyframe",
  "Glow effects: box-shadow and text-shadow with neon colors at 40-60% opacity",
  "Dark-only backgrounds: #000000 or #1a0a2e — never light or white",
  "Uppercase everything: tracking-widest for labels, tracking-wider for headings",
  "Neon borders at 20-40% opacity, full neon on hover/active states",
];

const dontRules = [
  "Never use rounded corners larger than 2px — VHS is sharp geometry only",
  "Never use serif or sans-serif fonts — monospace is the only allowed typeface",
  "Never use white or light backgrounds — all surfaces must be black or deep purple",
  "Never use soft drop shadows — only neon glow box-shadow effects",
  "Never use gradients with light colors — only dark-to-transparent or neon glows",
  "Never use border-radius on cards or containers — hard edges define the style",
  "Never use smooth animations that feel modern — glitch/tracking distortion only",
  "Never omit the scanline overlay on featured content areas",
];

const typographySamples = [
  {
    label: "DISPLAY — H1",
    sample: "VHS AESTHETIC",
    className: "text-4xl font-mono font-bold uppercase tracking-widest",
    style: { textShadow: "-3px 0 #ff00ff, 3px 0 #00ffff", color: "#ffffff" },
    desc: "font-mono, font-bold, uppercase, tracking-widest, RGB aberration shadow",
  },
  {
    label: "HEADING — H2",
    sample: "TAPE COLLECTION",
    className: "text-2xl font-mono font-bold uppercase tracking-wider",
    style: { color: "#ff00ff", textShadow: "0 0 12px rgba(255,0,255,0.6)" },
    desc: "font-mono, font-bold, uppercase, tracking-wider, magenta + glow",
  },
  {
    label: "SUBHEADING — H3",
    sample: "CHAPTER MARKERS",
    className: "text-lg font-mono font-semibold uppercase tracking-widest",
    style: { color: "#00ffff" },
    desc: "font-mono, font-semibold, uppercase, tracking-widest, cyan",
  },
  {
    label: "BODY TEXT",
    sample: "Signal detected on channel 03. Tape quality: EXCELLENT. Heads clean.",
    className: "text-sm font-mono leading-relaxed",
    style: { color: "rgba(255,255,255,0.7)" },
    desc: "font-mono, text-sm, leading-relaxed, white at 70% opacity",
  },
  {
    label: "TIMESTAMP / LABEL",
    sample: "1989.08.24  PM 11:42:07",
    className: "text-xs font-mono tracking-[0.25em] uppercase",
    style: { color: "#ffff00" },
    desc: "font-mono, text-xs, tracking extra-wide, yellow for timestamps",
  },
  {
    label: "STATUS INDICATOR",
    sample: "● REC  ▶ PLAY  ■ STOP  ⏸ PAUSE",
    className: "text-xs font-mono tracking-widest uppercase",
    style: { color: "#00ff00" },
    desc: "font-mono, text-xs, green for active status, symbol prefix",
  },
];

const vhsEffects = [
  {
    name: "SCANLINE OVERLAY",
    code: `background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(255,0,255,0.03) 2px,
  rgba(255,0,255,0.03) 4px
)`,
    desc: "Horizontal scan lines simulating CRT phosphor rows. Apply as an absolute overlay on any dark surface.",
    color: "#ff00ff",
  },
  {
    name: "CHROMATIC ABERRATION",
    code: `text-shadow:
  -3px 0 #ff00ff,
   3px 0 #00ffff`,
    desc: "RGB channel split where magenta bleeds left and cyan bleeds right. The defining VHS text effect.",
    color: "#00ffff",
  },
  {
    name: "TRACKING DISTORTION",
    code: `@keyframes vhs-tracking {
  0%  { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(3px); }
  30% { transform: translateX(0); }
}`,
    desc: "Horizontal jitter that simulates tape head misalignment. Apply on hover or as periodic animation.",
    color: "#ffff00",
  },
  {
    name: "NEON GLOW BORDER",
    code: `border: 1px solid rgba(255,0,255,0.3);
box-shadow:
  0 0 10px rgba(255,0,255,0.2),
  inset 0 0 10px rgba(255,0,255,0.05)`,
    desc: "Layered box-shadow creates depth: outer glow for ambient light, inner glow for screen phosphor bleed.",
    color: "#00ff00",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ScanlineCard({
  children,
  className = "",
  label,
  glowColor = "rgba(255,0,255,0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`relative bg-[#1a0a2e]/80 border border-[#ff00ff]/20 overflow-hidden transition-all duration-300 hover:border-[#ff00ff]/50 ${className}`}
      style={{
        boxShadow: `0 0 0 1px transparent`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${glowColor}, 0 0 40px ${glowColor.replace("0.15", "0.08")}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px transparent`;
      }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.03) 2px,rgba(255,0,255,0.03) 4px)",
        }}
      />
      {label && (
        <div className="absolute -top-px left-4 z-20">
          <span
            className="inline-block bg-[#0d0520] px-3 py-0.5 border-x border-b border-[#ff00ff]/30 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#ff00ff" }}
          >
            {label}
          </span>
        </div>
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

function RecIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"
        style={{ boxShadow: "0 0 6px rgba(255,0,0,0.8)" }}
      />
      <span className="font-mono text-xs text-red-500 uppercase tracking-widest">
        REC
      </span>
    </div>
  );
}

function TimestampBadge({ text }: { text: string }) {
  return (
    <span
      className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#ffff00]/30 bg-black/60"
      style={{ color: "#ffff00" }}
    >
      {text}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "#ff00ff" }}>
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
          ? { textShadow: "-3px 0 #ff00ff, 3px 0 #00ffff", color: "#ffffff" }
          : { color: "#ff00ff", textShadow: "0 0 20px rgba(255,0,255,0.5)" }
      }
    >
      {children}
    </h2>
  );
}

function PlaybackModeTab({
  mode,
  active,
  onClick,
}: {
  mode: { label: string; symbol: string; color: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-150"
      style={{
        color: active ? mode.color : "rgba(255,255,255,0.3)",
        borderColor: active ? mode.color : "rgba(255,255,255,0.1)",
        backgroundColor: active ? `${mode.color}15` : "transparent",
        boxShadow: active ? `0 0 12px ${mode.color}40` : "none",
      }}
    >
      {mode.symbol} {mode.label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export default function VhsAestheticShowcase() {
  const [playbackMode, setPlaybackMode] = useState<"PLAY" | "PAUSE" | "STOP" | "REC">("PLAY");
  const [counter, setCounter] = useState(0);

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    if (playbackMode !== "PLAY" && playbackMode !== "REC") return;
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [playbackMode]);

  const formatCounter = (n: number) => {
    const h = String(Math.floor(n / 3600)).padStart(2, "0");
    const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0");
    const s = String(n % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const playbackModes = [
    { label: "PLAY", symbol: "▶", color: "#00ff00" },
    { label: "PAUSE", symbol: "⏸", color: "#ffff00" },
    { label: "STOP", symbol: "■", color: "#ffffff" },
    { label: "REC", symbol: "●", color: "#ff0000" },
  ] as const;

  const currentMode = playbackModes.find((m) => m.label === playbackMode) ?? playbackModes[0];

  return (
    <div
      className="min-h-screen font-mono"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      <style>{`
        @keyframes vhs-color-shift {
          0%, 100% { text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff; }
          33%       { text-shadow: -4px 0 #ff00ff, 2px 0 #00ffff; }
          66%       { text-shadow: -2px 0 #ff00ff, 4px 0 #00ffff; }
        }
        @keyframes vhs-blink {
          0%, 49%  { opacity: 1; }
          50%, 100%{ opacity: 0; }
        }
        @keyframes vhs-noise {
          0%, 100% { opacity: 0.03; }
          50%      { opacity: 0.07; }
        }
        @keyframes vhs-tracking {
          0%   { transform: translateX(0) skewX(0deg); }
          10%  { transform: translateX(-2px) skewX(-0.5deg); }
          20%  { transform: translateX(3px) skewX(0.3deg); }
          30%  { transform: translateX(-1px) skewX(-0.2deg); }
          40%  { transform: translateX(0) skewX(0deg); }
          100% { transform: translateX(0) skewX(0deg); }
        }
        @keyframes vhs-counter-flicker {
          0%, 95%, 100% { opacity: 1; }
          96%           { opacity: 0.4; }
          97%           { opacity: 1; }
          98%           { opacity: 0.6; }
          99%           { opacity: 1; }
        }
        @keyframes vhs-scanline-move {
          0%   { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        .vhs-aberration-title {
          animation: vhs-color-shift 3s ease-in-out infinite;
        }
        .vhs-blink {
          animation: vhs-blink 1s step-end infinite;
        }
        .vhs-counter {
          animation: vhs-counter-flicker 8s ease-in-out infinite;
        }
        .vhs-tracking-hover:hover {
          animation: vhs-tracking 0.4s ease-out forwards;
        }
        .vhs-noise {
          animation: vhs-noise 3s ease-in-out infinite;
        }
        .vhs-scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,0,255,0.03) 2px,
            rgba(255,0,255,0.03) 4px
          );
        }
      `}</style>

      {/* Global scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 vhs-scanlines"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Noise grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 vhs-noise"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1. NAV                                                           */}
      {/* ---------------------------------------------------------------- */}
      <nav
        className="sticky top-0 z-50 px-6 md:px-10 py-3 flex justify-between items-center border-b"
        style={{
          backgroundColor: "rgba(0,0,0,0.97)",
          borderBottomColor: "rgba(255,0,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Left: brand */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <RecIndicator />
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#ff00ff]/20" />
          <span
            className="hidden sm:block font-mono text-sm uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            VHS-AESTHETIC
          </span>
        </div>

        {/* Center: timestamp */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span
            className="font-mono text-xs tracking-[0.2em] uppercase vhs-counter"
            style={{ color: "#ffff00" }}
          >
            1989.08.24 PM 11:42
          </span>
        </div>

        {/* Right: link */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest transition-all duration-200 hover:opacity-70"
          style={{ color: "#00ffff" }}
        >
          StyleKit →
        </Link>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. HERO                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 overflow-hidden"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Scanline hero overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.03) 2px,rgba(255,0,255,0.03) 4px)",
          }}
        />

        {/* Deep purple ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(26,10,46,0.8) 0%, transparent 100%)",
          }}
        />

        {/* Corner timestamp badges */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
          <TimestampBadge text="CH-03" />
          <TimestampBadge text="SP MODE" />
        </div>
        <div className="absolute top-8 right-8">
          <TimestampBadge text={formatCounter(counter)} />
        </div>

        {/* Main content */}
        <div
          ref={heroRef}
          className="relative z-10 text-center max-w-5xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Play indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span
              className="font-mono text-xs uppercase tracking-[0.4em]"
              style={{ color: "#00ff00" }}
            >
              ▶ PLAY
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

          {/* Main title */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-bold uppercase tracking-widest leading-none mb-6 vhs-aberration-title"
            style={{ color: "#ffffff" }}
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
            ◀ REWIND TO THE FUTURE ▶
          </p>

          {/* Tape counter visualization */}
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
              background: "linear-gradient(90deg, transparent, rgba(255,0,255,0.5), transparent)",
            }}
          />
          <div
            className="w-full h-px mb-10"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent)",
            }}
          />

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="px-8 py-3 font-mono text-sm uppercase tracking-widest border-2 transition-all duration-200"
              style={{
                color: "#ff00ff",
                borderColor: "#ff00ff",
                backgroundColor: "rgba(255,0,255,0.15)",
                boxShadow: "0 0 20px rgba(255,0,255,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 30px rgba(255,0,255,0.6), 0 0 60px rgba(255,0,255,0.2)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,0,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 20px rgba(255,0,255,0.3)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(255,0,255,0.15)";
              }}
            >
              ▶ PRESS PLAY
            </button>
            <button
              className="px-8 py-3 font-mono text-sm uppercase tracking-widest border-2 transition-all duration-200"
              style={{
                color: "#00ffff",
                borderColor: "rgba(0,255,255,0.4)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#00ffff";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 20px rgba(0,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(0,255,255,0.4)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              ◀◀ REWIND
            </button>
          </div>
        </div>

        {/* Bottom tape reel decoration */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,0,255,0.3)" }}>
            VHS-C FORMAT
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(0,255,255,0.3)" }}>
            T-120 / 6HRS EP
          </span>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. COMPONENTS DEMO                                               */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Components</SectionLabel>
            <SectionHeading>PLAYBACK CONTROLS</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Interactive UI components rendered in full VHS aesthetic. Select a
              playback mode to observe state-driven color changes.
            </p>
          </RevealBlock>

          {/* Mode switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {playbackModes.map((mode) => (
                <PlaybackModeTab
                  key={mode.label}
                  mode={mode}
                  active={playbackMode === mode.label}
                  onClick={() => setPlaybackMode(mode.label)}
                />
              ))}
            </div>

            {/* Active mode display */}
            <ScanlineCard className="p-6 mb-8" label="ACTIVE MODE">
              <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span
                    className="font-mono text-5xl font-bold uppercase tracking-widest"
                    style={{
                      color: currentMode.color,
                      textShadow: `0 0 20px ${currentMode.color}80`,
                    }}
                  >
                    {currentMode.symbol} {playbackMode}
                  </span>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs text-right">
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>
                    COUNTER: <span style={{ color: "#ffff00" }}>{formatCounter(counter)}</span>
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>
                    TAPE: <span style={{ color: "#00ffff" }}>A-SIDE 1</span>
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>
                    FORMAT: <span style={{ color: "#00ff00" }}>SP MODE</span>
                  </span>
                </div>
              </div>
            </ScanlineCard>
          </RevealBlock>

          {/* Button variants grid */}
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Button variants */}
              <ScanlineCard className="p-6" label="Button Variants">
                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    className="px-5 py-2.5 font-mono text-xs uppercase tracking-widest border-2 transition-all duration-200"
                    style={{
                      color: "#ff00ff",
                      borderColor: "#ff00ff",
                      backgroundColor: "rgba(255,0,255,0.2)",
                      boxShadow: "0 0 15px rgba(255,0,255,0.4)",
                    }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-5 py-2.5 font-mono text-xs uppercase tracking-widest border-2 transition-all duration-200 hover:border-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                    style={{
                      color: "#00ffff",
                      borderColor: "rgba(0,255,255,0.4)",
                      backgroundColor: "transparent",
                    }}
                  >
                    Secondary
                  </button>
                  <button
                    className="px-5 py-2.5 font-mono text-xs uppercase tracking-widest border-2 transition-all duration-200 hover:border-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.4)]"
                    style={{
                      color: "#ffff00",
                      borderColor: "rgba(255,255,0,0.4)",
                      backgroundColor: "transparent",
                    }}
                  >
                    Warning
                  </button>
                  <button
                    className="px-5 py-2.5 font-mono text-xs uppercase tracking-widest border-2 transition-all duration-200 hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                    style={{
                      color: "rgb(239,68,68)",
                      borderColor: "rgba(239,68,68,0.4)",
                      backgroundColor: "transparent",
                    }}
                  >
                    ■ Stop
                  </button>
                </div>
              </ScanlineCard>

              {/* VHS-style card with RGB shadow */}
              <ScanlineCard className="p-6" label="VHS Card" glowColor="rgba(0,255,255,0.2)">
                <div className="pt-4">
                  <h3
                    className="font-mono text-xl font-bold uppercase tracking-widest mb-2"
                    style={{ textShadow: "-3px 0 #ff00ff, 3px 0 #00ffff", color: "#ffffff" }}
                  >
                    TAPE ARCHIVE
                  </h3>
                  <p className="font-mono text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Section description displayed in low-contrast mono. Supports up to three lines of content before overflow.
                  </p>
                  <div
                    className="border-t pt-3 flex justify-between items-center"
                    style={{ borderTopColor: "rgba(255,0,255,0.15)" }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,0,0.6)" }}>
                      RECORDED 1989
                    </span>
                    <span className="font-mono text-xs" style={{ color: "#00ffff" }}>
                      ▶ VIEW
                    </span>
                  </div>
                </div>
              </ScanlineCard>
            </div>
          </RevealBlock>

          {/* Terminal input */}
          <RevealBlock delay={0.2}>
            <ScanlineCard className="p-6" label="Terminal Input">
              <div className="pt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "#00ffff" }}>
                    TAPE LABEL
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 font-mono text-sm transition-all duration-200 focus:outline-none"
                    placeholder="ENTER TITLE..."
                    style={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      border: "1px solid rgba(0,255,255,0.3)",
                      color: "#00ffff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00ffff";
                      e.currentTarget.style.boxShadow = "0 0 10px rgba(0,255,255,0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "#ff00ff" }}>
                    SEARCH ARCHIVE
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 font-mono text-sm transition-all duration-200 focus:outline-none"
                    placeholder="SEARCH TAPES..."
                    style={{
                      backgroundColor: "rgba(0,0,0,0.7)",
                      border: "1px solid rgba(255,0,255,0.3)",
                      color: "#ff00ff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#ff00ff";
                      e.currentTarget.style.boxShadow = "0 0 10px rgba(255,0,255,0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,0,255,0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </ScanlineCard>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. COLOR SYSTEM                                                  */}
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
              Each carries a specific semantic role in the system.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vhsPalette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div
                  className="relative border p-6 overflow-hidden transition-all duration-300 group"
                  style={{
                    borderColor: `${color.hex}30`,
                    backgroundColor: "rgba(26,10,46,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = color.hex;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${color.glow}, inset 0 0 20px ${color.glow.replace("0.5", "0.05")}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color.hex}30`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Scanline overlay */}
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
                      style={{ color: color.hex, textShadow: `0 0 10px ${color.glow}` }}
                    >
                      {color.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
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
      {/* 5. VHS EFFECTS DEMO                                              */}
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
              <RevealBlock key={effect.name} delay={i * 0.1}>
                <div
                  className="border p-6 h-full transition-all duration-300"
                  style={{
                    borderColor: `${effect.color}25`,
                    backgroundColor: "rgba(26,10,46,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${effect.color}60`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 15px ${effect.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${effect.color}25`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-[0.25em] mb-3"
                    style={{ color: effect.color, textShadow: `0 0 8px ${effect.color}60` }}
                  >
                    {effect.name}
                  </p>
                  <pre
                    className="font-mono text-[11px] leading-relaxed p-3 mb-4 overflow-x-auto"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.6)",
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

          {/* Live demonstrations */}
          <RevealBlock delay={0.2}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
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
                <p className="relative font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(255,0,255,0.5)" }}>
                  SCANLINES
                </p>
                <p className="relative font-mono text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Horizontal bands at 4px interval. Opacity tuned to 0.03–0.06 for subtlety.
                </p>
              </div>

              {/* Chromatic aberration demo */}
              <div
                className="border p-6"
                style={{
                  borderColor: "rgba(0,255,255,0.2)",
                  backgroundColor: "#1a0a2e",
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(0,255,255,0.5)" }}>
                  ABERRATION
                </p>
                <p
                  className="font-mono text-2xl font-bold uppercase tracking-wider"
                  style={{ textShadow: "-3px 0 #ff00ff, 3px 0 #00ffff", color: "#ffffff" }}
                >
                  SIGNAL
                </p>
                <p className="font-mono text-[10px] mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  -3px magenta + 3px cyan offset
                </p>
              </div>

              {/* Tracking + REC demo */}
              <div
                className="border p-6"
                style={{
                  borderColor: "rgba(255,0,0,0.2)",
                  backgroundColor: "#1a0a2e",
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(255,0,0,0.5)" }}>
                  REC INDICATOR
                </p>
                <RecIndicator />
                <div className="mt-4">
                  <p
                    className="font-mono text-sm vhs-tracking-hover cursor-default"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Hover for tracking distortion effect on this text element.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. TYPOGRAPHY RULES                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#0a0015" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Typography</SectionLabel>
            <SectionHeading>TYPE SYSTEM</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Monospace is the only typeface. Every text element uses
              font-mono, uppercase transformation, and expanded tracking.
            </p>
          </RevealBlock>

          <div className="space-y-3">
            {typographySamples.map((sample, i) => (
              <RevealBlock key={sample.label} delay={i * 0.06}>
                <div
                  className="border p-5 transition-all duration-300 group"
                  style={{
                    borderColor: "rgba(255,0,255,0.12)",
                    backgroundColor: "rgba(26,10,46,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,0,255,0.35)";
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(26,10,46,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,0,255,0.12)";
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(26,10,46,0.4)";
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 items-center">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(255,0,255,0.5)" }}
                    >
                      {sample.label}
                    </span>
                    <span className={sample.className} style={sample.style}>
                      {sample.sample}
                    </span>
                    <span
                      className="font-mono text-[10px] leading-relaxed text-right hidden md:block max-w-[200px]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {sample.desc}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Rules</SectionLabel>
            <SectionHeading>DO / DON'T</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Hard constraints that maintain authentic VHS signal integrity.
              Violating these collapses the aesthetic into generic dark mode.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO column */}
            <RevealBlock delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: "#00ff00", textShadow: "0 0 8px rgba(0,255,0,0.6)" }}
                  >
                    ✓ DO
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,255,0,0.2)" }} />
                </div>
                <div className="space-y-3">
                  {doRules.map((rule, i) => (
                    <div
                      key={i}
                      className="border-l-4 p-4"
                      style={{
                        borderLeftColor: "#ff00ff",
                        backgroundColor: "rgba(26,10,46,0.8)",
                      }}
                    >
                      <p className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: "rgb(239,68,68)", textShadow: "0 0 8px rgba(255,0,0,0.4)" }}
                  >
                    ✗ DON'T
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(239,68,68,0.2)" }} />
                </div>
                <div className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <div
                      key={i}
                      className="border-l-4 p-4"
                      style={{
                        borderLeftColor: "rgba(239,68,68,0.4)",
                        backgroundColor: "rgba(26,10,46,0.4)",
                      }}
                    >
                      <p className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
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
      {/* 8. TAPE COLLECTION GRID                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="px-6 md:px-10 py-20"
        style={{ backgroundColor: "#0a0015" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Tape Collection</SectionLabel>
            <SectionHeading>THE ARCHIVE</SectionHeading>
            <p
              className="font-mono text-sm leading-relaxed mb-12 max-w-xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              VHS case cards representing the tape library. Each card includes
              scanline overlay, neon border, and tracking distortion on hover.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tapeCollection.map((tape, i) => (
              <RevealBlock key={tape.title} delay={i * 0.07}>
                <div
                  className="relative border overflow-hidden cursor-pointer transition-all duration-300 vhs-tracking-hover"
                  style={{
                    borderColor: `${tape.color}30`,
                    backgroundColor: "rgba(26,10,46,0.7)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = tape.color;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px ${tape.glow}, inset 0 0 25px ${tape.glow.replace("0.4", "0.05")}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${tape.color}30`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,255,0.03) 2px,rgba(255,0,255,0.03) 4px)",
                    }}
                  />

                  {/* Top color band */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      backgroundColor: tape.color,
                      boxShadow: `0 0 10px ${tape.glow}`,
                    }}
                  />

                  <div className="relative z-20 p-5">
                    {/* Side indicator */}
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-0.5 border"
                        style={{
                          color: tape.color,
                          borderColor: `${tape.color}40`,
                          backgroundColor: `${tape.color}10`,
                        }}
                      >
                        SIDE {tape.side}
                      </span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: "rgba(255,255,0,0.5)" }}
                      >
                        {tape.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-mono text-lg font-bold uppercase tracking-wider mb-1 leading-tight"
                      style={{
                        color: tape.color,
                        textShadow: `0 0 12px ${tape.glow}`,
                      }}
                    >
                      {tape.title}
                    </h3>

                    {/* Genre */}
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] mb-5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {tape.genre}
                    </p>

                    {/* Footer row */}
                    <div
                      className="flex justify-between items-center border-t pt-3"
                      style={{ borderTopColor: `${tape.color}15` }}
                    >
                      <span
                        className="font-mono text-[10px] uppercase tracking-wider"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Duration
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
      {/* 9. FOOTER                                                        */}
      {/* ---------------------------------------------------------------- */}
      <footer
        className="border-t px-6 md:px-10 py-12"
        style={{
          backgroundColor: "#000000",
          borderTopColor: "rgba(255,0,255,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Stop button style header */}
          <div className="flex flex-wrap justify-between items-start gap-8 mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="font-mono text-lg font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  ■ STOP
                </span>
                <div className="w-px h-5" style={{ backgroundColor: "rgba(255,0,255,0.3)" }} />
                <span
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{ color: "rgba(255,0,255,0.7)", textShadow: "0 0 10px rgba(255,0,255,0.4)" }}
                >
                  VHS AESTHETIC
                </span>
              </div>
              <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                A StyleKit design language — magnetic tape era, digitized.
              </p>
            </div>

            {/* Cassette stats */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
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

          {/* Bottom bar */}
          <div
            className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t"
            style={{ borderTopColor: "rgba(255,0,255,0.1)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 1989–{new Date().getFullYear()} STYLEKIT — VHS AESTHETIC DESIGN SYSTEM
            </p>

            <div className="flex gap-6">
              <Link
                href="/styles/vhs-aesthetic"
                className="font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-200"
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
                Documentation
              </Link>
              <Link
                href="/styles"
                className="font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-200"
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
