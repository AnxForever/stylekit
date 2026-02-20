"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline hooks — no @/components/showcase imports
// ---------------------------------------------------------------------------

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
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

// ---------------------------------------------------------------------------
// Local sub-components
// ---------------------------------------------------------------------------

function ScanlineOverlay() {
  return (
    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)] pointer-events-none" />
  );
}

function NeonDot({ color = "#39ff14" }: { color?: string }) {
  return (
    <div
      className="w-2 h-2 shrink-0"
      style={{
        background: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}60`,
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#39ff14]/60 mb-6">
      {"// "}{children}
    </p>
  );
}

function NeonBar({ value, color }: { value: number; color: string }) {
  const glowMap: Record<string, string> = {
    "#39ff14": "rgba(57,255,20,0.7)",
    "#00ffff": "rgba(0,255,255,0.7)",
    "#ff00ff": "rgba(255,0,255,0.7)",
    "#ff2a2a": "rgba(255,42,42,0.7)",
    "#FFFF00": "rgba(255,255,0,0.7)",
    "#ff8533": "rgba(255,133,51,0.7)",
  };
  return (
    <div className="w-full h-2 bg-black border border-[#39ff14]/20 overflow-hidden">
      <div
        className="h-full transition-all duration-700"
        style={{
          width: `${value}%`,
          background: color,
          boxShadow: `0 0 8px ${glowMap[color] ?? color}`,
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ArcadeCrtShowcaseContent() {
  // Hero reveal
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Interactive state — credits counter
  const [credits, setCredits] = useState(0);

  // Interactive state — active game tab
  const [activeGame, setActiveGame] = useState(0);

  // Interactive state — active color in palette
  const [activeColor, setActiveColor] = useState(0);

  // Blinking cursor
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // useInView hooks — destructured immediately (React Compiler rule)
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: highScoreRef, inView: highScoreInView } = useInView();
  const { ref: paletteRef, inView: paletteInView } = useInView();
  const { ref: typographyRef, inView: typographyInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

  const games = [
    {
      id: 0,
      title: "PIXEL BLASTER",
      genre: "SHOOT EM UP",
      color: "#39ff14",
      score: "999,999",
      desc: "Twin-stick shooter with neon bullet patterns. Dodge, weave, and blast your way to the top of the leaderboard.",
      difficulty: 88,
      speed: 95,
      power: 72,
    },
    {
      id: 1,
      title: "NEON DRIFT",
      genre: "RACING",
      color: "#00ffff",
      score: "512,400",
      desc: "High-speed neon highway racer. Perfect your drift angles on glowing asphalt and outrun the ghost cars.",
      difficulty: 65,
      speed: 99,
      power: 58,
    },
    {
      id: 2,
      title: "CYBER QUEST",
      genre: "RPG",
      color: "#ff00ff",
      score: "1,280,000",
      desc: "Hack into the megacity mainframe. Collect crypto-shards and defeat the corporate AI overlord.",
      difficulty: 76,
      speed: 42,
      power: 91,
    },
    {
      id: 3,
      title: "GRID FIGHTER",
      genre: "FIGHTING",
      color: "#FFFF00",
      score: "750,300",
      desc: "1v1 combat on electric grid arenas. Master the combo system and defeat 12 pixel warriors.",
      difficulty: 82,
      speed: 78,
      power: 85,
    },
  ];

  const highScores = [
    { rank: 1, name: "ACE", score: "1,280,000", color: "#FFFF00" },
    { rank: 2, name: "ZRO", score: "999,999", color: "#39ff14" },
    { rank: 3, name: "CYB", score: "750,300", color: "#00ffff" },
    { rank: 4, name: "NEO", score: "512,400", color: "#ff00ff" },
    { rank: 5, name: "RYU", score: "488,100", color: "#ff8533" },
    { rank: 6, name: "KAI", score: "401,700", color: "#39ff14" },
    { rank: 7, name: "NXS", score: "355,200", color: "#00ffff" },
    { rank: 8, name: "XOR", score: "298,800", color: "#ff2a2a" },
  ];

  const palette = [
    { name: "Neon Green", hex: "#39ff14", glow: "rgba(57,255,20,0.6)", label: "PRIMARY" },
    { name: "Magenta", hex: "#ff00ff", glow: "rgba(255,0,255,0.6)", label: "ACCENT 1" },
    { name: "Cyan", hex: "#00ffff", glow: "rgba(0,255,255,0.6)", label: "ACCENT 2" },
    { name: "Red", hex: "#ff2a2a", glow: "rgba(255,42,42,0.6)", label: "ACCENT 3" },
    { name: "Yellow", hex: "#FFFF00", glow: "rgba(255,255,0,0.6)", label: "ACCENT 4" },
    { name: "Orange", hex: "#ff8533", glow: "rgba(255,133,51,0.6)", label: "ACCENT 5" },
    { name: "Near Black", hex: "#050505", glow: "rgba(57,255,20,0.1)", label: "BG" },
    { name: "Surface", hex: "#0a0a0a", glow: "rgba(57,255,20,0.1)", label: "SURFACE" },
  ];

  const selectedGame = games[activeGame];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#050505] text-[#39ff14] font-mono">
      <style jsx global>{`
        @keyframes rgb-shift {
          0%, 100% { text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff; }
          50%       { text-shadow: -4px 0 #ff00ff, 4px 0 #00ffff; }
        }
        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.85; }
        }
        @keyframes crt-scanmove {
          0%   { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes blink-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes neon-pulse-green {
          0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.3); }
          50%       { box-shadow: 0 0 30px rgba(57,255,20,0.8), 0 0 60px rgba(57,255,20,0.5); }
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* NAV                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <nav className="sticky top-0 z-50 bg-[#050505]/95 border-b-2 border-[#39ff14]/30 backdrop-blur-sm px-6 md:px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left — logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/styles/arcade-crt"
              className="text-[#39ff14] font-mono text-sm uppercase tracking-[0.15em] hover:text-[#39ff14]/70 transition-colors"
              style={{ textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14" }}
            >
              ARCADE CRT
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <NeonDot />
              <span className="text-[#39ff14]/40 font-mono text-[10px] uppercase tracking-[0.2em]">
                CRT-9000
              </span>
            </div>
          </div>

          {/* Right — links + credits */}
          <div className="flex items-center gap-6">
            <Link
              href="/styles/arcade-crt"
              className="hidden sm:block text-[#00ffff] font-mono text-[10px] uppercase tracking-[0.2em] hover:text-[#00ffff]/70 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="text-[#39ff14]/60 font-mono text-[10px] uppercase tracking-[0.2em] hover:text-[#39ff14] transition-colors"
            >
              StyleKit
            </Link>
            <div className="flex items-center gap-2 border border-[#FFFF00]/40 px-3 py-1">
              <span className="text-[#FFFF00] font-mono text-[10px] uppercase tracking-[0.2em]">
                CREDIT: {String(credits).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative px-6 md:px-10 pt-20 pb-24 overflow-hidden">
        <ScanlineOverlay />
        {/* CRT vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* Pre-title label */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <p className="font-mono text-[#00ffff] text-xs uppercase tracking-[0.4em] mb-6">
              {">> INSERT COIN TO START"}
              <span
                className="inline-block w-2 h-4 bg-[#00ffff] ml-1 align-middle"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            </p>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold uppercase tracking-wider leading-none mb-2"
              style={{
                color: "#39ff14",
                animation: "rgb-shift 2.5s ease-in-out infinite",
              }}
            >
              ARCADE
            </h1>
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold uppercase tracking-wider leading-none mb-8"
              style={{
                color: "#39ff14",
                animation: "rgb-shift 2.5s ease-in-out infinite 0.3s",
              }}
            >
              CRT
            </h1>
          </div>

          {/* Sub-title + CTA row */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <p className="font-mono text-[#39ff14]/60 text-sm max-w-lg leading-relaxed mb-10">
              80-90s arcade CRT monitor nostalgia. Scanline overlays, neon
              phosphor glow, RGB chromatic aberration, monospace pixel fonts,
              near-black backgrounds.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCredits((c) => c + 1)}
                className="px-8 py-4 bg-[#39ff14] text-black font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#39ff14] transition-all duration-200"
                style={{ animation: "neon-pulse-green 2s ease-in-out infinite" }}
              >
                INSERT COIN
              </button>
              <button className="px-8 py-4 bg-transparent text-[#00ffff] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-[#00ffff]/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-200">
                PLAYER SELECT
              </button>
            </div>
          </div>

          {/* Score display */}
          <div
            className="mt-12 flex flex-wrap gap-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.7s ease 0.65s",
            }}
          >
            {[
              { label: "HI-SCORE", value: "1,280,000", color: "#FFFF00" },
              { label: "SCORE", value: "999,999", color: "#39ff14" },
              { label: "STAGE", value: "08", color: "#00ffff" },
              { label: "LIVES", value: "03", color: "#ff2a2a" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40 mb-1">
                  {item.label}
                </p>
                <p
                  className="font-mono text-xl font-bold"
                  style={{
                    color: item.color,
                    textShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}`,
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GAME SELECT / INTERACTIVE TAB                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Game Select</SectionLabel>

          {/* Tab row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {games.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setActiveGame(i)}
                className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] border-2 transition-all duration-200"
                style={
                  activeGame === i
                    ? {
                        color: g.color,
                        borderColor: g.color,
                        background: `${g.color}18`,
                        boxShadow: `0 0 20px ${g.color}40`,
                      }
                    : {
                        color: "#39ff14",
                        borderColor: "rgba(57,255,20,0.2)",
                        background: "transparent",
                      }
                }
              >
                {g.title}
              </button>
            ))}
          </div>

          {/* Selected game panel */}
          <div className="relative bg-[#0a0a0a] border-2 overflow-hidden transition-all duration-200 p-6"
            style={{
              borderColor: `${selectedGame.color}50`,
              boxShadow: `0 0 40px ${selectedGame.color}20`,
            }}
          >
            <ScanlineOverlay />
            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left — game info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <NeonDot color={selectedGame.color} />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: selectedGame.color }}
                  >
                    {selectedGame.genre}
                  </span>
                </div>
                <h2
                  className="font-mono font-bold text-3xl md:text-4xl uppercase tracking-wider mb-4"
                  style={{
                    color: selectedGame.color,
                    textShadow: `-3px 0 #ff00ff, 3px 0 #00ffff`,
                  }}
                >
                  {selectedGame.title}
                </h2>
                <p className="font-mono text-sm text-[#39ff14]/60 leading-relaxed mb-6">
                  {selectedGame.desc}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40">
                    Hi-Score:
                  </span>
                  <span
                    className="font-mono text-lg font-bold"
                    style={{
                      color: "#FFFF00",
                      textShadow: "0 0 10px #FFFF00, 0 0 20px #FFFF00",
                    }}
                  >
                    {selectedGame.score}
                  </span>
                </div>
              </div>

              {/* Right — stats bars */}
              <div className="space-y-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40 mb-4">
                  Stats
                </p>
                {[
                  { label: "DIFFICULTY", value: selectedGame.difficulty, color: "#ff2a2a" },
                  { label: "SPEED", value: selectedGame.speed, color: "#00ffff" },
                  { label: "POWER", value: selectedGame.power, color: selectedGame.color },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/50">
                        {stat.label}
                      </span>
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <NeonBar value={stat.value} color={stat.color} />
                  </div>
                ))}
                <div className="pt-4">
                  <button
                    className="w-full py-3 font-mono text-xs uppercase tracking-[0.2em] border-2 transition-all duration-200"
                    style={{
                      color: selectedGame.color,
                      borderColor: selectedGame.color,
                      boxShadow: `0 0 15px ${selectedGame.color}30`,
                    }}
                  >
                    START GAME
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HIGH SCORE LEADERBOARD                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-10 pb-20" ref={highScoreRef}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock inView={highScoreInView} delay={0}>
            <SectionLabel>High Score Board</SectionLabel>
          </RevealBlock>

          <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 overflow-hidden">
            <ScanlineOverlay />

            {/* Header row */}
            <div className="relative border-b-2 border-[#39ff14]/20 px-6 py-4 grid grid-cols-12 gap-4">
              <span className="col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40">
                RNK
              </span>
              <span className="col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40">
                NAME
              </span>
              <span className="col-span-7 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40">
                SCORE
              </span>
            </div>

            {/* Score rows */}
            {highScores.map((entry, i) => (
              <RevealBlock key={entry.rank} inView={highScoreInView} delay={i * 0.06}>
                <div
                  className="relative border-b border-[#39ff14]/10 last:border-b-0 px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-[#39ff14]/5 transition-colors"
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center gap-2">
                    {entry.rank <= 3 ? (
                      <span
                        className="font-mono font-bold text-sm"
                        style={{
                          color: entry.rank === 1 ? "#FFFF00" : entry.rank === 2 ? "#39ff14" : "#00ffff",
                          textShadow: `0 0 10px ${entry.rank === 1 ? "#FFFF00" : entry.rank === 2 ? "#39ff14" : "#00ffff"}`,
                        }}
                      >
                        {String(entry.rank).padStart(2, "0")}
                      </span>
                    ) : (
                      <span className="font-mono text-sm text-[#39ff14]/30">
                        {String(entry.rank).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="col-span-4 flex items-center gap-3">
                    <NeonDot color={entry.color} />
                    <span
                      className="font-mono font-bold text-lg uppercase tracking-[0.3em]"
                      style={{
                        color: entry.color,
                        textShadow: `0 0 8px ${entry.color}`,
                      }}
                    >
                      {entry.name}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="col-span-7 text-right">
                    <span
                      className="font-mono font-bold text-lg tracking-wider"
                      style={{
                        color: entry.rank === 1 ? "#FFFF00" : "#39ff14",
                        textShadow:
                          entry.rank === 1
                            ? "0 0 10px #FFFF00, 0 0 20px #FFFF00"
                            : "0 0 8px #39ff14",
                      }}
                    >
                      {entry.score}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}

            {/* Footer */}
            <div className="relative border-t-2 border-[#39ff14]/20 px-6 py-3 flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/30">
                {"Today's Records"}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2"
                  style={{
                    background: "#39ff14",
                    boxShadow: "0 0 8px rgba(57,255,20,0.8)",
                    animation: "neon-flicker 3s ease-in-out infinite",
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40">
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMPONENTS DEMO                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-10 pb-20" ref={componentsRef}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock inView={componentsInView} delay={0}>
            <SectionLabel>Components</SectionLabel>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buttons */}
            <RevealBlock inView={componentsInView} delay={0.05}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 overflow-hidden hover:border-[#39ff14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-all duration-200">
                <ScanlineOverlay />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <NeonDot />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]">
                      Buttons
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-2.5 bg-[#39ff14] text-black font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] transition-all duration-200">
                      Start
                    </button>
                    <button className="px-5 py-2.5 bg-transparent text-[#ff00ff] font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:bg-[#ff00ff]/10 hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] transition-all duration-200">
                      Player 2
                    </button>
                    <button className="px-5 py-2.5 bg-transparent text-[#00ffff] font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-[#00ffff]/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-200">
                      Options
                    </button>
                    <button className="px-5 py-2.5 bg-transparent text-[#ff2a2a] font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#ff2a2a] shadow-[0_0_15px_rgba(255,42,42,0.3)] hover:bg-[#ff2a2a]/10 hover:shadow-[0_0_30px_rgba(255,42,42,0.5)] transition-all duration-200">
                      Quit
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Inputs */}
            <RevealBlock inView={componentsInView} delay={0.1}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 overflow-hidden hover:border-[#39ff14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-all duration-200">
                <ScanlineOverlay />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <NeonDot color="#00ffff" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00ffff]">
                      Terminal Input
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14] mb-2">
                        Player Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-black border-2 border-[#39ff14]/40 text-[#39ff14] font-mono text-sm placeholder:text-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-200"
                        placeholder="AAA"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#00ffff] mb-2">
                        Access Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-black border-2 border-[#00ffff]/40 text-[#00ffff] font-mono text-sm placeholder:text-[#00ffff]/30 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-200"
                        placeholder="ENTER CODE..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Cards */}
            <RevealBlock inView={componentsInView} delay={0.15}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 overflow-hidden hover:border-[#39ff14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-all duration-200">
                <ScanlineOverlay />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <NeonDot color="#ff00ff" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff00ff]">
                      Card Component
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: "PIXEL BLASTER", sub: "999,999 pts", color: "#39ff14" },
                      { title: "NEON DRIFT", sub: "512,400 pts", color: "#00ffff" },
                      { title: "GRID FIGHTER", sub: "750,300 pts", color: "#FFFF00" },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="flex items-center justify-between border border-[#39ff14]/10 px-4 py-3 hover:border-[#39ff14]/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <NeonDot color={card.color} />
                          <span
                            className="font-mono text-xs uppercase tracking-[0.1em]"
                            style={{ color: card.color }}
                          >
                            {card.title}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#FFFF00]/80">
                          {card.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Alerts / Status */}
            <RevealBlock inView={componentsInView} delay={0.2}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 overflow-hidden hover:border-[#39ff14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-all duration-200">
                <ScanlineOverlay />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <NeonDot color="#ff2a2a" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff2a2a]">
                      System Alerts
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 border-l-2 border-[#39ff14] pl-3 py-1">
                      <span className="font-mono text-[10px] text-[#39ff14] uppercase tracking-[0.1em] shrink-0">
                        [OK]
                      </span>
                      <span className="font-mono text-xs text-[#39ff14]/70">
                        CRT display online — phosphor warm-up complete
                      </span>
                    </div>
                    <div className="flex items-start gap-3 border-l-2 border-[#FFFF00] pl-3 py-1">
                      <span className="font-mono text-[10px] text-[#FFFF00] uppercase tracking-[0.1em] shrink-0">
                        [WRN]
                      </span>
                      <span className="font-mono text-xs text-[#FFFF00]/70">
                        Coin mechanism check — low credits
                      </span>
                    </div>
                    <div className="flex items-start gap-3 border-l-2 border-[#ff2a2a] pl-3 py-1">
                      <span className="font-mono text-[10px] text-[#ff2a2a] uppercase tracking-[0.1em] shrink-0">
                        [ERR]
                      </span>
                      <span className="font-mono text-xs text-[#ff2a2a]/70">
                        Player 2 controller disconnected
                      </span>
                    </div>
                    <div className="flex items-start gap-3 border-l-2 border-[#00ffff] pl-3 py-1">
                      <span className="font-mono text-[10px] text-[#00ffff] uppercase tracking-[0.1em] shrink-0">
                        [INF]
                      </span>
                      <span className="font-mono text-xs text-[#00ffff]/70">
                        Audio subsystem initialized — ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COLOR PALETTE                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-10 pb-20" ref={paletteRef}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock inView={paletteInView} delay={0}>
            <SectionLabel>Color System</SectionLabel>
          </RevealBlock>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {palette.map((c, i) => (
              <RevealBlock key={c.hex} inView={paletteInView} delay={i * 0.05}>
                <button
                  onClick={() => setActiveColor(i)}
                  className="w-full text-left group transition-all duration-200"
                >
                  {/* Swatch */}
                  <div
                    className="w-full aspect-square border-2 transition-all duration-200"
                    style={{
                      background: c.hex,
                      borderColor: activeColor === i ? c.hex : "rgba(57,255,20,0.15)",
                      boxShadow:
                        activeColor === i
                          ? `0 0 20px ${c.glow}, 0 0 40px ${c.glow}`
                          : "none",
                    }}
                  />
                  {/* Meta */}
                  <div className="pt-2">
                    <p
                      className="font-mono text-[9px] uppercase tracking-[0.2em] mb-0.5"
                      style={{ color: activeColor === i ? c.hex : "#39ff14" }}
                    >
                      {c.label}
                    </p>
                    <p className="font-mono text-[9px] text-[#39ff14]/30">{c.hex}</p>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Selected color info */}
          <RevealBlock inView={paletteInView} delay={0.5}>
            <div
              className="mt-6 relative bg-[#0a0a0a] border-2 p-6 overflow-hidden transition-all duration-300"
              style={{
                borderColor: `${palette[activeColor].hex}50`,
                boxShadow: `0 0 30px ${palette[activeColor].glow}`,
              }}
            >
              <ScanlineOverlay />
              <div className="relative flex flex-wrap items-center gap-6">
                <div
                  className="w-16 h-16 border-2 shrink-0"
                  style={{
                    background: palette[activeColor].hex,
                    borderColor: palette[activeColor].hex,
                    boxShadow: `0 0 20px ${palette[activeColor].glow}`,
                  }}
                />
                <div>
                  <p
                    className="font-mono font-bold text-2xl uppercase tracking-[0.2em] mb-1"
                    style={{
                      color: palette[activeColor].hex,
                      textShadow: `0 0 15px ${palette[activeColor].hex}`,
                    }}
                  >
                    {palette[activeColor].name}
                  </p>
                  <p className="font-mono text-sm text-[#39ff14]/40">
                    {palette[activeColor].hex} &mdash; {palette[activeColor].label}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TYPOGRAPHY / EFFECTS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-10 pb-20" ref={typographyRef}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock inView={typographyInView} delay={0}>
            <SectionLabel>Typography & Effects</SectionLabel>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* RGB Aberration */}
            <RevealBlock inView={typographyInView} delay={0.05}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-8 overflow-hidden">
                <ScanlineOverlay />
                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40 mb-6">
                    RGB Chromatic Aberration
                  </p>
                  <h2
                    className="font-mono font-bold text-4xl uppercase tracking-wider mb-3"
                    style={{ textShadow: "-3px 0 #ff00ff, 3px 0 #00ffff" }}
                  >
                    HEADING L
                  </h2>
                  <h3
                    className="font-mono font-bold text-2xl uppercase tracking-wider mb-3"
                    style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
                  >
                    Heading M
                  </h3>
                  <h4
                    className="font-mono font-bold text-lg uppercase tracking-wider mb-6"
                    style={{ textShadow: "-1px 0 #ff00ff, 1px 0 #00ffff" }}
                  >
                    Heading S
                  </h4>
                  <p className="font-mono text-xs text-[#39ff14]/40 uppercase tracking-[0.1em]">
                    text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Neon glow text */}
            <RevealBlock inView={typographyInView} delay={0.1}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-8 overflow-hidden">
                <ScanlineOverlay />
                <div className="relative space-y-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40 mb-6">
                    Neon Glow Text
                  </p>
                  {[
                    { text: "NEON GREEN", color: "#39ff14" },
                    { text: "MAGENTA", color: "#ff00ff" },
                    { text: "CYAN", color: "#00ffff" },
                    { text: "YELLOW", color: "#FFFF00" },
                  ].map((item) => (
                    <p
                      key={item.color}
                      className="font-mono font-bold text-xl uppercase tracking-[0.2em]"
                      style={{
                        color: item.color,
                        textShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}`,
                      }}
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Scanline demo */}
            <RevealBlock inView={typographyInView} delay={0.15}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-8 overflow-hidden">
                <ScanlineOverlay />
                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40 mb-6">
                    Scanline Overlay
                  </p>
                  <div className="bg-[#0d0d0d] border border-[#39ff14]/20 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.05)_2px,rgba(57,255,20,0.05)_4px)]" />
                    <p className="relative font-mono text-sm text-[#39ff14]/80 leading-loose">
                      Every surface uses the scanline overlay:
                      <br />
                      repeating-linear-gradient(0deg, ...)
                      <br />
                      2px lines at 4px intervals
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Monospace type scale */}
            <RevealBlock inView={typographyInView} delay={0.2}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-8 overflow-hidden">
                <ScanlineOverlay />
                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/40 mb-6">
                    Type Scale / font-mono only
                  </p>
                  <div className="space-y-3">
                    <p className="font-mono text-3xl font-bold text-[#39ff14]">
                      DISPLAY
                    </p>
                    <p className="font-mono text-xl font-bold text-[#39ff14]/80">
                      HEADING
                    </p>
                    <p className="font-mono text-base text-[#39ff14]/70">
                      BODY TEXT — MONOSPACE ONLY
                    </p>
                    <p className="font-mono text-sm text-[#39ff14]/50">
                      Caption / label text
                    </p>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#39ff14]/30">
                      MICRO LABEL — TRACKING 0.2EM
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DESIGN RULES                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-10 pb-20" ref={rulesRef}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock inView={rulesInView} delay={0}>
            <SectionLabel>Design Rules</SectionLabel>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Do list */}
            <RevealBlock inView={rulesInView} delay={0.08}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 overflow-hidden">
                <ScanlineOverlay />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <NeonDot />
                    <h3
                      className="font-mono text-sm uppercase tracking-[0.2em]"
                      style={{ textShadow: "0 0 10px #39ff14" }}
                    >
                      Must Follow
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Scanline overlay on ALL content areas",
                      "Neon glow (text-shadow / box-shadow) on key elements",
                      "font-mono for every text element, no exceptions",
                      "Near-black background (#050505 or #0a0a0a)",
                      "RGB chromatic aberration on ALL headings",
                      "High-saturation neon colors only",
                      "uppercase + tracking-[0.2em] on all labels",
                    ].map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span
                          className="font-mono text-xs text-[#39ff14] shrink-0 mt-0.5"
                          style={{ textShadow: "0 0 8px #39ff14" }}
                        >
                          +
                        </span>
                        <span className="font-mono text-xs text-[#39ff14]/70 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock inView={rulesInView} delay={0.14}>
              <div className="relative bg-[#0a0a0a] border-2 border-[#ff2a2a]/30 p-6 overflow-hidden">
                <ScanlineOverlay />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <NeonDot color="#ff2a2a" />
                    <h3
                      className="font-mono text-sm uppercase tracking-[0.2em] text-[#ff2a2a]"
                      style={{ textShadow: "0 0 10px #ff2a2a" }}
                    >
                      Forbidden
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Light or white backgrounds — ever",
                      "Pastel or muted colors — neon only",
                      "Serif or sans-serif fonts — font-mono only",
                      "Rounded corners larger than 4px",
                      "Soft standard shadows — neon glow only",
                      "Non-neon gradients or muted color schemes",
                      "Decorative elements without glow effect",
                    ].map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span
                          className="font-mono text-xs text-[#ff2a2a] shrink-0 mt-0.5"
                          style={{ textShadow: "0 0 8px #ff2a2a" }}
                        >
                          x
                        </span>
                        <span className="font-mono text-xs text-[#ff2a2a]/60 leading-relaxed">
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

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="bg-[#050505] border-t-2 border-[#39ff14]/20 px-6 md:px-10 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <p
                className="font-mono text-lg font-bold uppercase tracking-[0.15em] mb-1"
                style={{
                  color: "#39ff14",
                  textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14",
                }}
              >
                ARCADE CRT
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/30">
                StyleKit Design System
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/styles/arcade-crt"
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#39ff14]/60 hover:text-[#39ff14] transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#00ffff]/60 hover:text-[#00ffff] transition-colors"
              >
                All Styles
              </Link>
            </div>
          </div>

          {/* Credits line */}
          <div className="border-t border-[#39ff14]/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#39ff14]/25">
              {"CREDITS: "}{String(credits).padStart(2, "0")}{" // INSERT COIN"}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2"
                style={{
                  background: "#39ff14",
                  boxShadow: "0 0 8px rgba(57,255,20,0.8)",
                  animation: "neon-flicker 4s ease-in-out infinite",
                }}
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39ff14]/25">
                CRT-9000 // System Online
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
