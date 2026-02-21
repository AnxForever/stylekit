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
/*  Inline SVG accents — Mid-Century Modern motifs                     */
/* ------------------------------------------------------------------ */

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

function StarburstIcon({ className = "", style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="12,0 14,9 24,9 16,14 18,24 12,18 6,24 8,14 0,9 10,9" />
    </svg>
  );
}

function AtomIcon({ className = "", style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" />
      <ellipse cx="24" cy="24" rx="20" ry="8" />
      <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)" />
    </svg>
  );
}

function BoomerangIcon({ className = "", style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 38 Q6 10 38 10 Q30 10 30 24 Q30 38 6 38Z" />
    </svg>
  );
}

function OrganicDotIcon({ className = "", style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="16" cy="16" rx="10" ry="14" transform="rotate(20 16 16)" />
    </svg>
  );
}

function DiamondIcon({ className = "", style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="12,2 22,12 12,22 2,12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color tokens                                                       */
/* ------------------------------------------------------------------ */

const MCM = {
  orange: "#e8572a",
  cream: "#f5f0e1",
  teal: "#2a6e5e",
  gold: "#c4a35a",
  charcoal: "#3d3d3d",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatch = [
  { name: "Burnt Orange", hex: MCM.orange, label: "Primary" },
  { name: "Warm Cream", hex: MCM.cream, label: "Background" },
  { name: "Teal Green", hex: MCM.teal, label: "Secondary" },
  { name: "Brushed Gold", hex: MCM.gold, label: "Accent" },
  { name: "Charcoal", hex: MCM.charcoal, label: "Text" },
];

const furnitureItems = [
  {
    name: "Eames Lounge Chair",
    material: "Walnut + Leather",
    year: "1956",
    color: MCM.orange,
    icon: <BoomerangIcon className="w-8 h-8" />,
  },
  {
    name: "Tulip Side Table",
    material: "Fibreglass + Marble",
    year: "1957",
    color: MCM.teal,
    icon: <OrganicDotIcon className="w-8 h-8" />,
  },
  {
    name: "Egg Chair",
    material: "Fibreglass + Fabric",
    year: "1958",
    color: MCM.gold,
    icon: <DiamondIcon className="w-8 h-8" />,
  },
  {
    name: "Atomic Clock",
    material: "Brass + Enamel",
    year: "1951",
    color: MCM.orange,
    icon: <AtomIcon className="w-8 h-8" />,
  },
];

const timelineItems = [
  {
    year: "1945",
    title: "Post-War Optimism",
    desc: "New materials from wartime industry — fibreglass, plywood, aluminium — enter domestic design.",
    color: MCM.orange,
  },
  {
    year: "1950",
    title: "Atomic Age",
    desc: "Space-age motifs flood interior design: starburst clocks, satellite lamps, and orbital shapes.",
    color: MCM.teal,
  },
  {
    year: "1956",
    title: "Eames Era",
    desc: "Charles and Ray Eames launch icons that define the style: lounge chairs, wire chairs, shell seats.",
    color: MCM.gold,
  },
  {
    year: "1963",
    title: "Organic Modernism",
    desc: "Kidney-shaped tables and boomerang forms push away from rigid geometry toward natural curves.",
    color: MCM.orange,
  },
  {
    year: "1969",
    title: "Space Age Peak",
    desc: "Moon landing cements the atomic-age aesthetic; bubble chairs and pod sofas become cultural icons.",
    color: MCM.teal,
  },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  // Animation rule demos
  const [analogPressed, setAnalogPressed] = useState(false);
  const [brassHovered, setBrassHovered] = useState(false);
  const [retroCardHovered, setRetroCardHovered] = useState(false);
  const [warmDimTarget, setWarmDimTarget] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: MCM.cream, color: MCM.charcoal }}
    >
      <style>{`
        @keyframes mcm-rotate-starburst {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes mcm-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes mcm-pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes mcm-orbit {
          from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
        }
        .mcm-starburst-spin {
          animation: mcm-rotate-starburst 18s linear infinite;
        }
        .mcm-float-anim {
          animation: mcm-float 5s ease-in-out infinite;
        }
        .mcm-orbit-anim {
          animation: mcm-orbit 4s linear infinite;
        }
        .mcm-analog-btn {
          transition: box-shadow 120ms ease-out, transform 120ms ease-out;
        }
        .mcm-analog-btn:active {
          box-shadow: none !important;
          transform: translate(4px, 4px) !important;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: `${MCM.cream}ee`,
          backdropFilter: "blur(12px)",
          borderColor: `${MCM.charcoal}22`,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-lg border-2"
            style={{ borderColor: MCM.charcoal, backgroundColor: MCM.cream }}
          >
            <StarburstIcon
              className="w-4 h-4 mcm-float-anim"
              style={{ color: MCM.gold } as React.CSSProperties}
            />
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: MCM.charcoal }}
            >
              Mid<span style={{ color: MCM.orange }}>Century</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Animations", "Collection", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm font-medium uppercase tracking-wide cursor-pointer"
                style={{ color: `${MCM.charcoal}99`, transition: "color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = MCM.orange;
                  (e.currentTarget as HTMLElement).style.background = `${MCM.orange}11`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = `${MCM.charcoal}99`;
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 font-semibold uppercase tracking-wider text-sm mcm-analog-btn"
            style={{
              backgroundColor: MCM.orange,
              color: MCM.cream,
              borderColor: MCM.charcoal,
              boxShadow: `4px 4px 0 ${MCM.charcoal}`,
            }}
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section
        className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden"
        style={{ backgroundColor: MCM.cream }}
      >
        {/* Background organic shapes */}
        <div
          className="absolute top-16 right-[-40px] w-64 h-64 pointer-events-none opacity-10"
          style={{
            backgroundColor: MCM.teal,
            borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
          }}
        />
        <div
          className="absolute bottom-20 left-[-60px] w-80 h-48 pointer-events-none opacity-8"
          style={{
            backgroundColor: MCM.orange,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 rotate-45 pointer-events-none"
          style={{ backgroundColor: `${MCM.gold}20` }}
        />

        {/* Floating starburst accents */}
        <div
          className="absolute top-20 right-24 pointer-events-none hidden md:block mcm-starburst-spin"
          style={{ color: `${MCM.gold}60` } as React.CSSProperties}
        >
          <StarburstIcon className="w-12 h-12" />
        </div>
        <div
          className="absolute bottom-32 left-20 pointer-events-none hidden md:block"
          style={{
            color: `${MCM.teal}40`,
            animation: "mcm-float 7s ease-in-out infinite 1.5s",
          } as React.CSSProperties}
        >
          <AtomIcon className="w-14 h-14" />
        </div>
        <div
          className="absolute top-48 left-12 pointer-events-none hidden md:block"
          style={{
            color: `${MCM.orange}30`,
            animation: "mcm-float 6s ease-in-out infinite 0.8s",
          } as React.CSSProperties}
        >
          <DiamondIcon className="w-8 h-8" />
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition:
                "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-xs font-bold uppercase tracking-[0.2em] mb-8"
              style={{
                borderColor: MCM.orange,
                color: MCM.orange,
                backgroundColor: `${MCM.orange}10`,
              }}
            >
              <StarburstIcon className="w-3.5 h-3.5" />
              Atomic Age Design — Mid-Century Modern
              <StarburstIcon className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.05] tracking-wide mb-6 uppercase"
            style={{
              color: MCM.charcoal,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            MID-
            <br />
            <span style={{ color: MCM.orange }}>CENTURY</span>
            <br />
            MODERN
          </h1>

          {/* Divider line — MCM signature */}
          <div
            className="h-1 rounded-full mb-8"
            style={{
              width: heroVisible ? "120px" : "0px",
              backgroundColor: MCM.orange,
              transition: "width 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          />

          {/* Sub */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mb-10 tracking-wide"
            style={{
              color: `${MCM.charcoal}88`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            50s atomic-age optimism fused with organic modernism. Starburst motifs,
            kidney forms, and saturated earth tones for design that is timeless.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            {/* Primary — Analog Switch demo */}
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
              style={{
                backgroundColor: MCM.orange,
                color: MCM.cream,
                borderColor: MCM.charcoal,
                boxShadow: `4px 4px 0 ${MCM.charcoal}`,
              }}
            >
              <StarburstIcon className="w-4 h-4" />
              Explore Collection
            </button>
            {/* Secondary */}
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
              style={{
                backgroundColor: "transparent",
                color: MCM.charcoal,
                borderColor: MCM.charcoal,
                boxShadow: `4px 4px 0 ${MCM.charcoal}`,
              }}
            >
              <AtomIcon className="w-4 h-4" />
              View Styles
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            {[
              { value: "1945", label: "Era Origin", color: MCM.orange },
              { value: "5", label: "Core Colors", color: MCM.teal },
              { value: "12+", label: "Icon Designers", color: MCM.gold },
              { value: "Timeless", label: "Style Verdict", color: MCM.orange },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl border-2 text-center cursor-default"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.charcoal,
                  boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                  transitionDelay: `${i * 0.04}s`,
                  transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${MCM.charcoal}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${MCM.charcoal}`;
                }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider" style={{ color: `${MCM.charcoal}77` }}>
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
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: `${MCM.charcoal}08` }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.orange }}
            >
              Palette
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.charcoal }}
            >
              Earth-Tone <span style={{ color: MCM.orange }}>Color System</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p
              className="text-lg max-w-lg leading-relaxed tracking-wide"
              style={{ color: `${MCM.charcoal}88` }}
            >
              Five saturated-but-restrained earth tones. Warm, grounded, optimistic.
              Drawn from nature and 1950s Formica surfaces. Hover a swatch to see the
              Retro Elevation interaction.
            </p>
          </RevealBlock>

          {/* Swatches — Retro Elevation on hover */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-16">
              {paletteSwatch.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-4 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-xl border-2"
                    style={{
                      backgroundColor: swatch.hex,
                      borderColor: MCM.charcoal,
                      transform:
                        hoveredSwatch === i
                          ? "translate(-4px, -4px)"
                          : "translate(0,0)",
                      boxShadow:
                        hoveredSwatch === i
                          ? `8px 8px 0 ${MCM.charcoal}`
                          : `3px 3px 0 ${MCM.charcoal}`,
                      transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                    }}
                  />
                  <div className="text-center">
                    <div
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{ color: MCM.charcoal }}
                    >
                      {swatch.name}
                    </div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: `${MCM.charcoal}77` }}>
                      {swatch.hex}
                    </div>
                    <span
                      className="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                      style={{
                        color: MCM.orange,
                        borderColor: MCM.orange,
                        backgroundColor: `${MCM.orange}10`,
                      }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color combinations */}
          <RevealBlock delay={0.2}>
            <div
              className="rounded-xl border-2 p-8"
              style={{ borderColor: MCM.charcoal, backgroundColor: MCM.cream, boxShadow: `4px 4px 0 ${MCM.charcoal}` }}
            >
              <p
                className="text-xs font-bold tracking-[0.15em] uppercase mb-6"
                style={{ color: `${MCM.charcoal}77` }}
              >
                Canonical pairings — atomic-age approved
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Primary on Cream",
                    bg: MCM.cream,
                    fg: MCM.orange,
                    border: MCM.charcoal,
                    text: "EXPLORE",
                  },
                  {
                    label: "Cream on Charcoal",
                    bg: MCM.charcoal,
                    fg: MCM.cream,
                    border: MCM.charcoal,
                    text: "DISCOVER",
                  },
                  {
                    label: "Teal on Cream",
                    bg: MCM.cream,
                    fg: MCM.teal,
                    border: MCM.teal,
                    text: "GALLERY",
                  },
                  {
                    label: "Orange on Charcoal",
                    bg: MCM.charcoal,
                    fg: MCM.orange,
                    border: MCM.charcoal,
                    text: "ATOMIC",
                  },
                ].map((pair) => (
                  <div key={pair.label} className="group cursor-default">
                    <div
                      className="h-20 rounded-lg border-2 flex items-center justify-center mb-2 font-bold uppercase tracking-wider text-sm"
                      style={{
                        backgroundColor: pair.bg,
                        color: pair.fg,
                        borderColor: pair.border,
                        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                        boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${MCM.charcoal}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${MCM.charcoal}`;
                      }}
                    >
                      {pair.text}
                    </div>
                    <div className="text-xs text-center" style={{ color: `${MCM.charcoal}77` }}>
                      {pair.label}
                    </div>
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
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.teal }}
            >
              Components
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.charcoal }}
            >
              Atomic-Age <span style={{ color: MCM.orange }}>Building Blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p
              className="text-lg max-w-lg leading-relaxed tracking-wide"
              style={{ color: `${MCM.charcoal}88` }}
            >
              Every component uses hard-edge shadows, organic-ish rounded corners,
              and the Analog Switch press pattern. No gradients. No neon.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold capitalize uppercase tracking-wide border-2 mcm-analog-btn"
                  style={
                    activeTab === tab
                      ? {
                          backgroundColor: MCM.orange,
                          color: MCM.cream,
                          borderColor: MCM.charcoal,
                          boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                        }
                      : {
                          backgroundColor: MCM.cream,
                          color: MCM.charcoal,
                          borderColor: MCM.charcoal,
                          boxShadow: `3px 3px 0 ${MCM.charcoal}`,
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
              className="rounded-xl border-2 p-8 md:p-12"
              style={{
                backgroundColor: MCM.cream,
                borderColor: MCM.charcoal,
                boxShadow: `6px 6px 0 ${MCM.charcoal}`,
              }}
            >
              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Primary — Analog Switch (hard-offset shadow + damped press)
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                        style={{
                          backgroundColor: MCM.orange,
                          color: MCM.cream,
                          borderColor: MCM.charcoal,
                          boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                        }}
                      >
                        <StarburstIcon className="w-4 h-4" />
                        Explore
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                        style={{
                          backgroundColor: MCM.teal,
                          color: MCM.cream,
                          borderColor: MCM.charcoal,
                          boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                        }}
                      >
                        <AtomIcon className="w-4 h-4" />
                        Discover
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                        style={{
                          backgroundColor: MCM.gold,
                          color: MCM.charcoal,
                          borderColor: MCM.charcoal,
                          boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                        }}
                      >
                        <DiamondIcon className="w-4 h-4" />
                        Gallery
                      </button>
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Outline variants — Retro Elevation on hover
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-7 py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                        style={{
                          backgroundColor: "transparent",
                          color: MCM.orange,
                          borderColor: MCM.orange,
                          boxShadow: `4px 4px 0 ${MCM.orange}`,
                        }}
                      >
                        Outlined
                      </button>
                      <button
                        className="px-7 py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                        style={{
                          backgroundColor: "transparent",
                          color: MCM.teal,
                          borderColor: MCM.teal,
                          boxShadow: `4px 4px 0 ${MCM.teal}`,
                        }}
                      >
                        Teal Outline
                      </button>
                      <button
                        className="px-7 py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                        style={{
                          backgroundColor: MCM.charcoal,
                          color: MCM.cream,
                          borderColor: MCM.charcoal,
                          boxShadow: `4px 4px 0 ${MCM.orange}`,
                        }}
                      >
                        Charcoal
                      </button>
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", cls: "px-4 py-2 text-xs" },
                        { size: "md", cls: "px-6 py-3 text-sm" },
                        { size: "lg", cls: "px-9 py-4 text-base" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`rounded-lg border-2 font-bold uppercase tracking-wider mcm-analog-btn ${cls}`}
                          style={{
                            backgroundColor: MCM.orange,
                            color: MCM.cream,
                            borderColor: MCM.charcoal,
                            boxShadow: `4px 4px 0 ${MCM.charcoal}`,
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {furnitureItems.map((item) => (
                    <div
                      key={item.name}
                      className="group relative p-8 rounded-xl border-2 cursor-pointer"
                      style={{
                        backgroundColor: MCM.cream,
                        borderColor: MCM.charcoal,
                        boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0 ${MCM.charcoal}`;
                        (e.currentTarget as HTMLElement).style.backgroundColor = `${MCM.cream}dd`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${MCM.charcoal}`;
                        (e.currentTarget as HTMLElement).style.backgroundColor = MCM.cream;
                      }}
                    >
                      {/* Starburst decoration — Brass Shimmer target */}
                      <div
                        className="absolute top-4 right-4 w-8 h-8"
                        style={{ color: MCM.gold, transition: "transform 0.5s ease-in-out, color 0.3s" }}
                      >
                        <StarburstIcon className="w-full h-full" />
                      </div>

                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${item.color}18`, color: item.color }}
                      >
                        {item.icon}
                      </div>

                      {/* Accent bar */}
                      <div
                        className="h-1 rounded-full mb-4"
                        style={{ width: "48px", backgroundColor: item.color }}
                      />

                      <h4
                        className="text-lg font-bold uppercase tracking-wide mb-1"
                        style={{ color: MCM.charcoal }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-sm mb-3" style={{ color: `${MCM.charcoal}77` }}>
                        {item.material}
                      </p>
                      <span
                        className="inline-block px-3 py-1 rounded border text-xs font-bold uppercase tracking-wider"
                        style={{ borderColor: item.color, color: item.color }}
                      >
                        {item.year}
                      </span>
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
                        className="block text-sm font-bold uppercase tracking-wide mb-2"
                        style={{ color: MCM.charcoal }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Charles Eames..."
                        className="w-full px-5 py-3 rounded-lg border-2 font-sans tracking-wide focus:outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: `${MCM.charcoal}44`,
                          color: MCM.charcoal,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = MCM.orange;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${MCM.orange}22`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${MCM.charcoal}44`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold uppercase tracking-wide mb-2"
                        style={{ color: MCM.charcoal }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="hello@atomic-age.com"
                        className="w-full px-5 py-3 rounded-lg border-2 font-sans tracking-wide focus:outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: `${MCM.charcoal}44`,
                          color: MCM.charcoal,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = MCM.orange;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${MCM.orange}22`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${MCM.charcoal}44`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold uppercase tracking-wide mb-2"
                        style={{ color: MCM.charcoal }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe your vision..."
                        className="w-full px-5 py-3 rounded-lg border-2 font-sans tracking-wide focus:outline-none resize-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: `${MCM.charcoal}44`,
                          color: MCM.charcoal,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = MCM.orange;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${MCM.orange}22`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${MCM.charcoal}44`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-sm font-bold uppercase tracking-wide mb-2"
                        style={{ color: MCM.charcoal }}
                      >
                        Era
                      </label>
                      <select
                        className="w-full px-5 py-3 rounded-lg border-2 font-sans tracking-wide focus:outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: `${MCM.charcoal}44`,
                          color: MCM.charcoal,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = MCM.orange;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${MCM.charcoal}44`;
                        }}
                      >
                        <option>1945 — Post-War</option>
                        <option>1950 — Atomic Age</option>
                        <option>1960 — Space Race</option>
                        <option>1969 — Moon Landing</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded border-2 cursor-pointer"
                        style={{ borderColor: MCM.orange }}
                      />
                      <label
                        className="text-sm tracking-wide cursor-pointer"
                        style={{ color: MCM.charcoal }}
                      >
                        Subscribe to design news
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer"
                        style={{ borderColor: MCM.orange, backgroundColor: MCM.orange }}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label
                        className="text-sm tracking-wide cursor-pointer"
                        style={{ color: MCM.charcoal }}
                      >
                        Atomic-age updates
                      </label>
                    </div>
                    <button
                      className="w-full py-3.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
                      style={{
                        backgroundColor: MCM.orange,
                        color: MCM.cream,
                        borderColor: MCM.charcoal,
                        boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                      }}
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Retro label badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Atomic", bg: MCM.orange, text: MCM.cream },
                        { label: "Eames Era", bg: MCM.teal, text: MCM.cream },
                        { label: "Modernist", bg: MCM.gold, text: MCM.charcoal },
                        { label: "Post-War", bg: MCM.charcoal, text: MCM.cream },
                        { label: "Organic", bg: `${MCM.orange}22`, text: MCM.orange },
                        { label: "Mid-Century", bg: `${MCM.teal}22`, text: MCM.teal },
                        { label: "Functional", bg: `${MCM.gold}22`, text: MCM.charcoal },
                        { label: "Timeless", bg: `${MCM.charcoal}11`, text: MCM.charcoal },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded border-2 text-sm font-bold uppercase tracking-wider cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            borderColor: b.text === MCM.cream ? MCM.charcoal : b.text,
                            transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${MCM.charcoal}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Status badges with icons
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Iconic", icon: "star", bg: MCM.orange, text: MCM.cream },
                        { label: "In Production", icon: "diamond", bg: MCM.teal, text: MCM.cream },
                        { label: "Vintage", icon: "atom", bg: MCM.gold, text: MCM.charcoal },
                        { label: "Archived", icon: "boomerang", bg: `${MCM.charcoal}22`, text: MCM.charcoal },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded border-2 text-sm font-bold uppercase tracking-wider cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            borderColor: MCM.charcoal,
                            boxShadow: `2px 2px 0 ${MCM.charcoal}`,
                          }}
                        >
                          {b.icon === "star" && <StarburstIcon className="w-3.5 h-3.5" />}
                          {b.icon === "diamond" && <DiamondIcon className="w-3.5 h-3.5" />}
                          {b.icon === "atom" && <AtomIcon className="w-3.5 h-3.5" />}
                          {b.icon === "boomerang" && <BoomerangIcon className="w-3.5 h-3.5" />}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Count badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "Designs", count: 48, color: MCM.orange },
                        { label: "Materials", count: 12, color: MCM.teal },
                        { label: "Eras", count: 5, color: MCM.gold },
                        { label: "Icons", count: 99, color: MCM.charcoal },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span
                            className="text-sm font-bold uppercase tracking-wide"
                            style={{ color: MCM.charcoal }}
                          >
                            {b.label}
                          </span>
                          <span
                            className="w-8 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: b.color,
                              borderColor: MCM.charcoal,
                              color: b.color === MCM.gold ? MCM.charcoal : MCM.cream,
                            }}
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
      {/* 5. ANIMATION & INTERACTION RULES DEMO (all 4 aiRules)           */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: `${MCM.charcoal}06` }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.gold }}
            >
              Interactions
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.charcoal }}
            >
              Animation &amp; <span style={{ color: MCM.orange }}>Interaction Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p
              className="text-lg max-w-xl leading-relaxed tracking-wide"
              style={{ color: `${MCM.charcoal}88` }}
            >
              Four named patterns govern every interaction in this style.
              Hover or click each demo panel to feel the precise mechanic.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* RULE 1: Analog Switch */}
            <RevealBlock delay={0.08}>
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.charcoal,
                  boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: MCM.orange,
                      color: MCM.orange,
                      backgroundColor: `${MCM.orange}10`,
                    }}
                  >
                    Analog Switch
                  </span>
                </div>
                <p className="text-xs mb-1 leading-relaxed font-mono" style={{ color: `${MCM.charcoal}99` }}>
                  Active: hard offset disappears + translate(4px,4px)
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${MCM.charcoal}77` }}>
                  Mimics a retro mechanical key: shadow collapses to zero as the button
                  physically &quot;sinks&quot; into the surface. No spring — pure damped precision.
                </p>
                <div className="flex items-center justify-center py-4">
                  <button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 font-bold uppercase tracking-wider text-sm"
                    style={{
                      backgroundColor: MCM.orange,
                      color: MCM.cream,
                      borderColor: MCM.charcoal,
                      boxShadow: analogPressed ? "none" : `4px 4px 0 ${MCM.charcoal}`,
                      transform: analogPressed ? "translate(4px, 4px)" : "translate(0, 0)",
                      transition: "box-shadow 120ms ease-out, transform 120ms ease-out",
                    }}
                    onMouseDown={() => setAnalogPressed(true)}
                    onMouseUp={() => setAnalogPressed(false)}
                    onMouseLeave={() => setAnalogPressed(false)}
                  >
                    <StarburstIcon className="w-4 h-4" />
                    {analogPressed ? "Pressed!" : "Press me"}
                  </button>
                </div>
                <p className="text-xs text-center mt-2" style={{ color: `${MCM.charcoal}77` }}>
                  {analogPressed
                    ? "Shadow gone — button has sunk into the plane"
                    : "Click and hold to see the shadow collapse"}
                </p>
              </div>
            </RevealBlock>

            {/* RULE 2: Brass Shimmer */}
            <RevealBlock delay={0.12}>
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.charcoal,
                  boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: MCM.gold,
                      color: MCM.gold,
                      backgroundColor: `${MCM.gold}15`,
                    }}
                  >
                    Brass Shimmer
                  </span>
                </div>
                <p className="text-xs mb-1 leading-relaxed font-mono" style={{ color: `${MCM.charcoal}99` }}>
                  hover: rotate(45deg) + deepen gold color
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${MCM.charcoal}77` }}>
                  Brass / gold decorations (starbursts, accent points) rotate slightly and
                  deepen in hue on hover, evoking metal reflecting ambient light.
                </p>
                <div
                  className="flex flex-col items-center justify-center py-4 gap-4 cursor-pointer"
                  onMouseEnter={() => setBrassHovered(true)}
                  onMouseLeave={() => setBrassHovered(false)}
                >
                  <div
                    style={{
                      color: brassHovered ? "#a88945" : MCM.gold,
                      transform: brassHovered ? "rotate(45deg) scale(1.15)" : "rotate(0deg) scale(1)",
                      transition: "transform 0.5s ease-in-out, color 0.3s ease",
                    }}
                  >
                    <StarburstIcon className="w-16 h-16" />
                  </div>
                  <div
                    className="flex gap-3"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: brassHovered ? "#a88945" : MCM.gold,
                          transform: brassHovered ? "scale(1.3)" : "scale(1)",
                          transition: `transform 0.4s ease ${i * 0.06}s, background-color 0.3s ease`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-center mt-2" style={{ color: `${MCM.charcoal}77` }}>
                  {brassHovered
                    ? "Gold deepens — catching the light at a new angle"
                    : "Hover to see the starburst rotate and gold deepen"}
                </p>
              </div>
            </RevealBlock>

            {/* RULE 3: Retro Elevation */}
            <RevealBlock delay={0.16}>
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.charcoal,
                  boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: MCM.teal,
                      color: MCM.teal,
                      backgroundColor: `${MCM.teal}10`,
                    }}
                  >
                    Retro Elevation
                  </span>
                </div>
                <p className="text-xs mb-1 leading-relaxed font-mono" style={{ color: `${MCM.charcoal}99` }}>
                  hover: shadow 4px&#8594;8px + translate(-2px,-2px)
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${MCM.charcoal}77` }}>
                  Cards lift via longer hard-edge shadow (printmaking / woodblock aesthetic)
                  paired with a slight counter-translate — the element appears to pull
                  away from its own shadow.
                </p>
                <div className="flex items-center justify-center py-4">
                  <div
                    className="w-48 p-5 rounded-xl border-2 cursor-pointer"
                    style={{
                      backgroundColor: MCM.cream,
                      borderColor: MCM.charcoal,
                      boxShadow: retroCardHovered
                        ? `8px 8px 0 ${MCM.charcoal}`
                        : `4px 4px 0 ${MCM.charcoal}`,
                      transform: retroCardHovered ? "translate(-2px,-2px)" : "translate(0,0)",
                      transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
                    }}
                    onMouseEnter={() => setRetroCardHovered(true)}
                    onMouseLeave={() => setRetroCardHovered(false)}
                  >
                    <div
                      className="w-8 h-1 rounded-full mb-3"
                      style={{ backgroundColor: MCM.orange }}
                    />
                    <div
                      className="font-bold uppercase tracking-wide text-sm mb-1"
                      style={{ color: MCM.charcoal }}
                    >
                      Atomic Living
                    </div>
                    <div
                      className="text-xs leading-relaxed"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      Form meets function in perfect analog harmony.
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center mt-2" style={{ color: `${MCM.charcoal}77` }}>
                  {retroCardHovered
                    ? "Shadow extended — card floats on a woodblock layer"
                    : "Hover the card to see it pull from its shadow"}
                </p>
              </div>
            </RevealBlock>

            {/* RULE 4: Warm Dimming */}
            <RevealBlock delay={0.20}>
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.charcoal,
                  boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: MCM.charcoal,
                      color: MCM.charcoal,
                      backgroundColor: `${MCM.charcoal}08`,
                    }}
                  >
                    Warm Dimming
                  </span>
                </div>
                <p className="text-xs mb-1 leading-relaxed font-mono" style={{ color: `${MCM.charcoal}99` }}>
                  hover: bg #f5f0e1 &#8594; #efe9d3 (gentle darken only)
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${MCM.charcoal}77` }}>
                  Cream-background surfaces respond to interaction through slight
                  darkening only — no color shift, no flash. Avoids modern neon or
                  high-contrast flicker that would break the period feel.
                </p>
                <div className="space-y-3">
                  {["Item Alpha", "Item Beta", "Item Gamma", "Item Delta"].map((label, i) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 p-4 rounded-lg border cursor-default"
                      style={{
                        backgroundColor:
                          warmDimTarget === i ? "#efe9d3" : MCM.cream,
                        borderColor: `${MCM.charcoal}22`,
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={() => setWarmDimTarget(i)}
                      onMouseLeave={() => setWarmDimTarget(null)}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: warmDimTarget === i ? MCM.orange : MCM.gold }}
                      />
                      <span
                        className="text-sm font-medium uppercase tracking-wide"
                        style={{ color: MCM.charcoal }}
                      >
                        {label}
                      </span>
                      <span
                        className="ml-auto text-xs font-mono"
                        style={{ color: `${MCM.charcoal}55` }}
                      >
                        {warmDimTarget === i ? "#efe9d3" : "#f5f0e1"}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mt-4" style={{ color: `${MCM.charcoal}77` }}>
                  Hover each row — cream gently darkens, nothing more
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. COLLECTION / APP UI DEMO — Atomic Furniture Catalog          */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.orange }}
            >
              App Demo
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.charcoal }}
            >
              Atomic <span style={{ color: MCM.orange }}>Furniture Catalog</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p
              className="text-lg max-w-lg leading-relaxed tracking-wide"
              style={{ color: `${MCM.charcoal}88` }}
            >
              A mock product catalog demonstrating the design system in context:
              hard-edge cards, starburst accents, Retro Elevation on hover,
              and Warm Dimming on list rows.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main catalog grid */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.charcoal,
                  boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h3
                      className="text-xl font-bold uppercase tracking-wide"
                      style={{ color: MCM.charcoal }}
                    >
                      1950s Icons
                    </h3>
                    <p
                      className="text-sm mt-0.5 tracking-wide"
                      style={{ color: `${MCM.charcoal}77` }}
                    >
                      4 essential pieces
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border-2 font-bold uppercase tracking-wider text-xs mcm-analog-btn"
                    style={{
                      backgroundColor: MCM.orange,
                      color: MCM.cream,
                      borderColor: MCM.charcoal,
                      boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                    Add piece
                  </button>
                </div>

                {/* Catalog list with Warm Dimming */}
                <div className="space-y-3">
                  {furnitureItems.map((item, i) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 p-4 rounded-lg border cursor-default"
                      style={{
                        backgroundColor: warmDimTarget === i + 10 ? "#efe9d3" : MCM.cream,
                        borderColor: `${MCM.charcoal}22`,
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={() => setWarmDimTarget(i + 10)}
                      onMouseLeave={() => setWarmDimTarget(null)}
                    >
                      {/* Icon box */}
                      <div
                        className="w-12 h-12 rounded-lg border-2 flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${item.color}18`,
                          borderColor: `${item.color}44`,
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-bold uppercase tracking-wide"
                          style={{ color: MCM.charcoal }}
                        >
                          {item.name}
                        </div>
                        <div
                          className="text-xs mt-0.5 tracking-wide"
                          style={{ color: `${MCM.charcoal}77` }}
                        >
                          {item.material}
                        </div>
                      </div>

                      {/* Year badge */}
                      <span
                        className="px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wide shrink-0"
                        style={{
                          borderColor: item.color,
                          color: item.color,
                          backgroundColor: `${item.color}10`,
                        }}
                      >
                        {item.year}
                      </span>

                      {/* Starburst */}
                      <div style={{ color: MCM.gold }}>
                        <StarburstIcon className="w-5 h-5 opacity-60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Sidebar stats */}
            <RevealBlock delay={0.18}>
              <div className="space-y-5 h-full">
                {/* Atom orbital decoration card */}
                <div
                  className="rounded-xl border-2 p-7"
                  style={{
                    backgroundColor: MCM.cream,
                    borderColor: MCM.charcoal,
                    boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${MCM.charcoal}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${MCM.charcoal}`;
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg border-2 flex items-center justify-center"
                      style={{ borderColor: MCM.orange, color: MCM.orange }}
                    >
                      <AtomIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide" style={{ color: `${MCM.charcoal}77` }}>
                      Era
                    </span>
                  </div>
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{ color: MCM.charcoal }}
                  >
                    1950s
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: `${MCM.charcoal}77` }}
                  >
                    Atomic age peak
                  </div>
                  <div
                    className="mt-4 h-1.5 rounded-full"
                    style={{ backgroundColor: `${MCM.charcoal}11` }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: "75%", backgroundColor: MCM.orange }}
                    />
                  </div>
                </div>

                {/* Materials card */}
                <div
                  className="rounded-xl border-2 p-7"
                  style={{
                    backgroundColor: MCM.cream,
                    borderColor: MCM.charcoal,
                    boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${MCM.charcoal}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${MCM.charcoal}`;
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg border-2 flex items-center justify-center"
                      style={{ borderColor: MCM.teal, color: MCM.teal }}
                    >
                      <DiamondIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide" style={{ color: `${MCM.charcoal}77` }}>
                      Materials
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Fibreglass", pct: 80 },
                      { label: "Walnut", pct: 60 },
                      { label: "Brass", pct: 45 },
                    ].map((mat) => (
                      <div key={mat.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span
                            className="font-bold uppercase tracking-wide"
                            style={{ color: MCM.charcoal }}
                          >
                            {mat.label}
                          </span>
                          <span style={{ color: `${MCM.charcoal}77` }}>{mat.pct}%</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ backgroundColor: `${MCM.charcoal}11` }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${mat.pct}%`, backgroundColor: MCM.teal }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini starburst decoration */}
                <div
                  className="rounded-xl border-2 p-7 flex items-center justify-center"
                  style={{
                    backgroundColor: MCM.orange,
                    borderColor: MCM.charcoal,
                    boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                  }}
                >
                  <div
                    className="mcm-starburst-spin"
                    style={{ color: MCM.gold }}
                  >
                    <StarburstIcon className="w-20 h-20 opacity-90" />
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. HISTORICAL TIMELINE                                           */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: MCM.charcoal }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.gold }}
            >
              Timeline
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.cream }}
            >
              Atomic-Age <span style={{ color: MCM.orange }}>History</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p
              className="text-lg max-w-lg leading-relaxed tracking-wide"
              style={{ color: `${MCM.cream}99` }}
            >
              Five defining moments from post-war optimism to the moon landing.
              Click any year to explore the era.
            </p>
          </RevealBlock>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Year selector */}
            <RevealBlock delay={0.08} className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0">
              {timelineItems.map((item, i) => (
                <button
                  key={item.year}
                  onClick={() => setActiveTimelineItem(i)}
                  className="px-4 py-3 rounded-lg border-2 font-bold uppercase tracking-wider text-sm text-left whitespace-nowrap mcm-analog-btn"
                  style={
                    activeTimelineItem === i
                      ? {
                          backgroundColor: item.color,
                          color: MCM.cream,
                          borderColor: MCM.cream,
                          boxShadow: `3px 3px 0 ${MCM.cream}`,
                        }
                      : {
                          backgroundColor: "transparent",
                          color: `${MCM.cream}88`,
                          borderColor: `${MCM.cream}33`,
                          boxShadow: "none",
                        }
                  }
                >
                  {item.year}
                </button>
              ))}
            </RevealBlock>

            {/* Content panel */}
            <RevealBlock delay={0.14} className="flex-1">
              <div
                className="rounded-xl border-2 p-8 md:p-10 h-full"
                style={{
                  backgroundColor: `${MCM.cream}08`,
                  borderColor: `${MCM.cream}33`,
                }}
              >
                <div className="flex items-start gap-6">
                  <div
                    className="w-16 h-16 rounded-xl border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: timelineItems[activeTimelineItem].color,
                      backgroundColor: `${timelineItems[activeTimelineItem].color}20`,
                      color: timelineItems[activeTimelineItem].color,
                    }}
                  >
                    <AtomIcon className="w-10 h-10" />
                  </div>
                  <div>
                    <div
                      className="text-5xl font-bold mb-2 uppercase tracking-wide"
                      style={{ color: timelineItems[activeTimelineItem].color }}
                    >
                      {timelineItems[activeTimelineItem].year}
                    </div>
                    <div
                      className="h-0.5 rounded-full mb-4"
                      style={{
                        width: "60px",
                        backgroundColor: timelineItems[activeTimelineItem].color,
                      }}
                    />
                    <h3
                      className="text-2xl font-bold uppercase tracking-wide mb-4"
                      style={{ color: MCM.cream }}
                    >
                      {timelineItems[activeTimelineItem].title}
                    </h3>
                    <p
                      className="text-base leading-relaxed tracking-wide max-w-md"
                      style={{ color: `${MCM.cream}cc` }}
                    >
                      {timelineItems[activeTimelineItem].desc}
                    </p>
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex gap-2 mt-8">
                  {timelineItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTimelineItem(i)}
                      className="rounded-sm border transition-all duration-200"
                      style={{
                        width: activeTimelineItem === i ? "24px" : "10px",
                        height: "10px",
                        backgroundColor:
                          activeTimelineItem === i ? item.color : `${MCM.cream}33`,
                        borderColor:
                          activeTimelineItem === i ? item.color : `${MCM.cream}22`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. DESIGN PHILOSOPHY & DO / DON'T                               */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.teal }}
            >
              Philosophy
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.charcoal }}
            >
              Design <span style={{ color: MCM.orange }}>Principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p
              className="text-lg max-w-lg leading-relaxed tracking-wide"
              style={{ color: `${MCM.charcoal}88` }}
            >
              Three core pillars define this aesthetic. Warm but not nostalgic.
              Geometric but organic. Bold but never brash.
            </p>
          </RevealBlock>

          {/* 3 principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <AtomIcon className="w-8 h-8" />,
                title: "Form + Function",
                tagline: "Utility is never sacrificed for ornament",
                desc: "Every decorative element — starburst, boomerang, kidney curve — has structural purpose. Chairs that look like sculpture but sit beautifully.",
                items: ["Organic forms from ergonomic needs", "Starburst as focal anchor, not filler", "Geometry guides the eye intentionally"],
                color: MCM.orange,
                border: MCM.orange,
              },
              {
                icon: <StarburstIcon className="w-8 h-8" />,
                title: "Warmth & Earth",
                tagline: "Saturated but never garish",
                desc: "Colours drawn from forest, sand, copper, and foliage. Bold enough to be expressive. Muted enough to coexist with natural materials.",
                items: ["Burnt orange + teal: nature pairing", "Cream background breathes for colour", "Gold as punctuation, not flood fill"],
                color: MCM.gold,
                border: MCM.gold,
              },
              {
                icon: <BoomerangIcon className="w-8 h-8" />,
                title: "Optimism & Space",
                tagline: "Post-war belief in tomorrow",
                desc: "The atom is friendly. The stars are reachable. Space and generous whitespace communicate confidence — nothing is crammed or anxious.",
                items: ["p-8 / p-12 minimum container padding", "Grid alignment over visual chaos", "Shadow as depth, not decoration"],
                color: MCM.teal,
                border: MCM.teal,
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className="rounded-xl border-2 p-8 h-full cursor-default"
                  style={{
                    backgroundColor: MCM.cream,
                    borderColor: MCM.charcoal,
                    boxShadow: `4px 4px 0 ${MCM.charcoal}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `7px 7px 0 ${MCM.charcoal}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${MCM.charcoal}`;
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl border-2 flex items-center justify-center mb-6"
                    style={{
                      borderColor: principle.border,
                      color: principle.color,
                      backgroundColor: `${principle.color}10`,
                    }}
                  >
                    {principle.icon}
                  </div>

                  <h3
                    className="text-xl font-bold uppercase tracking-wide mb-1"
                    style={{ color: MCM.charcoal }}
                  >
                    {principle.title}
                  </h3>
                  <p className="text-sm font-bold mb-4" style={{ color: principle.color }}>
                    {principle.tagline}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6 tracking-wide"
                    style={{ color: `${MCM.charcoal}88` }}
                  >
                    {principle.desc}
                  </p>

                  <ul className="space-y-2">
                    {principle.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs tracking-wide"
                        style={{ color: `${MCM.charcoal}88` }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-sm shrink-0"
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

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.12}>
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.teal,
                  boxShadow: `4px 4px 0 ${MCM.teal}`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg border-2 flex items-center justify-center"
                    style={{ borderColor: MCM.teal, backgroundColor: `${MCM.teal}10` }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={MCM.teal} strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color: MCM.teal }}>
                    Do
                  </h3>
                  <StarburstIcon className="w-4 h-4 ml-auto" style={{ color: MCM.gold } as React.CSSProperties} />
                </div>
                <ul className="space-y-3">
                  {[
                    "bg-[#f5f0e1] cream background always",
                    "rounded-lg rounded-xl — organic but not circular",
                    "Hard-edge shadow: shadow-[4px_4px_0_#3d3d3d]",
                    "Analog Switch on every interactive element",
                    "font-sans font-bold uppercase tracking-wider labels",
                    "Generous p-8 / p-12 / gap-8 spacing",
                    "Starburst gold decorations on card corners",
                    "Warm Dimming on list rows and hover surfaces",
                    "Brass Shimmer on any gold / star accent",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm leading-relaxed tracking-wide"
                      style={{ color: MCM.charcoal }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 rounded-sm shrink-0"
                        style={{ backgroundColor: MCM.teal }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="rounded-xl border-2 p-8 h-full"
                style={{
                  backgroundColor: MCM.cream,
                  borderColor: MCM.orange,
                  boxShadow: `4px 4px 0 ${MCM.orange}`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-lg border-2 flex items-center justify-center"
                    style={{ borderColor: MCM.orange, backgroundColor: `${MCM.orange}10` }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={MCM.orange} strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color: MCM.orange }}>
                    Don&apos;t
                  </h3>
                  <DiamondIcon className="w-4 h-4 ml-auto" style={{ color: `${MCM.charcoal}33` } as React.CSSProperties} />
                </div>
                <ul className="space-y-3">
                  {[
                    "No neon or fluorescent colours (pink-500, cyan-400)",
                    "No sharp rounded-none or pill-only rounded-full",
                    "No gradient backgrounds — flat colour blocks only",
                    "No black backgrounds bg-black",
                    "No heavy drop shadows or glow effects",
                    "No serif or handwriting fonts",
                    "No spring easing — damped analog precision only",
                    "No dense, margin-free layouts",
                    "No proportional scale animations (breaks the press feel)",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm leading-relaxed tracking-wide"
                      style={{ color: MCM.charcoal }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 rounded-sm shrink-0"
                        style={{ backgroundColor: MCM.orange }}
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

      {/* ================================================================ */}
      {/* 9. FEATURE HIGHLIGHTS                                            */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: `${MCM.charcoal}06` }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
              style={{ color: MCM.orange }}
            >
              Features
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight uppercase tracking-wide"
              style={{ color: MCM.charcoal }}
            >
              Built with <span style={{ color: MCM.orange }}>Atomic Precision</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: <StarburstIcon className="w-7 h-7" />,
                title: "Starburst Motifs",
                desc: "Atomic-age star and sunburst decorations applied to card corners, dividers, and accent points.",
                color: MCM.gold,
              },
              {
                icon: <AtomIcon className="w-7 h-7" />,
                title: "Orbital Details",
                desc: "Atom and orbital shapes for empty states, illustrations, and loading indicators.",
                color: MCM.teal,
              },
              {
                icon: <BoomerangIcon className="w-7 h-7" />,
                title: "Organic Curves",
                desc: "Kidney, boomerang, and amoeba outlines break geometric rigidity with natural flow.",
                color: MCM.orange,
              },
              {
                icon: <DiamondIcon className="w-7 h-7" />,
                title: "Hard-Edge Shadows",
                desc: "4px offset solid borders replace soft drop-shadows, referencing letterpress printing.",
                color: MCM.charcoal,
              },
              {
                icon: <OrganicDotIcon className="w-7 h-7" />,
                title: "Earth Palette",
                desc: "Five grounded tones: burnt orange, cream, teal, brushed gold, and charcoal.",
                color: MCM.orange,
              },
              {
                icon: <StarburstIcon className="w-7 h-7" />,
                title: "Analog Interactions",
                desc: "Press mechanics that sink and shadow-collapse, mimicking vintage Bakelite switches.",
                color: MCM.teal,
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div
                  className="relative rounded-xl border-2 p-7 h-full cursor-default"
                  style={{
                    backgroundColor: MCM.cream,
                    borderColor: MCM.charcoal,
                    boxShadow: `3px 3px 0 ${MCM.charcoal}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${MCM.charcoal}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${MCM.charcoal}`;
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center mb-5"
                    style={{
                      color: feature.color,
                      borderColor: `${feature.color}66`,
                      backgroundColor: `${feature.color}10`,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h4
                    className="text-base font-bold uppercase tracking-wide mb-2"
                    style={{ color: MCM.charcoal }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed tracking-wide"
                    style={{ color: `${MCM.charcoal}88` }}
                  >
                    {feature.desc}
                  </p>

                  {/* Corner starburst — Brass Shimmer on card hover */}
                  <div
                    className="absolute top-4 right-4"
                    style={{ color: `${MCM.gold}88` }}
                  >
                    <StarburstIcon className="w-5 h-5" />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer
        className="relative overflow-hidden border-t"
        style={{ backgroundColor: MCM.cream, borderColor: `${MCM.charcoal}22` }}
      >
        {/* Decorative orange bar */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-full"
          style={{ width: "80px", backgroundColor: MCM.orange }}
        />

        {/* Floating starburst accents */}
        <div
          className="absolute top-10 left-10 pointer-events-none mcm-starburst-spin opacity-20"
          style={{ color: MCM.gold }}
        >
          <StarburstIcon className="w-8 h-8" />
        </div>
        <div
          className="absolute top-12 right-12 pointer-events-none opacity-15"
          style={{ color: MCM.teal, animation: "mcm-float 8s ease-in-out infinite" } as React.CSSProperties}
        >
          <AtomIcon className="w-10 h-10" />
        </div>
        <div
          className="absolute bottom-10 left-1/4 pointer-events-none opacity-10"
          style={{ color: MCM.orange }}
        >
          <DiamondIcon className="w-6 h-6" />
        </div>
        <div
          className="absolute bottom-8 right-1/3 pointer-events-none opacity-12"
          style={{ color: MCM.charcoal, animation: "mcm-float 6s ease-in-out infinite 1s" } as React.CSSProperties}
        >
          <BoomerangIcon className="w-6 h-6" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg border-2 flex items-center justify-center"
                  style={{ borderColor: MCM.charcoal, color: MCM.gold, backgroundColor: MCM.orange }}
                >
                  <StarburstIcon className="w-5 h-5" />
                </div>
                <span
                  className="text-xl font-bold uppercase tracking-wider"
                  style={{ color: MCM.charcoal }}
                >
                  Mid<span style={{ color: MCM.orange }}>Century</span>
                </span>
              </div>
              <p
                className="text-sm leading-relaxed tracking-wide"
                style={{ color: `${MCM.charcoal}77` }}
              >
                Atomic-age optimism meets organic modernism.
                Timeless design for every digital surface.
              </p>
              <div className="flex gap-2">
                {paletteSwatch.map((s) => (
                  <div
                    key={s.hex}
                    className="w-5 h-5 rounded border"
                    style={{
                      backgroundColor: s.hex,
                      borderColor: MCM.charcoal,
                      transition: "transform 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-bold tracking-[0.15em] uppercase"
                  style={{ color: `${MCM.charcoal}77` }}
                >
                  Style
                </span>
                <Link
                  href="/styles/mid-century-modern"
                  className="tracking-wide font-medium"
                  style={{ color: `${MCM.charcoal}88`, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = MCM.orange; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${MCM.charcoal}88`; }}
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/mid-century-modern/showcase"
                  className="tracking-wide font-medium"
                  style={{ color: `${MCM.charcoal}88`, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = MCM.orange; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${MCM.charcoal}88`; }}
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/mid-century-modern/cover"
                  className="tracking-wide font-medium"
                  style={{ color: `${MCM.charcoal}88`, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = MCM.orange; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${MCM.charcoal}88`; }}
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-bold tracking-[0.15em] uppercase"
                  style={{ color: `${MCM.charcoal}77` }}
                >
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="tracking-wide font-medium"
                  style={{ color: `${MCM.charcoal}88`, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = MCM.orange; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${MCM.charcoal}88`; }}
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="tracking-wide font-medium"
                  style={{ color: `${MCM.charcoal}88`, transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = MCM.orange; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${MCM.charcoal}88`; }}
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-bold tracking-[0.15em] uppercase"
                  style={{ color: `${MCM.charcoal}77` }}
                >
                  Palette
                </span>
                {paletteSwatch.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 text-xs tracking-wide"
                    style={{ color: `${MCM.charcoal}88` }}
                  >
                    <span
                      className="w-3 h-3 rounded-sm inline-block border"
                      style={{ backgroundColor: s.hex, borderColor: MCM.charcoal }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px rounded-full mb-8"
            style={{ backgroundColor: `${MCM.charcoal}22` }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 text-sm tracking-wide"
              style={{ color: `${MCM.charcoal}77` }}
            >
              <StarburstIcon className="w-4 h-4" style={{ color: MCM.gold } as React.CSSProperties} />
              <span>Built for StyleKit — Mid-Century Modern</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 font-bold uppercase tracking-wider text-sm mcm-analog-btn"
              style={{
                backgroundColor: MCM.orange,
                color: MCM.cream,
                borderColor: MCM.charcoal,
                boxShadow: `3px 3px 0 ${MCM.charcoal}`,
              }}
            >
              <StarburstIcon className="w-3.5 h-3.5" />
              Back to StyleKit
              <span>&#8594;</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
