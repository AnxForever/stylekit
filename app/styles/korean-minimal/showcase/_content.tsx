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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const palette = [
  {
    name: "slate blue",
    hex: "#3d4a5c",
    description: "clarity",
    border: false,
  },
  {
    name: "warm white",
    hex: "#faf9f7",
    description: "space",
    border: true,
  },
  {
    name: "blush pink",
    hex: "#d4a5a5",
    description: "softness",
    border: false,
  },
  {
    name: "sage green",
    hex: "#a8c5b8",
    description: "calm",
    border: false,
  },
  {
    name: "sand",
    hex: "#e8d4b8",
    description: "warmth",
    border: false,
  },
];

const kBeautyPrinciples = [
  {
    korean: "피부",
    english: "Skin",
    ui: "Surface Texture",
    description:
      "Clean, unblemished backgrounds that let content breathe naturally. Like skin care, the foundation matters most.",
  },
  {
    korean: "여백",
    english: "Whitespace",
    ui: "Breathing Room",
    description:
      "Space is not empty — it is the silence between notes. Generous margins allow meaning to settle and rest.",
  },
  {
    korean: "절제",
    english: "Restraint",
    ui: "Minimal Decoration",
    description:
      "Every ornament removed is a decision made with intention. Less reveals more when paired with confidence.",
  },
  {
    korean: "온도",
    english: "Warmth",
    ui: "Pastel Temperature",
    description:
      "Warm pastels carry emotional temperature. A cool white becomes inviting when softened with sand and blush.",
  },
];

const portfolioItems = [
  {
    title: "morning ritual",
    category: "brand identity",
    accentColor: "#d4a5a5",
    accentOpacity: "30",
  },
  {
    title: "still life no. 3",
    category: "editorial",
    accentColor: "#a8c5b8",
    accentOpacity: "30",
  },
  {
    title: "soft archive",
    category: "photography",
    accentColor: "#e8d4b8",
    accentOpacity: "40",
  },
  {
    title: "linen and light",
    category: "product design",
    accentColor: "#d4a5a5",
    accentOpacity: "20",
  },
  {
    title: "quiet sunday",
    category: "art direction",
    accentColor: "#a8c5b8",
    accentOpacity: "20",
  },
  {
    title: "porcelain study",
    category: "illustration",
    accentColor: "#e8d4b8",
    accentOpacity: "30",
  },
];

const typographyScale = [
  {
    label: "main heading",
    className: "text-4xl font-light text-[#3d4a5c] tracking-wide",
    sample: "gentle presence",
    note: "text-4xl / font-light / tracking-wide",
  },
  {
    label: "sub heading",
    className: "text-2xl font-light text-[#3d4a5c]/80",
    sample: "whispered intention",
    note: "text-2xl / font-light / opacity 80",
  },
  {
    label: "body text",
    className: "text-base font-light text-[#3d4a5c]/60 leading-relaxed",
    sample:
      "Each word carries weight only when surrounded by silence. The art of restraint is knowing when to stop adding.",
    note: "text-base / font-light / leading-relaxed / opacity 60",
  },
  {
    label: "caption",
    className: "text-sm font-light text-[#d4a5a5]",
    sample: "soft detail, held lightly",
    note: "text-sm / font-light / blush color",
  },
  {
    label: "label",
    className: "text-xs tracking-wide text-[#3d4a5c]/40",
    sample: "category · 2026",
    note: "text-xs / tracking-wide / opacity 40",
  },
];

const doDontPairs = [
  {
    doTitle: "use rounded-2xl corners",
    doDescription:
      "Soft corners invite touch. They feel approachable and human, matching the warmth of K-beauty aesthetics.",
    dontTitle: "use sharp square corners",
    dontDescription:
      "Hard corners create tension and coldness, which contradicts the warm, welcoming K-minimal sensibility.",
  },
  {
    doTitle: "use lazy 700ms+ transitions",
    doDescription:
      "Slow transitions feel like deep breaths — unhurried, confident, and serene. They signal quality.",
    dontTitle: "use snappy 150ms transitions",
    dontDescription:
      "Fast animations feel anxious and aggressive. They break the contemplative mood that defines the style.",
  },
  {
    doTitle: "use warm pastel tones",
    doDescription:
      "Sand, blush, and sage carry emotional warmth. They feel like natural light, morning windows, and calm.",
    dontTitle: "use cold saturated colors",
    dontDescription:
      "Bright blues or neons break the delicate palette balance and introduce visual tension.",
  },
  {
    doTitle: "use micro hover lifts",
    doDescription:
      "A gentle -translate-y-0.5 lift feels like a soft breath — present but never dramatic.",
    dontTitle: "use dramatic scale or bounce effects",
    dontDescription:
      "Large scale transforms or spring animations conflict with the composed, still quality of Korean minimal.",
  },
];

const beautyProducts = [
  {
    name: "Soft Serum",
    sub: "Daily Essence",
    price: "68,000",
    accent: "#d4a5a5",
    tag: "bestseller",
  },
  {
    name: "Sage Toner",
    sub: "Hydrating Mist",
    price: "42,000",
    accent: "#a8c5b8",
    tag: "new",
  },
  {
    name: "Sand Mask",
    sub: "Overnight Care",
    price: "55,000",
    accent: "#e8d4b8",
    tag: "limited",
  },
];

type TabKey = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function KoreanMinimalShowcase() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("buttons");
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [wishlist, setWishlist] = useState<boolean[]>([false, false, false]);

  /* Animation rule demo states */
  const [lazyHovered, setLazyHovered] = useState(false);
  const [microLiftHovered, setMicroLiftHovered] = useState(false);
  const [mutedWhisperHovered, setMutedWhisperHovered] = useState(false);
  const [softPressActive, setSoftPressActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleWishlist(i: number) {
    setWishlist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: "#faf9f7", color: "#3d4a5c" }}
    >
      {/* ================================================================ */}
      {/* 1. NAVIGATION                                                     */}
      {/* ================================================================ */}
      <nav
        className="sticky top-0 z-50 border-b border-[#3d4a5c]/8 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(250,249,247,0.92)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4a5a5]/60" />
            <span className="font-light tracking-wide text-[#3d4a5c] text-sm">
              korean minimal
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "palette", href: "#palette" },
              { label: "components", href: "#components" },
              { label: "animations", href: "#animations" },
              { label: "app demo", href: "#app-demo" },
              { label: "gallery", href: "#gallery" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[#3d4a5c]/55 hover:text-[#3d4a5c] transition-colors duration-700 font-light"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* StyleKit back link */}
          <Link
            href="/"
            className="text-xs font-light text-[#d4a5a5] hover:text-[#d4a5a5]/70 transition-colors duration-700"
          >
            StyleKit &rarr;
          </Link>
        </div>
      </nav>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative py-40 overflow-hidden">
        {/* Pastel ambient spots */}
        <div
          className="absolute top-16 left-16 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: "#d4a5a5" }}
        />
        <div
          className="absolute bottom-20 right-20 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: "#a8c5b8" }}
        />
        <div
          className="absolute top-32 right-36 w-24 h-24 rounded-full opacity-15 blur-2xl pointer-events-none"
          style={{ backgroundColor: "#e8d4b8" }}
        />
        <div
          className="absolute bottom-32 left-32 w-28 h-28 rounded-full opacity-10 blur-2xl pointer-events-none"
          style={{ backgroundColor: "#d4a5a5" }}
        />

        {/* Decorative thin horizontal lines */}
        <div
          className="absolute top-28 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none"
          style={{ backgroundColor: "#3d4a5c", opacity: 0.06 }}
        />
        <div
          className="absolute bottom-28 right-1/4 w-12 h-px pointer-events-none"
          style={{ backgroundColor: "#d4a5a5", opacity: 0.3 }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Blush dot accent */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#d4a5a5]/40 mx-auto mb-10" />
          </div>

          {/* Thin divider */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scaleX(1)" : "scaleX(0)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
            }}
          >
            <div className="h-px w-10 bg-[#3d4a5c]/15 mx-auto mb-10" />
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl font-light text-[#3d4a5c] tracking-wide leading-tight mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            beauty in
            <br />
            <span style={{ color: "rgba(61,74,92,0.45)" }}>restraint</span>
          </h1>

          {/* Eyebrow label */}
          <p
            className="text-xs tracking-widest text-[#d4a5a5]/70 mb-6 font-light"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            Korean Minimal &nbsp;&middot;&nbsp; K-beauty interface design
          </p>

          {/* Description */}
          <p
            className="text-[#3d4a5c]/45 font-light text-lg leading-relaxed max-w-xl mx-auto mb-14"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            K-beauty minimalism translated into interface design. Pastel warmth,
            whispered contrasts, and the quiet confidence of intentional space.
          </p>

          {/* CTA buttons */}
          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <a
              href="#components"
              className="px-8 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(168,197,184,0.18)] transition-all duration-700"
            >
              explore components
            </a>
            <a
              href="#palette"
              className="px-8 py-3 border border-[#3d4a5c]/15 text-[#3d4a5c] rounded-2xl font-light text-sm hover:border-[#d4a5a5]/50 transition-all duration-700"
            >
              view palette
            </a>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "5", label: "pastel tones" },
              { value: "700ms+", label: "transitions" },
              { value: "∞", label: "whitespace" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 hover:-translate-y-0.5 transition-all duration-700 cursor-default"
              >
                <span className="text-2xl font-light text-[#3d4a5c]">
                  {stat.value}
                </span>
                <span className="text-xs text-[#3d4a5c]/35 font-light tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="py-28" style={{ backgroundColor: "#f7f4f0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
              color system
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              pastel warmth
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
              Five tones that speak in whispers. No cold edges, only the warmth
              of natural light filtering through morning windows.
            </p>
          </RevealBlock>

          {/* Color swatches */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-14">
            {palette.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-full aspect-square rounded-2xl hover:-translate-y-0.5 transition-all duration-700 cursor-default"
                    style={{
                      backgroundColor: color.hex,
                      border: color.border ? "1px solid rgba(61,74,92,0.10)" : "none",
                      boxShadow: "0 4px 16px rgba(61,74,92,0.06)",
                    }}
                  />
                  <div className="text-center">
                    <p className="text-sm font-light text-[#3d4a5c] mb-1">
                      {color.name}
                    </p>
                    <p className="text-xs text-[#3d4a5c]/40 font-light font-mono mb-1">
                      {color.hex}
                    </p>
                    <p className="text-xs text-[#d4a5a5] font-light">
                      {color.description}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Full gradient preview */}
          <RevealBlock delay={0.4}>
            <div className="rounded-2xl overflow-hidden h-14 shadow-[0_4px_16px_rgba(232,212,184,0.14)]">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(to right, #3d4a5c, #d4a5a5, #a8c5b8, #e8d4b8, #faf9f7)",
                }}
              />
            </div>
            <p className="text-center text-xs text-[#3d4a5c]/30 font-light mt-3">
              the full gradient — from depth to light
            </p>
          </RevealBlock>

          {/* Opacity tints grid */}
          <RevealBlock delay={0.5} className="mt-10">
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-8"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-6 text-center font-light">
                opacity tints — the quiet language of restraint
              </p>
              <div className="grid grid-cols-3 gap-4">
                {(["#d4a5a5", "#a8c5b8", "#e8d4b8"] as const).map((hex) => (
                  <div key={hex} className="space-y-2">
                    {[0.08, 0.15, 0.25, 0.40, 0.60, 1.0].map((opacity) => (
                      <div
                        key={opacity}
                        className="h-8 rounded-xl transition-all duration-700 hover:-translate-y-0.5 cursor-default"
                        style={{
                          backgroundColor: hex,
                          opacity,
                        }}
                      />
                    ))}
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
      <section id="components" className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
            component system
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            gentle elements
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
            Every component carries the same softness. Rounded corners, lazy
            transitions, and whispered color contrasts throughout.
          </p>
        </RevealBlock>

        {/* Tab switcher */}
        <RevealBlock delay={0.1} className="mb-12">
          <div className="flex items-center justify-center gap-1 p-1 rounded-2xl border border-[#3d4a5c]/8 w-fit mx-auto">
            {(["buttons", "cards", "inputs", "badges"] as TabKey[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 rounded-xl text-sm font-light transition-all duration-700"
                  style={{
                    backgroundColor:
                      activeTab === tab ? "#3d4a5c" : "transparent",
                    color:
                      activeTab === tab
                        ? "#faf9f7"
                        : "rgba(61, 74, 92, 0.50)",
                  }}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </RevealBlock>

        {/* Tab content */}
        <RevealBlock delay={0.15}>
          {/* ---- BUTTONS ---- */}
          {activeTab === "buttons" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-8 text-center font-light">
                button variants
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <button className="px-7 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(61,74,92,0.18)] transition-all duration-700">
                  primary
                </button>
                <button className="px-7 py-3 border border-[#3d4a5c]/15 text-[#3d4a5c] rounded-2xl font-light text-sm hover:border-[#d4a5a5]/50 hover:-translate-y-0.5 transition-all duration-700">
                  outline
                </button>
                <button className="px-7 py-3 bg-[#d4a5a5]/15 text-[#3d4a5c] rounded-2xl font-light text-sm hover:bg-[#d4a5a5]/25 hover:-translate-y-0.5 transition-all duration-700">
                  blush
                </button>
                <button className="px-7 py-3 bg-[#a8c5b8]/20 text-[#3d4a5c] rounded-2xl font-light text-sm hover:bg-[#a8c5b8]/30 hover:-translate-y-0.5 transition-all duration-700">
                  sage
                </button>
                <button className="px-7 py-3 text-[#3d4a5c]/50 rounded-2xl font-light text-sm hover:text-[#3d4a5c] hover:bg-[#e8d4b8]/20 transition-all duration-700">
                  ghost
                </button>
              </div>

              <div className="h-px w-full bg-[#3d4a5c]/6 my-8" />

              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-6 text-center font-light">
                sizes
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <button className="px-5 py-2 bg-[#3d4a5c] text-[#faf9f7] rounded-xl font-light text-xs hover:-translate-y-0.5 transition-all duration-700">
                  small
                </button>
                <button className="px-7 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm hover:-translate-y-0.5 transition-all duration-700">
                  medium
                </button>
                <button className="px-9 py-4 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-base hover:-translate-y-0.5 transition-all duration-700">
                  large
                </button>
              </div>

              <div className="h-px w-full bg-[#3d4a5c]/6 my-8" />

              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-6 text-center font-light">
                states
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  className="px-7 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm cursor-not-allowed"
                  style={{ opacity: 0.38 }}
                  disabled
                >
                  disabled
                </button>
                <button className="px-7 py-3 bg-[#d4a5a5] text-[#faf9f7] rounded-2xl font-light text-sm transition-all duration-700 active:bg-[#c99898]">
                  active
                </button>
                <button className="px-7 py-3 border border-[#d4a5a5]/50 text-[#3d4a5c] rounded-2xl font-light text-sm -translate-y-0.5 shadow-[0_8px_20px_rgba(212,165,165,0.15)] transition-all duration-700">
                  hovered
                </button>
              </div>
            </div>
          )}

          {/* ---- CARDS ---- */}
          {activeTab === "cards" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-8 text-center font-light">
                card variants
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Minimal card */}
                <div className="rounded-2xl border border-[#3d4a5c]/8 shadow-[0_8px_24px_rgba(232,212,184,0.14)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(232,212,184,0.20)] transition-all duration-700 group">
                  <div className="h-1 bg-[#d4a5a5]/40" />
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-[#3d4a5c]/35 mb-3 font-light">
                      minimal
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-2 group-hover:text-[#3d4a5c]/70 transition-colors duration-700">
                      still morning
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      A card that holds content gently, without unnecessary
                      emphasis.
                    </p>
                  </div>
                </div>

                {/* Sage accent card */}
                <div className="rounded-2xl border border-[#3d4a5c]/8 shadow-[0_8px_24px_rgba(168,197,184,0.12)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(168,197,184,0.18)] transition-all duration-700 group">
                  <div className="h-1 bg-[#a8c5b8]/50" />
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-[#3d4a5c]/35 mb-3 font-light">
                      sage accent
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-2 group-hover:text-[#3d4a5c]/70 transition-colors duration-700">
                      quiet garden
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      Sage warmth on the accent line brings natural calm to the
                      structure.
                    </p>
                  </div>
                </div>

                {/* Sand tint card */}
                <div
                  className="rounded-2xl border border-[#3d4a5c]/8 shadow-[0_8px_24px_rgba(232,212,184,0.14)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(232,212,184,0.22)] transition-all duration-700 group"
                  style={{ backgroundColor: "#fdf9f4" }}
                >
                  <div className="h-1 bg-[#e8d4b8]/60" />
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-[#3d4a5c]/35 mb-3 font-light">
                      sand tint
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-2 group-hover:text-[#3d4a5c]/70 transition-colors duration-700">
                      warm linen
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      A faint sand background adds texture without interrupting
                      the calm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---- INPUTS ---- */}
          {activeTab === "inputs" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-8 text-center font-light">
                input variants
              </p>
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2 font-light">
                    text field
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="a gentle thought..."
                    className="w-full px-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c] placeholder:text-[#3d4a5c]/30 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2 font-light">
                    search
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3d4a5c]/30 text-sm">
                      &#9675;
                    </span>
                    <input
                      type="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="search softly..."
                      className="w-full pl-9 pr-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c] placeholder:text-[#3d4a5c]/30 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2 font-light">
                    message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="write something honest..."
                    className="w-full px-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c] placeholder:text-[#3d4a5c]/30 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2 font-light">
                    select
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c]/60 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700 appearance-none">
                    <option>choose a feeling...</option>
                    <option>warmth</option>
                    <option>calm</option>
                    <option>stillness</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ---- BADGES ---- */}
          {activeTab === "badges" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-8 text-center font-light">
                badge variants
              </p>

              <div className="space-y-10">
                {/* Pastel pill badges */}
                <div>
                  <p className="text-xs text-[#3d4a5c]/35 font-light mb-5 tracking-wide">
                    pastel pills
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "minimal", bg: "rgba(212,165,165,0.15)", text: "#3d4a5c" },
                      { label: "k-beauty", bg: "rgba(168,197,184,0.20)", text: "#3d4a5c" },
                      { label: "still life", bg: "rgba(232,212,184,0.30)", text: "#3d4a5c" },
                      { label: "editorial", bg: "rgba(212,165,165,0.10)", text: "#3d4a5c/70" },
                      { label: "warm", bg: "rgba(232,212,184,0.20)", text: "#3d4a5c" },
                      { label: "soft", bg: "rgba(168,197,184,0.15)", text: "#3d4a5c" },
                    ].map((b) => (
                      <span
                        key={b.label}
                        className="px-4 py-1.5 rounded-full text-sm font-light hover:-translate-y-0.5 transition-all duration-700 cursor-default"
                        style={{ backgroundColor: b.bg, color: "#3d4a5c" }}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status badges */}
                <div>
                  <p className="text-xs text-[#3d4a5c]/35 font-light mb-5 tracking-wide">
                    status indicators
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "available", dot: "#a8c5b8" },
                      { label: "in progress", dot: "#d4a5a5" },
                      { label: "archived", dot: "#e8d4b8" },
                      { label: "pending", dot: "#3d4a5c" },
                    ].map((b) => (
                      <span
                        key={b.label}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light border border-[#3d4a5c]/8 text-[#3d4a5c]/60 hover:border-[#d4a5a5]/30 hover:text-[#3d4a5c] transition-all duration-700 cursor-default"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: b.dot }}
                        />
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category tags */}
                <div>
                  <p className="text-xs text-[#3d4a5c]/35 font-light mb-5 tracking-wide">
                    category tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "brand identity",
                      "editorial",
                      "photography",
                      "product design",
                      "art direction",
                      "illustration",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-light text-[#3d4a5c]/50 border border-[#3d4a5c]/8 rounded-xl hover:text-[#3d4a5c] hover:border-[#d4a5a5]/30 transition-all duration-700 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 5. ANIMATION & INTERACTION RULES (all 4 aiRules as live demos)  */}
      {/* ================================================================ */}
      <section
        id="animations"
        className="py-28"
        style={{ backgroundColor: "#f7f4f0" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
              animation &amp; interaction rules
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              lazy breathing
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
              Four named interaction patterns — each one a considered restraint.
              Hover or click each demo to feel the difference between noise and
              intention.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Rule 1: Lazy Breathing */}
            <RevealBlock delay={0.08}>
              <div
                className="rounded-2xl border border-[#3d4a5c]/8 p-8 h-full"
                style={{ backgroundColor: "#faf9f7" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-light bg-[#d4a5a5]/15 text-[#d4a5a5] mb-3">
                      Rule 1
                    </span>
                    <h3 className="text-lg font-light text-[#3d4a5c]">
                      Lazy Breathing
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed mb-2">
                  Transitions use <code className="text-xs bg-[#3d4a5c]/5 px-1.5 py-0.5 rounded-lg">duration-700</code> or longer with{" "}
                  <code className="text-xs bg-[#3d4a5c]/5 px-1.5 py-0.5 rounded-lg">ease-in-out</code>. Unhurried, confident, never anxious.
                </p>
                <p className="text-xs font-light text-[#3d4a5c]/35 mb-8 leading-relaxed">
                  &ldquo;慵懒平稳，不做短促反馈&rdquo; — lazy and steady, no abrupt feedback
                </p>

                {/* Live demo */}
                <div className="flex flex-col items-center gap-5">
                  <div className="flex gap-6 w-full justify-center">
                    {/* 150ms — wrong */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="px-5 py-2.5 rounded-2xl border border-[#3d4a5c]/15 text-sm font-light text-[#3d4a5c]/60 cursor-pointer select-none"
                        style={{ transition: "all 150ms ease" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")
                        }
                      >
                        150ms
                      </div>
                      <span className="text-[10px] text-[#3d4a5c]/30 font-light">
                        too fast
                      </span>
                    </div>

                    {/* 700ms — correct */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="px-5 py-2.5 rounded-2xl bg-[#3d4a5c] text-[#faf9f7] text-sm font-light cursor-pointer select-none"
                        style={{ transition: "all 700ms ease-in-out" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 28px rgba(61,74,92,0.18)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        }}
                      >
                        700ms
                      </div>
                      <span className="text-[10px] text-[#a8c5b8] font-light">
                        correct
                      </span>
                    </div>

                    {/* 1000ms card hover */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="px-5 py-2.5 rounded-2xl border border-[#a8c5b8]/30 bg-[#a8c5b8]/10 text-sm font-light text-[#3d4a5c]/60 cursor-pointer select-none"
                        style={{ transition: "all 1000ms ease-in-out" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 40px rgba(168,197,184,0.18)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                        }}
                      >
                        1000ms
                      </div>
                      <span className="text-[10px] text-[#3d4a5c]/30 font-light">
                        cards
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#3d4a5c]/30 font-light text-center">
                    Hover each pill to feel the timing difference
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 2: Micro Lift */}
            <RevealBlock delay={0.12}>
              <div
                className="rounded-2xl border border-[#3d4a5c]/8 p-8 h-full"
                style={{ backgroundColor: "#faf9f7" }}
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-light bg-[#a8c5b8]/15 text-[#a8c5b8] mb-3">
                    Rule 2
                  </span>
                  <h3 className="text-lg font-light text-[#3d4a5c]">
                    Micro Lift
                  </h3>
                </div>

                <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed mb-2">
                  Hover displacement stays at{" "}
                  <code className="text-xs bg-[#3d4a5c]/5 px-1.5 py-0.5 rounded-lg">-translate-y-0.5</code>{" "}
                  (2px). Warm shadow expands softly to express depth.
                </p>
                <p className="text-xs font-light text-[#3d4a5c]/35 mb-8 leading-relaxed">
                  &ldquo;超浅暖色阴影扩散表达层次&rdquo; — shallow warm shadow diffusion expresses hierarchy
                </p>

                {/* Live demo */}
                <div className="flex flex-col items-center gap-5">
                  <div
                    className="w-full max-w-xs rounded-2xl border border-[#3d4a5c]/8 p-6 cursor-pointer transition-all duration-700"
                    style={{
                      transform: microLiftHovered ? "translateY(-2px)" : "translateY(0)",
                      boxShadow: microLiftHovered
                        ? "0 20px 44px rgba(212,165,165,0.16)"
                        : "0 4px 12px rgba(232,212,184,0.10)",
                    }}
                    onMouseEnter={() => setMicroLiftHovered(true)}
                    onMouseLeave={() => setMicroLiftHovered(false)}
                  >
                    <div className="w-6 h-px bg-[#d4a5a5]/60 mb-4" />
                    <p className="text-sm font-light text-[#3d4a5c] mb-1">
                      hover this card
                    </p>
                    <p className="text-xs font-light text-[#3d4a5c]/40">
                      2px lift, warm shadow grows
                    </p>
                  </div>
                  <p className="text-xs text-[#3d4a5c]/30 font-light text-center">
                    {microLiftHovered
                      ? "translateY(-2px) — warm blush shadow expands"
                      : "resting state — no shadow tension"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 3: Muted Whisper */}
            <RevealBlock delay={0.16}>
              <div
                className="rounded-2xl border border-[#3d4a5c]/8 p-8 h-full"
                style={{ backgroundColor: "#faf9f7" }}
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-light bg-[#e8d4b8]/40 text-[#3d4a5c]/60 mb-3">
                    Rule 3
                  </span>
                  <h3 className="text-lg font-light text-[#3d4a5c]">
                    Muted Whisper
                  </h3>
                </div>

                <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed mb-2">
                  Text and borders shift only within the same hue family. No
                  high-contrast jumps — only micro-opacity changes.
                </p>
                <p className="text-xs font-light text-[#3d4a5c]/35 mb-8 leading-relaxed">
                  &ldquo;避免高对比跳色破坏安静氛围&rdquo; — avoid high-contrast color jumps that break the quiet atmosphere
                </p>

                {/* Live demo */}
                <div className="space-y-4">
                  {/* Text opacity shift demo */}
                  <div
                    className="cursor-pointer group"
                    onMouseEnter={() => setMutedWhisperHovered(true)}
                    onMouseLeave={() => setMutedWhisperHovered(false)}
                  >
                    <p
                      className="text-base font-light leading-relaxed transition-all duration-700"
                      style={{
                        color: mutedWhisperHovered
                          ? "rgba(61,74,92,0.80)"
                          : "rgba(61,74,92,0.40)",
                      }}
                    >
                      Hover to see the text breathe — not jump
                    </p>
                  </div>

                  {/* Border opacity shift demo */}
                  <div
                    className="p-4 rounded-2xl transition-all duration-700 cursor-pointer"
                    style={{
                      border: mutedWhisperHovered
                        ? "1px solid rgba(212,165,165,0.40)"
                        : "1px solid rgba(61,74,92,0.08)",
                    }}
                  >
                    <p className="text-xs font-light text-[#3d4a5c]/40">
                      Border shifts from /08 to blush /40 — same calm, different warmth
                    </p>
                  </div>

                  <p className="text-xs text-[#3d4a5c]/30 font-light">
                    {mutedWhisperHovered
                      ? "opacity 0.80 — text becomes present, not alarming"
                      : "opacity 0.40 — text rests in the quiet"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 4: Soft Press */}
            <RevealBlock delay={0.20}>
              <div
                className="rounded-2xl border border-[#3d4a5c]/8 p-8 h-full"
                style={{ backgroundColor: "#faf9f7" }}
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-light bg-[#3d4a5c]/8 text-[#3d4a5c]/50 mb-3">
                    Rule 4
                  </span>
                  <h3 className="text-lg font-light text-[#3d4a5c]">
                    Soft Press
                  </h3>
                </div>

                <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed mb-2">
                  Active feedback uses background deepening, not scale or bounce.
                  The UI acknowledges the press without drama.
                </p>
                <p className="text-xs font-light text-[#3d4a5c]/35 mb-8 leading-relaxed">
                  &ldquo;active 反馈优先背景轻微加深&rdquo; — active feedback prefers a slight background deepening
                </p>

                {/* Live demo */}
                <div className="flex flex-col items-center gap-5">
                  <div className="flex gap-4 flex-wrap justify-center">
                    {/* Correct: background deepens */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="px-6 py-3 rounded-2xl font-light text-sm text-[#faf9f7] transition-all duration-700 select-none"
                        style={{
                          backgroundColor: softPressActive ? "#2f3946" : "#3d4a5c",
                        }}
                        onMouseDown={() => setSoftPressActive(true)}
                        onMouseUp={() => setSoftPressActive(false)}
                        onMouseLeave={() => setSoftPressActive(false)}
                      >
                        press me
                      </button>
                      <span className="text-[10px] text-[#a8c5b8] font-light">
                        bg deepens
                      </span>
                    </div>

                    {/* Contrast: scale (don&apos;t do this) */}
                    <div className="flex flex-col items-center gap-2">
                      <button className="px-6 py-3 rounded-2xl font-light text-sm border border-[#3d4a5c]/15 text-[#3d4a5c]/50 active:scale-95 transition-all duration-200 select-none">
                        don&apos;t scale
                      </button>
                      <span className="text-[10px] text-[#3d4a5c]/30 font-light">
                        wrong approach
                      </span>
                    </div>

                    {/* Contrast: blush bg deepens on press */}
                    <div className="flex flex-col items-center gap-2">
                      <button className="px-6 py-3 rounded-2xl font-light text-sm bg-[#d4a5a5]/15 text-[#3d4a5c] active:bg-[#d4a5a5]/30 transition-all duration-700 select-none">
                        blush press
                      </button>
                      <span className="text-[10px] text-[#d4a5a5] font-light">
                        also correct
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#3d4a5c]/30 font-light text-center">
                    {softPressActive
                      ? "#2f3946 — deepened, not shrunken"
                      : "Click and hold the first button to see it"}
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Motion spec reference table */}
          <RevealBlock delay={0.3} className="mt-10">
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-8"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-widest text-[#3d4a5c]/35 text-center mb-8 font-light">
                hover to experience each timing
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 rounded-2xl border border-[#3d4a5c]/10 text-sm font-light text-[#3d4a5c]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(232,212,184,0.20)] hover:border-[#d4a5a5]/30 transition-all duration-700 cursor-default">
                  700ms ease
                </div>
                <div className="px-6 py-3 rounded-2xl border border-[#3d4a5c]/10 text-sm font-light text-[#3d4a5c]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,197,184,0.18)] hover:border-[#a8c5b8]/30 transition-all duration-1000 cursor-default">
                  1000ms ease
                </div>
                <div className="px-6 py-3 rounded-2xl bg-[#3d4a5c] text-[#faf9f7] text-sm font-light hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(61,74,92,0.20)] transition-all duration-700 cursor-default">
                  primary lift
                </div>
                <div className="px-6 py-3 rounded-2xl bg-[#d4a5a5]/15 text-[#3d4a5c] text-sm font-light hover:-translate-y-0.5 hover:bg-[#d4a5a5]/25 transition-all duration-700 cursor-default">
                  blush hover
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. K-BEAUTY APP DEMO                                             */}
      {/* ================================================================ */}
      <section id="app-demo" className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
            app demo
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            K-beauty product page
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
            A mock skincare brand page showing the design system in context —
            generous whitespace, pastel accents, and micro-lift interactions.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beautyProducts.map((product, i) => (
            <RevealBlock key={product.name} delay={i * 0.1}>
              <div
                className="rounded-2xl border border-[#3d4a5c]/8 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(212,165,165,0.14)] transition-all duration-1000 group"
                style={{ backgroundColor: "#faf9f7" }}
              >
                {/* Product color block */}
                <div
                  className="h-44 flex items-center justify-center transition-all duration-1000 group-hover:opacity-90"
                  style={{
                    backgroundColor: product.accent,
                    opacity: 0.22,
                  }}
                >
                  <div
                    className="w-16 h-20 rounded-xl border border-white/40"
                    style={{ backgroundColor: product.accent, opacity: 0.6 }}
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="text-[10px] tracking-widest font-light uppercase mb-1 block"
                        style={{ color: product.accent }}
                      >
                        {product.tag}
                      </span>
                      <h3 className="text-base font-light text-[#3d4a5c] group-hover:text-[#3d4a5c]/80 transition-colors duration-700">
                        {product.name}
                      </h3>
                      <p className="text-xs font-light text-[#3d4a5c]/40 mt-0.5">
                        {product.sub}
                      </p>
                    </div>

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleWishlist(i)}
                      className="w-9 h-9 rounded-full border border-[#3d4a5c]/10 flex items-center justify-center hover:-translate-y-0.5 hover:border-[#d4a5a5]/40 transition-all duration-700"
                      style={{
                        backgroundColor: wishlist[i] ? "rgba(212,165,165,0.15)" : "transparent",
                      }}
                    >
                      <span
                        className="text-sm leading-none transition-all duration-700"
                        style={{
                          color: wishlist[i] ? "#d4a5a5" : "rgba(61,74,92,0.25)",
                        }}
                      >
                        &#9825;
                      </span>
                    </button>
                  </div>

                  <div className="h-px bg-[#3d4a5c]/6 my-5" />

                  <div className="flex items-center justify-between">
                    <span className="text-base font-light text-[#3d4a5c]">
                      &yen;{product.price}
                    </span>
                    <button className="px-5 py-2 rounded-2xl text-xs font-light text-[#faf9f7] bg-[#3d4a5c] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(61,74,92,0.18)] transition-all duration-700">
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Product detail strip */}
        <RevealBlock delay={0.35} className="mt-8">
          <div
            className="rounded-2xl border border-[#3d4a5c]/8 p-10"
            style={{ backgroundColor: "#faf9f7" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-xs tracking-widest text-[#3d4a5c]/35 font-light mb-5">
                  morning routine
                </p>
                <div className="space-y-4">
                  {[
                    { step: "01", label: "Cleanse", time: "2 min" },
                    { step: "02", label: "Tone", time: "1 min" },
                    { step: "03", label: "Essence", time: "3 min" },
                    { step: "04", label: "Moisturize", time: "2 min" },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center gap-5 hover:-translate-y-0.5 transition-all duration-700 cursor-default"
                    >
                      <span className="text-xs font-light text-[#d4a5a5]/60 w-6 shrink-0">
                        {item.step}
                      </span>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#3d4a5c]/6" />
                        <span className="text-sm font-light text-[#3d4a5c]/70">
                          {item.label}
                        </span>
                        <div className="h-px flex-1 bg-[#3d4a5c]/6" />
                      </div>
                      <span className="text-xs font-light text-[#3d4a5c]/30 w-10 text-right shrink-0">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-widest text-[#3d4a5c]/35 font-light mb-5">
                  key ingredients
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Niacinamide", tone: "#d4a5a5" },
                    { name: "Centella", tone: "#a8c5b8" },
                    { name: "Hyaluronic Acid", tone: "#e8d4b8" },
                    { name: "Green Tea", tone: "#a8c5b8" },
                    { name: "Rice Bran", tone: "#e8d4b8" },
                    { name: "Ceramide", tone: "#d4a5a5" },
                  ].map((ing) => (
                    <div
                      key={ing.name}
                      className="flex items-center gap-2 p-3 rounded-xl border border-[#3d4a5c]/6 hover:-translate-y-0.5 hover:border-[#d4a5a5]/20 transition-all duration-700 cursor-default"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: ing.tone }}
                      />
                      <span className="text-xs font-light text-[#3d4a5c]/60">
                        {ing.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 7. PORTFOLIO GALLERY                                             */}
      {/* ================================================================ */}
      <section
        id="gallery"
        className="py-28"
        style={{ backgroundColor: "#f7f4f0" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
              portfolio
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              collected works
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
              A gallery of softness. Each piece an exercise in restraint and
              warmth.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <RevealBlock key={item.title} delay={i * 0.08}>
                <div
                  className="rounded-2xl border border-[#3d4a5c]/8 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(212,165,165,0.16)] transition-all duration-1000 group cursor-pointer"
                  style={{ backgroundColor: "#faf9f7" }}
                >
                  <div
                    className="h-32 transition-all duration-1000"
                    style={{
                      backgroundColor: item.accentColor,
                      opacity: Number(item.accentOpacity) / 100,
                    }}
                  />
                  <div className="p-6">
                    <p className="text-xs text-[#d4a5a5] font-light mb-2 tracking-wide">
                      {item.category}
                    </p>
                    <h3 className="text-base font-light text-[#3d4a5c] group-hover:text-[#3d4a5c]/70 transition-colors duration-700">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.5} className="mt-14 text-center">
            <button className="px-8 py-3 border border-[#3d4a5c]/12 text-[#3d4a5c]/60 rounded-2xl font-light text-sm hover:border-[#d4a5a5]/40 hover:text-[#3d4a5c] hover:-translate-y-0.5 transition-all duration-700">
              view all works
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. DESIGN PHILOSOPHY — K-beauty principles + typography          */}
      {/* ================================================================ */}
      <section id="principles" className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
            design philosophy
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            k-beauty principles
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
            Ancient Korean aesthetics translated into the language of interface
            design. Each principle a lesson in intentionality.
          </p>
        </RevealBlock>

        {/* K-beauty principle cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {kBeautyPrinciples.map((principle, i) => (
            <RevealBlock key={principle.korean} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#3d4a5c]/8 p-8 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(232,212,184,0.16)] transition-all duration-700 group">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-[#d4a5a5]/8 flex items-center justify-center group-hover:bg-[#d4a5a5]/15 transition-all duration-700">
                      <span className="text-xl font-light text-[#3d4a5c]">
                        {principle.korean}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs tracking-wide text-[#d4a5a5] mb-1 font-light">
                      {principle.english} &middot; {principle.ui}
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-3">
                      {principle.ui}
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Typography section */}
        <RevealBlock className="mb-12 text-center">
          <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
            type system
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            typography
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
            Font-light throughout. Every size a different tone, never a shout,
            always a whisper.
          </p>
        </RevealBlock>

        <div
          className="rounded-2xl border border-[#3d4a5c]/8 overflow-hidden shadow-[0_8px_24px_rgba(232,212,184,0.10)]"
          style={{ backgroundColor: "#faf9f7" }}
        >
          {typographyScale.map((item, i) => (
            <RevealBlock key={item.label} delay={i * 0.07}>
              <div
                className={`px-10 py-8 flex flex-col md:flex-row md:items-center gap-4 ${
                  i < typographyScale.length - 1 ? "border-b border-[#3d4a5c]/6" : ""
                }`}
              >
                <div className="md:w-32 shrink-0">
                  <span className="text-xs tracking-wide text-[#3d4a5c]/30 font-light">
                    {item.label}
                  </span>
                </div>
                <div className="flex-1">
                  <div className={item.className}>{item.sample}</div>
                </div>
                <div className="md:w-64 shrink-0">
                  <span className="text-xs text-[#3d4a5c]/25 font-light">
                    {item.note}
                  </span>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={0.4} className="mt-10">
          <div
            className="rounded-2xl border border-[#a8c5b8]/20 p-6 text-center"
            style={{ backgroundColor: "rgba(168,197,184,0.04)" }}
          >
            <p className="text-sm font-light text-[#3d4a5c]/60 leading-relaxed">
              <span className="text-[#3d4a5c]/35 text-xs tracking-wide block mb-2">
                guiding principle
              </span>
              All text uses{" "}
              <span className="text-[#3d4a5c]/80">font-light</span> as the
              default weight. When emphasis is needed, reduce opacity &mdash; never
              increase weight. Let silence speak.
            </p>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* 9. DO / DON&apos;T GUIDANCE                                           */}
      {/* ================================================================ */}
      <section className="py-28" style={{ backgroundColor: "#f7f4f0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-widest text-[#3d4a5c]/35 mb-4 font-light">
              design guidance
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              do and do not
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
              Knowing what to leave out is as important as knowing what to
              include. Restraint is active, not passive.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 gap-8">
            {doDontPairs.map((pair, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Do */}
                  <div
                    className="rounded-2xl border border-[#a8c5b8]/20 p-7"
                    style={{ backgroundColor: "rgba(168,197,184,0.05)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-5 rounded-full bg-[#a8c5b8]/30 flex items-center justify-center">
                        <span className="text-[#3d4a5c]/50 text-xs leading-none">+</span>
                      </div>
                      <span className="text-xs tracking-wide text-[#a8c5b8] font-light">
                        do
                      </span>
                    </div>
                    <h3 className="text-base font-light text-[#3d4a5c] mb-3">
                      {pair.doTitle}
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      {pair.doDescription}
                    </p>
                  </div>

                  {/* Don't */}
                  <div className="rounded-2xl border border-[#3d4a5c]/8 p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-5 rounded-full bg-[#3d4a5c]/6 flex items-center justify-center">
                        <span className="text-[#3d4a5c]/35 text-xs leading-none">&minus;</span>
                      </div>
                      <span className="text-xs tracking-wide text-[#3d4a5c]/35 font-light">
                        do not
                      </span>
                    </div>
                    <h3 className="text-base font-light text-[#3d4a5c]/50 mb-3 line-through decoration-[#d4a5a5]/40">
                      {pair.dontTitle}
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/35 leading-relaxed">
                      {pair.dontDescription}
                    </p>
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
      <footer
        className="border-t border-[#3d4a5c]/8 py-16"
        style={{ backgroundColor: "#faf9f7" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4a5a5]/60" />
                  <div className="w-1 h-1 rounded-full bg-[#a8c5b8]/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e8d4b8]/60" />
                </div>
                <span className="font-light tracking-wide text-[#3d4a5c] text-sm">
                  korean minimal
                </span>
              </div>
              <p className="text-xs font-light text-[#3d4a5c]/40 leading-relaxed">
                K-beauty minimalism translated into interface design. Pastel
                warmth, whispered contrasts, and intentional space.
              </p>
              {/* Palette dots */}
              <div className="flex gap-2">
                {palette.map((c) => (
                  <div
                    key={c.hex}
                    className="w-4 h-4 rounded-full hover:-translate-y-0.5 transition-all duration-700 cursor-default"
                    style={{
                      backgroundColor: c.hex,
                      border: c.border ? "1px solid rgba(61,74,92,0.10)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-light tracking-widest text-[#3d4a5c]/30">
                  style
                </span>
                <Link
                  href="/styles/korean-minimal"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  documentation
                </Link>
                <Link
                  href="/styles/korean-minimal/showcase"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  showcase
                </Link>
                <Link
                  href="/styles/korean-minimal/cover"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-light tracking-widest text-[#3d4a5c]/30">
                  navigate
                </span>
                <a
                  href="#palette"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  palette
                </a>
                <a
                  href="#components"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  components
                </a>
                <a
                  href="#animations"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  animations
                </a>
                <a
                  href="#gallery"
                  className="text-xs font-light text-[#3d4a5c]/50 hover:text-[#3d4a5c] transition-colors duration-700"
                >
                  gallery
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-light tracking-widest text-[#3d4a5c]/30">
                  palette
                </span>
                {palette.map((c) => (
                  <span
                    key={c.name}
                    className="flex items-center gap-2 text-xs font-light text-[#3d4a5c]/40"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{
                        backgroundColor: c.hex,
                        border: c.border ? "1px solid rgba(61,74,92,0.10)" : "none",
                      }}
                    />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Thin divider */}
          <div className="h-px bg-[#3d4a5c]/6 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-[#a8c5b8]/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a5a5]/30" />
                <div className="w-1 h-1 rounded-full bg-[#a8c5b8]/40" />
              </div>
              <p className="text-xs font-light text-[#3d4a5c]/25">
                beauty in restraint &middot; 2026
              </p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2 rounded-2xl border border-[#3d4a5c]/10 text-xs font-light text-[#3d4a5c]/50 hover:border-[#d4a5a5]/40 hover:text-[#3d4a5c] hover:-translate-y-0.5 transition-all duration-700"
            >
              <span>&#8592;</span>
              <span>Back to StyleKit</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
