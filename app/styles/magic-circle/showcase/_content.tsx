"use client";

import Link from "next/link";
import { ArrowLeft, Star, Hexagon, Triangle, Sparkles } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Navy", hex: "#1e1b4b", bg: "bg-[#1e1b4b]" },
  { name: "Dark Background", hex: "#0f0e2e", bg: "bg-[#0f0e2e]" },
  { name: "Gold Glow", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
  { name: "Silver White", hex: "#e2e8f0", bg: "bg-[#e2e8f0]" },
  { name: "Mystic Indigo", hex: "#818cf8", bg: "bg-[#818cf8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0f0e2e] relative overflow-hidden">
      {/* Decorative magic circles */}
      <div className="fixed top-1/4 right-1/4 w-96 h-96 border border-[#fbbf24]/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: "40s" }} />
      <div className="fixed top-1/4 right-1/4 w-80 h-80 border border-dashed border-[#818cf8]/5 rounded-full pointer-events-none mt-8 ml-8 animate-spin" style={{ animationDuration: "60s", animationDirection: "reverse" }} />
      <div className="fixed bottom-20 left-10 w-48 h-48 bg-[#fbbf24]/3 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#fbbf24]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/magic-circle"
            className="flex items-center gap-2 text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif font-bold text-sm tracking-wide">Back to Docs</span>
          </Link>
          <span className="font-serif font-bold text-xl text-[#fbbf24] tracking-wide
            [text-shadow:0_0_15px_rgba(251,191,36,0.3)]">
            MAGIC CIRCLE
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#fbbf24]/20 text-[#e2e8f0] font-serif font-semibold text-sm rounded-sm shadow-[0_0_10px_rgba(251,191,36,0.1)] hover:shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:border-[#fbbf24]/40 transition-all duration-400"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="ARCANE CIRCLE"
        description="Where geometry reveals the secrets of magic"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif font-bold text-[#fbbf24] mb-2 [text-shadow:0_0_40px_rgba(251,191,36,0.4)]"
        descriptionClassName="text-lg text-[#e2e8f0]/40 font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-3xl md:text-5xl font-serif text-[#818cf8]
            [text-shadow:0_0_20px_rgba(129,140,248,0.3)]">
            Mystical Geometry
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#1e1b4b] text-[#fbbf24] font-serif font-semibold tracking-wide border border-[#fbbf24]/40 rounded-sm shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-400">
            Begin Ritual
          </button>
          <button className="px-10 py-4 bg-[#0f0e2e] text-[#818cf8] font-serif font-semibold tracking-wide border border-[#818cf8]/30 rounded-sm shadow-[0_0_15px_rgba(129,140,248,0.2)] hover:shadow-[0_0_25px_rgba(129,140,248,0.4)] transition-all duration-400">
            Observe
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Arcane Palette"
        subtitle="MYSTIC COLORS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#e2e8f0] mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#fbbf24]/10 bg-[#0f0e2e] rounded-sm shadow-[0_0_10px_rgba(251,191,36,0.08)]"
            labelClassName="font-serif font-bold text-sm text-[#e2e8f0]"
            hexClassName="text-xs text-[#fbbf24] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Invocations"
        subtitle="BUTTON SPELLS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#e2e8f0] mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0f0e2e] border border-[#fbbf24]/10 rounded-sm shadow-[0_0_15px_rgba(251,191,36,0.08)]">
            <p className="text-sm font-sans text-[#fbbf24]/60 uppercase tracking-widest mb-6">STYLES</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#1e1b4b] text-[#fbbf24] font-serif font-semibold tracking-wide border border-[#fbbf24]/30 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-400">
                Gold Invoke
              </button>
              <button className="px-6 py-3 bg-[#0f0e2e] text-[#818cf8] font-serif font-semibold tracking-wide border border-[#818cf8]/30 rounded-sm shadow-[0_0_15px_rgba(129,140,248,0.2)] hover:shadow-[0_0_25px_rgba(129,140,248,0.4)] transition-all duration-400">
                Indigo Cast
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0f0e2e] font-serif font-semibold tracking-wide border border-[#fbbf24]/60 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all duration-400">
                Golden Seal
              </button>
              <button className="px-6 py-3 bg-transparent text-[#e2e8f0] font-serif font-semibold tracking-wide border border-[#e2e8f0]/15 rounded-sm hover:border-[#fbbf24]/30 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-400">
                Silver Ward
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Arcanum"
        subtitle="KNOWLEDGE CARDS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#e2e8f0] mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f0e2e] border border-[#fbbf24]/15 rounded-sm shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:-translate-y-1 transition-all duration-400">
            <div className="w-14 h-14 bg-[#1e1b4b] border border-[#fbbf24]/20 flex items-center justify-center mb-4 rounded-sm">
              <Star className="w-7 h-7 text-[#fbbf24]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#fbbf24] mb-2">
              Celestial
            </h3>
            <p className="text-[#e2e8f0]/40 font-sans text-sm">Stars aligned in sacred patterns</p>
          </div>

          <div className="p-6 bg-[#0f0e2e] border border-[#818cf8]/15 rounded-sm shadow-[0_0_15px_rgba(129,140,248,0.1)] hover:shadow-[0_0_25px_rgba(129,140,248,0.25)] hover:-translate-y-1 transition-all duration-400">
            <div className="w-14 h-14 bg-[#1e1b4b] border border-[#818cf8]/20 flex items-center justify-center mb-4 rounded-sm">
              <Hexagon className="w-7 h-7 text-[#818cf8]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#818cf8] mb-2">
              Geometric
            </h3>
            <p className="text-[#e2e8f0]/40 font-sans text-sm">Perfect forms hold infinite power</p>
          </div>

          <div className="p-6 bg-[#0f0e2e] border border-[#e2e8f0]/10 rounded-sm shadow-[0_0_15px_rgba(226,232,240,0.08)] hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] hover:-translate-y-1 transition-all duration-400">
            <div className="w-14 h-14 bg-[#1e1b4b] border border-[#e2e8f0]/10 flex items-center justify-center mb-4 rounded-sm">
              <Triangle className="w-7 h-7 text-[#e2e8f0]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#e2e8f0] mb-2">
              Elemental
            </h3>
            <p className="text-[#e2e8f0]/40 font-sans text-sm">The primal forces of creation</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Ritual Input"
        subtitle="ARCANE FORM"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#e2e8f0] mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0f0e2e] border border-[#fbbf24]/15 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#1e1b4b] border border-[#fbbf24]/20 flex items-center justify-center mb-4 rounded-sm">
                <Sparkles className="w-8 h-8 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#fbbf24]">Summon</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#fbbf24]/60 uppercase tracking-widest mb-2">TRUE NAME</label>
                <input
                  type="text"
                  placeholder="Speak your name..."
                  className="w-full px-4 py-3 bg-[#0f0e2e] border border-[#fbbf24]/15 rounded-sm text-[#e2e8f0] placeholder-[#e2e8f0]/25 font-sans focus:border-[#fbbf24]/50 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] focus:outline-none transition-all duration-400"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#818cf8]/60 uppercase tracking-widest mb-2">SIGIL CODE</label>
                <input
                  type="password"
                  placeholder="Draw your sigil..."
                  className="w-full px-4 py-3 bg-[#0f0e2e] border border-[#818cf8]/15 rounded-sm text-[#e2e8f0] placeholder-[#e2e8f0]/25 font-sans focus:border-[#818cf8]/50 focus:shadow-[0_0_15px_rgba(129,140,248,0.2)] focus:outline-none transition-all duration-400"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#1e1b4b] text-[#fbbf24] font-serif font-semibold tracking-wide border border-[#fbbf24]/30 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-400">
                Invoke
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#fbbf24]/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e2e8f0]/30 text-sm font-sans tracking-wide">
            Magic Circle Showcase{" "}
            <Link href="/" className="text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
