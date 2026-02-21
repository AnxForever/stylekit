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

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ChartBarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ShoppingBagIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function CogIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function TrendUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function TrendDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function DocumentIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const kpiCards = [
  {
    label: "Revenue",
    value: "$48,230",
    change: "+12.5%",
    direction: "up" as const,
    icon: <ChartBarIcon className="w-5 h-5" />,
    color: "#6366f1",
    iconBg: "bg-indigo-100",
  },
  {
    label: "Orders",
    value: "1,842",
    change: "+8.1%",
    direction: "up" as const,
    icon: <ShoppingBagIcon className="w-5 h-5" />,
    color: "#10b981",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Customers",
    value: "12,420",
    change: "-2.3%",
    direction: "down" as const,
    icon: <UsersIcon className="w-5 h-5" />,
    color: "#ef4444",
    iconBg: "bg-red-100",
  },
  {
    label: "Conversion",
    value: "3.64%",
    change: "+0.3%",
    direction: "neutral" as const,
    icon: <TrendUpIcon className="w-5 h-5" />,
    color: "#f59e0b",
    iconBg: "bg-amber-100",
  },
];

const barChartData = [
  { month: "Aug", value: 62 },
  { month: "Sep", value: 71 },
  { month: "Oct", value: 55 },
  { month: "Nov", value: 84 },
  { month: "Dec", value: 93 },
  { month: "Jan", value: 78 },
  { month: "Feb", value: 100 },
];

const tableRows = [
  { id: "#4821", customer: "Alice Chen", product: "Pro Plan", amount: "$299", status: "Paid", date: "Feb 20" },
  { id: "#4820", customer: "Marcus Webb", product: "Enterprise", amount: "$899", status: "Paid", date: "Feb 20" },
  { id: "#4819", customer: "Priya Sharma", product: "Starter", amount: "$49", status: "Pending", date: "Feb 19" },
  { id: "#4818", customer: "Tom Nakamura", product: "Pro Plan", amount: "$299", status: "Failed", date: "Feb 18" },
  { id: "#4817", customer: "Sara Liu", product: "Enterprise", amount: "$899", status: "Paid", date: "Feb 17" },
];

const navItems = [
  { label: "Overview", icon: <HomeIcon className="w-5 h-5" /> },
  { label: "Analytics", icon: <ChartBarIcon className="w-5 h-5" /> },
  { label: "Orders", icon: <ShoppingBagIcon className="w-5 h-5" /> },
  { label: "Customers", icon: <UsersIcon className="w-5 h-5" /> },
  { label: "Reports", icon: <DocumentIcon className="w-5 h-5" /> },
  { label: "Settings", icon: <CogIcon className="w-5 h-5" /> },
];

type GalleryTab = "kpi" | "nav" | "table" | "chart";
type ViewportMode = "desktop" | "tablet" | "mobile";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function statusBadgeClass(status: string): string {
  if (status === "Paid") return "text-green-600 bg-green-50";
  if (status === "Pending") return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const [galleryTab, setGalleryTab] = useState<GalleryTab>("kpi");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [notifCount, setNotifCount] = useState(3);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes db-pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .db-pulse-dot {
          animation: db-pulse-dot 2s ease-in-out infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED STICKY NAV                                              */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 ease-out group"
          >
            <svg className="w-4 h-4 transition-transform duration-150 ease-out group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </Link>

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <ChartBarIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900 tracking-tight hidden sm:block">
              Dashboard<span className="text-indigo-500">Layout</span>
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/styles"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-900/30 focus:ring-offset-1 transition-all duration-150 ease-out"
          >
            <span>View All Styles</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-24 md:pt-32 pb-20 px-5 md:px-10 bg-gray-900 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 db-pulse-dot" />
              Layout System
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1.0] tracking-tight mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="text-white">Dashboard</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Layout
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Data-driven layout for SaaS admin panels and analytics platforms.
            Dark sidebar, crisp topbar, KPI grid, charts, and data tables — all snapping into place with precision micro-interactions.
          </p>

          {/* 3-zone anatomy cards */}
          <div
            className="grid grid-cols-3 gap-3 max-w-lg"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {[
              { label: "Sidebar", desc: "w-64 bg-gray-900", color: "bg-gray-700 border-gray-600" },
              { label: "Topbar", desc: "bg-white border-b", color: "bg-gray-600 border-gray-500" },
              { label: "Content", desc: "flex-1 bg-gray-50", color: "bg-gray-800 border-gray-700" },
            ].map((zone) => (
              <div
                key={zone.label}
                className={`rounded-xl p-4 border ${zone.color} transition-all duration-150 ease-out hover:scale-[1.02] cursor-default`}
              >
                <div className="text-white text-sm font-semibold mb-1">{zone.label}</div>
                <div className="text-gray-400 text-xs font-mono leading-tight">{zone.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. LIVE DASHBOARD DEMO                                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 block mb-3">
              Live Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Working dashboard <span className="text-indigo-500">mockup</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-6">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Full interactive dashboard with dark sidebar, KPI cards, bar chart, and data table.
              Toggle viewport to see responsive behavior.
            </p>
          </RevealBlock>

          {/* Viewport toggle */}
          <RevealBlock delay={0.08} className="mb-6">
            <div className="flex items-center gap-2">
              {(["desktop", "tablet", "mobile"] as ViewportMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewport(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 ease-out active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                    viewport === mode
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Dashboard frame */}
          <RevealBlock delay={0.12}>
            <div className="rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-gray-50">
              {/* Browser chrome bar */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 max-w-sm mx-auto">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 text-center">
                    app.dashboard.io/overview
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div
                className="transition-all duration-300 ease-out overflow-hidden"
                style={{
                  maxWidth: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px",
                  margin: viewport === "desktop" ? "0" : "0 auto",
                }}
              >
                <div className="flex bg-gray-50" style={{ minHeight: "480px" }}>
                  {/* Sidebar — hidden on mobile */}
                  {viewport !== "mobile" && (
                    <aside
                      className="bg-gray-900 text-white flex-shrink-0 flex flex-col"
                      style={{ width: viewport === "tablet" ? "200px" : "256px" }}
                    >
                      {/* Brand */}
                      <div className="px-5 py-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <ChartBarIcon className="w-4 h-4 text-white" />
                          </div>
                          {viewport !== "tablet" && (
                            <span className="text-sm font-bold text-white tracking-tight">DataPanel</span>
                          )}
                        </div>
                      </div>

                      {/* Nav items */}
                      <nav className="flex-1 p-3 space-y-0.5">
                        {navItems.map((item, i) => (
                          <button
                            key={item.label}
                            onClick={() => setActiveNav(i)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ease-out group ${
                              activeNav === i
                                ? "bg-white/10 text-white font-medium"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <span className={`transition-colors duration-150 ${activeNav === i ? "text-indigo-400" : "group-hover:text-gray-200"}`}>
                              {item.icon}
                            </span>
                            {viewport !== "tablet" && <span>{item.label}</span>}
                          </button>
                        ))}
                      </nav>

                      {/* User bottom */}
                      <div className="p-3 border-t border-white/10">
                        <div className="flex items-center gap-3 px-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            AC
                          </div>
                          {viewport !== "tablet" && (
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-white truncate">Alice Chen</div>
                              <div className="text-xs text-gray-500 truncate">Admin</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </aside>
                  )}

                  {/* Main area */}
                  <div className="flex-1 flex flex-col min-w-0">
                    {/* Topbar */}
                    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        {viewport === "mobile" && (
                          <div className="w-6 h-6 flex flex-col justify-center gap-1 cursor-pointer">
                            <div className="w-4 h-0.5 bg-gray-600" />
                            <div className="w-4 h-0.5 bg-gray-600" />
                            <div className="w-4 h-0.5 bg-gray-600" />
                          </div>
                        )}
                        <h2 className="text-sm font-semibold text-gray-900">
                          {navItems[activeNav]?.label ?? "Overview"}
                        </h2>
                        <span className="hidden sm:block text-xs text-gray-400">Feb 21, 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Search */}
                        {viewport === "desktop" && (
                          <div className="relative">
                            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search..."
                              readOnly
                              className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-150 w-40"
                            />
                          </div>
                        )}
                        {/* Bell */}
                        <button
                          className="relative p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150 ease-out active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-400/30"
                          onClick={() => setNotifCount(0)}
                        >
                          <BellIcon className="w-4 h-4" />
                          {notifCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                              {notifCount}
                            </span>
                          )}
                        </button>
                        {/* Avatar */}
                        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          AC
                        </div>
                      </div>
                    </header>

                    {/* Content area */}
                    <main className="flex-1 p-4 overflow-auto">
                      {/* KPI grid */}
                      <div
                        className="grid gap-3 mb-4"
                        style={{
                          gridTemplateColumns:
                            viewport === "mobile"
                              ? "1fr 1fr"
                              : viewport === "tablet"
                              ? "repeat(2, 1fr)"
                              : "repeat(4, 1fr)",
                        }}
                      >
                        {kpiCards.map((card) => (
                          <div
                            key={card.label}
                            className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-150">
                                {card.label}
                              </span>
                              <div
                                className={`w-7 h-7 rounded-lg ${card.iconBg} flex items-center justify-center transition-transform duration-150 group-hover:scale-110`}
                                style={{ color: card.color }}
                              >
                                {card.icon}
                              </div>
                            </div>
                            <div className="text-xl font-bold text-gray-900 group-hover:scale-[1.02] group-hover:text-indigo-600 transition-all duration-150 ease-out origin-left">
                              {card.value}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {card.direction === "up" && <TrendUpIcon className="w-3 h-3 text-green-500" />}
                              {card.direction === "down" && <TrendDownIcon className="w-3 h-3 text-red-500" />}
                              <span
                                className={`text-xs font-medium ${
                                  card.direction === "up"
                                    ? "text-green-500"
                                    : card.direction === "down"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {card.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart area */}
                      {viewport !== "mobile" && (
                        <div
                          className="grid gap-3 mb-4"
                          style={{ gridTemplateColumns: viewport === "tablet" ? "1fr" : "2fr 1fr" }}
                        >
                          {/* Bar chart */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-semibold text-gray-900">Revenue Trend</h3>
                              <span className="text-xs text-gray-400">Last 7 months</span>
                            </div>
                            <div className="flex items-end gap-2 h-24">
                              {barChartData.map((bar) => (
                                <div key={bar.month} className="flex-1 flex flex-col items-center gap-1 group">
                                  <div
                                    className="w-full rounded-t-md bg-indigo-500 hover:bg-indigo-400 transition-all duration-150 ease-out cursor-default"
                                    style={{ height: `${bar.value * 0.88}%` }}
                                    title={`${bar.month}: ${bar.value}%`}
                                  />
                                  <span className="text-[9px] text-gray-400">{bar.month}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Donut placeholder */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                            <div className="flex justify-center items-center" style={{ height: "80px" }}>
                              <svg viewBox="0 0 80 80" className="w-20 h-20">
                                <circle cx="40" cy="40" r="28" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                                <circle cx="40" cy="40" r="28" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="70 106" strokeDashoffset="0" strokeLinecap="round" />
                                <circle cx="40" cy="40" r="28" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="45 131" strokeDashoffset="-70" strokeLinecap="round" />
                                <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="30 146" strokeDashoffset="-115" strokeLinecap="round" />
                              </svg>
                            </div>
                            <div className="space-y-1.5 mt-2">
                              {[
                                { label: "Organic", pct: "40%", color: "#6366f1" },
                                { label: "Referral", pct: "26%", color: "#10b981" },
                                { label: "Direct", pct: "17%", color: "#f59e0b" },
                              ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] text-gray-500">{item.label}</span>
                                  </div>
                                  <span className="text-[10px] font-medium text-gray-700">{item.pct}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Data table */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                          <h3 className="text-sm font-semibold text-gray-900">Recent Orders</h3>
                          <button className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors duration-150 font-medium">
                            View all
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Order</th>
                                {viewport !== "mobile" && (
                                  <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Customer</th>
                                )}
                                <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Amount</th>
                                <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableRows.map((row, i) => (
                                <tr
                                  key={row.id}
                                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 ease-out cursor-default"
                                  onMouseEnter={() => setHoveredRow(i)}
                                  onMouseLeave={() => setHoveredRow(null)}
                                >
                                  <td className="px-4 py-2.5">
                                    <span className="font-mono text-gray-600">{row.id}</span>
                                  </td>
                                  {viewport !== "mobile" && (
                                    <td className="px-4 py-2.5 text-gray-700">{row.customer}</td>
                                  )}
                                  <td className="px-4 py-2.5 font-medium text-gray-900">{row.amount}</td>
                                  <td className="px-4 py-2.5">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadgeClass(row.status)}`}>
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Viewport note */}
          <RevealBlock delay={0.18} className="mt-4">
            <p className="text-xs text-gray-400 text-center">
              {viewport === "desktop" && "Desktop: sidebar w-64 + 4-col KPI grid + chart split (2:1) + full table"}
              {viewport === "tablet" && "Tablet: narrower sidebar w-48 + 2-col KPI grid + single-column charts"}
              {viewport === "mobile" && "Mobile: sidebar hidden, 2-col KPI grid, table condensed"}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. LAYOUT ANATOMY                                                */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 block mb-3">
              Anatomy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Layout <span className="text-emerald-500">zones</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Three zones working in concert. Each zone has a clear role and a defined Tailwind class pattern.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                zone: "Sidebar",
                classes: "bg-gray-900 w-64",
                role: "Primary navigation, branding, user identity. Dark and persistent — always visible on desktop.",
                tokens: ["bg-gray-900", "w-64", "text-white", "flex-shrink-0"],
                color: "border-indigo-200 bg-indigo-50",
                badge: "bg-indigo-100 text-indigo-700",
              },
              {
                zone: "Topbar",
                classes: "bg-white border-b",
                role: "Contextual actions: search, notifications, user avatar. Sticky at the top of the content column.",
                tokens: ["bg-white", "border-b border-gray-200", "px-6 py-3", "flex items-center"],
                color: "border-emerald-200 bg-emerald-50",
                badge: "bg-emerald-100 text-emerald-700",
              },
              {
                zone: "Content",
                classes: "flex-1 bg-gray-50",
                role: "KPI cards, charts, tables, and page-specific data. Scrolls independently of the sidebar.",
                tokens: ["flex-1", "bg-gray-50", "p-6", "overflow-auto"],
                color: "border-amber-200 bg-amber-50",
                badge: "bg-amber-100 text-amber-700",
              },
            ].map((zone, i) => (
              <RevealBlock key={zone.zone} delay={i * 0.08}>
                <div className={`rounded-2xl p-6 border-2 ${zone.color} h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{zone.zone}</h3>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${zone.badge}`}>
                      {zone.classes}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{zone.role}</p>
                  <div className="space-y-1.5">
                    {zone.tokens.map((token) => (
                      <div
                        key={token}
                        className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-mono text-gray-600"
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Responsive behavior table */}
          <RevealBlock delay={0.2}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900">Responsive Breakpoints</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Breakpoint</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Sidebar</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">KPI Grid</th>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Charts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { bp: "xl (1280px+)", sidebar: "w-64 visible", kpi: "grid-cols-4", charts: "2fr 1fr split" },
                      { bp: "lg (1024px)", sidebar: "w-56 visible", kpi: "grid-cols-4", charts: "2fr 1fr split" },
                      { bp: "md (768px)", sidebar: "w-48 compact", kpi: "grid-cols-2", charts: "single column" },
                      { bp: "sm (375px)", sidebar: "hidden", kpi: "grid-cols-2", charts: "hidden / tab" },
                    ].map((row, i) => (
                      <tr
                        key={row.bp}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
                      >
                        <td className="px-6 py-3 font-mono text-xs text-gray-600">{row.bp}</td>
                        <td className="px-6 py-3 text-gray-700">{row.sidebar}</td>
                        <td className="px-6 py-3 text-gray-700">{row.kpi}</td>
                        <td className="px-6 py-3 text-gray-700">{row.charts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENT GALLERY — 4 tabs                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Component <span className="text-indigo-500">gallery</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              All interactive. Hover to see micro-interactions. Each component enforces the
              150ms crisp SaaS feel from the aiRules.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.08} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["kpi", "nav", "table", "chart"] as GalleryTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setGalleryTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-150 ease-out active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                    galleryTab === tab
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {tab === "kpi" ? "KPI Cards" : tab === "nav" ? "Nav Items" : tab === "table" ? "Data Tables" : "Charts"}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.12}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              {/* ---- KPI CARDS ---- */}
              {galleryTab === "kpi" && (
                <div className="p-8 md:p-12">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-8">
                    KPI Card — group-hover float + number scale + color shift
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpiCards.map((card) => (
                      <div
                        key={card.label}
                        className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-150">
                            {card.label}
                          </span>
                          <div
                            className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-150`}
                            style={{ color: card.color }}
                          >
                            {card.icon}
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 group-hover:scale-[1.05] group-hover:text-indigo-600 transition-all duration-150 ease-out origin-left">
                          {card.value}
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          {card.direction === "up" ? (
                            <TrendUpIcon className="w-3.5 h-3.5 text-green-500" />
                          ) : card.direction === "down" ? (
                            <TrendDownIcon className="w-3.5 h-3.5 text-red-500" />
                          ) : null}
                          <span
                            className={`text-sm font-medium ${
                              card.direction === "up" ? "text-green-500" : card.direction === "down" ? "text-red-500" : "text-yellow-500"
                            }`}
                          >
                            {card.change}
                          </span>
                          <span className="text-xs text-gray-400">vs last month</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                    <p className="text-xs text-indigo-700 font-mono leading-relaxed">
                      group-hover:scale-[1.05] group-hover:text-indigo-600 &mdash; KPI Focus rule<br />
                      hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 &mdash; Hover Hinting rule<br />
                      transition-all duration-150 ease-out &mdash; Crisp SaaS Feel rule
                    </p>
                  </div>
                </div>
              )}

              {/* ---- NAV ITEMS ---- */}
              {galleryTab === "nav" && (
                <div className="p-8 md:p-12">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-8">
                    Sidebar nav — active bg-white/10, hover bg-white/5, icon color shift
                  </p>
                  <div className="flex gap-8">
                    {/* Full sidebar mockup */}
                    <div className="w-64 bg-gray-900 rounded-2xl overflow-hidden flex-shrink-0">
                      <div className="px-5 py-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <ChartBarIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-bold text-white">DataPanel</span>
                        </div>
                      </div>
                      <nav className="p-3 space-y-0.5">
                        {navItems.map((item, i) => (
                          <button
                            key={item.label}
                            onClick={() => setActiveNav(i)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ease-out group ${
                              activeNav === i
                                ? "bg-white/10 text-white font-medium"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <span className={`transition-colors duration-150 ${activeNav === i ? "text-indigo-400" : "group-hover:text-gray-200"}`}>
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                            {activeNav === i && (
                              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            )}
                          </button>
                        ))}
                      </nav>
                      <div className="p-3 border-t border-white/10">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors duration-150 cursor-pointer">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">AC</div>
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-white truncate">Alice Chen</div>
                            <div className="text-xs text-gray-500 truncate">Admin</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spec notes */}
                    <div className="flex-1 space-y-4">
                      <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Active State</div>
                        <code className="block text-xs font-mono text-gray-700 leading-relaxed">
                          bg-white/10 text-white font-medium<br />
                          + indigo-400 dot indicator
                        </code>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Hover State</div>
                        <code className="block text-xs font-mono text-gray-700 leading-relaxed">
                          hover:text-white hover:bg-white/5<br />
                          group-hover: icon color transition
                        </code>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Transition</div>
                        <code className="block text-xs font-mono text-gray-700 leading-relaxed">
                          duration-150 ease-out &mdash; crisp, precise
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- DATA TABLES ---- */}
              {galleryTab === "table" && (
                <div className="p-8 md:p-12">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-8">
                    Data table &mdash; hover:bg-gray-50 per-row hinting, status badge color-coding
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50">
                      <h4 className="text-sm font-semibold text-gray-900">Recent Orders</h4>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors duration-150 ease-out active:scale-[0.97]">
                          Filter
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs hover:bg-gray-700 transition-colors duration-150 ease-out active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-900/30">
                          Export
                        </button>
                      </div>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {["Order", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                            <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row, i) => (
                          <tr
                            key={row.id}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 ease-out cursor-default"
                            onMouseEnter={() => setHoveredRow(i)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{row.id}</td>
                            <td className="px-5 py-3.5 font-medium text-gray-900">{row.customer}</td>
                            <td className="px-5 py-3.5 text-gray-600">{row.product}</td>
                            <td className="px-5 py-3.5 font-semibold text-gray-900">{row.amount}</td>
                            <td className="px-5 py-3.5">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(row.status)}`}>
                                {row.status === "Paid" && <CheckIcon className="w-3 h-3" />}
                                {row.status === "Failed" && <XIcon className="w-3 h-3" />}
                                {row.status}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-xs text-gray-400">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-xs text-gray-500 font-mono">
                      Row hover: hover:bg-gray-50 &mdash; Hover Hinting rule<br />
                      Status: text-green-600 / text-red-500 / text-yellow-500 &mdash; color-coded clarity
                    </p>
                  </div>
                  {/* Suppress unused variable warning */}
                  <span className="sr-only">{hoveredRow}</span>
                </div>
              )}

              {/* ---- CHARTS ---- */}
              {galleryTab === "chart" && (
                <div className="p-8 md:p-12">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-8">
                    Chart components &mdash; bar chart + donut, aspect-ratio constrained
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bar chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-semibold text-gray-900">Revenue (7mo)</h4>
                        <span className="text-xs text-emerald-500 font-medium">+14.2% avg</span>
                      </div>
                      <div className="flex items-end gap-2" style={{ height: "120px" }}>
                        {barChartData.map((bar, i) => (
                          <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                            <div
                              className="w-full rounded-t-md bg-indigo-500 group-hover:bg-indigo-400 transition-colors duration-150 ease-out cursor-default"
                              style={{ height: `${bar.value}%`, transitionDelay: `${i * 20}ms` }}
                              title={`${bar.month}: ${bar.value}%`}
                            />
                            <span className="text-[9px] text-gray-400">{bar.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">August &mdash; February</span>
                        <span className="text-xs font-mono text-gray-500">col-span-2 / aspect-[2/1]</span>
                      </div>
                    </div>

                    {/* Donut */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-semibold text-gray-900">Traffic Sources</h4>
                        <span className="text-xs text-gray-400 font-mono">aspect-square</span>
                      </div>
                      <div className="flex items-center gap-8">
                        <svg viewBox="0 0 100 100" className="w-28 h-28 flex-shrink-0">
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#e5e7eb" strokeWidth="14" />
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#6366f1" strokeWidth="14" strokeDasharray="85 129" strokeDashoffset="0" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="55 159" strokeDashoffset="-85" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="73 141" strokeDashoffset="-140" strokeLinecap="round" />
                        </svg>
                        <div className="flex-1 space-y-3">
                          {[
                            { label: "Organic Search", pct: 40, color: "#6366f1" },
                            { label: "Referral", pct: 26, color: "#10b981" },
                            { label: "Direct", pct: 34, color: "#f59e0b" },
                          ].map((src) => (
                            <div key={src.label} className="group cursor-default">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                                  <span className="text-xs text-gray-600">{src.label}</span>
                                </div>
                                <span className="text-xs font-semibold text-gray-900">{src.pct}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-150 ease-out"
                                  style={{ width: `${src.pct}%`, backgroundColor: src.color }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES — 4 demo cards                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 block mb-3">
              Interaction Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Animation <span className="text-indigo-500">principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Four named rules from the aiRules spec &mdash; each demonstrated with a live interactive element.
              Hover and click to feel the SaaS precision.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Crisp SaaS Feel */}
            <RevealBlock delay={0.08}>
              <div className="rounded-2xl p-8 border-2 border-indigo-100 bg-white h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">Crisp SaaS Feel</span>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                  All micro-interactions use <code className="text-indigo-600 font-mono">duration-150 ease-out</code> &mdash; fast and precise. No sluggishness, no spring overshoot.
                </p>
                <p className="text-xs font-mono text-gray-400 mb-6">duration-150 ease-out everywhere</p>
                <div className="flex flex-wrap gap-3">
                  {["Primary", "Secondary", "Tertiary"].map((label, i) => (
                    <button
                      key={label}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ease-out active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-1 ${
                        i === 0
                          ? "bg-indigo-500 text-white hover:bg-indigo-600"
                          : i === 1
                          ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">Click any button &mdash; notice the instant, precise response.</p>
              </div>
            </RevealBlock>

            {/* Card 2: KPI Focus */}
            <RevealBlock delay={0.12}>
              <div className="rounded-2xl p-8 border-2 border-emerald-100 bg-white h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-semibold">KPI Focus</span>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                  KPI card hover causes slight upward float + core number grows via{" "}
                  <code className="text-emerald-600 font-mono">group-hover:scale-105 group-hover:text-indigo-600</code>
                </p>
                <p className="text-xs font-mono text-gray-400 mb-6">hover:-translate-y-0.5 + group-hover:scale-[1.05]</p>
                <div className="group p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-150">
                      Monthly Revenue
                    </span>
                    <span className="text-xs font-medium text-emerald-500 bg-emerald-50 group-hover:bg-emerald-100 px-2 py-1 rounded-full transition-colors duration-150">
                      +12.5%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 group-hover:scale-[1.05] group-hover:text-indigo-600 transition-all duration-150 ease-out origin-left">
                    $48,230
                  </div>
                  <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-500 transition-colors duration-150">
                    vs. $42,890 last month
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-4">Hover the card &mdash; number scales and turns indigo.</p>
              </div>
            </RevealBlock>

            {/* Card 3: Hover Hinting */}
            <RevealBlock delay={0.16}>
              <div className="rounded-2xl p-8 border-2 border-amber-100 bg-white h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-semibold">Hover Hinting</span>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                  Data rows, panels, and actionable cards get explicit bg on hover:{" "}
                  <code className="text-amber-600 font-mono">hover:bg-gray-50</code>
                </p>
                <p className="text-xs font-mono text-gray-400 mb-6">hover:bg-gray-50 on every interactive row</p>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  {[
                    { name: "Dashboard Overview", badge: "Active" },
                    { name: "Revenue Analytics", badge: "Beta" },
                    { name: "User Management", badge: "" },
                    { name: "Export Reports", badge: "New" },
                  ].map((item, i) => (
                    <div
                      key={item.name}
                      className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ease-out cursor-default ${
                        i < 3 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <span className="text-sm text-gray-700">{item.name}</span>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.badge === "Active" ? "bg-green-50 text-green-600" :
                          item.badge === "Beta" ? "bg-indigo-50 text-indigo-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">Hover any row &mdash; gray-50 signals interactivity.</p>
              </div>
            </RevealBlock>

            {/* Card 4: Action Precision */}
            <RevealBlock delay={0.2}>
              <div className="rounded-2xl p-8 border-2 border-gray-200 bg-white h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">Action Precision</span>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                  Button click has clear press feedback:{" "}
                  <code className="text-gray-600 font-mono">active:scale-[0.97]</code>{" "}
                  + visible focus ring for a11y.
                </p>
                <p className="text-xs font-mono text-gray-400 mb-6">active:scale-[0.97] + focus:ring-2</p>
                <div className="flex flex-col gap-3">
                  <button
                    onMouseDown={() => setButtonPressed(true)}
                    onMouseUp={() => setButtonPressed(false)}
                    onMouseLeave={() => setButtonPressed(false)}
                    className="w-full px-5 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-900/30 focus:ring-offset-2 transition-all duration-150 ease-out"
                  >
                    {buttonPressed ? "Pressed!" : "Click or Tab + Enter me"}
                  </button>
                  <button className="w-full px-5 py-3 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 transition-all duration-150 ease-out">
                    Export Data
                  </button>
                  <button className="w-full px-5 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-1 transition-all duration-150 ease-out">
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Click &mdash; immediate press feedback. Tab to focus &mdash; visible ring.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN RULES DO / DON'T                                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 block mb-3">
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Do &amp; <span className="text-red-500">Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              The rules that separate a professional SaaS dashboard from a cluttered mess.
              Distilled from the style definition.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {/* DO */}
            <RevealBlock delay={0.08}>
              <div className="bg-white rounded-2xl border-2 border-green-200 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-green-700">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "bg-gray-900 w-64 for the dark sidebar — always",
                    "bg-white/10 for the active nav item",
                    "grid grid-cols-4 for KPI cards on desktop",
                    "Large font-bold numbers for KPI values",
                    "text-green-500 for growth, text-red-500 for decline",
                    "aspect-video or aspect-[2/1] for main chart",
                    "col-span-2 for main chart, single for supplementary",
                    "duration-150 ease-out on all interactive elements",
                    "active:scale-[0.97] on every button for press feedback",
                    "hover:bg-gray-50 on all data rows and panels",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-green-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.12}>
              <div className="bg-white rounded-2xl border-2 border-red-200 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-red-600">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Sidebar and content area with mismatched proportions",
                    "Inconsistent padding between data panels",
                    "Skip loading and empty states in data panels",
                    "Make all KPI cards the same visual size",
                    "Use decorative elements that compete with data",
                    "Slow transitions — keep them under 200ms",
                    "Buttons without active:scale or visible focus ring",
                    "Plain gray for status — always use semantic colors",
                    "Dense grids with no visual hierarchy or whitespace",
                    "Expose raw API or DB values without formatting",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Color system reference */}
          <RevealBlock delay={0.18}>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Color System Reference</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: "Primary", hex: "#111827", label: "Sidebar / Text" },
                  { name: "Accent", hex: "#6366f1", label: "Indigo — CTA" },
                  { name: "Success", hex: "#10b981", label: "Growth / Up" },
                  { name: "Warning", hex: "#f59e0b", label: "Neutral / Stable" },
                  { name: "Error", hex: "#ef4444", label: "Decline / Down" },
                ].map((color) => (
                  <div key={color.name} className="group cursor-default">
                    <div
                      className="h-14 rounded-xl mb-3 flex items-end px-3 pb-2 hover:scale-[1.03] transition-transform duration-150 ease-out"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="text-xs font-mono text-white opacity-80">{color.hex}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{color.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{color.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="bg-gray-900 border-t border-white/10 overflow-hidden relative">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Accent blob */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-12 relative">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <ChartBarIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Dashboard<span className="text-indigo-400">Layout</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Data-driven SaaS layout system. Dark sidebar, crisp topbar, KPI cards,
                charts, and tables &mdash; precision micro-interactions throughout.
              </p>
              {/* Color swatches */}
              <div className="flex gap-2 mt-1">
                {["#111827", "#6366f1", "#10b981", "#f59e0b", "#ef4444"].map((hex) => (
                  <div
                    key={hex}
                    className="w-5 h-5 rounded-full hover:scale-[1.25] transition-transform duration-150 ease-out cursor-default"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">Style</span>
                <Link href="/styles/dashboard-layout" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Documentation
                </Link>
                <Link href="/styles/dashboard-layout/showcase" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Showcase
                </Link>
                <Link href="/styles/dashboard-layout/cover" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">StyleKit</span>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-150">
                  Home
                </Link>
                <Link href="/styles" className="text-gray-400 hover:text-white transition-colors duration-150">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">Compatible</span>
                {["Corporate Clean", "Dark Mode", "Minimalist Flat", "Fluent Design"].map((s) => (
                  <span key={s} className="text-gray-500 text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 db-pulse-dot" />
              <span>Dashboard Layout &mdash; StyleKit Design System</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-150 ease-out"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
