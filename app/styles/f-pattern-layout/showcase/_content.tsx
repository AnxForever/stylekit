"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hook — ZERO @/components/showcase imports                   */
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
/*  Color constants                                                     */
/* ------------------------------------------------------------------ */

const PRIMARY = "#1a1a2e";
const SECONDARY = "#f8f9fa";
const RED = "#e63946";
const BLUE = "#457b9d";
const TEAL = "#2a9d8f";
const YELLOW = "#e9c46a";
const WHITE_BG = "#ffffff";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ComponentTab = "buttons" | "article-cards" | "search" | "category-tags";
type DemoMode = "desktop" | "mobile";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const colorSwatches = [
  { name: "Dark Navy", hex: PRIMARY, label: "Primary", border: false },
  { name: "Light Gray", hex: SECONDARY, label: "Secondary", border: true },
  { name: "Accent Red", hex: RED, label: "Accent 1", border: false },
  { name: "Accent Blue", hex: BLUE, label: "Accent 2", border: false },
  { name: "Accent Teal", hex: TEAL, label: "Accent 3", border: false },
  { name: "Accent Yellow", hex: YELLOW, label: "Accent 4", border: false },
];

const articleItems = [
  {
    category: "Technology",
    categoryColor: BLUE,
    title: "How Eye-Tracking Research Shaped Modern Web Design Patterns",
    summary:
      "Nielsen Norman Group's seminal studies revealed users read web content in an F-shaped pattern. Learn how this insight transforms layout decisions.",
    author: "Sarah Chen",
    date: "Feb 20, 2026",
    readTime: "8 min read",
    image: BLUE,
  },
  {
    category: "Design",
    categoryColor: TEAL,
    title: "Content Hierarchy and the First Horizontal Scan Line",
    summary:
      "The first horizontal stroke of the F receives the most attention. Discover why your headline placement determines engagement rates.",
    author: "Marcus Webb",
    date: "Feb 18, 2026",
    readTime: "5 min read",
    image: TEAL,
  },
  {
    category: "UX Research",
    categoryColor: RED,
    title: "When to Break the F-Pattern: Exceptions and Alternatives",
    summary:
      "Not every content type benefits from an F-layout. We examine when Z-pattern, gutenberg diagram, or layer cake approaches serve better.",
    author: "Priya Nair",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    image: RED,
  },
  {
    category: "Performance",
    categoryColor: "#b45309",
    title: "Optimizing Scan Speed: Typography Choices for F-Pattern Layouts",
    summary:
      "Line length, font weight, and leading all affect how fast a user completes each horizontal stroke. Data from 12 publications.",
    author: "Tom Fischer",
    date: "Feb 12, 2026",
    readTime: "4 min read",
    image: YELLOW,
  },
];

const fStrokeData = [
  {
    stroke: "First Horizontal Stroke",
    number: "01",
    color: RED,
    width: "100%",
    description:
      "The full-width top sweep captures headline, logo, and primary navigation. Users allocate the most attention here. Place your highest-priority content in this zone.",
    placement: "Logo, Primary Nav, Featured Headline",
    tailwindHint: "w-full border-b border-gray-200 py-4",
  },
  {
    stroke: "Second Horizontal Stroke",
    number: "02",
    color: BLUE,
    width: "75%",
    description:
      "A shorter second pass slightly below — users have already reduced focus. Content that extends past 75% of the width often goes unread.",
    placement: "Category Tags, Search, Secondary Nav",
    tailwindHint: "w-3/4 border-b border-gray-100 py-3",
  },
  {
    stroke: "Vertical Stroke",
    number: "03",
    color: TEAL,
    width: "33%",
    description:
      "The leftmost vertical column scan — users skim down the left edge after horizontal passes. Article titles, timestamps, and list item beginnings live here.",
    placement: "Article List (left edge), Timestamps, Lead Text",
    tailwindHint: "border-l-4 pl-4 flex-1 space-y-4",
  },
];

const doRules = [
  "Place most important content at top (first horizontal stroke)",
  "Keep left edge populated — users scan left margin vertically",
  "Use clear heading hierarchy: h1 > h2 > h3",
  "Use bullet lists and short paragraphs for scannability",
  "Align all body text to the left (text-left)",
  "Limit line width with max-w-prose for readable measure",
  "Put primary CTA within the first two horizontal strokes",
  "Use visual weight to guide — bold text at line starts",
];

const dontRules = [
  "Never place critical content in the right-lower quadrant",
  "Never center-align large blocks of body text",
  "Never ignore content priority in placement decisions",
  "Never use long unbroken paragraphs — they kill scan speed",
  "Never leave the left margin under-utilized",
  "Never put a CTA below all three strokes without a reason",
  "Never rely on right-side content for first impressions",
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function FStrokeVisual() {
  return (
    <svg
      viewBox="0 0 240 300"
      className="w-full max-w-xs"
      aria-label="F-pattern eye tracking path visualization"
    >
      {/* Background page shape */}
      <rect x="10" y="10" width="220" height="280" rx="4" fill={SECONDARY} stroke="#e5e7eb" strokeWidth="1" />

      {/* First horizontal stroke — full width, top */}
      <rect x="20" y="30" width="200" height="28" rx="3" fill={RED} opacity="0.85" />
      <text x="28" y="49" fontSize="10" fill="white" fontWeight="600">
        First Horizontal Stroke
      </text>

      {/* Second horizontal stroke — 75% width */}
      <rect x="20" y="78" width="150" height="22" rx="3" fill={BLUE} opacity="0.8" />
      <text x="28" y="93" fontSize="9" fill="white" fontWeight="600">
        Second Stroke (75%)
      </text>

      {/* Vertical stroke — left column */}
      <rect x="20" y="118" width="55" height="148" rx="3" fill={TEAL} opacity="0.75" />
      <text
        x="47"
        y="145"
        fontSize="8"
        fill="white"
        fontWeight="600"
        textAnchor="middle"
      >
        Vertical
      </text>
      <text
        x="47"
        y="157"
        fontSize="8"
        fill="white"
        fontWeight="600"
        textAnchor="middle"
      >
        Stroke
      </text>

      {/* Content area — right of vertical */}
      <rect x="84" y="118" width="146" height="148" rx="3" fill="#e5e7eb" opacity="0.5" />

      {/* Simulated content lines */}
      {[130, 148, 166, 184, 202, 220, 238, 254].map((y, i) => (
        <rect
          key={y}
          x="92"
          y={y}
          width={i % 3 === 2 ? 80 : 130}
          height="6"
          rx="2"
          fill="#9ca3af"
          opacity="0.6"
        />
      ))}

      {/* Eye path arrows overlaid */}
      <path
        d="M 28 44 L 200 44"
        stroke={RED}
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#arrowRed)"
      />
      <path
        d="M 28 89 L 148 89"
        stroke={BLUE}
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#arrowBlue)"
      />
      <path
        d="M 47 118 L 47 265"
        stroke={TEAL}
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#arrowTeal)"
      />

      {/* Arrow marker defs */}
      <defs>
        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={RED} />
        </marker>
        <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={BLUE} />
        </marker>
        <marker id="arrowTeal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={TEAL} />
        </marker>
      </defs>

      <text x="120" y="20" fontSize="9" fill="#6b7280" textAnchor="middle" fontWeight="500">
        Eye-Tracking Heatmap
      </text>
    </svg>
  );
}

function FLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="F-pattern logo">
      {/* Vertical bar */}
      <rect x="8" y="6" width="8" height="36" rx="2" fill={PRIMARY} />
      {/* Top horizontal bar */}
      <rect x="8" y="6" width="30" height="8" rx="2" fill={RED} />
      {/* Middle horizontal bar (shorter) */}
      <rect x="8" y="20" width="22" height="7" rx="2" fill={BLUE} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [demoMode, setDemoMode] = useState<DemoMode>("desktop");
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeStroke, setActiveStroke] = useState<number | null>(null);
  const [slowFastToggle, setSlowFastToggle] = useState<"slow" | "fast" | null>(null);
  const [contrastHovered, setContrastHovered] = useState(false);
  const [imageFocusHovered, setImageFocusHovered] = useState(false);
  const [eyeTrackingHovered, setEyeTrackingHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen font-sans text-gray-800 overflow-x-hidden"
      style={{ backgroundColor: SECONDARY }}
    >
      <style>{`
        @keyframes f-slide-in {
          0% { opacity: 0; transform: translateX(-12px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .f-slide-in-anim {
          animation: f-slide-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      {/* ============================================================== */}
      {/* 1. FIXED STICKY NAV                                            */}
      {/* ============================================================== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80"
        style={{ boxShadow: "0 1px 12px rgba(26,26,46,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Logo + style name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-medium transition-colors duration-150"
            style={{ color: PRIMARY }}
          >
            <span className="text-base leading-none" style={{ color: PRIMARY }}>
              &larr;
            </span>
            <FLogo size={28} />
            <span className="hidden sm:inline font-semibold">F-Pattern Layout</span>
          </Link>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {["Hero", "Live Demo", "Anatomy", "Components", "Rules"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-all duration-150"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/styles"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: RED }}
          >
            See All Styles
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO — F-pattern overlay visualization + eye-tracking path  */}
      {/* ============================================================== */}
      <section className="relative pt-28 md:pt-36 pb-20 px-5 md:px-10 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Left: copy */}
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
                }}
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{ backgroundColor: `${RED}15`, color: RED }}
                >
                  Eye-Tracking Research
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-left"
                style={{
                  color: PRIMARY,
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                F-Pattern
                <br />
                <span style={{ color: RED }}>Layout</span>
              </h1>

              {/* Sub */}
              <p
                className="text-gray-600 text-lg leading-relaxed max-w-md mb-8 text-left"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(18px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Based on Nielsen Norman Group eye-tracking research. Users scan the
                top horizontally, drop down for a second shorter scan, then skim
                vertically down the left edge — forming an{" "}
                <strong style={{ color: PRIMARY }}>F-shape</strong>.
              </p>

              {/* F-stroke legend */}
              <div
                className="flex flex-col gap-3 mb-8"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                {[
                  { color: RED, label: "Stroke 1 — Full-width top scan (highest attention)" },
                  { color: BLUE, label: "Stroke 2 — Shorter secondary scan (~75% width)" },
                  { color: TEAL, label: "Stroke 3 — Left-edge vertical skim" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-8 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 gap-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
                }}
              >
                {[
                  { value: "232", label: "Users Studied", color: RED },
                  { value: "F", label: "Scan Shape", color: BLUE },
                  { value: "80%", label: "Content Left", color: TEAL },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                  >
                    <div className="text-2xl font-bold mb-0.5" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: F-shape SVG visualization */}
            <div
              className="flex flex-col items-center gap-6"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <FStrokeVisual />
              <p className="text-xs text-gray-400 text-center max-w-xs leading-relaxed">
                Red = highest attention, Blue = moderate, Teal = lightest. The right
                side below stroke 2 receives almost no engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LIVE DEMO — news article layout with desktop/mobile toggle  */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-3"
              style={{ color: BLUE }}
            >
              Live Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: PRIMARY }}>
              F-Pattern in action
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              A news article listing built on F-pattern principles. Toggle between desktop
              and mobile to see how the layout adapts while preserving scan hierarchy.
            </p>
          </RevealBlock>

          {/* Toggle */}
          <RevealBlock delay={0.08} className="mb-6">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              {(["desktop", "mobile"] as DemoMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDemoMode(mode)}
                  className="px-5 py-2 rounded-md text-sm font-medium capitalize transition-all duration-150"
                  style={{
                    backgroundColor: demoMode === mode ? WHITE_BG : "transparent",
                    color: demoMode === mode ? PRIMARY : "#6b7280",
                    boxShadow: demoMode === mode ? "0 1px 4px rgba(26,26,46,0.1)" : "none",
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            <div
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(26,26,46,0.08)" }}
            >
              {demoMode === "desktop" ? (
                /* Desktop layout */
                <div>
                  {/* Top bar — stroke 1 */}
                  <div
                    className="px-6 py-4 border-b border-gray-100"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <div className="flex items-center justify-between max-w-5xl mx-auto">
                      <div className="flex items-center gap-3">
                        <FLogo size={28} />
                        <span className="text-white font-bold text-lg">EditorialPress</span>
                      </div>
                      <nav className="flex items-center gap-6 text-sm text-gray-300">
                        {["World", "Technology", "Design", "Science", "About"].map((n) => (
                          <span key={n} className="hover:text-white cursor-pointer transition-colors duration-150">
                            {n}
                          </span>
                        ))}
                      </nav>
                      <button
                        className="px-4 py-1.5 rounded-md text-sm font-medium text-white transition-all duration-150 hover:opacity-90"
                        style={{ backgroundColor: RED }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>

                  {/* Featured story — stroke 1 continuation */}
                  <div
                    className="px-6 py-8 border-b border-gray-100"
                    style={{ backgroundColor: `${PRIMARY}08` }}
                  >
                    <div className="max-w-5xl mx-auto">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <span
                            className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                            style={{ color: RED }}
                          >
                            Featured
                          </span>
                          <h2 className="text-2xl font-bold mb-3 leading-tight" style={{ color: PRIMARY }}>
                            F-Pattern Research Celebrates 20 Years: How One Study
                            Redesigned the Internet
                          </h2>
                          <p className="text-gray-500 text-sm leading-relaxed max-w-prose">
                            The 2006 Nielsen Norman Group eye-tracking study changed how
                            designers think about content placement forever. Two decades later,
                            the F-pattern remains the most cited layout principle in UX.
                          </p>
                        </div>
                        <div
                          className="w-48 h-32 rounded-lg flex-shrink-0 hidden md:flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: `${RED}15` }}
                        >
                          <FStrokeVisual />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary bar — stroke 2 */}
                  <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="max-w-5xl mx-auto flex items-center gap-4">
                      <div
                        className="flex items-center gap-2 flex-1 max-w-xs px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-400"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        Search articles...
                      </div>
                      <div className="flex items-center gap-2">
                        {["All", "Tech", "Design", "Science"].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-150"
                            style={{
                              backgroundColor: tag === "All" ? PRIMARY : "white",
                              color: tag === "All" ? "white" : "#6b7280",
                              border: tag !== "All" ? "1px solid #e5e7eb" : "none",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Article list — vertical stroke */}
                  <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex gap-6">
                      <main className="flex-1">
                        {articleItems.map((article, i) => (
                          <div
                            key={article.title}
                            className="group flex gap-4 py-4 border-b border-gray-100 cursor-pointer transition-all duration-200"
                            style={{
                              backgroundColor: hoveredArticle === i ? "#f9fafb" : "transparent",
                              boxShadow: hoveredArticle === i ? "0 1px 4px rgba(26,26,46,0.04)" : "none",
                            }}
                            onMouseEnter={() => setHoveredArticle(i)}
                            onMouseLeave={() => setHoveredArticle(null)}
                          >
                            {/* Thumbnail */}
                            <div
                              className="w-20 h-20 rounded-lg flex-shrink-0 transition-all duration-200 flex items-center justify-center"
                              style={{
                                backgroundColor: `${article.image}30`,
                                filter: hoveredArticle === i ? "brightness(0.95) contrast(1.05)" : "none",
                              }}
                            >
                              <div
                                className="w-10 h-10 rounded-full"
                                style={{ backgroundColor: `${article.image}60` }}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="text-xs font-semibold tracking-wide uppercase"
                                  style={{ color: article.categoryColor }}
                                >
                                  {article.category}
                                </span>
                                <span className="text-xs text-gray-300">|</span>
                                <span className="text-xs text-gray-400">{article.date}</span>
                              </div>
                              <h3
                                className="text-base font-semibold leading-snug mb-1 transition-all duration-200"
                                style={{
                                  color: PRIMARY,
                                  transform: hoveredArticle === i ? "translateX(4px)" : "translateX(0)",
                                  textDecoration: hoveredArticle === i ? "underline" : "none",
                                  textUnderlineOffset: "3px",
                                  textDecorationThickness: "1px",
                                }}
                              >
                                {article.title}
                              </h3>
                              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                {article.summary}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-gray-400">{article.author}</span>
                                <span className="text-xs text-gray-300">&middot;</span>
                                <span className="text-xs text-gray-400">{article.readTime}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </main>

                      {/* Sidebar */}
                      <aside className="w-56 flex-shrink-0 hidden lg:block">
                        <div
                          className="rounded-lg p-4 mb-4 border border-gray-100"
                          style={{ backgroundColor: `${PRIMARY}04` }}
                        >
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                            Trending
                          </h4>
                          {["Z-Pattern vs F-Pattern", "Mobile Scroll Depth", "Heat Map Analysis"].map(
                            (item, i) => (
                              <div key={item} className="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0">
                                <span className="text-xs font-bold mt-0.5" style={{ color: RED }}>
                                  {i + 1}
                                </span>
                                <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                              </div>
                            )
                          )}
                        </div>
                        <div className="rounded-lg p-4 border border-gray-100 bg-white">
                          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                            Tags
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {["UX", "Layout", "Eyetrack", "Reading", "Scan", "Content"].map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 rounded-full text-xs text-gray-600 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mobile layout — single column stacked */
                <div className="max-w-sm mx-auto">
                  {/* Mobile header */}
                  <div
                    className="px-4 py-3 flex items-center justify-between border-b border-gray-100"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <div className="flex items-center gap-2">
                      <FLogo size={22} />
                      <span className="text-white font-bold text-sm">EditorialPress</span>
                    </div>
                    <button className="p-1.5">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile search */}
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-400">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                      </svg>
                      Search...
                    </div>
                  </div>

                  {/* Mobile category pills */}
                  <div className="px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto">
                    {["All", "Tech", "Design", "Science", "World"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 cursor-pointer"
                        style={{
                          backgroundColor: tag === "All" ? PRIMARY : "white",
                          color: tag === "All" ? "white" : "#6b7280",
                          border: tag !== "All" ? "1px solid #e5e7eb" : "none",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mobile article list */}
                  <div className="divide-y divide-gray-100">
                    {articleItems.map((article) => (
                      <div key={article.title} className="flex gap-3 px-4 py-4">
                        <div
                          className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: `${article.image}30` }}
                        >
                          <div
                            className="w-7 h-7 rounded-full"
                            style={{ backgroundColor: `${article.image}60` }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className="text-xs font-semibold tracking-wide uppercase block mb-0.5"
                            style={{ color: article.categoryColor }}
                          >
                            {article.category}
                          </span>
                          <h3
                            className="text-sm font-semibold leading-snug mb-1 line-clamp-2"
                            style={{ color: PRIMARY }}
                          >
                            {article.title}
                          </h3>
                          <span className="text-xs text-gray-400">{article.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LAYOUT ANATOMY — the 3 F strokes with heat map overlay      */}
      {/* ============================================================== */}
      <section
        className="py-20 md:py-28 px-5 md:px-10 border-t border-b border-gray-100"
        style={{ backgroundColor: WHITE_BG }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-3"
              style={{ color: TEAL }}
            >
              Layout Anatomy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: PRIMARY }}>
              The 3 F-strokes explained
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              Each stroke carries a different attention weight. Click any stroke to
              highlight its role in the layout hierarchy.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visual F-layout simulation */}
            <RevealBlock delay={0.1}>
              <div
                className="rounded-xl border border-gray-200 overflow-hidden"
                style={{ boxShadow: "0 4px 20px rgba(26,26,46,0.07)" }}
              >
                {/* Stroke 1 — full width header */}
                <div
                  className="px-5 py-4 cursor-pointer transition-all duration-200 border-l-4"
                  style={{
                    backgroundColor: activeStroke === 0 ? `${RED}18` : `${RED}08`,
                    borderLeftColor: RED,
                    opacity: activeStroke !== null && activeStroke !== 0 ? 0.5 : 1,
                  }}
                  onClick={() => setActiveStroke(activeStroke === 0 ? null : 0)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: RED }}
                    >
                      1
                    </span>
                    <div className="h-3 flex-1 rounded-full" style={{ backgroundColor: `${RED}40` }} />
                    <div className="h-3 w-24 rounded-full" style={{ backgroundColor: `${RED}40` }} />
                  </div>
                  <div className="flex gap-3">
                    {[100, 85, 70].map((w, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full"
                        style={{ width: `${w}%`, backgroundColor: `${RED}${i === 0 ? "60" : i === 1 ? "40" : "25"}` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="h-0.5 rounded-full flex-1" style={{ backgroundColor: RED, opacity: 0.4 }} />
                    <span className="text-xs font-semibold" style={{ color: RED }}>
                      Stroke 1 — Full Width
                    </span>
                  </div>
                </div>

                {/* Stroke 2 — 75% width */}
                <div
                  className="px-5 py-4 cursor-pointer transition-all duration-200 border-l-4"
                  style={{
                    backgroundColor: activeStroke === 1 ? `${BLUE}18` : "white",
                    borderLeftColor: BLUE,
                    opacity: activeStroke !== null && activeStroke !== 1 ? 0.5 : 1,
                  }}
                  onClick={() => setActiveStroke(activeStroke === 1 ? null : 1)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: BLUE }}
                    >
                      2
                    </span>
                    <div className="h-3 rounded-full" style={{ width: "75%", backgroundColor: `${BLUE}40` }} />
                  </div>
                  <div className="flex gap-3" style={{ width: "75%" }}>
                    {[100, 80].map((w, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full"
                        style={{ width: `${w}%`, backgroundColor: `${BLUE}${i === 0 ? "50" : "30"}` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1" style={{ width: "75%" }}>
                    <div className="h-0.5 rounded-full flex-1" style={{ backgroundColor: BLUE, opacity: 0.4 }} />
                    <span className="text-xs font-semibold" style={{ color: BLUE }}>
                      Stroke 2 — 75% Width
                    </span>
                  </div>
                </div>

                {/* Vertical stroke */}
                <div className="flex">
                  <div
                    className="w-1/3 cursor-pointer transition-all duration-200 border-l-4 px-4 py-6"
                    style={{
                      backgroundColor: activeStroke === 2 ? `${TEAL}18` : "white",
                      borderLeftColor: TEAL,
                      opacity: activeStroke !== null && activeStroke !== 2 ? 0.5 : 1,
                    }}
                    onClick={() => setActiveStroke(activeStroke === 2 ? null : 2)}
                  >
                    <span
                      className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center mb-4"
                      style={{ backgroundColor: TEAL }}
                    >
                      3
                    </span>
                    {[80, 90, 70, 85, 75, 60].map((h, i) => (
                      <div
                        key={i}
                        className="h-2 w-full rounded-full mb-2.5"
                        style={{ backgroundColor: `${TEAL}${i < 2 ? "55" : i < 4 ? "35" : "20"}` }}
                      />
                    ))}
                    <span className="text-xs font-semibold block mt-2" style={{ color: TEAL }}>
                      Stroke 3 — Vertical
                    </span>
                  </div>

                  {/* Dimmed right content area */}
                  <div
                    className="flex-1 px-4 py-6 bg-gray-50 transition-opacity duration-200"
                    style={{
                      opacity: activeStroke === 2 ? 0.3 : 0.6,
                    }}
                  >
                    <div className="space-y-3">
                      {[100, 90, 60, 80, 70].map((w, i) => (
                        <div
                          key={i}
                          className="h-2.5 rounded-full bg-gray-200"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Click a stroke to highlight — opacity shows attention falloff
              </p>
            </RevealBlock>

            {/* Stroke detail cards */}
            <div className="space-y-4">
              {fStrokeData.map((stroke, i) => (
                <RevealBlock key={stroke.stroke} delay={0.1 + i * 0.08}>
                  <div
                    className="rounded-xl p-6 border cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: activeStroke === i ? stroke.color : "#e5e7eb",
                      backgroundColor: activeStroke === i ? `${stroke.color}08` : "white",
                      boxShadow:
                        activeStroke === i
                          ? `0 4px 20px ${stroke.color}20`
                          : "0 1px 4px rgba(26,26,46,0.04)",
                    }}
                    onClick={() => setActiveStroke(activeStroke === i ? null : i)}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: stroke.color }}
                      >
                        {stroke.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1" style={{ color: PRIMARY }}>
                          {stroke.stroke}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                          {stroke.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className="text-xs px-2 py-1 rounded-md font-medium"
                            style={{ backgroundColor: `${stroke.color}15`, color: stroke.color }}
                          >
                            Place: {stroke.placement}
                          </span>
                        </div>
                        <code
                          className="block mt-3 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-md font-mono"
                        >
                          {stroke.tailwindHint}
                        </code>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. COMPONENT GALLERY — tabs: Buttons, Article Cards, Search,   */}
      /*    Category Tags                                                */
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-3"
              style={{ color: RED }}
            >
              Components
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: PRIMARY }}>
              F-Pattern component gallery
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              Each component is designed for left-aligned, scan-friendly reading. Transitions
              stay under 200ms to avoid interrupting the reading flow.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.08} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "buttons" as const, label: "Buttons" },
                  { key: "article-cards" as const, label: "Article Cards" },
                  { key: "search" as const, label: "Search" },
                  { key: "category-tags" as const, label: "Category Tags" },
                ]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-150"
                  style={{
                    backgroundColor: activeTab === key ? PRIMARY : "white",
                    color: activeTab === key ? "white" : "#6b7280",
                    border: activeTab === key ? `1px solid ${PRIMARY}` : "1px solid #e5e7eb",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            <div
              className="bg-white rounded-xl border border-gray-200 p-8 md:p-10"
              style={{ boxShadow: "0 4px 24px rgba(26,26,46,0.07)" }}
            >
              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                      Primary CTA — Red accent, fast feedback (duration-150)
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                        style={{ backgroundColor: RED }}
                      >
                        Read More
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                        style={{ backgroundColor: BLUE }}
                      >
                        Explore Topics
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                        style={{ backgroundColor: TEAL }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                      Outline &amp; Ghost variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-6 py-3 rounded-lg font-medium border-2 transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
                        style={{ borderColor: RED, color: RED, backgroundColor: "transparent" }}
                      >
                        Outlined
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg font-medium transition-all duration-150 hover:bg-gray-100 active:scale-[0.98] text-gray-600"
                      >
                        Ghost
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg font-medium transition-all duration-150 active:scale-[0.98] text-white hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${RED}, ${BLUE})` }}
                      >
                        Gradient
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                      Size variants — sm / md / lg
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "sm", cls: "px-3 py-1.5 text-xs" },
                        { label: "md", cls: "px-5 py-2.5 text-sm" },
                        { label: "lg", cls: "px-8 py-4 text-base" },
                      ].map(({ label, cls }) => (
                        <button
                          key={label}
                          className={`${cls} rounded-lg text-white font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]`}
                          style={{ backgroundColor: PRIMARY }}
                        >
                          {label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- ARTICLE CARDS TAB ---- */}
              {activeTab === "article-cards" && (
                <div className="space-y-2">
                  {articleItems.map((article, i) => (
                    <div
                      key={article.title}
                      className="flex gap-5 p-5 rounded-lg cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor: hoveredArticle === i ? "#f9fafb" : "transparent",
                        boxShadow: hoveredArticle === i ? "0 1px 6px rgba(26,26,46,0.06)" : "none",
                      }}
                      onMouseEnter={() => setHoveredArticle(i)}
                      onMouseLeave={() => setHoveredArticle(null)}
                    >
                      <div
                        className="w-20 h-20 rounded-lg flex-shrink-0 transition-all duration-200 flex items-center justify-center"
                        style={{
                          backgroundColor: `${article.image}25`,
                          filter:
                            hoveredArticle === i
                              ? "brightness(0.95) contrast(1.05)"
                              : "none",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: `${article.image}70` }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-xs font-semibold tracking-wide uppercase"
                          style={{ color: article.categoryColor }}
                        >
                          {article.category}
                        </span>
                        <h3
                          className="text-sm font-semibold leading-snug mb-1 mt-0.5 line-clamp-2 transition-all duration-200"
                          style={{
                            color: PRIMARY,
                            transform: hoveredArticle === i ? "translateX(4px)" : "translateX(0)",
                            textDecoration: hoveredArticle === i ? "underline" : "none",
                            textUnderlineOffset: "3px",
                            textDecorationThickness: "1px",
                          }}
                        >
                          {article.title}
                        </h3>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- SEARCH TAB ---- */}
              {activeTab === "search" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                      Standard search — stroke 2 zone
                    </p>
                    <div className="flex gap-3 max-w-xl">
                      <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-400 focus-within:border-blue-400 transition-all duration-200">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search articles..."
                          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                      </div>
                      <button
                        className="px-5 py-3 rounded-lg text-white font-medium text-sm transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                      Search with autocomplete suggestions
                    </p>
                    <div className="max-w-xl relative">
                      <div
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 bg-white text-sm transition-all duration-200"
                        style={{ borderColor: BLUE }}
                      >
                        <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                          type="text"
                          defaultValue="f-pattern"
                          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                      </div>
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
                        {["f-pattern layout guide", "f-pattern vs z-pattern", "f-pattern eye tracking study"].map(
                          (s) => (
                            <div
                              key={s}
                              className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors duration-150"
                            >
                              {s}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CATEGORY TAGS TAB ---- */}
              {activeTab === "category-tags" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                      Category filter pills — left-aligned row (stroke 2 zone)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "All Topics", active: true, color: "" },
                        { label: "Technology", active: false, color: BLUE },
                        { label: "Design", active: false, color: TEAL },
                        { label: "UX Research", active: false, color: RED },
                        { label: "Performance", active: false, color: "#b45309" },
                        { label: "Editorial", active: false, color: PRIMARY },
                      ].map((tag) => (
                        <span
                          key={tag.label}
                          className="px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-150 hover:opacity-80"
                          style={{
                            backgroundColor: tag.active
                              ? PRIMARY
                              : tag.color
                              ? `${tag.color}15`
                              : "white",
                            color: tag.active ? "white" : tag.color || "#6b7280",
                            border: tag.active ? "none" : "1px solid #e5e7eb",
                          }}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                      Article meta tags — inline with content
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["eye-tracking", "UX research", "layout", "scan pattern", "content hierarchy", "readability", "editorial"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors duration-150 bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            #{tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
                      Status / read-time chips
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "4 min read", bg: `${BLUE}15`, color: BLUE },
                        { label: "8 min read", bg: `${PRIMARY}10`, color: PRIMARY },
                        { label: "Long read", bg: `${RED}15`, color: RED },
                        { label: "Quick scan", bg: `${TEAL}15`, color: TEAL },
                      ].map((chip) => (
                        <span
                          key={chip.label}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold"
                          style={{ backgroundColor: chip.bg, color: chip.color }}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {chip.label}
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
      {/* 6. ANIMATION & INTERACTION RULES — 4 interactive demo cards    */}
      {/* ============================================================== */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: `${PRIMARY}04` }}
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-3"
              style={{ color: YELLOW }}
            >
              Animation &amp; Interaction Rules
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: PRIMARY }}>
              F-pattern interaction patterns
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              Four named interaction rules derived directly from the F-pattern aiRules spec.
              Each demo is interactive — hover or click to feel the pattern.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Eye-Tracking Guides */}
            <RevealBlock delay={0.08}>
              <div
                className="bg-white rounded-xl border border-gray-200 p-8 h-full"
                style={{ boxShadow: "0 4px 20px rgba(26,26,46,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: `${RED}15`, color: RED }}
                  >
                    Eye-Tracking Guides
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 font-mono leading-relaxed">
                  hover: translate-x-1 + underline reveal
                </p>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  List item titles shift right 4px and reveal an underline on hover —
                  helps users lock on during the F-scan without jarring animation.
                </p>
                <div className="space-y-1">
                  {[
                    "F-Pattern Research: 20 Years Later",
                    "Eye Tracking in Mobile Design",
                    "Content Placement Best Practices",
                    "Why Left-Aligned Text Wins",
                  ].map((title, i) => (
                    <div
                      key={title}
                      className="flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-0"
                      style={{
                        backgroundColor: eyeTrackingHovered === i ? "#f9fafb" : "transparent",
                      }}
                      onMouseEnter={() => setEyeTrackingHovered(i)}
                      onMouseLeave={() => setEyeTrackingHovered(null)}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: RED }}
                      />
                      <span
                        className="text-sm font-medium transition-all duration-200"
                        style={{
                          color: PRIMARY,
                          transform: eyeTrackingHovered === i ? "translateX(4px)" : "translateX(0)",
                          textDecoration: eyeTrackingHovered === i ? "underline" : "none",
                          textUnderlineOffset: "3px",
                          textDecorationThickness: "1px",
                        }}
                      >
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  Hover each list item to see eye-tracking guide behavior
                </p>
              </div>
            </RevealBlock>

            {/* Card 2: Fast Feedback — slow vs fast transition comparison */}
            <RevealBlock delay={0.12}>
              <div
                className="bg-white rounded-xl border border-gray-200 p-8 h-full"
                style={{ boxShadow: "0 4px 20px rgba(26,26,46,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: `${BLUE}15`, color: BLUE }}
                  >
                    Fast Feedback
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 font-mono leading-relaxed">
                  duration-150 to duration-200 max
                </p>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Editorial interactions must not stall reading. Transitions cap at
                  200ms. Here is a side-by-side comparison — slow 600ms vs fast 150ms.
                </p>

                <div className="space-y-5">
                  {/* Slow */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400">
                        Slow — 600ms (interrupts reading)
                      </span>
                    </div>
                    <button
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-600"
                      style={{
                        transition: "background-color 600ms, color 600ms",
                        backgroundColor:
                          slowFastToggle === "slow" ? PRIMARY : "white",
                        color: slowFastToggle === "slow" ? "white" : "#374151",
                      }}
                      onMouseEnter={() => setSlowFastToggle("slow")}
                      onMouseLeave={() => setSlowFastToggle(null)}
                    >
                      Hover me — 600ms transition
                    </button>
                  </div>

                  {/* Fast */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium" style={{ color: TEAL }}>
                        Fast — 150ms (snappy, flow preserved)
                      </span>
                    </div>
                    <button
                      className="w-full px-4 py-3 rounded-lg border text-sm font-medium"
                      style={{
                        transition: "background-color 150ms, color 150ms, border-color 150ms",
                        backgroundColor:
                          slowFastToggle === "fast" ? PRIMARY : "white",
                        color: slowFastToggle === "fast" ? "white" : "#374151",
                        borderColor: slowFastToggle === "fast" ? PRIMARY : "#e5e7eb",
                      }}
                      onMouseEnter={() => setSlowFastToggle("fast")}
                      onMouseLeave={() => setSlowFastToggle(null)}
                    >
                      Hover me — 150ms transition
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-5">
                  Hover each button to feel the speed difference
                </p>
              </div>
            </RevealBlock>

            {/* Card 3: Contrast Pop */}
            <RevealBlock delay={0.16}>
              <div
                className="bg-white rounded-xl border border-gray-200 p-8 h-full"
                style={{ boxShadow: "0 4px 20px rgba(26,26,46,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: `${TEAL}15`, color: TEAL }}
                  >
                    Contrast Pop
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 font-mono leading-relaxed">
                  hover:bg-gray-50/70 hover:shadow-sm
                </p>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Content row gets a light background lift and subtle shadow on hover —
                  visually separates the item from the information stream without
                  distraction.
                </p>

                {/* Article row demo */}
                <div
                  className="flex gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: contrastHovered ? "rgba(249,250,251,0.70)" : "transparent",
                    boxShadow: contrastHovered ? "0 1px 6px rgba(26,26,46,0.07)" : "none",
                  }}
                  onMouseEnter={() => setContrastHovered(true)}
                  onMouseLeave={() => setContrastHovered(false)}
                >
                  <div
                    className="w-16 h-16 rounded-lg flex-shrink-0 transition-all duration-200 flex items-center justify-center"
                    style={{ backgroundColor: `${TEAL}25` }}
                  >
                    <div className="w-7 h-7 rounded-full" style={{ backgroundColor: `${TEAL}60` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-xs font-semibold tracking-wide uppercase block mb-1"
                      style={{ color: TEAL }}
                    >
                      UX Research
                    </span>
                    <p className="text-sm font-semibold leading-snug mb-1" style={{ color: PRIMARY }}>
                      Content row hover state demonstration
                    </p>
                    <span className="text-xs text-gray-400">6 min read &middot; Feb 2026</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: contrastHovered ? `${TEAL}15` : "#f3f4f6",
                      color: contrastHovered ? TEAL : "#6b7280",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: contrastHovered ? TEAL : "#9ca3af" }}
                    />
                    {contrastHovered ? "Row separated from stream" : "Hover the row above"}
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Card 4: Image Focus */}
            <RevealBlock delay={0.2}>
              <div
                className="bg-white rounded-xl border border-gray-200 p-8 h-full"
                style={{ boxShadow: "0 4px 20px rgba(26,26,46,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: `${YELLOW}30`, color: "#b45309" }}
                  >
                    Image Focus
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 font-mono leading-relaxed">
                  group-hover:brightness-95 group-hover:contrast-105
                </p>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Thumbnail gets a subtle contrast boost on hover — signals clickability
                  as a visual affordance without disruptive zoom or scale effects.
                </p>

                {/* Image focus demo — uses group and group-hover */}
                <div
                  className="group flex gap-4 p-4 rounded-lg cursor-pointer border border-gray-100 transition-all duration-200 hover:bg-gray-50/70 hover:shadow-sm"
                  onMouseEnter={() => setImageFocusHovered(true)}
                  onMouseLeave={() => setImageFocusHovered(false)}
                >
                  {/* Thumbnail with CSS filter on hover */}
                  <div
                    className="w-20 h-20 rounded-lg flex-shrink-0 relative overflow-hidden transition-all duration-200"
                    style={{
                      backgroundColor: `${YELLOW}35`,
                      filter: imageFocusHovered
                        ? "brightness(0.95) contrast(1.05)"
                        : "brightness(1) contrast(1)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-10 h-10 rounded-full"
                        style={{ backgroundColor: `${YELLOW}80` }}
                      />
                    </div>
                    {/* Click affordance overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                      style={{ opacity: imageFocusHovered ? 1 : 0 }}
                    >
                      <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="text-xs font-semibold uppercase tracking-wide block mb-1"
                      style={{ color: "#b45309" }}
                    >
                      Performance
                    </span>
                    <h4
                      className="text-sm font-semibold leading-snug mb-1 transition-all duration-200"
                      style={{
                        color: PRIMARY,
                        transform: imageFocusHovered ? "translateX(4px)" : "translateX(0)",
                      }}
                    >
                      Image contrast boost as click affordance
                    </h4>
                    <span className="text-xs text-gray-400">
                      {imageFocusHovered ? "brightness(0.95) contrast(1.05) active" : "4 min read"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Hover the card above — thumbnail contrast shifts, arrow appears
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. DESIGN RULES DO/DON'T — content placement based on strokes  */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-3"
              style={{ color: PRIMARY }}
            >
              Design Rules
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: PRIMARY }}>
              Content placement rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              F-pattern content placement is not aesthetic preference — it is backed by
              user behavior data. These rules reflect where attention actually lands.
            </p>
          </RevealBlock>

          {/* F-pattern visual reference */}
          <RevealBlock delay={0.08} className="mb-12">
            <div
              className="rounded-xl border border-gray-200 p-6 bg-gray-50"
              style={{ maxWidth: 600 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                Attention zone reference — where your rules apply
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 flex-1 rounded-md flex items-center px-3" style={{ backgroundColor: `${RED}25` }}>
                    <span className="text-xs font-semibold" style={{ color: RED }}>
                      Zone 1 — Highest: Full-width top (logo, headline, featured story)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 rounded-md flex items-center px-3" style={{ backgroundColor: `${BLUE}20`, width: "75%" }}>
                    <span className="text-xs font-semibold" style={{ color: BLUE }}>
                      Zone 2 — Medium: 75% width (search, categories)
                    </span>
                  </div>
                  <div className="flex-1 h-8 rounded-md bg-gray-200 opacity-30" />
                </div>
                <div className="flex gap-2">
                  <div className="h-20 w-1/3 rounded-md flex items-center justify-center px-2" style={{ backgroundColor: `${TEAL}20` }}>
                    <span className="text-xs font-semibold text-center" style={{ color: TEAL }}>
                      Zone 3 — Low: Left edge skim
                    </span>
                  </div>
                  <div className="flex-1 h-20 rounded-md bg-gray-100 opacity-40 flex items-center justify-center">
                    <span className="text-xs text-gray-400 text-center px-2">
                      Lowest attention — avoid critical content here
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock delay={0.12}>
              <div
                className="rounded-xl border border-green-200 p-8 h-full"
                style={{ backgroundColor: "#f0fdf4", boxShadow: "0 4px 16px rgba(22,163,74,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-green-700">Do</h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.18}>
              <div
                className="rounded-xl border border-red-200 p-8 h-full"
                style={{ backgroundColor: "#fff5f5", boxShadow: "0 4px 16px rgba(220,38,38,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-600">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Visual Do/Don't example */}
          <RevealBlock delay={0.25} className="mt-8">
            <div
              className="rounded-xl border border-gray-200 overflow-hidden"
              style={{ boxShadow: "0 4px 16px rgba(26,26,46,0.06)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* Correct */}
                <div className="p-6 bg-green-50/50">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
                      Correct — Left-aligned, prioritized
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-full rounded" style={{ backgroundColor: `${RED}30` }} />
                    <div className="h-4 w-3/4 rounded bg-blue-200/50" />
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-5/6 rounded bg-gray-200" />
                    <div className="h-3 w-4/5 rounded bg-gray-100" />
                    <div className="h-3 w-2/3 rounded bg-gray-100" />
                  </div>
                  <p className="text-xs text-green-700 mt-3">
                    Hero spans full width, secondary is 75%, content left-aligns
                  </p>
                </div>

                {/* Incorrect */}
                <div className="p-6 bg-red-50/50">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-widest">
                      Wrong — Centered, priority ignored
                    </span>
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="h-4 w-1/2 rounded bg-gray-300" />
                    <div className="h-6 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-5 w-1/3 rounded" style={{ backgroundColor: `${RED}30` }} />
                  </div>
                  <p className="text-xs text-red-600 mt-3">
                    Logo small and centered, CTA buried at bottom, text centered
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER with F-pattern logo, color swatches, All Styles link */}
      {/* ============================================================== */}
      <footer
        className="relative border-t border-gray-200 overflow-hidden"
        style={{ backgroundColor: PRIMARY }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3">
                <FLogo size={36} />
                <div>
                  <div className="text-white font-bold text-lg leading-tight">F-Pattern Layout</div>
                  <div className="text-gray-400 text-xs">Eye-Tracking Design System</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Built on Nielsen Norman Group research. Place your most important content
                where users actually look — top left, then trace the F.
              </p>

              {/* Color swatches */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Color Palette
                </p>
                <div className="flex gap-3 flex-wrap">
                  {colorSwatches.map((s, i) => (
                    <div
                      key={s.name}
                      className="cursor-pointer transition-all duration-150"
                      style={{
                        transform: hoveredSwatch === i ? "translateY(-4px) scale(1.15)" : "none",
                      }}
                      onMouseEnter={() => setHoveredSwatch(i)}
                      onMouseLeave={() => setHoveredSwatch(null)}
                      title={`${s.name} — ${s.hex}`}
                    >
                      <div
                        className="w-7 h-7 rounded-full"
                        style={{
                          backgroundColor: s.hex,
                          border: s.border
                            ? "2px solid #374151"
                            : "2px solid rgba(255,255,255,0.1)",
                          boxShadow:
                            hoveredSwatch === i ? `0 4px 12px ${s.hex}80` : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>
                {hoveredSwatch !== null && (
                  <div className="mt-2 f-slide-in-anim">
                    <span className="text-xs text-gray-400">
                      {colorSwatches[hoveredSwatch].name} —{" "}
                      <span className="font-mono text-gray-300">
                        {colorSwatches[hoveredSwatch].hex}
                      </span>{" "}
                      <span className="text-gray-500">
                        ({colorSwatches[hoveredSwatch].label})
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                  This Style
                </span>
                <Link
                  href="/styles/f-pattern-layout"
                  className="text-gray-400 hover:text-white transition-colors duration-150"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/f-pattern-layout/showcase"
                  className="text-gray-400 hover:text-white transition-colors duration-150"
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/f-pattern-layout/cover"
                  className="text-gray-400 hover:text-white transition-colors duration-150"
                >
                  Cover
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-150"
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="text-gray-400 hover:text-white transition-colors duration-150"
                >
                  All Styles
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                  F-Stroke Zones
                </span>
                {[
                  { label: "Stroke 1 — Full Width", color: RED },
                  { label: "Stroke 2 — 75% Width", color: BLUE },
                  { label: "Stroke 3 — Vertical", color: TEAL },
                ].map((s) => (
                  <span key={s.label} className="flex items-center gap-2 text-xs text-gray-400">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-8 rounded-full"
            style={{
              background: `linear-gradient(to right, transparent, ${RED}60, ${BLUE}60, ${TEAL}60, transparent)`,
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FLogo size={20} />
              <span>F-Pattern Layout &mdash; StyleKit Design System</span>
            </div>
            <Link
              href="/styles"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.97] text-white"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span>&larr;</span>
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
