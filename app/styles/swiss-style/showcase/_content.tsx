"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const articles = [
  {
    id: 1,
    category: "Typography",
    title: "The Rational Case for Helvetica",
    desc: "An objective analysis of why neutral letterforms communicate more effectively than expressive ones.",
    date: "2024",
    readTime: "6 min",
  },
  {
    id: 2,
    category: "Grid System",
    title: "12 Columns as Foundation",
    desc: "The mathematical precision of column grids eliminates ambiguity and enforces visual hierarchy without decoration.",
    date: "2024",
    readTime: "8 min",
  },
  {
    id: 3,
    category: "Color Theory",
    title: "Functional Use of Red",
    desc: "Red is not decoration. In Swiss design, red marks urgency, hierarchy, and structural emphasis — nothing else.",
    date: "2023",
    readTime: "4 min",
  },
  {
    id: 4,
    category: "Information Design",
    title: "Negative Space as Content",
    desc: "Generous whitespace is not emptiness. It is the deliberate absence that makes the present elements speak louder.",
    date: "2023",
    readTime: "5 min",
  },
  {
    id: 5,
    category: "Rationalism",
    title: "Form Follows Function",
    desc: "Every curve, every stroke, every weight decision must answer a structural question — never an aesthetic one.",
    date: "2022",
    readTime: "7 min",
  },
  {
    id: 6,
    category: "Whitespace",
    title: "Margins Are Not Waste",
    desc: "The Swiss school established that a layout with wide margins communicates confidence and trust in the content.",
    date: "2022",
    readTime: "5 min",
  },
];

const typographyScale = [
  { label: "Display", size: "text-[72px]", tracking: "tracking-tight", sample: "Swiss Design", weight: "font-bold", note: "72px — Section titles, hero display" },
  { label: "H1", size: "text-[48px]", tracking: "tracking-tight", sample: "International Style", weight: "font-bold", note: "48px — Page headings" },
  { label: "H2", size: "text-[32px]", tracking: "tracking-tight", sample: "Grid System Foundation", weight: "font-bold", note: "32px — Subsection headings" },
  { label: "H3", size: "text-[24px]", tracking: "tracking-normal", sample: "Rational Composition", weight: "font-semibold", note: "24px — Card headings" },
  { label: "Body", size: "text-[16px]", tracking: "tracking-normal", sample: "Objective information design principles guide every layout decision.", weight: "font-normal", note: "16px — Body copy" },
  { label: "Label", size: "text-[11px]", tracking: "tracking-[0.2em]", sample: "UPPERCASE CATEGORY LABEL", weight: "font-medium", note: "11px — Labels, metadata" },
];

const gridLayouts = [
  {
    label: "8 / 4",
    desc: "Content-heavy with sidebar accent",
    leftCols: "col-span-8",
    rightCols: "col-span-4",
    leftLabel: "Primary Content",
    rightLabel: "Sidebar",
    leftBg: "bg-[#f0f0f0]",
    rightBg: "bg-[#000000]",
  },
  {
    label: "6 / 6",
    desc: "Equal-weight comparison layout",
    leftCols: "col-span-6",
    rightCols: "col-span-6",
    leftLabel: "Column A",
    rightLabel: "Column B",
    leftBg: "bg-[#f0f0f0]",
    rightBg: "bg-[#f0f0f0]",
  },
  {
    label: "3 / 9",
    desc: "Narrow label with wide content",
    leftCols: "col-span-3",
    rightCols: "col-span-9",
    leftLabel: "Index",
    rightLabel: "Extended Content Area",
    leftBg: "bg-[#000000]",
    rightBg: "bg-[#f0f0f0]",
  },
];

const doRules = [
  "Rational Restraint: ONLY color and border-color change on hover — zero translate, scale, or shadow added",
  "Guide Line Extension: left border shifts from gray to red, bg shifts to #f0f0f0 on hover",
  "Hierarchy Focus: category/label text turns red via group-hover:text-[#ff0000]",
  "Clean Cut Transitions: duration-150 ease-out for ALL transitions — precise and efficient",
  "12-column grid with generous gap-8 whitespace between elements",
  "Left-aligned text always — centering is decoration, not information",
];

const dontRules = [
  "Never use translate, scale, or shadow changes on hover — Rational Restraint is absolute",
  "Never use transition-none — Swiss Style uses duration-150 ease-out (not instant cuts like swiss-poster)",
  "Never center body content — left-alignment is structural, not stylistic",
  "Never use serif fonts for any text element",
  "Never use gradients, blur effects, or drop shadows",
  "Never use gap-0 — Swiss Style has rational whitespace (gap-8), unlike swiss-poster's dense gap-0",
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function SwissButton({ children, variant = "primary" }: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "red";
}) {
  if (variant === "secondary") {
    return (
      <button className="group flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-[0.2em] border border-black hover:bg-[#f0f0f0] hover:border-[#ff0000] transition-colors duration-150 ease-out">
        {children}
        <ArrowIcon className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-2" />
      </button>
    );
  }
  if (variant === "red") {
    return (
      <button className="group flex items-center gap-3 px-6 py-3 bg-[#ff0000] text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#cc0000] transition-colors duration-150 ease-out">
        {children}
        <ArrowIcon className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-2" />
      </button>
    );
  }
  return (
    <button className="group flex items-center gap-3 px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#ff0000] transition-colors duration-150 ease-out">
      {children}
      <ArrowIcon className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-2" />
    </button>
  );
}

function GuideLineCard({ item }: { item: typeof articles[0] }) {
  return (
    <div className="group p-6 bg-white border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-all duration-150 ease-out cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
          {item.category}
        </p>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
          {item.date} — {item.readTime}
        </p>
      </div>
      <h3 className="text-xl font-bold text-black leading-tight mb-3">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {item.desc}
      </p>
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
        Read article
        <ArrowIcon className="w-3 h-3 transition-transform duration-150 ease-out group-hover:translate-x-2" />
      </div>
    </div>
  );
}

function SwissInput({ label, placeholder, type = "text" }: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder-gray-300 font-sans text-base focus:outline-none focus:border-[#ff0000] transition-colors duration-150 ease-out"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Section Header                                            */
/* ------------------------------------------------------------------ */

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <RevealBlock>
      <div className="mb-12 md:mb-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
          {label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          {title}
        </h2>
      </div>
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ===== 1. Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link
              href="/styles/swiss-style/showcase"
              className="text-sm font-bold uppercase tracking-[0.15em]"
            >
              Swiss International
            </Link>

            {/* Nav items */}
            <nav className="hidden md:flex items-center gap-8">
              {["Grid", "Typography", "Components", "Articles", "Rules"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link
                href="/styles"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out"
              >
                ← StyleKit
              </Link>
              <SwissButton>
                Get Started
              </SwissButton>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto" ref={heroRef}>
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left: 8 cols — Content */}
          <div className="col-span-12 md:col-span-8">
            {/* Label */}
            <p
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              International Style / 1950s
            </p>

            {/* Headline */}
            <h1
              className="font-bold text-black leading-none tracking-tight mb-6"
              style={{
                fontSize: "clamp(64px, 10vw, 96px)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s",
              }}
            >
              Swiss
              <br />
              <span className="text-gray-300">Design</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg text-gray-600 max-w-lg leading-relaxed mb-10"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              Rational, objective information design. The grid is the foundation. Typography is the voice.
              Clarity is the only goal — decoration is the enemy of communication.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-wrap items-center gap-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              <SwissButton>Explore the System</SwissButton>
              <SwissButton variant="secondary">Read the Rules</SwissButton>
            </div>
          </div>

          {/* Right: 4 cols — Red square decoration */}
          <div className="hidden md:flex col-span-4 justify-center items-start pt-4">
            <div
              className="w-full aspect-square bg-[#ff0000] relative"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              {/* Vertical label inside the square */}
              <span
                className="absolute bottom-6 left-6 font-bold text-white text-[10px] uppercase tracking-[0.35em]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
              >
                Helvetica — Objective — Grid — 1957
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Grid System ===== */}
      <section id="grid" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Structure" title="12-Column Grid System" />

          {/* Grid column visualization */}
          <RevealBlock delay={0.05} className="mb-16">
            <div className="relative mb-4">
              <div className="grid grid-cols-12 gap-2 h-8">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 border border-gray-200 flex items-center justify-center"
                  >
                    <span className="text-[9px] font-medium text-gray-400">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300 mt-2">
                12 equal columns — the rational foundation
              </p>
            </div>
          </RevealBlock>

          {/* Three layout examples */}
          <div className="space-y-6">
            {gridLayouts.map((layout, i) => (
              <RevealBlock key={layout.label} delay={i * 0.08}>
                <div className="group border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-all duration-150 ease-out pl-6 py-4 pr-4">
                  <div className="flex items-center gap-4 mb-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                      Layout {layout.label}
                    </p>
                    <p className="text-[11px] text-gray-300">{layout.desc}</p>
                  </div>
                  <div className="grid grid-cols-12 gap-2 h-16">
                    <div className={`${layout.leftCols} ${layout.leftBg} flex items-center justify-center`}>
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500">
                        {layout.leftLabel}
                      </span>
                    </div>
                    <div className={`${layout.rightCols} ${layout.rightBg} flex items-center justify-center`}>
                      <span className={`text-[10px] font-medium uppercase tracking-[0.15em] ${
                        layout.rightBg === "bg-[#000000]" ? "text-white" : "text-gray-500"
                      }`}>
                        {layout.rightLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Typography System ===== */}
      <section id="typography" className="py-24 md:py-32 px-6 md:px-12 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Typeface" title="Typography System" />

          <div className="space-y-0">
            {typographyScale.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.05}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 py-6 border-b border-gray-200 hover:bg-white hover:pl-4 transition-all duration-150 ease-out">
                  {/* Label column */}
                  <div className="md:w-24 flex-shrink-0">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                      {item.label}
                    </span>
                  </div>

                  {/* Sample column */}
                  <div className="flex-1 min-w-0">
                    <p className={`${item.size} ${item.weight} ${item.tracking} text-black leading-tight truncate`}>
                      {item.sample}
                    </p>
                  </div>

                  {/* Note column */}
                  <div className="md:w-56 flex-shrink-0">
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Tracking demonstration */}
          <RevealBlock delay={0.3} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border-l-[4px] border-[#cccccc]">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                  Wide Tracking — Labels
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-black">
                  CATEGORY / DATE / AUTHOR
                </p>
                <p className="text-[11px] text-gray-400 mt-3">tracking-[0.25em] — creates hierarchy without size</p>
              </div>
              <div className="p-8 bg-white border-l-[4px] border-[#cccccc]">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                  Tight Tracking — Headlines
                </p>
                <p className="text-4xl font-bold tracking-tight text-black">
                  Swiss Design
                </p>
                <p className="text-[11px] text-gray-400 mt-3">tracking-tight — authority and density at large scale</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Component Showcase ===== */}
      <section id="components" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Elements" title="Component Showcase" />

          {/* Tab switcher */}
          <RevealBlock delay={0.05} className="mb-12">
            <div className="flex border-b-2 border-black">
              {(["Buttons", "Cards", "Inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-150 ease-out ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-transparent text-gray-400 hover:text-[#ff0000]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "Buttons" && (
            <RevealBlock>
              <div className="space-y-12">
                {/* Primary */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Primary — Black fill, red on hover, arrow always present
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <SwissButton>Read Article</SwissButton>
                    <SwissButton>Explore System</SwissButton>
                    <SwissButton>Get Started</SwissButton>
                  </div>
                </div>

                {/* Secondary */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Secondary — White fill with border, subtle bg shift on hover
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <SwissButton variant="secondary">Learn More</SwissButton>
                    <SwissButton variant="secondary">View Docs</SwissButton>
                    <SwissButton variant="secondary">See Examples</SwissButton>
                  </div>
                </div>

                {/* Red / Accent */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Red Accent — For primary CTA only, use sparingly
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <SwissButton variant="red">Subscribe</SwissButton>
                    <SwissButton variant="red">Contact</SwissButton>
                  </div>
                </div>

                {/* Guide Line button variant */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Inline Link — Guide Line Extension on text links
                  </p>
                  <div className="flex flex-wrap gap-8">
                    {["Read the manifesto", "Download the grid", "View the archive"].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-black border-b border-[#cccccc] hover:border-[#ff0000] pb-1 transition-colors duration-150 ease-out"
                      >
                        <span className="group-hover:text-[#ff0000] transition-colors duration-150 ease-out">{label}</span>
                        <ArrowIcon className="w-3 h-3 transition-transform duration-150 ease-out group-hover:translate-x-2" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "Cards" && (
            <RevealBlock>
              <div className="space-y-10">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Guide Line Card — Left border activates from gray to red, bg to #f0f0f0. Category label turns red (Hierarchy Focus).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.slice(0, 2).map((item) => (
                      <GuideLineCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Minimal info card */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Minimal Info Card — Bottom border only, no side decorations
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {[
                      { num: "01", label: "Grid Columns", value: "12" },
                      { num: "02", label: "Base Unit", value: "8px" },
                      { num: "03", label: "Max Width", value: "1280px" },
                    ].map((stat) => (
                      <div
                        key={stat.num}
                        className="group py-8 px-6 border-b-2 border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-all duration-150 ease-out"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-3">
                          {stat.num} — {stat.label}
                        </p>
                        <p className="text-5xl font-bold text-black">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Inputs */}
          {activeTab === "Inputs" && (
            <RevealBlock>
              <div className="space-y-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Bottom-border only — Rational minimalism. No rounded corners. Focus activates red accent via transition-colors duration-150.
                </p>

                <div className="max-w-md space-y-8">
                  <SwissInput label="Full Name" placeholder="Josef Muller-Brockmann" />
                  <SwissInput label="Email Address" placeholder="your@address.com" type="email" />
                  <SwissInput label="Organization" placeholder="International Typographic Style" />
                  <SwissInput label="Subject" placeholder="Grid Systems in Graphic Design" />
                </div>

                <div className="max-w-md">
                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Your message here..."
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder-gray-300 font-sans text-base focus:outline-none focus:border-[#ff0000] resize-none transition-colors duration-150 ease-out"
                  />
                </div>

                <SwissButton>Submit Form</SwissButton>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== 6. Content Module — Article Listing ===== */}
      <section id="articles" className="py-24 md:py-32 px-6 md:px-12 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Knowledge Base
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-black">
                  Design Articles
                </h2>
              </div>
              <span className="hidden md:block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
                {articles.length} articles
              </span>
            </div>
          </RevealBlock>

          {/* Primary featured article */}
          <RevealBlock delay={0.05} className="mb-8">
            <div className="group grid grid-cols-12 gap-0 bg-white border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-all duration-150 ease-out cursor-pointer">
              <div className="col-span-12 md:col-span-8 p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-3">
                  {articles[0].category} — Featured
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight">
                  {articles[0].title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
                  {articles[0].desc}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                  Read article
                  <ArrowIcon className="w-3 h-3 transition-transform duration-150 ease-out group-hover:translate-x-2" />
                </div>
              </div>
              <div className="hidden md:flex col-span-4 bg-[#f0f0f0] group-hover:bg-[#e0e0e0] items-center justify-center transition-colors duration-150 ease-out">
                <div className="w-16 h-16 bg-[#ff0000]" />
              </div>
            </div>
          </RevealBlock>

          {/* Article listing grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((item, i) => (
              <RevealBlock key={item.id} delay={0.05 + i * 0.06}>
                <GuideLineCard item={item} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Design Rules ===== */}
      <section id="rules" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Manifesto" title="Design Rules" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock delay={0.05}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-black" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
                    Do
                  </h3>
                </div>
                <ul className="space-y-0">
                  {doRules.map((rule, i) => (
                    <li
                      key={rule}
                      className="group flex gap-4 py-4 border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] pl-4 pr-2 transition-all duration-150 ease-out cursor-default"
                    >
                      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-300 group-hover:text-[#ff0000] transition-colors duration-150 ease-out flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.1}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-gray-300" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-0">
                  {dontRules.map((rule, i) => (
                    <li
                      key={rule}
                      className="group flex gap-4 py-4 border-l-[4px] border-gray-200 pl-4 pr-2 cursor-default"
                    >
                      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-300 flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-gray-400 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Swiss Style vs Swiss Poster comparison */}
          <RevealBlock delay={0.2} className="mt-16">
            <div className="p-8 bg-[#f7f7f7] border-l-[4px] border-[#000000]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                Swiss Style vs Swiss Poster — Key Differences
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-bold text-black mb-3 uppercase tracking-[0.1em]">Swiss Style (this page)</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>— duration-150 ease-out (precise transitions)</li>
                    <li>— gap-8 rational whitespace</li>
                    <li>— Guide Line Extension (left border activation)</li>
                    <li>— Content-first, restrained typography</li>
                    <li>— Hierarchy Focus (label turns red)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-[0.1em]">Swiss Poster</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>— transition-none (hard cuts)</li>
                    <li>— gap-0 dense grid</li>
                    <li>— Color Block Invasion (full bg flip to black)</li>
                    <li>— 160px extreme typography</li>
                    <li>— Year label turns red (simpler hierarchy)</li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Footer ===== */}
      <footer className="bg-white border-t border-black py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-12 md:col-span-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-black mb-3">
                Swiss International
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Rational, objective information design. Grid system, sans-serif, negative space, clarity above all.
              </p>
            </div>

            {/* Navigation columns */}
            <div className="col-span-6 md:col-span-2 md:col-start-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                Sections
              </p>
              <ul className="space-y-3">
                {["Grid", "Typography", "Components", "Articles", "Rules"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-gray-500 hover:text-[#ff0000] transition-colors duration-150 ease-out"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                Resources
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Documentation", href: "/styles/swiss-style" },
                  { label: "All Styles", href: "/styles" },
                  { label: "Swiss Poster", href: "/styles/swiss-poster" },
                  { label: "StyleKit", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-[#ff0000] transition-colors duration-150 ease-out"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                Principles
              </p>
              <ul className="space-y-3">
                {["Rationalism", "Clarity", "Grid First", "Objectivity"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-gray-100 gap-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
              Swiss International Style — StyleKit Component System
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[11px] text-gray-300">Helvetica — Grid — Objectivity — 1957</span>
              <div className="w-4 h-4 bg-[#ff0000]" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
