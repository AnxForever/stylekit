"use client";

import Link from "next/link";
import { ArrowLeft, Diamond, Crown, Gem } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Gold", hex: "#d4af37", bg: "bg-[#d4af37]" },
  { name: "Dark Navy", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Navy", hex: "#2d2d44", bg: "bg-[#2d2d44]" },
  { name: "Cream", hex: "#f5f5dc", bg: "bg-[#f5f5dc]" },
  { name: "Bronze", hex: "#c9a227", bg: "bg-[#c9a227]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Radial decoration */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/art-deco"
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif tracking-wider">Back</span>
          </Link>
          <span className="font-serif text-xl text-yellow-500 tracking-[0.2em]">
            ART DECO
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-yellow-500 text-yellow-500 font-serif tracking-wider hover:bg-yellow-500 hover:text-slate-900 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="ART DECO"
        description="The Golden Age of Design - 1920骞翠唬濂㈠崕涓庣幇浠ｇ殑瀹岀編铻嶅悎"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-serif text-yellow-500 mb-6 tracking-[0.2em]"
        descriptionClassName="text-xl text-gray-400 max-w-2xl mx-auto mb-10 tracking-wider"
      >
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.3em] border-2 border-yellow-400 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300">
            Discover
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 font-serif uppercase tracking-[0.3em] hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="閲戣壊涓庢繁鑹茬殑濂㈠崕缁勫悎"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-yellow-600/30 bg-slate-800/50 backdrop-blur-sm"
            labelClassName="font-serif text-sm text-yellow-400 tracking-wider"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="閲戣壊鍏夎姃涓庝紭闆呰竟妗?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500" />

            <p className="text-sm font-serif text-yellow-500 uppercase tracking-[0.3em] mb-6 text-center">Styles</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                Primary
              </button>
              <button className="px-8 py-3 bg-transparent border border-yellow-500 text-yellow-500 font-serif uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all">
                Outline
              </button>
              <button className="px-8 py-3 bg-slate-800 border border-yellow-600/30 text-yellow-400 font-serif uppercase tracking-[0.2em] hover:border-yellow-500 transition-all">
                Secondary
              </button>
              <button className="px-8 py-3 bg-transparent text-yellow-500/70 font-serif uppercase tracking-[0.2em] hover:text-yellow-400 transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="鍑犱綍杈规涓庡绉扮編瀛?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500" />

            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mb-4 mx-auto">
              <Diamond className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-serif text-yellow-500 text-center mb-2 tracking-wider">
              LUXURY
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-3" />
            <p className="text-gray-400 text-center text-sm">Timeless elegance</p>
          </div>

          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500" />

            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mb-4 mx-auto">
              <Crown className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-serif text-yellow-500 text-center mb-2 tracking-wider">
              PRESTIGE
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-3" />
            <p className="text-gray-400 text-center text-sm">Royal sophistication</p>
          </div>

          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500" />

            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mb-4 mx-auto">
              <Gem className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-serif text-yellow-500 text-center mb-2 tracking-wider">
              REFINED
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-3" />
            <p className="text-gray-400 text-center text-sm">Exquisite craftsmanship</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="琛ㄥ崟"
        subtitle="浼橀泤鐨勮緭鍏ョ粍浠?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500" />

            <h3 className="text-xl font-serif text-yellow-500 text-center mb-6 tracking-[0.2em]">CONTACT</h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-yellow-500 uppercase tracking-[0.2em] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-yellow-500 uppercase tracking-[0.2em] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-yellow-600/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-serif tracking-wider">
            Art Deco Showcase 路 Part of{" "}
            <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

