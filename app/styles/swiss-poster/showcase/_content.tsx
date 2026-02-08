"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Grid3X3,
  Type,
  Square,
  AlignLeft,
} from "lucide-react";
import {
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-[#000000]" },
  { name: "White", hex: "#ffffff", bg: "bg-[#ffffff]" },
  { name: "Red", hex: "#ff0000", bg: "bg-[#ff0000]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#ffffff] relative overflow-hidden">
      {/* Visible structural grid lines */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "calc(100% / 12) 100px",
        }}
      />

      {/* Navigation - flush left, tight */}
      <nav className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-8 md:col-span-6 px-6 py-4 flex items-center gap-4">
            <Link
              href="/styles/swiss-poster"
              className="flex items-center gap-2 text-[#000000] hover:text-[#ff0000] transition-colors duration-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-sans font-black uppercase tracking-widest text-[10px]">
                BACK
              </span>
            </Link>
          </div>
          <div className="col-span-4 md:col-span-6 px-6 py-4 flex items-center justify-end">
            <Link
              href="/styles"
              className="px-4 py-2 border-2 border-[#000000] text-[#000000] font-sans font-black uppercase tracking-widest rounded-none hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100 text-[10px]"
            >
              ALL STYLES
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Asymmetric grid layout with extreme type scale */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          {/* Main content - spans 8 cols, flush left */}
          <div className="col-span-12 md:col-span-8 px-6 md:px-12 pt-8 pb-12 border-r-0 md:border-r-2 border-[#000000]">
            {/* Extreme type scale: 120px heading */}
            <h1 className="text-[80px] md:text-[120px] lg:text-[160px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter">
              SWISS
            </h1>
            <h2 className="text-[50px] md:text-[80px] lg:text-[100px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter -mt-2">
              POSTER
            </h2>

            {/* Small body text - extreme contrast: 12px vs 120px */}
            <div className="mt-8 max-w-md">
              <p className="text-xs font-sans text-[#000000]/50 leading-relaxed uppercase tracking-wider">
                Bold typography. Mathematical grid system. Asymmetric
                composition. Extreme type scale contrast. No decoration.
                International Typographic Style.
              </p>
            </div>

            {/* Buttons - square, no shadows */}
            <div className="flex gap-0 mt-10">
              <button className="px-8 py-4 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100 text-sm">
                EXPLORE
              </button>
              <button className="px-8 py-4 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] border-l-0 hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100 text-sm">
                LEARN
              </button>
            </div>
          </div>

          {/* Right column - red color block with vertical text */}
          <div className="hidden md:flex col-span-4 bg-[#ff0000] items-center justify-center min-h-[400px] relative">
            <span className="font-sans font-black text-[#ffffff] text-sm uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
              INTERNATIONAL STYLE
            </span>
            {/* Large faded number */}
            <span className="absolute bottom-4 right-4 font-sans font-black text-[#ffffff]/10 text-[120px] leading-none">
              24
            </span>
          </div>
        </div>
      </section>

      {/* Color System - 3 colors only, grid aligned */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 px-6 md:px-12 py-8 md:border-r-2 border-[#000000]">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-[#000000] uppercase tracking-tighter leading-none">
              COLOR
            </h2>
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest mt-2">
              THREE COLORS ONLY
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 px-6 md:px-12 py-8">
            <ColorPaletteGrid
              colors={colors}
              cardClassName="border-2 border-[#000000] bg-[#ffffff] rounded-none"
              labelClassName="font-sans font-black text-sm text-[#000000] uppercase tracking-wider"
              hexClassName="text-xs text-[#000000]/40 font-sans font-bold"
            />
          </div>
        </div>
      </section>

      {/* Typography Scale - unique element showing extreme contrast */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 px-6 md:px-12 py-8 md:border-r-2 border-[#000000]">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-[#000000] uppercase tracking-tighter leading-none">
              TYPE
            </h2>
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest mt-2">
              SCALE CONTRAST
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 px-6 md:px-12 py-8">
            <div className="space-y-4">
              <div className="flex items-baseline gap-4 border-b border-[#000000]/10 pb-4">
                <span className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase w-16">
                  160px
                </span>
                <span className="text-[60px] md:text-[80px] font-sans font-black text-[#000000] uppercase leading-none tracking-tighter truncate">
                  Aa
                </span>
              </div>
              <div className="flex items-baseline gap-4 border-b border-[#000000]/10 pb-4">
                <span className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase w-16">
                  48px
                </span>
                <span className="text-5xl font-sans font-black text-[#000000] uppercase leading-none tracking-tighter">
                  Headline
                </span>
              </div>
              <div className="flex items-baseline gap-4 border-b border-[#000000]/10 pb-4">
                <span className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase w-16">
                  24px
                </span>
                <span className="text-2xl font-sans font-black text-[#000000] uppercase leading-none">
                  Subheading
                </span>
              </div>
              <div className="flex items-baseline gap-4 border-b border-[#000000]/10 pb-4">
                <span className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase w-16">
                  14px
                </span>
                <span className="text-sm font-sans text-[#000000]/70">
                  Body text for reading content at comfortable size
                </span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase w-16">
                  10px
                </span>
                <span className="text-[10px] font-sans font-bold text-[#000000]/40 uppercase tracking-widest">
                  CAPTION / LABEL / METADATA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards - Grid-aligned, border-based, no shadows */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 px-6 md:px-12 py-8 md:border-r-2 border-[#000000]">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-[#000000] uppercase tracking-tighter leading-none">
              CARDS
            </h2>
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest mt-2">
              GRID MODULES
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-[#000000] hover:bg-[#ff0000] hover:text-[#ffffff] group transition-all duration-100">
                <Grid3X3 className="w-8 h-8 text-[#000000] group-hover:text-[#ffffff] mb-6 transition-colors duration-100" />
                <h3 className="text-2xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tighter mb-3 transition-colors duration-100">
                  GRID
                </h3>
                <p className="text-sm text-[#000000]/50 group-hover:text-[#ffffff]/70 font-sans transition-colors duration-100">
                  Mathematical precision in every layout decision
                </p>
              </div>

              <div className="p-8 bg-[#000000] border-b-2 md:border-b-0 md:border-r-2 border-[#000000]">
                <Type className="w-8 h-8 text-[#ffffff] mb-6" />
                <h3 className="text-2xl font-sans font-black text-[#ffffff] uppercase tracking-tighter mb-3">
                  TYPE
                </h3>
                <p className="text-sm text-[#ffffff]/50 font-sans">
                  Typography as the primary visual element
                </p>
              </div>

              <div className="p-8 hover:bg-[#000000] group transition-all duration-100">
                <Square className="w-8 h-8 text-[#000000] group-hover:text-[#ffffff] mb-6 transition-colors duration-100" />
                <h3 className="text-2xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tighter mb-3 transition-colors duration-100">
                  BLOCK
                </h3>
                <p className="text-sm text-[#000000]/50 group-hover:text-[#ffffff]/70 font-sans transition-colors duration-100">
                  Color blocks for structural emphasis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons - Inline with grid structure */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 px-6 md:px-12 py-8 md:border-r-2 border-[#000000]">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-[#000000] uppercase tracking-tighter leading-none">
              BTNS
            </h2>
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest mt-2">
              INTERACTION
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 px-6 md:px-12 py-8">
            <div className="flex flex-wrap gap-0">
              <button className="px-8 py-3 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100 text-sm">
                BLACK
              </button>
              <button className="px-8 py-3 bg-[#ff0000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#ff0000] border-l-0 hover:bg-[#000000] hover:border-[#000000] transition-all duration-100 text-sm">
                RED
              </button>
              <button className="px-8 py-3 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] border-l-0 hover:bg-[#000000] hover:text-[#ffffff] transition-all duration-100 text-sm">
                OUTLINE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form - Bottom-border inputs, minimal */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 px-6 md:px-12 py-8 md:border-r-2 border-[#000000]">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-[#000000] uppercase tracking-tighter leading-none">
              FORM
            </h2>
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest mt-2">
              INPUT FIELDS
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 px-6 md:px-12 py-8">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-sans font-black text-[#000000] uppercase tracking-widest mb-3">
                  NAME
                </label>
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/20 font-sans font-bold text-lg focus:border-[#ff0000] focus:outline-none transition-all duration-100"
                />
              </div>
              <div>
                <label className="block text-[10px] font-sans font-black text-[#000000] uppercase tracking-widest mb-3">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/20 font-sans font-bold text-lg focus:border-[#ff0000] focus:outline-none transition-all duration-100"
                />
              </div>
              <button className="px-10 py-3 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-100 text-sm">
                SUBMIT
              </button>
            </div>
          </div>
          {/* Empty right column for asymmetry */}
          <div className="hidden md:block col-span-3 md:border-l-2 border-[#000000]">
            <div className="h-full flex items-center justify-center">
              <AlignLeft className="w-8 h-8 text-[#000000]/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid demonstration - visible 12-col grid */}
      <section className="relative z-10 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 px-6 md:px-12 py-8 md:border-r-2 border-[#000000]">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-[#000000] uppercase tracking-tighter leading-none">
              GRID
            </h2>
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest mt-2">
              12-COLUMN SYSTEM
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 px-6 md:px-0 py-8">
            <div className="grid grid-cols-9 gap-0">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 border-r border-[#000000]/10 flex items-end justify-center pb-1"
                >
                  <span className="text-[8px] font-sans font-bold text-[#000000]/20">
                    {i + 4}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-9 gap-0 mt-2">
              <div className="col-span-3 h-8 bg-[#000000]" />
              <div className="col-span-2 h-8 bg-[#ff0000]" />
              <div className="col-span-4 h-8 bg-[#000000]/5 border border-[#000000]/10" />
            </div>
            <div className="grid grid-cols-9 gap-0 mt-1">
              <div className="col-span-5 h-8 bg-[#000000]/5 border border-[#000000]/10" />
              <div className="col-span-4 h-8 bg-[#000000]" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - minimal, grid-aligned */}
      <footer className="relative z-10 py-6 px-6">
        <div className="grid grid-cols-12">
          <div className="col-span-6 md:col-span-3">
            <p className="text-[10px] font-sans font-bold text-[#000000]/30 uppercase tracking-widest">
              Swiss Poster
            </p>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
            <Link
              href="/"
              className="text-[10px] font-sans font-bold text-[#ff0000]/50 hover:text-[#ff0000] uppercase tracking-widest transition-colors duration-100"
            >
              StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
