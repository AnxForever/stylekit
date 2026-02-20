"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ---------- inline useInView ---------- */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ---------- inline RevealBlock ---------- */
function RevealBlock({ children, className = "", delay = 0 }: {
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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Scanline Overlay ---------- */
function ScanlineOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,${opacity}) 2px, rgba(57,255,20,${opacity}) 4px)`,
      }}
    />
  );
}

/* ---------- CRT Bezel Frame ---------- */
function CrtBezel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border-2 border-[#39ff14]/20 bg-[#0a0a0a] p-1 shadow-[0_0_40px_rgba(57,255,20,0.1),inset_0_0_60px_rgba(0,0,0,0.8)]">
      <div className="relative rounded-xl overflow-hidden">
        {children}
      </div>
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
    </div>
  );
}

/* ---------- Neon Text ---------- */
function NeonText({ children, color = "#39ff14", className = "" }: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`font-mono ${className}`}
      style={{ textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}` }}
    >
      {children}
    </span>
  );
}

/* ---------- data ---------- */
const highScores = [
  { rank: 1, name: "ACE", score: 999999, color: "#FFFF00" },
  { rank: 2, name: "PRO", score: 875420, color: "#39ff14" },
  { rank: 3, name: "ZAP", score: 743100, color: "#00ffff" },
  { rank: 4, name: "MAX", score: 621800, color: "#ff00ff" },
  { rank: 5, name: "NEO", score: 510300, color: "#ff2a2a" },
];

const gameModules = [
  { title: "SPRITE ENGINE", desc: "Hardware-accelerated 2D sprite rendering with parallax scrolling layers", status: "ONLINE", statusColor: "#39ff14" },
  { title: "SOUND CHIP", desc: "FM synthesis audio processor with 8-channel polyphony and PCM playback", status: "ACTIVE", statusColor: "#00ffff" },
  { title: "INPUT MATRIX", desc: "8-way joystick decoder with 6-button layout and rapid-fire toggle", status: "READY", statusColor: "#FFFF00" },
  { title: "SCORE CORE", desc: "High-score table management with initials entry and persistent storage", status: "STANDBY", statusColor: "#ff00ff" },
];

const colorPalette = [
  { name: "NEON GREEN", hex: "#39ff14", desc: "Primary accent" },
  { name: "MAGENTA", hex: "#ff00ff", desc: "Accent 1" },
  { name: "CYAN", hex: "#00ffff", desc: "Accent 2" },
  { name: "RED", hex: "#ff2a2a", desc: "Accent 3" },
  { name: "YELLOW", hex: "#FFFF00", desc: "Accent 4" },
  { name: "AMBER", hex: "#ff8533", desc: "Accent 5" },
  { name: "DEEP BLACK", hex: "#050505", desc: "Background" },
  { name: "DARK", hex: "#0a0a0a", desc: "Surface" },
];

const componentTabs = ["Buttons", "Inputs", "Cards"] as const;

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof componentTabs)[number]>("Buttons");
  const [coinCount, setCoinCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#39ff14]">
      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }
        @keyframes neon-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes rgb-shift {
          0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          50% { text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff; }
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scanline-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .crt-text { animation: crt-flicker 0.1s infinite; }
        .neon-flicker { animation: neon-pulse 3s ease-in-out infinite; }
        .rgb-text { animation: rgb-shift 2s ease-in-out infinite; }
      `}</style>

      {/* ===== Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-sm border-b-2 border-[#39ff14]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/styles/arcade-crt" className="font-mono text-xs uppercase tracking-widest text-[#39ff14] hover:text-[#39ff14]/70 transition-colors duration-150">
              &lt; BACK
            </Link>
            <span className="font-mono text-sm uppercase tracking-[0.15em] rgb-text text-white font-bold">
              ARCADE CRT
            </span>
            <nav className="flex items-center gap-4">
              <Link href="/styles/arcade-crt" className="hidden md:block font-mono text-xs uppercase tracking-widest text-[#00ffff] hover:text-[#00ffff]/70 transition-colors duration-150">
                Docs
              </Link>
              <Link href="/styles" className="font-mono text-xs uppercase tracking-widest text-[#ff00ff] hover:text-[#ff00ff]/70 transition-colors duration-150">
                Styles
              </Link>
              <div className="ml-2 font-mono text-xs text-[#FFFF00]">
                CREDIT: {String(coinCount).padStart(2, "0")}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative pt-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <ScanlineOverlay opacity={0.04} />

        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(57,255,20,0.08) 0%, transparent 60%)" }} />

        <div className="relative z-20 text-center px-6">
          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-mono font-bold uppercase tracking-wider text-[#39ff14] leading-none"
            style={{
              textShadow: "-3px 0 #ff00ff, 3px 0 #00ffff, 0 0 40px rgba(57,255,20,0.5)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            ARCADE
            <br />
            CRT
          </h1>

          <p
            className="mt-6 text-[#00ffff]/70 font-mono text-sm md:text-base uppercase tracking-widest"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            RETRO GAMING AESTHETIC // PHOSPHOR GLOW // SCANLINES
          </p>

          <div
            className="mt-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <button
              onClick={() => setCoinCount((c) => c + 1)}
              className="group relative px-10 py-4 bg-[#39ff14]/10 text-[#39ff14] font-mono text-lg uppercase tracking-[0.2em] border-2 border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.4),inset_0_0_15px_rgba(57,255,20,0.2)] hover:bg-[#39ff14] hover:text-black hover:shadow-[0_0_40px_rgba(57,255,20,0.8),inset_0_0_20px_rgba(57,255,20,0.5)] active:translate-y-[6px] active:shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-all duration-150"
            >
              <span className="group-hover:animate-pulse">INSERT COIN</span>
            </button>
          </div>

          <p className="mt-8 font-mono text-xs text-[#39ff14]/50 uppercase tracking-widest">
            Press Start to Begin
            <span style={{ animation: "cursor-blink 1s steps(1) infinite" }}>_</span>
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#39ff14]/20" />
      </section>

      {/* ===== Marquee ===== */}
      <div className="w-full overflow-hidden border-y-2 border-[#39ff14]/20 py-3 bg-[#050505]">
        <div className="flex w-[200%]" style={{ animation: "marquee-scroll 20s linear infinite" }}>
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 flex justify-around items-center font-mono text-xs uppercase tracking-widest text-[#39ff14]/40">
              <span>PLAYER 1</span>
              <span className="text-[#ff00ff]">*</span>
              <span>HIGH SCORE</span>
              <span className="text-[#00ffff]">*</span>
              <span>GAME OVER</span>
              <span className="text-[#FFFF00]">*</span>
              <span>CONTINUE?</span>
              <span className="text-[#ff2a2a]">*</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== High Score Table ===== */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <ScanlineOverlay opacity={0.02} />
        <div className="relative z-20 max-w-4xl mx-auto">
          <RevealBlock>
            <h2
              className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider text-center mb-4"
              style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
            >
              HIGH SCORES
            </h2>
            <p className="text-center font-mono text-xs text-[#39ff14]/40 uppercase tracking-widest mb-12">
              Top Players // All Time
            </p>
          </RevealBlock>

          <CrtBezel>
            <div className="bg-[#0a0a0a] p-6 md:p-8 relative">
              <ScanlineOverlay opacity={0.05} />
              <div className="relative z-10">
                <div className="flex items-center font-mono text-xs uppercase tracking-widest text-[#39ff14]/40 border-b border-[#39ff14]/20 pb-3 mb-4">
                  <span className="w-16">RANK</span>
                  <span className="flex-1">NAME</span>
                  <span className="text-right w-32">SCORE</span>
                </div>
                {highScores.map((s, i) => (
                  <RevealBlock key={s.rank} delay={i * 0.08}>
                    <div className="group flex items-center font-mono py-3 border-b border-[#39ff14]/10 hover:bg-[#39ff14]/5 transition-colors duration-150 cursor-crosshair">
                      <span className="w-16 text-sm font-bold" style={{ color: s.color }}>
                        {String(s.rank).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-lg font-bold text-white group-hover:text-[#39ff14] transition-colors duration-100" style={{ textShadow: "-1px 0 #ff00ff, 1px 0 #00ffff" }}>
                        {s.name}
                      </span>
                      <span className="text-right w-32 text-sm font-bold" style={{ color: s.color }}>
                        {s.score.toLocaleString()}
                      </span>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </CrtBezel>
        </div>
      </section>

      {/* ===== Game Modules / Feature Cards ===== */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <ScanlineOverlay opacity={0.02} />
        <div className="relative z-20 max-w-7xl mx-auto">
          <RevealBlock>
            <h2
              className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider mb-4"
              style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
            >
              SYSTEM MODULES
            </h2>
            <p className="font-mono text-xs text-[#39ff14]/40 uppercase tracking-widest mb-12">
              Hardware Specifications
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {gameModules.map((mod, i) => (
              <RevealBlock key={mod.title} delay={i * 0.1}>
                <div className="group bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 relative overflow-hidden hover:border-[#39ff14] hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] hover:-translate-y-1 transition-all duration-200 cursor-crosshair">
                  <ScanlineOverlay opacity={0.05} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 shadow-[0_0_10px] group-hover:animate-ping" style={{ backgroundColor: mod.statusColor, boxShadow: `0 0 10px ${mod.statusColor}` }} />
                        <h3 className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">{mod.title}</h3>
                      </div>
                      <span className="font-mono text-xs uppercase" style={{ color: mod.statusColor }}>
                        [{mod.status}]
                      </span>
                    </div>
                    <p className="text-[#39ff14]/60 font-mono text-sm leading-relaxed group-hover:text-[#39ff14]/90 transition-colors duration-200">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Demos (Tab-Switched) ===== */}
      <section className="relative py-20 md:py-32 px-6 border-y-2 border-[#39ff14]/20 overflow-hidden">
        <ScanlineOverlay opacity={0.02} />
        <div className="relative z-20 max-w-7xl mx-auto">
          <RevealBlock>
            <h2
              className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider mb-4"
              style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
            >
              COMPONENTS
            </h2>
            <p className="font-mono text-xs text-[#39ff14]/40 uppercase tracking-widest mb-10">
              UI Module Library
            </p>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-10">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] border-2 transition-all duration-150 ${
                    activeTab === tab
                      ? "bg-[#39ff14] text-black border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.5)]"
                      : "bg-transparent text-[#39ff14]/60 border-[#39ff14]/30 hover:text-[#39ff14] hover:border-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "Buttons" && (
            <RevealBlock delay={0.15}>
              <CrtBezel>
                <div className="bg-[#0a0a0a] p-8 relative">
                  <ScanlineOverlay opacity={0.04} />
                  <div className="relative z-10 space-y-8">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#39ff14]/40 mb-6">Button Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="group relative px-8 py-4 bg-[#39ff14]/10 text-[#39ff14] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.4),inset_0_0_15px_rgba(57,255,20,0.2)] hover:bg-[#39ff14] hover:text-black hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] active:translate-y-[4px] active:shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-all duration-150">
                        PRIMARY
                      </button>
                      <button className="px-8 py-4 bg-[#ff00ff]/10 text-[#ff00ff] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:bg-[#ff00ff] hover:text-black hover:shadow-[0_0_40px_rgba(255,0,255,0.6)] active:translate-y-[4px] transition-all duration-150">
                        DANGER
                      </button>
                      <button className="px-8 py-4 bg-[#00ffff]/10 text-[#00ffff] font-mono text-sm uppercase tracking-[0.2em] border-2 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] active:translate-y-[4px] transition-all duration-150">
                        INFO
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-3 bg-transparent text-[#FFFF00] font-mono text-xs uppercase tracking-[0.2em] border border-[#FFFF00]/40 hover:border-[#FFFF00] hover:shadow-[0_0_20px_rgba(255,255,0,0.3)] transition-all duration-150">
                        OUTLINED
                      </button>
                      <button className="px-6 py-3 bg-[#ff2a2a] text-white font-mono text-xs uppercase tracking-[0.2em] border-2 border-[#ff2a2a] shadow-[0_0_10px_rgba(255,42,42,0.4)] hover:shadow-[0_0_30px_rgba(255,42,42,0.7)] active:translate-y-[4px] transition-all duration-150">
                        ALERT
                      </button>
                    </div>
                  </div>
                </div>
              </CrtBezel>
            </RevealBlock>
          )}

          {/* Tab: Inputs */}
          {activeTab === "Inputs" && (
            <RevealBlock delay={0.15}>
              <CrtBezel>
                <div className="bg-[#0a0a0a] p-8 relative">
                  <ScanlineOverlay opacity={0.04} />
                  <div className="relative z-10 space-y-6 max-w-lg">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#39ff14]/40 mb-6">Input Fields</h3>
                    <div className="space-y-2">
                      <label className="block text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">Player Name</label>
                      <input
                        type="text"
                        placeholder="ENTER NAME..."
                        className="w-full px-4 py-3 bg-black border-2 border-[#39ff14]/40 text-[#39ff14] font-mono text-sm placeholder:text-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[#00ffff] font-mono text-xs uppercase tracking-[0.2em]">Access Code</label>
                      <input
                        type="password"
                        placeholder="********"
                        className="w-full px-4 py-3 bg-black border-2 border-[#00ffff]/40 text-[#00ffff] font-mono text-sm placeholder:text-[#00ffff]/30 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[#ff00ff] font-mono text-xs uppercase tracking-[0.2em]">Message</label>
                      <textarea
                        rows={3}
                        placeholder="TRANSMIT MESSAGE..."
                        className="w-full px-4 py-3 bg-black border-2 border-[#ff00ff]/40 text-[#ff00ff] font-mono text-sm placeholder:text-[#ff00ff]/30 focus:outline-none focus:border-[#ff00ff] focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] resize-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </CrtBezel>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "Cards" && (
            <RevealBlock delay={0.15}>
              <div className="grid md:grid-cols-2 gap-6">
                <CrtBezel>
                  <div className="group bg-[#0a0a0a] p-6 relative overflow-hidden cursor-crosshair">
                    <ScanlineOverlay opacity={0.05} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
                        <h4 className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">Active Module</h4>
                      </div>
                      <h3 className="text-white text-xl font-mono font-bold mb-2" style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}>
                        STANDARD CARD
                      </h3>
                      <p className="text-[#39ff14]/60 font-mono text-sm leading-relaxed">
                        Default card with scanline overlay, phosphor glow, and CRT bezel frame.
                      </p>
                    </div>
                  </div>
                </CrtBezel>
                <div className="bg-[#0a0a0a] border-2 border-[#ff00ff]/40 p-6 relative overflow-hidden hover:border-[#ff00ff] hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] transition-all duration-200">
                  <ScanlineOverlay opacity={0.04} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.8)]" />
                      <h4 className="text-[#ff00ff] font-mono text-xs uppercase tracking-[0.2em]">Warning</h4>
                    </div>
                    <h3 className="text-white text-xl font-mono font-bold mb-2" style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}>
                      ALERT CARD
                    </h3>
                    <p className="text-[#ff00ff]/60 font-mono text-sm leading-relaxed">
                      Magenta-tinted variant for warning states and critical system messages.
                    </p>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border-2 border-[#00ffff]/40 p-6 relative overflow-hidden hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-200">
                  <ScanlineOverlay opacity={0.04} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                      <h4 className="text-[#00ffff] font-mono text-xs uppercase tracking-[0.2em]">Info</h4>
                    </div>
                    <h3 className="text-white text-xl font-mono font-bold mb-2" style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}>
                      INFO CARD
                    </h3>
                    <p className="text-[#00ffff]/60 font-mono text-sm leading-relaxed">
                      Cyan-tinted variant for informational content and system status updates.
                    </p>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border-2 border-[#FFFF00]/40 p-6 relative overflow-hidden hover:border-[#FFFF00] hover:shadow-[0_0_30px_rgba(255,255,0,0.2)] transition-all duration-200">
                  <ScanlineOverlay opacity={0.04} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-[#FFFF00] shadow-[0_0_10px_rgba(255,255,0,0.8)]" />
                      <h4 className="text-[#FFFF00] font-mono text-xs uppercase tracking-[0.2em]">Achievement</h4>
                    </div>
                    <h3 className="text-white text-xl font-mono font-bold mb-2" style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}>
                      TROPHY CARD
                    </h3>
                    <p className="text-[#FFFF00]/60 font-mono text-sm leading-relaxed">
                      Yellow-tinted variant for achievements, milestones, and reward displays.
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== Inline Color Palette ===== */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <ScanlineOverlay opacity={0.02} />
        <div className="relative z-20 max-w-7xl mx-auto">
          <RevealBlock>
            <h2
              className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider mb-4"
              style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
            >
              COLOR MATRIX
            </h2>
            <p className="font-mono text-xs text-[#39ff14]/40 uppercase tracking-widest mb-12">
              System Color Palette
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPalette.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="group border-2 border-[#39ff14]/20 hover:border-[#39ff14]/60 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all duration-200 cursor-crosshair">
                  <div className="h-20 md:h-28 relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                    <ScanlineOverlay opacity={0.08} />
                  </div>
                  <div className="p-3 bg-[#0a0a0a] border-t-2 border-[#39ff14]/20">
                    <p className="font-mono text-xs font-bold text-white">{c.name}</p>
                    <p className="font-mono text-xs text-[#39ff14]/50">{c.hex}</p>
                    <p className="font-mono text-[10px] text-[#39ff14]/30 mt-1">{c.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="relative py-20 md:py-32 px-6 border-y-2 border-[#39ff14]/20 overflow-hidden">
        <ScanlineOverlay opacity={0.02} />
        <div className="relative z-20 max-w-6xl mx-auto">
          <RevealBlock>
            <h2
              className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider mb-12"
              style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
            >
              SYSTEM RULES
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10">
            <RevealBlock delay={0.1}>
              <div className="space-y-6">
                <h3 className="font-mono text-sm uppercase tracking-widest text-[#39ff14]">
                  <NeonText color="#39ff14">// REQUIRED</NeonText>
                </h3>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#39ff14] flex-shrink-0">[+]</span>
                    <span className="text-[#39ff14]/80">Near-black backgrounds (#050505)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#39ff14] flex-shrink-0">[+]</span>
                    <span className="text-[#39ff14]/80">Monospace fonts on all text</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#39ff14] flex-shrink-0">[+]</span>
                    <span className="text-[#39ff14]/80">Scanline overlays on content areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#39ff14] flex-shrink-0">[+]</span>
                    <span className="text-[#39ff14]/80">RGB chromatic aberration on headings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#39ff14] flex-shrink-0">[+]</span>
                    <span className="text-[#39ff14]/80">Neon glow box-shadows on interactive elements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#39ff14] flex-shrink-0">[+]</span>
                    <span className="text-[#39ff14]/80">Uppercase text with wide letter-spacing</span>
                  </li>
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="space-y-6">
                <h3 className="font-mono text-sm uppercase tracking-widest text-[#ff2a2a]">
                  <NeonText color="#ff2a2a">// FORBIDDEN</NeonText>
                </h3>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2a2a] flex-shrink-0">[-]</span>
                    <span className="text-[#ff2a2a]/60 line-through">Light or white backgrounds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2a2a] flex-shrink-0">[-]</span>
                    <span className="text-[#ff2a2a]/60 line-through">Pastel or muted colors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2a2a] flex-shrink-0">[-]</span>
                    <span className="text-[#ff2a2a]/60 line-through">Serif or sans-serif body fonts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2a2a] flex-shrink-0">[-]</span>
                    <span className="text-[#ff2a2a]/60 line-through">Large border-radius (&gt; 4px)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2a2a] flex-shrink-0">[-]</span>
                    <span className="text-[#ff2a2a]/60 line-through">Subtle standard shadows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2a2a] flex-shrink-0">[-]</span>
                    <span className="text-[#ff2a2a]/60 line-through">Non-neon gradients</span>
                  </li>
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== CRT Screen Demo ===== */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <ScanlineOverlay opacity={0.02} />
        <div className="relative z-20 max-w-4xl mx-auto">
          <RevealBlock>
            <h2
              className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider mb-12 text-center"
              style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}
            >
              CRT SCREEN
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <CrtBezel>
              <div className="bg-[#050505] p-8 md:p-12 relative min-h-[300px] flex flex-col items-center justify-center">
                <ScanlineOverlay opacity={0.06} />
                <div className="relative z-10 text-center">
                  <p className="font-mono text-4xl md:text-6xl font-bold text-[#39ff14] mb-4 neon-flicker" style={{ textShadow: "0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.3)" }}>
                    GAME OVER
                  </p>
                  <p className="font-mono text-sm text-[#00ffff]/60 uppercase tracking-widest mb-6">
                    Score: {(coinCount * 12450).toLocaleString()}
                  </p>
                  <p className="font-mono text-xs text-[#FFFF00]/60 uppercase tracking-widest" style={{ animation: "cursor-blink 1s steps(1) infinite" }}>
                    INSERT COIN TO CONTINUE
                  </p>
                </div>
              </div>
            </CrtBezel>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#050505] border-t-2 border-[#39ff14]/20 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-mono text-lg font-bold text-white mb-1" style={{ textShadow: "-2px 0 #ff00ff, 2px 0 #00ffff" }}>
                ARCADE CRT
              </p>
              <p className="font-mono text-xs text-[#39ff14]/40 uppercase tracking-widest">
                CREDITS: {String(coinCount).padStart(2, "0")} // INSERT COIN TO CONTINUE
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/styles/arcade-crt"
                className="font-mono text-xs uppercase tracking-widest text-[#39ff14] border border-[#39ff14]/40 px-4 py-2 hover:bg-[#39ff14]/10 hover:border-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-150"
              >
                View Docs
              </Link>
              <Link
                href="/styles"
                className="font-mono text-xs uppercase tracking-widest text-[#00ffff] border border-[#00ffff]/40 px-4 py-2 hover:bg-[#00ffff]/10 hover:border-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-150"
              >
                All Styles
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#39ff14]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-[#39ff14]/30 uppercase tracking-widest">
              StyleKit // Arcade CRT Showcase
            </p>
            <div className="flex gap-4">
              {["#39ff14", "#ff00ff", "#00ffff", "#ff2a2a", "#FFFF00"].map((c) => (
                <div key={c} className="flex items-center gap-1.5">
                  <div className="w-2 h-2" style={{ backgroundColor: c, boxShadow: `0 0 6px ${c}` }} />
                  <span className="font-mono text-[10px]" style={{ color: c }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
