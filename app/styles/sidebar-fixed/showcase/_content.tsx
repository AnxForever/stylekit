"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ---------- inline useInView ---------- */
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

/* ---------- inline RevealBlock ---------- */
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

/* ---------- Sidebar Nav Item ---------- */
function NavItem({ label, icon, active = false }: { label: string; icon: string; active?: boolean }) {
  return (
    <div className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 cursor-pointer ${
      active ? "bg-[#eff6ff] text-[#2563eb] font-medium" : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
    }`}>
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3b82f6] rounded-l-lg" />}
      <span className={`text-sm ${active ? "ml-1" : "ml-1 group-hover:translate-x-0.5 transition-transform duration-150"}`}>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

/* ---------- Stat Card ---------- */
function StatCard({ title, value, color, trend }: { title: string; value: string; color: string; trend: string }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#e2e8f0] shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out">
      <h3 className="text-sm font-medium text-[#64748b] mb-2">{title}</h3>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs text-[#94a3b8] mt-2">{trend}</p>
    </div>
  );
}

/* ---------- data ---------- */
const navItems = [
  { label: "Dashboard", icon: "\u2302", active: true },
  { label: "Analytics", icon: "\u2261", active: false },
  { label: "Users", icon: "\u263A", active: false },
  { label: "Projects", icon: "\u2630", active: false },
  { label: "Messages", icon: "\u2709", active: false },
  { label: "Calendar", icon: "\u2637", active: false },
];

const secondaryNav = [
  { label: "Settings", icon: "\u2699", active: false },
  { label: "Help", icon: "?", active: false },
];

const stats = [
  { title: "Total Users", value: "12,345", color: "#3b82f6", trend: "+12.5% from last month" },
  { title: "Revenue", value: "$45,678", color: "#10b981", trend: "+8.2% from last month" },
  { title: "Active Orders", value: "1,234", color: "#f59e0b", trend: "+3.1% from last month" },
  { title: "Conversion", value: "3.24%", color: "#ef4444", trend: "-0.4% from last month" },
];

const recentActivity = [
  { user: "Sarah Chen", action: "Created project", target: "Marketing Q1", time: "2 min ago", color: "#3b82f6" },
  { user: "James Wilson", action: "Updated document", target: "API Documentation", time: "15 min ago", color: "#10b981" },
  { user: "Maria Garcia", action: "Completed task", target: "User Research", time: "1 hour ago", color: "#f59e0b" },
  { user: "Alex Johnson", action: "Added comment", target: "Design Review", time: "2 hours ago", color: "#8b5cf6" },
  { user: "Kim Nguyen", action: "Deployed build", target: "v2.4.1", time: "3 hours ago", color: "#ef4444" },
];

const colorPalette = [
  { name: "Slate Dark", hex: "#1e293b", desc: "Primary" },
  { name: "Slate Light", hex: "#f8fafc", desc: "Background" },
  { name: "Blue", hex: "#3b82f6", desc: "Accent 1" },
  { name: "Emerald", hex: "#10b981", desc: "Accent 2" },
  { name: "Amber", hex: "#f59e0b", desc: "Accent 3" },
  { name: "Red", hex: "#ef4444", desc: "Accent 4" },
];

const componentTabs = ["Buttons", "Inputs", "Cards"] as const;

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof componentTabs)[number]>("Buttons");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ===== Fixed Navigation (Top Bar) ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#64748b] hover:text-[#0f172a] transition-colors duration-150 md:hidden"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              <Link href="/styles/sidebar-fixed" className="text-sm font-semibold text-[#0f172a]">
                Fixed Sidebar
              </Link>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/styles/sidebar-fixed" className="text-xs text-[#64748b] hover:text-[#0f172a] transition-colors duration-150">
                Docs
              </Link>
              <Link href="/styles" className="text-xs text-[#64748b] hover:text-[#0f172a] transition-colors duration-150">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero Section: Sidebar Layout Demo ===== */}
      <section className="pt-20 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] mb-4">
              Fixed Sidebar
            </h1>
            <p className="text-lg text-[#64748b] max-w-2xl">
              A persistent navigation layout with a fixed sidebar and scrollable main content area. Ideal for dashboards, admin panels, and documentation sites.
            </p>
          </div>

          {/* Interactive Sidebar Layout Demo */}
          <div
            className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <div className="flex min-h-[480px]">
              {/* Demo Sidebar */}
              <aside
                className="border-r border-[#e2e8f0] bg-white flex flex-col transition-all duration-300 ease-out overflow-hidden flex-shrink-0"
                style={{ width: sidebarOpen ? "240px" : "0px" }}
              >
                <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between min-w-[240px]">
                  <span className="text-base font-bold text-[#0f172a]">AppName</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-[#94a3b8] hover:text-[#64748b] transition-colors duration-150"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                </div>

                {/* Search */}
                <div className="p-3 min-w-[240px]">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-9 pr-4 py-2 bg-[#f1f5f9] border-0 rounded-lg text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30"
                    />
                  </div>
                </div>

                {/* Main Nav */}
                <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto min-w-[240px]">
                  <p className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-semibold px-3 mb-2">Main Menu</p>
                  {navItems.map((item) => (
                    <NavItem key={item.label} {...item} />
                  ))}
                  <div className="my-4 h-px bg-[#e2e8f0]" />
                  <p className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-semibold px-3 mb-2">System</p>
                  {secondaryNav.map((item) => (
                    <NavItem key={item.label} {...item} />
                  ))}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-[#e2e8f0] min-w-[240px]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
                    <div>
                      <div className="font-medium text-[#0f172a] text-sm">John Doe</div>
                      <div className="text-[#94a3b8] text-xs">Admin</div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Demo Main Content */}
              <main className="flex-1 p-6 overflow-auto bg-[#f8fafc]">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="mb-4 text-[#64748b] hover:text-[#0f172a] transition-colors duration-150 flex items-center gap-2 text-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Show sidebar
                  </button>
                )}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#0f172a]">Dashboard</h2>
                  <p className="text-sm text-[#64748b]">Welcome back, John</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.slice(0, 4).map((s) => (
                    <div key={s.title} className="p-4 bg-white rounded-lg border border-[#e2e8f0]">
                      <h3 className="text-xs font-medium text-[#64748b] mb-1">{s.title}</h3>
                      <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-[#94a3b8] mt-1">{s.trend}</p>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2">Key Metrics</h2>
            <p className="text-sm text-[#64748b] mb-10">Dashboard statistics at a glance</p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <RevealBlock key={s.title} delay={i * 0.08}>
                <StatCard {...s} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Recent Activity ===== */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2">Recent Activity</h2>
            <p className="text-sm text-[#64748b] mb-10">Latest actions from your team</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              {recentActivity.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 hover:bg-[#f8fafc] transition-colors duration-150 ${i < recentActivity.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: item.color }}>
                    {item.user.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0f172a]">
                      <span className="font-medium">{item.user}</span>{" "}
                      <span className="text-[#64748b]">{item.action}</span>{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                  </div>
                  <span className="text-xs text-[#94a3b8] flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Component Demos (Tab-Switched) ===== */}
      <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2">Components</h2>
            <p className="text-sm text-[#64748b] mb-10">UI elements for sidebar layouts</p>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                    activeTab === tab
                      ? "bg-[#0f172a] text-white"
                      : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f172a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "Buttons" && (
            <RevealBlock delay={0.15}>
              <div className="space-y-8 p-8 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                <h3 className="text-sm font-medium text-[#64748b] uppercase tracking-wider">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-2.5 bg-[#3b82f6] text-white text-sm font-medium rounded-lg hover:bg-[#2563eb] active:scale-[0.98] transition-all duration-150">
                    Primary
                  </button>
                  <button className="px-6 py-2.5 bg-[#0f172a] text-white text-sm font-medium rounded-lg hover:bg-[#1e293b] active:scale-[0.98] transition-all duration-150">
                    Dark
                  </button>
                  <button className="px-6 py-2.5 bg-white text-[#0f172a] text-sm font-medium rounded-lg border border-[#e2e8f0] hover:bg-[#f8fafc] active:scale-[0.98] transition-all duration-150">
                    Outlined
                  </button>
                  <button className="px-6 py-2.5 bg-[#10b981] text-white text-sm font-medium rounded-lg hover:bg-[#059669] active:scale-[0.98] transition-all duration-150">
                    Success
                  </button>
                  <button className="px-6 py-2.5 bg-[#ef4444] text-white text-sm font-medium rounded-lg hover:bg-[#dc2626] active:scale-[0.98] transition-all duration-150">
                    Danger
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-[#64748b] rounded-lg hover:bg-white hover:text-[#0f172a] transition-colors duration-150 border border-transparent hover:border-[#e2e8f0]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm">Sidebar Action Button</span>
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Inputs */}
          {activeTab === "Inputs" && (
            <RevealBlock delay={0.15}>
              <div className="space-y-6 p-8 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] max-w-lg">
                <h3 className="text-sm font-medium text-[#64748b] uppercase tracking-wider">Input Fields</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Search</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all duration-150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Add notes..."
                      className="w-full px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] resize-none transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "Cards" && (
            <RevealBlock delay={0.15}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl border border-[#e2e8f0] shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out">
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Standard Card</h3>
                  <p className="text-sm text-[#64748b]">A clean content card with subtle hover elevation for main content areas.</p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-[#e2e8f0] shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center text-[#3b82f6] font-bold">A</div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0f172a]">Icon Card</h3>
                      <p className="text-xs text-[#94a3b8]">With leading icon element</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#64748b]">Card variant with icon and compact header, suitable for list views.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl shadow-sm text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.2)] transition-all duration-150 ease-out">
                  <h3 className="text-lg font-semibold mb-2">Dark Card</h3>
                  <p className="text-sm text-white/70">Dark variant for featured or highlighted content blocks.</p>
                </div>
                <div className="p-6 bg-white rounded-xl border-l-4 border-l-[#3b82f6] border border-[#e2e8f0] shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out">
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">Accent Card</h3>
                  <p className="text-sm text-[#64748b]">Left-bordered card for navigation context or status indicators.</p>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== Inline Color Palette ===== */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2">Color Palette</h2>
            <p className="text-sm text-[#64748b] mb-10">System colors for sidebar layouts</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colorPalette.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="rounded-xl border border-[#e2e8f0] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150">
                  <div className="h-20" style={{ backgroundColor: c.hex }} />
                  <div className="p-3 bg-white">
                    <p className="text-xs font-medium text-[#0f172a]">{c.name}</p>
                    <p className="text-xs text-[#94a3b8]">{c.hex}</p>
                    <p className="text-[10px] text-[#cbd5e1] mt-0.5">{c.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-16 md:py-24 px-6 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-2">Design Rules</h2>
            <p className="text-sm text-[#64748b] mb-10">Guidelines for fixed sidebar layouts</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10">
            <RevealBlock delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#10b981] uppercase tracking-wider">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Use fixed or sticky positioning for the sidebar",
                    "Set main content margin-left to match sidebar width",
                    "Provide expand/collapse control for the sidebar",
                    "Highlight the current page in navigation",
                    "Make sidebar scrollable when content overflows",
                    "Use fast, restrained transitions (150ms)",
                    "Include search at the top of the sidebar",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                      <svg className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#ef4444] uppercase tracking-wider">Do Not</h3>
                <ul className="space-y-3">
                  {[
                    "Make sidebar too wide (max 280px)",
                    "Keep sidebar expanded on mobile screens",
                    "Forget current page state indicator",
                    "Create overly deep navigation hierarchy",
                    "Ignore sidebar content overflow scrolling",
                    "Use bouncy or flashy navigation animations",
                    "Miss clear visual anchor for active item",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                      <svg className="w-4 h-4 text-[#ef4444] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#e2e8f0] px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#94a3b8]">
              StyleKit &middot; Fixed Sidebar Showcase
            </p>
            <div className="flex gap-4">
              <Link href="/styles/sidebar-fixed" className="text-xs text-[#64748b] hover:text-[#0f172a] transition-colors duration-150">
                View Docs
              </Link>
              <Link href="/styles" className="text-xs text-[#64748b] hover:text-[#0f172a] transition-colors duration-150">
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
