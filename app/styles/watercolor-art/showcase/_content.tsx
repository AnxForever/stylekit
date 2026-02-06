"use client";

import Link from "next/link";
import { ArrowLeft, Droplets, Palette, Brush, Feather } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Blush Pink", hex: "#d4a0a0", bg: "bg-[#d4a0a0]" },
  { name: "Sky Blue", hex: "#87ceeb", bg: "bg-[#87ceeb]" },
  { name: "Mint Green", hex: "#98d8c8", bg: "bg-[#98d8c8]" },
  { name: "Watercolor Purple", hex: "#c3b1e1", bg: "bg-[#c3b1e1]" },
  { name: "Warm Paper", hex: "#faf8f5", bg: "bg-[#faf8f5]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#faf8f5] relative overflow-hidden">
      {/* Decorative watercolor washes */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#d4a0a0]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-32 right-20 w-64 h-64 bg-[#87ceeb]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-80 h-80 bg-[#98d8c8]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 left-20 w-48 h-48 bg-[#c3b1e1]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#d4a0a0]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/watercolor-art"
            className="flex items-center gap-2 text-[#d4a0a0] hover:text-[#d4a0a0]/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif font-medium tracking-wide">Back to Docs</span>
          </Link>
          <span className="font-serif font-semibold text-xl text-[#d4a0a0] tracking-wide">
            Watercolor Art
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#d4a0a0]/30 text-[#4a3535] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_8px_rgba(212,160,160,0.15)] hover:shadow-[0_4px_12px_rgba(212,160,160,0.25)] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Watercolor"
        description="Soft washes of color bleeding into warm paper -- where every edge is a gentle suggestion"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif font-semibold text-[#d4a0a0] mb-4"
        descriptionClassName="text-lg text-[#4a3535]/50 font-serif max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-serif font-semibold text-[#87ceeb]/60">
            Art
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#d4a0a0]/70 text-[#4a3535] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_16px_rgba(212,160,160,0.3)] hover:opacity-90 hover:shadow-[0_4px_20px_rgba(212,160,160,0.4)] transition-all duration-300">
            Explore
          </button>
          <button className="px-10 py-4 bg-[#87ceeb]/50 text-[#2a4a5a] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_16px_rgba(135,206,235,0.3)] hover:opacity-90 hover:shadow-[0_4px_20px_rgba(135,206,235,0.4)] transition-all duration-300">
            Gallery
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Wash Palette"
        subtitle="Transparent Tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-semibold text-[#4a3535] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#4a3535]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#d4a0a0]/20 bg-[#faf8f5] rounded-xl shadow-[0_2px_12px_rgba(212,160,160,0.1)]"
            labelClassName="font-serif font-medium text-sm text-[#4a3535]"
            hexClassName="text-xs text-[#d4a0a0] font-serif"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Gentle Washes"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-semibold text-[#4a3535] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#4a3535]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#faf8f5] border border-[#d4a0a0]/20 rounded-2xl shadow-[0_2px_16px_rgba(212,160,160,0.1)]">
            <p className="text-sm font-serif font-medium text-[#d4a0a0] tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3 bg-[#d4a0a0]/70 text-[#4a3535] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_12px_rgba(212,160,160,0.3)] hover:opacity-90 transition-all duration-300">
                Blush
              </button>
              <button className="px-7 py-3 bg-[#87ceeb]/50 text-[#2a4a5a] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_12px_rgba(135,206,235,0.3)] hover:opacity-90 transition-all duration-300">
                Sky
              </button>
              <button className="px-7 py-3 bg-transparent text-[#d4a0a0] border border-[#d4a0a0]/40 font-serif font-medium tracking-wide rounded-xl hover:bg-[#d4a0a0]/10 transition-all duration-300">
                Outline
              </button>
              <button className="px-7 py-3 bg-[#98d8c8]/50 text-[#2a4a3a] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_12px_rgba(152,216,200,0.3)] hover:opacity-90 transition-all duration-300">
                Mint
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Paper Layers"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-semibold text-[#4a3535] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#4a3535]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#faf8f5] border border-[#d4a0a0]/20 rounded-2xl shadow-[0_2px_16px_rgba(212,160,160,0.15)] hover:shadow-[0_6px_24px_rgba(212,160,160,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#d4a0a0]/20 rounded-xl flex items-center justify-center mb-4">
              <Droplets className="w-7 h-7 text-[#d4a0a0]" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#4a3535] mb-2">
              Wash
            </h3>
            <p className="text-[#4a3535]/50 font-serif text-sm">Colors flow and bleed with graceful transparency</p>
          </div>

          <div className="p-6 bg-[#faf8f5] border border-[#87ceeb]/20 rounded-2xl shadow-[0_2px_16px_rgba(135,206,235,0.15)] hover:shadow-[0_6px_24px_rgba(135,206,235,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#87ceeb]/20 rounded-xl flex items-center justify-center mb-4">
              <Palette className="w-7 h-7 text-[#87ceeb]" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#4a3535] mb-2">
              Blend
            </h3>
            <p className="text-[#4a3535]/50 font-serif text-sm">Wet-on-wet technique creates soft transitions</p>
          </div>

          <div className="p-6 bg-[#faf8f5] border border-[#98d8c8]/20 rounded-2xl shadow-[0_2px_16px_rgba(152,216,200,0.15)] hover:shadow-[0_6px_24px_rgba(152,216,200,0.25)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#98d8c8]/20 rounded-xl flex items-center justify-center mb-4">
              <Feather className="w-7 h-7 text-[#98d8c8]" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#4a3535] mb-2">
              Breathe
            </h3>
            <p className="text-[#4a3535]/50 font-serif text-sm">Generous whitespace lets each element sing</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Soft Fields"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-semibold text-[#4a3535] tracking-wide mb-4 text-center"
        subtitleClassName="text-[#4a3535]/40 font-serif tracking-wide mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#faf8f5] border border-[#d4a0a0]/20 rounded-2xl shadow-[0_2px_16px_rgba(212,160,160,0.12)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#d4a0a0]/15 rounded-xl flex items-center justify-center mb-4">
                <Brush className="w-8 h-8 text-[#d4a0a0]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#4a3535]">Create</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-medium text-[#d4a0a0] tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-5 py-3 bg-[#faf8f5] border border-[#d4a0a0]/30 rounded-xl text-[#4a3535] placeholder-[#d4a0a0]/50 font-serif focus:border-[#d4a0a0]/60 focus:shadow-[0_0_12px_rgba(212,160,160,0.2)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-medium text-[#87ceeb] tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full px-5 py-3 bg-[#faf8f5] border border-[#87ceeb]/30 rounded-xl text-[#4a3535] placeholder-[#87ceeb]/50 font-serif focus:border-[#87ceeb]/60 focus:shadow-[0_0_12px_rgba(135,206,235,0.2)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="w-full px-7 py-3 bg-[#d4a0a0]/70 text-[#4a3535] font-serif font-medium tracking-wide rounded-xl shadow-[0_2px_12px_rgba(212,160,160,0.3)] hover:opacity-90 hover:shadow-[0_4px_16px_rgba(212,160,160,0.4)] transition-all duration-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#d4a0a0]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#4a3535]/40 text-sm font-serif tracking-wide">
            Watercolor Art Showcase -- Part of{" "}
            <Link href="/" className="text-[#d4a0a0] hover:text-[#d4a0a0]/70 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
