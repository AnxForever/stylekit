"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Star, Heart } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Silver", hex: "#c0c0c0", bg: "bg-[#c0c0c0]" },
  { name: "Hot Pink", hex: "#ff69b4", bg: "bg-[#ff69b4]" },
  { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]" },
  { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]" },
  { name: "Sky Blue", hex: "#87ceeb", bg: "bg-[#87ceeb]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-cyan-100 relative overflow-hidden">
      {/* Floating bubbles */}
      <div className="fixed top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/50 to-transparent blur-xl pointer-events-none" />
      <div className="fixed bottom-32 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-200/50 to-transparent blur-xl pointer-events-none" />
      <div className="fixed top-1/2 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-purple-200/40 to-transparent blur-xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md border-b border-white/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/y2k"
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
            Y2K
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full text-white font-medium shadow-[0_4px_15px_rgba(255,105,180,0.3)] hover:shadow-[0_6px_20px_rgba(255,105,180,0.4)] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Y2K AESTHETIC"
        description="The future is bright and shiny - 鍗冪Η骞寸殑鏈潵涓讳箟缇庡"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6"
        descriptionClassName="text-xl text-gray-500 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full text-white font-bold shadow-[0_4px_20px_rgba(255,105,180,0.4)] hover:shadow-[0_6px_30px_rgba(255,105,180,0.6)] hover:scale-105 transition-all duration-300">
            Enter the Future
          </button>
          <button className="px-8 py-4 bg-gradient-to-b from-gray-200 via-white to-gray-300 rounded-full text-gray-700 font-bold border border-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_3px_rgba(255,255,255,0.8)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="褰╄櫣娓愬彉涓庨噾灞炲厜娉?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            labelClassName="font-bold text-sm text-gray-700"
            hexClassName="text-xs text-pink-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="閲戝睘鍏夋辰涓庡僵铏规笎鍙?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-white/60 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <p className="text-sm font-bold text-pink-500 uppercase tracking-wide mb-6">鏍峰紡</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(255,105,180,0.4)] hover:scale-105 transition-all">
                Rainbow
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-gray-200 via-white to-gray-300 rounded-full text-gray-700 font-bold border border-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_3px_rgba(255,255,255,0.8)] hover:scale-105 transition-all">
                Metallic
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(255,105,180,0.4)] hover:scale-105 transition-all">
                Pink
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(0,255,255,0.4)] hover:scale-105 transition-all">
                Cyan
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="閫忔槑姘旀场鎰?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-white/60 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(255,105,180,0.4)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              Sparkle
            </h3>
            <p className="text-gray-600">Shiny and bright effects</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-white/60 to-cyan-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,255,255,0.4)]">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-2">
              Star
            </h3>
            <p className="text-gray-600">Futuristic vibes</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-white/60 to-purple-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(255,0,255,0.4)]">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
              Love
            </h3>
            <p className="text-gray-600">Sweet millennium dreams</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 bg-gradient-to-b from-transparent to-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Y2K Showcase 路 Part of{" "}
            <Link href="/" className="text-pink-500 hover:text-pink-600 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

