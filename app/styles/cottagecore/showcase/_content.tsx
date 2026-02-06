"use client";

import Link from "next/link";
import { ArrowLeft, Flower2, Leaf, Cherry, Heart } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Grass Green", hex: "#5a8f5a", bg: "bg-[#5a8f5a]" },
  { name: "Daisy Yellow", hex: "#f5d75f", bg: "bg-[#f5d75f]" },
  { name: "Earth Brown", hex: "#8b7355", bg: "bg-[#8b7355]" },
  { name: "Flower Pink", hex: "#d4a0a0", bg: "bg-[#d4a0a0]" },
  { name: "Cream", hex: "#faf6f0", bg: "bg-[#faf6f0]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6f0] via-[#f5d75f]/5 to-[#d4a0a0]/10 relative overflow-hidden">
      {/* Decorative floral dots */}
      <div className="fixed top-20 left-10 w-4 h-4 rounded-full bg-[#d4a0a0]/20 pointer-events-none" />
      <div className="fixed top-40 right-20 w-6 h-6 rounded-full bg-[#5a8f5a]/15 pointer-events-none" />
      <div className="fixed bottom-40 left-1/4 w-5 h-5 rounded-full bg-[#f5d75f]/20 pointer-events-none" />
      <div className="fixed top-60 right-1/3 w-3 h-3 rounded-full bg-[#d4a0a0]/25 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#d4a0a0]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cottagecore"
            className="flex items-center gap-2 text-[#5a8f5a] hover:text-[#5a8f5a]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#8b7355]">
            Cottagecore
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#d4a0a0]/40 text-[#8b7355] font-serif rounded-full shadow-sm hover:bg-[#d4a0a0]/10 hover:shadow-md transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Cottagecore"
        description="A simpler life among wildflowers and warm hearths"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-serif text-[#8b7355] mb-6"
        descriptionClassName="text-xl text-[#8b7355]/70 font-serif max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#5a8f5a] text-white font-serif rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Gather
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-[#8b7355]/40 text-[#8b7355] font-serif rounded-full hover:bg-[#8b7355]/10 hover:border-[#8b7355]/60 transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Warm earth tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#8b7355] mb-4 text-center"
        subtitleClassName="text-[#8b7355]/60 font-serif mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#d4a0a0]/30 bg-white/60 rounded-2xl shadow-sm"
            labelClassName="font-serif text-sm text-[#8b7355]"
            hexClassName="text-xs text-[#8b7355]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Soft and rounded"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#8b7355] mb-4 text-center"
        subtitleClassName="text-[#8b7355]/60 font-serif mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/50 backdrop-blur-sm border border-[#d4a0a0]/30 rounded-2xl shadow-sm">
            <p className="text-sm font-serif text-[#5a8f5a] mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#5a8f5a] text-white font-serif rounded-full shadow-md hover:shadow-lg transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#f5d75f]/20 text-[#8b7355] border border-[#8b7355]/40 font-serif rounded-full hover:bg-[#f5d75f]/30 transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#5a8f5a]/50 text-[#5a8f5a] font-serif rounded-full hover:bg-[#5a8f5a]/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#d4a0a0] text-white font-serif rounded-full shadow-md hover:shadow-lg transition-all">
                Floral
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Warm and cozy"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#8b7355] mb-4 text-center"
        subtitleClassName="text-[#8b7355]/60 font-serif mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#d4a0a0]/20 rounded-full flex items-center justify-center mb-4">
              <Flower2 className="w-7 h-7 text-[#d4a0a0]" />
            </div>
            <h3 className="text-xl font-serif text-[#8b7355] mb-2">
              Wildflower Garden
            </h3>
            <p className="text-[#8b7355]/60 font-serif">Where daisies and lavender dance in the breeze</p>
          </div>

          <div className="p-6 bg-[#faf6f0] border border-[#5a8f5a]/30 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#5a8f5a]/15 rounded-full flex items-center justify-center mb-4">
              <Leaf className="w-7 h-7 text-[#5a8f5a]" />
            </div>
            <h3 className="text-xl font-serif text-[#8b7355] mb-2">
              Herb Patch
            </h3>
            <p className="text-[#8b7355]/60 font-serif">Rosemary and thyme under morning dew</p>
          </div>

          <div className="p-6 bg-[#faf6f0] border border-[#f5d75f]/40 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#f5d75f]/20 rounded-full flex items-center justify-center mb-4">
              <Cherry className="w-7 h-7 text-[#8b7355]" />
            </div>
            <h3 className="text-xl font-serif text-[#8b7355] mb-2">
              Berry Preserves
            </h3>
            <p className="text-[#8b7355]/60 font-serif">Homemade jam on fresh sourdough</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Gentle inputs"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#8b7355] mb-4 text-center"
        subtitleClassName="text-[#8b7355]/60 font-serif mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-2xl shadow-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#5a8f5a]/15 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-[#d4a0a0]" />
              </div>
              <h3 className="text-xl font-serif text-[#8b7355]">Write a Letter</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-serif text-[#8b7355] mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Dear friend..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#8b7355]/30 rounded-xl text-[#8b7355] placeholder-[#8b7355]/40 font-serif focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-serif text-[#d4a0a0] mb-2">Your Message</label>
                <input
                  type="text"
                  placeholder="Thinking of you..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#d4a0a0]/40 rounded-xl text-[#8b7355] placeholder-[#d4a0a0]/50 font-serif focus:border-[#d4a0a0]/60 focus:shadow-[0_0_12px_rgba(212,160,160,0.2)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#5a8f5a] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                Send with Love
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#d4a0a0]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#8b7355]/50 text-sm font-serif">
            Cottagecore Showcase · Part of{" "}
            <Link href="/" className="text-[#5a8f5a] hover:text-[#5a8f5a]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
