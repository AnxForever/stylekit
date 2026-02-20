"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Feature" | "Design" | "Launch" | "Milestone";

interface TimelineItem {
  id: number;
  year: string;
  date: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  accentColor: string;
  glowColor: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 1,
    year: "2021",
    date: "Jan 2021",
    title: "Project Inception",
    description:
      "StyleKit was conceived as a design system for modern web interfaces. The founding team agreed on a single guiding principle: every style must be opinionated yet composable, so that teams can ship faster without sacrificing character.",
    category: "Milestone",
    accentColor: "#ef4444",
    glowColor: "rgba(239,68,68,0.5)",
  },
  {
    id: 2,
    year: "2021",
    date: "Jun 2021",
    title: "Core Token System",
    description:
      "Introduced a unified token architecture covering color, spacing, radius, and motion. Every style now inherits from a shared semantic layer, enabling consistent theming across all styles in the collection.",
    category: "Feature",
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.5)",
  },
  {
    id: 3,
    year: "2022",
    date: "Feb 2022",
    title: "First Public Alpha",
    description:
      "StyleKit shipped its first public alpha with twelve core styles. Community feedback shaped the interaction physics model that powers every hover and transition in the library. The alternating timeline layout was among the first to ship.",
    category: "Launch",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.5)",
  },
  {
    id: 4,
    year: "2022",
    date: "Aug 2022",
    title: "Interaction Physics Engine",
    description:
      "A dedicated interaction layer was added, giving each style its own motion vocabulary: pull-out effects, node synchronization, spring easing, and group-based hover orchestration that treats card, dot, and connector as a single unit.",
    category: "Feature",
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.5)",
  },
  {
    id: 5,
    year: "2023",
    date: "Mar 2023",
    title: "Visual Identity Refresh",
    description:
      "The showcase system was redesigned from scratch. Each style now ships with a fully self-contained showcase demonstrating layout, color, motion, and component variants in complete isolation from the rest of the library.",
    category: "Design",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.5)",
  },
  {
    id: 6,
    year: "2023",
    date: "Sep 2023",
    title: "v1.0 Stable Release",
    description:
      "Forty-one styles graduated to stable. Every style passed a twelve-point checklist covering accessibility, mobile responsiveness, contrast ratios, and interaction parity across screen sizes and input methods.",
    category: "Launch",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.5)",
  },
  {
    id: 7,
    year: "2024",
    date: "Apr 2024",
    title: "Timeline Vertical Style",
    description:
      "The Timeline Vertical style was added to represent chronological storytelling. The central spine, alternating card layout, and node synchronization make it the most spatially expressive style in the collection.",
    category: "Design",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.5)",
  },
  {
    id: 8,
    year: "2024",
    date: "Nov 2024",
    title: "Community Showcase Program",
    description:
      "StyleKit opened its showcase program to community contributors. Each accepted submission is reviewed against the Style Addition Checklist and integrated with full showcase coverage, tests, and documentation.",
    category: "Milestone",
    accentColor: "#ef4444",
    glowColor: "rgba(239,68,68,0.5)",
  },
];

const CATEGORIES: Category[] = ["All", "Feature", "Design", "Launch", "Milestone"];

const CATEGORY_META: Record<
  Exclude<Category, "All">,
  { bg: string; text: string; dot: string; border: string }
> = {
  Feature: {
    bg: "bg-[#eff6ff]",
    text: "text-[#3b82f6]",
    dot: "bg-[#3b82f6]",
    border: "border-[#bfdbfe]",
  },
  Design: {
    bg: "bg-[#fffbeb]",
    text: "text-[#f59e0b]",
    dot: "bg-[#f59e0b]",
    border: "border-[#fde68a]",
  },
  Launch: {
    bg: "bg-[#ecfdf5]",
    text: "text-[#10b981]",
    dot: "bg-[#10b981]",
    border: "border-[#a7f3d0]",
  },
  Milestone: {
    bg: "bg-[#fef2f2]",
    text: "text-[#ef4444]",
    dot: "bg-[#ef4444]",
    border: "border-[#fecaca]",
  },
};

// ─── Inline useInView ─────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─── Inline RevealBlock ───────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeComponentTab, setActiveComponentTab] = useState<
    "Node Types" | "Card Variants" | "Line Styles"
  >("Node Types");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredItems =
    activeFilter === "All"
      ? TIMELINE_ITEMS
      : TIMELINE_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      <style>{`
        @keyframes draw-line {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes node-pop {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          70%  { transform: translate(-50%, -50%) scale(1.15); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes card-slide-left {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes card-slide-right {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hero-spine {
          transform-origin: top center;
          animation: draw-line 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s both;
        }
        .hero-node-1 { animation: node-pop 0.5s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .hero-node-2 { animation: node-pop 0.5s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
        .hero-node-3 { animation: node-pop 0.5s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .hero-node-4 { animation: node-pop 0.5s cubic-bezier(0.16,1,0.3,1) 1.3s both; }
        .hero-card-l { animation: card-slide-left 0.5s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
        .hero-card-r { animation: card-slide-right 0.5s cubic-bezier(0.16,1,0.3,1) 0.95s both; }
        .hero-card-l2 { animation: card-slide-left 0.5s cubic-bezier(0.16,1,0.3,1) 1.15s both; }
        .hero-card-r2 { animation: card-slide-right 0.5s cubic-bezier(0.16,1,0.3,1) 1.35s both; }
      `}</style>

      {/* ================================================================ */}
      {/* NAV                                                               */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8fafc]/90 backdrop-blur-sm border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/styles/timeline-vertical/showcase"
              className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#1e293b]"
            >
              {/* Miniature spine + dot motif */}
              <span className="flex flex-col items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span className="w-px h-3 bg-[#e2e8f0]" />
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              </span>
              Timeline Vertical
            </Link>

            <nav className="flex items-center gap-5">
              {["Demo", "Components", "Colors", "Rules"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-xs font-medium tracking-widest uppercase text-[#94a3b8] hover:text-[#3b82f6] transition-colors duration-200 hidden md:inline"
                >
                  {label}
                </a>
              ))}
              <Link
                href="/styles/timeline-vertical"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors duration-200"
              >
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="pt-28 pb-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[520px]">

          {/* Left: copy */}
          <div>
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
              }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#3b82f6] mb-5">
                <span className="w-5 h-px bg-[#3b82f6]" />
                StyleKit Style
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#1e293b] mb-5">
              <span
                style={{
                  display: "inline-block",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Timeline
              </span>
              <br />
              <span
                style={{
                  display: "inline-block",
                  color: "#3b82f6",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Vertical
              </span>
            </h1>

            <p
              className="text-base text-[#64748b] leading-relaxed max-w-sm mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              Stories unfold chronologically. The vertical line is a spine —
              everything branches from it. Time flows downward.
            </p>

            {/* Category pills */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s",
              }}
            >
              {(
                ["Feature", "Design", "Launch", "Milestone"] as const
              ).map((cat) => {
                const m = CATEGORY_META[cat];
                return (
                  <span
                    key={cat}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${m.bg} ${m.text} ${m.border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                    {cat}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: animated hero timeline preview */}
          <div
            className="relative flex justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <div className="relative" style={{ width: 320, height: 460 }}>
              {/* Spine */}
              <div
                className="absolute hero-spine bg-[#e2e8f0]"
                style={{ left: "50%", top: 0, bottom: 0, width: 1, transform: "translateX(-50%)" }}
              />

              {/* Node + card row 1: left card */}
              <div className="absolute" style={{ top: 40, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="hero-node-1 absolute w-4 h-4 rounded-full border-2 border-white"
                  style={{
                    backgroundColor: "#ef4444",
                    boxShadow: "0 0 0 3px rgba(239,68,68,0.15)",
                    top: "50%",
                    left: "50%",
                  }}
                />
                <div
                  className="hero-card-l absolute bg-white rounded-lg px-3 py-2 shadow-sm border border-[#e2e8f0]"
                  style={{ right: 20, top: -10, minWidth: 110 }}
                >
                  <div className="text-[10px] font-bold text-[#ef4444] mb-1">Milestone</div>
                  <div className="text-[11px] font-semibold text-[#1e293b]">Inception</div>
                  <div className="w-14 h-1 bg-[#f1f5f9] rounded-full mt-1.5" />
                </div>
              </div>

              {/* Node + card row 2: right card */}
              <div className="absolute" style={{ top: 150, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="hero-node-2 absolute w-4 h-4 rounded-full border-2 border-white"
                  style={{
                    backgroundColor: "#3b82f6",
                    boxShadow: "0 0 0 3px rgba(59,130,246,0.15)",
                    top: "50%",
                    left: "50%",
                  }}
                />
                <div
                  className="hero-card-r absolute bg-white rounded-lg px-3 py-2 shadow-sm border border-[#e2e8f0]"
                  style={{ left: 20, top: -10, minWidth: 110 }}
                >
                  <div className="text-[10px] font-bold text-[#3b82f6] mb-1">Feature</div>
                  <div className="text-[11px] font-semibold text-[#1e293b]">Tokens</div>
                  <div className="w-16 h-1 bg-[#f1f5f9] rounded-full mt-1.5" />
                </div>
              </div>

              {/* Node + card row 3: left card */}
              <div className="absolute" style={{ top: 260, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="hero-node-3 absolute w-4 h-4 rounded-full border-2 border-white"
                  style={{
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,0.15)",
                    top: "50%",
                    left: "50%",
                  }}
                />
                <div
                  className="hero-card-l2 absolute bg-white rounded-lg px-3 py-2 shadow-sm border border-[#e2e8f0]"
                  style={{ right: 20, top: -10, minWidth: 110 }}
                >
                  <div className="text-[10px] font-bold text-[#10b981] mb-1">Launch</div>
                  <div className="text-[11px] font-semibold text-[#1e293b]">v1 Alpha</div>
                  <div className="w-12 h-1 bg-[#f1f5f9] rounded-full mt-1.5" />
                </div>
              </div>

              {/* Node + card row 4: right card */}
              <div className="absolute" style={{ top: 370, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="hero-node-4 absolute w-4 h-4 rounded-full border-2 border-white"
                  style={{
                    backgroundColor: "#f59e0b",
                    boxShadow: "0 0 0 3px rgba(245,158,11,0.15)",
                    top: "50%",
                    left: "50%",
                  }}
                />
                <div
                  className="hero-card-r2 absolute bg-white rounded-lg px-3 py-2 shadow-sm border border-[#e2e8f0]"
                  style={{ left: 20, top: -10, minWidth: 110 }}
                >
                  <div className="text-[10px] font-bold text-[#f59e0b] mb-1">Design</div>
                  <div className="text-[11px] font-semibold text-[#1e293b]">Showcase</div>
                  <div className="w-10 h-1 bg-[#f1f5f9] rounded-full mt-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* LIVE TIMELINE DEMO                                                */}
      {/* ================================================================ */}
      <section id="demo" className="py-24 px-6 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="block text-xs font-bold tracking-widest uppercase text-[#3b82f6] mb-2">
                Interactive Demo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] leading-tight">
                StyleKit Milestones
              </h2>
              <p className="text-sm text-[#64748b] mt-2 max-w-sm">
                Hover any item — card, dot, and line segment respond together via Node Synchronization.
              </p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveFilter(cat);
                    setExpandedId(null);
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-[#3b82f6] text-white border-[#3b82f6]"
                      : "bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#3b82f6] hover:text-[#3b82f6]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Timeline */}
        <div className="relative">
          {/* ── Central spine ── */}
          {/* Mobile: pinned at left-5. Desktop: centered at left-1/2 */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-[#e2e8f0] md:-translate-x-1/2 pointer-events-none" />

          <div className="space-y-1">
            {filteredItems.map((item, index) => {
              const isRight = index % 2 === 1;
              const meta = CATEGORY_META[item.category];
              const isExpanded = expandedId === item.id;

              return (
                <RevealBlock key={item.id} delay={Math.min(index * 0.06, 0.4)}>
                  {/*
                    group: wraps the entire row so card, dot, and line segment
                    all share the same hover context (Node Synchronization).
                  */}
                  <div className="group relative flex items-stretch">

                    {/* ── Desktop LEFT card slot ── */}
                    <div className="hidden md:flex flex-1 items-center justify-end pr-8 py-5">
                      {!isRight ? (
                        // Even index → card on LEFT on desktop
                        <div
                          className={`
                            w-full max-w-sm bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm cursor-pointer
                            transition-all duration-200 ease-out
                            group-hover:-translate-y-1 group-hover:translate-x-1
                            group-hover:shadow-md group-hover:border-[#cbd5e1]
                          `}
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8]">
                              {item.date}
                            </span>
                            <span
                              className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${meta.bg} ${meta.text} ${meta.border}`}
                            >
                              <span className={`w-1 h-1 rounded-full ${meta.dot}`} />
                              {item.category}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-[#1e293b] mb-2">{item.title}</h3>
                          <p
                            className="text-xs text-[#64748b] leading-relaxed overflow-hidden"
                            style={{
                              maxHeight: isExpanded ? 160 : 40,
                              transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                            }}
                          >
                            {item.description}
                          </p>
                          <button
                            type="button"
                            className={`mt-2 text-[11px] font-bold transition-colors duration-200 ${meta.text} hover:underline`}
                          >
                            {isExpanded ? "Collapse" : "Read more"}
                          </button>
                        </div>
                      ) : (
                        // Odd index → empty spacer on left desktop slot
                        <div className="w-full max-w-sm" />
                      )}
                    </div>

                    {/* ── Center: node dot + line segments ── */}
                    {/*
                      The node dot and the two line segments (above/below) are
                      all inside the group wrapper. On group-hover:
                        - dot scales to 125% and gets a glow shadow
                        - both line segments transition from slate to blue
                      This is the Node Synchronization pattern.
                    */}
                    <div className="relative flex-shrink-0 flex flex-col items-center z-10">
                      {/* Line segment above node */}
                      <div
                        className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#3b82f6]"
                        style={{ backgroundColor: "#e2e8f0", minHeight: 20 }}
                      />

                      {/* Node dot */}
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white flex-shrink-0 transition-all duration-200 ease-out group-hover:scale-125"
                        style={{
                          backgroundColor: item.accentColor,
                          // Glow is applied via inline style toggled by CSS group-hover
                          // We use onMouseEnter/Leave for the glow since Tailwind
                          // cannot dynamically encode per-item glow rgba values.
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            `0 0 10px ${item.glowColor}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        }}
                      />

                      {/* Line segment below node */}
                      <div
                        className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#3b82f6]"
                        style={{ backgroundColor: "#e2e8f0", minHeight: 20 }}
                      />
                    </div>

                    {/* ── Right card slot (mobile: always; desktop: odd index only) ── */}
                    <div className="flex-1 flex items-center pl-6 md:pl-8 py-5">
                      {/*
                        Mobile: always render the card here (single-side layout).
                        Desktop: only render if isRight (odd index).
                      */}
                      <div className={isRight ? "block w-full max-w-sm" : "block md:hidden w-full max-w-sm"}>
                        <div
                          className={`
                            bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm cursor-pointer
                            transition-all duration-200 ease-out
                            group-hover:-translate-y-1 group-hover:translate-x-1
                            group-hover:shadow-md group-hover:border-[#cbd5e1]
                          `}
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8]">
                              {item.date}
                            </span>
                            <span
                              className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${meta.bg} ${meta.text} ${meta.border}`}
                            >
                              <span className={`w-1 h-1 rounded-full ${meta.dot}`} />
                              {item.category}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-[#1e293b] mb-2">{item.title}</h3>
                          <p
                            className="text-xs text-[#64748b] leading-relaxed overflow-hidden"
                            style={{
                              maxHeight: isExpanded ? 160 : 40,
                              transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                            }}
                          >
                            {item.description}
                          </p>
                          <button
                            type="button"
                            className={`mt-2 text-[11px] font-bold transition-colors duration-200 ${meta.text} hover:underline`}
                          >
                            {isExpanded ? "Collapse" : "Read more"}
                          </button>
                        </div>
                      </div>

                      {/* Desktop even index: empty spacer on right slot */}
                      {!isRight && <div className="hidden md:block w-full max-w-sm" />}
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>

          {/* End cap */}
          <div className="relative flex justify-start md:justify-center mt-0 pl-4 md:pl-0">
            <div className="w-3 h-3 rounded-full bg-[#e2e8f0] border-2 border-white" />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* COMPONENT DEMO                                                    */}
      {/* ================================================================ */}
      <section
        id="components"
        className="py-24 px-6 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]"
      >
        <RevealBlock className="mb-8">
          <span className="block text-xs font-bold tracking-widest uppercase text-[#3b82f6] mb-2">
            Components
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">Building Blocks</h2>
          <p className="text-sm text-[#64748b] max-w-md">
            The individual pieces that compose a Timeline Vertical layout. Hover each to preview the
            Node Synchronization behavior.
          </p>
        </RevealBlock>

        {/* Tab bar */}
        <RevealBlock className="mb-8" delay={0.05}>
          <div className="flex gap-1 bg-[#f1f5f9] rounded-lg p-1 w-fit">
            {(["Node Types", "Card Variants", "Line Styles"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveComponentTab(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-md transition-all duration-200 ${
                  activeComponentTab === tab
                    ? "bg-white text-[#1e293b] shadow-sm"
                    : "text-[#64748b] hover:text-[#1e293b]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Tab: Node Types */}
        {activeComponentTab === "Node Types" && (
          <RevealBlock>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(
                [
                  { label: "Feature", color: "#3b82f6", glow: "rgba(59,130,246,0.5)", desc: "New capabilities" },
                  { label: "Design", color: "#f59e0b", glow: "rgba(245,158,11,0.5)", desc: "Visual changes" },
                  { label: "Launch", color: "#10b981", glow: "rgba(16,185,129,0.5)", desc: "Public releases" },
                  { label: "Milestone", color: "#ef4444", glow: "rgba(239,68,68,0.5)", desc: "Key achievements" },
                ] as const
              ).map((node) => {
                const m = CATEGORY_META[node.label as Exclude<Category, "All">];
                return (
                  <div
                    key={node.label}
                    className="group bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col items-center gap-3 cursor-default hover:shadow-md transition-all duration-200 ease-out"
                  >
                    {/* Simulate spine + node */}
                    <div className="flex flex-col items-center gap-0">
                      <div className="w-px h-5 bg-[#e2e8f0] group-hover:bg-[#3b82f6] transition-colors duration-200" />
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-125"
                        style={{ backgroundColor: node.color }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            `0 0 10px ${node.glow}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            "0 1px 3px rgba(0,0,0,0.12)";
                        }}
                      />
                      <div className="w-px h-5 bg-[#e2e8f0] group-hover:bg-[#3b82f6] transition-colors duration-200" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#1e293b]">{node.label}</div>
                      <div className="text-xs text-[#94a3b8] mt-0.5">{node.desc}</div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${m.bg} ${m.text}`}
                    >
                      {node.color}
                    </span>
                  </div>
                );
              })}
            </div>
          </RevealBlock>
        )}

        {/* Tab: Card Variants */}
        {activeComponentTab === "Card Variants" && (
          <RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  label: "Default",
                  extraClass: "border-[#e2e8f0]",
                  shadowClass: "shadow-sm",
                  desc: "Standard resting state. Clean border, minimal shadow.",
                },
                {
                  label: "Hover / Elevated",
                  extraClass: "border-[#cbd5e1] -translate-y-1 translate-x-1",
                  shadowClass: "shadow-md",
                  desc: "Pull-out effect active. Card lifts diagonally on group hover.",
                },
                {
                  label: "Expanded",
                  extraClass: "border-[#e2e8f0]",
                  shadowClass: "shadow-sm",
                  desc: "Read-more state. Description max-height animates open.",
                  expanded: true,
                },
              ].map((variant) => (
                <div key={variant.label}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8] mb-3">
                    {variant.label}
                  </p>
                  <div
                    className={`bg-white border rounded-xl p-5 transition-all duration-200 ${variant.extraClass} ${variant.shadowClass}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8]">
                        Jun 2023
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]">
                        <span className="w-1 h-1 rounded-full bg-[#3b82f6]" />
                        Feature
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1e293b] mb-2">Card Title</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">
                      {variant.expanded
                        ? "Full description visible when expanded. The max-height property animates from 40px to 160px using cubic-bezier(0.16,1,0.3,1)."
                        : "Description truncated at two lines..."}
                    </p>
                    {!variant.expanded && (
                      <span className="mt-2 inline-block text-[11px] font-bold text-[#3b82f6]">
                        Read more
                      </span>
                    )}
                    {variant.expanded && (
                      <span className="mt-2 inline-block text-[11px] font-bold text-[#3b82f6]">
                        Collapse
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}

        {/* Tab: Line Styles */}
        {activeComponentTab === "Line Styles" && (
          <RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  label: "Default",
                  color: "#e2e8f0",
                  borderStyle: "solid" as const,
                  desc: "Quiet slate line. Present at all times, never competes for attention.",
                },
                {
                  label: "Active (hover)",
                  color: "#3b82f6",
                  borderStyle: "solid" as const,
                  desc: "Blue highlight fires when any item in the group is hovered.",
                },
                {
                  label: "Future / Pending",
                  color: "#cbd5e1",
                  borderStyle: "dashed" as const,
                  desc: "Dashed variant signals upcoming or incomplete timeline entries.",
                },
              ].map((line) => (
                <div
                  key={line.label}
                  className="bg-white border border-[#e2e8f0] rounded-xl p-5"
                >
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8] mb-4">
                    {line.label}
                  </p>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-0 flex-shrink-0">
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: line.color }}
                      />
                      <div
                        style={{
                          width: 1,
                          height: 52,
                          borderLeft: `1px ${line.borderStyle} ${line.color}`,
                        }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: line.color }}
                      />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#64748b] leading-relaxed">{line.desc}</p>
                      <span
                        className="mt-3 inline-block text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${line.color}28`,
                          color: line.color === "#e2e8f0" ? "#94a3b8" : line.color,
                        }}
                      >
                        {line.color}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}
      </section>

      {/* ================================================================ */}
      {/* COLOR SYSTEM                                                      */}
      {/* ================================================================ */}
      <section
        id="colors"
        className="py-24 px-6 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]"
      >
        <RevealBlock className="mb-10">
          <span className="block text-xs font-bold tracking-widest uppercase text-[#3b82f6] mb-2">
            Color System
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">Accent Colors</h2>
          <p className="text-sm text-[#64748b] max-w-md">
            Four accent colors carry semantic weight. Each maps to a category — they are not
            decorative, they are functional.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Blue",
              hex: "#3b82f6",
              role: "Feature",
              light: "#eff6ff",
              usage: "New capabilities, API additions, technical upgrades.",
            },
            {
              name: "Amber",
              hex: "#f59e0b",
              role: "Design",
              light: "#fffbeb",
              usage: "Visual updates, UI system changes, brand evolution.",
            },
            {
              name: "Green",
              hex: "#10b981",
              role: "Launch",
              light: "#ecfdf5",
              usage: "Public releases, stable shipping, go-live events.",
            },
            {
              name: "Red",
              hex: "#ef4444",
              role: "Milestone",
              light: "#fef2f2",
              usage: "Pivotal moments, company firsts, foundational decisions.",
            },
          ].map((color) => (
            <RevealBlock key={color.name}>
              <div className="group rounded-xl overflow-hidden border border-[#e2e8f0] bg-white hover:shadow-md transition-all duration-200 ease-out">
                <div
                  className="h-20 w-full flex items-end p-3 transition-all duration-200 group-hover:h-24"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="text-white text-[10px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {color.hex}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-[#1e293b]">{color.name}</span>
                    <span
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: color.light, color: color.hex }}
                    >
                      {color.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748b] leading-relaxed">{color.usage}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Base palette row */}
        <RevealBlock className="mt-8" delay={0.15}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: "Primary", hex: "#1e293b" },
              { name: "Background", hex: "#f8fafc" },
              { name: "Surface", hex: "#ffffff" },
              { name: "Border", hex: "#e2e8f0" },
              { name: "Muted text", hex: "#94a3b8" },
              { name: "Slate 600", hex: "#475569" },
            ].map((c) => (
              <div key={c.hex}>
                <div
                  className="h-12 rounded-lg border border-[#e2e8f0] mb-1.5"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="text-[10px] text-[#94a3b8] font-medium leading-tight">{c.name}</p>
                <p className="text-[10px] text-[#cbd5e1] font-mono">{c.hex}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* DESIGN RULES (timeline-style DO/DON'T)                           */}
      {/* ================================================================ */}
      <section
        id="rules"
        className="py-24 px-6 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]"
      >
        <RevealBlock className="mb-12">
          <span className="block text-xs font-bold tracking-widest uppercase text-[#3b82f6] mb-2">
            Design Rules
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">Principles</h2>
          <p className="text-sm text-[#64748b] max-w-md">
            Each rule is a node — guidance that accumulates into a coherent system. Hover to activate
            Node Synchronization on each rule card.
          </p>
        </RevealBlock>

        {/* Single-side rules timeline — mirrors the mobile layout pattern */}
        <div className="relative max-w-2xl">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[#e2e8f0]" />

          {[
            {
              rule: "Spine First",
              verdict: "DO" as const,
              color: "#10b981",
              glow: "rgba(16,185,129,0.5)",
              detail:
                "Always render the central connecting line before nodes. It is the structural anchor — without it, items are just cards.",
            },
            {
              rule: "Break to Single-Column on Mobile",
              verdict: "DO" as const,
              color: "#10b981",
              glow: "rgba(16,185,129,0.5)",
              detail:
                "Switch to single-side layout below md. Alternating left/right is a desktop privilege. Mobile needs the spine flush left.",
            },
            {
              rule: "Synchronize the Group",
              verdict: "DO" as const,
              color: "#10b981",
              glow: "rgba(16,185,129,0.5)",
              detail:
                "Wrap each timeline row in a group div. Card transform, dot scale, and line color must all respond to a single hover context.",
            },
            {
              rule: "Collapse Long Content",
              verdict: "DO" as const,
              color: "#10b981",
              glow: "rgba(16,185,129,0.5)",
              detail:
                "Truncate descriptions at ~40px and expand on click. Vertical rhythm matters more than information density.",
            },
            {
              rule: "Remove the Central Line",
              verdict: "DON'T" as const,
              color: "#ef4444",
              glow: "rgba(239,68,68,0.5)",
              detail:
                "Without the spine, disconnected cards lose all chronological relationship. The line IS the timeline.",
            },
            {
              rule: "Animate Nodes Independently",
              verdict: "DON'T" as const,
              color: "#ef4444",
              glow: "rgba(239,68,68,0.5)",
              detail:
                "Do not trigger card hover and dot hover separately. Node Synchronization requires a shared group context — never split it.",
            },
          ].map((item, i) => (
            <RevealBlock key={item.rule} delay={i * 0.07}>
              <div className="group relative flex items-start gap-0 pl-0 mb-5">
                {/* Node + line segments */}
                <div className="flex-shrink-0 flex flex-col items-center w-10">
                  <div className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#3b82f6]" style={{ backgroundColor: "#e2e8f0", minHeight: 12 }} />
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ease-out group-hover:scale-125"
                    style={{ backgroundColor: item.color }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 8px ${item.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  />
                  <div className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#3b82f6]" style={{ backgroundColor: "#e2e8f0", minHeight: 12 }} />
                </div>

                {/* Card */}
                <div
                  className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-4 ml-2 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-sm group-hover:border-[#cbd5e1]"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${item.color}18`,
                        color: item.color,
                      }}
                    >
                      {item.verdict}
                    </span>
                    <span className="text-sm font-bold text-[#1e293b]">{item.rule}</span>
                  </div>
                  <p className="text-xs text-[#64748b] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTERACTION SPEC                                                  */}
      {/* ================================================================ */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-10">
          <span className="block text-xs font-bold tracking-widest uppercase text-[#3b82f6] mb-2">
            Interaction Spec
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">Motion Model</h2>
          <p className="text-sm text-[#64748b] max-w-md">
            Three concurrent effects triggered by a single group hover context. One easing curve,
            one duration, zero divergence.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            {
              index: "01",
              name: "Pull-Out Effect",
              target: "Card",
              value: "-translate-y-1 translate-x-1",
              prop: "transform",
              desc: "Card lifts diagonally, creating spatial depth and focus.",
            },
            {
              index: "02",
              name: "Node Glow",
              target: "Dot",
              value: "scale(1.25) + shadow glow",
              prop: "transform + box-shadow",
              desc: "Node scales and emits a color-matched glow from the accent palette.",
            },
            {
              index: "03",
              name: "Segment Highlight",
              target: "Line",
              value: "#3b82f6",
              prop: "background-color",
              desc: "Line segments above and below the active node transition to blue.",
            },
          ].map((spec) => (
            <RevealBlock key={spec.name} delay={parseInt(spec.index) * 0.07}>
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#3b82f6] text-xs font-bold">
                    {spec.index}
                  </div>
                  <span className="text-sm font-bold text-[#1e293b]">{spec.name}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    ["Target", spec.target],
                    ["Prop", spec.prop],
                    ["Value", spec.value],
                  ].map(([label, val]) => (
                    <div key={label} className="flex gap-3 text-xs">
                      <span className="text-[#94a3b8] font-medium w-11 flex-shrink-0">{label}</span>
                      <span className="font-mono text-[#475569] break-all">{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed border-t border-[#f1f5f9] pt-3">
                  {spec.desc}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={0.22}>
          <div className="bg-[#1e293b] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-1">
                Shared Easing
              </div>
              <div className="text-white font-mono text-sm">
                cubic-bezier(0.16, 1, 0.3, 1) — 200ms — ease-out
              </div>
            </div>
            <p className="text-xs text-[#94a3b8] max-w-xs leading-relaxed">
              Applied to card transform, dot scale, dot shadow, and line color without exception.
              One curve for the entire interaction system.
            </p>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                            */}
      {/* ================================================================ */}
      <footer className="border-t border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Footer timeline motif */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                <div className="w-px h-5 bg-[#e2e8f0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <div className="w-px h-5 bg-[#e2e8f0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e293b]">StyleKit</div>
                <div className="text-xs text-[#94a3b8]">Timeline Vertical Showcase</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/styles/timeline-vertical"
                className="text-xs font-medium text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-xs font-medium text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
              >
                All Styles
              </Link>
              <Link
                href="/styles/timeline-vertical"
                className="text-xs font-semibold px-4 py-2 rounded-full bg-[#1e293b] text-white hover:bg-[#0f172a] transition-colors duration-200"
              >
                View Full Docs
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex items-center justify-between">
            <p className="text-xs text-[#94a3b8]">
              StyleKit &middot; Timeline Vertical &middot; Stories unfold chronologically.
            </p>
            <div className="flex gap-2">
              {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
                <div
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
