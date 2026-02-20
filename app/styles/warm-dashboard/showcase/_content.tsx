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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options },
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
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const kpis = [
  {
    label: "Total Revenue",
    value: "$84.2K",
    sub: "+12.4% from last month",
    up: true as boolean | null,
    icon: "revenue",
  },
  {
    label: "Active Users",
    value: "3,847",
    sub: "+8.1% from last month",
    up: true as boolean | null,
    icon: "users",
  },
  {
    label: "Conversion",
    value: "4.6%",
    sub: "-0.3% from last month",
    up: false as boolean | null,
    icon: "conversion",
  },
  {
    label: "Growth Index",
    value: "92.5",
    sub: "+5.7% from last month",
    up: true as boolean | null,
    icon: "growth",
  },
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

const navItems = [
  { id: "overview", label: "Overview", path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "analytics", label: "Analytics", path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "users", label: "Users", path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { id: "reports", label: "Reports", path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "settings", label: "Settings", path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

/* ------------------------------------------------------------------ */
/*  Icon helper (inline SVG, no external deps)                         */
/* ------------------------------------------------------------------ */

function Icon({ path, className = "w-5 h-5" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function KpiIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    revenue: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    conversion: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    growth: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  };
  return <Icon path={paths[type] ?? paths.revenue} className="w-5 h-5" />;
}

/* ------------------------------------------------------------------ */
/*  Warm status badge                                                  */
/* ------------------------------------------------------------------ */

function WarmBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "text-[#4a9d9a] bg-[#4a9d9a]/12 border border-[#4a9d9a]/20",
    Processing: "text-[#b89334] bg-[#e8b86d]/15 border border-[#e8b86d]/30",
    Failed: "text-[#c17767] bg-[#c17767]/10 border border-[#c17767]/20",
    Active: "text-[#4a9d9a] bg-[#4a9d9a]/12 border border-[#4a9d9a]/20",
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
/*  Live sidebar                                                       */
/* ------------------------------------------------------------------ */

function WarmSidebar({ activeNav, onNav }: { activeNav: string; onNav: (id: string) => void }) {
  return (
    <aside className="hidden md:flex w-60 flex-col shrink-0" style={{ backgroundColor: "#5a7a7a" }}>
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#d4a088" }}>
            <span className="text-white font-bold text-sm leading-none">W</span>
          </div>
          <span className="font-semibold text-white text-sm">WarmDesk</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNav(item.id)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm text-left transition-all duration-200"
            style={{
              backgroundColor: activeNav === item.id ? "rgba(212,160,136,0.25)" : "transparent",
              color: activeNav === item.id ? "#faf8f5" : "rgba(250,248,245,0.6)",
            }}
            onMouseEnter={(e) => {
              if (activeNav !== item.id) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(250,248,245,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "#faf8f5";
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.id) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(250,248,245,0.6)";
              }
            }}
          >
            {activeNav === item.id && (
              <span className="absolute left-0 w-1 h-6 rounded-r-full" style={{ backgroundColor: "#d4a088" }} />
            )}
            <Icon path={item.path} className="w-4.5 h-4.5 shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* User avatar */}
      <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: "#d4a088" }}
        >
          AM
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white/90 truncate">Amara Mills</p>
          <p className="text-[10px] text-white/45 truncate">admin@warmdesk.io</p>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Live toolbar                                                       */
/* ------------------------------------------------------------------ */

function WarmToolbar({ page }: { page: string }) {
  const labels: Record<string, string> = {
    overview: "Overview",
    analytics: "Analytics",
    users: "Users",
    reports: "Reports",
    settings: "Settings",
  };
  return (
    <div
      className="flex items-center justify-between px-5 py-3.5 border-b shrink-0"
      style={{ backgroundColor: "#faf8f5", borderColor: "#e8ddd8" }}
    >
      <h2 className="font-semibold text-sm" style={{ color: "#3d2e28" }}>
        {labels[page] ?? "Overview"}
      </h2>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "#9c8880" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 w-40 transition-all duration-150"
            style={{
              backgroundColor: "white",
              borderColor: "#e0d5cf",
              color: "#3d2e28",
            }}
          />
        </div>
        <button
          type="button"
          className="relative p-1.5 rounded-xl transition-all duration-150"
          style={{ color: "#9c8880" }}
        >
          <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c17767" }} />
        </button>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: "#d4a088" }}
        >
          AM
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Live content area                                                  */
/* ------------------------------------------------------------------ */

function WarmContent() {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 min-h-0" style={{ backgroundColor: "#f2ede9" }}>
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="group rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#faf8f5",
              boxShadow: "0 1px 4px rgba(90,70,60,0.08), 0 0 0 1px rgba(210,185,175,0.25)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#9c8880" }}>
                {kpi.label}
              </span>
              <span
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: kpi.up === true ? "rgba(74,157,154,0.12)" : "rgba(193,119,103,0.12)",
                  color: kpi.up === true ? "#4a9d9a" : "#c17767",
                }}
              >
                <KpiIcon type={kpi.icon} />
              </span>
            </div>
            <div className="text-xl font-bold mb-0.5" style={{ color: "#3d2e28" }}>
              {kpi.value}
            </div>
            <p className="text-[10px]" style={{ color: kpi.up === true ? "#4a9d9a" : "#c17767" }}>
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Bar chart */}
        <div
          className="col-span-2 rounded-2xl p-4"
          style={{
            backgroundColor: "#faf8f5",
            boxShadow: "0 1px 4px rgba(90,70,60,0.08), 0 0 0 1px rgba(210,185,175,0.25)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold" style={{ color: "#3d2e28" }}>
              Revenue Trend
            </span>
            <div className="flex gap-1">
              <span
                className="px-2 py-0.5 text-[10px] rounded-full text-white font-medium"
                style={{ backgroundColor: "#d4a088" }}
              >
                Monthly
              </span>
              <span
                className="px-2 py-0.5 text-[10px] rounded-full font-medium cursor-pointer transition-colors duration-150"
                style={{ backgroundColor: "#e8ddd8", color: "#9c8880" }}
              >
                Weekly
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-24">
            {barValues.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full rounded-t transition-colors duration-150 cursor-pointer"
                  style={{ height: `${h}%`, backgroundColor: "rgba(212,160,136,0.65)" }}
                  title={`$${(h * 1000).toLocaleString()}`}
                />
                <span className="text-[8px] hidden sm:block" style={{ color: "#b8a9a2" }}>
                  {barMonths[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div
          className="rounded-2xl p-4 flex flex-col"
          style={{
            backgroundColor: "#faf8f5",
            boxShadow: "0 1px 4px rgba(90,70,60,0.08), 0 0 0 1px rgba(210,185,175,0.25)",
          }}
        >
          <span className="text-xs font-semibold mb-2" style={{ color: "#3d2e28" }}>
            Distribution
          </span>
          <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <circle cx="50" cy="50" r="36" fill="none" stroke="#e8ddd8" strokeWidth="13" />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#4a9d9a"
                strokeWidth="13"
                strokeDasharray="113.1 226.2"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#e8b86d"
                strokeWidth="13"
                strokeDasharray="67.9 226.2"
                strokeDashoffset="-113.1"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#d4a088"
                strokeWidth="13"
                strokeDasharray="45.2 226.2"
                strokeDashoffset="-181"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="46" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3d2e28">
                68%
              </text>
              <text x="50" y="57" textAnchor="middle" fontSize="6.5" fill="#9c8880">
                Target
              </text>
            </svg>
          </div>
          <div className="space-y-1.5 mt-1">
            {[
              { label: "Direct", color: "#4a9d9a", pct: "50%" },
              { label: "Organic", color: "#e8b86d", pct: "30%" },
              { label: "Referral", color: "#d4a088", pct: "20%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span style={{ color: "#7a6860" }}>{item.label}</span>
                </div>
                <span className="font-semibold" style={{ color: "#3d2e28" }}>
                  {item.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#faf8f5",
          boxShadow: "0 1px 4px rgba(90,70,60,0.08), 0 0 0 1px rgba(210,185,175,0.25)",
        }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between border-b"
          style={{ borderColor: "#e8ddd8" }}
        >
          <span className="text-xs font-semibold" style={{ color: "#3d2e28" }}>
            Recent Transactions
          </span>
          <button
            type="button"
            className="px-3 py-1 text-[10px] font-semibold text-white rounded-xl transition-all duration-150 active:scale-[0.97]"
            style={{ backgroundColor: "#d4a088" }}
          >
            Export
          </button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: "#f5ede8", borderBottom: "1px solid #e8ddd8" }}>
              {["ID", "Customer", "Amount", "Status"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider"
                  style={{ color: "#9c8880" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors duration-150 cursor-pointer border-b last:border-0"
                style={{ borderColor: "#f0e8e4" }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: "#3d2e28" }}>
                  {row.id}
                </td>
                <td className="px-4 py-3" style={{ color: "#7a6860" }}>
                  {row.customer}
                </td>
                <td className="px-4 py-3 font-semibold" style={{ color: "#3d2e28" }}>
                  {row.amount}
                </td>
                <td className="px-4 py-3">
                  <WarmBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const [activeNav, setActiveNav] = useState("overview");
  const [componentTab, setComponentTab] = useState<"Overview" | "Analytics" | "Settings">("Overview");
  const [buttonHovered, setButtonHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen text-gray-800" style={{ backgroundColor: "#f2ede9" }}>
      {/* ============================================================ */}
      {/* 1. Fixed Nav                                                 */}
      {/* ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(212,160,136,0.95)", borderColor: "rgba(193,119,103,0.3)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#faf8f5" }}
              >
                <span className="font-bold text-sm" style={{ color: "#d4a088" }}>
                  W
                </span>
              </div>
              <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
                暖色仪表盘
              </span>
              <span className="font-bold text-white text-sm tracking-tight sm:hidden">
                Warm Dashboard
              </span>
            </div>
            <nav className="flex items-center gap-2">
              {["Colors", "Components", "Dashboard"].map((item) => (
                <a
                  key={item}
                  href={`#section-${item.toLowerCase()}`}
                  className="hidden md:block px-3 py-1.5 text-sm rounded-xl transition-all duration-150 font-medium"
                  style={{ color: "rgba(250,248,245,0.85)" }}
                >
                  {item}
                </a>
              ))}
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-xl font-semibold transition-all duration-150 ml-2"
                style={{ backgroundColor: "rgba(250,248,245,0.2)", color: "white" }}
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
      {/* 2. Hero — Dashboard header layout with KPI cards             */}
      {/* ============================================================ */}
      <section className="pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={heroRef}>
          {/* Label */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(74,157,154,0.15)", color: "#4a9d9a" }}
            >
              Warm Data Visualization
            </span>
          </div>

          {/* Title + sub */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              <span
                className="block"
                style={{
                  color: "#3d2e28",
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s",
                }}
              >
                暖色仪表盘
              </span>
              <span
                className="block"
                style={{
                  color: "#d4a088",
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s",
                }}
              >
                Warm Dashboard.
              </span>
            </h1>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{
                color: "#7a6860",
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              Data visualization with soul. Terracotta and cream make numbers feel approachable — large rounded cards, clear metrics, progress bars in warm tones.
            </p>
          </div>

          {/* KPI metric cards — hero dashboard header style */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            {kpis.map((kpi, i) => (
              <div
                key={kpi.label}
                className="group rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: "#faf8f5",
                  boxShadow: "0 4px 24px rgba(90,70,60,0.10), 0 0 0 1px rgba(210,185,175,0.3)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9c8880" }}>
                    {kpi.label}
                  </p>
                  <div
                    className="w-8 h-8 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: kpi.up === true ? "rgba(74,157,154,0.12)" : "rgba(193,119,103,0.12)",
                      color: kpi.up === true ? "#4a9d9a" : "#c17767",
                    }}
                  >
                    <KpiIcon type={kpi.icon} />
                  </div>
                </div>
                <div
                  className="text-3xl font-bold mb-1 transition-transform duration-200 group-hover:scale-[1.03] origin-left"
                  style={{ color: "#3d2e28" }}
                >
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    style={{ color: kpi.up === true ? "#4a9d9a" : "#c17767" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={kpi.up === true ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                    />
                  </svg>
                  <p className="text-xs font-medium" style={{ color: kpi.up === true ? "#4a9d9a" : "#c17767" }}>
                    {kpi.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Component demos with tab switcher                         */}
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

        {/* Tab switcher */}
        <RevealBlock className="mb-8" delay={0.05}>
          <div
            className="flex items-center gap-1 p-1 rounded-2xl w-fit"
            style={{ backgroundColor: "#e8ddd8" }}
          >
            {(["Overview", "Analytics", "Settings"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setComponentTab(tab)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: componentTab === tab ? "#faf8f5" : "transparent",
                  color: componentTab === tab ? "#3d2e28" : "#9c8880",
                  boxShadow: componentTab === tab ? "0 1px 6px rgba(90,70,60,0.12)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock>
          {/* Overview tab — Button showcase */}
          {componentTab === "Overview" && (
            <div
              className="rounded-3xl p-8 space-y-10"
              style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
            >
              {/* Terracotta primary buttons */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#9c8880" }}>
                  Terracotta Primary
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "View Dashboard", bg: "#c17767", shadow: "rgba(193,119,103,0.3)" },
                    { label: "Export Report", bg: "#d4a088", shadow: "rgba(212,160,136,0.35)" },
                    { label: "Delete Entry", bg: "#b85f50", shadow: "rgba(184,95,80,0.3)" },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      className="px-5 py-2.5 text-white rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
                      style={{
                        backgroundColor: btn.bg,
                        boxShadow: `0 4px 16px ${btn.shadow}`,
                        transform: buttonHovered === btn.label ? "translateY(-2px)" : "translateY(0)",
                      }}
                      onMouseEnter={() => setButtonHovered(btn.label)}
                      onMouseLeave={() => setButtonHovered(null)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teal secondary buttons */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#9c8880" }}>
                  Teal Secondary
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Confirm Action", bg: "#4a9d9a", shadow: "rgba(74,157,154,0.25)" },
                    { label: "Add Record", bg: "#6b8e8e", shadow: "rgba(107,142,142,0.25)" },
                    { label: "Sync Data", bg: "#3a7d7a", shadow: "rgba(58,125,122,0.25)" },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      className="px-5 py-2.5 text-white rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
                      style={{
                        backgroundColor: btn.bg,
                        boxShadow: `0 4px 16px ${btn.shadow}`,
                        transform: buttonHovered === btn.label ? "translateY(-2px)" : "translateY(0)",
                      }}
                      onMouseEnter={() => setButtonHovered(btn.label)}
                      onMouseLeave={() => setButtonHovered(null)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outlined buttons */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#9c8880" }}>
                  Outlined / Ghost
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.97] border-2"
                    style={{ borderColor: "#d4a088", color: "#c17767", backgroundColor: "transparent" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.97] border-2"
                    style={{ borderColor: "#4a9d9a", color: "#4a9d9a", backgroundColor: "transparent" }}
                  >
                    Learn More
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]"
                    style={{ backgroundColor: "rgba(212,160,136,0.12)", color: "#c17767" }}
                  >
                    Soft Terracotta
                  </button>
                </div>
              </div>

              {/* Metric card + progress demo */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#9c8880" }}>
                  Metric Card with Progress
                </p>
                <div
                  className="rounded-2xl p-5 max-w-sm"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 2px 12px rgba(90,70,60,0.08), 0 0 0 1px rgba(210,185,175,0.25)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9c8880" }}>
                        Q1 Revenue
                      </p>
                      <p className="text-2xl font-bold mt-1" style={{ color: "#3d2e28" }}>
                        $84.2K
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(212,160,136,0.15)" }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: "#d4a088" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "#9c8880" }}>Progress to target</span>
                      <span className="text-xs font-semibold" style={{ color: "#4a9d9a" }}>82%</span>
                    </div>
                    <WarmProgressBar value={82} color="#4a9d9a" />
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#4a9d9a" }}>+12.4% from last month</p>
                </div>
              </div>

              {/* Input */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#9c8880" }}>
                  Input Fields
                </p>
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#7a6860" }}>
                      Search Reports
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                        style={{ color: "#b8a9a2" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search reports..."
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl border focus:outline-none transition-all duration-150"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#e0d5cf",
                          color: "#3d2e28",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#7a6860" }}>
                      Date Range
                    </label>
                    <input
                      type="text"
                      placeholder="Jan 1 — Feb 28, 2025"
                      className="w-full px-4 py-2.5 text-sm rounded-2xl border focus:outline-none transition-all duration-150"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#e0d5cf",
                        color: "#3d2e28",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics tab */}
          {componentTab === "Analytics" && (
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
            >
              <h3 className="font-bold text-lg mb-6" style={{ color: "#3d2e28" }}>
                Analytics Overview
              </h3>
              {/* Bar chart */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold" style={{ color: "#3d2e28" }}>
                    Monthly Revenue
                  </p>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(212,160,136,0.15)", color: "#c17767" }}
                  >
                    FY 2025
                  </span>
                </div>
                <div className="flex items-end gap-2 h-44">
                  {barValues.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t cursor-pointer transition-all duration-150"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === barValues.indexOf(Math.max(...barValues)) ? "#d4a088" : "rgba(212,160,136,0.45)",
                        }}
                        title={`$${(h * 1000).toLocaleString()}`}
                      />
                      <span className="text-[10px]" style={{ color: "#b8a9a2" }}>
                        {barMonths[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Metric row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Avg. Session", value: "4m 32s", color: "#4a9d9a" },
                  { label: "Bounce Rate", value: "38.2%", color: "#c17767" },
                  { label: "Pages/Visit", value: "3.8", color: "#d4a088" },
                  { label: "New Visitors", value: "62.5%", color: "#6b8e8e" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl p-4 text-center"
                    style={{ backgroundColor: "white", border: "1px solid #e8ddd8" }}
                  >
                    <p className="text-xl font-bold mb-1" style={{ color: m.color }}>
                      {m.value}
                    </p>
                    <p className="text-xs" style={{ color: "#9c8880" }}>
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings tab */}
          {componentTab === "Settings" && (
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
            >
              <h3 className="font-bold text-lg mb-6" style={{ color: "#3d2e28" }}>
                Dashboard Settings
              </h3>
              <div className="space-y-5 max-w-lg">
                {[
                  { label: "Email Notifications", description: "Receive weekly performance reports", on: true },
                  { label: "Dark Mode", description: "Switch to a darker color scheme", on: false },
                  { label: "Auto-refresh Data", description: "Refresh dashboard every 5 minutes", on: true },
                  { label: "Show Projections", description: "Display trend lines and forecasts", on: false },
                ].map((setting) => (
                  <div
                    key={setting.label}
                    className="flex items-center justify-between py-4 border-b"
                    style={{ borderColor: "#e8ddd8" }}
                  >
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#3d2e28" }}>
                        {setting.label}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#9c8880" }}>
                        {setting.description}
                      </p>
                    </div>
                    <div
                      className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all duration-200 cursor-pointer shrink-0"
                      style={{ backgroundColor: setting.on ? "#4a9d9a" : "#e0d5cf" }}
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
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 4. Color palette                                             */}
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
                <div
                  className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
                  style={{ boxShadow: "0 2px 12px rgba(90,70,60,0.10)" }}
                >
                  <div
                    className="h-28 flex flex-col justify-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-[10px] font-mono font-semibold"
                      style={{ color: color.light ? "rgba(61,46,40,0.7)" : "rgba(250,248,245,0.75)" }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-3.5" style={{ backgroundColor: "#faf8f5" }}>
                    <p className="text-xs font-bold" style={{ color: "#3d2e28" }}>
                      {color.name}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#9c8880" }}>
                      {color.label}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Dashboard components — Progress bars, badges, chart       */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
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
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
            >
              <h3 className="font-bold text-base mb-6" style={{ color: "#3d2e28" }}>
                Project Progress
              </h3>
              <div className="space-y-5">
                {progressItems.map((item, i) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: "#3d2e28" }}>
                        {item.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                    <WarmProgressBar value={item.value} color={item.color} delay={i * 0.1} />
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Badges + mini chart */}
          <div className="space-y-6">
            {/* Badge states */}
            <RevealBlock>
              <div
                className="rounded-3xl p-6"
                style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
              >
                <h3 className="font-bold text-base mb-4" style={{ color: "#3d2e28" }}>
                  Status Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Active", "Completed", "Processing", "Failed", "Paused", "Error", "Draft"].map((s) => (
                    <WarmBadge key={s} status={s} />
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {tableRows.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between py-2.5 border-b last:border-0"
                      style={{ borderColor: "#f0e8e4" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-semibold" style={{ color: "#9c8880" }}>
                          {row.id}
                        </span>
                        <span className="text-sm" style={{ color: "#3d2e28" }}>
                          {row.customer}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold" style={{ color: "#3d2e28" }}>
                          {row.amount}
                        </span>
                        <WarmBadge status={row.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Donut chart placeholder */}
            <RevealBlock delay={0.1}>
              <div
                className="rounded-3xl p-6"
                style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
              >
                <h3 className="font-bold text-base mb-4" style={{ color: "#3d2e28" }}>
                  Revenue Distribution
                </h3>
                <div className="flex items-center gap-6">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 shrink-0">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#e8ddd8" strokeWidth="14" />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#d4a088"
                      strokeWidth="14"
                      strokeDasharray="119.4 238.8"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#4a9d9a"
                      strokeWidth="14"
                      strokeDasharray="71.6 238.8"
                      strokeDashoffset="-119.4"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#e8b86d"
                      strokeWidth="14"
                      strokeDasharray="47.8 238.8"
                      strokeDashoffset="-191"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="46" textAnchor="middle" fontSize="14" fontWeight="700" fill="#3d2e28">
                      68%
                    </text>
                    <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#9c8880">
                      Target
                    </text>
                  </svg>
                  <div className="flex-1 space-y-2.5">
                    {[
                      { label: "Direct Sales", color: "#d4a088", pct: "50%" },
                      { label: "Partnerships", color: "#4a9d9a", pct: "30%" },
                      { label: "Referrals", color: "#e8b86d", pct: "20%" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <span style={{ color: "#7a6860" }}>{item.label}</span>
                        </div>
                        <span className="font-bold" style={{ color: "#3d2e28" }}>{item.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Live Dashboard Demo                                       */}
      {/* ============================================================ */}
      <section id="section-dashboard" className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: "#ede8e3" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
              Interactive Preview
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
                Live <span style={{ color: "#d4a088" }}>Dashboard Demo</span>
              </h2>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#9c8880" }}>
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#4a9d9a" }}
                />
                Interactive — click sidebar items
              </div>
            </div>
          </RevealBlock>

          <RevealBlock>
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                height: 560,
                boxShadow: "0 8px 48px rgba(90,70,60,0.18)",
              }}
            >
              <div className="flex h-full">
                <WarmSidebar activeNav={activeNav} onNav={setActiveNav} />
                <div className="flex-1 flex flex-col min-w-0">
                  <WarmToolbar page={activeNav} />
                  <WarmContent />
                </div>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="mt-5 text-center text-xs md:hidden" style={{ color: "#9c8880" }}>
              Expand to desktop width to see the warm sidebar navigation.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Design principles — do / don't                           */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
            Design Principles
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
            Do &amp; <span style={{ color: "#d4a088" }}>Don&apos;t</span>
          </h2>
          <p className="mt-3 text-sm max-w-md" style={{ color: "#7a6860" }}>
            Rules that keep the warm palette readable, professional, and data-friendly.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
          <RevealBlock>
            <div
              className="rounded-3xl p-8 h-full"
              style={{
                backgroundColor: "#faf8f5",
                boxShadow: "0 4px 24px rgba(90,70,60,0.08)",
                borderTop: "3px solid #4a9d9a",
              }}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#4a9d9a" }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#3d2e28" }}>
                  Do
                </h3>
              </div>
              <ul className="space-y-3.5">
                {[
                  "Use warm salmon bg-[#d4a088] as the page background",
                  "Cream cards bg-[#faf8f5] with soft warm shadows",
                  "rounded-2xl or rounded-3xl on all cards and containers",
                  "Large numeric displays with clear unit labels below",
                  "Progress bars with warm accent fills (teal, amber, terracotta)",
                  "Teal #4a9d9a for positive metrics and success states",
                  "Terracotta #c17767 for alerts, errors, and negative deltas",
                  "Cool teal #6b8e8e sidebar for navigation — grounded, warm-neutral",
                  "shadow-sm to shadow-md soft warm shadows throughout",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm" style={{ color: "#5a4a44" }}>
                    <span className="font-bold mt-0.5 shrink-0" style={{ color: "#4a9d9a" }}>
                      +
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Don't */}
          <RevealBlock delay={0.1}>
            <div
              className="rounded-3xl p-8 h-full"
              style={{
                backgroundColor: "#faf8f5",
                boxShadow: "0 4px 24px rgba(90,70,60,0.08)",
                borderTop: "3px solid #c17767",
              }}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#c17767" }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg" style={{ color: "#3d2e28" }}>
                  Don&apos;t
                </h3>
              </div>
              <ul className="space-y-3.5">
                {[
                  "No cold blue-only palettes — breaks the warm visual cohesion",
                  "No harsh dark backgrounds like #111827 on content areas",
                  "No angular layouts — avoid sharp corners that feel clinical",
                  "No heavy decorative elements competing with numeric data",
                  "No neon or high-saturation colors anywhere in the palette",
                  "No pure black text — use #3d2e28 warm-dark instead",
                  "No shadow-none on cards — soft shadows ground the layout",
                  "No inconsistent radius tokens — pick rounded-2xl or 3xl and stick",
                  "No cold gray progress bars — use the warm #e8ddd8 track",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm" style={{ color: "#5a4a44" }}>
                    <span className="font-bold mt-0.5 shrink-0" style={{ color: "#c17767" }}>
                      -
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Typography tokens section                                    */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: "#ede8e3" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#d4a088" }}>
              Type System
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#3d2e28" }}>
              Typography <span style={{ color: "#d4a088" }}>Scale</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock>
              <div
                className="rounded-3xl p-8"
                style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: "#9c8880" }}>
                  Display Sizes
                </p>
                <div className="space-y-5">
                  {[
                    { size: "text-7xl", label: "Page Hero", sample: "84.2K" },
                    { size: "text-5xl", label: "KPI Value", sample: "3,847" },
                    { size: "text-3xl", label: "Card Title", sample: "Revenue" },
                    { size: "text-xl", label: "Section Head", sample: "Monthly Data" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-baseline gap-4">
                      <span className={`font-bold ${t.size}`} style={{ color: "#3d2e28" }}>
                        {t.sample}
                      </span>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#3d2e28" }}>{t.label}</p>
                        <code className="text-[10px]" style={{ color: "#d4a088" }}>{t.size} font-bold</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div
                className="rounded-3xl p-8"
                style={{ backgroundColor: "#faf8f5", boxShadow: "0 4px 24px rgba(90,70,60,0.08)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: "#9c8880" }}>
                  Functional Labels
                </p>
                <div className="space-y-4">
                  {[
                    { token: "text-sm font-semibold", color: "#3d2e28", label: "Table header / panel label", sample: "Total Revenue" },
                    { token: "text-sm", color: "#7a6860", label: "Body text", sample: "Data updated 2 mins ago" },
                    { token: "text-xs uppercase tracking-widest", color: "#9c8880", label: "Section label", sample: "DESIGN TOKENS" },
                    { token: "text-xs font-mono", color: "#d4a088", label: "Code / hex values", sample: "#d4a088" },
                    { token: "text-[10px]", color: "#b8a9a2", label: "Micro metadata", sample: "Jan · Feb · Mar" },
                  ].map((t) => (
                    <div key={t.label} className="py-2 border-b last:border-0" style={{ borderColor: "#f0e8e4" }}>
                      <p
                        className={t.token}
                        style={{ color: t.color }}
                      >
                        {t.sample}
                      </p>
                      <code className="text-[10px] mt-0.5 block" style={{ color: "#b8a9a2" }}>
                        {t.token}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Footer                                                    */}
      {/* ============================================================ */}
      <footer
        className="border-t"
        style={{ backgroundColor: "#faf8f5", borderColor: "#d4a088" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#d4a088" }}
                >
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-bold text-base" style={{ color: "#3d2e28" }}>
                  暖色仪表盘
                </span>
              </div>
              <p className="text-xs" style={{ color: "#9c8880" }}>
                StyleKit &middot; Warm Dashboard &middot; Data visualization with human-friendly warmth
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/styles/warm-dashboard"
                className="text-sm font-semibold transition-colors duration-150"
                style={{ color: "#d4a088" }}
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-sm transition-colors duration-150"
                style={{ color: "#9c8880" }}
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-sm font-semibold transition-colors duration-150 flex items-center gap-1"
                style={{ color: "#4a9d9a" }}
              >
                StyleKit
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Palette strip */}
          <div className="mt-8 pt-8 border-t flex items-center gap-2" style={{ borderColor: "#e8ddd8" }}>
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
