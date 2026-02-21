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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function LayoutIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <rect x="2" y="17" width="20" height="4" rx="1" />
      <rect x="2" y="9" width="5" height="6" rx="1" />
      <rect x="9" y="9" width="8" height="6" rx="1" />
      <rect x="19" y="9" width="3" height="6" rx="1" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
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

function MonitorIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function TabletIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L4.09 12.97 11 12l-2 10 8.91-10.97L11 12l2-10z" />
    </svg>
  );
}

function AnchorIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v13M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  );
}

function MouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="6" />
      <path d="M12 7v4" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ViewportMode = "desktop" | "tablet" | "mobile";
type ComponentTab = "cards" | "navlinks" | "buttons" | "metrics";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const zoneData = [
  {
    zone: "Header",
    tailwind: "sticky top-0 z-50 h-14",
    description: "Fixed at top. Contains brand logo, global navigation, and user actions. Always visible during scroll.",
    color: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-200",
    width: "Full width",
    height: "56px (h-14)",
  },
  {
    zone: "Left Nav",
    tailwind: "w-60 flex-shrink-0",
    description: "Fixed-width left column. Houses the primary navigation menu with active state indicators.",
    color: "#10b981",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    width: "240px (w-60)",
    height: "flex-1 (fills body)",
  },
  {
    zone: "Main Content",
    tailwind: "flex-1 min-w-0",
    description: "The primary canvas. flex-1 makes it fill remaining space. min-w-0 prevents overflow blowout.",
    color: "#1e293b",
    bg: "bg-slate-50",
    border: "border-slate-200",
    width: "flex-1 (adaptive)",
    height: "flex-1 (fills body)",
  },
  {
    zone: "Right Sidebar",
    tailwind: "w-64 flex-shrink-0",
    description: "Fixed-width right column. Secondary info: activity feeds, contextual tools, quick actions.",
    color: "#f59e0b",
    bg: "bg-amber-50",
    border: "border-amber-200",
    width: "256px (w-64)",
    height: "flex-1 (fills body)",
  },
  {
    zone: "Footer",
    tailwind: "bg-white border-t",
    description: "Anchored below main body. Copyright, secondary links, version info. Always at bottom.",
    color: "#ef4444",
    bg: "bg-red-50",
    border: "border-red-200",
    width: "Full width",
    height: "auto (content-driven)",
  },
];

const metricsData = [
  { label: "Total Users", value: "12,481", delta: "+8.3%", positive: true, color: "#3b82f6" },
  { label: "Revenue", value: "$48,290", delta: "+12.1%", positive: true, color: "#10b981" },
  { label: "Avg Session", value: "4m 32s", delta: "-0.4%", positive: false, color: "#f59e0b" },
  { label: "Error Rate", value: "0.12%", delta: "-23%", positive: true, color: "#ef4444" },
];

const activityItems = [
  { text: "New user registered", time: "2m ago", dot: "#3b82f6" },
  { text: "Order #4821 completed", time: "15m ago", dot: "#10b981" },
  { text: "Invoice #INV-099 sent", time: "1h ago", dot: "#f59e0b" },
  { text: "Server health: OK", time: "2h ago", dot: "#10b981" },
  { text: "Cache cleared", time: "3h ago", dot: "#94a3b8" },
];

const navLabels = ["Dashboard", "Projects", "Analytics", "Reports", "Settings"];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [activeTab, setActiveTab] = useState<ComponentTab>("cards");
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [durationDemo, setDurationDemo] = useState<"fast" | "slow" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-[#1e293b] overflow-x-hidden">

      {/* ============================================================= */}
      {/* 1. FIXED STICKY NAV                                           */}
      {/* ============================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Back to StyleKit */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e293b] transition-colors duration-150"
          >
            <span className="text-base leading-none">&larr;</span>
            <span>StyleKit</span>
          </Link>

          {/* Center brand */}
          <div className="flex items-center gap-2">
            <LayoutIcon className="w-5 h-5 text-[#3b82f6]" />
            <span className="text-sm font-semibold text-[#1e293b] tracking-tight">
              Holy Grail Layout
            </span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#3b82f6]/10 text-[#3b82f6] ml-1">
              Layout
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/styles"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium
              hover:bg-[#0f172a] hover:-translate-y-0.5 hover:shadow-md
              active:scale-[0.98] active:translate-y-0
              focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
              transition-all duration-150 ease-out"
          >
            View Styles
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ============================================================= */}
      {/* 2. HERO WITH LAYOUT DIAGRAM                                   */}
      {/* ============================================================= */}
      <section className="pt-28 md:pt-36 pb-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-semibold tracking-wide uppercase mb-6">
              <LayoutIcon className="w-3.5 h-3.5" />
              Classic Web Layout Pattern
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <h1
                className="text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Holy Grail
                <br />
                <span className="text-[#3b82f6]">Layout</span>
              </h1>

              <p
                className="text-gray-500 text-lg leading-relaxed max-w-lg mb-8"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                The classic five-zone web layout: sticky header, three equal-height columns
                (left nav, main content, right sidebar), and a persistent footer. The
                gold standard for productivity dashboards, admin panels, and documentation sites.
              </p>

              {/* Stat pills */}
              <div
                className="flex flex-wrap gap-3"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                {[
                  { label: "5 Zones", color: "#3b82f6" },
                  { label: "CSS Flexbox", color: "#10b981" },
                  { label: "Responsive", color: "#f59e0b" },
                  { label: "SEO Friendly", color: "#1e293b" },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700 shadow-sm"
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: pill.color }}
                    />
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: layout diagram */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                {/* Diagram header bar */}
                <div className="h-9 bg-[#3b82f6] flex items-center px-4 gap-2">
                  <span className="text-white text-xs font-semibold tracking-wide">HEADER</span>
                  <span className="ml-auto text-blue-200 text-[10px] font-mono">sticky top-0 z-50</span>
                </div>
                {/* Three columns */}
                <div className="flex" style={{ minHeight: 200 }}>
                  {/* Left nav */}
                  <div className="w-16 md:w-24 bg-[#f1f5f9] border-r border-gray-200 p-2 flex-shrink-0 flex flex-col gap-1.5">
                    <div className="text-[9px] font-bold text-[#10b981] uppercase tracking-wide mb-1">Left Nav</div>
                    {["Home", "Docs", "API", "Settings"].map((item, i) => (
                      <div
                        key={item}
                        className={`h-5 rounded text-[9px] flex items-center px-1.5 font-medium ${
                          i === 0
                            ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                            : "text-gray-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                    <div className="text-[8px] font-mono text-gray-400 mt-auto">w-60</div>
                  </div>
                  {/* Main */}
                  <div className="flex-1 bg-white p-3 min-w-0">
                    <div className="text-[9px] font-bold text-[#1e293b] uppercase tracking-wide mb-2">Main Content</div>
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      {["1,234", "$5.6k", "98%", "12ms"].map((v) => (
                        <div key={v} className="bg-[#f1f5f9] rounded p-1.5">
                          <div className="text-[10px] font-bold text-[#1e293b]">{v}</div>
                          <div className="text-[8px] text-gray-400">metric</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-[#f1f5f9] rounded mb-1" />
                    <div className="h-2 bg-[#f1f5f9] rounded w-3/4" />
                    <div className="text-[8px] font-mono text-gray-400 mt-2">flex-1 min-w-0</div>
                  </div>
                  {/* Right sidebar */}
                  <div className="w-14 md:w-20 bg-[#f1f5f9] border-l border-gray-200 p-2 flex-shrink-0 flex flex-col gap-1">
                    <div className="text-[9px] font-bold text-[#f59e0b] uppercase tracking-wide mb-1">Sidebar</div>
                    {["Event 1", "Event 2", "Event 3"].map((e) => (
                      <div key={e} className="h-4 bg-white rounded border border-gray-200 text-[8px] flex items-center px-1 text-gray-400">
                        {e}
                      </div>
                    ))}
                    <div className="text-[8px] font-mono text-gray-400 mt-auto">w-64</div>
                  </div>
                </div>
                {/* Footer bar */}
                <div className="h-7 bg-[#f1f5f9] border-t border-gray-200 flex items-center px-4 gap-2">
                  <span className="text-[10px] font-semibold text-[#ef4444] uppercase tracking-wide">FOOTER</span>
                  <span className="ml-auto text-gray-400 text-[9px] font-mono">border-t border-gray-200</span>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                Five zones &mdash; equal-height columns guaranteed by Flexbox
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 3. LIVE INTERACTIVE DEMO — viewport toggle                    */}
      {/* ============================================================= */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3b82f6] block mb-3">
              Live Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight">
              Responsive <span className="text-[#3b82f6]">breakpoints</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Toggle between viewports to see how the layout collapses. On tablet, the right sidebar
              hides. On mobile, all columns stack vertically.
            </p>
          </RevealBlock>

          {/* Viewport toggle */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { mode: "desktop" as ViewportMode, label: "Desktop", Icon: MonitorIcon, note: ">1024px" },
                  { mode: "tablet" as ViewportMode, label: "Tablet", Icon: TabletIcon, note: "768\u20131024px" },
                  { mode: "mobile" as ViewportMode, label: "Mobile", Icon: PhoneIcon, note: "<768px" },
                ] as const
              ).map(({ mode, label, Icon, note }) => (
                <button
                  key={mode}
                  onClick={() => setViewport(mode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ease-out
                    ${viewport === mode
                      ? "bg-[#1e293b] text-white border-[#1e293b] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  <span className={`text-[10px] font-mono ${viewport === mode ? "text-blue-300" : "text-gray-400"}`}>
                    {note}
                  </span>
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo frame */}
          <RevealBlock delay={0.15}>
            <div className="bg-[#f1f5f9] rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Mock browser chrome */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 h-6 bg-white rounded border border-gray-200 flex items-center px-3">
                  <span className="text-xs text-gray-400 font-mono">myapp.com/dashboard</span>
                </div>
              </div>

              {/* Layout demo */}
              <div
                className="transition-all duration-300 ease-out overflow-hidden"
                style={{ maxWidth: viewport === "mobile" ? 375 : viewport === "tablet" ? 768 : "100%", margin: "0 auto" }}
              >
                <div className="flex flex-col" style={{ minHeight: 320 }}>
                  {/* Header */}
                  <div className="h-11 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#3b82f6] flex items-center justify-center">
                        <LayoutIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-[#1e293b]">MyApp</span>
                    </div>
                    {viewport !== "mobile" && (
                      <nav className="flex items-center gap-4">
                        {["Home", "Docs", "API"].map((item) => (
                          <span key={item} className="text-xs text-gray-500 font-medium">{item}</span>
                        ))}
                      </nav>
                    )}
                    <div className="w-7 h-7 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#3b82f6]">A</span>
                    </div>
                  </div>

                  {/* Body area */}
                  <div className={`flex flex-1 ${viewport === "mobile" ? "flex-col" : "flex-row"}`}>
                    {/* Left nav */}
                    {viewport !== "mobile" && (
                      <div className="w-40 bg-white border-r border-gray-200 flex-shrink-0 p-3">
                        <div className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold mb-2 px-1">Navigation</div>
                        <div className="space-y-0.5">
                          {navLabels.map((label, i) => (
                            <div
                              key={label}
                              className={`text-xs px-2 py-1.5 rounded flex items-center gap-2 font-medium ${
                                i === 0
                                  ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                                  : "text-gray-500"
                              }`}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: i === 0 ? "#3b82f6" : "#d1d5db" }}
                              />
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mobile nav (horizontal strip) */}
                    {viewport === "mobile" && (
                      <div className="bg-white border-b border-gray-200 flex overflow-x-auto gap-0 flex-shrink-0">
                        {navLabels.slice(0, 4).map((label, i) => (
                          <div
                            key={label}
                            className={`text-[10px] px-3 py-2 flex-shrink-0 font-medium border-b-2 ${
                              i === 0
                                ? "border-[#3b82f6] text-[#3b82f6]"
                                : "border-transparent text-gray-500"
                            }`}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Main content */}
                    <div className="flex-1 p-4 min-w-0">
                      <div className="text-xs font-bold text-[#1e293b] mb-3">Dashboard</div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {metricsData.slice(0, 4).map((m) => (
                          <div key={m.label} className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
                            <div className="text-[10px] text-gray-400 mb-0.5">{m.label}</div>
                            <div className="text-sm font-bold" style={{ color: m.color }}>{m.value}</div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-3 bg-gray-100 rounded w-full" />
                        <div className="h-3 bg-gray-100 rounded w-5/6" />
                        <div className="h-3 bg-gray-100 rounded w-4/5" />
                      </div>
                    </div>

                    {/* Right sidebar — hidden on tablet+mobile */}
                    {viewport === "desktop" && (
                      <div className="w-44 bg-white border-l border-gray-200 flex-shrink-0 p-3">
                        <div className="text-[9px] text-gray-400 uppercase tracking-wide font-semibold mb-2">Activity</div>
                        <div className="space-y-2">
                          {activityItems.slice(0, 4).map((item) => (
                            <div key={item.text} className="flex items-start gap-1.5">
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                                style={{ backgroundColor: item.dot }}
                              />
                              <div>
                                <div className="text-[9px] text-gray-600 leading-tight">{item.text}</div>
                                <div className="text-[8px] text-gray-400">{item.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="h-8 bg-white border-t border-gray-200 flex items-center px-4 flex-shrink-0">
                    <span className="text-[9px] text-gray-400">
                      {viewport === "desktop" && "Full 3-column layout: Left Nav + Main + Right Sidebar"}
                      {viewport === "tablet" && "Tablet: Right sidebar hidden, left nav + main content"}
                      {viewport === "mobile" && "Mobile: All columns stacked vertically"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 4. LAYOUT ANATOMY — 5 zones explained                         */}
      {/* ============================================================= */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#10b981] block mb-3">
              Anatomy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight">
              The five <span className="text-[#10b981]">zones</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Each zone has a specific purpose, fixed or adaptive dimensions, and
              defined Tailwind classes. Together they create a predictable, scannable page structure.
            </p>
          </RevealBlock>

          <div className="space-y-4">
            {zoneData.map((zone, i) => (
              <RevealBlock key={zone.zone} delay={i * 0.06}>
                <div className={`bg-white rounded-xl border ${zone.border} p-5 md:p-7 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    {/* Zone badge */}
                    <div className="flex items-center gap-3 md:w-40 flex-shrink-0">
                      <div
                        className="w-2.5 h-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: zone.color }}
                      />
                      <div>
                        <div className="text-sm font-bold text-[#1e293b]">{zone.zone}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Zone {i + 1}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 leading-relaxed">{zone.description}</p>
                    </div>

                    {/* Dimensions */}
                    <div className="flex gap-4 md:gap-6 text-sm flex-shrink-0">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Width</div>
                        <div className="font-mono text-xs text-[#1e293b] font-medium">{zone.width}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Height</div>
                        <div className="font-mono text-xs text-[#1e293b] font-medium">{zone.height}</div>
                      </div>
                    </div>

                    {/* Code snippet */}
                    <div className={`${zone.bg} rounded-lg px-3 py-2 flex-shrink-0`}>
                      <code className="text-[10px] font-mono" style={{ color: zone.color }}>
                        {zone.tailwind}
                      </code>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 5. COMPONENT GALLERY                                          */}
      {/* ============================================================= */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f59e0b] block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight">
              Building <span className="text-[#f59e0b]">blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Every interactive element follows strict interaction physics: crisp 150ms transitions,
              0.5px content card lifts, anchored nav links, and tactile button press states.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
              {(["cards", "navlinks", "buttons", "metrics"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 ease-out
                    ${activeTab === tab
                      ? "bg-[#1e293b] text-white shadow-sm"
                      : "bg-[#f1f5f9] text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab === "navlinks" ? "Nav Links" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="bg-[#f1f5f9] rounded-2xl p-6 md:p-10 border border-gray-200">

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-6">
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Analytics Overview", desc: "Track key metrics across all your projects in one unified view.", value: "12,481", label: "Total Events", color: "#3b82f6" },
                      { title: "Revenue Report", desc: "Monitor revenue streams and financial health at a glance.", value: "$48.2k", label: "Monthly Total", color: "#10b981" },
                      { title: "Performance", desc: "Page load times, error rates, and uptime status monitoring.", value: "99.9%", label: "Uptime", color: "#f59e0b" },
                      { title: "User Growth", desc: "New signups, active users, and retention rate trends.", value: "+8.3%", label: "MoM Growth", color: "#3b82f6" },
                      { title: "Support Queue", desc: "Open tickets, response times, and satisfaction scores.", value: "14", label: "Open Tickets", color: "#ef4444" },
                      { title: "Deployments", desc: "Recent deployment history and environment health status.", value: "3", label: "This Week", color: "#10b981" },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out cursor-default"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-sm font-semibold text-[#1e293b] leading-tight">{card.title}</h3>
                          <div className="w-2 h-2 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: card.color }} />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                        <div>
                          <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{card.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NAV LINKS TAB */}
              {activeTab === "navlinks" && (
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-6">
                    hover:border-l-2 hover:border-[#3b82f6] hover:bg-gray-50 transition-all duration-150
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sidebar nav */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <div className="px-4 py-3 bg-[#f1f5f9] border-b border-gray-200">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Left Sidebar Navigation</span>
                      </div>
                      <nav className="p-3 space-y-0.5">
                        {[
                          { label: "Dashboard", badge: null },
                          { label: "Projects", badge: "12" },
                          { label: "Analytics", badge: null },
                          { label: "Reports", badge: "3" },
                          { label: "Integrations", badge: null },
                          { label: "Settings", badge: null },
                        ].map((item, i) => (
                          <button
                            key={item.label}
                            onClick={() => setActiveNavItem(i)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                              ${activeNavItem === i
                                ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                                : "text-gray-600 hover:border-l-2 hover:border-[#3b82f6] hover:bg-gray-50"
                              }`}
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${activeNavItem === i ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "bg-gray-100 text-gray-500"}`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </nav>
                    </div>

                    {/* Rules explanation */}
                    <div className="flex flex-col gap-4">
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="text-xs font-semibold text-[#10b981] uppercase tracking-wide mb-3">Active State</div>
                        <code className="text-xs font-mono text-gray-600 block leading-relaxed">
                          bg-[#3b82f6]/10<br />
                          text-[#3b82f6]<br />
                          font-medium
                        </code>
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                          Always-visible active indicator. No animation needed &mdash; clarity over motion.
                        </p>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="text-xs font-semibold text-[#3b82f6] uppercase tracking-wide mb-3">Hover State</div>
                        <code className="text-xs font-mono text-gray-600 block leading-relaxed">
                          hover:border-l-2<br />
                          hover:border-[#3b82f6]<br />
                          hover:bg-gray-50
                        </code>
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                          Left-border highlight only. Zero vertical displacement &mdash; nav items must feel anchored.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-8">
                  {/* Primary */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Primary &mdash; Blue action button</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="
                        px-5 py-2.5
                        bg-[#3b82f6] text-white
                        rounded-lg font-medium text-sm
                        hover:bg-[#2563eb] hover:-translate-y-0.5
                        hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)]
                        focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
                        active:scale-[0.98] active:bg-[#1d4ed8] active:translate-y-0 active:shadow-none
                        transition-all duration-150 ease-out
                      ">
                        Save Changes
                      </button>
                      <button className="
                        px-5 py-2.5
                        bg-[#10b981] text-white
                        rounded-lg font-medium text-sm
                        hover:bg-[#059669] hover:-translate-y-0.5
                        hover:shadow-[0_4px_10px_rgba(16,185,129,0.4)]
                        focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2
                        active:scale-[0.98] active:translate-y-0 active:shadow-none
                        transition-all duration-150 ease-out
                      ">
                        Confirm
                      </button>
                      <button className="
                        px-5 py-2.5
                        bg-[#ef4444] text-white
                        rounded-lg font-medium text-sm
                        hover:bg-[#dc2626] hover:-translate-y-0.5
                        hover:shadow-[0_4px_10px_rgba(239,68,68,0.4)]
                        focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:ring-offset-2
                        active:scale-[0.98] active:translate-y-0 active:shadow-none
                        transition-all duration-150 ease-out
                      ">
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Secondary / outline */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Secondary &amp; Outline variants</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="
                        px-5 py-2.5
                        bg-white text-[#1e293b]
                        border border-gray-300
                        rounded-lg font-medium text-sm
                        hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
                        active:scale-[0.98] active:translate-y-0
                        transition-all duration-150 ease-out
                      ">
                        Cancel
                      </button>
                      <button className="
                        px-5 py-2.5
                        bg-transparent text-[#3b82f6]
                        border border-[#3b82f6]
                        rounded-lg font-medium text-sm
                        hover:bg-[#3b82f6]/5 hover:-translate-y-0.5
                        focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
                        active:scale-[0.98] active:translate-y-0
                        transition-all duration-150 ease-out
                      ">
                        Export
                      </button>
                      <button className="
                        px-5 py-2.5
                        bg-[#f1f5f9] text-gray-600
                        rounded-lg font-medium text-sm
                        hover:bg-gray-200 hover:-translate-y-0.5
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                        active:scale-[0.98] active:translate-y-0
                        transition-all duration-150 ease-out
                      ">
                        More options
                      </button>
                    </div>
                  </div>

                  {/* Size variants */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Size variants</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "XS", classes: "px-3 py-1.5 text-xs" },
                        { size: "SM", classes: "px-4 py-2 text-sm" },
                        { size: "MD", classes: "px-5 py-2.5 text-sm" },
                        { size: "LG", classes: "px-6 py-3 text-base" },
                      ].map(({ size, classes }) => (
                        <button
                          key={size}
                          className={`bg-[#3b82f6] text-white rounded-lg font-medium
                            hover:bg-[#2563eb] hover:-translate-y-0.5
                            hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)]
                            focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
                            active:scale-[0.98] active:translate-y-0 active:shadow-none
                            transition-all duration-150 ease-out ${classes}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* METRICS TAB */}
              {activeTab === "metrics" && (
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-6">
                    Dashboard metric cards &mdash; main content zone components
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {metricsData.map((m) => (
                      <div
                        key={m.label}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm font-medium text-gray-500">{m.label}</span>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              m.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                            }`}
                          >
                            {m.delta}
                          </span>
                        </div>
                        <div className="text-3xl font-bold" style={{ color: m.color }}>{m.value}</div>
                        <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: "72%", backgroundColor: m.color, opacity: 0.4 }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-gray-400">vs. last month</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 6. ANIMATION & INTERACTION RULES                              */}
      {/* ============================================================= */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3b82f6] block mb-3">
              Interaction Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight">
              Animation &amp; <span className="text-[#3b82f6]">interaction</span> rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Four named interaction patterns govern all Holy Grail components. Hover or interact
              with each demo card to feel the physics. Productivity tools demand crisp, predictable responses.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Content Supremacy */}
            <RevealBlock delay={0.08}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-2">
                  <LayersIcon className="w-4 h-4 text-[#3b82f6]" />
                  <span className="text-sm font-bold text-[#1e293b]">Content Supremacy</span>
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-[#3b82f6]">Card Float</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-1">
                  Main content cards: minimal, non-distracting float. Enough to signal interactivity
                  without disrupting reading focus.
                </p>
                <div className="font-mono text-[10px] text-gray-400 bg-[#f1f5f9] rounded-lg px-3 py-2 mb-6">
                  hover:-translate-y-0.5 hover:shadow-md<br />
                  transition-all duration-150 ease-out
                </div>
                <div className="space-y-3">
                  {["Project Alpha \u2014 Q1 Deliverables", "Design System v2.0 Audit", "Infrastructure Review"].map((title) => (
                    <div
                      key={title}
                      className="bg-[#f1f5f9] rounded-xl p-4 border border-gray-100 cursor-default hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out"
                    >
                      <div className="text-sm font-medium text-[#1e293b] mb-1">{title}</div>
                      <div className="text-xs text-gray-400">Hover to feel the 0.5px lift</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Card 2: Navigation Anchoring */}
            <RevealBlock delay={0.12}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-2">
                  <AnchorIcon className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm font-bold text-[#1e293b]">Navigation Anchoring</span>
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-[#10b981]">No Y-shift</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-1">
                  Sidebar nav hover uses left-border highlight only. Zero vertical displacement.
                  Nav must feel anchored and stable &mdash; it is the user&apos;s spatial reference.
                </p>
                <div className="font-mono text-[10px] text-gray-400 bg-[#f1f5f9] rounded-lg px-3 py-2 mb-6">
                  hover:border-l-2<br />
                  hover:border-[#3b82f6]<br />
                  hover:bg-gray-50<br />
                  transition-all duration-150
                </div>
                <nav className="bg-[#f1f5f9] rounded-xl border border-gray-200 p-3 space-y-0.5">
                  {["Dashboard", "Projects", "Analytics", "Reports", "Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 select-none
                        ${i === 0
                          ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                          : "text-gray-600 hover:border-l-2 hover:border-[#3b82f6] hover:bg-gray-50"
                        }`}
                    >
                      {item}
                    </div>
                  ))}
                </nav>
              </div>
            </RevealBlock>

            {/* Card 3: Crisp Performance */}
            <RevealBlock delay={0.16}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-2">
                  <ZapIcon className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-sm font-bold text-[#1e293b]">Crisp Performance</span>
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-[#f59e0b]">duration-150</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-1">
                  All transitions must be 150ms or less. Productivity tools require instant
                  response. Sluggish animations erode trust and interrupt workflow.
                </p>
                <div className="font-mono text-[10px] text-gray-400 bg-[#f1f5f9] rounded-lg px-3 py-2 mb-6">
                  transition-all duration-150 ease-out<br />
                  <span className="text-red-400">&#x2717; duration-300+ prohibited</span>
                </div>

                {/* Speed comparison */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-[#10b981]">duration-150 (correct)</span>
                      <button
                        className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-[#10b981] hover:bg-emerald-100 transition-colors duration-150 font-medium"
                        onClick={() => setDurationDemo(durationDemo === "fast" ? null : "fast")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-9 bg-[#f1f5f9] rounded-full overflow-hidden border border-gray-200">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 rounded-full bg-[#10b981]"
                        style={{
                          transform: `translateY(-50%) translateX(${durationDemo === "fast" ? "180px" : "0"})`,
                          transition: durationDemo === "fast" ? "transform 0.15s ease-out" : "none",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-[#ef4444]">duration-500 (prohibited)</span>
                      <button
                        className="text-xs px-2.5 py-1 rounded bg-red-50 text-[#ef4444] hover:bg-red-100 transition-colors duration-150 font-medium"
                        onClick={() => setDurationDemo(durationDemo === "slow" ? null : "slow")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-9 bg-[#f1f5f9] rounded-full overflow-hidden border border-gray-200">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 rounded-full bg-[#ef4444] opacity-60"
                        style={{
                          transform: `translateY(-50%) translateX(${durationDemo === "slow" ? "180px" : "0"})`,
                          transition: durationDemo === "slow" ? "transform 0.5s ease-out" : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Card 4: Button Physics */}
            <RevealBlock delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-full">
                <div className="flex items-center gap-2 mb-2">
                  <MouseIcon className="w-4 h-4 text-[#ef4444]" />
                  <span className="text-sm font-bold text-[#1e293b]">Button Physics</span>
                  <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded bg-red-50 text-[#ef4444]">Tactile</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-1">
                  Three-state button: hover floats 0.5px with glow shadow, active micro-presses
                  with scale(0.98) + translate-y-0 (resets lift), focus shows WCAG 2.1 AA ring.
                </p>
                <div className="font-mono text-[10px] text-gray-400 bg-[#f1f5f9] rounded-lg px-3 py-2 mb-6">
                  hover:-translate-y-0.5<br />
                  hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)]<br />
                  active:scale-[0.98] active:translate-y-0<br />
                  focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2<br />
                  transition-all duration-150 ease-out
                </div>
                <div className="flex flex-wrap gap-3 justify-center py-4">
                  <button
                    className="
                      px-5 py-2.5
                      bg-[#3b82f6] text-white
                      rounded-lg font-medium text-sm
                      hover:bg-[#2563eb] hover:-translate-y-0.5
                      hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
                      active:scale-[0.98] active:bg-[#1d4ed8] active:translate-y-0 active:shadow-none
                      transition-all duration-150 ease-out
                    "
                  >
                    Try me &mdash; hover, click, tab
                  </button>
                  <button
                    className="
                      px-5 py-2.5
                      bg-white text-[#1e293b]
                      border border-gray-300
                      rounded-lg font-medium text-sm
                      hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2
                      active:scale-[0.98] active:translate-y-0 active:shadow-none
                      transition-all duration-150 ease-out
                    "
                  >
                    Secondary
                  </button>
                </div>
                <p className="text-center text-xs text-gray-400">
                  Press Tab to see the focus ring &mdash; WCAG 2.1 AA required
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 7. DESIGN RULES — DO / DON'T                                  */}
      {/* ============================================================= */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#1e293b] block mb-3">
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight">
              Do&apos;s &amp; <span className="text-[#ef4444]">don&apos;ts</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              These rules are non-negotiable. Every violation degrades the layout&apos;s structural
              integrity or interaction quality. Apply them without exception.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* DO column */}
            <RevealBlock delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-emerald-200 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#10b981]">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use CSS Grid or Flexbox to guarantee equal-height columns",
                    "Fix header with sticky top-0 z-50 &mdash; always visible on scroll",
                    "Make main content flex-1 with min-w-0 to prevent overflow",
                    "Keep left nav at fixed w-60 and right sidebar at w-64",
                    "Place main content first in HTML source for SEO",
                    "Collapse right sidebar at 1024px breakpoint",
                    "Stack all columns vertically at 768px on mobile",
                    "All buttons: active:scale-[0.98] + focus:ring-2 + focus:ring-[#3b82f6]",
                    "Content cards: hover:-translate-y-0.5 hover:shadow-md (minimal motion)",
                    "Sidebar nav: hover:border-l-2 hover:border-[#3b82f6] &mdash; NO vertical shift",
                    "All transitions: duration-150 ease-out &mdash; instant and crisp",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#10b981] flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: rule }} />
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.15}>
              <div className="bg-white rounded-2xl p-8 border border-red-200 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <XIcon className="w-4 h-4 text-[#ef4444]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#ef4444]">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Let three columns render at different heights",
                    "Allow main content to become too narrow &mdash; always flex-1 min-w-0",
                    "Ignore responsive collapse &mdash; sidebar must hide at 1024px",
                    "Let sidebar width change with content &mdash; always fixed width",
                    "Forget to fix header &mdash; it must stick on scroll",
                    "Use large card displacement: hover:-translate-y-2 breaks reading focus",
                    "Exceed duration-200 for any interactive element animation",
                    "Omit active:scale-[0.98] on buttons &mdash; no tactile confirmation",
                    "Add vertical displacement to sidebar nav hover &mdash; breaks anchoring",
                    "Apply spring cubic-bezier to productivity UI &mdash; too bouncy",
                    "Use position:absolute to fake equal-height columns",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ef4444] flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: rule }} />
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Quick reference: CSS snippet */}
          <RevealBlock delay={0.2}>
            <div className="bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-mono text-gray-400">holy-grail-skeleton.tsx</span>
              </div>
              <pre className="text-xs font-mono text-gray-300 leading-relaxed overflow-x-auto">
{`<div className="min-h-screen flex flex-col bg-[#f1f5f9]">
  {/* Header — sticky, always visible */}
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div className="px-6 py-3 flex items-center justify-between h-14">
      ...
    </div>
  </header>

  {/* Three-column body — equal-height via flex */}
  <div className="flex-1 flex">
    {/* Left nav — fixed width */}
    <aside className="w-60 bg-white border-r border-gray-200 p-4 flex-shrink-0 hidden md:block">
      ...
    </aside>

    {/* Main content — adaptive, source-first for SEO */}
    <main className="flex-1 p-6 min-w-0">
      ...
    </main>

    {/* Right sidebar — fixed width, hidden on tablet */}
    <aside className="w-64 bg-white border-l border-gray-200 p-4 flex-shrink-0 hidden lg:block">
      ...
    </aside>
  </div>

  {/* Footer */}
  <footer className="bg-white border-t border-gray-200">
    ...
  </footer>
</div>`}
              </pre>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 8. FOOTER                                                      */}
      {/* ============================================================= */}
      <footer className="bg-[#1e293b] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-14">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#3b82f6] flex items-center justify-center">
                  <LayoutIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">Holy Grail Layout</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                The classic five-zone web layout pattern. Built for productivity dashboards,
                admin panels, and documentation sites that demand structural clarity.
              </p>
              {/* Color swatches */}
              <div className="flex gap-2">
                {["#1e293b", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-white/10 hover:-translate-y-0.5 transition-transform duration-150"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500">This Style</span>
                <Link href="/styles/holy-grail-layout" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Documentation
                </Link>
                <Link href="/styles/holy-grail-layout/showcase" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Showcase
                </Link>
                <Link href="/styles/holy-grail-layout/cover" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500">StyleKit</span>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Home
                </Link>
                <Link href="/styles" className="text-gray-400 hover:text-white transition-colors duration-150">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500">Compatible</span>
                {["corporate-clean", "editorial", "notion-style", "minimalist-flat", "dark-mode"].map((s) => (
                  <Link key={s} href={`/styles/${s}`} className="text-gray-400 hover:text-white transition-colors duration-150 text-xs">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              Holy Grail Layout &mdash; part of the StyleKit design system
            </div>
            <Link
              href="/styles"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 text-gray-300 text-sm font-medium border border-white/10
                hover:bg-white/10 hover:-translate-y-0.5 hover:text-white
                active:scale-[0.98] active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 focus:ring-offset-[#1e293b]
                transition-all duration-150 ease-out"
            >
              <span>&larr;</span>
              <span>All Styles</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
