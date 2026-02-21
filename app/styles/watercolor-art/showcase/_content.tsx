"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paintingTechniques = [
  {
    label: "Wet-on-Wet",
    title: "Wet-on-Wet",
    desc: "Fresh pigment bleeds freely into a pre-dampened surface. Colors merge at their own will, producing soft, unpredictable transitions that no brush can fully control.",
    detail: "The defining technique of dreamlike backgrounds and misty atmospheres. Water becomes the artist's co-creator.",
    primaryColor: "#d4a0a0",
    secondaryColor: "#c3a0d4",
    accentColor: "#7bb8d4",
  },
  {
    label: "Wet-on-Dry",
    title: "Wet-on-Dry",
    desc: "Wet paint applied to a dry surface produces crisp, defined edges. Each stroke stands alone, with deliberate texture where pigment settles into paper grain.",
    detail: "Used for botanical illustration and precise linework. The paper's tooth catches pigment and creates natural variation.",
    primaryColor: "#8cc5a8",
    secondaryColor: "#e8c87a",
    accentColor: "#d4a0a0",
  },
  {
    label: "Botanical",
    title: "Botanical",
    desc: "Layered washes build depth over dried layers. Each glaze adds transparency without disturbing what lies beneath — luminous color built from light to dark.",
    detail: "Favored by botanical illustrators and naturalists. The cumulative glow of many thin layers cannot be achieved any other way.",
    primaryColor: "#8cc5a8",
    secondaryColor: "#d4a0a0",
    accentColor: "#c3a0d4",
  },
];

const colorSwatches = [
  { name: "Rose Wash", value: "#d4a0a0", angle: "-2deg", offset: "0px" },
  { name: "Cerulean", value: "#7bb8d4", angle: "1.5deg", offset: "6px" },
  { name: "Sage Green", value: "#8cc5a8", angle: "-1deg", offset: "-4px" },
  { name: "Lavender", value: "#c3a0d4", angle: "2deg", offset: "8px" },
  { name: "Ochre Gold", value: "#e8c87a", angle: "-1.5deg", offset: "2px" },
];

const doRules = [
  "Ultra-soft shadows with rgba opacity 0.08–0.18",
  "Organic corners: rounded-2xl for buttons, rounded-3xl for cards",
  "Radial gradients to simulate watercolor wash and pooling",
  "Warm paper background #faf6f0 as the base layer",
  "Delicate borders at 15–25% opacity only",
  "Serif fonts with generous tracking for an artisan feel",
];

const dontRules = [
  "Never use sharp edges (rounded-none or rounded-sm)",
  "Never use hard offset drop shadows",
  "Never use border-2 or thicker borders",
  "Never use neon or highly saturated colors",
  "Never use monospace fonts (font-mono)",
  "Never use uppercase text transforms",
];

const botanicalLeaves = [
  { top: "12%", left: "7%", size: "56px", color: "#8cc5a8", opacity: "0.22", rotation: "20deg", shape: "0 100% 0 100%" },
  { top: "38%", right: "5%", size: "40px", color: "#7bb8d4", opacity: "0.18", rotation: "-15deg", shape: "100% 0 100% 0" },
  { top: "68%", left: "4%", size: "48px", color: "#c3a0d4", opacity: "0.16", rotation: "35deg", shape: "0 100% 0 100%" },
  { top: "80%", right: "8%", size: "36px", color: "#d4a0a0", opacity: "0.20", rotation: "-28deg", shape: "100% 0 100% 0" },
  { top: "22%", right: "9%", size: "44px", color: "#8cc5a8", opacity: "0.15", rotation: "10deg", shape: "0 100% 0 100%" },
  { top: "55%", left: "3%", size: "32px", color: "#e8c87a", opacity: "0.18", rotation: "-40deg", shape: "100% 0 100% 0" },
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ColorOrb({
  color,
  style,
  className = "",
}: {
  color: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        background: `radial-gradient(ellipse, ${color}, transparent 70%)`,
        ...style,
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-serif text-[#d4a0a0]/55 tracking-[0.18em] block mb-3">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#5a3e3e] mb-4 leading-tight">
      {children}
    </h2>
  );
}

function WashBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <ColorOrb
        color="#d4a0a0"
        style={{ top: "-15%", right: "-10%", width: "55%", height: "55%", opacity: 0.07 }}
      />
      <ColorOrb
        color="#7bb8d4"
        style={{ bottom: "-15%", left: "-10%", width: "45%", height: "45%", opacity: 0.06 }}
      />
    </div>
  );
}

function BotanicalLeaf({
  top,
  left,
  right,
  size,
  color,
  opacity,
  rotation,
  shape,
}: {
  top?: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  opacity: string;
  rotation: string;
  shape: string;
}) {
  return (
    <div
      className="absolute pointer-events-none blur-[2px]"
      style={{
        top,
        left,
        right,
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
  const [activeTab, setActiveTab] = useState<"Wet-on-Wet" | "Wet-on-Dry" | "Botanical">("Wet-on-Wet");
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const activeTechnique = paintingTechniques.find((t) => t.label === activeTab)!;

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#5a3e3e] font-serif overflow-x-hidden">

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf6f0]/92 backdrop-blur-md border-b border-[#d4a0a0]/20">
        <div className="relative overflow-hidden">
          {/* Nav color orbs */}
          <div
            className="absolute top-0 left-[20%] w-32 h-8 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, #d4a0a0, transparent 70%)",
              opacity: 0.12,
            }}
          />
          <div
            className="absolute top-0 right-[30%] w-24 h-8 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, #7bb8d4, transparent 70%)",
              opacity: 0.10,
            }}
          />
          <div
            className="absolute top-0 right-[10%] w-20 h-8 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, #8cc5a8, transparent 70%)",
              opacity: 0.09,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Back link */}
              <Link
                href="/styles"
                className="font-serif text-sm text-[#7bb8d4]/70 tracking-wide hover:text-[#7bb8d4] transition-colors duration-500 flex items-center gap-1.5"
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

              {/* Logo */}
              <span className="font-serif text-base md:text-lg text-[#d4a0a0] tracking-wide">
                Watercolor Art
              </span>

              {/* Nav links */}
              <nav className="flex items-center gap-6">
                <Link
                  href="/styles/watercolor-art"
                  className="font-serif text-xs text-[#5a3e3e]/35 tracking-wide hover:text-[#d4a0a0] transition-colors duration-500"
                >
                  Docs
                </Link>
                <Link
                  href="/styles"
                  className="font-serif text-xs text-[#5a3e3e]/35 tracking-wide hover:text-[#d4a0a0] transition-colors duration-500"
                >
                  Styles
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative pt-32 md:pt-52 pb-28 px-6 md:px-12 overflow-hidden min-h-screen flex items-center">
        {/* Multi-layer gradient orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: 0,
            width: "65%",
            height: "70%",
            background: "radial-gradient(ellipse at 70% 20%, #d4a0a0 0%, transparent 60%)",
            opacity: 0.14,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 0,
            left: 0,
            width: "55%",
            height: "60%",
            background: "radial-gradient(ellipse at 20% 80%, #7bb8d4 0%, transparent 50%)",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
            background: "radial-gradient(ellipse at 50% 50%, #8cc5a8 0%, transparent 40%)",
            opacity: 0.08,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "15%",
            right: "15%",
            width: "30%",
            height: "30%",
            background: "radial-gradient(ellipse, #c3a0d4 0%, transparent 65%)",
            opacity: 0.10,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "60%",
            left: "10%",
            width: "25%",
            height: "25%",
            background: "radial-gradient(ellipse, #e8c87a 0%, transparent 65%)",
            opacity: 0.09,
          }}
        />

        {/* Botanical decorations */}
        <BotanicalLeaf
          top="18%"
          right="8%"
          size="64px"
          color="#8cc5a8"
          opacity="0.18"
          rotation="25deg"
          shape="0 100% 0 100%"
        />
        <BotanicalLeaf
          top="72%"
          left="6%"
          size="44px"
          color="#c3a0d4"
          opacity="0.14"
          rotation="-30deg"
          shape="100% 0 100% 0"
        />
        <BotanicalLeaf
          top="40%"
          right="3%"
          size="36px"
          color="#7bb8d4"
          opacity="0.12"
          rotation="12deg"
          shape="0 100% 0 100%"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <p
            className="text-sm font-serif text-[#d4a0a0]/55 tracking-[0.18em] mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Pigments bloom freely on warm paper
          </p>

          <h1
            className="font-serif font-semibold leading-none tracking-tight mb-2"
            style={{
              fontSize: "clamp(4rem, 11vw, 9rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="text-[#d4a0a0]">Watercolor</span>
          </h1>

          <h2
            className="font-serif font-semibold text-[#7bb8d4]/70 leading-none tracking-tight mb-10"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Art
          </h2>

          <p
            className="text-lg font-serif text-[#5a3e3e]/40 mb-14 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            Organic bleeding edges, pigment pooling, and the warmth of handmade paper — a visual language as natural as breathing.
          </p>

          {/* Organic blob CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <button
              className="relative px-10 py-4 text-[#5a3e3e] font-serif font-medium tracking-wide rounded-[40%_60%_55%_45%_/_45%_55%_60%_40%] overflow-hidden transition-all duration-700 hover:scale-[1.03] hover:rounded-[55%_45%_40%_60%_/_60%_40%_45%_55%]"
              style={{
                background: "radial-gradient(ellipse at 40% 40%, #e8c4c4, #d4a0a0 60%)",
                boxShadow: "0 6px 28px rgba(212,160,160,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              Explore the Style
            </button>
            <button className="px-10 py-4 bg-transparent text-[#d4a0a0] font-serif font-medium tracking-wide rounded-2xl border border-[#d4a0a0]/25 hover:bg-[#d4a0a0]/08 hover:shadow-[0_4px_20px_rgba(212,160,160,0.15)] transition-all duration-500">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <WashBackground />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Palette</SectionLabel>
            <SectionHeading>Colors of water and light</SectionHeading>
            <p className="text-[#5a3e3e]/38 font-serif max-w-md mx-auto leading-relaxed">
              Each hue drawn from the watercolorist&apos;s essential palette — transparent, luminous, alive with light.
            </p>
          </RevealBlock>

          {/* Organic, non-grid layout */}
          <div className="relative h-[520px] md:h-[440px] mx-auto max-w-3xl">
            {colorSwatches.map((swatch, i) => {
              const positions = [
                { left: "5%", top: "10%" },
                { left: "28%", top: "52%" },
                { left: "50%", top: "5%" },
                { left: "68%", top: "48%" },
                { left: "82%", top: "12%" },
              ];
              const pos = positions[i];

              return (
                <div key={swatch.name} className="absolute" style={{ ...pos } as React.CSSProperties}>
                <RevealBlock
                  delay={i * 0.08}
                  className=""
                >
                  <div
                    className="flex flex-col items-center gap-3 group cursor-default"
                    style={{ transform: `rotate(${swatch.angle}) translateY(${swatch.offset})` }}
                  >
                    {/* Watercolor blob */}
                    <div
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full transition-all duration-700 group-hover:scale-110"
                      style={{
                        background: `radial-gradient(ellipse at 38% 35%, ${swatch.value}cc, ${swatch.value} 50%, ${swatch.value}88 75%, transparent 100%)`,
                        boxShadow: `0 4px 24px ${swatch.value}30, inset 0 -2px 8px ${swatch.value}40`,
                        filter: "blur(0.5px)",
                      }}
                    />
                    <span className="text-sm font-serif text-[#5a3e3e]/60 tracking-wide">{swatch.name}</span>
                    <span
                      className="text-xs font-serif tracking-wider"
                      style={{ color: `${swatch.value}99` }}
                    >
                      {swatch.value}
                    </span>
                  </div>
                </RevealBlock>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Painting Techniques Section ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Background wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, #d4a0a008 0%, transparent 60%), radial-gradient(ellipse at 80% 40%, #7bb8d408 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <SectionLabel>Techniques</SectionLabel>
            <SectionHeading>Painting Methods</SectionHeading>
            <p className="text-[#5a3e3e]/38 font-serif max-w-lg mx-auto leading-relaxed">
              Three fundamental approaches, each producing a distinct visual character rooted in the physics of water and pigment.
            </p>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1} className="flex justify-center gap-2 mb-10">
            {paintingTechniques.map((technique) => (
              <button
                key={technique.label}
                onClick={() => setActiveTab(technique.label as typeof activeTab)}
                className={`px-6 py-2.5 font-serif text-sm tracking-wide rounded-2xl border transition-all duration-500 ${
                  activeTab === technique.label
                    ? "bg-[#d4a0a0]/12 border-[#d4a0a0]/30 text-[#d4a0a0] shadow-[0_2px_12px_rgba(212,160,160,0.12)]"
                    : "bg-transparent border-[#d4a0a0]/10 text-[#5a3e3e]/35 hover:text-[#5a3e3e]/55 hover:border-[#d4a0a0]/20"
                }`}
              >
                {technique.label}
              </button>
            ))}
          </RevealBlock>

          {/* Technique Card */}
          <RevealBlock delay={0.15}>
            <div
              key={activeTechnique.label}
              className="group relative overflow-hidden rounded-3xl border border-[#d4a0a0]/15 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)]"
              style={{ background: "#faf6f0" }}
            >
              {/* Background orbs that expand on hover */}
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none transition-transform duration-[2000ms] group-hover:scale-150"
                style={{
                  background: `radial-gradient(ellipse, ${activeTechnique.primaryColor}18, transparent 70%)`,
                }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none transition-transform duration-[2000ms] group-hover:scale-150"
                style={{
                  background: `radial-gradient(ellipse, ${activeTechnique.secondaryColor}14, transparent 70%)`,
                }}
              />
              <div
                className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-[2000ms] group-hover:scale-110"
                style={{
                  background: `radial-gradient(ellipse, ${activeTechnique.accentColor}10, transparent 70%)`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[360px]">
                {/* Visual demonstration side */}
                <div className="relative flex items-center justify-center p-12 md:p-16">
                  {/* Watercolor wash demo */}
                  <div className="relative w-48 h-48">
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-700 group-hover:scale-105"
                      style={{
                        background: `radial-gradient(ellipse at 35% 30%, ${activeTechnique.primaryColor}cc 0%, ${activeTechnique.primaryColor}55 45%, transparent 75%)`,
                        filter: "blur(8px)",
                      }}
                    />
                    <div
                      className="absolute inset-4 rounded-full transition-all duration-700 group-hover:scale-110"
                      style={{
                        background: `radial-gradient(ellipse at 60% 65%, ${activeTechnique.secondaryColor}88 0%, ${activeTechnique.secondaryColor}33 55%, transparent 80%)`,
                        filter: "blur(6px)",
                      }}
                    />
                    <div
                      className="absolute inset-8 rounded-full transition-all duration-700 group-hover:scale-125"
                      style={{
                        background: `radial-gradient(ellipse at 50% 50%, ${activeTechnique.accentColor}66 0%, transparent 70%)`,
                        filter: "blur(4px)",
                      }}
                    />
                  </div>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-center p-10 md:p-14 md:pl-0">
                  <span
                    className="text-xs font-serif tracking-[0.15em] mb-4 block"
                    style={{ color: `${activeTechnique.primaryColor}99` }}
                  >
                    Technique
                  </span>
                  <h3 className="text-3xl font-serif font-semibold text-[#5a3e3e] mb-4">
                    {activeTechnique.title}
                  </h3>
                  <p className="text-[#5a3e3e]/50 font-serif leading-relaxed mb-5">
                    {activeTechnique.desc}
                  </p>
                  <p className="text-sm text-[#5a3e3e]/35 font-serif italic leading-relaxed border-l border-[#d4a0a0]/20 pl-4">
                    {activeTechnique.detail}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Component Showcase ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <WashBackground />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <SectionLabel>Components</SectionLabel>
            <SectionHeading>Elements</SectionHeading>
            <p className="text-[#5a3e3e]/38 font-serif max-w-sm mx-auto leading-relaxed">
              Every component carries the softness of paper and the warmth of hand-mixed pigment.
            </p>
          </RevealBlock>

          {/* Component Tab Switcher */}
          <RevealBlock delay={0.1} className="flex justify-center gap-2 mb-10">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className={`px-6 py-2.5 font-serif text-sm tracking-wide rounded-2xl border transition-all duration-500 ${
                  componentTab === tab
                    ? "bg-[#d4a0a0]/12 border-[#d4a0a0]/30 text-[#d4a0a0]"
                    : "bg-transparent border-[#d4a0a0]/10 text-[#5a3e3e]/35 hover:text-[#5a3e3e]/55 hover:border-[#d4a0a0]/20"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </RevealBlock>

          {/* Component Demo Area */}
          <RevealBlock delay={0.15}>
            <div className="relative p-10 md:p-14 rounded-3xl bg-[#faf6f0]/70 border border-[#d4a0a0]/10 shadow-[0_2px_20px_rgba(212,160,160,0.08)] overflow-hidden">
              {/* Ambient decorations */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #c3a0d415, transparent 70%)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #8cc5a812, transparent 70%)" }}
              />

              <div className="relative z-10 flex flex-col items-center gap-8">
                {componentTab === "button" && (
                  <div className="flex flex-col items-center gap-8 w-full">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      {/* Primary: pigment pooling radial-gradient */}
                      <button
                        className="px-9 py-3.5 text-[#5a3e3e] font-serif font-medium tracking-wide rounded-2xl hover:shadow-[0_10px_40px_rgba(212,160,160,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] active:shadow-[0_2px_10px_rgba(212,160,160,0.3),inset_0_2px_4px_rgba(90,62,62,0.1)] transition-all duration-500 ease-in-out"
                        style={{
                          background: "radial-gradient(ellipse at 40% 35%, #e8c4c4, #d4a0a0 55%, #c89090 100%)",
                          boxShadow: "0 4px 20px rgba(212,160,160,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                      >
                        Paint with rose
                      </button>
                      {/* Secondary */}
                      <button className="px-9 py-3.5 bg-transparent text-[#d4a0a0] font-serif font-medium tracking-wide rounded-2xl border border-[#d4a0a0]/25 hover:bg-[#d4a0a0]/08 hover:shadow-[0_4px_20px_rgba(212,160,160,0.15)] active:scale-[0.98] transition-all duration-500 ease-in-out">
                        Secondary wash
                      </button>
                      {/* Cerulean variant */}
                      <button
                        className="px-9 py-3.5 text-[#3d6f8a] font-serif font-medium tracking-wide rounded-2xl hover:shadow-[0_10px_40px_rgba(123,184,212,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] active:shadow-[0_2px_10px_rgba(123,184,212,0.25),inset_0_2px_4px_rgba(45,90,120,0.1)] transition-all duration-500 ease-in-out"
                        style={{
                          background: "radial-gradient(ellipse at 40% 35%, #a8d4e8, #7bb8d4 55%, #6aa8c4 100%)",
                          boxShadow: "0 4px 20px rgba(123,184,212,0.22), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                      >
                        Cerulean wash
                      </button>
                    </div>
                    <p className="text-xs font-serif text-[#5a3e3e]/28 text-center max-w-xs leading-relaxed">
                      Pigment Bloom: shadow expands outward on hover, simulating pigment bleeding on damp paper. Soft Press: inset shadow on active. No scale transforms.
                    </p>
                  </div>
                )}

                {componentTab === "card" && (
                  <div className="w-full max-w-sm">
                    <div className="group p-8 bg-[#faf6f0]/80 border border-[#d4a0a0]/15 rounded-3xl shadow-[0_2px_20px_rgba(212,160,160,0.10)] hover:bg-[#faf6f0]/95 hover:shadow-[0_15px_50px_rgba(212,160,160,0.25)] transition-all duration-700 ease-in-out cursor-pointer relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4a0a0]/20 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-[#d4a0a0]/30 transition-all duration-700 ease-in-out" />
                      <span className="relative z-10 text-xs font-serif text-[#d4a0a0]/55 tracking-wide">Botanical</span>
                      <h3 className="relative z-10 text-2xl font-serif font-semibold text-[#5a3e3e] mb-3 mt-1 group-hover:text-[#8a5e5e] transition-colors duration-500">
                        Morning Bloom
                      </h3>
                      <p className="relative z-10 text-[#5a3e3e]/45 font-serif leading-relaxed">
                        Petals unfold in washes of rose and sage, bleeding softly at their edges like breath on cool glass.
                      </p>
                    </div>
                    <p className="text-xs font-serif text-[#5a3e3e]/28 mt-5 text-center leading-relaxed">
                      Damp Paper: bg lightens on hover. Pigment Bloom orb expands. Text transitions to deeper rose. duration-700 ease-in-out.
                    </p>
                  </div>
                )}

                {componentTab === "input" && (
                  <div className="w-full max-w-md">
                    <div className="mb-5">
                      <label className="block text-sm font-serif italic text-[#d4a0a0]/55 mb-2 tracking-wide">
                        Your name
                      </label>
                      <input
                        type="text"
                        placeholder="Type softly..."
                        className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#d4a0a0]/20 rounded-2xl text-[#5a3e3e] placeholder-[#d4a0a0]/35 font-serif italic focus:border-[#d4a0a0]/35 focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)] focus:outline-none transition-all duration-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-serif italic text-[#d4a0a0]/55 mb-2 tracking-wide">
                        A thought
                      </label>
                      <textarea
                        placeholder="Let the words pool here..."
                        rows={3}
                        className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#d4a0a0]/20 rounded-2xl text-[#5a3e3e] placeholder-[#d4a0a0]/35 font-serif italic focus:border-[#d4a0a0]/35 focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)] focus:outline-none transition-all duration-500 resize-none"
                      />
                    </div>
                    <p className="text-xs font-serif text-[#5a3e3e]/28 mt-5 text-center leading-relaxed">
                      Serif italic for a handwritten feel. Border at 20% opacity. Focus glow at 10% opacity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Botanical Decorations Showcase ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Background tones */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 30%, #8cc5a808 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, #d4a0a008 0%, transparent 50%)",
          }}
        />

        {/* Large background botanical forms */}
        {botanicalLeaves.map((leaf, i) => (
          <BotanicalLeaf
            key={i}
            top={leaf.top}
            left={"left" in leaf ? leaf.left as string : undefined}
            right={"right" in leaf ? leaf.right as string : undefined}
            size={leaf.size}
            color={leaf.color}
            opacity={leaf.opacity}
            rotation={leaf.rotation}
            shape={leaf.shape}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Botanical Language</SectionLabel>
            <SectionHeading>Organic Decorations</SectionHeading>
            <p className="text-[#5a3e3e]/38 font-serif max-w-lg mx-auto leading-relaxed">
              Leaf and petal shapes built from pure CSS border-radius. Placed asymmetrically with gentle blur and transparent pigment colors.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sage leaf group */}
            <RevealBlock delay={0.06}>
              <div className="relative p-8 rounded-3xl bg-[#faf6f0]/80 border border-[#8cc5a8]/15 shadow-[0_2px_16px_rgba(140,197,168,0.08)] overflow-hidden">
                <div
                  className="absolute top-4 right-4 w-12 h-12 pointer-events-none blur-[3px]"
                  style={{ background: "#8cc5a8", opacity: 0.22, borderRadius: "0 100% 0 100%", transform: "rotate(15deg)" }}
                />
                <div
                  className="absolute bottom-6 right-8 w-8 h-8 pointer-events-none blur-[2px]"
                  style={{ background: "#8cc5a8", opacity: 0.15, borderRadius: "100% 0 100% 0", transform: "rotate(-20deg)" }}
                />
                <h3 className="text-xl font-serif font-semibold text-[#5a3e3e] mb-2">Sage Leaves</h3>
                <p className="text-sm font-serif text-[#5a3e3e]/45 leading-relaxed mb-5">
                  Opposite border-radius corners create the organic leaf silhouette. Two rules applied diagonally produce the lance shape.
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 blur-[2px]"
                    style={{ background: "#8cc5a8", opacity: 0.55, borderRadius: "0 100% 0 100%", transform: "rotate(10deg)" }}
                  />
                  <code className="text-xs font-serif text-[#8cc5a8]/70 italic">
                    border-radius: 0 100% 0 100%
                  </code>
                </div>
              </div>
            </RevealBlock>

            {/* Cerulean teardrop */}
            <RevealBlock delay={0.12}>
              <div className="relative p-8 rounded-3xl bg-[#faf6f0]/80 border border-[#7bb8d4]/15 shadow-[0_2px_16px_rgba(123,184,212,0.08)] overflow-hidden">
                <div
                  className="absolute top-4 right-4 w-12 h-12 pointer-events-none blur-[3px]"
                  style={{ background: "#7bb8d4", opacity: 0.18, borderRadius: "100% 0 100% 0", transform: "rotate(-12deg)" }}
                />
                <div
                  className="absolute bottom-6 right-10 w-7 h-7 pointer-events-none blur-[2px]"
                  style={{ background: "#7bb8d4", opacity: 0.14, borderRadius: "0 100% 0 100%", transform: "rotate(25deg)" }}
                />
                <h3 className="text-xl font-serif font-semibold text-[#5a3e3e] mb-2">Cerulean Petals</h3>
                <p className="text-sm font-serif text-[#5a3e3e]/45 leading-relaxed mb-5">
                  Mirrored corner rules produce a petal that looks as if pressed in a botanical field journal, slightly imperfect by design.
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 blur-[2px]"
                    style={{ background: "#7bb8d4", opacity: 0.55, borderRadius: "100% 0 100% 0", transform: "rotate(-12deg)" }}
                  />
                  <code className="text-xs font-serif text-[#7bb8d4]/70 italic">
                    border-radius: 100% 0 100% 0
                  </code>
                </div>
              </div>
            </RevealBlock>

            {/* Rose accent blob */}
            <RevealBlock delay={0.18}>
              <div className="relative p-8 rounded-3xl bg-[#faf6f0]/80 border border-[#d4a0a0]/15 shadow-[0_2px_16px_rgba(212,160,160,0.08)] overflow-hidden">
                <div
                  className="absolute top-4 right-4 w-12 h-12 pointer-events-none blur-[4px]"
                  style={{
                    background: "radial-gradient(ellipse, #d4a0a0, transparent 70%)",
                    opacity: 0.35,
                    borderRadius: "60% 40% 55% 45%",
                  }}
                />
                <div
                  className="absolute bottom-5 right-7 w-9 h-9 pointer-events-none blur-[3px]"
                  style={{ background: "#c3a0d4", opacity: 0.25, borderRadius: "45% 55% 40% 60%", transform: "rotate(18deg)" }}
                />
                <h3 className="text-xl font-serif font-semibold text-[#5a3e3e] mb-2">Rose Blobs</h3>
                <p className="text-sm font-serif text-[#5a3e3e]/45 leading-relaxed mb-5">
                  Radial gradient blobs simulate the loose pooling of rose wash. No two placements feel identical — they breathe.
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 blur-[3px]"
                    style={{ background: "radial-gradient(ellipse, #d4a0a0, transparent 70%)", opacity: 0.7, borderRadius: "55% 45% 50% 50%" }}
                  />
                  <code className="text-xs font-serif text-[#d4a0a0]/70 italic">
                    radial-gradient + blur
                  </code>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Design Philosophy ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <WashBackground />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <SectionLabel>Guidelines</SectionLabel>
            <SectionHeading>Design philosophy</SectionHeading>
            <p className="text-[#5a3e3e]/38 font-serif max-w-lg mx-auto leading-relaxed">
              Notes from the studio journal — principles distilled from years of painting with water and light.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Embrace — styled as journal entry */}
            <RevealBlock delay={0.06}>
              <div className="relative p-10 rounded-3xl overflow-hidden border border-[#8cc5a8]/15 shadow-[0_2px_16px_rgba(140,197,168,0.08)]"
                style={{ background: "linear-gradient(135deg, #faf6f0 0%, #f5f2ec 100%)" }}
              >
                {/* Journal paper decoration */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 80% 20%, #8cc5a818, transparent 70%)" }}
                />
                <div
                  className="absolute bottom-4 left-6 w-6 h-6 pointer-events-none blur-[2px]"
                  style={{ background: "#8cc5a8", opacity: 0.15, borderRadius: "0 100% 0 100%", transform: "rotate(20deg)" }}
                />

                <div className="flex items-start gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#8cc5a8]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#8cc5a8]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-[#8cc5a8]">Embrace</h3>
                </div>

                <ul className="space-y-4">
                  {doRules.map((rule, i) => (
                    <li key={i} className="text-sm font-serif italic text-[#5a3e3e]/50 leading-relaxed pl-4 border-l border-[#8cc5a8]/20">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Avoid — journal entry */}
            <RevealBlock delay={0.12}>
              <div className="relative p-10 rounded-3xl overflow-hidden border border-[#d4a0a0]/15 shadow-[0_2px_16px_rgba(212,160,160,0.08)]"
                style={{ background: "linear-gradient(135deg, #faf6f0 0%, #f5f0f0 100%)" }}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 80% 20%, #d4a0a018, transparent 70%)" }}
                />
                <div
                  className="absolute bottom-4 left-6 w-6 h-6 pointer-events-none blur-[2px]"
                  style={{ background: "#d4a0a0", opacity: 0.18, borderRadius: "100% 0 100% 0", transform: "rotate(-15deg)" }}
                />

                <div className="flex items-start gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#d4a0a0]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#d4a0a0]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-[#d4a0a0]">Avoid</h3>
                </div>

                <ul className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="text-sm font-serif italic text-[#5a3e3e]/50 leading-relaxed pl-4 border-l border-[#d4a0a0]/20">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Coda — philosophy quote */}
          <RevealBlock delay={0.2} className="mt-10">
            <div
              className="relative p-10 rounded-3xl text-center border border-[#c3a0d4]/12 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #faf6f0 0%, #f8f4f8 100%)" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #c3a0d410, transparent 70%)" }}
              />
              <p className="text-xl md:text-2xl font-serif italic text-[#5a3e3e]/55 leading-relaxed max-w-2xl mx-auto relative z-10">
                &ldquo;Watercolor rewards the artist who learns to trust the water. Control what you must; surrender the rest to the paper.&rdquo;
              </p>
              <span className="mt-5 block text-xs font-serif text-[#c3a0d4]/55 tracking-[0.15em] relative z-10">
                — Studio principle
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative py-16 px-6 md:px-12 border-t border-[#d4a0a0]/12 overflow-hidden">
        {/* Botanical footer decorations */}
        <div
          className="absolute bottom-4 left-8 w-10 h-10 pointer-events-none blur-[3px]"
          style={{ background: "#8cc5a8", opacity: 0.18, borderRadius: "0 100% 0 100%", transform: "rotate(20deg)" }}
        />
        <div
          className="absolute top-6 right-12 w-8 h-8 pointer-events-none blur-[2px]"
          style={{ background: "#c3a0d4", opacity: 0.15, borderRadius: "100% 0 100% 0", transform: "rotate(-18deg)" }}
        />
        <div
          className="absolute bottom-8 right-24 w-6 h-6 pointer-events-none blur-[2px]"
          style={{ background: "#d4a0a0", opacity: 0.18, borderRadius: "0 100% 0 100%", transform: "rotate(32deg)" }}
        />
        {/* Warm wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #d4a0a006, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="font-serif text-base text-[#d4a0a0] tracking-wide block mb-1">
                Watercolor Art
              </span>
              <p className="font-serif text-xs text-[#5a3e3e]/30 tracking-wide">
                Part of StyleKit — a living collection of design systems
              </p>
            </div>

            {/* Color orbs as footer decoration */}
            <div className="flex items-center gap-3">
              {["#d4a0a0", "#7bb8d4", "#8cc5a8", "#c3a0d4", "#e8c87a"].map((c) => (
                <div
                  key={c}
                  className="w-5 h-5 rounded-full"
                  style={{
                    background: `radial-gradient(ellipse at 38% 35%, ${c}cc, ${c} 60%)`,
                    boxShadow: `0 2px 8px ${c}30`,
                  }}
                />
              ))}
            </div>

            <nav className="flex items-center gap-6">
              <Link
                href="/styles/watercolor-art"
                className="font-serif text-xs text-[#5a3e3e]/30 hover:text-[#d4a0a0] transition-colors duration-500 tracking-wide"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs text-[#5a3e3e]/30 hover:text-[#d4a0a0] transition-colors duration-500 tracking-wide"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="font-serif text-xs text-[#5a3e3e]/30 hover:text-[#d4a0a0] transition-colors duration-500 tracking-wide"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
