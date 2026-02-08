"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flower2,
  Leaf,
  Sun,
  Heart,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  TreePine,
  Sprout,
  Cherry,
  Home,
  Scissors,
  Cookie,
  Droplets,
  Wind,
  CloudSun,
} from "lucide-react";

// Garden Panel - Soft rounded panel with botanical corner accents
function GardenPanel({
  children,
  className = "",
  variant = "sage",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "sage" | "rose" | "honey" | "cream";
}) {
  const variants = {
    sage: {
      border: "border-[#5a8f5a]/30",
      bg: "bg-[#5a8f5a]/5",
      corner: "bg-[#5a8f5a]",
    },
    rose: {
      border: "border-[#d4a0a0]/40",
      bg: "bg-[#d4a0a0]/5",
      corner: "bg-[#d4a0a0]",
    },
    honey: {
      border: "border-[#f5d75f]/50",
      bg: "bg-[#f5d75f]/10",
      corner: "bg-[#f5d75f]",
    },
    cream: {
      border: "border-[#8b7355]/20",
      bg: "bg-[#faf6f0]",
      corner: "bg-[#8b7355]",
    },
  };
  const v = variants[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Leaf corner decorations */}
      <div className={`absolute -top-1 -left-1 w-3 h-3 ${v.corner} rounded-full opacity-40`} />
      <div className={`absolute -top-1 -right-1 w-2 h-2 ${v.corner} rounded-full opacity-30`} />
      <div className={`absolute -bottom-1 -left-1 w-2 h-2 ${v.corner} rounded-full opacity-30`} />
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${v.corner} rounded-full opacity-40`} />
      {/* Main panel */}
      <div className={`border ${v.border} ${v.bg} rounded-2xl p-5 md:p-6`}>
        {children}
      </div>
    </div>
  );
}

// Botanical Badge - Circular pressed flower style
function BotanicalBadge({
  children,
  icon: Icon,
  variant = "sage",
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
  variant?: "sage" | "rose" | "honey" | "lavender";
}) {
  const variants = {
    sage: "bg-[#5a8f5a]/15 text-[#5a8f5a] border-[#5a8f5a]/30",
    rose: "bg-[#d4a0a0]/15 text-[#d4a0a0] border-[#d4a0a0]/30",
    honey: "bg-[#f5d75f]/20 text-[#8b7355] border-[#f5d75f]/40",
    lavender: "bg-[#9b7bb8]/15 text-[#9b7bb8] border-[#9b7bb8]/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 ${variants[variant]} border font-serif text-sm rounded-full`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

// Seed Packet Tag - Vintage seed packet label
function SeedPacketTag({
  children,
  season,
}: {
  children: React.ReactNode;
  season?: string;
}) {
  return (
    <span className="inline-flex flex-col items-center px-4 py-2 bg-[#faf6f0] border-2 border-[#8b7355]/40 text-[#8b7355] font-serif text-sm rounded-lg shadow-sm relative">
      {season && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-[#faf6f0] text-[10px] text-[#5a8f5a] uppercase tracking-wider">
          {season}
        </span>
      )}
      {children}
    </span>
  );
}

// Mason Jar Progress - Progress bar styled like jar fill level
function MasonJarProgress({
  label,
  percentage,
  color = "honey",
}: {
  label: string;
  percentage: number;
  color?: "honey" | "rose" | "sage" | "berry";
}) {
  const colors = {
    honey: { fill: "bg-[#f5d75f]", track: "bg-[#f5d75f]/15", lid: "bg-[#8b7355]" },
    rose: { fill: "bg-[#d4a0a0]", track: "bg-[#d4a0a0]/15", lid: "bg-[#8b6b6b]" },
    sage: { fill: "bg-[#5a8f5a]", track: "bg-[#5a8f5a]/15", lid: "bg-[#4a6a4a]" },
    berry: { fill: "bg-[#8b5a8b]", track: "bg-[#8b5a8b]/15", lid: "bg-[#6b4a6b]" },
  };
  const c = colors[color];

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex justify-between font-serif text-sm text-[#8b7355] mb-2">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
        <div className="relative">
          {/* Jar shape */}
          <div className={`h-6 ${c.track} rounded-b-xl rounded-t-sm overflow-hidden border-2 border-[#8b7355]/20 relative`}>
            {/* Lid */}
            <div className={`absolute -top-0.5 left-1/4 right-1/4 h-1.5 ${c.lid} rounded-t`} />
            {/* Fill level */}
            <div
              className={`absolute bottom-0 left-0 right-0 ${c.fill} transition-all duration-500`}
              style={{ height: `${percentage}%` }}
            />
            {/* Glass shine */}
            <div className="absolute top-0 left-1 bottom-0 w-1 bg-white/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Cross-Stitch Divider - Handcraft pattern separator
function CrossStitchDivider({ pattern = "flower" }: { pattern?: "flower" | "vine" | "dots" }) {
  if (pattern === "flower") {
    return (
      <div className="flex items-center justify-center gap-2 py-6">
        <span className="w-12 h-px bg-[#d4a0a0]/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#5a8f5a]/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4a0a0]/50" />
        <Flower2 className="w-4 h-4 text-[#d4a0a0]/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4a0a0]/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#5a8f5a]/40" />
        <span className="w-12 h-px bg-[#d4a0a0]/40" />
      </div>
    );
  }

  if (pattern === "vine") {
    return (
      <div className="flex items-center justify-center gap-3 py-6">
        <span className="w-2 h-2 rounded-full bg-[#5a8f5a]/30" />
        <span className="w-16 h-px bg-[#5a8f5a]/30" />
        <Leaf className="w-4 h-4 text-[#5a8f5a]/40 rotate-45" />
        <span className="w-16 h-px bg-[#5a8f5a]/30" />
        <span className="w-2 h-2 rounded-full bg-[#5a8f5a]/30" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      {Array.from({ length: 15 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i % 3 === 0 ? "bg-[#d4a0a0]/50" : i % 3 === 1 ? "bg-[#5a8f5a]/40" : "bg-[#f5d75f]/50"
          }`}
        />
      ))}
    </div>
  );
}

// Leaf Card - Card with botanical border decoration
function LeafCard({
  children,
  title,
  icon: Icon,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Vine border decoration */}
      <div className="absolute -top-2 left-4 right-4 h-1 flex items-center justify-center gap-2">
        <span className="w-6 h-px bg-[#5a8f5a]/30" />
        <Leaf className="w-3 h-3 text-[#5a8f5a]/40 group-hover:text-[#5a8f5a]/60 transition-colors" />
        <span className="w-6 h-px bg-[#5a8f5a]/30" />
      </div>
      <div className="p-6 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 bg-gradient-to-br from-[#5a8f5a]/20 to-[#d4a0a0]/20 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-[#5a8f5a]" />
        </div>
        <h3 className="text-xl font-serif text-[#8b7355] mb-2">{title}</h3>
        <p className="text-[#8b7355]/60 font-serif text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// Garden Journal Quote ornament
function JournalOrnament() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Leaf className="w-4 h-4 text-[#5a8f5a]/50 -rotate-45" />
      <span className="w-8 h-px bg-[#8b7355]/30" />
      <Flower2 className="w-4 h-4 text-[#d4a0a0]/50" />
      <span className="w-8 h-px bg-[#8b7355]/30" />
      <Leaf className="w-4 h-4 text-[#5a8f5a]/50 rotate-45" />
    </div>
  );
}

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState("Choose a Flower");

  const tabContent = [
    {
      icon: Sprout,
      title: "Garden",
      description:
        "The garden path winds through foxgloves and sweet peas. Morning dew still glistens on the herbs, and the bees have begun their gentle work among the lavender. A wicker basket waits beneath the rose arbor, ready to be filled with the day's harvest.",
    },
    {
      icon: Cookie,
      title: "Kitchen",
      description:
        "The kitchen smells of fresh sourdough and simmering berry jam. Copper pots hang above a worn wooden counter, and a jar of wildflower honey catches the afternoon light through the window. The kettle whistles softly, calling us to tea.",
    },
    {
      icon: Scissors,
      title: "Craft",
      description:
        "Needles and thread rest beside a half-finished embroidery hoop. Skeins of yarn in sage and rose fill a wicker basket, and a linen sampler hangs on the wall -- proof that slow work creates lasting beauty.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6f0] via-[#f5d75f]/5 to-[#d4a0a0]/10 text-[#8b7355]">
      {/* Linen Texture Overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%238b7355' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Navigation */}
      <nav className="border-b border-[#d4a0a0]/30 bg-[#faf6f0]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/styles/cottagecore"
            className="flex items-center gap-2 text-[#5a8f5a] hover:text-[#5a8f5a]/80 transition-colors"
          >
            <Leaf className="w-5 h-5" />
            <span className="font-serif">Back to Garden</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <span className="font-serif text-sm text-[#8b7355]/60 hover:text-[#8b7355] transition-colors cursor-pointer">
              Recipes
            </span>
            <span className="font-serif text-sm text-[#8b7355]/60 hover:text-[#8b7355] transition-colors cursor-pointer">
              Garden
            </span>
            <span className="font-serif text-sm text-[#8b7355]/60 hover:text-[#8b7355] transition-colors cursor-pointer">
              Crafts
            </span>
          </div>
          <Link
            href="/styles"
            className="px-5 py-2 border border-[#d4a0a0]/40 text-[#8b7355] font-serif rounded-full shadow-sm hover:bg-[#d4a0a0]/10 hover:shadow-md transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6 text-center relative overflow-hidden">
        {/* Background botanical illustrations */}
        <div className="absolute top-10 left-10 opacity-10">
          <Flower2 className="w-24 h-24 text-[#d4a0a0]" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Leaf className="w-20 h-20 text-[#5a8f5a] rotate-45" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4a0a0]/30 to-[#f5d75f]/30 rounded-full flex items-center justify-center">
              <Flower2 className="w-8 h-8 text-[#d4a0a0]" />
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#8b7355] mb-6 leading-tight">
            Cottagecore
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#8b7355]/70 max-w-xl mx-auto mb-10 leading-relaxed">
            A simpler life among wildflowers and warm hearths -- where every
            detail whispers of meadows, honey, and handmade things.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-[#5a8f5a] text-white font-serif rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Flower2 className="w-5 h-5" />
              Gather Flowers
            </button>
            <button className="px-10 py-4 border-2 border-[#8b7355]/40 text-[#8b7355] font-serif rounded-full hover:bg-[#8b7355]/10 hover:border-[#8b7355]/60 transition-all duration-300 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Explore Cottage
            </button>
          </div>
        </div>
      </section>

      <CrossStitchDivider pattern="flower" />

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Color Palette
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Warm earth tones gathered from the garden
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Sage Green", hex: "#5a8f5a", bg: "bg-[#5a8f5a]", text: "text-white" },
              { name: "Daisy Yellow", hex: "#f5d75f", bg: "bg-[#f5d75f]", text: "text-[#8b7355]" },
              { name: "Earth Brown", hex: "#8b7355", bg: "bg-[#8b7355]", text: "text-white" },
              { name: "Dusty Rose", hex: "#d4a0a0", bg: "bg-[#d4a0a0]", text: "text-white" },
              { name: "Warm Cream", hex: "#faf6f0", bg: "bg-[#faf6f0]", text: "text-[#8b7355]" },
            ].map((color) => (
              <div
                key={color.name}
                className="border border-[#d4a0a0]/30 bg-white/60 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4">
                  <p className="font-serif text-sm text-[#8b7355]">{color.name}</p>
                  <p className="text-xs text-[#8b7355]/60 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Extended palette */}
          <div className="mt-6 grid grid-cols-4 md:grid-cols-8 gap-3">
            {[
              { name: "Lavender", hex: "#9b7bb8" },
              { name: "Berry", hex: "#8b5a8b" },
              { name: "Terracotta", hex: "#c67b5c" },
              { name: "Wheat", hex: "#e8d4a8" },
              { name: "Butter", hex: "#f5e6a3" },
              { name: "Moss", hex: "#4a6a4a" },
              { name: "Fawn", hex: "#c4a77d" },
              { name: "Blush", hex: "#e8c4c4" },
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div
                  className="w-full aspect-square rounded-full border-2 border-white shadow-sm mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-serif text-xs text-[#8b7355]/70">{color.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Typography
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Handwritten warmth meets gentle reading
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <GardenPanel variant="rose">
              <p className="text-xs font-serif text-[#d4a0a0] uppercase tracking-widest mb-4">
                Handwritten Headings
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#8b7355] mb-4 leading-snug italic">
                A Quiet Morning in the Garden
              </h3>
              <p className="text-sm text-[#8b7355]/50 font-serif">
                font-serif italic -- warm, organic, hand-lettered feel
              </p>
            </GardenPanel>
            <GardenPanel variant="sage">
              <p className="text-xs font-serif text-[#5a8f5a] uppercase tracking-widest mb-4">
                Garden Journal Text
              </p>
              <p className="font-serif text-base md:text-lg text-[#8b7355]/80 leading-relaxed mb-4">
                The garden journal rests on a sun-warmed windowsill. Its pages hold
                pressed petals and notes on which seeds to sow when the frost has passed.
              </p>
              <p className="text-sm text-[#8b7355]/50 font-serif">
                font-serif -- leading-relaxed -- readable warmth
              </p>
            </GardenPanel>
          </div>
          {/* Typography comparison */}
          <div className="mt-8 p-6 bg-[#faf6f0] border border-[#8b7355]/20 rounded-2xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-serif text-4xl text-[#8b7355] mb-2">Aa</p>
                <p className="font-serif text-sm text-[#8b7355]/60">Serif Primary</p>
              </div>
              <div>
                <p className="font-serif italic text-4xl text-[#8b7355] mb-2">Aa</p>
                <p className="font-serif text-sm text-[#8b7355]/60">Serif Italic</p>
              </div>
              <div>
                <p className="text-4xl text-[#8b7355] mb-2" style={{ fontFamily: "cursive" }}>
                  Aa
                </p>
                <p className="font-serif text-sm text-[#8b7355]/60">Decorative Script</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CrossStitchDivider pattern="vine" />

      {/* Buttons */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Buttons
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Soft, rounded, and inviting -- like a warm welcome
          </p>
          <GardenPanel variant="cream">
            <div className="space-y-6">
              <div>
                <p className="font-serif text-xs text-[#5a8f5a] uppercase tracking-wider mb-4">
                  Primary Actions
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="px-6 py-3 bg-[#5a8f5a] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                    <Flower2 className="w-4 h-4" />
                    Plant Seeds
                  </button>
                  <button className="px-6 py-3 bg-[#d4a0a0] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Save Recipe
                  </button>
                  <button className="px-6 py-3 bg-[#8b7355] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                    <Cookie className="w-4 h-4" />
                    Bake Now
                  </button>
                </div>
              </div>
              <div>
                <p className="font-serif text-xs text-[#d4a0a0] uppercase tracking-wider mb-4">
                  Secondary Actions
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="px-6 py-3 bg-[#faf6f0] text-[#8b7355] border border-[#8b7355]/30 font-serif rounded-full hover:bg-[#f5d75f]/20 transition-all">
                    Browse Garden
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 border-[#d4a0a0]/60 text-[#d4a0a0] font-serif rounded-full hover:bg-[#d4a0a0]/10 transition-all">
                    View Crafts
                  </button>
                  <button className="px-6 py-3 bg-transparent text-[#5a8f5a] font-serif rounded-full hover:bg-[#5a8f5a]/10 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </GardenPanel>
        </div>
      </section>

      {/* Cards with Leaf decoration */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Cards
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Stories from hearth and garden
          </p>
          <div className="grid md:grid-cols-3 gap-8 pt-4">
            <LeafCard title="Wildflower Meadow" icon={Flower2}>
              Where daisies and lavender dance in the breeze beside a mossy stone wall.
              Each bloom tells a story of patient seasons.
            </LeafCard>
            <LeafCard title="Country Kitchen" icon={Cookie}>
              Warm bread cooling on the sill, honey dripping from a wooden spoon.
              The heart of the cottage beats here.
            </LeafCard>
            <LeafCard title="Handmade Crafts" icon={Scissors}>
              Knitted blankets and embroidered linens tell stories of patient hands
              and quiet afternoons by the fire.
            </LeafCard>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Garden Letter
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Send a note to a dear friend
          </p>
          <GardenPanel variant="rose" className="mt-4">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#5a8f5a]/20 to-[#d4a0a0]/20 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-7 h-7 text-[#d4a0a0]" />
              </div>
              <h3 className="text-xl font-serif text-[#8b7355]">Write a Letter</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-serif text-[#5a8f5a] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Dear friend..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#8b7355]/25 rounded-xl text-[#8b7355] placeholder-[#8b7355]/40 font-serif focus:border-[#5a8f5a]/60 focus:outline-none focus:ring-2 focus:ring-[#5a8f5a]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-serif text-[#d4a0a0] mb-2">
                  Your Message
                </label>
                <textarea
                  placeholder="Thinking of you as I tend the garden..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/80 border border-[#d4a0a0]/30 rounded-xl text-[#8b7355] placeholder-[#d4a0a0]/50 font-serif focus:border-[#d4a0a0]/60 focus:outline-none focus:ring-2 focus:ring-[#d4a0a0]/20 resize-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#5a8f5a] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Send with Love
              </button>
            </div>
          </GardenPanel>
        </div>
      </section>

      <CrossStitchDivider pattern="dots" />

      {/* Tabs - Botanical Illustration Style */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Cottage Corners
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Explore the heart of cottage life
          </p>
          <div className="border border-[#d4a0a0]/30 rounded-2xl overflow-hidden bg-[#faf6f0] shadow-sm">
            <div className="flex border-b border-[#d4a0a0]/30">
              {tabContent.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.title}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-4 font-serif text-sm md:text-base transition-all flex items-center justify-center gap-2 ${
                      activeTab === i
                        ? "bg-[#5a8f5a]/10 text-[#5a8f5a] border-b-2 border-[#5a8f5a] -mb-px"
                        : "text-[#8b7355]/50 hover:text-[#8b7355] hover:bg-[#f5d75f]/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.title}
                  </button>
                );
              })}
            </div>
            <div className="p-6">
              {tabContent.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  activeTab === i && (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#5a8f5a]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#5a8f5a]" />
                      </div>
                      <p className="font-serif text-[#8b7355]/80 leading-relaxed">
                        {tab.description}
                      </p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pressed Flower Badges */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Pressed Flower Badges
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Botanical tags and seed labels
          </p>
          <div className="space-y-8">
            <GardenPanel variant="sage">
              <p className="text-xs font-serif text-[#5a8f5a] uppercase tracking-widest mb-4">
                Botanical Badges
              </p>
              <div className="flex flex-wrap gap-3">
                <BotanicalBadge icon={Leaf} variant="sage">Perennial</BotanicalBadge>
                <BotanicalBadge icon={Flower2} variant="rose">Wildflower</BotanicalBadge>
                <BotanicalBadge icon={Sun} variant="honey">Full Sun</BotanicalBadge>
                <BotanicalBadge icon={Droplets} variant="lavender">Moist Soil</BotanicalBadge>
              </div>
            </GardenPanel>

            <GardenPanel variant="cream">
              <p className="text-xs font-serif text-[#8b7355] uppercase tracking-widest mb-4">
                Seed Packet Tags
              </p>
              <div className="flex flex-wrap gap-4">
                <SeedPacketTag season="Spring">Lavender</SeedPacketTag>
                <SeedPacketTag season="Early">Sweet Pea</SeedPacketTag>
                <SeedPacketTag season="Autumn">Foxglove</SeedPacketTag>
                <SeedPacketTag season="Summer">Sunflower</SeedPacketTag>
              </div>
            </GardenPanel>

            <GardenPanel variant="rose">
              <p className="text-xs font-serif text-[#d4a0a0] uppercase tracking-widest mb-4">
                Berry Harvest Labels
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4a0a0]/10 border border-[#d4a0a0]/30 text-[#d4a0a0] font-serif text-sm rounded-full">
                  <Cherry className="w-3.5 h-3.5" /> Strawberry
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8b5a8b]/10 border border-[#8b5a8b]/30 text-[#8b5a8b] font-serif text-sm rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#8b5a8b]" /> Blackberry
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5a8f5a]/10 border border-[#5a8f5a]/30 text-[#5a8f5a] font-serif text-sm rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a]" /> Gooseberry
                </span>
              </div>
            </GardenPanel>
          </div>
        </div>
      </section>

      {/* Mason Jar Progress Bars */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Preserve Progress
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Mason jar fill levels for the pantry
          </p>
          <GardenPanel variant="cream">
            <div className="space-y-8">
              <MasonJarProgress label="Wildflower Honey" percentage={85} color="honey" />
              <MasonJarProgress label="Rose Petal Jam" percentage={60} color="rose" />
              <MasonJarProgress label="Dried Lavender" percentage={45} color="sage" />
              <MasonJarProgress label="Elderberry Syrup" percentage={30} color="berry" />
            </div>
          </GardenPanel>
        </div>
      </section>

      <CrossStitchDivider pattern="flower" />

      {/* Alerts */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Garden Notices
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Gentle reminders from the potting shed
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-[#5a8f5a]/10 border border-[#5a8f5a]/30 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#5a8f5a]/20 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-[#5a8f5a]" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#5a8f5a] mb-1">
                  Wildflower Wisdom
                </p>
                <p className="font-serif text-sm text-[#5a8f5a]/70">
                  Sow seeds after the last frost for best results. The soil should be warm to the touch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-[#f5d75f]/10 border border-[#f5d75f]/40 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#f5d75f]/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#8b7355]" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#8b7355] mb-1">
                  Honeybee Activity
                </p>
                <p className="font-serif text-sm text-[#8b7355]/70">
                  The hive is very active today -- approach the garden gently and wear light colors.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-[#d4a0a0]/10 border border-[#d4a0a0]/40 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#d4a0a0]/20 flex items-center justify-center shrink-0">
                <X className="w-5 h-5 text-[#d4a0a0]" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#d4a0a0] mb-1">
                  Thorn Warning
                </p>
                <p className="font-serif text-sm text-[#d4a0a0]/70">
                  The rose bushes need pruning. Please wear thick gloves and long sleeves.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-[#5a8f5a]/10 to-[#f5d75f]/10 border border-[#5a8f5a]/30 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#5a8f5a]/20 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-[#5a8f5a]" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#5a8f5a] mb-1">
                  Harvest Complete
                </p>
                <p className="font-serif text-sm text-[#5a8f5a]/70">
                  The berry baskets are full and the jam is cooling on the windowsill. Well done!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-xs mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Flower Selection
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Choose blooms to press
          </p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-5 py-4 bg-[#faf6f0] border-2 border-[#d4a0a0]/40 rounded-2xl font-serif text-sm text-[#8b7355] flex items-center justify-between hover:border-[#5a8f5a]/50 transition-all shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-[#d4a0a0]" />
                {selectedFlower}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#8b7355]/60 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#faf6f0] border-2 border-[#d4a0a0]/40 rounded-2xl shadow-lg z-10 overflow-hidden">
                {[
                  { name: "Lavender", icon: Flower2 },
                  { name: "Chamomile", icon: Sun },
                  { name: "Rosemary", icon: Leaf },
                  { name: "Sunflower", icon: Sun },
                  { name: "Sweet William", icon: Heart },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      className="w-full px-5 py-3 text-left font-serif text-sm text-[#8b7355] hover:bg-[#5a8f5a]/10 transition-colors border-b border-[#d4a0a0]/20 last:border-b-0 flex items-center gap-3"
                      onClick={() => {
                        setSelectedFlower(item.name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4 text-[#5a8f5a]" />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seed Catalog Table */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Seed Catalog
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Planting schedule for the season
          </p>
          <div className="border border-[#d4a0a0]/30 rounded-2xl overflow-hidden bg-[#faf6f0] shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#d4a0a0]/30 bg-[#5a8f5a]/10">
                  <th className="px-4 py-4 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">
                    <span className="flex items-center gap-2">
                      <Leaf className="w-3 h-3" /> Plant
                    </span>
                  </th>
                  <th className="px-4 py-4 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">
                    <span className="flex items-center gap-2">
                      <CloudSun className="w-3 h-3" /> Season
                    </span>
                  </th>
                  <th className="px-4 py-4 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">
                    <span className="flex items-center gap-2">
                      <Sun className="w-3 h-3" /> Light
                    </span>
                  </th>
                  <th className="px-4 py-4 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">
                    <span className="flex items-center gap-2">
                      <Droplets className="w-3 h-3" /> Water
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plant: "Lavender", season: "Spring", sun: "Full Sun", water: "Low" },
                  { plant: "Sweet Pea", season: "Early Spring", sun: "Partial", water: "Medium" },
                  { plant: "Chamomile", season: "Spring", sun: "Full Sun", water: "Low" },
                  { plant: "Foxglove", season: "Autumn", sun: "Dappled", water: "Medium" },
                  { plant: "Hollyhock", season: "Late Spring", sun: "Full Sun", water: "Medium" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#d4a0a0]/20 last:border-b-0 hover:bg-[#f5d75f]/10 transition-colors"
                  >
                    <td className="px-4 py-4 font-serif text-sm text-[#8b7355] font-medium">
                      {row.plant}
                    </td>
                    <td className="px-4 py-4 font-serif text-sm text-[#8b7355]/70">{row.season}</td>
                    <td className="px-4 py-4 font-serif text-sm text-[#8b7355]/70">{row.sun}</td>
                    <td className="px-4 py-4 font-serif text-sm text-[#8b7355]/70">{row.water}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Blockquote - Garden Journal */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Garden Journal
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            Words from the potting shed
          </p>
          <div className="p-8 bg-[#faf6f0] border border-[#d4a0a0]/30 rounded-2xl shadow-md">
            <JournalOrnament />
            <blockquote className="border-l-4 border-[#5a8f5a]/50 pl-6">
              <p className="font-serif text-xl md:text-2xl text-[#8b7355] italic leading-relaxed mb-4">
                &ldquo;To plant a garden is to believe in tomorrow. Every seed is a whispered
                promise that the earth will keep, and every bloom is proof that patience
                bears the sweetest fruit.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-8 h-8 rounded-full bg-[#5a8f5a]/20 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#5a8f5a]" />
                </div>
                <span className="w-8 h-px bg-[#8b7355]/30" />
                <footer className="font-serif text-sm text-[#8b7355]/60">
                  A Gardener&apos;s Almanac, 1847
                </footer>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      <CrossStitchDivider pattern="vine" />

      {/* Design Rules */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">
            Design Principles
          </h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">
            The cottage aesthetic guidelines
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <GardenPanel variant="sage">
              <h3 className="font-serif text-lg text-[#5a8f5a] mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" /> Required Elements
              </h3>
              <ul className="space-y-3 font-serif text-sm text-[#8b7355]/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a] mt-1.5 shrink-0" />
                  <span>Warm earth tones -- cream, sage, rose, honey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a] mt-1.5 shrink-0" />
                  <span>Botanical accents using Lucide icons</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a] mt-1.5 shrink-0" />
                  <span>Rounded shapes (rounded-xl, rounded-full)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a] mt-1.5 shrink-0" />
                  <span>Soft shadows and gentle transitions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a] mt-1.5 shrink-0" />
                  <span>Serif typography with handwritten warmth</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a] mt-1.5 shrink-0" />
                  <span>Natural imagery and garden motifs</span>
                </li>
              </ul>
            </GardenPanel>

            <GardenPanel variant="rose">
              <h3 className="font-serif text-lg text-[#d4a0a0] mb-4 flex items-center gap-2">
                <X className="w-5 h-5" /> Forbidden Elements
              </h3>
              <ul className="space-y-3 font-serif text-sm text-[#8b7355]/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0] mt-1.5 shrink-0" />
                  <span>Neon colors or high-saturation palettes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0] mt-1.5 shrink-0" />
                  <span>Sharp angles or square corners (rounded-none)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0] mt-1.5 shrink-0" />
                  <span>Monospace or cold sans-serif fonts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0] mt-1.5 shrink-0" />
                  <span>Dark themes or black backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0] mt-1.5 shrink-0" />
                  <span>Hard drop-shadows or glowing effects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0] mt-1.5 shrink-0" />
                  <span>Industrial or tech-inspired elements</span>
                </li>
              </ul>
            </GardenPanel>
          </div>
        </div>
      </section>

      <CrossStitchDivider pattern="flower" />

      {/* Footer */}
      <footer className="border-t border-[#d4a0a0]/30 py-10 px-6 bg-[#faf6f0]/80">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5a8f5a]/20 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-[#5a8f5a]" />
              </div>
              <div>
                <p className="font-serif text-sm text-[#8b7355]">Cottagecore Showcase</p>
                <p className="font-serif text-xs text-[#8b7355]/50">
                  A celebration of simple living
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/styles"
                className="font-serif text-sm text-[#8b7355]/60 hover:text-[#8b7355] transition-colors"
              >
                All Styles
              </Link>
              <Link
                href="/styles/cottagecore"
                className="font-serif text-sm text-[#5a8f5a] hover:text-[#5a8f5a]/80 transition-colors flex items-center gap-2"
              >
                <Leaf className="w-4 h-4" />
                View Documentation
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#d4a0a0]/20 text-center">
            <p className="font-serif text-xs text-[#8b7355]/40">
              Made with love, pressed flowers, and warm afternoon light
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
