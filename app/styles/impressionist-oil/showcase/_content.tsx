"use client";

import Link from "next/link";
import { ArrowLeft, Sun, Paintbrush, Eye, Layers } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Warm Orange", hex: "#e8a87c", bg: "bg-[#e8a87c]" },
  { name: "Vermillion Red", hex: "#c0392b", bg: "bg-[#c0392b]" },
  { name: "Deep Blue", hex: "#2c3e50", bg: "bg-[#2c3e50]" },
  { name: "Turquoise Green", hex: "#1abc9c", bg: "bg-[#1abc9c]" },
  { name: "Canvas Cream", hex: "#f5f0e1", bg: "bg-[#f5f0e1]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e1] relative overflow-hidden">
      {/* Decorative brushstroke shapes */}
      <div className="fixed top-10 right-10 w-64 h-64 bg-[#e8a87c]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="fixed top-40 right-40 w-48 h-48 bg-[#c0392b]/8 rounded-full blur-2xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-56 h-56 bg-[#1abc9c]/8 rounded-full blur-2xl pointer-events-none" />
      <div className="fixed bottom-40 left-32 w-40 h-40 bg-[#2c3e50]/6 rounded-full blur-2xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#e8a87c]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/impressionist-oil"
            className="flex items-center gap-2 text-[#e8a87c] hover:text-[#e8a87c]/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif font-bold tracking-wide">Back to Docs</span>
          </Link>
          <span className="font-serif font-bold text-xl text-[#e8a87c] tracking-wide">
            Impressionist Oil
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#e8a87c]/30 text-[#2c3e50] font-serif font-bold tracking-wide rounded-lg shadow-[0_2px_0_#c0392b,0_3px_8px_rgba(232,168,124,0.2)] hover:brightness-110 transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Impression"
        description="Bold strokes of light and shadow dance across the canvas at golden hour"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif font-bold text-[#e8a87c] mb-4"
        descriptionClassName="text-lg text-[#2c3e50]/50 font-serif max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-serif font-bold text-[#2c3e50]">
            Soleil Levant
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#e8a87c] text-[#2c3e50] font-serif font-bold tracking-wide rounded-lg shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)] hover:brightness-110 hover:shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.4)] active:translate-y-[2px] active:shadow-[0_1px_0_#c0392b] transition-all duration-300">
            Paint
          </button>
          <button className="px-10 py-4 bg-[#2c3e50] text-[#f5f0e1] font-serif font-bold tracking-wide rounded-lg shadow-[0_3px_0_#1abc9c,0_4px_12px_rgba(44,62,80,0.3)] hover:brightness-110 hover:shadow-[0_4px_0_#1abc9c,0_6px_16px_rgba(44,62,80,0.4)] active:translate-y-[2px] active:shadow-[0_1px_0_#1abc9c] transition-all duration-300">
            Gallery
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Palette"
        subtitle="Warm Tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2c3e50] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#2c3e50]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#e8a87c]/20 bg-[#f5f0e1] rounded-lg shadow-[0_2px_0_#c0392b,0_3px_8px_rgba(232,168,124,0.1)]"
            labelClassName="font-serif font-bold text-sm text-[#2c3e50]"
            hexClassName="text-xs text-[#e8a87c] font-serif"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Impasto Layers"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2c3e50] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#2c3e50]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f5f0e1] border border-[#e8a87c]/20 rounded-lg shadow-[0_2px_8px_rgba(44,62,80,0.08)]">
            <p className="text-sm font-serif font-bold text-[#e8a87c] tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3.5 bg-[#e8a87c] text-[#2c3e50] font-serif font-bold tracking-wide rounded-lg shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#c0392b] transition-all duration-300">
                Warm
              </button>
              <button className="px-7 py-3.5 bg-[#2c3e50] text-[#f5f0e1] font-serif font-bold tracking-wide rounded-lg shadow-[0_3px_0_#1abc9c,0_4px_12px_rgba(44,62,80,0.3)] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#1abc9c] transition-all duration-300">
                Deep
              </button>
              <button className="px-7 py-3.5 bg-transparent text-[#e8a87c] border-2 border-[#e8a87c] font-serif font-bold tracking-wide rounded-lg hover:bg-[#e8a87c]/10 transition-all duration-300">
                Outline
              </button>
              <button className="px-7 py-3.5 bg-[#c0392b] text-[#f5f0e1] font-serif font-bold tracking-wide rounded-lg shadow-[0_3px_0_#2c3e50,0_4px_12px_rgba(192,57,43,0.3)] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#2c3e50] transition-all duration-300">
                Vermillion
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Canvas Textures"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2c3e50] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#2c3e50]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#f5f0e1] border border-[#e8a87c]/30 rounded-lg shadow-[0_2px_8px_rgba(44,62,80,0.1)] hover:shadow-[0_6px_20px_rgba(44,62,80,0.15)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#e8a87c]/20 rounded-lg flex items-center justify-center mb-4">
              <Sun className="w-7 h-7 text-[#e8a87c]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2c3e50] mb-2">
              Light
            </h3>
            <p className="text-[#2c3e50]/50 font-serif text-sm">Capturing fleeting moments of golden sunlight</p>
          </div>

          <div className="p-6 bg-[#f5f0e1] border border-[#c0392b]/20 rounded-lg shadow-[0_2px_8px_rgba(192,57,43,0.1)] hover:shadow-[0_6px_20px_rgba(192,57,43,0.15)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#c0392b]/15 rounded-lg flex items-center justify-center mb-4">
              <Paintbrush className="w-7 h-7 text-[#c0392b]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2c3e50] mb-2">
              Stroke
            </h3>
            <p className="text-[#2c3e50]/50 font-serif text-sm">Bold, visible brushwork builds rich texture</p>
          </div>

          <div className="p-6 bg-[#f5f0e1] border border-[#1abc9c]/20 rounded-lg shadow-[0_2px_8px_rgba(26,188,156,0.1)] hover:shadow-[0_6px_20px_rgba(26,188,156,0.15)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#1abc9c]/15 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-7 h-7 text-[#1abc9c]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2c3e50] mb-2">
              Observe
            </h3>
            <p className="text-[#2c3e50]/50 font-serif text-sm">The eye completes what the brush suggests</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Artist Details"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2c3e50] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#2c3e50]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#f5f0e1] border border-[#e8a87c]/30 rounded-lg shadow-[0_2px_8px_rgba(44,62,80,0.1)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#e8a87c]/20 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-8 h-8 text-[#e8a87c]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2c3e50]">Register</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold text-[#e8a87c] tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name..."
                  className="w-full px-5 py-3 bg-[#f5f0e1] border-2 border-[#e8a87c]/30 rounded-lg text-[#2c3e50] placeholder-[#2c3e50]/40 font-serif focus:border-[#e8a87c] focus:shadow-[0_0_0_3px_rgba(232,168,124,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-bold text-[#1abc9c] tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full px-5 py-3 bg-[#f5f0e1] border-2 border-[#1abc9c]/30 rounded-lg text-[#2c3e50] placeholder-[#2c3e50]/40 font-serif focus:border-[#1abc9c] focus:shadow-[0_0_0_3px_rgba(26,188,156,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="w-full px-7 py-3.5 bg-[#e8a87c] text-[#2c3e50] font-serif font-bold tracking-wide rounded-lg shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#c0392b] transition-all duration-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#e8a87c]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#2c3e50]/40 text-sm font-serif tracking-wide">
            Impressionist Oil Showcase -- Part of{" "}
            <Link href="/" className="text-[#e8a87c] hover:text-[#e8a87c]/70 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
