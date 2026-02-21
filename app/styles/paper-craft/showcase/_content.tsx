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
/*  Paper-craft SVG accents                                            */
/* ------------------------------------------------------------------ */

function ScissorsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.64 7.64a2.5 2.5 0 1 0-3.54 3.54 2.5 2.5 0 0 0 3.54-3.54zm-1.77 2.12a.5.5 0 1 1-.71-.71.5.5 0 0 1 .71.71zM9.64 16.36a2.5 2.5 0 1 0-3.54-3.54 2.5 2.5 0 0 0 3.54 3.54zm-1.77-2.12a.5.5 0 1 1-.71.71.5.5 0 0 1 .71-.71zM7 12l10-4.5M7 12l10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function FoldIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M4 4l8 8M12 12l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 20l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PaperIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                 */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Craft Red", hex: "#e85d75", label: "Primary", textColor: "white" },
  { name: "Paper White", hex: "#fdf6ee", label: "Background", textColor: "#2d2d2d", bordered: true },
  { name: "Paper Teal", hex: "#5cb8a5", label: "Accent 1", textColor: "white" },
  { name: "Paper Yellow", hex: "#f5c040", label: "Accent 2", textColor: "#2d2d2d" },
  { name: "Paper Blue", hex: "#6b7fb5", label: "Accent 3", textColor: "white" },
  { name: "Deep Ink", hex: "#2d2d2d", label: "Text", textColor: "white" },
];

/* ------------------------------------------------------------------ */
/*  Component tab type                                                 */
/* ------------------------------------------------------------------ */

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1: Layer Separation — hover triggers layers to spread apart
  const [layerHovered, setLayerHovered] = useState(false);

  // aiRule 2: Crisp Cutouts — input focus deepens inset shadow
  const [cutoutFocused, setCutoutFocused] = useState(false);
  const [cutoutValue, setCutoutValue] = useState("");

  // aiRule 3: Stiff Paper Feel — compare ease-out vs spring
  const [stiffDemo, setStiffDemo] = useState<"ease-out" | "spring" | null>(null);

  // aiRule 4: Offset Lift — shadow grows proportionally with position
  const [liftPressed, setLiftPressed] = useState(false);
  const [liftLevel, setLiftLevel] = useState(0);

  // Checked items for app demo
  const [checkedItems, setCheckedItems] = useState<boolean[]>([true, false, true, false]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleItem(i: number) {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#fdf6ee] font-sans text-[#2d2d2d] overflow-x-hidden">
      <style>{`
        @keyframes paper-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(1deg); }
          66% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        @keyframes paper-drift {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes paper-wobble {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes paper-cut-in {
          0% { opacity: 0; transform: scaleY(0) translateY(-8px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes paper-shadow-pulse {
          0%, 100% { box-shadow: 4px 4px 0px rgba(0,0,0,0.08); }
          50% { box-shadow: 6px 6px 0px rgba(0,0,0,0.13); }
        }
        .paper-float-anim { animation: paper-float 5s ease-in-out infinite; }
        .paper-drift-anim { animation: paper-drift 7s ease-in-out infinite; }
        .paper-wobble-anim { animation: paper-wobble 3s ease-in-out infinite; }
        .paper-lift {
          transition: all 0.2s ease-out;
        }
        .paper-lift:hover {
          transform: translateY(-4px) translateX(-2px);
          box-shadow: 6px 6px 0px rgba(0,0,0,0.12);
        }
        .paper-lift:active {
          transform: translateY(1px) translateX(1px);
          box-shadow: 1px 1px 0px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf6ee]/95 backdrop-blur-sm border-b-2 border-[#e0d8cc] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo — paper tab style */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-[#e0d8cc] shadow-[3px_3px_0px_rgba(0,0,0,0.06)] -rotate-[0.5deg]">
            <PaperIcon className="w-4 h-4 text-[#e85d75]" />
            <span className="text-sm font-bold text-[#2d2d2d] tracking-tight">
              Paper<span className="text-[#e85d75]">Craft</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Layers", "Rules", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm text-[#666666] hover:text-[#e85d75] hover:bg-white hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-200 ease-out"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back to StyleKit */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#e85d75] text-white text-sm font-bold shadow-[3px_3px_0px_rgba(45,45,45,0.15)] hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(45,45,45,0.15)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.2)] transition-all duration-200 ease-out -rotate-[0.5deg] hover:rotate-0"
          >
            <span>←</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Floating paper sheet decorations */}
        <div
          className="absolute top-16 right-[-20px] w-32 h-40 bg-[#f5c040] rounded-xl opacity-30 hidden md:block paper-drift-anim"
          style={{ rotate: "8deg", boxShadow: "4px 4px 0px rgba(0,0,0,0.06)" }}
        />
        <div
          className="absolute top-32 right-16 w-24 h-32 bg-[#5cb8a5] rounded-xl opacity-25 hidden md:block"
          style={{ rotate: "-5deg", animation: "paper-drift 9s ease-in-out infinite 1.5s", boxShadow: "4px 4px 0px rgba(0,0,0,0.06)" }}
        />
        <div
          className="absolute bottom-16 left-[-10px] w-28 h-36 bg-[#6b7fb5] rounded-xl opacity-20 hidden md:block paper-float-anim"
          style={{ rotate: "-10deg", boxShadow: "4px 4px 0px rgba(0,0,0,0.06)" }}
        />
        <div
          className="absolute top-48 left-12 w-16 h-20 bg-[#e85d75] rounded-lg opacity-15 hidden md:block"
          style={{ rotate: "4deg", animation: "paper-drift 6s ease-in-out infinite 3s", boxShadow: "3px 3px 0px rgba(0,0,0,0.06)" }}
        />

        <div className="max-w-6xl mx-auto text-center relative">
          {/* Eyebrow badge — paper cutout style */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) rotate(-1deg)" : "translateY(14px) rotate(-1deg)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
            className="inline-block mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#e85d75] text-white text-xs font-bold tracking-[0.18em] uppercase shadow-[4px_4px_0px_rgba(45,45,45,0.15)]">
              <ScissorsIcon className="w-3.5 h-3.5" />
              纸艺手作 — Paper Craft
              <ScissorsIcon className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[86px] font-bold leading-[1.05] tracking-tight mb-6 text-[#2d2d2d]"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Cut. Stack.
            <br />
            <span style={{ color: "#e85d75" }}>Create.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#666666] text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 font-normal"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Layered paper textures, offset shadows, and handmade edges. A UI that feels like it
            was crafted with scissors, glue, and coloured card stock.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#e85d75] text-white font-bold shadow-[4px_4px_0px_rgba(45,45,45,0.15)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(45,45,45,0.15)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.2)] transition-all duration-200 ease-out -rotate-1 hover:rotate-0">
              <ScissorsIcon className="w-4 h-4" />
              Start Crafting
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold shadow-[3px_3px_0px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out">
              <LayersIcon className="w-4 h-4" />
              View Layers
            </button>
          </div>

          {/* Stats — paper snippet cards */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "4", label: "Layer Depths", color: "#e85d75", rotate: "-1deg" },
              { value: "6", label: "Craft Colors", color: "#5cb8a5", rotate: "0.5deg" },
              { value: "12+", label: "Components", color: "#f5c040", rotate: "-0.5deg" },
              { value: "100%", label: "Hand-crafted", color: "#6b7fb5", rotate: "1deg" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group bg-white rounded-xl p-5 text-center border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] cursor-default transition-all duration-200 ease-out"
                style={{ rotate: stat.rotate }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[#888] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5cb8a5] block mb-3">
              Color System
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-tight">
              Craft <span style={{ color: "#e85d75" }}>paper palette</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-[#666666] text-lg max-w-lg leading-relaxed">
              Six colours inspired by coloured card stock — warm paper-white base, bold craft red,
              and three bright but never-fluorescent accent papers.
            </p>
          </RevealBlock>

          {/* Swatches — paper snippet style with hover lift */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center mb-16">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i
                        ? "translateY(-8px) translateX(-2px) rotate(0deg)"
                        : "translateY(0) rotate(-1deg)",
                      transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                      boxShadow: hoveredSwatch === i
                        ? `6px 6px 0px rgba(0,0,0,0.12)`
                        : `4px 4px 0px rgba(0,0,0,0.08)`,
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      className="w-24 h-28 md:w-28 md:h-32 rounded-xl flex items-end justify-center pb-3"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.bordered ? "2px solid #e0d8cc" : "none",
                      }}
                    >
                      <span
                        className="text-[10px] font-bold font-mono opacity-70"
                        style={{ color: swatch.textColor }}
                      >
                        {swatch.hex}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#2d2d2d]">{swatch.name}</div>
                    <span
                      className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white"
                      style={{ backgroundColor: swatch.hex === "#fdf6ee" || swatch.hex === "#f5c040" ? "#888" : swatch.hex }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color combinations */}
          <RevealBlock delay={0.18}>
            <div className="bg-white rounded-2xl p-8 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.07)]">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-6">
                Paper colour combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#e85d75", to: "#f5c040", label: "Red → Yellow" },
                  { from: "#5cb8a5", to: "#6b7fb5", label: "Teal → Blue" },
                  { from: "#f5c040", to: "#5cb8a5", label: "Yellow → Teal" },
                  { from: "#6b7fb5", to: "#e85d75", label: "Blue → Red" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-14 rounded-xl mb-2 shadow-[3px_3px_0px_rgba(0,0,0,0.06)] group-hover:-translate-y-1 group-hover:-translate-x-0.5 group-hover:shadow-[5px_5px_0px_rgba(0,0,0,0.09)] transition-all duration-200 ease-out"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                      }}
                    />
                    <div className="text-xs text-[#888] text-center font-medium">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b7fb5] block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-tight">
              Paper <span style={{ color: "#5cb8a5" }}>building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-[#666666] text-lg max-w-lg leading-relaxed">
              Each component looks like it was cut from coloured paper — offset shadows that cast
              downward, slight rotations, and lift on hover.
            </p>
          </RevealBlock>

          {/* Tabs — paper tab style */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab, idx) => {
                const tabColors = ["#e85d75", "#5cb8a5", "#f5c040", "#6b7fb5"];
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200 ease-out"
                    style={
                      isActive
                        ? {
                            backgroundColor: tabColors[idx],
                            color: "white",
                            boxShadow: "3px 3px 0px rgba(45,45,45,0.12)",
                            transform: "translateY(-1px) translateX(-0.5px)",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#666",
                            border: "2px solid #e0d8cc",
                            boxShadow: "2px 2px 0px rgba(0,0,0,0.05)",
                          }
                    }
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          {/* Component demo panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#e0d8cc] shadow-[5px_5px_0px_rgba(0,0,0,0.07)]">

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-5">
                      Primary — paper snippet with offset shadow
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-8 py-3 bg-[#e85d75] text-white font-bold rounded-xl shadow-[4px_4px_0px_rgba(45,45,45,0.15)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(45,45,45,0.15)] active:translate-y-1 active:translate-x-1 active:shadow-[1px_1px_0px_rgba(45,45,45,0.2)] transition-all duration-200 ease-out -rotate-1 hover:rotate-0">
                        Create
                      </button>
                      <button className="px-8 py-3 bg-[#5cb8a5] text-white font-bold rounded-xl shadow-[4px_4px_0px_rgba(45,45,45,0.15)] hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(45,45,45,0.14)] active:translate-y-1 active:shadow-[1px_1px_0px_rgba(45,45,45,0.2)] transition-all duration-200 ease-out rotate-[0.5deg] hover:rotate-0">
                        Explore
                      </button>
                      <button className="px-8 py-3 bg-[#f5c040] text-[#2d2d2d] font-bold rounded-xl shadow-[4px_4px_0px_rgba(45,45,45,0.12)] hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(45,45,45,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.15)] transition-all duration-200 ease-out rotate-1 hover:rotate-0">
                        Collect
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-5">
                      Outline — cutout on paper
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-8 py-3 bg-white border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out">
                        Learn More
                      </button>
                      <button className="px-8 py-3 bg-white border-2 border-[#e85d75] text-[#e85d75] font-bold rounded-xl shadow-[3px_3px_0px_rgba(232,93,117,0.2)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(232,93,117,0.25)] active:translate-y-0.5 active:shadow-none transition-all duration-200 ease-out">
                        See More
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-5">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", px: "px-4 py-2 text-xs" },
                        { size: "md", px: "px-6 py-3 text-sm" },
                        { size: "lg", px: "px-9 py-4 text-base" },
                      ].map(({ size, px }) => (
                        <button
                          key={size}
                          className={`rounded-xl bg-[#e85d75] text-white font-bold shadow-[3px_3px_0px_rgba(45,45,45,0.12)] hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(45,45,45,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.15)] transition-all duration-200 ease-out ${px}`}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Stacked paper card */}
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-4">
                      Layered paper stack
                    </p>
                    <div className="group relative w-full max-w-sm mx-auto">
                      <div className="absolute inset-0 bg-[#f5c040] rounded-2xl rotate-[2deg] shadow-[3px_3px_0px_rgba(0,0,0,0.08)] group-hover:rotate-[6deg] group-hover:translate-x-2 group-hover:translate-y-1 transition-all duration-300 ease-out" />
                      <div className="absolute inset-0 bg-[#5cb8a5] rounded-2xl -rotate-[1deg] shadow-[3px_3px_0px_rgba(0,0,0,0.08)] group-hover:-rotate-[4deg] group-hover:-translate-x-2 group-hover:translate-y-2 transition-all duration-300 ease-out delay-75" />
                      <div className="relative bg-white rounded-2xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out">
                        <div className="inline-block px-3 py-1 bg-[#e85d75] text-white text-xs font-bold rounded-lg mb-3 -rotate-1 group-hover:rotate-0 transition-transform duration-200">
                          Craft
                        </div>
                        <h3 className="text-[#2d2d2d] text-xl font-bold mb-2">Paper Origami</h3>
                        <p className="text-[#666666] leading-relaxed text-sm">
                          Fold, cut, and create layered paper sculptures with tactile handmade depth.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Simple paper cards */}
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-4">
                      Single paper cards
                    </p>
                    <div className="space-y-3">
                      {[
                        { title: "Papercut Art", color: "#e85d75", rotate: "-1deg" },
                        { title: "Origami Studio", color: "#5cb8a5", rotate: "0.5deg" },
                        { title: "Collage Lab", color: "#6b7fb5", rotate: "-0.5deg" },
                      ].map((c) => (
                        <div
                          key={c.title}
                          className="group flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-[#e0d8cc] shadow-[3px_3px_0px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.09)] cursor-pointer transition-all duration-200 ease-out"
                          style={{ rotate: c.rotate }}
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: c.color }}
                          >
                            <PaperIcon className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-[#2d2d2d]">{c.title}</span>
                          <span className="ml-auto text-[#888] text-sm">→</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[#2d2d2d] text-sm font-bold mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="Write here..."
                        className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#e85d75] focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),0_0_0_3px_rgba(232,93,117,0.15)] transition-all duration-200 ease-out"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2d2d2d] text-sm font-bold mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="hello@papercraft.art"
                        className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#5cb8a5] focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),0_0_0_3px_rgba(92,184,165,0.15)] transition-all duration-200 ease-out"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2d2d2d] text-sm font-bold mb-2">Project Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your craft project..."
                        className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#6b7fb5] focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),0_0_0_3px_rgba(107,127,181,0.15)] transition-all duration-200 ease-out resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[#2d2d2d] text-sm font-bold mb-2">Craft Style</label>
                      <select className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#f5c040] transition-all duration-200 ease-out">
                        <option>Origami</option>
                        <option>Papercut</option>
                        <option>Collage</option>
                        <option>Kirigami</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border-2 border-[#e0d8cc] bg-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.06)] cursor-pointer hover:border-[#e85d75] transition-colors duration-200" />
                      <label className="text-sm text-[#666] cursor-pointer">Weekly craft newsletter</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border-2 border-[#e85d75] bg-[#e85d75] flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm text-[#666] cursor-pointer">Tutorial reminders</label>
                    </div>
                    <button className="w-full py-3.5 rounded-xl bg-[#e85d75] text-white font-bold shadow-[4px_4px_0px_rgba(45,45,45,0.12)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(45,45,45,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.15)] transition-all duration-200 ease-out">
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* BADGES TAB */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-5">
                      Paper label badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Origami", bg: "#e85d75", text: "white" },
                        { label: "Kirigami", bg: "#5cb8a5", text: "white" },
                        { label: "Collage", bg: "#f5c040", text: "#2d2d2d" },
                        { label: "Quilling", bg: "#6b7fb5", text: "white" },
                        { label: "Papercutting", bg: "#e85d75", text: "white" },
                        { label: "Scrapbook", bg: "#5cb8a5", text: "white" },
                        { label: "Folding", bg: "#f5c040", text: "#2d2d2d" },
                        { label: "Weaving", bg: "#6b7fb5", text: "white" },
                      ].map((b, i) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded-lg text-sm font-bold shadow-[2px_2px_0px_rgba(45,45,45,0.1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0px_rgba(45,45,45,0.12)] cursor-default transition-all duration-200 ease-out"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            rotate: i % 2 === 0 ? "-0.5deg" : "0.5deg",
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-5">
                      Status cutouts
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "In Progress", bg: "#fff3b0", text: "#a07000", border: "#f5c040" },
                        { label: "Complete", bg: "#d4f5ee", text: "#1a7a6a", border: "#5cb8a5" },
                        { label: "Pinned", bg: "#fde8ec", text: "#a03050", border: "#e85d75" },
                        { label: "Draft", bg: "#e8ecf5", text: "#3a4a7a", border: "#6b7fb5" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 shadow-[2px_2px_0px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(0,0,0,0.09)] cursor-default transition-all duration-200 ease-out"
                          style={{ backgroundColor: b.bg, color: b.text, borderColor: b.border }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: b.border }}
                          />
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#888] mb-5">
                      Paper tag count badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "Projects", count: 12, color: "#e85d75" },
                        { label: "Materials", count: 8, color: "#5cb8a5" },
                        { label: "Tutorials", count: 24, color: "#f5c040", textColor: "#2d2d2d" },
                        { label: "Saved", count: 5, color: "#6b7fb5" },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm text-[#666] font-bold">{b.label}</span>
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shadow-[2px_2px_0px_rgba(45,45,45,0.12)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(45,45,45,0.14)] cursor-default transition-all duration-200 ease-out"
                            style={{ backgroundColor: b.color, color: b.textColor || "white" }}
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
      {/* 5. AI RULES — 4 INTERACTIVE DEMOS                               */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#e85d75] block mb-3">
              AI Rules — Interactive Demos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-tight">
              Four <span style={{ color: "#5cb8a5" }}>paper physics rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-[#666666] text-lg max-w-lg leading-relaxed">
              Each rule defines how paper behaves physically. Hover, click, and focus to feel each
              one in action — these are the laws of Paper Craft UI.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* aiRule 1: Layer Separation */}
            <RevealBlock delay={0.08}>
              <div className="bg-[#fdf6ee] rounded-2xl p-8 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-[#e85d75] text-white text-xs font-bold shadow-[2px_2px_0px_rgba(45,45,45,0.1)]">
                    Rule 1
                  </span>
                  <span className="text-sm font-bold text-[#2d2d2d]">Layer Separation</span>
                </div>
                <p className="text-xs text-[#888] mb-2 font-mono leading-relaxed">
                  hover: layers fan out in different directions
                </p>
                <p className="text-sm text-[#666] mb-6 leading-relaxed">
                  When you hover a stacked card, the paper layers peel apart — each one shifts in
                  a unique direction, enlarging the layer-gap shadow to mimic real paper separating.
                </p>

                {/* Interactive demo */}
                <div className="flex items-center justify-center py-6">
                  <div
                    className="relative w-44 h-32 cursor-pointer"
                    onMouseEnter={() => setLayerHovered(true)}
                    onMouseLeave={() => setLayerHovered(false)}
                  >
                    {/* Bottom layer - yellow */}
                    <div
                      className="absolute inset-0 bg-[#f5c040] rounded-xl"
                      style={{
                        transform: layerHovered
                          ? "rotate(8deg) translate(10px, 6px)"
                          : "rotate(3deg) translate(0, 0)",
                        boxShadow: layerHovered
                          ? "5px 5px 0px rgba(0,0,0,0.1)"
                          : "3px 3px 0px rgba(0,0,0,0.07)",
                        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                      }}
                    />
                    {/* Middle layer - teal */}
                    <div
                      className="absolute inset-0 bg-[#5cb8a5] rounded-xl"
                      style={{
                        transform: layerHovered
                          ? "rotate(-5deg) translate(-8px, 8px)"
                          : "rotate(-1.5deg) translate(0, 0)",
                        boxShadow: layerHovered
                          ? "5px 5px 0px rgba(0,0,0,0.09)"
                          : "3px 3px 0px rgba(0,0,0,0.07)",
                        transition: "transform 0.3s ease-out 0.05s, box-shadow 0.3s ease-out",
                      }}
                    />
                    {/* Top layer - white */}
                    <div
                      className="relative bg-white rounded-xl flex flex-col items-center justify-center h-full"
                      style={{
                        transform: layerHovered ? "translateY(-8px)" : "translateY(0)",
                        boxShadow: layerHovered
                          ? "8px 8px 0px rgba(0,0,0,0.12)"
                          : "4px 4px 0px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                      }}
                    >
                      <LayersIcon className="w-7 h-7 text-[#e85d75] mb-1" />
                      <span className="text-xs font-bold text-[#2d2d2d]">
                        {layerHovered ? "Separating!" : "Hover me"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-[#888] mt-2">
                  {layerHovered
                    ? "Layers fanning out — feel the paper peel"
                    : "Hover the stack to trigger layer separation"}
                </p>
              </div>
            </RevealBlock>

            {/* aiRule 2: Crisp Cutouts */}
            <RevealBlock delay={0.12}>
              <div className="bg-[#fdf6ee] rounded-2xl p-8 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-[#5cb8a5] text-white text-xs font-bold shadow-[2px_2px_0px_rgba(45,45,45,0.1)]">
                    Rule 2
                  </span>
                  <span className="text-sm font-bold text-[#2d2d2d]">Crisp Cutouts</span>
                </div>
                <p className="text-xs text-[#888] mb-2 font-mono leading-relaxed">
                  focus: inset-shadow deepens — feels like a cutout in cardboard
                </p>
                <p className="text-sm text-[#666] mb-6 leading-relaxed">
                  Input fields use inset shadows that deepen on focus, mimicking a slot cut through
                  thick paper board. The pressed-in feel confirms an active selection.
                </p>

                {/* Interactive demo */}
                <div className="space-y-4 py-2">
                  <div>
                    <label className="block text-xs font-bold text-[#2d2d2d] mb-2 uppercase tracking-wide">
                      Click to feel the cut depth
                    </label>
                    <input
                      type="text"
                      value={cutoutValue}
                      onChange={(e) => setCutoutValue(e.target.value)}
                      onFocus={() => setCutoutFocused(true)}
                      onBlur={() => setCutoutFocused(false)}
                      placeholder={cutoutFocused ? "Depth cut activated..." : "Click to focus..."}
                      className="w-full px-4 py-3 bg-white rounded-xl text-[#2d2d2d] placeholder-[#b0a898] outline-none transition-all duration-200 ease-out"
                      style={{
                        border: cutoutFocused ? "2px solid #5cb8a5" : "2px solid #e0d8cc",
                        boxShadow: cutoutFocused
                          ? "inset 4px 4px 10px rgba(0,0,0,0.1), 0 0 0 3px rgba(92,184,165,0.2)"
                          : "inset 2px 2px 4px rgba(0,0,0,0.04)",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#888]">
                    <div
                      className="px-3 py-1.5 rounded-lg font-mono flex-1 text-center transition-all duration-200"
                      style={{
                        backgroundColor: cutoutFocused ? "#d4f5ee" : "#f0ede8",
                        color: cutoutFocused ? "#1a7a6a" : "#888",
                        border: cutoutFocused ? "1px solid #5cb8a5" : "1px solid #e0d8cc",
                      }}
                    >
                      {cutoutFocused ? "inset: 4px 4px 10px" : "inset: 2px 2px 4px"}
                    </div>
                    <span className="shrink-0">
                      {cutoutFocused ? "Deep cut!" : "Shallow"}
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 3: Stiff Paper Feel */}
            <RevealBlock delay={0.16}>
              <div className="bg-[#fdf6ee] rounded-2xl p-8 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-[#f5c040] text-[#2d2d2d] text-xs font-bold shadow-[2px_2px_0px_rgba(45,45,45,0.1)]">
                    Rule 3
                  </span>
                  <span className="text-sm font-bold text-[#2d2d2d]">Stiff Paper Feel</span>
                </div>
                <p className="text-xs text-[#888] mb-2 font-mono leading-relaxed">
                  duration-200/300 + ease-out — no spring, no rubber bounce
                </p>
                <p className="text-sm text-[#666] mb-6 leading-relaxed">
                  Paper is stiff, not rubbery. Transitions use ease-out with no overshoot. Compare
                  the paper-stiff ease-out against a spring — only the correct one feels like paper.
                </p>

                {/* Interactive demo */}
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#e85d75]">Paper (ease-out)</span>
                      <button
                        className="text-xs px-3 py-1 rounded-lg bg-[#e85d75] text-white font-bold hover:opacity-90 transition-opacity"
                        onClick={() => setStiffDemo(stiffDemo === "ease-out" ? null : "ease-out")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-10 bg-[#fdf6ee] border-2 border-[#e0d8cc] rounded-xl overflow-hidden">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-7 h-7 rounded-lg bg-[#e85d75] shadow-[2px_2px_0px_rgba(45,45,45,0.12)]"
                        style={{
                          transform: `translateY(-50%) translateX(${stiffDemo === "ease-out" ? "130px" : "0"})`,
                          transition: stiffDemo === "ease-out" ? "transform 0.35s ease-out" : "none",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#888]">Wrong (spring bounce)</span>
                      <button
                        className="text-xs px-3 py-1 rounded-lg bg-[#888] text-white font-bold hover:opacity-90 transition-opacity"
                        onClick={() => setStiffDemo(stiffDemo === "spring" ? null : "spring")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-10 bg-[#f0ede8] border-2 border-[#e0d8cc] rounded-xl overflow-hidden">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-7 h-7 rounded-full bg-[#888]"
                        style={{
                          transform: `translateY(-50%) translateX(${stiffDemo === "spring" ? "130px" : "0"})`,
                          transition: stiffDemo === "spring"
                            ? "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)"
                            : "none",
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#888] mt-2">
                      Notice the overshoot on spring — paper does not bounce like rubber.
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 4: Offset Lift */}
            <RevealBlock delay={0.2}>
              <div className="bg-[#fdf6ee] rounded-2xl p-8 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-[#6b7fb5] text-white text-xs font-bold shadow-[2px_2px_0px_rgba(45,45,45,0.1)]">
                    Rule 4
                  </span>
                  <span className="text-sm font-bold text-[#2d2d2d]">Offset Lift</span>
                </div>
                <p className="text-xs text-[#888] mb-2 font-mono leading-relaxed">
                  translate + shadow grow proportionally — paper lifting off table
                </p>
                <p className="text-sm text-[#666] mb-6 leading-relaxed">
                  As a paper element lifts, its offset shadow grows in the same direction and
                  proportion. The shadow offset equals the translate distance — physical consistency.
                </p>

                {/* Interactive demo — slider */}
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#2d2d2d]">Lift amount: {liftLevel}px</span>
                    <span className="text-xs text-[#888] font-mono">
                      shadow: {liftLevel + 2}px {liftLevel + 2}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    value={liftLevel}
                    onChange={(e) => setLiftLevel(Number(e.target.value))}
                    className="w-full accent-[#6b7fb5] cursor-pointer"
                  />
                  <div className="flex items-center justify-center py-4">
                    <div
                      className="w-36 h-20 bg-white rounded-xl flex items-center justify-center font-bold text-[#6b7fb5] border-2 border-[#e0d8cc] transition-none"
                      style={{
                        transform: `translateY(-${liftLevel}px) translateX(-${liftLevel * 0.5}px)`,
                        boxShadow: `${liftLevel + 2}px ${liftLevel + 2}px 0px rgba(0,0,0,${0.06 + liftLevel * 0.007})`,
                        transition: "transform 0s, box-shadow 0s",
                      }}
                    >
                      <span className="text-sm">Paper sheet</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 6, 12].map((v) => (
                      <button
                        key={v}
                        onClick={() => setLiftLevel(v)}
                        className="py-2 rounded-lg text-xs font-bold border-2 transition-all duration-200 ease-out"
                        style={{
                          backgroundColor: liftLevel === v ? "#6b7fb5" : "white",
                          color: liftLevel === v ? "white" : "#666",
                          borderColor: liftLevel === v ? "#6b7fb5" : "#e0d8cc",
                          boxShadow: liftLevel === v ? "2px 2px 0px rgba(45,45,45,0.1)" : "1px 1px 0px rgba(0,0,0,0.05)",
                        }}
                      >
                        {v === 0 ? "Flat" : v === 6 ? "Hover" : "Flying"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. PAPER CRAFT APP DEMO — Craft Studio                          */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f5c040] block mb-3">
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-tight">
              Craft <span style={{ color: "#e85d75" }}>studio dashboard</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-[#666666] text-lg max-w-lg leading-relaxed">
              A mock dashboard for a craft studio — paper-layered project cards, a to-do list with
              paper-toggle checkboxes, and material inventory in paper snippet style.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main project list */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div className="bg-white rounded-2xl p-8 border-2 border-[#e0d8cc] shadow-[5px_5px_0px_rgba(0,0,0,0.07)] h-full">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h3 className="text-xl font-bold text-[#2d2d2d]">Active Projects</h3>
                    <p className="text-sm text-[#888] mt-0.5">Friday, Feb 21</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e85d75] text-white text-sm font-bold shadow-[3px_3px_0px_rgba(45,45,45,0.12)] hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(45,45,45,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.15)] transition-all duration-200 ease-out">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                    New project
                  </button>
                </div>

                {/* Project cards — stacked paper effect */}
                <div className="space-y-5">
                  {[
                    {
                      title: "Cherry Blossom Papercut",
                      tag: "Kirigami",
                      tagColor: "#e85d75",
                      progress: 72,
                      barColor: "#e85d75",
                      rotate: "-0.5deg",
                      backColor: "#f5c040",
                    },
                    {
                      title: "Ocean Wave Origami Series",
                      tag: "Origami",
                      tagColor: "#5cb8a5",
                      progress: 45,
                      barColor: "#5cb8a5",
                      rotate: "0.3deg",
                      backColor: "#6b7fb5",
                    },
                    {
                      title: "Vintage Collage Postcard",
                      tag: "Collage",
                      tagColor: "#6b7fb5",
                      progress: 90,
                      barColor: "#6b7fb5",
                      rotate: "-0.3deg",
                      backColor: "#e85d75",
                    },
                  ].map((project) => (
                    <div key={project.title} className="group relative" style={{ rotate: project.rotate }}>
                      {/* Back paper */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-full rounded-xl group-hover:translate-x-2 group-hover:translate-y-1.5 transition-transform duration-300 ease-out"
                        style={{ backgroundColor: project.backColor, opacity: 0.25 }}
                      />
                      {/* Front card */}
                      <div className="relative bg-[#fdf6ee] rounded-xl p-5 border-2 border-[#e0d8cc] shadow-[3px_3px_0px_rgba(0,0,0,0.06)] group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_rgba(0,0,0,0.09)] transition-all duration-300 ease-out cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-[#2d2d2d] text-base">{project.title}</h4>
                          <span
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shrink-0 ml-3 shadow-[1px_1px_0px_rgba(45,45,45,0.1)]"
                            style={{ backgroundColor: project.tagColor }}
                          >
                            {project.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-white rounded-full border border-[#e0d8cc] overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${project.progress}%`, backgroundColor: project.barColor }}
                            />
                          </div>
                          <span className="text-xs font-bold shrink-0" style={{ color: project.barColor }}>
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Todo section */}
                <div className="mt-8 pt-6 border-t-2 border-[#e0d8cc]">
                  <h4 className="font-bold text-[#2d2d2d] mb-4 text-sm uppercase tracking-wide">Today&apos;s tasks</h4>
                  <div className="space-y-3">
                    {[
                      "Cut template pieces for wave pattern",
                      "Photograph finished cherry blossom piece",
                      "Order new scoring tool",
                      "Upload tutorial to workshop page",
                    ].map((task, i) => (
                      <div
                        key={task}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#fdf6ee] hover:bg-white hover:shadow-[2px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-200 ease-out"
                        onClick={() => toggleItem(i)}
                      >
                        <button
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ease-out"
                          style={{
                            borderColor: checkedItems[i] ? "#5cb8a5" : "#e0d8cc",
                            backgroundColor: checkedItems[i] ? "#5cb8a5" : "white",
                            boxShadow: checkedItems[i]
                              ? "1px 1px 0px rgba(45,45,45,0.1)"
                              : "inset 1px 1px 2px rgba(0,0,0,0.04)",
                          }}
                        >
                          {checkedItems[i] && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span
                          className={`text-sm transition-all duration-200 ${
                            checkedItems[i] ? "text-[#aaa] line-through" : "text-[#2d2d2d] font-medium"
                          }`}
                        >
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Stats sidebar */}
            <RevealBlock delay={0.16}>
              <div className="space-y-5">
                {/* Material stock card */}
                <div className="group bg-white rounded-2xl p-6 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] cursor-default transition-all duration-200 ease-out">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#fde8ec] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                      <PaperIcon className="w-5 h-5 text-[#e85d75]" />
                    </div>
                    <span className="text-sm font-bold text-[#666]">Material Stock</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Card stock", amount: 48, max: 60, color: "#e85d75" },
                      { label: "Tissue paper", amount: 32, max: 50, color: "#5cb8a5" },
                      { label: "Foil sheets", amount: 12, max: 30, color: "#f5c040" },
                    ].map((mat) => (
                      <div key={mat.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#666] font-medium">{mat.label}</span>
                          <span className="font-bold" style={{ color: mat.color }}>{mat.amount}</span>
                        </div>
                        <div className="h-2 bg-[#f0ede8] rounded-full overflow-hidden border border-[#e0d8cc]">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(mat.amount / mat.max) * 100}%`, backgroundColor: mat.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completed this week */}
                <div className="group bg-white rounded-2xl p-6 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] cursor-default transition-all duration-200 ease-out">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#d4f5ee] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                      <FoldIcon className="w-5 h-5 text-[#5cb8a5]" />
                    </div>
                    <span className="text-sm font-bold text-[#666]">This Week</span>
                  </div>
                  <div className="text-4xl font-bold text-[#5cb8a5] mb-1">
                    {checkedItems.filter(Boolean).length}
                    <span className="text-2xl text-[#aaa]">/{checkedItems.length}</span>
                  </div>
                  <div className="text-xs text-[#888] mb-4">tasks completed</div>
                  <div className="h-2 bg-[#d4f5ee] rounded-full overflow-hidden border border-[#b0e5da]">
                    <div
                      className="h-full rounded-full bg-[#5cb8a5] transition-all duration-700"
                      style={{ width: `${(checkedItems.filter(Boolean).length / checkedItems.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Palette snippets */}
                <div className="group bg-white rounded-2xl p-6 border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.07)] hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] cursor-default transition-all duration-200 ease-out">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#fff3b0] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                      <StarIcon className="w-5 h-5 text-[#f5c040]" />
                    </div>
                    <span className="text-sm font-bold text-[#666]">Color Snippets</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["#e85d75", "#5cb8a5", "#f5c040", "#6b7fb5", "#fdf6ee"].map((color, i) => (
                      <div
                        key={color}
                        className="w-9 h-9 rounded-lg shadow-[2px_2px_0px_rgba(45,45,45,0.08)] hover:-translate-y-1 hover:shadow-[3px_3px_0px_rgba(45,45,45,0.12)] transition-all duration-200 ease-out cursor-pointer"
                        style={{
                          backgroundColor: color,
                          border: color === "#fdf6ee" ? "2px solid #e0d8cc" : "none",
                          rotate: `${(i % 3 - 1) * 1.5}deg`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b7fb5] block mb-3">
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] leading-tight">
              Paper craft <span style={{ color: "#e85d75" }}>guidelines</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-[#666666] text-lg max-w-lg leading-relaxed">
              The philosophy of Paper Craft UI in two columns — what gives the style its warmth
              and what destroys it.
            </p>
          </RevealBlock>

          {/* Philosophy cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <LayersIcon className="w-8 h-8" />,
                title: "Layer Depth",
                tagline: "Paper stacks have real thickness",
                desc: "Every UI element exists at a specific height above the paper surface. Shadows indicate elevation; closer to the surface means shorter offset shadows, further means taller.",
                items: ["4px_4px_0px for base elements", "6px_6px_0px on hover lift", "8px_8px_0px for highest layer"],
                color: "#e85d75",
                bg: "#fde8ec",
                border: "#e0d8cc",
              },
              {
                icon: <FoldIcon className="w-8 h-8" />,
                title: "Handmade Edges",
                tagline: "Slight imperfection = authenticity",
                desc: "Subtle rotations of 0.5–2 degrees make elements feel placed by hand. Perfectly aligned digital grids kill the craft aesthetic — introduce deliberate, gentle tilt.",
                items: ["rotate-[1deg] on cards", "-rotate-[0.5deg] on buttons", "rotate-[2deg] on back layers"],
                color: "#5cb8a5",
                bg: "#d4f5ee",
                border: "#b0e5da",
              },
              {
                icon: <ScissorsIcon className="w-8 h-8" />,
                title: "Warm Paper Base",
                tagline: "Not white — paper warm #fdf6ee",
                desc: "The background is never pure white or cold gray. It is a warm cream paper tone #fdf6ee that makes the whole surface feel like you are looking at a craft table.",
                items: ["bg-[#fdf6ee] always", "No dark or black backgrounds", "Warm border #e0d8cc"],
                color: "#6b7fb5",
                bg: "#e8ecf5",
                border: "#c5cce5",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className="group bg-[#fdf6ee] rounded-2xl p-8 border-2 h-full cursor-default transition-all duration-200 ease-out hover:-translate-y-1.5 hover:-translate-x-0.5"
                  style={{
                    borderColor: principle.border,
                    boxShadow: `4px 4px 0px rgba(0,0,0,0.07)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px rgba(0,0,0,0.07)";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-[3px_3px_0px_rgba(45,45,45,0.08)] group-hover:-translate-y-1 group-hover:-translate-x-0.5 transition-transform duration-200 ease-out"
                    style={{ backgroundColor: principle.bg, color: principle.color }}
                  >
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2d2d2d] mb-1">{principle.title}</h3>
                  <p className="text-sm font-bold mb-4" style={{ color: principle.color }}>
                    {principle.tagline}
                  </p>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{principle.desc}</p>
                  <ul className="space-y-2">
                    {principle.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#666] font-mono">
                        <span
                          className="mt-1 w-2 h-2 rounded-sm shrink-0"
                          style={{ backgroundColor: principle.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.12}>
              <div className="bg-[#fdf6ee] rounded-2xl p-8 border-2 border-[#b0e5da] shadow-[4px_4px_0px_rgba(92,184,165,0.12)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#d4f5ee] flex items-center justify-center shadow-[2px_2px_0px_rgba(45,45,45,0.08)]">
                    <svg className="w-4 h-4 text-[#5cb8a5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#5cb8a5]">Do</h3>
                  <ScissorsIcon className="w-4 h-4 text-[#5cb8a5] opacity-50 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Use bg-[#fdf6ee] warm paper white as background always",
                    "Use offset shadows: shadow-[4px_4px_0px_rgba(0,0,0,0.08)]",
                    "Add slight rotation rotate-[1deg] for handmade feel",
                    "Use rounded-xl or rounded-2xl — avoid sharp corners",
                    "Lift on hover: -translate-y-1 -translate-x-0.5",
                    "Shadow grows with lift: hover:shadow-[6px_6px_0px]",
                    "Layer cards: multiple divs with rotation offsets",
                    "Use inset shadows for inputs to mimic paper cutouts",
                    "Use ease-out for transitions — paper is stiff not bouncy",
                    "Keep bright craft colors: #e85d75 #5cb8a5 #f5c040 #6b7fb5",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#444] leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-sm bg-[#5cb8a5] shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div className="bg-[#fdf6ee] rounded-2xl p-8 border-2 border-[#f5c0c8] shadow-[4px_4px_0px_rgba(232,93,117,0.1)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-[#fde8ec] flex items-center justify-center shadow-[2px_2px_0px_rgba(45,45,45,0.08)]">
                    <svg className="w-4 h-4 text-[#e85d75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#e85d75]">Don&apos;t</h3>
                  <HeartIcon className="w-4 h-4 text-[#e85d75] opacity-30 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {[
                    "No dark or black backgrounds — kills the paper warmth",
                    "No glow or neon shadow effects — paper does not glow",
                    "No metallic or glass morphism aesthetics",
                    "No sharp precise corners — looks too digital/cold",
                    "No fluorescent high-saturation colors",
                    "No drop-shadow filter — use box-shadow for paper shadow",
                    "No gradient glow effects on elements",
                    "No spring/rubber bounce easing (cubic-bezier overshoot)",
                    "No stacked layers moving in the same direction on hover",
                    "No pure white background — always use warm #fdf6ee",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#444] leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-sm bg-[#e85d75] shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="relative bg-[#fdf6ee] border-t-2 border-[#e0d8cc] overflow-hidden">
        {/* Decorative paper scraps */}
        <div
          className="absolute top-6 right-12 w-16 h-20 bg-[#f5c040] rounded-lg opacity-15 hidden md:block"
          style={{ rotate: "6deg", boxShadow: "2px 2px 0px rgba(0,0,0,0.05)" }}
        />
        <div
          className="absolute bottom-8 left-16 w-12 h-16 bg-[#5cb8a5] rounded-lg opacity-15 hidden md:block"
          style={{ rotate: "-8deg", boxShadow: "2px 2px 0px rgba(0,0,0,0.05)" }}
        />
        <div
          className="absolute top-12 left-1/3 w-10 h-14 bg-[#6b7fb5] rounded-lg opacity-10 hidden md:block"
          style={{ rotate: "3deg", boxShadow: "2px 2px 0px rgba(0,0,0,0.05)" }}
        />

        {/* Tape strip accent at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2.5 bg-[#e85d75] opacity-30 rounded-b-md" />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl bg-[#e85d75] flex items-center justify-center shadow-[3px_3px_0px_rgba(45,45,45,0.12)]"
                  style={{ rotate: "-1.5deg" }}
                >
                  <PaperIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#2d2d2d] tracking-tight">
                  Paper<span className="text-[#e85d75]">Craft</span>
                </span>
              </div>
              <p className="text-sm text-[#888] leading-relaxed">
                A UI design style inspired by layered paper art — warm textures,
                offset shadows, and hand-crafted imperfection.
              </p>
              {/* Color dots */}
              <div className="flex gap-2">
                {[
                  { color: "#e85d75", rotate: "-1deg" },
                  { color: "#5cb8a5", rotate: "0.5deg" },
                  { color: "#f5c040", rotate: "-0.5deg" },
                  { color: "#6b7fb5", rotate: "1deg" },
                  { color: "#fdf6ee", border: true },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-md hover:-translate-y-1 hover:shadow-[2px_2px_0px_rgba(45,45,45,0.1)] transition-all duration-200 ease-out cursor-pointer"
                    style={{
                      backgroundColor: s.color,
                      border: s.border ? "2px solid #e0d8cc" : "none",
                      rotate: s.rotate,
                      boxShadow: "1px 1px 0px rgba(45,45,45,0.08)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#888]">Style</span>
                <Link href="/styles/paper-craft" className="text-[#666] hover:text-[#e85d75] transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/paper-craft/showcase" className="text-[#666] hover:text-[#e85d75] transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/paper-craft/cover" className="text-[#666] hover:text-[#e85d75] transition-colors duration-200">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#888]">StyleKit</span>
                <Link href="/" className="text-[#666] hover:text-[#e85d75] transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-[#666] hover:text-[#e85d75] transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#888]">Palette</span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-[#666] text-xs">
                    <span
                      className="w-3 h-3 rounded-sm inline-block shadow-[1px_1px_0px_rgba(45,45,45,0.08)]"
                      style={{
                        backgroundColor: s.hex,
                        border: s.bordered ? "1px solid #e0d8cc" : "none",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider — torn paper edge style */}
          <div className="h-px bg-[#e0d8cc] mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[#888]">
              <span>Crafted with</span>
              <HeartIcon className="w-4 h-4 text-[#e85d75]" />
              <span>for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e85d75] text-white text-sm font-bold shadow-[3px_3px_0px_rgba(45,45,45,0.12)] hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_rgba(45,45,45,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(45,45,45,0.15)] transition-all duration-200 ease-out -rotate-[0.5deg] hover:rotate-0"
            >
              <ScissorsIcon className="w-3.5 h-3.5" />
              Back to StyleKit
              <span>→</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
