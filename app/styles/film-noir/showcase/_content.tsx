"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  useInView — fires once, threshold 0.15                                     */
/* ─────────────────────────────────────────────────────────────────────────── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  RevealBlock — opacity 0→1, translateY 24px→0, cubic-bezier(0.16,1,0.3,1)  */
/* ─────────────────────────────────────────────────────────────────────────── */
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Light Shaft Sweep Button                                                   */
/*  Inner div: w-1/3, bg-white/15, skew-x-[-20deg], -translate-x-[200%]       */
/*  Hover:    translate-x-[300%], duration-700, ease-in-out                    */
/* ─────────────────────────────────────────────────────────────────────────── */
function NoirButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
}) {
  const base =
    "relative overflow-hidden group inline-flex items-center gap-2 px-8 py-3 font-serif italic text-sm tracking-wider transition-all duration-300 active:scale-[0.98] cursor-pointer border focus:outline-none";

  const variants = {
    primary: "bg-[#f5f5f0] text-[#0a0a0a] border-[#f5f5f0] hover:bg-white",
    ghost: "bg-transparent text-[#f5f5f0] border-[#f5f5f0]/30 hover:border-[#f5f5f0]/70 hover:text-white",
    danger: "bg-[#c41e3a] text-[#f5f5f0] border-[#c41e3a] hover:bg-[#a01830]",
  };

  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`}>
      {/* Light Shaft Sweep — the critical interaction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-1/3 -translate-x-[200%] skew-x-[-20deg] bg-white/15 group-hover:translate-x-[300%] duration-700 ease-in-out"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Crimson Bleed line                                                         */
/*  w-12 h-[2px] bg-[#c41e3a] → group-hover:w-full duration-700               */
/* ─────────────────────────────────────────────────────────────────────────── */
function CrimsonBleed({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-12 h-[2px] bg-[#c41e3a] group-hover:w-full transition-all duration-700 ease-out ${className}`}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Venetian Blinds overlay div                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
function VenetianOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.4) 4px, rgba(0,0,0,0.4) 5px)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Data                                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
const caseFiles = [
  {
    number: "#001",
    title: "The Vanishing Witness",
    excerpt:
      "She walked into my office on a Tuesday. By Thursday, every trace of her had disappeared from the city records.",
    date: "November 1947",
    status: "Cold" as const,
  },
  {
    number: "#002",
    title: "Midnight at the Pier",
    excerpt:
      "The fog rolled in thick enough to hide a body. When it lifted, the cargo was gone and so was the captain.",
    date: "February 1948",
    status: "Active" as const,
  },
  {
    number: "#003",
    title: "The Crimson Letter",
    excerpt:
      "A single page, typed on a 1940 Remington. No fingerprints. No return address. Just an accusation.",
    date: "August 1949",
    status: "Closed" as const,
  },
  {
    number: "#004",
    title: "Shadows on Fifth Avenue",
    excerpt:
      "The photographs were taped beneath a loose floorboard — each timestamped three days before the crime.",
    date: "December 1949",
    status: "Active" as const,
  },
];

const componentTabs = [
  { key: "buttons", label: "Buttons" },
  { key: "cards", label: "Cards" },
  { key: "inputs", label: "Inputs" },
  { key: "scenes", label: "Scenes" },
] as const;

type TabKey = (typeof componentTabs)[number]["key"];

const colorPalette = [
  { name: "Void", hex: "#0a0a0a", role: "Background", light: false },
  { name: "Smoke", hex: "#1a1a1a", role: "Primary", light: false },
  { name: "Ash", hex: "#2e2e2e", role: "Surface", light: false },
  { name: "Fog", hex: "#555555", role: "Muted", light: false },
  { name: "Mist", hex: "#999999", role: "Subdued", light: false },
  { name: "Bone", hex: "#cccccc", role: "Text Light", light: true },
  { name: "Ivory", hex: "#f5f5f0", role: "Secondary", light: true },
  { name: "Crimson", hex: "#c41e3a", role: "Accent Danger", light: false },
  { name: "Sepia", hex: "#8b7355", role: "Accent Age", light: false },
  { name: "Gold", hex: "#d4af37", role: "Accent Clue", light: true },
];

const doRules = [
  "Use deep black #0a0a0a as base canvas",
  "Keep grayscale palette: black through warm white",
  "Apply font-serif italic for all headings",
  "Reserve crimson #c41e3a for danger and calls to action only",
  "Use diagonal gradients for atmospheric light shafts",
  "Keep borders thin and dark: border-[#f5f5f0]/8",
  "Include light shaft sweep on every interactive button",
  "Apply vignette to all full-bleed image panels",
];

const dontRules = [
  "No colorful or saturated backgrounds",
  "No rounded-2xl or larger corner radii",
  "No neon glow or drop-shadow effects",
  "No animation duration below 300ms",
  "No buttons without active:scale-[0.98]",
  "No gradient or colorful button fills",
  "No cartoon, cute, or playful elements",
  "No plain apostrophes inside JSX text nodes",
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CaseCard sub-component                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
function CaseCard({
  number,
  title,
  excerpt,
  date,
  status,
}: {
  number: string;
  title: string;
  excerpt: string;
  date: string;
  status: "Active" | "Cold" | "Closed";
}) {
  const statusColor =
    status === "Active"
      ? "text-[#c41e3a]"
      : status === "Closed"
        ? "text-[#d4af37]"
        : "text-[#f5f5f0]/30";

  return (
    <div className="group relative bg-[#1a1a1a] border border-[#f5f5f0]/8 p-8 overflow-hidden hover:border-[#f5f5f0]/20 transition-colors duration-700 cursor-crosshair">
      <VenetianOverlay />
      {/* Diagonal light shard */}
      <div className="absolute -top-24 -right-24 w-48 h-96 bg-gradient-to-b from-white/4 to-transparent rotate-45 group-hover:from-white/8 transition-all duration-700 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30">
            Case File {number}
          </p>
          <span className={`font-sans text-xs uppercase tracking-[0.15em] ${statusColor}`}>
            {status}
          </span>
        </div>
        <h3 className="font-serif italic text-xl text-[#f5f5f0] mb-3 group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-[#f5f5f0]/50 group-hover:text-[#f5f5f0]/70 transition-colors duration-500">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-6 mb-0">
          <span className="font-serif italic text-xs text-[#f5f5f0]/25">{date}</span>
        </div>
        <CrimsonBleed className="mt-4" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Main Showcase                                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function FilmNoirShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <style>{`
        .rain-texture {
          background-image:
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(245,245,240,0.012) 3px,
              rgba(245,245,240,0.012) 4px
            ),
            repeating-linear-gradient(
              180deg,
              transparent,
              transparent 8px,
              rgba(245,245,240,0.006) 8px,
              rgba(245,245,240,0.006) 9px
            );
        }

        .vignette-overlay {
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.8) 100%);
        }

        .clip-slide {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1.6s cubic-bezier(0.16,1,0.3,1);
        }
        .clip-slide.revealed {
          clip-path: inset(0% 0 0 0);
        }

        @keyframes marquee-noir {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-noir {
          animation: marquee-noir 32s linear infinite;
        }

        .tab-active {
          color: #f5f5f0;
          border-bottom: 2px solid #c41e3a;
        }
        .tab-inactive {
          color: rgba(245,245,240,0.35);
          border-bottom: 2px solid transparent;
        }
        .tab-inactive:hover {
          color: rgba(245,245,240,0.65);
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  1. NAV                                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#f5f5f0]/8">
        {/* Venetian texture on sticky nav bar */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/styles"
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/40 hover:text-[#c41e3a] transition-colors duration-500"
          >
            &larr; All Styles
          </Link>
          <span className="font-serif italic text-lg tracking-widest text-[#f5f5f0]">
            Film Noir
          </span>
          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="#components"
              className="font-sans text-xs uppercase tracking-[0.15em] text-[#f5f5f0]/40 hover:text-[#c41e3a] transition-colors duration-500 hidden md:inline"
            >
              Components
            </a>
            <a
              href="#palette"
              className="font-sans text-xs uppercase tracking-[0.15em] text-[#f5f5f0]/40 hover:text-[#c41e3a] transition-colors duration-500 hidden md:inline"
            >
              Palette
            </a>
            <a
              href="#rules"
              className="font-sans text-xs uppercase tracking-[0.15em] text-[#f5f5f0]/40 hover:text-[#c41e3a] transition-colors duration-500 hidden md:inline"
            >
              Rules
            </a>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] animate-pulse" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#c41e3a]">
                Case Open
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  2. HERO                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Hero background image with clip reveal */}
        <div
          className={`clip-slide ${heroRevealed ? "revealed" : ""} absolute inset-0`}
          style={{
            transform: heroRevealed ? "scale(1)" : "scale(1.1)",
            transition: "transform 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/noir_hero_1947/1920/1080?grayscale"
            alt="Film noir city at night"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.28) contrast(1.5) grayscale(100%)" }}
          />
        </div>

        {/* Rain texture */}
        <div aria-hidden="true" className="absolute inset-0 rain-texture pointer-events-none" />

        {/* Venetian blinds (structural light stripes across hero) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(0,0,0,0.22) 80px, rgba(0,0,0,0.22) 82px)",
          }}
        />

        {/* Vignette */}
        <div aria-hidden="true" className="absolute inset-0 vignette-overlay pointer-events-none" />

        {/* Spotlight from top-left */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(255,255,255,0.06) 0%, transparent 68%)",
          }}
        />

        {/* Hero copy */}
        <div className="relative z-10 text-center max-w-4xl px-6 md:px-8">
          {/* Case stamp */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.7s ease 0.3s",
            }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#c41e3a] border border-[#c41e3a]/50 px-3 py-1 inline-block mb-8">
              Case No. 1947
            </span>
          </div>

          {/* Title line 1 */}
          <h1 className="font-serif italic">
            <span
              className="block text-6xl md:text-8xl lg:text-[9rem] leading-[0.88] text-[#f5f5f0] font-bold"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
              }}
            >
              Every Shadow
            </span>
            {/* Title line 2 */}
            <span
              className="block text-6xl md:text-8xl lg:text-[9rem] leading-[0.88] font-bold"
              style={{
                color: "#c41e3a",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.62s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.62s",
              }}
            >
              Tells a Story.
            </span>
          </h1>

          {/* Crimson bleed accent under title */}
          <div
            aria-hidden="true"
            className="h-[2px] bg-[#c41e3a] mx-auto mt-8 mb-8"
            style={{
              width: heroRevealed ? "96px" : "0px",
              transition: "width 1.1s cubic-bezier(0.16,1,0.3,1) 1.1s",
            }}
          />

          {/* Tagline */}
          <p
            className="font-serif italic text-lg md:text-xl leading-relaxed text-[#f5f5f0]/60 max-w-lg mx-auto mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.95s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.95s",
            }}
          >
            Inspired by 1940s cinema. Built with extreme contrast, rain-soaked
            streets, and the quiet elegance of monochrome.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 1.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.15s",
            }}
          >
            <NoirButton variant="primary">Begin Investigation</NoirButton>
            <NoirButton variant="ghost">Read the File</NoirButton>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{
            opacity: heroRevealed ? 0.35 : 0,
            transition: "opacity 1s ease 1.6s",
          }}
        >
          <div className="w-px h-14 bg-[#f5f5f0]/40" />
          <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#f5f5f0]/30">
            Scroll
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  Ticker marquee                                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="w-full overflow-hidden border-y border-[#f5f5f0]/8 py-4 bg-[#1a1a1a]">
        <div className="flex w-[200%] marquee-noir">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex-1 flex justify-around items-center font-sans text-[10px] uppercase tracking-[0.35em] text-[#f5f5f0]/25"
            >
              <span>Shadows</span>
              <span className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Moral Ambiguity</span>
              <span className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Rain-Soaked Streets</span>
              <span className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>High Contrast</span>
              <span className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Crimson Punctuation</span>
              <span className="w-1 h-1 rounded-full bg-[#c41e3a]" />
              <span>Every Clue Matters</span>
              <span className="w-1 h-1 rounded-full bg-[#c41e3a]" />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  3. CASE FILES (archive of stories / showcase cards)          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#f5f5f0]/30 mb-3">
            The Archive
          </p>
          <h2 className="font-serif italic text-4xl md:text-6xl text-[#f5f5f0] mb-4">
            Open Case Files
          </h2>
          <div
            aria-hidden="true"
            className="w-12 h-[2px] bg-[#c41e3a] mx-auto"
          />
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseFiles.map((file, i) => (
            <RevealBlock key={file.number} delay={i * 0.11}>
              <CaseCard {...file} />
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  4. COMPONENT DEMOS — tab-switched case file folder           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="components" className="py-24 md:py-36 px-6 md:px-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#f5f5f0]/30 mb-3">
              Building Blocks
            </p>
            <h2 className="font-serif italic text-4xl md:text-6xl text-[#f5f5f0] mb-4">
              Component Gallery
            </h2>
            <div aria-hidden="true" className="w-12 h-[2px] bg-[#c41e3a] mx-auto" />
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.08} className="mb-14">
            <div className="flex flex-wrap justify-center gap-0 border-b border-[#f5f5f0]/8">
              {componentTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeTab === tab.key ? "tab-active" : "tab-inactive"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* ── Buttons tab ─────────────────────────────────────────── */}
          {activeTab === "buttons" && (
            <RevealBlock>
              <div className="space-y-14">
                {/* Primary — Light Shaft Sweep */}
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Primary — Light Shaft Sweep
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <NoirButton variant="primary">Investigate</NoirButton>
                    <NoirButton variant="ghost">Read More</NoirButton>
                    <NoirButton variant="danger">Confess</NoirButton>
                  </div>
                  <p className="mt-4 font-sans text-xs leading-relaxed text-[#f5f5f0]/25 max-w-md">
                    Each button uses a group wrapper. On hover, the inner div
                    translates from -200% to +300% with a -20deg skew, creating
                    the light-shaft-through-blinds effect.
                  </p>
                </div>

                {/* Sizes */}
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Size Variants
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <NoirButton variant="primary" className="px-4 py-2 text-xs">
                      Small
                    </NoirButton>
                    <NoirButton variant="primary">Medium</NoirButton>
                    <NoirButton variant="primary" className="px-12 py-4 text-base">
                      Large
                    </NoirButton>
                  </div>
                </div>

                {/* Icon buttons */}
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Icon Buttons
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        label: "Search",
                        path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                      },
                      {
                        label: "View",
                        path: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                      },
                    ].map((icon) => (
                      <button
                        key={icon.label}
                        type="button"
                        className="group relative w-12 h-12 bg-[#1a1a1a] border border-[#f5f5f0]/15 flex items-center justify-center text-[#f5f5f0]/60 hover:text-[#f5f5f0] hover:border-[#f5f5f0]/40 active:scale-[0.98] transition-colors duration-300 overflow-hidden"
                        aria-label={icon.label}
                      >
                        {/* Light shaft on icon buttons too */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 top-0 h-full w-1/3 -translate-x-[200%] skew-x-[-20deg] bg-white/15 group-hover:translate-x-[300%] duration-700 ease-in-out"
                        />
                        <svg
                          className="relative z-10 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={icon.path}
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ── Cards tab ───────────────────────────────────────────── */}
          {activeTab === "cards" && (
            <RevealBlock>
              <div className="space-y-14">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Case File Cards — Venetian Overlay + Crimson Bleed
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CaseCard
                      number="#101"
                      title="The Stolen Manuscript"
                      excerpt="An original Hemingway draft vanished from a locked vault. The insurance payout was three times its auction value."
                      date="March 1948"
                      status="Active"
                    />
                    <CaseCard
                      number="#102"
                      title="Harbor Lights"
                      excerpt="The lighthouse keeper saw something that night. He was willing to talk, for a price no one could afford."
                      date="June 1948"
                      status="Cold"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Evidence Card — Image + Crimson Bleed
                  </p>
                  <div className="group relative bg-[#1a1a1a] border border-[#f5f5f0]/8 overflow-hidden hover:border-[#f5f5f0]/25 transition-colors duration-700 max-w-sm cursor-pointer">
                    <VenetianOverlay />
                    <div className="relative p-6">
                      <div className="w-full aspect-[4/3] bg-[#2e2e2e] mb-6 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://picsum.photos/seed/noir_evidence/600/450?grayscale"
                          alt="Evidence photograph"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ filter: "grayscale(100%) brightness(0.65) contrast(1.2)" }}
                        />
                      </div>
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-2">
                        Evidence {"#"}A-7
                      </p>
                      <h3 className="font-serif italic text-lg text-[#f5f5f0] mb-2 group-hover:text-white transition-colors duration-500">
                        The Photograph
                      </h3>
                      <p className="font-sans text-sm leading-relaxed text-[#f5f5f0]/40 group-hover:text-[#f5f5f0]/60 transition-colors duration-500">
                        Found in the suspect{"'"}s jacket. Partially burned at the
                        edges.
                      </p>
                      <CrimsonBleed className="mt-5" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Quote Card
                  </p>
                  <div className="group relative bg-[#1a1a1a] border border-[#f5f5f0]/8 p-10 overflow-hidden hover:border-[#f5f5f0]/25 transition-colors duration-700 max-w-xl cursor-default">
                    <VenetianOverlay />
                    <div className="absolute -top-10 -left-10 w-40 h-72 bg-gradient-to-b from-white/4 to-transparent rotate-45 group-hover:from-white/8 transition-all duration-700 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="block text-[#c41e3a] text-6xl font-serif italic leading-none mb-4">
                        &ldquo;
                      </span>
                      <p className="font-serif italic text-xl leading-relaxed text-[#f5f5f0]/80 mb-6 group-hover:text-[#f5f5f0] transition-colors duration-500">
                        In this city, the truth is just another rumor that nobody
                        believes.
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-[#f5f5f0]/25" />
                        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30">
                          Detective Marlowe
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ── Inputs tab ──────────────────────────────────────────── */}
          {activeTab === "inputs" && (
            <RevealBlock>
              <div className="max-w-lg mx-auto space-y-10">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-8">
                    Subject Interrogation Form — Gold Focus Glow
                  </p>
                  <div className="space-y-7">
                    <div>
                      <label
                        htmlFor="noir-name"
                        className="block font-sans text-[10px] uppercase tracking-[0.3em] text-[#f5f5f0]/35 mb-2"
                      >
                        Subject Name
                      </label>
                      <input
                        id="noir-name"
                        type="text"
                        placeholder="Enter name..."
                        className="w-full px-0 py-3 bg-transparent border-b border-[#f5f5f0]/15 text-[#f5f5f0] font-serif italic placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-[#d4af37] transition-colors duration-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="noir-location"
                        className="block font-sans text-[10px] uppercase tracking-[0.3em] text-[#f5f5f0]/35 mb-2"
                      >
                        Last Known Location
                      </label>
                      <input
                        id="noir-location"
                        type="text"
                        placeholder="Address or district..."
                        className="w-full px-0 py-3 bg-transparent border-b border-[#f5f5f0]/15 text-[#f5f5f0] font-serif italic placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-[#d4af37] transition-colors duration-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="noir-notes"
                        className="block font-sans text-[10px] uppercase tracking-[0.3em] text-[#f5f5f0]/35 mb-2"
                      >
                        Case Notes
                      </label>
                      <textarea
                        id="noir-notes"
                        rows={4}
                        placeholder="Additional observations..."
                        className="w-full px-3 py-3 bg-[#1a1a1a] border border-[#f5f5f0]/10 text-[#f5f5f0] font-serif italic placeholder:text-[#f5f5f0]/20 focus:outline-none focus:border-[#d4af37] transition-colors duration-500 resize-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="noir-priority"
                        className="block font-sans text-[10px] uppercase tracking-[0.3em] text-[#f5f5f0]/35 mb-2"
                      >
                        Priority
                      </label>
                      <select
                        id="noir-priority"
                        className="w-full px-0 py-3 bg-transparent border-b border-[#f5f5f0]/15 text-[#f5f5f0]/60 font-serif italic focus:outline-none focus:border-[#d4af37] transition-colors duration-500 appearance-none"
                      >
                        <option value="">Select priority...</option>
                        <option value="urgent">Urgent — Red File</option>
                        <option value="high">High — Active Case</option>
                        <option value="standard">Standard — Pending Review</option>
                        <option value="cold">Cold — Archived</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-8">
                    <NoirButton variant="primary">Submit Report</NoirButton>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* ── Scenes tab ──────────────────────────────────────────── */}
          {activeTab === "scenes" && (
            <RevealBlock>
              <div className="space-y-14">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Atmospheric Scene Panels
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "The Interrogation Room",
                        sub: "Scene I",
                        gradient: "from-[#1a1a1a] via-[#0f0f0f] to-black",
                      },
                      {
                        title: "Rain on the Window",
                        sub: "Scene II",
                        gradient: "from-[#2e2e2e] via-[#111111] to-black",
                      },
                      {
                        title: "Midnight Alley",
                        sub: "Scene III",
                        gradient: "from-[#c41e3a]/12 via-[#0f0f0f] to-black",
                      },
                      {
                        title: "The Final Reveal",
                        sub: "Scene IV",
                        gradient: "from-[#d4af37]/10 via-[#0f0f0f] to-black",
                      },
                    ].map((scene) => (
                      <div
                        key={scene.title}
                        className={`group relative h-64 bg-[#0a0a0a] overflow-hidden border border-[#f5f5f0]/8 hover:border-[#f5f5f0]/20 transition-colors duration-700 cursor-crosshair`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${scene.gradient} opacity-70 group-hover:opacity-90 transition-opacity duration-700`}
                        />
                        {/* Rain texture on scenes */}
                        <div aria-hidden="true" className="absolute inset-0 rain-texture pointer-events-none" />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(0,0,0,0.25) 80px, rgba(0,0,0,0.25) 82px)",
                          }}
                        />
                        <div aria-hidden="true" className="absolute inset-0 vignette-overlay pointer-events-none" />
                        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#f5f5f0]/25 mb-3">
                            {scene.sub}
                          </p>
                          <h3 className="font-serif italic text-2xl text-[#f5f5f0] group-hover:text-white transition-colors duration-500">
                            {scene.title}
                          </h3>
                          {/* Crimson bleed in center — must be inside a group context */}
                          <div className="mt-5 h-[2px] bg-[#c41e3a] w-12 group-hover:w-24 transition-all duration-700 ease-out" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spotlight hero panel */}
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-6">
                    Spotlight Hero Panel
                  </p>
                  <div className="group relative h-80 bg-[#0a0a0a] overflow-hidden border border-[#f5f5f0]/8 hover:border-[#f5f5f0]/20 transition-colors duration-700">
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-1/3 w-[500px] h-[500px] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse, rgba(255,255,255,0.055) 0%, transparent 68%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(0,0,0,0.28) 80px, rgba(0,0,0,0.28) 82px)",
                      }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 vignette-overlay pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#f5f5f0]/25 mb-4">
                        Act Three
                      </p>
                      <h3 className="font-serif italic text-5xl text-[#f5f5f0] group-hover:text-white transition-colors duration-500">
                        The Confession
                      </h3>
                      <div className="mt-6 h-[2px] bg-[#c41e3a] w-16 group-hover:w-32 transition-all duration-700 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  5. COLOR PALETTE — Crime scene markers                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="palette" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#f5f5f0]/30 mb-3">
            The Palette
          </p>
          <h2 className="font-serif italic text-4xl md:text-6xl text-[#f5f5f0] mb-4">
            Shades of Noir
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] bg-[#c41e3a] mx-auto" />
        </RevealBlock>

        <RevealBlock delay={0.08}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-14">
            {colorPalette.map((color) => (
              <div key={color.hex} className="group cursor-default">
                <div
                  className="aspect-square border border-[#f5f5f0]/8 group-hover:border-[#f5f5f0]/25 transition-colors duration-500 relative overflow-hidden flex items-end p-3"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Venetian overlay on swatch hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.35) 4px, rgba(0,0,0,0.35) 5px)",
                    }}
                  />
                  <span
                    className={`relative z-10 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      color.light ? "text-[#0a0a0a]" : "text-[#f5f5f0]/80"
                    }`}
                  >
                    {color.hex}
                  </span>
                </div>
                <p className="font-serif italic text-sm text-[#f5f5f0]/60 mt-2">{color.name}</p>
                <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#f5f5f0]/20 mt-0.5">
                  {color.role}
                </p>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                hex: "#c41e3a",
                name: "Crimson",
                code: "#c41e3a",
                desc: "Danger. Blood. Revelation. Reserved for calls to action and warnings. Never decorative.",
              },
              {
                hex: "#8b7355",
                name: "Sepia",
                code: "#8b7355",
                desc: "Memory. Age. Evidence aged by time. Used for backgrounds, secondary accents, vintage texture.",
              },
              {
                hex: "#d4af37",
                name: "Gold",
                code: "#d4af37",
                desc: "Value. A hidden clue. The glint of something important. Focus states and highlight moments.",
              },
            ].map((accent) => (
              <div key={accent.hex} className="bg-[#1a1a1a] border border-[#f5f5f0]/8 p-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#f5f5f0]/30 mb-3">
                  Accent
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 flex-shrink-0" style={{ backgroundColor: accent.hex }} />
                  <span className="font-serif italic text-[#f5f5f0]">{accent.name}</span>
                  <span className="font-mono text-xs text-[#f5f5f0]/30 ml-auto">{accent.code}</span>
                </div>
                <p className="font-sans text-sm text-[#f5f5f0]/40 leading-relaxed">{accent.desc}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  6. DESIGN RULES — Detective notebook pages                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="rules" className="py-24 md:py-36 px-6 md:px-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#f5f5f0]/30 mb-3">
              The Code
            </p>
            <h2 className="font-serif italic text-4xl md:text-6xl text-[#f5f5f0] mb-4">
              Rules of Noir
            </h2>
            <div aria-hidden="true" className="w-12 h-[2px] bg-[#c41e3a] mx-auto" />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock delay={0.08}>
              <div>
                <h3 className="font-serif italic text-xl text-[#f5f5f0] mb-6">
                  Commandments
                </h3>
                <ul className="space-y-4">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-4 h-[2px] bg-[#f5f5f0]/40 flex-shrink-0" />
                      <span className="font-sans text-sm leading-relaxed text-[#f5f5f0]/50">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div>
                <h3 className="font-serif italic text-xl text-[#c41e3a] mb-6">
                  Prohibitions
                </h3>
                <ul className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-4 h-[2px] bg-[#c41e3a]/60 flex-shrink-0" />
                      <span className="font-sans text-sm leading-relaxed text-[#f5f5f0]/30 line-through decoration-[#c41e3a]/40">
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

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  7. CTA — Ready to build in the shadows                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock>
          <div className="relative overflow-hidden bg-[#1a1a1a] border border-[#f5f5f0]/8 p-12 md:p-20 text-center">
            <div aria-hidden="true" className="absolute inset-0 rain-texture pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-0 vignette-overlay pointer-events-none" />
            {/* Spotlight from above */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#c41e3a] border border-[#c41e3a]/40 px-3 py-1 inline-block mb-6">
                Case No. 1947
              </span>
              <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-[#f5f5f0] mb-4 leading-tight">
                Ready to Build
                <br />
                <span className="text-[#f5f5f0]/25">in the Shadows?</span>
              </h2>
              <div
                aria-hidden="true"
                className="w-12 h-[2px] bg-[#c41e3a] mx-auto mb-8"
              />
              <p className="font-sans text-sm text-[#f5f5f0]/40 max-w-md mx-auto mb-10 leading-relaxed">
                The Film Noir design system is fully documented and waiting. Every
                shadow, every crimson mark — all by design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NoirButton variant="primary">View Full Documentation</NoirButton>
                <NoirButton variant="ghost">Browse All Styles</NoirButton>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  Footer — Case Closed                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#f5f5f0]/8 py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="font-serif italic text-xl text-[#f5f5f0]/40 mb-1">
                  Case Closed.
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/20">
                  StyleKit &middot; Film Noir Showcase &middot; No. 1947
                </p>
              </div>
              <div className="flex items-center gap-6 md:gap-8">
                <Link
                  href="/styles/film-noir"
                  className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/35 hover:text-[#c41e3a] transition-colors duration-500"
                >
                  Documentation &rarr;
                </Link>
                <Link
                  href="/styles"
                  className="font-sans text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/35 hover:text-[#c41e3a] transition-colors duration-500"
                >
                  All Styles &rarr;
                </Link>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]/50" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#f5f5f0]/20">
                    Classified
                  </span>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 w-10 h-[2px] bg-[#c41e3a]/40 mx-auto md:mx-0" />
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
