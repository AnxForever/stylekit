"use client";

import Link from "next/link";
import { ArrowLeft, Scissors, Layers, Newspaper, Stamp } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Dark Charcoal", hex: "#2d2d2d", bg: "bg-[#2d2d2d]" },
  { name: "Cut Red", hex: "#e74c3c", bg: "bg-[#e74c3c]" },
  { name: "Magazine Blue", hex: "#3498db", bg: "bg-[#3498db]" },
  { name: "Paste Yellow", hex: "#f39c12", bg: "bg-[#f39c12]" },
  { name: "Purple", hex: "#9b59b6", bg: "bg-[#9b59b6]" },
  { name: "Aged Paper", hex: "#f5f0e8", bg: "bg-[#f5f0e8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] relative overflow-hidden">
      {/* Decorative collage elements */}
      <div className="fixed top-10 right-20 w-40 h-28 bg-[#e74c3c]/10 rotate-[5deg] pointer-events-none" />
      <div className="fixed top-32 right-10 w-32 h-32 bg-[#3498db]/10 rotate-[-3deg] pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-36 h-24 bg-[#f39c12]/10 rotate-[2deg] pointer-events-none" />
      <div className="fixed bottom-40 left-32 w-28 h-36 bg-[#9b59b6]/10 rotate-[-4deg] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/collage-art"
            className="flex items-center gap-2 text-[#e74c3c] hover:text-[#e74c3c]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif font-bold uppercase tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-sans font-black text-xl text-[#2d2d2d] uppercase tracking-wider rotate-[-1deg]">
            COLLAGE ART
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold uppercase tracking-wider rounded-sm shadow-[3px_3px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2d2d2d] transition-all duration-200 rotate-[0.5deg]"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="COLLAGE"
        description="Cut, tear, and reassemble reality into something entirely new"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif font-bold text-[#2d2d2d] rotate-[-1deg] mb-2"
        descriptionClassName="text-lg text-[#2d2d2d]/50 font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-sans font-black text-[#e74c3c] uppercase rotate-[0.5deg] inline-block">
            ART
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#e74c3c] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] rotate-[-0.5deg] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200">
            Cut
          </button>
          <button className="px-10 py-4 bg-[#3498db] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] rotate-[0.5deg] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200">
            Paste
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="MATERIALS"
        subtitle="CUT SWATCHES"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2d2d2d] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#2d2d2d]/40 font-sans uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#2d2d2d] bg-[#f5f0e8] rounded-none shadow-[3px_3px_0px_#2d2d2d]"
            labelClassName="font-serif font-bold text-sm text-[#2d2d2d] uppercase"
            hexClassName="text-xs text-[#e74c3c] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="PAPER CUTOUTS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2d2d2d] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#2d2d2d]/40 font-sans uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#f39c12] rotate-[0.3deg]">
            <p className="text-sm font-sans font-bold text-[#e74c3c] uppercase tracking-wider mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3 bg-[#e74c3c] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] rotate-[-0.5deg] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200">
                Red Cut
              </button>
              <button className="px-7 py-3 bg-[#3498db] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] rotate-[0.5deg] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200">
                Blue Cut
              </button>
              <button className="px-7 py-3 bg-[#f5f0e8] text-[#2d2d2d] font-bold uppercase tracking-wider rounded-sm border-2 border-dashed border-[#2d2d2d] rotate-[-1deg] hover:rotate-0 hover:bg-[#2d2d2d]/5 transition-all duration-200">
                Dashed
              </button>
              <button className="px-7 py-3 bg-[#f39c12] text-[#2d2d2d] font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#9b59b6] rotate-[1deg] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#9b59b6] transition-all duration-200">
                Yellow Cut
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="LAYERED PIECES"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2d2d2d] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#2d2d2d]/40 font-sans uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#e74c3c] rotate-[0.5deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#e74c3c] transition-all duration-200">
            <div className="w-14 h-14 bg-[#e74c3c] flex items-center justify-center mb-4 rotate-[-2deg]">
              <Scissors className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2d2d2d] uppercase mb-2">
              CUT
            </h3>
            <p className="text-[#2d2d2d]/60 font-sans text-sm">Scissors slice through magazines and newspapers</p>
          </div>

          <div className="p-6 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#3498db] rotate-[-1deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#3498db] transition-all duration-200">
            <div className="w-14 h-14 bg-[#3498db] flex items-center justify-center mb-4 rotate-[3deg]">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-sans font-black text-[#2d2d2d] uppercase mb-2">
              LAYER
            </h3>
            <p className="text-[#2d2d2d]/60 font-serif text-sm">Stack, overlap, and build depth from fragments</p>
          </div>

          <div className="p-6 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#f39c12] rotate-[1deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#f39c12] transition-all duration-200">
            <div className="w-14 h-14 bg-[#f39c12] flex items-center justify-center mb-4 rotate-[-1deg]">
              <Newspaper className="w-7 h-7 text-[#2d2d2d]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2d2d2d] uppercase mb-2">
              COMPOSE
            </h3>
            <p className="text-[#2d2d2d]/60 font-sans text-sm">Arrange the chaos into meaningful composition</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="FILL IN THE BLANKS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2d2d2d] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#2d2d2d]/40 font-sans uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#2d2d2d] rotate-[-0.3deg]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#9b59b6] flex items-center justify-center mb-4 rotate-[2deg]">
                <Stamp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2d2d2d] uppercase">Register</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-bold text-[#e74c3c] uppercase tracking-wider mb-2">NAME</label>
                <input
                  type="text"
                  placeholder="ENTER NAME..."
                  className="w-full px-5 py-3 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none text-[#2d2d2d] placeholder-[#2d2d2d]/40 focus:border-[#e74c3c] focus:shadow-[3px_3px_0px_#2d2d2d] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-bold text-[#3498db] uppercase tracking-wider mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="ENTER EMAIL..."
                  className="w-full px-5 py-3 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none text-[#2d2d2d] placeholder-[#2d2d2d]/40 focus:border-[#3498db] focus:shadow-[3px_3px_0px_#2d2d2d] focus:outline-none transition-all duration-200"
                />
              </div>
              <button className="w-full px-7 py-3 bg-[#e74c3c] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#2d2d2d]/40 text-sm font-sans uppercase tracking-wider">
            Collage Art Showcase -- Part of{" "}
            <Link href="/" className="text-[#e74c3c] hover:text-[#e74c3c]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
