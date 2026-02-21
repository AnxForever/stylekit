"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
/* ------------------------------------------------------------------ */

function useInView(options?: IntersectionObserverInit) {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
/*  Inline SVG accents — graffiti themed                               */
/* ------------------------------------------------------------------ */

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function SkullIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-1 11.5v-2h2v2h-2zm2-4h-2V9h2v.5z" />
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

function SprayIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 3h6v2H9zM8 7h8v2H8zM6 11h12v10H6z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SprayDrip — reusable drip decoration                               */
/* ------------------------------------------------------------------ */

function SprayDrip({
  color,
  height = 40,
  width = 3,
  delay = 0,
  active = false,
}: {
  color: string;
  height?: number;
  width?: number;
  delay?: number;
  active?: boolean;
}) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: active ? `${height * 2.5}px` : `${height}px`,
        backgroundColor: color,
        transformOrigin: "top",
        borderRadius: "0 0 50% 50%",
        transition: `height 300ms ease-out ${delay}ms`,
        opacity: 0.85,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Spray Red", hex: "#ff2d55", label: "Primary" },
  { name: "Asphalt", hex: "#1c1c1e", label: "Background" },
  { name: "Cyan Spray", hex: "#00e5ff", label: "Accent 1" },
  { name: "Neon Yellow", hex: "#ffea00", label: "Accent 2" },
  { name: "Purple", hex: "#b620e0", label: "Accent 3" },
  { name: "Orange", hex: "#ff6d00", label: "Accent 4" },
];

const crewMembers = [
  { tag: "VIPER", role: "Bomber", color: "#ff2d55", rotate: "-2deg" },
  { tag: "XENO", role: "Wildstyle", color: "#00e5ff", rotate: "1.5deg" },
  { tag: "BLAZE", role: "Character", color: "#ffea00", rotate: "-1deg" },
  { tag: "MYSTIC", role: "Throwup", color: "#b620e0", rotate: "2deg" },
  { tag: "RAZE", role: "Stencil", color: "#ff6d00", rotate: "-1.5deg" },
  { tag: "NOVA", role: "Piece", color: "#00e5ff", rotate: "1deg" },
];

const galleryPieces = [
  {
    title: "WILDSTYLE",
    subtitle: "Classic NYC subway era",
    color: "#ff2d55",
    shadow: "#00e5ff",
    rotate: "-1.5deg",
    tag: "LEGENDARY",
    tagColor: "#ffea00",
  },
  {
    title: "THROW UP",
    subtitle: "Quick two-color bombing",
    color: "#00e5ff",
    shadow: "#ffea00",
    rotate: "1deg",
    tag: "FRESH",
    tagColor: "#ff2d55",
  },
  {
    title: "STENCIL",
    subtitle: "Street-level political art",
    color: "#ffea00",
    shadow: "#b620e0",
    rotate: "-2deg",
    tag: "BANNED",
    tagColor: "#ff6d00",
  },
  {
    title: "PIECE",
    subtitle: "Masterpiece full color",
    color: "#b620e0",
    shadow: "#ff2d55",
    rotate: "1.5deg",
    tag: "ELITE",
    tagColor: "#00e5ff",
  },
];

const manifestoLines = [
  { text: "THE WALL IS THE CANVAS.", color: "#ff2d55", size: "text-4xl md:text-6xl", rotate: "-1deg" },
  { text: "THE CITY IS THE GALLERY.", color: "#00e5ff", size: "text-3xl md:text-5xl", rotate: "1.5deg" },
  { text: "NO COMMISSION REQUIRED.", color: "#ffea00", size: "text-2xl md:text-4xl", rotate: "-0.5deg" },
  { text: "NO PERMISSION ASKED.", color: "#b620e0", size: "text-2xl md:text-4xl", rotate: "1deg" },
  { text: "JUST LEAVE YOUR MARK.", color: "#ff6d00", size: "text-3xl md:text-5xl", rotate: "-1.5deg" },
];

const typographyScale = [
  { label: "DISPLAY", size: "text-8xl", weight: "font-black", tracking: "tracking-tight", color: "#ff2d55", sample: "GRAF", skew: "-4deg", rotate: "-1deg" },
  { label: "H1", size: "text-6xl", weight: "font-black", tracking: "tracking-tight", color: "#00e5ff", sample: "STREET", skew: "-3deg", rotate: "0.5deg" },
  { label: "H2", size: "text-4xl", weight: "font-black", tracking: "tracking-wider", color: "#ffea00", sample: "WILDSTYLE", skew: "-2deg", rotate: "-0.5deg" },
  { label: "H3", size: "text-2xl", weight: "font-black", tracking: "tracking-widest", color: "#b620e0", sample: "THROW UP", skew: "-1deg", rotate: "0.5deg" },
  { label: "BODY", size: "text-lg", weight: "font-bold", tracking: "tracking-wide", color: "#ffffff", sample: "Every wall is a canvas. Every night is a session.", skew: "0deg", rotate: "0deg" },
  { label: "LABEL", size: "text-xs", weight: "font-black", tracking: "tracking-[0.4em]", color: "#ff6d00", sample: "TAG / CREW / SPOT / BUFF", skew: "0deg", rotate: "-1deg" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "tags";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [hoveredCrew, setHoveredCrew] = useState<number | null>(null);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);
  const [pressedBtn, setPressedBtn] = useState<number | null>(null);

  // Animation section state — all 4 named aiRules
  const [dripsActive, setDripsActive] = useState(false);         // Paint Drip
  const [vandalSnap, setVandalSnap] = useState(false);           // Vandalism Snap
  const [stampPressed, setStampPressed] = useState(false);       // Hard Contrast
  const [zeroPollishState, setZeroPollishState] = useState<"idle" | "active">("idle"); // Zero Polish

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1e] font-sans text-white overflow-x-hidden">
      <style>{`
        @keyframes graf-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }
        .graf-flicker { animation: graf-flicker 8s linear infinite; }
        .graf-spray-text {
          text-shadow: 0 0 6px currentColor, 0 0 12px currentColor;
        }
        .graf-hard-btn { transition: all 0.1s linear; }
        .graf-hard-btn:hover { transform: translate(-2px, -2px); }
        .graf-hard-btn:active { transform: translate(6px, 6px); box-shadow: none !important; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1e]/95 border-b-4 border-[#ff2d55]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-4 border-[#ff2d55] shadow-[4px_4px_0px_#00e5ff]"
            style={{ transform: "rotate(-1deg) skewX(-2deg)" }}
          >
            <BoltIcon className="w-4 h-4 text-[#ff2d55]" />
            <span className="text-sm font-black text-white uppercase tracking-wider">
              GRAFF<span className="text-[#ff2d55]">ITI</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Crew", "Components", "Animations", "Manifesto"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-sm font-black uppercase tracking-wider text-white/60 hover:text-[#ff2d55] cursor-pointer transition-colors duration-100"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* StyleKit back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 border-4 border-[#ffea00] text-[#ffea00] text-sm font-black uppercase shadow-[4px_4px_0px_#b620e0] graf-hard-btn"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden min-h-screen flex items-center">
        {/* Brick wall texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.15) 30px, rgba(255,255,255,0.15) 31px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.15) 60px, rgba(255,255,255,0.15) 61px)",
          }}
        />

        {/* Background spray splatters */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#ff2d55]/6 blur-2xl pointer-events-none" />
        <div className="absolute bottom-32 right-20 w-56 h-56 rounded-full bg-[#00e5ff]/5 blur-2xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#ffea00]/5 blur-xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-[#b620e0]/5 blur-2xl pointer-events-none" />

        {/* Drip decorations top-right */}
        <div className="absolute top-0 right-16 flex gap-3 pointer-events-none">
          <div className="w-3 h-20 bg-[#ff2d55]/60" style={{ borderRadius: "0 0 50% 50%" }} />
          <div className="w-2 h-14 bg-[#00e5ff]/50 mt-4" style={{ borderRadius: "0 0 50% 50%" }} />
          <div className="w-3 h-24 bg-[#ffea00]/40 mt-2" style={{ borderRadius: "0 0 50% 50%" }} />
          <div className="w-2 h-10 bg-[#b620e0]/50 mt-6" style={{ borderRadius: "0 0 50% 50%" }} />
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto relative w-full">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "rotate(-2deg)" : "rotate(-2deg) translateY(16px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#ffea00] text-[#1c1c1e] text-xs font-black uppercase tracking-[0.35em] mb-8">
              No Permission Needed
            </span>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "skewX(-4deg)" : "skewX(-4deg) translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1 className="text-7xl md:text-[120px] lg:text-[160px] font-black text-white uppercase leading-none mb-0 graf-spray-text graf-flicker">
              GRAFF<span className="text-[#ff2d55]">ITI</span>
            </h1>
          </div>

          {/* Secondary title */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "rotate(1deg) skewX(-2deg)" : "rotate(1deg) skewX(-2deg) translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-[#00e5ff] uppercase mb-8 graf-spray-text">
              STREET
            </h2>
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <p className="text-white/60 text-lg font-bold uppercase tracking-widest max-w-xl mb-12">
              Urban art. Spray paint soul. Brick wall canvas. Zero rules.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            <button
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#ff2d55] text-white font-black uppercase tracking-wider border-4 border-[#1c1c1e] shadow-[6px_6px_0px_#00e5ff] graf-hard-btn"
              style={{ transform: "rotate(-2deg) skewX(-2deg)" }}
            >
              <BoltIcon className="w-5 h-5" />
              TAG IT
            </button>
            <button
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent text-[#ffea00] font-black uppercase tracking-wider border-4 border-[#ffea00] shadow-[6px_6px_0px_#b620e0] graf-hard-btn"
              style={{ transform: "rotate(1deg) skewX(-1deg)" }}
            >
              <SprayIcon className="w-5 h-5" />
              GALLERY
            </button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "400+", label: "Pieces Tagged", color: "#ff2d55", rotate: "-1deg" },
              { value: "62", label: "City Walls", color: "#00e5ff", rotate: "0.5deg" },
              { value: "12", label: "Active Crews", color: "#ffea00", rotate: "-0.5deg" },
              { value: "0", label: "Permission Slips", color: "#b620e0", rotate: "1deg" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[#1c1c1e] border-4 px-6 py-4 cursor-default graf-hard-btn"
                style={{
                  borderColor: stat.color,
                  boxShadow: `4px 4px 0px ${stat.color}`,
                  transform: `rotate(${stat.rotate})`,
                  transitionDelay: `${i * 0.04}s`,
                }}
              >
                <div className="text-2xl font-black" style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}` }}>
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#ff2d55] block mb-3">
              &#47;&#47; SPRAY PALETTE
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-0"
              style={{ transform: "skewX(-3deg)" }}
            >
              SIX <span className="text-[#ff2d55] graf-spray-text">COLORS.</span>
            </h2>
            <h3
              className="text-2xl md:text-4xl font-black text-[#00e5ff] uppercase"
              style={{ transform: "skewX(-2deg)" }}
            >
              INFINITE CLASH.
            </h3>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-white/50 text-base font-bold uppercase tracking-wider max-w-lg leading-relaxed">
              Every hue is cranked to maximum saturation. Pastel? Not here.
              Harmony? Overrated. These colors fight each other and they look incredible doing it.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.12}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-14">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i
                        ? "translateY(-10px) rotate(-3deg) skewX(-3deg)"
                        : "translateY(0) rotate(0deg) skewX(0deg)",
                      transition: "transform 0.1s linear",
                    }}
                  >
                    <div
                      className="w-full aspect-square border-4"
                      style={{
                        backgroundColor: swatch.hex,
                        borderColor: hoveredSwatch === i ? "#ffffff" : swatch.hex,
                        boxShadow: hoveredSwatch === i
                          ? `6px 6px 0px ${paletteSwatches[(i + 2) % paletteSwatches.length].hex}`
                          : `4px 4px 0px ${paletteSwatches[(i + 1) % paletteSwatches.length].hex}`,
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase text-white">{swatch.name}</div>
                    <div className="text-xs font-bold font-mono text-white/50 mt-0.5">{swatch.hex}</div>
                    <span
                      className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border-2"
                      style={{ borderColor: swatch.hex, color: swatch.hex }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Clash combos */}
          <RevealBlock delay={0.2}>
            <div className="border-4 border-[#ff2d55] p-8 shadow-[8px_8px_0px_#00e5ff]">
              <p className="text-xs font-black tracking-[0.2em] uppercase text-white/40 mb-6">
                CLASH COMBINATIONS
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#ff2d55", to: "#00e5ff", label: "Red vs Cyan" },
                  { from: "#ffea00", to: "#b620e0", label: "Yellow vs Purple" },
                  { from: "#00e5ff", to: "#ff6d00", label: "Cyan vs Orange" },
                  { from: "#ff2d55", to: "#ffea00", label: "Red vs Yellow" },
                ].map((g, i) => (
                  <div
                    key={g.label}
                    className="group cursor-pointer"
                    style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                  >
                    <div
                      className="h-16 border-4 border-white/10 mb-2 transition-all duration-100 group-hover:scale-[1.04] group-hover:border-white/30"
                      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                    />
                    <div className="text-xs font-black uppercase text-white/50 text-center">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. CREW WALL                                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 relative">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.2) 30px, rgba(255,255,255,0.2) 31px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.2) 60px, rgba(255,255,255,0.2) 61px)",
          }}
        />
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#00e5ff] block mb-3">
              &#47;&#47; ACTIVE CREW
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              THE <span className="text-[#00e5ff] graf-spray-text">WALL WRITERS</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-white/50 text-base font-bold uppercase tracking-wider max-w-lg leading-relaxed">
              Every writer has a tag. Tags are identities. Identities are power.
              Meet the crew that owns these streets.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {crewMembers.map((member, i) => (
                <div
                  key={member.tag}
                  className="group relative bg-[#1c1c1e] border-4 p-7 cursor-pointer overflow-hidden"
                  style={{
                    borderColor: member.color,
                    boxShadow: hoveredCrew === i
                      ? `10px 10px 0px ${paletteSwatches[(i + 2) % paletteSwatches.length].hex}`
                      : `6px 6px 0px ${paletteSwatches[(i + 1) % paletteSwatches.length].hex}`,
                    transform: hoveredCrew === i
                      ? `rotate(${member.rotate}) translateY(-6px) skewX(-2deg)`
                      : `rotate(${member.rotate})`,
                    transition: "all 0.1s linear",
                  }}
                  onMouseEnter={() => setHoveredCrew(i)}
                  onMouseLeave={() => setHoveredCrew(null)}
                >
                  {/* Drip decorations */}
                  <div className="absolute top-0 right-4 flex gap-2">
                    <SprayDrip color={member.color} height={24} width={3} active={hoveredCrew === i} />
                    <SprayDrip color={member.color} height={16} width={2} delay={75} active={hoveredCrew === i} />
                  </div>

                  <SprayIcon className="w-5 h-5 mb-4" style={{ color: member.color } as React.CSSProperties} />
                  <h3
                    className="text-3xl font-black uppercase mb-2 graf-spray-text"
                    style={{ color: member.color, transform: "skewX(-3deg)" }}
                  >
                    {member.tag}
                  </h3>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40">{member.role}</p>

                  {hoveredCrew === i && (
                    <span
                      className="absolute bottom-4 right-4 px-2 py-0.5 text-[10px] font-black uppercase border-2"
                      style={{ borderColor: member.color, color: member.color }}
                    >
                      ACTIVE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#ffea00] block mb-3">
              &#47;&#47; COMPONENTS
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              SPRAY PAINT <span className="text-[#ffea00] graf-spray-text">KIT</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/50 text-base font-bold uppercase tracking-wider max-w-lg leading-relaxed">
              Every component drips attitude. Thick borders. Hard shadows. No smooth curves. No apologies.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {(["buttons", "cards", "inputs", "tags"] as ComponentTab[]).map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 text-sm font-black uppercase tracking-wider border-4 transition-all duration-100 ease-linear"
                  style={
                    activeTab === tab
                      ? {
                          backgroundColor: "#ff2d55",
                          borderColor: "#ff2d55",
                          color: "#fff",
                          boxShadow: "4px 4px 0px #00e5ff",
                          transform: "rotate(-1deg) skewX(-2deg)",
                        }
                      : {
                          backgroundColor: "transparent",
                          borderColor: "rgba(255,255,255,0.2)",
                          color: "rgba(255,255,255,0.5)",
                          transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
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
            <div className="bg-[#0e0e10] border-4 border-[#333] p-8 md:p-12 shadow-[8px_8px_0px_#ff2d55]">

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-white/30 mb-6">
                      PRIMARY
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { label: "TAG IT", bg: "#ff2d55", shadow: "#00e5ff", rot: "-2deg" },
                        { label: "BOMB IT", bg: "#00e5ff", text: "#1c1c1e", shadow: "#ff2d55", rot: "1deg" },
                        { label: "WILDSTYLE", bg: "#b620e0", shadow: "#ffea00", rot: "-1deg" },
                      ].map((btn, i) => (
                        <button
                          key={btn.label}
                          onMouseDown={() => setPressedBtn(i)}
                          onMouseUp={() => setPressedBtn(null)}
                          onMouseLeave={() => setPressedBtn(null)}
                          className="inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-wider text-lg border-4 border-[#1c1c1e] transition-all duration-100 ease-linear"
                          style={{
                            backgroundColor: btn.bg,
                            color: btn.text ?? "#fff",
                            boxShadow: pressedBtn === i ? "none" : `6px 6px 0px ${btn.shadow}`,
                            transform: pressedBtn === i
                              ? `translate(6px, 6px) rotate(${btn.rot}) skewX(-2deg)`
                              : `rotate(${btn.rot}) skewX(-2deg)`,
                          }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-white/30 mb-6">
                      OUTLINE
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { label: "CREW UP", border: "#ffea00", color: "#ffea00", shadow: "#b620e0", rot: "-1deg" },
                        { label: "STENCIL", border: "#b620e0", color: "#b620e0", shadow: "#ff6d00", rot: "1.5deg" },
                        { label: "GHOST TAG", border: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.5)", shadow: "#ff2d55", rot: "-0.5deg" },
                      ].map((btn, i) => (
                        <button
                          key={btn.label}
                          className="px-8 py-4 bg-transparent font-black uppercase tracking-wider text-lg border-4 transition-all duration-100 ease-linear hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[6px] active:translate-y-[6px]"
                          style={{
                            borderColor: btn.border,
                            color: btn.color,
                            boxShadow: `6px 6px 0px ${btn.shadow}`,
                            transform: `rotate(${btn.rot})`,
                          }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-white/30 mb-6">
                      SIZE VARIANTS
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { size: "SM", px: "px-4 py-2 text-xs", shadow: "#00e5ff", rotate: "-1deg" },
                        { size: "MD", px: "px-6 py-3 text-sm", shadow: "#ffea00", rotate: "0.5deg" },
                        { size: "LG", px: "px-10 py-5 text-xl", shadow: "#b620e0", rotate: "-1.5deg" },
                      ].map(({ size, px, shadow, rotate }) => (
                        <button
                          key={size}
                          className={`bg-[#ff2d55] text-white font-black uppercase tracking-wider border-4 border-[#1c1c1e] graf-hard-btn ${px}`}
                          style={{ boxShadow: `5px 5px 0px ${shadow}`, transform: `rotate(${rotate}) skewX(-2deg)` }}
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
                  {galleryPieces.map((piece, i) => (
                    <div
                      key={piece.title}
                      className="group relative bg-[#1c1c1e] border-4 p-8 cursor-pointer overflow-hidden"
                      style={{
                        borderColor: piece.color,
                        boxShadow: hoveredGallery === i
                          ? `12px 12px 0px ${piece.shadow}`
                          : `8px 8px 0px ${piece.shadow}`,
                        transform: hoveredGallery === i
                          ? `rotate(${piece.rotate}) translateY(-8px) skewX(-2deg)`
                          : `rotate(${piece.rotate})`,
                        transition: "all 0.15s ease-linear",
                      }}
                      onMouseEnter={() => setHoveredGallery(i)}
                      onMouseLeave={() => setHoveredGallery(null)}
                    >
                      <div className="absolute top-0 right-6 flex gap-2">
                        <SprayDrip color={piece.color} height={28} width={3} active={hoveredGallery === i} />
                        <SprayDrip color={piece.shadow} height={18} width={2} delay={100} active={hoveredGallery === i} />
                      </div>

                      <span
                        className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest mb-4"
                        style={{ backgroundColor: piece.tagColor, color: "#1c1c1e", transform: "rotate(-2deg)" }}
                      >
                        {piece.tag}
                      </span>

                      <h3
                        className="text-3xl font-black uppercase mb-2 graf-spray-text"
                        style={{ color: piece.color, transform: "skewX(-4deg)" }}
                      >
                        {piece.title}
                      </h3>
                      <p className="text-white/50 text-sm font-bold uppercase tracking-widest group-hover:text-white/70 transition-colors duration-100">
                        {piece.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {[
                      { label: "Your Tag", placeholder: "WRITE YOUR NAME...", borderFocus: "#00e5ff", labelColor: "#ffea00", borderBase: "#ff2d55" },
                      { label: "Crew Name", placeholder: "YOUR CREW...", borderFocus: "#ffea00", labelColor: "#00e5ff", borderBase: "#00e5ff" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label
                          className="block text-sm font-black uppercase tracking-widest mb-2"
                          style={{ color: field.labelColor }}
                        >
                          {field.label}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full px-6 py-4 bg-[#1c1c1e]/80 border-4 text-white placeholder-white/20 font-bold uppercase focus:outline-none transition-all duration-150"
                          style={{ borderColor: `${field.borderBase}60`, borderRadius: 0 }}
                          onFocus={(e) => {
                            (e.target as HTMLElement).style.borderColor = field.borderFocus;
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLElement).style.borderColor = `${field.borderBase}60`;
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-black text-[#b620e0] uppercase tracking-widest mb-2">
                        Your Manifesto
                      </label>
                      <textarea
                        rows={3}
                        placeholder="LEAVE YOUR MARK..."
                        className="w-full px-6 py-4 bg-[#1c1c1e]/80 border-4 border-[#b620e0]/60 text-white placeholder-white/20 font-bold uppercase focus:border-[#ff2d55] focus:outline-none transition-all duration-150 resize-none"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-[#ff6d00] uppercase tracking-widest mb-2">
                        Style
                      </label>
                      <select
                        className="w-full px-6 py-4 bg-[#1c1c1e] border-4 border-[#ff6d00]/60 text-white font-black uppercase focus:outline-none transition-all duration-150"
                        style={{ borderRadius: 0 }}
                      >
                        <option>WILDSTYLE</option>
                        <option>THROWUP</option>
                        <option>STENCIL</option>
                        <option>PIECE</option>
                        <option>TAG</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-4 border-[#ff2d55] bg-[#ff2d55] flex items-center justify-center" style={{ borderRadius: 0 }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm font-black uppercase text-white/60">No rules, no limits</label>
                    </div>
                    <button
                      className="w-full py-4 bg-[#ff2d55] text-white font-black uppercase tracking-widest border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#00e5ff] graf-hard-btn"
                      style={{ transform: "skewX(-2deg)" }}
                    >
                      SUBMIT TAG
                    </button>
                  </div>
                </div>
              )}

              {/* ---- TAGS TAB ---- */}
              {activeTab === "tags" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-white/30 mb-6">
                      STYLE TAGS
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "WILDSTYLE", color: "#ff2d55", rotate: "-1.5deg" },
                        { label: "THROWUP", color: "#00e5ff", rotate: "0.5deg" },
                        { label: "BOMBING", color: "#ffea00", rotate: "-1deg" },
                        { label: "STENCIL", color: "#b620e0", rotate: "1deg" },
                        { label: "PIECE", color: "#ff6d00", rotate: "-0.5deg" },
                        { label: "CREW", color: "#ff2d55", rotate: "1.5deg" },
                        { label: "STREET", color: "#00e5ff", rotate: "-1deg" },
                        { label: "BANNED", color: "#ffea00", rotate: "0.5deg" },
                      ].map((t) => (
                        <span
                          key={t.label}
                          className="px-4 py-1.5 text-sm font-black uppercase tracking-widest border-4 cursor-default transition-all duration-100 ease-linear hover:-translate-y-1"
                          style={{ borderColor: t.color, color: t.color, transform: `rotate(${t.rotate})` }}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-white/30 mb-6">
                      FILLED STATUS TAGS
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "FRESH", bg: "#ff2d55", text: "#fff", rotate: "-1deg" },
                        { label: "LEGENDARY", bg: "#ffea00", text: "#1c1c1e", rotate: "0.5deg" },
                        { label: "ELITE", bg: "#b620e0", text: "#fff", rotate: "-1.5deg" },
                        { label: "ACTIVE", bg: "#00e5ff", text: "#1c1c1e", rotate: "1deg" },
                        { label: "GONE", bg: "#333", text: "#fff", rotate: "-0.5deg" },
                      ].map((t) => (
                        <span
                          key={t.label}
                          className="px-4 py-2 text-sm font-black uppercase tracking-widest cursor-default transition-all duration-100 ease-linear hover:-translate-y-1"
                          style={{ backgroundColor: t.bg, color: t.text, transform: `rotate(${t.rotate}) skewX(-2deg)` }}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-white/30 mb-6">COUNT TAGS</p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {[
                        { label: "Walls", count: 62, color: "#ff2d55" },
                        { label: "Pieces", count: 400, color: "#00e5ff" },
                        { label: "Crews", count: 12, color: "#ffea00" },
                        { label: "Arrests", count: 0, color: "#b620e0" },
                      ].map((t) => (
                        <div key={t.label} className="flex items-center gap-2">
                          <span className="text-sm font-black uppercase text-white/60">{t.label}</span>
                          <span
                            className="px-2.5 py-0.5 border-4 text-xs font-black"
                            style={{ borderColor: t.color, color: t.color, textShadow: `0 0 6px ${t.color}` }}
                          >
                            {t.count}
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
      {/* 6. TYPOGRAPHY                                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#b620e0] block mb-3">
              &#47;&#47; TYPE SYSTEM
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              STREET <span className="text-[#b620e0] graf-spray-text">LETTERING</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-12">
            <p className="text-white/50 text-base font-bold uppercase tracking-wider max-w-lg leading-relaxed">
              Graffiti shouts. All caps, all weight, random transforms.
              Text that sits flat is text that begs to be ignored.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border-4 border-[#b620e0] shadow-[8px_8px_0px_#ffea00]">
              {typographyScale.map((item, i) => (
                <div
                  key={item.label}
                  className="px-6 md:px-10 py-6 border-b-4 last:border-b-0 border-white/10 cursor-default transition-all duration-100 ease-linear hover:bg-white/5"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
                    <div className="w-20 shrink-0">
                      <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: item.color }}>
                        {item.label}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`${item.size} ${item.weight} ${item.tracking} uppercase leading-none`}
                        style={{
                          color: item.color,
                          transform: `skewX(${item.skew}) rotate(${item.rotate})`,
                          textShadow: i < 3 ? `3px 3px 0px rgba(0,0,0,0.5)` : undefined,
                          display: "block",
                        }}
                      >
                        {item.sample}
                      </p>
                    </div>
                    <div className="w-48 shrink-0">
                      <p className="text-xs font-mono text-white/30 uppercase tracking-widest">
                        {item.weight}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.3} className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "ALWAYS UPPERCASE", desc: "Graffiti shouts. Every headline must be uppercase — capitals carry weight, demand attention.", color: "#ff2d55", shadow: "#00e5ff", rot: "-1deg" },
                { title: "SKEW + ROTATE", desc: "skewX(-2deg) to skewX(-5deg) plus slight rotation. Text that sits flat refuses to be noticed.", color: "#00e5ff", shadow: "#b620e0", rot: "0.5deg" },
                { title: "FONT-BLACK ONLY", desc: "Thin fonts have no place here. font-black on every headline. Weight is authority.", color: "#ffea00", shadow: "#ff6d00", rot: "-1.5deg" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="border-4 p-6"
                  style={{ borderColor: card.color, boxShadow: `5px 5px 0px ${card.shadow}`, transform: `rotate(${card.rot})` }}
                >
                  <h3
                    className="text-xl font-black uppercase mb-3"
                    style={{ color: card.color, transform: "skewX(-3deg)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm font-bold text-white/60 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. ANIMATION & INTERACTION RULES DEMO                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#b620e0] block mb-3">
              &#47;&#47; ANIMATION &amp; INTERACTION RULES
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              FOUR LAWS OF <span className="text-[#b620e0] graf-spray-text">MOTION</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/50 text-base font-bold uppercase tracking-wider max-w-lg leading-relaxed">
              Graffiti animations are raw and violent. No elegance. No polish.
              Every interaction must feel like it was sprayed on illegally at 3am.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Rule 1: Paint Drip */}
            <RevealBlock delay={0.08}>
              <div
                className="bg-[#0e0e10] border-4 border-[#ff2d55] p-8 shadow-[6px_6px_0px_#00e5ff] h-full"
                style={{ transform: "rotate(-1deg)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 bg-[#ff2d55] text-white text-xs font-black uppercase tracking-widest"
                    style={{ transform: "skewX(-3deg)" }}
                  >
                    Paint Drip
                  </span>
                </div>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-mono uppercase">
                  hover &#8594; drip decorations extend along Y axis.<br />
                  Simulates fresh paint flowing down the wall.
                </p>

                <div
                  className="relative border-4 border-[#ff2d55]/30 p-6 flex flex-col items-center gap-4 cursor-pointer"
                  onMouseEnter={() => setDripsActive(true)}
                  onMouseLeave={() => setDripsActive(false)}
                >
                  <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
                    {[
                      { color: "#ff2d55", height: 20 },
                      { color: "#00e5ff", height: 14 },
                      { color: "#ffea00", height: 24 },
                      { color: "#b620e0", height: 18 },
                      { color: "#ff6d00", height: 12 },
                    ].map((drip, i) => (
                      <SprayDrip
                        key={i}
                        color={drip.color}
                        height={drip.height}
                        width={dripsActive ? 4 : 3}
                        delay={i * 60}
                        active={dripsActive}
                      />
                    ))}
                  </div>
                  <div className="mt-8 text-sm font-black uppercase text-white/60">
                    {dripsActive ? (
                      <span className="text-[#ff2d55] graf-spray-text">FRESH PAINT FLOWING...</span>
                    ) : (
                      "Hover to drip"
                    )}
                  </div>
                  <div className="text-3xl font-black uppercase text-white" style={{ transform: "skewX(-4deg)" }}>
                    DRIP DRIP
                  </div>
                </div>
                <p className="text-xs text-white/30 text-center mt-3 font-mono uppercase">
                  height transition — duration-300 ease-out
                </p>
              </div>
            </RevealBlock>

            {/* Rule 2: Vandalism Snap */}
            <RevealBlock delay={0.12}>
              <div
                className="bg-[#0e0e10] border-4 border-[#00e5ff] p-8 shadow-[6px_6px_0px_#ffea00] h-full"
                style={{ transform: "rotate(1deg)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 bg-[#00e5ff] text-[#1c1c1e] text-xs font-black uppercase tracking-widest"
                    style={{ transform: "skewX(-3deg)" }}
                  >
                    Vandalism Snap
                  </span>
                </div>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-mono uppercase">
                  Aggressive rotation + skew on enter/leave.<br />
                  Unpermitted, rebellious street energy. No mercy.
                </p>

                <div className="flex items-center justify-center py-4">
                  <div
                    className="relative cursor-pointer p-6 border-4 w-full text-center"
                    style={{
                      borderColor: "#00e5ff",
                      backgroundColor: vandalSnap ? "#00e5ff" : "transparent",
                      transform: vandalSnap
                        ? "rotate(-8deg) skewX(-8deg) skewY(-2deg)"
                        : "rotate(-1deg) skewX(-2deg)",
                      boxShadow: vandalSnap ? "8px 8px 0px #ff2d55" : "4px 4px 0px #ff2d55",
                      transition: "all 0.1s linear",
                    }}
                    onMouseEnter={() => setVandalSnap(true)}
                    onMouseLeave={() => setVandalSnap(false)}
                  >
                    <SkullIcon
                      className="w-12 h-12 mx-auto mb-2"
                      style={{ color: vandalSnap ? "#1c1c1e" : "#00e5ff" } as React.CSSProperties}
                    />
                    <span
                      className="text-lg font-black uppercase"
                      style={{ color: vandalSnap ? "#1c1c1e" : "#00e5ff" }}
                    >
                      {vandalSnap ? "VANDALIZING!" : "HOVER TO SNAP"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/30 text-center mt-3 font-mono uppercase">
                  rotate(-8deg) skewX(-8deg) — 0.1s linear snap
                </p>
              </div>
            </RevealBlock>

            {/* Rule 3: Hard Contrast */}
            <RevealBlock delay={0.16}>
              <div
                className="bg-[#0e0e10] border-4 border-[#ffea00] p-8 shadow-[6px_6px_0px_#b620e0] h-full"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 bg-[#ffea00] text-[#1c1c1e] text-xs font-black uppercase tracking-widest"
                    style={{ transform: "skewX(-3deg)" }}
                  >
                    Hard Contrast
                  </span>
                </div>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-mono uppercase">
                  Active removes hard shadow + shifts element.<br />
                  Creates stamp-hitting-wall impact sensation.
                </p>
                <div className="flex items-center justify-center py-4">
                  <button
                    className="px-10 py-5 bg-[#ffea00] text-[#1c1c1e] font-black uppercase tracking-widest text-lg border-4 border-[#1c1c1e] transition-all duration-100 ease-linear select-none"
                    style={{
                      boxShadow: stampPressed ? "none" : "8px 8px 0px #b620e0",
                      transform: stampPressed
                        ? "translate(8px, 8px) rotate(0deg)"
                        : "rotate(-2deg) skewX(-2deg)",
                    }}
                    onMouseDown={() => setStampPressed(true)}
                    onMouseUp={() => setStampPressed(false)}
                    onMouseLeave={() => setStampPressed(false)}
                  >
                    {stampPressed ? "STAMPED!" : "PRESS ME"}
                  </button>
                </div>
                <p className="text-xs text-white/30 text-center mt-3 font-mono uppercase">
                  active: shadow=none + translate(8px,8px) — 0.1s linear
                </p>
              </div>
            </RevealBlock>

            {/* Rule 4: Zero Polish */}
            <RevealBlock delay={0.2}>
              <div
                className="bg-[#0e0e10] border-4 border-[#b620e0] p-8 shadow-[6px_6px_0px_#ff6d00] h-full"
                style={{ transform: "rotate(1.5deg)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 bg-[#b620e0] text-white text-xs font-black uppercase tracking-widest"
                    style={{ transform: "skewX(-3deg)" }}
                  >
                    Zero Polish
                  </span>
                </div>
                <p className="text-xs text-white/40 mb-6 leading-relaxed font-mono uppercase">
                  Short hard cuts only. duration-100/150 + ease-linear.<br />
                  No smooth easing, no elegance, no spring physics.
                </p>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/40 font-black uppercase">Smooth (WRONG)</span>
                      <button
                        className="text-xs px-3 py-1 border-2 border-white/20 text-white/40 font-black uppercase hover:border-white/40 transition-colors duration-100"
                        onClick={() => setZeroPollishState(zeroPollishState === "idle" ? "active" : "idle")}
                      >
                        ANIMATE
                      </button>
                    </div>
                    <div className="relative h-10 bg-[#1c1c1e] border-2 border-white/10 overflow-hidden">
                      <div
                        className="absolute top-1/2 left-2 w-7 h-7 bg-white/30"
                        style={{
                          transform: `translateY(-50%) translateX(${zeroPollishState === "active" ? "120px" : "0"})`,
                          transition: zeroPollishState === "active" ? "transform 0.8s cubic-bezier(0.34,1.56,0.64,1)" : "none",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#b620e0] font-black uppercase">Hard cut (CORRECT)</span>
                      <button
                        className="text-xs px-3 py-1 border-2 border-[#b620e0]/60 text-[#b620e0] font-black uppercase hover:bg-[#b620e0]/10 transition-colors duration-100"
                        onClick={() => setZeroPollishState(zeroPollishState === "idle" ? "active" : "idle")}
                      >
                        ANIMATE
                      </button>
                    </div>
                    <div className="relative h-10 bg-[#1c1c1e] border-2 border-[#b620e0]/30 overflow-hidden">
                      <div
                        className="absolute top-1/2 left-2 w-7 h-7 bg-[#b620e0]"
                        style={{
                          transform: `translateY(-50%) translateX(${zeroPollishState === "active" ? "120px" : "0"})`,
                          transition: zeroPollishState === "active" ? "transform 0.15s ease-linear" : "none",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/30 text-center mt-4 font-mono uppercase">
                  duration-100/150 ease-linear throughout
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. GALLERY WALL                                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.15) 30px, rgba(255,255,255,0.15) 31px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.15) 60px, rgba(255,255,255,0.15) 61px)",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#ff6d00] block mb-3">
              &#47;&#47; GALLERY WALL
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight"
              style={{ transform: "skewX(-3deg)" }}
            >
              THE <span className="text-[#ff6d00] graf-spray-text">MASTERPIECES</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-white/50 text-base font-bold uppercase tracking-wider max-w-lg leading-relaxed">
              Every wall is a statement. Typography that punches you in the face.
              Layouts that refuse to sit still.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            {/* Large featured piece */}
            <RevealBlock delay={0.1} className="md:col-span-7">
              <div
                className="relative bg-[#1c1c1e] border-4 border-[#ff2d55] p-10 shadow-[10px_10px_0px_#ffea00] overflow-hidden min-h-[320px] flex flex-col justify-end"
                style={{ transform: "rotate(-1deg)" }}
              >
                <div
                  className="absolute top-4 left-4 text-[120px] font-black uppercase leading-none text-[#ff2d55]/8 pointer-events-none select-none"
                  style={{ transform: "skewX(-6deg)" }}
                >
                  TAG
                </div>
                <div className="absolute top-0 right-8 flex gap-3">
                  <div className="w-3 h-16 bg-[#ff2d55]/70" style={{ borderRadius: "0 0 50% 50%" }} />
                  <div className="w-2 h-10 bg-[#00e5ff]/50 mt-3" style={{ borderRadius: "0 0 50% 50%" }} />
                  <div className="w-3 h-20 bg-[#ffea00]/50 mt-1" style={{ borderRadius: "0 0 50% 50%" }} />
                </div>

                <span
                  className="inline-block px-3 py-1 bg-[#ffea00] text-[#1c1c1e] text-xs font-black uppercase tracking-widest mb-4"
                  style={{ transform: "rotate(-2deg)" }}
                >
                  MASTERPIECE
                </span>
                <h3
                  className="text-5xl md:text-7xl font-black text-[#ff2d55] uppercase mb-2 graf-spray-text"
                  style={{ transform: "skewX(-4deg)" }}
                >
                  URBAN
                </h3>
                <h4
                  className="text-3xl md:text-5xl font-black text-white uppercase"
                  style={{ transform: "skewX(-2deg) rotate(1deg)" }}
                >
                  CANVAS
                </h4>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-4">
                  The city is the gallery. Every surface is a canvas.
                </p>
              </div>
            </RevealBlock>

            {/* Stacked smaller pieces */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <RevealBlock delay={0.15}>
                <div
                  className="bg-[#1c1c1e] border-4 border-[#00e5ff] p-7 shadow-[8px_8px_0px_#b620e0] relative overflow-hidden"
                  style={{ transform: "rotate(1.5deg)" }}
                >
                  <div className="absolute top-0 right-4 w-2 h-12 bg-[#00e5ff]/60" style={{ borderRadius: "0 0 50% 50%" }} />
                  <span className="block text-4xl font-black text-[#00e5ff] uppercase mb-1 graf-spray-text" style={{ transform: "skewX(-4deg)" }}>
                    THROWUP
                  </span>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest">Quick hit. Two colors. Maximum impact.</p>
                </div>
              </RevealBlock>

              <RevealBlock delay={0.2}>
                <div
                  className="bg-[#1c1c1e] border-4 border-[#b620e0] p-7 shadow-[8px_8px_0px_#ff2d55] relative overflow-hidden"
                  style={{ transform: "rotate(-2deg)" }}
                >
                  <div className="absolute top-0 right-6 flex gap-2">
                    <div className="w-2 h-9 bg-[#b620e0]/60" style={{ borderRadius: "0 0 50% 50%" }} />
                    <div className="w-3 h-14 bg-[#ff2d55]/50" style={{ borderRadius: "0 0 50% 50%" }} />
                  </div>
                  <span className="block text-4xl font-black text-[#b620e0] uppercase mb-1 graf-spray-text" style={{ transform: "skewX(-4deg)" }}>
                    STENCIL
                  </span>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest">Cut out. Spray. Repeat. Everywhere.</p>
                </div>
              </RevealBlock>

              <RevealBlock delay={0.24}>
                <div
                  className="bg-[#ffea00] border-4 border-[#1c1c1e] p-7 shadow-[8px_8px_0px_#ff6d00] overflow-hidden"
                  style={{ transform: "rotate(1deg)" }}
                >
                  <span className="block text-4xl font-black text-[#1c1c1e] uppercase mb-1" style={{ transform: "skewX(-4deg)" }}>
                    NO RULES
                  </span>
                  <p className="text-[#1c1c1e]/60 text-xs font-black uppercase tracking-widest">The only rule is there are no rules.</p>
                </div>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. MANIFESTO                                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-black tracking-[0.35em] uppercase text-[#ff2d55] block mb-3">
              &#47;&#47; THE MANIFESTO
            </span>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-14"
              style={{ transform: "skewX(-3deg)" }}
            >
              WORDS <span className="text-[#ff2d55] graf-spray-text">WRITTEN IN SPRAY</span>
            </h2>
          </RevealBlock>

          <div className="space-y-6 mb-20">
            {manifestoLines.map((line, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div
                  className={`font-black uppercase leading-tight ${line.size} graf-spray-text`}
                  style={{ color: line.color, transform: `rotate(${line.rotate}) skewX(-2deg)`, display: "block" }}
                >
                  {line.text}
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealBlock delay={0.1}>
              <div
                className="bg-[#1c1c1e] border-4 border-[#ff2d55] p-8 shadow-[8px_8px_0px_#00e5ff]"
                style={{ transform: "rotate(-1deg)" }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 border-4 border-[#ff2d55] bg-[#ff2d55] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-[#ff2d55] uppercase tracking-widest">TAG IT</h3>
                  <BoltIcon className="w-4 h-4 text-[#ff2d55] ml-auto" />
                </div>
                <ul className="space-y-3">
                  {[
                    "bg-[#1c1c1e] dark asphalt as base — always",
                    "High-sat colors: #ff2d55, #00e5ff, #ffea00, #b620e0",
                    "font-black uppercase on everything",
                    "Random rotate + skew transforms on all elements",
                    "border-4 thick borders throughout",
                    "shadow-[Npx_Npx_0px_color] hard offset shadows",
                    "Asymmetric layouts — grids are for museums",
                    "Drip decorations on cards and sections",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed font-bold">
                      <span className="mt-1.5 w-2 h-2 bg-[#ff2d55] shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="bg-[#1c1c1e] border-4 border-white/20 p-8 shadow-[8px_8px_0px_#333]"
                style={{ transform: "rotate(1deg)" }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 border-4 border-white/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-white/40 uppercase tracking-widest">STAY CLEAN</h3>
                  <SkullIcon className="w-4 h-4 text-white/20 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {[
                    "No pastel or soft colors (pink-200, blue-200)",
                    "No thin fonts (font-light, font-thin, font-normal)",
                    "No symmetric or grid-perfect layouts",
                    "No rounded-full on cards",
                    "No backdrop-blur or glass effects",
                    "No shadow-sm / shadow-md soft shadows",
                    "No warm, cozy color schemes",
                    "No smooth spring animations — hard cuts only",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/25 leading-relaxed font-bold line-through decoration-white/20">
                      <span className="mt-1.5 w-2 h-2 bg-white/20 shrink-0 no-underline" />
                      <span className="no-underline">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 10. FOOTER                                                       */}
      {/* ================================================================ */}
      <footer className="relative bg-[#0e0e10] border-t-4 border-[#ff2d55] overflow-hidden">
        {/* Footer drips */}
        <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
          {[
            { color: "#ff2d55", h: 32, w: 3 },
            { color: "#00e5ff", h: 20, w: 2 },
            { color: "#ffea00", h: 28, w: 3 },
            { color: "#b620e0", h: 16, w: 2 },
            { color: "#ff6d00", h: 24, w: 3 },
            { color: "#ff2d55", h: 18, w: 2 },
            { color: "#00e5ff", h: 30, w: 3 },
            { color: "#ffea00", h: 14, w: 2 },
          ].map((drip, i) => (
            <div
              key={i}
              style={{
                width: `${drip.w}px`,
                height: `${drip.h}px`,
                backgroundColor: drip.color,
                borderRadius: "0 0 50% 50%",
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div
                className="flex items-center gap-2 px-5 py-3 border-4 border-[#ff2d55] shadow-[4px_4px_0px_#00e5ff] self-start"
                style={{ transform: "rotate(-1.5deg) skewX(-2deg)" }}
              >
                <BoltIcon className="w-5 h-5 text-[#ff2d55]" />
                <span className="text-lg font-black text-white uppercase tracking-wider">
                  GRAFF<span className="text-[#ff2d55]">ITI</span>
                </span>
              </div>
              <p className="text-sm font-bold uppercase text-white/40 leading-relaxed tracking-wide">
                Street art. Spray paint soul. Urban expression without permission.
              </p>
              <div className="flex gap-2">
                {paletteSwatches.map((s, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 border-2 transition-all duration-100 ease-linear hover:-translate-y-1 cursor-pointer"
                    style={{
                      backgroundColor: s.hex,
                      borderColor: s.hex,
                      transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#ff2d55]">Style</span>
                <Link href="/styles/graffiti-street" className="text-white/40 font-bold uppercase hover:text-[#ff2d55] transition-colors duration-100">
                  Documentation
                </Link>
                <Link href="/styles/graffiti-street/showcase" className="text-white/40 font-bold uppercase hover:text-[#ff2d55] transition-colors duration-100">
                  Showcase
                </Link>
                <Link href="/styles/graffiti-street/cover" className="text-white/40 font-bold uppercase hover:text-[#ff2d55] transition-colors duration-100">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#00e5ff]">StyleKit</span>
                <Link href="/" className="text-white/40 font-bold uppercase hover:text-[#00e5ff] transition-colors duration-100">
                  Home
                </Link>
                <Link href="/styles" className="text-white/40 font-bold uppercase hover:text-[#00e5ff] transition-colors duration-100">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-[#ffea00]">Palette</span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase">
                    <span className="w-3 h-3 inline-block" style={{ backgroundColor: s.hex }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="h-1 bg-[#ff2d55]/40 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/30 font-black uppercase">
              <StarIcon className="w-4 h-4 text-[#ff2d55]" />
              <span>Made for StyleKit — No Permission Required</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 border-4 border-[#ff2d55] text-[#ff2d55] text-sm font-black uppercase shadow-[4px_4px_0px_#00e5ff] graf-hard-btn"
              style={{ transform: "rotate(-1deg) skewX(-2deg)" }}
            >
              <BoltIcon className="w-4 h-4" />
              BACK TO STYLEKIT
              <span>&#8594;</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
