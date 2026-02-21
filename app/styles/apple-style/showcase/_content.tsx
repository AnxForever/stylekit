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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Apple color tokens                                                 */
/* ------------------------------------------------------------------ */

const APPLE_BLACK = "#000000";
const APPLE_WHITE = "#ffffff";
const APPLE_GRAY = "#f5f5f7";
const APPLE_BLUE = "#0071e3";
const APPLE_BLUE_HOVER = "#0077ed";
const APPLE_GREEN = "#34c759";
const APPLE_RED = "#ff3b30";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (Apple-style line art)                           */
/* ------------------------------------------------------------------ */

function AppleLogoIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 17 21"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8.5 0C5.5 0 3.5 2 3.5 5c0 2 1 3.5 2.5 4.5-1.5 1-2.5 3-2.5 5.5 0 3.5 2.5 6 6 6s6-2.5 6-6c0-2.5-1-4.5-2.5-5.5 1.5-1 2.5-2.5 2.5-4.5 0-3-2-5-5-5z" />
    </svg>
  );
}

function ChevronRightIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CheckIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SearchIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ShieldIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LayersIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
      <polyline points="2 15.5 12 22 22 15.5" />
      <polyline points="2 11.5 12 18 22 11.5" />
    </svg>
  );
}

function ZapIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function SunIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function CameraIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data — aiRules named rules                                        */
/* ------------------------------------------------------------------ */

const aiRuleCards = [
  {
    name: "Spring Physics",
    slug: "spring",
    description:
      "No linear transitions. Every interaction uses silky deceleration curves — duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] — so elements feel like precision hardware, not software.",
    code: 'transition-all duration-500\nease-[cubic-bezier(0.25,0.1,0.25,1)]',
    accent: APPLE_BLUE,
    demoLabel: "Hover the button",
    doneLabel: "Feel the deceleration",
  },
  {
    name: "Haptic Touch",
    slug: "haptic",
    description:
      "All interactive surfaces respond with physical press damping. active:scale-[0.96] simulates the resistance of machined aluminum — there is weight behind every tap.",
    code: 'active:scale-[0.96]\nactive:scale-[0.98]',
    accent: APPLE_GREEN,
    demoLabel: "Press the button",
    doneLabel: "Feel the resistance",
  },
  {
    name: "Contextual Depth",
    slug: "depth",
    description:
      "On hover, inner images scale-105 via group-hover — creating parallax depth. The card lifts; the image grows inside it. Two layers, one motion, infinite polish.",
    code: 'group-hover:scale-105\nhover:-translate-y-1',
    accent: APPLE_BLUE,
    demoLabel: "Hover the card",
    doneLabel: "Two-layer parallax",
  },
  {
    name: "Subtle Blurs",
    slug: "blur",
    description:
      "Frosted glass panels use backdrop-blur-xl with bg-white/80. Transitions between blur levels are smooth — opacity and backdrop filter animate together for a native macOS feel.",
    code: 'bg-white/80\nbackdrop-blur-xl',
    accent: APPLE_BLUE,
    demoLabel: "Toggle the panel",
    doneLabel: "Glass morphism active",
  },
];

const colorSwatches = [
  { name: "Black", hex: APPLE_BLACK, label: "Primary", textClass: "text-white" },
  { name: "Apple Gray", hex: APPLE_GRAY, label: "Secondary", textClass: "text-gray-400" },
  { name: "Apple Blue", hex: APPLE_BLUE, label: "Accent #1", textClass: "text-white" },
  { name: "Apple Green", hex: APPLE_GREEN, label: "Accent #2", textClass: "text-white" },
  { name: "Apple Red", hex: APPLE_RED, label: "Accent #3", textClass: "text-white" },
  { name: "White", hex: APPLE_WHITE, label: "Background", textClass: "text-gray-400" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "nav";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeRuleIdx, setActiveRuleIdx] = useState<number>(0);
  const [blurPanelActive, setBlurPanelActive] = useState(false);
  const [springBallPos, setSpringBallPos] = useState<"left" | "right">("left");
  const [hapticPressed, setHapticPressed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: APPLE_WHITE,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        color: APPLE_BLACK,
      }}
    >
      <style>{`
        @keyframes apple-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes apple-shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
        @keyframes apple-orbit {
          from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
        }
        @keyframes apple-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .apple-spring {
          transition: all 0.5s cubic-bezier(0.25,0.1,0.25,1);
        }
        .apple-spring-fast {
          transition: all 0.3s cubic-bezier(0.25,0.1,0.25,1);
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(255,255,255,0.82)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[980px] mx-auto px-5 md:px-6 flex items-center justify-between h-12">
          {/* Apple logo + wordmark */}
          <div className="flex items-center gap-2">
            <AppleLogoIcon className="w-4 h-4 text-black" />
            <span className="text-sm font-medium tracking-tight text-black">
              Apple Style
            </span>
          </div>

          {/* Center section nav */}
          <nav className="hidden md:flex items-center gap-7">
            {["Palette", "Components", "AI Rules", "Philosophy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-xs text-black apple-spring hover:text-[#6e6e73] cursor-pointer"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back to StyleKit */}
          <Link
            href="/styles/apple-style"
            className="flex items-center gap-1 text-xs apple-spring"
            style={{ color: APPLE_BLUE }}
          >
            <span>&#8592;</span>
            <span className="hover:underline">apple-style</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — Black Apple-style product reveal                       */}
      {/* ================================================================ */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{
          backgroundColor: APPLE_BLACK,
          minHeight: "100svh",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,113,227,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          <span
            className="inline-block text-xs font-medium tracking-[0.18em] uppercase mb-6"
            style={{ color: APPLE_BLUE }}
          >
            Apple Style — StyleKit Showcase
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-semibold tracking-tight leading-none mb-5"
          style={{
            fontSize: "clamp(48px, 9vw, 96px)",
            color: APPLE_WHITE,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Designed with
          <br />
          <span style={{ color: APPLE_BLUE }}>precision.</span>
        </h1>

        {/* Subhead */}
        <p
          className="max-w-xl text-center leading-relaxed mb-10"
          style={{
            fontSize: "clamp(17px, 2.5vw, 21px)",
            color: "#6e6e73",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          Radical simplicity. Generous whitespace. Hardware-grade polish.
          The design language of the world&apos;s most admired products — brought to your UI.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        >
          <a
            href="#components"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-medium text-sm text-white apple-spring hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:-translate-y-0.5 active:scale-[0.96]"
            style={{ backgroundColor: APPLE_BLUE }}
          >
            Explore components
            <ChevronRightIcon className="w-4 h-4" />
          </a>
          <a
            href="#philosophy"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-medium text-sm apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: APPLE_WHITE,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Design philosophy
          </a>
        </div>

        {/* Hero product mock — iPhone-style mockup */}
        <div
          className="w-full max-w-3xl mx-auto"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s",
          }}
        >
          <div
            className="relative mx-auto rounded-[40px] overflow-hidden"
            style={{
              maxWidth: "320px",
              aspectRatio: "9/19",
              backgroundColor: "#1c1c1e",
              border: "8px solid #2c2c2e",
              boxShadow: "0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}
          >
            {/* Status bar */}
            <div
              className="flex items-center justify-between px-6 pt-3 pb-1"
              style={{ color: APPLE_WHITE, fontSize: "11px", fontWeight: 600 }}
            >
              <span>9:41</span>
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full"
                style={{ width: "120px", height: "34px", backgroundColor: "#000" }}
              />
              <div className="flex items-center gap-1">
                <div className="w-4 h-2.5 border border-white/60 rounded-sm relative">
                  <div className="absolute inset-[2px] right-[4px] bg-white/80 rounded-sm" />
                  <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1 h-1.5 bg-white/60 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* App UI mockup body */}
            <div className="px-5 pt-6 pb-4">
              <p className="text-xs font-semibold mb-1" style={{ color: "#6e6e73" }}>
                Good morning
              </p>
              <h3 className="text-xl font-semibold mb-5" style={{ color: APPLE_WHITE }}>
                iPhone 15 Pro
              </h3>

              {/* Status cards */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Storage", value: "128 GB", color: APPLE_BLUE },
                  { label: "Battery", value: "94%", color: APPLE_GREEN },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl p-3"
                    style={{ backgroundColor: "#2c2c2e" }}
                  >
                    <p className="text-[10px] mb-1" style={{ color: "#6e6e73" }}>{item.label}</p>
                    <p className="text-base font-semibold" style={{ color: item.color }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Feature row */}
              <div
                className="rounded-2xl p-3 mb-3 flex items-center gap-3"
                style={{ backgroundColor: "#2c2c2e" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: APPLE_BLUE }}
                >
                  <CameraIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: APPLE_WHITE }}>48MP Main</p>
                  <p className="text-[10px]" style={{ color: "#6e6e73" }}>Pro Camera System</p>
                </div>
                <ChevronRightIcon className="w-3 h-3 ml-auto" style={{ color: "#6e6e73" } as React.CSSProperties} />
              </div>

              {/* CTA button */}
              <button
                className="w-full py-3 rounded-full text-sm font-medium text-white apple-spring active:scale-[0.96]"
                style={{ backgroundColor: APPLE_BLUE }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: heroVisible ? 0.4 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div
            className="w-px h-10"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)",
              animation: "apple-shimmer 2.5s ease-in-out infinite",
            }}
          />
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "#6e6e73" }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="py-24 md:py-32 px-6">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
              style={{ color: APPLE_BLUE }}
            >
              Color System
            </span>
            <h2
              className="font-semibold tracking-tight leading-none"
              style={{ fontSize: "clamp(36px, 6vw, 56px)", color: APPLE_BLACK }}
            >
              Restrained. Purposeful.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-16">
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
              Black, white, Apple Gray, and three precise accent hues. No gradients.
              No superfluous color. Every tone earns its place.
            </p>
          </RevealBlock>

          {/* Swatch grid */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-16">
              {colorSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col gap-3 cursor-default group"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="rounded-2xl aspect-square flex flex-col items-center justify-end p-3 apple-spring"
                    style={{
                      backgroundColor: swatch.hex,
                      border: swatch.hex === APPLE_WHITE || swatch.hex === APPLE_GRAY
                        ? "1px solid rgba(0,0,0,0.08)"
                        : "none",
                      transform: hoveredSwatch === i ? "translateY(-6px) scale(1.04)" : "translateY(0) scale(1)",
                      boxShadow: hoveredSwatch === i
                        ? `0 16px 40px ${swatch.hex === APPLE_BLACK ? "rgba(0,0,0,0.3)" : swatch.hex}44`
                        : "0 4px 12px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span
                      className="text-[10px] font-mono font-medium tracking-wide"
                      style={{ color: swatch.textClass === "text-white" ? APPLE_WHITE : "#6e6e73" }}
                    >
                      {swatch.hex}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: APPLE_BLACK }}>{swatch.name}</p>
                    <p className="text-xs" style={{ color: "#6e6e73" }}>{swatch.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Typography specimen */}
          <RevealBlock delay={0.15}>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{
                backgroundColor: APPLE_GRAY,
              }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-8" style={{ color: "#6e6e73" }}>
                SF Pro Typography Specimen
              </p>
              <div className="space-y-4">
                <p
                  className="font-semibold tracking-tight leading-none"
                  style={{ fontSize: "clamp(40px, 7vw, 72px)", color: APPLE_BLACK }}
                >
                  The detail is the design.
                </p>
                <p className="text-xl font-normal leading-relaxed max-w-2xl" style={{ color: "#6e6e73" }}>
                  Typography is the soul of every Apple interface. Weight and spacing create meaning before a single word is read.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {[
                    { weight: "100", label: "Ultralight" },
                    { weight: "300", label: "Light" },
                    { weight: "400", label: "Regular" },
                    { weight: "500", label: "Medium" },
                    { weight: "600", label: "Semibold" },
                    { weight: "700", label: "Bold" },
                  ].map((w) => (
                    <div key={w.label} className="flex flex-col gap-1">
                      <span
                        className="text-2xl"
                        style={{ fontWeight: w.weight, color: APPLE_BLACK }}
                      >
                        Aa
                      </span>
                      <span className="text-[10px]" style={{ color: "#6e6e73" }}>{w.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section id="components" className="py-24 md:py-32 px-6">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
              style={{ color: APPLE_BLUE }}
            >
              Components
            </span>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 56px)", color: APPLE_BLACK }}
            >
              Building blocks.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-10">
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
              Every element — from pill buttons to frosted cards — carries the same
              obsessive attention to spacing, radius, and shadow depth.
            </p>
          </RevealBlock>

          {/* Tab selector */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "nav"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 rounded-full text-sm font-medium capitalize apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                  style={{
                    backgroundColor: activeTab === tab ? APPLE_BLACK : APPLE_GRAY,
                    color: activeTab === tab ? APPLE_WHITE : APPLE_BLACK,
                    boxShadow: activeTab === tab ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.14}>
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{
                backgroundColor: APPLE_GRAY,
                minHeight: "360px",
              }}
            >
              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  {/* Primary Apple blue */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-6" style={{ color: "#6e6e73" }}>
                      Primary — Apple Blue
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white apple-spring hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:-translate-y-0.5 hover:bg-[#0077ed] active:scale-[0.96]"
                        style={{ backgroundColor: APPLE_BLUE }}
                      >
                        Buy now
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                        style={{
                          backgroundColor: APPLE_WHITE,
                          color: APPLE_BLUE,
                          boxShadow: "0 4px_12px rgba(0,0,0,0.08)",
                        }}
                      >
                        Learn more
                        <ChevronRightIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        className="px-6 py-3 rounded-full text-sm font-medium apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                        style={{
                          backgroundColor: "transparent",
                          color: APPLE_BLUE,
                          border: `1px solid ${APPLE_BLUE}`,
                        }}
                      >
                        See specs
                      </button>
                    </div>
                  </div>

                  {/* System colors */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-6" style={{ color: "#6e6e73" }}>
                      System colors — green &amp; red
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                        style={{ backgroundColor: APPLE_GREEN }}
                      >
                        <CheckIcon className="w-4 h-4" />
                        Confirm
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                        style={{ backgroundColor: APPLE_RED }}
                      >
                        <XIcon className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-6" style={{ color: "#6e6e73" }}>
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "Small", cls: "px-4 py-1.5 text-xs" },
                        { label: "Medium", cls: "px-6 py-3 text-sm" },
                        { label: "Large", cls: "px-8 py-4 text-base" },
                      ].map(({ label, cls }) => (
                        <button
                          key={label}
                          className={`rounded-full font-medium text-white apple-spring hover:-translate-y-0.5 active:scale-[0.96] ${cls}`}
                          style={{ backgroundColor: APPLE_BLUE }}
                        >
                          {label}
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
                      title: "iPhone 15 Pro",
                      subtitle: "Titanium. So strong. So light. So Pro.",
                      price: "From $999",
                      iconBg: "#1c1c1e",
                      icon: <CameraIcon className="w-8 h-8 text-white" />,
                    },
                    {
                      title: "MacBook Air",
                      subtitle: "Supercharged by M3. Up to 18 hours battery.",
                      price: "From $1,099",
                      iconBg: APPLE_BLUE,
                      icon: <LayersIcon className="w-8 h-8 text-white" />,
                    },
                    {
                      title: "AirPods Pro",
                      subtitle: "Adaptive Audio. Now playing everywhere.",
                      price: "From $249",
                      iconBg: APPLE_GREEN,
                      icon: <ZapIcon className="w-8 h-8 text-white" />,
                    },
                    {
                      title: "Apple Watch",
                      subtitle: "A healthy leap ahead.",
                      price: "From $399",
                      iconBg: "#1c1c1e",
                      icon: <SunIcon className="w-8 h-8 text-white" />,
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group bg-white rounded-3xl p-8 cursor-pointer apple-spring hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-[0.98] text-center overflow-hidden"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
                    >
                      <div
                        className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center apple-spring group-hover:scale-105"
                        style={{ backgroundColor: card.iconBg }}
                      >
                        {card.icon}
                      </div>
                      <h4 className="text-xl font-semibold mb-2 tracking-tight" style={{ color: APPLE_BLACK }}>
                        {card.title}
                      </h4>
                      <p className="text-sm leading-relaxed mb-4 apple-spring group-hover:text-gray-700" style={{ color: "#6e6e73" }}>
                        {card.subtitle}
                      </p>
                      <p className="text-base font-medium" style={{ color: APPLE_BLACK }}>
                        {card.price}
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
                      <label className="block text-sm font-medium mb-2" style={{ color: APPLE_BLACK }}>
                        Search
                      </label>
                      <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6e6e73" } as React.CSSProperties} />
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm apple-spring-fast focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: APPLE_WHITE,
                            color: APPLE_BLACK,
                            border: "1px solid rgba(0,0,0,0.12)",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,113,227,0.25)`;
                            e.currentTarget.style.borderColor = APPLE_BLUE;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: APPLE_BLACK }}>
                        Apple ID
                      </label>
                      <input
                        type="email"
                        placeholder="name@icloud.com"
                        className="w-full px-4 py-3 rounded-xl text-sm apple-spring-fast focus:outline-none"
                        style={{
                          backgroundColor: APPLE_WHITE,
                          color: APPLE_BLACK,
                          border: "1px solid rgba(0,0,0,0.12)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,113,227,0.25)`;
                          e.currentTarget.style.borderColor = APPLE_BLUE;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: APPLE_BLACK }}>
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                        className="w-full px-4 py-3 rounded-xl text-sm apple-spring-fast focus:outline-none"
                        style={{
                          backgroundColor: APPLE_WHITE,
                          color: APPLE_BLACK,
                          border: "1px solid rgba(0,0,0,0.12)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0,113,227,0.25)`;
                          e.currentTarget.style.borderColor = APPLE_BLUE;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: APPLE_BLACK }}>
                        Model
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none apple-spring-fast"
                        style={{
                          backgroundColor: APPLE_WHITE,
                          color: APPLE_BLACK,
                          border: "1px solid rgba(0,0,0,0.12)",
                        }}
                      >
                        <option>iPhone 15 Pro Max</option>
                        <option>iPhone 15 Pro</option>
                        <option>iPhone 15</option>
                        <option>iPhone 15 Plus</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-[4px] border-2 flex items-center justify-center cursor-pointer apple-spring-fast hover:scale-105"
                        style={{ borderColor: APPLE_BLUE, backgroundColor: APPLE_BLUE }}
                      >
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm" style={{ color: APPLE_BLACK }}>
                        Apple One subscription
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-[4px] border-2 cursor-pointer apple-spring-fast hover:scale-105"
                        style={{ borderColor: "rgba(0,0,0,0.2)" }}
                      />
                      <span className="text-sm" style={{ color: APPLE_BLACK }}>
                        AppleCare+ coverage
                      </span>
                    </div>
                    <button
                      className="w-full py-3.5 rounded-full text-sm font-medium text-white apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                      style={{ backgroundColor: APPLE_BLUE }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* ---- NAV TAB ---- */}
              {activeTab === "nav" && (
                <div className="space-y-6">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-6" style={{ color: "#6e6e73" }}>
                    Apple.com-style navigation bar
                  </p>
                  {/* Nav demo */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <nav
                      className="px-6 py-3 flex items-center justify-between"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.82)",
                        backdropFilter: "saturate(180%) blur(20px)",
                        WebkitBackdropFilter: "saturate(180%) blur(20px)",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <AppleLogoIcon className="w-4 h-4 text-black" />
                      <div className="flex items-center gap-7">
                        {["Store", "Mac", "iPhone", "Watch", "Vision"].map((item) => (
                          <span
                            key={item}
                            className="text-xs apple-spring hover:text-[#6e6e73] cursor-pointer"
                            style={{ color: APPLE_BLACK }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <SearchIcon className="w-4 h-4 text-black cursor-pointer apple-spring hover:text-[#6e6e73]" />
                    </nav>
                    {/* Hero demo area below nav */}
                    <div
                      className="flex flex-col items-center justify-center py-16 px-8 text-center"
                      style={{ backgroundColor: APPLE_BLACK }}
                    >
                      <span className="text-xs mb-2 font-medium" style={{ color: APPLE_BLUE }}>
                        New
                      </span>
                      <h3
                        className="font-semibold tracking-tight mb-2"
                        style={{ fontSize: "32px", color: APPLE_WHITE }}
                      >
                        iPhone 15 Pro
                      </h3>
                      <p className="text-sm mb-5" style={{ color: "#6e6e73" }}>
                        Titanium. So strong. So light. So Pro.
                      </p>
                      <div className="flex gap-4">
                        <a className="text-sm font-medium apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                          Learn more &rsaquo;
                        </a>
                        <a className="text-sm font-medium apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                          Buy &rsaquo;
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed" style={{ color: "#6e6e73" }}>
                    The nav uses <code className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: APPLE_GRAY }}>backdrop-blur-xl</code> +{" "}
                    <code className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: APPLE_GRAY }}>bg-white/80</code> to create
                    a frosted glass effect identical to apple.com.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. AI RULES INTERACTIVE DEMO                                     */}
      {/* ================================================================ */}
      <section id="ai-rules" className="py-24 md:py-32 px-6" style={{ backgroundColor: APPLE_GRAY }}>
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
              style={{ color: APPLE_BLUE }}
            >
              AI Rules
            </span>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 56px)", color: APPLE_BLACK }}
            >
              Four laws. Zero exceptions.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
              The AI generation rules for Apple Style enforce four named interaction
              principles. Each card below lets you experience the rule directly.
            </p>
          </RevealBlock>

          {/* Rule selector pills */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {aiRuleCards.map((rule, i) => (
                <button
                  key={rule.slug}
                  onClick={() => setActiveRuleIdx(i)}
                  className="px-5 py-2 rounded-full text-sm font-medium apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                  style={{
                    backgroundColor: activeRuleIdx === i ? APPLE_BLACK : APPLE_WHITE,
                    color: activeRuleIdx === i ? APPLE_WHITE : APPLE_BLACK,
                    boxShadow: activeRuleIdx === i ? "0 4px 12px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {rule.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active rule panel */}
          <RevealBlock delay={0.14}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Explanation */}
              <div
                className="rounded-3xl p-8 md:p-10 flex flex-col justify-between"
                style={{
                  backgroundColor: APPLE_WHITE,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
                    style={{ backgroundColor: `${aiRuleCards[activeRuleIdx].accent}18`, color: aiRuleCards[activeRuleIdx].accent }}
                  >
                    Rule {activeRuleIdx + 1} of 4
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-4" style={{ color: APPLE_BLACK }}>
                    {aiRuleCards[activeRuleIdx].name}
                  </h3>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "#6e6e73" }}>
                    {aiRuleCards[activeRuleIdx].description}
                  </p>
                  <div
                    className="rounded-xl p-4 font-mono text-xs leading-relaxed"
                    style={{ backgroundColor: APPLE_GRAY, color: "#1d1d1f" }}
                  >
                    <pre style={{ whiteSpace: "pre-wrap" }}>{aiRuleCards[activeRuleIdx].code}</pre>
                  </div>
                </div>
              </div>

              {/* Interactive demo */}
              <div
                className="rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center gap-6"
                style={{
                  backgroundColor: APPLE_WHITE,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                {/* Spring Physics demo */}
                {activeRuleIdx === 0 && (
                  <div className="flex flex-col items-center gap-6 w-full">
                    <p className="text-sm font-medium text-center" style={{ color: "#6e6e73" }}>
                      Hover the button to feel deceleration easing
                    </p>
                    <button
                      className="px-8 py-4 rounded-full font-medium text-white text-sm"
                      style={{
                        backgroundColor: APPLE_BLUE,
                        transition: "all 0.5s cubic-bezier(0.25,0.1,0.25,1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = APPLE_BLUE_HOVER;
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,113,227,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = APPLE_BLUE;
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Buy now — hover me
                    </button>
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs" style={{ color: "#6e6e73" }}>Linear (default)</span>
                        <button
                          className="text-xs px-3 py-1 rounded-full apple-spring"
                          style={{ backgroundColor: APPLE_GRAY, color: "#6e6e73" }}
                          onClick={() => setSpringBallPos(p => p === "left" ? "right" : "left")}
                        >
                          Animate
                        </button>
                      </div>
                      <div
                        className="relative h-9 rounded-full overflow-hidden mb-3"
                        style={{ backgroundColor: APPLE_GRAY }}
                      >
                        <div
                          className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: "#6e6e73",
                            transform: `translateY(-50%) translateX(${springBallPos === "right" ? "120px" : "0"})`,
                            transition: springBallPos === "right" ? "transform 0.7s linear" : "none",
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs" style={{ color: APPLE_BLUE }}>Apple cubic-bezier(0.25,0.1,0.25,1)</span>
                      </div>
                      <div
                        className="relative h-9 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${APPLE_BLUE}12` }}
                      >
                        <div
                          className="absolute top-1/2 -translate-y-1/2 left-2 w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: APPLE_BLUE,
                            transform: `translateY(-50%) translateX(${springBallPos === "right" ? "120px" : "0"})`,
                            transition: springBallPos === "right" ? "transform 0.7s cubic-bezier(0.25,0.1,0.25,1)" : "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Haptic Touch demo */}
                {activeRuleIdx === 1 && (
                  <div className="flex flex-col items-center gap-6 w-full">
                    <p className="text-sm font-medium text-center" style={{ color: "#6e6e73" }}>
                      Press and hold the button to feel damping
                    </p>
                    <div className="relative">
                      {hapticPressed && (
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            border: `2px solid ${APPLE_GREEN}`,
                            animation: "apple-pulse-ring 0.6s ease-out forwards",
                          }}
                        />
                      )}
                      <button
                        className="relative px-8 py-4 rounded-full font-medium text-white text-sm"
                        style={{
                          backgroundColor: APPLE_GREEN,
                          transform: hapticPressed ? "scale(0.94)" : "scale(1)",
                          boxShadow: hapticPressed
                            ? "0 2px 6px rgba(52,199,89,0.2)"
                            : "0 8px 20px rgba(52,199,89,0.35)",
                          transition: "all 0.15s cubic-bezier(0.25,0.1,0.25,1)",
                        }}
                        onMouseDown={() => setHapticPressed(true)}
                        onMouseUp={() => setHapticPressed(false)}
                        onMouseLeave={() => setHapticPressed(false)}
                        onTouchStart={() => setHapticPressed(true)}
                        onTouchEnd={() => setHapticPressed(false)}
                      >
                        {hapticPressed ? "Pressed — feel the weight" : "Press and hold"}
                      </button>
                    </div>
                    <p className="text-xs text-center" style={{ color: "#6e6e73" }}>
                      active:scale-[0.96] — machined aluminum resistance
                    </p>
                  </div>
                )}

                {/* Contextual Depth demo */}
                {activeRuleIdx === 2 && (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <p className="text-sm font-medium text-center" style={{ color: "#6e6e73" }}>
                      Hover the card — notice two-layer parallax
                    </p>
                    <div
                      className="group w-48 rounded-3xl cursor-pointer apple-spring hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
                      style={{
                        backgroundColor: APPLE_GRAY,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                      }}
                    >
                      <div className="p-6 text-center">
                        <div
                          className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center apple-spring group-hover:scale-105"
                          style={{ backgroundColor: APPLE_BLACK }}
                        >
                          <CameraIcon className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-sm font-semibold tracking-tight" style={{ color: APPLE_BLACK }}>
                          iPhone 15 Pro
                        </h4>
                        <p className="text-xs mt-1 apple-spring group-hover:text-gray-600" style={{ color: "#6e6e73" }}>
                          Titanium
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-center" style={{ color: "#6e6e73" }}>
                      Card lifts — icon grows via group-hover:scale-105
                    </p>
                  </div>
                )}

                {/* Subtle Blurs demo */}
                {activeRuleIdx === 3 && (
                  <div className="flex flex-col items-center gap-5 w-full">
                    <p className="text-sm font-medium text-center" style={{ color: "#6e6e73" }}>
                      Toggle the frosted glass panel
                    </p>
                    <div className="relative w-full max-w-xs h-36 rounded-2xl overflow-hidden">
                      {/* Background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${APPLE_BLUE} 0%, #1c1c1e 100%)`,
                        }}
                      >
                        <div className="p-4 text-white text-sm font-medium opacity-60">
                          Content behind glass
                        </div>
                      </div>
                      {/* Glass panel */}
                      <div
                        className="absolute inset-x-4 bottom-4 rounded-xl p-4"
                        style={{
                          backgroundColor: blurPanelActive ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
                          backdropFilter: blurPanelActive ? "saturate(180%) blur(20px)" : "blur(0px)",
                          WebkitBackdropFilter: blurPanelActive ? "saturate(180%) blur(20px)" : "blur(0px)",
                          border: blurPanelActive ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
                          transition: "all 0.5s cubic-bezier(0.25,0.1,0.25,1)",
                        }}
                      >
                        {blurPanelActive && (
                          <p className="text-xs font-medium" style={{ color: APPLE_BLACK }}>
                            Frosted glass — native macOS feel
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setBlurPanelActive(p => !p)}
                      className="px-6 py-3 rounded-full text-sm font-medium text-white apple-spring hover:-translate-y-0.5 active:scale-[0.96]"
                      style={{ backgroundColor: blurPanelActive ? APPLE_BLACK : APPLE_BLUE }}
                    >
                      {blurPanelActive ? "Hide glass panel" : "Show glass panel"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. PRODUCT SHOWCASE — Apple store-style grid                     */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: APPLE_WHITE }}>
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
              style={{ color: APPLE_BLUE }}
            >
              Product Grid
            </span>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 56px)", color: APPLE_BLACK }}
            >
              The lineup.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
              Apple Store layout in practice. Generous whitespace, tight typographic
              hierarchy, and restrained single-accent hover states.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Hero product — large */}
            <RevealBlock delay={0.08}>
              <div
                className="group rounded-3xl overflow-hidden cursor-pointer apple-spring hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)] active:scale-[0.98]"
                style={{
                  backgroundColor: APPLE_BLACK,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  gridRow: "span 2",
                }}
              >
                <div className="p-8 md:p-10 flex flex-col h-full min-h-[360px]">
                  <div className="flex items-center justify-between mb-auto">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: APPLE_BLUE, color: APPLE_WHITE }}
                    >
                      New
                    </span>
                    <ChevronRightIcon className="w-5 h-5 apple-spring group-hover:translate-x-1" style={{ color: "#6e6e73" } as React.CSSProperties} />
                  </div>

                  {/* Product icon */}
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div
                      className="w-32 h-32 rounded-[32px] flex items-center justify-center apple-spring group-hover:scale-105"
                      style={{ backgroundColor: "#1c1c1e" }}
                    >
                      <CameraIcon className="w-16 h-16" style={{ color: APPLE_BLUE }} />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs mb-2" style={{ color: "#6e6e73" }}>iPhone 15 Pro</p>
                    <h3
                      className="font-semibold tracking-tight mb-2"
                      style={{ fontSize: "28px", color: APPLE_WHITE }}
                    >
                      Titanium.
                      <br />
                      So strong.
                    </h3>
                    <a className="text-sm font-medium apple-spring" style={{ color: APPLE_BLUE }}>
                      Learn more &rsaquo;
                    </a>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Secondary products */}
            <RevealBlock delay={0.12}>
              <div
                className="group rounded-3xl overflow-hidden cursor-pointer apple-spring hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] active:scale-[0.98] p-8"
                style={{
                  backgroundColor: APPLE_GRAY,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium" style={{ color: "#6e6e73" }}>MacBook Air</span>
                  <ChevronRightIcon className="w-4 h-4 apple-spring group-hover:translate-x-1" style={{ color: "#6e6e73" } as React.CSSProperties} />
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center apple-spring group-hover:scale-105"
                    style={{ backgroundColor: APPLE_WHITE }}
                  >
                    <LayersIcon className="w-12 h-12" style={{ color: APPLE_BLUE }} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-1" style={{ color: APPLE_BLACK }}>
                  Supercharged by M3.
                </h3>
                <p className="text-sm" style={{ color: "#6e6e73" }}>From $1,099</p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div
                className="group rounded-3xl overflow-hidden cursor-pointer apple-spring hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] active:scale-[0.98] p-8"
                style={{
                  backgroundColor: "#1c1c1e",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium" style={{ color: "#6e6e73" }}>Apple Watch Ultra 2</span>
                  <ChevronRightIcon className="w-4 h-4 apple-spring group-hover:translate-x-1" style={{ color: "#6e6e73" } as React.CSSProperties} />
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center apple-spring group-hover:scale-105"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <SunIcon className="w-12 h-12" style={{ color: APPLE_GREEN }} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-1" style={{ color: APPLE_WHITE }}>
                  A healthy leap ahead.
                </h3>
                <p className="text-sm" style={{ color: "#6e6e73" }}>From $399</p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN RULES — Do / Don't                                     */}
      {/* ================================================================ */}
      <section id="philosophy" className="py-24 md:py-32 px-6" style={{ backgroundColor: APPLE_GRAY }}>
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
              style={{ color: APPLE_BLUE }}
            >
              Design Rules
            </span>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 56px)", color: APPLE_BLACK }}
            >
              Discipline is the design.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
              Apple style is not about what you add — it is about what you remove.
              Restraint at every decision. Every pixel must earn its place.
            </p>
          </RevealBlock>

          {/* Do / Don't grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{
                  backgroundColor: APPLE_WHITE,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${APPLE_GREEN}18` }}
                  >
                    <CheckIcon className="w-4 h-4" style={{ color: APPLE_GREEN } as React.CSSProperties} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: APPLE_BLACK }}>Do</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Use large amounts of whitespace — let content breathe",
                    "Use Apple Gray #f5f5f7 as the background",
                    "Use Apple Blue #0071e3 as the accent color",
                    "Use refined corners — rounded-xl or rounded-2xl",
                    "Use subtle shadows (4px, 8% opacity maximum)",
                    "Use -apple-system SF Pro typography",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#1d1d1f" }}>
                      <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: APPLE_GREEN } as React.CSSProperties} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.14}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{
                  backgroundColor: APPLE_WHITE,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${APPLE_RED}12` }}
                  >
                    <XIcon className="w-4 h-4" style={{ color: APPLE_RED } as React.CSSProperties} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: APPLE_BLACK }}>Don&apos;t</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Do not use gradient backgrounds",
                    "Do not use more than 3 colors",
                    "Do not use heavy shadows (shadow-xl, shadow-2xl)",
                    "Do not crowd elements together",
                    "Do not use decorative or flashy animations",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#1d1d1f" }}>
                      <XIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: APPLE_RED } as React.CSSProperties} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy quote */}
          <RevealBlock delay={0.18}>
            <div
              className="rounded-3xl p-10 md:p-14 text-center"
              style={{
                backgroundColor: APPLE_BLACK,
              }}
            >
              <p
                className="font-semibold tracking-tight leading-tight mb-6"
                style={{ fontSize: "clamp(24px, 4vw, 36px)", color: APPLE_WHITE }}
              >
                &ldquo;Apple Style is a design language born from radical simplicity — generous whitespace,
                refined details, and a restrained palette that communicates quality and trust.&rdquo;
              </p>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-8 h-px"
                  style={{ backgroundColor: APPLE_BLUE }}
                />
                <p className="text-xs tracking-[0.18em] uppercase" style={{ color: "#6e6e73" }}>
                  Apple Style — Design Philosophy
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FEATURES GRID — 6 principle cards                            */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: APPLE_WHITE }}>
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
              style={{ color: APPLE_BLUE }}
            >
              Principles
            </span>
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 56px)", color: APPLE_BLACK }}
            >
              Craft in every layer.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#6e6e73" }}>
              Six principles that define what makes Apple Style unmistakable at a glance.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: <LayersIcon className="w-7 h-7" />,
                title: "Radical Simplicity",
                desc: "Every element stripped to its essential form. No decoration that does not also serve a function.",
                accent: APPLE_BLACK,
              },
              {
                icon: <SunIcon className="w-7 h-7" />,
                title: "Generous Whitespace",
                desc: "Content that breathes. py-20 minimum. Negative space is not emptiness — it is structure.",
                accent: APPLE_BLUE,
              },
              {
                icon: <ShieldIcon className="w-7 h-7" />,
                title: "Refined Corners",
                desc: "rounded-xl and rounded-2xl. The specific radius of trust — precise, not arbitrary.",
                accent: APPLE_BLACK,
              },
              {
                icon: <ZapIcon className="w-7 h-7" />,
                title: "Spring Interactions",
                desc: "cubic-bezier(0.25,0.1,0.25,1) on every transition. Hardware-grade precision in every hover.",
                accent: APPLE_BLUE,
              },
              {
                icon: <CameraIcon className="w-7 h-7" />,
                title: "Subtle Shadows",
                desc: "0 4px 12px rgba(0,0,0,0.08). Shadows that suggest elevation without shouting it.",
                accent: APPLE_BLACK,
              },
              {
                icon: <SearchIcon className="w-7 h-7" />,
                title: "Restrained Palette",
                desc: "Black, white, Apple Gray, and one accent. Color used as signal — never as decoration.",
                accent: APPLE_BLUE,
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.07}>
                <div
                  className="group rounded-3xl p-7 h-full cursor-default apple-spring hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] active:scale-[0.98]"
                  style={{
                    backgroundColor: APPLE_GRAY,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 apple-spring group-hover:scale-105"
                    style={{
                      backgroundColor: feature.accent === APPLE_BLUE ? `${APPLE_BLUE}14` : "rgba(0,0,0,0.06)",
                      color: feature.accent,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-base font-semibold mb-2 tracking-tight" style={{ color: APPLE_BLACK }}>
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#6e6e73" }}>
                    {feature.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer
        style={{
          backgroundColor: APPLE_GRAY,
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-8">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <AppleLogoIcon className="w-5 h-5 text-black" />
                <span className="text-base font-semibold tracking-tight" style={{ color: APPLE_BLACK }}>
                  Apple Style
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#6e6e73" }}>
                The design language of the world&apos;s most admired products.
                Radical simplicity. Hardware-grade polish.
              </p>
              {/* Color dots */}
              <div className="flex items-center gap-2">
                {[APPLE_BLACK, APPLE_BLUE, APPLE_GREEN, APPLE_RED].map((color) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full apple-spring hover:scale-125"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "#6e6e73" }}
                >
                  Style
                </span>
                <Link href="/styles/apple-style" className="apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                  Documentation
                </Link>
                <Link href="/styles/apple-style/showcase" className="apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                  Showcase
                </Link>
                <Link href="/styles/apple-style/cover" className="apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "#6e6e73" }}
                >
                  StyleKit
                </span>
                <Link href="/" className="apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                  Home
                </Link>
                <Link href="/styles" className="apple-spring hover:underline" style={{ color: APPLE_BLUE }}>
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "#6e6e73" }}
                >
                  Palette
                </span>
                {colorSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-xs" style={{ color: "#6e6e73" }}>
                    <span
                      className="w-3 h-3 rounded-full inline-block shrink-0"
                      style={{
                        backgroundColor: s.hex,
                        border:
                          s.hex === APPLE_WHITE || s.hex === APPLE_GRAY
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                      }}
                    />
                    {s.name} — {s.hex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} className="mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: "#6e6e73" }}>
              Copyright &copy; 2025 StyleKit. All rights reserved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white apple-spring hover:shadow-[0_6px_20px_rgba(0,113,227,0.3)] hover:-translate-y-0.5 active:scale-[0.96]"
              style={{ backgroundColor: APPLE_BLUE }}
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
