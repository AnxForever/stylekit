"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView — fires once when element enters viewport                */
/* ------------------------------------------------------------------ */
function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  RevealBlock — fade + slide up on scroll into view                  */
/* ------------------------------------------------------------------ */
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_CATEGORIES = ["All", "Photos", "Art", "Design", "3D", "Motion"] as const;
type NavCategory = (typeof NAV_CATEGORIES)[number];

type MasonryCardData = {
  id: number;
  title: string;
  author: string;
  category: NavCategory;
  aspect: string;
  gradient: string;
  accentColor: string;
  saves: string;
};

const CARDS: MasonryCardData[] = [
  {
    id: 1,
    title: "Mountain Vista at Dusk",
    author: "Elena Vasquez",
    category: "Photos",
    aspect: "aspect-[3/4]",
    gradient: "from-[#e94560] via-rose-700 to-[#1a1a2e]",
    accentColor: "#e94560",
    saves: "4.2k",
  },
  {
    id: 2,
    title: "Geometric Rhythm Study",
    author: "Kian Park",
    category: "Design",
    aspect: "aspect-square",
    gradient: "from-[#7579e7] via-indigo-600 to-purple-900",
    accentColor: "#7579e7",
    saves: "2.8k",
  },
  {
    id: 3,
    title: "Emerald Forest Path",
    author: "Mia Chen",
    category: "Photos",
    aspect: "aspect-[4/5]",
    gradient: "from-[#16c79a] via-emerald-600 to-teal-900",
    accentColor: "#16c79a",
    saves: "6.1k",
  },
  {
    id: 4,
    title: "Golden Hour Drift",
    author: "Jonas Beck",
    category: "Art",
    aspect: "aspect-[2/3]",
    gradient: "from-[#ffd460] via-amber-500 to-orange-800",
    accentColor: "#ffd460",
    saves: "3.4k",
  },
  {
    id: 5,
    title: "Neon Bloom Sphere",
    author: "Priya Nair",
    category: "3D",
    aspect: "aspect-[4/3]",
    gradient: "from-cyan-400 via-sky-500 to-blue-800",
    accentColor: "#22d3ee",
    saves: "9.7k",
  },
  {
    id: 6,
    title: "Coastal Fog Light",
    author: "Soren Holt",
    category: "Photos",
    aspect: "aspect-[3/4]",
    gradient: "from-slate-300 via-sky-400 to-blue-700",
    accentColor: "#7dd3fc",
    saves: "1.9k",
  },
  {
    id: 7,
    title: "Ink Study No. 7",
    author: "Yuki Tanaka",
    category: "Art",
    aspect: "aspect-[2/3]",
    gradient: "from-zinc-300 via-zinc-500 to-zinc-900",
    accentColor: "#a1a1aa",
    saves: "5.3k",
  },
  {
    id: 8,
    title: "Motion Blur Festival",
    author: "Aida Osei",
    category: "Motion",
    aspect: "aspect-square",
    gradient: "from-[#7579e7] via-fuchsia-500 to-pink-800",
    accentColor: "#e879f9",
    saves: "7.8k",
  },
  {
    id: 9,
    title: "Paper Cut Landscape",
    author: "Liam Torres",
    category: "Design",
    aspect: "aspect-[4/5]",
    gradient: "from-red-400 via-[#e94560] to-rose-900",
    accentColor: "#e94560",
    saves: "2.2k",
  },
  {
    id: 10,
    title: "Sunset Sand Dunes",
    author: "Amara Jules",
    category: "Photos",
    aspect: "aspect-[3/4]",
    gradient: "from-[#ffd460] via-orange-400 to-amber-800",
    accentColor: "#ffd460",
    saves: "8.4k",
  },
  {
    id: 11,
    title: "Wireframe Metropolis",
    author: "Cleo Marsh",
    category: "3D",
    aspect: "aspect-[5/4]",
    gradient: "from-slate-200 via-slate-400 to-[#1a1a2e]",
    accentColor: "#7579e7",
    saves: "3.0k",
  },
  {
    id: 12,
    title: "Flora Study — Spring",
    author: "Ravi Menon",
    category: "Art",
    aspect: "aspect-[2/3]",
    gradient: "from-lime-300 via-[#16c79a] to-green-800",
    accentColor: "#16c79a",
    saves: "4.9k",
  },
];

const COLOR_PALETTE = [
  {
    name: "Night Primary",
    hex: "#1a1a2e",
    role: "Background, nav, dark surfaces",
    textColor: "#ffffff",
  },
  {
    name: "Parchment",
    hex: "#f5f5f5",
    role: "Page background, light surfaces",
    textColor: "#1a1a2e",
  },
  {
    name: "Coral Rose",
    hex: "#e94560",
    role: "Accent, CTA, active state",
    textColor: "#ffffff",
  },
  {
    name: "Emerald Mint",
    hex: "#16c79a",
    role: "Success, do-state, secondary accent",
    textColor: "#ffffff",
  },
  {
    name: "Sunshine Amber",
    hex: "#ffd460",
    role: "Highlight, warm accent",
    textColor: "#1a1a2e",
  },
  {
    name: "Lavender Violet",
    hex: "#7579e7",
    role: "Art/3D accent, creative tone",
    textColor: "#ffffff",
  },
];

const DO_RULES = [
  {
    rule: "CSS columns for natural masonry flow",
    detail:
      "Use columns-1 sm:columns-2 lg:columns-3 xl:columns-4 — the browser distributes cards into columns optimally.",
  },
  {
    rule: "break-inside-avoid on every card",
    detail:
      "Without this, cards split across column boundaries, breaking image continuity and visual rhythm.",
  },
  {
    rule: "Confined Zoom behind overflow-hidden",
    detail:
      "Wrap image in overflow-hidden rounded-2xl, then group-hover:scale-105 on the img. The image zooms; the card edge stays crisp.",
  },
  {
    rule: "Overlay Reveal at duration-300",
    detail:
      "Action buttons translate-y-4 opacity-0 base state, group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300.",
  },
  {
    rule: "Subtle Elevation: -translate-y-1 + diffuse shadow",
    detail:
      "hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] is enough. The card breathes, not leaps.",
  },
  {
    rule: "Filter buttons at duration-200",
    detail:
      "Category pills should feel snappy. 200ms is the right balance between immediate and graceful.",
  },
];

const DONT_RULES = [
  {
    rule: "Force equal card heights",
    detail:
      "min-h or fixed-height on cards destroys the waterfall rhythm. Content height must drive layout.",
  },
  {
    rule: "Let images break overflow-hidden",
    detail:
      "Any transform on a card that has overflow-hidden must be applied to the inner image, not the card itself — or you create clipping artifacts.",
  },
  {
    rule: "Hard hover borders",
    detail:
      "Adding border-2 border-accent on hover introduces layout shift and visual harshness. Use shadow instead.",
  },
  {
    rule: "Too many columns on mobile",
    detail:
      "columns-3 on 375px screens creates cards too narrow for overlay text or action buttons to fit legibly.",
  },
  {
    rule: "Translate more than -translate-y-1 on card hover",
    detail:
      "Cards jumping -translate-y-4 or more create an anxious, incoherent grid. One rem of lift is the ceiling.",
  },
  {
    rule: "Inconsistent gap sizes across breakpoints",
    detail:
      "gap-2 on mobile and gap-8 on desktop creates an inconsistent rhythm that distracts from content.",
  },
];

/* ------------------------------------------------------------------ */
/*  MasonryCard sub-component                                          */
/* ------------------------------------------------------------------ */

function MasonryCard({ card }: { card: MasonryCardData }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group break-inside-avoid mb-4 cursor-pointer">
      {/* Outer wrapper: Subtle Elevation */}
      <div className="rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out">
        {/* Image area: Confined Zoom */}
        <div className="relative overflow-hidden">
          <div
            className={`w-full ${card.aspect} bg-gradient-to-br ${card.gradient} group-hover:scale-105 transition-transform duration-700 ease-out`}
          >
            {/* Faint grid texture overlay for depth */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Category badge top-left */}
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-black/30 text-white backdrop-blur-sm">
              {card.category}
            </span>
          </div>

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Overlay Reveal: action buttons */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSaved((s) => !s);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-zinc-900 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white active:scale-95"
            >
              <svg
                className="w-3.5 h-3.5"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: saved ? "#e94560" : "currentColor" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#e94560] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-[30ms] hover:bg-[#d13a53] active:scale-95"
            >
              View
            </button>
          </div>
        </div>

        {/* Card footer */}
        <div className="bg-white px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 leading-tight group-hover:text-[#e94560] transition-colors duration-200">
              {card.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{card.author}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-400 shrink-0 ml-3">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            {card.saves}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FilterPill sub-component                                           */
/* ------------------------------------------------------------------ */

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${
        active
          ? "bg-[#1a1a2e] text-white shadow-sm"
          : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero masonry grid illustration                                     */
/* ------------------------------------------------------------------ */

function HeroMasonryIllustration({ revealed }: { revealed: boolean }) {
  // A static decorative masonry block layout using colored divs at varying heights
  const blocks = [
    // Column 1
    { col: 1, h: "h-36", gradient: "from-[#e94560] to-rose-700", delay: 600 },
    { col: 1, h: "h-24", gradient: "from-[#7579e7] to-indigo-700", delay: 700 },
    { col: 1, h: "h-44", gradient: "from-[#16c79a] to-teal-700", delay: 800 },
    // Column 2
    { col: 2, h: "h-52", gradient: "from-[#ffd460] to-amber-600", delay: 650 },
    { col: 2, h: "h-32", gradient: "from-cyan-400 to-blue-600", delay: 750 },
    { col: 2, h: "h-28", gradient: "from-[#e94560] to-pink-700", delay: 850 },
    // Column 3
    { col: 3, h: "h-28", gradient: "from-[#16c79a] to-emerald-700", delay: 700 },
    { col: 3, h: "h-48", gradient: "from-[#7579e7] to-purple-800", delay: 800 },
    { col: 3, h: "h-20", gradient: "from-[#ffd460] to-orange-600", delay: 900 },
  ];

  const col1 = blocks.filter((b) => b.col === 1);
  const col2 = blocks.filter((b) => b.col === 2);
  const col3 = blocks.filter((b) => b.col === 3);

  const BlockItem = ({ b }: { b: (typeof blocks)[0] }) => (
    <div
      className={`w-full ${b.h} rounded-xl bg-gradient-to-br ${b.gradient} flex-shrink-0`}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${b.delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${b.delay}ms`,
      }}
    />
  );

  return (
    <div className="flex gap-3 w-full max-w-xs mx-auto md:max-w-sm">
      {/* Column 1 */}
      <div className="flex flex-col gap-3 flex-1">
        {col1.map((b, i) => (
          <BlockItem key={i} b={b} />
        ))}
      </div>
      {/* Column 2 */}
      <div className="flex flex-col gap-3 flex-1">
        {col2.map((b, i) => (
          <BlockItem key={i} b={b} />
        ))}
      </div>
      {/* Column 3 */}
      <div className="flex flex-col gap-3 flex-1">
        {col3.map((b, i) => (
          <BlockItem key={i} b={b} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<NavCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);

  // heroRevealed pattern
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Nav scroll shadow
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter cards
  const filteredCards =
    activeFilter === "All" ? CARDS : CARDS.filter((c) => c.category === activeFilter);

  /* -------- Hero useInView refs -------- */
  const { ref: heroGridRef, inView: heroGridInView } = useInView();

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a2e] font-sans">
      <style>{`
        @keyframes mf-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mf-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(233,69,96,0.4); }
          70%  { box-shadow: 0 0 0 10px rgba(233,69,96,0); }
          100% { box-shadow: 0 0 0 0 rgba(233,69,96,0); }
        }
      `}</style>

      {/* ================================================================ */}
      {/*  SECTION 1: Fixed Navigation                                    */}
      {/* ================================================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled
            ? "bg-[#1a1a2e]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
            : "bg-[#1a1a2e]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* Icon mark */}
              <div className="w-8 h-8 rounded-lg bg-[#e94560] flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h4v14H4zM10 3h4v17h-4zM16 8h4v12h-4z"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Masonry Flow</span>
            </div>

            {/* Category pills */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-[#e94560] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Right: back link */}
            <Link
              href="/styles/masonry-flow"
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">StyleKit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/*  SECTION 2: Hero                                                 */}
      {/* ================================================================ */}
      <section className="relative min-h-screen bg-[#1a1a2e] flex items-center overflow-hidden pt-16">
        {/* Background noise/grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft color blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(233,69,96,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(117,121,231,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div>
              <div
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0ms",
                }}
              >
                <span className="inline-flex items-center gap-2 text-[#e94560] text-xs font-semibold tracking-widest uppercase mb-6">
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-[#e94560]"
                    style={{ animation: "mf-pulse-ring 2s ease-out infinite" }}
                  />
                  Pinterest-Style Layout System
                </span>
              </div>

              <h1 className="text-white font-bold leading-[1.0] tracking-tight mb-6">
                <span
                  className="block text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                    transition:
                      "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 80ms",
                  }}
                >
                  Masonry
                </span>
                <span
                  className="block text-5xl md:text-6xl lg:text-7xl text-[#e94560]"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                    transition:
                      "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 160ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 160ms",
                  }}
                >
                  Flow.
                </span>
              </h1>

              <p
                className="text-white/50 text-base md:text-lg leading-relaxed mb-8 max-w-md"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 280ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 280ms",
                }}
              >
                A waterfall card layout where content height drives visual rhythm. Natural columns,
                maximum space efficiency, and infinite scroll potential.
              </p>

              {/* Search bar */}
              <div
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 380ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 380ms",
                }}
              >
                <div className="relative max-w-sm">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the gallery..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white/8 border border-white/10 rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e94560]/50 focus:bg-white/12 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                </div>
                <p className="text-white/25 text-xs mt-2 pl-1">
                  {searchQuery
                    ? `Showing results for "${searchQuery}"`
                    : "Try: Mountain, Flora, Motion..."}
                </p>
              </div>

              {/* Stats row */}
              <div
                className="flex gap-8 mt-10"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 480ms",
                }}
              >
                {[
                  { value: "12+", label: "Card types" },
                  { value: "6", label: "Accent colors" },
                  { value: "4", label: "Column variants" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-white font-bold text-2xl leading-none">{stat.value}</p>
                    <p className="text-white/40 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Masonry illustration */}
            <div
              ref={heroGridRef}
              className="relative"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            >
              <HeroMasonryIllustration revealed={heroRevealed} />
              {/* Glow behind illustration */}
              <div
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(233,69,96,0.08) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom fade to page bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #f5f5f5)",
          }}
        />
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3: Live Masonry Demo                                   */}
      {/* ================================================================ */}
      <section className="pt-4 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Section header */}
        <RevealBlock className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#e94560] mb-2">
                Live Demo
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                The Gallery
              </h2>
              <p className="text-zinc-500 text-sm mt-2">
                Real CSS columns masonry — varying card heights, hover physics, overlay reveals.
              </p>
            </div>
            <p className="text-xs text-zinc-400 pb-1">
              {filteredCards.length} pins
            </p>
          </div>
        </RevealBlock>

        {/* Filter tabs */}
        <RevealBlock delay={80} className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {NAV_CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              />
            ))}
          </div>
        </RevealBlock>

        {/* Masonry grid — CSS columns */}
        <RevealBlock delay={120}>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => <MasonryCard key={card.id} card={card} />)
            ) : (
              <div className="col-span-full py-20 text-center text-zinc-400 text-sm">
                No pins in this category yet.
              </div>
            )}
          </div>
        </RevealBlock>

        {/* Load More */}
        <RevealBlock delay={160} className="mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a2e] text-white rounded-full font-semibold text-sm hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(26,26,46,0.25)] active:scale-[0.97] active:translate-y-0 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Load More
          </button>
          <p className="text-zinc-400 text-xs mt-3">Infinite scroll pattern — load on demand</p>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 4: Component Showcase                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#16c79a] mb-2">
              Component Library
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Building Blocks
            </h2>
            <p className="text-zinc-500 text-sm max-w-md">
              Every interactive element in Masonry Flow — buttons, pills, card variants.
            </p>
          </RevealBlock>

          <div className="space-y-16">
            {/* Buttons */}
            <RevealBlock>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-5">
                Buttons
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] text-white rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(26,26,46,0.2)] active:scale-[0.97] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Load More
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e94560] text-white rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(233,69,96,0.3)] active:scale-[0.97] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-900 rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] active:scale-[0.97] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#16c79a] text-white rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(22,199,154,0.3)] active:scale-[0.97] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Pin
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#7579e7] text-white rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(117,121,231,0.3)] active:scale-[0.97] transition-all duration-200"
                >
                  Follow
                </button>
              </div>
            </RevealBlock>

            {/* Filter Pills */}
            <RevealBlock delay={60}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-5">
                Filter Pills — Action Snappiness (duration-200)
              </h3>
              <div className="flex flex-wrap gap-2">
                {["All", "Photos", "Art", "Design", "3D", "Motion", "Architecture", "Food", "Travel", "Fashion"].map(
                  (cat, i) => (
                    <span
                      key={cat}
                      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                        i === 0
                          ? "bg-[#1a1a2e] text-white"
                          : i === 2
                          ? "bg-[#e94560] text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {cat}
                    </span>
                  )
                )}
              </div>
            </RevealBlock>

            {/* Card Variants */}
            <RevealBlock delay={80}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-5">
                Card Aspect Variants
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { label: "3:4 Portrait", aspect: "aspect-[3/4]", gradient: "from-[#e94560] to-rose-800" },
                  { label: "Square", aspect: "aspect-square", gradient: "from-[#7579e7] to-indigo-800" },
                  { label: "4:5", aspect: "aspect-[4/5]", gradient: "from-[#16c79a] to-teal-800" },
                  { label: "2:3 Tall", aspect: "aspect-[2/3]", gradient: "from-[#ffd460] to-amber-700" },
                  { label: "4:3 Wide", aspect: "aspect-[4/3]", gradient: "from-cyan-400 to-blue-700" },
                ].map((v) => (
                  <div key={v.label} className="group cursor-pointer">
                    <div
                      className={`w-full ${v.aspect} rounded-xl bg-gradient-to-br ${v.gradient} group-hover:scale-[1.03] transition-transform duration-300 ease-out`}
                    />
                    <p className="text-xs text-zinc-500 mt-2 text-center">{v.label}</p>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Input */}
            <RevealBlock delay={100}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-5">
                Search Input
              </h3>
              <div className="max-w-sm relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search pins, boards, people..."
                  className="w-full pl-11 pr-4 py-3 bg-zinc-100 rounded-full text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:bg-white transition-all duration-200 border border-transparent focus:border-[#e94560]/30"
                />
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 5: Color Palette                                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#ffd460] mb-2">
              Color System
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              The Palette
            </h2>
            <p className="text-zinc-500 text-sm max-w-md">
              Dark primary grounded by vivid accents. Each color has a specific role in the
              hierarchy — not decoration, but function.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COLOR_PALETTE.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 60}>
                <div className="group rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer">
                  {/* Swatch */}
                  <div
                    className="h-28 md:h-36 flex flex-col justify-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-[10px] font-mono font-bold opacity-60"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  {/* Label */}
                  <div className="bg-white p-3">
                    <p className="text-sm font-semibold text-zinc-900 leading-tight">
                      {color.name}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{color.role}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient preview row */}
          <RevealBlock delay={200} className="mt-10">
            <div className="rounded-2xl overflow-hidden h-16 flex">
              {COLOR_PALETTE.map((color) => (
                <div
                  key={color.hex}
                  className="flex-1 hover:flex-[2] transition-all duration-500 ease-out cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-400 mt-2 text-center">
              Hover each band to expand — all 6 palette colors together
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 6: Design Rules                                        */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7579e7] mb-2">
              Design System
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Rules of the Grid
            </h2>
            <p className="text-zinc-500 text-sm max-w-md">
              Masonry is deceptively simple. These constraints are what separate a gallery that
              breathes from one that buckles.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock>
              <div className="bg-[#f0fdf9] border border-[#16c79a]/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-8 h-8 rounded-full bg-[#16c79a] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900">Do</h3>
                </div>
                <ul className="space-y-5">
                  {DO_RULES.map((r) => (
                    <li key={r.rule} className="flex items-start gap-3">
                      <span className="mt-1 w-4 h-4 rounded-full bg-[#16c79a]/15 flex items-center justify-center shrink-0">
                        <span className="text-[#16c79a] text-[10px] font-bold">+</span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-800">{r.rule}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{r.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={120}>
              <div className="bg-[#fff5f6] border border-[#e94560]/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900">Don&apos;t</h3>
                </div>
                <ul className="space-y-5">
                  {DONT_RULES.map((r) => (
                    <li key={r.rule} className="flex items-start gap-3">
                      <span className="mt-1 w-4 h-4 rounded-full bg-[#e94560]/12 flex items-center justify-center shrink-0">
                        <span className="text-[#e94560] text-[10px] font-bold">-</span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-800">{r.rule}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{r.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Physics reference cards */}
          <RevealBlock delay={160} className="mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-6">
              Interaction Physics Quick Reference
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "Confined Zoom",
                  code: "group-hover:scale-105\nduration-700 ease-out",
                  note: "On image inside overflow-hidden",
                  color: "#e94560",
                },
                {
                  name: "Subtle Elevation",
                  code: "hover:-translate-y-1\nhover:shadow-[0_15px_30px\nrgba(0,0,0,0.08)]",
                  note: "On the card wrapper",
                  color: "#16c79a",
                },
                {
                  name: "Overlay Reveal",
                  code: "translate-y-4 opacity-0\ngroup-hover:translate-y-0\ngroup-hover:opacity-100\nduration-300",
                  note: "On overlay action buttons",
                  color: "#ffd460",
                },
                {
                  name: "Action Snappiness",
                  code: "transition-all\nduration-200",
                  note: "On filter pill clicks only",
                  color: "#7579e7",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
                >
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-sm font-semibold text-zinc-900 mb-2">{item.name}</p>
                  <pre className="text-[10px] text-zinc-500 font-mono leading-relaxed mb-2 whitespace-pre-wrap">
                    {item.code}
                  </pre>
                  <p className="text-[11px] text-zinc-400 italic">{item.note}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 7: CTA + Footer                                        */}
      {/* ================================================================ */}
      <footer className="bg-[#1a1a2e]">
        {/* CTA band */}
        <div className="border-b border-white/8 py-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <RevealBlock>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#e94560] mb-3">
                Get started
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-lg">
                Build your own
                <br />
                <span className="text-[#e94560]">Masonry Flow</span> gallery.
              </h2>
            </RevealBlock>
            <RevealBlock delay={120} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/styles/masonry-flow"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#e94560] text-white rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(233,69,96,0.35)] active:scale-[0.97] transition-all duration-200"
              >
                View Docs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                href="/styles"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/8 text-white/80 rounded-full font-semibold text-sm hover:bg-white/15 hover:text-white active:scale-[0.97] transition-all duration-200 border border-white/10"
              >
                Browse All Styles
              </Link>
            </RevealBlock>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="py-8 px-6 md:px-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-[#e94560] flex items-center justify-center shrink-0">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h4v14H4zM10 3h4v17h-4zM16 8h4v12h-4z"
                  />
                </svg>
              </div>
              <span className="text-white/40 text-xs">
                StyleKit &mdash; Masonry Flow Showcase
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/styles/masonry-flow"
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                All Styles
              </Link>
              <span className="text-xs text-white/20">
                2026 StyleKit
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
