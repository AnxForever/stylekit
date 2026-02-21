"use client";

import { useRef, useEffect, useState } from "react";
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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG accents                                                 */
/* ------------------------------------------------------------------ */

function BrushIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a1 1 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96a1 1 0 0 0 0-1.41z" />
    </svg>
  );
}

function PaletteIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 0 0 2.5-2.5c0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33a.5.5 0 0 1 .5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
    </svg>
  );
}

function FrameIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

function WaterDropIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

// Colors from lib/styles/impressionist-oil.ts
const C = {
  primary: "#e8a87c",    // Warm Orange
  canvas: "#f5f0e1",     // Canvas Cream
  vermillion: "#c0392b", // Vermillion Red
  blue: "#2c3e50",       // Deep Blue
  turquoise: "#1abc9c",  // Turquoise Green
  gold: "#f5d88a",       // Golden Light
};

const paletteSwatches = [
  { name: "Warm Orange", hex: "#e8a87c", label: "Primary", role: "Buttons & accents" },
  { name: "Canvas Cream", hex: "#f5f0e1", label: "Background", role: "Backgrounds & surfaces" },
  { name: "Vermillion Red", hex: "#c0392b", label: "Shadow Base", role: "Impasto shadow layer" },
  { name: "Deep Blue", hex: "#2c3e50", label: "Text", role: "Typography & outlines" },
  { name: "Turquoise Green", hex: "#1abc9c", label: "Accent", role: "Highlights & indicators" },
  { name: "Golden Light", hex: "#f5d88a", label: "Dappled Light", role: "Radial light overlays" },
];

type ComponentTab = "buttons" | "cards" | "inputs";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeAiRule, setActiveAiRule] = useState<number>(0);
  const [pressedButton, setPressedButton] = useState(false);
  const [brushHovered, setBrushHovered] = useState(false);
  const [focusRingDemo, setFocusRingDemo] = useState(false);
  const [durationDemo, setDurationDemo] = useState<"slow" | "fast" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // AI Rules from lib/styles/impressionist-oil.ts
  const aiRules = [
    {
      name: "Dancing Light",
      subtitle: "Button Hover",
      description:
        "hover:brightness-110 hover:contrast-125 simulates sunlight illuminating pigment. Combined with hover:-translate-y-0.5 for a subtle lift. Never use flat color hover.",
      demo: "dancing-light",
      color: C.gold,
      borderColor: "rgba(245,216,138,0.6)",
    },
    {
      name: "Impasto Depression",
      subtitle: "Active Press",
      description:
        "active:translate-y-[3px] — button sinks into the 4px solid vermillion shadow layer. Never use active:scale-* alone. The translate must match the solid shadow offset.",
      demo: "impasto",
      color: C.vermillion,
      borderColor: "rgba(192,57,43,0.4)",
    },
    {
      name: "Brushstroke Reveal",
      subtitle: "Card Underline",
      description:
        "Card heading underline starts at w-16. On group-hover it extends to w-24 like paint spreading across canvas. Duration 500ms ease-out — slow, painterly rhythm.",
      demo: "brushstroke",
      color: C.primary,
      borderColor: "rgba(232,168,124,0.6)",
    },
    {
      name: "Slow Easing Standard",
      subtitle: "Animation Rhythm",
      description:
        "Minimum duration 300ms. Button transitions: duration-300 ease-out. Underline reveals: duration-500 ease-out. Never use duration under 300ms — impressionist rhythm is slow and flowing.",
      demo: "slow-easing",
      color: C.turquoise,
      borderColor: "rgba(26,188,156,0.4)",
    },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden font-serif"
      style={{ backgroundColor: C.canvas, color: C.blue }}
    >
      {/* ============================================================ */}
      {/* CSS Keyframe Animations                                       */}
      {/* ============================================================ */}
      <style>{`
        @keyframes imp-dapple-drift {
          0%, 100% { opacity: 0.06; transform: scale(1) translate(0, 0); }
          33% { opacity: 0.10; transform: scale(1.08) translate(12px, -8px); }
          66% { opacity: 0.07; transform: scale(0.94) translate(-8px, 6px); }
        }
        @keyframes imp-canvas-breathe {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.07; }
        }
        @keyframes imp-stroke-reveal {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 0.55; }
        }
        @keyframes imp-pigment-shimmer {
          0%, 100% { filter: brightness(1) contrast(1); }
          50% { filter: brightness(1.08) contrast(1.12); }
        }
        @keyframes imp-float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(-6px) rotate(0.8deg); }
          60% { transform: translateY(-4px) rotate(-0.5deg); }
        }
        @keyframes imp-brushstroke-draw {
          0% { width: 0%; opacity: 0; }
          20% { opacity: 1; }
          100% { width: 100%; opacity: 0.7; }
        }
        @keyframes imp-sun-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.13; transform: scale(1.1); }
        }
        .imp-float {
          animation: imp-float-gentle 7s ease-in-out infinite;
        }
        .imp-pigment-glow {
          animation: imp-pigment-shimmer 4s ease-in-out infinite;
        }
        .imp-dapple-drift {
          animation: imp-dapple-drift 9s ease-in-out infinite;
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                  */}
      {/* ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(245,240,225,0.92)",
          borderBottom: "1px solid rgba(232,168,124,0.2)",
          boxShadow: "0 2px 20px rgba(44,62,80,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(232,168,124,0.15) 0%, rgba(245,216,138,0.1) 100%)",
              border: "1px solid rgba(232,168,124,0.3)",
            }}
          >
            <BrushIcon className="w-4 h-4 imp-pigment-glow" style={{ color: C.primary } as React.CSSProperties} />
            <span className="text-sm font-serif font-bold tracking-wide" style={{ color: C.blue }}>
              Impressionist<span style={{ color: C.primary }}> Oil</span>
            </span>
          </div>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "AI Rules", "Design Rules", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all duration-300"
                style={{ color: "rgba(44,62,80,0.55)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = C.primary;
                  (e.target as HTMLElement).style.backgroundColor = "rgba(232,168,124,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "rgba(44,62,80,0.55)";
                  (e.target as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/impressionist-oil"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-serif font-bold tracking-wide transition-all duration-300 hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
            style={{
              background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
              color: C.blue,
              boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
            }}
          >
            <span>&#8592;</span>
            <span>Style Page</span>
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                       */}
      {/* ============================================================ */}
      <section
        className="relative pt-28 md:pt-36 pb-28 px-5 md:px-10 overflow-hidden"
        style={{ backgroundColor: C.canvas }}
      >
        {/* Canvas crosshatch texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.025) 3px, transparent 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.018) 3px, transparent 4px)",
            animation: "imp-canvas-breathe 8s ease-in-out infinite",
          }}
        />

        {/* Dappled sunlight blobs */}
        <div
          className="absolute pointer-events-none imp-dapple-drift"
          style={{
            top: "8%", left: "15%", width: 220, height: 220,
            background: `radial-gradient(circle, rgba(245,216,138,0.12) 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "18%", right: "12%", width: 180, height: 180,
            background: `radial-gradient(circle, rgba(232,168,124,0.10) 0%, transparent 70%)`,
            borderRadius: "50%",
            animation: "imp-dapple-drift 11s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "15%", left: "30%", width: 150, height: 150,
            background: `radial-gradient(circle, rgba(245,216,138,0.08) 0%, transparent 70%)`,
            borderRadius: "50%",
            animation: "imp-dapple-drift 13s ease-in-out infinite 4s",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "40%", right: "25%", width: 120, height: 120,
            background: `radial-gradient(circle, rgba(26,188,156,0.06) 0%, transparent 70%)`,
            borderRadius: "50%",
            animation: "imp-dapple-drift 10s ease-in-out infinite 1s",
          }}
        />

        {/* Floating brushstroke accent — top left */}
        <div
          className="absolute top-24 left-8 pointer-events-none hidden md:block imp-float"
          style={{ color: "rgba(232,168,124,0.25)" }}
        >
          <BrushIcon className="w-16 h-16" />
        </div>

        {/* Floating sun accent — top right */}
        <div
          className="absolute top-32 right-16 pointer-events-none hidden md:block"
          style={{
            color: "rgba(245,216,138,0.35)",
            animation: "imp-float-gentle 9s ease-in-out infinite 1.5s",
          }}
        >
          <SunIcon className="w-12 h-12" />
        </div>

        {/* Floating palette accent — bottom right */}
        <div
          className="absolute bottom-28 right-10 pointer-events-none hidden md:block"
          style={{
            color: "rgba(192,57,43,0.2)",
            animation: "imp-float-gentle 8s ease-in-out infinite 3s",
          }}
        >
          <PaletteIcon className="w-10 h-10" />
        </div>

        {/* Hero content */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-lg text-xs font-serif font-bold tracking-[0.2em] uppercase mb-8"
              style={{
                backgroundColor: "rgba(232,168,124,0.15)",
                color: C.primary,
                border: `1px solid rgba(232,168,124,0.35)`,
              }}
            >
              <BrushIcon className="w-3.5 h-3.5" />
              油画印象派风 — Impressionist Oil
              <BrushIcon className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Main title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[90px] font-serif font-bold leading-[1.0] tracking-tight mb-5"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span style={{ color: C.primary }}>Impression,</span>
            <br />
            <span style={{ color: C.blue }}>Soleil Levant</span>
          </h1>

          {/* Brushstroke underline decoration */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.5s",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: 6,
                width: heroVisible ? "40%" : "0%",
                background: `linear-gradient(90deg, transparent, ${C.primary} 20%, ${C.gold} 60%, transparent)`,
                borderRadius: 9999,
                opacity: 0.6,
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s",
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 font-serif"
            style={{
              color: "rgba(44,62,80,0.55)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Bold brushstrokes, dappled light, and impasto shadows — the CSS design language of
            Monet and Renoir, brought to the browser.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <button
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
              style={{
                background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                color: C.blue,
                boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 20px rgba(232,168,124,0.35)`,
              }}
            >
              <BrushIcon className="w-4 h-4" />
              Enter Gallery
            </button>
            <button
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5"
              style={{
                backgroundColor: "transparent",
                color: C.blue,
                border: `2px solid rgba(232,168,124,0.5)`,
                boxShadow: "0 4px 16px rgba(44,62,80,0.06)",
              }}
            >
              <FrameIcon className="w-4 h-4" />
              View AI Rules
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            {[
              { value: "5", label: "AI Interaction Rules", accent: C.primary },
              { value: "4+", label: "Impressionist Techniques", accent: C.gold },
              { value: "300ms", label: "Minimum Duration", accent: C.turquoise },
              { value: "6", label: "Palette Colors", accent: C.vermillion },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 text-center rounded-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{
                  backgroundColor: C.canvas,
                  border: `1px solid rgba(232,168,124,0.25)`,
                  boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 8px 24px rgba(44,62,80,0.07)`,
                  backgroundImage:
                    "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.015) 15px, transparent 16px)",
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <div className="text-2xl font-serif font-bold mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. COLOR PALETTE                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: C.canvas }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-serif font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: C.primary }}
            >
              Palette
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: C.blue }}>
              Impressionist{" "}
              <span style={{ color: C.primary }}>color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
              Six pigments lifted from the Impressionist palette — warm orange, canvas cream,
              vermillion red, deep blue, turquoise green, and golden light.
            </p>
          </RevealBlock>

          {/* Swatch grid */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-16">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i ? "translateY(-10px) scale(1.1)" : "translateY(0) scale(1)",
                      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                      position: "relative",
                    }}
                  >
                    {/* Main swatch circle */}
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-lg"
                      style={{
                        backgroundColor: swatch.hex,
                        border:
                          swatch.hex === C.canvas
                            ? `2px solid rgba(232,168,124,0.4)`
                            : "none",
                        boxShadow:
                          hoveredSwatch === i
                            ? `0 3px 0 ${C.vermillion}55, 0 16px 32px ${swatch.hex}99`
                            : `0 3px 0 rgba(192,57,43,0.12), 0 8px 20px ${swatch.hex}55`,
                        transition: "box-shadow 0.4s ease",
                        backgroundImage:
                          "repeating-linear-gradient(35deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, transparent 9px)",
                      }}
                    />
                    {/* Hover indicator — small brushstroke */}
                    {hoveredSwatch === i && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: -10,
                          left: "10%",
                          width: "80%",
                          height: 4,
                          backgroundColor: swatch.hex,
                          borderRadius: 9999,
                          opacity: 0.7,
                          animation: "imp-brushstroke-draw 0.4s ease-out forwards",
                        }}
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-serif font-bold" style={{ color: C.blue }}>
                      {swatch.name}
                    </div>
                    <div
                      className="text-xs font-mono mt-0.5"
                      style={{ color: "rgba(44,62,80,0.45)" }}
                    >
                      {swatch.hex}
                    </div>
                    <span
                      className="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-serif font-bold"
                      style={{
                        backgroundColor: "rgba(232,168,124,0.12)",
                        color: C.primary,
                        border: `1px solid rgba(232,168,124,0.25)`,
                      }}
                    >
                      {swatch.label}
                    </span>
                    <div
                      className="text-[10px] mt-1 font-serif"
                      style={{ color: "rgba(44,62,80,0.35)" }}
                    >
                      {swatch.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient combos */}
          <RevealBlock delay={0.2}>
            <div
              className="rounded-lg p-8"
              style={{
                backgroundColor: C.canvas,
                border: `1px solid rgba(232,168,124,0.25)`,
                boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 12px 32px rgba(44,62,80,0.07)`,
                backgroundImage:
                  "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.015) 15px, transparent 16px)",
              }}
            >
              <p
                className="text-xs font-serif font-bold tracking-[0.15em] uppercase mb-6"
                style={{ color: "rgba(44,62,80,0.4)" }}
              >
                Impressionist gradient combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#e8a87c", to: "#f5d88a", label: "Warm Pigment" },
                  { from: "#f5d88a", to: "#f5f0e1", label: "Sunlit Canvas" },
                  { from: "#e8a87c", to: "#c0392b", label: "Sunset Fire" },
                  { from: "#2c3e50", to: "#1abc9c", label: "Coastal Dusk" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-16 rounded-lg mb-2 transition-all duration-500 ease-out group-hover:-translate-y-1"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        boxShadow: `0 3px 0 rgba(192,57,43,0.12), 0 6px 16px rgba(44,62,80,0.07)`,
                      }}
                    />
                    <div className="text-xs font-serif text-center" style={{ color: "rgba(44,62,80,0.5)" }}>
                      {g.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COMPONENT GALLERY (3 tabs)                                 */}
      {/* ============================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: "rgba(232,168,124,0.05)" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-serif font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: C.gold }}
            >
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: C.blue }}>
              Canvas{" "}
              <span style={{ color: C.primary }}>building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-lg max-w-lg leading-relaxed font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
              Every component is textured, warm, and layered — impasto shadows, brushstroke
              reveals, and painterly gradients throughout.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-lg text-sm font-serif font-bold capitalize transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-[2px]"
                  style={
                    activeTab === tab
                      ? {
                          background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                          color: C.blue,
                          boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
                        }
                      : {
                          backgroundColor: C.canvas,
                          color: "rgba(44,62,80,0.6)",
                          border: `1.5px solid rgba(232,168,124,0.35)`,
                          boxShadow: "0 2px 8px rgba(44,62,80,0.05)",
                        }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="rounded-lg p-8 md:p-12"
              style={{
                backgroundColor: C.canvas,
                border: `1px solid rgba(232,168,124,0.25)`,
                boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 16px 48px rgba(44,62,80,0.08)`,
                backgroundImage:
                  "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.018) 15px, transparent 16px)",
              }}
            >

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  {/* Primary */}
                  <div>
                    <p
                      className="text-xs font-serif font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "rgba(44,62,80,0.4)" }}
                    >
                      Primary — Dancing Light hover + Impasto Depression press
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
                        style={{
                          background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                          color: C.blue,
                          boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
                        }}
                      >
                        <BrushIcon className="w-4 h-4" />
                        Paint
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
                        style={{
                          background: `linear-gradient(135deg, ${C.vermillion} 0%, #a93226 100%)`,
                          color: "#f5f0e1",
                          boxShadow: `0 4px 0 rgba(120,30,20,0.8), 0 6px 16px rgba(192,57,43,0.3)`,
                        }}
                      >
                        <PaletteIcon className="w-4 h-4" />
                        Vermillion
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
                        style={{
                          background: `linear-gradient(135deg, ${C.turquoise} 0%, #16a085 100%)`,
                          color: "#f5f0e1",
                          boxShadow: `0 4px 0 rgba(15,100,75,0.8), 0 6px 16px rgba(26,188,156,0.3)`,
                        }}
                      >
                        <WaterDropIcon className="w-4 h-4" />
                        Turquoise
                      </button>
                    </div>
                  </div>

                  {/* Outline */}
                  <div>
                    <p
                      className="text-xs font-serif font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "rgba(44,62,80,0.4)" }}
                    >
                      Outline variants — warm canvas feel
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button
                        className="px-8 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "transparent",
                          color: C.blue,
                          border: `2px solid rgba(232,168,124,0.6)`,
                          boxShadow: "0 4px 16px rgba(44,62,80,0.06)",
                        }}
                      >
                        Outlined
                      </button>
                      <button
                        className="px-8 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                          backgroundColor: "rgba(232,168,124,0.1)",
                          color: C.primary,
                          border: `2px solid rgba(232,168,124,0.35)`,
                        }}
                      >
                        Gallery Soft
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-0.5 active:translate-y-[3px]"
                        style={{
                          background: `linear-gradient(135deg, ${C.gold} 0%, ${C.primary} 100%)`,
                          color: C.blue,
                          boxShadow: `0 4px 0 rgba(180,120,40,0.6), 0 6px 16px rgba(245,216,138,0.4)`,
                        }}
                      >
                        <SunIcon className="w-4 h-4" />
                        Sunlit Gold
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p
                      className="text-xs font-serif font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "rgba(44,62,80,0.4)" }}
                    >
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { size: "sm", px: "px-5 py-2 text-xs" },
                        { size: "md", px: "px-8 py-3.5 text-sm" },
                        { size: "lg", px: "px-12 py-5 text-base" },
                      ].map(({ size, px }) => (
                        <button
                          key={size}
                          className={`rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-0.5 active:translate-y-[3px] ${px}`}
                          style={{
                            background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                            color: C.blue,
                            boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
                          }}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Impression, Sunrise",
                      subtitle: "Claude Monet, 1872",
                      desc: "The painting that gave the movement its name. Soft orange light dances across the harbor mist.",
                      accent: C.primary,
                      accentSecondary: C.gold,
                    },
                    {
                      title: "Luncheon of the Boating Party",
                      subtitle: "Pierre-Auguste Renoir, 1881",
                      desc: "Warm afternoon light filters through the awning, illuminating the joyful gathering.",
                      accent: C.vermillion,
                      accentSecondary: C.primary,
                    },
                    {
                      title: "Water Lilies",
                      subtitle: "Claude Monet, 1906",
                      desc: "Turquoise depths reflect the sky, brushstrokes dissolving form into pure light.",
                      accent: C.turquoise,
                      accentSecondary: "#1abc9c",
                    },
                    {
                      title: "The Cliff Walk at Etretat",
                      subtitle: "Claude Monet, 1882",
                      desc: "Deep blue sea and chalk cliffs rendered in bold, gestural strokes.",
                      accent: C.blue,
                      accentSecondary: C.turquoise,
                    },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className="group relative rounded-lg p-8 cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1"
                      style={{
                        backgroundColor: C.canvas,
                        border: `1px solid rgba(232,168,124,0.25)`,
                        boxShadow: `0 3px 0 rgba(192,57,43,0.12), 0 8px 24px rgba(44,62,80,0.07)`,
                        backgroundImage:
                          `repeating-linear-gradient(${25 + i * 8}deg, transparent, transparent 15px, rgba(232,168,124,0.018) 15px, transparent 16px)`,
                        transitionDelay: `${i * 0.05}s`,
                      }}
                    >
                      {/* Dappled light overlay per card */}
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 60px at 80% 20%, rgba(245,216,138,0.08) 0%, transparent 100%)`,
                        }}
                      />
                      <div
                        className="text-xs font-serif font-bold tracking-[0.15em] uppercase mb-2"
                        style={{ color: "rgba(44,62,80,0.4)" }}
                      >
                        {card.subtitle}
                      </div>
                      <h4
                        className="text-xl font-serif font-bold mb-3"
                        style={{ color: C.blue }}
                      >
                        {card.title}
                      </h4>
                      {/* Brushstroke Reveal underline */}
                      <div
                        className="h-[3px] rounded-full mb-4 transition-all duration-500 ease-out"
                        style={{
                          width: "4rem",
                          backgroundColor: card.accent,
                        }}
                      />
                      <p
                        className="text-sm font-serif leading-relaxed"
                        style={{ color: "rgba(44,62,80,0.5)" }}
                      >
                        {card.desc}
                      </p>

                      {/* Hover: brushstroke extends — done via inline style on group-hover not accessible here,
                          so we use a pseudo approach with a visible second bar that grows */}
                      <div
                        className="mt-6 flex items-center gap-2"
                        style={{ color: card.accent }}
                      >
                        <FrameIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-serif font-bold tracking-wide">
                          View canvas
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-sm font-serif font-bold mb-2"
                        style={{ color: C.blue }}
                      >
                        Artist Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your brushstroke..."
                        className="w-full px-5 py-3.5 rounded-lg font-serif transition-all duration-300"
                        style={{
                          backgroundColor: C.canvas,
                          border: `2px solid rgba(232,168,124,0.3)`,
                          color: C.blue,
                          boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.border = `2px solid ${C.primary}`;
                          e.target.style.boxShadow = `inset 0 2px 4px rgba(44,62,80,0.04), 0 0 0 3px rgba(232,168,124,0.2)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.border = `2px solid rgba(232,168,124,0.3)`;
                          e.target.style.boxShadow = "inset 0 2px 4px rgba(44,62,80,0.04)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-serif font-bold mb-2"
                        style={{ color: C.blue }}
                      >
                        Gallery Email
                      </label>
                      <input
                        type="email"
                        placeholder="monet@giverny.fr"
                        className="w-full px-5 py-3.5 rounded-lg font-serif transition-all duration-300"
                        style={{
                          backgroundColor: C.canvas,
                          border: `2px solid rgba(232,168,124,0.3)`,
                          color: C.blue,
                          boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.border = `2px solid ${C.primary}`;
                          e.target.style.boxShadow = `inset 0 2px 4px rgba(44,62,80,0.04), 0 0 0 3px rgba(232,168,124,0.2)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.border = `2px solid rgba(232,168,124,0.3)`;
                          e.target.style.boxShadow = "inset 0 2px 4px rgba(44,62,80,0.04)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-serif font-bold mb-2"
                        style={{ color: C.blue }}
                      >
                        Artist Statement
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe your impressionist approach..."
                        className="w-full px-5 py-3.5 rounded-lg font-serif transition-all duration-300 resize-none"
                        style={{
                          backgroundColor: C.canvas,
                          border: `2px solid rgba(232,168,124,0.3)`,
                          color: C.blue,
                          boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.border = `2px solid ${C.primary}`;
                          e.target.style.boxShadow = `inset 0 2px 4px rgba(44,62,80,0.04), 0 0 0 3px rgba(232,168,124,0.2)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.border = `2px solid rgba(232,168,124,0.3)`;
                          e.target.style.boxShadow = "inset 0 2px 4px rgba(44,62,80,0.04)";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-sm font-serif font-bold mb-2"
                        style={{ color: C.blue }}
                      >
                        Painting Style
                      </label>
                      <select
                        className="w-full px-5 py-3.5 rounded-lg font-serif transition-all duration-300"
                        style={{
                          backgroundColor: C.canvas,
                          border: `2px solid rgba(232,168,124,0.3)`,
                          color: C.blue,
                          boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)",
                          outline: "none",
                        }}
                      >
                        <option>En plein air (outdoors)</option>
                        <option>Studio impasto</option>
                        <option>Pointillism</option>
                        <option>Water reflections</option>
                      </select>
                    </div>
                    {/* Focus ring demo toggle */}
                    <div>
                      <label
                        className="block text-sm font-serif font-bold mb-3"
                        style={{ color: C.blue }}
                      >
                        Focus Ring Demo (canvas offset)
                      </label>
                      <input
                        type="text"
                        placeholder="Click to see focus:ring-offset-[#f5f0e1]"
                        className="w-full px-5 py-3.5 rounded-lg font-serif transition-all duration-300"
                        style={{
                          backgroundColor: C.canvas,
                          border: `2px solid rgba(232,168,124,0.3)`,
                          color: C.blue,
                          boxShadow: focusRingDemo
                            ? `0 0 0 2px ${C.primary}, 0 0 0 4px ${C.canvas}`
                            : "inset 0 2px 4px rgba(44,62,80,0.04)",
                          outline: "none",
                        }}
                        onFocus={() => setFocusRingDemo(true)}
                        onBlur={() => setFocusRingDemo(false)}
                      />
                      <p
                        className="text-xs font-serif mt-2"
                        style={{ color: "rgba(44,62,80,0.4)" }}
                      >
                        {focusRingDemo
                          ? "Focus ring with canvas cream offset — gap visible!"
                          : "Click to activate focus ring with ring-offset-[#f5f0e1]"}
                      </p>
                    </div>
                    <button
                      className="w-full py-4 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
                      style={{
                        background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                        color: C.blue,
                        boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
                      }}
                    >
                      Submit to Gallery
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. AI RULES INTERACTIVE DEMO                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: C.canvas }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-serif font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: C.turquoise }}
            >
              AI Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: C.blue }}>
              Interaction{" "}
              <span style={{ color: C.primary }}>rules demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-lg max-w-lg leading-relaxed font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
              Four named interaction patterns from the aiRules spec — click each rule to switch,
              then interact with the live demo to feel the difference.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Rule selector tabs — left column */}
            <RevealBlock delay={0.08} className="lg:col-span-2">
              <div className="flex flex-col gap-3">
                {aiRules.map((rule, i) => (
                  <button
                    key={rule.name}
                    onClick={() => setActiveAiRule(i)}
                    className="text-left rounded-lg p-5 transition-all duration-400 ease-out hover:-translate-y-0.5"
                    style={
                      activeAiRule === i
                        ? {
                            backgroundColor: C.canvas,
                            border: `2px solid ${rule.color}`,
                            boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 8px 24px rgba(44,62,80,0.1)`,
                            backgroundImage:
                              "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.02) 15px, transparent 16px)",
                          }
                        : {
                            backgroundColor: "rgba(245,240,225,0.6)",
                            border: `1.5px solid rgba(232,168,124,0.2)`,
                            boxShadow: "none",
                          }
                    }
                  >
                    <div
                      className="text-xs font-serif font-bold tracking-[0.12em] uppercase mb-1"
                      style={{ color: activeAiRule === i ? rule.color : "rgba(44,62,80,0.4)" }}
                    >
                      {rule.subtitle}
                    </div>
                    <div
                      className="text-base font-serif font-bold"
                      style={{ color: activeAiRule === i ? C.blue : "rgba(44,62,80,0.55)" }}
                    >
                      {rule.name}
                    </div>
                    {activeAiRule === i && (
                      <div
                        className="h-[2px] rounded-full mt-3 transition-all duration-500 ease-out"
                        style={{
                          width: "3rem",
                          backgroundColor: rule.color,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </RevealBlock>

            {/* Demo panel — right column */}
            <RevealBlock delay={0.12} className="lg:col-span-3">
              <div
                className="rounded-lg p-8 md:p-10 h-full"
                style={{
                  backgroundColor: C.canvas,
                  border: `1px solid rgba(232,168,124,0.25)`,
                  boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 16px 40px rgba(44,62,80,0.08)`,
                  backgroundImage:
                    "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.018) 15px, transparent 16px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Dappled light overlay in demo area */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 100px at 85% 15%, rgba(245,216,138,0.09) 0%, transparent 100%), radial-gradient(circle 70px at 15% 75%, rgba(232,168,124,0.07) 0%, transparent 100%)`,
                  }}
                />

                <div className="relative z-10">
                  <span
                    className="inline-block px-3 py-1 rounded text-xs font-serif font-bold tracking-[0.12em] uppercase mb-4"
                    style={{
                      backgroundColor: `${aiRules[activeAiRule].color}22`,
                      color: aiRules[activeAiRule].color,
                      border: `1px solid ${aiRules[activeAiRule].borderColor}`,
                    }}
                  >
                    {aiRules[activeAiRule].subtitle}
                  </span>

                  <h3
                    className="text-2xl font-serif font-bold mb-3"
                    style={{ color: C.blue }}
                  >
                    {aiRules[activeAiRule].name}
                  </h3>

                  <p
                    className="text-sm font-serif leading-relaxed mb-8"
                    style={{ color: "rgba(44,62,80,0.55)" }}
                  >
                    {aiRules[activeAiRule].description}
                  </p>

                  {/* ---- Rule 0: Dancing Light ---- */}
                  {activeAiRule === 0 && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <p className="text-xs font-serif mb-3" style={{ color: "rgba(44,62,80,0.4)" }}>
                            With Dancing Light (hover me)
                          </p>
                          <button
                            className="px-7 py-3.5 rounded-lg font-serif font-bold tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5"
                            style={{
                              background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                              color: C.blue,
                              boxShadow: `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
                            }}
                          >
                            Sunlit Button
                          </button>
                        </div>
                        <div>
                          <p className="text-xs font-serif mb-3" style={{ color: "rgba(44,62,80,0.4)" }}>
                            Without (flat — never do this)
                          </p>
                          <button
                            className="px-7 py-3.5 rounded-lg font-serif font-bold tracking-wide"
                            style={{
                              backgroundColor: C.primary,
                              color: C.blue,
                              cursor: "default",
                              opacity: 0.6,
                            }}
                          >
                            Flat Button
                          </button>
                        </div>
                      </div>
                      <p
                        className="text-xs font-mono p-3 rounded"
                        style={{
                          backgroundColor: "rgba(44,62,80,0.05)",
                          color: "rgba(44,62,80,0.6)",
                          border: `1px solid rgba(44,62,80,0.1)`,
                        }}
                      >
                        hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5
                      </p>
                    </div>
                  )}

                  {/* ---- Rule 1: Impasto Depression ---- */}
                  {activeAiRule === 1 && (
                    <div className="space-y-6">
                      <div className="flex flex-col items-start gap-4">
                        <p
                          className="text-xs font-serif"
                          style={{ color: "rgba(44,62,80,0.45)" }}
                        >
                          Press and hold — feel the button sink into the 4px vermillion shadow layer
                        </p>
                        <button
                          className="px-10 py-5 rounded-lg font-serif font-bold tracking-wide text-lg transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-[3px]"
                          style={{
                            background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                            color: C.blue,
                            boxShadow: pressedButton
                              ? `0 1px 0 ${C.vermillion}, 0 3px 8px rgba(232,168,124,0.2)`
                              : `0 4px 0 ${C.vermillion}, 0 6px 16px rgba(232,168,124,0.3)`,
                          }}
                          onMouseDown={() => setPressedButton(true)}
                          onMouseUp={() => setPressedButton(false)}
                          onMouseLeave={() => setPressedButton(false)}
                        >
                          {pressedButton ? "Depressed into canvas" : "Press me!"}
                        </button>
                        <p
                          className="text-xs font-serif"
                          style={{ color: pressedButton ? C.vermillion : "rgba(44,62,80,0.4)" }}
                        >
                          {pressedButton
                            ? "translateY(3px) — sinking into the 4px solid shadow base"
                            : "active:translate-y-[3px] — matches the 4px solid shadow offset"}
                        </p>
                      </div>
                      <p
                        className="text-xs font-mono p-3 rounded"
                        style={{
                          backgroundColor: "rgba(44,62,80,0.05)",
                          color: "rgba(44,62,80,0.6)",
                          border: `1px solid rgba(44,62,80,0.1)`,
                        }}
                      >
                        boxShadow: "0 4px 0 #c0392b, ..." active:translate-y-[3px]
                      </p>
                    </div>
                  )}

                  {/* ---- Rule 2: Brushstroke Reveal ---- */}
                  {activeAiRule === 2 && (
                    <div className="space-y-6">
                      <div
                        className="group p-6 rounded-lg cursor-pointer transition-all duration-500 ease-out hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "rgba(232,168,124,0.05)",
                          border: `1px solid rgba(232,168,124,0.25)`,
                        }}
                        onMouseEnter={() => setBrushHovered(true)}
                        onMouseLeave={() => setBrushHovered(false)}
                      >
                        <h4
                          className="text-xl font-serif font-bold mb-3"
                          style={{ color: C.blue }}
                        >
                          Hover this gallery card
                        </h4>
                        {/* The Brushstroke Reveal underline */}
                        <div
                          className="h-[3px] rounded-full mb-4 transition-all duration-500 ease-out"
                          style={{
                            width: brushHovered ? "6rem" : "4rem",
                            backgroundColor: C.primary,
                          }}
                        />
                        <p
                          className="text-sm font-serif leading-relaxed"
                          style={{ color: "rgba(44,62,80,0.5)" }}
                        >
                          {brushHovered
                            ? "Paint spreading — underline at w-24 (6rem)"
                            : "Underline resting at w-16 (4rem) — hover to see it extend"}
                        </p>
                      </div>
                      <p
                        className="text-xs font-mono p-3 rounded"
                        style={{
                          backgroundColor: "rgba(44,62,80,0.05)",
                          color: "rgba(44,62,80,0.6)",
                          border: `1px solid rgba(44,62,80,0.1)`,
                        }}
                      >
                        w-16 group-hover:w-24 transition-all duration-500 ease-out
                      </p>
                    </div>
                  )}

                  {/* ---- Rule 3: Slow Easing Standard ---- */}
                  {activeAiRule === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-5">
                        {/* Fast (banned) */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-xs font-serif font-bold"
                              style={{ color: C.vermillion }}
                            >
                              Fast — 100ms (forbidden)
                            </span>
                            <button
                              className="text-xs px-3 py-1 rounded font-serif transition-colors duration-200"
                              style={{
                                backgroundColor: "rgba(192,57,43,0.1)",
                                color: C.vermillion,
                                border: `1px solid rgba(192,57,43,0.3)`,
                              }}
                              onClick={() => setDurationDemo(durationDemo === "fast" ? null : "fast")}
                            >
                              Animate
                            </button>
                          </div>
                          <div
                            className="relative h-10 rounded-lg overflow-hidden"
                            style={{ backgroundColor: "rgba(192,57,43,0.08)" }}
                          >
                            <div
                              className="absolute top-1/2 -translate-y-1/2 left-2 w-7 h-7 rounded"
                              style={{
                                backgroundColor: C.vermillion,
                                transform: `translateY(-50%) translateX(${durationDemo === "fast" ? "140px" : "0"})`,
                                transition: durationDemo === "fast" ? "transform 0.1s linear" : "none",
                                opacity: 0.7,
                              }}
                            />
                          </div>
                        </div>

                        {/* Slow (correct) */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-xs font-serif font-bold"
                              style={{ color: C.turquoise }}
                            >
                              Slow — 500ms ease-out (impressionist rhythm)
                            </span>
                            <button
                              className="text-xs px-3 py-1 rounded font-serif transition-colors duration-200"
                              style={{
                                backgroundColor: "rgba(26,188,156,0.1)",
                                color: C.turquoise,
                                border: `1px solid rgba(26,188,156,0.3)`,
                              }}
                              onClick={() => setDurationDemo(durationDemo === "slow" ? null : "slow")}
                            >
                              Animate
                            </button>
                          </div>
                          <div
                            className="relative h-10 rounded-lg overflow-hidden"
                            style={{ backgroundColor: "rgba(26,188,156,0.08)" }}
                          >
                            <div
                              className="absolute top-1/2 -translate-y-1/2 left-2 w-7 h-7 rounded"
                              style={{
                                backgroundColor: C.turquoise,
                                transform: `translateY(-50%) translateX(${durationDemo === "slow" ? "140px" : "0"})`,
                                transition: durationDemo === "slow" ? "transform 0.5s ease-out" : "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <p
                        className="text-xs font-mono p-3 rounded"
                        style={{
                          backgroundColor: "rgba(44,62,80,0.05)",
                          color: "rgba(44,62,80,0.6)",
                          border: `1px solid rgba(44,62,80,0.1)`,
                        }}
                      >
                        duration-300 (buttons) / duration-500 (underlines) — never below 300ms
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. DESIGN RULES — DO / DON'T                                  */}
      {/* ============================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: "rgba(232,168,124,0.05)" }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-serif font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: C.gold }}
            >
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: C.blue }}>
              Do &amp; Don&apos;t{" "}
              <span style={{ color: C.primary }}>guidelines</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
              The rules that separate authentic impressionist oil from imitation. Follow the canvas,
              respect the pigment, and let the light breathe.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div
                className="rounded-lg p-8 h-full"
                style={{
                  backgroundColor: C.canvas,
                  border: `1.5px solid rgba(26,188,156,0.35)`,
                  boxShadow: `0 3px 0 rgba(26,188,156,0.2), 0 12px 32px rgba(44,62,80,0.07)`,
                  backgroundImage:
                    "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(26,188,156,0.012) 15px, transparent 16px)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(26,188,156,0.15)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={C.turquoise} strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold" style={{ color: C.turquoise }}>
                    Do — The Impressionist Way
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "使用温暖的画布色 bg-[#f5f0e1] 作为背景",
                    "按钮使用 linear-gradient 模拟颜料管挤出的渐变质感",
                    "使用 layered box-shadow（实色底部 + 模糊扩散）模拟厚涂阴影",
                    "卡片使用 repeating-linear-gradient 作为背景纹理模拟笔触方向",
                    "添加 radial-gradient 光斑叠加模拟斑驳光影",
                    "采用粗体衬线字体 font-serif font-bold 表达艺术感",
                    "边角使用 rounded-lg 保持柔和的画布边缘",
                    "按钮 hover:brightness-110 hover:contrast-125 (颜料在阳光下闪耀)",
                    "按钮 active:translate-y-[3px] (与 4px 实色阴影配合产生按压陷入感)",
                    "卡片使用 group 类，笔触底划线从 w-16 扩展至 group-hover:w-24",
                    "focus:ring-2 focus:ring-[#e8a87c] focus:ring-offset-[#f5f0e1]",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm font-serif leading-relaxed" style={{ color: "rgba(44,62,80,0.7)" }}>
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: C.turquoise }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <div
                className="rounded-lg p-8 h-full"
                style={{
                  backgroundColor: C.canvas,
                  border: `1.5px solid rgba(192,57,43,0.3)`,
                  boxShadow: `0 3px 0 rgba(192,57,43,0.15), 0 12px 32px rgba(44,62,80,0.07)`,
                  backgroundImage:
                    "repeating-linear-gradient(35deg, transparent, transparent 15px, rgba(192,57,43,0.01) 15px, transparent 16px)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(192,57,43,0.1)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={C.vermillion} strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-bold" style={{ color: C.vermillion }}>
                    Don&apos;t — Break the Canvas
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "禁止使用纯平色块（应有纹理感和渐变）",
                    "禁止使用锐利几何边角（rounded-none/rounded-sm）",
                    "禁止使用霓虹色或荧光色",
                    "禁止使用等宽字体（font-mono）",
                    "禁止使用大写文字（uppercase）",
                    "禁止使用像素级精确的偏移阴影（shadow-[Npx_Npx_0px]）",
                    "禁止按钮缺少 active:translate-y-[3px]（实色阴影不做陷入感 = 按钮失真）",
                    "禁止 focus:ring 缺少 focus:ring-offset-[#f5f0e1]",
                    "禁止动画 duration 低于 300ms（印象派节奏是缓慢流动的）",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm font-serif leading-relaxed" style={{ color: "rgba(44,62,80,0.7)" }}>
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: C.vermillion }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PHILOSOPHY                                                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: C.canvas }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-serif font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: C.primary }}
            >
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: C.blue }}>
              The Impressionist{" "}
              <span style={{ color: C.primary }}>canvas manifesto</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
              Five core techniques from the 19th-century French Impressionists, translated
              into CSS properties that any browser can render.
            </p>
          </RevealBlock>

          {/* Five principle cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                number: "01",
                title: "斑驳光影",
                titleEn: "Dappled Light",
                desc: "multiple radial-gradient overlays simulate sunlight filtering through leaves — scattered circles of rgba gold at 5-10% opacity.",
                technique: "radial-gradient(circle 80px at X% Y%, rgba(245,216,138,0.08) 0%, transparent 100%)",
                accent: C.gold,
                icon: <SunIcon className="w-7 h-7" />,
              },
              {
                number: "02",
                title: "笔触纹理",
                titleEn: "Brushstroke Texture",
                desc: "repeating-linear-gradient at 25-40deg angles with 0.02 opacity color stops creates visible directionality on every surface.",
                technique: "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.02) 15px, transparent 16px)",
                accent: C.primary,
                icon: <BrushIcon className="w-7 h-7" />,
              },
              {
                number: "03",
                title: "厚涂堆叠",
                titleEn: "Impasto Depth",
                desc: "Layered box-shadow with a solid color base layer plus a blurred spread layer simulates the physical volume of thick paint.",
                technique: "0 4px 0 #c0392b, 0 6px 16px rgba(232,168,124,0.30)",
                accent: C.vermillion,
                icon: <PaletteIcon className="w-7 h-7" />,
              },
              {
                number: "04",
                title: "画布质感",
                titleEn: "Canvas Grain",
                desc: "Warm canvas cream #f5f0e1 as base. Crosshatch repeating-linear-gradient at 0deg and 90deg for woven texture, opacity 4%.",
                technique: "background: #f5f0e1 + crosshatch repeating-linear-gradient",
                accent: C.blue,
                icon: <FrameIcon className="w-7 h-7" />,
              },
              {
                number: "05",
                title: "色彩调和",
                titleEn: "Harmonic Palette",
                desc: "Warm orange, vermillion, gold, deep blue, turquoise — five pigments in dynamic tension, each with a defined CSS role.",
                technique: "#e8a87c, #c0392b, #f5d88a, #2c3e50, #1abc9c",
                accent: C.turquoise,
                icon: <WaterDropIcon className="w-7 h-7" />,
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.number} delay={i * 0.08}>
                <div
                  className="group rounded-lg p-7 h-full cursor-default transition-all duration-500 ease-out hover:-translate-y-1"
                  style={{
                    backgroundColor: C.canvas,
                    border: `1px solid rgba(232,168,124,0.25)`,
                    boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 8px 28px rgba(44,62,80,0.07)`,
                    backgroundImage:
                      `repeating-linear-gradient(${25 + i * 7}deg, transparent, transparent 15px, rgba(232,168,124,0.015) 15px, transparent 16px)`,
                  }}
                >
                  {/* Number + icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110"
                      style={{
                        backgroundColor: `${principle.accent}18`,
                        color: principle.accent,
                      }}
                    >
                      {principle.icon}
                    </div>
                    <span
                      className="text-4xl font-serif font-bold"
                      style={{ color: `${principle.accent}30` }}
                    >
                      {principle.number}
                    </span>
                  </div>

                  <div
                    className="text-xs font-serif font-bold tracking-[0.12em] uppercase mb-1"
                    style={{ color: principle.accent }}
                  >
                    {principle.titleEn}
                  </div>
                  <h4
                    className="text-lg font-serif font-bold mb-3"
                    style={{ color: C.blue }}
                  >
                    {principle.title}
                  </h4>

                  {/* Brushstroke reveal */}
                  <div
                    className="h-[2px] rounded-full mb-4 transition-all duration-500 ease-out"
                    style={{
                      width: "3rem",
                      backgroundColor: principle.accent,
                      opacity: 0.7,
                    }}
                  />

                  <p
                    className="text-sm font-serif leading-relaxed mb-4"
                    style={{ color: "rgba(44,62,80,0.55)" }}
                  >
                    {principle.desc}
                  </p>

                  <code
                    className="block text-[10px] p-2.5 rounded font-mono leading-relaxed break-all"
                    style={{
                      backgroundColor: "rgba(44,62,80,0.04)",
                      color: "rgba(44,62,80,0.55)",
                      border: `1px solid rgba(44,62,80,0.08)`,
                    }}
                  >
                    {principle.technique}
                  </code>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Philosophy quote */}
          <RevealBlock delay={0.2}>
            <div
              className="rounded-lg p-10 md:p-14 text-center relative overflow-hidden"
              style={{
                backgroundColor: C.canvas,
                border: `1px solid rgba(232,168,124,0.25)`,
                boxShadow: `0 3px 0 rgba(192,57,43,0.1), 0 20px 60px rgba(44,62,80,0.09)`,
                backgroundImage:
                  "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.018) 15px, transparent 16px)",
              }}
            >
              {/* Dappled light overlay on quote block */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle 120px at 10% 30%, rgba(245,216,138,0.08) 0%, transparent 100%),
                    radial-gradient(circle 80px at 90% 70%, rgba(232,168,124,0.07) 0%, transparent 100%),
                    radial-gradient(circle 60px at 50% 10%, rgba(245,216,138,0.06) 0%, transparent 100%)
                  `,
                }}
              />

              {/* Large opening quote mark */}
              <div
                className="text-8xl font-serif leading-none mb-4 relative z-10"
                style={{ color: `${C.primary}30` }}
              >
                &ldquo;
              </div>

              <p
                className="text-xl md:text-2xl font-serif leading-relaxed max-w-3xl mx-auto mb-6 relative z-10"
                style={{ color: C.blue }}
              >
                油画印象派风格汲取19世纪法国印象派绘画的精髓，强调光影变化和色彩的即兴表达。
              </p>

              {/* Brushstroke divider */}
              <div
                className="h-[3px] rounded-full mx-auto mb-6 relative z-10"
                style={{
                  width: "8rem",
                  background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
                  opacity: 0.7,
                }}
              />

              <div
                className="flex flex-wrap justify-center gap-3 relative z-10"
              >
                {["斑驳光影", "笔触纹理", "厚涂堆叠", "画布质感", "色彩调和"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded text-xs font-serif font-bold"
                    style={{
                      backgroundColor: "rgba(232,168,124,0.12)",
                      color: C.primary,
                      border: `1px solid rgba(232,168,124,0.3)`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FOOTER                                                     */}
      {/* ============================================================ */}
      <footer
        className="relative overflow-hidden"
        style={{
          backgroundColor: C.canvas,
          borderTop: "1px solid rgba(232,168,124,0.2)",
        }}
      >
        {/* Canvas texture in footer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.02) 3px, transparent 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.015) 3px, transparent 4px)",
            opacity: 0.6,
          }}
        />

        {/* Dappled light in footer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle 100px at 15% 40%, rgba(245,216,138,0.07) 0%, transparent 100%),
              radial-gradient(circle 80px at 85% 60%, rgba(232,168,124,0.06) 0%, transparent 100%)
            `,
          }}
        />

        {/* Golden gradient bar at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-40 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.gold}, transparent)`,
            opacity: 0.6,
          }}
        />

        {/* Floating brush decoration */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none imp-float"
          style={{ color: `${C.primary}40` }}
        >
          <BrushIcon className="w-6 h-6" />
        </div>

        {/* Scattered accents */}
        <div className="absolute top-8 left-8 pointer-events-none" style={{ color: `${C.gold}50` }}>
          <SunIcon className="w-5 h-5" />
        </div>
        <div className="absolute top-16 right-20 pointer-events-none" style={{ color: `${C.primary}40` }}>
          <WaterDropIcon className="w-4 h-4" />
        </div>
        <div className="absolute bottom-12 left-1/4 pointer-events-none" style={{ color: `${C.turquoise}30` }}>
          <PaletteIcon className="w-6 h-6" />
        </div>
        <div className="absolute bottom-10 right-1/3 pointer-events-none" style={{ color: `${C.vermillion}25` }}>
          <FrameIcon className="w-5 h-5" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative z-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)",
                  }}
                >
                  <BrushIcon className="w-4 h-4" style={{ color: C.blue } as React.CSSProperties} />
                </div>
                <span className="text-xl font-serif font-bold" style={{ color: C.blue }}>
                  Impressionist<span style={{ color: C.primary }}> Oil</span>
                </span>
              </div>
              <p className="text-sm font-serif leading-relaxed" style={{ color: "rgba(44,62,80,0.5)" }}>
                Monet and Renoir&apos;s painterly light, translated into CSS — brushstroke
                textures, dappled gradients, and impasto shadows.
              </p>
              {/* Mini palette swatches */}
              <div className="flex gap-2">
                {[C.primary, C.gold, C.vermillion, C.turquoise, C.blue].map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded transition-all duration-300 hover:scale-125 hover:-translate-y-0.5 cursor-default"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 2px 0 rgba(192,57,43,0.15)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-serif font-bold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(44,62,80,0.4)" }}
                >
                  Style
                </span>
                <Link
                  href="/styles/impressionist-oil"
                  className="font-serif transition-colors duration-300 hover:underline"
                  style={{ color: "rgba(44,62,80,0.55)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.primary)}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(44,62,80,0.55)")}
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/impressionist-oil/showcase"
                  className="font-serif transition-colors duration-300 hover:underline"
                  style={{ color: "rgba(44,62,80,0.55)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.primary)}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(44,62,80,0.55)")}
                >
                  Showcase
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-serif font-bold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(44,62,80,0.4)" }}
                >
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="font-serif transition-colors duration-300 hover:underline"
                  style={{ color: "rgba(44,62,80,0.55)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.primary)}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(44,62,80,0.55)")}
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="font-serif transition-colors duration-300 hover:underline"
                  style={{ color: "rgba(44,62,80,0.55)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.primary)}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(44,62,80,0.55)")}
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-serif font-bold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(44,62,80,0.4)" }}
                >
                  Palette
                </span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-xs font-serif" style={{ color: "rgba(44,62,80,0.5)" }}>
                    <span
                      className="w-3 h-3 rounded shrink-0"
                      style={{
                        backgroundColor: s.hex,
                        border: s.hex === C.canvas ? `1px solid rgba(232,168,124,0.4)` : "none",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Brushstroke divider */}
          <div
            className="h-px mb-8 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(232,168,124,0.4), transparent)`,
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-serif" style={{ color: "rgba(44,62,80,0.45)" }}>
              <span>Painted with</span>
              <BrushIcon className="w-4 h-4 imp-pigment-glow" style={{ color: C.primary } as React.CSSProperties} />
              <span>for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-serif font-bold text-sm tracking-wide transition-all duration-300 ease-out hover:brightness-110 hover:contrast-125 hover:-translate-y-0.5 active:translate-y-[3px]"
              style={{
                background: "linear-gradient(135deg, rgba(232,168,124,0.2) 0%, rgba(245,216,138,0.15) 100%)",
                color: C.primary,
                border: `1.5px solid rgba(232,168,124,0.4)`,
              }}
            >
              <span>&#8592;</span>
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
