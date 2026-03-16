"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
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

function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 9l10 13L22 9z" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function BlurIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <circle cx="12" cy="12" r="6" opacity="0.4" />
      <circle cx="12" cy="12" r="3" opacity="0.8" />
    </svg>
  );
}

function GlintIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l1.2 7.8L21 12l-7.8 1.2L12 21l-1.2-7.8L3 12l7.8-1.2z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Glass Primary", hex: "rgba(255,255,255,0.15)", display: "white/15", label: "Primary glass surface" },
  { name: "Glass Secondary", hex: "rgba(255,255,255,0.10)", display: "white/10", label: "Secondary glass layer" },
  { name: "Indigo Depth", hex: "#667eea", display: "#667eea", label: "Gradient anchor" },
  { name: "Royal Purple", hex: "#764ba2", display: "#764ba2", label: "Gradient midpoint" },
  { name: "Fuchsia Glow", hex: "#f093fb", display: "#f093fb", label: "Gradient highlight" },
  { name: "Rose Accent", hex: "#f5576c", display: "#f5576c", label: "Warm accent" },
];

const gradientPresets = [
  { name: "Indigo Purple", from: "#667eea", via: "#764ba2", to: "#f093fb" },
  { name: "Ocean Blue", from: "#4facfe", via: "#6a85f5", to: "#764ba2" },
  { name: "Emerald Cyan", from: "#43e97b", via: "#38f9d7", to: "#667eea" },
  { name: "Sunset Rose", from: "#f5576c", via: "#f093fb", to: "#764ba2" },
];

const layerData = [
  {
    id: 0,
    label: "Gradient Foundation",
    description: "Rich multi-stop gradient provides the vibrant color field that the glass samples from. Without this, there is nothing to blur.",
    code: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500",
  },
  {
    id: 1,
    label: "High Blur + Saturate",
    description: "backdrop-blur-[60px] with backdrop-saturate-[180%] creates the frosted glass effect with enhanced color vibrancy.",
    code: "backdrop-blur-[60px] backdrop-saturate-[180%]",
  },
  {
    id: 2,
    label: "Glass Surface + Inner Glow",
    description: "Semi-transparent fill with a top-down luminance gradient simulates light hitting the glass from above. Multi-layer shadows add depth.",
    code: "bg-white/15 + linear-gradient(to bottom, white/18, transparent)",
  },
  {
    id: 3,
    label: "Specular + Content",
    description: "Sweep highlight on interaction, luminous borders on hover, and high-contrast text ensure both beauty and readability.",
    code: "skew-x-[-20deg] sweep + border-white/20 -> /40",
  },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "nav";

/* ------------------------------------------------------------------ */
/*  Glass panel component                                              */
/* ------------------------------------------------------------------ */

function GlassPanel({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`group relative
        bg-white/12 backdrop-blur-[60px] backdrop-saturate-[180%]
        border border-white/20
        rounded-3xl
        shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)]
        overflow-hidden
        ${hover ? "hover:border-white/35 hover:shadow-[0_16px_56px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-1" : ""}
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      {hover && (
        <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeBg, setActiveBg] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [glassOpacity, setGlassOpacity] = useState(15);
  const [glassBlur, setGlassBlur] = useState(60);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentGradient = gradientPresets[activeBg];
  const spring = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 35%, #a855f7 65%, #ec4899 100%)" }}
    >
      <style>{`
        @keyframes lg-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1.5deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes lg-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(25px, -35px) scale(1.06); }
          66% { transform: translate(-20px, 15px) scale(0.96); }
        }
        @keyframes lg-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.75; }
        }
        @keyframes lg-shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        @keyframes lg-prismatic {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .lg-float { animation: lg-float 7s ease-in-out infinite; }
        .lg-orb-1 { animation: lg-orb-drift 9s ease-in-out infinite; }
        .lg-orb-2 { animation: lg-orb-drift 12s ease-in-out infinite 2.5s; }
        .lg-orb-3 { animation: lg-orb-drift 10s ease-in-out infinite 5s; }
        .lg-pulse { animation: lg-pulse 4s ease-in-out infinite; }
        .lg-shimmer { animation: lg-shimmer 0.9s ease-out forwards; }
        .lg-spring { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%] border-b border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/12 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            <DiamondIcon className="w-4 h-4 text-white/90" />
            <span className="text-sm font-semibold text-white tracking-tight">
              Liquid<span className="text-white/60">Glass</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Layers", "Playground", "Rules"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 cursor-pointer lg-spring"
              >
                {item}
              </span>
            ))}
          </nav>
          <Link
            href="/"
            className="group relative flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 text-white text-sm font-medium overflow-hidden hover:bg-white/22 hover:border-white/35 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] lg-spring"
          >
            <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
            <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
            <span className="relative z-10">StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative pt-28 md:pt-36 pb-28 px-5 md:px-10 overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="absolute top-10 right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none lg-orb-1"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[200px] left-[-100px] w-[450px] h-[450px] rounded-full pointer-events-none lg-orb-2"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-10 right-1/3 w-[350px] h-[350px] rounded-full pointer-events-none lg-orb-3"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
        />

        {/* Floating glass decorations */}
        <div
          className="absolute top-24 right-16 w-28 h-28 bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-3xl pointer-events-none hidden md:block lg-float shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-52 left-8 w-20 h-20 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-2xl pointer-events-none hidden md:block lg-float shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          style={{ animationDelay: "1.8s" }}
        />
        <div
          className="absolute bottom-32 right-8 w-16 h-16 bg-white/12 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/18 rounded-2xl pointer-events-none hidden md:block lg-float shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-6xl mx-auto text-center relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.55s ${spring} 0s, transform 0.55s ${spring} 0s`,
            }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/12 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 text-white/90 text-xs font-semibold tracking-[0.16em] uppercase mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
              <DiamondIcon className="w-3 h-3" />
              Liquid Glass
              <DiamondIcon className="w-3 h-3" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.0] tracking-tight mb-6 text-white"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.7s ${spring} 0.1s, transform 0.7s ${spring} 0.1s`,
            }}
          >
            Light Flows
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Through Glass.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/65 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s ${spring} 0.2s, transform 0.7s ${spring} 0.2s`,
            }}
          >
            High blur, saturated refraction, inner luminance, and chromatic edges.
            Glass that feels alive.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.7s ${spring} 0.3s, transform 0.7s ${spring} 0.3s`,
            }}
          >
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/18 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/25 text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/25 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:scale-[0.97] lg-spring overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
              <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
              <DiamondIcon className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Explore Glass</span>
            </button>
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 text-white/80 font-medium hover:bg-white/14 hover:text-white hover:border-white/25 hover:-translate-y-0.5 lg-spring overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
              <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
              <LayersIcon className="relative z-10 w-4 h-4" />
              <span className="relative z-10">View Layers</span>
            </button>
          </div>

          {/* Property cards */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s ${spring} 0.4s, transform 0.7s ${spring} 0.4s`,
            }}
          >
            {[
              { value: "blur-[60px]", label: "High Blur" },
              { value: "saturate-180%", label: "Color Boost" },
              { value: "inset glow", label: "Inner Light" },
              { value: "spring ease", label: "Fluid Motion" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="group relative bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/18 rounded-2xl p-5 text-center overflow-hidden hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] lg-spring cursor-default"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/18 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                <div className="relative text-sm font-bold mb-1 font-mono text-white">{stat.value}</div>
                <div className="relative text-xs text-white/50 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. GRADIENT SWITCHER                                         */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Foundation</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Gradient <span className="text-white/55">backgrounds</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/55 text-lg max-w-lg leading-relaxed">
              Liquid Glass requires a rich gradient foundation. The glass effect only emerges
              when there is something vibrant behind it to blur and refract.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {gradientPresets.map((bg, i) => (
                <button
                  key={bg.name}
                  onClick={() => setActiveBg(i)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium lg-spring border ${
                    activeBg === i
                      ? "bg-white/22 border-white/40 text-white shadow-[0_4px_16px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]"
                      : "bg-white/8 border-white/15 text-white/60 hover:bg-white/14 hover:text-white"
                  }`}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden p-10 md:p-16 min-h-[320px] flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentGradient.from} 0%, ${currentGradient.via} 50%, ${currentGradient.to} 100%)`,
                transition: "background 0.8s ease-out",
              }}
            >
              <div
                className="absolute top-8 right-12 w-36 h-36 rounded-full lg-pulse"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)" }}
              />
              <div
                className="absolute bottom-6 left-8 w-28 h-28 rounded-full lg-pulse"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", animationDelay: "2s" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                {["Primary Panel", "Content Area", "Side Panel"].map((label, i) => (
                  <GlassPanel key={label} className="p-6">
                    <div className="text-white font-semibold text-sm mb-2">{label}</div>
                    <div className="text-white/50 text-xs">Glass layer {i + 1}</div>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COLOR PALETTE                                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Palette</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Glass <span className="text-white/55">color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/55 text-lg max-w-lg leading-relaxed">
              Two transparent glass layers and four gradient accent colors. With Liquid Glass,
              the transparency is the color.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="group relative cursor-default"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="h-24 rounded-2xl mb-3 border border-white/15 overflow-hidden relative"
                    style={{
                      backgroundColor: swatch.hex,
                      transform: hoveredSwatch === i ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                      boxShadow: hoveredSwatch === i
                        ? "0 16px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)"
                        : "0 4px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
                      transition: `transform 0.5s ${spring}, box-shadow 0.5s ease`,
                    }}
                  >
                    {swatch.name.includes("Glass") && (
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: "repeating-conic-gradient(#aaa 0% 25%, #fff 0% 50%)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                    )}
                    {hoveredSwatch === i && (
                      <div
                        className="absolute inset-0 lg-shimmer"
                        style={{
                          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                        }}
                      />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white">{swatch.name}</div>
                  <div className="text-xs text-white/40 font-mono mt-0.5">{swatch.display}</div>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/60 bg-white/8 border border-white/12">
                    {swatch.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPONENT GALLERY                                         */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Components</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Glass <span className="text-white/55">building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/55 text-lg max-w-lg leading-relaxed">
              Every component is a glass panel with inner luminance, multi-layer shadows,
              and specular sweep on interaction.
            </p>
          </RevealBlock>

          {/* Tab pills */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "nav"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize lg-spring border ${
                    activeTab === tab
                      ? "bg-white/22 border-white/40 text-white shadow-[0_4px_16px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.25)]"
                      : "bg-white/8 border-white/15 text-white/60 hover:bg-white/14 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <GlassPanel hover={false} className="p-8 md:p-12">

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      Primary with inner luminance + specular sweep
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="group relative px-6 py-3 bg-white/18 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/25 rounded-2xl text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/25 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:scale-[0.97] lg-spring overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                        <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2"><DiamondIcon className="w-4 h-4" />Primary</span>
                      </button>
                      <button className="group relative px-6 py-3 bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-2xl text-white/80 font-medium hover:bg-white/14 hover:border-white/25 hover:text-white hover:-translate-y-0.5 lg-spring overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
                        <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2"><LayersIcon className="w-4 h-4" />Secondary</span>
                      </button>
                      <button className="group relative px-6 py-3 rounded-2xl text-white font-medium overflow-hidden hover:-translate-y-0.5 lg-spring" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.6), rgba(168,85,247,0.6))", backdropFilter: "blur(40px) saturate(180%)", border: "1px solid rgba(255,255,255,0.25)" }}>
                        <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                        <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                        <span className="relative z-10 flex items-center gap-2"><GlintIcon className="w-4 h-4" />Gradient</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">Size variants</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", cls: "px-4 py-2 text-xs rounded-xl" },
                        { size: "md", cls: "px-6 py-3 text-sm rounded-2xl" },
                        { size: "lg", cls: "px-9 py-4 text-base rounded-2xl" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`group relative bg-white/18 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/25 text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/25 hover:border-white/35 hover:-translate-y-0.5 lg-spring overflow-hidden ${cls}`}
                        >
                          <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                          <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                          <span className="relative z-10">{size.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { title: "Weather Widget", desc: "Glass panels layered over a vibrant sky gradient with live blur sampling.", icon: <BlurIcon className="w-6 h-6" />, accent: "#6366f1" },
                    { title: "Music Player", desc: "Album art as background, controls in frosted glass with inner luminance.", icon: <DiamondIcon className="w-6 h-6" />, accent: "#a855f7" },
                    { title: "Auth Card", desc: "Login form floating transparently with multi-layer depth shadows.", icon: <LayersIcon className="w-6 h-6" />, accent: "#7c3aed" },
                    { title: "Dashboard", desc: "Stats in glass panels with specular sweep and chromatic hover edges.", icon: <GlintIcon className="w-6 h-6" />, accent: "#ec4899" },
                  ].map((card) => (
                    <GlassPanel key={card.title} className="p-7 cursor-default">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-white/12 backdrop-blur-[30px] border border-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" style={{ color: card.accent }}>{card.icon}</div>
                      <h4 className="text-white text-lg font-semibold mb-2">{card.title}</h4>
                      <p className="text-white/55 text-sm leading-relaxed">{card.desc}</p>
                    </GlassPanel>
                  ))}
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Username</label>
                      <input type="text" placeholder="Enter username..." className="w-full px-5 py-3.5 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 rounded-2xl text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] focus:outline-none focus:border-white/40 focus:bg-white/18 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] lg-spring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                      <input type="password" placeholder="Enter password..." className="w-full px-5 py-3.5 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 rounded-2xl text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] focus:outline-none focus:border-white/40 focus:bg-white/18 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] lg-spring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                      <textarea rows={3} placeholder="Write something..." className="w-full px-5 py-3.5 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 rounded-2xl text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] focus:outline-none focus:border-white/40 focus:bg-white/18 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] lg-spring resize-none" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Select theme</label>
                      <select className="w-full px-5 py-3.5 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/20 rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] focus:outline-none focus:border-white/40 lg-spring">
                        <option className="text-gray-800">Indigo Purple</option>
                        <option className="text-gray-800">Ocean Blue</option>
                        <option className="text-gray-800">Emerald Cyan</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-lg bg-white/18 border border-white/25 flex items-center justify-center cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-white/70">Remember me</span>
                    </div>
                    <button className="group relative w-full px-6 py-3.5 bg-white/18 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/25 rounded-2xl text-white font-medium shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-white/25 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] active:scale-[0.97] lg-spring overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                      <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                      <span className="relative z-10">Sign In</span>
                    </button>
                  </div>
                </div>
              )}

              {/* NAV TAB */}
              {activeTab === "nav" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      Fixed navigation bar
                    </p>
                    <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 50%, #ec4899 100%)" }}>
                      <div className="bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%] border-b border-white/10 px-6 py-3 flex items-center justify-between shadow-[0_1px_0_rgba(255,255,255,0.08)]">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/12 border border-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                          <DiamondIcon className="w-3.5 h-3.5 text-white/90" />
                          <span className="text-xs font-semibold text-white">Brand</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {["Home", "About", "Contact"].map((item) => (
                            <span key={item} className="px-3 py-1.5 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/10 cursor-pointer lg-spring">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-12 text-center">
                        <p className="text-white/40 text-sm">Page content below the nav</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
                      Sidebar navigation
                    </p>
                    <div className="relative rounded-2xl overflow-hidden flex" style={{ background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 50%, #ec4899 100%)", minHeight: 240 }}>
                      <div className="w-56 bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%] border-r border-white/10 p-4 flex flex-col gap-1 shadow-[1px_0_0_rgba(255,255,255,0.05)]">
                        {["Dashboard", "Analytics", "Settings", "Profile"].map((item, i) => (
                          <div
                            key={item}
                            className={`px-4 py-2.5 rounded-xl text-sm cursor-pointer lg-spring ${
                              i === 0
                                ? "bg-white/15 text-white border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                : "text-white/55 hover:text-white hover:bg-white/8"
                            }`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 p-8 flex items-center justify-center">
                        <p className="text-white/40 text-sm">Main content area</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </GlassPanel>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. LAYER ANATOMY                                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Anatomy</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Four <span className="text-white/55">layers deep</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/55 text-lg max-w-lg leading-relaxed">
              Liquid Glass is built from four distinct layers. Each one is essential.
              Remove any layer and the illusion breaks.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Layer selector */}
              <div className="space-y-3">
                {layerData.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border lg-spring ${
                      activeLayer === layer.id
                        ? "bg-white/18 border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)]"
                        : "bg-white/6 border-white/12 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        activeLayer === layer.id ? "bg-white/25 text-white" : "bg-white/10 text-white/50"
                      }`}>
                        {layer.id + 1}
                      </span>
                      <span className={`text-sm font-semibold ${activeLayer === layer.id ? "text-white" : "text-white/65"}`}>
                        {layer.label}
                      </span>
                    </div>
                    {activeLayer === layer.id && (
                      <div className="mt-2 ml-9">
                        <p className="text-white/55 text-xs leading-relaxed mb-2">{layer.description}</p>
                        <code className="text-[10px] font-mono text-white/40 bg-white/8 px-2 py-1 rounded-lg">{layer.code}</code>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Visual preview */}
              <div className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 50%, #ec4899 100%)" }}>
                {/* Layer 0: gradient - always visible */}
                {/* Layer 1: blur overlay */}
                {activeLayer >= 1 && (
                  <div className="absolute inset-8 rounded-2xl backdrop-blur-[60px] backdrop-saturate-[180%]" />
                )}
                {/* Layer 2: glass surface */}
                {activeLayer >= 2 && (
                  <div className="absolute inset-8 rounded-2xl bg-white/15 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)] overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
                  </div>
                )}
                {/* Layer 3: content */}
                {activeLayer >= 3 && (
                  <div className="absolute inset-8 rounded-2xl flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-white text-xl font-bold mb-2">Content Layer</h3>
                      <p className="text-white/65 text-sm">Text and interactive elements</p>
                    </div>
                  </div>
                )}
                {/* Layer indicator */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md text-white/80 text-xs font-mono">
                  Layer {activeLayer + 1}/4: {layerData[activeLayer].label}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. INTERACTIVE PLAYGROUND                                     */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Playground</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Tune the <span className="text-white/55">glass</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/55 text-lg max-w-lg leading-relaxed">
              Adjust opacity and blur to see how Liquid Glass responds. The sweet spot is
              10-20% opacity with 40-60px blur.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white/70">Glass Opacity</label>
                    <span className="text-xs font-mono text-white/50 bg-white/8 px-2 py-1 rounded-lg">{glassOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    value={glassOpacity}
                    onChange={(e) => setGlassOpacity(Number(e.target.value))}
                    className="w-full accent-white/60"
                  />
                  <div className="flex justify-between text-[10px] text-white/30 mt-1">
                    <span>5% (subtle)</span>
                    <span>40% (heavy)</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white/70">Blur Radius</label>
                    <span className="text-xs font-mono text-white/50 bg-white/8 px-2 py-1 rounded-lg">{glassBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={glassBlur}
                    onChange={(e) => setGlassBlur(Number(e.target.value))}
                    className="w-full accent-white/60"
                  />
                  <div className="flex justify-between text-[10px] text-white/30 mt-1">
                    <span>10px (light)</span>
                    <span>100px (heavy)</span>
                  </div>
                </div>
                <div className="bg-white/6 border border-white/12 rounded-2xl p-4">
                  <p className="text-xs font-mono text-white/50 leading-relaxed">
                    bg-white/{glassOpacity}<br />
                    backdrop-blur-[{glassBlur}px]<br />
                    backdrop-saturate-[180%]<br />
                    border border-white/20<br />
                    shadow-[0_8px_32px_rgba(0,0,0,0.12),<br />
                    &nbsp;&nbsp;inset_0_1px_0_rgba(255,255,255,0.35)]
                  </p>
                </div>
              </div>

              {/* Live preview */}
              <div
                className="relative rounded-3xl overflow-hidden min-h-[360px] flex items-center justify-center p-8"
                style={{ background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 50%, #ec4899 100%)" }}
              >
                <div
                  className="absolute top-8 right-8 w-32 h-32 rounded-full lg-pulse"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
                />
                <div
                  className="relative w-full max-w-sm p-8 rounded-3xl border border-white/20 overflow-hidden"
                  style={{
                    backgroundColor: `rgba(255,255,255,${glassOpacity / 100})`,
                    backdropFilter: `blur(${glassBlur}px) saturate(180%)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px) saturate(180%)`,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.35)",
                    transition: `all 0.5s ${spring}`,
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-white text-lg font-bold mb-2">Live Preview</h3>
                    <p className="text-white/65 text-sm mb-4">Adjust the sliders to see changes in real time.</p>
                    <button className="group relative px-5 py-2.5 bg-white/18 backdrop-blur-[30px] border border-white/25 rounded-xl text-white text-sm font-medium shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-white/25 hover:border-white/35 lg-spring overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                      <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                      <span className="relative z-10">Glass Button</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. DO / DON'T                                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Guidelines</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Do <span className="text-white/55">/ Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DO */}
              <GlassPanel hover={false} className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/25 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use backdrop-blur-[40px]+ with backdrop-saturate-[180%]",
                    "Add inner luminance gradient (from-white/18 to transparent)",
                    "Use multi-layer shadows (outer depth + inset highlight)",
                    "Spring easing: duration-500 cubic-bezier(0.16,1,0.3,1)",
                    "Hover: lift + enhanced shadow + brighter border",
                    "Rich gradient backgrounds as the foundation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70 leading-relaxed">
                      <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>

              {/* DON'T */}
              <GlassPanel hover={false} className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-red-500/25 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use glass on solid color backgrounds",
                    "Use low blur (backdrop-blur-sm or backdrop-blur)",
                    "Omit backdrop-saturate (kills the vibrancy)",
                    "Use opaque backgrounds (bg-white, bg-black)",
                    "Use sharp corners (rounded-none, rounded-sm)",
                    "Use fast transitions (duration-100, duration-150)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70 leading-relaxed">
                      <XIcon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PHILOSOPHY                                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 block mb-3">Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Design <span className="text-white/55">principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Optical Realism",
                  desc: "High blur + saturation boost makes background colors live inside the glass. The glass doesn't just sit on top, it refracts.",
                  icon: <BlurIcon className="w-5 h-5" />,
                },
                {
                  title: "Inner Luminance",
                  desc: "A top-down white gradient simulates light hitting the glass surface from above. This is what separates flat translucency from real glass.",
                  icon: <GlintIcon className="w-5 h-5" />,
                },
                {
                  title: "Depth Layering",
                  desc: "Multiple glass layers with varying opacity and blur create true spatial depth. Each layer samples the one below it.",
                  icon: <LayersIcon className="w-5 h-5" />,
                },
                {
                  title: "Chromatic Edges",
                  desc: "Borders reveal subtle luminance changes on interaction. The edge of glass catches light differently than its surface.",
                  icon: <DiamondIcon className="w-5 h-5" />,
                },
                {
                  title: "Fluid Motion",
                  desc: "Spring easing (cubic-bezier 0.16,1,0.3,1) simulates the physical inertia of glass. Nothing snaps, everything flows.",
                  icon: <ArrowRightIcon className="w-5 h-5" />,
                },
                {
                  title: "Specular Sweep",
                  desc: "A single skewed highlight sweeps across the surface on hover, simulating a light source moving across polished glass.",
                  icon: <GlintIcon className="w-5 h-5" />,
                },
              ].map((principle) => (
                <GlassPanel key={principle.title} className="p-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white/12 border border-white/15 text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    {principle.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{principle.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{principle.desc}</p>
                </GlassPanel>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="py-16 px-5 md:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-4">
            Liquid Glass — inspired by Apple&apos;s design language
          </p>
          <Link
            href="/styles"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm lg-spring"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
