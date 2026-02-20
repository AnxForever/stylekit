"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ─── Inline hook ─────────────────────────────────────────────────────────────
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─── Inline RevealBlock ───────────────────────────────────────────────────────
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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const accentColors = [
  { hex: "#ff4757", name: "CUT RED",    label: "Tension",  on: "white" },
  { hex: "#2ed573", name: "SIGNAL GRN", label: "Contrast", on: "#0f0f0f" },
  { hex: "#1e90ff", name: "GRID BLUE",  label: "Division", on: "white" },
  { hex: "#ffa502", name: "EDGE AMBER", label: "Weight",   on: "#0f0f0f" },
];

const doRules = [
  "Use CSS Grid or Flexbox for the split: grid-cols-2",
  "Stack vertically on mobile, split on large screens",
  "Keep maximum contrast between panel backgrounds",
  "Let one panel breathe while the other speaks",
  "Allow subtle panel expansion on hover for emphasis",
];

const dontRules = [
  "Never duplicate content across both sides",
  "Never force split layout on narrow viewports",
  "Never use soft gradients as panel backgrounds",
  "Never let one panel dominate without counterweight",
  "Never add border-radius to structural panel edges",
];

const interactionPhysics = [
  {
    name: "Counter-Weight Focus",
    token: "peer-hover/left:opacity-55 + grayscale",
    desc: "Hovering one panel dims and desaturates the opposite, creating total visual focus without hiding content.",
    accent: "#1e90ff",
  },
  {
    name: "Sharp Editorial Cuts",
    token: "duration-150, black-white inversion",
    desc: "Buttons invert with a hard 150ms cut. No ease-in-out softening. The switch is decisive and immediate.",
    accent: "#ff4757",
  },
  {
    name: "Panel Expansion",
    token: "hover:flex-[1.1] duration-500",
    desc: "Hovered panel grows its flex share gently. The opposite compresses proportionally — balanced tension.",
    accent: "#2ed573",
  },
  {
    name: "Seam Intensification",
    token: "split-pair:hover .split-divider",
    desc: "The center seam transitions from 1px subtle to 2px sharp on hover or focus-within — marking the divide.",
    accent: "#ffa502",
  },
];

const tabOptions = ["BUTTONS", "CARDS", "PANELS"] as const;
type Tab = typeof tabOptions[number];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("BUTTONS");
  const [selectedPanel, setSelectedPanel] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      <style>{`
        @keyframes split-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* Center seam: softens by default, sharpens on split-pair hover */
        .split-divider {
          width: 1px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.18);
          transition: background 0.3s ease, width 0.3s ease;
          align-self: stretch;
        }
        .split-pair:hover .split-divider,
        .split-pair:focus-within .split-divider {
          background: rgba(255,255,255,0.80);
          width: 2px;
        }
        .split-pair-light:hover .split-divider-dark,
        .split-pair-light:focus-within .split-divider-dark {
          background: rgba(15,15,15,0.75);
          width: 2px;
        }
        .split-divider-dark {
          width: 1px;
          flex-shrink: 0;
          background: rgba(15,15,15,0.15);
          transition: background 0.3s ease, width 0.3s ease;
          align-self: stretch;
        }
      `}</style>

      {/* ================================================================
          NAV
      ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-6 md:px-12 h-14">
          <Link
            href="/styles/split-screen/showcase"
            className="text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-150"
          >
            StyleKit /
          </Link>
          <span className="hidden md:block text-xs uppercase tracking-[0.45em] text-white/25">
            Split Screen
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/styles/split-screen"
              className="text-xs uppercase tracking-widest text-white/45 hover:text-white transition-colors duration-150"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="text-xs uppercase tracking-widest text-white/45 hover:text-white transition-colors duration-150"
            >
              All Styles &rarr;
            </Link>
          </nav>
        </div>
      </header>

      {/* ================================================================
          HERO — full-screen split: LEFT dark / RIGHT white
          Counter-weight: peer/left + peer-hover/left:opacity-55 + grayscale
      ================================================================ */}
      <section className="pt-14 min-h-screen flex flex-col">
        <div className="split-pair flex flex-col md:flex-row flex-1 relative">

          {/* LEFT panel — dark */}
          <div className="peer/left relative flex-1 bg-[#0f0f0f] flex items-center justify-center min-h-[50vh] md:min-h-0 cursor-default hover:flex-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_38%,rgba(255,255,255,0.04),transparent_58%)] pointer-events-none" />
            <div className="relative z-10 text-center select-none px-8">
              <span
                className="block text-[clamp(5.5rem,20vw,15rem)] font-mono font-black uppercase leading-none tracking-tighter text-white"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateX(0)" : "translateX(-56px)",
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                SPLIT
              </span>
              <span
                className="block text-xs uppercase tracking-[0.45em] text-white/35 mt-5"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
                }}
              >
                Dark World
              </span>
            </div>
          </div>

          {/* Center seam — intensifies on split-pair hover */}
          <div className="split-divider hidden md:block" />

          {/* RIGHT panel — white, dims when LEFT is hovered */}
          <div
            className="
              peer/right relative flex-1 bg-white text-[#0f0f0f]
              flex items-center justify-center min-h-[50vh] md:min-h-0
              cursor-default
              hover:flex-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              peer-hover/left:opacity-55 peer-hover/left:grayscale
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(0,0,0,0.04),transparent_58%)] pointer-events-none" />
            <div className="relative z-10 text-center select-none px-8">
              <span
                className="block text-[clamp(5.5rem,20vw,15rem)] font-mono font-black uppercase leading-none tracking-tighter text-[#0f0f0f]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateX(0)" : "translateX(56px)",
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s",
                }}
              >
                SCREEN
              </span>
              <span
                className="block text-xs uppercase tracking-[0.45em] text-black/30 mt-5"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
                }}
              >
                Light World
              </span>
            </div>
          </div>

        </div>

        {/* Hero subtitle strip */}
        <div
          className="border-t border-white/10 bg-[#0f0f0f] px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s",
          }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-white/45 max-w-md leading-relaxed">
            Bold contrast and visual tension through split-screen composition.
            Content exists in two parallel worlds simultaneously.
          </p>
          <a
            href="#components"
            className="text-xs uppercase tracking-widest text-white border border-white/25 px-6 py-2 hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 flex-shrink-0"
          >
            Explore &darr;
          </a>
        </div>
      </section>

      {/* ================================================================
          MARQUEE
      ================================================================ */}
      <div className="overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-4">
        <div
          className="flex w-[200%]"
          style={{ animation: "split-marquee 24s linear infinite" }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex-1 flex justify-around items-center text-xs uppercase tracking-[0.38em] text-white/22"
            >
              <span>Counter-Weight Focus</span>
              <span className="w-1 h-1 bg-white/18" />
              <span>Sharp Editorial Cuts</span>
              <span className="w-1 h-1 bg-white/18" />
              <span>Screen-Spanning Lines</span>
              <span className="w-1 h-1 bg-white/18" />
              <span>Panel Expansion</span>
              <span className="w-1 h-1 bg-white/18" />
              <span>Zero Border Radius</span>
              <span className="w-1 h-1 bg-white/18" />
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          COMPONENT DEMOS
      ================================================================ */}
      <section id="components" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Section header + tab switcher */}
        <RevealBlock className="mb-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
            <h2 className="text-xs uppercase tracking-[0.45em] text-white/50">
              Component Demos
            </h2>
            <div className="flex gap-0 border border-white/20 overflow-hidden">
              {tabOptions.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-150 ${
                    activeTab === tab
                      ? "bg-white text-[#0f0f0f]"
                      : "text-white/45 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* ── BUTTONS ──────────────────────────────────────────────── */}
        {activeTab === "BUTTONS" && (
          <RevealBlock className="space-y-14">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Sharp editorial cuts — black / white inversion at 150ms, no gradient easing
            </p>

            {/* Standard pair */}
            <div>
              <span className="block text-xs uppercase tracking-[0.25em] text-white/25 mb-5">Standard Inversion</span>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#0f0f0f] text-white text-xs uppercase tracking-widest border border-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                  Dark Primary
                </button>
                <button className="px-8 py-4 bg-white text-[#0f0f0f] text-xs uppercase tracking-widest border border-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-colors duration-150">
                  Light Primary
                </button>
              </div>
            </div>

            {/* Ghost pair */}
            <div>
              <span className="block text-xs uppercase tracking-[0.25em] text-white/25 mb-5">Ghost Variants</span>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-transparent text-white text-xs uppercase tracking-widest border border-white/35 hover:border-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                  Ghost Dark
                </button>
                <button className="px-8 py-4 bg-transparent text-white/55 text-xs uppercase tracking-widest border border-white/18 hover:bg-white/10 hover:text-white hover:border-white/50 transition-colors duration-150">
                  Ghost Subtle
                </button>
              </div>
            </div>

            {/* Split button — two worlds, one component */}
            <div>
              <span className="block text-xs uppercase tracking-[0.25em] text-white/25 mb-5">Split Button — two worlds, one component</span>
              <div className="inline-flex border border-white/28 overflow-hidden">
                <button className="px-8 py-4 bg-[#0f0f0f] text-white text-xs uppercase tracking-widest hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                  Dark Side
                </button>
                <div className="w-px bg-white/28 flex-shrink-0" />
                <button className="px-8 py-4 bg-white text-[#0f0f0f] text-xs uppercase tracking-widest hover:bg-[#0f0f0f] hover:text-white transition-colors duration-150">
                  Light Side
                </button>
              </div>
            </div>

            {/* Accent buttons */}
            <div>
              <span className="block text-xs uppercase tracking-[0.25em] text-white/25 mb-5">Accent Color Buttons</span>
              <div className="flex flex-wrap gap-4">
                {accentColors.map((c) => (
                  <button
                    key={c.hex}
                    className="px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-150"
                    style={{ border: `1px solid ${c.hex}`, color: c.hex, backgroundColor: "transparent" }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.backgroundColor = c.hex;
                      btn.style.color = c.on;
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.backgroundColor = "transparent";
                      btn.style.color = c.hex;
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>
        )}

        {/* ── CARDS ────────────────────────────────────────────────── */}
        {activeTab === "CARDS" && (
          <RevealBlock className="space-y-10">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Dual-panel card — counter-weight focus: hover left dims right
            </p>

            {/* Main counter-weight card */}
            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden">
              {/* Left — dark */}
              <div className="peer/left relative flex-1 bg-[#0f0f0f] p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:flex-[1.15] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/38 block mb-4">Night Edit</span>
                  <h3 className="text-3xl font-mono font-black uppercase text-white leading-tight">Dark Mode</h3>
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-6 max-w-xs uppercase tracking-[0.18em] leading-relaxed">
                    High-contrast treatment for dramatic storytelling and visual impact.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-white text-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                    Select Dark
                  </button>
                </div>
              </div>

              <div className="split-divider hidden md:block" />

              {/* Right — white, dims on left hover */}
              <div className="peer/right relative flex-1 bg-white p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:flex-[1.15] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-hover/left:opacity-55 peer-hover/left:grayscale cursor-default">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-black/35 block mb-4">Day Edit</span>
                  <h3 className="text-3xl font-mono font-black uppercase text-[#0f0f0f] leading-tight">Light Mode</h3>
                </div>
                <div>
                  <p className="text-xs text-black/50 mb-6 max-w-xs uppercase tracking-[0.18em] leading-relaxed">
                    Editorial clarity for long-form reading and daylight ergonomics.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-[#0f0f0f] bg-[#0f0f0f] text-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                    Select Light
                  </button>
                </div>
              </div>
            </div>

            {/* Compact accent swatch row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-white/18 overflow-hidden">
              {accentColors.map((c, i) => (
                <div
                  key={c.hex}
                  className={`group p-6 flex flex-col gap-3 cursor-default transition-colors duration-200 bg-[#0f0f0f] hover:bg-[#161616] ${
                    i < accentColors.length - 1 ? "border-r border-white/10" : ""
                  }`}
                >
                  <div
                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs uppercase tracking-widest text-white/75">{c.name}</span>
                  <span className="text-xs text-white/30 uppercase tracking-[0.2em]">{c.label}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}

        {/* ── PANELS ───────────────────────────────────────────────── */}
        {activeTab === "PANELS" && (
          <RevealBlock className="space-y-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Interactive panel selection — click to lock, hover to preview counter-weight
            </p>

            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[400px]">
              {/* Panel A — dark */}
              <button
                className={`
                  peer/left relative flex-1 p-8 md:p-12 flex flex-col justify-between text-left
                  cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  bg-[#0f0f0f]
                  ${selectedPanel === "dark" ? "flex-[1.35]" : ""}
                  ${selectedPanel === "light" ? "opacity-40 grayscale" : ""}
                `}
                onClick={() => setSelectedPanel(selectedPanel === "dark" ? null : "dark")}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/38 block mb-3">Option A</span>
                  <h3 className="text-4xl md:text-5xl font-mono font-black uppercase text-white leading-none">Dark</h3>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-2 text-xs uppercase tracking-[0.2em] text-white/45">
                    <li>High contrast editorial</li>
                    <li>Dramatic visual weight</li>
                    <li>Night-mode native</li>
                  </ul>
                  <div
                    className={`inline-block px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-150 ${
                      selectedPanel === "dark"
                        ? "bg-white text-[#0f0f0f]"
                        : "border border-white/35 text-white/55"
                    }`}
                  >
                    {selectedPanel === "dark" ? "Selected" : "Choose Dark"}
                  </div>
                </div>
              </button>

              <div className="split-divider hidden md:block" />

              {/* Panel B — white, dims when A is active */}
              <button
                className={`
                  peer/right relative flex-1 p-8 md:p-12 flex flex-col justify-between text-left
                  cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  bg-white text-[#0f0f0f]
                  ${selectedPanel === "light" ? "flex-[1.35]" : ""}
                  ${selectedPanel === "dark" ? "opacity-40 grayscale" : ""}
                  peer-hover/left:opacity-55 peer-hover/left:grayscale
                `}
                onClick={() => setSelectedPanel(selectedPanel === "light" ? null : "light")}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-black/35 block mb-3">Option B</span>
                  <h3 className="text-4xl md:text-5xl font-mono font-black uppercase text-[#0f0f0f] leading-none">Light</h3>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-2 text-xs uppercase tracking-[0.2em] text-black/45">
                    <li>Editorial clarity</li>
                    <li>Daylight ergonomics</li>
                    <li>Maximum readability</li>
                  </ul>
                  <div
                    className={`inline-block px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-150 ${
                      selectedPanel === "light"
                        ? "bg-[#0f0f0f] text-white"
                        : "border border-black/28 text-black/50"
                    }`}
                  >
                    {selectedPanel === "light" ? "Selected" : "Choose Light"}
                  </div>
                </div>
              </button>
            </div>

            {selectedPanel && (
              <p className="text-xs uppercase tracking-[0.3em] text-white/35 text-center pt-2">
                {selectedPanel === "dark"
                  ? "Dark selected — click again to deselect"
                  : "Light selected — click again to deselect"}
              </p>
            )}
          </RevealBlock>
        )}
      </section>

      {/* ================================================================
          COLOR PALETTE — split-screen treatment per accent
      ================================================================ */}
      <section className="border-t border-white/10 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-14">
          <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 border-b border-white/10 pb-8">
            Color System
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.08}>
          {/* Each accent shown simultaneously on black and white */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/18 overflow-hidden">
            {accentColors.map((c, i) => (
              <div
                key={c.hex}
                className={`group ${i < accentColors.length - 1 ? "border-r border-white/10" : ""}`}
              >
                {/* On black */}
                <div className="bg-[#0f0f0f] p-6 flex flex-col gap-3 border-b border-white/10">
                  <div
                    className="w-full h-12 transition-transform duration-300 ease-out group-hover:scale-y-110 origin-bottom"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs uppercase tracking-widest" style={{ color: c.hex }}>
                    {c.name}
                  </span>
                  <span className="text-xs text-white/28 uppercase tracking-[0.2em] font-mono">{c.hex}</span>
                </div>
                {/* On white */}
                <div className="bg-white p-6 flex flex-col gap-3">
                  <div
                    className="w-full h-12 transition-transform duration-300 ease-out group-hover:scale-y-110 origin-top"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs uppercase tracking-widest text-[#0f0f0f]">{c.label}</span>
                  <span className="text-xs text-black/28 uppercase tracking-[0.2em] font-mono">On White</span>
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>

        {/* Base pair */}
        <RevealBlock delay={0.15}>
          <div className="flex flex-col md:flex-row border-l border-r border-b border-white/18 overflow-hidden">
            <div className="flex-1 bg-[#0f0f0f] p-5 flex items-center justify-between border-r border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/50">Primary</span>
              <span className="text-xs uppercase tracking-widest text-white/30 font-mono">#0f0f0f</span>
            </div>
            <div className="flex-1 bg-white p-5 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-black/50">Secondary</span>
              <span className="text-xs uppercase tracking-widest text-black/30 font-mono">#ffffff</span>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          DESIGN RULES — full-width DO / DON'T split
          Counter-weight: peer/left on the DO panel dims the DON'T panel
      ================================================================ */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 border-b border-white/10 pb-8">
            Design Rules
          </h2>
        </RevealBlock>

        <div className="split-pair flex flex-col md:flex-row">
          {/* DO — dark bg */}
          <div className="peer/left flex-1 bg-[#0f0f0f] px-8 md:px-16 py-16 hover:flex-[1.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <RevealBlock delay={0.05}>
              <div className="max-w-sm">
                <span className="text-xs uppercase tracking-[0.45em] text-[#2ed573] mb-8 block">DO</span>
                <ul className="space-y-7">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-4 group/rule">
                      <span className="mt-[3px] w-4 h-4 border border-[#2ed573] flex items-center justify-center flex-shrink-0">
                        <span className="w-2 h-2 bg-[#2ed573]" />
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/60 group-hover/rule:text-white transition-colors duration-150 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          <div className="split-divider hidden md:block" />

          {/* DON'T — white bg, dims when DO panel hovered */}
          <div
            className="
              peer/right flex-1 bg-white px-8 md:px-16 py-16
              hover:flex-[1.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              peer-hover/left:opacity-55 peer-hover/left:grayscale
            "
          >
            <RevealBlock delay={0.12}>
              <div className="max-w-sm">
                <span className="text-xs uppercase tracking-[0.45em] text-[#ff4757] mb-8 block">{"DON'T"}</span>
                <ul className="space-y-7">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-4 group/rule">
                      <span className="mt-[3px] w-4 h-4 border border-[#ff4757] flex items-center justify-center flex-shrink-0">
                        <span className="w-2 h-px bg-[#ff4757]" />
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-black/55 group-hover/rule:text-black transition-colors duration-150 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================
          INTERACTION PHYSICS
      ================================================================ */}
      <section className="border-t border-white/10 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-14">
          <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 border-b border-white/10 pb-8">
            Interaction Physics
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/18 overflow-hidden">
          {interactionPhysics.map((item, i) => (
            <RevealBlock
              key={item.name}
              delay={i * 0.07}
              className={`group p-8 md:p-10 bg-[#0f0f0f] hover:bg-[#141414] transition-colors duration-200 cursor-default ${
                i % 2 === 0 ? "md:border-r border-white/10" : ""
              } ${i < 2 ? "border-b border-white/10" : ""}`}
            >
              <div
                className="w-5 h-px mb-6 transition-all duration-300 group-hover:w-10"
                style={{ backgroundColor: item.accent }}
              />
              <h3 className="text-sm uppercase tracking-widest text-white mb-2 leading-relaxed">{item.name}</h3>
              <code className="text-xs text-white/28 block mb-4 font-mono break-all">{item.token}</code>
              <p className="text-xs text-white/45 leading-relaxed uppercase tracking-[0.15em]">{item.desc}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Spanning seam */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs uppercase tracking-[0.55em] text-white/20 font-mono flex-shrink-0">
              Split Screen
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/28">
              StyleKit &middot; Split Screen Showcase
            </p>
            <Link
              href="/styles/split-screen"
              className="text-xs uppercase tracking-widest text-white/45 border border-white/18 px-6 py-2 hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150"
            >
              View Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
