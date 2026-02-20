"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const colorSwatches = [
  {
    name: "BLUEPRINT BLUE",
    code: "PRIMARY",
    hex: "#1e3a5f",
    bg: "bg-[#1e3a5f]",
    border: false,
    label: "BG-01",
    desc: "Primary background — deep cyanotype base",
  },
  {
    name: "WHITE LINE",
    code: "SECONDARY",
    hex: "#ffffff",
    bg: "bg-white",
    border: true,
    label: "FG-01",
    desc: "Primary line — vector ink on cyanotype",
  },
  {
    name: "LIGHT BLUE",
    code: "ACCENT-A",
    hex: "#4a90d9",
    bg: "bg-[#4a90d9]",
    border: false,
    label: "AC-01",
    desc: "Accent A — active states, highlights",
  },
  {
    name: "DIMENSION ORANGE",
    code: "ACCENT-B",
    hex: "#ff6b35",
    bg: "bg-[#ff6b35]",
    border: false,
    label: "AC-02",
    desc: "Accent B — annotation, callout lines",
  },
  {
    name: "PALE BLUE",
    code: "ACCENT-C",
    hex: "#a0c4e8",
    bg: "bg-[#a0c4e8]",
    border: false,
    label: "AC-03",
    desc: "Accent C — muted text, grid guides",
  },
];

const specPanels = [
  {
    id: "A-1",
    title: "GRID SYSTEM",
    subtitle: "Orthographic framework",
    spec: "24px base unit — 4px minor grid",
    desc: "The underlying coordinate system establishes every element's position. Grid lines are always present at 15% opacity, providing spatial context without visual noise.",
    value: "24",
    unit: "PX GRID",
  },
  {
    id: "B-2",
    title: "TYPOGRAPHY",
    subtitle: "Monospace precision",
    spec: "font-mono — tracked uppercase labels",
    desc: "All text uses monospace rendering. Technical data, labels, and annotations align to character width. Proportional fonts are structurally inadmissible in blueprint specifications.",
    value: "1:1",
    unit: "CHAR RATIO",
  },
  {
    id: "C-3",
    title: "ANNOTATION LINES",
    subtitle: "Dimension callouts",
    spec: "1px stroke — arrow endpoints — orange",
    desc: "Dimension lines mark distances, tolerances, and layout measurements. Always rendered in annotation orange (#ff6b35) with arrowhead terminations at both endpoints.",
    value: "1px",
    unit: "STROKE WT",
  },
];

const doRules = [
  "Blueprint blue background `bg-[#1e3a5f]` as the only permitted base",
  "`font-mono` for all text — technical data demands monospace precision",
  "White lines `text-white` and `border-white/30` for primary visual elements",
  "Grid dot pattern at 15% opacity using radial-gradient background",
  "Orange `#ff6b35` strictly for dimension callouts and annotation markers",
  "Corner bracket markers on all panel elements — engineering standard",
  "Thin 1px borders — `border border-white/30` or `border-[#4a90d9]/50`",
  "Uppercase tracking labels — `uppercase tracking-widest` for all tags",
];

const dontRules = [
  "Never use warm or light backgrounds — no whites, creams, or grays",
  "Never use serif, sans-serif, or display fonts — `font-mono` only",
  "Never use colorful gradients — only blue-range tonal shifts permitted",
  "Never use `rounded-2xl` or pill shapes — engineering uses sharp corners",
  "Never use drop shadows or glows — precision requires clean edges",
  "Never use decorative flourishes — every element must serve a function",
  "Never use centered body text — left-aligned columns only",
  "Never omit the grid pattern — spatial context is always required",
];

const technicalComponents = [
  {
    id: "button",
    label: "BUTTONS",
    ref: "CTL-01",
  },
  {
    id: "card",
    label: "PANELS",
    ref: "CTL-02",
  },
  {
    id: "input",
    label: "INPUTS",
    ref: "CTL-03",
  },
];

const floorPlanRooms = [
  { x: 20, y: 20, w: 160, h: 120, label: "LIVING AREA", ref: "R-01" },
  { x: 200, y: 20, w: 100, h: 120, label: "KITCHEN", ref: "R-02" },
  { x: 20, y: 160, w: 120, h: 100, label: "BED 01", ref: "R-03" },
  { x: 160, y: 160, w: 140, h: 100, label: "BED 02", ref: "R-04" },
  { x: 20, y: 278, w: 280, h: 40, label: "CORRIDOR · REF C-01", ref: "C-01" },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
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
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CornerMarkers({ className = "" }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40 pointer-events-none ${className}`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40 pointer-events-none ${className}`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40 pointer-events-none ${className}`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40 pointer-events-none ${className}`} />
    </>
  );
}

function AnnotationLine({
  horizontal = true,
  label,
  className = "",
}: {
  horizontal?: boolean;
  label: string;
  className?: string;
}) {
  if (horizontal) {
    return (
      <div className={`flex items-center gap-0 ${className}`}>
        {/* Left arrowhead */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
          <path d="M9 5H1M1 5L5 1M1 5L5 9" stroke="#ff6b35" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Line */}
        <div className="flex-1 h-px bg-[#ff6b35]/60" />
        {/* Label */}
        <span className="px-2 text-[9px] font-mono uppercase tracking-wider text-[#ff6b35] whitespace-nowrap">
          {label}
        </span>
        {/* Line */}
        <div className="flex-1 h-px bg-[#ff6b35]/60" />
        {/* Right arrowhead */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
          <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="#ff6b35" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`flex flex-col items-center gap-0 ${className}`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
        <path d="M5 9V1M5 1L1 5M5 1L9 5" stroke="#ff6b35" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex-1 w-px bg-[#ff6b35]/60" />
      <span className="px-1 py-1 text-[9px] font-mono uppercase tracking-wider text-[#ff6b35] whitespace-nowrap" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>
        {label}
      </span>
      <div className="flex-1 w-px bg-[#ff6b35]/60" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
        <path d="M5 1V9M5 9L1 5M5 9L9 5" stroke="#ff6b35" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionRef({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-[#ff6b35]" />
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#ff6b35]">{label}</span>
      <div className="w-8 h-px bg-[#ff6b35]" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-mono font-bold text-white uppercase tracking-wider mb-3">
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-mono text-[#a0c4e8]/60 uppercase tracking-widest mb-12">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Floor Plan                                                     */
/* ------------------------------------------------------------------ */

function FloorPlanSVG() {
  return (
    <svg
      viewBox="0 0 320 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ maxHeight: "340px" }}
    >
      {/* Background grid */}
      <defs>
        <pattern id="svgGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        </pattern>
        <pattern id="svgDots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.8" fill="rgba(255,255,255,0.12)" />
        </pattern>
      </defs>

      {/* Grid fill */}
      <rect x="0" y="0" width="320" height="340" fill="url(#svgGrid)" />

      {/* Outer boundary */}
      <rect x="10" y="10" width="300" height="320" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />

      {/* Rooms */}
      {floorPlanRooms.map((room) => (
        <g key={room.ref}>
          <rect
            x={room.x}
            y={room.y}
            width={room.w}
            height={room.h}
            fill="rgba(74,144,217,0.06)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
          {/* Room label */}
          <text
            x={room.x + room.w / 2}
            y={room.y + room.h / 2 - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(160,196,232,0.7)"
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="1"
          >
            {room.label}
          </text>
          {/* Room ref */}
          <text
            x={room.x + room.w / 2}
            y={room.y + room.h / 2 + 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,107,53,0.7)"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="1"
          >
            {room.ref}
          </text>
        </g>
      ))}

      {/* Door openings */}
      {/* Living room door arc */}
      <path
        d="M 160 20 A 20 20 0 0 1 160 40"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
        strokeDasharray="3,2"
        fill="none"
      />
      <line x1="160" y1="20" x2="160" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

      {/* Bed 01 door arc */}
      <path
        d="M 120 200 A 16 16 0 0 0 120 216"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
        strokeDasharray="3,2"
        fill="none"
      />

      {/* Dimension lines */}
      {/* Width of building */}
      <line x1="10" y1="6" x2="310" y2="6" stroke="#ff6b35" strokeWidth="0.8" opacity="0.6" />
      <path d="M10 3L10 9" stroke="#ff6b35" strokeWidth="0.8" opacity="0.6" />
      <path d="M310 3L310 9" stroke="#ff6b35" strokeWidth="0.8" opacity="0.6" />
      <text x="160" y="4" textAnchor="middle" dominantBaseline="auto" fill="#ff6b35" fontSize="6" fontFamily="monospace" opacity="0.8">
        18000mm
      </text>

      {/* Height of building */}
      <line x1="314" y1="10" x2="314" y2="330" stroke="#ff6b35" strokeWidth="0.8" opacity="0.6" />
      <path d="M311 10L317 10" stroke="#ff6b35" strokeWidth="0.8" opacity="0.6" />
      <path d="M311 330L317 330" stroke="#ff6b35" strokeWidth="0.8" opacity="0.6" />
      <text
        x="318"
        y="170"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ff6b35"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.8"
        transform="rotate(90, 318, 170)"
      >
        20000mm
      </text>

      {/* Living room width dim */}
      <line x1="20" y1="148" x2="180" y2="148" stroke="#ff6b35" strokeWidth="0.7" opacity="0.5" />
      <path d="M20 145L20 151" stroke="#ff6b35" strokeWidth="0.7" opacity="0.5" />
      <path d="M180 145L180 151" stroke="#ff6b35" strokeWidth="0.7" opacity="0.5" />
      <text x="100" y="146" textAnchor="middle" dominantBaseline="auto" fill="#ff6b35" fontSize="5.5" fontFamily="monospace" opacity="0.7">
        9600mm
      </text>

      {/* Coordinate markers */}
      <circle cx="10" cy="10" r="2" fill="none" stroke="rgba(74,144,217,0.8)" strokeWidth="0.8" />
      <text x="13" y="9" fill="rgba(74,144,217,0.6)" fontSize="5" fontFamily="monospace">0,0</text>

      <circle cx="310" cy="10" r="2" fill="none" stroke="rgba(74,144,217,0.8)" strokeWidth="0.8" />
      <text x="298" y="9" fill="rgba(74,144,217,0.6)" fontSize="5" fontFamily="monospace">18,0</text>

      <circle cx="10" cy="330" r="2" fill="none" stroke="rgba(74,144,217,0.8)" strokeWidth="0.8" />
      <text x="13" y="334" fill="rgba(74,144,217,0.6)" fontSize="5" fontFamily="monospace">0,20</text>

      {/* North indicator */}
      <g transform="translate(285, 300)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        <path d="M0 -8 L3 4 L0 2 L-3 4 Z" fill="rgba(255,255,255,0.6)" />
        <text x="0" y="6" textAnchor="middle" fill="rgba(160,196,232,0.7)" fontSize="5" fontFamily="monospace">N</text>
      </g>

      {/* Scale indicator */}
      <g transform="translate(20, 320)">
        <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <line x1="40" y1="-3" x2="40" y2="3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <text x="20" y="-5" textAnchor="middle" fill="rgba(160,196,232,0.5)" fontSize="5" fontFamily="monospace">
          1:100
        </text>
      </g>

      {/* Title block */}
      <rect x="10" y="296" width="180" height="24" fill="rgba(26,58,95,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <text x="20" y="306" fill="rgba(160,196,232,0.7)" fontSize="6" fontFamily="monospace" letterSpacing="0.5">
        DWG: FLOOR-PLAN-01
      </text>
      <text x="20" y="316" fill="rgba(255,107,53,0.6)" fontSize="5.5" fontFamily="monospace">
        REV 1.0 · 2026-02-20
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Circuit/Schematic SVG                                              */
/* ------------------------------------------------------------------ */

function SchematicSVG() {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ maxHeight: "200px" }}
    >
      <defs>
        <pattern id="schGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.7" fill="rgba(255,255,255,0.1)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="360" height="200" fill="url(#schGrid)" />

      {/* Main horizontal bus */}
      <line x1="20" y1="100" x2="340" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Vertical drops */}
      <line x1="60" y1="60" x2="60" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="140" y1="40" x2="140" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="220" y1="55" x2="220" y2="145" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="300" y1="65" x2="300" y2="135" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Junction nodes */}
      <circle cx="60" cy="100" r="3" fill="rgba(74,144,217,0.8)" />
      <circle cx="140" cy="100" r="3" fill="rgba(74,144,217,0.8)" />
      <circle cx="220" cy="100" r="3" fill="rgba(74,144,217,0.8)" />
      <circle cx="300" cy="100" r="3" fill="rgba(74,144,217,0.8)" />

      {/* Component boxes */}
      {/* Component A */}
      <rect x="40" y="55" width="40" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      <text x="60" y="70" textAnchor="middle" dominantBaseline="middle" fill="rgba(160,196,232,0.9)" fontSize="7" fontFamily="monospace">CTL-A</text>

      {/* Component B */}
      <rect x="115" y="35" width="50" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,107,53,0.5)" strokeWidth="0.8" />
      <text x="140" y="49" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,107,53,0.9)" fontSize="7" fontFamily="monospace">MOD-B</text>

      {/* Component C */}
      <rect x="198" y="50" width="44" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      <text x="220" y="64" textAnchor="middle" dominantBaseline="middle" fill="rgba(160,196,232,0.9)" fontSize="7" fontFamily="monospace">INT-C</text>

      {/* Component D */}
      <rect x="278" y="60" width="44" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(74,144,217,0.6)" strokeWidth="0.8" />
      <text x="300" y="74" textAnchor="middle" dominantBaseline="middle" fill="rgba(74,144,217,0.9)" fontSize="7" fontFamily="monospace">OUT-D</text>

      {/* Bottom components */}
      <rect x="40" y="120" width="40" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <text x="60" y="134" textAnchor="middle" dominantBaseline="middle" fill="rgba(160,196,232,0.6)" fontSize="7" fontFamily="monospace">REF-1</text>

      <rect x="115" y="138" width="50" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <text x="140" y="152" textAnchor="middle" dominantBaseline="middle" fill="rgba(160,196,232,0.6)" fontSize="7" fontFamily="monospace">REF-2</text>

      <rect x="198" y="122" width="44" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <text x="220" y="136" textAnchor="middle" dominantBaseline="middle" fill="rgba(160,196,232,0.6)" fontSize="7" fontFamily="monospace">REF-3</text>

      <rect x="278" y="114" width="44" height="22" fill="rgba(26,58,95,0.8)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <text x="300" y="128" textAnchor="middle" dominantBaseline="middle" fill="rgba(160,196,232,0.6)" fontSize="7" fontFamily="monospace">REF-4</text>

      {/* Power rail label */}
      <text x="22" y="96" fill="rgba(255,107,53,0.7)" fontSize="6" fontFamily="monospace">VCC</text>

      {/* Dimension annotation */}
      <line x1="20" y1="185" x2="340" y2="185" stroke="#ff6b35" strokeWidth="0.7" opacity="0.5" />
      <path d="M20 182L20 188" stroke="#ff6b35" strokeWidth="0.7" opacity="0.5" />
      <path d="M340 182L340 188" stroke="#ff6b35" strokeWidth="0.7" opacity="0.5" />
      <text x="180" y="183" textAnchor="middle" dominantBaseline="auto" fill="#ff6b35" fontSize="6" fontFamily="monospace" opacity="0.7">
        SCHEMATIC · SYS-ARCH-02 · REV 1.0
      </text>

      {/* Signal flow arrows */}
      <path d="M100 100L108 97L108 103Z" fill="rgba(255,255,255,0.25)" />
      <path d="M180 100L188 97L188 103Z" fill="rgba(255,255,255,0.25)" />
      <path d="M260 100L268 97L268 103Z" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"button" | "card" | "input">("button");
  const [activeSpec, setActiveSpec] = useState(0);

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Suppress unused warning — heroInView used implicitly via heroRevealed pattern
  void heroInView;

  return (
    <div
      className="min-h-screen bg-[#1e3a5f] text-white font-mono overflow-x-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >

      {/* ===== 1. Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f]/95 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-2 text-[#a0c4e8] hover:text-white transition-colors duration-200 group"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              >
                <path d="M10 12L6 8l4-4" />
              </svg>
              <span className="text-xs font-mono uppercase tracking-widest">StyleKit</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
                <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* Blueprint grid icon */}
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 border border-white/40" />
                <div className="absolute inset-0 border border-white/20" style={{ transform: "scale(0.6)" }} />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30" />
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-white">
                Blueprint
              </span>
              <span className="font-mono text-[10px] text-[#4a90d9]/70 tracking-widest border border-[#4a90d9]/30 px-1.5 py-0.5">
                [v1.0.0]
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: "Hero", href: "#hero" },
                { label: "Components", href: "#components" },
                { label: "Palette", href: "#palette" },
                { label: "Grid", href: "#grid" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[10px] font-mono uppercase tracking-widest text-[#a0c4e8]/50 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section id="hero" ref={heroRef} className="relative pt-28 md:pt-36 pb-20 px-6 md:px-12 overflow-hidden min-h-screen flex items-center">

        {/* Subtle secondary grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        {/* Blueprint tonal gradient — dark top-left corner */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(74,144,217,0.08) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(26,48,80,0.5) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Left: text content */}
            <div>
              {/* Section reference */}
              <div
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <SectionRef label="Section A-1 · Hero Spec" />
              </div>

              {/* Main headline */}
              <h1
                className="font-mono font-bold text-white uppercase leading-none tracking-wider mb-6"
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                工程
                <br />
                <span className="text-[#4a90d9]">蓝图</span>
              </h1>

              {/* English subtitle with annotation line */}
              <div
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                <AnnotationLine horizontal label="Blueprint Design System" className="mb-6 max-w-xs" />
              </div>

              <p
                className="font-mono text-[#a0c4e8]/70 leading-relaxed mb-8 max-w-md"
                style={{
                  fontSize: "0.875rem",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                Cyanotype blueprint printing and modern engineering drawings. White lines on deep blue. Grid systems, annotation lines, dimension markers. Precision, professionalism, technical trust.
              </p>

              {/* Technical metadata strip */}
              <div
                className="flex flex-wrap gap-4 mb-10"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.38s",
                }}
              >
                {[
                  { label: "SCALE", value: "1:100" },
                  { label: "REV", value: "1.0.0" },
                  { label: "DATE", value: "2026-02-20" },
                  { label: "PROJ", value: "STYLEKIT" },
                ].map((meta) => (
                  <div key={meta.label} className="border border-white/20 px-3 py-1.5">
                    <span className="text-[9px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest block">
                      {meta.label}
                    </span>
                    <span className="text-xs font-mono text-white tracking-wider">
                      {meta.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s",
                }}
              >
                <button className="group relative px-8 py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest text-sm hover:bg-[#a0c4e8] transition-colors duration-200 flex items-center gap-3">
                  <span>Inspect Blueprint</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </button>
                <button className="group px-8 py-3 bg-transparent border border-white/40 text-white font-mono uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center gap-3">
                  <span>View Specs</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Floor Plan SVG */}
            <div
              className="relative"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              {/* Panel container */}
              <div className="relative border border-white/25 bg-[#142d4a]/60">
                <CornerMarkers />

                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/15">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60">
                    DWG: FLOOR-PLAN-01
                  </span>
                  <span className="text-[9px] font-mono text-[#ff6b35]/70 tracking-wider">
                    SECTION A-1
                  </span>
                </div>

                {/* SVG */}
                <div className="p-4">
                  <FloorPlanSVG />
                </div>

                {/* Panel footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-white/15">
                  <span className="text-[9px] font-mono text-[#a0c4e8]/40 uppercase tracking-widest">
                    Scale 1:100 · All dims in mm
                  </span>
                  <span className="text-[9px] font-mono text-[#a0c4e8]/40 uppercase tracking-widest">
                    Rev 1.0
                  </span>
                </div>
              </div>

              {/* Outer dimension annotation */}
              <div className="mt-3 px-4">
                <AnnotationLine horizontal label="Total width 18,000mm · 4 structural bays" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section id="components" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#142d4a]/50">

        {/* Reinforcing grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <SectionRef label="Section B-1 · Component Specs" />
            <SectionTitle>Component Demos</SectionTitle>
            <SectionSubtitle>Control elements — engineering standard</SectionSubtitle>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08} className="flex border-b border-white/20 mb-10">
            {technicalComponents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setComponentTab(tab.id as typeof componentTab)}
                className={`relative flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-widest border-b-2 -mb-px transition-all duration-200 ${
                  componentTab === tab.id
                    ? "text-white border-[#ff6b35]"
                    : "text-[#a0c4e8]/40 border-transparent hover:text-[#a0c4e8]/70"
                }`}
              >
                {tab.label}
                <span className="text-[9px] text-[#ff6b35]/60">{tab.ref}</span>
              </button>
            ))}
          </RevealBlock>

          {/* Component panels */}
          <RevealBlock delay={0.14}>
            <div className="relative border border-white/20 bg-[#1e3a5f]/60">
              <CornerMarkers />

              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/15">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/50">
                  {technicalComponents.find((t) => t.id === componentTab)?.label} · DEMO PANEL
                </span>
                <span className="text-[9px] font-mono text-[#ff6b35]/60 tracking-wider">
                  {technicalComponents.find((t) => t.id === componentTab)?.ref}
                </span>
              </div>

              <div className="p-8 md:p-12">
                {/* BUTTONS */}
                {componentTab === "button" && (
                  <div className="space-y-10">
                    <div>
                      <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-5">
                        Primary — white fill / invert on hover
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <button className="group px-7 py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest text-xs hover:bg-[#a0c4e8] transition-colors duration-200 flex items-center gap-2">
                          Execute
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                            <path d="M1 6h10M7 2l4 4-4 4" />
                          </svg>
                        </button>
                        <button className="group px-7 py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest text-xs hover:bg-[#a0c4e8] transition-colors duration-200">
                          Compile
                        </button>
                        <button className="group px-7 py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest text-xs hover:bg-[#a0c4e8] transition-colors duration-200">
                          Verify
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-5">
                        Secondary — white border + white text
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <button className="group px-7 py-3 bg-transparent border border-white/40 text-white font-mono uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center gap-2">
                          Annotate
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                            <path d="M1 6h10M7 2l4 4-4 4" />
                          </svg>
                        </button>
                        <button className="group px-7 py-3 bg-transparent border border-white/40 text-white font-mono uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white transition-all duration-200">
                          Measure
                        </button>
                        <button className="group px-7 py-3 bg-transparent border border-white/40 text-white font-mono uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white transition-all duration-200">
                          Review
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-5">
                        Callout — orange annotation accent
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <button className="group px-7 py-3 bg-transparent border border-[#ff6b35]/50 text-[#ff6b35] font-mono uppercase tracking-widest text-xs hover:bg-[#ff6b35]/10 hover:border-[#ff6b35] transition-all duration-200 flex items-center gap-2">
                          Callout
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="5" cy="5" r="4" />
                            <path d="M5 3v2.5M5 7v.5" />
                          </svg>
                        </button>
                        <button className="group px-7 py-3 bg-transparent border border-[#ff6b35]/50 text-[#ff6b35] font-mono uppercase tracking-widest text-xs hover:bg-[#ff6b35]/10 hover:border-[#ff6b35] transition-all duration-200">
                          Flag Section
                        </button>
                        <button className="group px-7 py-3 bg-transparent border border-white/15 text-white/25 font-mono uppercase tracking-widest text-xs cursor-not-allowed">
                          Locked
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARD / PANELS */}
                {componentTab === "card" && (
                  <div className="space-y-6">
                    <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-6">
                      Blueprint panel — annotation border, corner markers, section ref
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          ref: "A-2",
                          title: "Structural Overview",
                          desc: "Cross-section analysis of the primary load-bearing framework. Stress distribution verified to tolerance.",
                          accent: "rgba(74,144,217,0.5)",
                          textAccent: "text-[#4a90d9]",
                        },
                        {
                          ref: "B-3",
                          title: "Dimensional Spec",
                          desc: "Precise measurements for all critical junction points. Tolerance compliance verified per standard.",
                          accent: "rgba(255,107,53,0.5)",
                          textAccent: "text-[#ff6b35]",
                        },
                        {
                          ref: "C-4",
                          title: "Reference Grid",
                          desc: "Coordinate system overlay. Origin at datum marker. Major and minor grid lines included.",
                          accent: "rgba(160,196,232,0.5)",
                          textAccent: "text-[#a0c4e8]",
                        },
                      ].map((card) => (
                        <div
                          key={card.ref}
                          className="group relative border border-white/20 bg-[#1e3a5f]/40 p-6 hover:bg-white/5 transition-all duration-200"
                          style={{ borderTopColor: card.accent }}
                        >
                          <CornerMarkers />
                          {/* Section ref strip */}
                          <div className="flex items-center gap-2 mb-5">
                            <div className="w-2 h-px bg-[#ff6b35]" />
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff6b35]">
                              SECTION {card.ref}
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                          </div>

                          {/* Inline SVG icon */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <rect x="1" y="1" width="18" height="18" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                            <line x1="1" y1="10" x2="19" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                            <line x1="10" y1="1" x2="10" y2="19" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                            <circle cx="10" cy="10" r="2.5" fill="none" stroke="rgba(74,144,217,0.8)" strokeWidth="1" />
                          </svg>

                          <h3 className={`text-sm font-mono font-bold uppercase tracking-wider mb-3 group-hover:text-white transition-colors duration-200 ${card.textAccent}`}>
                            {card.title}
                          </h3>
                          <p className="text-xs font-mono text-[#a0c4e8]/55 leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* INPUTS */}
                {componentTab === "input" && (
                  <div className="space-y-6 max-w-md">
                    <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-6">
                      Data entry — monospace, transparent bg, sharp border
                    </p>

                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60 mb-2">
                        Engineer ID
                      </label>
                      <input
                        type="text"
                        placeholder="ENG-001..."
                        className="w-full px-4 py-3 bg-transparent border border-white/30 text-white font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#4a90d9] focus:bg-[#1e3a5f]/40 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60 mb-2">
                        Project Reference
                      </label>
                      <input
                        type="text"
                        placeholder="PRJ-2026-001..."
                        className="w-full px-4 py-3 bg-transparent border border-white/30 text-white font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#4a90d9] focus:bg-[#1e3a5f]/40 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60 mb-2">
                        Technical Notes
                      </label>
                      <textarea
                        placeholder="Enter specifications..."
                        rows={3}
                        className="w-full px-4 py-3 bg-transparent border border-white/30 text-white font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#4a90d9] focus:bg-[#1e3a5f]/40 transition-all duration-200 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60 mb-2">
                        Classification
                      </label>
                      <select className="w-full px-4 py-3 bg-[#1e3a5f] border border-white/30 text-white font-mono text-sm focus:outline-none focus:border-[#4a90d9] transition-all duration-200">
                        <option value="structural">STRUCTURAL · CLASS A</option>
                        <option value="mechanical">MECHANICAL · CLASS B</option>
                        <option value="electrical">ELECTRICAL · CLASS C</option>
                      </select>
                    </div>

                    <button className="w-full py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest text-xs hover:bg-[#a0c4e8] transition-colors duration-200">
                      Submit Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section id="palette" className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <SectionRef label="Section C-1 · Color Specification" />
            <SectionTitle>Color Palette</SectionTitle>
            <SectionSubtitle>Cyanotype spectrum — 5 engineering-labelled swatches</SectionSubtitle>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.07}>
                <div className="group relative border border-white/20 hover:border-white/40 transition-border duration-200">
                  <CornerMarkers />

                  {/* Swatch color block */}
                  <div
                    className={`${swatch.bg} h-32 w-full ${swatch.border ? "border border-white/30" : ""} flex items-end p-3`}
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/50 border border-white/20 px-1.5 py-0.5">
                      {swatch.label}
                    </span>
                  </div>

                  {/* Swatch info */}
                  <div className="p-4 bg-[#142d4a]/60">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-px bg-[#ff6b35]" />
                      <span className="text-[9px] font-mono text-[#ff6b35] uppercase tracking-widest">
                        {swatch.code}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-white font-bold uppercase tracking-wide mb-1">
                      {swatch.name}
                    </p>
                    <p className="text-[10px] font-mono text-[#4a90d9] tracking-wider mb-2">
                      {swatch.hex}
                    </p>
                    <p className="text-[9px] font-mono text-[#a0c4e8]/50 leading-relaxed">
                      {swatch.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color annotation strip */}
          <RevealBlock delay={0.4} className="mt-8">
            <AnnotationLine horizontal label="5 colors · Cyanotype-derived palette · No warm tones" />
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Grid System ===== */}
      <section id="grid" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#142d4a]/60">
        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <SectionRef label="Section D-1 · Grid Specification" />
            <SectionTitle>Grid System</SectionTitle>
            <SectionSubtitle>Orthographic framework — 24px base unit</SectionSubtitle>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            {/* Left: grid visualization */}
            <RevealBlock delay={0.08}>
              <div className="relative border border-white/20 bg-[#1e3a5f]/60">
                <CornerMarkers />

                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/15">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60">
                    Grid Pattern Demo
                  </span>
                  <span className="text-[9px] font-mono text-[#ff6b35]/60">24px unit</span>
                </div>

                {/* Dot pattern block */}
                <div
                  className="h-56 w-full relative"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                >
                  {/* Grid lines overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "120px 120px",
                    }}
                  />

                  {/* Dimension annotations on the grid */}
                  {/* Horizontal measurement */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <AnnotationLine horizontal label="24px minor unit" />
                  </div>

                  {/* Coordinate label */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-mono text-[#4a90d9]/70 border border-[#4a90d9]/30 px-1.5 py-0.5">
                      0,0
                    </span>
                  </div>

                  {/* Sample element placed on grid */}
                  <div className="absolute top-10 left-[96px] w-24 h-16 border border-[#ff6b35]/50 bg-[#ff6b35]/05 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-[#ff6b35]/70 uppercase">on-grid</span>
                  </div>

                  {/* Grid coordinate labels */}
                  <div className="absolute top-2 right-4 text-[9px] font-mono text-[#a0c4e8]/40">
                    x: 280px
                  </div>
                </div>

                {/* Grid specs */}
                <div className="px-4 py-3 border-t border-white/15">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "BASE", value: "24px" },
                      { label: "MINOR", value: "4px" },
                      { label: "MAJOR", value: "120px" },
                    ].map((spec) => (
                      <div key={spec.label} className="text-center">
                        <span className="text-[8px] font-mono text-[#a0c4e8]/40 uppercase tracking-widest block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-mono text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Right: column demonstration */}
            <RevealBlock delay={0.15}>
              <div className="space-y-5">
                <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-4">
                  Column layouts — engineering grid divisions
                </p>

                {/* 12 columns */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-[#ff6b35]/70 uppercase tracking-widest">12 COL</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <div className="grid grid-cols-12 gap-1 h-8">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-[#4a90d9]/15 border border-[#4a90d9]/30 flex items-center justify-center"
                      >
                        <span className="text-[7px] font-mono text-[#4a90d9]/50">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8/4 split */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-[#ff6b35]/70 uppercase tracking-widest">8 / 4</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[8px] font-mono text-[#a0c4e8]/40">Content + Sidebar</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 h-10">
                    <div className="col-span-8 bg-white/10 border border-white/20 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#a0c4e8]/60 uppercase">Primary</span>
                    </div>
                    <div className="col-span-4 bg-[#4a90d9]/15 border border-[#4a90d9]/30 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#4a90d9]/70 uppercase">Aside</span>
                    </div>
                  </div>
                </div>

                {/* 6/6 split */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-[#ff6b35]/70 uppercase tracking-widest">6 / 6</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[8px] font-mono text-[#a0c4e8]/40">Equal split</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 h-10">
                    <div className="col-span-6 bg-white/10 border border-white/20 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#a0c4e8]/60 uppercase">Col A</span>
                    </div>
                    <div className="col-span-6 bg-white/10 border border-white/20 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#a0c4e8]/60 uppercase">Col B</span>
                    </div>
                  </div>
                </div>

                {/* 3/9 split */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-[#ff6b35]/70 uppercase tracking-widest">3 / 9</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[8px] font-mono text-[#a0c4e8]/40">Index + Content</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 h-10">
                    <div className="col-span-3 bg-[#ff6b35]/10 border border-[#ff6b35]/30 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#ff6b35]/70 uppercase">Idx</span>
                    </div>
                    <div className="col-span-9 bg-white/10 border border-white/20 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#a0c4e8]/60 uppercase">Extended Content Zone</span>
                    </div>
                  </div>
                </div>

                {/* Annotation note */}
                <div className="pt-2">
                  <AnnotationLine horizontal label="Gap: 16px — gutter specification" />
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Technical schematic beneath */}
          <RevealBlock delay={0.2} className="mt-12">
            <div className="relative border border-white/20 bg-[#1e3a5f]/60">
              <CornerMarkers />
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/15">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/60">
                  SYS-ARCH-02 · System Schematic
                </span>
                <span className="text-[9px] font-mono text-[#ff6b35]/60">Section D-2</span>
              </div>
              <div className="p-4">
                <SchematicSVG />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Spec Panels / Technical Details ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <SectionRef label="Section E-1 · Technical Specifications" />
            <SectionTitle>Specification Panels</SectionTitle>
            <SectionSubtitle>Engineering-standard data sheets</SectionSubtitle>
          </RevealBlock>

          {/* Spec tab switcher */}
          <RevealBlock delay={0.08} className="flex gap-2 mb-8 flex-wrap">
            {specPanels.map((panel, i) => (
              <button
                key={panel.id}
                onClick={() => setActiveSpec(i)}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-200 ${
                  activeSpec === i
                    ? "bg-white text-[#1e3a5f] border-white"
                    : "bg-transparent text-[#a0c4e8]/50 border-white/20 hover:border-white/50 hover:text-[#a0c4e8]"
                }`}
              >
                {panel.id} · {panel.title}
              </button>
            ))}
          </RevealBlock>

          <RevealBlock delay={0.14}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">

              {/* Large spec card */}
              <div className="md:col-span-2 relative border border-white/20 bg-[#1e3a5f]/60 p-8 md:p-10">
                <CornerMarkers />

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-px bg-[#ff6b35]" />
                  <span className="text-[9px] font-mono text-[#ff6b35] uppercase tracking-widest">
                    SPEC · {specPanels[activeSpec].id}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <h3 className="text-2xl font-mono font-bold text-white uppercase tracking-wider mb-2">
                  {specPanels[activeSpec].title}
                </h3>
                <p className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest mb-4">
                  {specPanels[activeSpec].subtitle}
                </p>

                <div className="h-px bg-white/10 mb-6" />

                <p className="text-xs font-mono text-[#4a90d9] uppercase tracking-wider mb-4">
                  {specPanels[activeSpec].spec}
                </p>
                <p className="text-sm font-mono text-[#a0c4e8]/60 leading-relaxed">
                  {specPanels[activeSpec].desc}
                </p>

                {/* Annotation line */}
                <div className="mt-8">
                  <AnnotationLine horizontal label={`REF: ${specPanels[activeSpec].id} · Blueprint Standard`} />
                </div>
              </div>

              {/* Metric panel */}
              <div className="relative border border-white/20 border-l-0 bg-[#142d4a]/60 flex flex-col items-center justify-center p-10">
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40 pointer-events-none" />

                <div className="text-center">
                  <span
                    className="font-mono font-bold text-white block"
                    style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1 }}
                  >
                    {specPanels[activeSpec].value}
                  </span>
                  <span className="text-[10px] font-mono text-[#ff6b35] uppercase tracking-widest block mt-3">
                    {specPanels[activeSpec].unit}
                  </span>
                </div>

                <div className="mt-8 w-full">
                  <AnnotationLine
                    horizontal
                    label="MEASURED"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. Design Principles — Do / Don't ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#142d4a]/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <SectionRef label="Section F-1 · Engineering Principles" />
            <SectionTitle>Design Principles</SectionTitle>
            <SectionSubtitle>Specification compliance — do and do not</SectionSubtitle>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* DO panel */}
            <RevealBlock delay={0.08}>
              <div className="relative border border-white/25 bg-[#1e3a5f]/60 h-full">
                <CornerMarkers />

                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/15">
                  <div className="w-3 h-3 border border-[#4a90d9] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4l2 2L7 1" stroke="#4a90d9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#4a90d9]">
                    Specification — Approved
                  </h3>
                </div>

                <ul className="p-6 space-y-0">
                  {doRules.map((rule, i) => (
                    <li
                      key={i}
                      className="group flex gap-4 py-4 border-b border-white/8 last:border-b-0 cursor-default"
                    >
                      <span className="text-[10px] font-mono text-[#ff6b35]/60 flex-shrink-0 mt-0.5 w-6 text-right">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-mono text-[#a0c4e8]/60 leading-relaxed group-hover:text-[#a0c4e8]/90 transition-colors duration-200">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.14}>
              <div className="relative border border-white/25 bg-[#1e3a5f]/60 h-full">
                <CornerMarkers />

                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/15">
                  <div className="w-3 h-3 border border-[#ff6b35] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ff6b35" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff6b35]">
                    Non-Compliant — Prohibited
                  </h3>
                </div>

                <ul className="p-6 space-y-0">
                  {dontRules.map((rule, i) => (
                    <li
                      key={i}
                      className="group flex gap-4 py-4 border-b border-white/8 last:border-b-0 cursor-default"
                    >
                      <span className="text-[10px] font-mono text-[#a0c4e8]/30 flex-shrink-0 mt-0.5 w-6 text-right">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-mono text-[#a0c4e8]/40 leading-relaxed group-hover:text-[#a0c4e8]/60 transition-colors duration-200 line-through decoration-[#ff6b35]/30">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy note */}
          <RevealBlock delay={0.22} className="mt-8">
            <div className="relative border border-[#4a90d9]/25 bg-[#4a90d9]/05 p-8">
              <CornerMarkers />
              <div className="flex items-start gap-6">
                {/* Large quote mark SVG */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="flex-shrink-0 mt-1 opacity-40">
                  <path d="M0 24V14C0 6.268 5.268 1 13 0l2 3C10.268 4 8 7.268 8 12v12H0zm18 0V14C18 6.268 23.268 1 31 0l2 3C28.268 4 26 7.268 26 12v12h-8z" fill="#4a90d9" />
                </svg>
                <div>
                  <p className="text-sm font-mono text-[#a0c4e8]/70 leading-relaxed max-w-2xl">
                    Blueprint draws from the cyanotype tradition — images produced through the action of light on chemistry. Every line has a reason. Every annotation serves the engineer. Form follows function absolutely: decoration is a tolerance violation.
                  </p>
                  <p className="text-[10px] font-mono text-[#ff6b35]/60 uppercase tracking-widest mt-4">
                    — Blueprint Design Standard · Rev 1.0 · 2026
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Annotation Showcase ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <SectionRef label="Section G-1 · Annotation Language" />
            <SectionTitle>Dimension Annotations</SectionTitle>
            <SectionSubtitle>Callout lines, markers, and measurement labels</SectionSubtitle>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Horizontal annotation demo */}
            <RevealBlock delay={0.08}>
              <div className="group relative border border-white/20 bg-[#1e3a5f]/60 p-6 hover:bg-white/5 transition-all duration-200">
                <CornerMarkers />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-px bg-[#ff6b35]" />
                  <span className="text-[9px] font-mono text-[#ff6b35] uppercase tracking-widest">
                    HORIZONTAL DIM
                  </span>
                </div>

                {/* Demo element */}
                <div className="relative mb-6">
                  <div className="h-16 bg-[#4a90d9]/10 border border-[#4a90d9]/30 flex items-center justify-center">
                    <span className="text-xs font-mono text-[#4a90d9]/70 uppercase">Element</span>
                  </div>
                </div>

                <AnnotationLine horizontal label="Width: 240px" />

                <p className="text-[10px] font-mono text-[#a0c4e8]/40 mt-4 leading-relaxed uppercase tracking-wide">
                  Horizontal callout with arrowheads at both terminations. Label floats at center.
                </p>
              </div>
            </RevealBlock>

            {/* Vertical annotation demo */}
            <RevealBlock delay={0.12}>
              <div className="group relative border border-white/20 bg-[#1e3a5f]/60 p-6 hover:bg-white/5 transition-all duration-200">
                <CornerMarkers />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-px bg-[#ff6b35]" />
                  <span className="text-[9px] font-mono text-[#ff6b35] uppercase tracking-widest">
                    VERTICAL DIM
                  </span>
                </div>

                {/* Demo with vertical annotation */}
                <div className="flex gap-4 items-stretch mb-4">
                  <div className="flex-1 h-32 bg-[#4a90d9]/10 border border-[#4a90d9]/30 flex items-center justify-center">
                    <span className="text-xs font-mono text-[#4a90d9]/70 uppercase">Panel</span>
                  </div>
                  <AnnotationLine horizontal={false} label="Height: 128px" className="h-32" />
                </div>

                <p className="text-[10px] font-mono text-[#a0c4e8]/40 leading-relaxed uppercase tracking-wide">
                  Vertical callout. Label rotated 90 degrees for inline reading with engineering drawings.
                </p>
              </div>
            </RevealBlock>

            {/* Corner bracket markers */}
            <RevealBlock delay={0.16}>
              <div className="group relative border border-white/20 bg-[#1e3a5f]/60 p-6 hover:bg-white/5 transition-all duration-200">
                <CornerMarkers />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-px bg-[#ff6b35]" />
                  <span className="text-[9px] font-mono text-[#ff6b35] uppercase tracking-widest">
                    CORNER MARKERS
                  </span>
                </div>

                {/* Nested panels showing corner marker pattern */}
                <div className="relative h-32 border border-white/30 mb-4 flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#ff6b35]" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#ff6b35]" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#ff6b35]" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#ff6b35]" />
                  <span className="text-[10px] font-mono text-[#a0c4e8]/50 uppercase">Bracket emphasis</span>
                </div>

                <p className="text-[10px] font-mono text-[#a0c4e8]/40 leading-relaxed uppercase tracking-wide">
                  Corner brackets mark panel boundaries. Standard 4–5px arm on each corner.
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Stats row */}
          <RevealBlock delay={0.22} className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Grid Units", value: "24px", ref: "GRD-01" },
                { label: "Stroke Weight", value: "1px", ref: "STR-01" },
                { label: "Opacity Scale", value: "15–40%", ref: "OPT-01" },
                { label: "Corner Arm", value: "4–5px", ref: "CRN-01" },
              ].map((stat) => (
                <div key={stat.ref} className="group relative border border-white/20 bg-[#1e3a5f]/40 p-5 hover:bg-white/5 transition-all duration-200">
                  <CornerMarkers />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-px bg-[#ff6b35]" />
                    <span className="text-[8px] font-mono text-[#ff6b35]/70 uppercase tracking-widest">{stat.ref}</span>
                  </div>
                  <span className="text-xl font-mono font-bold text-white block mb-1">{stat.value}</span>
                  <span className="text-[9px] font-mono text-[#a0c4e8]/50 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 9. Footer ===== */}
      <footer className="relative py-16 px-6 md:px-12 border-t border-white/20">

        {/* Footer grid strip */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Subtle gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(26,58,95,0.7) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 relative border border-white/30">
                  <div className="absolute inset-0 border border-white/15" style={{ transform: "scale(0.6)" }} />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/25" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/25" />
                </div>
                <div>
                  <span className="font-mono text-sm uppercase tracking-widest text-white block">Blueprint</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#a0c4e8]/40">工程蓝图</span>
                </div>
              </div>
              <p className="text-xs font-mono text-[#a0c4e8]/50 leading-relaxed max-w-xs mb-6">
                Cyanotype blueprint printing and modern engineering drawings. White lines on deep blue. Precision, professionalism, technical trust.
              </p>
              {/* Technical build info */}
              <div className="flex flex-wrap gap-3">
                {[
                  { k: "REV", v: "1.0.0" },
                  { k: "DATE", v: "2026-02-20" },
                  { k: "PROJ", v: "STYLEKIT" },
                ].map((meta) => (
                  <div key={meta.k} className="border border-white/15 px-2 py-1">
                    <span className="text-[8px] font-mono text-[#a0c4e8]/40 uppercase block">{meta.k}</span>
                    <span className="text-[10px] font-mono text-[#a0c4e8]/70">{meta.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-px bg-[#ff6b35]" />
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/50">
                  Sections
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Hero", href: "#hero" },
                  { label: "Components", href: "#components" },
                  { label: "Palette", href: "#palette" },
                  { label: "Grid", href: "#grid" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs font-mono text-[#a0c4e8]/50 hover:text-white transition-colors duration-200 uppercase tracking-wider"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-px bg-[#ff6b35]" />
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#a0c4e8]/50">
                  Resources
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "All Styles", href: "/styles" },
                  { label: "StyleKit Home", href: "/" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-mono text-[#a0c4e8]/50 hover:text-white transition-colors duration-200 uppercase tracking-wider"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-white/15 gap-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#a0c4e8]/30">
              Blueprint · 工程蓝图 · StyleKit Design System
            </p>

            {/* Color swatch row */}
            <div className="flex items-center gap-2">
              {["#1e3a5f", "#ffffff", "#4a90d9", "#ff6b35", "#a0c4e8"].map((hex) => (
                <div
                  key={hex}
                  className="w-4 h-4 border border-white/20"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>

            <span className="text-[10px] font-mono text-[#a0c4e8]/30 uppercase tracking-widest">
              Cyanotype · 1:100 · Rev 1.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
