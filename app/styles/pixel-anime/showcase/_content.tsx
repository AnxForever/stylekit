"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// useInView — fires once when element crosses viewport threshold
// ---------------------------------------------------------------------------
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ---------------------------------------------------------------------------
// RevealBlock — slide-up reveal on scroll
// Uses ease-linear + short duration to preserve pixel-anime framerate feel
// ---------------------------------------------------------------------------
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.15s ease-linear ${delay}s, transform 0.15s ease-linear ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PixelFrame — RPG dialogue box with corner pixel squares
// children rendered inside, group class enables corner-blink on hover
// ---------------------------------------------------------------------------
function PixelFrame({
  children,
  className = "",
  cornerColor = "#4a90d9",
  borderColor = "#4a90d9",
  bg = "#1a1040",
}: {
  children: React.ReactNode;
  className?: string;
  cornerColor?: string;
  borderColor?: string;
  bg?: string;
}) {
  return (
    <div
      className={`group relative ${className}`}
      style={{
        border: `2px solid ${borderColor}`,
        background: bg,
        boxShadow: `4px 4px 0px #1a1040`,
      }}
    >
      {/* Corner pixel squares — blink on group-hover only (Corner Blink) */}
      <span
        className="absolute group-hover:animate-pulse transition-colors duration-75"
        style={{
          top: "-6px",
          left: "-6px",
          width: "12px",
          height: "12px",
          background: cornerColor,
          display: "block",
        }}
      />
      <span
        className="absolute group-hover:animate-pulse transition-colors duration-75"
        style={{
          top: "-6px",
          right: "-6px",
          width: "12px",
          height: "12px",
          background: cornerColor,
          display: "block",
        }}
      />
      <span
        className="absolute group-hover:animate-pulse transition-colors duration-75"
        style={{
          bottom: "-6px",
          left: "-6px",
          width: "12px",
          height: "12px",
          background: cornerColor,
          display: "block",
        }}
      />
      <span
        className="absolute group-hover:animate-pulse transition-colors duration-75"
        style={{
          bottom: "-6px",
          right: "-6px",
          width: "12px",
          height: "12px",
          background: cornerColor,
          display: "block",
        }}
      />
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StatusBar — HP / MP / EXP bar with flat fill
// ---------------------------------------------------------------------------
function StatusBar({
  label,
  value,
  max = 100,
  color,
}: {
  label: string;
  value: number;
  max?: number;
  color: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="font-mono text-xs" style={{ color }}>
          {label}
        </span>
        <span className="font-mono text-xs text-[#e0e0ff]">
          {value}/{max}
        </span>
      </div>
      <div
        className="w-full h-3"
        style={{ border: "2px solid #4a90d9", background: "#0d0828" }}
      >
        <div
          className="h-full transition-none"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// NES color palette items for the "shop"
// ---------------------------------------------------------------------------
const PALETTE_ITEMS = [
  {
    name: "PIXEL BLUE",
    hex: "#4a90d9",
    price: "128G",
    desc: "PRIMARY",
    role: "主色",
  },
  {
    name: "DEEP DARK",
    hex: "#2d1b69",
    price: "64G",
    desc: "BACKGROUND",
    role: "背景",
  },
  {
    name: "ABYSS",
    hex: "#1a1040",
    price: "32G",
    desc: "PANEL BG",
    role: "面板",
  },
  {
    name: "PIXEL RED",
    hex: "#ff6b6b",
    price: "96G",
    desc: "ACCENT",
    role: "点缀",
  },
  {
    name: "PIXEL GOLD",
    hex: "#ffd93d",
    price: "200G",
    desc: "HIGHLIGHT",
    role: "强调",
  },
  {
    name: "PIXEL GREEN",
    hex: "#50c878",
    price: "80G",
    desc: "HP BAR",
    role: "生命",
  },
  {
    name: "LIGHT TEXT",
    hex: "#e0e0ff",
    price: "16G",
    desc: "TEXT",
    role: "文字",
  },
];

// ---------------------------------------------------------------------------
// Characters for the RPG menu
// ---------------------------------------------------------------------------
const CHARACTERS = [
  {
    id: 0,
    name: "BUTTON",
    class: "WARRIOR",
    hp: 85,
    mp: 40,
    exp: 62,
    hpMax: 100,
    mpMax: 60,
    expMax: 100,
    desc: "A battle-hardened action element. Delivers Anime Action squash on press.",
    component: "button",
  },
  {
    id: 1,
    name: "CARD",
    class: "MAGE",
    hp: 60,
    mp: 95,
    exp: 78,
    hpMax: 80,
    mpMax: 100,
    expMax: 100,
    desc: "A dialogue box container. Casts Corner Blink on group-hover.",
    component: "card",
  },
  {
    id: 2,
    name: "INPUT",
    class: "ROGUE",
    hp: 72,
    mp: 55,
    exp: 45,
    hpMax: 90,
    mpMax: 70,
    expMax: 100,
    desc: "A pixel-bordered text field. Caret glows gold on focus.",
    component: "input",
  },
];

// ---------------------------------------------------------------------------
// DO / DONT quest items
// ---------------------------------------------------------------------------
const ACTIVE_QUESTS = [
  "Use RPG dialogue box frames with 2px borders and corner block decorations",
  "Include HP/MP/EXP status bars with flat color fills — no gradients",
  "Apply hard offset shadows 4px_4px_0px for pixel depth",
  "Use font-mono exclusively for all text without exception",
  "Keep transitions at duration-75 ease-linear to simulate 15fps cadence",
  "Blocky Aura: hover glow uses zero-blur multi-directional colored shadows",
  "Anime Action: active state applies scale-x-110 scale-y-90 squash on buttons",
  "Corner Blink: animate-pulse on corner squares only within group-hover",
];

const FORBIDDEN_SKILLS = [
  "Smooth gradients: linear-gradient or radial-gradient for decoration",
  "Rounded corners: rounded-lg, rounded-xl, rounded-full",
  "Blur effects: blur, backdrop-blur",
  "Serif fonts — monospace is the only permitted typeface",
  "Soft shadows: shadow-sm, shadow-md, shadow-lg",
  "ease-in-out or cubic-bezier curves — only ease-linear is permitted",
  "Blurred glow shadows for Blocky Aura — zero blur is mandatory",
  "Corner Blink animation outside group-hover state",
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function PixelAnimeShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const [pressStart, setPressStart] = useState(false);

  // Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Fake loading bar fills up after hero reveals
  useEffect(() => {
    if (!heroRevealed) return;
    let v = 0;
    const id = setInterval(() => {
      v += 4;
      setLoadingPct(Math.min(100, v));
      if (v >= 100) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [heroRevealed]);

  const selectedChar = CHARACTERS[activeMenu];

  return (
    <div
      className="min-h-screen text-[#e0e0ff]"
      style={{ background: "#2d1b69", fontFamily: "monospace" }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Global keyframes injected as a style tag                             */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @keyframes pa-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .pa-blink { animation: pa-blink 0.9s step-start infinite; }
        @keyframes pa-scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 8px; }
        }
      `}</style>

      {/* ================================================================== */}
      {/* 1. FIXED NAV                                                         */}
      {/* ================================================================== */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "#1a1040",
          borderBottom: "2px solid #4a90d9",
          boxShadow: "0 4px 0 #4a90d9",
        }}
      >
        {/* Nav corner pixel squares */}
        <span
          style={{
            position: "absolute",
            top: "-2px",
            left: "-2px",
            width: "8px",
            height: "8px",
            background: "#4a90d9",
            display: "block",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "-2px",
            right: "-2px",
            width: "8px",
            height: "8px",
            background: "#4a90d9",
            display: "block",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/styles/pixel-anime/showcase"
              className="font-mono font-bold text-sm tracking-widest text-[#ffd93d] uppercase transition-colors duration-75 ease-linear hover:text-[#e0e0ff]"
            >
              [STYLEKIT]
            </Link>
            <nav className="flex items-center gap-4 md:gap-6">
              <Link
                href="/styles/pixel-anime"
                className="font-mono text-xs text-[#e0e0ff]/60 uppercase tracking-widest transition-colors duration-75 ease-linear hover:text-[#4a90d9]"
              >
                DOCS
              </Link>
              <Link
                href="/styles"
                className="font-mono text-xs text-[#e0e0ff]/60 uppercase tracking-widest transition-colors duration-75 ease-linear hover:text-[#4a90d9]"
              >
                STYLES
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* 2. HERO — RPG Title Screen                                           */}
      {/* ================================================================== */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen pt-14"
        style={{ background: "#2d1b69" }}
      >
        {/* Pixel grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,16,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.15) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Title stack */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.15s ease-linear, transform 0.15s ease-linear",
            }}
          >
            <div
              className="font-mono font-black uppercase tracking-widest"
              style={{
                fontSize: "clamp(3rem, 12vw, 7rem)",
                color: "#4a90d9",
                lineHeight: 1,
                textShadow: "4px 4px 0 #1a1040",
              }}
            >
              PIXEL
            </div>
            <div
              className="font-mono font-black uppercase tracking-widest"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 6rem)",
                color: "#ffd93d",
                lineHeight: 1,
                textShadow: "4px 4px 0 #1a1040",
              }}
            >
              ANIME
            </div>
          </div>

          {/* Sub-label */}
          <p
            className="font-mono text-xs md:text-sm tracking-widest mt-4 text-[#e0e0ff]/60 uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.15s ease-linear 0.1s",
            }}
          >
            JRPG // 8-BIT // NES PALETTE
          </p>

          {/* Loading bar */}
          <div
            className="mt-8 w-64 md:w-80"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.15s ease-linear 0.15s",
            }}
          >
            <div className="flex justify-between mb-1">
              <span className="font-mono text-xs text-[#e0e0ff]/60">
                LOADING...
              </span>
              <span className="font-mono text-xs text-[#ffd93d]">
                {loadingPct}%
              </span>
            </div>
            <div
              className="w-full h-4"
              style={{ border: "2px solid #4a90d9", background: "#0d0828" }}
            >
              <div
                className="h-full transition-none"
                style={{ width: `${loadingPct}%`, background: "#4a90d9" }}
              />
            </div>
          </div>

          {/* PRESS START button */}
          <button
            className="mt-10 font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
            onMouseDown={() => setPressStart(true)}
            onMouseUp={() => setPressStart(false)}
            onMouseLeave={() => setPressStart(false)}
            style={{
              padding: "14px 36px",
              background: "#ff6b6b",
              border: "2px solid #1a1040",
              boxShadow: pressStart
                ? "none"
                : "4px 4px 0 #1a1040",
              transform: pressStart ? "translate(4px,4px)" : "none",
              fontSize: "0.85rem",
              opacity: heroRevealed ? 1 : 0,
              transition:
                "opacity 0.15s ease-linear 0.25s, box-shadow 0.075s ease-linear, transform 0.075s ease-linear",
            }}
          >
            {loadingPct < 100 ? (
              <>LOADING {loadingPct}%</>
            ) : (
              <span>
                PRESS START
                <span className="ml-2 pa-blink">_</span>
              </span>
            )}
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          style={{
            opacity: heroRevealed && loadingPct >= 100 ? 1 : 0,
            transition: "opacity 0.15s ease-linear 0.4s",
          }}
        >
          <span className="font-mono text-xs text-[#e0e0ff]/40 pa-blink uppercase tracking-widest">
            scroll down
          </span>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. CHARACTER MENU — Component Demo                                   */}
      {/* ================================================================== */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <RevealBlock>
          <div className="mb-10">
            <p className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-1">
              {"// SECTION 02"}
            </p>
            <h2
              className="font-mono font-bold uppercase tracking-widest"
              style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "#ffd93d" }}
            >
              CHARACTER SELECT
            </h2>
            <p className="font-mono text-xs text-[#e0e0ff]/50 mt-1 uppercase tracking-widest">
              Choose your component
            </p>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.05}>
          <PixelFrame className="p-0 overflow-visible" borderColor="#4a90d9" bg="#1a1040">
            <div className="flex flex-col md:flex-row min-h-[420px]">
              {/* Left panel — character list */}
              <div
                className="w-full md:w-56 flex-shrink-0"
                style={{ borderRight: "2px solid #4a90d9" }}
              >
                <div
                  className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest px-4 py-3"
                  style={{ borderBottom: "2px solid #4a90d9" }}
                >
                  PARTY
                </div>
                {CHARACTERS.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setActiveMenu(char.id)}
                    className="w-full text-left font-mono uppercase tracking-widest transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                    style={{
                      padding: "10px 16px",
                      background:
                        activeMenu === char.id ? "#4a90d9" : "transparent",
                      color: activeMenu === char.id ? "#1a1040" : "#e0e0ff",
                      borderBottom: "1px solid #4a90d9",
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{activeMenu === char.id ? ">" : " "}</span>
                    <span>{char.name}</span>
                  </button>
                ))}
              </div>

              {/* Right panel — component preview */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                {/* Character header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono font-bold text-lg text-[#ffd93d] uppercase tracking-widest">
                        {selectedChar.name}
                      </p>
                      <p className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest">
                        CLASS: {selectedChar.class}
                      </p>
                    </div>
                    <div
                      className="px-2 py-1 font-mono text-xs text-[#1a1040] font-bold uppercase"
                      style={{ background: "#ffd93d" }}
                    >
                      LV 99
                    </div>
                  </div>

                  {/* Status bars */}
                  <div className="mb-4">
                    <StatusBar
                      label="HP"
                      value={selectedChar.hp}
                      max={selectedChar.hpMax}
                      color="#50c878"
                    />
                    <StatusBar
                      label="MP"
                      value={selectedChar.mp}
                      max={selectedChar.mpMax}
                      color="#4a90d9"
                    />
                    <StatusBar
                      label="EXP"
                      value={selectedChar.exp}
                      max={selectedChar.expMax}
                      color="#ffd93d"
                    />
                  </div>

                  <p className="font-mono text-xs text-[#e0e0ff]/70 leading-relaxed">
                    &gt; {selectedChar.desc}
                  </p>
                </div>

                {/* Live component preview */}
                <div>
                  <p
                    className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-3"
                    style={{ borderBottom: "1px solid #4a90d9", paddingBottom: "4px" }}
                  >
                    PREVIEW
                  </p>

                  {selectedChar.component === "button" && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="font-mono font-bold uppercase tracking-widest text-white transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                        style={{
                          padding: "10px 24px",
                          background: "#4a90d9",
                          border: "2px solid #1a1040",
                          boxShadow: "4px 4px 0 #1a1040",
                          fontSize: "0.75rem",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "4px 4px 0 #ffd93d, -2px -2px 0 #ffd93d";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "4px 4px 0 #1a1040";
                        }}
                      >
                        ATTACK
                      </button>
                      <button
                        className="font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                        style={{
                          padding: "10px 24px",
                          background: "#ff6b6b",
                          border: "2px solid #1a1040",
                          boxShadow: "4px 4px 0 #1a1040",
                          color: "#1a1040",
                          fontSize: "0.75rem",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "4px 4px 0 #ffd93d, -2px -2px 0 #ffd93d";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "4px 4px 0 #1a1040";
                        }}
                      >
                        MAGIC
                      </button>
                      <button
                        className="font-mono font-bold uppercase tracking-widest transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                        style={{
                          padding: "10px 24px",
                          background: "transparent",
                          border: "2px solid #50c878",
                          boxShadow: "4px 4px 0 #1a1040",
                          color: "#50c878",
                          fontSize: "0.75rem",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "4px 4px 0 #50c878, -2px -2px 0 #50c878";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "4px 4px 0 #1a1040";
                        }}
                      >
                        ITEM
                      </button>
                    </div>
                  )}

                  {selectedChar.component === "card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: "QUEST LOG",
                          body: "> A new adventure awaits! Press A to continue...",
                          corner: "#4a90d9",
                        },
                        {
                          title: "ITEM FOUND",
                          body: "> You obtained: Pixel Sword x1",
                          corner: "#ffd93d",
                        },
                      ].map((c, i) => (
                        <PixelFrame
                          key={i}
                          className="p-4"
                          cornerColor={c.corner}
                          borderColor={c.corner}
                          bg="#0d0828"
                        >
                          <p
                            className="font-mono font-bold text-sm uppercase tracking-widest mb-2"
                            style={{ color: c.corner }}
                          >
                            {c.title}
                          </p>
                          <p className="font-mono text-xs text-[#e0e0ff]/70 leading-relaxed">
                            {c.body}
                          </p>
                        </PixelFrame>
                      ))}
                    </div>
                  )}

                  {selectedChar.component === "input" && (
                    <div className="space-y-3 max-w-sm">
                      <input
                        type="text"
                        placeholder="ENTER NAME..."
                        className="w-full font-mono text-sm text-[#e0e0ff] placeholder-[#e0e0ff]/30 bg-[#0d0828] transition-all duration-75 ease-linear focus:outline-none"
                        style={{
                          padding: "10px 14px",
                          border: "2px solid #4a90d9",
                          caretColor: "#ffd93d",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#ffd93d";
                          e.currentTarget.style.boxShadow =
                            "2px 2px 0px #4a90d9";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#4a90d9";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      <input
                        type="text"
                        placeholder="ENTER HERO CLASS..."
                        className="w-full font-mono text-sm text-[#e0e0ff] placeholder-[#e0e0ff]/30 bg-[#0d0828] transition-all duration-75 ease-linear focus:outline-none"
                        style={{
                          padding: "10px 14px",
                          border: "2px solid #4a90d9",
                          caretColor: "#ffd93d",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#ffd93d";
                          e.currentTarget.style.boxShadow =
                            "2px 2px 0px #4a90d9";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#4a90d9";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </PixelFrame>
        </RevealBlock>
      </section>

      {/* ================================================================== */}
      {/* 4. ITEM SHOP — Color Palette                                         */}
      {/* ================================================================== */}
      <section
        className="py-20 px-4 md:px-8"
        style={{ background: "#1a1040" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-10">
              <p className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-1">
                {"// SECTION 03"}
              </p>
              <h2
                className="font-mono font-bold uppercase tracking-widest"
                style={{
                  fontSize: "clamp(1.2rem, 4vw, 2rem)",
                  color: "#ffd93d",
                }}
              >
                ITEM SHOP
              </h2>
              <p className="font-mono text-xs text-[#e0e0ff]/50 mt-1 uppercase tracking-widest">
                NES color palette — purchase your hues
              </p>
            </div>
          </RevealBlock>

          {/* Shop frame */}
          <RevealBlock delay={0.05}>
            <PixelFrame
              className="overflow-visible"
              borderColor="#ffd93d"
              cornerColor="#ffd93d"
              bg="#0d0828"
            >
              {/* Shop header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "2px solid #ffd93d" }}
              >
                <span className="font-mono text-xs text-[#ffd93d] uppercase tracking-widest font-bold">
                  PIXEL PALETTE SHOP
                </span>
                <span className="font-mono text-xs text-[#e0e0ff]/60 uppercase tracking-widest">
                  7 ITEMS IN STOCK
                </span>
              </div>

              {/* Item grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px p-px">
                {PALETTE_ITEMS.map((item, i) => (
                  <RevealBlock key={i} delay={i * 0.03}>
                    <div
                      className="group relative p-4 transition-all duration-75 ease-linear cursor-pointer"
                      style={{ background: "#0d0828" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background =
                          "#1a1040";
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.boxShadow = `4px 4px 0 ${item.hex}, -2px -2px 0 ${item.hex}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background =
                          "#0d0828";
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "none";
                      }}
                    >
                      {/* Color swatch — the "item icon" */}
                      <div
                        className="w-10 h-10 mb-3 flex-shrink-0"
                        style={{
                          background: item.hex,
                          border: "2px solid #4a90d9",
                          boxShadow: "2px 2px 0 #1a1040",
                        }}
                      />
                      <p
                        className="font-mono font-bold text-xs uppercase tracking-widest mb-1"
                        style={{ color: item.hex }}
                      >
                        {item.name}
                      </p>
                      <p className="font-mono text-xs text-[#e0e0ff]/40 uppercase tracking-widest mb-2">
                        {item.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#e0e0ff]/60 tracking-widest">
                          {item.hex}
                        </span>
                        <span
                          className="font-mono text-xs font-bold tracking-widest"
                          style={{ color: "#ffd93d" }}
                        >
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </RevealBlock>
                ))}
              </div>

              {/* Shop footer */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: "2px solid #ffd93d" }}
              >
                <span className="font-mono text-xs text-[#e0e0ff]/40 uppercase tracking-widest">
                  &gt; WELCOME TO THE COLOUR SHOP
                </span>
                <button
                  className="font-mono text-xs text-[#1a1040] font-bold uppercase tracking-widest px-4 py-2 transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                  style={{
                    background: "#ffd93d",
                    border: "2px solid #1a1040",
                    boxShadow: "2px 2px 0 #1a1040",
                  }}
                >
                  BUY ALL
                </button>
              </div>
            </PixelFrame>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. QUEST LOG — Design Rules (Do / Don't)                             */}
      {/* ================================================================== */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <RevealBlock>
          <div className="mb-10">
            <p className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-1">
              {"// SECTION 04"}
            </p>
            <h2
              className="font-mono font-bold uppercase tracking-widest"
              style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "#ffd93d" }}
            >
              QUEST LOG
            </h2>
            <p className="font-mono text-xs text-[#e0e0ff]/50 mt-1 uppercase tracking-widest">
              Design rules — active quests vs forbidden skills
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active quests — DO */}
          <RevealBlock delay={0}>
            <PixelFrame
              className="overflow-visible"
              borderColor="#50c878"
              cornerColor="#50c878"
              bg="#0d0828"
            >
              <div
                className="flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "#50c878",
                  borderBottom: "2px solid #50c878",
                }}
              >
                <span>[ ACTIVE QUESTS ]</span>
              </div>
              <ul className="p-4 space-y-3">
                {ACTIVE_QUESTS.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono font-bold flex-shrink-0 mt-0.5"
                      style={{ color: "#50c878", fontSize: "0.75rem" }}
                    >
                      &gt;
                    </span>
                    <span
                      className="font-mono leading-relaxed"
                      style={{ color: "#e0e0ff", fontSize: "0.7rem" }}
                    >
                      {q}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="px-4 py-2 font-mono text-xs text-[#50c878]/50 uppercase tracking-widest"
                style={{ borderTop: "1px solid #50c878" }}
              >
                {ACTIVE_QUESTS.length} OBJECTIVES REMAINING
              </div>
            </PixelFrame>
          </RevealBlock>

          {/* Forbidden skills — DON'T */}
          <RevealBlock delay={0.05}>
            <PixelFrame
              className="overflow-visible"
              borderColor="#ff6b6b"
              cornerColor="#ff6b6b"
              bg="#0d0828"
            >
              <div
                className="flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "#ff6b6b",
                  borderBottom: "2px solid #ff6b6b",
                }}
              >
                <span>[ FORBIDDEN SKILLS ]</span>
              </div>
              <ul className="p-4 space-y-3">
                {FORBIDDEN_SKILLS.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono font-bold flex-shrink-0 mt-0.5"
                      style={{ color: "#ff6b6b", fontSize: "0.75rem" }}
                    >
                      X
                    </span>
                    <span
                      className="font-mono leading-relaxed line-through decoration-[#ff6b6b]/50"
                      style={{ color: "#e0e0ff/70", fontSize: "0.7rem" }}
                    >
                      {q}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="px-4 py-2 font-mono text-xs text-[#ff6b6b]/50 uppercase tracking-widest"
                style={{ borderTop: "1px solid #ff6b6b" }}
              >
                {FORBIDDEN_SKILLS.length} SKILLS BANNED
              </div>
            </PixelFrame>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. TYPOGRAPHY & INTERACTION GALLERY                                  */}
      {/* ================================================================== */}
      <section
        className="py-20 px-4 md:px-8"
        style={{ background: "#1a1040" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-10">
              <p className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-1">
                {"// SECTION 05"}
              </p>
              <h2
                className="font-mono font-bold uppercase tracking-widest"
                style={{
                  fontSize: "clamp(1.2rem, 4vw, 2rem)",
                  color: "#ffd93d",
                }}
              >
                SYSTEM STATS
              </h2>
              <p className="font-mono text-xs text-[#e0e0ff]/50 mt-1 uppercase tracking-widest">
                Typography scale + interaction physics
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Type scale */}
            <RevealBlock delay={0}>
              <PixelFrame
                className="p-6 overflow-visible"
                borderColor="#4a90d9"
                cornerColor="#4a90d9"
                bg="#0d0828"
              >
                <p
                  className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-5 font-bold"
                  style={{ borderBottom: "1px solid #4a90d9", paddingBottom: "6px" }}
                >
                  FONT SCALE // MONO ONLY
                </p>
                <div className="space-y-4">
                  {[
                    { label: "H1", size: "2rem", text: "TITLE SCREEN", color: "#4a90d9" },
                    { label: "H2", size: "1.4rem", text: "CHAPTER NAME", color: "#ffd93d" },
                    { label: "H3", size: "1rem", text: "SECTION LABEL", color: "#50c878" },
                    { label: "BODY", size: "0.75rem", text: "> Dialogue text appears here...", color: "#e0e0ff" },
                    { label: "CAPTION", size: "0.6rem", text: "PRESS A TO CONTINUE", color: "#e0e0ff" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-[0.6rem] text-[#e0e0ff]/30 uppercase tracking-widest w-12 flex-shrink-0"
                      >
                        {s.label}
                      </span>
                      <span
                        className="font-mono font-bold uppercase tracking-widest leading-none"
                        style={{ fontSize: s.size, color: s.color }}
                      >
                        {s.text}
                      </span>
                    </div>
                  ))}
                </div>
              </PixelFrame>
            </RevealBlock>

            {/* Interaction demos */}
            <RevealBlock delay={0.05}>
              <PixelFrame
                className="p-6 overflow-visible"
                borderColor="#ff6b6b"
                cornerColor="#ff6b6b"
                bg="#0d0828"
              >
                <p
                  className="font-mono text-xs text-[#ff6b6b] uppercase tracking-widest mb-5 font-bold"
                  style={{ borderBottom: "1px solid #ff6b6b", paddingBottom: "6px" }}
                >
                  INTERACTION PHYSICS
                </p>
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-xs text-[#e0e0ff]/50 uppercase tracking-widest mb-2">
                      BLOCKY AURA (zero-blur shadow hover)
                    </p>
                    <button
                      className="font-mono text-xs uppercase tracking-widest px-5 py-2 transition-all duration-75 ease-linear"
                      style={{
                        background: "#4a90d9",
                        border: "2px solid #1a1040",
                        boxShadow: "4px 4px 0 #1a1040",
                        color: "#1a1040",
                        fontWeight: "bold",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "4px 4px 0 #ffd93d, -2px -2px 0 #ffd93d";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "4px 4px 0 #1a1040";
                      }}
                    >
                      HOVER ME
                    </button>
                  </div>

                  <div>
                    <p className="font-mono text-xs text-[#e0e0ff]/50 uppercase tracking-widest mb-2">
                      ANIME ACTION (squash on press)
                    </p>
                    <button
                      className="font-mono text-xs uppercase tracking-widest px-5 py-2 transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
                      style={{
                        background: "#ff6b6b",
                        border: "2px solid #1a1040",
                        boxShadow: "4px 4px 0 #1a1040",
                        color: "#1a1040",
                        fontWeight: "bold",
                      }}
                    >
                      PRESS ME
                    </button>
                  </div>

                  <div>
                    <p className="font-mono text-xs text-[#e0e0ff]/50 uppercase tracking-widest mb-2">
                      CORNER BLINK (group-hover only)
                    </p>
                    <PixelFrame
                      className="px-4 py-3 inline-block"
                      cornerColor="#ffd93d"
                      borderColor="#ffd93d"
                      bg="#1a1040"
                    >
                      <span className="font-mono text-xs text-[#ffd93d] uppercase tracking-widest">
                        HOVER CARD
                      </span>
                    </PixelFrame>
                  </div>

                  <div>
                    <p className="font-mono text-xs text-[#e0e0ff]/50 uppercase tracking-widest mb-2">
                      FRAMERATE DROP (duration-75 ease-linear)
                    </p>
                    <div
                      className="w-32 h-3 transition-all duration-75 ease-linear"
                      style={{ border: "2px solid #50c878", background: "#0d0828", cursor: "pointer" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.width = "12rem";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.width = "8rem";
                      }}
                    >
                      <div className="h-full bg-[#50c878]" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>
              </PixelFrame>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. BATTLE STATS — Stat cards row                                     */}
      {/* ================================================================== */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <RevealBlock>
          <div className="mb-10">
            <p className="font-mono text-xs text-[#4a90d9] uppercase tracking-widest mb-1">
              {"// SECTION 06"}
            </p>
            <h2
              className="font-mono font-bold uppercase tracking-widest"
              style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "#ffd93d" }}
            >
              BATTLE STATS
            </h2>
            <p className="font-mono text-xs text-[#e0e0ff]/50 mt-1 uppercase tracking-widest">
              Style framework metrics
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "COMPONENTS", value: "12", sub: "ELEMENTS", color: "#4a90d9", bar: 80 },
            { label: "ANIMATIONS", value: "4", sub: "PHYSICS", color: "#ffd93d", bar: 60 },
            { label: "PALETTE", value: "7", sub: "NES COLORS", color: "#50c878", bar: 100 },
            { label: "RULES", value: "16", sub: "CONSTRAINTS", color: "#ff6b6b", bar: 90 },
          ].map((stat, i) => (
            <RevealBlock key={i} delay={i * 0.04}>
              <PixelFrame
                className="p-4 overflow-visible transition-all duration-75 ease-linear"
                borderColor={stat.color}
                cornerColor={stat.color}
                bg="#0d0828"
              >
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.label}
                </p>
                <p
                  className="font-mono font-black"
                  style={{
                    fontSize: "2.5rem",
                    color: "#e0e0ff",
                    lineHeight: 1,
                    textShadow: `2px 2px 0 ${stat.color}`,
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-xs text-[#e0e0ff]/40 uppercase tracking-widest mt-1 mb-3">
                  {stat.sub}
                </p>
                <div
                  className="w-full h-2"
                  style={{ border: `1px solid ${stat.color}`, background: "#1a1040" }}
                >
                  <div
                    className="h-full"
                    style={{ width: `${stat.bar}%`, background: stat.color }}
                  />
                </div>
              </PixelFrame>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER                                                               */}
      {/* ================================================================== */}
      <footer
        className="py-12 px-4 md:px-8"
        style={{
          background: "#0d0828",
          borderTop: "2px solid #4a90d9",
          boxShadow: "0 -4px 0 #4a90d9",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="font-mono font-bold uppercase tracking-widest text-[#ffd93d] mb-1"
              style={{ fontSize: "1rem" }}
            >
              [ END OF DEMO ]
            </p>
            <p className="font-mono text-xs text-[#e0e0ff]/40 uppercase tracking-widest">
              PIXEL ANIME (c) 2026 — ALL RIGHTS RESERVED
            </p>
          </div>
          <Link
            href="/styles"
            className="font-mono font-bold uppercase tracking-widest text-[#1a1040] transition-all duration-75 ease-linear active:scale-x-110 active:scale-y-90"
            style={{
              padding: "12px 28px",
              background: "#4a90d9",
              border: "2px solid #1a1040",
              boxShadow: "4px 4px 0 #1a1040",
              fontSize: "0.75rem",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "4px 4px 0 #ffd93d, -2px -2px 0 #ffd93d";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "4px 4px 0 #1a1040";
            }}
          >
            [ RETURN TO STYLEKIT ]
          </Link>
        </div>
      </footer>
    </div>
  );
}
