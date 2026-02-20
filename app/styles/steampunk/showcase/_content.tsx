"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const componentTabs = ["BUTTONS", "CARDS", "INPUTS"] as const;
type ComponentTab = typeof componentTabs[number];

const colorPalette = [
  {
    name: "Brass Gold",
    hex: "#b5a642",
    label: "PRIMARY",
    textDark: true,
  },
  {
    name: "Dark Mahogany",
    hex: "#3d2b1f",
    label: "BACKGROUND",
    textDark: false,
  },
  {
    name: "Copper",
    hex: "#b87333",
    label: "ACCENT",
    textDark: true,
  },
  {
    name: "Aged Ivory",
    hex: "#f5f0e1",
    label: "BODY TEXT",
    textDark: true,
  },
  {
    name: "Iron Grey",
    hex: "#4a4a4a",
    label: "STRUCTURAL",
    textDark: false,
  },
];

const inventions = [
  {
    id: "MK-I",
    year: "1887",
    title: "Aetheric Condenser",
    subtitle: "Pressure class: 12 bar",
    desc: "Captures ambient vapour and converts it to usable locomotive force via a triple-stage condensation manifold.",
    pressure: 88,
  },
  {
    id: "MK-II",
    year: "1891",
    title: "Clockwork Navigator",
    subtitle: "Precision: 0.002 mm",
    desc: "A self-correcting gyroscopic compass driven by a 240-tooth brass gear train. Accurate to within one nautical league.",
    pressure: 72,
  },
  {
    id: "MK-III",
    year: "1899",
    title: "Galvanic Relay Engine",
    subtitle: "Output class: 440 volt",
    desc: "Harnesses electrical potential from steam-driven turbines, feeding copper-wound coils for industrial telegraph networks.",
    pressure: 95,
  },
];

const doRules = [
  {
    title: "Dark Mahogany Foundation",
    code: "bg-[#3d2b1f] or bg-[#2a1f15]",
    body: "Every surface begins dark and warm. Mahogany is not black — it carries the grain of aged wood.",
  },
  {
    title: "Brass Serif Headings",
    code: "font-serif text-[#b5a642]",
    body: "Victorian industry married artistry. Headings wear brass and speak in serifs. No sans-serif shall lead.",
  },
  {
    title: "Copper Riveted Borders",
    code: "border border-[#b87333]/50",
    body: "Every panel edge suggests hand-riveted copper plate. Use border-2 for structural panels, border for inset elements.",
  },
  {
    title: "Brass Glow Shadows",
    code: "shadow-[0_0_15px_rgba(181,166,66,0.3)]",
    body: "Warm amber gas-lamp light spills from brass fittings. Glow is always warm — never cool or neutral.",
  },
  {
    title: "Mono Data Labels",
    code: "font-mono text-[#b87333]",
    body: "Technical readings, measurements, and pressure values use monospace. It signals precision instrumentation.",
  },
  {
    title: "Gear SVG Ornaments",
    code: "inline SVG cog + spoke pattern",
    body: "Decorative gears are structural truth — the machinery that drives the world forward. Never purely cosmetic.",
  },
];

const dontRules = [
  {
    title: "No Flat Modern Design",
    code: "avoid: flat UI, minimal cards",
    body: "Steampunk is ornate by nature. Flat minimalism strips away the very soul of the Victorian workshop.",
  },
  {
    title: "No Pastel Palettes",
    code: "avoid: pink, mint, sky, lavender",
    body: "Pastels were not yet invented in the coal-fired age. Only brass, copper, iron, and aged ivory.",
  },
  {
    title: "No Sans-serif Headings",
    code: "avoid: font-sans for h1-h4",
    body: "The 20th-century typographic revolution has not yet arrived. Serifs carry the weight of the Industrial Age.",
  },
  {
    title: "No Neon or Screen-glow",
    code: "avoid: shadow cyan/violet/green",
    body: "Electric light exists but has not been aestheticised. Glow is warm amber gas-lamp — never cold neon.",
  },
  {
    title: "No Bright White Backgrounds",
    code: "avoid: bg-white, bg-[#ffffff]",
    body: "The workshop is lit by oil and gas. Backgrounds are always mahogany-dark or aged-ivory warm.",
  },
  {
    title: "No Rounded Pill Shapes",
    code: "avoid: rounded-full on panels",
    body: "Steampunk panels are riveted, rectangular or subtly curved. Full pills belong to a different century.",
  },
];

const typographyExamples = [
  {
    sizeStyle: "clamp(3rem, 7vw, 5.5rem)" as const,
    label: "HEADING / BRASS SERIF",
    sample: "Aetheric Steam Co.",
    font: "font-serif" as const,
    colorClass: "text-[#b5a642]",
  },
  {
    sizeStyle: "clamp(1.5rem, 3vw, 2.25rem)" as const,
    label: "SUBHEADING / IVORY SERIF",
    sample: "Victorian Workshop Division",
    font: "font-serif" as const,
    colorClass: "text-[#f5f0e1]",
  },
  {
    sizeStyle: "1rem" as const,
    label: "BODY / AGED IVORY",
    sample:
      "Forged in the furnaces of the Industrial Revolution, our brass instruments carry the precision of a hundred craftsmen and the ambition of a generation.",
    font: "font-serif" as const,
    colorClass: "text-[#f5f0e1]/75",
  },
  {
    sizeStyle: "0.75rem" as const,
    label: "DATA / COPPER MONO",
    sample:
      "PRESSURE: 12.4 BAR — TEMP: 347°C — RPM: 1,440 — STATUS: NOMINAL",
    font: "font-mono" as const,
    colorClass: "text-[#b87333]",
  },
  {
    sizeStyle: "0.625rem" as const,
    label: "INSTRUMENT LABEL / MONO",
    sample:
      "SN-MK-III — LOT 0047 — CERTIFIED 1899-04-12 — AETHERIC STEAM CO. LONDON",
    font: "font-mono" as const,
    colorClass: "text-[#b5a642]/60",
  },
];

const motionTokens = [
  {
    name: "Brass Glow",
    token: "shadow-[0_0_15px_rgba(181,166,66,0.3)]",
    desc: "Warm amber light radiates from brass fittings on focus and hover. Always warm, never cool.",
    gearColor: "#b5a642" as const,
    delay: 0.04,
  },
  {
    name: "Copper Border Pulse",
    token: "border border-[#b87333]/50 hover:border-[#b87333]",
    desc: "Copper plating brightens on interaction. Simulates polished metal catching the gas-lamp flame.",
    gearColor: "#b87333" as const,
    delay: 0.1,
  },
  {
    name: "Gear Spin Ambient",
    token: "animate-spin duration-[8000ms] linear infinite",
    desc: "Background gears rotate slowly and continuously. The workshop never stops — it merely idles.",
    gearColor: "#b5a642" as const,
    delay: 0.16,
  },
  {
    name: "Pressure Bar Fill",
    token: "w-[{value}%] transition-all duration-700",
    desc: "Linear gauges fill from left. Use warm brass colour below 80%, copper at critical levels.",
    gearColor: "#b87333" as const,
    delay: 0.22,
  },
  {
    name: "Riveted Focus",
    token: "focus:shadow-[0_0_12px_rgba(181,166,66,0.2)]",
    desc: "Interactive fields emit a brass glow ring on focus. No blue outline — the workshop uses gas-lamp amber.",
    gearColor: "#b5a642" as const,
    delay: 0.28,
  },
  {
    name: "Steam Drift",
    token: "translateY(-60px) scaleX(1.4) opacity-0",
    desc: "Decorative steam puffs rise and dissipate. Opacity 0 to 0.35 and back. Duration minimum 3.5 seconds.",
    gearColor: "#b87333" as const,
    delay: 0.34,
  },
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
/*  SVG Primitives                                                     */
/* ------------------------------------------------------------------ */

function GearSVG({
  size = 48,
  color = "#b5a642",
  opacity = 1,
  className = "",
  spin = false,
  spinDuration = "8s",
  reverse = false,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  spin?: boolean;
  spinDuration?: string;
  reverse?: boolean;
}) {
  const teeth = 10;
  const innerR = size * 0.28;
  const outerR = size * 0.43;
  const boreR = size * 0.11;
  const cx = size / 2;
  const cy = size / 2;

  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const an = ((i + 0.5) / teeth) * Math.PI * 2;
    const ann = ((i + 1) / teeth) * Math.PI * 2;
    const p = (angle: number, r: number) =>
      `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
    pts.push(
      `${p(a - 0.08, innerR)} ${p(a + 0.08, outerR)} ${p(
        an - 0.08,
        outerR
      )} ${p(an + 0.08, innerR)} ${p(ann - 0.08, innerR)}`
    );
  }

  const spokeAngles = [
    0,
    Math.PI / 2,
    Math.PI,
    (3 * Math.PI) / 2,
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${className} ${spin ? "animate-spin" : ""}`}
      style={{
        opacity,
        ...(spin
          ? {
              animationDuration: spinDuration,
              animationTimingFunction: "linear",
              animationDirection: reverse ? "reverse" : "normal",
            }
          : {}),
      }}
      aria-hidden="true"
    >
      <polygon points={pts.join(" ")} fill={color} fillOpacity={0.85} />
      <circle
        cx={cx}
        cy={cy}
        r={innerR * 0.92}
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        strokeOpacity={0.35}
      />
      {spokeAngles.map((a, i) => (
        <line
          key={i}
          x1={cx + Math.cos(a) * boreR * 1.6}
          y1={cy + Math.sin(a) * boreR * 1.6}
          x2={cx + Math.cos(a) * innerR * 0.88}
          y2={cy + Math.sin(a) * innerR * 0.88}
          stroke={color}
          strokeWidth={1.4}
          strokeOpacity={0.55}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={boreR}
        fill="#2a1f15"
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.65}
      />
      <circle cx={cx} cy={cy} r={boreR * 0.38} fill={color} fillOpacity={0.9} />
    </svg>
  );
}

function SmallGear({
  size = 28,
  color = "#b87333",
  className = "",
  spin = false,
  reverse = false,
  spinDuration = "5s",
}: {
  size?: number;
  color?: string;
  className?: string;
  spin?: boolean;
  reverse?: boolean;
  spinDuration?: string;
}) {
  const teeth = 7;
  const innerR = size * 0.30;
  const outerR = size * 0.44;
  const boreR = size * 0.10;
  const cx = size / 2;
  const cy = size / 2;

  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const an = ((i + 0.5) / teeth) * Math.PI * 2;
    const ann = ((i + 1) / teeth) * Math.PI * 2;
    const p = (angle: number, r: number) =>
      `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
    pts.push(
      `${p(a - 0.1, innerR)} ${p(a + 0.1, outerR)} ${p(
        an - 0.1,
        outerR
      )} ${p(an + 0.1, innerR)} ${p(ann - 0.1, innerR)}`
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${className} ${spin ? "animate-spin" : ""}`}
      style={
        spin
          ? {
              animationDuration: spinDuration,
              animationTimingFunction: "linear",
              animationDirection: reverse ? "reverse" : "normal",
            }
          : {}
      }
      aria-hidden="true"
    >
      <polygon points={pts.join(" ")} fill={color} fillOpacity={0.72} />
      <circle
        cx={cx}
        cy={cy}
        r={innerR * 0.84}
        fill="none"
        stroke={color}
        strokeWidth={0.7}
        strokeOpacity={0.3}
      />
      <line
        x1={cx}
        y1={cy - boreR}
        x2={cx}
        y2={cy - innerR * 0.78}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <line
        x1={cx}
        y1={cy + boreR}
        x2={cx}
        y2={cy + innerR * 0.78}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <line
        x1={cx - boreR}
        y1={cy}
        x2={cx - innerR * 0.78}
        y2={cy}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <line
        x1={cx + boreR}
        y1={cy}
        x2={cx + innerR * 0.78}
        y2={cy}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <circle
        cx={cx}
        cy={cy}
        r={boreR}
        fill="#2a1f15"
        stroke={color}
        strokeWidth={0.7}
        strokeOpacity={0.55}
      />
    </svg>
  );
}

function RivetRow({
  count = 4,
  color = "#b87333",
}: {
  count?: number;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full border"
          style={{
            backgroundColor: color,
            borderColor: `${color}80`,
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.6), inset 0 0 2px rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

function PressureGauge({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const startDeg = -210;
  const totalRange = 240;
  const needleDeg = startDeg + (clamped / 100) * totalRange;
  const needleRad = (needleDeg * Math.PI) / 180;
  const cx = 50;
  const cy = 50;
  const needleLen = 27;
  const nx = cx + Math.cos(needleRad) * needleLen;
  const ny = cy + Math.sin(needleRad) * needleLen;

  function arcPath(r: number, startD: number, endD: number) {
    const s = (startD * Math.PI) / 180;
    const e = (endD * Math.PI) / 180;
    const sx = cx + Math.cos(s) * r;
    const sy = cy + Math.sin(s) * r;
    const ex = cx + Math.cos(e) * r;
    const ey = cy + Math.sin(e) * r;
    const large = endD - startD > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={100}
        height={82}
        viewBox="0 0 100 82"
        aria-label={`${label}: ${value}%`}
      >
        <circle
          cx={cx}
          cy={cy}
          r={44}
          fill="#2a1f15"
          stroke="#b87333"
          strokeWidth={2}
          strokeOpacity={0.65}
        />
        <circle
          cx={cx}
          cy={cy}
          r={40}
          fill="none"
          stroke="#b5a642"
          strokeWidth={0.5}
          strokeOpacity={0.25}
        />
        {/* Track */}
        <path
          d={arcPath(34, startDeg, startDeg + totalRange)}
          fill="none"
          stroke="#4a4a4a"
          strokeWidth={4}
          strokeOpacity={0.5}
        />
        {/* Value arc */}
        <path
          d={arcPath(34, startDeg, startDeg + (clamped / 100) * totalRange)}
          fill="none"
          stroke={clamped > 80 ? "#b87333" : "#b5a642"}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* Tick marks */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = startDeg + (i / 10) * totalRange;
          const rad = (angle * Math.PI) / 180;
          const isMain = i % 5 === 0;
          const r1 = isMain ? 28 : 30;
          return (
            <line
              key={i}
              x1={cx + Math.cos(rad) * r1}
              y1={cy + Math.sin(rad) * r1}
              x2={cx + Math.cos(rad) * 34}
              y2={cy + Math.sin(rad) * 34}
              stroke="#b5a642"
              strokeWidth={isMain ? 1.5 : 0.7}
              strokeOpacity={isMain ? 0.9 : 0.35}
            />
          );
        })}
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#b87333"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={3} fill="#b5a642" />
        <circle cx={cx} cy={cy} r={1.4} fill="#2a1f15" />
        {/* Value text */}
        <text
          x={cx}
          y={cy + 17}
          textAnchor="middle"
          fontSize={8}
          fill="#f5f0e1"
          fontFamily="monospace"
          opacity={0.75}
        >
          {value}%
        </text>
      </svg>
      <span className="text-[8px] font-mono text-[#b87333]/65 tracking-widest uppercase leading-none">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component Demos                                                    */
/* ------------------------------------------------------------------ */

function SteampunkButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  if (variant === "secondary") {
    return (
      <button className="group relative px-7 py-3 bg-transparent border-2 border-[#b87333]/60 text-[#b87333] font-serif tracking-wide text-sm hover:border-[#b87333] hover:text-[#f5f0e1] hover:bg-[#b87333]/20 hover:shadow-[0_0_20px_rgba(184,115,51,0.4)] active:scale-95 transition-all duration-300">
        <span className="relative z-10">{children}</span>
        <span
          className="absolute inset-x-0 top-0 h-px bg-[#b87333]/35 group-hover:bg-[#b87333]/60 transition-colors duration-300"
          aria-hidden="true"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-px bg-[#b87333]/35 group-hover:bg-[#b87333]/60 transition-colors duration-300"
          aria-hidden="true"
        />
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button className="group px-7 py-3 bg-transparent border border-[#b5a642]/30 text-[#f5f0e1]/55 font-serif tracking-wide text-sm hover:border-[#b5a642]/60 hover:text-[#b5a642] hover:shadow-[0_0_10px_rgba(181,166,66,0.18)] active:scale-95 transition-all duration-300">
        {children}
      </button>
    );
  }

  return (
    <button className="group relative px-8 py-3.5 bg-[#b5a642] border-2 border-[#b5a642] text-[#2a1f15] font-serif font-semibold tracking-wide text-sm hover:bg-[#c9b84d] hover:border-[#c9b84d] hover:shadow-[0_0_20px_rgba(181,166,66,0.4),0_4px_12px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-300">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-x-2 top-0.5 h-px bg-white/25 rounded-full"
        aria-hidden="true"
      />
    </button>
  );
}

function SteampunkCard({ item }: { item: (typeof inventions)[0] }) {
  return (
    <div className="group relative bg-[#2a1f15] border-2 border-[#b87333]/40 hover:border-[#b87333]/70 hover:shadow-[0_0_20px_rgba(184,115,51,0.25),0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden">
      {/* Corner rivets */}
      <div
        className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#b87333] border border-[#b87333]/50"
        style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#b87333] border border-[#b87333]/50"
        style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-[#b87333] border border-[#b87333]/50"
        style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#b87333] border border-[#b87333]/50"
        style={{ boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)" }}
        aria-hidden="true"
      />

      {/* Header band */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#b87333]/30">
        <div>
          <span className="text-[9px] font-mono text-[#b87333]/70 tracking-[0.35em] uppercase block">
            {item.id} — {item.year}
          </span>
          <h3 className="font-serif text-[#b5a642] text-lg mt-0.5 leading-tight">
            {item.title}
          </h3>
        </div>
        <div className="opacity-45 group-hover:opacity-80 transition-opacity duration-500">
          <GearSVG size={30} color="#b5a642" spin spinDuration="8s" />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-[#f5f0e1]/65 font-serif text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Gauge footer */}
      <div className="px-5 pb-4 flex items-center justify-between border-t border-[#b87333]/20 pt-3">
        <span className="text-[9px] font-mono text-[#b87333]/55 tracking-widest uppercase">
          {item.subtitle}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-[#4a4a4a]/50 overflow-hidden">
            <div
              className="h-full transition-all duration-700"
              style={{
                width: `${item.pressure}%`,
                backgroundColor:
                  item.pressure > 80 ? "#b87333" : "#b5a642",
              }}
            />
          </div>
          <span className="text-[9px] font-mono text-[#b5a642]/65">
            {item.pressure}%
          </span>
        </div>
      </div>
    </div>
  );
}

function SteampunkInput() {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[9px] font-mono text-[#b87333]/70 tracking-[0.4em] uppercase mb-2">
          Operator Name
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter designation..."
            className="w-full px-4 py-3 bg-[#2a1f15] border border-[#b87333]/40 text-[#f5f0e1] font-serif text-sm placeholder-[#f5f0e1]/20 focus:border-[#b5a642]/70 focus:shadow-[0_0_12px_rgba(181,166,66,0.2)] focus:outline-none transition-all duration-300"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-35"
            aria-hidden="true"
          >
            <SmallGear size={16} color="#b87333" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-[9px] font-mono text-[#b87333]/70 tracking-[0.4em] uppercase mb-2">
          Workshop Registry
        </label>
        <input
          type="text"
          placeholder="REG-XXXX-YYYY"
          className="w-full px-4 py-3 bg-[#2a1f15] border border-[#b87333]/40 text-[#f5f0e1] font-mono text-sm placeholder-[#f5f0e1]/20 focus:border-[#b5a642]/70 focus:shadow-[0_0_12px_rgba(181,166,66,0.2)] focus:outline-none transition-all duration-300 tracking-widest"
        />
      </div>
      <div>
        <label className="block text-[9px] font-mono text-[#b87333]/70 tracking-[0.4em] uppercase mb-2">
          Technical Notes
        </label>
        <textarea
          placeholder="Describe the mechanical configuration..."
          rows={3}
          className="w-full px-4 py-3 bg-[#2a1f15] border border-[#b87333]/40 text-[#f5f0e1] font-serif text-sm placeholder-[#f5f0e1]/20 focus:border-[#b5a642]/70 focus:shadow-[0_0_12px_rgba(181,166,66,0.2)] focus:outline-none transition-all duration-300 resize-none"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Header helper                                              */
/* ------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  delay = 0,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  delay?: number;
}) {
  return (
    <>
      <RevealBlock delay={delay} className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <SmallGear size={14} color="#b87333" className="opacity-45" />
          <span className="text-[9px] font-mono text-[#b87333]/60 tracking-[0.5em] uppercase">
            {eyebrow}
          </span>
        </div>
        <h2
          className="font-serif text-[#b5a642] leading-tight"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            textShadow: "0 0 20px rgba(181,166,66,0.2)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm font-serif text-[#f5f0e1]/40 mt-2 max-w-sm leading-relaxed">
            {subtitle}
          </p>
        )}
      </RevealBlock>

      <RevealBlock delay={delay + 0.04} className="mb-10">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-[#b87333]/50 to-transparent" />
          <RivetRow count={3} />
          <div className="h-px flex-1 bg-gradient-to-l from-[#b87333]/50 to-transparent" />
        </div>
      </RevealBlock>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: _heroInView } = useInView();
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("BUTTONS");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#3d2b1f] text-[#f5f0e1]">
      <style>{`
        @keyframes steam-rise {
          0%   { opacity: 0;    transform: translateY(0px)   scaleX(1);   }
          40%  { opacity: 0.3; }
          100% { opacity: 0;    transform: translateY(-64px) scaleX(1.5); }
        }
        @keyframes gear-ambient-pulse {
          0%, 100% { opacity: 0.06; }
          50%       { opacity: 0.14; }
        }
        .steam-puff-a { animation: steam-rise 3.8s ease-out infinite; }
        .steam-puff-b { animation: steam-rise 3.8s ease-out 1.3s infinite; }
        .steam-puff-c { animation: steam-rise 3.8s ease-out 2.5s infinite; }
        .gear-ambient  { animation: gear-ambient-pulse 5s ease-in-out infinite; }
        .gear-ambient-slow { animation: gear-ambient-pulse 7s ease-in-out 1.5s infinite; }
      `}</style>

      {/* ==============================================================
          NAVIGATION — fixed, dark mahogany, brass text, copper border
      ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2a1f15]/96 backdrop-blur-md border-b-2 border-[#b87333]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="gear-ambient">
                <GearSVG size={22} color="#b5a642" opacity={0.85} />
              </div>
              <span className="font-serif text-[#b5a642] text-base tracking-wide">
                Steampunk
              </span>
              <span className="hidden md:block text-[#b87333]/40 text-[9px] font-mono ml-1 tracking-widest">
                / AETHERIC STEAM CO.
              </span>
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-0">
              <Link
                href="/styles/steampunk"
                className="px-4 h-14 font-mono text-[9px] text-[#f5f0e1]/40 tracking-[0.3em] uppercase hover:text-[#b5a642] hover:bg-[#b5a642]/8 border-l border-[#b87333]/30 transition-colors duration-300 flex items-center"
              >
                DOCS
              </Link>
              <Link
                href="/styles"
                className="px-4 h-14 font-mono text-[9px] text-[#f5f0e1]/40 tracking-[0.3em] uppercase hover:text-[#b5a642] hover:bg-[#b5a642]/8 border-l border-[#b87333]/30 transition-colors duration-300 flex items-center"
              >
                ALL STYLES
              </Link>
              <Link
                href="/"
                className="ml-3 px-5 py-2 font-mono text-[9px] text-[#b5a642] tracking-[0.3em] uppercase border border-[#b5a642]/40 hover:bg-[#b5a642]/15 hover:border-[#b5a642]/70 hover:shadow-[0_0_12px_rgba(181,166,66,0.2)] transition-all duration-300"
              >
                STYLEKIT &rarr;
              </Link>
            </nav>
          </div>
        </div>
        {/* Copper shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(184,115,51,0.6), transparent)",
          }}
          aria-hidden="true"
        />
      </header>

      {/* ==============================================================
          HERO — Dark mahogany, gear decorations, brass serif title
      ============================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        {/* Ambient background gears */}
        <div
          className="absolute top-[8%] left-[2%] gear-ambient pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={180} color="#b5a642" />
        </div>
        <div
          className="absolute bottom-[10%] right-[3%] gear-ambient-slow pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={240} color="#b87333" />
        </div>
        <div
          className="absolute top-[38%] right-[1%] gear-ambient pointer-events-none"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        >
          <GearSVG size={88} color="#b5a642" />
        </div>
        <div
          className="absolute top-[16%] right-[16%] gear-ambient pointer-events-none"
          style={{ animationDelay: "0.7s" }}
          aria-hidden="true"
        >
          <SmallGear size={52} color="#b87333" />
        </div>
        <div
          className="absolute bottom-[28%] left-[7%] gear-ambient pointer-events-none"
          style={{ animationDelay: "1.8s" }}
          aria-hidden="true"
        >
          <SmallGear size={70} color="#b5a642" />
        </div>

        {/* Vertical pipe lines */}
        <div
          className="absolute left-[11%] top-0 bottom-0 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(184,115,51,0.18), transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-[11%] top-0 bottom-0 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(184,115,51,0.18), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Steam puffs */}
        <div
          className="absolute top-[14%] left-[27%] pointer-events-none"
          aria-hidden="true"
        >
          <div className="steam-puff-a w-8 h-14 bg-[#f5f0e1]/5 rounded-full blur-md" />
        </div>
        <div
          className="absolute top-[19%] left-[30%] pointer-events-none"
          aria-hidden="true"
        >
          <div className="steam-puff-b w-5 h-10 bg-[#f5f0e1]/4 rounded-full blur-md" />
        </div>
        <div
          className="absolute top-[17%] left-[33%] pointer-events-none"
          aria-hidden="true"
        >
          <div className="steam-puff-c w-4 h-8 bg-[#f5f0e1]/3 rounded-full blur-sm" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div
            className="flex items-center justify-center gap-3 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="h-px w-14 bg-[#b87333]/50" />
            <span className="text-[9px] font-mono text-[#b87333]/70 tracking-[0.5em] uppercase">
              Aetheric Steam Co. — Est. 1872
            </span>
            <div className="h-px w-14 bg-[#b87333]/50" />
          </div>

          {/* Giant brass serif title */}
          <h1
            ref={heroRef}
            className="font-serif leading-[0.88] tracking-tight mb-5 select-none"
            style={{
              fontSize: "clamp(4rem, 13vw, 10rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
              color: "#b5a642",
              textShadow:
                "0 0 60px rgba(181,166,66,0.3), 0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            Steam
            <span style={{ color: "#f5f0e1" }}>punk</span>
          </h1>

          {/* Copper pipe divider */}
          <div
            className="flex items-center justify-center gap-0 mb-6 overflow-hidden"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
            aria-hidden="true"
          >
            <div
              className="h-1 w-10 rounded-l-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(184,115,51,0.6))",
              }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-[#b87333] mx-0.5" />
            <div className="h-1 w-28 bg-[#b87333]/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#b87333] mx-0.5" />
            <div className="h-1 w-5 bg-[#b87333]/65" />
            <SmallGear size={19} color="#b87333" className="mx-0.5" />
            <div className="h-1 w-5 bg-[#b87333]/65" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#b87333] mx-0.5" />
            <div className="h-1 w-28 bg-[#b87333]/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#b87333] mx-0.5" />
            <div
              className="h-1 w-10 rounded-r-full"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(184,115,51,0.6))",
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl font-serif text-[#f5f0e1]/72 mb-3 tracking-wide max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            Victorian industrial revolution reimagined forward.
            Brass gears, copper pipes, steam pressure, clockwork mechanisms.
          </p>

          <p
            className="text-[9px] font-mono text-[#b87333]/55 tracking-widest mb-12 uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            Dark wood + burnished metal + warm amber light
          </p>

          {/* Steam Pressure gauge element */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <div
              className="bg-[#2a1f15] border-2 border-[#b87333]/50 px-6 py-4 flex items-center gap-6"
              style={{ boxShadow: "0 0 24px rgba(181,166,66,0.12)" }}
            >
              <RivetRow count={2} />
              <div className="text-center">
                <div className="text-[9px] font-mono text-[#b87333]/60 tracking-[0.4em] uppercase mb-1">
                  Steam Pressure
                </div>
                <div
                  className="font-mono text-2xl font-bold"
                  style={{
                    color: "#b5a642",
                    textShadow: "0 0 10px rgba(181,166,66,0.4)",
                  }}
                >
                  100%
                </div>
                <div className="text-[9px] font-mono text-[#b87333]/50 tracking-widest mt-0.5 uppercase">
                  Nominal
                </div>
              </div>
              <div className="h-10 w-px bg-[#b87333]/30" aria-hidden="true" />
              <PressureGauge value={100} label="BOILER" />
              <RivetRow count={2} />
            </div>
          </div>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s",
            }}
          >
            <SteampunkButton>Engage the Engine</SteampunkButton>
            <SteampunkButton variant="secondary">
              Inspect Schematics
            </SteampunkButton>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-20 flex flex-col items-center gap-2"
            style={{
              opacity: heroRevealed ? 0.4 : 0,
              transition: "opacity 1s ease 1.4s",
            }}
          >
            <span className="text-[9px] font-mono text-[#b87333]/60 tracking-[0.5em] uppercase">
              Descend
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-[#b87333]/40 to-transparent" />
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #3d2b1f, transparent)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ==============================================================
          INVENTION GALLERY — mahogany panel cards with pressure bars
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#3d2b1f] relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Workshop Catalogue"
            title="Registered Inventions"
            subtitle="Each instrument certified by the Aetheric Steam Co. Guild of Engineers, London."
          />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {inventions.map((item, i) => (
              <RevealBlock key={item.id} delay={i * 0.1}>
                <SteampunkCard item={item} />
              </RevealBlock>
            ))}
          </div>

          {/* Instrument row */}
          <RevealBlock delay={0.3} className="mt-12">
            <div
              className="bg-[#2a1f15] border border-[#b87333]/40 p-6 flex flex-col sm:flex-row items-center justify-center gap-8"
              style={{ boxShadow: "0 0 15px rgba(181,166,66,0.08)" }}
            >
              <RivetRow count={2} />
              <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
                <PressureGauge value={88} label="CONDENSER" />
                <PressureGauge value={72} label="NAVIGATOR" />
                <PressureGauge value={95} label="RELAY" />
                <PressureGauge value={61} label="RESERVES" />
              </div>
              <RivetRow count={2} />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==============================================================
          COMPONENT DEMOS — tab switcher: BUTTONS / CARDS / INPUTS
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#2a1f15] relative overflow-hidden">
        {/* Background gears */}
        <div
          className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={300} color="#b5a642" />
        </div>
        <div
          className="absolute -left-12 bottom-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={200} color="#b87333" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Workshop Components"
            title="Mechanical Elements"
          />

          {/* Tab bar — riveted panel */}
          <RevealBlock delay={0.08} className="mb-6">
            <div className="bg-[#3d2b1f] border-2 border-[#b87333]/40 flex overflow-hidden relative">
              <div
                className="absolute top-1.5 left-3 right-3 flex justify-between pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#b87333]/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#b87333]/40" />
              </div>
              {componentTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 font-mono text-[9px] tracking-[0.3em] uppercase transition-all duration-300 ${
                    i > 0 ? "border-l border-[#b87333]/30" : ""
                  } ${
                    activeTab === tab
                      ? "bg-[#b5a642]/12 text-[#b5a642] shadow-[inset_0_0_16px_rgba(181,166,66,0.08)]"
                      : "text-[#f5f0e1]/30 hover:text-[#b87333]/65 hover:bg-[#b87333]/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Component panel */}
          <RevealBlock delay={0.14}>
            <div
              className="relative bg-[#3d2b1f] border-2 border-[#b87333]/40 p-8 md:p-12 overflow-hidden"
              style={{ boxShadow: "0 0 15px rgba(181,166,66,0.06)" }}
            >
              {/* Panel corner rivets */}
              <div
                className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#b87333]/55"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b87333]/55"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#b87333]/55"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#b87333]/55"
                aria-hidden="true"
              />

              {activeTab === "BUTTONS" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-[9px] font-mono text-[#b87333]/50 tracking-[0.4em] uppercase mb-5">
                      PRIMARY — Brass filled, warm glow on hover
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start flex-wrap">
                      <SteampunkButton>Engage Engine</SteampunkButton>
                      <SteampunkButton>Activate Boiler</SteampunkButton>
                    </div>
                  </div>
                  <div className="h-px bg-[#b87333]/18" />
                  <div>
                    <p className="text-[9px] font-mono text-[#b87333]/50 tracking-[0.4em] uppercase mb-5">
                      SECONDARY — Copper outlined, copper hover glow
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start flex-wrap">
                      <SteampunkButton variant="secondary">
                        Inspect Schematics
                      </SteampunkButton>
                      <SteampunkButton variant="secondary">
                        View Registry
                      </SteampunkButton>
                    </div>
                  </div>
                  <div className="h-px bg-[#b87333]/18" />
                  <div>
                    <p className="text-[9px] font-mono text-[#b87333]/50 tracking-[0.4em] uppercase mb-5">
                      GHOST — Subtle brass outline, delicate hover
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start flex-wrap">
                      <SteampunkButton variant="ghost">
                        Discharge Pressure
                      </SteampunkButton>
                      <SteampunkButton variant="ghost">Archives</SteampunkButton>
                    </div>
                  </div>
                  <p className="text-[9px] font-mono text-[#f5f0e1]/22 tracking-[0.3em] uppercase pt-1">
                    All buttons use serif text — warm brass glow on hover — no rounded pills
                  </p>
                </div>
              )}

              {activeTab === "CARDS" && (
                <div className="space-y-6">
                  <p className="text-[9px] font-mono text-[#b87333]/50 tracking-[0.4em] uppercase mb-5">
                    PANEL CARD — Riveted mahogany, copper borders, brass headings
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {inventions.slice(0, 2).map((item, i) => (
                      <RevealBlock key={item.id} delay={i * 0.08}>
                        <SteampunkCard item={item} />
                      </RevealBlock>
                    ))}
                  </div>
                  <p className="text-[9px] font-mono text-[#f5f0e1]/22 tracking-[0.3em] uppercase pt-1">
                    Hover activates copper border glow — riveted corners always visible
                  </p>
                </div>
              )}

              {activeTab === "INPUTS" && (
                <div className="space-y-6 max-w-md mx-auto">
                  <p className="text-[9px] font-mono text-[#b87333]/50 tracking-[0.4em] uppercase mb-5">
                    INPUT FIELD — Dark mahogany bg, copper border, brass focus glow
                  </p>
                  <SteampunkInput />
                  <p className="text-[9px] font-mono text-[#f5f0e1]/22 tracking-[0.3em] uppercase pt-1">
                    Focus: brass glow shadow — placeholder ivory at 20% opacity
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==============================================================
          COLOR PALETTE — Metal plate swatches
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#3d2b1f] relative overflow-hidden">
        <div
          className="absolute top-8 right-8 opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={120} color="#b5a642" />
        </div>

        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Material Specification"
            title="Metal Palette"
            subtitle="Every tone drawn from the workshop. Brass, copper, iron, mahogany, and aged ivory."
          />

          {/* Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.07}>
                <div
                  className="group relative border-2 overflow-hidden cursor-default hover:shadow-[0_0_20px_rgba(181,166,66,0.3)] transition-shadow duration-500"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: `${color.hex}80`,
                  }}
                >
                  {/* Corner rivets */}
                  <div
                    className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: color.textDark ? "#2a1f15" : "#f5f0e1",
                      opacity: 0.35,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: color.textDark ? "#2a1f15" : "#f5f0e1",
                      opacity: 0.35,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: color.textDark ? "#2a1f15" : "#f5f0e1",
                      opacity: 0.35,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: color.textDark ? "#2a1f15" : "#f5f0e1",
                      opacity: 0.35,
                    }}
                    aria-hidden="true"
                  />

                  <div className="px-4 pt-8 pb-5">
                    {/* Shine line */}
                    <div
                      className="h-px w-full mb-4 opacity-18"
                      style={{
                        background: `linear-gradient(to right, transparent, ${
                          color.textDark ? "#2a1f15" : "#f5f0e1"
                        }, transparent)`,
                      }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-[9px] font-mono tracking-[0.4em] uppercase mb-1 opacity-55"
                      style={{
                        color: color.textDark ? "#2a1f15" : "#f5f0e1",
                      }}
                    >
                      {color.label}
                    </p>
                    <p
                      className="font-serif text-base font-medium leading-tight mb-2"
                      style={{
                        color: color.textDark ? "#2a1f15" : "#f5f0e1",
                      }}
                    >
                      {color.name}
                    </p>
                    <p
                      className="text-[9px] font-mono tracking-[0.2em] opacity-65"
                      style={{
                        color: color.textDark ? "#2a1f15" : "#f5f0e1",
                      }}
                    >
                      {color.hex}
                    </p>
                    <div
                      className="h-px w-full mt-4 opacity-12"
                      style={{
                        backgroundColor: color.textDark ? "#2a1f15" : "#f5f0e1",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient bar */}
          <RevealBlock delay={0.4} className="mt-10">
            <div
              className="h-2 border border-[#b87333]/30"
              style={{
                background:
                  "linear-gradient(to right, #2a1f15, #4a4a4a, #b87333, #b5a642, #f5f0e1)",
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-mono text-[#b87333]/40 tracking-widest">
                MAHOGANY
              </span>
              <span className="text-[9px] font-mono text-[#b87333]/40 tracking-widest">
                AGED IVORY
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==============================================================
          TYPOGRAPHY — Serif headings vs mono data labels
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#2a1f15] relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={250} color="#b87333" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Type Foundry"
            title="Victorian Typography"
          />

          {/* Specimens table */}
          <div className="border-2 border-[#b87333]/30">
            {typographyExamples.map((t, i) => (
              <RevealBlock key={t.label} delay={i * 0.06}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-3 px-6 py-5 border-b border-[#b87333]/14 last:border-b-0 hover:bg-[#b5a642]/4 transition-colors duration-300 cursor-default">
                  {/* Labels */}
                  <div className="md:w-40 shrink-0">
                    <span className="text-[9px] font-mono text-[#b87333]/50 tracking-[0.3em] uppercase block">
                      {t.sizeStyle.startsWith("clamp") ? "DISPLAY" : t.sizeStyle}
                    </span>
                    <span className="text-[8px] font-mono text-[#b87333]/35 tracking-[0.2em] uppercase leading-tight block mt-0.5">
                      {t.label}
                    </span>
                  </div>
                  {/* Sample */}
                  <div className="flex-1 overflow-hidden">
                    <span
                      className={`${t.font} ${t.colorClass} leading-tight block`}
                      style={{ fontSize: t.sizeStyle }}
                    >
                      {t.sample}
                    </span>
                  </div>
                  {/* Font tag */}
                  <div className="md:w-20 shrink-0 text-right">
                    <span className="text-[8px] font-mono text-[#b87333]/35 tracking-widest uppercase">
                      {t.font === "font-serif" ? "serif" : "mono"}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Note panel */}
          <RevealBlock delay={0.35} className="mt-6">
            <div className="bg-[#3d2b1f] border border-[#b87333]/28 px-6 py-4 flex items-start gap-4">
              <GearSVG size={18} color="#b5a642" className="opacity-38 shrink-0 mt-0.5" />
              <p className="text-xs font-mono text-[#f5f0e1]/38 leading-relaxed tracking-wide">
                Rule:{" "}
                <span className="text-[#b5a642]/58">font-serif</span> for
                all headings and body copy.&ensp;
                <span className="text-[#b87333]/55">font-mono</span> for
                data, labels, IDs, measurements, and technical readings.
                Sans-serif is forbidden in the Victorian workshop.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==============================================================
          DESIGN PRINCIPLES — Gear-panel instrumentation do/don't
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#3d2b1f] relative overflow-hidden">
        <div
          className="absolute top-8 left-6 opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={100} color="#b87333" />
        </div>
        <div
          className="absolute bottom-8 right-6 opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        >
          <SmallGear size={80} color="#b5a642" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Engineering Manifesto"
            title="Workshop Standards"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO panel */}
            <RevealBlock delay={0.06}>
              <div
                className="relative bg-[#2a1f15] border-2 border-[#b5a642]/40 overflow-hidden"
                style={{ boxShadow: "0 0 15px rgba(181,166,66,0.06)" }}
              >
                {/* Corner rivets */}
                <div
                  className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#b5a642]/48"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b5a642]/48"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#b5a642]/48"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#b5a642]/48"
                  aria-hidden="true"
                />

                {/* Panel header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#b5a642]/22 bg-[#b5a642]/6">
                  <GearSVG size={16} color="#b5a642" className="opacity-65" />
                  <h3 className="font-mono text-[#b5a642] text-[9px] tracking-[0.5em] uppercase">
                    Approved Standards
                  </h3>
                  <div
                    className="ml-auto w-2 h-2 rounded-full bg-[#b5a642]/55"
                    aria-hidden="true"
                  />
                </div>

                {/* Rules */}
                <ul className="divide-y divide-[#b5a642]/10">
                  {doRules.map((rule, i) => (
                    <li
                      key={i}
                      className="group px-6 py-4 hover:bg-[#b5a642]/6 transition-colors duration-300 cursor-default"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-[8px] font-mono text-[#b5a642]/38 mt-0.5 shrink-0 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-serif text-[#b5a642] group-hover:text-[#c9b84d] transition-colors duration-300 leading-snug mb-1">
                            {rule.title}
                          </p>
                          <code className="text-[9px] font-mono text-[#b87333]/55 block mb-1.5">
                            {rule.code}
                          </code>
                          <p className="text-xs font-serif text-[#f5f0e1]/42 leading-relaxed">
                            {rule.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.12}>
              <div className="relative bg-[#2a1f15] border-2 border-[#b87333]/40 overflow-hidden">
                {/* Corner rivets */}
                <div
                  className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#b87333]/48"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b87333]/48"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#b87333]/48"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#b87333]/48"
                  aria-hidden="true"
                />

                {/* Panel header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#b87333]/22 bg-[#b87333]/6">
                  <SmallGear size={16} color="#b87333" className="opacity-65" />
                  <h3 className="font-mono text-[#b87333] text-[9px] tracking-[0.5em] uppercase">
                    Forbidden Practices
                  </h3>
                  <div
                    className="ml-auto w-2 h-2 rounded-full bg-[#b87333]/55"
                    aria-hidden="true"
                  />
                </div>

                {/* Rules */}
                <ul className="divide-y divide-[#b87333]/10">
                  {dontRules.map((rule, i) => (
                    <li
                      key={i}
                      className="group px-6 py-4 hover:bg-[#b87333]/6 transition-colors duration-300 cursor-default"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-[8px] font-mono text-[#b87333]/38 mt-0.5 shrink-0 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-serif text-[#b87333]/80 group-hover:text-[#b87333] transition-colors duration-300 leading-snug mb-1">
                            {rule.title}
                          </p>
                          <code className="text-[9px] font-mono text-[#b87333]/48 block mb-1.5">
                            {rule.code}
                          </code>
                          <p className="text-xs font-serif text-[#f5f0e1]/38 leading-relaxed">
                            {rule.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ==============================================================
          MOTION TOKENS — Mechanical motion reference
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#2a1f15] relative overflow-hidden">
        <div
          className="absolute top-0 right-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={200} color="#b5a642" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Motion Engineering"
            title="Mechanical Motion"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {motionTokens.map((item) => (
              <RevealBlock key={item.name} delay={item.delay}>
                <div className="group relative bg-[#3d2b1f] border border-[#b87333]/28 hover:border-[#b87333]/58 hover:shadow-[0_0_20px_rgba(181,166,66,0.1)] transition-all duration-500 p-6 overflow-hidden cursor-default h-full">
                  <div
                    className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#b87333]/35"
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 mt-0.5 opacity-48 group-hover:opacity-78 transition-opacity duration-300">
                      <SmallGear
                        size={18}
                        color={item.gearColor}
                        spin
                        spinDuration="5s"
                      />
                    </div>
                    <h4 className="font-serif text-[#b5a642] text-base leading-tight group-hover:text-[#c9b84d] transition-colors duration-300">
                      {item.name}
                    </h4>
                  </div>
                  <code className="text-[9px] font-mono text-[#b87333]/52 block mb-3 leading-relaxed break-all">
                    {item.token}
                  </code>
                  <p className="text-xs font-serif text-[#f5f0e1]/38 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          INSTRUMENT PANEL — Live gauges + spinning gear cluster
      ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#3d2b1f] relative overflow-hidden">
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={340} color="#b5a642" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Control Instruments"
            title="Instrument Panel"
          />

          <RevealBlock delay={0.1}>
            <div
              className="relative bg-[#2a1f15] border-2 border-[#b87333]/50 p-8 md:p-12"
              style={{
                boxShadow:
                  "0 0 30px rgba(181,166,66,0.08), 0 16px 48px rgba(0,0,0,0.6)",
              }}
            >
              {/* Large corner rivets */}
              <div
                className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#b87333] border border-[#b87333]/50"
                style={{ boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)" }}
                aria-hidden="true"
              />
              <div
                className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#b87333] border border-[#b87333]/50"
                style={{ boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)" }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#b87333] border border-[#b87333]/50"
                style={{ boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)" }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#b87333] border border-[#b87333]/50"
                style={{ boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)" }}
                aria-hidden="true"
              />

              {/* Panel label */}
              <div className="text-center mb-8 border-b border-[#b87333]/22 pb-5">
                <span className="text-[9px] font-mono text-[#b87333]/58 tracking-[0.6em] uppercase">
                  Aetheric Steam Co. — Main Control Panel — MK-VII
                </span>
              </div>

              {/* Circular gauges */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
                <PressureGauge value={95} label="BOILER" />
                <PressureGauge value={72} label="STEAM FEED" />
                <PressureGauge value={88} label="OUTPUT" />
                <PressureGauge value={61} label="RESERVE" />
                <PressureGauge value={44} label="COOLANT" />
              </div>

              {/* Linear gauges */}
              <div className="space-y-4 border-t border-[#b87333]/18 pt-6">
                {[
                  { label: "TEMPERATURE", value: 78, unit: "°C / 347" },
                  { label: "ROTATIONAL SPEED", value: 91, unit: "RPM / 1440" },
                  { label: "VOLTAGE OUTPUT", value: 55, unit: "VOLTS / 440" },
                  { label: "COAL RESERVES", value: 33, unit: "TONS / 12.4" },
                ].map((gauge) => (
                  <div key={gauge.label} className="flex items-center gap-4">
                    <span className="text-[8px] font-mono text-[#b87333]/48 tracking-[0.3em] uppercase w-36 shrink-0">
                      {gauge.label}
                    </span>
                    <div className="flex-1 h-2 bg-[#4a4a4a]/40 overflow-hidden">
                      <div
                        className="h-full transition-all duration-700"
                        style={{
                          width: `${gauge.value}%`,
                          backgroundColor:
                            gauge.value > 80 ? "#b87333" : "#b5a642",
                        }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-[#b5a642]/58 w-22 shrink-0 text-right">
                      {gauge.unit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gear cluster */}
              <div className="flex items-center justify-center gap-2 mt-10 border-t border-[#b87333]/18 pt-8">
                <GearSVG size={52} color="#b5a642" spin spinDuration="8s" />
                <SmallGear size={34} color="#b87333" spin reverse spinDuration="5s" />
                <GearSVG size={44} color="#b5a642" spin spinDuration="9s" />
                <SmallGear size={26} color="#b87333" spin spinDuration="4s" />
                <GearSVG size={38} color="#b87333" spin reverse spinDuration="7s" />
                <SmallGear size={32} color="#b5a642" spin reverse spinDuration="6s" />
                <GearSVG size={48} color="#b5a642" spin spinDuration="10s" />
              </div>

              <p className="text-center text-[8px] font-mono text-[#b87333]/32 tracking-[0.4em] uppercase mt-4">
                All systems nominal — steam pressure maintained
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==============================================================
          FOOTER — dark mahogany, gear motifs, brass text
      ============================================================== */}
      <footer className="bg-[#2a1f15] border-t-2 border-[#b87333]/50 relative overflow-hidden">
        {/* Ambient background gears */}
        <div
          className="absolute bottom-0 left-0 opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={200} color="#b5a642" />
        </div>
        <div
          className="absolute top-0 right-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        >
          <GearSVG size={150} color="#b87333" />
        </div>

        {/* Shimmer top line */}
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(184,115,51,0.6), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Main footer */}
          <div className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GearSVG size={30} color="#b5a642" spin spinDuration="8s" />
                <SmallGear
                  size={18}
                  color="#b87333"
                  spin
                  reverse
                  spinDuration="5s"
                />
              </div>
              <h3
                className="font-serif text-[#b5a642] mb-3 leading-tight"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  textShadow: "0 0 15px rgba(181,166,66,0.22)",
                }}
              >
                Steampunk
              </h3>
              <p className="text-sm font-serif text-[#f5f0e1]/38 leading-relaxed mb-4">
                Victorian industrial revolution aesthetic imagined forward.
                Brass gears, copper pipes, clockwork mechanisms.
              </p>
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-[#b87333]/45" />
                <span className="text-[8px] font-mono text-[#b87333]/38 tracking-[0.4em] uppercase">
                  Est. 1872
                </span>
                <div className="h-px w-8 bg-[#b87333]/45" />
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-mono text-[9px] text-[#b87333]/58 tracking-[0.4em] uppercase mb-5">
                Navigation
              </h4>
              <ul className="space-y-0">
                {[
                  { label: "Documentation", href: "/styles/steampunk" },
                  { label: "All Styles", href: "/styles" },
                  { label: "StyleKit Home", href: "/" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 py-2.5 border-b border-[#b87333]/14 hover:border-[#b87333]/32 text-[#f5f0e1]/38 hover:text-[#b5a642] font-serif text-sm transition-all duration-300"
                    >
                      <span className="text-[#b87333]/28 group-hover:text-[#b87333] font-mono text-[8px] transition-colors duration-300">
                        &rarr;
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colour chips + system info */}
            <div>
              <h4 className="font-mono text-[9px] text-[#b87333]/58 tracking-[0.4em] uppercase mb-5">
                Palette
              </h4>
              <div className="flex gap-2 mb-6">
                {colorPalette.map((c) => (
                  <div
                    key={c.hex}
                    className="w-8 h-8 border border-[#b87333]/28 hover:border-[#b87333]/55 transition-colors duration-300 cursor-default"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} — ${c.hex}`}
                  />
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { label: "Style", value: "Steampunk / Victorian" },
                  { label: "Primary Font", value: "font-serif" },
                  { label: "Data Font", value: "font-mono" },
                  { label: "Base BG", value: "#3d2b1f" },
                  { label: "Version", value: "MK-VII" },
                ].map((info) => (
                  <div key={info.label} className="flex items-baseline gap-3">
                    <span className="text-[8px] font-mono text-[#b87333]/38 tracking-[0.3em] uppercase w-24 shrink-0">
                      {info.label}
                    </span>
                    <span className="text-[9px] font-mono text-[#f5f0e1]/28">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer bottom bar */}
          <div className="border-t border-[#b87333]/22 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <RivetRow count={3} />
              <span className="text-[8px] font-mono text-[#f5f0e1]/18 tracking-[0.4em] uppercase">
                &copy; 2026 StyleKit — Steampunk Design System
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SmallGear
                size={13}
                color="#b87333"
                className="opacity-28"
                spin
                spinDuration="5s"
              />
              <span className="text-[8px] font-mono text-[#b87333]/28 tracking-widest uppercase">
                All systems nominal
              </span>
              <SmallGear
                size={13}
                color="#b5a642"
                className="opacity-28"
                spin
                reverse
                spinDuration="7s"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
