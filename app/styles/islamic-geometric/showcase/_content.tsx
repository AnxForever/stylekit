"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
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
/*  Color constants                                                     */
/* ------------------------------------------------------------------ */

const BLUE = "#1a3a5c";
const IVORY = "#f5ecd7";
const GOLD = "#c9a74e";
const EMERALD = "#2d7d46";
const RED = "#8b2332";
const NAVY = "#0f2440";

/* ------------------------------------------------------------------ */
/*  SVG: 8-pointed star (small utility)                                */
/* ------------------------------------------------------------------ */

function StarEight({
  size = 48,
  color = GOLD,
  opacity = 1,
}: {
  size?: number;
  color?: string;
  opacity?: number;
}) {
  // 8-pointed star via two overlapping squares rotated 45 degrees
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      style={{ opacity }}
      aria-hidden="true"
    >
      <polygon points="50,5 61,39 95,50 61,61 50,95 39,61 5,50 39,39" />
      <polygon
        points="50,5 61,39 95,50 61,61 50,95 39,61 5,50 39,39"
        transform="rotate(22.5 50 50)"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG: Large 8-star for hero / footer                                */
/* ------------------------------------------------------------------ */

function HeroStar({ size = 220 }: { size?: number }) {
  const cx = 50;
  const cy = 50;
  // Build 16-point star via two 8-point polygons offset by 22.5 deg
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={46} fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.4" />
      <circle cx={cx} cy={cy} r={43} fill="none" stroke={GOLD} strokeWidth="0.3" opacity="0.3" />
      {/* 8-point star layer 1 */}
      <polygon
        points="50,8 58,40 92,50 58,60 50,92 42,60 8,50 42,40"
        fill={GOLD}
        opacity="0.9"
      />
      {/* 8-point star layer 2 rotated */}
      <polygon
        points="50,8 58,40 92,50 58,60 50,92 42,60 8,50 42,40"
        transform="rotate(22.5 50 50)"
        fill={GOLD}
        opacity="0.55"
      />
      {/* Inner octagon */}
      <polygon
        points="50,28 61,39 72,50 61,61 50,72 39,61 28,50 39,39"
        fill={BLUE}
        stroke={GOLD}
        strokeWidth="0.8"
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={5} fill={GOLD} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG: Tessellation tile (hex-star repeat)                           */
/* ------------------------------------------------------------------ */

function TessellationPattern({ width = 400, height = 200 }: { width?: number; height?: number }) {
  // Repeating 6-fold star polygon grid via SVG pattern
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    >
      <defs>
        <pattern id="tessPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          {/* Hexagonal star cell */}
          <polygon
            points="30,2 52,15 52,37 30,50 8,37 8,15"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.7"
            opacity="0.45"
          />
          <polygon
            points="30,10 46,19 46,35 30,44 14,35 14,19"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.4"
            opacity="0.25"
          />
          {/* 6-pointed star inside */}
          <polygon
            points="30,14 36,22 30,30 24,22"
            fill={GOLD}
            opacity="0.18"
          />
          <polygon
            points="30,14 36,22 30,30 24,22"
            transform="rotate(60 30 22)"
            fill={GOLD}
            opacity="0.12"
          />
          {/* Offset row */}
          <polygon
            points="60,28 82,41 82,63 60,76 38,63 38,41"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.7"
            opacity="0.45"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#tessPattern)`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG: Arabesque vine border                                         */
/* ------------------------------------------------------------------ */

function ArabesqueBorder({ width = 600 }: { width?: number }) {
  return (
    <svg
      width={width}
      height={28}
      viewBox={`0 0 ${width} 28`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Double line ornament */}
      <line x1="0" y1="6" x2={width} y2="6" stroke={GOLD} strokeWidth="1.2" opacity="0.7" />
      <line x1="0" y1="22" x2={width} y2="22" stroke={GOLD} strokeWidth="1.2" opacity="0.7" />
      {/* Repeating diamond motifs between lines */}
      {Array.from({ length: Math.floor(width / 40) }).map((_, i) => {
        const cx = i * 40 + 20;
        return (
          <g key={i}>
            <polygon
              points={`${cx},10 ${cx + 6},14 ${cx},18 ${cx - 6},14`}
              fill={GOLD}
              opacity="0.6"
            />
            <circle cx={cx} cy={14} r={1.5} fill={GOLD} opacity="0.9" />
            {/* Vine curves */}
            <path
              d={`M${cx - 20},6 Q${cx - 10},14 ${cx},6`}
              fill="none"
              stroke={GOLD}
              strokeWidth="0.8"
              opacity="0.35"
            />
            <path
              d={`M${cx},22 Q${cx + 10},14 ${cx + 20},22`}
              fill="none"
              stroke={GOLD}
              strokeWidth="0.8"
              opacity="0.35"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG: Hexagonal grid pattern                                        */
/* ------------------------------------------------------------------ */

function HexGrid({ size = 280 }: { size?: number }) {
  const hexPoints = (cx: number, cy: number, r: number) => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  };

  const hexes = [
    { cx: 140, cy: 100, r: 40, fill: GOLD, opacity: 0.12 },
    { cx: 75, cy: 65, r: 30, fill: EMERALD, opacity: 0.15 },
    { cx: 205, cy: 65, r: 30, fill: RED, opacity: 0.12 },
    { cx: 75, cy: 135, r: 30, fill: RED, opacity: 0.10 },
    { cx: 205, cy: 135, r: 30, fill: EMERALD, opacity: 0.12 },
    { cx: 35, cy: 100, r: 22, fill: GOLD, opacity: 0.10 },
    { cx: 245, cy: 100, r: 22, fill: GOLD, opacity: 0.10 },
  ];

  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 280 200" aria-hidden="true">
      {hexes.map((h, i) => (
        <g key={i}>
          <polygon
            points={hexPoints(h.cx, h.cy, h.r)}
            fill={h.fill}
            opacity={h.opacity}
          />
          <polygon
            points={hexPoints(h.cx, h.cy, h.r)}
            fill="none"
            stroke={GOLD}
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Inner star */}
          <polygon
            points={hexPoints(h.cx, h.cy, h.r * 0.5)}
            fill="none"
            stroke={GOLD}
            strokeWidth="0.5"
            opacity="0.35"
            transform={`rotate(30 ${h.cx} ${h.cy})`}
          />
        </g>
      ))}
      {/* Connecting lines */}
      {hexes.slice(1).map((h, i) => (
        <line
          key={`line-${i}`}
          x1={hexes[0].cx} y1={hexes[0].cy}
          x2={h.cx} y2={h.cy}
          stroke={GOLD}
          strokeWidth="0.4"
          opacity="0.2"
          strokeDasharray="3 4"
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG: Star polygon (12-pointed)                                     */
/* ------------------------------------------------------------------ */

function StarTwelve({ size = 200 }: { size?: number }) {
  const pts = (n: number, outer: number, inner: number, cx = 100, cy = 100, offset = 0) => {
    const points = [];
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const angle = (Math.PI / n) * i - Math.PI / 2 + offset;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return points.join(" ");
  };

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      {/* Outer ring decoration */}
      <circle cx={100} cy={100} r={95} fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
      <circle cx={100} cy={100} r={88} fill="none" stroke={GOLD} strokeWidth="0.3" opacity="0.2" />
      {/* 12-pointed star */}
      <polygon
        points={pts(12, 85, 45)}
        fill={GOLD}
        opacity="0.22"
        stroke={GOLD}
        strokeWidth="0.6"
      />
      {/* 8-pointed inner star */}
      <polygon
        points={pts(8, 52, 28)}
        fill={GOLD}
        opacity="0.4"
        stroke={GOLD}
        strokeWidth="0.8"
      />
      {/* Interlocking 8-star rotated */}
      <polygon
        points={pts(8, 52, 28, 100, 100, Math.PI / 8)}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.8"
        opacity="0.35"
      />
      {/* Center octagon */}
      <polygon
        points={pts(8, 22, 14)}
        fill={GOLD}
        opacity="0.6"
      />
      {/* Axis lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI / 6) * i;
        return (
          <line
            key={i}
            x1={100 + 88 * Math.cos(angle)}
            y1={100 + 88 * Math.sin(angle)}
            x2={100 - 88 * Math.cos(angle)}
            y2={100 - 88 * Math.sin(angle)}
            stroke={GOLD}
            strokeWidth="0.3"
            opacity="0.12"
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG: Girih interlace panel                                         */
/* ------------------------------------------------------------------ */

function GirihPanel({ size = 280 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <pattern id="girihCell" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          {/* Girih tile — decagon approximated with overlapping pentagons */}
          <polygon
            points="25,2 44,16 38,38 12,38 6,16"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.9"
            opacity="0.5"
          />
          <polygon
            points="25,9 38,19 34,34 16,34 12,19"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.5"
            opacity="0.3"
          />
          <circle cx={25} cy={25} r={3} fill={GOLD} opacity="0.4" />
          {/* Corner connectors */}
          <line x1="0" y1="0" x2="6" y2="16" stroke={GOLD} strokeWidth="0.4" opacity="0.25" />
          <line x1="50" y1="0" x2="44" y2="16" stroke={GOLD} strokeWidth="0.4" opacity="0.25" />
          <line x1="0" y1="50" x2="12" y2="38" stroke={GOLD} strokeWidth="0.4" opacity="0.25" />
          <line x1="50" y1="50" x2="38" y2="38" stroke={GOLD} strokeWidth="0.4" opacity="0.25" />
        </pattern>
      </defs>
      {/* Background */}
      <rect width={200} height={200} fill={BLUE} />
      {/* Pattern overlay */}
      <rect width={200} height={200} fill="url(#girihCell)" />
      {/* Center medallion */}
      <circle cx={100} cy={100} r={36} fill={NAVY} stroke={GOLD} strokeWidth="1.2" opacity="0.9" />
      <polygon
        points="100,68 115,87 110,108 90,108 85,87"
        fill="none"
        stroke={GOLD}
        strokeWidth="0.8"
        opacity="0.7"
      />
      <polygon
        points="100,68 115,87 110,108 90,108 85,87"
        transform="rotate(72 100 100)"
        fill="none"
        stroke={GOLD}
        strokeWidth="0.8"
        opacity="0.5"
      />
      <polygon
        points="100,68 115,87 110,108 90,108 85,87"
        transform="rotate(144 100 100)"
        fill="none"
        stroke={GOLD}
        strokeWidth="0.8"
        opacity="0.4"
      />
      <circle cx={100} cy={100} r={8} fill={GOLD} opacity="0.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Lapis Blue", arabic: "اللازورد", hex: BLUE, light: false },
  { name: "Ivory Parchment", arabic: "عاج الرق", hex: IVORY, light: true },
  { name: "Ancient Gold", arabic: "الذهب القديم", hex: GOLD, light: false },
  { name: "Emerald Garden", arabic: "زمرد البستان", hex: EMERALD, light: false },
  { name: "Deep Burgundy", arabic: "عنابي", hex: RED, light: false },
];

const doRules = [
  "Deep blue and gold classic pairing — bg-[#1a3a5c] with text-[#c9a74e]",
  "Geometric tessellation patterns as inline SVG decorations",
  "Symmetric centered layouts — text-center, items-center, justify-center",
  "Gold borders with double-line ornaments — border-[#c9a74e]",
  "font-serif with tracking-widest uppercase for all headings",
  "8-pointed star SVG motifs as primary decorative element",
  "Arabesque vine border SVG patterns for section dividers",
  "rounded-none for architectural precision and strict geometry",
  "Ivory background panels to balance deep blue surfaces",
];

const dontRules = [
  "No asymmetric layouts — every element must have a mirror axis",
  "No rounded-2xl or soft edges — strict architectural corners only",
  "No casual or playful fonts — serif formality is required",
  "No pastel or desaturated colors — palette must be deep and saturated",
  "No decorative gradients — flat colors define the Islamic aesthetic",
  "No arbitrary spacing — use symmetrical, proportional spacing",
  "No photographic imagery that distracts from the geometry",
  "No drop shadows — borders and geometry create all depth",
];

const principleCards = [
  {
    title: "Infinite Tessellation",
    arabic: "التبليط اللانهائي",
    desc: "Geometry that tiles to infinity. Each unit is complete, yet the whole extends without edge or boundary — a meditation on the infinite.",
    color: GOLD,
  },
  {
    title: "Strict Symmetry",
    arabic: "التناظر الصارم",
    desc: "Every element reflects across at least one axis. Rotational symmetry at multiples of 45 degrees is the foundation of all compositions.",
    color: EMERALD,
  },
  {
    title: "Sacred Proportion",
    arabic: "النسبة المقدسة",
    desc: "Mathematical ratios govern all spatial relationships. The golden ratio, the square root of 2, and the vesica piscis underlie every pattern.",
    color: RED,
  },
];

/* ------------------------------------------------------------------ */
/*  Divider component                                                  */
/* ------------------------------------------------------------------ */

function GoldDivider({ width = "100%" }: { width?: string | number }) {
  return (
    <div className="flex items-center justify-center my-8" style={{ width }}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}88, transparent)` }} />
      <div className="mx-4">
        <StarEight size={18} color={GOLD} />
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD}88, transparent)` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component demo: Button                                             */
/* ------------------------------------------------------------------ */

function DemoButton({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "outline" | "ghost";
}) {
  const base = "font-serif tracking-widest uppercase text-sm px-8 py-3 rounded-none transition-all duration-200 border";
  const variants = {
    primary: `bg-[${GOLD}] text-[${BLUE}] border-[${GOLD}] hover:bg-transparent hover:text-[${GOLD}]`,
    outline: `bg-transparent text-[${GOLD}] border-[${GOLD}] hover:bg-[${GOLD}] hover:text-[${BLUE}]`,
    ghost: `bg-transparent text-[${IVORY}] border-[${IVORY}]/30 hover:border-[${GOLD}] hover:text-[${GOLD}]`,
  };
  const inlineVariants: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: GOLD, color: BLUE, borderColor: GOLD },
    outline: { backgroundColor: "transparent", color: GOLD, borderColor: GOLD },
    ghost: { backgroundColor: "transparent", color: IVORY, borderColor: `${IVORY}40` },
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]}`}
      style={inlineVariants[variant]}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.backgroundColor = "transparent";
          el.style.color = GOLD;
        } else if (variant === "outline") {
          el.style.backgroundColor = GOLD;
          el.style.color = BLUE;
        } else {
          el.style.borderColor = GOLD;
          el.style.color = GOLD;
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.backgroundColor = GOLD;
          el.style.color = BLUE;
        } else if (variant === "outline") {
          el.style.backgroundColor = "transparent";
          el.style.color = GOLD;
        } else {
          el.style.borderColor = `${IVORY}40`;
          el.style.color = IVORY;
        }
      }}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Component demo: Card                                               */
/* ------------------------------------------------------------------ */

function DemoCard({ title, body, accent = GOLD }: { title: string; body: string; accent?: string }) {
  return (
    <div
      className="relative p-6 rounded-none"
      style={{
        backgroundColor: NAVY,
        border: `1px solid ${accent}55`,
        boxShadow: `inset 0 0 0 3px ${BLUE}, inset 0 0 0 4px ${accent}44`,
      }}
    >
      {/* Corner ornaments */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
        <div key={i} className={`absolute ${pos}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <polygon points="5,0 10,5 5,10 0,5" fill={accent} opacity="0.6" />
          </svg>
        </div>
      ))}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <StarEight size={28} color={accent} />
        </div>
        <h4
          className="font-serif tracking-widest uppercase text-sm mb-2"
          style={{ color: accent }}
        >
          {title}
        </h4>
        <p className="text-xs leading-relaxed" style={{ color: `${IVORY}aa` }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component demo: Input                                              */
/* ------------------------------------------------------------------ */

function DemoInput({ placeholder, label }: { placeholder: string; label: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <label
        className="block font-serif tracking-widest uppercase text-xs mb-2"
        style={{ color: GOLD }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 rounded-none bg-transparent font-serif text-sm outline-none transition-all duration-200"
          style={{
            color: IVORY,
            border: `1px solid ${focused ? GOLD : `${GOLD}44`}`,
            borderBottom: `2px solid ${focused ? GOLD : `${GOLD}44`}`,
          }}
        />
        {/* Gold corner accents when focused */}
        {focused && (
          <>
            <div
              className="absolute top-0 left-0 w-4 h-4"
              style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4"
              style={{ borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }}
            />
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const [componentTab, setComponentTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons");

  return (
    <div className="min-h-screen" style={{ backgroundColor: BLUE, color: IVORY }}>

      {/* ============================================================ */}
      {/* 1. Fixed Nav                                                  */}
      {/* ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: BLUE,
          borderBottom: `1px solid ${GOLD}40`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <StarEight size={20} color={GOLD} />
              <span
                className="font-serif tracking-widest uppercase text-sm"
                style={{ color: GOLD }}
              >
                Islamic Geometric
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/styles"
                className="font-serif tracking-widest uppercase text-xs transition-colors duration-200"
                style={{ color: `${IVORY}99` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `${IVORY}99`; }}
              >
                StyleKit →
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero                                                       */}
      {/* ============================================================ */}
      <section
        className="relative pt-32 pb-24 px-6 md:px-10 overflow-hidden"
        style={{ backgroundColor: BLUE }}
      >
        {/* Background tessellation decoration */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
          <TessellationPattern width={900} height={600} />
        </div>

        {/* Corner star ornaments */}
        <div className="absolute top-20 left-8 opacity-20 pointer-events-none">
          <StarEight size={60} color={GOLD} />
        </div>
        <div className="absolute top-20 right-8 opacity-20 pointer-events-none">
          <StarEight size={60} color={GOLD} />
        </div>

        <div
          ref={heroRef}
          className="relative max-w-4xl mx-auto text-center"
        >
          {/* Central star */}
          <div
            className="flex justify-center mb-8"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-22.5deg)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <HeroStar size={180} />
          </div>

          {/* Arabic subtitle */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <p
              className="text-lg mb-3"
              style={{ color: `${GOLD}99`, letterSpacing: "0.15em" }}
            >
              الهندسة الإسلامية
            </p>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <h1
              className="font-serif tracking-widest uppercase mb-2"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: IVORY, lineHeight: 1.15 }}
            >
              Islamic
            </h1>
            <h1
              className="font-serif tracking-widest uppercase mb-6"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: GOLD, lineHeight: 1.15 }}
            >
              Geometric
            </h1>
          </div>

          {/* Gold double-line divider */}
          <div
            className="flex items-center justify-center gap-4 mb-6"
            style={{
              opacity: heroInView ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <div className="flex flex-col gap-1 flex-1 max-w-xs">
              <div className="h-px" style={{ backgroundColor: GOLD, opacity: 0.7 }} />
              <div className="h-px" style={{ backgroundColor: GOLD, opacity: 0.3 }} />
            </div>
            <StarEight size={16} color={GOLD} />
            <div className="flex flex-col gap-1 flex-1 max-w-xs">
              <div className="h-px" style={{ backgroundColor: GOLD, opacity: 0.7 }} />
              <div className="h-px" style={{ backgroundColor: GOLD, opacity: 0.3 }} />
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <p
              className="font-serif text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: `${IVORY}bb` }}
            >
              Millennia of mathematical precision rendered in tessellation. Star polygons,
              interlocking hexagons, infinite arabesque — sacred geometry with strict
              symmetry and balance.
            </p>
          </div>
        </div>

        {/* Bottom arabesque border */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none">
          <ArabesqueBorder width={900} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Component Demos                                            */}
      {/* ============================================================ */}
      <section
        className="py-24 px-6 md:px-10"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-serif tracking-widest uppercase text-xs mb-3" style={{ color: GOLD }}>
              Component Library
            </p>
            <h2
              className="font-serif tracking-widest uppercase mb-4"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: IVORY }}
            >
              Design Elements
            </h2>
            <GoldDivider />
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock className="flex justify-center mb-10" delay={0.1}>
            <div
              className="flex rounded-none"
              style={{ border: `1px solid ${GOLD}44` }}
            >
              {(["Buttons", "Cards", "Inputs"] as const).map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setComponentTab(tab)}
                  className="font-serif tracking-widest uppercase text-xs px-8 py-3 rounded-none transition-all duration-200"
                  style={{
                    backgroundColor: componentTab === tab ? GOLD : "transparent",
                    color: componentTab === tab ? BLUE : `${IVORY}88`,
                    borderRight: i < 2 ? `1px solid ${GOLD}44` : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <RevealBlock key={componentTab}>
            {componentTab === "Buttons" && (
              <div
                className="p-10 rounded-none"
                style={{
                  backgroundColor: BLUE,
                  border: `1px solid ${GOLD}33`,
                }}
              >
                <p
                  className="font-serif tracking-widest uppercase text-xs mb-8 text-center"
                  style={{ color: `${GOLD}77` }}
                >
                  Button Variants
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <DemoButton label="Primary" variant="primary" />
                  <DemoButton label="Outline" variant="outline" />
                  <DemoButton label="Ghost" variant="ghost" />
                </div>
                <div className="mt-10">
                  <p
                    className="font-serif tracking-widest uppercase text-xs mb-6 text-center"
                    style={{ color: `${GOLD}77` }}
                  >
                    Color Accent Buttons
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {[
                      { label: "Emerald", bg: EMERALD },
                      { label: "Burgundy", bg: RED },
                      { label: "Gold", bg: GOLD },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        type="button"
                        className="font-serif tracking-widest uppercase text-xs px-8 py-3 rounded-none transition-all duration-200"
                        style={{
                          backgroundColor: btn.bg,
                          color: btn.bg === GOLD ? BLUE : IVORY,
                          border: `1px solid ${btn.bg}`,
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {componentTab === "Cards" && (
              <div
                className="p-10 rounded-none"
                style={{ backgroundColor: BLUE, border: `1px solid ${GOLD}33` }}
              >
                <p
                  className="font-serif tracking-widest uppercase text-xs mb-8 text-center"
                  style={{ color: `${GOLD}77` }}
                >
                  Panel Cards
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <DemoCard
                    title="Gold Variant"
                    body="Deep blue panel with gold arabesque border ornaments and centered star motif."
                    accent={GOLD}
                  />
                  <DemoCard
                    title="Emerald Variant"
                    body="Geometric precision meets verdant vitality — the garden paradise tradition."
                    accent={EMERALD}
                  />
                  <DemoCard
                    title="Burgundy Variant"
                    body="Deep red accents recall the rich dye traditions of Persian manuscript art."
                    accent={RED}
                  />
                </div>
              </div>
            )}

            {componentTab === "Inputs" && (
              <div
                className="p-10 rounded-none"
                style={{ backgroundColor: BLUE, border: `1px solid ${GOLD}33` }}
              >
                <p
                  className="font-serif tracking-widest uppercase text-xs mb-8 text-center"
                  style={{ color: `${GOLD}77` }}
                >
                  Form Fields — Click to Focus
                </p>
                <div className="max-w-md mx-auto space-y-6">
                  <DemoInput label="Full Name" placeholder="Enter your name" />
                  <DemoInput label="City of Origin" placeholder="e.g. Isfahan, Samarkand" />
                  <DemoInput label="Message" placeholder="Your inscription..." />
                  <div className="flex justify-center pt-2">
                    <DemoButton label="Submit" variant="primary" />
                  </div>
                </div>
              </div>
            )}
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Color Palette                                              */}
      {/* ============================================================ */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif tracking-widest uppercase text-xs mb-3" style={{ color: GOLD }}>
              Palette
            </p>
            <h2
              className="font-serif tracking-widest uppercase"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: IVORY }}
            >
              Sacred Colors
            </h2>
            <GoldDivider />
            <p className="font-serif text-sm leading-relaxed max-w-xl mx-auto" style={{ color: `${IVORY}99` }}>
              Drawn from the pigments of medieval Islamic illuminated manuscripts — lapis lazuli,
              gold leaf, verdigris, and carmine — these five colors define the entire system.
            </p>
          </RevealBlock>

          <div className="flex flex-wrap justify-center gap-6">
            {palette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-3">
                  {/* Square swatch */}
                  <div
                    className="w-28 h-28 rounded-none flex items-center justify-center"
                    style={{
                      backgroundColor: color.hex,
                      border: `2px solid ${GOLD}55`,
                      boxShadow: `0 0 0 1px ${BLUE}, 0 0 0 3px ${GOLD}33`,
                    }}
                  >
                    <StarEight
                      size={32}
                      color={color.light ? BLUE : `${IVORY}55`}
                    />
                  </div>
                  {/* Labels */}
                  <div className="text-center">
                    <p
                      className="font-serif tracking-widest uppercase text-xs"
                      style={{ color: GOLD }}
                    >
                      {color.name}
                    </p>
                    <p className="text-sm mt-1" style={{ color: `${IVORY}77` }}>
                      {color.arabic}
                    </p>
                    <p
                      className="font-mono text-xs mt-1"
                      style={{ color: `${IVORY}55` }}
                    >
                      {color.hex}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Arabesque separator */}
      <div className="flex justify-center overflow-hidden" style={{ backgroundColor: BLUE }}>
        <ArabesqueBorder width={800} />
      </div>

      {/* ============================================================ */}
      {/* 5. Geometric Patterns Showcase                                */}
      {/* ============================================================ */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif tracking-widest uppercase text-xs mb-3" style={{ color: GOLD }}>
              Geometric Patterns
            </p>
            <h2
              className="font-serif tracking-widest uppercase"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: IVORY }}
            >
              Pattern Library
            </h2>
            <GoldDivider />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pattern 1: 12-pointed star */}
            <RevealBlock delay={0}>
              <div
                className="flex flex-col items-center p-8 rounded-none"
                style={{
                  backgroundColor: BLUE,
                  border: `1px solid ${GOLD}44`,
                }}
              >
                <div className="mb-6">
                  <StarTwelve size={180} />
                </div>
                <div
                  className="w-full h-px mb-5"
                  style={{ backgroundColor: `${GOLD}44` }}
                />
                <h3
                  className="font-serif tracking-widest uppercase text-xs text-center mb-2"
                  style={{ color: GOLD }}
                >
                  12-Pointed Star
                </h3>
                <p
                  className="font-serif text-xs text-center leading-relaxed"
                  style={{ color: `${IVORY}77` }}
                >
                  نجمة اثني عشر — The dodecagonal star, formed from the intersection of
                  three overlapping squares, appears throughout Persian tilework.
                </p>
              </div>
            </RevealBlock>

            {/* Pattern 2: Hexagonal grid */}
            <RevealBlock delay={0.1}>
              <div
                className="flex flex-col items-center p-8 rounded-none"
                style={{
                  backgroundColor: BLUE,
                  border: `1px solid ${GOLD}44`,
                }}
              >
                <div className="mb-6">
                  <HexGrid size={200} />
                </div>
                <div
                  className="w-full h-px mb-5"
                  style={{ backgroundColor: `${GOLD}44` }}
                />
                <h3
                  className="font-serif tracking-widest uppercase text-xs text-center mb-2"
                  style={{ color: GOLD }}
                >
                  Hexagonal Grid
                </h3>
                <p
                  className="font-serif text-xs text-center leading-relaxed"
                  style={{ color: `${IVORY}77` }}
                >
                  الشبكة السداسية — The honeycomb lattice provides structural efficiency
                  and visual harmony across Andalusian and Moroccan geometric traditions.
                </p>
              </div>
            </RevealBlock>

            {/* Pattern 3: Girih interlace */}
            <RevealBlock delay={0.2}>
              <div
                className="flex flex-col items-center p-8 rounded-none"
                style={{
                  backgroundColor: BLUE,
                  border: `1px solid ${GOLD}44`,
                }}
              >
                <div className="mb-6 rounded-none overflow-hidden" style={{ border: `1px solid ${GOLD}33` }}>
                  <GirihPanel size={180} />
                </div>
                <div
                  className="w-full h-px mb-5"
                  style={{ backgroundColor: `${GOLD}44` }}
                />
                <h3
                  className="font-serif tracking-widest uppercase text-xs text-center mb-2"
                  style={{ color: GOLD }}
                >
                  Girih Interlace
                </h3>
                <p
                  className="font-serif text-xs text-center leading-relaxed"
                  style={{ color: `${IVORY}77` }}
                >
                  الجريح — The five-tile Girih system, rediscovered by modern
                  mathematicians as a quasi-crystalline structure predating Penrose by 500 years.
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Wide tessellation strip */}
          <RevealBlock delay={0.15} className="mt-10">
            <div
              className="rounded-none overflow-hidden flex flex-col items-center"
              style={{ border: `1px solid ${GOLD}44` }}
            >
              <div className="w-full overflow-hidden" style={{ backgroundColor: BLUE }}>
                <TessellationPattern width={900} height={120} />
              </div>
              <div
                className="w-full text-center py-4"
                style={{
                  backgroundColor: `${NAVY}cc`,
                  borderTop: `1px solid ${GOLD}33`,
                }}
              >
                <p
                  className="font-serif tracking-widest uppercase text-xs"
                  style={{ color: `${GOLD}88` }}
                >
                  Repeating Tessellation Band — Arabesque Continuity
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Design Principles — Do / Don't                             */}
      {/* ============================================================ */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif tracking-widest uppercase text-xs mb-3" style={{ color: GOLD }}>
              Philosophy
            </p>
            <h2
              className="font-serif tracking-widest uppercase"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: IVORY }}
            >
              Design Principles
            </h2>
            <GoldDivider />
          </RevealBlock>

          {/* Core philosophy cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {principleCards.map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.1}>
                <div
                  className="p-8 rounded-none text-center h-full"
                  style={{
                    backgroundColor: NAVY,
                    border: `1px solid ${card.color}44`,
                    borderTop: `3px solid ${card.color}`,
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <StarEight size={32} color={card.color} />
                  </div>
                  <h3
                    className="font-serif tracking-widest uppercase text-sm mb-1"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-serif text-xs mb-4" style={{ color: `${card.color}77` }}>
                    {card.arabic}
                  </p>
                  <div
                    className="h-px mb-4"
                    style={{ backgroundColor: `${card.color}33` }}
                  />
                  <p
                    className="font-serif text-xs leading-relaxed"
                    style={{ color: `${IVORY}99` }}
                  >
                    {card.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock delay={0}>
              <div
                className="p-8 rounded-none h-full"
                style={{
                  backgroundColor: NAVY,
                  border: `1px solid ${EMERALD}55`,
                  borderTop: `3px solid ${EMERALD}`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-none flex items-center justify-center"
                    style={{ backgroundColor: EMERALD, border: `1px solid ${EMERALD}` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M2 7L5.5 10.5L12 3.5"
                        stroke={IVORY}
                        strokeWidth="2"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-serif tracking-widest uppercase text-sm"
                    style={{ color: EMERALD }}
                  >
                    Do
                  </h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="font-serif font-bold shrink-0 mt-0.5"
                        style={{ color: EMERALD }}
                      >
                        +
                      </span>
                      <span
                        className="font-serif text-xs leading-relaxed"
                        style={{ color: `${IVORY}cc` }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 rounded-none h-full"
                style={{
                  backgroundColor: NAVY,
                  border: `1px solid ${RED}55`,
                  borderTop: `3px solid ${RED}`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-none flex items-center justify-center"
                    style={{ backgroundColor: RED, border: `1px solid ${RED}` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M3 3L11 11M11 3L3 11"
                        stroke={IVORY}
                        strokeWidth="2"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                  <h3
                    className="font-serif tracking-widest uppercase text-sm"
                    style={{ color: RED }}
                  >
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="font-serif font-bold shrink-0 mt-0.5"
                        style={{ color: RED }}
                      >
                        -
                      </span>
                      <span
                        className="font-serif text-xs leading-relaxed"
                        style={{ color: `${IVORY}cc` }}
                      >
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

      {/* Arabesque separator */}
      <div className="flex justify-center overflow-hidden" style={{ backgroundColor: BLUE }}>
        <ArabesqueBorder width={800} />
      </div>

      {/* ============================================================ */}
      {/* 7. Typography Showcase                                        */}
      {/* ============================================================ */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif tracking-widest uppercase text-xs mb-3" style={{ color: GOLD }}>
              Typography
            </p>
            <h2
              className="font-serif tracking-widest uppercase"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: IVORY }}
            >
              Letterforms
            </h2>
            <GoldDivider />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Scale */}
            <RevealBlock delay={0}>
              <div
                className="p-8 rounded-none"
                style={{ border: `1px solid ${GOLD}33` }}
              >
                <h4
                  className="font-serif tracking-widest uppercase text-xs mb-8"
                  style={{ color: `${GOLD}88` }}
                >
                  Type Scale
                </h4>
                <div className="space-y-5">
                  {[
                    { size: "text-4xl", sample: "Display", label: "Display — font-serif text-4xl tracking-widest" },
                    { size: "text-2xl", sample: "Heading", label: "Heading — font-serif text-2xl tracking-widest" },
                    { size: "text-xl", sample: "Subheading", label: "Subheading — font-serif text-xl" },
                    { size: "text-base", sample: "Body text for the finest inscriptions.", label: "Body — font-serif text-base leading-relaxed" },
                    { size: "text-xs", sample: "CAPTION — SECTION LABEL", label: "Caption — font-serif text-xs tracking-widest uppercase" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p
                        className={`font-serif ${item.size} uppercase tracking-widest mb-1`}
                        style={{ color: IVORY }}
                      >
                        {item.sample}
                      </p>
                      <p
                        className="font-mono text-xs"
                        style={{ color: `${GOLD}66` }}
                      >
                        {item.label}
                      </p>
                      {i < 4 && (
                        <div
                          className="h-px mt-4"
                          style={{ backgroundColor: `${GOLD}22` }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Ornamental text panel */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 rounded-none flex flex-col justify-between h-full"
                style={{ border: `1px solid ${GOLD}33`, backgroundColor: BLUE }}
              >
                {/* Top ornament */}
                <div className="flex justify-center mb-4">
                  <ArabesqueBorder width={280} />
                </div>

                {/* Featured quote block */}
                <div className="text-center py-6">
                  <div className="flex justify-center mb-4">
                    <StarEight size={24} color={GOLD} opacity={0.6} />
                  </div>
                  <blockquote>
                    <p
                      className="font-serif text-2xl mb-4 leading-relaxed"
                      style={{ color: GOLD }}
                    >
                      &ldquo;Geometry is knowledge of the eternally existent.&rdquo;
                    </p>
                    <footer
                      className="font-serif tracking-widest uppercase text-xs"
                      style={{ color: `${IVORY}66` }}
                    >
                      — Plato, Republic
                    </footer>
                  </blockquote>
                </div>

                {/* Arabic inscription */}
                <div className="text-center">
                  <p
                    className="text-2xl mb-2"
                    style={{ color: `${GOLD}88`, fontFamily: "serif" }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                  </p>
                  <p
                    className="font-serif tracking-widest uppercase text-xs"
                    style={{ color: `${IVORY}44` }}
                  >
                    Bismillah — In the Name of God
                  </p>
                </div>

                {/* Bottom ornament */}
                <div className="flex justify-center mt-4">
                  <ArabesqueBorder width={280} />
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Full Medallion Showcase                                    */}
      {/* ============================================================ */}
      <section className="py-24 px-6 md:px-10" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif tracking-widest uppercase text-xs mb-3" style={{ color: GOLD }}>
              Medallion
            </p>
            <h2
              className="font-serif tracking-widest uppercase"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: IVORY }}
            >
              Composition Study
            </h2>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock>
            {/* Full medallion composition */}
            <div
              className="relative rounded-none overflow-hidden mx-auto max-w-2xl"
              style={{
                backgroundColor: NAVY,
                border: `1px solid ${GOLD}55`,
                boxShadow: `inset 0 0 0 8px ${BLUE}, inset 0 0 0 9px ${GOLD}33`,
              }}
            >
              {/* Tessellation background */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <TessellationPattern width={700} height={500} />
              </div>

              {/* Corner medallions */}
              {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} pointer-events-none`}>
                  <StarEight size={36} color={GOLD} opacity={0.4} />
                </div>
              ))}

              {/* Center content */}
              <div className="relative py-20 px-10 text-center">
                {/* Top arabesque */}
                <div className="flex justify-center mb-8 pointer-events-none">
                  <ArabesqueBorder width={400} />
                </div>

                {/* Central star */}
                <div className="flex justify-center mb-6">
                  <HeroStar size={140} />
                </div>

                <h3
                  className="font-serif tracking-widest uppercase mb-2"
                  style={{ fontSize: "1.8rem", color: IVORY }}
                >
                  The Infinite Pattern
                </h3>
                <p className="text-xl mb-4" style={{ color: GOLD }}>
                  النمط اللانهائي
                </p>

                <GoldDivider />

                <p
                  className="font-serif text-sm leading-relaxed max-w-md mx-auto"
                  style={{ color: `${IVORY}aa` }}
                >
                  Every star is the center of its own universe. Every tile is complete.
                  Every pattern extends without boundary — the mathematical proof
                  that beauty follows from law.
                </p>

                {/* Bottom arabesque */}
                <div className="flex justify-center mt-8 pointer-events-none">
                  <ArabesqueBorder width={400} />
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Specification notes */}
          <RevealBlock delay={0.15} className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Primary BG", value: "bg-[#1a3a5c]", code: "#1a3a5c" },
                { label: "Gold Accent", value: "text-[#c9a74e]", code: "#c9a74e" },
                { label: "Border Style", value: "rounded-none", code: "0px radius" },
                { label: "Heading Font", value: "font-serif", code: "tracking-widest" },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="p-5 rounded-none text-center"
                  style={{
                    backgroundColor: NAVY,
                    border: `1px solid ${GOLD}33`,
                  }}
                >
                  <p
                    className="font-serif tracking-widest uppercase text-xs mb-2"
                    style={{ color: `${GOLD}88` }}
                  >
                    {spec.label}
                  </p>
                  <p
                    className="font-mono text-sm mb-1"
                    style={{ color: IVORY }}
                  >
                    {spec.value}
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{ color: `${GOLD}55` }}
                  >
                    {spec.code}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. Footer                                                     */}
      {/* ============================================================ */}
      <footer
        className="py-20 px-6 md:px-10"
        style={{
          backgroundColor: NAVY,
          borderTop: `1px solid ${GOLD}40`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Top arabesque */}
          <div className="flex justify-center mb-12 pointer-events-none">
            <ArabesqueBorder width={600} />
          </div>

          {/* Large central star */}
          <div className="flex justify-center mb-8">
            <HeroStar size={160} />
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h2
              className="font-serif tracking-widest uppercase mb-2"
              style={{ fontSize: "1.5rem", color: GOLD }}
            >
              Islamic Geometric
            </h2>
            <p
              className="font-serif tracking-widest uppercase text-xs"
              style={{ color: `${IVORY}66` }}
            >
              伊斯兰几何 &mdash; Sacred Geometry &mdash; الهندسة الإسلامية
            </p>
          </div>

          <GoldDivider />

          {/* Footer links */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="font-serif text-xs" style={{ color: `${IVORY}55` }}>
              StyleKit &mdash; A mathematics of beauty, rendered in code.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/styles/islamic-geometric"
                className="font-serif tracking-widest uppercase text-xs transition-colors duration-200"
                style={{ color: `${IVORY}77` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `${IVORY}77`; }}
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="font-serif tracking-widest uppercase text-xs transition-colors duration-200"
                style={{ color: `${IVORY}77` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `${IVORY}77`; }}
              >
                All Styles
              </Link>
            </div>
          </div>

          {/* Bottom ornament */}
          <div className="flex justify-center mt-12 pointer-events-none">
            <ArabesqueBorder width={600} />
          </div>
        </div>
      </footer>
    </div>
  );
}
