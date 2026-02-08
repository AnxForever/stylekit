"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Music,
  Sun,
  Sunset,
  Radio,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  Play,
  ArrowLeft,
  Car,
  Gauge,
  Volume2,
  Disc,
  FastForward,
  Rewind,
  Moon,
  Star,
  Sparkles,
  Timer,
  Trophy,
  Crown,
  Medal,
  Target,
} from "lucide-react";

// ============================================================================
// INLINE COMPONENTS - Outrun Style System
// ============================================================================

/** NeonGlowPanel - Panel with animated neon border glow effect */
function NeonGlowPanel({
  children,
  color = "magenta",
  className = "",
}: {
  children: React.ReactNode;
  color?: "magenta" | "cyan" | "purple" | "orange";
  className?: string;
}) {
  const colorMap = {
    magenta: {
      border: "border-[#ff006e]/50",
      glow: "shadow-[0_0_30px_rgba(255,0,110,0.3),inset_0_0_20px_rgba(255,0,110,0.1)]",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(255,0,110,0.5),inset_0_0_30px_rgba(255,0,110,0.15)]",
    },
    cyan: {
      border: "border-[#00d4ff]/50",
      glow: "shadow-[0_0_30px_rgba(0,212,255,0.3),inset_0_0_20px_rgba(0,212,255,0.1)]",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(0,212,255,0.5),inset_0_0_30px_rgba(0,212,255,0.15)]",
    },
    purple: {
      border: "border-[#a020f0]/50",
      glow: "shadow-[0_0_30px_rgba(160,32,240,0.3),inset_0_0_20px_rgba(160,32,240,0.1)]",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(160,32,240,0.5),inset_0_0_30px_rgba(160,32,240,0.15)]",
    },
    orange: {
      border: "border-[#ff6b35]/50",
      glow: "shadow-[0_0_30px_rgba(255,107,53,0.3),inset_0_0_20px_rgba(255,107,53,0.1)]",
      hoverGlow: "hover:shadow-[0_0_50px_rgba(255,107,53,0.5),inset_0_0_30px_rgba(255,107,53,0.15)]",
    },
  };

  const { border, glow, hoverGlow } = colorMap[color];

  return (
    <div
      className={`
        bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border ${border}
        ${glow} ${hoverGlow} transition-all duration-500
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/** ChromeText - Text with chrome/metallic gradient effect */
function ChromeText({
  children,
  as: Component = "span",
  size = "lg",
  className = "",
}: {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}) {
  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
    "2xl": "text-4xl md:text-5xl",
  };

  return (
    <Component
      className={`
        font-extrabold uppercase tracking-tight
        text-transparent bg-clip-text
        bg-gradient-to-b from-white via-[#c0c0c0] to-[#808080]
        drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]
        ${sizeMap[size]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

/** SunsetProgress - Progress bar with pink-to-orange gradient and glow */
function SunsetProgress({
  value,
  label,
  showPercentage = true,
}: {
  value: number;
  label: string;
  showPercentage?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="flex justify-between font-mono text-xs text-[#ff006e]/70 mb-2 uppercase tracking-wider">
        <span>{label}</span>
        {showPercentage && <span>{value}%</span>}
      </div>
      <div className="h-4 bg-[#0a0a0a] border border-[#ff006e]/30 rounded-full overflow-hidden relative">
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
        {/* Progress fill */}
        <div
          className="h-full bg-gradient-to-r from-[#a020f0] via-[#ff006e] to-[#ff6b35] rounded-full shadow-[0_0_20px_rgba(255,0,110,0.6)] transition-all duration-700 ease-out relative"
          style={{ width: `${value}%` }}
        >
          {/* Animated shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/** NeonToggle - Toggle switch with neon glow effect */
function NeonToggle({
  checked,
  onChange,
  label,
  color = "magenta",
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  color?: "magenta" | "cyan" | "purple";
}) {
  const colorMap = {
    magenta: {
      active: "bg-[#ff006e]/30 border-[#ff006e] shadow-[0_0_20px_rgba(255,0,110,0.6)]",
      knob: "bg-[#ff006e] shadow-[0_0_15px_rgba(255,0,110,0.8)]",
      inactive: "bg-[#ff006e]/20",
    },
    cyan: {
      active: "bg-[#00d4ff]/30 border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.6)]",
      knob: "bg-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.8)]",
      inactive: "bg-[#00d4ff]/20",
    },
    purple: {
      active: "bg-[#a020f0]/30 border-[#a020f0] shadow-[0_0_20px_rgba(160,32,240,0.6)]",
      knob: "bg-[#a020f0] shadow-[0_0_15px_rgba(160,32,240,0.8)]",
      inactive: "bg-[#a020f0]/20",
    },
  };

  const { active, knob, inactive } = colorMap[color];

  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-sm text-[#00d4ff]/80 uppercase tracking-wider">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`
          w-16 h-8 rounded-full border-2 transition-all duration-300 relative
          ${checked ? active : `bg-[#0a0a0a] border-[#ff006e]/30`}
        `}
      >
        <div
          className={`
            w-6 h-6 rounded-full transition-all duration-300 absolute top-0.5
            ${checked ? `translate-x-8 ${knob}` : `translate-x-0.5 ${inactive}`}
          `}
        />
        {/* ON/OFF indicator */}
        <span
          className={`
            absolute text-[8px] font-mono font-bold tracking-wider transition-opacity duration-300
            ${checked ? "left-2 top-2 text-white opacity-100" : "left-2 top-2 opacity-0"}
          `}
        >
          ON
        </span>
        <span
          className={`
            absolute text-[8px] font-mono font-bold tracking-wider transition-opacity duration-300
            ${!checked ? "right-1.5 top-2 text-[#ff006e]/50 opacity-100" : "right-1.5 top-2 opacity-0"}
          `}
        >
          OFF
        </span>
      </button>
    </div>
  );
}

/** VHSBadge - Retro VHS tape label styled badge */
function VHSBadge({
  children,
  variant = "rec",
}: {
  children: React.ReactNode;
  variant?: "rec" | "play" | "pause" | "ff" | "rew";
}) {
  const variantMap = {
    rec: {
      bg: "bg-[#0a0a0a]",
      text: "text-[#ff006e]",
      border: "border-[#ff006e]/70",
      indicator: "bg-[#ff006e] animate-pulse",
    },
    play: {
      bg: "bg-[#0a0a0a]",
      text: "text-[#00d4ff]",
      border: "border-[#00d4ff]/70",
      indicator: "bg-[#00d4ff]",
    },
    pause: {
      bg: "bg-[#0a0a0a]",
      text: "text-[#ff6b35]",
      border: "border-[#ff6b35]/70",
      indicator: "bg-[#ff6b35]",
    },
    ff: {
      bg: "bg-[#0a0a0a]",
      text: "text-[#a020f0]",
      border: "border-[#a020f0]/70",
      indicator: "bg-[#a020f0]",
    },
    rew: {
      bg: "bg-[#0a0a0a]",
      text: "text-[#00d4ff]",
      border: "border-[#00d4ff]/70",
      indicator: "bg-[#00d4ff]",
    },
  };

  const { bg, text, border, indicator } = variantMap[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-2 px-4 py-1.5
        ${bg} ${text} ${border} border
        font-mono text-xs uppercase tracking-widest
      `}
    >
      <span className={`w-2 h-2 rounded-full ${indicator}`} />
      {children}
    </span>
  );
}

/** GridDivider - Perspective grid line separator */
function GridDivider({
  variant = "horizontal",
  color = "magenta",
}: {
  variant?: "horizontal" | "perspective";
  color?: "magenta" | "cyan" | "mixed";
}) {
  const colorMap = {
    magenta: {
      primary: "rgba(255,0,110,0.4)",
      secondary: "rgba(255,0,110,0.2)",
    },
    cyan: {
      primary: "rgba(0,212,255,0.4)",
      secondary: "rgba(0,212,255,0.2)",
    },
    mixed: {
      primary: "rgba(255,0,110,0.4)",
      secondary: "rgba(0,212,255,0.2)",
    },
  };

  const { primary, secondary } = colorMap[color];

  if (variant === "perspective") {
    return (
      <div className="relative h-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, transparent 49%, ${primary} 49%, ${primary} 51%, transparent 51%),
              linear-gradient(transparent 49%, ${secondary} 49%, ${secondary} 51%, transparent 51%)
            `,
            backgroundSize: "60px 16px",
            transform: "perspective(200px) rotateX(30deg)",
            transformOrigin: "bottom",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="h-8"
      style={{
        background: `
          linear-gradient(90deg, transparent 49%, ${primary} 49%, ${primary} 51%, transparent 51%),
          linear-gradient(transparent 49%, ${secondary} 49%, ${secondary} 51%, transparent 51%)
        `,
        backgroundSize: "40px 8px",
      }}
    />
  );
}

// ============================================================================
// MAIN SHOWCASE COMPONENT
// ============================================================================

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    neonLights: true,
    radioFM: false,
    turboBoost: true,
    nightMode: true,
    retroScan: false,
  });
  const [selectedRadio, setSelectedRadio] = useState("synthwave");

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/20 relative overflow-hidden text-white">
      {/* ================================================================== */}
      {/* BACKGROUND ELEMENTS - Retro Sun & Perspective Grid */}
      {/* ================================================================== */}

      {/* Retro Sun with horizontal bands */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 pointer-events-none">
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0] rounded-t-full opacity-70" />
        {/* Sun bands */}
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="absolute w-full bg-[#0a0a0a]"
            style={{
              height: `${4 + i * 2}px`,
              bottom: `${30 + i * 28}px`,
              opacity: 0.9 - i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Perspective Grid Floor */}
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,0,110,0.1)_100%)] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,110,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,110,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
      </div>

      {/* Palm Tree Silhouettes */}
      <div className="fixed bottom-[22%] left-[5%] pointer-events-none opacity-40">
        <svg viewBox="0 0 120 200" className="w-24 h-48 fill-[#0a0a0a]">
          <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
        </svg>
      </div>
      <div className="fixed bottom-[22%] right-[8%] pointer-events-none opacity-30">
        <svg viewBox="0 0 120 200" className="w-20 h-40 fill-[#0a0a0a]">
          <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
        </svg>
      </div>

      {/* Scanline overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none z-50 opacity-30" />

      {/* ================================================================== */}
      {/* 1. NAVIGATION */}
      {/* ================================================================== */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#ff006e]/30 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/outrun"
            className="flex items-center gap-2 text-[#ff006e]/80 hover:text-[#ff006e] transition-colors font-mono group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <Disc className="w-5 h-5 text-[#ff006e] animate-spin" style={{ animationDuration: "3s" }} />
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] via-[#ff6b35] to-[#00d4ff] uppercase tracking-[0.3em]">
              OUTRUN
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#ff006e]/50 text-[#ff006e] font-bold uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(255,0,110,0.3)] hover:bg-[#ff006e]/20 hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] rounded-lg transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ================================================================== */}
      {/* 2. HERO SECTION */}
      {/* ================================================================== */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* VHS timestamp badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <VHSBadge variant="rec">REC</VHSBadge>
            <span className="font-mono text-xs text-[#00d4ff]/60">00:00:00:00</span>
          </div>

          <p className="font-mono text-xs tracking-[0.5em] uppercase text-[#00d4ff]/80 mb-6">
            {"// STYLE :: RETROWAVE :: 1985"}
          </p>

          <h1 className="text-7xl md:text-9xl font-extrabold uppercase tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff006e] via-[#ff6b35] to-[#a020f0] drop-shadow-[0_0_60px_rgba(255,0,110,0.7)]">
              OUTRUN
            </span>
          </h1>

          <ChromeText as="p" size="xl" className="mb-6">
            Chase the Neon Horizon
          </ChromeText>

          <p className="text-lg text-[#00d4ff]/70 max-w-2xl mx-auto mb-8 font-mono leading-relaxed">
            80s retrowave aesthetics with neon glow, chrome gradients, and infinite sunset highways.
            The future that never was.
          </p>

          {/* Sunset Gradient Divider */}
          <div className="w-80 h-1.5 mx-auto mb-12 bg-gradient-to-r from-[#a020f0] via-[#ff006e] to-[#ff6b35] rounded-full shadow-[0_0_30px_rgba(255,0,110,0.6)]" />

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-12 py-4 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_40px_rgba(255,0,110,0.5)] hover:shadow-[0_0_60px_rgba(255,0,110,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <Play className="w-5 h-5" />
              Start Driving
            </button>
            <button className="px-12 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:bg-[#00d4ff] hover:text-[#0a0a0a] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all duration-300 flex items-center gap-3">
              <Radio className="w-5 h-5" />
              Tune In
            </button>
          </div>
        </div>
      </section>

      <GridDivider variant="perspective" color="mixed" />

      {/* ================================================================== */}
      {/* 3. COLOR PALETTE */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Color System
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            NEON_HORIZON_PALETTE v2.0
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {[
              { name: "Hot Magenta", hex: "#ff006e", glow: "shadow-[0_0_40px_rgba(255,0,110,0.6)]" },
              { name: "Electric Purple", hex: "#a020f0", glow: "shadow-[0_0_40px_rgba(160,32,240,0.6)]" },
              { name: "Neon Cyan", hex: "#00d4ff", glow: "shadow-[0_0_40px_rgba(0,212,255,0.6)]" },
              { name: "Sunset Orange", hex: "#ff6b35", glow: "shadow-[0_0_40px_rgba(255,107,53,0.6)]" },
              { name: "Void Black", hex: "#0a0a0a", glow: "shadow-[inset_0_0_20px_rgba(255,0,110,0.3)]" },
            ].map((color) => (
              <NeonGlowPanel
                key={color.name}
                color={color.name === "Hot Magenta" ? "magenta" : color.name === "Neon Cyan" ? "cyan" : "purple"}
                className="overflow-hidden hover:scale-105 transition-transform duration-300 group"
              >
                <div
                  className={`h-28 ${color.glow} transition-shadow duration-300`}
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4 border-t border-[#ff006e]/20">
                  <p className="font-bold text-sm text-[#ff006e] uppercase tracking-wide">{color.name}</p>
                  <p className="text-xs text-[#00d4ff] font-mono mt-1">{color.hex}</p>
                </div>
              </NeonGlowPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. TYPOGRAPHY - Chrome vs Neon */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Typography
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            CHROME_VS_NEON_DISPLAY
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chrome Typography */}
            <NeonGlowPanel color="cyan" className="p-8">
              <p className="font-mono text-xs text-[#00d4ff] uppercase tracking-widest mb-6 flex items-center gap-2">
                <Star className="w-4 h-4" /> Chrome Display
              </p>
              <ChromeText as="h3" size="2xl" className="mb-4">
                MIDNIGHT
              </ChromeText>
              <ChromeText as="h3" size="xl" className="mb-4">
                CHROME RUSH
              </ChromeText>
              <p className="text-sm text-[#00d4ff]/60 font-mono">
                Metallic gradients with reflective shine. Bold, commanding presence.
              </p>
            </NeonGlowPanel>

            {/* Neon Typography */}
            <NeonGlowPanel color="magenta" className="p-8">
              <p className="font-mono text-xs text-[#ff006e] uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Neon Glow
              </p>
              <h3 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#ff006e] drop-shadow-[0_0_30px_rgba(255,0,110,0.8)] mb-4">
                SUNSET
              </h3>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#00d4ff] drop-shadow-[0_0_20px_rgba(0,212,255,0.8)] mb-4">
                ELECTRIC DREAMS
              </h3>
              <p className="text-sm text-[#ff006e]/60 font-mono">
                Vibrant neon with intense glow effects. Pure 80s energy.
              </p>
            </NeonGlowPanel>
          </div>

          {/* Font comparison */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <NeonGlowPanel color="purple" className="p-6 text-center">
              <p className="font-mono text-[10px] text-[#a020f0] uppercase tracking-widest mb-3">Display</p>
              <p className="text-3xl font-extrabold text-[#ff006e] uppercase">OUTRUN</p>
            </NeonGlowPanel>
            <NeonGlowPanel color="cyan" className="p-6 text-center">
              <p className="font-mono text-[10px] text-[#00d4ff] uppercase tracking-widest mb-3">Mono</p>
              <p className="text-xl font-mono text-[#00d4ff]">SYSTEM_FONT</p>
            </NeonGlowPanel>
            <NeonGlowPanel color="orange" className="p-6 text-center">
              <p className="font-mono text-[10px] text-[#ff6b35] uppercase tracking-widest mb-3">Body</p>
              <p className="text-lg text-[#ff6b35]/80">Clean sans-serif</p>
            </NeonGlowPanel>
          </div>
        </div>
      </section>

      <GridDivider variant="horizontal" color="cyan" />

      {/* ================================================================== */}
      {/* 5. BUTTONS - Neon Glow Variants */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Buttons
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            NEON_CONTROL_INTERFACE
          </p>
          <NeonGlowPanel color="magenta" className="p-10">
            <div className="flex flex-wrap gap-5 justify-center mb-8">
              <button className="px-8 py-4 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(255,0,110,0.5)] hover:shadow-[0_0_50px_rgba(255,0,110,0.8)] hover:scale-105 transition-all flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Primary
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-[#ff006e] text-[#ff006e] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(255,0,110,0.3),inset_0_0_15px_rgba(255,0,110,0.1)] hover:bg-[#ff006e] hover:text-white transition-all">
                Outline
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#ff006e] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(255,107,53,0.5)] hover:shadow-[0_0_50px_rgba(255,107,53,0.8)] hover:scale-105 transition-all flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Sunset
              </button>
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              <button className="px-8 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:bg-[#00d4ff] hover:text-[#0a0a0a] transition-all flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Cyan
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-[#a020f0] to-[#00d4ff] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(160,32,240,0.5)] hover:shadow-[0_0_50px_rgba(160,32,240,0.8)] hover:scale-105 transition-all">
                Gradient
              </button>
              <button className="px-8 py-4 bg-[#0a0a0a] border-2 border-[#a020f0]/50 text-[#a020f0] font-bold uppercase tracking-wider rounded-lg opacity-50 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </NeonGlowPanel>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. CARDS - Retro Panels */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Cards
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            RETRO_DATA_PANELS
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <NeonGlowPanel color="magenta" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ff006e] to-[#a020f0] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,110,0.5)] group-hover:shadow-[0_0_50px_rgba(255,0,110,0.7)] transition-all">
                <Sunset className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#ff6b35] mb-3 uppercase">
                VHS Sunset
              </h3>
              <p className="text-[#ff006e]/60 text-sm leading-relaxed mb-4">
                Tape hiss and tracking lines across the fading horizon. The sun dips below the infinite grid.
              </p>
              <VHSBadge variant="play">PLAY</VHSBadge>
            </NeonGlowPanel>

            <NeonGlowPanel color="cyan" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#a020f0] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,212,255,0.5)] group-hover:shadow-[0_0_50px_rgba(0,212,255,0.7)] transition-all">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a020f0] mb-3 uppercase">
                Midnight Drive
              </h3>
              <p className="text-[#00d4ff]/60 text-sm leading-relaxed mb-4">
                Chrome fenders reflect neon signs. The highway stretches into infinite darkness ahead.
              </p>
              <VHSBadge variant="ff">FF</VHSBadge>
            </NeonGlowPanel>

            <NeonGlowPanel color="purple" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#a020f0] to-[#ff006e] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(160,32,240,0.5)] group-hover:shadow-[0_0_50px_rgba(160,32,240,0.7)] transition-all">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a020f0] to-[#ff006e] mb-3 uppercase">
                Synthwave FM
              </h3>
              <p className="text-[#a020f0]/60 text-sm leading-relaxed mb-4">
                Analog synthesizers pulse through the night. Bass drops echo across the electric cityscape.
              </p>
              <VHSBadge variant="rec">REC</VHSBadge>
            </NeonGlowPanel>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. FORM - Neon Inputs */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-lg mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Form
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            NEON_INPUT_TERMINAL
          </p>
          <NeonGlowPanel color="magenta" className="p-10">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#ff006e] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Handle
                </label>
                <input
                  type="text"
                  placeholder="Enter your handle..."
                  className="w-full px-5 py-4 bg-[#0a0a0a]/80 rounded-lg border-2 border-[#ff006e]/40 text-[#ff006e] placeholder-[#ff006e]/30 shadow-[0_0_15px_rgba(255,0,110,0.1)] focus:border-[#ff006e] focus:shadow-[0_0_30px_rgba(255,0,110,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00d4ff] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Radio className="w-4 h-4" /> Frequency
                </label>
                <input
                  type="text"
                  placeholder="Enter frequency..."
                  className="w-full px-5 py-4 bg-[#0a0a0a]/80 rounded-lg border-2 border-[#00d4ff]/40 text-[#00d4ff] placeholder-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.1)] focus:border-[#00d4ff] focus:shadow-[0_0_30px_rgba(0,212,255,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#a020f0] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Music className="w-4 h-4" /> Message
                </label>
                <textarea
                  placeholder="Broadcast message..."
                  rows={4}
                  className="w-full px-5 py-4 bg-[#0a0a0a]/80 rounded-lg border-2 border-[#a020f0]/40 text-[#a020f0] placeholder-[#a020f0]/30 shadow-[0_0_15px_rgba(160,32,240,0.1)] focus:border-[#a020f0] focus:shadow-[0_0_30px_rgba(160,32,240,0.4)] focus:outline-none transition-all font-mono resize-none"
                />
              </div>
              <button className="w-full px-8 py-4 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(255,0,110,0.5)] hover:shadow-[0_0_50px_rgba(255,0,110,0.8)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                <Zap className="w-5 h-5" />
                Transmit Signal
              </button>
            </div>
          </NeonGlowPanel>
        </div>
      </section>

      <GridDivider variant="perspective" color="magenta" />

      {/* ================================================================== */}
      {/* 8. TABS - Gear Selector */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Tabs
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            GEAR_SELECTOR_INTERFACE
          </p>
          <NeonGlowPanel color="magenta" className="overflow-hidden">
            {/* Tab headers with sunset gradient */}
            <div className="flex border-b-2 border-[#ff006e]/30 bg-gradient-to-r from-[#a020f0]/20 via-[#ff006e]/20 to-[#ff6b35]/20">
              {[
                { label: "DRIVE", icon: <Car className="w-4 h-4" /> },
                { label: "CRUISE", icon: <Gauge className="w-4 h-4" /> },
                { label: "TURBO", icon: <Zap className="w-4 h-4" /> },
              ].map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 font-bold text-sm tracking-[0.2em] py-5 transition-all uppercase flex items-center justify-center gap-2 ${
                    activeTab === i
                      ? "bg-gradient-to-r from-[#ff006e] via-[#ff6b35] to-[#a020f0] text-white shadow-[0_4px_30px_rgba(255,0,110,0.5)]"
                      : "text-[#ff006e]/50 hover:text-[#ff006e] hover:bg-[#ff006e]/10"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab content */}
            <div className="p-8 font-mono text-sm min-h-[160px]">
              {activeTab === 0 && (
                <div className="animate-fade-in">
                  <p className="text-[#ff006e] font-bold mb-3 flex items-center gap-2 text-lg">
                    <Car className="w-5 h-5" /> DRIVE MODE ENGAGED
                  </p>
                  <p className="text-[#00d4ff]/70 leading-relaxed">
                    Steady acceleration through the neon-lit boulevard. The engine hums at 3,200 RPM
                    as palm trees blur past the windows. City lights reflect off the wet asphalt.
                  </p>
                  <div className="mt-4">
                    <SunsetProgress value={65} label="THROTTLE_POSITION" />
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="animate-fade-in">
                  <p className="text-[#ff6b35] font-bold mb-3 flex items-center gap-2 text-lg">
                    <Gauge className="w-5 h-5" /> CRUISE CONTROL ACTIVE
                  </p>
                  <p className="text-[#00d4ff]/70 leading-relaxed">
                    Locked at 88 mph on the open freeway. The sunset paints the sky in electric
                    gradients as the radio plays endless synthwave. Perfect velocity, perfect moment.
                  </p>
                  <div className="mt-4">
                    <SunsetProgress value={88} label="VELOCITY_MPH" />
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className="animate-fade-in">
                  <p className="text-[#a020f0] font-bold mb-3 flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5" /> TURBO BOOST ACTIVATED
                  </p>
                  <p className="text-[#00d4ff]/70 leading-relaxed">
                    Maximum velocity achieved. The speedometer needle bends past the limit. Neon
                    streaks dissolve into light trails across the infinite grid. Time dilates.
                  </p>
                  <div className="mt-4">
                    <SunsetProgress value={100} label="BOOST_PRESSURE" />
                  </div>
                </div>
              )}
            </div>
          </NeonGlowPanel>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. NEON BADGES - Three Variants */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Badges
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            NEON_LABEL_VARIANTS
          </p>
          <div className="space-y-10">
            {/* Neon Tube badges */}
            <div>
              <p className="font-mono text-xs text-[#ff006e]/60 mb-4 tracking-widest uppercase flex items-center gap-2">
                <Zap className="w-3 h-3" /> Neon Tube
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#ff006e]/20 text-[#ff006e] border border-[#ff006e]/50 rounded-full shadow-[0_0_20px_rgba(255,0,110,0.5),inset_0_0_10px_rgba(255,0,110,0.2)]">
                  Live
                </span>
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/50 rounded-full shadow-[0_0_20px_rgba(0,212,255,0.5),inset_0_0_10px_rgba(0,212,255,0.2)]">
                  Online
                </span>
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#a020f0]/20 text-[#a020f0] border border-[#a020f0]/50 rounded-full shadow-[0_0_20px_rgba(160,32,240,0.5),inset_0_0_10px_rgba(160,32,240,0.2)]">
                  New
                </span>
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/50 rounded-full shadow-[0_0_20px_rgba(255,107,53,0.5),inset_0_0_10px_rgba(255,107,53,0.2)]">
                  Hot
                </span>
              </div>
            </div>

            {/* Chrome Pill badges */}
            <div>
              <p className="font-mono text-xs text-[#00d4ff]/60 mb-4 tracking-widest uppercase flex items-center gap-2">
                <Star className="w-3 h-3" /> Chrome Pill
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff006e] to-[#ff6b35] text-white rounded-full shadow-[0_0_15px_rgba(255,0,110,0.4)]">
                  Retro
                </span>
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#a020f0] to-[#00d4ff] text-white rounded-full shadow-[0_0_15px_rgba(160,32,240,0.4)]">
                  Synth
                </span>
                <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00d4ff] to-[#ff006e] text-white rounded-full shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                  Wave
                </span>
                <ChromeText as="span" size="sm" className="px-5 py-2 bg-gradient-to-b from-[#404040] to-[#202020] rounded-full border border-white/20">
                  Chrome
                </ChromeText>
              </div>
            </div>

            {/* VHS Label badges */}
            <div>
              <p className="font-mono text-xs text-[#a020f0]/60 mb-4 tracking-widest uppercase flex items-center gap-2">
                <Disc className="w-3 h-3" /> VHS Label
              </p>
              <div className="flex flex-wrap gap-4">
                <VHSBadge variant="rec">REC</VHSBadge>
                <VHSBadge variant="play">PLAY</VHSBadge>
                <VHSBadge variant="pause">PAUSE</VHSBadge>
                <VHSBadge variant="ff">FF</VHSBadge>
                <VHSBadge variant="rew">REW</VHSBadge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. PROGRESS BARS - Sunset Meters */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Progress
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            SUNSET_METER_DISPLAY
          </p>
          <NeonGlowPanel color="magenta" className="p-10">
            <div className="space-y-8">
              <SunsetProgress value={92} label="TAPE_SIDE_A" />
              <SunsetProgress value={67} label="SIGNAL_STRENGTH" />
              <SunsetProgress value={45} label="FUEL_RESERVE" />
              <SunsetProgress value={78} label="BASS_LEVEL" />
              <SunsetProgress value={23} label="BATTERY_CHARGE" />
            </div>
          </NeonGlowPanel>
        </div>
      </section>

      <GridDivider variant="horizontal" color="mixed" />

      {/* ================================================================== */}
      {/* 11. ALERTS - System Notifications */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Alerts
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            SYSTEM_NOTIFICATION_PANEL
          </p>
          <div className="space-y-5">
            {/* Cyan Info */}
            <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-[#00d4ff]/50 bg-[#00d4ff]/10 shadow-[0_0_25px_rgba(0,212,255,0.2),inset_0_0_20px_rgba(0,212,255,0.05)]">
              <div className="w-10 h-10 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#00d4ff] mb-1 uppercase tracking-wider">SYSTEM INFO</p>
                <p className="text-sm text-[#00d4ff]/70 font-mono">
                  All frequencies tuned. Signal clarity at maximum. Connection stable.
                </p>
              </div>
            </div>

            {/* Sunset Warning */}
            <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-[#ff6b35]/50 bg-[#ff6b35]/10 shadow-[0_0_25px_rgba(255,107,53,0.2),inset_0_0_20px_rgba(255,107,53,0.05)]">
              <div className="w-10 h-10 bg-[#ff6b35]/20 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#ff6b35] mb-1 uppercase tracking-wider">WARNING</p>
                <p className="text-sm text-[#ff6b35]/70 font-mono">
                  Fuel reserves depleting. Nearest refuel station: 12 miles ahead.
                </p>
              </div>
            </div>

            {/* Hot Pink Error */}
            <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-[#ff006e]/50 bg-[#ff006e]/10 shadow-[0_0_25px_rgba(255,0,110,0.2),inset_0_0_20px_rgba(255,0,110,0.05)]">
              <div className="w-10 h-10 bg-[#ff006e]/20 rounded-lg flex items-center justify-center shrink-0">
                <X className="w-5 h-5 text-[#ff006e]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#ff006e] mb-1 uppercase tracking-wider">ERROR</p>
                <p className="text-sm text-[#ff006e]/70 font-mono">
                  Tape deck malfunction detected. Rewind and retry transmission.
                </p>
              </div>
            </div>

            {/* Chrome Success */}
            <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-green-400/50 bg-green-400/10 shadow-[0_0_25px_rgba(74,222,128,0.2),inset_0_0_20px_rgba(74,222,128,0.05)]">
              <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-green-400 mb-1 uppercase tracking-wider">SUCCESS</p>
                <p className="text-sm text-green-400/70 font-mono">
                  Connection established. Retrowave broadcast now active on all frequencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 12. TOGGLE CONTROLS - Neon Switches */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-lg mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Toggles
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            NEON_SWITCH_CONTROLS
          </p>
          <NeonGlowPanel color="magenta" className="p-8 space-y-6">
            <NeonToggle
              checked={toggleStates.neonLights}
              onChange={() => handleToggle("neonLights")}
              label="NEON_LIGHTS"
              color="magenta"
            />
            <NeonToggle
              checked={toggleStates.radioFM}
              onChange={() => handleToggle("radioFM")}
              label="RADIO_FM"
              color="cyan"
            />
            <NeonToggle
              checked={toggleStates.turboBoost}
              onChange={() => handleToggle("turboBoost")}
              label="TURBO_BOOST"
              color="purple"
            />
            <NeonToggle
              checked={toggleStates.nightMode}
              onChange={() => handleToggle("nightMode")}
              label="NIGHT_MODE"
              color="magenta"
            />
            <NeonToggle
              checked={toggleStates.retroScan}
              onChange={() => handleToggle("retroScan")}
              label="RETRO_SCANLINES"
              color="cyan"
            />

            {/* Radio buttons */}
            <div className="pt-6 border-t border-[#ff006e]/20">
              <p className="font-mono text-xs text-[#ff006e]/60 mb-4 uppercase tracking-widest">Radio Station</p>
              <div className="space-y-3">
                {[
                  { id: "synthwave", label: "SYNTHWAVE_FM" },
                  { id: "outrun", label: "OUTRUN_RADIO" },
                  { id: "retrowave", label: "RETROWAVE_MIX" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setSelectedRadio(option.id)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedRadio === option.id
                          ? "border-[#ff006e] bg-[#ff006e]/20 shadow-[0_0_15px_rgba(255,0,110,0.5)]"
                          : "border-[#ff006e]/40 group-hover:border-[#ff006e]/60"
                      }`}
                    >
                      {selectedRadio === option.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff006e] shadow-[0_0_10px_rgba(255,0,110,0.8)]" />
                      )}
                    </div>
                    <span className="font-mono text-sm text-[#00d4ff]/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </NeonGlowPanel>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 13. DROPDOWN - CRT Selector */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Dropdown
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            CRT_MONITOR_SELECTOR
          </p>
          <div className="relative">
            {/* CRT monitor frame */}
            <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl p-4 border-4 border-[#2a2a2a] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
              {/* Screen bezel */}
              <div className="bg-[#0a0a0a] rounded-lg p-1 border border-[#ff006e]/30 shadow-[inset_0_0_20px_rgba(255,0,110,0.1)]">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-[#050505] rounded-md text-[#ff006e] font-mono text-sm hover:shadow-[inset_0_0_30px_rgba(255,0,110,0.2)] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Radio className="w-4 h-4 animate-pulse" />
                    SELECT_STATION
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="mt-1 bg-[#050505] rounded-md overflow-hidden border-t border-[#ff006e]/20">
                    {[
                      { label: "SUNSET_FM 98.7", icon: <Sunset className="w-4 h-4" />, color: "text-[#ff6b35]" },
                      { label: "NEON_WAVE 101.3", icon: <Radio className="w-4 h-4" />, color: "text-[#ff006e]" },
                      { label: "CHROME_HITS 105.9", icon: <Music className="w-4 h-4" />, color: "text-[#00d4ff]" },
                      { label: "TURBO_BASS 88.1", icon: <Volume2 className="w-4 h-4" />, color: "text-[#a020f0]" },
                      { label: "MIDNIGHT_MIX 92.5", icon: <Moon className="w-4 h-4" />, color: "text-[#ff006e]" },
                    ].map((item, index) => (
                      <button
                        key={item.label}
                        className={`w-full px-5 py-3 text-left font-mono text-sm ${item.color} hover:bg-[#ff006e]/10 transition-all flex items-center gap-3 border-b border-[#ff006e]/10 last:border-b-0`}
                        onClick={() => setIsDropdownOpen(false)}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none rounded-xl" />
            </div>
            {/* Monitor base */}
            <div className="w-1/3 h-4 mx-auto bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg" />
            <div className="w-1/2 h-2 mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-xl" />
          </div>
        </div>
      </section>

      <GridDivider variant="perspective" color="cyan" />

      {/* ================================================================== */}
      {/* 14. TABLE - Arcade Leaderboard */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Leaderboard
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            ARCADE_HIGH_SCORE_TABLE
          </p>
          <NeonGlowPanel color="magenta" className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#ff006e]/30 via-[#a020f0]/20 to-[#00d4ff]/30 border-b-2 border-[#ff006e]/40">
                  <th className="px-6 py-4 text-left font-mono text-xs text-[#ff006e] tracking-widest uppercase">Rank</th>
                  <th className="px-6 py-4 text-left font-mono text-xs text-[#ff006e] tracking-widest uppercase">Player</th>
                  <th className="px-6 py-4 text-right font-mono text-xs text-[#ff006e] tracking-widest uppercase">Score</th>
                  <th className="px-6 py-4 text-right font-mono text-xs text-[#ff006e] tracking-widest uppercase">Level</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {[
                  { rank: "01", player: "NEON_RIDER", score: "9,999,800", level: "MAX", icon: <Crown className="w-4 h-4 text-[#ff6b35]" /> },
                  { rank: "02", player: "CHROME_ACE", score: "8,450,200", level: "98", icon: <Medal className="w-4 h-4 text-[#c0c0c0]" /> },
                  { rank: "03", player: "SUNSET_KID", score: "7,120,500", level: "87", icon: <Medal className="w-4 h-4 text-[#cd7f32]" /> },
                  { rank: "04", player: "TURBO_WOLF", score: "5,880,100", level: "72", icon: <Trophy className="w-4 h-4 text-[#a020f0]" /> },
                  { rank: "05", player: "SYNTH_MASTER", score: "4,250,000", level: "65", icon: <Trophy className="w-4 h-4 text-[#00d4ff]" /> },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#ff006e]/10 last:border-b-0 hover:bg-[#ff006e]/10 transition-colors ${
                      i === 0 ? "bg-gradient-to-r from-[#ff006e]/10 to-transparent" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-[#ff6b35] font-bold flex items-center gap-2">
                      {row.icon}
                      {row.rank}
                    </td>
                    <td className="px-6 py-4 text-[#00d4ff]">{row.player}</td>
                    <td className="px-6 py-4 text-right text-[#ff006e] font-bold">{row.score}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          row.level === "MAX"
                            ? "bg-gradient-to-r from-[#ff006e] to-[#ff6b35] text-white"
                            : "bg-[#a020f0]/20 text-[#a020f0]"
                        }`}
                      >
                        {row.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </NeonGlowPanel>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 15. BLOCKQUOTE - Synthwave Transmission */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Quote
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            SYNTHWAVE_TRANSMISSION
          </p>
          <NeonGlowPanel color="purple" className="p-10 relative overflow-hidden">
            {/* Palm tree accent */}
            <div className="absolute right-4 bottom-4 opacity-20">
              <svg viewBox="0 0 120 200" className="w-24 h-40 fill-[#ff006e]">
                <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
              </svg>
            </div>
            <blockquote className="relative z-10">
              <div className="flex gap-4 mb-6">
                <div className="w-1 bg-gradient-to-b from-[#ff006e] via-[#ff6b35] to-[#a020f0] rounded-full" />
                <div>
                  <p className="text-2xl md:text-3xl italic leading-relaxed text-[#00d4ff]/90 mb-6">
                    &ldquo;We drove through the neon rain, chasing a sunset that never ended. The radio played forever,
                    and the road stretched beyond the horizon of time itself.&rdquo;
                  </p>
                  <footer className="font-mono text-sm text-[#ff006e]/70 tracking-wider uppercase flex items-center gap-3">
                    <Disc className="w-4 h-4" />
                    Transmission from the Outrun, 1987
                  </footer>
                </div>
              </div>
            </blockquote>
          </NeonGlowPanel>
        </div>
      </section>

      <GridDivider variant="horizontal" color="magenta" />

      {/* ================================================================== */}
      {/* 16. RULES SUMMARY - Design Protocol */}
      {/* ================================================================== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3 text-center uppercase tracking-wider">
            Core Rules
          </h2>
          <p className="text-[#a020f0]/60 mb-12 text-center font-mono text-sm tracking-wider">
            DESIGN_PROTOCOL_MATRIX
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <NeonGlowPanel color="cyan" className="p-8">
              <h3 className="text-xl font-bold text-[#00d4ff] mb-6 uppercase flex items-center gap-3">
                <Check className="w-6 h-6" /> Required Elements
              </h3>
              <ul className="space-y-3 text-sm text-[#00d4ff]/80 font-mono">
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Neon glow effects on all interactive UI elements
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Sunset gradients (purple to pink to orange)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Perspective grid lines and horizon effects
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Dark void background (#0a0a0a base)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Bold, uppercase typography with wide tracking
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Chrome/metallic accent gradients
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00d4ff] font-bold">+</span>
                  Scanline overlays for CRT effect
                </li>
              </ul>
            </NeonGlowPanel>

            <NeonGlowPanel color="magenta" className="p-8">
              <h3 className="text-xl font-bold text-[#ff006e] mb-6 uppercase flex items-center gap-3">
                <X className="w-6 h-6" /> Forbidden Elements
              </h3>
              <ul className="space-y-3 text-sm text-[#ff006e]/80 font-mono">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Flat, matte surfaces without glow
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Earthy, pastel, or muted color tones
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Serif fonts in body text
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Light or white backgrounds
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Subtle, understated visual effects
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Natural or organic shapes
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff006e] font-bold">-</span>
                  Modern minimalist aesthetics
                </li>
              </ul>
            </NeonGlowPanel>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 17. FOOTER */}
      {/* ================================================================== */}
      <footer className="relative z-10 py-12 px-6 border-t border-[#ff006e]/30 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Disc className="w-5 h-5 text-[#ff006e] animate-spin" style={{ animationDuration: "3s" }} />
              <p className="font-mono text-xs text-[#ff006e]/50 tracking-widest uppercase">
                STYLEKIT // OUTRUN // v2.0 // 1985
              </p>
            </div>
            <div className="flex items-center gap-4">
              <VHSBadge variant="play">NOW PLAYING</VHSBadge>
              <Timer className="w-4 h-4 text-[#00d4ff]/50" />
              <span className="font-mono text-xs text-[#00d4ff]/50">00:42:17</span>
            </div>
            <Link
              href="/styles/outrun"
              className="font-mono text-xs text-[#ff006e] hover:text-[#ff006e]/80 transition-colors tracking-widest uppercase flex items-center gap-2 group"
            >
              VIEW FULL DOCUMENTATION
              <FastForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
