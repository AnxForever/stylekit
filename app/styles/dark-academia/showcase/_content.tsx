"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  BookOpen,
  Feather,
  GraduationCap,
  Flame,
  ChevronDown,
  Check,
  X,
  Info,
  Library,
  Bookmark,
  PenTool,
  ArrowLeft,
  Scroll,
  Clock,
  Star,
  Quote,
  Lamp,
  Award,
} from "lucide-react";

// LeatherPanel - Panel with leather texture border and embossed look
function LeatherPanel({
  children,
  className = "",
  variant = "light",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "green";
}) {
  const variants = {
    light: {
      bg: "bg-[#f5f0e1]",
      border: "border-[#8b7355]/40",
      shadow: "shadow-[inset_0_2px_4px_rgba(139,115,85,0.1),0_2px_8px_rgba(61,43,31,0.15)]",
    },
    dark: {
      bg: "bg-[#3d2b1f]",
      border: "border-[#8b7355]/50",
      shadow: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.3)]",
    },
    green: {
      bg: "bg-[#2d4a3e]",
      border: "border-[#2d4a3e]/60",
      shadow: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_4px_12px_rgba(45,74,62,0.3)]",
    },
  };
  const v = variants[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Corner embossed decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#8b7355]/60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8b7355]/60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#8b7355]/60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#8b7355]/60" />
      {/* Main panel */}
      <div className={`border-2 ${v.border} ${v.bg} ${v.shadow} p-6`}>
        {children}
      </div>
    </div>
  );
}

// WaxSealBadge - Circular wax seal with embossed effect
function WaxSealBadge({
  icon: Icon,
  color = "burgundy",
  size = "md",
}: {
  icon: React.ElementType;
  color?: "burgundy" | "brown" | "green" | "gold";
  size?: "sm" | "md" | "lg";
}) {
  const colors = {
    burgundy: "bg-[#722f37]",
    brown: "bg-[#3d2b1f]",
    green: "bg-[#2d4a3e]",
    gold: "bg-[#8b7355]",
  };
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  return (
    <div
      className={`${sizes[size]} ${colors[color]} rounded-full flex items-center justify-center shadow-[inset_0_3px_6px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)] border border-white/10`}
    >
      <Icon className={`${iconSizes[size]} text-[#f5f0e1]/90`} />
    </div>
  );
}

// BookSpineTab - Tab styled like a leather book spine
function BookSpineTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-4 font-serif text-sm tracking-widest uppercase transition-all duration-300 ${
        active
          ? "bg-[#3d2b1f] text-[#f5f0e1] shadow-[inset_0_-3px_0_#8b7355,0_4px_8px_rgba(0,0,0,0.2)]"
          : "bg-[#5c4033]/30 text-[#3d2b1f]/70 hover:bg-[#5c4033]/50 hover:text-[#3d2b1f]"
      }`}
    >
      {/* Gold leaf spine detail */}
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8b7355] via-[#c9a962] to-[#8b7355]" />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

// FleuronDivider - Decorative floral ornament divider
function FleuronDivider({ variant = "ornate" }: { variant?: "ornate" | "simple" | "diamond" | "scroll" }) {
  const ornaments = {
    ornate: (
      <div className="flex items-center justify-center gap-3">
        <hr className="flex-1 border-0 h-px bg-gradient-to-r from-transparent via-[#8b7355]/50 to-[#8b7355]/30" />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#8b7355]/40" />
          <Feather className="w-5 h-5 text-[#8b7355]/60" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#8b7355]/40" />
        </div>
        <hr className="flex-1 border-0 h-px bg-gradient-to-l from-transparent via-[#8b7355]/50 to-[#8b7355]/30" />
      </div>
    ),
    simple: (
      <div className="flex items-center justify-center">
        <hr className="w-full border-0 h-px bg-gradient-to-r from-transparent via-[#8b7355]/50 to-transparent" />
      </div>
    ),
    diamond: (
      <div className="flex items-center justify-center gap-2">
        <span className="w-1 h-1 rotate-45 bg-[#8b7355]/30" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#8b7355]/50" />
        <span className="w-2 h-2 rotate-45 bg-[#8b7355]" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#8b7355]/50" />
        <span className="w-1 h-1 rotate-45 bg-[#8b7355]/30" />
      </div>
    ),
    scroll: (
      <div className="flex items-center justify-center gap-4">
        <hr className="w-20 border-0 h-px bg-[#8b7355]/40" />
        <Scroll className="w-4 h-4 text-[#8b7355]/50" />
        <hr className="w-20 border-0 h-px bg-[#8b7355]/40" />
      </div>
    ),
  };

  return <div className="py-4">{ornaments[variant]}</div>;
}

// ReadingProgress - Amber-toned progress bar with page markers
function ReadingProgress({
  title,
  author,
  percent,
  totalPages,
}: {
  title: string;
  author: string;
  percent: number;
  totalPages: number;
}) {
  const currentPage = Math.floor((percent / 100) * totalPages);

  return (
    <div className="group">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-serif italic text-[#3d2b1f]">{title}</span>
        <span className="font-serif text-sm text-[#8b7355]">{author}</span>
      </div>
      <div className="relative h-3 bg-[#8b7355]/15 border border-[#8b7355]/30 overflow-hidden">
        {/* Progress fill with amber gradient */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8b7355] via-[#c9a962] to-[#8b7355] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
        {/* Page marker ticks */}
        {[25, 50, 75].map((mark) => (
          <div
            key={mark}
            className="absolute top-0 bottom-0 w-px bg-[#3d2b1f]/20"
            style={{ left: `${mark}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="font-serif text-xs text-[#8b7355]/70">Page {currentPage}</span>
        <span className="font-serif text-xs text-[#8b7355]/70">{totalPages} pages</span>
      </div>
    </div>
  );
}

// ManuscriptCard - Card with aged paper/manuscript appearance
function ManuscriptCard({
  children,
  className = "",
  showWatermark = false,
}: {
  children: React.ReactNode;
  className?: string;
  showWatermark?: boolean;
}) {
  return (
    <div
      className={`relative bg-gradient-to-br from-[#f5f0e1] via-[#efe8d6] to-[#e8dfc9] border border-[#8b7355]/30 shadow-[2px_2px_8px_rgba(61,43,31,0.15),-1px_-1px_4px_rgba(255,255,255,0.5)] ${className}`}
    >
      {/* Aged paper texture effect */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
      {/* Watermark */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Library className="w-32 h-32 text-[#3d2b1f]" />
        </div>
      )}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}

// CandleGlow - Animated candle flame effect
function CandleGlow() {
  return (
    <div className="relative w-8 h-12 flex flex-col items-center">
      {/* Flame */}
      <div className="w-3 h-5 bg-gradient-to-t from-[#ff9500] via-[#ffcc00] to-[#fff4b0] rounded-t-full animate-pulse" />
      {/* Candle body */}
      <div className="w-4 h-6 bg-gradient-to-b from-[#f5f0e1] to-[#e8dfc9] border border-[#8b7355]/30" />
      {/* Glow effect */}
      <div className="absolute top-0 w-8 h-8 bg-[#ffcc00]/20 rounded-full blur-md" />
    </div>
  );
}

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f0e1] relative overflow-hidden">
      {/* Parchment texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(61,43,31,0.15)_100%)]" />

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-double border-[#8b7355]/30 bg-[#f5f0e1]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/dark-academia"
            className="flex items-center gap-2 text-[#3d2b1f]/60 hover:text-[#3d2b1f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif tracking-wide text-sm">Return</span>
          </Link>
          <div className="flex items-center gap-3">
            <Library className="w-5 h-5 text-[#8b7355]" />
            <span className="font-serif text-xl text-[#3d2b1f] tracking-[0.15em] italic">
              Athenaeum
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#8b7355]/30 text-[#3d2b1f]/70 font-serif text-sm hover:border-[#8b7355]/60 hover:text-[#3d2b1f] transition-all"
          >
            Catalogus
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <CandleGlow />
          <CandleGlow />
        </div>
        <p className="text-xs font-serif tracking-[0.4em] uppercase text-[#8b7355] mb-4">
          Fiat Lux
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#3d2b1f] mb-6 tracking-wide leading-tight">
          The Pursuit of <span className="italic">Knowledge</span>
        </h1>
        <p className="text-lg text-[#3d2b1f]/60 max-w-2xl mx-auto mb-10 font-serif italic leading-relaxed">
          Within these hallowed halls, wisdom awaits those patient enough to seek it.
          Each weathered page holds centuries of thought, each margin note a conversation across time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#3d2b1f] border-2 border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#5c4033] hover:border-[#8b7355] transition-all duration-300 shadow-[0_4px_12px_rgba(61,43,31,0.3)]">
            <span className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              Enter the Library
            </span>
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-[#3d2b1f]/30 text-[#3d2b1f] font-serif tracking-widest text-sm uppercase hover:border-[#3d2b1f]/60 hover:bg-[#3d2b1f]/5 transition-all duration-300">
            <span className="flex items-center gap-3">
              <Scroll className="w-4 h-4" />
              Browse the Archive
            </span>
          </button>
        </div>
      </section>

      <FleuronDivider variant="ornate" />

      {/* 3. Color Palette */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Pigmentum
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            The Scholar&apos;s Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Mahogany", hex: "#3d2b1f", desc: "Leather & Wood" },
              { name: "Ink Green", hex: "#2d4a3e", desc: "Study Lamp" },
              { name: "Aged Gold", hex: "#8b7355", desc: "Gilt Edges" },
              { name: "Parchment", hex: "#f5f0e1", desc: "Ancient Paper" },
              { name: "Claret", hex: "#722f37", desc: "Wax Seal" },
            ].map((color) => (
              <ManuscriptCard key={color.name} className="overflow-hidden">
                <div
                  className="h-20 md:h-24 -m-6 mb-4"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="pt-2 border-t border-[#8b7355]/20">
                  <p className="font-serif text-sm text-[#3d2b1f] mb-0.5">{color.name}</p>
                  <p className="text-xs text-[#8b7355] font-mono">{color.hex}</p>
                  <p className="text-xs text-[#8b7355]/60 italic mt-1">{color.desc}</p>
                </div>
              </ManuscriptCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Litterae
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            The Art of Letters
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <LeatherPanel variant="light">
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">
                Classical Headings
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#3d2b1f] tracking-wide mb-4 leading-tight">
                Veritas <span className="italic">Lux</span> Mea
              </h3>
              <p className="text-sm text-[#8b7355]">
                font-serif | tracking-wide | warm earth tones
              </p>
            </LeatherPanel>
            <ManuscriptCard showWatermark>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">
                Manuscript Body
              </p>
              <p className="text-base leading-relaxed text-[#3d2b1f]/80 mb-4 first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#722f37] first-letter:font-bold">
                In the quiet sanctum of the reading room, words take on a weight beyond their letters.
                Each page turned reveals another layer of understanding, another connection to minds long departed.
              </p>
              <p className="text-sm text-[#8b7355]">
                first-letter drop cap | leading-relaxed | sepia tones
              </p>
            </ManuscriptCard>
          </div>
        </div>
      </section>

      <FleuronDivider variant="diamond" />

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Actiones
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Scholarly Controls
          </h2>
          <LeatherPanel variant="light">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">
                  Primary Actions
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-[#3d2b1f] border-2 border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#5c4033] transition-all shadow-md">
                    <span className="flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      Reserve Volume
                    </span>
                  </button>
                  <button className="px-6 py-3 bg-[#2d4a3e] border-2 border-[#2d4a3e]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#2d4a3e]/80 transition-all shadow-md">
                    <span className="flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      Compose
                    </span>
                  </button>
                  <button className="px-6 py-3 bg-[#722f37] border-2 border-[#722f37]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#722f37]/80 transition-all shadow-md">
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Submit Thesis
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">
                  Secondary Actions
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-transparent border-2 border-[#8b7355] text-[#3d2b1f] font-serif tracking-widest text-sm uppercase hover:bg-[#8b7355]/10 transition-all">
                    Outline
                  </button>
                  <button className="px-6 py-3 bg-transparent text-[#8b7355] font-serif tracking-widest text-sm uppercase hover:text-[#3d2b1f] transition-all underline underline-offset-4 decoration-[#8b7355]/30 hover:decoration-[#8b7355]">
                    Ghost Link
                  </button>
                </div>
              </div>
            </div>
          </LeatherPanel>
        </div>
      </section>

      {/* 6. Cards */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Collectio
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            The Rare Books Collection
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ManuscriptCard className="hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <WaxSealBadge icon={BookOpen} color="burgundy" size="md" />
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-[#3d2b1f] tracking-wide group-hover:text-[#722f37] transition-colors">
                    First Editions
                  </h3>
                  <p className="text-xs text-[#8b7355] italic">Est. 1847</p>
                </div>
              </div>
              <p className="font-serif text-sm text-[#3d2b1f]/60 leading-relaxed">
                Rare first printings preserved behind glass, each bearing the marks of their era.
              </p>
            </ManuscriptCard>

            <LeatherPanel variant="dark" className="hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <WaxSealBadge icon={Scroll} color="gold" size="md" />
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-[#f5f0e1] tracking-wide">
                    Manuscripts
                  </h3>
                  <p className="text-xs text-[#8b7355] italic">Medieval</p>
                </div>
              </div>
              <p className="font-serif text-sm text-[#f5f0e1]/60 leading-relaxed">
                Illuminated texts from monastic scriptoria, their gold leaf still catching the light.
              </p>
            </LeatherPanel>

            <LeatherPanel variant="green" className="hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <WaxSealBadge icon={GraduationCap} color="brown" size="md" />
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-[#f5f0e1] tracking-wide">
                    Dissertations
                  </h3>
                  <p className="text-xs text-[#8b7355] italic">Academic</p>
                </div>
              </div>
              <p className="font-serif text-sm text-[#f5f0e1]/60 leading-relaxed">
                Doctoral works spanning centuries of scholarly pursuit and intellectual achievement.
              </p>
            </LeatherPanel>
          </div>
        </div>
      </section>

      <FleuronDivider variant="scroll" />

      {/* 7. Form */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Epistula
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Correspondence
          </h2>
          <LeatherPanel variant="light">
            <div className="text-center mb-6">
              <WaxSealBadge icon={Feather} color="brown" size="lg" />
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-[0.2em] uppercase mb-2">
                  Addressee
                </label>
                <input
                  type="text"
                  placeholder="Your distinguished name..."
                  className="w-full px-4 py-3 bg-[#f5f0e1]/80 border-2 border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-[0.2em] uppercase mb-2">
                  Subject Matter
                </label>
                <input
                  type="text"
                  placeholder="Topic of inquiry..."
                  className="w-full px-4 py-3 bg-[#f5f0e1]/80 border-2 border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-[0.2em] uppercase mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Compose your thoughts with care..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#f5f0e1]/80 border-2 border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-[#3d2b1f] border-2 border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#5c4033] transition-all shadow-md">
                <span className="flex items-center justify-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Dispatch Letter
                </span>
              </button>
            </div>
          </LeatherPanel>
        </div>
      </section>

      {/* 8. Tabs - Book Spine Style */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Disciplinae
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Course of Study
          </h2>
          <div className="border-2 border-[#8b7355]/30 bg-[#f5f0e1]/50 shadow-lg">
            {/* Book spine tabs */}
            <div className="flex border-b-2 border-[#8b7355]/30">
              {["Philosophy", "Literature", "History"].map((tab, i) => (
                <BookSpineTab
                  key={tab}
                  label={tab}
                  active={activeTab === i}
                  onClick={() => setActiveTab(i)}
                />
              ))}
            </div>
            {/* Tab content */}
            <div className="p-8">
              {activeTab === 0 && (
                <ManuscriptCard showWatermark>
                  <div className="flex items-start gap-4 mb-4">
                    <Lamp className="w-8 h-8 text-[#8b7355]" />
                    <div>
                      <h4 className="font-serif text-xl text-[#3d2b1f] mb-2 tracking-wide">
                        On the Examined Life
                      </h4>
                      <p className="font-serif text-[#3d2b1f]/70 leading-relaxed">
                        From Socrates to Kierkegaard, the philosophical tradition compels us to question
                        what we presume to know. The unexamined life, as the ancients warned, is not worth
                        living - for it is through rigorous inquiry that we approach the truth of existence.
                      </p>
                    </div>
                  </div>
                </ManuscriptCard>
              )}
              {activeTab === 1 && (
                <ManuscriptCard showWatermark>
                  <div className="flex items-start gap-4 mb-4">
                    <Book className="w-8 h-8 text-[#8b7355]" />
                    <div>
                      <h4 className="font-serif text-xl text-[#3d2b1f] mb-2 tracking-wide">
                        The Canon of Letters
                      </h4>
                      <p className="font-serif text-[#3d2b1f]/70 leading-relaxed">
                        From Homer&apos;s epics to the modernist novels of Woolf and Joyce, literature serves
                        as the mirror of human experience. Each era&apos;s great works capture something
                        ineffable about the spirit of their time, preserving emotion in amber.
                      </p>
                    </div>
                  </div>
                </ManuscriptCard>
              )}
              {activeTab === 2 && (
                <ManuscriptCard showWatermark>
                  <div className="flex items-start gap-4 mb-4">
                    <Clock className="w-8 h-8 text-[#8b7355]" />
                    <div>
                      <h4 className="font-serif text-xl text-[#3d2b1f] mb-2 tracking-wide">
                        Lessons of Antiquity
                      </h4>
                      <p className="font-serif text-[#3d2b1f]/70 leading-relaxed">
                        The rise and fall of empires, the quiet revolutions of thought, the slow accumulation
                        of culture across centuries - history teaches us that nothing is truly new, only
                        rediscovered. To study the past is to possess the key to understanding the present.
                      </p>
                    </div>
                  </div>
                </ManuscriptCard>
              )}
            </div>
          </div>
        </div>
      </section>

      <FleuronDivider variant="ornate" />

      {/* 9. Wax Seal Badges */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Insignia
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Seals &amp; Distinctions
          </h2>
          <div className="space-y-10">
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-6 text-center">
                Wax Seals
              </p>
              <div className="flex flex-wrap gap-8 items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <WaxSealBadge icon={Library} color="burgundy" size="lg" />
                  <span className="font-serif text-xs text-[#8b7355]">Bibliothecae</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <WaxSealBadge icon={GraduationCap} color="brown" size="lg" />
                  <span className="font-serif text-xs text-[#8b7355]">Academia</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <WaxSealBadge icon={Flame} color="gold" size="lg" />
                  <span className="font-serif text-xs text-[#8b7355]">Illuminatio</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <WaxSealBadge icon={Star} color="green" size="lg" />
                  <span className="font-serif text-xs text-[#8b7355]">Excellentia</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4 text-center">
                Book Labels
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-5 py-2 bg-[#3d2b1f] text-[#f5f0e1] font-serif text-xs tracking-widest uppercase border-2 border-[#8b7355]/40 shadow-md">
                  First Edition
                </span>
                <span className="px-5 py-2 bg-[#722f37] text-[#f5f0e1] font-serif text-xs tracking-widest uppercase border-2 border-[#722f37]/40 shadow-md">
                  Rare Volume
                </span>
                <span className="px-5 py-2 border-2 border-[#8b7355] text-[#3d2b1f] font-serif text-xs tracking-widest uppercase">
                  Manuscript
                </span>
                <span className="px-5 py-2 bg-[#2d4a3e] text-[#f5f0e1] font-serif text-xs tracking-widest uppercase border-2 border-[#2d4a3e]/40 shadow-md">
                  Annotated
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4 text-center">
                Quill Badges
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b7355]/10 border-2 border-[#8b7355]/30 text-[#3d2b1f] font-serif text-xs tracking-wide">
                  <Feather className="w-3.5 h-3.5 text-[#8b7355]" />
                  Scholar
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d4a3e]/10 border-2 border-[#2d4a3e]/30 text-[#3d2b1f] font-serif text-xs tracking-wide">
                  <BookOpen className="w-3.5 h-3.5 text-[#2d4a3e]" />
                  Reader
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#722f37]/10 border-2 border-[#722f37]/30 text-[#3d2b1f] font-serif text-xs tracking-wide">
                  <PenTool className="w-3.5 h-3.5 text-[#722f37]" />
                  Author
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Progressio
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Reading Progress
          </h2>
          <LeatherPanel variant="light">
            <div className="space-y-8">
              <ReadingProgress
                title="The Republic"
                author="Plato"
                percent={82}
                totalPages={416}
              />
              <ReadingProgress
                title="Meditations"
                author="Marcus Aurelius"
                percent={45}
                totalPages={192}
              />
              <ReadingProgress
                title="Thus Spoke Zarathustra"
                author="Nietzsche"
                percent={91}
                totalPages={352}
              />
              <ReadingProgress
                title="Being and Time"
                author="Heidegger"
                percent={23}
                totalPages={589}
              />
            </div>
          </LeatherPanel>
        </div>
      </section>

      <FleuronDivider variant="simple" />

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Notitiae
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Scholarly Notices
          </h2>
          <div className="space-y-4">
            {/* Parchment Note - Info */}
            <ManuscriptCard className="flex items-start gap-4">
              <div className="p-2 bg-[#8b7355]/20 border border-[#8b7355]/40">
                <Info className="w-5 h-5 text-[#8b7355]" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#3d2b1f] mb-1">Parchment Note</p>
                <p className="font-serif text-sm text-[#3d2b1f]/60">
                  The library reading room will observe extended hours during examination period. Silent contemplation is expected.
                </p>
              </div>
            </ManuscriptCard>

            {/* Candle Warning */}
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-[#8b7355]/15 to-[#c9a962]/10 border-2 border-[#8b7355]/40 border-l-4 border-l-[#c9a962]">
              <Flame className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#3d2b1f] mb-1">Candle Warning</p>
                <p className="font-serif text-sm text-[#3d2b1f]/60">
                  Please ensure all candles are properly extinguished before departing the reading chamber.
                </p>
              </div>
            </div>

            {/* Ink-Blot Error */}
            <div className="flex items-start gap-4 p-5 bg-[#3d2b1f] border-2 border-[#3d2b1f] shadow-lg">
              <X className="w-5 h-5 text-[#722f37] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#f5f0e1] mb-1">Ink-Blot Error</p>
                <p className="font-serif text-sm text-[#f5f0e1]/60">
                  The requested manuscript has suffered water damage and is unavailable for consultation until restoration is complete.
                </p>
              </div>
            </div>

            {/* Laurel Success */}
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-[#2d4a3e]/15 to-[#2d4a3e]/5 border-2 border-[#2d4a3e]/40 border-l-4 border-l-[#2d4a3e]">
              <Check className="w-5 h-5 text-[#2d4a3e] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#3d2b1f] mb-1">Laurel Success</p>
                <p className="font-serif text-sm text-[#3d2b1f]/60">
                  Your thesis has been accepted into the permanent archive. Congratulations, distinguished scholar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Dropdown */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-sm mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Index
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Chapter Selection
          </h2>
          <LeatherPanel variant="light">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-4 border-2 border-[#8b7355]/40 bg-[#f5f0e1]/80 font-serif text-sm text-[#3d2b1f] hover:border-[#8b7355] transition-all"
              >
                <span className={selectedChapter ? "" : "italic text-[#8b7355]/60"}>
                  {selectedChapter || "Select a Chapter..."}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8b7355] transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 border-2 border-[#8b7355]/40 bg-[#f5f0e1] z-20 shadow-xl">
                  {[
                    "I. De Natura Rerum",
                    "II. On Virtue and Reason",
                    "III. The Aesthetic Ideal",
                    "IV. Mortality and Memory",
                    "V. The Examined Life",
                    "VI. Amor Fati",
                  ].map((chapter, i) => (
                    <button
                      key={chapter}
                      className="w-full px-5 py-3 text-left font-serif text-sm text-[#3d2b1f]/70 hover:text-[#3d2b1f] hover:bg-[#8b7355]/15 transition-all border-b border-[#8b7355]/15 last:border-b-0 flex items-center gap-3"
                      onClick={() => {
                        setSelectedChapter(chapter);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#8b7355]/50" />
                      {chapter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </LeatherPanel>
        </div>
      </section>

      {/* 13. Table */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Registrum
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Academic Records
          </h2>
          <div className="border-4 border-double border-[#3d2b1f]/40 overflow-hidden shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-[#3d2b1f] text-[#f5f0e1]">
                  <th className="px-5 py-4 text-left font-serif text-xs tracking-widest uppercase font-normal border-r border-[#8b7355]/30">
                    Subject
                  </th>
                  <th className="px-5 py-4 text-left font-serif text-xs tracking-widest uppercase font-normal border-r border-[#8b7355]/30">
                    Tutor
                  </th>
                  <th className="px-5 py-4 text-center font-serif text-xs tracking-widest uppercase font-normal border-r border-[#8b7355]/30">
                    Term
                  </th>
                  <th className="px-5 py-4 text-right font-serif text-xs tracking-widest uppercase font-normal">
                    Mark
                  </th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm bg-[#f5f0e1]">
                <tr className="border-b-2 border-[#8b7355]/20 hover:bg-[#8b7355]/10 transition-colors">
                  <td className="px-5 py-4 text-[#3d2b1f] italic border-r border-[#8b7355]/10">
                    Classical Philosophy
                  </td>
                  <td className="px-5 py-4 text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Prof. Hargreaves
                  </td>
                  <td className="px-5 py-4 text-center text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Michaelmas
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-3 py-1 bg-[#2d4a3e]/15 text-[#2d4a3e] text-xs tracking-wide">
                      Distinction
                    </span>
                  </td>
                </tr>
                <tr className="border-b-2 border-[#8b7355]/20 hover:bg-[#8b7355]/10 transition-colors">
                  <td className="px-5 py-4 text-[#3d2b1f] italic border-r border-[#8b7355]/10">
                    Renaissance Literature
                  </td>
                  <td className="px-5 py-4 text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Dr. Whitmore
                  </td>
                  <td className="px-5 py-4 text-center text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Hilary
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-3 py-1 bg-[#8b7355]/15 text-[#8b7355] text-xs tracking-wide">
                      Merit
                    </span>
                  </td>
                </tr>
                <tr className="border-b-2 border-[#8b7355]/20 hover:bg-[#8b7355]/10 transition-colors">
                  <td className="px-5 py-4 text-[#3d2b1f] italic border-r border-[#8b7355]/10">
                    Ancient History
                  </td>
                  <td className="px-5 py-4 text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Prof. Ashworth
                  </td>
                  <td className="px-5 py-4 text-center text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Trinity
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-3 py-1 bg-[#2d4a3e]/15 text-[#2d4a3e] text-xs tracking-wide">
                      Distinction
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-[#8b7355]/10 transition-colors">
                  <td className="px-5 py-4 text-[#3d2b1f] italic border-r border-[#8b7355]/10">
                    Metaphysics
                  </td>
                  <td className="px-5 py-4 text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Dr. Pemberton
                  </td>
                  <td className="px-5 py-4 text-center text-[#3d2b1f]/60 border-r border-[#8b7355]/10">
                    Long Vacation
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-3 py-1 bg-[#722f37]/15 text-[#722f37] text-xs tracking-wide">
                      Summa Cum Laude
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FleuronDivider variant="diamond" />

      {/* 14. Blockquote */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Quote className="w-12 h-12 text-[#8b7355]/30" />
          </div>
          <blockquote className="mb-8">
            <p className="font-serif text-3xl md:text-4xl italic text-[#3d2b1f] leading-relaxed tracking-wide">
              &ldquo;Cogito, ergo sum.&rdquo;
            </p>
            <p className="font-serif text-lg text-[#3d2b1f]/50 mt-4 italic">
              I think, therefore I am.
            </p>
          </blockquote>
          <footer className="flex flex-col items-center gap-4">
            <WaxSealBadge icon={Feather} color="burgundy" size="sm" />
            <div>
              <p className="font-serif text-sm text-[#8b7355] tracking-widest uppercase">
                Rene Descartes
              </p>
              <p className="font-serif text-xs text-[#8b7355]/60 italic mt-1">
                Meditationes de Prima Philosophia, 1641
              </p>
            </div>
          </footer>
        </div>
      </section>

      {/* 15. Chapter Dividers */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Ornamenta
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Chapter Dividers
          </h2>
          <LeatherPanel variant="light">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-serif text-[#8b7355]/60 text-center mb-4">Ornate Fleuron</p>
                <FleuronDivider variant="ornate" />
              </div>
              <div>
                <p className="text-xs font-serif text-[#8b7355]/60 text-center mb-4">Simple Gradient</p>
                <FleuronDivider variant="simple" />
              </div>
              <div>
                <p className="text-xs font-serif text-[#8b7355]/60 text-center mb-4">Diamond Pattern</p>
                <FleuronDivider variant="diamond" />
              </div>
              <div>
                <p className="text-xs font-serif text-[#8b7355]/60 text-center mb-4">Scroll Icon</p>
                <FleuronDivider variant="scroll" />
              </div>
              <div>
                <p className="text-xs font-serif text-[#8b7355]/60 text-center mb-4">Classical Asterism</p>
                <div className="text-center font-serif text-[#8b7355]/60 text-2xl tracking-[1em]">
                  * * *
                </div>
              </div>
            </div>
          </LeatherPanel>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-double border-[#8b7355]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">
            Lex Stili
          </p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">
            Design Canon
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <LeatherPanel variant="green">
              <h3 className="font-serif text-lg text-[#f5f0e1] mb-6 tracking-wide flex items-center gap-3">
                <Check className="w-5 h-5" />
                Required Elements
              </h3>
              <ul className="font-serif text-sm text-[#f5f0e1]/80 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#c9a962]" />
                  <span>Serif typography for all headings (font-serif)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#c9a962]" />
                  <span>Muted earth tones: browns, greens, ambers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#c9a962]" />
                  <span>Classical ornaments and fleuron dividers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#c9a962]" />
                  <span>Warm amber and gold accent highlights</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#c9a962]" />
                  <span>Leather and aged parchment texture feel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#c9a962]" />
                  <span>Double borders and embossed corners</span>
                </li>
              </ul>
            </LeatherPanel>

            <div className="p-6 border-4 border-double border-[#722f37]/40 bg-[#722f37]/5">
              <h3 className="font-serif text-lg text-[#722f37] mb-6 tracking-wide flex items-center gap-3">
                <X className="w-5 h-5" />
                Forbidden Elements
              </h3>
              <ul className="font-serif text-sm text-[#3d2b1f]/70 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#722f37]" />
                  <span>Neon or saturated fluorescent colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#722f37]" />
                  <span>Monospace or sans-serif for headings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#722f37]" />
                  <span>Rounded corners (border-radius)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#722f37]" />
                  <span>Bright whites or sterile backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#722f37]" />
                  <span>Modern minimalism (clean-tech aesthetic)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rotate-45 bg-[#722f37]" />
                  <span>Glowing shadows or neon effects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FleuronDivider variant="ornate" />

      {/* 17. Footer */}
      <footer className="relative z-10 py-10 px-6 border-t-2 border-double border-[#8b7355]/30 bg-[#3d2b1f]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <WaxSealBadge icon={Library} color="gold" size="sm" />
              <div>
                <p className="text-[#f5f0e1]/60 text-sm font-serif">
                  Dark Academia Showcase
                </p>
                <p className="text-[#8b7355] text-xs font-serif italic">
                  Part of{" "}
                  <Link href="/" className="text-[#f5f0e1]/80 hover:text-[#f5f0e1] transition-colors">
                    StyleKit
                  </Link>
                </p>
              </div>
            </div>
            <div className="font-serif text-sm text-[#8b7355]/60 italic text-center">
              &ldquo;Scientia potentia est&rdquo; - Knowledge is power
            </div>
            <Link
              href="/styles/dark-academia"
              className="flex items-center gap-2 text-sm font-serif text-[#f5f0e1]/70 hover:text-[#f5f0e1] transition-colors tracking-wide"
            >
              <BookOpen className="w-4 h-4" />
              View Full Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
