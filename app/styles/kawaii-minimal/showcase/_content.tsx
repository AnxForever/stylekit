"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks – ZERO @/components/showcase imports                  */
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
/*  Inline SVG accents                                                 */
/* ------------------------------------------------------------------ */

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FlowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="4" />
      <ellipse cx="16" cy="7" rx="3" ry="5" />
      <ellipse cx="16" cy="25" rx="3" ry="5" />
      <ellipse cx="7" cy="16" rx="5" ry="3" />
      <ellipse cx="25" cy="16" rx="5" ry="3" />
      <ellipse cx="9.86" cy="9.86" rx="3" ry="5" transform="rotate(-45 9.86 9.86)" />
      <ellipse cx="22.14" cy="22.14" rx="3" ry="5" transform="rotate(-45 22.14 22.14)" />
      <ellipse cx="22.14" cy="9.86" rx="3" ry="5" transform="rotate(45 22.14 9.86)" />
      <ellipse cx="9.86" cy="22.14" rx="3" ry="5" transform="rotate(45 9.86 22.14)" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0l1.5 9.5 9.5 1.5-9.5 1.5L12 24l-1.5-11.5L1 12l10.5-1.5L12 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const colorThemes = {
  sakura: {
    label: "Sakura",
    primary: "#F9A8D4",
    secondary: "#FFF7ED",
    accent: "#A78BFA",
    extra: "#FDE68A",
    pillText: "text-pink-600",
    pillBg: "bg-pink-100",
    activeBg: "bg-[#F9A8D4]",
    cardBorder: "border-pink-200",
    cardShadow: "shadow-[0_8px_24px_rgba(249,168,212,0.25)]",
    btnShadow: "shadow-[0_6px_0_#f472b6]",
    ringColor: "focus:ring-pink-100",
    focusBorder: "focus:border-pink-400",
    inputBorder: "border-pink-200",
    textAccent: "text-pink-500",
    progressColor: "bg-pink-300",
    gradFrom: "from-pink-200",
    gradTo: "to-purple-200",
  },
  lavender: {
    label: "Lavender",
    primary: "#A78BFA",
    secondary: "#F5F3FF",
    accent: "#F9A8D4",
    extra: "#67E8F9",
    pillText: "text-purple-600",
    pillBg: "bg-purple-100",
    activeBg: "bg-[#A78BFA]",
    cardBorder: "border-purple-200",
    cardShadow: "shadow-[0_8px_24px_rgba(167,139,250,0.25)]",
    btnShadow: "shadow-[0_6px_0_#7c3aed]",
    ringColor: "focus:ring-purple-100",
    focusBorder: "focus:border-purple-400",
    inputBorder: "border-purple-200",
    textAccent: "text-purple-500",
    progressColor: "bg-purple-300",
    gradFrom: "from-purple-200",
    gradTo: "to-pink-200",
  },
  aqua: {
    label: "Aqua",
    primary: "#67E8F9",
    secondary: "#ECFEFF",
    accent: "#FDE68A",
    extra: "#A78BFA",
    pillText: "text-cyan-600",
    pillBg: "bg-cyan-100",
    activeBg: "bg-[#67E8F9]",
    cardBorder: "border-cyan-200",
    cardShadow: "shadow-[0_8px_24px_rgba(103,232,249,0.25)]",
    btnShadow: "shadow-[0_6px_0_#0891b2]",
    ringColor: "focus:ring-cyan-100",
    focusBorder: "focus:border-cyan-400",
    inputBorder: "border-cyan-200",
    textAccent: "text-cyan-500",
    progressColor: "bg-cyan-300",
    gradFrom: "from-cyan-200",
    gradTo: "to-teal-200",
  },
} as const;

type ThemeKey = keyof typeof colorThemes;

const paletteSwatches = [
  { name: "Sakura Pink", hex: "#F9A8D4", label: "Primary" },
  { name: "Warm Cream", hex: "#FFF7ED", label: "Background" },
  { name: "Soft Lavender", hex: "#A78BFA", label: "Accent" },
  { name: "Aqua Mist", hex: "#67E8F9", label: "Highlight" },
  { name: "Butter Yellow", hex: "#FDE68A", label: "Warmth" },
];

const typographySamples = [
  {
    label: "Display",
    sizeClass: "text-5xl md:text-6xl",
    weight: "font-bold",
    tracking: "tracking-tight",
    leading: "leading-none",
    sample: "Kawaii",
    note: "60px · Display headings",
    color: "text-gray-800",
  },
  {
    label: "Heading 1",
    sizeClass: "text-4xl",
    weight: "font-semibold",
    tracking: "tracking-tight",
    leading: "leading-tight",
    sample: "Sweet and minimal",
    note: "36px · Page headings",
    color: "text-gray-800",
  },
  {
    label: "Heading 2",
    sizeClass: "text-2xl",
    weight: "font-semibold",
    tracking: "tracking-normal",
    leading: "leading-snug",
    sample: "Gentle details",
    note: "24px · Section headings",
    color: "text-gray-700",
  },
  {
    label: "Body",
    sizeClass: "text-base",
    weight: "font-normal",
    tracking: "tracking-normal",
    leading: "leading-relaxed",
    sample: "Approachable, warm, never cold. Nordic whitespace meets Japanese charm in every line of text.",
    note: "16px · Body copy",
    color: "text-gray-600",
  },
  {
    label: "Caption",
    sizeClass: "text-sm",
    weight: "font-medium",
    tracking: "tracking-wide",
    leading: "leading-relaxed",
    sample: "Small details that delight",
    note: "14px · Captions, labels",
    color: "text-gray-500",
  },
  {
    label: "Eyebrow",
    sizeClass: "text-xs",
    weight: "font-semibold",
    tracking: "tracking-[0.2em]",
    leading: "leading-normal",
    sample: "SECTION LABEL",
    note: "12px · Eyebrow labels, uppercase",
    color: "text-pink-400",
  },
];

const principlesDoList = [
  "Warm cream background bg-[#FFF7ED] or bg-orange-50",
  "Large rounded corners: rounded-2xl, rounded-3xl, rounded-full",
  "Soft shadows with pastel color tints — no dark grays",
  "Sakura pink #F9A8D4 as the primary accent everywhere",
  "Pastel fill: lavender, aqua, yellow for variety",
  "Gentle hover: hover:scale-[1.02] with 300ms duration",
  "Small heart, star, flower SVG accents tucked in corners",
  "font-sans with regular weight — approachable, never harsh",
  "Spring cubic-bezier(0.34,1.56,0.64,1) for playful bounce",
];

const principlesDontList = [
  "No dark backgrounds — not even dark gray",
  "No harsh edges or angular designs",
  "No high-saturation bright neons",
  "No cold blues or corporate colors",
  "No heavy 4px+ borders in dark colors",
  "No aggressive drop shadows or hard offsets",
  "No uppercase tracking on body text",
  "No dense, cluttered layouts with minimal whitespace",
];

const habitItems = [
  { name: "Morning meditation", progress: 85, color: "#F9A8D4", bg: "bg-pink-200", check: 6 },
  { name: "Read 30 minutes", progress: 60, color: "#A78BFA", bg: "bg-purple-200", check: 4 },
  { name: "Drink 8 glasses", progress: 100, color: "#67E8F9", bg: "bg-cyan-200", check: 7 },
  { name: "Evening walk", progress: 40, color: "#FDE68A", bg: "bg-yellow-200", check: 3 },
];

const moodEntries = [
  { day: "Mon", mood: "happy", color: "#F9A8D4", level: 4 },
  { day: "Tue", mood: "calm", color: "#A78BFA", level: 3 },
  { day: "Wed", mood: "joyful", color: "#67E8F9", level: 5 },
  { day: "Thu", mood: "gentle", color: "#FDE68A", level: 3 },
  { day: "Fri", mood: "content", color: "#F9A8D4", level: 4 },
  { day: "Sat", mood: "dreamy", color: "#A78BFA", level: 5 },
  { day: "Sun", mood: "peaceful", color: "#67E8F9", level: 4 },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("sakura");
  const [activeTypoRow, setActiveTypoRow] = useState<number | null>(null);
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const theme = colorThemes[activeTheme];

  return (
    <div className="min-h-screen bg-[#FFF7ED] font-sans text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes kawaii-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes kawaii-float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-6px) rotate(3deg); }
          66% { transform: translateY(-3px) rotate(-2deg); }
        }
        @keyframes kawaii-pulse-soft {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes kawaii-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes kawaii-bounce-in {
          0% { opacity: 0; transform: scale(0.4) translateY(20px); }
          60% { transform: scale(1.1) translateY(-4px); }
          80% { transform: scale(0.95) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .kawaii-spring {
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .kawaii-float-anim {
          animation: kawaii-float 4s ease-in-out infinite;
        }
        .kawaii-float-slow-anim {
          animation: kawaii-float-slow 6s ease-in-out infinite;
        }
        .kawaii-pulse-soft-anim {
          animation: kawaii-pulse-soft 3s ease-in-out infinite;
        }
        .kawaii-spin-slow-anim {
          animation: kawaii-spin-slow 12s linear infinite;
        }
        .kawaii-bounce-in-anim {
          animation: kawaii-bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
      `}</style>

      {/* ================================================================ */}
      {/* FIXED NAV                                                        */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF7ED]/90 backdrop-blur-md border-b border-pink-100/80">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo + heart */}
          <div className="flex items-center gap-2">
            <HeartIcon className="w-4 h-4 text-pink-400 kawaii-pulse-soft-anim" />
            <span className="text-base font-semibold text-gray-800 tracking-tight">
              Kawaii<span className="text-[#F9A8D4]">Minimal</span>
            </span>
          </div>

          {/* Center nav pills */}
          <nav className="hidden md:flex items-center gap-2">
            {["Hero", "Components", "Palette", "Typography", "Principles"].map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full text-sm text-gray-500 hover:text-pink-500 hover:bg-pink-50 cursor-pointer transition-all duration-200"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* StyleKit link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F9A8D4] text-white text-sm font-medium shadow-sm hover:bg-pink-400 hover:scale-[1.04] active:scale-[0.96] transition-all duration-200"
          >
            <SparkleIcon className="w-3 h-3" />
            <span>StyleKit</span>
            <span className="opacity-80">→</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Background pastel blobs */}
        <div
          className="absolute top-16 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(249,168,212,0.25), transparent 70%)",
            filter: "blur(40px)",
            animation: "kawaii-float 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-48 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(167,139,250,0.2), transparent 70%)",
            filter: "blur(35px)",
            animation: "kawaii-float 6s ease-in-out infinite 1.5s",
          }}
        />
        <div
          className="absolute bottom-8 right-1/3 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(103,232,249,0.2), transparent 70%)",
            filter: "blur(30px)",
            animation: "kawaii-float 7s ease-in-out infinite 0.5s",
          }}
        />
        <div
          className="absolute bottom-12 left-1/4 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(253,230,138,0.25), transparent 70%)",
            filter: "blur(25px)",
            animation: "kawaii-float 4.5s ease-in-out infinite 2s",
          }}
        />

        {/* Floating small SVG accents */}
        <div
          className="absolute top-24 right-16 text-pink-200 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float-slow 5s ease-in-out infinite" }}
        >
          <FlowerIcon className="w-8 h-8 opacity-60" />
        </div>
        <div
          className="absolute top-40 left-12 text-yellow-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float-slow 7s ease-in-out infinite 1s" }}
        >
          <StarIcon className="w-5 h-5 opacity-50" />
        </div>
        <div
          className="absolute bottom-24 right-10 text-purple-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float-slow 6s ease-in-out infinite 2s" }}
        >
          <HeartIcon className="w-6 h-6 opacity-40" />
        </div>
        <div
          className="absolute top-32 right-1/3 text-cyan-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-spin-slow 12s linear infinite" }}
        >
          <SparkleIcon className="w-4 h-4 opacity-50" />
        </div>
        <div
          className="absolute bottom-32 left-16 text-pink-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float-slow 8s ease-in-out infinite 0.5s" }}
        >
          <StarIcon className="w-6 h-6 opacity-40" />
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto text-center">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-500 text-xs font-semibold tracking-[0.18em] uppercase mb-6">
              <HeartIcon className="w-3 h-3" />
              可爱极简 — Kawaii Minimal
              <HeartIcon className="w-3 h-3" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[90px] font-bold leading-[1.0] tracking-tight mb-6 text-gray-800"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Soft. Warm.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #F9A8D4 0%, #A78BFA 50%, #67E8F9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Delightful.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 font-normal"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Japanese kawaii warmth meets Nordic minimalism restraint.
            Generous whitespace, pastel palettes, and gentle interactions
            that feel like a warm hug.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F9A8D4] text-white font-medium shadow-[0_6px_0_#f472b6,0_12px_20px_rgba(244,114,182,0.3)] hover:shadow-[0_4px_0_#f472b6,0_8px_14px_rgba(244,114,182,0.25)] hover:translate-y-[2px] hover:scale-x-[1.04] hover:scale-y-[0.97] active:translate-y-[6px] active:shadow-[0_0px_0_#f472b6,0_2px_6px_rgba(244,114,182,0.15)] active:scale-[0.95] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <HeartIcon className="w-4 h-4" />
              Get Started
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-pink-200 text-pink-500 font-medium hover:bg-pink-50 hover:border-pink-300 hover:scale-[1.03] active:scale-[0.96] transition-all duration-250">
              <StarIcon className="w-4 h-4" />
              Explore
            </button>
          </div>

          {/* Hero stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "8,400+", label: "Happy Users", color: "#F9A8D4" },
              { value: "24k", label: "Daily Check-ins", color: "#A78BFA" },
              { value: "156k", label: "Habits Tracked", color: "#67E8F9" },
              { value: "4.9", label: "Joy Score", color: "#FDE68A" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-5 text-center border border-pink-100 shadow-[0_4px_16px_rgba(249,168,212,0.2)] kawaii-spring hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(244,114,182,0.2)] cursor-default"
                style={{
                  transitionDelay: `${i * 0.05}s`,
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
      {/* COMPONENT DEMOS                                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A78BFA] block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Soft{" "}
              <span className="text-[#F9A8D4]">building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Every component is rounded, gentle, and interactive. Three pastel
              themes let you explore the color system at a glance.
            </p>
          </RevealBlock>

          {/* Theme + Component tab row */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Component type tabs */}
              <div className="flex gap-2 mr-4">
                {(["button", "card", "input"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-250 ${
                      activeTab === tab
                        ? "bg-[#F9A8D4] text-white shadow-[0_4px_0_#f472b6]"
                        : "bg-white border-2 border-pink-100 text-gray-500 hover:border-pink-200 hover:bg-pink-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-pink-100 hidden sm:block" />

              {/* Color theme pills */}
              <div className="flex gap-2">
                {(Object.keys(colorThemes) as ThemeKey[]).map((key) => {
                  const t = colorThemes[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTheme(key)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-250 ${
                        activeTheme === key
                          ? `${t.activeBg} text-white`
                          : `${t.pillBg} ${t.pillText} hover:opacity-80`
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/50"
                        style={{ backgroundColor: t.primary }}
                      />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className={`bg-white rounded-3xl p-8 md:p-12 border-2 ${theme.cardBorder} ${theme.cardShadow}`}
            >
              {/* BUTTONS TAB */}
              {activeTab === "button" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">
                      Primary
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium ${theme.btnShadow} hover:translate-y-[2px] hover:scale-x-[1.04] hover:scale-y-[0.97] active:translate-y-[6px] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                        style={{
                          backgroundColor: theme.primary,
                          boxShadow: `0 6px 0 ${theme.accent}99, 0 12px 20px ${theme.primary}44`,
                        }}
                      >
                        <HeartIcon className="w-4 h-4" />
                        Primary
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium hover:translate-y-[2px] hover:scale-x-[1.04] hover:scale-y-[0.97] active:translate-y-[4px] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{
                          backgroundColor: theme.accent,
                          color: "#fff",
                          boxShadow: `0 5px 0 ${theme.accent}88`,
                        }}
                      >
                        <StarIcon className="w-4 h-4" />
                        Secondary
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">
                      Outlined &amp; Ghost
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className={`px-7 py-3.5 rounded-full font-medium border-2 bg-white hover:scale-[1.03] active:scale-[0.95] transition-all duration-250`}
                        style={{
                          borderColor: theme.primary,
                          color: theme.primary,
                        }}
                      >
                        Outlined
                      </button>
                      <button
                        className={`px-7 py-3.5 rounded-full font-medium bg-transparent hover:scale-[1.03] active:scale-[0.95] transition-all duration-250`}
                        style={{ color: theme.primary }}
                      >
                        Ghost
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white hover:opacity-90 hover:scale-[1.03] active:scale-[0.95] transition-all duration-250"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                        }}
                      >
                        <SparkleIcon className="w-3.5 h-3.5" />
                        Gradient
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {["sm", "md", "lg"].map((size) => (
                        <button
                          key={size}
                          className={`rounded-full text-white font-medium kawaii-spring hover:-translate-y-1 hover:scale-[1.04] active:scale-[0.92] ${
                            size === "sm"
                              ? "px-4 py-2 text-xs"
                              : size === "md"
                              ? "px-6 py-3 text-sm"
                              : "px-9 py-4 text-base"
                          }`}
                          style={{
                            backgroundColor: theme.primary,
                            boxShadow: `0 4px 0 ${theme.primary}88`,
                          }}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Habit Tracker",
                      desc: "Track your daily routines with gentle visual feedback and pastel progress indicators.",
                      icon: "H",
                    },
                    {
                      title: "Mood Journal",
                      desc: "Record feelings with soft color coding and rounded emotion indicators.",
                      icon: "M",
                    },
                    {
                      title: "Wish List",
                      desc: "Save your favourite things in a delightfully soft collection board.",
                      icon: "W",
                    },
                    {
                      title: "Friend Circle",
                      desc: "Share progress with friends in a gentle, supportive space.",
                      icon: "F",
                    },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className={`group bg-white border-2 rounded-3xl p-7 cursor-pointer ${theme.cardBorder} kawaii-spring hover:-translate-y-2 hover:rotate-[0.8deg] hover:shadow-[0_16px_36px_rgba(249,168,212,0.25)]`}
                      style={{ boxShadow: `0 4px 16px ${theme.primary}22` }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{
                          background: i % 2 === 0
                            ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                            : `linear-gradient(135deg, ${theme.accent}, ${theme.extra})`,
                        }}
                      >
                        {card.icon}
                      </div>
                      <h4
                        className="text-gray-800 text-lg font-semibold mb-2 group-hover:transition-colors group-hover:duration-200"
                        style={{ transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = theme.primary)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "")
                        }
                      >
                        {card.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* INPUT TAB */}
              {activeTab === "input" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type something sweet..."
                        className={`w-full px-4 py-3 bg-white border-2 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 transition-all duration-200 ${theme.inputBorder} ${theme.focusBorder} ${theme.ringColor}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="hello@kawaii.app"
                        className={`w-full px-4 py-3 bg-white border-2 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 transition-all duration-200 ${theme.inputBorder} ${theme.focusBorder} ${theme.ringColor}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Share your thoughts..."
                        className={`w-full px-4 py-3 bg-white border-2 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${theme.inputBorder} ${theme.focusBorder} ${theme.ringColor}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Mood today
                      </label>
                      <select
                        className={`w-full px-4 py-3 bg-white border-2 rounded-2xl text-gray-700 focus:outline-none focus:ring-4 transition-all duration-200 ${theme.inputBorder} ${theme.focusBorder} ${theme.ringColor}`}
                      >
                        <option>Happy</option>
                        <option>Calm</option>
                        <option>Excited</option>
                        <option>Cozy</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-md border-2 kawaii-spring cursor-pointer hover:scale-110"
                        style={{ borderColor: theme.primary }}
                      />
                      <label className="text-sm text-gray-600 cursor-pointer">
                        Send me kawaii notifications
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center kawaii-spring cursor-pointer hover:scale-110"
                        style={{ borderColor: theme.primary, backgroundColor: theme.primary }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm text-gray-600 cursor-pointer">
                        Daily habit reminders
                      </label>
                    </div>
                    <button
                      className="w-full py-3.5 rounded-2xl text-white font-medium kawaii-spring hover:-translate-y-1 hover:opacity-90 active:scale-[0.96] active:translate-y-0 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                        boxShadow: `0 5px 0 ${theme.primary}88`,
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* IN-ACTION: HABIT TRACKER + MOOD BOARD                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#67E8F9] block mb-3">
              In Action
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Gentle in{" "}
              <span className="text-[#F9A8D4]">every detail</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Habit tracker card */}
            <RevealBlock delay={0.1}>
              <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_8px_32px_rgba(249,168,212,0.18)] h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Weekly Habits</h3>
                  <span className="flex items-center gap-1 text-xs text-pink-400 font-medium">
                    <HeartIcon className="w-3 h-3" />
                    Today
                  </span>
                </div>
                <div className="space-y-4">
                  {habitItems.map((habit) => (
                    <div
                      key={habit.name}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-[#FFF7ED] hover:bg-pink-50 transition-colors duration-200 cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{ backgroundColor: habit.color }}
                      >
                        {habit.progress}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          {habit.name}
                        </div>
                        <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${habit.progress}%`,
                              backgroundColor: habit.color,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {[...Array(7)].map((_, d) => (
                          <div
                            key={d}
                            className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                            style={{
                              backgroundColor:
                                d < habit.check ? habit.color : "#fce7f3",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Mood board card */}
            <RevealBlock delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-[0_8px_32px_rgba(167,139,250,0.18)] h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Mood This Week</h3>
                  <span className="flex items-center gap-1 text-xs text-purple-400 font-medium">
                    <StarIcon className="w-3 h-3" />
                    7 days
                  </span>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-3 mb-6 h-32">
                  {moodEntries.map((entry) => (
                    <div
                      key={entry.day}
                      className="flex-1 flex flex-col items-center gap-2 group"
                    >
                      <div className="w-full flex flex-col items-center">
                        <div
                          className="w-full rounded-t-xl kawaii-spring group-hover:-translate-y-1"
                          style={{
                            height: `${entry.level * 18}px`,
                            backgroundColor: entry.color,
                            opacity: 0.85,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        {entry.day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mood tags */}
                <div className="flex flex-wrap gap-2">
                  {moodEntries.map((entry) => (
                    <span
                      key={entry.day}
                      className="px-3 py-1 rounded-full text-xs font-medium text-gray-600 kawaii-spring hover:scale-[1.08]"
                      style={{ backgroundColor: `${entry.color}44` }}
                    >
                      {entry.mood}
                    </span>
                  ))}
                </div>

                {/* Bottom stat */}
                <div className="mt-6 pt-5 border-t border-purple-50 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: "#A78BFA" }}>
                      4.0
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      avg. weekly mood
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: i < 4 ? "#A78BFA" : "#e9d5ff" }}
                      >
                        <StarIcon className="w-4 h-4" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* COLOR PALETTE                                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F9A8D4] block mb-3">
              Palette
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Pastel{" "}
              <span className="text-[#A78BFA]">color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Five core pastels inspired by cherry blossoms, warm cream, lavender
              fields, aqua morning mist, and golden afternoon light.
            </p>
          </RevealBlock>

          {/* Large circle swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-16">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="relative"
                    style={{
                      transform: hoveredSwatch === i ? "scale(1.12) translateY(-6px)" : "scale(1)",
                      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.hex === "#FFF7ED" ? "2px solid #fce7f3" : "none",
                        boxShadow: hoveredSwatch === i
                          ? `0 16px 40px ${swatch.hex}88`
                          : `0 8px 24px ${swatch.hex}55`,
                      }}
                    />
                    {/* Small heart in corner on hover */}
                    {hoveredSwatch === i && (
                      <div className="absolute -top-2 -right-2 kawaii-bounce-in-anim">
                        <HeartIcon className="w-5 h-5 text-white drop-shadow-sm" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700">
                      {swatch.name}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {swatch.hex}
                    </div>
                    <span
                      className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-gray-500 bg-gray-100"
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Extended palette grid */}
          <RevealBlock delay={0.2}>
            <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_8px_24px_rgba(249,168,212,0.12)]">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
                Extended tones
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { hex: "#fce7f3", label: "pink-100" },
                  { hex: "#fbcfe8", label: "pink-200" },
                  { hex: "#F9A8D4", label: "pink-300" },
                  { hex: "#f472b6", label: "pink-400" },
                  { hex: "#ec4899", label: "pink-500" },
                  { hex: "#db2777", label: "pink-600" },
                  { hex: "#ede9fe", label: "purple-100" },
                  { hex: "#ddd6fe", label: "purple-200" },
                  { hex: "#A78BFA", label: "purple-300" },
                  { hex: "#8b5cf6", label: "purple-500" },
                  { hex: "#cffafe", label: "cyan-100" },
                  { hex: "#67E8F9", label: "cyan-300" },
                ].map((t) => (
                  <div key={t.hex} className="group cursor-pointer">
                    <div
                      className="w-full h-10 rounded-2xl mb-1.5 group-hover:scale-105 transition-transform duration-200"
                      style={{ backgroundColor: t.hex }}
                    />
                    <div className="text-[10px] text-gray-400 font-mono text-center">
                      {t.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TYPOGRAPHY                                                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FDE68A] block mb-3">
              Typography
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Friendly{" "}
              <span className="text-[#F9A8D4]">type scale</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              sans-serif with regular weight throughout. Approachable, never bold
              or angular. Generous line heights for breathing room.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="bg-white rounded-3xl border-2 border-pink-100 shadow-[0_8px_24px_rgba(249,168,212,0.12)] overflow-hidden">
              {typographySamples.map((sample, i) => (
                <div
                  key={sample.label}
                  className={`group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 px-8 py-7 cursor-pointer transition-colors duration-200 border-b border-pink-50 last:border-b-0 ${
                    activeTypoRow === i ? "bg-pink-50" : "hover:bg-[#FFF7ED]"
                  }`}
                  onClick={() =>
                    setActiveTypoRow(activeTypoRow === i ? null : i)
                  }
                >
                  {/* Label col */}
                  <div className="w-28 shrink-0">
                    <span className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400">
                      {sample.label}
                    </span>
                  </div>

                  {/* Sample text */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`${sample.sizeClass} ${sample.weight} ${sample.tracking} ${sample.leading} ${sample.color} font-sans break-words`}
                    >
                      {sample.sample}
                    </div>
                  </div>

                  {/* Note */}
                  <div className="md:w-52 shrink-0 text-right">
                    <span className="text-xs text-gray-400">{sample.note}</span>
                  </div>

                  {/* Expanded detail on click */}
                  {activeTypoRow === i && (
                    <div className="w-full mt-2 md:mt-0 md:hidden" />
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Typography pairing callout */}
          <RevealBlock delay={0.2} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-7 border-2 border-pink-100 shadow-sm">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-pink-400 mb-4">
                  Warmth pairing
                </p>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-800 leading-tight">
                    Gentle moments,
                  </div>
                  <div className="text-2xl font-bold text-[#F9A8D4] leading-tight">
                    softly remembered.
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">
                    Heading in near-black, accent in sakura pink — warm but structured.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-7 border-2 border-purple-100 shadow-sm">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-purple-400 mb-4">
                  Structure pairing
                </p>
                <div className="space-y-1">
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-400">
                    Section label
                  </div>
                  <div className="text-2xl font-bold text-gray-800 leading-tight">
                    Build with care
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">
                    Uppercase eyebrow for hierarchy, bold heading, relaxed body — Nordic restraint.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* DESIGN PRINCIPLES                                                */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#67E8F9] block mb-3">
              Guidelines
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Design{" "}
              <span className="text-[#F9A8D4]">principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              The kawaii-minimal style has clear boundaries. Warmth without
              saccharine excess. Minimalism without coldness.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Do card */}
            <RevealBlock delay={0.1}>
              <div className="bg-white rounded-3xl p-8 border-2 border-green-100 shadow-[0_8px_24px_rgba(134,239,172,0.15)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-green-600">Do</h3>
                  <FlowerIcon className="w-4 h-4 text-green-300 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {principlesDoList.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-green-300 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't card */}
            <RevealBlock delay={0.15}>
              <div className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-[0_8px_24px_rgba(252,165,165,0.15)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-400">Don&apos;t</h3>
                  <HeartIcon className="w-4 h-4 text-red-200 ml-auto" />
                </div>
                <ul className="space-y-3">
                  {principlesDontList.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-300 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Micro-interaction showcase */}
          <RevealBlock delay={0.25}>
            <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_8px_24px_rgba(249,168,212,0.12)]">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
                Interaction feel
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    label: "Spring bounce",
                    desc: "cubic-bezier(0.34,1.56,0.64,1) — elastic, jelly-like",
                    color: "#F9A8D4",
                    demo: "hover:scale-[1.15] hover:-rotate-3",
                  },
                  {
                    label: "Soft lift",
                    desc: "hover:-translate-y-2 — floats upward gently",
                    color: "#A78BFA",
                    demo: "hover:-translate-y-3",
                  },
                  {
                    label: "Squish press",
                    desc: "active:scale-y-[0.92] scale-x-[1.06] — like pressing a pillow",
                    color: "#67E8F9",
                    demo: "hover:scale-x-[1.08] hover:scale-y-[0.94]",
                  },
                ].map((interaction) => (
                  <div key={interaction.label} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-3xl cursor-pointer kawaii-spring ${interaction.demo} shadow-md`}
                        style={{ backgroundColor: interaction.color }}
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">
                      {interaction.label}
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed">
                      {interaction.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURE HIGHLIGHTS                                               */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F9A8D4] block mb-3">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Made with{" "}
              <span className="text-[#F9A8D4]">gentle care</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <HeartIcon className="w-7 h-7" />,
                title: "Pastel first",
                desc: "Every color is desaturated just enough to feel warm without being garish.",
                grad: "from-pink-200 to-rose-100",
                iconColor: "#F9A8D4",
              },
              {
                icon: <FlowerIcon className="w-7 h-7" />,
                title: "Round everything",
                desc: "No sharp edge survives. rounded-2xl minimum, rounded-full for pills and avatars.",
                grad: "from-purple-200 to-fuchsia-100",
                iconColor: "#A78BFA",
              },
              {
                icon: <StarIcon className="w-7 h-7" />,
                title: "Breathe freely",
                desc: "Generous padding and whitespace. Content never feels cramped or urgent.",
                grad: "from-cyan-200 to-sky-100",
                iconColor: "#67E8F9",
              },
              {
                icon: <SparkleIcon className="w-7 h-7" />,
                title: "Spring physics",
                desc: "Hover interactions overshoot and settle — like poking a marshmallow.",
                grad: "from-yellow-200 to-amber-100",
                iconColor: "#FDE68A",
              },
              {
                icon: <HeartIcon className="w-7 h-7" />,
                title: "Warm shadows",
                desc: "Shadows tinted with the card color, never gray or black. Soft and inviting.",
                grad: "from-pink-200 to-purple-100",
                iconColor: "#F9A8D4",
              },
              {
                icon: <FlowerIcon className="w-7 h-7" />,
                title: "Tiny delights",
                desc: "Small heart, star, and flower accents tucked into corners for unexpected joy.",
                grad: "from-purple-200 to-cyan-100",
                iconColor: "#A78BFA",
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.07}>
                <div className="group bg-white rounded-3xl p-7 border-2 border-pink-100 shadow-[0_4px_16px_rgba(249,168,212,0.15)] kawaii-spring hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(249,168,212,0.2)] hover:rotate-[0.5deg] cursor-default h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.grad} flex items-center justify-center mb-5 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                    style={{ color: feature.iconColor }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-gray-800 text-lg font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <SparkleIcon className="w-3 h-3 text-pink-300" />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="relative bg-[#FFF7ED] border-t border-pink-100 overflow-hidden">
        {/* Scattered SVG accents */}
        <div className="absolute top-6 left-8 text-pink-200 pointer-events-none">
          <HeartIcon className="w-5 h-5 opacity-50" />
        </div>
        <div className="absolute top-10 right-16 text-yellow-300 pointer-events-none">
          <StarIcon className="w-4 h-4 opacity-50" />
        </div>
        <div className="absolute bottom-8 left-1/4 text-purple-200 pointer-events-none">
          <FlowerIcon className="w-6 h-6 opacity-40" />
        </div>
        <div className="absolute bottom-6 right-1/3 text-cyan-200 pointer-events-none">
          <SparkleIcon className="w-4 h-4 opacity-50" />
        </div>
        <div className="absolute top-1/2 right-8 text-pink-200 pointer-events-none">
          <HeartIcon className="w-3 h-3 opacity-40" />
        </div>
        <div className="absolute top-1/2 left-1/3 text-yellow-200 pointer-events-none">
          <StarIcon className="w-3 h-3 opacity-30" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 py-14">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-[#F9A8D4]" />
                <span className="text-xl font-bold text-gray-800 tracking-tight">
                  Kawaii<span className="text-[#F9A8D4]">Minimal</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs text-center md:text-left leading-relaxed">
                Japanese kawaii warmth meets Nordic minimalism. A design system
                built on softness, warmth, and gentle delight.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">
                  Style
                </span>
                <Link href="/styles/kawaii-minimal" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/kawaii-minimal/showcase" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Showcase
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">
                  StyleKit
                </span>
                <Link href="/" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">
                  Palette
                </span>
                {paletteSwatches.slice(0, 3).map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-gray-500">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: s.hex, border: s.hex === "#FFF7ED" ? "1px solid #fce7f3" : "none" }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-pink-100 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-[#F9A8D4] kawaii-pulse-soft-anim" />
              <span>for StyleKit</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-100 text-pink-500 text-sm font-medium hover:bg-[#F9A8D4] hover:text-white kawaii-spring hover:scale-[1.04] active:scale-[0.96] transition-colors duration-200"
              >
                <SparkleIcon className="w-3 h-3" />
                StyleKit
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
