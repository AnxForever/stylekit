"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cross,
  Flower2,
  Crown,
  Heart,
  ChevronDown,
  Check,
  X,
  ArrowLeft,
  Star,
  Info,
  AlertTriangle,
  Ban,
  Sparkles,
  Monitor,
} from "lucide-react";
import {
  ShowcaseHero,
  ColorPaletteGrid,
  DesignRulesGrid,
} from "@/components/showcase/shared";

// ============================================
// INLINE COMPONENTS - Victorian Dark Elegance
// ============================================

// Lace Panel - Decorative panel with scalloped lace border
function LacePanel({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "rose" | "velvet";
}) {
  const variants = {
    default: {
      border: "border-[#4a1a4a]/50",
      bg: "bg-[#0a0a0a]/90",
      accent: "#4a1a4a",
    },
    rose: {
      border: "border-[#8b1a2a]/50",
      bg: "bg-[#8b1a2a]/5",
      accent: "#8b1a2a",
    },
    velvet: {
      border: "border-[#6b2d5b]/50",
      bg: "bg-[#6b2d5b]/10",
      accent: "#6b2d5b",
    },
  };
  const v = variants[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Scalloped top edge - SVG lace pattern */}
      <div className="absolute -top-2 left-4 right-4 h-4 overflow-hidden">
        <svg
          viewBox="0 0 200 16"
          className="w-full h-4"
          preserveAspectRatio="none"
          fill="none"
          stroke={v.accent}
          strokeWidth="1"
          opacity="0.5"
        >
          {[...Array(20)].map((_, i) => (
            <path key={i} d={`M${i * 10} 14 Q${i * 10 + 5} 2 ${(i + 1) * 10} 14`} />
          ))}
        </svg>
      </div>
      {/* Corner ornaments */}
      <div
        className="absolute top-0 left-0 w-6 h-6 border-t border-l"
        style={{ borderColor: v.accent }}
      />
      <div
        className="absolute top-0 right-0 w-6 h-6 border-t border-r"
        style={{ borderColor: v.accent }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6 border-b border-l"
        style={{ borderColor: v.accent }}
      />
      <div
        className="absolute bottom-0 right-0 w-6 h-6 border-b border-r"
        style={{ borderColor: v.accent }}
      />
      {/* Main content */}
      <div className={`border ${v.border} ${v.bg} p-6`}>{children}</div>
    </div>
  );
}

// Ribbon Badge - Satin ribbon-shaped badge with folded ends
function RibbonBadge({
  children,
  color = "purple",
}: {
  children: React.ReactNode;
  color?: "purple" | "red" | "plum" | "silver";
}) {
  const colors = {
    purple: "bg-[#4a1a4a] text-[#e5e5e5] shadow-[0_2px_8px_rgba(74,26,74,0.6)]",
    red: "bg-[#8b1a2a] text-[#e5e5e5] shadow-[0_2px_8px_rgba(139,26,42,0.6)]",
    plum: "bg-[#6b2d5b] text-[#e5e5e5] shadow-[0_2px_8px_rgba(107,45,91,0.6)]",
    silver: "bg-[#e5e5e5]/20 text-[#e5e5e5] border border-[#e5e5e5]/30",
  };

  return (
    <span className="relative inline-flex items-center">
      {/* Left ribbon tail */}
      <span
        className={`absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0
        border-t-[10px] border-t-transparent
        border-r-[8px] ${color === "purple" ? "border-r-[#4a1a4a]" : color === "red" ? "border-r-[#8b1a2a]" : color === "plum" ? "border-r-[#6b2d5b]" : "border-r-[#e5e5e5]/20"}
        border-b-[10px] border-b-transparent`}
      />
      <span
        className={`px-4 py-1.5 text-xs font-serif tracking-wider ${colors[color]}`}
      >
        {children}
      </span>
      {/* Right ribbon tail */}
      <span
        className={`absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0
        border-t-[10px] border-t-transparent
        border-l-[8px] ${color === "purple" ? "border-l-[#4a1a4a]" : color === "red" ? "border-l-[#8b1a2a]" : color === "plum" ? "border-l-[#6b2d5b]" : "border-l-[#e5e5e5]/20"}
        border-b-[10px] border-b-transparent`}
      />
    </span>
  );
}

// Rosette Badge - Circular rosette with decorative border
function RosetteBadge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b1a2a]/15 border border-[#8b1a2a]/40 text-[#8b1a2a] text-xs font-serif tracking-wider relative shadow-[0_0_12px_rgba(139,26,42,0.2)]">
      {/* Decorative dots around */}
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
      <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
      <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

// Rosary Progress - Bead-chain style progress with cross markers
function RosaryProgress({
  value,
  label,
  color = "purple",
}: {
  value: number;
  label: string;
  color?: "purple" | "red" | "plum";
}) {
  const beadCount = 10;
  const filledBeads = Math.round((value / 100) * beadCount);
  const colors = {
    purple: { filled: "bg-[#4a1a4a]", empty: "bg-[#4a1a4a]/20", cross: "text-[#4a1a4a]" },
    red: { filled: "bg-[#8b1a2a]", empty: "bg-[#8b1a2a]/20", cross: "text-[#8b1a2a]" },
    plum: { filled: "bg-[#6b2d5b]", empty: "bg-[#6b2d5b]/20", cross: "text-[#6b2d5b]" },
  };
  const c = colors[color];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-serif">
        <span className="text-[#e5e5e5]/60 tracking-wider">{label}</span>
        <span className="text-[#8b1a2a]">{value}%</span>
      </div>
      <div className="flex items-center gap-1">
        {/* Cross at start */}
        <Cross className={`w-3 h-3 ${c.cross} shrink-0`} />
        {/* Beads */}
        <div className="flex-1 flex items-center justify-between px-1">
          {[...Array(beadCount)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < filledBeads ? c.filled : c.empty
              } ${i === Math.floor(beadCount / 2) - 1 ? "w-4 h-4" : ""}`}
            />
          ))}
        </div>
        {/* Cross at end */}
        <Cross className={`w-3 h-3 ${c.cross} shrink-0`} />
      </div>
    </div>
  );
}

// Lace Divider - Scalloped arc pattern section separator
function LaceDivider({ variant = "scallop" }: { variant?: "scallop" | "rose" | "cross" | "chain" }) {
  if (variant === "scallop") {
    return (
      <div className="flex justify-center py-6">
        <svg
          viewBox="0 0 400 20"
          className="w-full max-w-lg h-5 text-[#4a1a4a]/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {[...Array(20)].map((_, i) => (
            <path key={i} d={`M${i * 20} 15 Q${i * 20 + 10} 2 ${(i + 1) * 20} 15`} />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "rose") {
    return (
      <div className="flex items-center justify-center py-6 gap-3">
        <div className="w-16 md:w-32 h-px bg-gradient-to-r from-transparent to-[#4a1a4a]/50" />
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
          ))}
        </div>
        <Flower2 className="w-4 h-4 text-[#8b1a2a]/50" />
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
          ))}
        </div>
        <div className="w-16 md:w-32 h-px bg-gradient-to-l from-transparent to-[#4a1a4a]/50" />
      </div>
    );
  }

  if (variant === "cross") {
    return (
      <div className="flex items-center justify-center py-6 gap-4">
        <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-[#4a1a4a]/40" />
        <Cross className="w-4 h-4 text-[#8b1a2a]/50" />
        <div className="flex-1 max-w-xs h-px bg-gradient-to-l from-transparent to-[#4a1a4a]/40" />
      </div>
    );
  }

  // chain variant
  return (
    <div className="flex items-center justify-center py-6 gap-2">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`rounded-full ${
            i % 5 === 2 ? "w-2.5 h-2.5 bg-[#8b1a2a]/60" : "w-1.5 h-1.5 bg-[#4a1a4a]/50"
          }`}
        />
      ))}
    </div>
  );
}

// Ornate Dropdown - Dropdown with scrollwork frame decoration
function OrnateDropdown({
  isOpen,
  onToggle,
  selectedValue,
  options,
  placeholder,
}: {
  isOpen: boolean;
  onToggle: () => void;
  selectedValue?: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      {/* Ornate corners on button */}
      <button
        onClick={onToggle}
        className="w-full relative flex items-center justify-between px-5 py-4 border border-[#4a1a4a]/50 bg-[#0a0a0a]/80 font-serif text-sm text-[#e5e5e5]/70 hover:border-[#8b1a2a]/50 transition-all shadow-[0_2px_12px_rgba(74,26,74,0.2)]"
      >
        {/* Decorative corner flourishes */}
        <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#8b1a2a]/40" />
        <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#8b1a2a]/40" />
        <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#8b1a2a]/40" />
        <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#8b1a2a]/40" />

        <span>{selectedValue || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#8b1a2a] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu with scrollwork */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 border border-[#4a1a4a]/50 bg-[#0a0a0a] z-20 shadow-[0_8px_32px_rgba(74,26,74,0.4)]">
          {/* Scrollwork decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
            <Flower2 className="w-4 h-4 text-[#8b1a2a]/60" />
          </div>
          <div className="pt-2">
            {options.map((item, idx) => (
              <button
                key={item}
                className="w-full px-5 py-3 text-left text-sm font-serif text-[#e5e5e5]/60 hover:text-[#e5e5e5] hover:bg-[#4a1a4a]/20 transition-all border-b border-[#4a1a4a]/20 last:border-b-0 flex items-center gap-3"
                onClick={onToggle}
              >
                <span className="text-[#8b1a2a]/40">{idx + 1}.</span>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN SHOWCASE COMPONENT
// ============================================

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMotif, setSelectedMotif] = useState<string | undefined>();

  // Color palette data
  const colors = [
    { name: "Midnight Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", border: true },
    { name: "Deep Purple", hex: "#4a1a4a", bg: "bg-[#4a1a4a]" },
    { name: "Blood Red", hex: "#8b1a2a", bg: "bg-[#8b1a2a]" },
    { name: "Silver White", hex: "#e5e5e5", bg: "bg-[#e5e5e5]", border: true },
    { name: "Dark Plum", hex: "#6b2d5b", bg: "bg-[#6b2d5b]" },
  ];

  // Design rules data
  const doList = [
    "Use lace borders and scalloped edges on containers",
    "Apply serif typography throughout the design",
    "Include rose and cross accent motifs",
    "Maintain dark palette with purple and red accents",
    "Add ornate details and shadow effects",
    "Use drop caps for elegant paragraph starts",
  ];

  const dontList = [
    "Use sans-serif or monospace fonts",
    "Apply flat, unadorned color blocks",
    "Include sharp geometric corners",
    "Use bright, saturated primary colors",
    "Create minimal, stripped-down layouts",
    "Omit decorative border elements",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] text-[#e5e5e5] relative overflow-hidden">
      {/* Ornate border frame */}
      <div className="fixed inset-4 border border-[#4a1a4a]/20 pointer-events-none z-0" />
      <div className="fixed inset-8 border border-[#8b1a2a]/10 pointer-events-none z-0" />

      {/* Corner ornaments */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t border-l border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed top-6 right-6 w-12 h-12 border-t border-r border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b border-l border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b border-r border-[#4a1a4a]/40 pointer-events-none z-0" />

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#4a1a4a]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/gothic-lolita"
            className="flex items-center gap-2 text-[#e5e5e5]/70 hover:text-[#e5e5e5] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif tracking-wide">Back</span>
          </Link>
          <span className="font-serif text-xl text-[#e5e5e5] tracking-[0.2em] uppercase flex items-center gap-3">
            <Crown className="w-5 h-5 text-[#8b1a2a]" />
            Gothic Lolita
          </span>
          <div className="flex items-center gap-3">
            <Link
              href={`/preview?url=/styles/gothic-lolita/showcase`}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#4a1a4a]/50 text-[#e5e5e5]/70 font-serif text-sm hover:border-[#8b1a2a]/50 transition-all"
            >
              <Monitor className="w-4 h-4" />
            </Link>
            <Link
              href="/styles"
              className="px-4 py-2 border border-[#4a1a4a]/50 text-[#e5e5e5]/70 font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.3)] hover:bg-[#4a1a4a]/20 hover:border-[#8b1a2a]/50 transition-all"
            >
              All Styles
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <ShowcaseHero
        badge="Victorian Dark Elegance"
        title="Gothic Lolita"
        description="Dark elegance, Victorian grace -- lace borders, ribbon accents, roses and crosses in a world of shadow and beauty. A style where every detail whispers of devotion to ornate craft."
        className="relative z-10 pt-16 pb-12"
        badgeClassName="bg-[#4a1a4a]/30 border border-[#8b1a2a]/40 text-[#8b1a2a] font-serif tracking-widest rounded-none"
        titleClassName="font-serif text-[#e5e5e5] tracking-wide"
        descriptionClassName="font-serif text-[#e5e5e5]/60 leading-relaxed"
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="px-10 py-4 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_4px_16px_rgba(74,26,74,0.5)] hover:shadow-[0_8px_24px_rgba(139,26,42,0.5)] hover:border-[#8b1a2a] transition-all duration-300 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Enter the Garden
          </button>
          <button className="px-10 py-4 bg-transparent border border-[#e5e5e5]/30 text-[#e5e5e5]/70 font-serif tracking-wide hover:border-[#e5e5e5]/60 hover:text-[#e5e5e5] transition-all duration-300">
            Explore Collection
          </button>
        </div>
      </ShowcaseHero>

      <LaceDivider variant="rose" />

      {/* 3. Color Palette */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Palette
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Color System
          </h2>
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#4a1a4a]/40 bg-[#0a0a0a]/80 shadow-[0_4px_12px_rgba(74,26,74,0.15)] rounded-none"
            colorBlockClassName="h-20 md:h-28"
            labelClassName="font-serif text-sm text-[#e5e5e5]/80"
            hexClassName="text-xs text-[#8b1a2a] font-mono"
          />
        </div>
      </section>

      <LaceDivider variant="scallop" />

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Typography
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Letterforms
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <LacePanel variant="default">
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                Decorative Heading
              </p>
              <h3 className="font-serif text-3xl md:text-5xl tracking-tight mb-4 italic">
                The Art of <span className="text-[#8b1a2a]">Darkness</span>
              </h3>
              <p className="text-sm text-[#e5e5e5]/40 font-serif">
                font-serif / italic / tracking-tight
              </p>
            </LacePanel>
            <LacePanel variant="rose">
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                Body with Drop Cap
              </p>
              <p className="text-base leading-relaxed text-[#e5e5e5]/70 first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#8b1a2a]">
                In the quiet parlour of a forgotten estate, lace curtains frame windows
                where moonlight spills across velvet armchairs. Each detail speaks of a
                devotion to craft that modern haste has abandoned.
              </p>
            </LacePanel>
          </div>
        </div>
      </section>

      <LaceDivider variant="cross" />

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Interactions
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Buttons
          </h2>
          <LacePanel>
            <div className="space-y-8">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                  Variants
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all">
                    Primary
                  </button>
                  <button className="px-6 py-3 bg-[#0a0a0a] border border-[#4a1a4a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(10,10,10,0.5)] hover:border-[#8b1a2a]/50 transition-all">
                    Secondary
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-[#8b1a2a]/50 text-[#8b1a2a] font-serif tracking-wide hover:bg-[#8b1a2a]/10 transition-all">
                    Outline
                  </button>
                  <button className="px-6 py-3 bg-transparent text-[#e5e5e5]/50 font-serif tracking-wide hover:text-[#e5e5e5]/80 transition-all underline underline-offset-4 decoration-[#4a1a4a]/50">
                    Ghost
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                  With Icons
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Devotion
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-[#8b1a2a]/50 text-[#8b1a2a] font-serif tracking-wide hover:bg-[#8b1a2a]/10 transition-all flex items-center gap-2">
                    <Cross className="w-4 h-4" />
                    Sacred
                  </button>
                  <button className="px-6 py-3 bg-[#8b1a2a] border border-[#8b1a2a] text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(139,26,42,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.6)] transition-all flex items-center gap-2">
                    <Flower2 className="w-4 h-4" />
                    Rose
                  </button>
                </div>
              </div>
            </div>
          </LacePanel>
        </div>
      </section>

      <LaceDivider variant="chain" />

      {/* 6. Cards */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Collection
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Cross className="w-7 h-7 text-[#8b1a2a]" />,
                title: "Cross",
                desc: "Sacred darkness and silent devotion, wrought in iron and silver thread.",
                relic: "I",
                variant: "default" as const,
              },
              {
                icon: <Flower2 className="w-7 h-7 text-[#8b1a2a]" />,
                title: "Rose",
                desc: "Beauty born from thorns, petals pressed between pages of forgotten diaries.",
                relic: "II",
                variant: "rose" as const,
              },
              {
                icon: <Crown className="w-7 h-7 text-[#e5e5e5]/70" />,
                title: "Crown",
                desc: "Regal elegance in shadow, where noble blood meets midnight velvet.",
                relic: "III",
                variant: "velvet" as const,
              },
            ].map((card) => (
              <LacePanel key={card.title} variant={card.variant} className="group">
                <div className="w-14 h-14 bg-[#4a1a4a]/30 border border-[#4a1a4a]/50 flex items-center justify-center mb-4 group-hover:border-[#8b1a2a]/50 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">
                  {card.title}
                </h3>
                <p className="text-[#e5e5e5]/50 font-serif text-sm leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-[#4a1a4a]/20 flex items-center justify-between">
                  <span className="text-xs font-serif text-[#6b2d5b] tracking-wider">
                    RELIC NO. {card.relic}
                  </span>
                  <Star className="w-3 h-3 text-[#8b1a2a]/40" />
                </div>
              </LacePanel>
            ))}
          </div>
        </div>
      </section>

      <LaceDivider variant="rose" />

      {/* 7. Form */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Correspondence
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Form
          </h2>
          <LacePanel variant="default">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-[#4a1a4a]/20 border border-[#4a1a4a]/40 flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-[#8b1a2a]" />
              </div>
              <h3 className="text-xl font-serif text-[#e5e5e5] tracking-wide">
                Write to Us
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#8b1a2a] tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#6b2d5b] tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#6b2d5b] tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Send Letter
              </button>
            </div>
          </LacePanel>
        </div>
      </section>

      <LaceDivider variant="scallop" />

      {/* 8. Tabs */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Motifs
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Tabs
          </h2>
          <div className="border border-[#4a1a4a]/30 bg-[#0a0a0a]/60">
            <div className="flex border-b border-[#4a1a4a]/30">
              {["Lace", "Ribbon", "Rose"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-6 py-5 text-sm font-serif tracking-wider transition-all relative ${
                    activeTab === i
                      ? "text-[#e5e5e5] bg-[#4a1a4a]/20"
                      : "text-[#e5e5e5]/40 hover:text-[#e5e5e5]/70 hover:bg-[#4a1a4a]/10"
                  }`}
                >
                  {tab}
                  {/* Scalloped underline indicator */}
                  {activeTab === i && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-1 overflow-hidden">
                      <svg
                        viewBox="0 0 100 8"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        fill="none"
                        stroke="#8b1a2a"
                        strokeWidth="2"
                      >
                        {[...Array(10)].map((_, j) => (
                          <path key={j} d={`M${j * 10} 6 Q${j * 10 + 5} 1 ${(j + 1) * 10} 6`} />
                        ))}
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 font-serif text-sm text-[#e5e5e5]/60 leading-relaxed">
              {activeTab === 0 && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4a1a4a]/20 border border-[#4a1a4a]/40 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#8b1a2a]" />
                  </div>
                  <div>
                    <p className="text-[#8b1a2a] mb-2 tracking-wide font-medium">
                      -- Lace Motif
                    </p>
                    <p>
                      Delicate scalloped edges and intricate openwork patterns define the
                      lace motif. Every border whispers of handcraft, from Chantilly to
                      Valenciennes. Apply scalloped borders, filigree overlays, and
                      translucent layering.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6b2d5b]/20 border border-[#6b2d5b]/40 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#6b2d5b]" />
                  </div>
                  <div>
                    <p className="text-[#6b2d5b] mb-2 tracking-wide font-medium">
                      -- Ribbon Motif
                    </p>
                    <p>
                      Satin ribbons cascade in bows and streamers, binding the composition
                      together. Use ribbon-shaped badges, bow-tie dividers, and flowing
                      accent lines to evoke the elegance of wrapped gifts and corset
                      lacing.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8b1a2a]/20 border border-[#8b1a2a]/40 flex items-center justify-center shrink-0">
                    <Flower2 className="w-5 h-5 text-[#8b1a2a]" />
                  </div>
                  <div>
                    <p className="text-[#8b1a2a] mb-2 tracking-wide font-medium">
                      -- Rose Motif
                    </p>
                    <p>
                      The rose stands as the ultimate symbol of Gothic Lolita -- beauty
                      entwined with thorns. Employ rose silhouettes as section dividers,
                      petal-shaped containers, and thorn-vine borders throughout your
                      designs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <LaceDivider variant="cross" />

      {/* 9. Ribbon Badges */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Adornments
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Badges
          </h2>
          <div className="space-y-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-6 font-serif">
                Satin Ribbon Badges
              </p>
              <div className="flex flex-wrap gap-6">
                <RibbonBadge color="purple">Velvet</RibbonBadge>
                <RibbonBadge color="red">Crimson</RibbonBadge>
                <RibbonBadge color="plum">Plum</RibbonBadge>
                <RibbonBadge color="silver">Silver</RibbonBadge>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-6 font-serif">
                Lace Border Tags
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1.5 border border-[#4a1a4a]/60 text-[#e5e5e5]/70 text-xs font-serif tracking-wider border-dashed">
                  Antique
                </span>
                <span className="px-4 py-1.5 border border-[#8b1a2a]/50 text-[#8b1a2a] text-xs font-serif tracking-wider border-dashed">
                  Gothic
                </span>
                <span className="px-4 py-1.5 border border-[#e5e5e5]/30 text-[#e5e5e5]/50 text-xs font-serif tracking-wider border-dashed">
                  Silver
                </span>
                <span className="px-4 py-1.5 border border-[#6b2d5b]/50 text-[#6b2d5b] text-xs font-serif tracking-wider border-dashed">
                  Twilight
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-6 font-serif">
                Rosette Badges
              </p>
              <div className="flex flex-wrap gap-6">
                <RosetteBadge icon={<Star className="w-3 h-3" />}>Limited Edition</RosetteBadge>
                <RosetteBadge icon={<Crown className="w-3 h-3" />}>Exclusive</RosetteBadge>
                <RosetteBadge icon={<Flower2 className="w-3 h-3" />}>Handcrafted</RosetteBadge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LaceDivider variant="chain" />

      {/* 10. Progress Bars */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Devotion
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Progress
          </h2>
          <LacePanel>
            <div className="space-y-8">
              <RosaryProgress value={85} label="Lace Weaving" color="purple" />
              <RosaryProgress value={60} label="Rose Cultivation" color="red" />
              <RosaryProgress value={40} label="Ribbon Stitching" color="plum" />
            </div>
          </LacePanel>
        </div>
      </section>

      <LaceDivider variant="rose" />

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Notices
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Alerts
          </h2>
          <div className="space-y-4">
            {/* Rose accent info */}
            <div className="flex items-start gap-4 p-5 border border-[#8b1a2a]/30 bg-[#8b1a2a]/5 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#8b1a2a]/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#8b1a2a]/40" />
              <Flower2 className="w-5 h-5 text-[#8b1a2a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-[#8b1a2a] mb-1 tracking-wide">
                  Rose Notice
                </p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">
                  A gentle reminder adorned with the scent of roses.
                </p>
              </div>
            </div>

            {/* Cross accent warning */}
            <div className="flex items-start gap-4 p-5 border border-amber-700/30 bg-amber-900/5 border-l-2 border-l-amber-700">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-amber-600 mb-1 tracking-wide">
                  Warning
                </p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">
                  Take heed -- something requires your careful attention.
                </p>
              </div>
              <Cross className="w-4 h-4 text-amber-700/40 shrink-0" />
            </div>

            {/* Lace-bordered error */}
            <div className="flex items-start gap-4 p-5 border border-[#8b1a2a]/50 bg-[#8b1a2a]/10 border-dashed relative">
              <div className="absolute top-0 left-1/4 right-1/4 h-2 overflow-hidden">
                <svg
                  viewBox="0 0 200 8"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="#8b1a2a"
                  strokeWidth="1"
                  opacity="0.4"
                >
                  {[...Array(20)].map((_, i) => (
                    <path key={i} d={`M${i * 10} 6 Q${i * 10 + 5} 1 ${(i + 1) * 10} 6`} />
                  ))}
                </svg>
              </div>
              <Ban className="w-5 h-5 text-[#8b1a2a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-[#8b1a2a] mb-1 tracking-wide">
                  Error
                </p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">
                  Something has gone terribly wrong in the parlour.
                </p>
              </div>
            </div>

            {/* Velvet success */}
            <div className="flex items-start gap-4 p-5 border border-emerald-800/30 bg-emerald-900/10 border-l-2 border-l-emerald-700">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-emerald-600 mb-1 tracking-wide">
                  Success
                </p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">
                  Your offering has been gracefully received.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LaceDivider variant="scallop" />

      {/* 12. Dropdown */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-xs mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Selection
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Dropdown
          </h2>
          <OrnateDropdown
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            selectedValue={selectedMotif}
            placeholder="Choose a Motif"
            options={[
              "Cross & Iron",
              "Rose & Thorn",
              "Lace & Pearl",
              "Ribbon & Bow",
              "Crown & Scepter",
            ]}
          />
        </div>
      </section>

      <LaceDivider variant="cross" />

      {/* 13. Table */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Inventory
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Collection Table
          </h2>
          <div className="border border-[#4a1a4a]/30 overflow-hidden relative">
            {/* Ornate corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8b1a2a]/40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8b1a2a]/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8b1a2a]/40 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8b1a2a]/40 pointer-events-none" />
            <table className="w-full">
              <thead>
                <tr className="bg-[#4a1a4a]/15 border-b border-[#4a1a4a]/30">
                  <th className="px-5 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">
                    Item
                  </th>
                  <th className="px-5 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">
                    Category
                  </th>
                  <th className="px-5 py-4 text-left text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">
                    Era
                  </th>
                  <th className="px-5 py-4 text-right text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    item: "Chantilly Lace Collar",
                    cat: "Accessory",
                    era: "1890s",
                    cond: "Pristine",
                    condColor: "text-emerald-500",
                  },
                  {
                    item: "Iron Crucifix Brooch",
                    cat: "Jewelry",
                    era: "1870s",
                    cond: "Aged",
                    condColor: "text-[#8b1a2a]",
                  },
                  {
                    item: "Velvet Mourning Dress",
                    cat: "Garment",
                    era: "1860s",
                    cond: "Restored",
                    condColor: "text-[#6b2d5b]",
                  },
                  {
                    item: "Pearl Rosary Necklace",
                    cat: "Jewelry",
                    era: "1880s",
                    cond: "Excellent",
                    condColor: "text-[#e5e5e5]/80",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#4a1a4a]/15 last:border-b-0 hover:bg-[#4a1a4a]/10 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-serif text-[#e5e5e5]/80">
                      {row.item}
                    </td>
                    <td className="px-5 py-4 text-sm font-serif text-[#e5e5e5]/50">
                      {row.cat}
                    </td>
                    <td className="px-5 py-4 text-sm font-serif text-[#e5e5e5]/50">
                      {row.era}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`text-xs font-serif tracking-wider ${row.condColor}`}
                      >
                        {row.cond}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <LaceDivider variant="chain" />

      {/* 14. Blockquote */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Words
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Blockquote
          </h2>
          <blockquote className="border-l-2 border-[#8b1a2a] pl-6 md:pl-8 relative">
            {/* Rose divider above */}
            <div className="absolute -top-4 left-6 flex items-center gap-2">
              <div className="w-6 h-px bg-[#8b1a2a]/40" />
              <Flower2 className="w-3 h-3 text-[#8b1a2a]/50" />
              <div className="w-6 h-px bg-[#8b1a2a]/40" />
            </div>
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-6 text-[#e5e5e5]/80">
              &ldquo;One must dress as if the world is a funeral for beauty itself --
              in lace, in shadow, in devotion to the ornate.&rdquo;
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#8b1a2a]" />
              <Flower2 className="w-3 h-3 text-[#8b1a2a]" />
              <div className="w-8 h-px bg-[#8b1a2a]" />
            </div>
            <footer className="text-sm text-[#6b2d5b] font-serif tracking-wider">
              -- A Victorian Muse
            </footer>
          </blockquote>
        </div>
      </section>

      <LaceDivider variant="rose" />

      {/* 15. Lace Dividers Showcase */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Ornament
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Lace Dividers
          </h2>
          <div className="space-y-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                Scalloped Arc
              </p>
              <LaceDivider variant="scallop" />
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                Rose Chain
              </p>
              <LaceDivider variant="rose" />
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                Cross Pattern
              </p>
              <LaceDivider variant="cross" />
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">
                Rosary Chain
              </p>
              <LaceDivider variant="chain" />
            </div>
          </div>
        </div>
      </section>

      <LaceDivider variant="scallop" />

      {/* 16. Rules Summary */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">
            Guidelines
          </p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">
            Core Rules
          </h2>
          <DesignRulesGrid
            doList={doList}
            dontList={dontList}
            containerClassName="grid md:grid-cols-2 gap-8"
            doTitleClassName="font-serif text-xl mb-6 text-[#e5e5e5]"
            dontTitleClassName="font-serif text-xl mb-6 text-[#8b1a2a]"
            itemClassName="text-sm text-[#e5e5e5]/60 font-serif"
            doTitle="Required"
            dontTitle="Forbidden"
          />
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#4a1a4a]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#4a1a4a]/40" />
            <Flower2 className="w-3 h-3 text-[#8b1a2a]/40" />
            <div className="w-8 h-px bg-[#4a1a4a]/40" />
          </div>
          <p className="text-[#e5e5e5]/40 text-sm font-serif">
            Gothic Lolita Showcase &middot; Part of{" "}
            <Link
              href="/"
              className="text-[#e5e5e5]/60 hover:text-[#e5e5e5] transition-colors"
            >
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
