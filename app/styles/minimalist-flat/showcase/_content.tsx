"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Components", href: "#components" },
  { label: "Colors", href: "#colors" },
  { label: "Typography", href: "#typography" },
  { label: "Rules", href: "#rules" },
];

const COLOR_SWATCHES = [
  { name: "Black", hex: "#000000", bg: "bg-black", text: "text-white", border: "" },
  { name: "White", hex: "#FFFFFF", bg: "bg-white", text: "text-black", border: "border-2 border-black" },
  { name: "Coral", hex: "#FF3366", bg: "bg-[#ff3366]", text: "text-white", border: "" },
  { name: "Teal", hex: "#00D4AA", bg: "bg-[#00d4aa]", text: "text-black", border: "" },
  { name: "Yellow", hex: "#FFCC00", bg: "bg-[#ffcc00]", text: "text-black", border: "" },
];

const BUTTON_VARIANTS = [
  {
    label: "Primary",
    cls: "bg-black text-white border-2 border-black hover:bg-white hover:text-black",
    note: "Fill inverts on hover",
  },
  {
    label: "Secondary",
    cls: "bg-white text-black border-2 border-black hover:bg-black hover:text-white",
    note: "Outline inverts on hover",
  },
  {
    label: "Accent",
    cls: "bg-[#ff3366] text-white border-2 border-[#ff3366] hover:bg-white hover:text-[#ff3366]",
    note: "Single accent pop",
  },
  {
    label: "Ghost",
    cls: "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white",
    note: "Transparent fill",
  },
];

const CARD_ITEMS = [
  {
    num: "01",
    title: "Reduction",
    body: "Strip every element to its minimum viable form. If it cannot justify its presence, remove it.",
    accent: "",
  },
  {
    num: "02",
    title: "Contrast",
    body: "Pure black on pure white. The starkest contrast available. No shades, no compromises.",
    accent: "hover:bg-[#ff3366] hover:text-white hover:border-[#ff3366]",
  },
  {
    num: "03",
    title: "Grid",
    body: "Swiss-influenced column grids create invisible order. Alignment is meaning.",
    accent: "hover:bg-black hover:text-white",
  },
];

const DO_LIST = [
  "Use pure solid backgrounds: bg-white, bg-black, bg-[accent]",
  "Define edges with border-2 border-black — never shadows",
  "Keep corners consistent: all rounded-none or all rounded-full",
  "Apply high-contrast color pairings throughout",
  "Use generous whitespace: space-y-12 md:space-y-24",
  "Hover = color inversion, not depth or scale change",
  "Labels in uppercase tracking-widest — text-xs font-bold",
];

const DONT_LIST = [
  "No shadows — shadow-sm through shadow-2xl are all banned",
  "No gradients — bg-gradient-* is forbidden",
  "No transparency below 50% opacity",
  "No mixed corner radii within a single component set",
  "No gray text unless intentionally muted metadata",
  "No pattern or texture backgrounds",
  "No soft easing — prefer transition-none or duration-75",
];

const TYPE_SCALE = [
  { label: "Display", cls: "text-7xl font-black tracking-tighter", sample: "Aa" },
  { label: "H1", cls: "text-5xl font-black tracking-tight", sample: "Heading One" },
  { label: "H2", cls: "text-4xl font-bold tracking-tight", sample: "Heading Two" },
  { label: "H3", cls: "text-2xl font-bold", sample: "Heading Three" },
  { label: "Body", cls: "text-base font-normal leading-relaxed", sample: "Body copy — readable, clean, un-styled." },
  { label: "Label", cls: "text-xs font-bold uppercase tracking-widest", sample: "MICRO LABEL" },
  { label: "Mono", cls: "text-sm font-mono", sample: "#000000 / border-2 / font-black" },
];

const PROJECTS = [
  { id: "01", title: "Spatial Grid", category: "Art Direction", color: "bg-black text-white" },
  { id: "02", title: "Pure Form", category: "Product Design", color: "bg-[#ff3366] text-white" },
  { id: "03", title: "Zero Noise", category: "Brand Identity", color: "bg-[#ffcc00] text-black" },
  { id: "04", title: "White Study", category: "Photography", color: "bg-white text-black border-2 border-black" },
  { id: "05", title: "Cut Shape", category: "Editorial", color: "bg-[#00d4aa] text-black" },
  { id: "06", title: "Block Type", category: "Typography", color: "bg-black text-white" },
];

const FILTER_CATEGORIES = ["All", "Art Direction", "Product Design", "Brand Identity", "Photography", "Editorial", "Typography"];

export default function MinimalistFlatShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { ref: heroRef, inView: heroInView } = useInView();

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* ===================== SECTION 1: NAVIGATION ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link
            href="/styles/minimalist-flat"
            className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-[#ff3366] transition-colors"
          >
            <span className="text-lg leading-none">&larr;</span>
            <span>Back</span>
          </Link>

          <div className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-5 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors ${
                  i < NAV_LINKS.length - 1 ? "border-r border-black/20" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ===================== SECTION 2: HERO ===================== */}
      <section className="pt-14 border-b-2 border-black overflow-hidden">
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-0"
        >
          {/* Left: headline block */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
            className="flex flex-col justify-center pr-0 md:pr-16 border-b-2 md:border-b-0 md:border-r-2 border-black pb-12 md:pb-0"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-6">
              Design System Showcase
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
              MINI
              <br />
              <span className="text-[#ff3366]">MAL</span>
              <br />
              FLAT
            </h1>
            <p className="text-base md:text-lg max-w-sm leading-relaxed text-gray-600 mb-10">
              Less is more. No shadows, no gradients, no decoration. Pure
              color contrast and generous whitespace carry all meaning.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-4 bg-black text-white border-2 border-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                Explore
              </button>
              <button className="px-8 py-4 bg-white text-black border-2 border-black font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors">
                Documentation
              </button>
            </div>
          </div>

          {/* Right: geometric color blocks */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
            className="hidden md:grid grid-cols-2 grid-rows-3 gap-0 h-[480px] pl-16"
          >
            <div className="col-span-2 bg-black flex items-center justify-center border-b-2 border-white/20">
              <span className="text-white text-xs font-bold uppercase tracking-widest opacity-40">
                #000000
              </span>
            </div>
            <div className="bg-[#ff3366] flex items-center justify-center border-r-2 border-white/20">
              <span className="text-white text-xs font-bold uppercase tracking-widest opacity-60">
                #FF3366
              </span>
            </div>
            <div className="bg-[#ffcc00] flex items-center justify-center">
              <span className="text-black text-xs font-bold uppercase tracking-widest opacity-60">
                #FFCC00
              </span>
            </div>
            <div className="col-span-2 bg-[#00d4aa] flex items-center justify-center">
              <span className="text-black text-xs font-bold uppercase tracking-widest opacity-60">
                #00D4AA
              </span>
            </div>
          </div>
        </div>

        {/* Scrolling marquee bar */}
        <div className="border-t-2 border-black bg-black text-white py-3 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-[marquee_18s_linear_infinite]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-widest flex gap-12">
                <span>No Shadows</span>
                <span className="text-[#ff3366]">&mdash;</span>
                <span>No Gradients</span>
                <span className="text-[#ff3366]">&mdash;</span>
                <span>Pure Contrast</span>
                <span className="text-[#ff3366]">&mdash;</span>
                <span>Swiss Grid</span>
                <span className="text-[#ff3366]">&mdash;</span>
                <span>Less Is More</span>
                <span className="text-[#ff3366]">&mdash;</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: COMPONENT DEMOS ===================== */}
      <section id="components" className="border-b-2 border-black">
        {/* Subsection: Buttons */}
        <div className="border-b-2 border-black py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-10 flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                    01 — Components
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">Buttons</h2>
                </div>
                <p className="text-gray-500 max-w-xs leading-relaxed text-sm">
                  Binary hover states. Fill inverts to outline, outline inverts
                  to fill. Instant, flat, no easing.
                </p>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-2 gap-0">
              {BUTTON_VARIANTS.map((btn, i) => (
                <RevealBlock key={btn.label} delay={i * 0.07}>
                  <div
                    className={`p-8 border-2 border-black flex flex-col gap-6 ${
                      i % 2 === 0 ? "" : "border-l-0"
                    } ${i >= 2 ? "border-t-0" : ""}`}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                        {btn.label}
                      </p>
                      <p className="text-sm text-gray-500">{btn.note}</p>
                    </div>
                    <button
                      className={`self-start px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors ${btn.cls}`}
                    >
                      {btn.label}
                    </button>
                    <div className="flex gap-3">
                      <button
                        className={`px-4 py-2 font-bold uppercase tracking-widest text-xs transition-colors ${btn.cls}`}
                      >
                        Small
                      </button>
                      <button
                        className={`px-10 py-5 font-bold uppercase tracking-widest text-sm transition-colors ${btn.cls}`}
                      >
                        Large
                      </button>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>

        {/* Subsection: Cards */}
        <div className="border-b-2 border-black py-16 px-4 md:px-8 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                  02 — Components
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Cards</h2>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-3 gap-0">
              {CARD_ITEMS.map((card, i) => (
                <RevealBlock key={card.num} delay={i * 0.1}>
                  <div
                    className={`group border-2 border-white p-8 cursor-pointer transition-colors ${card.accent} ${
                      i > 0 ? "border-l-0" : ""
                    }`}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="w-12 h-12 border-2 border-current flex items-center justify-center mb-6">
                      <span className="text-sm font-black">{card.num}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-3">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-300 group-hover:text-current/80">
                      {card.body}
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {hoveredCard === i ? "Active" : "Read more"}
                      </span>
                      <span className="text-xs">&rarr;</span>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>

        {/* Subsection: Inputs */}
        <div className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                  03 — Components
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Inputs</h2>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: boxed inputs */}
              <RevealBlock className="border-2 border-black p-8 md:border-r-0">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                  Boxed Style
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:bg-black focus:text-white focus:placeholder:text-gray-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write something..."
                      className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full px-6 py-4 bg-black text-white border-2 border-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                    Submit
                  </button>
                </div>
              </RevealBlock>

              {/* Right: underline inputs */}
              <RevealBlock delay={0.1} className="border-2 border-black p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                  Underline Style
                </p>
                <div className="space-y-8">
                  {["Search", "Topic", "URL"].map((label) => (
                    <div key={label}>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                        className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors"
                      />
                    </div>
                  ))}
                  <div className="pt-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                      State Preview
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <span className="px-3 py-1 border-b-2 border-black text-sm font-medium">
                        Default
                      </span>
                      <span className="px-3 py-1 border-b-2 border-[#ff3366] text-[#ff3366] text-sm font-medium">
                        Focus
                      </span>
                      <span className="px-3 py-1 border-b-2 border-gray-300 text-gray-400 text-sm">
                        Disabled
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 4: COLOR ACCENT SHOWCASE ===================== */}
      <section id="colors" className="border-b-2 border-black">
        <div className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                  04 — Palette
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Color System</h2>
                <p className="text-gray-500 mt-4 max-w-md text-sm leading-relaxed">
                  Black and white form the foundation. Accents appear one at a
                  time — never combined — as a single deliberate pop.
                </p>
              </div>
            </RevealBlock>

            {/* Full-width color row */}
            <RevealBlock delay={0.05}>
              <div className="flex h-48 md:h-64 border-2 border-black overflow-hidden">
                {COLOR_SWATCHES.map((s, i) => (
                  <div
                    key={s.name}
                    className={`flex-1 ${s.bg} ${s.text} ${s.border} flex flex-col justify-end p-4 md:p-6 ${
                      i < COLOR_SWATCHES.length - 1 ? "border-r-2 border-black" : ""
                    } group cursor-default transition-all duration-75`}
                  >
                    <p className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                      {s.name}
                    </p>
                    <p className="text-xs font-mono opacity-40 group-hover:opacity-80 transition-opacity hidden md:block">
                      {s.hex}
                    </p>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Accent usage demonstration */}
            <div className="mt-0 grid md:grid-cols-3 gap-0 border-2 border-t-0 border-black">
              {[
                {
                  accent: "#ff3366",
                  label: "Coral",
                  bg: "bg-[#ff3366]",
                  text: "text-white",
                  desc: "Primary accent. CTAs, errors, emphasis.",
                },
                {
                  accent: "#00d4aa",
                  label: "Teal",
                  bg: "bg-[#00d4aa]",
                  text: "text-black",
                  desc: "Success states, positive indicators.",
                },
                {
                  accent: "#ffcc00",
                  label: "Yellow",
                  bg: "bg-[#ffcc00]",
                  text: "text-black",
                  desc: "Warnings, highlights, attention draws.",
                },
              ].map((item, i) => (
                <RevealBlock key={item.label} delay={i * 0.08}>
                  <div
                    className={`${item.bg} ${item.text} p-8 ${
                      i < 2 ? "border-r-2 border-black" : ""
                    }`}
                  >
                    <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-60">
                      Accent {i + 1} — {item.label}
                    </p>
                    <p className="text-3xl font-black tracking-tight mb-3">{item.accent}</p>
                    <p className="text-sm opacity-80 leading-relaxed">{item.desc}</p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>

        {/* Project filter grid */}
        <div className="border-t-2 border-black py-16 px-4 md:px-8 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-8 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                    05 — Projects
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">Work Grid</h2>
                </div>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                  Filter by category. Each block is a solid color — no images,
                  no textures, no decorations.
                </p>
              </div>
            </RevealBlock>

            {/* Filter tabs */}
            <RevealBlock delay={0.05}>
              <div className="flex flex-wrap gap-0 mb-0 border-2 border-white overflow-hidden">
                {FILTER_CATEGORIES.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                      i < FILTER_CATEGORIES.length - 1 ? "border-r border-white/20" : ""
                    } ${
                      activeFilter === cat
                        ? "bg-white text-black"
                        : "bg-transparent text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </RevealBlock>

            {/* Project blocks */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-2 border-t-0 border-white">
              {filteredProjects.map((project, i) => (
                <RevealBlock key={project.id} delay={i * 0.05}>
                  <div
                    className={`group ${project.color} p-8 md:p-10 aspect-square flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity ${
                      i % 3 !== 0 ? "border-l-2 border-white/20" : ""
                    } ${i >= 3 ? "border-t-2 border-white/20" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-black uppercase tracking-widest opacity-40">
                        {project.id}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        View &rarr;
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                        {project.category}
                      </p>
                      <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </RevealBlock>
              ))}
              {filteredProjects.length === 0 && (
                <div className="col-span-2 md:col-span-3 py-24 text-center text-gray-500 border-l-0">
                  <p className="text-xs font-bold uppercase tracking-widest">No projects in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 5: DESIGN RULES ===================== */}
      <section id="rules" className="border-b-2 border-black">
        <div className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                  06 — Philosophy
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Design Rules</h2>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-2 gap-0 border-2 border-black">
              {/* Do column */}
              <div className="p-8 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
                    <span className="text-sm font-black leading-none">&check;</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest">Do</h3>
                </div>
                <ul className="space-y-0">
                  {DO_LIST.map((rule, i) => (
                    <RevealBlock key={i} delay={i * 0.04}>
                      <li className="flex items-start gap-4 py-4 border-b border-black/10 last:border-b-0">
                        <span className="w-5 h-5 bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-gray-700">{rule}</span>
                      </li>
                    </RevealBlock>
                  ))}
                </ul>
              </div>

              {/* Don't column */}
              <div className="p-8 md:p-10 bg-[#ff3366] text-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-white text-[#ff3366] flex items-center justify-center">
                    <span className="text-sm font-black leading-none">&times;</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest">Don&apos;t</h3>
                </div>
                <ul className="space-y-0">
                  {DONT_LIST.map((rule, i) => (
                    <RevealBlock key={i} delay={i * 0.04}>
                      <li className="flex items-start gap-4 py-4 border-b border-white/20 last:border-b-0">
                        <span className="w-5 h-5 bg-white text-[#ff3366] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-white/90">{rule}</span>
                      </li>
                    </RevealBlock>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Principle blocks */}
        <div className="border-t-2 border-black bg-black text-white py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-10">
                Core Principles
              </p>
            </RevealBlock>
            <div className="grid md:grid-cols-4 gap-0 border-2 border-white">
              {[
                {
                  num: "I",
                  title: "Reduction",
                  body: "Every pixel must earn its place. Remove until the design breaks, then add back the minimum.",
                },
                {
                  num: "II",
                  title: "Flatness",
                  body: "No depth illusions. No shadows, no gradients. The screen is a 2D surface — honor it.",
                },
                {
                  num: "III",
                  title: "Inversion",
                  body: "Interaction = color flip. Black becomes white. White becomes black. Nothing else changes.",
                },
                {
                  num: "IV",
                  title: "Restraint",
                  body: "One accent color. One typeface. One grid. Constraints produce creativity.",
                },
              ].map((p, i) => (
                <RevealBlock key={p.num} delay={i * 0.08}>
                  <div
                    className={`p-8 group hover:bg-[#ff3366] transition-colors cursor-default ${
                      i < 3 ? "border-r-2 border-white/20" : ""
                    }`}
                  >
                    <p className="text-5xl font-black text-white/10 group-hover:text-white/20 mb-4 transition-colors">
                      {p.num}
                    </p>
                    <h4 className="text-lg font-black tracking-tight mb-3">{p.title}</h4>
                    <p className="text-sm text-gray-400 group-hover:text-white/80 leading-relaxed transition-colors">
                      {p.body}
                    </p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 6: TYPOGRAPHY SCALE ===================== */}
      <section id="typography" className="border-b-2 border-black">
        <div className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-2">
                  07 — Typography
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Type Scale</h2>
                <p className="text-gray-500 mt-4 text-sm max-w-md leading-relaxed">
                  Typography is the primary visual element. Bold, tight, black.
                  The font does the heavy lifting — no ornament needed.
                </p>
              </div>
            </RevealBlock>

            <div className="border-2 border-black divide-y-2 divide-black">
              {TYPE_SCALE.map((t, i) => (
                <RevealBlock key={t.label} delay={i * 0.04}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 px-6 py-6 group hover:bg-black hover:text-white transition-colors">
                    <div className="md:w-28 flex-shrink-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-300">
                        {t.label}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className={`${t.cls} block truncate`}>{t.sample}</span>
                    </div>
                    <div className="md:w-40 flex-shrink-0 text-right hidden md:block">
                      <span className="text-xs font-mono text-gray-400 group-hover:text-gray-300">
                        {t.cls.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>

            {/* Typography pairs demo */}
            <div className="mt-0 grid md:grid-cols-2 gap-0 border-2 border-t-0 border-black">
              <RevealBlock className="p-10 border-b-2 md:border-b-0 md:border-r-2 border-black">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                  Editorial Pairing
                </p>
                <h3 className="text-5xl font-black tracking-tighter leading-none mb-4">
                  Form Follows
                  <br />
                  Function.
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-xs">
                  Good design is as little design as possible. Design
                  should serve the content, not overshadow it.
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-6">
                  Dieter Rams
                </p>
              </RevealBlock>

              <RevealBlock delay={0.1} className="p-10 bg-black text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                  Inverted Pairing
                </p>
                <h3 className="text-5xl font-black tracking-tighter leading-none mb-4 text-[#ff3366]">
                  Less, But
                  <br />
                  Better.
                </h3>
                <p className="text-base text-gray-300 leading-relaxed max-w-xs">
                  The commitment to omit the non-essential. Purity,
                  simplicity, careful reduction to the essential.
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-6">
                  Dieter Rams
                </p>
              </RevealBlock>
            </div>

            {/* Interactive tab demo */}
            <RevealBlock delay={0.05}>
              <div className="border-2 border-t-0 border-black">
                <div className="flex border-b-2 border-black">
                  {["Overview", "Specimen", "Code"].map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      className={`flex-1 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                        i < 2 ? "border-r-2 border-black" : ""
                      } ${
                        activeTab === i
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="p-8 bg-white min-h-[120px]">
                  {activeTab === 0 && (
                    <div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        The type system uses a single font stack — system-ui or Inter — rendered
                        in weights 400 (body) and 900 (display). Tracking tightens as size increases.
                        Color is always pure black on white or pure white on black.
                      </p>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <p className="text-4xl font-black tracking-tight text-black">
                        AaBbCcDdEeFfGg
                      </p>
                      <p className="text-4xl font-black tracking-tight text-[#ff3366] mt-2">
                        0123456789!?&
                      </p>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className="font-mono text-sm text-gray-700 space-y-1">
                      <p><span className="text-[#ff3366]">text-7xl</span> font-black tracking-tighter — Display</p>
                      <p><span className="text-[#ff3366]">text-5xl</span> font-black tracking-tight — H1</p>
                      <p><span className="text-[#ff3366]">text-base</span> font-normal leading-relaxed — Body</p>
                      <p><span className="text-[#ff3366]">text-xs</span> font-bold uppercase tracking-widest — Label</p>
                    </div>
                  )}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>

        {/* Stats row — large numbers */}
        <div className="border-t-2 border-black bg-[#ffcc00] text-black py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black">
                {[
                  { value: "0", label: "Shadows" },
                  { value: "0", label: "Gradients" },
                  { value: "3", label: "Accent Colors" },
                  { value: "100%", label: "Flat" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`p-8 md:p-10 text-center ${i < 3 ? "border-r-2 border-black" : ""} ${
                      i >= 2 ? "border-t-2 md:border-t-0 border-black" : ""
                    }`}
                  >
                    <div className="text-6xl md:text-7xl font-black tracking-tighter">{stat.value}</div>
                    <div className="text-xs font-bold uppercase tracking-widest mt-2 opacity-60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 7: FOOTER ===================== */}
      <footer className="border-b-2 border-black bg-black text-white">
        {/* Large closing statement */}
        <div className="border-b-2 border-white/10 py-20 md:py-28 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <RevealBlock>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff3366] mb-8">
                The Principle
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none text-white">
                OMIT
                <br />
                <span className="text-white/10">THE</span>
                <br />
                NEEDLESS.
              </h2>
            </RevealBlock>
            <RevealBlock delay={0.15}>
              <p className="text-gray-500 text-sm mt-8 max-w-sm leading-relaxed">
                Perfection is achieved not when there is nothing more to add,
                but when there is nothing more to take away.
              </p>
              <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-3">
                Antoine de Saint-Exupery
              </p>
            </RevealBlock>
          </div>
        </div>

        {/* Navigation footer links */}
        <div className="border-b-2 border-white/10 py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 border-2 border-white/10">
            <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                Style Kit
              </p>
              <Link
                href="/styles/minimalist-flat"
                className="block text-sm font-bold text-white hover:text-[#ff3366] transition-colors mb-3"
              >
                Minimalist Flat Docs &rarr;
              </Link>
              <Link
                href="/styles"
                className="block text-sm font-bold text-white hover:text-[#ff3366] transition-colors"
              >
                Browse All Styles &rarr;
              </Link>
            </div>

            <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                Design Tokens
              </p>
              <div className="space-y-2 font-mono text-xs text-gray-400">
                <p>primary: <span className="text-white">#000000</span></p>
                <p>background: <span className="text-white">#ffffff</span></p>
                <p>accent-1: <span className="text-[#ff3366]">#ff3366</span></p>
                <p>accent-2: <span className="text-[#00d4aa]">#00d4aa</span></p>
                <p>accent-3: <span className="text-[#ffcc00]">#ffcc00</span></p>
              </div>
            </div>

            <div className="p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                Key Rules
              </p>
              <div className="space-y-2">
                {[
                  "Zero shadows",
                  "Zero gradients",
                  "Bold typography",
                  "Color inversion on hover",
                  "Thick black borders",
                ].map((rule) => (
                  <p key={rule} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#ff3366] flex-shrink-0 inline-block" />
                    {rule}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600 font-mono">
              StyleKit / Minimalist Flat / Swiss International Style
            </p>
            <div className="flex items-center gap-6">
              {["Components", "Colors", "Typography", "Rules"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
