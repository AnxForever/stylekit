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

const COLORS = [
  { name: "Black", hex: "#000000", bg: "bg-black", text: "text-white", label: "text-white" },
  { name: "White", hex: "#ffffff", bg: "bg-white", text: "text-black", label: "text-black" },
  { name: "Coral", hex: "#ff6b6b", bg: "bg-[#ff6b6b]", text: "text-white", label: "text-white" },
  { name: "Teal", hex: "#4ecdc4", bg: "bg-[#4ecdc4]", text: "text-black", label: "text-black" },
  { name: "Yellow", hex: "#ffe66d", bg: "bg-[#ffe66d]", text: "text-black", label: "text-black" },
  { name: "Mint", hex: "#95e1d3", bg: "bg-[#95e1d3]", text: "text-black", label: "text-black" },
  { name: "Pink", hex: "#f38181", bg: "bg-[#f38181]", text: "text-white", label: "text-white" },
];

const CARD_ACCENTS = [
  { bg: "bg-[#ff6b6b]", shadow: "shadow-[6px_6px_0_#000]", label: "Coral", rot: "rotate-[-2deg]" },
  { bg: "bg-[#4ecdc4]", shadow: "shadow-[6px_6px_0_#000]", label: "Teal", rot: "rotate-[1deg]" },
  { bg: "bg-[#ffe66d]", shadow: "shadow-[6px_6px_0_#000]", label: "Yellow", rot: "rotate-[-1deg]" },
  { bg: "bg-[#95e1d3]", shadow: "shadow-[6px_6px_0_#000]", label: "Mint", rot: "rotate-[2deg]" },
  { bg: "bg-[#f38181]", shadow: "shadow-[6px_6px_0_#000]", label: "Pink", rot: "rotate-[-2deg]" },
  { bg: "bg-black", shadow: "shadow-[6px_6px_0_#000]", label: "Black", rot: "rotate-[1deg]" },
];

const PRINCIPLES_DO = [
  { title: "rounded-none", desc: "Zero border radius on every element — corners stay sharp and honest." },
  { title: "border-4 border-black", desc: "Pure black borders, always 4px, define every component's edge." },
  { title: "rotate-[-2deg] / rotate-[1deg]", desc: "Slight tilts break the grid tension and inject personality." },
  { title: "shadow-[6px_6px_0_#000]", desc: "Hard offset shadows — no blur, no opacity, pure black only." },
  { title: "Bright accent fills", desc: "Coral, teal, yellow, mint, pink — never monochrome." },
  {
    title: "hover: lift, active: press",
    desc: "Hover lifts with larger shadow, active presses down to shadow-none.",
  },
];

const PRINCIPLES_DONT = [
  { title: "No gradients", desc: "Flat fills only. Gradients are decoration that dilutes the energy." },
  { title: "No rounded corners", desc: "rounded-sm, rounded-md, rounded-full — all forbidden." },
  { title: "No soft shadows", desc: "shadow-lg, drop-shadow with blur — not in this system." },
  { title: "No monochrome only", desc: "Black and white alone is brutalist, not playful. Bright accents are mandatory." },
  { title: "No corporate seriousness", desc: "Neutral grays, muted tones, restrained layouts — not here." },
  { title: "No excessive rotation", desc: "Max +-3deg. More than that and structure collapses into chaos." },
];

const DEMO_CARDS = [
  {
    tag: "Design",
    title: "Structure meets joy.",
    desc: "Hard edges and bright colors living in perfect chaos.",
    bg: "bg-[#ff6b6b]",
    rot: "rotate-[-2deg]",
    textColor: "text-white",
  },
  {
    tag: "Motion",
    title: "Hover to lift. Click to press.",
    desc: "Every interaction has physical weight and feedback.",
    bg: "bg-[#4ecdc4]",
    rot: "rotate-[1deg]",
    textColor: "text-black",
  },
  {
    tag: "Color",
    title: "Five accents, infinite combos.",
    desc: "Coral, teal, yellow, mint, pink — always with black borders.",
    bg: "bg-[#ffe66d]",
    rot: "rotate-[-1deg]",
    textColor: "text-black",
  },
];

const STATS = [
  { value: "0px", label: "Border Radius", bg: "bg-[#ff6b6b]", rot: "rotate-[-2deg]", text: "text-white" },
  { value: "4px", label: "Border Width", bg: "bg-[#4ecdc4]", rot: "rotate-[1deg]", text: "text-black" },
  { value: "6px", label: "Shadow Offset", bg: "bg-[#ffe66d]", rot: "rotate-[-1deg]", text: "text-black" },
  { value: "3deg", label: "Max Rotation", bg: "bg-[#95e1d3]", rot: "rotate-[2deg]", text: "text-black" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function BrutalButton({
  children,
  bg = "bg-[#ff6b6b]",
  textColor = "text-white",
  rotate = "rotate-[-1deg]",
  size = "md",
}: {
  children: React.ReactNode;
  bg?: string;
  textColor?: string;
  rotate?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button
      type="button"
      className={`${bg} ${textColor} ${rotate} ${sizeClasses[size]} font-black border-4 border-black shadow-[6px_6px_0_#000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150`}
    >
      {children}
    </button>
  );
}

function BrutalInput({
  label,
  placeholder,
  type = "text",
  bg = "bg-white",
}: {
  label: string;
  placeholder: string;
  type?: string;
  bg?: string;
}) {
  return (
    <div>
      <label className="block font-black text-sm mb-2 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 ${bg} border-4 border-black font-mono text-base focus:outline-none focus:shadow-[6px_6px_0_#000] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-150 placeholder:text-black/40`}
      />
    </div>
  );
}

function BrutalTag({
  children,
  bg = "bg-[#ff6b6b]",
  textColor = "text-white",
  rotate = "rotate-[-1deg]",
}: {
  children: React.ReactNode;
  bg?: string;
  textColor?: string;
  rotate?: string;
}) {
  return (
    <span
      className={`inline-block ${bg} ${textColor} ${rotate} px-3 py-1 border-4 border-black font-black text-xs uppercase tracking-wider`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero color-block panels                                             */
/* ------------------------------------------------------------------ */

function HeroPanels({ visible }: { visible: boolean }) {
  const panels = [
    { bg: "bg-[#ff6b6b]", rot: "-2deg", delay: "0.3s" },
    { bg: "bg-[#4ecdc4]", rot: "1deg", delay: "0.4s" },
    { bg: "bg-[#ffe66d]", rot: "-1deg", delay: "0.5s" },
    { bg: "bg-[#95e1d3]", rot: "2deg", delay: "0.6s" },
    { bg: "bg-[#f38181]", rot: "-2deg", delay: "0.7s" },
  ];
  return (
    <div className="flex gap-3 md:gap-4 items-end h-32 md:h-44">
      {panels.map((p, i) => (
        <div
          key={i}
          className={`flex-1 ${p.bg} border-4 border-black`}
          style={{
            transform: visible ? `rotate(${p.rot}) translateY(0)` : `rotate(${p.rot}) translateY(60px)`,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${p.delay}, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${p.delay}`,
            height: `${55 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color picker tab for component demos                               */
/* ------------------------------------------------------------------ */

type ComponentTab = "Buttons" | "Cards" | "Input";

const BUTTON_VARIANTS = [
  { bg: "bg-[#ff6b6b]", text: "text-white", label: "Coral — Primary action", rot: "rotate-[-2deg]", btnText: "Get Started" },
  { bg: "bg-[#4ecdc4]", text: "text-black", label: "Teal — Secondary action", rot: "rotate-[1deg]", btnText: "Learn More" },
  { bg: "bg-[#ffe66d]", text: "text-black", label: "Yellow — Highlight action", rot: "rotate-[-1deg]", btnText: "Explore" },
  { bg: "bg-[#95e1d3]", text: "text-black", label: "Mint — Soft action", rot: "rotate-[2deg]", btnText: "Browse" },
  { bg: "bg-black", text: "text-white", label: "Black — Destructive / default", rot: "rotate-[-1deg]", btnText: "Delete" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [componentTab, setComponentTab] = useState<ComponentTab>("Buttons");
  const [progress, setProgress] = useState(65);
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);
  const [checkA, setCheckA] = useState(true);
  const [checkB, setCheckB] = useState(false);
  const [checkC, setCheckC] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState("Pick something fun");
  const [inputVal, setInputVal] = useState("");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================================================================ */}
      {/* 1. Fixed Nav                                                      */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <span className="font-black text-xl tracking-tight bg-black text-white px-3 py-1 rotate-[-2deg] inline-block shadow-[4px_4px_0_#ff6b6b]">
                NEO.BRUTAL
              </span>
              <span className="hidden md:block font-mono text-xs text-black/40 uppercase tracking-widest">
                俏皮野兽派
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {["Colors", "Components", "Typography", "Rules"].map((item, i) => {
                const bgs = ["hover:bg-[#ff6b6b] hover:text-white", "hover:bg-[#4ecdc4]", "hover:bg-[#ffe66d]", "hover:bg-[#95e1d3]"];
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`px-4 py-2 border-2 border-transparent hover:border-black font-black text-sm uppercase tracking-wide transition-all duration-150 ${bgs[i]}`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>

            {/* Back link */}
            <Link
              href="/styles"
              className="font-black text-sm px-4 py-2 border-4 border-black bg-white hover:bg-[#ff6b6b] hover:text-white hover:-translate-y-[2px] hover:shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all duration-150 uppercase tracking-wide"
            >
              StyleKit →
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero                                                           */}
      {/* ================================================================ */}
      <section className="pt-28 md:pt-36 pb-20 px-5 md:px-10 max-w-7xl mx-auto" ref={heroRef}>
        {/* Tag line */}
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s",
          }}
        >
          <BrutalTag bg="bg-[#4ecdc4]" textColor="text-black" rotate="rotate-[-1deg]">
            Structure with joy
          </BrutalTag>
        </div>

        {/* Big title */}
        <h1
          className="mt-6 font-black text-[clamp(56px,12vw,140px)] leading-none tracking-tight uppercase"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0) rotate(-2deg)" : "translateY(50px) rotate(-2deg)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          Neo-
          <br />
          <span
            style={{
              WebkitTextStroke: "4px #000",
              color: "transparent",
            }}
          >
            Brutal
          </span>
          <br />
          <span className="text-[#ff6b6b]" style={{ WebkitTextStroke: "0px" }}>
            Playful!
          </span>
        </h1>

        {/* Subtitle row */}
        <div
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.28s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.28s",
          }}
        >
          <p className="max-w-sm font-mono text-base leading-relaxed text-black/60">
            Hard edges. Bright colors. Slight rotations. Pure black borders.
            Neo-brutalist structure — but with joy baked in.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <BrutalButton bg="bg-[#ff6b6b]" textColor="text-white" rotate="rotate-[-2deg]" size="lg">
              Explore the System
            </BrutalButton>
            <BrutalButton bg="bg-[#ffe66d]" textColor="text-black" rotate="rotate-[1deg]" size="lg">
              See Components
            </BrutalButton>
          </div>
        </div>

        {/* Color-block panels */}
        <div
          className="mt-16"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          <HeroPanels visible={heroVisible} />
        </div>

        {/* Hero stats row */}
        <RevealBlock delay={0.1}>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`${s.bg} ${s.text} ${s.rot} border-4 border-black shadow-[6px_6px_0_#000] p-5 text-center`}
              >
                <p className="font-black text-3xl md:text-4xl leading-none">{s.value}</p>
                <p className="font-mono text-xs mt-1 uppercase tracking-wider opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 3. Component Demos                                                */}
      {/* ================================================================ */}
      <section id="components" className="py-20 md:py-28 border-t-4 border-black px-5 md:px-10 max-w-7xl mx-auto">
        <RevealBlock>
          <div className="mb-12">
            <BrutalTag bg="bg-[#ff6b6b]" textColor="text-white" rotate="rotate-[1deg]">
              Interactive demos
            </BrutalTag>
            <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight rotate-[-1deg]">
              Components
            </h2>
            <p className="mt-3 font-mono text-sm text-black/50 max-w-md">
              Click the tabs to switch between component types. All interactions follow the lift-and-press pattern.
            </p>
          </div>
        </RevealBlock>

        {/* Tab switcher */}
        <RevealBlock delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-10 border-b-4 border-black pb-4">
            {(["Buttons", "Cards", "Input"] as ComponentTab[]).map((tab, i) => {
              const bgs = ["bg-[#ff6b6b] text-white", "bg-[#4ecdc4] text-black", "bg-[#ffe66d] text-black"];
              const rots = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[-1deg]"];
              const isActive = componentTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setComponentTab(tab)}
                  className={`px-6 py-3 border-4 border-black font-black text-sm uppercase tracking-wide transition-all duration-150 ${rots[i]} ${
                    isActive
                      ? `${bgs[i]} shadow-[4px_4px_0_#000] -translate-x-[2px] -translate-y-[2px]`
                      : "bg-white hover:bg-black hover:text-white hover:-translate-y-[2px] hover:shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </RevealBlock>

        {/* Tab: Buttons */}
        {componentTab === "Buttons" && (
          <RevealBlock>
            <div className="space-y-12">
              {/* All color variants */}
              <div>
                <p className="font-black text-xs uppercase tracking-widest mb-6 text-black/40">
                  Color variants — hover to lift, click to press
                </p>
                <div className="flex flex-wrap gap-5">
                  {BUTTON_VARIANTS.map((v) => (
                    <div key={v.label} className="flex flex-col items-start gap-2">
                      <BrutalButton bg={v.bg} textColor={v.text} rotate={v.rot} size="md">
                        {v.btnText}
                      </BrutalButton>
                      <span className="font-mono text-xs text-black/40">{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size variants */}
              <div>
                <p className="font-black text-xs uppercase tracking-widest mb-6 text-black/40">
                  Size variants
                </p>
                <div className="flex flex-wrap items-end gap-5">
                  <div className="flex flex-col items-start gap-2">
                    <BrutalButton bg="bg-[#ff6b6b]" textColor="text-white" rotate="rotate-[-1deg]" size="sm">
                      Small
                    </BrutalButton>
                    <span className="font-mono text-xs text-black/40">size="sm"</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <BrutalButton bg="bg-[#4ecdc4]" textColor="text-black" rotate="rotate-[1deg]" size="md">
                      Medium
                    </BrutalButton>
                    <span className="font-mono text-xs text-black/40">size="md"</span>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <BrutalButton bg="bg-[#ffe66d]" textColor="text-black" rotate="rotate-[-1deg]" size="lg">
                      Large
                    </BrutalButton>
                    <span className="font-mono text-xs text-black/40">size="lg"</span>
                  </div>
                </div>
              </div>

              {/* Interaction spec box */}
              <div className="border-4 border-black bg-black text-white p-6 rotate-[-1deg] shadow-[8px_8px_0_#ff6b6b]">
                <p className="font-black text-sm uppercase tracking-widest mb-4 text-[#ff6b6b]">
                  Interaction spec
                </p>
                <div className="font-mono text-sm space-y-2">
                  <p>
                    <span className="text-[#4ecdc4]">hover:</span>{" "}
                    -translate-x-[3px] -translate-y-[3px] shadow-[9px_9px_0_#000]
                  </p>
                  <p>
                    <span className="text-[#ffe66d]">active:</span>{" "}
                    translate-x-[3px] translate-y-[3px] shadow-none
                  </p>
                  <p>
                    <span className="text-[#95e1d3]">transition:</span> all duration-150
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        )}

        {/* Tab: Cards */}
        {componentTab === "Cards" && (
          <RevealBlock>
            <div className="space-y-10">
              {/* Demo cards grid */}
              <div>
                <p className="font-black text-xs uppercase tracking-widest mb-6 text-black/40">
                  Mixed accent cards — each a different color, each slightly rotated
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DEMO_CARDS.map((card, i) => (
                    <div
                      key={card.tag}
                      className={`${card.bg} ${card.textColor} ${card.rot} border-4 border-black shadow-[6px_6px_0_#000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 p-6 cursor-pointer`}
                    >
                      <span
                        className={`inline-block border-4 border-black px-2 py-0.5 font-black text-xs uppercase tracking-wide mb-4 ${
                          card.textColor === "text-white" ? "bg-white text-black" : "bg-black text-white"
                        }`}
                      >
                        {card.tag}
                      </span>
                      <h3 className="font-black text-xl leading-tight mb-3">{card.title}</h3>
                      <p className="font-mono text-sm opacity-80 leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full accent grid */}
              <div>
                <p className="font-black text-xs uppercase tracking-widest mb-6 text-black/40">
                  All six accent swatches as cards
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {CARD_ACCENTS.map((c, i) => (
                    <div
                      key={c.label}
                      className={`${c.bg} ${c.rot} ${c.shadow} border-4 border-black p-5 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 cursor-pointer`}
                    >
                      <p
                        className={`font-black text-lg ${
                          c.bg === "bg-black" || c.bg === "bg-[#ff6b6b]" || c.bg === "bg-[#f38181]"
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {c.label}
                      </p>
                      <p
                        className={`font-mono text-xs mt-1 ${
                          c.bg === "bg-black" || c.bg === "bg-[#ff6b6b]" || c.bg === "bg-[#f38181]"
                            ? "text-white/60"
                            : "text-black/50"
                        }`}
                      >
                        Card #{i + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        )}

        {/* Tab: Input */}
        {componentTab === "Input" && (
          <RevealBlock>
            <div className="space-y-10 max-w-xl">
              {/* Text inputs */}
              <div className="space-y-6">
                <p className="font-black text-xs uppercase tracking-widest text-black/40">
                  Focus: border gets shadow offset — the element lifts like a button
                </p>
                <BrutalInput label="Your Name" placeholder="Jane Brutalist" bg="bg-white" />
                <BrutalInput label="Email Address" placeholder="jane@brutalist.io" type="email" bg="bg-[#ffe66d]" />
                <BrutalInput label="Project Title" placeholder="Neo-Brutal Portfolio" bg="bg-[#95e1d3]" />
              </div>

              {/* Textarea */}
              <div>
                <label className="block font-black text-sm mb-2 uppercase tracking-wide">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us something interesting..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f38181] border-4 border-black font-mono text-base focus:outline-none focus:shadow-[6px_6px_0_#000] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-150 placeholder:text-black/40 resize-none text-white"
                />
                {inputVal.length > 0 && (
                  <p className="mt-2 font-mono text-xs text-black/40">
                    {inputVal.length} characters typed
                  </p>
                )}
              </div>

              {/* Select / Dropdown */}
              <div className="relative">
                <label className="block font-black text-sm mb-2 uppercase tracking-wide">
                  Pick a style
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border-4 border-black font-black text-base shadow-[6px_6px_0_#000] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150"
                  >
                    <span>{selectedDrop}</span>
                    <span
                      className="font-mono text-lg"
                      style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.15s" }}
                    >
                      v
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-20 border-4 border-black border-t-0 bg-white shadow-[6px_6px_0_#000]">
                      {["Coral energy", "Teal vibes", "Yellow sunshine", "Mint fresh", "Pink party"].map((item, i) => {
                        const hbgs = ["hover:bg-[#ff6b6b] hover:text-white", "hover:bg-[#4ecdc4]", "hover:bg-[#ffe66d]", "hover:bg-[#95e1d3]", "hover:bg-[#f38181] hover:text-white"];
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setSelectedDrop(item);
                              setDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left font-black text-sm border-b-2 border-black last:border-0 transition-colors duration-100 ${hbgs[i]}`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <BrutalButton bg="bg-[#ff6b6b]" textColor="text-white" rotate="rotate-[-1deg]" size="lg">
                Submit — Let's go!
              </BrutalButton>
            </div>
          </RevealBlock>
        )}
      </section>

      {/* ================================================================ */}
      {/* 4. Color Palette                                                  */}
      {/* ================================================================ */}
      <section
        id="colors"
        className="py-20 md:py-28 bg-black px-5 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="mb-12">
              <BrutalTag bg="bg-[#ffe66d]" textColor="text-black" rotate="rotate-[-1deg]">
                Color system
              </BrutalTag>
              <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight text-white rotate-[1deg]">
                The Palette
              </h2>
              <p className="mt-3 font-mono text-sm text-white/40 max-w-md">
                5 bright accents + black + white. Always paired with pure black borders and hard offset shadows.
              </p>
            </div>
          </RevealBlock>

          {/* Big swatch row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {COLORS.map((c, i) => {
              const rots = ["-2deg", "1deg", "-1deg", "2deg", "-1deg", "1deg", "-2deg"];
              return (
                <RevealBlock key={c.name} delay={i * 0.05}>
                  <div
                    className={`${c.bg} border-4 border-white shadow-[6px_6px_0_#ff6b6b] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#ff6b6b] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150 cursor-pointer`}
                    style={{ transform: `rotate(${rots[i]})` }}
                  >
                    {/* Big swatch square */}
                    <div className="h-24 md:h-32" />
                    {/* Label strip */}
                    <div className="border-t-4 border-white p-3">
                      <p className={`${c.label} font-black text-sm`}>{c.name}</p>
                      <p className={`${c.label} font-mono text-xs opacity-60 mt-0.5`}>{c.hex}</p>
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>

          {/* Usage rules */}
          <RevealBlock delay={0.2}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  color: "bg-[#ff6b6b]",
                  title: "Coral #ff6b6b",
                  desc: "Primary calls-to-action, hero accents, urgent tags.",
                  rot: "rotate-[-1deg]",
                  text: "text-white",
                },
                {
                  color: "bg-[#4ecdc4]",
                  title: "Teal #4ecdc4",
                  desc: "Secondary actions, success states, info panels.",
                  rot: "rotate-[1deg]",
                  text: "text-black",
                },
                {
                  color: "bg-[#ffe66d]",
                  title: "Yellow #ffe66d",
                  desc: "Highlight states, warnings, nav backgrounds.",
                  rot: "rotate-[-1deg]",
                  text: "text-black",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`${item.color} ${item.text} ${item.rot} border-4 border-white p-6 shadow-[6px_6px_0_#ff6b6b]`}
                >
                  <p className="font-black text-lg mb-2">{item.title}</p>
                  <p className="font-mono text-sm opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. Typography                                                     */}
      {/* ================================================================ */}
      <section id="typography" className="py-20 md:py-28 bg-[#ffe66d] border-y-4 border-black px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="mb-14">
              <BrutalTag bg="bg-black" textColor="text-white" rotate="rotate-[1deg]">
                Type system
              </BrutalTag>
              <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight rotate-[-1deg]">
                Typography
              </h2>
            </div>
          </RevealBlock>

          <div className="space-y-0">
            {/* Display */}
            <RevealBlock>
              <div className="border-b-4 border-black py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-black hover:text-white transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-60">Display</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[72px] leading-none tracking-tight truncate">
                    Neo-Brutal
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40 group-hover:opacity-50">
                    font-black / 72px / tracking-tight
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* H1 */}
            <RevealBlock delay={0.04}>
              <div className="border-b-4 border-black py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-[#ff6b6b] hover:text-white transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-60">H1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-5xl leading-tight tracking-tight">
                    Playful Brutalism
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40 group-hover:opacity-50">
                    font-black / 48px / tracking-tight
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* H2 */}
            <RevealBlock delay={0.08}>
              <div className="border-b-4 border-black py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-[#4ecdc4] transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50">H2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-4xl leading-tight">
                    Structure with Joy
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40">
                    font-black / 36px / tracking-normal
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* H3 */}
            <RevealBlock delay={0.12}>
              <div className="border-b-4 border-black py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-[#95e1d3] transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50">H3</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-2xl leading-tight">
                    Hard edges, bright colors, slight rotations.
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40">
                    font-black / 24px
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Body */}
            <RevealBlock delay={0.16}>
              <div className="border-b-4 border-black py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-black hover:text-white transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-60">Body</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-normal text-base leading-relaxed max-w-lg">
                    Neo-brutalism takes the raw, unpolished aesthetic of brutalism and injects it with
                    bright colors and playful energy. The borders are thick, the shadows are hard, the
                    corners are sharp — but the spirit is cheerful.
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40 group-hover:opacity-50">
                    font-normal / 16px / sans
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Mono */}
            <RevealBlock delay={0.2}>
              <div className="border-b-4 border-black py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-[#f38181] hover:text-white transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50">Mono</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-base">
                    border-4 border-black shadow-[6px_6px_0_#000] rotate-[-2deg]
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40 group-hover:opacity-50">
                    font-mono / code labels
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Label */}
            <RevealBlock delay={0.24}>
              <div className="py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 group hover:bg-[#ff6b6b] hover:text-white transition-colors duration-150 px-2">
                <div className="md:w-32 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50">Label</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xs uppercase tracking-[0.3em]">
                    COMPONENT TAG / SECTION LABEL / METADATA
                  </p>
                </div>
                <div className="md:w-44 shrink-0">
                  <span className="font-mono text-xs opacity-40 group-hover:opacity-50">
                    font-black / 12px / tracking-[0.3em]
                  </span>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. Controls & Interactive widgets                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="mb-12">
              <BrutalTag bg="bg-[#4ecdc4]" textColor="text-black" rotate="rotate-[-1deg]">
                Interactive
              </BrutalTag>
              <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight rotate-[1deg]">
                Controls
              </h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Progress bars */}
            <RevealBlock>
              <div className="border-4 border-black p-6 shadow-[6px_6px_0_#000] rotate-[-1deg] bg-white">
                <p className="font-black text-sm uppercase tracking-widest mb-5">Progress Bars</p>
                <div className="space-y-4">
                  {/* Interactive one */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs">Coral / Interactive</span>
                      <span className="font-black text-sm">{progress}%</span>
                    </div>
                    <div className="h-6 border-4 border-black bg-white">
                      <div
                        className="h-full bg-[#ff6b6b] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  {/* Static ones */}
                  {[
                    { color: "bg-[#4ecdc4]", pct: 80, label: "Teal" },
                    { color: "bg-[#ffe66d]", pct: 45, label: "Yellow" },
                    { color: "bg-[#95e1d3]", pct: 60, label: "Mint" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs">{bar.label}</span>
                        <span className="font-black text-xs">{bar.pct}%</span>
                      </div>
                      <div className="h-5 border-4 border-black bg-white">
                        <div className={`h-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                  {/* Controls */}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setProgress((p) => Math.max(0, p - 10))}
                      className="flex-1 py-2 border-4 border-black font-black bg-white hover:bg-[#ff6b6b] hover:text-white hover:-translate-y-[2px] hover:shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all duration-150 text-sm"
                    >
                      -10
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgress((p) => Math.min(100, p + 10))}
                      className="flex-1 py-2 border-4 border-black font-black bg-white hover:bg-[#4ecdc4] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none transition-all duration-150 text-sm"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Toggles */}
            <RevealBlock delay={0.05}>
              <div className="border-4 border-black p-6 shadow-[6px_6px_0_#4ecdc4] rotate-[1deg] bg-[#ffe66d]">
                <p className="font-black text-sm uppercase tracking-widest mb-5">Toggles</p>
                <div className="space-y-4">
                  {[
                    { label: "Party mode", on: toggleA, set: setToggleA },
                    { label: "Fun sounds", on: toggleB, set: setToggleB },
                  ].map((tog, i) => (
                    <label
                      key={tog.label}
                      className={`flex items-center justify-between p-4 border-4 border-black bg-white cursor-pointer ${i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"} shadow-[4px_4px_0_#000]`}
                    >
                      <span className="font-black text-sm">{tog.label}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={tog.on}
                        aria-label={tog.label}
                        onClick={() => tog.set((v: boolean) => !v)}
                        className={`w-16 h-8 border-4 border-black relative transition-colors duration-150 ${
                          tog.on ? "bg-[#4ecdc4]" : "bg-white"
                        }`}
                      >
                        <span
                          className={`absolute top-0 w-6 h-6 bg-white border-2 border-black transition-all duration-150 ${
                            tog.on ? "left-8" : "left-0"
                          }`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Checkboxes */}
            <RevealBlock delay={0.1}>
              <div className="border-4 border-black p-6 shadow-[6px_6px_0_#ff6b6b] rotate-[-1deg] bg-[#95e1d3]">
                <p className="font-black text-sm uppercase tracking-widest mb-5">Checkboxes</p>
                <div className="space-y-4">
                  {[
                    { label: "Extra fun", on: checkA, set: setCheckA },
                    { label: "More colors", on: checkB, set: setCheckB },
                    { label: "Maximum joy", on: checkC, set: setCheckC },
                  ].map((chk, i) => (
                    <label
                      key={chk.label}
                      className={`flex items-center gap-4 p-4 border-4 border-black bg-white cursor-pointer ${i % 2 === 0 ? "rotate-[1deg]" : "rotate-[-1deg]"} shadow-[4px_4px_0_#000]`}
                    >
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={chk.on}
                        aria-label={chk.label}
                        onClick={() => chk.set((v: boolean) => !v)}
                        className={`w-8 h-8 border-4 border-black flex items-center justify-center shrink-0 transition-colors duration-150 ${
                          chk.on ? "bg-[#ff6b6b]" : "bg-white"
                        }`}
                      >
                        {chk.on && (
                          <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M3 8l3.5 3.5L13 4" strokeLinecap="square" />
                          </svg>
                        )}
                      </button>
                      <span className="font-black text-sm">{chk.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Tags & Badges row */}
          <RevealBlock delay={0.1}>
            <div className="mt-10 border-4 border-black p-6 shadow-[8px_8px_0_#ffe66d] bg-black text-white">
              <p className="font-black text-sm uppercase tracking-widest mb-6 text-[#ffe66d]">
                Tags and Badges
              </p>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-white/40 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Design", bg: "bg-[#ff6b6b]", text: "text-white", rot: "rotate-[-1deg]" },
                      { label: "Frontend", bg: "bg-[#4ecdc4]", text: "text-black", rot: "rotate-[1deg]" },
                      { label: "Playful", bg: "bg-[#ffe66d]", text: "text-black", rot: "rotate-[-2deg]" },
                      { label: "Brutalist", bg: "bg-[#95e1d3]", text: "text-black", rot: "rotate-[1deg]" },
                      { label: "Vivid", bg: "bg-[#f38181]", text: "text-white", rot: "rotate-[-1deg]" },
                      { label: "Structure", bg: "bg-white", text: "text-black", rot: "rotate-[2deg]" },
                    ].map((tag) => (
                      <BrutalTag key={tag.label} bg={tag.bg} textColor={tag.text} rotate={tag.rot}>
                        {tag.label}
                      </BrutalTag>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-white/40 mb-3">Notification Badges</p>
                  <div className="flex flex-wrap items-center gap-5">
                    {[
                      { val: "1", bg: "bg-[#ff6b6b]", text: "text-white", rot: "rotate-[-2deg]" },
                      { val: "9", bg: "bg-[#4ecdc4]", text: "text-black", rot: "rotate-[2deg]" },
                      { val: "99+", bg: "bg-[#ffe66d]", text: "text-black", rot: "rotate-[-1deg]" },
                      { val: "NEW", bg: "bg-[#95e1d3]", text: "text-black", rot: "rotate-[1deg]" },
                      { val: "HOT", bg: "bg-[#f38181]", text: "text-white", rot: "rotate-[-2deg]" },
                    ].map((b) => (
                      <span
                        key={b.val}
                        className={`inline-flex items-center justify-center min-w-[2rem] h-8 px-2 border-4 border-white ${b.bg} ${b.text} ${b.rot} font-black text-xs`}
                      >
                        {b.val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. Design Principles — Do / Don't                               */}
      {/* ================================================================ */}
      <section id="rules" className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="mb-14">
              <BrutalTag bg="bg-[#f38181]" textColor="text-white" rotate="rotate-[-1deg]">
                System rules
              </BrutalTag>
              <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight rotate-[1deg]">
                Do / Don&apos;t
              </h2>
              <p className="mt-3 font-mono text-sm text-black/50 max-w-md">
                These principles define where neo-brutalist playful ends and where other styles begin.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO */}
            <RevealBlock delay={0.05}>
              <div className="border-4 border-black shadow-[8px_8px_0_#4ecdc4] bg-white h-full rotate-[-1deg]">
                <div className="bg-[#4ecdc4] border-b-4 border-black px-6 py-4">
                  <h3 className="font-black text-xl uppercase tracking-wide">
                    DO — Must have
                  </h3>
                </div>
                <ul className="p-6 space-y-0">
                  {PRINCIPLES_DO.map((rule, i) => (
                    <li
                      key={rule.title}
                      className="flex gap-4 py-4 border-b-2 border-black last:border-0 group hover:bg-[#4ecdc4] hover:px-2 transition-all duration-150 cursor-default"
                    >
                      <span className="font-black text-[#4ecdc4] group-hover:text-black shrink-0 w-6 text-sm leading-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-black text-sm mb-1">{rule.title}</p>
                        <p className="font-mono text-xs text-black/50 group-hover:text-black/70 leading-relaxed">{rule.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.1}>
              <div className="border-4 border-black shadow-[8px_8px_0_#ff6b6b] bg-white h-full rotate-[1deg]">
                <div className="bg-[#ff6b6b] border-b-4 border-black px-6 py-4">
                  <h3 className="font-black text-xl uppercase tracking-wide text-white">
                    DON&apos;T — Forbidden
                  </h3>
                </div>
                <ul className="p-6 space-y-0">
                  {PRINCIPLES_DONT.map((rule, i) => (
                    <li
                      key={rule.title}
                      className="flex gap-4 py-4 border-b-2 border-black last:border-0 group hover:bg-[#ff6b6b] hover:text-white hover:px-2 transition-all duration-150 cursor-default"
                    >
                      <span className="font-black text-[#ff6b6b] group-hover:text-white shrink-0 w-6 text-sm leading-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-black text-sm mb-1">{rule.title}</p>
                        <p className="font-mono text-xs text-black/50 group-hover:text-white/80 leading-relaxed">{rule.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Style comparison */}
          <RevealBlock delay={0.2}>
            <div className="mt-12 border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_#ffe66d] bg-[#ffe66d] rotate-[-1deg]">
              <p className="font-black text-sm uppercase tracking-widest mb-6 text-black/60">
                Neo-Brutalist Playful vs Plain Brutalist
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0_#4ecdc4] rotate-[1deg]">
                  <p className="font-black text-base mb-3 text-[#4ecdc4]">Playful (this style)</p>
                  <ul className="font-mono text-sm space-y-2 text-black/70">
                    <li>+ bright accent colors required</li>
                    <li>+ slight rotations for personality</li>
                    <li>+ shadow-[6px_6px_0_#000] (pure black)</li>
                    <li>+ hover lifts element, active presses</li>
                    <li>+ cheerful energy in every element</li>
                  </ul>
                </div>
                <div className="border-4 border-black bg-white p-5 shadow-[4px_4px_0_#000] rotate-[-1deg]">
                  <p className="font-black text-base mb-3 text-black/40">Plain Brutalist</p>
                  <ul className="font-mono text-sm space-y-2 text-black/40">
                    <li>- monochrome, no color rule</li>
                    <li>- no tilt required</li>
                    <li>- raw/rough aesthetic</li>
                    <li>- no specific hover physics</li>
                    <li>- serious, raw, unapologetic</li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. Footer                                                         */}
      {/* ================================================================ */}
      <footer className="border-t-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
          {/* Scattered accent blocks row */}
          <RevealBlock>
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { bg: "bg-[#ff6b6b]", rot: "rotate-[-2deg]", w: "w-16 md:w-24", h: "h-10" },
                { bg: "bg-[#4ecdc4]", rot: "rotate-[1deg]", w: "w-24 md:w-36", h: "h-10" },
                { bg: "bg-[#ffe66d]", rot: "rotate-[-1deg]", w: "w-12 md:w-16", h: "h-10" },
                { bg: "bg-[#95e1d3]", rot: "rotate-[2deg]", w: "w-20 md:w-28", h: "h-10" },
                { bg: "bg-[#f38181]", rot: "rotate-[-1deg]", w: "w-14 md:w-20", h: "h-10" },
                { bg: "bg-black", rot: "rotate-[1deg]", w: "w-10 md:w-14", h: "h-10" },
              ].map((block, i) => (
                <div
                  key={i}
                  className={`${block.bg} ${block.rot} ${block.w} ${block.h} border-4 border-black shadow-[4px_4px_0_#000] hover:-translate-y-[3px] hover:shadow-[6px_6px_0_#000] transition-all duration-150`}
                />
              ))}
            </div>
          </RevealBlock>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            {/* Left: Brand */}
            <RevealBlock delay={0.05}>
              <div>
                <div className="inline-block bg-black text-white px-4 py-2 border-4 border-black shadow-[6px_6px_0_#ff6b6b] rotate-[-2deg] mb-4">
                  <span className="font-black text-lg uppercase tracking-wide">Neo-Brutalist Playful</span>
                </div>
                <p className="font-mono text-sm text-black/50 max-w-xs mt-3 leading-relaxed">
                  StyleKit — a showcase of design systems with structure and joy.
                  Hard edges, bright colors, no apologies.
                </p>
              </div>
            </RevealBlock>

            {/* Right: Links */}
            <RevealBlock delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/styles/neo-brutalist-playful"
                  className="px-5 py-3 border-4 border-black font-black text-sm uppercase tracking-wide bg-white shadow-[4px_4px_0_#000] hover:bg-[#4ecdc4] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 rotate-[-1deg] inline-block"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles"
                  className="px-5 py-3 border-4 border-black font-black text-sm uppercase tracking-wide bg-[#ff6b6b] text-white shadow-[4px_4px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 rotate-[1deg] inline-block"
                >
                  All Styles →
                </Link>
              </div>
            </RevealBlock>
          </div>

          {/* Bottom strip */}
          <RevealBlock delay={0.15}>
            <div className="mt-12 pt-6 border-t-4 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-mono text-xs text-black/30 uppercase tracking-widest">
                StyleKit — Neo-Brutalist Playful — 俏皮野兽派
              </p>
              <div className="flex items-center gap-2">
                {["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#f38181"].map((hex, i) => {
                  const rots = ["-2deg", "1deg", "-1deg", "2deg", "-1deg"];
                  return (
                    <div
                      key={hex}
                      className="w-5 h-5 border-2 border-black"
                      style={{
                        backgroundColor: hex,
                        transform: `rotate(${rots[i]})`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </RevealBlock>
        </div>
      </footer>

    </div>
  );
}
