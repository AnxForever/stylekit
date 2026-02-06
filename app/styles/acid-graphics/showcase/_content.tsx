"use client";

import Link from "next/link";
import { ArrowLeft, Zap, Triangle, Hexagon, Eye } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Fluorescent Green", hex: "#39ff14", bg: "bg-[#39ff14]" },
  { name: "Acid Yellow", hex: "#e6ff00", bg: "bg-[#e6ff00]" },
  { name: "Electric Purple", hex: "#a020f0", bg: "bg-[#a020f0]" },
  { name: "Cyber Pink", hex: "#ff6ec7", bg: "bg-[#ff6ec7]" },
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative fluorescent shapes */}
      <div className="fixed top-10 right-20 w-32 h-32 bg-[#39ff14]/5 rotate-45 pointer-events-none" />
      <div className="fixed top-16 right-24 w-32 h-32 bg-[#a020f0]/5 rotate-12 pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-24 h-24 bg-[#ff6ec7]/5 -rotate-12 pointer-events-none" />
      <div className="fixed bottom-28 left-16 w-24 h-24 bg-[#e6ff00]/5 rotate-45 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#39ff14]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/acid-graphics"
            className="flex items-center gap-2 text-[#39ff14] hover:text-[#39ff14]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-widest text-sm">Back to Docs</span>
          </Link>
          <span className="font-mono font-black text-xl text-[#39ff14] uppercase tracking-widest">
            ACID_GFX
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#39ff14] text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none shadow-[2px_2px_0px_#a020f0] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#a020f0] transition-all text-sm"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="ACID"
        description="Distort // Warp // Dissolve -- fluorescent visuals for the digital underground"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-7xl md:text-9xl font-mono font-black text-[#39ff14] uppercase mb-2 tracking-tighter"
        descriptionClassName="text-base text-[#39ff14]/40 font-mono uppercase max-w-2xl mx-auto mb-10 tracking-wider"
      >
        <div className="relative inline-block mb-6">
          <span className="text-5xl md:text-7xl font-mono font-black text-[#a020f0] uppercase absolute top-1 left-2 opacity-50">
            GRAPHICS
          </span>
          <span className="text-5xl md:text-7xl font-mono font-black text-[#ff6ec7] uppercase absolute top-[-1px] left-[-2px] opacity-50">
            GRAPHICS
          </span>
          <span className="text-5xl md:text-7xl font-mono font-black text-[#39ff14] uppercase relative">
            GRAPHICS
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#39ff14] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[4px_4px_0px_#a020f0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#a020f0] transition-all duration-150">
            Activate
          </button>
          <button className="px-10 py-4 bg-[#a020f0] text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#a020f0] shadow-[4px_4px_0px_#e6ff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#e6ff00] transition-all duration-150">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="FLUORESCENT PALETTE"
        subtitle="HIGH_SATURATION"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-black text-[#39ff14] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#39ff14]/40 bg-[#0a0a0a] rounded-none shadow-[3px_3px_0px_#a020f0]"
            labelClassName="font-mono font-bold text-sm text-[#39ff14] uppercase"
            hexClassName="text-xs text-[#a020f0] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="HARD_OFFSET"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-black text-[#39ff14] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a] border-2 border-[#39ff14]/40 rounded-none shadow-[4px_4px_0px_#e6ff00]">
            <p className="text-sm font-mono font-bold text-[#a020f0] uppercase tracking-widest mb-6">VARIANTS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#39ff14] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[4px_4px_0px_#a020f0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#a020f0] transition-all duration-150">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#a020f0] text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#a020f0] shadow-[4px_4px_0px_#e6ff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#e6ff00] transition-all duration-150">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[3px_3px_0px_#ff6ec7] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#ff6ec7] transition-all duration-150">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#ff6ec7] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#ff6ec7] shadow-[4px_4px_0px_#39ff14] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#39ff14] transition-all duration-150">
                Pink
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="DATA_BLOCKS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-black text-[#39ff14] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a] border-2 border-[#39ff14] rounded-none shadow-[5px_5px_0px_#a020f0] hover:shadow-[8px_8px_0px_#a020f0] hover:-translate-y-1 transition-all duration-150">
            <div className="w-14 h-14 border-2 border-[#39ff14] flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-[#39ff14]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#e6ff00] uppercase mb-2">
              WARP
            </h3>
            <p className="text-[#39ff14]/50 font-mono text-sm">Distort reality through liquid forms</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border-2 border-[#a020f0] rounded-none shadow-[5px_5px_0px_#39ff14] hover:shadow-[8px_8px_0px_#39ff14] hover:-translate-y-1 transition-all duration-150">
            <div className="w-14 h-14 border-2 border-[#a020f0] flex items-center justify-center mb-4">
              <Triangle className="w-7 h-7 text-[#a020f0]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#ff6ec7] uppercase mb-2">
              DISSOLVE
            </h3>
            <p className="text-[#a020f0]/50 font-mono text-sm">Melt boundaries between dimensions</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border-2 border-[#ff6ec7] rounded-none shadow-[5px_5px_0px_#e6ff00] hover:shadow-[8px_8px_0px_#e6ff00] hover:-translate-y-1 transition-all duration-150">
            <div className="w-14 h-14 border-2 border-[#ff6ec7] flex items-center justify-center mb-4">
              <Hexagon className="w-7 h-7 text-[#ff6ec7]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#39ff14] uppercase mb-2">
              FLUX
            </h3>
            <p className="text-[#ff6ec7]/50 font-mono text-sm">Channel the psychedelic frequency</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="DATA_INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-black text-[#39ff14] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a] border-2 border-[#39ff14] rounded-none shadow-[5px_5px_0px_#a020f0]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto border-2 border-[#a020f0] flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-[#a020f0]" />
              </div>
              <h3 className="text-xl font-mono font-bold text-[#39ff14] uppercase tracking-widest">ACCESS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#a020f0] uppercase tracking-widest mb-2">HANDLE</label>
                <input
                  type="text"
                  placeholder="ENTER_HANDLE..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#39ff14]/60 rounded-none text-[#39ff14] placeholder-[#39ff14]/30 font-mono focus:border-[#39ff14] focus:shadow-[3px_3px_0px_#a020f0] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#ff6ec7] uppercase tracking-widest mb-2">SIGNAL</label>
                <input
                  type="email"
                  placeholder="ENTER_SIGNAL..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#a020f0]/60 rounded-none text-[#a020f0] placeholder-[#a020f0]/30 font-mono focus:border-[#a020f0] focus:shadow-[3px_3px_0px_#ff6ec7] focus:outline-none transition-all duration-150"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#39ff14] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[4px_4px_0px_#a020f0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#a020f0] transition-all duration-150">
                TRANSMIT
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#39ff14]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#39ff14]/30 text-sm font-mono uppercase tracking-widest">
            Acid Graphics Showcase // Part of{" "}
            <Link href="/" className="text-[#a020f0] hover:text-[#a020f0]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
