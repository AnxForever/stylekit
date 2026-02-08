"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Waves,
  Sun,
  Flower2,
  Mountain,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  Cloud,
  Snowflake,
  Leaf,
  Zap,
  Eye,
  Brush,
  Layers,
  Palette,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// INLINE COMPONENTS - Ukiyo-e Digital Style
// ============================================================================

// WoodblockPanel - Panel with thick black outline and flat color fill
function WoodblockPanel({
  children,
  className = "",
  borderColor = "border-[#1a3055]",
  bgColor = "bg-[#f5f0e1]",
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  bgColor?: string;
}) {
  return (
    <div className={`${bgColor} border-4 ${borderColor} p-6 ${className}`}>
      {children}
    </div>
  );
}

// HankoSeal - Circular seal stamp badge
function HankoSeal({
  text,
  variant = "circle",
  color = "vermilion",
  size = "md",
}: {
  text: string;
  variant?: "circle" | "rectangle" | "wave";
  color?: "vermilion" | "indigo" | "gold";
  size?: "sm" | "md" | "lg";
}) {
  const colors = {
    vermilion: { bg: "bg-[#d4553a]", text: "text-[#f5f0e1]", border: "border-[#1a3055]" },
    indigo: { bg: "bg-[#1a3055]", text: "text-[#f5f0e1]", border: "border-[#c9a227]" },
    gold: { bg: "bg-[#c9a227]", text: "text-[#1a3055]", border: "border-[#1a3055]" },
  };
  const sizes = {
    sm: { circle: "w-10 h-10 text-[10px]", rect: "px-3 py-1 text-[10px]" },
    md: { circle: "w-14 h-14 text-xs", rect: "px-4 py-1.5 text-xs" },
    lg: { circle: "w-18 h-18 text-sm", rect: "px-5 py-2 text-sm" },
  };
  const c = colors[color];
  const s = sizes[size];

  if (variant === "circle") {
    return (
      <span
        className={`${s.circle} rounded-full ${c.bg} ${c.text} flex items-center justify-center font-serif font-bold border-2 ${c.border} shadow-[2px_2px_0px_#1a3055]`}
      >
        {text}
      </span>
    );
  }
  if (variant === "rectangle") {
    return (
      <span
        className={`${s.rect} ${c.bg} ${c.text} font-bold tracking-widest border-2 ${c.border} shadow-[2px_2px_0px_#1a3055] inline-block`}
      >
        {text}
      </span>
    );
  }
  // wave border
  return (
    <span
      className={`${s.rect} border-2 border-dashed ${c.border} ${c.text.replace("text-[#f5f0e1]", `text-${color === "vermilion" ? "[#d4553a]" : color === "indigo" ? "[#1a3055]" : "[#c9a227]"}`)} font-bold tracking-widest inline-block`}
      style={{ color: color === "vermilion" ? "#d4553a" : color === "indigo" ? "#1a3055" : "#c9a227" }}
    >
      {text}
    </span>
  );
}

// WaveDivider - Seigaiha wave pattern SVG divider
function WaveDivider({
  color = "#1a3055",
  count = 7,
  className = "",
}: {
  color?: string;
  count?: number;
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg width={count * 40} height="24" viewBox={`0 0 ${count * 40} 24`} fill="none">
        {Array.from({ length: count }).map((_, i) => (
          <g key={i}>
            <path
              d={`M${i * 40} 24 Q${i * 40 + 20} 0 ${i * 40 + 40} 24`}
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d={`M${i * 40 + 5} 24 Q${i * 40 + 20} 6 ${i * 40 + 35} 24`}
              stroke={color}
              strokeWidth="1"
              opacity="0.4"
              fill="none"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// InkProgress - Progress bar with ink wash effect
function InkProgress({
  label,
  percent,
  color = "indigo",
}: {
  label: string;
  percent: number;
  color?: "indigo" | "vermilion" | "gold" | "ink";
}) {
  const colors = {
    indigo: "bg-[#1a3055]",
    vermilion: "bg-[#d4553a]",
    gold: "bg-[#c9a227]",
    ink: "bg-gradient-to-r from-[#1a3055] via-[#2a5a8c] to-[#1a3055]/60",
  };
  return (
    <div>
      <div className="flex justify-between text-sm font-bold mb-2">
        <span className="tracking-wider">{label}</span>
        <span className="text-[#d4553a] font-mono">{percent}%</span>
      </div>
      <div className="h-5 bg-[#f5f0e1] border-4 border-[#1a3055] relative overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
        {/* Ink wash edge effect */}
        <div
          className="absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-[#1a3055]/20"
          style={{ left: `calc(${percent}% - 8px)` }}
        />
      </div>
    </div>
  );
}

// SeasonalTab - Tab with traditional seasonal color
function SeasonalTab({
  season,
  jaName,
  isActive,
  onClick,
  color,
}: {
  season: string;
  jaName: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 text-sm font-bold tracking-wider transition-all duration-300 border-r-2 border-[#1a3055] last:border-r-0 ${
        isActive
          ? `${color} text-[#f5f0e1] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]`
          : "bg-[#f5f0e1] text-[#1a3055]/60 hover:text-[#1a3055] hover:bg-[#1a3055]/5"
      }`}
    >
      <span className="hidden md:inline">{season}</span>
      <span className="md:hidden font-serif text-lg">{jaName}</span>
    </button>
  );
}

// BrushHeading - Heading with brush-stroke underline decoration
function BrushHeading({
  children,
  className = "",
  accentColor = "#d4553a",
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
        {children}
      </h2>
      <svg
        className="absolute -bottom-2 left-0 w-full h-3"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
      >
        <path
          d="M0,8 Q30,2 60,6 T120,4 T180,8 L200,6"
          stroke={accentColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// LayeredMountain - Decorative mountain silhouette
function LayeredMountain({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 120" fill="none">
      <path d="M0 120 L80 40 L160 120 Z" fill="#1a3055" opacity="0.3" />
      <path d="M60 120 L150 20 L240 120 Z" fill="#1a3055" opacity="0.5" />
      <path d="M140 120 L220 50 L300 120 Z" fill="#1a3055" opacity="0.4" />
      <path d="M220 120 L320 30 L400 120 Z" fill="#2a5a8c" opacity="0.6" />
      {/* Snow cap on main peak */}
      <path d="M150 20 L165 45 L135 45 Z" fill="#f5f0e1" />
    </svg>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPrint, setSelectedPrint] = useState("Select Print Series");

  const seasons = [
    {
      name: "Spring",
      ja: "春",
      color: "bg-[#e8a0b4]",
      accent: "border-[#e8a0b4]",
      textColor: "text-[#c4748e]",
      icon: Flower2,
      content:
        "Cherry blossoms scatter in warm breezes. The world awakens in delicate pink and white, as new beginnings emerge from winter's rest. Hanami gatherings celebrate the transient beauty of sakura beneath ancient trees.",
    },
    {
      name: "Summer",
      ja: "夏",
      color: "bg-[#2d6a4f]",
      accent: "border-[#2d6a4f]",
      textColor: "text-[#2d6a4f]",
      icon: Sun,
      content:
        "Verdant greens and deep shadows under the blazing sun. Cicadas sing endlessly as the world reaches its fullest expression of life. Fireworks illuminate the night sky above still rivers and paper lanterns.",
    },
    {
      name: "Autumn",
      ja: "秋",
      color: "bg-[#d4553a]",
      accent: "border-[#d4553a]",
      textColor: "text-[#d4553a]",
      icon: Leaf,
      content:
        "Maple leaves paint the mountains in vermilion and gold. A melancholic beauty as the floating world prepares for stillness. Travelers walk along crimson forest paths toward distant temples.",
    },
    {
      name: "Winter",
      ja: "冬",
      color: "bg-[#1a3055]",
      accent: "border-[#1a3055]",
      textColor: "text-[#1a3055]",
      icon: Snowflake,
      content:
        "Snow blankets the world in quiet contemplation. Indigo nights and ivory mornings reveal beauty in absence. Cranes stand solitary beside frozen streams under pale winter skies.",
    },
  ];

  const printSeries = [
    "Thirty-six Views of Mount Fuji",
    "One Hundred Famous Views of Edo",
    "Fifty-three Stations of the Tokaido",
    "Eight Views of Omi Province",
    "Sixty-nine Stations of the Kisokaido",
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e1] text-[#1a3055]">
      {/* 1. Navigation */}
      <header className="border-b-4 border-[#1a3055] sticky top-0 z-50 bg-[#f5f0e1]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles/ukiyo-e-digital/showcase"
              className="font-serif text-xl md:text-2xl tracking-[0.3em] font-bold flex items-center gap-3"
            >
              <span className="w-10 h-10 bg-[#d4553a] border-2 border-[#1a3055] flex items-center justify-center text-[#f5f0e1] text-sm">
                浮
              </span>
              <span className="hidden md:inline">浮世絵</span>
            </Link>
            <nav className="flex items-center gap-4 md:gap-8">
              <Link
                href="/styles/ukiyo-e-digital"
                className="text-xs md:text-sm font-bold tracking-wider text-[#1a3055]/60 hover:text-[#d4553a] transition-colors border-b-2 border-transparent hover:border-[#d4553a]"
              >
                DOCS
              </Link>
              <Link
                href="/styles"
                className="text-xs md:text-sm font-bold tracking-wider text-[#1a3055]/60 hover:text-[#d4553a] transition-colors border-b-2 border-transparent hover:border-[#d4553a]"
              >
                STYLES
              </Link>
              <button className="px-4 py-2 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] text-xs font-bold tracking-wider hover:bg-[#1a3055] transition-colors shadow-[2px_2px_0px_#1a3055]">
                ENTER
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="border-b-4 border-[#1a3055] relative overflow-hidden">
        <LayeredMountain className="absolute bottom-0 left-0 right-0 w-full h-32 md:h-48" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32 text-center relative z-10">
          <div className="inline-block mb-6">
            <HankoSeal text="版画" variant="circle" color="vermilion" size="lg" />
          </div>
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-6">
            Design Style Showcase
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Ukiyo-e Digital
          </h1>
          <p className="text-lg md:text-xl text-[#1a3055]/70 tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
            Where traditional woodblock artistry meets modern digital design.
            Flat layers, bold outlines, and timeless motifs reborn for the screen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[#d4553a] text-[#f5f0e1] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#c9a227] transition-all shadow-[4px_4px_0px_#1a3055] hover:shadow-[6px_6px_0px_#1a3055] hover:-translate-y-0.5 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Explore Gallery
            </button>
            <button className="px-8 py-4 bg-[#f5f0e1] text-[#1a3055] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-all shadow-[4px_4px_0px_#1a3055] flex items-center gap-2">
              <Brush className="w-5 h-5" />
              Learn Style
            </button>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <WaveDivider color="#1a3055" count={10} className="py-6 border-b-2 border-[#1a3055]/10" />

      {/* 3. Color Palette */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Color System
          </p>
          <BrushHeading className="mb-10">浮世之色</BrushHeading>
          <p className="text-[#1a3055]/60 mb-12 max-w-2xl">
            Traditional pigments ground from minerals, plants, and shells. Each color carries
            centuries of artistic heritage, now translated into precise digital values.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Ai (Indigo)", hex: "#1a3055", bg: "bg-[#1a3055]", light: false },
              { name: "Shu (Vermilion)", hex: "#d4553a", bg: "bg-[#d4553a]", light: false },
              { name: "Kin (Gold)", hex: "#c9a227", bg: "bg-[#c9a227]", light: true },
              { name: "Kome (Rice)", hex: "#f5f0e1", bg: "bg-[#f5f0e1]", light: true },
              { name: "Koiai (Deep Blue)", hex: "#2a5a8c", bg: "bg-[#2a5a8c]", light: false },
            ].map((color) => (
              <WoodblockPanel
                key={color.name}
                className="p-0"
                bgColor={color.bg}
              >
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-4 border-t-4 border-[#1a3055] bg-[#f5f0e1]">
                  <p className="text-sm font-bold tracking-wider">{color.name}</p>
                  <p className="text-xs text-[#d4553a] font-mono mt-1">{color.hex}</p>
                </div>
              </WoodblockPanel>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Typography
          </p>
          <BrushHeading className="mb-10" accentColor="#1a3055">書体</BrushHeading>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Brush-stroke Heading */}
            <WoodblockPanel borderColor="border-[#1a3055]">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4553a] mb-6">
                Brush-stroke Display
              </p>
              <h3 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                The Floating World Awaits
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#1a3055]/10 text-xs font-mono">font-serif</span>
                <span className="px-2 py-1 bg-[#1a3055]/10 text-xs font-mono">font-bold</span>
                <span className="px-2 py-1 bg-[#1a3055]/10 text-xs font-mono">tracking-tight</span>
              </div>
            </WoodblockPanel>
            {/* Clean Body Text */}
            <WoodblockPanel borderColor="border-[#2a5a8c]">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#2a5a8c] mb-6">
                Clean Body Text
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-[#1a3055]/80">
                Body text remains clean and legible, providing a quiet counterpoint to bold
                display headings. The contrast between heavy titles and light prose mirrors
                the layered technique of traditional woodblock printing, where each color
                requires a separate carved block.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#2a5a8c]/10 text-xs font-mono">font-sans</span>
                <span className="px-2 py-1 bg-[#2a5a8c]/10 text-xs font-mono">leading-relaxed</span>
                <span className="px-2 py-1 bg-[#2a5a8c]/10 text-xs font-mono">text-base</span>
              </div>
            </WoodblockPanel>
          </div>
          {/* Scale Contrast Demo */}
          <div className="mt-12 border-4 border-[#1a3055] p-8 bg-[#1a3055]/5">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-6">
              Scale Contrast Hierarchy
            </p>
            <div className="space-y-4">
              <p className="font-serif text-5xl font-bold">Display / 48px</p>
              <p className="font-serif text-3xl font-bold">Heading / 30px</p>
              <p className="font-serif text-xl font-bold">Subheading / 20px</p>
              <p className="text-base">Body text / 16px - for extended reading</p>
              <p className="text-sm text-[#1a3055]/60">Caption / 14px - metadata and labels</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Interactive Elements
          </p>
          <BrushHeading className="mb-10">版画之印</BrushHeading>
          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Primary Actions
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#d4553a] text-[#f5f0e1] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] transition-all shadow-[4px_4px_0px_#1a3055] hover:-translate-y-0.5 flex items-center gap-2">
                  <Waves className="w-4 h-4" />
                  Vermilion Wave
                </button>
                <button className="px-6 py-3 bg-[#1a3055] text-[#f5f0e1] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#2a5a8c] transition-all shadow-[4px_4px_0px_#c9a227]">
                  Indigo Deep
                </button>
                <button className="px-6 py-3 bg-[#c9a227] text-[#1a3055] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#d4553a] hover:text-[#f5f0e1] transition-all shadow-[4px_4px_0px_#1a3055]">
                  Gold Leaf
                </button>
              </div>
            </div>
            {/* Secondary Buttons */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Secondary Actions
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-transparent text-[#1a3055] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-all">
                  Outline Style
                </button>
                <button className="px-6 py-3 bg-transparent text-[#d4553a] border-4 border-[#d4553a] font-bold tracking-wider hover:bg-[#d4553a] hover:text-[#f5f0e1] transition-all">
                  Vermilion Outline
                </button>
                <button className="px-6 py-3 bg-[#f5f0e1] text-[#1a3055] border-4 border-dashed border-[#1a3055] font-bold tracking-wider hover:border-solid transition-all">
                  Dashed Border
                </button>
              </div>
            </div>
            {/* Button Sizes */}
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Size Variants
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-4 py-2 text-sm bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] font-bold tracking-wider shadow-[2px_2px_0px_#1a3055]">
                  Small
                </button>
                <button className="px-6 py-3 bg-[#d4553a] text-[#f5f0e1] border-4 border-[#1a3055] font-bold tracking-wider shadow-[4px_4px_0px_#1a3055]">
                  Medium
                </button>
                <button className="px-8 py-4 text-lg bg-[#d4553a] text-[#f5f0e1] border-4 border-[#1a3055] font-bold tracking-wider shadow-[6px_6px_0px_#1a3055]">
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider - Vermilion */}
      <WaveDivider color="#d4553a" count={10} className="py-6" />

      {/* 6. Cards */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Content Blocks
          </p>
          <BrushHeading className="mb-10">浮世百景</BrushHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Waves,
                title: "The Great Wave",
                desc: "Beneath the surface of the floating world, tides shape the shore in endless rhythm. Mount Fuji stands unmoved in the distance.",
                borderColor: "border-[#2a5a8c]",
                iconBg: "bg-[#2a5a8c]",
                accentColor: "#2a5a8c",
              },
              {
                icon: Mountain,
                title: "Red Fuji",
                desc: "Thirty-six views of the sacred peak, each revealing a different face. Dawn light paints the snow vermilion and gold.",
                borderColor: "border-[#d4553a]",
                iconBg: "bg-[#d4553a]",
                accentColor: "#d4553a",
              },
              {
                icon: Flower2,
                title: "Cherry Blossom",
                desc: "Petals fall like snow in spring, a reminder that all beauty is fleeting. Hanami gatherings beneath ancient trees.",
                borderColor: "border-[#e8a0b4]",
                iconBg: "bg-[#e8a0b4]",
                accentColor: "#c4748e",
              },
            ].map((card, i) => (
              <WoodblockPanel
                key={i}
                borderColor={card.borderColor}
                className="hover:shadow-[8px_8px_0px_#1a3055] hover:-translate-y-1 transition-all group"
              >
                <div
                  className={`w-16 h-16 ${card.iconBg} flex items-center justify-center mb-6 border-4 border-[#1a3055]`}
                >
                  <card.icon className="w-8 h-8 text-[#f5f0e1]" />
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-wider mb-3" style={{ color: card.accentColor }}>
                  {card.title}
                </h3>
                <p className="text-[#1a3055]/60 text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
                <button className="text-sm font-bold tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: card.accentColor }}>
                  View Details <ArrowRight className="w-4 h-4" />
                </button>
              </WoodblockPanel>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Form */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-lg mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4 text-center">
            Form Elements
          </p>
          <BrushHeading className="mb-10 text-center block mx-auto w-fit">書道之美</BrushHeading>
          <WoodblockPanel className="shadow-[6px_6px_0px_#1a3055]">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-[0.3em] uppercase text-[#d4553a] mb-3">
                  Name (名前)
                </label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-4 border-[#1a3055] text-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#d4553a] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/60 mb-3">
                  Email (電子メール)
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-4 border-[#1a3055] text-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#c9a227] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/60 mb-3">
                  Message (メッセージ)
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-4 border-[#1a3055] text-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#d4553a] focus:outline-none transition-colors resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-[#d4553a] text-[#f5f0e1] border-4 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] transition-colors shadow-[4px_4px_0px_#1a3055]">
                Submit Message
              </button>
            </div>
          </WoodblockPanel>
        </div>
      </section>

      {/* 8. Seasonal Tabs */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Seasonal Themes
          </p>
          <BrushHeading className="mb-10">四季</BrushHeading>
          <div className="border-4 border-[#1a3055] shadow-[6px_6px_0px_#1a3055]">
            <div className="flex border-b-4 border-[#1a3055]">
              {seasons.map((season, i) => (
                <SeasonalTab
                  key={season.name}
                  season={season.name}
                  jaName={season.ja}
                  isActive={activeTab === i}
                  onClick={() => setActiveTab(i)}
                  color={season.color}
                />
              ))}
            </div>
            <div className="p-8 bg-[#f5f0e1]">
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 ${seasons[activeTab].color} flex items-center justify-center border-4 border-[#1a3055] shrink-0`}>
                  {(() => {
                    const Icon = seasons[activeTab].icon;
                    return <Icon className="w-8 h-8 text-[#f5f0e1]" />;
                  })()}
                </div>
                <div>
                  <p className={`font-serif text-2xl md:text-3xl font-bold mb-3 ${seasons[activeTab].textColor}`}>
                    {seasons[activeTab].name} / {seasons[activeTab].ja}
                  </p>
                  <p className="text-[#1a3055]/70 leading-relaxed">
                    {seasons[activeTab].content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider - Gold */}
      <WaveDivider color="#c9a227" count={10} className="py-6" />

      {/* 9. Hanko Badges */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Badge System
          </p>
          <BrushHeading className="mb-10">判子</BrushHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Circular Seals */}
            <WoodblockPanel borderColor="border-[#d4553a]">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4553a] mb-6">
                Circular Seal Stamps
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <HankoSeal text="承認" variant="circle" color="vermilion" size="lg" />
                <HankoSeal text="印鑑" variant="circle" color="indigo" size="md" />
                <HankoSeal text="金" variant="circle" color="gold" size="sm" />
              </div>
              <p className="text-xs text-[#1a3055]/50 mt-4">
                Traditional round seals used for authentication
              </p>
            </WoodblockPanel>

            {/* Rectangular Chops */}
            <WoodblockPanel borderColor="border-[#1a3055]">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055] mb-6">
                Rectangular Chops
              </p>
              <div className="flex flex-wrap gap-3">
                <HankoSeal text="APPROVED" variant="rectangle" color="vermilion" />
                <HankoSeal text="OFFICIAL" variant="rectangle" color="indigo" />
                <HankoSeal text="PREMIUM" variant="rectangle" color="gold" />
              </div>
              <p className="text-xs text-[#1a3055]/50 mt-4">
                Status indicators with bold presence
              </p>
            </WoodblockPanel>

            {/* Wave-border Tags */}
            <WoodblockPanel borderColor="border-[#c9a227]">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a227] mb-6">
                Wave-border Tags
              </p>
              <div className="flex flex-wrap gap-3">
                <HankoSeal text="WAVE" variant="wave" color="indigo" />
                <HankoSeal text="VERMILION" variant="wave" color="vermilion" />
                <HankoSeal text="GOLD" variant="wave" color="gold" />
              </div>
              <p className="text-xs text-[#1a3055]/50 mt-4">
                Decorative tags with dashed borders
              </p>
            </WoodblockPanel>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Progress Indicators
          </p>
          <BrushHeading className="mb-10">進行</BrushHeading>
          <div className="space-y-8">
            <InkProgress label="Woodblock Carving" percent={75} color="indigo" />
            <InkProgress label="Ink Preparation" percent={50} color="vermilion" />
            <InkProgress label="Gold Leaf Application" percent={90} color="gold" />
            <InkProgress label="Color Registration" percent={60} color="ink" />
          </div>
          <div className="mt-12 p-6 bg-[#1a3055]/5 border-4 border-[#1a3055]">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
              Flat Block Progress
            </p>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-8 border-2 border-[#1a3055] ${
                    i < 7 ? "bg-[#1a3055]" : "bg-[#f5f0e1]"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#1a3055]/60 mt-3">70% Complete - Block-style progress visualization</p>
          </div>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Notifications
          </p>
          <BrushHeading className="mb-10">通知</BrushHeading>
          <div className="space-y-4">
            {/* Wave Info */}
            <div className="flex items-start gap-4 p-5 border-4 border-[#2a5a8c] bg-[#2a5a8c]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#2a5a8c]" />
              <div className="w-10 h-10 bg-[#2a5a8c] flex items-center justify-center border-2 border-[#1a3055] shrink-0">
                <Waves className="w-5 h-5 text-[#f5f0e1]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#2a5a8c] mb-1 tracking-wider">Wave Notice</p>
                <p className="text-sm text-[#1a3055]/70">The tide patterns have been updated for this season. New prints are available.</p>
              </div>
            </div>

            {/* Sun Warning */}
            <div className="flex items-start gap-4 p-5 border-4 border-[#c9a227] bg-[#c9a227]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c9a227]" />
              <div className="w-10 h-10 bg-[#c9a227] flex items-center justify-center border-2 border-[#1a3055] shrink-0">
                <Sun className="w-5 h-5 text-[#1a3055]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#c9a227] mb-1 tracking-wider">Sun Warning</p>
                <p className="text-sm text-[#1a3055]/70">Strong sunlight may cause ink pigments to fade over time. Store prints away from direct light.</p>
              </div>
            </div>

            {/* Thunder Error */}
            <div className="flex items-start gap-4 p-5 border-4 border-[#d4553a] bg-[#d4553a]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#d4553a]" />
              <div className="w-10 h-10 bg-[#d4553a] flex items-center justify-center border-2 border-[#1a3055] shrink-0">
                <Zap className="w-5 h-5 text-[#f5f0e1]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#d4553a] mb-1 tracking-wider">Thunder Error</p>
                <p className="text-sm text-[#1a3055]/70">The printing block encountered an alignment issue. Registration marks need adjustment.</p>
              </div>
            </div>

            {/* Blossom Success */}
            <div className="flex items-start gap-4 p-5 border-4 border-[#e8a0b4] bg-[#e8a0b4]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#e8a0b4]" />
              <div className="w-10 h-10 bg-[#e8a0b4] flex items-center justify-center border-2 border-[#1a3055] shrink-0">
                <Flower2 className="w-5 h-5 text-[#1a3055]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#c4748e] mb-1 tracking-wider">Blossom Success</p>
                <p className="text-sm text-[#1a3055]/70">Your woodblock print has been successfully registered. Collection updated.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Dropdown */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-sm mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4 text-center">
            Selection Menu
          </p>
          <BrushHeading className="mb-10 text-center block mx-auto w-fit">選択</BrushHeading>
          <div className="relative">
            {/* Paper Lantern Frame */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#d4553a] border-2 border-[#1a3055] flex items-center justify-center z-10">
              <span className="text-[#f5f0e1] text-xs font-bold">灯</span>
            </div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-5 py-4 border-4 border-[#1a3055] bg-[#f5f0e1] text-sm font-bold flex items-center justify-between hover:border-[#d4553a] transition-colors shadow-[4px_4px_0px_#1a3055]"
            >
              <span className="truncate">{selectedPrint}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#d4553a] transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-0 bg-[#f5f0e1] border-4 border-t-0 border-[#1a3055] z-20 shadow-[4px_4px_0px_#1a3055]">
                {printSeries.map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-4 text-left text-sm hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-colors border-b-2 border-[#1a3055]/20 last:border-b-0 flex items-center gap-3"
                    onClick={() => {
                      setSelectedPrint(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="w-2 h-2 bg-[#d4553a] border border-[#1a3055]" />
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. Table */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Data Display
          </p>
          <BrushHeading className="mb-10">版画目録</BrushHeading>
          <div className="border-4 border-[#1a3055] overflow-hidden shadow-[6px_6px_0px_#1a3055]">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a3055] text-[#f5f0e1]">
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-widest border-r-2 border-[#f5f0e1]/20">TITLE</th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-widest border-r-2 border-[#f5f0e1]/20">ARTIST</th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-widest border-r-2 border-[#f5f0e1]/20">PERIOD</th>
                  <th className="px-5 py-4 text-left text-xs font-bold tracking-widest border-r-2 border-[#f5f0e1]/20">TECHNIQUE</th>
                  <th className="px-5 py-4 text-right text-xs font-bold tracking-widest">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: "The Great Wave", artist: "Hokusai", period: "1831", technique: "Nishiki-e", status: "Exhibited", statusColor: "text-[#2d6a4f]" },
                  { title: "Red Fuji", artist: "Hokusai", period: "1832", technique: "Nishiki-e", status: "Archived", statusColor: "text-[#1a3055]/50" },
                  { title: "Plum Garden", artist: "Hiroshige", period: "1857", technique: "Bokashi", status: "On Loan", statusColor: "text-[#d4553a]" },
                  { title: "Sudden Shower", artist: "Hiroshige", period: "1857", technique: "Aizuri-e", status: "Exhibited", statusColor: "text-[#2d6a4f]" },
                  { title: "Night Snow", artist: "Hiroshige", period: "1833", technique: "Nishiki-e", status: "Reserved", statusColor: "text-[#c9a227]" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b-4 border-[#1a3055]/20 last:border-b-0 hover:bg-[#c9a227]/10 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-bold border-r-2 border-[#1a3055]/10">{row.title}</td>
                    <td className="px-5 py-4 text-sm text-[#1a3055]/70 border-r-2 border-[#1a3055]/10">{row.artist}</td>
                    <td className="px-5 py-4 text-sm text-[#1a3055]/70 font-mono border-r-2 border-[#1a3055]/10">{row.period}</td>
                    <td className="px-5 py-4 text-sm text-[#1a3055]/70 border-r-2 border-[#1a3055]/10">{row.technique}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`text-xs font-bold tracking-widest ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. Blockquote (Haiku) */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Poetry
          </p>
          <BrushHeading className="mb-10">俳句</BrushHeading>
          <blockquote className="relative pl-8 md:pl-12">
            {/* Brush accent left border */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#d4553a]" />
            <div className="absolute left-1 top-2 bottom-2 w-1 bg-[#1a3055]" />

            <div className="space-y-2 mb-8">
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-[#1a3055]">
                An old silent pond
              </p>
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-[#1a3055]">
                A frog jumps into the pond
              </p>
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-[#1a3055]">
                Splash! Silence again.
              </p>
            </div>

            {/* Brush stroke divider */}
            <svg className="w-24 h-4 mb-4" viewBox="0 0 100 16">
              <path
                d="M0,8 Q25,2 50,8 T100,8"
                stroke="#1a3055"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <footer className="flex items-center gap-4">
              <HankoSeal text="芭" variant="circle" color="vermilion" size="sm" />
              <span className="text-sm text-[#1a3055]/60 font-bold tracking-wider">
                Matsuo Basho, 1686
              </span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 15. Wave Dividers Section */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Decorative Elements
          </p>
          <BrushHeading className="mb-10">青海波</BrushHeading>
          <div className="space-y-12">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Seigaiha - Indigo Waves
              </p>
              <WaveDivider color="#1a3055" count={12} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Vermilion Arcs
              </p>
              <WaveDivider color="#d4553a" count={12} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Gold Leaf Pattern
              </p>
              <WaveDivider color="#c9a227" count={12} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Brush Stroke Divider
              </p>
              <div className="relative h-4">
                <div className="absolute inset-x-0 top-1/2 h-1 bg-[#1a3055]" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-8 h-4 bg-[#d4553a] border-2 border-[#1a3055] flex items-center justify-center">
                  <span className="text-[#f5f0e1] text-[10px] font-bold">波</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Geometric Border
              </p>
              <div className="flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-4 ${i % 2 === 0 ? "bg-[#1a3055]" : "bg-[#f5f0e1]"} border-y-2 border-[#1a3055] first:border-l-2 last:border-r-2`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="border-b-4 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.5em] uppercase text-[#d4553a] mb-4">
            Style Guidelines
          </p>
          <BrushHeading className="mb-10">核心規則</BrushHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Required */}
            <WoodblockPanel borderColor="border-[#2d6a4f]" className="shadow-[6px_6px_0px_#1a3055]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#2d6a4f] flex items-center justify-center border-2 border-[#1a3055]">
                  <Check className="w-6 h-6 text-[#f5f0e1]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2d6a4f]">
                  Required Elements
                </h3>
              </div>
              <ul className="space-y-4 text-sm text-[#1a3055]/80">
                <li className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Thick outlines (border-2, border-4) emulating woodblock edges</span>
                </li>
                <li className="flex items-start gap-3">
                  <Palette className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Flat color fills without transparency or blending</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Traditional palette: indigo, vermilion, gold, ivory</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Hard-edge block shadows (shadow-[Xpx_Xpx_0px])</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Seigaiha wave motifs and natural imagery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Sharp corners (rounded-sm max) for print aesthetic</span>
                </li>
              </ul>
            </WoodblockPanel>

            {/* Forbidden */}
            <WoodblockPanel borderColor="border-[#d4553a]" className="shadow-[6px_6px_0px_#1a3055]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#d4553a] flex items-center justify-center border-2 border-[#1a3055]">
                  <X className="w-6 h-6 text-[#f5f0e1]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#d4553a]">
                  Forbidden Elements
                </h3>
              </div>
              <ul className="space-y-4 text-sm text-[#1a3055]/80">
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Gradients or color transitions (bg-gradient-*)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Drop shadows or soft glow effects</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Thin lines or hairline borders (border, border-[0.5px])</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Photorealistic imagery or textures</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Rounded corners (rounded-lg, rounded-full on containers)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Backdrop blur or glassmorphism effects</span>
                </li>
              </ul>
            </WoodblockPanel>
          </div>

          {/* Code Example */}
          <div className="mt-12 border-4 border-[#1a3055] bg-[#1a3055] p-6 shadow-[6px_6px_0px_#c9a227]">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a227] mb-4">
              Example Button Code
            </p>
            <pre className="text-sm text-[#f5f0e1] font-mono overflow-x-auto">
{`<button className="
  px-6 py-3
  bg-[#d4553a] text-[#f5f0e1]
  border-4 border-[#1a3055]
  font-bold tracking-wider
  shadow-[4px_4px_0px_#1a3055]
  hover:bg-[#1a3055]
  transition-all
">
  Action Button
</button>`}
            </pre>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="bg-[#1a3055] text-[#f5f0e1]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 bg-[#d4553a] border-2 border-[#f5f0e1] flex items-center justify-center text-sm font-bold">
                  浮
                </span>
                <span className="font-serif text-xl tracking-[0.2em]">浮世絵</span>
              </div>
              <p className="text-sm text-[#f5f0e1]/60 leading-relaxed">
                Traditional woodblock artistry reimagined for digital design. Bold outlines, flat colors, timeless beauty.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a227] mb-4">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/styles/ukiyo-e-digital" className="text-[#f5f0e1]/60 hover:text-[#f5f0e1] transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/styles" className="text-[#f5f0e1]/60 hover:text-[#f5f0e1] transition-colors">
                    All Styles
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-[#f5f0e1]/60 hover:text-[#f5f0e1] transition-colors">
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            {/* Seal */}
            <div className="flex md:justify-end">
              <div className="text-center">
                <HankoSeal text="版画" variant="circle" color="vermilion" size="lg" />
                <p className="text-xs text-[#f5f0e1]/40 mt-3 tracking-wider">AUTHENTIC STYLE</p>
              </div>
            </div>
          </div>

          <WaveDivider color="#f5f0e1" count={15} className="opacity-20 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#f5f0e1]/40">
              StyleKit / Ukiyo-e Digital Showcase
            </p>
            <Link
              href="/styles/ukiyo-e-digital"
              className="text-xs font-bold tracking-wider text-[#c9a227] hover:text-[#d4553a] transition-colors flex items-center gap-2"
            >
              View Full Documentation
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
