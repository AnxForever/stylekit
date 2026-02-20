"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & components – ZERO @/components/showcase imports     */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navItems = [
  { label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: true },
  { label: "Projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", active: false },
  { label: "Team", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", active: false },
  { label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", active: false },
  { label: "Documents", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", active: false },
  { label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", active: false },
];

const metrics = [
  { label: "Total Revenue", value: "$48,320", change: "+12.5%", positive: true, color: "#3b82f6" },
  { label: "Active Users", value: "2,847", change: "+8.2%", positive: true, color: "#10b981" },
  { label: "Bounce Rate", value: "24.3%", change: "-3.1%", positive: true, color: "#f59e0b" },
  { label: "Avg Session", value: "4m 32s", change: "-0.8%", positive: false, color: "#ef4444" },
];

const activities = [
  { user: "Alex M.", action: "deployed v2.4.1", time: "2 min ago", color: "#10b981" },
  { user: "Sarah K.", action: "merged PR #847", time: "15 min ago", color: "#3b82f6" },
  { user: "James T.", action: "created new branch", time: "1 hr ago", color: "#f59e0b" },
  { user: "Mika R.", action: "resolved 3 issues", time: "2 hr ago", color: "#a855f7" },
  { user: "Jordan L.", action: "updated docs", time: "3 hr ago", color: "#ec4899" },
];

const tableRows = [
  { project: "StyleKit Core", status: "Active", progress: 78, lead: "Sarah K." },
  { project: "API Gateway", status: "In Review", progress: 92, lead: "James T." },
  { project: "Mobile App", status: "Active", progress: 45, lead: "Mika R." },
  { project: "Design System", status: "Planning", progress: 15, lead: "Alex M." },
];

const palette = [
  { name: "Primary Dark", hex: "#1e293b" },
  { name: "Surface", hex: "#f1f5f9" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Green", hex: "#10b981" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Red", hex: "#ef4444" },
  { name: "White", hex: "#ffffff" },
  { name: "Border", hex: "#e2e8f0" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b]">
      <style>{`
        .hg-link { position: relative; }
        .hg-link::after {
          content:'';position:absolute;width:100%;transform:scaleX(0);height:2px;
          bottom:-2px;left:0;background:#3b82f6;transform-origin:bottom right;
          transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .hg-link:hover::after { transform:scaleX(1);transform-origin:bottom left; }
        @keyframes hg-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      {/* ===== Fixed Nav (Holy Grail Header) ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-150 md:hidden"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/styles/holy-grail-layout/showcase" className="text-lg font-bold tracking-tight">
              Holy<span className="text-[#3b82f6]">Grail</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/styles/holy-grail-layout" className="text-sm text-gray-500 hover:text-[#1e293b] hg-link pb-0.5 transition-colors">
              Docs
            </Link>
            <Link href="/styles" className="text-sm text-gray-500 hover:text-[#1e293b] hg-link pb-0.5 transition-colors">
              Styles
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* ===== HERO: Holy Grail Live Demo ===== */}
      <section className="pt-20 pb-0">
        <div className="px-6 md:px-12 max-w-7xl mx-auto pt-8 pb-16">
          <div
            className="text-center mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-4">Holy Grail Layout</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6">
              The classic
              <br />
              <span className="text-[#3b82f6]">five-region</span> layout.
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Header, left sidebar, main content, right sidebar, footer -- the most sought-after layout pattern in web design, finally tamed with modern CSS.
            </p>
          </div>

          {/* Live Holy Grail Demo */}
          <div
            className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* Demo header */}
            <div className="bg-[#1e293b] text-white px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                </div>
                <span className="ml-2 text-white/60">HEADER</span>
              </div>
              <span className="text-white/40 font-mono">holy-grail-layout.tsx</span>
            </div>
            {/* Demo body: 3 columns */}
            <div className="flex min-h-[320px]">
              {/* Left sidebar */}
              <div className="w-44 bg-[#f8fafc] border-r border-gray-200 p-4 hidden md:flex flex-col gap-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">LEFT NAV</div>
                {["Dashboard", "Projects", "Team", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`text-xs px-3 py-2 rounded-lg transition-all duration-150 ${
                      i === 0
                        ? "bg-[#3b82f6]/10 text-[#3b82f6] font-medium"
                        : "text-gray-500 hover:bg-gray-100 hover:border-l-2 hover:border-[#3b82f6]"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {/* Main content */}
              <div className="flex-1 p-6">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">MAIN CONTENT</div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#3b82f6]/5 rounded-xl p-4 border border-[#3b82f6]/10">
                    <div className="text-xs text-gray-500 mb-1">Users</div>
                    <div className="text-xl font-bold text-[#1e293b]">2,847</div>
                  </div>
                  <div className="bg-[#10b981]/5 rounded-xl p-4 border border-[#10b981]/10">
                    <div className="text-xs text-gray-500 mb-1">Revenue</div>
                    <div className="text-xl font-bold text-[#10b981]">$48.3k</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 h-20 flex items-center justify-center text-xs text-gray-400">
                  Content area (flex-1, self-adapting width)
                </div>
              </div>
              {/* Right sidebar */}
              <div className="w-48 bg-[#f8fafc] border-l border-gray-200 p-4 hidden lg:block">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">RIGHT SIDEBAR</div>
                <div className="space-y-3 text-xs text-gray-500">
                  <div className="pb-2 border-b border-gray-100">New deployment</div>
                  <div className="pb-2 border-b border-gray-100">PR merged</div>
                  <div>Issue resolved</div>
                </div>
              </div>
            </div>
            {/* Demo footer */}
            <div className="bg-[#f8fafc] border-t border-gray-200 px-4 py-2 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">FOOTER</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Full Dashboard Demo with Holy Grail ===== */}
      <section className="pb-24 md:pb-32">
        <div className="flex min-h-[600px] border-t border-gray-200">
          {/* Left Sidebar */}
          <aside className={`${sidebarOpen ? "w-60" : "w-0"} bg-white border-r border-gray-200 flex-shrink-0 overflow-hidden transition-all duration-150 ease-out hidden md:block`}>
            <div className="p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 px-3">Navigation</div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                      item.active
                        ? "bg-[#3b82f6]/10 text-[#3b82f6] font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:border-l-2 hover:border-[#3b82f6]"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 min-w-0">
            <RevealBlock>
              <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
              <p className="text-sm text-gray-500 mb-6">Welcome back. Here is what is happening today.</p>
            </RevealBlock>

            {/* Metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metrics.map((m, i) => (
                <RevealBlock key={m.label} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 font-medium">{m.label}</span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${m.color}10` }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#1e293b] mb-1">{m.value}</div>
                    <div className={`text-xs font-medium ${m.positive ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                      {m.change} from last month
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>

            {/* Table */}
            <RevealBlock delay={0.2}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Active Projects</h3>
                  <button className="text-xs text-[#3b82f6] font-medium hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-50 text-left">
                        <th className="px-6 py-3 font-medium text-gray-500 text-xs">Project</th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-xs">Status</th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-xs">Progress</th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-xs">Lead</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row) => (
                        <tr key={row.project} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-150">
                          <td className="px-6 py-3 font-medium text-[#1e293b]">{row.project}</td>
                          <td className="px-6 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              row.status === "Active" ? "bg-[#10b981]/10 text-[#10b981]" :
                              row.status === "In Review" ? "bg-[#3b82f6]/10 text-[#3b82f6]" :
                              "bg-gray-100 text-gray-500"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#3b82f6] rounded-full transition-all duration-500" style={{ width: `${row.progress}%` }} />
                              </div>
                              <span className="text-xs text-gray-400 w-8">{row.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-gray-500">{row.lead}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </RevealBlock>
          </main>

          {/* Right Sidebar */}
          <aside className="w-64 bg-white border-l border-gray-200 flex-shrink-0 hidden lg:block p-5 overflow-y-auto">
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Recent Activity</h4>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 shrink-0" style={{ backgroundColor: a.color }}>
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

            <div className="border-t border-gray-100 pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {["New Project", "Invite Member", "Generate Report"].map((action) => (
                  <button
                    key={action}
                    className="w-full text-left px-3 py-2 text-xs text-gray-600 rounded-lg hover:bg-gray-50 hover:border-l-2 hover:border-[#3b82f6] active:scale-[0.98] transition-all duration-150"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Component Demos (tab-switched) ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Components</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Interactive <span className="text-[#3b82f6]">elements</span>
            </h2>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="flex gap-2">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-150 ${
                    activeTab === tab
                      ? "bg-[#3b82f6] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="bg-[#f1f5f9] rounded-2xl p-8 md:p-12 border border-gray-200">
              {activeTab === "button" && (
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg font-medium text-sm hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 active:scale-[0.98] active:bg-[#1d4ed8] active:translate-y-0 active:shadow-none transition-all duration-150 ease-out">
                    Primary
                  </button>
                  <button className="px-4 py-2 bg-[#10b981] text-white rounded-lg font-medium text-sm hover:bg-[#059669] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(16,185,129,0.4)] active:scale-[0.98] active:translate-y-0 active:shadow-none transition-all duration-150 ease-out">
                    Success
                  </button>
                  <button className="px-4 py-2 bg-[#ef4444] text-white rounded-lg font-medium text-sm hover:bg-[#dc2626] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-150 ease-out">
                    Danger
                  </button>
                  <button className="px-4 py-2 border border-gray-200 text-[#1e293b] rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-150 ease-out">
                    Secondary
                  </button>
                  <button className="px-4 py-2 text-[#3b82f6] font-medium text-sm hover:bg-[#3b82f6]/5 rounded-lg active:scale-[0.98] transition-all duration-150 ease-out">
                    Ghost
                  </button>
                </div>
              )}
              {activeTab === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "API Gateway", desc: "Manage authentication, rate limiting, and routing for all microservices.", color: "#3b82f6" },
                    { title: "Monitoring", desc: "Real-time metrics, alerts, and log aggregation across your infrastructure.", color: "#10b981" },
                    { title: "CI/CD Pipeline", desc: "Automated builds, testing, and deployment with zero-downtime releases.", color: "#f59e0b" },
                    { title: "Database Admin", desc: "Query builder, migration tools, and performance diagnostics.", color: "#ef4444" },
                  ].map((c) => (
                    <div key={c.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}15` }}>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                        </div>
                        <h4 className="font-semibold text-sm text-[#1e293b]">{c.title}</h4>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "input" && (
                <div className="max-w-md space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Search</label>
                    <input type="text" placeholder="Search..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1e293b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" placeholder="you@company.com" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#1e293b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea rows={3} placeholder="Describe the issue..." className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#1e293b] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6] transition-all resize-none" />
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Palette</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Color <span className="text-[#3b82f6]">system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {palette.map((c) => (
                <div key={c.name} className="group cursor-pointer">
                  <div
                    className="w-full aspect-[3/2] rounded-xl mb-3 group-hover:scale-[1.03] group-hover:shadow-md transition-all duration-150"
                    style={{ backgroundColor: c.hex, border: c.hex === "#ffffff" || c.hex === "#f1f5f9" || c.hex === "#e2e8f0" ? "1px solid #e2e8f0" : "none" }}
                  />
                  <div className="font-medium text-sm text-[#1e293b]">{c.name}</div>
                  <div className="text-xs text-gray-400 uppercase">{c.hex}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3b82f6] mb-3 block">Guidelines</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Design <span className="text-[#3b82f6]">rules</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock>
              <h3 className="text-lg font-bold text-[#10b981] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Do
              </h3>
              <ul className="space-y-4">
                {[
                  "Use CSS Grid or Flexbox for equal-height columns",
                  "Sticky header and footer for persistent navigation",
                  "Main content area uses flex-1 for adaptive width",
                  "Fixed-width sidebars (w-60 left, w-64 right)",
                  "Main content appears first in source order for SEO",
                  "Collapse sidebars responsively on smaller screens",
                  "Cards: hover:-translate-y-0.5 hover:shadow-md (minimal float)",
                  "All transitions duration-150 ease-out (crisp response)",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <h3 className="text-lg font-bold text-[#ef4444] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Don&apos;t
              </h3>
              <ul className="space-y-4">
                {[
                  "Allow columns to have unequal heights",
                  "Make the main content area too narrow",
                  "Ignore responsive sidebar collapse",
                  "Let sidebar width change with content",
                  "Use non-sticky header and footer",
                  "Use large displacement animations on cards",
                  "Exceed duration-200 for any interactive element",
                  "Add vertical displacement to sidebar nav links",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>

          {/* Layout anatomy */}
          <RevealBlock delay={0.3} className="mt-16">
            <div className="bg-[#f1f5f9] rounded-2xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-lg font-bold mb-8">Layout Anatomy</h3>
              <div className="space-y-3">
                <div className="bg-[#1e293b] text-white rounded-xl px-6 py-3 text-sm font-medium text-center">
                  Header (sticky top-0, z-50)
                </div>
                <div className="flex gap-3 min-h-[200px]">
                  <div className="w-40 bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-center text-sm text-gray-500 font-medium">
                    Left Nav (w-60)
                  </div>
                  <div className="flex-1 bg-[#3b82f6]/5 rounded-xl p-4 border border-[#3b82f6]/20 flex items-center justify-center text-sm text-[#3b82f6] font-medium">
                    Main Content (flex-1)
                  </div>
                  <div className="w-44 bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-center text-sm text-gray-500 font-medium hidden md:flex">
                    Right Sidebar (w-64)
                  </div>
                </div>
                <div className="bg-gray-200 rounded-xl px-6 py-3 text-sm font-medium text-center text-gray-600">
                  Footer (border-t, sticky bottom or flow)
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-400">StyleKit</span>
              <span className="text-xs text-gray-300">Holy Grail Layout Showcase</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/styles/holy-grail-layout" className="text-sm text-gray-500 hover:text-[#1e293b] hg-link pb-0.5 transition-colors">
                Documentation
              </Link>
              <Link href="/styles" className="text-sm text-gray-500 hover:text-[#1e293b] hg-link pb-0.5 transition-colors">
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
