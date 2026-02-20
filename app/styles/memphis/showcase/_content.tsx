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

// Memphis geometric SVG background shapes
function GeometricBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large circles */}
      <div className="absolute top-16 left-[8%] w-28 h-28 bg-red-500 rounded-full border-4 border-black opacity-60" />
      <div className="absolute top-36 right-[12%] w-20 h-20 bg-purple-500 rounded-full border-4 border-black opacity-50" />
      <div className="absolute bottom-48 left-[22%] w-16 h-16 bg-green-400 rounded-full border-4 border-black opacity-60" />
      <div className="absolute top-[60%] right-[6%] w-24 h-24 bg-pink-400 rounded-full border-4 border-black opacity-40" />

      {/* Rotated squares */}
      <div className="absolute top-[30%] left-[4%] w-16 h-16 bg-blue-500 border-4 border-black rotate-12 opacity-50" />
      <div className="absolute bottom-36 right-[18%] w-20 h-20 bg-orange-400 border-4 border-black -rotate-6 opacity-50" />
      <div className="absolute top-[70%] left-[55%] w-12 h-12 bg-cyan-400 border-4 border-black rotate-45 opacity-60" />

      {/* Triangles via border trick */}
      <div className="absolute top-44 right-[7%] w-0 h-0 border-l-[35px] border-l-transparent border-b-[60px] border-b-green-400 border-r-[35px] border-r-transparent opacity-50" />
      <div className="absolute bottom-[55%] left-[7%] w-0 h-0 border-l-[28px] border-l-transparent border-b-[48px] border-b-pink-500 border-r-[28px] border-r-transparent rotate-45 opacity-40" />
      <div className="absolute bottom-20 left-[40%] w-0 h-0 border-l-[22px] border-l-transparent border-b-[40px] border-b-yellow-400 border-r-[22px] border-r-transparent opacity-60" />

      {/* Zigzag dots column */}
      <div className="absolute top-[50%] right-[4%] flex flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 bg-black rounded-full ${i % 2 === 0 ? "ml-3" : ""}`}
          />
        ))}
      </div>
      <div className="absolute bottom-[30%] left-[2%] flex flex-col gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 bg-red-500 rounded-full ${i % 2 === 0 ? "ml-4" : ""}`}
          />
        ))}
      </div>

      {/* SVG squiggles */}
      <svg
        className="absolute top-[20%] left-[45%] opacity-30"
        width="120"
        height="40"
        viewBox="0 0 120 40"
        fill="none"
      >
        <path
          d="M0 20 Q15 0 30 20 T60 20 T90 20 T120 20"
          stroke="#000"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-[20%] right-[30%] opacity-30"
        width="100"
        height="30"
        viewBox="0 0 100 30"
        fill="none"
      >
        <path
          d="M0 15 Q12 0 25 15 T50 15 T75 15 T100 15"
          stroke="#ff6b6b"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>
  );
}

// Section header with Memphis decoration
function SectionHeader({
  title,
  subtitle,
  accentColor = "bg-yellow-400",
}: {
  title: string;
  subtitle?: string;
  accentColor?: string;
}) {
  return (
    <div className="text-center mb-12">
      <div className="inline-block relative">
        <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
          {title}
        </h2>
        <div
          className={`absolute -bottom-2 left-0 right-0 h-3 ${accentColor} border-2 border-black -z-10`}
        />
      </div>
      {subtitle && (
        <p className="mt-4 text-black/60 font-bold uppercase tracking-widest text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

const memphisColors = [
  { name: "Memphis Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]", label: "Primary" },
  { name: "Memphis Yellow", hex: "#feca57", bg: "bg-[#feca57]", label: "Secondary" },
  { name: "Memphis Cyan", hex: "#48dbfb", bg: "bg-[#48dbfb]", label: "Accent 1" },
  { name: "Memphis Pink", hex: "#ff9ff3", bg: "bg-[#ff9ff3]", label: "Accent 2" },
  { name: "Memphis Green", hex: "#1dd1a1", bg: "bg-[#1dd1a1]", label: "Accent 3" },
  { name: "Memphis Purple", hex: "#5f27cd", bg: "bg-[#5f27cd]", label: "Accent 4" },
  { name: "Memphis Orange", hex: "#ff9f43", bg: "bg-[#ff9f43]", label: "Warm" },
  { name: "Memphis Black", hex: "#2d3436", bg: "bg-[#2d3436]", label: "Base" },
];

export default function MemphisShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const { ref: heroRef, inView: heroInView } = useInView();

  const tabs = [
    { label: "SHAPES", content: "circles" },
    { label: "PATTERNS", content: "patterns" },
    { label: "MOTIFS", content: "motifs" },
  ] as const;

  const accordionItems = [
    {
      title: "WHAT IS MEMPHIS?",
      content:
        "Memphis Design is a postmodern design movement founded in Milan in 1981 by Ettore Sottsass. It challenged the clean lines of modernism with bold colors, asymmetric shapes, and pattern-rich surfaces that feel joyful and irreverent.",
    },
    {
      title: "KEY VISUAL ELEMENTS",
      content:
        "Bright clashing colors, squiggles and zigzags, geometric shapes (circles, triangles, squares), terrazzo-like dot patterns, thick outlines, and playfully asymmetric compositions define the visual language.",
    },
    {
      title: "MODERN RELEVANCE",
      content:
        "Memphis has made a dramatic comeback in digital interfaces, graphic design, and interior decor — inspiring a generation of designers to embrace joy, color, and visual abundance over restraint.",
    },
  ];

  function handleCopyColor(hex: string) {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  }

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Memphis decorative background */}
      <GeometricBackground />

      {/* ================================================================
          SECTION 1 — FIXED NAVIGATION BAR
      ================================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Back link */}
          <Link
            href="/styles/memphis"
            className="group flex items-center gap-2 text-black font-black uppercase text-sm hover:text-red-600 transition-colors duration-150"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-150"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Docs</span>
          </Link>

          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-black" />
            <span className="font-black text-xl text-black uppercase tracking-widest hidden sm:block">
              MEMPHIS
            </span>
            <div className="w-4 h-4 bg-cyan-400 border-2 border-black rotate-45" />
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-b-[17px] border-b-pink-500 border-r-[10px] border-r-transparent" />
          </div>

          {/* All styles link */}
          <Link
            href="/styles"
            className="px-4 py-2 bg-white border-4 border-black text-black text-sm font-black uppercase shadow-[4px_4px_0px_#000] hover:bg-pink-400 hover:shadow-[6px_6px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ================================================================
          SECTION 2 — HERO WITH GEOMETRIC PATTERN BACKGROUND
      ================================================================ */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
        {/* Dense pattern background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(#000 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          />
          {/* Large accent shapes */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-yellow-300 rounded-full border-8 border-black opacity-70" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-300 border-8 border-black rotate-12 opacity-60" />
          <div className="absolute top-1/3 -right-16 w-48 h-48 bg-cyan-300 rounded-full border-8 border-black opacity-50" />
        </div>

        <div
          ref={heroRef}
          className="relative z-10 text-center max-w-4xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Decorative row */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-black" />
            <div className="w-7 h-7 bg-cyan-400 border-4 border-black rotate-45" />
            <div className="w-6 h-6 bg-pink-500 rounded-full border-4 border-black" />
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-b-[24px] border-b-green-400 border-r-[14px] border-r-transparent" />
            <div className="w-7 h-7 bg-yellow-400 border-4 border-black" />
          </div>

          {/* Main title */}
          <h1
            className="text-7xl sm:text-8xl md:text-[10rem] font-black text-black uppercase leading-none mb-4"
            style={{
              textShadow: "6px 6px 0 #ff6b6b, 12px 12px 0 #48dbfb",
            }}
          >
            MEMPHIS
          </h1>

          <p className="text-sm font-black text-black/50 uppercase tracking-[0.5em] mb-3">
            Design Movement Since 1981
          </p>

          <p className="text-lg md:text-xl font-bold text-black/70 max-w-2xl mx-auto mb-10">
            Chaos is beautiful. Bold colors, geometric madness, and playful
            patterns define a design philosophy that says{" "}
            <strong className="text-red-500">rules are made to be broken.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="group relative px-10 py-5 bg-yellow-400 border-4 border-black text-black font-black uppercase text-lg shadow-[8px_8px_0px_#000] hover:bg-pink-400 hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 hover:-rotate-1 active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-150 ease-out">
              <span className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full border-2 border-black group-hover:scale-125 transition-transform duration-150" />
              <span className="absolute -bottom-3 -left-3 w-5 h-5 bg-cyan-400 border-2 border-black group-hover:-translate-x-2 group-hover:rotate-45 transition-all duration-150" />
              Explore Now
            </button>
            <button className="group relative px-10 py-5 bg-cyan-400 border-4 border-black text-black font-black uppercase text-lg shadow-[8px_8px_0px_#000] hover:bg-yellow-400 hover:shadow-[10px_10px_0px_#000] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-150 ease-out">
              <span className="absolute -top-3 -right-3 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-green-500 border-r-[12px] border-r-transparent group-hover:rotate-180 transition-transform duration-150" />
              View Palette
            </button>
          </div>

          {/* Hero squiggle divider */}
          <div className="mt-16">
            <svg
              className="w-full max-w-lg mx-auto"
              height="20"
              viewBox="0 0 400 20"
              fill="none"
            >
              <path
                d="M0 10 Q20 0 40 10 T80 10 T120 10 T160 10 T200 10 T240 10 T280 10 T320 10 T360 10 T400 10"
                stroke="#000"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — COMPONENT DEMOS (BUTTON, CARD, INPUT)
      ================================================================ */}
      <section className="relative z-10 py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionHeader
              title="Components"
              subtitle="Bold, thick-bordered, and unapologetically colorful"
              accentColor="bg-pink-400"
            />
          </RevealBlock>

          {/* BUTTONS */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="relative p-8 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
              {/* Corner decorations */}
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-yellow-400 rounded-full border-4 border-black" />
              <div className="absolute -top-3 -right-3 w-0 h-0 border-l-[15px] border-l-transparent border-b-[26px] border-b-cyan-400 border-r-[15px] border-r-transparent" />

              <p className="text-sm font-black text-black uppercase tracking-widest mb-8">
                Button Variants
              </p>

              <div className="flex flex-wrap gap-5">
                {/* Primary — full Memphis spec */}
                <button className="group relative px-8 py-4 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:bg-pink-400 hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 hover:-rotate-2 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full border-2 border-black group-hover:scale-125 transition-transform duration-150" />
                  <span className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 border-2 border-black group-hover:-translate-x-2 group-hover:rotate-45 transition-all duration-150" />
                  Primary
                </button>

                {/* Secondary */}
                <button className="group relative px-8 py-4 bg-cyan-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:bg-yellow-400 hover:shadow-[8px_8px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                  <span className="absolute -top-3 -right-3 w-5 h-5 bg-purple-500 border-2 border-black rotate-45 group-hover:rotate-90 transition-transform duration-150" />
                  Secondary
                </button>

                {/* Danger */}
                <button className="group relative px-8 py-4 bg-red-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:bg-red-500 hover:shadow-[8px_8px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                  Danger
                </button>

                {/* Success */}
                <button className="group relative px-8 py-4 bg-green-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:bg-green-500 hover:shadow-[8px_8px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                  <span className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full border-2 border-black group-hover:translate-x-1 group-hover:-translate-y-2 transition-transform duration-150" />
                  Success
                </button>
              </div>

              {/* Size variants */}
              <p className="text-sm font-black text-black uppercase tracking-widest mt-10 mb-6">
                Sizes
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-4 py-2 text-xs bg-purple-400 border-4 border-black text-black font-black uppercase shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all duration-150">
                  Small
                </button>
                <button className="px-6 py-3 text-sm bg-purple-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none transition-all duration-150">
                  Medium
                </button>
                <button className="px-10 py-5 text-lg bg-purple-400 border-4 border-black text-black font-black uppercase shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none transition-all duration-150">
                  Large
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* CARDS */}
          <RevealBlock delay={0.15} className="mb-12">
            <p className="text-sm font-black text-black uppercase tracking-widest mb-6">
              Card Components
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "ENERGY",
                  desc: "Bold design that commands attention and radiates visual power.",
                  bg: "bg-pink-300",
                  dotColor: "bg-yellow-400",
                  triColor: "border-b-cyan-400",
                },
                {
                  title: "SHAPES",
                  desc: "Geometric elements that bring chaos and joy in equal measure.",
                  bg: "bg-yellow-300",
                  dotColor: "bg-red-500",
                  triColor: "border-b-pink-500",
                },
                {
                  title: "PATTERNS",
                  desc: "Squiggles, dots, and zigzags layered into visual excitement.",
                  bg: "bg-cyan-300",
                  dotColor: "bg-purple-500",
                  triColor: "border-b-green-400",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`group relative p-7 ${card.bg} border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] hover:-translate-y-2 hover:-rotate-1 transition-all duration-200 ease-out cursor-pointer`}
                >
                  {/* Playful Chaos: each shape moves in its own direction */}
                  <div
                    className={`absolute -top-4 -left-4 w-10 h-10 ${card.dotColor} rounded-full border-2 border-black group-hover:translate-x-4 group-hover:-translate-y-2 transition-transform duration-200 ease-out`}
                  />
                  <div
                    className={`absolute -bottom-3 -right-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] ${card.triColor} border-r-[20px] border-r-transparent group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:rotate-12 transition-all duration-200 ease-out`}
                  />
                  <div className="w-14 h-14 bg-black border-4 border-black flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform duration-200 ease-out">
                    <div className="w-6 h-6 bg-white rounded-sm" />
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase mb-3 group-hover:text-white transition-colors duration-150">
                    {card.title}
                  </h3>
                  <p className="text-black/70 font-medium mb-4 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-150 px-1">
                    {card.desc}
                  </p>
                  <span className="text-sm font-black uppercase underline text-black hover:text-red-600 transition-colors duration-150">
                    Learn More
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* INPUT */}
          <RevealBlock delay={0.2}>
            <div className="relative p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000] max-w-xl">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
              <div className="absolute -bottom-3 -left-3 w-0 h-0 border-l-[16px] border-l-transparent border-b-[28px] border-b-pink-400 border-r-[16px] border-r-transparent" />

              <p className="text-sm font-black text-black uppercase tracking-widest mb-6">
                Input Fields
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-black text-black uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full px-6 py-4 bg-white border-4 border-black text-black font-bold placeholder-gray-400 shadow-[4px_4px_0px_#48dbfb] focus:shadow-[4px_4px_0px_#ff6b6b] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-black uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="hello@memphis.design"
                    className="w-full px-6 py-4 bg-yellow-50 border-4 border-black text-black font-bold placeholder-gray-400 shadow-[4px_4px_0px_#feca57] focus:shadow-[4px_4px_0px_#ff9ff3] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-black uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Say something bold..."
                    className="w-full px-6 py-4 bg-pink-50 border-4 border-black text-black font-bold placeholder-gray-400 shadow-[4px_4px_0px_#1dd1a1] focus:shadow-[4px_4px_0px_#5f27cd] focus:outline-none transition-all resize-none"
                  />
                </div>
                <button className="w-full py-4 bg-green-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:bg-yellow-400 hover:shadow-[8px_8px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150">
                  Submit
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — PATTERN / SHAPE SHOWCASE
      ================================================================ */}
      <section className="relative z-10 py-20 px-6 bg-yellow-300 border-y-4 border-black overflow-hidden">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 14px, #000 14px, #000 16px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <RevealBlock>
            <SectionHeader
              title="Shapes & Patterns"
              subtitle="The geometric vocabulary of Memphis design"
              accentColor="bg-red-500"
            />
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 font-black uppercase text-sm border-4 border-black transition-all duration-150 ${
                    activeTab === i
                      ? "bg-black text-white shadow-[4px_4px_0px_#ff6b6b]"
                      : "bg-white text-black shadow-[4px_4px_0px_#000] hover:bg-yellow-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content panels */}
          <RevealBlock delay={0.15}>
            <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000] min-h-[260px]">
              {activeTab === 0 && (
                <div>
                  <p className="font-black text-black uppercase mb-6 tracking-widest text-sm">
                    Geometric Circles
                  </p>
                  <div className="flex flex-wrap gap-6 items-end">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-black" />
                    <div className="w-14 h-14 bg-yellow-400 rounded-full border-4 border-black" />
                    <div className="w-20 h-20 bg-cyan-400 rounded-full border-4 border-black" />
                    <div className="w-28 h-28 bg-pink-400 rounded-full border-4 border-black" />
                    <div className="w-16 h-16 bg-green-400 rounded-full border-4 border-black" />
                    <div className="w-10 h-10 bg-purple-500 rounded-full border-4 border-black" />
                  </div>
                  <p className="mt-6 text-black/60 font-medium">
                    Circles of varying sizes create rhythm and visual movement across compositions.
                  </p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="font-black text-black uppercase mb-6 tracking-widest text-sm">
                    Surface Patterns
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div
                        className="w-full h-20 border-4 border-black mb-2"
                        style={{
                          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
                          backgroundSize: "12px 12px",
                        }}
                      />
                      <p className="text-xs font-black uppercase">Dots</p>
                    </div>
                    <div>
                      <div
                        className="w-full h-20 border-4 border-black mb-2"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 8px, #ff6b6b 8px, #ff6b6b 10px)",
                        }}
                      />
                      <p className="text-xs font-black uppercase">Stripes</p>
                    </div>
                    <div>
                      <div
                        className="w-full h-20 border-4 border-black mb-2 bg-yellow-200"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 16px), repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 16px)",
                        }}
                      />
                      <p className="text-xs font-black uppercase">Grid</p>
                    </div>
                    <div>
                      <div
                        className="w-full h-20 border-4 border-black mb-2 bg-cyan-200 flex flex-wrap content-start gap-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(-45deg, transparent, transparent 6px, #5f27cd 6px, #5f27cd 8px)",
                        }}
                      />
                      <p className="text-xs font-black uppercase">Diagonal</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="font-black text-black uppercase mb-6 tracking-widest text-sm">
                    Memphis Motifs
                  </p>
                  <div className="flex flex-wrap gap-8 items-center">
                    {/* Triangle */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-0 h-0 border-l-[30px] border-l-transparent border-b-[52px] border-b-green-400 border-r-[30px] border-r-transparent" />
                      <p className="text-xs font-black uppercase">Triangle</p>
                    </div>
                    {/* Diamond */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-yellow-400 border-4 border-black rotate-45" />
                      <p className="text-xs font-black uppercase">Diamond</p>
                    </div>
                    {/* Star points */}
                    <div className="flex flex-col items-center gap-2">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <polygon
                          points="24,2 29,17 44,17 32,27 37,42 24,33 11,42 16,27 4,17 19,17"
                          fill="#ff9ff3"
                          stroke="#000"
                          strokeWidth="3"
                        />
                      </svg>
                      <p className="text-xs font-black uppercase">Star</p>
                    </div>
                    {/* Squiggle */}
                    <div className="flex flex-col items-center gap-2">
                      <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                        <path
                          d="M0 16 Q10 0 20 16 T40 16 T60 16 T80 16"
                          stroke="#ff6b6b"
                          strokeWidth="5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                      <p className="text-xs font-black uppercase">Squiggle</p>
                    </div>
                    {/* Zigzag */}
                    <div className="flex flex-col items-center gap-2">
                      <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
                        <polyline
                          points="0,28 16,4 32,28 48,4 64,28 80,4"
                          stroke="#48dbfb"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      <p className="text-xs font-black uppercase">Zigzag</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>

          {/* Decorative pattern row */}
          <RevealBlock delay={0.2} className="mt-12">
            <div className="flex items-center gap-0 overflow-hidden border-4 border-black">
              {["bg-red-500", "bg-yellow-400", "bg-cyan-400", "bg-pink-400", "bg-green-400", "bg-purple-500", "bg-orange-400", "bg-blue-500"].map(
                (color, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-16 ${color} flex items-center justify-center`}
                  >
                    {i % 2 === 0 ? (
                      <div className="w-6 h-6 bg-black rounded-full" />
                    ) : (
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-black border-r-[12px] border-r-transparent" />
                    )}
                  </div>
                )
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — DESIGN RULES (DO / DON'T)
      ================================================================ */}
      <section className="relative z-10 py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionHeader
              title="Design Rules"
              subtitle="The do's and don'ts of Memphis style"
              accentColor="bg-cyan-400"
            />
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO list */}
            <RevealBlock delay={0.1}>
              <div className="relative p-8 bg-green-300 border-4 border-black shadow-[8px_8px_0px_#000] h-full">
                <div className="absolute -top-5 -left-5 w-12 h-12 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-black uppercase mb-6 ml-4">
                  DO These Things
                </h3>
                <ul className="space-y-4">
                  {[
                    "Use vivid, clashing color combinations",
                    "Add geometric decorations (circles, triangles, squiggles)",
                    "Apply thick borders — border-4 minimum",
                    "Embrace irregular, asymmetric layouts",
                    "Use dot, stripe, and wave patterns",
                    "Use heavy, bold sans-serif fonts",
                    "Make hover states pop with instant color swaps",
                    "Give buttons a toy physics feel on active state",
                    "Move each decoration independently on hover (Playful Chaos)",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-black font-medium leading-snug">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T list */}
            <RevealBlock delay={0.2}>
              <div className="relative p-8 bg-red-200 border-4 border-black shadow-[8px_8px_0px_#000] h-full">
                <div className="absolute -top-5 -left-5 w-12 h-12 bg-red-500 rounded-full border-4 border-black flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-black uppercase mb-6 ml-4">
                  NEVER Do These
                </h3>
                <ul className="space-y-4">
                  {[
                    "Use monochrome or muted color schemes",
                    "Create overly symmetric, rigid layouts",
                    "Use thin borders or hairline rules",
                    "Omit geometric decorative elements entirely",
                    "Keep decorations static on hover — it kills the soul",
                    "Keep the shadow on button active state (press it flat!)",
                    "Shrink shadow on hover — hover should GROW the shadow",
                    "Use gradients — flat solid colors only in Memphis",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-black font-medium leading-snug">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Accordion: additional philosophy */}
          <RevealBlock delay={0.3} className="mt-12">
            <div className="space-y-3">
              {accordionItems.map((item, i) => (
                <div
                  key={i}
                  className={`border-4 border-black transition-all duration-200 ${
                    openAccordion === i
                      ? "bg-yellow-300 shadow-[6px_6px_0px_#000]"
                      : "bg-white shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000]"
                  }`}
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-black text-black uppercase text-sm tracking-wide">
                      {item.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-black transition-transform duration-200 ${openAccordion === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 text-black/80 font-medium leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — COLOR PALETTE
      ================================================================ */}
      <section className="relative z-10 py-20 px-6 bg-cyan-200 border-y-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionHeader
              title="Color Palette"
              subtitle="Flat, bold, unapologetic — click to copy"
              accentColor="bg-purple-500"
            />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {memphisColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleCopyColor(color.hex)}
                  className="group relative border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 text-left overflow-hidden"
                >
                  <div className={`${color.bg} h-24 w-full border-b-4 border-black`} />
                  <div className="p-3 bg-white">
                    <p className="font-black text-sm text-black uppercase">{color.name}</p>
                    <p className="text-xs font-mono text-black/60 mt-0.5">{color.hex}</p>
                    <p className="text-xs font-bold text-black/40 uppercase">{color.label}</p>
                  </div>
                  {/* Copy feedback */}
                  {copiedColor === color.hex && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <span className="text-white font-black uppercase text-sm">Copied!</span>
                    </div>
                  )}
                  {/* Hover decoration */}
                  <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Progress bars showing color usage */}
          <RevealBlock delay={0.2} className="mt-12">
            <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full border-2 border-black hidden" />
              <p className="font-black text-black uppercase text-sm tracking-widest mb-6">
                Color Balance Meter
              </p>
              <div className="space-y-5">
                {[
                  { label: "Primary Red", pct: progress, color: "bg-red-500" },
                  { label: "Yellow Accent", pct: 80, color: "bg-yellow-400" },
                  { label: "Cyan Pop", pct: 60, color: "bg-cyan-400" },
                  { label: "Pink Energy", pct: 45, color: "bg-pink-400" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-black text-black uppercase">{bar.label}</span>
                      <span className="text-xs font-black text-black">{bar.pct}%</span>
                    </div>
                    <div className="h-6 bg-gray-100 border-4 border-black overflow-hidden">
                      <div
                        className={`h-full ${bar.color} transition-all duration-500`}
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setProgress(Math.max(10, progress - 10))}
                    className="px-5 py-2 bg-red-400 border-4 border-black text-black font-black uppercase text-sm shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all duration-150"
                  >
                    -10%
                  </button>
                  <button
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    className="px-5 py-2 bg-green-400 border-4 border-black text-black font-black uppercase text-sm shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all duration-150"
                  >
                    +10%
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — INTERACTIVE PATTERN PLAYGROUND
      ================================================================ */}
      <section className="relative z-10 py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionHeader
              title="Pattern Playground"
              subtitle="Memphis in motion — hover to trigger playful chaos"
              accentColor="bg-green-400"
            />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Typography scale */}
              <div className="relative p-8 bg-pink-200 border-4 border-black shadow-[8px_8px_0px_#000]">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
                <p className="text-xs font-black text-black uppercase tracking-widest mb-6">
                  Typography Scale
                </p>
                <div className="space-y-3">
                  <p className="text-5xl font-black text-black uppercase leading-none">Aa</p>
                  <p className="text-3xl font-black text-black uppercase">Bold Heading</p>
                  <p className="text-xl font-bold text-black">Sub-Headline Text</p>
                  <p className="text-base font-medium text-black/70">
                    Body copy that remains readable while the design runs wild around it.
                  </p>
                  <p className="text-xs font-black text-black/50 uppercase tracking-widest">
                    Caption / Label
                  </p>
                </div>
              </div>

              {/* Notification / Alert demos */}
              <div className="space-y-4">
                <RevealBlock delay={0.15}>
                  <div className="flex items-center gap-4 p-4 bg-green-300 border-4 border-black shadow-[4px_4px_0px_#000]">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 border-4 border-black flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-black uppercase text-sm">SUCCESS!</p>
                      <p className="text-black/70 font-medium text-sm">Action completed.</p>
                    </div>
                  </div>
                </RevealBlock>

                <RevealBlock delay={0.2}>
                  <div className="flex items-center gap-4 p-4 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_#000]">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-500 border-4 border-black flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-black uppercase text-sm">WARNING!</p>
                      <p className="text-black/70 font-medium text-sm">Check your input.</p>
                    </div>
                  </div>
                </RevealBlock>

                <RevealBlock delay={0.25}>
                  <div className="flex items-center gap-4 p-4 bg-red-300 border-4 border-black shadow-[4px_4px_0px_#000]">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 border-4 border-black flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-black uppercase text-sm">ERROR!</p>
                      <p className="text-black/70 font-medium text-sm">Something went wrong.</p>
                    </div>
                  </div>
                </RevealBlock>

                <RevealBlock delay={0.3}>
                  <div className="flex items-center gap-4 p-4 bg-cyan-300 border-4 border-black shadow-[4px_4px_0px_#000]">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 border-4 border-black flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-black uppercase text-sm">INFO!</p>
                      <p className="text-black/70 font-medium text-sm">Useful information here.</p>
                    </div>
                  </div>
                </RevealBlock>
              </div>
            </div>
          </RevealBlock>

          {/* Tags and badges */}
          <RevealBlock delay={0.15}>
            <div className="relative p-8 bg-purple-200 border-4 border-black shadow-[8px_8px_0px_#000]">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 border-2 border-black rotate-45" />
              <p className="text-xs font-black text-black uppercase tracking-widest mb-6">
                Tags and Badges
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "DESIGN", bg: "bg-yellow-400" },
                  { label: "RETRO", bg: "bg-red-400" },
                  { label: "ART", bg: "bg-cyan-400" },
                  { label: "FUN", bg: "bg-green-400" },
                  { label: "BOLD", bg: "bg-purple-400" },
                  { label: "1980s", bg: "bg-pink-400" },
                  { label: "POP", bg: "bg-orange-400" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-4 py-2 ${tag.bg} border-4 border-black text-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 transition-all duration-150 cursor-default`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <span className="w-10 h-10 bg-red-500 rounded-full border-4 border-black flex items-center justify-center text-white font-black text-sm">
                  5
                </span>
                <span className="px-3 h-8 bg-yellow-400 border-4 border-black flex items-center text-black font-black text-xs uppercase">
                  NEW
                </span>
                <span className="px-3 h-8 bg-green-400 border-4 border-black flex items-center text-black font-black text-xs uppercase">
                  PRO
                </span>
                <span className="px-3 h-8 bg-cyan-400 border-4 border-black flex items-center text-black font-black text-xs uppercase">
                  HOT
                </span>
                <span className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center text-black font-black text-sm">
                  99
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 — STATS / NUMBERS DISPLAY
      ================================================================ */}
      <section className="relative z-10 py-20 px-6 bg-red-100 border-y-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionHeader
              title="By The Numbers"
              subtitle="Memphis by the data"
              accentColor="bg-red-500"
            />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: "FOUNDED", value: "1981", bg: "bg-pink-300", dot: "bg-yellow-400" },
                { label: "MEMBERS", value: "20+", bg: "bg-yellow-300", dot: "bg-red-500" },
                { label: "YEARS", value: "40+", bg: "bg-cyan-300", dot: "bg-purple-500" },
                { label: "IMPACT", value: "100%", bg: "bg-green-300", dot: "bg-pink-500" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`group relative p-6 ${stat.bg} border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all duration-150`}
                >
                  <div
                    className={`absolute -top-4 -right-4 w-8 h-8 ${stat.dot} rounded-full border-2 border-black group-hover:scale-125 transition-transform duration-150`}
                  />
                  <p className="text-4xl md:text-5xl font-black text-black">{stat.value}</p>
                  <p className="text-xs font-black text-black/60 uppercase mt-2 tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Philosophy quote */}
          <RevealBlock delay={0.2} className="mt-12">
            <div className="relative p-10 bg-black border-4 border-black shadow-[8px_8px_0px_#ff6b6b]">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center">
                <span className="text-2xl font-black text-black">"</span>
              </div>
              <blockquote className="text-2xl md:text-3xl font-black text-white uppercase leading-snug">
                Design should be fun. Rules exist to be broken. Color is not a luxury — it is a right.
              </blockquote>
              <p className="mt-6 text-sm font-bold text-white/50 uppercase tracking-widest">
                — Ettore Sottsass, Memphis Group Founder
              </p>
              {/* Decorative corner shapes */}
              <div className="absolute bottom-4 right-6 flex gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                <div className="w-4 h-4 bg-yellow-400 border-2 border-white rotate-45" />
                <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-white" />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 9 — FOOTER
      ================================================================ */}
      <footer className="relative z-10 bg-yellow-400 border-t-4 border-black py-14 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-500 rounded-full border-4 border-black" />
              <span className="text-3xl font-black text-black uppercase tracking-widest">
                MEMPHIS
              </span>
              <div className="w-8 h-8 bg-cyan-400 border-4 border-black rotate-45" />
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-b-[24px] border-b-pink-500 border-r-[14px] border-r-transparent" />
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: "All Styles", href: "/styles" },
                { label: "Memphis Docs", href: "/styles/memphis" },
                { label: "Components", href: "/styles/memphis#components" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2 bg-black text-white font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_#000] transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Squiggle divider */}
          <svg
            className="w-full mb-8"
            height="16"
            viewBox="0 0 800 16"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 8 Q25 0 50 8 T100 8 T150 8 T200 8 T250 8 T300 8 T350 8 T400 8 T450 8 T500 8 T550 8 T600 8 T650 8 T700 8 T750 8 T800 8"
              stroke="#000"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-black font-bold text-sm">
              Part of the{" "}
              <Link
                href="/"
                className="underline font-black hover:text-red-600 transition-colors duration-150"
              >
                StyleKit
              </Link>{" "}
              Design System Collection
            </p>

            {/* Color dots row */}
            <div className="flex items-center gap-2">
              {[
                "bg-red-500",
                "bg-yellow-400",
                "bg-cyan-400",
                "bg-pink-400",
                "bg-green-400",
                "bg-purple-500",
              ].map((c, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 ${c} rounded-full border-2 border-black`}
                />
              ))}
            </div>

            <p className="text-black/60 font-bold text-xs uppercase tracking-widest">
              Design Should Be Fun!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
