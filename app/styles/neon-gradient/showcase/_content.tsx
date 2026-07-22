"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hook — ZERO @/components/showcase imports                   */
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
/*  Inline SVG icons — no lucide-react                                 */
/* ------------------------------------------------------------------ */

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function SparklesIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l1.5 9.5 9.5 1.5-9.5 1.5L12 24l-1.5-11.5L1 12l10.5-1.5L12 0z" />
    </svg>
  );
}

function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CpuIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M20 15h2M2 9h2M20 9h2" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function TrendingUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function CodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Neon Purple", hex: "#a855f7", label: "Primary", glow: "rgba(168,85,247,0.5)" },
  { name: "Deep Space", hex: "#0f0a1e", label: "Background", glow: "rgba(15,10,30,0.8)" },
  { name: "Electric Pink", hex: "#f472b6", label: "Accent 1", glow: "rgba(244,114,182,0.5)" },
  { name: "Cyan Arc", hex: "#22d3ee", label: "Accent 2", glow: "rgba(34,211,238,0.5)" },
  { name: "Volt Green", hex: "#a3e635", label: "Accent 3", glow: "rgba(163,230,53,0.5)" },
  { name: "Solar Yellow", hex: "#fbbf24", label: "Accent 4", glow: "rgba(251,191,36,0.5)" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1: Fluid Luminescence — gradient flow demo
  const [luminFlowing, setLuminFlowing] = useState(false);

  // aiRule 2: Chromatic Glow — dual-layer shadow selector
  const [glowColor, setGlowColor] = useState<"purple" | "cyan" | "pink" | "yellow">("purple");

  // aiRule 3: Electric Activation — button activation states
  const [electricActive, setElectricActive] = useState(false);
  const [electricCount, setElectricCount] = useState(0);

  // aiRule 4: Smooth High-Tech — duration comparison
  const [speedMode, setSpeedMode] = useState<"fast" | "smooth" | null>(null);
  const [hoverDuration, setHoverDuration] = useState<"300" | "500">("500");

  // card hover states
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const glowMap = {
    purple: { near: "#a855f7", far: "rgba(168,85,247,0.35)", border: "border-purple-500", label: "Purple" },
    cyan: { near: "#22d3ee", far: "rgba(34,211,238,0.35)", border: "border-cyan-400", label: "Cyan" },
    pink: { near: "#f472b6", far: "rgba(244,114,182,0.35)", border: "border-pink-400", label: "Pink" },
    yellow: { near: "#fbbf24", far: "rgba(251,191,36,0.35)", border: "border-yellow-400", label: "Yellow" },
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] font-sans text-white overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes neon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes neon-pulse-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes neon-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes neon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes neon-gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes electric-flash {
          0%, 100% { box-shadow: 0 0 20px #a855f7, 0 0 40px rgba(168,85,247,0.4); }
          50% { box-shadow: 0 0 40px #22d3ee, 0 0 80px rgba(34,211,238,0.5), inset 0 0 30px rgba(255,255,255,0.2); }
        }
        .neon-float-anim { animation: neon-float 4s ease-in-out infinite; }
        .neon-pulse-anim { animation: neon-pulse-glow 2.5s ease-in-out infinite; }
        .neon-spin-anim { animation: neon-spin-slow 8s linear infinite; }
        .neon-bounce-anim { animation: neon-bounce 3s ease-in-out infinite; }
        .neon-gradient-flow-anim {
          background-size: 200% 200%;
          animation: neon-gradient-flow 3s ease infinite;
        }
        .electric-active-anim { animation: electric-flash 0.4s ease-in-out; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0a1e]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              <SparklesIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Neon<span className="text-purple-400">Gradient</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Interactions", "App Demo", "Rules"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back to StyleKit */}
          <Link
            href="/"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-32 md:pt-40 pb-28 px-5 md:px-10 overflow-hidden">
        {/* Radial glow backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-64 h-64 bg-pink-900/15 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-cyan-900/15 rounded-full blur-2xl" />
        </div>

        {/* Floating decoration icons */}
        <div className="absolute top-28 left-12 text-yellow-400 pointer-events-none hidden md:block neon-pulse-anim">
          <StarIcon className="w-6 h-6" />
        </div>
        <div className="absolute top-48 right-16 text-pink-400 pointer-events-none hidden md:block neon-float-anim">
          <RocketIcon className="w-8 h-8" />
        </div>
        <div className="absolute bottom-36 left-1/4 text-cyan-400 pointer-events-none hidden md:block neon-bounce-anim">
          <SparklesIcon className="w-5 h-5" />
        </div>
        <div className="absolute top-36 right-1/3 text-purple-400 pointer-events-none hidden md:block neon-spin-anim">
          <StarIcon className="w-4 h-4" />
        </div>
        <div className="absolute bottom-48 right-12 text-yellow-300 pointer-events-none hidden md:block neon-pulse-anim">
          <ZapIcon className="w-5 h-5" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              {/* Badge */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
                }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-yellow-400 text-yellow-400 text-sm font-medium mb-7">
                  <StarIcon className="w-4 h-4" />
                  霓虹渐变 — Neon Gradient
                  <StarIcon className="w-4 h-4" />
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                <span className="text-purple-400">Bold.</span>{" "}
                <span className="text-cyan-400">Bright.</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #22d3ee 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Electric.
                </span>
              </h1>

              {/* Sub */}
              <p
                className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg mb-10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                深色背景上的鲜艳渐变卡片，配合粗彩色边框和霓虹发光效果。适合科技产品、SaaS 着陆页、年轻化品牌。
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-[length:200%_auto] bg-left text-white font-bold rounded-xl border-4 border-white/20 shadow-[0_0_18px_rgba(236,72,153,0.45)] hover:bg-right hover:shadow-[0_0_24px_#ec4899,0_0_42px_rgba(34,211,238,0.45)] hover:-translate-y-1 active:scale-[0.98] active:shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out">
                  <SparklesIcon className="w-4 h-4" />
                  开始免费试用
                </button>
                <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-white font-bold rounded-xl border-4 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_36px_rgba(168,85,247,0.35)] transition-all duration-500 ease-out">
                  <ArrowRightIcon className="w-4 h-4" />
                  观看演示
                </button>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 mt-10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
                }}
              >
                {[
                  { value: "50k+", label: "用户", color: "#a855f7" },
                  { value: "99.9%", label: "稳定性", color: "#22d3ee" },
                  { value: "4.9", label: "评分", color: "#f472b6" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating gradient cards */}
            <div
              className="relative h-80 hidden lg:block"
              style={{
                opacity: heroVisible ? 1 : 0,
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              {/* Purple-pink card */}
              <div className="absolute top-0 left-0 w-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl border-4 border-yellow-400 p-5 shadow-[0_0_30px_rgba(168,85,247,0.5)] transform rotate-[-8deg] z-10 neon-float-anim">
                <ZapIcon className="w-10 h-10 text-white mb-3" />
                <p className="text-white font-bold text-lg">极速响应</p>
                <p className="text-white/70 text-xs mt-1">50ms 延迟</p>
              </div>

              {/* Cyan-green card */}
              <div className="absolute top-20 right-0 w-48 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl border-4 border-pink-400 p-5 shadow-[0_0_30px_rgba(34,211,238,0.5)] transform rotate-[5deg] z-20" style={{ animation: "neon-float 5s ease-in-out infinite 1s" }}>
                <ShieldIcon className="w-10 h-10 text-white mb-3" />
                <p className="text-white font-bold text-lg">安全加密</p>
                <p className="text-white/70 text-xs mt-1">AES-256</p>
              </div>

              {/* Pink-rose card */}
              <div className="absolute bottom-0 left-1/4 w-52 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl border-4 border-cyan-400 p-5 shadow-[0_0_30px_rgba(236,72,153,0.5)] transform rotate-[3deg] z-30" style={{ animation: "neon-float 6s ease-in-out infinite 0.5s" }}>
                <UsersIcon className="w-10 h-10 text-white mb-3" />
                <p className="text-white font-bold text-lg">团队协作</p>
                <p className="text-white/70 text-xs mt-1">无限成员</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 block mb-3">
              Palette
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Neon <span className="text-cyan-400">color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              深紫主色配合五彩霓虹强调色——每个颜色都在深色画布上以最大饱和度发光，不用于浅色背景。
            </p>
          </RevealBlock>

          {/* Swatches — Chromatic Glow on hover */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-16">
              {palette.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i ? "translateY(-8px) scale(1.1)" : "translateY(0) scale(1)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.hex === "#0f0a1e" ? "3px solid #a855f7" : "none",
                        boxShadow: hoveredSwatch === i
                          ? `0 0 24px ${swatch.glow}, 0 0 48px ${swatch.glow}`
                          : `0 0 12px ${swatch.glow}`,
                        transition: "box-shadow 0.35s ease",
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white">{swatch.name}</div>
                    <div className="text-xs text-white/40 font-mono mt-0.5">{swatch.hex}</div>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/60 bg-white/5 border border-white/10">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient combinations */}
          <RevealBlock delay={0.2}>
            <div className="bg-white/5 rounded-3xl p-8 border border-purple-500/20">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-6">
                渐变组合 — Gradient combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#a855f7", via: "#ec4899", to: "#f43f5e", label: "紫粉红", border: "border-yellow-400" },
                  { from: "#22d3ee", via: "#14b8a6", to: "#4ade80", label: "青绿", border: "border-pink-400" },
                  { from: "#22d3ee", to: "#a855f7", label: "青紫", border: "border-yellow-400" },
                  { from: "#fbbf24", via: "#4ade80", to: "#22d3ee", label: "黄绿青", border: "border-pink-400" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-14 rounded-xl mb-2 border-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      style={{
                        background: g.via
                          ? `linear-gradient(135deg, ${g.from}, ${g.via}, ${g.to})`
                          : `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        borderColor: "transparent",
                      }}
                    />
                    <div className="text-xs text-white/40 text-center">{g.label}</div>
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
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-400 block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Neon <span className="text-purple-400">building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              渐变填充、粗彩色边框、发光阴影——每个组件都充满霓虹能量。
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-300 hover:-translate-y-0.5 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-purple-500/20">

              {/* --- BUTTONS TAB --- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      Primary — 流体霓虹 Fluid Luminescence
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-[length:200%_auto] bg-left text-white font-bold rounded-xl border-4 border-white/20 shadow-[0_0_18px_rgba(236,72,153,0.45)] hover:bg-right hover:shadow-[0_0_24px_#ec4899,0_0_42px_rgba(34,211,238,0.45)] hover:-translate-y-1 active:shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out">
                        <SparklesIcon className="w-4 h-4" />
                        开始试用
                      </button>
                      <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-[length:200%_auto] bg-left text-white font-bold rounded-xl border-4 border-yellow-400 shadow-[0_0_18px_rgba(168,85,247,0.45)] hover:bg-right hover:shadow-[0_0_24px_#a855f7,0_0_48px_rgba(244,114,182,0.4)] hover:-translate-y-1 transition-all duration-500 ease-out">
                        <ZapIcon className="w-4 h-4" />
                        立即购买
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      Outline — 电流描边 Electric Border
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-7 py-3.5 bg-transparent text-white font-bold rounded-xl border-4 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_36px_rgba(168,85,247,0.35)] transition-all duration-500 ease-out">
                        电流青色
                      </button>
                      <button className="px-7 py-3.5 bg-transparent text-white font-bold rounded-xl border-4 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.5),0_0_36px_rgba(244,114,182,0.35)] transition-all duration-500 ease-out">
                        电流紫色
                      </button>
                      <button className="px-7 py-3.5 bg-transparent text-white font-bold rounded-xl border-4 border-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.25)] hover:bg-pink-400/10 hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] transition-all duration-500 ease-out">
                        电流粉色
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      Sizes
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "SM", px: "px-4 py-2 text-xs rounded-lg border-2" },
                        { size: "MD", px: "px-6 py-3 text-sm rounded-xl border-4" },
                        { size: "LG", px: "px-9 py-4 text-base rounded-xl border-4" },
                      ].map(({ size, px }) => (
                        <button
                          key={size}
                          className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold border-yellow-400 shadow-[0_0_16px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 transition-all duration-300 ${px}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- CARDS TAB --- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      title: "极速响应",
                      desc: "全球 CDN 加速，50ms 极速响应，让用户体验飞速提升。",
                      grad: "from-purple-500 via-pink-500 to-rose-500",
                      border: "border-yellow-400",
                      glow: "rgba(168,85,247,0.4)",
                      icon: <ZapIcon className="w-6 h-6 text-white" />,
                    },
                    {
                      title: "安全加密",
                      desc: "AES-256 端到端加密，企业级安全保障，守护每一比特数据。",
                      grad: "from-green-400 via-cyan-400 to-teal-500",
                      border: "border-pink-400",
                      glow: "rgba(34,211,238,0.4)",
                      icon: <ShieldIcon className="w-6 h-6 text-white" />,
                    },
                    {
                      title: "团队协作",
                      desc: "实时多人协作，角色权限管理，让团队效率翻倍。",
                      grad: "from-pink-500 to-rose-500",
                      border: "border-cyan-400",
                      glow: "rgba(244,114,182,0.4)",
                      icon: <UsersIcon className="w-6 h-6 text-white" />,
                    },
                    {
                      title: "智能分析",
                      desc: "AI 驱动的数据分析，实时洞察，让决策快人一步。",
                      grad: "from-yellow-400 via-green-400 to-cyan-400",
                      border: "border-purple-500",
                      glow: "rgba(251,191,36,0.4)",
                      icon: <TrendingUpIcon className="w-6 h-6 text-white" />,
                    },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className={`group relative overflow-hidden bg-gradient-to-br ${card.grad} bg-[length:200%_200%] bg-left rounded-2xl border-4 ${card.border} p-6 cursor-pointer transition-all duration-500 ease-out hover:bg-right hover:-translate-y-2`}
                      style={{
                        boxShadow: hoveredCard === i
                          ? `0 0 30px ${card.glow}, 0 0 60px ${card.glow}`
                          : `0 0 20px ${card.glow}`,
                      }}
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.25)] group-hover:scale-110 group-hover:animate-pulse transition-all duration-500">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-white/85 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* --- INPUTS TAB --- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">邮箱地址</label>
                      <input
                        type="email"
                        placeholder="输入你的邮箱..."
                        className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">密码</label>
                      <input
                        type="password"
                        placeholder="输入密码..."
                        className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(244,114,182,0.3)] transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">消息</label>
                      <textarea
                        rows={3}
                        placeholder="分享你的想法..."
                        className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    {/* Email subscribe with inline button */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">订阅霓虹通讯</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg text-white font-medium text-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
                          订阅
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">选择套餐</label>
                      <select className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all duration-300">
                        <option className="bg-[#0f0a1e]">免费版</option>
                        <option className="bg-[#0f0a1e]">专业版</option>
                        <option className="bg-[#0f0a1e]">企业版</option>
                      </select>
                    </div>
                    <button className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-yellow-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6),0_0_50px_rgba(244,114,182,0.3)] hover:-translate-y-0.5 transition-all duration-300">
                      提交注册
                    </button>
                  </div>
                </div>
              )}

              {/* --- BADGES TAB --- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      霓虹状态标签
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Neon", bg: "rgba(168,85,247,0.15)", border: "#a855f7", text: "#a855f7" },
                        { label: "Electric", bg: "rgba(34,211,238,0.15)", border: "#22d3ee", text: "#22d3ee" },
                        { label: "Voltage", bg: "rgba(244,114,182,0.15)", border: "#f472b6", text: "#f472b6" },
                        { label: "Plasma", bg: "rgba(163,230,53,0.15)", border: "#a3e635", text: "#a3e635" },
                        { label: "Solar", bg: "rgba(251,191,36,0.15)", border: "#fbbf24", text: "#fbbf24" },
                        { label: "Gamma", bg: "rgba(168,85,247,0.1)", border: "#f472b6", text: "#f472b6" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded-full text-sm font-medium border-2 hover:-translate-y-0.5 hover:shadow-[0_0_12px_currentColor] transition-all duration-300 cursor-default"
                          style={{ backgroundColor: b.bg, borderColor: b.border, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      状态指示器
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "系统在线", dot: "#a3e635", bg: "rgba(163,230,53,0.1)" },
                        { label: "处理中", dot: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
                        { label: "已部署", dot: "#22d3ee", bg: "rgba(34,211,238,0.1)" },
                        { label: "已暂停", dot: "#f472b6", bg: "rgba(244,114,182,0.1)" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white border border-white/10 cursor-default"
                          style={{ backgroundColor: b.bg }}
                        >
                          <span className="w-2 h-2 rounded-full neon-pulse-anim" style={{ backgroundColor: b.dot }} />
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      计数徽章
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "功能", count: 12, color: "#a855f7" },
                        { label: "集成", count: 48, color: "#22d3ee" },
                        { label: "模板", count: 85, color: "#f472b6" },
                        { label: "客户", count: "50k", color: "#fbbf24" },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm text-white/60 font-medium">{b.label}</span>
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white hover:scale-110 transition-transform duration-300 cursor-default"
                            style={{
                              backgroundColor: b.color,
                              boxShadow: `0 0 10px ${b.color}80`,
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
      <section id="interactions" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 block mb-3">
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Animation <span className="text-pink-400">rules demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              四条霓虹渐变核心交互规则——每个 Demo 都可以亲手交互感受。
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* ---- aiRule 1: Fluid Luminescence ---- */}
            <RevealBlock delay={0.08}>
              <div className="bg-white/5 rounded-3xl p-8 border border-purple-500/30 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold">
                    Rule 1
                  </span>
                  <span className="text-white font-bold">Fluid Luminescence</span>
                </div>
                <p className="text-xs text-white/40 mb-2 leading-relaxed">
                  渐变背景使用 bg-[length:200%_auto]，hover 切换 bg-position，制造灯管内色流滑动感。
                </p>
                <p className="text-xs text-white/30 font-mono mb-6">
                  bg-[length:200%_auto] bg-left hover:bg-right duration-500
                </p>

                {/* Interactive demo */}
                <div className="space-y-4">
                  <button
                    className="w-full py-4 font-bold text-white rounded-xl border-4 border-white/20 transition-all duration-500 ease-out"
                    style={{
                      background: "linear-gradient(to right, #22d3ee, #ec4899, #22d3ee)",
                      backgroundSize: "200% auto",
                      backgroundPosition: luminFlowing ? "right center" : "left center",
                      boxShadow: luminFlowing
                        ? "0 0 24px #ec4899, 0 0 42px rgba(34,211,238,0.45)"
                        : "0 0 12px rgba(34,211,238,0.3)",
                    }}
                    onMouseEnter={() => setLuminFlowing(true)}
                    onMouseLeave={() => setLuminFlowing(false)}
                  >
                    {luminFlowing ? "色流滑动中..." : "Hover 激活色流"}
                  </button>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <div
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{ backgroundColor: luminFlowing ? "#ec4899" : "#22d3ee", boxShadow: `0 0 8px ${luminFlowing ? "#ec4899" : "#22d3ee"}` }}
                    />
                    {luminFlowing ? "bg-position: right — 粉色端激活" : "bg-position: left — 青色端待机"}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 2: Chromatic Glow ---- */}
            <RevealBlock delay={0.12}>
              <div className="bg-white/5 rounded-3xl p-8 border border-cyan-500/30 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                    Rule 2
                  </span>
                  <span className="text-white font-bold">Chromatic Glow</span>
                </div>
                <p className="text-xs text-white/40 mb-2 leading-relaxed">
                  悬停光晕使用至少双层阴影（近层高饱和 + 远层扩散）模拟霓虹色散，非单色放大。
                </p>
                <p className="text-xs text-white/30 font-mono mb-6">
                  shadow: near-high-sat + far-diffuse
                </p>

                {/* Color selector */}
                <div className="flex gap-2 mb-4">
                  {(["purple", "cyan", "pink", "yellow"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setGlowColor(c)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium border-2 transition-all duration-300 ${glowColor === c ? "text-white" : "text-white/40 border-white/10"}`}
                      style={{
                        backgroundColor: glowColor === c ? glowMap[c].near + "30" : "transparent",
                        borderColor: glowColor === c ? glowMap[c].near : undefined,
                        boxShadow: glowColor === c ? `0 0 10px ${glowMap[c].near}60` : undefined,
                      }}
                    >
                      {glowMap[c].label}
                    </button>
                  ))}
                </div>

                {/* Demo card */}
                <div
                  className="p-5 rounded-xl border-4 text-center transition-all duration-500 cursor-pointer"
                  style={{
                    borderColor: glowMap[glowColor].near,
                    backgroundColor: glowMap[glowColor].near + "15",
                    boxShadow: `0 0 20px ${glowMap[glowColor].near}, 0 0 60px ${glowMap[glowColor].far}`,
                  }}
                >
                  <div className="text-sm text-white/70 mb-1">双层色散效果</div>
                  <div className="font-bold text-white">
                    近层: <span style={{ color: glowMap[glowColor].near }}>{glowMap[glowColor].near}</span>
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    远层: {glowMap[glowColor].far}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 3: Electric Activation ---- */}
            <RevealBlock delay={0.16}>
              <div className="bg-white/5 rounded-3xl p-8 border border-pink-500/30 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold">
                    Rule 3
                  </span>
                  <span className="text-white font-bold">Electric Activation</span>
                </div>
                <p className="text-xs text-white/40 mb-2 leading-relaxed">
                  :active 采用强内发光或瞬时高亮，不做明显压缩，呈现"通电"反馈。
                </p>
                <p className="text-xs text-white/30 font-mono mb-6">
                  active:shadow-[inset_0_0_20px_rgba(255,255,255,0.8)]
                </p>

                {/* Demo button */}
                <div className="text-center space-y-4">
                  <button
                    className="w-full py-5 font-black text-white text-lg rounded-xl border-4 transition-all duration-300 ease-out"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                      borderColor: "#fbbf24",
                      boxShadow: electricActive
                        ? "0 0 40px #22d3ee, 0 0 80px rgba(34,211,238,0.5), inset 0 0 30px rgba(255,255,255,0.2)"
                        : "0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(244,114,182,0.3)",
                    }}
                    onMouseDown={() => {
                      setElectricActive(true);
                      setElectricCount(prev => prev + 1);
                    }}
                    onMouseUp={() => setElectricActive(false)}
                    onMouseLeave={() => setElectricActive(false)}
                  >
                    {electricActive ? "CHARGING..." : "按住通电"}
                  </button>
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-xs text-white/40">
                      已触发 <span className="text-yellow-400 font-bold">{electricCount}</span> 次通电
                    </div>
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-100"
                      style={{
                        backgroundColor: electricActive ? "#22d3ee" : "#a855f7",
                        boxShadow: electricActive ? "0 0 8px #22d3ee" : "0 0 4px #a855f7",
                      }}
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 4: Smooth High-Tech ---- */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/5 rounded-3xl p-8 border border-yellow-500/30 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-semibold">
                    Rule 4
                  </span>
                  <span className="text-white font-bold">Smooth High-Tech</span>
                </div>
                <p className="text-xs text-white/40 mb-2 leading-relaxed">
                  动画以 duration-300 到 500 + ease-out 为主，保持丝滑科技感。过快显得廉价，过慢显得迟钝。
                </p>
                <p className="text-xs text-white/30 font-mono mb-6">
                  duration-300 ~ 500 + ease-out
                </p>

                {/* Duration selector */}
                <div className="flex gap-2 mb-6">
                  {(["300", "500"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setHoverDuration(d)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all duration-300 ${hoverDuration === d ? "text-white border-yellow-400 bg-yellow-400/20 shadow-[0_0_10px_rgba(251,191,36,0.3)]" : "text-white/40 border-white/10"}`}
                    >
                      {d}ms {d === "500" ? "(推荐)" : ""}
                    </button>
                  ))}
                </div>

                {/* Comparison cards */}
                <div className="space-y-3">
                  {[
                    { label: `当前选择: ${hoverDuration}ms ease-out`, dur: parseInt(hoverDuration), color: "#fbbf24" },
                    { label: "对比: 100ms linear (廉价感)", dur: 100, color: "#f43f5e" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-xs text-white/40 mb-1">{item.label}</div>
                      <button
                        className="w-full py-2.5 rounded-xl border-4 text-white text-sm font-bold hover:-translate-y-0.5"
                        style={{
                          background: "linear-gradient(135deg, #a855f7, #22d3ee)",
                          borderColor: item.color,
                          boxShadow: `0 0 12px ${item.color}40`,
                          transition: `all ${item.dur}ms ${item.dur > 200 ? "ease-out" : "linear"}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px ${item.color}, 0 0 60px ${item.color}50`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 12px ${item.color}40`;
                        }}
                      >
                        Hover 感受{" "}
                        <span style={{ color: item.color }}>{item.dur}ms</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. APP UI DEMO — SaaS Dashboard                                  */}
      {/* ================================================================ */}
      <section id="app-demo" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 block mb-3">
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Neon <span className="text-cyan-400">SaaS dashboard</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              真实的 SaaS 控制台——渐变卡片、发光数据、霓虹图表，展示风格在实际产品中的应用。
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat cards column */}
            <RevealBlock delay={0.1} className="space-y-5">
              {[
                {
                  label: "月活用户",
                  value: "128,400",
                  change: "+24%",
                  grad: "from-purple-500 to-pink-500",
                  border: "border-yellow-400",
                  glow: "rgba(168,85,247,0.4)",
                  icon: <UsersIcon className="w-6 h-6 text-white" />,
                },
                {
                  label: "API 调用",
                  value: "2.4M",
                  change: "+18%",
                  grad: "from-cyan-400 to-teal-500",
                  border: "border-pink-400",
                  glow: "rgba(34,211,238,0.4)",
                  icon: <GlobeIcon className="w-6 h-6 text-white" />,
                },
                {
                  label: "平均响应",
                  value: "42ms",
                  change: "-12%",
                  grad: "from-green-400 to-cyan-400",
                  border: "border-purple-500",
                  glow: "rgba(163,230,53,0.4)",
                  icon: <ZapIcon className="w-6 h-6 text-white" />,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`group relative overflow-hidden bg-gradient-to-br ${stat.grad} rounded-2xl border-4 ${stat.border} p-5 cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-right`}
                  style={{ boxShadow: `0 0 20px ${stat.glow}` }}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-sm text-white/80 mb-1">{stat.label}</div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="mt-2 text-xs font-semibold text-white/80">
                    <span className="bg-white/20 px-2 py-0.5 rounded-full">{stat.change} 本月</span>
                  </div>
                </div>
              ))}
            </RevealBlock>

            {/* Main chart + table */}
            <RevealBlock delay={0.18} className="md:col-span-2">
              <div className="bg-white/5 rounded-3xl border border-purple-500/20 overflow-hidden h-full">
                {/* Chart header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-bold">收入趋势</h3>
                    <p className="text-xs text-white/40 mt-0.5">最近 7 天</p>
                  </div>
                  <div className="flex gap-2">
                    {["7D", "30D", "90D"].map((p) => (
                      <button
                        key={p}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${p === "7D" ? "bg-purple-500/30 text-purple-300 border border-purple-500/40" : "text-white/40 hover:text-white hover:bg-white/5"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar chart */}
                <div className="px-6 py-6">
                  <div className="flex items-end gap-3 h-32 mb-3">
                    {[
                      { day: "Mon", val: 60, color: "#a855f7" },
                      { day: "Tue", val: 80, color: "#22d3ee" },
                      { day: "Wed", val: 55, color: "#f472b6" },
                      { day: "Thu", val: 95, color: "#a855f7" },
                      { day: "Fri", val: 70, color: "#22d3ee" },
                      { day: "Sat", val: 85, color: "#fbbf24" },
                      { day: "Sun", val: 100, color: "#a3e635" },
                    ].map((bar) => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                          className="w-full rounded-lg transition-all duration-300 group-hover:brightness-125 cursor-pointer"
                          style={{
                            height: `${bar.val}%`,
                            background: `linear-gradient(to top, ${bar.color}, ${bar.color}80)`,
                            boxShadow: `0 0 8px ${bar.color}60`,
                          }}
                        />
                        <span className="text-[10px] text-white/40">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="border-t border-white/10 px-6 py-4">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-3">
                    最新交易
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: "CloudSync Pro", amount: "+¥299", status: "成功", color: "#a3e635", icon: <LayersIcon className="w-4 h-4" /> },
                      { name: "API Unlimited", amount: "+¥899", status: "处理中", color: "#fbbf24", icon: <CodeIcon className="w-4 h-4" /> },
                      { name: "Team Enterprise", amount: "+¥2,499", status: "成功", color: "#a3e635", icon: <CpuIcon className="w-4 h-4" /> },
                    ].map((tx) => (
                      <div key={tx.name} className="flex items-center justify-between py-2 hover:bg-white/5 rounded-lg px-2 transition-colors duration-200 cursor-default group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                            {tx.icon}
                          </div>
                          <span className="text-sm text-white/80">{tx.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-0.5 rounded-full border" style={{ color: tx.color, borderColor: tx.color + "40", backgroundColor: tx.color + "15" }}>
                            {tx.status}
                          </span>
                          <span className="text-sm font-bold text-white">{tx.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DONT RULES                                               */}
      {/* ================================================================ */}
      <section id="rules" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-yellow-400 block mb-3">
              Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Design <span className="text-purple-400">philosophy</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              深色画布 + 鲜艳渐变 + 粗彩色边框 + 发光效果——这是霓虹渐变的四大支柱，缺一不可。
            </p>
          </RevealBlock>

          {/* 3 principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <CpuIcon className="w-8 h-8" />,
                title: "深色画布",
                tagline: "霓虹需要黑暗才能发光",
                desc: "bg-[#0f0a1e] 或 bg-slate-900 是唯一起点。在浅色背景上，霓虹色失去所有冲击力——就像白天看霓虹灯牌。",
                bullets: ["bg-[#0f0a1e] 深紫黑色", "bg-slate-900 深灰蓝", "添加径向渐变光晕点缀"],
                grad: "from-purple-500 to-pink-500",
                border: "border-yellow-400",
                glow: "rgba(168,85,247,0.3)",
              },
              {
                icon: <ZapIcon className="w-8 h-8" />,
                title: "渐变填充",
                tagline: "高饱和度，绝不妥协",
                desc: "卡片使用 bg-gradient-to-br 渐变填充，而非纯色。饱和度必须拉满——from-purple-500 不是 from-purple-200。",
                bullets: ["紫粉: from-purple-500 to-pink-500", "青绿: from-cyan-400 to-green-400", "pink-rose: from-pink-500 to-rose-500"],
                grad: "from-cyan-400 to-green-400",
                border: "border-pink-400",
                glow: "rgba(34,211,238,0.3)",
              },
              {
                icon: <SparklesIcon className="w-8 h-8" />,
                title: "粗彩色边框 + 发光",
                tagline: "border-4 是最低标准",
                desc: "边框必须是 border-4，颜色使用对比色（紫粉卡片配黄色边框），并搭配 shadow 模拟霓虹灯光晕。",
                bullets: ["border-4 border-yellow-400", "shadow-[0_0_30px_rgba(...)]", "双层阴影: near + far"],
                grad: "from-yellow-400 to-orange-500",
                border: "border-purple-500",
                glow: "rgba(251,191,36,0.3)",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className={`group relative overflow-hidden bg-gradient-to-br ${principle.grad} rounded-2xl border-4 ${principle.border} p-7 h-full cursor-default transition-all duration-500 ease-out hover:-translate-y-2`}
                  style={{ boxShadow: `0 0 20px ${principle.glow}` }}
                >
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5 text-white group-hover:scale-110 group-hover:animate-pulse transition-all duration-300">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{principle.title}</h3>
                  <p className="text-sm font-semibold text-white/70 mb-4">{principle.tagline}</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">{principle.desc}</p>
                  <ul className="space-y-2">
                    {principle.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-white/80 font-mono">
                        <span className="mt-1 w-2 h-2 rounded-full shrink-0 bg-white/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div className="bg-white/5 rounded-3xl p-8 border border-green-500/30 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-green-400">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "使用深色背景 bg-[#0f0a1e] 或 bg-slate-900",
                    "卡片使用渐变填充 bg-gradient-to-br from-purple-500",
                    "添加粗彩色边框 border-4 border-yellow-400",
                    "使用圆角 rounded-2xl 或 rounded-3xl",
                    "添加发光阴影 shadow-[0_0_30px_rgba(168,85,247,0.5)]",
                    "标题使用渐变文字或纯白色",
                    "按钮使用渐变背景 + 发光效果",
                    "动画 duration-300 到 500 + ease-out",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-green-400 shrink-0 shadow-[0_0_6px_#4ade80]" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div className="bg-white/5 rounded-3xl p-8 border border-red-500/30 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-red-400">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "禁止使用浅色背景",
                    "禁止使用低饱和度颜色（避免 purple-200）",
                    "禁止使用细边框 border 或 border-2",
                    "禁止使用灰色调卡片",
                    "禁止省略发光效果",
                    "禁止使用 emoji（用 SVG 图标替代）",
                    "禁止动画过短 duration-100 或 linear",
                    "禁止单层阴影（必须 near + far 双层）",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0 shadow-[0_0_6px_#f87171]" />
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
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="relative bg-[#0a0618] border-t border-purple-500/20 overflow-hidden">
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        {/* Floating decorations */}
        <div className="absolute top-12 left-12 text-purple-500/30 pointer-events-none neon-pulse-anim">
          <StarIcon className="w-5 h-5" />
        </div>
        <div className="absolute top-20 right-20 text-cyan-500/20 pointer-events-none neon-float-anim">
          <RocketIcon className="w-6 h-6" />
        </div>
        <div className="absolute bottom-16 left-1/4 text-pink-500/20 pointer-events-none neon-bounce-anim">
          <SparklesIcon className="w-4 h-4" />
        </div>
        <div className="absolute bottom-10 right-1/3 text-yellow-500/20 pointer-events-none neon-spin-anim">
          <StarIcon className="w-4 h-4" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Neon<span className="text-purple-400">Gradient</span>
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                深色背景上的鲜艳渐变卡片，配合粗彩色边框和霓虹发光效果。适合科技产品、SaaS 着陆页、年轻化品牌。
              </p>
              {/* Palette dots */}
              <div className="flex gap-2">
                {[
                  { color: "#a855f7", glow: "rgba(168,85,247,0.5)" },
                  { color: "#f472b6", glow: "rgba(244,114,182,0.5)" },
                  { color: "#22d3ee", glow: "rgba(34,211,238,0.5)" },
                  { color: "#a3e635", glow: "rgba(163,230,53,0.5)" },
                  { color: "#fbbf24", glow: "rgba(251,191,36,0.5)" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full hover:scale-125 transition-transform duration-300 cursor-default"
                    style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.glow}` }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Style</span>
                <Link href="/styles/neon-gradient" className="text-white/50 hover:text-purple-400 transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/neon-gradient/showcase" className="text-white/50 hover:text-purple-400 transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/neon-gradient/cover" className="text-white/50 hover:text-purple-400 transition-colors duration-200">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">StyleKit</span>
                <Link href="/" className="text-white/50 hover:text-cyan-400 transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-white/50 hover:text-cyan-400 transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Colors</span>
                {palette.slice(0, 4).map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-white/40 text-xs">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: s.hex, boxShadow: `0 0 4px ${s.glow}` }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Neon divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/30">
              <span>Built with</span>
              <ZapIcon className="w-4 h-4 text-yellow-400 neon-pulse-anim" />
              <span>for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.5),0_0_40px_rgba(244,114,182,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              Back to StyleKit
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
