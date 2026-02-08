"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Star, Flower2, Sparkles, BookOpen, PenTool } from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sakura Pink", hex: "#ffb7c5", bg: "bg-[#ffb7c5]" },
  { name: "Pearl White", hex: "#fff5f7", bg: "bg-[#fff5f7]" },
  { name: "Lavender", hex: "#c4b5fd", bg: "bg-[#c4b5fd]" },
  { name: "Gold Sparkle", hex: "#fde68a", bg: "bg-[#fde68a]" },
  { name: "Rose", hex: "#fecdd3", bg: "bg-[#fecdd3]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f7] to-white relative overflow-hidden">
      {/* Screentone dot pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #ffb7c5 0.8px, transparent 0.8px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Floating petal decorations */}
      <div className="fixed top-16 right-16 w-6 h-6 bg-[#ffb7c5]/30 rounded-[50%_0_50%_50%] rotate-45 pointer-events-none" />
      <div className="fixed top-40 right-32 w-4 h-4 bg-[#fecdd3]/25 rounded-[50%_0_50%_50%] rotate-12 pointer-events-none" />
      <div className="fixed top-60 left-10 w-5 h-5 bg-[#c4b5fd]/25 rounded-[50%_0_50%_50%] -rotate-30 pointer-events-none" />
      <div className="fixed bottom-24 left-16 w-5 h-5 bg-[#ffb7c5]/25 rounded-[50%_0_50%_50%] rotate-60 pointer-events-none" />
      <div className="fixed bottom-44 right-8 w-4 h-4 bg-[#fecdd3]/30 rounded-[50%_0_50%_50%] rotate-90 pointer-events-none" />

      {/* Sparkle star decorations */}
      <div className="fixed top-28 left-24 pointer-events-none">
        <div className="w-3 h-3 bg-[#fde68a] rounded-full shadow-[0_0_8px_#fde68a]" />
      </div>
      <div className="fixed top-52 right-40 pointer-events-none">
        <div className="w-2 h-2 bg-[#fde68a] rounded-full shadow-[0_0_6px_#fde68a]" />
      </div>
      <div className="fixed bottom-60 right-20 pointer-events-none">
        <div className="w-2.5 h-2.5 bg-[#fde68a] rounded-full shadow-[0_0_8px_#fde68a]" />
      </div>

      {/* Navigation with scalloped bottom */}
      <nav className="relative z-10 px-6 py-4 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/shoujo-manga"
            className="flex items-center gap-2 text-[#ffb7c5] hover:text-[#ffb7c5]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-medium text-sm">Back to Docs</span>
          </Link>
          <span className="font-sans font-bold text-xl text-[#ffb7c5]">
            Shoujo Manga
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#ffb7c5]/30 text-[#ffb7c5] font-sans font-medium text-sm rounded-full shadow-[0_2px_10px_#ffb7c520] hover:shadow-[0_4px_15px_#ffb7c540] hover:scale-105 transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
        {/* Scalloped border bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden">
          <div
            className="w-full h-6"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 0%, transparent 8px, #ffb7c5 8px, #ffb7c5 9px, transparent 9px)",
              backgroundSize: "20px 12px",
              backgroundPosition: "0 0",
              opacity: 0.2,
            }}
          />
        </div>
      </nav>

      {/* Hero - Manga panel frame with flower corners */}
      <section className="relative z-10 pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Flower corner decorations */}
          <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center">
            <Flower2 className="w-8 h-8 text-[#ffb7c5]/40" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center">
            <Flower2 className="w-8 h-8 text-[#c4b5fd]/40" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 flex items-center justify-center">
            <Flower2 className="w-6 h-6 text-[#fecdd3]/40" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 flex items-center justify-center">
            <Flower2 className="w-6 h-6 text-[#ffb7c5]/40" />
          </div>

          {/* Main hero panel with screentone bg */}
          <div className="relative border-2 border-[#ffb7c5]/20 rounded-3xl overflow-hidden bg-white/80 p-12 text-center">
            {/* Inner screentone */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #ffb7c5 0.6px, transparent 0.6px)",
                backgroundSize: "10px 10px",
                opacity: 0.08,
              }}
            />

            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#ffb7c5] mb-2">
                Shoujo
              </h1>
              <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#c4b5fd] mb-6">
                Manga
              </h2>
              <p className="text-[#4a5568]/40 font-sans text-sm tracking-[0.3em] uppercase mb-10">
                Romantic Dream Aesthetic
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-4 bg-[#ffb7c5] text-white font-sans font-medium rounded-full shadow-[0_4px_20px_#ffb7c560] hover:scale-105 hover:shadow-[0_6px_25px_#ffb7c580] transition-all duration-300">
                  Begin Story
                </button>
                <button className="px-10 py-4 bg-white text-[#ffb7c5] font-sans font-medium rounded-full border-2 border-[#ffb7c5]/30 hover:bg-[#ffb7c5] hover:text-white hover:border-[#ffb7c5] transition-all duration-300">
                  Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ribbon banner divider */}
      <div className="relative z-10 flex justify-center py-4">
        <div className="relative">
          <div className="px-10 py-2 bg-[#ffb7c5]/15 rounded-sm relative">
            {/* Ribbon tails */}
            <div className="absolute -left-3 top-0 bottom-0 w-3 bg-[#ffb7c5]/10 clip-path-[polygon(100%_0,100%_100%,0_50%)]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }} />
            <div className="absolute -right-3 top-0 bottom-0 w-3 bg-[#ffb7c5]/10" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }} />
            <span className="text-[#ffb7c5] font-sans font-medium text-sm tracking-widest uppercase">Color Palette</span>
          </div>
        </div>
      </div>

      {/* Color Palette - circular swatches */}
      <ShowcaseSection
        title=""
        subtitle="Romantic Tones"
        className="relative z-10 py-8 px-6"
        titleClassName="hidden"
        subtitleClassName="text-[#c4b5fd] font-sans text-sm mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#ffb7c5]/20 bg-[#fff5f7] rounded-2xl shadow-[0_2px_10px_#ffb7c520]"
            labelClassName="font-sans font-medium text-sm text-[#4a5568]"
            hexClassName="text-xs text-[#ffb7c5] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Manga Panel Grid - asymmetric layout like manga pages */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Ribbon title */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="px-10 py-2 bg-[#c4b5fd]/15 rounded-sm relative">
                <div className="absolute -left-3 top-0 bottom-0 w-3" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)", background: "rgba(196,181,253,0.1)" }} />
                <div className="absolute -right-3 top-0 bottom-0 w-3" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)", background: "rgba(196,181,253,0.1)" }} />
                <span className="text-[#c4b5fd] font-sans font-medium text-sm tracking-widest uppercase">Manga Panels</span>
              </div>
            </div>
          </div>

          {/* Asymmetric manga panel grid */}
          <div className="grid grid-cols-12 gap-3">
            {/* Large panel left */}
            <div className="col-span-12 md:col-span-7 row-span-2 bg-[#fff5f7] border-2 border-[#ffb7c5]/20 rounded-2xl p-8 relative overflow-hidden min-h-[280px] flex flex-col justify-end">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffb7c5 0.5px, transparent 0.5px)",
                  backgroundSize: "8px 8px",
                  opacity: 0.06,
                }}
              />
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-[#fde68a]/50" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#ffb7c5]/20 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-[#ffb7c5]" />
                </div>
                <h3 className="text-2xl font-sans font-bold text-[#ffb7c5] mb-2">
                  Romance Arc
                </h3>
                <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed max-w-md">
                  A love story told through cherry blossom seasons, where every glance holds a thousand words unspoken.
                </p>
              </div>
            </div>

            {/* Top-right small panel */}
            <div className="col-span-6 md:col-span-5 bg-[#fff5f7] border-2 border-[#c4b5fd]/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Star className="w-5 h-5 text-[#fde68a]/50" />
              </div>
              <div className="w-10 h-10 bg-[#c4b5fd]/20 rounded-full flex items-center justify-center mb-3">
                <Star className="w-5 h-5 text-[#c4b5fd]" />
              </div>
              <h3 className="text-lg font-sans font-bold text-[#c4b5fd] mb-1">Sparkle Effect</h3>
              <p className="text-[#4a5568]/40 font-sans text-xs leading-relaxed">Every moment shines with possibility</p>
            </div>

            {/* Bottom-right small panel */}
            <div className="col-span-6 md:col-span-5 bg-[#fff5f7] border-2 border-[#fde68a]/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="w-10 h-10 bg-[#fde68a]/20 rounded-full flex items-center justify-center mb-3">
                <Flower2 className="w-5 h-5 text-[#fde68a]" />
              </div>
              <h3 className="text-lg font-sans font-bold text-[#fde68a] mb-1">Bloom</h3>
              <p className="text-[#4a5568]/40 font-sans text-xs leading-relaxed">Petals dance in the spring breeze</p>
            </div>

            {/* Bottom wide panel */}
            <div className="col-span-12 bg-gradient-to-r from-[#ffb7c5]/10 via-[#c4b5fd]/10 to-[#fecdd3]/10 border-2 border-[#fecdd3]/20 rounded-2xl p-6 flex items-center gap-6">
              <div className="w-10 h-10 bg-[#fecdd3]/20 rounded-full flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-[#fecdd3]" />
              </div>
              <div>
                <h3 className="text-lg font-sans font-bold text-[#fecdd3] mb-1">The Story Continues...</h3>
                <p className="text-[#4a5568]/40 font-sans text-xs leading-relaxed">Each chapter reveals new feelings, new connections, new possibilities waiting to unfold.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons showcase */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-8 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-4xl mx-auto">
          {/* Ribbon title */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="px-10 py-2 bg-[#ffb7c5]/15 rounded-sm relative">
                <div className="absolute -left-3 top-0 bottom-0 w-3" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)", background: "rgba(255,183,197,0.1)" }} />
                <div className="absolute -right-3 top-0 bottom-0 w-3" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)", background: "rgba(255,183,197,0.1)" }} />
                <span className="text-[#ffb7c5] font-sans font-medium text-sm tracking-widest uppercase">Buttons</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/80 border-2 border-[#ffb7c5]/15 rounded-3xl">
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-7 py-3 bg-[#ffb7c5] text-white font-sans font-medium rounded-full shadow-[0_4px_15px_#ffb7c560] hover:scale-105 hover:shadow-[0_6px_20px_#ffb7c580] transition-all duration-300">
                Sakura
              </button>
              <button className="px-7 py-3 bg-[#c4b5fd] text-white font-sans font-medium rounded-full shadow-[0_4px_15px_#c4b5fd60] hover:scale-105 hover:shadow-[0_6px_20px_#c4b5fd80] transition-all duration-300">
                Lavender
              </button>
              <button className="px-7 py-3 bg-transparent text-[#ffb7c5] border-2 border-[#ffb7c5]/40 font-sans font-medium rounded-full hover:bg-[#ffb7c5] hover:text-white hover:border-[#ffb7c5] transition-all duration-300">
                Outline
              </button>
              <button className="px-7 py-3 bg-[#fde68a] text-[#4a5568] font-sans font-medium rounded-full shadow-[0_4px_15px_#fde68a60] hover:scale-105 hover:shadow-[0_6px_20px_#fde68a80] transition-all duration-300">
                Gold
              </button>
              <button className="px-7 py-3 bg-[#fecdd3] text-[#4a5568] font-sans font-medium rounded-full shadow-[0_2px_10px_#fecdd320] hover:scale-105 transition-all duration-300">
                Rose
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Love Letter form with lace border */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Ribbon title */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="px-10 py-2 bg-[#fecdd3]/15 rounded-sm relative">
                <div className="absolute -left-3 top-0 bottom-0 w-3" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)", background: "rgba(254,205,211,0.1)" }} />
                <div className="absolute -right-3 top-0 bottom-0 w-3" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)", background: "rgba(254,205,211,0.1)" }} />
                <span className="text-[#fecdd3] font-sans font-medium text-sm tracking-widest uppercase">Love Letter</span>
              </div>
            </div>
          </div>

          {/* Form card with lace top border */}
          <div className="relative">
            {/* Lace scallop top border */}
            <div className="absolute -top-2 left-4 right-4 h-4 overflow-hidden">
              <div
                className="w-full h-8"
                style={{
                  backgroundImage: "radial-gradient(circle at 50% 100%, white 6px, transparent 6px), radial-gradient(circle at 50% 100%, #ffb7c5 7px, transparent 7px)",
                  backgroundSize: "16px 8px",
                  backgroundPosition: "0 0",
                  opacity: 0.3,
                }}
              />
            </div>

            <div className="bg-white/90 border-2 border-[#ffb7c5]/20 rounded-3xl p-8 pt-10 relative overflow-hidden">
              {/* Flower corners on the form */}
              <div className="absolute top-3 left-3">
                <Flower2 className="w-4 h-4 text-[#ffb7c5]/25" />
              </div>
              <div className="absolute top-3 right-3">
                <Flower2 className="w-4 h-4 text-[#c4b5fd]/25" />
              </div>

              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto bg-[#ffb7c5]/15 rounded-full flex items-center justify-center mb-3">
                  <PenTool className="w-7 h-7 text-[#ffb7c5]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#ffb7c5]">My Diary</h3>
                <p className="text-[#4a5568]/30 font-sans text-xs mt-1">Write your heart</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-sans text-[#ffb7c5] mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name..."
                    className="w-full px-5 py-3 bg-[#fff5f7] border border-[#ffb7c5]/25 rounded-full text-[#4a5568] placeholder-[#ffb7c5]/40 font-sans focus:border-[#ffb7c5] focus:shadow-[0_0_12px_#ffb7c540] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#c4b5fd] mb-2">Message</label>
                  <input
                    type="text"
                    placeholder="Your feelings..."
                    className="w-full px-5 py-3 bg-[#fff5f7] border border-[#c4b5fd]/25 rounded-full text-[#4a5568] placeholder-[#c4b5fd]/40 font-sans focus:border-[#c4b5fd] focus:shadow-[0_0_12px_#c4b5fd40] focus:outline-none transition-all"
                  />
                </div>
                <button className="w-full px-7 py-3 bg-[#ffb7c5] text-white font-sans font-medium rounded-full shadow-[0_4px_15px_#ffb7c560] hover:scale-105 hover:shadow-[0_6px_20px_#ffb7c580] transition-all duration-300">
                  Send with Love
                </button>
              </div>
            </div>

            {/* Lace scallop bottom border */}
            <div className="absolute -bottom-2 left-4 right-4 h-4 overflow-hidden rotate-180">
              <div
                className="w-full h-8"
                style={{
                  backgroundImage: "radial-gradient(circle at 50% 100%, white 6px, transparent 6px), radial-gradient(circle at 50% 100%, #ffb7c5 7px, transparent 7px)",
                  backgroundSize: "16px 8px",
                  backgroundPosition: "0 0",
                  opacity: 0.3,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer with heart accent */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#ffb7c5]/15">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-[#4a5568]/30 text-sm font-sans">
            Shoujo Manga Showcase
          </p>
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 text-[#ffb7c5]/40" />
            <Link href="/" className="text-[#ffb7c5]/50 hover:text-[#ffb7c5]/80 transition-colors font-sans text-sm">
              StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
