"use client";

import Link from "next/link";
import { ArrowLeft, Church, Crown, Shield, Flame } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Purple", hex: "#2d1b4e", bg: "bg-[#2d1b4e]" },
  { name: "Blood Red", hex: "#8b1a1a", bg: "bg-[#8b1a1a]" },
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Gold", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Dark Violet", hex: "#4a2d6e", bg: "bg-[#4a2d6e]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e]/30 to-[#0a0a0a] relative overflow-hidden">
      {/* Radial gold glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#c9a227]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/gothic"
            className="flex items-center gap-2 text-[#c9a227]/70 hover:text-[#c9a227] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif uppercase tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#c9a227] uppercase tracking-wider">
            GOTHIC
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#c9a227]/30 text-[#c9a227]/70 font-serif uppercase tracking-wider hover:border-[#c9a227]/60 hover:text-[#c9a227] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="GOTHIC"
        description="In tenebris lux -- the solemn beauty of cathedrals and medieval manuscripts"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif text-[#c9a227] mb-6 tracking-wider"
        descriptionClassName="text-lg text-[#c9a227]/50 max-w-2xl mx-auto mb-10 font-serif"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#2d1b4e] border-2 border-[#c9a227]/60 text-[#c9a227] font-serif uppercase tracking-widest shadow-[0_4px_16px_rgba(45,27,78,0.6)] hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)] hover:border-[#c9a227] transition-all duration-300">
            Enter
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-[#8b1a1a]/50 text-[#8b1a1a] font-serif uppercase tracking-widest hover:border-[#8b1a1a] hover:shadow-[0_4px_16px_rgba(139,26,26,0.3)] transition-all duration-300">
            Descend
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="Tenebrae et Aurum"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#c9a227] mb-4 text-center tracking-wider"
        subtitleClassName="text-[#c9a227]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#c9a227]/20 bg-[#0a0a0a]/80 shadow-[0_4px_16px_rgba(10,10,10,0.6)]"
            labelClassName="font-serif text-sm text-[#c9a227]"
            hexClassName="text-xs text-[#c9a227]/50 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="Cathedral Controls"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#c9a227] mb-4 text-center tracking-wider"
        subtitleClassName="text-[#c9a227]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a]/90 border-2 border-[#c9a227]/20 shadow-[0_4px_20px_rgba(10,10,10,0.8)]">
            <p className="text-sm font-serif text-[#c9a227]/60 uppercase tracking-wider mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#2d1b4e] border-2 border-[#c9a227]/60 text-[#c9a227] font-serif uppercase tracking-widest shadow-[0_4px_16px_rgba(45,27,78,0.6)] hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#0a0a0a] border-2 border-[#8b1a1a]/60 text-[#8b1a1a] font-serif uppercase tracking-widest shadow-[0_4px_12px_rgba(139,26,26,0.4)] hover:border-[#8b1a1a] transition-all">
                Blood
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#c9a227]/40 text-[#c9a227] font-serif uppercase tracking-widest hover:border-[#c9a227] transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#c9a227]/60 font-serif uppercase tracking-widest hover:text-[#c9a227] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="Sanctum Panels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#c9a227] mb-4 text-center tracking-wider"
        subtitleClassName="text-[#c9a227]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a]/90 border-2 border-[#c9a227]/30 shadow-[0_4px_20px_rgba(10,10,10,0.8)]">
            <div className="w-16 h-16 bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center mb-4">
              <Church className="w-8 h-8 text-[#c9a227]" />
            </div>
            <h3 className="text-xl font-serif text-[#c9a227] mb-2 tracking-wider">
              Cathedral
            </h3>
            <p className="text-[#c9a227]/50 font-serif">Soaring arches and sacred light</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/90 border-2 border-[#8b1a1a]/30 shadow-[0_4px_20px_rgba(139,26,26,0.2)]">
            <div className="w-16 h-16 bg-[#8b1a1a]/20 border-2 border-[#8b1a1a]/40 flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-[#8b1a1a]" />
            </div>
            <h3 className="text-xl font-serif text-[#8b1a1a] mb-2 tracking-wider">
              Monarchy
            </h3>
            <p className="text-[#8b1a1a]/50 font-serif">The weight of the crown</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/90 border-2 border-[#4a2d6e]/40 shadow-[0_4px_20px_rgba(74,45,110,0.3)]">
            <div className="w-16 h-16 bg-[#4a2d6e]/30 border-2 border-[#4a2d6e]/40 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-[#c9a227]" />
            </div>
            <h3 className="text-xl font-serif text-[#c9a227] mb-2 tracking-wider">
              Heraldry
            </h3>
            <p className="text-[#c9a227]/50 font-serif">Noble lineage and sigils</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="表单"
        subtitle="Inscribed Scrolls"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#c9a227] mb-4 text-center tracking-wider"
        subtitleClassName="text-[#c9a227]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a]/90 border-2 border-[#c9a227]/20 shadow-[0_4px_20px_rgba(10,10,10,0.8)]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center mb-4">
                <Flame className="w-10 h-10 text-[#c9a227]" />
              </div>
              <h3 className="text-xl font-serif text-[#c9a227] tracking-wider">Sanctum</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#c9a227]/60 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Inscribe here..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/30 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.3)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#8b1a1a]/60 uppercase tracking-wider mb-2">Sigil</label>
                <input
                  type="text"
                  placeholder="Your mark..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#8b1a1a]/30 text-[#8b1a1a] placeholder-[#8b1a1a]/30 font-serif focus:border-[#8b1a1a] focus:shadow-[0_0_16px_rgba(139,26,26,0.3)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#2d1b4e] border-2 border-[#c9a227]/60 text-[#c9a227] font-serif uppercase tracking-widest shadow-[0_4px_16px_rgba(45,27,78,0.6)] hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#c9a227]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#c9a227]/40 text-sm font-serif">
            Gothic Showcase · Part of{" "}
            <Link href="/" className="text-[#c9a227]/60 hover:text-[#c9a227] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
