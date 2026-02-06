"use client";

import Link from "next/link";
import { ArrowLeft, Cpu, Shield, Zap, Terminal } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Purple", hex: "#7c3aed", bg: "bg-[#7c3aed]" },
  { name: "Cyan-Green", hex: "#06d6a0", bg: "bg-[#06d6a0]" },
  { name: "Hot Pink", hex: "#ff006e", bg: "bg-[#ff006e]" },
  { name: "Sky Blue", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
  { name: "Dark BG", hex: "#0f0f1a", bg: "bg-[#0f0f1a]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] relative overflow-hidden">
      {/* Decorative grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Decorative glow orbs */}
      <div className="fixed top-20 right-20 w-60 h-60 bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-48 h-48 bg-[#06d6a0]/10 blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/3 w-40 h-40 bg-[#ff006e]/5 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#7c3aed]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cyber-anime"
            className="flex items-center gap-2 text-[#06d6a0] hover:text-[#06d6a0]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-[#7c3aed] uppercase tracking-widest">
            CYBER ANIME
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#06d6a0]/50 text-[#06d6a0] font-bold uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(6,214,160,0.2)] hover:shadow-[0_0_15px_rgba(6,214,160,0.4)] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="CYBER ANIME"
        description="Where sci-fi meets anime aesthetics - neon glow, holographic panels, dark interfaces"
        className="relative z-10 pt-24 pb-20 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-[#7c3aed] uppercase tracking-wider mb-4 [text-shadow:0_0_40px_rgba(124,58,237,0.5)]"
        descriptionClassName="text-lg text-[#e0e0ff]/50 max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-8">
          <span className="text-3xl md:text-5xl font-bold text-[#06d6a0] uppercase tracking-[0.3em]">
            INITIALIZE
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#7c3aed] text-white font-bold uppercase tracking-widest border border-[#06d6a0]/50 shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-all duration-300">
            Execute
          </button>
          <button className="px-10 py-4 bg-transparent text-[#06d6a0] font-bold uppercase tracking-widest border border-[#06d6a0] shadow-[0_0_10px_rgba(6,214,160,0.3)] hover:shadow-[0_0_20px_rgba(6,214,160,0.5)] transition-all duration-300">
            Scan
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR MATRIX"
        subtitle="NEON SPECTRUM"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#7c3aed]/30 bg-[#0f0f1a]/90 backdrop-blur-sm shadow-[0_0_10px_rgba(124,58,237,0.15)]"
            labelClassName="font-bold text-sm text-[#e0e0ff] uppercase tracking-wider"
            hexClassName="text-xs text-[#06d6a0] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="CONTROLS"
        subtitle="INTERACTIVE ELEMENTS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0f0f1a]/90 border border-[#7c3aed]/20 backdrop-blur-sm shadow-[0_0_20px_rgba(124,58,237,0.1)]">
            <p className="text-sm font-bold text-[#06d6a0] uppercase tracking-widest mb-6">ACTIONS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#7c3aed] text-white font-bold uppercase tracking-widest text-sm border border-[#06d6a0]/50 shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 bg-transparent text-[#06d6a0] font-bold uppercase tracking-widest text-sm border border-[#06d6a0] shadow-[0_0_10px_rgba(6,214,160,0.3)] hover:shadow-[0_0_15px_rgba(6,214,160,0.5)] transition-all duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#ff006e] text-white font-bold uppercase tracking-widest text-sm border border-[#ff006e]/50 shadow-[0_0_15px_rgba(255,0,110,0.5)] hover:shadow-[0_0_25px_rgba(255,0,110,0.7)] transition-all duration-300">
                Accent
              </button>
              <button className="px-6 py-3 bg-transparent text-[#38bdf8] font-bold uppercase tracking-widest text-sm border border-[#38bdf8]/50 shadow-[0_0_10px_rgba(56,189,248,0.3)] hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300">
                Info
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="DATA PANELS"
        subtitle="HOLOGRAPHIC INTERFACE"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-sm"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f0f1a]/90 border border-[#7c3aed]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 border border-[#7c3aed]/50 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-[#7c3aed]" />
            </div>
            <h3 className="text-lg font-bold text-[#06d6a0] uppercase tracking-wider mb-2">
              NEURAL CORE
            </h3>
            <p className="text-[#e0e0ff]/50 text-sm">Processing unit online, all systems nominal</p>
          </div>

          <div className="p-6 bg-[#0f0f1a]/90 border border-[#06d6a0]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(6,214,160,0.15)] hover:shadow-[0_0_25px_rgba(6,214,160,0.3)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 border border-[#06d6a0]/50 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#06d6a0]" />
            </div>
            <h3 className="text-lg font-bold text-[#38bdf8] uppercase tracking-wider mb-2">
              FIREWALL
            </h3>
            <p className="text-[#e0e0ff]/50 text-sm">Defense matrix active, threat level zero</p>
          </div>

          <div className="p-6 bg-[#0f0f1a]/90 border border-[#ff006e]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,110,0.15)] hover:shadow-[0_0_25px_rgba(255,0,110,0.3)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 border border-[#ff006e]/50 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#ff006e]" />
            </div>
            <h3 className="text-lg font-bold text-[#ff006e] uppercase tracking-wider mb-2">
              OVERCLOCK
            </h3>
            <p className="text-[#e0e0ff]/50 text-sm">Boost mode enabled, maximum performance</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="TERMINAL"
        subtitle="DATA INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0f0f1a]/90 border border-[#7c3aed]/30 backdrop-blur-sm shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto border border-[#06d6a0]/50 flex items-center justify-center mb-4 shadow-[0_0_10px_rgba(6,214,160,0.2)]">
                <Terminal className="w-7 h-7 text-[#06d6a0]" />
              </div>
              <h3 className="text-xl font-bold text-[#7c3aed] uppercase tracking-widest">ACCESS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#06d6a0] uppercase tracking-widest mb-2">USER ID</label>
                <input
                  type="text"
                  placeholder="Enter user ID..."
                  className="w-full px-4 py-3 bg-[#0f0f1a]/80 border border-[#7c3aed]/30 text-[#e0e0ff] placeholder-[#e0e0ff]/30 font-mono focus:border-[#06d6a0] focus:shadow-[0_0_15px_rgba(6,214,160,0.3)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ff006e] uppercase tracking-widest mb-2">ACCESS KEY</label>
                <input
                  type="password"
                  placeholder="Enter access key..."
                  className="w-full px-4 py-3 bg-[#0f0f1a]/80 border border-[#7c3aed]/30 text-[#e0e0ff] placeholder-[#e0e0ff]/30 font-mono focus:border-[#ff006e] focus:shadow-[0_0_15px_rgba(255,0,110,0.3)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#7c3aed] text-white font-bold uppercase tracking-widest text-sm border border-[#06d6a0]/50 shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_rgba(124,58,237,0.7)] transition-all duration-300">
                AUTHENTICATE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#7c3aed]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e0e0ff]/30 text-sm uppercase tracking-widest">
            Cyber Anime Showcase · Part of{" "}
            <Link href="/" className="text-[#06d6a0] hover:text-[#06d6a0]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
