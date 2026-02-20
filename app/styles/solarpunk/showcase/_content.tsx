"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    id: "ecology",
    label: "Ecology",
    title: "In harmony with the living world",
    desc: "Every design decision is rooted in the natural systems that sustain life. Organic curves mirror the growth patterns of plants. Colors are drawn from leaves, soil, and sunlight — not factories.",
    detail: "Nature is not a backdrop. It is the architecture.",
    primaryColor: "#4ade80",
    secondaryColor: "#86efac",
    accentColor: "#166534",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path
          d="M20 36 C20 36 5 26 5 15 C5 9 11 4 20 7 C29 4 35 9 35 15 C35 26 20 36 20 36Z"
          fill="#4ade80"
          opacity="0.85"
        />
        <path
          d="M20 36 C20 36 13 23 13 15 C13 11 16 8 20 7 C24 8 27 11 27 15 C27 23 20 36 20 36Z"
          fill="#166534"
          opacity="0.4"
        />
        <line x1="20" y1="36" x2="20" y2="22" stroke="#166534" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    id: "community",
    label: "Community",
    title: "Designed for people, not profit",
    desc: "Solarpunk rejects the myth of the lone genius. Every interface is a commons — accessible, legible, welcoming. Warm yellows signal safety. Rounded corners invite, never intimidate.",
    detail: "Mutual aid is encoded in every component.",
    primaryColor: "#fbbf24",
    secondaryColor: "#fde68a",
    accentColor: "#92400e",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="14" cy="13" r="5" fill="#fbbf24" opacity="0.9" />
        <circle cx="26" cy="13" r="5" fill="#fbbf24" opacity="0.65" />
        <path
          d="M4 32 C4 24 8 19 14 19 C20 19 24 24 24 32"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M22 28 C22 22 25 19 26 19 C32 19 36 24 36 32"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    id: "technology",
    label: "Technology",
    title: "Tools that serve the commons",
    desc: "Solarpunk is not anti-technology. It channels ingenuity toward renewable systems. Solar panel grid patterns as visual texture. Circuits that feed communities rather than exploit them.",
    detail: "Technology in service of life, not against it.",
    primaryColor: "#38bdf8",
    secondaryColor: "#7dd3fc",
    accentColor: "#0c4a6e",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="5" y="8" width="30" height="20" rx="2" fill="#38bdf8" opacity="0.18" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="15" y1="8" x2="15" y2="28" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <line x1="25" y1="8" x2="25" y2="28" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <line x1="5" y1="15" x2="35" y2="15" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <line x1="5" y1="22" x2="35" y2="22" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        <path d="M16 30 L24 30 L22 37 L18 37 Z" fill="#38bdf8" opacity="0.5" />
        <line x1="11" y1="37" x2="29" y2="37" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

const colorSystem = [
  { name: "Vibrant Green", value: "#4ade80", label: "Primary", blobRadius: "60% 40% 50% 50% / 50% 60% 40% 50%" },
  { name: "Solar Gold", value: "#fbbf24", label: "Secondary", blobRadius: "45% 55% 60% 40% / 55% 45% 50% 50%" },
  { name: "Sky Blue", value: "#38bdf8", label: "Accent", blobRadius: "55% 45% 40% 60% / 40% 60% 55% 45%" },
  { name: "Earth Brown", value: "#a16207", label: "Grounding", blobRadius: "50% 50% 60% 40% / 60% 40% 50% 50%" },
  { name: "Warm Cream", value: "#fef3c7", label: "Background", blobRadius: "40% 60% 45% 55% / 50% 50% 60% 40%", border: "#fbbf2450" },
];

const communityStats = [
  {
    value: "342 MW",
    label: "Solar Generated",
    sub: "across 14 community arrays",
    color: "#fbbf24",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="6" fill="#fbbf24" opacity="0.9" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="26" x2="16" y2="30" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="16" x2="6" y2="16" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="16" x2="30" y2="16" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="6.34" y1="6.34" x2="9.17" y2="9.17" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="22.83" y1="22.83" x2="25.66" y2="25.66" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="25.66" y1="6.34" x2="22.83" y2="9.17" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="9.17" y1="22.83" x2="6.34" y2="25.66" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "12,847 kg",
    label: "CO\u2082 Avoided",
    sub: "equivalent to 512 trees",
    color: "#4ade80",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path
          d="M16 28 C16 28 4 20 4 12 C4 7 9 3 16 5 C23 3 28 7 28 12 C28 20 16 28 16 28Z"
          fill="#4ade80"
          opacity="0.8"
        />
        <line x1="16" y1="28" x2="16" y2="17" stroke="#166534" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    value: "89",
    label: "Community Gardens",
    sub: "feeding 4,200+ households",
    color: "#4ade80",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect x="4" y="20" width="24" height="4" rx="2" fill="#a16207" opacity="0.6" />
        <path
          d="M10 20 C10 14 8 10 12 8 C14 7 16 9 16 9 C16 9 18 7 20 8 C24 10 22 14 22 20"
          fill="#4ade80"
          opacity="0.75"
        />
        <line x1="16" y1="20" x2="16" y2="10" stroke="#166534" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    value: "2,341",
    label: "Members",
    sub: "across 6 bioregions",
    color: "#38bdf8",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="11" cy="11" r="4" fill="#38bdf8" opacity="0.85" />
        <circle cx="21" cy="11" r="4" fill="#38bdf8" opacity="0.6" />
        <path
          d="M3 26 C3 20 7 17 11 17 C15 17 19 20 19 26"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M18 23 C18 18 21 17 21 17 C25 17 29 20 29 26"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

const seedsRules = [
  "Rounded-full and rounded-2xl shapes — everything has gentle curves",
  "Lush greens and warm golden yellows as the dominant palette",
  "Organic SVG decorations: leaves, vines, sun rays, plant silhouettes",
  "Gradients that evoke natural light — warm at top, cool at the edges",
  "Hover states that breathe: scale-[1.02] with a slight rotate",
  "Solar panel grid textures as subtle background patterns",
];

const weedsRules = [
  "Sharp right-angle corners — nothing in nature is perfectly square",
  "Cold greys and industrial blues without warmth",
  "Hard drop shadows — prefer soft glows and ambient light",
  "Dense, data-heavy layouts without breathing room",
  "Neon or acid colors that feel synthetic and aggressive",
  "Purely decorative animations with no meaningful purpose",
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
/* ------------------------------------------------------------------ */

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      options
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold text-[#4ade80]/70 tracking-[0.22em] uppercase block mb-3">
      {children}
    </span>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-bold text-[#14532d] mb-4 leading-tight ${className}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {children}
    </h2>
  );
}

function LeafAccent({
  top,
  left,
  right,
  bottom,
  size = "40px",
  color = "#4ade80",
  opacity = "0.18",
  rotation = "0deg",
  shape = "0 100% 0 100%",
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: string;
  color?: string;
  opacity?: string;
  rotation?: string;
  shape?: string;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        borderRadius: shape,
        transform: `rotate(${rotation})`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"Seeds" | "Sprouts" | "Bloom">("Seeds");
  const [activePillar, setActivePillar] = useState<"ecology" | "community" | "technology">("ecology");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // heroInView is declared for potential future use with the hero section
  void heroInView;

  const currentPillar = pillars.find((p) => p.id === activePillar)!;

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#f0fdf4", color: "#14532d" }}
    >

      {/* ===== Navigation ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: "#fef3c7ee", borderColor: "#4ade8025" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Back link */}
            <Link
              href="/styles"
              className="text-sm font-medium flex items-center gap-1.5 transition-colors duration-300"
              style={{ color: "#a16207" }}
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M12 22 C12 22 3 16 3 9 C3 5 7 2 12 4 C17 2 21 5 21 9 C21 16 12 22 12 22Z"
                  fill="#4ade80"
                />
                <line x1="12" y1="22" x2="12" y2="12" stroke="#166534" strokeWidth="1.2" />
              </svg>
              <span
                className="font-bold text-base md:text-lg tracking-wide"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #16a34a 0%, #4ade80 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Solarpunk
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/solarpunk"
                className="text-xs font-medium tracking-wide transition-colors duration-300"
                style={{ color: "#a1620760" }}
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs font-medium tracking-wide transition-colors duration-300"
                style={{ color: "#a1620760" }}
              >
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section
        className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 30%, #4ade8030 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #fbbf2420 0%, transparent 50%), #f0fdf4",
        }}
      >
        {/* Central sun glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "8%",
            right: "12%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 45% 45%, #fef08a 0%, #fbbf24 35%, #f59e0b 60%, transparent 80%)",
            opacity: 0.35,
            filter: "blur(8px)",
          }}
        />

        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute pointer-events-none"
            style={{
              top: "8%",
              right: "12%",
              width: "280px",
              height: "280px",
              transform: `rotate(${deg}deg)`,
              transformOrigin: "center center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-42px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "3px",
                height: "38px",
                background: "linear-gradient(to bottom, #fbbf24, transparent)",
                opacity: 0.28,
                borderRadius: "2px",
              }}
            />
          </div>
        ))}

        {/* Leaf decorations */}
        <LeafAccent top="18%" left="4%" size="64px" color="#4ade80" opacity="0.2" rotation="25deg" shape="0 100% 0 100%" />
        <LeafAccent top="60%" left="2%" size="44px" color="#fbbf24" opacity="0.18" rotation="-20deg" shape="100% 0 100% 0" />
        <LeafAccent top="78%" right="6%" size="52px" color="#4ade80" opacity="0.15" rotation="35deg" shape="0 100% 0 100%" />
        <LeafAccent top="35%" right="4%" size="36px" color="#38bdf8" opacity="0.15" rotation="-12deg" shape="100% 0 100% 0" />
        <LeafAccent bottom="8%" left="12%" size="30px" color="#a16207" opacity="0.12" rotation="18deg" shape="0 100% 0 100%" />

        {/* Vine SVG left side */}
        <svg
          viewBox="0 0 60 300"
          fill="none"
          className="absolute left-0 top-32 h-[320px] pointer-events-none"
          style={{ opacity: 0.13 }}
        >
          <path
            d="M30 300 C10 260 50 220 30 180 C10 140 50 100 30 60 C20 30 35 10 30 0"
            stroke="#4ade80"
            strokeWidth="2.5"
            fill="none"
          />
          <ellipse cx="16" cy="160" rx="14" ry="9" fill="#4ade80" transform="rotate(-30 16 160)" />
          <ellipse cx="44" cy="100" rx="14" ry="9" fill="#4ade80" transform="rotate(25 44 100)" />
          <ellipse cx="18" cy="220" rx="12" ry="8" fill="#4ade80" transform="rotate(-15 18 220)" />
        </svg>

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto w-full py-20">
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
              color: "#16a34a99",
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              display: "block",
            }}
          >
            A design language for the world we want
          </p>

          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(4rem, 11vw, 9rem)",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #15803d 0%, #4ade80 50%, #16a34a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Solarpunk
          </h1>

          <p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{
              color: "#166534",
              opacity: heroRevealed ? 0.65 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Building a better tomorrow, together
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <button
              className="px-10 py-4 font-semibold rounded-full transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(74,222,128,0.35)]"
              style={{
                background: "linear-gradient(135deg, #16a34a 0%, #4ade80 100%)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(74,222,128,0.28)",
              }}
            >
              Explore the Style
            </button>
            <button
              className="px-10 py-4 font-medium rounded-full border-2 transition-all duration-500 hover:bg-[#4ade8010]"
              style={{ borderColor: "#4ade8045", color: "#16a34a" }}
            >
              Read the Manifesto
            </button>
          </div>
        </div>
      </section>

      {/* ===== Manifesto / Pillars Section ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#fef3c7" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, #4ade8012 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, #38bdf810 0%, transparent 50%)",
          }}
        />
        <LeafAccent top="10%" right="8%" size="56px" color="#4ade80" opacity="0.16" rotation="18deg" shape="0 100% 0 100%" />
        <LeafAccent bottom="12%" left="6%" size="48px" color="#fbbf24" opacity="0.14" rotation="-25deg" shape="100% 0 100% 0" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <SectionLabel>The Manifesto</SectionLabel>
            <SectionHeading>Three pillars of Solarpunk</SectionHeading>
            <p className="max-w-lg mx-auto leading-relaxed" style={{ color: "#a16207", opacity: 0.8 }}>
              These are the values encoded in every curve, every color, every component of this design system.
            </p>
          </RevealBlock>

          {/* Pillar tab switcher */}
          <RevealBlock delay={0.08} className="flex justify-center gap-3 mb-10 flex-wrap">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id as typeof activePillar)}
                className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor:
                    activePillar === p.id ? p.primaryColor : `${p.primaryColor}35`,
                  backgroundColor:
                    activePillar === p.id ? `${p.primaryColor}18` : "transparent",
                  color: activePillar === p.id ? p.primaryColor : "#a16207",
                }}
              >
                {p.label}
              </button>
            ))}
          </RevealBlock>

          {/* 3-column pillar cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <RevealBlock key={pillar.id} delay={i * 0.1}>
                <div
                  className="relative p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-rotate-1"
                  style={{
                    background: `linear-gradient(135deg, ${pillar.primaryColor}18 0%, ${pillar.secondaryColor}10 100%)`,
                    border: `1.5px solid ${pillar.primaryColor}30`,
                    boxShadow:
                      activePillar === pillar.id
                        ? `0 8px 32px ${pillar.primaryColor}25`
                        : "none",
                    transform: activePillar === pillar.id ? "scale(1.02)" : "scale(1)",
                  }}
                  onClick={() => setActivePillar(pillar.id as typeof activePillar)}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${pillar.primaryColor}22` }}
                  >
                    {pillar.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "Georgia, serif", color: pillar.accentColor }}
                  >
                    {pillar.label}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#166534", opacity: 0.75 }}>
                    {pillar.desc}
                  </p>
                  <p
                    className="text-xs italic border-l-2 pl-3 leading-relaxed"
                    style={{ borderColor: `${pillar.primaryColor}55`, color: pillar.primaryColor }}
                  >
                    {pillar.detail}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Expanded pillar detail */}
          <RevealBlock delay={0.2} className="mt-8">
            <div
              className="p-10 rounded-2xl border"
              style={{
                backgroundColor: `${currentPillar.primaryColor}08`,
                borderColor: `${currentPillar.primaryColor}25`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentPillar.primaryColor}25` }}
                >
                  {currentPillar.icon}
                </div>
                <h4
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Georgia, serif", color: currentPillar.accentColor }}
                >
                  {currentPillar.title}
                </h4>
              </div>
              <p className="leading-relaxed max-w-2xl" style={{ color: "#166534", opacity: 0.7 }}>
                {currentPillar.desc} {currentPillar.detail}
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color System ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#f0fdf4" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, #4ade8010 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, #fbbf2410 0%, transparent 50%)",
          }}
        />
        <LeafAccent top="20%" left="5%" size="50px" color="#4ade80" opacity="0.15" rotation="30deg" shape="0 100% 0 100%" />
        <LeafAccent bottom="15%" right="5%" size="42px" color="#fbbf24" opacity="0.14" rotation="-22deg" shape="100% 0 100% 0" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Color System</SectionLabel>
            <SectionHeading>Colors drawn from living systems</SectionHeading>
            <p className="max-w-md mx-auto leading-relaxed" style={{ color: "#166534", opacity: 0.65 }}>
              Every hue has an ecological reference. Nothing synthetic, nothing harsh — only the colors the planet already knows.
            </p>
          </RevealBlock>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {colorSystem.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.09} className="flex flex-col items-center gap-3">
                {/* Organic blob */}
                <div
                  className="w-28 h-28 md:w-32 md:h-32 transition-all duration-700 hover:scale-110"
                  style={{
                    backgroundColor: color.value,
                    borderRadius: color.blobRadius,
                    border: color.border ? `2px solid ${color.border}` : "none",
                    boxShadow: `0 6px 24px ${color.value}45`,
                  }}
                />
                <span className="text-sm font-semibold" style={{ color: "#14532d" }}>
                  {color.name}
                </span>
                <span className="text-xs font-mono" style={{ color: "#16a34a80" }}>
                  {color.value}
                </span>
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${color.value}28`, color: "#14532d" }}
                >
                  {color.label}
                </span>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Showcase ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12"
        style={{ backgroundColor: "#fef3c7" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 90% 50%, #4ade8010 0%, transparent 55%)",
          }}
        />
        <LeafAccent top="8%" left="8%" size="44px" color="#4ade80" opacity="0.15" rotation="20deg" shape="0 100% 0 100%" />
        <LeafAccent bottom="10%" right="10%" size="38px" color="#38bdf8" opacity="0.14" rotation="-18deg" shape="100% 0 100% 0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <SectionLabel>Components</SectionLabel>
            <SectionHeading>Living design elements</SectionHeading>
            <p className="max-w-sm mx-auto leading-relaxed" style={{ color: "#a16207", opacity: 0.8 }}>
              Seeds become sprouts, sprouts become bloom. Every component follows the same growth logic.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="flex justify-center gap-3 mb-10">
            {(["Seeds", "Sprouts", "Bloom"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className="px-7 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: componentTab === tab ? "#4ade80" : "#4ade8035",
                  backgroundColor: componentTab === tab ? "#4ade8018" : "transparent",
                  color: componentTab === tab ? "#16a34a" : "#a16207",
                  boxShadow: componentTab === tab ? "0 2px 12px rgba(74,222,128,0.15)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </RevealBlock>

          {/* Component demo area */}
          <RevealBlock delay={0.15}>
            <div
              className="relative p-10 md:p-14 rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "#f0fdf4",
                borderColor: "#4ade8025",
                boxShadow: "0 2px 20px rgba(74,222,128,0.08)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #4ade8012, transparent 70%)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #fbbf2410, transparent 70%)" }}
              />

              <div className="relative z-10 flex flex-col items-center gap-8">

                {componentTab === "Seeds" && (
                  <div className="w-full flex flex-col items-center gap-8">
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                      <button
                        className="px-8 py-3 font-semibold rounded-full transition-all duration-400 hover:scale-[1.04] hover:shadow-[0_6px_24px_rgba(74,222,128,0.35)]"
                        style={{
                          background: "linear-gradient(135deg, #16a34a 0%, #4ade80 100%)",
                          color: "#fff",
                          boxShadow: "0 4px 16px rgba(74,222,128,0.25)",
                        }}
                      >
                        Plant a seed
                      </button>
                      <button
                        className="px-8 py-3 font-semibold rounded-full border-2 transition-all duration-400 hover:bg-[#4ade8012]"
                        style={{ borderColor: "#4ade8055", color: "#16a34a" }}
                      >
                        Learn more
                      </button>
                      <button
                        className="px-8 py-3 font-semibold rounded-full transition-all duration-400 hover:scale-[1.04]"
                        style={{
                          background: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
                          color: "#fff",
                          boxShadow: "0 4px 16px rgba(251,191,36,0.28)",
                        }}
                      >
                        Solar powered
                      </button>
                    </div>

                    {/* Input + badges */}
                    <div className="w-full max-w-md flex flex-col gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#166534" }}>
                          Community name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your bioregion..."
                          className="w-full px-5 py-3 rounded-full border-2 outline-none transition-all duration-400 focus:shadow-[0_0_0_4px_rgba(74,222,128,0.18)]"
                          style={{ backgroundColor: "#fff", borderColor: "#4ade8030", color: "#14532d" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#4ade8080")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#4ade8030")}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Ecology", "Community", "Solar", "Open Source"].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-semibold rounded-full"
                            style={{ backgroundColor: "#4ade8022", color: "#16a34a" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p
                      className="text-xs text-center max-w-xs leading-relaxed"
                      style={{ color: "#a16207", opacity: 0.7 }}
                    >
                      Rounded-full shapes throughout. Green gradient primary, warm yellow secondary. Soft focus rings.
                    </p>
                  </div>
                )}

                {componentTab === "Sprouts" && (
                  <div className="w-full grid sm:grid-cols-2 gap-5">
                    {/* Card 1 */}
                    <div
                      className="group p-7 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-[0_8px_32px_rgba(74,222,128,0.18)]"
                      style={{ backgroundColor: "#fff", borderColor: "#4ade8025" }}
                    >
                      <div
                        className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                        style={{ backgroundColor: "#4ade8022" }}
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                          <path d="M10 18 C10 18 3 13 3 8 C3 5 6 3 10 4 C14 3 17 5 17 8 C17 13 10 18 10 18Z" fill="#4ade80" />
                        </svg>
                      </div>
                      <h3
                        className="text-lg font-bold mb-2 group-hover:text-[#4ade80] transition-colors duration-400"
                        style={{ fontFamily: "Georgia, serif", color: "#14532d" }}
                      >
                        Community Garden
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#166534", opacity: 0.65 }}>
                        Shared growing spaces where neighbors tend living systems together.
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div
                      className="group p-7 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_8px_32px_rgba(251,191,36,0.18)]"
                      style={{ backgroundColor: "#fff", borderColor: "#fbbf2425" }}
                    >
                      <div
                        className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                        style={{ backgroundColor: "#fbbf2422" }}
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                          <circle cx="10" cy="10" r="4" fill="#fbbf24" />
                          <line x1="10" y1="1" x2="10" y2="4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="10" y1="16" x2="10" y2="19" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="1" y1="10" x2="4" y2="10" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="16" y1="10" x2="19" y2="10" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <h3
                        className="text-lg font-bold mb-2 group-hover:text-[#d97706] transition-colors duration-400"
                        style={{ fontFamily: "Georgia, serif", color: "#14532d" }}
                      >
                        Solar Array
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#166534", opacity: 0.65 }}>
                        Distributed energy generation, owned collectively and shared freely.
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div
                      className="group p-7 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-[0_8px_32px_rgba(56,189,248,0.18)]"
                      style={{ backgroundColor: "#fff", borderColor: "#38bdf825" }}
                    >
                      <div
                        className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                        style={{ backgroundColor: "#38bdf822" }}
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                          <rect x="2" y="5" width="16" height="10" rx="2" fill="#38bdf8" opacity="0.25" stroke="#38bdf8" strokeWidth="1.2" />
                          <line x1="7.5" y1="5" x2="7.5" y2="15" stroke="#38bdf8" strokeWidth="0.9" opacity="0.7" />
                          <line x1="12.5" y1="5" x2="12.5" y2="15" stroke="#38bdf8" strokeWidth="0.9" opacity="0.7" />
                          <line x1="2" y1="9.5" x2="18" y2="9.5" stroke="#38bdf8" strokeWidth="0.9" opacity="0.7" />
                        </svg>
                      </div>
                      <h3
                        className="text-lg font-bold mb-2 group-hover:text-[#38bdf8] transition-colors duration-400"
                        style={{ fontFamily: "Georgia, serif", color: "#14532d" }}
                      >
                        Open Tech
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#166534", opacity: 0.65 }}>
                        Technology designed for repair, reuse, and community ownership.
                      </p>
                    </div>

                    {/* Card 4 — featured */}
                    <div
                      className="group p-7 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_8px_32px_rgba(74,222,128,0.22)]"
                      style={{
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        border: "1.5px solid #4ade8030",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                          <path d="M10 18 C10 18 3 13 3 8 C3 5 6 3 10 4 C14 3 17 5 17 8 C17 13 10 18 10 18Z" fill="white" opacity="0.9" />
                        </svg>
                      </div>
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ fontFamily: "Georgia, serif", color: "#fff" }}
                      >
                        Featured Initiative
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                        The dark card variant for highlighted community actions and featured content.
                      </p>
                    </div>
                  </div>
                )}

                {componentTab === "Bloom" && (
                  <div className="w-full">
                    {/* Full hero unit preview */}
                    <div
                      className="relative rounded-2xl overflow-hidden p-10 text-center"
                      style={{
                        background:
                          "radial-gradient(ellipse at 60% 30%, #4ade8025 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #fbbf2415 0%, transparent 50%), #f0fdf4",
                        border: "1.5px solid #4ade8020",
                        minHeight: "260px",
                      }}
                    >
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          top: "5%",
                          right: "8%",
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          background: "radial-gradient(ellipse, #fef08a, #fbbf24 60%, transparent 80%)",
                          opacity: 0.45,
                          filter: "blur(4px)",
                        }}
                      />
                      <LeafAccent top="15%" left="6%" size="28px" color="#4ade80" opacity="0.22" rotation="20deg" shape="0 100% 0 100%" />
                      <LeafAccent bottom="10%" right="8%" size="24px" color="#4ade80" opacity="0.18" rotation="-15deg" shape="100% 0 100% 0" />

                      <div className="relative z-10">
                        <span
                          className="text-xs font-semibold tracking-[0.22em] uppercase block mb-3"
                          style={{ color: "#4ade8099" }}
                        >
                          Full bloom
                        </span>
                        <h3
                          className="text-3xl md:text-4xl font-bold mb-4"
                          style={{
                            fontFamily: "Georgia, serif",
                            background: "linear-gradient(135deg, #15803d 0%, #4ade80 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Hero Component
                        </h3>
                        <p
                          className="mb-8 max-w-md mx-auto leading-relaxed text-sm"
                          style={{ color: "#166534", opacity: 0.65 }}
                        >
                          The bloom state shows a complete hero unit — sun element, leaf decorations, gradient title, and dual CTAs assembled as a cohesive whole.
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                          <button
                            className="px-7 py-3 font-semibold rounded-full text-sm transition-all duration-400 hover:scale-[1.04]"
                            style={{
                              background: "linear-gradient(135deg, #16a34a 0%, #4ade80 100%)",
                              color: "#fff",
                              boxShadow: "0 4px 16px rgba(74,222,128,0.28)",
                            }}
                          >
                            Primary CTA
                          </button>
                          <button
                            className="px-7 py-3 font-semibold rounded-full text-sm border-2 transition-all duration-400 hover:bg-[#4ade8010]"
                            style={{ borderColor: "#4ade8045", color: "#16a34a" }}
                          >
                            Secondary CTA
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-center mt-5 leading-relaxed" style={{ color: "#a16207", opacity: 0.7 }}>
                      Bloom: fully assembled hero with layered radial-gradient background, organic leaf decorations, and dual-action CTAs.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Living Community ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#f0fdf4" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 40%, #fbbf2408 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, #4ade8010 0%, transparent 50%)",
          }}
        />
        <LeafAccent top="12%" right="6%" size="52px" color="#4ade80" opacity="0.16" rotation="28deg" shape="0 100% 0 100%" />
        <LeafAccent bottom="8%" left="4%" size="44px" color="#fbbf24" opacity="0.14" rotation="-20deg" shape="100% 0 100% 0" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Living Community</SectionLabel>
            <SectionHeading>What we have built, together</SectionHeading>
            <p className="max-w-md mx-auto leading-relaxed" style={{ color: "#166534", opacity: 0.65 }}>
              These numbers represent real people, real gardens, real watts of clean energy — a solarpunk world emerging now.
            </p>
          </RevealBlock>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {communityStats.map((stat, i) => (
              <RevealBlock key={stat.label} delay={i * 0.09}>
                <div
                  className="relative p-7 rounded-2xl border-2 cursor-default transition-all duration-400"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: `${stat.color}22`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = `${stat.color}08`;
                    el.style.borderColor = `${stat.color}50`;
                    el.style.boxShadow = `0 6px 24px ${stat.color}18`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "#fff";
                    el.style.borderColor = `${stat.color}22`;
                    el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${stat.color}1a` }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: stat.color, fontFamily: "Georgia, serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#14532d" }}>
                    {stat.label}
                  </div>
                  <div className="text-xs" style={{ color: "#166534", opacity: 0.55 }}>
                    {stat.sub}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Philosophy: Seeds vs. Weeds ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#fef3c7" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, #4ade8010 0%, transparent 55%), radial-gradient(ellipse at 15% 70%, #38bdf808 0%, transparent 50%)",
          }}
        />
        <LeafAccent top="8%" left="6%" size="46px" color="#4ade80" opacity="0.16" rotation="22deg" shape="0 100% 0 100%" />
        <LeafAccent bottom="12%" right="7%" size="40px" color="#fbbf24" opacity="0.13" rotation="-26deg" shape="100% 0 100% 0" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Design Philosophy</SectionLabel>
            <SectionHeading>Seeds vs. Weeds</SectionHeading>
            <p className="max-w-md mx-auto leading-relaxed" style={{ color: "#a16207", opacity: 0.8 }}>
              Some design choices help the community flourish. Others choke it. Know the difference.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Seeds — do */}
            <RevealBlock delay={0.06}>
              <div
                className="relative p-10 rounded-2xl overflow-hidden border-2"
                style={{
                  backgroundColor: "#f0fdf4",
                  borderColor: "#4ade8030",
                  boxShadow: "0 2px 16px rgba(74,222,128,0.08)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 80% 20%, #4ade8018, transparent 70%)" }}
                />
                <LeafAccent bottom="10%" left="6%" size="24px" color="#4ade80" opacity="0.2" rotation="15deg" shape="0 100% 0 100%" />

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#4ade8025" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "Georgia, serif", color: "#16a34a" }}>
                    Seeds (Do)
                  </h3>
                </div>

                <ul className="space-y-4">
                  {seedsRules.map((rule, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed pl-4 border-l-2"
                      style={{ color: "#166534", borderColor: "#4ade8045", opacity: 0.85 }}
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Weeds — don't */}
            <RevealBlock delay={0.12}>
              <div
                className="relative p-10 rounded-2xl overflow-hidden border-2"
                style={{
                  backgroundColor: "#fffbeb",
                  borderColor: "#a1620722",
                  boxShadow: "0 2px 16px rgba(161,98,7,0.06)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 80% 20%, #a1620712, transparent 70%)" }}
                />
                <LeafAccent bottom="10%" left="6%" size="24px" color="#a16207" opacity="0.14" rotation="-18deg" shape="100% 0 100% 0" />

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#a1620718" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "Georgia, serif", color: "#92400e" }}>
                    Weeds (Don&apos;t)
                  </h3>
                </div>

                <ul className="space-y-4">
                  {weedsRules.map((rule, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed pl-4 border-l-2"
                      style={{ color: "#92400e", borderColor: "#a1620735", opacity: 0.75 }}
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy coda */}
          <RevealBlock delay={0.2} className="mt-10">
            <div
              className="relative p-10 rounded-2xl text-center border"
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #fef9c3 100%)",
                borderColor: "#4ade8020",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 20%, #4ade8008, transparent 70%)" }}
              />
              <p
                className="text-xl md:text-2xl font-bold italic leading-relaxed max-w-2xl mx-auto relative z-10"
                style={{ fontFamily: "Georgia, serif", color: "#14532d" }}
              >
                &ldquo;The future is not something that happens to us. It is something we grow — seed by seed, community by community.&rdquo;
              </p>
              <span
                className="mt-5 block text-xs font-semibold tracking-[0.2em] uppercase relative z-10"
                style={{ color: "#4ade8099" }}
              >
                Solarpunk design principle
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        className="relative py-16 px-6 md:px-12 border-t overflow-hidden"
        style={{ backgroundColor: "#fef3c7", borderColor: "#4ade8020" }}
      >
        {/* Vine left */}
        <svg
          viewBox="0 0 80 140"
          fill="none"
          className="absolute left-0 bottom-0 h-[160px] pointer-events-none"
          style={{ opacity: 0.11 }}
        >
          <path d="M40 140 C20 110 60 88 40 65 C20 42 55 18 40 0" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <ellipse cx="22" cy="60" rx="18" ry="11" fill="#4ade80" transform="rotate(-28 22 60)" />
          <ellipse cx="58" cy="100" rx="16" ry="10" fill="#4ade80" transform="rotate(22 58 100)" />
          <ellipse cx="25" cy="22" rx="14" ry="9" fill="#4ade80" transform="rotate(-14 25 22)" />
        </svg>

        {/* Vine right */}
        <svg
          viewBox="0 0 80 140"
          fill="none"
          className="absolute right-0 bottom-0 h-[160px] pointer-events-none"
          style={{ opacity: 0.09, transform: "scaleX(-1)" }}
        >
          <path d="M40 140 C20 110 60 88 40 65 C20 42 55 18 40 0" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
          <ellipse cx="22" cy="60" rx="18" ry="11" fill="#fbbf24" transform="rotate(-28 22 60)" />
          <ellipse cx="58" cy="100" rx="16" ry="10" fill="#fbbf24" transform="rotate(22 58 100)" />
        </svg>

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #4ade8006, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path
                    d="M12 22 C12 22 3 16 3 9 C3 5 7 2 12 4 C17 2 21 5 21 9 C21 16 12 22 12 22Z"
                    fill="#4ade80"
                  />
                  <line x1="12" y1="22" x2="12" y2="12" stroke="#166534" strokeWidth="1.2" />
                </svg>
                <span
                  className="font-bold text-sm tracking-wide"
                  style={{ fontFamily: "Georgia, serif", color: "#16a34a" }}
                >
                  Solarpunk
                </span>
              </div>
              <p className="text-xs font-medium" style={{ color: "#a16207", opacity: 0.6 }}>
                Part of StyleKit — growing a better design commons
              </p>
            </div>

            {/* Blob row */}
            <div className="flex items-center gap-3">
              {colorSystem.map((c) => (
                <div
                  key={c.value}
                  className="w-5 h-5 transition-transform duration-400 hover:scale-125"
                  style={{
                    backgroundColor: c.value,
                    borderRadius: c.blobRadius,
                    boxShadow: `0 2px 8px ${c.value}40`,
                    border: c.border ? `1px solid ${c.border}` : "none",
                  }}
                />
              ))}
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/solarpunk"
                className="text-xs font-medium tracking-wide transition-colors duration-300 hover:text-[#4ade80]"
                style={{ color: "#a1620770" }}
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs font-medium tracking-wide transition-colors duration-300 hover:text-[#4ade80]"
                style={{ color: "#a1620770" }}
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-xs font-medium tracking-wide transition-colors duration-300 hover:text-[#4ade80]"
                style={{ color: "#a1620770" }}
              >
                Home
              </Link>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: "#4ade8015" }}>
            <p className="text-xs" style={{ color: "#a16207", opacity: 0.5 }}>
              &copy; 2026 StyleKit. Built with community and sunlight.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
