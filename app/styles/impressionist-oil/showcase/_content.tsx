"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const masterPaintings = [
  {
    id: "monet",
    label: "Monet",
    title: "Water Lilies",
    subtitle: "Claude Monet, 1906",
    desc: "Monet's obsession with light and its reflection on water produced the defining works of Impressionism. His garden at Giverny became the studio for endless studies of shifting light on still water.",
    detail:
      "Each canvas captures a moment never to be repeated — light as it existed for one precise instant.",
    bgGradient: [
      "radial-gradient(ellipse at 30% 40%, rgba(26,188,156,0.22) 0%, transparent 50%)",
      "radial-gradient(ellipse at 70% 60%, rgba(44,62,80,0.30) 0%, transparent 55%)",
      "radial-gradient(ellipse at 50% 20%, rgba(26,188,156,0.18) 0%, transparent 45%)",
      "radial-gradient(ellipse at 20% 80%, rgba(44,62,80,0.20) 0%, transparent 40%)",
    ].join(", "),
    accentColor: "#1abc9c",
  },
  {
    id: "renoir",
    label: "Renoir",
    title: "Bal du moulin",
    subtitle: "Pierre-Auguste Renoir, 1876",
    desc: "Renoir celebrated the joy of everyday life — picnics, dances, laughter — bathed in warm afternoon sun. His figures glow from within, skin rendered in layered warm tones and dancing shadows.",
    detail:
      "Paint applied with generosity, the surface alive with movement — no hard line exists anywhere.",
    bgGradient: [
      "radial-gradient(ellipse at 40% 30%, rgba(232,168,124,0.28) 0%, transparent 50%)",
      "radial-gradient(ellipse at 60% 70%, rgba(192,57,43,0.22) 0%, transparent 55%)",
      "radial-gradient(ellipse at 20% 60%, rgba(245,216,138,0.20) 0%, transparent 45%)",
      "radial-gradient(ellipse at 80% 20%, rgba(232,168,124,0.18) 0%, transparent 40%)",
    ].join(", "),
    accentColor: "#e8a87c",
  },
  {
    id: "cezanne",
    label: "Cezanne",
    title: "Still Life",
    subtitle: "Paul Cezanne, 1895",
    desc: "Cezanne brought structure to Impressionism's freedom — geometric forms built from planes of muted color. Apples and pears arranged with mathematical precision, yet alive with painterly truth.",
    detail:
      "The bridge between Impressionism and Cubism, each apple a study in the architecture of vision.",
    bgGradient: [
      "radial-gradient(ellipse at 35% 45%, rgba(192,57,43,0.20) 0%, transparent 50%)",
      "radial-gradient(ellipse at 65% 55%, rgba(245,216,138,0.22) 0%, transparent 55%)",
      "radial-gradient(ellipse at 50% 25%, rgba(139,90,43,0.18) 0%, transparent 45%)",
      "radial-gradient(ellipse at 25% 75%, rgba(192,57,43,0.15) 0%, transparent 40%)",
    ].join(", "),
    accentColor: "#c0392b",
  },
];

const colorPalette = [
  { name: "Warm Peach", hex: "#e8a87c", rotation: "-3deg", tx: "-8px", ty: "0px" },
  { name: "Canvas", hex: "#f5f0e1", rotation: "1.5deg", tx: "4px", ty: "6px" },
  { name: "Crimson", hex: "#c0392b", rotation: "-1deg", tx: "-2px", ty: "-4px" },
  { name: "Deep Blue", hex: "#2c3e50", rotation: "2.5deg", tx: "10px", ty: "2px" },
  { name: "Teal Green", hex: "#1abc9c", rotation: "-2deg", tx: "-6px", ty: "8px" },
  { name: "Golden Light", hex: "#f5d88a", rotation: "1deg", tx: "2px", ty: "-2px" },
];

const techniques = [
  {
    id: "wet-on-wet",
    label: "Wet-on-Wet",
    title: "Wet-on-Wet (Alla Prima)",
    desc: "Fresh paint is applied directly into wet paint already on the canvas. Colors blend and bleed at their boundaries, producing soft, smoky transitions that emerge from the paint's own movement.",
    cssNote:
      "Simulated via overlapping radial-gradients at low opacity (4-8%), edges blending naturally without hard stops.",
    cssCode:
      "background: radial-gradient(ellipse at 35% 40%, #e8a87c08, transparent 55%),\n  radial-gradient(ellipse at 65% 60%, #1abc9c06, transparent 50%);",
    visualColors: ["#e8a87c", "#c0392b", "#f5d88a"],
  },
  {
    id: "glazing",
    label: "Glazing",
    title: "Glazing (Velatura)",
    desc: "Thin, transparent layers of oil paint are applied over a dry underpainting. Each glaze tints the layer beneath while remaining transparent — light passes through all layers to reflect from the ground.",
    cssNote:
      "Simulated via stacked semi-transparent box-shadows and rgba backgrounds layered in sequence.",
    cssCode:
      "box-shadow: inset 0 0 40px rgba(232,168,124,0.12),\n  inset 0 0 80px rgba(192,57,43,0.08),\n  inset 0 0 120px rgba(245,216,138,0.06);",
    visualColors: ["#2c3e50", "#1abc9c", "#e8a87c"],
  },
  {
    id: "impasto",
    label: "Impasto",
    title: "Impasto (Thick Paint)",
    desc: "Paint applied in thick, textured strokes that stand up from the canvas surface. The paint itself becomes sculptural — ridges and peaks catch light differently from valleys, creating kinetic luminosity.",
    cssNote:
      "Simulated via multi-layer box-shadow with color offsets (2-6px) creating the illusion of paint thickness.",
    cssCode:
      "box-shadow: 3px 3px 0 #c0392b,\n  6px 6px 0 rgba(232,168,124,0.44),\n  -2px -2px 0 rgba(245,216,138,0.33),\n  0 8px 20px rgba(44,62,80,0.3);",
    visualColors: ["#c0392b", "#e8a87c", "#2c3e50"],
  },
  {
    id: "pointillism",
    label: "Pointillism",
    title: "Pointillism (Divisionism)",
    desc: "Pure color dots placed adjacently, never mixed on the palette. The eye blends them optically at viewing distance — a scientific approach to the Impressionist belief that color is light, not pigment.",
    cssNote:
      "Simulated via repeating-radial-gradient with tiny circles at varying opacities and colors.",
    cssCode:
      "background-image: radial-gradient(circle, #e8a87c 1px, transparent 1px),\n  radial-gradient(circle, #c0392b 1px, transparent 1px),\n  radial-gradient(circle, #1abc9c 1px, transparent 1px);\nbackground-size: 8px 8px, 8px 8px, 8px 8px;",
    visualColors: ["#e8a87c", "#1abc9c", "#c0392b"],
  },
];

const typographyExamples = [
  {
    text: "Impressionist",
    size: "clamp(2.5rem, 6vw, 4.5rem)",
    fontStyle: "italic",
    color: "#2c3e50",
    tracking: "tracking-tight",
    weight: "font-semibold",
    note: "Display — Georgia Serif",
  },
  {
    text: "Light on Water",
    size: "clamp(1.8rem, 4vw, 3rem)",
    fontStyle: "italic",
    color: "#e8a87c",
    tracking: "tracking-normal",
    weight: "font-medium",
    note: "Headline — Warm Peach",
  },
  {
    text: "The Garden at Giverny",
    size: "clamp(1.2rem, 2.5vw, 1.8rem)",
    fontStyle: "normal",
    color: "#2c3e50",
    tracking: "tracking-wide",
    weight: "font-normal",
    note: "Subhead — tracking-wide",
  },
  {
    text: "Oil on canvas, light and shadow in dialogue — never fully resolved, always alive.",
    size: "clamp(0.95rem, 1.8vw, 1.1rem)",
    fontStyle: "italic",
    color: "#2c3e50",
    tracking: "tracking-normal",
    weight: "font-normal",
    note: "Body — leading-relaxed",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-serif text-[#e8a87c]/60 tracking-[0.2em] uppercase block mb-3">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif font-semibold text-[#2c3e50] mb-4 leading-tight italic"
      style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
    >
      {children}
    </h2>
  );
}

function BrushDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div
        className="h-[2px] flex-1 max-w-[80px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e8a87c88, #c0392b66, transparent)",
        }}
      />
      <div
        className="w-2 h-2 rounded-full"
        style={{ background: "#e8a87c", boxShadow: "0 0 6px #e8a87c66" }}
      />
    </div>
  );
}

/* brushstroke texture shared across sections */
const brushTexture = [
  "repeating-linear-gradient(35deg, transparent, transparent 3px, rgba(139,90,43,0.03) 3px, rgba(139,90,43,0.03) 4px)",
  "repeating-linear-gradient(125deg, transparent, transparent 5px, rgba(101,67,33,0.02) 5px, rgba(101,67,33,0.02) 6px)",
  "repeating-linear-gradient(75deg, transparent, transparent 8px, rgba(160,82,45,0.015) 8px, rgba(160,82,45,0.015) 9px)",
].join(", ");

const canvasBase = "#f5f0e1";

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeMaster, setActiveMaster] = useState<"monet" | "renoir" | "cezanne">("monet");
  const [componentTab, setComponentTab] = useState<"canvas" | "frame" | "palette">("canvas");
  const [openTechnique, setOpenTechnique] = useState<string | null>("wet-on-wet");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const activePainting = masterPaintings.find((m) => m.id === activeMaster)!;

  return (
    <div
      className="min-h-screen text-[#2c3e50] font-serif overflow-x-hidden"
      style={{ backgroundColor: canvasBase }}
    >
      {/* ===== Navigation ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: `${canvasBase}f0`,
          backdropFilter: "blur(12px)",
          borderBottomColor: "rgba(232,168,124,0.22)",
          backgroundImage: brushTexture,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles"
              className="font-serif text-sm text-[#2c3e50]/50 tracking-wide hover:text-[#e8a87c] transition-colors duration-500 flex items-center gap-2"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
            </Link>

            <span
              className="font-serif text-base md:text-lg font-semibold italic text-[#2c3e50] tracking-wide relative group cursor-default select-none"
              style={{ textShadow: "1px 1px 0 rgba(232,168,124,0.18)" }}
            >
              Impressionist Oil
              {/* brushstroke underline sweeps in on hover */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #e8a87c, #c0392b88, transparent)",
                }}
              />
            </span>

            <nav className="flex items-center gap-6">
              <Link
                href="/styles/impressionist-oil"
                className="font-serif text-xs text-[#2c3e50]/35 tracking-wide hover:text-[#e8a87c] transition-colors duration-500"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs text-[#2c3e50]/35 tracking-wide hover:text-[#e8a87c] transition-colors duration-500"
              >
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-6 md:px-12 overflow-hidden"
        style={{
          backgroundImage: brushTexture,
          backgroundColor: canvasBase,
        }}
      >
        {/* Dappled light — 6 overlapping radial gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 60% 40% at 15% 20%, rgba(232,168,124,0.07) 0%, transparent 60%)",
              "radial-gradient(ellipse 50% 35% at 80% 15%, rgba(245,216,138,0.06) 0%, transparent 55%)",
              "radial-gradient(ellipse 45% 50% at 70% 75%, rgba(192,57,43,0.05) 0%, transparent 60%)",
              "radial-gradient(ellipse 55% 45% at 10% 70%, rgba(26,188,156,0.04) 0%, transparent 55%)",
              "radial-gradient(ellipse 40% 30% at 50% 45%, rgba(232,168,124,0.08) 0%, transparent 50%)",
              "radial-gradient(ellipse 35% 40% at 90% 50%, rgba(44,62,80,0.04) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        {/* Central painting frame */}
        <div
          className="relative z-10 text-center"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed
              ? "scale(1) translateY(0)"
              : "scale(0.97) translateY(32px)",
            transition:
              "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.05s",
          }}
        >
          {/* Outer frame — thick dark border with inset shadow */}
          <div
            className="inline-block p-2"
            style={{
              border: "12px solid #2c3e50",
              boxShadow: [
                "inset 0 0 0 3px rgba(232,168,124,0.35)",
                "inset 0 0 0 6px #f5f0e1",
                "8px 8px 0 rgba(44,62,80,0.25)",
                "12px 12px 0 rgba(44,62,80,0.12)",
                "0 20px 60px rgba(44,62,80,0.22)",
              ].join(", "),
            }}
          >
            {/* Inner canvas */}
            <div
              className="px-10 md:px-20 py-12 md:py-16"
              style={{
                backgroundImage: brushTexture,
                backgroundColor: canvasBase,
                minWidth: "min(480px, 80vw)",
              }}
            >
              <p
                className="text-xs font-serif text-[#e8a87c]/60 tracking-[0.25em] uppercase mb-6"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                Atelier Collection
              </p>

              <h1
                className="font-serif font-semibold italic text-[#2c3e50] leading-none mb-3"
                style={{
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  textShadow:
                    "2px 2px 0 rgba(192,57,43,0.12), -1px -1px 0 rgba(232,168,124,0.15)",
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Impressionist
              </h1>

              <h2
                className="font-serif font-medium italic text-[#e8a87c] leading-none mb-8"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 4rem)",
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s",
                }}
              >
                Oil
              </h2>

              <BrushDivider />

              <p
                className="font-serif italic text-[#2c3e50]/55 mt-6 max-w-sm mx-auto leading-relaxed"
                style={{
                  fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
                }}
              >
                Bold brushstrokes. Dappled light. Impasto thickness.
                <br />
                The warmth of canvas and oil on every surface.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s",
                }}
              >
                <button
                  className="px-8 py-3.5 font-serif font-medium italic text-[#f5f0e1] tracking-wide transition-all duration-500 hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(135deg, #c0392b 0%, #e8a87c 100%)",
                    boxShadow: [
                      "4px 4px 0 rgba(44,62,80,0.35)",
                      "6px 6px 0 rgba(44,62,80,0.15)",
                      "0 8px 24px rgba(192,57,43,0.3)",
                    ].join(", "),
                  }}
                >
                  Explore the Gallery
                </button>
                <button
                  className="px-8 py-3.5 font-serif font-medium italic text-[#2c3e50] tracking-wide border transition-all duration-500 hover:bg-[#e8a87c]/10"
                  style={{
                    borderColor: "rgba(44,62,80,0.3)",
                    boxShadow: "2px 2px 0 rgba(44,62,80,0.12)",
                  }}
                >
                  View Techniques
                </button>
              </div>
            </div>
          </div>

          {/* Frame label plate */}
          <div
            className="mx-auto mt-4 px-6 py-2 inline-block"
            style={{
              background: "#2c3e50",
              boxShadow: "2px 2px 0 rgba(44,62,80,0.25)",
            }}
          >
            <span className="font-serif text-xs italic text-[#e8a87c]/80 tracking-[0.15em]">
              StyleKit — Impressionist Oil Design System
            </span>
          </div>
        </div>

        {/* Ambient corner decorations */}
        <div
          className="absolute top-24 left-8 w-24 h-24 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(232,168,124,0.18), transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute bottom-24 right-8 w-32 h-32 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(26,188,156,0.12), transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </section>

      {/* ===== Masters Gallery ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundImage: brushTexture, backgroundColor: "#f0ebe0" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(232,168,124,0.06) 0%, transparent 55%)",
              "radial-gradient(ellipse at 80% 30%, rgba(44,62,80,0.05) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <SectionLabel>Masters Gallery</SectionLabel>
            <SectionHeading>The Founding Vision</SectionHeading>
            <p className="font-serif italic text-[#2c3e50]/45 max-w-lg mx-auto leading-relaxed">
              Three masters who shattered convention and gave us a new way to see. Their
              techniques live on in every brushstroke of this system.
            </p>
          </RevealBlock>

          {/* Tab buttons */}
          <RevealBlock delay={0.08} className="flex justify-center gap-3 mb-10">
            {masterPaintings.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMaster(m.id as typeof activeMaster)}
                className="px-6 py-2.5 font-serif italic text-sm tracking-wide border transition-all duration-500"
                style={{
                  borderColor:
                    activeMaster === m.id ? m.accentColor : "rgba(44,62,80,0.2)",
                  color:
                    activeMaster === m.id ? m.accentColor : "rgba(44,62,80,0.45)",
                  background:
                    activeMaster === m.id ? `${m.accentColor}14` : "transparent",
                  boxShadow:
                    activeMaster === m.id ? `2px 2px 0 ${m.accentColor}33` : "none",
                }}
              >
                {m.label}
              </button>
            ))}
          </RevealBlock>

          {/* Painting card */}
          <RevealBlock delay={0.12}>
            <div
              className="group relative overflow-hidden transition-all duration-700 hover:scale-[1.02]"
              style={{
                backgroundImage: `${brushTexture}, ${activePainting.bgGradient}`,
                backgroundColor: canvasBase,
                border: "8px solid #2c3e50",
                boxShadow: [
                  "6px 6px 0 rgba(44,62,80,0.3)",
                  "10px 10px 0 rgba(44,62,80,0.12)",
                  "0 20px 50px rgba(44,62,80,0.18)",
                ].join(", "),
              }}
            >
              {/* Dappled light on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms]"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 30% 40%, ${activePainting.accentColor}10 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10 grid md:grid-cols-2 min-h-[380px]">
                {/* CSS painting simulation */}
                <div className="relative flex items-center justify-center p-12 border-r border-[#2c3e50]/20">
                  <div className="relative w-52 h-52 md:w-64 md:h-64">
                    <div
                      className="absolute inset-0 transition-all duration-[1500ms] group-hover:scale-105"
                      style={{
                        background: activePainting.bgGradient,
                        filter: "blur(1px)",
                      }}
                    />
                    <div
                      className="absolute inset-4 transition-all duration-[1500ms] group-hover:scale-110"
                      style={{
                        background: `radial-gradient(ellipse at 40% 35%, ${activePainting.accentColor}30 0%, transparent 60%)`,
                        filter: "blur(4px)",
                      }}
                    />
                    <div
                      className="absolute inset-10 transition-all duration-[1500ms] group-hover:scale-125"
                      style={{
                        background: `radial-gradient(ellipse at 60% 65%, ${activePainting.accentColor}20 0%, transparent 55%)`,
                        filter: "blur(6px)",
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 7px)",
                      }}
                    />
                  </div>

                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1"
                    style={{
                      background: "rgba(44,62,80,0.7)",
                      border: `1px solid ${activePainting.accentColor}44`,
                    }}
                  >
                    <span
                      className="font-serif text-xs italic tracking-wide"
                      style={{ color: activePainting.accentColor }}
                    >
                      CSS Impressionism
                    </span>
                  </div>
                </div>

                {/* Text side */}
                <div className="flex flex-col justify-center p-10 md:p-14">
                  <span
                    className="text-xs font-serif tracking-[0.18em] uppercase mb-3 block"
                    style={{ color: `${activePainting.accentColor}aa` }}
                  >
                    {activePainting.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-semibold italic text-[#2c3e50] mb-4 leading-tight">
                    {activePainting.title}
                  </h3>
                  <p className="font-serif text-[#2c3e50]/55 leading-relaxed mb-5">
                    {activePainting.desc}
                  </p>
                  <p
                    className="text-sm font-serif italic text-[#2c3e50]/40 leading-relaxed pl-4"
                    style={{ borderLeft: `3px solid ${activePainting.accentColor}44` }}
                  >
                    {activePainting.detail}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundImage: brushTexture, backgroundColor: canvasBase }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 75% 25%, rgba(232,168,124,0.07) 0%, transparent 55%)",
              "radial-gradient(ellipse at 25% 75%, rgba(26,188,156,0.05) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Palette</SectionLabel>
            <SectionHeading>Oil Paint Colours</SectionHeading>
            <p className="font-serif italic text-[#2c3e50]/45 max-w-md mx-auto leading-relaxed">
              Squeezed straight from the tube — each colour a conversation between pigment,
              linseed oil, and canvas.
            </p>
          </RevealBlock>

          {/* Paint streak arrangement — organic, non-grid */}
          <div className="relative flex flex-wrap justify-center gap-8 md:gap-6">
            {colorPalette.map((color, i) => (
              <RevealBlock
                key={color.name}
                delay={i * 0.07}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="group relative cursor-default"
                  style={{
                    transform: `rotate(${color.rotation}) translate(${color.tx}, ${color.ty})`,
                  }}
                >
                  {/* Paint streak shape — elongated diagonal rectangle */}
                  <div
                    className="transition-all duration-700 group-hover:scale-[1.06]"
                    style={{
                      width: "72px",
                      height: "180px",
                      background: `linear-gradient(170deg, ${color.hex}cc 0%, ${color.hex} 30%, ${color.hex}ee 60%, ${color.hex}88 100%)`,
                      borderRadius: "40px 40px 20px 20px",
                      boxShadow: [
                        "3px 3px 0 rgba(44,62,80,0.25)",
                        "5px 5px 0 rgba(44,62,80,0.12)",
                        "inset -2px -2px 8px rgba(255,255,255,0.15)",
                        "inset 2px 2px 6px rgba(0,0,0,0.12)",
                        `0 8px 20px ${color.hex}44`,
                      ].join(", "),
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Impasto ridges */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(170deg, transparent, transparent 8px, rgba(255,255,255,0.06) 8px, rgba(255,255,255,0.06) 9px)",
                      }}
                    />
                    {/* Highlight streak */}
                    <div
                      className="absolute"
                      style={{
                        top: "10%",
                        left: "20%",
                        width: "20%",
                        height: "60%",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.25), transparent)",
                        borderRadius: "50%",
                        filter: "blur(3px)",
                      }}
                    />
                  </div>

                  {/* Tube cap */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-5"
                    style={{
                      background: `linear-gradient(135deg, ${color.hex}dd, #2c3e50)`,
                      borderRadius: "4px 4px 2px 2px",
                      boxShadow: "1px 1px 0 rgba(44,62,80,0.35)",
                    }}
                  />
                </div>

                <div
                  className="text-center"
                  style={{ transform: `rotate(${color.rotation})` }}
                >
                  <span className="block font-serif text-sm font-medium text-[#2c3e50]">
                    {color.name}
                  </span>
                  <span
                    className="block font-serif text-xs italic"
                    style={{ color: `${color.hex}bb` }}
                  >
                    {color.hex}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Studio ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundImage: brushTexture, backgroundColor: "#ede8d8" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 60% 20%, rgba(192,57,43,0.05) 0%, transparent 50%)",
              "radial-gradient(ellipse at 20% 70%, rgba(232,168,124,0.07) 0%, transparent 55%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <SectionLabel>Component Studio</SectionLabel>
            <SectionHeading>The Atelier</SectionHeading>
            <p className="font-serif italic text-[#2c3e50]/45 max-w-md mx-auto leading-relaxed">
              Each component carries the weight and warmth of paint on canvas — tactile,
              layered, alive.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08} className="flex justify-center gap-3 mb-10">
            {(["canvas", "frame", "palette"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className="px-6 py-2.5 font-serif italic text-sm tracking-wide border transition-all duration-500"
                style={{
                  borderColor:
                    componentTab === tab ? "#e8a87c" : "rgba(44,62,80,0.2)",
                  color: componentTab === tab ? "#e8a87c" : "rgba(44,62,80,0.4)",
                  background:
                    componentTab === tab ? "rgba(232,168,124,0.12)" : "transparent",
                  boxShadow:
                    componentTab === tab ? "2px 2px 0 rgba(232,168,124,0.25)" : "none",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </RevealBlock>

          <RevealBlock delay={0.14}>
            <div
              className="p-10 md:p-14 overflow-hidden"
              style={{
                backgroundImage: brushTexture,
                backgroundColor: canvasBase,
                border: "6px solid #2c3e50",
                boxShadow: [
                  "4px 4px 0 rgba(44,62,80,0.25)",
                  "8px 8px 0 rgba(44,62,80,0.1)",
                  "0 16px 40px rgba(44,62,80,0.15)",
                ].join(", "),
              }}
            >
              {/* Canvas — Buttons */}
              {componentTab === "canvas" && (
                <div className="flex flex-col items-center gap-8">
                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center flex-wrap">
                    {/* Primary impasto button */}
                    <button
                      className="px-9 py-3.5 font-serif font-semibold italic text-[#f5f0e1] tracking-wide transition-all duration-500 hover:scale-[1.03] hover:-translate-y-0.5"
                      style={{
                        background: "linear-gradient(135deg, #c0392b 0%, #e8a87c 100%)",
                        boxShadow: [
                          "4px 4px 0 rgba(44,62,80,0.4)",
                          "6px 6px 0 rgba(44,62,80,0.18)",
                          "0 8px 20px rgba(192,57,43,0.35)",
                        ].join(", "),
                      }}
                    >
                      Brush stroke
                    </button>
                    {/* Secondary — outline */}
                    <button
                      className="px-9 py-3.5 font-serif font-medium italic text-[#2c3e50] tracking-wide border-2 transition-all duration-500 hover:bg-[#2c3e50]/08"
                      style={{
                        borderColor: "#2c3e50",
                        boxShadow: "3px 3px 0 rgba(44,62,80,0.25)",
                      }}
                    >
                      Lay in colour
                    </button>
                    {/* Teal variant */}
                    <button
                      className="px-9 py-3.5 font-serif font-medium italic text-[#f5f0e1] tracking-wide transition-all duration-500 hover:scale-[1.03]"
                      style={{
                        background: "linear-gradient(135deg, #1abc9c 0%, #2c3e50 100%)",
                        boxShadow: [
                          "4px 4px 0 rgba(44,62,80,0.35)",
                          "0 8px 20px rgba(26,188,156,0.25)",
                        ].join(", "),
                      }}
                    >
                      En plein air
                    </button>
                  </div>
                  <p className="text-xs font-serif italic text-[#2c3e50]/35 text-center max-w-xs leading-relaxed">
                    Impasto box-shadow: 4px offset in deep blue-slate with color gradient
                    backgrounds. Hover scale 1.03 with vertical lift.
                  </p>
                </div>
              )}

              {/* Frame — Cards */}
              {componentTab === "frame" && (
                <div className="flex flex-col items-center gap-8">
                  <div className="w-full max-w-sm mx-auto">
                    <div
                      className="group p-8 transition-all duration-700 hover:scale-[1.02] cursor-pointer"
                      style={{
                        backgroundImage: brushTexture,
                        backgroundColor: canvasBase,
                        border: "6px solid #2c3e50",
                        boxShadow: [
                          "4px 4px 0 rgba(44,62,80,0.3)",
                          "8px 8px 0 rgba(44,62,80,0.12)",
                          "inset 0 0 0 2px rgba(232,168,124,0.25)",
                          "0 12px 30px rgba(44,62,80,0.12)",
                        ].join(", "),
                      }}
                    >
                      {/* Inner frame gilt line */}
                      <div
                        className="p-4 mb-4"
                        style={{ border: "2px solid rgba(232,168,124,0.3)" }}
                      >
                        <div
                          className="h-24 w-full transition-all duration-[1500ms] group-hover:scale-[1.02]"
                          style={{
                            backgroundImage: [
                              brushTexture,
                              "radial-gradient(ellipse at 30% 40%, rgba(232,168,124,0.2) 0%, transparent 55%)",
                              "radial-gradient(ellipse at 70% 60%, rgba(192,57,43,0.15) 0%, transparent 50%)",
                            ].join(", "),
                            backgroundColor: "#e8ddc8",
                          }}
                        />
                      </div>
                      <span className="text-xs font-serif italic text-[#e8a87c]/70 tracking-wide block mb-1">
                        Oil on canvas
                      </span>
                      <h3 className="text-xl font-serif font-semibold italic text-[#2c3e50] mb-2 group-hover:text-[#c0392b] transition-colors duration-500">
                        Afternoon Light
                      </h3>
                      <p className="text-sm font-serif italic text-[#2c3e50]/45 leading-relaxed">
                        Light filtered through leaves, pooling gold on worn stone.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-serif italic text-[#2c3e50]/35 text-center max-w-xs leading-relaxed">
                    6px solid frame border. Double inset: outer dark border, inner gilt line at
                    30% opacity. Impasto shadow offset stack.
                  </p>
                </div>
              )}

              {/* Palette — Inputs */}
              {componentTab === "palette" && (
                <div className="w-full max-w-md mx-auto flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-serif italic text-[#e8a87c]/70 mb-2 tracking-wide">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Still life, landscape, portrait..."
                      className="w-full px-5 py-3.5 font-serif italic text-[#2c3e50] placeholder-[#2c3e50]/25 outline-none transition-all duration-500"
                      style={{
                        backgroundImage: brushTexture,
                        backgroundColor: canvasBase,
                        border: "2px solid rgba(44,62,80,0.25)",
                        boxShadow: "2px 2px 0 rgba(44,62,80,0.15)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#e8a87c";
                        e.currentTarget.style.boxShadow =
                          "2px 2px 0 rgba(44,62,80,0.15), 0 0 0 3px rgba(232,168,124,0.18)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(44,62,80,0.25)";
                        e.currentTarget.style.boxShadow = "2px 2px 0 rgba(44,62,80,0.15)";
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif italic text-[#e8a87c]/70 mb-2 tracking-wide">
                      Artist&apos;s note
                    </label>
                    <textarea
                      placeholder="Observations on light, mood, intention..."
                      rows={3}
                      className="w-full px-5 py-3.5 font-serif italic text-[#2c3e50] placeholder-[#2c3e50]/25 outline-none transition-all duration-500 resize-none"
                      style={{
                        backgroundImage: brushTexture,
                        backgroundColor: canvasBase,
                        border: "2px solid rgba(44,62,80,0.25)",
                        boxShadow: "2px 2px 0 rgba(44,62,80,0.15)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#e8a87c";
                        e.currentTarget.style.boxShadow =
                          "2px 2px 0 rgba(44,62,80,0.15), 0 0 0 3px rgba(232,168,124,0.18)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(44,62,80,0.25)";
                        e.currentTarget.style.boxShadow = "2px 2px 0 rgba(44,62,80,0.15)";
                      }}
                    />
                  </div>
                  <p className="text-xs font-serif italic text-[#2c3e50]/35 text-center leading-relaxed">
                    Canvas background, serif italic. Focus ring: warm peach at 18% opacity.
                    Frame border mirrors the ornate card system.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Technique Study ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundImage: brushTexture, backgroundColor: canvasBase }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 80% 60%, rgba(26,188,156,0.05) 0%, transparent 55%)",
              "radial-gradient(ellipse at 15% 35%, rgba(245,216,138,0.06) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <SectionLabel>Technique Study</SectionLabel>
            <SectionHeading>The Painter&apos;s Methods</SectionHeading>
            <p className="font-serif italic text-[#2c3e50]/45 max-w-lg mx-auto leading-relaxed">
              Four foundational techniques — and the CSS approximations that bring each one
              to the screen.
            </p>
          </RevealBlock>

          <div className="space-y-4">
            {techniques.map((tech, i) => {
              const isOpen = openTechnique === tech.id;
              return (
                <RevealBlock key={tech.id} delay={i * 0.06}>
                  <div
                    style={{
                      border: `3px solid ${isOpen ? "#2c3e50" : "rgba(44,62,80,0.2)"}`,
                      boxShadow: isOpen
                        ? "3px 3px 0 rgba(44,62,80,0.25), 0 8px 20px rgba(44,62,80,0.1)"
                        : "2px 2px 0 rgba(44,62,80,0.1)",
                      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {/* Accordion header */}
                    <button
                      className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors duration-300"
                      style={{
                        backgroundImage: brushTexture,
                        backgroundColor: isOpen ? "#ede8d8" : canvasBase,
                      }}
                      onClick={() => setOpenTechnique(isOpen ? null : tech.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                          {tech.visualColors.map((c, ci) => (
                            <div
                              key={ci}
                              className="w-3 h-3 rounded-full"
                              style={{
                                background: c,
                                boxShadow: "1px 1px 0 rgba(44,62,80,0.3)",
                                opacity: 0.8 - ci * 0.15,
                              }}
                            />
                          ))}
                        </div>
                        <span className="font-serif font-semibold italic text-[#2c3e50] text-lg">
                          {tech.label}
                        </span>
                      </div>
                      <span
                        className="font-serif text-[#e8a87c]/70 text-xl transition-transform duration-400"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>

                    {/* Accordion panel */}
                    {isOpen && (
                      <div
                        className="px-7 py-6 border-t"
                        style={{
                          borderTopColor: "rgba(44,62,80,0.15)",
                          backgroundImage: brushTexture,
                          backgroundColor: canvasBase,
                        }}
                      >
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Visual demo */}
                          <div>
                            <p className="text-xs font-serif italic text-[#e8a87c]/60 tracking-[0.15em] uppercase mb-4">
                              CSS Simulation
                            </p>
                            {tech.id === "wet-on-wet" && (
                              <div
                                className="h-32 w-full"
                                style={{
                                  background: [
                                    "radial-gradient(ellipse at 35% 40%, rgba(232,168,124,0.55) 0%, transparent 55%)",
                                    "radial-gradient(ellipse at 65% 60%, rgba(192,57,43,0.45) 0%, transparent 50%)",
                                    "radial-gradient(ellipse at 20% 70%, rgba(245,216,138,0.40) 0%, transparent 45%)",
                                    "radial-gradient(ellipse at 75% 25%, rgba(26,188,156,0.35) 0%, transparent 45%)",
                                  ].join(", "),
                                  filter: "blur(8px)",
                                }}
                              />
                            )}
                            {tech.id === "glazing" && (
                              <div
                                className="h-32 w-full"
                                style={{
                                  background: "#2c3e50",
                                  boxShadow: [
                                    "inset 0 0 40px rgba(232,168,124,0.18)",
                                    "inset 0 0 80px rgba(192,57,43,0.12)",
                                    "inset 0 0 120px rgba(245,216,138,0.08)",
                                  ].join(", "),
                                }}
                              />
                            )}
                            {tech.id === "impasto" && (
                              <div
                                className="h-32 w-full"
                                style={{
                                  background: "#e8a87c",
                                  boxShadow: [
                                    "4px 4px 0 #c0392b",
                                    "8px 8px 0 rgba(232,168,124,0.5)",
                                    "-3px -3px 0 rgba(245,216,138,0.4)",
                                    "0 12px 24px rgba(44,62,80,0.35)",
                                  ].join(", "),
                                  backgroundImage:
                                    "repeating-linear-gradient(35deg, transparent, transparent 4px, rgba(255,255,255,0.07) 4px, rgba(255,255,255,0.07) 5px)",
                                }}
                              />
                            )}
                            {tech.id === "pointillism" && (
                              <div
                                className="h-32 w-full"
                                style={{
                                  backgroundColor: canvasBase,
                                  backgroundImage: [
                                    "radial-gradient(circle, #e8a87c 1px, transparent 1px)",
                                    "radial-gradient(circle, #c0392b 1px, transparent 1px)",
                                    "radial-gradient(circle, #1abc9c 1px, transparent 1px)",
                                  ].join(", "),
                                  backgroundSize: "8px 8px, 8px 8px, 8px 8px",
                                  backgroundPosition: "0 0, 4px 4px, 2px 2px",
                                }}
                              />
                            )}
                          </div>

                          {/* Description */}
                          <div>
                            <h4 className="font-serif font-semibold italic text-[#2c3e50] text-lg mb-3">
                              {tech.title}
                            </h4>
                            <p className="font-serif italic text-[#2c3e50]/50 text-sm leading-relaxed mb-4">
                              {tech.desc}
                            </p>
                            <p
                              className="text-xs font-serif italic text-[#2c3e50]/40 leading-relaxed pl-3 mb-3"
                              style={{ borderLeft: "2px solid rgba(232,168,124,0.4)" }}
                            >
                              {tech.cssNote}
                            </p>
                            <pre
                              className="text-xs font-serif text-[#e8a87c]/70 italic leading-relaxed whitespace-pre-wrap"
                              style={{
                                background: "rgba(44,62,80,0.06)",
                                padding: "8px 12px",
                                borderLeft: "2px solid #e8a87c44",
                              }}
                            >
                              {tech.cssCode}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Typography Atelier ===== */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundImage: brushTexture, backgroundColor: "#ede8d8" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 30% 30%, rgba(232,168,124,0.06) 0%, transparent 55%)",
              "radial-gradient(ellipse at 70% 70%, rgba(44,62,80,0.04) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Typography Atelier</SectionLabel>
            <SectionHeading>The Serif Voice</SectionHeading>
            <p className="font-serif italic text-[#2c3e50]/45 max-w-md mx-auto leading-relaxed">
              Every character drawn like a brushstroke — deliberate, weighted, alive with the
              hand that made it.
            </p>
          </RevealBlock>

          <div className="space-y-6">
            {typographyExamples.map((ex, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div
                  className="group px-8 py-7 transition-all duration-500 hover:translate-x-1"
                  style={{
                    backgroundImage: brushTexture,
                    backgroundColor: canvasBase,
                    borderLeft: "6px solid #2c3e50",
                    boxShadow: "3px 3px 0 rgba(44,62,80,0.15)",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
                    <span
                      className={`font-serif ${ex.weight} ${ex.tracking} leading-tight`}
                      style={{
                        fontSize: ex.size,
                        fontStyle: ex.fontStyle,
                        color: ex.color,
                        textShadow:
                          i === 0
                            ? "2px 2px 0 rgba(192,57,43,0.1)"
                            : "none",
                      }}
                    >
                      {ex.text}
                    </span>
                    <span className="font-serif text-xs italic text-[#2c3e50]/30 tracking-wide whitespace-nowrap">
                      {ex.note}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Font pairing panel */}
          <RevealBlock delay={0.3} className="mt-12">
            <div
              className="p-8 grid md:grid-cols-3 gap-6 text-center"
              style={{
                border: "3px solid rgba(44,62,80,0.2)",
                backgroundImage: brushTexture,
                backgroundColor: canvasBase,
                boxShadow: "3px 3px 0 rgba(44,62,80,0.12)",
              }}
            >
              <div>
                <span className="block font-serif text-xs italic text-[#e8a87c]/60 tracking-[0.15em] uppercase mb-2">
                  Display Face
                </span>
                <span className="font-serif font-semibold italic text-[#2c3e50] text-2xl">
                  Georgia
                </span>
                <span className="block font-serif text-xs italic text-[#2c3e50]/40 mt-1">
                  Titles, hero text
                </span>
              </div>
              <div>
                <span className="block font-serif text-xs italic text-[#e8a87c]/60 tracking-[0.15em] uppercase mb-2">
                  Body Face
                </span>
                <span className="font-serif font-medium text-[#2c3e50] text-2xl">
                  Serif System
                </span>
                <span className="block font-serif text-xs italic text-[#2c3e50]/40 mt-1">
                  Paragraphs, labels
                </span>
              </div>
              <div>
                <span className="block font-serif text-xs italic text-[#e8a87c]/60 tracking-[0.15em] uppercase mb-2">
                  Accent Style
                </span>
                <span className="font-serif font-light italic text-[#c0392b] text-2xl tracking-widest">
                  Italic Serif
                </span>
                <span className="block font-serif text-xs italic text-[#2c3e50]/40 mt-1">
                  Captions, metadata
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        className="relative py-16 px-6 md:px-12 overflow-hidden border-t"
        style={{
          backgroundImage: brushTexture,
          backgroundColor: "#2c3e50",
          borderTopColor: "rgba(232,168,124,0.25)",
        }}
      >
        {/* Ambient dappled light on dark canvas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(232,168,124,0.07) 0%, transparent 50%)",
              "radial-gradient(ellipse at 80% 30%, rgba(26,188,156,0.04) 0%, transparent 45%)",
              "radial-gradient(ellipse at 50% 90%, rgba(192,57,43,0.05) 0%, transparent 55%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Logo + palette SVG */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                {/* Palette SVG icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="opacity-80"
                >
                  <ellipse
                    cx="14"
                    cy="14"
                    rx="12"
                    ry="11"
                    fill="none"
                    stroke="#e8a87c"
                    strokeWidth="1.5"
                  />
                  <circle cx="9" cy="11" r="2.2" fill="#c0392b" opacity="0.85" />
                  <circle cx="14" cy="8" r="2.2" fill="#f5d88a" opacity="0.85" />
                  <circle cx="19" cy="11" r="2.2" fill="#1abc9c" opacity="0.85" />
                  <circle cx="19" cy="17" r="2.2" fill="#e8a87c" opacity="0.85" />
                  <circle cx="11" cy="18" r="2.2" fill="#f5f0e1" opacity="0.55" />
                  <ellipse cx="17" cy="21" rx="3" ry="2" fill="#f5f0e1" opacity="0.35" />
                </svg>
                <span className="font-serif text-xl font-semibold italic text-[#e8a87c] tracking-wide">
                  Impressionist Oil
                </span>
              </div>
              <p className="font-serif text-xs italic text-[#f5f0e1]/35 tracking-wide">
                Part of StyleKit — a living collection of design systems
              </p>
            </div>

            {/* Colour chip row — paint tube tops */}
            <div className="flex items-center gap-2.5">
              {colorPalette.map((c) => (
                <div
                  key={c.hex}
                  className="transition-transform duration-500 hover:-translate-y-1 cursor-default"
                  title={c.name}
                  style={{
                    width: "18px",
                    height: "30px",
                    borderRadius: "9px 9px 5px 5px",
                    background: `linear-gradient(170deg, ${c.hex}cc, ${c.hex})`,
                    boxShadow:
                      "2px 2px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/impressionist-oil"
                className="font-serif text-xs italic text-[#f5f0e1]/30 hover:text-[#e8a87c] transition-colors duration-500 tracking-wide"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs italic text-[#f5f0e1]/30 hover:text-[#e8a87c] transition-colors duration-500 tracking-wide"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="font-serif text-xs italic text-[#f5f0e1]/30 hover:text-[#e8a87c] transition-colors duration-500 tracking-wide"
              >
                Home
              </Link>
            </nav>
          </div>

          <div
            className="mt-10 pt-6 text-center border-t"
            style={{ borderTopColor: "rgba(232,168,124,0.12)" }}
          >
            <p className="font-serif text-xs italic text-[#f5f0e1]/20 tracking-wide">
              Inspired by Monet, Renoir, and Cezanne — rendered in CSS, served with linseed
              oil.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
