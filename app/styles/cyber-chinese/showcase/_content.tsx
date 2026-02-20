"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* --- Inline SVG Decorations --- */

function SealStamp({
  char,
  className = "",
  size = 64,
}: {
  char: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fill="currentColor"
        fontSize="24"
        fontWeight="bold"
        fontFamily="serif"
      >
        {char}
      </text>
    </svg>
  );
}

function NeonLantern({ className = "" }: { className?: string }) {
  return (
    <svg
      width="48"
      height="96"
      viewBox="0 0 48 96"
      fill="none"
      className={className}
    >
      {/* Hook */}
      <path d="M24 0 L24 12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Frame */}
      <rect x="8" y="12" width="32" height="60" rx="0" stroke="currentColor" strokeWidth="2" />
      {/* Inner frame */}
      <rect x="12" y="16" width="24" height="52" rx="0" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Character */}
      <text x="24" y="50" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="bold" fontFamily="serif">
        灯
      </text>
      {/* Bottom tassel */}
      <path d="M18 72 L18 88" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M24 72 L24 92" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M30 72 L30 88" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function CloudPattern({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className={className}>
      <path
        d="M0 30 Q15 10, 30 20 Q45 5, 60 20 Q75 10, 90 20 Q105 5, 120 20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M10 35 Q25 15, 40 25 Q55 10, 70 25 Q85 15, 100 25"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
}

function NeonDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4553a]/40 to-transparent" />
      <SealStamp char="华" className="text-[#d4553a]/50 w-6 h-6" size={24} />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent" />
    </div>
  );
}

/* --- Color data --- */

const colorPalette = [
  { name: "Void Black", hex: "#0a0a0a", role: "Background", textColor: "#e5e5e5" },
  { name: "Vermilion", hex: "#d4553a", role: "Primary / Buttons", textColor: "#ffffff" },
  { name: "Imperial Gold", hex: "#c9a227", role: "Secondary / Borders", textColor: "#0a0a0a" },
  { name: "Neon Blue", hex: "#00d4ff", role: "Accent / Links", textColor: "#0a0a0a" },
  { name: "Neon Purple", hex: "#a020f0", role: "Accent Variant", textColor: "#ffffff" },
  { name: "Deep Smoke", hex: "#1a1a1a", role: "Card Surfaces", textColor: "#e5e5e5" },
];

/* --- Do / Don't rules --- */

const doRules = [
  "Use vermilion #d4553a and imperial gold #c9a227 as primary palette",
  "Pair with neon blue #00d4ff and neon purple #a020f0 for cyber accents",
  "Use sharp, angular shapes with rounded-none edges",
  "Apply neon glow effects via box-shadow on interactive elements",
  "Integrate Chinese cultural motifs: seal stamps, cloud patterns, lanterns",
  "Maintain deep black backgrounds as the foundational canvas",
];

const dontRules = [
  "Never use bright white or light-colored backgrounds",
  "Avoid soft, rounded shapes (rounded-lg, rounded-full)",
  "Do not omit neon glow effects from interactive elements",
  "Avoid overly Western decorative elements",
  "Never use spring-bounce, cutesy shake, or large scale animations",
  "Avoid transitions slower than 400ms on interactive controls",
];

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      <style>{`
        @keyframes cc-scan {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(400%) skewX(-20deg); }
        }
        @keyframes cc-neon-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.7; }
          94% { opacity: 1; }
          96% { opacity: 0.8; }
          97% { opacity: 1; }
        }
        @keyframes cc-grid-pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
        .cc-scan-hover:hover .cc-scan-bar {
          animation: cc-scan 0.6s ease-out;
        }
        .cc-neon-text {
          text-shadow: 0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.3);
        }
        .cc-underline {
          position: relative;
        }
        .cc-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #d4553a, #c9a227, #00d4ff);
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .cc-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#d4553a]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles/cyber-chinese/showcase"
              className="flex items-center gap-3 font-bold tracking-[0.2em] uppercase text-sm"
            >
              <SealStamp char="龙" className="text-[#d4553a] w-7 h-7" size={28} />
              <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
                Cyber Chinese
              </span>
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link
                href="/styles/cyber-chinese"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 cc-underline pb-1 font-bold"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 cc-underline pb-1 font-bold"
              >
                StyleKit
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero Section ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Neon grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(212,85,58,0.08) 1px, transparent 1px), linear-gradient(rgba(201,162,39,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "cc-grid-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Content: two-column layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-32 md:pt-0">
          {/* Left: text */}
          <div>
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              <div className="h-px w-8 bg-[#d4553a]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a227]">
                {"// SYSTEM_ORIENT_V2"}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-6">
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
                  CYBER
                </span>
              </span>
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.12s",
                }}
              >
                <span className="cc-neon-text text-[#00d4ff]">CHINESE</span>
              </span>
            </h1>

            <p
              className="text-sm md:text-base text-[#e5e5e5]/50 font-bold tracking-wider max-w-md mb-10 uppercase"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              Where ancient tradition collides with neon-lit futures. Vermilion seals burn through digital grids.
            </p>

            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
              }}
            >
              <CloudPattern className="text-[#c9a227]" />
            </div>
          </div>

          {/* Right: neon lantern HUD panel */}
          <div
            className="relative hidden md:flex items-center justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* HUD frame */}
            <div className="relative border border-[#d4553a]/30 p-8 w-full max-w-sm rounded-none">
              {/* Corner marks */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#c9a227]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#c9a227]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#c9a227]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#c9a227]" />

              {/* Seal stamp */}
              <div className="flex justify-center mb-6">
                <div className="rotate-6">
                  <SealStamp char="印" className="text-[#d4553a]" size={72} />
                </div>
              </div>

              {/* Lanterns row */}
              <div className="flex justify-center gap-8 mb-6">
                <NeonLantern className="text-[#d4553a]" />
                <NeonLantern className="text-[#c9a227]" />
                <NeonLantern className="text-[#d4553a]" />
              </div>

              {/* Status readouts */}
              <div className="space-y-2 font-bold text-xs tracking-widest uppercase">
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]">{"// ORIENT_LINK"}</span>
                  <span className="text-[#00d4ff]" style={{ animation: "cc-neon-flicker 3s infinite" }}>ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]">{"// NEON_GRID"}</span>
                  <span className="text-[#d4553a]">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]">{"// SEAL_AUTH"}</span>
                  <span className="text-[#a020f0]">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-bold tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Component
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Arsenal</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-12 font-bold uppercase">
            Interactive elements forged in neon fire and ancient ink
          </p>
        </RevealBlock>

        {/* Tab Switcher */}
        <RevealBlock delay={0.1} className="mb-12">
          <div className="flex gap-0 border border-[#d4553a]/30 rounded-none">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  cc-scan-hover relative overflow-hidden
                  flex-1 px-6 py-4 text-xs tracking-[0.25em] uppercase font-bold rounded-none
                  transition-all duration-200 ease-out
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-b from-[#d4553a]/30 to-[#0a0a0a] text-[#c9a227] border-b-2 border-[#c9a227] shadow-[0_0_12px_rgba(201,162,39,0.2)]"
                      : "bg-[#0a0a0a] text-[#e5e5e5]/40 hover:text-[#e5e5e5]/70 hover:bg-[#1a1a1a]"
                  }
                `}
              >
                <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Demo panel */}
        <RevealBlock delay={0.2}>
          <div className="relative p-8 md:p-12 bg-[#0a0a0a] border border-[#d4553a]/30 min-h-[300px] rounded-none">
            {/* Corner marks */}
            <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-[#c9a227]" />
            <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-[#c9a227]" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-[#c9a227]" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-[#c9a227]" />

            {/* Button demo */}
            {activeTab === "button" && (
              <div className="flex flex-col items-center gap-8">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c9a227]/50 mb-4 font-bold">
                  {"// Neon warm-up hover -- scan sweep on interaction"}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {/* Primary */}
                  <button
                    className="
                      cc-scan-hover group relative px-8 py-4 overflow-hidden
                      bg-[#d4553a] rounded-none
                      border border-[#c9a227]
                      text-white font-bold tracking-wider uppercase
                      shadow-[0_0_16px_rgba(212,85,58,0.5)]
                      hover:-translate-y-[1px]
                      hover:shadow-[0_0_28px_rgba(201,162,39,0.55),0_0_40px_rgba(0,212,255,0.2)]
                      hover:border-[#00d4ff]/70
                      active:translate-y-[2px]
                      active:shadow-[0_0_12px_rgba(212,85,58,0.4)]
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/25 to-transparent" />
                    <span className="relative z-10">Enter Gate</span>
                  </button>
                  {/* Secondary */}
                  <button
                    className="
                      cc-scan-hover group relative px-8 py-4 overflow-hidden
                      bg-[#0a0a0a] rounded-none
                      border border-[#c9a227]/60
                      text-[#c9a227] font-bold tracking-wider uppercase
                      shadow-[0_0_8px_rgba(201,162,39,0.2)]
                      hover:-translate-y-[1px]
                      hover:border-[#c9a227]
                      hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]
                      active:translate-y-[2px]
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#c9a227]/15 to-transparent" />
                    <span className="relative z-10">Decode Seal</span>
                  </button>
                  {/* Ghost */}
                  <button
                    className="
                      px-8 py-4
                      bg-transparent rounded-none
                      border border-[#00d4ff]/30
                      text-[#00d4ff]/60 font-bold tracking-wider uppercase
                      hover:border-[#00d4ff]
                      hover:text-[#00d4ff]
                      hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]
                      active:translate-y-[1px]
                      transition-all duration-200 ease-out
                    "
                  >
                    Neon Link
                  </button>
                </div>
              </div>
            )}

            {/* Card demo */}
            {activeTab === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Digital Dragon",
                    desc: "Ancient totems rewritten in neon circuitry, roaring through data streams.",
                    seal: "龙",
                  },
                  {
                    title: "Cloud Grid",
                    desc: "Celestial cloud patterns rendered on cybernetic lattice frameworks.",
                    seal: "云",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="
                      cc-scan-hover group relative p-8 overflow-hidden
                      bg-[#0a0a0a]/90 rounded-none
                      border border-[#d4553a]/40
                      shadow-[0_0_16px_rgba(212,85,58,0.15)]
                      hover:-translate-y-[2px]
                      hover:border-[#00d4ff]/60
                      hover:shadow-[0_0_24px_rgba(0,212,255,0.3),0_0_36px_rgba(212,85,58,0.15)]
                      active:translate-y-[1px]
                      transition-all duration-[250ms] ease-out
                      cursor-pointer
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/10 to-transparent" />
                    {/* Seal */}
                    <div className="absolute top-4 right-4 rotate-6 opacity-20 group-hover:opacity-50 transition-opacity duration-200">
                      <SealStamp char={card.seal} className="text-[#d4553a]" size={40} />
                    </div>
                    <span className="block text-xs tracking-[0.3em] text-[#c9a227]/60 mb-2 font-bold uppercase">
                      {`// Unit_0${i + 1}`}
                    </span>
                    <h3 className="text-xl font-bold text-[#c9a227] mb-3 uppercase tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-[#00d4ff]/50 text-sm group-hover:text-[#00d4ff]/80 transition-colors duration-200">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Input demo */}
            {activeTab === "input" && (
              <div className="max-w-md mx-auto space-y-8">
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-[#c9a227] mb-3 font-bold">
                    {"// Inscription_Field"}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter transmission..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#c9a227]/40 rounded-none
                      text-[#00d4ff] placeholder-[#c9a227]/40
                      font-bold
                      focus:border-[#00d4ff]
                      focus:shadow-[0_0_16px_rgba(0,212,255,0.4)]
                      focus:outline-none
                      transition-all duration-200
                    "
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-[#c9a227] mb-3 font-bold">
                    {"// Seal_Code"}
                  </label>
                  <input
                    type="text"
                    placeholder="Authentication seal..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#d4553a]/40 rounded-none
                      text-[#d4553a] placeholder-[#d4553a]/30
                      font-bold
                      focus:border-[#d4553a]
                      focus:shadow-[0_0_16px_rgba(212,85,58,0.4)]
                      focus:outline-none
                      transition-all duration-200
                    "
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 border border-[#c9a227]/50 flex items-center justify-center cursor-pointer hover:border-[#00d4ff] hover:shadow-[0_0_8px_rgba(0,212,255,0.3)] transition-all duration-200 rounded-none">
                    <div className="w-2.5 h-2.5 bg-[#d4553a]" />
                  </div>
                  <span className="text-sm text-[#e5e5e5]/50 tracking-wider font-bold uppercase">
                    Authorize neon protocol
                  </span>
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-bold tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Colour
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Matrix</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-16 font-bold uppercase">
            Ink and neon frequencies mapped to the void
          </p>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={0.1 + i * 0.05}>
                <div
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="
                      w-full aspect-[4/3] mb-4 border border-[#d4553a]/20 rounded-none
                      group-hover:border-[#00d4ff]/60
                      transition-all duration-200 ease-out
                      flex items-end p-4 relative overflow-hidden
                    "
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: hoveredSwatch === i ? `0 0 20px ${color.hex}40` : "none",
                    }}
                  >
                    <span
                      className="text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <h4 className="text-sm tracking-wider mb-1 font-bold uppercase">{color.name}</h4>
                  <p className="text-xs text-[#c9a227]/50 tracking-wider font-bold uppercase">{color.role}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ===== 5. Design Rules (Do / Don't) ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-bold tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Design
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Protocol</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-16 font-bold uppercase">
            The sacred codex governing neon-oriental construction
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Do list */}
          <RevealBlock delay={0.1}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#c9a227]/30 rounded-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#c9a227]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#c9a227]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#c9a227]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#c9a227]" />

              <div className="flex items-center gap-3 mb-8">
                <SealStamp char="可" className="text-[#c9a227] w-6 h-6" size={24} />
                <h3 className="text-lg tracking-[0.25em] uppercase text-[#c9a227] font-bold">
                  Mandate
                </h3>
              </div>
              <ul className="space-y-5">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 bg-[#c9a227] shrink-0 rounded-none" />
                    <span className="text-sm text-[#e5e5e5]/70 leading-relaxed tracking-wider">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Don't list */}
          <RevealBlock delay={0.2}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#d4553a]/30 rounded-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#d4553a]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#d4553a]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#d4553a]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#d4553a]" />

              <div className="flex items-center gap-3 mb-8">
                <SealStamp char="禁" className="text-[#d4553a] w-6 h-6" size={24} />
                <h3 className="text-lg tracking-[0.25em] uppercase text-[#d4553a] font-bold">
                  Forbidden
                </h3>
              </div>
              <ul className="space-y-5">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 bg-[#d4553a] shrink-0 rounded-none" />
                    <span className="text-sm text-[#e5e5e5]/70 leading-relaxed tracking-wider">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Interaction rules */}
        <RevealBlock delay={0.3} className="mt-12">
          <div className="relative p-8 bg-[#0a0a0a] border border-[#a020f0]/20 rounded-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#a020f0]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#a020f0]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#a020f0]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#a020f0]" />

            <div className="flex items-center gap-3 mb-8">
              <SealStamp char="动" className="text-[#a020f0] w-6 h-6" size={24} />
              <h3 className="text-lg tracking-[0.25em] uppercase text-[#a020f0] font-bold">
                Interaction Protocol
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Neon Warm-up",
                  desc: "Hover intensifies border glow and neon halo. 1-2px upward float only; no large displacements.",
                },
                {
                  name: "Seal Press",
                  desc: "Active state drops 1-3px with tightened glow radius, mimicking a stamp pressed into wax.",
                },
                {
                  name: "Scan Sweep",
                  desc: "Triggered light band sweeps across on hover/focus. Short burst animation, never infinite loop.",
                },
                {
                  name: "Tempo Control",
                  desc: "All interactive transitions stay within 180-300ms. No slow fades, no spring-bounce easing.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-[#a020f0] shrink-0 rounded-none" />
                  <div>
                    <span className="text-sm text-[#e5e5e5]/80 tracking-wider font-bold uppercase">
                      {item.name}:
                    </span>{" "}
                    <span className="text-sm text-[#e5e5e5]/50 tracking-wider leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== 6. Footer ===== */}
      <footer className="border-t border-[#d4553a]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <NeonDivider />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-3">
              <SealStamp char="印" className="text-[#d4553a]/50 w-5 h-5" size={20} />
              <p className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/30 font-bold">
                StyleKit &middot; Cyber Chinese Showcase
              </p>
            </div>
            <Link
              href="/styles/cyber-chinese"
              className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/40 cc-underline pb-1 hover:text-[#00d4ff] transition-colors duration-200 font-bold"
            >
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
