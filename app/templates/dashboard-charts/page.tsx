"use client";

export const dynamic = "force-static";

import { useState, useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BarChart2,
  Bell,
  Calendar,
  ChevronRight,
  DollarSign,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DateRange = "7d" | "30d" | "90d" | "1y";
type SortDir = "asc" | "desc";

interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

interface BarDatum {
  label: string;
  value: number;
}

interface LineDatum {
  label: string;
  value: number;
}

interface TableRow {
  id: string;
  user: string;
  region: string;
  revenue: number;
  sessions: number;
  conversion: number;
  status: "Active" | "Inactive" | "Pending";
}

// ---------------------------------------------------------------------------
// Data by dateRange
// ---------------------------------------------------------------------------

const statsByRange: Record<DateRange, StatCard[]> = {
  "7d": [
    { label: "Total Revenue", value: "¥24K", change: "+4.2%", positive: true, icon: DollarSign },
    { label: "Active Users", value: "1,847", change: "+2.1%", positive: true, icon: Users },
    { label: "Conversion Rate", value: "3.2%", change: "-0.3%", positive: false, icon: TrendingUp },
    { label: "Avg. Session", value: "4m 12s", change: "+0.5%", positive: true, icon: BarChart2 },
  ],
  "30d": [
    { label: "Total Revenue", value: "¥98K", change: "+11.4%", positive: true, icon: DollarSign },
    { label: "Active Users", value: "8,234", change: "+7.8%", positive: true, icon: Users },
    { label: "Conversion Rate", value: "3.8%", change: "+0.4%", positive: true, icon: TrendingUp },
    { label: "Avg. Session", value: "4m 38s", change: "+1.2%", positive: true, icon: BarChart2 },
  ],
  "90d": [
    { label: "Total Revenue", value: "¥284K", change: "+18.7%", positive: true, icon: DollarSign },
    { label: "Active Users", value: "24,100", change: "+14.3%", positive: true, icon: Users },
    { label: "Conversion Rate", value: "4.1%", change: "+0.7%", positive: true, icon: TrendingUp },
    { label: "Avg. Session", value: "5m 02s", change: "+3.4%", positive: true, icon: BarChart2 },
  ],
  "1y": [
    { label: "Total Revenue", value: "¥1.2M", change: "+32.1%", positive: true, icon: DollarSign },
    { label: "Active Users", value: "98,500", change: "+28.6%", positive: true, icon: Users },
    { label: "Conversion Rate", value: "4.5%", change: "+1.1%", positive: true, icon: TrendingUp },
    { label: "Avg. Session", value: "5m 47s", change: "+8.9%", positive: true, icon: BarChart2 },
  ],
};

const barDataByRange: Record<DateRange, BarDatum[]> = {
  "7d": [
    { label: "Mon", value: 38 },
    { label: "Tue", value: 52 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 60 },
    { label: "Fri", value: 72 },
    { label: "Sat", value: 55 },
    { label: "Sun", value: 41 },
    { label: "", value: 0 },
    { label: "", value: 0 },
    { label: "", value: 0 },
    { label: "", value: 0 },
    { label: "", value: 0 },
  ],
  "30d": [
    { label: "W1", value: 42 },
    { label: "W2", value: 58 },
    { label: "W3", value: 51 },
    { label: "W4", value: 67 },
    { label: "W5", value: 74 },
    { label: "W6", value: 63 },
    { label: "W7", value: 55 },
    { label: "W8", value: 70 },
    { label: "W9", value: 79 },
    { label: "W10", value: 68 },
    { label: "W11", value: 82 },
    { label: "W12", value: 88 },
  ],
  "90d": [
    { label: "Jan", value: 32 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 38 },
    { label: "Apr", value: 52 },
    { label: "May", value: 48 },
    { label: "Jun", value: 62 },
    { label: "Jul", value: 55 },
    { label: "Aug", value: 71 },
    { label: "Sep", value: 68 },
    { label: "Oct", value: 75 },
    { label: "Nov", value: 69 },
    { label: "Dec", value: 82 },
  ],
  "1y": [
    { label: "Q1'23", value: 28 },
    { label: "Q2'23", value: 41 },
    { label: "Q3'23", value: 37 },
    { label: "Q4'23", value: 56 },
    { label: "Q1'24", value: 49 },
    { label: "Q2'24", value: 65 },
    { label: "Q3'24", value: 72 },
    { label: "Q4'24", value: 84 },
    { label: "Q1'25", value: 78 },
    { label: "Q2'25", value: 88 },
    { label: "Q3'25", value: 93 },
    { label: "Q4'25", value: 100 },
  ],
};

const lineDataByRange: Record<DateRange, LineDatum[]> = {
  "7d": [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 55 },
    { label: "Wed", value: 48 },
    { label: "Thu", value: 62 },
    { label: "Fri", value: 70 },
    { label: "Sat", value: 58 },
    { label: "Sun", value: 45 },
  ],
  "30d": [
    { label: "Wk1", value: 35 },
    { label: "Wk2", value: 50 },
    { label: "Wk3", value: 44 },
    { label: "Wk4", value: 60 },
    { label: "Wk5", value: 68 },
    { label: "Wk6", value: 57 },
    { label: "Wk7", value: 72 },
  ],
  "90d": [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 42 },
    { label: "Mar", value: 36 },
    { label: "Apr", value: 50 },
    { label: "May", value: 46 },
    { label: "Jun", value: 60 },
    { label: "Jul", value: 53 },
  ],
  "1y": [
    { label: "Q1", value: 25 },
    { label: "Q2", value: 48 },
    { label: "Q3", value: 62 },
    { label: "Q4", value: 78 },
    { label: "Q5", value: 70 },
    { label: "Q6", value: 85 },
    { label: "Q7", value: 92 },
  ],
};

const tableRows: TableRow[] = [
  { id: "USR-001", user: "Alex Chen", region: "Asia Pacific", revenue: 42800, sessions: 384, conversion: 4.8, status: "Active" },
  { id: "USR-002", user: "Lisa Wang", region: "North America", revenue: 38200, sessions: 312, conversion: 3.9, status: "Active" },
  { id: "USR-003", user: "Mark Kim", region: "Europe", revenue: 29700, sessions: 276, conversion: 3.2, status: "Pending" },
  { id: "USR-004", user: "Sarah Liu", region: "South America", revenue: 18400, sessions: 198, conversion: 2.7, status: "Inactive" },
  { id: "USR-005", user: "David Zhang", region: "Asia Pacific", revenue: 55100, sessions: 441, conversion: 5.1, status: "Active" },
  { id: "USR-006", user: "Emma Park", region: "Europe", revenue: 33600, sessions: 290, conversion: 4.1, status: "Active" },
  { id: "USR-007", user: "James Wu", region: "North America", revenue: 47300, sessions: 360, conversion: 4.5, status: "Pending" },
];

// ---------------------------------------------------------------------------
// Sidebar nav items
// ---------------------------------------------------------------------------

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart2 },
  { label: "Reports", icon: FileText },
  { label: "Users", icon: Users },
  { label: "Settings", icon: Settings },
];

const DATE_RANGE_LABELS: Record<DateRange, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "1y": "Last 12 months",
};

// ---------------------------------------------------------------------------
// Helper: status badge colours
// ---------------------------------------------------------------------------

function statusBadge(status: TableRow["status"]) {
  switch (status) {
    case "Active":
      return "bg-emerald-900/50 text-emerald-400 border border-emerald-800";
    case "Inactive":
      return "bg-red-900/50 text-red-400 border border-red-800";
    case "Pending":
      return "bg-amber-900/50 text-amber-400 border border-amber-800";
  }
}

// ---------------------------------------------------------------------------
// Subcomponent: Area/Line chart (div-based)
// ---------------------------------------------------------------------------

function AreaChart({ data }: { data: LineDatum[] }) {
  const max = Math.max(...data.map((d) => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / max) * 80;
    return { x, y, ...d };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = [
    `0,100`,
    ...points.map((p) => `${p.x},${p.y}`),
    `100,100`,
  ].join(" ");

  return (
    <div className="relative w-full h-36">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#areaGrad)" />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#3b82f6" />
        ))}
      </svg>
      {/* x-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0.5">
        {points.map((p, i) => (
          <span key={i} className="text-[9px] text-gray-500 leading-none">
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DashboardChartsTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [sortField, setSortField] = useState<keyof TableRow>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Derived data
  const stats = statsByRange[dateRange];
  const barData = barDataByRange[dateRange];
  const lineData = lineDataByRange[dateRange];
  const maxBar = Math.max(...barData.map((d) => d.value), 1);

  const sortedRows = useMemo(() => {
    return [...tableRows].sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [sortField, sortDir]);

  function handleSort(field: keyof TableRow) {
    if (field === sortField) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function SortIcon({ field }: { field: keyof TableRow }) {
    if (field !== sortField) {
      return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-600 inline" />;
    }
    return sortDir === "asc"
      ? <ArrowUp className="w-3 h-3 ml-1 text-blue-400 inline" />
      : <ArrowDown className="w-3 h-3 ml-1 text-blue-400 inline" />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* ------------------------------------------------------------------ */}
      {/* Sidebar                                                              */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-800 z-40 flex flex-col transition-all duration-200 ${
          sidebarOpen ? "w-56" : "w-0 overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <BarChart2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-100 whitespace-nowrap">Insight</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActivePage(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 font-medium"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                }`}
              >
                {/* Active indicator bar */}
                <span
                  className={`absolute left-0 w-0.5 h-6 rounded-r-full transition-opacity ${
                    isActive ? "bg-blue-500 opacity-100" : "opacity-0"
                  }`}
                />
                <item.icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />
                {item.label}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User avatar at bottom */}
        <div className="px-4 py-4 border-t border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white shrink-0">
              A
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-gray-200 truncate">Admin User</p>
              <p className="text-[10px] text-gray-500 truncate">admin@insight.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Main area                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${
          sidebarOpen ? "ml-56" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <div>
                <h1 className="text-base font-semibold text-gray-100">{activePage}</h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {DATE_RANGE_LABELS[dateRange]} overview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 pl-9 pr-4 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              {/* Notifications */}
              <button
                className="relative p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">

          {/* ---------------------------------------------------------------- */}
          {/* Date range filter                                                 */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setDateDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:border-gray-600 transition-colors"
              >
                <Calendar className="w-4 h-4 text-gray-400" />
                {DATE_RANGE_LABELS[dateRange]}
              </button>
              {dateDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-xl z-20 min-w-[160px]">
                  {(["7d", "30d", "90d", "1y"] as DateRange[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setDateRange(r);
                        setDateDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        dateRange === r
                          ? "bg-blue-600/20 text-blue-400"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {DATE_RANGE_LABELS[r]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-1 bg-gray-800 border border-gray-700 rounded-lg p-0.5">
              {(["7d", "30d", "90d", "1y"] as DateRange[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    dateRange === r
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Stat cards                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-600/30 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-100 mb-1">{stat.value}</div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.positive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {stat.change}
                  <span className="text-gray-600 font-normal ml-0.5">vs prev period</span>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Charts row                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Bar chart — 3/5 width */}
            <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-100">Revenue Breakdown</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {DATE_RANGE_LABELS[dateRange]}
                  </p>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-medium bg-blue-600/15 text-blue-400 rounded-full border border-blue-600/30">
                  Bar
                </span>
              </div>

              {/* Bars */}
              <div className="flex items-end gap-1.5 h-44 relative">
                {/* y-axis gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-5">
                  {[100, 75, 50, 25, 0].map((pct) => (
                    <div key={pct} className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-600 w-6 text-right">{pct}</span>
                      <div className="flex-1 border-t border-gray-800/80" />
                    </div>
                  ))}
                </div>

                {/* Bar columns */}
                <div className="flex-1 flex items-end gap-1.5 pl-8 h-full pb-5 relative">
                  {barData.map((d, i) => {
                    const heightPct = d.value > 0 ? (d.value / maxBar) * 100 : 0;
                    const isHovered = hoveredBar === i;
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                        onMouseEnter={() => d.value > 0 && setHoveredBar(i)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Tooltip */}
                        {isHovered && d.value > 0 && (
                          <div className="absolute -top-8 bg-gray-700 border border-gray-600 text-gray-100 text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg z-10 pointer-events-none">
                            {d.label}: {d.value}
                          </div>
                        )}
                        {/* Bar */}
                        <div className="w-full relative" style={{ height: `${heightPct}%` }}>
                          <div
                            className={`absolute inset-0 rounded-t-md transition-colors duration-150 ${
                              d.value === 0
                                ? "bg-transparent"
                                : isHovered
                                ? "bg-blue-400"
                                : "bg-blue-600"
                            }`}
                          />
                        </div>
                        {/* Label */}
                        {d.label && (
                          <span className="text-[9px] text-gray-500 leading-none whitespace-nowrap">
                            {d.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Area/Line chart — 2/5 width */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-100">User Growth Trend</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{DATE_RANGE_LABELS[dateRange]}</p>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-medium bg-purple-600/15 text-purple-400 rounded-full border border-purple-600/30">
                  Trend
                </span>
              </div>

              <AreaChart data={lineData} />

              {/* Summary row */}
              <div className="mt-4 flex items-center justify-between text-xs border-t border-gray-800 pt-4">
                <div>
                  <p className="text-gray-500">Peak</p>
                  <p className="font-semibold text-gray-100 mt-0.5">
                    {Math.max(...lineData.map((d) => d.value))}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Average</p>
                  <p className="font-semibold text-gray-100 mt-0.5">
                    {Math.round(
                      lineData.reduce((s, d) => s + d.value, 0) / lineData.length
                    )}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Low</p>
                  <p className="font-semibold text-gray-100 mt-0.5">
                    {Math.min(...lineData.map((d) => d.value))}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Sortable data table                                               */}
          {/* ---------------------------------------------------------------- */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-100">Top Contributors</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Click column headers to sort
                </p>
              </div>
              <span className="text-xs text-gray-500">{tableRows.length} entries</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-800/40">
                    {(
                      [
                        { key: "id", label: "ID" },
                        { key: "user", label: "User" },
                        { key: "region", label: "Region" },
                        { key: "revenue", label: "Revenue" },
                        { key: "sessions", label: "Sessions" },
                        { key: "conversion", label: "Conv. %" },
                        { key: "status", label: "Status" },
                      ] as { key: keyof TableRow; label: string }[]
                    ).map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="text-left py-3 px-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 select-none transition-colors"
                      >
                        {col.label}
                        <SortIcon field={col.key} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-800/60 hover:bg-gray-800/40 transition-colors ${
                        i === sortedRows.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-xs font-mono text-gray-500">{row.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-xs font-semibold text-blue-400 shrink-0">
                            {row.user.charAt(0)}
                          </div>
                          <span className="text-gray-200 font-medium">{row.user}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{row.region}</td>
                      <td className="py-3 px-4 font-semibold text-gray-100">
                        ¥{row.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{row.sessions.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden max-w-[60px]">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(row.conversion / 6) * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-300 text-xs">{row.conversion}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusBadge(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table footer */}
            <div className="px-6 py-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span>Showing {tableRows.length} of {tableRows.length} results</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400">
                  Prev
                </button>
                <button className="px-2.5 py-1 rounded-md bg-blue-600 text-white">1</button>
                <button className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400">
                  Next
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>

      <TemplateBackButton variant="dark" />
    </div>
  );
}
