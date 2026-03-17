"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
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
      { threshold: 0.15, ...options },
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
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const PALETTE = [
  { name: "Near Black", hex: "#1a1a1a", bg: "#1a1a1a", textLight: true, role: "Primary" },
  { name: "Off White", hex: "#f5f5f5", bg: "#f5f5f5", textLight: false, role: "Secondary" },
  { name: "Soft Pink", hex: "#f472b6", bg: "#f472b6", textLight: true, role: "Accent" },
  { name: "Lime", hex: "#a3e635", bg: "#a3e635", textLight: false, role: "Accent" },
  { name: "Sky Blue", hex: "#38bdf8", bg: "#38bdf8", textLight: false, role: "Accent" },
  { name: "Amber", hex: "#fbbf24", bg: "#fbbf24", textLight: false, role: "Accent" },
];

const PROJECTS = [
  {
    id: "01",
    title: "Bloom Studio",
    category: "Branding",
    year: "2024",
    accent: "#f472b6",
    accentName: "pink",
    desc: "Identity system for an independent creative studio. Structured without rigidity.",
  },
  {
    id: "02",
    title: "Verdant App",
    category: "Product",
    year: "2024",
    accent: "#a3e635",
    accentName: "lime",
    desc: "Mobile experience for urban gardeners. Hard edges, soft personality.",
  },
  {
    id: "03",
    title: "Skyline Dashboard",
    category: "Data",
    year: "2023",
    accent: "#38bdf8",
    accentName: "sky",
    desc: "Analytics interface that doesn't intimidate. Structure with warmth.",
  },
  {
    id: "04",
    title: "Harvest Market",
    category: "E-Commerce",
    year: "2023",
    accent: "#fbbf24",
    accentName: "amber",
    desc: "Direct-to-consumer storefront for seasonal produce. Grounded and welcoming.",
  },
];

const TYPE_SCALE = [
  { label: "Display", size: "text-6xl md:text-7xl", weight: "font-black", family: "font-sans", sample: "Soft Brutal", note: "Hero headings — font-sans font-black" },
  { label: "H1", size: "text-4xl md:text-5xl", weight: "font-bold", family: "font-sans", sample: "Structure with Personality", note: "Section headings — font-sans font-bold" },
  { label: "H2", size: "text-2xl md:text-3xl", weight: "font-bold", family: "font-sans", sample: "Pastel Accents, Hard Edges", note: "Sub-headings — font-sans font-bold" },
  { label: "Label", size: "text-xs", weight: "font-semibold", family: "font-mono", sample: "COMPONENT / CATEGORY / TAG", note: "Labels & tags — font-mono uppercase" },
  { label: "Body", size: "text-base", weight: "font-normal", family: "font-sans", sample: "Neo-brutalism retains structural DNA but softens with pastel accents and grey tones.", note: "Body copy — font-sans regular" },
  { label: "Code", size: "text-sm", weight: "font-medium", family: "font-mono", sample: "border-2 border-gray-800 rounded-none", note: "Technical labels — font-mono" },
];

const DO_RULES = [
  {
    token: "rounded-none",
    what: "Zero rounded corners — ever",
    why: "The angular edge is the brutalist signature. Softness comes from color, not geometry.",
    accent: "#f472b6",
  },
  {
    token: "border-2 border-gray-800",
    what: "Thin grey border, not pure black",
    why: "#1a1a1a borders vs #000000 — the 10% grey shift is what 'soft' means structurally.",
    accent: "#a3e635",
  },
  {
    token: "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
    what: "Hard offset shadow at 20% opacity",
    why: "Directional shadows define depth. Opacity drop softens without losing the brutalist offset.",
    accent: "#38bdf8",
  },
  {
    token: "hover:-translate-x-[2px] hover:-translate-y-[2px]",
    what: "Lift on hover — displacement + larger shadow",
    why: "Hover should feel physical. Elements rise toward the cursor. Press reverses this.",
    accent: "#fbbf24",
  },
  {
    token: "border-t-4 border-t-[#f472b6]",
    what: "Colored accent top-border on cards",
    why: "Single-edge color accent breaks monotony without flooding the card. Identity without noise.",
    accent: "#f472b6",
  },
  {
    token: "active:translate-x-[2px] active:translate-y-[2px]",
    what: "Press displacement — shadow collapses",
    why: "Buttons should feel like physical stamps. Press down, shadow disappears, element sinks.",
    accent: "#a3e635",
  },
];

const DONT_RULES = [
  { what: "rounded-sm or rounded-md anywhere", why: "Any rounding breaks the geometric contract." },
  { what: "Pure black shadows rgba(0,0,0,1)", why: "Full opacity shadows feel heavy, not soft." },
  { what: "Dark or moody overall palette", why: "This is the soft variant. Light backgrounds are required." },
  { what: "Gradient backgrounds or fills", why: "Flat color only. Gradients conflict with the structural aesthetic." },
  { what: "box-shadow utilities like shadow-lg", why: "Only use hard offset shadow syntax — never blurred shadows." },
  { what: "Centered body text", why: "Left-alignment is structural. Centering decorates; it doesn't communicate." },
];

const STATS = [
  { value: "0px", label: "Border radius", accent: "#f472b6" },
  { value: "2px", label: "Border width", accent: "#a3e635" },
  { value: "20%", label: "Shadow opacity", accent: "#38bdf8" },
  { value: "4", label: "Pastel accents", accent: "#fbbf24" },
];

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                    */
/* ------------------------------------------------------------------ */

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l3.5 3.5L13 5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="6" r="3.5" />
      <path d="M2.5 18c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2a5 5 0 00-5 5v3l-1.5 2h13L14 10V7a5 5 0 00-5-5z" />
      <path d="M7 15.5a2 2 0 004 0" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable button component                                           */
/* ------------------------------------------------------------------ */

function BrutalButton({
  children,
  accent = "#1a1a1a",
  textColor = "#ffffff",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  accent?: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-800 font-sans font-bold text-sm rounded-none
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        transition-all duration-150 ${className}`}
      style={{ backgroundColor: accent, color: textColor }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Project card                                                        */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <div
      className="group bg-[#f5f5f5] border-2 border-gray-800 border-t-4 rounded-none
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
        transition-all duration-200 cursor-pointer overflow-hidden"
      style={{ borderTopColor: project.accent }}
    >
      {/* Top colored accent strip as visual element */}
      <div className="h-24 w-full border-b-2 border-gray-800 relative overflow-hidden" style={{ backgroundColor: project.accent + "22" }}>
        <div
          className="absolute top-4 left-4 w-10 h-10 border-2 border-gray-800"
          style={{ backgroundColor: project.accent }}
        />
        <div
          className="absolute bottom-3 right-4 font-mono text-xs font-semibold text-gray-800 tracking-widest uppercase"
        >
          {project.year}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-gray-500 border border-gray-300 px-2 py-0.5">
            {project.category}
          </span>
          <span className="font-mono text-xs font-bold text-gray-800">{project.id}</span>
        </div>
        <h3 className="font-sans font-bold text-xl text-[#1a1a1a] mb-2 group-hover:text-gray-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.desc}</p>
        <div className="flex items-center gap-1 text-xs font-mono font-semibold text-gray-700 group-hover:gap-2 transition-all">
          View project
          <IconArrow />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Do / Don't card                                                     */
/* ------------------------------------------------------------------ */

function DoCard({ rule }: { rule: (typeof DO_RULES)[0] }) {
  return (
    <div
      className="bg-[#f5f5f5] border-2 border-gray-800 border-t-4 rounded-none p-5
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
        transition-all duration-200"
      style={{ borderTopColor: rule.accent }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#1a1a1a]">
          <IconCheck />
        </span>
        <code className="font-mono text-[11px] font-semibold text-gray-700 bg-white border border-gray-300 px-2 py-0.5 truncate max-w-[180px]" title={rule.token}>
          {rule.token}
        </code>
      </div>
      <p className="font-sans font-bold text-sm text-[#1a1a1a] mb-1">{rule.what}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{rule.why}</p>
    </div>
  );
}

function DontCard({ rule }: { rule: (typeof DONT_RULES)[0] }) {
  return (
    <div className="bg-[#f5f5f5] border-2 border-gray-800 border-t-4 border-t-gray-400 rounded-none p-5
      shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-500">
          <IconX />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          avoid
        </span>
      </div>
      <p className="font-sans font-bold text-sm text-gray-700 mb-1">{rule.what}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{rule.why}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"Buttons" | "Cards" | "Inputs" | "Alerts">("Buttons");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [selectedOption, setSelectedOption] = useState("Select accent color");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const tabAccents: Record<string, string> = {
    Buttons: "#f472b6",
    Cards: "#a3e635",
    Inputs: "#38bdf8",
    Alerts: "#fbbf24",
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans">

      {/* ================================================================ */}
      {/* 1. Fixed Nav                                                      */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f5] border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link
                href="/styles/neo-brutalist-soft"
                className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#f472b6] transition-colors duration-150 flex items-center gap-1"
              >
                <span>&larr;</span>
                Back to Docs
              </Link>
              <div className="w-px h-4 bg-gray-800" />
              <span className="font-sans font-black text-lg tracking-tight text-[#1a1a1a]">
                Neo-Brutalist Soft
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {["Hero", "Components", "Palette", "Typography", "Principles"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-[#1a1a1a] transition-colors duration-150"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="/"
              className="font-mono text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-[#f472b6] transition-colors duration-150 flex items-center gap-1"
            >
              StyleKit
              <span className="text-[#f472b6]">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero                                                           */}
      {/* ================================================================ */}
      <section id="hero" className="pt-14 min-h-screen bg-[#f5f5f5] flex flex-col" ref={heroRef}>
        {/* Top accent bar */}
        <div className="w-full h-1.5 flex">
          {["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"].map((color) => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>

        <div className="flex-1 flex items-center px-6 md:px-12 max-w-7xl mx-auto w-full py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full items-center">

            {/* Left: 7 cols — Headline */}
            <div className="md:col-span-7">
              {/* Category tag */}
              <div
                className="inline-block mb-8"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 border-2 border-gray-800 px-3 py-1.5 bg-[#f5f5f5] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                  柔和野兽派 / Neo-Brutalist Soft
                </span>
              </div>

              {/* Main headline */}
              <h1 className="font-sans font-black leading-none tracking-tight mb-6">
                <span
                  className="block text-6xl md:text-7xl lg:text-8xl text-[#1a1a1a]"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.06s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.06s",
                  }}
                >
                  Structure
                </span>
                <span
                  className="block text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    color: "#f472b6",
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.13s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.13s",
                  }}
                >
                  with Soul.
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed mb-10"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s",
                }}
              >
                Neo-brutalist DNA — no rounded corners, hard offset shadows, hover displacement —
                softened with pastel accents and grey borders. Structure with personality.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.38s",
                }}
              >
                <BrutalButton accent="#f472b6" textColor="#ffffff">
                  Explore System
                  <IconArrow />
                </BrutalButton>
                <BrutalButton accent="#f5f5f5" textColor="#1a1a1a">
                  View Rules
                </BrutalButton>
              </div>
            </div>

            {/* Right: 5 cols — Visual accent panel stack */}
            <div
              className="md:col-span-5 hidden md:flex flex-col gap-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              {/* Main card panel */}
              <div className="bg-[#f5f5f5] border-2 border-gray-800 border-t-4 border-t-[#f472b6] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Design System
                  </span>
                  <div className="flex gap-1.5">
                    {["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"].map((c) => (
                      <div key={c} className="w-3 h-3 border border-gray-800" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <p className="font-sans font-black text-2xl text-[#1a1a1a] mb-1">Soft Brutalism</p>
                <p className="font-mono text-xs text-gray-500">border-2 · shadow-[4px_4px] · rounded-none</p>
              </div>

              {/* Row of accent squares */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { bg: "#f472b6", label: "Pink" },
                  { bg: "#a3e635", label: "Lime" },
                  { bg: "#38bdf8", label: "Sky" },
                  { bg: "#fbbf24", label: "Amber" },
                ].map((sq) => (
                  <div key={sq.bg} className="border-2 border-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]" style={{ backgroundColor: sq.bg }}>
                    <div className="h-10" />
                    <div className="border-t-2 border-gray-800 px-1.5 py-1 bg-[#f5f5f5]">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-700">{sq.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-2 border-gray-800 border-t-4 p-4 bg-[#f5f5f5] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
                    style={{ borderTopColor: stat.accent }}
                  >
                    <p className="font-sans font-black text-2xl text-[#1a1a1a]">{stat.value}</p>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. Component Demos                                                */}
      {/* ================================================================ */}
      <section id="components" className="py-20 md:py-28 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <RevealBlock className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                  System / Components
                </span>
                <h2 className="font-sans font-black text-4xl md:text-5xl text-[#1a1a1a]">
                  Component <span style={{ color: "#f472b6" }}>Demos</span>
                </h2>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Hard edges. Soft palette. Every element follows the same hover displacement physics.
              </p>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.05} className="mb-10">
            <div className="flex flex-wrap gap-2">
              {(["Buttons", "Cards", "Inputs", "Alerts"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setComponentTab(tab)}
                  className="px-5 py-2.5 border-2 border-gray-800 font-sans font-bold text-sm rounded-none transition-all duration-150
                    active:translate-x-[1px] active:translate-y-[1px]"
                  style={
                    componentTab === tab
                      ? {
                          backgroundColor: tabAccents[tab],
                          color: tab === "Cards" || tab === "Alerts" ? "#1a1a1a" : "#ffffff",
                          boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.2)",
                        }
                      : {
                          backgroundColor: "#f5f5f5",
                          color: "#4b5563",
                          boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.1)",
                        }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* ---- Buttons tab ---- */}
          {componentTab === "Buttons" && (
            <RevealBlock>
              <div className="bg-[#f5f5f5] border-2 border-gray-800 p-8 md:p-10 space-y-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]">

                {/* Primary variants */}
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">
                    Accent color variants — hover to lift, click to press
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <BrutalButton accent="#f472b6" textColor="#ffffff">
                      Pink Primary
                    </BrutalButton>
                    <BrutalButton accent="#a3e635" textColor="#1a1a1a">
                      Lime Primary
                    </BrutalButton>
                    <BrutalButton accent="#38bdf8" textColor="#1a1a1a">
                      Sky Primary
                    </BrutalButton>
                    <BrutalButton accent="#fbbf24" textColor="#1a1a1a">
                      Amber Primary
                    </BrutalButton>
                  </div>
                </div>

                {/* Ghost / secondary */}
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">
                    Ghost variants — off-white fill, grey offset shadow
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <BrutalButton accent="#f5f5f5" textColor="#1a1a1a">
                      Ghost Default
                    </BrutalButton>
                    <BrutalButton accent="#f5f5f5" textColor="#1a1a1a">
                      <IconArrow />
                      With Arrow
                    </BrutalButton>
                    <BrutalButton accent="#1a1a1a" textColor="#f5f5f5">
                      Near Black
                    </BrutalButton>
                  </div>
                </div>

                {/* Interaction code callout */}
                <div className="border-2 border-gray-800 border-l-4 bg-[#f5f5f5] p-5" style={{ borderLeftColor: "#f472b6" }}>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                    Interaction physics
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "hover:-translate-x-[2px] hover:-translate-y-[2px]",
                      "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]",
                      "active:translate-x-[2px] active:translate-y-[2px]",
                      "active:shadow-none",
                      "transition-all duration-150",
                    ].map((rule) => (
                      <code key={rule} className="block font-mono text-xs text-gray-700 bg-white border border-gray-200 px-3 py-1.5">
                        {rule}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ---- Cards tab ---- */}
          {componentTab === "Cards" && (
            <RevealBlock>
              <div className="space-y-8">
                {/* Accent top-border cards */}
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">
                    Colored accent top-border — border-t-4 with pastel accent
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { accent: "#f472b6", label: "Pink Card", text: "Hard offset shadow. Soft top accent." },
                      { accent: "#a3e635", label: "Lime Card", text: "Angular with personality. No gradients." },
                      { accent: "#38bdf8", label: "Sky Card", text: "Border-2 grey, not pure black." },
                      { accent: "#fbbf24", label: "Amber Card", text: "Hover lift displaces by 2px each axis." },
                    ].map((card) => (
                      <div
                        key={card.accent}
                        className="group bg-[#f5f5f5] border-2 border-gray-800 border-t-4 p-5 rounded-none
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                          hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                          transition-all duration-200 cursor-pointer"
                        style={{ borderTopColor: card.accent }}
                      >
                        <div className="w-6 h-6 mb-4 border-2 border-gray-800" style={{ backgroundColor: card.accent }} />
                        <p className="font-sans font-bold text-[#1a1a1a] mb-1">{card.label}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{card.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile card */}
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">
                    Content card — structured layout with avatar and tags
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: "Yuki Tanaka", role: "Visual Designer", tags: ["Brutalism", "Typography"], accent: "#f472b6" },
                      { name: "Alex Chen", role: "Product Engineer", tags: ["Systems", "UX"], accent: "#38bdf8" },
                    ].map((person) => (
                      <div
                        key={person.name}
                        className="group bg-[#f5f5f5] border-2 border-gray-800 border-t-4 rounded-none
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                          hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                          transition-all duration-200 overflow-hidden"
                        style={{ borderTopColor: person.accent }}
                      >
                        <div className="p-6 flex items-start gap-4">
                          <div
                            className="w-12 h-12 border-2 border-gray-800 flex items-center justify-center shrink-0 text-white"
                            style={{ backgroundColor: person.accent }}
                          >
                            <IconUser />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans font-bold text-[#1a1a1a] text-lg">{person.name}</p>
                            <p className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-3">{person.role}</p>
                            <div className="flex gap-2 flex-wrap">
                              {person.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[10px] font-bold uppercase tracking-widest border-2 border-gray-800 px-2 py-0.5"
                                  style={{ backgroundColor: person.accent + "33" }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ---- Inputs tab ---- */}
          {componentTab === "Inputs" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form fields */}
                <div className="bg-[#f5f5f5] border-2 border-gray-800 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] space-y-6">
                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 border-2 border-gray-800 bg-white font-sans text-sm text-[#1a1a1a] placeholder:text-gray-400
                        focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(244,114,182,0.4)] transition-shadow duration-150 rounded-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-800 bg-white font-sans text-sm text-[#1a1a1a] placeholder:text-gray-400
                        focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.4)] transition-shadow duration-150 rounded-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">
                      Message
                    </label>
                    <textarea
                      placeholder="Write something..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-800 bg-white font-sans text-sm text-[#1a1a1a] placeholder:text-gray-400
                        focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(163,230,53,0.4)] transition-shadow duration-150 rounded-none resize-none"
                    />
                  </div>

                  <BrutalButton accent="#f472b6" textColor="#ffffff" className="w-full justify-center">
                    Submit Form
                  </BrutalButton>
                </div>

                {/* Dropdown + toggles */}
                <div className="space-y-6">
                  {/* Dropdown */}
                  <div className="bg-[#f5f5f5] border-2 border-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">Dropdown</p>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 border-2 border-gray-800 bg-white font-sans font-bold text-sm text-[#1a1a1a] rounded-none
                          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]
                          hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                          active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                          transition-all duration-150"
                      >
                        <span>{selectedOption}</span>
                        <IconChevron open={dropdownOpen} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 z-20 bg-white border-2 border-gray-800 border-t-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                          {[
                            { label: "Soft Pink", color: "#f472b6" },
                            { label: "Lime Green", color: "#a3e635" },
                            { label: "Sky Blue", color: "#38bdf8" },
                            { label: "Amber", color: "#fbbf24" },
                          ].map((opt, i, arr) => (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => {
                                setSelectedOption(opt.label);
                                setDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-sans text-sm font-bold text-[#1a1a1a] hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}
                            >
                              <span className="w-3 h-3 border border-gray-800 shrink-0" style={{ backgroundColor: opt.color }} />
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="bg-[#f5f5f5] border-2 border-gray-800 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">Toggles</p>
                    <div className="space-y-3">
                      {[
                        { label: "Soft mode enabled", accent: "#f472b6" },
                        { label: "Pastel palette", accent: "#a3e635" },
                        { label: "Hard shadows", accent: "#38bdf8" },
                      ].map((item, i) => (
                        <div key={item.label} className="flex items-center justify-between p-3 border-2 border-gray-800 bg-white">
                          <span className="font-sans font-bold text-sm text-[#1a1a1a]">{item.label}</span>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={toggleStates[i]}
                            onClick={() => {
                              const next = [...toggleStates];
                              next[i] = !next[i];
                              setToggleStates(next);
                            }}
                            className="w-12 h-6 border-2 border-gray-800 relative transition-colors duration-200 rounded-none"
                            style={{ backgroundColor: toggleStates[i] ? item.accent : "#e5e7eb" }}
                          >
                            <span
                              className="absolute top-0.5 w-4 h-4 bg-white border border-gray-800 transition-all duration-200"
                              style={{ left: toggleStates[i] ? "calc(100% - 18px)" : "2px" }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ---- Alerts tab ---- */}
          {componentTab === "Alerts" && (
            <RevealBlock>
              <div className="space-y-4 max-w-2xl">
                {[
                  {
                    accent: "#a3e635",
                    label: "Success",
                    msg: "Component styles applied successfully. No rounded corners detected.",
                    icon: <IconCheck />,
                    textOn: "#1a1a1a",
                  },
                  {
                    accent: "#fbbf24",
                    label: "Warning",
                    msg: "Shadow opacity above 20% detected. Consider rgba(0,0,0,0.2) maximum.",
                    icon: <IconArrow />,
                    textOn: "#1a1a1a",
                  },
                  {
                    accent: "#f472b6",
                    label: "Error",
                    msg: "rounded-md found in component tree. Remove immediately — no rounding allowed.",
                    icon: <IconX />,
                    textOn: "#1a1a1a",
                  },
                  {
                    accent: "#38bdf8",
                    label: "Info",
                    msg: "This is the soft variant. Dark moody palettes belong in a different style.",
                    icon: <IconBell />,
                    textOn: "#1a1a1a",
                  },
                ].map((alert) => (
                  <div
                    key={alert.label}
                    className="flex items-start gap-4 border-2 border-gray-800 border-l-4 p-4 bg-[#f5f5f5] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]"
                    style={{ borderLeftColor: alert.accent }}
                  >
                    <span
                      className="shrink-0 mt-0.5 w-6 h-6 border-2 border-gray-800 flex items-center justify-center"
                      style={{ backgroundColor: alert.accent, color: alert.textOn }}
                    >
                      {alert.icon}
                    </span>
                    <div>
                      <p className="font-sans font-bold text-sm text-[#1a1a1a] mb-0.5">{alert.label}</p>
                      <p className="font-mono text-xs text-gray-600 leading-relaxed">{alert.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. Color Palette                                                  */}
      {/* ================================================================ */}
      <section id="palette" className="py-20 md:py-28 border-t-2 border-gray-800 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealBlock className="mb-12">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
              System / Colors
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Color <span style={{ color: "#a3e635" }}>Palette</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-md mt-3">
              Two structural tones plus four pastel accents. No gradients. No blends.
              Each accent lives on its own — clean signal, never noise.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PALETTE.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.05}>
                <div
                  className="group border-2 border-gray-800 overflow-hidden
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                    hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                    transition-all duration-200 cursor-pointer"
                >
                  <div
                    className="h-28 w-full"
                    style={{ backgroundColor: color.bg }}
                  />
                  <div className="border-t-2 border-gray-800 p-3 bg-[#f5f5f5]">
                    <p className="font-sans font-bold text-sm text-[#1a1a1a] mb-0.5">{color.name}</p>
                    <p className="font-mono text-[10px] text-gray-500">{color.hex}</p>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">{color.role}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Usage callout */}
          <RevealBlock delay={0.2} className="mt-10">
            <div className="border-2 border-gray-800 border-l-4 p-6 bg-[#f5f5f5] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]" style={{ borderLeftColor: "#f472b6" }}>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">Usage rules</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { rule: "Top accent borders", code: "border-t-4 border-t-[#f472b6]", desc: "Color identity on cards — single edge only." },
                  { rule: "Hover shadows", code: "shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]", desc: "Hard offset, no blur. Never pure black." },
                  { rule: "Fill backgrounds", code: "bg-[#f472b6] text-white", desc: "Only on buttons and accent elements — not full panels." },
                ].map((item) => (
                  <div key={item.rule}>
                    <p className="font-sans font-bold text-sm text-[#1a1a1a] mb-1">{item.rule}</p>
                    <code className="font-mono text-[11px] text-gray-600 bg-white border border-gray-200 px-2 py-1 block mb-1">{item.code}</code>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. Projects — showcasing the card system                         */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealBlock className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                  Card System / Projects
                </span>
                <h2 className="font-sans font-black text-4xl md:text-5xl text-[#1a1a1a]">
                  Project <span style={{ color: "#38bdf8" }}>Cards</span>
                </h2>
              </div>
              <BrutalButton accent="#1a1a1a" textColor="#f5f5f5">
                All Projects
                <IconArrow />
              </BrutalButton>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROJECTS.map((project, i) => (
              <RevealBlock key={project.id} delay={i * 0.07}>
                <ProjectCard project={project} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. Typography                                                     */}
      {/* ================================================================ */}
      <section id="typography" className="py-20 md:py-28 border-t-2 border-gray-800 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealBlock className="mb-12">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
              System / Type Scale
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Typography <span style={{ color: "#fbbf24" }}>System</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-md mt-3">
              <code className="font-mono text-xs bg-white border border-gray-200 px-1.5 py-0.5">font-sans font-bold</code> for headings.
              &nbsp;<code className="font-mono text-xs bg-white border border-gray-200 px-1.5 py-0.5">font-mono</code> for labels, tags, and technical text.
              Weight contrast creates hierarchy without decoration.
            </p>
          </RevealBlock>

          <div className="border-2 border-gray-800 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]">
            {TYPE_SCALE.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.04}>
                <div className={`flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 p-5 border-b-2 border-gray-800 last:border-0 bg-[#f5f5f5] group hover:bg-white transition-colors duration-150`}>
                  {/* Label column */}
                  <div className="w-full md:w-20 shrink-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {item.label}
                    </span>
                  </div>
                  {/* Sample */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className={`${item.size} ${item.weight} ${item.family} text-[#1a1a1a] leading-tight truncate`}>
                      {item.sample}
                    </p>
                  </div>
                  {/* Note */}
                  <div className="md:w-64 shrink-0">
                    <p className="font-mono text-[11px] text-gray-400">{item.note}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Contrast demo */}
          <RevealBlock delay={0.25} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-2 border-gray-800 border-t-4 p-6 bg-[#f5f5f5] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]" style={{ borderTopColor: "#f472b6" }}>
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                  font-sans font-black — headings
                </p>
                <p className="font-sans font-black text-5xl text-[#1a1a1a] leading-none">Bold</p>
                <p className="font-sans font-black text-5xl leading-none" style={{ color: "#f472b6" }}>Accent.</p>
              </div>
              <div className="border-2 border-gray-800 border-t-4 p-6 bg-[#f5f5f5] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]" style={{ borderTopColor: "#a3e635" }}>
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                  font-mono — labels and technical text
                </p>
                <p className="font-mono font-bold text-sm text-gray-700 mb-2 uppercase tracking-widest">CATEGORY / SYSTEM / TAG</p>
                <p className="font-mono text-sm text-gray-500">border-2 border-gray-800 rounded-none</p>
                <p className="font-mono text-sm text-gray-500">shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. Design Principles — DO / DON'T cards                          */}
      {/* ================================================================ */}
      <section id="principles" className="py-20 md:py-28 border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealBlock className="mb-12">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
              System / Rules
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl text-[#1a1a1a] mb-4">
              Design <span style={{ color: "#f472b6" }}>Principles</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-md">
              Not a list — shown as hard-bordered cards with the token, the rule, and the reason why.
              Every decision is traceable.
            </p>
          </RevealBlock>

          {/* DO section */}
          <div className="mb-10">
            <RevealBlock>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 bg-[#1a1a1a] border-2 border-gray-800 flex items-center justify-center text-white">
                  <IconCheck />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
                  DO — Rules to follow
                </span>
              </div>
            </RevealBlock>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DO_RULES.map((rule, i) => (
                <RevealBlock key={rule.token} delay={i * 0.05}>
                  <DoCard rule={rule} />
                </RevealBlock>
              ))}
            </div>
          </div>

          {/* DON'T section */}
          <div>
            <RevealBlock>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 bg-gray-300 border-2 border-gray-400 flex items-center justify-center text-gray-600">
                  <IconX />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
                  DON&apos;T — Rules to break
                </span>
              </div>
            </RevealBlock>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DONT_RULES.map((rule, i) => (
                <RevealBlock key={rule.what} delay={i * 0.05}>
                  <DontCard rule={rule} />
                </RevealBlock>
              ))}
            </div>
          </div>

          {/* VS comparison */}
          <RevealBlock delay={0.2} className="mt-12">
            <div className="border-2 border-gray-800 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]">
              <div className="bg-[#1a1a1a] px-6 py-3">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-300">
                  Neo-Brutalist Soft vs Classic Neo-Brutalist — Diff
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Soft */}
                <div className="p-6 bg-[#f5f5f5] border-r-0 md:border-r-2 border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 border-2 border-gray-800" style={{ backgroundColor: "#f472b6" }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">Neo-Brutalist Soft</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "border-2 border-gray-800 (not #000)",
                      "shadow rgba(0,0,0,0.2) — 20% opacity",
                      "hover:-translate-x-[2px] (2px lift)",
                      "border-t-4 pastel accents",
                      "bg-[#f5f5f5] off-white body",
                      "Pastel fills: pink, lime, sky, amber",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs">
                        <span style={{ color: "#a3e635" }}><IconCheck /></span>
                        <code className="font-mono text-gray-700">{item}</code>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Classic */}
                <div className="p-6 bg-white border-t-2 md:border-t-0 border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-black border-2 border-black" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-600">Classic Neo-Brutalist</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "border-2 border-black (pure #000)",
                      "shadow rgba(0,0,0,1) — full opacity",
                      "hover:-translate-x-[4px] (4px lift)",
                      "No top-border accents",
                      "bg-white pure white body",
                      "Saturated fills: primary colors",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs">
                        <span className="text-gray-400"><IconX /></span>
                        <code className="font-mono text-gray-400">{item}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Footer                                                            */}
      {/* ================================================================ */}
      <footer className="border-t-2 border-gray-800 bg-[#f5f5f5]">
        {/* Accent bar */}
        <div className="w-full h-1 flex">
          {["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"].map((color) => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <p className="font-sans font-black text-xl text-[#1a1a1a] mb-2">Neo-Brutalist Soft</p>
              <p className="font-mono text-xs text-gray-500 mb-4 uppercase tracking-wider">柔和野兽派</p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Structure with personality. Neo-brutalist DNA softened with pastel accents
                and grey tones. No rounded corners — ever.
              </p>
            </div>

            {/* Tokens */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                Core Tokens
              </p>
              <div className="space-y-2">
                {[
                  { label: "Border", value: "border-2 border-gray-800" },
                  { label: "Shadow", value: "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" },
                  { label: "Radius", value: "rounded-none" },
                  { label: "Hover", value: "hover:-translate-x-[2px]" },
                  { label: "Active", value: "active:shadow-none" },
                ].map((token) => (
                  <div key={token.label} className="flex items-baseline gap-3 text-xs">
                    <span className="font-mono font-bold text-gray-400 w-14 shrink-0">{token.label}</span>
                    <code className="font-mono text-gray-700 bg-white border border-gray-200 px-2 py-0.5 text-[10px] truncate">{token.value}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                Navigation
              </p>
              <div className="space-y-3">
                {[
                  { label: "StyleKit Home", href: "/" },
                  { label: "All Styles", href: "/styles" },
                  { label: "Neo-Brutalist", href: "/styles/neo-brutalist" },
                  { label: "Neo-Brutalist Playful", href: "/styles/neo-brutalist-playful" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#f472b6] font-sans transition-colors duration-150"
                  >
                    <IconArrow />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t-2 border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
              StyleKit · Neo-Brutalist Soft · 柔和野兽派
            </p>
            <div className="flex items-center gap-3">
              {["#f472b6", "#a3e635", "#38bdf8", "#fbbf24"].map((color) => (
                <div key={color} className="w-4 h-4 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
