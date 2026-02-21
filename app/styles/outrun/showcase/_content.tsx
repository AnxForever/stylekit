"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
/*  Inline SVG decorations                                             */
/* ------------------------------------------------------------------ */

function PalmTreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 80" fill="currentColor" aria-hidden="true">
      <rect x="21" y="40" width="6" height="40" rx="3" />
      <path d="M24 40 C10 35 2 20 8 8 C14 20 22 30 24 40Z" />
      <path d="M24 40 C38 35 46 20 40 8 C34 20 26 30 24 40Z" />
      <path d="M24 38 C12 28 6 12 14 4 C18 18 22 30 24 38Z" />
      <path d="M24 36 C18 22 22 6 30 2 C28 16 26 28 24 36Z" />
    </svg>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 60" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="40%" stopColor="#ff006e" />
          <stop offset="100%" stopColor="#a020f0" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="60" rx="50" ry="50" fill="url(#sun-grad)" />
      <line x1="0" y1="20" x2="100" y2="20" stroke="#0a0a0a" strokeWidth="3" />
      <line x1="0" y1="30" x2="100" y2="30" stroke="#0a0a0a" strokeWidth="3" />
      <line x1="0" y1="38" x2="100" y2="38" stroke="#0a0a0a" strokeWidth="2.5" />
      <line x1="0" y1="44" x2="100" y2="44" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="0" y1="49" x2="100" y2="49" stroke="#0a0a0a" strokeWidth="1.5" />
      <line x1="0" y1="53" x2="100" y2="53" stroke="#0a0a0a" strokeWidth="1" />
    </svg>
  );
}

function CarIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 50" fill="currentColor" aria-hidden="true">
      <path d="M10 35 L20 20 L40 15 L80 15 L100 20 L110 35 Z" />
      <path d="M25 20 L35 10 L75 10 L85 20 Z" fill="#ff006e" opacity="0.6" />
      <circle cx="28" cy="38" r="8" fill="#333" />
      <circle cx="28" cy="38" r="4" fill="#666" />
      <circle cx="92" cy="38" r="8" fill="#333" />
      <circle cx="92" cy="38" r="4" fill="#666" />
    </svg>
  );
}

function NeonLineIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 4" aria-hidden="true">
      <line x1="0" y1="2" x2="200" y2="2" stroke="#ff006e" strokeWidth="2" />
      <line x1="0" y1="2" x2="200" y2="2" stroke="#ff006e" strokeWidth="6" opacity="0.3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteColors = [
  { name: "Neon Magenta", hex: "#ff006e", label: "Primary" },
  { name: "Deep Purple", hex: "#a020f0", label: "Secondary" },
  { name: "Cyan Streak", hex: "#00d4ff", label: "Accent 1" },
  { name: "Void Black", hex: "#0a0a0a", label: "Accent 2" },
  { name: "Sunset Orange", hex: "#ff6b35", label: "Accent 3" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1 — Perspective Drive: grid position slider
  const [gridOffset, setGridOffset] = useState(0);
  const [gridDriving, setGridDriving] = useState(false);
  const gridIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // aiRule 2 — Dual Neon Glow: hover state tracker
  const [glowHovered, setGlowHovered] = useState<number | null>(null);

  // aiRule 3 — CRT Jitter: active/press state
  const [crtActive, setCrtActive] = useState(false);
  const [crtFlicker, setCrtFlicker] = useState(false);

  // aiRule 4 — Horizon Tilt: card lift state
  const [tiltActive, setTiltActive] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function startDrive() {
    if (gridIntervalRef.current) return;
    setGridDriving(true);
    gridIntervalRef.current = setInterval(() => {
      setGridOffset((prev) => (prev + 4) % 60);
    }, 50);
  }

  function stopDrive() {
    if (gridIntervalRef.current) {
      clearInterval(gridIntervalRef.current);
      gridIntervalRef.current = null;
    }
    setGridDriving(false);
  }

  function triggerCRT() {
    setCrtActive(true);
    let flickers = 0;
    const flickerInterval = setInterval(() => {
      setCrtFlicker((prev) => !prev);
      flickers++;
      if (flickers > 6) {
        clearInterval(flickerInterval);
        setCrtFlicker(false);
        setCrtActive(false);
      }
    }, 60);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white overflow-x-hidden">
      <style>{`
        @keyframes outrun-grid-scroll {
          from { background-position: 0 0; }
          to { background-position: 0 60px; }
        }
        @keyframes outrun-flicker {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.85; }
          50% { opacity: 0.95; }
          75% { opacity: 0.8; }
        }
        @keyframes outrun-neon-pulse {
          0%, 100% { text-shadow: 0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 40px #ff006e; }
          50% { text-shadow: 0 0 5px #ff006e, 0 0 10px #ff006e; }
        }
        @keyframes outrun-scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        @keyframes outrun-sun-rise {
          0% { transform: translateX(-50%) translateY(60px); opacity: 0; }
          100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes outrun-car-drive {
          0% { transform: translateX(-120px); }
          100% { transform: translateX(calc(100vw + 120px)); }
        }
        @keyframes outrun-magenta-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(255,0,110,0.5), 0 0 30px rgba(255,0,110,0.2); }
          50% { box-shadow: 0 0 30px rgba(255,0,110,0.8), 0 0 60px rgba(255,0,110,0.4); }
        }
        @keyframes outrun-horizon-streak {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(1.2); }
        }
        .outrun-neon-text {
          animation: outrun-neon-pulse 3s ease-in-out infinite;
        }
        .outrun-magenta-pulse-anim {
          animation: outrun-magenta-pulse 2s ease-in-out infinite;
        }
        .outrun-crt-flicker {
          animation: outrun-flicker 0.1s step-start infinite;
        }
        .outrun-grid-floor {
          background-image:
            linear-gradient(90deg, rgba(255,0,110,0.4) 1px, transparent 1px),
            linear-gradient(rgba(255,0,110,0.4) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: perspective(600px) rotateX(70deg);
          transform-origin: bottom;
        }
        .outrun-grid-animated {
          animation: outrun-grid-scroll 1.5s linear infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                      */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#ff006e]/30">
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #ff006e, #00d4ff, transparent)",
          }}
        />
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border border-[#ff006e] flex items-center justify-center shadow-[0_0_10px_rgba(255,0,110,0.5)]">
              <span
                className="text-[#ff006e] text-xs font-black tracking-widest"
                style={{ textShadow: "0 0 8px #ff006e" }}
              >
                OR
              </span>
            </div>
            <span
              className="text-sm font-black uppercase tracking-[0.2em]"
              style={{
                background: "linear-gradient(90deg, #ff006e, #a020f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Outrun
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "AI Rules", "Do / Don't", "Footer"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-sm text-xs text-[#a020f0]/70 hover:text-[#ff006e] hover:bg-[#ff006e]/10 cursor-pointer transition-all duration-200 font-mono uppercase tracking-wider"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* StyleKit back link */}
          <Link
            href="/"
            className="group relative flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-mono uppercase tracking-widest text-[#00d4ff] border border-[#00d4ff]/40 hover:border-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.4),inset_0_0_10px_rgba(0,212,255,0.1)] active:bg-[#00d4ff]/10 transition-all duration-200"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                           */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Sky gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0a0a0a 0%, #0d0020 25%, #2d0a4e 45%, #7a1060 60%, #ff006e 75%, #ff6b35 90%)",
          }}
        />

        {/* Stars */}
        {[
          { top: "8%", left: "12%", size: 2 },
          { top: "15%", left: "78%", size: 1.5 },
          { top: "6%", left: "45%", size: 1 },
          { top: "20%", left: "30%", size: 2 },
          { top: "12%", left: "62%", size: 1.5 },
          { top: "4%", left: "88%", size: 1 },
          { top: "18%", left: "5%", size: 1.5 },
          { top: "10%", left: "52%", size: 1 },
          { top: "25%", left: "95%", size: 2 },
          { top: "3%", left: "22%", size: 1 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: 0.7,
              boxShadow: `0 0 ${star.size * 3}px white`,
            }}
          />
        ))}

        {/* Retro sun */}
        <div
          className="absolute"
          style={{
            bottom: "42%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 280,
            animation: heroVisible ? "outrun-sun-rise 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both" : "none",
          }}
        >
          <SunIcon className="w-full h-auto" />
        </div>

        {/* Palm tree silhouettes */}
        <div
          className="absolute bottom-[38%] left-[5%] text-[#0a0a0a] pointer-events-none hidden md:block"
          style={{ opacity: heroVisible ? 0.9 : 0, transition: "opacity 1s ease 0.8s" }}
        >
          <PalmTreeIcon className="w-16 h-28" />
        </div>
        <div
          className="absolute bottom-[38%] right-[5%] text-[#0a0a0a] pointer-events-none hidden md:block scale-x-[-1]"
          style={{ opacity: heroVisible ? 0.9 : 0, transition: "opacity 1s ease 1s" }}
        >
          <PalmTreeIcon className="w-20 h-32" />
        </div>
        <div
          className="absolute bottom-[38%] left-[14%] text-[#0a0a0a] pointer-events-none hidden md:block"
          style={{ opacity: heroVisible ? 0.7 : 0, transition: "opacity 1s ease 0.9s" }}
        >
          <PalmTreeIcon className="w-10 h-20" />
        </div>
        <div
          className="absolute bottom-[38%] right-[14%] text-[#0a0a0a] pointer-events-none hidden md:block scale-x-[-1]"
          style={{ opacity: heroVisible ? 0.7 : 0, transition: "opacity 1s ease 1.1s" }}
        >
          <PalmTreeIcon className="w-12 h-24" />
        </div>

        {/* Grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%]">
          <div
            className="absolute inset-0 outrun-grid-floor"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,0,110,0.35) 1px, transparent 1px), linear-gradient(rgba(255,0,110,0.35) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Horizon line glow */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #ff006e, #a020f0, #00d4ff, #a020f0, #ff006e, transparent)",
              boxShadow: "0 0 20px #ff006e, 0 0 40px #a020f0",
            }}
          />
        </div>

        {/* Driving car silhouette */}
        <div
          className="absolute text-[#0a0a0a] pointer-events-none"
          style={{
            bottom: "38%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.8s ease 1.2s",
          }}
        >
          <CarIcon className="w-28 h-auto" style={{ filter: "drop-shadow(0 0 12px #ff006e)" }} />
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center px-6 mb-32">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#ff006e]/40 text-[#ff006e] text-xs font-mono uppercase tracking-[0.2em] mb-8 shadow-[0_0_10px_rgba(255,0,110,0.2)]">
              80s Retro Future
            </span>
          </div>

          {/* Main title */}
          <h1
            className="text-7xl md:text-9xl font-black uppercase tracking-[0.05em] mb-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
              background: "linear-gradient(180deg, #ffffff 0%, #ff006e 60%, #a020f0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255,0,110,0.5))",
            }}
          >
            OUTRUN
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#00d4ff] font-mono text-lg md:text-xl tracking-widest uppercase mb-2"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
              textShadow: "0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.5)",
            }}
          >
            Chase the sunset. Drive forever.
          </p>

          <NeonLineIcon className="w-64 mx-auto mb-8 opacity-60" />

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <button className="group relative px-10 py-4 bg-gradient-to-b from-[#110022] to-[#0a0a0a] text-[#00d4ff] font-black uppercase tracking-[0.2em] rounded-sm border border-[#ff006e] shadow-[0_0_15px_rgba(255,0,110,0.5)] hover:border-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.8),inset_0_0_15px_rgba(255,0,110,0.4)] active:scale-95 active:bg-[#ff006e]/20 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff006e_2px,#ff006e_4px)] opacity-10 group-hover:[background-position:0_8px] transition-all duration-300" />
              <span className="relative z-10 drop-shadow-[0_0_5px_currentColor]">Drive</span>
            </button>
            <button className="px-10 py-4 border border-[#a020f0]/60 text-[#a020f0] font-mono uppercase tracking-[0.2em] rounded-sm hover:border-[#a020f0] hover:text-white hover:shadow-[0_0_20px_rgba(160,32,240,0.5)] active:bg-[#a020f0]/20 transition-all duration-300">
              Explore
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="absolute bottom-0 left-0 right-0 border-t border-[#ff006e]/20 bg-[#0a0a0a]/60 backdrop-blur-sm"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.9s",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "1986", label: "Est. Year", color: "#ff006e" },
              { value: "180+", label: "MPH Top Speed", color: "#a020f0" },
              { value: "24h", label: "Endless Drive", color: "#00d4ff" },
              { value: "8-Bit", label: "Sound System", color: "#ff6b35" },
            ].map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <div
                  className="text-2xl font-black tracking-wider group-hover:scale-105 transition-transform duration-300"
                  style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}88` }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff006e] block mb-3">
              &gt; Color System
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
              Neon <span style={{ color: "#a020f0", textShadow: "0 0 20px rgba(160,32,240,0.6)" }}>Palette</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-mono">
              Five high-voltage colors that define the Outrun aesthetic. Magenta burns the horizon,
              purple rules the night sky, cyan cuts through the dark.
            </p>
          </RevealBlock>

          {/* Interactive swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-10 justify-center mb-14">
              {paletteColors.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i ? "translateY(-10px) scale(1.1)" : "translateY(0) scale(1)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-sm border"
                      style={{
                        backgroundColor: swatch.hex,
                        borderColor: swatch.hex,
                        boxShadow: hoveredSwatch === i
                          ? `0 0 30px ${swatch.hex}, 0 0 60px ${swatch.hex}55, 0 20px 40px ${swatch.hex}33`
                          : `0 0 10px ${swatch.hex}55`,
                        transition: "box-shadow 0.35s ease",
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-sm font-bold tracking-wider uppercase"
                      style={{
                        color: swatch.hex,
                        textShadow: hoveredSwatch === i ? `0 0 10px ${swatch.hex}` : "none",
                        transition: "text-shadow 0.35s ease",
                      }}
                    >
                      {swatch.name}
                    </div>
                    <div className="text-xs text-white/30 font-mono mt-0.5">{swatch.hex}</div>
                    <span
                      className="inline-block mt-1.5 px-2.5 py-0.5 rounded-sm text-[10px] font-mono text-white/50 border border-white/10"
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient strips */}
          <RevealBlock delay={0.2}>
            <div
              className="rounded-sm p-8 border border-[#ff006e]/20"
              style={{ background: "linear-gradient(135deg, #0d0020, #1a0035)" }}
            >
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-6">
                Gradient Combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#ff006e", to: "#a020f0", label: "Sunset Burn" },
                  { from: "#a020f0", to: "#00d4ff", label: "Night Horizon" },
                  { from: "#ff6b35", to: "#ff006e", label: "Dusk Fire" },
                  { from: "#00d4ff", to: "#ff006e", label: "Neon Cross" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-14 rounded-sm mb-2 group-hover:-translate-y-1 group-hover:scale-[1.02] transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        boxShadow: `0 4px 16px ${g.from}44`,
                      }}
                    />
                    <div className="text-xs text-white/40 font-mono text-center">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div
          className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #ff006e, #00d4ff, transparent)" }}
        />
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00d4ff] block mb-3">
              &gt; Components
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
              Neon <span style={{ color: "#ff006e", textShadow: "0 0 20px rgba(255,0,110,0.6)" }}>Building Blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-mono">
              Every component carries dual neon glows, perspective drives, and CRT-faithful feedback.
              No clean minimalism survives here.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-sm text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#ff006e]/20 text-[#ff006e] border border-[#ff006e] shadow-[0_0_12px_rgba(255,0,110,0.4)]"
                      : "border border-white/10 text-white/40 hover:border-[#ff006e]/40 hover:text-[#ff006e]/70"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="rounded-sm p-8 md:p-12 border border-[#ff006e]/20"
              style={{ background: "linear-gradient(135deg, #0d0020, #0a0a0a)" }}
            >
              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-5">
                      Primary — Dual Neon Glow
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="group relative px-10 py-4 bg-gradient-to-b from-[#110022] to-[#0a0a0a] text-[#00d4ff] font-black uppercase tracking-[0.2em] rounded-sm border border-[#ff006e] shadow-[0_0_15px_rgba(255,0,110,0.5)] hover:border-[#00d4ff] hover:shadow-[0_0_25px_rgba(0,212,255,0.8),inset_0_0_15px_rgba(255,0,110,0.4)] active:scale-95 active:bg-[#ff006e]/20 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff006e_2px,#ff006e_4px)] opacity-10 group-hover:[background-position:0_8px] transition-all duration-300" />
                        <span className="relative z-10 drop-shadow-[0_0_5px_currentColor]">Drive</span>
                      </button>
                      <button className="px-10 py-4 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-black uppercase tracking-[0.2em] rounded-sm shadow-[0_0_20px_rgba(255,0,110,0.5)] hover:shadow-[0_0_40px_rgba(255,0,110,0.8),0_0_20px_rgba(160,32,240,0.6)] active:scale-95 transition-all duration-300">
                        Ignite
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-5">
                      Outline &amp; Cyan
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button className="px-8 py-3.5 border border-[#a020f0] text-[#a020f0] font-mono uppercase tracking-wider rounded-sm hover:bg-[#a020f0]/10 hover:shadow-[0_0_20px_rgba(160,32,240,0.5)] transition-all duration-200">
                        Outlined
                      </button>
                      <button className="px-8 py-3.5 border border-[#00d4ff] text-[#00d4ff] font-mono uppercase tracking-wider rounded-sm hover:bg-[#00d4ff]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-200">
                        Cyan Strike
                      </button>
                      <button className="px-8 py-3.5 text-[#ff006e] font-mono uppercase tracking-wider rounded-sm hover:text-[#ff006e] hover:shadow-[0_0_15px_rgba(255,0,110,0.3)] transition-all duration-200">
                        Ghost
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-5">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { size: "XS", px: "px-4 py-2 text-[10px]" },
                        { size: "SM", px: "px-6 py-3 text-xs" },
                        { size: "LG", px: "px-10 py-5 text-sm" },
                      ].map(({ size, px }) => (
                        <button
                          key={size}
                          className={`border border-[#ff006e] text-[#ff006e] font-black uppercase tracking-widest rounded-sm shadow-[0_0_10px_rgba(255,0,110,0.3)] hover:shadow-[0_0_20px_rgba(255,0,110,0.6),0_0_10px_rgba(0,212,255,0.3)] transition-all duration-200 ${px}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      title: "NIGHT CITY",
                      sub: "> Grid simulation active",
                      sunColor: "from-[#ff6b35] via-[#ff006e] to-[#a020f0]",
                      borderColor: "#ff006e",
                      glowColor: "rgba(255,0,110,0.2)",
                      hoverGlow: "rgba(0,212,255,0.4)",
                    },
                    {
                      title: "NEON DRIVE",
                      sub: "> Speed: 180 mph",
                      sunColor: "from-[#00d4ff] via-[#a020f0] to-[#ff006e]",
                      borderColor: "#00d4ff",
                      glowColor: "rgba(0,212,255,0.2)",
                      hoverGlow: "rgba(255,0,110,0.4)",
                    },
                    {
                      title: "SUNSET RUN",
                      sub: "> Horizon: 2.4 km",
                      sunColor: "from-[#ff6b35] via-[#ff006e] to-[#ff006e]",
                      borderColor: "#ff6b35",
                      glowColor: "rgba(255,107,53,0.2)",
                      hoverGlow: "rgba(160,32,240,0.4)",
                    },
                    {
                      title: "GRID WORLD",
                      sub: "> Reality: synthesized",
                      sunColor: "from-[#a020f0] via-[#ff006e] to-[#00d4ff]",
                      borderColor: "#a020f0",
                      glowColor: "rgba(160,32,240,0.2)",
                      hoverGlow: "rgba(0,212,255,0.4)",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative p-8 bg-[#0a0a0a]/90 rounded-sm border-t border-b-4 overflow-hidden cursor-crosshair transition-all duration-300 hover:-translate-y-1"
                      style={{
                        borderTopColor: `${card.borderColor}80`,
                        borderBottomColor: card.borderColor,
                        boxShadow: `0 0 30px ${card.glowColor}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px ${card.hoverGlow}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${card.glowColor}`;
                      }}
                    >
                      {/* Animated grid line on hover */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 group-hover:opacity-60 group-hover:[background-position:0_12px] transition-all duration-500"
                        style={{
                          background: `linear-gradient(transparent 50%, ${card.borderColor}33 50%)`,
                          backgroundSize: "100% 4px",
                          transform: "perspective(100px) rotateX(60deg)",
                        }}
                      />
                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-b ${card.sunColor} mb-4 transition-all duration-300 group-hover:scale-110`}
                          style={{
                            boxShadow: `0 0 15px ${card.glowColor.replace("0.2", "0.6")}`,
                          }}
                        />
                        <h3
                          className="text-2xl font-black text-transparent bg-clip-text mb-2 tracking-wider"
                          style={{
                            backgroundImage: "linear-gradient(180deg, white, #00d4ff)",
                            WebkitBackgroundClip: "text",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="font-mono text-xs uppercase tracking-widest group-hover:text-[#ff6b35] transition-colors"
                          style={{ color: card.borderColor }}
                        >
                          {card.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#ff006e] mb-2">
                        Destination
                      </label>
                      <input
                        type="text"
                        placeholder="Enter destination..."
                        className="w-full px-6 py-4 bg-[#0a0a0a]/60 rounded-sm border border-[#a020f0]/50 text-[#00d4ff] placeholder-[#a020f0]/40 font-mono shadow-[0_0_10px_rgba(160,32,240,0.2)] focus:border-[#00d4ff] focus:shadow-[0_0_20px_rgba(0,212,255,0.4)] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#a020f0] mb-2">
                        Frequency
                      </label>
                      <input
                        type="text"
                        placeholder="102.3 FM"
                        className="w-full px-6 py-4 bg-[#0a0a0a]/60 rounded-sm border border-[#00d4ff]/50 text-[#ff006e] placeholder-[#00d4ff]/30 font-mono shadow-[0_0_10px_rgba(0,212,255,0.15)] focus:border-[#ff006e] focus:shadow-[0_0_20px_rgba(255,0,110,0.4)] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#00d4ff] mb-2">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Transmission incoming..."
                        className="w-full px-6 py-4 bg-[#0a0a0a]/60 rounded-sm border border-[#ff006e]/50 text-white placeholder-[#ff006e]/30 font-mono shadow-[0_0_10px_rgba(255,0,110,0.15)] focus:border-[#ff006e] focus:shadow-[0_0_20px_rgba(255,0,110,0.4)] focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#ff6b35] mb-2">
                        Engine Mode
                      </label>
                      <select className="w-full px-6 py-4 bg-[#0a0a0a]/60 rounded-sm border border-[#ff6b35]/50 text-[#ff6b35] font-mono shadow-[0_0_10px_rgba(255,107,53,0.15)] focus:border-[#ff006e] focus:outline-none transition-all">
                        <option>Turbo</option>
                        <option>Cruise</option>
                        <option>Overdrive</option>
                        <option>Hyperspeed</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-sm border border-[#ff006e]/60 cursor-pointer hover:border-[#ff006e] hover:shadow-[0_0_8px_rgba(255,0,110,0.5)] transition-all" />
                      <label className="text-sm font-mono text-white/50 cursor-pointer">
                        Enable neon drive mode
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-sm border border-[#00d4ff] bg-[#00d4ff]/20 flex items-center justify-center cursor-pointer shadow-[0_0_8px_rgba(0,212,255,0.4)]">
                        <svg className="w-3 h-3 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm font-mono text-white/50 cursor-pointer">
                        Turbo boost engaged
                      </label>
                    </div>
                    <button
                      className="w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(255,0,110,0.4)] hover:shadow-[0_0_40px_rgba(255,0,110,0.7),0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #ff006e, #a020f0)" }}
                    >
                      Transmit
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES ---- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-5">
                      Neon tag badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Outrun", color: "#ff006e" },
                        { label: "Retro", color: "#a020f0" },
                        { label: "Neon", color: "#00d4ff" },
                        { label: "80s", color: "#ff6b35" },
                        { label: "Synth", color: "#ff006e" },
                        { label: "Turbo", color: "#a020f0" },
                        { label: "Drive", color: "#00d4ff" },
                        { label: "Night", color: "#ff6b35" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded-sm text-xs font-mono uppercase tracking-widest border cursor-default hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
                          style={{
                            color: b.color,
                            borderColor: `${b.color}60`,
                            backgroundColor: `${b.color}10`,
                            boxShadow: `0 0 8px ${b.color}30`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${b.color}60`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 8px ${b.color}30`;
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-5">
                      Status badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "ONLINE", color: "#00d4ff", dot: true },
                        { label: "DRIVING", color: "#ff006e", dot: true },
                        { label: "TURBO", color: "#ff6b35", dot: true },
                        { label: "OFFLINE", color: "#a020f0", dot: true },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest cursor-default"
                          style={{
                            color: b.color,
                            border: `1px solid ${b.color}50`,
                            backgroundColor: `${b.color}15`,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: b.color,
                              boxShadow: `0 0 6px ${b.color}`,
                            }}
                          />
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 mb-5">
                      Count badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "Laps", count: 12, color: "#ff006e" },
                        { label: "Boosts", count: 5, color: "#a020f0" },
                        { label: "Rivals", count: 7, color: "#00d4ff" },
                        { label: "Stars", count: 88, color: "#ff6b35" },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm font-mono text-white/40 uppercase tracking-widest">{b.label}</span>
                          <span
                            className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black text-white"
                            style={{
                              backgroundColor: `${b.color}20`,
                              border: `1px solid ${b.color}60`,
                              boxShadow: `0 0 10px ${b.color}40`,
                              color: b.color,
                            }}
                          >
                            {b.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. AIRULES INTERACTIVE DEMOS                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a020f0] block mb-3">
              &gt; AI Rules Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
              Interaction <span style={{ color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.6)" }}>Physics</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-mono">
              Four named rules govern every Outrun interaction. Hover, click, and hold each demo
              to feel the neon difference.
            </p>
          </RevealBlock>

          {/* ---- RULE 1: Perspective Drive ---- */}
          <RevealBlock delay={0.08} className="mb-6">
            <div
              className="rounded-sm p-8 border border-[#ff006e]/20 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0d0020, #0a0a0a)" }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Description */}
                <div className="md:w-1/3 shrink-0">
                  <span className="inline-block px-3 py-1 rounded-sm bg-[#ff006e]/20 text-[#ff006e] text-xs font-mono uppercase tracking-widest border border-[#ff006e]/40 mb-3">
                    Rule 1
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2">Perspective Drive</h3>
                  <p className="text-white/40 font-mono text-sm leading-relaxed mb-4">
                    Grid background shifts along the Y-axis via bg-position on hover/press, creating
                    an infinite forward-motion illusion — like accelerating toward the horizon.
                  </p>
                  <p className="text-[#ff006e] font-mono text-xs">
                    bg-position: 0 {gridOffset}px
                  </p>
                </div>
                {/* Live demo */}
                <div className="flex-1">
                  <button
                    className="group w-full relative py-16 rounded-sm border border-[#ff006e]/40 overflow-hidden cursor-pointer transition-all duration-200 active:scale-[0.98]"
                    style={{
                      background: "#0a0a0a",
                      boxShadow: gridDriving
                        ? "0 0 30px rgba(255,0,110,0.4), inset 0 0 20px rgba(255,0,110,0.1)"
                        : "0 0 10px rgba(255,0,110,0.2)",
                    }}
                    onMouseEnter={startDrive}
                    onMouseLeave={stopDrive}
                    onFocus={startDrive}
                    onBlur={stopDrive}
                  >
                    {/* Animated grid */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255,0,110,0.3) 1px, transparent 1px), linear-gradient(rgba(255,0,110,0.3) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        backgroundPosition: `0 ${gridOffset}px`,
                        transform: "perspective(300px) rotateX(60deg)",
                        transformOrigin: "bottom",
                      }}
                    />
                    {/* Horizon line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{
                        background: gridDriving
                          ? "linear-gradient(90deg, transparent, #ff006e, #00d4ff, #ff006e, transparent)"
                          : "linear-gradient(90deg, transparent, #ff006e33, transparent)",
                        boxShadow: gridDriving ? "0 0 15px #ff006e" : "none",
                        transition: "all 0.3s",
                      }}
                    />
                    <div className="relative z-10 text-center">
                      <span
                        className="text-sm font-mono uppercase tracking-widest"
                        style={{ color: gridDriving ? "#ff006e" : "#ff006e60" }}
                      >
                        {gridDriving ? "> ENGAGE DRIVE" : "Hover to drive"}
                      </span>
                    </div>
                  </button>
                  <p className="text-white/20 font-mono text-xs mt-3 text-center">
                    Hover over the grid — the perspective floor accelerates toward you
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- RULE 2: Dual Neon Glow ---- */}
          <RevealBlock delay={0.12} className="mb-6">
            <div
              className="rounded-sm p-8 border border-[#a020f0]/20 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0d0020, #0a0a0a)" }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3 shrink-0">
                  <span className="inline-block px-3 py-1 rounded-sm bg-[#a020f0]/20 text-[#a020f0] text-xs font-mono uppercase tracking-widest border border-[#a020f0]/40 mb-3">
                    Rule 2
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2">Dual Neon Glow</h3>
                  <p className="text-white/40 font-mono text-sm leading-relaxed mb-4">
                    Every hover state layers at least two neon shadow colors — magenta and cyan —
                    producing the chromatic aberration of vintage arcade screens.
                  </p>
                  <code className="text-[#a020f0] font-mono text-xs block">
                    shadow: 0 0 20px #ff006e,<br />
                    &nbsp;&nbsp;0 0 40px #00d4ff
                  </code>
                </div>
                {/* Live demo — 3 glowable elements */}
                <div className="flex-1 flex flex-wrap gap-5 items-center justify-center py-4">
                  {[
                    { label: "MAGENTA", baseColor: "#ff006e", secondColor: "#00d4ff", idx: 0 },
                    { label: "PURPLE", baseColor: "#a020f0", secondColor: "#ff006e", idx: 1 },
                    { label: "CYAN", baseColor: "#00d4ff", secondColor: "#a020f0", idx: 2 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="relative px-8 py-5 rounded-sm font-black uppercase tracking-[0.2em] text-white border transition-all duration-300"
                      style={{
                        borderColor: glowHovered === item.idx ? item.baseColor : `${item.baseColor}40`,
                        backgroundColor:
                          glowHovered === item.idx ? `${item.baseColor}15` : "transparent",
                        color: item.baseColor,
                        boxShadow:
                          glowHovered === item.idx
                            ? `0 0 20px ${item.baseColor}, 0 0 40px ${item.secondColor}88, inset 0 0 10px ${item.baseColor}20`
                            : `0 0 5px ${item.baseColor}30`,
                        textShadow:
                          glowHovered === item.idx
                            ? `0 0 10px ${item.baseColor}, 0 0 20px ${item.secondColor}88`
                            : "none",
                      }}
                      onMouseEnter={() => setGlowHovered(item.idx)}
                      onMouseLeave={() => setGlowHovered(null)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-white/20 font-mono text-xs mt-4 text-center">
                Hover each button to see the dual-color neon chromatic split
              </p>
            </div>
          </RevealBlock>

          {/* ---- RULE 3: CRT Jitter ---- */}
          <RevealBlock delay={0.16} className="mb-6">
            <div
              className="rounded-sm p-8 border border-[#00d4ff]/20 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #001a20, #0a0a0a)" }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3 shrink-0">
                  <span className="inline-block px-3 py-1 rounded-sm bg-[#00d4ff]/20 text-[#00d4ff] text-xs font-mono uppercase tracking-widest border border-[#00d4ff]/40 mb-3">
                    Rule 3
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2">CRT Jitter</h3>
                  <p className="text-white/40 font-mono text-sm leading-relaxed mb-4">
                    On active/click, the element briefly flickers and depresses — mimicking
                    the tactile response of vintage CRT button hardware. Short, brutal, satisfying.
                  </p>
                  <code className="text-[#00d4ff] font-mono text-xs block">
                    active:bg-[#ff006e]/20<br />
                    animation: flicker 60ms step-start
                  </code>
                </div>
                {/* Live demo */}
                <div className="flex-1 flex flex-col items-center justify-center py-4 gap-6">
                  <button
                    onClick={triggerCRT}
                    className="relative group px-12 py-6 rounded-sm font-black uppercase tracking-[0.25em] border transition-all duration-100 overflow-hidden select-none"
                    style={{
                      borderColor: "#00d4ff",
                      color: "#00d4ff",
                      backgroundColor: crtActive ? "rgba(0,212,255,0.1)" : "transparent",
                      boxShadow: crtActive
                        ? "0 0 30px rgba(0,212,255,0.6), inset 0 0 20px rgba(0,212,255,0.1)"
                        : "0 0 15px rgba(0,212,255,0.3)",
                      transform: crtActive ? "scale(0.97) translateY(2px)" : "scale(1)",
                      opacity: crtFlicker ? 0.7 : 1,
                      textShadow: "0 0 10px #00d4ff",
                    }}
                  >
                    {/* Scanlines overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.05) 2px, rgba(0,212,255,0.05) 4px)",
                      }}
                    />
                    <span className="relative z-10">
                      {crtActive ? "ACTIVATING..." : "CLICK TO JITTER"}
                    </span>
                  </button>
                  <p className="text-white/20 font-mono text-xs text-center max-w-xs">
                    Click the button — notice the screen flicker and brief press-down replicating CRT hardware feedback
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- RULE 4: Horizon Tilt ---- */}
          <RevealBlock delay={0.2}>
            <div
              className="rounded-sm p-8 border border-[#ff6b35]/20 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #200a00, #0a0a0a)" }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3 shrink-0">
                  <span className="inline-block px-3 py-1 rounded-sm bg-[#ff6b35]/20 text-[#ff6b35] text-xs font-mono uppercase tracking-widest border border-[#ff6b35]/40 mb-3">
                    Rule 4
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2">Horizon Tilt</h3>
                  <p className="text-white/40 font-mono text-sm leading-relaxed mb-4">
                    Cards lift slightly and grow a bottom neon light bar on hover — evoking a
                    car cresting a hill toward the glowing horizon. Combined with perspective,
                    adds depth and motion.
                  </p>
                  <code className="text-[#ff6b35] font-mono text-xs block">
                    hover:-translate-y-2<br />
                    border-b: glow strip
                  </code>
                </div>
                {/* Live demo — 3 tilt cards */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: "FERRARI", sub: "Testarossa", color: "#ff006e" },
                    { title: "PONTIAC", sub: "Firebird", color: "#a020f0" },
                    { title: "LAMBORGHINI", sub: "Countach", color: "#00d4ff" },
                  ].map((car, idx) => (
                    <div
                      key={car.title}
                      className="relative p-5 rounded-sm cursor-pointer transition-all duration-300"
                      style={{
                        background: "#0d0010",
                        border: `1px solid ${car.color}30`,
                        transform: tiltActive === idx ? "translateY(-8px)" : "translateY(0)",
                        boxShadow:
                          tiltActive === idx
                            ? `0 20px 40px ${car.color}33, 0 0 20px ${car.color}22`
                            : `0 4px 12px ${car.color}15`,
                      }}
                      onMouseEnter={() => setTiltActive(idx)}
                      onMouseLeave={() => setTiltActive(null)}
                    >
                      {/* Bottom horizon glow strip */}
                      <div
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${car.color}, transparent)`,
                          boxShadow: tiltActive === idx ? `0 0 12px ${car.color}` : "none",
                          opacity: tiltActive === idx ? 1 : 0.3,
                        }}
                      />
                      <div
                        className="w-10 h-10 rounded-sm mb-3 flex items-center justify-center font-black text-xs"
                        style={{
                          backgroundColor: `${car.color}15`,
                          border: `1px solid ${car.color}40`,
                          color: car.color,
                        }}
                      >
                        CAR
                      </div>
                      <div
                        className="font-black text-sm uppercase tracking-wider mb-1 transition-all duration-300"
                        style={{
                          color: tiltActive === idx ? car.color : "white",
                          textShadow: tiltActive === idx ? `0 0 10px ${car.color}` : "none",
                        }}
                      >
                        {car.title}
                      </div>
                      <div className="text-white/30 font-mono text-xs">{car.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/20 font-mono text-xs mt-4 text-center">
                Hover each car card — it lifts and the bottom horizon glow lights up
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. RACING DASHBOARD APP DEMO                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff006e] block mb-3">
              &gt; App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
              Racing <span style={{ color: "#a020f0", textShadow: "0 0 20px rgba(160,32,240,0.6)" }}>Dashboard</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-mono">
              A retro racing interface showing Outrun components in context — neon meters,
              speed readouts, and sunset status displays.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main speed panel */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div
                className="rounded-sm p-8 border border-[#ff006e]/30 h-full"
                style={{ background: "linear-gradient(135deg, #0d0020, #0a0a0a)" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3
                      className="text-xl font-black uppercase tracking-wider"
                      style={{ color: "#ff006e", textShadow: "0 0 10px rgba(255,0,110,0.5)" }}
                    >
                      Night Cruiser
                    </h3>
                    <p className="text-white/30 font-mono text-xs mt-1 uppercase tracking-widest">
                      Route 80 — Endless Highway
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#00d4ff]/40"
                    style={{ backgroundColor: "rgba(0,212,255,0.1)" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: "#00d4ff",
                        boxShadow: "0 0 6px #00d4ff",
                        animation: "outrun-magenta-pulse 2s ease-in-out infinite",
                      }}
                    />
                    <span className="text-[#00d4ff] font-mono text-xs uppercase tracking-widest">LIVE</span>
                  </div>
                </div>

                {/* Speed readout */}
                <div className="text-center mb-8">
                  <div
                    className="text-8xl md:text-9xl font-black tabular-nums"
                    style={{
                      color: "#ff006e",
                      textShadow: "0 0 20px rgba(255,0,110,0.6), 0 0 40px rgba(255,0,110,0.3)",
                    }}
                  >
                    180
                  </div>
                  <div className="text-[#ff006e]/50 font-mono text-sm uppercase tracking-[0.3em] mt-1">
                    MPH
                  </div>
                </div>

                {/* Meter bars */}
                <div className="space-y-4">
                  {[
                    { label: "Engine", value: 92, color: "#ff006e" },
                    { label: "Nitro Boost", value: 67, color: "#a020f0" },
                    { label: "Drift Angle", value: 45, color: "#00d4ff" },
                    { label: "Neon Charge", value: 88, color: "#ff6b35" },
                  ].map((meter) => (
                    <div key={meter.label} className="group">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-white/50 font-mono text-xs uppercase tracking-widest">
                          {meter.label}
                        </span>
                        <span
                          className="font-black text-xs"
                          style={{ color: meter.color }}
                        >
                          {meter.value}%
                        </span>
                      </div>
                      <div
                        className="h-2 rounded-sm overflow-hidden"
                        style={{ backgroundColor: `${meter.color}20` }}
                      >
                        <div
                          className="h-full rounded-sm transition-all duration-700"
                          style={{
                            width: `${meter.value}%`,
                            background: `linear-gradient(90deg, ${meter.color}cc, ${meter.color})`,
                            boxShadow: `0 0 8px ${meter.color}80`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Side panels */}
            <RevealBlock delay={0.18}>
              <div className="space-y-5 h-full">
                {/* Lap time */}
                <div
                  className="rounded-sm p-6 border border-[#a020f0]/30 group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(160,32,240,0.3)] transition-all duration-300 cursor-default"
                  style={{ background: "linear-gradient(135deg, #0d0020, #0a0a0a)" }}
                >
                  <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-2">
                    Best Lap
                  </p>
                  <div
                    className="text-3xl font-black"
                    style={{
                      color: "#a020f0",
                      textShadow: "0 0 15px rgba(160,32,240,0.6)",
                    }}
                  >
                    1:23.88
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-4 rounded-sm"
                        style={{
                          backgroundColor: i < 4 ? "#a020f0" : "#a020f020",
                          boxShadow: i < 4 ? "0 0 4px rgba(160,32,240,0.5)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Rivals */}
                <div
                  className="rounded-sm p-6 border border-[#00d4ff]/30 group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,212,255,0.3)] transition-all duration-300 cursor-default"
                  style={{ background: "linear-gradient(135deg, #001a20, #0a0a0a)" }}
                >
                  <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-4">
                    Rivals
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: "PHANTOM", gap: "+0.0", color: "#00d4ff" },
                      { name: "VIPER_X", gap: "+2.3s", color: "#ff006e" },
                      { name: "NIGHTFALL", gap: "+5.1s", color: "#a020f0" },
                    ].map((rival) => (
                      <div key={rival.name} className="flex items-center justify-between">
                        <span className="font-mono text-xs text-white/50">{rival.name}</span>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: rival.color }}
                        >
                          {rival.gap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fuel / Distance */}
                <div
                  className="rounded-sm p-6 border border-[#ff6b35]/30 group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,107,53,0.3)] transition-all duration-300 cursor-default"
                  style={{ background: "linear-gradient(135deg, #1a0800, #0a0a0a)" }}
                >
                  <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-3">
                    Distance
                  </p>
                  <div
                    className="text-3xl font-black mb-2"
                    style={{
                      color: "#ff6b35",
                      textShadow: "0 0 15px rgba(255,107,53,0.6)",
                    }}
                  >
                    248 km
                  </div>
                  <div
                    className="h-1.5 rounded-sm overflow-hidden"
                    style={{ backgroundColor: "rgba(255,107,53,0.2)" }}
                  >
                    <div
                      className="h-full rounded-sm"
                      style={{
                        width: "72%",
                        background: "linear-gradient(90deg, #ff6b35cc, #ff006e)",
                        boxShadow: "0 0 8px rgba(255,107,53,0.6)",
                      }}
                    />
                  </div>
                  <p className="text-white/20 font-mono text-xs mt-2">72% to checkpoint</p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff6b35] block mb-3">
              &gt; Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
              Do &amp; <span style={{ color: "#ff006e", textShadow: "0 0 20px rgba(255,0,110,0.6)" }}>Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-lg leading-relaxed font-mono">
              Outrun has strict rules. Break one and you lose the aesthetic entirely. These
              boundaries define the entire visual language.
            </p>
          </RevealBlock>

          {/* Philosophy cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Sunset Drive",
                tagline: "Orange-pink-purple sky, always",
                desc: "The defining gradient runs from sunset orange through magenta and into deep purple. This is non-negotiable for any background — the color of the 80s freeway at dusk.",
                bullets: ["from-[#ff6b35] via-[#ff006e] to-[#a020f0]", "Never solid flat colors", "Sky occupies top 60%"],
                color: "#ff6b35",
              },
              {
                title: "Neon Speed",
                tagline: "Magenta + cyan always dual",
                desc: "Glow effects must always use at least two neon layers. Single-color glows look flat and wrong. The chromatic split between magenta and cyan is the signature.",
                bullets: ["shadow: #ff006e + #00d4ff", "No single-color glow ever", "Minimum 20px shadow radius"],
                color: "#ff006e",
              },
              {
                title: "Grid Horizon",
                tagline: "Perspective grid mandatory",
                desc: "The receding grid floor is core to the style. It must use rotateX perspective, not flat patterns. And it must animate — static grids lose all sense of speed.",
                bullets: ["perspective(500px) rotateX(60deg)", "Grid must scroll on interact", "Horizon line glows neon"],
                color: "#a020f0",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.08}>
                <div
                  className="group rounded-sm p-8 border h-full transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{
                    background: "linear-gradient(135deg, #0d0020, #0a0a0a)",
                    borderColor: `${principle.color}30`,
                    boxShadow: `0 4px 20px ${principle.color}15`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${principle.color}30`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${principle.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${principle.color}15`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${principle.color}30`;
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-sm mb-6 flex items-center justify-center font-black text-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${principle.color}15`,
                      border: `1px solid ${principle.color}40`,
                      color: principle.color,
                      boxShadow: `0 0 15px ${principle.color}30`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3
                    className="text-xl font-black uppercase tracking-wider mb-1"
                    style={{ color: principle.color }}
                  >
                    {principle.title}
                  </h3>
                  <p className="text-white/30 font-mono text-xs mb-4">{principle.tagline}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{principle.desc}</p>
                  <ul className="space-y-2">
                    {principle.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-white/40 font-mono">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: principle.color, boxShadow: `0 0 4px ${principle.color}` }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.12}>
              <div
                className="rounded-sm p-8 border border-[#00d4ff]/20 h-full"
                style={{ background: "linear-gradient(135deg, #001a20, #0a0a0a)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)" }}
                  >
                    <svg className="w-4 h-4 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-black uppercase tracking-widest"
                    style={{ color: "#00d4ff", textShadow: "0 0 10px rgba(0,212,255,0.5)" }}
                  >
                    Do
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use magenta, purple, cyan neon palette",
                    "Add sunset gradient sky backgrounds",
                    "Use perspective grid floor effects",
                    "Add neon glow on all interactive elements",
                    "Use bold uppercase sans-serif font",
                    "Add palm tree or car silhouettes",
                    "Layer dual neon shadows on hover",
                    "Animate grid background on interaction",
                    "Use active:bg-[#ff006e]/20 CRT press feedback",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed font-mono">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#00d4ff", boxShadow: "0 0 4px #00d4ff" }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="rounded-sm p-8 border border-[#ff006e]/20 h-full"
                style={{ background: "linear-gradient(135deg, #1a0010, #0a0a0a)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,0,110,0.15)", border: "1px solid rgba(255,0,110,0.4)" }}
                  >
                    <svg className="w-4 h-4 text-[#ff006e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-black uppercase tracking-widest"
                    style={{ color: "#ff006e", textShadow: "0 0 10px rgba(255,0,110,0.5)" }}
                  >
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Bright white or light gray backgrounds",
                    "Modern minimalist flat design",
                    "Omit neon glow effects",
                    "Use soft low-saturation pastel colors",
                    "Single-color neon glow (must be dual)",
                    "Static non-animated grid backgrounds",
                    "Serif or thin-weight fonts",
                    "Sharp contrast without chromatic split",
                    "Clean corporate blue without magenta",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed font-mono">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#ff006e", boxShadow: "0 0 4px #ff006e" }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                         */}
      {/* ================================================================ */}
      <footer className="relative bg-[#0a0a0a] border-t border-[#ff006e]/20 overflow-hidden">
        {/* Top neon divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #ff006e, #a020f0, #00d4ff, #a020f0, #ff006e, transparent)",
            boxShadow: "0 0 20px #ff006e55",
          }}
        />

        {/* Background grid decoration */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,0,110,0.15) 1px, transparent 1px), linear-gradient(rgba(255,0,110,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "perspective(300px) rotateX(70deg)",
            transformOrigin: "bottom",
            opacity: 0.5,
          }}
        />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative z-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-sm border flex items-center justify-center"
                  style={{
                    borderColor: "#ff006e",
                    boxShadow: "0 0 15px rgba(255,0,110,0.5)",
                    backgroundColor: "rgba(255,0,110,0.1)",
                  }}
                >
                  <span
                    className="text-[#ff006e] text-xs font-black tracking-widest"
                    style={{ textShadow: "0 0 8px #ff006e" }}
                  >
                    OR
                  </span>
                </div>
                <span
                  className="text-xl font-black uppercase tracking-[0.15em]"
                  style={{
                    background: "linear-gradient(90deg, #ff006e, #a020f0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Outrun
                </span>
              </div>
              <p className="text-white/30 text-sm font-mono leading-relaxed">
                80s retro-futurism. Magenta sunsets, neon grids, and the eternal drive
                toward the horizon. A style for those who never stop.
              </p>
              {/* Color dots */}
              <div className="flex gap-2">
                {["#ff006e", "#a020f0", "#00d4ff", "#ff6b35", "#0a0a0a"].map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-sm hover:scale-125 transition-transform duration-200 cursor-default"
                    style={{
                      backgroundColor: c,
                      border: c === "#0a0a0a" ? "1px solid #ff006e40" : "none",
                      boxShadow: c !== "#0a0a0a" ? `0 0 8px ${c}80` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/20">Style</span>
                <Link
                  href="/styles/outrun"
                  className="text-white/40 hover:text-[#ff006e] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/outrun/showcase"
                  className="text-white/40 hover:text-[#ff006e] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/outrun/cover"
                  className="text-white/40 hover:text-[#ff006e] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/20">StyleKit</span>
                <Link
                  href="/"
                  className="text-white/40 hover:text-[#ff006e] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="text-white/40 hover:text-[#ff006e] font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/20">Palette</span>
                {paletteColors.map((c) => (
                  <span key={c.name} className="flex items-center gap-2 text-white/30 font-mono text-xs">
                    <span
                      className="w-3 h-3 rounded-sm inline-block"
                      style={{
                        backgroundColor: c.hex,
                        boxShadow: `0 0 6px ${c.hex}80`,
                      }}
                    />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Neon divider */}
          <div
            className="h-px mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,0,110,0.4), rgba(160,32,240,0.4), transparent)",
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-white/20 uppercase tracking-widest">
              <span>Built for</span>
              <span style={{ color: "#ff006e", textShadow: "0 0 6px #ff006e" }}>StyleKit</span>
              <span>— Drive forever</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-widest border border-[#ff006e]/40 text-[#ff006e]/70 hover:border-[#ff006e] hover:text-[#ff006e] hover:shadow-[0_0_15px_rgba(255,0,110,0.4)] active:bg-[#ff006e]/10 transition-all duration-200"
            >
              <span>&#8592;</span>
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
