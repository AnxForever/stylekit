"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const colorSwatches = [
  { name: "Ocean Teal", value: "#00897b", textLight: true },
  { name: "Sunshine", value: "#fffde7", textLight: false },
  { name: "Coral Sunset", value: "#ff6f61", textLight: true },
  { name: "Mango", value: "#ffc107", textLight: false },
  { name: "Palm Green", value: "#4caf50", textLight: true },
];

const destinations = [
  {
    tag: "Bali, Indonesia",
    title: "Sacred Forest Retreat",
    desc: "Step through ancient stone gates into a world of cascading waterfalls, incense-scented temples, and emerald rice terraces stretching to the horizon.",
    price: "From $289 / night",
    accentColor: "#4caf50",
  },
  {
    tag: "Maldives",
    title: "Crystal Lagoon Villa",
    desc: "Sleep suspended above a turquoise lagoon. Stingrays drift beneath your glass floor at dawn. Coral gardens wait just steps from your deck.",
    price: "From $699 / night",
    accentColor: "#00897b",
  },
  {
    tag: "Costa Rica",
    title: "Rainforest Canopy Suite",
    desc: "Wake to howler monkeys and cloud-forest mist. Zip through jungle canopy by day. Soak in volcanic hot springs beneath stars by night.",
    price: "From $179 / night",
    accentColor: "#ff6f61",
  },
];

const typographyScale = [
  { label: "Display", sample: "Tropical Paradise", size: "clamp(3rem,7vw,5.5rem)", weight: 800, color: "#00897b" },
  { label: "Heading 1", sample: "Sunshine & Coral", size: "clamp(2rem,4vw,3.5rem)", weight: 700, color: "#ff6f61" },
  { label: "Heading 2", sample: "Ocean Breeze", size: "clamp(1.5rem,3vw,2.25rem)", weight: 700, color: "#4caf50" },
  { label: "Body", sample: "Every wave carries the warmth of endless summer days. Sand between your toes, salt on your lips.", size: "1.125rem", weight: 400, color: "#374151" },
  { label: "Label", sample: "PALM SPRINGS / ISLAND GETAWAY", size: "0.75rem", weight: 600, color: "#ffc107" },
];

const doRules = [
  { title: "Splash with Teal Shadows", desc: "Apply colorful shadows like shadow-[0_4px_20px_rgba(0,137,123,0.25)] to lift cards off the warm cream background like a surf board on a wave." },
  { title: "Embrace Rounded Shapes", desc: "Use rounded-2xl on cards and rounded-full on buttons and badges. Organic curves mirror the softness of palm leaves and ocean waves." },
  { title: "Let Colors Sing Together", desc: "Pair ocean teal #00897b with coral #ff6f61 as complementary accents. Mango #ffc107 and palm green #4caf50 add tropical depth." },
  { title: "Animate with Life", desc: "hover:scale-105 transition-transform on cards and hover:-translate-y-1 on buttons give the interface a lively, breathing quality." },
  { title: "Use Gradient Backgrounds", desc: "Gradient from-[#00897b] to-[#4caf50] captures the lush transition from deep ocean to tropical foliage." },
];

const dontRules = [
  { title: "No Dark Moody Tones", desc: "Avoid charcoal, near-black, or desaturated color palettes. Tropical paradise thrives on warmth and daylight — not midnight vibes." },
  { title: "No Sharp Angular Corners", desc: "Remove rounded-none and sharp rectangles. Hard angles contradict the organic, island-shaped softness this style celebrates." },
  { title: "No Monochrome Palettes", desc: "Gray-on-gray or single-hue designs strip all the tropical energy. The palette needs at least three saturated colors working in harmony." },
  { title: "No Heavy Condensed Fonts", desc: "Avoid ultra-compressed typefaces. Bold, roomy letterforms feel warm and inviting. Condensed fonts read as corporate and cold." },
  { title: "No Flat Static Interactions", desc: "Elements must respond to touch and hover with warmth. Static, non-animated components feel like a resort with no ocean view." },
];

const resortFeatures = [
  { icon: "wave", label: "Beach Access", value: "Private" },
  { icon: "sun", label: "Weather", value: "Sunny 29°C" },
  { icon: "leaf", label: "Eco Rating", value: "5-Star Green" },
  { icon: "compass", label: "Location", value: "Beachfront" },
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
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
/*  Inline SVG Decorations                                             */
/* ------------------------------------------------------------------ */

function PalmLeafSvg({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Trunk */}
      <path d="M60 200 Q58 160 55 120 Q52 80 50 40" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      {/* Left frond cluster */}
      <path d="M55 80 Q20 50 5 20 Q25 45 50 60" fill="#4caf50" opacity="0.35" />
      <path d="M54 70 Q10 55 0 30 Q22 50 52 65" fill="#4caf50" opacity="0.25" />
      {/* Right frond cluster */}
      <path d="M55 75 Q90 40 110 15 Q92 42 58 62" fill="#4caf50" opacity="0.35" />
      <path d="M56 68 Q100 50 115 28 Q95 48 60 65" fill="#4caf50" opacity="0.25" />
      {/* Top fronds */}
      <path d="M53 55 Q40 15 30 0 Q45 20 55 50" fill="#4caf50" opacity="0.30" />
      <path d="M57 52 Q72 12 85 0 Q70 22 59 48" fill="#4caf50" opacity="0.30" />
    </svg>
  );
}

function WaveSvg({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 40 Q75 10 150 40 Q225 70 300 40 Q375 10 450 40 Q525 70 600 40 L600 80 L0 80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunSvg({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="22" fill="#ffc107" opacity="0.9" />
      {/* Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 50 + 28 * Math.cos(rad);
        const y1 = 50 + 28 * Math.sin(rad);
        const x2 = 50 + 40 * Math.cos(rad);
        const y2 = 50 + 40 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ffc107"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}

function TropicalFlowerSvg({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Petals */}
      <ellipse cx="40" cy="20" rx="8" ry="16" fill="#ff6f61" opacity="0.5" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="20" rx="8" ry="16" fill="#ff6f61" opacity="0.5" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="20" rx="8" ry="16" fill="#ff6f61" opacity="0.5" transform="rotate(120 40 40)" />
      <ellipse cx="40" cy="20" rx="8" ry="16" fill="#ffc107" opacity="0.45" transform="rotate(30 40 40)" />
      <ellipse cx="40" cy="20" rx="8" ry="16" fill="#ffc107" opacity="0.45" transform="rotate(90 40 40)" />
      <ellipse cx="40" cy="20" rx="8" ry="16" fill="#ffc107" opacity="0.45" transform="rotate(150 40 40)" />
      {/* Center */}
      <circle cx="40" cy="40" r="9" fill="#ffc107" opacity="0.9" />
      <circle cx="40" cy="40" r="5" fill="#ff6f61" opacity="0.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Icon Renderer                                              */
/* ------------------------------------------------------------------ */

function FeatureIcon({ icon }: { icon: string }) {
  if (icon === "wave") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
        <path d="M2 12 Q5 8 8 12 Q11 16 14 12 Q17 8 20 12 Q22 14 24 12" />
        <path d="M2 17 Q5 13 8 17 Q11 21 14 17 Q17 13 20 17" />
      </svg>
    );
  }
  if (icon === "sun") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </svg>
    );
  }
  if (icon === "leaf") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  if (icon === "compass") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"buttons" | "cards" | "inputs">("buttons");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffde7] text-gray-800 overflow-x-hidden">

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#00897b] shadow-[0_4px_20px_rgba(0,137,123,0.3)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Back to StyleKit */}
            <Link
              href="/styles/tropical-paradise"
              data-back-navigation="true"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 text-sm font-bold tracking-wide"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
            </Link>

            {/* Brand */}
            <span className="font-bold text-white text-lg tracking-tight hidden md:block">
              Tropical Paradise
            </span>

            {/* Nav links — pill style */}
            <nav className="flex items-center gap-2">
              {["Colors", "Components", "Typography", "Principles"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hidden md:inline-flex px-4 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/15 rounded-full transition-all duration-300"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/styles"
                className="inline-flex px-4 py-1.5 text-xs font-bold text-[#00897b] bg-[#fffde7] rounded-full hover:bg-white hover:scale-105 transition-all duration-300 ml-2"
              >
                All Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero Section ===== */}
      <section
        className="relative pt-28 md:pt-36 pb-0 px-6 md:px-12 overflow-hidden min-h-[90vh] flex flex-col justify-between"
        ref={heroRef}
      >
        {/* Background gradient orbs */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, rgba(255,193,7,0.22) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[-8%] w-[45%] h-[50%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 20% 80%, rgba(0,137,123,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-[35%] left-[40%] w-[30%] h-[40%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,111,97,0.12) 0%, transparent 55%)",
          }}
        />

        {/* Palm leaf decorations */}
        <div className="absolute top-16 left-4 md:left-12 pointer-events-none">
          <PalmLeafSvg
            style={{ width: "120px", height: "200px", opacity: 0.45, transform: "rotate(-15deg)" }}
          />
        </div>
        <div className="absolute top-12 right-4 md:right-16 pointer-events-none">
          <PalmLeafSvg
            style={{ width: "90px", height: "160px", opacity: 0.35, transform: "rotate(20deg) scaleX(-1)" }}
          />
        </div>

        {/* Sun decoration */}
        <div className="absolute top-24 right-[8%] md:right-[18%] pointer-events-none">
          <SunSvg style={{ width: "80px", height: "80px", opacity: 0.45 }} />
        </div>

        {/* Flower decoration */}
        <div className="absolute bottom-[25%] right-[5%] pointer-events-none">
          <TropicalFlowerSvg style={{ width: "70px", height: "70px", opacity: 0.5 }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-center pb-16 md:pb-24">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#ff6f61]/15 border border-[#ff6f61]/25 rounded-full mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff6f61] animate-pulse" />
            <span className="text-sm font-bold text-[#ff6f61] tracking-wide">Island Vibes Only</span>
          </div>

          {/* Main headline */}
          <h1
            className="font-bold leading-none tracking-tight mb-4"
            style={{
              fontSize: "clamp(4rem, 12vw, 9.5rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="text-[#00897b]">Tropical</span>
          </h1>

          <h2
            className="font-bold leading-none tracking-tight mb-8"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <span className="text-[#ff6f61]">Paradise</span>
          </h2>

          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            Sun-kissed shores, swaying palms, and warm coral sunsets — a design language as vivid and joyful as a tropical island at its peak.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <button className="px-10 py-4 bg-[#00897b] text-white text-sm font-bold rounded-full shadow-[0_4px_20px_rgba(0,137,123,0.35)] hover:bg-[#00796b] hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Explore the Style
            </button>
            <button className="px-10 py-4 bg-transparent text-[#00897b] text-sm font-bold rounded-full border-2 border-[#00897b]/30 hover:border-[#00897b] hover:bg-[#00897b]/8 hover:scale-105 transition-all duration-300">
              View Docs
            </button>
          </div>

          {/* Resort stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 w-full max-w-2xl"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            {resortFeatures.map((feat) => (
              <div
                key={feat.label}
                className="flex flex-col items-center gap-1.5 p-4 bg-white/70 rounded-2xl border border-[#00897b]/15 shadow-[0_4px_12px_rgba(0,137,123,0.08)]"
              >
                <span className="text-[#00897b]">
                  <FeatureIcon icon={feat.icon} />
                </span>
                <span className="text-xs text-gray-500 font-medium">{feat.label}</span>
                <span className="text-sm font-bold text-[#00897b]">{feat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider at bottom of hero */}
        <div className="relative mt-auto -mx-6 md:-mx-12">
          <WaveSvg
            className="w-full h-16 text-white"
            style={{ display: "block" }}
          />
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section id="components" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Components</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00897b] mb-4 tracking-tight leading-tight">
              Island-Crafted Elements
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Every component is infused with tropical warmth — round, inviting, and full of color.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="flex justify-center gap-2 mb-10">
            {(["buttons", "cards", "inputs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className={`px-6 py-2.5 text-sm font-bold rounded-full border-2 transition-all duration-300 ${
                  componentTab === tab
                    ? "bg-[#00897b] text-white border-[#00897b] shadow-[0_4px_14px_rgba(0,137,123,0.3)]"
                    : "bg-transparent text-[#00897b] border-[#00897b]/25 hover:border-[#00897b]/60"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </RevealBlock>

          {/* Demo area */}
          <RevealBlock delay={0.15}>
            <div className="relative p-10 md:p-14 rounded-2xl bg-[#fffde7] border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.12)] overflow-hidden">
              {/* Background palm decoration */}
              <div className="absolute bottom-0 right-0 pointer-events-none opacity-10">
                <PalmLeafSvg style={{ width: "160px", height: "260px" }} />
              </div>

              {componentTab === "buttons" && (
                <div className="relative z-10 space-y-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffc107] mb-4">Primary — Ocean Teal</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <button className="px-8 py-3 bg-[#00897b] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,137,123,0.3)] hover:bg-[#00796b] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
                        Book Your Escape
                      </button>
                      <button className="px-8 py-3 bg-[#ff6f61] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(255,111,97,0.3)] hover:bg-[#e65b50] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
                        Coral Sunset
                      </button>
                      <button className="px-8 py-3 bg-[#ffc107] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(255,193,7,0.3)] hover:bg-[#e6ac00] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
                        Mango Glow
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffc107] mb-4">Outline — Breeze Style</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <button className="px-8 py-3 bg-transparent text-[#00897b] text-sm font-bold rounded-full border-2 border-[#00897b]/40 hover:border-[#00897b] hover:bg-[#00897b]/8 hover:scale-105 transition-all duration-300">
                        Explore Islands
                      </button>
                      <button className="px-8 py-3 bg-transparent text-[#ff6f61] text-sm font-bold rounded-full border-2 border-[#ff6f61]/40 hover:border-[#ff6f61] hover:bg-[#ff6f61]/8 hover:scale-105 transition-all duration-300">
                        See Coral Reef
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffc107] mb-4">Gradient — Island Fusion</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <button
                        className="px-8 py-3 text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,137,123,0.3)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                        style={{ background: "linear-gradient(135deg, #00897b, #4caf50)" }}
                      >
                        Jungle to Ocean
                      </button>
                      <button
                        className="px-8 py-3 text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(255,111,97,0.3)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                        style={{ background: "linear-gradient(135deg, #ff6f61, #ffc107)" }}
                      >
                        Coral Sunrise
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                    rounded-full on all buttons. shadow-[0_4px_16px_rgba(0,137,123,0.3)] lifts elements. hover:scale-105 adds tropical bounce.
                  </p>
                </div>
              )}

              {componentTab === "cards" && (
                <div className="relative z-10 grid md:grid-cols-2 gap-5">
                  {/* Destination card */}
                  <div className="group p-6 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.1)] hover:shadow-[0_8px_32px_rgba(0,137,123,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff6f61]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffc107]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
                      <span className="ml-auto text-xs font-bold text-[#ffc107] uppercase tracking-wide">Bali</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#00897b] mb-2 group-hover:text-[#ff6f61] transition-colors duration-300">
                      Sacred Forest Villa
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      Ancient stone paths wind through emerald rice terraces to a private villa perched above the jungle canopy.
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#00897b]/10">
                      <span className="text-[#ff6f61] font-bold text-sm">From $289 / night</span>
                      <span className="text-xs text-[#00897b] font-bold group-hover:underline">Explore</span>
                    </div>
                  </div>

                  {/* Feature stat card */}
                  <div className="group p-6 bg-gradient-to-br from-[#00897b] to-[#4caf50] rounded-2xl shadow-[0_4px_20px_rgba(0,137,123,0.3)] hover:shadow-[0_8px_32px_rgba(0,137,123,0.4)] hover:scale-105 transition-all duration-300">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-wide mb-3">Top Destination</p>
                    <p className="text-5xl font-bold text-white mb-1">4.9</p>
                    <p className="text-white/80 text-sm mb-5">Guest satisfaction score</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="text-[#ffc107] text-lg">
                          {s <= 4 ? "\u2605" : "\u2606"}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/60 text-xs mt-3">Based on 12,847 reviews</p>
                  </div>

                  <p className="md:col-span-2 text-xs text-gray-400 leading-relaxed">
                    rounded-2xl throughout. group-hover:scale-105 for card lift. Gradient card uses from-[#00897b] to-[#4caf50].
                  </p>
                </div>
              )}

              {componentTab === "inputs" && (
                <div className="relative z-10 max-w-md space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. Luna Rodriguez"
                      className="w-full px-5 py-3.5 bg-white border-2 border-[#00897b]/20 rounded-full text-gray-700 placeholder-[#00897b]/35 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@paradise.com"
                      className="w-full px-5 py-3.5 bg-white border-2 border-[#00897b]/20 rounded-full text-gray-700 placeholder-[#00897b]/35 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">
                      Dream Destination
                    </label>
                    <textarea
                      placeholder="Describe your tropical getaway..."
                      rows={3}
                      className="w-full px-5 py-3.5 bg-white border-2 border-[#00897b]/20 rounded-2xl text-gray-700 placeholder-[#00897b]/35 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                  <button className="w-full py-3.5 bg-[#00897b] text-white text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(0,137,123,0.3)] hover:bg-[#00796b] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
                    Reserve My Paradise
                  </button>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    rounded-full on text inputs for the island-soft feel. rounded-2xl on textarea. border-2 border-[#00897b]/20 with teal focus glow.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section id="colors" className="py-24 md:py-32 px-6 md:px-12 bg-[#fffde7] relative overflow-hidden">
        {/* Decorative background */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(76,175,80,0.08), transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,111,97,0.08), transparent 65%)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Palette</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00897b] mb-4 tracking-tight leading-tight">
              Colors of the Island
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Five tropical hues drawn from ocean depths, coral reefs, mango groves, and endless sunshine.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.07}>
                <div className="group cursor-default">
                  {/* Swatch block */}
                  <div
                    className="w-full aspect-square rounded-2xl shadow-[0_4px_20px_rgba(0,137,123,0.15)] group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(0,137,123,0.22)] transition-all duration-300 flex items-end p-4"
                    style={{ backgroundColor: swatch.value }}
                  >
                    <span
                      className="text-xs font-bold font-mono"
                      style={{ color: swatch.textLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.4)" }}
                    >
                      {swatch.value}
                    </span>
                  </div>
                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold text-gray-700">{swatch.name}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color combo examples */}
          <RevealBlock delay={0.4} className="mt-12">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-[#00897b]/20" style={{ background: "linear-gradient(135deg, #00897b, #4caf50)" }}>
                <p className="text-white/70 text-xs font-bold uppercase tracking-wide mb-1">Ocean + Palm</p>
                <p className="text-white font-bold">From Reef to Forest</p>
              </div>
              <div
                className="p-5 rounded-2xl border border-[#ff6f61]/20"
                style={{ background: "linear-gradient(135deg, #ff6f61, #ffc107)" }}
              >
                <p className="text-white/80 text-xs font-bold uppercase tracking-wide mb-1">Coral + Mango</p>
                <p className="text-white font-bold">Sunset at Golden Hour</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#00897b] border border-[#00897b]">
                <p className="text-white/70 text-xs font-bold uppercase tracking-wide mb-1">Teal on Cream</p>
                <p className="text-[#fffde7] font-bold">Primary Combination</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Destination Showcase ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Wave top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none -mt-1">
          <WaveSvg className="w-full h-10 text-[#fffde7]" style={{ display: "block" }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 pt-4">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Destinations</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00897b] mb-4 tracking-tight leading-tight">
              Your Next Escape
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Cards built with rounded-2xl, colorful teal shadows, and group-hover scale effects that feel as alive as the tropics.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <RevealBlock key={dest.title} delay={i * 0.1}>
                <div className="group relative p-7 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.1)] hover:shadow-[0_8px_32px_rgba(0,137,123,0.22)] hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col">
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ backgroundColor: dest.accentColor }}
                  />

                  {/* Dots row */}
                  <div className="flex items-center gap-1.5 mb-5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6f61]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffc107]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
                    <span className="ml-auto text-xs font-bold uppercase tracking-wide" style={{ color: dest.accentColor }}>
                      {dest.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#00897b] mb-3 group-hover:text-[#ff6f61] transition-colors duration-300 leading-tight">
                    {dest.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                    {dest.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#00897b]/10">
                    <span className="text-[#ff6f61] font-bold text-sm">{dest.price}</span>
                    <button
                      className="px-4 py-2 text-xs font-bold text-white rounded-full transition-all duration-300"
                      style={{ backgroundColor: dest.accentColor }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. Typography ===== */}
      <section id="typography" className="py-24 md:py-32 px-6 md:px-12 bg-[#fffde7] relative overflow-hidden">
        {/* Palm accent */}
        <div className="absolute top-12 right-8 pointer-events-none opacity-20">
          <PalmLeafSvg style={{ width: "100px", height: "170px", transform: "rotate(10deg) scaleX(-1)" }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Typography</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00897b] mb-4 tracking-tight leading-tight">
              Bold Island Voice
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Roomy, bold letterforms that radiate warmth and confidence — never condensed, never cold.
            </p>
          </RevealBlock>

          <div className="space-y-4">
            {typographyScale.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.07}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-5 px-6 md:px-8 rounded-2xl bg-white border border-[#00897b]/12 shadow-[0_2px_10px_rgba(0,137,123,0.06)] hover:shadow-[0_4px_20px_rgba(0,137,123,0.12)] transition-all duration-300">
                  <div className="md:w-24 flex-shrink-0">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffc107]">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="leading-tight truncate"
                      style={{
                        fontSize: item.size,
                        fontWeight: item.weight,
                        color: item.color,
                        lineHeight: 1.15,
                      }}
                    >
                      {item.sample}
                    </p>
                  </div>
                  <div className="md:w-40 flex-shrink-0">
                    <p className="text-xs text-gray-400">
                      {item.size} / weight {item.weight}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Pairing example */}
          <RevealBlock delay={0.4} className="mt-10">
            <div className="p-8 md:p-10 bg-white rounded-2xl border border-[#00897b]/12 shadow-[0_4px_20px_rgba(0,137,123,0.1)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(255,193,7,0.1), transparent 70%)" }} />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-4">Real-World Pairing</p>
              <h3 className="text-4xl md:text-5xl font-bold text-[#00897b] leading-tight tracking-tight mb-3">
                Book Your <span className="text-[#ff6f61]">Dream</span> Island
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                Bold teal headlines anchor the hierarchy. Coral accents spark desire. Body copy breathes in open leading, never rushed.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. Design Principles (Do / Don't) ===== */}
      <section id="principles" className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Wave top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none -mt-1">
          <WaveSvg className="w-full h-10 text-[#fffde7]" style={{ display: "block" }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 pt-4">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Principles</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00897b] mb-4 tracking-tight leading-tight">
              The Island Code
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Rules for keeping the tropical spirit alive — what to embrace and what to leave on the mainland.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Do column */}
            <RevealBlock delay={0.05}>
              <div className="p-8 rounded-2xl bg-[#00897b]/5 border-2 border-[#00897b]/20 shadow-[0_4px_20px_rgba(0,137,123,0.08)] h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-8 h-8 rounded-full bg-[#00897b] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#00897b]">Bring to the Beach</h3>
                </div>

                <div className="space-y-4">
                  {doRules.map((rule, i) => (
                    <div key={i} className="group p-4 bg-white rounded-2xl border border-[#00897b]/15 shadow-[0_2px_8px_rgba(0,137,123,0.06)] hover:shadow-[0_4px_14px_rgba(0,137,123,0.14)] hover:scale-[1.01] transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#4caf50]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#4caf50] text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                        </span>
                        <div>
                          <p className="text-sm font-bold text-[#00897b] mb-1">{rule.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{rule.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Don't column */}
            <RevealBlock delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#ff6f61]/5 border-2 border-[#ff6f61]/20 shadow-[0_4px_20px_rgba(255,111,97,0.08)] h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-8 h-8 rounded-full bg-[#ff6f61] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#ff6f61]">Leave on the Mainland</h3>
                </div>

                <div className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <div key={i} className="group p-4 bg-white rounded-2xl border border-[#ff6f61]/15 shadow-[0_2px_8px_rgba(255,111,97,0.06)] hover:shadow-[0_4px_14px_rgba(255,111,97,0.12)] hover:scale-[1.01] transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#ff6f61]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#ff6f61] text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                        </span>
                        <div>
                          <p className="text-sm font-bold text-[#ff6f61] mb-1">{rule.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{rule.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Manifesto card */}
          <RevealBlock delay={0.2}>
            <div
              className="relative p-10 md:p-12 rounded-2xl text-center overflow-hidden shadow-[0_4px_24px_rgba(0,137,123,0.18)]"
              style={{ background: "linear-gradient(135deg, #00897b 0%, #4caf50 60%, #ffc107 100%)" }}
            >
              {/* Decoration */}
              <div className="absolute top-0 right-0 pointer-events-none opacity-20">
                <PalmLeafSvg style={{ width: "80px", height: "130px" }} />
              </div>
              <div className="absolute top-4 left-8 pointer-events-none opacity-30">
                <TropicalFlowerSvg style={{ width: "50px", height: "50px" }} />
              </div>

              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed max-w-2xl mx-auto relative z-10">
                "Every interaction should feel like stepping off a plane in paradise — warm, vibrant, and full of the promise of adventure."
              </p>
              <span className="mt-5 block text-xs font-bold uppercase tracking-[0.2em] text-white/60 relative z-10">
                Tropical Paradise Design Principle
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Interactive Booking Panel ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#fffde7] relative overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,137,123,0.08), transparent 65%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,193,7,0.1), transparent 65%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffc107] mb-3">Reserve</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#00897b] mb-4 tracking-tight leading-tight">
              Book Your Paradise
            </h2>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              A form built with rounded-full inputs, teal focus rings, and a mango submit button.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="relative p-8 md:p-10 rounded-2xl bg-white border border-[#00897b]/15 shadow-[0_4px_20px_rgba(0,137,123,0.12)] overflow-hidden">
              {/* Corner palm */}
              <div className="absolute bottom-0 right-0 pointer-events-none opacity-10">
                <PalmLeafSvg style={{ width: "120px", height: "200px" }} />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-5 py-3.5 bg-[#fffde7] border-2 border-[#00897b]/20 rounded-full text-gray-700 placeholder-[#00897b]/35 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@paradise.com"
                      className="w-full px-5 py-3.5 bg-[#fffde7] border-2 border-[#00897b]/20 rounded-full text-gray-700 placeholder-[#00897b]/35 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">Choose Destination</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Bali", "Maldives", "Costa Rica"].map((dest) => (
                      <button
                        key={dest}
                        className="py-3 text-sm font-bold text-[#00897b] bg-[#fffde7] rounded-full border-2 border-[#00897b]/20 hover:border-[#00897b] hover:bg-[#00897b]/8 hover:scale-105 transition-all duration-300"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#00897b] mb-2">Special Wishes</label>
                  <textarea
                    placeholder="Tell us about your dream tropical escape..."
                    rows={3}
                    className="w-full px-5 py-3.5 bg-[#fffde7] border-2 border-[#00897b]/20 rounded-2xl text-gray-700 placeholder-[#00897b]/35 font-medium focus:border-[#00897b] focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)] focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 py-4 text-white text-sm font-bold rounded-full shadow-[0_4px_20px_rgba(0,137,123,0.3)] hover:shadow-[0_6px_24px_rgba(0,137,123,0.4)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #00897b, #4caf50)" }}
                  >
                    Reserve My Escape
                  </button>
                  <button className="px-6 py-4 text-sm font-bold text-[#00897b] bg-transparent rounded-full border-2 border-[#00897b]/25 hover:border-[#00897b] hover:scale-105 transition-all duration-300">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative py-16 px-6 md:px-12 overflow-hidden" style={{ background: "linear-gradient(135deg, #00897b 0%, #4caf50 100%)" }}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none -mt-1">
          <WaveSvg className="w-full h-10 text-[#fffde7]" style={{ display: "block" }} />
        </div>
        <div className="absolute bottom-4 right-8 pointer-events-none opacity-20">
          <PalmLeafSvg style={{ width: "80px", height: "130px" }} />
        </div>
        <div className="absolute top-8 left-12 pointer-events-none opacity-25">
          <SunSvg style={{ width: "60px", height: "60px" }} />
        </div>
        <div className="absolute bottom-8 left-[40%] pointer-events-none opacity-20">
          <TropicalFlowerSvg style={{ width: "50px", height: "50px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
            {/* Brand */}
            <div className="text-center md:text-left">
              <p className="text-xl font-bold text-white tracking-tight mb-1">Tropical Paradise</p>
              <p className="text-sm text-white/60">Part of StyleKit — a living collection of design systems</p>
            </div>

            {/* Color dots */}
            <div className="flex items-center gap-3">
              {["#00897b", "#fffde7", "#ff6f61", "#ffc107", "#4caf50"].map((c) => (
                <div
                  key={c}
                  className="w-6 h-6 rounded-full border-2 border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/tropical-paradise"
                className="text-xs font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-xs font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/"
                className="px-5 py-2 text-xs font-bold text-[#00897b] bg-[#fffde7] rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
              >
                StyleKit
              </Link>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              Tropical Paradise Showcase — StyleKit Component Library
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>Ocean Teal</span>
              <span>·</span>
              <span>Coral Sunset</span>
              <span>·</span>
              <span>Mango Yellow</span>
              <span>·</span>
              <span>Palm Green</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
