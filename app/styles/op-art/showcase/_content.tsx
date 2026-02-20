"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView() {
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
      { threshold: 0.15 }
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

const PALETTE = [
  { name: "Pure Black", hex: "#000000", textClass: "text-white" },
  { name: "Pure White", hex: "#ffffff", textClass: "text-black", border: true },
  { name: "Vibrant Red", hex: "#ff3300", textClass: "text-white" },
  { name: "Electric Blue", hex: "#0066ff", textClass: "text-white" },
  { name: "Bright Yellow", hex: "#ffcc00", textClass: "text-black" },
];

const DO_RULES = [
  "Pure black-white high contrast as the foundational palette",
  "Geometric pattern elements as structural decorations — concentric circles, stripes, checkerboards",
  "Vibrating color pairs as accents: red/blue/yellow on black-white fields",
  "Inline SVG optical illusion patterns embedded directly in components",
  "Sharp rounded-none for all containers — no soft edges",
  "font-mono or font-black for stark geometric feel throughout",
  "High-contrast hover: background flips black to white, white to black",
  "repeating-linear-gradient CSS pattern backgrounds for texture",
];

const DONT_RULES = [
  "No gradients except as part of deliberate optical illusion effects",
  "No soft colors, pastels, or muted tones of any kind",
  "No organic or curved shapes — only strict geometry",
  "No decorative, display, or script fonts — geometry only",
  "No drop shadows or box shadows with offset",
  "No rounded corners — rounded-none everywhere, no exceptions",
];

const PATTERN_TABS = ["STRIPES", "CIRCLES", "CHECKERBOARD"] as const;
type PatternTab = (typeof PATTERN_TABS)[number];

const TYPOGRAPHY_ROWS = [
  { size: "clamp(80px,12vw,160px)", label: "DISPLAY / HERO", tracking: "tracking-tighter", sample: "OP ART", weight: "font-black" },
  { size: "clamp(48px,7vw,96px)", label: "SECTION HEAD", tracking: "tracking-tight", sample: "ILLUSION", weight: "font-black" },
  { size: "clamp(28px,4vw,48px)", label: "SUBHEADING", tracking: "tracking-tight", sample: "GEOMETRIC", weight: "font-bold" },
  { size: "20px", label: "BODY LARGE", tracking: "tracking-wide", sample: "Perception is the medium.", weight: "font-mono" },
  { size: "13px", label: "CAPTION / LABEL", tracking: "tracking-[0.4em]", sample: "BRIDGET RILEY — VICTOR VASARELY — 1965", weight: "font-mono" },
];

/* ------------------------------------------------------------------ */
/*  SVG Optical Illusions                                              */
/* ------------------------------------------------------------------ */

function ConcentricCirclesSVG({
  size = 320,
  rings = 18,
  stroke = "#000000",
  fill = "none",
  className = "",
}: {
  size?: number;
  rings?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 4;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <rect width={size} height={size} fill={fill === "none" ? "transparent" : fill} />
      {Array.from({ length: rings }, (_, i) => {
        const r = ((i + 1) / rings) * maxR;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth={i % 2 === 0 ? 3 : 1.5}
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}

function ZigzagStripeSVG({
  width = 400,
  height = 120,
  rows = 6,
  color1 = "#000000",
  color2 = "#ffffff",
  className = "",
}: {
  width?: number;
  height?: number;
  rows?: number;
  color1?: string;
  color2?: string;
  className?: string;
}) {
  const rowH = height / rows;
  const amplitude = rowH * 0.5;
  const wavelength = 40;
  const steps = Math.ceil(width / wavelength) + 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <rect width={width} height={height} fill={color2} />
      {Array.from({ length: rows }, (_, rowIdx) => {
        const baseY = rowIdx * rowH + rowH / 2;
        const offset = rowIdx % 2 === 0 ? 0 : wavelength / 2;
        const pts = Array.from({ length: steps }, (__, i) => {
          const x = i * wavelength - wavelength + offset;
          const y = i % 2 === 0 ? baseY - amplitude : baseY + amplitude;
          return `${x},${y}`;
        }).join(" ");
        return (
          <polyline
            key={rowIdx}
            points={pts}
            fill="none"
            stroke={color1}
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );
}

function RadiatingLinesSVG({
  size = 320,
  spokes = 36,
  stroke = "#000000",
  className = "",
}: {
  size?: number;
  spokes?: number;
  stroke?: string;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const innerR = size * 0.04;
  const outerR = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: spokes }, (_, i) => {
        const angle = (i / spokes) * Math.PI * 2;
        const x1 = cx + innerR * Math.cos(angle);
        const y1 = cy + innerR * Math.sin(angle);
        const x2 = cx + outerR * Math.cos(angle);
        const y2 = cy + outerR * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth={i % 3 === 0 ? 2 : 1}
            opacity={i % 2 === 0 ? 0.9 : 0.5}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={innerR} fill={stroke} />
    </svg>
  );
}

function CheckerboardSVG({
  width = 320,
  height = 160,
  cellSize = 20,
  color1 = "#000000",
  color2 = "#ffffff",
  className = "",
}: {
  width?: number;
  height?: number;
  cellSize?: number;
  color1?: string;
  color2?: string;
  className?: string;
}) {
  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <rect width={width} height={height} fill={color2} />
      {Array.from({ length: rows }, (_, rowIdx) =>
        Array.from({ length: cols }, (__, colIdx) => {
          if ((rowIdx + colIdx) % 2 !== 0) return null;
          return (
            <rect
              key={`${rowIdx}-${colIdx}`}
              x={colIdx * cellSize}
              y={rowIdx * cellSize}
              width={cellSize}
              height={cellSize}
              fill={color1}
            />
          );
        })
      )}
    </svg>
  );
}

function MoireWaveSVG({
  width = 400,
  height = 200,
  lines = 20,
  color = "#000000",
  className = "",
}: {
  width?: number;
  height?: number;
  lines?: number;
  color?: string;
  className?: string;
}) {
  const gap = height / lines;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: lines }, (_, i) => {
        const y = i * gap + gap / 2;
        const waveAmp = 6 + (i % 4) * 3;
        const freq = 0.04 + (i % 3) * 0.01;
        const points = Array.from({ length: 81 }, (__, j) => {
          const x = (j / 80) * width;
          const wave = Math.sin(x * freq + i * 0.4) * waveAmp;
          return `${x.toFixed(1)},${(y + wave).toFixed(1)}`;
        }).join(" ");
        return (
          <polyline
            key={i}
            points={points}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pattern Demo Panels                                                */
/* ------------------------------------------------------------------ */

function StripesPanel() {
  return (
    <div className="w-full">
      <div
        className="w-full h-48 rounded-none border-2 border-black"
        style={{
          background: "repeating-linear-gradient(45deg, #000000 0px, #000000 10px, #ffffff 10px, #ffffff 20px)",
        }}
      />
      <p className="mt-4 text-[11px] font-mono text-black/50 tracking-[0.3em] uppercase">
        repeating-linear-gradient(45deg, #000 10px, #fff 20px)
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div
          className="h-16 border-2 border-black"
          style={{
            background: "repeating-linear-gradient(0deg, #000000 0px, #000000 4px, #ffffff 4px, #ffffff 8px)",
          }}
        />
        <div
          className="h-16 border-2 border-black"
          style={{
            background: "repeating-linear-gradient(90deg, #000000 0px, #000000 6px, #ffffff 6px, #ffffff 12px)",
          }}
        />
        <div
          className="h-16 border-2 border-black"
          style={{
            background: "repeating-linear-gradient(45deg, #ff3300 0px, #ff3300 4px, #000000 4px, #000000 8px)",
          }}
        />
      </div>
      <div className="mt-4">
        <ZigzagStripeSVG width={520} height={96} rows={8} />
      </div>
    </div>
  );
}

function CirclesPanel() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center border-2 border-black p-4 bg-white">
          <ConcentricCirclesSVG size={200} rings={16} stroke="#000000" />
        </div>
        <div className="flex justify-center border-2 border-black p-4 bg-black">
          <ConcentricCirclesSVG size={200} rings={16} stroke="#ffffff" />
        </div>
      </div>
      <p className="mt-4 text-[11px] font-mono text-black/50 tracking-[0.3em] uppercase">
        Inline SVG concentric rings — alternating stroke weight 3px / 1.5px
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex justify-center border-2 border-black p-2 bg-white">
          <ConcentricCirclesSVG size={100} rings={10} stroke="#000000" />
        </div>
        <div className="flex justify-center border-2 border-black p-2 bg-[#ff3300]">
          <ConcentricCirclesSVG size={100} rings={10} stroke="#ffffff" />
        </div>
        <div className="flex justify-center border-2 border-black p-2 bg-[#0066ff]">
          <ConcentricCirclesSVG size={100} rings={10} stroke="#ffcc00" />
        </div>
      </div>
    </div>
  );
}

function CheckerboardPanel() {
  return (
    <div className="w-full">
      <div className="border-2 border-black overflow-hidden">
        <CheckerboardSVG width={520} height={160} cellSize={20} color1="#000000" color2="#ffffff" />
      </div>
      <p className="mt-4 text-[11px] font-mono text-black/50 tracking-[0.3em] uppercase">
        SVG rect grid — alternating fill #000 / #fff, 20px cell size
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="border-2 border-black overflow-hidden">
          <CheckerboardSVG width={160} height={80} cellSize={10} color1="#000000" color2="#ffffff" />
        </div>
        <div className="border-2 border-black overflow-hidden">
          <CheckerboardSVG width={160} height={80} cellSize={10} color1="#ff3300" color2="#000000" />
        </div>
        <div className="border-2 border-black overflow-hidden">
          <CheckerboardSVG width={160} height={80} cellSize={10} color1="#0066ff" color2="#ffcc00" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef } = useInView();
  const [patternTab, setPatternTab] = useState<PatternTab>("STRIPES");
  const [compTab, setCompTab] = useState<"BUTTON" | "CARD" | "INPUT">("BUTTON");
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* ================================================================
          1. FIXED NAV
      ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="flex items-stretch justify-between">
          {/* Brand cell */}
          <div className="px-6 py-4 border-r-2 border-black flex items-center">
            <span className="font-mono font-black text-xs uppercase tracking-[0.35em] leading-none">
              OP ART
            </span>
          </div>

          {/* Center label */}
          <div className="hidden md:flex items-center px-8">
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.5em]">
              OPTICAL ILLUSION DESIGN SYSTEM — 1960s
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-stretch">
            <Link
              href="/"
              className="px-5 py-4 font-mono font-black text-[10px] uppercase tracking-[0.3em] text-black/40 hover:bg-black hover:text-white border-l-2 border-black flex items-center transition-none"
            >
              StyleKit →
            </Link>
            <Link
              href="/styles"
              className="px-5 py-4 font-mono font-black text-[10px] uppercase tracking-[0.3em] text-black/40 hover:bg-black hover:text-white border-l-2 border-black flex items-center transition-none"
            >
              All Styles
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================
          2. HERO — Giant SVG illusion, checkerboard strip, huge title
      ================================================================ */}
      <section className="pt-[57px] border-b-2 border-black min-h-screen flex flex-col">
        {/* Checkerboard strip at top */}
        <div className="border-b-2 border-black overflow-hidden h-10 flex-shrink-0">
          <CheckerboardSVG width={1600} height={40} cellSize={20} color1="#000000" color2="#ffffff" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left: title block */}
          <div
            className="col-span-1 md:col-span-7 flex flex-col justify-center px-8 md:px-14 py-16 md:border-r-2 border-black"
          >
            <p
              className="font-mono text-[10px] text-black/30 uppercase tracking-[0.5em] mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Bridget Riley · Victor Vasarely · 1960s
            </p>

            <h1
              ref={heroRef}
              className="font-black text-black uppercase leading-[0.85] tracking-tighter mb-6"
              style={{
                fontSize: "clamp(72px, 13vw, 180px)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              OP
            </h1>
            <h2
              className="font-black leading-[0.85] tracking-tighter mb-10"
              style={{
                fontSize: "clamp(72px, 13vw, 180px)",
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s",
                background: "repeating-linear-gradient(90deg, #000000 0px, #000000 2px, #ffffff 2px, #ffffff 6px)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ART
            </h2>

            <p
              className="font-mono text-sm text-black/50 uppercase tracking-[0.25em] leading-relaxed max-w-sm mb-10"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s",
              }}
            >
              Precise geometry on 2D surfaces creates illusions of motion, vibration, and depth. Perception becomes the medium.
            </p>

            <div
              className="flex gap-0"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.48s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.48s",
              }}
            >
              <button className="px-8 py-3.5 bg-black text-white font-mono font-black text-xs uppercase tracking-[0.35em] border-2 border-black hover:bg-white hover:text-black transition-none">
                Explore
              </button>
              <button className="px-8 py-3.5 bg-white text-black font-mono font-black text-xs uppercase tracking-[0.35em] border-2 border-black border-l-0 hover:bg-black hover:text-white transition-none">
                Learn
              </button>
            </div>
          </div>

          {/* Right: giant concentric circles */}
          <div className="col-span-1 md:col-span-5 flex items-center justify-center bg-black p-8 min-h-[340px]">
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              <ConcentricCirclesSVG size={340} rings={22} stroke="#ffffff" />
            </div>
          </div>
        </div>

        {/* Bottom zigzag strip */}
        <div className="border-t-2 border-black overflow-hidden flex-shrink-0">
          <ZigzagStripeSVG width={1600} height={40} rows={4} color1="#000000" color2="#ffffff" />
        </div>
      </section>

      {/* ================================================================
          3. COMPONENT DEMOS — Button / Card / Input with pattern switcher
      ================================================================ */}
      <section className="border-b-2 border-black">
        {/* Section header */}
        <div className="border-b-2 border-black grid grid-cols-12 gap-0">
          <div className="col-span-12 px-6 md:px-12 py-6">
            <RevealBlock>
              <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.45em] block mb-1">
                Components
              </span>
              <h2 className="font-black text-black uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                ELEMENTS
              </h2>
            </RevealBlock>
          </div>
        </div>

        {/* Component tab bar */}
        <div className="grid grid-cols-3 gap-0 border-b-2 border-black">
          {(["BUTTON", "CARD", "INPUT"] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setCompTab(tab)}
              className={`py-4 font-mono font-black text-[10px] uppercase tracking-[0.35em] transition-none ${
                i > 0 ? "border-l-2 border-black" : ""
              } ${
                compTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black/40 hover:bg-black hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Component demo area */}
        <div className="px-6 md:px-12 py-12 min-h-[320px]">
          {compTab === "BUTTON" && (
            <RevealBlock>
              <p className="font-mono text-[9px] text-black/30 uppercase tracking-[0.4em] mb-8">
                Hover to flip black/white — transition-none (instant hard cut)
              </p>
              <div className="flex flex-wrap gap-0 mb-8">
                <button className="px-10 py-4 bg-black text-white font-mono font-black text-sm uppercase tracking-[0.3em] border-2 border-black hover:bg-white hover:text-black transition-none">
                  Primary
                </button>
                <button className="px-10 py-4 bg-white text-black font-mono font-black text-sm uppercase tracking-[0.3em] border-2 border-black border-l-0 hover:bg-black hover:text-white transition-none">
                  Secondary
                </button>
              </div>
              <div className="flex flex-wrap gap-0 mb-8">
                <button className="px-10 py-4 bg-[#ff3300] text-white font-mono font-black text-sm uppercase tracking-[0.3em] border-2 border-black hover:bg-black hover:text-[#ff3300] transition-none">
                  Red Accent
                </button>
                <button className="px-10 py-4 bg-[#0066ff] text-white font-mono font-black text-sm uppercase tracking-[0.3em] border-2 border-black border-l-0 hover:bg-black hover:text-[#0066ff] transition-none">
                  Blue Accent
                </button>
                <button className="px-10 py-4 bg-[#ffcc00] text-black font-mono font-black text-sm uppercase tracking-[0.3em] border-2 border-black border-l-0 hover:bg-black hover:text-[#ffcc00] transition-none">
                  Yellow Accent
                </button>
              </div>
              <p className="font-mono text-[9px] text-black/30 uppercase tracking-[0.3em]">
                gap-0 joined group — border-l-0 for seamless fusion — Color Block Invasion on hover
              </p>
            </RevealBlock>
          )}

          {compTab === "CARD" && (
            <RevealBlock>
              <p className="font-mono text-[9px] text-black/30 uppercase tracking-[0.4em] mb-8">
                Hover to activate full color-block inversion + concentric corner pattern
              </p>
              <div className="grid md:grid-cols-3 gap-0">
                {[
                  { title: "CONCENTRIC", desc: "Nested rings radiating from a single origin generate perceived depth and infinite recession on a flat plane.", accentColor: "#ff3300" },
                  { title: "MOIRE", desc: "Two overlapping regular patterns at a slight angular offset produce interference patterns no single layer contains.", accentColor: "#0066ff" },
                  { title: "VIBRATION", desc: "Adjacent complementary color pairs oscillate on the retina, generating kinetic energy from static geometry.", accentColor: "#ffcc00" },
                ].map((card, idx) => (
                  <div
                    key={card.title}
                    className={`group relative overflow-hidden bg-white border-2 border-black p-8 hover:bg-black hover:text-white transition-none cursor-default ${idx > 0 ? "border-l-0" : ""}`}
                  >
                    {/* Concentric corner decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-10 group-hover:opacity-25 transition-none">
                      <ConcentricCirclesSVG size={80} rings={6} stroke="currentColor" />
                    </div>
                    <div
                      className="w-10 h-[3px] mb-5 transition-none"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <h3 className="font-black text-lg uppercase tracking-[0.25em] mb-3 transition-none">
                      {card.title}
                    </h3>
                    <p className="font-mono text-sm text-black/50 group-hover:text-white/60 leading-relaxed tracking-wide transition-none">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {compTab === "INPUT" && (
            <RevealBlock>
              <p className="font-mono text-[9px] text-black/30 uppercase tracking-[0.4em] mb-8">
                Bottom border only — transparent bg — focus activates red accent + offset shadow
              </p>
              <div className="max-w-lg space-y-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.4em] text-black/40 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="TYPE HERE..."
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-black text-black placeholder-black/20 font-mono font-bold text-base uppercase tracking-widest focus:border-[#ff3300] focus:outline-none transition-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.4em] text-black/40 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="YOUR@EMAIL.COM"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-black text-black placeholder-black/20 font-mono font-bold text-base uppercase tracking-widest focus:border-[#0066ff] focus:outline-none transition-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.4em] text-black/40 mb-3">
                    Message
                  </label>
                  <textarea
                    placeholder="YOUR MESSAGE..."
                    rows={3}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-black text-black placeholder-black/20 font-mono font-bold text-base uppercase tracking-widest focus:border-[#ff3300] focus:outline-none transition-none resize-none"
                  />
                </div>
                <button className="px-10 py-3.5 bg-black text-white font-mono font-black text-xs uppercase tracking-[0.4em] border-2 border-black hover:bg-white hover:text-black transition-none">
                  Submit
                </button>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ================================================================
          4. COLOR PALETTE — 5 stark square blocks
      ================================================================ */}
      <section className="border-b-2 border-black">
        <div className="border-b-2 border-black px-6 md:px-12 py-6">
          <RevealBlock>
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.45em] block mb-1">
              Palette
            </span>
            <h2 className="font-black text-black uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              COLOR SYSTEM
            </h2>
          </RevealBlock>
        </div>

        <div className="grid grid-cols-5 gap-0">
          {PALETTE.map((color, i) => (
            <RevealBlock key={color.hex} delay={i * 0.06} className="border-r-2 border-black last:border-r-0">
              <div
                className="group flex flex-col justify-between px-4 py-8 md:px-6 md:py-12 min-h-[220px] md:min-h-[280px] cursor-default"
                style={{
                  backgroundColor: color.hex,
                  border: color.border ? "none" : undefined,
                  outline: color.border ? "2px solid #000000" : undefined,
                  outlineOffset: color.border ? "-2px" : undefined,
                }}
              >
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.4em] ${color.textClass} opacity-60`}
                >
                  Color
                </span>
                <div>
                  <span className={`block font-black text-base md:text-xl uppercase tracking-tight leading-tight ${color.textClass} mb-1`}>
                    {color.name}
                  </span>
                  <span className={`block font-mono text-[10px] uppercase tracking-[0.3em] ${color.textClass} opacity-60`}>
                    {color.hex.toUpperCase()}
                  </span>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ================================================================
          5. TYPOGRAPHY — font-black vs font-thin extremes
      ================================================================ */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="border-b-2 border-white/20 px-6 md:px-12 py-6">
          <RevealBlock>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.45em] block mb-1">
              Scale
            </span>
            <h2 className="font-black text-white uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              TYPE SCALE
            </h2>
          </RevealBlock>
        </div>

        <div className="px-6 md:px-12 py-6 space-y-0">
          {TYPOGRAPHY_ROWS.map((row, i) => (
            <RevealBlock key={row.label} delay={i * 0.04}>
              <div className="group grid grid-cols-12 gap-0 border-b border-white/10 py-4 items-baseline hover:bg-white transition-none cursor-default">
                {/* Size label */}
                <div className="col-span-2">
                  <span className="font-mono text-[9px] text-white/30 group-hover:text-black/40 uppercase tracking-[0.3em] transition-none">
                    {row.size}
                  </span>
                </div>
                {/* Sample text */}
                <div className="col-span-7 overflow-hidden">
                  <span
                    className={`text-white group-hover:text-black uppercase ${row.tracking} ${row.weight} leading-none block transition-none`}
                    style={{ fontSize: row.size }}
                  >
                    {row.sample}
                  </span>
                </div>
                {/* Role label */}
                <div className="col-span-3 flex justify-end items-baseline">
                  <span className="font-mono text-[9px] text-white/25 group-hover:text-black/30 uppercase tracking-[0.2em] text-right transition-none">
                    {row.label}
                  </span>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Font extremes demo */}
        <RevealBlock className="px-6 md:px-12 pb-12 pt-6">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="border-2 border-white/20 p-8 md:border-r-0">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.4em] block mb-4">
                font-black — geometric mass
              </span>
              <p className="font-black text-white uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(48px, 8vw, 100px)" }}>
                BOLD
              </p>
            </div>
            <div className="border-2 border-white/20 p-8">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.4em] block mb-4">
                font-thin — vanishing line
              </span>
              <p className="font-thin text-white uppercase leading-none tracking-widest" style={{ fontSize: "clamp(48px, 8vw, 100px)" }}>
                THIN
              </p>
            </div>
          </div>
          <div className="mt-6 border-2 border-white/20 p-8">
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.4em] block mb-4">
              font-mono — machine precision
            </span>
            <p className="font-mono text-white uppercase tracking-[0.5em] text-lg leading-relaxed">
              THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG — 1234567890
            </p>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          6. PATTERN DEMOS — Stripes / Circles / Checkerboard switcher
      ================================================================ */}
      <section className="border-b-2 border-black">
        <div className="border-b-2 border-black px-6 md:px-12 py-6">
          <RevealBlock>
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.45em] block mb-1">
              Optical Patterns
            </span>
            <h2 className="font-black text-black uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              ILLUSIONS
            </h2>
          </RevealBlock>
        </div>

        {/* Pattern tab bar */}
        <div className="grid grid-cols-3 gap-0 border-b-2 border-black">
          {PATTERN_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setPatternTab(tab)}
              className={`py-4 font-mono font-black text-[10px] uppercase tracking-[0.35em] transition-none ${
                i > 0 ? "border-l-2 border-black" : ""
              } ${
                patternTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black/40 hover:bg-black hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pattern content */}
        <div className="px-6 md:px-12 py-12 max-w-4xl">
          <RevealBlock>
            {patternTab === "STRIPES" && <StripesPanel />}
            {patternTab === "CIRCLES" && <CirclesPanel />}
            {patternTab === "CHECKERBOARD" && <CheckerboardPanel />}
          </RevealBlock>
        </div>

        {/* Moire waves full-width */}
        <div className="border-t-2 border-black overflow-hidden">
          <MoireWaveSVG width={1600} height={80} lines={14} color="#000000" />
        </div>
      </section>

      {/* ================================================================
          7. OPTICAL ILLUSION GALLERY — Three large standalone SVGs
      ================================================================ */}
      <section className="border-b-2 border-black bg-black">
        <div className="border-b-2 border-white/20 px-6 md:px-12 py-6">
          <RevealBlock>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.45em] block mb-1">
              Gallery
            </span>
            <h2 className="font-black text-white uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              WORKS
            </h2>
          </RevealBlock>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Radiating lines */}
          <RevealBlock className="border-b-2 md:border-b-0 md:border-r-2 border-white/20" delay={0}>
            <div className="flex flex-col items-center justify-center p-10 min-h-[360px] group cursor-default hover:bg-white transition-none">
              <RadiatingLinesSVG size={260} spokes={48} stroke="#ffffff" className="group-hover:[&_line]:stroke-black group-hover:[&_circle]:fill-black transition-none" />
              <div className="mt-6 text-center">
                <span className="font-mono text-[9px] text-white/30 group-hover:text-black/30 uppercase tracking-[0.4em] block transition-none">
                  Radial Burst
                </span>
                <p className="font-black text-sm text-white group-hover:text-black uppercase tracking-[0.2em] mt-1 transition-none">
                  RADIATION PATTERN
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Concentric circles large */}
          <RevealBlock className="border-b-2 md:border-b-0 md:border-r-2 border-white/20" delay={0.06}>
            <div className="flex flex-col items-center justify-center p-10 min-h-[360px] group cursor-default hover:bg-white transition-none">
              <ConcentricCirclesSVG size={260} rings={20} stroke="#ffffff" className="group-hover:[&_circle]:stroke-black transition-none" />
              <div className="mt-6 text-center">
                <span className="font-mono text-[9px] text-white/30 group-hover:text-black/30 uppercase tracking-[0.4em] block transition-none">
                  Concentric
                </span>
                <p className="font-black text-sm text-white group-hover:text-black uppercase tracking-[0.2em] mt-1 transition-none">
                  INFINITE DEPTH
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Checkerboard large */}
          <RevealBlock delay={0.12}>
            <div className="flex flex-col items-center justify-center p-10 min-h-[360px] group cursor-default hover:bg-white transition-none overflow-hidden">
              <div className="border-2 border-white/30 group-hover:border-black/30 overflow-hidden transition-none">
                <CheckerboardSVG width={260} height={260} cellSize={26} color1="#ffffff" color2="#000000" className="group-hover:[&_rect:first-child]:fill-white group-hover:[&_rect:not(:first-child)]:fill-black transition-none" />
              </div>
              <div className="mt-6 text-center">
                <span className="font-mono text-[9px] text-white/30 group-hover:text-black/30 uppercase tracking-[0.4em] block transition-none">
                  Grid
                </span>
                <p className="font-black text-sm text-white group-hover:text-black uppercase tracking-[0.2em] mt-1 transition-none">
                  CHECKERBOARD
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Vibrating color pair demo */}
        <RevealBlock className="border-t-2 border-white/20">
          <div className="px-6 md:px-12 py-10">
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.45em] block mb-6">
              Vibrating Color Pairs — Adjacent complements oscillate on the retina
            </span>
            <div className="grid grid-cols-3 gap-0">
              <div className="flex">
                <div className="flex-1 h-24" style={{ backgroundColor: "#ff3300" }} />
                <div className="flex-1 h-24" style={{ backgroundColor: "#0066ff" }} />
              </div>
              <div className="flex border-l-2 border-r-2 border-white/20">
                <div className="flex-1 h-24" style={{ backgroundColor: "#ffcc00" }} />
                <div className="flex-1 h-24" style={{ backgroundColor: "#0066ff" }} />
              </div>
              <div className="flex">
                <div className="flex-1 h-24" style={{ backgroundColor: "#ff3300" }} />
                <div className="flex-1 h-24" style={{ backgroundColor: "#ffcc00" }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-0 mt-2">
              <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] text-center">Red + Blue</p>
              <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] text-center">Yellow + Blue</p>
              <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] text-center">Red + Yellow</p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          8. DESIGN PRINCIPLES — DO / DON'T alternating black/white panels
      ================================================================ */}
      <section className="border-b-2 border-black">
        <div className="border-b-2 border-black px-6 md:px-12 py-6">
          <RevealBlock>
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.45em] block mb-1">
              Rules
            </span>
            <h2 className="font-black text-black uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              MANIFESTO
            </h2>
          </RevealBlock>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* DO — white bg */}
          <RevealBlock delay={0.04} className="md:border-r-2 border-black">
            <div className="bg-white p-8 md:p-12 min-h-[480px] flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 bg-black" />
                <h3 className="font-mono font-black text-xs uppercase tracking-[0.45em]">DO</h3>
              </div>
              <ul className="space-y-0 flex-1">
                {DO_RULES.map((rule, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4 py-3.5 border-b border-black/10 hover:bg-black hover:border-transparent transition-none cursor-default px-2"
                  >
                    <span className="font-mono text-[9px] text-black/30 group-hover:text-[#ff3300] uppercase tracking-[0.3em] mt-0.5 shrink-0 w-5 transition-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-black/70 group-hover:text-white leading-relaxed tracking-wide transition-none">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* DON'T — black bg */}
          <RevealBlock delay={0.1}>
            <div className="bg-black text-white p-8 md:p-12 min-h-[480px] flex flex-col border-t-2 md:border-t-0 border-black">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 bg-[#ff3300]" />
                <h3 className="font-mono font-black text-xs uppercase tracking-[0.45em] text-[#ff3300]">
                  DON&apos;T
                </h3>
              </div>
              <ul className="space-y-0 flex-1">
                {DONT_RULES.map((rule, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4 py-3.5 border-b border-white/10 hover:bg-white hover:border-transparent transition-none cursor-default px-2"
                  >
                    <span className="font-mono text-[9px] text-[#ff3300]/60 group-hover:text-[#ff3300] uppercase tracking-[0.3em] mt-0.5 shrink-0 w-5 transition-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-white/60 group-hover:text-black leading-relaxed tracking-wide transition-none">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Manifesto quote */}
        <RevealBlock delay={0.15}>
          <div className="bg-white border-t-2 border-black px-6 md:px-12 py-10 text-center">
            <p className="font-black text-black uppercase leading-tight tracking-tight text-xl md:text-3xl max-w-3xl mx-auto">
              &ldquo;The painting is complete when it has ideas and emotions that the viewer can appreciate.&rdquo;
            </p>
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.5em] block mt-5">
              — Bridget Riley, 1965
            </span>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          9. INTERACTIVE PATTERN STRIP — Hover rows that flip color
      ================================================================ */}
      <section className="border-b-2 border-black">
        <div className="border-b-2 border-black px-6 md:px-12 py-6">
          <RevealBlock>
            <span className="font-mono text-[10px] text-black/30 uppercase tracking-[0.45em] block mb-1">
              Interaction
            </span>
            <h2 className="font-black text-black uppercase leading-none tracking-tighter" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              HOVER MATRIX
            </h2>
          </RevealBlock>
        </div>

        <RevealBlock>
          <div className="grid grid-cols-1 divide-y-2 divide-black">
            {[
              { label: "PERCEPTION", pattern: "repeating-linear-gradient(90deg, #000000 0px, #000000 8px, #ffffff 8px, #ffffff 16px)", accentColor: "#ff3300" },
              { label: "VIBRATION", pattern: "repeating-linear-gradient(45deg, #000000 0px, #000000 6px, #ffffff 6px, #ffffff 12px)", accentColor: "#0066ff" },
              { label: "ILLUSION", pattern: "repeating-linear-gradient(0deg, #000000 0px, #000000 4px, #ffffff 4px, #ffffff 8px)", accentColor: "#ffcc00" },
              { label: "MOTION", pattern: "repeating-linear-gradient(135deg, #000000 0px, #000000 10px, #ffffff 10px, #ffffff 20px)", accentColor: "#ff3300" },
              { label: "GEOMETRY", pattern: "repeating-linear-gradient(-45deg, #000000 0px, #000000 5px, #ffffff 5px, #ffffff 10px)", accentColor: "#0066ff" },
            ].map((row) => (
              <div
                key={row.label}
                className="group relative flex items-center justify-between px-8 md:px-12 py-6 bg-white hover:bg-black transition-none cursor-default overflow-hidden"
              >
                {/* Pattern strip on right side when hovered */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-0 group-hover:w-48 transition-none overflow-hidden"
                  style={{ background: row.pattern }}
                />
                <div className="flex items-center gap-6 relative z-10">
                  <div
                    className="w-3 h-3 flex-shrink-0 transition-none"
                    style={{ backgroundColor: row.accentColor }}
                  />
                  <span className="font-black text-2xl md:text-4xl uppercase tracking-tighter text-black group-hover:text-white transition-none">
                    {row.label}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-black/30 group-hover:text-white/30 uppercase tracking-[0.4em] relative z-10 transition-none">
                  Hover
                </span>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================
          10. FOOTER — pure black, white text, geometric pattern strip
      ================================================================ */}
      <footer className="bg-black text-white">
        {/* Zigzag strip at top of footer */}
        <div className="border-b border-white/10 overflow-hidden">
          <ZigzagStripeSVG width={1600} height={32} rows={4} color1="#ffffff" color2="#000000" />
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Brand block */}
          <div className="col-span-12 md:col-span-7 px-8 md:px-14 pt-12 pb-10 md:border-r border-white/10">
            <span
              className="font-black text-white uppercase leading-none tracking-tighter block"
              style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
            >
              OP ART
            </span>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.45em] mt-4">
              OPTICAL ART — BRIDGET RILEY — VICTOR VASARELY — 1960s
            </p>
            <p className="font-mono text-[9px] text-white/15 uppercase tracking-[0.3em] mt-8">
              &copy; 2026 STYLEKIT — GEOMETRIC PRECISION, PERCEPTUAL ILLUSION
            </p>

            {/* Color squares row */}
            <div className="flex gap-0 mt-8">
              {["#ff3300", "#0066ff", "#ffcc00", "#ffffff"].map((c) => (
                <div key={c} className="w-5 h-5" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="col-span-12 md:col-span-5 px-8 md:px-10 py-10 flex flex-col justify-between border-t md:border-t-0 border-white/10">
            <div className="space-y-0">
              <Link
                href="/"
                className="flex items-center justify-between px-0 py-4 font-mono font-black text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white hover:bg-[#ff3300] hover:px-4 border-b border-white/10 transition-none"
              >
                StyleKit Home
                <span className="text-white/20">&#8594;</span>
              </Link>
              <Link
                href="/styles"
                className="flex items-center justify-between px-0 py-4 font-mono font-black text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white hover:bg-[#0066ff] hover:px-4 border-b border-white/10 transition-none"
              >
                All Styles
                <span className="text-white/20">&#8594;</span>
              </Link>
              <Link
                href="/styles/op-art"
                className="flex items-center justify-between px-0 py-4 font-mono font-black text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-black hover:bg-[#ffcc00] hover:px-4 transition-none"
              >
                Op Art Docs
                <span className="text-white/20">&#8594;</span>
              </Link>
            </div>

            {/* Concentric circles mini */}
            <div className="mt-8 opacity-20">
              <ConcentricCirclesSVG size={80} rings={8} stroke="#ffffff" />
            </div>
          </div>
        </div>

        {/* Bottom checkerboard strip */}
        <div className="border-t border-white/10 overflow-hidden">
          <CheckerboardSVG width={1600} height={16} cellSize={16} color1="#ffffff" color2="#000000" />
        </div>
      </footer>
    </div>
  );
}
