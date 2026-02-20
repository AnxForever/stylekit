"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const kpis = [
  { label: "Total Revenue", value: "$142,300", sub: "+12% from last month", up: true, icon: "revenue", live: true },
  { label: "Active Users", value: "3,847", sub: "+8.1% from last month", up: true, icon: "users", live: false },
  { label: "Conversion Rate", value: "4.6%", sub: "-0.3% from last month", up: false, icon: "conversion", live: false },
  { label: "Growth Index", value: "92.5", sub: "+5.7% from last month", up: true, icon: "growth", live: true },
];

const socialStats = [
  { label: "Views", value: "27.6m", delta: "+18.3%", up: true },
  { label: "Followers", value: "219.3k", delta: "+4.2%", up: true },
  { label: "Reposts", value: "1.5k", delta: "-0.8%", up: false },
];

const barValues = [42, 58, 35, 70, 53, 67, 80, 48, 72, 55, 63, 78];
const barMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const tableRows = [
  { id: "#7201", customer: "Amara Collins", amount: "$340.00", status: "Completed", date: "Feb 20" },
  { id: "#7200", customer: "Luca Moretti", amount: "$89.00", status: "Processing", date: "Feb 19" },
  { id: "#7199", customer: "Hana Yoshida", amount: "$1,240.00", status: "Completed", date: "Feb 19" },
  { id: "#7198", customer: "Marco Santos", amount: "$220.00", status: "Failed", date: "Feb 18" },
  { id: "#7197", customer: "Priya Nair", amount: "$75.00", status: "Completed", date: "Feb 17" },
];

const warmPalette = [
  { name: "Warm Salmon", hex: "#d4a088", label: "Page background", light: false },
  { name: "Cream White", hex: "#faf8f5", label: "Card surfaces", light: true },
  { name: "Warm Teal", hex: "#4a9d9a", label: "Positive metrics", light: false },
  { name: "Warm Amber", hex: "#e8b86d", label: "Highlights / warnings", light: true },
  { name: "Terracotta", hex: "#c17767", label: "Alerts / negative", light: false },
  { name: "Cool Teal", hex: "#6b8e8e", label: "Sidebar & neutral", light: false },
];

const progressItems = [
  { label: "Q1 Revenue Target", value: 82, color: "#4a9d9a" },
  { label: "User Acquisition", value: 61, color: "#e8b86d" },
  { label: "Churn Rate Reduction", value: 45, color: "#c17767" },
  { label: "NPS Improvement", value: 90, color: "#4a9d9a" },
  { label: "Feature Completion", value: 73, color: "#6b8e8e" },
];

const navLinks = [
  { id: "overview", label: "Overview", path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "analytics", label: "Analytics", path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "users", label: "Users", path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { id: "reports", label: "Reports", path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "settings", label: "Settings", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

/* ------------------------------------------------------------------ */
/*  Icon helper                                                        */
/* ------------------------------------------------------------------ */

function Icon({ path, className = "w-5 h-5" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Status badge                                                       */
/* ------------------------------------------------------------------ */

function WarmBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "text-[#4a9d9a] bg-[#4a9d9a]/10 border border-[#4a9d9a]/20",
    Processing: "text-[#b89334] bg-[#e8b86d]/15 border border-[#e8b86d]/30",
    Failed: "text-[#c17767] bg-[#c17767]/10 border border-[#c17767]/20",
    Active: "text-[#4a9d9a] bg-[#4a9d9a]/10 border border-[#4a9d9a]/20",
    Paused: "text-[#b89334] bg-[#e8b86d]/15 border border-[#e8b86d]/30",
    Error: "text-[#c17767] bg-[#c17767]/10 border border-[#c17767]/20",
    Draft: "text-[#6b8e8e] bg-[#6b8e8e]/10 border border-[#6b8e8e]/20",
  };
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${map[status] ?? "text-gray-500 bg-gray-100"}`}>
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated progress bar                                              */
/* ------------------------------------------------------------------ */

function WarmProgressBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="h-2.5 bg-[#e8ddd8] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: inView ? `${value}%` : "0%",
          backgroundColor: color,
          transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const [chartHovered, setChartHovered] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f2ede9" }}>

      {/* ============================================================ */}
      {/* 1. Fixed Nav                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-[#4a9d9a]">
                <span className="font-bold text-sm text-white">W</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-gray-800">Warm Dashboard</span>
            </div>
            <nav className="flex items-center gap-1">
              {["Colors", "Components", "Dashboard"].map((item) => (
                <a
                  key={item}
                  href={`#section-${item.toLowerCase()}`}
                  className="hidden md:block px-3 py-1.5 text-sm rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 transition-all duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-xl font-semibold text-[#4a9d9a] hover:bg-[#4a9d9a]/10 transition-all duration-200 ml-2"
              >
                StyleKit
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero — Two-column with glassmorphism sidebar              */}
      {/* ============================================================ */}
      <section className="pt-14 min-h-screen" style={{ backgroundColor: "#d4a088" }}>
        <div ref={heroRef} className="flex h-full min-h-[calc(100vh-56px)]">

          {/* Left: Glassmorphism sidebar */}
          <aside
            className="hidden md:flex flex-col w-60 shrink-0 bg-white/80 backdrop-blur-xl border-r border-white/40"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            {/* Brand */}
            <div className="px-5 py-6 border-b border-white/30">
              <div
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#4a9d9a]">
                    <span className="text-white font-bold text-sm">W</span>
                  </div>
                  <span className="font-bold text-sm text-gray-800">WarmDesk</span>
                </div>
                {/* Avatar placeholder */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#d4a088]/10">
                  <div className="w-8 h-8 rounded-xl bg-[#d4a088] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    AM
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">Amara Mills</p>
                    <p className="text-[10px] text-gray-500 truncate">admin@warmdesk.io</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {navLinks.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm text-left transition-all duration-200"
                  style={{
                    opacity: heroInView ? 1 : 0,
                    transform: heroInView ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.06}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.06}s, background-color 0.2s, color 0.2s`,
                    backgroundColor: activeNav === item.id ? "rgba(74,157,154,0.12)" : "transparent",
                    color: activeNav === item.id ? "#4a9d9a" : "#6b7280",
                    fontWeight: activeNav === item.id ? "600" : "400",
                  }}
                >
                  <Icon path={item.path} className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Bottom hint */}
            <div className="px-4 py-4 border-t border-white/30">
              <p className="text-[10px] text-gray-400">bg-white/80 backdrop-blur-xl</p>
              <p className="text-[10px] text-[#4a9d9a] font-semibold">Glassmorphism sidebar</p>
            </div>
          </aside>

          {/* Right: Main area */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full bg-white/20 text-white">
                Warm Data Visualization
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6 text-white">
                暖色仪表盘
                <span className="block text-[#faf8f5]/80 mt-1">Warm Dashboard.</span>
              </h1>
              <p className="max-w-sm text-sm leading-relaxed text-white/80 mb-10">
                温暖柔和的仪表盘设计风格。Terracotta and cream make numbers feel approachable — large rounded cards, clear metrics, and smooth interactions.
              </p>
            </div>

            {/* 3 stat cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kpis.slice(0, 3).map((kpi, i) => (
                <div
                  key={kpi.label}
                  className="group bg-[#faf8f5] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-transparent p-6 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-gray-100 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
                  style={{
                    opacity: heroInView ? 1 : 0,
                    transform: heroInView ? "translateY(0)" : "translateY(28px)",
                    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s, box-shadow 0.2s, border-color 0.2s`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors duration-200">
                      {kpi.label}
                    </span>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a9d9a] opacity-20 group-hover:opacity-40" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4a9d9a]" />
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-2 transform origin-left group-hover:scale-105 group-hover:text-[#4a9d9a] transition-all duration-200 ease-out">
                    {kpi.value}
                  </p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
                    <span className={`font-semibold ${kpi.up ? "text-[#e8b86d]" : "text-[#c17767]"}`}>
                      {kpi.sub.split(" ")[0]}
                    </span>
                    {" "}{kpi.sub.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Live Dashboard Demo — full coral background               */}
      {/* ============================================================ */}
      <section id="section-dashboard" className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: "#d4a088" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-white/70">
              Live Data Preview
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Live <span className="text-[#faf8f5]">Dashboard Demo</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="inline-block w-2 h-2 rounded-full bg-[#faf8f5] animate-pulse" />
                Real-time metrics
              </div>
            </div>
          </RevealBlock>

          {/* 3 KPI cards — social style */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {socialStats.map((stat, i) => (
              <RevealBlock key={stat.label} delay={i * 0.08}>
                <div
                  className="group bg-[#faf8f5] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-transparent p-6 md:p-8 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-gray-100 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
                  onClick={() => setActiveMetric(activeMetric === i ? null : i)}
                  style={{
                    outline: activeMetric === i ? "2px solid #4a9d9a" : "2px solid transparent",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors duration-200">
                      {stat.label}
                    </span>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a9d9a] opacity-20 group-hover:opacity-40" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4a9d9a]" />
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-gray-800 mb-2 transform origin-left group-hover:scale-105 group-hover:text-[#4a9d9a] transition-all duration-200 ease-out">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
                    <span className={`font-semibold ${stat.up ? "text-[#e8b86d]" : "text-[#c17767]"}`}>
                      {stat.delta}
                    </span>
                    {" "}from last month
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Large activity chart card */}
          <RevealBlock delay={0.15}>
            <div className="bg-[#faf8f5] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-6 md:p-8 mb-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Activity Overview</h3>
                  <p className="text-sm text-gray-500">Monthly engagement trends</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-[#e8b86d] text-white font-medium">Monthly</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-500 font-medium cursor-pointer hover:bg-gray-200 transition-colors">Weekly</span>
                </div>
              </div>
              {/* Bar chart with #e8b86d bars */}
              <div className="flex items-end gap-1.5 h-40">
                {barValues.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div
                      className="w-full rounded-t-lg cursor-pointer transition-all duration-200"
                      style={{
                        height: `${h}%`,
                        backgroundColor: chartHovered === i ? "#d4a088" : "#e8b86d",
                        opacity: chartHovered !== null && chartHovered !== i ? 0.5 : 1,
                      }}
                      onMouseEnter={() => setChartHovered(i)}
                      onMouseLeave={() => setChartHovered(null)}
                      title={`${barMonths[i]}: $${(h * 1000).toLocaleString()}`}
                    />
                    <span className="text-[9px] text-gray-400 hidden sm:block">{barMonths[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Channels strip */}
          <RevealBlock delay={0.22}>
            <div className="bg-[#faf8f5] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-sm">Top Channels</h3>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#4a9d9a] text-white rounded-xl text-xs font-medium shadow-[0_4px_12px_rgba(74,157,154,0.2)] hover:bg-[#3d8380] hover:shadow-[0_8px_20px_rgba(74,157,154,0.3)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(74,157,154,0.2)] transition-all duration-200 ease-out"
                >
                  Generate Report
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Direct", pct: 42, color: "#4a9d9a" },
                  { name: "Organic", pct: 28, color: "#e8b86d" },
                  { name: "Social", pct: 18, color: "#d4a088" },
                  { name: "Referral", pct: 12, color: "#6b8e8e" },
                ].map((ch) => (
                  <div key={ch.name} className="rounded-2xl p-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">{ch.name}</span>
                      <span className="text-xs font-bold" style={{ color: ch.color }}>{ch.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200">
                      <div className="h-full rounded-full" style={{ width: `${ch.pct}%`, backgroundColor: ch.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Component Demo — Tab switcher (button/card/input)         */}
      {/* ============================================================ */}
      <section id="section-components" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
            Interactive Components
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
              Component <span style={{ color: "#d4a088" }}>Library</span>
            </h2>
            <p className="text-sm max-w-sm" style={{ color: "#7a6860" }}>
              Buttons, metric cards, and inputs — all styled with warm tones and smooth interactions.
            </p>
          </div>
        </RevealBlock>

        {/* Tab switcher: button / card / input */}
        <RevealBlock className="mb-8" delay={0.05}>
          <div className="flex items-center gap-1 p-1 rounded-2xl w-fit" style={{ backgroundColor: "#e8ddd8" }}>
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize"
                style={{
                  backgroundColor: activeTab === tab ? "#faf8f5" : "transparent",
                  color: activeTab === tab ? "#3d2e28" : "#9c8880",
                  boxShadow: activeTab === tab ? "0 1px 6px rgba(90,70,60,0.12)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.08}>
          <div className="rounded-3xl p-8" style={{ backgroundColor: "#d4a088" }}>

            {/* Button tab */}
            {activeTab === "button" && (
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-white/70">
                    Primary Button (Teal)
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="px-6 py-3 bg-[#4a9d9a] text-white rounded-xl shadow-[0_4px_12px_rgba(74,157,154,0.2)] hover:bg-[#3d8380] hover:shadow-[0_8px_20px_rgba(74,157,154,0.3)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(74,157,154,0.2)] transition-all duration-200 ease-out font-medium"
                    >
                      Generate Report
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-[#4a9d9a] text-white rounded-xl shadow-[0_4px_12px_rgba(74,157,154,0.2)] hover:bg-[#3d8380] hover:shadow-[0_8px_20px_rgba(74,157,154,0.3)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out font-medium"
                    >
                      Sync Data
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-[#4a9d9a]/80 text-white rounded-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out font-medium opacity-60 cursor-not-allowed"
                      disabled
                    >
                      Disabled
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-white/70">
                    Terracotta Variants
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="px-6 py-3 bg-[#faf8f5] text-[#c17767] rounded-xl hover:bg-white hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                    >
                      Export Data
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 border-2 border-[#faf8f5]/60 text-white rounded-xl hover:bg-white/10 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out font-medium"
                    >
                      Learn More
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-[#c17767] text-white rounded-xl shadow-[0_4px_12px_rgba(193,119,103,0.3)] hover:bg-[#a8624e] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out font-medium"
                    >
                      Delete Entry
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-white/70">
                    Icon Buttons
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: "M12 4v16m8-8H4", label: "Add Record", color: "#4a9d9a" },
                      { icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4", label: "Download", color: "#6b8e8e" },
                      { icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", label: "Edit", color: "#e8b86d" },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        type="button"
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out"
                        style={{ backgroundColor: btn.color }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon} />
                        </svg>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Card tab */}
            {activeTab === "card" && (
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
                  KPI Card (Gold Standard Pattern)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group bg-[#faf8f5] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-transparent p-6 md:p-8 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-gray-100 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors duration-200">Total Revenue</span>
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a9d9a] opacity-20 group-hover:opacity-40" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4a9d9a]" />
                      </span>
                    </div>
                    <p className="text-4xl font-bold text-gray-800 mb-2 transform origin-left group-hover:scale-105 group-hover:text-[#4a9d9a] transition-all duration-200 ease-out">$142,300</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
                      <span className="text-[#e8b86d] font-semibold">+12%</span> from last month
                    </p>
                  </div>

                  <div className="group bg-[#faf8f5] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-transparent p-6 md:p-8 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-gray-100 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors duration-200">Active Users</span>
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8b86d] opacity-20 group-hover:opacity-40" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e8b86d]" />
                      </span>
                    </div>
                    <p className="text-4xl font-bold text-gray-800 mb-2 transform origin-left group-hover:scale-105 group-hover:text-[#4a9d9a] transition-all duration-200 ease-out">3,847</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
                      <span className="text-[#e8b86d] font-semibold">+8.1%</span> from last month
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-white/70">
                    Status Badges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Active", "Completed", "Processing", "Failed", "Paused", "Error", "Draft"].map((s) => (
                      <WarmBadge key={s} status={s} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input tab */}
            {activeTab === "input" && (
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
                  Form Controls
                </p>
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-white/80">Search Reports</label>
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search reports..."
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all duration-200 text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-white/80">Date Range</label>
                    <input
                      type="text"
                      placeholder="Jan 1 — Feb 28, 2025"
                      className="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all duration-200 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-white/80">Category</label>
                    <select className="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all duration-200 text-gray-800 appearance-none">
                      <option>Revenue</option>
                      <option>Users</option>
                      <option>Conversion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-white/80">Notes</label>
                    <textarea
                      placeholder="Add a note..."
                      rows={3}
                      className="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>
                {/* Toggles */}
                <div className="space-y-3 max-w-sm">
                  {[
                    { label: "Email Notifications", on: true },
                    { label: "Auto-refresh Data", on: true },
                    { label: "Dark Mode", on: false },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between py-3 border-b border-white/20">
                      <p className="text-sm font-medium text-white">{setting.label}</p>
                      <div
                        className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all duration-200 cursor-pointer"
                        style={{ backgroundColor: setting.on ? "#4a9d9a" : "rgba(255,255,255,0.25)" }}
                      >
                        <div
                          className="w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
                          style={{ transform: setting.on ? "translateX(20px)" : "translateX(0)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 5. Color Palette                                             */}
      {/* ============================================================ */}
      <section id="section-colors" className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: "#ede8e3" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
              Design Tokens
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
              Color <span style={{ color: "#d4a088" }}>Palette</span>
            </h2>
            <p className="mt-3 text-sm max-w-md" style={{ color: "#7a6860" }}>
              Six warm-toned colors with clear dashboard semantics — salmon background, cream cards, teal for positive, terracotta for alerts.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {warmPalette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div className="rounded-2xl bg-white shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-28 flex flex-col justify-end p-3" style={{ backgroundColor: color.hex }}>
                    <span
                      className="text-[10px] font-mono font-semibold"
                      style={{ color: color.light ? "rgba(61,46,40,0.7)" : "rgba(250,248,245,0.85)" }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-bold" style={{ color: "#3d2e28" }}>{color.name}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#9c8880" }}>{color.label}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Design Rules — Do / Don't                                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: "#d4a088" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-white/70">
              Design Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Do &amp; <span className="text-[#faf8f5]">Don&apos;t</span>
            </h2>
            <p className="mt-3 text-sm max-w-md text-white/70">
              Rules that keep the warm palette readable, professional, and data-friendly.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock>
              <div
                className="rounded-3xl p-8 h-full bg-[#faf8f5]"
                style={{ borderTop: "3px solid #4a9d9a", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-[#4a9d9a]">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "#3d2e28" }}>Do</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Use warm salmon #d4a088 as the page background",
                    "Cream cards bg-[#faf8f5] with soft warm shadows",
                    "rounded-2xl or rounded-3xl on all cards and containers",
                    "Large numeric displays with clear unit labels",
                    "Progress bars with warm accent fills (teal, amber, terracotta)",
                    "Teal #4a9d9a for positive metrics and success states",
                    "Terracotta #c17767 for alerts, errors, and negative deltas",
                    "animate-ping live indicator dots on live data cards",
                    "group-hover:scale-105 on KPI numbers for data pulse effect",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5 text-sm" style={{ color: "#5a4a44" }}>
                      <span className="font-bold mt-0.5 shrink-0 text-[#4a9d9a]">+</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div
                className="rounded-3xl p-8 h-full bg-[#faf8f5]"
                style={{ borderTop: "3px solid #c17767", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-[#c17767]">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "#3d2e28" }}>Don&apos;t</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "No cold blue-only palettes — breaks warm visual cohesion",
                    "No harsh dark backgrounds like #111827 on content areas",
                    "No angular sharp corners — keep the rounded warmth",
                    "No heavy decorative elements competing with numeric data",
                    "No neon or high-saturation colors in the palette",
                    "No pure black text — use #3d2e28 warm-dark instead",
                    "No shadow-none on cards — soft shadows ground layout",
                    "No hover:-translate-y-1 on cards — use -translate-y-0.5 only",
                    "No cold gray progress bars — use the warm #e8ddd8 track",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5 text-sm" style={{ color: "#5a4a44" }}>
                      <span className="font-bold mt-0.5 shrink-0 text-[#c17767]">-</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Interaction Physics Demo                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
            Animation System
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
            Interaction <span style={{ color: "#d4a088" }}>Physics Demo</span>
          </h2>
          <p className="mt-3 text-sm max-w-md" style={{ color: "#7a6860" }}>
            Four animation rules that define how every interactive element behaves in the warm dashboard.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Rule 1: Micro-Focus */}
          <RevealBlock delay={0.05}>
            <div className="rounded-3xl p-8" style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#4a9d9a]/10 text-[#4a9d9a]">Rule 1</span>
                <h3 className="font-bold text-sm" style={{ color: "#3d2e28" }}>Micro-Focus</h3>
              </div>
              <p className="text-xs mb-5" style={{ color: "#9c8880" }}>
                Cards lift only <code className="bg-gray-100 px-1 rounded">-translate-y-0.5</code>, never -1. Paired with enhanced shadow.
              </p>
              <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer">
                <p className="text-xs text-gray-500 mb-1">Hover this card</p>
                <p className="text-2xl font-bold" style={{ color: "#3d2e28" }}>$84,200</p>
                <p className="text-xs text-gray-400 mt-1">Very slight lift — professional feel</p>
              </div>
              <code className="block mt-3 text-[10px] bg-gray-50 rounded-xl p-3 text-gray-500">
                hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]
              </code>
            </div>
          </RevealBlock>

          {/* Rule 2: Tinted Diffusion */}
          <RevealBlock delay={0.1}>
            <div className="rounded-3xl p-8" style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#e8b86d]/15 text-[#b89334]">Rule 2</span>
                <h3 className="font-bold text-sm" style={{ color: "#3d2e28" }}>Tinted Diffusion</h3>
              </div>
              <p className="text-xs mb-5" style={{ color: "#9c8880" }}>
                Shadows are COLORED, not black. Teal for buttons, warm gray for cards.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-[#4a9d9a] text-white rounded-xl font-medium shadow-[0_4px_12px_rgba(74,157,154,0.2)] hover:shadow-[0_8px_20px_rgba(74,157,154,0.3)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out"
                >
                  Teal shadow
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-[#c17767] text-white rounded-xl font-medium shadow-[0_4px_12px_rgba(193,119,103,0.2)] hover:shadow-[0_8px_20px_rgba(193,119,103,0.3)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out"
                >
                  Coral shadow
                </button>
              </div>
              <code className="block mt-3 text-[10px] bg-gray-50 rounded-xl p-3 text-gray-500">
                shadow-[0_4px_12px_rgba(74,157,154,0.2)] hover:shadow-[0_8px_20px_rgba(74,157,154,0.3)]
              </code>
            </div>
          </RevealBlock>

          {/* Rule 3: Data Pulse */}
          <RevealBlock delay={0.15}>
            <div className="rounded-3xl p-8" style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#d4a088]/15 text-[#c17767]">Rule 3</span>
                <h3 className="font-bold text-sm" style={{ color: "#3d2e28" }}>Data Pulse</h3>
              </div>
              <p className="text-xs mb-5" style={{ color: "#9c8880" }}>
                KPI numbers scale and change color on hover. animate-ping dots for live data.
              </p>
              <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Views</span>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a9d9a] opacity-20 group-hover:opacity-50" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4a9d9a]" />
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-800 transform origin-left group-hover:scale-105 group-hover:text-[#4a9d9a] transition-all duration-200 ease-out">
                  27.6m
                </p>
              </div>
              <code className="block mt-3 text-[10px] bg-gray-50 rounded-xl p-3 text-gray-500">
                group-hover:scale-105 group-hover:text-[#4a9d9a] transition-all duration-200 ease-out
              </code>
            </div>
          </RevealBlock>

          {/* Rule 4: Warm Utility */}
          <RevealBlock delay={0.2}>
            <div className="rounded-3xl p-8" style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#6b8e8e]/10 text-[#6b8e8e]">Rule 4</span>
                <h3 className="font-bold text-sm" style={{ color: "#3d2e28" }}>Warm Utility</h3>
              </div>
              <p className="text-xs mb-5" style={{ color: "#9c8880" }}>
                ALL transitions use <code className="bg-gray-100 px-1 rounded">duration-200 ease-out</code>. Active states compress with scale-[0.98].
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-[#4a9d9a] text-white rounded-xl font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
                >
                  Click to feel
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-[#e8b86d] text-white rounded-xl font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
                >
                  Active state
                </button>
              </div>
              <code className="block mt-3 text-[10px] bg-gray-50 rounded-xl p-3 text-gray-500">
                transition-all duration-200 ease-out active:scale-[0.98] active:translate-y-0
              </code>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Progress & Status Section                                    */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: "#ede8e3" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
              Dashboard Elements
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
              Progress &amp; Status <span style={{ color: "#d4a088" }}>Components</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress bars */}
            <RevealBlock>
              <div className="rounded-3xl p-8" style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}>
                <h3 className="font-bold text-base mb-6" style={{ color: "#3d2e28" }}>Project Progress</h3>
                <div className="space-y-5">
                  {progressItems.map((item, i) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: "#3d2e28" }}>{item.label}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
                      </div>
                      <WarmProgressBar value={item.value} color={item.color} delay={i * 0.1} />
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Table */}
            <RevealBlock delay={0.08}>
              <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}>
                <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: "#e8ddd8" }}>
                  <h3 className="font-bold text-sm" style={{ color: "#3d2e28" }}>Recent Transactions</h3>
                  <button
                    type="button"
                    className="px-4 py-1.5 text-xs font-semibold text-white rounded-xl transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{ backgroundColor: "#d4a088" }}
                  >
                    Export
                  </button>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: "#f5ede8", borderBottom: "1px solid #e8ddd8" }}>
                      {["ID", "Customer", "Amount", "Status"].map((col) => (
                        <th key={col} className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider" style={{ color: "#9c8880" }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b last:border-0 transition-colors duration-150 cursor-pointer hover:bg-[#faf8f5]"
                        style={{ borderColor: "#f0e8e4" }}
                      >
                        <td className="px-4 py-3 font-medium" style={{ color: "#3d2e28" }}>{row.id}</td>
                        <td className="px-4 py-3" style={{ color: "#7a6860" }}>{row.customer}</td>
                        <td className="px-4 py-3 font-semibold" style={{ color: "#3d2e28" }}>{row.amount}</td>
                        <td className="px-4 py-3"><WarmBadge status={row.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Footer                                                    */}
      {/* ============================================================ */}
      <footer className="border-t" style={{ backgroundColor: "#faf8f5", borderColor: "#d4a088" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#4a9d9a]">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-bold text-base" style={{ color: "#3d2e28" }}>Warm Dashboard</span>
              </div>
              <p className="text-xs" style={{ color: "#9c8880" }}>
                Warm Dashboard &middot; Data Visualization &middot; StyleKit
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/styles/warm-dashboard"
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: "#d4a088" }}
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-sm transition-colors duration-200"
                style={{ color: "#9c8880" }}
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-sm font-semibold transition-colors duration-200 flex items-center gap-1"
                style={{ color: "#4a9d9a" }}
              >
                StyleKit
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex items-center gap-2 flex-wrap" style={{ borderColor: "#e8ddd8" }}>
            {["#d4a088", "#faf8f5", "#4a9d9a", "#e8b86d", "#c17767", "#6b8e8e"].map((hex) => (
              <div
                key={hex}
                className="w-6 h-6 rounded-full border-2 border-white/60 flex-shrink-0"
                style={{ backgroundColor: hex, boxShadow: "0 1px 4px rgba(90,70,60,0.15)" }}
                title={hex}
              />
            ))}
            <span className="ml-2 text-xs" style={{ color: "#b8a9a2" }}>
              Warm Dashboard color system — Professional, approachable, data-driven.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
