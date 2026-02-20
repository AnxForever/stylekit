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
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
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

const kpis = [
  { label: "Total Revenue", value: "$48.2K", change: "+12.5%", up: true },
  { label: "Active Users", value: "2,420", change: "+5.2%", up: true },
  { label: "Orders", value: "1,210", change: "-2.1%", up: false },
  { label: "Conversion", value: "3.6%", change: "+0.3%", up: null as boolean | null },
];

const sidebarItems = [
  { label: "Overview", icon: "home", active: true },
  { label: "Analytics", icon: "chart", active: false },
  { label: "Customers", icon: "users", active: false },
  { label: "Products", icon: "box", active: false },
  { label: "Settings", icon: "gear", active: false },
];

const tableData = [
  { id: "#4521", customer: "Olivia Martin", product: "Pro Plan", amount: "$249.00", status: "Completed" },
  { id: "#4520", customer: "James Wilson", product: "Starter", amount: "$49.00", status: "Processing" },
  { id: "#4519", customer: "Sofia Davis", product: "Enterprise", amount: "$999.00", status: "Completed" },
  { id: "#4518", customer: "Noah Brown", product: "Pro Plan", amount: "$249.00", status: "Failed" },
  { id: "#4517", customer: "Emma Thompson", product: "Starter", amount: "$49.00", status: "Completed" },
];

const colorPalette = [
  { name: "Dark", value: "#111827", textColor: "#ffffff" },
  { name: "Light BG", value: "#f9fafb", textColor: "#111827" },
  { name: "Indigo", value: "#6366f1", textColor: "#ffffff" },
  { name: "Emerald", value: "#10b981", textColor: "#ffffff" },
  { name: "Amber", value: "#f59e0b", textColor: "#111827" },
  { name: "Red", value: "#ef4444", textColor: "#ffffff" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SidebarIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    box: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    gear: <><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
  };
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      {icons[type] ?? icons.home}
    </svg>
  );
}

function KpiCard({ kpi }: { kpi: typeof kpis[0] }) {
  return (
    <div className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-150">{kpi.label}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-150 ${
          kpi.up === true ? "text-[#10b981] bg-[#10b981]/10 group-hover:bg-[#10b981]/20" :
          kpi.up === false ? "text-[#ef4444] bg-[#ef4444]/10 group-hover:bg-[#ef4444]/20" :
          "text-[#f59e0b] bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20"
        }`}>{kpi.change}</span>
      </div>
      <div className="text-3xl font-bold text-[#111827] origin-left group-hover:text-[#4f46e5] group-hover:scale-[1.02] transition-all duration-150">{kpi.value}</div>
    </div>
  );
}

function BarChart() {
  const bars = [35, 58, 42, 70, 48, 65, 80, 55, 72, 45, 60, 78];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-[#111827]">Revenue Trend</h3>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-[#6366f1] text-white text-xs rounded-full font-medium">Monthly</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-150">Weekly</span>
        </div>
      </div>
      <div className="flex items-end gap-2 h-40">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-[#6366f1]/80 hover:bg-[#6366f1] transition-colors duration-150 cursor-pointer"
              style={{ height: `${h}%` }}
              title={`$${(h * 600).toLocaleString()}`}
            />
            <span className="text-[10px] text-gray-400">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-[#111827] mb-6">Distribution</h3>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-40 h-40">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="126 251.3" strokeLinecap="round" transform="rotate(-90 50 50)" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="75 251.3" strokeDashoffset="-126" strokeLinecap="round" transform="rotate(-90 50 50)" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="50 251.3" strokeDashoffset="-201" strokeLinecap="round" transform="rotate(-90 50 50)" />
          <text x="50" y="48" textAnchor="middle" className="text-lg font-bold fill-[#111827]">73%</text>
          <text x="50" y="60" textAnchor="middle" className="text-[8px] fill-gray-400">Growth</text>
        </svg>
      </div>
      <div className="mt-4 space-y-2">
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
            <span className="font-medium text-[#111827]">{item.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-[#111827]">Recent Orders</h3>
        <button type="button" className="px-4 py-2 bg-[#6366f1] text-white rounded-lg font-medium text-sm hover:bg-[#4f46e5] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-1 transition-all duration-150 ease-out">
          Export
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
              <td className="px-6 py-4 text-sm font-medium text-[#111827]">{row.id}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{row.customer}</td>
              <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{row.product}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#111827]">{row.amount}</td>
              <td className="px-6 py-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  row.status === "Completed" ? "text-[#10b981] bg-[#10b981]/10" :
                  row.status === "Processing" ? "text-[#f59e0b] bg-[#f59e0b]/10" :
                  "text-[#ef4444] bg-[#ef4444]/10"
                }`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component demos                                                    */
/* ------------------------------------------------------------------ */

function ButtonsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <button type="button" className="px-4 py-2 bg-[#6366f1] text-white rounded-lg font-medium text-sm hover:bg-[#4f46e5] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 focus:ring-offset-1 transition-all duration-150 ease-out">
          Primary
        </button>
        <button type="button" className="px-4 py-2 bg-white text-[#111827] border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 active:scale-[0.97] transition-all duration-150 ease-out">
          Secondary
        </button>
        <button type="button" className="px-4 py-2 bg-[#10b981] text-white rounded-lg font-medium text-sm hover:bg-[#059669] active:scale-[0.97] transition-all duration-150 ease-out">
          Success
        </button>
        <button type="button" className="px-4 py-2 bg-[#ef4444] text-white rounded-lg font-medium text-sm hover:bg-[#dc2626] active:scale-[0.97] transition-all duration-150 ease-out">
          Danger
        </button>
      </div>
    </div>
  );
}

function KpiDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}

function ChartsDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <BarChart />
      </div>
      <DonutChart />
    </div>
  );
}

function TableDemo() {
  return <DataTable />;
}

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

const tabs = ["Buttons", "KPI Cards", "Charts", "Table"] as const;

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      {/* ========= Navigation ========= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            <Link href="/styles/dashboard-layout/showcase" className="font-bold text-lg text-[#111827]">
              Dashboard
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/styles/dashboard-layout" className="text-sm text-gray-500 hover:text-[#111827] transition-colors duration-150">
                Docs
              </Link>
              <Link href="/styles" className="text-sm text-gray-500 hover:text-[#111827] transition-colors duration-150">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ========= Hero ========= */}
      <section className="pt-28 md:pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase text-[#6366f1] mb-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Data-Driven Layout
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Dashboard
              </span>
              <span
                className="block text-[#6366f1]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Layout.
              </span>
            </h1>
          </div>
          <p
            className="max-w-xs text-sm text-gray-500 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            Data-driven layouts with sidebar navigation, KPI cards, charts, and tables. Optimized for monitoring and analytics.
          </p>
        </div>

        {/* Live Dashboard Preview */}
        <RevealBlock>
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
            <div className="flex min-h-[480px]">
              {/* Sidebar */}
              <aside className="hidden md:flex w-56 bg-[#111827] text-white flex-col shrink-0">
                <div className="p-5">
                  <span className="font-bold text-sm">Analytics</span>
                </div>
                <nav className="flex-1 px-3 space-y-1">
                  {sidebarItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                        item.active ? "bg-white/10 font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
                      } transition-colors duration-150 cursor-pointer`}
                    >
                      <SidebarIcon type={item.icon} />
                      {item.label}
                    </div>
                  ))}
                </nav>
              </aside>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="border-b border-gray-100 px-6 py-3 flex items-center justify-between">
                  <span className="font-semibold text-sm">Overview</span>
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#6366f1]/30 w-44" />
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {kpis.map((kpi) => (
                      <div key={kpi.label} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{kpi.label}</span>
                        <div className="text-lg font-bold mt-0.5">{kpi.value}</div>
                        <span className={`text-xs font-medium ${kpi.up === true ? "text-[#10b981]" : kpi.up === false ? "text-[#ef4444]" : "text-[#f59e0b]"}`}>{kpi.change}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <span className="text-xs font-medium text-gray-600 mb-3 block">Revenue</span>
                      <div className="flex items-end gap-1 h-20">
                        {[35, 58, 42, 70, 48, 65, 80, 55, 72, 45, 60, 78].map((h, i) => (
                          <div key={i} className="flex-1 bg-[#6366f1]/70 rounded-t" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-20 h-20">
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#6366f1" strokeWidth="10" strokeDasharray="110 220" strokeLinecap="round" transform="rotate(-90 50 50)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ========= Component Demos ========= */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Component <span className="text-[#6366f1]">Library</span>
          </h2>
          <p className="text-gray-500 max-w-md">Dashboard building blocks: buttons, KPI cards, charts, and data tables.</p>
        </RevealBlock>

        <div className="flex items-center gap-1 bg-white rounded-lg p-1 mb-12 w-fit border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                activeTab === tab
                  ? "bg-[#6366f1] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#111827]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <RevealBlock>
          {activeTab === "Buttons" && <ButtonsDemo />}
          {activeTab === "KPI Cards" && <KpiDemo />}
          {activeTab === "Charts" && <ChartsDemo />}
          {activeTab === "Table" && <TableDemo />}
        </RevealBlock>
      </section>

      {/* ========= Color Palette ========= */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Color <span className="text-[#10b981]">Palette</span>
          </h2>
          <p className="text-gray-500 max-w-md">
            A functional palette with status colors for data visualization and clear information hierarchy.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalette.map((color, i) => (
            <RevealBlock key={color.name} delay={i * 0.05}>
              <div className="group rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 ease-out cursor-pointer">
                <div className="h-24 md:h-28 flex items-end p-3" style={{ backgroundColor: color.value }}>
                  <span className="text-xs font-mono opacity-80" style={{ color: color.textColor }}>{color.value}</span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-[#111827]">{color.name}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ========= Design Rules ========= */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Design Rules</h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealBlock>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </span>
                Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Dark sidebar navigation: bg-gray-900 w-64",
                  "Toolbar with search, notifications, user info",
                  "Grid layout for data panels: grid-cols-4",
                  "Large numeric KPI cards with change indicators",
                  "Color-coded status: green up, red down",
                  "Crisp SaaS Feel: duration-150 ease-out",
                  "KPI Focus: group-hover subtle scale on numbers",
                  "Hover Hinting: hover:bg-gray-50 on all data rows",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[#10b981] mt-0.5 shrink-0">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ef4444] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </span>
                Don&apos;t
              </h3>
              <ul className="space-y-3">
                {[
                  "Sidebar and content area ratio mismatch",
                  "Inconsistent panel spacing",
                  "Ignore loading and empty states",
                  "Make all panels the exact same size",
                  "Use decorative elements that distract from data",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[#ef4444] mt-0.5 shrink-0">-</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ========= Footer ========= */}
      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              StyleKit &middot; Dashboard Layout Showcase
            </p>
            <Link href="/styles/dashboard-layout" className="text-sm text-[#6366f1] font-medium hover:underline">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
