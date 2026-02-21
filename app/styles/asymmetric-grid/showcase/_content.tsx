"use client";

import { useRef, useEffect, useState } from "react";
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
/*  Color constants from lib/styles/asymmetric-grid.ts                 */
/* ------------------------------------------------------------------ */

const COLOR_PRIMARY = "#0f0f0f";
const COLOR_SECONDARY = "#ffffff";
const COLOR_ACCENT_RED = "#ff3366";
const COLOR_ACCENT_BLUE = "#00d4ff";
const COLOR_ACCENT_YELLOW = "#ffcc00";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Pitch Black", hex: COLOR_PRIMARY, label: "Primary", textColor: "#ffffff" },
  { name: "Pure White", hex: COLOR_SECONDARY, label: "Secondary", textColor: "#0f0f0f" },
  { name: "Electric Red", hex: COLOR_ACCENT_RED, label: "Accent 1", textColor: "#ffffff" },
  { name: "Cyan Blue", hex: COLOR_ACCENT_BLUE, label: "Accent 2", textColor: "#0f0f0f" },
  { name: "Vivid Yellow", hex: COLOR_ACCENT_YELLOW, label: "Accent 3", textColor: "#0f0f0f" },
];

type ComponentTab = "buttons" | "cards" | "inputs";

const doList = [
  "使用 CSS Grid 的 grid-template-columns 定义不等宽列",
  "允许元素跨越多列多行 col-span-2 row-span-3",
  "使用 -translate 和 z-index 创造重叠效果",
  "保持足够的留白与密集区域对比",
  "使用大小差异明显的字体层级",
  "让图片和内容块突破网格边界",
  "悬停时大幅提升 z-index 和 scale，让元素从网格中弹出",
  "使用硬边阴影（shadow-[Xpx_Ypx_0px_color]）强化物理剥离感",
  "卡片内部标题/标签以不同 delay 位移，创造视差错位",
];

const dontList = [
  "禁止所有列宽完全相等",
  "禁止元素整齐对齐毫无变化",
  "禁止忽略移动端的响应式调整",
  "禁止过度杂乱失去可读性",
  "禁止所有元素大小相近",
  "禁止使用柔和阴影（shadow-sm, shadow-md）",
  "禁止使用过长的 duration（不超过 300ms）",
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRules interactive demo state
  const [spatialCard, setSpatialCard] = useState<number | null>(null);
  const [hardPopActive, setHardPopActive] = useState(false);
  const [parallaxHovered, setParallaxHovered] = useState(false);
  const [physicalPressed, setPhysicalPressed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: COLOR_SECONDARY, color: COLOR_PRIMARY, fontFamily: "system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes ag-slide-in-left {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes ag-slide-in-right {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes ag-slide-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes ag-glitch {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, 0); }
          20% { transform: translate(2px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, 0); }
          50% { transform: translate(0, 0); }
        }
        @keyframes ag-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes ag-pulse-red {
          0%, 100% { box-shadow: 6px 6px 0px ${COLOR_ACCENT_RED}; }
          50% { box-shadow: 8px 8px 0px ${COLOR_ACCENT_RED}; }
        }
        @keyframes ag-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ag-marquee-inner {
          animation: ag-marquee 18s linear infinite;
          white-space: nowrap;
          display: flex;
          gap: 0;
        }
        .ag-glitch-text:hover {
          animation: ag-glitch 0.4s steps(1, end) infinite;
        }
        .ag-scan-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: ${COLOR_ACCENT_RED};
          opacity: 0.4;
          animation: ag-scan 3s linear infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. NAV                                                           */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: COLOR_PRIMARY,
          borderBottom: `2px solid ${COLOR_ACCENT_RED}`,
        }}
      >
        <div
          className="flex items-center justify-between px-6 md:px-12"
          style={{ height: "60px" }}
        >
          {/* Logo — offset/broken grid feel */}
          <div className="flex items-center gap-0">
            <span
              className="text-lg font-black tracking-tighter uppercase"
              style={{ color: COLOR_SECONDARY, letterSpacing: "-0.04em" }}
            >
              ASYMM
            </span>
            <span
              className="text-lg font-black tracking-tighter"
              style={{ color: COLOR_ACCENT_RED }}
            >
              .
            </span>
            <span
              className="text-xs uppercase tracking-widest ml-2 self-end mb-1"
              style={{ color: COLOR_ACCENT_BLUE }}
            >
              GRID
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {["Palette", "Components", "Rules", "Do / Don't"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/[^a-z]/g, "-")}`}
                className="text-xs uppercase tracking-widest transition-all duration-200"
                style={{ color: "#888" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = COLOR_ACCENT_RED;
                  (e.target as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#888";
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/asymmetric-grid"
            className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1"
            style={{
              backgroundColor: COLOR_ACCENT_RED,
              color: COLOR_SECONDARY,
              boxShadow: `4px 4px 0px ${COLOR_ACCENT_YELLOW}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_YELLOW}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${COLOR_ACCENT_YELLOW}`;
              (e.currentTarget as HTMLElement).style.transform = "";
            }}
          >
            &larr; Style Detail
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — asymmetric 12-col grid                                 */}
      {/* ================================================================ */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "60px", minHeight: "100vh" }}
      >
        {/* Asymmetric grid background blocks */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 3fr 4fr",
            gridTemplateRows: "60% 40%",
          }}
        >
          <div style={{ backgroundColor: COLOR_PRIMARY }} />
          <div style={{ backgroundColor: COLOR_ACCENT_RED }} />
          <div style={{ backgroundColor: "#f5f5f5" }} />
          <div style={{ backgroundColor: "#f5f5f5" }} />
          <div style={{ backgroundColor: COLOR_ACCENT_YELLOW }} />
          <div style={{ backgroundColor: COLOR_PRIMARY }} />
        </div>

        {/* Scan line overlay on dark panel */}
        <div
          className="absolute ag-scan-line pointer-events-none"
          style={{
            top: 0,
            left: 0,
            width: "calc(5/12 * 100%)",
            height: "60%",
            overflow: "hidden",
          }}
        />

        {/* Hero content — intentionally misaligned */}
        <div className="relative z-10 flex flex-col md:grid md:grid-cols-12 min-h-screen" style={{ paddingTop: "0" }}>
          {/* Left block: 8 cols — big type on dark */}
          <div
            className="md:col-span-8 flex flex-col justify-end px-8 md:px-16 pb-16 pt-32"
            style={{ backgroundColor: "transparent" }}
          >
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <span
                className="block text-xs uppercase tracking-widest mb-4"
                style={{ color: COLOR_ACCENT_RED }}
              >
                Design System / Layout Style
              </span>
            </div>

            <h1
              className="font-black uppercase leading-none mb-0"
              style={{
                fontSize: "clamp(52px, 10vw, 120px)",
                letterSpacing: "-0.04em",
                color: COLOR_SECONDARY,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              BREAK
            </h1>
            <h1
              className="font-black uppercase leading-none"
              style={{
                fontSize: "clamp(52px, 10vw, 120px)",
                letterSpacing: "-0.04em",
                color: COLOR_ACCENT_RED,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(-60px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              THE GRID
            </h1>

            <p
              className="mt-8 max-w-md text-base leading-relaxed"
              style={{
                color: "#aaaaaa",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              Asymmetric Grid rejects uniform column widths, enforces hard edges,
              overlaps elements with brutal precision, and treats visual tension as
              a primary design material.
            </p>

            <div
              className="flex flex-wrap gap-4 mt-10"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s",
              }}
            >
              <button
                className="relative px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                style={{
                  backgroundColor: COLOR_ACCENT_RED,
                  color: COLOR_SECONDARY,
                  boxShadow: `6px 6px 0px ${COLOR_ACCENT_YELLOW}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_ACCENT_YELLOW}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_YELLOW}`;
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translate(6px, 6px)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_YELLOW}`;
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                Explore Style
              </button>
              <button
                className="px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1"
                style={{
                  backgroundColor: "transparent",
                  color: COLOR_SECONDARY,
                  border: `2px solid ${COLOR_SECONDARY}`,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLOR_ACCENT_BLUE;
                  (e.currentTarget as HTMLElement).style.color = COLOR_ACCENT_BLUE;
                  (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${COLOR_ACCENT_BLUE}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLOR_SECONDARY;
                  (e.currentTarget as HTMLElement).style.color = COLOR_SECONDARY;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                View Rules
              </button>
            </div>
          </div>

          {/* Right block: 4 cols — stacked accent cells */}
          <div
            className="hidden md:flex md:col-span-4 flex-col"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {/* Top right: Red with stat */}
            <div
              className="flex-1 flex flex-col items-start justify-end p-8"
              style={{ backgroundColor: COLOR_ACCENT_RED }}
            >
              <span className="text-5xl font-black" style={{ color: COLOR_SECONDARY }}>12</span>
              <span className="text-xs uppercase tracking-widest mt-1" style={{ color: "#ffcccc" }}>
                Column Grid
              </span>
            </div>
            {/* Bottom right: Yellow floater */}
            <div
              className="flex items-center justify-center p-6"
              style={{
                backgroundColor: COLOR_ACCENT_YELLOW,
                minHeight: "120px",
              }}
            >
              <div className="text-center">
                <span
                  className="block text-3xl font-black"
                  style={{ color: COLOR_PRIMARY }}
                >
                  z-50
                </span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "#555" }}>
                  Spatial Escape
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping accent element that breaks the grid */}
        <div
          className="absolute z-20 hidden md:block"
          style={{
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: COLOR_ACCENT_BLUE,
            padding: "16px 32px",
            boxShadow: `8px 8px 0px ${COLOR_PRIMARY}`,
            cursor: "default",
            transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateX(-50%) translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = `12px 12px 0px ${COLOR_PRIMARY}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateX(-50%)";
            (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_PRIMARY}`;
          }}
        >
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: COLOR_PRIMARY }}>
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MARQUEE ticker                                                   */}
      {/* ================================================================ */}
      <div
        className="overflow-hidden border-y-2 py-3"
        style={{
          borderColor: COLOR_ACCENT_RED,
          backgroundColor: COLOR_PRIMARY,
        }}
      >
        <div className="ag-marquee-inner">
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="flex items-center gap-8 pr-8">
              {[
                "ASYMMETRIC GRID",
                "SPATIAL TENSION",
                "HARD SHADOWS",
                "PARALLAX CONTENT",
                "PHYSICAL FEEDBACK",
                "NO EQUAL COLUMNS",
                "VISUAL TENSION",
                "DYNAMIC LAYOUT",
              ].map((item) => (
                <span
                  key={item}
                  className="text-xs uppercase tracking-widest font-bold px-6"
                  style={{ color: item.startsWith("NO") || item.startsWith("HARD") ? COLOR_ACCENT_RED : "#666" }}
                >
                  {item} &nbsp;/
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <div
              className="grid md:grid-cols-12 gap-0"
              style={{ border: `2px solid ${COLOR_PRIMARY}` }}
            >
              {/* Label col — intentionally narrow */}
              <div
                className="md:col-span-2 p-8 flex flex-col justify-end"
                style={{ backgroundColor: COLOR_PRIMARY }}
              >
                <span
                  className="block text-xs uppercase tracking-widest mb-2"
                  style={{ color: COLOR_ACCENT_RED }}
                >
                  Section 02
                </span>
                <span
                  className="block text-xs uppercase tracking-widest"
                  style={{ color: "#555" }}
                >
                  Color System
                </span>
              </div>
              {/* Title col — wide */}
              <div
                className="md:col-span-7 p-8 flex items-end"
                style={{ borderLeft: `2px solid ${COLOR_PRIMARY}` }}
              >
                <h2
                  className="font-black uppercase leading-none"
                  style={{
                    fontSize: "clamp(36px, 6vw, 72px)",
                    letterSpacing: "-0.03em",
                    color: COLOR_PRIMARY,
                  }}
                >
                  Color
                  <br />
                  <span style={{ color: COLOR_ACCENT_RED }}>Palette</span>
                </h2>
              </div>
              {/* Accent block */}
              <div
                className="md:col-span-3 p-8 flex items-center justify-center"
                style={{
                  backgroundColor: COLOR_ACCENT_YELLOW,
                  borderLeft: `2px solid ${COLOR_PRIMARY}`,
                }}
              >
                <span
                  className="text-xs uppercase tracking-widest font-bold text-center"
                  style={{ color: COLOR_PRIMARY }}
                >
                  5 Token System
                  <br />
                  High Contrast
                </span>
              </div>
            </div>
          </RevealBlock>

          {/* Asymmetric swatch grid — different widths */}
          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: "3fr 1fr 2fr 1.5fr 2.5fr",
              border: `2px solid ${COLOR_PRIMARY}`,
            }}
          >
            {paletteSwatches.map((swatch, i) => (
              <div
                key={swatch.name}
                className="relative overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: swatch.hex,
                  border: `1px solid ${swatch.hex === COLOR_SECONDARY ? COLOR_PRIMARY : "transparent"}`,
                  minHeight: hoveredSwatch === i ? "220px" : "180px",
                  transition: "min-height 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={() => setHoveredSwatch(i)}
                onMouseLeave={() => setHoveredSwatch(null)}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  <div
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: swatch.textColor, opacity: 0.6 }}
                  >
                    {swatch.label}
                  </div>
                  <div>
                    <div
                      className="font-black uppercase text-sm leading-tight"
                      style={{ color: swatch.textColor }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className="font-mono text-xs mt-1"
                      style={{ color: swatch.textColor, opacity: 0.7 }}
                    >
                      {swatch.hex}
                    </div>
                  </div>
                </div>
                {/* Hover: hard shadow accent block appears */}
                {hoveredSwatch === i && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      backgroundColor:
                        i === 0 ? COLOR_ACCENT_RED
                        : i === 1 ? COLOR_PRIMARY
                        : i === 2 ? COLOR_ACCENT_YELLOW
                        : i === 3 ? COLOR_PRIMARY
                        : COLOR_ACCENT_RED,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Combination row */}
          <RevealBlock delay={0.1} className="mt-12">
            <p
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: "#888" }}
            >
              Hard contrast combinations
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { bg: COLOR_PRIMARY, text: COLOR_ACCENT_RED, label: "Black + Red" },
                { bg: COLOR_ACCENT_RED, text: COLOR_SECONDARY, label: "Red + White" },
                { bg: COLOR_PRIMARY, text: COLOR_ACCENT_YELLOW, label: "Black + Yellow" },
                { bg: COLOR_ACCENT_YELLOW, text: COLOR_PRIMARY, label: "Yellow + Black" },
                { bg: COLOR_ACCENT_BLUE, text: COLOR_PRIMARY, label: "Blue + Black" },
                { bg: COLOR_PRIMARY, text: COLOR_ACCENT_BLUE, label: "Black + Blue" },
              ].map((combo) => (
                <div
                  key={combo.label}
                  className="group px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-150 cursor-default hover:-translate-x-1 hover:-translate-y-1"
                  style={{
                    backgroundColor: combo.bg,
                    color: combo.text,
                    boxShadow: `3px 3px 0px ${combo.text}44`,
                    border: `2px solid ${combo.text}44`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${combo.text}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px ${combo.text}44`;
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  {combo.label}
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section
        id="components"
        className="py-20 md:py-28 px-6 md:px-16"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header — asymmetric */}
          <RevealBlock className="mb-12">
            <div className="md:grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-5">
                <span
                  className="block text-xs uppercase tracking-widest mb-3"
                  style={{ color: COLOR_ACCENT_RED }}
                >
                  Section 03
                </span>
                <h2
                  className="font-black uppercase leading-none"
                  style={{
                    fontSize: "clamp(32px, 5vw, 64px)",
                    letterSpacing: "-0.03em",
                    color: COLOR_PRIMARY,
                  }}
                >
                  Components
                </h2>
              </div>
              <div className="md:col-span-4 mt-4 md:mt-0">
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                  Every component uses hard-edge shadows, no border-radius, and
                  brutal hover states that make elements jump off the page.
                </p>
              </div>
              <div className="md:col-span-3 mt-4 md:mt-0 flex justify-start md:justify-end">
                {/* Tabs */}
                <div className="flex gap-0" style={{ border: `2px solid ${COLOR_PRIMARY}` }}>
                  {(["buttons", "cards", "inputs"] as ComponentTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-150"
                      style={{
                        backgroundColor: activeTab === tab ? COLOR_PRIMARY : "transparent",
                        color: activeTab === tab ? COLOR_SECONDARY : COLOR_PRIMARY,
                        borderRight: tab !== "inputs" ? `2px solid ${COLOR_PRIMARY}` : "none",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Demo area */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                border: `2px solid ${COLOR_PRIMARY}`,
                backgroundColor: COLOR_SECONDARY,
              }}
            >
              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="p-10">
                  <div className="space-y-10">
                    {/* Primary — Hard Pop */}
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-6"
                        style={{ color: "#888" }}
                      >
                        Primary — Hard Pop with physical shadow
                      </p>
                      <div className="flex flex-wrap gap-6 items-center">
                        <button
                          className="relative px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all duration-150 ease-out hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                          style={{
                            backgroundColor: COLOR_PRIMARY,
                            color: COLOR_SECONDARY,
                            boxShadow: `6px 6px 0px ${COLOR_ACCENT_RED}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_ACCENT_RED}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_RED}`;
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                          onMouseDown={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            (e.currentTarget as HTMLElement).style.transform = "translate(6px, 6px)";
                          }}
                          onMouseUp={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_RED}`;
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                        >
                          Explore
                        </button>
                        <button
                          className="relative px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all duration-150 ease-out hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                          style={{
                            backgroundColor: COLOR_ACCENT_RED,
                            color: COLOR_SECONDARY,
                            boxShadow: `6px 6px 0px ${COLOR_PRIMARY}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_PRIMARY}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_PRIMARY}`;
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                          onMouseDown={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            (e.currentTarget as HTMLElement).style.transform = "translate(6px, 6px)";
                          }}
                          onMouseUp={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_PRIMARY}`;
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                        >
                          Discover
                        </button>
                        <button
                          className="relative px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all duration-150 ease-out hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                          style={{
                            backgroundColor: COLOR_ACCENT_YELLOW,
                            color: COLOR_PRIMARY,
                            boxShadow: `6px 6px 0px ${COLOR_PRIMARY}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_PRIMARY}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_PRIMARY}`;
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                          onMouseDown={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            (e.currentTarget as HTMLElement).style.transform = "translate(6px, 6px)";
                          }}
                          onMouseUp={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_PRIMARY}`;
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </div>

                    {/* Outline */}
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-6"
                        style={{ color: "#888" }}
                      >
                        Outline — border shifts to accent on hover
                      </p>
                      <div className="flex flex-wrap gap-6 items-center">
                        {[
                          { label: "Portfolio", accent: COLOR_ACCENT_RED },
                          { label: "Archive", accent: COLOR_ACCENT_BLUE },
                          { label: "Contact", accent: COLOR_ACCENT_YELLOW },
                        ].map(({ label, accent }) => (
                          <button
                            key={label}
                            className="px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-200"
                            style={{
                              backgroundColor: "transparent",
                              color: COLOR_PRIMARY,
                              border: `2px solid ${COLOR_PRIMARY}`,
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = accent;
                              (e.currentTarget as HTMLElement).style.color = accent;
                              (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${accent}`;
                              (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = COLOR_PRIMARY;
                              (e.currentTarget as HTMLElement).style.color = COLOR_PRIMARY;
                              (e.currentTarget as HTMLElement).style.boxShadow = "none";
                              (e.currentTarget as HTMLElement).style.transform = "";
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size variants */}
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-6"
                        style={{ color: "#888" }}
                      >
                        Size variants — hard shadow scales with size
                      </p>
                      <div className="flex flex-wrap gap-6 items-center">
                        {[
                          { label: "XS", pad: "px-4 py-2 text-xs", shadow: "4px 4px 0px" },
                          { label: "SM", pad: "px-6 py-3 text-xs", shadow: "5px 5px 0px" },
                          { label: "MD", pad: "px-8 py-4 text-sm", shadow: "6px 6px 0px" },
                          { label: "LG", pad: "px-10 py-5 text-base", shadow: "8px 8px 0px" },
                        ].map(({ label, pad, shadow }) => (
                          <button
                            key={label}
                            className={`${pad} font-bold uppercase tracking-widest transition-all duration-150 ease-out hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0`}
                            style={{
                              backgroundColor: COLOR_PRIMARY,
                              color: COLOR_SECONDARY,
                              boxShadow: `${shadow} ${COLOR_ACCENT_RED}`,
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "";
                            }}
                            onMouseDown={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            }}
                            onMouseUp={(e) => {
                              (e.currentTarget as HTMLElement).style.boxShadow = `${shadow} ${COLOR_ACCENT_RED}`;
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="p-10">
                  {/* Asymmetric 3-column card grid — different spans */}
                  <div
                    className="grid gap-0"
                    style={{
                      gridTemplateColumns: "2fr 1fr 1.5fr",
                      border: `2px solid ${COLOR_PRIMARY}`,
                    }}
                  >
                    {/* Card 1 — tall feature card, row-span 2 */}
                    <div
                      className="group relative overflow-hidden cursor-pointer transition-all duration-250 ease-out"
                      style={{
                        borderRight: `2px solid ${COLOR_PRIMARY}`,
                        gridRow: "1 / 3",
                        padding: "40px",
                        backgroundColor: COLOR_PRIMARY,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "50";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `12px 12px 0px ${COLOR_ACCENT_RED}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "";
                        (e.currentTarget as HTMLElement).style.transform = "";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <span
                        className="inline-block text-xs uppercase tracking-widest px-3 py-1.5 mb-6 transition-all duration-200 group-hover:-translate-y-2"
                        style={{
                          backgroundColor: COLOR_ACCENT_RED,
                          color: COLOR_SECONDARY,
                          transitionDelay: "0ms",
                        }}
                      >
                        Featured
                      </span>
                      <h3
                        className="font-black uppercase leading-none mb-6 transition-transform duration-200 group-hover:translate-x-2"
                        style={{
                          fontSize: "clamp(28px, 4vw, 48px)",
                          color: COLOR_SECONDARY,
                          letterSpacing: "-0.02em",
                          transitionDelay: "75ms",
                        }}
                      >
                        Breaking
                        <br />
                        the Grid
                      </h3>
                      <p
                        className="text-sm leading-relaxed transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: "#999", transitionDelay: "100ms" }}
                      >
                        Asymmetry creates visual tension and dynamic spatial interest.
                        Elements escape their containers. Whitespace is a weapon.
                      </p>
                    </div>

                    {/* Card 2 — accent red */}
                    <div
                      className="group relative cursor-pointer transition-all duration-250 ease-out"
                      style={{
                        borderBottom: `2px solid ${COLOR_PRIMARY}`,
                        padding: "24px",
                        backgroundColor: COLOR_ACCENT_RED,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "50";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.04) translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_PRIMARY}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "";
                        (e.currentTarget as HTMLElement).style.transform = "";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <span
                        className="text-xs uppercase tracking-widest transition-all duration-200 group-hover:-translate-y-1 inline-block"
                        style={{ color: "#ffcccc" }}
                      >
                        Layout
                      </span>
                      <p
                        className="text-2xl font-black uppercase mt-2 leading-tight transition-all duration-200 group-hover:translate-x-2"
                        style={{ color: COLOR_SECONDARY, transitionDelay: "75ms" }}
                      >
                        Overlap
                        <br />
                        &amp; Layer
                      </p>
                    </div>

                    {/* Card 3 — yellow */}
                    <div
                      className="group relative cursor-pointer transition-all duration-250 ease-out"
                      style={{
                        borderLeft: `2px solid ${COLOR_PRIMARY}`,
                        borderBottom: `2px solid ${COLOR_PRIMARY}`,
                        padding: "24px",
                        backgroundColor: COLOR_ACCENT_YELLOW,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "50";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.04) translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_PRIMARY}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "";
                        (e.currentTarget as HTMLElement).style.transform = "";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <span
                        className="text-xs uppercase tracking-widest inline-block transition-all duration-200 group-hover:-translate-y-1"
                        style={{ color: "#888" }}
                      >
                        Typography
                      </span>
                      <p
                        className="text-2xl font-black uppercase mt-2 leading-tight transition-all duration-200 group-hover:translate-x-2"
                        style={{ color: COLOR_PRIMARY, transitionDelay: "75ms" }}
                      >
                        Scale
                        <br />
                        Contrast
                      </p>
                    </div>

                    {/* Card 4 — white, spans 2 */}
                    <div
                      className="group relative cursor-pointer transition-all duration-250 ease-out"
                      style={{
                        borderLeft: `2px solid ${COLOR_PRIMARY}`,
                        gridColumn: "2 / 4",
                        padding: "32px",
                        backgroundColor: COLOR_SECONDARY,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "50";
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.02) translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_ACCENT_RED}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.zIndex = "";
                        (e.currentTarget as HTMLElement).style.transform = "";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      <span
                        className="text-xs uppercase tracking-widest inline-block transition-all duration-200 group-hover:-translate-y-1"
                        style={{ color: "#888" }}
                      >
                        Interaction
                      </span>
                      <p
                        className="text-xl font-black uppercase mt-2 leading-tight transition-all duration-200 group-hover:translate-x-2"
                        style={{ color: COLOR_PRIMARY, transitionDelay: "75ms" }}
                      >
                        Hard Shadow &mdash; Physical Escape &mdash; z-index: 50
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="p-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      {/* Offset-label input — from component code */}
                      <div className="relative">
                        <label
                          className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-widest"
                          style={{
                            backgroundColor: COLOR_SECONDARY,
                            color: COLOR_PRIMARY,
                          }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-4 bg-transparent transition-all duration-200 ease-out"
                          placeholder="your@email.com"
                          style={{
                            border: `2px solid ${COLOR_PRIMARY}`,
                            color: COLOR_PRIMARY,
                            outline: "none",
                          }}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = COLOR_ACCENT_RED;
                            (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${COLOR_ACCENT_RED}`;
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = COLOR_PRIMARY;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div className="relative">
                        <label
                          className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-widest"
                          style={{
                            backgroundColor: COLOR_SECONDARY,
                            color: COLOR_PRIMARY,
                          }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-4 bg-transparent transition-all duration-200 ease-out"
                          placeholder="Your full name"
                          style={{
                            border: `2px solid ${COLOR_PRIMARY}`,
                            color: COLOR_PRIMARY,
                            outline: "none",
                          }}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = COLOR_ACCENT_BLUE;
                            (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${COLOR_ACCENT_BLUE}`;
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = COLOR_PRIMARY;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div className="relative">
                        <label
                          className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-widest"
                          style={{
                            backgroundColor: COLOR_SECONDARY,
                            color: COLOR_PRIMARY,
                          }}
                        >
                          Message
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-4 bg-transparent transition-all duration-200 ease-out resize-none"
                          placeholder="Say something..."
                          style={{
                            border: `2px solid ${COLOR_PRIMARY}`,
                            color: COLOR_PRIMARY,
                            outline: "none",
                          }}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = COLOR_ACCENT_YELLOW;
                            (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${COLOR_ACCENT_YELLOW}`;
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = COLOR_PRIMARY;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <p className="text-xs uppercase tracking-widest" style={{ color: "#888" }}>
                        Focus states: each field reveals a different accent shadow
                      </p>
                      <div
                        className="p-6"
                        style={{
                          backgroundColor: "#f5f5f5",
                          border: `2px solid ${COLOR_PRIMARY}`,
                        }}
                      >
                        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#888" }}>
                          Focus rules
                        </p>
                        {[
                          { label: "Email field", accent: COLOR_ACCENT_RED },
                          { label: "Name field", accent: COLOR_ACCENT_BLUE },
                          { label: "Message field", accent: COLOR_ACCENT_YELLOW },
                        ].map(({ label, accent }) => (
                          <div key={label} className="flex items-center gap-3 mb-2">
                            <div
                              className="w-4 h-4 shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            <span className="text-xs" style={{ color: COLOR_PRIMARY }}>
                              {label} &rarr; {accent}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        className="w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-150 ease-out hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
                        style={{
                          backgroundColor: COLOR_PRIMARY,
                          color: COLOR_SECONDARY,
                          boxShadow: `6px 6px 0px ${COLOR_ACCENT_RED}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${COLOR_ACCENT_RED}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_RED}`;
                          (e.currentTarget as HTMLElement).style.transform = "";
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.transform = "translate(6px, 6px)";
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_RED}`;
                          (e.currentTarget as HTMLElement).style.transform = "";
                        }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. AI RULES INTERACTIVE DEMO                                     */}
      {/* ================================================================ */}
      <section id="rules" className="py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <div className="md:grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-7">
                <span
                  className="block text-xs uppercase tracking-widest mb-3"
                  style={{ color: COLOR_ACCENT_RED }}
                >
                  Section 04 — Interaction Principles
                </span>
                <h2
                  className="font-black uppercase leading-none"
                  style={{
                    fontSize: "clamp(32px, 5vw, 64px)",
                    letterSpacing: "-0.03em",
                    color: COLOR_PRIMARY,
                  }}
                >
                  4 AI Rules
                  <br />
                  <span style={{ color: COLOR_ACCENT_RED }}>Live Demo</span>
                </h2>
              </div>
              <div className="md:col-span-5 mt-4 md:mt-0">
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                  Click or hover each card to experience the named rule in action.
                  These govern every component generated by the AI rule system.
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* 4 rule cards — intentionally asymmetric layout */}
          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: "repeat(12, 1fr)",
              border: `2px solid ${COLOR_PRIMARY}`,
            }}
          >
            {/* ---- Rule 1: Spatial Tension ---- */}
            <div style={{ gridColumn: "1 / 6" }}>
            <RevealBlock
              delay={0}
              className="md:col-span-5"
            >
              <div
                className="h-full"
                style={{
                  borderRight: `2px solid ${COLOR_PRIMARY}`,
                  borderBottom: `2px solid ${COLOR_PRIMARY}`,
                  padding: "40px",
                  backgroundColor: COLOR_SECONDARY,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{
                    opacity: 0.6,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: COLOR_PRIMARY,
                  }}
                >
                  <span
                    className="px-2 py-1 font-bold"
                    style={{ backgroundColor: COLOR_PRIMARY, color: COLOR_SECONDARY }}
                  >
                    RULE 01
                  </span>
                  Spatial Tension
                </div>
                <h3
                  className="font-black uppercase mb-3 leading-none"
                  style={{ fontSize: "24px", letterSpacing: "-0.02em", color: COLOR_PRIMARY }}
                >
                  Spatial Tension
                </h3>
                <p className="text-xs leading-relaxed mb-8" style={{ color: "#666" }}>
                  Hover each card below — watch it jump to z-50, scale up, and escape the grid.
                  Click a card to lock its elevated state.
                </p>

                {/* Demo: overlapping card cluster */}
                <div className="relative" style={{ height: "200px" }}>
                  {[
                    { label: "A", left: "0%", top: "10%", accent: COLOR_ACCENT_RED, zBase: 3 },
                    { label: "B", left: "20%", top: "30%", accent: COLOR_ACCENT_BLUE, zBase: 2 },
                    { label: "C", left: "40%", top: "5%", accent: COLOR_ACCENT_YELLOW, zBase: 1 },
                  ].map((card, idx) => {
                    const isActive = spatialCard === idx;
                    return (
                      <div
                        key={card.label}
                        className="absolute cursor-pointer transition-all duration-200 ease-out"
                        style={{
                          left: card.left,
                          top: card.top,
                          width: "120px",
                          height: "120px",
                          backgroundColor: isActive ? card.accent : COLOR_SECONDARY,
                          border: `2px solid ${COLOR_PRIMARY}`,
                          zIndex: isActive ? 50 : card.zBase,
                          transform: isActive ? "scale(1.12) translate(-4px, -8px)" : "scale(1)",
                          boxShadow: isActive ? `8px 8px 0px ${COLOR_PRIMARY}` : "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                        onMouseEnter={(e) => {
                          if (spatialCard !== idx) {
                            (e.currentTarget as HTMLElement).style.zIndex = "40";
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.08) translate(-2px, -4px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${card.accent}`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (spatialCard !== idx) {
                            (e.currentTarget as HTMLElement).style.zIndex = String(card.zBase);
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }
                        }}
                        onClick={() => setSpatialCard(spatialCard === idx ? null : idx)}
                      >
                        <span
                          className="text-2xl font-black"
                          style={{ color: isActive ? COLOR_SECONDARY : COLOR_PRIMARY }}
                        >
                          {card.label}
                        </span>
                        <span
                          className="text-xs uppercase tracking-widest"
                          style={{ color: isActive ? COLOR_SECONDARY : "#888" }}
                        >
                          {isActive ? "z-50" : `z-${card.zBase}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs mt-4" style={{ color: "#888" }}>
                  {spatialCard !== null
                    ? `Card ${["A", "B", "C"][spatialCard]} is now at z-50 — click again to reset`
                    : "Hover or click a card to see spatial escape"}
                </p>
              </div>
            </RevealBlock>
            </div>

            {/* ---- Rule 2: Hard Popping ---- */}
            <div style={{ gridColumn: "6 / 13" }}>
            <RevealBlock
              delay={0.08}
              className="md:col-span-7"
            >
              <div
                className="h-full"
                style={{
                  borderBottom: `2px solid ${COLOR_PRIMARY}`,
                  padding: "40px",
                  backgroundColor: COLOR_PRIMARY,
                  position: "relative",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#666",
                  }}
                >
                  <span
                    className="px-2 py-1 font-bold"
                    style={{ backgroundColor: COLOR_ACCENT_RED, color: COLOR_SECONDARY }}
                  >
                    RULE 02
                  </span>
                  Hard Popping
                </div>
                <h3
                  className="font-black uppercase mb-3 leading-none"
                  style={{ fontSize: "24px", letterSpacing: "-0.02em", color: COLOR_SECONDARY }}
                >
                  Hard Popping
                </h3>
                <p className="text-xs leading-relaxed mb-8" style={{ color: "#888" }}>
                  ease-out + duration-200/300 + high-contrast hard shadow (8px 8px 0px color).
                  Click the button below to trigger the pop:
                </p>

                <div className="flex flex-col gap-6 items-start">
                  <button
                    className="px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all duration-200 ease-out"
                    style={{
                      backgroundColor: hardPopActive ? COLOR_ACCENT_RED : COLOR_SECONDARY,
                      color: hardPopActive ? COLOR_SECONDARY : COLOR_PRIMARY,
                      boxShadow: hardPopActive
                        ? `0 0 0 ${COLOR_ACCENT_RED}`
                        : `8px 8px 0px ${COLOR_ACCENT_RED}`,
                      transform: hardPopActive ? "translate(8px, 8px)" : "translate(-2px, -2px)",
                    }}
                    onMouseDown={() => setHardPopActive(true)}
                    onMouseUp={() => setHardPopActive(false)}
                    onMouseLeave={() => setHardPopActive(false)}
                  >
                    {hardPopActive ? "PRESSED" : "Click & Hold Me"}
                  </button>

                  <div
                    className="p-4 text-xs font-mono"
                    style={{
                      border: `1px solid #333`,
                      color: "#888",
                      maxWidth: "320px",
                    }}
                  >
                    <span style={{ color: COLOR_ACCENT_YELLOW }}>shadow:</span>{" "}
                    <span style={{ color: COLOR_ACCENT_BLUE }}>
                      {hardPopActive ? "0 0 0 transparent" : "8px 8px 0px #ff3366"}
                    </span>
                    <br />
                    <span style={{ color: COLOR_ACCENT_YELLOW }}>translate:</span>{" "}
                    <span style={{ color: COLOR_ACCENT_BLUE }}>
                      {hardPopActive ? "(8px, 8px)" : "(-2px, -2px)"}
                    </span>
                    <br />
                    <span style={{ color: COLOR_ACCENT_YELLOW }}>duration:</span>{" "}
                    <span style={{ color: COLOR_ACCENT_RED }}>200ms ease-out</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
            </div>

            {/* ---- Rule 3: Parallax Content ---- */}
            <div style={{ gridColumn: "1 / 8" }}>
            <RevealBlock
              delay={0.14}
              className="md:col-span-7"
            >
              <div
                className="h-full"
                style={{
                  borderRight: `2px solid ${COLOR_PRIMARY}`,
                  padding: "40px",
                  backgroundColor: "#f5f5f5",
                  position: "relative",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#888",
                  }}
                >
                  <span
                    className="px-2 py-1 font-bold"
                    style={{ backgroundColor: COLOR_ACCENT_BLUE, color: COLOR_PRIMARY }}
                  >
                    RULE 03
                  </span>
                  Parallax Content
                </div>
                <h3
                  className="font-black uppercase mb-3 leading-none"
                  style={{ fontSize: "24px", letterSpacing: "-0.02em", color: COLOR_PRIMARY }}
                >
                  Parallax Content
                </h3>
                <p className="text-xs leading-relaxed mb-8" style={{ color: "#666" }}>
                  Card internals shift at different delays (0ms, 75ms, 100ms) creating
                  a parallax offset illusion. Hover the card:
                </p>

                {/* The parallax card demo */}
                <div
                  className="cursor-pointer transition-all duration-250 ease-out"
                  style={{
                    border: `2px solid ${COLOR_PRIMARY}`,
                    padding: "32px",
                    backgroundColor: COLOR_SECONDARY,
                    transform: parallaxHovered ? "scale(1.03) translateY(-6px)" : "scale(1)",
                    boxShadow: parallaxHovered ? `8px 8px 0px ${COLOR_ACCENT_RED}` : "none",
                    zIndex: parallaxHovered ? 50 : 1,
                    position: "relative",
                  }}
                  onMouseEnter={() => setParallaxHovered(true)}
                  onMouseLeave={() => setParallaxHovered(false)}
                >
                  {/* Tag — shifts earliest */}
                  <span
                    className="inline-block text-xs uppercase tracking-widest px-3 py-1.5 mb-4 font-bold"
                    style={{
                      backgroundColor: "#f5f5f5",
                      color: "#888",
                      transform: parallaxHovered ? "translateY(-8px)" : "translateY(0)",
                      transition: "transform 0.3s ease-out 0ms, background-color 0.3s ease-out",
                      ...(parallaxHovered
                        ? { backgroundColor: COLOR_ACCENT_RED, color: COLOR_SECONDARY }
                        : {}),
                    }}
                  >
                    Portfolio
                  </span>
                  {/* Title — shifts with delay-75 */}
                  <h4
                    className="font-black uppercase leading-tight mb-3"
                    style={{
                      fontSize: "22px",
                      color: COLOR_PRIMARY,
                      transform: parallaxHovered ? "translateX(8px)" : "translateX(0)",
                      transition: "transform 0.3s ease-out 75ms",
                    }}
                  >
                    Creative Direction
                  </h4>
                  {/* Description — shifts with delay-100 */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#666",
                      transform: parallaxHovered ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.3s ease-out 100ms",
                    }}
                  >
                    Each internal element moves at its own pace, creating a layered
                    depth that feels spatial and alive.
                  </p>
                  <div
                    className="absolute top-3 right-3 text-xs font-mono"
                    style={{ color: "#ccc" }}
                  >
                    {parallaxHovered ? "delay: 0/75/100ms" : "hover me"}
                  </div>
                </div>
              </div>
            </RevealBlock>
            </div>

            {/* ---- Rule 4: Physical Feedback ---- */}
            <div style={{ gridColumn: "8 / 13" }}>
            <RevealBlock
              delay={0.2}
              className="md:col-span-5"
            >
              <div
                className="h-full"
                style={{
                  padding: "40px",
                  backgroundColor: COLOR_ACCENT_YELLOW,
                  position: "relative",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#888",
                  }}
                >
                  <span
                    className="px-2 py-1 font-bold"
                    style={{ backgroundColor: COLOR_PRIMARY, color: COLOR_SECONDARY }}
                  >
                    RULE 04
                  </span>
                  Physical Feedback
                </div>
                <h3
                  className="font-black uppercase mb-3 leading-none"
                  style={{ fontSize: "24px", letterSpacing: "-0.02em", color: COLOR_PRIMARY }}
                >
                  Physical
                  <br />
                  Feedback
                </h3>
                <p className="text-xs leading-relaxed mb-8" style={{ color: "#555" }}>
                  active state zeros translate + shadow, simulating physical press. Hold the button:
                </p>

                <div className="space-y-4">
                  <button
                    className="block w-full py-5 font-bold uppercase tracking-widest text-sm transition-all duration-150 ease-out"
                    style={{
                      backgroundColor: COLOR_PRIMARY,
                      color: COLOR_SECONDARY,
                      boxShadow: physicalPressed ? "none" : `6px 6px 0px #888`,
                      transform: physicalPressed ? "translate(6px, 6px)" : "translate(0, 0)",
                    }}
                    onMouseDown={() => setPhysicalPressed(true)}
                    onMouseUp={() => setPhysicalPressed(false)}
                    onMouseLeave={() => setPhysicalPressed(false)}
                  >
                    {physicalPressed ? "PRESSED IN" : "Press & Hold"}
                  </button>
                  <div
                    className="p-3 text-xs font-mono"
                    style={{
                      border: `1px solid #bbb`,
                      backgroundColor: "rgba(255,255,255,0.5)",
                      color: "#555",
                    }}
                  >
                    active: translate({physicalPressed ? "6px, 6px" : "0, 0"})<br />
                    active: shadow: {physicalPressed ? "none" : "6px 6px 0px #888"}
                  </div>
                </div>
              </div>
            </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. ASYMMETRIC LAYOUT SHOWCASE                                    */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-6 md:px-16"
        style={{ backgroundColor: COLOR_PRIMARY }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <span
              className="block text-xs uppercase tracking-widest mb-4"
              style={{ color: COLOR_ACCENT_RED }}
            >
              Section 05 — Layout System
            </span>
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                letterSpacing: "-0.03em",
                color: COLOR_SECONDARY,
              }}
            >
              Asymmetric
              <br />
              <span style={{ color: COLOR_ACCENT_YELLOW }}>Grid Layouts</span>
            </h2>
          </RevealBlock>

          {/* Layout example 1: 8+4 with offset element */}
          <RevealBlock delay={0.05} className="mb-8">
            <div
              className="grid md:grid-cols-12 gap-0 relative"
              style={{ border: `2px solid #333` }}
            >
              <div
                className="md:col-span-8 p-12 flex flex-col justify-between"
                style={{ borderRight: `2px solid #333`, minHeight: "300px" }}
              >
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#555" }}
                >
                  Grid: 8 + 4 cols
                </span>
                <div>
                  <h3
                    className="font-black uppercase leading-none mb-4"
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      color: COLOR_SECONDARY,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Wide Content
                    <br />
                    <span style={{ color: COLOR_ACCENT_RED }}>Dominant Column</span>
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
                    The 8-column dominant side holds primary content. The 4-column
                    side is a narrow accent — never equal, always unbalanced.
                  </p>
                </div>
              </div>
              <div
                className="md:col-span-4 flex flex-col"
                style={{ backgroundColor: COLOR_ACCENT_RED }}
              >
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div
                      className="text-5xl font-black"
                      style={{ color: COLOR_SECONDARY }}
                    >
                      8:4
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest mt-2"
                      style={{ color: "#ffcccc" }}
                    >
                      Column ratio
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Layout example 2: 3-col irregular */}
          <RevealBlock delay={0.1} className="mb-8">
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: "1fr 3fr 2fr",
                border: `2px solid #333`,
              }}
            >
              <div
                className="p-8 flex items-center justify-center"
                style={{
                  backgroundColor: COLOR_ACCENT_YELLOW,
                  borderRight: `2px solid #333`,
                  minHeight: "200px",
                  writingMode: "vertical-rl",
                }}
              >
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: COLOR_PRIMARY, transform: "rotate(180deg)" }}
                >
                  1fr column
                </span>
              </div>
              <div
                className="p-10"
                style={{ borderRight: `2px solid #333` }}
              >
                <span className="text-xs uppercase tracking-widest" style={{ color: "#555" }}>
                  3fr — wide center
                </span>
                <p
                  className="mt-4 font-black uppercase leading-none"
                  style={{
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: COLOR_SECONDARY,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Variable
                  <br />
                  <span style={{ color: COLOR_ACCENT_BLUE }}>Column Widths</span>
                </p>
              </div>
              <div
                className="p-8 flex items-end"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <span className="text-xs uppercase tracking-widest" style={{ color: "#555" }}>
                  2fr narrow right
                </span>
              </div>
            </div>
          </RevealBlock>

          {/* Layout example 3: masonry-style with overlap hint */}
          <RevealBlock delay={0.15}>
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 2fr",
                border: `2px solid #333`,
              }}
            >
              {[
                { label: "2fr", height: "160px", bg: "#1a1a1a", accent: COLOR_ACCENT_RED, span: 1 },
                { label: "1fr", height: "100px", bg: COLOR_ACCENT_RED, accent: COLOR_SECONDARY, span: 1 },
                { label: "1fr", height: "100px", bg: "#111", accent: COLOR_ACCENT_YELLOW, span: 1 },
                { label: "2fr", height: "160px", bg: COLOR_ACCENT_BLUE, accent: COLOR_PRIMARY, span: 1 },
              ].map((cell, i) => (
                <div
                  key={i}
                  className="flex items-end p-6"
                  style={{
                    height: cell.height,
                    backgroundColor: cell.bg,
                    borderRight: i < 3 ? `2px solid #333` : "none",
                  }}
                >
                  <span
                    className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: cell.accent }}
                  >
                    {cell.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ================================================================ */}
      <section id="do---don-t" className="py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <div className="md:grid md:grid-cols-12 gap-6">
              <div className="md:col-span-8">
                <span
                  className="block text-xs uppercase tracking-widest mb-3"
                  style={{ color: COLOR_ACCENT_RED }}
                >
                  Section 06
                </span>
                <h2
                  className="font-black uppercase leading-none"
                  style={{
                    fontSize: "clamp(32px, 5vw, 64px)",
                    letterSpacing: "-0.03em",
                    color: COLOR_PRIMARY,
                  }}
                >
                  Design Rules
                  <br />
                  <span style={{ color: COLOR_ACCENT_RED }}>Do / Don&apos;t</span>
                </h2>
              </div>
            </div>
          </RevealBlock>

          <div className="md:grid md:grid-cols-2 gap-0" style={{ border: `2px solid ${COLOR_PRIMARY}` }}>
            {/* Do list */}
            <RevealBlock delay={0.05}>
              <div
                className="p-10 h-full"
                style={{ borderRight: `2px solid ${COLOR_PRIMARY}` }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-8 h-8 flex items-center justify-center font-black text-sm"
                    style={{ backgroundColor: COLOR_PRIMARY, color: COLOR_SECONDARY }}
                  >
                    DO
                  </div>
                  <h3
                    className="font-black uppercase text-lg"
                    style={{ color: COLOR_PRIMARY }}
                  >
                    Required Patterns
                  </h3>
                </div>
                <ul className="space-y-4">
                  {doList.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 group cursor-default"
                    >
                      <div
                        className="mt-1 w-5 h-5 shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-150 group-hover:scale-110"
                        style={{
                          backgroundColor: i % 2 === 0 ? COLOR_ACCENT_RED : COLOR_PRIMARY,
                          color: COLOR_SECONDARY,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span
                        className="text-sm leading-relaxed transition-all duration-150 group-hover:translate-x-1"
                        style={{ color: "#444" }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.1}>
              <div
                className="p-10 h-full"
                style={{ backgroundColor: COLOR_PRIMARY }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-8 h-8 flex items-center justify-center font-black text-sm"
                    style={{ backgroundColor: COLOR_ACCENT_RED, color: COLOR_SECONDARY }}
                  >
                    NO
                  </div>
                  <h3
                    className="font-black uppercase text-lg"
                    style={{ color: COLOR_SECONDARY }}
                  >
                    Forbidden Patterns
                  </h3>
                </div>
                <ul className="space-y-4">
                  {dontList.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 group cursor-default"
                    >
                      <div
                        className="mt-1 w-5 h-5 shrink-0 flex items-center justify-center transition-all duration-150 group-hover:scale-110"
                        style={{
                          backgroundColor: "#333",
                          color: COLOR_ACCENT_RED,
                          fontSize: "14px",
                          fontWeight: "900",
                        }}
                      >
                        &times;
                      </div>
                      <span
                        className="text-sm leading-relaxed transition-all duration-150 group-hover:translate-x-1"
                        style={{ color: "#999" }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Philosophy quote */}
                <div
                  className="mt-10 p-6"
                  style={{
                    borderTop: `2px solid #333`,
                    borderLeft: `4px solid ${COLOR_ACCENT_RED}`,
                  }}
                >
                  <p className="text-xs leading-relaxed italic" style={{ color: "#888" }}>
                    &ldquo;打破传统网格的均匀分布，通过不等宽列、
                    元素重叠和留白对比创造视觉张力。&rdquo;
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest mt-2 font-bold"
                    style={{ color: COLOR_ACCENT_RED }}
                  >
                    Asymmetric Grid Philosophy
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. PHILOSOPHY FEATURE HIGHLIGHTS                                 */}
      {/* ================================================================ */}
      <section
        className="py-20 md:py-28 px-6 md:px-16"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <span
              className="block text-xs uppercase tracking-widest mb-3"
              style={{ color: COLOR_ACCENT_RED }}
            >
              Section 07 — Core Principles
            </span>
            <h2
              className="font-black uppercase leading-none"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                letterSpacing: "-0.03em",
                color: COLOR_PRIMARY,
              }}
            >
              Design
              <br />
              <span style={{ color: COLOR_ACCENT_RED }}>Philosophy</span>
            </h2>
          </RevealBlock>

          {/* Asymmetric principle cards — 5+4+3 col widths */}
          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: "5fr 4fr 3fr",
              border: `2px solid ${COLOR_PRIMARY}`,
            }}
          >
            {[
              {
                number: "01",
                title: "Break Symmetry",
                titleZh: "打破对称",
                desc: "Intentionally use unequal column widths. Every layout must feel dynamically off-balance, never perfectly centered.",
                bg: COLOR_SECONDARY,
                accent: COLOR_ACCENT_RED,
              },
              {
                number: "02",
                title: "Visual Tension",
                titleZh: "视觉张力",
                desc: "Large-small contrast and positional offset create kinetic energy. Static and dynamic zones must coexist.",
                bg: COLOR_PRIMARY,
                accent: COLOR_ACCENT_YELLOW,
              },
              {
                number: "03",
                title: "Whitespace as Content",
                titleZh: "留白即内容",
                desc: "Generous empty zones amplify dense zones. The contrast between empty and full is a design tool.",
                bg: COLOR_ACCENT_RED,
                accent: COLOR_SECONDARY,
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.number} delay={i * 0.1}>
                <div
                  className="p-10 h-full group cursor-default transition-all duration-200"
                  style={{
                    backgroundColor: principle.bg,
                    borderRight: i < 2 ? `2px solid ${COLOR_PRIMARY}` : "none",
                    minHeight: "360px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 -4px 0 ${principle.accent}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="text-6xl font-black leading-none mb-6"
                    style={{ color: principle.accent, opacity: 0.3 }}
                  >
                    {principle.number}
                  </div>
                  <h4
                    className="font-black uppercase leading-none mb-2"
                    style={{
                      fontSize: "20px",
                      color: principle.accent,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {principle.title}
                  </h4>
                  <p
                    className="text-xs uppercase tracking-widest mb-6"
                    style={{ color: principle.accent, opacity: 0.6 }}
                  >
                    {principle.titleZh}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: principle.accent, opacity: 0.75 }}
                  >
                    {principle.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Remaining principles as a wide strip */}
          <RevealBlock delay={0.2}>
            <div
              className="grid md:grid-cols-2 gap-0 mt-0"
              style={{ border: `2px solid ${COLOR_PRIMARY}`, borderTop: "none" }}
            >
              {[
                {
                  number: "04",
                  title: "Layer Overlap",
                  titleZh: "层次重叠",
                  desc: "Allow elements to overlap using z-index. Depth is achieved through stacking, not shadow alone.",
                  accent: COLOR_ACCENT_BLUE,
                },
                {
                  number: "05",
                  title: "Spatial Escape",
                  titleZh: "空间突围",
                  desc: "On hover, elements break their grid cell with scale + z-50 + translate. They escape the structure.",
                  accent: COLOR_ACCENT_RED,
                },
              ].map((principle, i) => (
                <div
                  key={principle.number}
                  className="p-8 group cursor-default transition-all duration-200"
                  style={{
                    borderRight: i === 0 ? `2px solid ${COLOR_PRIMARY}` : "none",
                    backgroundColor: "#f5f5f5",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = COLOR_PRIMARY;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#f5f5f5";
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-2xl font-black"
                      style={{ color: principle.accent }}
                    >
                      {principle.number}
                    </span>
                    <div>
                      <h4
                        className="font-black uppercase text-sm leading-tight transition-colors duration-200"
                        style={{ color: COLOR_PRIMARY }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = principle.accent;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = COLOR_PRIMARY;
                        }}
                      >
                        {principle.title}
                        <span
                          className="ml-2 text-xs font-normal uppercase tracking-widest"
                          style={{ color: "#888" }}
                        >
                          {principle.titleZh}
                        </span>
                      </h4>
                      <p className="text-xs leading-relaxed mt-1" style={{ color: "#666" }}>
                        {principle.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer style={{ backgroundColor: COLOR_PRIMARY, borderTop: `2px solid ${COLOR_ACCENT_RED}` }}>
        {/* Top strip */}
        <div
          className="grid md:grid-cols-12 gap-0"
          style={{ borderBottom: `2px solid #333` }}
        >
          <div
            className="md:col-span-8 px-12 py-10"
            style={{ borderRight: `2px solid #333` }}
          >
            {/* Brand */}
            <div className="flex items-baseline gap-0 mb-4">
              <span
                className="text-3xl font-black uppercase"
                style={{ color: COLOR_SECONDARY, letterSpacing: "-0.04em" }}
              >
                ASYMM
              </span>
              <span
                className="text-3xl font-black"
                style={{ color: COLOR_ACCENT_RED }}
              >
                .
              </span>
              <span
                className="text-xs uppercase tracking-widest self-end mb-1 ml-2"
                style={{ color: COLOR_ACCENT_BLUE }}
              >
                GRID
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#666" }}>
              A layout design system that treats visual tension as its primary design
              material. Unequal columns, hard shadows, brutal hover states.
            </p>

            {/* Color dot row */}
            <div className="flex gap-3 mt-6">
              {[
                { bg: COLOR_PRIMARY, border: `2px solid #444` },
                { bg: COLOR_SECONDARY, border: "none" },
                { bg: COLOR_ACCENT_RED, border: "none" },
                { bg: COLOR_ACCENT_BLUE, border: "none" },
                { bg: COLOR_ACCENT_YELLOW, border: "none" },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="w-6 h-6 transition-all duration-150 hover:scale-125 cursor-default"
                  style={{
                    backgroundColor: dot.bg,
                    border: dot.border || "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="md:col-span-4 px-10 py-10">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span
                  className="block text-xs uppercase tracking-widest mb-4 font-bold"
                  style={{ color: COLOR_ACCENT_RED }}
                >
                  Style
                </span>
                <div className="space-y-2">
                  <Link
                    href="/styles/asymmetric-grid"
                    className="block text-sm transition-colors duration-150 hover:text-white"
                    style={{ color: "#666" }}
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/styles/asymmetric-grid/showcase"
                    className="block text-sm transition-colors duration-150 hover:text-white"
                    style={{ color: "#666" }}
                  >
                    Showcase
                  </Link>
                  <Link
                    href="/styles/asymmetric-grid/cover"
                    className="block text-sm transition-colors duration-150 hover:text-white"
                    style={{ color: "#666" }}
                  >
                    Cover
                  </Link>
                </div>
              </div>
              <div>
                <span
                  className="block text-xs uppercase tracking-widest mb-4 font-bold"
                  style={{ color: COLOR_ACCENT_YELLOW }}
                >
                  StyleKit
                </span>
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block text-sm transition-colors duration-150 hover:text-white"
                    style={{ color: "#666" }}
                  >
                    Home
                  </Link>
                  <Link
                    href="/styles"
                    className="block text-sm transition-colors duration-150 hover:text-white"
                    style={{ color: "#666" }}
                  >
                    All Styles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between px-12 py-6 gap-4"
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest" style={{ color: "#555" }}>
            <span>Built for</span>
            <span style={{ color: COLOR_ACCENT_RED, fontWeight: 900 }}>StyleKit</span>
            <span>&mdash;</span>
            <span>Asymmetric Grid System</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-150 ease-out hover:-translate-x-1 hover:-translate-y-1"
            style={{
              backgroundColor: COLOR_ACCENT_RED,
              color: COLOR_SECONDARY,
              boxShadow: `4px 4px 0px ${COLOR_ACCENT_YELLOW}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0px ${COLOR_ACCENT_YELLOW}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0px ${COLOR_ACCENT_YELLOW}`;
              (e.currentTarget as HTMLElement).style.transform = "";
            }}
          >
            &larr; Back to StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}
