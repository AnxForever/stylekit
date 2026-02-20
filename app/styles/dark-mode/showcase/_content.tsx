"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Scroll animation primitives ───────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Static data ────────────────────────────────────────────────────────────

const NAV_LINKS = ["Docs", "API", "Changelog", "Blog"];

const FEATURE_CARDS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    accent: "blue",
    title: "Developer Dashboard",
    desc: "Real-time metrics and system monitoring with comfortable contrast for extended sessions.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accent: "green",
    title: "Performance First",
    desc: "Optimized rendering pipeline with sub-50ms response times across all interactions.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    accent: "amber",
    title: "Secure by Default",
    desc: "End-to-end encryption and role-based access control built into every layer.",
  },
];

const ACCENT_MAP: Record<string, { icon: string; ring: string; bg: string; text: string }> = {
  blue: {
    icon: "bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30",
    ring: "",
    bg: "",
    text: "text-blue-400",
  },
  green: {
    icon: "bg-green-600/20 text-green-400 group-hover:bg-green-600/30",
    ring: "",
    bg: "",
    text: "text-green-400",
  },
  amber: {
    icon: "bg-amber-600/20 text-amber-400 group-hover:bg-amber-600/30",
    ring: "",
    bg: "",
    text: "text-amber-400",
  },
};

const COLOR_RAMP = [
  { label: "Base", hex: "#0f172a", tw: "bg-[#0f172a]", role: "Page background" },
  { label: "Surface", hex: "#1e293b", tw: "bg-[#1e293b]", role: "Card / panel" },
  { label: "Elevated", hex: "#334155", tw: "bg-[#334155]", role: "Tooltip / modal" },
  { label: "Border", hex: "#334155", tw: "bg-slate-700", role: "Dividers" },
  { label: "Blue", hex: "#3b82f6", tw: "bg-blue-500", role: "Primary accent" },
  { label: "Green", hex: "#22c55e", tw: "bg-green-500", role: "Success" },
  { label: "Amber", hex: "#f59e0b", tw: "bg-amber-500", role: "Warning" },
  { label: "Red", hex: "#ef4444", tw: "bg-red-500", role: "Danger / error" },
];

const TEXT_RAMP = [
  { sample: "Primary text", tw: "text-slate-100", hex: "#f1f5f9", role: "Headings, labels" },
  { sample: "Secondary text", tw: "text-slate-300", hex: "#cbd5e1", role: "Body copy" },
  { sample: "Muted text", tw: "text-slate-400", hex: "#94a3b8", role: "Captions, hints" },
  { sample: "Disabled text", tw: "text-slate-500", hex: "#64748b", role: "Placeholders" },
];

const DO_LIST = [
  "Deep backgrounds: bg-slate-900 / bg-[#0f172a]",
  "Semi-transparent cards: bg-slate-800/50, hover:bg-slate-800",
  "Low-contrast borders: border-slate-700, hover:border-slate-500",
  "Text hierarchy: text-slate-100 primary, text-slate-400 secondary",
  "Saturated accents: blue-500, green-500",
  "Inset top-edge glow on buttons: shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
  "Tactile press: active:scale-[0.98] on every button",
  "Visible focus: focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
  "Card elevation: hover:-translate-y-0.5 + deep dark shadow",
];

const DONT_LIST = [
  "Pure white text (text-white is too harsh on slate-900)",
  "High-contrast borders — they break the low-light illusion",
  "Pure black background (#000000 looks flat and lifeless)",
  "Dark text on dark surfaces — always check contrast ratio",
  "Too many accent colors in one view",
  "Light-colored shadows — invisible on dark backgrounds",
  "Buttons without active:scale-[0.98] — no tactile feedback",
  "focus:ring without ring-offset-slate-900 — ring merges with bg",
];

const SIDEBAR_ITEMS = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Overview" },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics" },
  { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Settings" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Team" },
  { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", label: "Alerts" },
];

const CODE_SNIPPET = `// Authentication middleware
import { verify } from "@/lib/auth";

export async function middleware(req: Request) {
  const token = req.headers.get("authorization");

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await verify(token.split(" ")[1]);
  return payload ? next(req) : forbidden();
}`;

const STAT_ITEMS = [
  { value: "99.9%", label: "Uptime SLA", change: "+0.1%", up: true },
  { value: "12.4K", label: "Active Users", change: "+18%", up: true },
  { value: "45ms", label: "Avg Response", change: "-12ms", up: true },
  { value: "2.1TB", label: "Data Stored", change: "+340GB", up: false },
];

const ALERT_VARIANTS = [
  {
    kind: "info",
    bg: "bg-blue-600/10",
    border: "border-blue-500/30",
    titleColor: "text-blue-400",
    iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Information",
    body: "A new software update is available. Restart to apply changes.",
  },
  {
    kind: "success",
    bg: "bg-green-600/10",
    border: "border-green-500/30",
    titleColor: "text-green-400",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Success",
    body: "Deployment complete — all 12 services are running normally.",
  },
  {
    kind: "warning",
    bg: "bg-amber-600/10",
    border: "border-amber-500/30",
    titleColor: "text-amber-400",
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    title: "Warning",
    body: "CPU usage at 87% — consider scaling the compute tier.",
  },
  {
    kind: "error",
    bg: "bg-red-600/10",
    border: "border-red-500/30",
    titleColor: "text-red-400",
    iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Error",
    body: "Database connection failed. Check credentials and network access.",
  },
];

// ─── Main export ─────────────────────────────────────────────────────────────

export default function DarkModeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const toggleSwitch = (i: number) => {
    setToggleStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">

      {/* ── 1. Fixed Navigation ──────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link
            href="/styles/dark-mode"
            className="flex items-center gap-2 font-semibold text-slate-100 text-sm group"
          >
            <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_14px_rgba(59,130,246,0.7)] transition-shadow duration-300">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </span>
            Dark Mode
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/styles"
              className="px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-700 hover:border-slate-600 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_10px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* ── 2. Hero Section ──────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-4 md:px-8 overflow-hidden border-b border-slate-800">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute top-32 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/15 border border-blue-500/25 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-400 tracking-wide">Dark Interface Design</span>
            </div>
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 mb-6 leading-[1.05]">
              Built for developers
              <br />
              <span className="text-blue-400 [text-shadow:0_0_40px_rgba(59,130,246,0.4)]">
                who ship at night.
              </span>
            </h1>
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Elegant dark interfaces with layered surface hierarchy, precise contrast ratios,
              and blue-accented interactions optimized for professional tools.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="px-7 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(59,130,246,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out">
                Get started free
              </button>
              <button className="px-7 py-3 bg-slate-800 text-slate-200 border border-slate-700 font-medium rounded-xl hover:bg-slate-700 hover:border-slate-600 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out">
                View documentation
              </button>
            </div>
          </div>
        </div>

        {/* Hero stat strip */}
        <div
          className="relative max-w-3xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 rounded-2xl overflow-hidden border border-slate-800"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s",
          }}
        >
          {STAT_ITEMS.map((s) => (
            <div key={s.label} className="bg-[#0f172a] px-6 py-5 text-center">
              <div className="text-2xl font-bold text-slate-100 mb-0.5">{s.value}</div>
              <div className="text-xs text-slate-500 mb-1">{s.label}</div>
              <div className={`text-xs font-medium ${s.up ? "text-green-400" : "text-amber-400"}`}>
                {s.change}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Component Demos ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">
              Component Library
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl">
              Every component follows the dark-mode physics: inset glow buttons, illumination-on-hover cards,
              and visible focus rings with <code className="text-blue-400 text-sm font-mono">ring-offset-slate-900</code>.
            </p>
          </RevealBlock>

          {/* Buttons */}
          <RevealBlock delay={0.05} className="mb-10">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-6">Buttons</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">Variants</p>
                  <div className="flex flex-wrap gap-3">
                    {/* Primary */}
                    <button className="px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_10px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out">
                      Primary
                    </button>
                    {/* Secondary */}
                    <button className="px-5 py-2 bg-slate-700 text-slate-200 font-medium text-sm rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-slate-600 hover:text-slate-100 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-200 ease-out">
                      Secondary
                    </button>
                    {/* Ghost */}
                    <button className="px-5 py-2 text-slate-300 font-medium text-sm rounded-lg hover:bg-white/5 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] active:bg-white/10 transition-all duration-200 ease-out">
                      Ghost
                    </button>
                    {/* Success */}
                    <button className="px-5 py-2 bg-green-600/20 text-green-400 border border-green-500/30 font-medium text-sm rounded-lg hover:bg-green-600/30 hover:border-green-500/50 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out">
                      Success
                    </button>
                    {/* Danger */}
                    <button className="px-5 py-2 bg-red-600/20 text-red-400 border border-red-500/30 font-medium text-sm rounded-lg hover:bg-red-600/30 hover:border-red-500/50 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out">
                      Danger
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">Sizes</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="px-3 py-1.5 bg-blue-600 text-white font-medium text-xs rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out">
                      Small
                    </button>
                    <button className="px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out">
                      Medium
                    </button>
                    <button className="px-7 py-3 bg-blue-600 text-white font-medium text-base rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out">
                      Large
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">With Icon</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Project
                    </button>
                    <button className="px-5 py-2 bg-slate-700 text-slate-200 font-medium text-sm rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200 ease-out flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Feature Cards — group + group-hover */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-6">Cards</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {FEATURE_CARDS.map((card, i) => (
                  <div
                    key={i}
                    className="group bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${ACCENT_MAP[card.accent].icon}`}
                      >
                        {card.icon}
                      </div>
                      <h4 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Input / Form */}
          <RevealBlock delay={0.15}>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-6">Form Elements</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-300">Email address</label>
                    <input
                      type="email"
                      defaultValue=""
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <input
                      type="password"
                      defaultValue=""
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-300">
                      Notes
                      <span className="ml-2 text-xs text-slate-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 resize-none"
                      placeholder="Write a message..."
                    />
                  </div>
                  <button className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_10px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out">
                    Submit
                  </button>
                </div>

                {/* Toggles + Checkboxes */}
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Toggles</p>
                    <div className="space-y-3">
                      {["Dark Mode", "Notifications", "Auto-save"].map((label, i) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">{label}</span>
                          <button
                            role="switch"
                            aria-checked={toggleStates[i]}
                            aria-label={label}
                            onClick={() => toggleSwitch(i)}
                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                              toggleStates[i] ? "bg-blue-600" : "bg-slate-700"
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                                toggleStates[i] ? "left-6" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Select</p>
                    <select className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 appearance-none cursor-pointer">
                      <option value="">Choose a plan...</option>
                      <option value="free">Free</option>
                      <option value="pro">Pro — $12/mo</option>
                      <option value="team">Team — $49/mo</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Status Badges</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-green-600/20 text-green-400 border border-green-500/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Online
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Degraded
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-red-600/20 text-red-400 border border-red-500/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        Incident
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 4. Color System ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-slate-800/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">Color System</h2>
            <p className="text-slate-400 mb-12 max-w-xl">
              Surface hierarchy through luminance steps, not hue. Blue anchors attention; semantic colors
              communicate state.
            </p>
          </RevealBlock>

          {/* Surface ramp */}
          <RevealBlock delay={0.07} className="mb-10">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Surface Hierarchy</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {COLOR_RAMP.slice(0, 4).map((c) => (
                <div key={c.label} className="group rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all duration-300 cursor-default">
                  <div className={`h-24 ${c.tw}`} />
                  <div className="bg-slate-800 p-3">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">{c.label}</p>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{c.hex}</p>
                    <p className="text-xs text-slate-500 mt-1">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Semantic colors */}
          <RevealBlock delay={0.12} className="mb-10">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {COLOR_RAMP.slice(4).map((c) => (
                <div key={c.label} className="group rounded-xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all duration-300 cursor-default">
                  <div className={`h-24 ${c.tw} shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]`} />
                  <div className="bg-slate-800 p-3">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">{c.label}</p>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{c.hex}</p>
                    <p className="text-xs text-slate-500 mt-1">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Text ramp */}
          <RevealBlock delay={0.17}>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Text Hierarchy</h3>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-3">
              {TEXT_RAMP.map((t) => (
                <div key={t.role} className="flex items-center justify-between gap-4">
                  <span className={`text-base font-medium ${t.tw}`}>{t.sample}</span>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-xs font-mono text-slate-500">{t.hex}</span>
                    <span className="hidden md:inline text-xs text-slate-600">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 5. Design Rules (Do / Don't) ──────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">Design Rules</h2>
            <p className="text-slate-400 mb-12 max-w-xl">
              The dark-mode physics model: illumination on hover, inset glow buttons, tactile press, visible focus.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.05}>
              <div className="bg-slate-800/50 border border-green-500/20 rounded-2xl p-6 md:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-green-400">Do</h3>
                </div>
                <ul className="space-y-3">
                  {DO_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500/70 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div className="bg-slate-800/50 border border-red-500/20 rounded-2xl p-6 md:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-red-400">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {DONT_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/70 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 6. Typography Section ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-slate-800/30 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">Typography</h2>
            <p className="text-slate-400 mb-12 max-w-xl">
              Light text on dark — never pure white. Hierarchy through weight and luminance, not size alone.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Type scale */}
            <RevealBlock delay={0.05}>
              <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6 md:p-8 space-y-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Type Scale</h3>

                <div className="border-b border-slate-800 pb-4">
                  <p className="text-xs text-slate-600 mb-1">Display — text-5xl / font-bold</p>
                  <p className="text-5xl font-bold text-slate-100 leading-tight">Dark Mode</p>
                </div>
                <div className="border-b border-slate-800 pb-4">
                  <p className="text-xs text-slate-600 mb-1">Heading 1 — text-3xl / font-semibold</p>
                  <p className="text-3xl font-semibold text-slate-100">System Design</p>
                </div>
                <div className="border-b border-slate-800 pb-4">
                  <p className="text-xs text-slate-600 mb-1">Heading 2 — text-xl / font-semibold</p>
                  <p className="text-xl font-semibold text-slate-200">Component Library</p>
                </div>
                <div className="border-b border-slate-800 pb-4">
                  <p className="text-xs text-slate-600 mb-1">Body — text-base / text-slate-300</p>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Comfortable reading in low-light environments requires careful contrast ratios
                    and appropriate line height.
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Caption — text-sm / text-slate-400</p>
                  <p className="text-sm text-slate-400">Secondary information and metadata labels</p>
                </div>
              </div>
            </RevealBlock>

            {/* Code block + mono */}
            <RevealBlock delay={0.1}>
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">middleware.ts</span>
                    <span className="text-xs text-slate-600">TypeScript</span>
                  </div>
                  <pre className="overflow-x-auto p-5 text-sm font-mono leading-relaxed">
                    <code>
                      {CODE_SNIPPET.split("\n").map((line, i) => {
                        let lineClass = "text-slate-300";
                        if (line.trim().startsWith("//")) lineClass = "text-slate-500 italic";
                        else if (line.includes("import") || line.includes("export") || line.includes("return") || line.includes("const") || line.includes("if") || line.includes("async") || line.includes("await")) lineClass = "text-blue-300";
                        return (
                          <div key={i} className={lineClass}>
                            {line || "\u00A0"}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>

                <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5 space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Inline code</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Use{" "}
                    <code className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-blue-300 font-mono text-xs">
                      focus:ring-offset-slate-900
                    </code>{" "}
                    to ensure the focus ring is visible against dark surfaces.
                    Pair with{" "}
                    <code className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-green-300 font-mono text-xs">
                      active:scale-[0.98]
                    </code>{" "}
                    for tactile feedback.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 7. Tab Switcher + Sidebar Panel (interactive demo) ────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">Navigation Patterns</h2>
            <p className="text-slate-400 mb-12 max-w-xl">
              Tabs for in-page context switching. Sidebar panels for app-level navigation.
              Both use blue-500 as the active indicator.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tab switcher */}
            <RevealBlock delay={0.05}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Tab Navigation</h3>
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden">
                  <div className="flex border-b border-slate-700">
                    {["Overview", "Metrics", "Logs", "Config"].map((tab, i) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(i)}
                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                          activeTab === i
                            ? "border-blue-500 text-blue-400 bg-blue-600/5"
                            : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/3"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="p-5 min-h-[120px]">
                    {activeTab === 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-200">System Overview</p>
                        <p className="text-sm text-slate-400">All services operational. Last check 42 seconds ago.</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                          <span className="text-xs text-green-400 font-medium">All systems normal</span>
                        </div>
                      </div>
                    )}
                    {activeTab === 1 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-200">Performance Metrics</p>
                        <div className="space-y-1.5 mt-2">
                          {[["P50 latency", "12ms"], ["P99 latency", "45ms"], ["Error rate", "0.02%"]].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-xs">
                              <span className="text-slate-400">{k}</span>
                              <span className="text-slate-200 font-mono">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === 2 && (
                      <div className="space-y-1 font-mono text-xs">
                        <p className="text-slate-500">2026-02-20 03:14:01</p>
                        <p className="text-green-400">[INFO] Request handled in 12ms</p>
                        <p className="text-slate-400">[DEBUG] Cache hit ratio: 94.2%</p>
                        <p className="text-amber-400">[WARN] Memory usage at 78%</p>
                      </div>
                    )}
                    {activeTab === 3 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-200">Configuration</p>
                        <p className="text-sm text-slate-400">Environment: <span className="text-blue-400 font-mono text-xs">production</span></p>
                        <p className="text-sm text-slate-400">Region: <span className="text-blue-400 font-mono text-xs">us-east-1</span></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Sidebar panel */}
            <RevealBlock delay={0.1}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">Sidebar Navigation</h3>
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden flex" style={{ minHeight: 260 }}>
                  <div className="w-44 bg-slate-900 border-r border-slate-800 py-3 flex-shrink-0">
                    <p className="px-4 text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">Workspace</p>
                    {SIDEBAR_ITEMS.map((item, i) => (
                      <button
                        key={item.label}
                        onClick={() => setActiveSidebarItem(i)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none ${
                          activeSidebarItem === i
                            ? "bg-blue-600/15 text-blue-400 border-r-2 border-blue-500"
                            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 p-5">
                    <p className="text-sm font-semibold text-slate-200 mb-2">{SIDEBAR_ITEMS[activeSidebarItem].label}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {activeSidebarItem === 0 && "Monitor your system status, recent deployments, and team activity at a glance."}
                      {activeSidebarItem === 1 && "Deep-dive into request rates, error budgets, latency histograms, and resource utilisation."}
                      {activeSidebarItem === 2 && "Configure environment variables, feature flags, integrations, and security policies."}
                      {activeSidebarItem === 3 && "Manage team members, roles, permissions, and SSO configuration."}
                      {activeSidebarItem === 4 && "Receive and triage incident alerts, PagerDuty escalations, and on-call schedules."}
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 8. Alerts & Notifications ────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-slate-800/30 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">Alerts</h2>
            <p className="text-slate-400 mb-12 max-w-xl">
              Semantic color overlays at 10% opacity preserve readability on dark surfaces.
              Icons anchor the status at a glance.
            </p>
          </RevealBlock>

          <div className="space-y-3">
            {ALERT_VARIANTS.map((a, i) => (
              <RevealBlock key={a.kind} delay={i * 0.06}>
                <div className={`flex items-start gap-3 p-4 ${a.bg} border ${a.border} rounded-xl`}>
                  <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${a.titleColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={a.iconPath} />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${a.titleColor}`}>{a.title}</p>
                    <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{a.body}</p>
                  </div>
                  <button className="flex-shrink-0 text-slate-600 hover:text-slate-300 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-slate-500 rounded p-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Progress & Metrics ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-3">Progress & Metrics</h2>
            <p className="text-slate-400 mb-12 max-w-xl">
              Progress bars use the semantic color vocabulary. Warning states transition to amber automatically.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.07}>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8 space-y-7">
              {[
                { label: "Storage Used", value: 75, color: "bg-blue-500", textColor: "text-slate-300" },
                { label: "Memory", value: 45, color: "bg-green-500", textColor: "text-slate-300" },
                { label: "CPU Usage", value: 88, color: "bg-amber-500", textColor: "text-amber-400" },
                { label: "Disk I/O", value: 32, color: "bg-blue-400", textColor: "text-slate-300" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={bar.textColor}>{bar.label}</span>
                    <span className={bar.textColor + " font-mono"}>{bar.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${bar.color} rounded-full transition-all duration-700`}
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 10. Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-100">Dark Mode</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Elegant dark interface design system. Built for developers who care about
                the details — contrast, glow physics, and tactile feedback.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Resources</p>
              <ul className="space-y-2">
                {["Documentation", "Component API", "Design Tokens", "Changelog"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">StyleKit</p>
              <ul className="space-y-2">
                {["All Styles", "Submit Style", "GitHub", "Community"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500">
              StyleKit — Dark Mode showcase. Designed for low-light professionals.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/styles/dark-mode"
                className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                Full Docs
              </Link>
              <Link
                href="/styles"
                className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 hover:border-slate-600 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] transition-all duration-200"
              >
                Browse all styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
