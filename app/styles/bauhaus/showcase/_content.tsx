"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook                                          */
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PALETTE = [
  { name: "Red", hex: "#FF0000", bg: "#FF0000", text: "#FFFFFF" },
  { name: "Yellow", hex: "#FFCC00", bg: "#FFCC00", text: "#000000" },
  { name: "Blue", hex: "#0000FF", bg: "#0000FF", text: "#FFFFFF" },
  { name: "Black", hex: "#000000", bg: "#000000", text: "#FFFFFF" },
  { name: "White", hex: "#FFFFFF", bg: "#FFFFFF", text: "#000000" },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "FORM FOLLOWS FUNCTION",
    desc: "Every visual element must justify its existence through purpose. Decoration without function is waste. The shape of an object should be determined by what it does, not how it looks.",
    color: "#FF0000",
    shape: "circle",
  },
  {
    number: "02",
    title: "PRIMARY COLORS ONLY",
    desc: "Red, yellow, blue — the three primaries plus black and white. No mixed tones, no pastels, no gradients. Color serves as structural signal, not ornament.",
    color: "#FFCC00",
    shape: "square",
  },
  {
    number: "03",
    title: "BASIC GEOMETRY",
    desc: "Circle, square, triangle — the three fundamental forms. All design complexity can be reduced to these pure geometries. Combine them rationally; never purely decoratively.",
    color: "#0000FF",
    shape: "triangle",
  },
  {
    number: "04",
    title: "CRAFT + ART = DESIGN",
    desc: "The Bauhaus school unified fine art with craft and industry. A well-designed chair and a well-designed typeface obey the same laws: honest materials, honest structure.",
    color: "#000000",
    shape: "square",
  },
];

const DO_RULES = [
  "Use primary colors only — red #FF0000, yellow #FFCC00, blue #0000FF plus black and white",
  "Use basic geometric shapes (circle, square, triangle) as structural UI elements",
  "Apply rounded-none for squares and rounded-full for circles — shapes must be pure",
  "Use font-black or font-bold uppercase for all headings — weight carries hierarchy",
  "Apply hard pure-black borders: border-4 border-black on all interactive elements",
  "Use primary color blocks as layout structure, not just decoration",
  "Use font-mono for body text functional labels and metadata",
  "Employ stark whitespace — emptiness must be purposeful, not accidental",
];

const DONT_RULES = [
  "Never use gradients — Bauhaus color is flat and pure, never blended",
  "Never use soft or muted tones — every color must be a primary or neutral",
  "Never use decorative fonts — sans-serif geometric typefaces only",
  "Never add ornamentation that does not serve a structural function",
  "Never use pastel colors — they contradict the primary-only system",
  "Never use rounded corners on squares — purity of form is non-negotiable",
  "Never center body text — geometric layouts use grid-based left alignment",
  "Never use shadow or blur effects — surfaces are flat and honest",
];

const TYPOGRAPHY_SCALE = [
  { label: "Display", size: "text-7xl", weight: "font-black", tracking: "tracking-tight", sample: "BAUHAUS 1919" },
  { label: "H1", size: "text-5xl", weight: "font-black", tracking: "tracking-tight", sample: "FORM FOLLOWS FUNCTION" },
  { label: "H2", size: "text-3xl", weight: "font-bold", tracking: "tracking-widest", sample: "PRIMARY GEOMETRY" },
  { label: "H3", size: "text-xl", weight: "font-bold", tracking: "tracking-wider", sample: "STRUCTURAL ELEMENT" },
  { label: "Body", size: "text-base", weight: "font-normal", tracking: "tracking-normal", sample: "Honest materials, honest structure, purposeful form." },
  { label: "Label", size: "text-xs", weight: "font-bold", tracking: "tracking-widest", sample: "FUNCTIONAL LABEL / 1919" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function GeometricCircle({
  size = 64,
  color = "#FF0000",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={color} />
    </svg>
  );
}

function GeometricSquare({
  size = 64,
  color = "#FFCC00",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" fill={color} />
    </svg>
  );
}

function GeometricTriangle({
  size = 64,
  color = "#0000FF",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <polygon points="32,0 64,64 0,64" fill={color} />
    </svg>
  );
}

function BauhausButton({
  children,
  variant = "red",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "blue" | "black" | "outline";
  onClick?: () => void;
}) {
  const base =
    "px-8 py-4 font-black uppercase tracking-widest text-sm border-4 border-black transition-colors duration-150 cursor-pointer select-none";

  const variants = {
    red: "bg-[#FF0000] text-white hover:bg-black",
    yellow: "bg-[#FFCC00] text-black hover:bg-black hover:text-white",
    blue: "bg-[#0000FF] text-white hover:bg-black",
    black: "bg-black text-white hover:bg-[#FF0000]",
    outline: "bg-white text-black hover:bg-black hover:text-white",
  };

  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();

  const [activeTab, setActiveTab] = useState<"red" | "yellow" | "blue">("red");
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(62);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [notification, setNotification] = useState<string | null>(null);

  function showNotification(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  }

  const tabConfig = {
    red: { bg: "bg-[#FF0000]", text: "text-white", border: "border-[#FF0000]", label: "PRIMARY RED" },
    yellow: { bg: "bg-[#FFCC00]", text: "text-black", border: "border-[#FFCC00]", label: "SECONDARY YELLOW" },
    blue: { bg: "bg-[#0000FF]", text: "text-white", border: "border-[#0000FF]", label: "TERTIARY BLUE" },
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <span className="font-black uppercase tracking-widest text-sm">
              BAUHAUS <span className="text-[#FF0000]">1919</span>
            </span>

            {/* Nav items */}
            <nav className="hidden md:flex items-center gap-0">
              {["Hero", "Components", "Palette", "Geometry", "Principles", "Typography"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-5 text-xs font-bold uppercase tracking-widest text-black hover:bg-[#FF0000] hover:text-white transition-colors duration-150 border-r-2 border-black last:border-r-0"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="/"
              className="px-4 py-2 bg-black text-white font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-[#FF0000] transition-colors duration-150"
            >
              StyleKit →
            </Link>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section id="hero" className="pt-16 bg-white min-h-screen flex flex-col" ref={heroRef}>
        {/* Top structural band */}
        <div
          className="flex border-b-4 border-black"
          style={{
            opacity: heroInView ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          <div className="w-4 bg-[#FF0000]" />
          <div className="w-4 bg-[#FFCC00]" />
          <div className="w-4 bg-[#0000FF]" />
          <div className="flex-1 bg-black h-4" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto w-full px-6 py-16 gap-0">
          {/* Left: geometric composition — 5 cols */}
          <div
            className="md:col-span-5 flex items-center justify-center py-12 relative"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateX(0)" : "translateX(-48px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            {/* Bauhaus geometric composition */}
            <div className="relative w-72 h-72 border-4 border-black">
              {/* Yellow square background fill */}
              <div className="absolute inset-0 bg-white" />

              {/* Large red circle — top left */}
              <div
                className="absolute rounded-full bg-[#FF0000]"
                style={{ width: 140, height: 140, top: -20, left: -20 }}
              />

              {/* Blue square — bottom right */}
              <div
                className="absolute bg-[#0000FF]"
                style={{ width: 100, height: 100, bottom: -12, right: -12 }}
              />

              {/* Yellow triangle via SVG — center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="120" height="104" viewBox="0 0 120 104" fill="none" aria-hidden="true">
                  <polygon points="60,4 116,100 4,100" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
                </svg>
              </div>

              {/* Small black square accent */}
              <div
                className="absolute bg-black"
                style={{ width: 24, height: 24, top: 12, right: 12 }}
              />

              {/* Small red circle accent */}
              <div
                className="absolute rounded-full bg-[#FF0000]"
                style={{ width: 20, height: 20, bottom: 16, left: 16 }}
              />
            </div>
          </div>

          {/* Right: text — 7 cols */}
          <div
            className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-12 border-l-0 md:border-l-4 md:border-black"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(48px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-4 font-mono">
              BAUHAUS / WEIMAR / 1919
            </p>

            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-black mb-6">
              FORM
              <br />
              <span className="text-[#FF0000]">FOLLOWS</span>
              <br />
              FUNCTION.
            </h1>

            <p className="text-base font-mono text-black leading-relaxed mb-8 max-w-md border-l-4 border-[#FFCC00] pl-4">
              Das Staatliche Bauhaus — unified crafts, fine arts, and industrial design under one roof.
              Primary colors. Basic geometry. Zero decoration. Every element earns its place.
            </p>

            <div className="flex flex-wrap gap-4">
              <BauhausButton variant="red">EXPLORE SYSTEM</BauhausButton>
              <BauhausButton variant="outline">LEARN MORE</BauhausButton>
            </div>

            {/* Bottom stat row */}
            <div className="flex gap-0 mt-12 border-t-4 border-black pt-6">
              {[
                { value: "3", label: "PRIMARY COLORS" },
                { value: "3", label: "BASIC SHAPES" },
                { value: "0", label: "DECORATIONS" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 px-4 ${i < 2 ? "border-r-4 border-black" : ""}`}
                >
                  <p className="text-4xl font-black text-black">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom structural band */}
        <div className="border-t-4 border-black flex">
          <div className="flex-1 bg-black h-3" />
          <div className="w-12 bg-[#0000FF]" />
          <div className="w-8 bg-[#FFCC00]" />
          <div className="w-6 bg-[#FF0000]" />
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section id="components" className="py-24 px-6 bg-white border-t-0">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <RevealBlock className="mb-16">
            <div className="flex items-end gap-6 border-b-4 border-black pb-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
                COMPONENTS
              </h2>
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 bg-[#FF0000]" />
                <div className="w-6 h-6 rounded-full bg-[#FFCC00]" />
                <div className="w-6 h-6 bg-[#0000FF]" />
              </div>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.05} className="mb-12">
            <div className="flex border-4 border-black">
              {(["red", "yellow", "blue"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 font-black uppercase tracking-widest text-xs transition-colors duration-150 border-r-4 border-black last:border-r-0 ${
                    activeTab === tab
                      ? `${tabConfig[tab].bg} ${tabConfig[tab].text}`
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {tabConfig[tab].label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: RED — Buttons */}
          {activeTab === "red" && (
            <RevealBlock>
              <div className="space-y-12">
                {/* Button variants */}
                <div className="border-4 border-black p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-6 border-l-4 border-[#FF0000] pl-3">
                    BUTTON VARIANTS — PRIMARY COLORS + BLACK BORDER
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <BauhausButton variant="red" onClick={() => showNotification("RED clicked")}>
                      RED PRIMARY
                    </BauhausButton>
                    <BauhausButton variant="yellow" onClick={() => showNotification("YELLOW clicked")}>
                      YELLOW SECONDARY
                    </BauhausButton>
                    <BauhausButton variant="blue" onClick={() => showNotification("BLUE clicked")}>
                      BLUE TERTIARY
                    </BauhausButton>
                    <BauhausButton variant="black" onClick={() => showNotification("BLACK clicked")}>
                      BLACK STRUCTURAL
                    </BauhausButton>
                    <BauhausButton variant="outline" onClick={() => showNotification("OUTLINE clicked")}>
                      OUTLINE GHOST
                    </BauhausButton>
                  </div>
                  {notification && (
                    <div className="mt-4 px-4 py-3 bg-black text-white font-bold uppercase tracking-widest text-xs border-4 border-[#FF0000] inline-block">
                      {notification}
                    </div>
                  )}
                </div>

                {/* Toggle switches */}
                <div className="border-4 border-black p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-6 border-l-4 border-[#FF0000] pl-3">
                    TOGGLE SWITCHES — BINARY STATES
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "GRID SYSTEM ACTIVE", desc: "Enable column grid", color: "bg-[#FF0000]", shape: "rounded-none" },
                      { label: "PRIMARY COLORS ONLY", desc: "Strict palette mode", color: "bg-[#FFCC00]", shape: "rounded-full" },
                      { label: "GEOMETRIC FORMS", desc: "Pure shape rendering", color: "bg-[#0000FF]", shape: "rounded-none" },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-4 border-2 border-black hover:border-[#FF0000] transition-colors duration-150"
                      >
                        <div>
                          <p className="font-black uppercase tracking-widest text-xs text-black">{item.label}</p>
                          <p className="text-xs font-mono text-gray-600 mt-1">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => {
                            const next = [...toggleStates];
                            next[index] = !next[index];
                            setToggleStates(next);
                          }}
                          className={`relative w-16 h-8 border-4 border-black transition-colors duration-150 ${
                            toggleStates[index] ? item.color : "bg-white"
                          } ${item.shape}`}
                          aria-pressed={toggleStates[index]}
                        >
                          <span
                            className={`absolute top-0 w-6 h-6 bg-black transition-all duration-150 ${
                              toggleStates[index] ? "left-[calc(100%-24px)]" : "left-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: YELLOW — Cards */}
          {activeTab === "yellow" && (
            <RevealBlock>
              <div className="space-y-12">
                {/* Shape cards */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-6 border-l-4 border-[#FFCC00] pl-3">
                    GEOMETRIC CARDS — PRIMARY COLOR ACCENT STRIPS
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black">
                    {[
                      {
                        color: "#FF0000",
                        textColor: "text-white",
                        shape: "CIRCLE",
                        desc: "Unity, wholeness, dynamic tension. The circle has no beginning and no end.",
                        geometry: <GeometricCircle size={56} color="#FFFFFF" />,
                      },
                      {
                        color: "#FFCC00",
                        textColor: "text-black",
                        shape: "SQUARE",
                        desc: "Stability, order, rationality. Four equal sides — the democratic form.",
                        geometry: <GeometricSquare size={56} color="#000000" />,
                      },
                      {
                        color: "#0000FF",
                        textColor: "text-white",
                        shape: "TRIANGLE",
                        desc: "Dynamic energy, direction, conflict. Three points of tension held in equilibrium.",
                        geometry: <GeometricTriangle size={56} color="#FFFFFF" />,
                      },
                    ].map((card, i) => (
                      <div
                        key={card.shape}
                        className={`p-8 border-r-4 border-black last:border-r-0 group hover:opacity-90 transition-opacity duration-150`}
                        style={{ backgroundColor: card.color }}
                      >
                        <div className="mb-6">{card.geometry}</div>
                        <h3 className={`text-2xl font-black uppercase tracking-widest mb-3 ${card.textColor}`}>
                          {card.shape}
                        </h3>
                        <p className={`text-xs font-mono leading-relaxed ${card.textColor} opacity-90`}>
                          {card.desc}
                        </p>
                        <div
                          className={`mt-6 w-8 border-b-4 ${i === 1 ? "border-black" : "border-white"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input + Form */}
                <div className="border-4 border-black p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-6 border-l-4 border-[#FFCC00] pl-3">
                    INPUT FIELDS — THICK BLACK BORDERS
                  </p>
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                        NAME / LABEL
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="ENTER TEXT HERE"
                        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-mono uppercase tracking-wide placeholder-gray-400 focus:outline-none focus:border-[#FF0000] transition-colors duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                        EMAIL / FUNCTION
                      </label>
                      <input
                        type="email"
                        placeholder="YOUR@ADDRESS.COM"
                        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-mono uppercase tracking-wide placeholder-gray-400 focus:outline-none focus:border-[#0000FF] transition-colors duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
                        MESSAGE / CONTENT
                      </label>
                      <textarea
                        rows={3}
                        placeholder="TYPE YOUR MESSAGE..."
                        className="w-full px-4 py-3 bg-white border-4 border-black text-black font-mono uppercase tracking-wide placeholder-gray-400 focus:outline-none focus:border-[#FFCC00] resize-none transition-colors duration-150"
                      />
                    </div>
                    <BauhausButton variant="black">SUBMIT FORM</BauhausButton>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: BLUE — Progress + Accordion */}
          {activeTab === "blue" && (
            <RevealBlock>
              <div className="space-y-12">
                {/* Progress bars */}
                <div className="border-4 border-black p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0000FF] mb-6 border-l-4 border-[#0000FF] pl-3">
                    PROGRESS INDICATORS — GEOMETRIC PROPORTION
                  </p>
                  <div className="space-y-6">
                    {/* Linear */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-black">
                          PROJECT COMPLETION
                        </span>
                        <span className="text-xs font-black text-[#FF0000]">{progress}%</span>
                      </div>
                      <div className="h-8 bg-white border-4 border-black">
                        <div
                          className="h-full bg-[#FF0000] transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Segmented */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-black mb-2 block">
                        PHASE BREAKDOWN
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: 100, color: "bg-[#FF0000]", label: "PLAN" },
                          { value: 100, color: "bg-[#FFCC00]", label: "BUILD" },
                          { value: progress, color: "bg-[#0000FF]", label: "TEST" },
                          { value: 12, color: "bg-black", label: "SHIP" },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="h-6 bg-white border-4 border-black mb-1">
                              <div
                                className={`h-full ${item.color} transition-all duration-500`}
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-center text-black">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 pt-4 border-t-4 border-black">
                      <BauhausButton
                        variant="outline"
                        onClick={() => setProgress(Math.max(0, progress - 10))}
                      >
                        DECREASE
                      </BauhausButton>
                      <BauhausButton
                        variant="blue"
                        onClick={() => setProgress(Math.min(100, progress + 10))}
                      >
                        INCREASE
                      </BauhausButton>
                      <BauhausButton
                        variant="black"
                        onClick={() => setProgress(62)}
                      >
                        RESET
                      </BauhausButton>
                    </div>
                  </div>
                </div>

                {/* Accordion */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0000FF] mb-6 border-l-4 border-[#0000FF] pl-3">
                    ACCORDION — COLLAPSIBLE INFORMATION
                  </p>
                  <div className="border-4 border-black">
                    {[
                      {
                        title: "WHAT IS BAUHAUS?",
                        content: "Bauhaus was a German art school founded in 1919 by Walter Gropius in Weimar. It combined crafts and fine arts, rejecting the separation between fine art and applied art. The school became influential for its approach to design: functionality, geometric forms, primary colors, and honest use of materials.",
                        accent: "#FF0000",
                        shape: "circle",
                      },
                      {
                        title: "CORE VISUAL LANGUAGE",
                        content: "Three primary colors: red, yellow, blue. Three basic shapes: circle, square, triangle. Black and white as structure. No gradients, no decorative typefaces, no ornament. Every visual decision serves a communicative function. Waste is the enemy of design.",
                        accent: "#FFCC00",
                        shape: "square",
                      },
                      {
                        title: "DESIGN LEGACY",
                        content: "Bauhaus principles continue to define modern design — from the International Style in architecture, to flat UI design in digital interfaces, to product design philosophy. The emphasis on simplicity, functionality, and geometric purity remains the dominant paradigm in contemporary visual culture.",
                        accent: "#0000FF",
                        shape: "triangle",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="border-b-4 border-black last:border-b-0"
                      >
                        <button
                          onClick={() =>
                            setActiveAccordion(activeAccordion === index ? null : index)
                          }
                          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="flex items-center gap-4">
                            {/* Geometric indicator */}
                            {item.shape === "circle" && (
                              <div
                                className="w-5 h-5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: item.accent }}
                              />
                            )}
                            {item.shape === "square" && (
                              <div
                                className="w-5 h-5 flex-shrink-0"
                                style={{ backgroundColor: item.accent }}
                              />
                            )}
                            {item.shape === "triangle" && (
                              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" className="flex-shrink-0" aria-hidden="true">
                                <polygon points="10,1 19,17 1,17" fill={item.accent} />
                              </svg>
                            )}
                            <span className="font-black uppercase tracking-widest text-sm text-black">
                              {item.title}
                            </span>
                          </div>
                          <div
                            className="w-8 h-8 border-4 border-black flex items-center justify-center font-black text-base transition-colors duration-150"
                            style={{
                              backgroundColor: activeAccordion === index ? item.accent : "white",
                              color: item.accent === "#FFCC00" && activeAccordion === index ? "black" : activeAccordion === index ? "white" : "black",
                            }}
                          >
                            {activeAccordion === index ? "−" : "+"}
                          </div>
                        </button>
                        {activeAccordion === index && (
                          <div className="px-6 pb-6 border-t-4 border-black" style={{ borderColor: item.accent }}>
                            <p className="text-sm font-mono text-black leading-relaxed pt-4">
                              {item.content}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section id="palette" className="py-24 px-6 bg-black border-t-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-white pb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-3 font-mono">
                COLOR SYSTEM / FARBSYSTEM
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">
                PRIMARY PALETTE
              </h2>
            </div>
          </RevealBlock>

          {/* 5 color blocks */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-4 border-white">
            {PALETTE.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div
                  className="relative p-8 border-r-4 border-white last:border-r-0 group hover:scale-[1.02] transition-transform duration-150"
                  style={{ backgroundColor: color.bg }}
                >
                  {/* Geometry indicator */}
                  <div className="mb-8">
                    {i === 0 && (
                      <div
                        className="w-12 h-12 rounded-full border-4"
                        style={{ borderColor: color.text }}
                      />
                    )}
                    {i === 1 && (
                      <div
                        className="w-12 h-12 border-4"
                        style={{ borderColor: color.text }}
                      />
                    )}
                    {i === 2 && (
                      <svg width="52" height="46" viewBox="0 0 52 46" fill="none" aria-hidden="true">
                        <polygon
                          points="26,4 50,42 2,42"
                          fill="none"
                          stroke={color.text}
                          strokeWidth="4"
                        />
                      </svg>
                    )}
                    {i === 3 && (
                      <div
                        className="w-12 h-12 rounded-full border-4"
                        style={{ borderColor: color.text }}
                      />
                    )}
                    {i === 4 && (
                      <div
                        className="w-12 h-12 border-4"
                        style={{ borderColor: color.text === "#000000" ? "#000000" : color.text }}
                      />
                    )}
                  </div>

                  <p
                    className="font-black uppercase tracking-widest text-sm mb-2"
                    style={{ color: color.text }}
                  >
                    {color.name}
                  </p>
                  <p
                    className="font-mono text-xs tracking-widest"
                    style={{ color: color.text, opacity: 0.7 }}
                  >
                    {color.hex}
                  </p>

                  {/* Role label */}
                  <p
                    className="font-mono text-xs uppercase tracking-widest mt-4 opacity-60"
                    style={{ color: color.text }}
                  >
                    {i === 0 && "CIRCLE / DYNAMIC"}
                    {i === 1 && "TRIANGLE / ENERGY"}
                    {i === 2 && "SQUARE / STABLE"}
                    {i === 3 && "STRUCTURE / GROUND"}
                    {i === 4 && "SPACE / VOID"}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color rule */}
          <RevealBlock delay={0.4} className="mt-12">
            <div className="border-4 border-white p-8">
              <div className="flex flex-wrap gap-8 items-center">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#FF0000] border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-[#FFCC00] border-2 border-white" />
                  <div className="w-8 h-8 bg-[#0000FF] border-2 border-white" />
                  <div className="text-white font-black text-2xl flex items-center">+</div>
                  <div className="w-8 h-8 bg-white border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-600 border-2 border-white" />
                </div>
                <p className="text-white font-mono text-xs uppercase tracking-widest leading-relaxed max-w-lg">
                  RULE: Only these five values are permitted. No tints, no shades, no mixing.
                  Color serves as structural signal. Red = urgency / action. Yellow = caution / secondary.
                  Blue = information / depth. Black = structure. White = space.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Geometric Shapes ===== */}
      <section id="geometry" className="py-24 px-6 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-3 font-mono">
                GRUNDFORMEN / BASIC FORMS
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
                GEOMETRIC LANGUAGE
              </h2>
            </div>
          </RevealBlock>

          {/* Three shape demonstrations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black mb-16">
            {/* Circle */}
            <RevealBlock delay={0.05}>
              <div className="border-r-4 border-black p-12 flex flex-col items-center group">
                <div className="mb-8 relative">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
                    <circle cx="80" cy="80" r="76" fill="#FF0000" stroke="#000000" strokeWidth="8" />
                    <circle cx="80" cy="80" r="40" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                    <circle cx="80" cy="80" r="8" fill="#FFFFFF" />
                    <line x1="80" y1="4" x2="80" y2="156" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
                    <line x1="4" y1="80" x2="156" y2="80" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
                  </svg>
                </div>
                <h3 className="font-black uppercase tracking-widest text-xl text-black mb-3">CIRCLE</h3>
                <p className="font-mono text-xs text-center text-black leading-relaxed">
                  Perfect symmetry in all directions.
                  No beginning. No end. Unity and wholeness.
                  Itten assigned it to RED — warm, advancing.
                </p>
                <div className="mt-6 flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FF0000] border-2 border-black" />
                  <div className="w-4 h-4 rounded-full bg-[#FF0000] border-2 border-black opacity-70" />
                  <div className="w-4 h-4 rounded-full bg-[#FF0000] border-2 border-black opacity-40" />
                </div>
              </div>
            </RevealBlock>

            {/* Square */}
            <RevealBlock delay={0.1}>
              <div className="border-r-4 border-black p-12 flex flex-col items-center">
                <div className="mb-8 relative">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="152" height="152" fill="#FFCC00" stroke="#000000" strokeWidth="8" />
                    <rect x="32" y="32" width="96" height="96" fill="none" stroke="#000000" strokeWidth="4" />
                    <rect x="60" y="60" width="40" height="40" fill="#000000" />
                    <line x1="4" y1="4" x2="156" y2="156" stroke="#000000" strokeWidth="2" opacity="0.4" />
                    <line x1="156" y1="4" x2="4" y2="156" stroke="#000000" strokeWidth="2" opacity="0.4" />
                  </svg>
                </div>
                <h3 className="font-black uppercase tracking-widest text-xl text-black mb-3">SQUARE</h3>
                <p className="font-mono text-xs text-center text-black leading-relaxed">
                  Four equal sides. Perfect balance.
                  Stability, order, rationality.
                  Itten assigned it to YELLOW — neutral, contained.
                </p>
                <div className="mt-6 flex gap-2">
                  <div className="w-4 h-4 bg-[#FFCC00] border-2 border-black" />
                  <div className="w-4 h-4 bg-[#FFCC00] border-2 border-black opacity-70" />
                  <div className="w-4 h-4 bg-[#FFCC00] border-2 border-black opacity-40" />
                </div>
              </div>
            </RevealBlock>

            {/* Triangle */}
            <RevealBlock delay={0.15}>
              <div className="p-12 flex flex-col items-center">
                <div className="mb-8 relative">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
                    <polygon points="80,8 156,152 4,152" fill="#0000FF" stroke="#000000" strokeWidth="8" />
                    <polygon points="80,48 124,128 36,128" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                    <polygon points="80,80 100,116 60,116" fill="#FFFFFF" />
                  </svg>
                </div>
                <h3 className="font-black uppercase tracking-widest text-xl text-black mb-3">TRIANGLE</h3>
                <p className="font-mono text-xs text-center text-black leading-relaxed">
                  Three points of tension. Directional force.
                  Dynamic energy and conflict resolved.
                  Itten assigned it to BLUE — cool, receding.
                </p>
                <div className="mt-6 flex gap-2">
                  {[1, 0.7, 0.4].map((op, i) => (
                    <svg key={i} width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
                      <polygon points="8,1 15,13 1,13" fill="#0000FF" opacity={op} stroke="#000000" strokeWidth="1.5" />
                    </svg>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Composition demo */}
          <RevealBlock delay={0.2}>
            <div className="border-4 border-black p-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-8 border-l-4 border-[#FF0000] pl-3">
                COMPOSITION — THREE PRIMARIES IN STRUCTURAL ARRANGEMENT
              </p>
              <div className="flex flex-wrap gap-8 items-center justify-center">
                {/* Large composition */}
                <div className="relative w-80 h-80 border-4 border-black bg-white flex-shrink-0">
                  {/* Red circle top-left */}
                  <div className="absolute top-6 left-6 w-28 h-28 rounded-full bg-[#FF0000]" />
                  {/* Blue square bottom-right */}
                  <div className="absolute bottom-6 right-6 w-24 h-24 bg-[#0000FF]" />
                  {/* Yellow triangle center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100" height="87" viewBox="0 0 100 87" fill="none" aria-hidden="true">
                      <polygon points="50,4 96,83 4,83" fill="#FFCC00" stroke="#000000" strokeWidth="3" />
                    </svg>
                  </div>
                  {/* Small accents */}
                  <div className="absolute top-6 right-6 w-6 h-6 bg-black" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 rounded-full bg-[#FFCC00]" />
                </div>

                {/* Legend */}
                <div className="space-y-4">
                  {[
                    { shape: "CIRCLE", color: "#FF0000", label: "CIRCLE — RED — WARMTH — MOVEMENT" },
                    { shape: "SQUARE", color: "#FFCC00", label: "SQUARE — YELLOW — LOGIC — ORDER" },
                    { shape: "TRIANGLE", color: "#0000FF", label: "TRIANGLE — BLUE — DEPTH — ENERGY" },
                  ].map((item) => (
                    <div key={item.shape} className="flex items-center gap-4">
                      <div className="w-6 h-6 border-2 border-black flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <p className="font-mono text-xs uppercase tracking-widest text-black">{item.label}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-4 pt-2 border-t-2 border-black">
                    <div className="w-6 h-6 bg-black border-2 border-black flex-shrink-0" />
                    <p className="font-mono text-xs uppercase tracking-widest text-black">
                      BLACK — STRUCTURE — GROUND — BOUNDARY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Design Principles ===== */}
      <section id="principles" className="py-24 px-6 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0000FF] mb-3 font-mono">
                GESTALTUNGSREGELN / DESIGN RULES
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
                PRINCIPLES
              </h2>
            </div>
          </RevealBlock>

          {/* 4 principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black mb-16">
            {PRINCIPLES.map((p, i) => (
              <RevealBlock key={p.number} delay={i * 0.08}>
                <div
                  className={`p-8 border-b-4 border-black ${i % 2 === 0 ? "md:border-r-4" : ""} ${i >= 2 ? "border-b-0" : ""} group`}
                >
                  {/* Number + shape */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-black text-5xl text-black leading-none">{p.number}</span>
                    {p.shape === "circle" && (
                      <div className="w-10 h-10 rounded-full" style={{ backgroundColor: p.color }} />
                    )}
                    {p.shape === "square" && (
                      <div className="w-10 h-10" style={{ backgroundColor: p.color }} />
                    )}
                    {p.shape === "triangle" && (
                      <svg width="44" height="38" viewBox="0 0 44 38" fill="none" aria-hidden="true">
                        <polygon points="22,3 42,35 2,35" fill={p.color} stroke="#000000" strokeWidth="3" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-base text-black mb-3 border-b-2 pb-2" style={{ borderColor: p.color }}>
                    {p.title}
                  </h3>
                  <p className="font-mono text-xs text-black leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* DO / DON'T panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div className="border-r-0 md:border-r-4 border-black">
                {/* Panel header */}
                <div className="bg-black px-6 py-4 flex items-center gap-3 border-b-4 border-black">
                  <div className="w-5 h-5 rounded-full bg-[#FF0000]" />
                  <p className="font-black uppercase tracking-widest text-sm text-white">DO</p>
                </div>
                <ul className="divide-y-4 divide-black">
                  {DO_RULES.map((rule, i) => (
                    <li key={rule} className="flex gap-4 px-6 py-4 hover:bg-[#FF0000] hover:text-white group transition-colors duration-150 cursor-default">
                      <span className="font-black text-xs text-[#FF0000] group-hover:text-white flex-shrink-0 mt-0.5 transition-colors duration-150">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs text-black group-hover:text-white leading-relaxed transition-colors duration-150">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <div>
                {/* Panel header */}
                <div className="bg-white px-6 py-4 flex items-center gap-3 border-b-4 border-black">
                  <div className="w-5 h-5 bg-gray-300" />
                  <p className="font-black uppercase tracking-widest text-sm text-gray-400">DON&apos;T</p>
                </div>
                <ul className="divide-y-4 divide-black">
                  {DONT_RULES.map((rule, i) => (
                    <li key={rule} className="flex gap-4 px-6 py-4 cursor-default">
                      <span className="font-black text-xs text-gray-300 flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs text-gray-400 leading-relaxed line-through decoration-gray-300">
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

      {/* ===== 7. Typography ===== */}
      <section id="typography" className="py-24 px-6 bg-[#FFCC00] border-t-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-black uppercase tracking-widest text-black mb-3 font-mono">
                TYPOGRAFIE / SCHRIFT
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
                TYPOGRAPHY SYSTEM
              </h2>
            </div>
          </RevealBlock>

          <div className="border-4 border-black bg-white">
            {TYPOGRAPHY_SCALE.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.06}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 px-8 py-6 border-b-4 border-black last:border-b-0 hover:bg-[#FF0000] hover:text-white transition-colors duration-150 cursor-default">
                  {/* Label */}
                  <div className="w-20 flex-shrink-0">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-150">
                      {item.label}
                    </span>
                  </div>
                  {/* Sample */}
                  <div className="flex-1 min-w-0">
                    <p className={`${item.size} ${item.weight} ${item.tracking} text-black group-hover:text-white leading-tight truncate transition-colors duration-150`}>
                      {item.sample}
                    </p>
                  </div>
                  {/* Meta */}
                  <div className="w-48 flex-shrink-0">
                    <p className="text-xs font-mono text-gray-400 group-hover:text-white opacity-80 transition-colors duration-150">
                      {item.weight} / {item.tracking}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Typeface rule block */}
          <RevealBlock delay={0.35} className="mt-8">
            <div className="border-4 border-black bg-black p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FFCC00] mb-3">GEOMETRY</p>
                  <p className="font-mono text-xs text-white leading-relaxed">
                    Bauhaus typography favored geometric sans-serif faces. Letters constructed from circles,
                    squares, triangles — the same vocabulary as the visual language.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-3">UPPERCASE</p>
                  <p className="font-mono text-xs text-white leading-relaxed">
                    All headings must be uppercase. Lowercase is a formal affectation. Capital letters are
                    structurally honest — they occupy their full height without descender waste.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0000FF] mb-3">WEIGHT</p>
                  <p className="font-mono text-xs text-white leading-relaxed">
                    font-black for all headlines. Weight carries hierarchy.
                    Bold, not decoration, distinguishes importance.
                    Only body text may be regular weight.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Alerts / Status messages ===== */}
      <section className="py-24 px-6 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-black pb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-3 font-mono">
                STATUSMELDUNGEN / SYSTEM MESSAGES
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-black">
                ALERT PANELS
              </h2>
            </div>
          </RevealBlock>

          <div className="space-y-0 border-4 border-black">
            {/* Success */}
            <RevealBlock delay={0.05}>
              <div className="flex items-center gap-6 p-6 border-b-4 border-black border-l-[12px] border-l-[#0000FF] hover:bg-gray-50 transition-colors duration-150">
                <div className="w-12 h-12 bg-[#0000FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <polyline points="3,10 8,15 17,5" stroke="white" strokeWidth="3" strokeLinecap="square" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-black uppercase tracking-widest text-xs text-black mb-1">SUCCESS</p>
                  <p className="font-mono text-xs text-gray-700">Operation completed. Form accepted. System nominal.</p>
                </div>
                <div className="w-4 h-4 bg-[#0000FF] flex-shrink-0" />
              </div>
            </RevealBlock>

            {/* Warning */}
            <RevealBlock delay={0.1}>
              <div className="flex items-center gap-6 p-6 border-b-4 border-black border-l-[12px] border-l-[#FFCC00] hover:bg-gray-50 transition-colors duration-150">
                <div className="w-12 h-12 bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <polygon points="10,2 18,17 2,17" stroke="black" strokeWidth="2" fill="none" />
                    <line x1="10" y1="8" x2="10" y2="12" stroke="black" strokeWidth="2" strokeLinecap="square" />
                    <rect x="9" y="14" width="2" height="2" fill="black" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-black uppercase tracking-widest text-xs text-black mb-1">WARNING</p>
                  <p className="font-mono text-xs text-gray-700">Proceed with caution. Review before confirming action.</p>
                </div>
                <div className="w-4 h-4 bg-[#FFCC00] flex-shrink-0" />
              </div>
            </RevealBlock>

            {/* Error */}
            <RevealBlock delay={0.15}>
              <div className="flex items-center gap-6 p-6 border-b-4 border-black border-l-[12px] border-l-[#FF0000] hover:bg-gray-50 transition-colors duration-150">
                <div className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <line x1="5" y1="5" x2="15" y2="15" stroke="white" strokeWidth="3" strokeLinecap="square" />
                    <line x1="15" y1="5" x2="5" y2="15" stroke="white" strokeWidth="3" strokeLinecap="square" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-black uppercase tracking-widest text-xs text-black mb-1">ERROR</p>
                  <p className="font-mono text-xs text-gray-700">Critical failure. System halted. Investigate immediately.</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#FF0000] flex-shrink-0" />
              </div>
            </RevealBlock>

            {/* Info */}
            <RevealBlock delay={0.2}>
              <div className="flex items-center gap-6 p-6 border-l-[12px] border-l-black hover:bg-gray-50 transition-colors duration-150">
                <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
                    <line x1="10" y1="9" x2="10" y2="14" stroke="white" strokeWidth="2" strokeLinecap="square" />
                    <rect x="9" y="6" width="2" height="2" fill="white" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-black uppercase tracking-widest text-xs text-black mb-1">INFORMATION</p>
                  <p className="font-mono text-xs text-gray-700">Additional context available. No action required at this time.</p>
                </div>
                <div className="w-4 h-4 bg-black flex-shrink-0" />
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 9. Grid System Demo ===== */}
      <section className="py-24 px-6 bg-black border-t-4 border-black">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-white pb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF0000] mb-3 font-mono">
                RASTER / GRID SYSTEM
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">
                STRUCTURAL GRID
              </h2>
            </div>
          </RevealBlock>

          {/* 12-column visualization */}
          <RevealBlock delay={0.05} className="mb-8">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 border-2 border-white flex items-center justify-center"
                  style={{
                    backgroundColor: [0, 3, 6, 9].includes(i)
                      ? "#FF0000"
                      : [1, 4, 7, 10].includes(i)
                      ? "#FFCC00"
                      : [2, 5, 8, 11].includes(i)
                      ? "#0000FF"
                      : "white",
                  }}
                >
                  <span
                    className="font-black text-xs"
                    style={{
                      color: [1, 4, 7, 10].includes(i) ? "#000000" : "#FFFFFF",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-white uppercase tracking-widest mt-3 opacity-60">
              12 EQUAL COLUMNS — STRUCTURAL FOUNDATION
            </p>
          </RevealBlock>

          {/* Layout examples */}
          <div className="space-y-4">
            {[
              { label: "12 / 0", cols: [12], colors: ["#FF0000"], textColors: ["white"] },
              { label: "6 / 6", cols: [6, 6], colors: ["#FFCC00", "#0000FF"], textColors: ["black", "white"] },
              { label: "4 / 4 / 4", cols: [4, 4, 4], colors: ["#0000FF", "#FF0000", "#FFCC00"], textColors: ["white", "white", "black"] },
              { label: "3 / 3 / 3 / 3", cols: [3, 3, 3, 3], colors: ["#FF0000", "#FFCC00", "#0000FF", "#000000"], textColors: ["white", "black", "white", "white"] },
              { label: "8 / 4", cols: [8, 4], colors: ["#000000", "#FF0000"], textColors: ["white", "white"] },
              { label: "3 / 9", cols: [3, 9], colors: ["#FFCC00", "#000000"], textColors: ["black", "white"] },
            ].map((row, ri) => (
              <RevealBlock key={row.label} delay={ri * 0.06}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white uppercase tracking-widest w-28 flex-shrink-0 opacity-60">
                    {row.label}
                  </span>
                  <div className="flex-1 grid grid-cols-12 gap-1 h-12">
                    {row.cols.map((span, ci) => (
                      <div
                        key={ci}
                        className={`col-span-${span} h-full border-2 border-white flex items-center justify-center font-black text-xs`}
                        style={{
                          backgroundColor: row.colors[ci],
                          color: row.textColors[ci],
                          gridColumn: `span ${span}`,
                        }}
                      >
                        {span}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. Footer ===== */}
      <footer className="bg-white border-t-4 border-black">
        {/* Geometric accent bar */}
        <div className="flex border-b-4 border-black">
          <div className="flex-1 h-8 bg-[#FF0000]" />
          <div className="w-32 h-8 bg-[#FFCC00]" />
          <div className="w-24 h-8 bg-[#0000FF]" />
          <div className="w-16 h-8 bg-black" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-4 border-black mb-12">
            {/* Brand block */}
            <div className="md:col-span-5 p-8 border-b-4 md:border-b-0 md:border-r-4 border-black bg-black">
              <div className="flex items-center gap-4 mb-6">
                {/* Geometric composition micro */}
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-[#FF0000]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#0000FF]" />
                  <svg width="32" height="28" viewBox="0 0 32 28" className="absolute inset-0 m-auto" fill="none" aria-hidden="true">
                    <polygon points="16,2 30,26 2,26" fill="#FFCC00" stroke="#000000" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-xl text-white">BAUHAUS</p>
                  <p className="font-mono text-xs text-[#FF0000] uppercase tracking-widest">1919 — WEIMAR</p>
                </div>
              </div>
              <p className="font-mono text-xs text-white leading-relaxed opacity-70">
                Das Staatliche Bauhaus. Art school that changed everything.
                Primary colors. Basic geometry. Zero decoration.
                Form follows function — always.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 p-8 border-b-4 md:border-b-0 md:border-r-4 border-black">
              <p className="text-xs font-black uppercase tracking-widest text-[#FF0000] mb-6">SECTIONS</p>
              <ul className="space-y-3">
                {["Hero", "Components", "Palette", "Geometry", "Principles", "Typography"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="font-mono text-xs uppercase tracking-widest text-black hover:text-[#FF0000] transition-colors duration-150"
                    >
                      → {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-4 p-8">
              <p className="text-xs font-black uppercase tracking-widest text-[#0000FF] mb-6">STYLEKIT</p>
              <ul className="space-y-3">
                {[
                  { label: "All Styles", href: "/styles" },
                  { label: "Swiss Style", href: "/styles/swiss-style" },
                  { label: "Swiss Poster", href: "/styles/swiss-poster" },
                  { label: "Art Deco", href: "/styles/art-deco" },
                  { label: "Home", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs uppercase tracking-widest text-black hover:text-[#0000FF] transition-colors duration-150"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Geometry shapes */}
              <div className="flex gap-3 mt-8 pt-6 border-t-4 border-black">
                <div className="w-8 h-8 rounded-full bg-[#FF0000] border-2 border-black" />
                <div className="w-8 h-8 bg-[#FFCC00] border-2 border-black" />
                <svg width="32" height="28" viewBox="0 0 32 28" fill="none" aria-hidden="true">
                  <polygon points="16,2 30,26 2,26" fill="#0000FF" stroke="#000000" strokeWidth="2" />
                </svg>
                <div className="w-8 h-8 bg-black border-2 border-black" />
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t-4 border-black pt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-black">
              BAUHAUS SHOWCASE — STYLEKIT COMPONENT SYSTEM
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                FORM FOLLOWS FUNCTION — 1919
              </span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-[#FF0000]" />
                <div className="w-3 h-3 bg-[#FFCC00]" />
                <div className="w-3 h-3 bg-[#0000FF]" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
