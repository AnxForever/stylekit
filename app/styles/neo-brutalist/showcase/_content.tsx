"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function TerminalIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const accentColors = [
  { name: "Hot Pink", hex: "#ff006e", label: "CTA / Hover", tailwind: "bg-[#ff006e]" },
  { name: "Acid Green", hex: "#ccff00", label: "Success / Accent", tailwind: "bg-[#ccff00]" },
  { name: "Electric Blue", hex: "#00d9ff", label: "Links / Info", tailwind: "bg-[#00d9ff]" },
  { name: "Vivid Orange", hex: "#ff9500", label: "Tags / Warnings", tailwind: "bg-[#ff9500]" },
  { name: "Pure Black", hex: "#000000", label: "Borders / Text", tailwind: "bg-black" },
  { name: "Pure White", hex: "#ffffff", label: "Background", tailwind: "bg-white border-2 border-black" },
];

const featureCards = [
  {
    title: "ZERO BORDER RADIUS",
    desc: "Every element is a hard rectangle. No rounded corners ever. The grid is the grid.",
    accent: "#ff006e",
    tag: "CORE RULE",
  },
  {
    title: "HARD SHADOW",
    desc: "4-8px offset, zero blur, pure black. Shadows define depth through displacement not diffusion.",
    accent: "#ccff00",
    tag: "VISUAL",
  },
  {
    title: "BLACK BORDER",
    desc: "2px mobile, 4px desktop. Pure black, no grays, no slates. The border IS the structure.",
    accent: "#00d9ff",
    tag: "CORE RULE",
  },
  {
    title: "BRUTAL CONTRAST",
    desc: "High contrast isn't optional. Black on white. White on black. Neon on black. Never subtle.",
    accent: "#ff9500",
    tag: "VISUAL",
  },
];

const doItems = [
  "border-4 border-black — thick pure black borders",
  "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] — hard offset shadow",
  "rounded-none — zero border radius always",
  "font-black for headings, font-mono for body",
  "hover:bg-[#ffff00] — hard instant color snap",
  "active:translate-x-[Npx] active:shadow-none — crushing press",
  "hover:-translate-y-1 hover:shadow-[10px_10px] — lift before crush",
  "transition-all duration-150 ease-out — fast, brutal timing",
];

const dontItems = [
  "rounded-lg, rounded-md — NO rounded corners ever",
  "shadow-lg, shadow-xl — NO blurred diffuse shadows",
  "bg-gradient-* — NO gradients of any kind",
  "border-gray-*, border-slate-* — NO gray borders",
  "Fade-in opacity transitions on hover backgrounds",
  "active translate smaller than shadow offset (incomplete crush)",
  "hover shadow disappear instead of enlarge (wrong order)",
  "Soft spring easing — use ease-out duration-150 only",
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [snapHovered, setSnapHovered] = useState(false);
  const [crushHovered, setCrushHovered] = useState(false);
  const [heavyHovered, setHeavyHovered] = useState(false);
  const [roundingDemo, setRoundingDemo] = useState<"brutal" | "soft">("brutal");
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState([
    { text: "Ship the product", done: true },
    { text: "Fix the build", done: false },
    { text: "Review PRs", done: false },
    { text: "Write docs", done: true },
  ]);
  const [counterValue, setCounterValue] = useState(0);
  const [notifVisible, setNotifVisible] = useState(false);

  // suppress unused warning — crushHovered used in rule 1 demo label
  void crushHovered;

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleTodo(i: number) {
    setTodoItems((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], done: !next[i].done };
      return next;
    });
  }

  function showNotif() {
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 2500);
  }

  return (
    <div className="min-h-screen bg-white font-mono text-black overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes brutal-march {
          0% { background-position: 0 0; }
          100% { background-position: 32px 0; }
        }
        @keyframes brutal-stamp {
          0% { transform: scale(1.4) rotate(-6deg); opacity: 0; }
          60% { transform: scale(0.96) rotate(1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .brutal-march-anim {
          animation: brutal-march 0.6s linear infinite;
          background-image: repeating-linear-gradient(
            90deg,
            black 0px,
            black 8px,
            transparent 8px,
            transparent 16px
          );
          background-size: 32px 4px;
          background-repeat: repeat-x;
          background-position: bottom;
        }
        .brutal-stamp-anim {
          animation: brutal-stamp 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-0 border-2 border-black">
            <div className="bg-black text-white font-black text-sm md:text-base px-3 py-2 uppercase tracking-widest">
              NEO
            </div>
            <div className="bg-[#ff006e] text-white font-black text-sm md:text-base px-3 py-2 uppercase tracking-widest">
              BRUTAL
            </div>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-0 border-2 border-black divide-x-2 divide-black">
            {["Palette", "Components", "Animation", "App Demo", "Rules"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-black text-white font-black text-xs md:text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-24 md:pt-28 pb-0 overflow-hidden border-b-4 border-black bg-[#ccff00]">
        {/* Marching ants top stripe */}
        <div className="absolute top-[56px] md:top-[64px] left-0 right-0 h-1 brutal-march-anim" />

        {/* Hero content */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-0 relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#ccff00] font-black text-xs uppercase tracking-[0.3em] mb-6 border-2 border-black">
              <BoltIcon className="w-3 h-3" />
              Design System Showcase
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-black text-5xl md:text-7xl lg:text-[96px] leading-none tracking-tighter mb-6 text-black uppercase"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s",
            }}
          >
            RAW.
            <br />
            BOLD.
            <br />
            <span className="text-black" style={{ WebkitTextStroke: "4px black", color: "transparent" }}>
              BRUTAL.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="font-mono text-base md:text-xl max-w-2xl mb-8 text-black leading-relaxed"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            Neo-Brutalist design: thick black borders, hard-edge shadows, zero
            border-radius, maximum contrast. Function over form. Unapologetic.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s",
            }}
          >
            <button className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-black text-white font-black uppercase tracking-wider text-sm md:text-base border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,0,110,1)] hover:shadow-[10px_10px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
              <BoltIcon className="w-4 h-4 text-[#ff006e]" />
              Explore Style
            </button>
            <button className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-black font-black uppercase tracking-wider text-sm md:text-base border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00d9ff] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
              <GridIcon className="w-4 h-4" />
              View Components
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 border-t-4 border-black"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s",
            }}
          >
            {[
              { value: "0px", label: "BORDER RADIUS", accent: "#ff006e" },
              { value: "4px", label: "BORDER WIDTH", accent: "#ccff00" },
              { value: "8px", label: "SHADOW OFFSET", accent: "#00d9ff" },
              { value: "150ms", label: "TRANSITION", accent: "#ff9500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 md:p-8 border-r-4 border-black last:border-r-0 group cursor-default hover:bg-black transition-colors duration-150"
              >
                <div
                  className="text-3xl md:text-4xl font-black mb-1 group-hover:text-white transition-colors duration-150"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-black group-hover:text-white transition-colors duration-150">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="scroll-mt-16 py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-[#ff006e] block mb-4">
              // Color System
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-black leading-none mb-2">
              PALETTE
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-mono text-base md:text-lg text-black max-w-xl leading-relaxed">
              Black and white as the structural foundation. Four high-energy accent colors for emphasis.
              No pastels. No gradients. No neutral grays.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-4 border-black mb-8">
              {accentColors.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="group cursor-pointer border-r-4 border-black last:border-r-0"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="h-24 md:h-32"
                    style={{
                      backgroundColor: swatch.hex,
                      transform: hoveredSwatch === i ? "scaleY(1.04)" : "scaleY(1)",
                      transformOrigin: "bottom",
                      transition: "transform 0.15s ease-out",
                      borderBottom: "4px solid black",
                    }}
                  />
                  <div className="p-3 bg-white">
                    <div className="font-black text-xs uppercase">{swatch.name}</div>
                    <div className="font-mono text-xs text-black/60">{swatch.hex}</div>
                    <div
                      className="mt-1 text-[10px] font-black uppercase px-1.5 py-0.5 border-2 border-black inline-block"
                      style={{
                        backgroundColor: swatch.hex === "#ffffff" ? "#000" : swatch.hex,
                        color: swatch.hex === "#ffffff" || swatch.hex === "#ccff00" ? "#000" : "#fff",
                      }}
                    >
                      {swatch.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Contrast demos */}
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-4 border-black">
              {[
                { bg: "#000000", text: "#ff006e", label: "PINK ON BLACK" },
                { bg: "#ccff00", text: "#000000", label: "BLACK ON GREEN" },
                { bg: "#ff006e", text: "#ffffff", label: "WHITE ON PINK" },
                { bg: "#ffffff", text: "#000000", label: "BLACK ON WHITE" },
              ].map((combo) => (
                <div
                  key={combo.label}
                  className="p-6 md:p-8 border-r-4 border-black last:border-r-0 flex flex-col gap-2"
                  style={{ backgroundColor: combo.bg }}
                >
                  <div
                    className="font-black text-2xl md:text-3xl uppercase leading-none"
                    style={{ color: combo.text }}
                  >
                    Aa
                  </div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: combo.text, opacity: 0.8 }}
                  >
                    {combo.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section id="components" className="scroll-mt-16 py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-[#00d9ff] block mb-4">
              // Components
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-black leading-none">
              BUILDING<br />BLOCKS
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="font-mono text-base md:text-lg text-black max-w-xl leading-relaxed">
              Every component follows the same rule: black border, hard shadow, zero rounding.
              Hover increases shadow. Active crushes it flat.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-0">
            <div className="flex border-4 border-black border-b-0">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-xs font-black uppercase tracking-widest border-r-4 border-black last:border-r-0 transition-colors duration-150 ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-[#ccff00]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div className="border-4 border-black p-8 md:p-12">

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  {/* Primary buttons */}
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-black/50 mb-6 border-b-2 border-black pb-2">
                      Primary &#8212; Physical Crushing active state
                    </p>
                    <div className="flex flex-wrap gap-5 items-start">
                      <button className="px-6 py-3 md:px-8 md:py-4 bg-[#ff006e] text-white font-black uppercase tracking-wider text-sm md:text-base border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                        Click Hard
                      </button>
                      <button className="px-6 py-3 md:px-8 md:py-4 bg-[#ccff00] text-black font-black uppercase tracking-wider text-sm md:text-base border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                        Go Bold
                      </button>
                      <button className="px-6 py-3 md:px-8 md:py-4 bg-[#00d9ff] text-black font-black uppercase tracking-wider text-sm md:text-base border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                        Strike Now
                      </button>
                    </div>
                  </div>

                  {/* Outline / ghost */}
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-black/50 mb-6 border-b-2 border-black pb-2">
                      Outline &amp; Ghost
                    </p>
                    <div className="flex flex-wrap gap-5 items-start">
                      <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-black uppercase tracking-wider text-sm border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffff00] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                        Outlined
                      </button>
                      <button className="px-6 py-3 md:px-8 md:py-4 bg-transparent text-black font-black uppercase tracking-wider text-sm border-4 border-black hover:bg-black hover:text-white active:bg-[#ff006e] active:border-[#ff006e] transition-all duration-150 ease-out">
                        Ghost
                      </button>
                      <button className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-black text-[#ccff00] font-black uppercase tracking-wider text-sm border-4 border-black shadow-[6px_6px_0px_0px_rgba(204,255,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out">
                        <BoltIcon className="w-4 h-4" />
                        Dark CTA
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-black/50 mb-6 border-b-2 border-black pb-2">
                      Size scale
                    </p>
                    <div className="flex flex-wrap gap-5 items-start">
                      {[
                        { size: "XS", px: "px-3 py-1.5", text: "text-[10px]", border: "border-2", shadow: "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]", hoverShadow: "hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]", activeTrans: "active:translate-x-[3px] active:translate-y-[3px]" },
                        { size: "SM", px: "px-4 py-2", text: "text-xs", border: "border-2", shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", hoverShadow: "hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]", activeTrans: "active:translate-x-[4px] active:translate-y-[4px]" },
                        { size: "MD", px: "px-6 py-3", text: "text-sm", border: "border-4", shadow: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]", hoverShadow: "hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]", activeTrans: "active:translate-x-[6px] active:translate-y-[6px]" },
                        { size: "LG", px: "px-8 py-4", text: "text-base", border: "border-4", shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", hoverShadow: "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]", activeTrans: "active:translate-x-[8px] active:translate-y-[8px]" },
                      ].map(({ size, px, text, border, shadow, hoverShadow, activeTrans }) => (
                        <button
                          key={size}
                          className={`bg-[#ff006e] text-white font-black uppercase tracking-wider border-black hover:-translate-y-1 hover:-translate-x-1 active:shadow-none transition-all duration-150 ease-out ${px} ${text} ${border} ${shadow} ${hoverShadow} ${activeTrans}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {featureCards.map((card) => (
                    <div
                      key={card.title}
                      className="group border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 hover:-translate-x-1 hover:bg-[#ffff00] transition-all duration-150 ease-out p-6 md:p-8 cursor-pointer"
                    >
                      <div
                        className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4 border-2 border-black"
                        style={{ backgroundColor: card.accent, color: card.accent === "#ccff00" ? "#000" : "#fff" }}
                      >
                        {card.tag}
                      </div>
                      <h3 className="font-black text-lg md:text-xl uppercase tracking-tight mb-3 group-hover:tracking-wider transition-all duration-150">
                        {card.title}
                      </h3>
                      <p className="font-mono text-sm text-black/70 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-2">Username</label>
                      <input
                        type="text"
                        placeholder="type something..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-3 py-2 md:px-4 md:py-3 border-2 md:border-4 border-black bg-white font-mono text-sm md:text-base focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 md:px-4 md:py-3 border-2 md:border-4 border-black bg-white font-mono text-sm md:text-base focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] md:focus:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)] transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-2">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Write something brutal..."
                        className="w-full px-3 py-2 md:px-4 md:py-3 border-2 md:border-4 border-black bg-white font-mono text-sm md:text-base focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest mb-2">Select Option</label>
                      <select className="w-full px-3 py-2 md:px-4 md:py-3 border-2 md:border-4 border-black bg-white font-mono text-sm md:text-base focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <option>Classic</option>
                        <option>Soft</option>
                        <option>Playful</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-4 border-black bg-[#ff006e] flex items-center justify-center cursor-pointer">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <label className="font-mono text-sm cursor-pointer">Enable brutal mode</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-4 border-black bg-white cursor-pointer" />
                      <label className="font-mono text-sm cursor-pointer">Round corners (forbidden)</label>
                    </div>
                    <button
                      onClick={showNotif}
                      className="w-full py-3 md:py-4 bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,0,110,1)] hover:shadow-[10px_10px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-10">
                  {/* Solid tags */}
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-black/50 mb-5 border-b-2 border-black pb-2">
                      Solid accent tags
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "BRUTAL", bg: "#ff006e", text: "#fff" },
                        { label: "BOLD", bg: "#ccff00", text: "#000" },
                        { label: "RAW", bg: "#00d9ff", text: "#000" },
                        { label: "SHARP", bg: "#ff9500", text: "#000" },
                        { label: "HARD", bg: "#000000", text: "#fff" },
                        { label: "ZERO RADIUS", bg: "#ffffff", text: "#000" },
                        { label: "FUNCTION", bg: "#ff006e", text: "#fff" },
                        { label: "CONTRAST", bg: "#ccff00", text: "#000" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-3 py-1.5 text-xs font-black uppercase tracking-widest border-2 border-black hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 ease-out cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status badges */}
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-black/50 mb-5 border-b-2 border-black pb-2">
                      Status indicators
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "SHIPPED", icon: "check", bg: "#ccff00", text: "#000" },
                        { label: "IN PROGRESS", icon: "bolt", bg: "#00d9ff", text: "#000" },
                        { label: "BLOCKED", icon: "x", bg: "#ff006e", text: "#fff" },
                        { label: "PLANNED", icon: "terminal", bg: "#000", text: "#fff" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest border-2 border-black hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 ease-out cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.icon === "check" && <CheckIcon className="w-3 h-3" />}
                          {b.icon === "bolt" && <BoltIcon className="w-3 h-3" />}
                          {b.icon === "x" && <XIcon className="w-3 h-3" />}
                          {b.icon === "terminal" && <TerminalIcon className="w-3 h-3" />}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Count badges */}
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-black/50 mb-5 border-b-2 border-black pb-2">
                      Count badges
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { label: "Bugs", count: 12, color: "#ff006e", textColor: "#fff" },
                        { label: "PRs", count: 4, color: "#00d9ff", textColor: "#000" },
                        { label: "Issues", count: 28, color: "#ff9500", textColor: "#000" },
                        { label: "Stars", count: 91, color: "#ccff00", textColor: "#000" },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="font-black text-sm uppercase">{b.label}</span>
                          <span
                            className="w-8 h-8 border-2 border-black flex items-center justify-center text-xs font-black hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 ease-out cursor-default"
                            style={{ backgroundColor: b.color, color: b.textColor }}
                          >
                            {b.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. ANIMATION & INTERACTION RULES                                 */}
      {/* ================================================================ */}
      <section id="animation" className="scroll-mt-16 py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-[#ccff00] block mb-4">
              // Animation &amp; Interaction Rules
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-white leading-none">
              FOUR<br />LAWS
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-mono text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Neo-Brutalist interactions are defined by four named rules. Each has an interactive demo
              below. Hover and click to feel the difference.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Rule 1: Physical Crushing */}
            <RevealBlock delay={0.08}>
              <div className="border-4 border-white bg-black p-6 md:p-8 h-full">
                <div className="mb-3">
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-[#ff006e] text-white border-2 border-white">
                    Rule 01 &#8212; Physical Crushing
                  </span>
                </div>
                <p className="font-mono text-xs text-white/60 mb-1 leading-relaxed">
                  active:translate-x-[Npx] active:translate-y-[Npx] active:shadow-none
                </p>
                <p className="font-mono text-xs text-[#ff006e] mb-6 leading-relaxed">
                  N MUST equal the original shadow pixel value. Complete flattening &#8212; entity crushed into the surface.
                </p>
                <div className="flex items-center justify-center py-6 bg-white/5 border-2 border-white/20">
                  <div className="text-center">
                    <button
                      onMouseEnter={() => setCrushHovered(true)}
                      onMouseLeave={() => setCrushHovered(false)}
                      className="px-8 py-4 bg-[#ff006e] text-white font-black uppercase tracking-wider text-base border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-150 ease-out mb-4 block"
                    >
                      CRUSH ME
                    </button>
                    <p className="text-[10px] font-mono text-white/40 uppercase">
                      shadow-8px &#8594; active translate is exactly 8px
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 2: Brutal Snap */}
            <RevealBlock delay={0.12}>
              <div className="border-4 border-white bg-black p-6 md:p-8 h-full">
                <div className="mb-3">
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-[#ccff00] text-black border-2 border-white">
                    Rule 02 &#8212; Brutal Snap
                  </span>
                </div>
                <p className="font-mono text-xs text-white/60 mb-1 leading-relaxed">
                  hover:bg-[#ffff00] duration-150 ease-out
                </p>
                <p className="font-mono text-xs text-[#ccff00] mb-6 leading-relaxed">
                  Instant hard-cut background switch on hover. NO gradients, NO opacity fade. Sharp instantaneous snap.
                </p>
                <div className="flex items-center justify-center py-6 bg-white/5 border-2 border-white/20">
                  <div className="text-center">
                    <button
                      className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider text-base border-4 border-white shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] hover:bg-[#ccff00] hover:shadow-[12px_12px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-150 ease-out mb-4 block"
                      onMouseEnter={() => setSnapHovered(true)}
                      onMouseLeave={() => setSnapHovered(false)}
                    >
                      {snapHovered ? "SNAPPED!" : "HOVER ME"}
                    </button>
                    <p className="text-[10px] font-mono text-white/40 uppercase">
                      Background snaps from white to acid green &#8212; no fade
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 3: Zero Rounding Easing */}
            <RevealBlock delay={0.16}>
              <div className="border-4 border-white bg-black p-6 md:p-8 h-full">
                <div className="mb-3">
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-[#00d9ff] text-black border-2 border-white">
                    Rule 03 &#8212; Zero Rounding Easing
                  </span>
                </div>
                <p className="font-mono text-xs text-white/60 mb-1 leading-relaxed">
                  transition-all duration-150 ease-out
                </p>
                <p className="font-mono text-xs text-[#00d9ff] mb-6 leading-relaxed">
                  All transitions: ease-out, 150ms. Brutal collision feel. No spring overshoot, no elastic settling.
                </p>
                <div className="py-6 bg-white/5 border-2 border-white/20 px-4">
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-white/50 uppercase">Brutal ease-out 150ms</span>
                      <button
                        className="text-[10px] px-3 py-1.5 border-2 border-[#00d9ff] text-[#00d9ff] font-black uppercase hover:bg-[#00d9ff] hover:text-black transition-colors duration-150"
                        onClick={() => setRoundingDemo(roundingDemo === "brutal" ? "soft" : "brutal")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-8 bg-white/10 border-2 border-white/20 overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 left-0 w-8 bg-[#00d9ff] border-r-2 border-white"
                        style={{
                          transform: `translateX(${roundingDemo === "soft" ? "120px" : "0px"})`,
                          transition: "transform 0.8s ease-out",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-white/50 uppercase">Soft spring (forbidden here)</span>
                    </div>
                    <div className="relative h-8 bg-white/10 border-2 border-white/20 overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 left-0 w-8 bg-white/30 border-r-2 border-white/30"
                        style={{
                          transform: `translateX(${roundingDemo === "soft" ? "120px" : "0px"})`,
                          transition: "transform 0.8s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/40 uppercase mt-3 text-center">
                    Click animate &#8212; notice the snap vs the bounce
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 4: Heavy Focus */}
            <RevealBlock delay={0.2}>
              <div className="border-4 border-white bg-black p-6 md:p-8 h-full">
                <div className="mb-3">
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-[#ff9500] text-black border-2 border-white">
                    Rule 04 &#8212; Heavy Focus
                  </span>
                </div>
                <p className="font-mono text-xs text-white/60 mb-1 leading-relaxed">
                  hover:shadow-[12px_12px_0px_0px_rgba(255,0,110,1)] hover:bg-[#ffff00]
                </p>
                <p className="font-mono text-xs text-[#ff9500] mb-6 leading-relaxed">
                  Cards on hover: shadow grows AND switches to colored rgba(255,0,110,1). Background snaps. Physical impact.
                </p>
                <div className="flex items-center justify-center py-6 bg-white/5 border-2 border-white/20">
                  <div className="text-center w-full px-4">
                    <div
                      className="border-4 border-white bg-white text-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[14px_14px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 hover:-translate-x-1 hover:bg-[#ccff00] transition-all duration-150 ease-out p-5 cursor-pointer mb-4 text-left"
                      onMouseEnter={() => setHeavyHovered(true)}
                      onMouseLeave={() => setHeavyHovered(false)}
                    >
                      <div className="font-black text-sm uppercase mb-1">Project Card</div>
                      <div className="font-mono text-xs text-black/60">
                        {heavyHovered ? "Shadow is now pink, BG is acid green" : "Hover &#8212; shadow goes pink + BG snaps"}
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-white/40 uppercase">
                      Shadow color switches from white to #ff006e on hover
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. APP UI DEMO — Task Manager                                    */}
      {/* ================================================================ */}
      <section id="app-demo" className="scroll-mt-16 py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-[#ccff00]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-black block mb-4">
              // App Demo
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-black leading-none">
              BRUTAL<br />TASK APP
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-mono text-base md:text-lg text-black max-w-xl leading-relaxed">
              A mock productivity app rendered in full Neo-Brutalist fidelity.
              Every rule applied in context: thick borders, hard shadows, brutal hover states.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black">
            {/* Sidebar */}
            <RevealBlock delay={0.1} className="md:col-span-1">
              <div className="border-r-4 border-black h-full bg-black text-white">
                {/* Nav header */}
                <div className="border-b-4 border-white p-5 md:p-6">
                  <div className="font-black text-base md:text-lg uppercase tracking-widest text-[#ccff00]">
                    BRUTALWORK
                  </div>
                  <div className="font-mono text-xs text-white/50 mt-1">v1.0.0 &#8212; no softness</div>
                </div>
                {/* Nav items */}
                <nav className="p-0">
                  {[
                    { label: "INBOX", count: 4, active: true, color: "#ff006e" },
                    { label: "TODAY", count: 2, active: false, color: "#ccff00" },
                    { label: "UPCOMING", count: 7, active: false, color: "#00d9ff" },
                    { label: "ARCHIVE", count: 0, active: false, color: "#ff9500" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between px-5 py-4 border-b-2 border-white/20 cursor-pointer transition-colors duration-150 ${item.active ? "bg-white/10" : "hover:bg-white/5"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 border-2"
                          style={{ borderColor: item.color, backgroundColor: item.active ? item.color : "transparent" }}
                        />
                        <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                      </div>
                      {item.count > 0 && (
                        <span
                          className="w-6 h-6 border-2 border-white flex items-center justify-center text-[10px] font-black"
                          style={{ backgroundColor: item.color, color: item.color === "#ccff00" ? "#000" : "#fff" }}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
                {/* User section */}
                <div className="p-5 border-t-4 border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-white bg-[#ff006e] flex items-center justify-center font-black text-xs text-white">
                      JD
                    </div>
                    <div>
                      <div className="font-black text-xs uppercase">Jane Doe</div>
                      <div className="font-mono text-[10px] text-white/40">Pro Plan</div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Main content */}
            <RevealBlock delay={0.15} className="md:col-span-2">
              <div className="bg-white h-full">
                {/* Toolbar */}
                <div className="border-b-4 border-black p-4 md:p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg md:text-xl uppercase">INBOX</h3>
                    <p className="font-mono text-xs text-black/50">{todoItems.filter((t) => !t.done).length} tasks remaining</p>
                  </div>
                  <button
                    onClick={() => {
                      setTodoItems((prev) => [
                        { text: `New task #${prev.length + 1}`, done: false },
                        ...prev,
                      ]);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-[#ff006e] text-white font-black uppercase tracking-wider text-xs border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out"
                  >
                    <PlusIcon className="w-3 h-3 md:w-4 md:h-4" />
                    Add Task
                  </button>
                </div>

                {/* Todo list */}
                <div className="divide-y-4 divide-black">
                  {todoItems.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 px-4 py-4 md:px-6 md:py-5 group cursor-pointer transition-colors duration-150 ${item.done ? "bg-black/5" : "hover:bg-[#ccff00]/30"}`}
                      onClick={() => toggleTodo(i)}
                    >
                      <div
                        className="w-5 h-5 md:w-6 md:h-6 border-4 border-black shrink-0 flex items-center justify-center transition-colors duration-150"
                        style={{ backgroundColor: item.done ? "#ff006e" : "transparent" }}
                      >
                        {item.done && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span
                        className={`font-mono text-sm md:text-base flex-1 transition-all duration-150 ${item.done ? "line-through text-black/30" : "text-black"}`}
                      >
                        {item.text}
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setTodoItems((prev) => prev.filter((_, j) => j !== i));
                        }}
                        className="inline-block cursor-pointer"
                      >
                        <XIcon className="w-4 h-4 text-black/20 group-hover:text-[#ff006e] transition-colors duration-150 shrink-0" />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer stats */}
                <div className="border-t-4 border-black grid grid-cols-3 divide-x-4 divide-black">
                  {[
                    { label: "Total", value: todoItems.length, accent: "#000" },
                    { label: "Done", value: todoItems.filter((t) => t.done).length, accent: "#ccff00" },
                    { label: "Left", value: todoItems.filter((t) => !t.done).length, accent: "#ff006e" },
                  ].map((stat) => (
                    <div key={stat.label} className="px-4 py-4 md:px-6 md:py-5 text-center">
                      <div
                        className="text-2xl md:text-3xl font-black"
                        style={{ color: stat.accent === "#000" ? "black" : stat.accent }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase text-black/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. TYPOGRAPHY SYSTEM                                             */}
      {/* ================================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-[#ff9500] block mb-4">
              // Typography
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-black leading-none">
              TYPE<br />SYSTEM
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-mono text-base md:text-lg text-black max-w-xl leading-relaxed">
              font-black for headings. font-mono for body. No serif. No light weights.
              Tracking is tight for headings, wide for labels.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black mb-8">
            {/* Font specimens */}
            <RevealBlock delay={0.1} className="border-r-4 border-black p-6 md:p-10">
              <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-6 border-b-2 border-black pb-2">
                Heading &#8212; font-black
              </p>
              <div className="space-y-3">
                {[
                  { sizeClass: "text-5xl md:text-6xl", label: "H1 &#8212; 60px", text: "BRUTAL" },
                  { sizeClass: "text-3xl md:text-4xl", label: "H2 &#8212; 36px", text: "DESIGN" },
                  { sizeClass: "text-2xl md:text-3xl", label: "H3 &#8212; 28px", text: "Systems" },
                  { sizeClass: "text-xl md:text-2xl", label: "H4 &#8212; 24px", text: "Components" },
                  { sizeClass: "text-lg", label: "H5 &#8212; 18px", text: "Interactive" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-4">
                    <span className={`font-black uppercase leading-none tracking-tight ${item.sizeClass}`}>
                      {item.text}
                    </span>
                    <span
                      className="font-mono text-[10px] text-black/30 shrink-0"
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Mono specimens */}
            <RevealBlock delay={0.12} className="p-6 md:p-10">
              <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-6 border-b-2 border-black pb-2">
                Body &#8212; font-mono
              </p>
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xl leading-relaxed text-black">
                    Boldly built on raw function. Every pixel serves purpose.
                  </p>
                  <span className="font-mono text-[10px] text-black/30">text-xl / leading-relaxed</span>
                </div>
                <div>
                  <p className="font-mono text-base leading-relaxed text-black">
                    Neo-Brutalism refuses the ornamental. The border IS the structure.
                    The shadow IS the depth. Nothing is decorative.
                  </p>
                  <span className="font-mono text-[10px] text-black/30">text-base / leading-relaxed</span>
                </div>
                <div>
                  <p className="font-mono text-sm leading-relaxed text-black/70">
                    Inspired by Bauhaus functionalism and architectural brutalism.
                    Form follows function absolutely.
                  </p>
                  <span className="font-mono text-[10px] text-black/30">text-sm / muted</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="tracking-[0.3em] text-[10px] font-black">UPPERCASE LABEL</span>
                  <span className="font-mono bg-black text-white px-2 py-0.5 text-xs">Inline code</span>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Counter interactive demo */}
          <RevealBlock delay={0.2}>
            <div className="border-4 border-black p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="font-black text-xl uppercase mb-2">Interactive Counter</h3>
                <p className="font-mono text-sm text-black/60 leading-relaxed">
                  Physical Crushing on the decrement button. Brutal Snap color on increment.
                  Zero easing &#8212; instant feedback.
                </p>
              </div>
              <div className="flex items-center gap-0 border-4 border-black">
                <button
                  onClick={() => setCounterValue((v) => v - 1)}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white text-black font-black text-2xl border-r-4 border-black hover:bg-[#ff006e] hover:text-white active:scale-90 transition-all duration-150 ease-out flex items-center justify-center"
                >
                  &#8722;
                </button>
                <div
                  className="w-16 h-12 md:w-24 md:h-16 flex items-center justify-center font-black text-2xl md:text-3xl transition-colors duration-150"
                  style={{
                    backgroundColor: counterValue > 0 ? "#ccff00" : counterValue < 0 ? "#ff006e" : "#fff",
                    color: counterValue < 0 ? "#fff" : "#000",
                  }}
                >
                  {counterValue}
                </div>
                <button
                  onClick={() => setCounterValue((v) => v + 1)}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white text-black font-black text-2xl border-l-4 border-black hover:bg-[#ccff00] hover:text-black active:scale-90 transition-all duration-150 ease-out flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. DESIGN RULES — DO / DON'T                                     */}
      {/* ================================================================ */}
      <section id="rules" className="scroll-mt-16 py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-[#ff006e] block mb-4">
              // Philosophy
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-black leading-none">
              DESIGN<br />RULES
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-mono text-base md:text-lg text-black max-w-xl leading-relaxed">
              Three core principles from architectural Brutalism applied to the web.
              Honesty of structure. Primacy of function. Refusal of ornament.
            </p>
          </RevealBlock>

          {/* Principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black mb-8">
            {[
              {
                number: "01",
                title: "HONESTY",
                desc: "Do not hide structure. The border shows the boundary. The shadow shows the depth. No faking. Every visual element must communicate something real.",
                accent: "#ff006e",
              },
              {
                number: "02",
                title: "FUNCTION",
                desc: "Every pixel earns its place. If it doesn't communicate information or aid interaction, remove it. No decorative gradients. No cosmetic shadows.",
                accent: "#ccff00",
              },
              {
                number: "03",
                title: "CONTRAST",
                desc: "Maximum legibility through maximum contrast. Black on white. White on black. Neon accents on dark fields. Nothing murky. Nothing ambiguous.",
                accent: "#00d9ff",
              },
            ].map((p, i) => (
              <RevealBlock key={p.number} delay={i * 0.08}>
                <div className="border-r-4 border-black last:border-r-0 p-6 md:p-8 hover:-translate-y-1 hover:shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 ease-out cursor-default bg-white group">
                  <div
                    className="font-black text-5xl md:text-6xl leading-none mb-4 group-hover:tracking-wider transition-all duration-150"
                    style={{ color: p.accent }}
                  >
                    {p.number}
                  </div>
                  <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-4">{p.title}</h3>
                  <p className="font-mono text-sm text-black/70 leading-relaxed">{p.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
            <RevealBlock delay={0.1} className="border-r-4 border-black p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
                <div className="w-8 h-8 bg-[#ccff00] border-4 border-black flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-black" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-widest text-black">DO</h3>
              </div>
              <ul className="space-y-3">
                {doItems.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 font-mono text-sm text-black leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 bg-[#ccff00] border-2 border-black shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>

            <RevealBlock delay={0.15} className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
                <div className="w-8 h-8 bg-[#ff006e] border-4 border-black flex items-center justify-center">
                  <XIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-lg uppercase tracking-widest text-black">DON&apos;T</h3>
              </div>
              <ul className="space-y-3">
                {dontItems.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 font-mono text-sm text-black leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 bg-[#ff006e] border-2 border-black shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FEATURES GRID                                                 */}
      {/* ================================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-[#ff006e]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-2">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-white block mb-4">
              // Why Neo-Brutalism
            </span>
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight text-white leading-none">
              BUILT<br />DIFFERENT
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-mono text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Six reasons why the most memorable digital products embrace raw, unapologetic design.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border-4 border-black border-b-0">
            {[
              {
                icon: <BoltIcon className="w-6 h-6 md:w-8 md:h-8" />,
                title: "INSTANTLY RECOGNIZABLE",
                desc: "Neo-Brutalism is unmistakable. Users remember it because it refuses to blend in.",
                accent: "#ccff00",
              },
              {
                icon: <GridIcon className="w-6 h-6 md:w-8 md:h-8" />,
                title: "STRUCTURE EXPOSED",
                desc: "Grid lines, borders, and shadows reveal the underlying system. Nothing is hidden.",
                accent: "#00d9ff",
              },
              {
                icon: <TerminalIcon className="w-6 h-6 md:w-8 md:h-8" />,
                title: "DEVELOPER NATIVE",
                desc: "No blur, no gradients, no filters. Pure CSS properties. Brutal to build, fast to ship.",
                accent: "#ff9500",
              },
              {
                icon: <StarIcon className="w-6 h-6 md:w-8 md:h-8" />,
                title: "HIGH CONTRAST",
                desc: "Maximum accessibility through maximum contrast. WCAG AAA by default.",
                accent: "#ccff00",
              },
              {
                icon: <ArrowRightIcon className="w-6 h-6 md:w-8 md:h-8" />,
                title: "HONEST AFFORDANCE",
                desc: "Buttons look like buttons. Cards look like cards. No skeuomorphic confusion.",
                accent: "#00d9ff",
              },
              {
                icon: <CheckIcon className="w-6 h-6 md:w-8 md:h-8" />,
                title: "ZERO DECORATION",
                desc: "No element exists for aesthetics alone. Every visual choice is functional.",
                accent: "#ff9500",
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div className="border-b-4 border-r-4 border-black p-6 md:p-8 bg-white group hover:bg-black transition-colors duration-150 ease-out cursor-default">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 border-4 border-black flex items-center justify-center mb-5"
                    style={{ backgroundColor: feature.accent, color: "#000" }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="font-black text-sm md:text-base uppercase tracking-tight mb-3 group-hover:text-white transition-colors duration-150">
                    {feature.title}
                  </h4>
                  <p className="font-mono text-xs md:text-sm text-black/70 leading-relaxed group-hover:text-white/60 transition-colors duration-150">
                    {feature.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="bg-black text-white border-t-0">
        {/* Top color stripe */}
        <div className="flex h-3">
          {["#ff006e", "#ccff00", "#00d9ff", "#ff9500"].map((color) => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>

        {/* Notification toast */}
        {notifVisible && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-4 font-black uppercase tracking-wider text-sm brutal-stamp-anim flex items-center gap-3">
            <CheckIcon className="w-5 h-5 text-black" />
            FORM SUBMITTED
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-10 md:pb-14">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12 border-b-4 border-white/20 pb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-sm">
              <div className="flex items-center gap-0 border-2 border-white">
                <div className="bg-white text-black font-black text-base px-3 py-2 uppercase tracking-widest">NEO</div>
                <div className="bg-[#ff006e] text-white font-black text-base px-3 py-2 uppercase tracking-widest">BRUTAL</div>
              </div>
              <p className="font-mono text-sm text-white/60 leading-relaxed">
                Raw, unapologetic design. Black borders, hard shadows,
                zero radius. Inspired by architectural brutalism.
              </p>
              <div className="flex gap-2">
                {["#ff006e", "#ccff00", "#00d9ff", "#ff9500"].map((color) => (
                  <div
                    key={color}
                    className="w-5 h-5 border-2 border-white hover:-translate-y-0.5 hover:scale-110 transition-transform duration-150 cursor-default"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/40">Style</span>
                <Link href="/styles/neo-brutalist" className="font-mono text-white/70 hover:text-[#ff006e] transition-colors duration-150">
                  Documentation
                </Link>
                <Link href="/styles/neo-brutalist/showcase" className="font-mono text-white/70 hover:text-[#ff006e] transition-colors duration-150">
                  Showcase
                </Link>
                <Link href="/styles/neo-brutalist/cover" className="font-mono text-white/70 hover:text-[#ff006e] transition-colors duration-150">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/40">StyleKit</span>
                <Link href="/" className="font-mono text-white/70 hover:text-[#ccff00] transition-colors duration-150">
                  Home
                </Link>
                <Link href="/styles" className="font-mono text-white/70 hover:text-[#ccff00] transition-colors duration-150">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-white/40">Palette</span>
                {accentColors.slice(0, 4).map((s) => (
                  <span key={s.name} className="flex items-center gap-2 font-mono text-xs text-white/50">
                    <span className="w-3 h-3 border border-white/30 inline-block" style={{ backgroundColor: s.hex }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-sm text-white/40">
              <TerminalIcon className="w-4 h-4" />
              <span>Built with zero softness for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-3 bg-white text-black font-black uppercase tracking-wider text-xs border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out"
            >
              <ArrowRightIcon className="w-4 h-4 rotate-180" />
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
