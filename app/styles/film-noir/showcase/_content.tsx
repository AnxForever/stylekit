"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView — IntersectionObserver, threshold 0.15, fires once       */
/* ------------------------------------------------------------------ */
function useInView() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  RevealBlock — opacity 0→1, translateY 28px→0                       */
/*  easing: cubic-bezier(0.16,1,0.3,1)                                 */
/* ------------------------------------------------------------------ */
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
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section label + heading helper                                      */
/* ------------------------------------------------------------------ */
function SectionHead({
  eyebrow,
  title,
  accent,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <RevealBlock className={`mb-16 ${center ? "text-center" : ""}`}>
      <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-3">
        {eyebrow}
      </p>
      <h2 className="font-serif italic text-4xl md:text-[3.5rem] leading-[1.05] text-neutral-100 mb-5">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={`h-[2px] bg-[#c41e3a] ${center ? "w-12 mx-auto" : "w-12"}`}
      />
      {accent && <div className="mt-6">{accent}</div>}
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const caseFiles = [
  {
    id: "#001",
    title: "The Vanishing Witness",
    excerpt:
      "She walked into my office on a Tuesday. By Thursday, every trace of her had disappeared from the city records.",
    date: "November 1947",
    status: "Cold" as const,
  },
  {
    id: "#002",
    title: "Midnight at the Pier",
    excerpt:
      "The fog rolled in thick enough to hide a body. When it lifted, the cargo was gone — and so was the captain.",
    date: "February 1948",
    status: "Active" as const,
  },
  {
    id: "#003",
    title: "The Crimson Letter",
    excerpt:
      "A single page, typed on a 1940 Remington. No fingerprints. No return address. Just an accusation.",
    date: "August 1949",
    status: "Closed" as const,
  },
  {
    id: "#004",
    title: "Shadows on Fifth Avenue",
    excerpt:
      "Photographs taped beneath a loose floorboard — each timestamped three days before the crime.",
    date: "December 1949",
    status: "Active" as const,
  },
];

const colorTokens = [
  { name: "Void",    hex: "#0a0a0a", tw: "bg-[#0a0a0a]",   role: "Background",    light: false },
  { name: "Smoke",   hex: "#171717", tw: "bg-neutral-900",  role: "Card BG",       light: false },
  { name: "Ash",     hex: "#262626", tw: "bg-neutral-800",  role: "Card Border",   light: false },
  { name: "Fog",     hex: "#404040", tw: "bg-neutral-700",  role: "Border Hover",  light: false },
  { name: "Mist",    hex: "#737373", tw: "bg-neutral-500",  role: "Text Muted",    light: false },
  { name: "Bone",    hex: "#d4d4d4", tw: "bg-neutral-300",  role: "Text Sub",      light: true  },
  { name: "Ivory",   hex: "#f5f5f5", tw: "bg-neutral-100",  role: "Text Primary",  light: true  },
  { name: "Crimson", hex: "#c41e3a", tw: "bg-[#c41e3a]",    role: "Accent — Rare", light: false },
  { name: "Sepia",   hex: "#8b7355", tw: "bg-[#8b7355]",    role: "Accent — Age",  light: false },
  { name: "Gold",    hex: "#d4af37", tw: "bg-[#d4af37]",    role: "Accent — Clue", light: true  },
];

const doRules = [
  "bg-[#0a0a0a] or bg-neutral-950 — near-black base canvas always",
  "font-serif italic for all headings — classical newspaper authority",
  "Grayscale palette: neutral-100 through neutral-950 as primary scale",
  "Crimson #c41e3a sparingly — danger, calls to action, bleed lines only",
  "Diagonal gradient overlays to simulate cinematic light shafts",
  "Light shaft sweep on every button: group + inner translate div",
  "active:scale-[0.98] on every button — tactile press confirmation",
  "focus:ring-2 focus:ring-neutral-400 focus:ring-offset-neutral-950",
  "Animation duration 500ms minimum — Noir is slow and deliberate",
  "Venetian blinds overlay on cards: opacity-0 to group-hover:opacity-[0.06]",
  "Crimson bleed line: w-12 expanding to group-hover:w-full over 700ms",
  "Thin or no borders: border-neutral-800, never colorful borders",
];

const dontRules = [
  "No colorful or saturated backgrounds — this is monochrome noir",
  "No rounded-2xl or larger corner radii — noir is angular and sharp",
  "No neon glow or drop-shadow effects — forbidden, breaks the darkness",
  "No gradient button fills — flat, harsh, binary only",
  "No cartoon, cute, or playful elements — this is serious cinema",
  "No animation duration below 300ms — slowness is inherent to noir weight",
  "No buttons missing active:scale-[0.98] — no tactile confirmation is broken",
  "No focus:ring without focus:ring-offset-neutral-950 on dark backgrounds",
  "No high saturation colors except crimson as a rare accent",
  "No emoji or playful iconography",
];

const typographySamples = [
  {
    label: "Display — font-serif italic font-bold",
    cls: "font-serif italic font-bold text-4xl md:text-5xl text-neutral-100",
    text: "Every Shadow Tells a Story",
  },
  {
    label: "Heading — font-serif italic",
    cls: "font-serif italic text-2xl text-neutral-100",
    text: "The Detective's Notebook",
  },
  {
    label: "Subheading — font-serif italic text-neutral-400",
    cls: "font-serif italic text-lg text-neutral-400",
    text: "Scene Two: The Interrogation Room",
  },
  {
    label: "Label — font-sans text-xs uppercase tracking-[0.25em] text-neutral-500",
    cls: "font-sans text-xs uppercase tracking-[0.25em] text-neutral-500",
    text: "Case File No. 1947",
  },
  {
    label: "Body — font-sans text-sm text-neutral-400 leading-relaxed",
    cls: "font-sans text-sm text-neutral-400 leading-relaxed",
    text: "The rain hammered against the window pane as the detective turned the photograph over in his hands. Something about the reflection in the glass did not add up. He reached for the telephone.",
  },
  {
    label: "Mono — font-mono text-xs text-neutral-500",
    cls: "font-mono text-xs text-neutral-500",
    text: "#c41e3a — crimson — use sparingly",
  },
];

type ComponentTab = "buttons" | "cards" | "typography" | "badges";
type SceneTab = "interrogation" | "pier" | "alley" | "reveal";

/* ------------------------------------------------------------------ */
/*  Scene viewer data                                                   */
/* ------------------------------------------------------------------ */
const scenes: Record<SceneTab, { title: string; sub: string; desc: string; gradient: string }> = {
  interrogation: {
    title: "The Interrogation Room",
    sub: "Scene I",
    desc: "A single bulb swings overhead. Shadows carve the room into two halves — light and darkness, guilty and innocent.",
    gradient: "from-[#1a1a1a] via-[#0f0f0f] to-black",
  },
  pier: {
    title: "Midnight at the Pier",
    sub: "Scene II",
    desc: "The fog swallowed the lamplight whole. Somewhere out in the dark water, an engine turned over and went quiet.",
    gradient: "from-[#0f1a2a] via-[#0a0a0a] to-black",
  },
  alley: {
    title: "Midnight Alley",
    sub: "Scene III",
    desc: "Crimson neon bled across the wet pavement. Three blocks down, a door opened and closed without a sound.",
    gradient: "from-[#c41e3a]/15 via-[#0f0f0f] to-black",
  },
  reveal: {
    title: "The Final Reveal",
    sub: "Scene IV",
    desc: "The gold watch caught the last light. He already knew — had known since the moment she first lied about the alibi.",
    gradient: "from-[#d4af37]/12 via-[#0f0f0f] to-black",
  },
};

/* ================================================================== */
/*  Main export                                                        */
/* ================================================================== */
export default function FilmNoirShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [activeScene, setActiveScene] = useState<SceneTab>("interrogation");

  /* Light shaft sweep demo hover state */
  const [lightShaftHovered, setLightShaftHovered] = useState(false);
  /* Harsh monochrome swap demo hover state */
  const [monochromeHovered, setMonochromeHovered] = useState(false);
  /* Venetian blinds demo hover state */
  const [venetianHovered, setVenetianHovered] = useState(false);
  /* Crimson bleed demo hover state */
  const [crimsonBleedHovered, setCrimsonBleedHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const statusColor = (s: "Active" | "Cold" | "Closed") =>
    s === "Active" ? "text-[#c41e3a]" : s === "Closed" ? "text-[#d4af37]" : "text-neutral-600";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 overflow-x-hidden">
      <style>{`
        @keyframes noir-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .noir-marquee { animation: noir-marquee 34s linear infinite; }

        @keyframes noir-pulse-dot {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
        .noir-pulse-dot { animation: noir-pulse-dot 2s ease-in-out infinite; }

        .noir-clip-reveal {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1.7s cubic-bezier(0.16,1,0.3,1);
        }
        .noir-clip-reveal.revealed {
          clip-path: inset(0% 0 0 0);
        }

        .noir-venetian-bg {
          background-image: repeating-linear-gradient(
            180deg,
            transparent,
            transparent 4px,
            #fff 4px,
            #fff 6px
          );
        }

        .tab-active-noir {
          color: #f5f5f5;
          border-bottom: 2px solid #c41e3a;
        }
        .tab-inactive-noir {
          color: rgba(245,245,245,0.3);
          border-bottom: 2px solid transparent;
          transition: color 0.3s;
        }
        .tab-inactive-noir:hover {
          color: rgba(245,245,245,0.65);
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. FIXED STICKY NAV                                          */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/96 backdrop-blur-sm border-b border-neutral-800">
        {/* Subtle venetian texture strip across nav */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.02] noir-venetian-bg"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">
          {/* Left — back link */}
          <Link
            href="/"
            className="font-sans text-xs uppercase tracking-[0.22em] text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
          >
            &larr;&nbsp;Back to StyleKit
          </Link>

          {/* Center — brand */}
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-lg tracking-widest text-neutral-100">
              Film Noir
            </span>
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] noir-pulse-dot"
            />
          </div>

          {/* Right — section links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "Cases", href: "#cases" },
              { label: "Components", href: "#components" },
              { label: "Anatomy", href: "#anatomy" },
              { label: "Rules", href: "#rules" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[10px] uppercase tracking-[0.22em] text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO                                                       */}
      {/* ============================================================ */}
      <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden">
        {/* Diagonal light beam SVG */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lightBeam1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lightBeam2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Primary light shaft — top-left diagonal */}
          <polygon
            points="0,0 420,0 0,680"
            fill="url(#lightBeam1)"
          />
          {/* Secondary shaft — offset */}
          <polygon
            points="60,0 280,0 0,340"
            fill="url(#lightBeam2)"
          />
        </svg>

        {/* Venetian blinds structural stripes across hero */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(0,0,0,0.22) 80px, rgba(0,0,0,0.22) 82px)",
          }}
        />

        {/* Radial vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Spotlight — top-left radial */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top left, rgba(255,255,255,0.055) 0%, transparent 65%)",
          }}
        />

        {/* Hero copy */}
        <div className="relative z-10 text-center max-w-5xl px-6 md:px-8">
          {/* Case stamp badge */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.6s ease 0.25s",
            }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#c41e3a] border border-[#c41e3a]/50 px-4 py-1.5 inline-block mb-10">
              Case No. 1947
            </span>
          </div>

          {/* Heading line 1 */}
          <h1 className="font-serif italic leading-[0.88]">
            <span
              className="block text-6xl md:text-8xl lg:text-[9rem] font-bold text-neutral-100"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(52px)",
                transition:
                  "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              Every Shadow
            </span>
            {/* Heading line 2 — crimson */}
            <span
              className="block text-6xl md:text-8xl lg:text-[9rem] font-bold"
              style={{
                color: "#c41e3a",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(52px)",
                transition:
                  "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.58s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.58s",
              }}
            >
              Tells a Story.
            </span>
          </h1>

          {/* Crimson underline — animated width */}
          <div
            aria-hidden="true"
            className="h-[2px] bg-[#c41e3a] mx-auto mt-9 mb-9"
            style={{
              width: heroRevealed ? "80px" : "0px",
              transition: "width 1.1s cubic-bezier(0.16,1,0.3,1) 1.05s",
            }}
          />

          {/* Tagline */}
          <p
            className="font-serif italic text-lg md:text-xl leading-relaxed text-neutral-400 max-w-lg mx-auto mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.9s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.9s",
            }}
          >
            Inspired by 1940s Hollywood cinema. Built with extreme contrast,
            rain-soaked streets, and the quiet elegance of{" "}
            <span className="text-neutral-100 underline decoration-[#c41e3a]/60 underline-offset-4">
              monochrome
            </span>
            .
          </p>

          {/* CTA buttons — Light Shaft Sweep + Harsh Monochrome Swap */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 1.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 1.1s",
            }}
          >
            {/* Primary — full Light Shaft Sweep + Harsh Monochrome Swap */}
            <button
              type="button"
              className="group relative overflow-hidden px-10 py-4 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest text-sm hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"
              />
              <span className="relative z-10">Begin Investigation</span>
            </button>

            {/* Ghost */}
            <button
              type="button"
              className="group relative overflow-hidden px-10 py-4 bg-transparent text-neutral-300 border border-neutral-600 font-serif italic tracking-widest text-sm hover:border-neutral-200 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"
              />
              <span className="relative z-10">Read the File</span>
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{
            opacity: heroRevealed ? 0.35 : 0,
            transition: "opacity 1s ease 1.8s",
          }}
        >
          <div className="w-px h-14 bg-neutral-600" />
          <span className="font-sans text-[9px] uppercase tracking-[0.45em] text-neutral-600">
            Scroll
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Marquee ticker                                                */}
      {/* ============================================================ */}
      <div className="w-full overflow-hidden border-y border-neutral-800 py-4 bg-neutral-900">
        <div className="flex w-[200%] noir-marquee">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex-1 flex justify-around items-center font-sans text-[10px] uppercase tracking-[0.38em] text-neutral-600"
            >
              <span>Shadows</span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Moral Ambiguity</span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Rain-Soaked Streets</span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>High Contrast</span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Crimson Punctuation</span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Every Clue Matters</span>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#c41e3a]" />
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. LIVE DETECTIVE AGENCY DEMO — Scene Viewer + Case Files     */}
      {/* ============================================================ */}
      <section id="cases" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="The Archive"
            title="Open Case Files"
          />

          {/* Scene viewer — interactive tab */}
          <RevealBlock delay={0.06} className="mb-20">
            <div className="bg-neutral-900 border border-neutral-800">
              {/* Scene selector tabs */}
              <div className="flex border-b border-neutral-800 overflow-x-auto">
                {(Object.keys(scenes) as SceneTab[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveScene(key)}
                    className={`px-6 py-3 font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                      activeScene === key ? "tab-active-noir" : "tab-inactive-noir"
                    }`}
                  >
                    {scenes[key].sub}
                  </button>
                ))}
              </div>

              {/* Active scene panel */}
              <div className="relative h-72 md:h-96 overflow-hidden group cursor-crosshair">
                {/* Dynamic gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${scenes[activeScene].gradient} transition-all duration-700`}
                />

                {/* Venetian blinds stripes */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(0,0,0,0.2) 80px, rgba(0,0,0,0.2) 82px)",
                  }}
                />

                {/* Venetian blinds hover overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 noir-venetian-bg"
                />

                {/* Vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.8) 100%)" }}
                />

                {/* Diagonal light shard */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -left-20 w-72 h-[500px] pointer-events-none bg-gradient-to-b from-white/5 to-transparent rotate-[30deg] group-hover:from-white/9 transition-all duration-700"
                />

                {/* Scene content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-neutral-600 mb-3">
                    {scenes[activeScene].sub}
                  </p>
                  <h3 className="font-serif italic text-3xl md:text-5xl text-neutral-100 group-hover:text-white transition-colors duration-500 mb-5">
                    {scenes[activeScene].title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500 max-w-md leading-relaxed">
                    {scenes[activeScene].desc}
                  </p>
                  {/* Crimson bleed line */}
                  <div
                    aria-hidden="true"
                    className="mt-7 h-[2px] bg-[#c41e3a] w-12 group-hover:w-full transition-all duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Case file cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseFiles.map((file, i) => (
              <RevealBlock key={file.id} delay={i * 0.1}>
                <div className="group relative bg-neutral-900 border border-neutral-800 p-8 overflow-hidden hover:border-neutral-600 transition-colors duration-700 cursor-crosshair">
                  {/* Venetian blinds overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 noir-venetian-bg"
                  />
                  {/* Diagonal light shard */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-20 -right-20 w-44 h-80 bg-gradient-to-b from-white/4 to-transparent rotate-45 group-hover:from-white/8 transition-all duration-700 pointer-events-none"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-sans text-xs uppercase tracking-[0.22em] text-neutral-600">
                        Case File {file.id}
                      </p>
                      <span className={`font-sans text-xs uppercase tracking-[0.18em] ${statusColor(file.status)}`}>
                        {file.status}
                      </span>
                    </div>
                    <h3 className="font-serif italic text-xl text-neutral-100 mb-3 group-hover:text-white transition-colors duration-500">
                      {file.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500">
                      {file.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-6 mb-3">
                      <span className="font-serif italic text-xs text-neutral-700">{file.date}</span>
                    </div>
                    {/* Crimson bleed */}
                    <div
                      aria-hidden="true"
                      className="h-[2px] bg-[#c41e3a] w-12 group-hover:w-full transition-all duration-700 ease-out"
                    />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. STYLE ANATOMY — color tokens, typography, do/don't         */}
      {/* ============================================================ */}
      <section id="anatomy" className="py-28 md:py-40 px-6 md:px-12 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="The Palette"
            title="Shades of Noir"
            accent={
              <p className="font-sans text-sm text-neutral-500 max-w-md leading-relaxed">
                A grayscale world with two rare accents. Crimson for danger. Gold
                for revelation. Everything else lives in near-black through ivory.
              </p>
            }
          />

          {/* Color token grid */}
          <RevealBlock delay={0.05} className="mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
              {colorTokens.map((color) => (
                <div key={color.hex} className="group cursor-default">
                  <div
                    className="aspect-square border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-500 relative overflow-hidden flex items-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Venetian on hover */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none noir-venetian-bg"
                    />
                    <span
                      className={`relative z-10 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        color.light ? "text-neutral-950" : "text-neutral-300"
                      }`}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <p className="font-serif italic text-sm text-neutral-400 mt-2">{color.name}</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-neutral-600 mt-0.5">
                    {color.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Accent colour cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  hex: "#c41e3a",
                  name: "Crimson",
                  desc: "Danger. Blood. Revelation. Reserved for calls to action and bleed lines only. Never decorative.",
                },
                {
                  hex: "#8b7355",
                  name: "Sepia",
                  desc: "Memory. Age. Evidence worn by time. Secondary accents and vintage texture backgrounds.",
                },
                {
                  hex: "#d4af37",
                  name: "Gold",
                  desc: "A hidden clue. The glint of something important. Focus ring colours and highlight moments only.",
                },
              ].map((accent) => (
                <div key={accent.hex} className="bg-neutral-900 border border-neutral-800 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 flex-shrink-0" style={{ backgroundColor: accent.hex }} />
                    <span className="font-serif italic text-neutral-100">{accent.name}</span>
                    <span className="font-mono text-[10px] text-neutral-600 ml-auto">{accent.hex}</span>
                  </div>
                  <p className="font-sans text-sm text-neutral-500 leading-relaxed">{accent.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Typography samples */}
          <RevealBlock delay={0.1} className="mb-0">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-neutral-600 mb-8">
              Typography Scale
            </p>
            <div className="space-y-8 bg-neutral-900 border border-neutral-800 p-8 md:p-12">
              {typographySamples.map((sample, i) => (
                <div key={i} className="border-b border-neutral-800 pb-8 last:border-0 last:pb-0">
                  <p className="font-mono text-[10px] text-neutral-600 mb-3 leading-relaxed">
                    {sample.label}
                  </p>
                  <p className={sample.cls}>{sample.text}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPONENT GALLERY — 4 tabs                                 */}
      {/* ============================================================ */}
      <section id="components" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="Building Blocks"
            title="Component Gallery"
          />

          {/* Tab bar */}
          <RevealBlock delay={0.06} className="mb-12">
            <div className="flex flex-wrap border-b border-neutral-800 gap-0">
              {(["buttons", "cards", "typography", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] capitalize transition-all duration-300 ${
                    activeTab === tab ? "tab-active-noir" : "tab-inactive-noir"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* ---- BUTTONS TAB ---- */}
          {activeTab === "buttons" && (
            <RevealBlock>
              <div className="space-y-16">
                {/* Primary — Light Shaft Sweep */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Primary — Light Shaft Sweep + Harsh Monochrome Swap
                  </p>
                  <div className="flex flex-wrap gap-4 mb-5">
                    <button
                      type="button"
                      className="group relative overflow-hidden px-8 py-3 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest text-sm hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                    >
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10">Investigate</span>
                    </button>
                    <button
                      type="button"
                      className="group relative overflow-hidden px-8 py-3 bg-transparent text-neutral-300 border border-neutral-600 font-serif italic tracking-widest text-sm hover:border-neutral-200 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                    >
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10">Read More</span>
                    </button>
                    <button
                      type="button"
                      className="group relative overflow-hidden px-8 py-3 bg-[#c41e3a] text-white border border-[#c41e3a] font-serif italic tracking-widest text-sm hover:bg-[#a01830] focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                    >
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10">Confess</span>
                    </button>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-neutral-600 max-w-xl">
                    Every button wraps content in a{" "}
                    <code className="font-mono text-[#d4af37] text-[11px]">group</code> element.
                    The inner div travels from{" "}
                    <code className="font-mono text-[#d4af37] text-[11px]">-translate-x-[200%]</code> to{" "}
                    <code className="font-mono text-[#d4af37] text-[11px]">translate-x-[200%]</code> at{" "}
                    <code className="font-mono text-[#d4af37] text-[11px]">duration-700</code>, creating a diagonal flashlight sweep through venetian blinds.
                  </p>
                </div>

                {/* Size variants */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Size Variants
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {[
                      { label: "Small", cls: "px-4 py-2 text-xs" },
                      { label: "Medium", cls: "px-8 py-3 text-sm" },
                      { label: "Large", cls: "px-14 py-4 text-base" },
                    ].map(({ label, cls }) => (
                      <button
                        key={label}
                        type="button"
                        className={`group relative overflow-hidden bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 ${cls}`}
                      >
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                        <span className="relative z-10">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon buttons */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Icon Buttons — Light Shaft on Square Format
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: "Search", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
                      { label: "View", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
                      { label: "Archive", d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
                    ].map((icon) => (
                      <button
                        key={icon.label}
                        type="button"
                        aria-label={icon.label}
                        className="group relative w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-100 hover:border-neutral-600 active:scale-[0.98] transition-colors duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950"
                      >
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                        <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon.d} />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ---- CARDS TAB ---- */}
          {activeTab === "cards" && (
            <RevealBlock>
              <div className="space-y-16">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Case Cards — Venetian Blinds + Crimson Bleed
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        id: "#201",
                        title: "The Stolen Manuscript",
                        excerpt: "An original Hemingway draft vanished from a locked vault. The insurance payout was three times its auction value.",
                        date: "March 1948",
                        status: "Active" as const,
                      },
                      {
                        id: "#202",
                        title: "Harbor Lights",
                        excerpt: "The lighthouse keeper saw something that night. He was willing to talk, for a price no one could afford.",
                        date: "June 1948",
                        status: "Cold" as const,
                      },
                    ].map((card) => (
                      <div key={card.id} className="group relative bg-neutral-900 border border-neutral-800 p-8 overflow-hidden hover:border-neutral-600 transition-colors duration-700 cursor-crosshair">
                        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 noir-venetian-bg" />
                        <div aria-hidden="true" className="absolute -top-20 -right-20 w-44 h-80 bg-gradient-to-b from-white/4 to-transparent rotate-45 group-hover:from-white/8 transition-all duration-700 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-600">Case File {card.id}</p>
                            <span className={`font-sans text-xs uppercase tracking-[0.15em] ${statusColor(card.status)}`}>{card.status}</span>
                          </div>
                          <h3 className="font-serif italic text-xl text-neutral-100 mb-3 group-hover:text-white transition-colors duration-500">{card.title}</h3>
                          <p className="font-sans text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors duration-500">{card.excerpt}</p>
                          <span className="block font-serif italic text-xs text-neutral-700 mt-5 mb-3">{card.date}</span>
                          <div aria-hidden="true" className="h-[2px] bg-[#c41e3a] w-12 group-hover:w-full transition-all duration-700 ease-out" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote card */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Quote Card — Diagonal Light + Crimson Drop Quote
                  </p>
                  <div className="group relative bg-neutral-900 border border-neutral-800 p-10 overflow-hidden hover:border-neutral-600 transition-colors duration-700 max-w-2xl cursor-default">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 noir-venetian-bg" />
                    <div aria-hidden="true" className="absolute -top-10 -left-10 w-40 h-72 bg-gradient-to-b from-white/4 to-transparent rotate-45 group-hover:from-white/8 transition-all duration-700 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="block text-[#c41e3a] text-6xl font-serif italic leading-none mb-4">&ldquo;</span>
                      <p className="font-serif italic text-xl leading-relaxed text-neutral-300 mb-6 group-hover:text-neutral-100 transition-colors duration-500">
                        In this city, the truth is just another rumor that nobody believes.
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-neutral-700" />
                        <span className="font-sans text-xs uppercase tracking-[0.22em] text-neutral-600">
                          Detective Marlowe
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interrogation form card */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Input Form Card — Gold Focus Glow
                  </p>
                  <div className="bg-neutral-900 border border-neutral-800 p-8 max-w-lg">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-7">
                      Subject Interrogation Form
                    </p>
                    <div className="space-y-7">
                      {[
                        { id: "gallery-name", label: "Subject Name", placeholder: "Enter name..." },
                        { id: "gallery-location", label: "Last Known Location", placeholder: "Address or district..." },
                      ].map((field) => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-2">
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type="text"
                            placeholder={field.placeholder}
                            className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 text-neutral-100 font-serif italic placeholder:text-neutral-700 focus:outline-none focus:border-[#d4af37] transition-colors duration-500"
                          />
                        </div>
                      ))}
                      <div className="pt-3">
                        <button
                          type="button"
                          className="group relative overflow-hidden px-8 py-3 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest text-sm hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                        >
                          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                          <span className="relative z-10">Submit Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ---- TYPOGRAPHY TAB ---- */}
          {activeTab === "typography" && (
            <RevealBlock>
              <div className="space-y-10">
                <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12">
                  {typographySamples.map((sample, i) => (
                    <div key={i} className="border-b border-neutral-800 pb-8 mb-8 last:border-0 last:mb-0 last:pb-0">
                      <p className="font-mono text-[10px] text-neutral-600 mb-4 leading-relaxed">
                        {sample.label}
                      </p>
                      <p className={sample.cls}>{sample.text}</p>
                    </div>
                  ))}
                </div>

                {/* Tracking & spacing demo */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Letter Spacing Scale
                  </p>
                  <div className="bg-neutral-900 border border-neutral-800 p-8 space-y-5">
                    {[
                      { tracking: "tracking-tight", label: "tracking-tight", text: "The Interrogation Room" },
                      { tracking: "tracking-normal", label: "tracking-normal", text: "The Interrogation Room" },
                      { tracking: "tracking-widest", label: "tracking-widest", text: "The Interrogation Room" },
                      { tracking: "tracking-[0.4em]", label: "tracking-[0.4em]", text: "CASE FILE — NO. 1947" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-baseline gap-6 flex-wrap">
                        <code className="font-mono text-[10px] text-neutral-600 w-40 flex-shrink-0">
                          {row.label}
                        </code>
                        <span className={`font-serif italic text-neutral-300 ${row.tracking}`}>
                          {row.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ---- BADGES TAB ---- */}
          {activeTab === "badges" && (
            <RevealBlock>
              <div className="space-y-14">
                {/* Status badges */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Status Badges — Case Priority
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Active", cls: "text-[#c41e3a] border-[#c41e3a]/40" },
                      { label: "Closed", cls: "text-[#d4af37] border-[#d4af37]/40" },
                      { label: "Cold", cls: "text-neutral-500 border-neutral-700" },
                      { label: "Classified", cls: "text-neutral-300 border-neutral-500 bg-neutral-800" },
                      { label: "Urgent", cls: "bg-[#c41e3a] text-white border-[#c41e3a]" },
                    ].map((badge) => (
                      <span
                        key={badge.label}
                        className={`font-sans text-[10px] uppercase tracking-[0.22em] border px-4 py-1.5 ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tag pills */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Keyword Tags
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "High Contrast", "Monochrome", "Serif Type", "Retro",
                      "Dramatic", "1940s", "Shadows", "Mystery", "Cinematic",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-xs uppercase tracking-[0.15em] border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300 px-3 py-1.5 transition-colors duration-500 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case number stamps */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Case Stamps — Crimson Bordered
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {["Case No. 1947", "Evidence #A-7", "Classified", "Red File"].map((stamp) => (
                      <span
                        key={stamp}
                        className="font-sans text-[10px] uppercase tracking-[0.45em] border border-[#c41e3a]/50 text-[#c41e3a] px-3 py-1.5"
                      >
                        {stamp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Count indicators */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6">
                    Numeric Indicators
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    {[
                      { label: "Open Cases", count: "12", color: "#c41e3a" },
                      { label: "Archived", count: "47", color: "#d4af37" },
                      { label: "Cold Files", count: "8", color: "#737373" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="font-sans text-xs text-neutral-500">{item.label}</span>
                        <span
                          className="font-serif italic text-sm px-2 py-0.5 border"
                          style={{ color: item.color, borderColor: item.color + "55" }}
                        >
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES — 4 dedicated demo cards     */}
      {/* ============================================================ */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="Interaction System"
            title={
              <>
                Animation &amp; Interaction{" "}
                <span className="text-[#c41e3a]">Rules</span>
              </>
            }
            accent={
              <p className="font-sans text-sm text-neutral-500 max-w-xl leading-relaxed">
                Four named interaction patterns define Film Noir. Each is slow and
                deliberate — never below 500ms on buttons, never below 700ms on
                cards. Hover each demo to feel the difference.
              </p>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── Card 1: Light Shaft Sweep ── */}
            <RevealBlock delay={0.05}>
              <div className="bg-neutral-900 border border-neutral-800 p-8 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 border border-neutral-700 px-2 py-1">
                    Pattern 1
                  </span>
                  <span className="font-serif italic text-neutral-100 text-lg">
                    Light Shaft Sweep
                  </span>
                </div>
                <p className="font-mono text-[10px] text-neutral-600 mb-2 leading-relaxed">
                  from-transparent via-white/30 to-transparent<br />
                  -translate-x-[200%] skew-x-[-20deg] &rarr; translate-x-[200%]<br />
                  transition-transform duration-700 ease-in-out
                </p>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-7">
                  A diagonal &ldquo;flashlight beam&rdquo; sweeps across the button face on
                  hover, like light cutting through a venetian blind at 20 degrees.
                  Slow and cinematic at 700ms.
                </p>
                <div className="flex items-center justify-center py-6 bg-[#0a0a0a] border border-neutral-800">
                  <button
                    type="button"
                    onMouseEnter={() => setLightShaftHovered(true)}
                    onMouseLeave={() => setLightShaftHovered(false)}
                    className="group relative overflow-hidden px-10 py-3.5 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest text-sm hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"
                    />
                    <span className="relative z-10">Hover to See Sweep</span>
                  </button>
                </div>
                <p className="font-sans text-[10px] text-neutral-600 text-center mt-3">
                  {lightShaftHovered
                    ? "Light beam sweeping — 700ms diagonal traverse"
                    : "Hover the button to trigger the light shaft"}
                </p>
              </div>
            </RevealBlock>

            {/* ── Card 2: Harsh Monochrome Swap ── */}
            <RevealBlock delay={0.1}>
              <div className="bg-neutral-900 border border-neutral-800 p-8 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 border border-neutral-700 px-2 py-1">
                    Pattern 2
                  </span>
                  <span className="font-serif italic text-neutral-100 text-lg">
                    Harsh Monochrome Swap
                  </span>
                </div>
                <p className="font-mono text-[10px] text-neutral-600 mb-2 leading-relaxed">
                  hover:bg-neutral-100 hover:text-neutral-950<br />
                  hover:border-neutral-100<br />
                  transition-colors duration-500
                </p>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-7">
                  A complete binary inversion — dark to light — not a gradual
                  shade change. Reflects 1940s film drama where scenes cut hard
                  between shadow and light. Abrupt and intentional.
                </p>
                <div className="flex items-center justify-center py-6 bg-[#0a0a0a] border border-neutral-800">
                  <button
                    type="button"
                    onMouseEnter={() => setMonochromeHovered(true)}
                    onMouseLeave={() => setMonochromeHovered(false)}
                    className="group relative overflow-hidden px-10 py-3.5 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest text-sm hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                  >
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">Hover for Inversion</span>
                  </button>
                </div>
                <p className="font-sans text-[10px] text-neutral-600 text-center mt-3">
                  {monochromeHovered
                    ? "Binary inversion active — dark becomes light"
                    : "Hover to trigger the harsh monochrome swap"}
                </p>
              </div>
            </RevealBlock>

            {/* ── Card 3: Venetian Blinds Pattern ── */}
            <RevealBlock delay={0.15}>
              <div className="bg-neutral-900 border border-neutral-800 p-8 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 border border-neutral-700 px-2 py-1">
                    Pattern 3
                  </span>
                  <span className="font-serif italic text-neutral-100 text-lg">
                    Venetian Blinds
                  </span>
                </div>
                <p className="font-mono text-[10px] text-neutral-600 mb-2 leading-relaxed">
                  repeating-linear-gradient(180deg,<br />
                  transparent 0px, transparent 4px,<br />
                  #fff 4px, #fff 6px)<br />
                  opacity-0 &rarr; group-hover:opacity-[0.06] duration-700
                </p>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-7">
                  Barely perceptible horizontal stripes appear on card hover —
                  like light filtering through half-closed window blinds in a
                  detective&apos;s office. opacity-[0.06] is intentionally faint.
                </p>
                <div
                  className="relative py-10 px-8 bg-[#0a0a0a] border border-neutral-800 overflow-hidden cursor-crosshair group"
                  onMouseEnter={() => setVenetianHovered(true)}
                  onMouseLeave={() => setVenetianHovered(false)}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none transition-opacity duration-700 noir-venetian-bg"
                    style={{ opacity: venetianHovered ? 0.06 : 0 }}
                  />
                  <div className="relative z-10 text-center">
                    <p className="font-serif italic text-neutral-300 group-hover:text-neutral-100 transition-colors duration-500">
                      Hover this card
                    </p>
                    <p className="font-sans text-xs text-neutral-600 group-hover:text-neutral-500 transition-colors duration-500 mt-1">
                      Blinds appear at 0.06 opacity
                    </p>
                  </div>
                </div>
                <p className="font-sans text-[10px] text-neutral-600 text-center mt-3">
                  {venetianHovered
                    ? "Venetian pattern active — barely visible, deliberately so"
                    : "Hover the demo card above to see the blinds appear"}
                </p>
              </div>
            </RevealBlock>

            {/* ── Card 4: Crimson Bleed ── */}
            <RevealBlock delay={0.2}>
              <div className="bg-neutral-900 border border-neutral-800 p-8 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600 border border-neutral-700 px-2 py-1">
                    Pattern 4
                  </span>
                  <span className="font-serif italic text-neutral-100 text-lg">
                    Crimson Bleed
                  </span>
                </div>
                <p className="font-mono text-[10px] text-neutral-600 mb-2 leading-relaxed">
                  w-12 h-[2px] bg-[#c41e3a]<br />
                  group-hover:w-full<br />
                  transition-all duration-700 ease-out
                </p>
                <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-7">
                  A 48px crimson line expands to full card width over 700ms on
                  hover. Simulates a film title card&apos;s crimson underline unfurling,
                  or blood slowly spreading across a surface.
                </p>
                <div
                  className="py-10 px-8 bg-[#0a0a0a] border border-neutral-800 cursor-crosshair group"
                  onMouseEnter={() => setCrimsonBleedHovered(true)}
                  onMouseLeave={() => setCrimsonBleedHovered(false)}
                >
                  <p className="font-serif italic text-lg text-neutral-300 group-hover:text-neutral-100 transition-colors duration-500 mb-2">
                    Hover this card
                  </p>
                  <p className="font-sans text-xs text-neutral-600 group-hover:text-neutral-500 transition-colors duration-500 mb-5">
                    Watch the crimson line expand to fill the full width
                  </p>
                  {/* Crimson bleed line — controlled by hover state */}
                  <div
                    aria-hidden="true"
                    className="h-[2px] bg-[#c41e3a] transition-all duration-700 ease-out"
                    style={{ width: crimsonBleedHovered ? "100%" : "48px" }}
                  />
                </div>
                <p className="font-sans text-[10px] text-neutral-600 text-center mt-3">
                  {crimsonBleedHovered
                    ? "Crimson bleeding across the full width — 700ms ease-out"
                    : "Hover the demo card above to trigger the bleed"}
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Additional interaction notes */}
          <RevealBlock delay={0.25} className="mt-10">
            <div className="bg-neutral-900 border border-neutral-800 p-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-6">
                Additional Interaction Rules
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    rule: "Tactile Confirmation",
                    code: "active:scale-[0.98]",
                    desc: "Every button must include this. Without it, buttons feel like decorative elements — broken affordance.",
                  },
                  {
                    rule: "Focus Ring Dark",
                    code: "focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950",
                    desc: "The ring-offset-neutral-950 separates the ring from the dark element, making it visible on black backgrounds.",
                  },
                  {
                    rule: "Slow Easing",
                    code: "buttons: duration-500 / cards: duration-700",
                    desc: "Noir is slow and dramatic. Never use duration below 300ms. Slowness is inherent to noir weight.",
                  },
                ].map((item) => (
                  <div key={item.rule}>
                    <p className="font-serif italic text-sm text-neutral-200 mb-2">{item.rule}</p>
                    <code className="block font-mono text-[10px] text-[#d4af37] leading-relaxed mb-3 break-all">
                      {item.code}
                    </code>
                    <p className="font-sans text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. DESIGN RULES — Do / Don't                                  */}
      {/* ============================================================ */}
      <section id="rules" className="py-28 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="The Code"
            title="Rules of Noir"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Commandments */}
            <RevealBlock delay={0.06}>
              <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 border border-neutral-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif italic text-xl text-neutral-100">Commandments</h3>
                </div>
                <ul className="space-y-4">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[10px] w-5 h-[1px] bg-neutral-600 flex-shrink-0" />
                      <span className="font-sans text-sm leading-relaxed text-neutral-400">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Prohibitions */}
            <RevealBlock delay={0.12}>
              <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 border border-[#c41e3a]/50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#c41e3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif italic text-xl text-[#c41e3a]">Prohibitions</h3>
                </div>
                <ul className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[10px] w-5 h-[1px] bg-[#c41e3a]/40 flex-shrink-0" />
                      <span className="font-sans text-sm leading-relaxed text-neutral-600 line-through decoration-[#c41e3a]/35">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Self-check panel */}
          <RevealBlock delay={0.2} className="mt-8">
            <div className="bg-neutral-900 border border-neutral-800 p-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-neutral-600 mb-6">
                Pre-Ship Self Check
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "All buttons wrapped in group class?",
                  "Light shaft sweep div inside every button?",
                  "active:scale-[0.98] on every button?",
                  "focus:ring-offset-neutral-950 on all focusable?",
                  "Cards have venetian blinds overlay?",
                  "Cards have crimson bleed line (w-12 to full)?",
                  "No animation below 300ms anywhere?",
                  "No rounded-2xl or larger corner radii?",
                  "Crimson used sparingly — not decoratively?",
                ].map((check, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 border border-neutral-700 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-neutral-700" />
                    </div>
                    <span className="font-sans text-xs text-neutral-500 leading-relaxed">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA — Ready to build in the shadows                           */}
      {/* ============================================================ */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 p-12 md:p-20 text-center">
              {/* Venetian stripes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(0,0,0,0.25) 80px, rgba(0,0,0,0.25) 82px)",
                }}
              />
              {/* Vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)" }}
              />
              {/* Spotlight */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 65%)" }}
              />
              <div className="relative z-10">
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#c41e3a] border border-[#c41e3a]/50 px-4 py-1.5 inline-block mb-8">
                  Case No. 1947
                </span>
                <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-neutral-100 mb-4 leading-[1.05]">
                  Ready to Build
                  <br />
                  <span className="text-neutral-600">in the Shadows?</span>
                </h2>
                <div aria-hidden="true" className="w-12 h-[2px] bg-[#c41e3a] mx-auto mb-8" />
                <p className="font-sans text-sm text-neutral-500 max-w-md mx-auto mb-10 leading-relaxed">
                  The Film Noir design system is fully documented and ready. Every
                  shadow, every crimson mark — all by design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    className="group relative overflow-hidden px-10 py-4 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest text-sm hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                  >
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">View Documentation</span>
                  </button>
                  <button
                    type="button"
                    className="group relative overflow-hidden px-10 py-4 bg-transparent text-neutral-300 border border-neutral-600 font-serif italic tracking-widest text-sm hover:border-neutral-200 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500"
                  >
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">Browse All Styles</span>
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FOOTER                                                     */}
      {/* ============================================================ */}
      <footer className="bg-[#0a0a0a] border-t border-neutral-800 overflow-hidden">
        {/* Crimson accent line at very top of footer */}
        <div aria-hidden="true" className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c41e3a] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-10">
          <RevealBlock>
            {/* Footer top */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
              {/* Brand block */}
              <div className="flex flex-col gap-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <span className="font-serif italic text-2xl tracking-widest text-neutral-100">
                    Film Noir
                  </span>
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] flex-shrink-0"
                  />
                </div>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                  Dramatic monochrome inspired by 1940s Hollywood. Extreme
                  contrast, slow animations, and the quiet elegance of shadow.
                </p>
                {/* Color bar */}
                <div className="flex gap-0 mt-1">
                  {["#0a0a0a", "#171717", "#262626", "#404040", "#737373", "#d4d4d4", "#f5f5f5"].map((c) => (
                    <div
                      key={c}
                      className="flex-1 h-4 border-r border-[#0a0a0a] last:border-0"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <div className="w-6 h-4" style={{ backgroundColor: "#c41e3a" }} />
                  <div className="w-6 h-4" style={{ backgroundColor: "#d4af37" }} />
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600">
                    This Style
                  </span>
                  <Link
                    href="/styles/film-noir"
                    className="font-sans text-xs text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/styles/film-noir/showcase"
                    className="font-sans text-xs text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
                  >
                    Showcase
                  </Link>
                  <Link
                    href="/styles/film-noir/cover"
                    className="font-sans text-xs text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
                  >
                    Cover
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600">
                    StyleKit
                  </span>
                  <Link
                    href="/"
                    className="font-sans text-xs text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
                  >
                    Home
                  </Link>
                  <Link
                    href="/styles"
                    className="font-sans text-xs text-neutral-500 hover:text-neutral-200 transition-colors duration-500"
                  >
                    All Styles
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-600">
                    Accents
                  </span>
                  {[
                    { label: "Crimson", hex: "#c41e3a" },
                    { label: "Gold", hex: "#d4af37" },
                    { label: "Sepia", hex: "#8b7355" },
                  ].map((a) => (
                    <span key={a.label} className="flex items-center gap-2 font-sans text-xs text-neutral-600">
                      <span className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: a.hex }} />
                      {a.label} — <span className="font-mono text-[10px]">{a.hex}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div aria-hidden="true" className="h-px bg-neutral-800 mb-8" />

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-neutral-600 text-sm">Case Closed.</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-700">
                  &middot; StyleKit &middot; Film Noir &middot; No. 1947
                </span>
              </div>
              <Link
                href="/"
                className="group relative overflow-hidden font-sans text-xs uppercase tracking-[0.22em] text-neutral-500 hover:text-neutral-100 border border-neutral-800 hover:border-neutral-600 px-5 py-2.5 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98]"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">&larr; Back to StyleKit</span>
              </Link>
            </div>

            {/* Gold type detail at very bottom */}
            <div className="mt-8 flex justify-center md:justify-start">
              <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: "#d4af37" }}>
                DESIGNED IN THE SHADOWS &bull; BUILT WITH PRECISION
              </span>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
