"use client";

import Link from "next/link";
import { ArrowLeft, Grid3X3, Type, Square, AlignLeft } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-[#000000]" },
  { name: "White", hex: "#ffffff", bg: "bg-[#ffffff]" },
  { name: "Red", hex: "#ff0000", bg: "bg-[#ff0000]" },
  { name: "Blue", hex: "#0057b8", bg: "bg-[#0057b8]" },
  { name: "Yellow", hex: "#ffcc00", bg: "bg-[#ffcc00]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#ffffff] relative overflow-hidden">
      {/* Decorative color blocks */}
      <div className="fixed top-0 right-0 w-1/6 h-32 bg-[#ff0000]/5 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-1/6 h-48 bg-[#0057b8]/5 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#000000]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/swiss-poster"
            className="flex items-center gap-2 text-[#000000] hover:text-[#ff0000] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-black uppercase tracking-widest text-sm">Back to Docs</span>
          </Link>
          <span className="font-sans font-black text-xl text-[#000000] uppercase tracking-widest">
            SWISS POSTER
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#000000] text-[#000000] font-sans font-black uppercase tracking-widest rounded-none hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100 text-sm"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="SWISS"
        description="Bold typography. Grid alignment. Primary color blocks. Experimental layout."
        className="relative z-10 pt-16 pb-16 px-6 md:px-16"
        titleClassName="text-7xl md:text-[10rem] font-sans font-black text-[#000000] uppercase leading-none tracking-tighter"
        descriptionClassName="text-base text-[#000000]/50 font-sans max-w-lg mb-10 mt-6"
      >
        <div className="relative">
          <div className="absolute top-0 right-0 w-48 md:w-64 h-full bg-[#ff0000] -z-10" />
          <span className="text-5xl md:text-8xl font-sans font-black text-[#000000] uppercase leading-none tracking-tighter block">
            POSTER
          </span>
        </div>
        <div className="flex flex-wrap gap-4 mt-10">
          <button className="px-10 py-4 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100">
            Explore
          </button>
          <button className="px-10 py-4 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="PRIMARY BLOCKS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#000000] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#000000]/30 font-sans font-bold uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#000000] bg-[#ffffff] rounded-none"
            labelClassName="font-sans font-black text-sm text-[#000000] uppercase"
            hexClassName="text-xs text-[#000000]/50 font-sans font-bold"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="INTERACTION"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#000000] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#000000]/30 font-sans font-bold uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#ffffff] border-2 border-[#000000] rounded-none">
            <p className="text-sm font-sans font-black text-[#ff0000] uppercase tracking-widest mb-6">VARIANTS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100">
                Black
              </button>
              <button className="px-8 py-3 bg-[#ff0000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#ff0000] hover:bg-[#000000] hover:border-[#000000] transition-all duration-100">
                Red
              </button>
              <button className="px-8 py-3 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100">
                Outline
              </button>
              <button className="px-8 py-3 bg-[#0057b8] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#0057b8] hover:bg-[#000000] hover:border-[#000000] transition-all duration-100">
                Blue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="GRID LAYOUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#000000] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#000000]/30 font-sans font-bold uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-0">
          <div className="p-8 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#ff0000] hover:text-[#ffffff] group transition-all duration-100">
            <div className="w-14 h-14 border-2 border-[#000000] group-hover:border-[#ffffff] flex items-center justify-center mb-4">
              <Grid3X3 className="w-7 h-7 text-[#000000] group-hover:text-[#ffffff]" />
            </div>
            <h3 className="text-2xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-2">
              GRID
            </h3>
            <p className="text-[#000000]/60 group-hover:text-[#ffffff]/80 font-sans text-sm">Mathematical precision in every layout</p>
          </div>

          <div className="p-8 bg-[#000000] border-2 border-[#000000]">
            <div className="w-14 h-14 border-2 border-[#ffffff] flex items-center justify-center mb-4">
              <Type className="w-7 h-7 text-[#ffffff]" />
            </div>
            <h3 className="text-2xl font-sans font-black text-[#ffffff] uppercase tracking-tight mb-2">
              TYPE
            </h3>
            <p className="text-[#ffffff]/60 font-sans text-sm">Typography as the primary visual element</p>
          </div>

          <div className="p-8 bg-[#ffffff] border-2 border-[#000000] hover:bg-[#0057b8] hover:border-[#0057b8] hover:text-[#ffffff] group transition-all duration-100">
            <div className="w-14 h-14 border-2 border-[#000000] group-hover:border-[#ffffff] flex items-center justify-center mb-4">
              <Square className="w-7 h-7 text-[#000000] group-hover:text-[#ffffff]" />
            </div>
            <h3 className="text-2xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-2">
              BLOCK
            </h3>
            <p className="text-[#000000]/60 group-hover:text-[#ffffff]/80 font-sans text-sm">Color blocks for visual emphasis</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#000000] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#000000]/30 font-sans font-bold uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#ffffff] border-2 border-[#000000] rounded-none">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#ff0000] flex items-center justify-center mb-4">
                <AlignLeft className="w-8 h-8 text-[#ffffff]" />
              </div>
              <h3 className="text-xl font-sans font-black text-[#000000] uppercase tracking-widest">CONTACT</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-sans font-black text-[#000000] uppercase tracking-widest mb-2">NAME</label>
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/30 font-sans font-bold focus:border-[#ff0000] focus:outline-none transition-all duration-100"
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-black text-[#000000] uppercase tracking-widest mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/30 font-sans font-bold focus:border-[#0057b8] focus:outline-none transition-all duration-100"
                />
              </div>
              <button className="w-full px-8 py-3 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#000000]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#000000]/40 text-sm font-sans font-bold uppercase tracking-widest">
            Swiss Poster Showcase // Part of{" "}
            <Link href="/" className="text-[#ff0000] hover:text-[#ff0000]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
