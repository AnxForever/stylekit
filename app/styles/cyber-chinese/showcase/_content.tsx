"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Hexagon, Zap, Shield } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Vermilion", hex: "#d4553a", bg: "bg-[#d4553a]" },
  { name: "Gold", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Electric Blue", hex: "#00d4ff", bg: "bg-[#00d4ff]" },
  { name: "Neon Purple", hex: "#a020f0", bg: "bg-[#a020f0]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(212,85,58,0.06)_1px,transparent_1px),linear-gradient(rgba(201,162,39,0.06)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Seal stamp decoration */}
      <div className="fixed top-20 right-20 w-20 h-20 border-2 border-[#d4553a]/40 rotate-12 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[#d4553a]/40 text-2xl font-bold">鍗?/span>
      </div>

      {/* Lantern glow top-left */}
      <div className="fixed top-40 left-10 w-6 h-10 bg-[#d4553a]/20 shadow-[0_0_30px_rgba(212,85,58,0.3)] pointer-events-none z-0" />
      <div className="fixed top-40 right-10 w-6 h-10 bg-[#d4553a]/20 shadow-[0_0_30px_rgba(212,85,58,0.3)] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#d4553a]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cyber-chinese"
            className="flex items-center gap-2 text-[#c9a227] hover:text-[#c9a227]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wider">Back</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4553a] to-[#c9a227] tracking-wider">
            CYBER CHINESE
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#d4553a]/40 text-[#d4553a] font-bold tracking-wider shadow-[0_0_10px_rgba(212,85,58,0.2)] hover:bg-[#d4553a]/10 hover:shadow-[0_0_16px_rgba(212,85,58,0.4)] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="CYBER CHINESE"
        description="Where tradition meets tomorrow - 鍙や粖纰版挒鐨勮禌鍗氫笢鏂瑰够鎯?
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#d4553a] to-[#c9a227] mb-6"
        descriptionClassName="text-xl text-[#00d4ff]/70 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-gradient-to-r from-[#d4553a] to-[#c9a227] text-white font-bold tracking-wider shadow-[0_0_24px_rgba(212,85,58,0.5)] hover:shadow-[0_0_40px_rgba(201,162,39,0.7)] hover:scale-105 transition-all duration-300">
            Explore
          </button>
          <button className="px-10 py-4 bg-transparent border border-[#00d4ff]/50 text-[#00d4ff] font-bold tracking-wider shadow-[0_0_10px_rgba(0,212,255,0.2)] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="涓滄柟闇撹櫣鍏夎氨"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#c9a227] mb-4 text-center"
        subtitleClassName="text-[#00d4ff]/50 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#d4553a]/20 bg-[#0a0a0a]/80 shadow-[0_0_12px_rgba(212,85,58,0.15)]"
            labelClassName="font-bold text-sm text-[#c9a227]"
            hexClassName="text-xs text-[#00d4ff] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="璧涘崥涓滄柟浜や簰"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#c9a227] mb-4 text-center"
        subtitleClassName="text-[#00d4ff]/50 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a]/80 border border-[#d4553a]/20 shadow-[0_0_20px_rgba(212,85,58,0.15)]">
            <p className="text-sm font-bold text-[#d4553a] tracking-wider mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#d4553a] border border-[#c9a227] text-white font-bold tracking-wider shadow-[0_0_16px_rgba(212,85,58,0.5)] hover:shadow-[0_0_24px_rgba(201,162,39,0.6)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#0a0a0a] border border-[#00d4ff]/50 text-[#00d4ff] font-bold tracking-wider shadow-[0_0_12px_rgba(0,212,255,0.3)] hover:bg-[#00d4ff]/10 transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border border-[#d4553a]/50 text-[#d4553a] font-bold tracking-wider hover:bg-[#d4553a]/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#c9a227]/60 font-bold tracking-wider hover:text-[#c9a227] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="璧涘崥涓滄柟瀹瑰櫒"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#c9a227] mb-4 text-center"
        subtitleClassName="text-[#00d4ff]/50 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a]/90 border border-[#d4553a]/30 shadow-[0_0_20px_rgba(212,85,58,0.2)]">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4553a] to-[#c9a227] flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(212,85,58,0.4)]">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#c9a227] mb-2">
              Dragon
            </h3>
            <p className="text-[#00d4ff]/60">Ancient power, neon reborn</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/90 border border-[#00d4ff]/30 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#a020f0] flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(0,212,255,0.4)]">
              <Hexagon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#00d4ff] mb-2">
              Phoenix
            </h3>
            <p className="text-[#c9a227]/60">Rebirth in electric light</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/90 border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.2)]">
            <div className="w-16 h-16 bg-gradient-to-br from-[#c9a227] to-[#d4553a] flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(201,162,39,0.4)]">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#d4553a] mb-2">
              Seal
            </h3>
            <p className="text-[#a020f0]/60">Authority of the future</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="琛ㄥ崟"
        subtitle="璧涘崥涓滄柟杈撳叆"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#c9a227] mb-4 text-center"
        subtitleClassName="text-[#00d4ff]/50 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a]/90 border border-[#d4553a]/20 shadow-[0_0_24px_rgba(212,85,58,0.2)]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto border-2 border-[#d4553a]/60 flex items-center justify-center shadow-[0_0_20px_rgba(212,85,58,0.3)] mb-4">
                <Zap className="w-10 h-10 text-[#c9a227]" />
              </div>
              <h3 className="text-xl font-bold text-[#c9a227]">Connect</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#d4553a] tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#c9a227]/40 text-[#00d4ff] placeholder-[#c9a227]/30 focus:border-[#00d4ff] focus:shadow-[0_0_16px_rgba(0,212,255,0.5)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#c9a227] tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter text..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#d4553a]/40 text-[#00d4ff] placeholder-[#d4553a]/30 focus:border-[#00d4ff] focus:shadow-[0_0_16px_rgba(0,212,255,0.5)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#d4553a] to-[#c9a227] text-white font-bold tracking-wider shadow-[0_0_16px_rgba(212,85,58,0.5)] hover:shadow-[0_0_24px_rgba(201,162,39,0.6)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#d4553a]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#c9a227]/40 text-sm">
            Cyber Chinese Showcase 路 Part of{" "}
            <Link href="/" className="text-[#c9a227]/60 hover:text-[#c9a227] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

