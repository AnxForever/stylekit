"use client";

import { useState, useRef, useEffect } from "react";
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

const navLinks = ["Craft", "Palette", "Workshop", "Collection", "About"];

const palette = [
  {
    name: "Terracotta",
    hex: "#b5654a",
    bg: "bg-[#b5654a]",
    desc: "Sun-baked clay fired in an open kiln — the warmth at the heart of every Mediterranean vessel.",
  },
  {
    name: "Cream",
    hex: "#faf5ef",
    bg: "bg-[#faf5ef]",
    desc: "Whitewashed limestone walls dried under the Aegean sun — the breath between warm hues.",
    border: true,
  },
  {
    name: "Sand",
    hex: "#d4a373",
    bg: "bg-[#d4a373]",
    desc: "Fine coastal sand carried by the sirocco, layering gentle warmth across every surface.",
  },
  {
    name: "Earth",
    hex: "#7a6350",
    bg: "bg-[#7a6350]",
    desc: "Rich soil from ancient olive groves, grounding the palette with centuries of depth.",
  },
  {
    name: "Olive",
    hex: "#8b9d77",
    bg: "bg-[#8b9d77]",
    desc: "Silver-green leaves of the olive tree catching morning light — life growing from earth.",
  },
];

const componentTabs = ["Buttons", "Cards", "Inputs"] as const;
type ComponentTab = (typeof componentTabs)[number];

const potteryStages = [
  {
    id: "raw",
    label: "Raw Clay",
    subtitle: "Input State",
    desc: "Unformed earth pulled from the ground. Full of potential, awaiting the potter's hands to give it shape and intention.",
    icon: "○",
    bgColor: "bg-[#d4a373]/20",
    borderColor: "border-[#d4a373]/40",
    accentColor: "text-[#d4a373]",
    tagBg: "bg-[#d4a373]/15",
    tagText: "text-[#7a6350]",
    detail: "placeholder state · no interaction yet",
  },
  {
    id: "shaped",
    label: "Shaped Vessel",
    subtitle: "Focused State",
    desc: "Clay centered on the wheel, walls rising with each careful revolution. The form begins to breathe.",
    icon: "◑",
    bgColor: "bg-[#b5654a]/10",
    borderColor: "border-[#b5654a]/50",
    accentColor: "text-[#b5654a]",
    tagBg: "bg-[#b5654a]/15",
    tagText: "text-[#b5654a]",
    detail: "focus ring · olive green outline active",
  },
  {
    id: "fired",
    label: "Fire-Baked",
    subtitle: "Active State",
    desc: "Set deep inside the kiln at peak heat. The clay transforms — hardening, the color deepening with every degree.",
    icon: "●",
    bgColor: "bg-[#7a6350]/10",
    borderColor: "border-[#7a6350]/60",
    accentColor: "text-[#7a6350]",
    tagBg: "bg-[#7a6350]/15",
    tagText: "text-[#faf5ef]",
    detail: "pressed · scale-down · clay press active",
  },
  {
    id: "glazed",
    label: "Glazed Pottery",
    subtitle: "Complete State",
    desc: "Lifted from the kiln: glazed, sealed, whole. A finished vessel ready to hold warmth — oil, wine, memory.",
    icon: "✦",
    bgColor: "bg-[#8b9d77]/10",
    borderColor: "border-[#8b9d77]/50",
    accentColor: "text-[#8b9d77]",
    tagBg: "bg-[#8b9d77]/20",
    tagText: "text-[#8b9d77]",
    detail: "success state · olive seal complete",
  },
];

const motifTiles = [
  {
    id: "olive-branch",
    label: "Olive Branch",
    desc: "Life and abundance — the evergreen symbol of Mediterranean craft.",
  },
  {
    id: "terracotta-sun",
    label: "Sun Disc",
    desc: "The drying sun above the kiln that transforms clay into enduring form.",
  },
  {
    id: "wave-arc",
    label: "Sea Arc",
    desc: "The curved shoreline where craftspeople gather the finest coastal clay.",
  },
  {
    id: "vessel-ring",
    label: "Vessel Ring",
    desc: "Concentric circles of the potter's wheel — motion frozen into geometry.",
  },
];

const doRules = [
  "Use warm earth tones exclusively — terracotta, cream, sand, earth, olive only.",
  "Minimum rounded-lg on every element — organic handcrafted forms, never sharp.",
  "Warm tinted shadows: rgba(181,101,74,*) for depth that feels sun-baked.",
  "Focus states use olive green #8b9d77 — grounded, natural, never cold blue.",
  "Active/press states use translate-y-[2px] clay press — downward, not bounce.",
  "Transitions at duration-300 ease-out — unhurried, handcrafted slowness.",
  "Cards lift with hover:-translate-y-1 — gentle rise, like picking up a vessel.",
];

const dontRules = [
  "Never use any cold color — no blue, purple, cyan, or grey-blue tones at all.",
  "Never use sharp corners — zero rounded-none or rounded-sm, no exceptions.",
  "Never use cold box shadows with default rgba(0,0,0,*) grey tones.",
  "Never use bounce or spring animations — clay moves with deliberate weight.",
  "Never use focus rings in the default blue — always override with olive green.",
  "Never mix high saturation neon accents into the warm palette.",
  "Never use monospace fonts — this palette speaks in warm, humanist strokes.",
];

const ceramicCollection = [
  {
    id: 1,
    title: "Amphora Series",
    tag: "Storage",
    desc: "Double-handled vessels for olive oil and wine — the original Mediterranean storage system.",
    accent: "bg-[#b5654a]",
    tagColor: "text-[#8b9d77]",
  },
  {
    id: 2,
    title: "Kalathos Bowls",
    tag: "Serving",
    desc: "Wide, open bowls shaped for communal meals around the courtyard table at dusk.",
    accent: "bg-[#d4a373]",
    tagColor: "text-[#8b9d77]",
  },
  {
    id: 3,
    title: "Lekythos Flask",
    tag: "Ritual",
    desc: "Slender oil vessels carried for sacred offerings — form shaped entirely by purpose.",
    accent: "bg-[#7a6350]",
    tagColor: "text-[#8b9d77]",
  },
  {
    id: 4,
    title: "Pithos Jars",
    tag: "Cellar",
    desc: "Large storage jars buried in earthen floors, keeping grain cool through summer heat.",
    accent: "bg-[#8b9d77]",
    tagColor: "text-[#faf5ef]",
  },
  {
    id: 5,
    title: "Pyxis Vessels",
    tag: "Personal",
    desc: "Small lidded boxes for pigments, kohl, and precious oils — intimate daily ritual.",
    accent: "bg-[#b5654a]",
    tagColor: "text-[#8b9d77]",
  },
  {
    id: 6,
    title: "Krater Mixing",
    tag: "Ceremony",
    desc: "Large open bowls for mixing wine and water at the symposium — the heart of gathering.",
    accent: "bg-[#d4a373]",
    tagColor: "text-[#8b9d77]",
  },
];

/* ------------------------------------------------------------------ */
/*  SVG Decorations                                                     */
/* ------------------------------------------------------------------ */

function OliveBlobTopRight() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute top-0 right-0 w-64 h-64 opacity-[0.07] pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M180,20 C200,60 200,100 170,130 C140,160 100,170 70,150 C40,130 20,90 30,50 C40,10 80,-10 120,5 C150,15 170,10 180,20 Z"
        fill="#8b9d77"
      />
    </svg>
  );
}

function TerraCottaBlobBottomLeft() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute bottom-0 left-0 w-72 h-72 opacity-[0.06] pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M20,180 C-10,140 -5,100 20,70 C45,40 90,30 130,50 C170,70 190,110 175,145 C160,180 120,200 80,195 C50,190 30,200 20,180 Z"
        fill="#b5654a"
      />
    </svg>
  );
}

function OliveBranchSVG() {
  return (
    <svg viewBox="0 0 120 200" className="w-full h-full" aria-hidden="true">
      {/* Main stem */}
      <path
        d="M60,190 C60,150 55,120 58,80 C61,40 60,20 60,10"
        stroke="#8b9d77"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left branches and leaves */}
      <path d="M58,150 C45,135 30,130 20,125" stroke="#8b9d77" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="16" cy="123" rx="10" ry="5" fill="#8b9d77" transform="rotate(-20,16,123)" opacity="0.8" />
      <path d="M58,120 C42,108 28,105 15,100" stroke="#8b9d77" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="99" rx="10" ry="5" fill="#8b9d77" transform="rotate(-25,11,99)" opacity="0.8" />
      <path d="M59,90 C46,78 36,72 24,68" stroke="#8b9d77" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="20" cy="67" rx="10" ry="5" fill="#8b9d77" transform="rotate(-30,20,67)" opacity="0.8" />
      {/* Right branches and leaves */}
      <path d="M60,140 C72,125 85,120 96,116" stroke="#8b9d77" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="115" rx="10" ry="5" fill="#8b9d77" transform="rotate(20,100,115)" opacity="0.8" />
      <path d="M60,110 C74,98 88,94 100,90" stroke="#8b9d77" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="104" cy="89" rx="10" ry="5" fill="#8b9d77" transform="rotate(25,104,89)" opacity="0.8" />
      <path d="M60,80 C72,68 84,63 95,59" stroke="#8b9d77" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="99" cy="58" rx="10" ry="5" fill="#8b9d77" transform="rotate(30,99,58)" opacity="0.8" />
      {/* Small berries */}
      <circle cx="20" cy="138" r="3.5" fill="#b5654a" opacity="0.7" />
      <circle cx="95" cy="127" r="3.5" fill="#b5654a" opacity="0.7" />
      <circle cx="24" cy="108" r="3" fill="#b5654a" opacity="0.65" />
      <circle cx="99" cy="100" r="3" fill="#b5654a" opacity="0.65" />
    </svg>
  );
}

function SunDiscSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      <circle cx="60" cy="60" r="28" fill="#b5654a" opacity="0.85" />
      <circle cx="60" cy="60" r="22" fill="#d4a373" opacity="0.6" />
      <circle cx="60" cy="60" r="14" fill="#faf5ef" opacity="0.9" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="60"
          y1="60"
          x2={60 + 48 * Math.cos((angle * Math.PI) / 180)}
          y2={60 + 48 * Math.sin((angle * Math.PI) / 180)}
          stroke="#b5654a"
          strokeWidth="2"
          opacity="0.5"
          strokeLinecap="round"
        />
      ))}
      <circle cx="60" cy="60" r="35" fill="none" stroke="#d4a373" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,4" />
    </svg>
  );
}

function SeaArcSVG() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M ${10 + i * 6},${90 - i * 8} Q 80,${30 - i * 8} ${150 - i * 6},${90 - i * 8}`}
          fill="none"
          stroke="#d4a373"
          strokeWidth="2"
          opacity={0.8 - i * 0.12}
          strokeLinecap="round"
        />
      ))}
      <path
        d="M 0,92 Q 80,52 160,92"
        fill="#d4a373"
        opacity="0.12"
      />
    </svg>
  );
}

function VesselRingSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
      {[48, 38, 28, 18, 10].map((r, i) => (
        <circle
          key={r}
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? "#b5654a" : "#8b9d77"}
          strokeWidth={i === 0 ? 2 : 1.5}
          opacity={0.7 - i * 0.08}
        />
      ))}
      <circle cx="60" cy="60" r="5" fill="#b5654a" opacity="0.8" />
      {/* Ellipses for 3D vessel rim effect */}
      <ellipse cx="60" cy="30" rx="20" ry="6" fill="none" stroke="#7a6350" strokeWidth="1.2" opacity="0.35" />
      <ellipse cx="60" cy="90" rx="24" ry="7" fill="none" stroke="#7a6350" strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function TerracottaShowcase() {
  const [activeTab, setActiveTab] = useState<ComponentTab>("Buttons");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaFocused, setTextareaFocused] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: taglineRef, inView: taglineInView } = useInView();

  return (
    <div className="min-h-screen bg-[#faf5ef] text-[#7a6350]">

      {/* ============================================================ */}
      {/* 1. NAVIGATION                                                 */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-[#faf5ef]/95 backdrop-blur-sm px-6 py-4 border-b border-[#d4a373]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand logo */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/styles/terracotta"
              className="text-sm text-[#8b9d77] hover:text-[#b5654a] transition-colors duration-300 font-medium flex items-center gap-1.5"
            >
              <span>&larr;</span>
              Back to Docs
            </Link>
            <div className="w-px h-4 bg-[#d4a373]/40" />
            <div className="w-8 h-8 rounded-lg bg-[#b5654a] flex items-center justify-center shadow-[0_2px_8px_rgba(181,101,74,0.3)]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#faf5ef]" aria-hidden="true">
                <path d="M12,2 C8,2 4,6 4,11 C4,16 7,19 10,20.5 L10,22 L14,22 L14,20.5 C17,19 20,16 20,11 C20,6 16,2 12,2 Z" />
              </svg>
            </div>
            <span className="font-semibold text-[#7a6350] tracking-wide">Terracotta</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-[#7a6350]/70 hover:text-[#b5654a] transition-colors duration-300 font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          {/* StyleKit link */}
          <Link
            href="/"
            className="text-sm font-medium text-[#8b9d77] hover:text-[#7a6350] transition-colors duration-300 flex items-center gap-1"
          >
            StyleKit
            <span className="text-[#b5654a]">→</span>
          </Link>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO                                                       */}
      {/* ============================================================ */}
      <section id="craft" className="relative py-32 overflow-hidden bg-[#faf5ef] scroll-mt-16">
        <OliveBlobTopRight />
        <TerraCottaBlobBottomLeft />

        {/* Extra decorative arc */}
        <svg
          viewBox="0 0 400 40"
          className="absolute top-1/3 left-0 w-full opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <path d="M0,20 Q200,0 400,20" fill="none" stroke="#d4a373" strokeWidth="3" />
        </svg>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Label */}
          <div
            ref={taglineRef}
            style={{
              opacity: taglineInView ? 1 : 0,
              transform: taglineInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out 0s, transform 0.6s ease-out 0s",
            }}
          >
            <span className="inline-block text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium mb-6">
              mediterranean craft
            </span>
          </div>

          {/* Main title */}
          <div
            ref={heroRef}
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1 className="text-6xl md:text-8xl font-semibold text-[#7a6350] leading-none tracking-tight">
              <span className="block text-[#b5654a]">Terra</span>
              <span className="block">cotta</span>
            </h1>
          </div>

          {/* Divider */}
          <RevealBlock delay={0.25} className="flex justify-center my-8">
            <div className="h-px w-20 bg-[#b5654a] opacity-70" />
          </RevealBlock>

          {/* Description */}
          <RevealBlock delay={0.35}>
            <p className="text-[#7a6350]/70 font-medium text-lg leading-relaxed max-w-xl mx-auto">
              Warm earth tones, handcrafted roundedness, and sun-baked glow. A design language
              rooted in Mediterranean clay — where every element feels shaped by human hands.
            </p>
          </RevealBlock>

          {/* CTA */}
          <RevealBlock delay={0.45} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-3.5 rounded-lg bg-[#b5654a] text-[#faf5ef] font-semibold text-sm tracking-wide shadow-[0_4px_12px_rgba(181,101,74,0.2)] hover:shadow-[0_8px_20px_rgba(181,101,74,0.3)] hover:-translate-y-0.5 active:translate-y-[2px] transition-all duration-300 ease-out"
            >
              Explore the Craft
            </button>
            <button
              className="px-8 py-3.5 rounded-lg border border-[#7a6350]/30 text-[#7a6350] font-semibold text-sm tracking-wide hover:bg-[#7a6350]/5 hover:-translate-y-0.5 active:translate-y-[2px] transition-all duration-300 ease-out"
            >
              View Palette
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. COMPONENTS DEMO                                            */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#faf5ef]">
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Components</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">Clay-formed Elements</h2>
            <p className="text-[#7a6350]/60 text-sm mb-10 max-w-md">
              Each component shaped with warm earth principles — tactile, grounded, never cold.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex gap-1 p-1 rounded-xl bg-[#d4a373]/15 w-fit mb-10 border border-[#d4a373]/20">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                    activeTab === tab
                      ? "bg-[#b5654a] text-[#faf5ef] shadow-[0_2px_8px_rgba(181,101,74,0.25)]"
                      : "text-[#7a6350]/70 hover:text-[#b5654a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons panel */}
          {activeTab === "Buttons" && (
            <RevealBlock>
              <div className="rounded-2xl border border-[#d4a373]/25 bg-[#faf5ef] p-8 shadow-[0_6px_24px_rgba(181,101,74,0.06)]">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Primary */}
                  <button className="px-6 py-3 rounded-lg bg-[#b5654a] text-[#faf5ef] font-semibold text-sm shadow-[0_4px_12px_rgba(181,101,74,0.25)] hover:shadow-[0_6px_18px_rgba(181,101,74,0.35)] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-[0_2px_8px_rgba(181,101,74,0.2)] transition-all duration-300 ease-out">
                    Primary Clay
                  </button>
                  {/* Secondary outline */}
                  <button className="px-6 py-3 rounded-lg border-2 border-[#7a6350]/40 text-[#7a6350] font-semibold text-sm hover:border-[#7a6350] hover:bg-[#7a6350]/5 hover:-translate-y-0.5 active:translate-y-[2px] transition-all duration-300 ease-out">
                    Earth Outline
                  </button>
                  {/* Olive accent */}
                  <button className="px-6 py-3 rounded-lg bg-[#8b9d77] text-[#faf5ef] font-semibold text-sm shadow-[0_4px_12px_rgba(139,157,119,0.25)] hover:shadow-[0_6px_18px_rgba(139,157,119,0.35)] hover:-translate-y-0.5 active:translate-y-[2px] transition-all duration-300 ease-out">
                    Olive Accent
                  </button>
                  {/* Sand ghost */}
                  <button className="px-6 py-3 rounded-lg bg-[#d4a373]/20 text-[#7a6350] font-semibold text-sm hover:bg-[#d4a373]/35 hover:-translate-y-0.5 active:translate-y-[2px] transition-all duration-300 ease-out border border-[#d4a373]/30">
                    Sand Ghost
                  </button>
                  {/* Small pill */}
                  <button className="px-4 py-1.5 rounded-full bg-[#b5654a]/10 text-[#b5654a] font-medium text-xs border border-[#b5654a]/25 hover:bg-[#b5654a]/20 transition-all duration-300 ease-out">
                    Craft Tag
                  </button>
                  {/* Icon button */}
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#faf5ef] border border-[#d4a373]/40 text-[#7a6350] hover:bg-[#b5654a] hover:text-[#faf5ef] hover:border-[#b5654a] hover:-translate-y-0.5 active:translate-y-[2px] transition-all duration-300 ease-out shadow-[0_2px_6px_rgba(181,101,74,0.1)]">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M8,1 C4.7,1 2,3.7 2,7 C2,10.3 4.7,13 8,13 C11.3,13 14,10.3 14,7 C14,3.7 11.3,1 8,1 Z M8,11 C5.8,11 4,9.2 4,7 C4,4.8 5.8,3 8,3 C10.2,3 12,4.8 12,7 C12,9.2 10.2,11 8,11 Z" />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-[#d4a373]/15">
                  <p className="text-xs text-[#7a6350]/50 font-medium tracking-wide">
                    All buttons: active:translate-y-[2px] clay press · warm rgba shadows · minimum rounded-lg
                  </p>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards panel */}
          {activeTab === "Cards" && (
            <RevealBlock>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: "Kiln-fired Vessels",
                    desc: "Handthrown bowls and plates from our Oaxacan workshop, fired at 1280°C in a reduction atmosphere.",
                    tag: "Pottery",
                    i: 0,
                  },
                  {
                    title: "Olive Grove Reserve",
                    desc: "Cold-pressed extra virgin oil from century-old trees. Bottled in terracotta-sealed ceramic flasks.",
                    tag: "Pantry",
                    i: 1,
                  },
                  {
                    title: "Mediterranean Mosaic",
                    desc: "Hand-cut clay tiles in traditional earth tones, each piece shaped and glazed by artisans in Marrakech.",
                    tag: "Tilework",
                    i: 2,
                  },
                ].map(({ title, desc, tag, i }) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="rounded-xl border border-[#d4a373]/30 bg-[#faf5ef] shadow-[0_6px_16px_rgba(122,99,80,0.06)] hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden cursor-pointer group"
                  >
                    {/* Expanding olive line */}
                    <div
                      className="h-0.5 bg-[#8b9d77] transition-all duration-300 ease-out"
                      style={{ width: hoveredCard === i ? "100%" : "0%" }}
                    />
                    <div className="p-6">
                      <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-medium text-[#8b9d77] mb-3">
                        {tag}
                      </span>
                      <h3
                        className="font-semibold text-lg mb-2 transition-colors duration-300"
                        style={{ color: hoveredCard === i ? "#b5654a" : "#7a6350" }}
                      >
                        {title}
                      </h3>
                      <p className="text-[#7a6350]/60 text-sm leading-relaxed">{desc}</p>
                      <div className="mt-5 flex items-center gap-1.5 text-[#b5654a] text-xs font-semibold">
                        <span>Explore</span>
                        <span
                          className="transition-transform duration-300 ease-out"
                          style={{ transform: hoveredCard === i ? "translateX(4px)" : "translateX(0)" }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Inputs panel */}
          {activeTab === "Inputs" && (
            <RevealBlock>
              <div className="rounded-2xl border border-[#d4a373]/25 bg-[#faf5ef] p-8 shadow-[0_6px_24px_rgba(181,101,74,0.06)]">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Text input */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-[#7a6350]/70 mb-2 uppercase">
                      Artisan Name
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder="e.g. Maria of Thessaloniki"
                      className="w-full px-4 py-3 rounded-lg border text-[#7a6350] text-sm font-medium bg-[#faf5ef] placeholder:text-[#7a6350]/30 outline-none transition-all duration-300 ease-out"
                      style={{
                        borderColor: inputFocused ? "#8b9d77" : "rgba(212,163,115,0.4)",
                        boxShadow: inputFocused
                          ? "0 0 0 3px rgba(139,157,119,0.15)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* Select */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wide text-[#7a6350]/70 mb-2 uppercase">
                      Craft Region
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-[#d4a373]/40 text-[#7a6350] text-sm font-medium bg-[#faf5ef] outline-none focus:border-[#8b9d77] focus:ring-2 focus:ring-[#8b9d77]/15 transition-all duration-300 ease-out appearance-none"
                    >
                      <option>Oaxaca, Mexico</option>
                      <option>Crete, Greece</option>
                      <option>Fez, Morocco</option>
                      <option>Umbria, Italy</option>
                      <option>Iznik, Turkey</option>
                    </select>
                  </div>

                  {/* Textarea */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold tracking-wide text-[#7a6350]/70 mb-2 uppercase">
                      Craft Description
                    </label>
                    <textarea
                      rows={4}
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                      onFocus={() => setTextareaFocused(true)}
                      onBlur={() => setTextareaFocused(false)}
                      placeholder="Describe the vessel, technique, or tradition..."
                      className="w-full px-4 py-3 rounded-lg border text-[#7a6350] text-sm font-medium bg-[#faf5ef] placeholder:text-[#7a6350]/30 outline-none resize-none transition-all duration-300 ease-out"
                      style={{
                        borderColor: textareaFocused ? "#8b9d77" : "rgba(212,163,115,0.4)",
                        boxShadow: textareaFocused
                          ? "0 0 0 3px rgba(139,157,119,0.15)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* Checkbox group */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold tracking-wide text-[#7a6350]/70 mb-3 uppercase">
                      Techniques Used
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["Wheel-thrown", "Hand-built", "Coil method", "Slab-built", "Reduction fired"].map((technique) => (
                        <label
                          key={technique}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <div className="w-4 h-4 rounded border border-[#d4a373]/50 bg-[#faf5ef] flex items-center justify-center group-hover:border-[#8b9d77] transition-colors duration-300">
                            <div className="w-2 h-2 rounded-sm bg-[#8b9d77] opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                          </div>
                          <span className="text-sm text-[#7a6350]/70 group-hover:text-[#7a6350] transition-colors duration-300">
                            {technique}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#d4a373]/15">
                  <p className="text-xs text-[#7a6350]/50 font-medium tracking-wide">
                    Focus ring: olive green #8b9d77 · border relaxes to sand · never cold blue
                  </p>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COLOR PALETTE                                              */}
      {/* ============================================================ */}
      <section id="palette" className="py-24 bg-[#faf5ef] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Earth Palette</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">Five Earth Tones</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-md">
              Every hue drawn from the Mediterranean landscape — nothing synthetic, nothing cold.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {palette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.08}>
                <div className="rounded-xl overflow-hidden border border-[#d4a373]/20 shadow-[0_4px_12px_rgba(122,99,80,0.06)] hover:-translate-y-1 transition-all duration-300 ease-out">
                  {/* Swatch */}
                  <div
                    className={`h-28 ${color.bg} ${color.border ? "border-b border-[#d4a373]/30" : ""}`}
                    style={color.border ? { background: color.hex } : {}}
                  />
                  {/* Info */}
                  <div className="p-4 bg-[#faf5ef]">
                    <div className="font-semibold text-[#7a6350] text-sm mb-0.5">{color.name}</div>
                    <div className="text-[10px] font-mono text-[#7a6350]/50 mb-2 tracking-wider">{color.hex}</div>
                    <p className="text-[10px] text-[#7a6350]/55 leading-relaxed">{color.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. POTTERY WORKSHOP DEMO                                      */}
      {/* ============================================================ */}
      <section id="workshop" className="py-24 bg-[#d4a373]/08 scroll-mt-16" style={{ background: "rgba(212,163,115,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">State Metaphor</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">The Pottery Workshop</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-lg">
              Every UI interaction follows the life of a clay vessel — from raw earth to glazed completion.
              Map your component states to the kiln.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {potteryStages.map((stage, i) => (
              <RevealBlock key={stage.id} delay={i * 0.1}>
                <div
                  className={`rounded-xl border ${stage.borderColor} ${stage.bgColor} p-6 hover:-translate-y-1 transition-all duration-300 ease-out shadow-[0_4px_12px_rgba(122,99,80,0.06)] hover:shadow-[0_8px_20px_rgba(122,99,80,0.1)]`}
                >
                  {/* Stage icon */}
                  <div className={`text-3xl font-light mb-4 ${stage.accentColor}`}>
                    {stage.icon}
                  </div>

                  {/* Stage labels */}
                  <div className="mb-1">
                    <span className={`inline-block text-[10px] tracking-[0.2em] uppercase font-semibold px-2 py-0.5 rounded-md ${stage.tagBg} ${stage.tagText}`}>
                      {stage.subtitle}
                    </span>
                  </div>
                  <h3 className={`font-semibold text-base mt-2 mb-2 ${stage.accentColor}`}>
                    {stage.label}
                  </h3>
                  <p className="text-[#7a6350]/65 text-xs leading-relaxed mb-4">
                    {stage.desc}
                  </p>

                  {/* Technical detail */}
                  <div className="border-t border-[#d4a373]/20 pt-3 mt-auto">
                    <p className="text-[9px] text-[#7a6350]/45 tracking-wide font-medium uppercase">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Connection line visual */}
          <RevealBlock delay={0.5} className="mt-8 flex items-center justify-center gap-0">
            <div className="hidden lg:flex items-center w-full max-w-2xl">
              {potteryStages.map((stage, i) => (
                <div key={stage.id} className="flex items-center flex-1">
                  <div className="w-3 h-3 rounded-full border-2 border-[#b5654a] bg-[#faf5ef]" />
                  {i < potteryStages.length - 1 && (
                    <div className="flex-1 h-px bg-gradient-to-r from-[#b5654a]/40 to-[#8b9d77]/40" />
                  )}
                </div>
              ))}
              <div className="w-3 h-3 rounded-full bg-[#8b9d77]" />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. MEDITERRANEAN MOTIFS                                       */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#faf5ef]">
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Decorative Language</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">Mediterranean Motifs</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-lg">
              Botanical and geometric patterns drawn from the terracotta palette. Use these as
              decorative tile compositions and background accents.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {motifTiles.map((motif, i) => (
              <RevealBlock key={motif.id} delay={i * 0.1}>
                <div className="rounded-xl border border-[#d4a373]/25 bg-[#faf5ef] shadow-[0_4px_12px_rgba(122,99,80,0.05)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(122,99,80,0.09)] transition-all duration-300 ease-out overflow-hidden">
                  {/* Motif visual area */}
                  <div className="h-40 flex items-center justify-center p-6 bg-[#d4a373]/06" style={{ background: "rgba(212,163,115,0.06)" }}>
                    <div className="w-28 h-28">
                      {motif.id === "olive-branch" && <OliveBranchSVG />}
                      {motif.id === "terracotta-sun" && <SunDiscSVG />}
                      {motif.id === "wave-arc" && <SeaArcSVG />}
                      {motif.id === "vessel-ring" && <VesselRingSVG />}
                    </div>
                  </div>
                  {/* Label */}
                  <div className="p-4 border-t border-[#d4a373]/15">
                    <h4 className="font-semibold text-sm text-[#7a6350] mb-1">{motif.label}</h4>
                    <p className="text-[10px] text-[#7a6350]/55 leading-relaxed">{motif.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Composition strip */}
          <RevealBlock delay={0.45} className="mt-10">
            <div className="rounded-xl border border-[#d4a373]/25 overflow-hidden shadow-[0_4px_12px_rgba(122,99,80,0.06)]">
              <div className="flex h-16">
                {["#b5654a", "#d4a373", "#faf5ef", "#7a6350", "#8b9d77", "#d4a373", "#b5654a"].map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ background: color, opacity: i % 2 === 0 ? 1 : 0.55 }}
                  />
                ))}
              </div>
              <div className="px-5 py-3 bg-[#faf5ef] border-t border-[#d4a373]/20">
                <p className="text-[10px] text-[#7a6350]/50 font-medium tracking-wide uppercase">
                  Terracotta spectrum — warm-to-warm only, no cold hues permitted
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. DO / DON'T RULES                                           */}
      {/* ============================================================ */}
      <section className="py-24" style={{ background: "rgba(212,163,115,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Design Principles</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">Rules of the Kiln</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-md">
              What fires true terracotta — and what breaks it.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO card */}
            <RevealBlock delay={0.1}>
              <div className="rounded-xl border border-[#d4a373]/25 bg-[#faf5ef] border-t-2 border-t-[#8b9d77] shadow-[0_4px_12px_rgba(122,99,80,0.06)] overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-6 h-6 rounded-full bg-[#8b9d77] flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-3 h-3 fill-[#faf5ef]" aria-hidden="true">
                        <path d="M2,6 L5,9 L10,3" stroke="#faf5ef" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-semibold text-[#8b9d77] text-sm tracking-wide uppercase">Do</span>
                  </div>
                  <ul className="space-y-3">
                    {doRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8b9d77] flex-shrink-0" />
                        <span className="text-sm text-[#7a6350]/75 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T card */}
            <RevealBlock delay={0.2}>
              <div className="rounded-xl border border-[#d4a373]/25 bg-[#faf5ef] shadow-[0_4px_12px_rgba(122,99,80,0.06)] overflow-hidden h-full" style={{ borderTop: "2px solid rgba(212,163,115,0.5)" }}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-6 h-6 rounded-full bg-[#d4a373]/40 flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true">
                        <path d="M3,3 L9,9 M9,3 L3,9" stroke="#7a6350" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-semibold text-[#7a6350]/60 text-sm tracking-wide uppercase">Don&apos;t</span>
                  </div>
                  <ul className="space-y-3">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d4a373]/60 flex-shrink-0" />
                        <span className="text-sm text-[#7a6350]/60 leading-relaxed line-through decoration-[#d4a373]/40">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. COLLECTION SHOWCASE                                        */}
      {/* ============================================================ */}
      <section id="collection" className="py-24 bg-[#faf5ef] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Ceramic Pieces</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">The Collection</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-md">
              Six vessel archetypes from the Mediterranean tradition. Each shaped for a distinct
              purpose, each bearing the warmth of the kiln.
            </p>
          </RevealBlock>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ceramicCollection.map((piece, i) => (
              <RevealBlock key={piece.id} delay={i * 0.08}>
                <div
                  onMouseEnter={() => setHoveredCollection(piece.id)}
                  onMouseLeave={() => setHoveredCollection(null)}
                  className="rounded-xl border border-[#d4a373]/25 bg-[#faf5ef] shadow-[0_4px_16px_rgba(181,101,74,0.06)] hover:shadow-[0_10px_28px_rgba(181,101,74,0.13)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden group"
                >
                  {/* Accent header strip */}
                  <div
                    className={`h-1.5 ${piece.accent} transition-all duration-300 ease-out`}
                    style={{ opacity: hoveredCollection === piece.id ? 1 : 0.55 }}
                  />

                  <div className="p-6">
                    {/* Tag */}
                    <span className={`inline-block text-[10px] tracking-[0.25em] uppercase font-semibold ${piece.tagColor} bg-[#8b9d77]/10 px-2 py-0.5 rounded-md mb-3`}>
                      {piece.tag}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-semibold text-lg mb-2 transition-colors duration-300"
                      style={{ color: hoveredCollection === piece.id ? "#b5654a" : "#7a6350" }}
                    >
                      {piece.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#7a6350]/60 text-sm leading-relaxed">{piece.desc}</p>

                    {/* Footer row */}
                    <div className="mt-5 pt-4 border-t border-[#d4a373]/15 flex items-center justify-between">
                      <span className="text-[10px] text-[#7a6350]/40 font-medium tracking-wide uppercase">
                        mediterranean · handcraft
                      </span>
                      <span
                        className="text-[#b5654a] text-sm font-semibold transition-transform duration-300 ease-out"
                        style={{ transform: hoveredCollection === piece.id ? "translateX(4px)" : "translateX(0)" }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BONUS: TYPOGRAPHY SECTION                                     */}
      {/* ============================================================ */}
      <section className="py-24" style={{ background: "rgba(212,163,115,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Type Scale</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">Warm Typography</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-md">
              Humanist strokes at every scale. Generous line heights, warm color fills — always legible against cream.
            </p>
          </RevealBlock>

          <div className="rounded-2xl border border-[#d4a373]/25 bg-[#faf5ef] shadow-[0_4px_16px_rgba(122,99,80,0.05)] overflow-hidden">
            {[
              { size: "text-6xl", label: "Display / Hero", sample: "Terra", color: "text-[#b5654a]", weight: "font-semibold" },
              { size: "text-4xl", label: "Section Title", sample: "Handcrafted Forms", color: "text-[#7a6350]", weight: "font-semibold" },
              { size: "text-2xl", label: "Card Title", sample: "Kiln-fired Vessels", color: "text-[#7a6350]", weight: "font-semibold" },
              { size: "text-lg", label: "Lead Copy", sample: "Warm earth tones drawn from the Mediterranean coast.", color: "text-[#7a6350]", weight: "font-medium" },
              { size: "text-base", label: "Body Text", sample: "Every hue pulled from sun-baked clay, olive groves, and coastal sand. Nothing synthetic, nothing cold.", color: "text-[#7a6350]/75", weight: "font-normal" },
              { size: "text-xs", label: "Label / Tag", sample: "MEDITERRANEAN CRAFT · EST. 500 BCE", color: "text-[#8b9d77]", weight: "font-semibold tracking-[0.25em] uppercase" },
            ].map(({ size, label, sample, color, weight }, i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-6 py-5 border-b border-[#d4a373]/15 last:border-b-0 hover:bg-[#d4a373]/05 transition-colors duration-300"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,163,115,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="w-28 flex-shrink-0">
                  <span className="text-[9px] text-[#7a6350]/40 font-medium tracking-wide uppercase">{label}</span>
                </div>
                <div className={`${size} ${color} ${weight} leading-tight flex-1`}>{sample}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BONUS: SPACING & RADIUS REFERENCE                            */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#faf5ef]">
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock>
            <div className="mb-3">
              <span className="text-[#8b9d77] text-xs tracking-[0.3em] uppercase font-medium">Form Language</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#7a6350] mb-2">Roundedness Scale</h2>
            <p className="text-[#7a6350]/60 text-sm mb-12 max-w-md">
              The minimum is rounded-lg. Sharp corners belong to cold, industrial systems — not this kiln.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-6 items-end">
              {[
                { label: "rounded-lg", radius: "0.5rem", size: "w-16 h-16" },
                { label: "rounded-xl", radius: "0.75rem", size: "w-20 h-20" },
                { label: "rounded-2xl", radius: "1rem", size: "w-24 h-24" },
                { label: "rounded-3xl", radius: "1.5rem", size: "w-28 h-28" },
                { label: "rounded-full", radius: "9999px", size: "w-20 h-20" },
              ].map(({ label, radius, size }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div
                    className={`${size} bg-[#b5654a]/15 border-2 border-[#b5654a]/40 flex items-center justify-center`}
                    style={{ borderRadius: radius }}
                  >
                    <span className="text-[8px] text-[#b5654a] font-mono font-semibold">{radius}</span>
                  </div>
                  <span className="text-[9px] text-[#7a6350]/50 font-medium tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2} className="mt-14">
            <h3 className="text-lg font-semibold text-[#7a6350] mb-6">Shadow Scale</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { label: "Subtle", shadow: "0 2px 8px rgba(181,101,74,0.08)", desc: "Input fields, inline tags" },
                { label: "Card", shadow: "0 6px 16px rgba(181,101,74,0.12)", desc: "Default cards, panels" },
                { label: "Lifted", shadow: "0 12px 28px rgba(181,101,74,0.18)", desc: "Hover state, modals" },
              ].map(({ label, shadow, desc }) => (
                <div
                  key={label}
                  className="rounded-xl bg-[#faf5ef] p-5 border border-[#d4a373]/20"
                  style={{ boxShadow: shadow }}
                >
                  <div className="font-semibold text-[#7a6350] text-sm mb-1">{label}</div>
                  <div className="text-[9px] font-mono text-[#7a6350]/45 mb-2 break-all">{shadow}</div>
                  <div className="text-xs text-[#7a6350]/55">{desc}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. FOOTER                                                     */}
      {/* ============================================================ */}
      <footer id="about" className="bg-[#faf5ef] border-t border-[#d4a373]/30 py-14 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#b5654a] flex items-center justify-center shadow-[0_2px_8px_rgba(181,101,74,0.25)]">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#faf5ef]" aria-hidden="true">
                    <path d="M12,2 C8,2 4,6 4,11 C4,16 7,19 10,20.5 L10,22 L14,22 L14,20.5 C17,19 20,16 20,11 C20,6 16,2 12,2 Z" />
                  </svg>
                </div>
                <span className="font-semibold text-[#7a6350] tracking-wide">Terracotta</span>
              </div>
              <p className="text-xs text-[#7a6350]/50 max-w-xs leading-relaxed">
                A warm earth design system rooted in Mediterranean clay craftsmanship.
                Part of the StyleKit collection.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6">
              {["Palette", "Components", "Workshop", "Collection", "StyleKit"].map((link) => (
                <button
                  key={link}
                  className="text-sm text-[#7a6350]/60 hover:text-[#b5654a] transition-colors duration-300 font-medium"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 pt-6 border-t border-[#d4a373]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#8b9d77] text-xs font-medium tracking-wide">
              &copy; 2024 StyleKit · Terracotta Design System
            </p>
            <p className="text-[#7a6350]/35 text-[10px] font-medium tracking-wide uppercase">
              Shaped by hand · Fired with warmth · Never cold
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
