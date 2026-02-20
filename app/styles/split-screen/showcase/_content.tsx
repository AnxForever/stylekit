"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Inline hook ─────────────────────────────────────────────────────────────
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

// ─── RevealBlock ─────────────────────────────────────────────────────────────
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
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
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
  "Use CSS Grid or Flexbox for the split: grid-cols-1 lg:grid-cols-2",
  "Stack vertically on mobile, split on large screens",
  "Keep maximum contrast between panel backgrounds",
  "Let one panel breathe visually while the other speaks",
  "Allow subtle panel expansion on hover for emphasis",
  "Add transitions to guide user attention between sides",
  "Consider sticky scroll locking for deep narrative content",
];

const dontRules = [
  "Never duplicate content across both sides",
  "Never force split layout on narrow mobile viewports",
  "Never use soft gradients as primary panel backgrounds",
  "Never let one panel dominate without visual counterweight",
  "Never add border-radius to structural split panel edges",
];

const variantData = [
  {
    id: "50-50",
    label: "50 / 50 Split",
    desc: "Equal-weight panels. Maximum visual tension. Ideal for binary choices, comparisons, or brand duality.",
    leftBg: "#0f0f0f",
    rightBg: "#ffffff",
    leftText: "#ffffff",
    rightText: "#0f0f0f",
    leftLabel: "50",
    rightLabel: "50",
    grid: "md:grid-cols-2",
  },
  {
    id: "60-40",
    label: "60 / 40 Split",
    desc: "One dominant panel with supporting context. Visual hierarchy is clear — content leads, detail follows.",
    leftBg: "#0f0f0f",
    rightBg: "#f5f5f5",
    leftText: "#ffffff",
    rightText: "#0f0f0f",
    leftLabel: "60",
    rightLabel: "40",
    grid: "md:grid-cols-[60fr_40fr]",
  },
  {
    id: "40-60",
    label: "40 / 60 Split",
    desc: "Visual teaser on left, rich content on right. A format widely used in editorial and product marketing.",
    leftBg: "#1e90ff",
    rightBg: "#0f0f0f",
    leftText: "#ffffff",
    rightText: "#ffffff",
    leftLabel: "40",
    rightLabel: "60",
    grid: "md:grid-cols-[40fr_60fr]",
  },
];

const contentPatterns = [
  {
    id: "image-text",
    label: "Image + Text",
    tagline: "Visual left, narrative right",
    desc: "The foundational split-screen pattern. Striking visual claim on the left; measured typographic content on the right.",
    accent: "#1e90ff",
  },
  {
    id: "feature-form",
    label: "Feature + Form",
    tagline: "Benefit pitch beside action",
    desc: "Lead with compelling product value on one panel, then place the conversion form directly opposite. Reduces decision distance.",
    accent: "#ff4757",
  },
  {
    id: "before-after",
    label: "Before / After",
    tagline: "State change revealed",
    desc: "Show transformation by splitting the before state and after state side by side. Powerful for product, design, and data storytelling.",
    accent: "#2ed573",
  },
  {
    id: "nav-content",
    label: "Navigation + Content",
    tagline: "Persistent sidebar pattern",
    desc: "Left panel holds navigation or filter controls; right panel updates with selected content. Classic app interface scaffold.",
    accent: "#ffa502",
  },
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
type Tab = (typeof tabOptions)[number];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SplitScreenShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("BUTTONS");
  const [selectedPanel, setSelectedPanel] = useState<"dark" | "light" | null>(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [activePattern, setActivePattern] = useState(0);
  const [formSide, setFormSide] = useState<"left" | "right">("left");

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
        .diagonal-left {
          clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
          margin-right: -6%;
          position: relative;
          z-index: 1;
        }
        .diagonal-right {
          clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%);
          margin-left: -6%;
        }
        @media (max-width: 767px) {
          .diagonal-left,
          .diagonal-right {
            clip-path: none;
            margin: 0;
          }
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
          HERO — full-screen interactive split: hover to expand left or right
      ================================================================ */}
      <section className="pt-14 min-h-screen flex flex-col">
        <div className="split-pair flex flex-col md:flex-row flex-1 relative">

          {/* LEFT panel — dark */}
          <div className="peer/left group relative flex-1 bg-[#0f0f0f] flex items-center justify-center min-h-[50vh] md:min-h-0 cursor-default hover:flex-[1.2] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_38%,rgba(255,255,255,0.04),transparent_58%)] pointer-events-none" />
            <div className="relative z-10 text-center select-none px-8">
              <span
                className="block text-[clamp(5rem,18vw,14rem)] font-mono font-black uppercase leading-none tracking-tighter text-white"
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
                Dark World — hover to expand
              </span>
              <div
                className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-white/50 border border-white/20 px-4 py-2 inline-block">
                  Expanded
                </span>
              </div>
            </div>
          </div>

          {/* Center seam */}
          <div className="split-divider hidden md:block" />

          {/* RIGHT panel — white, counter-weight dims when LEFT is hovered */}
          <div
            className="
              peer/right group relative flex-1 bg-white text-[#0f0f0f]
              flex items-center justify-center min-h-[50vh] md:min-h-0
              cursor-default
              hover:flex-[1.2] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              peer-hover/left:opacity-50 peer-hover/left:grayscale
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(0,0,0,0.04),transparent_58%)] pointer-events-none" />
            <div className="relative z-10 text-center select-none px-8">
              <span
                className="block text-[clamp(5rem,18vw,14rem)] font-mono font-black uppercase leading-none tracking-tighter text-[#0f0f0f]"
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
                Light World — hover to expand
              </span>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs uppercase tracking-[0.3em] text-black/40 border border-black/20 px-4 py-2 inline-block">
                  Expanded
                </span>
              </div>
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
            href="#variants"
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
              <span>Grid Cols 2</span>
              <span className="w-1 h-1 bg-white/18" />
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          SPLIT-SCREEN VARIANTS GALLERY
      ================================================================ */}
      <section id="variants" className="border-t border-white/10 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 mb-2">
                Layout Variants
              </h2>
              <p className="text-xs text-white/28 uppercase tracking-[0.22em]">
                Four distinct split configurations
              </p>
            </div>
            <div className="flex gap-0 border border-white/20 overflow-hidden">
              {variantData.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(i)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-150 ${
                    activeVariant === i
                      ? "bg-white text-[#0f0f0f]"
                      : "text-white/45 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {v.id}
                </button>
              ))}
              <button
                onClick={() => setActiveVariant(3)}
                className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-150 ${
                  activeVariant === 3
                    ? "bg-white text-[#0f0f0f]"
                    : "text-white/45 hover:text-white hover:bg-white/8"
                }`}
              >
                Diagonal
              </button>
            </div>
          </div>
        </RevealBlock>

        {/* 50/50 Variant */}
        {activeVariant === 0 && (
          <RevealBlock className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-8">
              {variantData[0].desc}
            </p>
            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[360px]">
              <div className="peer/left flex-1 bg-[#0f0f0f] p-10 md:p-14 flex flex-col justify-between hover:flex-[1.12] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-default">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/30 block mb-5">Left Panel</span>
                  <h3 className="text-5xl md:text-7xl font-mono font-black uppercase text-white leading-none">50</h3>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed mb-6 max-w-xs">
                    Equal visual weight. Dark dominant tone asserts contrast authority.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-white text-white group-hover:bg-white group-hover:text-[#0f0f0f] transition-colors duration-150">
                    Dark Side
                  </button>
                </div>
              </div>
              <div className="split-divider hidden md:block" />
              <div className="peer/right flex-1 bg-white p-10 md:p-14 flex flex-col justify-between hover:flex-[1.12] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-default peer-hover/left:opacity-55 peer-hover/left:grayscale">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-black/30 block mb-5">Right Panel</span>
                  <h3 className="text-5xl md:text-7xl font-mono font-black uppercase text-[#0f0f0f] leading-none">50</h3>
                </div>
                <div>
                  <p className="text-xs text-black/45 uppercase tracking-[0.2em] leading-relaxed mb-6 max-w-xs">
                    Equal visual weight. Light editorial tone creates reading clarity.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-[#0f0f0f] bg-[#0f0f0f] text-white group-hover:bg-white group-hover:text-[#0f0f0f] transition-colors duration-150">
                    Light Side
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/20 uppercase tracking-[0.28em]">
              Tailwind: <span className="text-white/40">grid grid-cols-1 md:grid-cols-2</span>
            </p>
          </RevealBlock>
        )}

        {/* 60/40 Variant */}
        {activeVariant === 1 && (
          <RevealBlock className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-8">
              {variantData[1].desc}
            </p>
            <div className="split-pair grid grid-cols-1 md:grid-cols-[60fr_40fr] border border-white/18 overflow-hidden min-h-[360px]">
              <div className="group bg-[#0f0f0f] p-10 md:p-14 flex flex-col justify-between cursor-default hover:brightness-110 transition-all duration-300">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/30 block mb-5">Dominant Panel</span>
                  <h3 className="text-5xl md:text-8xl font-mono font-black uppercase text-white leading-none">60</h3>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed mb-6 max-w-sm">
                    Visual hero. Full-bleed imagery or bold typography. Primary narrative voice.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-white text-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                    Primary Action
                  </button>
                </div>
              </div>
              <div className="group bg-[#f5f5f5] p-8 md:p-10 flex flex-col justify-between cursor-default hover:brightness-95 transition-all duration-300">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-black/30 block mb-5">Support Panel</span>
                  <h3 className="text-4xl md:text-5xl font-mono font-black uppercase text-[#0f0f0f] leading-none">40</h3>
                </div>
                <div>
                  <p className="text-xs text-black/45 uppercase tracking-[0.2em] leading-relaxed mb-6">
                    Supporting context. Details, form, or supplemental information.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-black/25 text-black/60 hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors duration-150">
                    Secondary
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/20 uppercase tracking-[0.28em]">
              Tailwind: <span className="text-white/40">grid grid-cols-1 md:grid-cols-[60fr_40fr]</span>
            </p>
          </RevealBlock>
        )}

        {/* 40/60 Variant */}
        {activeVariant === 2 && (
          <RevealBlock className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-8">
              {variantData[2].desc}
            </p>
            <div className="split-pair grid grid-cols-1 md:grid-cols-[40fr_60fr] border border-white/18 overflow-hidden min-h-[360px]">
              <div className="group bg-[#1e90ff] p-8 md:p-10 flex flex-col justify-between cursor-default hover:brightness-110 transition-all duration-300">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/60 block mb-5">Accent Panel</span>
                  <h3 className="text-4xl md:text-5xl font-mono font-black uppercase text-white leading-none">40</h3>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-[0.2em] leading-relaxed mb-6">
                    Color-saturated teaser. An invitation into the dominant panel.
                  </p>
                  <div className="w-8 h-px bg-white/50" />
                </div>
              </div>
              <div className="group bg-[#0f0f0f] p-10 md:p-14 flex flex-col justify-between cursor-default">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/30 block mb-5">Content Panel</span>
                  <h3 className="text-5xl md:text-7xl font-mono font-black uppercase text-white leading-none">60</h3>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed mb-6 max-w-sm">
                    Rich editorial space. Typography, features, CTA, and deep product narrative.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-white text-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                    Explore
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/20 uppercase tracking-[0.28em]">
              Tailwind: <span className="text-white/40">grid grid-cols-1 md:grid-cols-[40fr_60fr]</span>
            </p>
          </RevealBlock>
        )}

        {/* Diagonal Variant */}
        {activeVariant === 3 && (
          <RevealBlock className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-8">
              Diagonal clip-path creates a sharp angled seam between panels. Dynamic and editorial — best for hero banners and brand pages.
            </p>
            <div className="flex flex-col md:flex-row overflow-hidden min-h-[360px] border border-white/18">
              <div className="diagonal-left flex-1 bg-[#0f0f0f] p-10 md:p-14 flex flex-col justify-between min-h-[280px] md:min-h-0">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/30 block mb-5">Dark Panel</span>
                  <h3 className="text-5xl md:text-7xl font-mono font-black uppercase text-white leading-none">Left</h3>
                </div>
                <p className="text-xs text-white/38 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
                  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%)
                </p>
              </div>
              <div className="diagonal-right flex-1 bg-white p-10 md:p-14 flex flex-col justify-between min-h-[280px] md:min-h-0">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-black/30 block mb-5">Light Panel</span>
                  <h3 className="text-5xl md:text-7xl font-mono font-black uppercase text-[#0f0f0f] leading-none">Right</h3>
                </div>
                <p className="text-xs text-black/38 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
                  clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%)
                </p>
              </div>
            </div>
            <p className="text-xs text-white/20 uppercase tracking-[0.28em]">
              CSS: <span className="text-white/40">clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%)</span>
            </p>
          </RevealBlock>
        )}
      </section>

      {/* ================================================================
          CONTENT PATTERNS — image+text, feature+form, before/after
      ================================================================ */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto mb-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 mb-2">
                Content Patterns
              </h2>
              <p className="text-xs text-white/28 uppercase tracking-[0.22em]">
                Common split-screen content configurations
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* Tabs */}
        <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto mb-10" delay={0.05}>
          <div className="flex flex-wrap gap-0 border border-white/20 overflow-hidden w-fit">
            {contentPatterns.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePattern(i)}
                className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-150 ${
                  activePattern === i
                    ? "bg-white text-[#0f0f0f]"
                    : "text-white/45 hover:text-white hover:bg-white/8"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Image + Text pattern */}
        {activePattern === 0 && (
          <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[480px]">
              {/* Image side */}
              <div className="peer/left group flex-1 relative overflow-hidden min-h-[280px] md:min-h-0 cursor-default hover:flex-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <img
                  src="https://picsum.photos/seed/split01/800/600"
                  alt="Visual panel"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f]/60 to-transparent" />
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full">
                  <span className="text-xs uppercase tracking-[0.4em] text-white/55">Visual Side</span>
                </div>
              </div>

              <div className="split-divider hidden md:block" />

              {/* Text side */}
              <div
                className="
                  peer/right flex-1 bg-white text-[#0f0f0f] p-8 md:p-12
                  flex flex-col justify-center
                  hover:flex-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  peer-hover/left:opacity-55 peer-hover/left:grayscale
                "
              >
                <span className="text-xs uppercase tracking-[0.4em] text-black/35 block mb-5">Narrative Side</span>
                <h3 className="text-3xl md:text-4xl font-mono font-black uppercase text-[#0f0f0f] leading-tight mb-6">
                  Image<br />Plus<br />Text
                </h3>
                <p className="text-xs text-black/50 uppercase tracking-[0.18em] leading-relaxed mb-8 max-w-xs">
                  The foundational split pattern. Striking visual on the left draws the eye;
                  measured typographic content on the right builds trust and drives action.
                </p>
                <button className="self-start px-6 py-3 text-xs uppercase tracking-widest border border-[#0f0f0f] bg-[#0f0f0f] text-white hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150">
                  Read More
                </button>
              </div>
            </div>
          </RevealBlock>
        )}

        {/* Feature + Form pattern */}
        {activePattern === 1 && (
          <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="split-pair-light flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[520px]">
              {/* Feature side — dark */}
              <div className="peer/left group flex-1 bg-[#0f0f0f] p-8 md:p-12 flex flex-col justify-between cursor-default hover:flex-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-[#ff4757] block mb-6">Features</span>
                  <h3 className="text-3xl md:text-4xl font-mono font-black uppercase text-white leading-tight mb-8">
                    Why<br />Choose Us
                  </h3>
                  <ul className="space-y-4">
                    {["Zero configuration setup", "Built for performance", "TypeScript native", "100% accessible"].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 group/item">
                        <span
                          className="w-4 h-4 flex-shrink-0 border border-[#ff4757] flex items-center justify-center"
                        >
                          <span className="w-2 h-2 bg-[#ff4757]" />
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/55 group-hover/item:text-white transition-colors duration-150">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <span className="text-xs uppercase tracking-[0.28em] text-white/20">
                    Place your benefit copy here. Reduce decision distance.
                  </span>
                </div>
              </div>

              <div className="split-divider-dark hidden md:block" />

              {/* Form side — white */}
              <div
                className="
                  peer/right flex-1 bg-white text-[#0f0f0f] p-8 md:p-12
                  flex flex-col justify-center
                  hover:flex-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  peer-hover/left:opacity-55 peer-hover/left:grayscale
                "
              >
                <span className="text-xs uppercase tracking-[0.4em] text-black/35 block mb-6">Get Started</span>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-black/40 block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-zinc-200 text-sm text-[#0f0f0f] placeholder-zinc-300 focus:outline-none focus:border-[#0f0f0f] transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-black/40 block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-zinc-200 text-sm text-[#0f0f0f] placeholder-zinc-300 focus:outline-none focus:border-[#0f0f0f] transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-black/40 block mb-2">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your project..."
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-zinc-200 text-sm text-[#0f0f0f] placeholder-zinc-300 focus:outline-none focus:border-[#0f0f0f] transition-colors duration-150 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full px-6 py-4 text-xs uppercase tracking-widest bg-[#0f0f0f] text-white hover:bg-[#ff4757] transition-colors duration-150"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </RevealBlock>
        )}

        {/* Before / After pattern */}
        {activePattern === 2 && (
          <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-6 mb-4">
              <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                Toggle perspective:
              </span>
              <div className="flex border border-white/20 overflow-hidden">
                <button
                  onClick={() => setFormSide("left")}
                  className={`px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-150 ${
                    formSide === "left"
                      ? "bg-white text-[#0f0f0f]"
                      : "text-white/45 hover:text-white"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setFormSide("right")}
                  className={`px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-150 ${
                    formSide === "right"
                      ? "bg-white text-[#0f0f0f]"
                      : "text-white/45 hover:text-white"
                  }`}
                >
                  After
                </button>
              </div>
            </div>

            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[400px]">
              {/* Before panel */}
              <div
                className={`peer/left flex-1 bg-[#1a1a1a] p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default ${
                  formSide === "right" ? "opacity-40 grayscale" : "flex-[1.25]"
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/28 block mb-4">Before</span>
                  <h3 className="text-3xl md:text-5xl font-mono font-black uppercase text-white/55 leading-tight mb-6">
                    Old State
                  </h3>
                  <div className="space-y-3">
                    {["Manual processes", "Scattered data", "No visibility", "Slow iteration"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="w-3 h-px bg-white/20 flex-shrink-0" />
                        <span className="text-xs uppercase tracking-[0.18em] text-white/30">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-7xl md:text-9xl font-mono font-black text-white/8 leading-none select-none">
                  01
                </div>
              </div>

              <div className="split-divider hidden md:block" />

              {/* After panel */}
              <div
                className={`peer/right flex-1 bg-[#0f0f0f] border-l border-[#2ed573]/20 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default ${
                  formSide === "left" ? "opacity-40 grayscale" : "flex-[1.25]"
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-[#2ed573] block mb-4">After</span>
                  <h3 className="text-3xl md:text-5xl font-mono font-black uppercase text-white leading-tight mb-6">
                    New State
                  </h3>
                  <div className="space-y-3">
                    {["Automated workflows", "Unified data layer", "Real-time insight", "Rapid deployment"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="w-4 h-4 border border-[#2ed573] flex items-center justify-center flex-shrink-0">
                          <span className="w-2 h-2 bg-[#2ed573]" />
                        </span>
                        <span className="text-xs uppercase tracking-[0.18em] text-white/65">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-7xl md:text-9xl font-mono font-black text-[#2ed573]/10 leading-none select-none">
                  02
                </div>
              </div>
            </div>
          </RevealBlock>
        )}

        {/* Navigation + Content pattern */}
        {activePattern === 3 && (
          <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[480px]">
              {/* Navigation panel */}
              <div className="md:w-64 flex-shrink-0 bg-[#0f0f0f] border-r border-white/10 p-6 md:p-8 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.4em] text-white/28 block mb-4">Navigation</span>
                {["Overview", "Features", "Pricing", "Documentation", "Support", "API Reference"].map((item, i) => (
                  <button
                    key={item}
                    className={`text-left px-4 py-3 text-xs uppercase tracking-[0.22em] transition-colors duration-150 group flex items-center gap-3 ${
                      i === 0
                        ? "bg-white/8 text-white border-l-2 border-white"
                        : "text-white/38 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-white/20"
                    }`}
                  >
                    <span className="w-1 h-1 bg-current rounded-full flex-shrink-0 group-hover:w-2 transition-all duration-150" />
                    {item}
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div className="flex-1 bg-[#111111] p-8 md:p-12 flex flex-col justify-start overflow-auto">
                <span className="text-xs uppercase tracking-[0.4em] text-white/28 block mb-6">Content Panel</span>
                <h3 className="text-3xl font-mono font-black uppercase text-white mb-6">Overview</h3>
                <p className="text-xs text-white/45 uppercase tracking-[0.18em] leading-relaxed mb-8 max-w-lg">
                  Navigation stays persistent on the left panel while content updates on the right.
                  A classic application interface scaffold built with split-screen principles.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["12k+ Users", "99.9% Uptime", "50ms P95", "TypeScript", "MIT License", "Open Source"].map((stat) => (
                    <div key={stat} className="border border-white/10 p-4 bg-white/3 group hover:bg-white/6 transition-colors duration-150 cursor-default">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors duration-150">
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        )}
      </section>

      {/* ================================================================
          COMPONENT DEMOS
      ================================================================ */}
      <section id="components" className="border-t border-white/10 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">

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

        {/* BUTTONS */}
        {activeTab === "BUTTONS" && (
          <RevealBlock className="space-y-14">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Sharp editorial cuts — black / white inversion at 150ms, no gradient easing
            </p>

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

        {/* CARDS */}
        {activeTab === "CARDS" && (
          <RevealBlock className="space-y-10">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Dual-panel card — counter-weight focus: hover left dims right
            </p>

            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden">
              <div className="peer/left relative flex-1 bg-[#0f0f0f] p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:flex-[1.15] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default group">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/38 block mb-4">Night Edit</span>
                  <h3 className="text-3xl font-mono font-black uppercase text-white leading-tight">Dark Mode</h3>
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-6 max-w-xs uppercase tracking-[0.18em] leading-relaxed">
                    High-contrast treatment for dramatic storytelling and visual impact.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-white text-white group-hover:bg-white group-hover:text-[#0f0f0f] transition-colors duration-150">
                    Select Dark
                  </button>
                </div>
              </div>

              <div className="split-divider hidden md:block" />

              <div className="peer/right relative flex-1 bg-white p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:flex-[1.15] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-hover/left:opacity-55 peer-hover/left:grayscale cursor-default group">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-black/35 block mb-4">Day Edit</span>
                  <h3 className="text-3xl font-mono font-black uppercase text-[#0f0f0f] leading-tight">Light Mode</h3>
                </div>
                <div>
                  <p className="text-xs text-black/50 mb-6 max-w-xs uppercase tracking-[0.18em] leading-relaxed">
                    Editorial clarity for long-form reading and daylight ergonomics.
                  </p>
                  <button className="px-6 py-3 text-xs uppercase tracking-widest border border-[#0f0f0f] bg-[#0f0f0f] text-white group-hover:bg-white group-hover:text-[#0f0f0f] transition-colors duration-150">
                    Select Light
                  </button>
                </div>
              </div>
            </div>

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

        {/* PANELS */}
        {activeTab === "PANELS" && (
          <RevealBlock className="space-y-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Interactive panel selection — click to lock, hover to preview counter-weight
            </p>

            <div className="split-pair flex flex-col md:flex-row border border-white/18 overflow-hidden min-h-[400px]">
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
          COLOR SYSTEM
      ================================================================ */}
      <section className="border-t border-white/10 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-14">
          <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 border-b border-white/10 pb-8">
            Color System
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/18 overflow-hidden">
            {accentColors.map((c, i) => (
              <div
                key={c.hex}
                className={`group ${i < accentColors.length - 1 ? "border-r border-white/10" : ""}`}
              >
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
      ================================================================ */}
      <section className="border-t border-white/10 py-24 md:py-36">
        <RevealBlock className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-[0.45em] text-white/50 border-b border-white/10 pb-8">
            Design Rules
          </h2>
        </RevealBlock>

        <div className="split-pair flex flex-col md:flex-row">
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
          PHILOSOPHY STRIP — full-width split: dark + light reading
      ================================================================ */}
      <section className="border-t border-white/10">
        <RevealBlock>
          <div className="split-pair flex flex-col md:flex-row">
            <div className="peer/left flex-1 bg-[#0f0f0f] px-8 md:px-16 py-16 md:py-20 hover:flex-[1.05] transition-all duration-500">
              <span className="text-xs uppercase tracking-[0.4em] text-white/25 block mb-8">Philosophy</span>
              <blockquote className="text-lg md:text-xl font-mono font-black uppercase text-white/90 leading-snug max-w-xs">
                &ldquo;Two worlds held in tension — neither swallows the other.&rdquo;
              </blockquote>
            </div>
            <div className="split-divider hidden md:block" />
            <div
              className="
                peer/right flex-1 bg-white px-8 md:px-16 py-16 md:py-20
                hover:flex-[1.05] transition-all duration-500
                peer-hover/left:opacity-55 peer-hover/left:grayscale
              "
            >
              <span className="text-xs uppercase tracking-[0.4em] text-black/25 block mb-8">Core Principle</span>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 leading-relaxed max-w-xs">
                Split Screen is not just a layout. It is a visual argument. One side states; the other responds.
                Together, they create meaning that neither could generate alone.
              </p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
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
