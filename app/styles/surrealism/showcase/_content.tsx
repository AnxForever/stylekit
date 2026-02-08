"use client";

import Link from "next/link";
import { ArrowLeft, Eye, Moon, Clock, Sparkles } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Midnight Blue", hex: "#1a1a3e", bg: "bg-[#1a1a3e]" },
  { name: "Desert Gold", hex: "#d4a574", bg: "bg-[#d4a574]" },
  { name: "Rose Pink", hex: "#c38d94", bg: "bg-[#c38d94]" },
  { name: "Sky White", hex: "#f0ece4", bg: "bg-[#f0ece4]" },
  { name: "Deep Violet", hex: "#4a3f6b", bg: "bg-[#4a3f6b]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] via-[#2a2a5e] to-[#1a1a3e] relative overflow-hidden">
      {/* Floating dream orbs */}
      <div className="fixed top-20 right-[15%] w-64 h-64 rounded-full bg-[#d4a574]/15 blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 left-[10%] w-48 h-48 rounded-full bg-[#c38d94]/15 blur-3xl pointer-events-none" />
      <div className="fixed top-[60%] right-[30%] w-32 h-32 rounded-full bg-[#4a3f6b]/20 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#d4a574]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/surrealism"
            className="flex items-center gap-2 text-[#d4a574] hover:text-[#c38d94] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif italic tracking-wide">Back</span>
          </Link>
          <span className="font-serif italic text-xl text-[#f0ece4]">
            Surrealism
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#d4a574]/40 text-[#d4a574] font-serif italic tracking-wide rounded-lg hover:bg-[#d4a574]/10 hover:border-[#d4a574] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Surrealism"
        description="Beyond the threshold of consciousness - 娼滄剰璇嗙殑闂ㄦ墘涔嬪"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-serif italic text-[#f0ece4] mb-6"
        descriptionClassName="text-xl text-[#d4a574] font-serif italic max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-gradient-to-r from-[#c38d94] to-[#d4a574] text-[#1a1a3e] font-serif italic tracking-wide rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgba(212,165,116,0.5)] hover:scale-105 transition-all duration-500">
            Descend
          </button>
          <button className="px-10 py-4 bg-transparent text-[#f0ece4] border border-[#f0ece4]/30 font-serif italic tracking-wide rounded-lg hover:bg-[#f0ece4]/10 hover:border-[#f0ece4]/60 transition-all duration-500">
            Wander
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="姊﹀鐨勮壊璋?"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif italic text-[#f0ece4] mb-4 text-center"
        subtitleClassName="text-[#d4a574]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#d4a574]/20 bg-[#1a1a3e]/60 backdrop-blur-sm rounded-2xl shadow-lg"
            labelClassName="font-serif italic text-sm text-[#f0ece4]"
            hexClassName="text-xs text-[#d4a574] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="姊﹀鐨勫叆鍙?"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif italic text-[#f0ece4] mb-4 text-center"
        subtitleClassName="text-[#d4a574]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a1a3e]/60 backdrop-blur-sm border border-[#d4a574]/20 rounded-2xl shadow-lg">
            <p className="text-sm font-serif italic text-[#d4a574] tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-[#1a1a3e] to-[#c38d94] text-[#f0ece4] font-serif italic tracking-wide rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgba(195,141,148,0.4)] transition-all duration-500">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#d4a574]/20 text-[#f0ece4] border border-[#d4a574]/30 font-serif italic tracking-wide rounded-lg hover:bg-[#d4a574]/30 transition-all duration-500">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent text-[#c38d94] border border-[#c38d94]/40 font-serif italic tracking-wide rounded-lg hover:bg-[#c38d94]/10 transition-all duration-500">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#d4a574]/70 font-serif italic tracking-wide hover:text-[#d4a574] transition-all duration-500">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="鎰忚瘑鐨勭鐗?"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif italic text-[#f0ece4] mb-4 text-center"
        subtitleClassName="text-[#d4a574]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80 border border-[#d4a574]/30 rounded-2xl shadow-lg hover:shadow-[0_12px_40px_rgba(212,165,116,0.2)] transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1a1a3e] to-[#4a3f6b] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Eye className="w-8 h-8 text-[#f0ece4]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#1a1a3e] mb-2">
              Perception
            </h3>
            <p className="text-[#1a1a3e]/60 font-serif">The eye sees what the mind dreams</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#1a1a3e] to-[#1a1a3e]/90 border border-[#c38d94]/30 rounded-2xl shadow-lg hover:shadow-[0_12px_40px_rgba(195,141,148,0.2)] transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-[#c38d94] to-[#d4a574] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Moon className="w-8 h-8 text-[#1a1a3e]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#f0ece4] mb-2">
              Nocturne
            </h3>
            <p className="text-[#f0ece4]/60 font-serif">Midnight whispers in amber light</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#c38d94]/20 to-[#d4a574]/20 border border-[#c38d94]/40 rounded-2xl shadow-lg hover:shadow-[0_12px_40px_rgba(26,26,62,0.2)] transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4a574] to-[#c38d94] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-[#1a1a3e]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#1a1a3e] mb-2">
              Persistence
            </h3>
            <p className="text-[#1a1a3e]/60 font-serif">Time melts in the desert sun</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="琛ㄥ崟"
        subtitle="姊﹀閫氶亾"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif italic text-[#f0ece4] mb-4 text-center"
        subtitleClassName="text-[#d4a574]/60 font-serif italic mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#1a1a3e]/60 backdrop-blur-sm border border-[#d4a574]/20 rounded-2xl shadow-[0_20px_60px_rgba(26,26,62,0.4)]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#c38d94] to-[#d4a574] rounded-full flex items-center justify-center shadow-lg mb-4">
                <Sparkles className="w-10 h-10 text-[#1a1a3e]" />
              </div>
              <h3 className="text-xl font-serif italic text-[#f0ece4]">Enter the Dream</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif italic text-[#d4a574] tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Whisper your name..."
                  className="w-full px-4 py-3 bg-[#f0ece4]/10 border border-[#d4a574]/40 rounded-lg text-[#f0ece4] placeholder-[#d4a574]/40 font-serif italic focus:border-[#c38d94] focus:shadow-[0_0_16px_rgba(195,141,148,0.3)] focus:outline-none transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-xs font-serif italic text-[#c38d94] tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your dream address..."
                  className="w-full px-4 py-3 bg-[#f0ece4]/10 border border-[#c38d94]/40 rounded-lg text-[#f0ece4] placeholder-[#c38d94]/40 font-serif italic focus:border-[#d4a574] focus:shadow-[0_0_16px_rgba(212,165,116,0.3)] focus:outline-none transition-all duration-500"
                />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#c38d94] to-[#d4a574] text-[#1a1a3e] font-serif italic tracking-wide rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgba(212,165,116,0.5)] transition-all duration-500">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#d4a574]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#d4a574]/50 text-sm font-serif italic">
            Surrealism Showcase 路 Part of{" "}
            <Link href="/" className="text-[#d4a574] hover:text-[#c38d94] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

