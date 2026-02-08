"use client";

import Link from "next/link";
import { ArrowLeft, Star, Hexagon, Triangle, Sparkles, Circle } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Navy", hex: "#1e1b4b", bg: "bg-[#1e1b4b]" },
  { name: "Dark Background", hex: "#0a0920", bg: "bg-[#0a0920]" },
  { name: "Gold Glow", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
  { name: "Silver White", hex: "#e2e8f0", bg: "bg-[#e2e8f0]" },
  { name: "Mystic Indigo", hex: "#818cf8", bg: "bg-[#818cf8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0920] relative overflow-hidden">
      {/* Background concentric rings */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 border border-[#fbbf24]/[0.04] rounded-full animate-spin" style={{ animationDuration: "50s" }} />
        <div className="absolute inset-[60px] border border-dashed border-[#818cf8]/[0.04] rounded-full animate-spin" style={{ animationDuration: "70s", animationDirection: "reverse" }} />
        <div className="absolute inset-[120px] border border-[#fbbf24]/[0.03] rounded-full animate-spin" style={{ animationDuration: "90s" }} />
        <div className="absolute inset-[200px] border border-dotted border-[#818cf8]/[0.03] rounded-full" />
      </div>

      {/* Sacred geometry shimmer */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.02) 0%, transparent 50%), radial-gradient(circle at 25% 25%, rgba(129,140,248,0.015) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(129,140,248,0.015) 0%, transparent 40%)",
      }} />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#fbbf24]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/magic-circle"
            className="flex items-center gap-2 text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif font-bold text-sm tracking-wide">Back</span>
          </Link>
          <span className="font-serif font-bold text-xl text-[#fbbf24] tracking-wide
            [text-shadow:0_0_20px_rgba(251,191,36,0.3)]">
            MAGIC CIRCLE
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#fbbf24]/20 text-[#e2e8f0] font-serif font-semibold text-sm rounded-sm shadow-[0_0_10px_rgba(251,191,36,0.1)] hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:border-[#fbbf24]/40 transition-all duration-500"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Concentric Ring Hero */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <div className="relative max-w-4xl mx-auto flex items-center justify-center">
          {/* Decorative rings around hero text */}
          <div className="absolute w-[420px] h-[420px] md:w-[520px] md:h-[520px] border border-[#fbbf24]/8 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "35s" }} />
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] border border-dashed border-[#818cf8]/6 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "55s", animationDirection: "reverse" }} />
          <div className="absolute w-[300px] h-[300px] md:w-[360px] md:h-[360px] border border-[#fbbf24]/10 rounded-full pointer-events-none" />

          <div className="relative z-10 text-center py-20">
            <ShowcaseHero
              title="ARCANE CIRCLE"
              description="Where geometry reveals the secrets of magic"
              className=""
              titleClassName="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#fbbf24] mb-3 [text-shadow:0_0_40px_rgba(251,191,36,0.4)]"
              descriptionClassName="text-base md:text-lg text-[#e2e8f0]/40 font-sans max-w-xl mx-auto"
            />
          </div>
        </div>

        {/* Hero buttons centered below rings */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="px-10 py-4 bg-[#1e1b4b] text-[#fbbf24] font-serif font-semibold tracking-wide border border-[#fbbf24]/40 rounded-sm shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-500">
            Begin Ritual
          </button>
          <button className="px-10 py-4 bg-[#0a0920] text-[#818cf8] font-serif font-semibold tracking-wide border border-[#818cf8]/30 rounded-sm shadow-[0_0_15px_rgba(129,140,248,0.2)] hover:shadow-[0_0_25px_rgba(129,140,248,0.4)] transition-all duration-500">
            Observe
          </button>
        </div>
      </section>

      {/* Runic divider */}
      <div className="relative z-10 max-w-3xl mx-auto flex items-center gap-4 py-4 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#fbbf24]/20" />
        <span className="text-[8px] text-[#fbbf24]/15 tracking-[8px] font-mono">--- ... --- . -- --- ...</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#fbbf24]/20" />
      </div>

      {/* Hexagonal Card Layout - 2 top, 1 center bottom */}
      <ShowcaseSection
        title="Arcanum"
        subtitle="KNOWLEDGE CARDS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#e2e8f0] mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-8 bg-[#0a0920] border border-[#fbbf24]/15 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:-translate-y-1 transition-all duration-500
              bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.04)_0%,transparent_70%)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#1e1b4b] border border-[#fbbf24]/20 flex items-center justify-center rounded-sm">
                  <Star className="w-7 h-7 text-[#fbbf24]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#fbbf24]">Celestial</h3>
              </div>
              <p className="text-[#e2e8f0]/40 font-sans text-sm">Stars aligned in sacred patterns, illuminating the paths of ancient knowledge through concentric orbits.</p>
            </div>

            <div className="p-8 bg-[#0a0920] border border-[#818cf8]/15 rounded-sm shadow-[0_0_20px_rgba(129,140,248,0.1)] hover:shadow-[0_0_30px_rgba(129,140,248,0.25)] hover:-translate-y-1 transition-all duration-500
              bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.04)_0%,transparent_70%)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#1e1b4b] border border-[#818cf8]/20 flex items-center justify-center rounded-sm">
                  <Hexagon className="w-7 h-7 text-[#818cf8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#818cf8]">Geometric</h3>
              </div>
              <p className="text-[#e2e8f0]/40 font-sans text-sm">Perfect forms hold infinite power, each angle precisely calculated to channel arcane energy.</p>
            </div>
          </div>

          {/* Center card - wider */}
          <div className="max-w-lg mx-auto p-8 bg-[#0a0920] border border-[#fbbf24]/10 rounded-sm shadow-[0_0_25px_rgba(251,191,36,0.12)] hover:shadow-[0_0_35px_rgba(251,191,36,0.3)] hover:-translate-y-1 transition-all duration-500
            bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03)_0%,transparent_70%)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#1e1b4b] border border-[#e2e8f0]/10 flex items-center justify-center rounded-sm">
                <Triangle className="w-7 h-7 text-[#e2e8f0]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#e2e8f0]">Elemental</h3>
            </div>
            <p className="text-[#e2e8f0]/40 font-sans text-sm">The primal forces of creation converge at the center of the circle, where fire, water, air, and earth unite.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Runic divider */}
      <div className="relative z-10 max-w-3xl mx-auto flex items-center gap-4 py-4 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#818cf8]/15" />
        <Circle className="w-3 h-3 text-[#fbbf24]/20" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#818cf8]/15" />
      </div>

      {/* Color Palette + Buttons in alternating layout */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-sans text-[#fbbf24]/60 uppercase tracking-widest mb-8 text-center">ARCANE PALETTE</p>
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#fbbf24]/10 bg-[#0a0920] rounded-sm shadow-[0_0_10px_rgba(251,191,36,0.06)]"
            labelClassName="font-serif font-bold text-sm text-[#e2e8f0]"
            hexClassName="text-xs text-[#fbbf24] font-sans"
          />

          {/* Buttons below palette */}
          <div className="mt-10 p-8 bg-[#0a0920] border border-[#fbbf24]/10 rounded-sm">
            <p className="text-sm font-sans text-[#fbbf24]/60 uppercase tracking-widest mb-6">INVOCATIONS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#1e1b4b] text-[#fbbf24] font-serif font-semibold tracking-wide border border-[#fbbf24]/30 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all duration-500">
                Gold Invoke
              </button>
              <button className="px-6 py-3 bg-[#0a0920] text-[#818cf8] font-serif font-semibold tracking-wide border border-[#818cf8]/30 rounded-sm shadow-[0_0_15px_rgba(129,140,248,0.2)] hover:shadow-[0_0_25px_rgba(129,140,248,0.4)] transition-all duration-500">
                Indigo Cast
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0920] font-serif font-semibold tracking-wide border border-[#fbbf24]/60 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all duration-500">
                Golden Seal
              </button>
              <button className="px-6 py-3 bg-[#0a0920] text-[#fbbf24] font-mono tracking-widest border border-[#fbbf24]/20 rounded-sm shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all duration-500">
                Runic Mark
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Summoning Circle Form */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-md mx-auto relative">
          {/* Outer ring decoration */}
          <div className="absolute -inset-8 border border-[#fbbf24]/[0.06] rounded-full pointer-events-none" />
          <div className="absolute -inset-14 border border-dashed border-[#818cf8]/[0.04] rounded-full pointer-events-none" />

          <div className="relative p-8 bg-[#0a0920] border border-[#fbbf24]/15 rounded-sm shadow-[0_0_25px_rgba(251,191,36,0.1)]
            bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.06)_0%,rgba(251,191,36,0.02)_40%,transparent_70%)]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-[#1e1b4b] border border-[#fbbf24]/20 flex items-center justify-center mb-4 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.15)]">
                <Sparkles className="w-8 h-8 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#fbbf24]
                [text-shadow:0_0_15px_rgba(251,191,36,0.3)]">Summoning Circle</h3>
              <p className="text-xs text-[#e2e8f0]/25 font-mono tracking-widest mt-2">--- ... --- . -- --- ...</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-sans text-[#fbbf24]/60 uppercase tracking-widest mb-2">TRUE NAME</label>
                <input
                  type="text"
                  placeholder="Speak your name..."
                  className="w-full px-4 py-3 bg-[#0a0920] border border-[#fbbf24]/15 rounded-sm text-[#e2e8f0] placeholder-[#e2e8f0]/25 font-sans focus:border-[#fbbf24]/50 focus:shadow-[0_0_20px_rgba(251,191,36,0.25)] focus:outline-none transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#818cf8]/60 uppercase tracking-widest mb-2">SIGIL CODE</label>
                <input
                  type="password"
                  placeholder="Draw your sigil..."
                  className="w-full px-4 py-3 bg-[#0a0920] border border-[#818cf8]/15 rounded-sm text-[#e2e8f0] placeholder-[#e2e8f0]/25 font-sans focus:border-[#818cf8]/50 focus:shadow-[0_0_20px_rgba(129,140,248,0.25)] focus:outline-none transition-all duration-500"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#1e1b4b] text-[#fbbf24] font-serif font-semibold tracking-wide border border-[#fbbf24]/30 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all duration-500">
                Invoke
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles - circular arrangement representation */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-sans text-[#e2e8f0]/30 uppercase tracking-widest mb-8 text-center">DESIGN PRINCIPLES</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Circle, label: "Concentric Rings", color: "text-[#fbbf24]" },
              { icon: Hexagon, label: "Sacred Geometry", color: "text-[#818cf8]" },
              { icon: Star, label: "Golden Glow", color: "text-[#fbbf24]" },
              { icon: Triangle, label: "Alchemical", color: "text-[#e2e8f0]" },
              { icon: Sparkles, label: "Runic Marks", color: "text-[#818cf8]" },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-[#0a0920] border border-[#fbbf24]/8 rounded-sm text-center hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all duration-500">
                <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                <p className="text-xs font-serif text-[#e2e8f0]/50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#fbbf24]/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e2e8f0]/30 text-sm font-sans tracking-wide">
            Magic Circle Showcase{" "}
            <Link href="/" className="text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors
              [text-shadow:0_0_10px_rgba(251,191,36,0.2)]">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

