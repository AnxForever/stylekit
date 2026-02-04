"use client";

import Link from "next/link";
import { ArrowLeft, Cloud, Leaf, Sun, Wind } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sage", hex: "#7cb9a8", bg: "bg-[#7cb9a8]" },
  { name: "Cream", hex: "#f4e4bc", bg: "bg-[#f4e4bc]" },
  { name: "Coral", hex: "#e8a87c", bg: "bg-[#e8a87c]" },
  { name: "Sky", hex: "#85cdca", bg: "bg-[#85cdca]" },
  { name: "Rose", hex: "#c38d94", bg: "bg-[#c38d94]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87ceeb] via-[#b4e4f5] to-[#f4e4bc] relative overflow-hidden">
      {/* Floating Clouds */}
      <div className="fixed top-20 left-10 w-32 h-16 bg-white/60 rounded-full blur-sm pointer-events-none" />
      <div className="fixed top-32 right-20 w-40 h-20 bg-white/50 rounded-full blur-sm pointer-events-none" />
      <div className="fixed top-16 right-40 w-24 h-12 bg-white/40 rounded-full blur-sm pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-white/30 backdrop-blur-sm border-b border-[#d4c49a]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/ghibli-style"
            className="flex items-center gap-2 text-[#5a4a3a] hover:text-[#7cb9a8] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Docs</span>
          </Link>
          <span className="font-semibold text-xl text-[#5a4a3a]">
            Ghibli Style
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white rounded-full shadow-[0_4px_10px_rgba(124,185,168,0.3)] hover:-translate-y-0.5 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="A World of Wonder"
        description="Where every journey begins with a single step into the magical unknown."
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-semibold text-[#5a4a3a] mb-6 leading-tight"
        descriptionClassName="text-xl text-[#7a6a5a] max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(124,185,168,0.5)] transition-all duration-300">
            Start Adventure
          </button>
          <button className="px-10 py-4 bg-white/60 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/40 hover:bg-white/80 transition-all duration-300">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Warm and dreamy"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#d4c49a]/30 shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
            labelClassName="font-semibold text-sm text-[#5a4a3a]"
            hexClassName="text-xs text-[#7a6a5a] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Soft and inviting"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-[#7a6a5a] mb-6">Button Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(124,185,168,0.4)] hover:-translate-y-0.5 transition-all">
                Primary
              </button>
              <button className="px-8 py-4 bg-gradient-to-b from-[#e8a87c] to-[#d49a6c] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(232,168,124,0.4)] hover:-translate-y-0.5 transition-all">
                Warm
              </button>
              <button className="px-8 py-4 bg-white/70 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/40 hover:bg-white transition-all">
                Secondary
              </button>
              <button className="px-8 py-4 text-[#7cb9a8] font-medium hover:text-[#5a9a8a] transition-all">
                Text
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Feature Cards */}
      <ShowcaseSection
        title="Features"
        subtitle="Natural elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#85cdca] to-[#7cb9a8] rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(133,205,202,0.4)]">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#5a4a3a] mb-2">Sky</h3>
            <p className="text-sm text-[#7a6a5a]">Dreamy clouds above</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(124,185,168,0.4)]">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#5a4a3a] mb-2">Nature</h3>
            <p className="text-sm text-[#7a6a5a]">Forest spirits dance</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(232,168,124,0.4)]">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#5a4a3a] mb-2">Warmth</h3>
            <p className="text-sm text-[#7a6a5a]">Golden sunset glow</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#c38d94] to-[#b07d84] rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(195,141,148,0.4)]">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#5a4a3a] mb-2">Wind</h3>
            <p className="text-sm text-[#7a6a5a]">Gentle breeze flows</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Input Form */}
      <ShowcaseSection
        title="Forms"
        subtitle="Soft and welcoming"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold text-[#5a4a3a] mb-6 text-center">Start Your Journey</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name..."
                className="w-full px-5 py-4 bg-white/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#7cb9a8] focus:bg-white/80 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your email..."
                className="w-full px-5 py-4 bg-white/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#7cb9a8] focus:bg-white/80 transition-all duration-300"
              />
              <textarea
                placeholder="Tell your story..."
                rows={4}
                className="w-full px-5 py-4 bg-white/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#7cb9a8] focus:bg-white/80 transition-all duration-300 resize-none"
              />
              <button className="w-full py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all duration-300">
                Begin Adventure
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 bg-[#f4e4bc]/50 backdrop-blur-sm border-t border-[#d4c49a]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#7a6a5a] text-sm">
            Ghibli Style Showcase{" "}
            <Link href="/" className="text-[#7cb9a8] hover:text-[#5a9a8a] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
