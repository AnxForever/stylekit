"use client";

import { useRef, useEffect, useState } from "react";
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

function BlobShape({ className = "", color = "#F9A8D4" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M44.7,-67.2C56.6,-58.5,63.5,-43.3,68.7,-27.8C73.9,-12.3,77.4,3.4,73.4,17.2C69.4,31,57.9,42.8,45.2,52.4C32.5,62,18.6,69.3,3.3,70.5C-12,71.7,-28.6,66.7,-42.6,57.5C-56.6,48.3,-68,34.8,-73.2,19C-78.4,3.2,-77.4,-14.9,-70.2,-29.6C-63,-44.4,-49.5,-55.7,-35.4,-63.6C-21.2,-71.5,-6.4,-75.9,7.9,-75.2C22.3,-74.5,32.8,-75.9,44.7,-67.2Z"
        transform="translate(100 100)"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Sakura Pink", hex: "#F9A8D4", label: "Primary" },
  { name: "Warm Cream", hex: "#FFF7ED", label: "Background" },
  { name: "Soft Lavender", hex: "#A78BFA", label: "Secondary" },
  { name: "Aqua Mist", hex: "#67E8F9", label: "Tertiary" },
  { name: "Butter Yellow", hex: "#FDE68A", label: "Accent" },
];

const habitItems = [
  { name: "Morning meditation", progress: 85, color: "#F9A8D4", check: 6 },
  { name: "Read 30 minutes", progress: 60, color: "#A78BFA", check: 4 },
  { name: "Drink 8 glasses", progress: 100, color: "#67E8F9", check: 7 },
  { name: "Evening walk", progress: 40, color: "#FDE68A", check: 3 },
  { name: "Journaling", progress: 72, color: "#F9A8D4", check: 5 },
];

const moodEntries = [
  { day: "Mon", color: "#F9A8D4", level: 4 },
  { day: "Tue", color: "#A78BFA", level: 3 },
  { day: "Wed", color: "#67E8F9", level: 5 },
  { day: "Thu", color: "#FDE68A", level: 3 },
  { day: "Fri", color: "#F9A8D4", level: 4 },
  { day: "Sat", color: "#A78BFA", level: 5 },
  { day: "Sun", color: "#67E8F9", level: 4 },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [checkedHabits, setCheckedHabits] = useState<boolean[]>([true, false, true, false, true]);
  const [jellyHovered, setJellyHovered] = useState(false);
  const [cloudHovered, setCloudHovered] = useState(false);
  const [springDemo, setSpringDemo] = useState<"linear" | "spring" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleHabit(i: number) {
    setCheckedHabits((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#FFF7ED] font-sans text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes kawaii-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes kawaii-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes kawaii-bounce-in {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          60% { transform: scale(1.1) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes kawaii-pulse-soft {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes kawaii-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes kawaii-blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.05) translate(8px, -6px); }
          66% { transform: scale(0.96) translate(-6px, 4px); }
        }
        @keyframes spring-ball {
          0% { transform: translateX(0); }
          100% { transform: translateX(120px); }
        }
        .kawaii-spring {
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .kawaii-float-anim {
          animation: kawaii-float 4s ease-in-out infinite;
        }
        .kawaii-wiggle-anim {
          animation: kawaii-wiggle 1.2s ease-in-out infinite;
        }
        .kawaii-pulse-soft-anim {
          animation: kawaii-pulse-soft 2.8s ease-in-out infinite;
        }
        .kawaii-spin-slow-anim {
          animation: kawaii-spin-slow 10s linear infinite;
        }
        .kawaii-blob-anim {
          animation: kawaii-blob 6s ease-in-out infinite;
        }
        .kawaii-bounce-in-anim {
          animation: kawaii-bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF7ED]/90 backdrop-blur-md border-b border-pink-100/80 shadow-[0_2px_16px_rgba(249,168,212,0.08)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 shadow-sm">
            <HeartIcon className="w-3.5 h-3.5 text-[#F9A8D4] kawaii-pulse-soft-anim" />
            <span className="text-sm font-semibold text-gray-800 tracking-tight">
              Kawaii<span className="text-[#F9A8D4]">Minimal</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Animations", "App Demo", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-sm text-gray-500 hover:text-pink-500 hover:bg-pink-50 cursor-pointer kawaii-spring hover:scale-[1.04] active:scale-[0.95]"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* StyleKit back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F9A8D4] text-white text-sm font-medium shadow-[0_4px_0_#f472b6] hover:translate-y-[2px] hover:shadow-[0_2px_0_#f472b6] hover:scale-x-[1.04] hover:scale-y-[0.97] active:translate-y-[4px] active:shadow-none active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <span>←</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Background pastel blobs */}
        <div
          className="absolute top-12 right-[-60px] w-96 h-96 pointer-events-none opacity-60"
          style={{ animation: "kawaii-blob 7s ease-in-out infinite" }}
        >
          <BlobShape color="#F9A8D4" className="w-full h-full" />
        </div>
        <div
          className="absolute top-48 left-[-80px] w-80 h-80 pointer-events-none opacity-40"
          style={{ animation: "kawaii-blob 9s ease-in-out infinite 2s" }}
        >
          <BlobShape color="#A78BFA" className="w-full h-full" />
        </div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 pointer-events-none opacity-30"
          style={{ animation: "kawaii-blob 8s ease-in-out infinite 1s" }}
        >
          <BlobShape color="#67E8F9" className="w-full h-full" />
        </div>

        {/* Floating small SVG accents */}
        <div
          className="absolute top-24 right-20 text-pink-200 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float 5s ease-in-out infinite" }}
        >
          <FlowerIcon className="w-10 h-10 opacity-70" />
        </div>
        <div
          className="absolute top-44 left-14 text-yellow-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float 7s ease-in-out infinite 1.2s" }}
        >
          <StarIcon className="w-6 h-6 opacity-60" />
        </div>
        <div
          className="absolute bottom-28 right-12 text-purple-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float 6s ease-in-out infinite 2.5s" }}
        >
          <HeartIcon className="w-7 h-7 opacity-50" />
        </div>
        <div
          className="absolute top-36 right-1/3 text-cyan-300 pointer-events-none hidden md:block kawaii-spin-slow-anim"
        >
          <SparkleIcon className="w-5 h-5 opacity-60" />
        </div>
        <div
          className="absolute bottom-36 left-20 text-pink-300 pointer-events-none hidden md:block"
          style={{ animation: "kawaii-float 8s ease-in-out infinite 0.8s" }}
        >
          <StarIcon className="w-5 h-5 opacity-50" />
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto text-center relative">
          {/* Eyebrow badge */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-500 text-xs font-semibold tracking-[0.16em] uppercase mb-7">
              <HeartIcon className="w-3 h-3" />
              可爱极简 — Kawaii Minimal
              <HeartIcon className="w-3 h-3" />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.0] tracking-tight mb-6 text-gray-800"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
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
            Japanese kawaii warmth meets minimalist restraint. Pastel palettes,
            generous whitespace, and spring animations that feel like a warm hug.
          </p>

          {/* CTA buttons — Jelly Bounce + Squishy Press demo */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* Primary CTA — Jelly Bounce + Squishy Press */}
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F9A8D4] text-white font-medium shadow-[0_6px_0_#f472b6,0_12px_24px_rgba(244,114,182,0.3)] hover:shadow-[0_3px_0_#f472b6,0_6px_12px_rgba(244,114,182,0.2)] hover:translate-y-[3px] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[6px] active:shadow-[0_0px_0_#f472b6] active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <HeartIcon className="w-4 h-4" />
              Get Started
            </button>
            {/* Secondary CTA */}
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-pink-200 text-pink-500 font-medium hover:bg-pink-50 hover:border-pink-300 hover:scale-[1.04] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <StarIcon className="w-4 h-4" />
              Explore
            </button>
          </div>

          {/* Stats row */}
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
                className="bg-white rounded-3xl p-5 text-center border border-pink-100 shadow-[0_4px_16px_rgba(249,168,212,0.15)] kawaii-spring hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(244,114,182,0.2)] cursor-default"
                style={{ transitionDelay: `${i * 0.04}s` }}
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
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F9A8D4] block mb-3">
              Palette
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Pastel <span className="text-[#A78BFA]">color system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Five core pastels inspired by cherry blossoms, warm cream, lavender fields,
              aqua morning mist, and golden afternoon light. Each swatch does a Cloud Lift on hover.
            </p>
          </RevealBlock>

          {/* Interactive swatches — Cloud Lift on hover */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-8 md:gap-14 justify-center mb-16">
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
                      transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                      position: "relative",
                    }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.hex === "#FFF7ED" ? "2px solid #fce7f3" : "none",
                        boxShadow: hoveredSwatch === i
                          ? `0 20px_40px_rgba(244,114,182,0.25), 0 8px 24px ${swatch.hex}88`
                          : `0 6px 20px ${swatch.hex}55`,
                        transition: "box-shadow 0.35s ease",
                      }}
                    />
                    {hoveredSwatch === i && (
                      <div
                        className="absolute -top-2 -right-1 kawaii-bounce-in-anim"
                        style={{ color: "#fff" }}
                      >
                        <HeartIcon className={`w-5 h-5 drop-shadow-sm ${swatch.hex === "#FFF7ED" ? "text-[#F9A8D4]" : "text-white"}`} />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700">{swatch.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{swatch.hex}</div>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-gray-500 bg-gray-100">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient combinations */}
          <RevealBlock delay={0.2}>
            <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_8px_24px_rgba(249,168,212,0.12)]">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-6">
                Gradient combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: "#F9A8D4", to: "#A78BFA", label: "Sakura → Lavender" },
                  { from: "#A78BFA", to: "#67E8F9", label: "Lavender → Aqua" },
                  { from: "#67E8F9", to: "#FDE68A", label: "Aqua → Butter" },
                  { from: "#FDE68A", to: "#F9A8D4", label: "Butter → Sakura" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-16 rounded-2xl mb-2 kawaii-spring group-hover:-translate-y-1 group-hover:scale-[1.03]"
                      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                    />
                    <div className="text-xs text-gray-400 text-center">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A78BFA] block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Soft <span className="text-[#F9A8D4]">building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Every component is rounded, gentle, and interactive. Spring easing
              on all hover states — no rigid linear transitions.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.94] ${
                    activeTab === tab
                      ? "bg-[#F9A8D4] text-white shadow-[0_4px_0_#f472b6]"
                      : "bg-white border-2 border-pink-100 text-gray-500 hover:border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-pink-100 shadow-[0_8px_32px_rgba(249,168,212,0.15)]">

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  {/* Primary */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Primary — Jelly Bounce (squash-stretch)
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F9A8D4] text-white font-medium shadow-[0_6px_0_#f472b6] hover:translate-y-[2px] hover:shadow-[0_4px_0_#f472b6] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[6px] active:shadow-none active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        <HeartIcon className="w-4 h-4" />
                        Primary
                      </button>
                      <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#A78BFA] text-white font-medium shadow-[0_5px_0_#7c3aed99] hover:translate-y-[2px] hover:shadow-[0_3px_0_#7c3aed99] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[5px] active:shadow-none active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        <StarIcon className="w-4 h-4" />
                        Secondary
                      </button>
                    </div>
                  </div>

                  {/* Outline + Gradient */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Outline &amp; Gradient — spring easing
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-7 py-3.5 rounded-full border-2 border-[#F9A8D4] text-[#F9A8D4] font-medium bg-white hover:bg-pink-50 hover:scale-[1.04] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        Outlined
                      </button>
                      <button className="px-7 py-3.5 rounded-full text-[#F9A8D4] font-medium hover:bg-pink-50 hover:scale-[1.04] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        Ghost
                      </button>
                      <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium hover:opacity-90 hover:scale-[1.04] active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{ background: "linear-gradient(135deg, #F9A8D4, #A78BFA)" }}>
                        <SparkleIcon className="w-3.5 h-3.5" />
                        Gradient
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", px: "px-4 py-2 text-xs" },
                        { size: "md", px: "px-6 py-3 text-sm" },
                        { size: "lg", px: "px-9 py-4 text-base" },
                      ].map(({ size, px }) => (
                        <button
                          key={size}
                          className={`rounded-full bg-[#F9A8D4] text-white font-medium shadow-[0_4px_0_#f472b6] hover:translate-y-[2px] hover:shadow-[0_2px_0_#f472b6] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[4px] active:shadow-none active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${px}`}
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
                      title: "Habit Tracker",
                      desc: "Track daily routines with gentle visual feedback and pastel progress bars.",
                      grad: "from-pink-200 to-rose-100",
                      iconColor: "#F9A8D4",
                      icon: <HeartIcon className="w-6 h-6" />,
                    },
                    {
                      title: "Mood Journal",
                      desc: "Record feelings with soft color coding and rounded emotion indicators.",
                      grad: "from-purple-200 to-fuchsia-100",
                      iconColor: "#A78BFA",
                      icon: <StarIcon className="w-6 h-6" />,
                    },
                    {
                      title: "Wish Board",
                      desc: "Save favourite things in a delightfully soft collection layout.",
                      grad: "from-cyan-200 to-sky-100",
                      iconColor: "#67E8F9",
                      icon: <SparkleIcon className="w-6 h-6" />,
                    },
                    {
                      title: "Friend Circle",
                      desc: "Share progress with friends in a gentle, supportive space.",
                      grad: "from-yellow-200 to-amber-100",
                      iconColor: "#FDE68A",
                      icon: <FlowerIcon className="w-6 h-6" />,
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group bg-white border-2 border-pink-100 rounded-3xl p-7 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(244,114,182,0.25)] hover:rotate-[0.5deg]"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.grad} flex items-center justify-center mb-5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6`}
                        style={{ color: card.iconColor }}
                      >
                        {card.icon}
                      </div>
                      <h4 className="text-gray-800 text-lg font-semibold mb-2">{card.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="Type something sweet..."
                        className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="hello@kawaii.app"
                        className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
                      <textarea
                        rows={3}
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Mood today</label>
                      <select className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200">
                        <option>Happy</option>
                        <option>Calm</option>
                        <option>Excited</option>
                        <option>Cozy</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border-2 border-pink-300 kawaii-spring cursor-pointer hover:scale-110" />
                      <label className="text-sm text-gray-600 cursor-pointer">Send kawaii notifications</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border-2 border-pink-300 bg-[#F9A8D4] flex items-center justify-center kawaii-spring cursor-pointer hover:scale-110">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label className="text-sm text-gray-600 cursor-pointer">Daily habit reminders</label>
                    </div>
                    <button className="w-full py-3.5 rounded-2xl text-white font-medium hover:opacity-90 hover:scale-[1.02] active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{ background: "linear-gradient(135deg, #F9A8D4, #A78BFA)" }}>
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  {/* Pill badges */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Pastel pill badges
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Kawaii", bg: "#fce7f3", text: "#db2777" },
                        { label: "Minimal", bg: "#ede9fe", text: "#7c3aed" },
                        { label: "Soft", bg: "#cffafe", text: "#0891b2" },
                        { label: "Round", bg: "#fef9c3", text: "#ca8a04" },
                        { label: "Spring", bg: "#fce7f3", text: "#be185d" },
                        { label: "Pastel", bg: "#ede9fe", text: "#6d28d9" },
                        { label: "Gentle", bg: "#dcfce7", text: "#15803d" },
                        { label: "Cozy", bg: "#fff7ed", text: "#c2410c" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="px-4 py-1.5 rounded-full text-sm font-medium kawaii-spring hover:scale-[1.1] hover:-translate-y-1 cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status badges */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Status badges with icons
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Completed", icon: "check", bg: "#dcfce7", text: "#15803d" },
                        { label: "In Progress", icon: "star", bg: "#fce7f3", text: "#db2777" },
                        { label: "Planned", icon: "sparkle", bg: "#ede9fe", text: "#7c3aed" },
                        { label: "Paused", icon: "heart", bg: "#fef9c3", text: "#b45309" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium kawaii-spring hover:scale-[1.07] cursor-default"
                          style={{ backgroundColor: b.bg, color: b.text }}
                        >
                          {b.icon === "check" && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {b.icon === "star" && <StarIcon className="w-3 h-3" />}
                          {b.icon === "sparkle" && <SparkleIcon className="w-3 h-3" />}
                          {b.icon === "heart" && <HeartIcon className="w-3 h-3" />}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Count badges */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-5">
                      Count badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "Habits", count: 5, color: "#F9A8D4" },
                        { label: "Moods", count: 12, color: "#A78BFA" },
                        { label: "Streaks", count: 7, color: "#67E8F9" },
                        { label: "Stars", count: 24, color: "#FDE68A" },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 font-medium">{b.label}</span>
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white kawaii-spring hover:scale-[1.15]"
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
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#67E8F9] block mb-3">
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Animation <span className="text-[#F9A8D4]">rules demo</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Four named interaction patterns — hover or click each demo to feel the difference.
              Spring easing runs everywhere.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Jelly Bounce */}
            <RevealBlock delay={0.08}>
              <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_8px_24px_rgba(249,168,212,0.15)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-500 text-xs font-semibold">Jelly Bounce</span>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed font-mono">
                  hover:scale-x-[1.05] hover:scale-y-[0.97]<br />
                  cubic-bezier(0.34,1.56,0.64,1)
                </p>
                <div className="flex items-center justify-center py-4">
                  <button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F9A8D4] text-white font-medium shadow-[0_6px_0_#f472b6] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-x-[1.06] hover:scale-y-[0.96] hover:translate-y-[2px] hover:shadow-[0_4px_0_#f472b6] active:scale-[0.93] active:translate-y-[6px] active:shadow-none"
                    onMouseEnter={() => setJellyHovered(true)}
                    onMouseLeave={() => setJellyHovered(false)}
                  >
                    <HeartIcon className="w-4 h-4" />
                    Hover me!
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  {jellyHovered ? "Squashing horizontally — gummy elastic feel" : "Hover to see squash-and-stretch"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 2: Cloud Lift */}
            <RevealBlock delay={0.12}>
              <div
                className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-[0_8px_24px_rgba(167,139,250,0.15)] h-full cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group"
                onMouseEnter={() => setCloudHovered(true)}
                onMouseLeave={() => setCloudHovered(false)}
                style={{
                  transform: cloudHovered ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: cloudHovered
                    ? "0 20px 40px rgba(244,114,182,0.25), 0 8px 24px rgba(167,139,250,0.2)"
                    : "0 8px 24px rgba(167,139,250,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-500 text-xs font-semibold">Cloud Lift</span>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed font-mono">
                  hover:-translate-y-2<br />
                  hover:shadow-[0_20px_40px_rgba(244,114,182,0.25)]
                </p>
                <div className="flex items-center justify-center py-4">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-200 to-pink-100 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1">
                    <FlowerIcon className="w-10 h-10 text-purple-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  {cloudHovered ? "Floating up with pastel shadow glow" : "Hover the card to float it upward"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 3: Squishy Press */}
            <RevealBlock delay={0.16}>
              <div className="bg-white rounded-3xl p-8 border-2 border-cyan-100 shadow-[0_8px_24px_rgba(103,232,249,0.15)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-600 text-xs font-semibold">Squishy Press</span>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed font-mono">
                  active:scale-[0.92] active:translate-y-[4px]<br />
                  tightens shadow — soft-mushy tactile
                </p>
                <div className="flex items-center justify-center py-4">
                  <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#67E8F9] text-white font-medium shadow-[0_8px_0_#0891b2,0_12px_20px_rgba(103,232,249,0.3)] hover:shadow-[0_6px_0_#0891b2] hover:translate-y-[2px] active:scale-[0.92] active:translate-y-[4px] active:shadow-[0_2px_0_#0891b2] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <StarIcon className="w-4 h-4" />
                    Press me!
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Click and hold — feels like pressing a soft pillow
                </p>
              </div>
            </RevealBlock>

            {/* Card 4: Spring vs Linear */}
            <RevealBlock delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border-2 border-yellow-100 shadow-[0_8px_24px_rgba(253,230,138,0.25)] h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">Spring Easing</span>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed font-mono">
                  cubic-bezier(0.34,1.56,0.64,1)<br />
                  vs linear — side by side
                </p>
                <div className="space-y-5">
                  {/* Linear */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-medium">Linear</span>
                      <button
                        className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                        onClick={() => setSpringDemo(springDemo === "linear" ? null : "linear")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-10 bg-gray-50 rounded-full overflow-hidden">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-7 h-7 rounded-full bg-gray-300"
                        style={{
                          transform: `translateY(-50%) translateX(${springDemo === "linear" ? "120px" : "0"})`,
                          transition: springDemo === "linear" ? "transform 0.8s linear" : "none",
                        }}
                      />
                    </div>
                  </div>
                  {/* Spring */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#F9A8D4] font-medium">Spring cubic-bezier</span>
                      <button
                        className="text-xs px-3 py-1 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors"
                        onClick={() => setSpringDemo(springDemo === "spring" ? null : "spring")}
                      >
                        Animate
                      </button>
                    </div>
                    <div className="relative h-10 bg-pink-50 rounded-full overflow-hidden">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-2 w-7 h-7 rounded-full bg-[#F9A8D4]"
                        style={{
                          transform: `translateY(-50%) translateX(${springDemo === "spring" ? "120px" : "0"})`,
                          transition: springDemo === "spring" ? "transform 0.8s cubic-bezier(0.34,1.56,0.64,1)" : "none",
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
      {/* 6. KAWAII APP UI DEMO — Habit Tracker                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F9A8D4] block mb-3">
              App Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Kawaii <span className="text-[#A78BFA]">habit tracker</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              A mock lifestyle app showing the design system in context — rounded completions,
              pastel progress bars, Cloud Lift stats, and Jelly Bounce add button.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main habit list */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_8px_32px_rgba(249,168,212,0.15)] h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Today&apos;s Habits</h3>
                    <p className="text-sm text-gray-400 mt-0.5">Friday, Feb 21</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F9A8D4] text-white text-sm font-medium shadow-[0_4px_0_#f472b6] hover:translate-y-[2px] hover:shadow-[0_2px_0_#f472b6] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[4px] active:shadow-none active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                    Add habit
                  </button>
                </div>

                {/* Habit items */}
                <div className="space-y-3">
                  {habitItems.map((habit, i) => (
                    <div
                      key={habit.name}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-[#FFF7ED] hover:bg-pink-50 transition-colors duration-200 cursor-pointer"
                    >
                      {/* Rounded checkmark */}
                      <button
                        onClick={() => toggleHabit(i)}
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.12] active:scale-[0.9]"
                        style={{
                          borderColor: habit.color,
                          backgroundColor: checkedHabits[i] ? habit.color : "transparent",
                        }}
                      >
                        {checkedHabits[i] && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Label + progress */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium mb-2 transition-colors duration-200 ${checkedHabits[i] ? "text-gray-400 line-through" : "text-gray-700"}`}>
                          {habit.name}
                        </div>
                        <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${habit.progress}%`, backgroundColor: habit.color }}
                          />
                        </div>
                      </div>

                      {/* Day dots */}
                      <div className="flex gap-1 shrink-0">
                        {[...Array(7)].map((_, d) => (
                          <div
                            key={d}
                            className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                            style={{ backgroundColor: d < habit.check ? habit.color : "#fce7f3" }}
                          />
                        ))}
                      </div>

                      {/* Percent */}
                      <span className="text-xs font-bold shrink-0" style={{ color: habit.color }}>
                        {habit.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Stats sidebar */}
            <RevealBlock delay={0.18}>
              <div className="space-y-5 h-full">
                {/* Streak card — Cloud Lift */}
                <div className="bg-white rounded-3xl p-7 border-2 border-pink-100 shadow-[0_8px_24px_rgba(249,168,212,0.12)] kawaii-spring hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(244,114,182,0.2)] cursor-default">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-2xl bg-pink-100 flex items-center justify-center">
                      <HeartIcon className="w-5 h-5 text-[#F9A8D4]" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Current Streak</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">12</div>
                  <div className="text-xs text-gray-400">days in a row</div>
                  <div className="mt-4 flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-6 rounded-lg"
                        style={{ backgroundColor: i < 5 ? "#F9A8D4" : "#fce7f3" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Completion rate — Cloud Lift */}
                <div className="bg-white rounded-3xl p-7 border-2 border-purple-100 shadow-[0_8px_24px_rgba(167,139,250,0.12)] kawaii-spring hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(167,139,250,0.2)] cursor-default">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-2xl bg-purple-100 flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Today</span>
                  </div>
                  <div className="text-4xl font-bold text-[#A78BFA] mb-1">
                    {checkedHabits.filter(Boolean).length}/{habitItems.length}
                  </div>
                  <div className="text-xs text-gray-400 mb-4">habits completed</div>
                  <div className="h-2.5 bg-purple-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#A78BFA] transition-all duration-700"
                      style={{ width: `${(checkedHabits.filter(Boolean).length / habitItems.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Mood — Cloud Lift */}
                <div className="bg-white rounded-3xl p-7 border-2 border-cyan-100 shadow-[0_8px_24px_rgba(103,232,249,0.12)] kawaii-spring hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(103,232,249,0.2)] cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-2xl bg-cyan-100 flex items-center justify-center">
                      <FlowerIcon className="w-5 h-5 text-[#67E8F9]" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">Mood Chart</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {moodEntries.map((entry) => (
                      <div key={entry.day} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-lg kawaii-spring hover:-translate-y-0.5"
                          style={{ height: `${entry.level * 10}px`, backgroundColor: entry.color, opacity: 0.8 }}
                        />
                        <span className="text-[9px] text-gray-400">{entry.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN PHILOSOPHY — 3 principle cards                        */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FDE68A] block mb-3">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Design <span className="text-[#F9A8D4]">principles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Three core ideas that define kawaii-minimal. Warmth without saccharine excess.
              Minimalism without coldness. Motion without rigidity.
            </p>
          </RevealBlock>

          {/* 3 principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <FlowerIcon className="w-8 h-8" />,
                title: "Soft & Round",
                tagline: "No sharp edge survives",
                desc: "rounded-full for pills and avatars. rounded-3xl for cards. rounded-2xl minimum for all interactive elements. Organic shapes invite touch and trust.",
                doItems: ["rounded-full, rounded-3xl, rounded-2xl", "Soft blob shapes for backgrounds", "Pill buttons and oval inputs"],
                color: "#F9A8D4",
                bg: "from-pink-200 to-rose-100",
                border: "border-pink-100",
                shadow: "shadow-[0_8px_28px_rgba(249,168,212,0.18)]",
              },
              {
                icon: <HeartIcon className="w-8 h-8" />,
                title: "Pastel Color",
                tagline: "Desaturated, warm, inviting",
                desc: "Every hue sits in the 200-300 Tailwind range. Never neon, never cold corporate blue. Tinted shadows that echo the card's accent color.",
                doItems: ["#F9A8D4 pink-300 primary", "#A78BFA purple-300 secondary", "Tinted shadows — no gray"],
                color: "#A78BFA",
                bg: "from-purple-200 to-fuchsia-100",
                border: "border-purple-100",
                shadow: "shadow-[0_8px_28px_rgba(167,139,250,0.18)]",
              },
              {
                icon: <SparkleIcon className="w-8 h-8" />,
                title: "Spring Motion",
                tagline: "Elastic, joyful, never rigid",
                desc: "cubic-bezier(0.34,1.56,0.64,1) — the spring overshoots and settles. Squash-stretch on press. Linear transitions are banned from this style.",
                doItems: ["cubic-bezier(0.34,1.56,0.64,1)", "hover:scale-x-[1.05] hover:scale-y-[0.97]", "active:scale-[0.93] active:translate-y"],
                color: "#67E8F9",
                bg: "from-cyan-200 to-sky-100",
                border: "border-cyan-100",
                shadow: "shadow-[0_8px_28px_rgba(103,232,249,0.18)]",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className={`group bg-white rounded-3xl p-8 border-2 ${principle.border} ${principle.shadow} h-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:rotate-[0.4deg] cursor-default`}
                  style={{
                    ["--hover-shadow" as string]: `0 20px 40px ${principle.color}44`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${principle.bg} flex items-center justify-center mb-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6`}
                    style={{ color: principle.color }}
                  >
                    {principle.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1">{principle.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: principle.color }}>
                    {principle.tagline}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{principle.desc}</p>

                  {/* Do items */}
                  <ul className="space-y-2">
                    {principle.doItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-500 font-mono">
                        <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: principle.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.12}>
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
                  {[
                    "bg-[#FFF7ED] warm white background always",
                    "rounded-2xl / rounded-3xl / rounded-full corners",
                    "Soft pastel shadows with color tint",
                    "Spring cubic-bezier(0.34,1.56,0.64,1) everywhere",
                    "Squash-stretch: scale-x/scale-y non-proportional",
                    "Pastel pink #F9A8D4 as primary accent",
                    "Generous p-6 / p-8 / gap-6 spacing",
                    "Small SVG heart, star, flower accents",
                    "font-sans font-medium — approachable weight",
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
                  {[
                    "No dark or black backgrounds",
                    "No sharp corners: rounded-none, rounded-sm",
                    "No glow or neon effects",
                    "No high-saturation bright neon colors",
                    "No bold dark borders (border-gray-800)",
                    "No dense cluttered layouts",
                    "No rigid linear transitions",
                    "No proportional scale-x/scale-y (kill the jelly)",
                    "No cold corporate blue or harsh contrast",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-300 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURE HIGHLIGHTS                                               */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F9A8D4] block mb-3">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Made with <span className="text-[#F9A8D4]">gentle care</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div className="relative group bg-white rounded-3xl p-7 border-2 border-pink-100 shadow-[0_4px_16px_rgba(249,168,212,0.15)] h-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(249,168,212,0.2)] hover:rotate-[0.5deg] cursor-default">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.grad} flex items-center justify-center mb-5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6`}
                    style={{ color: feature.iconColor }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-gray-800 text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
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
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="relative bg-[#FFF7ED] border-t border-pink-100 overflow-hidden">
        {/* Floating pastel divider decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#F9A8D4] via-[#A78BFA] to-[#67E8F9] rounded-full opacity-60" />

        {/* Floating heart decoration */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 text-pink-200 pointer-events-none kawaii-float-anim"
        >
          <HeartIcon className="w-5 h-5 opacity-50" />
        </div>

        {/* Scattered accents */}
        <div className="absolute top-10 left-10 text-pink-200 pointer-events-none">
          <HeartIcon className="w-4 h-4 opacity-50" />
        </div>
        <div className="absolute top-14 right-20 text-yellow-300 pointer-events-none">
          <StarIcon className="w-4 h-4 opacity-50" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-purple-200 pointer-events-none">
          <FlowerIcon className="w-6 h-6 opacity-40" />
        </div>
        <div className="absolute bottom-8 right-1/3 text-cyan-200 pointer-events-none">
          <SparkleIcon className="w-4 h-4 opacity-50" />
        </div>
        <div className="absolute top-1/2 right-10 text-pink-100 pointer-events-none">
          <HeartIcon className="w-3 h-3 opacity-60" />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F9A8D4] flex items-center justify-center">
                  <HeartIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800 tracking-tight">
                  Kawaii<span className="text-[#F9A8D4]">Minimal</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Japanese kawaii warmth meets minimalist restraint. Pastel palettes,
                generous whitespace, and spring animations.
              </p>
              <div className="flex gap-2">
                {[
                  { color: "#F9A8D4", border: false },
                  { color: "#A78BFA", border: false },
                  { color: "#67E8F9", border: false },
                  { color: "#FDE68A", border: false },
                  { color: "#FFF7ED", border: true },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full kawaii-spring hover:scale-[1.3]"
                    style={{
                      backgroundColor: s.color,
                      border: s.border ? "1.5px solid #fce7f3" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">Style</span>
                <Link href="/styles/kawaii-minimal" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/kawaii-minimal/showcase" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/kawaii-minimal/cover" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">StyleKit</span>
                <Link href="/" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-gray-500 hover:text-[#F9A8D4] transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">Palette</span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-gray-500 text-xs">
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

          {/* Pastel divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-8 rounded-full" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-[#F9A8D4] kawaii-pulse-soft-anim" />
              <span>for StyleKit</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-100 text-pink-500 text-sm font-medium hover:bg-[#F9A8D4] hover:text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:scale-x-[1.05] hover:scale-y-[0.97] active:scale-[0.94]"
            >
              <SparkleIcon className="w-3 h-3" />
              Back to StyleKit
              <span>→</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
