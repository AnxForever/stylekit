"use client";

import Link from "next/link";
import { ArrowLeft, Feather, Droplets, Cloud, Flower2 } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sky Blue", hex: "#64b5f6", bg: "bg-[#64b5f6]" },
  { name: "Mint Green", hex: "#98d8c8", bg: "bg-[#98d8c8]" },
  { name: "Gentle Pink", hex: "#ffb7c5", bg: "bg-[#ffb7c5]" },
  { name: "Powder Blue", hex: "#b8d4e3", bg: "bg-[#b8d4e3]" },
  { name: "Rice White", hex: "#fafaf8", bg: "bg-[#fafaf8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fafaf8] relative overflow-hidden">
      {/* Soft decorative shapes */}
      <div className="fixed top-20 right-16 w-48 h-48 rounded-full bg-[#64b5f6]/5 pointer-events-none" />
      <div className="fixed top-40 right-28 w-36 h-36 rounded-full bg-[#98d8c8]/5 pointer-events-none" />
      <div className="fixed bottom-32 left-12 w-40 h-40 rounded-full bg-[#ffb7c5]/5 pointer-events-none" />
      <div className="fixed bottom-16 left-24 w-32 h-32 rounded-full bg-[#b8d4e3]/5 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#e8e8e4]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/japanese-fresh"
            className="flex items-center gap-2 text-[#64b5f6] hover:text-[#64b5f6]/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-light tracking-wide text-sm">Back to Docs</span>
          </Link>
          <span className="font-light text-lg text-[#4a5568] tracking-wide">
            Japanese Fresh
          </span>
          <Link
            href="/styles"
            className="px-4 py-1.5 border border-[#b8d4e3]/50 text-[#5a8fa8] font-light tracking-wide text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Japanese Fresh"
        description="Clean, gentle, and healing -- a design that breathes"
        className="relative z-10 pt-24 pb-20 px-6 text-center"
        titleClassName="text-4xl md:text-6xl font-light text-[#4a5568] mb-4"
        descriptionClassName="text-base text-[#a0aec0] font-light max-w-lg mx-auto mb-12 leading-relaxed"
      >
        <div className="relative inline-block mb-8">
          <span className="text-lg md:text-xl font-light text-[#98d8c8] tracking-widest">
            light, soft, pure
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-8 py-2.5 bg-[#64b5f6] text-white font-light tracking-wide rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            Explore
          </button>
          <button className="px-8 py-2.5 bg-white text-[#5a8fa8] font-light tracking-wide rounded-lg border border-[#b8d4e3] shadow-sm hover:shadow-md transition-all duration-300">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Gentle Tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5568] mb-3 text-center"
        subtitleClassName="text-[#a0aec0] font-light tracking-wide mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#e8e8e4] bg-white rounded-xl shadow-sm"
            labelClassName="font-light text-sm text-[#4a5568]"
            hexClassName="text-xs text-[#a0aec0] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Gentle Interactions"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5568] mb-3 text-center"
        subtitleClassName="text-[#a0aec0] font-light tracking-wide mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-xl border border-[#e8e8e4] shadow-sm">
            <p className="text-sm font-light text-[#64b5f6] tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-[#64b5f6] text-white font-light tracking-wide rounded-lg border border-[#b8d4e3]/50 shadow-sm hover:shadow-md transition-all duration-300">
                Sky Blue
              </button>
              <button className="px-6 py-2.5 bg-[#98d8c8] text-white font-light tracking-wide rounded-lg border border-[#98d8c8]/50 shadow-sm hover:shadow-md transition-all duration-300">
                Mint
              </button>
              <button className="px-6 py-2.5 bg-white text-[#5a8fa8] font-light tracking-wide rounded-lg border border-[#b8d4e3] shadow-sm hover:shadow-md transition-all duration-300">
                Outline
              </button>
              <button className="px-6 py-2.5 bg-[#ffb7c5] text-white font-light tracking-wide rounded-lg border border-[#ffb7c5]/50 shadow-sm hover:shadow-md transition-all duration-300">
                Pink
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Clean Containers"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5568] mb-3 text-center"
        subtitleClassName="text-[#a0aec0] font-light tracking-wide mb-10 text-center text-sm"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-[#e8e8e4] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-[#64b5f6]/10 rounded-lg flex items-center justify-center mb-4">
              <Feather className="w-5 h-5 text-[#64b5f6]" />
            </div>
            <h3 className="text-lg font-normal text-[#4a5568] mb-2">
              Lightness
            </h3>
            <p className="text-[#a0aec0] text-sm font-light leading-relaxed">Airy and weightless design that floats</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#98d8c8]/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-[#98d8c8]/10 rounded-lg flex items-center justify-center mb-4">
              <Droplets className="w-5 h-5 text-[#98d8c8]" />
            </div>
            <h3 className="text-lg font-normal text-[#4a5568] mb-2">
              Freshness
            </h3>
            <p className="text-[#a0aec0] text-sm font-light leading-relaxed">Clean like morning dew on petals</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#ffb7c5]/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-10 h-10 bg-[#ffb7c5]/10 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="w-5 h-5 text-[#ffb7c5]" />
            </div>
            <h3 className="text-lg font-normal text-[#4a5568] mb-2">
              Softness
            </h3>
            <p className="text-[#a0aec0] text-sm font-light leading-relaxed">Gentle to the eyes and the soul</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Gentle Input"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5568] mb-3 text-center"
        subtitleClassName="text-[#a0aec0] font-light tracking-wide mb-10 text-center text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white rounded-xl border border-[#e8e8e4] shadow-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto bg-[#98d8c8]/10 rounded-lg flex items-center justify-center mb-4">
                <Flower2 className="w-6 h-6 text-[#98d8c8]" />
              </div>
              <h3 className="text-lg font-normal text-[#4a5568]">Subscribe</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-light text-[#64b5f6] tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#e8e8e4] text-[#4a5568] placeholder-[#a0aec0]/60 font-light focus:border-[#64b5f6] focus:shadow-[0_0_0_3px_rgba(100,181,246,0.1)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-light text-[#98d8c8] tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#e8e8e4] text-[#4a5568] placeholder-[#a0aec0]/60 font-light focus:border-[#98d8c8] focus:shadow-[0_0_0_3px_rgba(152,216,200,0.1)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="w-full px-6 py-2.5 bg-[#64b5f6] text-white font-light tracking-wide rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#e8e8e4]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#a0aec0] text-sm font-light tracking-wide">
            Japanese Fresh Showcase · Part of{" "}
            <Link href="/" className="text-[#64b5f6] hover:text-[#64b5f6]/70 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
