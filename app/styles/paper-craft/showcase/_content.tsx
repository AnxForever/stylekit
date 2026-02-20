"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView hook                                                      */
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
/*  Inline SVG decorations                                             */
/* ------------------------------------------------------------------ */

function ScissorSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="9" r="4.5" stroke="#e85d75" strokeWidth="1.8" />
      <circle cx="8" cy="19" r="4.5" stroke="#e85d75" strokeWidth="1.8" />
      <line x1="11.5" y1="11.5" x2="24" y2="5" stroke="#e85d75" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11.5" y1="16.5" x2="24" y2="23" stroke="#e85d75" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11.5" y1="11.5" x2="17" y2="14" stroke="#e85d75" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11.5" y1="16.5" x2="17" y2="14" stroke="#e85d75" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TapeSVG({ color = "#f5c040", width = 60 }: { color?: string; width?: number }) {
  return (
    <svg width={width} height="18" viewBox={`0 0 ${width} 18`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="3" width={width} height="12" rx="3" fill={color} fillOpacity="0.55" />
      <rect x="0" y="3" width={width} height="12" rx="3" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
      {Array.from({ length: Math.floor(width / 8) }).map((_, i) => (
        <line
          key={i}
          x1={i * 8 + 4}
          y1="3"
          x2={i * 8 + 4}
          y2="15"
          stroke={color}
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function PaperFoldCorner({ color = "#f5c040" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L24 0 L24 24 Z" fill={color} fillOpacity="0.6" />
      <path d="M0 0 L24 24" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Craft Pink", hex: "#e85d75", rotation: "rotate-[-1.5deg]", textColor: "white" },
  { name: "Paper White", hex: "#fdf6ee", rotation: "rotate-[1deg]", textColor: "#2d2d2d", border: true },
  { name: "Craft Teal", hex: "#5cb8a5", rotation: "rotate-[-0.5deg]", textColor: "white" },
  { name: "Bright Yellow", hex: "#f5c040", rotation: "rotate-[1.5deg]", textColor: "#2d2d2d" },
  { name: "Periwinkle", hex: "#6b7fb5", rotation: "rotate-[-1deg]", textColor: "white" },
];

const componentTabs = ["Buttons", "Cards", "Inputs"];

const craftCards = [
  {
    title: "Origami Crane",
    desc: "Fold a sheet of paper into flight. Precise folds, clean diagonals, and the subtle geometry of birds in motion.",
    tag: "Fold",
    tagColor: "#e85d75",
    layer1: "#f5c040",
    layer2: "#5cb8a5",
    rotation: "rotate-[-0.5deg]",
  },
  {
    title: "Paper Collage",
    desc: "Tear, cut, and paste. Overlapping sheets of color that form something greater than their individual pieces.",
    tag: "Cut",
    tagColor: "#5cb8a5",
    layer1: "#6b7fb5",
    layer2: "#e85d75",
    rotation: "rotate-[0.8deg]",
  },
  {
    title: "Pop-up Diorama",
    desc: "Flat paper springs to three-dimensional life. Tabs, slots, and folds create miniature worlds from a single sheet.",
    tag: "Build",
    tagColor: "#6b7fb5",
    layer1: "#e85d75",
    layer2: "#f5c040",
    rotation: "rotate-[-1deg]",
  },
];

const typographySamples = [
  {
    label: "Display — Playful Bold",
    sample: "Make Something Beautiful",
    style: { fontSize: "2.5rem", fontWeight: 800, color: "#e85d75", lineHeight: 1.15 },
    note: "Bold, expressive, energetic. Headlines that feel like paper cutout letters pinned to a board.",
  },
  {
    label: "Heading — Structured",
    sample: "The Art of Paper Craft",
    style: { fontSize: "1.625rem", fontWeight: 700, color: "#2d2d2d", lineHeight: 1.3 },
    note: "Clear and confident. Section titles that anchor collage compositions.",
  },
  {
    label: "Body — Warm & Readable",
    sample: "Every piece of paper holds potential. Cut along the dotted line and discover what lives inside.",
    style: { fontSize: "1rem", fontWeight: 400, color: "#555555", lineHeight: 1.75 },
    note: "Approachable and warm. Like handwritten notes on good quality paper.",
  },
  {
    label: "Caption — Craft Label",
    sample: "HANDMADE WITH CARE — BATCH 001",
    style: { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", color: "#999", textTransform: "uppercase" as const, lineHeight: 1.5 },
    note: "Label-style captions. Small tags attached to a finished craft project.",
  },
];

const doPrinciples = [
  "Warm paper background #fdf6ee as the canvas",
  "Paper stack shadows: 4px 4px 0px rgba(0,0,0,0.08)",
  "Slight rotations on cards and labels (1–2 degrees)",
  "Bright craft colors as cutout paper blocks",
  "Layered divs offset to create paper depth",
  "Tape and fold decoration overlays",
];

const dontPrinciples = [
  "No dark or black backgrounds",
  "No sharp digital-looking elements",
  "No neon or over-saturated colors",
  "No perfectly aligned grid layouts",
  "No thick hard drop shadows",
  "No monospace or technical typefaces",
];

const accordionItems = [
  {
    title: "What is Paper Craft Design?",
    content:
      "Paper Craft draws inspiration from origami, paper cutting, and handmade collage. Through layered paper effects, offset shadows, and slightly imperfect edges, it creates a warm, tactile visual experience that feels genuinely handmade.",
  },
  {
    title: "The Value of Imperfection",
    content:
      "Deliberate slight rotations, soft rounded corners, and paper-like offset shadows give every element the character of something made by hand. The goal is warmth and personality, not pixel-perfect precision.",
  },
  {
    title: "Color as Material",
    content:
      "Each color represents a different sheet of craft paper. Bright but never garish, these hues layer and overlap like a physical collage — craft pink, teal, sunny yellow, and periwinkle blue working together in playful harmony.",
  },
];

const stats = [
  { label: "Crafters", value: "4,210", color: "#e85d75", rotation: "rotate-[-0.5deg]" },
  { label: "Projects", value: "18.7K", color: "#5cb8a5", rotation: "rotate-[0.5deg]" },
  { label: "Views", value: "189K", color: "#f5c040", rotation: "rotate-[-0.3deg]" },
  { label: "Saves", value: "3,678", color: "#6b7fb5", rotation: "rotate-[0.4deg]" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function PaperCraftShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [progress, setProgress] = useState(65);

  /* hero inView */
  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen bg-[#fdf6ee] text-[#2d2d2d] overflow-x-hidden">

      {/* ---------------------------------------------------------------- */}
      {/* NAV                                                               */}
      {/* ---------------------------------------------------------------- */}
      <nav
        className="sticky top-0 z-50 bg-[#fdf6ee] border-b-2 border-[#e0d8cc]"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / title */}
          <div className="flex items-center gap-3">
            {/* tape corner decoration */}
            <div className="relative">
              <div
                className="w-8 h-8 bg-[#e85d75] rounded-lg flex items-center justify-center rotate-[-2deg]"
                style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
              >
                <ScissorSVG className="w-5 h-5" />
              </div>
              {/* tiny tape strip */}
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-sm"
                style={{ background: "rgba(245,192,64,0.6)" }}
              />
            </div>
            <div>
              <span className="font-bold text-[#2d2d2d] text-lg leading-none block">Paper Craft</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b0a898]">纸艺手作</span>
            </div>
          </div>

          {/* nav links */}
          <div className="hidden md:flex items-center gap-1">
            {["Components", "Colors", "Typography", "Principles"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-1.5 text-sm font-semibold text-[#666] hover:text-[#e85d75] rounded-lg hover:bg-[#e85d75]/8 transition-all duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* StyleKit link */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 px-4 py-2 bg-[#e85d75] text-white text-sm font-bold rounded-xl transition-all duration-200"
            style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
          >
            <span>StyleKit</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-150">→</span>
          </Link>
        </div>

        {/* tape strip across top of nav */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "repeating-linear-gradient(90deg, rgba(245,192,64,0.35) 0px, rgba(245,192,64,0.35) 40px, transparent 40px, transparent 60px)",
          }}
        />
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-24 md:py-36 px-6 overflow-hidden">
        {/* background paper texture dots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* floating paper scraps — decorative */}
        <div
          className="absolute top-12 left-8 w-20 h-20 bg-[#f5c040] rounded-xl opacity-50"
          style={{ transform: "rotate(15deg)", boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
        />
        <div
          className="absolute top-28 left-16 w-12 h-12 bg-[#5cb8a5] rounded-lg opacity-40"
          style={{ transform: "rotate(-8deg)", boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-28 h-28 bg-[#6b7fb5] rounded-2xl opacity-30"
          style={{ transform: "rotate(12deg)", boxShadow: "4px 4px 0px rgba(0,0,0,0.07)" }}
        />
        <div
          className="absolute top-16 right-24 w-16 h-16 bg-[#e85d75] rounded-xl opacity-35"
          style={{ transform: "rotate(-18deg)", boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
        />
        <div
          className="absolute bottom-24 left-1/4 w-10 h-10 bg-[#f5c040] rounded-lg opacity-45"
          style={{ transform: "rotate(22deg)", boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
        />

        <div className="max-w-4xl mx-auto relative">
          {/* label badge with tape */}
          <div
            ref={heroRef}
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex justify-center mb-10">
              <div className="relative inline-block">
                {/* tape strip above badge */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                  <TapeSVG color="#f5c040" width={64} />
                </div>
                <div
                  className="relative px-5 py-2 bg-[#f5c040] rounded-lg rotate-[-1deg]"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.08)" }}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2d2d2d]">
                    Handmade with care
                  </span>
                </div>
              </div>
            </div>

            {/* layered collage title */}
            <div className="text-center mb-8">
              {/* paper block behind "Cut" */}
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 bg-[#5cb8a5] rounded-xl rotate-[2deg] -z-10"
                  style={{ transform: "rotate(2deg) translate(4px, 4px)", boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
                />
                <div
                  className="absolute inset-0 bg-[#f5c040] rounded-xl -z-10"
                  style={{ transform: "rotate(-1.5deg) translate(-2px, 3px)", boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
                />
                <h1
                  className="relative text-6xl md:text-8xl font-black text-[#2d2d2d] leading-none px-4 py-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Cut.
                </h1>
              </div>
              {/* "Fold." on pink paper */}
              <div className="relative inline-block mx-4">
                <div
                  className="absolute inset-0 bg-[#e85d75] rounded-xl -z-10"
                  style={{ transform: "rotate(-2deg) translate(2px, 5px)", boxShadow: "4px 4px 0px rgba(0,0,0,0.09)" }}
                />
                <h1
                  className="relative text-6xl md:text-8xl font-black text-white leading-none px-4 py-2 rotate-[1deg]"
                  style={{ letterSpacing: "-0.02em", display: "inline-block" }}
                >
                  Fold.
                </h1>
              </div>
              {/* "Create." plain */}
              <h1
                className="text-6xl md:text-8xl font-black text-[#2d2d2d] leading-none rotate-[-0.5deg] inline-block"
                style={{ letterSpacing: "-0.02em" }}
              >
                Create.
              </h1>
            </div>

            {/* subheading */}
            <p className="text-center text-lg md:text-xl text-[#666] max-w-xl mx-auto leading-relaxed mb-12">
              Layers of color, the satisfying snap of scissors, warm paper between your fingertips.
              Every element crafted by hand — imperfect and beautiful.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                className="group px-8 py-3.5 bg-[#e85d75] text-white font-bold rounded-xl transition-all duration-200 rotate-[-0.5deg]"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px rgba(0,0,0,0.13)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.5deg) translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.5deg) translateY(0)";
                }}
              >
                Start Crafting
              </button>
              <button
                className="px-8 py-3.5 bg-white border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold rounded-xl transition-all duration-200 rotate-[0.5deg]"
                style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.08)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0.5deg) translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0.5deg) translateY(0)";
                }}
              >
                View Gallery
              </button>
            </div>
          </div>

          {/* scissor decoration */}
          <div className="absolute -bottom-4 right-8 opacity-30">
            <ScissorSVG className="w-10 h-10" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* STATS STRIP                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10 px-6">
        <RevealBlock>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <div key={i} className={`group relative ${stat.rotation}`}>
                {/* back layer */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: stat.color,
                    opacity: 0.18,
                    transform: "translate(4px, 4px)",
                    borderRadius: "16px",
                  }}
                />
                {/* card */}
                <div
                  className="relative bg-white rounded-2xl px-6 py-5 group-hover:-translate-y-1 transition-all duration-200"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.08)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-4"
                    style={{ background: stat.color }}
                  />
                  <p className="text-3xl font-black text-[#2d2d2d] mb-1">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b0a898]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* COLOR PALETTE                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="colors" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* section header */}
          <RevealBlock>
            <div className="mb-14 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#e85d75" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  The Craft Paper Collection
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Color Palette</h2>
              </div>
            </div>
          </RevealBlock>

          {/* swatches */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {palette.map((color, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className={`group relative ${color.rotation}`}>
                  {/* shadow layer */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: color.hex,
                      opacity: 0.3,
                      transform: "translate(5px, 6px)",
                      borderRadius: "16px",
                    }}
                  />
                  {/* swatch card */}
                  <div
                    className="relative rounded-2xl overflow-hidden group-hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                    style={{
                      boxShadow: "4px 4px 0px rgba(0,0,0,0.08)",
                      width: "140px",
                    }}
                  >
                    {/* tape strip top */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                      <TapeSVG color={i % 2 === 0 ? "#f5c040" : "#5cb8a5"} width={40} />
                    </div>
                    {/* color block */}
                    <div
                      className="h-28"
                      style={{
                        background: color.hex,
                        border: color.border ? "2px solid #e0d8cc" : "none",
                      }}
                    />
                    {/* label */}
                    <div className="px-3 py-3 bg-white border-t-2 border-[#e0d8cc]">
                      <p className="text-xs font-bold text-[#2d2d2d] truncate">{color.name}</p>
                      <p className="text-[10px] font-mono text-[#b0a898] mt-0.5">{color.hex}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* color combinations row */}
          <RevealBlock delay={0.3}>
            <div className="mt-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-5">
                Combination Examples
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { bg: "#e85d75", fg: "white", label: "Primary on White" },
                  { bg: "#5cb8a5", fg: "white", label: "Teal on White" },
                  { bg: "#fdf6ee", fg: "#e85d75", label: "Pink on Paper" },
                  { bg: "#f5c040", fg: "#2d2d2d", label: "Yellow Label" },
                  { bg: "#6b7fb5", fg: "white", label: "Blue Block" },
                  { bg: "#2d2d2d", fg: "#fdf6ee", label: "Dark on Paper" },
                ].map((combo, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold rotate-[-0.3deg]"
                    style={{
                      background: combo.bg,
                      color: combo.fg,
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.08)",
                    }}
                  >
                    {combo.label}
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* COMPONENT DEMOS (tabbed)                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="components" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* section header */}
          <RevealBlock>
            <div className="mb-12 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#5cb8a5" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Interactive Demos
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Components</h2>
              </div>
            </div>
          </RevealBlock>

          {/* tab switcher */}
          <RevealBlock delay={0.05}>
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.08)" }}
            >
              {/* tab bar */}
              <div className="flex border-b-2 border-[#e0d8cc] bg-[#fdf6ee]">
                {componentTabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="flex-1 px-4 py-3.5 text-sm font-bold transition-all duration-200 relative"
                    style={{
                      color: activeTab === i ? "#e85d75" : "#b0a898",
                      borderBottom: activeTab === i ? "3px solid #e85d75" : "3px solid transparent",
                      marginBottom: "-2px",
                    }}
                  >
                    {/* active tape decoration */}
                    {activeTab === i && (
                      <span
                        className="absolute top-1 left-1/2 -translate-x-1/2"
                        style={{ opacity: 0.6 }}
                      >
                        <TapeSVG color="#e85d75" width={32} />
                      </span>
                    )}
                    <span className="relative">{tab}</span>
                  </button>
                ))}
              </div>

              {/* tab content */}
              <div className="p-8">
                {/* BUTTONS TAB */}
                {activeTab === 0 && (
                  <div>
                    <p className="text-sm font-bold text-[#b0a898] uppercase tracking-wider mb-6">
                      Paper lift shadows + hover deepens
                    </p>
                    <div className="flex flex-wrap gap-4 items-start">
                      {/* Primary */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="group px-6 py-3 bg-[#e85d75] text-white font-bold rounded-xl transition-all duration-200 rotate-[-0.5deg]"
                          style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px rgba(0,0,0,0.13)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.5deg) translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.5deg) translateY(0)";
                          }}
                        >
                          Primary
                        </button>
                        <span className="text-[10px] text-[#b0a898] font-bold uppercase tracking-wider">Primary</span>
                      </div>

                      {/* Teal */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="px-6 py-3 bg-[#5cb8a5] text-white font-bold rounded-xl transition-all duration-200 rotate-[0.5deg]"
                          style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px rgba(0,0,0,0.13)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0.5deg) translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0.5deg) translateY(0)";
                          }}
                        >
                          Secondary
                        </button>
                        <span className="text-[10px] text-[#b0a898] font-bold uppercase tracking-wider">Secondary</span>
                      </div>

                      {/* Outline */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="px-6 py-3 bg-white border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold rounded-xl transition-all duration-200"
                          style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.08)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px rgba(0,0,0,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.08)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                          }}
                        >
                          Outline
                        </button>
                        <span className="text-[10px] text-[#b0a898] font-bold uppercase tracking-wider">Outline</span>
                      </div>

                      {/* Yellow */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="px-6 py-3 bg-[#f5c040] text-[#2d2d2d] font-bold rounded-xl transition-all duration-200 rotate-[-0.3deg]"
                          style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px rgba(0,0,0,0.13)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.3deg) translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.1)";
                            (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.3deg) translateY(0)";
                          }}
                        >
                          Highlight
                        </button>
                        <span className="text-[10px] text-[#b0a898] font-bold uppercase tracking-wider">Highlight</span>
                      </div>

                      {/* Ghost */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="px-6 py-3 text-[#b0a898] font-bold rounded-xl transition-all duration-200 hover:bg-[#e0d8cc]/40"
                          style={{ boxShadow: "none" }}
                        >
                          Ghost
                        </button>
                        <span className="text-[10px] text-[#b0a898] font-bold uppercase tracking-wider">Ghost</span>
                      </div>

                      {/* Disabled */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="px-6 py-3 bg-[#e0d8cc] text-[#b0a898] font-bold rounded-xl cursor-not-allowed"
                          style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.04)" }}
                          disabled
                        >
                          Disabled
                        </button>
                        <span className="text-[10px] text-[#b0a898] font-bold uppercase tracking-wider">Disabled</span>
                      </div>
                    </div>

                    {/* button sizes */}
                    <div className="mt-8 pt-6 border-t-2 border-[#e0d8cc]">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#b0a898] mb-4">Sizes</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          className="px-3 py-1.5 text-xs bg-[#e85d75] text-white font-bold rounded-lg"
                          style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.08)" }}
                        >
                          Small
                        </button>
                        <button
                          className="px-5 py-2.5 text-sm bg-[#e85d75] text-white font-bold rounded-xl rotate-[-0.3deg]"
                          style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
                        >
                          Medium
                        </button>
                        <button
                          className="px-8 py-3.5 text-base bg-[#e85d75] text-white font-bold rounded-xl rotate-[0.3deg]"
                          style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                        >
                          Large
                        </button>
                        <button
                          className="px-12 py-4 text-lg bg-[#e85d75] text-white font-bold rounded-xl rotate-[-0.5deg]"
                          style={{ boxShadow: "5px 5px 0px rgba(0,0,0,0.1)" }}
                        >
                          XL
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARDS TAB */}
                {activeTab === 1 && (
                  <div>
                    <p className="text-sm font-bold text-[#b0a898] uppercase tracking-wider mb-6">
                      Stacked paper layers with slight rotation
                    </p>
                    <div className="grid md:grid-cols-3 gap-10">
                      {craftCards.map((card, i) => (
                        <div key={i} className={`relative group ${card.rotation}`}>
                          {/* back paper layer 2 */}
                          <div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: card.layer1,
                              transform: "rotate(2.5deg) translate(5px, 6px)",
                              boxShadow: "3px 3px 0px rgba(0,0,0,0.06)",
                            }}
                          />
                          {/* back paper layer 1 */}
                          <div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: card.layer2,
                              transform: "rotate(-1.5deg) translate(-3px, 4px)",
                              boxShadow: "3px 3px 0px rgba(0,0,0,0.06)",
                            }}
                          />
                          {/* front card */}
                          <div
                            className="relative bg-white rounded-2xl p-6 group-hover:-translate-y-1.5 transition-all duration-200"
                            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.08)" }}
                          >
                            {/* tape top */}
                            <div className="absolute -top-2 left-6">
                              <TapeSVG
                                color={card.tagColor}
                                width={40}
                              />
                            </div>
                            {/* tag label */}
                            <div
                              className="inline-block px-3 py-1 text-white text-xs font-bold rounded-lg mb-4 rotate-[-1deg]"
                              style={{
                                background: card.tagColor,
                                boxShadow: "2px 2px 0px rgba(0,0,0,0.08)",
                              }}
                            >
                              {card.tag}
                            </div>
                            <h3 className="text-lg font-bold text-[#2d2d2d] mb-3">{card.title}</h3>
                            <p className="text-sm text-[#666] leading-relaxed">{card.desc}</p>
                            <div className="mt-4 pt-4 border-t-2 border-[#e0d8cc]">
                              <button
                                className="text-sm font-bold transition-colors duration-200"
                                style={{ color: card.tagColor }}
                              >
                                Learn more →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* INPUTS TAB */}
                {activeTab === 2 && (
                  <div>
                    <p className="text-sm font-bold text-[#b0a898] uppercase tracking-wider mb-6">
                      Write on paper — focused inputs
                    </p>
                    <div className="max-w-md space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-[#2d2d2d] mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Write your name here..."
                          className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#c0b8b0] transition-all duration-200 outline-none"
                          style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04)" }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#e85d75";
                            e.currentTarget.style.boxShadow = "inset 2px 2px 4px rgba(0,0,0,0.04), 0 0 0 3px rgba(232,93,117,0.12)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e0d8cc";
                            e.currentTarget.style.boxShadow = "inset 2px 2px 4px rgba(0,0,0,0.04)";
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#2d2d2d] mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                          placeholder="you@craft.studio"
                          className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#c0b8b0] transition-all duration-200 outline-none"
                          style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04)" }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#5cb8a5";
                            e.currentTarget.style.boxShadow = "inset 2px 2px 4px rgba(0,0,0,0.04), 0 0 0 3px rgba(92,184,165,0.12)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e0d8cc";
                            e.currentTarget.style.boxShadow = "inset 2px 2px 4px rgba(0,0,0,0.04)";
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#2d2d2d] mb-1.5">
                          Project Notes
                        </label>
                        <textarea
                          value={messageValue}
                          onChange={(e) => setMessageValue(e.target.value)}
                          placeholder="Describe your craft project..."
                          rows={4}
                          className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#c0b8b0] transition-all duration-200 outline-none resize-none"
                          style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04)" }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#e85d75";
                            e.currentTarget.style.boxShadow = "inset 2px 2px 4px rgba(0,0,0,0.04), 0 0 0 3px rgba(232,93,117,0.12)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e0d8cc";
                            e.currentTarget.style.boxShadow = "inset 2px 2px 4px rgba(0,0,0,0.04)";
                          }}
                        />
                      </div>

                      {/* input states */}
                      <div className="pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#b0a898] mb-3">States</p>
                        <div className="space-y-3">
                          <input
                            readOnly
                            value="Success state"
                            className="w-full px-4 py-2.5 bg-white border-2 rounded-xl text-sm font-medium outline-none"
                            style={{
                              borderColor: "#5cb8a5",
                              boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04), 0 0 0 3px rgba(92,184,165,0.12)",
                              color: "#5cb8a5",
                            }}
                          />
                          <input
                            readOnly
                            value="Error state"
                            className="w-full px-4 py-2.5 bg-white border-2 rounded-xl text-sm font-medium outline-none"
                            style={{
                              borderColor: "#e85d75",
                              boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04), 0 0 0 3px rgba(232,93,117,0.12)",
                              color: "#e85d75",
                            }}
                          />
                          <input
                            readOnly
                            value="Disabled state"
                            className="w-full px-4 py-2.5 bg-[#e0d8cc]/40 border-2 border-[#e0d8cc] rounded-xl text-sm font-medium text-[#b0a898] cursor-not-allowed outline-none"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TYPOGRAPHY                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="typography" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* section header */}
          <RevealBlock>
            <div className="mb-14 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#6b7fb5" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Handwritten Warmth
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Typography</h2>
              </div>
            </div>
          </RevealBlock>

          <div className="space-y-6">
            {typographySamples.map((sample, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="group relative">
                  {/* back layer */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "#e0d8cc",
                      transform: `translate(4px, 4px) rotate(${i % 2 === 0 ? "0.3" : "-0.3"}deg)`,
                      opacity: 0.5,
                    }}
                  />
                  {/* card */}
                  <div
                    className="relative bg-[#fdf6ee] rounded-2xl px-8 py-7 border-2 border-[#e0d8cc] group-hover:-translate-y-0.5 transition-all duration-200"
                    style={{
                      boxShadow: "4px 4px 0px rgba(0,0,0,0.07)",
                      transform: `rotate(${i % 2 === 0 ? "-0.2" : "0.2"}deg)`,
                    }}
                  >
                    {/* tape corner */}
                    <div className="absolute top-3 right-4">
                      <TapeSVG
                        color={["#e85d75", "#5cb8a5", "#f5c040", "#6b7fb5"][i % 4]}
                        width={32}
                      />
                    </div>

                    <div className="flex items-start gap-6 flex-col md:flex-row">
                      {/* sample text */}
                      <div className="flex-1 min-w-0">
                        <p style={sample.style} className="break-words">
                          {sample.sample}
                        </p>
                      </div>
                      {/* label */}
                      <div className="md:w-52 shrink-0">
                        <p
                          className="text-xs font-bold uppercase tracking-wider mb-1"
                          style={{ color: "#e85d75" }}
                        >
                          {sample.label}
                        </p>
                        <p className="text-xs text-[#888] leading-relaxed">{sample.note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* font spec table */}
          <RevealBlock delay={0.3}>
            <div className="mt-10">
              <div
                className="bg-[#fdf6ee] rounded-2xl border-2 border-[#e0d8cc] overflow-hidden rotate-[-0.2deg]"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.07)" }}
              >
                <div className="px-6 py-3 border-b-2 border-[#e0d8cc] flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#e85d75]" />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b0a898]">
                    Type Specifications
                  </p>
                </div>
                <div className="divide-y-2 divide-[#e0d8cc]">
                  {[
                    { role: "Display", size: "64–96px", weight: "800–900", use: "Hero headlines, splash text" },
                    { role: "Heading 1", size: "36–48px", weight: "700–800", use: "Section titles" },
                    { role: "Heading 2", size: "24–30px", weight: "700", use: "Sub-section, card titles" },
                    { role: "Body", size: "14–16px", weight: "400", use: "Long-form content, descriptions" },
                    { role: "Caption", size: "10–12px", weight: "700", use: "Labels, tags, metadata" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-4 px-6 py-3 text-sm">
                      <span className="font-bold text-[#2d2d2d]">{row.role}</span>
                      <span className="text-[#666] font-mono text-xs">{row.size}</span>
                      <span className="text-[#666] font-mono text-xs">{row.weight}</span>
                      <span className="text-[#999] text-xs">{row.use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DESIGN PRINCIPLES — corkboard pinned notes                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="principles" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* section header */}
          <RevealBlock>
            <div className="mb-14 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#f5c040" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Do &amp; Don't
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Design Principles</h2>
              </div>
            </div>
          </RevealBlock>

          {/* corkboard */}
          <div
            className="relative rounded-3xl p-8 md:p-12"
            style={{
              background: "#d4b896",
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 28px)",
              boxShadow: "inset 0 2px 12px rgba(0,0,0,0.12), 4px 4px 0px rgba(0,0,0,0.08)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* DO column */}
              <RevealBlock delay={0.05}>
                <div className="relative">
                  {/* pushpin */}
                  <div
                    className="absolute -top-3 left-6 w-5 h-5 rounded-full border-2 border-[#5cb8a5] z-10"
                    style={{ background: "#5cb8a5", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                  />
                  <div
                    className="bg-[#e8f8f4] rounded-2xl p-6 rotate-[-0.8deg]"
                    style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <div
                        className="w-7 h-7 bg-[#5cb8a5] rounded-lg flex items-center justify-center"
                        style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.08)" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-black text-[#2d7a64]">Do</h3>
                    </div>
                    <ul className="space-y-3">
                      {doPrinciples.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-4 h-4 rounded-full bg-[#5cb8a5] shrink-0 mt-0.5 flex items-center justify-center"
                          >
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                          <span className="text-sm text-[#2d4a3d] leading-snug">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealBlock>

              {/* DON'T column */}
              <RevealBlock delay={0.12}>
                <div className="relative">
                  {/* pushpin */}
                  <div
                    className="absolute -top-3 left-6 w-5 h-5 rounded-full border-2 border-[#e85d75] z-10"
                    style={{ background: "#e85d75", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                  />
                  <div
                    className="bg-[#fef0f2] rounded-2xl p-6 rotate-[0.6deg]"
                    style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <div
                        className="w-7 h-7 bg-[#e85d75] rounded-lg flex items-center justify-center"
                        style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.08)" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 3L11 11M11 3L3 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-black text-[#9a2a3d]">Don't</h3>
                    </div>
                    <ul className="space-y-3">
                      {dontPrinciples.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-4 h-4 rounded-full bg-[#e85d75] shrink-0 mt-0.5 flex items-center justify-center"
                          >
                            <div className="w-1.5 h-0.5 bg-white rounded-full" />
                          </div>
                          <span className="text-sm text-[#6a2a3a] leading-snug">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealBlock>
            </div>

            {/* random pinned notes on the board */}
            <div className="mt-8 flex flex-wrap gap-5">
              {[
                { text: "Paper has memory — every fold tells a story.", color: "#fffbe6", rotation: "rotate-[2deg]", pin: "#f5c040" },
                { text: "Warmth over perfection, always.", color: "#edf7ff", rotation: "rotate-[-1.5deg]", pin: "#6b7fb5" },
                { text: "Cut along the dotted line.", color: "#fff0f4", rotation: "rotate-[1deg]", pin: "#e85d75" },
              ].map((note, i) => (
                <RevealBlock key={i} delay={0.2 + i * 0.07}>
                  <div className="relative">
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                      style={{ background: note.pin, borderColor: note.pin, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                    />
                    <div
                      className={`${note.rotation} px-5 py-4 rounded-xl text-sm font-semibold text-[#3d3228] max-w-[180px]`}
                      style={{
                        background: note.color,
                        boxShadow: "2px 2px 0px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.08)",
                        lineHeight: 1.5,
                      }}
                    >
                      {note.text}
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* ACCORDION                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <div className="mb-12 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#e85d75" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Unfolding Layers
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">About This Style</h2>
              </div>
            </div>
          </RevealBlock>

          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <div
                  className="bg-[#fdf6ee] rounded-2xl border-2 border-[#e0d8cc] overflow-hidden"
                  style={{
                    boxShadow: "3px 3px 0px rgba(0,0,0,0.06)",
                    transform: `rotate(${i % 2 === 0 ? "-0.2" : "0.2"}deg)`,
                  }}
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#e85d75]/5 transition-colors duration-200"
                  >
                    <span className="font-bold text-[#2d2d2d]">{item.title}</span>
                    <span
                      className="w-6 h-6 rounded-full bg-[#e85d75] flex items-center justify-center shrink-0 transition-transform duration-300"
                      style={{
                        transform: openAccordion === i ? "rotate(45deg)" : "rotate(0deg)",
                        boxShadow: "1px 1px 0px rgba(0,0,0,0.08)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 2V8M2 5H8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-5 border-t-2 border-[#e0d8cc]">
                      <p className="text-sm text-[#666] leading-relaxed pt-4">{item.content}</p>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TOGGLES + PROGRESS                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-12 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#5cb8a5" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Craft Preferences
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Controls</h2>
              </div>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Toggles */}
            <RevealBlock delay={0.05}>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl bg-[#e0d8cc]"
                  style={{ transform: "translate(5px, 5px) rotate(0.3deg)" }}
                />
                <div
                  className="relative bg-white rounded-2xl border-2 border-[#e0d8cc] p-6"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute top-3 right-4">
                    <TapeSVG color="#5cb8a5" width={36} />
                  </div>
                  <h3 className="font-bold text-[#2d2d2d] mb-5">Preferences</h3>
                  <div className="space-y-5">
                    {[
                      { label: "Paper Texture Overlay", desc: "Subtle paper grain on all surfaces" },
                      { label: "Playful Rotations", desc: "Enable slight tilts on elements" },
                      { label: "Auto-save Projects", desc: "Preserve work automatically" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#2d2d2d]">{item.label}</p>
                          <p className="text-xs text-[#b0a898] mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => {
                            const next = [...toggleStates];
                            next[i] = !next[i];
                            setToggleStates(next);
                          }}
                          className="relative w-12 h-6 rounded-xl transition-all duration-200 shrink-0"
                          style={{
                            background: toggleStates[i] ? "#5cb8a5" : "#e0d8cc",
                            boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.06)",
                          }}
                        >
                          <span
                            className="absolute top-1 w-4 h-4 bg-white rounded-lg transition-all duration-200"
                            style={{
                              left: toggleStates[i] ? "26px" : "4px",
                              boxShadow: "1px 1px 0px rgba(0,0,0,0.08)",
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Progress */}
            <RevealBlock delay={0.1}>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl bg-[#e0d8cc]"
                  style={{ transform: "translate(5px, 5px) rotate(-0.3deg)" }}
                />
                <div
                  className="relative bg-white rounded-2xl border-2 border-[#e0d8cc] p-6"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute top-3 right-4">
                    <TapeSVG color="#f5c040" width={36} />
                  </div>
                  <h3 className="font-bold text-[#2d2d2d] mb-5">Project Progress</h3>

                  {/* main bar */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold text-[#2d2d2d]">Craft completion</span>
                      <span className="text-sm font-mono font-bold text-[#e85d75]">{progress}%</span>
                    </div>
                    <div
                      className="h-4 rounded-xl overflow-hidden bg-[#e0d8cc]"
                      style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.06)" }}
                    >
                      <div
                        className="h-full rounded-xl transition-all duration-300"
                        style={{
                          width: `${progress}%`,
                          background: "linear-gradient(90deg, #e85d75, #f5808e)",
                          boxShadow: "2px 0 0 rgba(0,0,0,0.06)",
                        }}
                      />
                    </div>
                  </div>

                  {/* step bars */}
                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#b0a898] mb-3">
                      Steps
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: 100, color: "#e85d75" },
                        { value: 100, color: "#5cb8a5" },
                        { value: progress, color: "#f5c040" },
                        { value: 0, color: "#6b7fb5" },
                      ].map((step, i) => (
                        <div key={i}>
                          <div
                            className="h-2.5 rounded-xl overflow-hidden bg-[#e0d8cc]"
                            style={{ boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.05)" }}
                          >
                            <div
                              className="h-full rounded-xl transition-all duration-300"
                              style={{ width: `${step.value}%`, background: step.color }}
                            />
                          </div>
                          <p className="text-[10px] text-[#b0a898] mt-1 font-bold text-center">
                            {i + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* controls */}
                  <div className="flex gap-3 pt-3 border-t-2 border-[#e0d8cc]">
                    <button
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      className="flex-1 py-2 text-sm font-bold border-2 border-[#e0d8cc] text-[#666] rounded-xl transition-all duration-200"
                      style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.08)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px rgba(0,0,0,0.06)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      }}
                    >
                      Undo
                    </button>
                    <button
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      className="flex-1 py-2 text-sm font-bold bg-[#e85d75] text-white rounded-xl transition-all duration-200"
                      style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px rgba(0,0,0,0.12)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px rgba(0,0,0,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      }}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* ALERT VARIANTS                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <div className="mb-12 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#6b7fb5" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Friendly Notices
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Alerts</h2>
              </div>
            </div>
          </RevealBlock>

          <div className="space-y-3">
            {[
              {
                type: "success",
                color: "#5cb8a5",
                bg: "rgba(92,184,165,0.08)",
                title: "Project saved",
                msg: "Your craft project has been stored safely.",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#5cb8a5" strokeWidth="1.5" />
                    <path d="M5 8L7 10L11 6" stroke="#5cb8a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                type: "warning",
                color: "#c9a030",
                bg: "rgba(245,192,64,0.08)",
                title: "Low on supplies",
                msg: "Red cardstock is running low. Time to restock.",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L14 13H2L8 2Z" stroke="#c9a030" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 6V9" stroke="#c9a030" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="11.5" r="0.75" fill="#c9a030" />
                  </svg>
                ),
              },
              {
                type: "error",
                color: "#e85d75",
                bg: "rgba(232,93,117,0.08)",
                title: "Paper jam",
                msg: "The template could not be printed. Please try again.",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#e85d75" strokeWidth="1.5" />
                    <path d="M5 5L11 11M11 5L5 11" stroke="#e85d75" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                type: "info",
                color: "#6b7fb5",
                bg: "rgba(107,127,181,0.08)",
                title: "Craft tip",
                msg: "Score along fold lines first for cleaner, crisper creases.",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#6b7fb5" strokeWidth="1.5" />
                    <path d="M8 7V11" stroke="#6b7fb5" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="5" r="0.75" fill="#6b7fb5" />
                  </svg>
                ),
              },
            ].map((alert, i) => (
              <RevealBlock key={i} delay={i * 0.06}>
                <div
                  className="flex items-start gap-3 p-4 rounded-xl border-l-4 rotate-[-0.15deg]"
                  style={{
                    background: alert.bg,
                    borderLeftColor: alert.color,
                    boxShadow: "2px 2px 0px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="mt-0.5 shrink-0">{alert.icon}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: alert.color }}>
                      {alert.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: alert.color, opacity: 0.75 }}>
                      {alert.msg}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* LAYERING SHOWCASE                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-14 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#e85d75" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  The Signature Technique
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Paper Layering</h2>
              </div>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-12">
            {/* 3-layer stack demo */}
            <RevealBlock delay={0.05}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-44 h-44">
                  {/* layer 3 — back */}
                  <div
                    className="absolute inset-0 bg-[#6b7fb5] rounded-2xl"
                    style={{
                      transform: "rotate(8deg) translate(8px, 6px)",
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.08)",
                    }}
                  />
                  {/* layer 2 */}
                  <div
                    className="absolute inset-0 bg-[#f5c040] rounded-2xl"
                    style={{
                      transform: "rotate(4deg) translate(4px, 3px)",
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.08)",
                    }}
                  />
                  {/* layer 1 — front */}
                  <div
                    className="absolute inset-0 bg-[#e85d75] rounded-2xl flex items-center justify-center"
                    style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                  >
                    <span className="text-white font-black text-xl">3 Layers</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#2d2d2d] text-center">Triple Stack</p>
                <p className="text-xs text-[#888] text-center leading-relaxed">
                  Three sheets at different rotations create dimensional depth.
                </p>
              </div>
            </RevealBlock>

            {/* tape demo */}
            <RevealBlock delay={0.1}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-44 h-44">
                  {/* back paper */}
                  <div
                    className="absolute inset-0 bg-[#5cb8a5] rounded-2xl rotate-[-2deg]"
                    style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.08)" }}
                  />
                  {/* front paper */}
                  <div
                    className="absolute inset-4 bg-white rounded-2xl"
                    style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
                  />
                  {/* tape top */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                    <TapeSVG color="#f5c040" width={56} />
                  </div>
                  {/* tape right */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -right-3 z-10"
                    style={{ transform: "rotate(90deg) translateY(-50%)", transformOrigin: "center" }}
                  >
                    <TapeSVG color="#e85d75" width={40} />
                  </div>
                  {/* content */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <span className="text-[#5cb8a5] font-black text-base text-center">Taped Note</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#2d2d2d] text-center">Tape Decoration</p>
                <p className="text-xs text-[#888] text-center leading-relaxed">
                  Semi-transparent tape strips anchor paper layers visually.
                </p>
              </div>
            </RevealBlock>

            {/* folded corner demo */}
            <RevealBlock delay={0.15}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-44 h-44">
                  {/* shadow */}
                  <div
                    className="absolute inset-0 bg-[#e0d8cc] rounded-2xl"
                    style={{ transform: "translate(6px, 7px) rotate(1deg)" }}
                  />
                  {/* main card */}
                  <div
                    className="absolute inset-0 bg-[#fdf6ee] border-2 border-[#e0d8cc] rounded-2xl overflow-hidden"
                    style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
                  >
                    {/* folded corner top-right */}
                    <div className="absolute top-0 right-0">
                      <PaperFoldCorner color="#f5c040" />
                    </div>
                    {/* folded corner bottom-left */}
                    <div className="absolute bottom-0 left-0" style={{ transform: "rotate(180deg)" }}>
                      <PaperFoldCorner color="#e85d75" />
                    </div>
                    {/* content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#2d2d2d] font-black text-base text-center px-4">Folded Corners</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#2d2d2d] text-center">Corner Folds</p>
                <p className="text-xs text-[#888] text-center leading-relaxed">
                  Folded triangle corners hint at the paper beneath.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FORM SECTION                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-12 flex items-start gap-4">
              <div className="relative mt-1">
                <TapeSVG color="#5cb8a5" width={48} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b0a898] mb-1">
                  Write on Paper
                </p>
                <h2 className="text-3xl font-black text-[#2d2d2d]">Share Your Craft</h2>
              </div>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* form card */}
            <RevealBlock delay={0.05}>
              <div className="relative">
                {/* back layers */}
                <div
                  className="absolute inset-0 rounded-2xl bg-[#f5c040]"
                  style={{ transform: "rotate(2deg) translate(6px, 7px)", opacity: 0.4 }}
                />
                <div
                  className="absolute inset-0 rounded-2xl bg-[#5cb8a5]"
                  style={{ transform: "rotate(-1deg) translate(-3px, 4px)", opacity: 0.3 }}
                />
                <div
                  className="relative bg-white rounded-2xl border-2 border-[#e0d8cc] p-7"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.08)" }}
                >
                  {/* tape top-center */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <TapeSVG color="#e85d75" width={56} />
                  </div>
                  <h3 className="text-xl font-black text-[#2d2d2d] mb-6 mt-2">
                    New Project Form
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#b0a898] mb-1.5">
                        Project Name
                      </label>
                      <input
                        type="text"
                        placeholder="My paper crane..."
                        className="w-full px-4 py-2.5 bg-[#fdf6ee] border-2 border-[#e0d8cc] rounded-xl text-sm text-[#2d2d2d] placeholder-[#c0b8b0] outline-none transition-all duration-200"
                        style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#e85d75";
                          e.currentTarget.style.background = "white";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e0d8cc";
                          e.currentTarget.style.background = "#fdf6ee";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#b0a898] mb-1.5">
                        Category
                      </label>
                      <select
                        className="w-full px-4 py-2.5 bg-[#fdf6ee] border-2 border-[#e0d8cc] rounded-xl text-sm text-[#2d2d2d] outline-none transition-all duration-200 cursor-pointer"
                        style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#e85d75";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e0d8cc";
                        }}
                      >
                        <option>Origami</option>
                        <option>Collage</option>
                        <option>Pop-up</option>
                        <option>Paper cutting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#b0a898] mb-1.5">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project..."
                        className="w-full px-4 py-2.5 bg-[#fdf6ee] border-2 border-[#e0d8cc] rounded-xl text-sm text-[#2d2d2d] placeholder-[#c0b8b0] outline-none resize-none transition-all duration-200"
                        style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.04)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#e85d75";
                          e.currentTarget.style.background = "white";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e0d8cc";
                          e.currentTarget.style.background = "#fdf6ee";
                        }}
                      />
                    </div>
                    <button
                      className="w-full py-3 bg-[#e85d75] text-white font-bold rounded-xl transition-all duration-200 mt-1 rotate-[-0.3deg]"
                      style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px rgba(0,0,0,0.13)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.3deg) translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px rgba(0,0,0,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.3deg) translateY(0)";
                      }}
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* tips column */}
            <RevealBlock delay={0.12}>
              <div className="space-y-4">
                <div
                  className="relative bg-[#fffbe6] rounded-2xl p-5 rotate-[-0.5deg]"
                  style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute -top-2 left-4">
                    <TapeSVG color="#f5c040" width={40} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#c9a030] mb-2">
                    Craft Tip
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Always score fold lines with a bone folder before folding. This creates a cleaner crease and prevents paper tearing.
                  </p>
                </div>
                <div
                  className="relative bg-[#edf7ff] rounded-2xl p-5 rotate-[0.8deg]"
                  style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute -top-2 left-4">
                    <TapeSVG color="#6b7fb5" width={40} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#4a5d8a] mb-2">
                    Material Guide
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    80gsm paper is ideal for origami. Heavier cardstock (200gsm+) works best for pop-up constructions that need structural rigidity.
                  </p>
                </div>
                <div
                  className="relative bg-[#f0fdf8] rounded-2xl p-5 rotate-[-0.3deg]"
                  style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute -top-2 left-4">
                    <TapeSVG color="#5cb8a5" width={40} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#2d7a64] mb-2">
                    Color Advice
                  </p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Layer complementary colors — pink over teal, yellow over blue — to create depth. The edges where colors meet are where the magic happens.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative py-16 px-6 border-t-2 border-[#e0d8cc] overflow-hidden">
        {/* decorative paper scraps behind */}
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#f5c040] rounded-2xl opacity-20"
          style={{ transform: "rotate(-15deg)" }}
        />
        <div
          className="absolute -top-6 right-12 w-20 h-20 bg-[#e85d75] rounded-2xl opacity-15"
          style={{ transform: "rotate(20deg)" }}
        />
        <div
          className="absolute top-8 -right-4 w-14 h-14 bg-[#5cb8a5] rounded-xl opacity-20"
          style={{ transform: "rotate(-10deg)" }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 bg-[#e85d75] rounded-xl flex items-center justify-center rotate-[-2deg]"
                style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.1)" }}
              >
                <ScissorSVG className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-lg text-[#2d2d2d]">Paper Craft</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b0a898]">纸艺手作</p>
              </div>
            </div>

            {/* tagline as pinned note */}
            <div className="relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <TapeSVG color="#f5c040" width={48} />
              </div>
              <div
                className="bg-white border-2 border-[#e0d8cc] rounded-xl px-6 py-3 rotate-[-0.5deg]"
                style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.07)" }}
              >
                <p className="text-sm font-bold text-[#2d2d2d]">
                  Made with scissors, glue, and love.
                </p>
              </div>
            </div>

            {/* links */}
            <div className="flex flex-wrap gap-2 justify-center">
              {["Documentation", "GitHub", "Figma"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="px-3 py-1.5 text-xs font-bold text-[#666] bg-white border-2 border-[#e0d8cc] rounded-lg hover:border-[#e85d75] hover:text-[#e85d75] transition-all duration-200"
                  style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.06)" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* divider — decorative torn paper edge */}
          <div
            className="w-full h-px mb-8"
            style={{
              background: "repeating-linear-gradient(90deg, #e0d8cc 0px, #e0d8cc 8px, transparent 8px, transparent 12px)",
            }}
          />

          {/* bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#b0a898] font-semibold">
              Paper Craft Showcase — Part of{" "}
              <Link href="/" className="font-bold text-[#e85d75] hover:underline">
                StyleKit
              </Link>
            </p>

            {/* color dots */}
            <div className="flex items-center gap-2">
              {["#e85d75", "#5cb8a5", "#f5c040", "#6b7fb5"].map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: color,
                    boxShadow: "1px 1px 0px rgba(0,0,0,0.08)",
                    transform: `rotate(${(i - 1.5) * 5}deg)`,
                  }}
                />
              ))}
            </div>

            <p className="text-xs text-[#b0a898]">
              StyleKit Design System &copy; 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
