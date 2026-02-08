"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Crosshair,
  ChevronDown,
  Check,
  X,
  Info,
  ArrowLeft,
  Zap,
  Lock,
  Cpu,
  Radio,
  Radar,
  Target,
  Gauge,
  Wrench,
  Activity,
  Power,
} from "lucide-react";
import {
  ShowcaseHero,
  ColorPaletteGrid,
  DesignRulesGrid,
} from "@/components/showcase";

// ============================================
// INLINE COMPONENTS - Mecha Cockpit HUD Theme
// ============================================

// Hazard Stripe Decoration - Yellow/black warning stripes
function HazardStripe({
  position = "top",
  className = "",
}: {
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const isHorizontal = position === "top" || position === "bottom";
  const stripeStyle = isHorizontal
    ? "h-1.5 w-full bg-[repeating-linear-gradient(90deg,#fbbf24,#fbbf24_20px,#1a2744_20px,#1a2744_40px)]"
    : "w-1.5 h-full bg-[repeating-linear-gradient(0deg,#fbbf24,#fbbf24_20px,#1a2744_20px,#1a2744_40px)]";

  return <div className={`${stripeStyle} ${className}`} />;
}

// Military Panel - Angular corners with optional hazard accent
function MilitaryPanel({
  children,
  className = "",
  variant = "default",
  hazardTop = false,
  hazardBottom = false,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "warning" | "danger" | "info";
  hazardTop?: boolean;
  hazardBottom?: boolean;
  title?: string;
}) {
  const variants = {
    default: "border-[#4a5c3a] shadow-[4px_4px_0px_rgba(251,191,36,0.2)]",
    warning: "border-[#fbbf24] shadow-[4px_4px_0px_rgba(251,191,36,0.3)]",
    danger: "border-[#ef4444] shadow-[4px_4px_0px_rgba(239,68,68,0.3)]",
    info: "border-[#6b7d8e] shadow-[4px_4px_0px_rgba(107,125,142,0.3)]",
  };

  return (
    <div className={`relative ${className}`}>
      {hazardTop && <HazardStripe position="top" className="mb-0" />}
      <div
        className={`bg-[#1a2744] border-2 rounded-none p-6 ${variants[variant]}`}
      >
        {title && (
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[#4a5c3a]/50">
            <div className="w-2 h-2 bg-[#fbbf24]" />
            <span className="text-xs font-bold text-[#4a5c3a] uppercase tracking-widest">
              {title}
            </span>
          </div>
        )}
        {children}
      </div>
      {hazardBottom && <HazardStripe position="bottom" className="mt-0" />}
    </div>
  );
}

// Status Bar - HP/Shield/Energy bar with percentage display
function StatusBar({
  label,
  value,
  color = "green",
  showGlow = false,
}: {
  label: string;
  value: number;
  color?: "green" | "yellow" | "red" | "blue";
  showGlow?: boolean;
}) {
  const colors = {
    green: {
      bar: "bg-[#4a5c3a]",
      border: "border-[#4a5c3a]",
      text: "text-[#4a5c3a]",
      bg: "bg-[#4a5c3a]/10",
      glow: "shadow-[0_0_10px_rgba(74,92,58,0.5)]",
    },
    yellow: {
      bar: "bg-[#fbbf24]",
      border: "border-[#fbbf24]/50",
      text: "text-[#fbbf24]",
      bg: "bg-[#fbbf24]/10",
      glow: "shadow-[0_0_10px_rgba(251,191,36,0.5)]",
    },
    red: {
      bar: "bg-[#ef4444]",
      border: "border-[#ef4444]/50",
      text: "text-[#ef4444]",
      bg: "bg-[#ef4444]/10",
      glow: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    },
    blue: {
      bar: "bg-[#3b82f6]",
      border: "border-[#3b82f6]/50",
      text: "text-[#3b82f6]",
      bg: "bg-[#3b82f6]/10",
      glow: "shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    },
  };
  const c = colors[color];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-xs uppercase tracking-widest font-bold ${c.text}`}>
          {label}
        </span>
        <span className={`text-xs font-bold font-mono ${c.text}`}>{value}%</span>
      </div>
      <div
        className={`h-5 ${c.bg} border-2 ${c.border} rounded-none relative overflow-hidden ${showGlow ? c.glow : ""}`}
      >
        <div
          className={`h-full ${c.bar} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
        {/* Segment lines */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-[#1a2744]/30 last:border-r-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Toggle Switch - Chunky military-style toggle
function ToggleSwitch({
  label,
  checked,
  onChange,
  statusText,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  statusText?: { on: string; off: string };
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 ${checked ? "bg-[#fbbf24]" : "bg-[#ef4444]"}`} />
        <span className="text-sm font-bold text-[#fbbf24] uppercase tracking-widest">
          {label}
        </span>
        {statusText && (
          <span className="text-xs text-[#4a5c3a] uppercase">
            {checked ? statusText.on : statusText.off}
          </span>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`w-20 h-10 border-2 rounded-none transition-all relative ${
          checked
            ? "bg-[#fbbf24] border-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.5)]"
            : "bg-[#1a2744] border-[#4a5c3a]"
        }`}
      >
        {/* Track markings */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#1a2744]/30" />
        {/* Toggle knob */}
        <div
          className={`absolute top-1 w-7 h-7 transition-all flex items-center justify-center ${
            checked
              ? "bg-[#1a2744] left-[calc(100%-32px)]"
              : "bg-[#4a5c3a] left-1"
          }`}
        >
          {checked ? (
            <Power className="w-4 h-4 text-[#fbbf24]" />
          ) : (
            <X className="w-4 h-4 text-[#ef4444]" />
          )}
        </div>
      </button>
    </div>
  );
}

// Rank Badge - Military rank insignia
function RankBadge({
  rank,
  variant = "solid",
}: {
  rank: string;
  variant?: "solid" | "outline" | "glow";
}) {
  const variants = {
    solid: "bg-[#fbbf24] text-[#1a2744] border-transparent",
    outline: "bg-transparent text-[#fbbf24] border-[#fbbf24]",
    glow: "bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/50 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-none border-2 ${variants[variant]}`}
    >
      <Shield className="w-3 h-3" />
      {rank}
    </span>
  );
}

// Diagnostics Row - Table row with status indicator
function DiagnosticsRow({
  unit,
  status,
  statusType,
  power,
  uptime,
}: {
  unit: string;
  status: string;
  statusType: "online" | "standby" | "offline" | "warning";
  power: string;
  uptime: string;
}) {
  const statusColors = {
    online: { dot: "bg-[#4a5c3a]", text: "text-[#4a5c3a]" },
    standby: { dot: "bg-[#fbbf24]", text: "text-[#fbbf24]" },
    offline: { dot: "bg-[#ef4444]", text: "text-[#ef4444]" },
    warning: { dot: "bg-[#f97316]", text: "text-[#f97316]" },
  };
  const c = statusColors[statusType];

  return (
    <tr className="border-b border-[#4a5c3a]/30 last:border-b-0 hover:bg-[#4a5c3a]/10 transition-colors">
      <td className="px-4 py-3 text-[#fbbf24] font-bold font-mono">{unit}</td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 ${c.dot} animate-pulse`} />
          <span className={`${c.text} font-bold uppercase text-sm`}>{status}</span>
        </span>
      </td>
      <td className="px-4 py-3 text-[#4a5c3a] font-mono">{power}</td>
      <td className="px-4 py-3 text-[#4a5c3a] font-mono">{uptime}</td>
    </tr>
  );
}

// Checkbox Array - Military style checkbox group
function CheckboxArray({
  items,
  checkedItems,
  onChange,
}: {
  items: string[];
  checkedItems: boolean[];
  onChange: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <button
          key={item}
          onClick={() => onChange(i)}
          className={`flex items-center gap-2 px-4 py-3 border-2 rounded-none transition-all ${
            checkedItems[i]
              ? "bg-[#fbbf24]/10 border-[#fbbf24] text-[#fbbf24]"
              : "bg-[#1a2744] border-[#4a5c3a] text-[#4a5c3a] hover:border-[#fbbf24]/50"
          }`}
        >
          <div
            className={`w-5 h-5 border-2 flex items-center justify-center ${
              checkedItems[i] ? "bg-[#fbbf24] border-[#fbbf24]" : "border-[#4a5c3a]"
            }`}
          >
            {checkedItems[i] && <Check className="w-3 h-3 text-[#1a2744]" />}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
        </button>
      ))}
    </div>
  );
}

// ============================================
// MAIN SHOWCASE COMPONENT
// ============================================

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState("SELECT MISSION");
  const [toggleStates, setToggleStates] = useState([true, false, true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, true, false, false, true, false, false, true]);

  const handleToggle = (index: number) => {
    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  const handleCheckbox = (index: number) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  const tabs = ["SYSTEMS", "WEAPONS", "COMMS"];
  const missions = [
    "OPERATION IRONCLAD",
    "OPERATION FIRESTORM",
    "OPERATION NIGHTFALL",
    "OPERATION SENTINEL",
  ];

  return (
    <div className="min-h-screen bg-[#1a2744] text-[#c8d6c3] relative overflow-hidden font-mono">
      {/* Tech grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(74,92,58,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(74,92,58,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Corner brackets decoration */}
      <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#4a5c3a] pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#4a5c3a] pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#4a5c3a] pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#4a5c3a] pointer-events-none z-20" />

      {/* Warning stripe top */}
      <HazardStripe position="top" className="fixed top-0 left-0 right-0 z-30" />

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#4a5c3a] bg-[#1a2744]/95 mt-1.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/mecha"
            className="flex items-center gap-2 text-[#4a5c3a] hover:text-[#fbbf24] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">BACK</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#fbbf24] animate-pulse" />
            <span className="font-bold text-xl text-[#fbbf24] uppercase tracking-[0.3em]">
              MECHA
            </span>
            <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">
              UNIT-01
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#4a5c3a] text-[#fbbf24] font-bold uppercase tracking-widest text-sm rounded-none shadow-[2px_2px_0px_rgba(251,191,36,0.3)] hover:border-[#fbbf24] hover:shadow-[4px_4px_0px_rgba(251,191,36,0.4)] transition-all"
          >
            ALL STYLES
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section with ShowcaseHero */}
      <ShowcaseHero
        badge="// SYSTEM INITIALIZED -- ALL UNITS STANDBY"
        title="MECHA"
        description="ARMOR CLASS // OPERATIONAL STATUS: ACTIVE"
        className="relative z-10 pt-16 pb-12"
        badgeClassName="bg-transparent text-[#4a5c3a] text-xs uppercase tracking-[0.3em] rounded-none border-0"
        titleClassName="text-6xl md:text-8xl font-bold text-[#fbbf24] uppercase tracking-widest font-mono"
        descriptionClassName="text-lg text-[#4a5c3a] uppercase tracking-wider font-mono"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#fbbf24] text-[#1a2744] font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all duration-200 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            DEPLOY
          </button>
          <button className="px-10 py-4 bg-[#ef4444] text-white font-bold uppercase tracking-widest rounded-none border-2 border-[#ef4444] shadow-[4px_4px_0px_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#fbbf24] transition-all duration-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            ALERT
          </button>
        </div>
      </ShowcaseHero>

      {/* 3. Color Palette with ColorPaletteGrid */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            DESIGNATION CODES
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            COLOR SYSTEM
          </h2>
          <ColorPaletteGrid
            colors={[
              { name: "Navy", hex: "#1a2744", bg: "bg-[#1a2744]", border: true },
              { name: "Mil. Green", hex: "#4a5c3a", bg: "bg-[#4a5c3a]" },
              { name: "Warning Yellow", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
              { name: "Danger Red", hex: "#ef4444", bg: "bg-[#ef4444]" },
              { name: "Steel Gray", hex: "#6b7d8e", bg: "bg-[#6b7d8e]" },
            ]}
            cardClassName="border-2 border-[#4a5c3a] bg-[#1a2744] rounded-none shadow-[3px_3px_0px_rgba(251,191,36,0.2)]"
            colorBlockClassName="h-20 md:h-28"
            labelClassName="text-xs md:text-sm text-[#fbbf24] font-bold uppercase"
            hexClassName="text-xs text-[#4a5c3a] font-mono"
          />
        </div>
      </section>

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            FONT MATRIX
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            TYPOGRAPHY
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <MilitaryPanel title="HEADING HIERARCHY">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold text-[#fbbf24] uppercase tracking-wider">
                  H1 COMMAND
                </h3>
                <h4 className="text-2xl md:text-3xl font-bold text-[#fbbf24] uppercase tracking-wider">
                  H2 SUBSYSTEM
                </h4>
                <h5 className="text-xl md:text-2xl font-bold text-[#fbbf24]/80 uppercase tracking-wider">
                  H3 MODULE
                </h5>
                <h6 className="text-lg font-bold text-[#4a5c3a] uppercase tracking-wider">
                  H4 PARAMETER
                </h6>
              </div>
            </MilitaryPanel>
            <MilitaryPanel title="STENCIL WEIGHT">
              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-[#fbbf24] uppercase tracking-[0.2em]">
                    UPPERCASE BOLD
                  </p>
                  <p className="text-xs text-[#4a5c3a] mt-1">
                    font-mono / bold / uppercase / tracking-wide
                  </p>
                </div>
                <div>
                  <p className="text-lg text-[#c8d6c3]">Mixed Case Regular</p>
                  <p className="text-xs text-[#4a5c3a] mt-1">
                    font-mono / normal / mixed-case / body text
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#4a5c3a] uppercase tracking-widest">
                    LABEL SMALL CAPS
                  </p>
                  <p className="text-xs text-[#4a5c3a]/60 mt-1">
                    font-mono / tracking-widest / labels
                  </p>
                </div>
              </div>
            </MilitaryPanel>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            INTERFACE ELEMENTS
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            CONTROLS
          </h2>
          <MilitaryPanel title="BUTTON MATRIX" hazardTop>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#fbbf24] text-[#1a2744] font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" />
                PRIMARY
              </button>
              <button className="px-6 py-3 bg-[#4a5c3a] text-[#fbbf24] font-bold uppercase tracking-widest rounded-none border-2 border-[#fbbf24]/50 shadow-[4px_4px_0px_rgba(74,92,58,0.5)] hover:border-[#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(74,92,58,0.5)] transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" />
                SECONDARY
              </button>
              <button className="px-6 py-3 bg-[#ef4444] text-white font-bold uppercase tracking-widest rounded-none border-2 border-[#ef4444] shadow-[4px_4px_0px_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#fbbf24] transition-all flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                DANGER
              </button>
              <button className="px-6 py-3 bg-transparent text-[#4a5c3a] font-bold uppercase tracking-widest rounded-none border-2 border-[#4a5c3a] hover:text-[#fbbf24] hover:border-[#fbbf24] hover:shadow-[4px_4px_0px_rgba(251,191,36,0.3)] transition-all flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                GHOST
              </button>
            </div>
          </MilitaryPanel>
        </div>
      </section>

      {/* 6. Cards - HUD Panels */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            ARMOR MODULES
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            HUD PANELS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.3)] hover:shadow-[6px_6px_0px_rgba(251,191,36,0.4)] hover:border-[#fbbf24] hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-[#fbbf24]" />
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">
                  UNIT-01
                </span>
              </div>
              <div className="w-14 h-14 bg-[#4a5c3a]/30 border-2 border-[#4a5c3a] flex items-center justify-center mb-4 rounded-none">
                <Shield className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-bold text-[#fbbf24] uppercase mb-2">
                ARMOR
              </h3>
              <p className="text-[#4a5c3a] text-sm">
                Composite plating integrity at nominal levels. No breaches detected.
              </p>
              <div className="mt-4 pt-3 border-t-2 border-[#4a5c3a]/50">
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">
                  INTEGRITY: 98.7%
                </span>
              </div>
            </div>

            <div className="p-6 bg-[#1a2744] border-2 border-[#fbbf24]/50 rounded-none shadow-[4px_4px_0px_rgba(239,68,68,0.3)] hover:shadow-[6px_6px_0px_rgba(239,68,68,0.4)] hover:border-[#ef4444] hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-[#ef4444] animate-pulse" />
                <span className="text-xs text-[#ef4444] uppercase tracking-widest">
                  WARNING
                </span>
              </div>
              <div className="w-14 h-14 bg-[#ef4444]/10 border-2 border-[#ef4444]/50 flex items-center justify-center mb-4 rounded-none">
                <AlertTriangle className="w-7 h-7 text-[#ef4444]" />
              </div>
              <h3 className="text-xl font-bold text-[#ef4444] uppercase mb-2">
                ALERT
              </h3>
              <p className="text-[#4a5c3a] text-sm">
                Perimeter sensors triggered. Unknown contact approaching sector 7.
              </p>
              <div className="mt-4 pt-3 border-t-2 border-[#ef4444]/30">
                <span className="text-xs text-[#ef4444] uppercase tracking-widest">
                  THREAT: ELEVATED
                </span>
              </div>
            </div>

            <div className="p-6 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(74,92,58,0.4)] hover:shadow-[6px_6px_0px_rgba(251,191,36,0.4)] hover:border-[#fbbf24] hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-[#4a5c3a]" />
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">
                  UNIT-03
                </span>
              </div>
              <div className="w-14 h-14 bg-[#4a5c3a]/30 border-2 border-[#4a5c3a] flex items-center justify-center mb-4 rounded-none">
                <Target className="w-7 h-7 text-[#4a5c3a]" />
              </div>
              <h3 className="text-xl font-bold text-[#fbbf24] uppercase mb-2">
                TARGETING
              </h3>
              <p className="text-[#4a5c3a] text-sm">
                Fire control system locked. Tracking three hostile contacts on radar.
              </p>
              <div className="mt-4 pt-3 border-t-2 border-[#4a5c3a]/50">
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">
                  LOCK: ENGAGED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Form - Terminal Input */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-md mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4 text-center">
            COMMAND INPUT
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12 text-center">
            TERMINAL
          </h2>
          <MilitaryPanel hazardTop hazardBottom>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#4a5c3a]/20 border-2 border-[#4a5c3a] flex items-center justify-center mb-4 rounded-none">
                <Lock className="w-8 h-8 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-bold text-[#fbbf24] uppercase tracking-widest">
                ACCESS
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4a5c3a] uppercase tracking-widest mb-2">
                  OPERATOR ID
                </label>
                <input
                  type="text"
                  placeholder="ENTER ID..."
                  className="w-full px-4 py-3 bg-[#1a2744]/80 border-2 border-[#4a5c3a] rounded-none text-[#fbbf24] placeholder-[#4a5c3a]/60 focus:border-[#fbbf24] focus:shadow-[0_0_8px_rgba(251,191,36,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ef4444] uppercase tracking-widest mb-2">
                  AUTH CODE
                </label>
                <input
                  type="password"
                  placeholder="ENTER CODE..."
                  className="w-full px-4 py-3 bg-[#1a2744]/80 border-2 border-[#ef4444]/50 rounded-none text-[#ef4444] placeholder-[#ef4444]/40 focus:border-[#ef4444] focus:shadow-[0_0_8px_rgba(239,68,68,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#fbbf24] text-[#1a2744] font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all">
                AUTHENTICATE
              </button>
            </div>
          </MilitaryPanel>
        </div>
      </section>

      {/* 8. Tabs - Systems / Weapons / Comms */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            SUBSYSTEM PANELS
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            TAB SYSTEM
          </h2>
          <div className="border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <div className="flex border-b-2 border-[#4a5c3a]">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex-1 text-xs md:text-sm tracking-widest py-4 font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === i
                      ? "bg-[#fbbf24] text-[#1a2744]"
                      : "text-[#4a5c3a] hover:text-[#fbbf24] hover:bg-[#4a5c3a]/20"
                  }`}
                >
                  {i === 0 && <Cpu className="w-4 h-4" />}
                  {i === 1 && <Crosshair className="w-4 h-4" />}
                  {i === 2 && <Radio className="w-4 h-4" />}
                  {tab}
                  {activeTab === i && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a2744]" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 text-sm min-h-[150px]">
              {activeTab === 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-[#fbbf24]" />
                    <p className="text-[#fbbf24] font-bold">&gt; CORE SYSTEMS DIAGNOSTIC</p>
                  </div>
                  <div className="space-y-2 text-[#4a5c3a] font-mono">
                    <p>Reactor Output .......... <span className="text-[#fbbf24]">94.2%</span> nominal</p>
                    <p>Hydraulic Pressure ...... <span className="text-[#fbbf24]">3200</span> PSI</p>
                    <p>Neural Link ............. <span className="text-[#4a5c3a]">SYNCHRONIZED</span></p>
                    <p>Life Support ............ <span className="text-[#4a5c3a]">ACTIVE</span></p>
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-[#ef4444]" />
                    <p className="text-[#ef4444] font-bold">&gt; WEAPONS LOADOUT</p>
                  </div>
                  <div className="space-y-2 text-[#4a5c3a] font-mono">
                    <p>Beam Rifle .............. <span className="text-[#fbbf24]">78</span> ROUNDS</p>
                    <p>Missile Pods ............ <span className="text-[#fbbf24]">12/12</span> LOADED</p>
                    <p>Heat Saber .............. <span className="text-[#ef4444]">CHARGED</span></p>
                    <p>Shield Generator ........ <span className="text-[#4a5c3a]">STANDBY</span></p>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Radio className="w-5 h-5 text-[#6b7d8e]" />
                    <p className="text-[#6b7d8e] font-bold">&gt; COMMUNICATIONS ARRAY</p>
                  </div>
                  <div className="space-y-2 text-[#4a5c3a] font-mono">
                    <p>Encrypted Channel ....... FREQ <span className="text-[#fbbf24]">441.7</span> MHz</p>
                    <p>Squad Link .............. <span className="text-[#fbbf24]">4</span> UNITS ONLINE</p>
                    <p>HQ Uplink ............... LATENCY <span className="text-[#4a5c3a]">12ms</span></p>
                    <p>EW Countermeasures ...... <span className="text-[#4a5c3a]">ACTIVE</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Deployment Badges */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            INSIGNIA TYPES
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            DEPLOYMENT BADGES
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
                RANK BADGES
              </p>
              <div className="flex flex-wrap gap-3">
                <RankBadge rank="COMMANDER" variant="solid" />
                <RankBadge rank="LIEUTENANT" variant="outline" />
                <RankBadge rank="SPECIALIST" variant="glow" />
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
                STATUS PATCHES
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 border-2 border-[#fbbf24] text-[#fbbf24] text-xs font-bold uppercase tracking-widest rounded-none">
                  ACTIVE DUTY
                </span>
                <span className="px-4 py-1.5 border-2 border-[#4a5c3a] text-[#4a5c3a] text-xs font-bold uppercase tracking-widest rounded-none">
                  RESERVE
                </span>
                <span className="px-4 py-1.5 border-2 border-[#ef4444] text-[#ef4444] text-xs font-bold uppercase tracking-widest rounded-none flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#ef4444] animate-pulse" />
                  SORTIE
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
                CLASSIFICATION TAGS
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-[#fbbf24]/10 text-[#fbbf24] border-2 border-[#fbbf24]/50 text-xs font-bold uppercase tracking-widest rounded-none shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                  TOP SECRET
                </span>
                <span className="px-4 py-1.5 bg-[#ef4444]/10 text-[#ef4444] border-2 border-[#ef4444]/50 text-xs font-bold uppercase tracking-widest rounded-none shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                  CLASSIFIED
                </span>
                <span className="px-4 py-1.5 bg-[#6b7d8e]/10 text-[#6b7d8e] border-2 border-[#6b7d8e]/50 text-xs font-bold uppercase tracking-widest rounded-none">
                  CONFIDENTIAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars - System Status */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            UNIT READOUTS
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            SYSTEM STATUS
          </h2>
          <MilitaryPanel title="VITAL STATISTICS">
            <div className="space-y-6">
              <StatusBar label="HP" value={87} color="green" />
              <StatusBar label="SHIELD" value={62} color="yellow" showGlow />
              <StatusBar label="ENERGY" value={34} color="red" />
              <StatusBar label="SYNC RATE" value={98} color="blue" showGlow />
            </div>
          </MilitaryPanel>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            SYSTEM NOTIFICATIONS
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            ALERTS
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border-2 border-[#4a5c3a] bg-[#4a5c3a]/10 rounded-none">
              <Check className="w-5 h-5 text-[#4a5c3a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#4a5c3a] font-bold uppercase">
                  SYSTEM OK
                </p>
                <p className="text-xs text-[#4a5c3a]/80 mt-1">
                  All systems nominal. No maintenance required.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <HazardStripe position="left" className="absolute left-0 top-0 bottom-0" />
              <div className="flex items-start gap-4 p-4 pl-6 border-2 border-[#fbbf24] bg-[#fbbf24]/10 rounded-none">
                <AlertTriangle className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#fbbf24] font-bold uppercase">
                    CAUTION
                  </p>
                  <p className="text-xs text-[#fbbf24]/80 mt-1">
                    Reactor temperature approaching upper threshold. Monitor closely.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#ef4444] bg-[#ef4444]/10 rounded-none animate-pulse">
              <X className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#ef4444] font-bold uppercase">
                  CRITICAL
                </p>
                <p className="text-xs text-[#ef4444]/80 mt-1">
                  Hull breach in sector 4. Immediate repair required.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#3b82f6] bg-[#3b82f6]/10 rounded-none">
              <Info className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#3b82f6] font-bold uppercase">
                  INFORMATION
                </p>
                <p className="text-xs text-[#3b82f6]/80 mt-1">
                  Firmware update v3.7.2 available. Schedule maintenance window.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Toggle Controls */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            COCKPIT SWITCHES
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            TOGGLE CONTROLS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <MilitaryPanel title="POWER SWITCHES">
              <div className="space-y-6">
                <ToggleSwitch
                  label="REACTOR"
                  checked={toggleStates[0]}
                  onChange={() => handleToggle(0)}
                  statusText={{ on: "ONLINE", off: "OFFLINE" }}
                />
                <ToggleSwitch
                  label="COMMS"
                  checked={toggleStates[1]}
                  onChange={() => handleToggle(1)}
                  statusText={{ on: "ACTIVE", off: "SILENT" }}
                />
                <ToggleSwitch
                  label="RADAR"
                  checked={toggleStates[2]}
                  onChange={() => handleToggle(2)}
                  statusText={{ on: "SCANNING", off: "STANDBY" }}
                />
                <ToggleSwitch
                  label="WEAPONS"
                  checked={toggleStates[3]}
                  onChange={() => handleToggle(3)}
                  statusText={{ on: "ARMED", off: "SAFE" }}
                />
              </div>
            </MilitaryPanel>
            <MilitaryPanel title="SUBSYSTEM ARRAY">
              <CheckboxArray
                items={["AUX", "GYRO", "OPTICS", "THRUSTERS", "COOLANT", "BACKUP", "STEALTH", "BOOST"]}
                checkedItems={checkboxStates}
                onChange={handleCheckbox}
              />
            </MilitaryPanel>
          </div>
        </div>
      </section>

      {/* 13. Dropdown - Mission Selector */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-md mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4 text-center">
            MISSION SELECT
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12 text-center">
            DROPDOWN
          </h2>
          <MilitaryPanel>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-4 border-2 border-[#4a5c3a] bg-[#1a2744] text-sm text-[#fbbf24] font-bold uppercase tracking-widest hover:border-[#fbbf24] transition-all rounded-none"
              >
                <div className="flex items-center gap-3">
                  <Radar className="w-5 h-5" />
                  <span>{selectedMission}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 border-2 border-[#4a5c3a] bg-[#1a2744] z-10 shadow-[4px_4px_0px_rgba(251,191,36,0.3)]">
                  {missions.map((mission) => (
                    <button
                      key={mission}
                      className="w-full px-4 py-3 text-left text-sm text-[#4a5c3a] font-bold uppercase tracking-wider hover:text-[#fbbf24] hover:bg-[#4a5c3a]/20 transition-all border-b border-[#4a5c3a]/30 last:border-b-0 flex items-center gap-3"
                      onClick={() => {
                        setSelectedMission(mission);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Target className="w-4 h-4" />
                      {mission}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </MilitaryPanel>
        </div>
      </section>

      {/* 14. Diagnostics Table */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            MAINTENANCE LOG
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            DIAGNOSTICS TABLE
          </h2>
          <div className="border-2 border-[#4a5c3a] overflow-hidden rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#4a5c3a]/20 border-b-2 border-[#4a5c3a]">
                    <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">
                      UNIT
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">
                      POWER
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">
                      UPTIME
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <DiagnosticsRow
                    unit="ALPHA-01"
                    status="ONLINE"
                    statusType="online"
                    power="94.2%"
                    uptime="847h"
                  />
                  <DiagnosticsRow
                    unit="BRAVO-02"
                    status="STANDBY"
                    statusType="standby"
                    power="78.1%"
                    uptime="623h"
                  />
                  <DiagnosticsRow
                    unit="CHARLIE-03"
                    status="OFFLINE"
                    statusType="offline"
                    power="--"
                    uptime="0h"
                  />
                  <DiagnosticsRow
                    unit="DELTA-04"
                    status="WARNING"
                    statusType="warning"
                    power="45.3%"
                    uptime="102h"
                  />
                  <DiagnosticsRow
                    unit="ECHO-05"
                    status="ONLINE"
                    statusType="online"
                    power="99.8%"
                    uptime="1204h"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Blockquote - Mission Briefing */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            MISSION BRIEFING
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            BRIEFING QUOTE
          </h2>
          <MilitaryPanel variant="warning" hazardTop>
            <div className="mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#ef4444]" />
              <p className="text-xs text-[#ef4444] font-bold uppercase tracking-widest">
                CLASSIFIED - LEVEL 3
              </p>
            </div>
            <blockquote className="border-l-4 border-[#fbbf24] pl-6">
              <p className="text-base md:text-lg text-[#c8d6c3] leading-relaxed mb-4 font-mono">
                &ldquo;All units proceed to grid reference TANGO-447. Expect heavy resistance.
                Maintain radio silence until phase-line BRAVO. The mission is the machine.
                The machine is the mission.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#4a5c3a]/30 border-2 border-[#4a5c3a] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="text-sm text-[#fbbf24] font-bold uppercase tracking-widest">
                    CDR. TANAKA
                  </p>
                  <p className="text-xs text-[#4a5c3a] uppercase tracking-widest">
                    3RD MECHA DIVISION
                  </p>
                </div>
              </footer>
            </blockquote>
          </MilitaryPanel>
        </div>
      </section>

      {/* 16. Rules Summary with DesignRulesGrid */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">
            DESIGN PROTOCOL
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            CORE RULES
          </h2>
          <DesignRulesGrid
            doList={[
              "Monospace typography throughout",
              "Uppercase labels with tracking-widest",
              "Warning stripes and hazard patterns",
              "Hard shadows (shadow-[4px_4px_0px])",
              "Angular forms with rounded-none",
              "Thick borders (border-2)",
              "Military color palette (navy, olive, yellow)",
            ]}
            dontList={[
              "Rounded corners (border-radius)",
              "Pastel or light color palettes",
              "Cursive or decorative fonts",
              "Soft drop shadows",
              "Gradients or glass effects",
              "Organic or flowing shapes",
              "Serif body text",
            ]}
            containerClassName="grid md:grid-cols-2 gap-8"
            doTitleClassName="text-lg font-bold mb-4 text-[#fbbf24] uppercase tracking-widest flex items-center gap-2"
            dontTitleClassName="text-lg font-bold mb-4 text-[#ef4444] uppercase tracking-widest flex items-center gap-2"
            itemClassName="text-sm text-[#4a5c3a] font-mono"
            doTitle="REQUIRED"
            dontTitle="FORBIDDEN"
          />
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#4a5c3a]">
        <HazardStripe position="top" className="absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <div className="flex items-center gap-4">
            <Wrench className="w-4 h-4 text-[#4a5c3a]" />
            <p className="text-xs text-[#4a5c3a]/60 uppercase tracking-widest">
              STYLEKIT // MECHA // v2.0.0
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/styles/mecha"
              className="text-xs text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              <Gauge className="w-4 h-4" />
              VIEW FULL DOCUMENTATION
            </Link>
          </div>
        </div>
      </footer>

      {/* Warning stripe bottom */}
      <HazardStripe position="bottom" className="relative z-10" />
    </div>
  );
}
