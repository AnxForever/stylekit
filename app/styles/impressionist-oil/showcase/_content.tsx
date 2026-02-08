"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Sun,
  Paintbrush,
  Eye,
  Layers,
  Frame,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Warm Orange", hex: "#e8a87c", bg: "bg-[#e8a87c]" },
  { name: "Vermillion Red", hex: "#c0392b", bg: "bg-[#c0392b]" },
  { name: "Deep Blue", hex: "#2c3e50", bg: "bg-[#2c3e50]" },
  { name: "Turquoise", hex: "#1abc9c", bg: "bg-[#1abc9c]" },
  { name: "Golden Light", hex: "#f5d88a", bg: "bg-[#f5d88a]" },
  { name: "Canvas Cream", hex: "#f5f0e1", bg: "bg-[#f5f0e1]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e1] relative overflow-hidden">
      {/* Canvas texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(44,62,80,0.03) 3px, transparent 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(44,62,80,0.02) 3px, transparent 4px)`,
        }}
      />

      {/* Dappled light overlay - multiple radial gradient spots */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(circle 80px at 20% 15%, rgba(245,216,138,0.08) 0%, transparent 100%), radial-gradient(circle 100px at 45% 10%, rgba(232,168,124,0.06) 0%, transparent 100%), radial-gradient(circle 70px at 75% 20%, rgba(245,216,138,0.07) 0%, transparent 100%), radial-gradient(circle 90px at 90% 60%, rgba(232,168,124,0.05) 0%, transparent 100%), radial-gradient(circle 60px at 10% 80%, rgba(245,216,138,0.06) 0%, transparent 100%), radial-gradient(circle 85px at 60% 85%, rgba(232,168,124,0.05) 0%, transparent 100%)" }} />

      {/* Navigation - brushstroke underline style */}
      <nav className="relative z-10 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/impressionist-oil"
            className="flex items-center gap-2 text-[#e8a87c] hover:text-[#c48060] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif font-bold text-sm tracking-wide">Return</span>
          </Link>
          <Link
            href="/styles"
            className="px-5 py-2 font-serif font-bold text-sm text-[#2c3e50] tracking-wide rounded-lg border border-[#e8a87c]/30 transition-all duration-300"
            style={{ boxShadow: "0 3px 0 #c0392b, 0 4px 8px rgba(232,168,124,0.15)" }}
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero: Gallery wall with painting frame */}
      <section className="relative z-10 pt-12 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Painting frame around title */}
          <div className="relative inline-block mb-6 px-16 py-12">
            {/* Frame border */}
            <div className="absolute inset-0 border-4 border-[#c0915a]/40 rounded-sm" style={{ boxShadow: "inset 0 0 0 4px #f5f0e1, inset 0 0 0 6px rgba(192,145,90,0.25), 0 8px 30px rgba(44,62,80,0.12)" }} />
            {/* Brushstroke texture overlay inside frame */}
            <div className="absolute inset-4 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(35deg, transparent, transparent 8px, rgba(232,168,124,0.15) 8px, transparent 9px), repeating-linear-gradient(-35deg, transparent, transparent 12px, rgba(192,57,43,0.08) 12px, transparent 13px)" }} />
            <h1 className="relative font-serif text-6xl md:text-8xl font-bold text-[#e8a87c] leading-none">
              Impression
            </h1>
            <p className="relative font-serif text-3xl md:text-5xl font-bold text-[#2c3e50] mt-3">
              Soleil Levant
            </p>
          </div>

          <p className="text-[#2c3e50]/45 font-serif text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Bold brushstrokes capture the fleeting dance of light across
            a canvas, where color is applied thick and alive
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button
              className="px-10 py-4 font-serif font-bold tracking-wide rounded-lg text-[#2c3e50] hover:brightness-110 active:translate-y-[2px] transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)", boxShadow: "0 4px 0 #c0392b, 0 6px 16px rgba(232,168,124,0.30)" }}
            >
              <span className="flex items-center gap-2">
                <Paintbrush className="w-4 h-4" />
                Enter Gallery
              </span>
            </button>
            <button
              className="px-10 py-4 font-serif font-bold tracking-wide rounded-lg text-[#f5f0e1] hover:brightness-110 active:translate-y-[2px] transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #2c3e50 0%, #243342 100%)", boxShadow: "0 4px 0 #1abc9c, 0 6px 16px rgba(44,62,80,0.30)" }}
            >
              <span className="flex items-center gap-2">
                <Frame className="w-4 h-4" />
                View Collection
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Brushstroke divider */}
      <div className="relative z-10 h-4 mx-auto max-w-lg" style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(232,168,124,0.15) 6px, transparent 7px)", borderRadius: "50%" }} />

      {/* Color Palette */}
      <ShowcaseSection
        title="Palette"
        subtitle="From the Easel"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif font-bold text-[#2c3e50] tracking-wide mb-2 text-center"
        subtitleClassName="text-[#2c3e50]/35 font-serif text-sm tracking-[0.15em] mb-12 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#e8a87c]/25 bg-[#f5f0e1] rounded-lg shadow-[0_3px_0_rgba(192,57,43,0.15),0_4px_12px_rgba(232,168,124,0.10)]"
            labelClassName="font-serif font-bold text-sm text-[#2c3e50]"
            hexClassName="text-xs text-[#e8a87c] font-serif"
          />
        </div>
      </ShowcaseSection>

      {/* Painting Techniques - Asymmetric gallery layout */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#2c3e50] tracking-wide mb-2 text-center">
            Techniques
          </h2>
          <p className="text-[#2c3e50]/35 font-serif text-sm tracking-[0.15em] mb-14 text-center">
            En Plein Air Methods
          </p>

          {/* Large feature card + two stacked */}
          <div className="grid md:grid-cols-5 gap-6">
            {/* Large card spanning 3 cols */}
            <div className="md:col-span-3 relative group">
              <div className="relative p-8 bg-[#f5f0e1] border border-[#e8a87c]/25 rounded-lg hover:border-[#e8a87c]/40 transition-all duration-300" style={{ boxShadow: "0 3px 0 rgba(192,57,43,0.12), 0 8px 24px rgba(44,62,80,0.08), inset 0 0 0 0 transparent", backgroundImage: "repeating-linear-gradient(25deg, transparent, transparent 15px, rgba(232,168,124,0.02) 15px, transparent 16px)" }}>
                {/* Dappled light on card */}
                <div className="absolute top-4 right-6 w-20 h-20 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,216,138,0.12) 0%, transparent 70%)" }} />
                <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)", boxShadow: "0 2px 0 #c0392b" }}>
                  <Sun className="w-7 h-7 text-[#2c3e50]" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#2c3e50] mb-3">Dappled Light</h3>
                <p className="font-serif text-[#2c3e50]/50 leading-relaxed">
                  The Impressionists obsession with light manifests as multiple radial gradient
                  spots scattered across surfaces, creating the effect of sunlight filtering
                  through leaves. Each spot is a moment of warmth captured in paint.
                </p>
              </div>
            </div>

            {/* Two stacked cards spanning 2 cols */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="relative p-6 bg-[#f5f0e1] border border-[#c0392b]/15 rounded-lg transition-all duration-300" style={{ boxShadow: "0 3px 0 rgba(44,62,80,0.10), 0 6px 16px rgba(192,57,43,0.06)", backgroundImage: "repeating-linear-gradient(-30deg, transparent, transparent 12px, rgba(192,57,43,0.02) 12px, transparent 13px)" }}>
                <div className="w-11 h-11 mb-4 flex items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #c0392b 0%, #a93226 100%)", boxShadow: "0 2px 0 #2c3e50" }}>
                  <Paintbrush className="w-5 h-5 text-[#f5f0e1]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2c3e50] mb-2">Impasto</h3>
                <p className="font-serif text-sm text-[#2c3e50]/45 leading-relaxed">
                  Thick, layered paint applied with bold strokes, creating three-dimensional
                  texture on the canvas surface.
                </p>
              </div>

              <div className="relative p-6 bg-[#f5f0e1] border border-[#1abc9c]/15 rounded-lg transition-all duration-300" style={{ boxShadow: "0 3px 0 rgba(26,188,156,0.15), 0 6px 16px rgba(26,188,156,0.06)", backgroundImage: "repeating-linear-gradient(40deg, transparent, transparent 10px, rgba(26,188,156,0.02) 10px, transparent 11px)" }}>
                <div className="w-11 h-11 mb-4 flex items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)", boxShadow: "0 2px 0 #2c3e50" }}>
                  <Eye className="w-5 h-5 text-[#2c3e50]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2c3e50] mb-2">Pointillism</h3>
                <p className="font-serif text-sm text-[#2c3e50]/45 leading-relaxed">
                  Small distinct dots of color placed side by side, letting the
                  viewer&apos;s eye blend them at distance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons - Paint tube palette */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#2c3e50] tracking-wide mb-2 text-center">
            Controls
          </h2>
          <p className="text-[#2c3e50]/35 font-serif text-sm tracking-[0.15em] mb-12 text-center">
            Paint Tube Buttons
          </p>

          <div className="p-10 bg-[#f5f0e1] border border-[#e8a87c]/25 rounded-lg" style={{ boxShadow: "0 4px 0 rgba(192,57,43,0.10), 0 8px 24px rgba(44,62,80,0.06)", backgroundImage: "repeating-linear-gradient(15deg, transparent, transparent 20px, rgba(232,168,124,0.015) 20px, transparent 21px)" }}>
            <div className="flex flex-wrap gap-5 justify-center">
              <button className="px-8 py-3.5 bg-[#e8a87c] text-[#2c3e50] font-serif font-bold tracking-wide rounded-lg hover:brightness-110 active:translate-y-[2px] transition-all duration-300" style={{ boxShadow: "0 3px 0 #c0392b, 0 5px 12px rgba(232,168,124,0.25)" }}>
                Warm Orange
              </button>
              <button className="px-8 py-3.5 bg-[#2c3e50] text-[#f5f0e1] font-serif font-bold tracking-wide rounded-lg hover:brightness-110 active:translate-y-[2px] transition-all duration-300" style={{ boxShadow: "0 3px 0 #1abc9c, 0 5px 12px rgba(44,62,80,0.25)" }}>
                Deep Blue
              </button>
              <button className="px-8 py-3.5 bg-[#c0392b] text-[#f5f0e1] font-serif font-bold tracking-wide rounded-lg hover:brightness-110 active:translate-y-[2px] transition-all duration-300" style={{ boxShadow: "0 3px 0 #2c3e50, 0 5px 12px rgba(192,57,43,0.25)" }}>
                Vermillion
              </button>
              <button className="px-8 py-3.5 bg-transparent text-[#e8a87c] border-2 border-[#e8a87c] font-serif font-bold tracking-wide rounded-lg hover:bg-[#e8a87c]/10 transition-all duration-300">
                Outline
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form - Artist atelier register */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="relative p-10 bg-[#f5f0e1] border border-[#e8a87c]/25 rounded-lg" style={{ boxShadow: "0 4px 0 rgba(192,57,43,0.10), 0 8px 24px rgba(44,62,80,0.08)", backgroundImage: "repeating-linear-gradient(20deg, transparent, transparent 18px, rgba(232,168,124,0.015) 18px, transparent 19px)" }}>
            {/* Dappled light on form */}
            <div className="absolute top-8 right-8 w-24 h-24 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,216,138,0.10) 0%, transparent 70%)" }} />

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)", boxShadow: "0 2px 0 #c0392b" }}>
                <Layers className="w-6 h-6 text-[#2c3e50]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#2c3e50]">Atelier Register</h3>
                <p className="font-serif text-xs text-[#2c3e50]/40">Join the studio</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-serif font-bold text-[#e8a87c] tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-5 py-3.5 bg-[#f5f0e1] border-2 border-[#e8a87c]/25 rounded-lg text-[#2c3e50] placeholder-[#2c3e50]/30 font-serif focus:border-[#e8a87c] focus:outline-none transition-all duration-300"
                  style={{ boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-bold text-[#1abc9c] tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full px-5 py-3.5 bg-[#f5f0e1] border-2 border-[#1abc9c]/25 rounded-lg text-[#2c3e50] placeholder-[#2c3e50]/30 font-serif focus:border-[#1abc9c] focus:outline-none transition-all duration-300"
                  style={{ boxShadow: "inset 0 2px 4px rgba(44,62,80,0.04)" }}
                />
              </div>
              <button className="w-full py-4 font-serif font-bold tracking-wide rounded-lg text-[#2c3e50] hover:brightness-110 active:translate-y-[2px] transition-all duration-300" style={{ background: "linear-gradient(135deg, #e8a87c 0%, #daa070 100%)", boxShadow: "0 3px 0 #c0392b, 0 5px 12px rgba(232,168,124,0.25)" }}>
                Begin Painting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Brushstroke divider */}
          <div className="h-1 mb-8 mx-auto max-w-xs rounded-full" style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(232,168,124,0.20) 4px, transparent 5px)" }} />
          <p className="text-[#2c3e50]/35 text-sm font-serif tracking-wide">
            Impressionist Oil Showcase -- Part of{" "}
            <Link href="/" className="text-[#e8a87c]/70 hover:text-[#e8a87c] transition-colors duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
