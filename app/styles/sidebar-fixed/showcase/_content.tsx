"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  FileText,
  Folder,
  HelpCircle,
  LogOut,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Activity,
  Shield,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Inline hooks — no external imports
// ---------------------------------------------------------------------------

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const navItems = [
  { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
  { id: "analytics", icon: BarChart3, label: "Analytics", badge: null },
  { id: "users", icon: Users, label: "Users", badge: 3 },
  { id: "reports", icon: FileText, label: "Reports", badge: null },
  { id: "projects", icon: Folder, label: "Projects", badge: null },
  { id: "security", icon: Shield, label: "Security", badge: null },
];

const secondaryNavItems = [
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "help", icon: HelpCircle, label: "Help & Support" },
];

const stats = [
  {
    label: "Total Revenue",
    value: "$124,500",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    color: "#3b82f6",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    label: "Active Users",
    value: "8,420",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
    color: "#10b981",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    label: "Orders",
    value: "1,234",
    change: "-2.4%",
    trend: "down" as const,
    icon: ShoppingCart,
    color: "#ef4444",
    bg: "bg-red-50",
    text: "text-red-500",
  },
  {
    label: "Growth Rate",
    value: "23.5%",
    change: "+4.1%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "#f59e0b",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
];

const recentActivity = [
  {
    initials: "SC",
    user: "Sarah Chen",
    action: "completed project review",
    time: "2 min ago",
    color: "bg-blue-100 text-blue-700",
  },
  {
    initials: "MJ",
    user: "Mike Johnson",
    action: "uploaded new documents",
    time: "15 min ago",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "ED",
    user: "Emily Davis",
    action: "joined the team",
    time: "1 hour ago",
    color: "bg-purple-100 text-purple-700",
  },
  {
    initials: "AT",
    user: "Alex Thompson",
    action: "submitted quarterly report",
    time: "3 hours ago",
    color: "bg-amber-100 text-amber-700",
  },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ShowcaseContent() {
  // Hero reveal
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Demo interactive state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Section observers
  const { ref: demoRef, inView: demoInView } = useInView();
  const { ref: specsRef, inView: specsInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: responsiveRef, inView: responsiveInView } = useInView();
  const { ref: codeRef, inView: codeInView } = useInView();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">

      {/* ------------------------------------------------------------------ */}
      {/* TOP NAV BAR                                                          */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-semibold text-zinc-900 hover:text-blue-600 transition-colors"
            >
              StyleKit
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-300" />
            <Link
              href="/styles"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Styles
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-300" />
            <Link
              href="/styles/sidebar-fixed"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Fixed Sidebar
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-300" />
            <span className="text-sm text-zinc-400">Showcase</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/styles/sidebar-fixed"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-1.5 hover:bg-zinc-100 rounded-md"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="text-sm font-medium text-white bg-[#1e293b] hover:bg-[#334155] px-3 py-1.5 rounded-md transition-colors"
            >
              All Styles
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-br from-[#1e293b] to-[#334155] text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealBlock inView={heroRevealed} delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-white/80 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Layout Pattern
            </div>
          </RevealBlock>

          <RevealBlock inView={heroRevealed} delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Fixed Sidebar Layout
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              Persistent navigation with maximum content space. The standard pattern for admin dashboards, documentation sites, and SaaS applications.
            </p>
          </RevealBlock>

          <RevealBlock inView={heroRevealed} delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Admin Dashboard", "Documentation", "SaaS App", "Analytics", "CMS"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealBlock>

          {/* Mini diagram */}
          <RevealBlock inView={heroRevealed} delay={0.3}>
            <div className="mt-12 inline-flex items-stretch rounded-xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm">
              {/* Sidebar strip */}
              <div className="w-16 sm:w-24 bg-white/10 border-r border-white/20 py-4 px-3 flex flex-col gap-2">
                <div className="w-6 h-6 bg-blue-400 rounded-md mx-auto mb-2" />
                <div className="h-2 bg-blue-400/80 rounded" />
                <div className="h-2 bg-white/20 rounded" />
                <div className="h-2 bg-white/20 rounded" />
                <div className="h-2 bg-white/20 rounded" />
                <div className="h-2 bg-white/20 rounded" />
                <div className="flex-1" />
                <div className="h-2 bg-white/20 rounded" />
                <div className="h-2 bg-white/20 rounded" />
              </div>
              {/* Content strip */}
              <div className="w-48 sm:w-72 py-4 px-4 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="h-3 w-20 bg-white/30 rounded" />
                  <div className="h-3 w-8 bg-white/20 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-8 bg-blue-400/30 rounded" />
                  <div className="h-8 bg-emerald-400/30 rounded" />
                  <div className="h-8 bg-amber-400/30 rounded" />
                </div>
                <div className="h-16 bg-white/10 rounded" />
                <div className="h-8 bg-white/10 rounded" />
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Fixed sidebar (w-64) + scrollable main content (ml-64)
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LIVE LAYOUT DEMO                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-4 sm:px-6" ref={demoRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={demoInView} delay={0}>
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                Interactive Demo
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Live Layout Preview
              </h2>
              <p className="mt-2 text-zinc-500">
                Click nav items and toggle the sidebar collapse button to see the layout in action.
              </p>
            </div>
          </RevealBlock>

          <RevealBlock inView={demoInView} delay={0.15}>
            {/* Demo chrome */}
            <div className="rounded-xl border border-zinc-200 overflow-hidden shadow-lg bg-white">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 border-b border-zinc-200">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 h-6 bg-white rounded border border-zinc-200 flex items-center px-3">
                  <span className="text-xs text-zinc-400">app.example.com/dashboard</span>
                </div>
              </div>

              {/* App shell — fixed height with overflow for demo */}
              <div className="relative h-[520px] overflow-hidden bg-zinc-50 flex">

                {/* Mobile overlay */}
                {mobileSidebarOpen && (
                  <div
                    className="absolute inset-0 bg-zinc-900/50 z-30 sm:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                  />
                )}

                {/* SIDEBAR */}
                <aside
                  className="absolute sm:relative top-0 left-0 h-full bg-white border-r border-zinc-200 flex flex-col z-40 transition-all duration-300"
                  style={{
                    width: sidebarOpen ? "256px" : "64px",
                    transform: mobileSidebarOpen ? "translateX(0)" : undefined,
                  }}
                >
                  {/* Logo area */}
                  <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100 h-14 flex-shrink-0">
                    {sidebarOpen ? (
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#1e293b] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">SK</span>
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 whitespace-nowrap">
                          StyleKit App
                        </span>
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-[#1e293b] rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-white font-bold text-xs">SK</span>
                      </div>
                    )}

                    {sidebarOpen && (
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 rounded hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors flex-shrink-0"
                        title="Collapse sidebar"
                      >
                        <PanelLeftClose className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Expand button when collapsed */}
                  {!sidebarOpen && (
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="mx-auto mt-3 p-1.5 rounded hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                      title="Expand sidebar"
                    >
                      <PanelLeftOpen className="w-4 h-4" />
                    </button>
                  )}

                  {/* Search — only when expanded */}
                  {sidebarOpen && (
                    <div className="px-3 py-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-8 pr-3 py-1.5 bg-zinc-100 border-0 rounded-lg text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                    </div>
                  )}

                  {/* Main nav */}
                  <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
                    {sidebarOpen && (
                      <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                        Main Menu
                      </p>
                    )}
                    {navItems.map((item) => {
                      const isActive = activeNav === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveNav(item.id)}
                          className={[
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 text-left",
                            sidebarOpen ? "" : "justify-center",
                            isActive
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
                          ].join(" ")}
                          title={!sidebarOpen ? item.label : undefined}
                        >
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          {sidebarOpen && (
                            <>
                              <span className="flex-1 text-sm">{item.label}</span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                          {!sidebarOpen && item.badge && (
                            <span className="absolute right-1 top-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          )}
                        </button>
                      );
                    })}

                    {sidebarOpen && (
                      <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1.5 mt-4">
                        Support
                      </p>
                    )}
                    {secondaryNavItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        className={[
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 text-left",
                          sidebarOpen ? "" : "justify-center",
                          activeNav === item.id
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
                        ].join(" ")}
                        title={!sidebarOpen ? item.label : undefined}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {sidebarOpen && (
                          <span className="text-sm">{item.label}</span>
                        )}
                      </button>
                    ))}
                  </nav>

                  {/* User profile */}
                  <div className="p-3 border-t border-zinc-100 flex-shrink-0">
                    {sidebarOpen ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          JD
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-900 truncate">John Doe</p>
                          <p className="text-[10px] text-zinc-400 truncate">Administrator</p>
                        </div>
                        <button className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors flex-shrink-0">
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mx-auto">
                        JD
                      </div>
                    )}
                  </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                  {/* Top bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-200 h-14 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="sm:hidden p-1.5 rounded hover:bg-zinc-100 text-zinc-500 transition-colors"
                      >
                        <Menu className="w-4 h-4" />
                      </button>
                      <div>
                        <h1 className="text-sm font-semibold text-zinc-900">
                          {navItems.find((n) => n.id === activeNav)?.label ??
                            secondaryNavItems.find((n) => n.id === activeNav)?.label ??
                            "Dashboard"}
                        </h1>
                        <p className="text-[10px] text-zinc-400 hidden sm:block">Welcome back, John</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="relative p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable content area */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {/* Stat cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      {stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                              <stat.icon className={`w-4 h-4 ${stat.text}`} />
                            </div>
                            <div
                              className={`flex items-center gap-0.5 text-xs font-medium ${
                                stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                              }`}
                            >
                              {stat.trend === "up" ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {stat.change}
                            </div>
                          </div>
                          <p className="text-lg font-bold text-zinc-900">{stat.value}</p>
                          <p className="text-[11px] text-zinc-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Activity feed */}
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <h3 className="text-sm font-semibold text-zinc-900">Recent Activity</h3>
                      </div>
                      <div className="divide-y divide-zinc-50">
                        {recentActivity.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${item.color}`}
                            >
                              {item.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-zinc-900 truncate">
                                <span className="font-medium">{item.user}</span>{" "}
                                <span className="text-zinc-500">{item.action}</span>
                              </p>
                              <p className="text-[10px] text-zinc-400">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </RevealBlock>

          {/* Demo controls callout */}
          <RevealBlock inView={demoInView} delay={0.25}>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                <PanelLeftClose className="w-3.5 h-3.5" />
                Click the collapse button inside the sidebar header to toggle w-64 / w-16
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 border border-zinc-200 rounded-lg text-xs text-zinc-600">
                <Activity className="w-3.5 h-3.5" />
                Click any nav item to see the active state update
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LAYOUT SPECIFICATIONS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-4 sm:px-6 bg-zinc-50" ref={specsRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={specsInView} delay={0}>
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                Specifications
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Layout Dimensions
              </h2>
              <p className="mt-2 text-zinc-500 max-w-xl">
                Precise measurements and breakpoint behavior for implementing the Fixed Sidebar pattern correctly.
              </p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dimension diagram */}
            <RevealBlock inView={specsInView} delay={0.1}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-zinc-900 mb-4">Desktop Layout (1024px+)</h3>
                <div className="relative rounded-lg overflow-hidden border border-zinc-200" style={{ height: 200 }}>
                  {/* Sidebar region */}
                  <div className="absolute top-0 left-0 bottom-0 bg-[#1e293b] flex flex-col items-center justify-center" style={{ width: 64 }}>
                    <span className="text-white text-[9px] font-mono writing-mode-vertical" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", letterSpacing: 1 }}>
                      w-64 / 256px
                    </span>
                  </div>
                  {/* Content region */}
                  <div className="absolute top-0 bottom-0 right-0 bg-zinc-100 flex flex-col" style={{ left: 64 }}>
                    <div className="h-8 bg-white border-b border-zinc-200 flex items-center px-3">
                      <span className="text-[9px] text-zinc-400 font-mono">Top bar (sticky)</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-[9px] text-zinc-400 font-mono">Main content (ml-64, overflow-y-auto)</span>
                    </div>
                  </div>
                  {/* Arrow annotation */}
                  <div className="absolute bottom-2 left-0 right-0 flex items-center px-2 gap-1">
                    <div className="w-16 h-px bg-blue-400" />
                    <span className="text-[8px] text-blue-500 font-mono whitespace-nowrap">256px fixed</span>
                    <div className="flex-1 h-px bg-blue-200" />
                    <span className="text-[8px] text-blue-400 font-mono whitespace-nowrap">calc(100% - 256px)</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    { prop: "sidebar width", value: "w-64 (256px)", color: "bg-[#1e293b]" },
                    { prop: "content offset", value: "ml-64", color: "bg-blue-500" },
                    { prop: "sidebar position", value: "fixed top-0 left-0", color: "bg-zinc-500" },
                    { prop: "sidebar height", value: "h-screen (100vh)", color: "bg-zinc-400" },
                    { prop: "z-index", value: "z-40 (above content)", color: "bg-zinc-300" },
                  ].map((row) => (
                    <div key={row.prop} className="flex items-center gap-3 text-xs">
                      <span className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${row.color}`} />
                      <span className="text-zinc-500 w-28 flex-shrink-0">{row.prop}</span>
                      <code className="text-zinc-900 font-mono bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100">
                        {row.value}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Breakpoint table */}
            <RevealBlock inView={specsInView} delay={0.2}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-zinc-900 mb-4">Responsive Breakpoints</h3>
                <div className="overflow-hidden rounded-lg border border-zinc-100">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="text-left px-3 py-2 font-semibold text-zinc-500">Breakpoint</th>
                        <th className="text-left px-3 py-2 font-semibold text-zinc-500">Sidebar</th>
                        <th className="text-left px-3 py-2 font-semibold text-zinc-500">Content</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {[
                        { bp: "< 768px (mobile)", sidebar: "Off-canvas drawer", content: "Full width (ml-0)", accent: "text-red-500" },
                        { bp: "768px (md)", sidebar: "Off-canvas or mini", content: "Full width", accent: "text-amber-600" },
                        { bp: "1024px (lg)", sidebar: "Full 256px", content: "ml-64 offset", accent: "text-emerald-600" },
                        { bp: "1280px+ (xl)", sidebar: "Full 256px", content: "ml-64 offset", accent: "text-blue-600" },
                      ].map((row) => (
                        <tr key={row.bp} className="hover:bg-zinc-50 transition-colors">
                          <td className={`px-3 py-2.5 font-mono ${row.accent}`}>{row.bp}</td>
                          <td className="px-3 py-2.5 text-zinc-700">{row.sidebar}</td>
                          <td className="px-3 py-2.5 text-zinc-700">{row.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs font-semibold text-blue-800 mb-1">Collapsed variant</p>
                  <p className="text-xs text-blue-700">
                    When collapsed, sidebar narrows to <code className="font-mono">w-16 (64px)</code>. Main content adjusts to <code className="font-mono">ml-16</code>. Icons remain visible; labels are hidden.
                  </p>
                </div>

                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-xs font-semibold text-amber-800 mb-1">Max width rule</p>
                  <p className="text-xs text-amber-700">
                    Sidebar must not exceed <code className="font-mono">280px</code>. Wider sidebars consume too much viewport on smaller screens.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Do / Don't grid */}
          <RevealBlock inView={specsInView} delay={0.3}>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-emerald-700 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs font-bold">+</span>
                  Must Do
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Sidebar: fixed top-0 left-0 w-64 h-screen",
                    "Main content: ml-64 (matches sidebar width exactly)",
                    "Mobile: sidebar hidden, hamburger triggers drawer",
                    "Active page highlighted in sidebar navigation",
                    "Sidebar nav scrollable when items overflow",
                    "Logo / brand at top of sidebar",
                    "User profile / account at bottom of sidebar",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-xs text-zinc-600">
                      <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold flex-shrink-0 mt-0.5">+</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs font-bold">-</span>
                  Never Do
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Sidebar wider than 280px — kills content space",
                    "Keep sidebar expanded on mobile by default",
                    "No active page indicator — users feel lost",
                    "Navigation deeper than 2 levels without accordions",
                    "Overflow without scroll on sidebar nav",
                    "Forget z-index — sidebar must layer above content",
                    "Missing mobile overlay / backdrop when drawer open",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2 text-xs text-zinc-600">
                      <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold flex-shrink-0 mt-0.5">-</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMPONENT SHOWCASE                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-4 sm:px-6" ref={componentsRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={componentsInView} delay={0}>
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                Components
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Sidebar UI Elements
              </h2>
              <p className="mt-2 text-zinc-500">
                The building blocks inside a fixed sidebar — nav items, search, badges, user profile, and cards.
              </p>
            </div>
          </RevealBlock>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nav item variants */}
            <RevealBlock inView={componentsInView} delay={0.1}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  Nav Item States
                </h3>
                <div className="space-y-1.5">
                  {/* Default */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500">
                    <BarChart3 className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm">Analytics</span>
                    <span className="ml-auto text-[10px] text-zinc-300 font-mono">default</span>
                  </div>
                  {/* Hover */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-100 text-zinc-900">
                    <Users className="w-4 h-4 text-zinc-600" />
                    <span className="text-sm">Users</span>
                    <span className="ml-auto text-[10px] text-zinc-400 font-mono">hover</span>
                  </div>
                  {/* Active */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600">
                    <Home className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Dashboard</span>
                    <span className="ml-auto text-[10px] text-blue-400 font-mono">active</span>
                  </div>
                  {/* With badge */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500">
                    <FileText className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm">Reports</span>
                    <span className="ml-auto px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-medium rounded-full">5</span>
                  </div>
                  {/* Disabled */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-300 cursor-not-allowed">
                    <Activity className="w-4 h-4 text-zinc-300" />
                    <span className="text-sm">Live Feed</span>
                    <span className="ml-auto text-[10px] text-zinc-200 font-mono">disabled</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                  <p className="text-[10px] font-mono text-zinc-400 leading-relaxed">
                    {`active: bg-blue-50 text-blue-600 font-medium`}
                    <br />
                    {`hover: bg-zinc-100 text-zinc-900`}
                    <br />
                    {`transition-colors duration-150`}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Search input */}
            <RevealBlock inView={componentsInView} delay={0.15}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  Sidebar Search
                </h3>
                <div className="space-y-3">
                  {/* Default */}
                  <div>
                    <p className="text-[10px] text-zinc-400 mb-1.5">Default</p>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-8 pr-3 py-2 bg-zinc-100 border-0 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>
                  {/* With shortcut */}
                  <div>
                    <p className="text-[10px] text-zinc-400 mb-1.5">With keyboard hint</p>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-8 pr-10 py-2 bg-zinc-100 border-0 rounded-lg text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                      <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 bg-white border border-zinc-200 rounded">
                        /
                      </kbd>
                    </div>
                  </div>
                </div>

                {/* Section divider pattern */}
                <div className="mt-5">
                  <p className="text-[10px] text-zinc-400 mb-2">Section label</p>
                  <div className="px-3 py-1">
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Main Menu
                    </p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600">
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer transition-colors">
                    <BarChart3 className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm">Analytics</span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* User profile + stat cards */}
            <RevealBlock inView={componentsInView} delay={0.2}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  User Profile
                </h3>

                {/* Expanded */}
                <div className="p-3 border border-zinc-100 rounded-lg bg-zinc-50 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      JD
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-900">John Doe</p>
                      <p className="text-[10px] text-zinc-400">Administrator</p>
                    </div>
                    <button className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200 transition-colors">
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono mb-4">
                  Expanded: avatar + name + role + logout
                </p>

                {/* Collapsed */}
                <div className="flex justify-center mb-1">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    JD
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono text-center mb-5">
                  Collapsed: avatar only
                </p>

                {/* Stat card */}
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Stat Card
                </h3>
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                      <TrendingUp className="w-3 h-3" />
                      +12.5%
                    </div>
                  </div>
                  <p className="text-xl font-bold text-zinc-900">$124,500</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Total Revenue</p>
                </div>
              </div>
            </RevealBlock>

            {/* Color palette */}
            <RevealBlock inView={componentsInView} delay={0.1}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  Color System
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Primary (sidebar bg)", hex: "#1e293b", cls: "bg-[#1e293b]" },
                    { name: "Secondary (page bg)", hex: "#f8fafc", cls: "bg-[#f8fafc] border border-zinc-200" },
                    { name: "Accent Blue (active)", hex: "#3b82f6", cls: "bg-[#3b82f6]" },
                    { name: "Accent Emerald (success)", hex: "#10b981", cls: "bg-[#10b981]" },
                    { name: "Accent Amber (warning)", hex: "#f59e0b", cls: "bg-[#f59e0b]" },
                    { name: "Accent Red (error)", hex: "#ef4444", cls: "bg-[#ef4444]" },
                  ].map((c) => (
                    <div key={c.hex} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-md flex-shrink-0 ${c.cls}`} />
                      <div>
                        <p className="text-xs text-zinc-700">{c.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">{c.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Notification badges */}
            <RevealBlock inView={componentsInView} delay={0.15}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  Badges &amp; Indicators
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Count badge", content: <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-medium rounded-full">3</span> },
                    { label: "Dot indicator", content: <span className="w-2 h-2 bg-blue-500 rounded-full" /> },
                    { label: "Status: online", content: <span className="w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" /> },
                    { label: "Status: away", content: <span className="w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" /> },
                    { label: "Status: busy", content: <span className="w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" /> },
                    { label: "New tag", content: <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-semibold rounded">NEW</span> },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{b.label}</span>
                      {b.content}
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Section groups */}
            <RevealBlock inView={componentsInView} delay={0.2}>
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  Navigation Groups
                </h3>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                    Main
                  </p>
                  {[
                    { icon: Home, label: "Dashboard", active: true },
                    { icon: BarChart3, label: "Analytics" },
                    { icon: Users, label: "Team", badge: 2 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                        item.active
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                      } cursor-pointer transition-colors`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="flex-1">{item.label}</span>
                      {"badge" in item && item.badge && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-medium rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="pt-2">
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                      Workspace
                    </p>
                  </div>
                  {[
                    { icon: Folder, label: "Projects" },
                    { icon: FileText, label: "Docs" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RESPONSIVE BEHAVIOR                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-4 sm:px-6 bg-zinc-50" ref={responsiveRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={responsiveInView} delay={0}>
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                Responsive
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Adaptive Behavior
              </h2>
              <p className="mt-2 text-zinc-500 max-w-xl">
                How the Fixed Sidebar pattern adapts from desktop to mobile without losing functionality.
              </p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Desktop */}
            <RevealBlock inView={responsiveInView} delay={0.1}>
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h3 className="text-xs font-semibold text-zinc-700">Desktop (1024px+)</h3>
                </div>
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden border border-zinc-200 flex" style={{ height: 160 }}>
                    <div className="w-12 bg-[#1e293b] flex flex-col items-center py-2 gap-1.5">
                      <div className="w-5 h-5 bg-blue-500 rounded-sm" />
                      <div className="w-6 h-1.5 bg-blue-400 rounded" />
                      <div className="w-6 h-1.5 bg-white/20 rounded" />
                      <div className="w-6 h-1.5 bg-white/20 rounded" />
                      <div className="w-6 h-1.5 bg-white/20 rounded" />
                    </div>
                    <div className="flex-1 bg-zinc-50 flex flex-col">
                      <div className="h-6 bg-white border-b border-zinc-100" />
                      <div className="flex-1 p-2 grid grid-cols-2 gap-1.5 content-start">
                        <div className="h-6 bg-blue-50 rounded" />
                        <div className="h-6 bg-emerald-50 rounded" />
                        <div className="col-span-2 h-8 bg-white border border-zinc-100 rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-zinc-500">
                    <p className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">+</span> Sidebar always visible</p>
                    <p className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">+</span> Full labels in navigation</p>
                    <p className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">+</span> Content uses ml-64 offset</p>
                    <p className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">+</span> Collapse to icon-only mode</p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Tablet */}
            <RevealBlock inView={responsiveInView} delay={0.2}>
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="text-xs font-semibold text-zinc-700">Tablet (768px–1023px)</h3>
                </div>
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden border border-zinc-200" style={{ height: 160 }}>
                    {/* Mini icon sidebar */}
                    <div className="flex h-full">
                      <div className="w-8 bg-[#1e293b] flex flex-col items-center py-2 gap-1.5">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                        <div className="w-4 h-1.5 bg-blue-400 rounded" />
                        <div className="w-4 h-1.5 bg-white/20 rounded" />
                        <div className="w-4 h-1.5 bg-white/20 rounded" />
                      </div>
                      <div className="flex-1 bg-zinc-50 flex flex-col">
                        <div className="h-6 bg-white border-b border-zinc-100" />
                        <div className="flex-1 p-2 grid grid-cols-2 gap-1.5 content-start">
                          <div className="h-6 bg-blue-50 rounded" />
                          <div className="h-6 bg-emerald-50 rounded" />
                          <div className="col-span-2 h-8 bg-white border border-zinc-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-zinc-500">
                    <p className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">~</span> Icon-only collapsed sidebar</p>
                    <p className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">~</span> Tooltips on hover for labels</p>
                    <p className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">~</span> Main content uses ml-16</p>
                    <p className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">~</span> Optional full expand on click</p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Mobile */}
            <RevealBlock inView={responsiveInView} delay={0.3}>
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <h3 className="text-xs font-semibold text-zinc-700">Mobile (&lt;768px)</h3>
                </div>
                <div className="p-4">
                  <div className="rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50" style={{ height: 160 }}>
                    {/* No sidebar, just content + hamburger */}
                    <div className="h-8 bg-white border-b border-zinc-100 flex items-center px-2 gap-2">
                      <div className="flex gap-0.5">
                        <div className="w-4 h-0.5 bg-zinc-400 rounded" />
                        <div className="w-4 h-0.5 bg-zinc-400 rounded" />
                        <div className="w-4 h-0.5 bg-zinc-400 rounded" />
                      </div>
                      <div className="h-3 w-16 bg-zinc-200 rounded" />
                    </div>
                    <div className="p-2 grid grid-cols-2 gap-1.5">
                      <div className="h-8 bg-blue-50 rounded" />
                      <div className="h-8 bg-emerald-50 rounded" />
                      <div className="col-span-2 h-10 bg-white border border-zinc-100 rounded" />
                      <div className="col-span-2 h-8 bg-white border border-zinc-100 rounded" />
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-zinc-500">
                    <p className="flex items-start gap-1.5"><span className="text-blue-500 font-bold">*</span> Sidebar hidden off-screen</p>
                    <p className="flex items-start gap-1.5"><span className="text-blue-500 font-bold">*</span> Hamburger button in top bar</p>
                    <p className="flex items-start gap-1.5"><span className="text-blue-500 font-bold">*</span> Drawer slides in from left</p>
                    <p className="flex items-start gap-1.5"><span className="text-blue-500 font-bold">*</span> Dark overlay behind drawer</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Mobile drawer demo */}
          <RevealBlock inView={responsiveInView} delay={0.35}>
            <div className="mt-6 bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-zinc-900 mb-1">Mobile Drawer — Interactive Preview</h3>
              <p className="text-xs text-zinc-500 mb-4">
                On mobile, the sidebar transforms into an off-canvas drawer triggered by a hamburger button.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-white text-sm font-medium rounded-lg hover:bg-[#334155] transition-colors"
                >
                  {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  {mobileSidebarOpen ? "Close Drawer" : "Open Drawer"}
                </button>
                <span className="text-xs text-zinc-400">
                  state: <code className="font-mono text-zinc-600">sidebarOpen = {mobileSidebarOpen ? "true" : "false"}</code>
                </span>
              </div>

              {/* Mini mobile mockup */}
              <div className="relative w-64 h-40 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 mx-auto">
                {/* Overlay */}
                {mobileSidebarOpen && (
                  <div
                    className="absolute inset-0 bg-zinc-900/50 z-10"
                    onClick={() => setMobileSidebarOpen(false)}
                  />
                )}
                {/* Drawer */}
                <div
                  className="absolute top-0 left-0 h-full w-36 bg-white border-r border-zinc-200 z-20 transition-transform duration-300 flex flex-col"
                  style={{ transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100">
                    <span className="text-xs font-bold text-zinc-900">StyleKit</span>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-0.5 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-1 p-2 space-y-0.5">
                    {navItems.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-[10px] cursor-pointer transition-colors ${
                          activeNav === item.id
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                        onClick={() => {
                          setActiveNav(item.id);
                          setMobileSidebarOpen(false);
                        }}
                      >
                        <item.icon className="w-3 h-3 flex-shrink-0" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Page content */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-white border-b border-zinc-100">
                    <button
                      onClick={() => setMobileSidebarOpen(true)}
                      className="p-0.5 text-zinc-500"
                    >
                      <Menu className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-medium text-zinc-700">Dashboard</span>
                  </div>
                  <div className="flex-1 p-2 grid grid-cols-2 gap-1.5 content-start">
                    <div className="h-7 bg-blue-50 rounded" />
                    <div className="h-7 bg-emerald-50 rounded" />
                    <div className="col-span-2 h-8 bg-white border border-zinc-100 rounded" />
                  </div>
                </div>
              </div>
              <p className="text-center text-[10px] text-zinc-400 mt-2">
                translate(-100%) when closed → translateX(0) when open
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CODE REFERENCE                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-4 sm:px-6" ref={codeRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={codeInView} delay={0}>
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-2">
                Code Reference
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Implementation Snippets
              </h2>
              <p className="mt-2 text-zinc-500 max-w-xl">
                Copy-ready Tailwind CSS code for the core shell structure and navigation items.
              </p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Shell structure */}
            <RevealBlock inView={codeInView} delay={0.1}>
              <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700/50">
                  <span className="text-xs font-semibold text-zinc-400">Shell Structure</span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  </div>
                </div>
                <pre className="p-4 text-[11px] text-zinc-300 font-mono leading-relaxed overflow-x-auto">
                  <code>{`<div className="min-h-screen bg-zinc-50">

  {/* Fixed sidebar */}
  <aside className="
    fixed top-0 left-0
    w-64 h-screen
    bg-white border-r border-zinc-200
    flex flex-col z-40
  ">
    {/* Logo */}
    <div className="p-6 border-b border-zinc-200">
      <span className="font-bold text-zinc-900">
        Logo
      </span>
    </div>

    {/* Search */}
    <div className="p-4"> ... </div>

    {/* Navigation — scrollable */}
    <nav className="
      flex-1 px-3 py-2
      space-y-1 overflow-y-auto
    ">
      ...
    </nav>

    {/* User profile */}
    <div className="p-4 border-t border-zinc-200">
      ...
    </div>
  </aside>

  {/* Main content — offset by sidebar */}
  <main className="ml-64 min-h-screen">
    <header className="
      sticky top-0 z-30 bg-white
      border-b border-zinc-200 px-6 py-4
    ">
      ...
    </header>
    <div className="p-6"> ... </div>
  </main>

</div>`}</code>
                </pre>
              </div>
            </RevealBlock>

            {/* Nav item + mobile */}
            <RevealBlock inView={codeInView} delay={0.2}>
              <div className="space-y-4">
                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700/50">
                    <span className="text-xs font-semibold text-zinc-400">Active Nav Item</span>
                  </div>
                  <pre className="p-4 text-[11px] text-zinc-300 font-mono leading-relaxed overflow-x-auto">
                    <code>{`<a
  href="#"
  className={\`
    flex items-center gap-3
    px-3 py-2.5 rounded-lg
    transition-colors duration-150
    \${isActive
      ? "bg-blue-50 text-blue-600 font-medium"
      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
    }
  \`}
>
  <Icon className="w-5 h-5 flex-shrink-0" />
  <span className="flex-1">{label}</span>
  {badge && (
    <span className="
      px-1.5 py-0.5 rounded-full text-xs
      bg-blue-100 text-blue-600 font-medium
    ">
      {badge}
    </span>
  )}
</a>`}</code>
                  </pre>
                </div>

                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700/50">
                    <span className="text-xs font-semibold text-zinc-400">Mobile Responsive</span>
                  </div>
                  <pre className="p-4 text-[11px] text-zinc-300 font-mono leading-relaxed overflow-x-auto">
                    <code>{`{/* Hamburger — mobile only */}
<button
  onClick={() => setSidebarOpen(true)}
  className="lg:hidden fixed top-4 left-4 z-50
    p-2 bg-white rounded-lg shadow border"
>
  <Menu className="w-5 h-5" />
</button>

{/* Overlay */}
{sidebarOpen && (
  <div
    className="lg:hidden fixed inset-0
      bg-zinc-900/50 z-40"
    onClick={() => setSidebarOpen(false)}
  />
)}

{/* Sidebar — translates off-screen on mobile */}
<aside className={\`
  fixed top-0 left-0 w-64 h-screen
  bg-white border-r border-zinc-200
  z-50 transition-transform duration-300
  lg:translate-x-0
  \${sidebarOpen
    ? "translate-x-0"
    : "-translate-x-full"
  }
\`}>
  ...
</aside>

{/* Content — full width on mobile */}
<main className="lg:ml-64">
  ...
</main>`}</code>
                  </pre>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Use case grid */}
          <RevealBlock inView={codeInView} delay={0.3}>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Admin Dashboard",
                  desc: "User management, analytics, settings. Navigation groups mirror business domains.",
                  tags: ["Users", "Analytics", "Settings"],
                  color: "border-blue-200 bg-blue-50",
                  titleColor: "text-blue-800",
                },
                {
                  title: "Documentation Site",
                  desc: "Nested sections with accordion expansion. Search at top, TOC in sidebar.",
                  tags: ["Getting Started", "API", "Examples"],
                  color: "border-emerald-200 bg-emerald-50",
                  titleColor: "text-emerald-800",
                },
                {
                  title: "SaaS Application",
                  desc: "Workspace switcher, notification badges, user avatar, and quick action shortcuts.",
                  tags: ["Projects", "Team", "Reports"],
                  color: "border-amber-200 bg-amber-50",
                  titleColor: "text-amber-800",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`rounded-xl border p-5 ${card.color}`}
                >
                  <h3 className={`text-sm font-semibold mb-2 ${card.titleColor}`}>{card.title}</h3>
                  <p className="text-xs text-zinc-600 mb-3 leading-relaxed">{card.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/80 text-zinc-600 text-[10px] font-medium rounded border border-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="py-10 px-4 sm:px-6 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Fixed Sidebar Layout</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Part of{" "}
              <Link href="/" className="hover:text-zinc-700 transition-colors underline underline-offset-2">
                StyleKit
              </Link>{" "}
              — a curated library of UI design styles
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/styles/sidebar-fixed"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/styles"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              All Styles
            </Link>
            <Link
              href="/styles/sidebar-fixed"
              className="text-sm font-medium text-white bg-[#1e293b] hover:bg-[#334155] px-4 py-2 rounded-lg transition-colors"
            >
              View Docs →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
