"use client";

import Link from "next/link";
import { ArrowLeft, Zap, Monitor, Cpu, Terminal } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]" },
  { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]" },
  { name: "Yellow", hex: "#ffff00", bg: "bg-[#ffff00]" },
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "White", hex: "#ffffff", bg: "bg-white" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Scan line overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-30"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)",
        }}
      />

      {/* Decorative glitch blocks */}
      <div className="fixed top-20 right-10 w-32 h-2 bg-[#ff00ff]/20 pointer-events-none" />
      <div className="fixed top-24 right-14 w-24 h-2 bg-[#00ffff]/20 pointer-events-none" />
      <div className="fixed bottom-32 left-8 w-40 h-1 bg-[#ffff00]/15 pointer-events-none" />
      <div className="fixed bottom-36 left-12 w-28 h-1 bg-[#ff00ff]/15 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#00ffff]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/glitch-art"
            className="flex items-center gap-2 text-[#00ffff] hover:text-[#00ffff]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-widest">Back to Docs</span>
          </Link>
          <span className="font-mono font-bold text-xl text-[#ff00ff] uppercase tracking-widest">
            GLITCH_ART
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#00ffff]/30 text-[#00ffff] font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="GLITCH"
        description="ERROR_404: Reality not found. Embrace the digital corruption."
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-mono font-bold text-[#00ffff] uppercase mb-2"
        descriptionClassName="text-lg text-[#ffffff]/30 font-mono max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-mono font-bold text-[#ff00ff] uppercase absolute top-[2px] left-[4px] opacity-60">
            ART
          </span>
          <span className="text-4xl md:text-6xl font-mono font-bold text-[#ffff00] uppercase absolute top-[-2px] left-[-4px] opacity-40">
            ART
          </span>
          <span className="text-4xl md:text-6xl font-mono font-bold text-[#00ffff] uppercase relative">
            ART
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#00ffff] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all duration-150">
            Execute
          </button>
          <button className="px-10 py-4 bg-[#0a0a0a] text-[#00ffff] border border-[#00ffff] font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all duration-150">
            Corrupt
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="RGB_CHANNELS"
        subtitle="PRIMARY SIGNALS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#00ffff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#ffffff]/20 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#00ffff]/20 bg-[#0a0a0a] rounded-sm"
            labelClassName="font-mono font-bold text-sm text-[#ffffff]/70 uppercase"
            hexClassName="text-xs text-[#00ffff] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="RGB_DISPLACEMENT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#00ffff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#ffffff]/20 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a] border border-[#00ffff]/20 rounded-sm">
            <p className="text-sm font-mono font-bold text-[#ff00ff] uppercase tracking-widest mb-6">VARIANTS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#00ffff] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all">
                Cyan
              </button>
              <button className="px-6 py-3 bg-[#0a0a0a] text-[#00ffff] border border-[#00ffff] font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#ff00ff] text-white font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#00ffff,-2px_0_#ffff00] hover:shadow-[4px_0_#00ffff,-4px_0_#ffff00] transition-all">
                Magenta
              </button>
              <button className="px-6 py-3 bg-transparent text-[#ffff00] border border-[#ffff00]/50 font-mono font-bold uppercase tracking-widest rounded-sm shadow-[1px_0_#ff00ff,-1px_0_#00ffff] hover:shadow-[3px_0_#ff00ff,-3px_0_#00ffff] transition-all">
                Yellow
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="DATA_BLOCKS"
        subtitle="CORRUPTED_PANELS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#00ffff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#ffffff]/20 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a] border border-[#00ffff]/20 rounded-sm hover:border-[#00ffff]/50 hover:shadow-[0_0_20px_#00ffff20] transition-all duration-150">
            <div className="w-14 h-14 bg-[#00ffff]/10 border border-[#00ffff]/30 flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-[#00ffff]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#00ffff] uppercase mb-2">
              SIGNAL
            </h3>
            <p className="text-[#ffffff]/30 font-mono text-sm">Data stream intercepted and decoded</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border border-[#ff00ff]/20 rounded-sm hover:border-[#ff00ff]/50 hover:shadow-[0_0_20px_#ff00ff20] transition-all duration-150">
            <div className="w-14 h-14 bg-[#ff00ff]/10 border border-[#ff00ff]/30 flex items-center justify-center mb-4">
              <Monitor className="w-7 h-7 text-[#ff00ff]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#ff00ff] uppercase mb-2">
              DISPLAY
            </h3>
            <p className="text-[#ffffff]/30 font-mono text-sm">CRT phosphor burn-in detected</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border border-[#ffff00]/20 rounded-sm hover:border-[#ffff00]/50 hover:shadow-[0_0_20px_#ffff0020] transition-all duration-150">
            <div className="w-14 h-14 bg-[#ffff00]/10 border border-[#ffff00]/30 flex items-center justify-center mb-4">
              <Cpu className="w-7 h-7 text-[#ffff00]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#ffff00] uppercase mb-2">
              PROCESS
            </h3>
            <p className="text-[#ffffff]/30 font-mono text-sm">Buffer overflow in memory sector</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="INPUT"
        subtitle="DATA_ENTRY"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#00ffff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#ffffff]/20 font-mono uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a] border border-[#00ffff]/20 rounded-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#00ffff]/10 border border-[#00ffff]/30 flex items-center justify-center mb-4">
                <Terminal className="w-8 h-8 text-[#00ffff]" />
              </div>
              <h3 className="text-xl font-mono font-bold text-[#00ffff] uppercase">ACCESS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#ff00ff] uppercase tracking-widest mb-2">USER_ID</label>
                <input
                  type="text"
                  placeholder="ENTER_ID..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#00ffff]/30 rounded-sm text-[#00ffff] placeholder-[#00ffff]/30 font-mono focus:border-[#00ffff] focus:shadow-[0_0_10px_#00ffff40] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#ffff00] uppercase tracking-widest mb-2">PASSKEY</label>
                <input
                  type="password"
                  placeholder="ENTER_KEY..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#00ffff]/30 rounded-sm text-[#00ffff] placeholder-[#00ffff]/30 font-mono focus:border-[#ff00ff] focus:shadow-[0_0_10px_#ff00ff40] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#00ffff] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-sm shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all">
                AUTHENTICATE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#00ffff]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#ffffff]/20 text-sm font-mono uppercase tracking-widest">
            Glitch Art Showcase // Part of{" "}
            <Link href="/" className="text-[#00ffff] hover:text-[#00ffff]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
