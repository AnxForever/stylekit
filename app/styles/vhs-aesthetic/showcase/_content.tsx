"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  FastForward,
  Rewind,
  Circle,
  Radio,
  Tv,
} from "lucide-react";

function VhsCard({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative bg-[#1a0a2e]/80 border border-[#ff00ff]/20 p-6 overflow-hidden hover:border-[#ff00ff]/40 hover:shadow-[0_0_20px_rgba(255,0,255,0.15)] transition-all duration-200 ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.02)_2px,rgba(255,0,255,0.02)_4px)] pointer-events-none" />
      {label && (
        <div className="absolute -top-3 left-4 bg-[#0d0520] px-3 py-0.5 border border-[#ff00ff]/30">
          <span className="text-[#ff00ff] font-mono text-[10px] uppercase tracking-[0.2em]">
            {label}
          </span>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function TimestampBadge({ text }: { text: string }) {
  return (
    <span className="font-mono text-[10px] text-[#ffff00] bg-black/50 px-2 py-0.5 border border-[#ffff00]/20">
      {text}
    </span>
  );
}

export default function VhsAestheticShowcaseContent() {
  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatCounter = (n: number) => {
    const h = String(Math.floor(n / 3600)).padStart(2, "0");
    const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0");
    const s = String(n % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const tapes = [
    { title: "SUMMER MEMORIES", year: "1989", duration: "02:14:33", color: "#ff00ff" },
    { title: "FAMILY VACATION", year: "1992", duration: "01:47:12", color: "#00ffff" },
    { title: "BIRTHDAY PARTY", year: "1994", duration: "00:58:45", color: "#ffff00" },
    { title: "SCHOOL FESTIVAL", year: "1991", duration: "01:22:08", color: "#00ff00" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @keyframes vhs-color-shift {
          0%,
          100% {
            text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
          }
          33% {
            text-shadow: -3px 0 #ff00ff, 1px 0 #00ffff;
          }
          66% {
            text-shadow: -1px 0 #ff00ff, 3px 0 #00ffff;
          }
        }
        @keyframes vhs-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        @keyframes vhs-noise {
          0%,
          100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.07;
          }
        }
        @keyframes vhs-tracking {
          0% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-2px);
          }
          20% {
            transform: translateX(3px);
          }
          30% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Scanline overlay - covers entire page */}
      <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.02)_2px,rgba(255,0,255,0.02)_4px)] pointer-events-none z-40" />

      {/* Noise/grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]"
        style={{ animation: "vhs-noise 3s ease-in-out infinite" }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/95 border-b border-[#ff00ff]/20 backdrop-blur-sm px-6 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/styles/vhs-aesthetic"
            className="flex items-center gap-2 text-[#00ffff] hover:text-[#00ffff]/70 transition-colors font-mono text-xs uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <Tv className="w-5 h-5 text-[#ff00ff]" />
            <span className="text-white font-mono text-sm uppercase tracking-wider">
              VHS Aesthetic
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-red-500 rounded-full"
              style={{ animation: "vhs-blink 1s step-end infinite" }}
            />
            <span className="text-red-500 font-mono text-xs uppercase">
              REC
            </span>
          </div>
          <span className="text-[#ffff00] font-mono text-xs">
            1989.08.24 PM 11:42
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-8 pt-20 pb-16 overflow-hidden">
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <TimestampBadge text="CH-03" />
            <TimestampBadge text="SP MODE" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Play className="w-4 h-4 text-[#00ff00]" />
            <span className="text-[#00ff00] font-mono text-xs uppercase tracking-[0.3em]">
              PLAY
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold uppercase tracking-wider"
            style={{ animation: "vhs-color-shift 2s ease-in-out infinite" }}
          >
            VHS AESTHETIC
          </h1>
          <p className="mt-6 text-[#ff00ff]/60 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            80-90s VHS tape visual aesthetics -- color bleeding, scanlines,
            noise grain, and signal interference effects.
          </p>
          {/* Tracking line effect */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#ff00ff]/40 to-transparent" />
          <div
            className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#00ffff]/30 to-transparent"
            style={{ animation: "vhs-tracking 4s ease-in-out infinite" }}
          />
        </div>
      </section>

      {/* Tape Collection */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#ff00ff] font-mono text-xs uppercase tracking-[0.3em] mb-8">
            {"// Tape Collection"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tapes.map((tape) => (
              <VhsCard key={tape.title}>
                <div className="space-y-4">
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: tape.color, boxShadow: `0 0 10px ${tape.color}` }}
                  />
                  <div>
                    <h3
                      className="font-mono font-bold text-lg uppercase tracking-wider"
                      style={{
                        color: tape.color,
                        textShadow: `0 0 15px ${tape.color}`,
                      }}
                    >
                      {tape.title}
                    </h3>
                    <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">
                      Recorded {tape.year}
                    </p>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#ff00ff]/10 pt-3">
                    <span className="text-[#ffff00] font-mono text-[10px] uppercase">
                      Duration
                    </span>
                    <span className="text-[#00ffff] font-mono text-sm">
                      {tape.duration}
                    </span>
                  </div>
                </div>
              </VhsCard>
            ))}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#ff00ff] font-mono text-xs uppercase tracking-[0.3em] mb-8">
            {"// Components"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <VhsCard label="Buttons">
              <div className="pt-4 flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-[#ff00ff]/20 text-[#ff00ff] font-mono text-xs uppercase tracking-widest border-2 border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:bg-[#ff00ff]/30 transition-all duration-200">
                  Play
                </button>
                <button className="px-5 py-2.5 bg-transparent text-[#00ffff] font-mono text-xs uppercase tracking-widest border-2 border-[#00ffff]/50 hover:border-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-200">
                  Rewind
                </button>
                <button className="px-5 py-2.5 bg-transparent text-[#ffff00] font-mono text-xs uppercase tracking-widest border-2 border-[#ffff00]/50 hover:border-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.3)] transition-all duration-200">
                  Pause
                </button>
                <button className="px-5 py-2.5 bg-transparent text-red-500 font-mono text-xs uppercase tracking-widest border-2 border-red-500/50 hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-200">
                  Stop
                </button>
              </div>
            </VhsCard>

            {/* Inputs */}
            <VhsCard label="Inputs">
              <div className="pt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[#00ffff] font-mono text-[10px] uppercase tracking-[0.2em]">
                    Tape Label
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-black/60 border border-[#00ffff]/30 text-[#00ffff] font-mono text-sm placeholder:text-[#00ffff]/30 focus:outline-none focus:border-[#00ffff] focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all duration-200"
                    placeholder="ENTER TITLE..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[#ff00ff] font-mono text-[10px] uppercase tracking-[0.2em]">
                    Search Archive
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-black/60 border border-[#ff00ff]/30 text-[#ff00ff] font-mono text-sm placeholder:text-[#ff00ff]/30 focus:outline-none focus:border-[#ff00ff] focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all duration-200"
                    placeholder="SEARCH TAPES..."
                  />
                </div>
              </div>
            </VhsCard>

            {/* Status Indicators */}
            <VhsCard label="Status">
              <div className="pt-4 space-y-4">
                {[
                  { label: "SIGNAL", value: "STRONG", color: "#00ff00", icon: Radio },
                  { label: "TRACKING", value: "AUTO", color: "#00ffff", icon: Tv },
                  { label: "TAPE", value: "SP MODE", color: "#ffff00", icon: Circle },
                  { label: "HEADS", value: "CLEAN", color: "#ff00ff", icon: Circle },
                ].map((status) => (
                  <div
                    key={status.label}
                    className="flex items-center justify-between border-b border-[#ff00ff]/10 pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <status.icon
                        className="w-3 h-3"
                        style={{ color: status.color }}
                      />
                      <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
                        {status.label}
                      </span>
                    </div>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: status.color }}
                    >
                      {status.value}
                    </span>
                  </div>
                ))}
              </div>
            </VhsCard>

            {/* Signal / Playback Interface */}
            <VhsCard label="Playback">
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      style={{ animation: "vhs-blink 1s step-end infinite" }}
                    />
                    <span className="text-red-500 font-mono text-[10px] uppercase">
                      REC
                    </span>
                  </div>
                  <TimestampBadge text={formatCounter(counter)} />
                </div>
                <div className="bg-black/60 border border-[#ff00ff]/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#ffff00] font-mono text-[10px]">
                      COUNTER: {String(counter).padStart(6, "0")}
                    </span>
                    <span className="text-[#00ff00] font-mono text-[10px]">
                      {isPlaying ? "PLAYING" : "PAUSED"}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-[#1a0a2e] mb-4 overflow-hidden">
                    <div
                      className="h-full bg-[#ff00ff] shadow-[0_0_8px_rgba(255,0,255,0.6)] transition-all duration-1000"
                      style={{ width: `${(counter % 60) * (100 / 60)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-[#00ffff] hover:text-[#00ffff]/70 transition-colors">
                      <Rewind className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-[#ff00ff] hover:text-[#ff00ff]/70 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>
                    <button className="text-[#00ffff] hover:text-[#00ffff]/70 transition-colors">
                      <FastForward className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-[#ffff00]/50 font-mono text-[10px]">
                  <span>1989.08.24</span>
                  <span>TAPE A -- SIDE 1</span>
                  <span>SP</span>
                </div>
              </div>
            </VhsCard>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#ff00ff] font-mono text-xs uppercase tracking-[0.3em] mb-8">
            {"// Color System"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Black", hex: "#000000", bg: "bg-black", text: "text-white/60" },
              { name: "Deep Purple", hex: "#1a0a2e", bg: "bg-[#1a0a2e]", text: "text-white/60" },
              { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]", text: "text-black" },
              { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]", text: "text-black" },
              { name: "Yellow", hex: "#ffff00", bg: "bg-[#ffff00]", text: "text-black" },
              { name: "Green", hex: "#00ff00", bg: "bg-[#00ff00]", text: "text-black" },
            ].map((c) => (
              <div
                key={c.name}
                className={`${c.bg} p-3 border border-[#ff00ff]/10`}
              >
                <p
                  className={`${c.text} font-mono text-[10px] uppercase tracking-wider`}
                >
                  {c.name}
                </p>
                <p className={`${c.text} font-mono text-[10px] opacity-70 mt-1`}>
                  {c.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ff00ff]/20 px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Tv className="w-4 h-4 text-[#ff00ff]/40" />
            <p className="text-[#ff00ff]/40 font-mono text-xs uppercase tracking-[0.2em]">
              VHS Aesthetic Design System // StyleKit
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/styles/vhs-aesthetic"
              className="text-[#ff00ff] font-mono text-xs uppercase tracking-[0.2em] hover:text-[#ff00ff]/70 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/styles"
              className="text-[#00ffff]/60 font-mono text-xs uppercase tracking-[0.2em] hover:text-[#00ffff] transition-colors"
            >
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
