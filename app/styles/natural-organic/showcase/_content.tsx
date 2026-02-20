"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
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
      { threshold: 0.15, ...options },
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
/*  Inline SVG motifs                                                   */
/* ------------------------------------------------------------------ */

function LeafMotif({
  className = "",
  color = "#8b9d77",
  size = 48,
  rotate = 0,
  opacity = 0.22,
}: {
  className?: string;
  color?: string;
  size?: number;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M24 4 C32 4 44 14 44 26 C44 36 36 44 24 44 C24 44 8 36 8 24 C8 12 16 4 24 4Z"
        fill={color}
      />
      <path
        d="M24 4 C24 4 24 44 24 44"
        stroke="#faf6f1"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}

function BranchMotif({
  className = "",
  color = "#8b9d77",
  width = 80,
  opacity = 0.18,
}: {
  className?: string;
  color?: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={width}
      height={Math.round(width * 0.7)}
      viewBox="0 0 80 56"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M4 52 C12 40 22 32 36 28 C50 24 62 26 76 16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M36 28 C30 18 26 10 28 4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M52 26 C56 18 60 14 58 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 36 C16 28 14 22 18 16"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoneMotif({
  className = "",
  color = "#d4a373",
  size = 36,
  opacity = 0.2,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={Math.round(size * 0.72)}
      viewBox="0 0 36 26"
      fill="none"
      style={{ opacity }}
    >
      <ellipse cx="18" cy="13" rx="17" ry="12" fill={color} />
      <ellipse cx="18" cy="11" rx="14" ry="9" fill={color} opacity={0.4} />
    </svg>
  );
}

function SeedlingMotif({
  className = "",
  size = 40,
  opacity = 0.2,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M20 36 L20 18"
        stroke="#8b9d77"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 22 C14 20 10 14 12 8 C16 8 20 12 20 18 C20 12 24 8 28 8 C30 14 26 20 20 22Z"
        fill="#8b9d77"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const colorPalette = [
  { name: "Earth Brown", hex: "#5c4033", label: "primary", dark: true },
  { name: "Warm Cream", hex: "#faf6f1", label: "background", dark: false },
  { name: "Sage Green", hex: "#8b9d77", label: "accent", dark: false },
  { name: "Warm Tan", hex: "#d4a373", label: "highlight", dark: false },
  { name: "Sand", hex: "#e9e0d4", label: "surface", dark: false },
];

const typographyPairs = [
  {
    label: "Display — Serif Light",
    sample: "Rooted in the Earth",
    className: "text-4xl font-serif font-light leading-tight",
    token: "font-serif font-light text-4xl",
    color: "#5c4033",
  },
  {
    label: "Heading — Serif Regular",
    sample: "Natural Forms",
    className: "text-2xl font-serif",
    token: "font-serif text-2xl",
    color: "#5c4033",
  },
  {
    label: "Subheading — Serif Medium",
    sample: "Hand-potted, slow-made",
    className: "text-lg font-serif font-medium",
    token: "font-serif font-medium text-lg",
    color: "rgba(92,64,51,0.75)",
  },
  {
    label: "Body — Serif Light",
    sample:
      "Every glaze carries the fingerprint of its maker. Each crack in the slip tells a story older than memory.",
    className: "text-base font-serif font-light leading-relaxed",
    token: "font-serif font-light text-base",
    color: "rgba(92,64,51,0.65)",
  },
  {
    label: "Caption — Serif Italic",
    sample: "Kiln-fired at dawn, 2024",
    className: "text-sm font-serif italic",
    token: "font-serif italic text-sm",
    color: "rgba(92,64,51,0.45)",
  },
];

const doRules = [
  "Earth brown #5c4033 and warm cream #faf6f1 as the base layer",
  "Organic irregular rounded corners — rounded-[2rem] or blob shapes",
  "Sage green #8b9d77 as the fresh accent for action states",
  "Leaf, branch, stone inline SVG motifs — hand-drawn, never clipart",
  "font-serif font-light for organic, unhurried reading flow",
  "Soft earthy shadows: 0 4px 20px rgba(92,64,51,0.1)",
  "Natural texture via subtle color field backgrounds",
  "hover:bg-[#f0e8df] warm hover states that feel like sunlight",
  "Asymmetric spacing and slightly uneven layouts — nature abhors a grid",
];

const dontRules = [
  "No cold modern blues — they break the earthy warmth",
  "No sharp geometric corners — this is not a tech product",
  "No heavy dark drop-shadows — they feel synthetic and harsh",
  "No neon or highly saturated colors — all hues should feel sun-dried",
  "No dense uppercase tracking — let the serif breathe lowercase",
  "No perfectly identical spacing between every element",
  "No monospace fonts or code-aesthetic elements",
  "No pure black — use #5c4033 earth brown as your darkest tone",
];

const journalEntries = [
  {
    date: "March 3",
    title: "Morning in the Clay Studio",
    body: "The wheel spun slower today. I let the walls grow thicker, uneven at the rim. The imperfection was the point.",
    tag: "ceramics",
    tagColor: "#d4a373",
  },
  {
    date: "March 7",
    title: "Pressing Leaves into Paper",
    body: "Ferns collected from the low meadow. Each vein a map of water pulled upward against gravity for years.",
    tag: "botanical",
    tagColor: "#8b9d77",
  },
  {
    date: "March 14",
    title: "The Smell of Damp Earth",
    body: "After rain, the garden releases something ancient. Petrichor — Latin for the stone's blood. It was always water.",
    tag: "garden",
    tagColor: "#5c4033",
  },
];

/* ------------------------------------------------------------------ */
/*  Small reusable sub-components                                       */
/* ------------------------------------------------------------------ */

function SageTag({ label, color = "#8b9d77" }: { label: string; color?: string }) {
  return (
    <span
      className="inline-block text-xs font-serif px-3 py-1 rounded-full"
      style={{
        color,
        backgroundColor: `${color}18`,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");
  const [expandedJournal, setExpandedJournal] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen font-serif overflow-x-hidden"
      style={{ backgroundColor: "#faf6f1", color: "#5c4033" }}
    >
      {/* ============================================================ */}
      {/* 1. Fixed Nav                                                  */}
      {/* ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(250,246,241,0.94)",
          borderBottom: "1px solid rgba(92,64,51,0.08)",
          boxShadow: "0 2px 16px rgba(92,64,51,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between" style={{ height: 68 }}>
            {/* Wordmark */}
            <div className="flex items-center gap-3">
              <LeafMotif color="#8b9d77" size={22} opacity={0.85} />
              <span
                className="font-serif font-light text-base tracking-wide"
                style={{ color: "#5c4033" }}
              >
                Natural Organic
              </span>
            </div>

            {/* Center nav links — hidden on mobile */}
            <nav className="hidden md:flex items-center gap-8">
              {["Components", "Palette", "Typography", "Principles"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-serif font-light text-sm transition-colors duration-300"
                  style={{ color: "rgba(92,64,51,0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#5c4033";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,51,0.5)";
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Back to StyleKit */}
            <Link
              href="/"
              className="flex items-center gap-1.5 font-serif font-light text-sm transition-colors duration-300 group"
              style={{ color: "#8b9d77" }}
            >
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero                                                       */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-24 px-6 md:px-12 overflow-hidden">
        {/* Organic background color fields */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 75% 22%, rgba(139,157,119,0.13) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 15% 80%, rgba(212,163,115,0.11) 0%, transparent 52%), " +
              "radial-gradient(ellipse at 50% 55%, rgba(233,224,212,0.3) 0%, transparent 60%)",
          }}
        />

        {/* Scattered botanical decorations */}
        <div className="absolute top-28 right-16 hidden lg:block">
          <BranchMotif color="#8b9d77" width={120} opacity={0.2} />
        </div>
        <div className="absolute top-44 right-44 hidden lg:block">
          <LeafMotif color="#8b9d77" size={52} rotate={-22} opacity={0.15} />
        </div>
        <div className="absolute bottom-36 left-8 hidden md:block">
          <BranchMotif color="#d4a373" width={90} opacity={0.16} />
        </div>
        <div className="absolute bottom-48 left-32 hidden md:block">
          <LeafMotif color="#5c4033" size={36} rotate={35} opacity={0.1} />
        </div>
        <div className="absolute top-1/2 left-5 hidden lg:block">
          <StoneMotif color="#d4a373" size={48} opacity={0.14} />
        </div>
        <div className="absolute bottom-24 right-32 hidden lg:block">
          <SeedlingMotif size={44} opacity={0.18} />
        </div>

        {/* Content */}
        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Eyebrow */}
          <p
            className="font-serif font-light text-sm tracking-[0.18em] mb-7"
            style={{
              color: "rgba(139,157,119,0.9)",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            自然有机风 — Natural Organic
          </p>

          {/* Main title */}
          <h1
            className="font-serif font-light leading-none mb-7"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              color: "#5c4033",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s",
            }}
          >
            Rooted in the
            <br />
            <span style={{ color: "#8b9d77" }}>earth.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-serif font-light text-lg leading-relaxed max-w-xl mb-12"
            style={{
              color: "rgba(92,64,51,0.55)",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            Earthy tones, organic shapes, and natural textures. Warm and
            approachable — like a hand-potted ceramic or a handmade journal
            left open in afternoon light.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.36s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.36s",
            }}
          >
            {/* Primary — earth brown */}
            <button
              className="px-10 py-4 font-serif font-light rounded-[2rem] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
              style={{
                backgroundColor: "#5c4033",
                color: "#faf6f1",
                boxShadow: "0 4px 20px rgba(92,64,51,0.22)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4a3028";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5c4033";
              }}
            >
              Explore the style
            </button>

            {/* Ghost — sage green */}
            <button
              className="px-10 py-4 font-serif font-light rounded-[2rem] border transition-all duration-500 hover:scale-[1.01] focus:outline-none"
              style={{
                color: "#8b9d77",
                borderColor: "rgba(139,157,119,0.35)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(139,157,119,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              Read the journal
            </button>
          </div>

          {/* Organic leaf divider */}
          <div
            className="flex items-center gap-4"
            style={{
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(92,64,51,0.1)" }} />
            <LeafMotif color="#8b9d77" size={18} opacity={0.4} />
            <LeafMotif color="#d4a373" size={14} rotate={60} opacity={0.35} />
            <LeafMotif color="#8b9d77" size={18} rotate={120} opacity={0.4} />
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(92,64,51,0.1)" }} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Component demos                                            */}
      {/* ============================================================ */}
      <section
        id="components"
        className="relative py-24 md:py-32 px-6 md:px-12"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 85% 50%, rgba(233,224,212,0.35) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <BranchMotif color="#8b9d77" width={50} opacity={0.4} />
              <p
                className="font-serif font-light text-xs tracking-[0.2em]"
                style={{ color: "rgba(139,157,119,0.8)" }}
              >
                Components
              </p>
            </div>
            <h2
              className="font-serif font-light leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#5c4033" }}
            >
              Organic building blocks
            </h2>
            <p
              className="font-serif font-light text-base leading-relaxed max-w-md"
              style={{ color: "rgba(92,64,51,0.55)" }}
            >
              Every component shaped like it grew — rounded at the edges,
              warm in tone, never rigid or synthetic.
            </p>
          </RevealBlock>

          {/* Tab switcher — organic pill shape */}
          <RevealBlock delay={0.08} className="mb-10">
            <div
              className="flex items-center gap-1 w-fit p-1.5 rounded-[2rem]"
              style={{
                backgroundColor: "#e9e0d4",
                boxShadow: "inset 0 2px 6px rgba(92,64,51,0.08)",
              }}
            >
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setComponentTab(tab)}
                  className="px-6 py-2 font-serif font-light text-sm rounded-[1.5rem] transition-all duration-300 focus:outline-none"
                  style={
                    componentTab === tab
                      ? {
                          backgroundColor: "#faf6f1",
                          color: "#5c4033",
                          boxShadow: "0 2px 8px rgba(92,64,51,0.12)",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "rgba(92,64,51,0.45)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (componentTab !== tab) {
                      (e.currentTarget as HTMLButtonElement).style.color = "#5c4033";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (componentTab !== tab) {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(92,64,51,0.45)";
                    }
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.14}>
            <div
              className="relative rounded-[2rem] p-10 md:p-14 overflow-hidden"
              style={{
                backgroundColor: "#faf6f1",
                border: "1px solid rgba(92,64,51,0.07)",
                boxShadow: "0 4px 28px rgba(92,64,51,0.07)",
              }}
            >
              {/* Corner leaf accents */}
              <div className="absolute top-6 right-8 pointer-events-none">
                <LeafMotif color="#8b9d77" size={32} rotate={-30} opacity={0.15} />
              </div>
              <div className="absolute bottom-6 left-8 pointer-events-none">
                <LeafMotif color="#d4a373" size={24} rotate={140} opacity={0.12} />
              </div>

              {/* ---- Buttons tab ---- */}
              {componentTab === "button" && (
                <div className="flex flex-col gap-10">
                  <div>
                    <p
                      className="font-serif font-light text-xs tracking-[0.15em] mb-5"
                      style={{ color: "rgba(92,64,51,0.4)" }}
                    >
                      Primary variants
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {/* Earth brown */}
                      <button
                        className="px-8 py-3.5 font-serif font-light rounded-[2rem] transition-all duration-400 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                        style={{
                          backgroundColor: "#5c4033",
                          color: "#faf6f1",
                          boxShadow: "0 4px 16px rgba(92,64,51,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4a3028";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5c4033";
                        }}
                      >
                        Earth — primary
                      </button>

                      {/* Sage green */}
                      <button
                        className="px-8 py-3.5 font-serif font-light rounded-[2rem] transition-all duration-400 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                        style={{
                          backgroundColor: "#8b9d77",
                          color: "#faf6f1",
                          boxShadow: "0 4px 16px rgba(139,157,119,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7a8c67";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#8b9d77";
                        }}
                      >
                        Sage — action
                      </button>

                      {/* Warm tan */}
                      <button
                        className="px-8 py-3.5 font-serif font-light rounded-[2rem] transition-all duration-400 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                        style={{
                          backgroundColor: "#d4a373",
                          color: "#5c4033",
                          boxShadow: "0 4px 16px rgba(212,163,115,0.22)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c49363";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4a373";
                        }}
                      >
                        Tan — highlight
                      </button>
                    </div>
                  </div>

                  <div>
                    <p
                      className="font-serif font-light text-xs tracking-[0.15em] mb-5"
                      style={{ color: "rgba(92,64,51,0.4)" }}
                    >
                      Ghost / outline variants
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        className="px-8 py-3.5 font-serif font-light rounded-[2rem] border transition-all duration-400 focus:outline-none"
                        style={{
                          color: "#5c4033",
                          borderColor: "rgba(92,64,51,0.25)",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f0e8df";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        }}
                      >
                        Ghost earth
                      </button>

                      <button
                        className="px-8 py-3.5 font-serif font-light rounded-[2rem] border transition-all duration-400 focus:outline-none"
                        style={{
                          color: "#8b9d77",
                          borderColor: "rgba(139,157,119,0.3)",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            "rgba(139,157,119,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                        }}
                      >
                        Ghost sage
                      </button>

                      <button
                        className="px-8 py-3.5 font-serif font-light rounded-[2rem] transition-all duration-400 focus:outline-none"
                        style={{
                          color: "rgba(92,64,51,0.45)",
                          backgroundColor: "#e9e0d4",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ddd3c5";
                          (e.currentTarget as HTMLButtonElement).style.color = "#5c4033";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e9e0d4";
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(92,64,51,0.45)";
                        }}
                      >
                        Sand surface
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- Card tab ---- */}
              {componentTab === "card" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Standard — cream card */}
                  <div
                    className="group p-8 rounded-[2rem] cursor-pointer transition-all duration-500 hover:-translate-y-1"
                    style={{
                      backgroundColor: "#f5f0eb",
                      border: "1px solid rgba(92,64,51,0.07)",
                      boxShadow: "0 4px 20px rgba(92,64,51,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 32px rgba(92,64,51,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 4px 20px rgba(92,64,51,0.07)";
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <SageTag label="ceramics" />
                      <LeafMotif color="#8b9d77" size={22} rotate={-15} opacity={0.35} />
                    </div>
                    <h3
                      className="font-serif font-light text-xl mb-3 transition-colors duration-400"
                      style={{ color: "#5c4033" }}
                    >
                      Hand-thrown bowl
                    </h3>
                    <p
                      className="font-serif font-light text-sm leading-relaxed"
                      style={{ color: "rgba(92,64,51,0.55)" }}
                    >
                      Wheel-thrown in stoneware clay, glazed with ash and iron
                      oxide. Each piece carries a slight asymmetry — proof of hands.
                    </p>
                  </div>

                  {/* Dark — earth brown card */}
                  <div
                    className="group relative p-8 rounded-[2rem] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    style={{
                      backgroundColor: "#5c4033",
                      boxShadow: "0 4px 24px rgba(92,64,51,0.22)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 36px rgba(92,64,51,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 4px 24px rgba(92,64,51,0.22)";
                    }}
                  >
                    <div className="absolute top-4 right-6 pointer-events-none">
                      <LeafMotif color="#d4a373" size={36} rotate={20} opacity={0.25} />
                    </div>
                    <div className="mb-4">
                      <span
                        className="inline-block text-xs font-serif px-3 py-1 rounded-full"
                        style={{
                          color: "#d4a373",
                          backgroundColor: "rgba(212,163,115,0.15)",
                          border: "1px solid rgba(212,163,115,0.25)",
                        }}
                      >
                        botanical
                      </span>
                    </div>
                    <h3
                      className="font-serif font-light text-xl mb-3"
                      style={{ color: "#faf6f1" }}
                    >
                      Pressed fern study
                    </h3>
                    <p
                      className="font-serif font-light text-sm leading-relaxed"
                      style={{ color: "rgba(250,246,241,0.55)" }}
                    >
                      Collected at the woodland edge after autumn rain. Mounted
                      on laid paper using rice-starch paste — traditional method.
                    </p>
                  </div>
                </div>
              )}

              {/* ---- Input tab ---- */}
              {componentTab === "input" && (
                <div className="max-w-lg mx-auto flex flex-col gap-6">
                  <div>
                    <label
                      className="block font-serif font-light text-sm italic mb-2 tracking-wide"
                      style={{ color: "rgba(92,64,51,0.5)" }}
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Write gently here..."
                      className="w-full px-5 py-4 font-serif font-light text-base rounded-[1.5rem] outline-none transition-all duration-400"
                      style={{
                        backgroundColor: "#f5f0eb",
                        border: "1px solid rgba(92,64,51,0.12)",
                        color: "#5c4033",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(139,157,119,0.45)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 0 3px rgba(139,157,119,0.08)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(92,64,51,0.12)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block font-serif font-light text-sm italic mb-2 tracking-wide"
                      style={{ color: "rgba(92,64,51,0.5)" }}
                    >
                      Material
                    </label>
                    <select
                      className="w-full px-5 py-4 font-serif font-light text-base rounded-[1.5rem] outline-none transition-all duration-400 appearance-none cursor-pointer"
                      style={{
                        backgroundColor: "#f5f0eb",
                        border: "1px solid rgba(92,64,51,0.12)",
                        color: "#5c4033",
                      }}
                    >
                      {["Stoneware clay", "Terracotta", "Porcelain", "Handmade paper"].map(
                        (opt) => (
                          <option key={opt}>{opt}</option>
                        ),
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block font-serif font-light text-sm italic mb-2 tracking-wide"
                      style={{ color: "rgba(92,64,51,0.5)" }}
                    >
                      A note
                    </label>
                    <textarea
                      placeholder="Let the words settle slowly..."
                      rows={4}
                      className="w-full px-5 py-4 font-serif font-light text-base rounded-[1.5rem] outline-none transition-all duration-400 resize-none"
                      style={{
                        backgroundColor: "#f5f0eb",
                        border: "1px solid rgba(92,64,51,0.12)",
                        color: "#5c4033",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                          "rgba(139,157,119,0.45)";
                        (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                          "0 0 0 3px rgba(139,157,119,0.08)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                          "rgba(92,64,51,0.12)";
                        (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    className="w-full py-4 font-serif font-light rounded-[2rem] transition-all duration-400 hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
                    style={{
                      backgroundColor: "#5c4033",
                      color: "#faf6f1",
                      boxShadow: "0 4px 16px rgba(92,64,51,0.18)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4a3028";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5c4033";
                    }}
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Color palette — organic blob swatches                     */}
      {/* ============================================================ */}
      <section
        id="palette"
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 40%, rgba(233,224,212,0.42) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <StoneMotif color="#d4a373" size={28} opacity={0.5} />
              <p
                className="font-serif font-light text-xs tracking-[0.2em]"
                style={{ color: "rgba(212,163,115,0.9)" }}
              >
                Palette
              </p>
            </div>
            <h2
              className="font-serif font-light leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#5c4033" }}
            >
              Colors of soil and stone
            </h2>
            <p
              className="font-serif font-light text-base leading-relaxed max-w-md"
              style={{ color: "rgba(92,64,51,0.55)" }}
            >
              Five tones drawn from the natural world — earth, cream, sage,
              tan, and sand. Nothing synthetic, nothing cold.
            </p>
          </RevealBlock>

          {/* Organic blob swatches — slightly irregular arrangement */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {colorPalette.map((swatch, i) => {
              const blobRadii = [
                "62% 38% 46% 54% / 55% 48% 52% 45%",
                "48% 52% 38% 62% / 42% 58% 44% 56%",
                "55% 45% 60% 40% / 50% 44% 56% 50%",
                "40% 60% 52% 48% / 58% 42% 48% 52%",
                "52% 48% 44% 56% / 46% 54% 58% 42%",
              ];
              const sizes = [180, 160, 192, 156, 172];
              const vertOffsets = [0, 14, -8, 18, 4];

              return (
                <RevealBlock key={swatch.hex} delay={i * 0.07}>
                  <div
                    className="flex flex-col items-center gap-4 group cursor-default"
                    style={{ marginTop: vertOffsets[i] }}
                  >
                    <div
                      className="transition-transform duration-500 group-hover:scale-105 flex items-end justify-end"
                      style={{
                        width: sizes[i],
                        height: Math.round(sizes[i] * 0.9),
                        backgroundColor: swatch.hex,
                        borderRadius: blobRadii[i],
                        boxShadow: "0 6px 24px rgba(92,64,51,0.11)",
                        border:
                          swatch.hex === "#faf6f1"
                            ? "1px solid rgba(92,64,51,0.13)"
                            : "none",
                        padding: "14px 18px",
                      }}
                    >
                      <span
                        className="font-serif font-light text-xs tracking-widest"
                        style={{
                          color: swatch.dark
                            ? "rgba(250,246,241,0.65)"
                            : swatch.hex === "#faf6f1"
                            ? "rgba(92,64,51,0.35)"
                            : "rgba(92,64,51,0.45)",
                        }}
                      >
                        {swatch.hex}
                      </span>
                    </div>
                    <div className="text-center">
                      <p
                        className="font-serif font-light text-sm"
                        style={{ color: "#5c4033" }}
                      >
                        {swatch.name}
                      </p>
                      <p
                        className="font-serif font-light text-xs mt-0.5"
                        style={{ color: "rgba(92,64,51,0.4)" }}
                      >
                        {swatch.label}
                      </p>
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Typography — Organic type scale                           */}
      {/* ============================================================ */}
      <section
        id="typography"
        className="relative py-24 md:py-32 px-6 md:px-12"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(139,157,119,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <SeedlingMotif size={28} opacity={0.55} />
              <p
                className="font-serif font-light text-xs tracking-[0.2em]"
                style={{ color: "rgba(139,157,119,0.85)" }}
              >
                Typography
              </p>
            </div>
            <h2
              className="font-serif font-light leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#5c4033" }}
            >
              Words that breathe
            </h2>
            <p
              className="font-serif font-light text-base leading-relaxed max-w-md"
              style={{ color: "rgba(92,64,51,0.55)" }}
            >
              Serif light as the backbone. Every size chosen for natural reading
              rhythm, not information density.
            </p>
          </RevealBlock>

          <div className="space-y-5">
            {typographyPairs.map((pair, i) => (
              <RevealBlock key={pair.label} delay={i * 0.06}>
                <div
                  className="p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-400 cursor-default"
                  style={{
                    backgroundColor: "#faf6f1",
                    border: "1px solid rgba(92,64,51,0.06)",
                    boxShadow: "0 2px 12px rgba(92,64,51,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f0e8df";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 20px rgba(92,64,51,0.09)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "#faf6f1";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 2px 12px rgba(92,64,51,0.05)";
                  }}
                >
                  <div className="flex-1">
                    <p
                      className={pair.className}
                      style={{ color: pair.color }}
                    >
                      {pair.sample}
                    </p>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <p
                      className="font-serif font-light text-xs tracking-[0.12em] mb-1"
                      style={{ color: "rgba(92,64,51,0.35)" }}
                    >
                      {pair.label}
                    </p>
                    <code
                      className="font-serif text-xs"
                      style={{ color: "#8b9d77" }}
                    >
                      {pair.token}
                    </code>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Design principles — do / don't panels                    */}
      {/* ============================================================ */}
      <section
        id="principles"
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 10% 60%, rgba(212,163,115,0.09) 0%, transparent 50%), " +
              "radial-gradient(ellipse at 90% 30%, rgba(139,157,119,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="absolute top-16 right-20 hidden lg:block pointer-events-none">
          <BranchMotif color="#8b9d77" width={70} opacity={0.15} />
        </div>
        <div className="absolute bottom-20 left-16 hidden lg:block pointer-events-none">
          <BranchMotif color="#d4a373" width={55} opacity={0.12} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <LeafMotif color="#5c4033" size={22} rotate={10} opacity={0.5} />
              <p
                className="font-serif font-light text-xs tracking-[0.2em]"
                style={{ color: "rgba(92,64,51,0.55)" }}
              >
                Design principles
              </p>
            </div>
            <h2
              className="font-serif font-light leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#5c4033" }}
            >
              The maker&apos;s rules
            </h2>
            <p
              className="font-serif font-light text-base leading-relaxed max-w-md"
              style={{ color: "rgba(92,64,51,0.55)" }}
            >
              Notes from the studio — principles that keep this system
              warm, organic, and honest.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do — sage green panel */}
            <RevealBlock delay={0.05}>
              <div
                className="relative p-10 rounded-[2rem] overflow-hidden h-full"
                style={{
                  backgroundColor: "#faf6f1",
                  border: "1px solid rgba(139,157,119,0.18)",
                  boxShadow: "0 4px 24px rgba(139,157,119,0.08)",
                }}
              >
                <div className="absolute top-5 right-6 pointer-events-none">
                  <LeafMotif color="#8b9d77" size={38} rotate={-25} opacity={0.18} />
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(139,157,119,0.2)" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="#8b9d77"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-serif font-light text-lg"
                    style={{ color: "#8b9d77" }}
                  >
                    Do
                  </h3>
                </div>

                <ul className="space-y-4">
                  {doRules.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-serif font-light text-sm leading-relaxed"
                      style={{ color: "rgba(92,64,51,0.65)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#8b9d77", opacity: 0.6 }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't — warm tan panel */}
            <RevealBlock delay={0.1}>
              <div
                className="relative p-10 rounded-[2rem] overflow-hidden h-full"
                style={{
                  backgroundColor: "#faf6f1",
                  border: "1px solid rgba(212,163,115,0.2)",
                  boxShadow: "0 4px 24px rgba(212,163,115,0.08)",
                }}
              >
                <div className="absolute top-5 right-8 pointer-events-none">
                  <StoneMotif color="#d4a373" size={36} opacity={0.16} />
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(212,163,115,0.2)" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="#d4a373"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-serif font-light text-lg"
                    style={{ color: "#d4a373" }}
                  >
                    Don&apos;t
                  </h3>
                </div>

                <ul className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-serif font-light text-sm leading-relaxed"
                      style={{ color: "rgba(92,64,51,0.65)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#d4a373", opacity: 0.55 }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Studio quote */}
          <RevealBlock delay={0.18} className="mt-10">
            <div
              className="relative p-10 md:p-14 rounded-[2rem] text-center overflow-hidden"
              style={{
                backgroundColor: "#5c4033",
                boxShadow: "0 8px 32px rgba(92,64,51,0.18)",
              }}
            >
              <div className="absolute top-8 left-10 pointer-events-none">
                <LeafMotif color="#d4a373" size={40} rotate={-10} opacity={0.2} />
              </div>
              <div className="absolute bottom-8 right-12 pointer-events-none">
                <BranchMotif color="#faf6f1" width={60} opacity={0.08} />
              </div>
              <div className="absolute top-6 right-16 pointer-events-none">
                <LeafMotif color="#8b9d77" size={28} rotate={30} opacity={0.15} />
              </div>

              <p
                className="relative z-10 font-serif font-light text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
                style={{ color: "rgba(250,246,241,0.75)" }}
              >
                &ldquo;Nothing in nature is perfectly symmetrical. The crack in the
                glaze, the grain in the paper, the knot in the wood — that is where
                the warmth lives.&rdquo;
              </p>
              <span
                className="relative z-10 mt-6 block font-serif font-light text-xs tracking-[0.2em]"
                style={{ color: "rgba(212,163,115,0.6)" }}
              >
                — Studio principle
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6b. Field journal — interactive expandable cards             */}
      {/* ============================================================ */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 80%, rgba(233,224,212,0.3) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <LeafMotif color="#d4a373" size={20} rotate={45} opacity={0.6} />
              <p
                className="font-serif font-light text-xs tracking-[0.2em]"
                style={{ color: "rgba(212,163,115,0.85)" }}
              >
                Field journal
              </p>
            </div>
            <h2
              className="font-serif font-light leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#5c4033" }}
            >
              Pages from the studio
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {journalEntries.map((entry, i) => (
              <RevealBlock key={entry.title} delay={i * 0.07}>
                <button
                  type="button"
                  className="w-full text-left p-8 rounded-[2rem] cursor-pointer transition-all duration-500 focus:outline-none"
                  style={{
                    backgroundColor: "#faf6f1",
                    border: "1px solid rgba(92,64,51,0.07)",
                    boxShadow:
                      expandedJournal === i
                        ? "0 10px 32px rgba(92,64,51,0.12)"
                        : "0 4px 16px rgba(92,64,51,0.06)",
                  }}
                  onClick={() =>
                    setExpandedJournal(expandedJournal === i ? null : i)
                  }
                  onMouseEnter={(e) => {
                    if (expandedJournal !== i) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f0e8df";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedJournal !== i) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#faf6f1";
                    }
                  }}
                >
                  {/* Date + leaf icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-serif font-light text-xs tracking-[0.12em]"
                      style={{ color: "rgba(92,64,51,0.4)" }}
                    >
                      {entry.date}
                    </span>
                    <div
                      className="transition-transform duration-500"
                      style={{ transform: expandedJournal === i ? "rotate(0deg)" : "rotate(-15deg)" }}
                    >
                      <LeafMotif
                        color={entry.tagColor}
                        size={18}
                        opacity={0.4}
                      />
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="mb-3">
                    <SageTag label={entry.tag} color={entry.tagColor} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif font-light text-lg mb-3 transition-colors duration-400"
                    style={{
                      color: expandedJournal === i ? "#8b9d77" : "#5c4033",
                    }}
                  >
                    {entry.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="font-serif font-light text-sm leading-relaxed"
                    style={{ color: "rgba(92,64,51,0.55)" }}
                  >
                    {entry.body}
                  </p>

                  {/* Expanded content */}
                  {expandedJournal === i && (
                    <div
                      className="mt-5 pt-5"
                      style={{ borderTop: "1px solid rgba(92,64,51,0.08)" }}
                    >
                      <p
                        className="font-serif font-light text-sm italic leading-relaxed"
                        style={{ color: "rgba(92,64,51,0.4)" }}
                      >
                        A practice of presence — returning to materials that
                        resist shortcuts. The slowness is the method.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <StoneMotif color={entry.tagColor} size={20} opacity={0.35} />
                        <span
                          className="font-serif font-light text-xs"
                          style={{ color: "rgba(92,64,51,0.35)" }}
                        >
                          tap to close
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Footer                                                     */}
      {/* ============================================================ */}
      <footer
        className="relative py-16 md:py-20 px-6 md:px-12 overflow-hidden"
        style={{
          backgroundColor: "#faf6f1",
          borderTop: "1px solid rgba(92,64,51,0.08)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(212,163,115,0.07) 0%, transparent 60%)",
          }}
        />

        {/* Botanical motif accents */}
        <div className="absolute bottom-8 left-10 pointer-events-none">
          <BranchMotif color="#8b9d77" width={80} opacity={0.15} />
        </div>
        <div className="absolute top-8 right-16 pointer-events-none">
          <LeafMotif color="#d4a373" size={32} rotate={25} opacity={0.14} />
        </div>
        <div className="absolute bottom-12 right-32 hidden md:block pointer-events-none">
          <LeafMotif color="#8b9d77" size={22} rotate={-40} opacity={0.12} />
        </div>
        <div className="absolute top-10 left-1/3 hidden md:block pointer-events-none">
          <StoneMotif color="#d4a373" size={24} opacity={0.12} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Wordmark + tagline */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <LeafMotif color="#8b9d77" size={24} opacity={0.7} />
                <span
                  className="font-serif font-light text-lg tracking-wide"
                  style={{ color: "#5c4033" }}
                >
                  Natural Organic
                </span>
              </div>
              <p
                className="font-serif font-light text-xs leading-relaxed max-w-xs"
                style={{ color: "rgba(92,64,51,0.4)" }}
              >
                Part of StyleKit — a living collection of design systems
                inspired by the natural and handmade world.
              </p>
            </div>

            {/* Color blob row */}
            <div className="flex items-center gap-3">
              {colorPalette.map((c, i) => {
                const blobs = [
                  "50% 40% 55% 45% / 45% 55% 40% 50%",
                  "44% 56% 48% 52% / 52% 48% 56% 44%",
                  "58% 42% 52% 48% / 46% 54% 44% 56%",
                  "42% 58% 46% 54% / 54% 46% 58% 42%",
                  "50% 50% 44% 56% / 48% 52% 50% 50%",
                ];
                return (
                  <div
                    key={c.hex}
                    className="transition-transform duration-400 hover:scale-110 cursor-default"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: c.hex,
                      borderRadius: blobs[i],
                      border:
                        c.hex === "#faf6f1"
                          ? "1px solid rgba(92,64,51,0.14)"
                          : "none",
                      boxShadow: "0 2px 8px rgba(92,64,51,0.1)",
                    }}
                    title={c.name}
                  />
                );
              })}
            </div>

            {/* Nav links */}
            <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link
                href="/styles/natural-organic"
                className="font-serif font-light text-xs tracking-wide transition-colors duration-400"
                style={{ color: "rgba(92,64,51,0.38)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#8b9d77";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,51,0.38)";
                }}
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="font-serif font-light text-xs tracking-wide transition-colors duration-400"
                style={{ color: "rgba(92,64,51,0.38)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#5c4033";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,51,0.38)";
                }}
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="font-serif font-light text-xs tracking-wide transition-colors duration-400"
                style={{ color: "rgba(92,64,51,0.38)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#5c4033";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(92,64,51,0.38)";
                }}
              >
                Home
              </Link>
            </nav>
          </div>

          {/* Bottom rule */}
          <div
            className="mt-12 pt-8 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(92,64,51,0.07)" }}
          >
            <p
              className="font-serif font-light text-xs"
              style={{ color: "rgba(92,64,51,0.28)" }}
            >
              StyleKit &middot; Natural Organic &middot; {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-2">
              <LeafMotif color="#8b9d77" size={14} rotate={-10} opacity={0.4} />
              <LeafMotif color="#d4a373" size={10} rotate={50} opacity={0.35} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
