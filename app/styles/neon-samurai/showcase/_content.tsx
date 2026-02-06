"use client";

import Link from "next/link";
import { ArrowLeft, Swords, Zap, Shield, Eye } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Neon Red", hex: "#dc2626", bg: "bg-[#dc2626]" },
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Electric Purple", hex: "#a020f0", bg: "bg-[#a020f0]" },
  { name: "Neon Blue", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
  { name: "Gold", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative scan lines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.3) 2px, rgba(220,38,38,0.3) 4px)",
      }} />

      {/* Neon glow accents */}
      <div className="fixed top-20 right-20 w-64 h-64 bg-[#dc2626]/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-48 h-48 bg-[#a020f0]/5 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#dc2626]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/neon-samurai"
            className="flex items-center gap-2 text-[#dc2626] hover:text-[#dc2626]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-bold uppercase tracking-widest text-sm">Back to Docs</span>
          </Link>
          <span className="font-sans font-bold text-xl text-[#dc2626] uppercase tracking-widest
            [text-shadow:0_0_15px_rgba(220,38,38,0.5)]">
            NEON SAMURAI
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#dc2626]/40 text-white font-sans font-bold uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="NEON SAMURAI"
        description="Where tradition meets the electric frontier"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-2 [text-shadow:0_0_40px_rgba(220,38,38,0.5)]"
        descriptionClassName="text-lg text-white/40 font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-sans font-bold text-[#a020f0] uppercase tracking-widest
            [text-shadow:0_0_25px_rgba(160,32,240,0.5)]">
            BUSHIDO
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#dc2626] text-white font-sans font-bold uppercase tracking-widest border border-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] transition-all duration-300">
            Strike
          </button>
          <button className="px-10 py-4 bg-[#0a0a0a] text-[#a020f0] font-sans font-bold uppercase tracking-widest border border-[#a020f0]/50 shadow-[0_0_15px_rgba(160,32,240,0.3)] hover:shadow-[0_0_25px_rgba(160,32,240,0.5)] transition-all duration-300">
            Defend
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="NEON PALETTE"
        subtitle="ELECTRIC COLORS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-white uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-white/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#dc2626]/20 bg-[#0a0a0a] shadow-[0_0_10px_rgba(220,38,38,0.1)]"
            labelClassName="font-sans font-bold text-sm text-white uppercase"
            hexClassName="text-xs text-[#dc2626] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="NEON GLOW"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-white uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-white/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a] border border-[#dc2626]/20 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <p className="text-sm font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-6">STYLES</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#dc2626] text-white font-sans font-bold uppercase tracking-widest border border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all duration-300">
                Neon Red
              </button>
              <button className="px-6 py-3 bg-[#a020f0] text-white font-sans font-bold uppercase tracking-widest border border-[#a020f0]/60 shadow-[0_0_15px_rgba(160,32,240,0.5)] hover:shadow-[0_0_25px_rgba(160,32,240,0.7)] transition-all duration-300">
                Purple
              </button>
              <button className="px-6 py-3 bg-transparent text-[#dc2626] font-sans font-bold uppercase tracking-widest border border-[#dc2626]/50 shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#0a0a0a] text-[#38bdf8] font-sans font-bold uppercase tracking-widest border border-[#38bdf8]/40 shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300">
                Blue Neon
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="DARK GEOMETRY"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-white uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-white/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a] border border-[#dc2626]/30 shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#dc2626] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <Swords className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#dc2626] uppercase tracking-wider mb-2">
              KATANA
            </h3>
            <p className="text-white/40 font-sans text-sm">Sharp precision in every edge</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border border-[#a020f0]/30 shadow-[0_0_15px_rgba(160,32,240,0.15)] hover:shadow-[0_0_25px_rgba(160,32,240,0.4)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#a020f0] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(160,32,240,0.4)]">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#a020f0] uppercase tracking-wider mb-2">
              ENERGY
            </h3>
            <p className="text-white/40 font-sans text-sm">Electric power flows through the circuit</p>
          </div>

          <div className="p-6 bg-[#0a0a0a] border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#38bdf8] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#38bdf8] uppercase tracking-wider mb-2">
              SHIELD
            </h3>
            <p className="text-white/40 font-sans text-sm">Defense forged in digital fire</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="COMMAND INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-white uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-white/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a] border border-[#dc2626]/20 shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#dc2626] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-sans font-bold text-[#dc2626] uppercase tracking-widest">ACCESS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-2">CALLSIGN</label>
                <input
                  type="text"
                  placeholder="ENTER CALLSIGN..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#dc2626]/20 text-white placeholder-white/20 font-sans focus:border-[#dc2626] focus:shadow-[0_0_15px_rgba(220,38,38,0.4)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-2">PASSCODE</label>
                <input
                  type="password"
                  placeholder="ENTER PASSCODE..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#a020f0]/20 text-white placeholder-white/20 font-sans focus:border-[#a020f0] focus:shadow-[0_0_15px_rgba(160,32,240,0.4)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#dc2626] text-white font-sans font-bold uppercase tracking-widest border border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all duration-300">
                ENTER
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#dc2626]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/30 text-sm font-sans uppercase tracking-widest">
            Neon Samurai Showcase{" "}
            <Link href="/" className="text-[#dc2626] hover:text-[#dc2626]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
