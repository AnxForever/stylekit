"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Intersection Observer Hook ───────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const palette = [
  { name: "Magenta", hex: "#ff00ff", textClass: "text-black" },
  { name: "Cyan", hex: "#00ffff", textClass: "text-black" },
  { name: "Medium Slate Blue", hex: "#7b68ee", textClass: "text-white" },
  { name: "Hot Pink", hex: "#ff6ec7", textClass: "text-black" },
  { name: "Deep Pink", hex: "#ff1493", textClass: "text-white" },
  { name: "Void", hex: "#0d0221", textClass: "text-white" },
  { name: "Deep Space", hex: "#150050", textClass: "text-white" },
  { name: "Dusk Purple", hex: "#2d1b4e", textClass: "text-white" },
];

const tracks = [
  { title: "Nightcall", artist: "Kavinsky", duration: "4:17", bpm: 120, genre: "Retrowave" },
  { title: "Turbo Killer", artist: "Carpenter Brut", duration: "4:56", bpm: 148, genre: "Darksynth" },
  { title: "Running in the Night", artist: "FM-84", duration: "3:48", bpm: 112, genre: "Synthpop" },
  { title: "Tech Noir", artist: "Gunship", duration: "5:43", bpm: 130, genre: "Retrowave" },
  { title: "Saturdays", artist: "Perturbator", duration: "6:12", bpm: 136, genre: "Darksynth" },
];

const doItems = [
  "Use neon pink, cyan, purple palette",
  "Layer inset + outer shadow for Multidimensional Neon",
  "Apply perspective grid backgrounds",
  "Add sunset gradient: orange → pink → purple",
  "Use uppercase tracking-wider for retro text",
  "Activate Overvoltage Press on active state",
  "Apply Virtual Grid Shift on group hover",
  "Use Arcade Pulse on neon border elements",
];

const dontItems = [
  "No bright white backgrounds",
  "No modern minimalist design",
  "No omitting neon glow effects",
  "No formal serif or sans-serif fonts alone",
  "No single-direction neon (always inset + outer)",
  "No hover that changes only one shadow value",
  "No colored active state (Overvoltage collapses to white)",
  "No grid activation outside group-hover context",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ff00ff]/40" />
      <span className="text-xs font-bold text-[#ff00ff]/60 uppercase tracking-[0.3em]">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ff00ff]/40" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff] mb-12 text-center uppercase tracking-wider">
      {children}
    </h2>
  );
}

function NeonCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-gradient-to-br from-[#2d1b4e]/80 to-[#0d0221]/80 backdrop-blur-sm border border-[#ff00ff]/30 shadow-[0_0_30px_rgba(255,0,255,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Equalizer Bar Component ───────────────────────────────────────────────────

function EqualizerBars({ active, barCount = 12 }: { active: boolean; barCount?: number }) {
  const heights = [40, 70, 55, 85, 60, 90, 45, 75, 50, 80, 65, 35];
  return (
    <div className="flex items-end gap-[3px] h-16">
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: active ? `${heights[i % heights.length]}%` : "8%",
            background: i % 3 === 0
              ? "linear-gradient(to top, #ff00ff, #ff6ec7)"
              : i % 3 === 1
              ? "linear-gradient(to top, #00ffff, #7b68ee)"
              : "linear-gradient(to top, #7b68ee, #ff1493)",
            boxShadow: active
              ? i % 3 === 0
                ? "0 0 8px rgba(255,0,255,0.8)"
                : i % 3 === 1
                ? "0 0 8px rgba(0,255,255,0.8)"
                : "0 0 8px rgba(123,104,238,0.8)"
              : "none",
            transition: `height ${0.15 + (i % 5) * 0.05}s ease ${(i % 4) * 0.03}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Cassette Component ────────────────────────────────────────────────────────

function CassetteVisual({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Cassette body */}
      <div
        className="relative bg-[#0d0221] border-2 border-[#ff00ff]/60 shadow-[0_0_30px_rgba(255,0,255,0.4),inset_0_0_20px_rgba(0,0,0,0.8)]"
        style={{ borderRadius: "8px", padding: "16px 20px 20px" }}
      >
        {/* Label area */}
        <div
          className="bg-gradient-to-br from-[#2d1b4e] to-[#150050] border border-[#7b68ee]/50 mb-4"
          style={{ borderRadius: "4px", padding: "10px 12px" }}
        >
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#ff6ec7] uppercase tracking-[0.3em] mb-1">
              Side A
            </p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff] uppercase tracking-wider">
              Synthwave Mix
            </p>
            <p className="text-[9px] text-[#7b68ee]/70 uppercase tracking-wider mt-1">
              Vol. 1 — 1984
            </p>
          </div>
        </div>

        {/* Reels row */}
        <div className="flex items-center justify-between px-4">
          {/* Left reel */}
          <div
            className="relative w-14 h-14 border-2 border-[#ff00ff]/50 bg-[#150050] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.3)]"
            style={{
              borderRadius: "50%",
              animation: isPlaying ? "spin 2s linear infinite" : "none",
            }}
          >
            <div className="w-5 h-5 border-2 border-[#00ffff]/60 rounded-full bg-[#0d0221]" />
            {/* Spokes */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-px h-4 bg-[#ff00ff]/40"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                  transformOrigin: "bottom center",
                }}
              />
            ))}
          </div>

          {/* Center window */}
          <div className="w-16 h-8 bg-[#0d0221] border border-[#7b68ee]/30 flex items-center justify-center">
            <div
              className="h-1 w-10 rounded-full"
              style={{
                background: "linear-gradient(to right, #ff00ff, #00ffff)",
                boxShadow: "0 0 8px rgba(255,0,255,0.8)",
              }}
            />
          </div>

          {/* Right reel */}
          <div
            className="relative w-14 h-14 border-2 border-[#00ffff]/50 bg-[#150050] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            style={{
              borderRadius: "50%",
              animation: isPlaying ? "spin 3s linear infinite reverse" : "none",
            }}
          >
            <div className="w-5 h-5 border-2 border-[#ff6ec7]/60 rounded-full bg-[#0d0221]" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-px h-4 bg-[#00ffff]/40"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                  transformOrigin: "bottom center",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom notches */}
        <div className="flex justify-between mt-4 px-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-2 bg-[#ff00ff]/30" />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SynthwaveShowcase() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(72);
  const [playProgress, setPlayProgress] = useState(38);
  const [activeTab, setActiveTab] = useState(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Simulate playback progress when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayProgress((prev) => {
        if (prev >= 100) {
          setCurrentTrack((ct) => (ct + 1) % tracks.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const accordionItems = [
    {
      title: "What is Synthwave?",
      content:
        "Synthwave is an electronic music microgenre that emerged in the mid-2000s, rooted in 1980s film scores, video game soundtracks, and analog synthesizer music. Artists like Kavinsky, Perturbator, and Carpenter Brut define its sound.",
    },
    {
      title: "The Outrun Aesthetic",
      content:
        "Outrun borrows its visual language from the 1986 Sega arcade game. Neon perspective grids, rear-view chrome cars, and sunset horizons evoke the fantasy of endless driving through an 80s futurist dreamscape.",
    },
    {
      title: "Design Philosophy",
      content:
        "Every element must glow. Dark void backgrounds (#0d0221) serve as the canvas for magenta and cyan light. The design emulates a CRT monitor — scanlines, bloom, and multidimensional neon are not decorative: they are structural.",
    },
  ];

  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(to bottom, #0d0221, #150050, #2d1b4e, #0d0221)" }}
    >
      {/* ── Global CSS ───────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 -80px; }
        }
        @keyframes sunPulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.02); }
        }
        @keyframes scanlineMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.7; }
          97% { opacity: 1; }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,0,255,0.6), 0 0 60px rgba(255,0,255,0.3), 0 0 100px rgba(255,0,255,0.1); }
          50% { text-shadow: 0 0 30px rgba(255,0,255,0.9), 0 0 80px rgba(255,0,255,0.5), 0 0 120px rgba(255,0,255,0.2); }
        }
        .synth-title-glow {
          animation: titleGlow 3s ease-in-out infinite;
        }
        .synth-flicker {
          animation: neonFlicker 6s step-end infinite;
        }
        .synth-grid-scroll {
          animation: gridScroll 4s linear infinite;
        }
      `}</style>

      {/* ── Fixed Background: Sunset + Grid ──────────────────────────────────── */}

      {/* Sun */}
      <div
        className="fixed bottom-[18%] left-1/2 pointer-events-none z-0"
        style={{
          width: "480px",
          height: "240px",
          transform: "translateX(-50%)",
          animation: "sunPulse 4s ease-in-out infinite",
        }}
      >
        <div
          className="absolute inset-0 rounded-t-full"
          style={{
            background: "linear-gradient(to top, #fca311, #ff6b35, #ff1493, #7b68ee, transparent)",
            opacity: 0.85,
          }}
        />
        {/* Sun scanlines */}
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              height: "4px",
              background: "#0d0221",
              bottom: `${28 + i * 22}px`,
            }}
          />
        ))}
      </div>

      {/* Mountain silhouette */}
      <div className="fixed pointer-events-none z-0" style={{ bottom: "14%", left: 0, right: 0, height: "160px" }}>
        <svg viewBox="0 0 1440 160" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d1b4e" />
              <stop offset="100%" stopColor="#150050" />
            </linearGradient>
          </defs>
          <polygon
            points="0,160 0,110 80,70 160,100 300,30 440,80 560,10 680,55 800,20 960,65 1100,35 1260,75 1380,45 1440,80 1440,160"
            fill="url(#mtnGrad)"
          />
        </svg>
      </div>

      {/* Grid floor */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden" style={{ height: "18%" }}>
        <div
          className="absolute inset-0 synth-grid-scroll"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,0,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: "perspective(400px) rotateX(70deg)",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      {/* Scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
        }}
      />

      {/* ── Navigation ───────────────────────────────────────────────────────── */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#ff00ff]/25 backdrop-blur-md bg-[#0d0221]/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/synthwave"
            className="group flex items-center gap-2 text-[#ff6ec7] hover:text-[#ff00ff] transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold uppercase tracking-[0.15em] text-sm">Back to Docs</span>
          </Link>

          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-[#ff00ff] rounded-full synth-flicker"
              style={{ boxShadow: "0 0 8px rgba(255,0,255,1)" }}
            />
            <span
              className="font-black text-lg uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#7b68ee] to-[#00ffff]"
            >
              SYNTHWAVE
            </span>
            <div
              className="w-2 h-2 bg-[#00ffff] rounded-full synth-flicker"
              style={{ boxShadow: "0 0 8px rgba(0,255,255,1)", animationDelay: "1.5s" }}
            />
          </div>

          <Link
            href="/styles"
            className="px-4 py-2 border border-[#ff00ff]/50 text-[#ff00ff] font-bold uppercase tracking-wider text-sm shadow-[0_0_12px_rgba(255,0,255,0.3)] hover:bg-[#ff00ff]/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:border-[#ff00ff] transition-all duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-28 pb-32 px-6 text-center">
        <div
          ref={heroRef}
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <p className="text-xs font-bold text-[#ff6ec7]/70 uppercase tracking-[0.5em] mb-6">
            Est. 2000s — Rooted in 1984
          </p>

          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#ff6ec7] via-[#ff00ff] to-[#7b68ee] mb-4 synth-title-glow leading-none"
          >
            SYNTH
          </h1>
          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#00ffff] via-[#7b68ee] to-[#ff1493] mb-8 leading-none"
            style={{ textShadow: "0 0 40px rgba(0,255,255,0.4)" }}
          >
            WAVE
          </h1>

          <p className="text-xl md:text-2xl text-[#ff6ec7]/80 max-w-xl mx-auto mb-3 tracking-wide font-light">
            Ride into the sunset. Drive through the neon grid.
          </p>
          <p className="text-sm text-[#7b68ee]/60 uppercase tracking-[0.3em] mb-12">
            80s Synthesizer Music Aesthetic
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button
              className="group px-10 py-4 bg-transparent border-2 border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(255,0,255,0.4),inset_0_0_10px_rgba(0,255,255,0.2)] hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.8),inset_0_0_20px_rgba(255,0,255,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out"
            >
              Drive Now
            </button>
            <button
              className="group px-10 py-4 bg-gradient-to-r from-[#ff00ff] via-[#7b68ee] to-[#ff00ff] bg-[length:200%_100%] text-white font-bold uppercase tracking-[0.15em] shadow-[0_0_30px_rgba(255,0,255,0.5)] hover:shadow-[0_0_50px_rgba(255,0,255,0.8)] hover:bg-right active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-500 ease-out"
            >
              Enter the Grid
            </button>
          </div>
        </div>
      </section>

      {/* ── Music Player / Equalizer Section ─────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Music Production</SectionLabel>
            <SectionHeading>Synthwave Station</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Cassette + Player Controls */}
            <RevealBlock delay={0.1}>
              <NeonCard className="p-8">
                <div className="mb-6">
                  <CassetteVisual isPlaying={isPlaying} />
                </div>

                {/* Track info */}
                <div className="text-center mb-6">
                  <p className="text-[10px] text-[#ff6ec7]/60 uppercase tracking-[0.3em] mb-1">
                    Now Playing
                  </p>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff] uppercase tracking-wider">
                    {tracks[currentTrack].title}
                  </h3>
                  <p className="text-sm text-[#7b68ee]/80 mt-1">{tracks[currentTrack].artist}</p>
                  <p className="text-xs text-[#ff6ec7]/50 uppercase tracking-[0.2em] mt-1">
                    {tracks[currentTrack].genre} — {tracks[currentTrack].bpm} BPM
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#ff6ec7]/60">
                      {String(Math.floor((playProgress / 100) * 4)).padStart(2, "0")}:
                      {String(Math.floor(((playProgress / 100) * 4 * 60) % 60)).padStart(2, "0")}
                    </span>
                    <span className="text-[#7b68ee]/60">{tracks[currentTrack].duration}</span>
                  </div>
                  <div className="h-1 bg-[#150050] border border-[#ff00ff]/20 overflow-hidden">
                    <div
                      className="h-full shadow-[0_0_12px_rgba(255,0,255,0.8)] transition-all duration-300"
                      style={{
                        width: `${playProgress}%`,
                        background: "linear-gradient(to right, #ff00ff, #00ffff)",
                      }}
                    />
                  </div>
                </div>

                {/* Transport controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentTrack((ct) => (ct - 1 + tracks.length) % tracks.length)}
                    className="w-10 h-10 border border-[#ff00ff]/40 text-[#ff6ec7] hover:border-[#ff00ff] hover:text-[#ff00ff] hover:shadow-[0_0_12px_rgba(255,0,255,0.4)] transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="w-16 h-16 border-2 border-[#ff00ff] text-[#00ffff] font-bold shadow-[0_0_15px_rgba(255,0,255,0.4),inset_0_0_10px_rgba(0,255,255,0.2)] hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.8),inset_0_0_20px_rgba(255,0,255,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentTrack((ct) => (ct + 1) % tracks.length)}
                    className="w-10 h-10 border border-[#ff00ff]/40 text-[#ff6ec7] hover:border-[#ff00ff] hover:text-[#ff00ff] hover:shadow-[0_0_12px_rgba(255,0,255,0.4)] transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#7b68ee]/60 uppercase tracking-wider w-12">Vol</span>
                  <div className="flex-1 relative h-1 bg-[#150050] border border-[#00ffff]/20">
                    <div
                      className="h-full shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all duration-200"
                      style={{
                        width: `${volume}%`,
                        background: "linear-gradient(to right, #00ffff, #7b68ee)",
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs font-mono text-[#00ffff]/70 w-8 text-right">{volume}</span>
                </div>
              </NeonCard>
            </RevealBlock>

            {/* Right: Equalizer + Track List */}
            <div className="space-y-6">
              <RevealBlock delay={0.2}>
                <NeonCard className="p-6">
                  <p className="text-xs font-bold text-[#ff00ff]/70 uppercase tracking-[0.3em] mb-4">
                    Spectrum Analyzer
                  </p>
                  <EqualizerBars active={isPlaying} barCount={16} />
                  <p className="text-[10px] text-[#7b68ee]/50 uppercase tracking-[0.2em] mt-3 text-center">
                    {isPlaying ? "Signal Active — Processing" : "Signal Idle — Press Play"}
                  </p>
                </NeonCard>
              </RevealBlock>

              <RevealBlock delay={0.3}>
                <NeonCard className="overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#ff00ff]/20">
                    <p className="text-xs font-bold text-[#00ffff]/70 uppercase tracking-[0.3em]">
                      Track Queue
                    </p>
                  </div>
                  {tracks.map((track, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentTrack(i);
                        setPlayProgress(0);
                        setIsPlaying(true);
                      }}
                      className={`w-full flex items-center gap-4 px-6 py-4 border-b border-[#ff00ff]/10 text-left transition-all duration-200 group hover:bg-[#ff00ff]/5 ${
                        currentTrack === i ? "bg-[#ff00ff]/10" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 border flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                          currentTrack === i
                            ? "border-[#ff00ff] text-[#00ffff] shadow-[0_0_10px_rgba(255,0,255,0.5)]"
                            : "border-[#7b68ee]/30 text-[#7b68ee]/50 group-hover:border-[#ff00ff]/50"
                        }`}
                      >
                        {currentTrack === i && isPlaying ? (
                          <span className="text-[#ff00ff] text-[10px]">&#9654;</span>
                        ) : (
                          <span>{String(i + 1).padStart(2, "0")}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold uppercase tracking-wider truncate transition-colors duration-200 ${
                            currentTrack === i ? "text-[#ff00ff]" : "text-[#ff6ec7]/80 group-hover:text-[#ff6ec7]"
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="text-xs text-[#7b68ee]/60 mt-0.5">{track.artist}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-mono text-[#00ffff]/60">{track.duration}</p>
                        <p className="text-[10px] text-[#7b68ee]/40 uppercase">{track.genre}</p>
                      </div>
                    </button>
                  ))}
                </NeonCard>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ── Component Demos: Button ───────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Component System</SectionLabel>
            <SectionHeading>Neon Buttons</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Multidimensional Neon demo */}
            <RevealBlock delay={0.1}>
              <NeonCard className="p-8">
                <p className="text-xs font-bold text-[#ff00ff]/60 uppercase tracking-[0.25em] mb-1">
                  Multidimensional Neon
                </p>
                <p className="text-[11px] text-[#7b68ee]/50 mb-6">
                  Simultaneous inset cyan + outer magenta glow — two neon tubes from opposite directions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-transparent border-2 border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,255,0.4),inset_0_0_10px_rgba(0,255,255,0.2)] hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.8),inset_0_0_20px_rgba(255,0,255,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out">
                    Start
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-[#00ffff] text-[#ff00ff] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.4),inset_0_0_10px_rgba(255,0,255,0.2)] hover:border-[#ff00ff] hover:shadow-[0_0_30px_rgba(255,0,255,0.8),inset_0_0_20px_rgba(0,255,255,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out">
                    Load
                  </button>
                </div>
              </NeonCard>
            </RevealBlock>

            {/* Overvoltage Press demo */}
            <RevealBlock delay={0.15}>
              <NeonCard className="p-8">
                <p className="text-xs font-bold text-[#00ffff]/60 uppercase tracking-[0.25em] mb-1">
                  Overvoltage Press
                </p>
                <p className="text-[11px] text-[#7b68ee]/50 mb-6">
                  Active state collapses all neon to pure white. Click and hold to witness the power surge.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#ff00ff] to-[#7b68ee] text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_35px_rgba(255,0,255,0.8)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out">
                    Overload
                  </button>
                  <button className="px-8 py-4 bg-gradient-to-r from-[#00ffff] to-[#7b68ee] text-[#0d0221] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_35px_rgba(0,255,255,0.8)] active:scale-90 active:bg-white active:text-[#0d0221] active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out">
                    Surge
                  </button>
                </div>
              </NeonCard>
            </RevealBlock>

            {/* Arcade Pulse */}
            <RevealBlock delay={0.2}>
              <NeonCard className="p-8">
                <p className="text-xs font-bold text-[#ff6ec7]/60 uppercase tracking-[0.25em] mb-1">
                  Arcade Pulse
                </p>
                <p className="text-[11px] text-[#7b68ee]/50 mb-6">
                  CRT screen energizes on hover. Neon border pulses like a coin-op cabinet waking up.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="group px-8 py-4 border-2 border-[#ff6ec7] text-[#ff6ec7] font-bold uppercase tracking-wider hover:animate-pulse hover:border-[#ff1493] hover:text-[#ff1493] hover:shadow-[0_0_25px_rgba(255,20,147,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200">
                    Insert Coin
                  </button>
                  <button className="group px-8 py-4 border-2 border-[#7b68ee] text-[#7b68ee] font-bold uppercase tracking-wider hover:animate-pulse hover:border-[#ff00ff] hover:text-[#ff00ff] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200">
                    Player 2
                  </button>
                </div>
              </NeonCard>
            </RevealBlock>

            {/* Button sizes */}
            <RevealBlock delay={0.25}>
              <NeonCard className="p-8">
                <p className="text-xs font-bold text-[#7b68ee]/60 uppercase tracking-[0.25em] mb-6">
                  Size Variants
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="px-4 py-2 text-xs bg-transparent border border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(255,0,255,0.3),inset_0_0_6px_rgba(0,255,255,0.1)] hover:shadow-[0_0_16px_rgba(0,255,255,0.6),inset_0_0_12px_rgba(255,0,255,0.4)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200">
                    XS
                  </button>
                  <button className="px-6 py-3 text-sm bg-transparent border-2 border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(255,0,255,0.35),inset_0_0_8px_rgba(0,255,255,0.15)] hover:shadow-[0_0_24px_rgba(0,255,255,0.7),inset_0_0_16px_rgba(255,0,255,0.5)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200">
                    SM
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,255,0.4),inset_0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8),inset_0_0_20px_rgba(255,0,255,0.6)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200">
                    MD
                  </button>
                  <button className="px-10 py-5 text-lg bg-transparent border-2 border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5),inset_0_0_15px_rgba(0,255,255,0.25)] hover:shadow-[0_0_40px_rgba(0,255,255,0.9),inset_0_0_25px_rgba(255,0,255,0.7)] active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200">
                    LG
                  </button>
                </div>
              </NeonCard>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Component Demos: Cards ───────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Component System</SectionLabel>
            <SectionHeading>Retro Future Cards</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Virtual Grid Shift card */}
            <RevealBlock delay={0.1}>
              <div className="group relative p-8 bg-gradient-to-b from-[#2d1b4e]/80 to-[#0d0221]/80 border border-[#ff00ff]/50 shadow-[0_0_20px_rgba(255,0,255,0.2)] overflow-hidden cursor-pointer hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] transition-shadow duration-300 h-full">
                {/* Virtual Grid Shift */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,0,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10">
                  <div className="h-[2px] w-8 bg-[#ff00ff] shadow-[0_0_6px_#ff00ff] group-hover:bg-[#00ffff] group-hover:shadow-[0_0_10px_#00ffff] transition-colors duration-300 mb-4" />
                  <div className="w-12 h-12 border border-[#ff00ff]/50 flex items-center justify-center mb-4 group-hover:border-[#00ffff] group-hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-300">
                    <svg className="w-6 h-6 text-[#ff00ff] group-hover:text-[#00ffff] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#7b68ee] group-hover:from-white group-hover:to-[#00ffff] transition-all duration-500 mb-3 uppercase tracking-wider">
                    RETRO FUTURE
                  </h3>
                  <p className="text-[#ff6ec7]/70 text-sm leading-relaxed mb-4">
                    Step into the neon dimension. The grid expands as you approach the horizon.
                  </p>
                  <span className="text-xs text-[#ff00ff]/60 group-hover:text-[#00ffff] uppercase tracking-wider transition-colors duration-300">
                    Engage →
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Sunset card */}
            <RevealBlock delay={0.15}>
              <div className="group relative p-8 bg-gradient-to-b from-[#2d1b4e]/80 to-[#0d0221]/80 border border-[#00ffff]/50 shadow-[0_0_20px_rgba(0,255,255,0.2)] overflow-hidden cursor-pointer hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-shadow duration-300 h-full">
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10">
                  <div className="h-[2px] w-8 bg-[#00ffff] shadow-[0_0_6px_#00ffff] group-hover:bg-[#ff00ff] group-hover:shadow-[0_0_10px_#ff00ff] transition-colors duration-300 mb-4" />
                  <div className="w-12 h-12 border border-[#00ffff]/50 flex items-center justify-center mb-4 group-hover:border-[#ff00ff] group-hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] transition-all duration-300">
                    <svg className="w-6 h-6 text-[#00ffff] group-hover:text-[#ff00ff] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#7b68ee] group-hover:from-white group-hover:to-[#ff00ff] transition-all duration-500 mb-3 uppercase tracking-wider">
                    SUNSET DRIVE
                  </h3>
                  <p className="text-[#ff6ec7]/70 text-sm leading-relaxed mb-4">
                    Chase the endless horizon. Orange bleeds into pink bleeds into purple.
                  </p>
                  <span className="text-xs text-[#00ffff]/60 group-hover:text-[#ff00ff] uppercase tracking-wider transition-colors duration-300">
                    Chase →
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Night Drive card */}
            <RevealBlock delay={0.2}>
              <div className="group relative p-8 bg-gradient-to-b from-[#2d1b4e]/80 to-[#0d0221]/80 border border-[#7b68ee]/50 shadow-[0_0_20px_rgba(123,104,238,0.2)] overflow-hidden cursor-pointer hover:shadow-[0_0_40px_rgba(123,104,238,0.4)] transition-shadow duration-300 h-full">
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(123,104,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(123,104,238,0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10">
                  <div className="h-[2px] w-8 bg-[#7b68ee] shadow-[0_0_6px_#7b68ee] group-hover:bg-[#ff6ec7] group-hover:shadow-[0_0_10px_#ff6ec7] transition-colors duration-300 mb-4" />
                  <div className="w-12 h-12 border border-[#7b68ee]/50 flex items-center justify-center mb-4 group-hover:border-[#ff6ec7] group-hover:shadow-[0_0_15px_rgba(255,110,199,0.5)] transition-all duration-300">
                    <svg className="w-6 h-6 text-[#7b68ee] group-hover:text-[#ff6ec7] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7b68ee] to-[#ff6ec7] group-hover:from-white group-hover:to-[#ff1493] transition-all duration-500 mb-3 uppercase tracking-wider">
                    NIGHT CRUISE
                  </h3>
                  <p className="text-[#ff6ec7]/70 text-sm leading-relaxed mb-4">
                    Cruise the endless night road to the rhythm of a darksynth pulse.
                  </p>
                  <span className="text-xs text-[#7b68ee]/60 group-hover:text-[#ff6ec7] uppercase tracking-wider transition-colors duration-300">
                    Cruise →
                  </span>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Component Demos: Input ───────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Component System</SectionLabel>
            <SectionHeading>Input Fields</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <NeonCard className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#ff00ff] uppercase tracking-[0.25em] mb-2">
                    Artist Handle
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your alias..."
                    className="w-full px-6 py-4 bg-[#0d0221]/80 border-2 border-[#00ffff]/50 text-[#00ffff] placeholder-[#00ffff]/30 shadow-[0_0_10px_rgba(0,255,255,0.1)] focus:border-[#ff00ff] focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00ffff] uppercase tracking-[0.25em] mb-2">
                    Track Title
                  </label>
                  <input
                    type="text"
                    placeholder="Name your track..."
                    className="w-full px-6 py-4 bg-[#0d0221]/80 border-2 border-[#ff00ff]/50 text-[#ff6ec7] placeholder-[#ff6ec7]/30 shadow-[0_0_10px_rgba(255,0,255,0.1)] focus:border-[#00ffff] focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#7b68ee] uppercase tracking-[0.25em] mb-2">
                    Genre
                  </label>
                  <select className="w-full px-6 py-4 bg-[#0d0221]/80 border-2 border-[#7b68ee]/50 text-[#7b68ee] shadow-[0_0_10px_rgba(123,104,238,0.1)] focus:border-[#ff00ff] focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all duration-200 appearance-none">
                    <option value="">Select genre...</option>
                    <option value="retrowave">Retrowave</option>
                    <option value="darksynth">Darksynth</option>
                    <option value="synthpop">Synthpop</option>
                    <option value="outrun">Outrun</option>
                  </select>
                </div>
              </NeonCard>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <NeonCard className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#ff6ec7] uppercase tracking-[0.25em] mb-2">
                    BPM
                  </label>
                  <input
                    type="number"
                    placeholder="120"
                    className="w-full px-6 py-4 bg-[#0d0221]/80 border-2 border-[#ff6ec7]/50 text-[#ff6ec7] placeholder-[#ff6ec7]/30 shadow-[0_0_10px_rgba(255,110,199,0.1)] focus:border-[#ff00ff] focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all duration-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#ff1493] uppercase tracking-[0.25em] mb-2">
                    Notes / Lyrics
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your story in neon..."
                    className="w-full px-6 py-4 bg-[#0d0221]/80 border-2 border-[#ff1493]/50 text-[#ff6ec7] placeholder-[#ff1493]/30 shadow-[0_0_10px_rgba(255,20,147,0.1)] focus:border-[#ff00ff] focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>
                <button className="w-full px-6 py-4 bg-transparent border-2 border-[#ff00ff] text-[#00ffff] font-bold uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(255,0,255,0.4),inset_0_0_10px_rgba(0,255,255,0.2)] hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.8),inset_0_0_20px_rgba(255,0,255,0.6)] active:scale-95 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200 ease-out">
                  Upload Track
                </button>
              </NeonCard>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Color Palette ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Color System</SectionLabel>
            <SectionHeading>Neon Palette</SectionHeading>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {palette.map((color, i) => (
              <RevealBlock key={color.hex} delay={0.05 * i}>
                <div className="group cursor-pointer">
                  <div
                    className="h-32 md:h-40 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: color.hex,
                      boxShadow: `0 0 30px ${color.hex}60`,
                    }}
                  />
                  <div className="mt-3 px-1">
                    <p className="text-sm font-bold text-[#ff6ec7]/90 uppercase tracking-wider">
                      {color.name}
                    </p>
                    <p className="text-xs font-mono text-[#7b68ee]/60 mt-0.5">{color.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient strips */}
          <RevealBlock delay={0.3} className="mt-8 space-y-3">
            <div>
              <p className="text-xs text-[#7b68ee]/50 uppercase tracking-[0.25em] mb-2">Sunset Gradient</p>
              <div
                className="h-8 shadow-[0_0_20px_rgba(255,0,255,0.3)]"
                style={{ background: "linear-gradient(to right, #0d0221, #4a1942, #ff1493, #ff6b35, #fca311)" }}
              />
            </div>
            <div>
              <p className="text-xs text-[#7b68ee]/50 uppercase tracking-[0.25em] mb-2">Neon Spectrum</p>
              <div
                className="h-8 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                style={{ background: "linear-gradient(to right, #ff00ff, #7b68ee, #00ffff, #ff6ec7, #ff1493)" }}
              />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Tabs + Accordions ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Interactive Components</SectionLabel>
            <SectionHeading>Controls</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tabs */}
            <RevealBlock delay={0.1}>
              <NeonCard className="p-8">
                <p className="text-xs font-bold text-[#ff00ff]/60 uppercase tracking-[0.25em] mb-6">
                  Navigation Tabs
                </p>
                <div className="flex border-b border-[#ff00ff]/20 mb-6">
                  {["Overview", "Tracks", "Artists"].map((label, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`px-5 py-3 font-bold uppercase tracking-wider text-xs transition-all duration-200 ${
                        activeTab === i
                          ? "text-[#ff00ff] border-b-2 border-[#ff00ff] shadow-[0_4px_12px_rgba(255,0,255,0.4)]"
                          : "text-[#7b68ee]/50 hover:text-[#ff6ec7]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="min-h-[100px]">
                  {activeTab === 0 && (
                    <div>
                      <h4 className="text-base font-bold text-[#ff00ff] mb-2 uppercase tracking-wider">
                        Welcome to Synthwave
                      </h4>
                      <p className="text-sm text-[#ff6ec7]/70 leading-relaxed">
                        Experience the nostalgic future through neon-lit interfaces, retro grids, and analog warmth.
                      </p>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <h4 className="text-base font-bold text-[#00ffff] mb-3 uppercase tracking-wider">
                        Featured Tracks
                      </h4>
                      <ul className="space-y-2">
                        {["Midnight Drive", "Neon Dreams", "Electric Sunset"].map((t) => (
                          <li key={t} className="flex items-center gap-2 text-sm text-[#ff6ec7]/70">
                            <span className="w-1.5 h-1.5 bg-[#ff00ff] rounded-full shadow-[0_0_6px_rgba(255,0,255,0.8)]" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div>
                      <h4 className="text-base font-bold text-[#7b68ee] mb-3 uppercase tracking-wider">
                        Top Artists
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Kavinsky", "Perturbator", "Carpenter Brut", "FM-84"].map((a) => (
                          <span
                            key={a}
                            className="px-3 py-1 border border-[#7b68ee]/40 text-[#7b68ee] text-xs font-bold uppercase tracking-wider"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </NeonCard>
            </RevealBlock>

            {/* Toggles */}
            <RevealBlock delay={0.15}>
              <NeonCard className="p-8">
                <p className="text-xs font-bold text-[#00ffff]/60 uppercase tracking-[0.25em] mb-6">
                  System Toggles
                </p>
                <div className="space-y-5">
                  {[
                    { label: "Neon Mode", color: "#ff00ff", shadow: "rgba(255,0,255,0.8)" },
                    { label: "Grid Lines", color: "#00ffff", shadow: "rgba(0,255,255,0.8)" },
                    { label: "Scanlines", color: "#7b68ee", shadow: "rgba(123,104,238,0.8)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-[#ff6ec7]/80 font-medium">{item.label}</span>
                      <button
                        onClick={() => {
                          const next = [...toggleStates];
                          next[i] = !next[i];
                          setToggleStates(next);
                        }}
                        className="relative w-14 h-7 border-2 transition-all duration-300"
                        style={{
                          borderColor: toggleStates[i] ? item.color : "rgba(255,0,255,0.2)",
                          background: toggleStates[i] ? `${item.color}25` : "transparent",
                          boxShadow: toggleStates[i] ? `0 0 12px ${item.shadow}` : "none",
                        }}
                      >
                        <span
                          className="absolute top-0.5 w-4 h-4 transition-all duration-300"
                          style={{
                            left: toggleStates[i] ? "calc(100% - 20px)" : "3px",
                            background: toggleStates[i] ? item.color : "rgba(255,0,255,0.3)",
                            boxShadow: toggleStates[i] ? `0 0 8px ${item.shadow}` : "none",
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </NeonCard>
            </RevealBlock>
          </div>

          {/* Accordion */}
          <RevealBlock delay={0.2} className="mt-8">
            <div className="space-y-3">
              {accordionItems.map((item, i) => (
                <div
                  key={i}
                  className="border transition-all duration-300"
                  style={{
                    borderColor: openAccordion === i ? "rgba(255,0,255,0.5)" : "rgba(255,0,255,0.15)",
                    background: "linear-gradient(to br, rgba(45,27,78,0.7), rgba(13,2,33,0.7))",
                    boxShadow: openAccordion === i ? "0 0 20px rgba(255,0,255,0.2)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-bold text-[#ff6ec7] uppercase tracking-wider text-sm">
                      {item.title}
                    </span>
                    <svg
                      className="w-4 h-4 text-[#ff00ff] transition-transform duration-300"
                      style={{ transform: openAccordion === i ? "rotate(180deg)" : "rotate(0deg)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openAccordion === i ? "200px" : "0",
                      opacity: openAccordion === i ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-5 text-sm text-[#ff6ec7]/60 leading-relaxed border-t border-[#ff00ff]/10 pt-3">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Design Rules: Do / Don't ──────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Design System</SectionLabel>
            <SectionHeading>Rules of the Grid</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <NeonCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 flex items-center justify-center border-2 border-[#00ffff] text-[#00ffff] font-black text-sm shadow-[0_0_12px_rgba(0,255,255,0.5)]"
                  >
                    DO
                  </div>
                  <span className="text-sm font-bold text-[#00ffff] uppercase tracking-[0.2em]">
                    Neon Law
                  </span>
                </div>
                <ul className="space-y-3">
                  {doItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#ff6ec7]/80">
                      <span
                        className="mt-1 w-4 h-4 shrink-0 flex items-center justify-center border border-[#00ffff]/60 text-[#00ffff] text-[10px] font-bold"
                        style={{ boxShadow: "0 0 6px rgba(0,255,255,0.4)" }}
                      >
                        &#10003;
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </NeonCard>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <NeonCard className="p-8 border-[#ff1493]/30 shadow-[0_0_30px_rgba(255,20,147,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-8 flex items-center justify-center border-2 border-[#ff1493] text-[#ff1493] font-black text-xs shadow-[0_0_12px_rgba(255,20,147,0.5)]"
                  >
                    DONT
                  </div>
                  <span className="text-sm font-bold text-[#ff1493] uppercase tracking-[0.2em]">
                    Grid Violations
                  </span>
                </div>
                <ul className="space-y-3">
                  {dontItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#ff6ec7]/80">
                      <span
                        className="mt-1 w-4 h-4 shrink-0 flex items-center justify-center border border-[#ff1493]/60 text-[#ff1493] text-[10px] font-bold"
                        style={{ boxShadow: "0 0 6px rgba(255,20,147,0.4)" }}
                      >
                        &#10007;
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </NeonCard>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Typography Section ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Type System</SectionLabel>
            <SectionHeading>Chrome Type</SectionHeading>
          </RevealBlock>

          <div className="space-y-8">
            <RevealBlock delay={0.1}>
              <NeonCard className="p-10 text-center">
                <h2
                  className="text-5xl md:text-7xl font-black uppercase tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#ff6ec7] via-[#ff00ff] to-[#7b68ee]"
                  style={{ textShadow: "0 0 30px rgba(255,0,255,0.5)" }}
                >
                  KAVINSKY
                </h2>
                <p className="text-xs text-[#7b68ee]/50 uppercase tracking-[0.4em]">Display — H1 Neon Chrome</p>
              </NeonCard>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="grid md:grid-cols-2 gap-6">
                <NeonCard className="p-8">
                  <h3
                    className="text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#7b68ee] mb-2"
                    style={{ textShadow: "0 0 20px rgba(0,255,255,0.4)" }}
                  >
                    Midnight City
                  </h3>
                  <p className="text-xs text-[#7b68ee]/50 uppercase tracking-[0.3em]">Heading — H3 Cyan Glow</p>
                  <div className="mt-4 h-px bg-gradient-to-r from-[#00ffff]/50 to-transparent" />
                  <p className="mt-4 text-sm text-[#ff6ec7]/70 leading-relaxed">
                    Body text rides the grid. Every letter is tuned to the frequency of the open road. Tracking wide, serif never.
                  </p>
                  <p className="text-xs text-[#7b68ee]/50 uppercase tracking-[0.3em] mt-2">Body — 14px tracking-wide</p>
                </NeonCard>

                <NeonCard className="p-8">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-[#ff00ff] uppercase tracking-[0.3em]">Monospace / Code</span>
                      <p className="font-mono text-[#00ffff] text-sm mt-2 bg-[#0d0221]/80 px-3 py-2 border border-[#00ffff]/20">
                        BPM: 136 | KEY: A_MIN | WAVE: SAW
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#00ffff] uppercase tracking-[0.3em]">Caption</span>
                      <p className="text-xs text-[#7b68ee]/60 uppercase tracking-[0.3em] mt-2">
                        Recorded on Korg MS-20 — 1984
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#7b68ee] uppercase tracking-[0.3em]">Label / Tag</span>
                      <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 border border-[#ff00ff]/50 text-[#ff00ff] text-xs font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(255,0,255,0.3)]">
                          Synthwave
                        </span>
                        <span className="px-3 py-1 border border-[#00ffff]/50 text-[#00ffff] text-xs font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(0,255,255,0.3)]">
                          Outrun
                        </span>
                      </div>
                    </div>
                  </div>
                </NeonCard>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Synthesizer UI / Knobs Section ───────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Retro Hardware</SectionLabel>
            <SectionHeading>Synthesizer Panel</SectionHeading>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <NeonCard className="p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Oscillator", value: 78, color: "#ff00ff" },
                  { label: "Filter", value: 45, color: "#00ffff" },
                  { label: "Reverb", value: 62, color: "#7b68ee" },
                  { label: "Delay", value: 33, color: "#ff6ec7" },
                ].map((knob, i) => (
                  <div key={i} className="text-center">
                    {/* Knob visual */}
                    <div
                      className="w-20 h-20 mx-auto border-4 rounded-full flex items-center justify-center relative mb-3"
                      style={{
                        borderColor: knob.color,
                        boxShadow: `0 0 20px ${knob.color}60, inset 0 0 15px ${knob.color}20`,
                        background: "#0d0221",
                      }}
                    >
                      {/* Indicator line */}
                      <div
                        className="absolute inset-2 rounded-full flex items-start justify-center"
                        style={{ transform: `rotate(${(knob.value / 100) * 270 - 135}deg)` }}
                      >
                        <div
                          className="w-1 h-6 rounded-full mt-1"
                          style={{ background: knob.color, boxShadow: `0 0 8px ${knob.color}` }}
                        />
                      </div>
                      <span className="text-xs font-mono" style={{ color: knob.color }}>
                        {knob.value}
                      </span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] mb-1" style={{ color: knob.color }}>
                      {knob.label}
                    </p>
                    <div
                      className="h-1 w-full"
                      style={{
                        background: `linear-gradient(to right, ${knob.color}, transparent)`,
                        opacity: 0.4,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-3">
                {["SAW", "SQR", "TRI", "SIN", "NOI", "PWM"].map((wave) => (
                  <button
                    key={wave}
                    className="py-3 border border-[#ff00ff]/40 text-[#ff6ec7] font-mono font-bold text-xs uppercase tracking-wider hover:border-[#ff00ff] hover:text-[#ff00ff] hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:animate-pulse active:scale-90 active:bg-white active:text-black active:shadow-[0_0_50px_#ffffff] transition-all duration-200"
                  >
                    {wave}
                  </button>
                ))}
              </div>

              {/* VU Meter */}
              <div className="mt-8">
                <p className="text-xs text-[#7b68ee]/50 uppercase tracking-[0.3em] mb-3">VU Meter — Output Level</p>
                <div className="flex gap-1 h-8">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const pct = (i / 24) * 100;
                    const color = pct < 60 ? "#00ffff" : pct < 80 ? "#ff6ec7" : "#ff1493";
                    const active = pct < 72;
                    return (
                      <div
                        key={i}
                        className="flex-1 transition-all duration-100"
                        style={{
                          background: active ? color : `${color}20`,
                          boxShadow: active ? `0 0 6px ${color}80` : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </NeonCard>
          </RevealBlock>
        </div>
      </section>

      {/* ── VHS / Retro Media Section ─────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionLabel>Retro Media</SectionLabel>
            <SectionHeading>VHS Archive</SectionHeading>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Night Drive Vol. 1", year: "1984", runtime: "60 MIN", color: "#ff00ff" },
              { title: "Outrun Sessions", year: "1986", runtime: "90 MIN", color: "#00ffff" },
              { title: "Neon Dreams", year: "1988", runtime: "45 MIN", color: "#7b68ee" },
            ].map((tape, i) => (
              <RevealBlock key={i} delay={0.1 * i}>
                <div
                  className="group relative overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: `${tape.color}40`,
                    boxShadow: `0 0 20px ${tape.color}20`,
                    background: "linear-gradient(135deg, #2d1b4e80, #0d022180)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${tape.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${tape.color}20`;
                  }}
                >
                  {/* VHS label */}
                  <div className="h-28 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(${tape.color}40 1px, transparent 1px), linear-gradient(90deg, ${tape.color}40 1px, transparent 1px)`,
                        backgroundSize: "15px 15px",
                      }}
                    />
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] mb-1" style={{ color: tape.color }}>
                          VHS — BETA
                        </p>
                        <p
                          className="text-xl font-black uppercase tracking-wider"
                          style={{
                            color: tape.color,
                            textShadow: `0 0 15px ${tape.color}`,
                          }}
                        >
                          {tape.title}
                        </p>
                      </div>
                    </div>
                    {/* Scanlines on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                      }}
                    />
                  </div>
                  <div className="p-5 border-t" style={{ borderColor: `${tape.color}20` }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-[#7b68ee]/60 uppercase tracking-wider">Year</p>
                        <p className="font-mono font-bold text-[#ff6ec7]">{tape.year}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#7b68ee]/60 uppercase tracking-wider">Runtime</p>
                        <p className="font-mono font-bold" style={{ color: tape.color }}>
                          {tape.runtime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-16 px-6 border-t border-[#ff00ff]/20 backdrop-blur-sm bg-[#0d0221]/60 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-6xl font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#7b68ee] to-[#00ffff] mb-4"
            >
              SYNTHWAVE
            </h2>
            <p className="text-sm text-[#7b68ee]/50 uppercase tracking-[0.4em]">
              Est. 2000s — Rooted in 1984
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <p className="text-xs font-bold text-[#ff00ff]/60 uppercase tracking-[0.25em] mb-4">Philosophy</p>
              <p className="text-sm text-[#ff6ec7]/60 leading-relaxed">
                Synthwave is about the feeling of driving alone at night on an empty highway in 1984, with the synthesizer playing in the background.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#00ffff]/60 uppercase tracking-[0.25em] mb-4">Key Artists</p>
              <ul className="space-y-2">
                {["Kavinsky", "Perturbator", "Carpenter Brut", "FM-84", "Gunship"].map((a) => (
                  <li key={a} className="text-sm text-[#ff6ec7]/60 flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full bg-[#00ffff]"
                      style={{ boxShadow: "0 0 4px rgba(0,255,255,0.8)" }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-[#7b68ee]/60 uppercase tracking-[0.25em] mb-4">StyleKit</p>
              <p className="text-sm text-[#ff6ec7]/60 leading-relaxed mb-4">
                Part of the StyleKit Design System — a curated collection of visual aesthetics.
              </p>
              <Link
                href="/styles"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#ff00ff] uppercase tracking-wider hover:text-[#00ffff] transition-colors duration-200"
              >
                Browse All Styles
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="border-t border-[#ff00ff]/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#7b68ee]/40 uppercase tracking-[0.3em]">
              StyleKit — Synthwave Design System
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/styles/synthwave"
                className="text-xs text-[#ff6ec7]/50 hover:text-[#ff00ff] uppercase tracking-wider transition-colors duration-200"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs text-[#ff6ec7]/50 hover:text-[#ff00ff] uppercase tracking-wider transition-colors duration-200"
              >
                Gallery
              </Link>
            </div>
            <p className="text-xs text-[#7b68ee]/30 uppercase tracking-[0.3em]">
              Ride into the sunset
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
