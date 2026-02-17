"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Gamepad2, Zap, Trophy, Crosshair, Terminal, Heart } from "lucide-react";

function CrtPanel({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`relative bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 overflow-hidden hover:border-[#39ff14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] transition-all duration-200 ${className}`}>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)] pointer-events-none" />
      {label && (
        <div className="absolute -top-3 left-4 bg-[#050505] px-3 py-0.5 border-2 border-[#39ff14]/30">
          <span className="text-[#39ff14] font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function NeonBar({ value, color }: { value: number; color: string }) {
  const colors: Record<string, string> = {
    green: "bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.6)]",
    cyan: "bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.6)]",
    magenta: "bg-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.6)]",
    red: "bg-[#ff2a2a] shadow-[0_0_10px_rgba(255,42,42,0.6)]",
    yellow: "bg-[#FFFF00] shadow-[0_0_10px_rgba(255,255,0,0.6)]",
  };
  return (
    <div className="w-full h-3 bg-black border border-[#39ff14]/20 overflow-hidden">
      <div className={`h-full ${colors[color]} transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}

function LogLine({ time, text, type = "info" }: { time: string; text: string; type?: "info" | "ok" | "warn" | "err" }) {
  const prefixColors = { info: "text-[#00ffff]", ok: "text-[#39ff14]", warn: "text-[#FFFF00]", err: "text-[#ff2a2a]" };
  const prefixLabels = { info: "INF", ok: " OK", warn: "WRN", err: "ERR" };
  return (
    <div className="flex gap-2 px-3 py-1.5 hover:bg-[#39ff14]/5 transition-colors font-mono text-xs">
      <span className="text-[#39ff14]/50 shrink-0">{time}</span>
      <span className={`${prefixColors[type]} shrink-0`}>[{prefixLabels[type]}]</span>
      <span className="text-[#39ff14]/70">{text}</span>
    </div>
  );
}

export default function ArcadeCrtShowcaseContent() {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCredits((c) => (c + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const games = [
    { title: "PIXEL BLASTER", genre: "SHOOT EM UP", icon: Crosshair, color: "#39ff14", score: "999,999" },
    { title: "NEON DRIFT", genre: "RACING", icon: Zap, color: "#00ffff", score: "512,400" },
    { title: "CYBER QUEST", genre: "RPG", icon: Gamepad2, color: "#ff00ff", score: "1,280,000" },
    { title: "GRID FIGHTER", genre: "FIGHTING", icon: Trophy, color: "#FFFF00", score: "750,300" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#39ff14]">
      <style jsx global>{`
        @keyframes rgb-shift {
          0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          50% { text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff; }
        }
        @keyframes neon-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#050505]/95 border-b-2 border-[#39ff14]/30 backdrop-blur-sm px-6 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/styles/arcade-crt" className="flex items-center gap-2 text-[#00ffff] hover:text-[#00ffff]/70 transition-colors font-mono text-xs uppercase tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <Monitor className="w-5 h-5 text-[#39ff14]" />
            <span className="text-[#39ff14] font-mono text-sm uppercase tracking-[0.15em]">Arcade CRT</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#FFFF00] font-mono text-xs uppercase tracking-wider">
            Credit: {String(credits).padStart(2, "0")}
          </span>
          <div className="w-2 h-2 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)] animate-pulse" />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-[#00ffff] font-mono text-xs uppercase tracking-[0.3em] mb-6">{"// Insert Coin to Start"}</p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold uppercase tracking-wider"
            style={{ animation: "rgb-shift 2s ease-in-out infinite" }}
          >
            ARCADE CRT
          </h1>
          <p className="mt-6 text-[#39ff14]/60 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            80-90s arcade monitor aesthetic with scanline overlays, phosphor glow,
            chromatic aberration, and neon-on-black visuals.
          </p>
        </div>
      </section>

      {/* Game Select Grid */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.3em] mb-8">{"// Game Select"}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <CrtPanel key={game.title}>
                <div className="space-y-4">
                  <game.icon className="w-8 h-8" style={{ color: game.color, filter: `drop-shadow(0 0 8px ${game.color})` }} />
                  <div>
                    <h3 className="font-mono font-bold text-lg uppercase tracking-wider" style={{ color: game.color, textShadow: `0 0 15px ${game.color}` }}>
                      {game.title}
                    </h3>
                    <p className="text-[#39ff14]/40 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">{game.genre}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#39ff14]/10 pt-3">
                    <span className="text-[#39ff14]/50 font-mono text-[10px] uppercase">Hi-Score</span>
                    <span className="text-[#FFFF00] font-mono text-sm font-bold">{game.score}</span>
                  </div>
                </div>
              </CrtPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.3em] mb-8">{"// Components"}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <CrtPanel label="Buttons">
              <div className="pt-4 flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-[#39ff14] text-black font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] transition-all duration-200">
                  Start
                </button>
                <button className="px-5 py-2.5 bg-transparent text-[#ff00ff] font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:bg-[#ff00ff]/10 transition-all duration-200">
                  Player 2
                </button>
                <button className="px-5 py-2.5 bg-transparent text-[#00ffff] font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-[#00ffff]/10 transition-all duration-200">
                  Options
                </button>
                <button className="px-5 py-2.5 bg-transparent text-[#ff2a2a] font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#ff2a2a] shadow-[0_0_15px_rgba(255,42,42,0.3)] hover:bg-[#ff2a2a]/10 transition-all duration-200">
                  Quit
                </button>
              </div>
            </CrtPanel>

            {/* Inputs */}
            <CrtPanel label="Inputs">
              <div className="pt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[#39ff14] font-mono text-[10px] uppercase tracking-[0.2em]">Player Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-black border-2 border-[#39ff14]/40 text-[#39ff14] font-mono text-sm placeholder:text-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-200"
                    placeholder="AAA"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[#00ffff] font-mono text-[10px] uppercase tracking-[0.2em]">Access Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-black border-2 border-[#00ffff]/40 text-[#00ffff] font-mono text-sm placeholder:text-[#00ffff]/30 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-200"
                    placeholder="ENTER CODE..."
                  />
                </div>
              </div>
            </CrtPanel>

            {/* Health / Progress Bars */}
            <CrtPanel label="Status Bars">
              <div className="pt-4 space-y-4">
                {[
                  { label: "HEALTH", value: 85, color: "green", icon: Heart },
                  { label: "ENERGY", value: 62, color: "cyan", icon: Zap },
                  { label: "AMMO", value: 40, color: "yellow", icon: Crosshair },
                  { label: "DAMAGE", value: 25, color: "red", icon: Terminal },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <bar.icon className="w-3 h-3 text-[#39ff14]/50" />
                        <span className="text-[#39ff14]/60 font-mono text-[10px] uppercase tracking-[0.2em]">{bar.label}</span>
                      </div>
                      <span className="text-[#39ff14] font-mono text-xs font-bold">{bar.value}%</span>
                    </div>
                    <NeonBar value={bar.value} color={bar.color} />
                  </div>
                ))}
              </div>
            </CrtPanel>

            {/* Terminal / Console Log */}
            <CrtPanel label="Console">
              <div className="pt-4 space-y-0.5 max-h-52 overflow-y-auto">
                <LogLine time="19:42:01" text="System boot sequence initiated" type="info" />
                <LogLine time="19:42:02" text="CRT display online - phosphor warm-up complete" type="ok" />
                <LogLine time="19:42:03" text="Loading ROM: PIXEL_BLASTER_v2.1.bin" type="info" />
                <LogLine time="19:42:04" text="Scanline generator calibrated" type="ok" />
                <LogLine time="19:42:05" text="Coin mechanism check - low credits" type="warn" />
                <LogLine time="19:42:06" text="Player 2 controller disconnected" type="err" />
                <LogLine time="19:42:08" text="Audio subsystem initialized" type="ok" />
                <LogLine time="19:42:10" text="Ready - INSERT COIN" type="info" />
              </div>
            </CrtPanel>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.3em] mb-8">{"// Color System"}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { name: "Background", hex: "#050505", bg: "bg-[#050505]", text: "text-[#39ff14]/60" },
              { name: "Surface", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", text: "text-[#39ff14]/60" },
              { name: "Neon Green", hex: "#39ff14", bg: "bg-[#39ff14]", text: "text-black" },
              { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]", text: "text-black" },
              { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]", text: "text-black" },
              { name: "Red", hex: "#ff2a2a", bg: "bg-[#ff2a2a]", text: "text-black" },
              { name: "Yellow", hex: "#FFFF00", bg: "bg-[#FFFF00]", text: "text-black" },
              { name: "Orange", hex: "#ff8533", bg: "bg-[#ff8533]", text: "text-black" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} p-3 border border-[#39ff14]/10`}>
                <p className={`${c.text} font-mono text-[10px] uppercase tracking-wider`}>{c.name}</p>
                <p className={`${c.text} font-mono text-[10px] opacity-70 mt-1`}>{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#39ff14]/20 px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#39ff14]/40 font-mono text-xs uppercase tracking-[0.2em]">
            Arcade CRT Design System // StyleKit
          </p>
          <div className="flex gap-6">
            <Link href="/styles/arcade-crt" className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em] hover:text-[#39ff14]/70 transition-colors">
              Documentation
            </Link>
            <Link href="/styles" className="text-[#00ffff]/60 font-mono text-xs uppercase tracking-[0.2em] hover:text-[#00ffff] transition-colors">
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
