"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

type PanelId = "dashboard" | "projects" | "settings";

const demoNavItems: { id: PanelId; label: string; icon: string }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const dashboardMetrics = [
  { label: "Revenue", value: "$48,320", change: "+12.5%", up: true, color: "#3b82f6" },
  { label: "Users", value: "2,847", change: "+8.2%", up: true, color: "#10b981" },
  { label: "Bounce", value: "24.3%", change: "-3.1%", up: true, color: "#f59e0b" },
  { label: "Session", value: "4m 32s", change: "-0.8%", up: false, color: "#ef4444" },
];

const projectRows = [
  { name: "StyleKit Core", status: "Active", progress: 78, owner: "Sarah K." },
  { name: "API Gateway", status: "Review", progress: 92, owner: "James T." },
  { name: "Mobile App", status: "Active", progress: 45, owner: "Mika R." },
  { name: "Design System", status: "Planning", progress: 15, owner: "Alex M." },
  { name: "Auth Service", status: "Active", progress: 60, owner: "Jordan L." },
];

const activityFeed = [
  { user: "Alex M.", action: "deployed v2.4.1", time: "2 min ago", color: "#10b981" },
  { user: "Sarah K.", action: "merged PR #847", time: "15 min ago", color: "#3b82f6" },
  { user: "James T.", action: "created branch", time: "1 hr ago", color: "#f59e0b" },
  { user: "Mika R.", action: "resolved issues", time: "2 hr ago", color: "#a855f7" },
];

const colorTokens = [
  { name: "Primary Dark", hex: "#1e293b", role: "Sidebar, header, text", light: false },
  { name: "Surface", hex: "#f1f5f9", role: "Page background", light: true },
  { name: "Blue", hex: "#3b82f6", role: "Active nav, CTAs", light: false },
  { name: "Emerald", hex: "#10b981", role: "Success states", light: false },
  { name: "Amber", hex: "#f59e0b", role: "Warnings, neutral", light: true },
  { name: "Red", hex: "#ef4444", role: "Errors, danger", light: false },
  { name: "White", hex: "#ffffff", role: "Card backgrounds", light: true },
  { name: "Border", hex: "#e2e8f0", role: "Dividers, outlines", light: true },
];

type ViewportMode = "desktop" | "tablet" | "mobile";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function NavIcon({ path }: { path: string }) {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-[#10b981]/10 text-[#10b981]",
    Review: "bg-[#3b82f6]/10 text-[#3b82f6]",
    Planning: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${map[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}

function DashboardPanel() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-[#1e293b] mb-0.5">Dashboard</h3>
        <p className="text-xs text-gray-500">Welcome back. Here is what is happening today.</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {dashboardMetrics.map((m) => (
          <div
            key={m.label}
            className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{m.label}</span>
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${m.color}15` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
              </div>
            </div>
            <div className="text-lg font-bold text-[#1e293b] group-hover:text-[#3b82f6] transition-colors duration-150">{m.value}</div>
            <div className={`text-[10px] font-medium mt-0.5 ${m.up ? "text-[#10b981]" : "text-[#ef4444]"}`}>{m.change}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1e293b]">Projects</span>
          <button className="text-[10px] text-[#3b82f6] font-medium hover:underline active:scale-[0.98] transition-all duration-150">View all</button>
        </div>
        <div className="divide-y divide-gray-50">
          {projectRows.slice(0, 3).map((row) => (
            <div key={row.name} className="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50/50 transition-colors duration-150">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#1e293b] truncate">{row.name}</div>
                <div className="text-[10px] text-gray-400">{row.owner}</div>
              </div>
              <StatusBadge status={row.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#1e293b] mb-0.5">Projects</h3>
          <p className="text-xs text-gray-500">All active and planned projects.</p>
        </div>
        <button className="px-3 py-1.5 bg-[#3b82f6] text-white text-xs font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)] active:scale-[0.98] active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 transition-all duration-150 ease-out">
          + New
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/60">
              <th className="px-4 py-2.5 text-left font-medium text-gray-400 uppercase tracking-wider">Project</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-400 uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projectRows.map((row) => (
              <tr key={row.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                <td className="px-4 py-3">
                  <div className="font-medium text-[#1e293b]">{row.name}</div>
                  <div className="text-gray-400 text-[10px]">{row.owner}</div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3b82f6] rounded-full transition-all duration-500" style={{ width: `${row.progress}%` }} />
                    </div>
                    <span className="text-gray-400 w-7 text-right">{row.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [notifs, setNotifs] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-[#1e293b] mb-0.5">Settings</h3>
        <p className="text-xs text-gray-500">Manage your workspace preferences.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {[
          { label: "Email Notifications", desc: "Receive updates on project activity", value: notifs, toggle: () => setNotifs((v) => !v) },
          { label: "Compact Sidebar", desc: "Show icon-only nav on desktop", value: compact, toggle: () => setCompact((v) => !v) },
        ].map((s) => (
          <div key={s.label} className="px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-[#1e293b]">{s.label}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s.desc}</div>
            </div>
            <button
              onClick={s.toggle}
              className={`w-10 h-5.5 rounded-full relative transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 ${s.value ? "bg-[#3b82f6]" : "bg-gray-200"}`}
              style={{ minWidth: 40, height: 22 }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-150"
                style={{ transform: s.value ? "translateX(18px)" : "translateX(0)" }}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="text-xs font-semibold text-[#1e293b] mb-3">Profile</div>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-medium text-gray-500 block mb-1">Display name</label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-150"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-500 block mb-1">Email</label>
            <input
              type="email"
              defaultValue="admin@stylekit.dev"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-150"
            />
          </div>
          <button className="px-4 py-2 bg-[#3b82f6] text-white text-xs font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(59,130,246,0.3)] active:scale-[0.98] active:translate-y-0 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 transition-all duration-150 ease-out">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Responsive layout previews                                          */
/* ------------------------------------------------------------------ */

function DesktopPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white" style={{ height: 280 }}>
      {/* Header */}
      <div className="h-10 bg-[#1e293b] flex items-center px-4 gap-3 border-b border-white/10 shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
        </div>
        <div className="flex-1 h-4 bg-white/10 rounded max-w-xs mx-auto" />
        <div className="w-6 h-6 rounded-full bg-[#3b82f6]" />
      </div>
      {/* Body: 3 cols */}
      <div className="flex" style={{ height: 230 }}>
        <div className="w-36 bg-[#f8fafc] border-r border-gray-200 shrink-0 p-3 flex flex-col gap-2">
          <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Left Nav</div>
          {["Dashboard", "Projects", "Team", "Settings"].map((item, i) => (
            <div
              key={item}
              className={`h-6 rounded flex items-center px-2 text-[8px] font-medium transition-all duration-150 ${
                i === 0 ? "bg-[#3b82f6]/10 text-[#3b82f6] border-l-2 border-[#3b82f6]" : "text-gray-400"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 bg-[#f1f5f9] flex flex-col gap-3 min-w-0">
          <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-400">Main Content (flex-1)</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-2 border border-gray-100">
              <div className="text-[8px] text-gray-400 mb-1">Revenue</div>
              <div className="text-sm font-bold text-[#1e293b]">$48k</div>
            </div>
            <div className="bg-white rounded-lg p-2 border border-gray-100">
              <div className="text-[8px] text-gray-400 mb-1">Users</div>
              <div className="text-sm font-bold text-[#10b981]">2.8k</div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg border border-gray-100" />
        </div>
        <div className="w-40 bg-[#f8fafc] border-l border-gray-200 shrink-0 p-3 flex flex-col gap-2">
          <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-400 mb-1">Right Sidebar</div>
          {activityFeed.map((a) => (
            <div key={a.user} className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
              <div className="text-[8px] text-gray-500 truncate">{a.user}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabletPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white" style={{ height: 280 }}>
      <div className="h-10 bg-[#1e293b] flex items-center px-4 gap-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
        </div>
        <div className="flex-1 h-4 bg-white/10 rounded max-w-xs mx-auto" />
      </div>
      <div className="flex" style={{ height: 230 }}>
        {/* Collapsed left nav */}
        <div className="w-12 bg-[#f8fafc] border-r border-gray-200 shrink-0 p-2 flex flex-col items-center gap-3 pt-4">
          <div className="text-[8px] text-gray-300 font-semibold">NAV</div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 0 ? "bg-[#3b82f6]/10" : "bg-gray-100"}`}>
              <div className={`w-3 h-3 rounded ${i === 0 ? "bg-[#3b82f6]" : "bg-gray-300"}`} />
            </div>
          ))}
        </div>
        {/* Main: full width, right sidebar hidden */}
        <div className="flex-1 p-4 bg-[#f1f5f9] flex flex-col gap-3">
          <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-400">Main Content</div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-2 border border-gray-100 h-10" />
            ))}
          </div>
          <div className="flex-1 bg-white rounded-lg border border-gray-100" />
          <div className="text-[8px] text-gray-400 text-center">Right sidebar hidden at md breakpoint</div>
        </div>
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white" style={{ height: 280 }}>
      {/* Mobile header with hamburger */}
      <div className="h-10 bg-[#1e293b] flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-4 flex flex-col justify-between">
            <div className="h-0.5 w-full bg-white/80 rounded" />
            <div className="h-0.5 w-full bg-white/80 rounded" />
            <div className="h-0.5 w-full bg-white/80 rounded" />
          </div>
          <div className="w-16 h-3 bg-white/20 rounded" />
        </div>
        <div className="w-6 h-6 rounded-full bg-[#3b82f6]" />
      </div>
      {/* Stacked content */}
      <div className="p-4 bg-[#f1f5f9] flex flex-col gap-3" style={{ height: 230 }}>
        <div className="text-[8px] font-semibold uppercase tracking-wider text-gray-400">Stacked layout — all columns vertical</div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-2 border border-gray-100 h-12" />
        ))}
        <div className="text-[8px] text-gray-400 text-center mt-auto">Left nav + right sidebar hidden; hamburger reveals drawer</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId>("dashboard");
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [componentTab, setComponentTab] = useState<"button" | "card" | "nav">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const { ref: anatomyRef, inView: anatomyInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: responsiveRef, inView: responsiveInView } = useInView();
  const { ref: colorsRef, inView: colorsInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b]">

      {/* ================================================================ */}
      {/* 1. Fixed showcase nav (styled as holy-grail header)              */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 flex items-center justify-between h-14">
          {/* Left: brand + back link */}
          <div className="flex items-center gap-5">
            <Link
              href="/styles"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1e293b] transition-colors duration-150 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              StyleKit
            </Link>
            <div className="hidden md:flex items-center gap-1 text-gray-300">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <span className="hidden md:block font-semibold text-[#1e293b] text-sm">
              Holy<span className="text-[#3b82f6]">Grail</span> Layout
            </span>
          </div>

          {/* Center: search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all duration-150"
              />
            </div>
          </div>

          {/* Right: nav links + avatar */}
          <div className="flex items-center gap-5">
            <Link
              href="/styles/holy-grail-layout"
              className="hidden sm:block text-sm text-gray-500 hover:text-[#1e293b] transition-colors duration-150"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="hidden sm:block text-sm text-gray-500 hover:text-[#1e293b] transition-colors duration-150"
            >
              All Styles
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero — explanation + interactive live demo                     */}
      {/* ================================================================ */}
      <section className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Title block */}
        <div className="mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Layout Pattern
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
                }}
              >
                圣杯布局
              </span>
              <span
                className="block text-[#3b82f6]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s",
                }}
              >
                Holy Grail.
              </span>
            </h1>

            <p
              className="max-w-sm text-sm text-gray-500 leading-relaxed lg:text-right"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              The classic 5-zone web layout: fixed header, 3-column body with left nav, main content, and right sidebar, plus a footer. Main content loads first in HTML for SEO. All columns are equal height.
            </p>
          </div>
        </div>

        {/* Tag row */}
        <div
          className="flex flex-wrap gap-2 mb-12"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          {["CSS Grid", "Flexbox", "5-zone structure", "Equal-height columns", "SEO-first HTML order", "Sticky header"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 font-medium shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* ---- INTERACTIVE LIVE DEMO ---- */}
        <div
          className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          {/* Demo browser chrome */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              </div>
              <span className="ml-2 text-[10px] text-gray-400 font-medium">Live Holy Grail Demo — click the nav items</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[10px] text-gray-400">interactive</span>
            </div>
          </div>

          {/* === Holy Grail shell === */}
          <div className="flex flex-col" style={{ minHeight: 540 }}>

            {/* Demo inner header */}
            <div className="bg-[#1e293b] text-white px-5 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-4">
                <div className="text-sm font-bold tracking-tight">Acme<span className="text-[#3b82f6]">HQ</span></div>
                <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1">
                  <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-xs text-white/40 ml-1 pr-8">Search...</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-150 active:scale-[0.98]">
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ef4444] rounded-full" />
                </button>
                <div className="w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">A</div>
              </div>
            </div>

            {/* Body: left nav + main + right sidebar */}
            <div className="flex flex-1">

              {/* Left Nav */}
              <aside className="w-56 bg-[#f8fafc] border-r border-gray-200 shrink-0 hidden md:flex flex-col">
                <div className="px-4 py-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3 px-2">Navigation</div>
                  <nav className="space-y-1">
                    {demoNavItems.map((item) => {
                      const isActive = activePanel === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActivePanel(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-all duration-150 ease-out ${
                            isActive
                              ? "bg-[#3b82f6]/10 text-[#3b82f6] font-medium border-l-2 border-[#3b82f6]"
                              : "text-gray-600 hover:bg-gray-100 hover:border-l-2 hover:border-[#3b82f6]"
                          }`}
                        >
                          <NavIcon path={item.icon} />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>

                  <div className="mt-6">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3 px-2">Quick Actions</div>
                    <div className="space-y-1">
                      {["New Project", "Invite Member", "Export Report"].map((action) => (
                        <button
                          key={action}
                          className="w-full text-left px-3 py-2 text-xs text-gray-500 rounded-lg hover:bg-gray-100 hover:border-l-2 hover:border-[#3b82f6] active:scale-[0.98] transition-all duration-150"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1 p-5 md:p-6 min-w-0 bg-[#f1f5f9] overflow-auto">
                {activePanel === "dashboard" && <DashboardPanel />}
                {activePanel === "projects" && <ProjectsPanel />}
                {activePanel === "settings" && <SettingsPanel />}
              </main>

              {/* Right Sidebar */}
              <aside className="w-64 bg-[#f8fafc] border-l border-gray-200 shrink-0 hidden lg:flex flex-col p-4 overflow-y-auto">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-4">Activity</div>
                  <div className="space-y-4">
                    {activityFeed.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                          style={{ backgroundColor: a.color }}
                        >
                          {a.user[0]}
                        </div>
                        <div>
                          <div className="text-xs">
                            <span className="font-medium text-[#1e293b]">{a.user}</span>{" "}
                            <span className="text-gray-500">{a.action}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Team Online</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7"].map((color, i) => (
                      <div key={i} className="relative">
                        <div className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }} />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-white" />
                      </div>
                    ))}
                    <span className="text-[10px] text-gray-400">+3 more</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Storage</div>
                  <div className="text-xs text-gray-600 mb-2">14.2 GB of 20 GB used</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: "71%" }} />
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">71% used</div>
                </div>
              </aside>
            </div>

            {/* Demo footer */}
            <div className="bg-[#f8fafc] border-t border-gray-200 px-5 py-2.5 flex items-center justify-between shrink-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">AcmeHQ &copy; 2026</span>
              <div className="flex items-center gap-4">
                {["Privacy", "Terms", "Status"].map((link) => (
                  <span key={link} className="text-[10px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-150">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Click Dashboard, Projects, or Settings in the left nav to switch panels. Right sidebar shows live activity.
        </p>
      </section>

      {/* ================================================================ */}
      {/* 3. Layout anatomy — 5-zone diagram                               */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto" ref={anatomyRef}>
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Architecture</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Layout <span className="text-[#3b82f6]">anatomy</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md">
              Five distinct regions, each with a defined role. The main content appears first in HTML source order for SEO, even though it renders in the center column visually.
            </p>
          </RevealBlock>

          <div
            style={{
              opacity: anatomyInView ? 1 : 0,
              transform: anatomyInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            {/* Zone diagram */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-[#f1f5f9] p-3 md:p-4">
              {/* Zone 1: Header */}
              <div className="bg-[#1e293b] text-white rounded-xl px-5 py-4 mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/60 mb-0.5">Zone 1</div>
                  <div className="text-sm font-bold">Header</div>
                </div>
                <div className="text-right text-xs text-white/50">
                  <div>fixed top-0</div>
                  <div>z-50, h-14</div>
                  <div>full width</div>
                </div>
              </div>

              {/* Zones 2, 3, 4 */}
              <div className="flex gap-3 mb-3" style={{ minHeight: 220 }}>
                {/* Zone 2: Left nav */}
                <div className="w-44 bg-[#e2e8f0] rounded-xl p-4 flex flex-col border-2 border-[#3b82f6]/30 shrink-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Zone 2</div>
                  <div className="text-sm font-bold text-[#1e293b] mb-1">Left Nav</div>
                  <div className="space-y-1 text-[10px] text-gray-500">
                    <div className="font-mono">w-60 or w-64</div>
                    <div className="font-mono">flex-shrink-0</div>
                    <div className="font-mono">overflow-y-auto</div>
                    <div className="font-mono">bg-slate-50</div>
                  </div>
                  <div className="mt-3 text-[10px] text-[#3b82f6] font-semibold">Fixed width</div>
                  <div className="mt-auto space-y-1.5 pt-3">
                    {["Dashboard", "Projects", "Settings"].map((item) => (
                      <div key={item} className="h-5 bg-white/60 rounded flex items-center px-2">
                        <span className="text-[9px] text-gray-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zone 3: Main */}
                <div className="flex-1 bg-[#dbeafe] rounded-xl p-4 border-2 border-[#3b82f6]/50 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#3b82f6] mb-1">Zone 3 — SEO PRIORITY</div>
                  <div className="text-sm font-bold text-[#1e293b] mb-1">Main Content</div>
                  <div className="space-y-1 text-[10px] text-[#3b82f6]/80">
                    <div className="font-mono">flex-1</div>
                    <div className="font-mono">min-width: 0</div>
                    <div className="font-mono">overflow-auto</div>
                    <div className="font-mono bg-[#3b82f6]/10 px-1.5 py-0.5 rounded inline-block">First in HTML source</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-10 bg-white/60 rounded-lg" />
                    ))}
                  </div>
                  <div className="mt-2 h-16 bg-white/40 rounded-lg" />
                </div>

                {/* Zone 4: Right sidebar */}
                <div className="w-44 bg-[#e2e8f0] rounded-xl p-4 flex flex-col border-2 border-[#10b981]/30 shrink-0 hidden sm:flex">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Zone 4</div>
                  <div className="text-sm font-bold text-[#1e293b] mb-1">Right Sidebar</div>
                  <div className="space-y-1 text-[10px] text-gray-500">
                    <div className="font-mono">w-64 or w-72</div>
                    <div className="font-mono">flex-shrink-0</div>
                    <div className="font-mono">overflow-y-auto</div>
                  </div>
                  <div className="mt-3 text-[10px] text-[#10b981] font-semibold">Fixed width</div>
                  <div className="mt-auto space-y-2 pt-3">
                    {activityFeed.slice(0, 3).map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: a.color }} />
                        <div className="h-2 bg-white/60 rounded flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zone 5: Footer */}
              <div className="bg-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Zone 5</div>
                  <div className="text-sm font-bold text-gray-700">Footer</div>
                </div>
                <div className="text-right text-[10px] text-gray-500">
                  <div>border-t, bg-slate-50</div>
                  <div>full width below body</div>
                </div>
              </div>
            </div>
          </div>

          {/* Zone legend */}
          <div
            className="mt-6 flex flex-wrap gap-4"
            style={{
              opacity: anatomyInView ? 1 : 0,
              transform: anatomyInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            {[
              { label: "Header (Zone 1)", color: "#1e293b", text: "#fff" },
              { label: "Left Nav (Zone 2)", color: "#e2e8f0", text: "#1e293b", border: true },
              { label: "Main Content (Zone 3)", color: "#dbeafe", text: "#1e293b", border: true },
              { label: "Right Sidebar (Zone 4)", color: "#e2e8f0", text: "#1e293b", border: true },
              { label: "Footer (Zone 5)", color: "#d1d5db", text: "#1e293b", border: true },
            ].map((zone) => (
              <div key={zone.label} className="flex items-center gap-2">
                <span
                  className={`w-3.5 h-3.5 rounded ${zone.border ? "border border-gray-400" : ""}`}
                  style={{ backgroundColor: zone.color }}
                />
                <span className="text-xs text-gray-600">{zone.label}</span>
              </div>
            ))}
          </div>

          {/* HTML source order callout */}
          <div
            className="mt-8 bg-[#dbeafe] border border-[#3b82f6]/20 rounded-2xl p-6"
            style={{
              opacity: anatomyInView ? 1 : 0,
              transform: anatomyInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e293b] mb-1">SEO-first HTML order</div>
                <p className="text-sm text-[#1e293b]/70 leading-relaxed">
                  In the Holy Grail pattern, the <code className="bg-[#3b82f6]/10 px-1.5 py-0.5 rounded font-mono text-xs">&lt;main&gt;</code> element
                  appears first in the HTML source order — before the left nav and right sidebar — even though CSS places it in the center column.
                  This ensures search engines and screen readers encounter the primary content first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. Component demos — Button, Card, Nav link                      */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto" ref={componentsRef}>
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Components</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Interactive <span className="text-[#3b82f6]">elements</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md">
              Every interactive element in the Holy Grail layout follows a consistent physics model: hover lifts slightly, active presses in, focus shows a ring.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <div
            className="flex items-center gap-1 bg-white rounded-xl p-1 mb-8 w-fit border border-gray-200 shadow-sm"
            style={{
              opacity: componentsInView ? 1 : 0,
              transform: componentsInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s",
            }}
          >
            {(["button", "card", "nav"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 ease-out active:scale-[0.98] ${
                  componentTab === tab
                    ? "bg-[#3b82f6] text-white shadow-sm"
                    : "text-gray-500 hover:text-[#1e293b] hover:bg-gray-50"
                }`}
              >
                {tab === "nav" ? "Nav Link" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div
            style={{
              opacity: componentsInView ? 1 : 0,
              transform: componentsInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">

              {/* Button panel */}
              {componentTab === "button" && (
                <div className="space-y-8">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Primary actions</div>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg font-medium text-sm hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 active:scale-[0.98] active:bg-[#1d4ed8] active:translate-y-0 active:shadow-none transition-all duration-150 ease-out">
                        Save Changes
                      </button>
                      <button className="px-4 py-2 bg-[#10b981] text-white rounded-lg font-medium text-sm hover:bg-[#059669] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:ring-offset-2 active:scale-[0.98] active:translate-y-0 active:shadow-none transition-all duration-150 ease-out">
                        Publish
                      </button>
                      <button className="px-4 py-2 bg-[#ef4444] text-white rounded-lg font-medium text-sm hover:bg-[#dc2626] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:ring-offset-2 active:scale-[0.98] active:translate-y-0 transition-all duration-150 ease-out">
                        Delete
                      </button>
                      <button className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg font-medium text-sm hover:bg-[#d97706] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:ring-offset-2 active:scale-[0.98] active:translate-y-0 transition-all duration-150 ease-out">
                        Archive
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Secondary actions</div>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 border border-gray-200 text-[#1e293b] rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 active:scale-[0.98] active:translate-y-0 transition-all duration-150 ease-out">
                        Cancel
                      </button>
                      <button className="px-4 py-2 border border-[#3b82f6]/30 text-[#3b82f6] rounded-lg font-medium text-sm hover:bg-[#3b82f6]/5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 active:scale-[0.98] active:translate-y-0 transition-all duration-150 ease-out">
                        View Report
                      </button>
                      <button className="px-4 py-2 text-[#3b82f6] font-medium text-sm hover:bg-[#3b82f6]/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 active:scale-[0.98] transition-all duration-150 ease-out">
                        Learn more
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Size variants</div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button className="px-2.5 py-1 bg-[#3b82f6] text-white rounded text-xs font-medium hover:bg-[#2563eb] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 transition-all duration-150 ease-out">xs</button>
                      <button className="px-3 py-1.5 bg-[#3b82f6] text-white rounded-md text-sm font-medium hover:bg-[#2563eb] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1 transition-all duration-150 ease-out">sm</button>
                      <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-[#2563eb] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 transition-all duration-150 ease-out">md</button>
                      <button className="px-5 py-2.5 bg-[#3b82f6] text-white rounded-xl text-base font-medium hover:bg-[#2563eb] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 transition-all duration-150 ease-out">lg</button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Button physics rule</div>
                    <code className="text-[11px] text-gray-500 font-mono leading-relaxed block">
                      hover: -translate-y-0.5 + shadow<br />
                      active: scale-[0.98] + translate-y-0 + shadow-none<br />
                      focus: ring-2 ring-[accent] ring-offset-2<br />
                      transition: all duration-150 ease-out
                    </code>
                  </div>
                </div>
              )}

              {/* Card panel */}
              {componentTab === "card" && (
                <div className="space-y-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Content cards — hover:-translate-y-0.5 hover:shadow-md (minimal displacement)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "API Gateway", desc: "Manage authentication, rate limiting, and routing for microservices.", color: "#3b82f6", tag: "Active" },
                      { title: "Monitoring", desc: "Real-time metrics and log aggregation across your infrastructure.", color: "#10b981", tag: "Healthy" },
                      { title: "CI/CD Pipeline", desc: "Automated builds, testing, and deployment with zero-downtime.", color: "#f59e0b", tag: "Running" },
                      { title: "Database Admin", desc: "Query builder, migration tools, and performance diagnostics.", color: "#ef4444", tag: "Attention" },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.color}15` }}>
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                            </div>
                            <h4 className="font-semibold text-[#1e293b] text-sm group-hover:text-[#3b82f6] transition-colors duration-150">{c.title}</h4>
                          </div>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${c.color}10`, color: c.color }}
                          >
                            {c.tag}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ backgroundColor: c.color, width: c.tag === "Active" ? "65%" : c.tag === "Healthy" ? "90%" : c.tag === "Running" ? "45%" : "30%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Card hover rule</div>
                    <code className="text-[11px] text-gray-500 font-mono">
                      hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out
                    </code>
                    <p className="text-xs text-gray-400 mt-1">Maximum -translate-y-0.5 (2px). Never use -translate-y-1 or larger — creates excessive displacement.</p>
                  </div>
                </div>
              )}

              {/* Nav link panel */}
              {componentTab === "nav" && (
                <div className="space-y-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Sidebar nav link states — border-l-2 highlight ONLY, no vertical displacement
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-3">All states</div>
                      <div className="bg-[#f8fafc] rounded-xl p-4 border border-gray-200 space-y-1">
                        {/* Default */}
                        <div className="flex items-center gap-3 px-3 py-2 text-gray-600 text-sm rounded-lg">
                          <div className="w-4 h-4 bg-gray-300 rounded" />
                          <span>Analytics</span>
                          <span className="ml-auto text-[10px] text-gray-300 font-mono">default</span>
                        </div>
                        {/* Hover */}
                        <div className="flex items-center gap-3 px-3 py-2 text-gray-700 text-sm rounded-lg bg-gray-100 border-l-2 border-[#3b82f6]">
                          <div className="w-4 h-4 bg-[#3b82f6]/40 rounded" />
                          <span>Team</span>
                          <span className="ml-auto text-[10px] text-[#3b82f6]/50 font-mono">hover</span>
                        </div>
                        {/* Active */}
                        <div className="flex items-center gap-3 px-3 py-2 text-[#3b82f6] text-sm rounded-lg bg-[#3b82f6]/10 border-l-2 border-[#3b82f6] font-medium">
                          <div className="w-4 h-4 bg-[#3b82f6] rounded" />
                          <span>Dashboard</span>
                          <span className="ml-auto text-[10px] text-[#3b82f6]/50 font-mono">active</span>
                        </div>
                        {/* Focus */}
                        <div className="flex items-center gap-3 px-3 py-2 text-gray-600 text-sm rounded-lg outline-none ring-2 ring-[#3b82f6]/30">
                          <div className="w-4 h-4 bg-gray-300 rounded" />
                          <span>Reports</span>
                          <span className="ml-auto text-[10px] text-gray-300 font-mono">focus</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-3">Key rules</div>
                      <div className="space-y-3">
                        <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl p-4">
                          <div className="text-xs font-semibold text-[#10b981] mb-2">DO: Border-left only</div>
                          <code className="text-[10px] text-gray-600 font-mono block leading-relaxed">
                            hover:border-l-2<br />
                            hover:border-[#3b82f6]<br />
                            hover:bg-gray-100<br />
                            transition-all duration-150
                          </code>
                        </div>
                        <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl p-4">
                          <div className="text-xs font-semibold text-[#ef4444] mb-2">NEVER: Vertical displacement</div>
                          <code className="text-[10px] text-gray-400 font-mono line-through block leading-relaxed">
                            hover:-translate-y-0.5<br />
                            hover:-translate-y-1<br />
                            hover:mt-[-2px]
                          </code>
                          <p className="text-[10px] text-gray-500 mt-2">Nav links must not shift vertically. It disrupts layout flow and causes visual jumping as users scan the menu.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. Responsive behavior                                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto" ref={responsiveRef}>
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Responsive</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Adaptive <span className="text-[#f59e0b]">behavior</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md">
              At three breakpoints the Holy Grail layout gracefully collapses: the right sidebar hides at medium screens, then the left nav hides on mobile.
            </p>
          </RevealBlock>

          {/* Viewport toggle */}
          <div
            className="flex items-center gap-1 bg-[#f1f5f9] rounded-xl p-1 mb-8 w-fit border border-gray-200 shadow-sm"
            style={{
              opacity: responsiveInView ? 1 : 0,
              transform: responsiveInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s",
            }}
          >
            {(["desktop", "tablet", "mobile"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewportMode(mode)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-150 ease-out active:scale-[0.98] ${
                  viewportMode === mode
                    ? "bg-white text-[#1e293b] shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-[#1e293b]"
                }`}
              >
                {mode === "desktop" ? "Desktop (lg+)" : mode === "tablet" ? "Tablet (md)" : "Mobile (<md)"}
              </button>
            ))}
          </div>

          <div
            style={{
              opacity: responsiveInView ? 1 : 0,
              transform: responsiveInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            {viewportMode === "desktop" && <DesktopPreview />}
            {viewportMode === "tablet" && <TabletPreview />}
            {viewportMode === "mobile" && <MobilePreview />}
          </div>

          {/* Breakpoint table */}
          <div
            className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            style={{
              opacity: responsiveInView ? 1 : 0,
              transform: responsiveInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Breakpoint</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Left Nav</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Right Sidebar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Main Content</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { bp: "Desktop (lg+, 1024px+)", left: "w-60, always visible", right: "w-64, always visible", main: "flex-1, center column" },
                  { bp: "Tablet (md, 768–1023px)", left: "w-60, visible (icon-only option)", right: "hidden (lg:block)", main: "flex-1, wider" },
                  { bp: "Mobile (<md, <768px)", left: "hidden (hamburger drawer)", right: "hidden", main: "full width, stacked" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-xs font-medium text-[#1e293b]">{row.bp}</td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-[#3b82f6]">{row.left}</code>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 hidden sm:table-cell">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-[#10b981]">{row.right}</code>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 hidden md:table-cell">{row.main}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. Color system                                                   */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto" ref={colorsRef}>
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Palette</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Color <span className="text-[#3b82f6]">system</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md">
              A functional eight-token palette built on Slate and four accent colors. Each token has a defined semantic role within the layout zones.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {colorTokens.map((c, i) => (
              <div
                key={c.name}
                className="group cursor-pointer"
                style={{
                  opacity: colorsInView ? 1 : 0,
                  transform: colorsInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
                }}
              >
                <div
                  className="w-full aspect-[4/3] rounded-xl mb-3 group-hover:scale-[1.03] group-hover:shadow-md transition-all duration-150 ease-out flex items-end p-3"
                  style={{
                    backgroundColor: c.hex,
                    border: c.light ? "1px solid #e2e8f0" : "none",
                  }}
                >
                  <span
                    className="text-[10px] font-mono opacity-70"
                    style={{ color: c.light ? "#1e293b" : "#ffffff" }}
                  >
                    {c.hex}
                  </span>
                </div>
                <div className="font-semibold text-sm text-[#1e293b]">{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.role}</div>
              </div>
            ))}
          </div>

          {/* Semantic role callouts */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{
              opacity: colorsInView ? 1 : 0,
              transform: colorsInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              {
                title: "Layout zones",
                items: [
                  { swatch: "#1e293b", label: "Primary Dark", desc: "Header bg, footer text, primary headings" },
                  { swatch: "#f1f5f9", label: "Surface", desc: "Main content area background (slate-100)" },
                  { swatch: "#ffffff", label: "White", desc: "Card and panel backgrounds" },
                  { swatch: "#e2e8f0", label: "Border", desc: "Column dividers, card outlines" },
                ],
              },
              {
                title: "Accent colors (semantic)",
                items: [
                  { swatch: "#3b82f6", label: "Blue", desc: "Active nav state, CTAs, links, focus rings" },
                  { swatch: "#10b981", label: "Emerald", desc: "Success, positive metrics, online indicators" },
                  { swatch: "#f59e0b", label: "Amber", desc: "Warnings, neutral change, planning status" },
                  { swatch: "#ef4444", label: "Red", desc: "Errors, danger actions, negative trends" },
                ],
              },
            ].map((group) => (
              <div key={group.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-sm font-bold text-[#1e293b] mb-4">{group.title}</h4>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg shrink-0 border border-gray-100" style={{ backgroundColor: item.swatch }} />
                      <div>
                        <div className="text-xs font-semibold text-[#1e293b]">{item.label}</div>
                        <div className="text-[10px] text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. Design rules — Do / Don't                                      */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto" ref={rulesRef}>
          <RevealBlock className="mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Guidelines</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Design <span className="text-[#3b82f6]">rules</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-md">
              The Holy Grail layout has clear invariants. Violating them breaks the equal-height column guarantee or disrupts the reading flow.
            </p>
          </RevealBlock>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
            style={{
              opacity: rulesInView ? 1 : 0,
              transform: rulesInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <RevealBlock>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-full">
                <h3 className="text-base font-bold text-[#10b981] mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Do
                </h3>
                <ul className="space-y-4">
                  {[
                    { rule: "Use CSS Grid or Flexbox for equal-height 3 columns", note: "Never floats or absolute positioning for columns" },
                    { rule: "Sticky header at top-0 with z-50", note: "Users always see the primary nav and branding" },
                    { rule: "Main content uses flex-1 (self-adapting width)", note: "Sidebar widths are fixed; main takes remaining space" },
                    { rule: "Left nav: w-60 or w-64, fixed and non-resizable", note: "Sidebar width must not change with content length" },
                    { rule: "Right sidebar: w-64 or w-72, fixed width", note: "Same principle — fixed width regardless of content" },
                    { rule: "Collapse right sidebar at md, left nav at <md", note: "Responsive priority: main content is always visible" },
                    { rule: "Card hover: -translate-y-0.5 hover:shadow-md", note: "Minimal lift — content supremacy principle" },
                    { rule: "All transitions duration-150 ease-out", note: "Crisp performance — never exceed duration-200" },
                    { rule: "active:scale-[0.98] on all interactive buttons", note: "Button physics: press confirms the action" },
                  ].map((item) => (
                    <li key={item.rule} className="flex items-start gap-3">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0 mt-2" />
                      <div>
                        <div className="text-sm text-[#1e293b] font-medium">{item.rule}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 h-full">
                <h3 className="text-base font-bold text-[#ef4444] mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#ef4444] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  Don&apos;t
                </h3>
                <ul className="space-y-4">
                  {[
                    { rule: "Allow columns to have unequal heights", note: "Equal-height is the defining feature of holy grail" },
                    { rule: "Make main content area too narrow (<480px)", note: "Content must always be primary real estate" },
                    { rule: "Let sidebar width change based on content length", note: "Sidebars must be fixed-width at all times" },
                    { rule: "Skip responsive collapse of sidebars", note: "Mobile users need full-width content area" },
                    { rule: "Use non-sticky or scrolling-away header", note: "Header provides persistent orientation" },
                    { rule: "Add vertical displacement to sidebar nav links", note: "Nav links: border-l-2 highlight ONLY, no translate-y" },
                    { rule: "Use -translate-y-1 or larger on card hover", note: "Large displacement is distracting — use 0.5 max" },
                    { rule: "Exceed duration-200 on any transition", note: "Over 200ms feels sluggish for layout interactions" },
                    { rule: "Omit active:scale-[0.98] from buttons", note: "Without press physics, buttons feel unresponsive" },
                  ].map((item) => (
                    <li key={item.rule} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                      <div>
                        <div className="text-sm text-[#1e293b] font-medium">{item.rule}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Visual do/don't examples */}
          <RevealBlock delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DO: Equal height columns */}
              <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-2xl p-6">
                <div className="text-xs font-bold text-[#10b981] uppercase tracking-wider mb-3">Do: Equal-height columns</div>
                <div className="flex gap-2" style={{ height: 100 }}>
                  <div className="w-20 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg flex items-center justify-center text-[9px] text-[#10b981] font-mono">Left Nav</div>
                  <div className="flex-1 bg-[#10b981]/20 border border-[#10b981]/40 rounded-lg flex items-center justify-center text-[9px] text-[#10b981] font-mono font-bold">Main (flex-1)</div>
                  <div className="w-24 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg flex items-center justify-center text-[9px] text-[#10b981] font-mono">Right</div>
                </div>
                <p className="text-xs text-gray-500 mt-3">All three columns stretch to the same height using <code className="font-mono text-[#10b981]">align-items: stretch</code>.</p>
              </div>

              {/* DON'T: Unequal columns */}
              <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-2xl p-6">
                <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider mb-3">Don&apos;t: Unequal column heights</div>
                <div className="flex gap-2 items-start" style={{ height: 100 }}>
                  <div className="w-20 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg flex items-center justify-center text-[9px] text-[#ef4444] font-mono" style={{ height: 60 }}>Left Nav</div>
                  <div className="flex-1 bg-[#ef4444]/20 border border-[#ef4444]/40 rounded-lg flex items-center justify-center text-[9px] text-[#ef4444] font-mono font-bold h-full">Main</div>
                  <div className="w-24 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg flex items-center justify-center text-[9px] text-[#ef4444] font-mono" style={{ height: 40 }}>Right</div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Short sidebar content leaves visible gaps — the classic layout bug holy grail solves.</p>
              </div>

              {/* DO: Nav link border-l only */}
              <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/20 rounded-2xl p-6">
                <div className="text-xs font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Do: Nav link hover — border-l-2 only</div>
                <div className="space-y-1">
                  {["Dashboard", "Projects", "Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        i === 1
                          ? "bg-[#3b82f6]/10 text-[#3b82f6] border-l-2 border-[#3b82f6]"
                          : "text-gray-600"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded ${i === 1 ? "bg-[#3b82f6]" : "bg-gray-300"}`} />
                      {item}
                      {i === 1 && <span className="ml-auto text-[10px] text-[#3b82f6]/60 font-mono">border-l-2</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* DON'T: Nav link with vertical shift */}
              <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-2xl p-6">
                <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider mb-3">Don&apos;t: Nav link hover — vertical displacement</div>
                <div className="space-y-1">
                  {["Dashboard", "Projects", "Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        i === 1
                          ? "bg-[#ef4444]/10 text-[#ef4444] -translate-y-0.5"
                          : "text-gray-600"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded ${i === 1 ? "bg-[#ef4444]" : "bg-gray-300"}`} />
                      {item}
                      {i === 1 && <span className="ml-auto text-[10px] text-[#ef4444]/60 font-mono line-through">-translate-y-0.5</span>}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Vertical shift causes layout jumping as the user moves through menu items.</p>
              </div>
            </div>
          </RevealBlock>

          {/* Layout specs summary */}
          <RevealBlock delay={0.3} className="mt-10">
            <div className="bg-[#1e293b] rounded-2xl p-8 text-white">
              <h4 className="text-base font-bold mb-6">Layout specification tokens</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Left nav width", value: "w-60 / w-64", sub: "240px or 256px, fixed" },
                  { label: "Right sidebar width", value: "w-64 / w-72", sub: "256px or 288px, fixed" },
                  { label: "Header height", value: "h-14", sub: "56px, sticky top-0 z-50" },
                  { label: "Transition speed", value: "duration-150", sub: "ease-out, never exceed 200" },
                  { label: "Card hover lift", value: "-translate-y-0.5", sub: "2px maximum" },
                  { label: "Button active scale", value: "scale-[0.98]", sub: "Required on all buttons" },
                  { label: "Focus ring", value: "ring-2 ring-[accent]", sub: "ring-offset-2 on buttons" },
                  { label: "Main content", value: "flex-1 min-w-0", sub: "Adaptive, never fixed" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <div className="text-xs text-white/50 mb-1">{spec.label}</div>
                    <div className="text-lg font-bold text-white font-mono">{spec.value}</div>
                    <div className="text-xs text-white/40 mt-0.5">{spec.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. Footer                                                         */}
      {/* ================================================================ */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="text-sm font-bold text-[#1e293b] mb-1">
                Holy<span className="text-[#3b82f6]">Grail</span> Layout
              </div>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                The classic 5-zone web layout pattern — part of StyleKit, a curated library of production-ready UI design styles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/styles/holy-grail-layout"
                  className="text-sm text-gray-500 hover:text-[#1e293b] transition-colors duration-150"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles"
                  className="text-sm text-gray-500 hover:text-[#1e293b] transition-colors duration-150"
                >
                  All Styles
                </Link>
              </div>
              <Link
                href="/styles"
                className="px-4 py-2 bg-[#1e293b] text-white text-sm font-medium rounded-lg hover:bg-[#334155] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:ring-offset-2 transition-all duration-150 ease-out"
              >
                Browse Styles
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-400">StyleKit &copy; 2026</span>
              <span className="text-xs text-gray-300">Holy Grail Layout Showcase</span>
            </div>
            <div className="flex items-center gap-2">
              {["#1e293b", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                <div key={color} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
