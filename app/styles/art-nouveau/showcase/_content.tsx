"use client";

import Link from "next/link";
import { ArrowLeft, Flower2, Leaf, Palette, Gem } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Green", hex: "#2d5016", bg: "bg-[#2d5016]" },
  { name: "Gold", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Ivory", hex: "#f5f0e1", bg: "bg-[#f5f0e1]" },
  { name: "Wisteria", hex: "#8b6db5", bg: "bg-[#8b6db5]" },
  { name: "Forest", hex: "#4a7c3f", bg: "bg-[#4a7c3f]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0e1] to-[#e8dcc8] relative overflow-hidden">
      {/* Decorative vine curves */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          <path d="M-100,200 Q200,100 400,300 T800,200 T1300,300" fill="none" stroke="#2d5016" strokeWidth="3" />
          <path d="M-100,500 Q300,400 500,600 T900,500 T1300,600" fill="none" stroke="#c9a227" strokeWidth="2" />
          <path d="M-100,350 Q250,250 450,400 T850,350 T1300,450" fill="none" stroke="#8b6db5" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#c9a227]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/art-nouveau"
            className="flex items-center gap-2 text-[#2d5016] hover:text-[#c9a227] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif tracking-wide">Back</span>
          </Link>
          <span className="font-serif text-xl text-[#2d5016] tracking-wide">
            Art Nouveau
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#c9a227]/50 text-[#2d5016] font-serif tracking-wide rounded-full hover:bg-[#c9a227]/10 hover:border-[#c9a227] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Art Nouveau"
        description="The harmony of nature and art - 鑷劧涓庤壓鏈殑鏈夋満缁熶竴"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif text-[#2d5016] mb-6"
        descriptionClassName="text-xl text-[#2d5016]/70 font-serif italic max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#2d5016] text-[#f5f0e1] border-2 border-[#c9a227] rounded-full font-serif tracking-wide shadow-md hover:bg-[#c9a227] hover:text-[#2d5016] hover:shadow-lg transition-all duration-300">
            Explore
          </button>
          <button className="px-10 py-4 bg-transparent text-[#2d5016] border-2 border-[#2d5016] rounded-full font-serif tracking-wide hover:bg-[#2d5016]/10 hover:shadow-md transition-all duration-300">
            Gallery
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="鑷劧鐨勯璧?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#2d5016] mb-4 text-center"
        subtitleClassName="text-[#2d5016]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#c9a227]/30 bg-white/50 rounded-2xl shadow-sm"
            labelClassName="font-serif text-sm text-[#2d5016]"
            hexClassName="text-xs text-[#c9a227] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="鏈夋満鏇茬嚎璁捐"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#2d5016] mb-4 text-center"
        subtitleClassName="text-[#2d5016]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/40 backdrop-blur-sm border-2 border-[#c9a227]/30 rounded-2xl shadow-md">
            <p className="text-sm font-serif text-[#c9a227] tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#2d5016] text-[#f5f0e1] border-2 border-[#c9a227] rounded-full font-serif tracking-wide shadow-md hover:bg-[#c9a227] hover:text-[#2d5016] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#f5f0e1] text-[#2d5016] border-2 border-[#2d5016] rounded-full font-serif tracking-wide hover:shadow-md transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent text-[#c9a227] border-2 border-[#c9a227] rounded-full font-serif tracking-wide hover:bg-[#c9a227]/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#8b6db5] font-serif tracking-wide hover:text-[#2d5016] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="鑷劧涓庤楗扮殑铻嶅悎"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#2d5016] mb-4 text-center"
        subtitleClassName="text-[#2d5016]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#f5f0e1] border-2 border-[#c9a227]/40 rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(201,162,39,0.2)] transition-all duration-300">
            <div className="w-16 h-16 bg-[#2d5016] rounded-full flex items-center justify-center mb-4 shadow-md">
              <Flower2 className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-serif text-[#2d5016] mb-2">
              Flora
            </h3>
            <p className="text-[#2d5016]/60 font-serif">Organic patterns inspired by nature</p>
          </div>

          <div className="p-6 bg-[#f5f0e1] border-2 border-[#2d5016]/30 rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(45,80,22,0.15)] transition-all duration-300">
            <div className="w-16 h-16 bg-[#c9a227] rounded-full flex items-center justify-center mb-4 shadow-md">
              <Leaf className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-serif text-[#2d5016] mb-2">
              Vine
            </h3>
            <p className="text-[#2d5016]/60 font-serif">Flowing curves and elegant lines</p>
          </div>

          <div className="p-6 bg-[#f5f0e1] border-2 border-[#8b6db5]/30 rounded-2xl shadow-md hover:shadow-[0_8px_30px_rgba(139,109,181,0.15)] transition-all duration-300">
            <div className="w-16 h-16 bg-[#8b6db5] rounded-full flex items-center justify-center mb-4 shadow-md">
              <Gem className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-serif text-[#2d5016] mb-2">
              Jewel
            </h3>
            <p className="text-[#2d5016]/60 font-serif">Precious decorative elements</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="琛ㄥ崟"
        subtitle="浼橀泤鐨勪氦浜掑厓绱?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#2d5016] mb-4 text-center"
        subtitleClassName="text-[#2d5016]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/40 backdrop-blur-sm border-2 border-[#c9a227]/30 rounded-2xl shadow-md">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#2d5016] to-[#4a7c3f] rounded-full flex items-center justify-center shadow-md mb-4">
                <Palette className="w-10 h-10 text-[#f5f0e1]" />
              </div>
              <h3 className="text-xl font-serif text-[#2d5016]">Join the Movement</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#c9a227] tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#c9a227]/40 rounded-full text-[#2d5016] placeholder-[#8b6db5]/50 focus:border-[#c9a227] focus:shadow-[0_0_12px_rgba(201,162,39,0.3)] focus:outline-none transition-all font-serif"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#2d5016] tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#2d5016]/30 rounded-full text-[#2d5016] placeholder-[#2d5016]/40 focus:border-[#2d5016] focus:shadow-[0_0_12px_rgba(45,80,22,0.2)] focus:outline-none transition-all font-serif"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#2d5016] text-[#f5f0e1] border-2 border-[#c9a227] rounded-full font-serif tracking-wide shadow-md hover:bg-[#c9a227] hover:text-[#2d5016] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#c9a227]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#2d5016]/50 text-sm font-serif">
            Art Nouveau Showcase 路 Part of{" "}
            <Link href="/" className="text-[#2d5016] hover:text-[#c9a227] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

