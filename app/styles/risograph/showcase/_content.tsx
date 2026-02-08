"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Circle, Layers, Palette } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Fluorescent Pink", hex: "#ff6b9d", bg: "bg-[#ff6b9d]" },
  { name: "Blue", hex: "#2563eb", bg: "bg-[#2563eb]" },
  { name: "Fluorescent Orange", hex: "#ff8a00", bg: "bg-[#ff8a00]" },
  { name: "Green", hex: "#22c55e", bg: "bg-[#22c55e]" },
  { name: "Paper", hex: "#fffbf0", bg: "bg-[#fffbf0]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fffbf0] relative overflow-hidden">
      {/* Decorative overprint circles */}
      <div className="fixed top-20 right-20 w-40 h-40 rounded-full bg-[#ff6b9d]/10 pointer-events-none" />
      <div className="fixed top-28 right-24 w-40 h-40 rounded-full bg-[#2563eb]/10 pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-32 h-32 rounded-full bg-[#22c55e]/10 pointer-events-none" />
      <div className="fixed bottom-16 left-14 w-32 h-32 rounded-full bg-[#ff8a00]/10 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/risograph"
            className="flex items-center gap-2 text-[#2563eb] hover:text-[#2563eb]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-wider">Back</span>
          </Link>
          <span className="font-mono font-bold text-xl text-[#ff6b9d] uppercase tracking-wider">
            RISOGRAPH
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#1a1a1a] text-[#1a1a1a] font-mono font-bold uppercase tracking-wider rounded-sm shadow-[2px_2px_0px_#ff6b9d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#ff6b9d] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="RISOGRAPH"
        description="Print aesthetics for the digital age - limited palette, unlimited expression"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-mono font-bold text-[#ff6b9d] uppercase mb-2"
        descriptionClassName="text-lg text-[#1a1a1a]/70 font-mono max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-mono font-bold text-[#2563eb] uppercase absolute top-1 left-1 opacity-60">
            PRINT
          </span>
          <span className="text-4xl md:text-6xl font-mono font-bold text-[#ff6b9d] uppercase relative">
            PRINT
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#ff6b9d] text-white font-mono font-bold uppercase tracking-wider rounded-sm shadow-[4px_4px_0px_#2563eb] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2563eb] transition-all duration-200">
            Print
          </button>
          <button className="px-10 py-4 bg-[#2563eb] text-white font-mono font-bold uppercase tracking-wider rounded-sm shadow-[4px_4px_0px_#ff6b9d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#ff6b9d] transition-all duration-200">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="INK PALETTE"
        subtitle="LIMITED COLORS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a1a1a]/50 font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#1a1a1a] bg-[#fffbf0] rounded-sm shadow-[3px_3px_0px_#2563eb]"
            labelClassName="font-mono font-bold text-sm text-[#1a1a1a] uppercase"
            hexClassName="text-xs text-[#ff6b9d] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="OVERPRINT OFFSET"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a1a1a]/50 font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0px_#22c55e]">
            <p className="text-sm font-mono font-bold text-[#2563eb] uppercase tracking-wider mb-6">STYLES</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#ff6b9d] text-white font-mono font-bold uppercase tracking-wider rounded-sm shadow-[3px_3px_0px_#2563eb] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#2563eb] transition-all">
                Pink Ink
              </button>
              <button className="px-6 py-3 bg-[#2563eb] text-white font-mono font-bold uppercase tracking-wider rounded-sm shadow-[3px_3px_0px_#ff6b9d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#ff6b9d] transition-all">
                Blue Ink
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#ff6b9d] text-[#ff6b9d] font-mono font-bold uppercase tracking-wider rounded-sm shadow-[2px_2px_0px_#2563eb] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2563eb] transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#ff8a00] text-white font-mono font-bold uppercase tracking-wider rounded-sm shadow-[3px_3px_0px_#22c55e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#22c55e] transition-all">
                Orange Ink
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="REGISTRATION MARKS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a1a1a]/50 font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0px_#ff6b9d] hover:shadow-[6px_6px_0px_#ff6b9d] hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 bg-[#ff6b9d] flex items-center justify-center mb-4">
              <Printer className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#2563eb] uppercase mb-2">
              OVERPRINT
            </h3>
            <p className="text-[#1a1a1a]/60 font-mono text-sm">Layer colors for rich visual depth</p>
          </div>

          <div className="p-6 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0px_#2563eb] hover:shadow-[6px_6px_0px_#2563eb] hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 bg-[#2563eb] flex items-center justify-center mb-4">
              <Circle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#ff6b9d] uppercase mb-2">
              HALFTONE
            </h3>
            <p className="text-[#1a1a1a]/60 font-mono text-sm">Dot patterns create tonal depth</p>
          </div>

          <div className="p-6 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0px_#ff8a00] hover:shadow-[6px_6px_0px_#ff8a00] hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 bg-[#ff8a00] flex items-center justify-center mb-4">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#22c55e] uppercase mb-2">
              MISREGISTER
            </h3>
            <p className="text-[#1a1a1a]/60 font-mono text-sm">Embrace the beautiful imperfection</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="MONO INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#1a1a1a] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a1a1a]/50 font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0px_#ff6b9d]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#2563eb] flex items-center justify-center mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-mono font-bold text-[#ff6b9d] uppercase">REGISTER</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#2563eb] uppercase tracking-wider mb-2">NAME</label>
                <input
                  type="text"
                  placeholder="ENTER NAME..."
                  className="w-full px-4 py-3 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 font-mono focus:border-[#2563eb] focus:shadow-[2px_2px_0px_#ff6b9d] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#ff6b9d] uppercase tracking-wider mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="ENTER EMAIL..."
                  className="w-full px-4 py-3 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 font-mono focus:border-[#ff6b9d] focus:shadow-[2px_2px_0px_#2563eb] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#ff6b9d] text-white font-mono font-bold uppercase tracking-wider rounded-sm shadow-[3px_3px_0px_#2563eb] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#2563eb] transition-all">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#1a1a1a]/50 text-sm font-mono uppercase tracking-wider">
            Risograph Showcase 路 Part of{" "}
            <Link href="/" className="text-[#2563eb] hover:text-[#2563eb]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

