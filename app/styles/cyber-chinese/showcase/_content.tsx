"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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

/* --- SVG Decorative Components --- */

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
        x="10"
        y="10"
        width="44"
        height="44"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fill="currentColor"
        fontSize="26"
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
      height="100"
      viewBox="0 0 48 100"
      fill="none"
      className={className}
    >
      <path
        d="M24 0 L24 14"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M20 14 L28 14"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <rect
        x="6"
        y="14"
        width="36"
        height="64"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="10"
        y="18"
        width="28"
        height="56"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <line
        x1="6"
        y1="33"
        x2="42"
        y2="33"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <line
        x1="6"
        y1="60"
        x2="42"
        y2="60"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
      />
      <text
        x="24"
        y="52"
        textAnchor="middle"
        fill="currentColor"
        fontSize="16"
        fontWeight="bold"
        fontFamily="serif"
        opacity="0.9"
      >
        灯
      </text>
      <line
        x1="18"
        y1="78"
        x2="16"
        y2="96"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="24"
        y1="78"
        x2="24"
        y2="100"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="30"
        y1="78"
        x2="32"
        y2="96"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}

function CloudPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      width="160"
      height="48"
      viewBox="0 0 160 48"
      fill="none"
      className={className}
    >
      <path
        d="M0 36 Q20 14, 40 26 Q60 8, 80 26 Q100 14, 120 26 Q140 8, 160 26"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M10 42 Q30 20, 50 32 Q70 14, 90 32 Q110 20, 130 32 Q150 14, 160 28"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M0 28 Q20 8, 40 18 Q60 2, 80 18 Q100 8, 120 18"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
        opacity="0.12"
      />
    </svg>
  );
}

function DragonWave({ className = "" }: { className?: string }) {
  return (
    <svg
      width="240"
      height="60"
      viewBox="0 0 240 60"
      fill="none"
      className={className}
    >
      <path
        d="M0 30 C20 10, 40 50, 60 30 C80 10, 100 50, 120 30 C140 10, 160 50, 180 30 C200 10, 220 50, 240 30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M0 38 C20 18, 40 58, 60 38 C80 18, 100 58, 120 38 C140 18, 160 58, 180 38 C200 18, 220 58, 240 38"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
}

function LatticePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={className}
    >
      {/* Traditional Chinese window lattice */}
      <rect x="0" y="0" width="80" height="80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="8" y="8" width="64" height="64" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="0" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="20" y1="8" x2="20" y2="72" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="60" y1="8" x2="60" y2="72" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="8" y1="20" x2="72" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="8" y1="60" x2="72" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {/* Center diamond */}
      <path d="M40 20 L60 40 L40 60 L20 40 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
    </svg>
  );
}

function NeonDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4553a]/40 to-transparent" />
      <SealStamp char="华" className="text-[#d4553a]/50" size={24} />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent" />
    </div>
  );
}

function CornerMarks({
  color = "#c9a227",
  size = 16,
}: {
  color?: string;
  size?: number;
}) {
  const s = `${size}px`;
  const border = `2px solid ${color}`;
  return (
    <>
      <div
        className="absolute top-0 left-0"
        style={{ width: s, height: s, borderLeft: border, borderTop: border }}
      />
      <div
        className="absolute top-0 right-0"
        style={{ width: s, height: s, borderRight: border, borderTop: border }}
      />
      <div
        className="absolute bottom-0 left-0"
        style={{ width: s, height: s, borderLeft: border, borderBottom: border }}
      />
      <div
        className="absolute bottom-0 right-0"
        style={{ width: s, height: s, borderRight: border, borderBottom: border }}
      />
    </>
  );
}

/* --- Static data --- */

const colorPalette = [
  {
    name: "Void Black",
    nameZh: "虚空黑",
    hex: "#0a0a0a",
    role: "Background",
    textColor: "#e5e5e5",
  },
  {
    name: "Vermilion",
    nameZh: "朱红",
    hex: "#d4553a",
    role: "Primary",
    textColor: "#ffffff",
  },
  {
    name: "Imperial Gold",
    nameZh: "金黄",
    hex: "#c9a227",
    role: "Secondary",
    textColor: "#0a0a0a",
  },
  {
    name: "Neon Cyan",
    nameZh: "霓虹蓝",
    hex: "#00d4ff",
    role: "Accent",
    textColor: "#0a0a0a",
  },
  {
    name: "Neon Purple",
    nameZh: "霓虹紫",
    hex: "#a020f0",
    role: "Accent Variant",
    textColor: "#ffffff",
  },
  {
    name: "Deep Smoke",
    nameZh: "深烟",
    hex: "#1a1a1a",
    role: "Card Surface",
    textColor: "#e5e5e5",
  },
];

const doRules = [
  "Use vermilion #d4553a and imperial gold #c9a227 as primary palette",
  "Pair with neon cyan #00d4ff and neon purple #a020f0 for cyber accents",
  "Use sharp angular shapes — rounded-none on all interactive elements",
  "Apply neon glow effects via box-shadow on all interactive elements",
  "Integrate Chinese cultural motifs: seal stamps, cloud patterns, lattice",
  "Maintain deep black #0a0a0a as the foundational canvas at all times",
  "Keep hover transitions 180-300ms; prioritize transform + box-shadow",
  "Use scan sweep light band on hover/focus as short triggered animation",
];

const dontRules = [
  "Never use bright white or light-colored backgrounds",
  "Avoid soft rounded shapes — rounded-lg, rounded-xl, rounded-full are banned",
  "Do not omit neon glow effects from interactive elements",
  "Avoid overly Western decorative elements that break oriental aesthetic",
  "Never use spring-bounce, cutesy shake, or oversized scale animations",
  "Avoid transitions slower than 400ms on any interactive control",
];

const typographySamples = [
  {
    label: "Display — 显示标题",
    sampleZh: "龙",
    sampleEn: "CYBER DRAGON",
    size: "text-6xl md:text-8xl",
    weight: "font-black",
    desc: "Ultra-bold display weight. Gradient vermilion-to-gold. Chinese character alongside Latin headline.",
  },
  {
    label: "Heading — 章节标题",
    sampleZh: "数字未来",
    sampleEn: "DIGITAL ORIENT",
    size: "text-3xl md:text-4xl",
    weight: "font-bold",
    desc: "Bold tracking-wider uppercase. Neon cyan accent on alternate lines.",
  },
  {
    label: "Body — 正文",
    sampleZh: "东方与未来的碰撞",
    sampleEn: "Where tradition meets tomorrow",
    size: "text-base",
    weight: "font-normal",
    desc: "Clean legible body with generous line-height. Muted neon-blue tint on dark black.",
  },
  {
    label: "Label — 标签",
    sampleZh: "赛博",
    sampleEn: "// CYBER_ORIENT",
    size: "text-xs",
    weight: "font-bold",
    desc: "Monospace-flavoured label with tracking-[0.25em] and gold tint. Code-comment prefix.",
  },
];

const verticalChars = ["龙", "数", "字", "未", "来", "赛", "博", "科", "技"];

/* === Main Component === */

export default function CyberChineseShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">(
    "button"
  );
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeTypo, setActiveTypo] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      <style>{`
        @keyframes cc-scan {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(440%) skewX(-20deg); }
        }
        @keyframes cc-neon-flicker {
          0%, 89%, 91%, 93%, 95%, 100% { opacity: 1; }
          90% { opacity: 0.65; }
          92% { opacity: 0.85; }
          94% { opacity: 0.7; }
        }
        @keyframes cc-grid-pulse {
          0%, 100% { opacity: 0.07; }
          50% { opacity: 0.13; }
        }
        @keyframes cc-vertical-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes cc-border-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(212,85,58,0.3); }
          50%       { box-shadow: 0 0 18px rgba(212,85,58,0.6), 0 0 30px rgba(201,162,39,0.2); }
        }
        .cc-scan-hover:hover .cc-scan-bar {
          animation: cc-scan 0.55s ease-out;
        }
        .cc-neon-text {
          text-shadow: 0 0 10px rgba(0,212,255,0.55), 0 0 22px rgba(0,212,255,0.3);
        }
        .cc-vermilion-text {
          text-shadow: 0 0 10px rgba(212,85,58,0.6), 0 0 22px rgba(212,85,58,0.3);
        }
        .cc-gold-text {
          text-shadow: 0 0 10px rgba(201,162,39,0.5), 0 0 20px rgba(201,162,39,0.25);
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
          transition: transform 0.28s ease-out;
        }
        .cc-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .cc-circuit-bg {
          background-image:
            linear-gradient(90deg, rgba(212,85,58,0.08) 1px, transparent 1px),
            linear-gradient(rgba(201,162,39,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .cc-border-pulse {
          animation: cc-border-glow 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#d4553a]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/styles/cyber-chinese/showcase"
              className="flex items-center gap-3 font-black tracking-[0.2em] uppercase text-sm group"
            >
              <SealStamp
                char="龙"
                className="text-[#d4553a] transition-all duration-200 group-hover:text-[#c9a227] group-hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.8)]"
                size={30}
              />
              <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent group-hover:from-[#c9a227] group-hover:to-[#00d4ff] transition-all duration-300">
                CYBER CHINESE
              </span>
            </Link>

            {/* Vertical character strip (decorative) */}
            <div className="hidden lg:flex items-center gap-1 opacity-20 select-none">
              {["赛", "博", "中", "华"].map((ch, i) => (
                <span
                  key={i}
                  className="text-[10px] text-[#c9a227] font-bold"
                  style={{ writingMode: "vertical-lr" }}
                >
                  {ch}
                </span>
              ))}
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-6 md:gap-10">
              <Link
                href="/styles/cyber-chinese"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 cc-underline pb-1 font-bold hover:text-[#c9a227] transition-colors duration-200"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 cc-underline pb-1 font-bold hover:text-[#c9a227] transition-colors duration-200"
              >
                StyleKit
              </Link>
              <Link
                href="/styles/cyber-chinese"
                className="
                  cc-scan-hover relative overflow-hidden
                  px-4 py-2
                  border border-[#d4553a]/50
                  text-[10px] tracking-[0.2em] uppercase font-bold
                  text-[#d4553a]
                  hover:border-[#d4553a]
                  hover:shadow-[0_0_14px_rgba(212,85,58,0.4)]
                  active:translate-y-[1px]
                  transition-all duration-200 ease-out
                  hidden md:block
                "
              >
                <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#d4553a]/20 to-transparent" />
                <span className="relative z-10">Build</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero Section ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Circuit-grid background */}
        <div
          className="absolute inset-0 cc-circuit-bg"
          style={{ animation: "cc-grid-pulse 4s ease-in-out infinite" }}
        />

        {/* Ambient left glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] bg-[#d4553a]/10 pointer-events-none" />
        {/* Ambient right glow */}
        <div className="absolute right-0 top-1/3 w-72 h-72 rounded-full blur-[100px] bg-[#a020f0]/8 pointer-events-none" />

        {/* Vertical sidebar: Chinese characters */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 pointer-events-none">
          <div
            className="overflow-hidden h-64 flex flex-col items-center"
          >
            <div
              className="flex flex-col gap-6"
              style={{ animation: "cc-vertical-scroll 12s linear infinite" }}
            >
              {[...verticalChars, ...verticalChars].map((ch, i) => (
                <span
                  key={i}
                  className="text-sm font-bold text-[#c9a227]/30"
                  style={{ writingMode: "vertical-lr" }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-32 pb-16 md:pt-0 md:pb-0">
          {/* Left: text column */}
          <div>
            {/* System tag */}
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              <div className="h-px w-8 bg-[#d4553a]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a227]">
                {"// SYSTEM_ORIENT_V2.4"}
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.0] tracking-tight mb-8">
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent cc-vermilion-text">
                  CYBER
                </span>
              </span>
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.12s",
                }}
              >
                <span className="cc-neon-text text-[#00d4ff]">CHINESE</span>
              </span>
              <span
                className="block text-[#c9a227]/60 text-3xl md:text-4xl tracking-[0.4em] mt-2"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s",
                }}
              >
                赛博中华
              </span>
            </h1>

            {/* Tagline */}
            <p
              className="text-sm md:text-base text-[#e5e5e5]/45 font-bold tracking-wider max-w-sm mb-6 uppercase leading-relaxed"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
              }}
            >
              Ancient vermilion seals blazing through digital grids. Dragon
              totems reborn in neon fire.
            </p>

            {/* Cloud pattern */}
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
              }}
            >
              <CloudPattern className="text-[#c9a227]" />
            </div>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-4 mt-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s",
              }}
            >
              <button
                className="
                  cc-scan-hover relative overflow-hidden
                  px-8 py-4
                  bg-[#d4553a] rounded-none
                  border border-[#c9a227]
                  text-white font-bold tracking-wider uppercase text-sm
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
              <button
                className="
                  px-8 py-4
                  bg-transparent rounded-none
                  border border-[#c9a227]/40
                  text-[#c9a227] font-bold tracking-wider uppercase text-sm
                  hover:border-[#c9a227]
                  hover:shadow-[0_0_16px_rgba(201,162,39,0.3)]
                  active:translate-y-[1px]
                  transition-all duration-200 ease-out
                "
              >
                View Docs
              </button>
            </div>
          </div>

          {/* Right: HUD panel */}
          <div
            className="relative hidden md:flex items-center justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateX(0)" : "translateX(50px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <div className="relative border border-[#d4553a]/30 p-10 w-full max-w-sm rounded-none cc-border-pulse">
              <CornerMarks color="#c9a227" size={18} />

              {/* HUD header */}
              <div className="mb-6 text-center">
                <span className="text-xs tracking-[0.3em] uppercase text-[#c9a227]/60 font-bold">
                  {"// HUD_ORIENT_SYSTEM"}
                </span>
              </div>

              {/* Central seal */}
              <div className="flex justify-center mb-8">
                <div className="rotate-[8deg]">
                  <SealStamp char="印" className="text-[#d4553a]" size={88} />
                </div>
              </div>

              {/* Lanterns row */}
              <div className="flex justify-center gap-10 mb-8">
                <NeonLantern className="text-[#d4553a]" />
                <NeonLantern className="text-[#c9a227]" />
                <NeonLantern className="text-[#d4553a]" />
              </div>

              {/* Status readouts */}
              <div className="space-y-3 font-bold text-xs tracking-widest uppercase border-t border-[#c9a227]/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]/70">{"// ORIENT_LINK"}</span>
                  <span
                    className="text-[#00d4ff]"
                    style={{ animation: "cc-neon-flicker 4s infinite" }}
                  >
                    ACTIVE
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]/70">{"// NEON_GRID"}</span>
                  <span className="text-[#d4553a]">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]/70">{"// SEAL_AUTH"}</span>
                  <span className="text-[#a020f0]">VERIFIED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c9a227]/70">{"// DRAGON_NODE"}</span>
                  <span className="text-[#c9a227]">STANDBY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden opacity-20 pointer-events-none">
          <DragonWave className="text-[#c9a227] w-full" />
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-black tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Component
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Arsenal</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-14 font-bold uppercase">
            Interactive elements forged in neon fire and ancient ink
          </p>
        </RevealBlock>

        {/* Tab switcher */}
        <RevealBlock delay={0.1} className="mb-10">
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
                      ? "bg-gradient-to-b from-[#d4553a]/20 to-[#0a0a0a] text-[#c9a227] border-b-2 border-[#c9a227] shadow-[inset_0_0_12px_rgba(201,162,39,0.08)]"
                      : "bg-[#0a0a0a] text-[#e5e5e5]/40 hover:text-[#e5e5e5]/70 hover:bg-[#111]"
                  }
                `}
              >
                <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/12 to-transparent" />
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Demo panel */}
        <RevealBlock delay={0.2}>
          <div className="relative p-8 md:p-14 bg-[#0a0a0a] border border-[#d4553a]/25 min-h-[340px] rounded-none">
            <CornerMarks color="#c9a227" size={20} />

            {/* Button demos */}
            {activeTab === "button" && (
              <div className="flex flex-col items-center gap-10">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c9a227]/40 font-bold">
                  {"// Hover = neon warm-up | Active = seal press"}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {/* Primary — vermilion */}
                  <button
                    className="
                      cc-scan-hover group relative px-8 py-4 overflow-hidden
                      bg-[#d4553a] rounded-none
                      border border-[#c9a227]
                      text-white font-bold tracking-wider uppercase text-sm
                      shadow-[0_0_16px_rgba(212,85,58,0.5)]
                      hover:-translate-y-[1px]
                      hover:shadow-[0_0_28px_rgba(201,162,39,0.55),0_0_40px_rgba(0,212,255,0.2)]
                      hover:border-[#00d4ff]/70
                      active:translate-y-[2px]
                      active:shadow-[0_0_10px_rgba(212,85,58,0.4)]
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/25 to-transparent" />
                    <span className="relative z-10">Enter Gate</span>
                  </button>

                  {/* Secondary — gold outline */}
                  <button
                    className="
                      cc-scan-hover group relative px-8 py-4 overflow-hidden
                      bg-[#0a0a0a] rounded-none
                      border border-[#c9a227]/60
                      text-[#c9a227] font-bold tracking-wider uppercase text-sm
                      shadow-[0_0_8px_rgba(201,162,39,0.15)]
                      hover:-translate-y-[1px]
                      hover:border-[#c9a227]
                      hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]
                      active:translate-y-[2px]
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#c9a227]/12 to-transparent" />
                    <span className="relative z-10">Decode Seal</span>
                  </button>

                  {/* Ghost — neon cyan */}
                  <button
                    className="
                      px-8 py-4
                      bg-transparent rounded-none
                      border border-[#00d4ff]/30
                      text-[#00d4ff]/60 font-bold tracking-wider uppercase text-sm
                      hover:border-[#00d4ff]
                      hover:text-[#00d4ff]
                      hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]
                      active:translate-y-[1px]
                      transition-all duration-200 ease-out
                    "
                  >
                    Neon Link
                  </button>

                  {/* Danger — purple accent */}
                  <button
                    className="
                      cc-scan-hover relative overflow-hidden
                      px-8 py-4
                      bg-[#a020f0]/10 rounded-none
                      border border-[#a020f0]/50
                      text-[#a020f0] font-bold tracking-wider uppercase text-sm
                      hover:bg-[#a020f0]/20
                      hover:border-[#a020f0]
                      hover:shadow-[0_0_16px_rgba(160,32,240,0.4)]
                      active:translate-y-[1px]
                      transition-all duration-200 ease-out
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#a020f0]/15 to-transparent" />
                    <span className="relative z-10">Invoke Dragon</span>
                  </button>
                </div>

                {/* Button size variants */}
                <div className="flex flex-wrap justify-center gap-4 border-t border-[#c9a227]/10 pt-8 w-full">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#c9a227]/30 font-bold w-full text-center mb-2">
                    {"// Size variants"}
                  </span>
                  {[
                    { label: "Small", px: "px-4 py-2 text-xs" },
                    { label: "Medium", px: "px-6 py-3 text-sm" },
                    { label: "Large", px: "px-10 py-5 text-base" },
                  ].map((v) => (
                    <button
                      key={v.label}
                      className={`
                        cc-scan-hover relative overflow-hidden
                        ${v.px}
                        bg-[#d4553a] rounded-none
                        border border-[#c9a227]
                        text-white font-bold tracking-wider uppercase
                        shadow-[0_0_10px_rgba(212,85,58,0.4)]
                        hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]
                        hover:-translate-y-[1px]
                        active:translate-y-[1px]
                        transition-all duration-200 ease-out
                      `}
                    >
                      <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
                      <span className="relative z-10">{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card demos */}
            {activeTab === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Digital Dragon",
                    titleZh: "数字龙",
                    desc: "Ancient totems rewritten in neon circuitry, roaring through cascading data streams.",
                    seal: "龙",
                    accent: "#00d4ff",
                  },
                  {
                    title: "Cloud Grid",
                    titleZh: "云格",
                    desc: "Celestial cloud patterns rendered across cybernetic lattice frameworks.",
                    seal: "云",
                    accent: "#c9a227",
                  },
                  {
                    title: "Seal Protocol",
                    titleZh: "印章协议",
                    desc: "Authentication seals converted into encrypted neon signatures.",
                    seal: "印",
                    accent: "#d4553a",
                  },
                  {
                    title: "Phoenix Data",
                    titleZh: "凤凰数据",
                    desc: "Rebirth cycles modelled on mythic phoenix — continuous regeneration loops.",
                    seal: "凤",
                    accent: "#a020f0",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="
                      cc-scan-hover group relative p-8 overflow-hidden
                      bg-[#0a0a0a]/90 rounded-none
                      border border-[#d4553a]/30
                      shadow-[0_0_12px_rgba(212,85,58,0.1)]
                      hover:-translate-y-[2px]
                      hover:border-[#00d4ff]/50
                      hover:shadow-[0_0_24px_rgba(0,212,255,0.25),0_0_36px_rgba(212,85,58,0.12)]
                      active:translate-y-[1px]
                      transition-all duration-[250ms] ease-out
                      cursor-pointer
                    "
                  >
                    <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#00d4ff]/8 to-transparent" />
                    {/* Seal watermark */}
                    <div className="absolute top-4 right-4 rotate-[10deg] opacity-15 group-hover:opacity-40 transition-opacity duration-250">
                      <SealStamp
                        char={card.seal}
                        className="text-[#d4553a]"
                        size={44}
                      />
                    </div>
                    <span className="block text-xs tracking-[0.3em] text-[#c9a227]/50 mb-2 font-bold uppercase">
                      {`// Unit_0${i + 1}`}
                    </span>
                    <h3 className="text-xl font-black text-[#c9a227] mb-1 uppercase tracking-wider">
                      {card.title}
                    </h3>
                    <p
                      className="text-xs font-bold tracking-[0.15em] mb-4"
                      style={{ color: card.accent + "80" }}
                    >
                      {card.titleZh}
                    </p>
                    <p className="text-[#00d4ff]/45 text-sm group-hover:text-[#00d4ff]/75 transition-colors duration-200 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Input demos */}
            {activeTab === "input" && (
              <div className="max-w-md mx-auto space-y-8">
                {/* Text field — gold */}
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
                      text-[#00d4ff] placeholder-[#c9a227]/35
                      font-bold tracking-wider
                      focus:border-[#00d4ff]
                      focus:shadow-[0_0_16px_rgba(0,212,255,0.4)]
                      focus:outline-none
                      transition-all duration-200
                    "
                  />
                </div>

                {/* Seal code field — vermilion */}
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-[#c9a227] mb-3 font-bold">
                    {"// Seal_Auth_Code"}
                  </label>
                  <input
                    type="text"
                    placeholder="Authentication seal..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#d4553a]/40 rounded-none
                      text-[#d4553a] placeholder-[#d4553a]/30
                      font-bold tracking-wider
                      focus:border-[#d4553a]
                      focus:shadow-[0_0_16px_rgba(212,85,58,0.4)]
                      focus:outline-none
                      transition-all duration-200
                    "
                  />
                </div>

                {/* Textarea */}
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-[#c9a227] mb-3 font-bold">
                    {"// Dragon_Scroll"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Inscribe your message..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#a020f0]/30 rounded-none
                      text-[#a020f0]/80 placeholder-[#a020f0]/25
                      font-bold tracking-wider resize-none
                      focus:border-[#a020f0]
                      focus:shadow-[0_0_16px_rgba(160,32,240,0.35)]
                      focus:outline-none
                      transition-all duration-200
                    "
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 border border-[#c9a227]/50 flex items-center justify-center cursor-pointer hover:border-[#00d4ff] hover:shadow-[0_0_8px_rgba(0,212,255,0.3)] transition-all duration-200 rounded-none shrink-0">
                    <div className="w-2.5 h-2.5 bg-[#d4553a]" />
                  </div>
                  <span className="text-sm text-[#e5e5e5]/50 tracking-wider font-bold uppercase">
                    Authorize neon protocol
                  </span>
                </div>

                {/* Submit */}
                <button
                  className="
                    cc-scan-hover relative overflow-hidden
                    w-full px-8 py-4
                    bg-gradient-to-r from-[#d4553a] to-[#c9a227] rounded-none
                    text-white font-black tracking-[0.25em] uppercase text-sm
                    shadow-[0_0_20px_rgba(212,85,58,0.5)]
                    hover:shadow-[0_0_32px_rgba(201,162,39,0.6),0_0_48px_rgba(0,212,255,0.15)]
                    hover:-translate-y-[1px]
                    active:translate-y-[2px]
                    active:shadow-[0_0_12px_rgba(212,85,58,0.4)]
                    transition-all duration-200 ease-out
                  "
                >
                  <span className="cc-scan-bar pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10">Transmit Seal</span>
                </button>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-black tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Colour
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Matrix</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-16 font-bold uppercase">
            Ink and neon frequencies mapped to the void
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {colorPalette.map((color, i) => (
            <RevealBlock key={color.hex} delay={0.08 + i * 0.06}>
              <div
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredSwatch(i)}
                onMouseLeave={() => setHoveredSwatch(null)}
              >
                <div
                  className="
                    w-full aspect-[4/3] mb-4 border border-[#d4553a]/15 rounded-none
                    group-hover:border-[#00d4ff]/50
                    transition-all duration-200 ease-out
                    flex items-end p-4 relative overflow-hidden
                  "
                  style={{
                    backgroundColor: color.hex,
                    boxShadow:
                      hoveredSwatch === i
                        ? `0 0 24px ${color.hex}55, 0 0 48px ${color.hex}22`
                        : "none",
                  }}
                >
                  <span
                    className="text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold"
                    style={{ color: color.textColor }}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm tracking-wider mb-0.5 font-black uppercase text-[#e5e5e5]">
                      {color.name}
                    </h4>
                    <p className="text-xs text-[#c9a227]/50 tracking-wider font-bold uppercase">
                      {color.nameZh}
                    </p>
                  </div>
                  <p className="text-xs text-[#e5e5e5]/30 tracking-wider font-bold uppercase mt-1">
                    {color.role}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Color usage chart */}
        <RevealBlock delay={0.4} className="mt-16">
          <div className="relative p-8 bg-[#0a0a0a] border border-[#c9a227]/20 rounded-none">
            <CornerMarks color="#c9a227" size={14} />
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-bold mb-6">
              {"// USAGE_RATIO_CHART"}
            </p>
            <div className="space-y-4">
              {[
                { label: "Void Black — Background", pct: 70, color: "#0a0a0a", border: "#1a1a1a" },
                { label: "Vermilion — Primary actions", pct: 12, color: "#d4553a", border: "transparent" },
                { label: "Imperial Gold — Borders / labels", pct: 10, color: "#c9a227", border: "transparent" },
                { label: "Neon Cyan — Accent / focus", pct: 5, color: "#00d4ff", border: "transparent" },
                { label: "Neon Purple — Variant accent", pct: 3, color: "#a020f0", border: "transparent" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e5e5e5]/50 w-52 shrink-0">
                    {bar.label}
                  </span>
                  <div className="flex-1 bg-[#1a1a1a] h-3 rounded-none overflow-hidden">
                    <div
                      className="h-full rounded-none transition-all duration-700"
                      style={{
                        width: `${bar.pct}%`,
                        backgroundColor: bar.color,
                        border: `1px solid ${bar.border}`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-black text-[#c9a227] w-10 text-right">
                    {bar.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== 5. Design Protocol (Do / Don't) ===== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-black tracking-wider mb-4 uppercase">
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
          {/* Mandate (Do) */}
          <RevealBlock delay={0.1}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#c9a227]/25 rounded-none h-full">
              <CornerMarks color="#c9a227" size={14} />
              <div className="flex items-center gap-3 mb-8">
                <SealStamp char="可" className="text-[#c9a227]" size={28} />
                <h3 className="text-base tracking-[0.25em] uppercase text-[#c9a227] font-black">
                  Mandate
                </h3>
              </div>
              <ul className="space-y-5">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 bg-[#c9a227] shrink-0 rounded-none" />
                    <span className="text-sm text-[#e5e5e5]/65 leading-relaxed tracking-wide">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Forbidden (Don't) */}
          <RevealBlock delay={0.2}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#d4553a]/25 rounded-none h-full">
              <CornerMarks color="#d4553a" size={14} />
              <div className="flex items-center gap-3 mb-8">
                <SealStamp char="禁" className="text-[#d4553a]" size={28} />
                <h3 className="text-base tracking-[0.25em] uppercase text-[#d4553a] font-black">
                  Forbidden
                </h3>
              </div>
              <ul className="space-y-5">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 bg-[#d4553a] shrink-0 rounded-none" />
                    <span className="text-sm text-[#e5e5e5]/65 leading-relaxed tracking-wide">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Interaction Protocol panel */}
        <RevealBlock delay={0.3} className="mt-10">
          <div className="relative p-8 md:p-10 bg-[#0a0a0a] border border-[#a020f0]/20 rounded-none">
            <CornerMarks color="#a020f0" size={14} />
            <div className="flex items-center gap-3 mb-8">
              <SealStamp char="动" className="text-[#a020f0]" size={28} />
              <h3 className="text-base tracking-[0.25em] uppercase text-[#a020f0] font-black">
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
                  desc: "Active drops 1-3px with tightened glow radius, mimicking a stamp pressed into wax.",
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
                    <span className="text-sm text-[#e5e5e5]/80 tracking-wider font-black uppercase">
                      {item.name}:{" "}
                    </span>
                    <span className="text-sm text-[#e5e5e5]/45 tracking-wider leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== 6. Typography ===== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-black tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Typography
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Fusion</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-14 font-bold uppercase">
            Chinese characters fused with Latin letterforms in neon harmony
          </p>
        </RevealBlock>

        {/* Type scale tabs */}
        <RevealBlock delay={0.1} className="mb-10">
          <div className="flex gap-0 border border-[#d4553a]/30 rounded-none overflow-x-auto">
            {typographySamples.map((sample, i) => (
              <button
                key={i}
                onClick={() => setActiveTypo(i)}
                className={`
                  flex-1 min-w-[120px] px-4 py-3 text-xs tracking-[0.2em] uppercase font-bold rounded-none
                  transition-all duration-200 ease-out whitespace-nowrap
                  ${
                    activeTypo === i
                      ? "bg-[#d4553a]/15 text-[#c9a227] border-b-2 border-[#c9a227]"
                      : "bg-[#0a0a0a] text-[#e5e5e5]/40 hover:text-[#e5e5e5]/60 hover:bg-[#111]"
                  }
                `}
              >
                {sample.label.split(" — ")[0]}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Active type sample */}
        <RevealBlock delay={0.15}>
          <div className="relative p-10 md:p-16 bg-[#0a0a0a] border border-[#d4553a]/20 rounded-none overflow-hidden">
            <CornerMarks color="#c9a227" size={18} />
            {/* Background lattice motif */}
            <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
              <LatticePattern className="text-[#c9a227]" />
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a227]/40 font-bold mb-8">
              {`// ${typographySamples[activeTypo].label}`}
            </p>

            {/* Chinese character display */}
            <div className="flex items-start gap-8 flex-wrap mb-8">
              <div
                className={`${typographySamples[activeTypo].size} ${typographySamples[activeTypo].weight} bg-gradient-to-b from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent leading-none`}
              >
                {typographySamples[activeTypo].sampleZh}
              </div>
              <div className="h-auto w-px bg-[#c9a227]/20 self-stretch hidden md:block" />
              <div
                className={`${typographySamples[activeTypo].size} ${typographySamples[activeTypo].weight} cc-neon-text text-[#00d4ff] leading-none`}
              >
                {typographySamples[activeTypo].sampleEn}
              </div>
            </div>

            <p className="text-sm text-[#e5e5e5]/45 tracking-wider leading-relaxed max-w-lg">
              {typographySamples[activeTypo].desc}
            </p>
          </div>
        </RevealBlock>

        {/* Vertical text showcase */}
        <RevealBlock delay={0.25} className="mt-10">
          <div className="relative p-8 bg-[#0a0a0a] border border-[#c9a227]/15 rounded-none overflow-hidden">
            <CornerMarks color="#c9a227" size={14} />
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a227]/40 font-bold mb-8">
              {"// VERTICAL_TEXT_ARRANGEMENT — 竖排文字"}
            </p>
            <div className="flex gap-8 items-start">
              {/* Vertical column 1 — vermilion */}
              <div className="flex flex-col items-center gap-1" style={{ writingMode: "vertical-lr" }}>
                {["龙", "凤", "印", "章"].map((ch, i) => (
                  <span
                    key={i}
                    className="text-2xl font-black text-[#d4553a] cc-vermilion-text leading-none"
                  >
                    {ch}
                  </span>
                ))}
              </div>
              {/* Divider */}
              <div className="w-px bg-gradient-to-b from-transparent via-[#c9a227]/30 to-transparent self-stretch" />
              {/* Vertical column 2 — gold */}
              <div className="flex flex-col items-center gap-1" style={{ writingMode: "vertical-lr" }}>
                {["赛", "博", "中", "华"].map((ch, i) => (
                  <span
                    key={i}
                    className="text-2xl font-black text-[#c9a227] cc-gold-text leading-none"
                  >
                    {ch}
                  </span>
                ))}
              </div>
              {/* Divider */}
              <div className="w-px bg-gradient-to-b from-transparent via-[#00d4ff]/20 to-transparent self-stretch" />
              {/* Vertical column 3 — cyan */}
              <div className="flex flex-col items-center gap-1" style={{ writingMode: "vertical-lr" }}>
                {["未", "来", "东", "方"].map((ch, i) => (
                  <span
                    key={i}
                    className="text-2xl font-black text-[#00d4ff]/60 cc-neon-text leading-none"
                  >
                    {ch}
                  </span>
                ))}
              </div>
              {/* Right: Latin pairing explanation */}
              <div className="ml-auto hidden md:flex flex-col justify-center gap-4 max-w-xs">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c9a227]/50 font-bold">
                  {"// CHARACTER_PAIRING"}
                </p>
                <p className="text-sm text-[#e5e5e5]/40 leading-relaxed tracking-wide">
                  Traditional Chinese characters used as decorative anchors — not as body copy. Pair with bold uppercase Latin for legibility across international audiences.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-px flex-1 bg-[#d4553a]/30" />
                  <span className="text-xs font-black tracking-widest text-[#d4553a]">
                    SERIF FUSION
                  </span>
                  <div className="h-px flex-1 bg-[#d4553a]/30" />
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* Glyph showcase grid */}
        <RevealBlock delay={0.35} className="mt-10">
          <div className="relative p-8 bg-[#0a0a0a] border border-[#a020f0]/15 rounded-none">
            <CornerMarks color="#a020f0" size={14} />
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a227]/40 font-bold mb-8">
              {"// CYBER_GLYPH_MATRIX"}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { zh: "龙", en: "DRAGON", color: "#d4553a" },
                { zh: "数", en: "DATA", color: "#c9a227" },
                { zh: "字", en: "GLYPH", color: "#00d4ff" },
                { zh: "未", en: "FUTURE", color: "#a020f0" },
                { zh: "来", en: "ARRIVE", color: "#d4553a" },
                { zh: "赛", en: "CYBER", color: "#c9a227" },
              ].map((glyph, i) => (
                <div
                  key={i}
                  className="
                    group flex flex-col items-center gap-2 p-4
                    border border-transparent
                    hover:border-[#c9a227]/30
                    hover:shadow-[0_0_12px_rgba(201,162,39,0.1)]
                    transition-all duration-200 ease-out cursor-default
                    rounded-none
                  "
                >
                  <span
                    className="text-4xl font-black leading-none group-hover:scale-110 transition-transform duration-200"
                    style={{ color: glyph.color }}
                  >
                    {glyph.zh}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-black text-[#e5e5e5]/30">
                    {glyph.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== 7. Pattern & Motif Gallery ===== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <NeonDivider />
          <h2 className="text-3xl md:text-5xl text-center font-black tracking-wider mb-4 uppercase">
            <span className="bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
              Motif
            </span>{" "}
            <span className="cc-neon-text text-[#00d4ff]">Library</span>
          </h2>
          <p className="text-center text-sm text-[#e5e5e5]/40 tracking-wider mb-16 font-bold uppercase">
            Traditional ornamental elements reborn in neon geometry
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Seal stamps panel */}
          <RevealBlock delay={0.1}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#d4553a]/25 rounded-none h-full">
              <CornerMarks color="#d4553a" size={12} />
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a227]/50 font-bold mb-6">
                {"// SEAL_STAMPS"}
              </p>
              <div className="flex flex-wrap gap-4 items-center justify-center py-4">
                {[
                  { char: "印", label: "Seal" },
                  { char: "龙", label: "Dragon" },
                  { char: "凤", label: "Phoenix" },
                  { char: "华", label: "China" },
                ].map(({ char, label }, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                    <div
                      className="
                        transition-all duration-200 ease-out
                        group-hover:drop-shadow-[0_0_10px_rgba(212,85,58,0.8)]
                      "
                      style={{
                        transform: i % 2 === 0 ? "rotate(8deg)" : "rotate(-5deg)",
                      }}
                    >
                      <SealStamp char={char} className="text-[#d4553a]" size={56} />
                    </div>
                    <span className="text-xs tracking-widest text-[#d4553a]/40 uppercase font-bold">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Cloud patterns panel */}
          <RevealBlock delay={0.15}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#c9a227]/25 rounded-none h-full">
              <CornerMarks color="#c9a227" size={12} />
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a227]/50 font-bold mb-6">
                {"// CLOUD_PATTERNS"}
              </p>
              <div className="flex flex-col gap-6 py-4 items-center">
                <CloudPattern className="text-[#c9a227]" />
                <CloudPattern className="text-[#d4553a]" />
                <CloudPattern className="text-[#00d4ff]" />
                <DragonWave className="text-[#a020f0]" />
              </div>
            </div>
          </RevealBlock>

          {/* Lattice / circuit panel */}
          <RevealBlock delay={0.2}>
            <div className="relative p-8 bg-[#0a0a0a] border border-[#00d4ff]/20 rounded-none h-full">
              <CornerMarks color="#00d4ff" size={12} />
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a227]/50 font-bold mb-6">
                {"// LATTICE_CIRCUIT"}
              </p>
              <div className="flex flex-wrap gap-6 py-4 items-center justify-center">
                <LatticePattern className="text-[#00d4ff]" />
                <LatticePattern className="text-[#c9a227]" />
                <LatticePattern className="text-[#d4553a]" />
                <LatticePattern className="text-[#a020f0]" />
              </div>
              <p className="text-xs text-[#00d4ff]/30 tracking-wider leading-relaxed mt-4 font-bold">
                Traditional Chinese window lattice meets circuit board topology.
                Angular geometry only — no curves.
              </p>
            </div>
          </RevealBlock>
        </div>

        {/* Neon lanterns row */}
        <RevealBlock delay={0.3} className="mt-8">
          <div className="relative p-8 bg-[#0a0a0a] border border-[#d4553a]/20 rounded-none overflow-hidden">
            <CornerMarks color="#c9a227" size={14} />
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a227]/50 font-bold mb-8">
              {"// NEON_LANTERN_ROW — 霓虹灯笼"}
            </p>
            <div className="flex justify-around items-start overflow-x-auto gap-4 pb-2">
              {[
                { color: "#d4553a", label: "Vermilion" },
                { color: "#c9a227", label: "Gold" },
                { color: "#00d4ff", label: "Neon Blue" },
                { color: "#a020f0", label: "Neon Purple" },
                { color: "#d4553a", label: "Vermilion" },
              ].map(({ color, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-3" style={{ color }}>
                  <NeonLantern className="transition-all duration-300 hover:drop-shadow-[0_0_12px_currentColor]" />
                  <span className="text-[9px] tracking-widest uppercase font-black opacity-60">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== Footer with traditional pattern elements ===== */}
      <footer className="border-t border-[#d4553a]/20 relative overflow-hidden">
        {/* Background circuit texture */}
        <div
          className="absolute inset-0 cc-circuit-bg opacity-30 pointer-events-none"
        />

        {/* Decorative top strip */}
        <div className="relative overflow-hidden h-12 border-b border-[#c9a227]/10">
          <div className="flex items-center h-full px-6 gap-4 opacity-15 select-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="text-xs font-black text-[#c9a227]"
                style={{ writingMode: "vertical-lr" }}
              >
                {verticalChars[i % verticalChars.length]}
              </span>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <NeonDivider />

          {/* Footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SealStamp char="龙" className="text-[#d4553a]" size={36} />
                <div>
                  <p className="text-sm font-black tracking-[0.2em] uppercase bg-gradient-to-r from-[#d4553a] to-[#c9a227] bg-clip-text text-transparent">
                    Cyber Chinese
                  </p>
                  <p className="text-xs text-[#c9a227]/40 tracking-wider font-bold">
                    赛博中华风
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#e5e5e5]/30 leading-relaxed tracking-wide max-w-xs">
                Fusion of traditional Chinese aesthetics with cyberpunk
                sci-fi vision. Ancient meets neon.
              </p>
            </div>

            {/* Cloud pattern column */}
            <div className="flex flex-col items-center justify-center gap-4">
              <CloudPattern className="text-[#c9a227]" />
              <div className="flex gap-4">
                {["龙", "凤", "印", "云"].map((ch, i) => (
                  <SealStamp
                    key={i}
                    char={ch}
                    className="text-[#d4553a]/20 hover:text-[#d4553a]/60 transition-colors duration-200 cursor-default"
                    size={28}
                  />
                ))}
              </div>
            </div>

            {/* Links column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a227]/50 font-bold mb-2">
                {"// NAVIGATION"}
              </p>
              {[
                { href: "/styles/cyber-chinese", label: "Documentation" },
                { href: "/styles/cyber-chinese/showcase", label: "Showcase" },
                { href: "/styles", label: "All Styles" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/40 cc-underline pb-1 hover:text-[#00d4ff] transition-colors duration-200 font-bold"
                >
                  {label} &rarr;
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-12 pt-6 border-t border-[#c9a227]/10">
            <div className="flex items-center gap-3">
              <SealStamp char="印" className="text-[#d4553a]/30" size={18} />
              <p className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/20 font-bold">
                StyleKit &middot; Cyber Chinese
              </p>
            </div>
            <p className="text-xs tracking-[0.15em] uppercase text-[#e5e5e5]/15 font-bold">
              {"// 传统与未来 / Tradition & Future"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
