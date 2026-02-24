"use client";

import { useState, useMemo } from "react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  Folder,
  Users,
  FileType,
  Database,
  ClipboardList,
  Settings,
  HelpCircle,
  Search,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  Loader2,
  MoreVertical,
  Menu,
} from "lucide-react";

/* ── Sidebar Data ── */
const navMain = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Lifecycle", icon: ListChecks },
  { title: "Analytics", icon: BarChart3 },
  { title: "Projects", icon: Folder },
  { title: "Team", icon: Users },
];

const navDocuments = [
  { name: "Data Library", icon: Database },
  { name: "Reports", icon: ClipboardList },
  { name: "Word Assistant", icon: FileType },
];

const navSecondary = [
  { title: "Settings", icon: Settings },
  { title: "Get Help", icon: HelpCircle },
  { title: "Search", icon: Search },
];

const shadcnPageSummary: Record<string, string> = {
  Dashboard: "Overview of performance metrics, charts, and recent document execution.",
  Lifecycle: "Track process states and status transitions across workflow stages.",
  Analytics: "Inspect trends, segments, and comparative performance over time.",
  Projects: "Review project-level budget, status, and execution insights.",
  Team: "Manage team output, owner responsibility, and review cadence.",
  "Data Library": "Browse structured datasets and source collections.",
  Reports: "Access generated reports and downloadable analytics snapshots.",
  "Word Assistant": "Manage writing assistant assets and generated drafts.",
  Settings: "Configure workspace preferences and dashboard behavior.",
  "Get Help": "Open support guidance, troubleshooting, and documentation.",
  Search: "Find modules, reports, and records quickly.",
};
/* ── Stats Cards Data ── */
const statCards = [
  { label: "Total Revenue", value: "$1,250.00", badge: "+12.5%", trend: "up" as const, footer: "Trending up this month", detail: "Visitors for the last 6 months" },
  { label: "New Customers", value: "1,234", badge: "-20%", trend: "down" as const, footer: "Down 20% this period", detail: "Acquisition needs attention" },
  { label: "Active Accounts", value: "45,678", badge: "+12.5%", trend: "up" as const, footer: "Strong user retention", detail: "Engagement exceed targets" },
  { label: "Growth Rate", value: "4.5%", badge: "+4.5%", trend: "up" as const, footer: "Steady performance increase", detail: "Meets growth projections" },
];

/* ── Chart Data ── */
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

/* ── Table Data ── */
const tableData = [
  { id: 1, header: "Header Design", type: "Table of Contents", status: "Done", target: "$45.00", limit: "$100.00", reviewer: "Eddie Lake" },
  { id: 2, header: "Introduction", type: "Executive Summary", status: "In Progress", target: "$150.00", limit: "$200.00", reviewer: "Jamik Tashpulatov" },
  { id: 3, header: "Methodology", type: "Technical Approach", status: "Done", target: "$75.00", limit: "$150.00", reviewer: "Eddie Lake" },
  { id: 4, header: "Results", type: "Data Analysis", status: "Done", target: "$200.00", limit: "$300.00", reviewer: "Jamik Tashpulatov" },
  { id: 5, header: "Conclusion", type: "Summary", status: "In Progress", target: "$50.00", limit: "$100.00", reviewer: "Eddie Lake" },
  { id: 6, header: "Appendix A", type: "Reference", status: "Done", target: "$25.00", limit: "$50.00", reviewer: "Jamik Tashpulatov" },
  { id: 7, header: "Appendix B", type: "Supplementary", status: "In Progress", target: "$30.00", limit: "$75.00", reviewer: "Eddie Lake" },
  { id: 8, header: "Bibliography", type: "Reference", status: "Done", target: "$15.00", limit: "$40.00", reviewer: "Jamik Tashpulatov" },
];
/* ── SVG Area Chart Component ── */
function AreaChartSVG({ data, timeRange }: { data: typeof chartData; timeRange: string }) {
  const filtered = useMemo(() => {
    const ref = new Date("2024-06-30");
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const start = new Date(ref);
    start.setDate(start.getDate() - days);
    return data.filter((d) => new Date(d.date) >= start);
  }, [data, timeRange]);

  const maxVal = Math.max(...filtered.flatMap((d) => [d.desktop, d.mobile]), 1);
  const w = 800;
  const h = 250;
  const pad = { top: 10, right: 10, bottom: 30, left: 10 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  function toPath(key: "desktop" | "mobile") {
    return filtered
      .map((d, i) => {
        const x = pad.left + (i / Math.max(filtered.length - 1, 1)) * cw;
        const y = pad.top + ch - (d[key] / maxVal) * ch;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }

  function toArea(key: "desktop" | "mobile") {
    const line = toPath(key);
    const lastX = pad.left + cw;
    const firstX = pad.left;
    const bottom = pad.top + ch;
    return `${line} L${lastX},${bottom} L${firstX},${bottom} Z`;
  }

  const labels = filtered.filter((_, i) => i % Math.max(Math.floor(filtered.length / 5), 1) === 0);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[250px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gDesktop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
          <stop offset="95%" stopColor="currentColor" stopOpacity={0.02} />
        </linearGradient>
        <linearGradient id="gMobile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="currentColor" stopOpacity={0.15} />
          <stop offset="95%" stopColor="currentColor" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <line
          key={frac}
          x1={pad.left}
          y1={pad.top + ch * (1 - frac)}
          x2={pad.left + cw}
          y2={pad.top + ch * (1 - frac)}
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ))}
      {/* Areas */}
      <path d={toArea("mobile")} className="text-zinc-600 dark:text-zinc-400" fill="url(#gMobile)" />
      <path d={toArea("desktop")} className="text-zinc-900 dark:text-zinc-100" fill="url(#gDesktop)" />
      {/* Lines */}
      <path d={toPath("mobile")} fill="none" className="text-zinc-400 dark:text-zinc-500" stroke="currentColor" strokeWidth={1.5} />
      <path d={toPath("desktop")} fill="none" className="text-zinc-900 dark:text-zinc-100" stroke="currentColor" strokeWidth={2} />
      {/* X-axis labels */}
      {labels.map((d) => {
        const i = filtered.indexOf(d);
        const x = pad.left + (i / Math.max(filtered.length - 1, 1)) * cw;
        const label = new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return (
          <text key={d.date} x={x} y={h - 5} textAnchor="middle" className="fill-zinc-400 dark:fill-zinc-500 text-[10px]">
            {label}
          </text>
        );
      })}
    </svg>
  );
}
export default function ShadcnAnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState("90d");
  const [page, setPage] = useState(0);
  const [activePage, setActivePage] = useState("Dashboard");
  const pageSize = 5;
  const totalPages = Math.ceil(tableData.length / pageSize);
  const pagedData = tableData.slice(page * pageSize, (page + 1) * pageSize);

  const renderShadcnModuleContent = () => {
    switch (activePage) {
      case "Lifecycle":
        return (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Lifecycle Stages</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { stage: "Draft", count: 18 },
                { stage: "Review", count: 11 },
                { stage: "Approved", count: 26 },
                { stage: "Archived", count: 9 },
              ].map((stage) => (
                <div key={stage.stage} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{stage.stage}</p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{stage.count}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Analytics":
        return (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Analytics Deep Dive</h2>
            <div className="mt-4 flex items-end gap-2 h-44">
              {[28, 35, 48, 42, 57, 63, 59, 68, 72, 66, 79, 74].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-zinc-900 dark:bg-zinc-100" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        );
      case "Projects":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Q3 Knowledge Base", owner: "Eddie Lake", status: "In Progress" },
              { name: "Policy Refactor", owner: "Jamik Tashpulatov", status: "Review" },
              { name: "Data Cleanup", owner: "Eddie Lake", status: "Done" },
              { name: "Audit Pack", owner: "Jamik Tashpulatov", status: "Planned" },
            ].map((project) => (
              <div key={project.name} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{project.owner}</p>
                <p className="mt-3 text-xs inline-block px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">{project.status}</p>
              </div>
            ))}
          </div>
        );
      case "Team":
        return (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Team Capacity</h2>
            <div className="mt-4 space-y-3">
              {[
                { member: "Eddie Lake", capacity: 82 },
                { member: "Jamik Tashpulatov", capacity: 66 },
                { member: "Maya Wang", capacity: 74 },
              ].map((member) => (
                <div key={member.member}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-zinc-700 dark:text-zinc-300">{member.member}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{member.capacity}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${member.capacity}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Data Library":
      case "Reports":
      case "Word Assistant":
      case "Settings":
      case "Get Help":
      case "Search":
        return (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{activePage}</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {shadcnPageSummary[activePage] ?? "This module is ready."}
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {[
                "Overview panel",
                "Recent updates",
                "Saved views",
                "Ownership and permissions",
                "Export and sharing",
                "Audit history",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 text-sm text-zinc-700 dark:text-zinc-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{shadcnPageSummary[activePage]}</p>
          </div>
        );
    }
  };

  return (
    <>
      <TemplateBackButton variant="default" />
      <div className="flex h-screen bg-white dark:bg-zinc-950">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-72" : "w-0 overflow-hidden"
          } transition-all duration-200 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-col shrink-0`}
        >
          <div className="h-12 px-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-zinc-100" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Acme Inc.</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-3 px-3">
            <div className="space-y-1">
              {navMain.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActivePage(item.title)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                    activePage === item.title
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <p className="px-3 mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">Documents</p>
              <div className="space-y-1">
                {navDocuments.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActivePage(item.name)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      activePage === item.name
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-6">
              <div className="space-y-1">
                {navSecondary.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActivePage(item.title)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                      activePage === item.title
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <div className="px-3 py-3 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-700 dark:text-zinc-300">SC</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">shadcn</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">m@example.com</p>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-12 shrink-0 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 px-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Menu className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </button>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-2" />
            <h1 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{activePage}</h1>
          </header>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {activePage === "Dashboard" ? (
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-4">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-t from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900 shadow-sm p-5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{card.label}</p>
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                          card.trend === "up"
                            ? "border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                            : "border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {card.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{card.value}</p>
                    <div className="mt-3 text-sm">
                      <p className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                        {card.footer}
                        {card.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400">{card.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Chart */}
              <div className="px-4 lg:px-6">
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                  <div className="flex items-center justify-between p-5 pb-0">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Total Visitors</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Total for the last 3 months</p>
                    </div>
                    <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 rounded-lg p-0.5">
                      {[
                        { value: "90d", label: "3 months" },
                        { value: "30d", label: "30 days" },
                        { value: "7d", label: "7 days" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setTimeRange(opt.value)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            timeRange === opt.value
                              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 pt-4">
                    <AreaChartSVG data={chartData} timeRange={timeRange} />
                    <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded" />
                        Desktop
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-0.5 bg-zinc-400 dark:bg-zinc-500 rounded" />
                        Mobile
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Data Table */}
              <div className="px-4 lg:px-6">
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                          <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Header</th>
                          <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Section Type</th>
                          <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                          <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Target</th>
                          <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Limit</th>
                          <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Reviewer</th>
                          <th className="w-10 px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody>
                        {pagedData.map((row) => (
                          <tr key={row.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.header}</td>
                            <td className="px-4 py-3">
                              <span className="inline-block text-xs px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                                {row.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                                {row.status === "Done" ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Loader2 className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
                                )}
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-zinc-900 dark:text-zinc-100 tabular-nums">{row.target}</td>
                            <td className="px-4 py-3 text-right text-zinc-900 dark:text-zinc-100 tabular-nums">{row.limit}</td>
                            <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.reviewer}</td>
                            <td className="px-4 py-3">
                              <button type="button" className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                <MoreVertical className="w-4 h-4 text-zinc-400" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination */}
                  <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {page * pageSize + 1}-{Math.min((page + 1) * pageSize, tableData.length)} of {tableData.length} rows
                    </p>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => setPage(0)} disabled={page === 0} className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors">
                        <ChevronsLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button type="button" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors">
                        <ChevronLeft className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button type="button" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors">
                        <ChevronRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                      <button type="button" onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} className="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-colors">
                        <ChevronsRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            ) : (
              <div className="px-4 lg:px-6 py-6">{renderShadcnModuleContent()}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
