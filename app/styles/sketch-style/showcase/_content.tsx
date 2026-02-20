"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
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
/*  SVG Doodle components                                               */
/* ------------------------------------------------------------------ */

function WaveUnderline({ color = "#2c2c2c", width = 120 }: { color?: string; width?: number }) {
  return (
    <svg
      viewBox={`0 0 ${width} 12`}
      width={width}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path
        d={`M2 8 Q${width * 0.125} 2 ${width * 0.25} 8 Q${width * 0.375} 14 ${width * 0.5} 8 Q${width * 0.625} 2 ${width * 0.75} 8 Q${width * 0.875} 14 ${width - 2} 8`}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function AsteriskDoodle({ size = 24, color = "#2c2c2c" }: { size?: number; color?: string }) {
  const c = size / 2;
  const r = size * 0.42;
  const lines = [0, 45, 90, 135];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      {lines.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = c + r * Math.cos(rad);
        const y1 = c + r * Math.sin(rad);
        const x2 = c - r * Math.cos(rad);
        const y2 = c - r * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

function ArrowDoodle({
  direction = "right",
  color = "#2c2c2c",
  size = 32,
}: {
  direction?: "right" | "down" | "left";
  color?: string;
  size?: number;
}) {
  const paths: Record<string, string> = {
    right: "M4 16 Q12 14 24 16 M18 10 L26 16 L18 22",
    down: "M16 4 Q14 12 16 24 M10 18 L16 26 L22 18",
    left: "M28 16 Q20 14 8 16 M14 10 L6 16 L14 22",
  };
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <path
        d={paths[direction]}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

function CircleDoodle({
  size = 48,
  color = "#e74c3c",
  strokeWidth = 2,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const c = size / 2;
  const r = size * 0.42;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      <path
        d={`M${c + r * 0.05} ${c - r} Q${c + r * 1.15} ${c - r * 0.9} ${c + r * 0.95} ${c + r * 0.05} Q${c + r * 1.1} ${c + r * 1.1} ${c - r * 0.1} ${c + r * 0.95} Q${c - r * 1.15} ${c + r * 1.05} ${c - r * 0.95} ${c - r * 0.1} Q${c - r * 1.0} ${c - r * 1.1} ${c + r * 0.05} ${c - r}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.65"
        fill="none"
      />
    </svg>
  );
}

function CornerDoodles() {
  return (
    <>
      {/* Top-left: asterisk cluster */}
      <div className="absolute top-8 left-6 pointer-events-none select-none" style={{ transform: "rotate(-5deg)" }}>
        <AsteriskDoodle size={20} color="#2c2c2c" />
      </div>
      <div className="absolute top-14 left-12 pointer-events-none select-none" style={{ transform: "rotate(8deg)" }}>
        <AsteriskDoodle size={14} color="#3498db" />
      </div>
      {/* Top-right: arrow pointing down */}
      <div className="absolute top-6 right-8 pointer-events-none select-none" style={{ transform: "rotate(10deg)" }}>
        <ArrowDoodle direction="down" color="#2c2c2c" size={28} />
      </div>
      <div className="absolute top-16 right-16 pointer-events-none select-none" style={{ transform: "rotate(-8deg)" }}>
        <AsteriskDoodle size={16} color="#e74c3c" />
      </div>
      {/* Bottom-left: small circle */}
      <div className="absolute bottom-10 left-8 pointer-events-none select-none" style={{ transform: "rotate(3deg)" }}>
        <CircleDoodle size={36} color="#27ae60" strokeWidth={1.8} />
      </div>
      {/* Bottom-right: wave underline snippet */}
      <div className="absolute bottom-8 right-10 pointer-events-none select-none" style={{ transform: "rotate(-4deg)" }}>
        <WaveUnderline color="#f39c12" width={60} />
      </div>
    </>
  );
}

function MarginNote({
  children,
  color = "#e74c3c",
  rotate = "rotate-[-1deg]",
}: {
  children: React.ReactNode;
  color?: string;
  rotate?: string;
}) {
  return (
    <span
      className={`inline-block text-xs font-sans font-semibold tracking-wide px-2 py-0.5 ${rotate}`}
      style={{ color, borderBottom: `1.5px solid ${color}`, opacity: 0.85 }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const colorPalette = [
  { name: "Pencil Black", hex: "#2c2c2c", label: "primary", textLight: true },
  { name: "Sketch Paper", hex: "#f5f0e8", label: "secondary", textLight: false },
  { name: "Red Pen", hex: "#e74c3c", label: "accent", textLight: true },
  { name: "Blue Pen", hex: "#3498db", label: "accent", textLight: true },
  { name: "Green Marker", hex: "#27ae60", label: "accent", textLight: true },
  { name: "Yellow Highlight", hex: "#f39c12", label: "accent", textLight: false },
];

const doRules = [
  "Paper background bg-[#f5f0e8] as the base layer",
  "border-2 border-dashed or solid border-[#2c2c2c]",
  "Hand-sketch shadow: shadow-[3px_3px_0_rgba(44,44,44,0.15)]",
  "Slight rotations rotate-[0.5deg] and rotate-[-1deg]",
  "Inline SVG doodles: asterisk, arrow, wave underline, circle",
  "font-serif for headings to feel handwritten-adjacent",
  "Red/blue annotation text for callouts and margin notes",
  "rounded-xl for approachability, never sharp corners",
];

const dontRules = [
  "No perfectly sharp digital edges or flat drop shadows",
  "No dark or solid backgrounds — keep the paper feeling",
  "No neon or overly saturated single-accent designs",
  "No perfectly symmetric grids — let things breathe slightly",
  "No sans-serif-only layouts — lose the sketchbook character",
  "No clean icon sets without the pencil-drawn imperfection",
];

const typographyExamples = [
  {
    label: "H1 — Sketchbook Title",
    sample: "The Art of Thinking",
    className: "text-4xl font-serif font-bold text-[#2c2c2c]",
    spec: "font-serif, 36px, bold",
  },
  {
    label: "H2 — Section Header",
    sample: "Rough Ideas, Clear Vision",
    className: "text-2xl font-serif font-semibold text-[#2c2c2c]",
    spec: "font-serif, 24px, semibold",
  },
  {
    label: "Body — Pencil notes",
    sample: "Every great design begins as a sketch on paper — imperfect, alive, full of potential.",
    className: "text-base font-sans text-[#2c2c2c]/80 leading-relaxed",
    spec: "font-sans, 16px, regular",
  },
  {
    label: "Annotation — Red pen",
    sample: "* see note below",
    className: "text-sm font-sans font-semibold text-[#e74c3c]",
    spec: "font-sans, 14px, semibold, red",
  },
  {
    label: "Caption — Pencil light",
    sample: "Fig. 3 — Initial concept sketch, Feb 2026",
    className: "text-xs font-sans text-[#2c2c2c]/50 italic",
    spec: "font-sans, 12px, italic",
  },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const [componentTab, setComponentTab] = useState<"buttons" | "cards" | "inputs">("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#2c2c2c] overflow-x-hidden">

      {/* ============================================================ */}
      {/* 1. Fixed Navigation                                           */}
      {/* ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e8]/95 backdrop-blur-sm border-b-2 border-[#2c2c2c]/20"
        style={{ boxShadow: "0 2px 0 rgba(44,44,44,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14" style={{ transform: "rotate(0.1deg)" }}>
            {/* Brand mark */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 border-2 border-[#2c2c2c] flex items-center justify-center rounded-lg"
                style={{
                  transform: "rotate(-1deg)",
                  boxShadow: "2px 2px 0 rgba(44,44,44,0.18)",
                }}
              >
                <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                  <path
                    d="M3 13L5 5L9 9L11 4L13 13"
                    stroke="#2c2c2c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-serif text-base font-semibold text-[#2c2c2c] tracking-tight">
                Sketch Style
              </span>
              {/* Hand-drawn underline beneath brand */}
              <span className="hidden sm:block" style={{ transform: "rotate(-0.5deg)", marginTop: 2 }}>
                <WaveUnderline color="#2c2c2c" width={80} />
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-5">
              <span className="hidden md:block text-xs font-sans text-[#3498db] font-semibold" style={{ transform: "rotate(-0.5deg)" }}>
                * hand-drawn UI
              </span>
              <Link
                href="/"
                className="text-sm font-sans text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors duration-200 flex items-center gap-1.5 group"
              >
                <ArrowDoodle direction="left" size={16} color="#2c2c2c" />
                <span className="group-hover:underline underline-offset-2 decoration-dashed">StyleKit</span>
                <span className="text-[#e74c3c] font-bold ml-0.5">→</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero Section                                               */}
      {/* ============================================================ */}
      <section
        className="relative pt-28 md:pt-36 pb-20 px-6 md:px-12 overflow-hidden min-h-[90vh] flex items-center"
        style={{ background: "#f5f0e8" }}
      >
        {/* Corner doodles */}
        <div className="hidden md:block">
          <CornerDoodles />
        </div>

        {/* Ruled lines in background — notebook feel */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035 }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-b border-[#2c2c2c]"
              style={{ top: `${i * 36 + 60}px` }}
            />
          ))}
          {/* Left margin line */}
          <div className="absolute top-0 bottom-0 border-r-2 border-[#e74c3c]" style={{ left: 72 }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Annotation label */}
          <div
            ref={heroRef}
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MarginNote color="#3498db" rotate="rotate-[-0.5deg]">Design System No.7</MarginNote>
              <AsteriskDoodle size={18} color="#3498db" />
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.08s",
            }}
          >
            <h1
              className="font-serif font-bold leading-none text-[#2c2c2c] mb-3"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                transform: "rotate(-0.5deg)",
                letterSpacing: "-0.02em",
              }}
            >
              铅笔手绘风
            </h1>
          </div>

          {/* Subtitle with pencil underline SVG */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(36px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <div className="inline-block mb-8" style={{ transform: "rotate(0.4deg)" }}>
              <h2
                className="font-serif text-3xl md:text-5xl font-semibold text-[#2c2c2c]"
                style={{ letterSpacing: "-0.01em" }}
              >
                Sketch Style
              </h2>
              <WaveUnderline color="#e74c3c" width={260} />
            </div>
          </div>

          {/* Description and annotations */}
          <div
            className="grid md:grid-cols-2 gap-10 items-start"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <div>
              <p
                className="font-sans text-base text-[#2c2c2c]/70 leading-relaxed mb-5"
                style={{ transform: "rotate(0.2deg)" }}
              >
                Pencil sketches and hand-drawn imperfections. Paper texture, notebook margins,
                and the honest rawness of a design that has not forgotten where it came from —
                a human hand holding a pencil.
              </p>

              {/* Color annotation callouts */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-2.5 py-1 rounded"
                  style={{
                    color: "#e74c3c",
                    border: "1.5px solid #e74c3c",
                    transform: "rotate(-1deg)",
                    background: "rgba(231,76,60,0.07)",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e74c3c", display: "inline-block" }} />
                  Red pen accent
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-2.5 py-1 rounded"
                  style={{
                    color: "#3498db",
                    border: "1.5px solid #3498db",
                    transform: "rotate(0.8deg)",
                    background: "rgba(52,152,219,0.07)",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3498db", display: "inline-block" }} />
                  Blue pen note
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-2.5 py-1 rounded"
                  style={{
                    color: "#27ae60",
                    border: "1.5px solid #27ae60",
                    transform: "rotate(-0.5deg)",
                    background: "rgba(39,174,96,0.07)",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27ae60", display: "inline-block" }} />
                  Green marker
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  className="relative px-7 py-3 bg-[#2c2c2c] text-[#f5f0e8] font-sans text-sm font-semibold rounded-xl border-2 border-[#2c2c2c] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                  style={{
                    transform: "rotate(-0.5deg)",
                    boxShadow: "3px 3px 0 rgba(44,44,44,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "5px 5px 0 rgba(44,44,44,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "3px 3px 0 rgba(44,44,44,0.2)";
                  }}
                >
                  Explore Style
                </button>
                <button
                  className="px-7 py-3 bg-transparent text-[#2c2c2c] font-sans text-sm font-semibold rounded-xl border-2 border-dashed border-[#2c2c2c]/50 hover:border-[#2c2c2c] transition-all duration-200"
                  style={{ transform: "rotate(0.4deg)" }}
                >
                  View Source
                </button>
              </div>
            </div>

            {/* Hero doodle panel — mini notebook sketch */}
            <div
              className="relative bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-xl p-5 hidden md:block"
              style={{
                transform: "rotate(1deg)",
                boxShadow: "4px 4px 0 rgba(44,44,44,0.14)",
              }}
            >
              {/* Ruled lines inside notebook panel */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-[#2c2c2c]/10"
                    style={{ top: `${i * 26 + 38}px` }}
                  />
                ))}
                <div className="absolute top-0 bottom-0 border-r border-[#e74c3c]/20" style={{ left: 36 }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2c2c2c]/20">
                  <svg viewBox="0 0 20 20" width={16} height={16} fill="none">
                    <rect x="2" y="2" width="16" height="16" rx="2" stroke="#2c2c2c" strokeWidth="1.5" />
                    <path d="M5 6h10M5 10h7M5 14h5" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="font-serif text-xs font-semibold text-[#2c2c2c]/60">design notes.sketch</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[#e74c3c] font-sans font-bold text-sm mt-0.5">1.</span>
                    <p className="font-sans text-xs text-[#2c2c2c]/70 leading-relaxed">
                      Paper background. Always{" "}
                      <span className="font-semibold text-[#2c2c2c]">#f5f0e8</span>. Never white.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#3498db] font-sans font-bold text-sm mt-0.5">2.</span>
                    <p className="font-sans text-xs text-[#2c2c2c]/70 leading-relaxed">
                      Borders: dashed or solid, never transparent. Pencil color only.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#27ae60] font-sans font-bold text-sm mt-0.5">3.</span>
                    <p className="font-sans text-xs text-[#2c2c2c]/70 leading-relaxed">
                      Shadows: 3px offset, low opacity. Feels like pencil pressure.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#f39c12] font-sans font-bold text-sm mt-0.5">4.</span>
                    <p className="font-sans text-xs text-[#2c2c2c]/70 leading-relaxed">
                      Rotation: plus or minus 1deg on cards. Nothing is perfectly level.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2c2c2c]/15 flex items-center justify-between">
                  <WaveUnderline color="#e74c3c" width={70} />
                  <div className="flex items-center gap-1">
                    <AsteriskDoodle size={14} color="#3498db" />
                    <span className="font-sans text-[10px] text-[#3498db] font-semibold">important!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Component Demos                                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MarginNote color="#e74c3c" rotate="rotate-[-1deg]">Components</MarginNote>
                <CircleDoodle size={24} color="#e74c3c" strokeWidth={1.5} />
              </div>
              <h2
                className="font-serif text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-1"
                style={{ transform: "rotate(-0.3deg)" }}
              >
                UI Elements
              </h2>
              <WaveUnderline color="#2c2c2c" width={160} />
              <p className="font-sans text-sm text-[#2c2c2c]/60 mt-3 max-w-md leading-relaxed">
                Each component carries the pencil-mark character of a designer&apos;s sketchbook.
                Dashed borders, slight rotations, offset shadows.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* Tab switcher */}
        <RevealBlock delay={0.08} className="mb-10">
          <div
            className="inline-flex items-center gap-1 border-2 border-[#2c2c2c] rounded-xl p-1 bg-[#f5f0e8]"
            style={{
              transform: "rotate(-0.3deg)",
              boxShadow: "3px 3px 0 rgba(44,44,44,0.12)",
            }}
          >
            {(["buttons", "cards", "inputs"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setComponentTab(tab)}
                className={`px-5 py-2 rounded-lg font-sans text-sm font-semibold transition-all duration-200 ${
                  componentTab === tab
                    ? "bg-[#2c2c2c] text-[#f5f0e8]"
                    : "text-[#2c2c2c]/60 hover:text-[#2c2c2c] hover:bg-[#2c2c2c]/08"
                }`}
                style={
                  componentTab === tab
                    ? { boxShadow: "1px 1px 0 rgba(44,44,44,0.15)" }
                    : {}
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.12}>
          {/* Buttons panel */}
          {componentTab === "buttons" && (
            <div
              className="relative bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-xl p-8 md:p-12"
              style={{
                transform: "rotate(0.3deg)",
                boxShadow: "4px 4px 0 rgba(44,44,44,0.13)",
              }}
            >
              {/* Panel doodles */}
              <div className="absolute top-4 right-6 pointer-events-none" style={{ transform: "rotate(5deg)" }}>
                <AsteriskDoodle size={18} color="#2c2c2c" />
              </div>
              <div className="absolute bottom-4 left-6 pointer-events-none" style={{ transform: "rotate(-8deg)" }}>
                <ArrowDoodle direction="right" color="#3498db" size={24} />
              </div>

              {/* Ruled lines */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-[#2c2c2c]/06"
                    style={{ top: `${i * 44 + 40}px` }}
                  />
                ))}
              </div>

              <div className="relative z-10 space-y-8">
                {/* Primary buttons */}
                <div>
                  <p className="font-sans text-xs font-semibold text-[#e74c3c] mb-4 tracking-widest uppercase">
                    Primary Actions
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button
                      className="group px-6 py-2.5 bg-[#2c2c2c] text-[#f5f0e8] font-sans text-sm font-semibold rounded-xl border-2 border-[#2c2c2c] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                      style={{
                        transform: "rotate(-0.8deg)",
                        boxShadow: "3px 3px 0 rgba(44,44,44,0.18)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(44,44,44,0.2)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(44,44,44,0.18)"; }}
                    >
                      Pencil Fill
                    </button>
                    <button
                      className="px-6 py-2.5 bg-[#e74c3c] text-white font-sans text-sm font-semibold rounded-xl border-2 border-[#e74c3c] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                      style={{
                        transform: "rotate(0.6deg)",
                        boxShadow: "3px 3px 0 rgba(231,76,60,0.25)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(231,76,60,0.28)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(231,76,60,0.25)"; }}
                    >
                      Red Pen
                    </button>
                    <button
                      className="px-6 py-2.5 bg-[#3498db] text-white font-sans text-sm font-semibold rounded-xl border-2 border-[#3498db] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                      style={{
                        transform: "rotate(-0.4deg)",
                        boxShadow: "3px 3px 0 rgba(52,152,219,0.25)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(52,152,219,0.28)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(52,152,219,0.25)"; }}
                    >
                      Blue Pen
                    </button>
                    <button
                      className="px-6 py-2.5 bg-[#27ae60] text-white font-sans text-sm font-semibold rounded-xl border-2 border-[#27ae60] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                      style={{
                        transform: "rotate(0.8deg)",
                        boxShadow: "3px 3px 0 rgba(39,174,96,0.25)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(39,174,96,0.28)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(39,174,96,0.25)"; }}
                    >
                      Green Mark
                    </button>
                  </div>
                </div>

                {/* Outline / dashed border buttons */}
                <div>
                  <p className="font-sans text-xs font-semibold text-[#3498db] mb-4 tracking-widest uppercase">
                    Sketch Outline
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button
                      className="px-6 py-2.5 bg-transparent text-[#2c2c2c] font-sans text-sm font-semibold rounded-xl border-2 border-dashed border-[#2c2c2c] hover:bg-[#2c2c2c]/06 transition-all duration-200"
                      style={{ transform: "rotate(-0.5deg)" }}
                    >
                      Dashed Border
                    </button>
                    <button
                      className="px-6 py-2.5 bg-transparent text-[#e74c3c] font-sans text-sm font-semibold rounded-xl border-2 border-dashed border-[#e74c3c] hover:bg-[#e74c3c]/06 transition-all duration-200"
                      style={{ transform: "rotate(0.7deg)" }}
                    >
                      Red Outline
                    </button>
                    <button
                      className="px-6 py-2.5 font-sans text-sm font-semibold rounded-xl border-2 border-[#f39c12] text-[#2c2c2c] transition-all duration-200"
                      style={{
                        transform: "rotate(-0.3deg)",
                        background: "rgba(243,156,18,0.18)",
                        boxShadow: "2px 2px 0 rgba(243,156,18,0.2)",
                      }}
                    >
                      Highlighted
                    </button>
                  </div>
                </div>

                {/* Hover annotation */}
                <div className="flex items-center gap-2 pt-2">
                  <ArrowDoodle direction="right" color="#e74c3c" size={20} />
                  <span className="font-sans text-xs text-[#e74c3c] font-semibold">
                    hover lifts 0.5px, shadow deepens — pencil pressed harder
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Cards panel */}
          {componentTab === "cards" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Notebook card */}
              <div
                className="group relative bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-xl p-6 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{
                  transform: "rotate(-1deg)",
                  boxShadow: "3px 3px 0 rgba(44,44,44,0.15)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(44,44,44,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(44,44,44,0.15)"; }}
              >
                {/* Ruled lines inside card */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-b border-[#2c2c2c]/08"
                      style={{ top: `${i * 28 + 44}px` }}
                    />
                  ))}
                  <div className="absolute top-0 bottom-0 border-r border-[#e74c3c]/15" style={{ left: 28 }} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <MarginNote color="#3498db" rotate="rotate-[0.5deg]">Concept A</MarginNote>
                    <AsteriskDoodle size={16} color="#3498db" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-2">The Notebook Card</h3>
                  <p className="font-sans text-sm text-[#2c2c2c]/65 leading-relaxed">
                    Ruled lines behind content, left margin in red — just like a real composition notebook from high school.
                  </p>
                  <div className="mt-4 pt-3 border-t border-dashed border-[#2c2c2c]/25">
                    <WaveUnderline color="#e74c3c" width={80} />
                  </div>
                </div>
              </div>

              {/* Simple sketch card */}
              <div
                className="group relative bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c] rounded-xl p-6 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{
                  transform: "rotate(0.8deg)",
                  boxShadow: "3px 3px 0 rgba(44,44,44,0.13)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(44,44,44,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(44,44,44,0.13)"; }}
              >
                <div className="relative z-10">
                  <div className="mb-3">
                    <span className="font-sans text-xs font-semibold text-[#27ae60] uppercase tracking-widest">green marker</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-2">Dashed Border Card</h3>
                  <p className="font-sans text-sm text-[#2c2c2c]/65 leading-relaxed">
                    Dashed borders convey incompleteness — this design is still in progress, still being sketched out.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <CircleDoodle size={20} color="#27ae60" strokeWidth={1.5} />
                    <span className="font-sans text-xs text-[#27ae60] font-semibold">approve</span>
                  </div>
                </div>
              </div>

              {/* Annotated card */}
              <div
                className="group relative bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-xl p-6 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{
                  transform: "rotate(-0.5deg)",
                  boxShadow: "3px 3px 0 rgba(44,44,44,0.15)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(44,44,44,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(44,44,44,0.15)"; }}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <MarginNote color="#e74c3c" rotate="rotate-[-0.8deg]">IMPORTANT</MarginNote>
                    <div style={{ transform: "rotate(6deg)" }}>
                      <ArrowDoodle direction="down" color="#e74c3c" size={20} />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2c2c2c] mb-2">Annotated Card</h3>
                  <p className="font-sans text-sm text-[#2c2c2c]/65 leading-relaxed">
                    Red pen annotations draw the eye. Blue underlines reference sources. The page breathes with hand-applied marks.
                  </p>
                  <div className="mt-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-[#3498db]/60" />
                      <span className="font-sans text-xs text-[#3498db] font-semibold">ref: design-system v2.1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-[#e74c3c]/60" />
                      <span className="font-sans text-xs text-[#e74c3c] font-semibold">* revise before final</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inputs panel */}
          {componentTab === "inputs" && (
            <div
              className="relative bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-xl p-8 md:p-12"
              style={{
                transform: "rotate(-0.3deg)",
                boxShadow: "4px 4px 0 rgba(44,44,44,0.13)",
              }}
            >
              {/* Ruled lines */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-[#2c2c2c]/06"
                    style={{ top: `${i * 48 + 36}px` }}
                  />
                ))}
              </div>

              <div className="relative z-10 max-w-lg space-y-6">
                <div>
                  <label className="block font-sans text-sm font-semibold text-[#2c2c2c]/70 mb-1.5">
                    Your name{" "}
                    <span className="text-[#e74c3c] font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Write your name here..."
                    className="w-full px-4 py-3 bg-[#f5f0e8] border-2 border-[#2c2c2c]/40 rounded-xl font-sans text-sm text-[#2c2c2c] placeholder-[#2c2c2c]/35 focus:outline-none focus:border-[#2c2c2c] transition-all duration-200"
                    style={{ boxShadow: "2px 2px 0 rgba(44,44,44,0.08)" }}
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-semibold text-[#2c2c2c]/70 mb-1.5">
                    Email address{" "}
                    <span className="text-[#3498db] font-semibold text-xs italic">— blue pen required</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@notebook.com"
                    className="w-full px-4 py-3 bg-[#f5f0e8] border-2 border-dashed border-[#3498db]/50 rounded-xl font-sans text-sm text-[#2c2c2c] placeholder-[#2c2c2c]/35 focus:outline-none focus:border-[#3498db] transition-all duration-200"
                    style={{ boxShadow: "2px 2px 0 rgba(52,152,219,0.1)" }}
                  />
                </div>

                <div>
                  <label className="block font-sans text-sm font-semibold text-[#2c2c2c]/70 mb-1.5">
                    Your thoughts
                  </label>
                  <textarea
                    placeholder="Sketch your ideas here. Don't worry about being perfect..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#f5f0e8] border-2 border-[#2c2c2c]/40 rounded-xl font-sans text-sm text-[#2c2c2c] placeholder-[#2c2c2c]/35 focus:outline-none focus:border-[#2c2c2c] transition-all duration-200 resize-none"
                    style={{ boxShadow: "2px 2px 0 rgba(44,44,44,0.08)" }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="px-7 py-2.5 bg-[#2c2c2c] text-[#f5f0e8] font-sans text-sm font-semibold rounded-xl border-2 border-[#2c2c2c] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
                    style={{ boxShadow: "3px 3px 0 rgba(44,44,44,0.18)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "5px 5px 0 rgba(44,44,44,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 rgba(44,44,44,0.18)"; }}
                  >
                    Submit
                  </button>
                  <button
                    className="px-7 py-2.5 bg-transparent text-[#2c2c2c]/60 font-sans text-sm font-semibold rounded-xl border-2 border-dashed border-[#2c2c2c]/30 hover:text-[#2c2c2c] hover:border-[#2c2c2c]/50 transition-all duration-200"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <AsteriskDoodle size={14} color="#3498db" />
                  <span className="font-sans text-xs text-[#3498db] font-semibold italic">
                    focus state removes dashed border — becomes solid pencil line
                  </span>
                </div>
              </div>
            </div>
          )}
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 4. Color Palette                                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <MarginNote color="#27ae60" rotate="rotate-[0.5deg]">Palette</MarginNote>
            <WaveUnderline color="#27ae60" width={50} />
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-1"
            style={{ transform: "rotate(0.3deg)" }}
          >
            Color Palette
          </h2>
          <WaveUnderline color="#2c2c2c" width={140} />
          <p className="font-sans text-sm text-[#2c2c2c]/60 mt-3 max-w-md leading-relaxed">
            Six colors drawn from the artist&apos;s desk: pencil graphite, cream paper, and the bold marks of red, blue, and green writing instruments.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalette.map((color, i) => {
            const rotations = [-1.2, 0.8, -0.5, 1, -0.8, 0.6];
            const rot = rotations[i % rotations.length];
            const isHovered = hoveredSwatch === color.hex;
            return (
              <RevealBlock key={color.hex} delay={i * 0.06}>
                <div
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    transform: isHovered
                      ? `rotate(${rot * 0.3}deg) translateY(-3px)`
                      : `rotate(${rot}deg)`,
                  }}
                  onMouseEnter={() => setHoveredSwatch(color.hex)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: `2px solid ${color.hex === "#f5f0e8" ? "#2c2c2c" : color.hex}`,
                      boxShadow: isHovered
                        ? "5px 5px 0 rgba(44,44,44,0.2)"
                        : "3px 3px 0 rgba(44,44,44,0.13)",
                    }}
                  >
                    {/* Color swatch */}
                    <div
                      className="h-24 flex items-end p-3"
                      style={{
                        backgroundColor: color.hex,
                        borderBottom: `2px solid ${color.hex === "#f5f0e8" ? "#2c2c2c" : color.hex}`,
                      }}
                    >
                      <span
                        className="font-sans text-[10px] font-mono font-semibold"
                        style={{ color: color.textLight ? "rgba(245,240,232,0.85)" : "rgba(44,44,44,0.7)" }}
                      >
                        {color.hex}
                      </span>
                    </div>

                    {/* Label area */}
                    <div className="p-3 bg-[#f5f0e8]">
                      <p className="font-sans text-xs font-bold text-[#2c2c2c] mb-0.5">{color.name}</p>
                      <span
                        className="font-sans text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "#2c2c2c", opacity: 0.45 }}
                      >
                        {color.label}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>

        {/* Color annotation row */}
        <RevealBlock delay={0.15} className="mt-8">
          <div
            className="flex flex-wrap items-center gap-4 p-5 border-2 border-dashed border-[#2c2c2c]/30 rounded-xl"
            style={{ transform: "rotate(-0.2deg)" }}
          >
            <div className="flex items-center gap-2">
              <ArrowDoodle direction="right" color="#e74c3c" size={20} />
              <span className="font-sans text-xs text-[#e74c3c] font-semibold">Red = urgent / emphasis</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDoodle direction="right" color="#3498db" size={20} />
              <span className="font-sans text-xs text-[#3498db] font-semibold">Blue = notes / reference</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDoodle direction="right" color="#27ae60" size={20} />
              <span className="font-sans text-xs text-[#27ae60] font-semibold">Green = approved / done</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDoodle direction="right" color="#f39c12" size={20} />
              <span className="font-sans text-xs text-[#f39c12] font-semibold">Yellow = highlight / flag</span>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 5. Typography                                                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <MarginNote color="#f39c12" rotate="rotate-[-0.8deg]">Typography</MarginNote>
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-1"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            Type System
          </h2>
          <WaveUnderline color="#f39c12" width={120} />
          <p className="font-sans text-sm text-[#2c2c2c]/60 mt-3 max-w-md leading-relaxed">
            Serif for headings — a nod to the handwritten notebook. Sans-serif body text for legibility. Color for annotations.
          </p>
        </RevealBlock>

        <div className="space-y-4">
          {typographyExamples.map((typo, i) => {
            const rotations = [-0.5, 0.4, -0.3, 0.6, -0.4];
            const rot = rotations[i % rotations.length];
            return (
              <RevealBlock key={typo.label} delay={i * 0.07}>
                <div
                  className="relative group bg-[#f5f0e8] border-2 border-[#2c2c2c]/30 rounded-xl p-5 md:p-6 hover:border-[#2c2c2c] transition-all duration-200"
                  style={{
                    transform: `rotate(${rot}deg)`,
                    boxShadow: "2px 2px 0 rgba(44,44,44,0.09)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0 rgba(44,44,44,0.14)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 2px 0 rgba(44,44,44,0.09)"; }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[10px] font-semibold text-[#2c2c2c]/40 uppercase tracking-widest mb-2">
                        {typo.label}
                      </p>
                      <div className={typo.className}>{typo.sample}</div>
                    </div>
                    <div className="shrink-0">
                      <code className="font-mono text-xs bg-[#2c2c2c]/08 text-[#2c2c2c]/60 px-2.5 py-1 rounded-lg">
                        {typo.spec}
                      </code>
                    </div>
                  </div>

                  {/* Hover annotation doodle */}
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowDoodle direction="left" color="#3498db" size={20} />
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>

        {/* Handwriting note */}
        <RevealBlock delay={0.2} className="mt-8">
          <div
            className="inline-block p-4 border-2 border-dashed border-[#f39c12] rounded-xl"
            style={{ transform: "rotate(0.8deg)" }}
          >
            <div className="flex items-center gap-3">
              <AsteriskDoodle size={16} color="#f39c12" />
              <p className="font-sans text-xs text-[#2c2c2c]/65 italic">
                <span className="text-[#f39c12] font-semibold not-italic">Note:</span>{" "}
                Google Fonts &apos;Playfair Display&apos; or &apos;Lora&apos; recommended for the serif headings. System serif is a fine fallback.
              </p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 6. Design Principles — Do / Don't as notebook annotations    */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <MarginNote color="#2c2c2c" rotate="rotate-[-0.5deg]">Guidelines</MarginNote>
            <CircleDoodle size={22} color="#2c2c2c" strokeWidth={1.5} />
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-1"
            style={{ transform: "rotate(0.3deg)" }}
          >
            Design Principles
          </h2>
          <WaveUnderline color="#2c2c2c" width={180} />
          <p className="font-sans text-sm text-[#2c2c2c]/60 mt-3 max-w-md leading-relaxed">
            Annotated notebook pages — the do and don&apos;t of the sketch-style system.
          </p>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Do — green marker */}
          <RevealBlock delay={0.06}>
            <div
              className="relative bg-[#f5f0e8] border-2 border-[#27ae60] rounded-xl p-8 h-full"
              style={{
                transform: "rotate(-0.7deg)",
                boxShadow: "4px 4px 0 rgba(39,174,96,0.18)",
              }}
            >
              {/* Corner doodles */}
              <div className="absolute top-4 right-5 pointer-events-none">
                <CircleDoodle size={28} color="#27ae60" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-5 right-5 pointer-events-none" style={{ transform: "rotate(-10deg)" }}>
                <AsteriskDoodle size={14} color="#27ae60" />
              </div>

              {/* Ruled lines */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-[#27ae60]/08"
                    style={{ top: `${i * 36 + 56}px` }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#27ae60]"
                    style={{ background: "rgba(39,174,96,0.12)" }}
                  >
                    <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                      <path
                        d="M3 8L6 11L13 5"
                        stroke="#27ae60"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#27ae60]">Do</h3>
                  <WaveUnderline color="#27ae60" width={60} />
                </div>

                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-sans text-sm font-bold text-[#27ae60] mt-0.5 shrink-0">+</span>
                      <span className="font-sans text-sm text-[#2c2c2c]/70 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-dashed border-[#27ae60]/30">
                  <div className="flex items-center gap-2">
                    <ArrowDoodle direction="right" color="#27ae60" size={18} />
                    <span className="font-sans text-xs text-[#27ae60] font-semibold italic">
                      approved by design committee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Don't — red pen */}
          <RevealBlock delay={0.12}>
            <div
              className="relative bg-[#f5f0e8] border-2 border-[#e74c3c] rounded-xl p-8 h-full"
              style={{
                transform: "rotate(0.6deg)",
                boxShadow: "4px 4px 0 rgba(231,76,60,0.18)",
              }}
            >
              {/* Corner doodles */}
              <div className="absolute top-3 right-4 pointer-events-none">
                <svg viewBox="0 0 24 24" width={20} height={20} fill="none">
                  <path
                    d="M4 4L20 20M20 4L4 20"
                    stroke="#e74c3c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div className="absolute bottom-5 right-6 pointer-events-none" style={{ transform: "rotate(5deg)" }}>
                <AsteriskDoodle size={14} color="#e74c3c" />
              </div>

              {/* Ruled lines */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-[#e74c3c]/07"
                    style={{ top: `${i * 36 + 56}px` }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#e74c3c]"
                    style={{ background: "rgba(231,76,60,0.10)" }}
                  >
                    <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                      <path
                        d="M4 4L12 12M12 4L4 12"
                        stroke="#e74c3c"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#e74c3c]">Don&apos;t</h3>
                  <WaveUnderline color="#e74c3c" width={60} />
                </div>

                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-sans text-sm font-bold text-[#e74c3c] mt-0.5 shrink-0">-</span>
                      <span className="font-sans text-sm text-[#2c2c2c]/70 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-dashed border-[#e74c3c]/30">
                  <div className="flex items-center gap-2">
                    <ArrowDoodle direction="right" color="#e74c3c" size={18} />
                    <span className="font-sans text-xs text-[#e74c3c] font-semibold italic">
                      * flagged by reviewer, see comments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Design credo note */}
        <RevealBlock delay={0.2} className="mt-8">
          <div
            className="relative p-6 border-2 border-[#2c2c2c]/25 rounded-xl text-center overflow-hidden"
            style={{ transform: "rotate(-0.3deg)" }}
          >
            {/* Yellow highlight behind quote */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(243,156,18,0.09)", borderRadius: "inherit" }}
            />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <AsteriskDoodle size={22} color="#f39c12" />
              </div>
              <blockquote className="font-serif text-lg md:text-xl italic text-[#2c2c2c]/75 leading-relaxed max-w-2xl mx-auto">
                &ldquo;The most honest design is the one that remembers a pencil first touched the paper. Every pixel is a memory of a mark.&rdquo;
              </blockquote>
              <p className="mt-4 font-sans text-xs text-[#2c2c2c]/40 tracking-widest uppercase">
                — Sketch Style Manifesto, 2026
              </p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 7. SVG Doodle Reference Section                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <MarginNote color="#3498db" rotate="rotate-[0.6deg]">Doodles</MarginNote>
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-[#2c2c2c] mb-1"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            Sketch Vocabulary
          </h2>
          <WaveUnderline color="#3498db" width={160} />
          <p className="font-sans text-sm text-[#2c2c2c]/60 mt-3 max-w-md leading-relaxed">
            The inline SVG doodles that give this system its hand-drawn character.
            Each is simple, slightly imperfect, and rendered without fills.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* Asterisk */}
          <RevealBlock delay={0.04}>
            <div
              className="group bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c]/40 rounded-xl p-6 flex flex-col items-center gap-4 hover:border-[#2c2c2c] transition-all duration-200"
              style={{
                transform: "rotate(-0.8deg)",
                boxShadow: "2px 2px 0 rgba(44,44,44,0.09)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0 rgba(44,44,44,0.14)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 2px 0 rgba(44,44,44,0.09)"; }}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <AsteriskDoodle size={40} color="#2c2c2c" />
              </div>
              <div className="text-center">
                <p className="font-sans text-sm font-bold text-[#2c2c2c] mb-1">Asterisk</p>
                <p className="font-sans text-xs text-[#2c2c2c]/50">Emphasis, footnote marks</p>
              </div>
              <code className="font-mono text-[10px] text-[#3498db] bg-[#3498db]/10 px-2 py-0.5 rounded">
                AsteriskDoodle
              </code>
            </div>
          </RevealBlock>

          {/* Wave underline */}
          <RevealBlock delay={0.08}>
            <div
              className="group bg-[#f5f0e8] border-2 border-dashed border-[#e74c3c]/50 rounded-xl p-6 flex flex-col items-center gap-4 hover:border-[#e74c3c] transition-all duration-200"
              style={{
                transform: "rotate(0.7deg)",
                boxShadow: "2px 2px 0 rgba(231,76,60,0.1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0 rgba(231,76,60,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 2px 0 rgba(231,76,60,0.1)"; }}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <WaveUnderline color="#e74c3c" width={64} />
              </div>
              <div className="text-center">
                <p className="font-sans text-sm font-bold text-[#2c2c2c] mb-1">Wave Underline</p>
                <p className="font-sans text-xs text-[#2c2c2c]/50">Titles, section markers</p>
              </div>
              <code className="font-mono text-[10px] text-[#e74c3c] bg-[#e74c3c]/10 px-2 py-0.5 rounded">
                WaveUnderline
              </code>
            </div>
          </RevealBlock>

          {/* Arrow */}
          <RevealBlock delay={0.12}>
            <div
              className="group bg-[#f5f0e8] border-2 border-dashed border-[#27ae60]/50 rounded-xl p-6 flex flex-col items-center gap-4 hover:border-[#27ae60] transition-all duration-200"
              style={{
                transform: "rotate(-0.5deg)",
                boxShadow: "2px 2px 0 rgba(39,174,96,0.1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0 rgba(39,174,96,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 2px 0 rgba(39,174,96,0.1)"; }}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <ArrowDoodle direction="right" color="#27ae60" size={40} />
              </div>
              <div className="text-center">
                <p className="font-sans text-sm font-bold text-[#2c2c2c] mb-1">Arrow</p>
                <p className="font-sans text-xs text-[#2c2c2c]/50">Callouts, direction guides</p>
              </div>
              <code className="font-mono text-[10px] text-[#27ae60] bg-[#27ae60]/10 px-2 py-0.5 rounded">
                ArrowDoodle
              </code>
            </div>
          </RevealBlock>

          {/* Circle highlight */}
          <RevealBlock delay={0.16}>
            <div
              className="group bg-[#f5f0e8] border-2 border-dashed border-[#f39c12]/50 rounded-xl p-6 flex flex-col items-center gap-4 hover:border-[#f39c12] transition-all duration-200"
              style={{
                transform: "rotate(0.9deg)",
                boxShadow: "2px 2px 0 rgba(243,156,18,0.1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0 rgba(243,156,18,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 2px 0 rgba(243,156,18,0.1)"; }}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <CircleDoodle size={44} color="#f39c12" strokeWidth={2} />
              </div>
              <div className="text-center">
                <p className="font-sans text-sm font-bold text-[#2c2c2c] mb-1">Circle</p>
                <p className="font-sans text-xs text-[#2c2c2c]/50">Circle for emphasis</p>
              </div>
              <code className="font-mono text-[10px] text-[#f39c12] bg-[#f39c12]/10 px-2 py-0.5 rounded">
                CircleDoodle
              </code>
            </div>
          </RevealBlock>
        </div>

        {/* Doodle usage notes */}
        <RevealBlock delay={0.2} className="mt-8">
          <div className="grid md:grid-cols-3 gap-5">
            <div
              className="p-5 border-2 border-[#3498db]/30 rounded-xl"
              style={{ transform: "rotate(0.4deg)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-xs font-bold text-[#3498db] uppercase tracking-widest">Placement</span>
              </div>
              <p className="font-sans text-xs text-[#2c2c2c]/65 leading-relaxed">
                Place doodles in corners, next to headings, or between sections. Never center a doodle in isolation — it looks too deliberate.
              </p>
            </div>
            <div
              className="p-5 border-2 border-[#e74c3c]/30 rounded-xl"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-xs font-bold text-[#e74c3c] uppercase tracking-widest">Rotation</span>
              </div>
              <p className="font-sans text-xs text-[#2c2c2c]/65 leading-relaxed">
                Always rotate doodles slightly. Range: -10deg to +10deg. This breaks the digital grid and reinforces the hand-drawn quality.
              </p>
            </div>
            <div
              className="p-5 border-2 border-[#27ae60]/30 rounded-xl"
              style={{ transform: "rotate(0.6deg)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-xs font-bold text-[#27ae60] uppercase tracking-widest">Opacity</span>
              </div>
              <p className="font-sans text-xs text-[#2c2c2c]/65 leading-relaxed">
                Keep doodle opacity at 0.45 to 0.7. Full opacity makes them compete with content. Too low and they vanish. Find the pencil-pressure sweet spot.
              </p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 8. Footer                                                     */}
      {/* ============================================================ */}
      <footer
        className="relative border-t-2 border-[#2c2c2c]/20 bg-[#f5f0e8] py-12 md:py-16 px-6 md:px-12 overflow-hidden"
      >
        {/* Footer doodle line */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 8" width="100%" height="8" preserveAspectRatio="none" fill="none">
            <path
              d="M0 4 Q180 1 360 4 Q540 7 720 4 Q900 1 1080 4 Q1260 7 1440 4"
              stroke="#2c2c2c"
              strokeWidth="1.5"
              opacity="0.18"
            />
          </svg>
        </div>

        {/* Scattered doodles in footer */}
        <div className="absolute top-8 left-10 pointer-events-none select-none" style={{ transform: "rotate(-8deg)" }}>
          <AsteriskDoodle size={20} color="#2c2c2c" />
        </div>
        <div className="absolute top-6 right-16 pointer-events-none select-none" style={{ transform: "rotate(6deg)" }}>
          <CircleDoodle size={28} color="#e74c3c" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-10 left-20 pointer-events-none select-none" style={{ transform: "rotate(-12deg)" }}>
          <ArrowDoodle direction="right" color="#3498db" size={22} />
        </div>
        <div className="absolute bottom-8 right-24 pointer-events-none select-none" style={{ transform: "rotate(4deg)" }}>
          <WaveUnderline color="#27ae60" width={48} />
        </div>
        <div className="absolute top-12 left-1/3 pointer-events-none select-none" style={{ transform: "rotate(3deg)" }}>
          <AsteriskDoodle size={14} color="#f39c12" />
        </div>
        <div className="absolute bottom-12 right-1/3 pointer-events-none select-none hidden md:block" style={{ transform: "rotate(-7deg)" }}>
          <AsteriskDoodle size={12} color="#3498db" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Footer ruled lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-[#2c2c2c]/05"
                style={{ top: `${i * 44 + 24}px` }}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 border-2 border-[#2c2c2c] rounded-lg flex items-center justify-center"
                  style={{ transform: "rotate(-1.5deg)", boxShadow: "2px 2px 0 rgba(44,44,44,0.15)" }}
                >
                  <svg viewBox="0 0 16 16" width={12} height={12} fill="none">
                    <path
                      d="M3 13L5 5L9 9L11 4L13 13"
                      stroke="#2c2c2c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-serif text-base font-bold text-[#2c2c2c]">Sketch Style</span>
              </div>
              <WaveUnderline color="#2c2c2c" width={100} />
              <p className="font-sans text-xs text-[#2c2c2c]/50 mt-2 max-w-xs leading-relaxed">
                Part of StyleKit — a living collection of design systems. Pencil-drawn, paper-textured, human.
              </p>
            </div>

            {/* Color dot row */}
            <div className="flex items-center gap-3">
              {colorPalette.map((c, i) => {
                const smallRots = [-3, 2, -2.5, 3.5, -2, 3];
                return (
                  <div
                    key={c.hex}
                    className="w-6 h-6 rounded-full border-2 border-[#2c2c2c]"
                    style={{
                      backgroundColor: c.hex,
                      transform: `rotate(${smallRots[i]}deg)`,
                      boxShadow: "1.5px 1.5px 0 rgba(44,44,44,0.15)",
                    }}
                    title={c.name}
                  />
                );
              })}
            </div>

            <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/styles/sketch-style"
                className="font-sans text-sm text-[#3498db] hover:underline underline-offset-2 decoration-dashed transition-all duration-150 font-semibold"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="font-sans text-sm text-[#2c2c2c]/55 hover:text-[#2c2c2c] transition-colors duration-150"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="font-sans text-sm text-[#2c2c2c]/55 hover:text-[#2c2c2c] transition-colors duration-150 flex items-center gap-1"
              >
                Home
                <ArrowDoodle direction="right" size={14} color="#2c2c2c" />
              </Link>
            </nav>
          </div>

          {/* Footer bottom annotation */}
          <div className="mt-10 pt-6 border-t border-dashed border-[#2c2c2c]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-sans text-[11px] text-[#2c2c2c]/35">
              StyleKit &copy; 2026. Made with pencils and pixels.
            </p>
            <div className="flex items-center gap-2">
              <WaveUnderline color="#e74c3c" width={40} />
              <span className="font-sans text-[11px] text-[#e74c3c]/60 font-semibold">
                * all lines hand-drawn
              </span>
              <WaveUnderline color="#e74c3c" width={40} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
