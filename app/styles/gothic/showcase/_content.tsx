"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cross,
  Shield,
  Flame,
  BookOpen,
  ChevronDown,
  Check,
  X,
  Info,
  Crown,
  Skull,
  Castle,
  Scroll,
  Feather,
  Sparkles,
  Eye,
  Moon,
  Sword,
} from "lucide-react";
import {
  ShowcaseHero,
  ColorPaletteGrid,
  DesignRulesGrid,
} from "@/components/showcase/shared";

// ============================================
// INLINE COMPONENTS - Gothic Cathedral Theme
// ============================================

// Stone Panel with pointed arch appearance
function StonePanel({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "blood" | "purple";
}) {
  const variants = {
    default: "border-[#c9a227]/40 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]",
    blood: "border-[#8b1a1a]/50 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a]",
    purple: "border-[#4a2d6e]/50 bg-gradient-to-b from-[#1a1020] to-[#0a0a0a]",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Pointed arch top simulation */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#c9a227]/40" />
      <div
        className={`border-2 ${variants[variant]} p-6 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]`}
      >
        {/* Stone texture overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]" />
        {children}
      </div>
    </div>
  );
}

// Shield-shaped heraldic badge
function ShieldBadge({
  children,
  color = "gold",
  icon: Icon,
}: {
  children: React.ReactNode;
  color?: "gold" | "blood" | "purple";
  icon?: React.ElementType;
}) {
  const colors = {
    gold: "bg-[#2d1b4e] border-[#c9a227] text-[#c9a227]",
    blood: "bg-[#8b1a1a] border-[#c9a227] text-[#c9a227]",
    purple: "bg-[#4a2d6e] border-[#c9a227] text-[#c9a227]",
  };

  return (
    <div
      className={`relative inline-flex items-center gap-2 px-5 py-3 border-2 ${colors[color]} font-serif text-xs uppercase tracking-[0.2em]`}
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </div>
  );
}

// Circular wax seal badge
function WaxSeal({
  children,
  color = "blood",
}: {
  children: React.ReactNode;
  color?: "blood" | "purple" | "gold";
}) {
  const colors = {
    blood: "bg-[#8b1a1a] border-[#c9a227]/50 shadow-[0_4px_16px_rgba(139,26,26,0.6)]",
    purple: "bg-[#2d1b4e] border-[#c9a227]/50 shadow-[0_4px_16px_rgba(45,27,78,0.6)]",
    gold: "bg-[#c9a227] border-[#8b1a1a]/50 shadow-[0_4px_16px_rgba(201,162,39,0.6)] text-[#0a0a0a]",
  };

  return (
    <div
      className={`w-14 h-14 rounded-full border-3 ${colors[color]} flex items-center justify-center font-serif text-sm text-[#c9a227] relative`}
    >
      {/* Wax texture ring */}
      <div className="absolute inset-1 rounded-full border border-[#c9a227]/20" />
      <div className="absolute inset-2 rounded-full border border-[#c9a227]/10" />
      {children}
    </div>
  );
}

// Gothic tracery pattern divider
function TraceryDivider({ variant = "cross" }: { variant?: "cross" | "diamond" | "fleur" }) {
  if (variant === "diamond") {
    return (
      <div className="flex items-center justify-center gap-2 py-6">
        <span className="block w-16 h-px bg-gradient-to-r from-transparent to-[#c9a227]/40" />
        <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/40" />
        <span className="block w-3 h-3 rotate-45 bg-[#8b1a1a]/60 border border-[#c9a227]/50" />
        <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/40" />
        <span className="block w-16 h-px bg-gradient-to-l from-transparent to-[#c9a227]/40" />
      </div>
    );
  }

  if (variant === "fleur") {
    return (
      <div className="flex items-center justify-center gap-3 py-6">
        <span className="block w-24 h-px bg-[#c9a227]/30" />
        <Moon className="w-4 h-4 text-[#c9a227]/50" />
        <Cross className="w-5 h-5 text-[#8b1a1a]" />
        <Moon className="w-4 h-4 text-[#c9a227]/50 scale-x-[-1]" />
        <span className="block w-24 h-px bg-[#c9a227]/30" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <span className="block w-20 h-px bg-[#c9a227]/30" />
      <Cross className="w-4 h-4 text-[#c9a227]/40" />
      <span className="block w-20 h-px bg-[#c9a227]/30" />
    </div>
  );
}

// Illuminated initial letter for manuscripts
function IlluminatedInitial({ letter }: { letter: string }) {
  return (
    <span className="float-left mr-4 mb-2 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#8b1a1a] to-[#4a2d6e] border-2 border-[#c9a227] text-[#c9a227] font-serif text-4xl shadow-[0_4px_20px_rgba(139,26,26,0.5)]">
      {letter}
    </span>
  );
}

// Parchment-style card
function ParchmentCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative p-6 bg-gradient-to-b from-[#1a1510] to-[#0f0d0a] border-2 border-[#c9a227]/30 shadow-[inset_0_0_40px_rgba(201,162,39,0.05)] ${className}`}
    >
      {/* Parchment texture corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a227]/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c9a227]/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c9a227]/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a227]/50" />
      {children}
    </div>
  );
}

// ============================================
// MAIN SHOWCASE COMPONENT
// ============================================
export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabContent = [
    {
      title: "The Nave",
      icon: Castle,
      body: "The central hall stretches upward, ribbed vaults converging at dizzying heights. Light filters through rose windows, casting crimson and gold onto cold stone floors. Every pillar bears the weight of centuries.",
    },
    {
      title: "The Crypt",
      icon: Skull,
      body: "Beneath the cathedral lies the crypt -- vaulted chambers of silence where stone effigies rest upon their tombs. The air is thick with the scent of damp earth and ancient incense. Candlelight barely reaches the far walls.",
    },
    {
      title: "The Tower",
      icon: Eye,
      body: "A spiral staircase of worn stone ascends into darkness. At the summit, gargoyles keep their eternal vigil over the city below. The bells hang in stillness, waiting for the appointed hour to shake the heavens.",
    },
  ];

  const gothicColors = [
    { name: "Deep Purple", hex: "#2d1b4e", bg: "bg-[#2d1b4e]" },
    { name: "Blood Red", hex: "#8b1a1a", bg: "bg-[#8b1a1a]" },
    { name: "Obsidian", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
    { name: "Gold Leaf", hex: "#c9a227", bg: "bg-[#c9a227]" },
    { name: "Dark Violet", hex: "#4a2d6e", bg: "bg-[#4a2d6e]" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e]/10 to-[#0a0a0a] text-[#c9a227]/80 relative overflow-hidden">
      {/* Subtle radial glow from above */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* === 1. Navigation === */}
      <nav className="relative z-10 border-b-2 border-[#c9a227]/20 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/styles/gothic"
            className="flex items-center gap-2 text-[#c9a227]/60 hover:text-[#c9a227] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-serif text-sm uppercase tracking-[0.2em]">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <Cross className="w-5 h-5 text-[#8b1a1a]" />
            <span className="font-serif text-xl text-[#c9a227] uppercase tracking-[0.3em]">
              Gothic
            </span>
            <Cross className="w-5 h-5 text-[#8b1a1a]" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#c9a227]/30 text-[#c9a227]/60 font-serif text-sm uppercase tracking-[0.2em] hover:border-[#c9a227]/60 hover:text-[#c9a227] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* === 2. Hero Section === */}
      <ShowcaseHero
        badge="In Tenebris Lux"
        title="GOTHIC"
        description="The solemn beauty of cathedrals, illuminated manuscripts, and medieval stone. Where darkness meets devotion, and every shadow conceals a story."
        className="pt-24 pb-16"
        badgeClassName="bg-[#2d1b4e]/50 border border-[#c9a227]/30 rounded-none px-6"
        titleClassName="font-serif text-6xl md:text-8xl lg:text-9xl text-[#c9a227] tracking-[0.15em]"
        descriptionClassName="font-serif text-lg md:text-xl text-[#c9a227]/40 leading-relaxed"
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="px-10 py-4 bg-[#8b1a1a] border-2 border-[#8b1a1a] text-[#c9a227] font-serif uppercase tracking-[0.25em] shadow-[0_4px_20px_rgba(139,26,26,0.5)] hover:shadow-[0_6px_30px_rgba(139,26,26,0.7)] hover:bg-[#a02020] transition-all duration-300">
            <span className="flex items-center gap-3">
              <Castle className="w-5 h-5" />
              Enter the Cathedral
            </span>
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-[#c9a227]/40 text-[#c9a227]/70 font-serif uppercase tracking-[0.25em] hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300">
            <span className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              Read the Codex
            </span>
          </button>
        </div>
      </ShowcaseHero>

      <TraceryDivider variant="fleur" />

      {/* === 3. Color Palette === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Tenebrae et Aurum
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Color Palette
          </h2>
          <ColorPaletteGrid
            colors={gothicColors}
            cardClassName="border-2 border-[#c9a227]/20 bg-[#0a0a0a]/80 rounded-none"
            colorBlockClassName="h-24 md:h-32"
            labelClassName="font-serif text-sm text-[#c9a227]"
            hexClassName="text-xs text-[#c9a227]/40 font-mono"
          />
        </div>
      </section>

      <TraceryDivider variant="diamond" />

      {/* === 4. Typography === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Scriptorium
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Typography
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <StonePanel>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                <Feather className="w-3 h-3 inline mr-2" />
                Display / Blackletter
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-[#c9a227] tracking-wider mb-4 leading-tight">
                Memento Mori
              </h3>
              <p className="font-serif text-sm text-[#c9a227]/50">
                font-serif -- tracking-wider -- heavy weight -- dramatic scale
              </p>
            </StonePanel>
            <ParchmentCard>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                <Scroll className="w-3 h-3 inline mr-2" />
                Body / Illuminated Initial
              </p>
              <div className="font-serif text-base text-[#c9a227]/60 leading-relaxed overflow-hidden">
                <IlluminatedInitial letter="I" />
                n the dim corridors of the abbey, monks laboured over vellum pages by candlelight. Each letter was a prayer, each flourish an act of devotion. The scriptorium held the knowledge of ages within its cold stone walls.
              </div>
            </ParchmentCard>
          </div>
        </div>
      </section>

      {/* === 5. Buttons === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Cathedral Controls
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Buttons
          </h2>
          <StonePanel className="mt-4">
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-6">
              Stone-Carved Variants
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#8b1a1a] border-2 border-[#8b1a1a] text-[#c9a227] font-serif uppercase tracking-[0.2em] shadow-[0_4px_16px_rgba(139,26,26,0.5)] hover:shadow-[0_6px_24px_rgba(139,26,26,0.7)] hover:bg-[#a02020] transition-all flex items-center gap-2">
                <Sword className="w-4 h-4" />
                Primary
              </button>
              <button className="px-6 py-3 bg-[#1a1a1a] border-2 border-[#c9a227]/30 text-[#c9a227]/70 font-serif uppercase tracking-[0.2em] hover:bg-[#2a2a2a] hover:border-[#c9a227]/50 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#c9a227]/50 text-[#c9a227] font-serif uppercase tracking-[0.2em] hover:border-[#c9a227] hover:shadow-[0_0_16px_rgba(201,162,39,0.2)] transition-all flex items-center gap-2">
                <Cross className="w-4 h-4" />
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-transparent text-[#c9a227]/50 font-serif uppercase tracking-[0.2em] hover:text-[#c9a227] transition-all">
                Ghost
              </button>
            </div>
          </StonePanel>
        </div>
      </section>

      {/* === 6. Cards === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Sanctum Panels
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StonePanel variant="default" className="group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center mb-4">
                <Cross className="w-8 h-8 text-[#c9a227]" />
              </div>
              <h3 className="font-serif text-xl text-[#c9a227] mb-2 tracking-wider">Cathedral</h3>
              <p className="font-serif text-sm text-[#c9a227]/50 leading-relaxed">
                Soaring arches converge in ribbed vaults, channelling the gaze toward heaven.
              </p>
            </StonePanel>
            <StonePanel variant="blood" className="group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-[#8b1a1a]/30 border-2 border-[#8b1a1a]/50 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-[#8b1a1a]" />
              </div>
              <h3 className="font-serif text-xl text-[#8b1a1a] mb-2 tracking-wider">Crusade</h3>
              <p className="font-serif text-sm text-[#8b1a1a]/50 leading-relaxed">
                The shield bears the mark of the order -- sworn to protect the sacred relics.
              </p>
            </StonePanel>
            <StonePanel variant="purple" className="group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-[#4a2d6e]/40 border-2 border-[#4a2d6e]/60 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-[#c9a227]" />
              </div>
              <h3 className="font-serif text-xl text-[#c9a227] mb-2 tracking-wider">Manuscript</h3>
              <p className="font-serif text-sm text-[#c9a227]/50 leading-relaxed">
                Illuminated pages preserve the wisdom of ages in gold leaf and iron gall ink.
              </p>
            </StonePanel>
          </div>
        </div>
      </section>

      <TraceryDivider />

      {/* === 7. Form === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-md mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Inscribed Scrolls
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Form
          </h2>
          <ParchmentCard>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center mb-4">
                <Flame className="w-8 h-8 text-[#c9a227]" />
              </div>
              <h3 className="font-serif text-xl text-[#c9a227] tracking-wider">Sanctum Registry</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/50 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Inscribe thy name..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/25 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/50 mb-2">
                  Sigil
                </label>
                <input
                  type="text"
                  placeholder="Thy mark upon the stone..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#8b1a1a]/30 text-[#8b1a1a] placeholder-[#8b1a1a]/25 font-serif focus:border-[#8b1a1a] focus:shadow-[0_0_16px_rgba(139,26,26,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/50 mb-2">
                  Epistle
                </label>
                <textarea
                  placeholder="Speak thy purpose..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/25 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.2)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#2d1b4e] border-2 border-[#c9a227]/60 text-[#c9a227] font-serif uppercase tracking-[0.25em] hover:shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Submit Petition
              </button>
            </div>
          </ParchmentCard>
        </div>
      </section>

      <TraceryDivider variant="diamond" />

      {/* === 8. Tabs === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Chamber Navigation
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Tabs
          </h2>
          <div className="border-2 border-[#c9a227]/20 bg-[#0a0a0a]/90">
            <div className="flex border-b-2 border-[#c9a227]/20">
              {tabContent.map((tab, i) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.title}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-4 font-serif text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                      activeTab === i
                        ? "text-[#c9a227] border-b-4 border-[#8b1a1a] -mb-[2px] bg-[#8b1a1a]/10"
                        : "text-[#c9a227]/40 hover:text-[#c9a227]/70 hover:bg-[#c9a227]/5"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.title.replace("The ", "")}</span>
                  </button>
                );
              })}
            </div>
            <div className="p-6">
              <h4 className="font-serif text-lg text-[#c9a227] mb-3 tracking-wider flex items-center gap-2">
                {(() => {
                  const Icon = tabContent[activeTab].icon;
                  return <Icon className="w-5 h-5 text-[#8b1a1a]" />;
                })()}
                {tabContent[activeTab].title}
              </h4>
              <p className="font-serif text-sm text-[#c9a227]/50 leading-relaxed">
                {tabContent[activeTab].body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === 9. Heraldic Badges === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Marks of Rank
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Badges
          </h2>
          <div className="space-y-10">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                Shield Crests
              </p>
              <div className="flex flex-wrap gap-4">
                <ShieldBadge color="purple" icon={Shield}>Knight</ShieldBadge>
                <ShieldBadge color="blood" icon={Crown}>Sovereign</ShieldBadge>
                <ShieldBadge color="gold" icon={BookOpen}>Scholar</ShieldBadge>
              </div>
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                Wax Seals
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <WaxSeal color="blood">I</WaxSeal>
                <WaxSeal color="purple">II</WaxSeal>
                <WaxSeal color="gold">III</WaxSeal>
              </div>
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                Banner Pennants
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 border-l-4 border-[#c9a227] bg-[#c9a227]/10 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]">
                  Consecrated
                </span>
                <span className="px-4 py-2 border-l-4 border-[#8b1a1a] bg-[#8b1a1a]/10 font-serif text-xs uppercase tracking-[0.2em] text-[#8b1a1a]">
                  Forbidden
                </span>
                <span className="px-4 py-2 border-l-4 border-[#4a2d6e] bg-[#4a2d6e]/20 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/60">
                  Arcane
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TraceryDivider variant="fleur" />

      {/* === 10. Progress Bars === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Stone Channels
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Progress
          </h2>
          <StonePanel>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between font-serif text-xs text-[#c9a227]/60 mb-2">
                  <span className="uppercase tracking-[0.2em] flex items-center gap-2">
                    <Cross className="w-3 h-3 text-[#8b1a1a]" />
                    Sanctification
                  </span>
                  <span>72%</span>
                </div>
                <div className="h-4 bg-[#0a0a0a] border-2 border-[#c9a227]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <div className="h-full w-[72%] bg-gradient-to-r from-[#8b1a1a] to-[#a02020] shadow-[0_0_12px_rgba(139,26,26,0.6)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-serif text-xs text-[#c9a227]/60 mb-2">
                  <span className="uppercase tracking-[0.2em] flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#c9a227]" />
                    Reliquary
                  </span>
                  <span>45%</span>
                </div>
                <div className="h-4 bg-[#0a0a0a] border-2 border-[#c9a227]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <div className="h-full w-[45%] bg-gradient-to-r from-[#c9a227] to-[#dab92f] shadow-[0_0_12px_rgba(201,162,39,0.6)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-serif text-xs text-[#c9a227]/60 mb-2">
                  <span className="uppercase tracking-[0.2em] flex items-center gap-2">
                    <Shield className="w-3 h-3 text-emerald-600" />
                    Restoration
                  </span>
                  <span>88%</span>
                </div>
                <div className="h-4 bg-[#0a0a0a] border-2 border-[#c9a227]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <div className="h-full w-[88%] bg-gradient-to-r from-[#2d6e3a] to-[#3a8a4a] shadow-[0_0_12px_rgba(45,110,58,0.6)]" />
                </div>
              </div>
            </div>
          </StonePanel>
        </div>
      </section>

      {/* === 11. Alerts === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Proclamations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Alerts
          </h2>
          <div className="space-y-4">
            {/* Parchment Info */}
            <div className="flex items-start gap-4 p-5 border-2 border-[#c9a227]/30 bg-gradient-to-r from-[#1a1510]/80 to-[#0f0d0a]/80 shadow-[inset_0_0_20px_rgba(201,162,39,0.05)]">
              <Scroll className="w-6 h-6 text-[#c9a227] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-[#c9a227] mb-1 tracking-wider">Parchment Notice</p>
                <p className="font-serif text-xs text-[#c9a227]/50">The archives hold records dating to the founding of the order.</p>
              </div>
            </div>
            {/* Torch Warning */}
            <div className="flex items-start gap-4 p-5 border-2 border-amber-600/40 bg-gradient-to-r from-amber-900/20 to-amber-950/10">
              <Flame className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <p className="font-serif text-sm text-amber-500 mb-1 tracking-wider">Torch Warning</p>
                <p className="font-serif text-xs text-amber-500/50">The eastern passage grows unstable. Proceed with vigilance.</p>
              </div>
            </div>
            {/* Blood Error */}
            <div className="flex items-start gap-4 p-5 border-2 border-[#8b1a1a]/50 bg-gradient-to-r from-[#8b1a1a]/15 to-[#8b1a1a]/5">
              <Skull className="w-6 h-6 text-[#8b1a1a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-[#8b1a1a] mb-1 tracking-wider">Blood Seal Error</p>
                <p className="font-serif text-xs text-[#8b1a1a]/50">The binding has been broken. The ward must be renewed at once.</p>
              </div>
            </div>
            {/* Ivy Success */}
            <div className="flex items-start gap-4 p-5 border-2 border-emerald-700/40 bg-gradient-to-r from-emerald-900/15 to-emerald-950/5">
              <Check className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-emerald-500 mb-1 tracking-wider">Ivy Blessing</p>
                <p className="font-serif text-xs text-emerald-500/50">The consecration is complete. The sanctuary stands protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TraceryDivider />

      {/* === 12. Dropdown === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-xs mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Archway Selection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Dropdown
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-4 border-2 border-[#c9a227]/30 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] font-serif text-sm text-[#c9a227]/70 hover:border-[#c9a227]/60 transition-all"
            >
              <span className="uppercase tracking-[0.15em] flex items-center gap-2">
                <Castle className="w-4 h-4" />
                Choose thy path
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#c9a227]/50 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-0 border-2 border-t-0 border-[#c9a227]/30 bg-[#0a0a0a] z-10 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                {[
                  { name: "The Nave", icon: Castle },
                  { name: "The Crypt", icon: Skull },
                  { name: "The Bell Tower", icon: Moon },
                  { name: "The Cloister", icon: Cross },
                  { name: "The Ossuary", icon: Flame },
                ].map((item) => (
                  <button
                    key={item.name}
                    className="w-full px-5 py-3 text-left font-serif text-sm text-[#c9a227]/50 hover:text-[#c9a227] hover:bg-[#c9a227]/5 transition-all border-b border-[#c9a227]/10 last:border-b-0 flex items-center gap-3"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <TraceryDivider variant="diamond" />

      {/* === 13. Table === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Codex Registrum
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Table
          </h2>
          <div className="border-4 border-double border-[#c9a227]/30 overflow-hidden bg-[#0a0a0a]/90">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#c9a227]/30 bg-[#2d1b4e]/30">
                  <th className="px-5 py-4 text-left font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">
                    Relic
                  </th>
                  <th className="px-5 py-4 text-left font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">
                    Origin
                  </th>
                  <th className="px-5 py-4 text-left font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">
                    Era
                  </th>
                  <th className="px-5 py-4 text-right font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm">
                <tr className="border-b border-[#c9a227]/15 hover:bg-[#c9a227]/5 transition-colors">
                  <td className="px-5 py-4 text-[#c9a227]/70">Crown of Thorns</td>
                  <td className="px-5 py-4 text-[#c9a227]/50">Jerusalem</td>
                  <td className="px-5 py-4 text-[#c9a227]/50">I Century</td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs">Sacred</span>
                  </td>
                </tr>
                <tr className="border-b border-[#c9a227]/15 hover:bg-[#c9a227]/5 transition-colors">
                  <td className="px-5 py-4 text-[#c9a227]/70">Bleeding Chalice</td>
                  <td className="px-5 py-4 text-[#c9a227]/50">Glastonbury</td>
                  <td className="px-5 py-4 text-[#c9a227]/50">XII Century</td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-2 py-1 bg-[#8b1a1a]/20 text-[#8b1a1a] text-xs">Cursed</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#c9a227]/5 transition-colors">
                  <td className="px-5 py-4 text-[#c9a227]/70">Obsidian Codex</td>
                  <td className="px-5 py-4 text-[#c9a227]/50">Constantinople</td>
                  <td className="px-5 py-4 text-[#c9a227]/50">IX Century</td>
                  <td className="px-5 py-4 text-right">
                    <span className="px-2 py-1 bg-[#4a2d6e]/30 text-[#c9a227]/70 text-xs">Sealed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* === 14. Blockquote === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Inscription
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Blockquote
          </h2>
          <ParchmentCard>
            <blockquote className="border-l-4 border-[#8b1a1a] pl-6 md:pl-8">
              <p className="font-serif text-xl md:text-2xl italic text-[#c9a227]/70 leading-relaxed mb-4">
                &ldquo;Sic transit gloria mundi -- Thus passes the glory of the world.&rdquo;
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-6 h-px bg-[#c9a227]/30" />
                <Cross className="w-4 h-4 text-[#8b1a1a]" />
                <span className="block w-6 h-px bg-[#c9a227]/30" />
              </div>
              <footer className="font-serif text-sm text-[#c9a227]/40 uppercase tracking-[0.2em]">
                -- Thomas a Kempis, De Imitatione Christi
              </footer>
            </blockquote>
          </ParchmentCard>
        </div>
      </section>

      <TraceryDivider variant="fleur" />

      {/* === 15. Ornate Dividers Showcase === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Ornamental Patterns
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Dividers
          </h2>
          <StonePanel>
            <div className="space-y-10">
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                  Simple Rule
                </p>
                <hr className="border-t-2 border-[#c9a227]/20" />
              </div>
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                  Cross Ornament
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex-1 h-px bg-[#c9a227]/20" />
                  <Cross className="w-5 h-5 text-[#8b1a1a]" />
                  <span className="flex-1 h-px bg-[#c9a227]/20" />
                </div>
              </div>
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                  Diamond Tracery
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="block w-16 h-px bg-[#c9a227]/20" />
                  <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/40" />
                  <span className="block w-3 h-3 rotate-45 bg-[#8b1a1a]/60" />
                  <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/40" />
                  <span className="block w-16 h-px bg-[#c9a227]/20" />
                </div>
              </div>
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">
                  Fleur Pattern
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="block w-20 h-px bg-[#c9a227]/30" />
                  <Moon className="w-4 h-4 text-[#c9a227]/50" />
                  <Cross className="w-5 h-5 text-[#8b1a1a]" />
                  <Moon className="w-4 h-4 text-[#c9a227]/50 scale-x-[-1]" />
                  <span className="block w-20 h-px bg-[#c9a227]/30" />
                </div>
              </div>
            </div>
          </StonePanel>
        </div>
      </section>

      {/* === 16. Rules Summary === */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">
            Edicts of the Order
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">
            Design Rules
          </h2>
          <DesignRulesGrid
            doList={[
              "Pointed arches and angular forms",
              "Stone texture, thick borders (border-2)",
              "Jewel tones: crimson, gold, deep purple",
              "Serif typography throughout",
              "Wide letter-spacing and uppercase labels",
            ]}
            dontList={[
              "Bright, saturated or pastel colors",
              "Rounded corners or pill shapes",
              "Modern sans-serif or mono fonts",
              "Thin hairline borders or minimal lines",
              "Flat minimalism or excessive whitespace",
            ]}
            containerClassName="grid md:grid-cols-2 gap-8"
            doTitleClassName="font-serif text-xl text-[#c9a227] mb-6 tracking-wider flex items-center gap-2"
            dontTitleClassName="font-serif text-xl text-[#8b1a1a] mb-6 tracking-wider flex items-center gap-2"
            itemClassName="font-serif text-sm text-[#c9a227]/60"
            doTitle="Required"
            dontTitle="Forbidden"
          />
        </div>
      </section>

      <TraceryDivider variant="diamond" />

      {/* === 17. Footer === */}
      <footer className="relative z-10 py-10 px-6 border-t-2 border-[#c9a227]/20 bg-[#0a0a0a]/95">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Cross className="w-5 h-5 text-[#8b1a1a]" />
            <p className="font-serif text-sm text-[#c9a227]/40 tracking-wider">
              StyleKit -- Gothic Showcase
            </p>
            <Cross className="w-5 h-5 text-[#8b1a1a]" />
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/styles/gothic"
              className="font-serif text-sm text-[#c9a227]/60 hover:text-[#c9a227] transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              View Documentation
            </Link>
            <Link
              href="/styles"
              className="font-serif text-sm text-[#c9a227]/60 hover:text-[#c9a227] transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
