"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────

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

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
}

// ─────────────────────────────────────────────────────────────
// RevealBlock
// ─────────────────────────────────────────────────────────────

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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const ACCENTS = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#6c5ce7"] as const;

const ACCENT_NAMES = ["Coral Red", "Turquoise", "Canary", "Deep Violet"] as const;

const features = [
  {
    id: "01",
    headline: "Full-Viewport Impact",
    body: "Every section occupies the full screen. No compromise, no crowding. The viewport is your canvas — fill it completely and let silence do the heavy lifting.",
    image: "https://picsum.photos/seed/hf_feat1/1200/900",
    accent: ACCENTS[0],
  },
  {
    id: "02",
    headline: "Overlay Depth & Atmosphere",
    body: "Dark gradients from-black/60 via-black/30 to-transparent sit over imagery to protect legibility while keeping the visual alive underneath the text.",
    image: "https://picsum.photos/seed/hf_feat2/1200/900",
    accent: ACCENTS[1],
  },
  {
    id: "03",
    headline: "Gravity-Lifted Interactions",
    body: "Elements rise on hover with a strong drop shadow, reinforcing the sensation of depth. Motion is fast — 200 ms ease-out — purposeful, never decorative.",
    image: "https://picsum.photos/seed/hf_feat3/1200/900",
    accent: ACCENTS[2],
  },
];

const interactionRules = [
  {
    rule: "Gravity Focus",
    code: "hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out",
    note: "Elements lift on hover with a strong shadow — conveys physical weight.",
  },
  {
    rule: "Floating Glass Cards",
    code: "hover:-translate-y-2 transition-transform duration-300 ease-out",
    note: "Cards float upward smoothly, keeping the eye engaged.",
  },
  {
    rule: "Scroll Snap",
    code: "scroll-snap-type: y mandatory / scroll-snap-align: start",
    note: "Parent locks scroll to section boundaries for cinematic pacing.",
  },
  {
    rule: "Focus Ring",
    code: "focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black",
    note: "Accessible keyboard ring visible on all interactive elements.",
  },
  {
    rule: "Icon Micro-Scale",
    code: "group-hover:scale-110 transition-transform duration-200",
    note: "Icons pulse slightly on parent hover for visual confirmation.",
  },
  {
    rule: "Button Press",
    code: "active:scale-[0.98] active:translate-y-0",
    note: "All buttons compress on click — satisfying tactile feedback.",
  },
];

type TabKey = "buttons" | "cards" | "inputs";

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("buttons");
  const scrollY = useScrollY();
  const navScrolled = scrollY > 50;

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">
      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .bounce-arrow {
          animation: bounce-arrow 1.6s ease-in-out infinite;
        }
        @keyframes hf-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hf-marquee-track {
          animation: hf-marquee 28s linear infinite;
        }
      `}</style>

      {/* ─── FIXED NAV ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: navScrolled ? "rgba(0,0,0,0.80)" : "transparent",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/styles/hero-fullscreen/showcase"
            className="text-white font-bold tracking-[0.2em] uppercase text-sm focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none rounded"
          >
            HERO<span style={{ color: ACCENTS[0] }}>.</span>FS
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8">
            {(["Work", "Features", "Palette", "Rules"] as const).map((label) => (
              <span
                key={label}
                className="text-white/60 hover:text-white text-xs tracking-[0.15em] uppercase cursor-pointer transition-colors duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out"
              >
                {label}
              </span>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/styles"
            className="text-xs tracking-[0.15em] uppercase px-4 py-2 rounded border border-white/30 text-white/70 hover:text-white hover:border-white hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            All Styles
          </Link>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/hf_hero_bg/1920/1080"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              transform: heroRevealed ? "scale(1.04)" : "scale(1.15)",
              transition: "transform 2.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <span
              className="block w-8 h-px"
              style={{ backgroundColor: ACCENTS[1] }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: ACCENTS[1] }}
            >
              Hero Fullscreen Showcase
            </span>
            <span
              className="block w-8 h-px"
              style={{ backgroundColor: ACCENTS[1] }}
            />
          </div>

          {/* Headline */}
          <h1 className="leading-none tracking-tight mb-6">
            <span
              className="block text-6xl md:text-8xl font-bold text-white"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              Command
            </span>
            <span
              className="block text-6xl md:text-8xl font-bold"
              style={{
                color: ACCENTS[0],
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              Every Viewport.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            Full-viewport sections that dominate the fold. Typography oversized, overlays deep, attention total.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s",
            }}
          >
            {/* Primary */}
            <button
              type="button"
              className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              style={{ backgroundColor: ACCENTS[0] }}
            >
              Get Started
            </button>

            {/* Secondary */}
            <button
              type="button"
              className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm border-2 border-white bg-transparent hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 bounce-arrow"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 0.8s ease 1s",
          }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── FEATURES: Alternating full-height panels ─── */}
      {features.map((feat, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={feat.id}
            className="relative min-h-screen flex items-center overflow-hidden"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={feat.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
            <div
              className="absolute inset-0"
              style={{
                background: isEven
                  ? "linear-gradient(to right, rgba(0,0,0,0.85) 45%, transparent 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,0.85) 45%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div
              className={`relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full flex ${
                isEven ? "justify-start" : "justify-end"
              }`}
            >
              <RevealBlock
                className="max-w-xl"
                delay={0.1}
              >
                <div
                  className="text-xs tracking-[0.3em] uppercase font-semibold mb-6"
                  style={{ color: feat.accent }}
                >
                  {feat.id}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  {feat.headline}
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-10">
                  {feat.body}
                </p>
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  style={{ color: feat.accent }}
                >
                  Explore
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </RevealBlock>
            </div>

            {/* Feature number */}
            <div
              className="absolute bottom-10 right-10 text-8xl font-bold leading-none select-none pointer-events-none"
              style={{ color: feat.accent, opacity: 0.08 }}
            >
              {feat.id}
            </div>
          </section>
        );
      })}

      {/* ─── COLOR PALETTE ─── */}
      <section className="min-h-screen flex flex-col justify-center bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <RevealBlock className="mb-16 text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
              style={{ color: ACCENTS[3] }}
            >
              Design System
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Accent Palette
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Four bold accents built for contrast on dark surfaces. Each carries its own emotional register.
            </p>
          </RevealBlock>

          {/* Full-width color strips */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-col gap-0 overflow-hidden rounded-sm">
              {ACCENTS.map((color, i) => (
                <div
                  key={color}
                  className="group flex items-center justify-between px-8 py-10 cursor-default hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold text-black/80">
                      {ACCENT_NAMES[i]}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-black/60 uppercase tracking-widest">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Palette swatches */}
          <RevealBlock delay={0.2} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACCENTS.map((color, i) => (
              <div key={color} className="group flex flex-col gap-3">
                <div
                  className="h-24 rounded-sm hover:-translate-y-2 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-white font-semibold text-sm">{ACCENT_NAMES[i]}</p>
                  <p className="text-white/40 font-mono text-xs">{color}</p>
                </div>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ─── INTERACTION RULES ─── */}
      <section
        className="min-h-screen flex flex-col justify-center py-24 px-6"
        style={{
          background: "linear-gradient(135deg, #0f0f1a 0%, #0a0a0a 50%, #0a0f0f 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <RevealBlock className="mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
              style={{ color: ACCENTS[1] }}
            >
              Interaction Physics
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Motion Rules
            </h2>
            <p className="text-white/50 max-w-2xl text-lg">
              Every interaction is governed by a set of deliberate physics. No arbitrary motion — each rule serves clarity and feel.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {interactionRules.map((item, i) => (
              <RevealBlock
                key={item.rule}
                className="group bg-[#0a0a0a] p-8 hover:-translate-y-2 transition-transform duration-300 ease-out focus-within:ring-2 focus-within:ring-white/80"
                delay={i * 0.08}
              >
                <div
                  className="text-xs tracking-[0.25em] uppercase font-bold mb-4"
                  style={{ color: ACCENTS[i % ACCENTS.length] }}
                >
                  {item.rule}
                </div>
                <pre
                  className="text-xs font-mono text-white/40 mb-4 whitespace-pre-wrap leading-relaxed"
                >
                  {item.code}
                </pre>
                <p className="text-white/60 text-sm leading-relaxed">{item.note}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPONENT VARIANTS (Tab Switcher) ─── */}
      <section className="min-h-screen flex flex-col justify-center bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <RevealBlock className="mb-12 text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
              style={{ color: ACCENTS[0] }}
            >
              Components
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Variant Explorer
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Buttons, cards, and inputs — each variant demonstrates the interaction physics in action.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1} className="flex justify-center gap-1 mb-12">
            {(["buttons", "cards", "inputs"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{
                  backgroundColor: activeTab === tab ? ACCENTS[3] : "transparent",
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                  border: `1px solid ${activeTab === tab ? ACCENTS[3] : "rgba(255,255,255,0.15)"}`,
                }}
              >
                {tab}
              </button>
            ))}
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "buttons" && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Primary */}
              <button
                type="button"
                className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{ backgroundColor: ACCENTS[0] }}
              >
                Primary
              </button>

              {/* Secondary */}
              <button
                type="button"
                className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm border-2 border-white bg-transparent hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              >
                Secondary
              </button>

              {/* Ghost */}
              <button
                type="button"
                className="px-10 py-4 font-bold text-base tracking-wide text-white/70 rounded-sm bg-transparent hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              >
                Ghost
              </button>

              {/* Accent 2 */}
              <button
                type="button"
                className="group px-10 py-4 font-bold text-base tracking-wide text-black rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none inline-flex items-center gap-2"
                style={{ backgroundColor: ACCENTS[1] }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                With Icon
              </button>
            </div>
          )}

          {/* Tab: Cards */}
          {activeTab === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(
                [
                  {
                    label: "Layers",
                    desc: "Stack visual depth with gradient overlays and z-indexed elements.",
                    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                  },
                  {
                    label: "Timing",
                    desc: "Every transition runs at exactly 200–300 ms for sharp feedback.",
                    iconPath: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4l3 3",
                  },
                  {
                    label: "Structure",
                    desc: "Rigid grid with scroll-snap keeps the experience cinematic.",
                    iconPath: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
                  },
                ] as { label: string; desc: string; iconPath: string }[]
              ).map((card, i) => (
                <div
                  key={card.label}
                  className="group bg-white/5 rounded-sm p-8 cursor-default hover:-translate-y-2 transition-transform duration-300 ease-out focus-within:ring-2 focus-within:ring-white/80"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-sm mb-6 flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENTS[i]}22` }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={ACCENTS[i]}
                      strokeWidth="2"
                      className="group-hover:scale-110 transition-transform duration-200"
                      aria-hidden="true"
                    >
                      <path d={card.iconPath} />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{card.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Inputs */}
          {activeTab === "inputs" && (
            <div className="max-w-lg mx-auto space-y-6">
              {/* Text */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hf-name" className="text-xs tracking-[0.2em] uppercase text-white/50">
                  Full Name
                </label>
                <input
                  id="hf-name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-white placeholder:text-white/30 text-sm transition-colors duration-200 hover:border-white/40 focus:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hf-email" className="text-xs tracking-[0.2em] uppercase text-white/50">
                  Email Address
                </label>
                <input
                  id="hf-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-white placeholder:text-white/30 text-sm transition-colors duration-200 hover:border-white/40 focus:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black"
                />
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hf-message" className="text-xs tracking-[0.2em] uppercase text-white/50">
                  Message
                </label>
                <textarea
                  id="hf-message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3 text-white placeholder:text-white/30 text-sm resize-none transition-colors duration-200 hover:border-white/40 focus:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black"
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                className="w-full py-4 font-bold text-sm tracking-widest uppercase text-white rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{ backgroundColor: ACCENTS[3] }}
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div
        className="overflow-hidden py-6 border-y border-white/10"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <div className="flex hf-marquee-track w-[200%]">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className="flex-1 flex items-center justify-around gap-12 px-12"
            >
              {["Full Viewport", "Scroll Snap", "Gravity Hover", "Overlay Depth", "Premium Motion", "Dark Canvas"].map(
                (label) => (
                  <span
                    key={label}
                    className="text-xs tracking-[0.35em] uppercase text-white/30 whitespace-nowrap"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Brand */}
            <div>
              <p className="text-white font-bold tracking-[0.2em] uppercase text-sm mb-2">
                HERO<span style={{ color: ACCENTS[0] }}>.</span>FS
              </p>
              <p className="text-white/30 text-xs tracking-widest">
                StyleKit &mdash; Hero Fullscreen Showcase
              </p>
            </div>

            {/* Accent dots */}
            <div className="flex items-center gap-3">
              {ACCENTS.map((color) => (
                <div
                  key={color}
                  className="w-3 h-3 rounded-full hover:-translate-y-2 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/styles/hero-fullscreen"
                className="text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none rounded"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none rounded"
              >
                All Styles &rarr;
              </Link>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
