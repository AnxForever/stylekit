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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function TrendUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SettingsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BarChartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function RepeatIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TEAL = "#4a9d9a";
const GOLD = "#e8b86d";
const CORAL = "#c17767";
const SAGE = "#6b8e8e";
const BG = "#d4a088";
const CARD = "#faf8f5";

const paletteSwatches = [
  { name: "Coral Clay", hex: "#d4a088", label: "Primary BG" },
  { name: "Cream White", hex: "#faf8f5", label: "Card" },
  { name: "Teal Accent", hex: "#4a9d9a", label: "Positive Data" },
  { name: "Warm Gold", hex: "#e8b86d", label: "Chart Primary" },
  { name: "Salmon Coral", hex: "#c17767", label: "Negative Data" },
  { name: "Sage Green", hex: "#6b8e8e", label: "Secondary" },
];

const statCards = [
  {
    label: "Total Views",
    value: "27.6M",
    change: "+18%",
    positive: true,
    color: TEAL,
    icon: <EyeIcon className="w-5 h-5" />,
  },
  {
    label: "Followers",
    value: "219.3k",
    change: "+12%",
    positive: true,
    color: GOLD,
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    label: "Reposts",
    value: "1.5k",
    change: "-7%",
    positive: false,
    color: CORAL,
    icon: <RepeatIcon className="w-5 h-5" />,
  },
];

const activityBars = [
  { month: "Aug", value: 38 },
  { month: "Sep", value: 55 },
  { month: "Oct", value: 47 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 68 },
  { month: "Jan", value: 72 },
  { month: "Feb", value: 91 },
];

const topPerformers = [
  { name: "Robert Grant", role: "Marketing Director", score: 98, color: TEAL },
  { name: "Yuki Tanaka", role: "Content Creator", score: 87, color: GOLD },
  { name: "Amara Diallo", role: "Brand Strategist", score: 75, color: CORAL },
  { name: "Lars Eriksen", role: "Data Analyst", score: 64, color: SAGE },
];

const channelStats = [
  { name: "Dribbble", abbr: "Dr", bg: "#ea4c89", delta: "+2%", positive: true },
  { name: "Behance", abbr: "Be", bg: "#0057ff", delta: "-7%", positive: false },
  { name: "Twitter", abbr: "Tw", bg: "#1da1f2", delta: "+5%", positive: true },
  { name: "LinkedIn", abbr: "Li", bg: "#0a66c2", delta: "+11%", positive: true },
];

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Insights", active: false },
  { label: "Reports", active: false },
  { label: "Comments", active: false },
  { label: "Channels", active: false },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [hoveredStatCard, setHoveredStatCard] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Animation rule demo states
  const [microFocusHovered, setMicroFocusHovered] = useState(false);
  const [tintedDiffusionHovered, setTintedDiffusionHovered] = useState(false);
  const [dataPulseHovered, setDataPulseHovered] = useState(false);
  const [warmUtilityDemo, setWarmUtilityDemo] = useState<"slow" | "fast" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen font-sans text-gray-800 overflow-x-hidden"
      style={{ backgroundColor: BG }}
    >
      <style>{`
        @keyframes warm-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes warm-pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes warm-ping {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .warm-float-anim {
          animation: warm-float 5s ease-in-out infinite;
        }
        .warm-pulse-dot {
          animation: warm-pulse-dot 2.4s ease-in-out infinite;
        }
        .warm-ping {
          animation: warm-ping 1.8s cubic-bezier(0,0,0.2,1) infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
        style={{
          backgroundColor: "rgba(212,160,136,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo pill */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <GridIcon className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white tracking-tight">
              Warm<span className="opacity-80">Dashboard</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Animations", "App Demo", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/20 cursor-pointer transition-all duration-200"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* StyleKit back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.97]"
            style={{
              backgroundColor: TEAL,
              color: "white",
              boxShadow: "0 4px 12px rgba(74,157,154,0.25)",
            }}
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Decorative floating blobs */}
        <div
          className="absolute top-16 right-[-80px] w-72 h-72 rounded-full pointer-events-none opacity-20"
          style={{ backgroundColor: "#c9967a", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-0 left-[-60px] w-64 h-64 rounded-full pointer-events-none opacity-20"
          style={{ backgroundColor: TEAL, filter: "blur(60px)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full pointer-events-none opacity-15"
          style={{ backgroundColor: GOLD, filter: "blur(50px)" }}
        />

        {/* Floating accent dots */}
        <div
          className="absolute top-24 right-24 w-3 h-3 rounded-full opacity-60 hidden md:block warm-float-anim"
          style={{ backgroundColor: CARD }}
        />
        <div
          className="absolute top-40 left-20 w-2 h-2 rounded-full opacity-50 hidden md:block"
          style={{ backgroundColor: TEAL, animation: "warm-float 7s ease-in-out infinite 1.5s" }}
        />
        <div
          className="absolute bottom-32 right-16 w-4 h-4 rounded-full opacity-40 hidden md:block"
          style={{ backgroundColor: GOLD, animation: "warm-float 6s ease-in-out infinite 0.8s" }}
        />

        <div className="max-w-7xl mx-auto relative">
          {/* Eyebrow badge */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.16em] uppercase mb-8"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
            >
              <GridIcon className="w-3 h-3" />
              &#26263;&#33394;&#20391;&#34920;&#30424; &mdash; Warm Dashboard
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.02] tracking-tight mb-6 text-white"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Warm. Focused.
            <br />
            <span
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                background: `linear-gradient(135deg, ${CARD} 0%, ${GOLD} 60%, ${TEAL} 100%)`,
              }}
            >
              Data-driven.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/75 text-lg md:text-xl leading-relaxed max-w-xl mb-12 font-normal"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Coral clay backgrounds, cream white cards, diffused shadows, and warm teal accents.
            A data-rich interface that feels inviting, not clinical.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              style={{
                backgroundColor: TEAL,
                boxShadow: "0 8px 20px rgba(74,157,154,0.3)",
              }}
            >
              <BarChartIcon className="w-4 h-4" />
              View Dashboard
            </button>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.35)",
              }}
            >
              <GridIcon className="w-4 h-4" />
              Explore Styles
            </button>
          </div>

          {/* Hero stat cards row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "27.6M", label: "Views", color: TEAL },
              { value: "219k", label: "Followers", color: GOLD },
              { value: "4.8k", label: "Reposts", color: CORAL },
              { value: "98%", label: "Retention", color: SAGE },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-2xl p-5 text-center cursor-default transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: CARD,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transitionDelay: `${i * 0.04}s`,
                }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>
              Palette
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Warm <span style={{ color: CARD }}>color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              Six carefully tuned warm hues &mdash; from coral clay backgrounds to cream white cards,
              teal for positive signals, gold for charts, and coral for alerts. Hover each swatch
              to see the shadow glow.
            </p>
          </RevealBlock>

          {/* Interactive swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-start mb-16">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i ? "translateY(-8px) scale(1.08)" : "translateY(0) scale(1)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                      position: "relative",
                    }}
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-2xl"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.hex === CARD ? "2px solid rgba(255,255,255,0.4)" : "none",
                        boxShadow: hoveredSwatch === i
                          ? `0 16px 32px ${swatch.hex}66`
                          : `0 4px 16px ${swatch.hex}44`,
                        transition: "box-shadow 0.35s ease",
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white">{swatch.name}</div>
                    <div className="text-xs text-white/50 font-mono mt-0.5">{swatch.hex}</div>
                    <span
                      className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color usage guide */}
          <RevealBlock delay={0.18}>
            <div
              className="rounded-3xl p-8"
              style={{ backgroundColor: CARD, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
            >
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
                Color usage guidelines
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Positive data",
                    hex: TEAL,
                    uses: ["Main CTA buttons", "Positive trend indicators", "Success badges", "Active nav items"],
                  },
                  {
                    title: "Chart & highlights",
                    hex: GOLD,
                    uses: ["Bar and line charts", "KPI callouts", "Star ratings", "Milestone markers"],
                  },
                  {
                    title: "Negative data",
                    hex: CORAL,
                    uses: ["Negative trend values", "Alert badges", "Error states", "Overdue indicators"],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-5 h-5 rounded-md"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-sm font-semibold text-gray-700">{col.title}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {col.uses.map((use) => (
                        <li key={use} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col.hex }} />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: TEAL }}>
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Warm <span style={{ color: CARD }}>building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              Every component uses large rounded corners, diffused shadows, and warm tonal colors.
              No sharp edges. No neon. No cold blue.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.96]"
                  style={
                    activeTab === tab
                      ? { backgroundColor: TEAL, color: "white", boxShadow: "0 4px 12px rgba(74,157,154,0.25)" }
                      : { backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{ backgroundColor: CARD, boxShadow: "0 24px 48px rgba(0,0,0,0.08)" }}
            >

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Primary actions &mdash; teal with tinted diffusion
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(74,157,154,0.25)] active:scale-[0.98] active:translate-y-0"
                        style={{ backgroundColor: TEAL, boxShadow: "0 4px 12px rgba(74,157,154,0.2)" }}
                      >
                        <BarChartIcon className="w-4 h-4" />
                        Generate Report
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,184,109,0.25)] active:scale-[0.98]"
                        style={{ backgroundColor: GOLD, boxShadow: "0 4px 12px rgba(232,184,109,0.2)" }}
                      >
                        <TrendUpIcon className="w-4 h-4" />
                        Export Data
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Secondary &amp; ghost variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-6 py-3 rounded-xl font-medium border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                        style={{
                          borderColor: TEAL,
                          color: TEAL,
                          backgroundColor: "transparent",
                        }}
                      >
                        Outlined
                      </button>
                      <button
                        className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 active:scale-[0.97] text-gray-500"
                      >
                        Ghost
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.97]"
                        style={{
                          background: `linear-gradient(135deg, ${TEAL}, ${SAGE})`,
                          boxShadow: "0 4px 12px rgba(74,157,154,0.2)",
                        }}
                      >
                        <TrendUpIcon className="w-4 h-4" />
                        Gradient
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", px: "px-4 py-2 text-xs" },
                        { size: "md", px: "px-5 py-2.5 text-sm" },
                        { size: "lg", px: "px-8 py-4 text-base" },
                      ].map(({ size, px }) => (
                        <button
                          key={size}
                          className={`rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${px}`}
                          style={{ backgroundColor: TEAL, boxShadow: "0 4px 12px rgba(74,157,154,0.2)" }}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Total Revenue",
                      value: "$142,300",
                      delta: "+12%",
                      positive: true,
                      desc: "from last month",
                      accent: TEAL,
                    },
                    {
                      title: "Active Users",
                      value: "8,420",
                      delta: "+5%",
                      positive: true,
                      desc: "from last week",
                      accent: GOLD,
                    },
                    {
                      title: "Bounce Rate",
                      value: "34.2%",
                      delta: "-3%",
                      positive: false,
                      desc: "from last month",
                      accent: CORAL,
                    },
                    {
                      title: "Avg Session",
                      value: "4m 32s",
                      delta: "+8%",
                      positive: true,
                      desc: "from last month",
                      accent: SAGE,
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                      style={{
                        backgroundColor: CARD,
                        border: "1px solid transparent",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors duration-200">
                          {card.title}
                        </span>
                        <span className="flex h-3 w-3 relative">
                          <span
                            className="warm-ping absolute inline-flex h-full w-full rounded-full opacity-30"
                            style={{ backgroundColor: card.accent }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-3 w-3"
                            style={{ backgroundColor: card.accent }}
                          />
                        </span>
                      </div>
                      <p
                        className="text-4xl font-bold text-gray-800 mb-2 transition-all duration-200 origin-left group-hover:scale-105"
                      >
                        {card.value}
                      </p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
                        <span className="font-semibold" style={{ color: card.positive ? TEAL : CORAL }}>
                          {card.delta}
                        </span>{" "}
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="Robert Grant"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4a9d9a] transition-all duration-200"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Report Type</label>
                      <select
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#4a9d9a] transition-all duration-200"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                      >
                        <option>Analytics Overview</option>
                        <option>Channel Performance</option>
                        <option>Revenue Report</option>
                        <option>Custom Report</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Add context for this report..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4a9d9a] transition-all duration-200 resize-none"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Date Range</label>
                      <input
                        type="text"
                        placeholder="Jan 1 &ndash; Feb 28, 2026"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4a9d9a] transition-all duration-200"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                        style={{ borderColor: TEAL, backgroundColor: TEAL }}
                      >
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <label className="text-sm text-gray-600 cursor-pointer">Include channel breakdown</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200 hover:scale-110"
                        style={{ borderColor: "#e5e7eb" }}
                      />
                      <label className="text-sm text-gray-600 cursor-pointer">Export as PDF</label>
                    </div>
                    <button
                      className="w-full py-3.5 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(74,157,154,0.25)] active:scale-[0.98]"
                      style={{ backgroundColor: TEAL, boxShadow: "0 4px 12px rgba(74,157,154,0.2)" }}
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Status badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Live", bg: "#dcfce7", text: "#15803d" },
                        { label: "Positive", bg: `${TEAL}22`, text: TEAL },
                        { label: "Negative", bg: `${CORAL}22`, text: CORAL },
                        { label: "Pending", bg: `${GOLD}22`, text: "#a37a1a" },
                        { label: "Inactive", bg: "#f3f4f6", text: "#6b7280" },
                        { label: "Trending", bg: `${TEAL}18`, text: TEAL },
                        { label: "Urgent", bg: `${CORAL}18`, text: CORAL },
                        { label: "Archived", bg: "#f3f4f6", text: "#9ca3af" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Data indicator badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "+12%", icon: "up" as const, accent: TEAL },
                        { label: "-7%", icon: "down" as const, accent: CORAL },
                        { label: "+5%", icon: "up" as const, accent: TEAL },
                        { label: "+21%", icon: "up" as const, accent: GOLD },
                        { label: "-2%", icon: "down" as const, accent: CORAL },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold cursor-default transition-all duration-200 hover:-translate-y-0.5"
                          style={{
                            backgroundColor: `${b.accent}18`,
                            color: b.accent,
                          }}
                        >
                          {b.icon === "up" ? (
                            <TrendUpIcon className="w-3.5 h-3.5" />
                          ) : (
                            <TrendDownIcon className="w-3.5 h-3.5" />
                          )}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Count &amp; metric badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "Reports", count: 14, color: TEAL },
                        { label: "Channels", count: 6, color: GOLD },
                        { label: "Alerts", count: 3, color: CORAL },
                        { label: "Members", count: 28, color: SAGE },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 font-medium">{b.label}</span>
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-200 hover:scale-110 cursor-default"
                            style={{ backgroundColor: b.color }}
                          >
                            {b.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. ANIMATION & INTERACTION RULES DEMO                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Animation <span style={{ color: CARD }}>&amp; interaction rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              Four named aiRules that govern every interactive element in Warm Dashboard.
              Hover or interact with each demo to feel the rule in action.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Rule 1: Micro-Focus */}
            <RevealBlock delay={0.08}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ backgroundColor: CARD, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${TEAL}20`, color: TEAL }}
                  >
                    Micro-Focus
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 leading-relaxed">
                  Card hover stays calm &mdash; only a whisper of movement. No visual shock for data dashboards.
                </p>
                <p className="text-xs text-gray-300 mb-6 font-mono">
                  hover:-translate-y-0.5 + shadow-xl &rarr; shadow-2xl
                </p>

                {/* Demo: a data card that only micro-lifts */}
                <div
                  className="rounded-2xl p-5 cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: "#f5f3f0",
                    transform: microFocusHovered ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: microFocusHovered
                      ? "0 16px 32px rgba(0,0,0,0.10)"
                      : "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={() => setMicroFocusHovered(true)}
                  onMouseLeave={() => setMicroFocusHovered(false)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 font-medium">Revenue</span>
                    <TrendUpIcon className="w-4 h-4 text-[#4a9d9a]" />
                  </div>
                  <div
                    className="text-3xl font-bold text-gray-800 mb-1 transition-all duration-200"
                    style={microFocusHovered ? { color: TEAL, transform: "scale(1.02)", transformOrigin: "left" } : {}}
                  >
                    $142k
                  </div>
                  <div className="text-xs text-gray-400">
                    <span style={{ color: TEAL }} className="font-semibold">+12%</span> this month
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                  {microFocusHovered
                    ? "Subtle 2px lift + shadow deepening &mdash; no visual shock"
                    : "Hover the card above to see Micro-Focus"}
                </p>
              </div>
            </RevealBlock>

            {/* Rule 2: Tinted Diffusion */}
            <RevealBlock delay={0.12}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ backgroundColor: CARD, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${GOLD}25`, color: "#a37a1a" }}
                  >
                    Tinted Diffusion
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 leading-relaxed">
                  Shadows radiate the button&apos;s own warm hue &mdash; not dead gray.
                </p>
                <p className="text-xs text-gray-300 mb-6 font-mono">
                  hover:shadow-[0_8px_20px_rgba(74,157,154,0.25)]
                </p>

                <div className="flex flex-col gap-4 items-start">
                  {/* Teal button */}
                  <div className="flex items-center gap-4 w-full">
                    <button
                      className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: TEAL,
                        boxShadow: tintedDiffusionHovered
                          ? "0 8px 20px rgba(74,157,154,0.35)"
                          : "0 4px 12px rgba(74,157,154,0.15)",
                        transform: tintedDiffusionHovered ? "translateY(-2px)" : "translateY(0)",
                      }}
                      onMouseEnter={() => setTintedDiffusionHovered(true)}
                      onMouseLeave={() => setTintedDiffusionHovered(false)}
                    >
                      Save Report
                    </button>
                    <span className="text-xs text-gray-400 flex-1">Teal glow shadow</span>
                  </div>
                  {/* Gold button */}
                  <div className="flex items-center gap-4 w-full">
                    <button
                      className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,184,109,0.35)]"
                      style={{ backgroundColor: GOLD, boxShadow: "0 4px 12px rgba(232,184,109,0.15)" }}
                    >
                      Export CSV
                    </button>
                    <span className="text-xs text-gray-400 flex-1">Gold glow shadow</span>
                  </div>
                  {/* Coral button */}
                  <div className="flex items-center gap-4 w-full">
                    <button
                      className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(193,119,103,0.35)]"
                      style={{ backgroundColor: CORAL, boxShadow: "0 4px 12px rgba(193,119,103,0.15)" }}
                    >
                      Delete Entry
                    </button>
                    <span className="text-xs text-gray-400 flex-1">Coral glow shadow</span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 3: Data Pulse */}
            <RevealBlock delay={0.16}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ backgroundColor: CARD, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${CORAL}20`, color: CORAL }}
                  >
                    Data Pulse
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 leading-relaxed">
                  KPI numbers scale up on hover to help users lock onto key metrics.
                </p>
                <p className="text-xs text-gray-300 mb-6 font-mono">
                  group-hover:scale-105 + group-hover:text-[#4a9d9a]
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Views", value: "27.6M", accent: TEAL },
                    { label: "Followers", value: "219k", accent: GOLD },
                    { label: "Reposts", value: "1.5k", accent: CORAL },
                    { label: "Reach", value: "5.2M", accent: SAGE },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="group rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ backgroundColor: "#f5f3f0" }}
                      onMouseEnter={() => setDataPulseHovered(true)}
                      onMouseLeave={() => setDataPulseHovered(false)}
                    >
                      <div className="text-xs text-gray-400 mb-1 group-hover:text-gray-600 transition-colors duration-200">
                        {kpi.label}
                      </div>
                      <div
                        className="text-xl font-bold text-gray-800 transition-all duration-200 origin-left group-hover:scale-105"
                        style={dataPulseHovered ? { color: kpi.accent } : {}}
                      >
                        {kpi.value}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  {dataPulseHovered
                    ? "Numbers scale + shift to accent color &mdash; data becomes focal"
                    : "Hover any KPI card above"}
                </p>
              </div>
            </RevealBlock>

            {/* Rule 4: Warm Utility */}
            <RevealBlock delay={0.2}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ backgroundColor: CARD, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${SAGE}25`, color: SAGE }}
                  >
                    Warm Utility
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1 leading-relaxed">
                  All transitions use duration-200 ease-out &mdash; efficient yet gentle.
                </p>
                <p className="text-xs text-gray-300 mb-6 font-mono">
                  duration-200 ease-out &mdash; no jarring delays
                </p>

                <div className="space-y-5">
                  {/* ease-out demo */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-medium">ease-out (Warm Utility)</span>
                      <button
                        className="text-xs px-3 py-1 rounded-full transition-colors duration-200 hover:opacity-80"
                        style={{ backgroundColor: `${TEAL}18`, color: TEAL }}
                        onClick={() => setWarmUtilityDemo(warmUtilityDemo === "fast" ? null : "fast")}
                      >
                        Animate
                      </button>
                    </div>
                    <div
                      className="relative h-10 rounded-full overflow-hidden"
                      style={{ backgroundColor: `${TEAL}15` }}
                    >
                      <div
                        className="absolute top-1/2 left-2 w-7 h-7 rounded-full"
                        style={{
                          backgroundColor: TEAL,
                          transform: `translateY(-50%) translateX(${warmUtilityDemo === "fast" ? "120px" : "0"})`,
                          transition: warmUtilityDemo === "fast"
                            ? "transform 0.2s ease-out"
                            : "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* slow/linear comparison */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-medium">linear (avoid this)</span>
                      <button
                        className="text-xs px-3 py-1 rounded-full transition-colors duration-200 hover:opacity-80"
                        style={{ backgroundColor: "#f3f4f6", color: "#9ca3af" }}
                        onClick={() => setWarmUtilityDemo(warmUtilityDemo === "slow" ? null : "slow")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-1/2 left-2 w-7 h-7 rounded-full bg-gray-300"
                        style={{
                          transform: `translateY(-50%) translateX(${warmUtilityDemo === "slow" ? "120px" : "0"})`,
                          transition: warmUtilityDemo === "slow"
                            ? "transform 0.8s linear"
                            : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. APP DEMO — Full Dashboard UI                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: TEAL }}>
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Warm <span style={{ color: CARD }}>social media analytics</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              A complete dashboard mockup demonstrating sidebar, stat cards, activity chart,
              top performers, and channel statistics &mdash; all in warm tones.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div
              className="rounded-3xl overflow-hidden flex"
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.15)", minHeight: "640px" }}
            >
              {/* Sidebar */}
              <aside
                className="w-56 flex-shrink-0 flex-col p-6 hidden md:flex"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRight: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: TEAL }}
                  >
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="font-semibold text-gray-800">Crowz</span>
                </div>

                {/* Avatar */}
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: BG }}
                  >
                    R
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">Robert Grant</p>
                  <p className="text-xs text-gray-500">Marketing Director</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                      style={
                        item.active
                          ? { backgroundColor: CARD, color: "#374151", fontWeight: 500 }
                          : { color: "#9ca3af" }
                      }
                    >
                      {item.active && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: CORAL }}
                        />
                      )}
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </nav>
              </aside>

              {/* Main area */}
              <main className="flex-1 p-6 md:p-8" style={{ backgroundColor: BG }}>
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">Dashboard</h2>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      <BellIcon className="w-4 h-4 text-white" />
                    </button>
                    <button
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      <SettingsIcon className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {statCards.map((card, i) => (
                    <div
                      key={card.label}
                      className="group rounded-2xl p-5 cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor: CARD,
                        boxShadow: hoveredStatCard === i
                          ? "0 12px 28px rgba(0,0,0,0.10)"
                          : "0 4px 12px rgba(0,0,0,0.06)",
                        transform: hoveredStatCard === i ? "translateY(-2px)" : "translateY(0)",
                      }}
                      onMouseEnter={() => setHoveredStatCard(i)}
                      onMouseLeave={() => setHoveredStatCard(null)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500">{card.label}</span>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${card.color}18`, color: card.color }}
                        >
                          {card.icon}
                        </div>
                      </div>
                      <div
                        className="text-2xl font-bold text-gray-800 mb-1 transition-all duration-200 origin-left"
                        style={hoveredStatCard === i ? { transform: "scale(1.05)", color: card.color } : {}}
                      >
                        {card.value}
                      </div>
                      <div className="text-xs text-gray-400">
                        <span
                          className="font-semibold"
                          style={{ color: card.positive ? TEAL : CORAL }}
                        >
                          {card.change}
                        </span>{" "}
                        vs last month
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity chart */}
                <div
                  className="rounded-2xl p-5 mb-6"
                  style={{ backgroundColor: CARD, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-semibold text-gray-800">Activity</h3>
                    <span className="text-xs text-gray-400">Last 7 months</span>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {activityBars.map((bar, i) => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-md transition-all duration-200 cursor-pointer"
                          style={{
                            height: `${bar.value}%`,
                            backgroundColor: hoveredBar === i ? GOLD : `${GOLD}60`,
                            transform: hoveredBar === i ? "scaleY(1.04)" : "scaleY(1)",
                            transformOrigin: "bottom",
                          }}
                          onMouseEnter={() => setHoveredBar(i)}
                          onMouseLeave={() => setHoveredBar(null)}
                        />
                        <span className="text-[9px] text-gray-400">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top performers */}
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: CARD, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">Top Performers</h3>
                  <div className="space-y-3">
                    {topPerformers.map((person) => (
                      <div key={person.name} className="flex items-center gap-3 group">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: person.color }}
                        >
                          {person.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-700 truncate">{person.name}</div>
                          <div className="text-[10px] text-gray-400">{person.role}</div>
                        </div>
                        <div className="flex-1 hidden sm:block">
                          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{ width: `${person.score}%`, backgroundColor: person.color }}
                            />
                          </div>
                        </div>
                        <span className="text-xs font-semibold ml-2" style={{ color: person.color }}>
                          {person.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN PHILOSOPHY                                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Design <span style={{ color: CARD }}>principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              Three core tenets that define Warm Dashboard. Professional without being cold.
              Data-rich without being chaotic. Warm without being distracting.
            </p>
          </RevealBlock>

          {/* 3 principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: <BarChartIcon className="w-7 h-7" />,
                title: "Warm Depth",
                tagline: "Coral clay, never cold",
                desc: "The background is always #d4a088 or a variant. Cards float above it as cream white surfaces. Never use cool-toned backgrounds or sharp contrast.",
                items: ["bg-[#d4a088] main background", "bg-[#faf8f5] card surface", "rounded-2xl / rounded-3xl"],
                color: BG,
                lightBg: "#f2e8e2",
              },
              {
                icon: <TrendUpIcon className="w-7 h-7" />,
                title: "Diffused Shadow",
                tagline: "Soft glow, never hard drop",
                desc: "Every shadow is xl-spread and low-opacity. No sharp drop shadows. Cards appear to rest gently above the background, not float aggressively.",
                items: ["shadow-xl shadow-black/8", "hover:shadow-2xl", "No hard box-shadow"],
                color: TEAL,
                lightBg: "#e8f4f4",
              },
              {
                icon: <GridIcon className="w-7 h-7" />,
                title: "Data Clarity",
                tagline: "Gray text on cream, always readable",
                desc: "Data lives in gray-800 and gray-600. Accents (teal, gold, coral) only appear for deltas and highlights. Never use black text on the warm background.",
                items: ["text-gray-800 for KPIs", "text-[#4a9d9a] for +delta", "text-[#c17767] for -delta"],
                color: GOLD,
                lightBg: "#fdf3e3",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className="group rounded-3xl p-8 h-full cursor-default transition-all duration-200 hover:-translate-y-1"
                  style={{
                    backgroundColor: CARD,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: principle.lightBg, color: principle.color }}
                  >
                    {principle.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1">{principle.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: principle.color }}>
                    {principle.tagline}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{principle.desc}</p>

                  <ul className="space-y-2">
                    {principle.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-500 font-mono">
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: principle.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.12}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ backgroundColor: CARD, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-green-600">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use bg-[#d4a088] or bg-[#c9967a] as main background",
                    "Cards: bg-[#faf8f5] with rounded-2xl or rounded-3xl",
                    "Shadows: shadow-xl shadow-black/10 (soft diffusion)",
                    "Hover: hover:shadow-2xl hover:-translate-y-1",
                    "Positive data: text-[#4a9d9a] teal",
                    "Charts: #e8b86d gold as primary fill color",
                    "Sidebar: bg-white/80 backdrop-blur-xl",
                    "Buttons: bg-[#4a9d9a] with tinted shadow",
                    "Text: text-gray-800 / text-gray-600 on cards",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-green-300 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ backgroundColor: CARD, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-400">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "No cold backgrounds (blue, purple, dark gray)",
                    "No pure black text &mdash; use text-gray-800 max",
                    "No sharp corners (rounded-none, rounded-sm)",
                    "No hard drop shadows &mdash; only soft diffused",
                    "No high-saturation neon accent colors",
                    "No thick borders (border-2 or above)",
                    "No pure white background (#fff) &mdash; use #faf8f5",
                    "No harsh contrast ratios between card and BG",
                    "No cold blue CTA buttons",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-300 shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: rule }} />
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. CHANNEL STATS + FEATURE HIGHLIGHTS                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: CORAL }}>
              System
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Channel <span style={{ color: CARD }}>statistics</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/65 text-lg max-w-lg leading-relaxed">
              Multi-channel performance tracking with teal and coral trend indicators.
              Each channel card follows the Micro-Focus hover rule.
            </p>
          </RevealBlock>

          {/* Channel stats banner */}
          <RevealBlock delay={0.1}>
            <div
              className="rounded-3xl p-6 md:p-8 mb-8"
              style={{
                background: `linear-gradient(135deg, #e8f4f4 0%, #f0f7f7 100%)`,
                boxShadow: "0 16px 40px rgba(74,157,154,0.1)",
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">Channels overview</h3>
                  <p className="text-sm text-gray-500">Your channel statistics for the past 7-day period.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {channelStats.map((ch) => (
                    <div
                      key={ch.name}
                      className="flex items-center gap-2 rounded-2xl px-4 py-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{ backgroundColor: "white" }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: ch.bg }}
                      >
                        <span className="text-white text-xs font-bold">{ch.abbr}</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{ch.name}</p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: ch.positive ? TEAL : CORAL }}
                        >
                          {ch.delta}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button
                    className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(74,157,154,0.25)]"
                    style={{ backgroundColor: TEAL, boxShadow: "0 4px 12px rgba(74,157,154,0.2)" }}
                  >
                    Full Stats
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Feature highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChartIcon className="w-6 h-6" />,
                title: "Warm backgrounds",
                desc: "Coral clay warmth transmits trust and approachability without sacrificing professionalism.",
                accent: BG,
                lightBg: "#f2e8e2",
              },
              {
                icon: <GridIcon className="w-6 h-6" />,
                title: "Cream card system",
                desc: "Cream white cards on warm coral create effortless depth. No harsh contrast, just natural layering.",
                accent: "#b09080",
                lightBg: "#f5f3f0",
              },
              {
                icon: <TrendUpIcon className="w-6 h-6" />,
                title: "Teal positive signals",
                desc: "Teal is reserved exclusively for positive trends, active states, and primary CTAs. Never diluted.",
                accent: TEAL,
                lightBg: "#e8f4f4",
              },
              {
                icon: <EyeIcon className="w-6 h-6" />,
                title: "Gold chart palette",
                desc: "Gold fills bar and line charts, providing visual warmth without competing with data indicators.",
                accent: GOLD,
                lightBg: "#fdf3e3",
              },
              {
                icon: <TrendDownIcon className="w-6 h-6" />,
                title: "Coral for alerts",
                desc: "Coral is the warning and negative signal color. Stays in the warm palette without feeling alarming.",
                accent: CORAL,
                lightBg: "#fbeae6",
              },
              {
                icon: <UsersIcon className="w-6 h-6" />,
                title: "Backdrop sidebar",
                desc: "The sidebar uses bg-white/80 + backdrop-blur for a frosted-glass feel that blends with coral BG.",
                accent: SAGE,
                lightBg: "#e8efef",
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div
                  className="group rounded-3xl p-7 h-full cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: CARD, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: feature.lightBg, color: feature.accent }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-gray-800 text-base font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer
        className="relative border-t overflow-hidden"
        style={{ backgroundColor: "#c9967a", borderColor: "rgba(255,255,255,0.15)" }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full opacity-60"
          style={{ background: `linear-gradient(90deg, ${TEAL}, ${GOLD}, ${CORAL})` }}
        />

        {/* Floating dot accents */}
        <div
          className="absolute top-10 left-10 w-3 h-3 rounded-full opacity-30 warm-float-anim"
          style={{ backgroundColor: CARD }}
        />
        <div
          className="absolute top-14 right-20 w-2 h-2 rounded-full opacity-30"
          style={{ backgroundColor: GOLD, animation: "warm-float 7s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-4 h-4 rounded-full opacity-20"
          style={{ backgroundColor: TEAL, animation: "warm-float 8s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute bottom-8 right-1/3 w-3 h-3 rounded-full opacity-25"
          style={{ backgroundColor: CARD, animation: "warm-float 6s ease-in-out infinite 0.5s" }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: TEAL }}
                >
                  <GridIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Warm<span className="opacity-75">Dashboard</span>
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Coral clay warmth meets professional data visualization.
                Cream cards, teal signals, and diffused shadows.
              </p>
              {/* Palette dots */}
              <div className="flex gap-2">
                {[BG, CARD, TEAL, GOLD, CORAL, SAGE].map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full transition-transform duration-200 hover:scale-125 cursor-default"
                    style={{
                      backgroundColor: color,
                      border: color === CARD ? "1.5px solid rgba(255,255,255,0.4)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40">Style</span>
                <Link href="/styles/warm-dashboard" className="text-white/60 hover:text-white transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/warm-dashboard/showcase" className="text-white/60 hover:text-white transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/warm-dashboard/cover" className="text-white/60 hover:text-white transition-colors duration-200">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40">StyleKit</span>
                <Link href="/" className="text-white/60 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-white/60 hover:text-white transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40">Palette</span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-white/50 text-xs">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{
                        backgroundColor: s.hex,
                        border: s.hex === CARD ? "1px solid rgba(255,255,255,0.4)" : "none",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px rounded-full mb-8" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Made with</span>
              <span className="warm-pulse-dot" style={{ color: GOLD }}>&#9679;</span>
              <span>for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
              style={{
                backgroundColor: TEAL,
                color: "white",
                boxShadow: "0 4px 12px rgba(74,157,154,0.25)",
              }}
            >
              &#8592; Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
