"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
/*  Inline SVG Motifs                                                  */
/* ------------------------------------------------------------------ */

function SkullIcon({ color = "#f5a5b8", size = 24, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Skull dome */}
      <path
        d="M16 4C10.477 4 6 8.477 6 14c0 3.3 1.6 6.23 4 8.1V22h12v-.9c2.4-1.87 4-4.8 4-8.1C26 8.477 21.523 4 16 4z"
        fill={color}
        opacity="0.85"
      />
      {/* Jaw */}
      <rect x="10" y="22" width="12" height="5" rx="1.5" fill={color} opacity="0.75" />
      {/* Teeth gaps */}
      <rect x="13" y="22" width="2" height="3" rx="0.5" fill="#1a1225" opacity="0.6" />
      <rect x="17" y="22" width="2" height="3" rx="0.5" fill="#1a1225" opacity="0.6" />
      {/* Eye sockets */}
      <ellipse cx="12.5" cy="14" rx="2.5" ry="3" fill="#1a1225" opacity="0.55" />
      <ellipse cx="19.5" cy="14" rx="2.5" ry="3" fill="#1a1225" opacity="0.55" />
      {/* Nose */}
      <path d="M15 18l1-1.5 1 1.5H15z" fill="#1a1225" opacity="0.45" />
    </svg>
  );
}

function BatIcon({ color = "#d4a5e3", size = 28, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left wing */}
      <path
        d="M20 12 C16 8, 8 6, 2 10 C6 10, 8 12, 10 14 C12 14, 14 13, 16 12"
        fill={color}
        opacity="0.8"
      />
      {/* Right wing */}
      <path
        d="M20 12 C24 8, 32 6, 38 10 C34 10, 32 12, 30 14 C28 14, 26 13, 24 12"
        fill={color}
        opacity="0.8"
      />
      {/* Left ear */}
      <path d="M8 10 L6 5 L11 9" fill={color} opacity="0.7" />
      {/* Right ear */}
      <path d="M32 10 L34 5 L29 9" fill={color} opacity="0.7" />
      {/* Body */}
      <ellipse cx="20" cy="13" rx="4" ry="3" fill={color} opacity="0.9" />
      {/* Eyes */}
      <circle cx="18.5" cy="12.5" r="0.8" fill="#1a1225" />
      <circle cx="21.5" cy="12.5" r="0.8" fill="#1a1225" />
    </svg>
  );
}

function CrescentMoonIcon({ color = "#b8a5f5", size = 28, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 14c0 5.523-4.477 10-10 10A9.978 9.978 0 016 21.528C7.105 22.458 8.49 23 10 23c4.418 0 8-3.582 8-8 0-3.16-1.838-5.903-4.528-7.235A9.96 9.96 0 0120 14z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M14 4c0 3.314-2.686 6-6 6-.735 0-1.44-.132-2.092-.374A9.966 9.966 0 0110 8c3.314 0 6-2.686 6-6 0-.735-.132-1.44-.374-2.092A9.966 9.966 0 0114 4z"
        fill={color}
        opacity="0.5"
      />
    </svg>
  );
}

function StarIcon({ color = "#7ec8c8", size = 16, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 1l2.39 6.11H19l-5.3 3.86 2.02 6.2L10 13.3l-5.72 3.87 2.02-6.2L1 7.11h6.61z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

function SparkleIcon({ color = "#f5a5b8", size = 14, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 0 L9 6 L15 8 L9 10 L8 16 L7 10 L1 8 L7 6 Z" fill={color} opacity="0.9" />
    </svg>
  );
}

function CrossIcon({ color = "#d4a5e3", size = 18, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="7" y="0" width="4" height="18" rx="1.5" fill={color} opacity="0.8" />
      <rect x="0" y="5" width="18" height="4" rx="1.5" fill={color} opacity="0.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteColors = [
  {
    name: "Deep Purple",
    hex: "#2d1b3d",
    description: "The void from which all pastels emerge",
    textColor: "#d4a5e3",
  },
  {
    name: "Near Black",
    hex: "#1a1225",
    description: "Midnight plum — darker than shadow",
    textColor: "#b8a5f5",
  },
  {
    name: "Lavender",
    hex: "#d4a5e3",
    description: "The primary candy highlight",
    textColor: "#2d1b3d",
  },
  {
    name: "Mint Blue",
    hex: "#7ec8c8",
    description: "Cool teal whisper from the void",
    textColor: "#1a1225",
  },
  {
    name: "Soft Pink",
    hex: "#f5a5b8",
    description: "Rose-candy blush, skull-sweet",
    textColor: "#2d1b3d",
  },
  {
    name: "Periwinkle",
    hex: "#b8a5f5",
    description: "Between violet and indigo dreams",
    textColor: "#1a1225",
  },
];

const doRules = [
  "Deep purple bg `#2d1b3d` and near-black `#1a1225`",
  "Lavender and mint for all primary text",
  "`rounded-2xl` for softness against dark backgrounds",
  "Pastel glow shadows with rgba opacity 0.2–0.35",
  "Skull, bat, moon, star SVG motifs in pastel colors",
  "Pastel glowing borders at 30–60% on hover",
  "Dark glass cards with soft-colored border glow",
  "Creepy-cute copy: mix gothic and candy tone",
];

const dontRules = [
  "No light or white backgrounds anywhere",
  "No fully saturated black-only gothic palette",
  "No harsh neons or oversaturated accent colors",
  "No corporate or professional visual language",
  "No border-2 or thicker hard borders",
  "No rounded-none — always preserve softness",
  "No bright white text — use tinted pastels only",
  "No flat, lifeless shadows without glow",
];

const cardItems = [
  {
    icon: "skull",
    title: "Creepy Cute",
    desc: "Gothic symbols rendered in candy-soft pastels. The skull smiles in rose pink; the bat sleeps in lavender. Darkness made adorable.",
    color: "#f5a5b8",
    borderColor: "#f5a5b8",
    glow: "rgba(245,165,184,0.2)",
  },
  {
    icon: "moon",
    title: "Witching Hour",
    desc: "The crescent moon rises in periwinkle over a deep purple sky. Midnight has never looked so soft, so inviting, so strange.",
    color: "#b8a5f5",
    borderColor: "#b8a5f5",
    glow: "rgba(184,165,245,0.2)",
  },
  {
    icon: "bat",
    title: "Twilight Swarm",
    desc: "Lavender bats drift through the near-black void. Their wings catch no light — they are made of it. Pastel creatures of the dark.",
    color: "#d4a5e3",
    borderColor: "#d4a5e3",
    glow: "rgba(212,165,227,0.2)",
  },
];

const typeScaleItems = [
  { size: "clamp(3rem,8vw,6rem)", label: "Display", weight: "700", color: "#d4a5e3", text: "Pastel Goth" },
  { size: "2.5rem", label: "H1", weight: "700", color: "#d4a5e3", text: "Creepy Cute Aesthetic" },
  { size: "1.875rem", label: "H2", weight: "700", color: "#b8a5f5", text: "Born from Tumblr Darkness" },
  { size: "1.25rem", label: "H3", weight: "600", color: "#7ec8c8", text: "Where shadows bloom in pastel light" },
  { size: "1rem", label: "Body", weight: "400", color: "#d4a5e3", text: "Gothic darkness meets candy-sweet aesthetics in one hauntingly beautiful style." },
  { size: "0.75rem", label: "Caption", weight: "700", color: "#b8a5f5", text: "MIDNIGHT WHISPERINGS FROM THE VOID" },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1225] text-[#d4a5e3] font-sans overflow-x-hidden">

      {/* ===== Ambient background glow orbs (fixed) ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "8%",
            width: "380px",
            height: "380px",
            background: "radial-gradient(ellipse, rgba(212,165,227,0.06), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "20%",
            right: "10%",
            width: "320px",
            height: "320px",
            background: "radial-gradient(ellipse, rgba(126,200,200,0.05), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(184,165,245,0.04), transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "70%",
            left: "15%",
            width: "240px",
            height: "240px",
            background: "radial-gradient(ellipse, rgba(245,165,184,0.04), transparent 70%)",
          }}
        />
      </div>

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1225]/90 backdrop-blur-md border-b border-[#d4a5e3]/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Left: back link */}
            <Link
              href="/"
              className="flex items-center gap-2 text-[#b8a5f5]/50 hover:text-[#d4a5e3] transition-colors duration-300 text-sm font-bold tracking-wide group"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>StyleKit</span>
              <span className="text-[#d4a5e3]/30 group-hover:text-[#d4a5e3]/60 transition-colors duration-300">→</span>
            </Link>

            {/* Center: brand */}
            <div className="flex items-center gap-3">
              <SkullIcon color="#f5a5b8" size={18} />
              <span className="font-bold text-base tracking-widest text-[#d4a5e3]">
                Pastel Goth
              </span>
              <SparkleIcon color="#7ec8c8" size={12} />
            </div>

            {/* Right: nav links */}
            <nav className="flex items-center gap-5">
              <Link
                href="/styles/pastel-goth"
                className="text-xs font-bold tracking-wide text-[#b8a5f5]/35 hover:text-[#d4a5e3] transition-colors duration-300"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs font-bold tracking-wide px-4 py-2 border border-[#7ec8c8]/20 rounded-xl text-[#7ec8c8] hover:border-[#7ec8c8]/50 hover:shadow-[0_0_12px_rgba(126,200,200,0.2)] transition-all duration-300"
              >
                All Styles
              </Link>
            </nav>

          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative pt-32 md:pt-44 pb-28 px-6 md:px-12 overflow-hidden min-h-screen flex items-center z-10">

        {/* Hero bg gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 40%, rgba(45,27,61,0.8) 0%, transparent 60%), radial-gradient(ellipse at 75% 60%, rgba(26,18,37,0.9) 0%, transparent 55%)",
          }}
        />

        {/* Floating SVG decorations */}
        <div className="absolute top-24 right-16 opacity-40">
          <BatIcon color="#d4a5e3" size={52} />
        </div>
        <div className="absolute top-36 right-36 opacity-25">
          <BatIcon color="#b8a5f5" size={32} />
        </div>
        <div className="absolute top-28 left-12 opacity-30">
          <CrescentMoonIcon color="#b8a5f5" size={44} />
        </div>
        <div className="absolute bottom-32 left-20 opacity-25">
          <StarIcon color="#7ec8c8" size={20} />
        </div>
        <div className="absolute bottom-40 right-20 opacity-20">
          <SkullIcon color="#f5a5b8" size={36} />
        </div>
        <div className="absolute top-1/2 right-8 opacity-15">
          <CrossIcon color="#d4a5e3" size={22} />
        </div>
        <div className="absolute bottom-24 left-1/3 opacity-20">
          <SparkleIcon color="#f5a5b8" size={16} />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15">
          <SparkleIcon color="#7ec8c8" size={12} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">

          {/* Eyebrow */}
          <div
            className="flex items-center justify-center gap-3 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <SkullIcon color="#f5a5b8" size={14} />
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8a5f5]/50 uppercase">
              Born from 2010s Tumblr
            </span>
            <SkullIcon color="#f5a5b8" size={14} />
          </div>

          {/* Main title */}
          <h1
            className="font-bold leading-none tracking-tight mb-4"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #d4a5e3 0%, #f5a5b8 50%, #b8a5f5 100%)",
              }}
            >
              Pastel
            </span>
          </h1>

          <h1
            className="font-bold leading-none tracking-tight mb-10"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #7ec8c8 0%, #b8a5f5 100%)",
                WebkitTextStroke: "0px",
                filter: "drop-shadow(0 0 24px rgba(126,200,200,0.25))",
              }}
            >
              Goth
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="text-lg md:text-xl text-[#7ec8c8]/60 max-w-2xl mx-auto leading-relaxed mb-14"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            Gothic darkness wrapped in candy-soft pastels. Where skulls smile in rose pink, bats flutter in lavender, and the void smells like cotton candy.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.46s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.46s",
            }}
          >
            <button
              className="px-8 py-3.5 bg-[#2d1b3d] text-[#d4a5e3] font-bold tracking-wide rounded-2xl border border-[#d4a5e3]/30 shadow-[0_4px_20px_rgba(212,165,227,0.25)] hover:shadow-[0_4px_32px_rgba(212,165,227,0.45)] hover:border-[#d4a5e3]/60 transition-all duration-300"
            >
              Explore the Style
            </button>
            <button
              className="px-8 py-3.5 bg-transparent text-[#7ec8c8] font-bold tracking-wide rounded-2xl border border-[#7ec8c8]/20 hover:border-[#7ec8c8]/50 hover:shadow-[0_4px_20px_rgba(126,200,200,0.2)] transition-all duration-300"
            >
              View Source
            </button>
          </div>

          {/* Decorative dot row */}
          <div
            className="flex items-center justify-center gap-2 mt-14"
            style={{
              opacity: heroRevealed ? 0.4 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            {["#d4a5e3", "#7ec8c8", "#f5a5b8", "#b8a5f5", "#d4a5e3"].map((c, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 2 ? "8px" : "5px",
                  height: i === 2 ? "8px" : "5px",
                  background: c,
                  opacity: i === 2 ? 0.8 : 0.4,
                  boxShadow: i === 2 ? `0 0 8px ${c}` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Feature Cards ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 z-10">
        <div className="max-w-6xl mx-auto">

          <RevealBlock className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SparkleIcon color="#7ec8c8" size={13} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#7ec8c8]/40 uppercase">Aesthetic Pillars</span>
              <SparkleIcon color="#7ec8c8" size={13} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              The Dark Trinity
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-lg mx-auto leading-relaxed">
              Three pillars of pastel goth identity — each one a contradiction, each one a truth.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {cardItems.map((item, i) => (
              <RevealBlock key={item.title} delay={i * 0.08}>
                <div
                  className="group relative p-7 bg-[#2d1b3d]/60 rounded-2xl border cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: activeCard === i ? `${item.borderColor}/60` : `${item.borderColor}30`,
                    boxShadow:
                      activeCard === i
                        ? `0 4px 32px ${item.glow}, 0 0 0 1px ${item.borderColor}40`
                        : `0 4px_20px_rgba(0,0,0,0.3)`,
                  }}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Glow circle behind icon */}
                  <div
                    className="absolute top-5 right-5 w-16 h-16 rounded-full pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(ellipse, ${item.glow.replace("0.2", "0.15")}, transparent 70%)`,
                      opacity: activeCard === i ? 1 : 0.4,
                    }}
                  />

                  <div className="mb-5">
                    {item.icon === "skull" && <SkullIcon color={item.color} size={36} />}
                    {item.icon === "moon" && <CrescentMoonIcon color={item.color} size={36} />}
                    {item.icon === "bat" && <BatIcon color={item.color} size={44} />}
                  </div>

                  <h3
                    className="text-xl font-bold mb-3 tracking-wide transition-colors duration-300"
                    style={{ color: activeCard === i ? item.color : "#d4a5e3" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#b8a5f5]/40 leading-relaxed">{item.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Demos ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#2d1b3d]/25 z-10">
        <div className="max-w-4xl mx-auto">

          <RevealBlock className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CrossIcon color="#b8a5f5" size={14} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#b8a5f5]/40 uppercase">UI Components</span>
              <CrossIcon color="#b8a5f5" size={14} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              Dark Elements
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-sm mx-auto leading-relaxed">
              Every component shaped by darkness, glowing with pastel candy light.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08} className="flex justify-center gap-2 mb-10">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className="px-6 py-2.5 text-sm font-bold tracking-wide rounded-2xl border transition-all duration-300"
                style={{
                  background: componentTab === tab ? "rgba(45,27,61,0.8)" : "transparent",
                  borderColor: componentTab === tab ? "rgba(212,165,227,0.4)" : "rgba(212,165,227,0.12)",
                  color: componentTab === tab ? "#d4a5e3" : "rgba(184,165,245,0.35)",
                  boxShadow: componentTab === tab ? "0 0 16px rgba(212,165,227,0.2)" : "none",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </RevealBlock>

          {/* Demo area */}
          <RevealBlock delay={0.12}>
            <div
              className="relative p-10 md:p-14 rounded-2xl border border-[#d4a5e3]/12 overflow-hidden"
              style={{
                background: "#1a1225",
                boxShadow: "0 4px_20px_rgba(212,165,227,0.1)",
              }}
            >
              {/* Corner bats */}
              <div className="absolute top-4 right-4 opacity-20">
                <BatIcon color="#d4a5e3" size={24} />
              </div>
              <div className="absolute bottom-4 left-4 opacity-15">
                <SkullIcon color="#f5a5b8" size={20} />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-8">

                {componentTab === "button" && (
                  <div className="flex flex-col items-center gap-8 w-full">
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                      {/* Primary */}
                      <button
                        className="px-7 py-3 bg-[#2d1b3d] text-[#d4a5e3] font-bold tracking-wide rounded-2xl border border-[#d4a5e3]/30 shadow-[0_0_16px_rgba(212,165,227,0.25)] hover:shadow-[0_0_28px_rgba(212,165,227,0.45)] hover:border-[#d4a5e3]/60 transition-all duration-300"
                      >
                        Primary
                      </button>
                      {/* Secondary */}
                      <button
                        className="px-7 py-3 bg-transparent text-[#7ec8c8] font-bold tracking-wide rounded-2xl border border-[#7ec8c8]/20 hover:border-[#7ec8c8]/50 hover:shadow-[0_0_16px_rgba(126,200,200,0.2)] transition-all duration-300"
                      >
                        Secondary
                      </button>
                      {/* Accent */}
                      <button
                        className="px-7 py-3 font-bold tracking-wide rounded-2xl border border-[#b8a5f5]/25 shadow-[0_0_16px_rgba(184,165,245,0.18)] hover:shadow-[0_0_28px_rgba(184,165,245,0.35)] hover:border-[#b8a5f5]/55 transition-all duration-300"
                        style={{
                          background: "linear-gradient(135deg, #2d1b3d, #1a1225)",
                          color: "#b8a5f5",
                        }}
                      >
                        Accent
                      </button>
                      {/* Ghost */}
                      <button
                        className="px-7 py-3 text-[#f5a5b8] font-bold tracking-wide hover:text-[#f5a5b8]/70 hover:shadow-[0_0_12px_rgba(245,165,184,0.2)] transition-all duration-300"
                      >
                        Ghost
                      </button>
                      {/* Disabled */}
                      <button
                        disabled
                        className="px-7 py-3 bg-[#2d1b3d]/30 text-[#d4a5e3]/20 font-bold tracking-wide rounded-2xl border border-[#d4a5e3]/8 cursor-not-allowed"
                      >
                        Disabled
                      </button>
                    </div>
                    <p className="text-xs text-[#b8a5f5]/30 text-center max-w-xs leading-relaxed font-bold tracking-wide">
                      Deep purple bg + pastel border. Hover amplifies glow shadow. Candy-dark language.
                    </p>
                  </div>
                )}

                {componentTab === "card" && (
                  <div className="w-full max-w-sm">
                    <div
                      className="group p-7 rounded-2xl border border-[#b8a5f5]/15 shadow-[0_0_16px_rgba(184,165,245,0.1)] hover:shadow-[0_0_28px_rgba(184,165,245,0.22)] hover:border-[#d4a5e3]/40 transition-all duration-300 cursor-pointer"
                      style={{ background: "#2d1b3d" }}
                    >
                      <div className="flex gap-1.5 mb-5">
                        <div className="w-2 h-2 rounded-full bg-[#d4a5e3]/50" />
                        <div className="w-2 h-2 rounded-full bg-[#7ec8c8]/50" />
                        <div className="w-2 h-2 rounded-full bg-[#f5a5b8]/50" />
                      </div>
                      <div className="mb-4">
                        <SkullIcon color="#f5a5b8" size={28} />
                      </div>
                      <span className="text-xs font-bold tracking-[0.18em] text-[#f5a5b8]/45 uppercase block mb-2">Midnight</span>
                      <h3 className="text-xl font-bold text-[#d4a5e3] mb-3 tracking-wide group-hover:text-[#f5a5b8] transition-colors duration-300">
                        Sweet Darkness
                      </h3>
                      <p className="text-sm text-[#b8a5f5]/40 leading-relaxed">
                        A gothic card softened by lavender glow and rounded-2xl corners. Dark glass with a candy soul.
                      </p>
                    </div>
                    <p className="text-xs text-[#b8a5f5]/30 mt-5 text-center leading-relaxed font-bold tracking-wide">
                      Dark glass card. Border 15% opacity, glow 22% on hover. Rounded-2xl softness.
                    </p>
                  </div>
                )}

                {componentTab === "input" && (
                  <div className="w-full max-w-md">
                    <div className="mb-5">
                      <label className="block text-xs font-bold tracking-[0.18em] text-[#b8a5f5]/40 uppercase mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Witch, vampire, or ghost..."
                        className="w-full px-5 py-3.5 rounded-2xl font-medium transition-all duration-300 outline-none"
                        style={{
                          background: "#2d1b3d",
                          border: "1px solid rgba(212,165,227,0.2)",
                          color: "#d4a5e3",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(245,165,184,0.5)";
                          e.target.style.boxShadow = "0 0 16px rgba(245,165,184,0.2)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(212,165,227,0.2)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-xs font-bold tracking-[0.18em] text-[#b8a5f5]/40 uppercase mb-2">
                        Your Spell
                      </label>
                      <textarea
                        placeholder="Whisper into the void..."
                        rows={3}
                        className="w-full px-5 py-3.5 rounded-2xl font-medium transition-all duration-300 outline-none resize-none"
                        style={{
                          background: "#2d1b3d",
                          border: "1px solid rgba(212,165,227,0.2)",
                          color: "#d4a5e3",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(245,165,184,0.5)";
                          e.target.style.boxShadow = "0 0 16px rgba(245,165,184,0.2)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(212,165,227,0.2)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <button
                      className="w-full py-3 bg-[#2d1b3d] text-[#d4a5e3] font-bold tracking-wide rounded-2xl border border-[#d4a5e3]/30 shadow-[0_0_20px_rgba(212,165,227,0.25)] hover:shadow-[0_0_32px_rgba(212,165,227,0.4)] hover:border-[#d4a5e3]/60 transition-all duration-300"
                    >
                      Send into the Void
                    </button>
                    <p className="text-xs text-[#b8a5f5]/30 mt-5 text-center leading-relaxed font-bold tracking-wide">
                      Dark purple inputs. Pink focus ring glow. Lavender text on near-black.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 z-10">
        <div className="max-w-6xl mx-auto">

          <RevealBlock className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <StarIcon color="#f5a5b8" size={16} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#f5a5b8]/40 uppercase">Color System</span>
              <StarIcon color="#f5a5b8" size={16} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              Candy Palette
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-lg mx-auto leading-relaxed">
              Six colors that define the aesthetic — two voids and four sweets. Every palette choice is a contradiction resolved in beauty.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {paletteColors.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div
                  className="group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-default"
                  style={{
                    borderColor: "rgba(212,165,227,0.12)",
                    background: "#1a1225",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px ${color.hex}40`;
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color.hex}50`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,165,227,0.12)";
                  }}
                >
                  {/* Color swatch with glow */}
                  <div
                    className="h-24 md:h-32 w-full relative flex items-center justify-center"
                    style={{ background: color.hex }}
                  >
                    {/* Inner glow circle */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.08), transparent 60%)`,
                      }}
                    />
                    {/* Motif overlay */}
                    <div className="opacity-20">
                      {i === 0 && <SkullIcon color="#f5a5b8" size={32} />}
                      {i === 1 && <BatIcon color="#d4a5e3" size={36} />}
                      {i === 2 && <SparkleIcon color="#2d1b3d" size={24} />}
                      {i === 3 && <CrescentMoonIcon color="#1a1225" size={28} />}
                      {i === 4 && <StarIcon color="#1a1225" size={24} />}
                      {i === 5 && <CrossIcon color="#1a1225" size={22} />}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[#d4a5e3] tracking-wide">{color.name}</span>
                      <span
                        className="text-xs font-bold tracking-wider font-mono"
                        style={{ color: "#b8a5f5", opacity: 0.45 }}
                      >
                        {color.hex}
                      </span>
                    </div>
                    <p className="text-xs text-[#b8a5f5]/35 leading-relaxed">{color.description}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Typography ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#2d1b3d]/20 z-10">
        <div className="max-w-4xl mx-auto">

          <RevealBlock className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CrescentMoonIcon color="#b8a5f5" size={20} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#b8a5f5]/40 uppercase">Type Scale</span>
              <CrescentMoonIcon color="#b8a5f5" size={20} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              Typography
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-sm mx-auto leading-relaxed">
              Bold and playful sizing on deep dark grounds. Pastel colors carry each level of hierarchy.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <div
              className="relative p-8 md:p-12 rounded-2xl border border-[#b8a5f5]/12 overflow-hidden"
              style={{ background: "#1a1225", boxShadow: "0 0 32px rgba(184,165,245,0.08)" }}
            >
              {/* Decorative corner bat */}
              <div className="absolute top-5 right-5 opacity-15">
                <BatIcon color="#b8a5f5" size={32} />
              </div>

              <div className="flex gap-1.5 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#d4a5e3]" />
                <div className="w-2 h-2 rounded-full bg-[#7ec8c8]" />
                <div className="w-2 h-2 rounded-full bg-[#f5a5b8]" />
              </div>

              <div className="space-y-7">
                {typeScaleItems.map((item, i) => (
                  <div key={item.label} className="flex items-baseline gap-6 border-b border-[#d4a5e3]/6 pb-7 last:border-0 last:pb-0">
                    <div className="w-16 shrink-0">
                      <span className="text-xs font-bold tracking-[0.15em] text-[#b8a5f5]/30 uppercase">{item.label}</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p
                        className="leading-tight font-sans truncate"
                        style={{
                          fontSize: item.size,
                          fontWeight: item.weight,
                          color: item.color,
                          textShadow: i <= 1 ? `0 0 20px ${item.color}40` : "none",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Gothic SVG Motifs Showcase ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 z-10">
        <div className="max-w-6xl mx-auto">

          <RevealBlock className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BatIcon color="#d4a5e3" size={24} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#d4a5e3]/35 uppercase">Motif Language</span>
              <BatIcon color="#d4a5e3" size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              Gothic Symbols
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-lg mx-auto leading-relaxed">
              Iconic gothic motifs redrawn in pastel ink. Each symbol stripped of menace, filled with candy — creepy cute in its purest form.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {/* Skull */}
            <RevealBlock delay={0.05}>
              <div
                className="group flex flex-col items-center p-7 rounded-2xl border border-[#f5a5b8]/15 hover:border-[#f5a5b8]/40 transition-all duration-300 cursor-default"
                style={{
                  background: "#2d1b3d",
                  boxShadow: "0 0 0 transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px_24px_rgba(245,165,184,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 transparent";
                }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <SkullIcon color="#f5a5b8" size={48} />
                </div>
                <span className="text-sm font-bold text-[#d4a5e3] tracking-wide mb-1">Skull</span>
                <span className="text-xs text-[#f5a5b8]/40 font-bold tracking-[0.12em]">#f5a5b8</span>
              </div>
            </RevealBlock>

            {/* Bat */}
            <RevealBlock delay={0.1}>
              <div
                className="group flex flex-col items-center p-7 rounded-2xl border border-[#d4a5e3]/15 hover:border-[#d4a5e3]/40 transition-all duration-300 cursor-default"
                style={{ background: "#2d1b3d" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px_24px_rgba(212,165,227,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BatIcon color="#d4a5e3" size={56} />
                </div>
                <span className="text-sm font-bold text-[#d4a5e3] tracking-wide mb-1">Bat</span>
                <span className="text-xs text-[#d4a5e3]/40 font-bold tracking-[0.12em]">#d4a5e3</span>
              </div>
            </RevealBlock>

            {/* Crescent Moon */}
            <RevealBlock delay={0.15}>
              <div
                className="group flex flex-col items-center p-7 rounded-2xl border border-[#b8a5f5]/15 hover:border-[#b8a5f5]/40 transition-all duration-300 cursor-default"
                style={{ background: "#2d1b3d" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px_24px_rgba(184,165,245,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CrescentMoonIcon color="#b8a5f5" size={48} />
                </div>
                <span className="text-sm font-bold text-[#d4a5e3] tracking-wide mb-1">Moon</span>
                <span className="text-xs text-[#b8a5f5]/40 font-bold tracking-[0.12em]">#b8a5f5</span>
              </div>
            </RevealBlock>

            {/* Star */}
            <RevealBlock delay={0.2}>
              <div
                className="group flex flex-col items-center p-7 rounded-2xl border border-[#7ec8c8]/15 hover:border-[#7ec8c8]/40 transition-all duration-300 cursor-default"
                style={{ background: "#2d1b3d" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px_24px_rgba(126,200,200,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <StarIcon color="#7ec8c8" size={44} />
                </div>
                <span className="text-sm font-bold text-[#d4a5e3] tracking-wide mb-1">Star</span>
                <span className="text-xs text-[#7ec8c8]/40 font-bold tracking-[0.12em]">#7ec8c8</span>
              </div>
            </RevealBlock>
          </div>

          {/* Secondary motif row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-5 max-w-md mx-auto">
            <RevealBlock delay={0.22}>
              <div
                className="group flex flex-col items-center p-7 rounded-2xl border border-[#b8a5f5]/12 hover:border-[#b8a5f5]/35 transition-all duration-300 cursor-default"
                style={{ background: "#2d1b3d" }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CrossIcon color="#b8a5f5" size={40} />
                </div>
                <span className="text-sm font-bold text-[#d4a5e3] tracking-wide mb-1">Cross</span>
                <span className="text-xs text-[#b8a5f5]/40 font-bold tracking-[0.12em]">#b8a5f5</span>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.26}>
              <div
                className="group flex flex-col items-center p-7 rounded-2xl border border-[#f5a5b8]/12 hover:border-[#f5a5b8]/35 transition-all duration-300 cursor-default"
                style={{ background: "#2d1b3d" }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <SparkleIcon color="#f5a5b8" size={44} />
                </div>
                <span className="text-sm font-bold text-[#d4a5e3] tracking-wide mb-1">Sparkle</span>
                <span className="text-xs text-[#f5a5b8]/40 font-bold tracking-[0.12em]">#f5a5b8</span>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Design Principles ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#2d1b3d]/20 z-10">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SkullIcon color="#d4a5e3" size={16} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#d4a5e3]/35 uppercase">Aesthetic Law</span>
              <SkullIcon color="#d4a5e3" size={16} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              Design Principles
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-lg mx-auto leading-relaxed">
              The rules of pastel goth are few but firm. Obey them and the aesthetic sings. Break them and it becomes something ordinary.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Do list */}
            <RevealBlock delay={0.06}>
              <div
                className="relative p-8 rounded-2xl border border-[#7ec8c8]/18 overflow-hidden"
                style={{ background: "#1a1225" }}
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-full"
                  style={{ background: "radial-gradient(ellipse, rgba(126,200,200,0.12), transparent 70%)" }}
                />
                <div className="absolute top-4 right-4 opacity-30">
                  <StarIcon color="#7ec8c8" size={16} />
                </div>

                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(126,200,200,0.15)", border: "1px solid rgba(126,200,200,0.3)" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#7ec8c8" strokeWidth="2.5">
                      <path d="M2.5 8l3.5 3.5 7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#7ec8c8] tracking-wide">Embrace</h3>
                </div>

                <ul className="space-y-4">
                  {doRules.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#b8a5f5]/45 leading-relaxed pl-3 border-l border-[#7ec8c8]/18"
                    >
                      <SparkleIcon color="#7ec8c8" size={11} className="shrink-0 mt-0.5 opacity-60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.12}>
              <div
                className="relative p-8 rounded-2xl border border-[#f5a5b8]/18 overflow-hidden"
                style={{ background: "#1a1225" }}
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-full"
                  style={{ background: "radial-gradient(ellipse, rgba(245,165,184,0.12), transparent 70%)" }}
                />
                <div className="absolute top-4 right-4 opacity-30">
                  <SkullIcon color="#f5a5b8" size={18} />
                </div>

                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(245,165,184,0.12)", border: "1px solid rgba(245,165,184,0.3)" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#f5a5b8" strokeWidth="2.5">
                      <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#f5a5b8] tracking-wide">Avoid</h3>
                </div>

                <ul className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#b8a5f5]/45 leading-relaxed pl-3 border-l border-[#f5a5b8]/18"
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1 opacity-50" style={{ background: "#f5a5b8" }} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Quote block */}
          <RevealBlock delay={0.2} className="mt-8">
            <div
              className="relative p-10 rounded-2xl text-center border border-[#b8a5f5]/12 overflow-hidden"
              style={{ background: "#1a1225" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(184,165,245,0.06), transparent 60%)",
                }}
              />
              <div className="flex items-center justify-center gap-3 mb-5 relative z-10">
                <BatIcon color="#b8a5f5" size={22} className="opacity-50" />
                <BatIcon color="#d4a5e3" size={28} className="opacity-60" />
                <BatIcon color="#b8a5f5" size={22} className="opacity-50" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-[#d4a5e3]/70 leading-relaxed max-w-2xl mx-auto relative z-10">
                &ldquo;The contradiction is the aesthetic. Be dark. Be sweet. Be both — always at once.&rdquo;
              </p>
              <div className="mt-5 flex items-center justify-center gap-2 relative z-10">
                <SkullIcon color="#f5a5b8" size={14} />
                <span className="text-xs font-bold tracking-[0.2em] text-[#b8a5f5]/35 uppercase">Pastel Goth Principle</span>
                <SkullIcon color="#f5a5b8" size={14} />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Glow Effects Showcase ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 z-10">
        <div className="max-w-6xl mx-auto">

          <RevealBlock className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SparkleIcon color="#d4a5e3" size={14} />
              <span className="text-xs font-bold tracking-[0.2em] text-[#d4a5e3]/35 uppercase">Glow System</span>
              <SparkleIcon color="#d4a5e3" size={14} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4a5e3] mb-4 leading-tight">
              Pastel Glows
            </h2>
            <p className="text-[#b8a5f5]/45 max-w-lg mx-auto leading-relaxed">
              The signature technique of pastel goth — dark backgrounds amplify pastel glow until elements seem to radiate ethereal light.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Glow border demo */}
            <RevealBlock delay={0.06}>
              <div
                className="p-8 rounded-2xl border border-[#d4a5e3]/12"
                style={{ background: "#1a1225" }}
              >
                <h3 className="text-base font-bold text-[#d4a5e3] mb-6 tracking-wide">Border Glow States</h3>
                <div className="space-y-4">
                  {[
                    { label: "Resting", border: "rgba(212,165,227,0.15)", shadow: "none", text: "#b8a5f5" },
                    { label: "Hover", border: "rgba(212,165,227,0.4)", shadow: "0 0 16px rgba(212,165,227,0.2)", text: "#d4a5e3" },
                    { label: "Active", border: "rgba(212,165,227,0.7)", shadow: "0 0 24px rgba(212,165,227,0.35)", text: "#d4a5e3" },
                    { label: "Focus (Pink)", border: "rgba(245,165,184,0.6)", shadow: "0 0 20px rgba(245,165,184,0.25)", text: "#f5a5b8" },
                  ].map((state) => (
                    <div
                      key={state.label}
                      className="flex items-center justify-between px-5 py-3 rounded-xl"
                      style={{
                        border: `1px solid ${state.border}`,
                        boxShadow: state.shadow,
                        background: "#2d1b3d",
                      }}
                    >
                      <span className="text-sm font-bold tracking-wide" style={{ color: state.text }}>
                        {state.label}
                      </span>
                      <span className="text-xs font-mono" style={{ color: state.text, opacity: 0.5 }}>
                        {state.border}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Shadow glow demo */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 rounded-2xl border border-[#d4a5e3]/12"
                style={{ background: "#1a1225" }}
              >
                <h3 className="text-base font-bold text-[#d4a5e3] mb-6 tracking-wide">Box Shadow Glow Scale</h3>
                <div className="space-y-5">
                  {[
                    { label: "Subtle", color: "#d4a5e3", opacity: 0.15, size: "sm" },
                    { label: "Moderate", color: "#b8a5f5", opacity: 0.22, size: "md" },
                    { label: "Strong", color: "#f5a5b8", opacity: 0.3, size: "lg" },
                    { label: "Intense", color: "#7ec8c8", opacity: 0.4, size: "xl" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-5"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl shrink-0"
                        style={{
                          background: "#2d1b3d",
                          border: `1px solid ${item.color}30`,
                          boxShadow: `0 0 ${item.size === "sm" ? 8 : item.size === "md" ? 16 : item.size === "lg" ? 24 : 36}px ${item.color}${Math.round(item.opacity * 255).toString(16).padStart(2, "0")}`,
                        }}
                      />
                      <div>
                        <p className="text-sm font-bold text-[#d4a5e3] tracking-wide">{item.label}</p>
                        <p className="text-xs text-[#b8a5f5]/35 font-mono">{`0 0 ${item.size === "sm" ? "8px" : item.size === "md" ? "16px" : item.size === "lg" ? "24px" : "36px"} ${item.color}${Math.round(item.opacity * 255).toString(16).padStart(2, "0")}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative py-16 px-6 md:px-12 border-t border-[#d4a5e3]/10 overflow-hidden z-10">

        {/* Floating footer motifs */}
        <div className="absolute top-6 left-10 opacity-20">
          <BatIcon color="#b8a5f5" size={28} />
        </div>
        <div className="absolute top-4 left-1/4 opacity-15">
          <StarIcon color="#7ec8c8" size={14} />
        </div>
        <div className="absolute top-8 right-1/3 opacity-12">
          <CrescentMoonIcon color="#d4a5e3" size={20} />
        </div>
        <div className="absolute bottom-6 right-16 opacity-20">
          <BatIcon color="#d4a5e3" size={24} />
        </div>
        <div className="absolute bottom-8 left-20 opacity-15">
          <SparkleIcon color="#f5a5b8" size={13} />
        </div>
        <div className="absolute top-6 right-8 opacity-15">
          <SkullIcon color="#f5a5b8" size={20} />
        </div>
        <div className="absolute bottom-4 right-1/4 opacity-12">
          <CrossIcon color="#b8a5f5" size={14} />
        </div>

        {/* Footer glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(45,27,61,0.5), transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <SkullIcon color="#f5a5b8" size={20} />
                <span className="font-bold text-base tracking-widest text-[#d4a5e3]">Pastel Goth</span>
                <BatIcon color="#d4a5e3" size={22} />
              </div>
              <p className="text-xs text-[#b8a5f5]/30 font-bold tracking-wide">
                Part of StyleKit &mdash; a living design system collection
              </p>
            </div>

            {/* Color dots */}
            <div className="flex items-center gap-2.5">
              {[
                { c: "#2d1b3d", glow: "rgba(45,27,61,0)" },
                { c: "#d4a5e3", glow: "rgba(212,165,227,0.4)" },
                { c: "#7ec8c8", glow: "rgba(126,200,200,0.4)" },
                { c: "#f5a5b8", glow: "rgba(245,165,184,0.4)" },
                { c: "#b8a5f5", glow: "rgba(184,165,245,0.4)" },
              ].map(({ c, glow }, i) => (
                <div
                  key={c}
                  className="rounded-full"
                  style={{
                    width: i === 2 ? "10px" : "6px",
                    height: i === 2 ? "10px" : "6px",
                    background: c,
                    boxShadow: glow !== "rgba(45,27,61,0)" ? `0 0 8px ${glow}` : "none",
                  }}
                />
              ))}
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/pastel-goth"
                className="text-xs font-bold tracking-wide text-[#b8a5f5]/30 hover:text-[#d4a5e3] transition-colors duration-300"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs font-bold tracking-wide text-[#b8a5f5]/30 hover:text-[#d4a5e3] transition-colors duration-300"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-xs font-bold tracking-wide text-[#b8a5f5]/30 hover:text-[#d4a5e3] transition-colors duration-300"
              >
                Home
              </Link>
            </nav>

          </div>

          {/* Bottom credit line */}
          <div className="mt-10 pt-6 border-t border-[#d4a5e3]/6 text-center">
            <p className="text-xs text-[#b8a5f5]/20 font-bold tracking-[0.18em] uppercase">
              粉彩哥特 &middot; Pastel Goth &middot; StyleKit Design System
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
