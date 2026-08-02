"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline useInView — IntersectionObserver, threshold 0.15           */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
/*  Inline RevealBlock — cubic-bezier(0.16,1,0.3,1) + delay prop      */
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
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type EventCategory = "Feature" | "Design" | "Launch" | "Milestone";

interface TimelineEvent {
  id: number;
  date: string;
  year: string;
  title: string;
  description: string;
  category: EventCategory;
  color: string;
  glow: string;
}

const EVENTS: TimelineEvent[] = [
  {
    id: 1,
    date: "Jan 2021",
    year: "2021",
    title: "Project Inception",
    description:
      "StyleKit was conceived as an opinionated design system where every style ships with its own motion vocabulary, color semantics, and layout DNA. The founding principle: each style must be self-contained and immediately usable.",
    category: "Milestone",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.45)",
  },
  {
    id: 2,
    date: "Jun 2021",
    year: "2021",
    title: "Unified Token Architecture",
    description:
      "A shared semantic layer was introduced covering color, spacing, radius, and motion tokens. Every subsequent style inherits from this foundation, ensuring cross-style consistency in padding, shadow, and transition timing.",
    category: "Feature",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.45)",
  },
  {
    id: 3,
    date: "Feb 2022",
    year: "2022",
    title: "First Public Alpha",
    description:
      "StyleKit shipped its initial alpha to early adopters with twelve core styles. Community feedback during this period defined the interaction physics model that governs all hover and transition behavior across the library.",
    category: "Launch",
    color: "#10b981",
    glow: "rgba(16,185,129,0.45)",
  },
  {
    id: 4,
    date: "Aug 2022",
    year: "2022",
    title: "Interaction Physics Engine",
    description:
      "A dedicated interaction layer was built, giving each style its own named motion patterns: pull-out effects, node synchronization, spring easing, and coordinated group hover orchestration that treats card, dot, and connector as one unit.",
    category: "Feature",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.45)",
  },
  {
    id: 5,
    date: "Mar 2023",
    year: "2023",
    title: "Showcase System Redesign",
    description:
      "Each style was given a fully self-contained showcase demonstrating layout, color, motion, and component variants without importing anything from shared UI libraries. The zero-dependency showcase pattern was codified.",
    category: "Design",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.45)",
  },
  {
    id: 6,
    date: "Sep 2023",
    year: "2023",
    title: "v1.0 Stable Release",
    description:
      "Forty-one styles graduated to stable after passing a twelve-point checklist covering accessibility, mobile responsiveness, WCAG contrast ratios, and interaction parity across pointer and keyboard input methods.",
    category: "Launch",
    color: "#10b981",
    glow: "rgba(16,185,129,0.45)",
  },
  {
    id: 7,
    date: "Apr 2024",
    year: "2024",
    title: "Timeline Vertical Style",
    description:
      "The Timeline Vertical style was introduced to handle chronological storytelling. The central spine, alternating card layout, and node synchronization pattern make it the most spatially expressive style in the collection.",
    category: "Design",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.45)",
  },
  {
    id: 8,
    date: "Nov 2024",
    year: "2024",
    title: "Community Showcase Program",
    description:
      "StyleKit opened its showcase contribution program. Each accepted submission is reviewed against the Style Addition Checklist and ships with full showcase coverage, TypeScript types, tests, and documentation.",
    category: "Milestone",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.45)",
  },
];

const CATEGORY_META: Record<
  EventCategory,
  { bg: string; text: string; border: string; dot: string }
> = {
  Feature: { bg: "#eff6ff", text: "#3b82f6", border: "#bfdbfe", dot: "#3b82f6" },
  Design: { bg: "#fffbeb", text: "#d97706", border: "#fde68a", dot: "#f59e0b" },
  Launch: { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0", dot: "#10b981" },
  Milestone: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", dot: "#ef4444" },
};

type ComponentTab = "Timeline Nodes" | "Content Cards" | "Alternating Layout" | "Mobile Layout";

/* ------------------------------------------------------------------ */
/*  Small inline SVGs                                                  */
/* ------------------------------------------------------------------ */

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroReady, setHeroReady] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | EventCategory>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("Timeline Nodes");
  const [hoveredDemoCard, setHoveredDemoCard] = useState<number | null>(null);
  const [syncDemoHovered, setSyncDemoHovered] = useState(false);
  const [pulloutDemoHovered, setPulloutDemoHovered] = useState(false);
  const [focusDemoActive, setFocusDemoActive] = useState(false);
  const [speedDemoActive, setSpeedDemoActive] = useState<"slow" | "fast" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 90);
    return () => clearTimeout(t);
  }, []);

  const filtered =
    activeFilter === "All"
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      <style>{`
        @keyframes tl-draw {
          from { transform: scaleY(0); transform-origin: top; }
          to   { transform: scaleY(1); transform-origin: top; }
        }
        @keyframes tl-pop {
          0%   { opacity: 0; transform: scale(0.3); }
          65%  { transform: scale(1.18); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes tl-slide-l {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tl-slide-r {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tl-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
        }
        .tl-spine-anim {
          animation: tl-draw 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .tl-n1 { animation: tl-pop 0.48s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .tl-n2 { animation: tl-pop 0.48s cubic-bezier(0.16,1,0.3,1) 0.88s both; }
        .tl-n3 { animation: tl-pop 0.48s cubic-bezier(0.16,1,0.3,1) 1.06s both; }
        .tl-n4 { animation: tl-pop 0.48s cubic-bezier(0.16,1,0.3,1) 1.24s both; }
        .tl-n5 { animation: tl-pop 0.48s cubic-bezier(0.16,1,0.3,1) 1.42s both; }
        .tl-cl1 { animation: tl-slide-l 0.44s cubic-bezier(0.16,1,0.3,1) 0.76s both; }
        .tl-cr1 { animation: tl-slide-r 0.44s cubic-bezier(0.16,1,0.3,1) 0.94s both; }
        .tl-cl2 { animation: tl-slide-l 0.44s cubic-bezier(0.16,1,0.3,1) 1.12s both; }
        .tl-cr2 { animation: tl-slide-r 0.44s cubic-bezier(0.16,1,0.3,1) 1.3s both; }
        .tl-cl3 { animation: tl-slide-l 0.44s cubic-bezier(0.16,1,0.3,1) 1.48s both; }
        .node-pulse { animation: tl-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* ============================================================== */}
      {/* 1. FIXED NAV                                                    */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8fafc]/92 backdrop-blur-md border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Logo mark */}
          <Link
            href="/styles/timeline-vertical/showcase"
            className="flex items-center gap-3 group"
          >
            <span className="flex flex-col items-center gap-[3px]">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] group-hover:scale-110 transition-transform duration-200 ease-out" />
              <span className="w-px h-3 bg-[#e2e8f0]" />
              <span className="w-2 h-2 rounded-full bg-[#10b981] group-hover:scale-110 transition-transform duration-200 ease-out" />
              <span className="w-px h-3 bg-[#e2e8f0]" />
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] group-hover:scale-110 transition-transform duration-200 ease-out" />
            </span>
            <span className="text-sm font-bold tracking-tight text-[#1e293b]">
              Timeline Vertical
            </span>
          </Link>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {(["Demo", "Anatomy", "Components", "Interactions", "Rules"] as const).map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="px-3 py-1.5 rounded-md text-xs font-medium uppercase tracking-widest text-[#94a3b8] hover:text-[#3b82f6] hover:bg-[#eff6ff] transition-all duration-200 ease-out"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA — back to StyleKit */}
          <Link
            href="/styles/timeline-vertical"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e293b] text-white text-xs font-semibold hover:bg-[#3b82f6] transition-all duration-200 ease-out"
          >
            <span>&#8592;</span>
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO — timeline concept visualization                        */}
      {/* ============================================================== */}
      <section className="pt-28 pb-20 px-5 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[540px]">

          {/* Left: copy */}
          <div>
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
              }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-6">
                <span className="w-5 h-px bg-[#3b82f6]" />
                StyleKit — Layout Style
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-[1.04] tracking-tight text-[#1e293b] mb-5">
              <span
                style={{
                  display: "inline-block",
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(26px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Vertical
              </span>
              <br />
              <span
                style={{
                  display: "inline-block",
                  color: "#3b82f6",
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(26px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Timeline
              </span>
            </h1>

            <p
              className="text-[#64748b] text-base leading-relaxed max-w-sm mb-8"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.32s",
              }}
            >
              A central spine connects every event. Cards branch left and right in alternating rhythm.
              Hover syncs node, connector, and card as a single unit — no element acts alone.
            </p>

            {/* Category tags */}
            <div
              className="flex flex-wrap gap-2 mb-10"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.44s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.44s",
              }}
            >
              {(["Feature", "Design", "Launch", "Milestone"] as const).map((cat) => {
                const m = CATEGORY_META[cat];
                return (
                  <span
                    key={cat}
                    className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
                    style={{ backgroundColor: m.bg, color: m.text, borderColor: m.border }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.dot }} />
                    {cat}
                  </span>
                );
              })}
            </div>

            {/* Stat pills */}
            <div
              className="grid grid-cols-3 gap-3 max-w-xs"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s",
              }}
            >
              {[
                { value: "2px", label: "Spine" },
                { value: "w-4", label: "Node" },
                { value: "200ms", label: "Easing" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-[#e2e8f0] rounded-xl p-3 text-center shadow-sm"
                >
                  <div className="text-sm font-bold font-mono text-[#1e293b]">{stat.value}</div>
                  <div className="text-[10px] text-[#94a3b8] font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated hero preview — 5 nodes, alternating cards */}
          <div
            className="relative flex justify-center"
            style={{
              opacity: heroReady ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <div className="relative" style={{ width: 340, height: 520 }}>
              {/* Central spine */}
              <div
                className="tl-spine-anim absolute bg-[#e2e8f0]"
                style={{ left: "50%", top: 0, bottom: 0, width: 2, transform: "translateX(-50%)" }}
              />

              {/* Row 1 — left card */}
              <div className="absolute" style={{ top: 20, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="tl-n1 absolute w-[18px] h-[18px] rounded-full border-[3px] border-white"
                  style={{ backgroundColor: "#ef4444", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0 0 0 3px rgba(239,68,68,0.14)" }}
                />
                <div
                  className="tl-cl1 absolute bg-white rounded-xl shadow-sm border border-[#e2e8f0] px-4 py-3"
                  style={{ right: 24, top: -14, minWidth: 120 }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#ef4444] mb-1">Milestone</div>
                  <div className="text-[12px] font-semibold text-[#1e293b] mb-1">Inception</div>
                  <div className="text-[9px] text-[#94a3b8]">Jan 2021</div>
                </div>
              </div>

              {/* Row 2 — right card */}
              <div className="absolute" style={{ top: 120, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="tl-n2 absolute w-[18px] h-[18px] rounded-full border-[3px] border-white"
                  style={{ backgroundColor: "#3b82f6", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0 0 0 3px rgba(59,130,246,0.14)" }}
                />
                <div
                  className="tl-cr1 absolute bg-white rounded-xl shadow-sm border border-[#e2e8f0] px-4 py-3"
                  style={{ left: 24, top: -14, minWidth: 120 }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#3b82f6] mb-1">Feature</div>
                  <div className="text-[12px] font-semibold text-[#1e293b] mb-1">Tokens</div>
                  <div className="text-[9px] text-[#94a3b8]">Jun 2021</div>
                </div>
              </div>

              {/* Row 3 — left card */}
              <div className="absolute" style={{ top: 220, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="tl-n3 node-pulse absolute w-[18px] h-[18px] rounded-full border-[3px] border-white"
                  style={{ backgroundColor: "#10b981", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                />
                <div
                  className="tl-cl2 absolute bg-white rounded-xl shadow-sm border border-[#3b82f6] px-4 py-3"
                  style={{ right: 24, top: -14, minWidth: 120, borderWidth: 2 }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#10b981] mb-1">Launch</div>
                  <div className="text-[12px] font-semibold text-[#1e293b] mb-1">Alpha</div>
                  <div className="text-[9px] text-[#94a3b8]">Feb 2022</div>
                </div>
              </div>

              {/* Row 4 — right card */}
              <div className="absolute" style={{ top: 340, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="tl-n4 absolute w-[18px] h-[18px] rounded-full border-[3px] border-white"
                  style={{ backgroundColor: "#f59e0b", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0 0 0 3px rgba(245,158,11,0.14)" }}
                />
                <div
                  className="tl-cr2 absolute bg-white rounded-xl shadow-sm border border-[#e2e8f0] px-4 py-3"
                  style={{ left: 24, top: -14, minWidth: 120 }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#f59e0b] mb-1">Design</div>
                  <div className="text-[12px] font-semibold text-[#1e293b] mb-1">Showcase</div>
                  <div className="text-[9px] text-[#94a3b8]">Mar 2023</div>
                </div>
              </div>

              {/* Row 5 — left card */}
              <div className="absolute" style={{ top: 450, left: "50%", transform: "translateX(-50%)" }}>
                <div
                  className="tl-n5 absolute w-[18px] h-[18px] rounded-full border-[3px] border-white"
                  style={{ backgroundColor: "#ef4444", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0 0 0 3px rgba(239,68,68,0.14)" }}
                />
                <div
                  className="tl-cl3 absolute bg-white rounded-xl shadow-sm border border-[#e2e8f0] px-4 py-3"
                  style={{ right: 24, top: -14, minWidth: 120 }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#ef4444] mb-1">Milestone</div>
                  <div className="text-[12px] font-semibold text-[#1e293b] mb-1">v1 Stable</div>
                  <div className="text-[9px] text-[#94a3b8]">Sep 2023</div>
                </div>
              </div>

              {/* Legend overlay */}
              <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm rounded-xl border border-[#e2e8f0] p-3 shadow-sm">
                <div className="flex flex-col gap-1.5 text-[10px] text-[#94a3b8]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-px bg-[#e2e8f0] inline-block" />
                    Central spine (2px)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] inline-block" />
                    Circular node (w-4 h-4)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-2 rounded bg-white border border-[#e2e8f0] inline-block" />
                    Content card
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LIVE TIMELINE DEMO                                           */}
      {/* ============================================================== */}
      <section id="demo" className="py-24 px-5 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-2">
                Interactive Demo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] leading-tight">
                StyleKit Milestones
              </h2>
              <p className="text-sm text-[#64748b] mt-2 max-w-sm leading-relaxed">
                Hover any row. The node dot, line segments, and card transform simultaneously —
                that is Node Synchronization.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* View toggle */}
              <div className="flex gap-1 bg-[#f1f5f9] rounded-lg p-1 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setMobileView(false)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 ease-out ${
                    !mobileView ? "bg-white text-[#1e293b] shadow-sm" : "text-[#64748b] hover:text-[#1e293b]"
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setMobileView(true)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 ease-out ${
                    mobileView ? "bg-white text-[#1e293b] shadow-sm" : "text-[#64748b] hover:text-[#1e293b]"
                  }`}
                >
                  Mobile
                </button>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Feature", "Design", "Launch", "Milestone"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveFilter(cat);
                      setExpandedId(null);
                    }}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ease-out ${
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
          </div>
        </RevealBlock>

        {/* Timeline container */}
        <div className={mobileView ? "max-w-md" : "w-full"}>
          <div className="relative">
            {/*
              Mobile: spine flush left (left-5).
              Desktop alternating: spine centered (left-1/2) unless mobileView forced.
            */}
            <div
              className={`absolute top-0 bottom-0 w-px bg-[#e2e8f0] pointer-events-none transition-all duration-300 ease-out ${
                mobileView ? "left-5" : "left-5 md:left-1/2 md:-translate-x-[0.5px]"
              }`}
            />

            <div className="space-y-1">
              {filtered.map((event, index) => {
                const isRight = !mobileView && index % 2 === 1;
                const meta = CATEGORY_META[event.category];
                const isExpanded = expandedId === event.id;

                return (
                  <RevealBlock key={event.id} delay={Math.min(index * 0.055, 0.35)}>
                    {/*
                      The entire row is wrapped in a group.
                      Card, node dot, and line segments all react to the group hover.
                      This is the Node Synchronization pattern.
                    */}
                    <div className="group relative flex items-stretch">

                      {/* Desktop LEFT slot */}
                      {!mobileView && (
                        <div className="hidden md:flex flex-1 items-center justify-end pr-8 py-5">
                          {!isRight ? (
                            <div
                              className="w-full max-w-sm bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm cursor-pointer
                                transition-all duration-200 ease-out
                                group-hover:-translate-y-1 group-hover:translate-x-1
                                group-hover:shadow-md group-hover:border-[#3b82f6]"
                              style={{}}
                              onClick={() => setExpandedId(isExpanded ? null : event.id)}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <time className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8]">
                                  {event.date}
                                </time>
                                <span
                                  className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border"
                                  style={{ backgroundColor: meta.bg, color: meta.text, borderColor: meta.border }}
                                >
                                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: meta.dot }} />
                                  {event.category}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-[#1e293b] mb-2">{event.title}</h3>
                              <p
                                className="text-xs text-[#64748b] leading-relaxed overflow-hidden"
                                style={{
                                  maxHeight: isExpanded ? 160 : 42,
                                  transition: "max-height 0.42s cubic-bezier(0.16,1,0.3,1)",
                                }}
                              >
                                {event.description}
                              </p>
                              <button
                                type="button"
                                className="mt-2 text-[11px] font-bold transition-colors duration-200"
                                style={{ color: meta.text }}
                              >
                                {isExpanded ? "Collapse" : "Read more"}
                              </button>
                            </div>
                          ) : (
                            <div className="w-full max-w-sm" />
                          )}
                        </div>
                      )}

                      {/* Center: spine segment + node dot */}
                      <div className="relative flex-shrink-0 flex flex-col items-center z-10">
                        {/* Line above */}
                        <div
                          className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#3b82f6]"
                          style={{ backgroundColor: "#e2e8f0", minHeight: 20 }}
                        />

                        {/* Node dot — scales and glows on group hover */}
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white flex-shrink-0 transition-all duration-200 ease-out group-hover:scale-[1.35]"
                          style={{ backgroundColor: event.color }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.boxShadow =
                              `0 0 0 4px ${event.glow}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                          }}
                        />

                        {/* Line below */}
                        <div
                          className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#3b82f6]"
                          style={{ backgroundColor: "#e2e8f0", minHeight: 20 }}
                        />
                      </div>

                      {/* RIGHT card slot — always visible on mobile; desktop only if isRight */}
                      <div
                        className={`flex-1 flex items-center py-5 ${
                          !mobileView ? "pl-8" : "pl-6"
                        }`}
                      >
                        <div
                          className={
                            isRight || mobileView
                              ? "block w-full max-w-sm"
                              : "block md:hidden w-full max-w-sm"
                          }
                        >
                          <div
                            className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm cursor-pointer
                              transition-all duration-200 ease-out
                              group-hover:-translate-y-1 group-hover:translate-x-1
                              group-hover:shadow-md group-hover:border-[#3b82f6]"
                            onClick={() => setExpandedId(isExpanded ? null : event.id)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <time className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8]">
                                {event.date}
                              </time>
                              <span
                                className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border"
                                style={{ backgroundColor: meta.bg, color: meta.text, borderColor: meta.border }}
                              >
                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: meta.dot }} />
                                {event.category}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-[#1e293b] mb-2">{event.title}</h3>
                            <p
                              className="text-xs text-[#64748b] leading-relaxed overflow-hidden"
                              style={{
                                maxHeight: isExpanded ? 160 : 42,
                                transition: "max-height 0.42s cubic-bezier(0.16,1,0.3,1)",
                              }}
                            >
                              {event.description}
                            </p>
                            <button
                              type="button"
                              className="mt-2 text-[11px] font-bold transition-colors duration-200"
                              style={{ color: meta.text }}
                            >
                              {isExpanded ? "Collapse" : "Read more"}
                            </button>
                          </div>
                        </div>
                        {/* Desktop even: spacer on right */}
                        {!isRight && !mobileView && (
                          <div className="hidden md:block w-full max-w-sm" />
                        )}
                      </div>
                    </div>
                  </RevealBlock>
                );
              })}
            </div>

            {/* End cap */}
            <div
              className={`relative flex mt-0 ${mobileView ? "justify-start pl-4" : "justify-start pl-4 md:justify-center md:pl-0"}`}
            >
              <div className="w-3 h-3 rounded-full bg-[#e2e8f0] border-2 border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LAYOUT ANATOMY                                               */}
      {/* ============================================================== */}
      <section id="anatomy" className="py-24 px-5 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-12">
          <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-2">
            Layout Anatomy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-3">
            How it is built
          </h2>
          <p className="text-sm text-[#64748b] max-w-md leading-relaxed">
            Three structural layers compose every timeline: the central spine, circular node dots,
            and content cards connected via positional alignment.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Annotated diagram */}
          <RevealBlock delay={0.05}>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 shadow-sm relative overflow-hidden">
              <div className="relative flex justify-center" style={{ height: 380 }}>
                {/* Central line — labeled */}
                <div className="absolute" style={{ left: "50%", top: 0, bottom: 0, width: 2, backgroundColor: "#3b82f6", transform: "translateX(-50%)" }}>
                  {/* Label */}
                  <div className="absolute top-4 left-4 whitespace-nowrap">
                    <span className="text-[10px] font-bold text-[#3b82f6] bg-[#eff6ff] px-2 py-0.5 rounded font-mono">
                      Central Line (2px)
                    </span>
                    <div className="w-3 h-px bg-[#3b82f6] absolute -left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Node 1 — with annotation */}
                <div className="absolute" style={{ top: 60, left: "50%", transform: "translateX(-50%)" }}>
                  <div
                    className="w-5 h-5 rounded-full border-[3px] border-white absolute"
                    style={{ backgroundColor: "#3b82f6", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "0 0 0 5px rgba(59,130,246,0.18)" }}
                  />
                  {/* Right annotation */}
                  <div className="absolute whitespace-nowrap" style={{ left: 18, top: -4 }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-px bg-[#94a3b8]" />
                      <span className="text-[10px] font-bold text-[#94a3b8] font-mono">Node dot (w-4 h-4)</span>
                    </div>
                  </div>
                </div>

                {/* LEFT card — node 1 */}
                <div
                  className="absolute bg-white border-2 border-[#e2e8f0] rounded-xl px-4 py-3 shadow-sm"
                  style={{ right: "53%", top: 42, width: 130 }}
                >
                  <div className="text-[9px] font-bold text-[#3b82f6] mb-1">Jan 2021</div>
                  <div className="text-[11px] font-semibold text-[#1e293b] mb-1.5">Card Left</div>
                  <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full" />
                  {/* Arrow pointer to node */}
                  <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 flex items-center">
                    <div className="w-3 h-px bg-[#94a3b8]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />
                  </div>
                </div>

                {/* Node 2 */}
                <div className="absolute" style={{ top: 170, left: "50%", transform: "translateX(-50%)" }}>
                  <div
                    className="w-5 h-5 rounded-full border-[3px] border-white absolute"
                    style={{ backgroundColor: "#10b981", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "0 0 0 5px rgba(16,185,129,0.18)" }}
                  />
                </div>

                {/* RIGHT card — node 2 */}
                <div
                  className="absolute bg-white border-2 border-[#e2e8f0] rounded-xl px-4 py-3 shadow-sm"
                  style={{ left: "53%", top: 152, width: 130 }}
                >
                  <div className="text-[9px] font-bold text-[#10b981] mb-1">Jun 2021</div>
                  <div className="text-[11px] font-semibold text-[#1e293b] mb-1.5">Card Right</div>
                  <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full" />
                  {/* Arrow pointer */}
                  <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />
                    <div className="w-3 h-px bg-[#94a3b8]" />
                  </div>
                </div>

                {/* Node 3 */}
                <div className="absolute" style={{ top: 285, left: "50%", transform: "translateX(-50%)" }}>
                  <div
                    className="w-5 h-5 rounded-full border-[3px] border-white absolute"
                    style={{ backgroundColor: "#f59e0b", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "0 0 0 5px rgba(245,158,11,0.18)" }}
                  />
                </div>

                {/* LEFT card — node 3 */}
                <div
                  className="absolute bg-white border-2 border-[#e2e8f0] rounded-xl px-4 py-3 shadow-sm"
                  style={{ right: "53%", top: 264, width: 130 }}
                >
                  <div className="text-[9px] font-bold text-[#f59e0b] mb-1">Feb 2022</div>
                  <div className="text-[11px] font-semibold text-[#1e293b] mb-1.5">Card Left</div>
                  <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full" />
                  <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 flex items-center">
                    <div className="w-3 h-px bg-[#94a3b8]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />
                  </div>
                </div>

                {/* Desktop label */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                  <span className="text-[10px] text-[#94a3b8] font-medium px-3 py-1 bg-[#f8fafc] rounded-full border border-[#e2e8f0]">
                    Desktop: alternating left/right
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Structural breakdown */}
          <RevealBlock delay={0.12}>
            <div className="space-y-5">
              {[
                {
                  num: "01",
                  label: "Central Spine",
                  color: "#3b82f6",
                  bg: "#eff6ff",
                  code: "position: absolute; width: 2px; left: 50%;",
                  desc: "An absolute-positioned div (or pseudo-element) runs the full height of the container. It is the structural backbone. Without it, items lose their chronological binding.",
                },
                {
                  num: "02",
                  label: "Node Dot",
                  color: "#10b981",
                  bg: "#ecfdf5",
                  code: "w-4 h-4 rounded-full border-2 border-white",
                  desc: "Each node is a 16x16 rounded circle centered on the spine. A white border creates a cut-out effect that visually separates it from the line. Color encodes the event category.",
                },
                {
                  num: "03",
                  label: "Content Card",
                  color: "#f59e0b",
                  bg: "#fffbeb",
                  code: "w-1/2 pr-12 sm:text-right",
                  desc: "Cards sit in a 50% column adjacent to the spine. Desktop: alternates left/right using odd/even index. Mobile: all items collapse to the right side with the spine flush left.",
                },
                {
                  num: "04",
                  label: "Group Context",
                  color: "#ef4444",
                  bg: "#fef2f2",
                  code: 'className="group relative flex items-stretch"',
                  desc: "The outer wrapper carries the group class. All three elements — line segment, dot, card — listen to this shared hover context. This enables Node Synchronization.",
                },
              ].map((item, i) => (
                <div
                  key={item.num}
                  className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 ease-out"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: item.bg, color: item.color }}
                    >
                      {item.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[#1e293b] mb-1.5">{item.label}</div>
                      <code
                        className="block text-[10px] font-mono px-2.5 py-1.5 rounded-md mb-2.5"
                        style={{ backgroundColor: item.bg, color: item.color }}
                      >
                        {item.code}
                      </code>
                      <p className="text-xs text-[#64748b] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. COMPONENT GALLERY                                            */}
      {/* ============================================================== */}
      <section id="components" className="py-24 px-5 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-8">
          <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-2">
            Components
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-2">
            Building Blocks
          </h2>
          <p className="text-sm text-[#64748b] max-w-md leading-relaxed">
            Hover each component — the Node Synchronization behavior is live in every tab.
          </p>
        </RevealBlock>

        {/* Tab bar */}
        <RevealBlock delay={0.05} className="mb-8">
          <div className="flex flex-wrap gap-1 bg-[#f1f5f9] rounded-xl p-1 w-fit">
            {(["Timeline Nodes", "Content Cards", "Alternating Layout", "Mobile Layout"] as ComponentTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-[11px] font-bold px-4 py-2 rounded-lg transition-all duration-200 ease-out ${
                  activeTab === tab
                    ? "bg-white text-[#1e293b] shadow-sm"
                    : "text-[#64748b] hover:text-[#1e293b]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Tab: Timeline Nodes */}
        {activeTab === "Timeline Nodes" && (
          <RevealBlock>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(
                [
                  { label: "Feature", color: "#3b82f6", glow: "rgba(59,130,246,0.45)", desc: "New capabilities, API additions", status: "active" },
                  { label: "Design", color: "#f59e0b", glow: "rgba(245,158,11,0.45)", desc: "Visual updates, brand changes", status: "active" },
                  { label: "Launch", color: "#10b981", glow: "rgba(16,185,129,0.45)", desc: "Public releases, go-live events", status: "current" },
                  { label: "Milestone", color: "#ef4444", glow: "rgba(239,68,68,0.45)", desc: "Pivotal firsts, key decisions", status: "active" },
                  { label: "Upcoming", color: "#cbd5e1", glow: "rgba(203,213,225,0.45)", desc: "Planned future events", status: "future" },
                  { label: "Completed", color: "#94a3b8", glow: "rgba(148,163,184,0.3)", desc: "Archived past entries", status: "done" },
                  { label: "Critical", color: "#7c3aed", glow: "rgba(124,58,237,0.45)", desc: "Urgent or breaking changes", status: "active" },
                  { label: "Custom", color: "#1e293b", glow: "rgba(30,41,59,0.3)", desc: "Override with any hex color", status: "active" },
                ] as const
              ).map((node) => (
                <div
                  key={node.label}
                  className="group bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col items-center gap-3 cursor-default hover:shadow-md transition-all duration-200 ease-out"
                >
                  {/* Spine segment + node */}
                  <div className="flex flex-col items-center gap-0">
                    <div className="w-px h-6 bg-[#e2e8f0] group-hover:bg-[#3b82f6] transition-colors duration-200 ease-out" />
                    <div
                      className={`rounded-full border-2 border-white shadow-md transition-all duration-200 ease-out group-hover:scale-[1.3] ${
                        node.status === "current" ? "w-5 h-5 node-pulse" : "w-4 h-4"
                      }`}
                      style={{ backgroundColor: node.color }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 5px ${node.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
                      }}
                    />
                    <div className="w-px h-6 bg-[#e2e8f0] group-hover:bg-[#3b82f6] transition-colors duration-200 ease-out" />
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-bold text-[#1e293b]">{node.label}</div>
                    <div className="text-[10px] text-[#94a3b8] mt-0.5 leading-snug">{node.desc}</div>
                  </div>

                  {node.status === "current" && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669]">
                      Current
                    </span>
                  )}
                  {node.status === "future" && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#f8fafc] text-[#94a3b8] border border-dashed border-[#cbd5e1]">
                      Upcoming
                    </span>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>
        )}

        {/* Tab: Content Cards */}
        {activeTab === "Content Cards" && (
          <RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  label: "Default",
                  extraStyle: {},
                  shadowClass: "shadow-sm",
                  borderColor: "#e2e8f0",
                  desc: "Resting state. Clean border, minimal shadow. Fully contained.",
                },
                {
                  label: "Hover — Pull-Out",
                  extraStyle: { transform: "translateY(-4px) translateX(4px)" },
                  shadowClass: "shadow-md",
                  borderColor: "#3b82f6",
                  desc: "Pull-out effect active: card lifts up 1px and shifts right 1px. Simulates the node being extracted for examination.",
                },
                {
                  label: "Expanded",
                  extraStyle: {},
                  shadowClass: "shadow-sm",
                  borderColor: "#e2e8f0",
                  desc: "Read-more toggled. Description expands from 42px to 160px via max-height transition.",
                  expanded: true,
                },
              ].map((variant) => (
                <div key={variant.label}>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#94a3b8] mb-3">
                    {variant.label}
                  </p>
                  <div
                    className={`bg-white border rounded-xl p-5 transition-all duration-200 ease-out ${variant.shadowClass}`}
                    style={{ borderColor: variant.borderColor, ...variant.extraStyle }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <time className="text-[11px] font-bold tracking-widest uppercase text-[#94a3b8]">
                        Jun 2023
                      </time>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]">
                        <span className="w-1 h-1 rounded-full bg-[#3b82f6]" />
                        Feature
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1e293b] mb-2">Sample Event Title</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">
                      {variant.expanded
                        ? "Full description is visible when expanded. The max-height property transitions from 42px to 160px using cubic-bezier(0.16,1,0.3,1) for a smooth, natural reveal without layout shift."
                        : "Description clipped at two lines with overflow hidden..."}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-[11px] font-bold text-[#3b82f6] hover:underline"
                    >
                      {variant.expanded ? "Collapse" : "Read more"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}

        {/* Tab: Alternating Layout */}
        {activeTab === "Alternating Layout" && (
          <RevealBlock>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#94a3b8] mb-8 text-center">
                Desktop alternating — central spine, left/right cards
              </p>
              {/* Mini alternating demo */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#e2e8f0] -translate-x-[0.5px]" />
                {[
                  { side: "left" as const, color: "#3b82f6", cat: "Feature", title: "Token System", date: "Jun 2021" },
                  { side: "right" as const, color: "#10b981", cat: "Launch", title: "Alpha Release", date: "Feb 2022" },
                  { side: "left" as const, color: "#f59e0b", cat: "Design", title: "UI Refresh", date: "Mar 2023" },
                  { side: "right" as const, color: "#ef4444", cat: "Milestone", title: "v1 Stable", date: "Sep 2023" },
                ].map((item, i) => (
                  <div key={i} className="group relative flex items-center mb-1">
                    {/* Left slot */}
                    <div className="flex-1 flex justify-end pr-6 py-4">
                      {item.side === "left" ? (
                        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm max-w-[160px] w-full
                          group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-md group-hover:border-[#3b82f6]
                          transition-all duration-200 ease-out">
                          <time className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest block mb-1">{item.date}</time>
                          <div className="text-[11px] font-bold text-[#1e293b]">{item.title}</div>
                        </div>
                      ) : (
                        <div className="max-w-[160px] w-full" />
                      )}
                    </div>

                    {/* Node */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-200 ease-out group-hover:scale-[1.4]"
                        style={{ backgroundColor: item.color }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 4px ${item.color}44`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Right slot */}
                    <div className="flex-1 flex justify-start pl-6 py-4">
                      {item.side === "right" ? (
                        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm max-w-[160px] w-full
                          group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-md group-hover:border-[#3b82f6]
                          transition-all duration-200 ease-out">
                          <time className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest block mb-1">{item.date}</time>
                          <div className="text-[11px] font-bold text-[#1e293b]">{item.title}</div>
                        </div>
                      ) : (
                        <div className="max-w-[160px] w-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#f8fafc] rounded-xl p-4 text-xs font-mono text-[#64748b] leading-relaxed">
                {`/* Even index → left card. Odd index → right card. */`}<br />
                {`const isRight = index % 2 === 1;`}<br />
                {`// Line centered: left-1/2 -translate-x-[0.5px]`}
              </div>
            </div>
          </RevealBlock>
        )}

        {/* Tab: Mobile Layout */}
        {activeTab === "Mobile Layout" && (
          <RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mobile preview */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#94a3b8] mb-4">
                  Mobile — all items on right, spine flush left
                </p>
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                  <div className="relative max-w-[280px]">
                    {/* Left-pinned spine */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-[#e2e8f0]" />
                    {[
                      { color: "#3b82f6", title: "Token System", date: "Jun 2021" },
                      { color: "#10b981", title: "Alpha Release", date: "Feb 2022" },
                      { color: "#f59e0b", title: "UI Refresh", date: "Mar 2023" },
                    ].map((item, i) => (
                      <div key={i} className="group relative flex items-center mb-1">
                        {/* Node col */}
                        <div className="flex-shrink-0 w-8 relative z-10 flex justify-center py-4">
                          <div
                            className="w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-200 ease-out group-hover:scale-[1.35]"
                            style={{ backgroundColor: item.color }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 4px ${item.color}44`;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                            }}
                          />
                        </div>
                        {/* Card always on right */}
                        <div className="flex-1 pl-3 py-3">
                          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-sm transition-all duration-200 ease-out">
                            <time className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest block mb-0.5">{item.date}</time>
                            <div className="text-[11px] font-bold text-[#1e293b]">{item.title}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="space-y-4">
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                  <div className="text-sm font-bold text-[#1e293b] mb-2">Why single-side on mobile?</div>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    Alternating left/right requires cards to be 50% wide. On narrow screens, this makes
                    cards too narrow to read comfortably. Collapsing all items to the right maintains
                    a minimum card width of ~60% viewport.
                  </p>
                </div>
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
                  <div className="text-sm font-bold text-[#1e293b] mb-3">Implementation</div>
                  <code className="block text-[11px] font-mono text-[#475569] bg-[#f8fafc] rounded-lg p-3 leading-relaxed">
                    {`/* Spine: left-5 on mobile */`}<br />
                    {`/* left-1/2 on desktop */`}<br />
                    {`className="absolute left-5`}<br />
                    {`  md:left-1/2 md:-translate-x-px"`}
                  </code>
                </div>
                <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <XIcon className="w-3.5 h-3.5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#dc2626] mb-1">Do not</div>
                      <p className="text-xs text-[#7f1d1d] leading-relaxed">
                        Keep alternating layout on mobile. The spine will center at 50% of a narrow screen,
                        leaving cards only ~40% wide — unreadable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        )}
      </section>

      {/* ============================================================== */}
      {/* 6. ANIMATION & INTERACTION RULES — 4 dedicated interactive cards */}
      {/* ============================================================== */}
      <section id="interactions" className="py-24 px-5 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-4">
          <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-2">
            Animation &amp; Interaction Rules
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-3">
            The four motion laws
          </h2>
        </RevealBlock>
        <RevealBlock delay={0.05} className="mb-12">
          <p className="text-sm text-[#64748b] max-w-md leading-relaxed">
            Each interaction rule is demonstrated live. Hover or click the cards to feel the exact
            behavior that every timeline implementation must reproduce.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: Node Synchronization */}
          <RevealBlock delay={0.06}>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#3b82f6] text-[10px] font-bold">
                  01
                </span>
                <span className="text-sm font-bold text-[#1e293b]">Node Synchronization</span>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                Hovering any part of the row must simultaneously highlight the node dot. The dot
                scales to 1.35x and emits a color-matched glow. Card and dot share one hover context.
              </p>

              {/* Live demo */}
              <div
                className="group relative flex items-center gap-4 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] cursor-pointer select-none"
                onMouseEnter={() => setSyncDemoHovered(true)}
                onMouseLeave={() => setSyncDemoHovered(false)}
              >
                {/* Mini spine + node */}
                <div className="flex flex-col items-center gap-0 flex-shrink-0">
                  <div
                    className="w-px h-5 transition-colors duration-200 ease-out"
                    style={{ backgroundColor: syncDemoHovered ? "#3b82f6" : "#e2e8f0" }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white transition-all duration-200 ease-out"
                    style={{
                      backgroundColor: "#3b82f6",
                      transform: syncDemoHovered ? "scale(1.35)" : "scale(1)",
                      boxShadow: syncDemoHovered ? "0 0 0 5px rgba(59,130,246,0.35)" : "none",
                    }}
                  />
                  <div
                    className="w-px h-5 transition-colors duration-200 ease-out"
                    style={{ backgroundColor: syncDemoHovered ? "#3b82f6" : "#e2e8f0" }}
                  />
                </div>

                {/* Card responds to hover */}
                <div
                  className="flex-1 bg-white border rounded-lg px-4 py-3 transition-all duration-200 ease-out"
                  style={{
                    borderColor: syncDemoHovered ? "#3b82f6" : "#e2e8f0",
                    boxShadow: syncDemoHovered ? "0 4px 12px rgba(59,130,246,0.12)" : "0 1px 3px rgba(0,0,0,0.05)",
                    transform: syncDemoHovered ? "translateY(-2px) translateX(2px)" : "none",
                  }}
                >
                  <time className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] block mb-1">Jun 2021</time>
                  <div className="text-xs font-bold text-[#1e293b]">Hover this entire row</div>
                </div>
              </div>

              <p className="text-[10px] text-[#94a3b8] mt-3 text-center">
                {syncDemoHovered ? "Active — node, line, and card all responding together" : "Hover anywhere in the row above"}
              </p>

              <div className="mt-4 bg-[#f8fafc] rounded-lg p-3">
                <code className="text-[10px] font-mono text-[#475569] leading-relaxed">
                  {`group-hover:scale-[1.35]  /* dot */`}<br />
                  {`group-hover:bg-[#3b82f6] /* line */`}<br />
                  {`group-hover:border-[#3b82f6] /* card */`}
                </code>
              </div>
            </div>
          </RevealBlock>

          {/* Card 2: Pull-Out Effect */}
          <RevealBlock delay={0.1}>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#059669] text-[10px] font-bold">
                  02
                </span>
                <span className="text-sm font-bold text-[#1e293b]">Pull-Out Effect</span>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                Card hover causes a light upward float (-translate-y-1) AND a slight horizontal
                translate-x-1. Together they simulate the node being pulled out from the spine for
                closer examination.
              </p>

              {/* Live demo — compare two cards */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest mb-2">Before (rest)</p>
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm">
                    <time className="text-[9px] text-[#94a3b8] font-bold block mb-1">Feb 2022</time>
                    <div className="text-[11px] font-bold text-[#1e293b]">Event card</div>
                    <div className="text-[10px] text-[#94a3b8] mt-1">translate(0, 0)</div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#10b981] uppercase tracking-widest mb-2">After (hover)</p>
                  <div
                    className="bg-white border-2 border-[#3b82f6] rounded-xl p-4 shadow-md"
                    style={{ transform: "translateY(-4px) translateX(4px)" }}
                  >
                    <time className="text-[9px] text-[#3b82f6] font-bold block mb-1">Feb 2022</time>
                    <div className="text-[11px] font-bold text-[#1e293b]">Event card</div>
                    <div className="text-[10px] text-[#3b82f6] mt-1">translate(-4px, 4px)</div>
                  </div>
                </div>
              </div>

              {/* Interactive version */}
              <div className="mt-5">
                <p className="text-[10px] text-[#94a3b8] mb-2 text-center">Live: hover the card below</p>
                <div
                  className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:translate-x-1 hover:shadow-md hover:border-[#3b82f6]"
                  onMouseEnter={() => setPulloutDemoHovered(true)}
                  onMouseLeave={() => setPulloutDemoHovered(false)}
                >
                  <time className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-widest block mb-1">Apr 2024</time>
                  <div className="text-xs font-bold text-[#1e293b]">Timeline Vertical Style</div>
                  <div
                    className="text-[10px] mt-1 transition-colors duration-200"
                    style={{ color: pulloutDemoHovered ? "#3b82f6" : "#94a3b8" }}
                  >
                    {pulloutDemoHovered ? "-1px Y, +1px X — pull-out active" : "Hover to trigger pull-out"}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-[#f8fafc] rounded-lg p-3">
                <code className="text-[10px] font-mono text-[#475569] leading-relaxed">
                  {`group-hover:-translate-y-1`}<br />
                  {`group-hover:translate-x-1`}<br />
                  {`transition: all 200ms ease-out`}
                </code>
              </div>
            </div>
          </RevealBlock>

          {/* Card 3: Sequential Smoothness */}
          <RevealBlock delay={0.14}>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-lg bg-[#fffbeb] flex items-center justify-center text-[#d97706] text-[10px] font-bold">
                  03
                </span>
                <span className="text-sm font-bold text-[#1e293b]">Sequential Smoothness</span>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                Use <code className="font-mono bg-[#f8fafc] px-1 rounded text-[#1e293b]">duration-200 ease-out</code> everywhere.
                This enables stable feedback even during rapid scroll-through where multiple items
                enter and leave hover state in quick succession.
              </p>

              {/* Speed comparison */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Easing comparison — click to animate</p>
                {[
                  { label: "Slow (600ms linear)", duration: "600ms", easing: "linear", color: "#ef4444", key: "slow" as const },
                  { label: "Correct (200ms ease-out)", duration: "200ms", easing: "ease-out", color: "#3b82f6", key: "fast" as const },
                ].map((row) => (
                  <div key={row.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: row.color }}
                      >
                        {row.label}
                      </span>
                      <button
                        type="button"
                        className="text-[10px] px-2.5 py-1 rounded-full border transition-colors duration-150 hover:bg-[#f8fafc]"
                        style={{ borderColor: row.color, color: row.color }}
                        onClick={() =>
                          setSpeedDemoActive((prev) => (prev === row.key ? null : row.key))
                        }
                      >
                        {speedDemoActive === row.key ? "Reset" : "Play"}
                      </button>
                    </div>
                    <div className="relative h-9 bg-[#f8fafc] rounded-full overflow-hidden border border-[#e2e8f0]">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 rounded-full"
                        style={{
                          backgroundColor: row.color,
                          transform: `translateY(-50%) translateX(${speedDemoActive === row.key ? "160px" : "0px"})`,
                          transition:
                            speedDemoActive === row.key
                              ? `transform ${row.duration} ${row.easing}`
                              : "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-[#f8fafc] rounded-lg p-3">
                <code className="text-[10px] font-mono text-[#475569] leading-relaxed">
                  {`/* Correct — every transition property */`}<br />
                  {`transition-all duration-200 ease-out`}
                </code>
              </div>
            </div>
          </RevealBlock>

          {/* Card 4: Connected Focus */}
          <RevealBlock delay={0.18}>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-7 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-lg bg-[#fef2f2] flex items-center justify-center text-[#dc2626] text-[10px] font-bold">
                  04
                </span>
                <span className="text-sm font-bold text-[#1e293b]">Connected Focus</span>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                When a card is focused or hovered, its border color must match the timeline spine
                color (#3b82f6). This maintains narrative coherence — the card and the line it belongs
                to appear as one system, not two separate elements.
              </p>

              {/* Interactive toggle */}
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => setFocusDemoActive((prev) => !prev)}
                  className="w-full text-xs font-bold py-2.5 rounded-xl border transition-all duration-200 ease-out"
                  style={{
                    backgroundColor: focusDemoActive ? "#eff6ff" : "#f8fafc",
                    borderColor: focusDemoActive ? "#3b82f6" : "#e2e8f0",
                    color: focusDemoActive ? "#3b82f6" : "#64748b",
                  }}
                >
                  {focusDemoActive ? "Active — card border matches spine" : "Click to activate focus"}
                </button>
              </div>

              {/* Two-card comparison */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] font-bold text-[#ef4444] uppercase tracking-widest mb-2">Wrong</p>
                  <div className="bg-white border-2 border-[#f87171] rounded-xl p-3">
                    <time className="text-[9px] text-[#94a3b8] font-bold block mb-0.5">Sep 2023</time>
                    <div className="text-[10px] font-bold text-[#1e293b] mb-1">Event</div>
                    <div
                      className="w-full h-px"
                      style={{ backgroundColor: "#e2e8f0" }}
                    />
                    <div className="text-[9px] text-[#ef4444] mt-1">border: red — breaks narrative</div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#10b981] uppercase tracking-widest mb-2">Correct</p>
                  <div
                    className="bg-white rounded-xl p-3 transition-all duration-200 ease-out"
                    style={{
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: focusDemoActive ? "#3b82f6" : "#e2e8f0",
                      boxShadow: focusDemoActive ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
                    }}
                  >
                    <time className="text-[9px] font-bold block mb-0.5" style={{ color: focusDemoActive ? "#3b82f6" : "#94a3b8" }}>Sep 2023</time>
                    <div className="text-[10px] font-bold text-[#1e293b] mb-1">Event</div>
                    <div className="w-full h-px" style={{ backgroundColor: focusDemoActive ? "#3b82f6" : "#e2e8f0" }} />
                    <div className="text-[9px] mt-1" style={{ color: focusDemoActive ? "#3b82f6" : "#94a3b8" }}>
                      border: #3b82f6 — matches spine
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-[#f8fafc] rounded-lg p-3">
                <code className="text-[10px] font-mono text-[#475569] leading-relaxed">
                  {`/* Focused card border = spine color */`}<br />
                  {`group-hover:border-[#3b82f6]`}<br />
                  {`/* Never use a contrasting color */`}
                </code>
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Shared easing banner */}
        <RevealBlock delay={0.22} className="mt-6">
          <div className="bg-[#1e293b] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold text-[#475569] uppercase tracking-[0.18em] mb-1">
                Shared across all four rules
              </div>
              <code className="text-white font-mono text-sm">
                transition: all 200ms ease-out
              </code>
            </div>
            <p className="text-xs text-[#64748b] max-w-xs leading-relaxed">
              Card transform, node scale, node glow, line color, and border — all share one easing
              curve and one duration. One timeline, one motion vocabulary.
            </p>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================== */}
      {/* 7. DESIGN RULES DO/DON'T                                        */}
      {/* ============================================================== */}
      <section id="rules" className="py-24 px-5 md:px-10 max-w-6xl mx-auto border-t border-[#e2e8f0]">
        <RevealBlock className="mb-12">
          <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-2">
            Design Rules
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-3">
            Do and Don&apos;t
          </h2>
          <p className="text-sm text-[#64748b] max-w-md leading-relaxed">
            Each rule is itself a timeline node. Hover to activate Node Synchronization on every
            rule card — the pattern is self-demonstrating.
          </p>
        </RevealBlock>

        {/* Rules timeline — single-side (mirrors mobile layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* DO column */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[#e2e8f0]" />
            <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-[#10b981] mb-6 pl-14">
              Do
            </h3>
            {[
              {
                rule: "Render the central spine first",
                detail: "The absolute-positioned line is the structural anchor. All nodes and cards position relative to it. Without it, the layout collapses.",
              },
              {
                rule: "Align node dots precisely to the spine",
                detail: "Use left-1/2 + -translate-x-1/2 (or left-[calc(50%-8px)]). A misaligned dot destroys the visual grammar immediately.",
              },
              {
                rule: "Use white border on node dots",
                detail: "border-2 border-white creates a cut-out ring that separates the dot from the spine color, preserving readability at any size.",
              },
              {
                rule: "Wrap each row in a group div",
                detail: "The group class enables all three elements — card, dot, line — to respond to one hover context. Never split the hover target.",
              },
              {
                rule: "Collapse mobile to single-side",
                detail: "Below md breakpoint, move the spine to left-5 and render all cards on the right. No exceptions for narrow viewports.",
              },
              {
                rule: "Include a date or timestamp on every node",
                detail: "Removing time labels reduces the timeline to an arbitrary list. Every node needs temporal context to communicate chronology.",
              },
            ].map((item, i) => (
              <RevealBlock key={item.rule} delay={i * 0.06}>
                <div className="group relative flex items-start gap-0 pl-0 mb-4">
                  <div className="flex-shrink-0 flex flex-col items-center w-10">
                    <div
                      className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#10b981]"
                      style={{ backgroundColor: "#e2e8f0", minHeight: 10 }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ease-out group-hover:scale-[1.35]"
                      style={{ backgroundColor: "#10b981" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 4px rgba(16,185,129,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    />
                    <div
                      className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#10b981]"
                      style={{ backgroundColor: "#e2e8f0", minHeight: 10 }}
                    />
                  </div>
                  <div
                    className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-4 ml-2 transition-all duration-200 ease-out
                      group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-sm group-hover:border-[#3b82f6]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
                      <span className="text-sm font-bold text-[#1e293b]">{item.rule}</span>
                    </div>
                    <p className="text-xs text-[#64748b] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* DON'T column */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[#e2e8f0]" />
            <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-[#ef4444] mb-6 pl-14">
              Don&apos;t
            </h3>
            {[
              {
                rule: "Break or gap the connecting line",
                detail: "A broken spine signals a missing event or layout error. Keep the line continuous from first to last node — even across dynamic filtering.",
              },
              {
                rule: "Use inconsistent node sizes",
                detail: "All nodes must share the same diameter (w-4 h-4 default). Varying sizes imply semantic hierarchy that the layout does not support.",
              },
              {
                rule: "Keep alternating layout on mobile",
                detail: "At 375px, a 50% card is ~185px wide — insufficient for most content. Always collapse to single-side below md.",
              },
              {
                rule: "Animate nodes independently from cards",
                detail: "Never attach hover to the dot alone. Node Synchronization requires both card and dot to be children of the same group wrapper.",
              },
              {
                rule: "Use slow or linear easing",
                detail: "Transitions above 300ms feel sluggish when users scroll quickly through many events. Linear easing feels mechanical. Use ease-out at 200ms.",
              },
              {
                rule: "Let content overflow the card vertically",
                detail: "Long descriptions make the line segment disproportionately tall. Truncate at ~40px and reveal on interaction to maintain vertical rhythm.",
              },
            ].map((item, i) => (
              <RevealBlock key={item.rule} delay={i * 0.06}>
                <div className="group relative flex items-start gap-0 pl-0 mb-4">
                  <div className="flex-shrink-0 flex flex-col items-center w-10">
                    <div
                      className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#ef4444]"
                      style={{ backgroundColor: "#e2e8f0", minHeight: 10 }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ease-out group-hover:scale-[1.35]"
                      style={{ backgroundColor: "#ef4444" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 4px rgba(239,68,68,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    />
                    <div
                      className="w-px flex-1 transition-colors duration-200 ease-out group-hover:bg-[#ef4444]"
                      style={{ backgroundColor: "#e2e8f0", minHeight: 10 }}
                    />
                  </div>
                  <div
                    className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-4 ml-2 transition-all duration-200 ease-out
                      group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-sm group-hover:border-[#3b82f6]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <XIcon className="w-3.5 h-3.5 text-[#ef4444] flex-shrink-0" />
                      <span className="text-sm font-bold text-[#1e293b]">{item.rule}</span>
                    </div>
                    <p className="text-xs text-[#64748b] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Color system quick ref */}
        <RevealBlock delay={0.2} className="mt-16">
          <div className="border-t border-[#e2e8f0] pt-12">
            <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#3b82f6] mb-6">
              Color Reference
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Primary", hex: "#1e293b", role: "Text, headings, spine" },
                { name: "Background", hex: "#f8fafc", role: "Page background" },
                { name: "Border", hex: "#e2e8f0", role: "Default dividers, lines" },
                { name: "Blue", hex: "#3b82f6", role: "Accent — Feature, spine highlight" },
                { name: "Green", hex: "#10b981", role: "Accent — Launch events" },
                { name: "Amber", hex: "#f59e0b", role: "Accent — Design changes" },
                { name: "Red", hex: "#ef4444", role: "Accent — Milestone events" },
                { name: "Muted", hex: "#94a3b8", role: "Secondary text, labels" },
              ].map((c) => (
                <div key={c.hex} className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="h-12 w-full" style={{ backgroundColor: c.hex }} />
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-[#1e293b]">{c.name}</span>
                      <code className="text-[9px] font-mono text-[#94a3b8]">{c.hex}</code>
                    </div>
                    <p className="text-[10px] text-[#94a3b8] leading-snug">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER                                                       */}
      {/* ============================================================== */}
      <footer className="border-t border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-14 pb-10">

          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">

            {/* Brand + timeline motif */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1.5 pt-1">
                {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c, i) => (
                  <div key={c} className="flex flex-col items-center gap-0.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                    {i < 3 && <div className="w-px h-3 bg-[#e2e8f0]" />}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-base font-bold text-[#1e293b] mb-1">StyleKit</div>
                <div className="text-xs text-[#94a3b8] mb-3">Timeline Vertical Showcase</div>
                <p className="text-xs text-[#64748b] leading-relaxed max-w-xs">
                  A layout style for chronological storytelling. The central spine, alternating cards,
                  and node synchronization make it the most spatially expressive pattern in the library.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#94a3b8]">
                  This Style
                </span>
                <Link
                  href="/styles/timeline-vertical"
                  className="text-xs text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/timeline-vertical/showcase"
                  className="text-xs text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/timeline-vertical/cover"
                  className="text-xs text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#94a3b8]">
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="text-xs text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="text-xs text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200"
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#94a3b8]">
                  Accents
                </span>
                {[
                  { name: "Blue — Feature", hex: "#3b82f6" },
                  { name: "Green — Launch", hex: "#10b981" },
                  { name: "Amber — Design", hex: "#f59e0b" },
                  { name: "Red — Milestone", hex: "#ef4444" },
                ].map((s) => (
                  <span key={s.hex} className="flex items-center gap-2 text-[10px] text-[#64748b]">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.hex }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e2e8f0] mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#94a3b8]">
              StyleKit &middot; Timeline Vertical &middot; Stories unfold chronologically.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <Link
                href="/"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e293b] text-white text-xs font-semibold hover:bg-[#3b82f6] transition-all duration-200 ease-out"
              >
                <span>&#8592;</span>
                Back to StyleKit
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
