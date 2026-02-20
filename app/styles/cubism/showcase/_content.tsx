"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
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
/*  Color palette data                                                 */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Dark Brown", hex: "#5c4033", role: "Primary" },
  { name: "Warm Cream", hex: "#e8dcc8", role: "Secondary" },
  { name: "Tan", hex: "#8b7355", role: "Accent" },
  { name: "Slate Blue", hex: "#3d5c6e", role: "Accent" },
  { name: "Rust Red", hex: "#9b3d25", role: "Accent" },
];

/* ------------------------------------------------------------------ */
/*  Typography data                                                    */
/* ------------------------------------------------------------------ */

const typographyRows = [
  {
    label: "DISPLAY",
    sample: "FRAGMENTED",
    classes: "text-5xl font-black uppercase tracking-widest",
    note: "font-black + uppercase + tracking-widest",
  },
  {
    label: "HEADLINE",
    sample: "MULTI-FACET VIEW",
    classes: "text-3xl font-black uppercase tracking-wider",
    note: "font-black + uppercase + tracking-wider",
  },
  {
    label: "SUBHEAD",
    sample: "Angular Geometry",
    classes: "text-xl font-bold uppercase tracking-wide",
    note: "font-bold + uppercase + tracking-wide",
  },
  {
    label: "BODY",
    sample: "Every plane reveals a different facet of the same object, seen from multiple angles at once.",
    classes: "text-base font-light leading-relaxed",
    note: "font-light — contrast to the black headlines",
  },
  {
    label: "LABEL",
    sample: "CATEGORY / SECTION / DATE",
    classes: "text-xs font-black uppercase tracking-widest",
    note: "font-black + uppercase + tracking-widest — micro labels",
  },
];

/* ------------------------------------------------------------------ */
/*  Principles data                                                    */
/* ------------------------------------------------------------------ */

const doList = [
  "Angular geometric shapes with skew and rotate transforms",
  "Dark earth tones #5c4033 and warm cream #e8dcc8",
  "Thick borders border-2 with dark outline color",
  "Small radius rounded or rounded-sm to keep angularity",
  "Asymmetric layouts and tilted angles on cards/containers",
  "Overlapping fragmented panels using z-index and negative margins",
  "Polygon clip-paths or thick diagonal borders",
  "font-black uppercase tracking-widest for angular text",
];

const dontList = [
  "No smooth circles or rounded-full",
  "No pastel or gradient backgrounds",
  "No centered symmetric layouts",
  "No rounded-2xl or soft drop shadows",
  "No uniform spacing — asymmetry is the rule",
  "No serif fonts — angular grotesque only",
  "No single viewpoint — show every angle simultaneously",
  "No neutral grays — earth tones anchor every palette decision",
];

/* ------------------------------------------------------------------ */
/*  Component tab types                                                */
/* ------------------------------------------------------------------ */

type ComponentTab = "Button" | "Card" | "Input";

/* ------------------------------------------------------------------ */
/*  CubistButton                                                       */
/* ------------------------------------------------------------------ */

function CubistButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "rust";
}) {
  const base =
    "group relative inline-flex items-center gap-3 px-6 py-3 font-black uppercase tracking-widest text-sm border-2 transition-all duration-300 ease-out";

  if (variant === "secondary") {
    return (
      <button
        type="button"
        className={`${base} bg-[#e8dcc8] text-[#5c4033] border-[#5c4033] rounded-sm hover:bg-[#5c4033] hover:text-[#e8dcc8] shadow-[4px_4px_0_#5c4033] hover:shadow-[2px_2px_0_#5c4033] hover:translate-x-[2px] hover:translate-y-[2px]`}
      >
        <span className="relative z-10">{children}</span>
        <span
          className="absolute inset-0 bg-[#8b7355] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          aria-hidden
        />
      </button>
    );
  }
  if (variant === "rust") {
    return (
      <button
        type="button"
        className={`${base} bg-[#9b3d25] text-[#e8dcc8] border-[#5c4033] rounded-sm hover:bg-[#5c4033] hover:border-[#9b3d25] shadow-[4px_4px_0_#3d5c6e] hover:shadow-[2px_2px_0_#3d5c6e] hover:translate-x-[2px] hover:translate-y-[2px]`}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
  // primary
  return (
    <button
      type="button"
      className={`${base} bg-[#5c4033] text-[#e8dcc8] border-[#5c4033] rounded-sm hover:bg-[#3d5c6e] hover:border-[#3d5c6e] shadow-[4px_4px_0_#9b3d25] hover:shadow-[2px_2px_0_#9b3d25] hover:translate-x-[2px] hover:translate-y-[2px]`}
    >
      <span className="relative z-10">{children}</span>
      <svg
        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 16 16"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  CubistInput                                                        */
/* ------------------------------------------------------------------ */

function CubistInput({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-black uppercase tracking-widest text-[#8b7355] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#5c4033] rounded-sm text-[#5c4033] placeholder-[#8b7355]/60 font-light text-base focus:outline-none focus:border-[#9b3d25] focus:shadow-[4px_4px_0_#5c4033] transition-all duration-300"
          style={{ transform: "skewX(-1deg)" }}
        />
        {/* angular accent line */}
        <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-[#9b3d25] transform -skew-x-6" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CubistCard                                                         */
/* ------------------------------------------------------------------ */

function CubistCard({
  title,
  category,
  description,
  accent,
}: {
  title: string;
  category: string;
  description: string;
  accent: string;
}) {
  return (
    <div
      className="group relative bg-[#e8dcc8] border-2 border-[#5c4033] rounded-sm p-6 hover:shadow-[6px_6px_0_#5c4033] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ transform: "skewY(-0.5deg)" }}
    >
      {/* angular corner block */}
      <div
        className="absolute top-0 right-0 w-12 h-12 group-hover:w-16 group-hover:h-16 transition-all duration-300"
        style={{ backgroundColor: accent, clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      {/* diagonal stripe fragment */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
        style={{ backgroundColor: accent }}
      />
      <p className="text-xs font-black uppercase tracking-widest text-[#8b7355] mb-3 group-hover:text-[#9b3d25] transition-colors duration-300">
        {category}
      </p>
      <h3
        className="text-xl font-black uppercase tracking-wider text-[#5c4033] leading-tight mb-3"
        style={{ transform: "skewX(-1deg)" }}
      >
        {title}
      </h3>
      <p className="text-sm font-light text-[#5c4033]/80 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8b7355] group-hover:text-[#5c4033] transition-colors duration-300">
        VIEW FACET
        <svg
          className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<ComponentTab>("Button");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // suppress unused warning — heroInView used for hero panel opacity
  void heroInView;

  return (
    <div className="min-h-screen bg-[#e8dcc8] text-[#5c4033]">

      {/* ============================================================ */}
      {/* 1. Fixed Nav                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#5c4033] border-b-2 border-[#3d2b1f]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* fragmented logo mark */}
              <div className="relative w-8 h-8 shrink-0">
                <div className="absolute inset-0 bg-[#9b3d25] rounded-sm rotate-12" />
                <div className="absolute inset-0 bg-[#3d5c6e] rounded-sm -rotate-6 opacity-80" />
                <div className="absolute inset-0 border-2 border-[#e8dcc8] rounded-sm opacity-60" />
              </div>
              <span className="font-black uppercase tracking-widest text-[#e8dcc8] text-sm">
                立体主义
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Fragmentation", "Components", "Palette", "Typography", "Principles"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]/60 hover:text-[#e8dcc8] transition-colors duration-300"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            <Link
              href="/"
              className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]/60 hover:text-[#9b3d25] transition-colors duration-300 flex items-center gap-2"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M10 3L4 8l6 5" />
              </svg>
              StyleKit
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero — Fragmented geometric panels                        */}
      {/* ============================================================ */}
      <section
        className="pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
        ref={heroRef}
      >
        <div className="relative">
          {/* ---- Background fragment panels ---- */}

          {/* large dark brown panel — top left, tilted */}
          <div
            className="absolute top-0 left-0 w-72 md:w-[420px] h-48 md:h-64 bg-[#5c4033] border-2 border-[#3d2b1f] rounded-sm z-0"
            style={{
              transform: "rotate(-4deg) skewX(-2deg)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          />

          {/* rust accent panel — overlapping */}
          <div
            className="absolute top-8 left-16 md:left-32 w-40 md:w-56 h-32 md:h-44 bg-[#9b3d25] border-2 border-[#5c4033] rounded-sm z-0"
            style={{
              transform: "rotate(6deg) skewY(-3deg)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          />

          {/* slate blue panel — right side */}
          <div
            className="absolute top-4 right-0 w-48 md:w-72 h-56 md:h-80 bg-[#3d5c6e] border-2 border-[#2a3f4d] rounded-sm z-0"
            style={{
              transform: "rotate(-6deg) skewX(3deg)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          />

          {/* tan patch — bottom right overlap */}
          <div
            className="absolute top-20 right-8 w-32 md:w-48 h-24 md:h-36 bg-[#8b7355] border-2 border-[#5c4033] rounded-sm z-0"
            style={{
              transform: "rotate(8deg) skewY(2deg)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          />

          {/* cream overlay panel — center, highest z, text sits on this */}
          <div
            className="absolute top-12 left-8 md:left-20 w-48 md:w-64 h-36 md:h-48 bg-[#e8dcc8] border-2 border-[#5c4033] rounded-sm z-10"
            style={{
              transform: "rotate(3deg) skewX(-1deg)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          />

          {/* small rust accent square — isolated fragment */}
          <div
            className="absolute top-2 right-24 md:right-48 w-10 h-10 bg-[#9b3d25] border-2 border-[#5c4033] rounded-sm z-20"
            style={{
              transform: "rotate(-12deg)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          />

          {/* ---- Hero text block — sits above all panels ---- */}
          <div className="relative z-30 pt-20 md:pt-28 pb-8">
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition:
                  "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-4">
                1907 — Picasso & Braque — Multi-Angle Vision
              </p>
            </div>

            <h1
              className="font-black uppercase leading-none mb-6"
              style={{ fontSize: "clamp(52px,10vw,112px)" }}
            >
              <span
                className="block text-[#5c4033]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed
                    ? "translateY(0) skewX(0deg)"
                    : "translateY(48px) skewX(-4deg)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
                  letterSpacing: "0.06em",
                }}
              >
                CUBISM
              </span>
              <span
                className="block"
                style={{
                  color: "#3d5c6e",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed
                    ? "translateY(0) skewX(0deg)"
                    : "translateY(48px) skewX(4deg)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
                  letterSpacing: "0.04em",
                  marginLeft: "clamp(12px, 3vw, 48px)",
                }}
              >
                立体主义
              </span>
            </h1>

            <div
              className="max-w-xl"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s",
              }}
            >
              <p className="text-base font-light leading-relaxed text-[#5c4033]/80 mb-6">
                Shatter single-point perspective into geometric fragments and multi-angle overlays.
                Nothing is seen from one viewpoint — every element shows multiple facets
                simultaneously. Angular. Fragmented. Radical.
              </p>
              <div className="flex flex-wrap gap-4">
                <CubistButton>Explore Facets</CubistButton>
                <CubistButton variant="secondary">View Fragments</CubistButton>
              </div>
            </div>
          </div>

          {/* ---- Bottom fragment strip ---- */}
          <div
            className="relative z-0 mt-6 flex gap-3 overflow-hidden"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            {[
              { bg: "#5c4033", flex: "flex-[3]", rotate: "-rotate-1" },
              { bg: "#9b3d25", flex: "flex-[2]", rotate: "rotate-2" },
              { bg: "#3d5c6e", flex: "flex-[4]", rotate: "-rotate-1" },
              { bg: "#8b7355", flex: "flex-[1]", rotate: "rotate-3" },
              { bg: "#5c4033", flex: "flex-[2]", rotate: "-rotate-2" },
            ].map((seg, i) => (
              <div
                key={i}
                className={`${seg.flex} ${seg.rotate} h-4 border border-[#3d2b1f] rounded-sm`}
                style={{ backgroundColor: seg.bg }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Fragmentation — visual explainer                          */}
      {/* ============================================================ */}
      <section id="fragmentation" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-3">
                Core Philosophy
              </p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#5c4033]"
                style={{ transform: "skewX(-1deg)" }}
              >
                FRAGMENTATION
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light text-[#5c4033]/70 leading-relaxed">
              Every composition is deconstructed. Planes overlap, angles collide, and no single
              vantage point dominates the scene.
            </p>
          </div>
        </RevealBlock>

        {/* Four-panel fragmented grid demo */}
        <RevealBlock delay={0.05}>
          <div className="relative h-72 md:h-96 overflow-hidden border-2 border-[#5c4033] rounded-sm">
            {/* Panel 1 — large dark */}
            <div
              className="absolute top-0 left-0 w-[55%] h-full bg-[#5c4033] border-r-2 border-b-2 border-[#3d2b1f] flex items-end p-6"
              style={{ transform: "skewX(-1deg)", transformOrigin: "bottom right" }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]/50">
                PLANE A / FRONTAL
              </span>
            </div>

            {/* Panel 2 — rust, overlapping */}
            <div
              className="absolute top-0 right-0 w-[48%] h-[60%] bg-[#9b3d25] border-l-2 border-b-2 border-[#5c4033] flex items-start p-6"
              style={{ transform: "skewY(-2deg)", transformOrigin: "top left" }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]/50">
                PLANE B / LATERAL
              </span>
            </div>

            {/* Panel 3 — slate blue, bottom right */}
            <div
              className="absolute bottom-0 right-0 w-[45%] h-[45%] bg-[#3d5c6e] border-l-2 border-t-2 border-[#2a3f4d] flex items-end p-4"
              style={{ transform: "skewX(2deg) skewY(1deg)", transformOrigin: "top left" }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]/50">
                PLANE C / AERIAL
              </span>
            </div>

            {/* Panel 4 — cream, center overlap */}
            <div
              className="absolute top-[25%] left-[35%] w-36 md:w-48 h-28 md:h-36 bg-[#e8dcc8] border-2 border-[#5c4033] z-20 flex flex-col justify-center items-center"
              style={{ transform: "rotate(-5deg) skewX(-2deg)" }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-[#5c4033] text-center px-2 leading-tight">
                INTERSECTION
              </span>
              <span className="text-[10px] font-light text-[#5c4033]/60 mt-1">ALL ANGLES</span>
            </div>

            {/* Panel 5 — tan, small fragment */}
            <div
              className="absolute top-[55%] left-[28%] w-24 h-20 bg-[#8b7355] border-2 border-[#5c4033] z-10"
              style={{ transform: "rotate(8deg) skewX(-3deg)" }}
            />

            {/* Axis lines */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div
                className="absolute top-1/2 left-0 right-0 h-px bg-[#e8dcc8]/20"
                style={{ transform: "skewX(-3deg)" }}
              />
              <div
                className="absolute top-0 bottom-0 left-1/2 w-px bg-[#e8dcc8]/20"
                style={{ transform: "skewY(2deg)" }}
              />
            </div>
          </div>
        </RevealBlock>

        {/* Fragment labels */}
        <RevealBlock delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: "PLANE A / FRONTAL", color: "#5c4033" },
              { label: "PLANE B / LATERAL", color: "#9b3d25" },
              { label: "PLANE C / AERIAL", color: "#3d5c6e" },
              { label: "TAN FRAGMENT", color: "#8b7355" },
              { label: "INTERSECTION", color: "#e8dcc8", border: "#5c4033" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm border border-[#5c4033]/40"
                  style={{
                    backgroundColor: item.color,
                    borderColor: item.border ?? item.color,
                  }}
                />
                <span className="text-xs font-black uppercase tracking-widest text-[#5c4033]/60">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </RevealBlock>

        {/* Three principle blocks */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "SIMULTANEOUS VIEWS",
              body: "Object, subject, space — rendered from front, side, and above in a single composition. Single-point perspective is abolished.",
              rotate: "-rotate-1",
              bg: "#5c4033",
              fg: "#e8dcc8",
            },
            {
              num: "02",
              title: "GEOMETRIC REDUCTION",
              body: "All natural forms are broken down into cubes, cylinders, cones. The cylinder becomes a stack of angular slabs.",
              rotate: "rotate-1",
              bg: "#3d5c6e",
              fg: "#e8dcc8",
            },
            {
              num: "03",
              title: "FRACTURED PLANE",
              body: "Surfaces are shattered and reassembled in new spatial relationships. Overlap is essential, not accidental.",
              rotate: "-rotate-1",
              bg: "#9b3d25",
              fg: "#e8dcc8",
            },
          ].map((block, i) => (
            <RevealBlock key={block.num} delay={0.05 + i * 0.08}>
              <div
                className={`relative p-6 border-2 border-[#3d2b1f] rounded-sm ${block.rotate} hover:rotate-0 transition-transform duration-500 cursor-default`}
                style={{ backgroundColor: block.bg }}
              >
                {/* corner fragment */}
                <div
                  className="absolute top-0 right-0 w-8 h-8"
                  style={{
                    backgroundColor: block.fg,
                    opacity: 0.15,
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />
                <p
                  className="text-xs font-black uppercase tracking-widest mb-4"
                  style={{ color: `${block.fg}60` }}
                >
                  {block.num}
                </p>
                <h3
                  className="text-lg font-black uppercase tracking-wider mb-3 leading-tight"
                  style={{ color: block.fg }}
                >
                  {block.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: `${block.fg}B3` }}>
                  {block.body}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Component Demos — tab switcher                            */}
      {/* ============================================================ */}
      <section
        id="components"
        className="py-20 md:py-28 px-6 md:px-12 bg-[#ddd0b3] border-t-2 border-b-2 border-[#5c4033]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-3">
                  UI Elements
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#5c4033]"
                  style={{ transform: "skewX(-1deg)" }}
                >
                  COMPONENTS
                </h2>
              </div>
              <p className="max-w-xs text-sm font-light text-[#5c4033]/70 leading-relaxed">
                Angular, hard-edged UI pieces. Each element carries the weight of the earth-tone
                palette and the geometry of cubism.
              </p>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.05} className="mb-10">
            <div className="flex border-2 border-[#5c4033] rounded-sm w-fit overflow-hidden">
              {(["Button", "Card", "Input"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setComponentTab(tab)}
                  className={`px-6 md:px-8 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    componentTab === tab
                      ? "bg-[#5c4033] text-[#e8dcc8] shadow-[inset_2px_2px_0_#3d2b1f]"
                      : "bg-transparent text-[#5c4033] hover:bg-[#5c4033]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Button tab */}
          {componentTab === "Button" && (
            <RevealBlock>
              <div className="space-y-10">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#8b7355] mb-5">
                    Primary — Dark brown fill, rust shadow, slate hover
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <CubistButton>Shatter Form</CubistButton>
                    <CubistButton>View All Angles</CubistButton>
                    <CubistButton>Deconstruct</CubistButton>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#8b7355] mb-5">
                    Secondary — Cream fill, brown border, brown hover
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <CubistButton variant="secondary">Frontal Plane</CubistButton>
                    <CubistButton variant="secondary">Lateral View</CubistButton>
                    <CubistButton variant="secondary">Aerial Facet</CubistButton>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#8b7355] mb-5">
                    Rust Accent — Rust fill, slate shadow — use sparingly
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <CubistButton variant="rust">Fragment Object</CubistButton>
                    <CubistButton variant="rust">Break Plane</CubistButton>
                  </div>
                </div>

                {/* Angular offset hover demo */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#8b7355] mb-5">
                    Angular offset — hover shifts translate + shadow reduces (hard-edge press)
                  </p>
                  <div className="p-8 bg-[#5c4033]/10 border-2 border-[#5c4033] rounded-sm flex flex-wrap gap-6 items-center">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8b7355]">
                        Default
                      </span>
                      <div
                        className="px-5 py-2.5 bg-[#5c4033] text-[#e8dcc8] text-xs font-black uppercase tracking-widest border-2 border-[#3d2b1f] rounded-sm"
                        style={{ boxShadow: "4px 4px 0 #9b3d25" }}
                      >
                        ANGULAR OFFSET
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8b7355]">
                        Hover state
                      </span>
                      <div
                        className="px-5 py-2.5 bg-[#3d5c6e] text-[#e8dcc8] text-xs font-black uppercase tracking-widest border-2 border-[#3d5c6e] rounded-sm translate-x-[2px] translate-y-[2px]"
                        style={{ boxShadow: "2px 2px 0 #9b3d25" }}
                      >
                        ANGULAR OFFSET
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Card tab */}
          {componentTab === "Card" && (
            <RevealBlock>
              <div className="space-y-10">
                <p className="text-xs font-black uppercase tracking-widest text-[#8b7355]">
                  Cubist cards — skewed containers, angular corner clips, hard-edge hover shadow
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CubistCard
                    category="Analytical Cubism"
                    title="THE FRACTURED VIOLIN"
                    description="Instrument and space dissolve into interlocking planes. Form becomes rhythm, substance becomes suggestion."
                    accent="#9b3d25"
                  />
                  <CubistCard
                    category="Synthetic Cubism"
                    title="COLLAGE OF ANGLES"
                    description="Paper, newsprint, and charcoal fragments — assembled not drawn. Reality fragmented and reconstructed."
                    accent="#3d5c6e"
                  />
                  <CubistCard
                    category="Proto-Cubism"
                    title="LES DEMOISELLES"
                    description="The birth of the movement. Five figures, six viewpoints. Nothing stays still beneath the painter's gaze."
                    accent="#8b7355"
                  />
                  <CubistCard
                    category="Orphism"
                    title="SIMULTANEOUS WINDOWS"
                    description="Color as structure. Prismatic refraction of light across shifting geometric facets. No edge is final."
                    accent="#9b3d25"
                  />
                  <CubistCard
                    category="Futurist Cubism"
                    title="DYNAMIC FORM IN MOTION"
                    description="The body captured across time in a single image. Every moment of the gesture preserved in fragment."
                    accent="#3d5c6e"
                  />
                  <CubistCard
                    category="Sculptural Cubism"
                    title="ASSEMBLED PLANES"
                    description="Bronze and wire — three-dimensional objects that deny the possibility of a single correct angle."
                    accent="#5c4033"
                  />
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Input tab */}
          {componentTab === "Input" && (
            <RevealBlock>
              <div className="space-y-8">
                <p className="text-xs font-black uppercase tracking-widest text-[#8b7355]">
                  Inputs — cream bg, brown border, slight skew, focus activates rust border + shadow
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  <CubistInput label="Full Name" placeholder="Pablo Picasso" />
                  <CubistInput label="Email" placeholder="studio@cubism.art" type="email" />
                  <CubistInput label="Subject" placeholder="Fragmented Object Study" />
                  <CubistInput label="Year" placeholder="1907" type="number" />
                </div>
                <div className="max-w-2xl">
                  <label className="block text-xs font-black uppercase tracking-widest text-[#8b7355] mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the facets of the work..."
                    className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#5c4033] rounded-sm text-[#5c4033] placeholder-[#8b7355]/60 font-light text-base focus:outline-none focus:border-[#9b3d25] focus:shadow-[4px_4px_0_#5c4033] transition-all duration-300 resize-none"
                    style={{ transform: "skewX(-0.5deg)" }}
                  />
                </div>
                <div className="flex gap-4">
                  <CubistButton>Submit Fragment</CubistButton>
                  <CubistButton variant="secondary">Clear Planes</CubistButton>
                </div>

                {/* Focus state demo */}
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#8b7355] mb-4">
                    Focus state — rust border + hard shadow activates
                  </p>
                  <div className="p-6 bg-[#5c4033]/10 border-2 border-[#5c4033] rounded-sm grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#8b7355] mb-2">
                        Default
                      </p>
                      <div
                        className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#5c4033] rounded-sm text-[#8b7355]/60 text-sm font-light"
                        style={{ transform: "skewX(-1deg)" }}
                      >
                        Input placeholder
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#8b7355] mb-2">
                        Focused
                      </p>
                      <div
                        className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#9b3d25] rounded-sm text-[#5c4033] text-sm font-light"
                        style={{
                          transform: "skewX(-1deg)",
                          boxShadow: "4px 4px 0 #5c4033",
                        }}
                      >
                        Active value
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Color Palette                                             */}
      {/* ============================================================ */}
      <section id="palette" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-3">
                Earth Tones
              </p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#5c4033]"
                style={{ transform: "skewX(-1deg)" }}
              >
                COLOR PALETTE
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light text-[#5c4033]/70 leading-relaxed">
              Earth tones and angular blocks. Five colors — each assigned a structural role in the
              fragmented composition.
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 border-2 border-[#5c4033] rounded-sm overflow-hidden">
          {palette.map((color, i) => (
            <RevealBlock key={color.hex} delay={i * 0.06}>
              <div
                className="group relative border-r-2 last:border-r-0 border-[#5c4033] overflow-hidden cursor-default"
                style={{
                  backgroundColor: color.hex,
                  transform: `skewY(${i % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                }}
              >
                {/* tall color block */}
                <div className="h-32 md:h-48" />

                {/* angular fragment overlay */}
                <div
                  className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    backgroundColor: color.hex === "#e8dcc8" ? "#5c4033" : "#e8dcc8",
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />

                <div
                  className="px-4 py-4 border-t-2 border-[#5c4033]"
                  style={{ backgroundColor: "#e8dcc8" }}
                >
                  <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-1">
                    {color.role}
                  </p>
                  <p className="text-sm font-black uppercase tracking-wider text-[#5c4033] leading-tight">
                    {color.name}
                  </p>
                  <p className="text-xs font-light text-[#8b7355] mt-1 font-mono">{color.hex}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Color usage notes */}
        <RevealBlock delay={0.15}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                color: "#5c4033",
                title: "PRIMARY — Dark Brown",
                note: "Background panels, borders, nav, primary surfaces. The dominant earth tone that grounds every layout.",
              },
              {
                color: "#e8dcc8",
                title: "SECONDARY — Warm Cream",
                note: "Text-holding surfaces, card backgrounds, hover targets. Provides contrast without coolness.",
              },
              {
                color: "#9b3d25",
                title: "ACCENT — Rust Red",
                note: "Calls to action, hard shadows, active states, fragment corner clips. Use with restraint.",
              },
            ].map((note) => (
              <div
                key={note.color}
                className="flex gap-3 p-4 bg-[#e8dcc8]/50 border-2 border-[#5c4033] rounded-sm"
                style={{ transform: "skewX(-0.5deg)" }}
              >
                <div
                  className="w-4 min-h-[40px] rounded-sm border border-[#5c4033]/40 shrink-0"
                  style={{ backgroundColor: note.color }}
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#5c4033] mb-1">
                    {note.title}
                  </p>
                  <p className="text-xs font-light text-[#5c4033]/70 leading-relaxed">{note.note}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 6. Typography Rules                                          */}
      {/* ============================================================ */}
      <section
        id="typography"
        className="py-20 md:py-28 px-6 md:px-12 bg-[#5c4033] border-t-2 border-b-2 border-[#3d2b1f]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-3">
                  Letterform
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#e8dcc8]"
                  style={{ transform: "skewX(-1deg)" }}
                >
                  TYPOGRAPHY
                </h2>
              </div>
              <p className="max-w-xs text-sm font-light text-[#e8dcc8]/60 leading-relaxed">
                Angular grotesque at maximum weight. Uppercase and wide-tracking headlines contrast
                with featherweight body copy.
              </p>
            </div>
          </RevealBlock>

          <div className="space-y-0 border-2 border-[#8b7355]/30 rounded-sm overflow-hidden">
            {typographyRows.map((row, i) => (
              <RevealBlock key={row.label} delay={i * 0.06}>
                <div
                  className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 px-6 py-6 border-b-2 border-[#8b7355]/20 last:border-b-0 hover:bg-[#8b7355]/10 transition-colors duration-300 cursor-default"
                  style={{ transform: i % 2 === 0 ? "skewX(-0.3deg)" : "skewX(0.3deg)" }}
                >
                  {/* label */}
                  <div className="w-24 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#9b3d25] group-hover:text-[#e8dcc8] transition-colors duration-300">
                      {row.label}
                    </span>
                  </div>

                  {/* sample */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p
                      className={`${row.classes} text-[#e8dcc8] leading-tight truncate`}
                      style={{ transform: "skewX(-1deg)" }}
                    >
                      {row.sample}
                    </p>
                  </div>

                  {/* note */}
                  <div className="w-56 shrink-0">
                    <p className="text-[10px] font-light text-[#e8dcc8]/40 leading-relaxed group-hover:text-[#e8dcc8]/60 transition-colors duration-300">
                      {row.note}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Tracking extremes demo */}
          <RevealBlock delay={0.3} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="p-8 bg-[#e8dcc8] border-2 border-[#9b3d25] rounded-sm"
                style={{ transform: "skewX(-1deg)" }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9b3d25] mb-4">
                  tracking-widest — headlines, labels
                </p>
                <p className="text-2xl font-black uppercase tracking-widest text-[#5c4033]">
                  CUBISM
                </p>
                <p className="text-[10px] font-light text-[#8b7355] mt-2">
                  letter-spacing: 0.1em — authority and angularity
                </p>
              </div>

              <div
                className="p-8 bg-[#3d5c6e] border-2 border-[#2a3f4d] rounded-sm"
                style={{ transform: "skewX(1deg)" }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9b3d25] mb-4">
                  font-light — body copy
                </p>
                <p className="text-base font-light text-[#e8dcc8] leading-relaxed">
                  Every plane reveals a different facet of the same object, seen from multiple
                  angles at once.
                </p>
                <p className="text-[10px] font-light text-[#e8dcc8]/40 mt-2">
                  font-weight: 300 — maximum contrast with black headers
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Design Principles — cubist fragments, not generic list    */}
      {/* ============================================================ */}
      <section id="principles" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#9b3d25] mb-3">
                Manifesto
              </p>
              <h2
                className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#5c4033]"
                style={{ transform: "skewX(-1deg)" }}
              >
                PRINCIPLES
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light text-[#5c4033]/70 leading-relaxed">
              Rules of construction and rules of prohibition. The do list is a manifesto. The
              don&apos;t list is a warning.
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* DO — dark brown fragment panels */}
          <RevealBlock delay={0.05}>
            <div className="relative">
              {/* rotated bg panel behind */}
              <div
                className="absolute inset-0 bg-[#5c4033] border-2 border-[#3d2b1f] rounded-sm"
                style={{ transform: "rotate(-2deg) skewX(-1deg)" }}
              />
              <div
                className="relative bg-[#e8dcc8] border-2 border-[#5c4033] rounded-sm p-8"
                style={{ transform: "rotate(1deg)" }}
              >
                {/* header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-6 h-6 bg-[#5c4033] border-2 border-[#3d2b1f] rounded-sm"
                    style={{ transform: "rotate(12deg)" }}
                  />
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#5c4033]">
                    Construct — Do This
                  </h3>
                </div>
                <ul className="space-y-0">
                  {doList.map((rule, i) => (
                    <li
                      key={rule}
                      className="group flex gap-4 py-3 border-b border-[#5c4033]/20 last:border-b-0 hover:bg-[#5c4033]/5 transition-colors duration-300 cursor-default"
                    >
                      <span
                        className="text-[10px] font-black uppercase tracking-widest text-[#9b3d25] shrink-0 mt-0.5 w-5"
                        style={{ transform: "skewX(-2deg)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-light text-[#5c4033] leading-relaxed group-hover:text-[#3d2b1f] transition-colors duration-300">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>

          {/* DON'T — slate blue fragment panels */}
          <RevealBlock delay={0.1}>
            <div className="relative">
              {/* rotated bg panel behind */}
              <div
                className="absolute inset-0 bg-[#3d5c6e] border-2 border-[#2a3f4d] rounded-sm"
                style={{ transform: "rotate(2deg) skewX(1deg)" }}
              />
              <div
                className="relative bg-[#5c4033] border-2 border-[#3d2b1f] rounded-sm p-8"
                style={{ transform: "rotate(-1deg)" }}
              >
                {/* header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-6 h-6 bg-[#9b3d25] border-2 border-[#5c4033] rounded-sm"
                    style={{ transform: "rotate(-12deg)" }}
                  />
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]">
                    Demolish — Avoid This
                  </h3>
                </div>
                <ul className="space-y-0">
                  {dontList.map((rule, i) => (
                    <li
                      key={rule}
                      className="group flex gap-4 py-3 border-b border-[#e8dcc8]/10 last:border-b-0 hover:bg-[#e8dcc8]/5 transition-colors duration-300 cursor-default"
                    >
                      <span
                        className="text-[10px] font-black uppercase tracking-widest text-[#9b3d25] shrink-0 mt-0.5 w-5"
                        style={{ transform: "skewX(2deg)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-light text-[#e8dcc8]/70 leading-relaxed group-hover:text-[#e8dcc8] transition-colors duration-300">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Visual contrast pair */}
        <RevealBlock delay={0.2} className="mt-16">
          <div className="border-2 border-[#5c4033] rounded-sm overflow-hidden">
            <div className="px-6 py-4 bg-[#5c4033] border-b-2 border-[#3d2b1f]">
              <p className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]/60">
                Visual Contrast — Cubism vs Soft Design
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Cubist correct */}
              <div className="p-8 bg-[#e8dcc8] border-r-2 border-[#5c4033]">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#9b3d25] mb-5">
                  Correct — Angular / Fragmented
                </p>
                <div className="relative h-24 flex items-center justify-center overflow-hidden border-2 border-[#5c4033] rounded-sm bg-[#5c4033]">
                  <div
                    className="w-16 h-16 bg-[#9b3d25] border-2 border-[#e8dcc8] absolute"
                    style={{ transform: "rotate(-8deg) skewX(-6deg)", left: "20%", top: "10%" }}
                  />
                  <div
                    className="w-12 h-14 bg-[#3d5c6e] border-2 border-[#e8dcc8] absolute"
                    style={{ transform: "rotate(5deg) skewY(-4deg)", right: "25%", bottom: "5%" }}
                  />
                  <div
                    className="w-20 h-10 bg-[#8b7355] border-2 border-[#e8dcc8] absolute"
                    style={{ transform: "rotate(-3deg)", left: "35%", top: "30%" }}
                  />
                  <span className="relative z-10 text-xs font-black uppercase tracking-widest text-[#e8dcc8]">
                    FRAGMENT
                  </span>
                </div>
                <ul className="mt-4 space-y-1 text-xs font-light text-[#5c4033]/70">
                  <li>+ rotate / skew transforms</li>
                  <li>+ overlapping z-index panels</li>
                  <li>+ border-2 hard edges</li>
                  <li>+ earth-tone dark bg</li>
                </ul>
              </div>
              {/* Anti-cubist */}
              <div className="p-8 bg-[#f3f4f6]">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-5">
                  Incorrect — Soft / Symmetric
                </p>
                <div className="h-24 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-xs text-purple-500">soft</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-1 text-xs font-light text-gray-400">
                  <li>- rounded-full circles</li>
                  <li>- pastel gradients</li>
                  <li>- centered symmetric layout</li>
                  <li>- rounded-2xl soft shadows</li>
                </ul>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 8. Footer — cubist angular style                             */}
      {/* ============================================================ */}
      <footer className="bg-[#3d2b1f] border-t-2 border-[#5c4033]">
        {/* Top fragment bar */}
        <div className="flex overflow-hidden h-3">
          {[
            { bg: "#9b3d25", flex: "flex-[3]", skew: -4 },
            { bg: "#5c4033", flex: "flex-[5]", skew: 4 },
            { bg: "#3d5c6e", flex: "flex-[2]", skew: -4 },
            { bg: "#8b7355", flex: "flex-[4]", skew: 4 },
            { bg: "#9b3d25", flex: "flex-[1]", skew: -4 },
          ].map((seg, i) => (
            <div
              key={i}
              className={`${seg.flex}`}
              style={{
                backgroundColor: seg.bg,
                transform: `skewX(${seg.skew}deg)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Brand block */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-10 h-10 shrink-0">
                  <div className="absolute inset-0 bg-[#9b3d25] rounded-sm rotate-12" />
                  <div className="absolute inset-0 bg-[#3d5c6e] rounded-sm -rotate-6 opacity-80" />
                  <div className="absolute inset-0 border-2 border-[#e8dcc8] rounded-sm opacity-40" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#e8dcc8]">
                    立体主义
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#e8dcc8]/30">
                    Cubism
                  </p>
                </div>
              </div>
              <p className="text-sm font-light text-[#e8dcc8]/50 leading-relaxed">
                Geometric fragmentation and multi-angle perspective. Every element reveals multiple
                facets simultaneously. Angular. Asymmetric. Radical.
              </p>
            </div>

            {/* Sections nav */}
            <div className="md:col-span-2 md:col-start-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8b7355] mb-5">
                Sections
              </p>
              <ul className="space-y-3">
                {["Fragmentation", "Components", "Palette", "Typography", "Principles"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-light text-[#e8dcc8]/50 hover:text-[#e8dcc8] transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8b7355] mb-5">
                Resources
              </p>
              <ul className="space-y-3">
                {[
                  { label: "Documentation", href: "/styles/cubism" },
                  { label: "All Styles", href: "/styles" },
                  { label: "StyleKit", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-[#e8dcc8]/50 hover:text-[#9b3d25] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Principles list */}
            <div className="md:col-span-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8b7355] mb-5">
                Core Tenets
              </p>
              <ul className="space-y-2">
                {[
                  "Simultaneous viewpoints",
                  "Geometric reduction",
                  "Fractured plane",
                  "Earth tone palette",
                  "Angular asymmetry",
                  "Overlapping fragments",
                ].map((tenet) => (
                  <li key={tenet}>
                    <span className="text-xs font-light text-[#e8dcc8]/40">{tenet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t-2 border-[#5c4033]/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#e8dcc8]/25">
              Cubism — StyleKit Component System
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-light text-[#e8dcc8]/25">
                Picasso — Braque — 1907 — Multi-Angle Vision
              </span>
              {/* three overlapping fragment squares */}
              <div className="relative w-10 h-6">
                <div
                  className="absolute w-4 h-4 bg-[#9b3d25] rounded-sm border border-[#e8dcc8]/20"
                  style={{ transform: "rotate(-8deg)", left: 0, top: 0 }}
                />
                <div
                  className="absolute w-4 h-4 bg-[#3d5c6e] rounded-sm border border-[#e8dcc8]/20"
                  style={{ transform: "rotate(5deg)", left: "8px", top: "2px" }}
                />
                <div
                  className="absolute w-4 h-4 bg-[#8b7355] rounded-sm border border-[#e8dcc8]/20"
                  style={{ transform: "rotate(-3deg)", left: "16px", top: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
