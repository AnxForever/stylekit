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
/*  Pixel corner block decoration helper                               */
/* ------------------------------------------------------------------ */

function PixelCorners({ color = "#4a90d9" }: { color?: string }) {
  return (
    <>
      <div
        className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75"
        style={{ backgroundColor: color }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HP / MP / EXP status bar component                                 */
/* ------------------------------------------------------------------ */

function StatusBar({
  label,
  value,
  max,
  color,
  bgColor = "#1a1040",
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  bgColor?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs font-bold w-8 shrink-0" style={{ color }}>
        {label}
      </span>
      <div className="flex-1 h-[10px] border-2 border-[#4a90d9]" style={{ backgroundColor: bgColor }}>
        <div
          className="h-full transition-none"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-mono text-xs text-[#e0e0ff]/60 w-14 text-right shrink-0">
        {value}/{max}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blinking arrow cursor                                               */
/* ------------------------------------------------------------------ */

function BlinkArrow({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-mono text-[#ffd93d] inline-block ${className}`}
      style={{ animation: "pa-blink 1s step-end infinite" }}
    >
      &gt;
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COLORS = {
  blue: "#4a90d9",
  dark: "#2d1b69",
  deep: "#1a1040",
  red: "#ff6b6b",
  gold: "#ffd93d",
  green: "#50c878",
  text: "#e0e0ff",
};

const paletteSwatches = [
  { name: "PIXEL BLUE", hex: "#4a90d9", role: "Primary" },
  { name: "DARK PURPLE", hex: "#2d1b69", role: "Background" },
  { name: "DEEP DARK", hex: "#1a1040", role: "Surface" },
  { name: "PIXEL RED", hex: "#ff6b6b", role: "Accent 1" },
  { name: "PIXEL GOLD", hex: "#ffd93d", role: "Accent 2" },
  { name: "PIXEL GREEN", hex: "#50c878", role: "Accent 3" },
];

const rpgParty = [
  {
    name: "ARIA",
    class: "WARRIOR",
    hp: 320,
    maxHp: 400,
    mp: 80,
    maxMp: 120,
    exp: 7400,
    maxExp: 10000,
    level: 18,
  },
  {
    name: "ZEPHYR",
    class: "MAGE",
    hp: 180,
    maxHp: 240,
    mp: 210,
    maxMp: 300,
    exp: 5100,
    maxExp: 10000,
    level: 14,
  },
  {
    name: "KAEL",
    class: "ROGUE",
    hp: 260,
    maxHp: 280,
    mp: 40,
    maxMp: 80,
    exp: 9200,
    maxExp: 10000,
    level: 21,
  },
];

const questLog = [
  { id: 1, title: "RETRIEVE THE CRYSTAL ORB", status: "ACTIVE", reward: "2400 EXP" },
  { id: 2, title: "DEFEAT THE SHADOW DRAGON", status: "PENDING", reward: "8000 EXP" },
  { id: 3, title: "RESCUE THE VILLAGE ELDER", status: "COMPLETE", reward: "1200 EXP" },
  { id: 4, title: "FIND THE LOST TOME", status: "PENDING", reward: "3600 EXP" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [activePartyMember, setActivePartyMember] = useState(0);
  const [hpValue, setHpValue] = useState(280);
  const [mpValue, setMpValue] = useState(160);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [blockyAuraActive, setBlockyAuraActive] = useState(false);
  const [animeActionCount, setAnimeActionCount] = useState(0);
  const [cornerBlinkHovered, setCornerBlinkHovered] = useState<number | null>(null);
  const [framerateMode, setFramerateMode] = useState<"pixel" | "smooth">("pixel");
  const [framerateMoved, setFramerateMoved] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const menuItems = ["ATTACK", "MAGIC", "ITEMS", "DEFEND", "RUN"];

  function handleAction(action: string) {
    setSelectedAction(action);
    setTimeout(() => setSelectedAction(null), 1200);
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden font-mono"
      style={{ backgroundColor: COLORS.dark, color: COLORS.text }}
    >
      <style>{`
        @keyframes pa-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes pa-pixel-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .pa-pixel-in-anim { animation: pa-pixel-in 0.1s ease-linear forwards; }
      `}</style>

      {/* Pixel grid overlay on entire page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,16,64,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.18) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b-2"
        style={{
          backgroundColor: COLORS.deep,
          borderColor: COLORS.blue,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Logo */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 border-2"
            style={{ borderColor: COLORS.blue, backgroundColor: COLORS.dark }}
          >
            <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color: COLORS.gold }}>
              PixelAnime
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "AI Rules", "Do/Don't"].map((item) => (
              <span
                key={item}
                className="px-3 py-1 border-2 border-transparent text-xs font-mono uppercase tracking-widest cursor-pointer transition-all duration-75 ease-linear hover:border-[#4a90d9] hover:text-[#ffd93d] hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{ color: COLORS.text + "99" }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 border-2 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] active:scale-x-110 active:scale-y-90 active:shadow-none"
            style={{
              borderColor: COLORS.gold,
              color: COLORS.gold,
              backgroundColor: COLORS.deep,
              boxShadow: `3px 3px 0 ${COLORS.deep}`,
            }}
          >
            &lt; StyleKit
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — RPG Title Screen                                       */}
      {/* ================================================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14"
        style={{ backgroundColor: COLORS.dark }}
      >
        {/* Pixel grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,16,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.15) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        {/* Pixel corner decorations on hero */}
        <div className="absolute top-20 left-8 w-4 h-4" style={{ backgroundColor: COLORS.blue }} />
        <div className="absolute top-20 right-8 w-4 h-4" style={{ backgroundColor: COLORS.blue }} />
        <div className="absolute bottom-20 left-8 w-4 h-4" style={{ backgroundColor: COLORS.gold }} />
        <div className="absolute bottom-20 right-8 w-4 h-4" style={{ backgroundColor: COLORS.gold }} />

        {/* Decorative pixel lines */}
        <div
          className="absolute top-[72px] left-12 right-12 h-[2px] hidden md:block"
          style={{ backgroundColor: COLORS.blue + "44" }}
        />
        <div
          className="absolute bottom-[72px] left-12 right-12 h-[2px] hidden md:block"
          style={{ backgroundColor: COLORS.gold + "44" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.1s ease-linear 0s, transform 0.1s ease-linear 0s",
            }}
          >
            <div
              className="inline-flex items-center gap-3 px-4 py-2 border-2 mb-8"
              style={{ borderColor: COLORS.blue, backgroundColor: COLORS.deep }}
            >
              <BlinkArrow />
              <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: COLORS.blue }}>
                JRPG // 8-BIT // NES PALETTE
              </span>
              <BlinkArrow />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold uppercase tracking-wider mb-2 leading-none"
            style={{
              color: COLORS.blue,
              textShadow: `4px 4px 0 ${COLORS.deep}`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.1s ease-linear 0.1s, transform 0.1s ease-linear 0.1s",
            }}
          >
            PIXEL
          </h1>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold uppercase tracking-wider mb-8 leading-none"
            style={{
              color: COLORS.gold,
              textShadow: `4px 4px 0 ${COLORS.deep}`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.1s ease-linear 0.15s, transform 0.1s ease-linear 0.15s",
            }}
          >
            ANIME
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm md:text-base font-mono mb-10 tracking-widest"
            style={{
              color: COLORS.text + "80",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.1s ease-linear 0.2s",
            }}
          >
            CLASSIC JRPG MEETS 8-BIT ANIME AESTHETICS
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.1s ease-linear 0.25s",
            }}
          >
            <button
              className="px-10 py-4 border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none"
              style={{
                backgroundColor: COLORS.red,
                borderColor: COLORS.deep,
                boxShadow: `4px 4px 0 ${COLORS.deep}`,
              }}
            >
              PRESS START
            </button>
            <button
              className="px-10 py-4 border-2 font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none"
              style={{
                backgroundColor: COLORS.deep,
                borderColor: COLORS.blue,
                color: COLORS.blue,
                boxShadow: `4px 4px 0 ${COLORS.deep}`,
              }}
            >
              VIEW GALLERY
            </button>
          </div>

          {/* Party stats strip */}
          <div
            className="max-w-2xl mx-auto border-2 p-4"
            style={{
              borderColor: COLORS.blue,
              backgroundColor: COLORS.deep,
              boxShadow: `6px 6px 0 ${COLORS.deep}`,
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.1s ease-linear 0.35s",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "STYLES", value: "40+", color: COLORS.blue },
                { label: "COMPONENTS", value: "120+", color: COLORS.gold },
                { label: "AI RULES", value: "4", color: COLORS.green },
                { label: "LEVEL", value: "MAX", color: COLORS.red },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-mono font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: COLORS.text + "60" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: COLORS.deep }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] block mb-3" style={{ color: COLORS.blue }}>
              &gt; NES COLOR PALETTE
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase" style={{ color: COLORS.text }}>
              COLOR <span style={{ color: COLORS.gold }}>SYSTEM</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-sm font-mono max-w-lg leading-relaxed" style={{ color: COLORS.text + "80" }}>
              Limited NES-inspired palette with bold primaries on deep purple backgrounds.
              Every color has a pixel-authentic purpose.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {paletteSwatches.map((swatch) => (
                <div key={swatch.name} className="group relative cursor-default">
                  <div
                    className="h-24 border-2 transition-all duration-75 ease-linear group-hover:-translate-y-[2px] group-hover:-translate-x-[2px]"
                    style={{
                      backgroundColor: swatch.hex,
                      borderColor: COLORS.deep,
                      boxShadow: `4px 4px 0 ${COLORS.deep}`,
                    }}
                  />
                  <div className="mt-3 space-y-1">
                    <div
                      className="text-[10px] font-mono font-bold uppercase tracking-wide"
                      style={{ color: COLORS.text }}
                    >
                      {swatch.name}
                    </div>
                    <div className="text-[10px] font-mono" style={{ color: COLORS.text + "60" }}>
                      {swatch.hex}
                    </div>
                    <div
                      className="text-[9px] font-mono uppercase tracking-widest border px-1.5 py-0.5 inline-block"
                      style={{ borderColor: swatch.hex, color: swatch.hex }}
                    >
                      {swatch.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* NES Palette rules */}
          <RevealBlock delay={0.2}>
            <div
              className="relative border-2 p-6"
              style={{ borderColor: COLORS.blue, backgroundColor: COLORS.dark }}
            >
              <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: COLORS.blue }}>
                &gt; PALETTE RULES
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { rule: "bg-[#2d1b69] as primary background", color: COLORS.blue },
                  { rule: "bg-[#1a1040] for surface / dialogue boxes", color: COLORS.gold },
                  { rule: "border-[#4a90d9] 2px solid — all containers", color: COLORS.green },
                  { rule: "shadow-[4px_4px_0px_#1a1040] hard pixel depth", color: COLORS.red },
                ].map(({ rule, color }) => (
                  <div key={rule} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1 shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-xs font-mono" style={{ color: COLORS.text + "90" }}>
                      {rule}
                    </span>
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
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: COLORS.dark }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] block mb-3" style={{ color: COLORS.gold }}>
              &gt; ITEM SELECT
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase" style={{ color: COLORS.text }}>
              COMPONENT <span style={{ color: COLORS.blue }}>GALLERY</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-sm font-mono max-w-lg leading-relaxed" style={{ color: COLORS.text + "80" }}>
              All components use monospace fonts, hard pixel shadows, step-based hover interactions,
              and NES-palette colors. No rounded corners. No blur. No gradients.
            </p>
          </RevealBlock>

          {/* RPG-style tab menu */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 border-2 font-mono text-xs uppercase tracking-widest transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] active:scale-x-110 active:scale-y-90"
                  style={
                    activeTab === tab
                      ? {
                          backgroundColor: COLORS.blue,
                          borderColor: COLORS.deep,
                          color: "#fff",
                          boxShadow: "none",
                        }
                      : {
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.blue,
                          color: COLORS.blue,
                          boxShadow: `3px 3px 0 ${COLORS.deep}`,
                        }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="relative border-2 p-8 md:p-12"
              style={{
                borderColor: COLORS.blue,
                backgroundColor: COLORS.deep,
                boxShadow: `6px 6px 0 ${COLORS.deep}`,
              }}
            >
              <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
              <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5"
                      style={{ color: COLORS.blue }}
                    >
                      RPG ACTION BUTTONS — BLOCKY AURA + ANIME ACTION
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-6 py-3 border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none active:translate-y-[4px]"
                        style={{
                          backgroundColor: COLORS.blue,
                          borderColor: COLORS.deep,
                          boxShadow: `4px 4px 0 ${COLORS.deep}`,
                        }}
                      >
                        ATTACK
                      </button>
                      <button
                        className="px-6 py-3 border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none active:translate-y-[4px]"
                        style={{
                          backgroundColor: COLORS.red,
                          borderColor: COLORS.deep,
                          boxShadow: `4px 4px 0 ${COLORS.deep}`,
                        }}
                      >
                        MAGIC
                      </button>
                      <button
                        className="px-6 py-3 border-2 font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none active:translate-y-[4px]"
                        style={{
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.gold,
                          color: COLORS.gold,
                          boxShadow: `4px 4px 0 ${COLORS.deep}`,
                        }}
                      >
                        ITEMS
                      </button>
                      <button
                        className="px-6 py-3 border-2 font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#50c878,-2px_-2px_0_#50c878] active:scale-x-110 active:scale-y-90 active:shadow-none active:translate-y-[4px]"
                        style={{
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.green,
                          color: COLORS.green,
                          boxShadow: `4px 4px 0 ${COLORS.deep}`,
                        }}
                      >
                        DEFEND
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5" style={{ color: COLORS.blue }}>
                      SIZE VARIANTS — MONOSPACE ONLY
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "SM", px: "px-4 py-2 text-[10px]" },
                        { label: "MD", px: "px-6 py-3 text-xs" },
                        { label: "LG", px: "px-8 py-4 text-sm" },
                      ].map(({ label, px }) => (
                        <button
                          key={label}
                          className={`border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none ${px}`}
                          style={{
                            backgroundColor: COLORS.blue,
                            borderColor: COLORS.deep,
                            boxShadow: `4px 4px 0 ${COLORS.deep}`,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5" style={{ color: COLORS.blue }}>
                      STATE VARIANTS
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-6 py-3 border-2 font-mono font-bold uppercase tracking-widest text-white opacity-40 cursor-not-allowed"
                        style={{
                          backgroundColor: COLORS.blue,
                          borderColor: COLORS.deep,
                        }}
                        disabled
                      >
                        DISABLED
                      </button>
                      <button
                        className="px-6 py-3 border-2 font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ff6b6b,-2px_-2px_0_#ff6b6b] active:scale-x-110 active:scale-y-90 active:shadow-none"
                        style={{
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.red,
                          color: COLORS.red,
                          boxShadow: `4px 4px 0 ${COLORS.deep}`,
                        }}
                      >
                        OUTLINE
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "QUEST LOG",
                      desc: "> A new adventure awaits! Press A to continue exploring the dark dungeon.",
                      color: COLORS.blue,
                    },
                    {
                      title: "ITEM CHEST",
                      desc: "> You found a rare PIXEL SWORD! Attack power increased by 40 points.",
                      color: COLORS.gold,
                    },
                    {
                      title: "SAVE POINT",
                      desc: "> Your progress has been saved. The spirit of the ancients watches over you.",
                      color: COLORS.green,
                    },
                    {
                      title: "BOSS ALERT",
                      desc: "> A powerful enemy approaches! Prepare your party and choose actions wisely.",
                      color: COLORS.red,
                    },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className="group relative border-2 p-6 cursor-pointer transition-all duration-75 ease-linear hover:-translate-y-[2px] hover:-translate-x-[2px]"
                      style={{
                        borderColor: card.color,
                        backgroundColor: COLORS.dark,
                        boxShadow: `6px 6px 0 ${COLORS.deep}`,
                      }}
                      onMouseEnter={() => setCornerBlinkHovered(i)}
                      onMouseLeave={() => setCornerBlinkHovered(null)}
                    >
                      {/* Corner blink squares */}
                      <div
                        className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] transition-colors duration-75"
                        style={{
                          backgroundColor: cornerBlinkHovered === i ? COLORS.gold : card.color,
                          animation: cornerBlinkHovered === i ? "pa-blink 0.5s step-end infinite" : "none",
                        }}
                      />
                      <div
                        className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] transition-colors duration-75"
                        style={{
                          backgroundColor: cornerBlinkHovered === i ? COLORS.gold : card.color,
                          animation: cornerBlinkHovered === i ? "pa-blink 0.5s step-end infinite 0.1s" : "none",
                        }}
                      />
                      <div
                        className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] transition-colors duration-75"
                        style={{
                          backgroundColor: cornerBlinkHovered === i ? COLORS.gold : card.color,
                          animation: cornerBlinkHovered === i ? "pa-blink 0.5s step-end infinite 0.2s" : "none",
                        }}
                      />
                      <div
                        className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] transition-colors duration-75"
                        style={{
                          backgroundColor: cornerBlinkHovered === i ? COLORS.gold : card.color,
                          animation: cornerBlinkHovered === i ? "pa-blink 0.5s step-end infinite 0.3s" : "none",
                        }}
                      />

                      <h3
                        className="text-base font-mono font-bold uppercase mb-3 tracking-wider"
                        style={{ color: card.color }}
                      >
                        {cornerBlinkHovered === i && <BlinkArrow className="mr-2" />}
                        {card.title}
                      </h3>
                      <p className="text-xs font-mono leading-relaxed" style={{ color: COLORS.text + "80" }}>
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2"
                        style={{ color: COLORS.blue }}
                      >
                        CHARACTER NAME
                      </label>
                      <input
                        type="text"
                        placeholder="ENTER NAME..."
                        className="w-full px-4 py-3 font-mono text-sm border-2 focus:outline-none transition-all duration-75 ease-linear caret-[#ffd93d]"
                        style={{
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.blue,
                          color: COLORS.text,
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = COLORS.gold;
                          e.currentTarget.style.boxShadow = `2px 2px 0 ${COLORS.blue}`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = COLORS.blue;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2"
                        style={{ color: COLORS.blue }}
                      >
                        CLASS SELECTION
                      </label>
                      <select
                        className="w-full px-4 py-3 font-mono text-sm border-2 focus:outline-none transition-all duration-75 ease-linear"
                        style={{
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.blue,
                          color: COLORS.text,
                        }}
                      >
                        <option>WARRIOR</option>
                        <option>MAGE</option>
                        <option>ROGUE</option>
                        <option>PALADIN</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2"
                        style={{ color: COLORS.blue }}
                      >
                        BATTLE CRY
                      </label>
                      <textarea
                        rows={3}
                        placeholder="ENTER YOUR BATTLE CRY..."
                        className="w-full px-4 py-3 font-mono text-sm border-2 focus:outline-none transition-all duration-75 ease-linear resize-none caret-[#ffd93d]"
                        style={{
                          backgroundColor: COLORS.deep,
                          borderColor: COLORS.blue,
                          color: COLORS.text,
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-[0.2em] mb-3 block" style={{ color: COLORS.blue }}>
                        DIFFICULTY
                      </label>
                      {["EASY", "NORMAL", "HARD", "NIGHTMARE"].map((diff, i) => (
                        <div key={diff} className="flex items-center gap-3 mb-3">
                          <div
                            className="w-4 h-4 border-2 shrink-0 cursor-pointer transition-all duration-75 ease-linear"
                            style={{
                              borderColor: COLORS.blue,
                              backgroundColor: i === 1 ? COLORS.blue : "transparent",
                            }}
                          >
                            {i === 1 && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-2 h-2" style={{ backgroundColor: COLORS.deep }} />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-mono" style={{ color: i === 1 ? COLORS.gold : COLORS.text + "80" }}>
                            {i === 1 && <BlinkArrow className="mr-1" />}
                            {diff}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      className="w-full py-3 border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none"
                      style={{
                        backgroundColor: COLORS.red,
                        borderColor: COLORS.deep,
                        boxShadow: `4px 4px 0 ${COLORS.deep}`,
                      }}
                    >
                      CREATE HERO
                    </button>
                  </div>
                </div>
              )}

              {/* BADGES TAB */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5" style={{ color: COLORS.blue }}>
                      STATUS BADGES
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "ACTIVE", color: COLORS.green },
                        { label: "POISONED", color: COLORS.red },
                        { label: "STUNNED", color: COLORS.gold },
                        { label: "BUFFED", color: COLORS.blue },
                        { label: "CURSED", color: "#9b59b6" },
                        { label: "BLESSED", color: COLORS.gold },
                        { label: "CRITICAL", color: COLORS.red },
                        { label: "SLEEPING", color: "#7f8c8d" },
                      ].map((badge) => (
                        <span
                          key={badge.label}
                          className="px-3 py-1 border-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] cursor-default"
                          style={{
                            borderColor: badge.color,
                            color: badge.color,
                            backgroundColor: COLORS.deep,
                            boxShadow: `2px 2px 0 ${COLORS.deep}`,
                          }}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5" style={{ color: COLORS.blue }}>
                      ITEM RARITY BADGES
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "COMMON", color: "#aaaaaa" },
                        { label: "UNCOMMON", color: COLORS.green },
                        { label: "RARE", color: COLORS.blue },
                        { label: "EPIC", color: "#a855f7" },
                        { label: "LEGENDARY", color: COLORS.gold },
                      ].map((badge) => (
                        <span
                          key={badge.label}
                          className="px-4 py-1.5 border-2 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] cursor-default"
                          style={{
                            borderColor: badge.color,
                            color: badge.color,
                            backgroundColor: COLORS.deep,
                            boxShadow: `3px 3px 0 ${COLORS.deep}`,
                          }}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5" style={{ color: COLORS.blue }}>
                      NOTIFICATION PILLS
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "HP LOW", count: "!", color: COLORS.red },
                        { label: "NEW QUEST", count: "3", color: COLORS.blue },
                        { label: "LEVEL UP", count: "+", color: COLORS.gold },
                        { label: "PARTY", count: "2", color: COLORS.green },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-xs font-mono" style={{ color: COLORS.text + "80" }}>
                            {b.label}
                          </span>
                          <span
                            className="w-6 h-6 border-2 flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] cursor-default"
                            style={{
                              borderColor: b.color,
                              color: b.color,
                              backgroundColor: COLORS.deep,
                              boxShadow: `2px 2px 0 ${COLORS.deep}`,
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
      {/* 5. AI RULES INTERACTIVE DEMOS                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: COLORS.deep }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] block mb-3" style={{ color: COLORS.red }}>
              &gt; AI DESIGN RULES
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase" style={{ color: COLORS.text }}>
              INTERACTION <span style={{ color: COLORS.gold }}>PHYSICS</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-sm font-mono max-w-lg leading-relaxed" style={{ color: COLORS.text + "80" }}>
              Four named interaction rules from the AI design spec. Each demo lets you
              feel the rule in action. Interact with every element.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---- RULE 1: FRAMERATE DROP ---- */}
            <RevealBlock delay={0.08}>
              <div
                className="relative border-2 p-8 h-full"
                style={{
                  borderColor: COLORS.blue,
                  backgroundColor: COLORS.dark,
                  boxShadow: `4px 4px 0 ${COLORS.deep}`,
                }}
              >
                <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                <div className="mb-6">
                  <div
                    className="inline-block px-3 py-1 border-2 mb-3 text-[10px] font-mono font-bold uppercase tracking-widest"
                    style={{ borderColor: COLORS.blue, color: COLORS.blue, backgroundColor: COLORS.deep }}
                  >
                    RULE 01
                  </div>
                  <h3 className="text-lg font-mono font-bold uppercase mb-1" style={{ color: COLORS.gold }}>
                    FRAMERATE DROP
                  </h3>
                  <p className="text-[10px] font-mono leading-relaxed" style={{ color: COLORS.text + "70" }}>
                    duration-75 ease-linear — simulates 15fps GBA/NDS animation cadence.
                    Abrupt state changes, not organic curves.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFramerateMode("pixel")}
                      className="flex-1 py-2 border-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] active:scale-x-110 active:scale-y-90"
                      style={{
                        backgroundColor: framerateMode === "pixel" ? COLORS.blue : COLORS.deep,
                        borderColor: COLORS.blue,
                        color: framerateMode === "pixel" ? "#fff" : COLORS.blue,
                        boxShadow: framerateMode === "pixel" ? "none" : `2px 2px 0 ${COLORS.deep}`,
                      }}
                    >
                      {framerateMode === "pixel" && <BlinkArrow className="mr-1" />}
                      15FPS PIXEL
                    </button>
                    <button
                      onClick={() => setFramerateMode("smooth")}
                      className="flex-1 py-2 border-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-75 ease-linear hover:translate-x-[2px] hover:translate-y-[2px] active:scale-x-110 active:scale-y-90"
                      style={{
                        backgroundColor: framerateMode === "smooth" ? COLORS.red : COLORS.deep,
                        borderColor: COLORS.red,
                        color: framerateMode === "smooth" ? "#fff" : COLORS.red,
                        boxShadow: framerateMode === "smooth" ? "none" : `2px 2px 0 ${COLORS.deep}`,
                      }}
                    >
                      SMOOTH (WRONG)
                    </button>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono mb-2" style={{ color: COLORS.text + "60" }}>
                      CLICK TO ANIMATE THE PIXEL SPRITE:
                    </p>
                    <div
                      className="relative h-12 border-2 overflow-hidden cursor-pointer"
                      style={{ borderColor: COLORS.blue, backgroundColor: COLORS.deep }}
                      onClick={() => setFramerateMoved((v) => !v)}
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: "linear-gradient(90deg, rgba(74,144,217,0.1) 1px, transparent 1px)",
                          backgroundSize: "16px 100%",
                        }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 border-2"
                        style={{
                          left: framerateMoved ? "calc(100% - 40px)" : "8px",
                          backgroundColor: COLORS.blue,
                          borderColor: COLORS.deep,
                          transition: framerateMoved
                            ? framerateMode === "pixel"
                              ? "left 0.075s ease-linear"
                              : "left 0.8s cubic-bezier(0.25,0.46,0.45,0.94)"
                            : framerateMode === "pixel"
                            ? "left 0.075s ease-linear"
                            : "left 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
                        }}
                      />
                    </div>
                    <p className="text-[10px] font-mono mt-2" style={{ color: COLORS.text + "50" }}>
                      {framerateMode === "pixel"
                        ? "PIXEL MODE: Abrupt snap — authentic 8-bit feel"
                        : "SMOOTH MODE: Organic ease — NOT pixel-anime style"}
                    </p>
                  </div>

                  <div
                    className="p-3 border font-mono text-[10px] leading-relaxed"
                    style={{ borderColor: COLORS.blue + "44", color: COLORS.text + "70" }}
                  >
                    <span style={{ color: COLORS.gold }}>CORRECT:</span> duration-75 ease-linear
                    <br />
                    <span style={{ color: COLORS.red }}>WRONG:</span> ease-in-out, cubic-bezier
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 2: BLOCKY AURA ---- */}
            <RevealBlock delay={0.12}>
              <div
                className="relative border-2 p-8 h-full"
                style={{
                  borderColor: COLORS.gold,
                  backgroundColor: COLORS.dark,
                  boxShadow: `4px 4px 0 ${COLORS.deep}`,
                }}
              >
                <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                <div className="mb-6">
                  <div
                    className="inline-block px-3 py-1 border-2 mb-3 text-[10px] font-mono font-bold uppercase tracking-widest"
                    style={{ borderColor: COLORS.gold, color: COLORS.gold, backgroundColor: COLORS.deep }}
                  >
                    RULE 02
                  </div>
                  <h3 className="text-lg font-mono font-bold uppercase mb-1" style={{ color: COLORS.gold }}>
                    BLOCKY AURA
                  </h3>
                  <p className="text-[10px] font-mono leading-relaxed" style={{ color: COLORS.text + "70" }}>
                    Hard-edge multi-directional colored shadows, zero blur.
                    hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d]
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <button
                      onMouseEnter={() => setBlockyAuraActive(true)}
                      onMouseLeave={() => setBlockyAuraActive(false)}
                      className="px-8 py-4 border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                      style={{
                        backgroundColor: COLORS.blue,
                        borderColor: COLORS.deep,
                        boxShadow: blockyAuraActive
                          ? `4px 4px 0 ${COLORS.gold}, -2px -2px 0 ${COLORS.gold}`
                          : `4px 4px 0 ${COLORS.deep}`,
                        transform: blockyAuraActive ? "translate(-2px, -2px)" : "none",
                      }}
                    >
                      {blockyAuraActive ? "AURA ACTIVE!" : "HOVER FOR AURA"}
                    </button>
                    <p className="text-[10px] font-mono text-center" style={{ color: COLORS.text + "60" }}>
                      {blockyAuraActive
                        ? "BLOCKY AURA: Multi-directional gold shadows — ZERO blur"
                        : "Hover the button to activate Blocky Aura"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-[10px] font-mono mb-3" style={{ color: COLORS.green }}>
                        CORRECT (HARD)
                      </p>
                      <div
                        className="h-12 border-2 mx-auto w-full"
                        style={{
                          backgroundColor: COLORS.blue,
                          borderColor: COLORS.deep,
                          boxShadow: `4px 4px 0 ${COLORS.gold}, -2px -2px 0 ${COLORS.gold}`,
                        }}
                      />
                      <p className="text-[9px] font-mono mt-2" style={{ color: COLORS.text + "50" }}>
                        shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d]
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-mono mb-3" style={{ color: COLORS.red }}>
                        WRONG (BLURRED)
                      </p>
                      <div
                        className="h-12 border-2 mx-auto w-full"
                        style={{
                          backgroundColor: COLORS.blue,
                          borderColor: COLORS.deep,
                          boxShadow: `0 0 20px 8px ${COLORS.gold}88`,
                        }}
                      />
                      <p className="text-[9px] font-mono mt-2" style={{ color: COLORS.text + "50" }}>
                        blur glow — breaks 8-bit authenticity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 3: ANIME ACTION ---- */}
            <RevealBlock delay={0.16}>
              <div
                className="relative border-2 p-8 h-full"
                style={{
                  borderColor: COLORS.red,
                  backgroundColor: COLORS.dark,
                  boxShadow: `4px 4px 0 ${COLORS.deep}`,
                }}
              >
                <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="mb-6">
                  <div
                    className="inline-block px-3 py-1 border-2 mb-3 text-[10px] font-mono font-bold uppercase tracking-widest"
                    style={{ borderColor: COLORS.red, color: COLORS.red, backgroundColor: COLORS.deep }}
                  >
                    RULE 03
                  </div>
                  <h3 className="text-lg font-mono font-bold uppercase mb-1" style={{ color: COLORS.gold }}>
                    ANIME ACTION
                  </h3>
                  <p className="text-[10px] font-mono leading-relaxed" style={{ color: COLORS.text + "70" }}>
                    active:scale-x-110 active:scale-y-90 — squash-and-stretch on press.
                    Classic Japanese animation physics, not a translate drop.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-[10px] font-mono" style={{ color: COLORS.text + "60" }}>
                      CLICK THE BUTTON — FEEL THE SQUASH:
                    </p>
                    <button
                      onMouseDown={() => setAnimeActionCount((c) => c + 1)}
                      className="px-10 py-5 border-2 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                      style={{
                        backgroundColor: COLORS.red,
                        borderColor: COLORS.deep,
                        boxShadow: `4px 4px 0 ${COLORS.deep}`,
                      }}
                    >
                      STRIKE!
                    </button>
                    {animeActionCount > 0 && (
                      <div
                        className="text-center pa-pixel-in-anim"
                        key={animeActionCount}
                      >
                        <span
                          className="text-lg font-mono font-bold"
                          style={{ color: COLORS.gold }}
                        >
                          {animeActionCount * 42} DMG!
                        </span>
                        <p className="text-[10px] font-mono mt-1" style={{ color: COLORS.text + "60" }}>
                          Squash: scale-x-110 scale-y-90 on active
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-[10px] font-mono mb-2" style={{ color: COLORS.green }}>
                        CORRECT
                      </p>
                      <div
                        className="p-2 border font-mono text-[9px]"
                        style={{ borderColor: COLORS.green + "44", color: COLORS.text + "70" }}
                      >
                        active:scale-x-110
                        <br />
                        active:scale-y-90
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-mono mb-2" style={{ color: COLORS.red }}>
                        WRONG
                      </p>
                      <div
                        className="p-2 border font-mono text-[9px]"
                        style={{ borderColor: COLORS.red + "44", color: COLORS.text + "70" }}
                      >
                        active:scale-95
                        <br />
                        (no squash-stretch)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 4: CORNER BLINK ---- */}
            <RevealBlock delay={0.2}>
              <div
                className="relative border-2 p-8 h-full"
                style={{
                  borderColor: COLORS.green,
                  backgroundColor: COLORS.dark,
                  boxShadow: `4px 4px 0 ${COLORS.deep}`,
                }}
              >
                <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="mb-6">
                  <div
                    className="inline-block px-3 py-1 border-2 mb-3 text-[10px] font-mono font-bold uppercase tracking-widest"
                    style={{ borderColor: COLORS.green, color: COLORS.green, backgroundColor: COLORS.deep }}
                  >
                    RULE 04
                  </div>
                  <h3 className="text-lg font-mono font-bold uppercase mb-1" style={{ color: COLORS.gold }}>
                    CORNER BLINK
                  </h3>
                  <p className="text-[10px] font-mono leading-relaxed" style={{ color: COLORS.text + "70" }}>
                    group-hover:animate-pulse on corner pixel squares — simulates idle game
                    UI standby animation. Never animate in non-hover state.
                  </p>
                </div>

                <div className="space-y-5">
                  <p className="text-[10px] font-mono" style={{ color: COLORS.text + "60" }}>
                    HOVER EACH CARD TO TRIGGER CORNER BLINK:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "CHEST A", color: COLORS.blue },
                      { title: "CHEST B", color: COLORS.gold },
                      { title: "CHEST C", color: COLORS.red },
                      { title: "CHEST D", color: COLORS.green },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="group relative border-2 p-4 cursor-pointer transition-all duration-75 ease-linear hover:-translate-y-[2px] hover:-translate-x-[2px]"
                        style={{
                          borderColor: item.color,
                          backgroundColor: COLORS.deep,
                          boxShadow: `4px 4px 0 ${COLORS.deep}`,
                        }}
                      >
                        {/* Corner pixels — only blink on group-hover */}
                        <div
                          className="absolute -top-[5px] -left-[5px] w-[10px] h-[10px] border-2 border-[#1a1040] group-hover:animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                        <div
                          className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px] border-2 border-[#1a1040] group-hover:animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                        <div
                          className="absolute -bottom-[5px] -left-[5px] w-[10px] h-[10px] border-2 border-[#1a1040] group-hover:animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                        <div
                          className="absolute -bottom-[5px] -right-[5px] w-[10px] h-[10px] border-2 border-[#1a1040] group-hover:animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                        <p
                          className="text-[10px] font-mono font-bold uppercase text-center group-hover:text-[#ffd93d] transition-colors duration-75"
                          style={{ color: item.color }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-[8px] font-mono text-center mt-1"
                          style={{ color: COLORS.text + "50" }}
                        >
                          HOVER ME
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="p-3 border font-mono text-[10px]"
                    style={{ borderColor: COLORS.green + "44", color: COLORS.text + "70" }}
                  >
                    <span style={{ color: COLORS.gold }}>CORRECT:</span> group-hover:animate-pulse
                    <br />
                    <span style={{ color: COLORS.red }}>WRONG:</span> animate-pulse without group-hover (visual noise)
                  </div>
                </div>
              </div>
            </RevealBlock>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. RPG BATTLE UI DEMO                                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: COLORS.dark }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] block mb-3" style={{ color: COLORS.blue }}>
              &gt; BATTLE SYSTEM
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase" style={{ color: COLORS.text }}>
              RPG <span style={{ color: COLORS.red }}>BATTLE UI</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-sm font-mono max-w-lg leading-relaxed" style={{ color: COLORS.text + "80" }}>
              A fully interactive JRPG battle scene showcasing HP/MP/EXP bars,
              dialogue boxes, action menus, and party management panels.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main battle area */}
            <RevealBlock delay={0.1} className="lg:col-span-2">
              <div className="space-y-4">
                {/* Battle scene window */}
                <div
                  className="relative border-2 p-6"
                  style={{
                    borderColor: COLORS.blue,
                    backgroundColor: COLORS.deep,
                    boxShadow: `6px 6px 0 ${COLORS.dark}`,
                  }}
                >
                  <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: COLORS.blue }}>
                      BATTLE SCENE
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: COLORS.text + "50" }}>
                      TURN 07
                    </span>
                  </div>

                  {/* Enemy */}
                  <div className="flex justify-end mb-6">
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-2">
                        <div className="absolute inset-0 border-2" style={{ backgroundColor: COLORS.red, borderColor: COLORS.deep }} />
                        <div className="absolute top-4 left-4 w-3 h-3" style={{ backgroundColor: COLORS.gold }} />
                        <div className="absolute top-4 right-4 w-3 h-3" style={{ backgroundColor: COLORS.gold }} />
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-2" style={{ backgroundColor: COLORS.deep }} />
                      </div>
                      <p className="text-xs font-mono font-bold uppercase" style={{ color: COLORS.red }}>
                        SHADOW DRAGON
                      </p>
                      <div className="mt-2 w-32">
                        <StatusBar label="HP" value={780} max={1200} color={COLORS.red} />
                      </div>
                    </div>
                  </div>

                  {/* Action result */}
                  {selectedAction && (
                    <div
                      className="mb-4 p-3 border-2 font-mono text-xs text-center pa-pixel-in-anim"
                      style={{
                        borderColor: COLORS.gold,
                        backgroundColor: COLORS.dark,
                        color: COLORS.gold,
                      }}
                    >
                      <BlinkArrow className="mr-2" />
                      {selectedAction === "ATTACK" && "ARIA used SLASH — 240 DMG to SHADOW DRAGON!"}
                      {selectedAction === "MAGIC" && "ZEPHYR cast THUNDER BOLT — 480 DMG! CRITICAL HIT!"}
                      {selectedAction === "ITEMS" && "KAEL used ELIXIR — HP restored to full!"}
                      {selectedAction === "DEFEND" && "Party entered DEFEND stance — DEF +50 this turn"}
                      {selectedAction === "RUN" && "Cannot escape from boss battle!"}
                      <BlinkArrow className="ml-2" />
                    </div>
                  )}
                </div>

                {/* Action menu */}
                <div
                  className="relative border-2 p-6"
                  style={{
                    borderColor: COLORS.blue,
                    backgroundColor: COLORS.deep,
                    boxShadow: `4px 4px 0 ${COLORS.dark}`,
                  }}
                >
                  <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: COLORS.blue }}>
                      ACTION MENU — SELECT COMMAND
                    </span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {menuItems.map((item, i) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedMenuItem(i);
                          handleAction(item);
                        }}
                        className="py-3 border-2 font-mono font-bold uppercase text-xs tracking-wider transition-all duration-75 ease-linear hover:-translate-y-[2px] hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none"
                        style={
                          selectedMenuItem === i
                            ? {
                                backgroundColor: COLORS.blue,
                                borderColor: COLORS.deep,
                                color: "#fff",
                                boxShadow: "none",
                              }
                            : {
                                backgroundColor: COLORS.dark,
                                borderColor: COLORS.blue,
                                color: COLORS.blue,
                                boxShadow: `3px 3px 0 ${COLORS.deep}`,
                              }
                        }
                      >
                        {selectedMenuItem === i && <BlinkArrow className="mr-1 text-[10px]" />}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quest log */}
                <RevealBlock delay={0.15}>
                  <div
                    className="relative border-2 p-6"
                    style={{
                      borderColor: COLORS.gold,
                      backgroundColor: COLORS.deep,
                      boxShadow: `4px 4px 0 ${COLORS.dark}`,
                    }}
                  >
                    <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                    <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                    <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                    <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.gold }} />
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: COLORS.gold }}>
                      QUEST LOG
                    </p>
                    <div className="space-y-2">
                      {questLog.map((quest) => (
                        <div
                          key={quest.id}
                          className="flex items-center justify-between p-3 border transition-all duration-75 ease-linear hover:translate-x-[2px] cursor-pointer"
                          style={{
                            borderColor: quest.status === "COMPLETE"
                              ? COLORS.green + "44"
                              : quest.status === "ACTIVE"
                              ? COLORS.blue + "44"
                              : COLORS.text + "20",
                            backgroundColor: COLORS.dark,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 shrink-0"
                              style={{
                                backgroundColor:
                                  quest.status === "COMPLETE"
                                    ? COLORS.green
                                    : quest.status === "ACTIVE"
                                    ? COLORS.blue
                                    : COLORS.text + "40",
                              }}
                            />
                            <span
                              className="text-[10px] font-mono uppercase"
                              style={{
                                color:
                                  quest.status === "COMPLETE"
                                    ? COLORS.text + "50"
                                    : quest.status === "ACTIVE"
                                    ? COLORS.text
                                    : COLORS.text + "70",
                                textDecoration: quest.status === "COMPLETE" ? "line-through" : "none",
                              }}
                            >
                              {quest.status === "ACTIVE" && <BlinkArrow className="mr-1" />}
                              {quest.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className="text-[9px] font-mono"
                              style={{
                                color:
                                  quest.status === "COMPLETE"
                                    ? COLORS.green
                                    : quest.status === "ACTIVE"
                                    ? COLORS.gold
                                    : COLORS.text + "50",
                              }}
                            >
                              {quest.reward}
                            </span>
                            <span
                              className="px-2 py-0.5 border text-[8px] font-mono uppercase"
                              style={{
                                borderColor:
                                  quest.status === "COMPLETE"
                                    ? COLORS.green
                                    : quest.status === "ACTIVE"
                                    ? COLORS.blue
                                    : COLORS.text + "40",
                                color:
                                  quest.status === "COMPLETE"
                                    ? COLORS.green
                                    : quest.status === "ACTIVE"
                                    ? COLORS.blue
                                    : COLORS.text + "40",
                              }}
                            >
                              {quest.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealBlock>
              </div>
            </RevealBlock>

            {/* Party panel sidebar */}
            <RevealBlock delay={0.2}>
              <div className="space-y-4">
                <div
                  className="relative border-2 p-4"
                  style={{
                    borderColor: COLORS.blue,
                    backgroundColor: COLORS.deep,
                    boxShadow: `4px 4px 0 ${COLORS.dark}`,
                  }}
                >
                  <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.blue }} />
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: COLORS.blue }}>
                    PARTY STATUS
                  </p>
                  <div className="space-y-1">
                    {rpgParty.map((member, i) => (
                      <button
                        key={member.name}
                        onClick={() => setActivePartyMember(i)}
                        className="w-full text-left p-3 border-2 transition-all duration-75 ease-linear hover:translate-x-[2px] hover:-translate-y-[1px]"
                        style={{
                          borderColor: activePartyMember === i ? COLORS.gold : COLORS.blue + "44",
                          backgroundColor: activePartyMember === i ? COLORS.dark : "transparent",
                          boxShadow: activePartyMember === i ? `2px 2px 0 ${COLORS.dark}` : "none",
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            {activePartyMember === i && <BlinkArrow className="mr-1 text-[10px]" />}
                            <span className="text-xs font-mono font-bold" style={{ color: activePartyMember === i ? COLORS.gold : COLORS.text }}>
                              {member.name}
                            </span>
                            <span className="text-[9px] font-mono ml-2" style={{ color: COLORS.text + "60" }}>
                              LV.{member.level}
                            </span>
                          </div>
                          <span
                            className="text-[8px] font-mono border px-1.5 py-0.5"
                            style={{ borderColor: COLORS.blue + "44", color: COLORS.text + "60" }}
                          >
                            {member.class}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <StatusBar label="HP" value={member.hp} max={member.maxHp} color={COLORS.green} />
                          <StatusBar label="MP" value={member.mp} max={member.maxMp} color={COLORS.blue} />
                          <StatusBar label="EX" value={member.exp} max={member.maxExp} color={COLORS.gold} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live HP/MP editor */}
                <div
                  className="relative border-2 p-4"
                  style={{
                    borderColor: COLORS.green,
                    backgroundColor: COLORS.deep,
                    boxShadow: `4px 4px 0 ${COLORS.dark}`,
                  }}
                >
                  <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                  <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                  <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                  <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-4" style={{ color: COLORS.green }}>
                    LIVE STATUS BARS
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase" style={{ color: COLORS.green }}>
                          HP SLIDER
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: COLORS.text + "60" }}>
                          {hpValue}/400
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={400}
                        value={hpValue}
                        onChange={(e) => setHpValue(Number(e.target.value))}
                        className="w-full cursor-pointer accent-[#50c878]"
                      />
                      <StatusBar label="HP" value={hpValue} max={400} color={COLORS.green} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase" style={{ color: COLORS.blue }}>
                          MP SLIDER
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: COLORS.text + "60" }}>
                          {mpValue}/300
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={300}
                        value={mpValue}
                        onChange={(e) => setMpValue(Number(e.target.value))}
                        className="w-full cursor-pointer accent-[#4a90d9]"
                      />
                      <StatusBar label="MP" value={mpValue} max={300} color={COLORS.blue} />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T PHILOSOPHY                                         */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: COLORS.deep }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] block mb-3" style={{ color: COLORS.gold }}>
              &gt; DESIGN CODEX
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold uppercase" style={{ color: COLORS.text }}>
              DO & <span style={{ color: COLORS.red }}>DON&apos;T</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-sm font-mono max-w-lg leading-relaxed" style={{ color: COLORS.text + "80" }}>
              Strict rules define the Pixel Anime aesthetic. Every element must conform
              to these constraints to maintain 8-bit authenticity.
            </p>
          </RevealBlock>

          {/* Philosophy cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "RPG DIALOGUE BOXES",
                icon: "[]",
                desc: "Window frames with chunky 2-4px borders and corner block decorations. References Final Fantasy and Dragon Quest menu systems.",
                items: ["border-2 border-[#4a90d9]", "Corner 12px block squares", "shadow-[4px_4px_0px_#1a1040]"],
                color: COLORS.blue,
              },
              {
                title: "HP/MP/EXP BARS",
                icon: "##",
                desc: "Status bars with pixel-precise flat color fills and bordered containers. No gradients. Solid NES-palette fills only.",
                items: ["Flat fill — no gradient", "border-2 bordered container", "h-[8-10px] precise height"],
                color: COLORS.green,
              },
              {
                title: "PIXEL DEPTH",
                icon: "//",
                desc: "All depth created through hard offset shadows at 4px x 4px. Zero blur radius. Step-based hover translations in 2px increments.",
                items: ["shadow-[4px_4px_0px_...]", "hover:translate-x-[2px]", "Zero blur at all times"],
                color: COLORS.gold,
              },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.08}>
                <div
                  className="group relative border-2 p-6 h-full cursor-default transition-all duration-75 ease-linear hover:-translate-y-[2px] hover:-translate-x-[2px]"
                  style={{
                    borderColor: card.color,
                    backgroundColor: COLORS.dark,
                    boxShadow: `6px 6px 0 ${COLORS.deep}`,
                  }}
                >
                  <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75" style={{ backgroundColor: card.color }} />
                  <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75" style={{ backgroundColor: card.color }} />
                  <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75" style={{ backgroundColor: card.color }} />
                  <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040] group-hover:animate-pulse transition-colors duration-75" style={{ backgroundColor: card.color }} />
                  <div
                    className="text-2xl font-mono font-bold mb-4"
                    style={{ color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider mb-3" style={{ color: COLORS.text }}>
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono leading-relaxed mb-4" style={{ color: COLORS.text + "70" }}>
                    {card.desc}
                  </p>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-2 h-2 mt-1 shrink-0" style={{ backgroundColor: card.color }} />
                        <span className="text-[10px] font-mono" style={{ color: COLORS.text + "80" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div
                className="relative border-2 p-8 h-full"
                style={{
                  borderColor: COLORS.green,
                  backgroundColor: COLORS.dark,
                  boxShadow: `4px 4px 0 ${COLORS.deep}`,
                }}
              >
                <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.green }} />
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 border-2 flex items-center justify-center"
                    style={{ borderColor: COLORS.green, backgroundColor: COLORS.deep }}
                  >
                    <span className="font-mono text-xs font-bold" style={{ color: COLORS.green }}>
                      OK
                    </span>
                  </div>
                  <h3 className="text-base font-mono font-bold uppercase" style={{ color: COLORS.green }}>
                    DO
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use RPG dialogue box frames with 4px borders and corner block decorations",
                    "Include HP/MP/EXP status bar UI elements with flat fills",
                    "Apply hard offset shadows (4px_4px_0px) for pixel depth",
                    "Use monospace font exclusively for all text",
                    "Keep interactions step-based (translate in 2px increments)",
                    "Use NES-palette: blue #4a90d9, red #ff6b6b, gold #ffd93d, green #50c878",
                    "Add pixel corner block decorations on major containers",
                    "Use duration-75 ease-linear for all transitions (15fps simulation)",
                    "Apply Blocky Aura: hard multi-directional shadow with zero blur",
                    "Add Anime Action: active:scale-x-110 active:scale-y-90",
                    "Trigger Corner Blink only inside group-hover state",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 shrink-0" style={{ backgroundColor: COLORS.green }} />
                      <span className="text-[11px] font-mono leading-relaxed" style={{ color: COLORS.text + "90" }}>
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="relative border-2 p-8 h-full"
                style={{
                  borderColor: COLORS.red,
                  backgroundColor: COLORS.dark,
                  boxShadow: `4px 4px 0 ${COLORS.deep}`,
                }}
              >
                <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] border-2 border-[#1a1040]" style={{ backgroundColor: COLORS.red }} />
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 border-2 flex items-center justify-center"
                    style={{ borderColor: COLORS.red, backgroundColor: COLORS.deep }}
                  >
                    <span className="font-mono text-xs font-bold" style={{ color: COLORS.red }}>
                      NO
                    </span>
                  </div>
                  <h3 className="text-base font-mono font-bold uppercase" style={{ color: COLORS.red }}>
                    DON&apos;T
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Never use smooth gradients (linear-gradient, radial-gradient)",
                    "Never use rounded corners (rounded-lg/xl/full)",
                    "Never use blur effects (blur, backdrop-blur)",
                    "Never use serif fonts — monospace only",
                    "Never use soft shadows (shadow-sm/md/lg/xl)",
                    "Never use ease-in-out or smooth bezier curves anywhere",
                    "Never use blurred glow shadows for Blocky Aura (zero blur mandatory)",
                    "Never trigger Corner Blink outside group-hover state",
                    "Never use proportional scale (always squash-stretch separately)",
                    "Never animate corners in non-hover state (visual noise on idle)",
                    "Never deviate from NES palette to soft pastels or neons",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 shrink-0" style={{ backgroundColor: COLORS.red }} />
                      <span className="text-[11px] font-mono leading-relaxed" style={{ color: COLORS.text + "90" }}>
                        {rule}
                      </span>
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
      <footer
        className="relative border-t-2 overflow-hidden"
        style={{ backgroundColor: COLORS.deep, borderColor: COLORS.blue }}
      >
        {/* Pixel divider lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: COLORS.blue }} />
        <div className="absolute top-[4px] left-0 right-0 h-[1px]" style={{ backgroundColor: COLORS.gold + "44" }} />

        {/* Corner decorations */}
        <div className="absolute top-6 left-8 w-3 h-3" style={{ backgroundColor: COLORS.blue }} />
        <div className="absolute top-6 right-8 w-3 h-3" style={{ backgroundColor: COLORS.gold }} />
        <div className="absolute bottom-6 left-8 w-3 h-3" style={{ backgroundColor: COLORS.green }} />
        <div className="absolute bottom-6 right-8 w-3 h-3" style={{ backgroundColor: COLORS.red }} />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 border-2 flex items-center justify-center" style={{ borderColor: COLORS.blue, backgroundColor: COLORS.dark }}>
                  <div className="w-4 h-4" style={{ backgroundColor: COLORS.blue }} />
                </div>
                <span className="text-lg font-mono font-bold uppercase tracking-wider" style={{ color: COLORS.text }}>
                  Pixel<span style={{ color: COLORS.gold }}>Anime</span>
                </span>
              </div>
              <p className="text-xs font-mono leading-relaxed mb-4" style={{ color: COLORS.text + "70" }}>
                Classic JRPG game UI merged with pixel-art anime aesthetics.
                Every element belongs in a 16-bit RPG menu screen.
              </p>
              {/* Palette squares */}
              <div className="flex gap-2">
                {[COLORS.blue, COLORS.dark, COLORS.red, COLORS.gold, COLORS.green].map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 border-2 transition-all duration-75 ease-linear hover:scale-110 cursor-default"
                    style={{ backgroundColor: color, borderColor: COLORS.deep }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-xs font-mono">
              <div className="flex flex-col gap-3">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] border-b pb-2"
                  style={{ color: COLORS.blue, borderColor: COLORS.blue + "44" }}
                >
                  STYLE
                </span>
                <Link
                  href="/styles/pixel-anime"
                  className="transition-colors duration-75 hover:translate-x-[2px] inline-block"
                  style={{ color: COLORS.text + "70" }}
                >
                  &gt; Documentation
                </Link>
                <Link
                  href="/styles/pixel-anime/showcase"
                  className="transition-colors duration-75 hover:translate-x-[2px] inline-block"
                  style={{ color: COLORS.text + "70" }}
                >
                  &gt; Showcase
                </Link>
                <Link
                  href="/styles/pixel-anime/cover"
                  className="transition-colors duration-75 hover:translate-x-[2px] inline-block"
                  style={{ color: COLORS.text + "70" }}
                >
                  &gt; Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] border-b pb-2"
                  style={{ color: COLORS.gold, borderColor: COLORS.gold + "44" }}
                >
                  STYLEKIT
                </span>
                <Link
                  href="/"
                  className="transition-colors duration-75 hover:translate-x-[2px] inline-block"
                  style={{ color: COLORS.text + "70" }}
                >
                  &gt; Home
                </Link>
                <Link
                  href="/styles"
                  className="transition-colors duration-75 hover:translate-x-[2px] inline-block"
                  style={{ color: COLORS.text + "70" }}
                >
                  &gt; All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] border-b pb-2"
                  style={{ color: COLORS.green, borderColor: COLORS.green + "44" }}
                >
                  NES PALETTE
                </span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2" style={{ color: COLORS.text + "70" }}>
                    <div className="w-3 h-3 border shrink-0" style={{ backgroundColor: s.hex, borderColor: COLORS.deep }} />
                    {s.hex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 mb-8" style={{ borderColor: COLORS.blue + "33" }} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono" style={{ color: COLORS.text + "50" }}>
              <BlinkArrow />
              <span>STYLEKIT // PIXEL ANIME STYLE // NES PALETTE</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 border-2 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-75 ease-linear hover:-translate-y-1 hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d] active:scale-x-110 active:scale-y-90 active:shadow-none"
              style={{
                borderColor: COLORS.gold,
                color: COLORS.gold,
                backgroundColor: COLORS.deep,
                boxShadow: `3px 3px 0 ${COLORS.dark}`,
              }}
            >
              &lt; BACK TO STYLEKIT
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
