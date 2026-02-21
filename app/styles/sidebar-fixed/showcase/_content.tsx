"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
/*  Inline SVG icons — zero lucide-react dependency                    */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string; style?: React.CSSProperties };

function IconHome({ className = "", style }: IconProps) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function IconChart({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function IconUsers({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function IconSettings({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconSearch({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function IconBell({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function IconMenu({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconX({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconFolder({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  );
}

function IconFile({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function IconHelp({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconLogOut({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function IconTrendUp({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function IconTrendDown({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  );
}

function IconCart({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function IconDollar({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconChevronRight({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconShield({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function IconActivity({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function IconPanelClose({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18M15 9l-3 3 3 3" />
    </svg>
  );
}

function IconPanelOpen({ className = "", style }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18M12 9l3 3-3 3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ComponentTab = "navItems" | "headerBar" | "contentCards" | "breadcrumbs";

/* ------------------------------------------------------------------ */
/*  Nav data for live demo                                             */
/* ------------------------------------------------------------------ */

const navGroups = [
  {
    label: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: IconHome },
      { id: "analytics", label: "Analytics", icon: IconChart },
      { id: "users", label: "Users", icon: IconUsers, badge: 3 },
      { id: "orders", label: "Orders", icon: IconCart },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "documents", label: "Documents", icon: IconFile },
      { id: "projects", label: "Projects", icon: IconFolder },
    ],
  },
  {
    label: "System",
    items: [
      { id: "security", label: "Security", icon: IconShield },
      { id: "settings", label: "Settings", icon: IconSettings },
    ],
  },
];

const allNavItems = navGroups.flatMap((g) => g.items);

/* ------------------------------------------------------------------ */
/*  Stat card data                                                      */
/* ------------------------------------------------------------------ */

const statsData = [
  { label: "Total Revenue", value: "$84,320", delta: "+12.4%", up: true, color: "#3b82f6", icon: IconDollar },
  { label: "Active Users", value: "12,456", delta: "+8.1%", up: true, color: "#10b981", icon: IconUsers },
  { label: "Orders", value: "1,893", delta: "-2.3%", up: false, color: "#f59e0b", icon: IconCart },
  { label: "Uptime", value: "99.98%", delta: "+0.02%", up: true, color: "#3b82f6", icon: IconActivity },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("navItems");
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

  /* animation rule demo states */
  const [frictionlessActive, setFrictionlessActive] = useState(false);
  const [magneticHovered, setMagneticHovered] = useState<number | null>(null);
  const [solidActive, setSolidActive] = useState(0);
  const [contentLiftHovered, setContentLiftHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentNavItem = allNavItems.find((item) => item.id === activeNav);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800 overflow-x-hidden">
      <style>{`
        @keyframes sf-slide-in {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes sf-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sf-pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .sf-slide-in { animation: sf-slide-in 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
        .sf-fade-up  { animation: sf-fade-up  0.3s  cubic-bezier(0.16,1,0.3,1) forwards; }
        .sf-pulse-dot { animation: sf-pulse-dot 2s ease-in-out infinite; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED STICKY NAV                                              */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1e293b] flex items-center justify-center">
              <IconPanelClose className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-900 tracking-tight">
              Fixed<span className="text-[#3b82f6]">Sidebar</span>
            </span>
          </div>

          {/* Center nav items */}
          <nav className="hidden md:flex items-center gap-1">
            {["Layout", "Live Demo", "Anatomy", "Components", "Interactions", "Rules"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer transition-colors duration-150"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* CTA — back to StyleKit */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1e293b] text-white text-sm font-medium hover:bg-zinc-700 transition-colors duration-150"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — sidebar layout diagram + breakpoints                   */}
      {/* ================================================================ */}
      <section className="relative pt-24 pb-20 px-5 md:px-10 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(226,232,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-[0.14em] uppercase mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 sf-pulse-dot" />
              Layout Pattern — Fixed Sidebar
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-5 text-zinc-900"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Persistent nav.
            <br />
            <span className="text-[#3b82f6]">Maximum focus.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-xl mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Fixed sidebar navigation keeps every key action permanently accessible while
            the main content area scrolls freely. Built for dashboards, admin panels,
            doc sites, and SaaS apps.
          </p>

          {/* Layout diagrams — 3 breakpoints */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* Desktop */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Desktop 1024px+</div>
              <div className="flex gap-2 h-32 rounded-lg overflow-hidden border border-zinc-200">
                <div className="w-12 bg-zinc-900 flex flex-col items-center pt-3 gap-2 shrink-0">
                  <div className="w-5 h-1 bg-zinc-600 rounded" />
                  <div className="w-5 h-1 bg-blue-500 rounded" />
                  <div className="w-5 h-1 bg-zinc-600 rounded" />
                  <div className="w-5 h-1 bg-zinc-600 rounded" />
                </div>
                <div className="flex-1 bg-zinc-50 p-2 flex flex-col gap-1.5">
                  <div className="w-full h-3 bg-white border border-zinc-200 rounded" />
                  <div className="grid grid-cols-3 gap-1 flex-1">
                    <div className="bg-white border border-zinc-200 rounded" />
                    <div className="bg-white border border-zinc-200 rounded" />
                    <div className="bg-white border border-zinc-200 rounded" />
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-3 h-3 rounded bg-zinc-900 shrink-0" />
                  Sidebar: <code className="text-zinc-700 font-mono">w-64 fixed</code>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-3 h-3 rounded bg-zinc-100 border border-zinc-200 shrink-0" />
                  Content: <code className="text-zinc-700 font-mono">ml-64</code>
                </div>
              </div>
            </div>

            {/* Tablet */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Tablet 768px</div>
              <div className="flex gap-2 h-32 rounded-lg overflow-hidden border border-zinc-200">
                <div className="w-8 bg-zinc-800 flex flex-col items-center pt-3 gap-2 shrink-0">
                  <div className="w-4 h-1 bg-zinc-600 rounded" />
                  <div className="w-4 h-1 bg-blue-500 rounded" />
                  <div className="w-4 h-1 bg-zinc-600 rounded" />
                </div>
                <div className="flex-1 bg-zinc-50 p-2 flex flex-col gap-1.5">
                  <div className="w-full h-3 bg-white border border-zinc-200 rounded" />
                  <div className="grid grid-cols-2 gap-1 flex-1">
                    <div className="bg-white border border-zinc-200 rounded" />
                    <div className="bg-white border border-zinc-200 rounded" />
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-3 h-3 rounded bg-zinc-800 shrink-0" />
                  Sidebar: <code className="text-zinc-700 font-mono">w-16 icons</code>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-3 h-3 rounded bg-zinc-100 border border-zinc-200 shrink-0" />
                  Content: <code className="text-zinc-700 font-mono">ml-16</code>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Mobile &lt;768px</div>
              <div className="flex gap-2 h-32 rounded-lg overflow-hidden border border-zinc-200">
                <div className="flex-1 bg-zinc-50 p-2 flex flex-col gap-1.5">
                  <div className="w-full h-3 bg-white border border-zinc-200 rounded flex items-center px-1 gap-1">
                    <div className="flex flex-col gap-0.5">
                      <div className="w-3 h-0.5 bg-zinc-400 rounded" />
                      <div className="w-3 h-0.5 bg-zinc-400 rounded" />
                      <div className="w-3 h-0.5 bg-zinc-400 rounded" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="bg-white border border-zinc-200 rounded" />
                    <div className="bg-white border border-zinc-200 rounded" />
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-3 h-3 rounded bg-zinc-700 shrink-0" />
                  Sidebar: <code className="text-zinc-700 font-mono">off-canvas</code>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-3 h-3 rounded bg-zinc-100 border border-zinc-200 shrink-0" />
                  Content: <code className="text-zinc-700 font-mono">full-width</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. LIVE SIDEBAR DEMO                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 block mb-3">
              Interactive
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Live <span className="text-[#3b82f6]">sidebar demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
              Click nav items to switch active state. Toggle desktop/mobile view.
              Open and close the sidebar to see collapse behavior.
            </p>
          </RevealBlock>

          {/* Controls row */}
          <RevealBlock delay={0.08} className="mb-5">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setIsMobileView(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  !isMobileView
                    ? "bg-zinc-900 text-white"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth={2} />
                </svg>
                Desktop
              </button>
              <button
                onClick={() => {
                  setIsMobileView(true);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isMobileView
                    ? "bg-zinc-900 text-white"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="7" y="2" width="10" height="20" rx="2" strokeWidth={2} />
                </svg>
                Mobile
              </button>
              {!isMobileView && (
                <button
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 transition-colors duration-150"
                >
                  {sidebarOpen ? <IconPanelClose className="w-4 h-4" /> : <IconPanelOpen className="w-4 h-4" />}
                  {sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                </button>
              )}
            </div>
          </RevealBlock>

          {/* Demo viewport */}
          <RevealBlock delay={0.12}>
            <div
              className="relative rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-100 shadow-[0_8px_32px_rgba(15,23,42,0.1)]"
              style={{ height: isMobileView ? "520px" : "520px" }}
            >
              {/* ---- DESKTOP VIEW ---- */}
              {!isMobileView && (
                <div className="absolute inset-0 flex">
                  {/* Sidebar */}
                  <aside
                    className="relative flex flex-col bg-white border-r border-zinc-200 z-20 shrink-0 overflow-hidden"
                    style={{
                      width: sidebarOpen ? "220px" : "56px",
                      transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {/* Logo area */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-100 shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
                        <IconPanelClose className="w-4 h-4 text-white" />
                      </div>
                      {sidebarOpen && (
                        <span className="text-sm font-bold text-zinc-900 whitespace-nowrap sf-fade-up">
                          AppKit
                        </span>
                      )}
                    </div>

                    {/* Search (only when expanded) */}
                    {sidebarOpen && (
                      <div className="px-3 py-3 border-b border-zinc-100 shrink-0 sf-fade-up">
                        <div className="relative">
                          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                          <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-8 pr-3 py-1.5 bg-zinc-100 border-0 rounded-md text-xs text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                          />
                        </div>
                      </div>
                    )}

                    {/* Nav groups */}
                    <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
                      {navGroups.map((group) => (
                        <div key={group.label}>
                          {sidebarOpen && (
                            <div className="px-2 pb-1.5 text-[10px] font-semibold tracking-widest text-zinc-400 uppercase sf-fade-up">
                              {group.label}
                            </div>
                          )}
                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const isActive = activeNav === item.id;
                              const Icon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => setActiveNav(item.id)}
                                  onMouseEnter={() => setHoveredNavItem(item.id)}
                                  onMouseLeave={() => setHoveredNavItem(null)}
                                  className={`group relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors duration-150 ${
                                    isActive
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                                  }`}
                                >
                                  {/* Solid active accent line — Solid Active State rule */}
                                  {isActive && (
                                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-blue-600 rounded-r" />
                                  )}
                                  {/* Magnetic Icon Shift — icon shifts right on hover */}
                                  <Icon
                                    className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                                      !isActive && hoveredNavItem === item.id ? "translate-x-0.5" : ""
                                    }`}
                                  />
                                  {sidebarOpen && (
                                    <span className="text-xs font-medium whitespace-nowrap sf-fade-up flex-1">
                                      {item.label}
                                    </span>
                                  )}
                                  {sidebarOpen && "badge" in item && item.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 sf-fade-up">
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </nav>

                    {/* User profile at bottom */}
                    <div className="px-2 py-3 border-t border-zinc-100 shrink-0">
                      <div className="flex items-center gap-2.5 px-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shrink-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white">JD</span>
                        </div>
                        {sidebarOpen && (
                          <div className="flex-1 min-w-0 sf-fade-up">
                            <div className="text-xs font-semibold text-zinc-900 truncate">John Doe</div>
                            <div className="text-[10px] text-zinc-400">Admin</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </aside>

                  {/* Main content */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header bar */}
                    <div className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">Home</span>
                        <IconChevronRight className="w-3 h-3 text-zinc-300" />
                        <span className="text-xs font-medium text-zinc-700">
                          {currentNavItem?.label ?? "Dashboard"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="relative w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors duration-150">
                          <IconBell className="w-4 h-4 text-zinc-500" />
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 p-4 overflow-auto bg-zinc-50">
                      <h3 className="text-sm font-bold text-zinc-900 mb-3">
                        {currentNavItem?.label ?? "Dashboard"}
                      </h3>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {statsData.slice(0, 4).map((stat) => {
                          const StatIcon = stat.icon;
                          return (
                            <div
                              key={stat.label}
                              className="bg-white rounded-xl border border-zinc-200 p-3 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-zinc-400">{stat.label}</span>
                                <StatIcon className="w-3 h-3" style={{ color: stat.color }} />
                              </div>
                              <div className="text-sm font-bold text-zinc-900">{stat.value}</div>
                              <div className={`text-[10px] font-medium ${stat.up ? "text-emerald-500" : "text-red-400"}`}>
                                {stat.delta}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-white rounded-xl border border-zinc-200 p-3">
                        <div className="text-[10px] font-semibold text-zinc-400 mb-2">Recent Activity</div>
                        {["New user registered", "Order #1042 processed", "Report generated"].map((a) => (
                          <div key={a} className="flex items-center gap-2 py-1.5 border-b border-zinc-50 last:border-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            <span className="text-[10px] text-zinc-600">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- MOBILE VIEW ---- */}
              {isMobileView && (
                <div className="absolute inset-0 flex flex-col bg-zinc-50">
                  {/* Mobile header */}
                  <div className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0 z-10">
                    <button
                      onClick={() => setMobileOpen(true)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors duration-150"
                    >
                      <IconMenu className="w-4 h-4 text-zinc-600" />
                    </button>
                    <span className="text-sm font-semibold text-zinc-900">
                      {currentNavItem?.label ?? "Dashboard"}
                    </span>
                    <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors duration-150">
                      <IconBell className="w-4 h-4 text-zinc-500" />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                    </button>
                  </div>

                  {/* Mobile content */}
                  <div className="flex-1 p-4 overflow-auto">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {statsData.slice(0, 2).map((stat) => {
                        const StatIcon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="bg-white rounded-xl border border-zinc-200 p-3 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-zinc-400">{stat.label}</span>
                              <StatIcon className="w-3 h-3" style={{ color: stat.color }} />
                            </div>
                            <div className="text-sm font-bold text-zinc-900">{stat.value}</div>
                            <div className={`text-[10px] font-medium ${stat.up ? "text-emerald-500" : "text-red-400"}`}>
                              {stat.delta}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-white rounded-xl border border-zinc-200 p-3">
                      <div className="text-[10px] font-semibold text-zinc-400 mb-2">Recent Activity</div>
                      {["New user registered", "Order #1042 processed"].map((a) => (
                        <div key={a} className="flex items-center gap-2 py-1.5 border-b border-zinc-50 last:border-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          <span className="text-[10px] text-zinc-600">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile overlay */}
                  {mobileOpen && (
                    <div
                      className="absolute inset-0 bg-black/40 z-20"
                      onClick={() => setMobileOpen(false)}
                    />
                  )}

                  {/* Mobile slide-out sidebar */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-52 bg-white border-r border-zinc-200 z-30 flex flex-col shadow-xl"
                    style={{
                      transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-zinc-900 flex items-center justify-center">
                          <IconPanelClose className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900">AppKit</span>
                      </div>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors duration-150"
                      >
                        <IconX className="w-4 h-4 text-zinc-500" />
                      </button>
                    </div>

                    {/* Mobile nav */}
                    <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-4">
                      {navGroups.map((group) => (
                        <div key={group.label}>
                          <div className="px-2 pb-1.5 text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
                            {group.label}
                          </div>
                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const isActive = activeNav === item.id;
                              const Icon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setActiveNav(item.id);
                                    setMobileOpen(false);
                                  }}
                                  className={`group relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors duration-150 ${
                                    isActive
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                                  }`}
                                >
                                  {isActive && (
                                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-blue-600 rounded-r" />
                                  )}
                                  <Icon
                                    className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                                      !isActive ? "group-hover:translate-x-0.5" : ""
                                    }`}
                                  />
                                  <span className="text-xs font-medium flex-1">{item.label}</span>
                                  {"badge" in item && item.badge ? (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                      {item.badge}
                                    </span>
                                  ) : null}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </nav>

                    {/* User */}
                    <div className="px-2 py-3 border-t border-zinc-100">
                      <div className="flex items-center gap-2.5 px-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white">JD</span>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-zinc-900">John Doe</div>
                          <div className="text-[10px] text-zinc-400">Admin</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: hamburger label */}
                  {!mobileOpen && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <button
                        onClick={() => setMobileOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-medium shadow-lg"
                      >
                        <IconMenu className="w-3.5 h-3.5" />
                        Open sidebar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. LAYOUT ANATOMY                                                */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 block mb-3">
              Anatomy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Sidebar <span className="text-[#10b981]">structure</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
              Five vertical zones from top to bottom, each with a clear responsibility.
              The navigation zone is the only scrollable area.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Sidebar diagram */}
            <RevealBlock delay={0.1}>
              <div className="relative">
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex" style={{ height: "480px" }}>
                  {/* Sidebar column */}
                  <div className="w-56 bg-zinc-50 border-r border-zinc-200 flex flex-col relative">
                    {/* Zone labels */}
                    {[
                      { top: "0px", h: "72px", label: "Logo / Brand", color: "bg-blue-50 border-blue-200", textColor: "text-blue-600" },
                      { top: "72px", h: "56px", label: "Search", color: "bg-purple-50 border-purple-200", textColor: "text-purple-600" },
                      { top: "128px", h: "216px", label: "Navigation (scrollable)", color: "bg-emerald-50 border-emerald-200", textColor: "text-emerald-600" },
                      { top: "344px", h: "64px", label: "Secondary / Settings", color: "bg-amber-50 border-amber-200", textColor: "text-amber-600" },
                      { top: "408px", h: "72px", label: "User Profile", color: "bg-red-50 border-red-200", textColor: "text-red-500" },
                    ].map((zone) => (
                      <div
                        key={zone.label}
                        className={`absolute left-0 right-0 border-b ${zone.color} flex items-center px-3`}
                        style={{ top: zone.top, height: zone.h }}
                      >
                        <span className={`text-[10px] font-semibold ${zone.textColor}`}>{zone.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Main content column */}
                  <div className="flex-1 flex flex-col">
                    <div className="h-12 bg-zinc-100 border-b border-zinc-200 flex items-center px-4">
                      <span className="text-[10px] font-semibold text-zinc-400">Header Bar</span>
                    </div>
                    <div className="flex-1 bg-white p-4">
                      <span className="text-[10px] font-semibold text-zinc-300">Main Content Area</span>
                    </div>
                  </div>
                </div>

                {/* Width annotation */}
                <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-px bg-zinc-400" />
                    <div className="w-1 h-1 rounded-full bg-zinc-400" />
                  </div>
                  <code className="font-mono text-zinc-700">w-64 = 256px</code>
                  <span className="text-zinc-400">(or w-72 = 288px for wider variant)</span>
                </div>
              </div>
            </RevealBlock>

            {/* Zone descriptions */}
            <RevealBlock delay={0.15}>
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    label: "Logo / Brand",
                    desc: "Fixed height header with product logo and optional workspace switcher. Sets the brand context immediately.",
                    detail: "height: 64–80px, border-bottom, flex items-center",
                    color: "border-blue-200 bg-blue-50",
                    numColor: "text-blue-400",
                  },
                  {
                    num: "02",
                    label: "Search (optional)",
                    desc: "Quick-access search input. Visible only when sidebar is expanded. Hides in collapsed icon-only mode.",
                    detail: "height: 52–60px, focus:ring-2 focus:ring-blue-400/30",
                    color: "border-purple-200 bg-purple-50",
                    numColor: "text-purple-400",
                  },
                  {
                    num: "03",
                    label: "Navigation",
                    desc: "The primary scrollable zone. Groups related items with section labels. Current item has solid left accent line.",
                    detail: "flex-1, overflow-y-auto, space-y-1 per group",
                    color: "border-emerald-200 bg-emerald-50",
                    numColor: "text-emerald-500",
                  },
                  {
                    num: "04",
                    label: "Secondary / Settings",
                    desc: "Lower-priority links: Help, Feedback, Settings. Separated visually to avoid navigation confusion.",
                    detail: "border-top, space-y-1, muted colors",
                    color: "border-amber-200 bg-amber-50",
                    numColor: "text-amber-500",
                  },
                  {
                    num: "05",
                    label: "User Profile",
                    desc: "Avatar, name, and role. May include account menu or logout action. Always anchored to the very bottom.",
                    detail: "border-top, height: 64–72px, flex items-center gap-3",
                    color: "border-red-200 bg-red-50",
                    numColor: "text-red-400",
                  },
                ].map((zone) => (
                  <div key={zone.num} className={`rounded-xl border ${zone.color} p-4`}>
                    <div className="flex items-start gap-3">
                      <span className={`text-2xl font-black ${zone.numColor} shrink-0`}>{zone.num}</span>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 mb-1">{zone.label}</div>
                        <p className="text-xs text-zinc-600 leading-relaxed mb-2">{zone.desc}</p>
                        <code className="text-[10px] text-zinc-400 font-mono">{zone.detail}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENT GALLERY — 4 tabs                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Component <span className="text-[#f59e0b]">gallery</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
              The four core building blocks of a fixed sidebar layout, each demonstrated
              with interactive states.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.08} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {(["navItems", "headerBar", "contentCards", "breadcrumbs"] as ComponentTab[]).map((tab) => {
                const labels: Record<ComponentTab, string> = {
                  navItems: "Nav Items",
                  headerBar: "Header Bar",
                  contentCards: "Content Cards",
                  breadcrumbs: "Breadcrumbs",
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      activeTab === tab
                        ? "bg-zinc-900 text-white"
                        : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.12}>
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 md:p-10">

              {/* ---- NAV ITEMS TAB ---- */}
              {activeTab === "navItems" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Active item */}
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-5">Active state — solid anchor</div>
                    <div className="space-y-1 w-56 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                      {[
                        { id: "dash", label: "Dashboard", Icon: IconHome, active: true },
                        { id: "analytics", label: "Analytics", Icon: IconChart, active: false },
                        { id: "users", label: "Users", Icon: IconUsers, active: false, badge: 3 },
                        { id: "settings", label: "Settings", Icon: IconSettings, active: false },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-default transition-colors duration-150 ${
                            item.active
                              ? "bg-blue-50 text-blue-700"
                              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                          }`}
                        >
                          {item.active && (
                            <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-600 rounded-r" />
                          )}
                          <item.Icon
                            className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                              !item.active ? "group-hover:translate-x-0.5" : ""
                            }`}
                          />
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          {"badge" in item && item.badge ? (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                      Active item: <code className="font-mono text-zinc-600">bg-blue-50 text-blue-700</code> with
                      absolute <code className="font-mono text-zinc-600">left-0 w-0.5 bg-blue-600</code> accent line.
                      Stable, not floating.
                    </p>
                  </div>

                  {/* Collapsed icons-only */}
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-5">Collapsed — icons only (w-16)</div>
                    <div className="w-16 p-2 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                      {[
                        { Icon: IconHome, active: true },
                        { Icon: IconChart, active: false },
                        { Icon: IconUsers, active: false },
                        { Icon: IconSettings, active: false },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`group relative flex items-center justify-center w-full py-3 rounded-lg cursor-default transition-colors duration-150 ${
                            item.active
                              ? "bg-blue-50 text-blue-700"
                              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                          }`}
                        >
                          {item.active && (
                            <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-600 rounded-r" />
                          )}
                          <item.Icon
                            className={`w-4 h-4 transition-transform duration-150 ${
                              !item.active ? "group-hover:translate-x-0.5" : ""
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                      Collapsed to <code className="font-mono text-zinc-600">w-16</code> = 64px.
                      Labels hidden, icons centered. Active line persists.
                    </p>
                  </div>
                </div>
              )}

              {/* ---- HEADER BAR TAB ---- */}
              {activeTab === "headerBar" && (
                <div className="space-y-8">
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-5">Full header bar</div>
                    <div className="rounded-xl border border-zinc-200 overflow-hidden">
                      <div className="h-14 bg-white flex items-center justify-between px-5 border-b border-zinc-100">
                        {/* Left: breadcrumb */}
                        <div className="flex items-center gap-1.5 text-sm">
                          <span className="text-zinc-400">Home</span>
                          <IconChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                          <span className="text-zinc-600">Analytics</span>
                          <IconChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                          <span className="font-medium text-zinc-900">Overview</span>
                        </div>
                        {/* Right: actions */}
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-medium transition-colors duration-150">
                            <IconSearch className="w-3.5 h-3.5" />
                            Search
                          </button>
                          <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors duration-150">
                            <IconBell className="w-4 h-4 text-zinc-500" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                          </button>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center cursor-pointer">
                            <span className="text-[10px] font-bold text-white">JD</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-20 bg-zinc-50 flex items-center justify-center">
                        <span className="text-xs text-zinc-300">main content area</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold tracking-widests uppercase text-zinc-400 mb-5">Minimal header bar</div>
                    <div className="rounded-xl border border-zinc-200 overflow-hidden">
                      <div className="h-12 bg-white flex items-center justify-between px-5 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-900">Dashboard Overview</h2>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors duration-150">
                          + New Report
                        </button>
                      </div>
                      <div className="h-20 bg-zinc-50 flex items-center justify-center">
                        <span className="text-xs text-zinc-300">main content area</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CONTENT CARDS TAB ---- */}
              {activeTab === "contentCards" && (
                <div className="space-y-6">
                  <div className="text-xs font-semibold tracking-widests uppercase text-zinc-400 mb-2">
                    Content Lift — hover: -translate-y-0.5 + lightweight shadow
                  </div>
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statsData.map((stat, i) => {
                      const StatIcon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="bg-white rounded-xl border border-zinc-200 p-5 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out cursor-default"
                          onMouseEnter={() => setContentLiftHovered(i)}
                          onMouseLeave={() => setContentLiftHovered(null)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-zinc-400 font-medium">{stat.label}</span>
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${stat.color}20` }}
                            >
                              <StatIcon className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                          </div>
                          <div className="text-xl font-bold text-zinc-900 mb-1">{stat.value}</div>
                          <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-emerald-500" : "text-red-400"}`}>
                            {stat.up ? <IconTrendUp className="w-3 h-3" /> : <IconTrendDown className="w-3 h-3" />}
                            {stat.delta}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {contentLiftHovered !== null && (
                    <p className="text-xs text-zinc-400">
                      Content Lift active — card rises <code className="font-mono text-zinc-600">-translate-y-0.5</code> (2px) with
                      <code className="font-mono text-zinc-600"> shadow-[0_8px_20px_rgba(15,23,42,0.08)]</code>. No bounce, no spring — pure utility.
                    </p>
                  )}

                  {/* Data table card */}
                  <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 ease-out">
                    <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-900">Recent Orders</span>
                      <span className="text-xs text-zinc-400">View all</span>
                    </div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-zinc-100">
                          <th className="px-5 py-3 text-left font-semibold text-zinc-400">Order</th>
                          <th className="px-5 py-3 text-left font-semibold text-zinc-400">Status</th>
                          <th className="px-5 py-3 text-right font-semibold text-zinc-400">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "#1042", status: "Completed", amount: "$124.00", statusColor: "text-emerald-600 bg-emerald-50" },
                          { id: "#1041", status: "Processing", amount: "$89.50", statusColor: "text-blue-600 bg-blue-50" },
                          { id: "#1040", status: "Pending", amount: "$212.00", statusColor: "text-amber-600 bg-amber-50" },
                        ].map((row) => (
                          <tr key={row.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors duration-100">
                            <td className="px-5 py-3 font-mono text-zinc-700">{row.id}</td>
                            <td className="px-5 py-3">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${row.statusColor}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right font-medium text-zinc-900">{row.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ---- BREADCRUMBS TAB ---- */}
              {activeTab === "breadcrumbs" && (
                <div className="space-y-8">
                  <div>
                    <div className="text-xs font-semibold tracking-widests uppercase text-zinc-400 mb-5">Standard breadcrumb</div>
                    <nav className="flex items-center gap-1.5 text-sm flex-wrap">
                      {["Home", "Dashboard", "Analytics", "Overview"].map((crumb, i, arr) => (
                        <span key={crumb} className="flex items-center gap-1.5">
                          <span
                            className={
                              i === arr.length - 1
                                ? "font-medium text-zinc-900"
                                : "text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors duration-150"
                            }
                          >
                            {crumb}
                          </span>
                          {i < arr.length - 1 && <IconChevronRight className="w-3.5 h-3.5 text-zinc-300" />}
                        </span>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <div className="text-xs font-semibold tracking-widests uppercase text-zinc-400 mb-5">Pill breadcrumb</div>
                    <nav className="flex items-center gap-2 flex-wrap">
                      {["Home", "Content", "Projects", "Q1 Report"].map((crumb, i, arr) => (
                        <span key={crumb} className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                              i === arr.length - 1
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 cursor-pointer"
                            }`}
                          >
                            {crumb}
                          </span>
                          {i < arr.length - 1 && <span className="text-zinc-300 text-xs">/</span>}
                        </span>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <div className="text-xs font-semibold tracking-widests uppercase text-zinc-400 mb-5">With page title</div>
                    <div>
                      <nav className="flex items-center gap-1.5 text-xs mb-2 text-zinc-400 flex-wrap">
                        <span className="hover:text-zinc-600 cursor-pointer transition-colors duration-150">Home</span>
                        <IconChevronRight className="w-3 h-3 text-zinc-300" />
                        <span className="hover:text-zinc-600 cursor-pointer transition-colors duration-150">Users</span>
                        <IconChevronRight className="w-3 h-3 text-zinc-300" />
                        <span className="text-zinc-600 font-medium">John Doe</span>
                      </nav>
                      <h1 className="text-2xl font-bold text-zinc-900">John Doe</h1>
                      <p className="text-sm text-zinc-500 mt-1">Admin &middot; Joined Jan 2024</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES DEMO                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 block mb-3">
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Animation <span className="text-[#3b82f6]">rules demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
              Four named interaction rules that govern all sidebar layout behavior.
              Hover or click each demo card to feel the constraint in action.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Frictionless Utility */}
            <RevealBlock delay={0.08}>
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-8 h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-600 text-xs font-semibold">Frictionless Utility</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mb-1 mt-3">duration-150 — no overshot spring</p>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  High-interaction areas like nav items use <code className="font-mono text-zinc-700">duration-150</code> for instant response.
                  Fancy spring effects break workflow rhythm.
                </p>

                <div className="space-y-2">
                  {/* Fast (correct) */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-emerald-500 w-20 shrink-0">CORRECT 150ms</span>
                    <button
                      onClick={() => setFrictionlessActive((v) => !v)}
                      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg w-full text-left transition-colors duration-150 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 bg-white border border-zinc-200"
                    >
                      <IconChart className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                      <span className="text-sm font-medium">Analytics</span>
                    </button>
                  </div>
                  {/* Slow (wrong) */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-red-400 w-20 shrink-0">WRONG 700ms</span>
                    <button
                      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg w-full text-left text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 bg-white border border-zinc-200"
                      style={{ transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)" }}
                    >
                      <IconChart className="w-4 h-4 group-hover:translate-x-2 group-hover:scale-125" style={{ transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)" }} />
                      <span className="text-sm font-medium">Analytics</span>
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-xs text-zinc-400">
                  Hover both rows — feel the efficiency difference.
                  Nav items must never feel sluggish.
                </p>
              </div>
            </RevealBlock>

            {/* Card 2: Magnetic Icon Shift */}
            <RevealBlock delay={0.12}>
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-8 h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-600 text-xs font-semibold">Magnetic Icon Shift</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mb-1 mt-3">translate-x-0.5 on hover</p>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  On hover, icons shift 2px right. The micro-movement guides the eye
                  toward the main content area — directional affordance without noise.
                </p>

                <div className="w-52 rounded-xl bg-white border border-zinc-200 p-2 space-y-0.5">
                  {[
                    { id: 0, label: "Dashboard", Icon: IconHome },
                    { id: 1, label: "Analytics", Icon: IconChart },
                    { id: 2, label: "Users", Icon: IconUsers },
                    { id: 3, label: "Settings", Icon: IconSettings },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-default text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-150"
                      onMouseEnter={() => setMagneticHovered(item.id)}
                      onMouseLeave={() => setMagneticHovered(null)}
                    >
                      <item.Icon
                        className="w-4 h-4 shrink-0 transition-transform duration-150"
                        style={{ transform: magneticHovered === item.id ? "translateX(2px)" : "translateX(0)" }}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                      {magneticHovered === item.id && (
                        <span className="ml-auto text-[10px] text-zinc-300 font-mono">+2px</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Card 3: Solid Active State */}
            <RevealBlock delay={0.16}>
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-8 h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-600 text-xs font-semibold">Solid Active State</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mb-1 mt-3">left accent line — stable anchor</p>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  Current item has a solid 2px left border as a permanent anchor.
                  No floating ring, no glow — the user always knows exactly where they are.
                </p>

                <div className="w-52 rounded-xl bg-white border border-zinc-200 p-2 space-y-0.5">
                  {[
                    { id: 0, label: "Dashboard", Icon: IconHome },
                    { id: 1, label: "Analytics", Icon: IconChart },
                    { id: 2, label: "Users", Icon: IconUsers },
                    { id: 3, label: "Orders", Icon: IconCart },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSolidActive(item.id)}
                      className={`group relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 ${
                        solidActive === item.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      {solidActive === item.id && (
                        <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-600 rounded-r" />
                      )}
                      <item.Icon
                        className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                          solidActive !== item.id ? "group-hover:translate-x-0.5" : ""
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                      {solidActive === item.id && (
                        <span className="ml-auto text-[10px] text-blue-400 font-mono">active</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-zinc-400">Click to change active item — the left line anchors instantly.</p>
              </div>
            </RevealBlock>

            {/* Card 4: Content Lift */}
            <RevealBlock delay={0.2}>
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-8 h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-600 text-xs font-semibold">Content Lift</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mb-1 mt-3">-translate-y-0.5 + lightweight shadow</p>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  Main area cards lift by only 2px on hover with a subtle shadow spread.
                  Reading stays stable — no dramatic jumps that interrupt scanning.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Correct", desc: "Subtle lift", cls: "hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]", tag: "CORRECT", tagColor: "text-emerald-500" },
                    { label: "Wrong", desc: "Too dramatic", cls: "hover:-translate-y-4 hover:shadow-[0_24px_48px_rgba(15,23,42,0.25)]", tag: "WRONG", tagColor: "text-red-400" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`bg-white rounded-xl border border-zinc-200 p-4 cursor-default transition-all duration-150 ease-out ${item.cls}`}
                    >
                      <span className={`text-[10px] font-bold ${item.tagColor}`}>{item.tag}</span>
                      <div className="text-sm font-semibold text-zinc-900 mt-1">{item.label}</div>
                      <div className="text-xs text-zinc-400">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-zinc-400">
                  Hover both cards side by side — the left card is barely perceptible,
                  the right is jarring. Use the left approach.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN RULES DO / DON'T                                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 block mb-3">
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Do &amp; <span className="text-zinc-400">Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
              The non-negotiable constraints that define the Fixed Sidebar layout.
              Every rule exists to protect usability and developer confidence.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Do */}
            <RevealBlock delay={0.08}>
              <div className="bg-white rounded-2xl border border-emerald-200 p-8 h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-emerald-700">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Sidebar: fixed top-0 left-0 w-64 h-screen",
                    "Main content: ml-64 (matches sidebar width)",
                    "Mobile: off-canvas drawer with hamburger trigger",
                    "Active state: left accent line or bold bg tint",
                    "Nav overflow: sidebar nav scrollable if needed",
                    "Sidebar width: w-64 (256px) or w-72 (288px)",
                    "Nav interactions: duration-150, no spring",
                    "Icon hover: translate-x-0.5 (2px magnetic shift)",
                    "Card hover: -translate-y-0.5 and light shadow only",
                    "Sidebar: always includes logo, nav, user profile",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.12}>
              <div className="bg-white rounded-2xl border border-red-200 p-8 h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-500">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Sidebar too wide (never exceed 280px)",
                    "Keep sidebar expanded on mobile",
                    "Omit current page indicator from nav",
                    "Use floating rings or glow for active state",
                    "Allow sidebar content to overflow without scroll",
                    "Use bounce, rotation, or spring on nav items",
                    "Create nav hierarchies deeper than 2 levels",
                    "Apply -translate-y-2 or more on card hover",
                    "Use duration-700+ on high-frequency interactions",
                    "Forget the mobile overlay when sidebar opens",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-300 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Quick reference grid */}
          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-2xl border border-zinc-200 p-8">
              <div className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-6">Quick reference — key CSS values</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Sidebar width", value: "w-64 (256px)", color: "bg-blue-50 text-blue-700" },
                  { label: "Content offset", value: "ml-64", color: "bg-blue-50 text-blue-700" },
                  { label: "Nav transition", value: "duration-150", color: "bg-emerald-50 text-emerald-700" },
                  { label: "Icon shift", value: "translate-x-0.5", color: "bg-indigo-50 text-indigo-700" },
                  { label: "Active line", value: "w-0.5 left-0", color: "bg-zinc-100 text-zinc-700" },
                  { label: "Card lift", value: "-translate-y-0.5", color: "bg-zinc-100 text-zinc-700" },
                  { label: "Card shadow", value: "rgba(15,23,42,0.08)", color: "bg-zinc-100 text-zinc-700" },
                  { label: "Mobile z-index", value: "z-40", color: "bg-amber-50 text-amber-700" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl px-4 py-3 ${item.color}`}>
                    <div className="text-[10px] font-semibold uppercase tracking-wider opacity-60 mb-1">{item.label}</div>
                    <code className="text-xs font-mono font-semibold">{item.value}</code>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="bg-[#1e293b] text-zinc-400 border-t border-zinc-700">
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-14 pb-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center">
                  <IconPanelClose className="w-4 h-4 text-zinc-300" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Fixed<span className="text-[#3b82f6]">Sidebar</span>
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Persistent navigation. Maximum content focus.
                The canonical layout for dashboards, admin panels, and SaaS products.
              </p>
              {/* Color swatches */}
              <div className="flex gap-2">
                {["#1e293b", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
                  <div
                    key={c}
                    className="w-5 h-5 rounded-full ring-1 ring-white/10 hover:scale-110 transition-transform duration-150 cursor-default"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-500">Style</span>
                <Link href="/styles/sidebar-fixed" className="text-zinc-400 hover:text-white transition-colors duration-150">
                  Documentation
                </Link>
                <Link href="/styles/sidebar-fixed/showcase" className="text-zinc-400 hover:text-white transition-colors duration-150">
                  Showcase
                </Link>
                <Link href="/styles/sidebar-fixed/cover" className="text-zinc-400 hover:text-white transition-colors duration-150">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-500">StyleKit</span>
                <Link href="/" className="text-zinc-400 hover:text-white transition-colors duration-150">
                  Home
                </Link>
                <Link href="/styles" className="text-zinc-400 hover:text-white transition-colors duration-150">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-500">Colors</span>
                {[
                  { name: "Slate Dark", hex: "#1e293b" },
                  { name: "Blue", hex: "#3b82f6" },
                  { name: "Emerald", hex: "#10b981" },
                  { name: "Amber", hex: "#f59e0b" },
                ].map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-zinc-500 text-xs">
                    <span
                      className="w-3 h-3 rounded-full inline-block ring-1 ring-white/10"
                      style={{ backgroundColor: s.hex }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-700 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>Built for StyleKit</span>
              <span className="text-zinc-700">&middot;</span>
              <span>Fixed Sidebar Layout Pattern</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-700 text-zinc-200 text-sm font-medium hover:bg-zinc-600 hover:text-white transition-colors duration-150"
            >
              <span>&#8592;</span>
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
