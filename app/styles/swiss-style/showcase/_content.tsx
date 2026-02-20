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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ARTICLES = [
  {
    id: 1,
    category: "Typography",
    title: "The Rational Case for Helvetica",
    desc: "An objective analysis of why neutral letterforms communicate more effectively than expressive ones in information design.",
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

const TYPOGRAPHY_SCALE = [
  {
    label: "Display",
    size: "text-[72px]",
    tracking: "tracking-tight",
    sample: "Swiss Design",
    weight: "font-bold",
    note: "72px — Section titles, hero display",
  },
  {
    label: "H1",
    size: "text-[48px]",
    tracking: "tracking-tight",
    sample: "International Style",
    weight: "font-bold",
    note: "48px — Page headings",
  },
  {
    label: "H2",
    size: "text-[32px]",
    tracking: "tracking-tight",
    sample: "Grid System Foundation",
    weight: "font-bold",
    note: "32px — Subsection headings",
  },
  {
    label: "H3",
    size: "text-[24px]",
    tracking: "tracking-normal",
    sample: "Rational Composition",
    weight: "font-semibold",
    note: "24px — Card headings",
  },
  {
    label: "Body",
    size: "text-[16px]",
    tracking: "tracking-normal",
    sample: "Objective information design principles guide every layout decision.",
    weight: "font-normal",
    note: "16px — Body copy",
  },
  {
    label: "Label",
    size: "text-[11px]",
    tracking: "tracking-[0.2em]",
    sample: "UPPERCASE CATEGORY LABEL",
    weight: "font-medium",
    note: "11px — Labels, metadata",
  },
];

const GRID_LAYOUTS = [
  {
    label: "8 / 4",
    desc: "Content-heavy with sidebar accent",
    leftCols: "col-span-8",
    rightCols: "col-span-4",
    leftLabel: "Primary Content",
    rightLabel: "Sidebar",
    leftBg: "bg-[#f0f0f0]",
    rightBg: "bg-[#000000]",
    rightText: "text-white",
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
    rightText: "text-gray-500",
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
    rightText: "text-gray-500",
  },
  {
    label: "4 / 4 / 4",
    desc: "Three-column equal division",
    leftCols: "col-span-4",
    rightCols: "col-span-8",
    leftLabel: "Col 1",
    rightLabel: "Col 2 + Col 3",
    leftBg: "bg-[#ff0000]",
    rightBg: "bg-[#f0f0f0]",
    rightText: "text-gray-500",
  },
];

const DO_RULES = [
  "Rational Restraint: ONLY color and border-color change on hover — zero translate, scale, or shadow added",
  "Guide Line Extension: left border shifts from gray to red, bg shifts to #f0f0f0 on hover",
  "Hierarchy Focus: category/label text turns red via group-hover:text-[#ff0000]",
  "Clean Cut Transitions: duration-150 ease-out for ALL transitions — precise and efficient",
  "12-column grid with generous gap-8 whitespace between elements",
  "Left-aligned text always — centering is decoration, not information",
  "Arrows on all buttons — directional intent is always explicit",
];

const DONT_RULES = [
  "Never use translate, scale, or shadow changes on hover — Rational Restraint is absolute",
  "Never use duration-300+ transitions — Swiss Style uses duration-150 ease-out only",
  "Never center body content — left-alignment is structural, not stylistic",
  "Never use serif fonts for any text element",
  "Never use gradients, blur effects, or drop shadows anywhere",
  "Never use decorative elements without structural purpose",
  "Never use buttons without arrows — directional clarity is non-negotiable",
];

const DESIGN_PRINCIPLES = [
  {
    number: "01",
    title: "Grid as Law",
    desc: "The column grid is not a suggestion — it is the invisible skeleton that supports every element on the page. Violating the grid is not creativity; it is chaos.",
    accent: "#ff0000",
  },
  {
    number: "02",
    title: "Helvetica as Voice",
    desc: "Sans-serif typefaces — Helvetica first — carry no historical baggage, no national accent. They speak directly, without decoration, without emotion.",
    accent: "#000000",
  },
  {
    number: "03",
    title: "Negative Space as Content",
    desc: "The Swiss school understood that what is absent defines what is present. Generous margins and leading give the eye room to rest and the mind room to understand.",
    accent: "#0057b8",
  },
  {
    number: "04",
    title: "Red as Signal",
    desc: "Red appears once per composition — at the point of highest hierarchy. It is not decoration. It is a functional marker that commands the viewer's eye with precision.",
    accent: "#ff0000",
  },
];

const PALETTE = [
  { name: "Black", hex: "#000000", bg: "bg-[#000000]", text: "text-white", role: "Primary" },
  { name: "White", hex: "#ffffff", bg: "bg-white border border-gray-200", text: "text-black", role: "Ground" },
  { name: "Red", hex: "#ff0000", bg: "bg-[#ff0000]", text: "text-white", role: "Accent / Signal" },
  { name: "Blue", hex: "#0057b8", bg: "bg-[#0057b8]", text: "text-white", role: "Punctuation" },
  { name: "Yellow", hex: "#ffcc00", bg: "bg-[#ffcc00]", text: "text-black", role: "Punctuation" },
  { name: "Gray", hex: "#f0f0f0", bg: "bg-[#f0f0f0]", text: "text-black", role: "Surface" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
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

function SwissButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "red";
  onClick?: () => void;
}) {
  if (variant === "secondary") {
    return (
      <button
        onClick={onClick}
        className="group flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-[0.2em] border border-black hover:bg-[#f0f0f0] hover:border-[#ff0000] transition-colors duration-150 ease-out"
      >
        {children}
        <ArrowIcon className="w-4 h-4" />
      </button>
    );
  }
  if (variant === "red") {
    return (
      <button
        onClick={onClick}
        className="group flex items-center gap-3 px-6 py-3 bg-[#ff0000] text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-black transition-colors duration-150 ease-out"
      >
        {children}
        <ArrowIcon className="w-4 h-4" />
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#ff0000] transition-colors duration-150 ease-out"
    >
      {children}
      <ArrowIcon className="w-4 h-4" />
    </button>
  );
}

function GuideLineCard({ item }: { item: typeof ARTICLES[0] }) {
  return (
    <div className="group p-6 bg-white border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-colors duration-150 ease-out cursor-pointer">
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
        <ArrowIcon className="w-3 h-3" />
      </div>
    </div>
  );
}

function SwissInput({
  label,
  placeholder,
  type = "text",
}: {
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
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export default function SwissStyleShowcase() {
  const [activeTab, setActiveTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons");
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link
              href="/styles/swiss-style/showcase"
              className="text-sm font-bold uppercase tracking-[0.15em] text-black"
            >
              Swiss International
            </Link>

            {/* Nav items */}
            <nav className="hidden md:flex items-center gap-8">
              {["Grid", "Typography", "Poster", "Components", "Articles", "Principles"].map((item) => (
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
                className="hidden md:block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out"
              >
                StyleKit
              </Link>
              <SwissButton>
                Get Started
              </SwissButton>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left: 8 cols — Content */}
          <div className="col-span-12 md:col-span-8">
            {/* Red accent bar */}
            <div
              className="w-16 h-1 bg-[#ff0000] mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />

            {/* Label */}
            <p
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
              }}
            >
              International Style / Zürich 1950s
            </p>

            {/* Headline */}
            <h1
              className="font-bold text-black leading-none tracking-tight mb-2"
              style={{
                fontSize: "clamp(64px, 9vw, 96px)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Form
            </h1>
            <h1
              className="font-bold leading-none tracking-tight mb-8"
              style={{
                fontSize: "clamp(64px, 9vw, 96px)",
                color: "#cccccc",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s",
              }}
            >
              follows function.
            </h1>

            {/* Description */}
            <p
              className="text-lg text-gray-600 max-w-lg leading-relaxed mb-10"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
            >
              Rational, objective information design. The grid is the foundation.
              Typography is the voice. Clarity is the only goal — decoration is
              the enemy of communication.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-wrap items-center gap-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.38s",
              }}
            >
              <SwissButton>Explore the System</SwissButton>
              <SwissButton variant="secondary">Read the Rules</SwissButton>
            </div>
          </div>

          {/* Right: 4 cols — Red square */}
          <div className="hidden md:flex col-span-4 justify-center items-start pt-4">
            <div
              className="w-full aspect-square bg-[#ff0000] relative"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              <span
                className="absolute bottom-6 left-6 font-bold text-white text-[10px] uppercase tracking-[0.35em]"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
              >
                Helvetica — Objective — Grid — 1957
              </span>
              {/* Small white square in corner */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-white" />
            </div>
          </div>
        </div>

        {/* Hero stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-20 border-t border-gray-100 pt-12"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          {[
            { value: "1950s", label: "Origin" },
            { value: "12", label: "Grid Columns" },
            { value: "Helvetica", label: "Primary Typeface" },
            { value: "1", label: "Accent Color" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group py-6 pr-8 border-r border-gray-100 last:border-r-0 hover:bg-[#f0f0f0] transition-colors duration-150 ease-out pl-2"
            >
              <p className="text-2xl md:text-3xl font-bold text-black mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. Grid System Demo ===== */}
      <section id="grid" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Structure" title="12-Column Grid System" />

          {/* Column visualization */}
          <RevealBlock delay={0.05} className="mb-16">
            <div className="mb-4">
              <div className="grid grid-cols-12 gap-2 h-10 mb-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#f0f0f0] border border-gray-200 flex items-center justify-center relative"
                  >
                    <span className="text-[9px] font-bold text-gray-400">{i + 1}</span>
                    {/* Baseline grid lines */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
                12 equal columns — the rational foundation of all layout decisions
              </p>
            </div>
          </RevealBlock>

          {/* Baseline grid demonstration */}
          <RevealBlock delay={0.1} className="mb-16">
            <div className="border-l-[4px] border-[#cccccc] pl-6 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-4">
                Baseline Grid — 8px unit
              </p>
              <div className="relative h-32 overflow-hidden">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: `${i * 8}px` }}
                  />
                ))}
                <p className="relative text-2xl font-bold text-black leading-8">
                  Swiss International Style
                </p>
                <p className="relative text-base text-gray-600 leading-8 mt-0">
                  Every line of text sits on the baseline grid.
                </p>
                <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 leading-8 mt-0">
                  Labels align to the same 8px unit system
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Layout examples */}
          <div className="space-y-4">
            <RevealBlock>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                Standard Layout Ratios
              </p>
            </RevealBlock>
            {GRID_LAYOUTS.map((layout, i) => (
              <RevealBlock key={layout.label} delay={i * 0.07}>
                <div className="group border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-colors duration-150 ease-out pl-6 py-4 pr-4">
                  <div className="flex items-center gap-6 mb-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                      {layout.label}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                      {layout.desc}
                    </p>
                  </div>
                  <div className="grid grid-cols-12 gap-2 h-14">
                    <div className={`${layout.leftCols} ${layout.leftBg} flex items-center justify-center`}>
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500">
                        {layout.leftLabel}
                      </span>
                    </div>
                    <div className={`${layout.rightCols} ${layout.rightBg} flex items-center justify-center`}>
                      <span className={`text-[10px] font-medium uppercase tracking-[0.15em] ${layout.rightText}`}>
                        {layout.rightLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color palette */}
          <RevealBlock delay={0.3} className="mt-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
              Color System
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
              {PALETTE.map((color) => (
                <div
                  key={color.name}
                  className="group border-b-2 border-[#cccccc] hover:border-[#ff0000] transition-colors duration-150 ease-out"
                >
                  <div className={`${color.bg} h-20`} />
                  <div className="py-4 px-2 hover:bg-[#f0f0f0] transition-colors duration-150 ease-out">
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-black group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                      {color.name}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">{color.hex}</p>
                    <p className="text-[10px] text-gray-300 mt-0.5 uppercase tracking-[0.1em]">{color.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 4. Typography Showcase ===== */}
      <section id="typography" className="py-24 md:py-32 px-6 md:px-12 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Typeface" title="Typography System" />

          {/* Type scale table */}
          <div className="space-y-0 mb-16">
            {TYPOGRAPHY_SCALE.map((item, i) => (
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
          <RevealBlock delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border-l-[4px] border-[#cccccc]">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                  Wide Tracking — Labels
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-black">
                  CATEGORY / DATE / AUTHOR
                </p>
                <p className="text-[11px] text-gray-400 mt-3">
                  tracking-[0.25em] — creates hierarchy without size change
                </p>
              </div>
              <div className="p-8 bg-white border-l-[4px] border-[#ff0000]">
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                  Tight Tracking — Headlines
                </p>
                <p className="text-4xl font-bold tracking-tight text-black">
                  Swiss Design
                </p>
                <p className="text-[11px] text-gray-400 mt-3">
                  tracking-tight — authority and density at large scale
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Left-alignment demonstration */}
          <RevealBlock delay={0.4} className="mt-8">
            <div className="p-8 bg-white border-l-[4px] border-[#000000]">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-6">
                Left Alignment — The Only Rational Choice
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#ff0000] mb-3">
                    Correct
                  </p>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-black text-left">Swiss International</p>
                    <p className="text-sm text-gray-600 text-left">Grid-based rational design</p>
                    <p className="text-[11px] text-gray-400 text-left uppercase tracking-[0.2em]">Category Label</p>
                  </div>
                </div>
                <div className="opacity-40">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Incorrect
                  </p>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-black text-center">Swiss International</p>
                    <p className="text-sm text-gray-600 text-center">Grid-based rational design</p>
                    <p className="text-[11px] text-gray-400 text-center uppercase tracking-[0.2em]">Category Label</p>
                  </div>
                </div>
                <div className="opacity-40">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Also Incorrect
                  </p>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-black text-right">Swiss International</p>
                    <p className="text-sm text-gray-600 text-right">Grid-based rational design</p>
                    <p className="text-[11px] text-gray-400 text-right uppercase tracking-[0.2em]">Category Label</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Poster Section — Josef Müller-Brockmann Inspired ===== */}
      <section id="poster" className="py-0 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="px-6 md:px-12 pt-24 md:pt-32 pb-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
                Inspiration
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Müller-Brockmann Poster Study
              </h2>
            </div>
          </RevealBlock>

          {/* Poster composition */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[600px]">
              {/* Left: Poster composition */}
              <div className="bg-[#000000] relative overflow-hidden flex items-center justify-center p-12 min-h-[500px]">
                {/* Geometric circle — primary element */}
                <div
                  className="absolute"
                  style={{ width: "380px", height: "380px", bottom: "-80px", left: "-80px" }}
                >
                  <svg viewBox="0 0 380 380" fill="none">
                    <circle cx="190" cy="190" r="190" fill="#ff0000" />
                  </svg>
                </div>
                {/* Second circle — partial */}
                <div
                  className="absolute"
                  style={{ width: "240px", height: "240px", top: "-40px", right: "20px" }}
                >
                  <svg viewBox="0 0 240 240" fill="none">
                    <circle cx="120" cy="120" r="120" fill="none" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
                {/* Horizontal rule */}
                <div className="absolute left-0 right-0 border-t border-white/20" style={{ top: "45%" }} />
                {/* Text overlay */}
                <div className="relative z-10 text-left w-full">
                  <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50 mb-6">
                    Musica Viva — Zürich 1960
                  </p>
                  <p className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
                    CONCERT
                  </p>
                  <p className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-12">
                    HALL
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-white" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
                      Tonhalle Orchester
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Analysis */}
              <div className="bg-white px-8 md:px-12 py-12 md:py-16 flex flex-col justify-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#ff0000] mb-6">
                  Design Analysis
                </p>
                <h3 className="text-2xl font-bold text-black mb-6 leading-tight">
                  The Circle as Structural Element
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-8">
                  In Josef Müller-Brockmann&apos;s concert posters, geometric
                  forms — especially the circle — represent musical movement and
                  rhythm. The shapes do not decorate. They structure. They divide
                  the space into zones of meaning.
                </p>

                <div className="space-y-0">
                  {[
                    { label: "Geometry", value: "Circle — movement, rhythm, continuity" },
                    { label: "Palette", value: "Black ground, red signal, white text" },
                    { label: "Type", value: "Akzidenz-Grotesk — pre-Helvetica Swiss" },
                    { label: "Layout", value: "Diagonal tension against a rigid grid" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="group py-4 border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-colors duration-150 ease-out pl-4"
                    >
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm text-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <SwissButton variant="secondary">View Poster Archive</SwissButton>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Second poster row */}
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-gray-100">
              {[
                {
                  title: "BEETHOVEN",
                  subtitle: "Sinfonie Nr. 9",
                  bg: "bg-white",
                  textColor: "text-black",
                  circleColor: "#0057b8",
                  stroke: false,
                  year: "1955",
                },
                {
                  title: "BARTÓK",
                  subtitle: "String Quartet",
                  bg: "bg-[#ff0000]",
                  textColor: "text-white",
                  circleColor: "#ffffff",
                  stroke: false,
                  year: "1957",
                },
                {
                  title: "SCHOENBERG",
                  subtitle: "Chamber Symphony",
                  bg: "bg-[#000000]",
                  textColor: "text-white",
                  circleColor: "#ffcc00",
                  stroke: false,
                  year: "1959",
                },
              ].map((poster) => (
                <div
                  key={poster.title}
                  className={`group ${poster.bg} relative overflow-hidden flex flex-col justify-between p-8 min-h-[320px] border-r border-gray-100 last:border-r-0 hover:opacity-90 transition-opacity duration-150 ease-out`}
                >
                  <div
                    className="absolute bottom-0 right-0"
                    style={{ width: "200px", height: "200px" }}
                  >
                    <svg viewBox="0 0 200 200" fill="none">
                      <circle
                        cx="100"
                        cy="100"
                        r="100"
                        fill={poster.circleColor}
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-medium uppercase tracking-[0.35em] opacity-50 mb-2" style={{ color: poster.bg === "bg-white" ? "#000000" : "#ffffff" }}>
                      Musica Viva — {poster.year}
                    </p>
                  </div>
                  <div className="relative z-10">
                    <p className={`text-3xl font-black leading-none tracking-tight mb-1 ${poster.textColor}`}>
                      {poster.title}
                    </p>
                    <p className={`text-sm font-medium uppercase tracking-[0.15em] ${poster.textColor} opacity-70`}>
                      {poster.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Component Showcase ===== */}
      <section id="components" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-100">
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
                    Red Accent — Primary CTA only, use sparingly, turns black on hover
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <SwissButton variant="red">Subscribe</SwissButton>
                    <SwissButton variant="red">Contact</SwissButton>
                  </div>
                </div>

                {/* Inline text links */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Inline Link — Guide Line Extension on text links, border shifts to red
                  </p>
                  <div className="flex flex-wrap gap-8">
                    {["Read the manifesto", "Download the grid", "View the archive"].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-black border-b border-[#cccccc] hover:border-[#ff0000] pb-1 transition-colors duration-150 ease-out"
                      >
                        <span className="group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                          {label}
                        </span>
                        <ArrowIcon className="w-3 h-3" />
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
                {/* Guide Line Cards */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Guide Line Card — Left border gray → red, bg → #f0f0f0. Category label turns red (Hierarchy Focus).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ARTICLES.slice(0, 2).map((item) => (
                      <GuideLineCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Stat cards */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Stat Card — Bottom border activation, number-led hierarchy
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {[
                      { num: "01", label: "Grid Columns", value: "12" },
                      { num: "02", label: "Base Unit", value: "8px" },
                      { num: "03", label: "Max Width", value: "1280px" },
                    ].map((stat) => (
                      <div
                        key={stat.num}
                        className="group py-8 px-6 border-b-2 border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-colors duration-150 ease-out"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-3">
                          {stat.num} — {stat.label}
                        </p>
                        <p className="text-5xl font-bold text-black">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info card */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Full-width Feature Card — Left border, generous padding, grid-aligned
                  </p>
                  <div className="group border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-colors duration-150 ease-out p-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-4">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-3">
                          Featured — Grid Systems
                        </p>
                        <p className="text-2xl font-bold text-black leading-tight">
                          Grid Systems in Graphic Design
                        </p>
                      </div>
                      <div className="md:col-span-6 md:col-start-7">
                        <p className="text-base text-gray-600 leading-relaxed">
                          Josef Müller-Brockmann&apos;s 1981 book remains the definitive
                          reference for rational layout. Its principles — modular grids,
                          proportional type scales, systematic whitespace — underpin all
                          Swiss International work.
                        </p>
                      </div>
                    </div>
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
                  <SwissInput label="Full Name" placeholder="Josef Müller-Brockmann" />
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

      {/* ===== 7. Articles Listing ===== */}
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
                {ARTICLES.length} articles
              </span>
            </div>
          </RevealBlock>

          {/* Featured article */}
          <RevealBlock delay={0.05} className="mb-8">
            <div className="group grid grid-cols-12 gap-0 bg-white border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-colors duration-150 ease-out cursor-pointer">
              <div className="col-span-12 md:col-span-8 p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-3">
                  {ARTICLES[0].category} — Featured
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight">
                  {ARTICLES[0].title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
                  {ARTICLES[0].desc}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out">
                  Read article
                  <ArrowIcon className="w-3 h-3" />
                </div>
              </div>
              <div className="hidden md:flex col-span-4 bg-[#f0f0f0] group-hover:bg-[#e4e4e4] items-center justify-center transition-colors duration-150 ease-out">
                <div className="w-16 h-16 bg-[#ff0000]" />
              </div>
            </div>
          </RevealBlock>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.slice(1).map((item, i) => (
              <RevealBlock key={item.id} delay={0.05 + i * 0.06}>
                <GuideLineCard item={item} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. Design Principles ===== */}
      <section id="principles" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Manifesto" title="Design Principles" />

          {/* Principle selector */}
          <RevealBlock delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Tabs */}
              <div className="md:col-span-4 space-y-0">
                {DESIGN_PRINCIPLES.map((p, i) => (
                  <button
                    key={p.number}
                    onClick={() => setActivePrinciple(i)}
                    className={`group w-full text-left py-5 px-4 border-l-[4px] transition-colors duration-150 ease-out flex items-center gap-4 ${
                      activePrinciple === i
                        ? "border-[#ff0000] bg-[#f0f0f0]"
                        : "border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0]"
                    }`}
                  >
                    <span className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-150 ease-out flex-shrink-0 ${
                      activePrinciple === i ? "text-[#ff0000]" : "text-gray-300 group-hover:text-[#ff0000]"
                    }`}>
                      {p.number}
                    </span>
                    <span className={`text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-150 ease-out ${
                      activePrinciple === i ? "text-black" : "text-gray-400 group-hover:text-black"
                    }`}>
                      {p.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="md:col-span-7 md:col-start-6">
                <div className="border-l-[4px] border-[#ff0000] pl-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#ff0000] mb-4">
                    {DESIGN_PRINCIPLES[activePrinciple].number}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
                    {DESIGN_PRINCIPLES[activePrinciple].title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {DESIGN_PRINCIPLES[activePrinciple].desc}
                  </p>
                  <SwissButton variant="secondary">Learn More</SwissButton>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Do / Don't rules */}
          <RevealBlock delay={0.15} className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DO column */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-black" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
                    Do
                  </h3>
                </div>
                <ul className="space-y-0">
                  {DO_RULES.map((rule, i) => (
                    <li
                      key={rule}
                      className="group flex gap-4 py-4 border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] pl-4 pr-2 transition-colors duration-150 ease-out cursor-default"
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

              {/* DON'T column */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-gray-300" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-0">
                  {DONT_RULES.map((rule, i) => (
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
            </div>
          </RevealBlock>

          {/* Interaction rules callout */}
          <RevealBlock delay={0.25} className="mt-12">
            <div className="p-8 bg-[#f7f7f7] border-l-[4px] border-[#000000]">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-6">
                Interaction Design Rules — Swiss International
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm font-bold text-black mb-3 uppercase tracking-[0.1em]">
                    Rational Restraint
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Only color and border-color change on interaction. Zero translate, scale, or shadow changes. The grid must not be disturbed.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-black mb-3 uppercase tracking-[0.1em]">
                    Guide Line Extension
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Left border changes gray → red on hover. Background shifts to #f0f0f0. Category label activates red via group-hover.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-black mb-3 uppercase tracking-[0.1em]">
                    Clean Cut Transitions
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    All transitions use duration-150 ease-out exclusively. Precise and efficient — never decorative.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 9. Footer ===== */}
      <footer className="bg-white border-t border-black py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-12 md:col-span-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-black mb-3">
                Swiss International
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
                Rational, objective information design. Grid system, sans-serif,
                negative space, clarity above all.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ff0000]" />
                <div className="w-4 h-4 bg-[#0057b8]" />
                <div className="w-4 h-4 bg-[#ffcc00]" />
                <div className="w-4 h-4 bg-black" />
              </div>
            </div>

            {/* Navigation columns */}
            <div className="col-span-6 md:col-span-2 md:col-start-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400 mb-4">
                Sections
              </p>
              <ul className="space-y-3">
                {["Grid", "Typography", "Poster", "Components", "Articles", "Principles"].map((item) => (
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
                  { label: "Bauhaus", href: "/styles/bauhaus" },
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
                {["Grid as Law", "Helvetica as Voice", "Negative Space", "Red as Signal", "Left Alignment", "Objectivity"].map((item) => (
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
              <span className="text-[11px] text-gray-300">
                Helvetica — Grid — Objectivity — 1957
              </span>
              <div className="w-4 h-4 bg-[#ff0000]" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
