"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Inline SVG Decorations
   ============================================================ */

function CrossOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="10" y="2" width="4" height="20" fill="currentColor" />
      <rect x="2" y="10" width="20" height="4" fill="currentColor" />
      <rect x="9" y="1" width="6" height="2" fill="currentColor" />
      <rect x="9" y="21" width="6" height="2" fill="currentColor" />
      <rect x="1" y="9" width="2" height="6" fill="currentColor" />
      <rect x="21" y="9" width="2" height="6" fill="currentColor" />
    </svg>
  );
}

function RoseOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="1" />
      <circle cx="40" cy="40" r="7" fill="currentColor" opacity="0.3" />
      <path
        d="M40 8 C46 20, 58 26, 40 40 C22 26, 34 20, 40 8Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M72 40 C60 46, 54 58, 40 40 C54 22, 60 34, 72 40Z"
        fill="currentColor"
        opacity="0.38"
      />
      <path
        d="M40 72 C34 60, 22 54, 40 40 C58 54, 46 60, 40 72Z"
        fill="currentColor"
        opacity="0.32"
      />
      <path
        d="M8 40 C20 34, 26 22, 40 40 C26 58, 20 46, 8 40Z"
        fill="currentColor"
        opacity="0.28"
      />
      <circle cx="40" cy="40" r="3.5" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function LaceDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4a1a4a]/40 to-transparent" />
      <CrossOrnament className="text-[#8b1a2a]/50 w-4 h-4" />
      <div className="w-2 h-2 rotate-45 border border-[#4a1a4a]/40" />
      <CrossOrnament className="text-[#8b1a2a]/50 w-4 h-4" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#4a1a4a]/40 to-transparent" />
    </div>
  );
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8b1a2a]/50" />
      <span className="text-[#4a1a4a]/60 text-xs">&#10070;</span>
      <div className="h-px w-6 bg-[#4a1a4a]/40" />
      <span className="text-[#8b1a2a]/80 text-sm">&#10022;</span>
      <div className="h-px w-6 bg-[#4a1a4a]/40" />
      <span className="text-[#4a1a4a]/60 text-xs">&#10070;</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8b1a2a]/50" />
    </div>
  );
}

function CornerBrackets({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#e5e5e5]/20" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-[#e5e5e5]/20" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-[#e5e5e5]/20" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[#e5e5e5]/20" />
      {children}
    </div>
  );
}

function GothicArchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Gothic arch SVG top decoration */}
      <svg
        viewBox="0 0 300 40"
        className="w-full text-[#4a1a4a]/30"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 40 L0 20 Q0 0 30 0 L270 0 Q300 0 300 20 L300 40 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <line x1="150" y1="0" x2="150" y2="8" stroke="currentColor" strokeWidth="0.8" />
        <line x1="145" y1="4" x2="155" y2="4" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <div className="border-l border-r border-b border-[#4a1a4a]/30 px-8 pb-8">
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   Static data
   ============================================================ */

const colorPalette = [
  {
    name: "Midnight Black",
    hex: "#0a0a0a",
    role: "Primary Background",
    textColor: "#e5e5e5",
  },
  {
    name: "Deep Velvet",
    hex: "#1a0a1a",
    role: "Card Gradients",
    textColor: "#e5e5e5",
  },
  {
    name: "Dark Plum",
    hex: "#4a1a4a",
    role: "Primary / Borders",
    textColor: "#e5e5e5",
  },
  {
    name: "Blood Rose",
    hex: "#8b1a2a",
    role: "Accents / Highlights",
    textColor: "#e5e5e5",
  },
  {
    name: "Antique Silver",
    hex: "#e5e5e5",
    role: "Text / Light Elements",
    textColor: "#0a0a0a",
  },
  {
    name: "Plum Mist",
    hex: "#6b2d5b",
    role: "Accent Variant",
    textColor: "#e5e5e5",
  },
];

const doRules = [
  "Use black and deep dark backgrounds as the primary canvas",
  "Pair deep plum #4a1a4a with blood rose #8b1a2a for accents",
  "Use decorative serif typefaces throughout every element",
  "Add lace, ribbon, and ornate border decorations",
  "Employ gothic symmetric patterns and cross motifs",
  "Maintain a refined, elegant atmosphere in all interactions",
];

const dontRules = [
  "Never use bright, vivid, or saturated colors",
  "Avoid cute cartoon-style elements or rounded blobs",
  "Do not apply modern minimalist or flat design aesthetics",
  "Avoid overly rounded shapes — prefer sharp, pointed forms",
];

const interactionRules = [
  {
    name: "Velvet Depth",
    desc: "Hover shadows bloom slowly in deep plum and blood rose, evoking silk-like richness. No bouncy or playful motion.",
  },
  {
    name: "Lace Elegance",
    desc: "Transitions run 500-700ms with ease-in-out, preserving the delicate restraint of ornamental craft.",
  },
  {
    name: "Corset Press",
    desc: "Active states use subtle scale(0.98) with inner shadow, mimicking the constrained feedback of a corset clasp.",
  },
  {
    name: "Silver Whisper",
    desc: "Borders and text reveal faint silver luminance on hover, adding layers of dark opulence.",
  },
];

const typographySamples = [
  {
    label: "Display — Heading I",
    size: "text-5xl md:text-6xl",
    weight: "font-normal",
    tracking: "tracking-wider",
    style: "",
    sample: "Dark Elegance",
    description: "Primary display heading. Wide tracking, normal weight, full serif. Used for hero titles and section names.",
  },
  {
    label: "Display — Heading II",
    size: "text-3xl md:text-4xl",
    weight: "font-normal",
    tracking: "tracking-widest",
    style: "italic",
    sample: "Victorian Grace",
    description: "Secondary display with italic style. Adds romantic tension when paired with upright siblings.",
  },
  {
    label: "Section Title",
    size: "text-xl md:text-2xl",
    weight: "font-normal",
    tracking: "tracking-[0.25em]",
    style: "",
    sample: "Ornamental Doctrine",
    description: "Section headers. Generous letter spacing creates architectural rhythm on the page.",
  },
  {
    label: "Body — Serif",
    size: "text-base",
    weight: "font-normal",
    tracking: "tracking-wider",
    style: "",
    sample: "A whisper of lace and shadow, wrapped in velvet moonlight and the scent of faded roses.",
    description: "Body copy in serif. Comfortable reading size with slight tracking for dark-themed legibility.",
  },
  {
    label: "Caption / Label",
    size: "text-xs",
    weight: "font-normal",
    tracking: "tracking-[0.3em]",
    style: "uppercase",
    sample: "Chapter I — The Covenant",
    description: "Labels and captions. All-caps with extreme tracking reads as gothic chapter markers.",
  },
  {
    label: "Quote — Italic",
    size: "text-lg",
    weight: "font-normal",
    tracking: "tracking-wide",
    style: "italic",
    sample: '"In shadows we find beauty; in darkness, truth."',
    description: "Victorian-poetry style pull-quotes. Italic serif with restrained tracking for introspective impact.",
  },
];

const poetryQuotes = [
  {
    text: "In the cathedral of night, each lace thread is a prayer cast in shadow.",
    attr: "Ars Obscura, Vol. I",
  },
  {
    text: "She wore darkness like a second skin — velvet deep, rose-thorned, eternally elegant.",
    attr: "Memoirs of a Gothic Lolita",
  },
  {
    text: "Where candlelight meets black brocade, the aesthetic soul finds its truest home.",
    attr: "Victorian Nocturnes",
  },
];

/* ============================================================
   Main Component
   ============================================================ */

export default function GothicLolitaShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % poetryQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-serif">
      <style>{`
        @keyframes gl-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gl-lace-float {
          0%, 100% { opacity: 0.15; transform: translateY(0); }
          50% { opacity: 0.28; transform: translateY(-10px); }
        }
        @keyframes gl-pulse-glow {
          0%, 100% { box-shadow: 0 0 6px rgba(139,26,42,0.2); }
          50% { box-shadow: 0 0 18px rgba(139,26,42,0.45); }
        }
        @keyframes gl-shimmer {
          0% { opacity: 0.05; }
          50% { opacity: 0.18; }
          100% { opacity: 0.05; }
        }
        .gl-hover-underline {
          position: relative;
        }
        .gl-hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #4a1a4a, #8b1a2a);
          transform-origin: bottom right;
          transition: transform 0.6s ease-in-out;
        }
        .gl-hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .gl-lace-pattern {
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 6px,
              rgba(74,26,74,0.07) 6px,
              rgba(74,26,74,0.07) 7px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 6px,
              rgba(74,26,74,0.07) 6px,
              rgba(74,26,74,0.07) 7px
            );
        }
        .gl-brocade {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(74,26,74,0.04) 0px,
            rgba(74,26,74,0.04) 2px,
            transparent 2px,
            transparent 10px
          );
        }
        .gl-quote-fade {
          transition: opacity 0.8s ease-in-out;
        }
      `}</style>

      {/* ===== SECTION 1: Fixed Navigation Bar ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/96 backdrop-blur-sm border-b border-[#4a1a4a]/30">
        {/* Lace top accent stripe */}
        <div
          className="h-px w-full"
          style={{
            background: "repeating-linear-gradient(90deg, #4a1a4a 0px, #4a1a4a 4px, transparent 4px, transparent 12px)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Brand */}
            <Link
              href="/styles/gothic-lolita/showcase"
              className="flex items-center gap-3 text-[#e5e5e5] tracking-[0.3em] uppercase text-sm hover:text-[#e5e5e5]/80 transition-colors duration-500"
            >
              <CrossOrnament className="text-[#8b1a2a] w-4 h-4" />
              <span className="hidden md:inline">Gothic</span>
              <span className="text-[#4a1a4a]/60 hidden md:inline">&middot;</span>
              <span>Lolita</span>
            </Link>

            {/* Center ornament */}
            <div className="hidden md:flex items-center gap-2 text-[#4a1a4a]/30 text-xs">
              <span>&#10070;</span>
              <div className="w-12 h-px bg-[#4a1a4a]/20" />
              <span>&#10022;</span>
              <div className="w-12 h-px bg-[#4a1a4a]/20" />
              <span>&#10070;</span>
            </div>

            {/* Navigation links */}
            <nav className="flex items-center gap-6 md:gap-8">
              <Link
                href="/styles/gothic-lolita"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 gl-hover-underline pb-1 hover:text-[#e5e5e5]/80 transition-colors duration-500"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/50 gl-hover-underline pb-1 hover:text-[#e5e5e5]/80 transition-colors duration-500"
              >
                StyleKit
              </Link>
            </nav>
          </div>
        </div>
        {/* Lace bottom accent stripe */}
        <div
          className="h-px w-full"
          style={{
            background: "repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(139,26,42,0.2) 4px, rgba(139,26,42,0.2) 8px)",
          }}
        />
      </header>

      {/* ===== SECTION 2: Hero ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a]" />

        {/* Brocade texture overlay */}
        <div className="absolute inset-0 gl-brocade opacity-60" />

        {/* Double border frame */}
        <div className="absolute inset-4 md:inset-8 border border-[#4a1a4a]/25 pointer-events-none" />
        <div className="absolute inset-8 md:inset-16 border border-[#8b1a2a]/12 pointer-events-none" />

        {/* Corner cross ornaments */}
        <CrossOrnament className="absolute top-12 left-12 text-[#4a1a4a]/25 w-5 h-5 hidden md:block" />
        <CrossOrnament className="absolute top-12 right-12 text-[#4a1a4a]/25 w-5 h-5 hidden md:block" />
        <CrossOrnament className="absolute bottom-12 left-12 text-[#4a1a4a]/25 w-5 h-5 hidden md:block" />
        <CrossOrnament className="absolute bottom-12 right-12 text-[#4a1a4a]/25 w-5 h-5 hidden md:block" />

        {/* Rotating rose — top right */}
        <div
          className="absolute top-20 right-8 md:right-20 pointer-events-none text-[#8b1a2a]/28"
          style={{ animation: "gl-rotate 35s linear infinite" }}
        >
          <RoseOrnament className="w-20 h-20 md:w-32 md:h-32" />
        </div>

        {/* Counter-rotating rose — bottom left */}
        <div
          className="absolute bottom-16 left-8 md:left-20 pointer-events-none text-[#4a1a4a]/20"
          style={{ animation: "gl-rotate 45s linear infinite reverse" }}
        >
          <RoseOrnament className="w-14 h-14 md:w-20 md:h-20" />
        </div>

        {/* Vertical lace threads */}
        <div
          className="absolute top-1/4 left-10 w-px h-40 bg-gradient-to-b from-transparent via-[#4a1a4a]/30 to-transparent hidden md:block"
          style={{ animation: "gl-lace-float 7s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 right-12 w-px h-28 bg-gradient-to-b from-transparent via-[#8b1a2a]/22 to-transparent hidden md:block"
          style={{ animation: "gl-lace-float 9s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-px h-20 bg-gradient-to-b from-transparent via-[#4a1a4a]/15 to-transparent hidden lg:block"
          style={{ animation: "gl-lace-float 11s ease-in-out infinite 1s" }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-20">
          {/* Top ornament line */}
          <div
            className="w-20 h-px mx-auto mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, #8b1a2a, transparent)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.1s",
            }}
          />

          {/* Unicode ornaments row */}
          <div
            className="flex justify-center items-center gap-4 mb-8 text-[#4a1a4a]/60"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.2s",
            }}
          >
            <span className="text-sm">&#10086;</span>
            <div className="w-8 h-px bg-[#4a1a4a]/30" />
            <CrossOrnament className="text-[#8b1a2a]/40 w-4 h-4" />
            <div className="w-8 h-px bg-[#4a1a4a]/30" />
            <span className="text-sm">&#10086;</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-wider mb-6">
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
                display: "inline-block",
              }}
            >
              Gothic
            </span>
            <br />
            <span
              className="italic text-[#e5e5e5]/55"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
                display: "inline-block",
              }}
            >
              Lolita.
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="text-sm md:text-base tracking-[0.18em] text-[#e5e5e5]/40 max-w-lg mx-auto mb-10 italic"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s",
            }}
          >
            Victorian lace, velvet shadows, and the quiet beauty of ornamental
            darkness woven into digital interfaces.
          </p>

          {/* Bottom ornament line */}
          <div
            className="w-20 h-px mx-auto mb-6"
            style={{
              background: "linear-gradient(90deg, transparent, #8b1a2a, transparent)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.8s",
            }}
          />

          {/* Bottom decorative cross */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 1s",
            }}
          >
            <CrossOrnament className="text-[#8b1a2a]/35 w-6 h-6 mx-auto" />
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Component Gallery ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-3">
            Component <span className="italic text-[#e5e5e5]/50">Gallery</span>
          </h2>
          <p className="text-center text-xs text-[#e5e5e5]/35 tracking-[0.2em] uppercase mb-14">
            Interactive elements dressed in dark Victorian splendor
          </p>
        </RevealBlock>

        {/* Tab Switcher */}
        <RevealBlock delay={0.1} className="mb-10">
          <div className="flex justify-center border border-[#4a1a4a]/40">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 px-6 py-4 text-xs tracking-[0.28em] uppercase
                  transition-all duration-500 ease-in-out
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-b from-[#4a1a4a]/40 to-[#1a0a1a] text-[#e5e5e5] border-b-2 border-[#8b1a2a]"
                      : "bg-[#0a0a0a] text-[#e5e5e5]/40 hover:text-[#e5e5e5]/70 hover:bg-[#1a0a1a]/50"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Demo panel */}
        <RevealBlock delay={0.2}>
          <CornerBrackets className="p-8 md:p-14 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#4a1a4a]/30 min-h-[300px]">

            {/* Button demo */}
            {activeTab === "button" && (
              <div className="flex flex-col items-center gap-8">
                <p className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/28 text-center mb-2">
                  Velvet Depth Interaction &mdash; hover to reveal shadow bloom
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {/* Primary */}
                  <button
                    className="
                      px-8 py-4 bg-[#0a0a0a]
                      border border-[#4a1a4a] text-[#e5e5e5] tracking-[0.2em]
                      shadow-[inset_0_0_10px_rgba(74,26,74,0.3)]
                      hover:bg-[#1a0a1a] hover:border-[#8b1a2a] hover:text-white
                      hover:shadow-[0_8px_24px_rgba(139,26,42,0.35),inset_0_0_12px_rgba(139,26,42,0.2)]
                      active:scale-[0.98] active:shadow-[inset_0_0_24px_rgba(0,0,0,0.8)]
                      transition-all duration-500 ease-in-out
                    "
                  >
                    Unlock Secret
                  </button>
                  {/* Secondary */}
                  <button
                    className="
                      px-8 py-4
                      bg-gradient-to-b from-[#4a1a4a]/30 to-[#0a0a0a]
                      border border-[#8b1a2a]/50 text-[#e5e5e5]/80 tracking-[0.2em]
                      hover:border-[#8b1a2a] hover:text-[#e5e5e5]
                      hover:shadow-[0_6px_20px_rgba(74,26,74,0.4)]
                      active:scale-[0.98]
                      transition-all duration-500 ease-in-out
                    "
                  >
                    Dark Whisper
                  </button>
                  {/* Ghost */}
                  <button
                    className="
                      px-8 py-4 bg-transparent
                      border border-[#e5e5e5]/18 text-[#e5e5e5]/45 tracking-[0.2em]
                      hover:border-[#4a1a4a] hover:text-[#e5e5e5]/80
                      hover:shadow-[0_0_16px_rgba(74,26,74,0.2)]
                      active:scale-[0.98]
                      transition-all duration-[600ms] ease-in-out
                    "
                  >
                    Shadow Veil
                  </button>
                </div>

                <OrnamentalDivider />

                {/* Icon button row */}
                <div className="flex items-center gap-4">
                  {[
                    { label: "Cross", icon: <CrossOrnament className="w-3 h-3" /> },
                    { label: "Rose", icon: <RoseOrnament className="w-5 h-5" /> },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="
                        w-12 h-12 flex items-center justify-center
                        bg-[#0a0a0a] border border-[#4a1a4a]/50
                        text-[#8b1a2a]/60
                        hover:border-[#8b1a2a]/80 hover:text-[#8b1a2a]
                        hover:shadow-[0_4px_14px_rgba(139,26,42,0.25)]
                        active:scale-[0.97]
                        transition-all duration-500 ease-in-out
                      "
                      title={item.label}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card demo */}
            {activeTab === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Midnight Rose",
                    desc: "A whisper of lace and shadow, wrapped in velvet moonlight.",
                    tag: "I",
                  },
                  {
                    title: "Crimson Veil",
                    desc: "Blood-red ribbons cascade through Victorian corridors of dark elegance.",
                    tag: "II",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="
                      group relative p-8
                      bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a]
                      border border-[#4a1a4a]/50
                      shadow-[0_4px_16px_rgba(74,26,74,0.35)]
                      hover:border-[#8b1a2a]/70
                      hover:shadow-[0_10px_30px_rgba(139,26,42,0.25)]
                      transition-all duration-700 ease-in-out
                      overflow-hidden cursor-pointer
                    "
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
                    <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
                    <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-[#e5e5e5]/20 transition-colors duration-500 group-hover:border-[#e5e5e5]/60" />

                    {/* Cross ornament header */}
                    <div className="mb-4 flex justify-center opacity-35 group-hover:opacity-100 transition-opacity duration-500">
                      <CrossOrnament className="text-[#8b1a2a] w-4 h-4" />
                    </div>

                    <span className="block text-xs tracking-[0.32em] text-[#4a1a4a] mb-2 text-center uppercase">
                      Chapter {card.tag}
                    </span>
                    <h3
                      className="text-xl text-center tracking-widest mb-3 transition-all duration-500"
                      style={{
                        textShadow:
                          hoveredCard === i
                            ? "0 0 10px rgba(229,229,229,0.28)"
                            : "none",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[#e5e5e5]/48 text-center text-sm group-hover:text-[#e5e5e5]/78 transition-colors duration-500 italic leading-relaxed">
                      {card.desc}
                    </p>

                    {/* Bottom hover reveal */}
                    <div className="mt-6 flex justify-center">
                      <div
                        className="h-px bg-gradient-to-r from-transparent via-[#8b1a2a]/40 to-transparent transition-all duration-700"
                        style={{ width: hoveredCard === i ? "80%" : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input demo */}
            {activeTab === "input" && (
              <div className="max-w-md mx-auto space-y-8">
                <div>
                  <label className="block text-xs tracking-[0.28em] uppercase text-[#4a1a4a] mb-3">
                    Dark Inscription
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your secret..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#4a1a4a]/50
                      text-[#e5e5e5] placeholder-[#4a1a4a]/55
                      font-serif
                      focus:border-[#8b1a2a]
                      focus:shadow-[0_0_14px_rgba(139,26,42,0.4)]
                      focus:outline-none
                      transition-all duration-500 ease-in-out
                    "
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.28em] uppercase text-[#4a1a4a] mb-3">
                    Velvet Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write upon the parchment..."
                    className="
                      w-full px-6 py-4
                      bg-[#0a0a0a]/80
                      border border-[#4a1a4a]/50
                      text-[#e5e5e5] placeholder-[#4a1a4a]/55
                      font-serif
                      focus:border-[#8b1a2a]
                      focus:shadow-[0_0_14px_rgba(139,26,42,0.4)]
                      focus:outline-none
                      transition-all duration-500 ease-in-out
                      resize-none
                    "
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 border border-[#4a1a4a]/50 flex items-center justify-center cursor-pointer hover:border-[#8b1a2a] transition-colors duration-500">
                    <div className="w-2.5 h-2.5 bg-[#8b1a2a]" />
                  </div>
                  <span className="text-sm text-[#e5e5e5]/45 tracking-wider italic">
                    Seal this covenant in shadow
                  </span>
                </div>
              </div>
            )}
          </CornerBrackets>
        </RevealBlock>
      </section>

      {/* ===== SECTION 4: Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-3">
            Colour <span className="italic text-[#e5e5e5]/50">Palette</span>
          </h2>
          <p className="text-center text-xs text-[#e5e5e5]/35 tracking-[0.2em] uppercase mb-16">
            Shades drawn from moonlit cathedrals, velvet curtains, and dried roses
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={0.08 + i * 0.06}>
                <div className="group cursor-pointer">
                  <div
                    className="
                      w-full aspect-[4/3] mb-4
                      border border-[#4a1a4a]/30
                      group-hover:border-[#8b1a2a]/65
                      group-hover:shadow-[0_8px_24px_rgba(139,26,42,0.22)]
                      transition-all duration-500 ease-in-out
                      flex items-end p-4
                      relative overflow-hidden
                    "
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Shimmer overlay on hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#8b1a2a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <span
                      className="relative text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <h4 className="text-sm tracking-wider mb-1 group-hover:text-[#e5e5e5] transition-colors duration-500">
                    {color.name}
                  </h4>
                  <p className="text-xs text-[#e5e5e5]/38 tracking-wider">
                    {color.role}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>

        {/* Color combination guide */}
        <RevealBlock delay={0.3} className="mt-16">
          <GothicArchFrame>
            <div className="pt-6">
              <h3 className="text-center text-sm tracking-[0.25em] uppercase text-[#e5e5e5]/40 mb-8">
                Colour Combinations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    bg: "#0a0a0a",
                    border: "#4a1a4a",
                    text: "#e5e5e5",
                    label: "Midnight Plum",
                    desc: "Primary pairing",
                  },
                  {
                    bg: "#1a0a1a",
                    border: "#8b1a2a",
                    text: "#e5e5e5",
                    label: "Velvet Rose",
                    desc: "Card surfaces",
                  },
                  {
                    bg: "#4a1a4a",
                    border: "#e5e5e5",
                    text: "#e5e5e5",
                    label: "Plum Silver",
                    desc: "Accent states",
                  },
                ].map((combo, i) => (
                  <div
                    key={i}
                    className="group p-6 border transition-all duration-500"
                    style={{
                      backgroundColor: combo.bg,
                      borderColor: combo.border + "60",
                      color: combo.text,
                    }}
                  >
                    <div className="text-xs tracking-[0.25em] uppercase opacity-50 mb-2">
                      {combo.desc}
                    </div>
                    <div className="text-base tracking-wider font-serif">
                      {combo.label}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <div
                        className="w-4 h-4 border border-[#e5e5e5]/20"
                        style={{ backgroundColor: combo.bg }}
                      />
                      <div
                        className="w-4 h-4"
                        style={{ backgroundColor: combo.border }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GothicArchFrame>
        </RevealBlock>
      </section>

      {/* ===== SECTION 5: Design Rules ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-3">
            Design <span className="italic text-[#e5e5e5]/50">Doctrine</span>
          </h2>
          <p className="text-center text-xs text-[#e5e5e5]/35 tracking-[0.2em] uppercase mb-16">
            The sacred commandments of dark Victorian craft
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Do list */}
          <RevealBlock delay={0.1}>
            <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#4a1a4a]/30 h-full">
              <div className="flex items-center gap-3 mb-8">
                <CrossOrnament className="text-[#4a1a4a] w-4 h-4" />
                <h3 className="text-sm tracking-[0.3em] uppercase text-[#4a1a4a]">
                  Embrace
                </h3>
              </div>
              <ul className="space-y-5">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 rotate-45 bg-[#4a1a4a] shrink-0" />
                    <span className="text-sm text-[#e5e5e5]/68 leading-relaxed tracking-wider">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </CornerBrackets>
          </RevealBlock>

          {/* Don't list */}
          <RevealBlock delay={0.2}>
            <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#8b1a2a]/28 h-full">
              <div className="flex items-center gap-3 mb-8">
                <CrossOrnament className="text-[#8b1a2a] w-4 h-4" />
                <h3 className="text-sm tracking-[0.3em] uppercase text-[#8b1a2a]">
                  Forbid
                </h3>
              </div>
              <ul className="space-y-5">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-2 h-2 rotate-45 bg-[#8b1a2a] shrink-0" />
                    <span className="text-sm text-[#e5e5e5]/68 leading-relaxed tracking-wider">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </CornerBrackets>
          </RevealBlock>
        </div>

        {/* Interaction rites panel */}
        <RevealBlock delay={0.3} className="mt-12">
          <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a] border border-[#4a1a4a]/20">
            <div className="flex items-center gap-3 mb-8">
              <CrossOrnament className="text-[#6b2d5b] w-4 h-4" />
              <h3 className="text-sm tracking-[0.3em] uppercase text-[#6b2d5b]">
                Interaction Rites
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interactionRules.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rotate-45 border border-[#6b2d5b]/60 shrink-0" />
                  <div>
                    <span className="text-sm text-[#e5e5e5]/82 tracking-wider font-bold">
                      {item.name}:
                    </span>{" "}
                    <span className="text-sm text-[#e5e5e5]/48 tracking-wider leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CornerBrackets>
        </RevealBlock>
      </section>

      {/* ===== SECTION 6: Typography ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-3">
            Typography <span className="italic text-[#e5e5e5]/50">System</span>
          </h2>
          <p className="text-center text-xs text-[#e5e5e5]/35 tracking-[0.2em] uppercase mb-16">
            Decorative serif letterforms that honour Victorian tradition
          </p>
        </RevealBlock>

        <div className="space-y-6">
          {typographySamples.map((sample, i) => (
            <RevealBlock key={i} delay={0.08 * i}>
              <div className="group border border-[#4a1a4a]/25 hover:border-[#8b1a2a]/45 transition-all duration-700 bg-gradient-to-r from-[#1a0a1a]/40 to-transparent overflow-hidden">
                {/* Label bar */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-[#4a1a4a]/20">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#4a1a4a]/80">
                    {sample.label}
                  </span>
                  <span className="text-[10px] text-[#e5e5e5]/25 tracking-wider">
                    {sample.tracking} / {sample.size}
                  </span>
                </div>

                {/* Sample text display */}
                <div className="px-8 py-8 md:py-10">
                  <div
                    className={`
                      font-serif text-[#e5e5e5]
                      ${sample.size} ${sample.weight} ${sample.tracking}
                      ${sample.style}
                      group-hover:text-[#e5e5e5]
                      transition-all duration-500
                    `}
                    style={{
                      lineHeight: i === 0 || i === 1 ? "1.1" : "1.5",
                    }}
                  >
                    {sample.sample}
                  </div>
                </div>

                {/* Description */}
                <div className="px-6 pb-5">
                  <p className="text-xs text-[#e5e5e5]/35 tracking-wider leading-relaxed italic">
                    {sample.description}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Gothic alphabet sample */}
        <RevealBlock delay={0.4} className="mt-14">
          <GothicArchFrame>
            <div className="pt-8 text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-[#4a1a4a]/60 mb-6">
                Decorative Character Set
              </p>
              <div className="text-4xl md:text-5xl font-serif tracking-[0.3em] text-[#e5e5e5]/30 leading-relaxed">
                A B C D E F G
              </div>
              <div className="text-4xl md:text-5xl font-serif tracking-[0.3em] text-[#e5e5e5]/20 leading-relaxed">
                H I J K L M N
              </div>
              <div className="text-4xl md:text-5xl font-serif tracking-[0.3em] text-[#e5e5e5]/15 leading-relaxed">
                O P Q R S T U
              </div>
              <OrnamentalDivider />
              <p className="text-lg font-serif italic text-[#e5e5e5]/40 tracking-wider mt-2">
                &ldquo;Every letter carries the weight of a cathedral stone.&rdquo;
              </p>
            </div>
          </GothicArchFrame>
        </RevealBlock>
      </section>

      {/* ===== SECTION 7: Victorian Poetry Quotes ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-3">
            Nocturnal <span className="italic text-[#e5e5e5]/50">Verses</span>
          </h2>
          <p className="text-center text-xs text-[#e5e5e5]/35 tracking-[0.2em] uppercase mb-16">
            Victorian-poetry style quotes that embody the aesthetic soul
          </p>
        </RevealBlock>

        {/* Rotating quote display */}
        <RevealBlock delay={0.15}>
          <div className="relative">
            {/* Large decorative opening quote mark */}
            <div className="absolute -top-6 -left-2 md:-left-6 text-7xl md:text-9xl font-serif text-[#4a1a4a]/15 leading-none select-none pointer-events-none">
              &ldquo;
            </div>

            <div className="border border-[#4a1a4a]/30 bg-gradient-to-b from-[#1a0a1a]/60 to-[#0a0a0a] p-12 md:p-16 relative overflow-hidden gl-lace-pattern">
              {/* Rotating rose behind text */}
              <div
                className="absolute top-4 right-4 text-[#8b1a2a]/10 pointer-events-none"
                style={{ animation: "gl-rotate 60s linear infinite" }}
              >
                <RoseOrnament className="w-24 h-24 md:w-32 md:h-32" />
              </div>

              {/* Quote text */}
              <div className="relative">
                {poetryQuotes.map((q, i) => (
                  <div
                    key={i}
                    className="gl-quote-fade"
                    style={{
                      opacity: activeQuote === i ? 1 : 0,
                      position: i === 0 ? "relative" : "absolute",
                      top: i === 0 ? "auto" : "0",
                      left: i === 0 ? "auto" : "0",
                      right: i === 0 ? "auto" : "0",
                      pointerEvents: activeQuote === i ? "auto" : "none",
                    }}
                  >
                    <p className="text-xl md:text-2xl font-serif italic text-[#e5e5e5]/70 leading-relaxed tracking-wider mb-8">
                      {q.text}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#8b1a2a]/40 to-transparent" />
                      <span className="text-xs tracking-[0.25em] uppercase text-[#8b1a2a]/60">
                        {q.attr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote navigation dots */}
              <div className="flex justify-center gap-3 mt-10">
                {poetryQuotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveQuote(i)}
                    className={`
                      w-2 h-2 rotate-45 transition-all duration-500
                      ${activeQuote === i
                        ? "bg-[#8b1a2a] scale-125"
                        : "border border-[#4a1a4a]/50 hover:border-[#8b1a2a]/70"
                      }
                    `}
                    aria-label={`Quote ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -right-2 md:-right-6 text-7xl md:text-9xl font-serif text-[#4a1a4a]/15 leading-none select-none pointer-events-none rotate-180">
              &ldquo;
            </div>
          </div>
        </RevealBlock>

        {/* Static quote cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              symbol: "&#10022;",
              title: "Darkness",
              quote: "In the darkest hour, lace becomes armour and velvet becomes skin.",
            },
            {
              symbol: "&#10086;",
              title: "Elegance",
              quote: "Elegance is not brightness — it is the precise shade of shadow that flatters the soul.",
            },
            {
              symbol: "&#10070;",
              title: "Gothic",
              quote: "Gothic is not fear. It is the beauty found at the edge of night where architecture meets eternity.",
            },
          ].map((card, i) => (
            <RevealBlock key={i} delay={0.1 + i * 0.1}>
              <div className="group p-8 border border-[#4a1a4a]/25 bg-gradient-to-b from-[#1a0a1a]/50 to-transparent hover:border-[#8b1a2a]/45 hover:shadow-[0_8px_24px_rgba(74,26,74,0.2)] transition-all duration-700">
                <div
                  className="text-2xl text-[#4a1a4a]/40 group-hover:text-[#8b1a2a]/60 transition-colors duration-500 mb-4 text-center"
                  dangerouslySetInnerHTML={{ __html: card.symbol }}
                />
                <h4 className="text-sm tracking-[0.28em] uppercase text-[#e5e5e5]/50 text-center mb-4">
                  {card.title}
                </h4>
                <p className="text-xs text-[#e5e5e5]/38 italic leading-relaxed tracking-wider text-center group-hover:text-[#e5e5e5]/55 transition-colors duration-500">
                  {card.quote}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== SECTION 8: Philosophy / About ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <LaceDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-3">
            The <span className="italic text-[#e5e5e5]/50">Philosophy</span>
          </h2>
          <p className="text-center text-xs text-[#e5e5e5]/35 tracking-[0.2em] uppercase mb-16">
            Understanding the soul of Gothic Lolita design
          </p>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: Core principles */}
            <div>
              <h3 className="text-lg tracking-[0.25em] uppercase text-[#8b1a2a]/80 mb-6 flex items-center gap-3">
                <CrossOrnament className="w-4 h-4 text-[#8b1a2a]/60" />
                Core Principles
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Dark Elegance",
                    body: "Black serves as the primary canvas — not of nihilism, but of depth. Against black, every ornament glows.",
                  },
                  {
                    title: "Refined Detail",
                    body: "Lace borders, ribbon bows, filigree cross motifs. Each detail is intentional, never decorative for its own sake.",
                  },
                  {
                    title: "Victorian Romance",
                    body: "Complex serif letterforms, symmetric patterns, and gothic arches reference an era of obsessive craft.",
                  },
                  {
                    title: "Romantic Darkness",
                    body: "Roses, candlesticks, gothic arches — elements that hold beauty and melancholy in equal measure.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="mt-1 shrink-0">
                      <div className="w-2 h-2 rotate-45 bg-[#4a1a4a]" />
                    </div>
                    <div>
                      <h4 className="text-sm tracking-[0.2em] uppercase text-[#e5e5e5]/75 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#e5e5e5]/45 leading-relaxed tracking-wider italic">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Origins and context */}
            <div>
              <h3 className="text-lg tracking-[0.25em] uppercase text-[#4a1a4a]/80 mb-6 flex items-center gap-3">
                <CrossOrnament className="w-4 h-4 text-[#4a1a4a]/60" />
                Origin
              </h3>
              <CornerBrackets className="p-8 bg-gradient-to-b from-[#1a0a1a]/50 to-[#0a0a0a] border border-[#4a1a4a]/25">
                <p className="text-sm text-[#e5e5e5]/55 leading-loose tracking-wider italic mb-6">
                  Gothic Lolita emerged from Japanese street fashion in the 1990s, merging
                  Victorian-era clothing silhouettes with Gothic subculture aesthetics. The result
                  is a visual language that is simultaneously delicate and dark — cupcake
                  skirts in black velvet, parasols trimmed with bone-white lace.
                </p>
                <p className="text-sm text-[#e5e5e5]/45 leading-loose tracking-wider italic">
                  Translated to interface design, Gothic Lolita becomes an exercise in
                  ornamental precision: every pixel of decoration must serve the whole,
                  and the whole must be unmistakably, defiantly dark and beautiful.
                </p>

                <OrnamentalDivider />

                <div className="flex flex-wrap gap-2 mt-2">
                  {["Victorian", "Gothic", "Lace", "Velvet", "Ornamental", "Serif", "Darkness", "Elegance"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-[#4a1a4a]/35 text-[#4a1a4a]/70 hover:border-[#8b1a2a]/50 hover:text-[#8b1a2a]/70 transition-colors duration-500 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CornerBrackets>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== SECTION 9: Footer ===== */}
      <footer className="border-t border-[#4a1a4a]/30">
        {/* Lace stripe top */}
        <div
          className="h-px w-full"
          style={{
            background: "repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(74,26,74,0.25) 6px, rgba(74,26,74,0.25) 8px)",
          }}
        />

        {/* Main footer body */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <LaceDivider />

          {/* Footer content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 mt-4">
            {/* Brand block */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CrossOrnament className="text-[#8b1a2a]/60 w-4 h-4" />
                <span className="text-sm tracking-[0.28em] uppercase text-[#e5e5e5]/50">
                  Gothic Lolita
                </span>
              </div>
              <p className="text-xs text-[#e5e5e5]/28 italic leading-relaxed tracking-wider">
                Dark elegance, Victorian grace. A design system for those who find beauty in shadow.
              </p>
            </div>

            {/* Ornamental center */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className="text-[#8b1a2a]/25"
                style={{ animation: "gl-rotate 40s linear infinite" }}
              >
                <RoseOrnament className="w-14 h-14" />
              </div>
              <OrnamentalDivider />
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#4a1a4a]/40 text-center">
                StyleKit Design System
              </p>
            </div>

            {/* Links block */}
            <div className="md:text-right">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#4a1a4a]/60 mb-4">
                Navigation
              </h4>
              <div className="flex flex-col gap-3">
                <Link
                  href="/styles/gothic-lolita"
                  className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/38 gl-hover-underline pb-0.5 hover:text-[#e5e5e5]/65 transition-colors duration-500"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles"
                  className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/38 gl-hover-underline pb-0.5 hover:text-[#e5e5e5]/65 transition-colors duration-500"
                >
                  All Styles
                </Link>
                <Link
                  href="/"
                  className="text-xs tracking-[0.2em] uppercase text-[#e5e5e5]/38 gl-hover-underline pb-0.5 hover:text-[#e5e5e5]/65 transition-colors duration-500"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 border-t border-[#4a1a4a]/20 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <CrossOrnament className="text-[#8b1a2a]/35 w-3 h-3" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#e5e5e5]/22">
                StyleKit &middot; Gothic Lolita Showcase
              </p>
            </div>

            {/* Ornamental row */}
            <div className="flex items-center gap-2 text-[#4a1a4a]/28 text-xs">
              <span>&#10070;</span>
              <span>&#10022;</span>
              <span>&#10070;</span>
            </div>

            <Link
              href="/styles/gothic-lolita"
              className="text-[10px] tracking-[0.2em] uppercase text-[#e5e5e5]/35 gl-hover-underline pb-0.5 hover:text-[#e5e5e5]/60 transition-colors duration-500"
            >
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom lace stripe */}
        <div
          className="h-px w-full"
          style={{
            background: "repeating-linear-gradient(90deg, #4a1a4a 0px, #4a1a4a 3px, transparent 3px, transparent 10px)",
          }}
        />
      </footer>
    </div>
  );
}
