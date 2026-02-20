"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView() {
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
      { threshold: 0.12 },
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
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
    value: "$48.2K",
    sub: "vs $42.8K last month",
    change: "+12.5%",
    up: true as boolean | null,
    accent: "#6366f1",
  },
  {
    label: "Active Users",
    value: "2,420",
    sub: "vs 2,300 last month",
    change: "+5.2%",
    up: true as boolean | null,
    accent: "#10b981",
  },
  {
    label: "Orders",
    value: "1,210",
    sub: "vs 1,236 last month",
    change: "-2.1%",
    up: false as boolean | null,
    accent: "#ef4444",
  },
  {
    label: "Conversion",
    value: "3.6%",
    sub: "vs 3.3% last month",
    change: "+0.3%",
    up: null as boolean | null,
    accent: "#f59e0b",
  },
];

type NavItem = { id: string; label: string; icon: string };

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "users", label: "Users", icon: "users" },
  { id: "orders", label: "Orders", icon: "box" },
  { id: "settings", label: "Settings", icon: "gear" },
];

const tableRows = [
  { id: "#4521", customer: "Olivia Martin", amount: "$249.00", status: "Completed", date: "Feb 20" },
  { id: "#4520", customer: "James Wilson", amount: "$49.00", status: "Processing", date: "Feb 19" },
  { id: "#4519", customer: "Sofia Davis", amount: "$999.00", status: "Completed", date: "Feb 19" },
  { id: "#4518", customer: "Noah Brown", amount: "$249.00", status: "Failed", date: "Feb 18" },
  { id: "#4517", customer: "Emma Thompson", amount: "$49.00", status: "Completed", date: "Feb 17" },
];

const barValues = [35, 58, 42, 70, 48, 65, 80, 55, 72, 45, 60, 78];
const barMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const colorPalette = [
  { name: "Dark Sidebar", hex: "#111827", light: false },
  { name: "Content BG", hex: "#f9fafb", light: true },
  { name: "Indigo", hex: "#6366f1", light: false },
  { name: "Emerald", hex: "#10b981", light: false },
  { name: "Amber", hex: "#f59e0b", light: true },
  { name: "Red", hex: "#ef4444", light: false },
];

/* ------------------------------------------------------------------ */
/*  Icon helper                                                        */
/* ------------------------------------------------------------------ */

function NavIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
    chart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
    users: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    ),
    box: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    ),
    gear: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    bell: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    ),
  };
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {paths[type] ?? paths.home}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Status badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "text-[#10b981] bg-[#10b981]/10",
    Processing: "text-[#f59e0b] bg-[#f59e0b]/10",
    Failed: "text-[#ef4444] bg-[#ef4444]/10",
  };
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Live dashboard sidebar                                             */
/* ------------------------------------------------------------------ */

function LiveSidebar({
  activeNav,
  onNav,
  label = "Analytics",
}: {
  activeNav: string;
  onNav: (id: string) => void;
  label?: string;
}) {
  return (
    <aside className="hidden md:flex w-56 bg-[#111827] text-white flex-col shrink-0 select-none">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#6366f1] rounded" />
          <span className="font-semibold text-sm">{label}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNav(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-150 ease-out ${
              activeNav === item.id
                ? "bg-white/10 text-white font-medium"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <NavIcon type={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#6366f1] flex items-center justify-center text-xs font-bold shrink-0">
          A
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">Admin User</p>
          <p className="text-[10px] text-gray-500 truncate">admin@acme.io</p>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Live dashboard toolbar                                             */
/* ------------------------------------------------------------------ */

function LiveToolbar({ page }: { page: string }) {
  const labels: Record<string, string> = {
    overview: "Overview",
    analytics: "Analytics",
    users: "Users",
    orders: "Orders",
    settings: "Settings",
  };
  return (
    <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between shrink-0">
      <h2 className="font-semibold text-sm text-[#111827]">{labels[page] ?? "Overview"}</h2>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
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
            className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 w-40 transition-all duration-150"
          />
        </div>
        <button
          type="button"
          className="relative p-1.5 text-gray-500 hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-all duration-150"
        >
          <NavIcon type="bell" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ef4444] rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-[#6366f1] flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Live dashboard content area                                        */
/* ------------------------------------------------------------------ */

function LiveContent({ page }: { page: string }) {
  return (
    <div className="flex-1 overflow-auto bg-[#f9fafb] p-4 space-y-4 min-h-0">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="group bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:bg-gray-50 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-700 transition-colors duration-150">
                {kpi.label}
              </span>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-colors duration-150 ${
                  kpi.up === true
                    ? "text-[#10b981] bg-[#10b981]/10 group-hover:bg-[#10b981]/20"
                    : kpi.up === false
                    ? "text-[#ef4444] bg-[#ef4444]/10 group-hover:bg-[#ef4444]/20"
                    : "text-[#f59e0b] bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20"
                }`}
              >
                {kpi.change}
              </span>
            </div>
            <div className="text-xl font-bold text-[#111827] group-hover:text-[#4f46e5] group-hover:scale-[1.02] origin-left transition-all duration-150">
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Bar chart */}
        <div className="col-span-2 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#111827]">Revenue Trend</span>
            <div className="flex gap-1">
              <span className="px-2 py-0.5 bg-[#6366f1] text-white text-[10px] rounded-full">Monthly</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full cursor-pointer hover:bg-gray-200 transition-colors duration-150">
                Weekly
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-24">
            {barValues.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full rounded-t bg-[#6366f1]/75 hover:bg-[#6366f1] transition-colors duration-150 cursor-pointer"
                  style={{ height: `${h}%` }}
                  title={`$${(h * 600).toLocaleString()}`}
                />
                <span className="text-[8px] text-gray-400 hidden sm:block">{barMonths[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-[#111827] mb-2">Distribution</span>
          <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#e5e7eb" strokeWidth="14" />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#6366f1"
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
                stroke="#10b981"
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
                stroke="#f59e0b"
                strokeWidth="14"
                strokeDasharray="47.8 238.8"
                strokeDashoffset="-191"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="46" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">
                73%
              </text>
              <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#9ca3af">
                Growth
              </text>
            </svg>
          </div>
          <div className="space-y-1.5 mt-2">
            {[
              { label: "Direct", color: "#6366f1", pct: "50%" },
              { label: "Organic", color: "#10b981", pct: "30%" },
              { label: "Referral", color: "#f59e0b", pct: "20%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.label}</span>
                </div>
                <span className="font-semibold text-[#111827]">{item.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#111827]">Recent Orders</span>
          <button
            type="button"
            className="px-3 py-1 bg-[#6366f1] text-white rounded-lg text-[10px] font-medium hover:bg-[#4f46e5] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-1 transition-all duration-150 ease-out"
          >
            Export
          </button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/70">
              <th className="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium text-[#111827]">{row.id}</td>
                <td className="px-4 py-3 text-gray-600">{row.customer}</td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{row.date}</td>
                <td className="px-4 py-3 font-semibold text-[#111827]">{row.amount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
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
/*  Annotated layout diagram                                           */
/* ------------------------------------------------------------------ */

function AnnotatedDiagram() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
        <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
        <span className="w-3 h-3 rounded-full bg-[#10b981]" />
        <span className="ml-3 text-xs text-gray-400 font-mono">dashboard.app</span>
      </div>

      {/* Layout body */}
      <div className="flex" style={{ height: 340 }}>
        {/* Sidebar zone */}
        <div className="w-36 bg-[#111827] flex flex-col relative shrink-0">
          {/* Brand */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
            <div className="w-5 h-5 bg-[#6366f1] rounded" />
            <div className="w-12 h-2 bg-white/20 rounded" />
          </div>
          {/* Nav items */}
          <div className="px-2 py-2 space-y-1 flex-1">
            {[true, false, false, false, false].map((active, i) => (
              <div
                key={i}
                className={`h-7 rounded-lg flex items-center gap-2 px-2 ${active ? "bg-white/10" : ""}`}
              >
                <div className={`w-3.5 h-3.5 rounded ${active ? "bg-white/60" : "bg-white/20"}`} />
                <div className={`h-1.5 rounded flex-1 ${active ? "bg-white/40" : "bg-white/15"}`} />
              </div>
            ))}
          </div>
          {/* Label */}
          <div className="absolute -right-px top-1/2 -translate-y-1/2 translate-x-full z-10 pl-3">
            <div className="flex items-center gap-1.5">
              <div className="w-10 h-px bg-[#6366f1]" />
              <span className="text-[10px] font-semibold text-[#6366f1] whitespace-nowrap bg-white px-1.5 py-0.5 rounded border border-[#6366f1]/20">
                Sidebar w-56
              </span>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex-1 flex flex-col bg-[#f9fafb] min-w-0">
          {/* Toolbar zone */}
          <div className="h-11 bg-white border-b border-gray-100 flex items-center justify-between px-4 relative shrink-0">
            <div className="w-20 h-2.5 bg-gray-200 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-24 h-6 bg-gray-100 rounded-lg" />
              <div className="w-6 h-6 bg-[#6366f1] rounded-full" />
            </div>
            {/* Label */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-full pb-1.5">
              <span className="text-[10px] font-semibold text-[#111827] bg-white border border-gray-200 px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                Toolbar h-14
              </span>
            </div>
          </div>

          {/* Content zone */}
          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            {/* KPI cards label */}
            <div className="relative">
              <div className="grid grid-cols-4 gap-2">
                {kpis.map((kpi, i) => (
                  <div key={i} className="h-12 bg-white rounded-lg border border-gray-100 flex flex-col justify-center px-2.5">
                    <div className="w-8 h-1.5 bg-gray-200 rounded mb-1" />
                    <div className="w-12 h-2.5 bg-[#111827] rounded" />
                  </div>
                ))}
              </div>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full pl-2">
                <span className="text-[10px] font-semibold text-[#10b981] bg-white border border-[#10b981]/20 px-1.5 py-0.5 rounded whitespace-nowrap shadow-sm">
                  KPI Cards grid-cols-4
                </span>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-3 gap-2 relative">
              <div className="col-span-2 h-28 bg-white rounded-lg border border-gray-100 flex flex-col p-2">
                <div className="w-16 h-1.5 bg-gray-200 rounded mb-2" />
                <div className="flex items-end gap-0.5 flex-1">
                  {[35, 58, 42, 70, 48, 65, 80, 55, 72, 45, 60, 78].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#6366f1]/60 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="h-28 bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                <svg viewBox="0 0 60 60" className="w-16 h-16">
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="30"
                    cy="30"
                    r="22"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="8"
                    strokeDasharray="69 138"
                    transform="rotate(-90 30 30)"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="22"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="41 138"
                    strokeDashoffset="-69"
                    transform="rotate(-90 30 30)"
                  />
                </svg>
              </div>
              {/* Label */}
              <div className="absolute -bottom-px left-0 right-0 translate-y-full pt-1.5 flex justify-center">
                <span className="text-[10px] font-semibold text-[#6366f1] bg-white border border-[#6366f1]/20 px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                  Charts: col-span-2 + col-span-1
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="h-12 bg-white rounded-lg border border-gray-100 flex items-center px-3 gap-3 mt-4">
              {["Order", "Customer", "Amount", "Status"].map((col) => (
                <div key={col} className="flex-1 h-1.5 bg-gray-200 rounded" />
              ))}
              <span className="text-[9px] font-semibold text-[#111827] bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                Data Table
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Responsive panel                                                   */
/* ------------------------------------------------------------------ */

type ResponsiveTab = "Desktop" | "Tablet" | "Mobile";

function ResponsivePanel({ mode }: { mode: ResponsiveTab }) {
  if (mode === "Desktop") {
    return (
      <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm" style={{ height: 260 }}>
        <div className="w-36 bg-[#111827] shrink-0 flex flex-col">
          <div className="px-3 py-3 border-b border-white/10">
            <div className="w-16 h-2 bg-white/30 rounded" />
          </div>
          <div className="flex-1 px-2 py-2 space-y-1">
            {[true, false, false, false, false].map((a, i) => (
              <div key={i} className={`h-6 rounded px-2 flex items-center gap-1.5 ${a ? "bg-white/10" : ""}`}>
                <div className={`w-3 h-3 rounded ${a ? "bg-white/50" : "bg-white/20"}`} />
                <div className={`h-1.5 rounded flex-1 ${a ? "bg-white/30" : "bg-white/10"}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-[#f9fafb] flex flex-col p-2 gap-2">
          <div className="h-7 bg-white rounded border border-gray-100" />
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-white rounded border border-gray-100" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5 flex-1">
            <div className="col-span-2 bg-white rounded border border-gray-100" />
            <div className="bg-white rounded border border-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (mode === "Tablet") {
    return (
      <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm" style={{ height: 260 }}>
        {/* Collapsed icon sidebar */}
        <div className="w-12 bg-[#111827] shrink-0 flex flex-col items-center py-3 gap-3">
          <div className="w-6 h-6 bg-[#6366f1] rounded" />
          {[true, false, false, false, false].map((a, i) => (
            <div key={i} className={`w-7 h-7 rounded flex items-center justify-center ${a ? "bg-white/10" : ""}`}>
              <div className={`w-3.5 h-3.5 rounded ${a ? "bg-white/60" : "bg-white/25"}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 bg-[#f9fafb] flex flex-col p-2 gap-2">
          <div className="h-7 bg-white rounded border border-gray-100" />
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-white rounded border border-gray-100" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5 flex-1">
            <div className="bg-white rounded border border-gray-100" />
            <div className="bg-white rounded border border-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm" style={{ height: 260 }}>
      {/* Top mobile nav */}
      <div className="h-9 bg-[#111827] flex items-center justify-between px-3 shrink-0">
        <div className="w-4 h-4 bg-white/30 rounded" />
        <div className="w-16 h-2 bg-white/30 rounded" />
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-white/25 rounded" />
          <div className="w-4 h-4 bg-white/25 rounded" />
        </div>
      </div>
      <div className="flex-1 bg-[#f9fafb] p-2 space-y-2">
        <div className="grid grid-cols-1 gap-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="h-10 bg-white rounded border border-gray-100" />
          ))}
        </div>
        <div className="h-24 bg-white rounded border border-gray-100" />
        <div className="h-16 bg-white rounded border border-gray-100" />
      </div>
      {/* Bottom tab bar */}
      <div className="h-10 bg-white border-t border-gray-100 flex items-center justify-around px-2 shrink-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-5 h-5 rounded ${i === 0 ? "bg-[#6366f1]" : "bg-gray-200"}`} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spec card                                                          */
/* ------------------------------------------------------------------ */

function SpecCard({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h4 className="text-sm font-semibold text-[#111827] mb-4">{title}</h4>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{item.label}</span>
            <code className="text-xs font-mono bg-gray-100 text-[#6366f1] px-2 py-0.5 rounded">{item.value}</code>
          </div>
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
  const [activeNav, setActiveNav] = useState("overview");
  const [responsiveTab, setResponsiveTab] = useState<ResponsiveTab>("Desktop");
  const [componentTab, setComponentTab] = useState<"KPI Cards" | "Buttons" | "Table" | "Charts">("KPI Cards");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      {/* ================================================================ */}
      {/* 1. Fixed Top Nav                                                 */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <span className="font-bold text-base text-[#111827] tracking-tight">Dashboard Layout</span>
            <nav className="flex items-center gap-6">
              <Link
                href="/styles"
                className="text-sm text-gray-500 hover:text-[#111827] transition-colors duration-150 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                StyleKit
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero Section — annotated layout diagram                       */}
      {/* ================================================================ */}
      <section className="pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Title block */}
        <div className="mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#6366f1] mb-5"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Data-First Layout System
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s",
                }}
              >
                仪表盘布局
              </span>
              <span
                className="block text-[#6366f1]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s",
                }}
              >
                Dashboard.
              </span>
            </h1>

            <p
              className="max-w-xs text-sm text-gray-500 leading-relaxed"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              Fixed dark sidebar. Persistent toolbar. KPI cards, chart panels, and data tables — all in one crisp SaaS shell.
            </p>
          </div>
        </div>

        {/* Annotated diagram */}
        <RevealBlock>
          <AnnotatedDiagram />
        </RevealBlock>

        {/* Zone legend */}
        <RevealBlock delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: "Sidebar", color: "#111827", text: "#fff" },
              { label: "Toolbar", color: "#ffffff", text: "#111827", border: true },
              { label: "KPI Cards", color: "#10b981", text: "#fff" },
              { label: "Charts", color: "#6366f1", text: "#fff" },
              { label: "Data Table", color: "#f59e0b", text: "#111827" },
            ].map((zone) => (
              <div key={zone.label} className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded ${zone.border ? "border border-gray-300" : ""}`}
                  style={{ backgroundColor: zone.color }}
                />
                <span className="text-xs text-gray-600">{zone.label}</span>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 3. Live Dashboard Demo                                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Live <span className="text-[#6366f1]">Dashboard Demo</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-md">
                Click sidebar items to navigate. All interactions use{" "}
                <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono text-[#6366f1]">duration-150 ease-out</code>{" "}
                for the crisp SaaS feel.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              Interactive
            </div>
          </div>
        </RevealBlock>

        <RevealBlock>
          <div
            className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white"
            style={{ height: 560 }}
          >
            <div className="flex h-full">
              <LiveSidebar activeNav={activeNav} onNav={setActiveNav} label="Acme" />
              <div className="flex-1 flex flex-col min-w-0">
                <LiveToolbar page={activeNav} />
                <LiveContent page={activeNav} />
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* Nav hint (mobile fallback) */}
        <RevealBlock delay={0.1}>
          <p className="mt-4 text-center text-xs text-gray-400 md:hidden">
            The sidebar is hidden on small screens — expand to desktop width to see the full layout.
          </p>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 4. Layout Specifications                                         */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Layout <span className="text-[#10b981]">Specifications</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            Sidebar widths, content grid breakpoints, and spacing tokens used throughout this system.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <RevealBlock delay={0}>
            <SpecCard
              title="Sidebar Widths"
              items={[
                { label: "Compact", value: "w-16 (64px)" },
                { label: "Standard", value: "w-56 (224px)" },
                { label: "Wide", value: "w-64 (256px)" },
                { label: "Collapsed (tablet)", value: "w-12 (48px)" },
                { label: "Hidden (mobile)", value: "hidden md:flex" },
              ]}
            />
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <SpecCard
              title="KPI Grid Patterns"
              items={[
                { label: "4-col (desktop)", value: "grid-cols-4" },
                { label: "2-col (tablet)", value: "grid-cols-2" },
                { label: "1-col (mobile)", value: "grid-cols-1" },
                { label: "Gap", value: "gap-4 (16px)" },
                { label: "Padding", value: "p-6 (24px)" },
              ]}
            />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <SpecCard
              title="Chart Grid"
              items={[
                { label: "Main chart", value: "col-span-2" },
                { label: "Side chart", value: "col-span-1" },
                { label: "Container", value: "grid-cols-3" },
                { label: "Gap", value: "gap-4 (16px)" },
                { label: "Stack (mobile)", value: "grid-cols-1" },
              ]}
            />
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <SpecCard
              title="Toolbar"
              items={[
                { label: "Height", value: "h-14 (56px)" },
                { label: "Background", value: "bg-white" },
                { label: "Border", value: "border-b border-gray-200" },
                { label: "Padding", value: "px-6 py-3" },
                { label: "Sticky", value: "sticky top-0 z-10" },
              ]}
            />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <SpecCard
              title="Micro-Interaction Tokens"
              items={[
                { label: "All transitions", value: "duration-150 ease-out" },
                { label: "KPI hover lift", value: "-translate-y-0.5" },
                { label: "Button press", value: "active:scale-[0.97]" },
                { label: "Row hover", value: "hover:bg-gray-50" },
                { label: "Focus ring", value: "ring-2 ring-[#6366f1]/30" },
              ]}
            />
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <SpecCard
              title="Typography Scale"
              items={[
                { label: "KPI value", value: "text-3xl font-bold" },
                { label: "Panel header", value: "text-sm font-semibold" },
                { label: "Table header", value: "text-xs uppercase tracking" },
                { label: "Body text", value: "text-sm text-gray-600" },
                { label: "Metadata", value: "text-xs text-gray-400" },
              ]}
            />
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. Component Patterns                                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Component <span className="text-[#6366f1]">Patterns</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            Dashboard building blocks. All components share the same token set and interaction physics.
          </p>
        </RevealBlock>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 mb-10 w-fit border border-gray-200 shadow-sm">
          {(["KPI Cards", "Buttons", "Table", "Charts"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setComponentTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out ${
                componentTab === tab
                  ? "bg-[#6366f1] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#111827] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <RevealBlock>
          {/* KPI Cards */}
          {componentTab === "KPI Cards" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-150">
                      {kpi.label}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-150 ${
                        kpi.up === true
                          ? "text-[#10b981] bg-[#10b981]/10 group-hover:bg-[#10b981]/20"
                          : kpi.up === false
                          ? "text-[#ef4444] bg-[#ef4444]/10 group-hover:bg-[#ef4444]/20"
                          : "text-[#f59e0b] bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-[#111827] origin-left group-hover:text-[#4f46e5] group-hover:scale-[1.02] transition-all duration-150">
                    {kpi.value}
                  </div>
                  <p className="mt-1 text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-150">
                    {kpi.sub}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          {componentTab === "Buttons" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Primary Actions</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#6366f1] text-white rounded-lg font-medium text-sm hover:bg-[#4f46e5] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-1 transition-all duration-150 ease-out"
                  >
                    Export Data
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#10b981] text-white rounded-lg font-medium text-sm hover:bg-[#059669] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:ring-offset-1 transition-all duration-150 ease-out"
                  >
                    Add Record
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#ef4444] text-white rounded-lg font-medium text-sm hover:bg-[#dc2626] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30 focus:ring-offset-1 transition-all duration-150 ease-out"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg font-medium text-sm hover:bg-[#d97706] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 focus:ring-offset-1 transition-all duration-150 ease-out"
                  >
                    Archive
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Secondary Actions</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-white text-[#111827] border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white text-[#6366f1] border border-[#6366f1]/30 rounded-lg font-medium text-sm hover:bg-[#6366f1]/5 active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    View Report
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-100 active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Size Variants</p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="px-2.5 py-1 bg-[#6366f1] text-white rounded text-xs font-medium hover:bg-[#4f46e5] active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    xs
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-[#6366f1] text-white rounded-md text-sm font-medium hover:bg-[#4f46e5] active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    sm
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#6366f1] text-white rounded-lg text-sm font-medium hover:bg-[#4f46e5] active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    md
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 bg-[#6366f1] text-white rounded-xl text-base font-medium hover:bg-[#4f46e5] active:scale-[0.97] transition-all duration-150 ease-out"
                  >
                    lg
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          {componentTab === "Table" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-[#111827]">Recent Orders</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <svg
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 w-48 transition-all duration-150"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-4 py-1.5 bg-[#6366f1] text-white rounded-lg font-medium text-sm hover:bg-[#4f46e5] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-1 transition-all duration-150 ease-out"
                  >
                    Export
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-[#111827]">{row.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">{row.date}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">{row.amount}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Charts */}
          {componentTab === "Charts" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Bar chart */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#111827]">Revenue Trend</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#6366f1] text-white text-xs rounded-full font-medium">Monthly</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-150">
                      Weekly
                    </span>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-44">
                  {barValues.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-[#6366f1]/75 hover:bg-[#6366f1] transition-colors duration-150 cursor-pointer"
                        style={{ height: `${h}%` }}
                        title={`$${(h * 600).toLocaleString()}`}
                      />
                      <span className="text-[10px] text-gray-400">{barMonths[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donut */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-[#111827] mb-6">Distribution</h3>
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-40 h-40">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="12"
                      strokeDasharray="125.7 251.3"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray="75.4 251.3"
                      strokeDashoffset="-125.7"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="12"
                      strokeDasharray="50.3 251.3"
                      strokeDashoffset="-201.1"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">
                      73%
                    </text>
                    <text x="50" y="59" textAnchor="middle" fontSize="7" fill="#9ca3af">
                      Growth
                    </text>
                  </svg>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "Direct", color: "#6366f1", pct: "50%" },
                    { label: "Organic", color: "#10b981", pct: "30%" },
                    { label: "Referral", color: "#f59e0b", pct: "20%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.label}</span>
                      </div>
                      <span className="font-semibold text-[#111827]">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 6. Responsive Behavior                                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Responsive <span className="text-[#f59e0b]">Behavior</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            The dashboard layout adapts at three breakpoints. Sidebar collapses to icons on tablet, hides on mobile.
          </p>
        </RevealBlock>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 mb-8 w-fit border border-gray-200 shadow-sm">
          {(["Desktop", "Tablet", "Mobile"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setResponsiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out ${
                responsiveTab === tab
                  ? "bg-[#f59e0b] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#111827] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <RevealBlock>
          <ResponsivePanel mode={responsiveTab} />
        </RevealBlock>

        {/* Breakpoint table */}
        <RevealBlock delay={0.1}>
          <div className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Breakpoint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sidebar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    KPI Grid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Chart Grid
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    bp: "Desktop (lg+)",
                    breakpoint: "≥1024px",
                    sidebar: "w-56 full labels",
                    kpi: "grid-cols-4",
                    charts: "2/3 + 1/3",
                  },
                  {
                    bp: "Tablet (md)",
                    breakpoint: "768–1023px",
                    sidebar: "w-12 icons only",
                    kpi: "grid-cols-2",
                    charts: "grid-cols-2",
                  },
                  {
                    bp: "Mobile (sm)",
                    breakpoint: "<768px",
                    sidebar: "hidden + bottom bar",
                    kpi: "grid-cols-1",
                    charts: "grid-cols-1",
                  },
                ].map((row) => (
                  <tr key={row.bp} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#111827]">{row.bp}</span>
                      <span className="ml-2 text-xs text-gray-400">{row.breakpoint}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.sidebar}</td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono text-[#6366f1]">
                        {row.kpi}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{row.charts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* Color palette                                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Color <span className="text-[#6366f1]">Palette</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md">
            A functional five-token palette. Semantic colors encode data states across every panel.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalette.map((color, i) => (
            <RevealBlock key={color.name} delay={i * 0.05}>
              <div className="group rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer">
                <div
                  className="h-24 flex items-end p-3"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: color.light ? "#111827" : "#ffffff", opacity: 0.75 }}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#111827]">{color.name}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* Design rules                                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Design Rules</h2>
          <p className="text-gray-500 text-sm max-w-md">
            These principles keep the dashboard readable and the data trustworthy at a glance.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealBlock>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Dark sidebar navigation: bg-[#111827] w-56",
                  "Toolbar with search, notifications, user avatar",
                  "4-column KPI grid with large numeric values",
                  "Color-coded change badges: green up, red down, amber flat",
                  "2/3 + 1/3 chart layout for visual weight balance",
                  "Crisp micro-interactions: duration-150 ease-out",
                  "group-hover scale on KPI numbers for focus hint",
                  "hover:bg-gray-50 on every interactive row or card",
                  "active:scale-[0.97] + visible focus ring on buttons",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[#10b981] mt-0.5 shrink-0 font-semibold">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ef4444] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                Don&apos;t
              </h3>
              <ul className="space-y-3">
                {[
                  "Sidebar wider than 280px — steals too much content space",
                  "Inconsistent panel gaps — use a single gap-4 token",
                  "All panels the exact same size — vary for visual hierarchy",
                  "Decorative elements that compete with numeric data",
                  "Slow transitions (duration-300+) — feels sluggish in a dashboard",
                  "Skip loading and empty states — data isn't always ready",
                  "Use >4 accent colors in one view — status semantics blur",
                  "Hide the toolbar on scroll — users need persistent context",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[#ef4444] mt-0.5 shrink-0 font-semibold">-</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. Footer                                                        */}
      {/* ================================================================ */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm font-semibold text-[#111827] mb-1">Dashboard Layout</p>
              <p className="text-xs text-gray-400">
                StyleKit &middot; Data-first layout system for SaaS and analytics products
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/styles/dashboard-layout"
                className="text-sm text-[#6366f1] font-medium hover:underline transition-colors duration-150"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-sm text-gray-500 hover:text-[#111827] transition-colors duration-150"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
