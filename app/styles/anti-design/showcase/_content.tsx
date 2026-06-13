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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const PALETTE = [
  { name: "BLACK", hex: "#000000", textColor: "text-white" },
  { name: "WHITE", hex: "#FFFFFF", textColor: "text-black" },
  { name: "RED", hex: "#FF0000", textColor: "text-white" },
  { name: "BLUE", hex: "#0000FF", textColor: "text-white" },
  { name: "YELLOW", hex: "#FFFF00", textColor: "text-black" },
  { name: "MAGENTA", hex: "#FF00FF", textColor: "text-white" },
  { name: "CYAN", hex: "#00FFFF", textColor: "text-black" },
  { name: "GREEN", hex: "#00FF00", textColor: "text-black" },
];

const RULES_DO = [
  {
    rule: "border-[6px] border-black",
    desc: "Ultra-thick black borders on every single element. 4–8px minimum. No exceptions.",
    color: "#FF0000",
  },
  {
    rule: "shadow-[8px_8px_0_#000]",
    desc: "Hard offset shadows only. Never blurred. Never soft. Never subtle.",
    color: "#0000FF",
  },
  {
    rule: "rotate-[-3deg] / rotate-[5deg]",
    desc: "Text and elements rotated at odd angles. Between -3deg and +5deg. Break the grid.",
    color: "#FFFF00",
  },
  {
    rule: "font-black uppercase",
    desc: "Font weight 900. All uppercase. No apologies. No whispering.",
    color: "#FF00FF",
  },
  {
    rule: "asymmetric borders",
    desc: "Borders thicker on right and bottom. border-r-8 border-b-8. Uneven on purpose.",
    color: "#00FFFF",
  },
  {
    rule: "COLOR CONFLICT",
    desc: "Red next to green. Magenta next to yellow. Cyan on red. Visual conflict is the goal.",
    color: "#00FF00",
  },
  {
    rule: "text-xs next to text-8xl",
    desc: "Wildly mixed font sizes in the same section. Hierarchy is abolished.",
    color: "#FF0000",
  },
  {
    rule: "hover: abrupt flips",
    desc: "On hover: color inverts, borders jump, shadows disappear or double. transition-none only.",
    color: "#0000FF",
  },
];

const RULES_DONT = [
  { rule: "rounded-lg", desc: "Zero border radius. Rounded corners are comfort. Anti-Design rejects comfort." },
  { rule: "text-gray-500", desc: "No muted tones. No subtle colors. Every color must be at 100% saturation." },
  { rule: "shadow-md", desc: "No soft drop shadows. No blur. Only hard, offset, pixel-perfect shadows." },
  { rule: "bg-gradient-to-r", desc: "Gradients are harmony. Anti-Design is conflict. Flat fills only." },
  { rule: "transition-all ease-in-out", desc: "No smooth easing. No gentle transitions. Abrupt or nothing." },
  { rule: "backdrop-blur", desc: "No frosted glass. No blurs of any kind. Everything is sharp." },
  { rule: "gap-4 (consistent)", desc: "No consistent spacing. Rhythm is for music, not Anti-Design." },
  { rule: "text-center (global)", desc: "No enforced alignment. Centered everything is what bad designers do." },
];

const COMPONENT_TABS = ["BUTTONS", "CARDS", "INPUTS", "BADGES"] as const;
type ComponentTab = typeof COMPONENT_TABS[number];

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function AntiDesignShowcase() {
  const [activeTab, setActiveTab] = useState<ComponentTab>("BUTTONS");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white font-mono">

      {/* ---------------------------------------------------------------- */}
      {/* FIXED NAV                                                         */}
      {/* ---------------------------------------------------------------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-0">
            <span
              className="text-xs font-black uppercase tracking-widest border-r-[4px] border-black pr-3 mr-3"
              style={{ transform: "rotate(-2deg)", display: "inline-block" }}
            >
              ANTI
            </span>
            <span
              className="text-2xl font-black uppercase"
              style={{ transform: "rotate(1deg)", display: "inline-block" }}
            >
              DESIGN
            </span>
          </div>

          <div className="hidden md:flex items-center gap-0">
            {["HERO", "COMPONENTS", "PALETTE", "RULES", "DO/DON'T"].map((item, i) => (
              <a
                key={item}
                href={`#section-${i}`}
                className="px-3 py-1 text-xs font-black uppercase border-[3px] border-transparent hover:border-black hover:bg-black hover:text-white"
                style={{ transition: "none" }}
              >
                {item}
              </a>
            ))}
          </div>

          <Link
            href="/styles/anti-design"
            className="text-xs font-black uppercase px-3 py-1 border-[4px] border-black bg-[#FF0000] text-white hover:bg-black hover:text-[#FF0000]"
            style={{ transition: "none" }}
          >
            BACK
          </Link>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="section-0" className="pt-14 min-h-screen bg-white relative overflow-hidden">
        {/* Background chaos blocks */}
        <div
          className="absolute top-20 left-[-40px] w-64 h-64 bg-[#FF0000] border-[8px] border-black"
          style={{ transform: "rotate(-7deg)", zIndex: 0 }}
        />
        <div
          className="absolute top-32 right-[-20px] w-48 h-80 bg-[#0000FF] border-[8px] border-black"
          style={{ transform: "rotate(5deg)", zIndex: 0 }}
        />
        <div
          className="absolute bottom-20 left-1/2 w-72 h-40 bg-[#FFFF00] border-[6px] border-black"
          style={{ transform: "rotate(-3deg) translateX(-50%)", zIndex: 0 }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#00FF00] border-[6px] border-black"
          style={{ transform: "rotate(8deg)", zIndex: 0 }}
        />
        <div
          className="absolute bottom-40 right-1/4 w-24 h-24 bg-[#FF00FF] border-[4px] border-black"
          style={{ transform: "rotate(-5deg)", zIndex: 0 }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-6 md:px-16 max-w-7xl mx-auto">
          <div
            className="bg-white border-[8px] border-black shadow-[16px_16px_0_#000] p-8 md:p-12 max-w-3xl"
            style={{ transform: "rotate(-1deg)" }}
          >
            <p
              className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 border-b-[4px] border-black pb-2"
              style={{ transform: "rotate(2deg)", display: "inline-block" }}
            >
              STYLEKIT PRESENTS
            </p>

            <h1 className="font-black uppercase leading-none mb-0">
              <span
                className="block text-7xl md:text-9xl text-black"
                style={{ transform: "rotate(-2deg)", display: "block" }}
              >
                ANTI-
              </span>
              <span
                className="block text-5xl md:text-7xl text-[#FF0000] border-[6px] border-black px-4 bg-black"
                style={{ transform: "rotate(3deg)", display: "block" }}
              >
                DESIGN
              </span>
            </h1>

            <div className="mt-6 flex items-start gap-4">
              <span
                className="text-xs font-black uppercase bg-[#FF0000] text-white border-[4px] border-black px-3 py-1"
                style={{ transform: "rotate(-3deg)", display: "inline-block" }}
              >
                ANTI-
              </span>
              <p className="text-sm md:text-base font-black uppercase leading-tight max-w-lg">
                EVERY RULE OF UI DESIGN EXISTS TO BE BROKEN.
                THICK BORDERS. CLASHING COLORS. ROTATED TEXT.
                ASYMMETRIC EVERYTHING. THIS IS THE SYSTEM.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-0">
              <button
                className="text-xs font-black uppercase px-6 py-3 bg-black text-white border-[4px] border-black border-r-[8px] border-b-[8px] shadow-[8px_8px_0_#FF0000] hover:bg-[#FF0000] hover:text-black hover:shadow-none"
                style={{ transition: "none" }}
                onClick={() => setModalOpen(true)}
              >
                BREAK THE RULES
              </button>
              <button
                className="text-xs font-black uppercase px-6 py-3 bg-[#FFFF00] text-black border-[4px] border-black border-l-0 hover:bg-black hover:text-[#FFFF00]"
                style={{ transition: "none" }}
              >
                IGNORE CONVENTIONS
              </button>
            </div>
          </div>

          {/* Floating stat blocks */}
          <div
            className="absolute top-24 right-8 md:right-24 bg-[#FF0000] border-[6px] border-black shadow-[8px_8px_0_#000] p-4 z-20"
            style={{ transform: "rotate(4deg)" }}
          >
            <p className="text-4xl font-black text-white">∞</p>
            <p className="text-[9px] font-black uppercase text-white">RULES BROKEN</p>
          </div>
          <div
            className="absolute bottom-32 right-16 md:right-48 bg-[#00FFFF] border-[6px] border-black shadow-[8px_8px_0_#000] p-4 z-20"
            style={{ transform: "rotate(-3deg)" }}
          >
            <p className="text-2xl font-black text-black">8PX</p>
            <p className="text-[9px] font-black uppercase text-black">MAX BORDER</p>
          </div>
          <div
            className="hidden md:block absolute top-48 right-72 bg-[#0000FF] border-[4px] border-black p-3 z-20"
            style={{ transform: "rotate(2deg)" }}
          >
            <p className="text-xs font-black text-white uppercase">NO SOFT SHADOWS</p>
            <p className="text-xs font-black text-white uppercase">NO GRADIENTS</p>
            <p className="text-xs font-black text-white uppercase">NO ROUNDED CORNERS</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* COMPONENT DEMOS                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section id="section-1" className="py-20 bg-[#FFFF00] border-y-[8px] border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <div className="flex items-end gap-4 mb-12">
              <h2
                className="text-5xl md:text-7xl font-black uppercase text-black"
                style={{ transform: "rotate(-2deg)", display: "inline-block" }}
              >
                COMPONENTS
              </h2>
              <span
                className="text-xs font-black uppercase bg-black text-[#FFFF00] border-[4px] border-black px-3 py-1 mb-2"
                style={{ transform: "rotate(3deg)", display: "inline-block" }}
              >
                ALL WRONG ON PURPOSE
              </span>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-0 mb-12 border-[4px] border-black w-fit">
              {COMPONENT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-black uppercase border-r-[4px] border-black last:border-r-0 ${
                    activeTab === tab
                      ? "bg-black text-[#FFFF00]"
                      : "bg-white text-black hover:bg-[#FF0000] hover:text-white"
                  }`}
                  style={{ transition: "none" }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* BUTTONS tab */}
          {activeTab === "BUTTONS" && (
            <RevealBlock delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary button */}
                <div className="bg-white border-[6px] border-black shadow-[8px_8px_0_#000] p-8">
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-black pb-2 tracking-widest">
                    PRIMARY BUTTON
                  </p>
                  <div className="flex flex-col gap-4">
                    <button
                      className="font-black uppercase text-sm px-6 py-3 bg-[#FF0000] text-white border-[4px] border-black border-r-[8px] border-b-[8px] shadow-[8px_8px_0_#000] hover:bg-black hover:text-[#FF0000] hover:shadow-none hover:border-r-[4px] hover:border-b-[4px] active:shadow-none"
                      style={{ transition: "none" }}
                    >
                      DESTROY CONVENTION
                    </button>
                    <p className="text-[10px] font-black uppercase text-gray-600">
                      bg-[#FF0000] · border-r-[8px] border-b-[8px] · shadow-[8px_8px_0_#000]
                    </p>
                  </div>
                </div>

                {/* Secondary button */}
                <div className="bg-[#0000FF] border-[6px] border-black shadow-[8px_8px_0_#FF0000] p-8">
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-white pb-2 tracking-widest text-white">
                    SECONDARY BUTTON
                  </p>
                  <div className="flex flex-col gap-4">
                    <button
                      className="font-black uppercase text-sm px-6 py-3 bg-white text-black border-[4px] border-black hover:bg-[#FFFF00] hover:border-[6px]"
                      style={{ transition: "none" }}
                    >
                      REJECT HARMONY
                    </button>
                    <p className="text-[10px] font-black uppercase text-white">
                      bg-white · border-black · hover: bg-[#FFFF00] · transition-none
                    </p>
                  </div>
                </div>

                {/* Danger button */}
                <div className="bg-black border-[6px] border-black p-8" style={{ transform: "rotate(-1deg)" }}>
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-[#FF0000] pb-2 tracking-widest text-white">
                    DANGER / DESTRUCTIVE
                  </p>
                  <div className="flex flex-col gap-4">
                    <button
                      className="font-black uppercase text-xl px-6 py-3 bg-[#FF0000] text-white border-[6px] border-white shadow-[12px_12px_0_#FF0000] hover:bg-white hover:text-[#FF0000] hover:shadow-none"
                      style={{ transition: "none" }}
                    >
                      DELETE EVERYTHING
                    </button>
                    <p className="text-[10px] font-black uppercase text-gray-400">
                      text-xl · shadow-[12px_12px_0_#FF0000] · hover: invert
                    </p>
                  </div>
                </div>

                {/* Ghost / outline button */}
                <div className="bg-[#00FFFF] border-[6px] border-black shadow-[8px_8px_0_#0000FF] p-8">
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-black pb-2 tracking-widest">
                    OUTLINE VARIANT
                  </p>
                  <div className="flex flex-col gap-4">
                    <button
                      className="font-black uppercase text-sm px-6 py-3 bg-transparent text-black border-[4px] border-black hover:bg-black hover:text-[#00FFFF]"
                      style={{ transition: "none" }}
                    >
                      GHOST PROTOCOL
                    </button>
                    <button
                      onMouseDown={() => setPressedBtn("ghost")}
                      onMouseUp={() => setPressedBtn(null)}
                      className={`font-black uppercase text-sm px-6 py-3 border-[4px] border-black ${
                        pressedBtn === "ghost"
                          ? "bg-[#FF00FF] text-white shadow-none"
                          : "bg-white text-black shadow-[4px_4px_0_#000]"
                      }`}
                      style={{ transition: "none" }}
                    >
                      {pressedBtn === "ghost" ? "ACTIVATED" : "PRESS ME"}
                    </button>
                    <p className="text-[10px] font-black uppercase">
                      mousedown state: bg-[#FF00FF] · transition-none
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* CARDS tab */}
          {activeTab === "CARDS" && (
            <RevealBlock delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {[
                  { bg: "#FF0000", accent: "#FFFF00", title: "CARD ONE", rot: "-rotate-2", shadowColor: "#0000FF" },
                  { bg: "#0000FF", accent: "#FF00FF", title: "CARD TWO", rot: "rotate-1", shadowColor: "#FF0000" },
                  { bg: "#FFFF00", accent: "#00FFFF", title: "CARD THREE", rot: "-rotate-1", shadowColor: "#00FF00" },
                  { bg: "#00FF00", accent: "#FF0000", title: "CARD FOUR", rot: "rotate-3", shadowColor: "#FF00FF" },
                  { bg: "#FF00FF", accent: "#FFFF00", title: "CARD FIVE", rot: "-rotate-2", shadowColor: "#00FFFF" },
                  { bg: "#00FFFF", accent: "#0000FF", title: "CARD SIX", rot: "rotate-2", shadowColor: "#FF0000" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`border-[6px] border-black p-6 cursor-pointer ${card.rot}`}
                    style={{
                      backgroundColor: hoveredCard === i ? card.accent : card.bg,
                      boxShadow: hoveredCard === i ? "none" : `10px 10px 0 #000`,
                      transition: "none",
                      zIndex: hoveredCard === i ? 10 : 1,
                      position: "relative",
                    }}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <p className="text-[9px] font-black uppercase mb-2 text-black">ITEM {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="text-2xl font-black uppercase text-black leading-none mb-4">{card.title}</h3>
                    <div className="border-t-[4px] border-black pt-3">
                      <p className="text-xs font-black uppercase text-black">
                        {hoveredCard === i ? "COLOR INVERTED ON HOVER" : "HOVER TO BREAK"}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-xs font-black text-black border-[2px] border-black px-1">
                        {`0${i + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* INPUTS tab */}
          {activeTab === "INPUTS" && (
            <RevealBlock delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Text input */}
                <div className="bg-white border-[6px] border-black shadow-[8px_8px_0_#FF0000] p-8">
                  <p className="text-[10px] font-black uppercase mb-4 tracking-widest border-b-[3px] border-black pb-2">
                    TEXT INPUT
                  </p>
                  <label className="block text-xs font-black uppercase mb-2 rotate-[-1deg]">
                    YOUR NAME (IF YOU DARE)
                  </label>
                  <input
                    type="text"
                    placeholder="TYPE SOMETHING WRONG"
                    className="w-full font-black uppercase text-sm px-4 py-3 bg-[#FFFF00] text-black border-[4px] border-black border-r-[8px] border-b-[8px] outline-none focus:bg-[#FF0000] focus:text-white focus:border-[6px] placeholder:text-black placeholder:opacity-60"
                    style={{ transition: "none" }}
                  />
                  <p className="text-[9px] font-black uppercase mt-2 text-gray-500">
                    focus: bg-[#FF0000] · transition-none · uppercase placeholder
                  </p>
                </div>

                {/* Textarea */}
                <div className="bg-[#0000FF] border-[6px] border-black shadow-[8px_8px_0_#00FF00] p-8" style={{ transform: "rotate(1deg)" }}>
                  <p className="text-[10px] font-black uppercase mb-4 tracking-widest border-b-[3px] border-white pb-2 text-white">
                    TEXTAREA
                  </p>
                  <label className="block text-xs font-black uppercase mb-2 text-white">
                    RANT HERE
                  </label>
                  <textarea
                    placeholder="ALL CAPS. NO PUNCTUATION. NO MERCY."
                    rows={4}
                    className="w-full font-black uppercase text-xs px-4 py-3 bg-white text-black border-[4px] border-black outline-none focus:bg-[#FFFF00] focus:border-[6px] resize-none placeholder:text-gray-400 placeholder:text-xs"
                    style={{ transition: "none" }}
                  />
                </div>

                {/* Select */}
                <div className="bg-[#00FFFF] border-[6px] border-black shadow-[8px_8px_0_#FF00FF] p-8">
                  <p className="text-[10px] font-black uppercase mb-4 tracking-widest border-b-[3px] border-black pb-2">
                    SELECT / DROPDOWN
                  </p>
                  <select
                    className="w-full font-black uppercase text-xs px-4 py-3 bg-[#FF0000] text-white border-[4px] border-black border-r-[8px] border-b-[8px] outline-none appearance-none"
                    style={{ transition: "none" }}
                  >
                    <option>CHOOSE YOUR POISON</option>
                    <option>DESTROY THE GRID</option>
                    <option>BREAK EVERY RULE</option>
                    <option>MAXIMUM CHAOS</option>
                    <option>REJECT SUBTLETY</option>
                  </select>
                  <p className="text-[9px] font-black uppercase mt-2">
                    bg-[#FF0000] · appearance-none · border-r-[8px]
                  </p>
                </div>

                {/* Checkbox group */}
                <div className="bg-[#FF00FF] border-[6px] border-black shadow-[8px_8px_0_#000] p-8" style={{ transform: "rotate(-1deg)" }}>
                  <p className="text-[10px] font-black uppercase mb-4 tracking-widest border-b-[3px] border-black pb-2 text-white">
                    CHECKBOXES
                  </p>
                  {["ANTI-HARMONY", "PRO-CONFLICT", "NO GRADIENTS", "ALL BORDERS"].map((item) => (
                    <label key={item} className="flex items-center gap-3 mb-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-[3px] border-black appearance-none bg-white checked:bg-black"
                        style={{ transition: "none" }}
                      />
                      <span className="text-xs font-black uppercase text-white group-hover:text-[#FFFF00]" style={{ transition: "none" }}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </RevealBlock>
          )}

          {/* BADGES tab */}
          {activeTab === "BADGES" && (
            <RevealBlock delay={0.15}>
              <div className="space-y-8">
                {/* Inline badges */}
                <div className="bg-white border-[6px] border-black shadow-[8px_8px_0_#000] p-8">
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-black pb-2 tracking-widest">
                    STATUS BADGES
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    {[
                      { label: "NEW", bg: "#FF0000", text: "#FFFFFF", rot: "-rotate-2" },
                      { label: "BROKEN", bg: "#0000FF", text: "#FFFFFF", rot: "rotate-3" },
                      { label: "WRONG", bg: "#FFFF00", text: "#000000", rot: "-rotate-1" },
                      { label: "LOUD", bg: "#FF00FF", text: "#FFFFFF", rot: "rotate-2" },
                      { label: "CHAOTIC", bg: "#00FFFF", text: "#000000", rot: "-rotate-3" },
                      { label: "ANTI", bg: "#00FF00", text: "#000000", rot: "rotate-1" },
                      { label: "CORRUPT", bg: "#000000", text: "#FF0000", rot: "-rotate-2" },
                    ].map((badge) => (
                      <span
                        key={badge.label}
                        className={`text-xs font-black uppercase px-3 py-1 border-[3px] border-black shadow-[4px_4px_0_#000] ${badge.rot} hover:shadow-none hover:scale-110`}
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                          transition: "none",
                        }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notification badges */}
                <div className="bg-[#FF0000] border-[6px] border-black shadow-[8px_8px_0_#0000FF] p-8">
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-white pb-2 tracking-widest text-white">
                    NOTIFICATION COUNTERS
                  </p>
                  <div className="flex flex-wrap gap-8 items-center">
                    {[
                      { label: "INBOX", count: "99+", badgeBg: "#FFFF00", badgeText: "#000000" },
                      { label: "ALERTS", count: "∞", badgeBg: "#00FF00", badgeText: "#000000" },
                      { label: "ERRORS", count: "404", badgeBg: "#0000FF", badgeText: "#FFFFFF" },
                    ].map((item) => (
                      <div key={item.label} className="relative inline-flex items-center">
                        <div className="text-sm font-black uppercase text-white border-[4px] border-white px-4 py-2 bg-black">
                          {item.label}
                        </div>
                        <span
                          className="absolute -top-3 -right-3 text-xs font-black border-[3px] border-black px-2 py-0.5"
                          style={{
                            backgroundColor: item.badgeBg,
                            color: item.badgeText,
                            transform: "rotate(5deg)",
                          }}
                        >
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tag cloud chaos */}
                <div className="bg-black border-[6px] border-black p-8" style={{ transform: "rotate(-0.5deg)" }}>
                  <p className="text-[10px] font-black uppercase mb-6 border-b-[3px] border-[#FF0000] pb-2 tracking-widest text-white">
                    TAG CLOUD (CHAOTIC)
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { tag: "#anti", size: "text-3xl", color: "#FF0000", rot: "-rotate-3" },
                      { tag: "#ugly", size: "text-xs", color: "#FFFF00", rot: "rotate-2" },
                      { tag: "#wrong", size: "text-5xl", color: "#00FFFF", rot: "-rotate-1" },
                      { tag: "#loud", size: "text-sm", color: "#FF00FF", rot: "rotate-4" },
                      { tag: "#broken", size: "text-2xl", color: "#00FF00", rot: "-rotate-2" },
                      { tag: "#raw", size: "text-6xl", color: "#FFFFFF", rot: "rotate-1" },
                      { tag: "#chaos", size: "text-xs", color: "#FF0000", rot: "-rotate-3" },
                      { tag: "#pure", size: "text-4xl", color: "#0000FF", rot: "rotate-2" },
                    ].map((t) => (
                      <span
                        key={t.tag}
                        className={`${t.size} font-black uppercase ${t.rot} hover:line-through`}
                        style={{ color: t.color, transition: "none" }}
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* COLOR PALETTE                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section id="section-2" className="py-20 bg-black border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <div className="mb-12">
              <h2
                className="text-5xl md:text-8xl font-black uppercase text-white inline-block"
                style={{ transform: "rotate(2deg)", display: "inline-block" }}
              >
                COLOR
              </h2>
              <span
                className="text-xs font-black uppercase text-black bg-[#FFFF00] border-[4px] border-white px-3 py-1 ml-4 inline-block"
                style={{ transform: "rotate(-3deg)", display: "inline-block" }}
              >
                PALETTE
              </span>
              <p className="text-xs font-black uppercase text-white mt-4">
                8 COLORS. 0 SUBTLETY. 100% SATURATION. NO APOLOGIES.
              </p>
            </div>
          </RevealBlock>

          {/* Chaotic color grid */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {PALETTE.map((color, i) => (
                <div
                  key={color.hex}
                  className={`border-[4px] border-black p-6 group cursor-default ${
                    i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : "rotate-0"
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    borderWidth: i % 2 === 0 ? "4px" : "6px",
                    boxShadow: i % 2 === 0 ? "8px 8px 0 #FF0000" : "8px 8px 0 #0000FF",
                    transition: "none",
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  <p className={`text-3xl font-black ${color.textColor} group-hover:opacity-0`} style={{ transition: "none" }}>
                    {color.name}
                  </p>
                  <p className={`text-xs font-black uppercase mt-2 ${color.textColor} opacity-70`}>
                    {color.hex}
                  </p>
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    style={{ transition: "none", backgroundColor: color.hex === "#000000" ? "#FFFFFF" : "#000000" }}
                  >
                    <p
                      className="text-4xl font-black uppercase"
                      style={{ color: color.hex, transition: "none" }}
                    >
                      {color.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color usage guide */}
          <RevealBlock delay={0.2}>
            <div className="mt-12 border-[6px] border-white shadow-[8px_8px_0_#FF0000] p-8" style={{ transform: "rotate(-1deg)" }}>
              <p className="text-[10px] font-black uppercase text-white mb-6 border-b-[3px] border-white pb-3 tracking-widest">
                HOW TO USE THESE COLORS (WRONG WAY ONLY)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FF0000] border-[4px] border-white p-4">
                  <p className="text-xs font-black uppercase text-white">RED + CYAN</p>
                  <p className="text-[9px] font-black uppercase text-white opacity-80 mt-1">
                    Maximum complementary conflict
                  </p>
                </div>
                <div className="bg-[#0000FF] border-[4px] border-[#FFFF00] border-r-[8px] border-b-[8px] p-4">
                  <p className="text-xs font-black uppercase text-[#FFFF00]">BLUE + YELLOW</p>
                  <p className="text-[9px] font-black uppercase text-white opacity-80 mt-1">
                    Classic anti-harmony pair
                  </p>
                </div>
                <div className="bg-[#00FF00] border-[4px] border-[#FF00FF] p-4" style={{ transform: "rotate(2deg)" }}>
                  <p className="text-xs font-black uppercase text-[#FF00FF]">GREEN + MAGENTA</p>
                  <p className="text-[9px] font-black uppercase text-black opacity-80 mt-1">
                    Visual aggression at 100%
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TYPOGRAPHY / DESIGN RULES                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="section-3" className="py-20 bg-white border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <div className="mb-16">
              <span
                className="text-[10px] font-black uppercase tracking-[0.5em] border-[3px] border-black px-3 py-1 bg-[#FF0000] text-white inline-block"
                style={{ transform: "rotate(-2deg)", display: "inline-block" }}
              >
                TYPOGRAPHY
              </span>
              <h2
                className="text-5xl md:text-7xl font-black uppercase mt-4"
                style={{ transform: "rotate(1deg)", display: "block" }}
              >
                TYPE IS A WEAPON
              </h2>
            </div>
          </RevealBlock>

          {/* Typography specimens */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

              {/* Mixed scale demo */}
              <div className="border-[6px] border-black shadow-[8px_8px_0_#FF0000] p-8 bg-white">
                <p className="text-[10px] font-black uppercase mb-4 border-b-[3px] border-black pb-2 tracking-widest">
                  MIXED SCALE (MANDATORY)
                </p>
                <div className="space-y-0">
                  <p className="text-xs font-black uppercase text-gray-500">tiny context that barely matters</p>
                  <p className="text-8xl font-black uppercase leading-none text-black -rotate-1">BIG</p>
                  <p className="text-xs font-black uppercase">small label beneath the scream</p>
                  <p className="text-5xl font-black uppercase text-[#FF0000] rotate-2">LOUDER</p>
                  <p className="text-[10px] font-black uppercase text-gray-400">footnote: this is intentional</p>
                  <p className="text-9xl font-black uppercase leading-none -rotate-1">!</p>
                </div>
              </div>

              {/* Rotation demo */}
              <div className="border-[6px] border-black shadow-[8px_8px_0_#0000FF] p-8 bg-[#0000FF] relative overflow-hidden">
                <p className="text-[10px] font-black uppercase mb-4 border-b-[3px] border-white pb-2 tracking-widest text-white">
                  ROTATION SCALE
                </p>
                {[
                  { deg: -3, text: "MINUS THREE DEG", color: "#FFFFFF", size: "text-xl" },
                  { deg: -1, text: "MINUS ONE", color: "#FFFF00", size: "text-2xl" },
                  { deg: 0, text: "HORIZONTAL (BORING)", color: "#FF0000", size: "text-sm" },
                  { deg: 2, text: "PLUS TWO", color: "#00FFFF", size: "text-3xl" },
                  { deg: 5, text: "PLUS FIVE DEG", color: "#00FF00", size: "text-lg" },
                ].map((item) => (
                  <p
                    key={item.deg}
                    className={`font-black uppercase ${item.size} my-1`}
                    style={{ transform: `rotate(${item.deg}deg)`, color: item.color, display: "block" }}
                  >
                    {item.text}
                  </p>
                ))}
              </div>

              {/* Weight / case demo */}
              <div className="border-[6px] border-black shadow-[8px_8px_0_#00FF00] p-8 bg-[#FFFF00]" style={{ transform: "rotate(-0.5deg)" }}>
                <p className="text-[10px] font-black uppercase mb-4 border-b-[3px] border-black pb-2 tracking-widest">
                  WEIGHT: BLACK ONLY
                </p>
                <p className="text-4xl font-black uppercase text-black">font-black</p>
                <p className="text-2xl font-black uppercase text-black">UPPERCASE ALWAYS</p>
                <p className="text-xs font-black uppercase text-black">TRACKING-WIDEST FOR LABELS</p>
                <p className="text-6xl font-black uppercase text-[#FF0000] leading-none rotate-3">900</p>
                <p className="text-[9px] font-black uppercase text-black mt-2">
                  font-weight 900. no 400. no 300. no thin. ever.
                </p>
              </div>

              {/* Asymmetric layout demo */}
              <div className="border-[6px] border-black shadow-[8px_8px_0_#FF00FF] p-8 bg-black">
                <p className="text-[10px] font-black uppercase mb-4 border-b-[3px] border-[#FF0000] pb-2 tracking-widest text-white">
                  ASYMMETRIC LAYOUT
                </p>
                <div className="flex items-start gap-0">
                  <div className="border-r-[6px] border-[#FF0000] pr-4 mr-4">
                    <p className="text-7xl font-black text-white leading-none">A</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-[#FFFF00] rotate-2">ANTI-DESIGN</p>
                    <p className="text-3xl font-black uppercase text-[#FF0000] leading-none -rotate-1">ASYMMETRIC</p>
                    <p className="text-[10px] font-black uppercase text-white mt-2">
                      left-heavy · off-balance · intentional
                    </p>
                  </div>
                </div>
                <div className="mt-6 bg-[#FF0000] border-[4px] border-white p-3" style={{ transform: "rotate(-2deg)" }}>
                  <p className="text-xs font-black uppercase text-white">
                    BORDERS THICKER ON RIGHT AND BOTTOM. ALWAYS.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* HOVER / INTERACTION PATTERNS                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 bg-[#FF0000] border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <h2
              className="text-5xl md:text-7xl font-black uppercase text-white mb-4 inline-block"
              style={{ transform: "rotate(-2deg)", display: "inline-block" }}
            >
              INTERACTION
            </h2>
            <p className="text-xs font-black uppercase text-white mb-12">
              HOVER STATES: ABRUPT. BINARY. ZERO EASE.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Color flip card */}
              <div
                className="border-[6px] border-black p-8 cursor-pointer group bg-white hover:bg-black shadow-[8px_8px_0_#000] hover:shadow-none"
                style={{ transition: "none" }}
              >
                <p className="text-xs font-black uppercase text-black group-hover:text-white mb-2" style={{ transition: "none" }}>
                  COLOR FLIP
                </p>
                <p className="text-3xl font-black uppercase text-black group-hover:text-[#FF0000] leading-none" style={{ transition: "none" }}>
                  HOVER ME
                </p>
                <p className="text-[9px] font-black uppercase text-black group-hover:text-white mt-4" style={{ transition: "none" }}>
                  bg: white → black · text: black → red · shadow: 8px → none
                </p>
                <div className="mt-4 border-[3px] border-black group-hover:border-[#FF0000] w-12 h-2 bg-black group-hover:bg-[#FF0000]" style={{ transition: "none" }} />
              </div>

              {/* Border jump card */}
              <div
                className="border-[4px] border-black group-hover:border-[8px] p-8 cursor-pointer group bg-[#0000FF] shadow-[4px_4px_0_#000] hover:shadow-[16px_16px_0_#FFFF00]"
                style={{ transition: "none", transform: "rotate(-1deg)" }}
              >
                <p className="text-xs font-black uppercase text-white mb-2">
                  BORDER JUMP
                </p>
                <p className="text-3xl font-black uppercase text-white leading-none">
                  HOVER ME
                </p>
                <p className="text-[9px] font-black uppercase text-white mt-4">
                  border: 4px → 8px · shadow: 4px → 16px yellow
                </p>
                <div className="mt-4 h-2 bg-[#FFFF00] group-hover:h-8" style={{ transition: "none" }} />
              </div>

              {/* Invert card */}
              <div
                className="border-[6px] border-black p-8 cursor-pointer group bg-[#FFFF00] hover:bg-[#FF00FF] shadow-[8px_8px_0_#000] hover:shadow-[8px_8px_0_#000]"
                style={{ transition: "none", transform: "rotate(2deg)" }}
              >
                <p className="text-xs font-black uppercase text-black group-hover:text-white mb-2" style={{ transition: "none" }}>
                  ACCENT SWAP
                </p>
                <p className="text-3xl font-black uppercase text-black group-hover:text-white leading-none" style={{ transition: "none" }}>
                  HOVER ME
                </p>
                <p className="text-[9px] font-black uppercase text-black group-hover:text-white mt-4" style={{ transition: "none" }}>
                  yellow → magenta · text inverts · no transition
                </p>
                <div
                  className="mt-4 border-[3px] border-black group-hover:border-white px-2 py-1 inline-block"
                  style={{ transition: "none" }}
                >
                  <span className="text-xs font-black uppercase text-black group-hover:text-white" style={{ transition: "none" }}>
                    TAG
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Hover rule note */}
          <RevealBlock delay={0.2}>
            <div className="mt-8 border-[6px] border-black bg-black shadow-[8px_8px_0_#FFFF00] p-6" style={{ transform: "rotate(-0.5deg)" }}>
              <p className="text-xs font-black uppercase text-[#FFFF00] mb-2">THE HOVER RULE:</p>
              <p className="text-sm font-black uppercase text-white">
                EVERY INTERACTIVE ELEMENT MUST FEEL LIKE FLIPPING A SWITCH.
                NOT SLIDING A DIAL. NOT FADING A LIGHT. FLIPPING. A. SWITCH.
                TRANSITION-NONE IS NOT A SHORTCUT — IT IS THE PHILOSOPHY.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DO / DON'T                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="section-4" className="py-20 bg-white border-b-[8px] border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <div className="mb-16 flex items-end gap-6">
              <h2
                className="text-5xl md:text-7xl font-black uppercase"
                style={{ transform: "rotate(-1deg)", display: "inline-block" }}
              >
                DO
              </h2>
              <span className="text-5xl md:text-7xl font-black uppercase text-gray-300">—</span>
              <h2
                className="text-5xl md:text-7xl font-black uppercase text-gray-300"
                style={{ transform: "rotate(2deg)", display: "inline-block" }}
              >
                DON'T
              </h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* DO column */}
            <div className="border-[6px] border-black border-r-[3px]">
              <div className="bg-[#00FF00] border-b-[6px] border-black px-6 py-4">
                <p className="text-xl font-black uppercase text-black">DO THESE THINGS</p>
              </div>
              <div className="divide-y-[4px] divide-black">
                {RULES_DO.map((rule, i) => (
                  <RevealBlock key={rule.rule} delay={i * 0.05}>
                    <div
                      className="p-6 group hover:bg-black cursor-default"
                      style={{ transition: "none" }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-3 h-3 mt-1 border-[3px] border-black group-hover:border-white flex-shrink-0"
                          style={{ backgroundColor: rule.color, transition: "none" }}
                        />
                        <div>
                          <p className="text-xs font-black uppercase text-black group-hover:text-[#00FF00] mb-1" style={{ transition: "none" }}>
                            {rule.rule}
                          </p>
                          <p className="text-[10px] font-black uppercase text-gray-600 group-hover:text-white" style={{ transition: "none" }}>
                            {rule.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* DON'T column */}
            <div className="border-[6px] border-black border-l-[3px]">
              <div className="bg-[#FF0000] border-b-[6px] border-black px-6 py-4">
                <p className="text-xl font-black uppercase text-white">DON'T DO THESE</p>
              </div>
              <div className="divide-y-[4px] divide-black">
                {RULES_DONT.map((rule, i) => (
                  <RevealBlock key={rule.rule} delay={i * 0.05}>
                    <div
                      className="p-6 group hover:bg-black cursor-default"
                      style={{ transition: "none" }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-xl font-black text-[#FF0000] group-hover:text-[#FF0000] flex-shrink-0 leading-none" style={{ transition: "none" }}>
                          ×
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase text-gray-400 line-through mb-1">
                            {rule.rule}
                          </p>
                          <p className="text-[10px] font-black uppercase text-gray-600 group-hover:text-white" style={{ transition: "none" }}>
                            {rule.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SHADOW SYSTEM                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 bg-[#0000FF]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <h2
              className="text-5xl md:text-7xl font-black uppercase text-white mb-4 inline-block"
              style={{ transform: "rotate(2deg)", display: "inline-block" }}
            >
              SHADOW
            </h2>
            <p className="text-xs font-black uppercase text-[#FFFF00] mb-12">
              HARD. OFFSET. ZERO BLUR. THAT IS ALL.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { size: "4px", shadow: "4px_4px_0", color: "#000000", label: "SMALL", bg: "#FF0000" },
                { size: "8px", shadow: "8px_8px_0", color: "#000000", label: "DEFAULT", bg: "#FFFF00" },
                { size: "12px", shadow: "12px_12px_0", color: "#000000", label: "LARGE", bg: "#00FF00" },
                { size: "16px", shadow: "16px_16px_0", color: "#FF0000", label: "MASSIVE", bg: "#FFFFFF" },
              ].map((s) => (
                <div
                  key={s.size}
                  className="border-[6px] border-black p-8 -rotate-1 hover:rotate-1"
                  style={{
                    backgroundColor: s.bg,
                    boxShadow: `${s.size} ${s.size} 0 ${s.color}`,
                    transition: "none",
                  }}
                >
                  <p className="text-xs font-black uppercase text-black mb-2">{s.label}</p>
                  <p className="text-2xl font-black text-black">{s.size}</p>
                  <p className="text-[9px] font-black uppercase text-black mt-2">
                    shadow-[{s.shadow}_{s.color}]
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div
              className="mt-12 bg-black border-[8px] border-white shadow-[16px_16px_0_#FF0000] p-8"
              style={{ transform: "rotate(-1deg)" }}
            >
              <p className="text-xs font-black uppercase text-[#FF0000] mb-4 border-b-[3px] border-[#FF0000] pb-2">
                SHADOW DIRECTION: ALWAYS BOTTOM-RIGHT
              </p>
              <p className="text-sm font-black uppercase text-white">
                THE SHADOW MUST ALWAYS GO TO THE BOTTOM-RIGHT.
                BOTTOM-LEFT IS A MISTAKE. TOP SHADOW IS FORBIDDEN.
                CENTERED GLOW IS NOT A SHADOW — IT IS A SIN.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* MANIFESTO                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 bg-[#FFFF00] border-y-[8px] border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <div className="border-[8px] border-black shadow-[16px_16px_0_#000] bg-white p-8 md:p-16" style={{ transform: "rotate(-1deg)" }}>
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 border-b-[4px] border-black pb-4"
                style={{ transform: "rotate(1deg)", display: "inline-block" }}
              >
                THE ANTI-DESIGN MANIFESTO
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    statement: "BEAUTY IS A LIE.",
                    sub: "WHAT IS CALLED BEAUTIFUL IS ONLY WHAT IS FAMILIAR. ANTI-DESIGN MAKES STRANGE.",
                    color: "#FF0000",
                    rot: "-rotate-1",
                  },
                  {
                    num: "02",
                    statement: "CONSISTENCY IS CONFORMITY.",
                    sub: "CONSISTENT SPACING. CONSISTENT COLOR. CONSISTENT COWARDICE. ANTI-DESIGN REFUSES.",
                    color: "#0000FF",
                    rot: "rotate-2",
                  },
                  {
                    num: "03",
                    statement: "HARMONY IS CONTROL.",
                    sub: "COMPLEMENTARY COLORS WERE INVENTED TO SUPPRESS VISUAL CONFLICT. WE RESTORE IT.",
                    color: "#00FF00",
                    rot: "-rotate-2",
                  },
                  {
                    num: "04",
                    statement: "THICK BORDERS ARE HONESTY.",
                    sub: "A 1PX BORDER PRETENDS TO NOT BE THERE. A 8PX BORDER ANNOUNCES ITSELF PROUDLY.",
                    color: "#FF00FF",
                    rot: "rotate-1",
                  },
                ].map((item) => (
                  <div key={item.num} className={`flex items-start gap-6 ${item.rot}`}>
                    <span
                      className="text-4xl font-black flex-shrink-0"
                      style={{ color: item.color }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <p className="text-xl md:text-3xl font-black uppercase text-black leading-tight mb-2">
                        {item.statement}
                      </p>
                      <p className="text-xs font-black uppercase text-gray-500">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                             */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-black border-t-[8px] border-[#FF0000] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Brand */}
              <div className="border-[4px] border-white border-r-[4px] p-8" style={{ transform: "rotate(-1deg)" }}>
                <p
                  className="text-3xl font-black uppercase text-white mb-2 rotate-2"
                  style={{ display: "inline-block" }}
                >
                  ANTI-
                </p>
                <p className="text-5xl font-black uppercase text-[#FF0000]">DESIGN</p>
                <p className="text-[9px] font-black uppercase text-white mt-4 opacity-60">
                  A STYLEKIT DESIGN SYSTEM
                </p>
                <p className="text-[9px] font-black uppercase text-white opacity-40">
                  BREAKING RULES SINCE ALWAYS
                </p>
              </div>

              {/* Specs */}
              <div className="border-[4px] border-white border-r-[4px] p-8">
                <p className="text-[10px] font-black uppercase text-[#FFFF00] mb-6 border-b-[2px] border-[#FFFF00] pb-2 tracking-widest">
                  CORE SPECS
                </p>
                {[
                  { label: "BORDER MIN", value: "4PX" },
                  { label: "BORDER MAX", value: "8PX" },
                  { label: "BORDER RADIUS", value: "0PX" },
                  { label: "SHADOW BLUR", value: "0PX" },
                  { label: "TRANSITION", value: "NONE" },
                  { label: "ROTATION RANGE", value: "-3 TO +5 DEG" },
                  { label: "FONT WEIGHT", value: "900 ONLY" },
                  { label: "COLOR SATURATION", value: "100%" },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b-[2px] border-gray-800 py-1">
                    <span className="text-[9px] font-black uppercase text-gray-500">{spec.label}</span>
                    <span className="text-[9px] font-black uppercase text-white">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="border-[4px] border-white p-8" style={{ transform: "rotate(1deg)" }}>
                <p className="text-[10px] font-black uppercase text-[#00FFFF] mb-6 border-b-[2px] border-[#00FFFF] pb-2 tracking-widest">
                  LINKS
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "STYLE PAGE", href: "/styles/anti-design" },
                    { label: "ALL STYLES", href: "/styles" },
                    { label: "SHOWCASE", href: "/styles/anti-design/showcase" },
                    { label: "TEMPLATES", href: "/templates" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-xs font-black uppercase text-white border-b-[2px] border-transparent hover:border-[#FF0000] hover:text-[#FF0000] pb-1 w-fit"
                      style={{ transition: "none" }}
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>

                {/* Color swatches footer */}
                <div className="flex gap-0 mt-8">
                  {["#FF0000", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#00FF00"].map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 border-[2px] border-white hover:scale-150 hover:z-10 relative"
                      style={{ backgroundColor: color, transition: "none" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-8 border-t-[6px] border-[#FF0000] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              <p className="text-[9px] font-black uppercase text-gray-600">
                ANTI-DESIGN SYSTEM · STYLEKIT · ALL RULES BROKEN
              </p>
              <p
                className="text-[9px] font-black uppercase text-[#FF0000]"
                style={{ transform: "rotate(2deg)", display: "inline-block" }}
              >
                NO RIGHTS. NO HARMONY. NO MERCY.
              </p>
            </div>
          </RevealBlock>
        </div>
      </footer>

      {/* ---------------------------------------------------------------- */}
      {/* MODAL (triggered by hero button)                                   */}
      {/* ---------------------------------------------------------------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setModalOpen(false)}
          style={{ transition: "none" }}
        >
          <div
            className="bg-[#FF0000] border-[8px] border-white shadow-[16px_16px_0_#FFFF00] p-8 md:p-16 max-w-lg w-full mx-4"
            style={{ transform: "rotate(-3deg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] font-black uppercase text-white mb-4 tracking-widest border-b-[3px] border-white pb-2">
              RULE BROKEN
            </p>
            <h3 className="text-4xl font-black uppercase text-white mb-4 leading-none">
              YOU CLICKED THE WRONG BUTTON.
            </h3>
            <p className="text-xs font-black uppercase text-white opacity-80 mb-8">
              THERE ARE NO RIGHT BUTTONS IN ANTI-DESIGN.
              EVERY CLICK IS BOTH RIGHT AND WRONG SIMULTANEOUSLY.
              THIS IS THE SYSTEM WORKING AS INTENDED.
            </p>
            <div className="flex gap-0">
              <button
                className="text-xs font-black uppercase px-6 py-3 bg-black text-white border-[4px] border-white hover:bg-white hover:text-black flex-1"
                style={{ transition: "none" }}
                onClick={() => setModalOpen(false)}
              >
                ACCEPT CHAOS
              </button>
              <button
                className="text-xs font-black uppercase px-6 py-3 bg-white text-black border-[4px] border-white border-l-0 hover:bg-[#FFFF00] hover:text-black flex-1"
                style={{ transition: "none" }}
                onClick={() => setModalOpen(false)}
              >
                REJECT ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
