"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                   */
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
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const colorPalette = [
  {
    hex: "#e8572a",
    name: "Burnt Sienna",
    subtitle: "the Eames chair",
    textColor: "text-white",
  },
  {
    hex: "#f5f0e1",
    name: "Harvest Cream",
    subtitle: "linen upholstery",
    textColor: "text-[#3d3d3d]",
  },
  {
    hex: "#2a6e5e",
    name: "Peacock Teal",
    subtitle: "formica countertop",
    textColor: "text-white",
  },
  {
    hex: "#c4a35a",
    name: "Brass Gold",
    subtitle: "atomic clock hands",
    textColor: "text-[#3d3d3d]",
  },
  {
    hex: "#3d3d3d",
    name: "Charcoal",
    subtitle: "wrought iron legs",
    textColor: "text-white",
  },
];

const typographyScale = [
  {
    label: "Display",
    className: "text-5xl font-bold uppercase tracking-[0.3em] text-[#3d3d3d]",
    sample: "ATOMIC AGE",
    note: "Display — All-caps, ultra-wide tracking, 48px+",
  },
  {
    label: "Headline",
    className: "text-3xl font-bold uppercase tracking-[0.2em] text-[#3d3d3d]",
    sample: "MID-CENTURY MODERN",
    note: "H1 — Section titles, wide tracking",
  },
  {
    label: "Subtitle",
    className: "text-lg uppercase tracking-wider text-[#2a6e5e] font-sans",
    sample: "Atomic Age Optimism",
    note: "Subtitle — Teal accent, tracking-wider",
  },
  {
    label: "Body",
    className: "font-sans text-[#3d3d3d]/75 leading-relaxed text-base",
    sample:
      "Functional forms rooted in organic nature — furniture and architecture for postwar optimism.",
    note: "Body — Sans-serif, 75% charcoal, relaxed leading",
  },
  {
    label: "Caption",
    className: "text-xs uppercase tracking-widest text-[#c4a35a]",
    sample: "EAMES ERA / 1950 — 1970",
    note: "Caption — Gold, extra-wide tracking, all-caps",
  },
];

const atomicShapes = [
  {
    id: "starburst",
    name: "Starburst",
    era: "The 12-point star appeared on everything from wallpaper to clock faces — symbolizing atomic energy and optimism.",
    year: "1950s",
  },
  {
    id: "boomerang",
    name: "Boomerang",
    era: "Asymmetric organic curves inspired by Australian boomerangs, used in Formica patterns and furniture legs.",
    year: "1952",
  },
  {
    id: "kidney",
    name: "Kidney",
    era: "The iconic kidney bean shape defined pool design, coffee tables, and decorative trays of the era.",
    year: "1948",
  },
  {
    id: "atomic",
    name: "Atomic Model",
    era: "Orbital diagrams of the atom became a ubiquitous motif, celebrating nuclear science and space-age ambition.",
    year: "1957",
  },
];

const doRules = [
  "Analog Switch shadows: rest shadow-[4px_4px_0_#3d3d3d], hover shifts +2px and translates -2px/-2px",
  "Flat color blocks only — no gradients, no blur, no drop-shadow filters",
  "Sans-serif uppercase with wide letter-spacing for all headings and labels",
  "Organic border-radius shapes: kidney, boomerang, amoeba — never perfect circles",
  "Hard offset shadow cards: border-2 border-[#3d3d3d] shadow-[4px_4px_0_#3d3d3d]",
  "Brass Shimmer on starburst icons: rotate-45 + gold color shift on group-hover",
  "Expanding accent line on cards: w-12 grows to w-20 on group-hover",
  "Teal for subtitles and secondary info — burnt orange for primary CTAs only",
];

const dontRules = [
  "Never use gradient backgrounds — all fills must be flat solid colors",
  "Never use rounded-full (circle) shapes — use organic curves instead",
  "Never use serif fonts of any kind — this is a pure sans-serif system",
  "Never use neon or fluorescent colors — palette is warm, muted, earthy",
  "Never use more than 2px border-radius on rectangular elements",
  "Never use box-shadow blur — only hard offset shadows (no blur radius)",
  "Never center-align body text — left alignment preserves hierarchy",
  "Never use opacity transitions for hover — use shadow and translate shifts",
];

const timeline = [
  {
    year: "1945",
    title: "Post-War Optimism",
    desc: "World War II ends. Soldiers return home to a booming economy and a hunger for modern, affordable design. Plywood and molded plastics — war-era materials — enter the domestic sphere.",
    color: "#e8572a",
  },
  {
    year: "1950s",
    title: "Eames & Saarinen Era",
    desc: "Charles and Ray Eames define organic functionalism with their iconic shell chairs. Eero Saarinen counters with the Tulip chair. Danish designers bring teak and clean lines to living rooms worldwide.",
    color: "#2a6e5e",
  },
  {
    year: "1960s",
    title: "Space Age Influence",
    desc: "Sputnik launches in 1957. The space race transforms aesthetics — starbursts, atomic motifs, and satellite shapes dominate interiors. George Nelson's Marshmallow Sofa and Ball Clock become icons.",
    color: "#c4a35a",
  },
  {
    year: "1970s",
    title: "Legacy & Revival",
    desc: "The style gives way to postmodernism, but its influence endures. By the 1990s and 2000s, collectors drive a global MCM revival. Today it remains the definitive 20th-century American domestic aesthetic.",
    color: "#3d3d3d",
  },
];

/* ------------------------------------------------------------------ */
/*  SVG Shape Components                                                */
/* ------------------------------------------------------------------ */

function StarburstSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="50,5 54,38 67,8 63,41 80,20 68,48 92,38 73,58 100,58 76,70 100,82 73,74 87,98 65,82 68,108 50,87 32,108 35,82 13,98 27,74 0,82 24,70 0,58 27,58 8,38 32,48 20,20 37,41 33,8 46,38" />
    </svg>
  );
}

function BoomerangSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10,60 C10,60 20,10 60,15 C100,20 115,55 110,65 C105,75 90,70 85,60 C80,50 70,35 55,32 C40,29 30,55 25,65 C20,75 10,60 10,60 Z" />
    </svg>
  );
}

function AtomicSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
      <ellipse cx="50" cy="50" rx="40" ry="16" />
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="16"
        transform="rotate(60 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="16"
        transform="rotate(120 50 50)"
      />
      <circle cx="90" cy="50" r="4" fill="currentColor" stroke="none" />
      <circle cx="70" cy="22" r="4" fill="currentColor" stroke="none" />
      <circle cx="30" cy="78" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SmallStarSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="30,3 33,24 44,7 40,27 56,16 44,33 62,33 44,43 60,54 41,47 50,66 30,52 10,66 19,47 0,54 16,43 -2,33 16,33 4,16 20,27 16,7 27,24" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function MCMButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold" | "outline";
}) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 font-sans font-bold uppercase tracking-wider text-sm border-2 border-[#3d3d3d] transition-all duration-150 cursor-pointer select-none";

  if (variant === "primary") {
    return (
      <button
        className={`${base} bg-[#e8572a] text-white shadow-[4px_4px_0_#3d3d3d] hover:shadow-[6px_6px_0_#3d3d3d] hover:-translate-y-[2px] hover:-translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]`}
      >
        {children}
      </button>
    );
  }
  if (variant === "secondary") {
    return (
      <button
        className={`${base} bg-[#2a6e5e] text-white shadow-[4px_4px_0_#3d3d3d] hover:shadow-[6px_6px_0_#3d3d3d] hover:-translate-y-[2px] hover:-translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]`}
      >
        {children}
      </button>
    );
  }
  if (variant === "gold") {
    return (
      <button
        className={`${base} bg-[#c4a35a] text-[#3d3d3d] shadow-[4px_4px_0_#3d3d3d] hover:shadow-[6px_6px_0_#3d3d3d] hover:-translate-y-[2px] hover:-translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`${base} bg-transparent text-[#3d3d3d] shadow-[4px_4px_0_#3d3d3d] hover:shadow-[6px_6px_0_#3d3d3d] hover:-translate-y-[2px] hover:-translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]`}
    >
      {children}
    </button>
  );
}

function MCMCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative bg-[#f5f0e1] border-2 border-[#3d3d3d] rounded-xl shadow-[4px_4px_0_#3d3d3d] hover:shadow-[8px_8px_0_#3d3d3d] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

function MCMInput({
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
      <label className="block text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border-2 border-[#3d3d3d]/30 rounded-lg text-[#3d3d3d] placeholder-[#3d3d3d]/40 font-sans text-sm focus:outline-none focus:border-[#e8572a] focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)] transition-all duration-200"
      />
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-3">
      {text}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-wide text-[#3d3d3d] mb-4">
      {children}
    </h2>
  );
}

function OrangeDivider() {
  return <div className="h-1 w-16 bg-[#e8572a] mb-12" />;
}

/* ------------------------------------------------------------------ */
/*  Shape Gallery Card                                                  */
/* ------------------------------------------------------------------ */

function ShapeCard({ shape }: { shape: (typeof atomicShapes)[0] }) {
  return (
    <MCMCard className="p-6 overflow-hidden">
      {/* Star decoration top right */}
      <div className="absolute top-4 right-4 text-[#c4a35a]/20 group-hover:text-[#c4a35a]/50 group-hover:rotate-45 transition-all duration-500">
        <SmallStarSVG className="w-8 h-8" />
      </div>

      {/* Shape render */}
      <div className="flex items-center justify-center h-24 mb-4">
        {shape.id === "starburst" && (
          <StarburstSVG className="w-20 h-20 text-[#c4a35a] group-hover:text-[#a88945] group-hover:rotate-45 transition-all duration-500" />
        )}
        {shape.id === "boomerang" && (
          <BoomerangSVG className="w-24 h-16 text-[#2a6e5e]" />
        )}
        {shape.id === "kidney" && (
          <div
            className="w-24 h-16 bg-[#e8572a]"
            style={{
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
          />
        )}
        {shape.id === "atomic" && (
          <AtomicSVG className="w-20 h-20 text-[#3d3d3d]" />
        )}
      </div>

      {/* Info */}
      <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-1">
        {shape.year}
      </p>
      <h3 className="text-lg font-bold uppercase tracking-wider text-[#3d3d3d] mb-2">
        {shape.name}
      </h3>
      <div className="w-12 h-1 bg-[#e8572a] group-hover:w-20 transition-all duration-300 mb-3" />
      <p className="text-sm text-[#3d3d3d]/70 leading-relaxed">
        {shape.era}
      </p>
    </MCMCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export default function MidCenturyModernShowcase() {
  const [activeTab, setActiveTab] = useState<"Buttons" | "Cards" | "Inputs">(
    "Buttons"
  );
  const [heroRevealed, setHeroRevealed] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // heroInView used for potential future use; suppress unused warning via void
  void heroInView;

  return (
    <div className="min-h-screen bg-[#f5f0e1] text-[#3d3d3d] font-sans">

      {/* ===== 1. Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e1] border-b-2 border-[#3d3d3d]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link
              href="/styles/mid-century-modern/showcase"
              className="font-sans font-bold uppercase tracking-wider text-sm text-[#e8572a]"
            >
              MID-CENTURY
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {["Colors", "Shapes", "Typography", "Components", "Timeline"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#3d3d3d] hover:text-[#e8572a] transition-colors duration-200"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* CTA */}
            <Link
              href="/styles"
              className="text-xs font-bold uppercase tracking-wider text-[#3d3d3d] hover:text-[#e8572a] transition-colors duration-200"
            >
              StyleKit &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section
        className="pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
        ref={heroRef}
      >
        {/* Organic background shapes */}
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#2a6e5e]/10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-16 right-24 w-40 h-28 bg-[#e8572a]/8 pointer-events-none"
          style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-32 right-32 w-16 h-16 bg-[#e8572a]/10 rotate-45 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-24 left-48 w-12 h-8 bg-[#c4a35a]/15 pointer-events-none"
          style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
          aria-hidden="true"
        />

        {/* Starburst decoration top right */}
        <div
          className="absolute top-24 right-16 text-[#c4a35a]/20 pointer-events-none hidden md:block"
          aria-hidden="true"
        >
          <StarburstSVG className="w-32 h-32" />
        </div>

        <div className="relative">
          {/* Label */}
          <p
            className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Atomic Age Design / 1945 &ndash; 1975
          </p>

          {/* Orange divider */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
            }}
          >
            <div className="h-1 w-16 bg-[#e8572a] mb-8" />
          </div>

          {/* Title */}
          <h1
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="block text-6xl md:text-8xl font-sans font-bold text-[#3d3d3d] uppercase tracking-wide leading-none">
              MID-CENTURY
            </span>
            <span className="block text-6xl md:text-8xl font-sans font-bold text-[#e8572a] uppercase tracking-wide leading-none">
              MODERN
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#2a6e5e] text-xl font-sans tracking-widest uppercase mt-6 mb-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            Atomic Age Optimism
          </p>

          {/* Description */}
          <p
            className="text-[#3d3d3d]/70 max-w-xl leading-relaxed mb-10 text-base"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            Organic curves meet machine precision. The 1950s Atomic Age
            translated post-war optimism into furniture, textiles, and
            architecture — bold colors, starburst patterns, and biomorphic
            forms that made modernity feel warm and livable.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s",
            }}
          >
            <MCMButton variant="primary">Explore the Era</MCMButton>
            <MCMButton variant="outline">View Components</MCMButton>
          </div>
        </div>
      </section>

      {/* ===== 3. Components Demo ===== */}
      <section
        id="components"
        className="py-24 md:py-32 px-6 md:px-12 bg-white border-t-2 border-[#3d3d3d]"
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel text="UI Elements" />
            <SectionHeading>Components</SectionHeading>
            <OrangeDivider />
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.05} className="mb-12">
            <div className="flex border-b-2 border-[#3d3d3d]">
              {(["Buttons", "Cards", "Inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 font-sans font-bold uppercase tracking-wider text-sm border-2 border-b-0 border-[#3d3d3d] -mb-[2px] transition-colors duration-150 ${
                    activeTab === tab
                      ? "bg-[#e8572a] text-white"
                      : "bg-[#f5f0e1] text-[#3d3d3d] hover:bg-[#e8572a]/10"
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
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                    Primary — Burnt orange with analog switch shadow
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <MCMButton variant="primary">Explore Era</MCMButton>
                    <MCMButton variant="primary">Get Started</MCMButton>
                    <MCMButton variant="primary">View Collection</MCMButton>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                    Secondary — Peacock teal with mechanical press effect
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <MCMButton variant="secondary">Learn More</MCMButton>
                    <MCMButton variant="secondary">Design Guide</MCMButton>
                    <MCMButton variant="secondary">View Docs</MCMButton>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                    Gold Accent — Brass shimmer for tertiary actions
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <MCMButton variant="gold">Download</MCMButton>
                    <MCMButton variant="gold">Contact Us</MCMButton>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                    Outline — Charcoal border for ghost / secondary CTA
                  </p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <MCMButton variant="outline">Read Article</MCMButton>
                    <MCMButton variant="outline">See Examples</MCMButton>
                  </div>
                </div>

                <div className="p-6 bg-[#f5f0e1] border-2 border-[#3d3d3d] rounded-xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-4">
                    Analog Switch Mechanic
                  </p>
                  <p className="text-sm text-[#3d3d3d]/70 leading-relaxed">
                    Rest state: <code className="text-[#e8572a]">shadow-[4px_4px_0_#3d3d3d]</code>
                    &nbsp;&mdash; Hover: shadow grows to 6px and button lifts -2px on both axes &mdash;
                    Active: shadow collapses completely, button presses +4px down-right (mechanical press).
                  </p>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "Cards" && (
            <RevealBlock>
              <div className="space-y-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                    Retro Elevation Card — Hard offset border shadow, starburst, expanding accent line
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        tag: "Furniture",
                        title: "Eames Lounge Chair",
                        desc: "Molded plywood shell with leather upholstery — the definitive icon of mid-century comfort and craftsmanship.",
                        year: "1956",
                      },
                      {
                        tag: "Architecture",
                        title: "Case Study Houses",
                        desc: "Arts & Architecture magazine's bold experiment in modern living — steel, glass, and open floor plans for postwar California.",
                        year: "1945",
                      },
                    ].map((card) => (
                      <MCMCard key={card.title} className="p-6 overflow-hidden">
                        <div className="absolute top-4 right-4 text-[#c4a35a] group-hover:rotate-45 group-hover:text-[#a88945] transition-all duration-500">
                          <SmallStarSVG className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-2">
                          {card.tag} / {card.year}
                        </p>
                        <h3 className="text-xl font-bold uppercase tracking-wider text-[#3d3d3d] mb-2">
                          {card.title}
                        </h3>
                        <div className="w-12 h-1 bg-[#e8572a] group-hover:w-20 transition-all duration-300 mb-3" />
                        <p className="text-sm text-[#3d3d3d]/70 leading-relaxed">
                          {card.desc}
                        </p>
                      </MCMCard>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                    Stat Cards — Bold numbers with teal accent label
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { num: "1945", label: "Era Begins", sub: "Post-war boom" },
                      { num: "5", label: "Key Colors", sub: "The MCM palette" },
                      { num: "12pt", label: "Starburst", sub: "Atomic icon" },
                    ].map((stat) => (
                      <MCMCard key={stat.label} className="p-6 text-center">
                        <p className="text-3xl font-bold uppercase tracking-wide text-[#e8572a] mb-1">
                          {stat.num}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#2a6e5e] mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xs text-[#3d3d3d]/50 uppercase tracking-wider">
                          {stat.sub}
                        </p>
                      </MCMCard>
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a]">
                  Rounded border inputs — focus activates burnt orange ring with 15% opacity glow
                </p>

                <div className="max-w-md space-y-6">
                  <MCMInput label="Full Name" placeholder="Charles Eames" />
                  <MCMInput
                    label="Email Address"
                    placeholder="hello@eamesoffice.com"
                    type="email"
                  />
                  <MCMInput label="Organization" placeholder="Herman Miller" />
                  <MCMInput
                    label="Subject"
                    placeholder="Organic Modern Furniture Design"
                  />
                </div>

                <div className="max-w-md">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your atomic age inspiration..."
                    className="w-full px-4 py-3 bg-white border-2 border-[#3d3d3d]/30 rounded-lg text-[#3d3d3d] placeholder-[#3d3d3d]/40 font-sans text-sm focus:outline-none focus:border-[#e8572a] focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)] transition-all duration-200 resize-none"
                  />
                </div>

                <MCMButton variant="primary">Send Message</MCMButton>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section
        id="colors"
        className="py-24 md:py-32 px-6 md:px-12 bg-[#f5f0e1] border-t-2 border-[#3d3d3d]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionLabel text="Atomic Age Palette" />
            <SectionHeading>Color System</SectionHeading>
            <OrangeDivider />
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 border-2 border-[#3d3d3d] rounded-xl overflow-hidden shadow-[4px_4px_0_#3d3d3d]">
            {colorPalette.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.07}>
                <div
                  className="group p-6 h-56 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform duration-200 border-r-2 border-[#3d3d3d] last:border-r-0"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-1 ${swatch.textColor} opacity-70`}
                    >
                      {swatch.hex}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-base font-bold uppercase tracking-wider leading-tight ${swatch.textColor}`}
                    >
                      {swatch.name}
                    </p>
                    <p
                      className={`text-xs uppercase tracking-wider mt-1 ${swatch.textColor} opacity-60`}
                    >
                      {swatch.subtitle}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage notes */}
          <RevealBlock delay={0.4} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Primary Action",
                  color: "#e8572a",
                  usage:
                    "CTAs, accent bars, headings — the warm engine of the palette",
                },
                {
                  title: "Supporting Structure",
                  color: "#2a6e5e",
                  usage: "Subtitles, secondary buttons, timeline markers",
                },
                {
                  title: "Brass Details",
                  color: "#c4a35a",
                  usage:
                    "Labels, captions, starburst icons — the metallic shimmer",
                },
              ].map((note) => (
                <div
                  key={note.title}
                  className="flex items-start gap-4 p-4 bg-white border-2 border-[#3d3d3d] rounded-xl shadow-[3px_3px_0_#3d3d3d]"
                >
                  <div
                    className="w-5 h-5 rounded-sm flex-shrink-0 mt-0.5 border border-[#3d3d3d]/20"
                    style={{ backgroundColor: note.color }}
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#3d3d3d] mb-1">
                      {note.title}
                    </p>
                    <p className="text-sm text-[#3d3d3d]/60 leading-relaxed">
                      {note.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Atomic Shapes Gallery ===== */}
      <section
        id="shapes"
        className="py-24 md:py-32 px-6 md:px-12 bg-white border-t-2 border-[#3d3d3d]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionLabel text="Signature Motifs" />
            <SectionHeading>Atomic Shapes</SectionHeading>
            <OrangeDivider />
            <p className="text-[#3d3d3d]/60 max-w-xl leading-relaxed mb-12">
              Mid-century modern design drew its shape vocabulary from atomic
              science, natural forms, and a postwar fascination with organic
              geometry. These shapes appear in everything from wallpaper to
              architecture.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atomicShapes.map((shape, i) => (
              <RevealBlock key={shape.id} delay={i * 0.08}>
                <ShapeCard shape={shape} />
              </RevealBlock>
            ))}
          </div>

          {/* Additional shape showcase */}
          <RevealBlock delay={0.35} className="mt-12">
            <div className="p-8 bg-[#f5f0e1] border-2 border-[#3d3d3d] rounded-xl shadow-[4px_4px_0_#3d3d3d]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-6">
                Shape Construction Examples
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-20 h-14 bg-[#e8572a]"
                    style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
                  />
                  <p className="text-xs text-[#3d3d3d]/50 uppercase tracking-wider text-center">
                    Biomorphic
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-20 h-14 bg-[#2a6e5e]"
                    style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
                  />
                  <p className="text-xs text-[#3d3d3d]/50 uppercase tracking-wider text-center">
                    Kidney
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-20 h-14 bg-[#c4a35a]"
                    style={{ borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%" }}
                  />
                  <p className="text-xs text-[#3d3d3d]/50 uppercase tracking-wider text-center">
                    Amoeba
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 bg-[#3d3d3d] rotate-45"
                    style={{ borderRadius: "20% 0 20% 0" }}
                  />
                  <p className="text-xs text-[#3d3d3d]/50 uppercase tracking-wider text-center">
                    Diamond
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <StarburstSVG className="w-14 h-14 text-[#e8572a]" />
                  <p className="text-xs text-[#3d3d3d]/50 uppercase tracking-wider text-center">
                    Starburst
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Typography Specimen ===== */}
      <section
        id="typography"
        className="py-24 md:py-32 px-6 md:px-12 bg-[#f5f0e1] border-t-2 border-[#3d3d3d]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionLabel text="Type System" />
            <SectionHeading>Typography</SectionHeading>
            <OrangeDivider />
          </RevealBlock>

          <div className="space-y-0 border-2 border-[#3d3d3d] rounded-xl overflow-hidden shadow-[4px_4px_0_#3d3d3d] bg-white">
            {typographyScale.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.06}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 px-8 py-6 border-b-2 border-[#3d3d3d] last:border-b-0 hover:bg-[#f5f0e1] transition-colors duration-200">
                  <div className="md:w-28 flex-shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] group-hover:text-[#e8572a] transition-colors duration-200">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className={`${item.className} leading-tight truncate`}>
                      {item.sample}
                    </p>
                  </div>
                  <div className="md:w-64 flex-shrink-0">
                    <p className="text-xs text-[#3d3d3d]/50 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Tracking demonstration */}
          <RevealBlock delay={0.35} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white border-2 border-[#3d3d3d] rounded-xl shadow-[4px_4px_0_#3d3d3d]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-4">
                  Wide Tracking — Labels
                </p>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3d3d3d]">
                  CATEGORY / DATE / AUTHOR
                </p>
                <p className="text-xs text-[#3d3d3d]/50 mt-3">
                  tracking-[0.3em] — creates hierarchy without size increase
                </p>
              </div>
              <div className="p-8 bg-white border-2 border-[#3d3d3d] rounded-xl shadow-[4px_4px_0_#3d3d3d]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-4">
                  Teal Subtitle — Secondary label
                </p>
                <p className="text-lg uppercase tracking-wider text-[#2a6e5e] font-sans">
                  Atomic Age Optimism
                </p>
                <p className="text-xs text-[#3d3d3d]/50 mt-3">
                  tracking-wider + teal — authority and warmth balanced
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. DO / DON'T Cards ===== */}
      <section
        id="rules"
        className="py-24 md:py-32 px-6 md:px-12 bg-white border-t-2 border-[#3d3d3d]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionLabel text="Design Rules" />
            <SectionHeading>Do &amp; Don&apos;t</SectionHeading>
            <OrangeDivider />
            <p className="text-[#3d3d3d]/60 max-w-xl leading-relaxed mb-12">
              Mid-century modern has a clear visual language. These rules define
              what makes the style authentic versus what breaks its integrity.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock delay={0.05}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-4 bg-[#e8572a] border-2 border-[#3d3d3d]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#3d3d3d]">
                    Do
                  </h3>
                </div>
                <ul className="space-y-0">
                  {doRules.map((rule, i) => (
                    <li
                      key={rule}
                      className="group flex gap-4 py-4 border-2 border-[#3d3d3d] shadow-[3px_3px_0_#e8572a] bg-[#f5f0e1] px-4 mb-3 rounded-lg hover:-translate-y-[1px] hover:shadow-[4px_4px_0_#e8572a] transition-all duration-200 cursor-default"
                    >
                      <span className="text-xs font-bold text-[#e8572a] flex-shrink-0 mt-0.5 uppercase tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#3d3d3d]/80 leading-relaxed">
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
                  <div className="w-4 h-4 bg-[#3d3d3d]/20 border-2 border-[#3d3d3d]/30" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#3d3d3d]/40">
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-0">
                  {dontRules.map((rule, i) => (
                    <li
                      key={rule}
                      className="flex gap-4 py-4 border-2 border-[#3d3d3d]/20 bg-[#f5f0e1]/50 px-4 mb-3 rounded-lg cursor-default"
                    >
                      <span className="text-xs font-bold text-[#3d3d3d]/30 flex-shrink-0 mt-0.5 uppercase tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#3d3d3d]/40 leading-relaxed line-through">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 8. Design Era Timeline ===== */}
      <section
        id="timeline"
        className="py-24 md:py-32 px-6 md:px-12 bg-[#f5f0e1] border-t-2 border-[#3d3d3d]"
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionLabel text="Historical Context" />
            <SectionHeading>Design Era</SectionHeading>
            <OrangeDivider />
            <p className="text-[#3d3d3d]/60 max-w-xl leading-relaxed mb-12">
              Mid-century modern spans three transformative decades, from
              post-war reconstruction to the space age. Each period brought new
              influences that shaped the style&apos;s enduring aesthetic.
            </p>
          </RevealBlock>

          <div className="space-y-6">
            {timeline.map((entry, i) => (
              <RevealBlock key={entry.year} delay={i * 0.09}>
                <div className="group flex flex-col md:flex-row gap-0 border-2 border-[#3d3d3d] rounded-xl overflow-hidden shadow-[4px_4px_0_#3d3d3d] hover:shadow-[8px_8px_0_#3d3d3d] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 bg-white cursor-pointer">
                  {/* Year block */}
                  <div
                    className="flex-shrink-0 md:w-40 flex flex-col items-center justify-center py-8 px-6 border-b-2 md:border-b-0 md:border-r-2 border-[#3d3d3d]"
                    style={{ backgroundColor: entry.color }}
                  >
                    <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white leading-none">
                      {entry.year}
                    </p>
                    <div className="w-8 h-0.5 bg-white/50 mt-3" />
                  </div>

                  {/* Content block */}
                  <div className="flex-1 p-6 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-2">
                      Era Marker
                    </p>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-[#3d3d3d] mb-2 group-hover:text-[#e8572a] transition-colors duration-200">
                      {entry.title}
                    </h3>
                    <div className="w-12 h-1 bg-[#e8572a] group-hover:w-20 transition-all duration-300 mb-4" />
                    <p className="text-sm text-[#3d3d3d]/70 leading-relaxed max-w-2xl">
                      {entry.desc}
                    </p>
                  </div>

                  {/* Starburst decoration */}
                  <div className="hidden md:flex flex-shrink-0 w-24 items-center justify-center text-[#3d3d3d]/10 group-hover:text-[#c4a35a]/30 transition-colors duration-300">
                    <StarburstSVG className="w-16 h-16" />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Summary card */}
          <RevealBlock delay={0.4} className="mt-12">
            <div className="p-8 bg-[#3d3d3d] border-2 border-[#3d3d3d] rounded-xl shadow-[4px_4px_0_#e8572a] text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-3">
                    Legacy
                  </p>
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-3">
                    Timeless Influence
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Mid-century modern remains the most collectible and
                    reproduced design period in history. Its blend of
                    optimism, functionality, and organic warmth continues
                    to define aspirational interior design worldwide.
                  </p>
                </div>
                <div className="flex-shrink-0 text-[#c4a35a]/40">
                  <StarburstSVG className="w-24 h-24" />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 9. Footer ===== */}
      <footer className="bg-[#f5f0e1] border-t-2 border-[#3d3d3d] pt-2">
        {/* Orange accent bar */}
        <div className="h-2 w-full bg-[#e8572a]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Brand column */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <SmallStarSVG className="w-6 h-6 text-[#e8572a]" />
                <p className="font-sans font-bold uppercase tracking-wider text-sm text-[#3d3d3d]">
                  Mid-Century Modern
                </p>
              </div>
              <p className="text-sm text-[#3d3d3d]/60 leading-relaxed max-w-xs">
                Organic curves, atomic motifs, and postwar optimism — the
                design language that defined an era and never really left.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <SmallStarSVG className="w-4 h-4 text-[#c4a35a]" />
                <SmallStarSVG className="w-3 h-3 text-[#e8572a]" />
                <SmallStarSVG className="w-5 h-5 text-[#2a6e5e]" />
              </div>
            </div>

            {/* Nav columns */}
            <div className="md:col-span-2 md:col-start-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-4">
                Sections
              </p>
              <ul className="space-y-3">
                {[
                  "Colors",
                  "Shapes",
                  "Typography",
                  "Components",
                  "Timeline",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-[#3d3d3d] hover:text-[#e8572a] transition-colors duration-200 uppercase tracking-wider font-sans"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-4">
                Resources
              </p>
              <ul className="space-y-3">
                {[
                  {
                    label: "Documentation",
                    href: "/styles/mid-century-modern",
                  },
                  { label: "All Styles", href: "/styles" },
                  { label: "Swiss Style", href: "/styles/swiss-style" },
                  { label: "StyleKit", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#2a6e5e] hover:text-[#e8572a] transition-colors duration-200 uppercase tracking-wider font-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c4a35a] mb-4">
                Principles
              </p>
              <ul className="space-y-3">
                {[
                  "Organic Form",
                  "Flat Color",
                  "Hard Shadows",
                  "Sans-Serif",
                  "Optimism",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-[#3d3d3d]/50 uppercase tracking-wider">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t-2 border-[#3d3d3d]/20 gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3d3d3d]/40">
              Mid-Century Modern &mdash; StyleKit Component System
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-[#3d3d3d]/30 uppercase tracking-wider">
                Eames &mdash; Saarinen &mdash; Nelson &mdash; 1945&ndash;1975
              </span>
              <SmallStarSVG className="w-5 h-5 text-[#e8572a]" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
