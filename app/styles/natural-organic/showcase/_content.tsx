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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons — nature-themed                                   */
/* ------------------------------------------------------------------ */

function LeafIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5-3 3-4 10-4 10a7.56 7.56 0 0 1 5-5c2-1 4-1 5-3a5 5 0 0 0-3-2z" />
    </svg>
  );
}

function SeedlingIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 22V12m0 0C12 7 7 4 3 6c0 4 4 7 9 6zm0 0c0-5 5-8 9-6-1 4-5 7-9 6z" />
    </svg>
  );
}

function SunIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function DropletIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
    </svg>
  );
}

function EarthIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12h20" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function WindIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function MountainIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.5 3L1 19h22L15.5 3l-4 7-3-7z" />
    </svg>
  );
}

function CheckIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Deep Earth", hex: "#5c4033", label: "Primary", textColor: "#faf6f1" },
  { name: "Warm Cream", hex: "#faf6f1", label: "Background", textColor: "#5c4033" },
  { name: "Sage Green", hex: "#8b9d77", label: "Accent 1", textColor: "#faf6f1" },
  { name: "Warm Tan", hex: "#d4a373", label: "Accent 2", textColor: "#5c4033" },
  { name: "Linen", hex: "#e9e0d4", label: "Surface", textColor: "#5c4033" },
];

const productCards = [
  {
    name: "Wild Honey",
    origin: "Mountain Valleys",
    desc: "Raw, unfiltered honey from high-altitude wildflowers. Harvested once a season.",
    price: "$28",
    accent: "#d4a373",
    icon: <DropletIcon className="w-7 h-7" />,
  },
  {
    name: "Forest Moss",
    origin: "Old Growth Woods",
    desc: "Sustainably harvested herbal blend. Slow-dried for maximum earthen fragrance.",
    price: "$22",
    accent: "#8b9d77",
    icon: <LeafIcon className="w-7 h-7" />,
  },
  {
    name: "Clay Vessel",
    origin: "Artisan Studio",
    desc: "Hand-thrown ceramic pot shaped with intentional imperfection. One of a kind.",
    price: "$64",
    accent: "#5c4033",
    icon: <MountainIcon className="w-7 h-7" />,
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

  // aiRule 1: Organic Morphing — blob shape toggle
  const [morphActive, setMorphActive] = useState(false);
  const [morphHovered, setMorphHovered] = useState(false);

  // aiRule 2: Soft Earth Press — press depth demo
  const [pressState, setPressState] = useState<"idle" | "hover" | "pressed">("idle");

  // aiRule 3: Botanical Slowness — speed comparison
  const [botanicalMode, setBotanicalMode] = useState<"fast" | "organic">("organic");
  const [botanicalTriggered, setBotanicalTriggered] = useState(false);

  // aiRule 4: Verdant Tint — color transition demo
  const [verdantHovered, setVerdantHovered] = useState<number | null>(null);
  const [verdantLit, setVerdantLit] = useState(false);

  // Interactive product
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  // Checklist for brand values
  const [checkedValues, setCheckedValues] = useState<boolean[]>([
    true, false, true, false, false, false, false,
  ]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  function toggleValue(i: number) {
    setCheckedValues((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: "#faf6f1", color: "#5c4033" }}
    >
      <style>{`
        @keyframes organic-sway {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-6px); }
        }
        @keyframes organic-rise {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes organic-breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes organic-drift {
          0% { transform: translateX(0px) rotate(0deg); }
          33% { transform: translateX(8px) rotate(1.5deg); }
          66% { transform: translateX(-4px) rotate(-1deg); }
          100% { transform: translateX(0px) rotate(0deg); }
        }
        @keyframes petal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sway-anim { animation: organic-sway 6s ease-in-out infinite; }
        .rise-anim { animation: organic-rise 5s ease-in-out infinite; }
        .breathe-anim { animation: organic-breathe 4s ease-in-out infinite; }
        .drift-anim { animation: organic-drift 8s ease-in-out infinite; }
        .petal-spin-anim { animation: petal-spin 20s linear infinite; }
      `}</style>

      {/* ============================================================== */}
      {/* 1. FIXED NAV                                                    */}
      {/* ============================================================== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(250, 246, 241, 0.92)",
          borderColor: "#e9e0d4",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 px-4 py-2"
            style={{
              backgroundColor: "#e9e0d4",
              borderRadius: "28px 32px 24px 30px / 28px 30px 32px 26px",
            }}
          >
            <LeafIcon className="w-4 h-4" style={{ color: "#8b9d77" }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: "#5c4033" }}>
              Natural<span style={{ color: "#8b9d77" }}>Organic</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "AI Rules", "Philosophy", "Do/Don't"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-sm cursor-pointer transition-all duration-500 ease-in-out hover:translate-y-0.5"
                style={{ color: "#5c4033" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#e9e0d4";
                  (e.currentTarget as HTMLElement).style.borderRadius = "20px 24px 22px 18px / 18px 22px 20px 24px";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/natural-organic"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out hover:translate-y-0.5"
            style={{
              backgroundColor: "#5c4033",
              color: "#faf6f1",
              borderRadius: "30px 24px 28px 22px / 24px 28px 22px 30px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#8b9d77";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#5c4033";
            }}
          >
            <span>←</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO                                                         */}
      {/* ============================================================== */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Decorative organic blob backgrounds */}
        <div
          className="absolute top-10 right-[-80px] w-[420px] h-[420px] pointer-events-none opacity-30 drift-anim"
          style={{
            backgroundColor: "#d4a373",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div
          className="absolute bottom-0 left-[-60px] w-[340px] h-[340px] pointer-events-none opacity-20"
          style={{
            backgroundColor: "#8b9d77",
            borderRadius: "40% 60% 70% 30% / 50% 60% 40% 50%",
            animation: "organic-drift 11s ease-in-out infinite 3s",
          }}
        />
        <div
          className="absolute top-48 left-1/3 w-[200px] h-[200px] pointer-events-none opacity-15"
          style={{
            backgroundColor: "#e9e0d4",
            borderRadius: "70% 30% 50% 50% / 30% 70% 50% 60%",
            animation: "organic-breathe 7s ease-in-out infinite 1s",
          }}
        />

        {/* Floating leaf accents */}
        <div
          className="absolute top-24 right-24 pointer-events-none hidden md:block sway-anim"
          style={{ color: "#8b9d77" }}
        >
          <LeafIcon className="w-10 h-10 opacity-50" />
        </div>
        <div
          className="absolute top-52 left-16 pointer-events-none hidden md:block"
          style={{ color: "#d4a373", animation: "organic-sway 8s ease-in-out infinite 2s" }}
        >
          <SeedlingIcon className="w-8 h-8 opacity-40" />
        </div>
        <div
          className="absolute bottom-24 right-16 pointer-events-none hidden md:block"
          style={{ color: "#5c4033", animation: "organic-rise 7s ease-in-out infinite 1.5s" }}
        >
          <EarthIcon className="w-7 h-7 opacity-30" />
        </div>
        <div
          className="absolute top-36 right-1/3 pointer-events-none hidden md:block petal-spin-anim"
          style={{ color: "#d4a373" }}
        >
          <SunIcon className="w-6 h-6 opacity-40" />
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Eyebrow badge */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-[0.18em] uppercase mb-7"
              style={{
                backgroundColor: "#e9e0d4",
                color: "#8b9d77",
                borderRadius: "30px 24px 26px 28px / 24px 30px 28px 22px",
              }}
            >
              <LeafIcon className="w-3.5 h-3.5" />
              自然有机风 — Natural Organic
              <SeedlingIcon className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[86px] font-serif leading-[1.05] tracking-tight mb-6"
            style={{
              color: "#5c4033",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Rooted in
            <br />
            <span style={{ color: "#8b9d77" }}>Nature.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12"
            style={{
              color: "#7a6658",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            Warm earth tones, organic shapes, and slow botanical rhythms.
            Designed for health brands, artisan goods, and sustainable living.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            <button
              className="inline-flex items-center gap-2 px-10 py-4 text-sm font-medium tracking-wide transition-all duration-700 ease-in-out hover:translate-y-0.5 active:scale-95"
              style={{
                backgroundColor: "#5c4033",
                color: "#faf6f1",
                borderRadius: "30px 40px 40px 30px / 40px 30px 40px 40px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#8b9d77";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#5c4033";
              }}
            >
              <LeafIcon className="w-4 h-4" />
              Explore the Style
            </button>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium border transition-all duration-700 ease-in-out hover:translate-y-0.5 active:scale-95"
              style={{
                backgroundColor: "transparent",
                color: "#5c4033",
                borderColor: "#c4b5a5",
                borderRadius: "30px 24px 28px 22px / 24px 30px 22px 28px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#e9e0d4";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <SeedlingIcon className="w-4 h-4" />
              View Components
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(22px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            {[
              { value: "100%", label: "Natural Origin", accent: "#8b9d77" },
              { value: "0", label: "Artificial Colors", accent: "#d4a373" },
              { value: "Slow", label: "Intentional Pace", accent: "#5c4033" },
              { value: "Earth", label: "Tones Only", accent: "#8b9d77" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 text-center transition-all duration-700 ease-in-out hover:translate-y-0.5 cursor-default"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9e0d4",
                  borderRadius: "40% 60% 50% 50% / 50% 40% 60% 50%",
                  transitionDelay: `${i * 0.06}s`,
                }}
              >
                <div
                  className="text-2xl font-serif font-bold mb-1"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "#7a6658" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. COLOR PALETTE                                                */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#8b9d77" }}
            >
              Palette
            </span>
            <h2
              className="text-4xl md:text-5xl font-serif leading-tight"
              style={{ color: "#5c4033" }}
            >
              Earth&apos;s <span style={{ color: "#8b9d77" }}>color language</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "#7a6658" }}>
              Five colors drawn from soil, bark, sage, honeycomb, and bleached linen.
              Every swatch lifts softly on hover — no neon, no cold blue, no pure black.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.12}>
            <div className="flex flex-wrap gap-8 md:gap-14 justify-center mb-16">
              {palette.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-default"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform:
                        hoveredSwatch === i
                          ? "translateY(-10px) scale(1.06)"
                          : "translateY(0) scale(1)",
                      transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center"
                      style={{
                        backgroundColor: swatch.hex,
                        border:
                          swatch.hex === "#faf6f1" || swatch.hex === "#e9e0d4"
                            ? "1.5px solid #c4b5a5"
                            : "none",
                        borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%",
                        boxShadow:
                          hoveredSwatch === i
                            ? `0 16px 36px ${swatch.hex}88`
                            : `0 4px 16px ${swatch.hex}44`,
                        transition: "box-shadow 0.6s ease",
                      }}
                    >
                      {hoveredSwatch === i && (
                        <LeafIcon
                          className="w-6 h-6"
                          style={{ color: swatch.textColor, opacity: 0.6 }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                      {swatch.name}
                    </div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: "#7a6658" }}>
                      {swatch.hex}
                    </div>
                    <span
                      className="inline-block mt-1.5 px-2.5 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: "#e9e0d4",
                        color: "#5c4033",
                        borderRadius: "12px 14px 12px 10px / 10px 12px 14px 12px",
                      }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient strip */}
          <RevealBlock delay={0.2}>
            <div
              className="p-8"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e9e0d4",
                borderRadius: "40px 50px 40px 50px / 50px 40px 50px 40px",
              }}
            >
              <p
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-6"
                style={{ color: "#7a6658" }}
              >
                Earth gradient combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#5c4033", to: "#d4a373", label: "Brown to Tan" },
                  { from: "#8b9d77", to: "#e9e0d4", label: "Sage to Linen" },
                  { from: "#d4a373", to: "#faf6f1", label: "Tan to Cream" },
                  { from: "#5c4033", to: "#8b9d77", label: "Brown to Sage" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-default">
                    <div
                      className="h-16 mb-2 transition-all duration-700 ease-in-out group-hover:translate-y-[-4px]"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        borderRadius: "20px 24px 20px 18px / 18px 20px 24px 22px",
                      }}
                    />
                    <div className="text-xs text-center" style={{ color: "#7a6658" }}>
                      {g.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. COMPONENT GALLERY                                            */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#d4a373" }}
            >
              Components
            </span>
            <h2
              className="text-4xl md:text-5xl font-serif leading-tight"
              style={{ color: "#5c4033" }}
            >
              Organic <span style={{ color: "#d4a373" }}>building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-8">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "#7a6658" }}>
              Every element uses irregular radii, earthy tones, and slow ease-in-out transitions.
              Nothing sharp, nothing cold, nothing industrial.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 text-sm font-medium capitalize transition-all duration-500 ease-in-out hover:translate-y-0.5 active:scale-95"
                  style={{
                    backgroundColor: activeTab === tab ? "#5c4033" : "#e9e0d4",
                    color: activeTab === tab ? "#faf6f1" : "#5c4033",
                    borderRadius: "22px 26px 20px 24px / 20px 22px 26px 22px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="p-8 md:p-12"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e9e0d4",
                borderRadius: "50px 40px 50px 40px / 40px 50px 40px 50px",
              }}
            >
              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "#7a6658" }}
                    >
                      Primary — organic irregular radius
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="inline-flex items-center gap-2 px-10 py-4 text-sm font-medium tracking-wide transition-all duration-700 ease-in-out hover:translate-y-0.5 active:scale-95"
                        style={{
                          backgroundColor: "#5c4033",
                          color: "#faf6f1",
                          borderRadius: "30px 40px 40px 30px / 40px 30px 40px 40px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#8b9d77";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#5c4033";
                        }}
                      >
                        <LeafIcon className="w-4 h-4" />
                        Shop Nature
                      </button>
                      <button
                        className="px-6 py-3 text-sm font-medium border transition-all duration-500 ease-in-out hover:translate-y-0.5 active:scale-95"
                        style={{
                          backgroundColor: "transparent",
                          color: "#5c4033",
                          borderColor: "#c4b5a5",
                          borderRadius: "28px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#e9e0d4";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        }}
                      >
                        Learn More
                      </button>
                      <button
                        className="px-6 py-3 text-sm font-medium text-white transition-all duration-500 ease-in-out hover:translate-y-0.5 active:scale-95"
                        style={{
                          backgroundColor: "#8b9d77",
                          borderRadius: "26px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#7a8c66";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#8b9d77";
                        }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "#7a6658" }}
                    >
                      Size variants with earthy colors
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "Small", cls: "px-5 py-2 text-xs", color: "#d4a373" },
                        { label: "Medium", cls: "px-7 py-3 text-sm", color: "#5c4033" },
                        { label: "Large", cls: "px-10 py-4 text-base", color: "#8b9d77" },
                      ].map(({ label, cls, color }) => (
                        <button
                          key={label}
                          className={`font-medium transition-all duration-500 ease-in-out hover:translate-y-0.5 active:scale-95 text-white ${cls}`}
                          style={{
                            backgroundColor: color,
                            borderRadius: "24px 30px 24px 18px / 20px 24px 28px 24px",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "#7a6658" }}
                    >
                      Icon buttons — natural motifs
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: <LeafIcon className="w-5 h-5" />, label: "Leaf", color: "#8b9d77" },
                        {
                          icon: <SeedlingIcon className="w-5 h-5" />,
                          label: "Seedling",
                          color: "#5c4033",
                        },
                        { icon: <SunIcon className="w-5 h-5" />, label: "Sun", color: "#d4a373" },
                        {
                          icon: <DropletIcon className="w-5 h-5" />,
                          label: "Water",
                          color: "#8b9d77",
                        },
                        {
                          icon: <EarthIcon className="w-5 h-5" />,
                          label: "Earth",
                          color: "#5c4033",
                        },
                      ].map(({ icon, label, color }) => (
                        <button
                          key={label}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium border transition-all duration-500 ease-in-out hover:translate-y-0.5"
                          style={{
                            backgroundColor: `${color}18`,
                            color: color,
                            borderColor: `${color}44`,
                            borderRadius: "20px 24px 18px 22px / 22px 18px 24px 20px",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = `${color}30`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = `${color}18`;
                          }}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {productCards.map((card, i) => (
                    <div
                      key={card.name}
                      className="group cursor-pointer transition-all duration-700 ease-in-out"
                      style={{
                        backgroundColor: activeProduct === i ? "#e9e0d4" : "#faf6f1",
                        border: "1px solid #e9e0d4",
                        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
                        padding: "2.5rem",
                        transform: activeProduct === i ? "translateY(2px)" : "translateY(0)",
                      }}
                      onMouseEnter={() => setActiveProduct(i)}
                      onMouseLeave={() => setActiveProduct(null)}
                    >
                      <div
                        className="w-14 h-14 flex items-center justify-center mb-5 transition-all duration-700 ease-in-out group-hover:scale-105"
                        style={{
                          backgroundColor: `${card.accent}22`,
                          color: card.accent,
                          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                        }}
                      >
                        {card.icon}
                      </div>
                      <p
                        className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-1"
                        style={{ color: card.accent }}
                      >
                        {card.origin}
                      </p>
                      <h3
                        className="text-xl font-serif mb-3 transition-colors duration-500 ease-in-out group-hover:text-[#6a7a58]"
                        style={{ color: "#5c4033" }}
                      >
                        {card.name}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "#7a6658" }}>
                        {card.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-serif font-semibold" style={{ color: card.accent }}>
                          {card.price}
                        </span>
                        <button
                          className="text-xs px-4 py-1.5 font-medium transition-all duration-500 ease-in-out"
                          style={{
                            backgroundColor: "#5c4033",
                            color: "#faf6f1",
                            borderRadius: "16px 18px 14px 16px / 14px 16px 18px 16px",
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    {[
                      { label: "Your Name", placeholder: "Rowan Ashfield", type: "text" },
                      {
                        label: "Email",
                        placeholder: "hello@earthkind.co",
                        type: "email",
                      },
                    ].map(({ label, placeholder, type }) => (
                      <div key={label}>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#5c4033" }}
                        >
                          {label}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          className="w-full px-5 py-3 border text-sm transition-all duration-500 ease-in-out focus:outline-none"
                          style={{
                            backgroundColor: "#faf6f1",
                            borderColor: "#c4b5a5",
                            color: "#5c4033",
                            borderRadius: "28px",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#8b9d77";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 3px rgba(139,157,119,0.15)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#c4b5a5";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#5c4033" }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your connection to nature..."
                        className="w-full px-5 py-3 border text-sm resize-none transition-all duration-500 ease-in-out focus:outline-none"
                        style={{
                          backgroundColor: "#faf6f1",
                          borderColor: "#c4b5a5",
                          color: "#5c4033",
                          borderRadius: "20px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#8b9d77";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(139,157,119,0.15)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#c4b5a5";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#5c4033" }}
                      >
                        Preference
                      </label>
                      <select
                        className="w-full px-5 py-3 border text-sm transition-all duration-300 ease-in-out focus:outline-none"
                        style={{
                          backgroundColor: "#faf6f1",
                          borderColor: "#c4b5a5",
                          color: "#5c4033",
                          borderRadius: "28px",
                        }}
                      >
                        <option>Wild Foraging</option>
                        <option>Home Garden</option>
                        <option>Artisan Craft</option>
                        <option>Forest Bathing</option>
                      </select>
                    </div>
                    {["Receive seasonal updates", "Support sustainable farming"].map(
                      (item, i) => (
                        <div key={item} className="flex items-center gap-3">
                          <button
                            onClick={() => toggleValue(i)}
                            className="w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-in-out"
                            style={{
                              borderColor: checkedValues[i] ? "#8b9d77" : "#c4b5a5",
                              backgroundColor: checkedValues[i] ? "#8b9d77" : "transparent",
                              borderRadius: "6px",
                            }}
                          >
                            {checkedValues[i] && (
                              <CheckIcon className="w-3 h-3 text-white" />
                            )}
                          </button>
                          <label className="text-sm" style={{ color: "#5c4033" }}>
                            {item}
                          </label>
                        </div>
                      )
                    )}
                    <button
                      className="w-full py-3.5 text-sm font-medium text-white transition-all duration-700 ease-in-out hover:translate-y-0.5 active:scale-95"
                      style={{
                        backgroundColor: "#5c4033",
                        borderRadius: "28px",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#8b9d77";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#5c4033";
                      }}
                    >
                      Send from the Earth
                    </button>
                  </div>
                </div>
              )}

              {/* BADGES TAB */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "#7a6658" }}
                    >
                      Organic status tags
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Organic", bg: "#8b9d7722", text: "#5a6e48" },
                        { label: "Handmade", bg: "#d4a37322", text: "#8a6030" },
                        { label: "Seasonal", bg: "#5c403322", text: "#5c4033" },
                        { label: "Wild-harvested", bg: "#8b9d7730", text: "#4a5e38" },
                        { label: "Slow-dried", bg: "#e9e0d4", text: "#5c4033" },
                        { label: "Zero-waste", bg: "#8b9d7720", text: "#5a6e48" },
                        { label: "Sun-grown", bg: "#d4a37330", text: "#8a6030" },
                        { label: "Unfiltered", bg: "#e9e0d4", text: "#5c4033" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 text-sm font-medium transition-all duration-700 ease-in-out hover:translate-y-0.5 cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            borderRadius: "20px 24px 18px 22px / 18px 20px 24px 20px",
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
                      style={{ color: "#7a6658" }}
                    >
                      Status with icon
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        {
                          label: "In Season",
                          icon: <LeafIcon className="w-3 h-3" />,
                          bg: "#8b9d7720",
                          text: "#5a6e48",
                        },
                        {
                          label: "Growing",
                          icon: <SeedlingIcon className="w-3 h-3" />,
                          bg: "#d4a37322",
                          text: "#8a6030",
                        },
                        {
                          label: "Sun-ready",
                          icon: <SunIcon className="w-3 h-3" />,
                          bg: "#d4a37330",
                          text: "#8a6030",
                        },
                        {
                          label: "Earth-aged",
                          icon: <EarthIcon className="w-3 h-3" />,
                          bg: "#5c403322",
                          text: "#5c4033",
                        },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out hover:translate-y-0.5 cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            borderRadius: "18px 22px 18px 16px / 16px 18px 22px 18px",
                          }}
                        >
                          {b.icon}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. AI RULES — 4 INTERACTIVE DEMOS                              */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#8b9d77" }}
            >
              AI Rules
            </span>
            <h2
              className="text-4xl md:text-5xl font-serif leading-tight"
              style={{ color: "#5c4033" }}
            >
              The <span style={{ color: "#8b9d77" }}>4 interaction laws</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-12">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "#7a6658" }}>
              Each rule is named for a natural phenomenon. Interact with each demo
              to feel the principle — not just read about it.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* aiRule 1: Organic Morphing */}
            <RevealBlock delay={0.08}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9e0d4",
                  borderRadius: "50px 40px 50px 40px / 40px 50px 40px 50px",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "#8b9d7722",
                      color: "#5a6e48",
                      borderRadius: "12px",
                    }}
                  >
                    Rule 1
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                    Organic Morphing
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "#7a6658" }}>
                  blob radii shift slowly on hover/click
                </p>
                <p className="text-xs mb-6" style={{ color: "#7a6658" }}>
                  Irregular borderRadius values change between interactions, simulating living organic
                  growth. Click the shape below to morph it.
                </p>

                <div className="flex items-center justify-center py-6">
                  <button
                    onClick={() => setMorphActive((v) => !v)}
                    onMouseEnter={() => setMorphHovered(true)}
                    onMouseLeave={() => setMorphHovered(false)}
                    className="w-40 h-40 flex items-center justify-center text-white font-medium text-sm"
                    style={{
                      backgroundColor: morphActive ? "#8b9d77" : "#5c4033",
                      borderRadius: morphActive
                        ? "70% 30% 40% 60% / 30% 70% 50% 50%"
                        : morphHovered
                        ? "50% 50% 60% 40% / 60% 40% 50% 50%"
                        : "40% 60% 70% 30% / 40% 50% 60% 50%",
                      transition:
                        "border-radius 0.8s cubic-bezier(0.16,1,0.3,1), background-color 0.7s ease-in-out",
                    }}
                  >
                    <div className="text-center pointer-events-none">
                      <LeafIcon className="w-7 h-7 mx-auto mb-1" />
                      <span className="text-xs">{morphActive ? "Morphed!" : "Click me"}</span>
                    </div>
                  </button>
                </div>

                <p className="text-xs text-center mt-2" style={{ color: "#8b9d77" }}>
                  {morphActive
                    ? "New organic form — click to return"
                    : morphHovered
                    ? "Hover state: subtle pre-morph"
                    : "Default blob — click or hover to morph"}
                </p>
              </div>
            </RevealBlock>

            {/* aiRule 2: Soft Earth Press */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9e0d4",
                  borderRadius: "40px 50px 40px 50px / 50px 40px 50px 40px",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "#d4a37322",
                      color: "#8a6030",
                      borderRadius: "12px",
                    }}
                  >
                    Rule 2
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                    Soft Earth Press
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "#7a6658" }}>
                  hover: translate-y-0.5 + deeper earth tone
                </p>
                <p className="text-xs mb-6" style={{ color: "#7a6658" }}>
                  On hover, elements sink slightly and deepen in color — like pressing warm soil.
                  No floating, no bouncing. Hold the button to feel all three states.
                </p>

                <div className="flex flex-col items-center gap-4 py-4">
                  <button
                    className="w-full max-w-[260px] py-4 font-medium text-sm text-white transition-all duration-500 ease-in-out"
                    style={{
                      backgroundColor:
                        pressState === "pressed"
                          ? "#3d2a1e"
                          : pressState === "hover"
                          ? "#4d3528"
                          : "#5c4033",
                      transform:
                        pressState === "pressed"
                          ? "translateY(4px)"
                          : pressState === "hover"
                          ? "translateY(2px)"
                          : "translateY(0)",
                      boxShadow:
                        pressState === "pressed"
                          ? "0 1px 4px rgba(92,64,51,0.2)"
                          : pressState === "hover"
                          ? "0 3px 10px rgba(92,64,51,0.25)"
                          : "0 6px 16px rgba(92,64,51,0.3)",
                      borderRadius: "26px 30px 26px 22px / 22px 26px 30px 26px",
                    }}
                    onMouseEnter={() => setPressState("hover")}
                    onMouseLeave={() => setPressState("idle")}
                    onMouseDown={() => setPressState("pressed")}
                    onMouseUp={() => setPressState("hover")}
                  >
                    <EarthIcon className="w-5 h-5 mx-auto mb-1" />
                    Press into earth
                  </button>
                  <div className="flex gap-6 text-xs text-center">
                    {[
                      { label: "Idle", bg: "#5c4033", active: pressState === "idle" },
                      { label: "Hover", bg: "#4d3528", active: pressState === "hover" },
                      { label: "Pressed", bg: "#3d2a1e", active: pressState === "pressed" },
                    ].map(({ label, bg, active }) => (
                      <div key={label} className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-8 h-8 transition-all duration-300"
                          style={{
                            backgroundColor: bg,
                            borderRadius: "10px",
                            outline: active ? `2px solid ${bg}` : "none",
                            outlineOffset: "2px",
                          }}
                        />
                        <span
                          style={{
                            color: active ? "#5c4033" : "#7a6658",
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 3: Botanical Slowness */}
            <RevealBlock delay={0.16}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9e0d4",
                  borderRadius: "40px 50px 45px 40px / 50px 40px 50px 45px",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "#5c403322",
                      color: "#5c4033",
                      borderRadius: "12px",
                    }}
                  >
                    Rule 3
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                    Botanical Slowness
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "#7a6658" }}>
                  duration-500 to duration-700 + ease-in-out
                </p>
                <p className="text-xs mb-6" style={{ color: "#7a6658" }}>
                  Animations move at the pace of natural growth — never rushed. Compare fast vs.
                  organic timing side by side.
                </p>

                <div className="space-y-5">
                  <div className="flex gap-2">
                    {(["fast", "organic"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setBotanicalMode(mode);
                          setBotanicalTriggered(false);
                        }}
                        className="px-4 py-2 text-xs font-medium capitalize transition-all duration-300"
                        style={{
                          backgroundColor: botanicalMode === mode ? "#5c4033" : "#e9e0d4",
                          color: botanicalMode === mode ? "#faf6f1" : "#5c4033",
                          borderRadius: "14px 16px 12px 14px / 12px 14px 16px 14px",
                        }}
                      >
                        {mode === "fast" ? "Fast (150ms)" : "Organic (700ms)"}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs" style={{ color: "#7a6658" }}>
                        {botanicalMode === "fast"
                          ? "Fast linear — jarring, industrial"
                          : "Botanical ease-in-out — natural rhythm"}
                      </span>
                      <button
                        onClick={() => setBotanicalTriggered((v) => !v)}
                        className="text-xs px-3 py-1 transition-all duration-300"
                        style={{
                          backgroundColor: "#8b9d7730",
                          color: "#5a6e48",
                          borderRadius: "12px",
                        }}
                      >
                        Grow
                      </button>
                    </div>
                    <div
                      className="relative h-12 overflow-hidden"
                      style={{
                        backgroundColor: "#faf6f1",
                        borderRadius: "24px",
                        border: "1px solid #e9e0d4",
                      }}
                    >
                      <div
                        className="absolute top-1/2 left-3 w-8 h-8 flex items-center justify-center text-white"
                        style={{
                          backgroundColor:
                            botanicalMode === "fast" ? "#d4a373" : "#8b9d77",
                          borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%",
                          transform: `translateY(-50%) translateX(${botanicalTriggered ? "220px" : "0"})`,
                          transition: botanicalTriggered
                            ? botanicalMode === "fast"
                              ? "transform 0.15s linear"
                              : "transform 0.7s ease-in-out"
                            : "none",
                        }}
                      >
                        <SeedlingIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <p
                      className="text-[10px] mt-2 font-mono text-center"
                      style={{ color: "#8b9d77" }}
                    >
                      {botanicalMode === "fast"
                        ? "transition: 0.15s linear"
                        : "transition: 0.7s ease-in-out"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {["Soil", "Bark", "Moss"].map((name, i) => (
                      <div
                        key={name}
                        className="p-3 text-center text-xs font-medium"
                        style={{
                          backgroundColor: (["#5c4033", "#8b9d77", "#d4a373"] as const)[i],
                          color: "#faf6f1",
                          borderRadius: "16px 20px 14px 18px / 14px 16px 20px 18px",
                          opacity: botanicalTriggered ? 1 : 0,
                          transform: botanicalTriggered ? "translateY(0)" : "translateY(12px)",
                          transition: botanicalTriggered
                            ? botanicalMode === "fast"
                              ? `opacity 0.1s linear ${i * 0.05}s, transform 0.1s linear ${i * 0.05}s`
                              : `opacity 0.6s ease-in-out ${i * 0.15}s, transform 0.6s ease-in-out ${i * 0.15}s`
                            : "none",
                        }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 4: Verdant Tint */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9e0d4",
                  borderRadius: "45px 40px 50px 40px / 40px 45px 40px 50px",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "#8b9d7730",
                      color: "#4a5e38",
                      borderRadius: "12px",
                    }}
                  >
                    Rule 4
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                    Verdant Tint
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "#7a6658" }}>
                  hover: text/icon transitions toward deep green
                </p>
                <p className="text-xs mb-4" style={{ color: "#7a6658" }}>
                  On interaction, text and icons shift toward deep sage green — like a plant
                  awakened by sunlight. Hover items or toggle the light.
                </p>

                <div className="mb-5">
                  <button
                    onClick={() => setVerdantLit((v) => !v)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-700 ease-in-out"
                    style={{
                      backgroundColor: verdantLit ? "#8b9d77" : "#e9e0d4",
                      color: verdantLit ? "#faf6f1" : "#5c4033",
                      borderRadius: "16px 18px 14px 16px / 14px 16px 18px 16px",
                    }}
                  >
                    <SunIcon className="w-3.5 h-3.5" />
                    {verdantLit ? "Light is ON — plants waking" : "Toggle the light on"}
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: <LeafIcon className="w-5 h-5" />, label: "Wild Fern Collection", sub: "Forest floor" },
                    { icon: <SeedlingIcon className="w-5 h-5" />, label: "Heritage Seeds", sub: "Seed vault" },
                    { icon: <WindIcon className="w-5 h-5" />, label: "Morning Mist Blend", sub: "Highland meadow" },
                    { icon: <DropletIcon className="w-5 h-5" />, label: "Spring Water Soap", sub: "Mountain spring" },
                  ].map((item, i) => {
                    const isActive = verdantLit || verdantHovered === i;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-3 cursor-pointer transition-all duration-700 ease-in-out"
                        style={{
                          backgroundColor: isActive ? "#8b9d7712" : "#faf6f1",
                          borderRadius: "16px 18px 14px 16px / 14px 16px 18px 16px",
                        }}
                        onMouseEnter={() => setVerdantHovered(i)}
                        onMouseLeave={() => setVerdantHovered(null)}
                      >
                        <div
                          className="transition-all duration-700 ease-in-out"
                          style={{ color: isActive ? "#5a6e48" : "#d4a373" }}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm font-medium transition-colors duration-700 ease-in-out"
                            style={{ color: isActive ? "#4a5e38" : "#5c4033" }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="text-xs transition-colors duration-700 ease-in-out"
                            style={{ color: isActive ? "#6a7a58" : "#7a6658" }}
                          >
                            {item.sub}
                          </div>
                        </div>
                        <div
                          className="transition-all duration-700 ease-in-out"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "translateX(0)" : "translateX(4px)",
                          }}
                        >
                          <LeafIcon className="w-4 h-4" style={{ color: "#8b9d77" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ORGANIC BRAND APP DEMO                                      */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#d4a373" }}
            >
              App Demo
            </span>
            <h2
              className="text-4xl md:text-5xl font-serif leading-tight"
              style={{ color: "#5c4033" }}
            >
              Organic brand <span style={{ color: "#d4a373" }}>in context</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "#7a6658" }}>
              A simulated artisan goods store — showing the design system applied to a
              real product browsing context with earthy UI patterns.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main product listing */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e9e0d4",
                  borderRadius: "50px 40px 50px 40px / 40px 50px 40px 50px",
                }}
              >
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h3 className="text-xl font-serif" style={{ color: "#5c4033" }}>
                      Spring Harvest
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "#7a6658" }}>
                      Curated seasonal goods
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white transition-all duration-700 ease-in-out hover:translate-y-0.5"
                    style={{
                      backgroundColor: "#5c4033",
                      borderRadius: "20px 24px 18px 22px / 18px 20px 24px 20px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#8b9d77";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#5c4033";
                    }}
                  >
                    <LeafIcon className="w-4 h-4" />
                    New Arrivals
                  </button>
                </div>

                <div className="space-y-4">
                  {productCards.map((product, i) => (
                    <div
                      key={product.name}
                      className="group flex items-center gap-4 p-4 transition-all duration-700 ease-in-out cursor-pointer"
                      style={{
                        backgroundColor: "#faf6f1",
                        borderRadius: "20px 24px 18px 22px / 18px 20px 24px 20px",
                        border: "1px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#e9e0d4";
                        (e.currentTarget as HTMLElement).style.borderColor = "#c4b5a5";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#faf6f1";
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                        style={{
                          backgroundColor: `${product.accent}22`,
                          color: product.accent,
                          borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%",
                        }}
                      >
                        {product.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-semibold mb-0.5 transition-colors duration-700 ease-in-out group-hover:text-[#5a6e48]"
                          style={{ color: "#5c4033" }}
                        >
                          {product.name}
                        </div>
                        <div className="text-xs" style={{ color: "#7a6658" }}>
                          {product.origin}
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          {["Organic", "Seasonal", "Handmade"].map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5"
                              style={{
                                backgroundColor: "#8b9d7718",
                                color: "#5a6e48",
                                borderRadius: "8px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className="text-lg font-serif font-semibold"
                          style={{ color: product.accent }}
                        >
                          {product.price}
                        </div>
                        <button
                          className="text-[10px] mt-1.5 px-3 py-1 font-medium text-white transition-all duration-500 ease-in-out"
                          style={{
                            backgroundColor: "#5c4033",
                            borderRadius: "10px",
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Sidebar */}
            <RevealBlock delay={0.18}>
              <div className="space-y-5 h-full">
                {/* Brand values checklist */}
                <div
                  className="p-7"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e9e0d4",
                    borderRadius: "40px 50px 40px 50px / 50px 40px 50px 40px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center"
                      style={{
                        backgroundColor: "#8b9d7720",
                        color: "#8b9d77",
                        borderRadius: "50% 40% 50% 40% / 40% 50% 40% 50%",
                      }}
                    >
                      <SeedlingIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                      Brand Values
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Sustainably sourced",
                      "Zero synthetic dyes",
                      "Compostable packaging",
                      "Direct from farmers",
                      "Carbon neutral",
                    ].map((val, i) => (
                      <button
                        key={val}
                        onClick={() => toggleValue(i + 2)}
                        className="w-full flex items-center gap-3 text-left transition-all duration-500 ease-in-out"
                      >
                        <div
                          className="w-5 h-5 flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500 ease-in-out"
                          style={{
                            borderColor: checkedValues[i + 2] ? "#8b9d77" : "#c4b5a5",
                            backgroundColor: checkedValues[i + 2] ? "#8b9d77" : "transparent",
                            borderRadius: "6px",
                          }}
                        >
                          {checkedValues[i + 2] && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className="text-sm transition-colors duration-500 ease-in-out"
                          style={{ color: checkedValues[i + 2] ? "#5a6e48" : "#7a6658" }}
                        >
                          {val}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Season indicator */}
                <div
                  className="p-7 transition-all duration-700 ease-in-out hover:translate-y-0.5 cursor-default"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e9e0d4",
                    borderRadius: "50px 40px 50px 40px / 40px 50px 40px 50px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center"
                      style={{
                        backgroundColor: "#d4a37322",
                        color: "#d4a373",
                        borderRadius: "40% 60% 50% 50% / 60% 40% 50% 50%",
                      }}
                    >
                      <SunIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#5c4033" }}>
                      Now in Season
                    </span>
                  </div>
                  <div
                    className="text-3xl font-serif font-bold mb-1"
                    style={{ color: "#d4a373" }}
                  >
                    Spring
                  </div>
                  <div className="text-xs mb-4" style={{ color: "#7a6658" }}>
                    Wild Herbs, Root Tonics, Fresh Greens
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: "#e9e0d4" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "35%",
                        background: "linear-gradient(90deg, #5c4033, #8b9d77)",
                      }}
                    />
                  </div>
                  <div
                    className="flex justify-between text-[10px] mt-1"
                    style={{ color: "#7a6658" }}
                  >
                    <span>Winter</span>
                    <span>Summer</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. DO / DON'T RULES + PHILOSOPHY                               */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: "#8b9d77" }}
            >
              Philosophy
            </span>
            <h2
              className="text-4xl md:text-5xl font-serif leading-tight"
              style={{ color: "#5c4033" }}
            >
              Design <span style={{ color: "#8b9d77" }}>principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "#7a6658" }}>
              Natural Organic draws from earth, plant, and slow growth. Every decision
              should feel as deliberate as a seed choosing where to root.
            </p>
          </RevealBlock>

          {/* Philosophy principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <EarthIcon className="w-8 h-8" />,
                title: "Earth Harmony",
                tagline: "Colors come from nature",
                desc: "Amber, stone, olive, sage — the palette is pulled directly from soil and foliage. Cold tech blues and neon never belong here.",
                accent: "#5c4033",
                items: [
                  "bg-[#faf6f1] warm cream base",
                  "text-stone-800 for body",
                  "sage #8b9d77 for accents",
                ],
              },
              {
                icon: <SeedlingIcon className="w-8 h-8" />,
                title: "Handcraft Warmth",
                tagline: "Imperfection is intentional",
                desc: "Irregular radii, slight asymmetry, and organic blob shapes replace perfect circles and rigid rectangles.",
                accent: "#8b9d77",
                items: [
                  "borderRadius asymmetric blobs",
                  "rounded-[2rem] minimum",
                  "No perfect squares",
                ],
              },
              {
                icon: <WindIcon className="w-8 h-8" />,
                title: "Slow Growth",
                tagline: "Pace of botanical life",
                desc: "Transitions run 500–700ms with ease-in-out. No snap-back springs, no instant flips — natural rhythm only.",
                accent: "#d4a373",
                items: [
                  "duration-500 minimum",
                  "ease-in-out always",
                  "No duration-150 quick snaps",
                ],
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className="group p-8 h-full transition-all duration-700 ease-in-out hover:translate-y-0.5 cursor-default"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e9e0d4",
                    borderRadius: "40px 50px 40px 50px / 50px 40px 50px 40px",
                  }}
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-6 transition-all duration-700 ease-in-out group-hover:scale-105"
                    style={{
                      backgroundColor: `${principle.accent}18`,
                      color: principle.accent,
                      borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%",
                    }}
                  >
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-serif mb-1" style={{ color: "#5c4033" }}>
                    {principle.title}
                  </h3>
                  <p className="text-sm font-medium mb-4" style={{ color: principle.accent }}>
                    {principle.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#7a6658" }}>
                    {principle.desc}
                  </p>
                  <ul className="space-y-2">
                    {principle.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-mono"
                        style={{ color: "#7a6658" }}
                      >
                        <span
                          className="mt-1.5 w-2 h-2 flex-shrink-0"
                          style={{
                            backgroundColor: principle.accent,
                            borderRadius: "50% 40% 50% 40% / 40% 50% 40% 50%",
                          }}
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
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #c4d4b0",
                  borderRadius: "40px 50px 40px 50px / 50px 40px 50px 40px",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{
                      backgroundColor: "#8b9d7720",
                      borderRadius: "50% 40% 50% 40% / 40% 50% 40% 50%",
                    }}
                  >
                    <CheckIcon className="w-4 h-4" style={{ color: "#8b9d77" }} />
                  </div>
                  <h3 className="text-lg font-serif" style={{ color: "#5a6e48" }}>
                    Do
                  </h3>
                  <LeafIcon
                    className="w-4 h-4 ml-auto opacity-50"
                    style={{ color: "#8b9d77" }}
                  />
                </div>
                <ul className="space-y-3">
                  {[
                    "Use earth tones: amber, stone, olive, sage",
                    "Warm cream bg-[#faf6f1] as base background",
                    "Irregular radii: rounded-[2rem] or blob shapes",
                    "Add paper/fabric texture via CSS or SVG",
                    "Serif fonts for headings (font-serif)",
                    "Soft hover transitions duration-500 ease-in-out",
                    "Translate-y-0.5 earth press on hover",
                    "Natural imagery and botanical icons",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "#5c4033" }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 flex-shrink-0"
                        style={{
                          backgroundColor: "#8b9d77",
                          borderRadius: "50% 40% 50% 40% / 40% 50% 40% 50%",
                        }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e8c4b4",
                  borderRadius: "50px 40px 50px 40px / 40px 50px 40px 50px",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{
                      backgroundColor: "#5c403318",
                      borderRadius: "40% 50% 40% 50% / 50% 40% 50% 40%",
                    }}
                  >
                    <XIcon className="w-4 h-4" style={{ color: "#8b5a3a" }} />
                  </div>
                  <h3 className="text-lg font-serif" style={{ color: "#8b5a3a" }}>
                    Don&apos;t
                  </h3>
                  <EarthIcon
                    className="w-4 h-4 ml-auto"
                    style={{ color: "#c4b5a5" }}
                  />
                </div>
                <ul className="space-y-3">
                  {[
                    "Cold colors: blue or purple as primary",
                    "Pure black #000000 anywhere",
                    "Sharp geometric shapes or right angles",
                    "High-tech design elements (neon glow)",
                    "Neon or high saturation accent colors",
                    "Perfect circles or rectangles",
                    "Fast snap transitions (duration-100 or less)",
                    "Bounce/spring animations — use slow ease only",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "#5c4033" }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 flex-shrink-0"
                        style={{
                          backgroundColor: "#b07050",
                          borderRadius: "50% 40% 50% 40% / 40% 50% 40% 50%",
                        }}
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

      {/* ============================================================== */}
      {/* 8. FOOTER                                                       */}
      {/* ============================================================== */}
      <footer
        className="relative overflow-hidden"
        style={{ backgroundColor: "#faf6f1", borderTop: "1px solid #e9e0d4" }}
      >
        {/* Organic top accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 opacity-60"
          style={{
            background: "linear-gradient(90deg, #5c4033, #8b9d77, #d4a373)",
            borderRadius: "4px",
          }}
        />

        {/* Floating accents */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none rise-anim"
          style={{ color: "#8b9d77" }}
        >
          <SeedlingIcon className="w-5 h-5 opacity-30" />
        </div>
        <div
          className="absolute top-10 left-10 pointer-events-none sway-anim"
          style={{ color: "#8b9d77" }}
        >
          <LeafIcon className="w-5 h-5 opacity-25" />
        </div>
        <div
          className="absolute top-14 right-20 pointer-events-none"
          style={{ color: "#d4a373", animation: "organic-sway 9s ease-in-out infinite 3s" }}
        >
          <SunIcon className="w-4 h-4 opacity-30" />
        </div>
        <div
          className="absolute bottom-10 left-1/4 pointer-events-none breathe-anim"
          style={{ color: "#5c4033" }}
        >
          <EarthIcon className="w-6 h-6 opacity-15" />
        </div>
        <div
          className="absolute bottom-8 right-1/3 pointer-events-none"
          style={{ color: "#8b9d77", animation: "organic-drift 10s ease-in-out infinite 2s" }}
        >
          <WindIcon className="w-5 h-5 opacity-20" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{
                    backgroundColor: "#5c4033",
                    color: "#faf6f1",
                    borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%",
                  }}
                >
                  <LeafIcon className="w-4 h-4" />
                </div>
                <span
                  className="text-xl font-serif font-bold"
                  style={{ color: "#5c4033" }}
                >
                  Natural<span style={{ color: "#8b9d77" }}>Organic</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#7a6658" }}>
                Warm earth tones, organic shapes, and the slow rhythms of botanical life.
                For brands rooted in nature.
              </p>
              <div className="flex gap-2">
                {palette.map((s) => (
                  <div
                    key={s.name}
                    className="w-5 h-5 transition-all duration-700 ease-in-out hover:scale-125 cursor-default"
                    style={{
                      backgroundColor: s.hex,
                      border:
                        s.hex === "#faf6f1" ? "1.5px solid #c4b5a5" : "none",
                      borderRadius: "60% 40% 50% 50% / 40% 60% 50% 60%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "#7a6658" }}
                >
                  Style
                </span>
                <Link
                  href="/styles/natural-organic"
                  className="transition-colors duration-500 ease-in-out hover:underline"
                  style={{ color: "#5c4033" }}
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/natural-organic/showcase"
                  className="transition-colors duration-500 ease-in-out hover:underline"
                  style={{ color: "#5c4033" }}
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/natural-organic/cover"
                  className="transition-colors duration-500 ease-in-out hover:underline"
                  style={{ color: "#5c4033" }}
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "#7a6658" }}
                >
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="transition-colors duration-500 ease-in-out hover:underline"
                  style={{ color: "#5c4033" }}
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="transition-colors duration-500 ease-in-out hover:underline"
                  style={{ color: "#5c4033" }}
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "#7a6658" }}
                >
                  Palette
                </span>
                {palette.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "#7a6658" }}
                  >
                    <span
                      className="w-3 h-3 inline-block"
                      style={{
                        backgroundColor: s.hex,
                        border: s.hex === "#faf6f1" ? "1px solid #c4b5a5" : "none",
                        borderRadius: "50%",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, #e9e0d4, transparent)",
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "#7a6658" }}
            >
              <span>Rooted in nature, made for</span>
              <LeafIcon
                className="w-4 h-4 breathe-anim"
                style={{ color: "#8b9d77" }}
              />
              <span>StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-700 ease-in-out hover:translate-y-0.5 active:scale-95"
              style={{
                backgroundColor: "#e9e0d4",
                color: "#5c4033",
                borderRadius: "22px 26px 20px 24px / 20px 22px 26px 22px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#5c4033";
                (e.currentTarget as HTMLElement).style.color = "#faf6f1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#e9e0d4";
                (e.currentTarget as HTMLElement).style.color = "#5c4033";
              }}
            >
              <SeedlingIcon className="w-3.5 h-3.5" />
              Back to StyleKit
              <span>→</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
