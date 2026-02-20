"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                   */
/* ------------------------------------------------------------------ */

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      options
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const HERO_QUADRANT_SETS = [
  [
    { bg: "#ffdd00", textColor: "#000000", labelColor: "#ff69b4" },
    { bg: "#ff69b4", textColor: "#000000", labelColor: "#ffdd00" },
    { bg: "#00bfff", textColor: "#000000", labelColor: "#ffdd00" },
    { bg: "#ffffff", textColor: "#000000", labelColor: "#ff69b4" },
  ],
  [
    { bg: "#00bfff", textColor: "#000000", labelColor: "#ffdd00" },
    { bg: "#ffffff", textColor: "#000000", labelColor: "#ff69b4" },
    { bg: "#ffdd00", textColor: "#000000", labelColor: "#ff69b4" },
    { bg: "#ff69b4", textColor: "#000000", labelColor: "#00bfff" },
  ],
  [
    { bg: "#ff69b4", textColor: "#000000", labelColor: "#00bfff" },
    { bg: "#ffdd00", textColor: "#000000", labelColor: "#00bfff" },
    { bg: "#ffffff", textColor: "#000000", labelColor: "#ff69b4" },
    { bg: "#00bfff", textColor: "#000000", labelColor: "#ffdd00" },
  ],
  [
    { bg: "#ffffff", textColor: "#000000", labelColor: "#00bfff" },
    { bg: "#00bfff", textColor: "#000000", labelColor: "#ff69b4" },
    { bg: "#ff69b4", textColor: "#000000", labelColor: "#ffdd00" },
    { bg: "#ffdd00", textColor: "#000000", labelColor: "#000000" },
  ],
];

const WARHOL_COLOR_SETS = [
  [
    { bg: "#ffdd00", accent: "#ff69b4" },
    { bg: "#ff69b4", accent: "#00bfff" },
    { bg: "#00bfff", accent: "#ffdd00" },
    { bg: "#32cd32", accent: "#ff69b4" },
  ],
  [
    { bg: "#ff69b4", accent: "#ffdd00" },
    { bg: "#32cd32", accent: "#00bfff" },
    { bg: "#ffdd00", accent: "#000000" },
    { bg: "#00bfff", accent: "#ff69b4" },
  ],
  [
    { bg: "#00bfff", accent: "#ffdd00" },
    { bg: "#ffdd00", accent: "#ff69b4" },
    { bg: "#ff69b4", accent: "#32cd32" },
    { bg: "#32cd32", accent: "#ffdd00" },
  ],
];

const DOT_DENSITIES = [
  { label: "FINE", size: "4px", name: "4px grid", dot: "1px" },
  { label: "MEDIUM", size: "6px", name: "6px grid", dot: "1.5px" },
  { label: "COARSE", size: "10px", name: "10px grid", dot: "2.5px" },
];

const SWATCHES = [
  { name: "WARHOL YELLOW", value: "#ffdd00", textColor: "#000000" },
  { name: "HOT PINK", value: "#ff69b4", textColor: "#000000" },
  { name: "ELECTRIC BLUE", value: "#00bfff", textColor: "#000000" },
  { name: "BOLD BLACK", value: "#000000", textColor: "#ffdd00" },
  { name: "POP WHITE", value: "#ffffff", textColor: "#000000" },
];

const SFX_WORDS = [
  { word: "POW!", bg: "#ffdd00", rotate: "-4deg" },
  { word: "BANG!", bg: "#ff69b4", rotate: "3deg" },
  { word: "ZAP!", bg: "#00bfff", rotate: "-2deg" },
  { word: "WHAM!", bg: "#32cd32", rotate: "5deg" },
];

const DO_RULES = [
  "Use thick black borders: border-4 or border-[5px] border-black",
  "Apply hard offset shadows: shadow-[6px_6px_0_#000]",
  "Use Ben-Day dots: radial-gradient halftone patterns",
  "Add comic speech bubbles and SFX starbursts",
  "Repeat motifs in 4 saturated Warhol colorways",
  "Bold uppercase font-black tracking-widest typography",
];

const DONT_RULES = [
  "Never use soft blurred shadows (box-shadow blur)",
  "Never use gradients or subtle color transitions",
  "Never use thin borders (border or border-2 only)",
  "Never use serif or script typefaces",
  "Never use muted, desaturated, or pastel tones",
  "Never use rounded corners without thick black border",
];

const COMIC_TAB_LABELS = ["BUTTON", "CARD", "INPUT"];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function BenDayOverlay({
  dotSize,
  gridSize,
  opacity = 0.2,
}: {
  dotSize: string;
  gridSize: string;
  opacity?: number;
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, #000 ${dotSize}, transparent ${dotSize})`,
        backgroundSize: `${gridSize} ${gridSize}`,
        opacity,
      }}
    />
  );
}

function SpeechBubble({
  children,
  bg = "#ffffff",
  direction = "left",
}: {
  children: React.ReactNode;
  bg?: string;
  direction?: "left" | "right";
}) {
  return (
    <div className="relative inline-block">
      <div
        className="px-5 py-3 border-4 border-black font-bold uppercase tracking-wide text-black"
        style={{
          background: bg,
          boxShadow: "4px 4px 0 #000",
          borderRadius: "12px",
        }}
      >
        {children}
      </div>
      <div
        className="absolute"
        style={{
          bottom: "-18px",
          [direction === "left" ? "left" : "right"]: "20px",
          width: 0,
          height: 0,
          borderLeft: direction === "left" ? "10px solid transparent" : "10px solid #000",
          borderRight: direction === "right" ? "10px solid transparent" : "10px solid #000",
          borderTop: "18px solid #000",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-13px",
          [direction === "left" ? "left" : "right"]: direction === "left" ? "22px" : "22px",
          width: 0,
          height: 0,
          borderLeft: direction === "left" ? "7px solid transparent" : `7px solid ${bg}`,
          borderRight: direction === "right" ? "7px solid transparent" : `7px solid ${bg}`,
          borderTop: `14px solid ${bg}`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Nav                                                        */
/* ------------------------------------------------------------------ */

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black" style={{ boxShadow: "0 4px 0 #000" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/styles/pop-art" className="flex items-center gap-3">
          <div
            className="w-8 h-8 border-4 border-black flex items-center justify-center font-black text-xs"
            style={{ background: "#ffdd00", boxShadow: "3px 3px 0 #000" }}
          >
            PA
          </div>
          <span className="font-black uppercase tracking-widest text-black text-lg">POP ART</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {["Gallery", "Colors", "Components", "SFX", "Rules"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-3 py-1 font-black uppercase tracking-wider text-sm text-black border-2 border-transparent"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#ffdd00";
                el.style.boxShadow = "3px 3px 0 #000";
                el.style.border = "2px solid #000";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.boxShadow = "none";
                el.style.border = "2px solid transparent";
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Hero (Warhol 4-Quadrant)                                  */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const [colorSet, setColorSet] = useState(0);
  const quadrants = HERO_QUADRANT_SETS[colorSet];

  return (
    <section className="relative border-b-4 border-black">
      <div className="grid grid-cols-2" style={{ minHeight: "520px" }}>
        {quadrants.map((q, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center justify-center p-8 overflow-hidden"
            style={{
              background: q.bg,
              minHeight: "260px",
              borderRight: i % 2 === 0 ? "4px solid #000" : "none",
              borderBottom: i < 2 ? "4px solid #000" : "none",
            }}
          >
            <BenDayOverlay dotSize="1.5px" gridSize="6px" />
            <p
              className="font-black uppercase tracking-widest text-xs mb-3 z-10"
              style={{ color: q.labelColor }}
            >
              ANDY WARHOL STYLE
            </p>
            <h1
              className="font-black uppercase text-5xl md:text-6xl leading-none z-10 text-center"
              style={{
                color: q.textColor,
                textShadow: `4px 4px 0 ${q.labelColor}`,
                letterSpacing: "-0.02em",
              }}
            >
              POP
              <br />
              ART
            </h1>
            <p
              className="font-bold uppercase text-xs mt-3 tracking-widest z-10"
              style={{ color: q.textColor, opacity: 0.7 }}
            >
              1962 — PRESENT
            </p>
            <div
              className="absolute top-3 right-3 w-6 h-6 border-2 border-black font-black text-xs flex items-center justify-center z-10"
              style={{ background: q.labelColor }}
            >
              {i + 1}
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-between px-6 py-4 border-t-4 border-black"
        style={{ background: "#000" }}
      >
        <span className="font-black uppercase tracking-widest text-xs text-white">
          WARHOL GRID — COLORWAY {colorSet + 1}/{HERO_QUADRANT_SETS.length}
        </span>
        <button
          onClick={() => setColorSet((prev) => (prev + 1) % HERO_QUADRANT_SETS.length)}
          className="px-5 py-2 font-black uppercase tracking-widest text-sm text-black border-4 border-white active:translate-x-1 active:translate-y-1"
          style={{ background: "#ffdd00", boxShadow: "4px 4px 0 #ff69b4" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#ff69b4")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#ffdd00")}
        >
          ROTATE COLORS
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Warhol Gallery                                             */
/* ------------------------------------------------------------------ */

function WarholGallery() {
  const [colorSet, setColorSet] = useState(0);
  const colors = WARHOL_COLOR_SETS[colorSet];

  return (
    <section id="gallery" className="py-20 border-b-4 border-black" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto px-6">
        <RevealBlock delay={0}>
          <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="font-black uppercase tracking-widest text-xs text-black opacity-50 mb-1">SECTION 02</p>
              <h2 className="font-black uppercase text-4xl text-black" style={{ letterSpacing: "-0.02em" }}>
                WARHOL GALLERY
              </h2>
              <p className="font-bold text-sm text-black opacity-60 mt-1 uppercase tracking-wide">
                Same motif — four saturated colorways
              </p>
            </div>
            <button
              onClick={() => setColorSet((prev) => (prev + 1) % WARHOL_COLOR_SETS.length)}
              className="px-5 py-2 font-black uppercase tracking-widest text-sm text-black border-4 border-black active:translate-x-1 active:translate-y-1"
              style={{ background: "#ffdd00", boxShadow: "5px 5px 0 #000" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#ff69b4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#ffdd00")}
            >
              ROTATE COLORS
            </button>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-2 gap-0" style={{ border: "4px solid #000" }}>
          {colors.map((color, i) => (
            <RevealBlock key={i} delay={i * 0.08}>
              <div
                className="relative flex flex-col items-start justify-between p-6 overflow-hidden"
                style={{
                  background: color.bg,
                  borderRight: i % 2 === 0 ? "4px solid #000" : "none",
                  borderBottom: i < 2 ? "4px solid #000" : "none",
                  minHeight: "260px",
                }}
              >
                <BenDayOverlay dotSize="1.5px" gridSize="6px" />
                <div
                  className="absolute top-4 right-4 w-12 h-12 border-4 border-black rounded-full flex items-center justify-center font-black text-xs z-10"
                  style={{ background: color.accent, boxShadow: "3px 3px 0 #000" }}
                >
                  #{i + 1}
                </div>
                <div className="z-10">
                  <div
                    className="w-16 h-16 border-4 border-black mb-4"
                    style={{ background: color.accent, boxShadow: "4px 4px 0 #000" }}
                  />
                  <h3 className="font-black uppercase text-2xl text-black leading-none tracking-tight">
                    PRODUCT
                    <br />
                    NO.{String(i + 1).padStart(2, "0")}
                  </h3>
                </div>
                <div className="z-10 w-full">
                  <div
                    className="w-full py-2 px-4 border-4 border-black font-black uppercase tracking-widest text-sm text-black text-center"
                    style={{ background: color.accent, boxShadow: "4px 4px 0 #000" }}
                  >
                    ADD TO CART
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Ben-Day Palette                                            */
/* ------------------------------------------------------------------ */

function BenDayPaletteSection() {
  const [activeDensity, setActiveDensity] = useState(1);
  const density = DOT_DENSITIES[activeDensity];

  return (
    <section id="colors" className="py-20 border-b-4 border-black" style={{ background: "#ffdd00" }}>
      <div className="max-w-6xl mx-auto px-6">
        <RevealBlock delay={0}>
          <p className="font-black uppercase tracking-widest text-xs text-black opacity-50 mb-1">SECTION 03</p>
          <h2 className="font-black uppercase text-4xl text-black mb-2" style={{ letterSpacing: "-0.02em" }}>
            BEN-DAY PALETTE
          </h2>
          <p className="font-bold text-sm text-black opacity-70 mb-8 uppercase tracking-wide">
            Halftone dot overlays across pop colorways
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="flex gap-0 mb-10" style={{ border: "4px solid #000" }}>
            {DOT_DENSITIES.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setActiveDensity(i)}
                className="flex-1 py-3 font-black uppercase tracking-widest text-sm border-r-4 border-black last:border-r-0"
                style={{
                  background: activeDensity === i ? "#000" : "transparent",
                  color: activeDensity === i ? "#ffdd00" : "#000",
                }}
              >
                {d.label}
                <span className="block text-xs font-bold opacity-70 mt-0.5">{d.name}</span>
              </button>
            ))}
          </div>
        </RevealBlock>

        <div className="grid grid-cols-5 gap-0" style={{ border: "4px solid #000" }}>
          {SWATCHES.map((swatch, i) => (
            <RevealBlock key={swatch.name} delay={i * 0.06}>
              <div
                className="relative flex flex-col justify-end p-4 overflow-hidden"
                style={{
                  background: swatch.value,
                  borderRight: i < 4 ? "4px solid #000" : "none",
                  minHeight: "200px",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, #000 ${density.dot}, transparent ${density.dot})`,
                    backgroundSize: `${density.size} ${density.size}`,
                    opacity: 0.2,
                  }}
                />
                <div className="relative z-10">
                  <p className="font-black uppercase text-xs tracking-widest leading-tight" style={{ color: swatch.textColor }}>
                    {swatch.name}
                  </p>
                  <p className="font-bold text-xs mt-1 opacity-70" style={{ color: swatch.textColor }}>
                    {swatch.value.toUpperCase()}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={0.3}>
          <div
            className="mt-8 p-5 border-4 border-black"
            style={{ background: "#fff", boxShadow: "6px 6px 0 #000" }}
          >
            <p className="font-black uppercase tracking-widest text-sm text-black mb-1">DOT PATTERN RECIPE</p>
            <code className="font-mono text-xs text-black opacity-80">
              {`radial-gradient(circle, #000 ${density.dot}, transparent ${density.dot}) — bg-size: ${density.size} ${density.size}`}
            </code>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Comic Component Lab                                        */
/* ------------------------------------------------------------------ */

function ComicComponentLab() {
  const [activeTab, setActiveTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <section id="components" className="py-20 border-b-4 border-black" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto px-6">
        <RevealBlock delay={0}>
          <p className="font-black uppercase tracking-widest text-xs text-black opacity-50 mb-1">SECTION 04</p>
          <h2 className="font-black uppercase text-4xl text-black mb-2" style={{ letterSpacing: "-0.02em" }}>
            COMIC COMPONENT LAB
          </h2>
          <p className="font-bold text-sm text-black opacity-60 mb-8 uppercase tracking-wide">
            Interface elements in full pop art treatment
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="flex gap-0 mb-10" style={{ borderBottom: "4px solid #000" }}>
            {COMIC_TAB_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className="px-8 py-3 font-black uppercase tracking-widest text-sm border-4 border-black border-b-0 mr-1"
                style={{
                  background: activeTab === i ? "#ff69b4" : "#fff",
                  color: "#000",
                  boxShadow: activeTab === i ? "none" : "4px 0 0 #000",
                  transform: activeTab === i ? "translateY(4px)" : "translateY(0)",
                  position: "relative",
                  zIndex: activeTab === i ? 2 : 1,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </RevealBlock>

        {activeTab === 0 && (
          <RevealBlock delay={0.15}>
            <div className="space-y-6">
              <SpeechBubble bg="#ffdd00">CLICK ME! These buttons pack a punch.</SpeechBubble>
              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { label: "CLICK ME!", bg: "#ffdd00", shadow: "#ff69b4" },
                  { label: "POW! GO!", bg: "#ff69b4", shadow: "#00bfff" },
                  { label: "ZAP IT!", bg: "#00bfff", shadow: "#ffdd00" },
                  { label: "WHAM!", bg: "#32cd32", shadow: "#000" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="px-6 py-3 font-black uppercase tracking-widest text-sm text-black border-4 border-black active:translate-x-1 active:translate-y-1"
                    style={{ background: btn.bg, boxShadow: `5px 5px 0 ${btn.shadow}` }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translate(-2px, -2px)";
                      el.style.boxShadow = `7px 7px 0 ${btn.shadow}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translate(0, 0)";
                      el.style.boxShadow = `5px 5px 0 ${btn.shadow}`;
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {[
                  { label: "OUTLINED", bg: "transparent", border: "#000", text: "#000" },
                  { label: "INVERTED", bg: "#000", border: "#000", text: "#ffdd00" },
                  { label: "GHOST", bg: "transparent", border: "#ff69b4", text: "#ff69b4" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="px-6 py-3 font-black uppercase tracking-widest text-sm border-4"
                    style={{
                      background: btn.bg,
                      borderColor: btn.border,
                      color: btn.text,
                      boxShadow: `4px 4px 0 ${btn.border}`,
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>
        )}

        {activeTab === 1 && (
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { bg: "#ffdd00", accent: "#ff69b4", label: "FEATURED" },
                { bg: "#ff69b4", accent: "#00bfff", label: "NEW" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="relative border-4 border-black overflow-hidden"
                  style={{ background: card.bg, boxShadow: "8px 8px 0 #000" }}
                >
                  <BenDayOverlay dotSize="1.5px" gridSize="6px" />
                  <div
                    className="absolute top-4 right-4 w-16 h-16 z-20 flex items-center justify-center"
                    style={{
                      background: card.accent,
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }}
                  >
                    <span className="font-black text-xs text-black uppercase">WOW!</span>
                  </div>
                  <div className="relative z-10 p-6">
                    <span
                      className="inline-block px-3 py-1 font-black text-xs uppercase tracking-widest border-2 border-black mb-4"
                      style={{ background: card.accent }}
                    >
                      {card.label}
                    </span>
                    <h3 className="font-black uppercase text-2xl text-black leading-tight tracking-tight mb-2">
                      POP ART
                      <br />
                      COLLECTION
                    </h3>
                    <p className="font-bold text-sm text-black opacity-70 mb-4 uppercase tracking-wide">
                      Bold. Graphic. Unmissable.
                    </p>
                    <button
                      className="px-5 py-2 border-4 border-black font-black uppercase tracking-widest text-sm text-black"
                      style={{ background: card.accent, boxShadow: "4px 4px 0 #000" }}
                    >
                      EXPLORE NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}

        {activeTab === 2 && (
          <RevealBlock delay={0.15}>
            <div className="max-w-lg space-y-6">
              <SpeechBubble bg="#00bfff" direction="right">
                TYPE HERE... We want to hear you loud and clear!
              </SpeechBubble>
              <div className="mt-8">
                <label className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                  YOUR MESSAGE
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="TYPE HERE..."
                  className="w-full px-4 py-3 border-4 border-black font-bold uppercase tracking-wider text-black text-sm outline-none"
                  style={{
                    background: inputFocused ? "#ffdd00" : "#fff",
                    boxShadow: inputFocused ? "6px 6px 0 #ff69b4" : "4px 4px 0 #000",
                  }}
                />
                {inputValue && (
                  <div
                    className="mt-3 p-3 border-4 border-black font-bold uppercase tracking-wide text-sm text-black"
                    style={{ background: "#ffdd00", boxShadow: "4px 4px 0 #000" }}
                  >
                    YOU TYPED: {inputValue}
                  </div>
                )}
              </div>
              <div>
                <label className="block font-black uppercase tracking-widest text-xs text-black mb-2">
                  SELECT ARTIST
                </label>
                <select
                  className="w-full px-4 py-3 border-4 border-black font-bold uppercase tracking-wider text-black text-sm outline-none"
                  style={{ background: "#fff", boxShadow: "4px 4px 0 #000" }}
                >
                  <option>WARHOL</option>
                  <option>LICHTENSTEIN</option>
                  <option>BASQUIAT</option>
                  <option>HARING</option>
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-5 h-5 border-4 border-black flex items-center justify-center"
                    style={{ background: "#ff69b4" }}
                  >
                    <div className="w-2 h-2 bg-black" />
                  </div>
                  <span className="font-black uppercase text-xs tracking-widest text-black">BOLD</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-5 h-5 border-4 border-black" style={{ background: "#fff" }} />
                  <span className="font-black uppercase text-xs tracking-widest text-black">SUBTLE</span>
                </label>
              </div>
            </div>
          </RevealBlock>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: SFX Showroom                                               */
/* ------------------------------------------------------------------ */

function SFXShowroom() {
  return (
    <section id="sfx" className="py-20 border-b-4 border-black" style={{ background: "#ff69b4" }}>
      <div className="max-w-6xl mx-auto px-6">
        <RevealBlock delay={0}>
          <p className="font-black uppercase tracking-widest text-xs text-black opacity-50 mb-1">SECTION 05</p>
          <h2 className="font-black uppercase text-4xl text-black mb-2" style={{ letterSpacing: "-0.02em" }}>
            SFX SHOWROOM
          </h2>
          <p className="font-bold text-sm text-black opacity-70 mb-12 uppercase tracking-wide">
            Comic sound effect starbursts — hover to activate
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {SFX_WORDS.map((sfx, i) => (
            <RevealBlock key={sfx.word} delay={i * 0.1}>
              <div
                className="relative flex items-center justify-center cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform duration-100"
                style={{ aspectRatio: "1 / 1", maxWidth: "200px", margin: "0 auto" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "#000",
                    clipPath:
                      "polygon(50% 0%, 57% 30%, 79% 9%, 70% 36%, 98% 35%, 75% 52%, 95% 73%, 68% 65%, 79% 91%, 55% 75%, 50% 100%, 45% 75%, 21% 91%, 32% 65%, 5% 73%, 25% 52%, 2% 35%, 30% 36%, 21% 9%, 43% 30%)",
                    transform: "scale(1.08)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: sfx.bg,
                    clipPath:
                      "polygon(50% 0%, 57% 30%, 79% 9%, 70% 36%, 98% 35%, 75% 52%, 95% 73%, 68% 65%, 79% 91%, 55% 75%, 50% 100%, 45% 75%, 21% 91%, 32% 65%, 5% 73%, 25% 52%, 2% 35%, 30% 36%, 21% 9%, 43% 30%)",
                  }}
                />
                <span
                  className="relative z-10 font-black uppercase text-center leading-none"
                  style={{
                    fontSize: sfx.word.length > 4 ? "1.5rem" : "2rem",
                    color: "#000",
                    transform: `rotate(${sfx.rotate})`,
                    display: "block",
                  }}
                >
                  {sfx.word}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={0.4}>
          <div className="mt-16 flex flex-wrap gap-4 items-center justify-center">
            {[
              { word: "KA-BOOM!", bg: "#ffdd00", size: "text-3xl", px: "px-6 py-3" },
              { word: "SPLAT!", bg: "#00bfff", size: "text-2xl", px: "px-5 py-2" },
              { word: "CRUNCH!", bg: "#32cd32", size: "text-xl", px: "px-4 py-2" },
              { word: "THWACK!", bg: "#ffffff", size: "text-lg", px: "px-4 py-1" },
            ].map((sfx) => (
              <div
                key={sfx.word}
                className={`${sfx.px} border-4 border-black font-black uppercase tracking-widest ${sfx.size} text-black cursor-default`}
                style={{
                  background: sfx.bg,
                  boxShadow: "5px 5px 0 #000",
                  transform: "rotate(-1deg)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "rotate(2deg) scale(1.05)";
                  el.style.boxShadow = "7px 7px 0 #000";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "rotate(-1deg) scale(1)";
                  el.style.boxShadow = "5px 5px 0 #000";
                }}
              >
                {sfx.word}
              </div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: The Rules of Pop                                           */
/* ------------------------------------------------------------------ */

function RulesSection() {
  return (
    <section id="rules" className="py-20 border-b-4 border-black" style={{ background: "#00bfff" }}>
      <div className="max-w-6xl mx-auto px-6">
        <RevealBlock delay={0}>
          <p className="font-black uppercase tracking-widest text-xs text-black opacity-50 mb-1">SECTION 06</p>
          <h2 className="font-black uppercase text-4xl text-black mb-2" style={{ letterSpacing: "-0.02em" }}>
            THE RULES OF POP
          </h2>
          <p className="font-bold text-sm text-black opacity-70 mb-10 uppercase tracking-wide">
            Comic panel format — what to do and what to avoid
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealBlock delay={0.1}>
            <div className="border-4 border-black" style={{ background: "#fff", boxShadow: "8px 8px 0 #000" }}>
              <div
                className="px-5 py-3 border-b-4 border-black font-black uppercase tracking-widest text-lg text-black"
                style={{ background: "#ffdd00" }}
              >
                DO: FOLLOW THE CODE
              </div>
              <div className="divide-y-4 divide-black">
                {DO_RULES.map((rule, i) => (
                  <div
                    key={i}
                    className="relative px-5 py-4 overflow-hidden"
                    style={{ background: "#ffdd00" }}
                  >
                    <BenDayOverlay dotSize="1px" gridSize="5px" />
                    <div className="relative z-10 flex items-start gap-3">
                      <div
                        className="w-6 h-6 border-2 border-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "#000", color: "#ffdd00" }}
                      >
                        {i + 1}
                      </div>
                      <p className="font-bold text-sm text-black uppercase tracking-wide leading-snug">{rule}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="border-4 border-black" style={{ background: "#fff", boxShadow: "8px 8px 0 #000" }}>
              <div
                className="px-5 py-3 border-b-4 border-black font-black uppercase tracking-widest text-lg text-black"
                style={{ background: "#ff69b4" }}
              >
                {"DON'T: BREAK THE STYLE"}
              </div>
              <div className="divide-y-4 divide-black">
                {DONT_RULES.map((rule, i) => (
                  <div
                    key={i}
                    className="relative px-5 py-4 overflow-hidden"
                    style={{ background: "#fff" }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
                        backgroundSize: "6px 6px",
                        opacity: 0.08,
                      }}
                    />
                    <div className="relative z-10 flex items-start gap-3">
                      <div
                        className="w-6 h-6 border-2 border-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "#ff69b4", color: "#000" }}
                      >
                        X
                      </div>
                      <p className="font-bold text-sm text-black uppercase tracking-wide leading-snug line-through opacity-60">
                        {rule}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock delay={0.3}>
          <div className="mt-12 flex justify-center">
            <div className="relative inline-block">
              <div
                className="px-8 py-5 border-4 border-black font-black uppercase tracking-widest text-lg text-black text-center"
                style={{
                  background: "#ffdd00",
                  boxShadow: "6px 6px 0 #000",
                  borderRadius: "16px",
                }}
              >
                THICK BORDERS. FLAT COLORS. BOLD TYPE.
                <br />
                <span className="text-sm font-bold opacity-70">THE HOLY TRINITY OF POP ART</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-22px",
                  left: "40px",
                  width: 0,
                  height: 0,
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid #000",
                  borderTop: "22px solid #000",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-16px",
                  left: "43px",
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid #ffdd00",
                  borderTop: "16px solid #ffdd00",
                }}
              />
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Typography System                                          */
/* ------------------------------------------------------------------ */

function TypographySection() {
  return (
    <section className="py-20 border-b-4 border-black" style={{ background: "#000" }}>
      <div className="max-w-6xl mx-auto px-6">
        <RevealBlock delay={0}>
          <p
            className="font-black uppercase tracking-widest text-xs opacity-50 mb-1"
            style={{ color: "#ffdd00" }}
          >
            SECTION 07
          </p>
          <h2
            className="font-black uppercase text-4xl mb-2"
            style={{ color: "#ffdd00", letterSpacing: "-0.02em" }}
          >
            TYPE SYSTEM
          </h2>
          <p className="font-bold text-sm opacity-60 mb-10 uppercase tracking-wide" style={{ color: "#ffdd00" }}>
            Bold, uppercase, zero compromise
          </p>
        </RevealBlock>

        <div className="space-y-0" style={{ border: "4px solid #ffdd00" }}>
          {[
            { label: "DISPLAY", size: "text-6xl", text: "POP ART", bg: "#ffdd00", color: "#000", tracking: "tracking-tight" },
            { label: "HEADING", size: "text-4xl", text: "WARHOL STYLE", bg: "#ff69b4", color: "#000", tracking: "tracking-tight" },
            { label: "SUBHEAD", size: "text-2xl", text: "LICHTENSTEIN DOTS", bg: "#00bfff", color: "#000", tracking: "tracking-wide" },
            { label: "LABEL", size: "text-base", text: "COMIC PANEL TEXT — UPPERCASE ALWAYS", bg: "#32cd32", color: "#000", tracking: "tracking-widest" },
            { label: "CAPTION", size: "text-xs", text: "FINE PRINT IN BOLD — NEVER USE LIGHT WEIGHT IN POP ART", bg: "#fff", color: "#000", tracking: "tracking-widest" },
          ].map((row, i) => (
            <RevealBlock key={row.label} delay={i * 0.07}>
              <div
                className="relative flex items-center gap-4 px-5 py-4 overflow-hidden"
                style={{
                  background: row.bg,
                  borderBottom: i < 4 ? "4px solid #ffdd00" : "none",
                }}
              >
                <BenDayOverlay dotSize="1.5px" gridSize="6px" />
                <span
                  className="font-black uppercase text-xs tracking-widest z-10 flex-shrink-0 w-20 opacity-50"
                  style={{ color: row.color }}
                >
                  {row.label}
                </span>
                <span
                  className={`font-black uppercase ${row.size} ${row.tracking} leading-none z-10`}
                  style={{ color: row.color }}
                >
                  {row.text}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Footer                                                     */
/* ------------------------------------------------------------------ */

function FooterSection() {
  return (
    <footer className="border-t-4 border-black" style={{ background: "#ffdd00" }}>
      <div className="flex h-3">
        <div className="flex-1" style={{ background: "#ff69b4" }} />
        <div className="flex-1" style={{ background: "#00bfff" }} />
        <div className="flex-1" style={{ background: "#000" }} />
        <div className="flex-1" style={{ background: "#ff69b4" }} />
        <div className="flex-1" style={{ background: "#00bfff" }} />
        <div className="flex-1" style={{ background: "#000" }} />
        <div className="flex-1" style={{ background: "#ff69b4" }} />
        <div className="flex-1" style={{ background: "#00bfff" }} />
      </div>
      <div className="border-t-4 border-black" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2
              className="font-black uppercase text-5xl text-black leading-none"
              style={{ letterSpacing: "-0.03em" }}
            >
              POP ART
            </h2>
            <p className="font-bold uppercase tracking-widest text-xs text-black opacity-50 mt-2">
              ANDY WARHOL — ROY LICHTENSTEIN — 1962
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="px-6 py-3 border-4 border-black font-black uppercase tracking-widest text-sm text-black"
              style={{ background: "#ff69b4", boxShadow: "5px 5px 0 #000" }}
            >
              BOLD. FLAT. GRAPHIC.
            </div>
            <div
              className="px-6 py-3 border-4 border-black font-black uppercase tracking-widest text-sm text-black"
              style={{ background: "#00bfff", boxShadow: "5px 5px 0 #000" }}
            >
              POW! BANG! ZAP!
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-4 border-black flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-black uppercase tracking-widest text-xs text-black opacity-50">
            STYLEKIT — POP ART STYLE — {new Date().getFullYear()}
          </p>
          <div className="flex gap-0" style={{ border: "4px solid #000" }}>
            {["Gallery", "Colors", "Components", "SFX", "Rules"].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 font-black uppercase tracking-widest text-xs text-black"
                style={{ borderRight: i < 4 ? "2px solid #000" : "none" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#000";
                  el.style.color = "#ffdd00";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.color = "#000";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-4 border-black flex h-4">
        <div className="flex-1" style={{ background: "#000" }} />
        <div className="flex-1" style={{ background: "#ff69b4" }} />
        <div className="flex-1" style={{ background: "#00bfff" }} />
        <div className="flex-1" style={{ background: "#000" }} />
        <div className="flex-1" style={{ background: "#ffdd00" }} />
        <div className="flex-1" style={{ background: "#ff69b4" }} />
        <div className="flex-1" style={{ background: "#000" }} />
        <div className="flex-1" style={{ background: "#00bfff" }} />
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Root Export                                                         */
/* ------------------------------------------------------------------ */

export default function PopArtShowcaseContent() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#fff" }}>
      <NavBar />
      <HeroSection />
      <WarholGallery />
      <BenDayPaletteSection />
      <ComicComponentLab />
      <SFXShowroom />
      <RulesSection />
      <TypographySection />
      <FooterSection />
    </div>
  );
}
