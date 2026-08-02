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
/*  Inline SVG icons                                                    */
/* ------------------------------------------------------------------ */

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function WindIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  );
}

function NavigationIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                  */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Void Black", hex: "#000000", label: "Primary", textColor: "#ffffff", bordered: true },
  { name: "Pure White", hex: "#ffffff", label: "Secondary", textColor: "#000000", bordered: true },
  { name: "Indigo", hex: "#6366f1", label: "Accent 1", textColor: "#ffffff", bordered: false },
  { name: "Crimson Pink", hex: "#ec4899", label: "Accent 2", textColor: "#ffffff", bordered: false },
  { name: "Teal", hex: "#14b8a6", label: "Accent 3", textColor: "#ffffff", bordered: false },
  { name: "Amber", hex: "#f59e0b", label: "Accent 4", textColor: "#000000", bordered: false },
];

const sectionColors = [
  { bg: "from-black via-indigo-950 to-black", glow: "rgba(99,102,241,0.35)", accent: "#6366f1", label: "01" },
  { bg: "from-black via-pink-950 to-black", glow: "rgba(236,72,153,0.35)", accent: "#ec4899", label: "02" },
  { bg: "from-black via-teal-950 to-black", glow: "rgba(20,184,166,0.35)", accent: "#14b8a6", label: "03" },
  { bg: "from-black via-amber-950 to-black", glow: "rgba(245,158,11,0.35)", accent: "#f59e0b", label: "04" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1 — Staggered Parallax demo
  const [parallaxHovered, setParallaxHovered] = useState(false);

  // aiRule 2 — Breathing Background demo
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingIndex, setBreathingIndex] = useState(0);

  // aiRule 3 — Capsule Nav Dots demo
  const [capsuleActiveIndex, setCapsuleActiveIndex] = useState(0);
  const [capsuleHoveredIndex, setCapsuleHoveredIndex] = useState<number | null>(null);

  // aiRule 4 — Heading Scale demo
  const [headingHovered, setHeadingHovered] = useState(false);
  const [headingLayer, setHeadingLayer] = useState<"off" | "hover">("off");

  // Components tab
  const [activeTab, setActiveTab] = useState<"nav" | "hero" | "button" | "card">("nav");

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");

  // Scroll container ref for live demo
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Breathing auto-cycle accent
  useEffect(() => {
    if (!breathingActive) return;
    const t = setInterval(() => {
      setBreathingIndex((i) => (i + 1) % sectionColors.length);
    }, 2000);
    return () => clearInterval(t);
  }, [breathingActive]);

  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden">
      <style>{`
        @keyframes fps-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        @keyframes fps-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes fps-scan {
          0% { transform: translateY(-100%); opacity: 0.15; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes fps-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fps-bounce-anim {
          animation: fps-bounce 2s ease-in-out infinite;
        }
        .fps-pulse-anim {
          animation: fps-pulse 2.5s ease-in-out infinite;
        }
        .fps-scan-line {
          animation: fps-scan 4s linear infinite;
        }
        .fps-fade-up-anim {
          animation: fps-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV BAR                                                  */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <ZapIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Full<span className="text-indigo-400">Page</span>Scroll
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
              { label: "AI Rules", href: "#ai-rules" },
              { label: "Philosophy", href: "#philosophy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-full text-xs text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/full-page-scroll"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-indigo-100 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO SECTION                                                   */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Radial background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(99,102,241,0.18), transparent), radial-gradient(ellipse 50% 50% at 75% 70%, rgba(236,72,153,0.12), transparent)",
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="fps-scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 text-center">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/40 text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 fps-pulse-anim" />
              全屏滚动布局 — Full Page Scroll
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl md:text-7xl lg:text-[96px] font-black leading-[0.95] tracking-tight mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="block text-white">Cinematic</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #14b8a6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Immersive
            </span>
            <span className="block text-white">Scrolling.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Each section occupies the full viewport. Scroll-snap forces the reader into one complete scene at a time,
            creating a cinematic, story-like rhythm. No partial screens. No fragmented narratives.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300">
              <ZapIcon className="w-4 h-4" />
              Explore Live Demo
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:border-white/50 hover:text-white hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300">
              <LayersIcon className="w-4 h-4" />
              View Components
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "100vh", label: "Per Section", accent: "#6366f1" },
              { value: "snap", label: "Mandatory", accent: "#ec4899" },
              { value: "4+", label: "AI Rules", accent: "#14b8a6" },
              { value: "60fps", label: "Smooth", accent: "#f59e0b" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group border border-white/10 rounded-2xl p-5 text-center bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="text-2xl font-black mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          className="fps-bounce-anim absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/90 transition-colors duration-300"
          style={{ transform: "translateX(-50%)" }}
          onClick={() => {
            const next = document.getElementById("section-live-demo");
            if (next) next.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ArrowDownIcon className="w-5 h-5" />
        </button>
      </section>

      {/* ================================================================ */}
      {/* 3. FULL-PAGE SCROLL LIVE DEMO                                     */}
      {/* ================================================================ */}
      <section id="section-live-demo" className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 block mb-3">
              Live Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Full-page scroll <span className="text-indigo-400">in action</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              A miniature scroll-snap container with 4 sections, distinct gradient backgrounds, breathing radial glows,
              group-hover parallax layers, and capsule nav dots on the right.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="relative flex gap-6">
              {/* Mini scroll container */}
              <div
                ref={scrollContainerRef}
                className="relative flex-1 overflow-y-auto rounded-2xl border border-white/10"
                style={{
                  height: "480px",
                  scrollSnapType: "y mandatory",
                  scrollBehavior: "smooth",
                }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const idx = Math.round(el.scrollTop / el.clientHeight);
                  setActiveSection(idx);
                }}
              >
                {sectionColors.map((sc, idx) => (
                  <div
                    key={idx}
                    className={`relative flex items-center justify-center bg-gradient-to-br ${sc.bg} overflow-hidden group cursor-default`}
                    style={{ height: "480px", scrollSnapAlign: "start" }}
                  >
                    {/* Breathing background radial glow */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-110"
                      style={{
                        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${sc.glow}, transparent)`,
                      }}
                    />

                    {/* Staggered parallax content */}
                    <div className="relative z-10 text-center px-8">
                      {/* delay-0 — eyebrow, fastest */}
                      <span
                        className="inline-block text-xs uppercase tracking-[0.25em] opacity-50 mb-3 transition-transform duration-700 ease-out group-hover:-translate-y-3"
                        style={{ color: sc.accent, transitionDelay: "0ms" }}
                      >
                        Chapter {sc.label}
                      </span>

                      {/* delay-75 — heading with scale */}
                      <h3
                        className="text-3xl md:text-5xl font-black text-white mb-4 transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                        style={{ transitionDelay: "75ms" }}
                      >
                        {["Immersive Story", "Bold Vision", "Deep Focus", "Final Act"][idx]}
                      </h3>

                      {/* delay-150 — body text, slowest */}
                      <p
                        className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed transition-transform duration-700 ease-out group-hover:-translate-y-1"
                        style={{ transitionDelay: "150ms" }}
                      >
                        {[
                          "Each section consumes the full viewport.",
                          "Scroll-snap locks to section boundaries.",
                          "Parallax layers create cinematic depth.",
                          "Navigation dots guide the journey.",
                        ][idx]}
                      </p>
                    </div>

                    {/* Section counter */}
                    <div
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: sc.accent + "88" }}
                    >
                      {idx + 1} / 4
                    </div>
                  </div>
                ))}
              </div>

              {/* Capsule nav dots */}
              <nav className="flex flex-col gap-3 justify-center" aria-label="Section navigation">
                {sectionColors.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (container) {
                        container.scrollTo({ top: idx * container.clientHeight, behavior: "smooth" });
                        setActiveSection(idx);
                      }
                    }}
                    onMouseEnter={() => setCapsuleHoveredIndex(idx)}
                    onMouseLeave={() => setCapsuleHoveredIndex(null)}
                    className="rounded-full transition-all duration-300"
                    aria-label={`Go to section ${idx + 1}`}
                    style={{
                      width: "12px",
                      height:
                        activeSection === idx
                          ? "40px"
                          : capsuleHoveredIndex === idx
                          ? "24px"
                          : "12px",
                      backgroundColor:
                        activeSection === idx
                          ? sc.accent
                          : capsuleHoveredIndex === idx
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </nav>
            </div>

            <p className="text-white/30 text-xs mt-4 text-center">
              Scroll inside the demo container. Nav dots update automatically. Hover a section to see group-hover parallax.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COLOR PALETTE                                                   */}
      {/* ================================================================ */}
      <section id="palette" className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-400 block mb-3">
              Color System
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Void black + <span className="text-pink-400">vivid accents</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              Full Page Scroll runs on absolute black (#000000) as the primary canvas, pure white (#ffffff) for content.
              Four expressive accents — indigo, crimson pink, teal, and amber — each commanding its own full-viewport scene.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-center mb-16">
              {palette.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform:
                        hoveredSwatch === i
                          ? "translateY(-10px) scale(1.1)"
                          : "translateY(0) scale(1)",
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.bordered ? "2px solid rgba(255,255,255,0.25)" : "none",
                        boxShadow:
                          hoveredSwatch === i
                            ? `0 24px 48px ${swatch.hex === "#000000" ? "rgba(255,255,255,0.1)" : swatch.hex}66, 0 8px 16px ${swatch.hex === "#000000" ? "rgba(255,255,255,0.05)" : swatch.hex}44`
                            : `0 4px 16px ${swatch.hex === "#000000" ? "rgba(255,255,255,0.05)" : swatch.hex}33`,
                        transition: "box-shadow 0.4s ease",
                      }}
                    >
                      {hoveredSwatch === i && (
                        <span
                          className="text-[10px] font-mono font-bold fps-fade-up-anim"
                          style={{ color: swatch.textColor }}
                        >
                          {swatch.hex}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white/90">{swatch.name}</div>
                    <div className="text-xs text-white/40 font-mono">{swatch.hex}</div>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/60">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient scene combinations */}
          <RevealBlock delay={0.2}>
            <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.03]">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-6">
                Section gradient combinations
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Indigo Scene", from: "#1e1b4b", to: "#000000", accent: "#6366f1" },
                  { label: "Crimson Scene", from: "#4a0020", to: "#000000", accent: "#ec4899" },
                  { label: "Teal Scene", from: "#042f2e", to: "#000000", accent: "#14b8a6" },
                  { label: "Amber Scene", from: "#431407", to: "#000000", accent: "#f59e0b" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-pointer">
                    <div
                      className="h-20 rounded-xl mb-2 transition-all duration-500 group-hover:-translate-y-1 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        boxShadow: `0 0 0 1px ${g.accent}33`,
                      }}
                    >
                      <div
                        className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${g.accent}33, transparent)`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-white/40 text-center">{g.label}</div>
                    <div className="text-xs text-center font-mono mt-0.5" style={{ color: g.accent }}>
                      {g.accent}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENTS DEMO (4 tabs)                                       */}
      {/* ================================================================ */}
      <section id="components" className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Full-scroll <span className="text-teal-400">building blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              The core components that power the full-page-scroll system — nav dots, hero sections, scroll buttons, and content cards.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["nav", "hero", "button", "card"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeTab === tab
                      ? "bg-teal-600 text-white"
                      : "border border-white/15 text-white/50 hover:text-white hover:border-white/40"
                  }`}
                >
                  {tab === "nav"
                    ? "Capsule Nav"
                    : tab === "hero"
                    ? "Full Section"
                    : tab === "button"
                    ? "Scroll Button"
                    : "Content Card"}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div className="border border-white/10 rounded-2xl p-8 md:p-12 bg-white/[0.03] min-h-[400px]">

              {/* NAV TAB */}
              {activeTab === "nav" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-6">
                      Capsule nav dots — fixed right side. Active = tall capsule (h-10), hover = medium (h-6), default = circle (h-3)
                    </p>

                    <div className="flex gap-12 items-center">
                      <div className="flex flex-col gap-3">
                        {[0, 1, 2, 3].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => setCapsuleActiveIndex(idx)}
                            onMouseEnter={() => setCapsuleHoveredIndex(idx + 10)}
                            onMouseLeave={() => setCapsuleHoveredIndex(null)}
                            className="rounded-full transition-all duration-300"
                            aria-label={`Section ${idx + 1}`}
                            style={{
                              width: "12px",
                              height:
                                capsuleActiveIndex === idx
                                  ? "40px"
                                  : capsuleHoveredIndex === idx + 10
                                  ? "24px"
                                  : "12px",
                              backgroundColor:
                                capsuleActiveIndex === idx
                                  ? "#6366f1"
                                  : capsuleHoveredIndex === idx + 10
                                  ? "rgba(255,255,255,0.8)"
                                  : "rgba(255,255,255,0.25)",
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex-1">
                        <p className="text-white/60 text-sm mb-4">
                          Click each dot to set active. Hover to see capsule expansion.
                        </p>
                        <div className="space-y-2 text-xs font-mono text-white/30">
                          <div>Active:   <span className="text-indigo-400">w-3 h-10 bg-accent</span></div>
                          <div>Hover:    <span className="text-white/60">w-3 h-6 bg-white/80</span></div>
                          <div>Default:  <span className="text-white/40">w-3 h-3 bg-white/25</span></div>
                          <div>Easing:   <span className="text-teal-400">transition-all duration-300</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">Code pattern</p>
                    <pre className="text-xs text-white/50 font-mono bg-black/50 rounded-xl p-5 overflow-x-auto leading-relaxed border border-white/10">
{`<nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
  {/* Active — tall capsule */}
  <a className="w-3 h-10 rounded-full bg-indigo-500 transition-all duration-300" />

  {/* Inactive — expands to capsule on hover */}
  <a className="w-3 h-3 rounded-full bg-white/30
    hover:bg-white/80 hover:h-6
    transition-all duration-300" />
</nav>`}
                    </pre>
                  </div>
                </div>
              )}

              {/* HERO / FULL SECTION TAB */}
              {activeTab === "hero" && (
                <div className="space-y-8">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
                    Full-screen section with group-hover parallax layers. Hover to activate.
                  </p>
                  <div className="relative h-64 rounded-xl overflow-hidden group cursor-default bg-gradient-to-br from-black via-indigo-950 to-black">
                    {/* Breathing glow */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-110"
                      style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.35), transparent)" }}
                    />
                    <div className="relative z-10 flex items-center justify-center h-full text-center px-8">
                      <div>
                        <span
                          className="inline-block text-xs uppercase tracking-[0.25em] text-indigo-400 opacity-60 mb-2 transition-transform duration-700 ease-out group-hover:-translate-y-3"
                          style={{ transitionDelay: "0ms" }}
                        >
                          Chapter 01
                        </span>
                        <h3
                          className="text-2xl md:text-4xl font-black text-white mb-3 transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                          style={{ transitionDelay: "75ms" }}
                        >
                          Hover this section
                        </h3>
                        <p
                          className="text-white/50 text-sm transition-transform duration-700 ease-out group-hover:-translate-y-1"
                          style={{ transitionDelay: "150ms" }}
                        >
                          Three parallax layers animate at different speeds
                        </p>
                      </div>
                    </div>
                  </div>
                  <pre className="text-xs text-white/50 font-mono bg-black/50 rounded-xl p-5 overflow-x-auto leading-relaxed border border-white/10">
{`<section className="relative min-h-screen snap-start group overflow-hidden
  bg-gradient-to-br from-black via-indigo-950 to-black">
  {/* Breathing background */}
  <div className="absolute inset-0
    bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.35),transparent)]
    group-hover:scale-110 transition-transform duration-1000 ease-out" />
  <div className="relative z-10 flex items-center justify-center min-h-screen text-center">
    <span className="group-hover:-translate-y-3 transition-transform duration-700 delay-0">Ch 01</span>
    <h2 className="group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 delay-75">Title</h2>
    <p className="group-hover:-translate-y-1 transition-transform duration-700 delay-150">Body</p>
  </div>
</section>`}
                  </pre>
                </div>
              )}

              {/* BUTTON TAB */}
              {activeTab === "button" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-6">
                      Scroll indicator — absolute bottom-8, bouncing animation
                    </p>
                    <div className="flex flex-wrap gap-16 items-end justify-center py-8">
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-xs text-white/30">Text + arrow</p>
                        <button
                          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
                          style={{ animation: "fps-bounce 2s ease-in-out infinite" }}
                        >
                          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
                          <ArrowDownIcon className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <p className="text-xs text-white/30">Circle button</p>
                        <button
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300 hover:scale-110"
                          style={{ animation: "fps-bounce 2s ease-in-out infinite 0.5s" }}
                        >
                          <ChevronDownIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <p className="text-xs text-white/30">Pill labeled</p>
                        <button
                          className="flex flex-col items-center gap-1 px-6 py-3 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
                          style={{ animation: "fps-bounce 2s ease-in-out infinite 1s" }}
                        >
                          <span className="text-[9px] uppercase tracking-[0.3em]">Explore</span>
                          <ArrowDownIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-6">Section CTA buttons</p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-indigo-100 hover:scale-105 active:scale-95 transition-all duration-300">
                        Get Started
                      </button>
                      <button className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300">
                        Learn More
                      </button>
                      <button className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300">
                        See Demo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD TAB */}
              {activeTab === "card" && (
                <div className="space-y-8">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
                    Full-screen content cards with breathing background and staggered parallax
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sectionColors.slice(0, 2).map((sc, idx) => (
                      <div
                        key={idx}
                        className={`relative h-56 rounded-xl overflow-hidden group cursor-default bg-gradient-to-br ${sc.bg}`}
                      >
                        <div
                          className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-110"
                          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${sc.glow}, transparent)` }}
                        />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                          <span
                            className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-2 transition-transform duration-700 ease-out group-hover:-translate-y-3"
                            style={{ color: sc.accent, transitionDelay: "0ms" }}
                          >
                            {sc.label}
                          </span>
                          <h4
                            className="text-2xl font-black text-white mb-2 transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                            style={{ transitionDelay: "75ms" }}
                          >
                            {["Immersive Story", "Bold Vision"][idx]}
                          </h4>
                          <p
                            className="text-white/50 text-xs max-w-xs transition-transform duration-700 ease-out group-hover:-translate-y-1"
                            style={{ transitionDelay: "150ms" }}
                          >
                            Hover to see the parallax effect
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. AI RULES — 4 INTERACTIVE DEMOS                                 */}
      {/* ================================================================ */}
      <section id="ai-rules" className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 block mb-3">
              AI Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              4 mandatory rules — <span className="text-amber-400">live demos</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              Every rule from the aiRules spec is implemented below as an interactive, clickable demo.
              These are the mandatory patterns any AI generating full-page-scroll code must follow.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---- RULE 1: STAGGERED PARALLAX ---- */}
            <RevealBlock delay={0.08}>
              <div className="border border-white/10 rounded-2xl overflow-hidden h-full bg-white/[0.02]">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
                      <LayersIcon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-semibold">
                      Rule 1
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">Staggered Parallax</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Content layers use DIFFERENT transition delays — delay-0 for eyebrow, delay-75 for heading, delay-150 for body. Creates Z-plane depth illusion.
                  </p>
                </div>

                {/* Interactive: hover the box */}
                <div
                  className="relative h-52 bg-gradient-to-br from-black via-indigo-950 to-black overflow-hidden cursor-pointer"
                  onMouseEnter={() => setParallaxHovered(true)}
                  onMouseLeave={() => setParallaxHovered(false)}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.3), transparent)",
                      transform: parallaxHovered ? "scale(1.1)" : "scale(1)",
                      transition: "transform 1s ease-out",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-1">
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 opacity-60"
                      style={{
                        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0ms",
                        transform: parallaxHovered ? "translateY(-12px)" : "translateY(0)",
                      }}
                    >
                      Layer 1 — delay 0ms (fastest)
                    </span>
                    <h4
                      className="text-xl font-black text-white"
                      style={{
                        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 75ms, scale 0.7s cubic-bezier(0.16,1,0.3,1) 75ms",
                        transform: parallaxHovered ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
                      }}
                    >
                      Layer 2 — delay 75ms
                    </h4>
                    <p
                      className="text-white/50 text-xs"
                      style={{
                        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 150ms",
                        transform: parallaxHovered ? "translateY(-4px)" : "translateY(0)",
                      }}
                    >
                      Layer 3 — delay 150ms (slowest)
                    </p>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">
                      {parallaxHovered ? "Parallax active — notice staggered timing" : "Hover to trigger parallax"}
                    </span>
                  </div>
                </div>

                <div className="p-5 border-t border-white/10">
                  <pre className="text-[10px] font-mono text-white/35 leading-relaxed overflow-x-auto">
{`/* eyebrow */ group-hover:-translate-y-3  delay-0
/* heading */ group-hover:scale-105 -translate-y-2  delay-75
/* body */    group-hover:-translate-y-1  delay-150`}
                  </pre>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 2: BREATHING BACKGROUND ---- */}
            <RevealBlock delay={0.12}>
              <div className="border border-white/10 rounded-2xl overflow-hidden h-full bg-white/[0.02]">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-600/30 border border-pink-500/30 flex items-center justify-center">
                      <WindIcon className="w-4 h-4 text-pink-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-400 text-xs font-semibold">
                      Rule 2
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">Breathing Background</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    An absolute radial-gradient div scales from 1 to 1.1 on group-hover (duration-1000 ease-out). Creates a "room breathing" or "portal opening" sensation without being jarring.
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => setBreathingActive(!breathingActive)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                        breathingActive
                          ? "bg-pink-600 text-white"
                          : "border border-white/20 text-white/60 hover:text-white"
                      }`}
                    >
                      {breathingActive ? "Stop breathing" : "Start breathing"}
                    </button>
                    <span className="text-xs text-white/30">Auto-cycles 4 accent glows</span>
                  </div>

                  <div className="relative h-36 bg-black rounded-xl overflow-hidden">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${sectionColors[breathingIndex].glow}, transparent)`,
                        transform: breathingActive ? "scale(1.1)" : "scale(1)",
                        transition: "transform 1s ease-out, background 0.8s ease",
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <span className="text-white/60 text-sm font-medium">
                        {breathingActive
                          ? `Glow: ${sectionColors[breathingIndex].accent}`
                          : "Press the button above"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {sectionColors.map((sc, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              breathingIndex === i && breathingActive
                                ? sc.accent
                                : "rgba(255,255,255,0.2)",
                            transform:
                              breathingIndex === i && breathingActive ? "scale(1.4)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 border-t border-white/10 pt-4">
                  <pre className="text-[10px] font-mono text-white/35 leading-relaxed overflow-x-auto">
{`<div className="
  absolute inset-0
  bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.3),transparent)]
  group-hover:scale-110
  transition-transform duration-1000 ease-out
  pointer-events-none
" />`}
                  </pre>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 3: CAPSULE NAV DOTS ---- */}
            <RevealBlock delay={0.16}>
              <div className="border border-white/10 rounded-2xl overflow-hidden h-full bg-white/[0.02]">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-600/30 border border-teal-500/30 flex items-center justify-center">
                      <NavigationIcon className="w-4 h-4 text-teal-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 text-xs font-semibold">
                      Rule 3
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">Capsule Nav Dots</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Side navigation dots morph from circles (h-3) to capsules (h-6) on hover, and tall capsules (h-10) for the active section. Indicates hierarchy without labels.
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex gap-10 items-center justify-center py-2">
                    {/* Static state showcase */}
                    <div className="flex flex-col gap-5 items-center">
                      <div className="text-[9px] text-white/30 uppercase tracking-[0.2em]">States</div>
                      <div className="flex flex-col gap-4 items-center">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-white/25" style={{ width: "12px", height: "12px" }} />
                          <span className="text-[10px] text-white/40 font-mono">h-3 — default</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-white/80" style={{ width: "12px", height: "24px" }} />
                          <span className="text-[10px] text-white/40 font-mono">h-6 — hover</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-indigo-500" style={{ width: "12px", height: "40px" }} />
                          <span className="text-[10px] text-indigo-400 font-mono">h-10 — active</span>
                        </div>
                      </div>
                    </div>

                    {/* Live clickable nav */}
                    <div className="flex flex-col gap-3 items-center">
                      <div className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Interactive</div>
                      {[0, 1, 2, 3].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => setCapsuleActiveIndex(idx)}
                          onMouseEnter={() => setCapsuleHoveredIndex(idx + 20)}
                          onMouseLeave={() => setCapsuleHoveredIndex(null)}
                          className="rounded-full transition-all duration-300"
                          aria-label={`Set active section ${idx + 1}`}
                          style={{
                            width: "12px",
                            height:
                              capsuleActiveIndex === idx
                                ? "40px"
                                : capsuleHoveredIndex === idx + 20
                                ? "24px"
                                : "12px",
                            backgroundColor:
                              capsuleActiveIndex === idx
                                ? "#6366f1"
                                : capsuleHoveredIndex === idx + 20
                                ? "rgba(255,255,255,0.8)"
                                : "rgba(255,255,255,0.25)",
                          }}
                        />
                      ))}
                    </div>

                    {/* Active indicator readout */}
                    <div className="text-center">
                      <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-2">Active</div>
                      <div
                        className="text-3xl font-black"
                        style={{ color: sectionColors[capsuleActiveIndex]?.accent ?? "#6366f1" }}
                      >
                        {capsuleActiveIndex + 1}
                      </div>
                      <div className="text-[10px] text-white/30 mt-1">of 4</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 border-t border-white/10 pt-4">
                  <pre className="text-[10px] font-mono text-white/35 leading-relaxed overflow-x-auto">
{`/* Active */  w-3 h-10 rounded-full bg-accent
/* Hover */   w-3 h-6 rounded-full bg-white/80
/* Default */ w-3 h-3 rounded-full bg-white/30
             transition-all duration-300`}
                  </pre>
                </div>
              </div>
            </RevealBlock>

            {/* ---- RULE 4: HEADING SCALE ---- */}
            <RevealBlock delay={0.2}>
              <div className="border border-white/10 rounded-2xl overflow-hidden h-full bg-white/[0.02]">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-600/30 border border-amber-500/30 flex items-center justify-center">
                      <ZapIcon className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-semibold">
                      Rule 4
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">Heading Scale</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    The main heading uses group-hover:scale-105 in addition to translateY. Creates a subtle zoom-in that reinforces the "content approaching" cinematic parallax.
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex gap-2 flex-wrap mb-3">
                    <button
                      onClick={() => setHeadingLayer("off")}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        headingLayer === "off" ? "bg-white/20 text-white" : "text-white/40 hover:text-white"
                      }`}
                    >
                      Resting
                    </button>
                    <button
                      onClick={() => setHeadingLayer("hover")}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        headingLayer === "hover" ? "bg-amber-600 text-white" : "text-white/40 hover:text-white"
                      }`}
                    >
                      Hover state
                    </button>
                  </div>

                  {/* Scale demo */}
                  <div
                    className="relative h-40 bg-gradient-to-br from-black via-amber-950 to-black rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => {
                      setHeadingHovered(true);
                      setHeadingLayer("hover");
                    }}
                    onMouseLeave={() => {
                      setHeadingHovered(false);
                      setHeadingLayer("off");
                    }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.3), transparent)",
                        transform: headingHovered || headingLayer === "hover" ? "scale(1.1)" : "scale(1)",
                        transition: "transform 1s ease-out",
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-1">
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] text-amber-400 opacity-60"
                        style={{
                          transform:
                            headingHovered || headingLayer === "hover"
                              ? "translateY(-12px)"
                              : "translateY(0)",
                          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0ms",
                        }}
                      >
                        Chapter 04
                      </span>
                      <h4
                        className="text-2xl font-black text-white"
                        style={{
                          transform:
                            headingHovered || headingLayer === "hover"
                              ? "translateY(-8px) scale(1.05)"
                              : "translateY(0) scale(1)",
                          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 75ms",
                          transformOrigin: "center",
                        }}
                      >
                        scale(1.05) + translateY
                      </h4>
                      <p
                        className="text-white/50 text-xs"
                        style={{
                          transform:
                            headingHovered || headingLayer === "hover"
                              ? "translateY(-4px)"
                              : "translateY(0)",
                          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 150ms",
                        }}
                      >
                        The heading zooms toward the viewer
                      </p>
                    </div>
                  </div>

                  {/* Scale progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-700"
                        style={{
                          width:
                            headingHovered || headingLayer === "hover" ? "100%" : "80%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-amber-400">
                      {headingHovered || headingLayer === "hover" ? "scale(1.05)" : "scale(1.0)"}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-6 border-t border-white/10 pt-4">
                  <pre className="text-[10px] font-mono text-white/35 leading-relaxed overflow-x-auto">
{`<h2 className="
  group-hover:scale-105
  group-hover:-translate-y-2
  transition-all duration-700 ease-out
  delay-75
">
  Section Heading
</h2>`}
                  </pre>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                               */}
      {/* ================================================================ */}
      <section id="philosophy" className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 block mb-3">
              Design Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Rules of <span className="text-indigo-400">the scroll</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              Full-page scroll is a controlled medium. Each rule protects the cinematic, immersive nature of the experience. Breaking them breaks the spell.
            </p>
          </RevealBlock>

          {/* Philosophy principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: <LayersIcon className="w-7 h-7" />,
                title: "One Scene at a Time",
                tagline: "Radical focus",
                desc: "Each section is a complete world. One message, one visual, one call to action. The full viewport is your canvas — waste none of it. Content must never require internal scrolling.",
                accent: "#6366f1",
                border: "border-indigo-500/20",
                bgHex: "rgba(99,102,241,0.05)",
              },
              {
                icon: <WindIcon className="w-7 h-7" />,
                title: "Cinematic Rhythm",
                tagline: "Scroll is the narrative",
                desc: "Scrolling is not navigation — it is page-turning. scroll-snap-type: y mandatory enforces this contract. Every scroll = one complete scene transition. No partial reveals.",
                accent: "#ec4899",
                border: "border-pink-500/20",
                bgHex: "rgba(236,72,153,0.05)",
              },
              {
                icon: <NavigationIcon className="w-7 h-7" />,
                title: "Guide the Journey",
                tagline: "Never leave users lost",
                desc: "Side navigation dots, scroll indicators, and section numbers give users the map. Without these, the viewport becomes a trap, not an experience. Always show where you are.",
                accent: "#14b8a6",
                border: "border-teal-500/20",
                bgHex: "rgba(20,184,166,0.05)",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.08}>
                <div
                  className={`group border ${principle.border} rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-2 cursor-default`}
                  style={{ backgroundColor: principle.bgHex }}
                >
                  <div
                    className="w-14 h-14 rounded-xl border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{
                      borderColor: principle.accent + "33",
                      backgroundColor: principle.accent + "15",
                      color: principle.accent,
                    }}
                  >
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{principle.title}</h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: principle.accent }}>
                    {principle.tagline}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{principle.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div
                className="border border-teal-500/20 rounded-2xl p-8 h-full"
                style={{ backgroundColor: "rgba(20,184,166,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-black text-teal-400">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Set min-h-screen on every section",
                    "Use scroll-snap-type: y mandatory on the container",
                    "Center content with flex items-center justify-center",
                    "Add group class to every section for hover parallax",
                    "Stagger content delays: delay-0, delay-75, delay-150",
                    "Include a breathing background div (group-hover:scale-110)",
                    "Add capsule nav dots fixed to the right side",
                    "Include a bouncing scroll indicator on the first section",
                    "Use distinct gradient backgrounds per section",
                    "Provide skip or quick navigation options",
                    "Use scroll-behavior: smooth on the container",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div
                className="border border-pink-500/20 rounded-2xl p-8 h-full"
                style={{ backgroundColor: "rgba(236,72,153,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-black text-pink-400">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Let content overflow beyond viewport height",
                    "Omit scroll indicators — users may not know to scroll",
                    "Use heavy animations that hurt performance",
                    "Lock scroll for too long between sections",
                    "Ignore mobile experience and viewport sizing",
                    "Use the same transition delay for all content elements",
                    "Skip the group class on sections (parallax breaks)",
                    "Omit the breathing background div per section",
                    "Use identical circles for all nav dots (no active state)",
                    "Place CTA text outside the visible viewport area",
                    "Mix scroll-snap with internal free-scroll content",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-pink-500 shrink-0" />
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
      {/* 8. CONTACT FORM SECTION — Full-screen section demo                */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 block mb-3">
              Contact Section
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Underline input <span className="text-teal-400">style</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              Full-page scroll contact sections use transparent underline-only inputs. They stay visually light against
              dark backgrounds, letting the gradient breathe. Bold white submit button for maximum contrast.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealBlock delay={0.1}>
              {/* Mini full-screen section with contact form */}
              <div className="relative h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-black via-teal-950 to-black flex items-center justify-center group">
                <div
                  className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,184,166,0.25), transparent)" }}
                />
                <div className="relative z-10 w-full max-w-sm px-8 text-center">
                  <span
                    className="block text-[10px] uppercase tracking-[0.3em] text-teal-400 opacity-60 mb-3 transition-transform duration-700 ease-out group-hover:-translate-y-3"
                    style={{ transitionDelay: "0ms" }}
                  >
                    Chapter 05
                  </span>
                  <h3
                    className="text-3xl font-black text-white mb-8 transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                    style={{ transitionDelay: "75ms" }}
                  >
                    Get in Touch
                  </h3>
                  <form
                    className="space-y-6 text-left transition-transform duration-700 ease-out group-hover:-translate-y-1"
                    style={{ transitionDelay: "150ms" }}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-0 py-3 bg-transparent border-b border-white/25 text-white text-sm placeholder-white/40 focus:outline-none focus:border-teal-400 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-0 py-3 bg-transparent border-b border-white/25 text-white text-sm placeholder-white/40 focus:outline-none focus:border-teal-400 transition-colors duration-200"
                      />
                    </div>
                    <button className="w-full py-4 mt-2 bg-white text-black font-black text-sm tracking-wide hover:bg-teal-50 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div className="space-y-6">
                <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">Input pattern</p>
                  <pre className="text-[10px] font-mono text-white/50 leading-relaxed overflow-x-auto">
{`<input className="
  w-full px-0 py-4
  bg-transparent
  border-b border-white/30
  text-white text-lg
  placeholder-white/50
  focus:outline-none
  focus:border-white
  transition-colors
" />`}
                  </pre>
                </div>

                <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">Submit button</p>
                  <pre className="text-[10px] font-mono text-white/50 leading-relaxed overflow-x-auto">
{`<button className="
  w-full py-4 mt-8
  bg-white text-black
  font-semibold
  hover:bg-white/90
  transition-colors
">
  Send Message
</button>`}
                  </pre>
                </div>

                <div
                  className="border border-teal-500/20 rounded-xl p-5"
                  style={{ backgroundColor: "rgba(20,184,166,0.05)" }}
                >
                  <p className="text-xs text-teal-400 font-semibold mb-2">Why underline inputs?</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Bordered box inputs compete with the dark gradient backgrounds and feel cluttered. Underline-only inputs let the background breathe while keeping the form scannable and purposeful.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. COMPLETE LAYOUT SPEC                                           */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 block mb-3">
              Container Spec
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Full layout <span className="text-amber-400">template</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Container",
                code: `<main className={\`
  h-screen
  overflow-y-auto
  snap-y snap-mandatory
  scroll-smooth
\`}>`,
                accent: "#6366f1",
                desc: "The outermost wrapper. Exactly 100vh, overflow scroll, snap mandatory. Everything happens inside here.",
              },
              {
                title: "Each Section",
                code: `<section className={\`
  relative min-h-screen
  snap-start group
  overflow-hidden
  flex items-center
  justify-center
\`}>`,
                accent: "#ec4899",
                desc: "Every section: full viewport, snap-start, group for parallax, overflow-hidden for breathing glow to stay contained.",
              },
              {
                title: "Side Nav Dots",
                code: `<nav className={\`
  fixed right-8 top-1/2
  -translate-y-1/2 z-50
  flex flex-col gap-3
\`}>
  {/* Active: h-10 capsule */}
  {/* Hover: h-6 capsule */}
  {/* Default: h-3 circle */}
</nav>`,
                accent: "#14b8a6",
                desc: "Fixed to viewport right edge. Morphs between circle and capsule shapes to communicate current position.",
              },
            ].map((spec, i) => (
              <RevealBlock key={spec.title} delay={i * 0.08}>
                <div className="border border-white/10 rounded-2xl p-6 h-full bg-white/[0.02] hover:border-white/25 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                  <div
                    className="w-2 h-8 rounded-full mb-4 transition-all duration-300 group-hover:h-12"
                    style={{ backgroundColor: spec.accent }}
                  />
                  <h4 className="text-sm font-black text-white mb-3">{spec.title}</h4>
                  <pre className="text-[10px] font-mono text-white/40 mb-4 leading-relaxed overflow-x-auto bg-black/40 rounded-lg p-3 border border-white/5">
                    {spec.code}
                  </pre>
                  <p className="text-xs text-white/40 leading-relaxed">{spec.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Full code snippet */}
          <RevealBlock delay={0.2} className="mt-8">
            <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-6">
                Complete container template
              </p>
              <pre className="text-[10px] font-mono text-white/50 leading-relaxed overflow-x-auto">
{`<main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">

  {/* Section 1 — Hero */}
  <section className="relative min-h-screen snap-start group overflow-hidden
    flex items-center justify-center
    bg-gradient-to-br from-black via-indigo-950 to-black">

    {/* Breathing background (Rule 2) */}
    <div className="absolute inset-0
      bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.3),transparent)]
      group-hover:scale-110 transition-transform duration-1000 ease-out pointer-events-none" />

    {/* Staggered content (Rule 1 + 4) */}
    <div className="relative z-10 text-center">
      {/* delay-0 — fastest */}
      <span className="... group-hover:-translate-y-3 transition-transform duration-700 delay-0">01</span>
      {/* delay-75 — heading scales */}
      <h2 className="... group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 delay-75">Title</h2>
      {/* delay-150 — slowest */}
      <p className="... group-hover:-translate-y-1 transition-transform duration-700 delay-150">Subtitle</p>
    </div>

    {/* Scroll indicator */}
    <button className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce ...">
      <ArrowDownIcon className="w-6 h-6" />
    </button>
  </section>

  {/* Repeat sections 2, 3, 4... */}

  {/* Fixed capsule nav dots (Rule 3) */}
  <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    {/* Active */}
    <a className="w-3 h-10 rounded-full bg-indigo-500 transition-all duration-300" />
    {/* Inactive */}
    <a className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/80 hover:h-6 transition-all duration-300" />
  </nav>

</main>`}
              </pre>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 10. FOOTER                                                         */}
      {/* ================================================================ */}
      <footer className="relative border-t border-white/10 overflow-hidden">
        {/* Gradient accent line at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48"
          style={{
            background: "linear-gradient(90deg, transparent, #6366f1, #ec4899, #14b8a6, transparent)",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(99,102,241,0.08), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                  <ZapIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight">
                  Full<span className="text-indigo-400">Page</span>Scroll
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                Cinematic, immersive full-viewport scrolling. Each section is a complete scene.
                scroll-snap forces narrative rhythm. group-hover parallax adds depth.
              </p>
              {/* Accent color pills */}
              <div className="flex gap-2">
                {[
                  { hex: "#000000", bordered: true },
                  { hex: "#ffffff", bordered: true },
                  { hex: "#6366f1", bordered: false },
                  { hex: "#ec4899", bordered: false },
                  { hex: "#14b8a6", bordered: false },
                  { hex: "#f59e0b", bordered: false },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full hover:scale-125 transition-transform duration-200 cursor-pointer"
                    style={{
                      backgroundColor: s.hex,
                      border: s.bordered ? "1.5px solid rgba(255,255,255,0.25)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/25">Style</span>
                <Link
                  href="/styles/full-page-scroll"
                  className="text-white/50 hover:text-white transition-colors duration-200"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/full-page-scroll/showcase"
                  className="text-white/50 hover:text-white transition-colors duration-200"
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/full-page-scroll/cover"
                  className="text-white/50 hover:text-white transition-colors duration-200"
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/25">StyleKit</span>
                <Link href="/" className="text-white/50 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-white/50 hover:text-white transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/25">Accents</span>
                {[
                  { name: "Indigo", hex: "#6366f1" },
                  { name: "Crimson Pink", hex: "#ec4899" },
                  { name: "Teal", hex: "#14b8a6" },
                  { name: "Amber", hex: "#f59e0b" },
                ].map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-white/40 text-xs">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: s.hex }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/30">
              <span>Built for</span>
              <span className="text-white/60 font-semibold">StyleKit</span>
              <span>&#8212; full-page-scroll layout style</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/60 text-sm font-medium hover:border-white/40 hover:text-white hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300"
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
