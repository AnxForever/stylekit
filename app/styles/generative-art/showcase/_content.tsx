"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
/* ------------------------------------------------------------------ */

function useInView(options: IntersectionObserverInit = {}) {
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
/*  Deterministic pseudo-random                                        */
/* ------------------------------------------------------------------ */

function seededRand(seed: number, i: number): number {
  return Math.abs(Math.sin(seed * 9301 + i * 49297 + 233) * 0.5 + 0.5) % 1;
}

/* ------------------------------------------------------------------ */
/*  SVG Algorithm Components                                           */
/* ------------------------------------------------------------------ */

function LissajousPath({
  seed = 42,
  width = 200,
  height = 200,
  color = "#7c3aed",
  strokeWidth = 1.5,
}: {
  seed?: number;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const a = (seed % 4) + 2;
  const b = (seed % 3) + 3;
  const delta = Math.PI / ((seed % 7) + 2);
  const points = Array.from({ length: 300 }, (_, i) => {
    const t = (i / 300) * Math.PI * 2;
    const x = width / 2 + (width / 2 - 12) * Math.sin(a * t + delta);
    const y = height / 2 + (height / 2 - 12) * Math.sin(b * t);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <path d={points} fill="none" stroke={color} strokeWidth={strokeWidth} opacity="0.85" />
  );
}

function VoronoiCells({
  seed = 42,
  width = 200,
  height = 200,
}: {
  seed?: number;
  width?: number;
  height?: number;
}) {
  const count = 12;
  const colors = ["#7c3aed", "#3b82f6", "#14b8a6", "#f43f5e", "#f59e0b"];
  const centers = Array.from({ length: count }, (_, i) => ({
    x: seededRand(seed, i * 2) * width,
    y: seededRand(seed, i * 2 + 1) * height,
  }));

  const cells = centers.map((c, i) => ({
    cx: c.x,
    cy: c.y,
    r: 22 + seededRand(seed, i + 100) * 18,
    color: colors[i % colors.length],
    opacity: 0.15 + seededRand(seed, i + 200) * 0.25,
  }));

  const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      const dx = centers[i].x - centers[j].x;
      const dy = centers[i].y - centers[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 75) {
        lines.push({
          x1: centers[i].x,
          y1: centers[i].y,
          x2: centers[j].x,
          y2: centers[j].y,
          color: colors[(i + j) % colors.length],
        });
      }
    }
  }

  return (
    <>
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth="0.8" opacity="0.35" />
      ))}
      {cells.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.color} fillOpacity={c.opacity} stroke={c.color} strokeWidth="0.8" strokeOpacity="0.6" />
      ))}
      {centers.map((c, i) => (
        <circle key={`dot-${i}`} cx={c.x} cy={c.y} r="2.5" fill={colors[i % colors.length]} opacity="0.9" />
      ))}
    </>
  );
}

function SpiralDots({
  seed = 42,
  width = 200,
  height = 200,
}: {
  seed?: number;
  width?: number;
  height?: number;
}) {
  const goldenAngle = 2.399963 + (seed % 100) * 0.001;
  const count = 80 + (seed % 40);
  const colors = ["#7c3aed", "#3b82f6", "#14b8a6", "#f43f5e", "#f59e0b"];
  const dots = Array.from({ length: count }, (_, i) => {
    const r = Math.sqrt(i / count) * (Math.min(width, height) / 2 - 10);
    const theta = i * goldenAngle;
    return {
      x: width / 2 + r * Math.cos(theta),
      y: height / 2 + r * Math.sin(theta),
      r: 1.5 + (i / count) * 2.5,
      color: colors[i % colors.length],
      opacity: 0.4 + (i / count) * 0.6,
    };
  });
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={d.opacity} />
      ))}
    </>
  );
}

function GridNoise({
  seed = 42,
  width = 200,
  height = 200,
}: {
  seed?: number;
  width?: number;
  height?: number;
}) {
  const cols = 8;
  const rows = 8;
  const cellW = width / cols;
  const cellH = height / rows;
  const colors = ["#7c3aed", "#3b82f6", "#14b8a6", "#f43f5e", "#f59e0b"];
  const cells = Array.from({ length: rows * cols }, (_, idx) => {
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    return {
      row,
      col,
      heightFrac: seededRand(seed, idx),
      color: colors[Math.floor(seededRand(seed, idx + 1000) * colors.length)],
      opacity: 0.2 + seededRand(seed, idx + 2000) * 0.7,
    };
  });
  return (
    <>
      {cells.map((c, i) => {
        const barH = c.heightFrac * cellH * 0.9;
        const x = c.col * cellW + cellW * 0.1;
        const y = (c.row + 1) * cellH - barH;
        return (
          <rect key={i} x={x} y={y} width={cellW * 0.8} height={barH} fill={c.color} opacity={c.opacity} rx="1" />
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Parameter Preview SVG                                              */
/* ------------------------------------------------------------------ */

function ParameterPreview({
  seed,
  complexity,
  chaos,
  colorShift,
}: {
  seed: number;
  complexity: number;
  chaos: number;
  colorShift: number;
}) {
  const w = 320;
  const h = 180;
  const count = 20 + complexity * 8;
  const baseHue = (colorShift + 270) % 360;

  const elements = Array.from({ length: count }, (_, i) => {
    const noiseX = seededRand(seed, i) * (chaos / 100) * 30;
    const noiseY = seededRand(seed, i + 500) * (chaos / 100) * 30;
    const t = (i / count) * Math.PI * 2;
    const scale = 1 + (complexity - 1) * 0.15;
    const maxR = Math.min(1, 1 / scale);
    const rx = (w / 2 - 20) * scale * maxR;
    const ry = (h / 2 - 20) * scale * maxR;
    return {
      x: w / 2 + rx * Math.cos(t) + noiseX,
      y: h / 2 + ry * Math.sin(t * 1.3 + Math.PI / 4) + noiseY,
      hue: (baseHue + i * (360 / count)) % 360,
      size: 2 + seededRand(seed, i + 1000) * 4,
    };
  });

  const pathPoints = elements
    .map((e, i) => `${i === 0 ? "M" : "L"}${e.x.toFixed(1)},${e.y.toFixed(1)}`)
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full rounded-lg">
      <rect width={w} height={h} fill="#0a0a0a" rx="8" />
      <path d={pathPoints} fill="none" stroke={`hsl(${baseHue},80%,65%)`} strokeWidth="1" opacity="0.4" />
      {elements.map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={e.size} fill={`hsl(${e.hue},75%,60%)`} opacity="0.75" />
      ))}
      <text x="10" y="20" fill="#7c3aed" fontSize="9" fontFamily="monospace" opacity="0.7">
        {`SEED:${seed} C:${complexity} CH:${chaos}% H:${colorShift}\xb0`}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HSL Color Wheel                                                    */
/* ------------------------------------------------------------------ */

function HslWheel() {
  const accents = [
    { name: "Violet", hex: "#7c3aed", h: 263 },
    { name: "Blue",   hex: "#3b82f6", h: 217 },
    { name: "Teal",   hex: "#14b8a6", h: 173 },
    { name: "Rose",   hex: "#f43f5e", h: 350 },
    { name: "Amber",  hex: "#f59e0b", h: 38 },
  ];
  const cx = 120;
  const cy = 120;
  const r = 80;
  const positions = accents.map((a) => ({
    ...a,
    x: cx + r * Math.cos((a.h * Math.PI) / 180),
    y: cy + r * Math.sin((a.h * Math.PI) / 180),
  }));

  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {Array.from({ length: 360 }, (_, deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + (r - 20) * Math.cos(rad);
        const y1 = cy + (r - 20) * Math.sin(rad);
        const x2 = cx + (r + 20) * Math.cos(rad);
        const y2 = cy + (r + 20) * Math.sin(rad);
        return (
          <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`hsl(${deg},75%,58%)`} strokeWidth="2" opacity="0.55" />
        );
      })}
      <circle cx={cx} cy={cy} r={r - 22} fill="#0a0a0a" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#7c3aed" fontSize="9" fontFamily="monospace">HSL</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#7c3aed" fontSize="8" fontFamily="monospace" opacity="0.4">WHEEL</text>
      {positions.map((p) => (
        <line key={p.name + "-s"} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={p.hex} strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
      ))}
      {positions.map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r="10" fill={p.hex} opacity="0.9" />
          <circle cx={p.x} cy={p.y} r="10" fill="none" stroke={p.hex} strokeWidth="2" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const algorithms = [
  {
    name: "Lissajous",
    label: "LIS",
    desc: "Parametric curve tracing two sinusoidal oscillations on perpendicular axes. Phase difference delta controls figure complexity.",
    formula: "x = A\xb7sin(at + \u03b4), y = B\xb7sin(bt)",
    accentColor: "#7c3aed",
  },
  {
    name: "Voronoi",
    label: "VOR",
    desc: "Partition of the plane into cells based on distance to seed points. Each cell contains all points nearest to one seed.",
    formula: "V(p) = {x | d(x,p) \u2264 d(x,q) \u2200q}",
    accentColor: "#3b82f6",
  },
  {
    name: "Phyllotaxis",
    label: "PHY",
    desc: "Golden angle spiral arrangement. Nature\u2019s packing algorithm \u2014 sunflower seeds, pine cones, galaxy arms.",
    formula: "r = \u221ai, \u03b8 = i \xd7 137.508\xb0",
    accentColor: "#14b8a6",
  },
  {
    name: "Grid Noise",
    label: "GRD",
    desc: "Regular grid structure perturbed by pseudo-random values derived from seed. Order meeting chaos at defined amplitude.",
    formula: "height[i,j] = noise(seed, i\xb7cols+j)",
    accentColor: "#f43f5e",
  },
];

const doRules = [
  "Use mathematical functions (sin, cos, sqrt) as the source of all visual positions",
  "Seed values must be deterministic \u2014 same seed always renders the same output",
  "Color assignments via HSL rotation: hue = (baseHue + i \xd7 step) % 360",
  "Embrace emergent complexity from simple iterative rules",
  "Show algorithm parameters \u2014 seed display and coordinate readouts are part of the aesthetic",
  "Low-opacity fills for areas, full-opacity strokes for lines \u2014 depth through layering",
];

const dontRules = [
  "Never use Math.random() without seeding \u2014 outputs must be reproducible",
  "Never add decorative elements unrelated to the algorithm output",
  "Never use serif or display fonts \u2014 monospace is the voice of generative art",
  "Never use background gradients as pure decoration \u2014 algorithmic patterns replace them",
  "Never hide the seed value \u2014 it is core identity, not an implementation detail",
  "Never use rounded-full on SVG containers \u2014 geometric precision only",
];

const accentColors = ["#7c3aed", "#3b82f6", "#14b8a6", "#f43f5e", "#f59e0b"] as const;

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [seed, setSeed] = useState(42731);
  const [activeAlgorithm, setActiveAlgorithm] = useState(0);
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");
  const [algorithmParams, setAlgorithmParams] = useState({
    complexity: 5,
    chaos: 30,
    colorShift: 0,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hoveredSeed, setHoveredSeed] = useState(false);
  const [coordValue, setCoordValue] = useState({ x: 0, y: 0 });

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Suppress unused variable warning — heroInView used implicitly via heroRef mount
  void heroInView;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedTime((Date.now() - start) / 1000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const vertexCount = 200 + (seed % 800);
  const triangleCount = Math.floor(vertexCount * 1.4);
  const renderMs = 12 + (seed % 88);

  const algorithmSeeds = [
    seed,
    (seed * 3 + 17) % 99999,
    (seed * 7 + 31) % 99999,
    (seed * 11 + 53) % 99999,
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono overflow-x-hidden">

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-violet-500/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Back to StyleKit */}
            <Link
              href="/styles"
              className="text-xs text-violet-400/70 hover:text-violet-300 transition-colors duration-300 flex items-center gap-1.5 font-mono"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
            </Link>

            {/* Center: title + seed */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-violet-300/60 tracking-widest hidden md:block">
                GENERATIVE ART
              </span>
              <div className="bg-[#0a0a0a] border border-violet-500/30 rounded font-mono px-3 py-1 text-violet-300 text-xs">
                SEED: {seed.toString().padStart(5, "0")}
              </div>
            </div>

            {/* Right: render status */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-violet-400/50">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                {elapsedTime.toFixed(1)}s
              </div>
              <div className="bg-violet-600/20 border border-violet-500/40 rounded px-3 py-1 text-xs text-violet-300 font-mono tracking-wider">
                [ RENDER ]
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero — Algorithm Display ===== */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-20 px-6 md:px-12 min-h-screen flex items-center overflow-hidden"
      >
        {/* Background generative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute"
            style={{ top: "5%", right: "-5%", width: "65%", height: "65%", opacity: 0.08 }}
            viewBox="0 0 400 400"
          >
            <LissajousPath seed={seed} width={400} height={400} color="#7c3aed" strokeWidth={1} />
          </svg>
          <svg
            className="absolute"
            style={{ bottom: "5%", left: "-8%", width: "50%", height: "50%", opacity: 0.06 }}
            viewBox="0 0 400 400"
          >
            <LissajousPath seed={(seed + 13) % 99999} width={400} height={400} color="#3b82f6" strokeWidth={1} />
          </svg>
          {/* Seed-driven ambient dots */}
          {Array.from({ length: 120 }, (_, i) => {
            const x = seededRand(seed, i) * 100;
            const y = seededRand(seed, i + 300) * 100;
            const sz = seededRand(seed, i + 600) * 3 + 1;
            const c = accentColors[i % accentColors.length];
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${sz}px`,
                  height: `${sz}px`,
                  backgroundColor: c,
                  opacity: 0.08 + seededRand(seed, i + 900) * 0.14,
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Algorithm label row */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-xs text-violet-400/60 tracking-widest">
              ALGORITHM :: PARAMETRIC_RENDER
            </span>
            <div className="h-px flex-1 bg-violet-500/20" />
            <span className="font-mono text-xs text-violet-400/40">v2.4.1</span>
          </div>

          {/* Main title */}
          <h1
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
            }}
            className="font-mono font-bold leading-none tracking-tight mb-2"
          >
            <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              GENERATIVE
            </span>
          </h1>
          <h2
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              fontSize: "clamp(2rem, 6vw, 5.5rem)",
            }}
            className="font-mono font-bold leading-none tracking-tight text-violet-300/40 mb-10"
          >
            ART
          </h2>

          {/* Description + hero SVG */}
          <div
            className="grid md:grid-cols-2 gap-10 items-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            {/* Left: description + stats */}
            <div>
              <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-md">
                Mathematical functions and algorithmic rules generate visual elements. Seed values, coordinate
                systems, and iterative patterns produce emergent complexity from deterministic simplicity.
              </p>

              {/* Render stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "VERTICES", value: vertexCount.toString() },
                  { label: "TRIANGLES", value: triangleCount.toString() },
                  { label: "RENDER_MS", value: `${renderMs}ms` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#111111] border border-violet-500/20 rounded-lg p-3">
                    <div className="font-mono text-[9px] text-violet-400/50 tracking-widest mb-1">{stat.label}</div>
                    <div className="font-mono text-base text-violet-300 font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Seed controls */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-[#0a0a0a] border border-violet-500/30 rounded font-mono px-3 py-2 text-violet-300 text-sm flex items-center gap-2">
                  <span className="text-violet-400/50 text-xs">SEED</span>
                  <span>{seed.toString().padStart(5, "0")}</span>
                </div>
                <button
                  onClick={() => setSeed((s) => Math.max(0, s - 1))}
                  className="bg-[#111111] border border-violet-500/30 rounded px-3 py-2 text-violet-400 text-sm hover:border-violet-500/60 hover:text-violet-300 transition-colors duration-200"
                >
                  &minus;
                </button>
                <button
                  onClick={() => setSeed((s) => (s + 1) % 100000)}
                  className="bg-[#111111] border border-violet-500/30 rounded px-3 py-2 text-violet-400 text-sm hover:border-violet-500/60 hover:text-violet-300 transition-colors duration-200"
                >
                  +
                </button>
                <button
                  onClick={() => setSeed(Math.floor(seededRand(Date.now() % 99999, elapsedTime | 0) * 100000))}
                  className="bg-violet-600/20 border border-violet-500/40 rounded px-3 py-2 text-violet-300 text-xs hover:bg-violet-600/30 transition-colors duration-200 tracking-wider"
                >
                  RAND
                </button>
              </div>
            </div>

            {/* Right: hero Lissajous SVG */}
            <div className="relative">
              <div
                className="bg-[#111111] border border-violet-500/20 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-violet-500/15">
                  <span className="font-mono text-xs text-violet-400/50">lissajous.svg</span>
                  <span className="font-mono text-xs text-teal-400/70">ACTIVE</span>
                </div>
                <svg width="100%" viewBox="0 0 300 300" className="block">
                  <rect width="300" height="300" fill="#0a0a0a" />
                  <line x1="0" y1="150" x2="300" y2="150" stroke="#7c3aed" strokeWidth="0.4" opacity="0.2" />
                  <line x1="150" y1="0" x2="150" y2="300" stroke="#7c3aed" strokeWidth="0.4" opacity="0.2" />
                  <circle cx="150" cy="150" r="120" fill="none" stroke="#7c3aed" strokeWidth="0.4" opacity="0.12" />
                  <LissajousPath seed={seed} width={300} height={300} color="#7c3aed" strokeWidth={1.5} />
                  <LissajousPath seed={(seed + 7) % 99999} width={300} height={300} color="#3b82f6" strokeWidth={0.8} />
                  <circle cx="150" cy="150" r="3" fill="#7c3aed" opacity="0.6" />
                  <text x="155" y="148" fill="#7c3aed" fontSize="7" fontFamily="monospace" opacity="0.5">(0,0)</text>
                </svg>
                <div className="px-4 py-2 border-t border-violet-500/15 flex justify-between">
                  <span className="font-mono text-[10px] text-violet-400/40">
                    a={(seed % 4) + 2} b={(seed % 3) + 3} {"\u03b4"}={"\u03c0"}/{(seed % 7) + 2}
                  </span>
                  <span className="font-mono text-[10px] text-teal-400/60">300pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Algorithm Gallery ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-violet-500/10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-mono text-xs text-violet-400/50 tracking-widest block mb-3">
                  SECTION_02 :: ALGORITHM_GALLERY
                </span>
                <h2 className="font-mono text-3xl md:text-4xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                    Algorithm
                  </span>{" "}
                  Visualizations
                </h2>
              </div>
              <div className="hidden md:block font-mono text-xs text-violet-400/30 text-right">
                <div>4 ALGORITHMS</div>
                <div>SEED-CONTROLLED</div>
              </div>
            </div>
          </RevealBlock>

          {/* Algorithm tab selector */}
          <RevealBlock delay={0.06} className="flex gap-2 flex-wrap mb-10">
            {algorithms.map((alg, i) => (
              <button
                key={alg.name}
                onClick={() => setActiveAlgorithm(i)}
                className={`px-4 py-2 font-mono text-xs tracking-wider rounded border transition-all duration-200 ${
                  activeAlgorithm === i
                    ? "border-violet-500/60 text-violet-300 bg-violet-600/15"
                    : "border-violet-500/20 text-violet-400/50 hover:border-violet-500/40 hover:text-violet-400/80"
                }`}
                style={activeAlgorithm === i ? { boxShadow: "0 0 12px rgba(124,58,237,0.2)" } : {}}
              >
                [{alg.label}] {alg.name}
              </button>
            ))}
          </RevealBlock>

          {/* Active algorithm detail */}
          <RevealBlock delay={0.1}>
            <div
              className="bg-[#111111] border border-violet-500/20 rounded-lg overflow-hidden mb-10"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.15)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-violet-500/15">
                <span className="font-mono text-xs text-violet-400/60">
                  {algorithms[activeAlgorithm].name.toLowerCase()}_render.svg
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs" style={{ color: algorithms[activeAlgorithm].accentColor }}>
                    {algorithms[activeAlgorithm].label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSeed((s) => Math.max(0, s - 1))}
                      className="w-6 h-6 border border-violet-500/30 rounded text-violet-400/70 text-xs hover:border-violet-500/60 hover:text-violet-300 transition-colors duration-200 flex items-center justify-center"
                    >
                      &minus;
                    </button>
                    <span className="font-mono text-xs text-violet-300 w-14 text-center">
                      {algorithmSeeds[activeAlgorithm].toString().padStart(5, "0")}
                    </span>
                    <button
                      onClick={() => setSeed((s) => (s + 1) % 100000)}
                      className="w-6 h-6 border border-violet-500/30 rounded text-violet-400/70 text-xs hover:border-violet-500/60 hover:text-violet-300 transition-colors duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* SVG panel */}
                <div className="p-8 flex items-center justify-center border-r border-violet-500/10">
                  <svg width="220" height="220" viewBox="0 0 220 220">
                    <rect width="220" height="220" fill="#0a0a0a" rx="6" />
                    <line x1="0" y1="110" x2="220" y2="110" stroke="#ffffff" strokeWidth="0.3" opacity="0.08" />
                    <line x1="110" y1="0" x2="110" y2="220" stroke="#ffffff" strokeWidth="0.3" opacity="0.08" />
                    {activeAlgorithm === 0 && (
                      <LissajousPath seed={algorithmSeeds[0]} width={220} height={220} color={algorithms[0].accentColor} strokeWidth={1.5} />
                    )}
                    {activeAlgorithm === 1 && (
                      <VoronoiCells seed={algorithmSeeds[1]} width={220} height={220} />
                    )}
                    {activeAlgorithm === 2 && (
                      <SpiralDots seed={algorithmSeeds[2]} width={220} height={220} />
                    )}
                    {activeAlgorithm === 3 && (
                      <GridNoise seed={algorithmSeeds[3]} width={220} height={220} />
                    )}
                  </svg>
                </div>

                {/* Info panel */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="font-mono text-xs text-violet-400/50 tracking-widest mb-3">
                    ALGORITHM :: {algorithms[activeAlgorithm].name.toUpperCase()}
                  </div>
                  <h3
                    className="font-mono text-2xl font-bold mb-4"
                    style={{ color: algorithms[activeAlgorithm].accentColor }}
                  >
                    {algorithms[activeAlgorithm].name}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    {algorithms[activeAlgorithm].desc}
                  </p>
                  <div className="bg-[#0a0a0a] border border-violet-500/20 rounded p-3">
                    <div className="font-mono text-[10px] text-violet-400/40 mb-1 tracking-wider">FORMULA</div>
                    <div className="font-mono text-xs text-teal-300/80">
                      {algorithms[activeAlgorithm].formula}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* 4-up thumbnail grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {algorithms.map((alg, i) => (
              <RevealBlock key={alg.name} delay={i * 0.06}>
                <button
                  onClick={() => setActiveAlgorithm(i)}
                  className={`w-full bg-[#111111] border rounded-lg overflow-hidden transition-all duration-200 ${
                    activeAlgorithm === i
                      ? "border-violet-500/50"
                      : "border-violet-500/15 hover:border-violet-500/30"
                  }`}
                  style={activeAlgorithm === i ? { boxShadow: "0 0 12px rgba(124,58,237,0.25)" } : {}}
                >
                  <svg width="100%" viewBox="0 0 120 100">
                    <rect width="120" height="100" fill="#0a0a0a" />
                    {i === 0 && <LissajousPath seed={algorithmSeeds[0]} width={120} height={100} color={alg.accentColor} strokeWidth={1} />}
                    {i === 1 && <VoronoiCells seed={algorithmSeeds[1]} width={120} height={100} />}
                    {i === 2 && <SpiralDots seed={algorithmSeeds[2]} width={120} height={100} />}
                    {i === 3 && <GridNoise seed={algorithmSeeds[3]} width={120} height={100} />}
                  </svg>
                  <div className="px-3 py-2 flex items-center justify-between border-t border-violet-500/10">
                    <span className="font-mono text-[10px]" style={{ color: alg.accentColor }}>{alg.label}</span>
                    <span className="font-mono text-[9px] text-violet-400/40">{alg.name}</span>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Component Showcase ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-violet-500/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="font-mono text-xs text-violet-400/50 tracking-widest block mb-3">
              SECTION_03 :: COMPONENT_SHOWCASE
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                Interface
              </span>{" "}
              Components
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.06} className="flex gap-2 mb-10">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setComponentTab(tab)}
                className={`px-5 py-2 font-mono text-xs tracking-wider rounded border transition-all duration-200 ${
                  componentTab === tab
                    ? "border-violet-500/60 text-violet-300 bg-violet-600/15"
                    : "border-violet-500/20 text-violet-400/50 hover:border-violet-500/40 hover:text-violet-400/80"
                }`}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div
              className="bg-[#111111] border border-violet-500/20 rounded-lg p-8 md:p-12"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.1)" }}
            >
              {/* Button showcase */}
              {componentTab === "button" && (
                <div className="space-y-10">
                  <div>
                    <div className="font-mono text-xs text-violet-400/40 mb-5 tracking-wider">
                      PRIMARY &mdash; violet fill, seed revealed on hover
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        onMouseEnter={() => setHoveredSeed(true)}
                        onMouseLeave={() => setHoveredSeed(false)}
                        className="group relative px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white font-mono text-sm tracking-wider rounded border border-violet-500 transition-all duration-200 overflow-hidden"
                        style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
                      >
                        <span className="transition-opacity duration-200 group-hover:opacity-0">
                          [ EXECUTE ]
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-violet-200 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                          SEED: {seed.toString().padStart(5, "0")}
                        </span>
                      </button>
                      <button className="px-7 py-3 bg-transparent text-violet-400 font-mono text-sm tracking-wider rounded border border-violet-500/40 hover:border-violet-500/70 hover:text-violet-300 transition-all duration-200">
                        [ RENDER ]
                      </button>
                      <button className="px-7 py-3 bg-teal-600/20 text-teal-300 font-mono text-sm tracking-wider rounded border border-teal-500/40 hover:border-teal-500/70 hover:bg-teal-600/30 transition-all duration-200">
                        [ COMPILE ]
                      </button>
                    </div>
                    {hoveredSeed && (
                      <div className="mt-4 font-mono text-xs text-violet-400/60">
                        seed={seed} &rarr; deterministic output for every parameter combination
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="font-mono text-xs text-violet-400/40 mb-5 tracking-wider">
                      ICON BUTTONS &mdash; command-style labels
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["PLOT", "TRACE", "EXPORT", "RESET"].map((label) => (
                        <button
                          key={label}
                          className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-violet-500/25 rounded font-mono text-xs text-violet-400/70 hover:border-violet-500/50 hover:text-violet-300 transition-all duration-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 opacity-70" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Card showcase */}
              {componentTab === "card" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Lissajous Render",
                      seed: seed,
                      color: "#7c3aed",
                      desc: "Parametric figure-eight. a=3, b=4, \u03b4=\u03c0/4. Phase offset produces the rotational angle.",
                    },
                    {
                      title: "Phyllotaxis Field",
                      seed: (seed + 42) % 99999,
                      color: "#14b8a6",
                      desc: "Golden angle spiral packing. 137.508\xb0 per step. Fibonacci series emerges at any scale.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group bg-[#0a0a0a] border border-violet-500/20 rounded-lg overflow-hidden hover:border-violet-500/40 transition-all duration-300 cursor-pointer"
                    >
                      {/* Pattern header */}
                      <div className="relative overflow-hidden" style={{ height: "120px" }}>
                        <svg width="100%" height="120" viewBox="0 0 300 120">
                          <rect width="300" height="120" fill="#0a0a0a" />
                          <LissajousPath seed={card.seed} width={300} height={120} color={card.color} strokeWidth={1} />
                          {Array.from({ length: 30 }, (_, i) => (
                            <circle
                              key={i}
                              cx={seededRand(card.seed, i + 50) * 300}
                              cy={seededRand(card.seed, i + 150) * 120}
                              r="1.5"
                              fill={card.color}
                              opacity={0.25 + seededRand(card.seed, i) * 0.4}
                            />
                          ))}
                        </svg>
                        <div className="absolute top-2 right-3 font-mono text-[9px] text-violet-400/50">
                          SEED:{card.seed.toString().padStart(5, "0")}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: `${card.color}99` }}>
                          ALGORITHM
                        </div>
                        <h3 className="font-mono text-sm font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-200">
                          {card.title}
                        </h3>
                        <p className="font-mono text-xs text-white/35 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input showcase */}
              {componentTab === "input" && (
                <div className="space-y-8 max-w-md">
                  <div className="font-mono text-xs text-violet-400/40 tracking-wider">
                    COORDINATE INPUT &mdash; displays algorithmic values
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-violet-400/50 tracking-wider mb-2">
                      X_COORDINATE
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={coordValue.x}
                        onChange={(e) => setCoordValue((v) => ({ ...v, x: Number(e.target.value) }))}
                        className="w-full bg-[#0a0a0a] border border-violet-500/30 rounded px-4 py-3 font-mono text-sm text-violet-300 focus:border-violet-500/60 focus:outline-none transition-colors duration-200"
                        placeholder="0.000"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-violet-400/40">px</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-violet-400/50 tracking-wider mb-2">
                      Y_COORDINATE
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={coordValue.y}
                        onChange={(e) => setCoordValue((v) => ({ ...v, y: Number(e.target.value) }))}
                        className="w-full bg-[#0a0a0a] border border-violet-500/30 rounded px-4 py-3 font-mono text-sm text-violet-300 focus:border-violet-500/60 focus:outline-none transition-colors duration-200"
                        placeholder="0.000"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-violet-400/40">px</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-violet-400/50 tracking-wider mb-2">
                      ALGORITHM_LABEL
                    </label>
                    <input
                      type="text"
                      defaultValue="lissajous_render_v1"
                      className="w-full bg-[#0a0a0a] border border-violet-500/30 rounded px-4 py-3 font-mono text-sm text-violet-300 focus:border-violet-500/60 focus:outline-none transition-colors duration-200"
                      placeholder="identifier_string"
                    />
                  </div>
                  {/* Live math output */}
                  <div className="bg-[#0a0a0a] border border-teal-500/20 rounded p-4">
                    <div className="font-mono text-[10px] text-teal-400/50 mb-2 tracking-wider">MATH_OUTPUT</div>
                    <div className="font-mono text-xs text-teal-300/80 space-y-1">
                      <div>sin({coordValue.x}) = {Math.sin(coordValue.x).toFixed(6)}</div>
                      <div>cos({coordValue.y}) = {Math.cos(coordValue.y).toFixed(6)}</div>
                      <div>dist = {Math.sqrt(coordValue.x ** 2 + coordValue.y ** 2).toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Color System — HSL Wheel ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-violet-500/10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="font-mono text-xs text-violet-400/50 tracking-widest block mb-3">
              SECTION_04 :: COLOR_SYSTEM
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                HSL
              </span>{" "}
              Color Architecture
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* HSL Wheel */}
            <RevealBlock delay={0.06}>
              <div
                className="bg-[#111111] border border-violet-500/20 rounded-lg p-8 flex flex-col items-center"
                style={{ boxShadow: "0 0 20px rgba(124,58,237,0.15)" }}
              >
                <div className="font-mono text-xs text-violet-400/40 mb-6 tracking-wider">
                  HSL_COLOR_WHEEL :: 360deg
                </div>
                <HslWheel />
                <div className="mt-6 font-mono text-xs text-violet-400/40 text-center space-y-1">
                  <div>5 accent positions</div>
                  <div className="text-violet-400/25">algorithmically distributed</div>
                </div>
              </div>
            </RevealBlock>

            {/* Accent swatches */}
            <RevealBlock delay={0.1}>
              <div className="space-y-4">
                {[
                  { name: "Violet", hex: "#7c3aed", hsl: "hsl(263, 80%, 57%)", h: 263, role: "Primary \u2014 dominant hue, UI identity" },
                  { name: "Blue",   hex: "#3b82f6", hsl: "hsl(217, 91%, 60%)", h: 217, role: "Secondary \u2014 links, highlights" },
                  { name: "Teal",   hex: "#14b8a6", hsl: "hsl(173, 80%, 40%)", h: 173, role: "Accent \u2014 data outputs, active states" },
                  { name: "Rose",   hex: "#f43f5e", hsl: "hsl(350, 89%, 60%)", h: 350, role: "Alert \u2014 errors, boundaries" },
                  { name: "Amber",  hex: "#f59e0b", hsl: "hsl(38, 92%, 50%)",  h: 38,  role: "Warm \u2014 warnings, seed highlights" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-4 p-3 bg-[#111111] border border-violet-500/15 rounded-lg hover:border-violet-500/30 transition-colors duration-200"
                  >
                    <div
                      className="w-10 h-10 rounded flex-shrink-0"
                      style={{ backgroundColor: c.hex, boxShadow: `0 0 12px ${c.hex}50` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm font-bold text-white mb-0.5">{c.name}</div>
                      <div className="font-mono text-xs text-violet-400/50">{c.hsl}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-xs text-white/30 mb-0.5">{c.hex}</div>
                      <div className="font-mono text-[9px] text-violet-400/30">H:{c.h}&deg;</div>
                    </div>
                  </div>
                ))}

                {/* Generation formula */}
                <div className="mt-4 bg-[#0a0a0a] border border-teal-500/20 rounded-lg p-4">
                  <div className="font-mono text-[10px] text-teal-400/50 mb-2 tracking-wider">PALETTE_GENERATION</div>
                  <div className="font-mono text-xs text-teal-300/70 space-y-1">
                    <div>hue(i) = (baseHue + i &times; step) % 360</div>
                    <div>step = 360 / colorCount</div>
                    <div>saturation = 75&ndash;92%</div>
                    <div>lightness = 40&ndash;60%</div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 6. Parameters Panel ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-violet-500/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="font-mono text-xs text-violet-400/50 tracking-widest block mb-3">
              SECTION_05 :: PARAMETERS_PANEL
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                Render
              </span>{" "}
              Parameters
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Controls */}
            <RevealBlock delay={0.06}>
              <div
                className="bg-[#111111] border border-violet-500/20 rounded-lg p-8"
                style={{ boxShadow: "0 0 20px rgba(124,58,237,0.1)" }}
              >
                <div className="font-mono text-xs text-violet-400/40 mb-6 tracking-wider">
                  CONTROL_SURFACE
                </div>

                {/* Seed */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-mono text-xs text-violet-400/60 tracking-wider">SEED_VALUE</label>
                    <div className="bg-[#0a0a0a] border border-violet-500/30 rounded font-mono px-3 py-1 text-violet-300 text-xs">
                      {seed.toString().padStart(5, "0")}
                    </div>
                  </div>
                  <input
                    type="range" min="0" max="99999" value={seed}
                    onChange={(e) => setSeed(Number(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #7c3aed ${(seed / 99999) * 100}%, #1f1f1f ${(seed / 99999) * 100}%)` }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[9px] text-violet-400/30">0</span>
                    <span className="font-mono text-[9px] text-violet-400/30">99999</span>
                  </div>
                </div>

                {/* Complexity */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-mono text-xs text-violet-400/60 tracking-wider">COMPLEXITY</label>
                    <span className="font-mono text-xs text-blue-300">{algorithmParams.complexity}/10</span>
                  </div>
                  <input
                    type="range" min="1" max="10" value={algorithmParams.complexity}
                    onChange={(e) => setAlgorithmParams((p) => ({ ...p, complexity: Number(e.target.value) }))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #3b82f6 ${algorithmParams.complexity * 10}%, #1f1f1f ${algorithmParams.complexity * 10}%)` }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[9px] text-violet-400/30">SIMPLE</span>
                    <span className="font-mono text-[9px] text-violet-400/30">COMPLEX</span>
                  </div>
                </div>

                {/* Chaos */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-mono text-xs text-violet-400/60 tracking-wider">CHAOS</label>
                    <span className="font-mono text-xs text-teal-300">{algorithmParams.chaos}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" value={algorithmParams.chaos}
                    onChange={(e) => setAlgorithmParams((p) => ({ ...p, chaos: Number(e.target.value) }))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #14b8a6 ${algorithmParams.chaos}%, #1f1f1f ${algorithmParams.chaos}%)` }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[9px] text-violet-400/30">ORDER</span>
                    <span className="font-mono text-[9px] text-violet-400/30">CHAOS</span>
                  </div>
                </div>

                {/* Color Shift */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-mono text-xs text-violet-400/60 tracking-wider">COLOR_SHIFT</label>
                    <span className="font-mono text-xs text-amber-300">{algorithmParams.colorShift}&deg;</span>
                  </div>
                  <input
                    type="range" min="0" max="360" value={algorithmParams.colorShift}
                    onChange={(e) => setAlgorithmParams((p) => ({ ...p, colorShift: Number(e.target.value) }))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, hsl(${algorithmParams.colorShift},75%,55%) 0%, #f59e0b 50%, #7c3aed 100%)` }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[9px] text-violet-400/30">0&deg;</span>
                    <span className="font-mono text-[9px] text-violet-400/30">360&deg;</span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Live preview */}
            <RevealBlock delay={0.1}>
              <div
                className="bg-[#111111] border border-violet-500/20 rounded-lg overflow-hidden"
                style={{ boxShadow: "0 0 20px rgba(124,58,237,0.15)" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-violet-500/15">
                  <span className="font-mono text-xs text-violet-400/50">preview_render.svg</span>
                  <div className="flex items-center gap-1.5 text-xs text-teal-400/60 font-mono">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    LIVE
                  </div>
                </div>
                <div className="p-4">
                  <ParameterPreview
                    seed={seed}
                    complexity={algorithmParams.complexity}
                    chaos={algorithmParams.chaos}
                    colorShift={algorithmParams.colorShift}
                  />
                </div>
                <div className="px-4 pb-4 space-y-1">
                  {[
                    { key: "seed",        val: seed.toString().padStart(5, "0") },
                    { key: "complexity",  val: `${algorithmParams.complexity}/10` },
                    { key: "chaos",       val: `${algorithmParams.chaos}%` },
                    { key: "color_shift", val: `${algorithmParams.colorShift}\xb0` },
                  ].map((p) => (
                    <div key={p.key} className="flex justify-between font-mono text-[10px]">
                      <span className="text-violet-400/40">{p.key}</span>
                      <span className="text-violet-300/70">{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 7. Do / Don&apos;t Rules ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-violet-500/10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="font-mono text-xs text-violet-400/50 tracking-widest block mb-3">
              SECTION_06 :: DESIGN_CONSTRAINTS
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                Algorithm
              </span>{" "}
              Rules
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO panel */}
            <RevealBlock delay={0.06}>
              <div className="bg-[#111111] border border-teal-500/25 rounded-lg overflow-hidden relative">
                {/* Background texture */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
                  <svg width="100%" height="100%" viewBox="0 0 300 500">
                    <SpiralDots seed={seed} width={300} height={500} />
                  </svg>
                </div>
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-5 rounded bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L4 7.5L8.5 2" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-mono text-sm font-bold text-teal-300 tracking-wider">DO</span>
                  </div>
                  <ul className="space-y-3">
                    {doRules.map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="font-mono text-[10px] text-teal-400/40 flex-shrink-0 mt-0.5 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-xs text-white/50 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON&apos;T panel */}
            <RevealBlock delay={0.1}>
              <div className="bg-[#111111] border border-rose-500/25 rounded-lg overflow-hidden relative">
                {/* Background texture */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05]">
                  <svg width="100%" height="100%" viewBox="0 0 300 500">
                    <LissajousPath seed={seed} width={300} height={500} color="#f43f5e" strokeWidth={0.8} />
                  </svg>
                </div>
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-5 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2L8 8M8 2L2 8" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-mono text-sm font-bold text-rose-300 tracking-wider">DON&apos;T</span>
                  </div>
                  <ul className="space-y-3">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="font-mono text-[10px] text-rose-400/40 flex-shrink-0 mt-0.5 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-xs text-white/40 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy statement */}
          <RevealBlock delay={0.16} className="mt-8">
            <div
              className="bg-[#111111] border border-violet-500/20 rounded-lg p-8 text-center relative overflow-hidden"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.1)" }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
                <svg width="100%" height="100%" viewBox="0 0 800 160">
                  <LissajousPath seed={seed} width={800} height={160} color="#7c3aed" strokeWidth={1} />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="font-mono text-xs text-violet-400/40 mb-4 tracking-widest">
                  AXIOM :: GENERATIVE_PHILOSOPHY
                </div>
                <p className="font-mono text-sm text-white/50 leading-relaxed max-w-2xl mx-auto">
                  &ldquo;The algorithm does not create beauty &mdash; it reveals the beauty already embedded
                  in mathematics. The seed is not a number; it is a coordinate in the infinite
                  space of all possible artworks.&rdquo;
                </p>
                <div className="mt-4 font-mono text-xs text-violet-400/30">
                  &mdash; Generative Art Principle
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Footer ===== */}
      <footer className="border-t border-violet-500/15 py-16 px-6 md:px-12 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <svg width="100%" height="100%" viewBox="0 0 800 200">
            <GridNoise seed={seed} width={800} height={200} />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            {/* Status */}
            <div>
              <div className="font-mono text-base font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  RENDERING COMPLETE
                </span>
              </div>
              <div className="font-mono text-xs text-violet-400/40">
                Part of StyleKit &mdash; generative design systems
              </div>
            </div>

            {/* Elapsed time counter */}
            <div
              className="bg-[#111111] border border-violet-500/25 rounded-lg px-6 py-3 text-center"
              style={{ boxShadow: "0 0 12px rgba(124,58,237,0.15)" }}
            >
              <div className="font-mono text-[10px] text-violet-400/40 mb-1 tracking-widest">ELAPSED_TIME</div>
              <div className="font-mono text-2xl font-bold text-violet-300">
                {elapsedTime.toFixed(1)}
                <span className="text-sm text-violet-400/50 ml-1">s</span>
              </div>
            </div>

            {/* Seed display */}
            <div className="bg-[#0a0a0a] border border-violet-500/30 rounded font-mono px-4 py-3">
              <div className="text-[10px] text-violet-400/40 mb-1 tracking-widest">FINAL_SEED</div>
              <div className="text-violet-300 font-bold tracking-wider">{seed.toString().padStart(5, "0")}</div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-violet-500/10">
            <div className="font-mono text-xs text-violet-400/30">
              &copy; 2025 StyleKit &mdash; Generative Art Design System
            </div>

            {/* Accent dots */}
            <div className="flex items-center gap-2">
              {accentColors.map((c) => (
                <div
                  key={c}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c, boxShadow: `0 0 6px ${c}60` }}
                />
              ))}
            </div>

            <nav className="flex items-center gap-6">
              <Link href="/styles/generative-art" className="font-mono text-xs text-violet-400/30 hover:text-violet-400/70 transition-colors duration-200">
                Docs
              </Link>
              <Link href="/styles" className="font-mono text-xs text-violet-400/30 hover:text-violet-400/70 transition-colors duration-200">
                All Styles
              </Link>
              <Link href="/" className="font-mono text-xs text-violet-400/30 hover:text-violet-400/70 transition-colors duration-200">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </footer>

    </div>
  );
}
