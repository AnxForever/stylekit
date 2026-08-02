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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function SaveIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 3H5c-1.1 0-2 .9-2 2v14l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
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

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette from masonry-flow.ts                                 */
/* ------------------------------------------------------------------ */

const PRIMARY = "#1a1a2e";
const ACCENT_RED = "#e94560";
const ACCENT_GREEN = "#16c79a";
const ACCENT_YELLOW = "#ffd460";
const ACCENT_PURPLE = "#7579e7";

/* ------------------------------------------------------------------ */
/*  Masonry card data                                                  */
/* ------------------------------------------------------------------ */

type FilterCategory = "All" | "Photos" | "Art" | "Design";

interface MasonryCard {
  id: number;
  category: FilterCategory;
  aspect: string;
  bgFrom: string;
  bgTo: string;
  title: string;
  subtitle: string;
  accent: string;
}

const masonryCards: MasonryCard[] = [
  {
    id: 1,
    category: "Photos",
    aspect: "aspect-[3/4]",
    bgFrom: ACCENT_RED,
    bgTo: "#c23152",
    title: "Golden Hour",
    subtitle: "Nature Photography",
    accent: ACCENT_RED,
  },
  {
    id: 2,
    category: "Art",
    aspect: "aspect-square",
    bgFrom: ACCENT_PURPLE,
    bgTo: "#5557c4",
    title: "Digital Dream",
    subtitle: "Illustration",
    accent: ACCENT_PURPLE,
  },
  {
    id: 3,
    category: "Design",
    aspect: "aspect-[2/3]",
    bgFrom: ACCENT_GREEN,
    bgTo: "#0ea57e",
    title: "Minimal Form",
    subtitle: "UI Design",
    accent: ACCENT_GREEN,
  },
  {
    id: 4,
    category: "Photos",
    aspect: "aspect-[4/5]",
    bgFrom: ACCENT_YELLOW,
    bgTo: "#e6b800",
    title: "Urban Layers",
    subtitle: "Street Photography",
    accent: ACCENT_YELLOW,
  },
  {
    id: 5,
    category: "Art",
    aspect: "aspect-[3/5]",
    bgFrom: PRIMARY,
    bgTo: "#2d2d4e",
    title: "Void Walker",
    subtitle: "Concept Art",
    accent: ACCENT_PURPLE,
  },
  {
    id: 6,
    category: "Design",
    aspect: "aspect-square",
    bgFrom: ACCENT_RED,
    bgTo: ACCENT_PURPLE,
    title: "Flow State",
    subtitle: "Brand Identity",
    accent: ACCENT_RED,
  },
  {
    id: 7,
    category: "Photos",
    aspect: "aspect-[2/3]",
    bgFrom: ACCENT_GREEN,
    bgTo: ACCENT_YELLOW,
    title: "Morning Mist",
    subtitle: "Landscape",
    accent: ACCENT_GREEN,
  },
  {
    id: 8,
    category: "Art",
    aspect: "aspect-[3/4]",
    bgFrom: ACCENT_PURPLE,
    bgTo: ACCENT_RED,
    title: "Neon Bloom",
    subtitle: "Digital Painting",
    accent: ACCENT_PURPLE,
  },
  {
    id: 9,
    category: "Design",
    aspect: "aspect-[4/5]",
    bgFrom: ACCENT_YELLOW,
    bgTo: ACCENT_GREEN,
    title: "Grid System",
    subtitle: "Layout Study",
    accent: ACCENT_YELLOW,
  },
  {
    id: 10,
    category: "Photos",
    aspect: "aspect-[3/5]",
    bgFrom: PRIMARY,
    bgTo: ACCENT_RED,
    title: "Night Sky",
    subtitle: "Astrophotography",
    accent: ACCENT_RED,
  },
  {
    id: 11,
    category: "Art",
    aspect: "aspect-square",
    bgFrom: ACCENT_GREEN,
    bgTo: ACCENT_PURPLE,
    title: "Pixel World",
    subtitle: "Pixel Art",
    accent: ACCENT_GREEN,
  },
  {
    id: 12,
    category: "Design",
    aspect: "aspect-[2/3]",
    bgFrom: ACCENT_YELLOW,
    bgTo: ACCENT_RED,
    title: "Type Study",
    subtitle: "Typography",
    accent: ACCENT_YELLOW,
  },
];

/* ------------------------------------------------------------------ */
/*  Component card tabs                                                */
/* ------------------------------------------------------------------ */

type ComponentTab = "photo" | "article" | "product" | "profile";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [activeTab, setActiveTab] = useState<ComponentTab>("photo");
  const [savedCards, setSavedCards] = useState<Set<number>>(new Set());
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set());

  /* Animation states for Section 6 demo cards */
  const [zoomHovered, setZoomHovered] = useState(false);
  const [elevationHovered, setElevationHovered] = useState(false);
  const [overlayHovered, setOverlayHovered] = useState(false);
  const [snappyActive, setSnappyActive] = useState<string>("All");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleSave(id: number) {
    setSavedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleLike(id: number) {
    setLikedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filteredCards =
    activeFilter === "All"
      ? masonryCards
      : masonryCards.filter((c) => c.category === activeFilter);

  const filterTabs: FilterCategory[] = ["All", "Photos", "Art", "Design"];

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: "#f5f5f5", color: PRIMARY }}
    >
      <style>{`
        @keyframes masonry-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes masonry-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .masonry-shimmer {
          background: linear-gradient(90deg, #e8e8e8 25%, #d8d8d8 50%, #e8e8e8 75%);
          background-size: 200% 100%;
          animation: masonry-shimmer 1.8s infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED STICKY NAV                                              */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(245,245,245,0.92)",
          borderColor: "rgba(26,26,46,0.08)",
          boxShadow: "0 2px 20px rgba(26,26,46,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-lg"
            style={{ backgroundColor: PRIMARY }}
          >
            <GridIcon className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white tracking-tight">
              Masonry<span style={{ color: ACCENT_RED }}>Flow</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Hero", "Live Demo", "Anatomy", "Components", "Interactions", "Rules"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md text-sm transition-colors duration-150 cursor-pointer hover:bg-zinc-100"
                style={{ color: "rgba(26,26,46,0.55)" }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back to StyleKit CTA */}
          <Link
            href="/styles/masonry-flow"
            data-back-navigation="true"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: ACCENT_RED,
              boxShadow: `0 4px 14px ${ACCENT_RED}55`,
            }}
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            StyleKit
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — masonry grid concept visualization                    */}
      {/* ================================================================ */}
      <section
        className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden"
        style={{ backgroundColor: PRIMARY }}
      >
        {/* Background subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent glow blobs */}
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ backgroundColor: ACCENT_RED }}
        />
        <div
          className="absolute bottom-10 left-20 w-80 h-80 rounded-full pointer-events-none blur-3xl"
          style={{ backgroundColor: ACCENT_PURPLE, opacity: 0.15 }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: text */}
            <div>
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
                }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-7"
                  style={{
                    backgroundColor: "rgba(233,69,96,0.18)",
                    color: ACCENT_RED,
                    border: `1px solid ${ACCENT_RED}44`,
                  }}
                >
                  <GridIcon className="w-3 h-3" />
                  Pinterest-style Layout
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-white"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Content flows
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_RED} 0%, ${ACCENT_PURPLE} 60%, ${ACCENT_GREEN} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  naturally.
                </span>
              </h1>

              <p
                className="text-lg leading-relaxed mb-10 max-w-md"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                CSS columns technique creates a self-organizing grid where cards
                of varying heights fill each column top-to-bottom. Zero JavaScript,
                pure CSS masonry that works in every browser.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    backgroundColor: ACCENT_RED,
                    boxShadow: `0 4px 16px ${ACCENT_RED}44`,
                  }}
                >
                  <GridIcon className="w-4 h-4" />
                  See Live Demo
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  CSS columns breakdown
                </button>
              </div>
            </div>

            {/* Right: miniature masonry visualization */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
            >
              {/* Mini masonry grid — 4 columns of decorative blocks */}
              <div
                className="rounded-2xl p-5 overflow-hidden"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
                  <div
                    className="ml-auto text-xs font-mono"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    columns-4
                  </div>
                </div>

                {/* 4-column mini masonry */}
                <div className="grid grid-cols-4 gap-2">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-2">
                    <div className="rounded opacity-80" style={{ height: 80, background: `linear-gradient(160deg, ${ACCENT_RED}, #c23152)` }} />
                    <div className="rounded opacity-70" style={{ height: 48, background: `linear-gradient(160deg, ${ACCENT_GREEN}, #0ea57e)` }} />
                    <div className="rounded opacity-75" style={{ height: 64, background: `linear-gradient(160deg, ${ACCENT_YELLOW}, #e6b800)` }} />
                  </div>
                  {/* Column 2 */}
                  <div className="flex flex-col gap-2">
                    <div className="rounded opacity-75" style={{ height: 56, background: `linear-gradient(160deg, ${ACCENT_PURPLE}, #5557c4)` }} />
                    <div className="rounded opacity-80" style={{ height: 96, background: `linear-gradient(160deg, ${ACCENT_RED}, ${ACCENT_PURPLE})` }} />
                    <div className="rounded opacity-65" style={{ height: 40, background: `linear-gradient(160deg, ${ACCENT_GREEN}, ${ACCENT_YELLOW})` }} />
                  </div>
                  {/* Column 3 */}
                  <div className="flex flex-col gap-2">
                    <div className="rounded opacity-70" style={{ height: 64, background: `linear-gradient(160deg, ${ACCENT_GREEN}, ${ACCENT_PURPLE})` }} />
                    <div className="rounded opacity-75" style={{ height: 40, background: `linear-gradient(160deg, ${ACCENT_YELLOW}, ${ACCENT_RED})` }} />
                    <div className="rounded opacity-80" style={{ height: 88, background: `linear-gradient(160deg, ${ACCENT_RED}, ${ACCENT_GREEN})` }} />
                  </div>
                  {/* Column 4 */}
                  <div className="flex flex-col gap-2">
                    <div className="rounded opacity-75" style={{ height: 40, background: `linear-gradient(160deg, ${ACCENT_YELLOW}, ${ACCENT_PURPLE})` }} />
                    <div className="rounded opacity-80" style={{ height: 80, background: `linear-gradient(160deg, ${ACCENT_PURPLE}, ${ACCENT_RED})` }} />
                    <div className="rounded opacity-70" style={{ height: 72, background: `linear-gradient(160deg, ${ACCENT_GREEN}, ${ACCENT_RED})` }} />
                  </div>
                </div>

                {/* Annotation */}
                <div className="mt-4 flex items-center justify-between">
                  <code
                    className="text-xs font-mono px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(233,69,96,0.2)",
                      color: ACCENT_RED,
                    }}
                  >
                    break-inside-avoid
                  </code>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    varying heights — natural flow
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "CSS only", value: "No JS", color: ACCENT_GREEN },
                  { label: "Column gap", value: "gap-4", color: ACCENT_YELLOW },
                  { label: "Responsive", value: "1-4 cols", color: ACCENT_PURPLE },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 text-center"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="text-sm font-bold mb-0.5" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. LIVE MASONRY DEMO — CSS columns with filters                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: ACCENT_RED }}
            >
              Live Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: PRIMARY }}>
              Masonry grid{" "}
              <span style={{ color: ACCENT_GREEN }}>in action</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(26,26,46,0.55)" }}>
              Filter by category and watch the grid reflow. Each card has a different aspect ratio
              — that is the whole point of masonry. Hover to reveal the overlay actions.
            </p>
          </RevealBlock>

          {/* Filter tabs — Action Snappiness: duration-200 */}
          <RevealBlock delay={0.08} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={
                    activeFilter === tab
                      ? {
                          backgroundColor: PRIMARY,
                          color: "#fff",
                          boxShadow: `0 4px 12px rgba(26,26,46,0.25)`,
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "rgba(26,26,46,0.6)",
                          border: "1px solid rgba(26,26,46,0.1)",
                        }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Actual CSS columns masonry — break-inside-avoid on every card */}
          <RevealBlock delay={0.12}>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="break-inside-avoid mb-4 group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 8px rgba(26,26,46,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 15px 30px rgba(26,26,46,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 2px 8px rgba(26,26,46,0.06)";
                  }}
                >
                  {/* Image container — Confined Zoom: overflow-hidden keeps scale inside */}
                  <div className={`relative overflow-hidden ${card.aspect}`}>
                    {/* Colored placeholder block */}
                    <div
                      className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{
                        background: `linear-gradient(145deg, ${card.bgFrom}, ${card.bgTo})`,
                      }}
                    />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.45)",
                          color: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {card.category}
                      </span>
                    </div>

                    {/* Overlay Reveal: opacity + translate, does NOT change card size */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
                      }}
                    >
                      {/* Action buttons — translate + opacity reveal */}
                      <div className="flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(card.id);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
                          style={{
                            backgroundColor: savedCards.has(card.id)
                              ? card.accent
                              : "rgba(255,255,255,0.9)",
                            color: savedCards.has(card.id) ? "#fff" : PRIMARY,
                          }}
                        >
                          <SaveIcon className="w-3 h-3" />
                          {savedCards.has(card.id) ? "Saved" : "Save"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(card.id);
                          }}
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
                          style={{
                            backgroundColor: likedCards.has(card.id)
                              ? ACCENT_RED
                              : "rgba(255,255,255,0.9)",
                            color: likedCards.has(card.id) ? "#fff" : PRIMARY,
                          }}
                        >
                          <HeartIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.9)",
                            color: PRIMARY,
                          }}
                        >
                          <ShareIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-3">
                    <h3
                      className="font-semibold text-sm mb-0.5 leading-snug"
                      style={{ color: PRIMARY }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs" style={{ color: "rgba(26,26,46,0.45)" }}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Load more button */}
          <RevealBlock delay={0.2} className="mt-10 text-center">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: PRIMARY,
                color: "#fff",
                boxShadow: "0 4px 16px rgba(26,26,46,0.2)",
              }}
            >
              <PlusIcon className="w-4 h-4" />
              Load More
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. LAYOUT ANATOMY — CSS columns technique explained              */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: PRIMARY }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: ACCENT_YELLOW }}
            >
              Layout Anatomy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              How CSS columns{" "}
              <span style={{ color: ACCENT_YELLOW }}>masonry works</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              No JavaScript. No layout library. Just three CSS properties and a responsive column count.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: code breakdown */}
            <RevealBlock delay={0.08}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Code header */}
                <div
                  className="flex items-center gap-2 px-5 py-3 border-b"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400 opacity-60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-60" />
                    <div className="w-3 h-3 rounded-full bg-green-400 opacity-60" />
                  </div>
                  <span className="text-xs font-mono ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                    masonry-grid.tsx
                  </span>
                </div>

                <div className="p-5 space-y-4" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                  {/* Container */}
                  <div
                    className="rounded-lg p-4 font-mono text-sm leading-relaxed"
                    style={{ backgroundColor: "rgba(233,69,96,0.1)", border: `1px solid ${ACCENT_RED}33` }}
                  >
                    <div style={{ color: ACCENT_RED }}>{"<div className=\""}</div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_YELLOW }}>columns-2</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* mobile */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_GREEN }}>md:columns-3</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* tablet */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_PURPLE }}>lg:columns-4</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* desktop */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>gap-4</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* column gap */}</span>
                    </div>
                    <div style={{ color: ACCENT_RED }}>{`">`}</div>
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-lg p-4 font-mono text-sm leading-relaxed"
                    style={{ backgroundColor: "rgba(21,199,154,0.1)", border: `1px solid ${ACCENT_GREEN}33` }}
                  >
                    <div style={{ color: ACCENT_GREEN }}>{"<div className=\""}</div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_YELLOW }}>break-inside-avoid</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* key rule */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>mb-4</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* bottom gap */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_PURPLE }}>group overflow-hidden</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_RED }}>hover:-translate-y-1</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* subtle elevation */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>transition-all duration-300</span>
                    </div>
                    <div style={{ color: ACCENT_GREEN }}>{`">`}</div>
                  </div>

                  {/* Image */}
                  <div
                    className="rounded-lg p-4 font-mono text-sm leading-relaxed"
                    style={{ backgroundColor: "rgba(117,121,231,0.1)", border: `1px solid ${ACCENT_PURPLE}33` }}
                  >
                    <div style={{ color: ACCENT_PURPLE }}>{"<div className=\"relative overflow-hidden\">"}</div>
                    <div className="pl-4">
                      <span style={{ color: ACCENT_YELLOW }}>group-hover:scale-105</span>
                      <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>{/* confined zoom */}</span>
                    </div>
                    <div className="pl-4">
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>duration-700 ease-out</span>
                    </div>
                    <div style={{ color: ACCENT_PURPLE }}>{"</div>"}</div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Right: responsive column counts + card structure notes */}
            <div className="space-y-5">
              {/* Column count responsive guide */}
              <RevealBlock delay={0.12}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 className="text-base font-semibold text-white mb-5">Responsive column count</h3>
                  <div className="space-y-3">
                    {[
                      { breakpoint: "Mobile", range: "< 640px", color: ACCENT_RED, cls: "columns-1" },
                      { breakpoint: "Tablet", range: "640–1024px", color: ACCENT_YELLOW, cls: "sm:columns-2" },
                      { breakpoint: "Desktop", range: "1024–1280px", color: ACCENT_GREEN, cls: "lg:columns-3" },
                      { breakpoint: "Wide", range: "1280px+", color: ACCENT_PURPLE, cls: "xl:columns-4" },
                    ].map((row) => (
                      <div key={row.breakpoint} className="flex items-center gap-3">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: row.color }}
                        />
                        <span className="text-sm w-20 shrink-0" style={{ color: "rgba(255,255,255,0.55)" }}>
                          {row.breakpoint}
                        </span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {row.range}
                        </span>
                        <code
                          className="ml-auto text-xs font-mono px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${row.color}22`, color: row.color }}
                        >
                          {row.cls}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Card structure rules */}
              <RevealBlock delay={0.16}>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 className="text-base font-semibold text-white mb-5">Card structure rules</h3>
                  <div className="space-y-3">
                    {[
                      { rule: "break-inside-avoid", note: "Prevents card split across columns", must: true },
                      { rule: "mb-4 (not gap)", note: "Column gap handled with margin-bottom", must: true },
                      { rule: "overflow-hidden on container", note: "Required for Confined Zoom", must: true },
                      { rule: "width: 100% of column", note: "Cards never set explicit width", must: true },
                      { rule: "height: auto", note: "Let content determine height", must: true },
                      { rule: "aspect-ratio on images", note: "Prevents layout shift", must: false },
                    ].map((item) => (
                      <div key={item.rule} className="flex items-start gap-3">
                        <div
                          className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center"
                          style={{
                            backgroundColor: item.must
                              ? `${ACCENT_GREEN}22`
                              : `${ACCENT_YELLOW}22`,
                            border: `1px solid ${item.must ? ACCENT_GREEN : ACCENT_YELLOW}44`,
                          }}
                        >
                          {item.must ? (
                            <span style={{ color: ACCENT_GREEN }}><CheckIcon className="w-2.5 h-2.5" /></span>
                          ) : (
                            <span className="text-xs" style={{ color: ACCENT_YELLOW }}>~</span>
                          )}
                        </div>
                        <div>
                          <code className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>
                            {item.rule}
                          </code>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Key insight callout */}
              <RevealBlock delay={0.2}>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: `${ACCENT_RED}15`,
                    border: `1px solid ${ACCENT_RED}33`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${ACCENT_RED}22` }}
                    >
                      <span style={{ color: ACCENT_RED }}><GridIcon className="w-3.5 h-3.5" /></span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">
                        Why not CSS Grid masonry?
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        <code style={{ color: ACCENT_YELLOW }}>grid-template-rows: masonry</code> is a
                        draft spec requiring browser flags. CSS columns is universally supported
                        with zero polyfills or JavaScript bridges needed.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENT GALLERY — 4 card type tabs                         */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: ACCENT_PURPLE }}
            >
              Component Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: PRIMARY }}>
              Card{" "}
              <span style={{ color: ACCENT_PURPLE }}>varieties</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(26,26,46,0.55)" }}>
              Every card type follows the same masonry rules — break-inside-avoid, overflow-hidden
              for Confined Zoom, and overlay-reveal actions on hover.
            </p>
          </RevealBlock>

          {/* Tab buttons — Action Snappiness: duration-200 */}
          <RevealBlock delay={0.08} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["photo", "article", "product", "profile"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-200"
                  style={
                    activeTab === tab
                      ? {
                          backgroundColor: PRIMARY,
                          color: "#fff",
                          boxShadow: `0 4px 12px rgba(26,26,46,0.2)`,
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "rgba(26,26,46,0.6)",
                          border: "1px solid rgba(26,26,46,0.1)",
                        }
                  }
                >
                  {tab === "photo"
                    ? "Photo Cards"
                    : tab === "article"
                    ? "Article Cards"
                    : tab === "product"
                    ? "Product Cards"
                    : "Profile Cards"}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.12}>
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(26,26,46,0.06)",
                boxShadow: "0 8px 32px rgba(26,26,46,0.05)",
              }}
            >
              {/* ---- PHOTO CARDS ---- */}
              {activeTab === "photo" && (
                <div>
                  <p
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-6"
                    style={{ color: "rgba(26,26,46,0.4)" }}
                  >
                    Photo cards — Confined Zoom + Overlay Reveal
                  </p>
                  <div className="columns-2 md:columns-4 gap-4">
                    {[
                      { aspect: "aspect-[3/4]", bgFrom: ACCENT_RED, bgTo: "#c23152", label: "Portrait", tag: "Photo" },
                      { aspect: "aspect-square", bgFrom: ACCENT_PURPLE, bgTo: "#5557c4", label: "Square Shot", tag: "Art" },
                      { aspect: "aspect-[2/3]", bgFrom: ACCENT_GREEN, bgTo: "#0ea57e", label: "Vertical", tag: "Nature" },
                      { aspect: "aspect-[4/5]", bgFrom: ACCENT_YELLOW, bgTo: "#e6b800", label: "Landscape", tag: "Travel" },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="break-inside-avoid mb-4 group cursor-pointer rounded-xl overflow-hidden"
                        style={{ boxShadow: "0 2px 8px rgba(26,26,46,0.07)" }}
                      >
                        <div className={`relative overflow-hidden ${c.aspect}`}>
                          <div
                            className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                            style={{ background: `linear-gradient(145deg, ${c.bgFrom}, ${c.bgTo})` }}
                          />
                          <div
                            className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                          >
                            <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <span
                                className="px-2 py-0.5 rounded text-xs font-medium text-white"
                                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                              >
                                {c.tag}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
                            {c.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- ARTICLE CARDS ---- */}
              {activeTab === "article" && (
                <div>
                  <p
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-6"
                    style={{ color: "rgba(26,26,46,0.4)" }}
                  >
                    Article cards — text-driven varying heights
                  </p>
                  <div className="columns-1 md:columns-3 gap-4">
                    {[
                      {
                        tag: "Design",
                        tagColor: ACCENT_PURPLE,
                        title: "The Philosophy of Negative Space in Interface Design",
                        excerpt:
                          "White space is not empty space. It is an active component that guides the eye, signals hierarchy, and creates breathing room for content to land.",
                        readTime: "5 min read",
                        bgAccent: `${ACCENT_PURPLE}15`,
                        borderColor: `${ACCENT_PURPLE}33`,
                      },
                      {
                        tag: "CSS",
                        tagColor: ACCENT_GREEN,
                        title: "CSS Columns vs Grid Masonry",
                        excerpt:
                          "A deep dive into the two approaches for masonry layouts and why CSS columns wins today.",
                        readTime: "3 min read",
                        bgAccent: `${ACCENT_GREEN}15`,
                        borderColor: `${ACCENT_GREEN}33`,
                      },
                      {
                        tag: "UX",
                        tagColor: ACCENT_RED,
                        title: "Why Hover Feedback Must Never Be Delayed Beyond 100ms",
                        excerpt:
                          "Human perception of immediacy breaks at 100ms. Every hover interaction that misses this threshold teaches users that the UI is sluggish, even if the actual operation is fast. Duration-200 is your ceiling for action snappiness.",
                        readTime: "4 min read",
                        bgAccent: `${ACCENT_RED}15`,
                        borderColor: `${ACCENT_RED}33`,
                      },
                    ].map((a) => (
                      <div
                        key={a.title}
                        className="break-inside-avoid mb-4 group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 p-5"
                        style={{
                          backgroundColor: "#fff",
                          border: `1px solid ${a.borderColor}`,
                          boxShadow: "0 2px 10px rgba(26,26,46,0.05)",
                        }}
                      >
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3"
                          style={{ backgroundColor: a.bgAccent, color: a.tagColor }}
                        >
                          {a.tag}
                        </span>
                        <h3
                          className="font-semibold text-sm leading-snug mb-2"
                          style={{ color: PRIMARY }}
                        >
                          {a.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed mb-3"
                          style={{ color: "rgba(26,26,46,0.5)" }}
                        >
                          {a.excerpt}
                        </p>
                        <span className="text-xs" style={{ color: "rgba(26,26,46,0.35)" }}>
                          {a.readTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- PRODUCT CARDS ---- */}
              {activeTab === "product" && (
                <div>
                  <p
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-6"
                    style={{ color: "rgba(26,26,46,0.4)" }}
                  >
                    Product cards — e-commerce masonry style
                  </p>
                  <div className="columns-2 md:columns-4 gap-4">
                    {[
                      {
                        name: "Ceramic Mug",
                        price: "$24",
                        aspect: "aspect-[3/4]",
                        bgFrom: ACCENT_YELLOW,
                        bgTo: "#e6b800",
                        badge: "New" as string | null,
                      },
                      {
                        name: "Linen Tote",
                        price: "$48",
                        aspect: "aspect-square",
                        bgFrom: ACCENT_GREEN,
                        bgTo: "#0ea57e",
                        badge: null as string | null,
                      },
                      {
                        name: "Leather Journal",
                        price: "$65",
                        aspect: "aspect-[2/3]",
                        bgFrom: PRIMARY,
                        bgTo: "#2d2d4e",
                        badge: "Sale" as string | null,
                      },
                      {
                        name: "Oak Coasters",
                        price: "$32",
                        aspect: "aspect-[4/5]",
                        bgFrom: ACCENT_PURPLE,
                        bgTo: "#5557c4",
                        badge: null as string | null,
                      },
                    ].map((p) => (
                      <div
                        key={p.name}
                        className="break-inside-avoid mb-4 group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        style={{
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 8px rgba(26,26,46,0.07)",
                        }}
                      >
                        <div className={`relative overflow-hidden ${p.aspect}`}>
                          <div
                            className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                            style={{ background: `linear-gradient(145deg, ${p.bgFrom}, ${p.bgTo})` }}
                          />
                          {p.badge && (
                            <div className="absolute top-2.5 left-2.5">
                              <span
                                className="px-2 py-0.5 rounded text-xs font-bold"
                                style={{
                                  backgroundColor:
                                    p.badge === "Sale" ? ACCENT_RED : ACCENT_GREEN,
                                  color: "#fff",
                                }}
                              >
                                {p.badge}
                              </span>
                            </div>
                          )}
                          {/* Add to cart — overlay reveal */}
                          <div className="absolute inset-0 flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              className="w-full py-2 rounded-lg text-xs font-semibold text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                              style={{
                                backgroundColor: "rgba(26,26,46,0.85)",
                                backdropFilter: "blur(4px)",
                              }}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: PRIMARY }}>
                            {p.name}
                          </span>
                          <span className="text-sm font-bold" style={{ color: ACCENT_RED }}>
                            {p.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- PROFILE CARDS ---- */}
              {activeTab === "profile" && (
                <div>
                  <p
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-6"
                    style={{ color: "rgba(26,26,46,0.4)" }}
                  >
                    Profile cards — social / team directory
                  </p>
                  <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                    {[
                      {
                        name: "Yuki Tanaka",
                        role: "Product Designer",
                        bio: "Obsessed with the space between pixels. 8 years crafting interfaces that feel inevitable.",
                        tags: ["UI", "Motion", "Systems"],
                        avatarColor: ACCENT_RED,
                        posts: 142,
                        followers: "8.4k",
                      },
                      {
                        name: "Marcus Lee",
                        role: "Frontend Engineer",
                        bio: "CSS architecture and performance engineering. Contributor to open-source animation libraries. CSS columns evangelist.",
                        tags: ["CSS", "React", "TypeScript"],
                        avatarColor: ACCENT_PURPLE,
                        posts: 89,
                        followers: "3.1k",
                      },
                      {
                        name: "Sofia Chen",
                        role: "Photographer",
                        bio: "Documentary work across 40 countries.",
                        tags: ["Documentary", "Travel"],
                        avatarColor: ACCENT_GREEN,
                        posts: 611,
                        followers: "22k",
                      },
                    ].map((prof) => (
                      <div
                        key={prof.name}
                        className="break-inside-avoid mb-4 group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 p-5"
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid rgba(26,26,46,0.07)",
                          boxShadow: "0 2px 10px rgba(26,26,46,0.05)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: prof.avatarColor }}
                          >
                            <UserIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: PRIMARY }}>
                              {prof.name}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(26,26,46,0.45)" }}>
                              {prof.role}
                            </p>
                          </div>
                        </div>
                        <p
                          className="text-xs leading-relaxed mb-4"
                          style={{ color: "rgba(26,26,46,0.55)" }}
                        >
                          {prof.bio}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {prof.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-xs font-medium"
                              style={{
                                backgroundColor: `${prof.avatarColor}15`,
                                color: prof.avatarColor,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div
                          className="flex items-center gap-4 pt-3 border-t text-xs"
                          style={{
                            borderColor: "rgba(26,26,46,0.07)",
                            color: "rgba(26,26,46,0.45)",
                          }}
                        >
                          <span>
                            <strong style={{ color: PRIMARY }}>{prof.posts}</strong> posts
                          </span>
                          <span>
                            <strong style={{ color: PRIMARY }}>{prof.followers}</strong> followers
                          </span>
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

      {/* ================================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES — 4 interactive demo cards      */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-5 md:px-10"
        style={{ backgroundColor: PRIMARY }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: ACCENT_GREEN }}
            >
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Animation{" "}
              <span style={{ color: ACCENT_GREEN }}>rules demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Four named interaction patterns from the masonry-flow aiRules. Hover or interact with
              each card to feel the exact specified behavior.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Confined Zoom */}
            <RevealBlock delay={0.08}>
              <div
                className="rounded-2xl p-7 h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${ACCENT_RED}22`, color: ACCENT_RED }}
                  >
                    Confined Zoom
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  group-hover:scale-105 duration-700
                </p>
                <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Image scales inside overflow-hidden — never breaks container boundary
                </p>

                {/* Demo */}
                <div
                  className="group rounded-xl overflow-hidden cursor-pointer aspect-video relative"
                  onMouseEnter={() => setZoomHovered(true)}
                  onMouseLeave={() => setZoomHovered(false)}
                >
                  <div
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{
                      background: `linear-gradient(145deg, ${ACCENT_RED}, ${ACCENT_PURPLE})`,
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <SearchIcon className="w-8 h-8" />
                  </div>
                  {/* Border indicator — shows scale is INSIDE */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: `2px dashed ${ACCENT_RED}88` }}
                  />
                </div>
                <p className="text-xs mt-3 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {zoomHovered
                    ? "Scaling 105% — dashed border never moves"
                    : "Hover to see scale contained within border"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 2: Subtle Elevation */}
            <RevealBlock delay={0.12}>
              <div
                className="rounded-2xl p-7 h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${ACCENT_YELLOW}22`, color: ACCENT_YELLOW }}
                  >
                    Subtle Elevation
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  hover:-translate-y-1 + diffused shadow
                </p>
                <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Max 4px lift. Soft diffused shadow, never a hard border ring.
                </p>

                {/* Demo */}
                <div className="flex items-center justify-center py-4">
                  <div
                    className="rounded-xl p-6 cursor-pointer transition-all duration-300 text-center w-48"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      transform: elevationHovered ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: elevationHovered
                        ? "0 15px 30px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.15)"
                        : "0 2px 8px rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={() => setElevationHovered(true)}
                    onMouseLeave={() => setElevationHovered(false)}
                  >
                    <GridIcon className="w-8 h-8 mx-auto mb-2 text-white opacity-60" />
                    <p className="text-xs text-white opacity-60">Hover me</p>
                  </div>
                </div>
                <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {elevationHovered
                    ? "4px lift — shadow grows soft and diffused"
                    : "Hover to float with diffused shadow"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 3: Overlay Reveal */}
            <RevealBlock delay={0.16}>
              <div
                className="rounded-2xl p-7 h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${ACCENT_GREEN}22`, color: ACCENT_GREEN }}
                  >
                    Overlay Reveal
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  opacity + translate — card size unchanged
                </p>
                <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Overlay and buttons slide in. Card never resizes or shifts layout.
                </p>

                {/* Demo */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-video cursor-pointer"
                  onMouseEnter={() => setOverlayHovered(true)}
                  onMouseLeave={() => setOverlayHovered(false)}
                >
                  <div
                    className="w-full h-full"
                    style={{ background: `linear-gradient(145deg, ${ACCENT_GREEN}, #0ea57e)` }}
                  />
                  {/* Overlay — opacity transition */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      opacity: overlayHovered ? 1 : 0,
                    }}
                  >
                    {/* Action buttons — translate + opacity */}
                    <div
                      className="flex gap-2 transition-all duration-300"
                      style={{
                        transform: overlayHovered ? "translateY(0)" : "translateY(16px)",
                        opacity: overlayHovered ? 1 : 0,
                      }}
                    >
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <SaveIcon className="w-3 h-3" />
                        Save
                      </button>
                      <button
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <HeartIcon className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-3 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {overlayHovered
                    ? "Overlay appeared — card height unchanged"
                    : "Hover to reveal overlay without resizing card"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 4: Action Snappiness */}
            <RevealBlock delay={0.2}>
              <div
                className="rounded-2xl p-7 h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${ACCENT_PURPLE}22`, color: ACCENT_PURPLE }}
                  >
                    Action Snappiness
                  </span>
                </div>
                <p className="text-xs font-mono mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  duration-200 on filter/category buttons
                </p>
                <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Top filters respond in 200ms — feels instant, never laggy.
                </p>

                {/* Demo */}
                <div className="space-y-4">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Click to switch — feel the instant 200ms feedback
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Photos", "Art", "Design", "Video"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSnappyActive(cat)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                        style={
                          snappyActive === cat
                            ? { backgroundColor: ACCENT_PURPLE, color: "#fff" }
                            : {
                                backgroundColor: "rgba(255,255,255,0.07)",
                                color: "rgba(255,255,255,0.5)",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }
                        }
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div
                    className="rounded-lg p-3 text-xs font-mono"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.25)",
                      color: ACCENT_PURPLE,
                      border: `1px solid ${ACCENT_PURPLE}33`,
                    }}
                  >
                    Active: <span className="text-white">{snappyActive}</span>
                    {"  "}transition:{" "}
                    <span style={{ color: ACCENT_YELLOW }}>200ms</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Compare: card hover uses 300ms — only filters use 200ms for snappy feel.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN RULES DO / DON'T                                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
              style={{ color: ACCENT_RED }}
            >
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: PRIMARY }}>
              Do and{" "}
              <span style={{ color: ACCENT_RED }}>Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(26,26,46,0.55)" }}>
              Every rule in the masonry-flow style definition distilled into actionable guidance.
              These constraints enforce visual consistency across all generated UIs.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Do list */}
            <RevealBlock delay={0.08}>
              <div
                className="rounded-2xl p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(21,199,154,0.2)",
                  boxShadow: `0 8px 24px ${ACCENT_GREEN}12`,
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENT_GREEN}18` }}
                  >
                    <span style={{ color: ACCENT_GREEN }}><CheckIcon className="w-4 h-4" /></span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: ACCENT_GREEN }}>
                    Do
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Use CSS columns: columns-2 md:columns-3 lg:columns-4",
                    "Apply break-inside-avoid to every masonry card",
                    "Keep column gap consistent with gap-4",
                    "Use overflow-hidden on image container for Confined Zoom",
                    "Set group-hover:scale-105 duration-700 inside overflow-hidden",
                    "Limit hover lift to -translate-y-1 (4px max)",
                    "Use diffused shadow for hover feedback — no hard borders",
                    "Reveal overlays with opacity + translate — never resize card",
                    "Use duration-200 on filter and category buttons",
                    "Reduce to columns-1 on mobile (below 640px)",
                    "Add varying aspect ratios across cards for visual rhythm",
                    "Use consistent mb-4 between cards within columns",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "rgba(26,26,46,0.7)" }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: ACCENT_GREEN }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.12}>
              <div
                className="rounded-2xl p-8 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(233,69,96,0.2)",
                  boxShadow: `0 8px 24px ${ACCENT_RED}10`,
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENT_RED}12` }}
                  >
                    <span style={{ color: ACCENT_RED }}><XIcon className="w-4 h-4" /></span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: ACCENT_RED }}>
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Force all cards equal height — defeats the purpose entirely",
                    "Use inconsistent card widths within the masonry grid",
                    "Use inconsistent column gaps or irregular spacing",
                    "Let image scale break out of overflow-hidden boundary",
                    "Exceed -translate-y-1 on hover — disrupts visual flow",
                    "Use hard border rings as focus feedback (use shadow instead)",
                    "Resize the card on hover — only overlay reveals, card stays",
                    "Use duration-300+ on filter buttons (must feel instant)",
                    "Use more than 2 columns on screens below 640px",
                    "Skip loading states for real images in production",
                    "Mix gap-4 and gap-6 inconsistently — pick one globally",
                    "Use CSS Grid instead — columns is the correct technique",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "rgba(26,26,46,0.7)" }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: ACCENT_RED }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Summary principle cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Confined Zoom",
                code: "group-hover:scale-105\nduration-700",
                color: ACCENT_RED,
                desc: "Always inside overflow-hidden",
              },
              {
                title: "Subtle Elevation",
                code: "hover:-translate-y-1\ndiffused shadow",
                color: ACCENT_YELLOW,
                desc: "Max 4px, no hard borders",
              },
              {
                title: "Overlay Reveal",
                code: "opacity + translate\ncard size locked",
                color: ACCENT_GREEN,
                desc: "Content floats in, card stays",
              },
              {
                title: "Action Snappiness",
                code: "duration-200\nfilters only",
                color: ACCENT_PURPLE,
                desc: "Instant category feedback",
              },
            ].map((p, i) => (
              <RevealBlock key={p.title} delay={i * 0.06}>
                <div
                  className="rounded-xl p-5 h-full transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{
                    backgroundColor: "#fff",
                    border: `1px solid ${p.color}25`,
                    boxShadow: `0 4px 16px ${p.color}12`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${p.color}18` }}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color }} />
                  </div>
                  <h4 className="text-sm font-bold mb-2" style={{ color: PRIMARY }}>
                    {p.title}
                  </h4>
                  <code
                    className="block text-xs font-mono leading-relaxed mb-2 whitespace-pre"
                    style={{ color: p.color }}
                  >
                    {p.code}
                  </code>
                  <p className="text-xs" style={{ color: "rgba(26,26,46,0.45)" }}>
                    {p.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer
        className="relative overflow-hidden border-t"
        style={{ backgroundColor: PRIMARY, borderColor: "rgba(255,255,255,0.06)" }}
      >
        {/* Accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-32 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${ACCENT_RED}, ${ACCENT_PURPLE}, ${ACCENT_GREEN})`,
          }}
        />

        {/* Background accent blobs */}
        <div
          className="absolute top-10 right-10 w-64 h-64 rounded-full pointer-events-none blur-3xl"
          style={{ backgroundColor: ACCENT_PURPLE, opacity: 0.1 }}
        />
        <div
          className="absolute bottom-10 left-10 w-48 h-48 rounded-full pointer-events-none blur-3xl"
          style={{ backgroundColor: ACCENT_GREEN, opacity: 0.08 }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-14 pb-10 relative">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: ACCENT_RED }}
                >
                  <GridIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Masonry<span style={{ color: ACCENT_RED }}>Flow</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Pinterest-style masonry layout using CSS columns. Varying card heights,
                confined zoom, overlay reveals — all in pure CSS.
              </p>
              {/* Accent swatches */}
              <div className="flex gap-2">
                {[ACCENT_RED, ACCENT_GREEN, ACCENT_YELLOW, ACCENT_PURPLE].map((color) => (
                  <div
                    key={color}
                    className="w-5 h-5 rounded-full transition-transform duration-200 hover:scale-125 cursor-default"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div
                  className="w-5 h-5 rounded-full transition-transform duration-200 hover:scale-125 cursor-default"
                  style={{ backgroundColor: "#fff", opacity: 0.15 }}
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Style
                </span>
                <Link
                  href="/styles/masonry-flow"
                  className="transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/masonry-flow/showcase"
                  className="transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/masonry-flow/cover"
                  className="transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Palette
                </span>
                {[
                  { name: "Deep Navy", color: "#1a1a2e" },
                  { name: "Crimson Red", color: ACCENT_RED },
                  { name: "Teal Green", color: ACCENT_GREEN },
                  { name: "Golden Yellow", color: ACCENT_YELLOW },
                  { name: "Violet Purple", color: ACCENT_PURPLE },
                ].map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <span
                      className="w-3 h-3 rounded-full inline-block shrink-0"
                      style={{
                        backgroundColor: s.color,
                        border:
                          s.color === "#1a1a2e"
                            ? "1px solid rgba(255,255,255,0.2)"
                            : "none",
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
            className="h-px mb-8 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span style={{ color: ACCENT_RED }}><GridIcon className="w-4 h-4" /></span>
              <span>Masonry Flow for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
