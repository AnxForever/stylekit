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
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                 */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Onyx", hex: "#1a1a1a", label: "Primary Text" },
  { name: "Marble White", hex: "#f8f6f3", label: "Background" },
  { name: "Antique Gold", hex: "#c9a96e", label: "Accent" },
  { name: "Warm Taupe", hex: "#8a7968", label: "Secondary Text" },
  { name: "Light Marble", hex: "#e8e0d6", label: "Surface" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "typography";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1 — Monumental Weight: track hover states for shadow layer demo
  const [monumentalHovered, setMonumentalHovered] = useState<number | null>(null);

  // aiRule 2 — Foil Stamping Shift: toggle gold shimmer
  const [foilActive, setFoilActive] = useState(false);
  const [foilHoveredBtn, setFoilHoveredBtn] = useState<number | null>(null);

  // aiRule 3 — Cold & Rigid: track press state
  const [rigidPressed, setRigidPressed] = useState<number | null>(null);

  // aiRule 4 — Polish Gleam: card brightness demo
  const [gleamHovered, setGleamHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen font-serif overflow-x-hidden"
      style={{ backgroundColor: "#f8f6f3", color: "#1a1a1a" }}
    >
      <style>{`
        @keyframes ml-gold-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .ml-gold-shimmer {
          background: linear-gradient(90deg, #c9a96e 0%, #f1dbc1 40%, #c9a96e 60%, #8a7968 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ml-gold-flow 3s linear infinite;
        }
        .ml-gold-shimmer-hover {
          background: linear-gradient(90deg, #8a7968 0%, #c9a96e 30%, #f1dbc1 50%, #c9a96e 70%, #8a7968 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: background-position 0.7s ease-out;
        }
        .ml-gold-shimmer-hover:hover {
          animation: ml-gold-flow 1.5s linear infinite;
        }
        .ml-underline-center {
          position: relative;
          display: inline-block;
        }
        .ml-underline-center::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: #c9a96e;
          transition: all 0.5s ease-in-out;
          transform: translateX(-50%);
        }
        .ml-underline-center:hover::after {
          width: 100%;
          left: 0;
          transform: translateX(0);
        }
        .ml-marble-texture {
          background-color: #f8f6f3;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(138,121,104,0.035) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.025) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 80%, rgba(138,121,104,0.03) 0%, transparent 45%),
            radial-gradient(ellipse at 65% 35%, rgba(232,224,214,0.04) 0%, transparent 30%);
        }
        .ml-gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #c9a96e 20%, #c9a96e 80%, transparent 100%);
          opacity: 0.3;
        }
        .ml-gold-line-full {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #c9a96e 30%, #f1dbc1 50%, #c9a96e 70%, transparent 100%);
          opacity: 0.4;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(248,246,243,0.92)",
          borderBottom: "1px solid rgba(201,169,110,0.18)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "linear-gradient(180deg, transparent, #c9a96e, transparent)",
              }}
            />
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "#1a1a1a" }}
            >
              Marble<span style={{ color: "#c9a96e" }}>&nbsp;Luxury</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Palette", "Components", "Philosophy", "Rules"].map((item) => (
              <span
                key={item}
                className="ml-underline-center text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors duration-500"
                style={{ color: "#8a7968" }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="text-xs tracking-[0.2em] uppercase transition-all duration-500"
            style={{ color: "#8a7968" }}
          >
            <span className="ml-underline-center">
              &larr;&nbsp;StyleKit
            </span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden ml-marble-texture"
        style={{ paddingTop: "64px" }}
      >
        {/* Marble texture radial overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 40%, rgba(138,121,104,0.04) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(201,169,110,0.03) 0%, transparent 45%), radial-gradient(ellipse at 55% 85%, rgba(138,121,104,0.04) 0%, transparent 50%)",
          }}
        />

        {/* Inset gold frame */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "40px",
            border: "1px solid rgba(201,169,110,0.12)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "48px",
            border: "1px solid rgba(201,169,110,0.06)",
          }}
        />

        {/* Gold corner marks */}
        {[
          { top: "40px", left: "40px", bt: true, bl: true, br: false, bb: false },
          { top: "40px", right: "40px", bt: true, bl: false, br: true, bb: false },
          { bottom: "40px", left: "40px", bt: false, bl: true, br: false, bb: true },
          { bottom: "40px", right: "40px", bt: false, bl: false, br: true, bb: true },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              width: "20px",
              height: "20px",
              borderTop: pos.bt ? "1px solid rgba(201,169,110,0.4)" : "none",
              borderBottom: pos.bb ? "1px solid rgba(201,169,110,0.4)" : "none",
              borderLeft: pos.bl ? "1px solid rgba(201,169,110,0.4)" : "none",
              borderRight: pos.br ? "1px solid rgba(201,169,110,0.4)" : "none",
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center px-8 md:px-16 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="ml-gold-line" style={{ width: "48px" }} />
              <span
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: "#c9a96e" }}
              >
                Established mmxxiv
              </span>
              <div className="ml-gold-line" style={{ width: "48px" }} />
            </div>
          </div>

          {/* Title */}
          <h1
            className="leading-tight mb-6"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "#1a1a1a",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            Marble &amp;{" "}
            <span className="ml-gold-shimmer">Gold</span>
          </h1>

          {/* Sub */}
          <p
            className="leading-relaxed mb-12 mx-auto"
            style={{
              maxWidth: "480px",
              fontSize: "1.1rem",
              color: "#8a7968",
              letterSpacing: "0.04em",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            Where timeless craftsmanship meets restrained luxury.
            Every detail considered. Every surface refined.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            <button
              className="group px-12 py-4 transition-all duration-700"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#f8f6f3",
                border: "1px solid rgba(201,169,110,0.4)",
                letterSpacing: "0.2em",
                fontSize: "0.75rem",
                boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.7)";
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.22)";
              }}
            >
              <span className="ml-gold-shimmer-hover tracking-[0.2em] uppercase text-xs">
                Explore Collection
              </span>
            </button>
            <button
              className="px-12 py-4 transition-all duration-700"
              style={{
                backgroundColor: "transparent",
                color: "#1a1a1a",
                border: "1px solid rgba(26,26,26,0.2)",
                letterSpacing: "0.2em",
                fontSize: "0.75rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                e.currentTarget.style.color = "#8a7968";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,26,26,0.2)";
                e.currentTarget.style.color = "#1a1a1a";
              }}
            >
              <span className="tracking-[0.2em] uppercase text-xs">View Catalogue</span>
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{
              border: "1px solid rgba(201,169,110,0.12)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.42s",
              backgroundColor: "rgba(201,169,110,0.08)",
            }}
          >
            {[
              { value: "1924", label: "Founded" },
              { value: "86+", label: "Artisans" },
              { value: "32", label: "Collections" },
              { value: "4.97", label: "Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-8 px-4 transition-all duration-700"
                style={{ backgroundColor: "#f8f6f3" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#f0ece6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#f8f6f3";
                }}
              >
                <div
                  className="mb-1"
                  style={{ fontSize: "1.8rem", fontWeight: 300, color: "#1a1a1a", letterSpacing: "0.06em" }}
                >
                  {stat.value}
                </div>
                <div
                  style={{ fontSize: "0.65rem", color: "#c9a96e", letterSpacing: "0.3em", textTransform: "uppercase" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-28 md:py-36 px-8 md:px-16 ml-marble-texture">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="block text-xs tracking-[0.4em] uppercase mb-5"
              style={{ color: "#c9a96e" }}
            >
              Color System
            </span>
            <h2
              className="leading-tight mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
            >
              The Marble Palette
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-16">
            <div className="ml-gold-line-full" style={{ maxWidth: "320px" }} />
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-16">
            <p
              className="leading-relaxed"
              style={{ maxWidth: "500px", color: "#8a7968", letterSpacing: "0.04em", lineHeight: "1.8" }}
            >
              Five tones drawn from Italian marble quarries — warm white stone,
              deep onyx, antique gold leaf, weathered taupe, and sun-bleached
              light marble. Restraint in every selection.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.15}>
            <div className="flex flex-wrap gap-8 md:gap-12 justify-start mb-16">
              {palette.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-4 cursor-default"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: swatch.hex,
                      border:
                        swatch.hex === "#f8f6f3"
                          ? "1px solid rgba(201,169,110,0.2)"
                          : swatch.hex === "#e8e0d6"
                          ? "1px solid rgba(201,169,110,0.15)"
                          : "none",
                      boxShadow:
                        hoveredSwatch === i
                          ? "0 20px 40px rgba(0,0,0,0.12)"
                          : "0 4px 16px rgba(0,0,0,0.06)",
                      transform:
                        hoveredSwatch === i ? "translateY(-6px)" : "translateY(0)",
                      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s ease",
                    }}
                  />
                  <div className="text-center">
                    <div
                      style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "#1a1a1a", marginBottom: "4px" }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#8a7968", marginBottom: "6px" }}
                    >
                      {swatch.hex}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        color: "#c9a96e",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(201,169,110,0.25)",
                        paddingBottom: "2px",
                      }}
                    >
                      {swatch.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient combos */}
          <RevealBlock delay={0.2}>
            <div
              className="p-10 md:p-14"
              style={{
                backgroundColor: "#f8f6f3",
                border: "1px solid rgba(201,169,110,0.14)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-8"
                style={{ color: "#c9a96e" }}
              >
                Gradient Expressions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Stone to Gold", from: "#e8e0d6", to: "#c9a96e" },
                  { label: "Onyx to Taupe", from: "#1a1a1a", to: "#8a7968" },
                  { label: "Gold to Marble", from: "#c9a96e", to: "#f8f6f3" },
                ].map((g) => (
                  <div key={g.label} className="group cursor-default">
                    <div
                      className="h-14 mb-3 transition-all duration-700"
                      style={{
                        background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                        border: "1px solid rgba(201,169,110,0.12)",
                      }}
                    />
                    <div
                      style={{ fontSize: "0.7rem", color: "#8a7968", letterSpacing: "0.15em", textTransform: "uppercase" }}
                    >
                      {g.label}
                    </div>
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
      <section
        className="py-28 md:py-36 px-8 md:px-16"
        style={{ backgroundColor: "#f0ece6" }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="block text-xs tracking-[0.4em] uppercase mb-5"
              style={{ color: "#c9a96e" }}
            >
              Components
            </span>
            <h2
              className="leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
            >
              Refined Building Blocks
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p
              className="leading-relaxed"
              style={{ maxWidth: "480px", color: "#8a7968", letterSpacing: "0.04em", lineHeight: "1.8" }}
            >
              Each component embodies the marble-luxury principle: generous
              whitespace, fine gold borders, serif typography, and slow
              unhurried transitions.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-0" style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
              {(["buttons", "cards", "inputs", "typography"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 capitalize"
                  style={{
                    color: activeTab === tab ? "#1a1a1a" : "#8a7968",
                    borderBottom: activeTab === tab ? "1px solid #c9a96e" : "1px solid transparent",
                    backgroundColor: "transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="p-10 md:p-16"
              style={{
                backgroundColor: "#f8f6f3",
                border: "1px solid rgba(201,169,110,0.14)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.05)",
              }}
            >

              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-14">
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#c9a96e" }}>
                      Primary — Onyx with Gold Border
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <button
                        className="px-12 py-4 transition-all duration-700"
                        style={{
                          backgroundColor: "#1a1a1a",
                          color: "#f8f6f3",
                          border: "1px solid rgba(201,169,110,0.4)",
                          letterSpacing: "0.18em",
                          fontSize: "0.72rem",
                          boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,169,110,0.7)";
                          e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.32)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                          e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.22)";
                        }}
                      >
                        <span className="ml-gold-shimmer-hover tracking-[0.18em] uppercase text-xs">
                          Reserve Now
                        </span>
                      </button>
                      <button
                        className="px-12 py-4 transition-all duration-700"
                        style={{
                          backgroundColor: "transparent",
                          color: "#1a1a1a",
                          border: "1px solid rgba(201,169,110,0.35)",
                          letterSpacing: "0.18em",
                          fontSize: "0.72rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#1a1a1a";
                          e.currentTarget.style.color = "#f8f6f3";
                          e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#1a1a1a";
                          e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                        }}
                      >
                        <span className="tracking-[0.18em] uppercase text-xs">View Catalogue</span>
                      </button>
                      <button
                        className="transition-all duration-700"
                        style={{
                          backgroundColor: "transparent",
                          color: "#8a7968",
                          border: "none",
                          letterSpacing: "0.18em",
                          fontSize: "0.72rem",
                          padding: "16px 0",
                        }}
                      >
                        <span className="ml-underline-center tracking-[0.18em] uppercase text-xs">
                          Learn More &rarr;
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "#c9a96e" }}>
                      States — Active uses inset shadow (Cold &amp; Rigid)
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { state: "Default", bg: "#1a1a1a", shadow: "0 10px 28px rgba(0,0,0,0.22)", color: "#f8f6f3", opacity: 1 },
                        { state: "Hover", bg: "#1a1a1a", shadow: "0 18px 40px rgba(0,0,0,0.32)", color: "#f8f6f3", opacity: 1 },
                        { state: "Active", bg: "#0d0d0d", shadow: "inset 0 6px 12px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.15)", color: "#f8f6f3", opacity: 1 },
                        { state: "Disabled", bg: "transparent", shadow: "none", color: "rgba(26,26,26,0.3)", opacity: 0.5 },
                      ].map((s) => (
                        <button
                          key={s.state}
                          className="px-8 py-3 transition-all duration-700"
                          style={{
                            backgroundColor: s.bg,
                            color: s.color,
                            border: s.state === "Disabled" ? "1px solid rgba(201,169,110,0.1)" : "1px solid rgba(201,169,110,0.4)",
                            letterSpacing: "0.14em",
                            fontSize: "0.68rem",
                            boxShadow: s.shadow,
                            cursor: s.state === "Disabled" ? "not-allowed" : "pointer",
                            opacity: s.opacity,
                          }}
                        >
                          <span className="tracking-[0.14em] uppercase text-xs">{s.state}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      eyebrow: "Carrara Collection",
                      title: "Bianco Statuario",
                      desc: "Quarried from the mountains of Tuscany, each slab carries the unique grey veining of Carrara marble.",
                      detail: "From EUR 2,400 / m\u00b2",
                    },
                    {
                      eyebrow: "Nero Collection",
                      title: "Marquina Black",
                      desc: "Deep onyx with striking gold veins, this Belgian marble commands attention in any haute interior.",
                      detail: "From EUR 3,100 / m\u00b2",
                    },
                    {
                      eyebrow: "Gold Series",
                      title: "Giallo Siena",
                      desc: "The warm amber tones and rich fossilized patterns of Siena limestone, quarried since the Roman era.",
                      detail: "From EUR 1,850 / m\u00b2",
                    },
                    {
                      eyebrow: "Rosa Collection",
                      title: "Portoro Classico",
                      desc: "Midnight black marble with golden veins — a symbol of Genoese luxury since the 14th century.",
                      detail: "From EUR 4,200 / m\u00b2",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group relative overflow-hidden p-10 md:p-12 cursor-default transition-all duration-700"
                      style={{
                        backgroundColor: "#f8f6f3",
                        border: "1px solid rgba(201,169,110,0.18)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.4)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.18)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                      }}
                    >
                      {/* Marble shimmer overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700 group-hover:opacity-70"
                        style={{
                          background:
                            "radial-gradient(ellipse at top left, rgba(201,169,110,0.07), transparent 60%)",
                        }}
                      />
                      <div className="relative z-10">
                        <span
                          className="block text-xs tracking-[0.3em] uppercase mb-5"
                          style={{ color: "#c9a96e" }}
                        >
                          {card.eyebrow}
                        </span>
                        <h3
                          className="mb-3 leading-snug ml-gold-shimmer-hover transition-all duration-700"
                          style={{ fontSize: "1.35rem", fontWeight: 300, letterSpacing: "0.06em" }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="leading-relaxed mb-8"
                          style={{ fontSize: "0.875rem", color: "#8a7968", lineHeight: "1.8", letterSpacing: "0.02em" }}
                        >
                          {card.desc}
                        </p>
                        <div
                          className="pt-6"
                          style={{ borderTop: "1px solid rgba(201,169,110,0.2)" }}
                        >
                          <span
                            className="text-xs tracking-[0.2em] uppercase"
                            style={{ color: "#8a7968" }}
                          >
                            {card.detail} &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    {[
                      { label: "Full Name", placeholder: "Your name", type: "text" },
                      { label: "Email Address", placeholder: "correspondence@atelier.com", type: "email" },
                      { label: "Telephone", placeholder: "+1 (000) 000-0000", type: "tel" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label
                          className="block text-xs tracking-[0.3em] uppercase mb-3"
                          style={{ color: "#c9a96e" }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full py-4 bg-transparent transition-all duration-500"
                          style={{
                            border: "none",
                            borderBottom: "1px solid rgba(26,26,26,0.18)",
                            color: "#1a1a1a",
                            fontSize: "0.9rem",
                            letterSpacing: "0.04em",
                            outline: "none",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderBottomColor = "#c9a96e";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderBottomColor = "rgba(26,26,26,0.18)";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-10">
                    <div>
                      <label
                        className="block text-xs tracking-[0.3em] uppercase mb-3"
                        style={{ color: "#c9a96e" }}
                      >
                        Enquiry Type
                      </label>
                      <select
                        className="w-full py-4 bg-transparent transition-all duration-500"
                        style={{
                          border: "none",
                          borderBottom: "1px solid rgba(26,26,26,0.18)",
                          color: "#1a1a1a",
                          fontSize: "0.9rem",
                          letterSpacing: "0.04em",
                          outline: "none",
                          appearance: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderBottomColor = "#c9a96e";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderBottomColor = "rgba(26,26,26,0.18)";
                        }}
                      >
                        <option>Residential Project</option>
                        <option>Commercial Project</option>
                        <option>Hospitality</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-xs tracking-[0.3em] uppercase mb-3"
                        style={{ color: "#c9a96e" }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe your vision..."
                        className="w-full py-4 bg-transparent resize-none transition-all duration-500"
                        style={{
                          border: "none",
                          borderBottom: "1px solid rgba(26,26,26,0.18)",
                          color: "#1a1a1a",
                          fontSize: "0.9rem",
                          letterSpacing: "0.04em",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderBottomColor = "#c9a96e";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderBottomColor = "rgba(26,26,26,0.18)";
                        }}
                      />
                    </div>
                    <button
                      className="w-full py-4 transition-all duration-700"
                      style={{
                        backgroundColor: "#1a1a1a",
                        color: "#f8f6f3",
                        border: "1px solid rgba(201,169,110,0.4)",
                        letterSpacing: "0.2em",
                        fontSize: "0.72rem",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.28)";
                        e.currentTarget.style.borderColor = "rgba(201,169,110,0.65)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.18)";
                        e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                      }}
                    >
                      <span className="tracking-[0.2em] uppercase text-xs">Submit Enquiry</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ---- TYPOGRAPHY ---- */}
              {activeTab === "typography" && (
                <div className="space-y-12">
                  {[
                    { label: "Display — Light 300", sample: "Atelier Prestige", size: "3rem", weight: 300, spacing: "0.06em", color: "#1a1a1a" },
                    { label: "Heading — Normal 400", sample: "Marble & Gold Collection", size: "2rem", weight: 400, spacing: "0.05em", color: "#1a1a1a" },
                    { label: "Subheading — Light 300", sample: "Crafted for the discerning", size: "1.4rem", weight: 300, spacing: "0.06em", color: "#1a1a1a" },
                    { label: "Body — Normal, Wide Leading", sample: "Where timeless craftsmanship meets restrained luxury. Every surface is considered, every material hand-selected from the finest quarries across Italy and Belgium.", size: "1rem", weight: 400, spacing: "0.04em", color: "#8a7968" },
                    { label: "Caption — Tracking 0.3em", sample: "Carrara, Tuscany — Est. 1924", size: "0.72rem", weight: 400, spacing: "0.3em", color: "#c9a96e" },
                  ].map((typo) => (
                    <div key={typo.label} style={{ borderBottom: "1px solid rgba(201,169,110,0.12)", paddingBottom: "32px" }}>
                      <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#8a7968" }}>
                        {typo.label}
                      </p>
                      <div
                        style={{
                          fontSize: typo.size,
                          fontWeight: typo.weight,
                          letterSpacing: typo.spacing,
                          color: typo.color,
                          lineHeight: 1.5,
                          fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                      >
                        {typo.sample}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. AI RULES INTERACTIVE DEMO                                     */}
      {/* ================================================================ */}
      <section className="py-28 md:py-36 px-8 md:px-16 ml-marble-texture">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="block text-xs tracking-[0.4em] uppercase mb-5"
              style={{ color: "#c9a96e" }}
            >
              Interaction Rules
            </span>
            <h2
              className="leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
            >
              Four Named Principles
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-4">
            <div className="ml-gold-line-full" style={{ maxWidth: "280px" }} />
          </RevealBlock>

          <RevealBlock delay={0.08} className="mb-16">
            <p
              className="leading-relaxed"
              style={{ maxWidth: "520px", color: "#8a7968", letterSpacing: "0.04em", lineHeight: "1.8" }}
            >
              Interact with each demo below to feel the marble-luxury interaction
              grammar — weight, shimmer, rigidity, and gleam — all in motion.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Rule 1 — Monumental Weight */}
            <RevealBlock delay={0.1}>
              <div
                className="p-10 md:p-12 h-full"
                style={{
                  backgroundColor: "#f8f6f3",
                  border: "1px solid rgba(201,169,110,0.14)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="inline-block text-xs tracking-[0.25em] uppercase px-3 py-1"
                    style={{
                      color: "#c9a96e",
                      border: "1px solid rgba(201,169,110,0.3)",
                    }}
                  >
                    Rule 01
                  </span>
                </div>
                <h3
                  className="mb-2 mt-4"
                  style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
                >
                  Monumental Weight
                </h3>
                <p
                  className="leading-relaxed mb-8 text-xs tracking-[0.1em]"
                  style={{ color: "#8a7968", lineHeight: "1.8" }}
                >
                  Elements remain positionally stable. No hover displacement or
                  scale. Weight is expressed through layered shadow transitions.
                  Hover each card below.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Bianco", depth: "Light shadow" },
                    { label: "Nero", depth: "Deep shadow" },
                    { label: "Oro", depth: "Warm glow" },
                    { label: "Rosa", depth: "Soft shadow" },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="p-6 cursor-default transition-all duration-700"
                      style={{
                        backgroundColor: "#f8f6f3",
                        border: "1px solid rgba(201,169,110,0.15)",
                        boxShadow:
                          monumentalHovered === i
                            ? "0 20px 50px rgba(0,0,0,0.14), 0 4px 12px rgba(201,169,110,0.08)"
                            : "0 2px 12px rgba(0,0,0,0.04)",
                        // NO transform — no scale, no translate
                      }}
                      onMouseEnter={() => setMonumentalHovered(i)}
                      onMouseLeave={() => setMonumentalHovered(null)}
                    >
                      <div
                        className="text-sm mb-1"
                        style={{ color: "#1a1a1a", letterSpacing: "0.1em" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs tracking-[0.1em]"
                        style={{ color: monumentalHovered === i ? "#c9a96e" : "#8a7968", transition: "color 0.7s ease" }}
                      >
                        {monumentalHovered === i ? "Shadow deepened" : item.depth}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="mt-6 text-xs tracking-[0.1em]"
                  style={{ color: "#8a7968", fontStyle: "italic" }}
                >
                  {monumentalHovered !== null
                    ? "Shadow layering conveys mass — no displacement"
                    : "Hover any tile to see shadow deepening without movement"}
                </p>
              </div>
            </RevealBlock>

            {/* Rule 2 — Foil Stamping Shift */}
            <RevealBlock delay={0.14}>
              <div
                className="p-10 md:p-12 h-full"
                style={{
                  backgroundColor: "#f8f6f3",
                  border: "1px solid rgba(201,169,110,0.14)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="inline-block text-xs tracking-[0.25em] uppercase px-3 py-1"
                    style={{
                      color: "#c9a96e",
                      border: "1px solid rgba(201,169,110,0.3)",
                    }}
                  >
                    Rule 02
                  </span>
                </div>
                <h3
                  className="mb-2 mt-4"
                  style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
                >
                  Foil Stamping Shift
                </h3>
                <p
                  className="leading-relaxed mb-8 text-xs tracking-[0.1em]"
                  style={{ color: "#8a7968", lineHeight: "1.8" }}
                >
                  Gold text performs a slow background-position shift on hover,
                  simulating light catching polished metal foil. Toggle the demo
                  or hover individual titles.
                </p>

                {/* Toggle */}
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setFoilActive(!foilActive)}
                    className="px-8 py-3 transition-all duration-700 text-xs tracking-[0.2em] uppercase"
                    style={{
                      backgroundColor: foilActive ? "#1a1a1a" : "transparent",
                      color: foilActive ? "#f8f6f3" : "#1a1a1a",
                      border: "1px solid rgba(201,169,110,0.4)",
                      boxShadow: foilActive ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
                    }}
                  >
                    {foilActive ? "Foil ON" : "Foil OFF"}
                  </button>
                  <span
                    className="text-xs tracking-[0.1em]"
                    style={{ color: "#8a7968" }}
                  >
                    Toggle global gold shimmer
                  </span>
                </div>

                <div className="space-y-5">
                  {[
                    { title: "Atelier Milano", sub: "Hover to see foil shift" },
                    { title: "Maison de Luxe", sub: "Gold catches the light" },
                    { title: "Collection Prestige", sub: "Metal foil simulation" },
                  ].map((item, i) => (
                    <div
                      key={item.title}
                      className="py-4 cursor-default"
                      style={{ borderBottom: "1px solid rgba(201,169,110,0.12)" }}
                      onMouseEnter={() => setFoilHoveredBtn(i)}
                      onMouseLeave={() => setFoilHoveredBtn(null)}
                    >
                      <div
                        className={foilActive || foilHoveredBtn === i ? "ml-gold-shimmer" : ""}
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 300,
                          letterSpacing: "0.08em",
                          color: foilActive || foilHoveredBtn === i ? undefined : "#1a1a1a",
                          transition: "color 0.7s ease",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-xs mt-1 tracking-[0.1em]"
                        style={{ color: foilHoveredBtn === i ? "#c9a96e" : "#8a7968", transition: "color 0.7s ease" }}
                      >
                        {foilHoveredBtn === i ? "Foil shift active" : item.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Rule 3 — Cold & Rigid */}
            <RevealBlock delay={0.18}>
              <div
                className="p-10 md:p-12 h-full"
                style={{
                  backgroundColor: "#f8f6f3",
                  border: "1px solid rgba(201,169,110,0.14)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="inline-block text-xs tracking-[0.25em] uppercase px-3 py-1"
                    style={{
                      color: "#c9a96e",
                      border: "1px solid rgba(201,169,110,0.3)",
                    }}
                  >
                    Rule 03
                  </span>
                </div>
                <h3
                  className="mb-2 mt-4"
                  style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
                >
                  Cold &amp; Rigid
                </h3>
                <p
                  className="leading-relaxed mb-8 text-xs tracking-[0.1em]"
                  style={{ color: "#8a7968", lineHeight: "1.8" }}
                >
                  Active states avoid elastic deformation. A subtle inset shadow
                  communicates the cold hardness of pressed marble — like pressing
                  your palm against stone. Click and hold each button.
                </p>
                <div className="space-y-6">
                  {[
                    { label: "Reserve", variant: "primary" },
                    { label: "Enquire", variant: "outline" },
                    { label: "Download Brochure", variant: "ghost" },
                  ].map((btn, i) => (
                    <div key={btn.label}>
                      <button
                        className="px-10 py-4 text-xs tracking-[0.2em] uppercase select-none"
                        style={{
                          backgroundColor:
                            btn.variant === "primary"
                              ? rigidPressed === i
                                ? "#0d0d0d"
                                : "#1a1a1a"
                              : "transparent",
                          color:
                            btn.variant === "primary"
                              ? "#f8f6f3"
                              : rigidPressed === i
                              ? "#8a7968"
                              : "#1a1a1a",
                          border:
                            btn.variant === "ghost"
                              ? "none"
                              : "1px solid rgba(201,169,110,0.4)",
                          boxShadow:
                            rigidPressed === i
                              ? btn.variant === "primary"
                                ? "inset 0 6px 12px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.15)"
                                : "inset 0 3px 8px rgba(0,0,0,0.15)"
                              : btn.variant === "primary"
                              ? "0 10px 28px rgba(0,0,0,0.22)"
                              : "none",
                          transition: "all 0.15s ease",
                          cursor: "pointer",
                          letterSpacing: "0.2em",
                        }}
                        onMouseDown={() => setRigidPressed(i)}
                        onMouseUp={() => setRigidPressed(null)}
                        onMouseLeave={() => setRigidPressed(null)}
                      >
                        {btn.label}
                      </button>
                      <p
                        className="mt-2 text-xs tracking-[0.1em]"
                        style={{ color: rigidPressed === i ? "#c9a96e" : "#8a7968" }}
                      >
                        {rigidPressed === i
                          ? "Inset shadow — cold stone press"
                          : "Click and hold to feel the rigidity"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Rule 4 — Polish Gleam */}
            <RevealBlock delay={0.22}>
              <div
                className="p-10 md:p-12 h-full"
                style={{
                  backgroundColor: "#f8f6f3",
                  border: "1px solid rgba(201,169,110,0.14)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div className="mb-2">
                  <span
                    className="inline-block text-xs tracking-[0.25em] uppercase px-3 py-1"
                    style={{
                      color: "#c9a96e",
                      border: "1px solid rgba(201,169,110,0.3)",
                    }}
                  >
                    Rule 04
                  </span>
                </div>
                <h3
                  className="mb-2 mt-4"
                  style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
                >
                  Polish Gleam
                </h3>
                <p
                  className="leading-relaxed mb-8 text-xs tracking-[0.1em]"
                  style={{ color: "#8a7968", lineHeight: "1.8" }}
                >
                  Cards perform low-frequency, low-amplitude brightness and
                  shadow changes (duration 700ms). This replicates the subtle
                  light shift on a polished marble surface as you approach it.
                </p>
                <div className="grid grid-cols-1 gap-5">
                  {[
                    { name: "Nero Marquina", origin: "Belgium", finish: "Polished" },
                    { name: "Bianco Carrara", origin: "Italy", finish: "Honed" },
                    { name: "Giallo Siena", origin: "Italy", finish: "Polished" },
                  ].map((stone, i) => (
                    <div
                      key={stone.name}
                      className="flex items-center justify-between p-6 cursor-default"
                      style={{
                        backgroundColor:
                          gleamHovered === i
                            ? "#f2ede6"
                            : "#f8f6f3",
                        border: "1px solid rgba(201,169,110,0.15)",
                        boxShadow:
                          gleamHovered === i
                            ? "0 12px 32px rgba(201,169,110,0.12), 0 2px 8px rgba(0,0,0,0.06)"
                            : "0 2px 10px rgba(0,0,0,0.04)",
                        transition: "all 0.7s ease",
                      }}
                      onMouseEnter={() => setGleamHovered(i)}
                      onMouseLeave={() => setGleamHovered(null)}
                    >
                      <div>
                        <div
                          className="text-sm mb-1"
                          style={{ color: "#1a1a1a", letterSpacing: "0.08em" }}
                        >
                          {stone.name}
                        </div>
                        <div
                          className="text-xs tracking-[0.15em]"
                          style={{ color: "#8a7968" }}
                        >
                          {stone.origin}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs tracking-[0.2em] uppercase"
                          style={{ color: gleamHovered === i ? "#c9a96e" : "#8a7968", transition: "color 0.7s ease" }}
                        >
                          {stone.finish}
                        </div>
                        {gleamHovered === i && (
                          <div
                            className="text-xs tracking-[0.1em] mt-1"
                            style={{ color: "#c9a96e", opacity: 0.7 }}
                          >
                            Gleam active
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="mt-6 text-xs tracking-[0.1em]"
                  style={{ color: "#8a7968", fontStyle: "italic" }}
                >
                  {gleamHovered !== null
                    ? "Warmth and shadow deepen — 700ms duration"
                    : "Hover each stone tile to reveal the polished gleam"}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. DO / DON'T + PHILOSOPHY                                       */}
      {/* ================================================================ */}
      <section
        className="py-28 md:py-36 px-8 md:px-16"
        style={{ backgroundColor: "#f0ece6" }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span
              className="block text-xs tracking-[0.4em] uppercase mb-5"
              style={{ color: "#c9a96e" }}
            >
              Design Philosophy
            </span>
            <h2
              className="leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, letterSpacing: "0.06em", color: "#1a1a1a" }}
            >
              The Art of Restraint
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-16">
            <p
              className="leading-relaxed"
              style={{ maxWidth: "520px", color: "#8a7968", letterSpacing: "0.04em", lineHeight: "1.8" }}
            >
              Restraint is the highest expression of luxury. Less gold means more
              gold. More space means more presence. The marble-luxury vocabulary
              is built on what is withheld, not what is shown.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div
                className="p-10 md:p-12 h-full"
                style={{
                  backgroundColor: "#f8f6f3",
                  border: "1px solid rgba(201,169,110,0.18)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    style={{
                      width: "1px",
                      height: "32px",
                      backgroundColor: "#c9a96e",
                    }}
                  />
                  <h3
                    className="text-sm tracking-[0.3em] uppercase"
                    style={{ color: "#1a1a1a" }}
                  >
                    Do
                  </h3>
                </div>
                <ul className="space-y-5">
                  {[
                    "Use warm marble white bg-[#f8f6f3] — never pure bg-white",
                    "Use onyx text-[#1a1a1a] for all primary text",
                    "Limit gold #c9a96e to borders, separators, and minimal accents",
                    "Apply py-20+ section spacing and p-12 card padding",
                    "Use font-serif with tracking-[0.2em]+ on all labels",
                    "Use fine 1px borders: border-[#c9a96e]/20",
                    "Keep transitions at duration-500 or longer, ease-in-out",
                    "Use very subtle shadows: shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-4 text-sm leading-relaxed"
                      style={{ color: "#8a7968", letterSpacing: "0.03em" }}
                    >
                      <span
                        style={{
                          marginTop: "8px",
                          width: "20px",
                          height: "1px",
                          backgroundColor: "#c9a96e",
                          flexShrink: 0,
                        }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.15}>
              <div
                className="p-10 md:p-12 h-full"
                style={{
                  backgroundColor: "#f8f6f3",
                  border: "1px solid rgba(201,169,110,0.18)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    style={{
                      width: "1px",
                      height: "32px",
                      backgroundColor: "rgba(201,169,110,0.35)",
                    }}
                  />
                  <h3
                    className="text-sm tracking-[0.3em] uppercase"
                    style={{ color: "#8a7968" }}
                  >
                    Never
                  </h3>
                </div>
                <ul className="space-y-5">
                  {[
                    "High-saturation neon or fluorescent colors",
                    "Thick borders — border-4 and above",
                    "Hard offset shadows: shadow-[Npx_Npx_0px]",
                    "Bold aggressive typography: font-black uppercase",
                    "Dense information layouts with small spacing",
                    "Cartoon, hand-drawn, or rough visual elements",
                    "Pure white bg-white — use warmer #f8f6f3 instead",
                    "Elastic spring animations — marble does not bounce",
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-4 text-sm leading-relaxed"
                      style={{ color: "#8a7968", letterSpacing: "0.03em", opacity: 0.7 }}
                    >
                      <span
                        style={{
                          marginTop: "8px",
                          width: "16px",
                          height: "1px",
                          backgroundColor: "rgba(138,121,104,0.4)",
                          flexShrink: 0,
                        }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* 3 principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "I",
                title: "Material Suggestion",
                body: "Radial-gradient overlays create the illusion of stone veining and color depth without imagery. The texture lives in the math.",
              },
              {
                number: "II",
                title: "Gold Restraint",
                body: "Antique gold #c9a96e appears only as fine lines, subtle borders, and accent text. Its rarity is what makes it precious.",
              },
              {
                number: "III",
                title: "Extreme Whitespace",
                body: "Generous padding and margins are not empty — they are breathing room that allows each element its full authority.",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.number} delay={i * 0.08}>
                <div
                  className="p-10 h-full cursor-default transition-all duration-700"
                  style={{
                    backgroundColor: "#f8f6f3",
                    border: "1px solid rgba(201,169,110,0.14)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.32)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.14)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.05)";
                  }}
                >
                  <div
                    className="mb-6"
                    style={{ fontSize: "2rem", fontWeight: 300, color: "#c9a96e", letterSpacing: "0.1em" }}
                  >
                    {principle.number}
                  </div>
                  <div className="ml-gold-line mb-6" style={{ width: "40px" }} />
                  <h4
                    className="mb-4"
                    style={{ fontSize: "1rem", fontWeight: 400, letterSpacing: "0.1em", color: "#1a1a1a" }}
                  >
                    {principle.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#8a7968", letterSpacing: "0.03em", lineHeight: "1.8" }}
                  >
                    {principle.body}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer
        className="relative overflow-hidden ml-marble-texture"
        style={{ borderTop: "1px solid rgba(201,169,110,0.18)" }}
      >
        {/* Top gold accent line */}
        <div className="ml-gold-line-full" />

        <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-14">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-14 mb-16">
            {/* Brand */}
            <div style={{ maxWidth: "320px" }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "linear-gradient(180deg, transparent, #c9a96e, transparent)",
                  }}
                />
                <span
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{ color: "#1a1a1a" }}
                >
                  Marble <span style={{ color: "#c9a96e" }}>Luxury</span>
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#8a7968", letterSpacing: "0.04em", lineHeight: "1.8" }}
              >
                A design language drawn from the timeless beauty of Italian
                marble — restraint, quality, and enduring elegance.
              </p>
              {/* Palette dots */}
              <div className="flex gap-3">
                {palette.map((s) => (
                  <div
                    key={s.name}
                    title={s.name}
                    style={{
                      width: "14px",
                      height: "14px",
                      backgroundColor: s.hex,
                      border: "1px solid rgba(201,169,110,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div className="flex flex-col gap-4">
                <span
                  className="text-xs tracking-[0.3em] uppercase mb-1"
                  style={{ color: "#c9a96e" }}
                >
                  Style
                </span>
                <Link
                  href="/styles/marble-luxury"
                  className="ml-underline-center transition-colors duration-500"
                  style={{ color: "#8a7968", letterSpacing: "0.06em" }}
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/marble-luxury/showcase"
                  className="ml-underline-center transition-colors duration-500"
                  style={{ color: "#8a7968", letterSpacing: "0.06em" }}
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/marble-luxury/cover"
                  className="ml-underline-center transition-colors duration-500"
                  style={{ color: "#8a7968", letterSpacing: "0.06em" }}
                >
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <span
                  className="text-xs tracking-[0.3em] uppercase mb-1"
                  style={{ color: "#c9a96e" }}
                >
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="ml-underline-center transition-colors duration-500"
                  style={{ color: "#8a7968", letterSpacing: "0.06em" }}
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="ml-underline-center transition-colors duration-500"
                  style={{ color: "#8a7968", letterSpacing: "0.06em" }}
                >
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <span
                  className="text-xs tracking-[0.3em] uppercase mb-1"
                  style={{ color: "#c9a96e" }}
                >
                  Palette
                </span>
                {palette.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "#8a7968", letterSpacing: "0.06em" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        backgroundColor: s.hex,
                        border: "1px solid rgba(201,169,110,0.2)",
                        flexShrink: 0,
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="ml-gold-line-full mb-10" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div
              className="text-xs tracking-[0.2em]"
              style={{ color: "#8a7968" }}
            >
              Marble Luxury &mdash; a StyleKit design system
            </div>
            <Link
              href="/"
              className="text-xs tracking-[0.2em] uppercase transition-all duration-500"
              style={{ color: "#8a7968" }}
            >
              <span className="ml-underline-center">
                &larr;&nbsp;Back to StyleKit
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
