"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Star, Flower2, Sparkles } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sakura Pink", hex: "#ffb7c5", bg: "bg-[#ffb7c5]" },
  { name: "Pearl White", hex: "#fff5f7", bg: "bg-[#fff5f7]" },
  { name: "Lavender", hex: "#c4b5fd", bg: "bg-[#c4b5fd]" },
  { name: "Gold Sparkle", hex: "#fde68a", bg: "bg-[#fde68a]" },
  { name: "Rose", hex: "#fecdd3", bg: "bg-[#fecdd3]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f7] to-white relative overflow-hidden">
      {/* Decorative petal shapes */}
      <div className="fixed top-16 right-16 w-6 h-6 bg-[#ffb7c5]/30 rounded-[50%_0_50%_50%] rotate-45 pointer-events-none" />
      <div className="fixed top-32 right-32 w-4 h-4 bg-[#ffb7c5]/20 rounded-[50%_0_50%_50%] rotate-12 pointer-events-none" />
      <div className="fixed top-48 right-10 w-5 h-5 bg-[#c4b5fd]/25 rounded-[50%_0_50%_50%] -rotate-30 pointer-events-none" />
      <div className="fixed bottom-24 left-16 w-5 h-5 bg-[#ffb7c5]/25 rounded-[50%_0_50%_50%] rotate-60 pointer-events-none" />
      <div className="fixed bottom-40 left-8 w-4 h-4 bg-[#fecdd3]/30 rounded-[50%_0_50%_50%] rotate-90 pointer-events-none" />
      {/* Sparkle dots */}
      <div className="fixed top-40 left-20 w-2 h-2 bg-[#fde68a] rounded-full shadow-[0_0_6px_#fde68a] pointer-events-none" />
      <div className="fixed top-60 right-40 w-1.5 h-1.5 bg-[#fde68a] rounded-full shadow-[0_0_4px_#fde68a] pointer-events-none" />
      <div className="fixed bottom-60 right-24 w-2 h-2 bg-[#fde68a] rounded-full shadow-[0_0_6px_#fde68a] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#ffb7c5]/20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/shoujo-manga"
            className="flex items-center gap-2 text-[#ffb7c5] hover:text-[#ffb7c5]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-medium">Back to Docs</span>
          </Link>
          <span className="font-sans font-bold text-xl text-[#ffb7c5]">
            Shoujo Manga
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#ffb7c5]/30 text-[#ffb7c5] font-sans font-medium rounded-full shadow-[0_2px_10px_#ffb7c520] hover:shadow-[0_4px_15px_#ffb7c540] hover:scale-105 transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Shoujo"
        description="Where dreams bloom like cherry blossoms"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-sans font-bold text-[#ffb7c5] mb-2"
        descriptionClassName="text-lg text-[#c4b5fd] font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-3xl md:text-5xl font-sans font-bold text-[#c4b5fd]">
            Manga
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#ffb7c5] text-white font-sans font-medium rounded-full shadow-[0_4px_20px_#ffb7c560] hover:scale-105 hover:shadow-[0_6px_25px_#ffb7c580] transition-all duration-300">
            Begin Story
          </button>
          <button className="px-10 py-4 bg-white text-[#ffb7c5] font-sans font-medium rounded-full border-2 border-[#ffb7c5] hover:bg-[#ffb7c5] hover:text-white transition-all duration-300">
            Gallery
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Romantic Tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#ffb7c5] mb-4 text-center"
        subtitleClassName="text-[#c4b5fd] font-sans mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#ffb7c5]/20 bg-[#fff5f7] rounded-2xl shadow-[0_2px_10px_#ffb7c520]"
            labelClassName="font-sans font-medium text-sm text-[#4a5568]"
            hexClassName="text-xs text-[#ffb7c5] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Soft Interactions"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#ffb7c5] mb-4 text-center"
        subtitleClassName="text-[#c4b5fd] font-sans mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#fff5f7] border border-[#ffb7c5]/20 rounded-2xl shadow-[0_4px_20px_#ffb7c520]">
            <p className="text-sm font-sans text-[#c4b5fd] mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3 bg-[#ffb7c5] text-white font-sans font-medium rounded-full shadow-[0_4px_15px_#ffb7c560] hover:scale-105 hover:shadow-[0_6px_20px_#ffb7c580] transition-all duration-300">
                Sakura
              </button>
              <button className="px-7 py-3 bg-[#c4b5fd] text-white font-sans font-medium rounded-full shadow-[0_4px_15px_#c4b5fd60] hover:scale-105 hover:shadow-[0_6px_20px_#c4b5fd80] transition-all duration-300">
                Lavender
              </button>
              <button className="px-7 py-3 bg-transparent text-[#ffb7c5] border-2 border-[#ffb7c5] font-sans font-medium rounded-full hover:bg-[#ffb7c5] hover:text-white transition-all duration-300">
                Outline
              </button>
              <button className="px-7 py-3 bg-[#fde68a] text-[#4a5568] font-sans font-medium rounded-full shadow-[0_4px_15px_#fde68a60] hover:scale-105 hover:shadow-[0_6px_20px_#fde68a80] transition-all duration-300">
                Gold
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Dreamy Panels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#ffb7c5] mb-4 text-center"
        subtitleClassName="text-[#c4b5fd] font-sans mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#fff5f7] border border-[#ffb7c5]/30 rounded-2xl shadow-[0_4px_20px_#ffb7c520] hover:shadow-[0_8px_30px_#ffb7c540] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#ffb7c5]/20 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-[#ffb7c5]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#ffb7c5] mb-2">
              Romance
            </h3>
            <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">A love story written in cherry blossoms</p>
          </div>

          <div className="p-6 bg-[#fff5f7] border border-[#c4b5fd]/40 rounded-2xl shadow-[0_4px_20px_#c4b5fd20] hover:shadow-[0_8px_30px_#c4b5fd40] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#c4b5fd]/20 rounded-full flex items-center justify-center mb-4">
              <Star className="w-7 h-7 text-[#c4b5fd]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#c4b5fd] mb-2">
              Sparkle
            </h3>
            <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">Every moment shines with possibility</p>
          </div>

          <div className="p-6 bg-[#fff5f7] border border-[#fde68a]/50 rounded-2xl shadow-[0_4px_20px_#fde68a30] hover:shadow-[0_8px_30px_#fde68a50] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#fde68a]/20 rounded-full flex items-center justify-center mb-4">
              <Flower2 className="w-7 h-7 text-[#fde68a]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#fde68a] mb-2">
              Bloom
            </h3>
            <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">Petals dance in the spring breeze</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Love Letter"
        subtitle="Write Your Heart"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#ffb7c5] mb-4 text-center"
        subtitleClassName="text-[#c4b5fd] font-sans mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#fff5f7] border border-[#ffb7c5]/30 rounded-2xl shadow-[0_4px_20px_#ffb7c520]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#ffb7c5]/20 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#ffb7c5]" />
              </div>
              <h3 className="text-xl font-sans font-bold text-[#ffb7c5]">My Diary</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#ffb7c5] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-5 py-3 bg-white border border-[#ffb7c5]/30 rounded-full text-[#4a5568] placeholder-[#ffb7c5]/50 font-sans focus:border-[#ffb7c5] focus:shadow-[0_0_12px_#ffb7c540] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#c4b5fd] mb-2">Message</label>
                <input
                  type="text"
                  placeholder="Your feelings..."
                  className="w-full px-5 py-3 bg-white border border-[#c4b5fd]/30 rounded-full text-[#4a5568] placeholder-[#c4b5fd]/50 font-sans focus:border-[#c4b5fd] focus:shadow-[0_0_12px_#c4b5fd40] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-7 py-3 bg-[#ffb7c5] text-white font-sans font-medium rounded-full shadow-[0_4px_15px_#ffb7c560] hover:scale-105 hover:shadow-[0_6px_20px_#ffb7c580] transition-all duration-300">
                Send with Love
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#ffb7c5]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#4a5568]/40 text-sm font-sans">
            Shoujo Manga Showcase - Part of{" "}
            <Link href="/" className="text-[#ffb7c5] hover:text-[#ffb7c5]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
