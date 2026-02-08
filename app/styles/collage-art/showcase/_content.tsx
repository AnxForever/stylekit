"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Scissors,
  Layers,
  Newspaper,
  Stamp,
  Pin,
  Paperclip,
  Type,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Dark Charcoal", hex: "#2d2d2d", bg: "bg-[#2d2d2d]" },
  { name: "Cut Red", hex: "#e74c3c", bg: "bg-[#e74c3c]" },
  { name: "Magazine Blue", hex: "#3498db", bg: "bg-[#3498db]" },
  { name: "Paste Yellow", hex: "#f39c12", bg: "bg-[#f39c12]" },
  { name: "Scrap Purple", hex: "#9b59b6", bg: "bg-[#9b59b6]" },
  { name: "Aged Paper", hex: "#f5f0e8", bg: "bg-[#f5f0e8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] relative overflow-hidden">
      {/* Scattered paper scrap background pieces */}
      <div
        className="fixed top-8 right-16 w-44 h-32 bg-[#e74c3c]/8 pointer-events-none z-0"
        style={{ transform: "rotate(5deg)", clipPath: "polygon(0% 3%, 8% 0%, 20% 4%, 35% 1%, 50% 3%, 65% 0%, 80% 4%, 92% 0%, 100% 2%, 100% 97%, 92% 100%, 80% 96%, 65% 100%, 50% 98%, 35% 100%, 20% 96%, 8% 100%, 0% 97%)" }}
      />
      <div
        className="fixed top-28 right-8 w-36 h-36 bg-[#3498db]/8 pointer-events-none z-0"
        style={{ transform: "rotate(-3deg)", clipPath: "polygon(0% 2%, 12% 0%, 25% 3%, 40% 0%, 55% 2%, 70% 0%, 85% 3%, 100% 1%, 100% 98%, 85% 100%, 70% 97%, 55% 100%, 40% 98%, 25% 100%, 12% 97%, 0% 99%)" }}
      />
      <div
        className="fixed bottom-16 left-8 w-40 h-28 bg-[#f39c12]/8 pointer-events-none z-0"
        style={{ transform: "rotate(2deg)", clipPath: "polygon(0% 3%, 15% 0%, 30% 5%, 50% 0%, 70% 3%, 85% 0%, 100% 4%, 100% 96%, 85% 100%, 70% 95%, 50% 100%, 30% 97%, 15% 100%, 0% 96%)" }}
      />
      <div
        className="fixed bottom-36 left-28 w-32 h-40 bg-[#9b59b6]/7 pointer-events-none z-0"
        style={{ transform: "rotate(-4deg)" }}
      />

      {/* Navigation - masking tape strip style */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/collage-art"
            className="flex items-center gap-2 text-[#e74c3c] hover:text-[#e74c3c]/70 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif font-bold uppercase tracking-wider text-sm">
              Back
            </span>
          </Link>
          <span
            className="font-sans font-black text-xl text-[#2d2d2d] uppercase tracking-wider"
            style={{ transform: "rotate(-1deg)" }}
          >
            COLLAGE ART
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold uppercase tracking-wider rounded-sm shadow-[3px_3px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#2d2d2d] transition-all duration-200"
            style={{ transform: "rotate(0.5deg)" }}
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero - Corkboard pinboard layout with overlapping paper pieces */}
      <section className="relative z-10 pt-16 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Pinned paper scrap behind title */}
          <div className="relative text-center">
            {/* Background torn paper shape */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-white/50 border-2 border-[#2d2d2d]/15"
              style={{
                transform: "translate(-50%, -50%) rotate(1.5deg)",
                clipPath:
                  "polygon(0% 3%, 5% 0%, 12% 4%, 20% 1%, 28% 3%, 35% 0%, 42% 2%, 50% 0%, 58% 3%, 65% 1%, 72% 4%, 80% 0%, 88% 2%, 95% 0%, 100% 3%, 100% 97%, 95% 100%, 88% 98%, 80% 100%, 72% 97%, 65% 100%, 58% 98%, 50% 100%, 42% 97%, 35% 100%, 28% 98%, 20% 100%, 12% 97%, 5% 100%, 0% 98%)",
              }}
            />
            {/* Pushpin at top */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
              <Pin className="w-6 h-6 text-[#e74c3c] rotate-[15deg]" />
            </div>

            <div className="relative z-10 py-10">
              <h1
                className="font-serif text-6xl md:text-8xl font-bold text-[#2d2d2d] mb-2"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                COLLAGE
              </h1>
              <h2
                className="font-sans text-4xl md:text-6xl font-black text-[#e74c3c] uppercase mb-6"
                style={{ transform: "rotate(0.5deg)" }}
              >
                ART
              </h2>
              <p className="text-[#2d2d2d]/50 font-mono text-sm tracking-wider max-w-md mx-auto mb-10">
                CUT / TEAR / PASTE / LAYER / REASSEMBLE
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="px-10 py-4 bg-[#e74c3c] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200"
                  style={{ transform: "rotate(-0.7deg)" }}
                >
                  <span className="flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    Cut
                  </span>
                </button>
                <button
                  className="px-10 py-4 bg-[#3498db] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200"
                  style={{ transform: "rotate(0.5deg)" }}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Paste
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Torn paper divider */}
      <div
        className="relative z-10 h-3 bg-[#2d2d2d]/8 mx-auto max-w-3xl"
        style={{
          clipPath:
            "polygon(0% 20%, 3% 0%, 8% 40%, 12% 0%, 18% 50%, 22% 10%, 28% 60%, 32% 0%, 38% 30%, 42% 0%, 48% 50%, 52% 0%, 58% 40%, 62% 0%, 68% 60%, 72% 10%, 78% 50%, 82% 0%, 88% 40%, 92% 0%, 96% 30%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Color Palette - cut swatch cards */}
      <ShowcaseSection
        title="MATERIALS"
        subtitle="CUT SWATCHES"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-bold text-[#2d2d2d] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#2d2d2d]/35 font-mono text-xs uppercase tracking-[0.2em] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#2d2d2d] bg-[#f5f0e8] rounded-none shadow-[3px_3px_0px_#2d2d2d]"
            labelClassName="font-serif font-bold text-sm text-[#2d2d2d] uppercase"
            hexClassName="text-xs text-[#e74c3c] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Techniques - Scrapbook scattered layout with different rotations */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-sans font-black text-[#2d2d2d] uppercase tracking-wider mb-3 text-center">
            Techniques
          </h2>
          <p className="text-[#2d2d2d]/35 font-mono text-xs uppercase tracking-[0.2em] mb-14 text-center">
            Mixed Media Methods
          </p>

          {/* Asymmetric scrapbook grid - 2 col uneven with different rotations */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Large card - spans 7 cols, rotated */}
            <div
              className="md:col-span-7 relative"
              style={{ transform: "rotate(0.8deg)" }}
            >
              {/* Washi tape decoration */}
              <div
                className="absolute -top-3 left-8 w-20 h-5 z-10"
                style={{
                  background: "repeating-linear-gradient(90deg, #f39c12 0px, #f39c12 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)",
                  opacity: 0.7,
                  transform: "rotate(3deg)",
                }}
              />
              <div className="p-8 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#e74c3c] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#e74c3c] transition-all duration-200">
                <div className="w-14 h-14 bg-[#e74c3c] flex items-center justify-center mb-5" style={{ transform: "rotate(-3deg)" }}>
                  <Scissors className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2d2d2d] uppercase mb-3">
                  Cut & Tear
                </h3>
                <p className="text-[#2d2d2d]/55 font-sans text-sm leading-relaxed">
                  Scissors slice through magazines, newspapers, and photographs.
                  Tearing by hand creates organic, irregular edges that no blade
                  can replicate -- the raw, authentic texture of handmade art.
                </p>
              </div>
            </div>

            {/* Two stacked cards - span 5 cols */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div
                className="p-6 bg-[#f5f0e8] border-2 border-[#3498db] rounded-none shadow-[4px_4px_0px_#3498db] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#3498db] transition-all duration-200"
                style={{ transform: "rotate(-1.2deg)" }}
              >
                <div className="w-11 h-11 bg-[#3498db] flex items-center justify-center mb-4" style={{ transform: "rotate(2deg)" }}>
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-sans font-black text-[#2d2d2d] uppercase mb-2">
                  Layer & Stack
                </h3>
                <p className="text-[#2d2d2d]/50 font-serif text-sm leading-relaxed">
                  Overlapping fragments build visual depth. Each layer casts its own
                  shadow, creating dimensionality.
                </p>
              </div>

              <div
                className="p-6 bg-[#f5f0e8] border-2 border-[#f39c12] rounded-none shadow-[4px_4px_0px_#f39c12] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#f39c12] transition-all duration-200"
                style={{ transform: "rotate(1.5deg)" }}
              >
                {/* Washi tape on this card */}
                <div
                  className="absolute -top-2 right-6 w-16 h-4 z-10"
                  style={{
                    background: "repeating-linear-gradient(90deg, #9b59b6 0px, #9b59b6 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)",
                    opacity: 0.6,
                    transform: "rotate(-4deg)",
                  }}
                />
                <div className="w-11 h-11 bg-[#f39c12] flex items-center justify-center mb-4" style={{ transform: "rotate(-2deg)" }}>
                  <Newspaper className="w-5 h-5 text-[#2d2d2d]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2d2d2d] uppercase mb-2">
                  Compose
                </h3>
                <p className="text-[#2d2d2d]/50 font-sans text-sm leading-relaxed">
                  Arrange chaos into meaningful composition. The art is in
                  juxtaposition and unexpected harmony.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons - Paper cutout strip display */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-serif font-bold text-[#2d2d2d] uppercase tracking-wider mb-3 text-center"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            Controls
          </h2>
          <p className="text-[#2d2d2d]/35 font-mono text-xs uppercase tracking-[0.2em] mb-12 text-center">
            Paper Cutout Buttons
          </p>

          <div
            className="p-10 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#f39c12]"
            style={{ transform: "rotate(0.3deg)" }}
          >
            {/* Mixed font label */}
            <p className="text-sm font-mono font-bold text-[#e74c3c] uppercase tracking-wider mb-6">
              {"// button variants"}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-7 py-3 bg-[#e74c3c] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200"
                style={{ transform: "rotate(-0.7deg)" }}
              >
                Red Cut
              </button>
              <button
                className="px-7 py-3 bg-[#3498db] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200"
                style={{ transform: "rotate(0.5deg)" }}
              >
                Blue Cut
              </button>
              <button
                className="px-7 py-3 bg-[#f5f0e8] text-[#2d2d2d] font-bold uppercase tracking-wider rounded-sm border-2 border-dashed border-[#2d2d2d] hover:rotate-0 hover:bg-[#2d2d2d]/5 transition-all duration-200"
                style={{ transform: "rotate(-1deg)" }}
              >
                Dashed
              </button>
              <button
                className="px-7 py-3 bg-[#f39c12] text-[#2d2d2d] font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#9b59b6] hover:rotate-0 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#9b59b6] transition-all duration-200"
                style={{ transform: "rotate(1deg)" }}
              >
                Yellow Cut
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form - Ransom note / zine registration */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-md mx-auto">
          <div
            className="relative p-8 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none shadow-[5px_5px_0px_#2d2d2d]"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            {/* Washi tape top decoration */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 z-10"
              style={{
                background: "repeating-linear-gradient(90deg, #f39c12 0px, #f39c12 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)",
                opacity: 0.7,
                transform: "rotate(2deg)",
              }}
            />
            {/* Paperclip decoration */}
            <div className="absolute -top-1 right-6">
              <Paperclip className="w-6 h-6 text-[#2d2d2d]/30 rotate-[15deg]" />
            </div>

            <div className="text-center mb-6">
              <div
                className="w-16 h-16 mx-auto bg-[#9b59b6] flex items-center justify-center mb-4"
                style={{ transform: "rotate(3deg)" }}
              >
                <Stamp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2d2d2d] uppercase">
                Zine Signup
              </h3>
              <p className="text-xs font-mono text-[#2d2d2d]/40 mt-1">
                {"// join the collective"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-bold text-[#e74c3c] uppercase tracking-wider mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  placeholder="ENTER NAME..."
                  className="w-full px-5 py-3 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none text-[#2d2d2d] placeholder-[#2d2d2d]/30 font-serif focus:border-[#e74c3c] focus:shadow-[3px_3px_0px_#2d2d2d] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#3498db] uppercase tracking-wider mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="ENTER EMAIL..."
                  className="w-full px-5 py-3 bg-[#f5f0e8] border-2 border-[#2d2d2d] rounded-none text-[#2d2d2d] placeholder-[#2d2d2d]/30 font-sans focus:border-[#3498db] focus:shadow-[3px_3px_0px_#2d2d2d] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-bold text-[#9b59b6] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  placeholder="PASTE YOUR THOUGHTS..."
                  rows={3}
                  className="w-full px-5 py-3 bg-[#f5f0e8] border-2 border-dashed border-[#2d2d2d]/60 rounded-none text-[#2d2d2d] placeholder-[#2d2d2d]/30 font-mono text-sm focus:border-[#9b59b6] focus:border-solid focus:shadow-[3px_3px_0px_#2d2d2d] focus:outline-none transition-all duration-200 resize-none"
                />
              </div>
              <button
                className="w-full px-7 py-3 bg-[#e74c3c] text-white font-bold uppercase tracking-wider rounded-sm border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2d2d2d] transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <Type className="w-4 h-4" />
                  Submit
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with dashed cut line */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-dashed border-[#2d2d2d]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <Scissors className="w-4 h-4 text-[#2d2d2d]/25 rotate-90" />
          <p className="text-[#2d2d2d]/35 text-sm font-mono uppercase tracking-wider">
            Collage Art Showcase -- Part of{" "}
            <Link
              href="/"
              className="text-[#e74c3c]/60 hover:text-[#e74c3c] transition-colors duration-200"
            >
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
