"use client";

import { useRef, useEffect, useState } from "react";
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
          obs.disconnect(); // auto-disconnect after first trigger
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
/*  Pop Art color constants (from lib/styles/pop-art.ts)               */
/* ------------------------------------------------------------------ */

const YELLOW = "#ffdd00";
const PINK = "#ff69b4";
const BLUE = "#00bfff";
const BLACK = "#000000";
const WHITE = "#ffffff";
const RED = "#ff0000";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function BenDayLayer({
  color = BLACK,
  gridSize = "10px",
  dotSize = "2px",
  opacity = 0.1,
  offset = false,
}: {
  color?: string;
  gridSize?: string;
  dotSize?: string;
  opacity?: number;
  offset?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}, transparent ${dotSize})`,
        backgroundSize: `${gridSize} ${gridSize}`,
        backgroundPosition: offset ? "5px 5px" : "0 0",
        opacity,
      }}
    />
  );
}

function SpeechBubble({
  children,
  bg = WHITE,
  tailDir = "left",
}: {
  children: React.ReactNode;
  bg?: string;
  tailDir?: "left" | "right" | "bottom";
}) {
  return (
    <div className="relative inline-block">
      <div
        className="px-5 py-3 border-4 border-black font-bold uppercase tracking-wide text-black"
        style={{
          background: bg,
          boxShadow: "4px 4px 0 #000",
          borderRadius: "10px",
        }}
      >
        {children}
      </div>
      {tailDir !== "bottom" && (
        <>
          <div
            className="absolute"
            style={{
              bottom: "-18px",
              [tailDir === "left" ? "left" : "right"]: "20px",
              width: 0,
              height: 0,
              borderLeft: tailDir === "left" ? "10px solid transparent" : "10px solid #000",
              borderRight: tailDir === "right" ? "10px solid transparent" : "10px solid #000",
              borderTop: "18px solid #000",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "-13px",
              [tailDir === "left" ? "left" : "right"]: "23px",
              width: 0,
              height: 0,
              borderLeft: tailDir === "left" ? "7px solid transparent" : `7px solid ${bg}`,
              borderRight: tailDir === "right" ? "7px solid transparent" : `7px solid ${bg}`,
              borderTop: `14px solid ${bg}`,
            }}
          />
        </>
      )}
    </div>
  );
}

function StarburstBadge({
  children,
  bg = YELLOW,
  size = 80,
}: {
  children: React.ReactNode;
  bg?: string;
  size?: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: BLACK,
          clipPath:
            "polygon(50% 0%,57% 30%,79% 9%,70% 36%,98% 35%,75% 52%,95% 73%,68% 65%,79% 91%,55% 75%,50% 100%,45% 75%,21% 91%,32% 65%,5% 73%,25% 52%,2% 35%,30% 36%,21% 9%,43% 30%)",
          transform: "scale(1.08)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: bg,
          clipPath:
            "polygon(50% 0%,57% 30%,79% 9%,70% 36%,98% 35%,75% 52%,95% 73%,68% 65%,79% 91%,55% 75%,50% 100%,45% 75%,21% 91%,32% 65%,5% 73%,25% 52%,2% 35%,30% 36%,21% 9%,43% 30%)",
        }}
      />
      <span
        className="relative z-10 font-black uppercase text-center leading-none text-black"
        style={{ fontSize: size < 70 ? "0.6rem" : "0.8rem" }}
      >
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type ComponentTab = "buttons" | "cards" | "inputs";

const WARHOL_SETS = [
  [
    { bg: YELLOW, accent: PINK },
    { bg: PINK, accent: BLUE },
    { bg: BLUE, accent: YELLOW },
    { bg: WHITE, accent: PINK },
  ],
  [
    { bg: PINK, accent: YELLOW },
    { bg: BLUE, accent: PINK },
    { bg: YELLOW, accent: BLUE },
    { bg: BLACK, accent: YELLOW },
  ],
  [
    { bg: BLUE, accent: YELLOW },
    { bg: YELLOW, accent: PINK },
    { bg: PINK, accent: BLUE },
    { bg: WHITE, accent: BLUE },
  ],
];

const PALETTE = [
  { name: "WARHOL YELLOW", hex: YELLOW, textColor: BLACK, label: "Primary" },
  { name: "LICHTENSTEIN PINK", hex: PINK, textColor: BLACK, label: "Secondary" },
  { name: "ELECTRIC BLUE", hex: BLUE, textColor: BLACK, label: "Accent" },
  { name: "BOLD BLACK", hex: BLACK, textColor: YELLOW, label: "Border" },
  { name: "CANVAS WHITE", hex: WHITE, textColor: BLACK, label: "Base" },
];

const DO_RULES = [
  "border-4 border-black — thick outlines on every element",
  "shadow-[6px_6px_0_#000] — hard offset, zero blur",
  "Ben-Day dual dot layers for halftone texture",
  "font-black uppercase tracking-widest typography",
  "bg-[#ffdd00] bg-[#ff69b4] bg-[#00bfff] — pure flat fills",
  "hover:scale-110 hover:-rotate-3 — Comic Pow! exaggerated tilt",
  "duration-100 ease-out — Punchy Motion speed",
  "active:shadow-[2px_2px_0_#000] — Active Snap inward press",
];

const DONT_RULES = [
  "No gradients — flat color fills only, always",
  "No low-saturation, gray, or muted palette",
  "No border-1 or border-2 — minimum border-4",
  "No shadow-md or soft blurred shadows",
  "No rounded-full on main containers",
  "No minimal or clean design language",
  "No duration-200 or slower — must be duration-100",
  "No single-layer Ben-Day dots — always dual layers",
  "No hover:translate-y alone without scale + rotate",
];

const SFX_WORDS = [
  { word: "POW!", bg: YELLOW, rotate: "-4deg" },
  { word: "BANG!", bg: PINK, rotate: "3deg" },
  { word: "ZAP!", bg: BLUE, rotate: "-2deg" },
  { word: "WHAM!", bg: WHITE, rotate: "5deg" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function PopArtShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [warholSet, setWarholSet] = useState(0);
  const [dotLayerHovered, setDotLayerHovered] = useState(false);
  const [snapPressed, setSnapPressed] = useState(false);
  const [punchyActive, setPunchyActive] = useState(false);
  const [punchyFired, setPunchyFired] = useState(false);
  const [powHovered, setPowHovered] = useState(false);
  const [powClicked, setPowClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handlePunchyFire() {
    if (punchyFired) return;
    setPunchyFired(true);
    setPunchyActive(true);
    setTimeout(() => {
      setPunchyActive(false);
      setTimeout(() => setPunchyFired(false), 600);
    }, 200);
  }

  function handlePowClick() {
    setPowClicked(true);
    setTimeout(() => setPowClicked(false), 600);
  }

  const currentWarhol = WARHOL_SETS[warholSet];

  return (
    <div className="min-h-screen font-sans text-black overflow-x-hidden" style={{ background: WHITE }}>
      <style>{`
        @keyframes pop-stamp {
          0%   { opacity: 0; transform: scale(1.8) rotate(-12deg); }
          40%  { opacity: 1; transform: scale(0.92) rotate(4deg); }
          70%  { transform: scale(1.06) rotate(-1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes pop-shake {
          0%,100% { transform: scale(1.1) rotate(-3deg); }
          30%  { transform: scale(1.14) rotate(-5deg); }
          60%  { transform: scale(1.1) rotate(-1deg); }
        }
        @keyframes pop-dot-breathe {
          0%,100% { opacity: 0.06; }
          50%     { opacity: 0.14; }
        }
        @keyframes pop-stripe {
          0%   { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes pop-bounce-sfx {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%     { transform: translateY(-10px) rotate(2deg); }
        }
        .pop-dot-breathe { animation: pop-dot-breathe 3s ease-in-out infinite; }
        .pop-bounce-sfx  { animation: pop-bounce-sfx 1.6s ease-in-out infinite; }
        .pop-stamp-anim  { animation: pop-stamp 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        .pop-shake-anim  { animation: pop-shake 0.35s ease-out forwards; }

        /* Comic Pow! button — the canonical pop-art hover rule */
        .pop-btn {
          transition: all 0.1s ease-out;
        }
        .pop-btn:hover {
          transform: scale(1.1) rotate(-3deg) translateY(-3px);
          box-shadow: 10px 10px 0 #000;
        }
        .pop-btn:active {
          transform: scale(0.95) rotate(2deg) translate(4px, 4px);
          box-shadow: 2px 2px 0 #000;
          transition-duration: 0.05s;
        }

        /* Card Comic Pow! */
        .pop-card {
          transition: all 0.15s ease-out;
        }
        .pop-card:hover {
          transform: translateY(-6px) translateX(-3px) rotate(-1deg);
          box-shadow: 14px 14px 0 #000;
        }
        .pop-card:hover .pop-card-badge {
          transform: scale(1.1) rotate(-4deg);
          background: ${YELLOW};
        }
        .pop-card:hover .pop-card-title {
          transform: skewX(-4deg);
        }
        .pop-card-badge { transition: all 0.15s ease-out; }
        .pop-card-title { transition: transform 0.15s ease-out; }

        /* Base Ben-Day intensifies on group-hover */
        .pop-card:hover .ben-day-base { opacity: 0.28; }
        .pop-card:hover .ben-day-red  { opacity: 0.18; }
        .ben-day-base { transition: opacity 0.15s ease-out; opacity: 0.08; }
        .ben-day-red  { transition: opacity 0.15s ease-out; opacity: 0; }
      `}</style>

      {/* ============================================================== */}
      {/* 1. STICKY NAV                                                   */}
      {/* ============================================================== */}
      <header
        className="sticky top-0 z-50 border-b-4 border-black"
        style={{ background: YELLOW }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 border-4 border-black"
            style={{ background: BLACK }}
          >
            <span className="font-black uppercase text-sm tracking-widest" style={{ color: YELLOW }}>
              POP ART
            </span>
            <span
              className="font-black uppercase text-[10px] tracking-widest px-1.5 py-0.5 border-2 border-yellow-300"
              style={{ background: YELLOW, color: BLACK }}
            >
              STYLE
            </span>
          </div>

          {/* Center anchors */}
          <nav className="hidden md:flex items-center gap-0">
            {["Palette", "Components", "AI Rules", "Do/Don't"].map((item) => (
              <span
                key={item}
                className="px-3 py-2 border-2 border-transparent hover:border-black font-black uppercase text-xs tracking-wider cursor-pointer transition-all duration-100 ease-out hover:bg-white"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/pop-art"
            className="pop-btn flex items-center gap-1.5 px-4 py-2 border-4 border-black font-black uppercase text-xs tracking-wider"
            style={{ background: PINK, color: BLACK, boxShadow: "4px 4px 0 #000" }}
          >
            <span>&#8592;</span>
            <span>Style Page</span>
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO — Warhol 4-quadrant grid + headline                    */}
      {/* ============================================================== */}
      <section className="relative border-b-4 border-black overflow-hidden">
        {/* 4-panel Warhol grid */}
        <div className="grid grid-cols-2" style={{ minHeight: "480px" }}>
          {currentWarhol.map((panel, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center p-8 overflow-hidden"
              style={{
                background: panel.bg,
                borderRight: i % 2 === 0 ? "4px solid #000" : "none",
                borderBottom: i < 2 ? "4px solid #000" : "none",
                minHeight: "240px",
              }}
            >
              {/* Ben-Day base */}
              <BenDayLayer color={BLACK} gridSize="8px" dotSize="1.5px" opacity={0.09} />
              {/* Headline */}
              <div
                className="relative z-10 text-center"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                }}
              >
                <p
                  className="font-black uppercase text-xs tracking-widest mb-2"
                  style={{ color: panel.accent }}
                >
                  ANDY WARHOL STYLE
                </p>
                <h1
                  className="font-black uppercase leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    color: BLACK,
                    textShadow: `4px 4px 0 ${panel.accent}`,
                    letterSpacing: "-0.02em",
                  }}
                >
                  POP<br />ART
                </h1>
                <p
                  className="font-bold uppercase text-xs mt-2 tracking-widest"
                  style={{ color: BLACK, opacity: 0.6 }}
                >
                  1962 &mdash; PRESENT
                </p>
              </div>
              {/* Panel number chip */}
              <div
                className="absolute top-3 right-3 w-7 h-7 border-2 border-black font-black text-xs flex items-center justify-center z-10"
                style={{ background: panel.accent }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Warhol rotate bar */}
        <div
          className="flex items-center justify-between px-6 py-3 border-t-4 border-black"
          style={{ background: BLACK }}
        >
          <div
            className="flex items-center gap-3"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <span className="font-black uppercase tracking-widest text-xs" style={{ color: YELLOW }}>
              WARHOL GRID &mdash; COLORWAY {warholSet + 1}/{WARHOL_SETS.length}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="pop-btn px-5 py-2 border-4 border-white font-black uppercase tracking-widest text-sm"
              style={{ background: YELLOW, color: BLACK, boxShadow: "4px 4px 0 #ff69b4" }}
              onClick={() => setWarholSet((p) => (p + 1) % WARHOL_SETS.length)}
            >
              ROTATE COLORS
            </button>
            <Link
              href="/styles/pop-art"
              className="pop-btn px-5 py-2 border-4 border-white font-black uppercase tracking-widest text-sm"
              style={{ background: PINK, color: BLACK, boxShadow: "4px 4px 0 #00bfff" }}
            >
              VIEW DOCS
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. COLOR PALETTE                                                */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 border-b-4 border-black" style={{ background: YELLOW }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="font-black uppercase text-xs tracking-[0.3em] block mb-3" style={{ color: BLACK, opacity: 0.5 }}>
              Color System
            </span>
            <h2 className="font-black uppercase leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              The Pop Art{" "}
              <span style={{ color: PINK, WebkitTextStroke: "2px #000" }}>Palette</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-bold text-lg max-w-lg leading-relaxed" style={{ opacity: 0.75 }}>
              Five colors only. Zero gradients, zero exceptions.
              Pure flat fills drawn from Warhol&apos;s silkscreen prints
              and Lichtenstein&apos;s comic panels.
            </p>
          </RevealBlock>

          {/* Swatch row */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-0" style={{ border: "4px solid #000" }}>
              {PALETTE.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    background: swatch.hex,
                    borderRight: i < 4 ? "4px solid #000" : "none",
                    minHeight: "180px",
                    transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out",
                    transform: hoveredSwatch === i ? "scale(1.04) rotate(-1deg)" : "scale(1)",
                    boxShadow: hoveredSwatch === i ? "8px 8px 0 #000" : "none",
                    zIndex: hoveredSwatch === i ? 10 : 1,
                    position: "relative",
                  }}
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <BenDayLayer
                    color={swatch.hex === WHITE ? BLACK : WHITE}
                    gridSize="10px"
                    dotSize="2px"
                    opacity={hoveredSwatch === i ? 0.2 : 0.07}
                  />
                  {/* Hover POW! stamp */}
                  {hoveredSwatch === i && (
                    <div className="absolute inset-0 flex items-center justify-center pop-stamp-anim z-20">
                      <span
                        className="font-black uppercase text-3xl"
                        style={{
                          color: swatch.textColor,
                          WebkitTextStroke: "2px rgba(0,0,0,0.25)",
                          textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                        }}
                      >
                        POW!
                      </span>
                    </div>
                  )}
                  {/* Label chip */}
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 border-2 border-black font-black uppercase text-[9px] tracking-widest z-10"
                    style={{
                      background: swatch.hex === BLACK ? YELLOW : BLACK,
                      color: swatch.hex === BLACK ? BLACK : WHITE,
                    }}
                  >
                    {swatch.label}
                  </div>
                  {/* Name at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 border-t-4 border-black px-3 py-2 z-10"
                    style={{ background: swatch.hex === BLACK ? YELLOW : BLACK }}
                  >
                    <div
                      className="font-black uppercase text-[10px] tracking-widest leading-tight"
                      style={{ color: swatch.hex === BLACK ? BLACK : WHITE }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className="font-mono text-[9px] mt-0.5"
                      style={{ color: swatch.hex === BLACK ? BLACK : YELLOW, opacity: 0.8 }}
                    >
                      {swatch.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Flat fill rule */}
          <RevealBlock delay={0.2}>
            <div
              className="border-4 border-black p-6"
              style={{ background: WHITE, boxShadow: "8px 8px 0 #000" }}
            >
              <p className="font-black uppercase text-sm tracking-widest mb-4">
                Color Rule: Flat Fills Only
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-4 border-black p-4" style={{ background: YELLOW }}>
                  <div className="font-black uppercase text-xs tracking-wider text-black mb-2 opacity-70">DO</div>
                  <div className="space-y-1">
                    {[`bg-[${YELLOW}]`, `bg-[${PINK}]`, `bg-white`].map((r) => (
                      <div key={r} className="font-mono text-xs font-bold">{r}</div>
                    ))}
                  </div>
                </div>
                <div className="border-4 border-black p-4" style={{ background: "#fce4e4" }}>
                  <div className="font-black uppercase text-xs tracking-wider text-red-700 mb-2">DON&apos;T</div>
                  <div className="space-y-1">
                    {["bg-gradient-to-r", "bg-gray-300", "opacity-50 fills"].map((r) => (
                      <div key={r} className="font-mono text-xs line-through text-gray-400">{r}</div>
                    ))}
                  </div>
                </div>
                <div className="border-4 border-black p-4" style={{ background: BLUE }}>
                  <div className="font-black uppercase text-xs tracking-wider text-white mb-3">RESULT</div>
                  <div className="flex gap-2">
                    {[YELLOW, PINK, BLUE, BLACK, WHITE].map((hex) => (
                      <div
                        key={hex}
                        className="w-8 h-8 border-2 border-black flex-shrink-0"
                        style={{ background: hex }}
                      />
                    ))}
                  </div>
                  <div className="font-black uppercase text-[10px] tracking-widest text-white mt-2">
                    5 colors. That&apos;s all.
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. COMPONENT GALLERY                                            */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 border-b-4 border-black" style={{ background: WHITE }}>
        {/* Section strip */}
        <div
          className="border-b-4 border-black mb-12 -mx-5 md:-mx-10 px-5 md:px-10 py-4"
          style={{ background: PINK }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="font-black uppercase text-2xl tracking-wider">Components</span>
            <span className="font-black uppercase text-sm tracking-widest opacity-60">Pop Art UI Kit</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab switcher */}
          <RevealBlock className="mb-8">
            <div className="flex gap-0 border-4 border-black inline-flex">
              {(["buttons", "cards", "inputs"] as ComponentTab[]).map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-3 font-black uppercase tracking-wider text-sm border-r-4 border-black last:border-r-0 transition-all duration-100 ease-out"
                  style={{
                    background: activeTab === tab ? BLACK : WHITE,
                    color: activeTab === tab ? YELLOW : BLACK,
                    boxShadow: activeTab === tab ? "inset 0 -4px 0 #ffdd00" : "none",
                  }}
                  aria-selected={activeTab === tab}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border-4 border-black p-8 md:p-12" style={{ boxShadow: "8px 8px 0 #000" }}>

              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <div className="border-b-4 border-black pb-2 mb-6">
                      <span className="font-black uppercase text-xs tracking-widest">Primary &mdash; Comic Pow!</span>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                      <button
                        className="pop-btn px-8 py-3 border-4 border-black font-black uppercase text-xl tracking-wider"
                        style={{ background: YELLOW, boxShadow: "6px 6px 0 #000" }}
                      >
                        POW!
                      </button>
                      <button
                        className="pop-btn px-8 py-3 border-4 border-black font-black uppercase text-xl tracking-wider"
                        style={{ background: PINK, boxShadow: "6px 6px 0 #000" }}
                      >
                        BANG!
                      </button>
                      <button
                        className="pop-btn px-8 py-3 border-4 border-black font-black uppercase text-xl tracking-wider"
                        style={{ background: BLUE, color: WHITE, boxShadow: "6px 6px 0 #000" }}
                      >
                        ZAP!
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="border-b-4 border-black pb-2 mb-6">
                      <span className="font-black uppercase text-xs tracking-widest">Variants</span>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                      <button
                        className="pop-btn px-8 py-3 border-4 border-black font-black uppercase text-base tracking-wider"
                        style={{ background: WHITE, boxShadow: "4px 4px 0 #000" }}
                      >
                        OUTLINED
                      </button>
                      <button
                        className="pop-btn px-8 py-3 border-4 border-black font-black uppercase text-base tracking-wider"
                        style={{ background: BLACK, color: YELLOW, boxShadow: "4px 4px 0 #ff69b4" }}
                      >
                        INVERTED
                      </button>
                      <button
                        className="pop-btn px-8 py-3 border-4 border-dashed border-black font-black uppercase text-base tracking-wider"
                        style={{ background: YELLOW, boxShadow: "4px 4px 0 #000" }}
                      >
                        DASHED
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="border-b-4 border-black pb-2 mb-6">
                      <span className="font-black uppercase text-xs tracking-widest">Size variants</span>
                    </div>
                    <div className="flex flex-wrap gap-6 items-end">
                      {[
                        { s: "SM", px: "px-4 py-2 text-sm", sh: "3px 3px 0 #000" },
                        { s: "MD", px: "px-6 py-3 text-base", sh: "4px 4px 0 #000" },
                        { s: "LG", px: "px-10 py-4 text-xl", sh: "6px 6px 0 #000" },
                        { s: "XL", px: "px-14 py-5 text-2xl", sh: "8px 8px 0 #000" },
                      ].map(({ s, px, sh }) => (
                        <button
                          key={s}
                          className={`pop-btn border-4 border-black font-black uppercase tracking-wider ${px}`}
                          style={{ background: YELLOW, boxShadow: sh }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { badge: "NEW!", badgeBg: BLUE, title: "WARHOL GRID", desc: "Repetition is the message. Four identical panels, four different colors.", bg: WHITE },
                    { badge: "HOT!", badgeBg: YELLOW, title: "LICHTENSTEIN DOT", desc: "Ben-Day dots create depth without gradients. Pure halftone texture.", bg: PINK },
                    { badge: "POW!", badgeBg: PINK, title: "COMIC PANEL", desc: "Think bold speech bubbles, action lines, and stark flat fills.", bg: WHITE },
                    { badge: "WOW!", badgeBg: BLUE, title: "SILKSCREEN", desc: "Offset registration, bold color fields, graphic icon shapes.", bg: YELLOW },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="pop-card border-4 border-black p-8 relative overflow-hidden cursor-pointer"
                      style={{ background: card.bg, boxShadow: "8px 8px 0 #000" }}
                    >
                      {/* Ben-Day base layer */}
                      <div
                        className="ben-day-base absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle, #000 2px, transparent 2px)`,
                          backgroundSize: "10px 10px",
                        }}
                      />
                      {/* Ben-Day red accent layer */}
                      <div
                        className="ben-day-red absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${RED} 2px, transparent 2px)`,
                          backgroundSize: "10px 10px",
                          backgroundPosition: "5px 5px",
                        }}
                      />
                      <div className="relative z-10">
                        <div
                          className="pop-card-badge inline-block border-2 border-black px-3 py-1 mb-4 font-black text-sm uppercase tracking-wider"
                          style={{ background: card.badgeBg, boxShadow: "3px 3px 0 #000" }}
                        >
                          {card.badge}
                        </div>
                        <h4 className="pop-card-title font-black uppercase text-2xl mb-3 tracking-wider">
                          {card.title}
                        </h4>
                        <p className="font-bold leading-relaxed text-gray-700">{card.desc}</p>
                        <div
                          className="mt-5 h-2 border-2 border-black"
                          style={{ background: card.badgeBg }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block font-black uppercase text-sm tracking-widest mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-4 border-black font-bold placeholder:text-gray-400 outline-none transition-all duration-100"
                        placeholder="TYPE HERE..."
                        style={{ background: WHITE, boxShadow: "4px 4px 0 #000" }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = PINK;
                          (e.target as HTMLInputElement).style.boxShadow = `4px 4px 0 ${PINK}`;
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = BLACK;
                          (e.target as HTMLInputElement).style.boxShadow = "4px 4px 0 #000";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block font-black uppercase text-sm tracking-widest mb-2">
                        Live Echo
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder="TYPE SOMETHING..."
                        className="w-full px-4 py-3 border-4 border-black font-bold placeholder:text-gray-400 outline-none transition-all duration-100"
                        style={{
                          background: inputFocused ? YELLOW : WHITE,
                          boxShadow: inputFocused ? `4px 4px 0 ${PINK}` : "4px 4px 0 #000",
                          borderColor: inputFocused ? PINK : BLACK,
                        }}
                      />
                      {inputValue && (
                        <div
                          className="mt-3 p-3 border-4 border-black font-black uppercase tracking-widest text-sm pop-stamp-anim"
                          style={{ background: YELLOW, boxShadow: "4px 4px 0 #000" }}
                        >
                          YOU TYPED: {inputValue}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block font-black uppercase text-sm tracking-widest mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border-4 border-black font-bold placeholder:text-gray-400 outline-none resize-none transition-all duration-100"
                        placeholder="MAKE IT LOUD..."
                        style={{ background: WHITE, boxShadow: "4px 4px 0 #000" }}
                        onFocus={(e) => {
                          (e.target as HTMLTextAreaElement).style.borderColor = BLUE;
                          (e.target as HTMLTextAreaElement).style.boxShadow = `4px 4px 0 ${BLUE}`;
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLTextAreaElement).style.borderColor = BLACK;
                          (e.target as HTMLTextAreaElement).style.boxShadow = "4px 4px 0 #000";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-black uppercase text-sm tracking-widest mb-2">
                        Select Artist
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-3 border-4 border-black font-bold appearance-none outline-none transition-all duration-100"
                          style={{ background: WHITE, boxShadow: "4px 4px 0 #000" }}
                        >
                          <option>WARHOL</option>
                          <option>LICHTENSTEIN</option>
                          <option>BASQUIAT</option>
                          <option>HARING</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-lg pointer-events-none">
                          &#9660;
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Thick borders (border-4 min)", checked: true, color: YELLOW },
                        { label: "Hard offset shadows only", checked: true, color: PINK },
                        { label: "Flat colors, zero gradients", checked: true, color: BLUE },
                        { label: "Soft rounded-full corners", checked: false, color: "#aaa" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 border-3 border-black flex items-center justify-center flex-shrink-0"
                            style={{ border: "3px solid #000", background: item.checked ? item.color : WHITE }}
                          >
                            {item.checked && (
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`font-bold text-sm ${item.checked ? "" : "line-through text-gray-400"}`}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      className="pop-btn w-full py-4 border-4 border-black font-black uppercase text-lg tracking-wider"
                      style={{ background: YELLOW, boxShadow: "6px 6px 0 #000" }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. AI RULES — 4 interactive demos                              */}
      {/* ============================================================== */}
      <section
        className="py-20 md:py-28 px-5 md:px-10 border-b-4 border-black relative overflow-hidden"
        style={{ background: YELLOW }}
      >
        {/* Background dots */}
        <BenDayLayer color={BLACK} gridSize="14px" dotSize="2px" opacity={0.07} />

        <div className="max-w-6xl mx-auto relative">
          <RevealBlock className="mb-4">
            <span className="font-black uppercase text-xs tracking-[0.3em] block mb-3 opacity-50">
              AI Rules — Live Demo
            </span>
            <h2 className="font-black uppercase leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              4 Named{" "}
              <span style={{ color: PINK, WebkitTextStroke: "2px #000" }}>Interaction Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-bold text-lg max-w-lg leading-relaxed opacity-75">
              Each rule is a live demo. Hover, click, and interact with each card
              to feel the rule in action &mdash; not just read about it.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---- Rule 1: Comic Pow! ---- */}
            <RevealBlock delay={0.1}>
              <div
                className="border-4 border-black p-8 h-full"
                style={{ background: WHITE, boxShadow: "8px 8px 0 #000" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-3 py-1 border-2 border-black font-black uppercase text-xs tracking-widest"
                    style={{ background: YELLOW }}
                  >
                    RULE 01
                  </div>
                  <span className="font-black uppercase text-lg tracking-wider">Comic Pow!</span>
                </div>
                <p className="font-bold text-sm mb-4 text-gray-700 leading-relaxed">
                  Exaggerated tilt + scale like a comic SFX panel bursting from the frame.
                  Never use hover:translate-y alone &mdash; all three (scale, rotate, translate) are required.
                </p>
                <div className="font-mono text-xs border-2 border-gray-200 p-3 mb-6 leading-relaxed" style={{ background: "#f5f5f5" }}>
                  hover:scale-110 hover:-rotate-3 hover:-translate-y-1<br />
                  transition-all duration-100 ease-out
                </div>
                {/* Live demo */}
                <div className="flex items-start gap-6">
                  <div
                    className="cursor-pointer select-none flex-shrink-0"
                    onMouseEnter={() => setPowHovered(true)}
                    onMouseLeave={() => setPowHovered(false)}
                    onClick={handlePowClick}
                  >
                    <SpeechBubble bg={YELLOW}>
                      <span
                        className="text-xl font-black transition-all duration-100 ease-out inline-block"
                        style={{
                          transform: powHovered
                            ? "scale(1.1) rotate(-3deg) translateY(-3px)"
                            : "scale(1)",
                          display: "inline-block",
                        }}
                      >
                        {powClicked ? "POW!" : powHovered ? "POW!" : "Hover me!"}
                      </span>
                    </SpeechBubble>
                  </div>
                  <div className="text-xs font-bold text-gray-500 mt-2 leading-relaxed">
                    {powHovered
                      ? "Scale(1.1) + rotate(-3deg) + translateY(-3px) applied simultaneously"
                      : "Hover to trigger the Comic Pow! effect"}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 2: Ben-Day Dynamics ---- */}
            <RevealBlock delay={0.15}>
              <div
                className="border-4 border-black p-8 h-full"
                style={{ background: WHITE, boxShadow: "8px 8px 0 #000" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-3 py-1 border-2 border-black font-black uppercase text-xs tracking-widest"
                    style={{ background: PINK }}
                  >
                    RULE 02
                  </div>
                  <span className="font-black uppercase text-lg tracking-wider">Ben-Day Dynamics</span>
                </div>
                <p className="font-bold text-sm mb-4 text-gray-700 leading-relaxed">
                  Two overlapping halftone layers simulate the Lichtenstein color-shift effect.
                  Base black layer deepens; offset red layer appears on hover.
                </p>
                <div className="font-mono text-xs border-2 border-gray-200 p-3 mb-6 leading-relaxed" style={{ background: "#f5f5f5" }}>
                  /* Base layer */ opacity-10 &#x2192; opacity-30<br />
                  /* Red accent */ opacity-0 &#x2192; opacity-20<br />
                  backgroundPosition: &apos;5px 5px&apos; (offset half-grid)
                </div>
                {/* Live demo */}
                <div
                  className="border-4 border-black p-6 relative overflow-hidden cursor-pointer transition-all duration-150"
                  style={{ background: WHITE, boxShadow: "6px 6px 0 #000" }}
                  onMouseEnter={() => setDotLayerHovered(true)}
                  onMouseLeave={() => setDotLayerHovered(false)}
                >
                  {/* Base layer */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      backgroundImage: `radial-gradient(circle, #000 2px, transparent 2px)`,
                      backgroundSize: "10px 10px",
                      opacity: dotLayerHovered ? 0.3 : 0.1,
                    }}
                  />
                  {/* Red offset accent layer */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${RED} 2px, transparent 2px)`,
                      backgroundSize: "10px 10px",
                      backgroundPosition: "5px 5px",
                      opacity: dotLayerHovered ? 0.2 : 0,
                    }}
                  />
                  <div className="relative z-10 text-center py-3">
                    <div className="font-black uppercase text-xl mb-1">
                      {dotLayerHovered ? "RED DOTS APPEAR!" : "HOVER TO ACTIVATE"}
                    </div>
                    <div className="font-bold text-xs text-gray-600">
                      {dotLayerHovered
                        ? "Layer 1: black opacity 0.1 &#x2192; 0.3 | Layer 2: red appears"
                        : "Watch dual Ben-Day layers shift"}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 3: Punchy Motion ---- */}
            <RevealBlock delay={0.2}>
              <div
                className="border-4 border-black p-8 h-full"
                style={{ background: WHITE, boxShadow: "8px 8px 0 #000" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-3 py-1 border-2 border-black font-black uppercase text-xs tracking-widest"
                    style={{ background: BLUE, color: WHITE }}
                  >
                    RULE 03
                  </div>
                  <span className="font-black uppercase text-lg tracking-wider">Punchy Motion</span>
                </div>
                <p className="font-bold text-sm mb-4 text-gray-700 leading-relaxed">
                  All transitions use duration-100 ease-out &mdash; rubber-stamp speed.
                  Never duration-200 or slower for hover/active states in Pop Art.
                </p>
                <div className="font-mono text-xs border-2 border-gray-200 p-3 mb-6 leading-relaxed" style={{ background: "#f5f5f5" }}>
                  transition-all duration-100 ease-out<br />
                  {/* Never: duration-200 duration-300 duration-500 */}
                </div>
                {/* Speed comparison */}
                <div className="space-y-5">
                  {/* Slow comparison */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black uppercase text-xs tracking-wider text-red-500">SLOW 300ms (wrong)</span>
                      <button
                        className="px-3 py-1 border-2 border-black font-bold text-xs uppercase"
                        style={{ background: "#fce4e4" }}
                        onClick={() => setPunchyActive((p) => !p)}
                      >
                        GO
                      </button>
                    </div>
                    <div className="relative h-12 border-4 border-black overflow-hidden" style={{ background: "#f5f5f5" }}>
                      <div
                        className="absolute top-1/2 left-2 w-8 h-8 border-4 border-black font-black uppercase flex items-center justify-center text-[9px]"
                        style={{
                          background: "#bbb",
                          transform: `translateY(-50%) translateX(${punchyActive ? "180px" : "0"})`,
                          transition: punchyActive ? "transform 0.3s linear" : "none",
                        }}
                      >
                        MEH
                      </div>
                    </div>
                  </div>
                  {/* Punchy comparison */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black uppercase text-xs tracking-wider" style={{ color: BLUE }}>
                        PUNCHY 100ms (correct)
                      </span>
                      <button
                        className="pop-btn px-3 py-1 border-2 border-black font-bold text-xs uppercase"
                        style={{ background: BLUE, color: WHITE, boxShadow: "2px 2px 0 #000" }}
                        onClick={handlePunchyFire}
                      >
                        GO
                      </button>
                    </div>
                    <div className="relative h-12 border-4 border-black overflow-hidden" style={{ background: `${BLUE}22` }}>
                      <div
                        className="absolute top-1/2 left-2 w-8 h-8 border-4 border-black font-black uppercase flex items-center justify-center text-[9px]"
                        style={{
                          background: YELLOW,
                          transform: `translateY(-50%) translateX(${punchyActive ? "180px" : "0"})`,
                          transition: punchyActive ? "transform 0.1s ease-out" : "none",
                        }}
                      >
                        POW
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 4: Active Snap ---- */}
            <RevealBlock delay={0.25}>
              <div
                className="border-4 border-black p-8 h-full"
                style={{ background: WHITE, boxShadow: "8px 8px 0 #000" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-3 py-1 border-2 border-black font-black uppercase text-xs tracking-widest"
                    style={{ background: YELLOW }}
                  >
                    RULE 04
                  </div>
                  <span className="font-black uppercase text-lg tracking-wider">Active Snap</span>
                </div>
                <p className="font-bold text-sm mb-4 text-gray-700 leading-relaxed">
                  Inward press pushes the element and shadow back toward zero,
                  creating a punchy tactile click feel like a rubber stamp.
                </p>
                <div className="font-mono text-xs border-2 border-gray-200 p-3 mb-6 leading-relaxed" style={{ background: "#f5f5f5" }}>
                  active:scale-95 active:rotate-2<br />
                  active:translate-x-[4px] active:translate-y-[4px]<br />
                  active:shadow-[2px_2px_0_#000]
                </div>
                <div className="flex flex-col items-center gap-6">
                  {/* Demo button with manual press tracking */}
                  <div
                    onMouseDown={() => setSnapPressed(true)}
                    onMouseUp={() => setSnapPressed(false)}
                    onMouseLeave={() => setSnapPressed(false)}
                    onTouchStart={() => setSnapPressed(true)}
                    onTouchEnd={() => setSnapPressed(false)}
                  >
                    <button
                      className="px-10 py-5 border-4 border-black font-black uppercase text-xl tracking-wider select-none"
                      style={{
                        background: YELLOW,
                        boxShadow: snapPressed ? "2px 2px 0 #000" : "8px 8px 0 #000",
                        transform: snapPressed
                          ? "scale(0.95) rotate(2deg) translate(4px, 4px)"
                          : "scale(1) rotate(0deg) translate(0, 0)",
                        transition: "all 0.1s ease-out",
                      }}
                    >
                      {snapPressed ? "SNAP!" : "PRESS ME"}
                    </button>
                  </div>
                  {/* Shadow indicator */}
                  <div className="border-4 border-black p-4 w-full" style={{ background: "#f5f5f5" }}>
                    <div className="font-black uppercase text-xs tracking-widest mb-2 opacity-60">
                      Shadow offset:
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-sm font-bold w-16">
                        {snapPressed ? "2px 2px" : "8px 8px"}
                      </div>
                      <div
                        className="h-3 border-2 border-black transition-all duration-100 ease-out"
                        style={{
                          background: BLUE,
                          width: snapPressed ? "20%" : "100%",
                        }}
                      />
                    </div>
                    <div className="font-bold text-xs opacity-50 mt-2">
                      {snapPressed
                        ? "Pressed — shadow collapses toward zero"
                        : "Rest state — full 8px offset shadow"}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. POP ART APP DEMO — SFX Showroom                            */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 border-b-4 border-black" style={{ background: PINK }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="font-black uppercase text-xs tracking-[0.3em] block mb-3 opacity-50">
              SFX Showroom
            </span>
            <h2 className="font-black uppercase leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Comic{" "}
              <span style={{ color: YELLOW, WebkitTextStroke: "2px #000" }}>Starbursts</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-bold text-lg max-w-lg leading-relaxed opacity-75">
              Action word labels are a core Pop Art interface element.
              Hover each starburst to trigger the Comic Pow! animation.
            </p>
          </RevealBlock>

          {/* Starburst SFX grid */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {SFX_WORDS.map((sfx, i) => (
                <div
                  key={sfx.word}
                  className="relative flex items-center justify-center cursor-pointer pop-btn pop-bounce-sfx"
                  style={{
                    aspectRatio: "1/1",
                    maxWidth: "200px",
                    margin: "0 auto",
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {/* Shadow starburst */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: BLACK,
                      clipPath:
                        "polygon(50% 0%,57% 30%,79% 9%,70% 36%,98% 35%,75% 52%,95% 73%,68% 65%,79% 91%,55% 75%,50% 100%,45% 75%,21% 91%,32% 65%,5% 73%,25% 52%,2% 35%,30% 36%,21% 9%,43% 30%)",
                      transform: "scale(1.08) translate(4px, 4px)",
                    }}
                  />
                  {/* Colored starburst */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: sfx.bg,
                      clipPath:
                        "polygon(50% 0%,57% 30%,79% 9%,70% 36%,98% 35%,75% 52%,95% 73%,68% 65%,79% 91%,55% 75%,50% 100%,45% 75%,21% 91%,32% 65%,5% 73%,25% 52%,2% 35%,30% 36%,21% 9%,43% 30%)",
                      border: "4px solid #000",
                    }}
                  />
                  <span
                    className="relative z-10 font-black uppercase text-center leading-none"
                    style={{
                      fontSize: sfx.word.length > 4 ? "1.4rem" : "2rem",
                      color: BLACK,
                      transform: `rotate(${sfx.rotate})`,
                      display: "block",
                    }}
                  >
                    {sfx.word}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Pill badges strip */}
          <RevealBlock delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { word: "KA-BOOM!", bg: YELLOW, rotate: "-2deg" },
                { word: "SPLAT!", bg: BLUE, rotate: "1deg" },
                { word: "CRUNCH!", bg: WHITE, rotate: "-1deg" },
                { word: "THWACK!", bg: BLACK, rotate: "2deg", text: YELLOW },
                { word: "KAPOW!", bg: YELLOW, rotate: "-3deg" },
              ].map((badge) => (
                <div
                  key={badge.word}
                  className="pop-btn px-6 py-3 border-4 border-black font-black uppercase text-xl tracking-wider cursor-pointer select-none"
                  style={{
                    background: badge.bg,
                    color: badge.text ?? BLACK,
                    transform: `rotate(${badge.rotate})`,
                    boxShadow: "6px 6px 0 #000",
                  }}
                >
                  {badge.word}
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. DO / DON'T DESIGN RULES                                     */}
      {/* ============================================================== */}
      <section
        className="py-20 md:py-28 px-5 md:px-10 border-b-4 border-black"
        style={{ background: BLACK }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="font-black uppercase text-xs tracking-[0.3em] block mb-3" style={{ color: YELLOW, opacity: 0.6 }}>
              Design Rules
            </span>
            <h2
              className="font-black uppercase leading-tight"
              style={{ color: WHITE, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              The Pop Art{" "}
              <span style={{ color: YELLOW }}>Commandments</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-bold text-lg max-w-lg leading-relaxed" style={{ color: "#ccc" }}>
              These are not suggestions. Pop Art has rules &mdash; strict, unyielding,
              Warhol-approved rules. Break them and you&apos;re building generic UI.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div
                className="border-4 border-black h-full"
                style={{ background: WHITE, boxShadow: "8px 8px 0 #ffdd00" }}
              >
                <div
                  className="px-5 py-3 border-b-4 border-black"
                  style={{ background: YELLOW }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 border-2 border-black flex items-center justify-center"
                      style={{ background: BLACK }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-black uppercase text-xl tracking-wider">DO THIS</h3>
                  </div>
                </div>
                <div className="divide-y-4 divide-black">
                  {DO_RULES.map((rule, i) => (
                    <div
                      key={i}
                      className="relative px-5 py-4 overflow-hidden"
                      style={{ background: i % 2 === 0 ? YELLOW : WHITE }}
                    >
                      <BenDayLayer color={BLACK} gridSize="8px" dotSize="1px" opacity={0.07} />
                      <div className="relative z-10 flex items-start gap-3">
                        <div
                          className="w-5 h-5 border-2 border-black font-black text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: BLACK, color: YELLOW }}
                        >
                          {i + 1}
                        </div>
                        <p className="font-bold text-sm text-black uppercase tracking-wide leading-snug">
                          {rule}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <div
                className="border-4 border-black h-full"
                style={{ background: WHITE, boxShadow: "8px 8px 0 #ff69b4" }}
              >
                <div
                  className="px-5 py-3 border-b-4 border-black"
                  style={{ background: PINK }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 border-2 border-black flex items-center justify-center"
                      style={{ background: BLACK }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="font-black uppercase text-xl tracking-wider">DON&apos;T</h3>
                  </div>
                </div>
                <div className="divide-y-4 divide-black">
                  {DONT_RULES.map((rule, i) => (
                    <div
                      key={i}
                      className="relative px-5 py-4 overflow-hidden"
                      style={{ background: WHITE }}
                    >
                      <BenDayLayer color={BLACK} gridSize="8px" dotSize="1.5px" opacity={0.06} />
                      <div className="relative z-10 flex items-start gap-3">
                        <div
                          className="w-5 h-5 border-2 border-black font-black text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: PINK, color: BLACK }}
                        >
                          X
                        </div>
                        <p className="font-bold text-sm text-gray-500 uppercase tracking-wide leading-snug line-through decoration-2 decoration-red-400">
                          {rule}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy block */}
          <RevealBlock delay={0.25}>
            <div
              className="border-4 border-black p-8 relative overflow-hidden"
              style={{ background: BLUE, boxShadow: "8px 8px 0 #00bfff88" }}
            >
              <BenDayLayer color={WHITE} gridSize="12px" dotSize="1.5px" opacity={0.1} />
              <div className="relative z-10">
                <div className="font-black uppercase text-xs tracking-[0.3em] text-white mb-3 opacity-70">
                  Philosophy
                </div>
                <h3 className="font-black uppercase text-2xl text-white mb-4">
                  The Core Idea
                </h3>
                <p className="font-bold text-white leading-relaxed max-w-3xl text-sm md:text-base">
                  Pop Art 风格来源于 20 世纪 60 年代的波普艺术运动，以 Andy Warhol 和 Roy Lichtenstein
                  为代表，通过大胆色块、粗黑轮廓和半色调网点创造视觉冲击。核心理念：粗黑轮廓强调形状，
                  高饱和色块纯色平涂填充，Ben-Day dots 是标志性纹理，漫画对话泡泡等元素融入界面。
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {["粗黑轮廓", "高饱和色块", "半色调网点", "漫画风格"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border-2 border-black font-black uppercase text-xs tracking-wider"
                      style={{ background: YELLOW, color: BLACK }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER                                                       */}
      {/* ============================================================== */}
      <footer className="border-t-4 border-black relative overflow-hidden" style={{ background: YELLOW }}>
        {/* Background dots */}
        <BenDayLayer color={BLACK} gridSize="14px" dotSize="2px" opacity={0.07} />

        {/* Color stripe top */}
        <div className="flex h-4 border-b-4 border-black">
          {[PINK, BLUE, BLACK, PINK, BLUE, BLACK, PINK, BLUE, BLACK, PINK, BLUE, BLACK].map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-14 pb-10 relative">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black"
                style={{ background: BLACK }}
              >
                <span className="font-black uppercase text-xl tracking-widest" style={{ color: YELLOW }}>
                  POP ART
                </span>
              </div>
              <p className="font-bold leading-relaxed text-black text-sm">
                Inspired by Andy Warhol and Roy Lichtenstein. Bold flat colors,
                thick outlines, Ben-Day halftone dots &mdash; comic-book energy
                for digital interfaces.
              </p>
              <div className="flex gap-2">
                {[YELLOW, PINK, BLUE, BLACK, WHITE].map((hex) => (
                  <div
                    key={hex}
                    className="pop-btn w-7 h-7 border-2 border-black"
                    style={{ background: hex, boxShadow: "2px 2px 0 #000" }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="font-black uppercase text-xs tracking-[0.2em] border-b-2 border-black pb-1">
                  Style
                </span>
                <Link href="/styles/pop-art" className="font-bold hover:underline decoration-4 transition-all duration-100">
                  Documentation
                </Link>
                <Link href="/styles/pop-art/showcase" className="font-bold hover:underline decoration-4 transition-all duration-100">
                  Showcase
                </Link>
                <Link href="/styles/pop-art/cover" className="font-bold hover:underline decoration-4 transition-all duration-100">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-black uppercase text-xs tracking-[0.2em] border-b-2 border-black pb-1">
                  StyleKit
                </span>
                <Link href="/" className="font-bold hover:underline decoration-4 transition-all duration-100">Home</Link>
                <Link href="/styles" className="font-bold hover:underline decoration-4 transition-all duration-100">All Styles</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-black uppercase text-xs tracking-[0.2em] border-b-2 border-black pb-1">
                  Palette
                </span>
                {PALETTE.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 font-bold text-xs">
                    <span
                      className="w-4 h-4 border-2 border-black inline-block flex-shrink-0"
                      style={{ background: s.hex }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 border-y-2 border-black mb-8" style={{ background: BLACK }} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span>Made for</span>
              <span
                className="px-2 py-0.5 border-2 border-black font-black uppercase text-xs tracking-wider"
                style={{ background: BLACK, color: YELLOW }}
              >
                STYLEKIT
              </span>
              <span>&#9733;</span>
              <span className="font-mono text-xs">Pop Art Style</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/styles/pop-art"
                className="pop-btn flex items-center gap-2 px-5 py-2.5 border-4 border-black font-black uppercase text-sm tracking-wider"
                style={{ background: WHITE, boxShadow: "4px 4px 0 #000" }}
              >
                <span>&#8592;</span>
                Style Page
              </Link>
              <Link
                href="/"
                className="pop-btn flex items-center gap-2 px-5 py-2.5 border-4 border-black font-black uppercase text-sm tracking-wider"
                style={{ background: BLACK, color: YELLOW, boxShadow: "4px 4px 0 #ff69b4" }}
              >
                StyleKit Home
                <span>&#8594;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Color stripe bottom */}
        <div className="flex h-4 border-t-4 border-black">
          {[BLACK, PINK, BLUE, BLACK, YELLOW, PINK, BLACK, BLUE, YELLOW, PINK, BLACK, BLUE].map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>
      </footer>
    </div>
  );
}
