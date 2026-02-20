"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline hooks — no external showcase imports
// ---------------------------------------------------------------------------

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
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

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AntiDesignShowcaseContent() {
  // Hero reveal
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Button variant tab switcher
  const [activeButtonTab, setActiveButtonTab] = useState(0);

  // Card hover tracking
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Form section toggle
  const [formSectionOpen, setFormSectionOpen] = useState(true);

  // Section refs with useInView — destructure immediately (React Compiler rule)
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();
  const { ref: paletteRef, inView: paletteInView } = useInView();
  const { ref: typographyRef, inView: typographyInView } = useInView();
  const { ref: formRef, inView: formInView } = useInView();
  const { ref: footerRef, inView: footerInView } = useInView();

  const buttonTabs = [
    {
      label: "RED",
      bg: "#FF0000",
      text: "text-white",
      shadow: "#000",
      description: "PRIMARY DESTRUCTION",
    },
    {
      label: "BLUE",
      bg: "#0000FF",
      text: "text-white",
      shadow: "#FF0000",
      description: "FORCE DIRECTIVE",
    },
    {
      label: "YELLOW",
      bg: "#FFFF00",
      text: "text-black",
      shadow: "#000",
      description: "ALERT MAXIMUM",
    },
    {
      label: "MAGENTA",
      bg: "#FF00FF",
      text: "text-white",
      shadow: "#000",
      description: "SIGNAL OVERLOAD",
    },
  ];

  const principleCards = [
    {
      accentColor: "#FF0000",
      label: "01",
      title: "NO CURVES",
      body: "Border-radius: 0. Every corner is a right angle. Softness is surrender.",
    },
    {
      accentColor: "#0000FF",
      label: "02",
      title: "THICK BORDERS",
      body: "Minimum 4px. Borders are statements. They separate reality from void.",
    },
    {
      accentColor: "#FF00FF",
      label: "03",
      title: "CLASHING COLORS",
      body: "Red next to blue next to yellow. Visual conflict generates energy.",
    },
    {
      accentColor: "#00FF00",
      label: "04",
      title: "HARD SHADOWS",
      body: "Zero blur. shadow-[8px_8px_0_#000]. Never soft. Never subtle. Never apologize.",
    },
    {
      accentColor: "#00FFFF",
      label: "05",
      title: "ROTATED ELEMENTS",
      body: "Tilt at -3deg to 5deg. Horizontal is boring. Chaos is the natural state.",
    },
    {
      accentColor: "#FFFF00",
      label: "06",
      title: "MIXED SCALE",
      body: "text-xs beside text-9xl. Hierarchies exist to be violated. Size is aggression.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* NAV */}
      {/* ------------------------------------------------------------------ */}
      <nav className="bg-white border-b-4 border-black px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link
          href="/styles/anti-design/showcase"
          className="font-black text-xl md:text-2xl uppercase tracking-tight"
        >
          STYLEKIT
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/styles/anti-design"
            className="font-black text-xs uppercase border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all duration-100"
          >
            DOCS
          </Link>
          <Link
            href="/styles"
            className="font-black text-xs uppercase border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all duration-100"
          >
            ALL STYLES
          </Link>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* HERO — yellow bg, massive rotated title */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#FFFF00] border-b-4 border-black py-20 md:py-32 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
          >
            <span className="inline-block border-4 border-black bg-[#FF0000] text-white font-black text-xs uppercase px-3 py-1 mb-6 rotate-[-1deg]">
              DESIGN STYLE / 反设计
            </span>
          </div>

          {/* Giant title */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <h1 className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] font-black uppercase text-black leading-none -rotate-2 mb-6">
              ANTI-
              <br />
              DESIGN
            </h1>
          </div>

          {/* Tagline + CTA */}
          <div
            className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
            }}
          >
            <p className="text-base md:text-xl font-black text-black max-w-sm rotate-[1deg]">
              BREAK EVERY RULE.
              <br />
              REJECT EVERY CONVENTION.
              <br />
              EMBRACE THE CHAOS.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-8 py-4 bg-[#FF0000] text-white font-black text-sm uppercase border-4 border-black shadow-[8px_8px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all duration-100"
              >
                DESTROY
              </button>
              <button
                className="px-8 py-4 bg-black text-white font-black text-sm uppercase border-4 border-black shadow-[8px_8px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#FF0000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#FF0000] transition-all duration-100"
              >
                CREATE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMPONENTS DEMO — white/red/blue alternating bg */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={componentsRef}
        className="bg-white border-b-4 border-black py-16 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={componentsInView} delay={0}>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-2 rotate-[-1deg]">
              COMPONENTS
            </h2>
            <p className="font-bold text-sm text-black/60 mb-10 uppercase tracking-widest">
              Interactive elements — deliberately misaligned
            </p>
          </RevealBlock>

          {/* ---- Button Variant Switcher ---- */}
          <RevealBlock inView={componentsInView} delay={0.1}>
            <div className="mb-12">
              <h3 className="text-xl font-black uppercase mb-4 border-l-[8px] border-[#FF0000] pl-3">
                BUTTONS
              </h3>

              {/* Tab strip */}
              <div className="flex flex-wrap gap-0 border-4 border-black w-fit mb-6">
                {buttonTabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveButtonTab(i)}
                    className={`px-4 py-2 font-black text-xs uppercase transition-all duration-100 ${
                      activeButtonTab === i
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-[#FFFF00]"
                    } ${i < buttonTabs.length - 1 ? "border-r-4 border-black" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active tab preview */}
              <div className="flex flex-wrap items-center gap-6">
                <button
                  style={{
                    backgroundColor: buttonTabs[activeButtonTab].bg,
                    boxShadow: `8px 8px 0 ${buttonTabs[activeButtonTab].shadow}`,
                  }}
                  className={`px-8 py-4 font-black text-sm uppercase border-4 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100 ${buttonTabs[activeButtonTab].text}`}
                  onClick={() =>
                    setActiveButtonTab((activeButtonTab + 1) % buttonTabs.length)
                  }
                >
                  {buttonTabs[activeButtonTab].label} ACTION
                </button>
                <div>
                  <p className="font-black text-2xl uppercase rotate-[1deg]">
                    {buttonTabs[activeButtonTab].description}
                  </p>
                  <p className="font-bold text-xs text-black/50 uppercase tracking-widest mt-1">
                    bg: {buttonTabs[activeButtonTab].bg} · border-4 border-black · shadow-[8px_8px_0_{buttonTabs[activeButtonTab].shadow}]
                  </p>
                </div>
              </div>

              {/* All four buttons side by side */}
              <div className="flex flex-wrap gap-4 mt-6">
                {buttonTabs.map((tab) => (
                  <button
                    key={tab.label}
                    style={{ backgroundColor: tab.bg }}
                    className={`px-5 py-3 font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all duration-100 ${tab.text}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* ---- Cards row ---- */}
          <RevealBlock inView={componentsInView} delay={0.2}>
            <div className="mb-12">
              <h3 className="text-xl font-black uppercase mb-4 border-l-[8px] border-[#0000FF] pl-3">
                CARDS
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {principleCards.slice(0, 3).map((card, i) => (
                  <div
                    key={card.label}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="bg-white border-4 border-black p-5 cursor-pointer transition-all duration-100"
                    style={{
                      boxShadow:
                        hoveredCard === i
                          ? "12px 12px 0 #000"
                          : "6px 6px 0 #000",
                      transform:
                        hoveredCard === i
                          ? "translate(-4px, -4px)"
                          : "translate(0,0)",
                    }}
                  >
                    <div
                      className="h-2 border-b-4 border-black -mx-5 -mt-5 mb-4"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <p className="font-black text-xs text-black/40 uppercase tracking-widest mb-1">
                      {card.label}
                    </p>
                    <h4 className="font-black text-lg uppercase mb-2">
                      {card.title}
                    </h4>
                    <p className="font-bold text-sm text-black/70">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* ---- Inputs ---- */}
          <RevealBlock inView={componentsInView} delay={0.3}>
            <div>
              <h3 className="text-xl font-black uppercase mb-4 border-l-[8px] border-[#FF00FF] pl-3">
                INPUTS
              </h3>
              <div className="max-w-lg space-y-4">
                <div>
                  <label className="font-black text-xs uppercase tracking-widest block mb-1">
                    YOUR NAME (REQUIRED)
                  </label>
                  <input
                    type="text"
                    placeholder="TYPE HERE..."
                    className="w-full px-4 py-3 bg-white border-4 border-black font-bold placeholder:text-black/30 focus:outline-none focus:border-[#0000FF] focus:shadow-[4px_4px_0_#0000FF] transition-all duration-100"
                  />
                </div>
                <div>
                  <label className="font-black text-xs uppercase tracking-widest block mb-1">
                    YOUR RAGE
                  </label>
                  <input
                    type="text"
                    placeholder="DESCRIBE YOUR ANGER..."
                    className="w-full px-4 py-3 bg-white border-4 border-black font-bold placeholder:text-black/30 focus:outline-none focus:border-[#FF0000] focus:shadow-[4px_4px_0_#FF0000] transition-all duration-100"
                  />
                </div>
                <div>
                  <label className="font-black text-xs uppercase tracking-widest block mb-1">
                    MANIFESTO
                  </label>
                  <textarea
                    placeholder="WRITE YOUR MANIFESTO..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-4 border-black font-bold placeholder:text-black/30 focus:outline-none focus:border-[#FFFF00] focus:shadow-[4px_4px_0_#000] transition-all duration-100 resize-none"
                  />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DESIGN RULES — black bg, white text */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={rulesRef}
        className="bg-black border-b-4 border-white py-16 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto text-white">
          <RevealBlock inView={rulesInView} delay={0}>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-2 rotate-[1deg]">
              RULES
            </h2>
            <p className="font-bold text-sm text-white/40 uppercase tracking-widest mb-10">
              The anti-design doctrine
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO list */}
            <RevealBlock inView={rulesInView} delay={0.1}>
              <div className="border-4 border-[#00FF00] p-6 shadow-[8px_8px_0_#00FF00]">
                <h3 className="font-black text-2xl uppercase mb-6 text-[#00FF00]">
                  DO THIS
                </h3>
                <ul className="space-y-3">
                  {[
                    { size: "text-xl", text: "border-4 border-black ON EVERYTHING" },
                    { size: "text-sm", text: "sharp corners — rounded-none always forever" },
                    { size: "text-2xl", text: "HIGH-SATURATION PRIMARIES ONLY" },
                    { size: "text-sm", text: "hard offset shadows, zero blur, zero mercy" },
                    { size: "text-lg", text: "ROTATE -3DEG TO 5DEG" },
                    { size: "text-sm", text: "font-black uppercase on all labels" },
                    { size: "text-xl", text: "SHADOW-[8PX_8PX_0_#000]" },
                    { size: "text-sm", text: "asymmetric border widths for tension" },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className={`${item.size} font-black uppercase leading-tight`}
                    >
                      <span className="text-[#00FF00] mr-2">+</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T list */}
            <RevealBlock inView={rulesInView} delay={0.2}>
              <div className="border-4 border-[#FF0000] p-6 shadow-[8px_8px_0_#FF0000]">
                <h3 className="font-black text-2xl uppercase mb-6 text-[#FF0000]">
                  NEVER THIS
                </h3>
                <ul className="space-y-3">
                  {[
                    { size: "text-xl", text: "ROUNDED CORNERS (forbidden)", strike: true },
                    { size: "text-sm", text: "soft or blurred drop-shadows", strike: true },
                    { size: "text-2xl", text: "MUTED PASTEL COLORS", strike: true },
                    { size: "text-sm", text: "gradients — you are not a sunset", strike: true },
                    { size: "text-lg", text: "BACKDROP-BLUR EFFECTS", strike: true },
                    { size: "text-sm", text: "consistent spacing — that is harmony", strike: true },
                    { size: "text-xl", text: "\"NICE\" HARMONIOUS DESIGN", strike: true },
                    { size: "text-sm", text: "opacity tricks and transparency layers", strike: true },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className={`${item.size} font-black uppercase leading-tight line-through text-white/60`}
                    >
                      <span className="text-[#FF0000] mr-2 no-underline" style={{ textDecoration: "none" }}>
                        ×
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Principle cards (remaining 3) */}
          <RevealBlock inView={rulesInView} delay={0.3}>
            <div className="grid sm:grid-cols-3 gap-5 mt-8">
              {principleCards.slice(3).map((card) => (
                <div
                  key={card.label}
                  className="border-4 border-white p-4"
                  style={{ borderColor: card.accentColor }}
                >
                  <p
                    className="font-black text-xs uppercase tracking-widest mb-1"
                    style={{ color: card.accentColor }}
                  >
                    {card.label}
                  </p>
                  <h4 className="font-black text-base uppercase mb-1">
                    {card.title}
                  </h4>
                  <p className="font-bold text-xs text-white/60">{card.body}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COLOR PALETTE — alternating colored blocks */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={paletteRef}
        className="bg-white border-b-4 border-black py-16 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={paletteInView} delay={0}>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-2">
              PALETTE
            </h2>
            <p className="font-bold text-sm text-black/40 uppercase tracking-widest mb-10">
              Primary colors — all eight — no compromises
            </p>
          </RevealBlock>

          <RevealBlock inView={paletteInView} delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 border-4 border-black">
              {[
                { name: "BLACK", hex: "#000000", bg: "#000000", text: "#FFFFFF" },
                { name: "WHITE", hex: "#FFFFFF", bg: "#FFFFFF", text: "#000000" },
                { name: "RED", hex: "#FF0000", bg: "#FF0000", text: "#FFFFFF" },
                { name: "BLUE", hex: "#0000FF", bg: "#0000FF", text: "#FFFFFF" },
                { name: "YELLOW", hex: "#FFFF00", bg: "#FFFF00", text: "#000000" },
                { name: "MAGENTA", hex: "#FF00FF", bg: "#FF00FF", text: "#FFFFFF" },
                { name: "CYAN", hex: "#00FFFF", bg: "#00FFFF", text: "#000000" },
                { name: "GREEN", hex: "#00FF00", bg: "#00FF00", text: "#000000" },
              ].map((color, i) => (
                <div
                  key={color.name}
                  className={`${i < 7 ? "border-r-4 border-black" : ""}`}
                >
                  <div
                    className="h-32 md:h-48 border-b-4 border-black"
                    style={{ backgroundColor: color.bg }}
                  />
                  <div className="p-2 bg-white border-t-0">
                    <p className="font-black text-xs uppercase">{color.name}</p>
                    <p className="font-bold text-[10px] text-black/50 font-mono">
                      {color.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Asymmetric color blocks */}
          <RevealBlock inView={paletteInView} delay={0.2}>
            <div className="mt-8 flex gap-0 h-12 border-4 border-black overflow-hidden">
              {["#FF0000", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#00FF00"].map(
                (c, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${i < 5 ? "border-r-4 border-black" : ""}`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TYPOGRAPHY SHOWCASE — mixed font sizes, rotated elements */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={typographyRef}
        className="bg-[#FF0000] border-b-4 border-black py-16 md:py-24 px-6 md:px-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-white">
          <RevealBlock inView={typographyInView} delay={0}>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-2 rotate-[1deg]">
              TYPOGRAPHY
            </h2>
            <p className="font-bold text-sm text-white/50 uppercase tracking-widest mb-10">
              Deliberate scale chaos — text-xs to text-9xl
            </p>
          </RevealBlock>

          {/* Giant declaration */}
          <RevealBlock inView={typographyInView} delay={0.1}>
            <div className="mb-10 overflow-hidden">
              <p className="text-[6rem] md:text-[10rem] font-black uppercase leading-none -rotate-2 text-white">
                CHAOS
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/60 mt-1 rotate-[2deg] ml-4">
                is the natural state of all good design
              </p>
            </div>
          </RevealBlock>

          {/* Mixed scale grid */}
          <RevealBlock inView={typographyInView} delay={0.2}>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Left: scale ladder */}
              <div className="border-4 border-white p-6 shadow-[8px_8px_0_#000]">
                <p className="font-black text-xs uppercase text-white/60 mb-4 tracking-widest">
                  TYPE SCALE
                </p>
                <div className="space-y-1">
                  <p className="font-black text-[80px] uppercase leading-none">XL</p>
                  <p className="font-black text-4xl uppercase">LARGE</p>
                  <p className="font-black text-2xl uppercase">MEDIUM</p>
                  <p className="font-black text-lg uppercase">SMALL</p>
                  <p className="font-bold text-sm uppercase text-white/80">extra small</p>
                  <p className="font-bold text-xs uppercase text-white/60 tracking-widest">
                    microscopic — but present
                  </p>
                </div>
              </div>

              {/* Right: rotated text collage */}
              <div className="border-4 border-white p-6 shadow-[8px_8px_0_#000] relative overflow-hidden min-h-[220px]">
                <p className="font-black text-xs uppercase text-white/60 mb-4 tracking-widest">
                  ROTATION CHAOS
                </p>
                <div className="relative">
                  <p className="font-black text-5xl uppercase -rotate-3 inline-block mb-2">
                    TILT
                  </p>
                  <br />
                  <p className="font-black text-2xl uppercase rotate-2 inline-block ml-8 mb-2">
                    ANGLE
                  </p>
                  <br />
                  <p className="font-black text-lg uppercase -rotate-1 inline-block ml-2 mb-2">
                    SKEWED
                  </p>
                  <br />
                  <p className="font-bold text-sm uppercase rotate-[3deg] inline-block ml-12">
                    deliberately misaligned text
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Weight and case demo */}
          <RevealBlock inView={typographyInView} delay={0.3}>
            <div className="border-l-[12px] border-white pl-6">
              <p className="font-black text-3xl uppercase mb-1">FONT-BLACK</p>
              <p className="font-bold text-xl uppercase mb-1">FONT-BOLD</p>
              <p className="font-semibold text-lg uppercase mb-1 text-white/80">
                FONT-SEMIBOLD
              </p>
              <p className="font-normal text-base text-white/60 mb-1">
                font-normal — rare, suspicious
              </p>
              <p className="font-black text-xs uppercase tracking-[0.3em] text-white/40">
                UPPERCASE IS MANDATORY · LOWERCASE IS WEAKNESS
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FORM SECTION — with toggle */}
      {/* ------------------------------------------------------------------ */}
      <section
        ref={formRef}
        className="bg-[#0000FF] border-b-4 border-black py-16 md:py-24 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={formInView} delay={0}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-4xl md:text-6xl font-black uppercase text-white rotate-[-1deg]">
                CONTACT
              </h2>
              <button
                onClick={() => setFormSectionOpen(!formSectionOpen)}
                className="font-black text-xs uppercase text-white border-4 border-white px-3 py-1.5 shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all duration-100"
              >
                {formSectionOpen ? "COLLAPSE" : "EXPAND"}
              </button>
            </div>
            <p className="font-bold text-sm text-white/50 uppercase tracking-widest mb-8">
              Reach out — or don&apos;t. We reject your conventions either way.
            </p>
          </RevealBlock>

          {formSectionOpen && (
            <RevealBlock inView={formInView} delay={0.15}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="font-black text-xs uppercase tracking-widest text-white block mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      placeholder="FULL NAME..."
                      className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder:text-black/30 focus:outline-none focus:border-[#FF0000] focus:shadow-[4px_4px_0_#FF0000] transition-all duration-100"
                    />
                  </div>
                  <div>
                    <label className="font-black text-xs uppercase tracking-widest text-white block mb-1">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="YOUR@EMAIL.COM"
                      className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder:text-black/30 focus:outline-none focus:border-[#FFFF00] focus:shadow-[4px_4px_0_#000] transition-all duration-100"
                    />
                  </div>
                  <div>
                    <label className="font-black text-xs uppercase tracking-widest text-white block mb-1">
                      MESSAGE
                    </label>
                    <textarea
                      placeholder="TYPE YOUR DEMANDS..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder:text-black/30 focus:outline-none focus:border-[#FF00FF] focus:shadow-[4px_4px_0_#FF00FF] transition-all duration-100 resize-none"
                    />
                  </div>
                  <button className="w-full px-6 py-4 bg-[#FF0000] text-white font-black text-sm uppercase border-4 border-black shadow-[8px_8px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000] transition-all duration-100">
                    SEND TRANSMISSION
                  </button>
                </div>

                {/* Right column: asymmetric info */}
                <div className="flex flex-col gap-4">
                  <div className="border-4 border-white p-5 shadow-[8px_8px_0_#000] rotate-[1deg]">
                    <p className="font-black text-xs uppercase tracking-widest text-white/60 mb-1">
                      STUDIO LOCATION
                    </p>
                    <p className="font-black text-xl uppercase text-white">
                      SOMEWHERE
                      <br />
                      CHAOTIC
                    </p>
                  </div>
                  <div className="border-4 border-[#FFFF00] p-5 shadow-[8px_8px_0_#FFFF00] -rotate-[1deg]">
                    <p className="font-black text-xs uppercase tracking-widest text-[#FFFF00] mb-1">
                      RESPONSE TIME
                    </p>
                    <p className="font-black text-3xl uppercase text-white">
                      WHEN WE FEEL LIKE IT
                    </p>
                  </div>
                  <div className="border-4 border-[#FF0000] p-5 shadow-[8px_8px_0_#FF0000]">
                    <p className="font-black text-xs uppercase tracking-widest text-[#FF0000] mb-1">
                      RULES FOLLOWED
                    </p>
                    <p className="font-black text-6xl text-white">0</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRINCIPLES GRID — all 6 cards full width */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#FFFF00] border-b-4 border-black py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-2 -rotate-1">
            PRINCIPLES
          </h2>
          <p className="font-bold text-sm text-black/50 uppercase tracking-widest mb-10">
            The six laws — learn them, then destroy them
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {principleCards.map((card, i) => (
              <div
                key={card.label}
                className="bg-white border-4 border-black p-5 shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000] transition-all duration-100 cursor-pointer"
                style={{
                  transform: `rotate(${i % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                }}
              >
                <div
                  className="h-2 border-b-4 border-black -mx-5 -mt-5 mb-4"
                  style={{ backgroundColor: card.accentColor }}
                />
                <p className="font-black text-xs text-black/40 uppercase tracking-widest mb-1">
                  {card.label}
                </p>
                <h4 className="font-black text-xl uppercase mb-2">{card.title}</h4>
                <p className="font-bold text-sm text-black/70">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MANIFESTO — red bg, visually chaotic text */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#FF0000] border-b-4 border-black py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-white">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 -rotate-1">
            MANIFESTO
          </h2>
          <div className="space-y-1 overflow-hidden">
            <p className="text-3xl md:text-5xl font-black uppercase">NO ROUNDED CORNERS</p>
            <p className="text-base md:text-lg font-bold rotate-[1deg] ml-8 text-white/70">
              beauty is a trap — harmony is a cage
            </p>
            <p className="text-4xl md:text-6xl font-black uppercase -rotate-1">
              NO SOFT SHADOWS
            </p>
            <p className="text-xs font-bold ml-16 rotate-[2deg] text-white/60 uppercase tracking-widest">
              we reject the smooth, the polished, the &quot;user-friendly&quot;
            </p>
            <p className="text-2xl md:text-4xl font-black uppercase">ONLY RAW POWER</p>
            <p className="text-sm font-bold ml-4 -rotate-1 text-white/70">
              every pixel a declaration — every border a statement
            </p>
            <p className="text-5xl md:text-7xl font-black uppercase rotate-[1deg]">
              BREAK IT
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------------ */}
      <footer
        ref={footerRef}
        className="bg-black border-t-4 border-white px-6 md:px-10 py-10"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={footerInView} delay={0}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="font-black text-2xl uppercase text-white mb-1">
                  ANTI-DESIGN STUDIO
                </p>
                <p className="font-bold text-xs uppercase tracking-widest text-white/40">
                  StyleKit · 反设计 · Break Everything
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/styles/anti-design"
                  className="font-black text-xs uppercase text-white border-4 border-white px-4 py-2 shadow-[4px_4px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#FF0000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#FF0000] transition-all duration-100"
                >
                  VIEW DOCS
                </Link>
                <Link
                  href="/styles"
                  className="font-black text-xs uppercase text-black border-4 border-[#FFFF00] bg-[#FFFF00] px-4 py-2 shadow-[4px_4px_0_#FFFF00] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#FFFF00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#FFFF00] transition-all duration-100"
                >
                  ALL STYLES
                </Link>
              </div>
            </div>
          </RevealBlock>

          {/* Bottom strip */}
          <RevealBlock inView={footerInView} delay={0.15}>
            <div className="flex gap-0 h-3 border-4 border-white mt-8 overflow-hidden">
              {["#FF0000", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#00FF00"].map(
                (c, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${i < 5 ? "border-r-4 border-white" : ""}`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
